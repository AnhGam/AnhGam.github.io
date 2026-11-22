/* =============================================================================
 * TẦNG GIAO DIỆN — Màn hình CÁN BỘ QUẢN LÝ LAB:
 *   xác nhận còn thiết bị (TD-05), bàn giao (gán serial, CHECK-OUT) và nhận trả.
 * ========================================================================== */
(function (g) {
  'use strict';
  const LEMS = g.LEMS;
  const { esc, requestCard, listOrEmpty, CONDITION_LABEL } = LEMS.ui;

  const conditionOptions = () =>
    Object.keys(CONDITION_LABEL)
      .map((c) => `<option value="${c}">${esc(CONDITION_LABEL[c])}</option>`)
      .join('');

  async function dispatchForm(service, r) {
    const takenByModel = {};
    const optionsByModel = new Map();
    for (const line of r.lines) {
      if (!optionsByModel.has(line.model_id)) {
        optionsByModel.set(line.model_id, await service.availableItemsFor(line.model_id));
      }
    }
    const rows = r.lines
      .map((line) => {
        const options = optionsByModel.get(line.model_id) || [];
        const idx = (takenByModel[line.model_id] = (takenByModel[line.model_id] || 0) + 1) - 1;
        const preset = options[idx];
        return `<label class="row">${esc(line.model.model_name)}
          <select data-line="${esc(line.id)}">
            ${options.length ? '' : '<option value="">— Hết hàng —</option>'}
            ${options
              .map((i) => `<option value="${esc(i.id)}" ${preset && preset.id === i.id ? 'selected' : ''}>${esc(i.asset_barcode)} · ${esc(i.serial_number)} · ${esc(i.condition_state)}</option>`)
              .join('')}
          </select></label>`;
      })
      .join('');
    return `
      <div class="actions col">
        ${rows}
        <div class="actions">
          <input name="comment" placeholder="Lý do (khi từ chối)">
          <button type="button" class="primary" data-action="dispatch" data-id="${esc(r.id)}">Bàn giao</button>
          <button type="button" class="danger" data-action="reject-dispatch" data-id="${esc(r.id)}">Từ chối</button>
        </div>
      </div>`;
  }

  function checkInForm(r) {
    const rows = r.lines
      .map(
        (line) => `<div class="row">
          <span>${esc(line.model.model_name)} <code>${esc(line.item.asset_barcode)}</code></span>
          <select data-cond="${esc(line.id)}">${conditionOptions()}</select>
          <input data-note="${esc(line.id)}" placeholder="Ghi chú">
        </div>`
      )
      .join('');
    const room = r.booking
      ? `<div class="row">
          <span>Phòng <code>${esc(r.booking.room.room_code)}</code></span>
          <select data-cond="room">${conditionOptions()}</select>
          <input data-note="room" placeholder="Ghi chú">
        </div>`
      : '';
    return `
      <div class="actions col">
        ${rows}${room}
        <div class="actions">
          <button type="button" class="primary" data-action="check-in" data-id="${esc(r.id)}">Nhận trả & đóng đơn</button>
        </div>
      </div>`;
  }

  function confirmForm(r, now) {
    const left = Math.max(0, Math.ceil((r.pending_since + 15 * 60 * 1000 - now) / 60000));
    return `
      <div class="actions">
        <span class="muted">Còn khoảng ${left} phút để xác nhận</span>
        <button type="button" class="primary" data-action="confirm" data-id="${esc(r.id)}">Xác nhận còn thiết bị</button>
      </div>`;
  }

  LEMS.views.manager = {
    async render({ service }) {
      const [pendingConfirm, toDispatch, borrowing, closed, items] = await Promise.all([
        service.listRequests((r) => r.overall_status === 'PENDING_CONFIRM'),
        service.listRequests((r) => r.overall_status === 'TEACHER_APPROVED'),
        service.listRequests((r) => r.overall_status === 'BORROWING'),
        service.listRequests((r) => ['COMPLETED', 'INCIDENT_PENDING', 'MANAGER_REJECTED'].includes(r.overall_status)),
        service.listItems(),
      ]);
      const now = Date.now();
      const dispatchCards = await Promise.all(toDispatch.map(async (r) => requestCard(r, await dispatchForm(service, r))));

      return `
        <section class="panel">
          <h2>Chờ kho xác nhận (${pendingConfirm.length})</h2>
          ${listOrEmpty(pendingConfirm, (r) => requestCard(r, confirmForm(r, now)), 'Không có đơn nào đang chờ xác nhận.')}
        </section>
        <section class="panel">
          <h2>Chờ bàn giao (${toDispatch.length})</h2>
          ${dispatchCards.length ? dispatchCards.join('') : '<p class="muted">Không có đơn nào đã được giảng viên duyệt.</p>'}
        </section>
        <section class="panel">
          <h2>Đang mượn (${borrowing.length})</h2>
          ${listOrEmpty(borrowing, (r) => requestCard(r, checkInForm(r)), 'Không có đơn đang mượn.')}
        </section>
        <section class="panel">
          <h2>Tình trạng kho</h2>
          <table class="tbl">
            <thead><tr><th>Mã tài sản</th><th>Serial</th><th>Thiết bị</th><th>Tình trạng</th><th>Trạng thái</th></tr></thead>
            <tbody>
              ${items
                .map(
                  (i) => `<tr>
                    <td><code>${esc(i.asset_barcode)}</code></td><td>${esc(i.serial_number)}</td>
                    <td>${esc(i.model ? i.model.model_name : '')}</td><td>${esc(i.condition_state)}</td>
                    <td><span class="op op-${esc(i.operational_status)}">${esc(i.operational_status)}</span></td>
                  </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </section>
        <section class="panel">
          <h2>Đã đóng (${closed.length})</h2>
          ${listOrEmpty(closed, (r) => requestCard(r), 'Chưa có.')}
        </section>`;
    },

    actions: {
      async confirm(el, { service, user, run }) {
        await run(() => service.confirmRequest(user.id, el.dataset.id), 'Đã xác nhận — đơn chuyển sang Chờ bàn giao.');
      },
      async dispatch(el, { service, user, run }) {
        const card = el.closest('.card');
        const assignments = {};
        card.querySelectorAll('select[data-line]').forEach((s) => (assignments[s.dataset.line] = s.value));
        await run(() => service.dispatchRequest(user.id, el.dataset.id, assignments), 'Đã bàn giao — đơn chuyển sang Đang mượn.');
      },
      async 'reject-dispatch'(el, { service, user, run }) {
        const comment = el.closest('.card').querySelector('[name="comment"]').value;
        await run(() => service.rejectDispatch(user.id, el.dataset.id, comment), 'Đã từ chối bàn giao.');
      },
      async 'check-in'(el, { service, user, run }) {
        const card = el.closest('.card');
        const results = {};
        card.querySelectorAll('select[data-cond]').forEach((s) => {
          const key = s.dataset.cond;
          results[key] = { condition: s.value, notes: card.querySelector(`[data-note="${key}"]`).value };
        });
        await run(
          () => service.checkInRequest(user.id, el.dataset.id, results),
          (r) =>
            r.overall_status === 'INCIDENT_PENDING'
              ? { type: 'warn', text: 'Đã nhận trả nhưng có SỰ CỐ — đơn chờ xử lý đền bù, tài khoản sinh viên bị khóa mượn.' }
              : 'Đã nhận trả — đơn hoàn tất.'
        );
      },
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
