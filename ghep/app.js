/* =============================================================================
 * TẦNG GHÉP — Nối 3 tầng lại với nhau (composition root).
 * Đây là nơi DUY NHẤT biết cả 3 tầng; mỗi tầng chỉ nhận thứ nó cần qua tham số.
 *
 *   localStorage ──► [Lưu trữ] db ──► [Xử lý] service ──► [Giao diện] ui ──► DOM
 * ========================================================================== */
(function (g) {
  'use strict';
  const LEMS = g.LEMS;

  // 1. Lưu trữ: bảng dữ liệu trên localStorage, lần đầu nạp seed
  const db = LEMS.createStorage(g.localStorage, LEMS.SEED);

  // 2. Xử lý: luật nghiệp vụ, chỉ biết tới `db`
  const service = LEMS.createLemsService(db);

  // 3. Giao diện: chỉ biết tới `service`; việc reset dữ liệu được ghép từ đây
  const ui = LEMS.createUI(document.getElementById('app'), service, {
    onReset: () => db.reset(),
  });

  ui.start();

  // Mở DevTools gõ `lems.service...` để thử nghiệp vụ trực tiếp khi demo
  g.lems = { db, service };
})(window);
