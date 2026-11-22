# 15 — Âm Thanh, Phạt Chết & Lưu Game, Bản Đồ Không Minimap & Trợ Năng

> Phụ thuộc vào: `01`, `04`, `05`, `06`, `09`, `10b`, `14`, `_research/R12` (chính).
> Lấp kín 4 trụ cột hệ thống còn thiếu sau vòng kiểm toán chuẩn game đỉnh (`R12`).

---

## Q15.1 — Phạt chết & Vòng lưu game (thay bản cũ ở `09` Q9.5)

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Bản cũ (`09` Q9.5) dùng túi xác rơi 5–10 Sv: quá nhẹ để tạo căng thẳng kiểu *Hollow Knight* (mất hết geo), nhưng vẫn tốn công lập trình túi xác + dễ gây ức chế nếu chết ngay sau khi mở rương lớn, đồng thời góp phần gây nguy cơ thiếu tiền rèn kiếm bậc 4 (`R12` P0). |
| **Chọn** | **Zero-Loss + Autosave thông minh** (lai *Ori WotW* + *Metroid Dread*): chết **không mất Sv, không mất vật liệu, không mất bản đồ đã mở**, hồi sinh ngay tại Chuông Lặn gần nhất (hoặc đầu đoạn chạy trốn / thử thách nhảy). Chế độ **Áp Suất Cao** (tùy chọn) mới bật rơi 15% Sv vào túi xác. |
| **Vì sao** | Khớp tuyệt đối Trụ cột 3 (*Khám phá không bị đồng hồ đuổi*) và luật chạy lại boss ≤ 10 s (`06`). Giảm hẳn chi phí lập trình & lỗi kẹt túi xác trên hố gai cho quy mô 1 người làm (`R12` §1.1). |

---

## Q15.2 — Âm thanh báo trước, Nhạc thích ứng & Im lặng chiến lược

### 1. Bốn dải tần âm thanh báo trước (không bao giờ lẫn nhau)
| Loại đòn | Dải tần chính | Âm sắc | Mục đích |
|---|---|---|---|
| **Bạc (clash được)** | **2,2–4,2 kHz** | Tiếng kim loại *keng* sắc, ngắn 80 ms | Phản xạ bấm chém nhanh nhất (tai người nhạy nhất vùng 2–4 kHz) |
| **Đỏ (không đỡ)** | **120–420 Hz** | Tiếng gầm trầm / rít áp suất dày | Phân biệt tức thì với bạc, báo phải dash/né |
| **Xanh / Hổ phách (sóng/điện)** | **400 Hz → 1,8 kHz** | Quét tần số (sweep) + tiếng bọt nổ | Báo đòn diện rộng / nhịp 2 |
| **Sonar / Đớp trong tối (Tầng IV, B4)** | **Xung 3–5 ms** | Tiếng *click* khô có **stereo panning** trái/phải theo vị trí quái | Đọc hướng tấn công trong bóng tối hoàn toàn |

### 2. Kiến trúc nhạc 3 lớp dọc (stems) & Luật im lặng
- **3 lớp:** (1) *Môi trường đáy biển* (luôn bật: gỗ kẽo kẹt, bọt khí, tiếng ống đàn), (2) *Giai điệu khu vực* (bật khi khám phá), (3) *Nhịp chiến đấu* (**CHỈ bật cho Boss, Mini-boss và Phòng khóa đấu trường** — **CẤM bật cho quái thường** để tránh nhạc giật cục liên tục, bài học của Gareth Coker ở *Ori*, `R12` §1.2).
- **Im lặng chiến lược (Strategic Silence):** Tầng IV (Rãnh Hóa Thạch) tắt hoàn toàn lớp giai điệu, chỉ còn nhịp tim, tiếng giọt nước và tiếng click sonar (mẫu *Subnautica*, `R12`).
- **Trộn âm chiến đấu:** Combat Bus giữ độ khô (**dry ≥ 85%**, reverb rất nhẹ) trong khi môi trường có reverb đáy biển sâu ⇒ tiếng chém, clash, đạn luôn sắc và rõ, không bị "bùn" dưới nước.

---

## Q15.3 — Bản đồ, Sương mù & Ghim (không có Minimap)

| Cơ chế | Thiết kế | Học từ |
|---|---|---|
| **Tự mở sương mù tức thì** | Bước vào phòng nào mở ngay hình dáng phòng đó trên bản đồ (không bắt mua bút lông hay về ghế mới vẽ, giảm ma sát không cần thiết ở game 11h) | *Ori WotW* / *Metroid Dread* |
| **Quick Map bán trong suốt** | Giữ `Tab` / `LB`: bản đồ hiện mờ 65% ngay trên màn hình, **vẫn đi bộ được** trong khi liếc | *Hollow Knight* |
| **Ảnh Ký Ức (15 ghim chụp màn hình)** | Bấm 1 nút khi thấy cổng bị khóa ⇒ lưu ảnh thu nhỏ `320×180` gắn ngay vào tọa độ đó trên bản đồ. Quay lại sau biết ngay cần kỹ năng gì mà không phải ghi giấy | *Prince of Persia: The Lost Crown* (tính năng QoL được khen nhất thập kỷ, `R12`) |
| **Auto-Icon & Lọc theo họ cổng** | Cổng đã chạm tự gắn biểu tượng theo **10 họ thị giác** (`16` P1); mở bản đồ bấm lọc để sáng lên mọi cổng mình vừa mở khóa được | *Metroid Dread* |

---

## Q15.4 — Điều khiển (Ngân sách 8 nút) & Trợ năng (Accessibility)

### 1. Ngân sách 8 nút (sửa lỗi xung đột Pogo vs Dậm Nặng từ `R12` P0)
| Nút (Gamepad / Phím) | Hành động | Ghi chú sửa xung đột |
|---|---|---|
| Stick / `WASD` | Di chuyển, nhìn xuống, cúi/bò (trên đất) | Trên đất giữ `↓` = cúi/bò hoặc Neo Chân (vẫn chém ngang được khi Neo Chân!) |
| `A` / `Space` | Nhảy, Đạp tường | Coyote 6 f, Buffer 7 f |
| `X` / `J` | Chém Cutlass, `↓ + Chém` trên không = **Pogo** | **Tách hẳn khỏi Dậm Nặng** ⇒ không bao giờ bấm nhầm lao xuống hố |
| `B` / `Shift` | Dash (Quẫy Vây / Dash Áp Suất / Mạch Lướt) | Trên không **`↓ + Dash` = Dậm Nặng** (hoặc nút riêng trên PC) |
| `Y` / `L` | Bắn Súng Phép (33 Mana) | |
| `RB` / `F` | Móc Neo (F2) / Kỹ năng đặc biệt (nhấn giữ) | |
| `LB` / `Q` | Uống Bình Huyết Tảo | |
| `LT` / `Tab` | Giữ = Quick Map · Bấm = Chụp Ảnh Ký Ức (khi đang mở bản đồ) | |

### 2. Chế độ Trợ năng & Độ khó tùy chỉnh (học *Celeste* + *PoP: TLC*, `R12`)
- **Thanh trượt Cửa sổ Clash & Dash i-frame:** `100%` (chuẩn) → `130%` → `160%` (giúp người phản xạ chậm vẫn tận hưởng được clash).
- **Cấm bấm điên cuồng (No Button-Mashing):** thoát đòn tóm (Thợ Lặn Trưởng Ca, B3) bằng **1 lần bấm Dash đúng nhịp** thay vì bấm liên tục.
- **Tăng sáng đáy sâu (Abyss Visibility Boost):** mở rộng vầng sáng Tầng IV từ `2,5 m → 4,0 m` cho màn hình tối / người nhạy sáng yếu.
- **Chế độ Dẫn Đường (Guided Mode):** bật biểu tượng đích chính trên bản đồ lớn (mặc định TẮT để giữ khám phá thuần túy).
- **Tùy chỉnh Deadzone Analog** (`10–35%`) & đổi toàn bộ phím.
