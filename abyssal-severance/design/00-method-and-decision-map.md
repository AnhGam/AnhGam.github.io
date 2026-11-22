# 00 — Phương Pháp & Bản Đồ Quyết Định

> Tài liệu gốc của bộ Game Design *Abyssal Severance*. Mọi file khác trong `lore/design/` tuân theo phương pháp ở đây.

## 1. Mẫu bắt buộc cho mọi quyết định

Mỗi quyết định (dù nhỏ) viết đủ 8 ô:

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Câu hỏi thiết kế cụ thể, đo được |
| **Phương án** | 2–4 cách làm khả thi |
| **Chọn** | Một phương án + con số cụ thể |
| **Vì sao** | Lập luận: phục vụ trụ cột nào, khớp hệ thống nào |
| **Bằng chứng** | Số liệu game tham chiếu / nghiên cứu / nguồn (file `_research/R*.md`) |
| **Lore** | Cơ chế này đến từ luật thế giới nào (Áp Lực Chì, Hải Quang…) |
| **Cảm giác (game feel)** | Người chơi cảm nhận gì từng khung hình; phản hồi hình/âm |
| **Rủi ro & cách đo** | Cái gì có thể sai, đo bằng gì khi playtest, sửa thế nào |

Quy tắc: **không có bằng chứng thì ghi rõ "suy luận" và nêu cách kiểm chứng khi playtest.** Không có quyết định nào dựa vào cảm tính mà không ghi nhãn.

## 2. Ba trụ cột (đã chốt) — thước đo mọi quyết định

1. **Biển là sức mạnh, không phải hình phạt** — vào nước / nặng nề không tước công cụ; sự nặng phải đổi lấy lợi thế.
2. **Chém để bắn** — mana súng chỉ hồi bằng chém trúng.
3. **Khám phá không bị đồng hồ đuổi** — không oxy, boss không giới hạn thời gian, stamina không phạt việc đi thường.

## 3. Thứ tự phụ thuộc (vì sao làm theo thứ tự này)

```
01 Thước đo & tỉ lệ (hero, ô lưới, camera)
 └─► 02 Di chuyển (đi, nhảy, dash, bơi, stamina)          ← mọi khoảng cách trong map suy ra từ đây
      └─► 03 Ngữ pháp địa hình & phòng                       ← khe/bậc/trần đo bằng số của 02
 └─► 04 Chiến đấu người chơi (combo, dmg, clash, súng, hồi máu)
      └─► 05 Quái & AI (máu theo số nhát chém của 04, tốc độ theo 02)
           └─► 06 Boss
 02+04 ─► 07 Skill / Hóa Hình (mỗi skill = 1 động từ di chuyển + 1 công dụng chiến đấu + "then" trên map)
 03+05+07 ─► 08 Thiết kế từng khu vực (địa hình, quái, cơ chế, cổng, loop, bí mật, thưởng)
 04+05+07+08 ─► 09 Tiến trình & kinh tế (chỉ số, vật liệu, giá, đường cong sức mạnh)
 tất cả ─► 10 Độ khó, cảm giác mạnh lên & mẹo ẩn (+ 10b Đường cong từng đoạn)
 tất cả ─► 11 Game feel tổng hợp (hitstop, rung, âm, camera)
 tất cả ─► 12 Ma trận phụ thuộc & checklist playtest
 05+06+09 ─► 13 Đối chiếu nội dung với 15 game đỉnh (R9)
 04+11 ─► 14 HUD tối giản & Diegetic UI (≤ 1,65% màn hình, R11)
 04+09+10 ─► 15 Âm thanh 4 dải tần, Zero-Loss Death, Bản đồ Ảnh Ký Ức & Trợ năng (R12)
 tất cả ─► 16 Kiểm toán 10 trụ cột & 8 lỗi P0/P1 đã vá (R12)
 11+14+15 ─► 17 Vũ đạo Chết 3 cấp, Nghi lễ Rơi/Nhặt 5 cấp, Zero-UI Onboarding & Vi Phản Hồi (R13)
 02+08+15+17 ─► 18 Phím S (PC AD+Space+JKL), Nhạc & Ambience 8 khu, SFX Toàn Game & VFX 10 Họ Cổng (R14)
```

Đổi một con số ở tầng trên (ví dụ độ dài dash) → phải rà lại mọi tầng dưới có tham chiếu. Mỗi file ghi rõ "phụ thuộc vào" và "bị phụ thuộc bởi".

## 4. Kho câu hỏi phải trả lời (inventory)

### 01 Thước đo
- Hero cao bao nhiêu px, ô lưới bao nhiêu px, màn hình chứa bao nhiêu ô / bao nhiêu chiều cao hero?
- Hero lớn lên 40% sau Boss 1 → hitbox đổi thế nào mà không phá mọi khe đã thiết kế?
- Camera: khung nhìn, lookahead, zoom từng vùng.

### 02 Di chuyển
- Tốc độ đi; gia tốc/hãm; nhảy cao/xa (min–max); trọng lực lên/xuống; tốc độ rơi tối đa; "treo" ở đỉnh nhảy (lore: quẫy 1–2s).
- Dash: quãng, thời gian, hồi chiêu, i-frame, số lần trên không, nạp lại khi nào; các bậc nâng cấp; tại sao đúng con số đó.
- Đạp tường; móc neo; bơi 360° (tốc độ, gia tốc, dash bơi).
- Stamina: tiêu vào gì, bao nhiêu, hồi bao nhiêu, khi nào; vì sao không phạt đi thường; cân bằng giữa dash / bám tường / chống dòng.
- Coyote time, nhớ phím, chỉnh góc (corner correction).

### 03 Địa hình & phòng
- Danh mục mẫu địa hình (khe, bậc, trục đứng, trần thấp, gai, sàn sập, dòng chảy, hồ muối bật, cột phun…) — mỗi mẫu đo bằng số của 02.
- Loại phòng & tỉ lệ (chiến đấu / di chuyển / nghỉ / bí mật / boss); kích thước phòng; số thử thách mới mỗi phòng; cách dạy kỹ năng mới.
- Hình học cổng năng lực; cách cho người chơi thấy chỗ chưa tới được.

### 04 Chiến đấu người chơi
- Combo: số nhát, khung hình từng nhát, tầm, hướng chém (lên/xuống/ngang), chém trên không, nhát kết thúc.
- Sát thương cơ bản & tăng qua nâng cấp; số nhát hạ quái thường / tinh nhuệ / boss.
- Clash (đỡ kiểu Hollow Knight): cửa sổ, đòn nào clash được, phần thưởng, dấu hiệu.
- Súng: sát thương, tốc độ đạn, mana mỗi phát, mana mỗi nhát chém, dung lượng; chống đứng xa bắn rỉa.
- Hồi máu: số bình, lượng hồi, thời gian uống, bị động.
- HP người chơi, sát thương quái gây ra, i-frame sau khi trúng đòn.

### 05 Quái & AI
- Mỗi loài: vai trò, giác quan, máy trạng thái, đòn (báo trước / ra đòn / hồi), tốc độ, tần suất, máu, sát thương, cách khắc chế, thưởng rơi.
- Luật công bằng: thời gian báo trước tối thiểu, đạn nhắm thế nào, hitbox so với hình, giới hạn số quái tấn công cùng lúc, không đánh từ ngoài màn hình.
- Thêm loài mới (14 → 22–24) để mỗi tầng đủ vai trò.

### 06 Boss
- Mỗi boss: máu, pha, đòn, thời gian báo trước, cửa sổ phạt, chọn đòn ngẫu nhiên có trọng số, thời lượng mục tiêu, số lần thử mục tiêu.

### 07 Skill / Hóa Hình
- 5 Hóa Hình mở gì (di chuyển + chiến đấu), thời điểm mở (phút chơi), các "then" (móc, vách vỡ, công tắc…) mà map phải có.
- Skill Hải Quang (tiêu mana): danh sách, cơ chế, sát thương so với chém, tương tác môi trường.
- Bùa bị động: hệ khe cắm, danh sách.

### 08 Khu vực
- Mỗi khu vực: chủ đề, cơ chế môi trường đặc trưng, ngữ pháp địa hình, quái, cổng vào/ra, loop, bí mật, thưởng, nhịp cảm xúc, thời lượng, số phòng, vị trí Chuông Lặn.

### 09 Tiến trình & kinh tế
- Đường cong sức mạnh người chơi vs quái; nâng cấp HP/mana/bình/kiếm; giá; thu nhập vàng/giờ; 12 vật liệu dùng vào đâu; hình phạt khi chết.

### 10 Độ khó & cảm giác
- Đường cong độ khó theo giờ chơi; mẹo ẩn (máu cuối "dai" hơn, đạn đầu trượt…); cảm giác mạnh lên khi quay lại vùng cũ; tùy chọn hỗ trợ.

### 11 Game feel
- Hitstop, rung màn hình, nháy trắng, giật lùi, âm thanh, hạt, camera.

## 5. Mâu thuẫn lore cũ ↔ khung thiết kế (phải xử lý)

| # | Lore cũ ghi | Khung / quyết định mới | Xử lý (chi tiết ở file tương ứng) |
|---|---|---|---|
| L1 | Chém kiếm tốn Stamina (`fivefold-severance-and-physics.md`) | Stamina dùng cho khám phá | Chém **không** tốn stamina → `04-combat-player.md` §Stamina & chém |
| L2 | Dash mở từ Boss 1 (Ấn Đôi Chân) | Dash là cơ chế lõi, nâng cấp được | Khởi đầu có **dash ngắn "Quẫy Vây"**; Boss 1 nâng thành **Dash Áp Suất** → `02-movement.md` |
| L3 | Bình Huyết Tảo mua ở shop | Bình nạp lại miễn phí tại điểm lưu | Bình tự nạp ở Chuông Lặn; số bình 2 → 5 = **mua 1 ở Boyle + 6 Mảnh Bình** trong khám phá → `04`, `09` |
| L4 | Mọi khu vực đều có vùng bơi 360° | Vùng bơi < 35% bản đồ | Vùng bơi là **điểm nhấn cục bộ** trong khu vực, đo diện tích ở `08` |
| L5 | Ấn Đôi Tay mở "Combo 4 nhát" | Combo spam nút từ đầu | Khởi đầu combo 3 nhát; Đôi Tay thêm nhát 4 (kết thúc) → `04` |
| L6 | Đỡ đòn: chưa định nghĩa | Đỡ kiểu Hollow Knight (chém trúng đòn) | → `04` §Clash |

> File bổ sung: `10b-segment-difficulty-curves.md` (độ khó theo đoạn), `13-content-benchmarks.md` (đối chiếu số quái / boss / khu / craft với 15 game). Engine: Unity hoặc Godot (01 Q1.6).

> Danh sách đầy đủ các chỗ sửa lore (L1–L17) ở `12` Q12.2. Mọi số dẫn xuất (nhảy, khe, máu, boss, súng) lấy từ `_calc/metrics.py`; đổi tham số thì chạy lại script.
