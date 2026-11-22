/* =============================================================================
 * TẦNG LƯU TRỮ — Kho dữ liệu dạng bảng (localStorage / bộ nhớ giả / Supabase Postgres).
 * - Chỉ biết đọc / ghi / gọi hàm SQL nguyên tử. KHÔNG chứa luật nghiệp vụ.
 * - Mọi phương thức trả về Promise để thống nhất hợp đồng giữa bản thử và Supabase.
 * ========================================================================== */
(function (g) {
  'use strict';
  const LEMS = (g.LEMS = g.LEMS || {});
  const clone = (x) => (x === undefined ? undefined : JSON.parse(JSON.stringify(x)));
  const sameId = (a, b) => a != null && b != null && String(a) === String(b);

  /* -------------------------------------------------------------------------
   * Bộ lưu trữ cục bộ / bộ nhớ giả (dùng cho test và bản demo không có Supabase)
   * ------------------------------------------------------------------------- */
  LEMS.createStorage = function createStorage(backend, seed, key) {
    key = key || 'lems_db_v1';
    let data = load();
    let inTransaction = false;
    let txTail = Promise.resolve();

    function load() {
      try {
        const raw = backend.getItem(key);
        if (raw) return JSON.parse(raw);
      } catch (e) {
        /* dữ liệu hỏng -> nạp lại seed */
      }
      const fresh = clone(seed);
      backend.setItem(key, JSON.stringify(fresh));
      return fresh;
    }

    function table(name) {
      if (!Array.isArray(data[name])) throw new Error('Không có bảng: ' + name);
      return data[name];
    }

    function mustBeInTransaction() {
      if (!inTransaction) throw new Error('Thao tác ghi phải nằm trong db.transaction()');
    }

    function syncModelTotal(modelId) {
      const model = table('equipment_models').find((m) => sameId(m.id, modelId));
      if (!model) return;
      model.tong_so = table('equipment_items').filter(
        (i) => sameId(i.model_id, modelId) && (i.operational_status === 'IN_STOCK' || i.operational_status === 'BORROWED')
      ).length;
    }

    const api = {
      async all(name) {
        return clone(table(name));
      },
      async find(name, id) {
        const row = table(name).find((r) => sameId(r.id, id));
        return row ? clone(row) : null;
      },
      async where(name, predicate) {
        return clone(table(name).filter(predicate));
      },

      async insert(name, row) {
        mustBeInTransaction();
        const rows = table(name);
        const id = rows.reduce((max, r) => Math.max(max, Number(r.id) || 0), 0) + 1;
        const record = Object.assign({ id }, clone(row));
        rows.push(record);
        if (name === 'equipment_items') syncModelTotal(record.model_id);
        return clone(record);
      },
      async update(name, id, patch) {
        mustBeInTransaction();
        const row = table(name).find((r) => sameId(r.id, id));
        if (!row) throw new Error(`Không tìm thấy ${name}#${id}`);
        Object.assign(row, clone(patch));
        if (name === 'equipment_items') syncModelTotal(row.model_id);
        return clone(row);
      },

      // [TD-10] Cập nhật nguyên tử cột so_dang_giu kèm kiểm tra CHECK (so_dang_giu <= tong_so)
      async giuThietBi(modelId, soLuong) {
        return api.transaction(async () => {
          const model = table('equipment_models').find((m) => sameId(m.id, modelId));
          if (!model) throw new Error(`Không tìm thấy loại thiết bị #${modelId}`);
          const q = Number(soLuong);
          const tong = Number(model.tong_so || 0);
          const giu = Number(model.so_dang_giu || 0);
          if (giu + q > tong) {
            return { ok: false, tong_so: tong, so_dang_giu: giu, available: Math.max(0, tong - giu) };
          }
          model.so_dang_giu = giu + q;
          return { ok: true, tong_so: tong, so_dang_giu: model.so_dang_giu, available: tong - model.so_dang_giu };
        });
      },

      async boGiuThietBi(modelId, soLuong) {
        return api.transaction(async () => {
          const model = table('equipment_models').find((m) => sameId(m.id, modelId));
          if (!model) throw new Error(`Không tìm thấy loại thiết bị #${modelId}`);
          const q = Number(soLuong);
          const tong = Number(model.tong_so || 0);
          model.so_dang_giu = Math.max(0, Number(model.so_dang_giu || 0) - q);
          return { ok: true, tong_so: tong, so_dang_giu: model.so_dang_giu, available: tong - model.so_dang_giu };
        });
      },

      transaction(work) {
        if (inTransaction) return Promise.resolve().then(() => work());
        // Xếp hàng các transaction độc lập tuần tự trong tiến trình để tránh xen kẽ await nửa chừng
        const run = txTail.then(async () => {
          const snapshot = clone(data);
          inTransaction = true;
          try {
            const result = await work();
            backend.setItem(key, JSON.stringify(data));
            return result;
          } catch (err) {
            data = snapshot;
            throw err;
          } finally {
            inTransaction = false;
          }
        });
        txTail = run.catch(() => {});
        return run;
      },

      async reset() {
        data = clone(seed);
        backend.setItem(key, JSON.stringify(data));
      },
    };

    return api;
  };

  /* -------------------------------------------------------------------------
   * Bộ lưu trữ Supabase Postgres (PostgREST + RPC + Supabase Auth, #63 & #64)
   * ------------------------------------------------------------------------- */
  const STATUS_TO_DB = {
    SUBMITTED: 'CHO_DUYET',
    PENDING_CONFIRM: 'CHO_XAC_NHAN',
    TEACHER_APPROVED: 'DA_DUYET',
    REJECTED: 'TU_CHOI',
    MANAGER_REJECTED: 'MANAGER_REJECTED',
    BORROWING: 'DANG_MUON',
    COMPLETED: 'DA_TRA',
    INCIDENT_PENDING: 'INCIDENT_PENDING',
  };
  const STATUS_FROM_DB = Object.fromEntries(Object.entries(STATUS_TO_DB).map(([k, v]) => [v, k]));

  function fromDbUser(r) {
    if (!r) return null;
    return {
      id: r.id,
      legacy_id: r.legacy_id,
      user_code: r.ma_nguoi_dung,
      email: r.email,
      full_name: r.ho_ten,
      role: r.vai_tro,
      department_id: r.department_id,
      class_name: r.class_name,
      status: r.trang_thai,
    };
  }
  function toDbUserPatch(p) {
    const out = {};
    if ('status' in p) out.trang_thai = p.status;
    if ('role' in p) out.vai_tro = p.role;
    return out;
  }

  function fromDbModel(r) {
    if (!r) return null;
    return {
      id: r.id,
      category_id: r.category_id,
      model_code: r.ma_loai,
      model_name: r.ten_loai,
      brand: r.brand,
      tracking_type: r.tracking_type,
      unit: r.unit,
      default_room_id: r.default_room_id,
      tong_so: r.tong_so,
      so_dang_giu: r.so_dang_giu,
    };
  }

  function fromDbRequest(r) {
    if (!r) return null;
    return {
      id: r.id,
      request_code: r.ma_don,
      student_id: r.ma_nguoi_muon,
      teacher_id: r.ma_giao_vien,
      manager_id: r.ma_can_bo,
      model_id: r.ma_loai_thiet_bi,
      quantity: r.so_luong,
      request_type: r.request_type,
      purpose: r.purpose,
      course_subject: r.course_subject,
      expected_start_time: r.ngay_muon ? String(r.ngay_muon).slice(0, 16) : '',
      expected_end_time: r.ngay_tra_du_kien ? String(r.ngay_tra_du_kien).slice(0, 16) : '',
      actual_checkout_time: r.thoi_diem_ban_giao ? String(r.thoi_diem_ban_giao).slice(0, 16) : null,
      actual_return_time: r.thoi_diem_nhan_lai ? String(r.thoi_diem_nhan_lai).slice(0, 16) : null,
      pending_since: r.thoi_diem_bat_dau_cho ? Date.parse(r.thoi_diem_bat_dau_cho) : null,
      confirmed_at: r.thoi_diem_xac_nhan ? String(r.thoi_diem_xac_nhan).slice(0, 16) : null,
      teacher_approval_status: r.teacher_approval_status,
      teacher_comment: r.teacher_comment || r.ly_do_tu_choi || '',
      manager_dispatch_status: r.trang_thai === 'DANG_MUON' || r.trang_thai === 'DA_TRA' ? 'DISPATCHED' : r.trang_thai === 'MANAGER_REJECTED' ? 'REJECTED' : 'PENDING',
      manager_comment: r.manager_comment || '',
      system_note: r.system_note || '',
      overall_status: STATUS_FROM_DB[r.trang_thai] || r.trang_thai,
      created_at: r.thoi_diem_gui,
      updated_at: r.updated_at,
    };
  }

  function toDbRequestRow(r) {
    const out = {};
    if ('request_code' in r) out.ma_don = r.request_code || `TMP-${Date.now()}`;
    if ('student_id' in r) out.ma_nguoi_muon = r.student_id;
    if ('teacher_id' in r) out.ma_giao_vien = r.teacher_id;
    if ('manager_id' in r) out.ma_can_bo = r.manager_id;
    if ('model_id' in r) out.ma_loai_thiet_bi = r.model_id;
    if ('quantity' in r) out.so_luong = r.quantity;
    if ('request_type' in r) out.request_type = r.request_type === 'EQUIP_ONLY' ? 'EQUIPMENT_ONLY' : r.request_type;
    if ('purpose' in r) out.purpose = r.purpose;
    if ('course_subject' in r) out.course_subject = r.course_subject;
    if ('expected_start_time' in r) out.ngay_muon = r.expected_start_time;
    if ('expected_end_time' in r) out.ngay_tra_du_kien = r.expected_end_time;
    if ('actual_checkout_time' in r) out.thoi_diem_ban_giao = r.actual_checkout_time;
    if ('actual_return_time' in r) out.thoi_diem_nhan_lai = r.actual_return_time;
    if ('pending_since' in r) out.thoi_diem_bat_dau_cho = r.pending_since ? new Date(r.pending_since).toISOString() : null;
    if ('confirmed_at' in r) out.thoi_diem_xac_nhan = r.confirmed_at;
    if ('teacher_approval_status' in r) out.teacher_approval_status = r.teacher_approval_status;
    if ('teacher_comment' in r) out.teacher_comment = r.teacher_comment;
    if ('manager_comment' in r) out.manager_comment = r.manager_comment;
    if ('system_note' in r) out.system_note = r.system_note;
    if ('overall_status' in r) out.trang_thai = STATUS_TO_DB[r.overall_status] || r.overall_status;
    if ('updated_at' in r) out.updated_at = r.updated_at;
    return out;
  }

  const TABLE_MAP = {
    users: { db: 'nguoi_dung', fromDb: fromDbUser, toDb: toDbUserPatch },
    equipment_models: { db: 'loai_thiet_bi', fromDb: fromDbModel, toDb: (p) => p },
    borrow_requests: { db: 'don_muon', fromDb: fromDbRequest, toDb: toDbRequestRow },
  };

  LEMS.createSupabaseStorage = function createSupabaseStorage(url, anonKey, options) {
    options = options || {};
    const fetchFn = options.fetch || g.fetch.bind(g);
    const sessionStorage = options.sessionStorage || (g.localStorage || null);
    const SESSION_KEY = 'lems_supabase_session_v1';
    const baseUrl = String(url || '').replace(/\/+$/, '');
    let accessToken = null;
    let currentAuthUid = null;

    if (sessionStorage) {
      try {
        const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
        if (saved && saved.access_token) {
          accessToken = saved.access_token;
          currentAuthUid = saved.user_id || null;
        }
      } catch (e) {
        /* bỏ qua phiên cũ bị hỏng */
      }
    }

    function headers(extra) {
      const h = {
        apikey: anonKey,
        Authorization: 'Bearer ' + (accessToken || anonKey),
        'Content-Type': 'application/json',
      };
      return Object.assign(h, extra || {});
    }

    async function request(path, opts) {
      const res = await fetchFn(baseUrl + path, opts);
      const text = await res.text();
      let body = null;
      try {
        body = text ? JSON.parse(text) : null;
      } catch (e) {
        body = text;
      }
      if (!res.ok) {
        const msg = (body && (body.message || body.error_description || body.error || body.hint)) || `HTTP ${res.status}`;
        const err = new Error(msg);
        err.status = res.status;
        err.code = body && body.code;
        throw err;
      }
      return body;
    }

    function mapInfo(name) {
      return TABLE_MAP[name] || { db: name, fromDb: (r) => r, toDb: (r) => r };
    }

    return {
      isSupabase: true,

      async signIn(email, password) {
        const data = await request('/auth/v1/token?grant_type=password', {
          method: 'POST',
          headers: { apikey: anonKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        accessToken = data.access_token;
        currentAuthUid = data.user && data.user.id;
        if (sessionStorage) {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify({ access_token: accessToken, user_id: currentAuthUid }));
        }
        return this.getSessionUser();
      },

      async signOut() {
        if (accessToken) {
          try {
            await fetchFn(baseUrl + '/auth/v1/logout', {
              method: 'POST',
              headers: headers(),
            });
          } catch (e) {
            /* bỏ qua lỗi mạng khi đăng xuất */
          }
        }
        accessToken = null;
        currentAuthUid = null;
        if (sessionStorage) sessionStorage.removeItem(SESSION_KEY);
      },

      async getSessionUser() {
        if (!accessToken) return null;
        try {
          const authUser = await request('/auth/v1/user', { method: 'GET', headers: headers() });
          currentAuthUid = authUser.id;
          const rows = await request(`/rest/v1/nguoi_dung?id=eq.${encodeURIComponent(authUser.id)}&select=*`, {
            method: 'GET',
            headers: headers(),
          });
          return rows && rows[0] ? fromDbUser(rows[0]) : null;
        } catch (e) {
          accessToken = null;
          currentAuthUid = null;
          if (sessionStorage) sessionStorage.removeItem(SESSION_KEY);
          return null;
        }
      },

      async all(name) {
        const { db: dbName, fromDb } = mapInfo(name);
        const rows = await request(`/rest/v1/${dbName}?select=*&order=id.asc`, { method: 'GET', headers: headers() });
        return (rows || []).map(fromDb);
      },

      async find(name, id) {
        const { db: dbName, fromDb } = mapInfo(name);
        const rows = await request(`/rest/v1/${dbName}?id=eq.${encodeURIComponent(id)}&select=*`, {
          method: 'GET',
          headers: headers(),
        });
        return rows && rows[0] ? fromDb(rows[0]) : null;
      },

      async where(name, predicate) {
        const rows = await this.all(name);
        return rows.filter(predicate);
      },

      async insert(name, row) {
        const { db: dbName, fromDb, toDb } = mapInfo(name);
        const payload = toDb(row);
        const rows = await request(`/rest/v1/${dbName}`, {
          method: 'POST',
          headers: headers({ Prefer: 'return=representation' }),
          body: JSON.stringify(payload),
        });
        return fromDb(rows[0]);
      },

      async update(name, id, patch) {
        const { db: dbName, fromDb, toDb } = mapInfo(name);
        const payload = toDb(patch);
        const rows = await request(`/rest/v1/${dbName}?id=eq.${encodeURIComponent(id)}`, {
          method: 'PATCH',
          headers: headers({ Prefer: 'return=representation' }),
          body: JSON.stringify(payload),
        });
        if (!rows || !rows.length) throw new Error(`Không tìm thấy hoặc không có quyền cập nhật ${name}#${id}`);
        return fromDb(rows[0]);
      },

      async giuThietBi(modelId, soLuong) {
        return request('/rest/v1/rpc/giu_thiet_bi', {
          method: 'POST',
          headers: headers(),
          body: JSON.stringify({ p_ma_loai: Number(modelId), p_so_luong: Number(soLuong) }),
        });
      },

      async boGiuThietBi(modelId, soLuong) {
        return request('/rest/v1/rpc/bo_giu_thiet_bi', {
          method: 'POST',
          headers: headers(),
          body: JSON.stringify({ p_ma_loai: Number(modelId), p_so_luong: Number(soLuong) }),
        });
      },

      async rpc(fnName, params) {
        return request(`/rest/v1/rpc/${fnName}`, {
          method: 'POST',
          headers: headers(),
          body: JSON.stringify(params || {}),
        });
      },

      async transaction(work) {
        return work();
      },
    };
  };
})(typeof window !== 'undefined' ? window : globalThis);
