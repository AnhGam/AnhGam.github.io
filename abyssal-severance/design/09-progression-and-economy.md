# 09 — Tiến Trình, Kinh Tế & 12 Vật Liệu (danh sách gốc)

> Phụ thuộc vào: `04` (bậc kiếm, bình, mana), `06` (khóa bậc theo boss), `07` (bùa, skill), `08a/b` (vị trí), lore `ecology-and-treasure-economy.md`, `_research/R7`, `R5`.
> **File này là nguồn sự thật cho số lượng, vị trí, giá.** File khác lệch thì 09 đúng. Các tổng đã cộng lại sau đợt soát (bản trước cộng sai hàng khu 4, khu 6, tổng chi và phần trăm).

---

## Q9.1 — 12 vật liệu dùng để làm gì (câu hỏi gốc của bạn)

| Ô | Nội dung |
|---|---|
| **Vấn đề** | 12 vật liệu (`mat-*`) đã có hình nhưng chưa có công dụng. Làm sao để không thành **cày cuốc** và không thành **rác cuối game**? |
| **Phương án** | (A) Vật liệu rơi ngẫu nhiên, cày để chế. (B) Gộp làm 3 loại tiền. (C) **Mỗi vật liệu số lượng cố định, không cày được, mỗi loại đúng 1 công dụng; tổng số nhặt = tổng số cần.** |
| **Chọn** | **(C).** Bảng dưới. |
| **Vì sao** | 1) Pale Ore (HK, 6 viên cố định) và Craftmetal (Silksong, 8 viên đúng 8 chỗ dùng) được khen vì không cày (`R7`). 2) Tỉ lệ rơi thấp bị chê là cày: Dead Cells 0,4%, Monster Hunter 2–3% (`R7`). 3) Shinsekai bị chê vì bắt đào 40 mảnh titan mới lặn sâu thêm (`DeepSeaMV-03`, "grind-gated pressure upgrades"). 4) "Tổng nhặt = tổng cần" ⇒ **không bao giờ dư vật liệu vô dụng**; vật liệu duy nhất "dư" (Xà Cừ Chí Tôn) chính là phần thưởng hậu game. |
| **Lore** | Mỗi vật liệu chỉ có ở dải độ sâu của nó (entity-visual-registry) ⇒ công dụng gắn với tầng tìm thấy. |
| **Chống phụ thuộc vòng** | Không vật liệu nào nằm sau chính cổng nó mở: Muối Kép nằm **trên bờ** hồ muối (không cần Osmotic); San Hô Đèn ở vùng sáng (không cần Kính 705); Bạch Kim **không** nằm sau khóa tinh thể. |

| # | Vật liệu | Độ sâu (lore) | Số | Nhóm | **Công dụng (duy nhất)** | Ai chế | Vị trí |
|---|---|---|---|---|---|---|---|
| 1 | San Hô Lam Ngọc | 0–450 m | **3** | Thân thể | +20 stamina (thanh vây phụ) | Lão Boyle | Nghĩa Địa (3 cụm trên vách, dễ thấy) |
| 2 | Huyết Tảo | 280–480 m | **3** | Thiết bị | **Huyết Tảo Đậm**: bình hồi 3 ⇒ 4 Vảy | Lão Boyle | Hang Tảo |
| 3 | Dầu Đen Úp Ngược | 280–420 m | **2** | Thiết bị | **Đạn Nhiệt Cháy Lâu**: lửa trần dầu 3 ⇒ 6 s, gây cháy quái | Marlow | Hang Tảo (nửa sau, trần dầu sâu) |
| 4 | Đá Bazan Chàm | 450–2.050 m | **4** | Rèn | **Kiếm bậc 1** (×3) + **Nòng Nén Bậc 2** (×1) | Marlow | Hẻm Chuông (2 viên trên đường chính 10 phút đầu, 08a §3) |
| 5 | Muối Kép & Halocline | 620–980 m | **2** | Thiết bị | **Áo Nhớn Osmotic** | Ẩn Sĩ Ossa | Hầm Muối (bờ hồ) |
| 6 | San Hô Đèn (Ether) | 850–1.280 m | **2** | Thiết bị | **Kính Lọc 705 nm** | Ẩn Sĩ Ossa | Cổ Thành |
| 7 | Vàng Cổ Thành | 850–2.400 m | **3** | Rèn | **Kiếm bậc 2** | Marlow | Cổ Thành 2 + Hầm Muối 1 (cuối Vòng Phải) |
| 8 | Bạch Kim Ether | 1.280–2.400 m | **3** | Thiết bị | **Ống Ngắm Cộng Hưởng** | Bàn Đúc Thal-Vael (Ống Vang) | Thánh Đường Ống Vang (1.280–1.480 m) |
| 9 | Hắc Thạch Obsidian | 1.400–2.400 m | **3** | Rèn | **Kiếm bậc 3** | Marlow | Rãnh Hóa Thạch |
| 10 | Mảnh Vàng Vỡ (0 PE) | 2.050–2.400 m | **3** | Rèn | **Kiếm bậc 4** (lore: mảnh vỡ từ chính nhát chém năm xưa ⇒ lưỡi kiếm "nhớ lại" sức mạnh cũ) | **Bàn Đúc ở Ngưỡng Tế Đàn** (rèn tại chỗ) | hành lang Tầng V, **sau B4** |
| 11 | Hải Quang (Sea-Light) | 2.050–2.400 m | **2** | Thân thể | **Khoang mana thứ 2** (+33) | Marlow hoặc Bàn Đúc Tế Đàn | 1 đáy Rãnh, 1 hành lang Tầng V |
| 12 | Xà Cừ Chí Tôn | 2.200–2.400 m | **1** | Hậu game | **Kiếm Tự Hàn** (ngoại hình) + mở chế độ **"Ký Ức Chiến Trận"** | Bàn Đúc Tế Đàn (sau kết thúc) | rơi từ B5 |

**Tổng: 31 vật liệu nhặt = 31 vật liệu cần.**

- **Khóa bậc kiếm theo boss (06 Q6.1):** Bazan (bậc 1) chỉ ở Tầng II, sau B1. Vàng Cổ (bậc 2) ở Tầng III / cuối Vòng Phải, sau B2. Obsidian (bậc 3) ở Tầng IV, sau B3. Vàng Vỡ (bậc 4) ở Tầng V, **sau B4** (bản trước đặt trước B4, người soát phát hiện). Viên Vàng Cổ ở Hầm Muối chỉ là *nửa bước* (bậc 2 cần 3 viên).
- **4 nhóm icon** (Kim loại rèn / Khoáng chế tác / Sinh vật cơ thể / Di vật) để người chơi chỉ cần nhớ 4 thứ, không nhớ 12 tên (`13` Q13.5, `R9`).
- **Giao diện:** túi vật liệu ghi "x / tổng" (ví dụ Bazan 2/4) và **tên công dụng** ngay cạnh. Người chơi luôn biết nhặt để làm gì (`R7`: phần thưởng mơ hồ làm giảm động lực).

## Q9.2 — Nâng cấp chỉ số (nguồn từng cái)

| Chỉ số | Khởi đầu → tối đa | Bước | Nguồn |
|---|---|---|---|
| **Vảy (máu)** | 5 → 10 | +1 × 5 | **Mua 2** ở Lão Boyle (60 Sv; 110 Sv, bán từ mốc 2/5) + **9 Mảnh Vảy** (3 mảnh = +1 ⇒ 3 lần): Nghĩa Địa 2, Hẻm Chuông 2, Cổ Thành 2, Ống Vang 1, Rãnh 2 |
| **Bình Huyết Tảo** | 2 → 5 | +1 × 3 | **Mua 1** ở Lão Boyle (45 Sv) + **6 Mảnh Bình** (3 = +1 ⇒ 2 lần): Nghĩa Địa 1, Hang Tảo 2, Hầm Muối 1, Cổ Thành 1, Rãnh 1 |
| **Lượng hồi mỗi bình** | 3 → 4 Vảy | +1 | Huyết Tảo ×3 + 30 Sv (Lão Boyle) |
| **Stamina** | 100 → 200 | +20 × 5 | Lão Boyle ×1 (San Hô Lam Ngọc ×3 + 40 Sv); 3 Mảnh Stamina nguyên (Hẻm Chuông, Hầm Muối, Cổ Thành); Thân Mình (B3) ×1 |
| **Mana** | 99 → 165 | +33 × 2 | Marlow mua (35 Sv); chế từ Hải Quang ×2 (60 Sv) |
| **Kiếm** | 10 → 38 | bậc 1–4 | Bazan ×3 + 50 Sv (Marlow) / Vàng Cổ ×3 + 120 Sv (Marlow) / Obsidian ×3 + 200 Sv (Marlow) / Vàng Vỡ ×3 + 220 Sv (Bàn Đúc Tế Đàn) |
| **Khe bùa chiến đấu** | 2 → 6 | +1 × 4 | Rigg (150 Sv), Hầm Muối (bí mật), Cổ Thành (rương sau nút áp suất đôi), Rãnh (rương) |
| **Khe bùa tiện ích** | 1 → 3 | +1 × 2 | Ẩn Sĩ Ossa (1 Hạt, bán cùng 705 / Osmotic), Thánh Đường Ống Vang (rương) |

> **Chia mảnh (3 mảnh = 1 nâng cấp):** để rải nhiều vật phẩm mà chỉ số không phình to. HK: 4 Mảnh Mặt Nạ = 1 mặt nạ; game nào cũng chia 2–4 mảnh (`R7`). Chọn 3 vì game ngắn hơn HK, mỗi mảnh phải "đáng" hơn.

## Q9.3 — Hạt Hải Quang Sạch (tiền của Giáo Hội)

| Ô | Nội dung |
|---|---|
| **Số lượng (cố định)** | **11**: Nghĩa Địa 1 (Mỏm Cột Buồm Cờ Đỏ), Hang Tảo 1 (Gác Đá Tàu Trinh Sát), Hẻm Chuông 2, Hầm Muối 1, Cổ Thành 2, Ống Vang 1, Rãnh 1 + **2 từ tinh nhuệ đặt sẵn, rơi một lần**: Bạch Tuộc Đá Khắc ở Hành Lang Tượng, Rình Mồi Siêu Đen ở Hang Rình Mồi (7-09). Các con cùng loài khác **không** rơi Hạt (bản trước để mọi con rơi ⇒ cày được, người soát phát hiện) |
| **Chi (9)** | Kính 705 nm 2 · Áo Osmotic 2 · Ấn Tái Tạo 2 · Bước Êm 1 · Vây Bền 1 · khe tiện ích 1 · **còn dư 2** |
| **Hạt dư** | Mỗi Hạt dư ⇒ **thắp lại một tháp đèn Cổ Thành** (cảnh kết thêm đèn sáng). Lore: Ossa cần Hải Quang chưa nghiền để vá đèn đang tắt |
| **Vì sao tách khỏi vàng** | Lore: Ossa không nhận vàng. Thiết kế: vàng = tiến trình mua bán, Hạt = phần thưởng **khám phá** (chỉ ở chỗ khó / tinh nhuệ) ⇒ tách rõ "đi chính" và "đi sâu" |

## Q9.4 — Vàng (Sovereign, Sv): thu và chi

| Ô | Nội dung |
|---|---|
| **Vấn đề** | HK: người chơi kêu từ 50–75% game là hết đồ mua, chết mất tiền chẳng còn đáng sợ. Silksong lúc ra mắt quá thiếu tiền, phải vá (`R7`). Làm sao vàng có ích tới cuối? |
| **Thu** | Đi chính ~**1.100 Sv**; 100% ~**1.800 Sv**. Nguồn: 28 rương × trung bình 35 Sv ≈ 980; quái lượt đầu ≈ 820 (1–15 Sv mỗi con; quái đã giết không rơi lại cho tới khi nghỉ Chuông; sau 5 lượt/khu **giảm dần về 30% Sv**, không bao giờ về 0 ⇒ chống soft-starve rèn kiếm bậc 4, sửa lỗi P0 `R12`). Tiền lẻ **Nc** (lore: Mảnh Xà Cừ Đen) **tự quy đổi 10 Nc = 1 Sv** khi nhặt. |
| **Chi** | Tổng cửa hàng **1.580 Sv** (bảng dưới) > thu đi chính (1.100) ⇒ **phải chọn** trong lần chơi chính. Món bắt buộc gần như chắc chắn mua (4 bậc kiếm + Nòng Nén) = 50 + 120 + 200 + 220 + 60 = **650 Sv**, cộng các món mua phổ biến ~320 ⇒ ~970 < 1.100, còn dư ~130 cho đi chính. Thu 100% (1.800) > chi (1.580) ⇒ khám phá hết thì mua hết, dư ~220. |
| **Kênh tiêu cuối game** | **Trả nợ thuyền cho Lão Boyle (500 Sv)** (lore: lão nợ tiền chuộc thuyền ở Kael-Var). Trả xong, cảnh kết của Boyle đổi: lão được lên bờ về nhà. Một lựa chọn câu chuyện thay vì "quyên góp vô nghĩa". Nguồn: dư 220 + rương hậu game (bơi 360°) ~400. Đáp ứng `R7`: cần kênh tiêu cuối game lớn ngang cửa hàng chính |
| **Vì sao kiếm bậc 4 giá 220** | Giữ vàng có giá trị tới Tầng V, nhưng không cao tới mức người đi chính không đủ tiền trước B5. Bản trước để 300 Sv thì món bắt buộc + mua phổ biến ≈ 1.050 Sv, sát mức thu 1.100 (người soát vòng 2); thiếu tiền ⇒ B5 cần 148 nhát thay vì 120 |

| Cửa hàng | Mặt hàng (Sv) | Tổng |
|---|---|---|
| **Lão Boyle** (Chuông 1) | Ấn Huyết Tràn 30 · +1 bình 45 · +1 Vảy 60 · +1 Vảy 110 (từ mốc 2/5) · +20 stamina 40 · Huyết Tảo Đậm 30 | **315** |
| **Marlow** (Chuông 3) | Kiếm bậc 1: 50 · bậc 2: 120 · bậc 3: 200 · Nòng Nén 60 · khoang mana 35 · khoang mana 2 (chế): 60 · Đá Mài Neo 40 · Nòng Mát 50 · Đạn Nhiệt Cháy Lâu 40 | **655** |
| **Bàn Đúc Tế Đàn** | Kiếm bậc 4: 220 | **220** |
| **Rigg** (Hang Tảo → Hầm Muối) | Râu Dò Dòng 30 · Túi Hũ Vàng 60 · Vảy Dày 90 · khe bùa +1: 150 · bản đồ nhánh 20 × 3 | **390** |
| | | **1.580** |

## Q9.5 — Hình phạt khi chết (cập nhật theo `15` Q15.1, sửa lỗi P0 `R12`)

| Ô | Nội dung |
|---|---|
| **Phương án** | (A) **Zero-Loss + Autosave thông minh** (Ori WotW / Metroid Dread). (B) Mất hết tiền, đánh bóng ma lấy lại (HK). (C) Túi xác rơi 5–10 Sv (bản trước). |
| **Chọn** | **(A) cho chế độ chuẩn:** chết **không mất Sv, không mất vật liệu, không mất bản đồ đã mở**, hồi sinh ngay tại Chuông Lặn gần nhất (hoặc đầu đoạn chạy trốn / thử thách nhảy). Chế độ **Áp Suất Cao** mới bật rơi 15% Sv vào túi xác. |
| **Vì sao** | Bản trước (C) mất 5–10 Sv quá nhẹ để tạo căng thẳng nhưng tốn công code túi xác và góp phần gây nguy cơ thiếu tiền rèn kiếm bậc 4 (`R12` P0). (A) khớp tuyệt đối Trụ cột 3 và giảm lỗi kẹt túi xác trên hố gai. |

## Q9.6 — Đường cong sức mạnh: người chơi vs quái (output `_calc/metrics.py`)

| Mốc | Bậc kiếm (combo) | Quái thường tầng hiện tại (máu) | Nhát hạ quái thường **tầng hiện tại** | Nhát hạ quái thường **Tầng I** (45) | Vảy | Bình × hồi |
|---|---|---|---|---|---|---|
| Đầu game | 0 (3) | 45 | **4** | 4 | 5 | 2 × 3 |
| Tầng II (sau rèn bậc 1) | 1 (3) | 90 | **5** | **3** | 6–7 | 3 × 3–4 |
| Tầng III | 2 (4) | 165 | **6** | **2** | 7–8 | 4 × 4 |
| Tầng IV | 3 (4) | 210 | **6** | **2** | 8–9 | 4–5 × 4 |
| Tầng V | 4 (4) | — | — | **2** (quái nhỏ: 1) | 9–10 | 5 × 4 |

> **Đọc bảng:** nhát hạ quái **ở tầng hiện tại giữ 4–6** (độ khó ổn định), còn **quái cũ tụt từ 4 xuống 2** (quái nhỏ cũ: 1 nhát) ⇒ quay lại vùng cũ thấy rõ mình mạnh lên. Mô hình răng cưa của HK (boss 40–80 nhát suốt game, quái thường cũ tụt về 1 nhát, `R3` §1.7, §4.3). Sức mạnh tăng đến từ **3 nguồn cảm nhận được**: (1) số (sát thương, Vảy), (2) **động từ mới** (Hóa Hình), (3) **cơ thể đổi trên màn hình**. `R5` §3: tiến trình bằng năng lực được cảm nhận mạnh hơn tiến trình chỉ số.

## Q9.7 — Danh mục phần thưởng tổng (kiểm toán, đã cộng lại)

| Loại | Trên map | Cửa hàng | Tổng | % (/154) | Tham chiếu `R7` |
|---|---|---|---|---|---|
| Mảnh chỉ số (Vảy 9, Bình 6, Stamina 3) | 18 | — | 18 | 12% | 25–35% (ta thấp hơn vì có Hóa Hình lớn và mua chỉ số ở cửa hàng) |
| Nâng cấp mua (Vảy 2, bình 1, stamina 1, hồi bình 1, kiếm 4, nòng 1, mana 2, đạn cháy 1, bản đồ 3) | — | 16 | 16 | 10% | — |
| Vật liệu | 31 | — | 31 | 20% | — (thay "tiền phụ") |
| Bùa | 7 | 11 | 18 | 12% | Bùa 20–30% (gộp với khe, Hạt) |
| Khe bùa | 4 | 2 | 6 | 4% | |
| Hạt Hải Quang | 11 | — | 11 | 7% | |
| Chìa / skill nhặt (Súng, Đạn Nhiệt, Ống Ngắm, Đĩa Đúc Sóng, Bùng Neo) | 5 | — | 5 | 3% | |
| Rương vàng | 28 | — | 28 | 18% | Tiền 15–25% |
| Bản Ghi (lore) | 14 | — | 14 | 9% | 10–15% |
| Mảnh Đồng Cáp (sửa Trạm Tời) | 7 | — | 7 | 5% | — |
| **Tổng** | **125** | **29** | **154** | 100% | 100–150 |

> Ghi chú tên: vật phẩm lore trên map gọi là **"Bản Ghi #n"**. Lore cũ (diegetic-fragments) gọi là "Mảnh #n", trùng với "Mảnh #5 = Ấn Ký Ký Ức" trong story.md ⇒ đổi tên để không lẫn (12 Q12.2 L14).

## Q9.8 — Bảng phân bổ chuẩn theo khu (vật phẩm trên map)

| Khu | Mảnh Vảy | Mảnh Bình | Stamina | Hạt | Vật liệu | Bùa | Khe | Chìa / skill | Rương | Bản Ghi | Đồng Cáp | **Tổng** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 Nghĩa Địa | 2 | 1 | 0 | 1 | 3 (San Hô Lam Ngọc) | 2 (Lưỡi Dây Dài, Gai Phản) | 0 | 1 (Súng) | 5 | 2 (#1, #2) | 1 | **18** |
| 2 Hang Tảo | 0 | 2 | 0 | 1 | 5 (Huyết Tảo 3, Dầu Đen 2) | 0 | 0 | 1 (Đạn Nhiệt) | 3 | 1 (#3) | 1 | **14** |
| 3 Hẻm Chuông | 2 | 0 | 1 | 2 | 4 (Bazan) | 1 (Cổ Tay Nhẹ) | 0 | 0 | 5 | 2 (Marlow 142 PE, vỏ Chuông 4) | 1 | **18** |
| 4 Hầm Muối | 0 | 1 | 1 | 1 | 3 (Muối Kép 2, Vàng Cổ 1) | 1 (Răng Hút Sâu) | 1 | 0 | 4 (gồm Két Salthold) | 1 (#4) | 1 | **14** |
| 5 Cổ Thành | 2 | 1 | 1 | 2 | 4 (San Hô Đèn 2, Vàng Cổ 2) | 1 (Mắt Thủy Triều) | 1 | 0 | 4 | 3 (#6 + 2 nhật ký) | 1 | **20** |
| 6 Ống Vang | 1 | 0 | 0 | 1 | 3 (Bạch Kim) | 1 (Đinh Ba Lục) | 1 (tiện ích) | 3 (Ống Ngắm, Đĩa Đúc Sóng, Bùng Neo) | 3 | 1 (#5) | 1 | **15** |
| 7 Rãnh | 2 | 1 | 0 | 1 | 4 (Obsidian 3, Hải Quang 1) | 1 (Nanh Bóng Tối) | 1 | 0 | 4 | 3 nhật ký | 1 | **18** |
| 8 Lõi Neo | 0 | 0 | 0 | 0 | 5 (Vàng Vỡ 3, Hải Quang 1, Xà Cừ 1) | 0 | 0 | 0 | 0 | 1 (bản ghi cuối) | 0 | **6** |
| Tinh nhuệ đặt sẵn (tự hút auto-collect) | — | — | — | 2 | — | — | — | — | — | — | — | **2** |
| **Tổng** | **9** | **6** | **3** | **11** | **31** | **7** | **4** | **5** | **28** | **14** | **7** | **125** |

> Các tổng trên được cộng bằng script (hàng và cột), không cộng tay.
