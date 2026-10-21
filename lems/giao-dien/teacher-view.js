/* =============================================================================
 * TẦNG GIAO DIỆN — Màn hình GIẢNG VIÊN: duyệt / từ chối đơn được gửi cho mình.
 * ========================================================================== */
(function (g) {
  'use strict';
  const LEMS = g.LEMS;
  const { requestCard, listOrEmpty } = LEMS.ui;

  const commentOf = (el) => el.closest('.card').querySelector('[name="comment"]').value;

  LEMS.views.teacher = {
    render({ service, user }) {
      const mine = service.listRequests((r) => r.teacher_id === user.id);
      const pending = mine.filter((r) => r.overall_status === 'SUBMITTED');
      const handled = mine.filter((r) => r.overall_status !== 'SUBMITTED');

      const actions = (r) => `
        <div class="actions">
          <input name="comment" placeholder="Nhận xét (bắt buộc khi từ chối)">
          <button type="button" class="primary" data-action="approve" data-id="${r.id}">Duyệt</button>
          <button type="button" class="danger" data-action="reject" data-id="${r.id}">Từ chối</button>
        </div>`;

      return `
        <section class="panel">
          <h2>Đơn chờ duyệt (${pending.length})</h2>
          ${listOrEmpty(pending, (r) => requestCard(r, actions(r)), 'Không có đơn nào đang chờ bạn duyệt.')}
        </section>
        <section class="panel">
          <h2>Đã xử lý (${handled.length})</h2>
          ${listOrEmpty(handled, (r) => requestCard(r), 'Chưa có.')}
        </section>`;
    },

    actions: {
      approve(el, { service, user, run }) {
        run(() => service.approveRequest(user.id, Number(el.dataset.id), commentOf(el)), 'Đã duyệt đơn — chuyển cho kho bàn giao.');
      },
      reject(el, { service, user, run }) {
        run(() => service.rejectRequest(user.id, Number(el.dataset.id), commentOf(el)), 'Đã từ chối đơn.');
      },
    },
  };
})(window);
