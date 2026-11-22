# 02 — Di Chuyển (đi, nhảy, dash, đạp tường, móc neo, bơi 360°, stamina)

> Phụ thuộc vào: `01` (thước), lore Áp Lực Chì (thân đặc ~1.680 kg/m³, "quẫy nổi 1–2 s"), `_research/R1`, `R6`, `R8`.
> Bị phụ thuộc bởi: `03` (mọi khe/bậc), `04` (né, tầm áp sát), `05` (tốc độ quái so với người), `08`.

Trụ cột kiểm tra: **(1) Biển là sức mạnh** — nặng phải đổi lấy lợi thế; **(3) Khám phá không bị đồng hồ đuổi** — đi thường không tốn gì.

---

## Q2.1 — Đi bộ đáy biển

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Lore nói thân Kors nặng như chì. Làm sao đi "nặng" mà không ì, không chán? Tốc độ bao nhiêu? |
| **Phương án** | (A) Chậm + có quán tính (kiểu Shinsekai). (B) Tốc độ chuẩn thể loại, phản hồi tức thì, cảm giác nặng đặt vào **hoạt ảnh, tiếng bước, bụi bùn, độ khựng khi đáp**. (C) Nhanh hơn chuẩn. |
| **Chọn** | **(B).** F0: **150 px/s** (9,4 ô/s, qua 1 màn 4,3 s). F1+: **180 px/s** (11,3 ô/s, qua màn 3,6 s). Tăng tốc 0 → max trong **3 f (0,05 s)**, phanh trong **5 f**. |
| **Vì sao** | 1) Shinsekai bị chê đúng chỗ này: "walking speed is incredibly slow" (`R1` §6.1). `DeepSeaMV-08` gọi đây là "thiết kế trừ bớt", lỗi số 1 của màn chơi nước. 2) Celeste và Hollow Knight cùng hội tụ ~3,5 s qua 1 màn (`R1` §0.1). F1+ đặt đúng chuẩn đó. 3) F0 chậm hơn 20% có chủ đích: thân bị nén, chân cá ngắn. Lấy lại tốc độ khi nhận Đôi Chân là phần thưởng **cảm nhận được bằng tay**. Theo tâm lý vật lý (psychophysics), mắt người phân biệt được chênh lệch tốc độ khoảng 5–10%; +20% chắc chắn thấy. Số 5–10% là kiến thức chung, chưa trích nguồn trong R*, cần kiểm khi playtest. 4) `R8` §8: sức nặng nằm ở lúc **nhả nút**, không ở lúc bấm. Bấm phải đi ngay, khởi động ≤ 3 f. |
| **Bằng chứng** | `R1` §2 (Celeste tăng tốc 5 f; HK, Silksong tức thì), §6.2; `R8` §4.1 (độ trễ > 100 ms phá cảm giác điều khiển), §8. |
| **Lore** | Áp Lực Chì ghim chân xuống cát, nên không trượt, không quán tính. Chính sự đặc khiến hero **đứng vững tuyệt đối**: không bị đẩy lùi khi chém (xem 04), không trôi theo dòng yếu. |
| **Cảm giác** | Mỗi bước: bụi bùn bốc 2–3 hạt, tiếng bước trầm (thân 120–300 Hz). F0 bước ngắn, lạch bạch; F1 sải dài kiểu ủng hải tặc. Đáp đất từ cú nhảy cao > 3 ô: nén người 3 f + bụi tỏa ngang, **không khóa điều khiển**. |
| **Rủi ro & đo** | Đo thời gian đi giữa hai Chuông Lặn ở greybox. Mục tiêu: không đoạn đi thẳng nào > 3 s mà không có tương tác (luật Mahler "never hold forward", `R2` §3.1). |

## Q2.2 — Nhảy ("quẫy nổi")

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Lore: vây chỉ nâng được 1–2 s rồi chì kéo xuống. Nhảy cao bao nhiêu, bay bao lâu, cong ra sao để vừa "dưới nước" vừa không lơ lửng khó điều khiển? |
| **Phương án** | (A) Nhảy đối xứng chậm (lên chậm, xuống chậm). Đây là kiểu "floaty" bị ghét. (B) **Lên chậm (vây quẫy) – treo ngắn ở đỉnh – xuống nhanh (chì kéo)**. (C) Nhảy kiểu cạn (nhanh, ngắn). |
| **Chọn** | **(B).** Bảng số dưới. Chiều cao thay đổi được theo thời gian giữ nút. Ở đỉnh, khi \|vy\| < 40 px/s và đang giữ nút thì trọng lực × 0,5. |
| **Vì sao** | 1) Cảm giác "floaty" (trôi bồng bềnh) bị ghét vì xuống chậm làm mất kiểm soát lúc đáp. `R8` §8 ghi rõ "fall faster than rise". Lên chậm thì đúng lore vây quẫy; xuống nhanh thì đúng lore thân chì. Hai lực lore khớp đúng quy tắc cảm giác. 2) Thời gian bay F0 ~1,19 s, F1 ~1,32 s (đã tính cả đoạn treo đỉnh, `_calc/metrics.py`): nằm trong "1–2 s" của lore, gần HK (1,02 s) và Silksong (0,9 s) (`R1` §3), chậm hơn một chút vì đang ở dưới nước. 3) Chiều cao F0 = 81 px (23% màn, 2,3 H), F1 = 129 px (36% màn, 2,6 H): theo tỉ lệ màn thì nằm giữa Celeste (16%) và Super Metroid (50%), ngang HK (34%); theo H thì F1 đúng nhóm 2,6 H của Celeste, Silksong, Super Metroid (`R1` §8; `R1` §9 khuyên dùng thước tỉ lệ màn vì khung ta "gần"). 4) F1 nhảy cao hơn F0 **cả theo px lẫn theo H** ⇒ đúng "mở khóa bước nhảy mạnh" của Ấn Đôi Chân (story.md) và tạo cổng **gờ 7 ô**: F0 không lên được (5,1 + lề 1), F1 lên được (8,1 − lề 1). Bản trước đặt F1 = 7 ô; khi tính đúng đoạn treo đỉnh thì không còn kích thước gờ nào thỏa cả hai lề (người soát phát hiện), nên nâng lên 8 ô. |
| **Bằng chứng** | `R1` §3 (bảng nhảy), §9; `R8` §4.2 (Celeste giảm nửa trọng lực ở đỉnh, "looks/feels pleasant" – Thorson). |
| **Lore** | Vây lưng + chân màng tạo lực nâng ngắn hạn; hết lực thì Áp Lực Chì kéo xuống (fivefold-severance §2A). |
| **Cảm giác** | Bấm nhảy: vây xòe 2 f, chuỗi bọt nhỏ dưới chân. Lên: dáng vây quẫy. Đỉnh: treo nhẹ (dễ chỉnh chỗ đáp, dễ chém trên không). Xuống: vây áp sát, bọt bị kéo ngược lên trên người. Đáp: nén 3 f + bụi. |

**Thông số nhảy (dùng để dựng map):**

Số dưới đây là **output của `_calc/metrics.py`** (mô phỏng bước 1/600 s, gồm treo đỉnh). Đổi tham số thì chạy lại script, không tính tay.

| | F0 Hình Hài Bị Nén | F1+ Đôi Chân |
|---|---|---|
| Tham số: cao danh nghĩa / t lên / t rơi | 80 px / 0,60 s / 0,45 s | 128 px / 0,68 s / 0,52 s |
| Trọng lực khi lên | g = 2h/t² = **444 px/s²**, v₀ = 267 px/s | **554 px/s²**, v₀ = 376 px/s |
| Trọng lực khi rơi | **790 px/s²** | **947 px/s²** |
| Treo ở đỉnh | g × 0,5 khi \|vy\| < 40 và giữ nút | như trái |
| **Cao tối đa thật** (gồm treo) | **81,5 px = 5,1 ô** | **129 px = 8,1 ô** |
| Cao tối thiểu (bấm nhả) | 24 px (1,5 ô) | 32 px (2 ô) |
| **Tổng thời gian bay** | **1,19 s** | **1,32 s** |
| **Nhảy xa tối đa** (đang chạy) | 150 × 1,19 ≈ **179 px = 11,2 ô** | 180 × 1,32 ≈ **237 px = 14,8 ô** |
| Tốc rơi tối đa | 420 px/s | 520 px/s |
| Điều khiển ngang trên không | 100% (đổi hướng tức thì) | 100% |
| Nhả nút sớm | vy × 0,45 | vy × 0,45 |

> **Dùng khi dựng map:** khe nhảy an toàn **F0 ≤ 10 ô, F1+ ≤ 13 ô**. Gờ lên được **F0 ≤ 4 ô, F1+ ≤ 7 ô** (lề 1 ô, `01` Q1.5). Đỉnh nhảy tính ở **chân** hero.

## Q2.3 — Dash (Quẫy Vây → Dash Áp Suất → Mạch Lướt)

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Dash dài bao nhiêu, nhanh bao nhiêu, có bất tử (i-frame) không, hồi bao lâu, nâng cấp thế nào. **Vì sao đúng con số đó, không phải số khác?** |
| **Phương án** | Quãng: (A) ngắn 2–3 ô (chỉ né), (B) trung 4–7 ô (né + băng khe), (C) dài ≥ 9 ô (chủ yếu di chuyển). I-frame: không / ngắn / dài. Có từ đầu hay chờ Boss 1. |
| **Chọn** | Ba bậc, bảng dưới. **Có dash ngắn từ phút đầu**; Boss 1 nâng thành dash dài + i-frame; Boss 3 thêm lướt trên không 2 lần. |
| **Vì sao (chọn quãng 7 ô cho Dash Áp Suất)** | Bốn lý do độc lập cùng ra ~7 ô: **(1) Chuẩn thể loại:** HK dash = 17,5% bề rộng màn (`R1` §4). 640 × 17,5% = 112 px = **7 ô**. **(2) Hình học cổng:** khe khóa bằng dash phải ≥ nhảy xa + 2 ô (chắc chắn không nhảy qua được) và ≤ nhảy xa + dash − 1 ô (chắc chắn dash qua được). F1 nhảy xa 14,8 ô ⇒ cửa sổ 16,8–20,8 ⇒ **khe nguyên 17–20 ô (4 cỡ)**. Dash 5 ô chỉ cho 16,8–18,8 ⇒ 17–18 (2 cỡ), quá chật cho người dựng map. **(3) Chiến đấu:** quái thường to nhất ~3 ô (`05`), tầm vung ~2 ô. Dash xuyên qua người quái cần ≥ 5 ô; 7 ô dư 2 ô sau lưng quái, **đúng bằng tầm chém F1 (32 px = 2 ô, `04`)** ⇒ xuyên qua, quay lại chém trúng ngay. **(4) Đọc được:** 0,2 s ở 560 px/s; lookahead 115 px (`01` Q1.4) ≥ 112 px nên luôn thấy điểm đáp trước khi dash. |
| **Vì sao (có dash ngắn từ đầu)** | Lore cũ chỉ cho dash từ Boss 1 (mâu thuẫn L2 trong 00). Khung thiết kế của bạn ghi dash là **cơ chế lõi**. Thêm nữa, F0 đi chậm (150 px/s) mà không có dash thì 1–1,5 giờ đầu đúng kiểu "trừ bớt" bị ghét (`DeepSeaMV-08`). Silksong có dash (Swift Step) rất sớm; HK có dash (Mothwing Cloak) ở ~1,5 h (`R6` §1.2). Quẫy Vây ngắn, không i-frame, nên vẫn còn chỗ cho Boss 1 nâng cấp thành bước nhảy vọt. |
| **Vì sao i-frame ngắn (0,13 s)** | Celeste, HK: không i-frame; Nine Sols ~0,4 s; Dead Cells có (`R1` §4). Lore Đôi Chân ghi "Dash Áp Suất (có frame né xuyên đòn)". Chọn **ngắn** (8 f): đủ xuyên một nhát chém đúng lúc, không đủ "lướt bừa qua mọi thứ". Tức là thưởng cho việc canh giờ, khớp với đỡ đòn kiểu canh giờ (04). i-frame 0,4 s như Nine Sols cộng hồi 0,5 s thì gần như bất tử khi spam, phá thiết kế boss (`R4` cửa sổ phạt). |
| **Bằng chứng** | `R1` §4, §9; `R2` §4.1; `R6` §1.2; `R8` §4.3 (đóng băng 3 f khi bắt đầu dash, Celeste `Freeze(.05f)`). |
| **Lore** | Quẫy Vây: vây lưng và chân màng đạp nước một nhịp. Dash Áp Suất: đôi ủng mang vây lái thủy lực (vessel-1-stride) nén nước phụt ngược, nên có bọt chân không bao quanh người, đòn chém trượt qua. Mạch Lướt: màng Hải Quang của Thân Mình cho lướt dòng năng lượng. |

| | **T0 Quẫy Vây** (đầu game) | **T1 Dash Áp Suất** (Boss 1, F1) | **T2 Mạch Lướt** (Boss 3, F3) |
|---|---|---|---|
| Quãng | **64 px = 4 ô** | **112 px = 7 ô** | 112 px; **2 lần trên không** |
| Thời gian | 0,16 s (400 px/s) | 0,20 s (560 px/s) | 0,20 s |
| Đóng băng đầu dash | 2 f | 3 f | 3 f |
| I-frame | **không** | **f3–f10 (0,13 s)** | như T1 |
| Hồi chiêu | 0,45 s | 0,50 s | 0,50 s mỗi lần |
| Trên không | 1 lần, nạp lại khi chạm đất / đạp tường | như trái | **2 lần**; nạp lại khi chạm đất, đạp tường, móc neo, **chém trúng quái trên không (1 lần)** |
| Hướng | ngang | ngang + chéo xuống | 8 hướng |
| Xuyên vật | — | phá **vách hà mục** (ván mục, lưới cào cũ) | lướt xuyên **Mạch Phù Ấn mỏng** |
| Stamina | 0 | 0 | 0 |
| Hủy được | hủy giai đoạn hồi của đòn chém (xem 04) | như trái | như trái |
| Sau dash | 6 f mới chém được (chống "dash-chém" vô hạn) | như trái | như trái |

- **Dash không tốn stamina.** Lý do: dash là động từ chiến đấu. Nếu tốn stamina thì stamina trở thành tài nguyên chiến đấu, trái khung "stamina dùng trong khám phá" và tạo hai lần phạt cho người chơi chủ động (`R6` §4.3). Hồi chiêu đủ để ngăn spam.
- **Nạp dash khi chém trúng trên không (T2):** cho phép chuỗi trên không. Tiền lệ: HK nảy (pogo) nạp lại dash; Celeste nạp khi bật lò xo; nguyên tắc "các lần nạp lại mới tạo ra chuỗi" (`R6` §2.2).

## Q2.4 — Đạp tường (Wall-Kick, F1) & Dậm Nặng (Heavy Stomp, F1)

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Đôi Chân mở đạp tường. Bám bao lâu, đạp cao bao nhiêu, có tốn stamina không. Dậm nặng là gì. |
| **Chọn — Đạp tường** | Chạm tường khi đang rơi ⇒ trượt bám **60 px/s**. **Chỉ đạp được khi vy ≤ 0** (ở đỉnh hoặc đang rơi, sát tường ≤ 4 px). Đạp ⇒ bật ngược **vx 220 px/s** (khóa hướng 0,15 s) + **vy 330 px/s**. Vì luôn đạp từ đỉnh nên mỗi cú lên **cố định 98 px = 6,15 ô** (330² ÷ (2 × 554)), mất **0,6 s** mỗi cú. Bám tường tốn **10 stamina/s**, mỗi cú đạp **15 stamina**. |
| **Vì sao** | 1) **Độ cao mỗi cú phải cố định** để người dựng map tính được. Nếu cho đạp lúc đang bay lên thì mỗi cú lên 60–98 px tùy thời điểm bấm (người soát phát hiện); luật "chỉ đạp khi vy ≤ 0" cho đúng một giá trị. 2) Nhịp 0,6 s mỗi bên: chậm, nặng, đúng thân chì, vẫn leo ~165 px/s (gần tốc đi). 3) Stamina 100 / 15 ≈ 6 cú ⇒ leo tối đa **~37 ô (1,6 màn)** không nghỉ; giếng dài hơn phải có **gờ nghỉ** (Q2.7). Đây là quyết định "can I make it" có chủ ý (`R6` §4.2). Celeste: cú đạp từ trạng thái leo tốn 27,5/110 ≈ 4 cú mỗi thanh (`R6` §4.1). 4) Ngưỡng 4 px: Celeste 3 px ở 320 px (~6 px ở 640), Super Metroid 6 px; lấy 4 px vì hitbox ta rộng hơn. |
| **Chọn — Dậm Nặng** | Trên không giữ ↓ + chém ⇒ lao thẳng xuống **600 px/s**. Đáp: sóng chấn 2 ô mỗi bên (sát thương nhẹ, đẩy quái), **phá ván mục / sàn sập**, **đè nút áp suất**, **nảy cao trên mặt hồ muối** (Q2.8). |
| **Vì sao** | Một động tác phục vụ cả di chuyển, chiến đấu lẫn tương tác (luật "mỗi khóa ≥ 2–3 công dụng", `R6` §7.2). Tiền lệ: HK Desolate Dive (phá sàn + sát thương + i-frame), Ori Stomp (`R6` §1.2). Lore: "Dậm Nặng phá ván mục & bám đất" (five-vessels-of-form). |

## Q2.5 — Móc Neo (Anchor-Grapple, F2)

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Móc kéo thẳng hay đu dây? Tầm? Bám vào đâu? |
| **Phương án** | (A) Đu dây (con lắc) như Bionic Commando. (B) **Kéo thẳng (winch)** tới vòng neo rồi giữ quán tính. (C) Bám mọi bề mặt. |
| **Chọn** | **(B), chỉ bám vòng neo đồng (brass ring) và quái nhẹ.** Tầm **160 px (10 ô)**, tự nhắm vòng gần nhất trong nón 60° phía trước. Kéo **480 px/s**. Tới nơi: giữ nút ⇒ treo (tốn **8 stamina/s**); nhả ⇒ văng tiếp theo quán tính 70%. Móc hụt: không hồi chiêu. |
| **Vì sao** | 1) Đu dây cần không gian vòng cung rộng, khó đọc trong khung 6–7 H, và người dựng map phải tính cung tròn. Kéo thẳng thì hình học hành lang đơn giản (`R2` §6 "pendulum vs winch decides arched vs straight corridor"). 2) Chỉ bám **vòng neo** (vật độc nhất, màu đồng ấm) ⇒ khóa mang tính mốc nhìn (`R2` §4.2). 3) Vực khóa bằng móc phải **≥ 30 ô** để cả Mạch Lướt 2 lần dash (F3) cũng không qua được: 14,8 + 2 × 7 + 1 = 29,8 (`R2` §4.1 "w > Jw + Dmax + 1"); vòng neo cách nhau ≤ 0,8 × tầm = 8 ô (`R2` #24). 4) Móc hụt không hồi chiêu (đề xuất `R6` §2.2), tránh phạt khi nhắm hụt. |
| **Lore** | Đôi Tay người với dây thừng buộc kiếm (Kiếm Buộc Dây!). Móc chính là **thanh kiếm buộc dây phóng ra cắm vào vòng neo** của giàn tời Hội Trục Vớt / vòng đồng Thal-Vael. Lore giải thích luôn vì sao chỉ bám vật kim loại cố định. |
| **Cảm giác** | Phóng: tiếng dây rít + kiếm cắm "keng" 2 f hitstop. Kéo: vệt bọt thẳng. Văng ra: tóc khăn đỏ bay. |

## Q2.6 — Bơi 360° (chỉ trong Vùng Bơi, < 35% bản đồ)

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Vào vùng bơi (Mạch Phù Ấn, hồ muối, cột nhiệt, sảnh Lõi Neo), tốc độ và điều khiển ra sao để là phần thưởng chứ không phải hình phạt? |
| **Chọn** | Tốc bơi **190 px/s** (F1+; F0 = 160), 8 hướng (analog nếu tay cầm). Tăng tốc 0,08 s; nhả nút giảm về 0 trong 0,25 s (có sàn: dưới 4 px/s là dừng hẳn). Đổi hướng > 100° thì gia tốc ×2. **Dash bơi** = dash hiện có, đủ quãng (không giảm ×0,75 như Celeste). Vào vùng: vy × 0,5, giữ 80% quán tính 0,3 s. Ra vùng: 0,12 s "coyote" nổi trước khi chì kéo xuống. |
| **Vì sao** | 1) Notebook đề xuất bơi 95–115% tốc chạy (`DeepSeaMV-08`, nhãn đề xuất). Celeste 0,67–0,89× (`R1` §6.2), nhưng ở Celeste nước là chướng ngại. Ở game này vùng bơi là **tự do**, trụ cột 1. 190/180 = 1,06×. 2) Chống trôi: giảm tốc khi nhả nút + sàn dừng hẳn + giảm trôi ngang (`R8` §8 "split drag, stop snap, turnaround boost"). 3) Dash bơi không giảm vì người chơi sẽ cảm nhận dash yếu đi khi vào nước, mà đây là phần thưởng. |
| **Lore** | 4 loại vùng thắng Áp Lực Chì (fivefold-severance §2A): Mạch Phù Ấn (cân bằng thủy tĩnh), hồ muối (lực đẩy lớn), cột nhiệt (lực nâng), Khoang Triệt Tiêu (Tầng V). |
| **Cảm giác** | Vào vùng: tiếng "vụt" + âm đục sweep xuống (chỉ bus môi trường, `R8` §7.2). Vây xòe hết cỡ, tư thế đổi từ đi sang lượn. Camera trộn thông số 0,45 s. |
| **Rủi ro & đo** | Cảm giác "rời vùng bơi rơi bịch". Đo bằng playtest: số lần chết do rơi ngay sau mép vùng; mục tiêu ≈ 0. |

## Q2.7 — Stamina (chỉ cho khám phá)

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Khung thiết kế: "thanh stamina dùng trong khám phá map". Tiêu vào đâu, hồi khi nào, để là quyết định thú vị chứ không là đồng hồ phạt? |
| **Phương án** | (A) Kiểu Souls: mọi hành động tốn stamina. (B) Kiểu Celeste: chỉ leo/bám tường, chạm đất là đầy. (C) **Chỉ tốn khi "gắng sức với môi trường"**: bám tường, đạp tường, treo móc, chống dòng, lặn hồ muối. Hồi khi đứng nơi yên (không trong dòng), có độ trễ. |
| **Chọn** | **(C).** Bảng dưới. **Chém, bắn, dash, đi, nhảy: 0 stamina.** |
| **Vì sao** | 1) `R6` §4.2 tổng hợp: stamina gây khó chịu khi tụt lúc đứng yên, khi chặn đòn tấn công lõi trong game thiên chiến đấu, khi hồi chậm hoặc mù mờ, khi phạt chết không có ân hạn, khi đánh thuế lúc quay lại vùng đã xong. Nó thêm quyết định khi tiêu vào một pha gắng sức có chọn lựa, hồi nhanh và dễ đọc, có mục tiêu "tới được không" nhìn thấy trước, nâng cấp nhìn thấy được. (C) thỏa hết vế sau, tránh hết vế trước. 2) Không làm kiểu Celeste "chạm đất là đầy" vì hero gần như luôn đứng đáy, stamina sẽ vô nghĩa (`R6` §7.5). Hồi khi **ra khỏi dòng chảy / đứng gờ nghỉ** thì mỗi giếng, mỗi dòng xiết thành một bài "đi từ gờ nghỉ này sang gờ nghỉ kia". 3) Không chạm chiến đấu, vì mana đã chỉ hồi bằng chém; trừ stamina khi chém là phạt kép người chơi chủ động (`R6` §4.3). |
| **Lore** | Nước đặc gấp ~820 lần không khí (fivefold-severance §2B). Gắng sức chống dòng / treo người làm mỏi cơ. Còn chém kiếm thì dùng **chính trọng lượng chì** rơi theo lưỡi kiếm, gần như không tốn sức: đây là chỗ sửa lore L1. |
| **Cảm giác** | Thanh stamina chỉ hiện khi đang tiêu (ẩn khi đầy). Dưới 20: thở bọt dồn dập, tay run, rung tay cầm nhẹ (ngưỡng 18% của Celeste, `R6` §4.1). Hết stamina: **tuột tay / bị dòng đẩy lùi, không mất máu** (trụ cột 3). |

| Hành động | Tốn | Số hành động mỗi thanh 100 |
|---|---|---|
| Bám tường (trượt) | 10 /s | ~10 s |
| Đạp tường | 15 /cú | ~6 cú |
| Treo trên vòng neo | 8 /s | ~12 s |
| Đi ngược dòng chảy mạnh (chỉ khi **neo chân**, tốc còn 40% = 72 px/s) | 25 /s | ~4 s ≈ 18 ô |
| Đứng **neo chân** chống dòng (giữ ↓) | 10 /s | ~10 s |
| Lặn dưới hồ muối (khi có Áo Osmotic) | 5 /s | ~20 s với thanh gốc (khớp lore "20 s kháng thẩm thấu"); tới 40 s với thanh 200, coi là phần thưởng nâng cấp |
| Bơi ngược dòng trong vùng bơi | 20 /s | ~5 s |

| Hồi phục | Giá trị |
|---|---|
| Điều kiện | đứng trên mặt đất / gờ / trong nước lặng, **không** trong dòng chảy, **không** bám tường |
| Độ trễ trước khi hồi | 0,4 s |
| Tốc hồi | 60 /s (0 → 100 trong ~1,7 s) |
| Hồi tại chỗ đặc biệt | **"Túi nước lặng"** (eddy, đằng sau trụ đá trong dòng chảy) và **vòng neo có đế** hồi 40 /s ngay cả giữa dòng |
| Trần stamina | 100 → **200** (5 nâng cấp × 20: **1 mua ở Lão Boyle, 3 trong khám phá, 1 từ Thân Mình F3**; nguồn chuẩn ở `09` Q9.2) |

> **Luật dựng map gắn với stamina (tính với thanh gốc 100):** trong giếng đạp tường, cứ **≤ 30 ô** chiều cao phải có một gờ nghỉ (6 cú × 6,15 ô ≈ 37 ô, lề ~7 ô). Trong dòng chảy ngược, cứ **≤ 13 ô** (3 s × 72 px/s) phải có túi nước lặng. Muốn làm đoạn "thử thách stamina" vượt luật này thì chỉ đặt ở **nhánh tùy chọn có phần thưởng** (`R2` #27 risk–reward branch).

## Q2.8 — Tương tác môi trường của di chuyển

| Môi trường | F0 | F1+ | Lý do / lore |
|---|---|---|---|
| **Dòng chảy ngang** (Khe Dòng Xiết, ống xả) | dòng ≥ 1,4× tốc đi thì bị đẩy lùi | **neo chân** (giữ ↓, 10 stamina/s) đứng vững; vừa neo vừa đi tới thì tốc **còn 40% (72 px/s)**, tốn 25 stamina/s | Lore: Đôi Chân "bám đất kháng dòng xiết". Ngưỡng dòng chặn 1,4–2,2× tốc bơi (đề xuất notebook 03, chưa kiểm) |
| **Dòng chảy xuống trên hố** | cú nhảy bị dìm (trọng lực +50%) | dash cắt ngang thẳng (dash bỏ qua trọng lực) | R2 §6 "down-current over pit = dash gate" |
| **Hồ muối (halocline)** | đáp xuống mặt hồ ⇒ **nảy lên cố định 11 ô**; không chìm | nảy thường 11 ô; **Dậm Nặng ⇒ nảy 15 ô**; có Áo Osmotic ⇒ lặn xuống (5 stamina/s) | Lore: hồ muối 1.320–1.400 kg/m³. Nảy cố định theo ô (`_calc`): gờ **chỉ** lên được bằng nảy thường = **10 ô** (F1 nhảy 8,1 + lề 1 = 9,1 ⇒ 10; nảy 11 − lề 1 = 10); gờ chỉ lên bằng Dậm = **12–14 ô**. F0 nảy thường với tới gờ ≤ 10. Bản trước nảy 9 ô, sau khi F1 nhảy 8 ô thì không còn mở được gì (người soát vòng 2). **Cấm** đặt hồ muối trong 10 ô quanh cổng gờ / tường (03 Q3.10) |
| **Cột nhiệt (vành ngoài)** / **cột khí lưu huỳnh** | nâng 2 lần tốc bơi lên trên | như trái | Lore "thang máy sinh tử"; lõi cột nhiệt gây bỏng. **Cấm** đặt trong 10 ô quanh cổng gờ / tường (03 Q3.10) |
| **Trần dầu úp ngược** | chạm ⇒ dính, chậm 70%, kéo dần vào trần | dash xuống thoát | Lore kelp-oil-caverns: dầu nhớt gấp 12 lần |
| **Túi khí (dome)** | trong dome trọng lực "cạn", nhảy như trên bờ | — | Vùng an toàn, đổi nhịp (R2 §6) |
| **Màn bọt khí** | đi xuyên được; giảm 85% sát thương sóng nổ khi đứng trong | — | Lore Hẻm Chuông; dùng ở 05/06 |

## Q2.9 — Độ "dễ dãi" của điều khiển (forgiveness)

| Thông số | Giá trị | Nguồn |
|---|---|---|
| Coyote time (nhảy sau khi rời mép) | **6 f (0,1 s)** | Celeste 0,1 s; HK 40 ms; Silksong 80 ms (`R1` §5). Lấy mức dễ nhất vì hero nặng, bước dài |
| Nhớ phím nhảy (jump buffer) | **6 f** | `R8` §4.3 |
| Nhớ phím dash | **9 f (0,15 s)** | HK nhớ dash 200 ms (`R1` §5) |
| Nhớ phím chém | **7 f** | `R3` §4.4 (đòn đánh chịu được 6–8 f) |
| Chỉnh góc khi nhảy cụng mép trần | đẩy ngang tối đa **8 px** | Celeste 4 px / hitbox 8 = 50%; ta 8 / 16 = 50% |
| Chỉnh góc khi dash chạm mép gờ | nâng lên tối đa **8 px** | Celeste "dash corner correction" |
| Nhận đạp tường | cách tường ≤ 4 px | Q2.4 |
| Ra khỏi vùng bơi | 0,12 s treo | Q2.6 |
| Mép vực "dính" | đi chậm (thả cần analog < 30%) không rơi khỏi mép | đề xuất (suy luận); đo ở playtest |

> Vì sao dễ dãi tối đa? Thorson: "everything is fudged a tiny bit in the player's favor… it wants you to succeed" (`R1` §5, `R8` §0). Độ khó của game nằm ở **thiết kế phòng và quái**, không nằm ở việc điều khiển cứng tay.

## Q2.10 — Những gì cố ý KHÔNG làm

| Không làm | Vì sao |
|---|---|
| **Nhảy đôi** | Trái lore (thân chì, vây chỉ nâng một nhịp). Chiều dọc đã có đạp tường (F1), móc neo (F2), Mạch Lướt 2 lần (F3), cột nhiệt, hồ muối nảy. Thêm nhảy đôi làm loãng các cổng này. |
| **Thanh oxy** | Lore: mang lọc oxy vô tận. Trụ cột 3. `DeepSeaMV-08`: đồng hồ oxy là lỗi kinh điển. |
| **Quán tính trượt khi đi** | Nặng ⇒ ghim chân. Tạo cảm giác "trơn" trái lore và bị chê (Q2.1). |
| **Cổng ngược theo kích thước** (lớn lên rồi không chui lọt hang cũ) | Nguy cơ khóa đường; biến lớn lên thành hình phạt (`01` Q1.2). |
| **Chạy nhanh (sprint)** | Thêm nút. Vai trò tăng tốc đã có dash + dòng chảy tốc hành (`08`). |

## Q2.11 — Bò dẹt (tự động, không phải năng lực)
Khi trần thấp hơn hitbox đứng, hero **tự chuyển sang bò dẹt**: hitbox cao **24 px**, tốc **60 px/s**, không nhảy / chém được. Dash vẫn dùng được và cũng giữ hitbox 24 px. Dùng cho **khe bò 2 ô (32 px)** dẫn tới bí mật. Vì sao: bản trước ghi "khe chui 4 ô ép phải lướt", nhưng hitbox cao nhất chỉ 56 px < 64 px nên ai cũng đi thẳng qua được, và "dash cúi người" chưa hề được định nghĩa (người soát phát hiện). Khe bò **không phải cổng năng lực**, chỉ là lối bí mật cần quan sát.
