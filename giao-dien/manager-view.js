/* =============================================================================
 * TẦNG GIAO DIỆN — Màn hình CÁN BỘ QUẢN LÝ LAB:
 *   bàn giao (gán serial, CHECK-OUT) và nhận trả (kiểm tra, CHECK-IN).
 * ========================================================================== */
(function (g) {
  'use strict';
  const LEMS = g.LEMS;
  const { esc, requestCard, listOrEmpty, CONDITION_LABEL } = LEMS.ui;

  const conditionOptions = () =>
    Object.keys(CONDITION_LABEL)
      .map((c) => `<option value="${c}">${esc(CONDITION_LABEL[c])}</option>`)
      .join('');

  /* Form gán cá thể thiết bị cho từng dòng — mặc định chọn các cá thể khác nhau */
  function dispatchForm(service, r) {
    const takenByModel = {};
    const rows = r.lines
      .map((line) => {
        const options = service.availableItemsFor(line.model_id);
        const idx = (takenByModel[line.model_id] = (takenByModel[line.model_id] || 0) + 1) - 1;
        const preset = options[idx];
        return `<label class="row">${esc(line.model.model_name)}
          <select data-line="${line.id}">
            ${options.length ? '' : '<option value="">— Hết hàng —</option>'}
            ${options
              .map((i) => `<option value="${i.id}" ${preset && preset.id === i.id ? 'selected' : ''}>${esc(i.asset_barcode)} · ${esc(i.serial_number)} · ${esc(i.condition_state)}</option>`)
              .join('')}
          </select></label>`;
      })
      .join('');
    return `
      <div class="actions col">
        ${rows}
        <div class="actions">
          <input name="comment" placeholder="Lý do (khi từ chối)">
          <button type="button" class="primary" data-action="dispatch" data-id="${r.id}">Bàn giao</button>
          <button type="button" class="danger" data-action="reject-dispatch" data-id="${r.id}">Từ chối</button>
        </div>
      </div>`;
  }

  /* Form kiểm tra khi nhận trả */
  function checkInForm(r) {
    const rows = r.lines
      .map(
        (line) => `<div class="row">
          <span>${esc(line.model.model_name)} <code>${esc(line.item.asset_barcode)}</code></span>
          <select data-cond="${line.id}">${conditionOptions()}</select>
          <input data-note="${line.id}" placeholder="Ghi chú">
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
          <button type="button" class="primary" data-action="check-in" data-id="${r.id}">Nhận trả & đóng đơn</button>
        </div>
      </div>`;
  }

  LEMS.views.manager = {
    render({ service }) {
      const toDispatch = service.listRequests((r) => r.overall_status === 'TEACHER_APPROVED');
      const borrowing = service.listRequests((r) => r.overall_status === 'BORROWING');
      const closed = service.listRequests((r) => ['COMPLETED', 'INCIDENT_PENDING', 'MANAGER_REJECTED'].includes(r.overall_status));
      const items = service.listItems();

      return `
        <section class="panel">
          <h2>Chờ bàn giao (${toDispatch.length})</h2>
          ${listOrEmpty(toDispatch, (r) => requestCard(r, dispatchForm(service, r)), 'Không có đơn nào đã được giảng viên duyệt.')}
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
                    <td>${esc(i.model.model_name)}</td><td>${esc(i.condition_state)}</td>
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
      dispatch(el, { service, user, run }) {
        const card = el.closest('.card');
        const assignments = {};
        card.querySelectorAll('select[data-line]').forEach((s) => (assignments[s.dataset.line] = s.value));
        run(() => service.dispatchRequest(user.id, Number(el.dataset.id), assignments), 'Đã bàn giao — đơn chuyển sang Đang mượn.');
      },
      'reject-dispatch'(el, { service, user, run }) {
        const comment = el.closest('.card').querySelector('[name="comment"]').value;
        run(() => service.rejectDispatch(user.id, Number(el.dataset.id), comment), 'Đã từ chối bàn giao.');
      },
      'check-in'(el, { service, user, run }) {
        const card = el.closest('.card');
        const results = {};
        card.querySelectorAll('select[data-cond]').forEach((s) => {
          const key = s.dataset.cond;
          results[key] = { condition: s.value, notes: card.querySelector(`[data-note="${key}"]`).value };
        });
        run(
          () => service.checkInRequest(user.id, Number(el.dataset.id), results),
          (r) =>
            r.overall_status === 'INCIDENT_PENDING'
              ? { type: 'warn', text: 'Đã nhận trả nhưng có SỰ CỐ — đơn chờ xử lý đền bù, tài khoản sinh viên bị khóa mượn.' }
              : 'Đã nhận trả — đơn hoàn tất.'
        );
      },
    },
  };
})(window);
