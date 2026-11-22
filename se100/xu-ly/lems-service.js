/* =============================================================================
 * TẦNG XỬ LÝ — Luật nghiệp vụ, năm lớp miền và máy trạng thái đơn mượn (LEMS).
 * - KHÔNG đụng DOM, KHÔNG đụng localStorage, KHÔNG gọi HTTP/SQL trực tiếp:
 *   chỉ gọi interface bất đồng bộ `db` do tầng Lưu trữ tiêm vào.
 * - Vi phạm luật -> ném BusinessError (giao diện bắt và hiển thị).
 * - Năm lớp miền khớp diagrams/class.mmd: NguoiMuon, GiaoVien, CanBoQuanLy,
 *   DonMuon, LoaiThietBi.
 * ========================================================================== */
(function (g) {
  'use strict';
  const LEMS = (g.LEMS = g.LEMS || {});

  const STATUS = Object.freeze({
    SUBMITTED: 'SUBMITTED',
    REJECTED: 'REJECTED',
    PENDING_CONFIRM: 'PENDING_CONFIRM',
    TEACHER_APPROVED: 'TEACHER_APPROVED',
    MANAGER_REJECTED: 'MANAGER_REJECTED',
    BORROWING: 'BORROWING',
    COMPLETED: 'COMPLETED',
    INCIDENT_PENDING: 'INCIDENT_PENDING',
  });

  const TRANSITIONS = Object.freeze({
    SUBMITTED: ['PENDING_CONFIRM', 'REJECTED'],
    PENDING_CONFIRM: ['TEACHER_APPROVED', 'REJECTED'],
    TEACHER_APPROVED: ['BORROWING', 'MANAGER_REJECTED'],
    BORROWING: ['COMPLETED', 'INCIDENT_PENDING'],
  });

  const CONDITIONS = ['INTACT', 'MINOR_FLAW', 'DAMAGED', 'ACCESSORIES_MISSING'];
  const INCIDENT_BY_CONDITION = { DAMAGED: 'DAMAGE', ACCESSORIES_MISSING: 'ACCESSORY_LOST' };
  const HOLDING_BOOKING = ['RESERVED', 'CHECKED_IN'];
  const CONFIRM_WINDOW_MS = 15 * 60 * 1000;

  const sameId = (a, b) => a != null && b != null && String(a) === String(b);

  class BusinessError extends Error {
    constructor(message) {
      super(message);
      this.name = 'BusinessError';
    }
  }

  /* ------------------------------------------------------------------ *
   * Năm lớp miền khớp diagrams/class.mmd
   * ------------------------------------------------------------------ */
  class NguoiMuon {
    constructor(data) {
      Object.assign(this, data);
    }
    async guiDon(service, input) {
      return service.createRequest(this.id, input);
    }
    async xemDon(service) {
      return service.listRequests((r) => sameId(r.student_id, this.id));
    }
  }

  class GiaoVien {
    constructor(data) {
      Object.assign(this, data);
    }
    async duyetDon(service, requestId, comment) {
      return service.approveRequest(this.id, requestId, comment);
    }
    async tuChoiDon(service, requestId, comment) {
      return service.rejectRequest(this.id, requestId, comment);
    }
  }

  class CanBoQuanLy {
    constructor(data) {
      Object.assign(this, data);
    }
    async xacNhanDon(service, requestId) {
      return service.confirmRequest(this.id, requestId);
    }
    async banGiao(service, requestId, assignments) {
      return service.dispatchRequest(this.id, requestId, assignments);
    }
    async nhanTra(service, requestId, results) {
      return service.checkInRequest(this.id, requestId, results);
    }
  }

  class DonMuon {
    constructor(data) {
      Object.assign(this, data);
    }
    doiTrangThai(nextStatus) {
      const allowed = TRANSITIONS[this.overall_status] || [];
      if (!allowed.includes(nextStatus)) {
        throw new BusinessError(`Đơn ${this.request_code} đang ở trạng thái ${this.overall_status}, không thể chuyển sang ${nextStatus}.`);
      }
      this.overall_status = nextStatus;
      return nextStatus;
    }
    hetGioChoXacNhan(nowMs) {
      return this.overall_status === STATUS.PENDING_CONFIRM && nowMs - this.pending_since >= CONFIRM_WINDOW_MS;
    }
  }

  class LoaiThietBi {
    constructor(data) {
      Object.assign(this, data);
    }
    soConCoTheMuon() {
      return Math.max(0, Number(this.tong_so || 0) - Number(this.so_dang_giu || 0));
    }
    async giuThietBi(db, soLuong) {
      return db.giuThietBi(this.id, soLuong);
    }
    async boGiuThietBi(db, soLuong) {
      return db.boGiuThietBi(this.id, soLuong);
    }
  }

  const pad = (n) => String(n).padStart(2, '0');
  function toLocal(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function createLemsService(db, clock) {
    clock = clock || (() => new Date());
    const now = () => toLocal(clock());
    const fail = (msg) => {
      throw new BusinessError(msg);
    };

    const MSG = Object.freeze({
      CHI_GIAO_VIEN_DUYET: 'Chỉ giáo viên được duyệt hoặc từ chối đơn',
      CHI_CAN_BO_XAC_NHAN: 'Chỉ cán bộ quản lý phòng lab được xác nhận đơn',
      CHI_CAN_BO_BAN_GIAO: 'Chỉ cán bộ quản lý phòng lab được xác nhận bàn giao',
      CHI_CAN_BO_NHAN_LAI: 'Chỉ cán bộ quản lý phòng lab được xác nhận nhận lại',
      DON_KHONG_CON_CHO_DUYET: 'Đơn không còn ở trạng thái Chờ duyệt',
      DON_KHONG_DANG_MUON: 'Đơn không ở trạng thái Đang mượn nên không thể nhận lại',
      CAN_LY_DO_TU_CHOI: 'Vui lòng nhập lý do từ chối',
      SO_LUONG_SAI: 'Số lượng phải là số nguyên từ 1 trở lên',
      NGAY_TRA_SAI: 'Ngày trả dự kiến phải sau ngày mượn',
      VUOT_SO_CON: (n) => `Thiết bị này chỉ còn ${n} chiếc có thể mượn`,
    });

    async function getUser(id, role, roleMessage) {
      const user = await db.find('users', id);
      if (!user) fail('Không tìm thấy người dùng.');
      if (role && user.role !== role) fail(roleMessage || 'Bạn không có quyền thực hiện thao tác này.');
      return user;
    }

    async function getRequest(id) {
      const req = await db.find('borrow_requests', id);
      if (!req) fail('Không tìm thấy đơn mượn.');
      return req;
    }

    function assertTransition(req, next) {
      new DonMuon(req).doiTrangThai(next);
    }

    async function inStock(modelId) {
      return db.where('equipment_items', (i) => sameId(i.model_id, modelId) && i.operational_status === 'IN_STOCK');
    }

    async function lendable(modelId) {
      const model = await db.find('equipment_models', modelId);
      if (!model) return 0;
      if (typeof model.tong_so === 'number' && typeof model.so_dang_giu === 'number') {
        return new LoaiThietBi(model).soConCoTheMuon();
      }
      return (await inStock(modelId)).length;
    }

    async function linesOf(requestId) {
      return db.where('borrow_request_items', (x) => sameId(x.request_id, requestId));
    }

    async function bookingOf(requestId) {
      const rows = await db.where('room_booking_details', (b) => sameId(b.request_id, requestId));
      return rows[0] || null;
    }

    async function findRoomClash(roomId, start, end) {
      const date = start.slice(0, 10);
      const s = start.slice(11);
      const e = end.slice(11);
      const rows = await db.where(
        'room_booking_details',
        (b) =>
          sameId(b.room_id, roomId) &&
          b.slot_date === date &&
          HOLDING_BOOKING.includes(b.booking_status) &&
          s < b.end_time &&
          b.start_time < e
      );
      return rows[0] || null;
    }

    async function cancelBooking(requestId) {
      const booking = await bookingOf(requestId);
      if (booking) await db.update('room_booking_details', booking.id, { booking_status: 'CANCELLED' });
    }

    function groupNeedByModel(lines) {
      const map = new Map();
      for (const l of lines) {
        const key = Number(l.model_id);
        map.set(key, (map.get(key) || 0) + (l.requested_quantity || 1));
      }
      return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
    }

    async function releaseHoldForRequest(requestId) {
      const lines = await linesOf(requestId);
      for (const [modelId, qty] of groupNeedByModel(lines)) {
        await new LoaiThietBi({ id: modelId }).boGiuThietBi(db, qty);
      }
    }

    const confirmExpired = (req) => new DonMuon(req).hetGioChoXacNhan(clock().getTime());

    async function expireOne(req) {
      await releaseHoldForRequest(req.id);
      await db.update('borrow_requests', req.id, {
        overall_status: STATUS.REJECTED,
        system_note: 'Hết hạn xác nhận sau 15 phút, thiết bị đã trả về kho.',
        updated_at: now(),
      });
      await cancelBooking(req.id);
    }

    async function sweepExpired() {
      const expired = await db.where('borrow_requests', confirmExpired);
      if (expired.length) {
        await db.transaction(async () => {
          for (const r of expired) {
            const latest = await db.find('borrow_requests', r.id);
            if (latest && confirmExpired(latest)) await expireOne(latest);
          }
        });
      }
    }

    /* ------------------------------------------------------------------ *
     * Truy vấn
     * ------------------------------------------------------------------ */
    async function listUsers() {
      return db.all('users');
    }

    async function listTeachers() {
      const depts = await db.all('departments');
      const deptById = new Map(depts.map((d) => [String(d.id), d]));
      const teachers = await db.where('users', (u) => u.role === 'TEACHER');
      return teachers.map((t) => ({ ...t, department: deptById.get(String(t.department_id)) || null }));
    }

    async function listRooms() {
      const depts = await db.all('departments');
      const deptById = new Map(depts.map((d) => [String(d.id), d]));
      const rooms = await db.all('rooms');
      return rooms.map((r) => ({ ...r, department: deptById.get(String(r.department_id)) || null }));
    }

    async function listModels() {
      await sweepExpired();
      const [models, items] = await Promise.all([db.all('equipment_models'), db.all('equipment_items')]);
      return models.map((m) => {
        const modelItems = items.filter((i) => sameId(i.model_id, m.id));
        const hasDbCounter = typeof m.tong_so === 'number' && typeof m.so_dang_giu === 'number';
        const total = modelItems.length || Number(m.tong_so || 0);
        const available = hasDbCounter ? new LoaiThietBi(m).soConCoTheMuon() : modelItems.filter((i) => i.operational_status === 'IN_STOCK').length;
        return { ...m, total, available };
      });
    }

    async function listItems() {
      const [items, models] = await Promise.all([db.all('equipment_items'), db.all('equipment_models')]);
      const modelById = new Map(models.map((m) => [String(m.id), m]));
      return items.map((i) => ({ ...i, model: modelById.get(String(i.model_id)) || null }));
    }

    async function availableItemsFor(modelId) {
      return inStock(modelId);
    }

    async function getRequestDetail(id) {
      const req = await getRequest(id);
      const [users, models, items, rooms, lines, booking, incidents] = await Promise.all([
        db.all('users'),
        db.all('equipment_models'),
        db.all('equipment_items'),
        db.all('rooms'),
        linesOf(req.id),
        bookingOf(req.id),
        db.where('incidents_and_penalties', (i) => sameId(i.request_id, req.id)),
      ]);
      const userById = new Map(users.map((u) => [String(u.id), u]));
      const modelById = new Map(models.map((m) => [String(m.id), m]));
      const itemById = new Map(items.map((i) => [String(i.id), i]));
      const roomById = new Map(rooms.map((r) => [String(r.id), r]));
      return {
        ...req,
        student: userById.get(String(req.student_id)) || null,
        teacher: userById.get(String(req.teacher_id)) || null,
        lines: lines.map((x) => ({
          ...x,
          model: modelById.get(String(x.model_id)) || null,
          item: x.assigned_item_id ? itemById.get(String(x.assigned_item_id)) || null : null,
        })),
        booking: booking ? { ...booking, room: roomById.get(String(booking.room_id)) || null } : null,
        incidents,
      };
    }

    async function listRequests(predicate) {
      await sweepExpired();
      const rows = (await db.where('borrow_requests', predicate || (() => true))).sort((a, b) => Number(b.id) - Number(a.id));
      return Promise.all(rows.map((r) => getRequestDetail(r.id)));
    }

    /* ------------------------------------------------------------------ *
     * BƯỚC 1 — Sinh viên tạo đơn (-> SUBMITTED)
     * ------------------------------------------------------------------ */
    async function createRequest(studentId, input) {
      input = input || {};
      const student = await getUser(studentId, 'STUDENT');

      if (student.status === 'SUSPENDED') {
        fail('Tài khoản đang bị KHÓA MƯỢN do trả trễ hoặc còn sự cố chưa đền bù. Không thể tạo đơn mới.');
      }

      const teacher = await db.find('users', input.teacherId);
      if (!teacher || teacher.role !== 'TEACHER') fail('Vui lòng chọn giảng viên duyệt đơn.');

      const purpose = String(input.purpose || '').trim();
      if (!purpose) fail('Vui lòng nhập mục đích mượn.');

      const start = input.start;
      const end = input.end;
      if (!start || !end) fail('Vui lòng chọn thời gian bắt đầu và kết thúc.');
      if (end <= start) fail(MSG.NGAY_TRA_SAI);
      if (start < now()) fail('Thời gian bắt đầu không được ở quá khứ.');

      const lines = (input.lines || [])
        .filter((l) => l.quantity !== undefined && l.quantity !== null && String(l.quantity).trim() !== '')
        .map((l) => ({ modelId: Number(l.modelId), quantity: Number(l.quantity) }));
      const roomId = input.roomId ? Number(input.roomId) : null;
      if (!lines.length && !roomId) fail('Đơn phải có ít nhất một thiết bị hoặc một phòng.');

      for (const l of lines) {
        const model = await db.find('equipment_models', l.modelId);
        if (!model) fail('Thiết bị không tồn tại.');
        if (!Number.isInteger(l.quantity) || l.quantity < 1) fail(MSG.SO_LUONG_SAI);
        const available = await lendable(model.id);
        if (l.quantity > available) fail(MSG.VUOT_SO_CON(available));
      }

      let room = null;
      if (roomId) {
        room = await db.find('rooms', roomId);
        if (!room) fail('Phòng không tồn tại.');
        if (room.current_status === 'MAINTENANCE' || room.current_status === 'LOCKED') {
          fail(`Phòng ${room.room_code} đang bảo trì hoặc bị khóa.`);
        }
        if (start.slice(0, 10) !== end.slice(0, 10)) fail('Mượn phòng chỉ được đặt trong cùng một ngày.');
        const clash = await findRoomClash(room.id, start, end);
        if (clash) {
          fail(`Phòng ${room.room_code} đã có lịch ${clash.start_time}–${clash.end_time} ngày ${clash.slot_date}, trùng khung giờ bạn chọn.`);
        }
      }

      return db.transaction(async () => {
        const t = now();
        const totalQty = lines.reduce((s, l) => s + l.quantity, 0) || 1;
        const req = await db.insert('borrow_requests', {
          request_code: '',
          student_id: student.id,
          teacher_id: teacher.id,
          manager_id: null,
          model_id: lines[0] ? lines[0].modelId : null,
          quantity: totalQty,
          request_type: room && lines.length ? 'COMBINED' : room ? 'ROOM_ONLY' : 'EQUIP_ONLY',
          purpose,
          course_subject: String(input.subject || '').trim(),
          expected_start_time: start,
          expected_end_time: end,
          actual_checkout_time: null,
          actual_return_time: null,
          teacher_approval_status: 'PENDING',
          teacher_comment: '',
          manager_dispatch_status: 'PENDING',
          manager_comment: '',
          overall_status: STATUS.SUBMITTED,
          created_at: t,
          updated_at: t,
        });
        await db.update('borrow_requests', req.id, {
          request_code: `REQ-${t.slice(0, 10).replace(/-/g, '')}-${String(req.id).padStart(4, '0')}`,
        });

        for (const l of lines) {
          for (let i = 0; i < l.quantity; i++) {
            await db.insert('borrow_request_items', {
              request_id: req.id,
              model_id: l.modelId,
              requested_quantity: 1,
              assigned_item_id: null,
              item_dispatch_status: 'REQUESTED',
              notes: '',
            });
          }
        }

        if (room) {
          await db.insert('room_booking_details', {
            request_id: req.id,
            room_id: room.id,
            slot_date: start.slice(0, 10),
            start_time: start.slice(11),
            end_time: end.slice(11),
            key_or_card_issued: false,
            booking_status: 'RESERVED',
          });
        }
        return getRequestDetail(req.id);
      });
    }

    /* ------------------------------------------------------------------ *
     * BƯỚC 2 — Giảng viên duyệt / từ chối (-> PENDING_CONFIRM / REJECTED)
     * ------------------------------------------------------------------ */
    async function approveRequest(teacherId, requestId, comment) {
      const teacher = await getUser(teacherId, 'TEACHER', MSG.CHI_GIAO_VIEN_DUYET);
      const req = await getRequest(requestId);
      if (!sameId(req.teacher_id, teacher.id)) fail('Đơn này không được gửi cho bạn duyệt.');
      if (req.overall_status !== STATUS.SUBMITTED) fail(MSG.DON_KHONG_CON_CHO_DUYET);
      assertTransition(req, STATUS.PENDING_CONFIRM);

      const booking = await bookingOf(req.id);
      if (booking) {
        const room = await db.find('rooms', booking.room_id);
        if (room.is_special_approval_required && !sameId(room.department_id, teacher.department_id)) {
          const dept = await db.find('departments', room.department_id);
          fail(`Phòng ${room.room_code} yêu cầu duyệt đặc biệt: chỉ giảng viên thuộc ${dept ? dept.dept_name : 'bộ môn phụ trách'} mới được duyệt.`);
        }
      }

      if (typeof db.rpc === 'function') {
        try {
          await db.rpc('duyet_don_muon', { p_don_id: Number(requestId), p_comment: String(comment || '').trim() });
          return getRequestDetail(requestId);
        } catch (err) {
          if (err && (err.code === '42501' || err.code === 'P0001' || err.code === 'P0002' || err.status === 400)) {
            fail(err.message);
          }
          throw err;
        }
      }

      // TD-10: toàn bộ kiểm tra hết hạn + giữ thiết bị nguyên tử + chuyển trạng thái nằm chung 1 giao dịch
      return db.transaction(async () => {
        const expired = await db.where('borrow_requests', confirmExpired);
        for (const r of expired) await expireOne(r);

        const fresh = await getRequest(requestId);
        if (fresh.overall_status !== STATUS.SUBMITTED) fail(MSG.DON_KHONG_CON_CHO_DUYET);

        const lines = await linesOf(req.id);
        for (const [modelId, need] of groupNeedByModel(lines)) {
          const res = await new LoaiThietBi({ id: modelId }).giuThietBi(db, need);
          if (!res.ok) fail(`Không đủ thiết bị để duyệt: chỉ còn ${res.available} chiếc`);
        }

        await db.update('borrow_requests', req.id, {
          teacher_approval_status: 'APPROVED',
          teacher_comment: String(comment || '').trim(),
          overall_status: STATUS.PENDING_CONFIRM,
          pending_since: clock().getTime(),
          updated_at: now(),
        });
        return getRequestDetail(req.id);
      });
    }

    async function confirmRequest(managerId, requestId) {
      await getUser(managerId, 'LAB_MANAGER', MSG.CHI_CAN_BO_XAC_NHAN);

      if (typeof db.rpc === 'function') {
        try {
          await db.rpc('xac_nhan_don_muon', { p_don_id: Number(requestId) });
          return getRequestDetail(requestId);
        } catch (err) {
          if (err && (err.code === '42501' || err.code === 'P0001' || err.code === 'P0002' || err.status === 400)) {
            fail(err.message);
          }
          throw err;
        }
      }

      const req = await getRequest(requestId);
      if (confirmExpired(req)) {
        await db.transaction(() => expireOne(req));
        fail('Đơn đã quá hạn xác nhận 15 phút, thiết bị đã trả về kho.');
      }
      if (req.overall_status !== STATUS.PENDING_CONFIRM) fail('Đơn không ở trạng thái Chờ xác nhận.');
      return db.transaction(async () => {
        await db.update('borrow_requests', req.id, {
          manager_id: managerId,
          overall_status: STATUS.TEACHER_APPROVED,
          confirmed_at: now(),
          updated_at: now(),
        });
        return getRequestDetail(req.id);
      });
    }

    async function rejectRequest(teacherId, requestId, comment) {
      const teacher = await getUser(teacherId, 'TEACHER', MSG.CHI_GIAO_VIEN_DUYET);
      const req = await getRequest(requestId);
      if (!sameId(req.teacher_id, teacher.id)) fail('Đơn này không được gửi cho bạn duyệt.');
      if (req.overall_status !== STATUS.SUBMITTED) fail(MSG.DON_KHONG_CON_CHO_DUYET);
      assertTransition(req, STATUS.REJECTED);
      const reason = String(comment || '').trim();
      if (!reason) fail(MSG.CAN_LY_DO_TU_CHOI);

      return db.transaction(async () => {
        await db.update('borrow_requests', req.id, {
          teacher_approval_status: 'REJECTED',
          teacher_comment: reason,
          overall_status: STATUS.REJECTED,
          updated_at: now(),
        });
        await cancelBooking(req.id);
        return getRequestDetail(req.id);
      });
    }

    /* ------------------------------------------------------------------ *
     * BƯỚC 3 — Cán bộ kho bàn giao (CHECK-OUT)
     * ------------------------------------------------------------------ */
    async function dispatchRequest(managerId, requestId, assignments) {
      assignments = assignments || {};
      const manager = await getUser(managerId, 'LAB_MANAGER', MSG.CHI_CAN_BO_BAN_GIAO);
      await sweepExpired();
      const req = await getRequest(requestId);

      if (req.overall_status === STATUS.PENDING_CONFIRM) fail(`Đơn ${req.request_code} chưa được kho xác nhận — không được bàn giao.`);
      if (req.overall_status !== STATUS.TEACHER_APPROVED) {
        fail(`Đơn ${req.request_code} chưa được giảng viên duyệt (${req.overall_status}) — không được bàn giao.`);
      }
      assertTransition(req, STATUS.BORROWING);

      const used = new Set();
      const lines = await linesOf(req.id);
      const plan = [];
      for (const line of lines) {
        const model = await db.find('equipment_models', line.model_id);
        const itemId = Number(assignments[line.id]);
        if (!itemId) fail(`Chưa chọn cá thể thiết bị cho "${model.model_name}".`);
        const item = await db.find('equipment_items', itemId);
        if (!item || !sameId(item.model_id, line.model_id)) fail(`Mã thiết bị không khớp loại "${model.model_name}".`);
        if (item.operational_status !== 'IN_STOCK') {
          fail(`Thiết bị ${item.asset_barcode} đang ở trạng thái ${item.operational_status}, không thể giao.`);
        }
        if (used.has(itemId)) fail(`Thiết bị ${item.asset_barcode} bị chọn hai lần trong cùng một đơn.`);
        used.add(itemId);
        plan.push({ line, item });
      }

      return db.transaction(async () => {
        const t = now();
        for (const { line, item } of plan) {
          await db.update('equipment_items', item.id, { operational_status: 'BORROWED' });
          await db.update('borrow_request_items', line.id, { assigned_item_id: item.id, item_dispatch_status: 'DISPATCHED' });
          await db.insert('inspection_logs', {
            request_id: req.id,
            assigned_item_id: item.id,
            room_id: null,
            stage: 'CHECK_OUT',
            inspector_id: manager.id,
            condition_rating: 'INTACT',
            accessories_intact: true,
            notes: `Tình trạng lúc giao: ${item.condition_state}`,
            created_at: t,
          });
        }

        const booking = await bookingOf(req.id);
        if (booking) {
          await db.update('room_booking_details', booking.id, { booking_status: 'CHECKED_IN', key_or_card_issued: true });
          await db.insert('inspection_logs', {
            request_id: req.id,
            assigned_item_id: null,
            room_id: booking.room_id,
            stage: 'CHECK_OUT',
            inspector_id: manager.id,
            condition_rating: 'INTACT',
            accessories_intact: true,
            notes: 'Giao chìa khóa / thẻ phòng',
            created_at: t,
          });
        }

        await db.update('borrow_requests', req.id, {
          manager_id: manager.id,
          manager_dispatch_status: 'DISPATCHED',
          actual_checkout_time: t,
          overall_status: STATUS.BORROWING,
          updated_at: t,
        });
        return getRequestDetail(req.id);
      });
    }

    async function rejectDispatch(managerId, requestId, comment) {
      const manager = await getUser(managerId, 'LAB_MANAGER');
      const req = await getRequest(requestId);
      assertTransition(req, STATUS.MANAGER_REJECTED);
      const reason = String(comment || '').trim();
      if (!reason) fail('Vui lòng nhập lý do từ chối bàn giao.');

      return db.transaction(async () => {
        await releaseHoldForRequest(req.id);
        await db.update('borrow_requests', req.id, {
          manager_id: manager.id,
          manager_dispatch_status: 'REJECTED',
          manager_comment: reason,
          overall_status: STATUS.MANAGER_REJECTED,
          updated_at: now(),
        });
        await cancelBooking(req.id);
        return getRequestDetail(req.id);
      });
    }

    /* ------------------------------------------------------------------ *
     * BƯỚC 4 — Nhận trả & kiểm tra (CHECK-IN)
     * ------------------------------------------------------------------ */
    async function checkInRequest(managerId, requestId, results) {
      results = results || {};
      const manager = await getUser(managerId, 'LAB_MANAGER', MSG.CHI_CAN_BO_NHAN_LAI);
      const req = await getRequest(requestId);
      if (req.overall_status !== STATUS.BORROWING) fail(MSG.DON_KHONG_DANG_MUON);

      const readResult = (r) => {
        r = r || {};
        const condition = r.condition || 'INTACT';
        if (!CONDITIONS.includes(condition)) fail('Tình trạng kiểm tra không hợp lệ.');
        return { condition, notes: String(r.notes || '').trim() };
      };
      const lines = await linesOf(req.id);
      const checks = lines.map((line) => ({ line, ...readResult(results[line.id]) }));
      const booking = await bookingOf(req.id);
      const roomCheck = booking ? readResult(results.room) : null;

      return db.transaction(async () => {
        const t = now();
        let incidents = 0;
        const report = async (itemId, type, description) => {
          incidents++;
          await db.insert('incidents_and_penalties', {
            request_id: req.id,
            assigned_item_id: itemId,
            incident_type: type,
            damage_description: description,
            compensation_status: 'OPEN',
            penalty_action: 'SUSPENDED',
            created_at: t,
          });
        };

        for (const { line, condition, notes } of checks) {
          const item = await db.find('equipment_items', line.assigned_item_id);
          const incidentType = INCIDENT_BY_CONDITION[condition];
          await db.insert('inspection_logs', {
            request_id: req.id,
            assigned_item_id: item.id,
            room_id: null,
            stage: 'CHECK_IN',
            inspector_id: manager.id,
            condition_rating: condition,
            accessories_intact: condition !== 'ACCESSORIES_MISSING',
            notes,
            created_at: t,
          });
          await db.update(
            'equipment_items',
            item.id,
            incidentType
              ? { operational_status: 'MAINTENANCE', condition_state: 'BROKEN' }
              : { operational_status: 'IN_STOCK', condition_state: condition === 'MINOR_FLAW' ? 'FAIR' : item.condition_state }
          );
          if (incidentType && db.isSupabase) {
            const m = await db.find('equipment_models', line.model_id);
            if (m) await db.update('equipment_models', m.id, { tong_so: Math.max(0, Number(m.tong_so || 0) - 1) });
          }
          await db.update('borrow_request_items', line.id, { item_dispatch_status: incidentType ? 'INCIDENT' : 'RETURNED' });
          if (incidentType) await report(item.id, incidentType, notes || `Thiết bị ${item.asset_barcode}: ${condition}`);
        }

        await releaseHoldForRequest(req.id);

        if (booking) {
          await db.update('room_booking_details', booking.id, { booking_status: 'COMPLETED' });
          await db.insert('inspection_logs', {
            request_id: req.id,
            assigned_item_id: null,
            room_id: booking.room_id,
            stage: 'CHECK_IN',
            inspector_id: manager.id,
            condition_rating: roomCheck.condition,
            accessories_intact: roomCheck.condition !== 'ACCESSORIES_MISSING',
            notes: roomCheck.notes,
            created_at: t,
          });
          if (INCIDENT_BY_CONDITION[roomCheck.condition]) {
            const room = await db.find('rooms', booking.room_id);
            await report(null, INCIDENT_BY_CONDITION[roomCheck.condition], roomCheck.notes || `Phòng ${room.room_code}: ${roomCheck.condition}`);
          }
        }

        if (t > req.expected_end_time) {
          await report(null, 'OVERDUE', `Trả trễ: hạn ${req.expected_end_time.replace('T', ' ')}, trả lúc ${t.replace('T', ' ')}`);
        }

        if (incidents > 0) await db.update('users', req.student_id, { status: 'SUSPENDED' });

        await db.update('borrow_requests', req.id, {
          actual_return_time: t,
          overall_status: incidents > 0 ? STATUS.INCIDENT_PENDING : STATUS.COMPLETED,
          updated_at: t,
        });
        return getRequestDetail(req.id);
      });
    }

    return {
      STATUS,
      CONDITIONS,
      listUsers,
      listTeachers,
      listRooms,
      listModels,
      listItems,
      availableItemsFor,
      listRequests,
      getRequestDetail,
      createRequest,
      approveRequest,
      confirmRequest,
      rejectRequest,
      dispatchRequest,
      rejectDispatch,
      checkInRequest,
    };
  }

  LEMS.STATUS = STATUS;
  LEMS.BusinessError = BusinessError;
  LEMS.NguoiMuon = NguoiMuon;
  LEMS.GiaoVien = GiaoVien;
  LEMS.CanBoQuanLy = CanBoQuanLy;
  LEMS.DonMuon = DonMuon;
  LEMS.LoaiThietBi = LoaiThietBi;
  LEMS.toLocal = toLocal;
  LEMS.createLemsService = createLemsService;
})(typeof window !== 'undefined' ? window : globalThis);
