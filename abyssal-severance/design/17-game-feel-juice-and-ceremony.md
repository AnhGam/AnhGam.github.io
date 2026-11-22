# 17 — Game Feel Chuyên Sâu, Juice, Vi Phản Hồi & Nghi Lễ (12 Hạng Mục Bổ Sung)

> Phụ thuộc vào: `01` (`640×360`, `16 px/ô`, `60 fps`), `02` (di chuyển), `04` (chiến đấu, Vảy, Mana, Clash, Bình), `06` (5 Boss & 7 Mini-Boss), `09` (kinh tế, 12 vật liệu), `11` (bảng phản hồi lõi), `14` (HUD `1,65%` auto-fade & diegetic cues), `15` (Zero-Loss Death, âm thanh 4 dải, Quick Map), `_research/R8`, `_research/R13`.
> Mục tiêu: lấp kín toàn bộ lớp **Micro-Feedback, Juice & Ceremony** chưa có trong `00`–`16`, giữ nguyên 100% thông số lõi đã chốt và nguyên tắc **Độ Dễ Đọc > Juice**.

---

## Q17.1 — Hit-Confirm & Combat Juice Mở Rộng

> Kế thừa `11` Q11.1 (hitstop 3/5/8 f, `trauma²`, max 8 px) và bổ sung 5 lớp phản hồi còn thiếu: **Pogo, Đạn Nhiệt, Directional Camera Kick, Silhouette Inversion, Vệt chém + Bọt xâm thực**.

### 1. Bảng Hit-Confirm đầy đủ theo loại đòn (`60 fps`, `640×360`)

| Đòn / Sự kiện | Hitstop (Hero / Đích) | Trauma + (`trauma²`) | Directional Kick (hướng · px · thời gian) | Flash & Silhouette | Đẩy lùi (Hero / Đích) | Vệt & Hạt dưới nước |
|---|---|---|---|---|---|---|
| **Chém thường (nhát 1–2)** | `3 / 4 f` (50/67 ms) | `+0,14` (~0,16 px, không rung) | Theo hướng chém · `2 px` · `80 ms` | Đích trắng `#FFFFFF` **2 f** | `0` / `0,5 ô` | Cung bạc `3 f` + 4 hạt bọt xâm thực cyan |
| **Đòn kết (nhát 3, F0–F1)** | `5 / 7 f` (83/117 ms) | `+0,28` (~0,6 px) | Theo hướng chém · `4 px` · `110 ms` | Đích trắng **3 f** | `0` / `2 ô` | Cung bạc dày `4 f` + 8 hạt bọt + tia lửa nhỏ |
| **Nhát 4 — Neo Bổ (F2+)** | `8 / 10 f` (133/167 ms) | `+0,52` (~2,2 px) | Theo hướng bổ · `6 px` · `140 ms` | **1 f đảo sắc đen-trắng cục bộ** (`r = 44 px`) + 3 f trắng viền sáng | `0` / hất văng `620–850 px/s` | Vệt xoáy nước `5 f` + 14 hạt bọt + vòng áp suất mảnh |
| **Clash Parry (viền bạc)** | **`6 / 6 f` chung** (100 ms) | `+0,28` | Dọc trục va chạm · `4 px` · `100 ms` | **1 f đảo sắc đen-trắng** + sao vàng `#FFF29C` `150 ms` | `0` (i-frame `15 f`) / `1 ô` (`+30` poise) | Chữ thập tia lửa 6 nhánh + vòng sóng nén `r = 28 px` |
| **Pogo (`↓ + Chém` trên không)** | `3 / 4 f` | `+0,16` | Đẩy camera xuống `3 px` · `90 ms` | Đích trắng `2 f` + vòng bọt đáy kiếm | Hero nảy lên `vy = 210 px/s` + nạp Dash / Đích `0` | Vòng bọt nén mở rộng `r = 18 px` dưới chân Kors |
| **Súng Bọt Cavitation (bắn / nổ nhịp 2)** | `0 f` / `1 f` | `+0,05` / `+0,14` | Ngược hướng bắn `3 px` · `100 ms` (Vlambeer kick) | Chớp nòng `1 f` / Chớp trắng-lam `2 f` | Hero trượt nhẹ `2 px` trên không (`0` trên đất) / Đích `0,5 ô` | Vòng bọt chân không + gợn khúc xạ `6 f` |
| **Đạn Nhiệt Lưu Huỳnh (trúng / kích nổ trần dầu)** | `0 f` / `2 f` | `+0,10` / `+0,34` | Theo hướng nổ · `5 px` · `120 ms` | Cam-trắng `#FFB347` `2 f` | `0` / `1 ô` + cháy | Khói dầu đen bốc lên + bọt sôi trắng `12 hạt` |

- **Rung tại chỗ trong Hitstop (Sakurai Rule):** trong lúc mục tiêu đóng băng, sprite mục tiêu dao động ngang `±1 px` (nhát 1–2) hoặc `±2 px` (nhát 3–4) mỗi `2 f` (`30 Hz`), rồi bung ra đúng frame kết thúc hitstop ⇒ truyền cảm giác lực đang "nén" vào vỏ giáp.
- **Trần đa mục tiêu:** chém trúng nhiều quái cùng lúc cộng `+1 f` mỗi mục tiêu thêm, **trần tuyệt đối `base + 3 f` và không vượt `12 f`** (`11` Q11.1).
- **Vì sao chọn & Đối chiếu:** *Hollow Knight* & *Nine Sols* chứng minh flash `2 f` + cung chém tách rời giúp đọc hitbox chính xác mà không cần số sát thương; *Vlambeer* (Nijman 2013) chứng minh camera kick ngược hướng bắn làm khẩu súng có "giật" dù không cần lắc loạn; mô hình `trauma²` + Perlin của Eiserloh (GDC 2016) giữ đòn nhẹ không gây mỏi mắt.

---

## Q17.2 — Trúng Đòn, Trạng Thái 1 Vảy (Last Stand) & Chết / Hồi Sinh

### 1. Phản hồi khi Kors trúng đòn (đồng bộ `04` Q4.1 & `11` Q11.1)

| Mức trúng đòn | Hitstop | Trauma + | Hiệu ứng hình & khung hình | Âm thanh | I-frame & Đẩy lùi |
|---|---|---|---|---|---|
| **Trúng môi trường / gai / chip nhẹ** | **8 f** (`133 ms`) | `+0,35` | Chớp viền mực đen-đỏ 4 góc `0,10 s` + vỡ 1 Vảy | Tiếng *tách* rạn vỏ trầm (`180 Hz`) | `1,2 s` nhấp nháy mỗi `5 f` (`0,08 s`), đẩy `0,8 ô` |
| **Trúng đòn quái 1 Vảy (chuẩn)** | **12 f** (`200 ms`) | `+0,50` | Đứt khung nhẹ (chromatic split `2 px` trong `4 f`) + vignette mực tối `alpha 0,65 → 0` trong `0,14 s` + mảnh Vảy bắn ra | Bóp âm môi trường low-pass `800 Hz` suốt `1,2 s` i-frame + tiếng *bụp* trầm | `1,2 s` nhấp nháy `5 f`, đẩy lùi `1 ô`, khóa điều khiển `0,15 s` (`9 f`) |
| **Trúng đòn nặng 2 Vảy (báo ≥ 48 f)** | **18 f** (`300 ms`) | `+0,72` | 1 f đảo sắc đen-trắng + chromatic split `3 px` (`6 f`) + vignette mực tối `alpha 0,80 → 0` (`0,22 s`) + 2 mảnh Vảy văng | Cắt nhạc `−10 dB` trong `0,35 s` + tiếng vỡ áp suất `90 Hz` | `1,2 s` nhấp nháy `5 f`, đẩy `1,5 ô`, khóa `0,18 s` (`11 f`) |

> **Giải thích chuẩn hóa:** giữ `12 f` / `18 f` của `04` Q4.1 cho đòn quái (đủ để não bộ nhận diện mất Vảy, kiểu *Hollow Knight*), dùng `8 f` cho va chạm gai/môi trường để nền tảng không bị cảm giác "kẹt lâu" khi lỡ chạm gai.

### 2. Trạng thái 1 Vảy (Last Stand)
- **Thị giác (giữ tâm màn 100% sạch):** vignette áp suất đỏ-đen thẫm 4 góc (`alpha` thở giữa `0,18 ↔ 0,32` theo nhịp **70 bpm**, chu kỳ `0,86 s`); sprite Kors có 2–3 vệt nứt rỉ ánh sáng lam-đỏ + chuỗi bọt mảnh thoát ra từ mang; ô Vảy cuối trên HUD nhấp nháy san hô (`14` Q14.3).
- **Âm thanh:** nhịp tim trầm `55–75 Hz` ở `−14 dB` (70 bpm); lớp giai điệu nhạc nền hạ `−6 dB` + lọc nhẹ `2.400 Hz` — **Combat Bus tuyệt đối giữ nguyên sàn `2.500 Hz` và `0 dB`** để người chơi không bị điếc trước đòn quái. **Cấm tuyệt đối còi bíp chói tai.**

### 3. Chuỗi Chết & Hồi Sinh — Tổng **`1,40 s` (`84 f`)** (Zero-Loss Death, `15` Q15.1)

| Pha | Khung hình (ms) | Diễn biến |
|---|---|---|
| 1. Cú ngã cuối | `0–12 f` (`200 ms`) | Freeze `12 f`, Vảy cuối nứt vỡ thành 6 mảnh sáng, nhạc cắt đột ngột với đuôi reverb `0,4 s`. |
| 2. Tan thân mực | `12–42 f` (`500 ms`) | Kors khuỵu xuống và tan thành cuộn mực đen + bọt khí nổi lên; camera giữ nguyên không giật. |
| 3. Khép tối | `42–66 f` (`400 ms`) | Màn tối khép vòng tròn (iris fade) quanh vị trí ngã → đen tuyền `100%` (tải lại phòng & hồi quái trong `2 f` ẩn). |
| 4. Hồi sinh Chuông Lặn | `66–84 f` (`300 ms`) | Mở sáng nhanh tại Chuông Lặn gần nhất, tiếng ngân đồng trầm `−8 dB`, Kors đứng dậy ngay (mở khóa điều khiển ở **`f78`**, cho phép di chuyển sớm `0,1 s` trước khi màn sáng hẳn). |

- **Vì sao `1,40 s`?** Đủ dài hơn *Celeste* (`0,7 s`) để cái chết có trọng lượng dưới đáy biển, nhưng ngắn hơn *Hollow Knight* (`~3,5 s`) gấp 2,5 lần để khớp luật Zero-Loss & chạy lại Boss ≤ 10 s (`06` Q6.1).

---

## Q17.3 — Vũ Đạo Chết 3 Cấp (Quái Thường · Mini-Boss · 5 Boss Chính)

> Luật sắt: **không có sinh vật nào "hết máu rồi biến mất trong 1 frame"**. Mọi cái chết phải để lại dấu vết vật lý (Vlambeer "Permanence", `R13` §3).

### Cấp 1 — Quái Thường (24 loài)
1. **Hitstop kết liễu:** `4 f` (`8 f` nếu là con cuối cùng mở khóa phòng đấu trường).
2. **Đẩy văng & Vỡ vỏ theo 4 chất liệu sinh học:**
   - *Sinh vật dầu/tảo* (Đỉa Dầu, Lính Tảo): vệt dầu đen loang `r = 20 px` trên sàn + 8 giọt dầu bắn theo vector đòn.
   - *Giáp xương/vỏ cứng* (Cua, Thợ Lặn Đứt Cáp, Tôm): 4–6 mảnh vỏ/xương văng parabol nảy 1 lần trên sàn.
   - *Tinh thể muối/san hô* (quái Hầm Muối, Cổ Thành): vỡ thành 6–8 mảnh tinh thể lấp lánh kèm tiếng *loảng xoảng* `3,2 kHz`.
   - *Sinh vật điện/ánh sáng* (Sứa Chuông, Cá Đèn): 1 chớp tĩnh điện ngắn `3 f` + 6 tia sáng tắt dần.
3. **Bọt khí & Chìm mờ:** cột 6–10 bọt khí nổi lên; xác chính chìm mờ (`alpha 1,0 → 0`) trong **`0,60 s`** (`36 f`), để lại **2–3 mảnh vỏ nhỏ ở `alpha 0,45`** lưu trên sàn trong `10 s` (hoặc đến khi rời phòng).

### Cấp 2 — 7 Mini-Boss Tùy Chọn
- **Tổng chuỗi: `1,35 s` (`81 f`).**
  1. `0–6 f`: Hitstop kết liễu + xóa ngay mọi đạn đang bay của mini-boss.
  2. `6–42 f` (**`0,60 s`**): **Slow-motion `0,25×`** + zoom nhẹ `1,06×` hướng về mini-boss.
  3. `12 / 23 / 34 f`: **3 nhịp nổ áp suất** (trauma `+0,22` mỗi nhịp), cao độ âm nổ tăng dần (`180 Hz → 240 Hz → 320 Hz`), mảnh giáp bắn ra mỗi nhịp.
  4. `42–69 f` (`0,45 s`): Về tốc độ `1,0×`, các giọt Hải Quang từ thân mini-boss bay xoắn hội tụ vào 1 điểm giữa sàn → kết tinh thành vật phẩm thưởng (bùa / Mảnh Bình / Đĩa Đúc Sóng). Nhạc chiến đấu hạ mượt `1,0 s` về nhạc khu vực.

### Cấp 3 — 5 Boss Chính (Death Throe `3,5–4,5 s`)

| Giai đoạn | Thời gian | Diễn biến chung & Đặc trưng từng Boss |
|---|---|---|
| **1. Đòn kết & Đóng băng** | `0,20 s` (`12 f`) | Freeze `12 f` + `2 f` đảo sắc đen-trắng toàn vùng boss (`r = 96 px`) + trauma `+0,80`. |
| **2. Strategic Silence & Xóa đạn** | `0,30 s` (`18 f`) | **Nhạc chiến đấu cắt đột ngột** (chỉ còn đuôi reverb `0,4 s`). Một **sóng xung kích áp suất** lan từ tâm boss xóa sạch 100% đạn, bẫy, sóng điện đang tồn tại (**đảm bảo 0% chết chéo sau khi hạ boss**). |
| **3. 3–4 nhịp nứt/vỡ giáp (theo chủ đề)** | `2,20 s` (`132 f`, slow-mo `0,4×` ở 2 nhịp cuối) | • **B1 Cự Giải Thiết Giáp:** 3 chốt bản lề mai nổ liên tiếp → mai thép bung nửa, lộ hạch Đôi Chân vỡ sáng.<br>• **B2 Tôm Bọ Ngựa Xích Sắt:** 2 khớp chùy phát nổ cavitation ngược → xích sắt đứt tung rơi rào rào xuống hồ muối.<br>• **B3 Mẫu Sứa Chuông Cổ:** 3 van thạch anh nứt rạn → vòm chuông thủy tinh sập thành mưa mảnh pha lê chìm chậm.<br>• **B4 Hài Ngư Đèn Lồng:** 3 đốm mồi tắt phụt theo nhịp *bụp-bụp-bụp* → bóng tối Hố Xương Sườn tan mở ánh sáng lam.<br>• **B5 Tàn Ảnh Vực Chủ Vô Diện:** 4 nhịp tách lớp hợp kim vàng cổ → tàn ảnh vỡ thành dải Hải Quang xoáy ngược lên trần (kéo dài `3,0 s`, tổng `4,5 s`). |
| **4. Permanence & Cổ Vật trồi ra** | `0,80–1,00 s` | Xác/di tích boss **nằm lại vĩnh viễn** trên đấu trường (lớp nền P3, giảm độ tương phản `30%` để không cản đường). Từ tâm di tích, **Cổ Vật (Ấn #1→#5)** từ từ nổi lên ở độ cao `3 ô` kèm cột sáng dọc mảnh và tiếng ngân trầm mời người chơi bước tới chạm. |

---

## Q17.4 — Vật Lý Rơi Đồ & Nghi Lễ Nhặt 5 Cấp (Tier 1→5)

| Cấp | Đối tượng | Vật lý rơi & Thị giác trên đất | Tương tác & Chặn điều khiển | Âm thanh & Nghi lễ |
|---|---|---|---|---|
| **Cấp 1** | Tiền `Sv` / `Nc` (tự quy đổi `10 Nc = 1 Sv`) | Văng parabol góc `55°–125°`, `v0 = 140–220 px/s`, lực cản nước `drag = 3,2/s`, nảy 2 lần (`0,42` → `0,20`). Tự hút nam châm khi Kors vào bán kính **`3 ô` (`48 px`)** (`5 ô` khi đeo Túi Hũ Vàng). | **Chạm là nhặt, 0 s chặn.** Số `+15` trượt sát mép dưới-trái `1,8 s` (`14` Q14.3). | Tiếng *leng keng* kim loại leo **8 bậc ngũ cung thứ** (`D5→F5→G5→A5→C6→D6→F6→G6`) trong cửa sổ `0,45 s`, reset khi ngắt chuỗi (kiểu *Ori* / *Mario*). |
| **Cấp 2** | 12 Vật liệu (4 nhóm icon: Kim loại / Khoáng / Sinh vật / Di vật) | Vầng sáng dịu (`r = 14 px`, nhịp thở `2,5 s`) + 1 cột bọt mảnh bay lên `2 ô`. | **Chạm là nhặt, 0 s chặn.** Toast siêu nhỏ góc dưới-trái `1,5 s`: `[Icon nhóm] Bazan Chàm 2/4 — Kiếm bậc 1` rồi tan (`09` Q9.1). | Tiếng vật liệu đặc trưng (kim loại *keng* trầm / tinh thể *tinh* / hữu cơ *bụp* mềm), `−6 dB`. |
| **Cấp 3** | Mảnh Vảy (9) · Mảnh Bình (6) · Mảnh Stamina (3) · Hạt Hải Quang (11) | Tia sáng dọc cao `3,5 ô` + 4 hạt sáng quay quanh quỹ đạo chậm. | **Mini-pause `0,35 s` (`21 f`)**: Kors giơ cao vật phẩm trên đầu, ánh sáng tụ vào cụm HUD tương ứng (nếu đủ `3/3` mảnh ⇒ thêm `0,45 s` hoạt ảnh ghép hoàn chỉnh +1 Vảy/Bình). | Hợp âm ngân thủy tinh 2 nốt (`A5 + E6`), không lọc low-pass (UI Bus). |
| **Cấp 4** | Súng Phép · Đạn Nhiệt · Ống Ngắm · Đĩa Đúc Sóng · Bùa/Kỹ năng nhặt | Đặt trên bệ/xác tàu có đèn chiếu nhẹ. Bấm tương tác (`↑` hoặc nút Interact) để nhận. | Camera zoom mượt **`1,15×`** (`0,35 s`), hiện **bảng diegetic không viền** (nền đen mờ dọc `alpha 0,72` ở 1/3 dưới màn): **Tên + 1 dòng công dụng + Biểu tượng nút bấm trực tiếp**. Khóa đóng `0,4 s` (tránh lỡ tay bấm bỏ qua), sau đó **bấm bất kỳ nút nào đóng ngay**. | Tiếng lên cò / ngân cộng hưởng đặc thù món đồ; nhạc nền hạ `−5 dB` trong lúc mở bảng. |
| **Cấp 5** | **5 Cổ Vật Hóa Hình (Ấn #1→#4 & Mảnh #5)** | Lơ lửng giữa đấu trường sau khi hạ Boss chính. Chạm hoặc bấm tương tác để kích hoạt. | **Nghi lễ Biến Hình `4,5–5,5 s`** (bảng chi tiết bên dưới). | Toàn màn hình không HUD, biến hình trực tiếp, mở khóa **Test-Chamber Lock**. |

### Vũ đạo chi tiết Nghi lễ Biến Hình Cấp 5 (`4,8 s` cho Ấn #1–#4; `5,5 s` cho Ấn #5)
1. **`0,0–0,6 s`:** Tắt HUD về **`0%`**, nhạc khu vực tắt dần, camera zoom mượt vào Kors tới **`1,25×`**; Kors lơ lửng cách đất `1 ô`.
2. **`0,6–2,2 s`:** 24 dải ánh sáng Hải Quang từ viền màn hình xoáy hội tụ vào thân thể Kors; tiếng ngân trầm tăng dần từ `110 Hz → 440 Hz` kèm tiếng rạn vỏ chì.
3. **`2,2–2,5 s`:** `2 f` chớp trắng cục bộ + sóng xung kích vòng tròn lan toàn màn (trauma `+0,45`) — **Silhouette Kors thay đổi ngay tại chỗ trong thời gian thực**:
   - **F0 → F1 (Đôi Chân):** thân cá khom gãy vỏ dưới, đứng thẳng lên cao `36 px`, bật đôi chân vững.
   - **F1 → F2 (Đôi Tay):** vây ngực tách dài thành đôi cánh tay người, tay trái giữ chặt chuôi Kiếm Buộc Dây dài hơn (`36 px`).
   - **F2 → F3 (Thân Mình):** lồng ngực và vai mở rộng hoàn chỉnh, lớp màng áp suất lam bao quanh thân.
   - **F3 → F4 (Cái Đầu):** mặt nạ vảy cá nứt rơi, lộ khuôn mặt người với đôi mắt phát sáng Sonar.
   - **Ấn #5 (Ký Ức):** vương miện ánh sáng vực thẳm kết tụ, Áp Lực Chì toàn bản đồ vỡ tan (vòng sáng lam quét khắp sảnh).
4. **`2,5–4,2 s`:** Hiện chữ tối giản không khung ở đáy màn: tên Ấn + 1 dòng ngắn (vd: *ẤN ĐÔI CHÂN — Đạp tường · Dash Áp Suất · Dậm Nặng*).
5. **`4,2–4,8 s`:** Camera lùi mượt về `1,00×`, sóng xung kích mở chốt cửa dẫn vào **Phòng Test-Chamber Lock** ngay cạnh.

---

## Q17.5 — Mở Khóa Tính Năng, Khám Phá Cơ Chế & Tín Hiệu Bản Đồ (Zero-UI Onboarding)

### 1. Luật Test-Chamber Lock (học *Super Metroid* & *Hollow Knight*, `R13` §5)
- Mọi năng lực cốt lõi (Ấn #1→#4, Súng Phép, Đạn Nhiệt, Ống Ngắm) đều đặt trước một **cổng thoát bắt buộc dùng chính động từ mới trong ≤ 10 giây** để rời phòng — **tuyệt đối không dùng hộp thoại hướng dẫn nhiều trang**:
  - **Súng Phép:** 1 Bụi Tinh Thể Hải Quang + 1 chốt khóa gỉ cách `10 ô` qua hố nước ⇒ chém nạp mana rồi bắn mở cửa.
  - **Ấn #1 (Đôi Chân):** vách đá có rãnh cao `14 ô` + khe hẹp cần Dash Áp Suất ⇒ buộc đạp tường & Dash để thoát.
  - **Ấn #2 (Đôi Tay):** 2 vòng Móc Neo treo trên vực dài `18 ô` ⇒ buộc móc liên tiếp qua vực.
  - **Ấn #3 (Thân Mình):** màng áp suất chắn lối ra + dòng xiết ngược ⇒ buộc dùng Mạch Lướt xuyên qua.
  - **Ấn #4 (Cái Đầu):** bức tường Ấn Phong tối đen có 1 chốt cộng hưởng ẩn ⇒ buộc phát Sonar để lộ và mở.

### 2. Tín hiệu Thế Giới (Affordance) cho 6 Tương Tác Bản Đồ

| Đối tượng trên bản đồ | Trạng thái nghỉ (ngoài tầm) | Phản hồi khi Kors vào tầm (Affordance) | Phản hồi khi kích hoạt thành công |
|---|---|---|---|
| **1. Vòng Móc Neo** | Vòng đồng tối đung đưa biên độ `±2°` theo dòng nước. | Khi Kors vào bán kính **`7 ô` (`112 px`)**: vòng **lóe ánh đồng ấm (`#E5A952`)**, biên độ lắc tăng `±6°` + vòng chấm mục tiêu mảnh `1 px` bám tâm vòng. | Tiếng *cạch* kim loại + tia lửa nhỏ + dây neo căng sáng `3 f`. |
| **2. Trần Dầu Dễ Cháy** | Mảng dầu đen bóng có ánh cầu vồng mờ, nhỏ **1 giọt dầu mỗi `2,2 s`**. | Khi giương/mang Đạn Nhiệt trong tầm `12 ô`: mặt dầu gợn sóng nhẹ + bong bóng khí nổi sát mép dầu. | Bùng cháy lan theo chuỗi `0,15 s/ô`, rọi sáng ấm cả hang `3–6 s`. |
| **3. Cửa Mở Tắt (Shortcut)** | Cửa có thanh chốt sắt nhìn thấy rõ phía sau; phía bị khóa có rêu chắn. | Chạm phía khóa ⇒ tiếng chốt kẹt *cục-cục* + rung chốt `2 px` (cho biết mở từ phía kia). | Khi kéo đòn bẩy mở tắt: **camera pan mượt `1,2 s`** (`0,4 s` trượt tới cửa → `0,4 s` thấy chốt mở kèm tiếng khóa nặng `140 Hz` → `0,4 s` trượt về Kors). |
| **4. Công Tắc / Đòn Bẩy** | Tay gạt đồng hoặc nút áp suất có đường ống dẫn sáng mờ nối về phía cửa đích. | Khi vào tầm `2 ô`: viền sáng nhẹ `1 px` quanh tay gạt. | Gạt kêu *rầm* + luồng bọt chạy dọc đường ống dẫn thẳng tới cửa để mắt tự nối nguyên nhân–kết quả. |
| **5. Nhiệt Tầng (Ống Phun Nhiệt)** | Miệng ống tối có vệt rỉ lưu huỳnh. | **`1,2 s` trước khi phun**: miệng ống rung `±1 px`, rít hơi trầm `220 Hz` + bọt nhỏ trào ra. | Cột nước nóng sáng cam-trắng nâng Kors lên 360°, lọc âm ấm áp. |
| **6. Chuông Lặn Chưa Kích Hoạt** | Chuông tắt đèn, dây cáp thẳng đứng chỉ lên trên mặt biển, đung đưa nhẹ. | Khi vào tầm `5 ô`: đèn báo đồng ở đỉnh chuông nhấp nháy yếu nhịp `1,5 s` + tiếng dây cáp kẽo kẹt. | Xem nghi lễ Kích hoạt ở `Q17.10`. |

### 3. Luật Prompt Nút Bấm 1 Lần Duy Nhất (Zero-UI World-Space Prompt)
- Học trực tiếp *Hyper Light Drifter* (`R13` §5): chỉ hiện **1 biểu tượng phím/nút tối giản (`14×14 px`)** nổi trong không gian thế giới, cách vật thể tương tác **`+18 px`** phía trên (fade-in `0,20 s`, không khung chữ, không nền hộp).
- **Quy tắc tự hủy vĩnh viễn:** ngay khi người chơi thực hiện thành công hành động đó **đúng 1 lần** trong save file, prompt đó **biến mất vĩnh viễn** suốt phần còn lại của game (có thể bật lại trong menu Trợ năng nếu muốn).

---

## Q17.6 — Vi Cảm Giác Di Chuyển & Môi Trường (Movement Micro-Feel)

### 1. Squash & Stretch theo khung hình (điều chỉnh từ *Celeste* `Player.cs` cho thân chì nặng)

| Hành động | Tỉ lệ `(ScaleX × ScaleY)` | Thời gian trả về `(1,0 × 1,0)` | Đường cong | Lý do chọn |
|---|---|---|---|---|
| **Nhảy (bật khỏi đất)** | **`0,85 × 1,18`** | `3 f` (`50 ms`) | Ease-out bậc 2 | Đầm hơn *Celeste* (`0,6 × 1,4`) để giữ cảm giác thân chì dưới nước, không bị "cao su". |
| **Đáp thường (rơi ≤ 6 ô)** | **`1,18 × 0,82`** | `4 f` (`67 ms`) | Ease-out bậc 2 | Truyền trọng lượng chân chạm đáy; kèm 3 hạt bụi/bọt ngang. |
| **Đáp nặng (rơi > 6 ô)** | **`1,26 × 0,74`** | `5 f` (`83 ms`) | Ease-out lò xo nhẹ | Kèm **micro-shake `trauma +0,18`** (nảy camera xuống `2 px`), **vòng bọt ngang `r = 22 px`**, âm *bịch* trầm `95 Hz` (`−4 dB`), không khóa di chuyển (hủy được ngay bằng đi/chém). |
| **Đổi hướng gấp trên đất** | **`0,90 × 1,08`** | `2 f` (`33 ms`) | Tuyến tính | Kèm 2 hạt bọt trượt ngược hướng chân. |
| **Khởi phát Dash** | **`1,25 × 0,78`** (theo trục dash) | `3 f` (`50 ms`) | Bám hết pha freeze `2–3 f` | Khớp *Celeste* dash freeze `3 f` (`11` Q11.1). |

### 2. Bước chân theo 5 chất liệu nền (Foley & Hạt)
Mỗi chất liệu có **8 biến thể âm thanh** + lệch cao độ ngẫu nhiên **`±7%`** (chống *machine-gunning*):

| Chất liệu nền | Khu vực chính | Dải tần chính | Hạt dưới chân (mỗi bước) |
|---|---|---|---|
| **1. Thép rỉ** | Nghĩa Địa Tàu, Xác Chuông | `160–420 Hz` + tiếng vang kim loại rỗng `1,2 kHz` | 2 hạt gỉ nâu + 1 bọt nhỏ |
| **2. Tảo dầu** | Hang Tảo | `110–260 Hz` tiếng *lép nhép* ướt dày | 3 giọt dầu/tảo xanh thẫm bám ngắn `0,2 s` |
| **3. Tinh thể muối** | Hầm Muối | `280 Hz` nền + tiếng *lạo xạo* sắc `2,4–3,8 kHz` | 3 hạt muối trắng nhỏ nảy nhẹ |
| **4. Xương** | Hố Xương Sườn, Rãnh | `180–550 Hz` tiếng *cộc* khô rỗng | 2 hạt bụi tro xương trắng xám |
| **5. Đá san hô** | Thành Cổ Nereketh, Ống Vang | `140–340 Hz` chắc nặng + vang đá nhẹ | 2 hạt cát san hô sáng |

### 3. Tàn ảnh Dash, Bám tường & Chuyển tiếp Mặt nước ↔ Bơi 360°
- **Tàn ảnh Dash:** sinh **3 bóng mờ màu cyan Hải Quang (`#5CE1E6`)** cách nhau mỗi `2 f` trong suốt quãng dash; mỗi bóng mờ giảm alpha `0,65 → 0` trong `0,22 s` (`13 f`).
- **Bọt ma sát bám tường (F1+):** khi trượt dọc vách, sinh `2–3` bọt khí nhỏ mỗi `4 f` tại điểm tiếp xúc bàn tay/chân + tiếng rít ma sát trầm `−16 dB`.
- **Chuyển tiếp Vùng đi bộ ↔ Vùng bơi 360° (Mạch Phù Ấn / B3 Pha 2 / B5):**
  - Khoảnh khắc chạm ranh giới: bắn **vòng 12 bọt khí** quanh thân + gợn khúc xạ mặt phân cách `6 f`.
  - Trọng lực và lực cản nội suy mượt trong **`0,10 s` (`6 f`)** (không bị giật vận tốc đột ngột).
  - Âm thanh môi trường quét bộ lọc low-pass mượt trong **`0,15 s` (`9 f`)** xuống `650 Hz` kèm tiếng *ùm* nước nhẹ (`−8 dB`), **Combat Bus giữ nguyên không bị đục**.

---

## Q17.7 — Vũ Đạo Camera & Chuyển Phòng (`640×360`)

> Ứng dụng trực tiếp *Scroll Back* (Itay Keren, GDC 2015, `R13` §7). Thứ tự đường ống bắt buộc: `Follow + Deadzone → Look-Ahead → Landmark Zoom → Room Clamp (overscan 2 px) → Trauma Shake + Directional Kick → Pixel Snap (làm tròn số nguyên)`.

| Thông số Camera | Giá trị chốt | Cơ chế hoạt động |
|---|---|---|
| **Horizontal Look-Ahead** | **`2,5 ô` (`40 px`)** về hướng mặt | Chỉ kích hoạt sau khi Kors di chuyển cùng hướng **`0,15 s` (`9 f`)** (tránh lắc camera khi đổi hướng liên tục trong combat). Nội suy hàm mũ hằng số thời gian `τ = 0,22 s`. |
| **Vertical Deadzone** | **`±2,5 ô` (`±40 px`)** quanh tâm | Camera đứng yên theo trục Y khi Kors nhảy thấp trong vùng deadzone ⇒ combat và chạy nhảy không bị say sóng. |
| **Landing Camera Snap** | `τ = 0,25 s` (ease-out) | Ngay khi chân Kors đáp xuống một độ cao sàn mới chênh ≥ `1,5 ô`, tâm dọc camera trượt êm về vị trí sàn mới (Platform Snapping kiểu *Super Mario World* / *Hollow Knight*). |
| **Nhìn xuống / Nhìn lên chủ động** | Giữ `↓` / `↑` trong `0,45 s` ⇒ dịch thêm **`4 ô` (`64 px`)** | Cho phép soi hố sâu trước khi nhảy; trả về ngay khi nhả nút (`0,20 s`). |
| **Chuyển phòng** | Crossfade/Pan **`0,18 s` (`11 f`)** | Giữ nguyên vận tốc đầu vào nếu Kors đang nhảy/dash qua cửa. Kèm **`0,25 s` (`15 f`) an toàn chống spawn-kill**: Kors miễn thương tại ngưỡng cửa và mọi quái trong bán kính `6 ô` bị khóa không bắt đầu đòn mới. |
| **Landmark Zoom-Out** | **`0,88×`** (vào `1,2 s` · ra `0,8 s`, ease-in-out) | Kích hoạt tại 3 đại cảnh: **Thành Cổ Nereketh**, **Thánh Đường Ống Vang (Đàn Ống)**, **Ngưỡng Tế Đàn**. Tự động hủy và trả về `1,00×` trong `0,5 s` nếu người chơi vào giao tranh. |

---

## Q17.8 — Cảm Giác Uống Bình & Vòng Lặp Mana

### 1. Uống Bình Huyết Tảo (`0,90 s` = `54 f` theo `04` Q4.6 + `6 f` recovery ≈ `1,0 s` cảm nhận)

| Pha | Khung hình | Hình ảnh (Diegetic) | Âm thanh | Trạng thái |
|---|---|---|---|---|
| **1. Mở nắp** | `0–15 f` (`0,25 s`) | Kors rút bình đỏ ngang ngực, bật nút bần (2 giọt đỏ văng lên). | Tiếng *bật* nút khô sắc (`1,4 kHz`). | Có thể hủy tự do bằng Dash; **chưa tiêu bình**. |
| **2. Xoáy nạp** | `15–48 f` (`0,55 s`) | 10 hạt tảo đỏ xoáy từ bình vào lồng ngực Kors; viền thân ửng đỏ ấm; camera zoom siêu nhẹ `1,03×`. | Tiếng nuốt + sủi bọt tăng cao độ từ `220 Hz → 520 Hz`. | Đứng yên (hoặc lơ lửng trong vùng bơi). Nếu bị đánh trúng ⇒ **HỦY, vỡ 12 bọt đỏ + âm hụt trầm `140 Hz`, KHÔNG mất bình** (`04` Q4.6). |
| **3. Bùng sáng hồi Vảy** | `48–54 f` (`0,10 s`) | Vòng sáng đỏ-vàng nở `r = 24 px` từ ngực Kors; các ô Vảy trên HUD lóe đầy nối tiếp nhau cách `3 f` (+3 Vảy, hoặc +4 với Huyết Tảo Đậm); camera trả `1,00×`. | Hợp âm ấm áp (`C5 + G5`), không lọc low-pass. | **Tiêu 1 bình tại `f48`**. `f54–60` (6 f) là hồi dáng có thể hủy sớm bằng Dash/Chém. |

### 2. Vòng lặp Mana (Súng Phép `33 / 66 / 99 → 165`)
- **Bình Mana HUD (`24×24 px`):** mặt chất lỏng Hải Quang bên trong **dao động sóng theo vận tốc ngang/dọc của Kors** (lò xo giảm chấn đơn giản: chạy dừng gấp ⇒ mực nước sóng sánh nhẹ).
- **Mỗi nhát chém trúng (`+11 Mana`):** 2 tia hạt lam mảnh bay từ điểm chém về thân Kors (không bay lên góc HUD để không kéo mắt rời trận đấu), làm bình Mana nháy sáng `2 f`.
- **Ngưỡng bắn `33 / 66 / 99` (1 / 2 / 3 phát):**
  - Ngay khi vượt mỗi mốc bội số `33`, **nòng súng trên tay/lưng Kors lóe sáng ngọc lam** (3 bậc độ sáng + kích thước vòng sáng tương ứng 1/2/3 phát) + phát 1 tiếng **`*ting*` thủy tinh không lọc** tăng nhẹ cao độ theo bậc (`1,6 kHz → 2,0 kHz → 2,4 kHz`, riêng đầy 100% thêm đuôi hòa âm `3,2 kHz` theo `11` Q11.1).

---

## Q17.9 — Nghi Lễ Boss Intro, Chuyển Pha & Khóa Đấu Trường

### 1. Boss Intro & Khóa Đấu Trường
1. **Bước qua ngưỡng đấu trường:** lưới áp suất / hàng rào san hô trồi lên khóa kín lối vào trong **`0,35 s`** (`21 f`) kèm tiếng đóng sập nặng (`110 Hz`, trauma `+0,20`).
2. **Mở màn lần đầu (`1,80 s`):** camera kéo lệch `35%` về phía boss; boss thực hiện động tác đặc trưng + tiếng gầm (nhạc chiến đấu stem Pha 1 bùng vào ở `0,3 s`).
3. **Title Card tối giản (`1,80 s`):** chỉ gồm **Tên Boss (font serif sắc)** + **1 dòng danh hiệu nhỏ** đặt ở **góc dưới-trái (hoặc giữa-dưới phía trên thanh máu boss)**, **không nền hộp, không làm tối màn hình, không che dáng boss** (học *Hollow Knight* & *Nine Sols*).
4. **Luật thử lại (từ lần thử thứ 2, khớp `06` Q6.1):** bỏ hoàn toàn đoạn intro `1,8 s`; khóa cổng `0,25 s`, thanh máu boss trượt lên ngay, vào đánh tức thì.

### 2. Nghi Lễ Chuyển Pha (Pha 1 → 2 / Pha 2 → 3)
- Nằm gọn trong **khựng chuyển pha `1,50 s`** đã chốt ở `06` Q6.1:
  - **`0,00–0,20 s`:** Boss lùi/gồng, bất tử (`invulnerable`), lóe vòng sáng nứt giáp.
  - **`0,20–1,20 s` (`1,00 s` Invulnerable Roar):** Boss gầm lớn + phát **1 vòng shockwave đẩy nhẹ Kors ra `2 ô` (gây `0` sát thương)** để đảm bảo khoảng cách an toàn không bao giờ bị kẹt sát thân boss; trauma `+0,42` (kéo dài theo tiếng gầm).
  - **`1,20–1,50 s`:** Đổi stem nhạc sang Pha 2/3 (thêm bộ gõ trầm / hợp xướng), thay đổi ánh sáng môi trường nhẹ theo pha (vd: B3 chuyển bơi 360°, B4 chớp ống phun nhiệt), mở lại sát thương.

---

## Q17.10 — Nghi Lễ Chuông Lặn (Kích Hoạt · Nghỉ · Rèn/Mua · Dịch Chuyển)

| Tương tác | Thời lượng | Diễn biến Hình & Âm |
|---|---|---|
| **1. Kích hoạt lần đầu** | `1,60 s` | Kors kéo dây chuông → tiếng **ngân đồng trầm `146 Hz` (D3)** vang xa; **1 vòng sóng ánh sáng vàng-đồng** mở rộng bán kính `18 ô` từ chuông, **xua tan bóng tối/sương mù** quanh khu vực; đèn chuông sáng cố định + tự động mở điểm lưu trên Bản đồ. |
| **2. Nghỉ tại Chuông** | `1,10 s` | Kors ngồi tựa thành chuông (không màn hình đen). **Chuỗi sáng nối tiếp:** Vảy đầy lần lượt từng ô cách nhau `3 f` (tiếng *tinh* tăng dần) → Bình Huyết Tảo đầy với tiếng rót sủi `0,25 s` → Mana đầy 100% lóe lam → lưu game tự động (1 vòng xoay biểu tượng mỏ neo nhỏ góc dưới-phải `0,6 s`). |
| **3. Rèn / Mua (Boyle · Marlow · Ossa · Bàn Đúc)** | Tức thì (`0,25 s` mở) | Camera lùi nhẹ + đẩy Kors và NPC sang trái màn hình `30%`, nhường `55%` bên phải cho danh sách món hàng tối giản không khung nặng. Khi **rèn kiếm tại Marlow / Bàn Đúc**: `1` nhát búa đập sáng tóe lửa (`0,45 s`) + tiếng *keng* thép vang rền. |
| **4. Dịch chuyển (Fast Travel qua Dòng Áp Suất)** | **`1,40 s`** | Chọn Chuông đích trên Bản đồ → `0,45 s` luồng bọt áp suất xoáy cuốn Kors lên dọc theo dây cáp (nhạc giảm mượt) → `0,30 s` màn chuyển xanh thẫm dòng chảy → `0,65 s` đáp xuống Chuông đích kèm vòng bọt nở + tiếng ngân đồng ngắn, điều khiển mở lại ở `1,25 s`. |

---

## Q17.11 — Bầu Không Khí, Ánh Sáng Theo Tầng & Tương Phản Quiet Room

### 1. Sức sống nền (Ambient Breathing & Parallax)
- **Ánh sáng tự thở:** mọi nguồn sáng Hải Quang, đèn chuông và vầng sáng quanh Kors dao động độ sáng **`±6%`** theo sóng sin chu kỳ **`3,0 s`** (không bao giờ đứng chết như đèn LED).
- **Bụi phù du / Tuyết biển (3 lớp Parallax):**
  - Lớp xa (`0,3×` tốc độ camera): độ đục `15%`, kích thước `1×1 px`, rơi chậm `6 px/s`.
  - Lớp giữa (`0,6×`): độ đục `20%`, trôi chéo theo dòng nước vùng.
  - Lớp gần (`1,2×`, tiền cảnh): độ đục `18%`, tự mờ thêm `50%` khi Kors đang trong giao tranh (`11` Q11.5) và **cấm đốm sáng trắng 1–2 px** để không bao giờ nhầm với đạn.

### 2. Ánh sáng & Áp suất theo Tầng
- **Viền áp suất cảnh báo (chưa có Ấn #3 Thân Mình gần Rãnh Hóa Thạch):** khi Kors tiến vào vùng áp suất cao vượt giới hạn chịu đựng của F0–F2, mép màn hình xuất hiện **viền nứt thủy tinh + sẫm xanh đen co vào `18 px`**, âm thân tàu/vỏ kêu *răng rắc* `90 Hz`, tốc độ đi chậm nhẹ `−15%` để truyền cảm giác "cơ thể chưa đủ sức xuống sâu hơn" mà không cần bảng chữ báo lỗi.
- **Tầng IV (Rãnh Hóa Thạch):** vầng sáng mặc định `2,5 m` (`4,0 m` khi bật Abyss Visibility Boost ở `15` Q15.4), tắt hoàn toàn giai điệu nhạc (Strategic Silence).

### 3. Tương phản Quiet Room (Đại Sảnh Hé Lộ · Sảnh Tranh Tường · Núi Kho Báu · Ngưỡng Tế Đàn)
- Bước vào trigger Quiet Room:
  1. HUD ẩn sạch về **`0%`** trong `0,8 s` (`14` Q14.2).
  2. Toàn bộ âm thanh quái/nguy hiểm từ phòng trước cắt mượt (`0,6 s`), chỉ giữ lớp reverb không gian rộng + giai điệu piano/harp tối giản.
  3. Nhiệt độ màu ánh sáng chuyển ấm hơn (`+12%` sắc vàng hổ phách / lam ngọc trong trẻo tùy phòng) và camera tự kích hoạt Landmark Zoom-Out `0,88×` (nếu là đại cảnh).

---

## Q17.12 — Luồng Menu, Tạm Dừng, Bản Đồ Nhanh & Ngân Sách Triển Khai

### 1. Tạm dừng (Pause) & Giao diện Diegetic
- **Bấm Pause (`Esc` / `Start`):**
  - Hình ảnh: nền game tối đi `alpha 0,45` + blur nhẹ `2 px` trong `0,12 s`; các hạt tuyết biển đóng băng.
  - Âm thanh: World Bus + Music Bus quét **bộ lọc thông thấp (low-pass) xuống `600 Hz`** (`Q = 0,8`, giảm `−8 dB`) trong **`0,15 s`** (`9 f`) — tạo cảm giác đáy biển "nín thở"; UI Bus giữ khô `20 kHz` để tiếng di chuyển mục chọn (*tách* thủy tinh nhỏ) luôn sắc nét.
- **Quick Map (`Tab` / `LB` giữ, `15` Q15.3):** mở tức thì (`0,08 s`), bán trong suốt `65%`, **không áp low-pass và không dừng di chuyển** để nhịp khám phá không bị đứt đoạn.
- **Shop / Rèn / Túi vật liệu:** bố cục 2 cột không viền hộp dày, chỉ dùng đường kẻ mảnh `1 px` màu đồng mờ; mỗi vật liệu luôn hiển thị `x / tổng` + tên công dụng ngay cạnh (`09` Q9.1).

### 2. Bảng Ngân Sách Frame & Ưu Tiên Triển Khai (P0 Vertical Slice vs P1 Polish)

> Mục tiêu cho quy mô phát triển tinh gọn: mọi yếu tố **P0** quyết định trực tiếp cảm giác tay (core feel) phải có ngay ở **Vertical Slice (Greybox + Tầng I + B1)**; nhóm **P1** nâng tầm trình diễn làm ở giai đoạn **Polish / Content Complete**.

| Hạng mục | Tính năng cốt lõi | Ngân sách thời gian / Frame | Ưu tiên |
|---|---|---|---|
| **Q17.1** | Hitstop phân bậc (3/5/8/6/12 f), Flash trắng 2–4 f, `trauma²` Perlin + Directional Kick, Cung chém cơ bản | `1–12 f` / đòn | **P0 (Vertical Slice)** |
| **Q17.1** | Silhouette inversion 1 f (Neo Bổ / Clash), Bọt xâm thực tiếp tuyến, Rung mục tiêu 30 Hz trong hitstop | `1–5 f` | **P1 (Polish)** |
| **Q17.2** | Hitstop trúng đòn (8/12/18 f), I-frame nhấp nháy `5 f`, Chuỗi chết `1,40 s` + Zero-Loss hồi sinh | `84 f` (`1,40 s`) | **P0 (Vertical Slice)** |
| **Q17.2** | Vignette Last Stand 70 bpm + nhịp tim `55–75 Hz` + vảy rạn trên sprite | Liên tục khi còn 1 Vảy | **P1 (Polish)** |
| **Q17.3** | Chết quái thường (văng xác + bọt + mờ `0,6 s`), Boss Death Throe `3,5 s` + xóa đạn thừa + Cổ Vật trồi ra | `36 f` / `210–270 f` | **P0 (Vertical Slice)** |
| **Q17.3** | 4 bộ hạt chất liệu riêng (dầu/xương/muối/điện), Mini-Boss slow-mo `0,25×`, mảnh vỏ Permanence `10 s` | `36–81 f` | **P1 (Polish)** |
| **Q17.4** | Rơi tiền parabol + nam châm `3 ô`, Toast vật liệu `1,5 s`, Nghi lễ Hóa Hình Cấp 5 (`4,8 s`) | `0–288 f` | **P0 (Vertical Slice)** |
| **Q17.4** | Pentatonic pitch climb 8 bậc, Mini-pause Cấp 3 (`0,35 s`), Thẻ Cấp 4 zoom `1,15×` | `21–30 f` | **P1 (Polish)** |
| **Q17.5** | Test-Chamber Lock sau mỗi năng lực, Prompt world-space 1 lần tự hủy, Affordance Vòng Móc Neo `7 ô` & Cửa tắt pan `1,2 s` | `12–72 f` | **P0 (Vertical Slice)** |
| **Q17.5** | Affordance nhỏ giọt trần dầu, đường ống sáng dẫn từ công tắc tới cửa | Liên tục | **P1 (Polish)** |
| **Q17.6** | Squash & Stretch (nhảy `0,85×1,18`, đáp `1,18×0,82`), 3 tàn ảnh Dash cyan, Đáp nặng `> 6 ô` | `2–13 f` | **P0 (Vertical Slice)** |
| **Q17.6** | Bước chân 5 chất liệu × 8 biến thể, Lọc âm chuyển bơi 360° `0,15 s`, Bọt ma sát tường | `4–9 f` | **P1 (Polish)** |
| **Q17.7** | Look-Ahead `2,5 ô`, Vertical Deadzone `±2,5 ô`, Landing Snap, Chuyển phòng `0,18 s` + `0,25 s` chống spawn-kill | `11–15 f` | **P0 (Vertical Slice)** |
| **Q17.7** | Landmark Zoom-Out `0,88×` tại 3 đại cảnh, Soi nhìn lên/xuống `4 ô` | `48–72 f` | **P1 (Polish)** |
| **Q17.8** | Uống bình `0,90 s` (mở nắp → xoáy → bùng sáng, ngắt không mất bình), Lóe nòng súng + `*ting*` ở 33/66/99 | `54 f` | **P0 (Vertical Slice)** |
| **Q17.8** | Chất lỏng bình Mana dao động lò xo theo vận tốc | Liên tục | **P1 (Polish)** |
| **Q17.9** | Khóa cổng đấu trường `0,35 s`, Title Card tối giản `1,8 s` (bỏ từ lần 2), Chuyển pha Roar `1,0 s` + shockwave đẩy 0 sát thương | `21–108 f` | **P0 (Vertical Slice)** |
| **Q17.10** | Chuông Lặn kích hoạt + nghỉ đầy Vảy/Bình/Mana + lưu tự động | `66–96 f` | **P0 (Vertical Slice)** |
| **Q17.10** | Dịch chuyển dòng áp suất `1,40 s`, Hoạt ảnh đập búa rèn kiếm `0,45 s` | `27–84 f` | **P1 (Polish)** |
| **Q17.11** | Ánh sáng tự thở `±6%`, 3 lớp tuyết biển parallax, Quiet Room HUD `0%`, Viền áp suất Rãnh | Liên tục | **P1 (Polish)** |
| **Q17.12** | Pause mờ nền + Low-Pass `600 Hz` (`0,15 s`), Quick Map bán trong suốt `65%` | `5–9 f` | **P0 (Vertical Slice)** |
