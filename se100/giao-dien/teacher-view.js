/* =============================================================================
 * TẦNG GIAO DIỆN — Màn hình GIẢNG VIÊN: duyệt / từ chối đơn được gửi cho mình.
 * ========================================================================== */
(function (g) {
  'use strict';
  const LEMS = g.LEMS;
  const { esc, requestCard, listOrEmpty } = LEMS.ui;
  const sameId = (a, b) => a != null && b != null && String(a) === String(b);

  const commentOf = (el) => el.closest('.card').querySelector('[name="comment"]').value;

  LEMS.views.teacher = {
    async render({ service, user }) {
      const mine = await service.listRequests((r) => sameId(r.teacher_id, user.id));
      const pending = mine.filter((r) => r.overall_status === 'SUBMITTED');
      const handled = mine.filter((r) => r.overall_status !== 'SUBMITTED');

      const actions = (r) => `
        <div class="actions">
          <input name="comment" placeholder="Nhận xét (bắt buộc khi từ chối)">
          <button type="button" class="primary" data-action="approve" data-id="${esc(r.id)}">Duyệt</button>
          <button type="button" class="danger" data-action="reject" data-id="${esc(r.id)}">Từ chối</button>
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
      async approve(el, { service, user, run }) {
        await run(() => service.approveRequest(user.id, el.dataset.id, commentOf(el)), 'Đã duyệt đơn — kho có 15 phút để xác nhận, quá hạn đơn tự huỷ.');
      },
      async reject(el, { service, user, run }) {
        await run(() => service.rejectRequest(user.id, el.dataset.id, commentOf(el)), 'Đã từ chối đơn.');
      },
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
