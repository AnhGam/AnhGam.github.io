# 18 — Kiểm Toán Phím `S` (PC), Kiến Trúc Nhạc–SFX Toàn Game & VFX Tương Tác Bản Đồ

> Phụ thuộc vào: `01`, `02`, `04`, `05`, `06`, `07`, `08a/b`, `11`, `14`, `15`, `16`, `17`, `_research/R14`.
> Bị phụ thuộc bởi: Vertical Slice (Tầng I), hệ thống Audio Bus, Tilemap Surface Tagging, và 10 Họ Cổng (`16` P1).

---

## Q18.1 — Kiểm toán phím `S` & bố cục PC `AD + Space + J K L`

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Giữ `AD + Space + J K L` làm bố cục PC mặc định và dùng `S` để ngồi xuống có gây xung đột ngón tay hoặc nhầm động tác với Pogo, Dậm Nặng, Xuyên sàn mỏng, Nhìn xuống và Bơi 360° không? |
| **Phương án** | (A) `W` nhảy + `S` ngồi; (B) `Space` nhảy + `S` ngồi + `J/K/L` tay phải (Thuần phím chuẩn); (C) Chỉ dùng `WASD + Chuột` |
| **Chọn** | **Phương án (B) làm Preset 1 mặc định (`AD + Space + J K L`),** giữ `W` **không phải nút Nhảy** (chỉ nhìn lên / chém lên / bơi lên / tương tác), và hỗ trợ Preset 2 (`WASD + Chuột`) trong Remap. |
| **Vì sao** | Ngón giữa trái (`S`) độc lập hoàn toàn với ngón cái trái (`Space`) và 3 ngón tay phải (`J/K/L`). Mọi tổ hợp của `S` đều bấm trơn tru 100% không bao giờ kẹt ngón (`R14` §1). |
| **Bằng chứng** | Cộng đồng *Hollow Knight*, *Dead Cells*, *Nine Sols* trên PC xác nhận lỗi kẹt ngón khi gộp `W = Nhảy` (không bấm được `S + Nhảy` xuyên sàn) hoặc đặt Dash ở `E` (đụng ngón giữa đang giữ `S` khi Pogo) (`R14` §1). |
| **Lore** | Tư thế cúi rạp / ghì chân của Kors thuận theo Áp Lực Chì, dùng chính trọng lượng cơ thể để bò qua khoang tàu vỡ hoặc cắm chân chống dòng. |
| **Cảm giác** | Bấm `S` phản hồi tức thì ở khung 1 (nén hitbox `14×36 → 14×24 px`), thả `S` bật dậy mượt (chỉ đứng dậy khi trần phía trên đủ `36 px` — tự giữ cúi nếu còn trong khe bò). |
| **Rủi ro & cách đo** | Nguy cơ bấm nhầm `S + Space` xuyên sàn khi chỉ muốn nhảy bình thường. Đo trong Greybox: yêu cầu giữ `S` tối thiểu `2 f` trước hoặc đồng thời `Space`, chỉ xuyên trên sàn mỏng (`one-way`), không ảnh hưởng sàn đặc. |

### Bảng phân tách trạng thái phím `S` (0% xung đột)

| Ngữ cảnh | Thao tác | Hành động xảy ra | Quy tắc chống nhầm |
|---|---|---|---|
| **Đứng trên sàn đặc** | Giữ `S` | Ngồi xuống (`14×24 px`) | Vẫn bấm `J` chém ngang thấp được |
| **Đứng trên sàn đặc** | Giữ `S` + `A/D` | Bò chậm (`55%` tốc đi) qua khe 2 ô | Tự giữ cúi nếu trần `< 36 px` |
| **Đứng yên trên sàn** | Giữ `S` yên **`> 0,45 s`** | Camera kéo nhìn xuống **`+5 ô`** (`01` Q1.4) | Hủy ngay khi bấm `A/D` hoặc thả `S` |
| **Đứng trên sàn mỏng** | `S + Space` | Xuyên thẳng xuống tầng dưới | Không bật nhảy lên; có bụi rơi nhẹ |
| **Trong dòng chảy (F1+)** | Giữ `S` | **Neo Chân** (chống trôi, vẫn chém `J` được) | Dùng chung với tư thế ghì thấp |
| **Đang trên không** | `S + J` | **Chém Pogo** xuống dưới | Đập trúng địch/gai/vỏ cứng → bật lên |
| **Đang trên không (F1+)** | `S + K` | **Dậm Nặng** lao thẳng xuống | Tách hẳn khỏi `S + J` (`16` P0) |
| **Trong vùng bơi 360°** | Giữ `S` | Lặn thẳng xuống (8 hướng với `W/A/S/D`) | Tắt cúi & Dậm Nặng trong vùng bơi |

### Bảng nút PC Preset 1 (mặc định — 100% có thể Remap)
- **Tay trái (Di chuyển & Phụ trợ):** `A / D` đi · `W` nhìn lên / chém lên / tương tác · `S` ngồi / bò / nhìn xuống / Pogo / Dậm · `Space` Nhảy · `Tab` Giữ = Quick Map (Bấm trong map = Ảnh Ký Ức).
- **Tay phải (Chiến đấu & Kỹ năng):** `J` Chém Cutlass · `K` Dash · `L` Bắn Súng Phép · `U` (hoặc `Q`) Bình Huyết Tảo · `I` (hoặc `F`) Móc Neo / Kỹ năng đặc biệt.

---

## Q18.2 — Kiến trúc Nhạc nền & Ambience cho 8 Khu vực

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Thiết kế nhạc nền và ambience cho 8 khu vực thế nào để đi qua lại hàng trăm phòng không bị lặp chói tai, chuyển vùng mượt mà và thể hiện rõ độ sâu đại dương? |
| **Phương án** | (A) Mỗi khu 1 bài nhạc cố định phát liên tục; (B) Nhạc + Ambience tách lớp, khóa âm đồng bộ giữa các khu liền kề, càng sâu càng thưa nhạc |
| **Chọn** | **Phương án (B):** 4 lớp âm thanh (`Ambience Nền`, `Sự kiện Không gian`, `Nhạc Khám phá`, `Nhạc Boss/Sự kiện`), giữ các khu liền kề cùng hệ khóa âm (**D minor / A minor / G minor**) để crossfade `1,2 s` luôn êm, và **giảm mật độ nhạc theo độ sâu** (`80%` ở Tầng I → `35%` ở Tầng IV–V). |
| **Vì sao** | Tránh "mệt tai" (*Hollow Knight*), chuyển khu không chói (*Ori* — Gareth Coker), tạo áp lực đáy sâu (*Subnautica* — càng sâu càng nhiều khoảng lặng). |
| **Bằng chứng** | Gareth Coker (*Ori*, BAFTA Masterclass): giữ vùng liền kề cùng khóa + dùng SFX che chuyển nhạc (`R14` §2); Christopher Larkin (*Hollow Knight*): tối giản khi khám phá, chỉ bung dàn nhạc ở Boss (`R14` §2); *Subnautica*: khoảng lặng đáy sâu (`R14` §2). |
| **Lore** | Càng xuống sâu, Áp Lực Chì càng bóp nghẹt sóng âm cao — chỉ còn trầm áp suất, tiếng kim loại rên và nhạc cụ cổ của Thal-Vael. |
| **Cảm giác** | Vừa bước qua ranh giới khu mới là tai nhận ra ngay tầng độ sâu trước cả khi mắt đọc tên vùng. |
| **Rủi ro & cách đo** | Crossfade bị "lộ" khi chạy qua lại liên tục ở cửa phòng. Giải pháp: gắn **cooldown chuyển nhạc `4,0 s`** tại cửa nối 2 khu + dùng SFX luồng nước/cổng để che mối nối. |

### Bản đồ Nhạc & Ambience 8 Khu vực (nhạc cụ "keo dán" toàn game: **Cello trầm xử lý nước + Chuông đồng vọng**)

| # | Khu vực (Độ sâu) | Khóa âm · BPM | Nhạc cụ đặc trưng | Ambience Nền (Loop) | Sự kiện Không gian (Ngẫu nhiên 12–25 s) | Mật độ nhạc |
|---|---|---|---|---|---|---|
| **1** | **Nghĩa Địa Tàu Đắm** (0–250 m) | **D minor** · 76 | Accordion rỉ + Guitar dây thép mộc | Sóng bề mặt xa, gỗ tàu kẽo kẹt | Dây xích neo va vào vỏ sắt, bọt khí nổi | 75% |
| **2** | **Hang Tảo Huyết** (200–450 m) | **D minor** · 82 | Sáo gỗ trầm + Đàn hạc (Harp) | Nước chảy qua rừng tảo, tiếng rì rào lá | Bào tử vỡ tách nhẹ, tiếng gọi cá nhỏ xa | 70% |
| **3** | **Đầm Muối Trắng** (400–650 m) | **A minor** · 68 | Marimba thủy tinh + Chuông gió muối | Gió ngầm qua cột muối, nước đặc sánh | Tinh thể muối nứt rắc, giọt muối rơi *tõm* | 65% |
| **4** | **Trạm Lặn Bỏ Hoang** (550–850 m) | **A minor** · 88 | Nhịp máy bơm kim loại + Cello kéo ngắn | Ù máy phát cũ `60 Hz`, áp suất ống | Van hơi xì bất chợt, bóng đèn nhấp nháy *tè* | 60% |
| **5** | **Ống Vang Thal-Vael** (1.100–1.480 m) | **G minor** · 72 | Đàn ống đại dương (Pipe Organ) + Giọng ngân không lời | Cộng hưởng hang đá lớn (reverb dài `3,2 s`) | Một nốt ống trầm tự vang xa như tiếng cá voi | 70% |
| **6** | **Rãnh Áp Suất** (900–1.500 m) | **D minor** · 60 | Sub-bass `45–65 Hz` + Cello kéo rít (sul ponticello) | Tiếng ép vỏ đá cực trầm, im lặng nặng | Đá nứt tầng sâu, tiếng thở khổng lồ ngoài màn hình | **35%** |
| **7** | **Khe Nhiệt Đáy** (1.400–1.800 m) | **G minor** · 96 | Bộ gõ đá núi lửa + Đồng thau gầm nhẹ | Nước sôi sùng sục, cột phun nhiệt rít | Đợt phun hơi xa làm rung nhẹ sub-bass | 65% |
| **8** | **Tế Đàn Ngầm** (1.800–2.100 m) | **D minor** · 64 | Hợp xướng trầm + Chuông đồng lớn + Đàn ống | Im lặng thánh đường, tiếng Hải Quang ngân `180 Hz` | Tiếng vỡ tinh thể xa, nhịp tim đại dương | 50% → 100% ở B5 |

> **Quy tắc Quiet Room (`17` Q17.11) & Chuông Lặn:** Khi bước vào phòng Chuông Lặn (vùng an toàn), nhạc khu giảm còn `-9 dB` + lọc `Low-pass 1.200 Hz`, chỉ giữ lại lớp nhạc cụ đơn giản nhất (tiếng dây/piano) tạo cảm giác "thở phào" tức thì.

---

## Q18.3 — Danh mục SFX Người chơi (Foley, Di chuyển, Chiến đấu & Hóa Hình)

> **Quy tắc chống nhàm (Power Up Audio / *Celeste*, `R14` §3):** Mọi SFX lặp (bước chân, chém, đạn) phải có **4–6 biến thể mẫu**, random pitch `±4%`, random gain `±1,5 dB`. Bước chân & foley nằm ở **`-14 dBFS`**, Combat ở **`-5 dBFS`**, Clash & Kết liễu ở **`-2 dBFS`**.

| Nhóm | Sự kiện | Thiết kế âm thanh (Lớp âm) | Ghi chú kỹ thuật |
|---|---|---|---|
| **Bước chân (4 mặt sàn)** | Thép tàu / Gỗ & San hô / Xương & Đá / Bùn muối | 1 lớp chạm bề mặt (kim loại cộc / gỗ rỗng / đá giòn / bùn nhóp) + 1 lớp nước khẽ đẩy (`300 Hz`) | Gắn `surface_id` trực tiếp trên tilemap (`R14` §3) |
| **Nhảy & Đáp** | Nhảy thường / Đáp thường / Đáp nặng (`> 6 ô`) / Đạp tường | Nhảy: luồng nước xoáy lên; Đáp nặng: **thịch trầm `80 Hz` + bọt nổ**; Đạp tường: cào móng/giày + nước tách | Đáp nặng khớp Squash `1,26×0,74` (`17` Q17.6) |
| **Cúi & Xuyên sàn** | `S` cúi / Bò / `S + Space` xuyên sàn | Cúi: áo lặn nén khí nhẹ; Xuyên sàn: tiếng gỗ/lưới rẽ nước | Nhẹ (`-16 dBFS`), không gây ồn khi bấm nhanh |
| **Dash & Bơi** | Quẫy Vây (F0) / Dash Áp Suất (F1) / Mạch Lướt (F3) / Dậm Nặng (`S+K`) | F0: quẫy nước đục; F1: **xé màng áp suất *vút-bụp*** (báo hiệu có i-frame); Dậm Nặng: rít rơi + **sóng xung kích nổ đáy** | Khác biệt rõ giữa F0 (không i-frame) và F1 (có i-frame) |
| **Kiếm & Combo** | Nhát 1–2 / Nhát 3 / Nhát 4 Neo Bổ (F2) / Pogo (`S+J`) | Nhát 1–2: vút lưỡi ngắn; Nhát 3: rộng hơn + đuôi nước; Neo Bổ: **gầm nặng như bổ mỏ neo**; Pogo: tiếng *keng* cao bật lên | Neo Bổ ghép đảo sắc 1 khung (`17` Q17.1) |
| **Clash Parry** | Chém trúng đòn viền bạc | **Tiếng thép va nhau sắc lẹm (`2,8 kHz`) + đuôi ngân đồng `0,4 s`** + hít ngược ngắn trong `5 f` hitstop | Tách tần số hoàn toàn với tiếng trúng máu |
| **Súng Phép** | Bắn / Đạn trúng / Hết Mana / **Đủ 33·66·99 Mana** | Bắn: nổ nén nhiệt trầm + tiếng xèo nước sôi; Hết Mana: *tạch* cò rỗng; **Đủ 1 viên: tiếng *tinh* thủy tinh cao dần theo 3 nấc** | Khớp tín hiệu nòng súng sáng (`14`, `17` Q17.8) |
| **Bình Huyết Tảo** | Bắt đầu uống / Đầy máu / Bị ngắt giữa chừng | Uống: tiếng nút bật + dòng tảo chảy `0,9 s`; Hoàn tất: hòa âm ấm áp; **Bị đánh ngắt: tiếng thủy tinh vỡ tan** (`17` Q17.8) | Người chơi nghe biết ngay mình đã hồi kịp chưa |
| **Trúng đòn & 1 Vảy** | Mất 1 Vảy / Mất 2 Vảy / Còn 1 Vảy / Chết | Trúng đòn: vảy nứt *rắc* + nước ép tai; **Còn 1 Vảy: nhịp tim trầm `55–75 Hz` ở `70 bpm`** (không tiếng bíp, `17` Q17.2) | Combat Bus giữ khô, chỉ lọc Ambience |

---

## Q18.4 — SFX Quái (4 Chất liệu), Boss B1–B5, Boss Cuối & Endgame

### 1. Quái thường: 4 chất liệu trúng đòn & chết (`17` Q17.3)
| Chất liệu (Áp dụng cho 24 loài) | Tiếng trúng đòn (Hit) | Tiếng chết (Death) |
|---|---|---|
| **Dầu nhớt / Mô mềm** (Đỉa Dầu, Sứa, Cá Đèn...) | Bụp ướt trầm (`150 Hz`) + xịt dịch | Bong bóng dầu vỡ bung + rít xì khí |
| **Xương / Vỏ giáp** (Cua, Cá Mòi Xương, Nhện Xương...) | Cộp giòn (`900 Hz` + `2,5 kHz`) | Vỏ rạn 2 nhịp rồi rụng lạo xạo xuống đáy |
| **Muối tinh thể** (Rận Muối, Quái Đầm Muối) | Đập kính/đá muối *choang* (`3 kHz`) | Vỡ vụn thành mưa tinh thể leng keng |
| **Điện / Hải Quang** (Lươn Ống Khí, Chình Phù Ấn, Bóng Nước) | Giật tĩnh điện *tách* (`4 kHz`) + ù ngắn | Phóng điện đoản mạch rồi tắt lịm *vù* |

### 2. Nhạc & SFX đặc trưng cho 5 Boss chính (liên kết Leitmotif với khu vực — học *Hollow Knight*)

| Boss | Leitmotif & Nhạc cụ | Chuyển Pha (Phase Shift) | SFX Độc quyền (Nhận diện không cần nhìn) |
|---|---|---|---|
| **B1 — Cự Giải Khổng Lồ** | Phát triển từ *Nghĩa Địa Tàu Đắm* (D minor, 118 BPM): Accordion gắt + trống vỏ tàu rền | 50% HP: nhạc dừng `0,4 s` → tiếng **bản lề mai gãy rắc** + tiếng gầm rỗng trong vỏ thép → vào nhịp trống đôi | Tiếng càng kẹp *cạch-cạch* báo trước; tiếng giáp vỡ khi phá bản lề lưng |
| **B2 — Đốc Công Máy Lặn** | Từ *Trạm Lặn* (A minor, 126 BPM): Nhịp piston kim loại + kèn đồng trầm | 50% HP: còi báo động áp suất **2 hồi trầm** → tăng thêm lớp dây kéo dồn dập | **Khóa chốt `40 f`**: tiếng chốt thép trượt *kịch-xì* rất rõ trước cú đấm `80 ms` |
| **B3 — Thợ Lặn Trưởng Ca** | Từ *Đầm Muối / Hang Tảo* (A minor, 132 BPM): Cello độc tấu đấu tay đôi (duel) | 50% HP: tiếng xích móc kéo căng → nhạc chuyển sang nhịp `6/8` dồn | Tiếng xích móc *xoảng* trước khi phóng; tiếng báo nhịp `1-bấm Dash` thoát tóm |
| **B4 — Thủy Quái Đèn Sâu** | Từ *Rãnh Áp Suất* (D minor, 108 BPM): Hợp xướng thì thầm + sub-bass rung | 50% HP: bóng đèn mồi tắt phụt `0,6 s` (Im lặng Chiến lược) → bật sáng lại kèm tiếng hút nước khổng lồ | Tiếng **hút nước rít ngược** trước đòn nuốt; tiếng vỡ đèn mồi khi phá bộ phận |
| **B5 — Thần Giữ Cổng Thal-Vael (Boss Cuối)** | **3 Pha nhạc tiến hóa liên tục** (D minor → D Phrygian → D major bi tráng ở pha cuối): Đàn ống đại dương + Hợp xướng đầy đủ + Cello chủ đề Kors | **Vào trận:** Tắt sạch nhạc khu → `1,2 s` áp suất `45 Hz` → 1 hợp âm Đàn Ống chấn động toàn màn hình.<br>**Pha 1→2:** Khóa Neo Nước nứt, hợp xướng vào.<br>**Pha 2→3 (Bơi 360°):** **Nhạc cụ của cả 4 khu trước hòa quyện lại** (Accordion, Harp, Marimba, Organ) báo hiệu Kors đã trọn vẹn 5 Hóa Hình. | Tiếng cộng hưởng Tế Đàn khi mở màn; tiếng Neo Nước vỡ; **Vũ đạo Chết `4,5 s`:** `12 f` đóng băng → xóa toàn bộ đạn bằng 1 tiếng sóng chuông lớn → 4 nhịp vỡ giáp → im lặng hoàn toàn trước khi Áp Lực Chì tan. |

### 3. Cảnh Đặc biệt: Endgame (Áp Lực Chì tan & 2 Kết cục)
- **Áp Lực Chì tan sau B5:** Tiếng *rắc* lan tỏa như lớp kính áp suất ngàn mét vỡ ngược lên mặt biển → toàn bộ bộ lọc `Low-pass` dưới nước **mở toang lên `20 kHz` trong `2,0 s`** (lần đầu tiên trong suốt 11 giờ chơi, âm thanh trong vắt không còn bị nước đè nén!).
- **Kết thường (Chưa trả nợ Boyle):** Đàn dây trầm + tiếng bọt nổi lên ánh sáng mặt biển (D minor kết mở).
- **Kết trọn vẹn (Đã trả đủ 500 Sv nợ Boyle):** Thêm giai điệu Accordion ấm áp của Boyle hòa cùng Cello Kors (chuyển sang **D major**), tiếng Chuông Lặn vang lên 1 tiếng kéo dài êm ái.

---

## Q18.5 — Bảng SFX + VFX cho 10 Họ Cổng Mở Khóa (`16` P1)

> Mọi cổng đều tuân thủ 3 pha: **Trạng thái chờ (Idle cue) → Kích hoạt mở (Unlock SFX + VFX `0,35–0,6 s`) → Trạng thái đã mở (Persistent visual)** để người chơi vừa nhìn đã hiểu cổng đã mở hay chưa (`R14` §4).

| # | Họ Cổng (Kỹ năng mở) | Trạng thái chờ (Idle VFX/SFX) | VFX khi mở khóa | SFX khi mở khóa |
|---|---|---|---|---|
| **1** | **Màng Áp Suất** (F3 Thân Mình) | Màng xanh tím phập phồng, đẩy ngược bọt khí | Lướt xuyên → màng **xé rách thành dải sáng lục lam** cuốn theo đuôi Dash | Tiếng căng màng *ù* rồi **xé rách *phựt*** + hòa âm nhẹ |
| **2** | **Vách Nứt / Cửa Hà Biển** (F2 Neo Bổ / Đạn Nhiệt) | Vết nứt hở tia sáng vàng/đỏ, bụi rơi lác đác | Rung `4 f` → **vỡ 12–18 mảnh đá/vỏ văng theo hướng đánh** + cột bọt đục | Tiếng đá/vỏ rạn *rắc* + **nổ sập trầm `90 Hz`** |
| **3** | **Vòng Móc Neo / Ròng Rọc** (F2 Móc Neo) | Vòng đồng đung đưa, lóe 1 chấm sáng đồng mỗi `2,5 s` | Dây xích căng thẳng → bánh răng xoay → cửa kéo lên kèm chuỗi bọt | Tiếng *keng* móc bám + **tiếng xích tời kéo *cạch-cạch-cạch*** |
| **4** | **Cửa Cộng Hưởng Âm** (Ống Vang / Skill Hải Quang) | 3 vòng tròn khắc đá phát sáng nhịp `60 bpm` | Sóng tròn đồng tâm lan ra từ tâm cửa, các mảnh đá trượt tách sang 2 bên | **Hợp âm 3 nốt Đàn Ống** khớp đúng khóa âm của khu |
| **5** | **Gờ / Ống Đạp Tường** (F1 Đôi Chân) | Bề mặt có rãnh xước san hô sáng màu dọc mép | Mỗi cú đạp bắn 5 hạt cát + 1 vòng sóng nước bám tường | Tiếng cào giòn + đẩy nước mạnh |
| **6** | **Hồ Muối Bật** (F1 Dậm Nặng `S+K`) | Mặt muối trắng sủi lăn tăn, phản chiếu mờ | Dậm xuống → **vòng sóng muối trắng bung ngang**, hất Kors vọt lên kèm vệt tinh thể | Tiếng *bùm* đặc sánh + tiếng tinh thể văng leng keng |
| **7** | **Cửa Chốt Tắt (Shortcut)** (Mở từ 1 phía) | Thanh chốt sắt sáng màu ở phía mở được | Chém/đẩy chốt → thanh sắt gãy văng → cánh cửa nặng bật mở để lại bản lề há | Tiếng **chốt sắt bật *cách*** + tiếng cửa thép kẽo kẹt mở + **stinger 2 nốt giải tỏa** |
| **8** | **Vách Bí Mật (Secret Wall)** (Chém phá) | Nứt siêu mảnh + dòng bọt nhỏ rỉ ra từ khe (khó nhưng công bằng) | Nhát 1–2: rụng bụi + rung nhẹ; Nhát 3: tan lớp mặt tiền, để lộ phòng ẩn tối sáng dần lên | Nhát 1–2: tiếng rỗng *bộp* khác tường đặc; Nhát 3: **stinger đàn hạc bí mật 3 nốt** (học *Hollow Knight* / *Zelda*) |
| **9** | **Bàn Đúc / Nâng Cấp Kiếm–Súng** (Marlow / Tế Đàn) | Lò nhiệt bập bùng tia lửa dưới nước | Búa đập 1 nhịp → **chùm tia lửa nhiệt trắng-vàng** → bóng vũ khí mới lóe sáng | Tiếng búa đe *keng* + tiếng tôi thép *xèo* dưới nước |
| **10** | **Chuông Lặn (Điểm lưu & Dịch chuyển)** | Vòm khí ấm sáng hổ phách, mặt nước dưới chân gợn | Lưu: **vòng sáng hổ phách lan khắp vòm `0,5 s`**, bình Huyết Tảo đầy sáng; Dịch chuyển: dây cáp kéo vọt kèm sọc tốc độ | **1 tiếng Chuông Đồng trầm ấm (`220 Hz`, ngân `2,8 s`)** + tiếng nạp bình *róc rách* |

---

## Q18.6 — SFX + VFX cho Khám phá Khu mới, Tương tác Bản đồ & Cảnh Đặc biệt

| Sự kiện | VFX (Hình ảnh & Chuyển cảnh) | SFX & Nhạc | Quy tắc chống làm phiền |
|---|---|---|---|
| **Đặt chân vào Khu vực mới (Lần đầu)** | 1. **Chuyển LUT màu nước + lớp sương + hạt trôi nổi** mượt trong `1,5 s`.<br>2. **Banner tên khu không khung** (chữ khắc đồng + 1 đường gạch mảnh + **số độ sâu cuộn** `240 m → 410 m`) hiện trên cao `3,0 s` rồi tan.<br>3. Không khóa điều khiển — người chơi vẫn chạy bình thường. | **Stinger 2,5 s** bằng đúng nhạc cụ đặc trưng của khu (Accordion / Sáo / Marimba / Organ…) nổi trên nền Ambience mới, sau `1,5 s` mới vào vòng nhạc chính. | **Chỉ phát 1 lần duy nhất** khi khám phá lần đầu. Những lần quay lại chỉ crossfade nhạc mượt + đổi màu nước. |
| **Chụp Ảnh Ký Ức (`15` Q15.3)** | Khung ngắm đồng lóe viền `0,20 s` → ảnh thu nhỏ `320×180` trượt bay gọn vào góc biểu tượng bản đồ. | Tiếng màn trập cơ khí *tách-xoạch* + tiếng ghi giấy mờ. | Không đóng băng combat (chỉ chụp khi mở bản đồ hoặc bấm nhanh ngoài giao tranh). |
| **Cột Phun Nhiệt (Thermal Vent)** | 3 trạng thái: `Nghỉ` (bọt nhỏ) → `Báo trước 0,8 s` (cột bọt trắng dày + rung đáy) → `Phun` (luồng cam-trắng đẩy mạnh lên cao). | `Báo trước`: tiếng sôi rít tăng dần (`400 → 1.400 Hz`); `Phun`: tiếng gầm luồng hơi mạnh. | Nghe và nhìn đều rõ trước `0,8 s` để căn nhảy. |
| **Dòng Chảy Ngầm & Túi Nước Lặng** | Dòng chảy: vệt đường dòng trắng mờ chạy nhanh đúng tốc độ đẩy. Túi nước lặng: vùng xoáy tròn êm, tảo đứng yên. | Dòng chảy: tiếng nước rít theo chiều gió (pan stereo trái/phải); vào Túi nước lặng: tiếng rít tắt đột ngột còn `-18 dB`. | Tai nghe biết ngay đã vào vùng an toàn để hồi Stamina. |
| **Mở khóa 1 trong 5 Cổ Vật (F0→F4)** | Nghi lễ `4,8–5,5 s` (`17` Q17.4): HUD mờ `0%`, zoom `1,25×`, vòng Hải Quang co rút vào thân Kors, bóng silhouette biến hình trực tiếp + sóng ánh sáng quét ra toàn phòng. | Nhạc dừng hoàn toàn → tiếng tụ áp suất tăng dần `1,8 s` → **1 tiếng nổ Hải Quang sâu** + hợp âm trưởng ấm + tiếng cơ thể mới đáp xuống đất. | Ngay sau đó nối thẳng vào **Test-Chamber Lock (`≤ 10 s`, `17` Q17.5)**. |

---

## Q18.7 — Ngân sách P0 cho Vertical Slice (Tầng I + Boss B1) — Làm gọn, không ngợp

Để dựng **bản sơ 10 phút đầu (Vertical Slice)** có cảm giác tiệm cận game thật mà không bị ngợp hàng trăm file, chỉ cần đúng **38 SFX P0** và **14 VFX P0**:

- **38 SFX P0 (đủ 100% cho 5 phòng Tầng I + B1):**
  - *Người chơi (16):* Bước chân (2 mặt: thép tàu + gỗ/đá, mỗi mặt 4 mẫu), nhảy, đáp thường, đáp nặng, cúi/xuyên sàn, Quẫy Vây (F0), Dash Áp Suất (F1), chém 1–2, chém 3, Pogo, Clash Parry, bắn súng, chuông đủ 33 Mana, uống bình, trúng đòn + tim 1 Vảy.
  - *Quái Tầng I & Boss B1 (12):* 2 chất liệu trúng/chết (vỏ giáp + mô mềm), 3 báo trước (Đỏ / Bạc / Lam), B1 gầm vào trận, B1 kẹp càng, B1 vỡ bản lề lưng, B1 chuyển pha, B1 vũ đạo chết 3 nhịp.
  - *Thế giới & UI (10):* Chuông Lặn (lưu), nhặt Sv (pitch leo thang), mở khóa F1 (nghi lễ), khám phá khu mới stinger (Nghĩa Địa Tàu Đắm), vỡ vách bí mật, mở chốt tắt, chuyển nút menu, pause low-pass, Ambience Tầng I (1 loop), Nhạc Tầng I + Nhạc B1 (2 loop).
- **14 VFX P0:**
  - 3 vệt chém + 1 tia Clash (+ đảo sắc 1f), đạn nhiệt + tia nổ, bụi đáp thường/nặng, vệt Dash F0 vs F1, máu/mảnh vỡ 2 chất liệu, vòng sóng chết B1 (xóa đạn), nghi lễ Cổ Vật F1, vòm lưu Chuông Lặn, banner tên khu Tầng I, lớp sương parallax + hạt phù sa trôi.

---

## Q18.8 — Rà soát tổng thể (Tự kiểm trước khi sang dựng Vertical Slice)

- **Đã khớp 100% với các file trước:** Không mâu thuẫn với `01` (nhìn xuống +5 ô), `02` (cúi `14×24 px`, Dậm Nặng `S+K`), `04` (Pogo `S+J`, Bình `54 f`), `14` (HUD `≤ 1,65%`), `15` (4 dải tần, Zero-Loss, Ảnh Ký Ức), `16` (10 họ cổng), `17` (Vũ đạo chết, Rơi đồ 5 cấp, Quiet Room).
- **Đã lấp 3 khoảng trống cuối cùng:** (1) Công thái học phím `S` trên PC `AD + Space + JKL`, (2) Bản đồ Nhạc + Ambience 8 khu + SFX toàn game (kể cả B5 & Endgame), (3) Bảng VFX + SFX cho 10 họ cổng & cơ chế tương tác bản đồ.
