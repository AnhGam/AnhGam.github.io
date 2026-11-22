# 06 — Boss (5 trận: máu, pha, đòn, cửa sổ phạt, chọn đòn, thời lượng, số lần thử)

> Phụ thuộc vào: `02`, `04`, `05` (luật công bằng chung), lore `four-abyssal-wardens.md`, `_research/R3`, `R4`, `R5`. Số máu là output của `_calc/metrics.py`, làm tròn tới 50–100 (B2 1.090 → 1.100, B5 6.270 → 6.300; sai số < 1%).
> Bị phụ thuộc bởi: `07` (phần thưởng Hóa Hình), `08` (đấu trường), `10` (đường cong độ khó).

---

## Q6.1 — Luật chung cho mọi boss

| Ô | Nội dung |
|---|---|
| **Máu boss** | `Máu = số nhát mục tiêu × sát thương trung bình một nhát` ở bậc kiếm dự kiến; từ B3 dùng trung bình combo 4 (05 Phần B). Số nhát mục tiêu: **B1 45, B2 55, B3 60, B4 75, B5 120**. B1–B4 nằm trong dải 40–80 nhát mà boss HK có ở cấp kiếm thường gặp (`R3` §1.8, đo từ dữ liệu). Dải 80–120 cho boss cuối là **khuyến nghị của `R3` §5.3**, không phải số đo HK (HK Radiance ~81 nhát). |
| **Bậc kiếm dự kiến bị khóa bằng vật liệu** | Vật liệu cho bậc kiếm *n* chỉ có **sau** Boss *n* (09 Q9.1). Không ai đánh B1 bằng kiếm bậc 2. Riêng **1 viên Vàng Cổ ở Hầm Muối** là "nửa bước" thưởng khám phá, không đủ rèn sớm. Silksong đạt điều tương tự bằng hệ số sát thương theo từng quái (`R3` §2); ta khóa bằng vật liệu vì dễ đọc. |
| **Thời lượng mục tiêu (một lần thắng sạch)** | Ước lượng: **nhát chém cần ≈ nhát mục tiêu ÷ 1,25** (súng đóng góp ~20%; tiêu hết mana tối đa ~35%, 04 Q4.5). **Tốc trúng trung bình cả trận** giảm dần vì boss sau khó né hơn: B1 0,65 → B5 0,45 nhát / giây. Mốc 0,65 lấy từ HK: Hornet 1 cần 45 nhát, `R3` §1.8 ước tính trận 45–75 s (ước lượng, chưa đo). Kết quả: **B1 ~1,1 phút · B2 ~1,4 · B3 ~1,8 · B4 ~2,3 · B5 ~3,9** (đã cộng ~15 s chuyển pha). B1–B3 **ngắn hơn có chủ ý** so với đề xuất `R4` R47 (2–3,5 phút, nhãn [N]) vì là boss đầu cho người mới; B4–B5 nằm trong dải đó; tất cả trong giới hạn `R3` §4.2 (boss cuối ≤ 8–10 phút). Đo lại ở playtest. |
| **Chọn đòn** | Mỗi pha 3–5 đòn → **lọc theo khoảng cách** → chọn ngẫu nhiên có trọng số, **không lặp quá 1 lần liên tiếp** (đòn nguy hiểm nhất: 2 lượt chờ), **bỏ qua 3 lần thì bắt buộc dùng**. Nguồn: HK `SendRandomEventV3` (trọng số + giới hạn lặp + ép đòn bị bỏ qua; tên trường nhớ từ code dịch ngược, chưa xác minh) và tổ hợp khuyên dùng (`R4` R41, §6). |
| **Khoảng thở** | **Mỗi chu kỳ 3–4 đòn có ≥ 1 khoảng thở ≥ 2,5 s**, đủ uống bình 0,9 s an toàn. Ghi rõ cho từng boss bên dưới. (`R4` R46, nhãn [N]: đề xuất notebook, chưa có game đo) |
| **Cửa sổ phạt** | Nhỏ **0,3–0,5 s** (1–2 nhát) sau đòn thường; lớn **1,0–1,5 s** sau đòn lớn hoặc khi boss kẹt (`R4` R46 [N]). |
| **Sát thương** | Mặc định **1 Vảy**. Đòn **2 Vảy** chỉ khi báo trước **≥ 48 f** (04 Q4.1), luôn ghi rõ trong bảng. |
| **Ngoài màn hình** | Boss chỉ bắt đầu đòn khi **đang trong màn**. Ngoại lệ duy nhất: **bóng đổ / mũi tên mép màn hiện ≥ 36 f** trước khi trúng (05 QA.1). Đấu trường cao hơn 1 màn: camera kéo theo boss (trọng số boss 0,5, `R8` §6.2 [internal]). |
| **Chuyển pha** | Theo **máu còn lại**, có **khựng chuyển pha 1,5 s** (boss bất tử, người chơi được thở). |
| **Chạy lại** | Chuông Lặn sát cửa, **≤ 10 s chạy, 0 quái**. Bỏ cảnh mở đầu từ lần thử thứ 2 (`R5` §4.3; khung viết tay "điểm lưu gần phòng boss, không nhiều quái"). |
| **Số lần thử mục tiêu (trung vị)** | B1 **1–3**, B2–B3 **3–6**, B4 **5–10**, B5 **5–15**. p90 > 3 × trung vị ⇒ có điểm khó đột ngột, phải sửa (`R5` §4.2, khuyến nghị [R]). |
| **Mỗi boss dạy và kiểm tra một điều** | B1: vòng **chém → mana → bắn**. B2: **dash i-frame + nấp màn bọt**. B3: **đổi đi bộ ↔ bơi 360° + móc neo**. B4: **ánh sáng & đọc âm thanh trong tối**. B5: **tổng hợp**. "Boss là bài kiểm tra cơ chế, không phải đua chỉ số" (`DeepSeaMV-04`). |
| **Phá từng bộ phận** | **Mỗi boss có ≥ 1 bộ phận phá được** làm đổi bộ đòn pha sau (lore four-abyssal-wardens; `DeepSeaMV-04` "Anatomical Dismantling"). |

---

## B1 — Cự Giải Thiết Giáp (340 m, Khoang Tàu Đô Đốc)

| Mục | Giá trị |
|---|---|
| Bộ kỹ năng người chơi | F0 (5 Vảy, 2–3 bình), Quẫy Vây, súng Bọt Cavitation (99 mana, 18 sát thương), kiếm bậc 0 |
| Máu | **520** (45 nhát bậc 0). Pha 1: 260 (giáp) → Pha 2 khi còn 50% |
| Đấu trường | **1,5 × 1 màn**. Sàn dưới cát phẳng, 3 **cột buồm** đứng làm vật cản, sàn trên (ván tàu) cao **7 ô** (F0 nhảy 5,1 không lên được), lên bằng **Khe Dòng Xiết** ở rìa trái (dòng nước nâng lên sàn trên) |
| Bộ phận phá được | **Bản lề mai** (thanh **50**: 3 phát súng = 54, hoặc 2 phát + 1 đòn kết = 51) |
| Khoảng thở | Đứng gầm **2,5 s** sau mỗi 3 đòn |
| Thời lượng sạch | ~1,1 phút |

**Pha 1 — Giáp Tàu Kín (100% → 50%)**

| Đòn | Báo trước | Màu | Diễn biến | Né / phạt | Sát thương |
|---|---|---|---|---|---|
| **Húc Mũi Tàu** | 40 f (cào chân, mắt đỏ, gầm) | đỏ | Lao ngang 18 ô. **Đâm trúng cột buồm ⇒ kẹt càng 2,5 s** | Nhảy qua đầu / lên sàn trên. Đứng trước cột buồm để dụ ⇒ khi kẹt: chém **khớp bụng**, bắn **bản lề mai** | 1 |
| **Càng Neo Đập Cát** | **48 f** (giơ càng cao, cát rung) | xanh (sóng cát) | **Sóng cát chạy dọc sàn** hai phía, cao 1,5 ô, 280 px/s | Nhảy qua sóng. Cửa phạt nhỏ 0,4 s | 1 |
| **Kẹp Ngang** | 26 f | **bạc** | Kẹp tầm 3 ô | **Clash** ⇒ +30 phá thế, +11 mana | 1 |

- Vỡ bản lề ⇒ chuyển Pha 2 **dù máu chưa tới 50%** (thưởng người hiểu cơ chế). Nếu chỉ chém, máu tụt tới 50% thì mai tự nứt (chống kẹt cho người chưa hiểu). Tôn trọng khoảnh khắc "à, ra thế" (`DeepSeaMV-07` 07.05) mà không khóa cứng (`R5` hỗ trợ ẩn).

**Pha 2 — Vỡ Giáp & Đứt Chân (≤ 50%)**: Hạch Đôi Chân phát sáng lục-lam ở bụng (điểm yếu ×1,25).

| Đòn | Báo trước | Màu | Diễn biến | Né / phạt | Sát thương |
|---|---|---|---|---|---|
| **Dậm Sập Sàn** | 44 f: boss bật lên khỏi màn; **bóng đổ to dần trên sàn** (ngoại lệ ngoài màn hợp lệ: bóng hiện 44 f ≥ 36 f) | đỏ | Đáp theo bóng; **ván sàn trên sập thành mảnh rơi** (bóng nhỏ báo trước 36 f) | Tránh bóng. Đáp xong kẹt 1,2 s (cửa lớn) | 1 |
| **Quét Xích Neo** | 36 f (xích căng sáng) | bạc | Quét vòng thấp sát sàn, rộng 10 ô | **Nhảy qua** hoặc **clash** | 1 |
| **Húc Mũi Tàu** (nhanh hơn 15%) | 36 f | đỏ | như Pha 1 nhưng không kẹt cột | né | 1 |

- **Thưởng:** Ấn #1 Đôi Chân ⇒ F1: Dash Áp Suất, đạp tường, Dậm Nặng, nhảy 8 ô, tầm chém 2 ô (02, 04). Lối ra: phòng khóa dạy kỹ năng (03 Q3.5).

---

## B2 — Tôm Bọ Ngựa Xích Sắt (740 m, đáy Hẻm Chuông, gần Xác Chuông Số 4)

| Mục | Giá trị |
|---|---|
| Bộ kỹ năng | F1 (6–7 Vảy, 3 bình), Dash Áp Suất (i-frame), đạp tường, Dậm Nặng, Nòng Nén Bậc 2 (30, phá giáp), kiếm bậc 1 |
| Máu | **1.100** (55 nhát bậc 1). Pha 2 khi còn **45%** (mất 600) |
| Đấu trường | **1 × 1 màn** (40 × 22,5 ô, thấy trọn). **2 màn bọt khí** cố định hai bên (giảm 85% sóng). Đáy = **hồ muối** (Dậm Nặng nảy 15 ô lên vách cao). Vách hai bên **đá có rãnh** (đạp được) |
| Bộ phận phá được | **Hai chùy**: chùy kẹt vào trụ sắt ⇒ bắn khớp bằng Nòng Nén 2 phát ⇒ vỡ 1 chùy ⇒ Pha 2 sớm, và Pha 2 chỉ còn đòn một tay |
| Khoảng thở | Sau mỗi 3 đòn, bám vách "lau càng" **2,5 s** |
| Thời lượng sạch | ~1,4 phút |

**Pha 1 — Cú Đấm Hai Nhịp (100% → 45%)**

| Đòn | Báo trước | Màu | Diễn biến | Né / phạt | Sát thương |
|---|---|---|---|---|---|
| **Đấm Cavitation** | **40 f** khóa chốt ("tách" gắt + sáng trắng-lam ở khớp) | nhịp 1 **bạc**, nhịp 2 **xanh** | Nhịp 1: đấm thẳng 5 ô, chém 5 f (≈ 83 ms, khớp lore "80 ms"). Trượt ⇒ **bọt chân không** tại điểm đấm, hút nhẹ, **nổ sau 0,8 s (48 f)** bán kính 3 ô | Nhịp 1: **clash** (khó) hoặc **dash i-frame xuyên**. Nhịp 2: ra khỏi 3 ô hoặc **đứng trong màn bọt** | 1 + 1 |
| **Phóng Chéo Từ Vách** | 44 f (bám vách, gập người, mắt đỏ; luôn trong màn vì đấu trường 1 màn) | đỏ | Phóng chéo xuống đất | Dash ngang. Đáp kẹt **1,2 s** | 1 |
| **Búng Đá Vụn** | 30 f | bạc (đạn vật lý) | 3 mảnh đá toả lẻ 260 px/s | Chém vỡ (clash đạn) hoặc né | 1 |

**Pha 2 — Quá Tải (≤ 45%)**

| Đòn | Báo trước | Màu | Diễn biến | Sát thương |
|---|---|---|---|---|
| **Sóng Xung Kích Dọc Vách** | 50 f (đập vách, vòng xanh tụ) | xanh | Sóng chạy dọc hai vách. Né bằng **nhảy ra giữa / nảy hồ muối** | 1 |
| **Đấm Cavitation ×2** (2 tay) hoặc ×1 (nếu đã vỡ chùy) | 40 f mỗi cú, cú 2 có tiếng "tách" riêng | bạc + xanh | như Pha 1 | 1 mỗi nhịp |
| **Leo Trốn Lên Cao** | — | — | Bám vách cao 14 ô (trong màn), hồi giáp chậm. **Dậm Nặng trên hồ muối nảy 15 ô** với tới (vách 14 ô, lề 1), đánh rơi nó (khựng 2 s) | — |

- **Thưởng:** Ấn #2 Đôi Tay ⇒ nhát 4 Neo Bổ, tầm chém 36 px, Móc Neo (02 Q2.5).

---

## B3 — Mẫu Sứa Chuông Cổ (1.240 m, Đại Sảnh Tháp Trung Tâm) — **trận boss bơi 360° (Pha 2)**

| Mục | Giá trị |
|---|---|
| Bộ kỹ năng | F2 (7–8 Vảy, 4 bình), combo 4, móc neo, Đĩa Đúc Sóng (45, nếu đã lấy ở Ống Vang), kiếm bậc 2 |
| Máu | **1.980** (60 nhát bậc 2, combo 4). Pha 1: 1.050 (3 van × 150 + thân 600) → Pha 2 khi còn **47%** |
| Đấu trường | **1 × 1,5 màn (dọc)** + luật boss trong màn: 3 tầng sàn bazan, **3 cột Mạch Phù Ấn** (vùng bơi dọc), **4 vòng neo** trên cao. Camera kéo theo boss |
| Bộ phận phá được | **6 xúc tu** (clash cắt được) + **3 van thạch anh** |
| Khoảng thở | Boss "hít nước" **3 s** sau mỗi 3 đòn (van lộ rõ) |
| Thời lượng sạch | ~1,8 phút |

**Pha 1 — Lồng Áp Suất (100% → 47%)**

| Đòn | Báo trước | Màu | Diễn biến | Né / phạt | Sát thương |
|---|---|---|---|---|---|
| **Xúc Tu Quét Sàn** | 30 f (xúc tu sáng dọc thân) | bạc | 2 xúc tu quét ngang tầng người đang đứng | **Clash ⇒ cắt xúc tu** (mất 1 trong 6; bớt đòn ở pha sau) | 1 |
| **Vòng Điện Chuông** | 60 f (ngân) | xanh | Vòng điện bán kính 6 ô quanh thân | Ra xa, hoặc dash i-frame qua khe (≥ 1,5 hurtbox) | 1 |
| **Gọi Sứa Con** | 40 f | — | 2 Sứa Chuông Điện nhỏ ở cột sáng | Bắn đỉnh chuông ⇒ rơi thành **bục tạm 4 s** để với tới van | — |

- Với tới van: **bơi lên cột Mạch Phù Ấn** hoặc **móc vòng neo**. Không bắt buộc cách nào ⇒ người chơi tự chọn (`R6` §2: năng lực kép).

**Pha 2 — Sập Đèn & Sóng Áp Suất (≤ 47%)**: boss hút toàn bộ Mạch Phù Ấn vào giữa ⇒ **cả đấu trường thành vùng bơi 360°** (lore "Pressurized Sanctuary"). Hero bơi tự do, uống bình được khi lơ lửng (04 Q4.8).

| Đòn | Báo trước | Màu | Diễn biến | Sát thương |
|---|---|---|---|---|
| **Sóng Áp Suất Vòng** | 50 f | xanh | 3 vòng sóng nở dần, mỗi vòng **1 khe** (khe xoay 90° mỗi vòng) ⇒ bơi xuyên khe (bài "đạn vòng", `R4` §2) | 1 |
| **Đảo Dòng** | 60 f (hạt trôi đổi hướng) | — | Dòng hút về tâm 4 s (bơi ngược tốn stamina 20/s) | — |
| **Lao Lõi** | 44 f | đỏ | Lõi Ấn Thân Mình lao thẳng về hero | 1 |

- **Thưởng:** Ấn #3 Thân Mình ⇒ qua được màng áp suất vào Tầng IV, +20 stamina, Mạch Lướt, Nhát Cắt Hải Quang (07).

---

## B4 — Hài Ngư Đèn Lồng (2.000 m, Hố Xương Sườn)

| Mục | Giá trị |
|---|---|
| Bộ kỹ năng | F3 (8–9 Vảy, 4–5 bình), Mạch Lướt, Nhát Cắt, Kính 705 nm (nếu đã đổi), kiếm **bậc 3** (Vàng Vỡ cho bậc 4 nằm **sau** B4, 09 Q9.1) |
| Máu | **3.200** (75 nhát bậc 3, combo 4). Pha 2 khi còn **47%** (mất 1.700) |
| Đấu trường | **1,5 × 1 màn**, tối gần hoàn toàn (vầng sáng hero 2,5 m). **2 ống phun nhiệt** ở hai cánh, phun mỗi 9 s (rung 1,2 s trước), khi phun **chiếu sáng cả sảnh 2 s** + luồng nâng 360° |
| Bộ phận phá được | **2 mồi giả** (clash đứt mồi ⇒ bớt bẫy) |
| Khoảng thở | Mỗi lần ống phun phun, boss lùi vào nền **2,5 s** (tránh sáng) |
| Thời lượng sạch | ~2,3 phút |
| Bài học | Đọc âm thanh & ánh sáng trong tối (đã dạy bởi Cua Quan Tài, Cá Dơi, Cá Đèn Mồi Con, Rình Mồi Siêu Đen) |

**Pha 1 — Săn Trong Đêm (100% → 47%)**

| Đòn | Báo trước | Màu | Diễn biến | Né / phạt | Sát thương |
|---|---|---|---|---|---|
| **Ba Mồi Sáng** | — | — | 3 đốm sáng; 2 là xúc tu bẫy, 1 nối đầu thật. **Mồi thật: không nhấp nháy lệch nhịp + có tiếng ngân trầm** (đã dạy bởi Cá Đèn Mồi Con). Kính 705 nm lộ dây nối | Đánh mồi thật ⇒ trúng đầu | — |
| **Đớp Từ Hậu Cảnh** | **44 f**: tiếng *click* sonar ×3 dồn nhanh + gợn nước trên nền | đỏ | Hàm 6 m đớp ra từ lớp nền | Dash i-frame / ra khỏi vùng gợn. Hụt ⇒ đầu kẹt ở lớp trước **1,5 s** | 1 |
| **Xúc Tu Bẫy** | 30 f (mồi giả sáng mạnh) | bạc | Mồi giả hóa xúc tu quất | Clash ⇒ đứt mồi giả | 1 |

**Pha 2 — Chói Võng Mạc (≤ 47%)**

| Đòn | Báo trước | Màu | Diễn biến | Sát thương |
|---|---|---|---|---|
| **Hút Nước** | 50 f (hạt bay về miệng) | — | Hút về hàm 3 s. Đi ngược tốn stamina; **neo chân** đứng vững | — |
| **Đớp Liên Hoàn ×2** | cú 1 **40 f**, cú 2 **36 f** (mỗi cú có 3 tiếng click riêng) | đỏ | Hai cú đớp, cú 2 có báo riêng (cấm đòn nối ẩn, 05 QA.1) | 1 mỗi cú |
| **Đớp Toàn Lực** | **52 f** (hàm mở hết cỡ, mắt đỏ, rung nền) | đỏ | Một cú đớp rộng 8 ô | **2** |
| **Lóa (cửa sổ lớn)** | — | — | **Dụ nó lao qua ống phun đang phun** hoặc **bắn chớp sáng cavitation vào mắt khi nó mở hàm** ⇒ **lóa 4,5 s**: sát thương ×1,25, leo lên đầu chém được | — |

- **Thưởng:** Ấn #4 Cái Đầu ⇒ khuôn mặt người, **Sonar** (07), mở cổng Ấn Phong Bốn Mảnh xuống Tầng V.

---

## B5 — Tàn Ảnh Vực Chủ Vô Diện (2.400 m, Khoang Triệt Tiêu Trọng Lực)

| Mục | Giá trị |
|---|---|
| Bộ kỹ năng | F4 hoàn chỉnh, mọi kỹ năng, kiếm **bậc 4** (Vàng Vỡ ở hành lang Tầng V) |
| Máu | **6.300** (120 nhát bậc 4, combo 4), 3 pha × 2.100 |
| Đấu trường | **1,5 × 1,5 màn** + luật boss trong màn (**camera tự lùi ×1,15** để F4 giữ tầm nhìn ~7,4 H, `16` P1), **bơi 360° toàn sảnh** (lore: Áp Lực Chì biến mất). Mỏ Neo 40 m ở giữa (vật cản, chỗ nấp). **4 trụ bazan** đạp được: đạp trụ ⇒ **nạp lực chém** (nhát chém tiếp theo ×1,5, lore "đạp trụ nạp lực chém kiếm") |
| Bộ phận phá được | **3 Neo Nước** (cột nước áp suất quanh sảnh): phá ở Pha 1 ⇒ dòng xiết Pha 2 yếu đi 1/3 mỗi neo |
| Khoảng thở | Cuối mỗi chu kỳ, Tàn Ảnh "tái kết cấu" **3 s** (đứng yên phát sáng) |
| Thời lượng sạch | ~3,9 phút. Không có điểm lưu giữa trận, nhưng chết ở Pha 3 thì lần sau **Pha 1 còn 60% máu** (**không cộng dồn** với mẹo ẩn −24% máu boss ở `10` Q10.3, `16` P1). Lý do: không bắt chơi lại đoạn dài chỉ để luyện pha cuối (`R3` §4.2 [internal]: mỗi pha ≤ 60–90 s; `R4` R45: Furi có điểm lưu theo pha) |

| Pha | Lực tự nhiên | Gợi lại bài | Đòn chính (báo trước · màu · sát thương) |
|---|---|---|---|
| **1 — Sóng Áp Suất Đa Tầng** (100–67%) | áp suất | B3 (đạn vòng có khe), B1 (sóng lan) | Vòng sóng 3 lớp có khe xoay (50 f · xanh · 1); **quét giáo vàng cổ** (30 f · bạc · 1, clash được: Tàn Ảnh đúc từ hợp kim vàng cổ, lore); gọi 2 **Bóng Nước nhỏ** (100 máu) |
| **2 — Dòng Xiết Đổi Chiều** (67–33%) | dòng chảy | B4 (đọc âm thanh), stamina | Dòng xoay quanh Mỏ Neo, đổi chiều mỗi 6 s (60 f báo bằng hạt + tiếng); nấp sau Mỏ Neo / trụ = túi nước lặng (hồi stamina 40/s); lao (44 f · đỏ · 1) |
| **3 — Bọt Chân Không Quy Mô Lớn** (33–0%) | cavitation | B2 (nhịp 2 nổ chậm, nấp) | Bọt khổng lồ: hút 0,5 s rồi **nổ sau 0,8 s kể từ lúc tụ (48 f)** · xanh · **2**; **tàn ảnh Kors năm xưa** đánh tay đôi: combo bạc 3 nhát (**26 / 26 / 36 f**) · 1 mỗi nhát, **clash được toàn bộ** ⇒ clash cả 3 ⇒ khựng 3 s (cao trào chủ đề: đỡ chính nhát kiếm của mình) |

- **Thưởng:** Ấn #5 Ký Ức (100% sự thật), cắm Bùa + Kiếm ⇒ San Hô Tự Hàn; Áp Lực Chì tan ⇒ **sau kết thúc, toàn bản đồ bơi 360° được** (hậu game, 09).

## Q6.2 — Bảng tổng hợp

| Boss | Máu | Nhát (bậc) | Pha (chuyển khi còn) | Thời lượng sạch | Thử (trung vị) | Bài kiểm tra | Bộ phận phá được | Đòn 2 Vảy |
|---|---|---|---|---|---|---|---|---|
| B1 Cua | 520 | 45 (0) | 2 (50%) | ~1,1' | 1–3 | chém → bắn | bản lề mai | — |
| B2 Tôm Bọ Ngựa | 1.100 | 55 (1) | 2 (45%) | ~1,4' | 3–6 | dash i-frame + nấp | 1 chùy | — |
| B3 Sứa | 1.980 | 60 (2) | 2 (47%) | ~1,8' | 3–6 | đi ↔ bơi ↔ móc | 6 xúc tu, 3 van | — |
| B4 Cá Đèn | 3.200 | 75 (3) | 2 (47%) | ~2,3' | 5–10 | tối + âm thanh | 2 mồi giả | Đớp Toàn Lực (52 f) |
| B5 Tàn Ảnh | 6.300 | 120 (4) | 3 (67%, 33%) | ~3,9' | 5–15 | tổng hợp | 3 Neo Nước | Bọt khổng lồ (48 f) |
| + 7 mini-boss tùy chọn | 260–1.280 | 14–31 | 1 | ~0,5–1,2' | 2–5 | xem Q6.4 | — | Rình Mồi Già: đớp (48 f) |

## Q6.3 — Rủi ro & đo
- Ghi mỗi lần chết: đòn nào giết, ở pha nào, giây thứ bao nhiêu. Một đòn chiếm > 40% số lần chết ⇒ xem lại báo trước / hitbox của đòn đó.
- Đo thời lượng thật mỗi trận. Lệch > 50% so với ước lượng ⇒ chỉnh máu boss (không chỉnh sát thương người chơi, để không lệch quái thường). Tốc trúng 0,65 → 0,45 nhát/s là giả định quan trọng nhất của file này, phải đo ở Greybox 3.
- Đo % người chơi tự khám phá cơ chế phá bộ phận (B1 bản lề, B2 chùy). < 30% ⇒ thêm gợi ý môi trường (vết nứt sáng hơn).

## Q6.4 — 7 mini-boss tùy chọn (thêm sau đối chiếu `13`)

| Ô | Nội dung |
|---|---|
| **Vấn đề** | 5 boss trong 11 giờ = 0,45 trận/giờ, thấp nhất trong 15 game đối chiếu (thể loại: 0,7–1,6, tính cả mini-boss; 40–85% là tùy chọn) (`R9`, `13` Q13.2). |
| **Chọn** | Nâng 5 tinh nhuệ ở `05` thành **mini-boss có đấu trường + thanh máu**, thêm 2 mới cho Hang Tảo và Ống Vang. Tổng **12 trận**, 7 tùy chọn (58%), **1,1 trận/giờ**. Máu mục tiêu **20–30 nhát** ở bậc kiếm dự kiến (`R3` §5.3), tính bằng `_calc/metrics.py`. |
| **Luật chung** | Chuông Lặn gần cửa (≤ 10 s); 2–3 đòn mỗi trận (+1 đòn ở dưới 50% máu); khoảng thở ≥ 2,5 s mỗi chu kỳ; mọi đòn tuân sàn báo trước (05 QA.1); gác **phần thưởng đã có trong `09` Q9.8** (không đổi tổng vật phẩm). |

| Mini-boss | Khu | Máu (nhát thật) | Đòn chính (báo trước · màu · Vảy) | Bài kiểm tra | Gác thưởng |
|---|---|---|---|---|---|
| **Thuyền Phó Tàn Quân** | 1 Nghĩa Địa (Boong Đô Đốc) | **290** (25, bậc 0) | combo bạc 26/24 f · 1; chém xoay đỏ 36 f · 1; gọi 1 Lính Lao | clash + đọc màu (trước B1) | Lưỡi Dây Dài, Bản Ghi #2 |
| **Mẹ Đỉa Dầu** (mới) | 2 Hang Tảo (khoang trần dầu, F1) | **290** (25, bậc 0–1) | thả 3 đỉa con (36 f · 1); phun dầu làm chậm (40 f · 0 + chậm 50%); lao xuống từ trần (đỏ 44 f · 1). **Bắn Đạn Nhiệt vào trần ⇒ rơi xuống, khựng 3 s** | dùng môi trường (lửa trần dầu) | 1 Mảnh Bình |
| **Thợ Lặn Trưởng Ca** | 3 Hẻm Chuông (Xác Chuông 4) | **500** (26, bậc 1) | cờ lê bạc 40 f · 1; móc kéo (tóm đỏ 40 f, thoát 0,7 s) · 1; dưới 50%: đập đất sóng xanh 50 f · 1 | thoát tóm + clash | Cổ Tay Nhẹ |
| **Tôm Súng Đôi** | 4 Hầm Muối (Két Salthold) | **260 × 2** (14 mỗi con, bậc 1) | đạn chẵn kẹp hai bên (ngắm 30 f · 1: "đứng yên" mới né); thay phiên khóa chốt 48 f, không bao giờ cùng lúc | đọc đạn chẵn / lẻ (`R4` §2) | Két Salthold (rương lớn) |
| **Hộ Vệ Đèn Cổ** | 5 Cổ Thành (nhánh Sảnh Tranh Tường) | **820** (26, bậc 2) | quét bạc 28 f · 1; đập đất sóng xanh 50 f · 1; tia sáng chói 48 f · 1; hồi máu từ đèn gần (bắn tắt đèn trước) | ưu tiên mục tiêu | Mắt Thủy Triều |
| **Người Gác Đàn Ống** (mới) | 6 Ống Vang (hầm Đĩa Đúc Sóng) | **920** (28, bậc 2) | ba trụ phát sóng vòng có khe (50 f · 1); búa ống bạc 32 f · 1; dưới 50%: đổi tần số, **chỉ trúng khi đánh đúng trụ đang sáng** | dùng Ống Ngắm / trụ cộng hưởng | Đĩa Đúc Sóng |
| **Rình Mồi Già** | 7 Rãnh (hốc sọ phụ) | **1.280** (31, bậc 3) | đớp đỏ 48 f · **2**; quất đuôi bạc 30 f · 1; ẩn vào tối (lộ bằng "sao bị che" / 705 nm / Sonar) | ánh sáng + âm thanh (trước B4) | Nanh Bóng Tối |

> Thứ tự: mỗi mini-boss kiểm tra trước bài của boss chính kế tiếp hoặc của khu (Thuyền Phó → clash cho B1; Rình Mồi Già → tối cho B4). Đúng ý "dạy bằng chính loại thử thách sẽ gặp" (`R6` §5.2). Lore: mini-boss mới đều là sinh vật / cấu trúc bản địa (đỉa ký sinh dầu lore kelp-oil; cấu trúc giữ đàn của Thal-Vael lore organ).
