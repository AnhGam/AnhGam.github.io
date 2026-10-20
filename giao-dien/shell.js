/* =============================================================================
 * TẦNG GIAO DIỆN — Khung chung: chọn người dùng, thông báo, thẻ đơn mượn,
 * điều phối sự kiện tới view của từng vai trò.
 * - Chỉ gọi `service` (tầng xử lý). KHÔNG đọc/ghi localStorage trực tiếp.
 * ========================================================================== */
(function (g) {
  'use strict';
  const LEMS = (g.LEMS = g.LEMS || {});
  LEMS.views = LEMS.views || {};

  const STATUS_LABEL = {
    SUBMITTED: 'Chờ GV duyệt',
    REJECTED: 'GV từ chối',
    TEACHER_APPROVED: 'Chờ bàn giao',
    MANAGER_REJECTED: 'Kho từ chối',
    BORROWING: 'Đang mượn',
    COMPLETED: 'Hoàn tất',
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

  /* Thẻ hiển thị một đơn mượn; `footer` là phần thao tác riêng của từng vai trò */
  function requestCard(r, footer) {
    const lines = r.lines.length
      ? `<ul class="lines">${r.lines
          .map(
            (l) =>
              `<li>${esc(l.model.model_name)} ${
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
    ]
      .filter(Boolean)
      .join('');
    const incidents = r.incidents.length
      ? `<div class="incidents">${r.incidents
          .map((i) => `<p>⚠ <b>${esc(INCIDENT_LABEL[i.incident_type] || i.incident_type)}</b>: ${esc(i.damage_description)} <span class="muted">(${esc(i.compensation_status)})</span></p>`)
          .join('')}</div>`
      : '';

    return `
      <article class="card" data-request="${r.id}">
        <header class="card-head">
          <div><strong>${esc(r.request_code)}</strong> ${badge(r.overall_status)}</div>
          <span class="muted">${fmt(r.expected_start_time)} → ${fmt(r.expected_end_time)}</span>
        </header>
        <dl class="meta">
          <dt>Sinh viên</dt><dd>${esc(r.student.full_name)} <span class="muted">${esc(r.student.user_code)}</span></dd>
          <dt>GV duyệt</dt><dd>${esc(r.teacher.full_name)}</dd>
          ${r.course_subject ? `<dt>Môn học</dt><dd>${esc(r.course_subject)}</dd>` : ''}
          <dt>Mục đích</dt><dd>${esc(r.purpose)}</dd>
        </dl>
        ${lines}${room}${comments}${incidents}
        ${footer || ''}
      </article>`;
  }

  const listOrEmpty = (items, render, empty) => (items.length ? items.map(render).join('') : `<p class="muted">${empty}</p>`);

  LEMS.ui = { esc, fmt, badge, requestCard, listOrEmpty, STATUS_LABEL, ROLE_LABEL, CONDITION_LABEL };

  /* ------------------------------------------------------------------ */
  LEMS.createUI = function createUI(root, service, options) {
    options = options || {};
    const state = { userId: null };

    const currentUser = () => service.listUsers().find((u) => u.id === state.userId);
    const viewFor = (user) => ({ STUDENT: LEMS.views.student, TEACHER: LEMS.views.teacher, LAB_MANAGER: LEMS.views.manager })[user.role];

    function flash(type, text) {
      const box = root.querySelector('#flash');
      box.className = `flash flash-${type}`;
      box.textContent = text;
      box.hidden = false;
      box.scrollIntoView({ block: 'nearest' });
    }

    /* Gọi một nghiệp vụ: thành công -> vẽ lại; lỗi nghiệp vụ -> báo lỗi, giữ nguyên form.
       `message` là chuỗi, hoặc hàm (kết quả) -> chuỗi | {type, text} */
    function run(action, message) {
      try {
        const result = action();
        render();
        const m = typeof message === 'function' ? message(result) : message;
        if (typeof m === 'string') flash('ok', m);
        else flash(m.type, m.text);
      } catch (err) {
        if (err instanceof LEMS.BusinessError) flash('error', err.message);
        else {
          console.error(err);
          flash('error', 'Lỗi hệ thống: ' + err.message);
        }
      }
    }

    const ctx = () => ({ service, user: currentUser(), run });

    function render() {
      const users = service.listUsers().filter((u) => LEMS.ui.ROLE_LABEL[u.role]);
      if (!state.userId || !users.some((u) => u.id === state.userId)) state.userId = users[0].id;
      const user = currentUser();
      root.innerHTML = `
        <header class="topbar">
          <div class="brand">LEMS <span>Mượn thiết bị thí nghiệm & phòng thực hành</span></div>
          <label class="who">Đăng nhập:
            <select data-change="switch-user">
              ${users
                .map(
                  (u) =>
                    `<option value="${u.id}" ${u.id === user.id ? 'selected' : ''}>${esc(ROLE_LABEL[u.role])} — ${esc(u.full_name)}${
                      u.status === 'SUSPENDED' ? ' (bị khóa)' : ''
                    }</option>`
                )
                .join('')}
            </select>
          </label>
          <button type="button" class="ghost" data-action="reset">Nạp lại dữ liệu mẫu</button>
        </header>
        <div id="flash" hidden></div>
        <main>${viewFor(user).render(ctx())}</main>`;
    }

    root.addEventListener('click', (e) => {
      const el = e.target.closest('[data-action]');
      if (!el || !root.contains(el)) return;
      if (el.dataset.action === 'reset') {
        if (options.onReset) options.onReset();
        render();
        flash('ok', 'Đã nạp lại dữ liệu mẫu.');
        return;
      }
      const handler = (viewFor(currentUser()).actions || {})[el.dataset.action];
      if (handler) handler(el, ctx());
    });

    root.addEventListener('submit', (e) => {
      const handler = (viewFor(currentUser()).forms || {})[e.target.dataset.form];
      if (handler) {
        e.preventDefault();
        handler(e.target, ctx());
      }
    });

    root.addEventListener('change', (e) => {
      if (e.target.dataset.change === 'switch-user') {
        state.userId = Number(e.target.value);
        render();
      }
    });

    return { start: render };
  };
})(typeof window !== 'undefined' ? window : globalThis);
