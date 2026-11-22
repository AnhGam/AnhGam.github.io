# 16 — Kiểm Toán Đối Chiếu 10 Trụ Cột Với Game Đỉnh (Chỉ Điểm Khác Biệt & Đã Sửa)

> Phụ thuộc vào: toàn bộ `00`–`15`, `_research/R1`–`R12`.
> Đối chiếu *Abyssal Severance* với **Hollow Knight, Silksong, Ori WotW, Metroid Dread, Nine Sols, Blasphemous 2, Prince of Persia: The Lost Crown, Celeste, Dead Cells, Subnautica**. Chỉ liệt kê **điểm khác biệt** và **lỗi ẩn vừa tìm ra & đã vá**.

---

## Phần A — 8 lỗi ẩn (P0/P1) phát hiện qua vòng kiểm toán R12 & đã sửa ngay

| Mức | Lỗi phát hiện | Ảnh hưởng nếu không sửa | Đã sửa thành | File đã cập nhật |
|---|---|---|---|---|
| **P0** | **Xung đột input Pogo vs Dậm Nặng** (`↓ + Chém` vs `↓ ≥ 0,15 s + Chém`) | Người chơi giữ `↓` chuẩn bị pogo trên Rận Muối bị kích hoạt nhầm Dậm Nặng lao thẳng xuống vực | Tách hẳn: `↓ + Chém` trên không = Pogo; **`↓ + Dash` trên không = Dậm Nặng**; lập bảng Ngân sách 8 nút | `02`, `04`, `15` Q15.4 |
| **P0** | **Tự nerf ở Ấn Huyết Tràn** (chỉ tích khi Mana đầy 100%) | Nâng khoang Mana `99 → 165` khiến người chơi phải chém **21 nhát thay vì 15** mới hồi 1 Vảy — nâng cấp lại làm yếu bùa | Đổi điều kiện: tích bộ đếm độc lập (**mỗi 12 nhát chém trúng = +1 Vảy**, không phụ thuộc trần Mana tối đa) | `04` Q4.6, `09` Q9.2 |
| **P0** | **Nguy cơ Soft-Starve kinh tế** (ngừng rơi tiền sau 5 lần/khu + mất tiền khi chết + biên dư chỉ ~130 Sv) | Người chơi chết vài lần có thể không đủ 220 Sv rèn Kiếm bậc 4 ở cuối game | (1) Chuyển sang **Zero-Loss khi chết** (`15` Q15.1); (2) bỏ ngưỡng 0% sau 5 lần giết — giảm dần về **30% Sv**, không bao giờ về 0 | `09` Q9.4–Q9.5, `15` Q15.1 |
| **P1** | **Rủi ro mất vĩnh viễn 2 Hạt Hải Quang** rơi từ tinh nhuệ đặt sẵn | Giết tinh nhuệ trên hố gai ⇒ Hạt rơi xuống vực không nhặt được | **Tự hút vào túi (auto-collect)** ngay khi tinh nhuệ chết | `09` Q9.8 |
| **P1** | **Trùng màu Khóa Súng ("mắt đỏ đồng") với Đòn Đỏ** dưới 450 m | Vi phạm quy ước "Đỏ = duy nhất đòn không đỡ được" | Đổi Khóa Súng thành **tâm ngắm đồng phát sáng xanh ngọc-hổ phách** | `08a`, `11` |
| **P1** | **21 loại "then" (cổng) quá dày** cho game 11 giờ | Người chơi khó nhớ 21 dấu hiệu thị giác khác nhau | Gom về **10 họ thị giác** thống nhất + Auto-Icon trên bản đồ & 15 Ảnh Ký Ức (`15` Q15.3) | `07` Q7.7, `15` Q15.3 |
| **P1** | **Cộng dồn 2 lớp giảm máu B5** (Pha 1 còn 60% khi chết ở Pha 3 + mẹo ẩn −24% máu boss ở `10` Q10.4) | Trận cuối có thể tụt máu quá sâu thành dễ hụt hẫng | Khóa luật: **không cộng dồn** — mẹo ẩn giảm máu boss tắt ở Pha 1 B5 khi đã kích hoạt giảm 60% | `06` B5, `10` Q10.4 |
| **P1** | **Khung nhìn F4 hơi chật (6,4 H)** khi bơi 360° đấu B5 | Tầm nhìn dọc hẹp hơn chuẩn Metroidvania 360° (8–9 H) | Camera tự lùi nhẹ **×1,15** trong đấu trường B5 (khoảng 7,4 H hiệu dụng, giữ tỷ lệ nguyên khi render qua shader zoom mượt) | `01`, `06` B5 |

---

## Phần B — Bảng đối chiếu 10 trụ cột: Ta KHÁC các game đỉnh ở đâu (chủ đích vs cần theo dõi)

| # | Trụ cột | Chuẩn game đỉnh (HK / Ori / Dread / Nine Sols / PoP / Celeste) | *Abyssal Severance* | Khác biệt có chủ đích? |
|---|---|---|---|---|
| 1 | **Di chuyển & Vật lý** | HK/Celeste: không stamina cho combat; dash ~6–8 ô; coyote 5–7 f | Khớp chuẩn; **khác:** có **25% vùng bơi 360°** xen kẽ đi bộ 2D (tổng hợp cả 2 không gian) và Quẫy Vây 4 ô ngay từ đầu (không i-frame) | **Có chủ đích** (Trụ cột 1: biển là sức mạnh) |
| 2 | **Địa hình & Bản đồ** | HK: 14–15 khu / ~40h; Ori/Dread: 8–10 khu / 8–11h; PoP: 15–30 Memory Shards | 8 khu / ~11h, ~220 phòng, 3 vòng lặp lớn, **15 Ảnh Ký Ức** + Auto-Icon 10 họ cổng | Khớp Ori/Dread + học PoP |
| 3 | **Chiến đấu & Tài nguyên** | HK: chém nạp Soul → phép/hồi; Nine Sols: nút parry riêng; Dread: phản đòn riêng | **Khác:** Chém nạp Mana **chỉ cho súng/skill**, còn **hồi máu tách sang Bình miễn phí ở Chuông** (không tranh tài nguyên như HK) + **Clash Parry kiểu HK** (không cần nút riêng) | **Có chủ đích** (Trụ cột 2: Chém để bắn) |
| 4 | **Quái & AI** | HK: 168 journal; Blasphemous: ~45% tái sử dụng; Dread: báo trước rõ | 24 loài + 7 mini-boss (**3,9 loài/khu**, đúng chuẩn 3–7); từ khu 6 tái sử dụng ≥ 50%; token tấn công + phát đầu xạ thủ trượt | Khớp chuẩn |
| 5 | **Boss & Mini-boss** | Thể loại: 0,7–1,6 trận/giờ, 40–85% tùy chọn; HK 47 trận (7 bắt buộc) | 5 boss chính + 7 mini-boss = **12 trận (1,1/giờ, 58% tùy chọn)**; thêm cơ chế **phá bộ phận** (bản lề mai, chùy, xúc tu, mồi giả, Neo Nước) | Khớp chuẩn; phá bộ phận là điểm nhấn riêng |
| 6 | **Kỹ năng & Tiến trình** | Hầu hết MV: nâng cấp là item gắn thêm | **Khác:** **5 Hóa Hình cơ thể** thay đổi trực tiếp sprite + hitbox (`14×36 → 18×56`) + động từ di chuyển | **Có chủ đích** (trục lore cốt lõi) |
| 7 | **Kinh tế & Craft** | HK (6/6), Silksong (8/8), Ori (40/40) cố định; Dead Cells/Bloodstained bị chê drop 0,4–3% | **31 nhặt = 31 cần**, 0% cày, gom **4 nhóm icon**; có lỗ thoát tiền cuối game (500 Sv nợ Boyle) | Khớp chuẩn tốt nhất |
| 8 | **Độ khó & Nhịp** | Ori/HK/Celeste: răng cưa phân đoạn, platforming thuần có thể D rất cao nhưng I thấp (White Palace 86% qua) | Tách **2 đường D & I**, 9 loại đoạn, biểu đồ 8 khu, chạy trốn có checkpoint giữa ~60 s, không 2 đoạn I ≥ 8 liền nhau | Khớp chuẩn |
| 9 | **HUD & UI lúc chơi** | HK: 1 góc trái trên, 0 minimap; Celeste: 0 HUD stamina; HLD: tín hiệu trên vũ khí | **1,65% diện tích** (3,35% khi đấu boss), tự mờ 25%/0% ngoài combat, Stamina ẩn 100% khi đầy, nòng súng phát sáng khi đủ 33 Mana | Khớp chuẩn cao nhất |
| 10 | **Âm thanh, Chết & Trợ năng** | Ori/Dread: Zero-Loss death; Subnautica: im lặng đáy sâu; PoP/Celeste: thanh trượt trợ năng | **Zero-Loss death** (chỉ rơi vàng ở Áp Suất Cao), 4 dải tần báo trước, cấm nhạc combat cho quái thường, thanh trượt Clash/i-frame | Khớp chuẩn hiện đại |
