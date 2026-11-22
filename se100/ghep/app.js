/* =============================================================================
 * TẦNG GHÉP — Nối 3 tầng lại với nhau (composition root).
 * Đây là nơi DUY NHẤT biết cả 3 tầng và cấu hình triển khai Supabase.
 * ========================================================================== */
(function (g) {
  'use strict';
  const LEMS = g.LEMS;
  const cfg = g.LEMS_CONFIG || {};
  const hasRealSupabase =
    cfg.SUPABASE_URL &&
    cfg.SUPABASE_ANON_KEY &&
    !String(cfg.SUPABASE_URL).includes('YOUR-PROJECT') &&
    !String(cfg.SUPABASE_ANON_KEY).includes('YOUR_SUPABASE_ANON_KEY');

  // 1. Lưu trữ: Supabase Postgres khi đã cấu hình, ngược lại dùng localStorage cho bản thử
  const db = hasRealSupabase
    ? LEMS.createSupabaseStorage(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY)
    : LEMS.createStorage(g.localStorage, LEMS.SEED);

  // 2. Xử lý: luật nghiệp vụ, chỉ biết tới `db`
  const service = LEMS.createLemsService(db);

  // 3. Giao diện: truyền callback xác thực/reset từ tầng ghép để giao diện không biết Supabase
  const ui = LEMS.createUI(document.getElementById('app'), service, {
    authRequired: Boolean(hasRealSupabase),
    getAuthUser: hasRealSupabase ? () => db.getSessionUser() : null,
    onLogin: hasRealSupabase ? (email, password) => db.signIn(email, password) : null,
    onLogout: hasRealSupabase ? () => db.signOut() : null,
    onReset: hasRealSupabase ? null : () => db.reset(),
  });

  ui.start();

  g.lems = { db, service };
})(window);
