/* =============================================================================
 * TẦNG GIAO DIỆN — Màn hình SINH VIÊN: tạo đơn mượn, theo dõi đơn của mình.
 * ========================================================================== */
(function (g) {
  'use strict';
  const LEMS = g.LEMS;
  const { esc, requestCard, listOrEmpty } = LEMS.ui;
  const sameId = (a, b) => a != null && b != null && String(a) === String(b);

  function defaultTimes() {
    const start = new Date();
    start.setMinutes(0, 0, 0);
    start.setHours(start.getHours() + 1);
    const end = new Date(start.getTime() + 3 * 3600 * 1000);
    return { start: LEMS.toLocal(start), end: LEMS.toLocal(end) };
  }

  LEMS.views.student = {
    async render({ service, user }) {
      const [teachers, models, rooms, mine] = await Promise.all([
        service.listTeachers(),
        service.listModels(),
        service.listRooms(),
        service.listRequests((r) => sameId(r.student_id, user.id)),
      ]);
      const locked = user.status === 'SUSPENDED';
      const t = defaultTimes();

      return `
        <section class="panel">
          <h2>Tạo đơn mượn</h2>
          ${locked ? '<p class="flash flash-error">Tài khoản đang bị KHÓA MƯỢN (trả trễ hoặc còn sự cố chưa đền bù). Liên hệ cán bộ quản lý Lab.</p>' : ''}
          <form data-form="create-request">
            <fieldset ${locked ? 'disabled' : ''}>
              <div class="grid2">
                <label>Giảng viên duyệt
                  <select name="teacherId" required>
                    <option value="">— Chọn giảng viên —</option>
                    ${teachers.map((x) => `<option value="${esc(x.id)}">${esc(x.full_name)} · ${esc(x.department ? x.department.dept_code : '')}</option>`).join('')}
                  </select>
                </label>
                <label>Môn học
                  <input name="subject" placeholder="VD: Thí nghiệm Vật lý 2">
                </label>
                <label>Ngày mượn
                  <input type="datetime-local" name="start" value="${t.start}" required>
                </label>
                <label>Ngày trả dự kiến
                  <input type="datetime-local" name="end" value="${t.end}" required>
                </label>
              </div>
              <label>Mục đích sử dụng
                <textarea name="purpose" rows="2" required placeholder="VD: Đo dạng sóng mạch RC cho bài thí nghiệm số 3"></textarea>
              </label>

              <h3>Thiết bị</h3>
              <table class="tbl">
                <thead><tr><th>Thiết bị</th><th>Hãng</th><th>Tổng số</th><th>Còn có thể mượn</th><th>Số lượng</th></tr></thead>
                <tbody>
                  ${models
                    .map(
                      (m) => `<tr>
                        <td>${esc(m.model_name)}</td>
                        <td>${esc(m.brand)}</td>
                        <td>${m.total} ${esc(m.unit)}</td>
                        <td>${m.available} ${esc(m.unit)}</td>
                        <td>${
                          m.available
                            ? `<input class="qty" type="number" step="any" name="qty-${esc(m.id)}" placeholder="0">`
                            : '<span class="muted">Hết, không thể gửi đơn</span>'
                        }</td>
                      </tr>`
                    )
                    .join('')}
                </tbody>
              </table>

              <label>Mượn kèm phòng (tuỳ chọn)
                <select name="roomId">
                  <option value="">Không mượn phòng</option>
                  ${rooms
                    .map(
                      (r) =>
                        `<option value="${esc(r.id)}">${esc(r.room_code)} — ${esc(r.room_name)}${
                          r.is_special_approval_required ? ` ★ cần GV ${esc(r.department ? r.department.dept_code : '')} duyệt` : ''
                        }</option>`
                    )
                    .join('')}
                </select>
              </label>

              <button type="submit" class="primary">Nộp đơn</button>
            </fieldset>
          </form>
        </section>

        <section class="panel">
          <h2>Đơn của tôi (${mine.length})</h2>
          ${listOrEmpty(mine, (r) => requestCard(r), 'Chưa có đơn nào.')}
        </section>`;
    },

    forms: {
      async 'create-request'(form, { service, user, run }) {
        const fd = new FormData(form);
        const models = await service.listModels();
        const lines = models
          .map((m) => ({ modelId: m.id, quantity: fd.get('qty-' + m.id) }))
          .filter((l) => l.quantity !== null && String(l.quantity).trim() !== '');
        await run(
          () =>
            service.createRequest(user.id, {
              teacherId: fd.get('teacherId'),
              subject: fd.get('subject'),
              purpose: fd.get('purpose'),
              start: fd.get('start'),
              end: fd.get('end'),
              roomId: fd.get('roomId'),
              lines,
            }),
          'Đã nộp đơn — đang chờ giảng viên duyệt.'
        );
      },
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
