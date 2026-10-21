/* =============================================================================
 * TẦNG XỬ LÝ — Luật nghiệp vụ & máy trạng thái của đơn mượn (LEMS).
 * - KHÔNG đụng DOM, KHÔNG đụng localStorage: chỉ dùng interface `db`
 *   (all / find / where / insert / update / transaction) được tiêm vào.
 * - Vi phạm luật -> ném BusinessError (giao diện bắt và hiển thị).
 *
 * Luồng lõi:
 *   SUBMITTED ──GV duyệt──► TEACHER_APPROVED ──Kho bàn giao──► BORROWING ──Nhận trả──► COMPLETED
 *       │                        │                                          └─(hư hại/trễ)─► INCIDENT_PENDING
 *       └─GV từ chối─► REJECTED  └─Kho từ chối─► MANAGER_REJECTED
 *
 * Ràng buộc nghiệp vụ (đánh số theo docs/Quy-trinh-nghiep-vu-va-Rang-buoc.md):
 *   [RB1] Một cá thể thiết bị chỉ cho một người mượn tại một thời điểm.
 *   [RB2] Không trùng lịch phòng.
 *   [RB3] Phòng cần duyệt đặc biệt -> GV phải thuộc bộ môn phụ trách phòng;
 *         đơn chưa được GV duyệt thì kho không được bàn giao.
 *   [RB4] Trả trễ / hư hại chưa đền bù -> khóa quyền mượn (SUSPENDED).
 * ========================================================================== */
(function (g) {
  'use strict';
  const LEMS = (g.LEMS = g.LEMS || {});

  const STATUS = Object.freeze({
    SUBMITTED: 'SUBMITTED',
    REJECTED: 'REJECTED',
    TEACHER_APPROVED: 'TEACHER_APPROVED',
    MANAGER_REJECTED: 'MANAGER_REJECTED',
    BORROWING: 'BORROWING',
    COMPLETED: 'COMPLETED',
    INCIDENT_PENDING: 'INCIDENT_PENDING',
  });

  // Máy trạng thái: trạng thái hiện tại -> các trạng thái được phép chuyển tới
  const TRANSITIONS = Object.freeze({
    SUBMITTED: ['TEACHER_APPROVED', 'REJECTED'],
    TEACHER_APPROVED: ['BORROWING', 'MANAGER_REJECTED'],
    BORROWING: ['COMPLETED', 'INCIDENT_PENDING'],
  });

  const CONDITIONS = ['INTACT', 'MINOR_FLAW', 'DAMAGED', 'ACCESSORIES_MISSING'];
  const INCIDENT_BY_CONDITION = { DAMAGED: 'DAMAGE', ACCESSORIES_MISSING: 'ACCESSORY_LOST' };
  const HOLDING_BOOKING = ['RESERVED', 'CHECKED_IN']; // booking đang chiếm lịch phòng

  class BusinessError extends Error {
    constructor(message) {
      super(message);
      this.name = 'BusinessError';
    }
  }

  const pad = (n) => String(n).padStart(2, '0');
  // Thời gian lưu dạng chuỗi giờ địa phương "YYYY-MM-DDTHH:MM" (khớp <input type="datetime-local">)
  function toLocal(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function createLemsService(db, clock) {
    clock = clock || (() => new Date());
    const now = () => toLocal(clock());
    const fail = (msg) => {
      throw new BusinessError(msg);
    };

    /* ------------------------------------------------------------------ *
     * Hàm nội bộ
     * ------------------------------------------------------------------ */
    function getUser(id, role) {
      const user = db.find('users', Number(id));
      if (!user) fail('Không tìm thấy người dùng.');
      if (role && user.role !== role) fail('Bạn không có quyền thực hiện thao tác này.');
      return user;
    }

    function getRequest(id) {
      const req = db.find('borrow_requests', Number(id));
      if (!req) fail('Không tìm thấy đơn mượn.');
      return req;
    }

    function assertTransition(req, next) {
      const allowed = TRANSITIONS[req.overall_status] || [];
      if (!allowed.includes(next)) {
        fail(`Đơn ${req.request_code} đang ở trạng thái ${req.overall_status}, không thể chuyển sang ${next}.`);
      }
    }

    const inStock = (modelId) =>
      db.where('equipment_items', (i) => i.model_id === modelId && i.operational_status === 'IN_STOCK');
    const linesOf = (requestId) => db.where('borrow_request_items', (x) => x.request_id === requestId);
    const bookingOf = (requestId) => db.where('room_booking_details', (b) => b.request_id === requestId)[0] || null;

    // [RB2] tìm lịch phòng bị giao nhau
    function findRoomClash(roomId, start, end) {
      const date = start.slice(0, 10);
      const s = start.slice(11);
      const e = end.slice(11);
      return (
        db.where(
          'room_booking_details',
          (b) =>
            b.room_id === roomId &&
            b.slot_date === date &&
            HOLDING_BOOKING.includes(b.booking_status) &&
            s < b.end_time &&
            b.start_time < e
        )[0] || null
      );
    }

    function cancelBooking(requestId) {
      const booking = bookingOf(requestId);
      if (booking) db.update('room_booking_details', booking.id, { booking_status: 'CANCELLED' });
    }

    /* ------------------------------------------------------------------ *
     * Truy vấn (cho giao diện hiển thị)
     * ------------------------------------------------------------------ */
    function listUsers() {
      return db.all('users');
    }
    function listTeachers() {
      return db.where('users', (u) => u.role === 'TEACHER').map((t) => ({
        ...t,
        department: db.find('departments', t.department_id),
      }));
    }
    function listRooms() {
      return db.all('rooms').map((r) => ({ ...r, department: db.find('departments', r.department_id) }));
    }
    function listModels() {
      return db.all('equipment_models').map((m) => ({ ...m, available: inStock(m.id).length }));
    }
    function listItems() {
      return db.all('equipment_items').map((i) => ({ ...i, model: db.find('equipment_models', i.model_id) }));
    }
    function availableItemsFor(modelId) {
      return inStock(Number(modelId));
    }

    function getRequestDetail(id) {
      const req = getRequest(id);
      const booking = bookingOf(req.id);
      return {
        ...req,
        student: db.find('users', req.student_id),
        teacher: db.find('users', req.teacher_id),
        lines: linesOf(req.id).map((x) => ({
          ...x,
          model: db.find('equipment_models', x.model_id),
          item: x.assigned_item_id ? db.find('equipment_items', x.assigned_item_id) : null,
        })),
        booking: booking ? { ...booking, room: db.find('rooms', booking.room_id) } : null,
        incidents: db.where('incidents_and_penalties', (i) => i.request_id === req.id),
      };
    }

    function listRequests(predicate) {
      return db
        .where('borrow_requests', predicate || (() => true))
        .sort((a, b) => b.id - a.id)
        .map((r) => getRequestDetail(r.id));
    }

    /* ------------------------------------------------------------------ *
     * BƯỚC 1 — Sinh viên tạo đơn  (-> SUBMITTED)
     * input: { teacherId, subject, purpose, start, end, roomId?, lines:[{modelId, quantity}] }
     * ------------------------------------------------------------------ */
    function createRequest(studentId, input) {
      input = input || {};
      const student = getUser(studentId, 'STUDENT');

      // [RB4] tài khoản bị khóa mượn
      if (student.status === 'SUSPENDED') {
        fail('Tài khoản đang bị KHÓA MƯỢN do trả trễ hoặc còn sự cố chưa đền bù. Không thể tạo đơn mới.');
      }

      const teacher = db.find('users', Number(input.teacherId));
      if (!teacher || teacher.role !== 'TEACHER') fail('Vui lòng chọn giảng viên duyệt đơn.');

      const purpose = String(input.purpose || '').trim();
      if (!purpose) fail('Vui lòng nhập mục đích mượn.');

      const start = input.start;
      const end = input.end;
      if (!start || !end) fail('Vui lòng chọn thời gian bắt đầu và kết thúc.');
      if (end <= start) fail('Thời gian kết thúc phải sau thời gian bắt đầu.');
      if (start < now()) fail('Thời gian bắt đầu không được ở quá khứ.');

      const lines = (input.lines || [])
        .map((l) => ({ modelId: Number(l.modelId), quantity: Number(l.quantity) || 0 }))
        .filter((l) => l.quantity > 0);
      const roomId = input.roomId ? Number(input.roomId) : null;
      if (!lines.length && !roomId) fail('Đơn phải có ít nhất một thiết bị hoặc một phòng.');

      for (const l of lines) {
        const model = db.find('equipment_models', l.modelId);
        if (!model) fail('Thiết bị không tồn tại.');
        if (!Number.isInteger(l.quantity)) fail('Số lượng phải là số nguyên.');
        const available = inStock(model.id).length;
        if (l.quantity > available) {
          fail(`"${model.model_name}" chỉ còn ${available} ${model.unit} sẵn sàng trong kho.`);
        }
      }

      let room = null;
      if (roomId) {
        room = db.find('rooms', roomId);
        if (!room) fail('Phòng không tồn tại.');
        if (room.current_status === 'MAINTENANCE' || room.current_status === 'LOCKED') {
          fail(`Phòng ${room.room_code} đang bảo trì hoặc bị khóa.`);
        }
        if (start.slice(0, 10) !== end.slice(0, 10)) fail('Mượn phòng chỉ được đặt trong cùng một ngày.');
        const clash = findRoomClash(room.id, start, end);
        if (clash) {
          fail(`Phòng ${room.room_code} đã có lịch ${clash.start_time}–${clash.end_time} ngày ${clash.slot_date}, trùng khung giờ bạn chọn.`);
        }
      }

      return db.transaction(() => {
        const t = now();
        const req = db.insert('borrow_requests', {
          request_code: '',
          student_id: student.id,
          teacher_id: teacher.id,
          manager_id: null,
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
        db.update('borrow_requests', req.id, {
          request_code: `REQ-${t.slice(0, 10).replace(/-/g, '')}-${String(req.id).padStart(4, '0')}`,
        });

        // Mỗi đơn vị thiết bị = 1 dòng, để kho gán đúng 1 cá thể (serial) cho mỗi dòng
        for (const l of lines) {
          for (let i = 0; i < l.quantity; i++) {
            db.insert('borrow_request_items', {
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
          db.insert('room_booking_details', {
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
     * BƯỚC 2 — Giảng viên duyệt / từ chối
     * ------------------------------------------------------------------ */
    function approveRequest(teacherId, requestId, comment) {
      const teacher = getUser(teacherId, 'TEACHER');
      const req = getRequest(requestId);
      if (req.teacher_id !== teacher.id) fail('Đơn này không được gửi cho bạn duyệt.');
      assertTransition(req, STATUS.TEACHER_APPROVED);

      // [RB3] phòng cần duyệt đặc biệt
      const booking = bookingOf(req.id);
      if (booking) {
        const room = db.find('rooms', booking.room_id);
        if (room.is_special_approval_required && room.department_id !== teacher.department_id) {
          const dept = db.find('departments', room.department_id);
          fail(`Phòng ${room.room_code} yêu cầu duyệt đặc biệt: chỉ giảng viên thuộc ${dept ? dept.dept_name : 'bộ môn phụ trách'} mới được duyệt.`);
        }
      }

      return db.transaction(() => {
        db.update('borrow_requests', req.id, {
          teacher_approval_status: 'APPROVED',
          teacher_comment: String(comment || '').trim(),
          overall_status: STATUS.TEACHER_APPROVED,
          updated_at: now(),
        });
        return getRequestDetail(req.id);
      });
    }

    function rejectRequest(teacherId, requestId, comment) {
      const teacher = getUser(teacherId, 'TEACHER');
      const req = getRequest(requestId);
      if (req.teacher_id !== teacher.id) fail('Đơn này không được gửi cho bạn duyệt.');
      assertTransition(req, STATUS.REJECTED);
      const reason = String(comment || '').trim();
      if (!reason) fail('Vui lòng nhập lý do từ chối.');

      return db.transaction(() => {
        db.update('borrow_requests', req.id, {
          teacher_approval_status: 'REJECTED',
          teacher_comment: reason,
          overall_status: STATUS.REJECTED,
          updated_at: now(),
        });
        cancelBooking(req.id); // trả lại khung giờ phòng
        return getRequestDetail(req.id);
      });
    }

    /* ------------------------------------------------------------------ *
     * BƯỚC 3 — Cán bộ kho bàn giao (CHECK-OUT), gán serial cho từng dòng
     * assignments: { [borrow_request_items.id]: equipment_items.id }
     * ------------------------------------------------------------------ */
    function dispatchRequest(managerId, requestId, assignments) {
      assignments = assignments || {};
      const manager = getUser(managerId, 'LAB_MANAGER');
      const req = getRequest(requestId);

      // [RB3] chưa có GV duyệt thì không được bàn giao
      if (req.overall_status !== STATUS.TEACHER_APPROVED) {
        fail(`Đơn ${req.request_code} chưa được giảng viên duyệt (${req.overall_status}) — không được bàn giao.`);
      }
      assertTransition(req, STATUS.BORROWING);

      const used = new Set();
      const plan = linesOf(req.id).map((line) => {
        const model = db.find('equipment_models', line.model_id);
        const itemId = Number(assignments[line.id]);
        if (!itemId) fail(`Chưa chọn cá thể thiết bị cho "${model.model_name}".`);
        const item = db.find('equipment_items', itemId);
        if (!item || item.model_id !== line.model_id) fail(`Mã thiết bị không khớp loại "${model.model_name}".`);
        // [RB1] một cá thể – một người mượn
        if (item.operational_status !== 'IN_STOCK') {
          fail(`Thiết bị ${item.asset_barcode} đang ở trạng thái ${item.operational_status}, không thể giao.`);
        }
        if (used.has(itemId)) fail(`Thiết bị ${item.asset_barcode} bị chọn hai lần trong cùng một đơn.`);
        used.add(itemId);
        return { line, item };
      });

      return db.transaction(() => {
        const t = now();
        for (const { line, item } of plan) {
          db.update('equipment_items', item.id, { operational_status: 'BORROWED' });
          db.update('borrow_request_items', line.id, { assigned_item_id: item.id, item_dispatch_status: 'DISPATCHED' });
          db.insert('inspection_logs', {
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

        const booking = bookingOf(req.id);
        if (booking) {
          db.update('room_booking_details', booking.id, { booking_status: 'CHECKED_IN', key_or_card_issued: true });
          db.insert('inspection_logs', {
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

        db.update('borrow_requests', req.id, {
          manager_id: manager.id,
          manager_dispatch_status: 'DISPATCHED',
          actual_checkout_time: t,
          overall_status: STATUS.BORROWING,
          updated_at: t,
        });
        return getRequestDetail(req.id);
      });
    }

    function rejectDispatch(managerId, requestId, comment) {
      const manager = getUser(managerId, 'LAB_MANAGER');
      const req = getRequest(requestId);
      assertTransition(req, STATUS.MANAGER_REJECTED);
      const reason = String(comment || '').trim();
      if (!reason) fail('Vui lòng nhập lý do từ chối bàn giao.');

      return db.transaction(() => {
        db.update('borrow_requests', req.id, {
          manager_id: manager.id,
          manager_dispatch_status: 'REJECTED',
          manager_comment: reason,
          overall_status: STATUS.MANAGER_REJECTED,
          updated_at: now(),
        });
        cancelBooking(req.id);
        return getRequestDetail(req.id);
      });
    }

    /* ------------------------------------------------------------------ *
     * BƯỚC 4 — Nhận trả & kiểm tra (CHECK-IN), đóng đơn
     * results: { [borrow_request_items.id]: {condition, notes}, room?: {condition, notes} }
     * ------------------------------------------------------------------ */
    function checkInRequest(managerId, requestId, results) {
      results = results || {};
      const manager = getUser(managerId, 'LAB_MANAGER');
      const req = getRequest(requestId);
      if (req.overall_status !== STATUS.BORROWING) fail(`Đơn ${req.request_code} không ở trạng thái đang mượn.`);

      const readResult = (r) => {
        r = r || {};
        const condition = r.condition || 'INTACT';
        if (!CONDITIONS.includes(condition)) fail('Tình trạng kiểm tra không hợp lệ.');
        return { condition, notes: String(r.notes || '').trim() };
      };
      const checks = linesOf(req.id).map((line) => ({ line, ...readResult(results[line.id]) }));
      const booking = bookingOf(req.id);
      const roomCheck = booking ? readResult(results.room) : null;

      return db.transaction(() => {
        const t = now();
        let incidents = 0;
        const report = (itemId, type, description) => {
          incidents++;
          db.insert('incidents_and_penalties', {
            request_id: req.id,
            item_id: itemId,
            reported_by: manager.id,
            incident_type: type,
            damage_description: description,
            penalty_fee: 0,
            compensation_status: 'PENDING',
            resolved_at: null,
            created_at: t,
          });
        };

        for (const { line, condition, notes } of checks) {
          const item = db.find('equipment_items', line.assigned_item_id);
          const incidentType = INCIDENT_BY_CONDITION[condition];
          db.insert('inspection_logs', {
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
          db.update(
            'equipment_items',
            item.id,
            incidentType
              ? { operational_status: 'MAINTENANCE', condition_state: 'BROKEN' }
              : { operational_status: 'IN_STOCK', condition_state: condition === 'MINOR_FLAW' ? 'FAIR' : item.condition_state }
          );
          db.update('borrow_request_items', line.id, { item_dispatch_status: incidentType ? 'INCIDENT' : 'RETURNED' });
          if (incidentType) report(item.id, incidentType, notes || `Thiết bị ${item.asset_barcode}: ${condition}`);
        }

        if (booking) {
          db.update('room_booking_details', booking.id, { booking_status: 'CHECKED_OUT' });
          db.insert('inspection_logs', {
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
            const room = db.find('rooms', booking.room_id);
            report(null, INCIDENT_BY_CONDITION[roomCheck.condition], roomCheck.notes || `Phòng ${room.room_code}: ${roomCheck.condition}`);
          }
        }

        // [RB4] trả trễ -> ghi sự cố OVERDUE
        if (t > req.expected_end_time) {
          report(null, 'OVERDUE', `Trả trễ: hạn ${req.expected_end_time.replace('T', ' ')}, trả lúc ${t.replace('T', ' ')}`);
        }

        // [RB4] có sự cố chưa xử lý -> khóa quyền mượn của sinh viên
        if (incidents > 0) db.update('users', req.student_id, { status: 'SUSPENDED' });

        db.update('borrow_requests', req.id, {
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
      // truy vấn
      listUsers,
      listTeachers,
      listRooms,
      listModels,
      listItems,
      availableItemsFor,
      listRequests,
      getRequestDetail,
      // luồng lõi
      createRequest,
      approveRequest,
      rejectRequest,
      dispatchRequest,
      rejectDispatch,
      checkInRequest,
    };
  }

  LEMS.STATUS = STATUS;
  LEMS.BusinessError = BusinessError;
  LEMS.toLocal = toLocal;
  LEMS.createLemsService = createLemsService;
})(typeof window !== 'undefined' ? window : globalThis);
