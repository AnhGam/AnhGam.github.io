/* =============================================================================
 * TẦNG GIAO DIỆN — Khung chung: đăng nhập (#63) / chọn vai trò thử nghiệm,
 * thông báo, thẻ đơn mượn, điều phối sự kiện tới view của từng vai trò.
 * - Chỉ gọi `service` và callback do tầng ghép truyền vào. KHÔNG gọi tầng lưu trữ.
 * ========================================================================== */
(function (g) {
  'use strict';
  const LEMS = (g.LEMS = g.LEMS || {});
  LEMS.views = LEMS.views || {};

  const STATUS_LABEL = {
    SUBMITTED: 'Chờ duyệt',
    REJECTED: 'Từ chối',
    PENDING_CONFIRM: 'Chờ kho xác nhận',
    TEACHER_APPROVED: 'Đã duyệt',
    MANAGER_REJECTED: 'Kho từ chối',
    BORROWING: 'Đang mượn',
    COMPLETED: 'Đã trả',
    INCIDENT_PENDING: 'Có sự cố',
  };
  const ROLE_LABEL = { STUDENT: 'Sinh viên', TEACHER: 'Giảng viên', LAB_MANAGER: 'Cán bộ quản lý Lab' };
  const CONDITION_LABEL = {
    INTACT: 'Nguyên vẹn',
    MINOR_FLAW: 'Trầy xước nhẹ',
    DAMAGED: 'Hư hỏng',
    ACCESSORIES_MISSING: 'Thiếu phụ kiện',
  };
  const INCIDENT_LABEL = { DAMAGE: 'Hư hỏng', LOSS: 'Mất', ACCESSORY_LOST: 'Mất phụ kiện', OVERDUE: 'Trả trễ' };

  const esc = (s) =>
    String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const fmt = (t) => (t ? t.replace('T', ' ') : '—');
  const badge = (status) => `<span class="badge badge-${esc(status)}">${esc(STATUS_LABEL[status] || status)}</span>`;
  const sameId = (a, b) => a != null && b != null && String(a) === String(b);

  function requestCard(r, footer) {
    const lines = r.lines.length
      ? `<ul class="lines">${r.lines
          .map(
            (l) =>
              `<li>${esc(l.model ? l.model.model_name : '')} ${
                l.item
                  ? `<code>${esc(l.item.asset_barcode)}</code> <span class="muted">${esc(l.item.serial_number)}</span>`
                  : '<span class="muted">(chưa gán serial)</span>'
              }</li>`
          )
          .join('')}</ul>`
      : '';
    const room = r.booking
      ? `<p class="room">Phòng <strong>${esc(r.booking.room.room_code)}</strong> — ${esc(r.booking.room.room_name)}
           ${r.booking.room.is_special_approval_required ? '<span class="tag">★ duyệt đặc biệt</span>' : ''}
           <span class="muted">(${esc(r.booking.booking_status)})</span></p>`
      : '';
    const comments = [
      r.teacher_comment && `<p class="note"><b>GV:</b> ${esc(r.teacher_comment)}</p>`,
      r.manager_comment && `<p class="note"><b>Kho:</b> ${esc(r.manager_comment)}</p>`,
      r.system_note && `<p class="note"><b>Hệ thống:</b> ${esc(r.system_note)}</p>`,
    ]
      .filter(Boolean)
      .join('');
    const incidents = r.incidents.length
      ? `<div class="incidents">${r.incidents
          .map((i) => `<p>⚠ <b>${esc(INCIDENT_LABEL[i.incident_type] || i.incident_type)}</b>: ${esc(i.damage_description)} <span class="muted">(${esc(i.compensation_status)})</span></p>`)
          .join('')}</div>`
      : '';

    return `
      <article class="card" data-request="${esc(r.id)}">
        <header class="card-head">
          <div><strong>${esc(r.request_code)}</strong> ${badge(r.overall_status)}</div>
          <span class="muted">${fmt(r.expected_start_time)} → ${fmt(r.expected_end_time)}</span>
        </header>
        <dl class="meta">
          <dt>Sinh viên</dt><dd>${esc(r.student ? r.student.full_name : '')} <span class="muted">${esc(r.student ? r.student.user_code : '')}</span></dd>
          <dt>GV duyệt</dt><dd>${esc(r.teacher ? r.teacher.full_name : '')}</dd>
          ${r.course_subject ? `<dt>Môn học</dt><dd>${esc(r.course_subject)}</dd>` : ''}
          <dt>Mục đích</dt><dd>${esc(r.purpose)}</dd>
        </dl>
        ${lines}${room}${comments}${incidents}
        ${footer || ''}
      </article>`;
  }

  const listOrEmpty = (items, render, empty) => (items.length ? items.map(render).join('') : `<p class="muted">${empty}</p>`);

  function loginView() {
    return `
      <section class="panel auth-panel">
        <h2>Đăng nhập hệ thống LEMS</h2>
        <p class="muted">Vui lòng đăng nhập bằng tài khoản được cấp để xem danh sách thiết bị và xử lý đơn mượn.</p>
        <form data-form="login">
          <label>Email
            <input type="email" name="email" required autocomplete="username" placeholder="vd: sv1@lems.local">
          </label>
          <label>Mật khẩu
            <input type="password" name="password" required autocomplete="current-password">
          </label>
          <button type="submit" class="primary">Đăng nhập</button>
        </form>
      </section>`;
  }

  LEMS.ui = { esc, fmt, badge, requestCard, listOrEmpty, loginView, STATUS_LABEL, ROLE_LABEL, CONDITION_LABEL };

  LEMS.createUI = function createUI(root, service, options) {
    options = options || {};
    const state = { userId: null, activeUser: null };

    const viewFor = (user) => ({ STUDENT: LEMS.views.student, TEACHER: LEMS.views.teacher, LAB_MANAGER: LEMS.views.manager })[user.role];

    function flash(type, text) {
      const box = root.querySelector('#flash');
      if (!box) return;
      box.className = `flash flash-${type}`;
      box.textContent = text;
      box.hidden = false;
      box.scrollIntoView({ block: 'nearest' });
    }

    async function resolveCurrentUser() {
      if (options.authRequired) {
        state.activeUser = options.getAuthUser ? await options.getAuthUser() : null;
        return state.activeUser;
      }
      const users = (await service.listUsers()).filter((u) => ROLE_LABEL[u.role]);
      if (!state.userId || !users.some((u) => sameId(u.id, state.userId))) state.userId = users[0].id;
      state.activeUser = users.find((u) => sameId(u.id, state.userId));
      return state.activeUser;
    }

    async function run(action, message) {
      try {
        const result = await action();
        await render();
        const m = typeof message === 'function' ? message(result) : message;
        if (typeof m === 'string') flash('ok', m);
        else if (m) flash(m.type, m.text);
      } catch (err) {
        if (err instanceof LEMS.BusinessError) flash('error', err.message);
        else {
          console.error(err);
          flash('error', 'Lỗi hệ thống: ' + (err && err.message ? err.message : String(err)));
        }
      }
    }

    const ctx = () => ({ service, user: state.activeUser, run });

    async function render() {
      const user = await resolveCurrentUser();

      if (options.authRequired && !user) {
        root.innerHTML = `
          <header class="topbar">
            <div class="brand">LEMS <span>Mượn thiết bị thí nghiệm & phòng thực hành</span></div>
          </header>
          <div id="flash" hidden></div>
          <main>${loginView()}</main>`;
        return;
      }

      let topRight = '';
      if (options.authRequired) {
        topRight = `
          <span class="who">${esc(ROLE_LABEL[user.role])} — <strong>${esc(user.full_name)}</strong>${user.status === 'SUSPENDED' ? ' (bị khóa)' : ''}</span>
          <button type="button" class="ghost" data-action="logout">Đăng xuất</button>`;
      } else {
        const users = (await service.listUsers()).filter((u) => ROLE_LABEL[u.role]);
        topRight = `
          <label class="who">Đăng nhập:
            <select data-change="switch-user">
              ${users
                .map(
                  (u) =>
                    `<option value="${esc(u.id)}" ${sameId(u.id, user.id) ? 'selected' : ''}>${esc(ROLE_LABEL[u.role])} — ${esc(u.full_name)}${
                      u.status === 'SUSPENDED' ? ' (bị khóa)' : ''
                    }</option>`
                )
                .join('')}
            </select>
          </label>
          <button type="button" class="ghost" data-action="reset">Nạp lại dữ liệu mẫu</button>`;
      }

      const mainHtml = await viewFor(user).render(ctx());
      root.innerHTML = `
        <header class="topbar">
          <div class="brand">LEMS <span>Mượn thiết bị thí nghiệm & phòng thực hành</span></div>
          ${topRight}
        </header>
        <div id="flash" hidden></div>
        <main>${mainHtml}</main>`;
    }

    root.addEventListener('click', async (e) => {
      const el = e.target.closest('[data-action]');
      if (!el || !root.contains(el)) return;
      if (el.dataset.action === 'reset') {
        if (options.onReset) await options.onReset();
        await render();
        flash('ok', 'Đã nạp lại dữ liệu mẫu.');
        return;
      }
      if (el.dataset.action === 'logout') {
        if (options.onLogout) await options.onLogout();
        state.activeUser = null;
        await render();
        flash('ok', 'Đã đăng xuất.');
        return;
      }
      if (!state.activeUser) return;
      const handler = (viewFor(state.activeUser).actions || {})[el.dataset.action];
      if (handler) await handler(el, ctx());
    });

    root.addEventListener('submit', async (e) => {
      if (e.target.dataset.form === 'login') {
        e.preventDefault();
        const fd = new FormData(e.target);
        try {
          if (options.onLogin) await options.onLogin(fd.get('email'), fd.get('password'));
          await render();
        } catch (err) {
          flash('error', 'Đăng nhập thất bại: ' + (err && err.message ? err.message : String(err)));
        }
        return;
      }
      if (!state.activeUser) return;
      const handler = (viewFor(state.activeUser).forms || {})[e.target.dataset.form];
      if (handler) {
        e.preventDefault();
        await handler(e.target, ctx());
      }
    });

    root.addEventListener('change', async (e) => {
      if (e.target.dataset.change === 'switch-user') {
        state.userId = e.target.value;
        await render();
      }
    });

    return { start: render };
  };
})(typeof window !== 'undefined' ? window : globalThis);
