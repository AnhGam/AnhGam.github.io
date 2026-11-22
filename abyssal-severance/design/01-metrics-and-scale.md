# 01 — Thước Đo & Tỉ Lệ (Metrics & Scale)

> Phụ thuộc vào: lore (hình hài Kors, Ấn Đôi Chân +40% chiều cao), `_research/R1`, `R8`.
> Bị phụ thuộc bởi: **mọi file khác**. Đổi số ở đây ⇒ rà lại 02, 03, 05, 08.

Ký hiệu: **H** = chiều cao hitbox hero; **ô** = 1 tile = 16 px; **f** = frame @60 fps; **màn** = khung nhìn camera.

---

## Q1.1 — Độ phân giải nội bộ (internal resolution)

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Hero ~48 px trên màn 480×270 ⇒ màn chỉ cao **5,6 H**; sau Ấn Đôi Chân (+40%) còn **4,0 H**. Như vậy có quá gần cho một Metroidvania nhiều platforming, dọc, khám phá không? |
| **Phương án** | (A) Giữ 480×270, giữ hero 48 px. (B) Giữ 480×270, thu hero còn ~32 px. (C) Đổi sang **640×360**, giữ chi tiết hero. (D) Zoom camera động. |
| **Chọn** | **(C) 640×360 nội bộ, tile 16 px, màn = 40 × 22,5 ô.** |
| **Vì sao** | 1) Tỉ lệ màn/hero của các game nhiều platforming đều xa hơn nhiều: Celeste 16,4 H, Hollow Knight 13 H, Silksong ~8 H, Dead Cells 7,2 H. Chỉ Blasphemous (~5 H) và Super Metroid (5,3 H) gần như vậy, mà cả hai đều thiên về cận chiến, ít nhảy dọc. Có câu trích từ r/gamedesign (qua notebook): "games with more platforming, more aerial maneuvering, and more verticality need to be zoomed out". 2) Với 640×360, hero dạng nén (36 px hitbox) ⇒ màn = **10 H**; sau Đôi Chân (50 px) ⇒ **7,2 H**. Cả hai nằm giữa Silksong và Dead Cells, đủ nhìn trước ≥ 3 ô mỗi phía khi nhảy. 3) (B) phá chi tiết sprite hero đã dựng (canvas 48×48 trong `pixel/hero.py`). (D) phá pixel-perfect, vì zoom không nguyên làm vỡ lưới pixel. 4) **Lợi ích phụ đo được:** 640×360 nhân nguyên ra 720p (×2), 1080p (×3), 1440p (×4), 4K (×6). 480×270 chỉ nguyên ở 1080p (×4); ở 1440p phải ×5,33, gây mờ hoặc viền đen. |
| **Bằng chứng** | `R1` §1, §8 (bảng tỉ lệ màn/H); `R8` §6.2 (pixel-perfect: scale nguyên). |
| **Lore** | Không đổi lore. Nền vẽ (painted bg) vẫn dùng được; chỉ thay khung pixel. |
| **Cảm giác** | Người chơi thấy được bậc tiếp theo và kẻ địch trước khi nhảy. Hero vẫn đủ to để đọc dáng khom/đứng thẳng qua từng Ấn Ký. |
| **Rủi ro & đo** | Các cảnh concept 480×270 hiện có (city*.py) cần render lại ở 640×360 cho khung game. Đây là cảnh concept, không phải asset cuối. Đo: chụp greybox 1 phòng, kiểm tra người chơi nhìn thấy mép bậc kế tiếp trong ≥ 90% cú nhảy (đo bằng replay). |

## Q1.2 — Kích thước hero qua từng hình hài

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Lore: hero lớn dần (Đôi Chân +40% chiều cao, Thân Mình nở vai). Hitbox đổi ⇒ mọi khe, cửa, trần đã thiết kế có thể hỏng. |
| **Phương án** | (A) Hitbox cố định, chỉ sprite lớn lên. (B) Hitbox lớn theo sprite, và **mọi kích thước kiến trúc thiết kế cho hình hài lớn nhất ngay từ đầu**. (C) Hitbox lớn theo sprite, cố ý làm "cổng ngược" (lớn rồi không chui được hang cũ). |
| **Chọn** | **(B).** Bảng dưới. |
| **Vì sao** | (A) làm sai va chạm thị giác: đầu hero xuyên trần, người chơi thấy "ăn gian". (C) có nguy cơ khóa đường (softlock) và biến việc lớn lên thành bị phạt. `R5` cảnh báo: nếu biến hình khiến di chuyển kém đi, người chơi cảm nhận đó là hình phạt chứ không phải tăng sức. (B) kèm luật "kiến trúc theo hình hài lớn nhất" giữ mọi khe hợp lệ suốt game. |
| **Bằng chứng** | `R1` §9 "khi hero lớn +40%"; Silksong vẽ thế giới theo Hornet cao 1,6× Knight (`R1` §0.6). |
| **Lore** | Đôi Chân: "chiều cao tăng 40%, hết khom gập". Thân Mình: vai nở, chiều cao gần như không đổi. Cái Đầu: thêm đầu người, cao +4 px. |

| Hình hài | Mốc | Sprite (cao) | **Hitbox va chạm** (rộng × cao) | **Hurtbox** (nhận sát thương) | Màn / H |
|---|---|---|---|---|---|
| F0 Hình Hài Bị Nén | Khởi đầu | ~44 px | **14 × 36** | 10 × 30 | 10,0 H |
| F1 Đôi Chân | Boss 1 | ~60 px | **16 × 50** | 11 × 42 | 7,2 H |
| F2 Đôi Tay | Boss 2 | ~60 px | 16 × 50 | 11 × 42 | 7,2 H |
| F3 Thân Mình | Boss 3 | ~62 px | 18 × 52 | 12 × 44 | 6,9 H |
| F4 Cái Đầu | Boss 4 | ~66 px | **18 × 56** | 12 × 48 | 6,4 H |

- **Hurtbox ≈ 70% hitbox rộng, 85% cao**, bỏ khăn, vây, kiếm. Lý do: Celeste dùng hurtbox 8×9 trên hitbox 8×11 (`R4`, `R1`). Ngành shmup giữ vùng chết nhỏ hơn hình vẽ để "trượt sát" thấy công bằng (`R4` §3). Con số 60–75% chiều rộng là ước lượng (`R8` §5), sẽ đo ở playtest.
- **Hitbox va chạm hẹp hơn sprite**, để vai không vướng mép khe 1 ô.

## Q1.3 — Kích thước kiến trúc chuẩn (bảng dựng map)

Mọi số tính cho **F4** (hitbox 18 × 56, tức 3,5 ô cao). Kiến trúc dựng đúng bảng này thì hợp lệ cho mọi hình hài.

| Thành phần | Kích thước | Lý do |
|---|---|---|
| Cửa đi (doorway) | **cao 5 ô (80 px), rộng ≥ 2 ô** | ≥ H + 8 px (R2 §3.1, nhãn [D]: đề xuất notebook, chưa đo). 56 + 24 = 80 để nhảy qua cửa không vấp đầu |
| Hành lang đi bộ (nhảy thoải mái) | **cao ≥ 12 ô (192 px)** | Đỉnh nhảy F1+ = 129 px tính ở chân (02, `_calc`) + hitbox 56 px = 185 px ⇒ cần ≥ 192 px để nhảy hết sức không cụng đầu |
| Hành lang **cố ý cấm nhảy cao** | 5–6 ô | Mẫu "trần thấp" ở 03: ép đi bộ / lướt, chặn né bằng nhảy |
| Hành lang thường | cao 12–14 ô | ≈ 3,5 H của F4 (R2 [D] gợi ý 2,5–3 H, ta cao hơn vì nhảy F1 cao 8 ô) |
| Khe bò (lối bí mật) | cao **2 ô (32 px)** | Thấp hơn hitbox đứng F0 (36 px) ⇒ hero tự bò dẹt (hitbox 24 px, 60 px/s, 02 Q2.11). Không phải cổng năng lực |
| Giếng đạp tường (chimney) | **rộng 4 ô (64 px)** | 1–1,5 H (R2 [D]); 64 px = 3,5 lần bề rộng hitbox ⇒ đủ chỗ xoay người, không quá rộng để hụt tường |
| Bục một chiều (one-way) | dày 4–6 px hiển thị, va chạm 1 px trên mặt | R2 #20 |
| Gờ an toàn đứng (safe ledge) | ≥ 3 ô rộng | Đứng chắc + quay người chém (tầm chém F1 = 2 ô, 04) |
| Sàn nghỉ giữa rhythm group | ≥ 4 ô | R2 §1.1 "rest platform" |

## Q1.4 — Camera

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Khung 640×360 cố định (không zoom), dùng nhìn trước (lookahead) bao nhiêu, vùng chết ra sao cho đi bộ đáy / bơi 360° / phòng boss. |
| **Chọn** | Bảng dưới (quy đổi từ `R8` §6.2, số gốc ở 480×270 × 1,333). **Nhãn trung thực:** cả bảng camera là **đề xuất của notebook 08.04 ([internal]), chưa có game nào đo**; chỉnh ở greybox. **Không zoom.** Phòng lớn hơn màn thì camera trượt; phòng boss thiết kế vừa **1 màn** (hoặc 1 × 1,5 / 1,5 × 1,5 kèm luật "boss chỉ ra đòn khi đang trong màn", 03 Q3.7) để thấy boss trọn vẹn. |
| **Vì sao** | Zoom không nguyên phá lưới pixel (Q1.1). Phòng boss vừa 1 màn ⇒ mọi đòn của boss nằm trong khung, tuân luật "không đánh từ ngoài màn hình" (`R4`: God of War cấm, Dead Island 2 giảm sát thương đòn ngoài tầm nhìn). |
| **Bằng chứng** | `R8` §6 (lookahead, vùng chết, half-life, khóa Y khi đứng đất kiểu Super Mario World / "Scroll Back" của Itay Keren). |

| Thông số | Đi bộ đáy | Bơi 360° | Phòng boss | Giếng dọc |
|---|---|---|---|---|
| Lookahead tối đa | **115 px theo X** (18% rộng) | 86 px bán kính | 50 px | xuống 93 px / lên 55 px |
| Vùng chết | 50 × 50 px | elip 23 × 13 px | 32 × 18 px | X khóa, Y 30 px |
| Vị trí hero theo Y | 36% từ đáy màn | giữa | khung phòng | lặn xuống: 30% từ trên |
| Half-life đuổi / lùi | 0,22 / 0,45 s | 0,25 / 0,55 s | 0,20 / 0,40 s | 0,22 / 0,50 s |
| Y khi đứng đất | chỉ căn lại khi đáp đất; rơi nhanh quá ngưỡng thì đi theo | tự do | theo biên phòng | — |

- Bơi 360°: chỉ lật lookahead khi người chơi bơi ngược hẳn > 120° trong 0,2 s. Lý do: chống lắc camera theo nhịp quẫy (`R8` §6.2).
- Chuyển chế độ (đáy ↔ bơi): trộn toàn bộ thông số camera trong 0,45 s.
- Nhìn lên/xuống: giữ ↑/↓ 0,35 s ⇒ dịch 130–160 px (đủ thấy đáy hố trước khi nhảy xuống, chống "nhảy mù" – R2 mẫu #7).
- Render 644 × 364 (dư 2 px mỗi cạnh) để rung màn hình không lộ mép đen (R8 §2.3).

## Q1.5 — Bảng thước nhanh cho người dựng map

| Đại lượng (F0 → F1+) | Giá trị | Nguồn tính |
|---|---|---|
| Đi bộ | 150 → 180 px/s (9,4 → 11,3 ô/s) | 02 Q2.1 |
| Nhảy cao tối đa | 81 → 129 px (5,1 → 8,1 ô) | 02 Q2.2 (`_calc/metrics.py`) |
| Nhảy xa tối đa (đang chạy) | 179 → 237 px (11,2 → 14,8 ô) | 02 Q2.2 |
| Dash | 64 px (4 ô) → 112 px (7 ô) | 02 Q2.3 |
| Đạp tường (F1+) | +6,15 ô mỗi cú (chỉ đạp khi vy ≤ 0); ~6 cú mỗi thanh stamina gốc | 02 Q2.4 |
| Móc neo (F2+) | tầm 10 ô | 02 Q2.5 |
| **Khe nhảy an toàn** | ≤ nhảy xa − 1 ô ⇒ **F0 ≤ 10, F1 ≤ 13** | R2 #1 |
| **Khe khóa bằng dash** | ≥ nhảy xa + 2 ô và ≤ nhảy xa + dash − 1 ô ⇒ **Quẫy Vây (F0) 14; Dash Áp Suất (F1) 17–20** | R2 §4.1 |
| **Gờ khóa bằng đạp tường** | ≥ nhảy cao + 1 ô ⇒ **≥ 10 ô** (F1 cao 8,1) | R2 §4.1 |

> Luật lề an toàn: mọi cổng khóa chênh ≥ 1 ô so với khả năng hiện có. Vì sao: khe "gần được" khiến người chơi tưởng mình thao tác kém, không nhận ra đó là cổng (R2 §2, R2 §4.1). Đây cũng là lỗi kinh điển "không biết bị chặn hay do mình dở" trong `DeepSeaMV-08`.

## Q1.6 — Engine: Unity hoặc Godot (đã chốt 2026-11-22)

| Ô | Nội dung |
|---|---|
| **Vấn đề** | 640×360 pixel-perfect + camera mượt có làm được trên cả hai engine không? |
| **Kết luận** | **Được, cả hai.** 640×360 nhân nguyên lên 1280×720 (×2), 1920×1080 (×3), 2560×1440 (×4), 3840×2160 (×6) nên màn 16:9 phổ biến không cần viền đen. Màn tỉ lệ khác: viền đen (giữ pixel-perfect) hoặc kéo giãn (mất pixel-perfect). Ta chọn **viền đen** (01 Q1.1). |
| **Godot 4.2+** | Stretch Mode = `viewport`, Aspect = `keep`, Scale Mode = `integer`, lọc texture = Nearest. Camera mượt: render game trong **SubViewport 640×360** (camera thấp đi theo pixel nguyên), phóng ×3 trong SubViewportContainer; camera thứ hai dịch phần lẻ dưới pixel (cách notkey.studio, thảo luận godot-proposals #9256). Chữ UI vẽ ở lớp phân giải cao để không mờ. |
| **Unity (URP)** | **Pixel Perfect Camera**: Reference Resolution 640×360, Grid Snapping = **Upscale Render Texture**, Crop Frame = **Letterbox / Pillarbox / Windowbox**. Không dùng Stretch Fill vì tài liệu Unity ghi nó làm "bad pixel placement". Camera mượt dưới pixel cần dịch quad cuối như mô tả ở `R8` §6.2. |
| **Khuyến nghị** | Hai engine ngang nhau cho phần hình. Chọn theo kinh nghiệm code của người làm; tài liệu này **không phụ thuộc engine** (mọi số theo px / ô / frame 60 fps). |
| **Nguồn** | Godot: notkey.studio (pixel-perfect low-res + smooth camera), github.com/godotengine/godot-proposals/discussions/9256. Unity: Unity Manual "Pixel Perfect Camera component reference for URP" (docs.unity3d.com 6000.x). |
