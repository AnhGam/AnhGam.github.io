# 04 — Chiến Đấu Của Người Chơi (kiếm, đỡ đòn, súng, hồi máu, máu)

> Phụ thuộc vào: `01`, `02` (dash, nhảy), lore Kiếm Buộc Dây / Súng Phép / Huyết Tảo, `_research/R3`, `R4`, `R6`, `R8`.
> Bị phụ thuộc bởi: `05` (máu quái = số nhát chém), `06` (boss), `07` (skill), `09` (nâng cấp), `11` (feel).

Trụ cột kiểm tra: **(2) Chém để bắn**. Mana chỉ hồi khi chém trúng. Mọi con số dưới đây phải giữ cho cận chiến là trung tâm.

Đơn vị máu người chơi: **Vảy** (1 Vảy = 1 lần trúng đòn thường). Đơn vị sát thương: điểm.

---

## Q4.1 — Máu người chơi & sát thương nhận vào

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Hero chịu được bao nhiêu đòn? Đòn quái gây bao nhiêu? |
| **Phương án** | (A) Thanh máu số lớn (120 HP như Nine Sols). (B) **Ô máu nguyên (masks) như Hollow Knight.** (C) Hai lớp (máu đỏ hồi được). |
| **Chọn** | **(B).** Khởi đầu **5 Vảy**, tối đa **10 Vảy**. Đòn thường **1 Vảy**. **2 Vảy chỉ cho đòn có báo trước ≥ 48 f**, và chỉ quái từ **Tầng III trở xuống** (boss mọi tầng được dùng). |
| **Vì sao** | 1) Ô nguyên đọc ngay "còn mấy đòn". HK 5 → 9 (`R3` §1.3). 2) Silksong cho quái thường đánh 2 ô máu và **bị phàn nàn ngay khi phát hành** (`R3` §2); Team Cherry phải giải thích bằng việc hồi nhiều hơn. Ta chỉ dùng 2 Vảy cho đòn nặng có báo trước, để chết luôn là "lỗi của tôi", điều kiện để thất bại làm game hay hơn (Juul, `R5`). 3) 10 Vảy: cao hơn HK một chút vì có thêm 2 nguồn hồi (Q4.6). |
| **Lore** | Vảy cá xám của hình hài bị nén; nâng cấp = vảy Hải Quang cứng lại (xem 09). |

| Thông số | Giá trị | Nguồn |
|---|---|---|
| Bất tử sau khi trúng đòn | **1,2 s**, nhấp nháy mỗi 0,08 s | HK ~1,3 s **chưa xác minh** (R3 §1.3 chỉ có từ tài liệu mod); khoảng 1,0–1,3 s (`R8` §9) |
| Đóng băng khi trúng đòn | **12 f** (đòn 2 Vảy: 18 f) | `R8` §1.2 (10–20 f) |
| Bị đẩy lùi khi trúng | **1 ô**, khóa điều khiển 0,15 s | Ít hơn chuẩn 1,5 thân (`R8` §3) vì **thân chì** (trụ cột 1: nặng = vững) |
| Sát thương khi chạm thân quái | **chỉ khi quái đang ra đòn / lao / xoay, hoặc quái có gai thân** (Sao Biển Răng Cưa đang lăn, Hà Đục Khoan đang khoan) | `R4` R28–R30: HK có chạm thân ở hầu hết quái; Dead Cells **không**; vùng bơi 360° làm chạm thân thành "xe điện đụng"; Pronty bỏ chạm thân. Ta chọn giữa: thân quái đứng yên không gây hại ⇒ áp sát chém được, đúng trụ cột 2 |
| Sau khi người chơi chém trúng | tắt chạm thân của quái đó 10 f | `R4` R30 (nhãn [N]: đề xuất notebook, chưa có game đo) |

## Q4.2 — Kiếm Buộc Dây: combo spam nút

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Khung thiết kế: "combo bằng cách spam nút tấn công". Làm sao spam mà không vô hồn? |
| **Phương án** | (A) Chém đơn lặp (HK, không có combo). (B) **Chuỗi 3 nhát, nhát cuối là đòn kết** (Dead Cells, Nine Sols). (C) Chuỗi dài 5 nhát (Ori). |
| **Chọn** | **(B)**: F0 có 3 nhát; **Đôi Tay (F2) thêm nhát 4** (sửa lore L5). Bảng khung hình dưới. |
| **Vì sao combo vẫn có chiều sâu** | Năm cơ chế chống spam vô hồn, đều có tiền lệ (`R3` §4.5): **(1) Đòn kết chậm hơn** (khởi động dài + hồi dài, Dead Cells, Nine Sols) nên có cửa sổ bị phạt. **(2) Trần combo** (Ori dừng sau 5 nhát): bấm tiếp sau nhát cuối thì phải chờ. **(3) Hồi không hủy được, trừ bằng dash** (HK). **(4) Quái có "giáp siêu cứng"** khi gồng đòn: chém không làm khựng (`05`), phải né hoặc đỡ. **(5) Đẩy lùi quái**: nhát 1–2 đẩy quái nhỏ 0,5 ô, đòn kết đẩy 2 ô, nên spam đứng yên sẽ chém hụt, phải bước theo. |
| **Bằng chứng** | `R3` §3.1 (Dead Cells 14/14/17, đòn kết khởi động ×2,5), §3.2 (Nine Sols 20/20/40), §3.4 (Ori trần 5 nhát), §4.4 (Wagar: đòn tầm xa phải khởi động dài hơn). |
| **Lore** | Chém nặng nhờ thân chì rơi theo lưỡi, nên chém dưới nước không tốn sức. Đôi Tay người (F2) giữ kiếm vững để bổ thêm nhát 4 "Neo Bổ". |

**Khung hình (60 fps; khởi động / chém / hồi; tổng):**

| Nhát | Khởi động | Chém (hitbox) | Hồi | Tổng | Sát thương (bậc kiếm 0) | Đẩy quái nhỏ | Hitstop (người / quái) | Khác |
|---|---|---|---|---|---|---|---|---|
| 1 — Chém ngang | 3 f | 3 f | 8 f | **14 f (0,23 s)** | **10** | 0,5 ô | 3 / 4 f | nối được từ f4 của hồi |
| 2 — Chém ngược | 3 f | 3 f | 9 f | 15 f (0,25 s) | **10** | 0,5 ô | 3 / 4 f | |
| 3 — Bổ kết (F0, F1) | **6 f** | 4 f | **14 f** | 24 f (0,40 s) | **15** (1,5×) | **2 ô** | 5 / 7 f | phá thế quái (poise +40) |
| 4 — Neo Bổ (F2+) | **8 f** | 4 f | 16 f | 28 f (0,47 s) | **20** (2×) | **hất văng** | 8 / 10 f | hất văng vào tường ⇒ +10 sát thương va tường |

- Cả chuỗi F0: 14 + 15 + 24 = **53 f (0,88 s)** cho **35 sát thương**. F2: 81 f (1,35 s) cho 55. Nhịp mỗi nhát 0,23–0,25 s, nằm trong khoảng HK (0,41 s thường; 0,25 s với Quick Slash) (`R3` §1.2).
- Nhớ phím 7 f (`02` Q2.9). Dừng bấm > 0,4 s thì combo về nhát 1.
- **Hủy:** dash hủy được giai đoạn **hồi** từ f4 của hồi trở đi, **không bao giờ hủy khởi động** (`R8` §4.3).
- **Hướng chém:** ↑ + chém = **chém lên** (10, hitbox cung 140° phía trên). Trên không ↓ + chém = **chém xuống**; trúng quái / gai / vỏ cứng ⇒ **nảy lên** vy = **210 px/s** (F0 cao 3,1 ô, F1 2,5 ô) và nạp lại dash (kiểu nảy pogo HK). Không dùng 330 px/s như bản trước: khi đó F0 nảy 7,7 ô, vượt cả cổng gờ Đôi Chân (người soát phát hiện). Luật bổ sung: không đặt vật pogo được trong 10 ô quanh cổng (03 Q3.10). **Dậm Nặng (F1+)** tách riêng sang **`↓ + Dash` trên không** (không chung `↓ + Chém` với pogo để tránh bấm nhầm lao xuống vực, sửa lỗi P0 từ `R12` / `15` Q15.4). Lý do pogo: biến quái và gai thành bục (`R2` #23), đúng kiểu "kỹ năng ẩn" của HK cho người giỏi.
- **Trên không:** tối đa 2 nhát ngang. Mỗi nhát trúng làm hero **khựng trôi 8 f** (giảm tốc rơi 85%), để không rơi khỏi tầm khi đang chém (Dead Cells "air stall", `R3`/`R8` "hydro-stall").

**Tầm chém (hitbox):**

| Hình hài | Tầm phía trước | Cao | Lý do |
|---|---|---|---|
| F0 | **28 px (1,75 ô)** | 32 px | tay cá ngắn |
| F1 (Đôi Chân) | **32 px (2 ô)** | 36 px | thân cao hơn, cung vung dài hơn |
| F2+ (Đôi Tay) | **36 px (2,25 ô)** | 40 px | tầm +29% so với F0 (+12,5% so với F1): lớn lên = mạnh lên, thấy được ngay (`R5` "making growth felt") |

> Liên hệ dash (02 Q2.3): dash 7 ô xuyên quái, dư 2 ô sau lưng = tầm chém F1 (2 ô) ⇒ xuyên qua, quay lại, chém trúng ngay.

## Q4.3 — Sát thương kiếm qua các bậc nâng cấp

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Bao nhiêu bậc, mỗi bậc tăng bao nhiêu, để mỗi lần nâng **cảm nhận được** mà không phá cân bằng? |
| **Chọn** | 5 bậc, cộng phẳng +7 mỗi bậc: **10 → 17 → 24 → 31 → 38** (tổng ×3,8). Mức tăng tương đối: **+70%, +41%, +29%, +23%**. |
| **Vì sao** | 1) HK cộng phẳng +4 trên nền 5: +80%, +44%, +31%, +24%, tổng ×4,2 (`R3` §1.1). Cộng phẳng tự tạo "lần đầu nâng thấy rõ nhất", đúng cảm giác người chơi cần (`R5` §3). 2) Ngưỡng có nghĩa: sát thương chỉ đáng khi vượt ngưỡng số nhát (`R3` §4.1, breakpoints). Ví dụ quái 30 máu: bậc 0 cần 3 nhát, bậc 1 cần 2 nhát (17 × 2 = 34), bậc 2 cần 2, bậc 3 cần 1 (31). Mỗi bậc đổi số nhát ở ít nhất một loại quái chủ lực (bảng ở 05). 3) Tổng ×3,8 hơi thấp hơn HK vì ta có thêm nhát 4 (F2) và Hải Quang (F3) làm tăng sức mạnh. |
| **Lore** | "Đánh bóng lưỡi thép" (five-vessels §2A). Lore cũ ghi làm ở Lão Boyle; **đổi sang Marlow**, vì Marlow là thợ rèn và ở ngay Tầng II, nơi có vật liệu bậc 1 (09). Vật liệu cố định, không cày. |

## Q4.4 — Đỡ đòn kiểu Hollow Knight (Clash) — đã chốt

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Không có nút đỡ riêng. Chém đúng lúc quái đánh thì đỡ được. Cửa sổ bao nhiêu, đòn nào đỡ được, đỡ được thì thưởng gì? |
| **Chọn — Cơ chế** | Khi **hitbox chém** của người chơi (đang ở f "chém") chạm **hitbox đòn có viền bạc** của quái trong **6 f đầu** đòn đó hoạt động ⇒ **Clash**: hai bên không mất máu, đóng băng chung **6 f**, tia lửa vàng trắng + tiếng "keng", người chơi **bất tử 0,25 s**, quái bị đẩy lùi 1 ô và **+30 phá thế**. |
| **Chọn — Thưởng** | Clash = **+11 mana** (bằng 1 nhát trúng, không hơn) + **nạp lại dash ngay**. |
| **Chọn — Đòn đỡ được / không** | Bảng màu dưới. |
| **Vì sao (cửa sổ)** | Không có nút riêng nên không có "phạt khi đỡ hụt". Đỡ hụt = một nhát chém thường vào không khí, chịu hồi 8–14 f. Đây là cái giá tự nhiên, đúng như HK. Cửa sổ thực ≈ 3 f chém + 6 f đầu của đòn quái chồng lên nhau. Thêm "clash box" rộng hơn hitbox chém 4 px để dễ chịu hơn HK một chút (luật dễ dãi, Thorson). HK clash cho 0,25 s bất tử (`R3` §1.6). |
| **Vì sao (thưởng mana = 1 nhát)** | HK không cho Soul khi clash (`R3` §1.6). Nhưng ở game này chém là trung tâm vòng mana; clash chính là một nhát chém "trúng đòn". Cho đúng bằng 1 nhát giữ trụ cột 2 nhất quán, **không hơn**, để người chơi không đứng chờ đỡ thay vì đánh (rủi ro chính của parry, đã nêu khi bàn Q3). Nạp dash: đỡ xong lướt ra hoặc lướt vào phản đòn, kiểu Nine Sols (đỡ chuẩn nạp lại Air Dash, `R6` §3.3). |
| **Vì sao (bạc / đỏ / xanh)** | Mã màu cho đòn không đỡ được là chuẩn thể loại: Sekiro "危", Nine Sols đòn đỏ, Lost Crown đỏ/vàng (buổi bàn Q3; `R4` §1 "color-coded unblockables"). HK dùng vệt trắng cho đòn clash được (`R3` §1.6). |
| **Lore** | Kiếm thép nhiễm Hải Quang chạm kim loại / vỏ vôi / vuốt ⇒ tóe lửa. Không đỡ được hàm cắn (thịt), sóng xung kích (nước), điện. |

| Màu viền đòn | Loại | Đỡ được? | Ví dụ |
|---|---|---|---|
| **Bạc** (vệt trắng-bạc theo đường vung) | đòn vũ khí / vuốt / càng / đạn vật lý | **Có** (đạn vật lý: chém vỡ, không phản lại) | Cờ lê Thợ Lặn Đứt Cáp, càng Cua, gai Sao Biển bắn ra |
| **Đỏ** (mắt / miệng phát sáng đỏ) | cắn, tóm, lao cả thân | **Không**, phải né / dash i-frame | Rình Mồi Siêu Đen đớp, Cua lao húc |
| **Xanh lam / vàng hổ phách** (vòng sóng) | sóng nổ, điện, cavitation | **Không**, phải né / nấp màn bọt khí | Tôm Súng nhịp 2, Sứa Chuông điện |

## Q4.5 — Súng Phép Runeflint & vòng mana

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Bao nhiêu nhát đổi được 1 phát? Phát súng mạnh cỡ nào để không ai đứng xa bắn rỉa? |
| **Chọn — Mana** | Thanh **99 mana = 3 phát** (33/phát). Mỗi nhát chém trúng **+11** ⇒ **3 nhát = 1 phát**. Đòn kết / Neo Bổ cũng chỉ +11 (mana theo số lần trúng, không theo sát thương). Nâng cấp khoang mana: +33 ×2 (Marlow) ⇒ tối đa **165 (5 phát)**. **Nhặt súng lần đầu thì mana đầy 99**; nghỉ ở Chuông Lặn cũng nạp đầy mana. Nguồn chém ngoài quái: **Bụi Tinh Thể Hải Quang** (vật chém được, +11 mana, mọc lại sau 10 s) đặt cạnh mọi "then" dùng súng (03 Q3.10 luật 9). |
| **Chọn — Phát bắn cơ bản "Bọt Cavitation"** | Bay **600 px/s**, tầm **24 ô (384 px)** rồi tự vỡ. Hai nhịp sát thương: chạm **9** + nổ lõm sau 0,15 s **9** = **18**. Hồi giữa hai phát 0,35 s; khởi động 4 f. |
| **Vì sao (3 nhát / phát)** | HK: 11 Soul mỗi nhát, 33 mỗi phép ⇒ 3 nhát (`R3` §1.4). Silksong: 9 nhát đổi 3 mask, vẫn là tỉ lệ 3 (`R3` §2). Tỉ lệ này đã được hai game kiểm nghiệm với hàng triệu người chơi. |
| **Vì sao (18 sát thương)** | 3 nhát bậc 0 theo chuỗi combo = 10 + 10 + 15 = 35. Phát súng 18 = **0,51×** công sức. Bản trước để 24 (0,69×) thì khi người chơi tiêu hết mana, súng chiếm ~41% tổng sát thương, vượt chính ngưỡng "súng quá mạnh" ở KPI 12 Q12.3 (người soát tính ra). Với 18: tiêu hết mana thì súng chiếm **34%**, thực tế thấp hơn (`_calc/metrics.py`). `R3` §5.2 **khuyến nghị** (không phải số đo) giữ 0,6–1,0×; ta chọn thấp hơn một chút vì mana của ta không dùng để hồi máu, súng là sát thương thuần. Ý "vượt ~1,3× thì người chơi đứng xa bắn" là suy luận của `R3`, nó tự ghi chưa tìm được nguồn trực tiếp. Phần cứng có thật: HK phép chỉ đáng 0,6–1,3× số nhát nạp ra nó (`R3` §1.5). |
| **Vì sao (tầm 24 ô)** | Đạn tự vỡ trước mép màn (40 ô) ⇒ không bắn tỉa quái ngoài màn hình. Đúng lore: bọt chân không bị áp suất nước nghiền dần. |
| **Súng không tăng theo bậc kiếm** | Súng tăng theo **nòng** (Marlow / nhánh phụ). Bảng dưới: tỉ lệ 0,30–0,55× (phần súng khi tiêu hết mana ≤ 36%). |
| **Lore** | Súng hải tặc cũ, cò đá lửa thay bằng buồng nén Hải Quang. Bọt chân không vỡ hai nhịp: xung kích + chớp sáng 5.000 K (fivefold-severance §2B). |

| Giai đoạn | Bậc kiếm | 3 nhát | Đạn | Sát thương đạn | Tỉ lệ | Công dụng ngoài sát thương |
|---|---|---|---|---|---|---|
| Tầng I | 0–1 | 35–60 | Bọt Cavitation | 18 | 0,51× → 0,30× | công tắc xa, khóa gỉ, chớp sáng (quái sợ sáng co lại) |
| Tầng II | 1–2 | 60–84 | **Nòng Nén Bậc 2** (Marlow): nổ lớn hơn, **phá giáp vỏ đồng** | 30 | 0,50× → 0,36× | phá giáp Cua / Tôm (nhân ×2 lên quái có giáp) |
| Tầng II nhánh | — | — | **Đạn Nhiệt Lưu Huỳnh** (Hang Dầu) | 18 + cháy | — | đốt túi khí dưới trần dầu, mở nút sáp |
| Tầng III | 2–3 | 84–108 (combo 4: 24+24+36+48) | **Đĩa Đúc Sóng** (Ống Vang): 2 nhịp cỡ đại | 45 | 0,54× → 0,42× | **Ống Ngắm Cộng Hưởng** phá khóa tinh thể |
| Tầng IV | 3–4 | 108–133 | như trên + Sonar đánh dấu điểm yếu | 60 | 0,55× → 0,45× | lộ điểm yếu boss |
> Tỉ lệ tụt về ~0,3–0,45× ở cuối mỗi giai đoạn là **cố ý**. Súng mạnh vì công dụng (tầm, phá giáp, kích môi trường), không vì sát thương thô, đúng cách HK: phép chỉ còn 1–2× nhát chém về cuối (`R6` §3.1). Phần súng trong tổng sát thương khi tiêu hết mana luôn ≤ 36% (`_calc`).

**Chống đứng xa bắn rỉa (tổng hợp):** (1) mana chỉ từ chém; (2) súng ≤ 1,0× giá trị; (3) tầm 24 ô; (4) quái tầm xa có cách "vô hiệu đạn" (05: Mực Nang tan mực, Sao Biển xoay chặn); (5) boss có pha co hẹp đấu trường (06).

## Q4.6 — Hồi máu: bình (item) + bị động (skill)

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Đã chốt: bình hồi lại miễn phí tại điểm lưu. Khung: "hồi máu bằng skill bị động và item". Bao nhiêu bình, hồi bao nhiêu, bị động là gì, để không quá mạnh trong trận boss? |
| **Chọn — Bình Huyết Tảo (item)** | **2 bình** đầu game, tối đa **5**: **1 mua ở Lão Boyle + 6 Mảnh Bình** trong khám phá (3 mảnh = 1 bình) (nguồn chuẩn `09` Q9.2). Mỗi bình hồi **3 Vảy** (60% máu khởi đầu). Uống: **đứng yên trên đất, 0,9 s** (0,25 s đầu là động tác mở nắp); **trúng đòn khi đang uống ⇒ hủy, KHÔNG mất bình**. Nâng cấp "Huyết Tảo Đậm" (Huyết Tảo ×3) ⇒ hồi 4 Vảy. Nạp đầy tại Chuông Lặn. |
| **Chọn — Bị động (sigil, chọn 1 trong 2 bằng ô sigil)** | **Ấn Huyết Tràn** (bán sớm ở Lão Boyle, Tầng I): đếm độc lập **mỗi 12 nhát chém trúng ⇒ +1 Vảy** (không phụ thuộc trần Mana tối đa, sửa lỗi P0 tự nerf khi nâng khoang Mana `99 → 165` từ `R12`). **Ấn Tái Tạo** (Ẩn Sĩ Ossa, Tầng III): đứng yên 1,2 s ⇒ đổi **33 mana thành 1 Vảy** (kiểu Focus HK). |
| **Vì sao (bình)** | Khoảng 40–60% máu khởi đầu mỗi bình, 2–3 bình đầu, tối đa 5–6 (`R3` §3.7: Dead Cells 60%, Nine Sols 50%, Silksong 60%, Blasphemous 2 → 10). Đứng yên 0,9 s: ở trận boss phải **chọn thời điểm** (boss có khoảng nghỉ, 06). Trúng đòn không mất bình: không trừng phạt bằng tài nguyên (khác Silksong "all-or-nothing"), chỉ mất thời gian. Lý do: tài nguyên mất trước boss là nguồn "sụp đổ dây chuyền" (`DeepSeaMV-08` §5). |
| **Vì sao (bị động nằm trong sigil, không phải mặc định)** | Nếu bị động hồi theo nhát chém là mặc định thì một trận boss 60 nhát hồi thêm ~6–8 Vảy, cộng 9–15 Vảy từ bình ⇒ quá dư so với 5–10 Vảy máu, boss mất uy. Đặt vào ô sigil thì đó là **lựa chọn build** (đổi lấy ô sigil tấn công). Đúng nhóm "hồi nhờ đánh hăng" mà người chơi HK đánh giá cao (Grubsong, Soul Catcher, `R6` §6). **Ấn Huyết Tràn** chỉ hồi khi mana đầy ⇒ muốn hồi thì phải nhịn bắn: tái tạo cái giằng co "hồi máu hay bắn" của HK mà không dùng chung một thanh. |
| **Lore** | Huyết Tảo đông kết vết thương dưới áp suất (fivefold-severance §2C). Ấn Tái Tạo của Giáo Hội "dùng Mana dư hàn gắn mô cơ khi đứng yên". |

**Tổng lượng hồi trong một trận boss giữa game (kiểm toán):** 4 bình × 3 = 12 Vảy + Huyết Tràn (~3–4 Vảy nếu nhịn bắn) so với máu 7–8 Vảy, boss gây 1 Vảy/đòn, đòn lớn 2. ⇒ người chơi chịu được ~20 lần trúng. Boss giữa game ~2–4 phút (06). Nếu người chơi trúng > 20 lần thì họ chưa học được đòn. Đây là cái giá công bằng. Số lần thử mục tiêu ở `10`.

## Q4.7 — Phá thế (poise / stagger) — để combo có mục đích

| Ô | Nội dung |
|---|---|
| **Chọn** | Mọi quái có **thanh phá thế ẩn** (quái thường 40–100, tinh nhuệ 120–200; boss có thanh **hiện**). Nhát 1–2: +10; đòn kết: +40; Neo Bổ: +60; clash: +30; đạn phá giáp: +25. Đầy ⇒ **khựng 1,2 s** (nhận sát thương ×1,25, hất văng xa hơn). Giảm 20/s sau 1,2 s không bị đánh. |
| **Vì sao** | Cho người chơi mục tiêu ngắn hạn trong combo ("đánh đủ để làm khựng") thay vì chỉ trừ máu. Lấy từ Dead Cells "breach" và notebook (`R3` §4.1 [internal]: 100 poise, nhẹ 15–22, nặng 45–80 ⇒ khựng sau 2 nặng hoặc 5–6 nhẹ). Đòn kết là nguồn phá thế chính ⇒ đánh trọn chuỗi có giá trị hơn spam nhát 1. |

## Q4.8 — Các quyết định chiến đấu khác

| Câu hỏi | Quyết định | Vì sao |
|---|---|---|
| Có số sát thương bay lên không? | **Không** (tùy chọn bật trong menu trợ năng) | HK, Celeste, Nine Sols không có; sức nặng truyền bằng giật, nháy, tiếng (`R8` §3) |
| Thanh máu boss | Mỏng ở đáy màn, tắt được | Biết boss còn bao nhiêu giúp người chơi đặt mục tiêu; tắt được cho người thích kiểu HK |
| Chém có tốn stamina? | **Không** | `02` Q2.7, `R6` §4.3 |
| Hồi máu trên không / khi bơi | Không trên không. **Trong vùng bơi** thì uống được khi đứng yên trong nước (hero tự lơ lửng) | Vùng bơi không có đất; nếu không cho uống thì trận boss dưới nước (06) không hồi được. Ori làm ngược (ngập sàn thì không hồi được) như một cú xoắn (`R4` boss doc); ta chọn cho phép vì trận boss bơi đã đủ khó |
| Đòn trên không có giới hạn? | 2 nhát ngang / lần nhảy; chém xuống & chém lên không giới hạn | Tránh lơ lửng chém vô tận nhờ khựng trôi |
| Hồi chiêu súng khi đang combo | Bắn hủy được hồi đòn chém từ f6 (không hủy khởi động) | Cho phép "chém 3 nhát rồi bắn" mượt (vòng lõi trụ cột 2) |
