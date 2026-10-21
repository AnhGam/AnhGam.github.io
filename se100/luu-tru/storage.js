/* =============================================================================
 * TẦNG LƯU TRỮ — Kho dữ liệu dạng bảng trên localStorage.
 * - Chỉ biết đọc / ghi bản ghi. KHÔNG chứa luật nghiệp vụ.
 * - Mọi thao tác ghi phải nằm trong transaction(): lỗi giữa chừng thì hoàn tác
 *   toàn bộ, thành công thì ghi xuống localStorage một lần.
 * - `backend` là bất kỳ object nào có getItem/setItem (localStorage, hoặc
 *   bộ nhớ giả khi chạy test bằng Node).
 * ========================================================================== */
(function (g) {
  'use strict';
  const LEMS = (g.LEMS = g.LEMS || {});
  const clone = (x) => (x === undefined ? undefined : JSON.parse(JSON.stringify(x)));

  LEMS.createStorage = function createStorage(backend, seed, key) {
    key = key || 'lems_db_v1';
    let data = load();
    let inTransaction = false;

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

    return {
      /* ---------- Đọc ---------- */
      all(name) {
        return clone(table(name));
      },
      find(name, id) {
        const row = table(name).find((r) => r.id === id);
        return row ? clone(row) : null;
      },
      where(name, predicate) {
        return clone(table(name).filter(predicate));
      },

      /* ---------- Ghi ---------- */
      insert(name, row) {
        mustBeInTransaction();
        const rows = table(name);
        const id = rows.reduce((max, r) => Math.max(max, r.id), 0) + 1;
        const record = Object.assign({ id }, clone(row));
        rows.push(record);
        return clone(record);
      },
      update(name, id, patch) {
        mustBeInTransaction();
        const row = table(name).find((r) => r.id === id);
        if (!row) throw new Error(`Không tìm thấy ${name}#${id}`);
        Object.assign(row, clone(patch));
        return clone(row);
      },

      /* ---------- Giao dịch ---------- */
      transaction(work) {
        if (inTransaction) return work(); // lồng nhau -> dùng chung giao dịch ngoài
        const snapshot = clone(data);
        inTransaction = true;
        try {
          const result = work();
          backend.setItem(key, JSON.stringify(data));
          return result;
        } catch (err) {
          data = snapshot; // hoàn tác
          throw err;
        } finally {
          inTransaction = false;
        }
      },

      reset() {
        data = clone(seed);
        backend.setItem(key, JSON.stringify(data));
      },
    };
  };
})(typeof window !== 'undefined' ? window : globalThis);
