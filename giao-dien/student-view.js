/* =============================================================================
 * TẦNG GIAO DIỆN — Màn hình SINH VIÊN: tạo đơn mượn, theo dõi đơn của mình.
 * ========================================================================== */
(function (g) {
  'use strict';
  const LEMS = g.LEMS;
  const { esc, requestCard, listOrEmpty } = LEMS.ui;

  function defaultTimes() {
    const start = new Date();
    start.setMinutes(0, 0, 0);
    start.setHours(start.getHours() + 1);
    const end = new Date(start.getTime() + 3 * 3600 * 1000);
    return { start: LEMS.toLocal(start), end: LEMS.toLocal(end) };
  }

  LEMS.views.student = {
    render({ service, user }) {
      const teachers = service.listTeachers();
      const models = service.listModels();
      const rooms = service.listRooms();
      const mine = service.listRequests((r) => r.student_id === user.id);
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
                    ${teachers.map((x) => `<option value="${x.id}">${esc(x.full_name)} · ${esc(x.department ? x.department.dept_code : '')}</option>`).join('')}
                  </select>
                </label>
                <label>Môn học
                  <input name="subject" placeholder="VD: Thí nghiệm Vật lý 2">
                </label>
                <label>Bắt đầu
                  <input type="datetime-local" name="start" value="${t.start}" required>
                </label>
                <label>Kết thúc
                  <input type="datetime-local" name="end" value="${t.end}" required>
                </label>
              </div>
              <label>Mục đích sử dụng
                <textarea name="purpose" rows="2" required placeholder="VD: Đo dạng sóng mạch RC cho bài thí nghiệm số 3"></textarea>
              </label>

              <h3>Thiết bị</h3>
              <table class="tbl">
                <thead><tr><th>Thiết bị</th><th>Hãng</th><th>Sẵn trong kho</th><th>Số lượng</th></tr></thead>
                <tbody>
                  ${models
                    .map(
                      (m) => `<tr>
                        <td>${esc(m.model_name)}</td>
                        <td>${esc(m.brand)}</td>
                        <td>${m.available} ${esc(m.unit)}</td>
                        <td><input class="qty" type="number" name="qty-${m.id}" min="0" max="${m.available}" value="0" ${m.available ? '' : 'disabled'}></td>
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
                        `<option value="${r.id}">${esc(r.room_code)} — ${esc(r.room_name)}${
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
      'create-request'(form, { service, user, run }) {
        const fd = new FormData(form);
        const lines = service.listModels().map((m) => ({ modelId: m.id, quantity: Number(fd.get('qty-' + m.id)) || 0 }));
        run(
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
})(window);
