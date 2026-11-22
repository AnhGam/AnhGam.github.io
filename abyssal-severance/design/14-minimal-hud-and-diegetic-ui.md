# 14 — HUD Tối Giản (Gần Như Không UI) & Tín Hiệu Trong Thế Giới

> Phụ thuộc vào: `01` (640×360 pixel-perfect), `02` (stamina khám phá), `04` (Vảy, Mana, Bình, Clash), `05` (3 màu báo trước), `06` (thanh Boss), `_research/R11` (chính).
> Yêu cầu: **lúc chơi gần như không có UI** — màn hình trong sạch, người chơi tập trung 100% vào thế giới, nhưng vẫn đọc tức thì Máu (Vảy), Mana, Bình hồi và Stamina mà không phải rời mắt khỏi nhân vật.

---

## Q14.1 — Ngân sách diện tích HUD ở 640×360 (≤ 3,5% màn hình)

| Thành phần | Vị trí (640×360) | Kích thước | % diện tích | Trạng thái mặc định |
|---|---|---|---|---|
| **Bình Mana** (vòng tròn Hải Quang) | Góc trái trên `(10, 10)` | `24×24 px` | 0,25% | Hiện mờ 25% khi ngoài chiến đấu; sáng 100% khi nhận/tiêu mana hoặc đủ 33 (1 phát) |
| **Vảy HP** (5 → 10 vảy) | Phải Bình Mana `(38, 12)` | `9×11 px` × số vảy | 0,43–0,86% | Ẩn/mờ 25% khi đầy máu & ngoài chiến đấu > 3,5 s |
| **Bình Huyết Tảo** (2 → 5 giọt đỏ) | Dưới hàng Vảy `(38, 25)` | `8×10 px` × số bình | 0,14–0,35% | Đi chung cụm góc trái trên |
| **Stamina khám phá** | **Bám sát cạnh nhân vật** (`+9 px` phía sau lưng) | Vòng cung `14×14 px` / thanh `20×2 px` | 0,04% | **Ẩn hoàn toàn 0% khi đầy 100%** (mẫu *Celeste* + *Zelda BotW*). Chỉ hiện khi đang tiêu stamina |
| **Tổng HUD thường (cuối game)** | **1 góc trái trên duy nhất** | `136×28 px` | **1,65%** (pixel đặc ~0,9%) | Ngưỡng sạch của `R11` là ≤ 4% |
| **Thanh Boss / Mini-boss** | Sát mép dưới, căn giữa | `280×14 px` | 1,70% | Chỉ hiện trong đấu trường boss/mini-boss |
| **Tổng HUD khi đấu Boss** | Trái trên + mép dưới | — | **3,35%** | Dưới ngưỡng sạch ≤ 6,5% (`R11`) |

> **Vì sao 1 góc neo duy nhất?** *Hollow Knight* gom toàn bộ Mặt nạ + Bình Linh Hồn vào góc trái trên, không chia 4 góc ⇒ mắt chỉ quét 1 điểm nếu cần, 98% màn hình dành cho thế giới (`R11`). *Ori WotW* qua ~60 bản phác thảo của Alexey Yakovlev cũng rút về cùng nguyên tắc.

---

## Q14.2 — Luật ẩn / hiện theo ngữ cảnh (Auto-Fade)

| Trạng thái | Điều kiện kích hoạt | Độ mờ (Alpha) | Thời gian chuyển |
|---|---|---|---|
| **Chiến đấu / nguy hiểm** | Đánh trúng, trúng đòn, trong tầm quái tấn công, HP < 100%, hoặc đang giữ nút Aim/Heal | `100%` | Fade-in **0,08 s** (5 f) |
| **Khám phá yên bình** | Đầy máu & ngoài chiến đấu **> 3,5 s** | `25%` (mức *Dynamic*, mặc định) hoặc `0%` (mức *Auto-Hide*) | Fade-out **0,6 s** (36 f) |
| **Phòng lặng / cảnh kỳ vĩ** (Đại Sảnh Hé Lộ, Sảnh Tranh Tường, Núi Kho Báu) | Vào vùng trigger "Quiet Room" | **`0%`** (ẩn sạch cả 4 yếu tố) | Fade-out **0,8 s** |
| **Chạm nút Map (`Tab`/`LB`)** | Người chơi chủ động liếc | Hiện nhanh HUD + Quick Map bán trong suốt | Tức thì |
| **Tùy chọn trong Cài đặt** | 3 mức: **Dynamic (mặc định)** · **Auto-Hide (0% ngoài combat)** · **Always On (100%)** | — | Học *Rain World* + *Ghost of Tsushima* (`R11`) |

---

## Q14.3 — Tín hiệu trong thế giới (Diegetic Cues) thay thế UI

Alex Preston (*Hyper Light Drifter*, `R11` [B]) chỉ ra: trong giao tranh tốc độ cao, người chơi **không kịp liếc góc màn hình**. Vì vậy mọi thông tin cần phản xạ tức thì đều phải hiện **ngay trên nhân vật hoặc quái**:

| Trạng thái | Tín hiệu Diegetic (trong thế giới) | Âm thanh đi kèm | Thay thế cho UI rác nào |
|---|---|---|---|
| **Đủ 1 phát súng (33 Mana)** | Hạt Hải Quang tụ về nòng súng + **nòng súng sáng ngọc lam** (2 bậc sáng khi ≥ 66, 3 bậc khi ≥ 99) | Tiếng *ting* thủy tinh nhẹ | Thanh mana số / thông báo "Ready" |
| **Máu thấp (≤ 1 Vảy)** | Viền màn hình co nhẹ màu đỏ thẫm ở 4 góc + nhịp tim trầm + vảy trên người Kors nứt rỉ sáng | Nhịp tim 70 bpm | Chữ "LOW HP" nhấp nháy |
| **Stamina sắp cạn (< 20%)** | Bọt khí trào dồn dập quanh mang + **vây rung + chớp trắng-đỏ nhẹ** (mẫu *Celeste* `ClimbTiredThreshold = 18,2%`, `R11` [A]) | Tiếng thở gấp dưới nước | Thanh stamina cố định trên HUD |
| **Hết Bình Huyết Tảo** | Bấm hồi khi hết bình ⇒ Kors lắc bình rỗng, 2 giọt bọt nhỏ | Tiếng thủy tinh rỗng *cốc* | Popup chữ "Out of Flasks" |
| **Báo trước đòn quái** | **3 màu + hình dáng**: Bạc (clash được) · Đỏ (không đỡ) · Xanh/Hổ phách (sóng/điện) | 3 dải tần âm riêng (`15` Q15.2) | Biểu tượng nút bấm / dấu `!` nổi trên đầu |
| **Phá bộ phận / Khựng Boss** | Vết nứt phát sáng vàng trên bản lề mai B1 / chùy B2 / xúc tu B3; khi khựng boss quỳ xuống + khói bọt | Tiếng *rắc* giòn + hitstop 6 f | Thanh Posture / Stagger thứ hai |
| **Định hướng không minimap** | Dây cáp Chuông Lặn luôn chỉ lên; mốc kiến trúc lớn (Tháp Hải Quang, Cột Buồm Cờ Đỏ); Ấn Ký La Bàn lóe nhẹ 1 nhịp về hướng mục tiêu khi đứng yên > 5 s | Tiếng chuông đồng vang xa theo hướng | Minimap góc màn hình |
| **Nhặt vật liệu / tiền** | Số nhỏ `+15` trượt sát mép dưới trái rồi tan sau 1,8 s; vật liệu hiện icon thuộc **4 nhóm** (`13` Q13.5) + `"Bazan Chàm 2/4"` | Tiếng kim loại / tinh thể | Popup chiếm giữa màn hình |

---

## Q14.4 — 6 thứ CẤM xuất hiện lúc đang chơi (Anti-Patterns)

1. **Không số sát thương bay (floating damage numbers):** phá cảm giác đắm chìm đáy biển; thay bằng hitstop + nháy trắng 2 f + kích thước tia lửa (to hơn ở nhát kết combo 1,5×/2×).
2. **Không thanh máu nổi trên đầu quái thường:** quái thường chết trong 2–6 nhát (`05`), vết thương/chớp trắng + khựng là đủ. Chỉ Boss và 7 Mini-boss có thanh máu mỏng sát mép dưới.
3. **Không minimap thường trực:** chiếm 8–12% góc màn hình và biến khám phá thành nhìn chấm trên radar. Thay bằng **Quick Map bán trong suốt** khi giữ phím (`15` Q15.3).
4. **Không gắn nút bấm thường trực trên HUD** (chỉ hiện gợi ý nút 1 lần duy nhất tại phòng khóa dạy kỹ năng mới, rồi tắt vĩnh viễn).
5. **Không hàng icon buff/debuff:** trạng thái chậm do dầu/mực hiện thẳng bằng lớp dầu đen / vệt mực bám trên sprite Kors.
6. **Không xếp chồng popup loot:** mọi chi tiết mô tả vật liệu, bùa, bản ghi đẩy toàn bộ sang **Menu Tạm Dừng / Chuông Lặn**.

---

## Q14.5 — Khả năng đọc cho người mù màu (từ bài học *Nine Sols*, `R11`)

- Đòn **Bạc (clash)** có vệt tia sắc nhọn (hình học góc cạnh); đòn **Đỏ (không đỡ)** có vòng tụ tròn phồng + bóng tối; đòn **Xanh (sóng)** có vòng đồng tâm lan ra.
- Kèm **3 dải tần âm thanh riêng biệt** (`15` Q15.2) ⇒ kể cả người mù màu đỏ-xanh lá vẫn phân biệt 100% bằng hình + âm.
- Trong Cài đặt có bảng chọn màu telegraph thay thế (High-Contrast Preset).
