# 12 — Ma Trận Phụ Thuộc, Danh Sách Sửa Lore & Checklist Playtest

## Q12.1 — Ma trận "đổi số này thì phải rà lại gì"

| Nếu đổi… | Phải rà lại | Vì sao |
|---|---|---|
| Độ phân giải / tile (01 Q1.1) | **mọi file** | mọi khoảng cách tính bằng ô |
| Hitbox hero (01 Q1.2) | 01 Q1.3 (cửa, trần), 03 (khe bò), 05 (hurtbox ↔ đạn) | va chạm kiến trúc |
| Tốc đi (02 Q2.1) | nhảy xa (02 Q2.2) ⇒ mọi khe ở 03 Q3.2–3.3; camera lookahead (01 Q1.4) | khe = tốc × thời gian bay |
| Nhảy cao / trọng lực (02 Q2.2) | gờ 7 ô (cổng F1), trần hành lang (01 Q1.3), hồ muối nảy (02 Q2.8), đấu trường B1 (sàn trên 7 ô), độ cao pogo (04 Q4.2) | chạy lại `_calc/metrics.py` |
| **Dash quãng** (02 Q2.3) | cửa sổ khe 17–20 (03 Q3.3), Mạch Lướt 24–27, vực móc ≥ 30, tầm chém sau khi xuyên (04 Q4.2), kích cỡ quái (05) | 4 lý do chọn 7 ô đều phải còn đúng |
| Đạp tường (02 Q2.4) | gờ nghỉ mỗi ≤ 30 ô, stamina | |
| Stamina (02 Q2.7) | luật túi nước lặng, B4 hút nước, B5 Pha 2 | |
| Sát thương kiếm (04 Q4.3) | **máu mọi quái** (05 Phần B), máu boss (06), tỉ lệ súng (04 Q4.5), skill (07 Q7.3), bảng sức mạnh (09 Q9.6) | máu = nhát × sát thương |
| Mana / nhát (04 Q4.5) | súng, skill, Ấn Huyết Tràn, Ấn Tái Tạo | |
| Bình / hồi (04 Q4.6) | kiểm toán hồi trong trận boss (04 Q4.6), số lần thử (10) | |
| Báo trước tối thiểu (05 QA.1) | mọi đòn quái + boss, chế độ Áp Suất Cao (10 Q10.5) | sàn công bằng |
| Vị trí vật liệu (09 Q9.1) | khóa bậc kiếm theo boss (06 Q6.1), luật mở đầu Tầng II (08a §3, 10 Q10.2) | |
| Thứ tự năng lực (07 Q7.6) | cổng / then (07 Q7.7), từng khu (08), đường cong độ khó (10), Test-Chamber Lock (17 Q17.5) | |
| HUD / Diegetic cue (14) | tâm khóa súng, mốc 33/66/99 Mana (17 Q17.8), Quiet Room (17 Q17.11) | giữ màn hình ≤ 1,65% |
| Hitstop / Vũ đạo Chết (11, 17) | thời gian xóa đạn Boss tại f12 (17 Q17.3), nhịp uống bình 54f (04 Q4.6, 17 Q17.8) | đồng bộ cảm giác 60 fps |

## Q12.2 — Lore phải sửa (bảng giao cho phần lore / Tab 1–3)

| # | File lore | Ghi cũ | Sửa thành | Lý do (file design) |
|---|---|---|---|---|
| L1 | `systems/fivefold-severance-and-physics.md` §2B, `characters/hero-captain-kors.md` §3, `artifacts/five-vessels-of-form.md` §2A | Chém kiếm tốn Stamina | Chém **không** tốn stamina; stamina chỉ cho gắng sức với môi trường (chống dòng, bám tường, treo móc, lặn muối). Lý do lore: lưỡi kiếm rơi theo trọng lượng chì | 02 Q2.7, 04 |
| L2 | `artifacts/five-vessels-of-form.md` §1 hàng 0–1 | Dash chỉ có từ Đôi Chân | Có **Quẫy Vây** (dash ngắn 4 ô, không i-frame) từ đầu; Đôi Chân nâng thành Dash Áp Suất 7 ô + i-frame | 02 Q2.3 |
| L3 | `systems/ecology-and-treasure-economy.md`, `npc-cast.md` Boyle | Mua / nạp Bình Huyết Tảo ở shop | Bình **tự nạp tại Chuông Lặn**; vàng chỉ mua **thêm số bình**; Huyết Tảo nâng **lượng hồi** | 04 Q4.6, 09 |
| L4 | `locations/depth-strata-and-swim-zones.md`, các file khu | Khu nào cũng có vùng bơi lớn | Vùng bơi là **điểm nhấn cục bộ**, tổng ~25% bản đồ | 08a Q8.0 |
| L5 | `five-vessels-of-form.md` hàng 2 | "Mở chuỗi Combo Kiếm 4 Nhát" | Combo 3 nhát từ đầu; Đôi Tay **thêm nhát 4 Neo Bổ** | 04 Q4.2 |
| L6 | (mới) | — | Đỡ đòn kiểu Hollow Knight: chém trúng đòn **viền bạc** | 04 Q4.4 |
| L7 | `five-vessels-of-form.md` hàng 3 | Thân Mình: "Lướt Dòng Hải Quang Bền Bỉ" | = **Mạch Lướt** (2 dash trên không) + **Nhát Cắt Hải Quang** | 07 Q7.2–7.3 |
| L8 | `ecology-and-treasure-economy.md` bảng giá | Bình 15 Sv, mana 35 Sv, nòng 60–140 | Theo bảng giá mới (09 Q9.4) | 09 |
| L9 | `npc-cast.md` Boyle | Nâng HP & Stamina bằng Sv; đánh bóng kiếm ở Boyle | Boyle: +Vảy, +stamina (San Hô Lam Ngọc), Huyết Tảo Đậm, bùa sớm. **Marlow** rèn kiếm bậc 1–3; bậc 4 ở Bàn Đúc Tế Đàn | 09 |
| L10 | `bestiary-abyssal-fauna.md` | 14 loài | + **10 loài mới** (05 Phần C): Đỉa Dầu Trần, Bầy Cá Mòi Xương, Lươn Ống Khí, Rận Muối Kết Tinh, Cá Dơi Sonar, Cua Đèn Đền, Chình Phù Ấn, Nhện Biển Xương, Cá Đèn Mồi Con, Bóng Nước Kiểm Định + 7 mini-boss (`06` Q6.4; 2 mới: Mẹ Đỉa Dầu, Người Gác Đàn Ống) | 05 |
| L11 | `entity-visual-registry.md`, Tab 3 Codex | 12 vật liệu không có công dụng | Mỗi vật liệu có 1 công dụng + số lượng cố định (09 Q9.1) | 09 |
| L12 | (mới) | — | Hậu game: Áp Lực Chì tan ⇒ bơi 360° toàn bản đồ; trả nợ Boyle 500 Sv đổi cảnh kết | 08b, 09 |
| L13 | `shipwreck-graveyard.md` | — | Thêm mốc **Mỏm Cột Buồm Cờ Đỏ** (gờ 7 ô, cổng F1 đầu tiên) | 08a §1.3 |
| L14 | `diegetic-fragments.md`, `data-map.js` (POI ghi "Mảnh #1–#6") | Vật phẩm lore gọi "Mảnh #n" | Gọi **"Bản Ghi #n"**, vì story.md dùng "Mảnh #5" cho Ấn Ký Ký Ức ⇒ trùng tên | 09 Q9.7 |
| L15 | `ecology-and-treasure-economy.md` | Nc là tiền lẻ Rigg nhận | Giữ Nc, **tự quy đổi 10 Nc = 1 Sv** khi nhặt (bớt một loại tiền) | 09 Q9.4 |
| L16 | `five-vessels-of-form.md` §2B, `npc-cast.md` Marlow | Đạn Nhiệt từ "Hang Tảo / Marlow"; Ống Ngắm ở Ống Vang | Đạn Nhiệt **nhặt ở Hang Tảo nửa sau (F1)**, Marlow chỉ nâng "Cháy Lâu"; Ống Ngắm chế tại **Bàn Đúc Thal-Vael** ở Ống Vang; kiếm bậc 4 rèn ở **Bàn Đúc Tế Đàn** | 07 Q7.4, 09 Q9.1 |
| L18 | `five-vessels-of-form.md` §2B vs `npc-cast.md` Marlow | Hai file nói khác nhau: "nhặt khẩu phế liệu Tầng I" vs "Marlow chế súng" | Thống nhất: **nhặt khẩu phế liệu ở Tầng I**; Marlow **nâng cấp** (nòng, khoang mana) | 07 Q7.4 |
| L19 | `four-abyssal-wardens.md` B2, `data-map.js` | "80 ms khóa chốt"; Chuông 4 ở 600 m | 80 ms = **khung chém** của cú đấm (5 f); **khóa chốt báo trước 40 f** là thêm mới. Đấu trường B2 ở 740 m (đã có trên bản đồ lore), gần xác Chuông 4 (600 m) | 06 B2 |
| L17 | `depth-strata-and-swim-zones.md` §3 | Thân Mình "vượt đới đứt gãy" theo độ sâu | Cổng áp suất theo **vị trí** (mọi lối vào Rãnh có màng áp suất); Ống Vang 1.100–1.480 m vẫn an toàn nhờ kiến trúc cân áp | 08b §6.4 |

> **Trạng thái:** Toàn bộ **L1–L19** đã đồng bộ vào `lore/worldbuilding/` + `lore-tree/` và **12 concept art** (10 quái mới + 2 mini-boss) đã hoàn tất tại `lore-tree/assets/entities/*.jpg`.

## Q12.3 — Checklist playtest (theo thứ tự ưu tiên)

### Greybox 1 — "Phòng đo" (metrics zoo)
Dựng 1 phòng chứa đủ: khe 10 / 13 / 14 / 17 / 20 / 24 / 27 / 30 ô, gờ 4 / 5 / 7 / 8 / 10 ô, giếng 4 ô cao 40 ô có gờ nghỉ ở 30, hành lang trần 2 / 5 / 12 ô, hồ muối (gờ đích 8 và 12), dòng chảy có túi nước lặng mỗi 13 ô, 4 vòng neo. So với số của `_calc/metrics.py`. Mục tiêu: **xác nhận mọi bất đẳng thức cổng có lề ≥ 1 ô** với F0 và F1 thật trong engine. (Level Design Book "metrics zoo", `R1` §7)

### Greybox 2 — Vòng chiến đấu
Cutlass + clash + súng + 3 loài Tầng I. Đo:
- Thời gian trung bình để đầy 1 phát súng trong trận thật. Mục tiêu 2,5–4 s (3 nhát + di chuyển).
- Tỉ lệ sát thương từ súng / tổng sát thương. Mục tiêu **15–35%** (tiêu hết mana tối đa ~34–36%, `_calc`). > 40% ⇒ có lỗi (ví dụ nguồn mana ngoài chém quá dễ) hoặc súng quá mạnh (đứng xa bắn).
- Số clash mỗi phút. Kỳ vọng người mới 0–1, người giỏi 3–6. Nếu 0 với mọi người ⇒ viền bạc chưa dễ thấy.

### Greybox 3 — B1 đầy đủ
KPI ở 10 Q10.6 (trung vị 1–3 lần thử; thắng sát nút ≥ 60%).

### Theo dõi suốt playtest (log tự động)
| Log | Dùng để |
|---|---|
| Vị trí + nguyên nhân mỗi lần chết | bản đồ nhiệt chết (10 Q10.6), lỗi báo trước (05 Phần E) |
| Thời gian tới mỗi mốc năng lực | so với 07 Q7.6 (lệch > 40% ⇒ sửa) |
| Thời gian trong từng loại phòng | kiểm tỉ lệ phòng (03 Q3.6, hiện là số [D] chưa đo) |
| Số lần thử + máu còn lại mỗi boss | 06 Q6.2, 10 |
| Vật phẩm nhặt theo khu | mật độ thưởng (09 Q9.8) |
| Có quay lại Tầng I trước B3 không | 10 Q10.2 (< 60% ⇒ đổi thành bắt buộc) |
| Số lần stamina về 0 và ở đâu | 02 Q2.7 (một chỗ chiếm > 20% ⇒ thêm gờ / túi nước lặng) |

## Q12.4 — Những gì tài liệu này CHƯA trả lời (trung thực)
| Chưa có | Vì sao | Khi nào làm |
|---|---|---|
| Sơ đồ phòng chi tiết cho **toàn bộ** ~220 phòng | Mới có chi tiết phòng-từng-phòng cho đoạn đầu mỗi khu (5–8 phòng). Phần còn lại cần greybox thật mới xác định được | Sau Greybox 1–3 |
| Hoạt ảnh từng khung cho đòn của quái | Thuộc art (`previs`), cần hình quái mới | Khi làm art quái |
| Nhạc / bảng âm thanh chi tiết | Ngoài phạm vi đợt này | Sau |
| Cốt truyện thoại đầy đủ | Lore đã có khung thoại NPC theo mốc 0/5 → 4/5 | Sau |
| Engine / nền tảng | **Đã chốt: Unity hoặc Godot**. Cả hai làm được 640×360 pixel-perfect + camera mượt (01 Q1.6). Không còn câu hỏi mở về engine | — |
