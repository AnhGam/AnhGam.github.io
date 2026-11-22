# 08a — Thiết Kế Khu Vực: Tầng I & II

> Phụ thuộc vào: `01`–`07`, lore `locations/*.md`, `depth-strata-and-swim-zones.md`, `_research/R2`, `R7`.
> Phần 2 (Tầng III–V) ở `08b`. Danh sách phần thưởng tổng và kinh tế ở `09`.

## Q8.0 — Khung chung cho mọi khu

| Ô | Nội dung |
|---|---|
| **Thời lượng cốt truyện chính** | **~11 giờ** lần đầu (100% ~16 giờ). Lý do: game một người làm, 8 khu; tham chiếu Ori 8–11 giờ, Dread 8,5 giờ (`R6` §1.1). Đủ dài để 5 lần biến hình có không gian; đủ ngắn để mật độ năng lực dày như nhóm game "dày" (20–50 phút / thứ mới, `R6` §1.3). |
| **Ngân sách khu** | bảng dưới |
| **Mỗi khu bắt buộc có** | 1 bản sắc thị giác (lore), **2–3 cơ chế đặc trưng** dạy theo khởi-thừa-chuyển-hợp (Hayashida), ≥ 2 lối vào/ra, ≥ 1 vòng lặp nhỏ mỗi 4–7 phòng, 1 đường lên nhanh mở từ dưới, Chuông Lặn mỗi 6–10 phòng, 14–20 vật phẩm (bảng chuẩn `09` Q9.8), ≥ 3 cổng "trêu" cho năng lực sau, mốc kiến trúc mỗi sảnh. |
| **Vùng bơi** | Tổng **~25%** (< 35% đã chốt). Hiện tính **theo số phòng** làm ước lượng diện tích; đo diện tích thật (ô vuông) ở greybox. Bảng dưới. |

| # | Khu | Tầng | Thời gian (phút, lần đầu) | Số phòng ~ | Vùng bơi | Bộ kỹ năng khi vào | Boss |
|---|---|---|---|---|---|---|---|
| 1 | Nghĩa Địa Thuyền Đắm | I | 75 | 28 | 10% | F0 | B1 |
| 2 | Hang Tảo Huyết & Trần Dầu | I-W | 40 | 16 | 20% | F0 + súng (vào được từ đầu, sâu hơn cần F1) | — |
| 3 | Hẻm Chuông Công Nghiệp | II | 110 | 40 | 15% | F1 | B2 |
| 4 | Hầm Muối Cổ Tích | II-E | 50 | 20 | 40% | F1 (sâu hơn cần F2, Osmotic) | — |
| 5 | Cổ Thành Nere-Keth | III | 120 | 44 | 30% | F2 | B3 |
| 6 | Thánh Đường Ống Vang | III-W | 50 | 20 | 25% | F2 | — |
| 7 | Rãnh Hóa Thạch Leviathan | IV | 120 | 44 | 20% | F3 | B4 |
| 8 | Tế Đàn Lõi Neo | V | 30 | 8 | 100% | F4 | B5 |
| | **Tổng** | | **595 + ~60 quay lại ≈ 11 giờ** | **~220** | **~25%** (theo số phòng) | | |

> Rủi ro phạm vi: ~220 phòng là nhiều cho một người làm. Đòn bẩy cắt giảm (đã xếp thứ tự): (1) gộp Ống Vang vào Cổ Thành (−20 phòng), (2) rút Hầm Muối còn 12 phòng, (3) giảm phòng di chuyển nối. Không cắt boss, không cắt khu có Hóa Hình.

---

## KHU 1 — NGHĨA ĐỊA THUYỀN ĐẮM (180–340 m)

### 1.1 Bản sắc
| Mục | Nội dung |
|---|---|
| Cảm xúc | *Khởi đầu hoài nghi*: kỳ lạ, lạnh sống lưng, nhưng an toàn (lore depth-strata) |
| Mốc lớn | rừng cột buồm chìm như nghĩa địa thánh giá; soái hạm Đô Đốc gãy đôi; Chuông Lặn Số 1 treo dây cáp lên mặt nước (mốc dọc: dây cáp luôn chỉ "lên") |
| Màu | lục xám `#3E6B6D`, cát `#8A8365`, ánh lọc `#92D1C2`, điểm nhấn cờ đỏ `#9E1F28` |
| Âm | gỗ sồi kẽo kẹt, xích kéo trên cát, chuông đồng 3 nhịp gần trạm Boyle |

### 1.2 Cơ chế đặc trưng (khởi-thừa-chuyển-hợp)
1. **Thân tàu nghiêng làm dốc và cầu** (đi bộ, nhảy). Khởi: dốc boong 20°; Thừa: cột buồm gãy bắc qua khe; Chuyển: **ván mục sập** dưới chân (sau B1 thì có Dậm Nặng chủ động phá); Hợp: chạy qua chuỗi ván mục trên hố.
2. **Khe Dòng Xiết (dòng nước giữa hai mạn tàu)**: vùng bơi 360° nhỏ, đẩy lên tầng cột buồm cao. Khởi: dòng nâng thẳng; Thừa: dòng ngang đẩy lùi (F0 chưa chống được ⇒ phải nấp sau sườn tàu chờ dòng yếu, dòng 4 s mạnh / 2 s yếu); Chuyển: Hà Đục Khoan thò ra trong dòng; Hợp: lên đấu trường B1 qua dòng.
3. **Súng làm đèn và chìa** (sau phút 25): bắn khóa gỉ, chớp sáng làm Hải Quỳ rụt.

### 1.3 Địa hình đoạn đầu (8 phòng đầu, chi tiết từng phòng)

| Phòng | Kích thước | Địa hình (ô) | Dạy / kiểm tra | Quái | Ghi chú |
|---|---|---|---|---|---|
| **1-01 Túi Bùn Tỉnh Dậy** | 1 × 1 màn | sàn bùn phẳng 24 ô, **bậc 2 ô → 3 ô → 4 ô** lên phía phải (cầu thang so le, nhịp swing). Trần cao | đi, nhảy (bấm ngắn / giữ lâu: bậc 2 ô cần nhảy ngắn, bậc 4 ô cần giữ) | 0 | Phòng khóa: chỉ ra được bằng nhảy giữ nút. **Không chữ hướng dẫn**: cảnh tỉnh dậy, hero ghê tởm vảy mình (lore), rồi Ấn Ký La Bàn nháy về phía phải |
| **1-02 Lườn Tàu Hậu Cần** | 2 × 1 màn | dốc boong nghiêng xuống 20°; **khe 6 ô có đáy cát** (bản tập), rồi **khe 8 ô trên đáy cát sâu 3 ô** | khe thường (≤ 10) | 0 | **Cổng trêu #1**: khe nứt đá vôi phía trái tối, có ánh đỏ Huyết Tảo (Hang Tảo, vào được nhưng sâu bên trong bị nút sáp) |
| **1-03 Khe Quẫy Vây** | 1 × 1 | **khe 14 ô** (F0 nhảy xa 11,2 không qua được), đáy sâu **7 ô vách trơn** (F0 nhảy 5,1 không leo lên được) + **dốc cát dẫn ngược về mép xuất phát**. Ngay trước khe là **vỏ cá chết** gợi "ký ức cơ bắp" Quẫy Vây | **nhận Quẫy Vây** (phút ~3) | 0 | Phòng khóa đúng nghĩa (03 Q3.5 bước 1): bản trước để đáy ≤ 4 ô thì F0 rơi xuống rồi nhảy lên mép kia được, không cần kỹ năng (người soát phát hiện). Lore: phản xạ cơ bắp hải tặc còn nguyên |
| 1-04 Trần Thấp Bùn | 2 × 1 | hành lang **trần 5 ô**, sàn bùn; 2 khe 14 ô (một có đáy, một trên **san hô gai**) | Quẫy Vây dưới trần thấp; giá thất bại tăng (bước 2 → 3) | 1 Hà Đục Khoan (thò ra ở vách, bài "đứng yên") | Rương nhỏ 5 Sv trên gờ 4 ô |
| 1-05 **Ngã Ba Cột Buồm** (sảnh) | 2 × 2 | rừng cột buồm cao, cầu cột buồm gãy bắc qua 3 tầng, bục một chiều | điều hướng dọc, chọn đường | 2 Lính Kiếm Móc (lần đầu gặp quái, tách xa nhau) | **Mốc**: cột buồm lớn nhất có cờ đỏ Xích Kỳ. **Cổng trêu #2**: **Mỏm Cột Buồm Cờ Đỏ** trên cao (gờ 7 ô, cần F1). Dây cáp Chuông 1 thấy ở bên phải |
| **1-06 Chuông Lặn Số 1 (Boyle)** | 1 × 1 | khoang khô 1 atm | lưu, cửa hàng, nạp bình | 0 | Phút ~12. Lão Boyle: bán Ấn Huyết Tràn, +1 bình, +1 Vảy, +stamina (sau F1) |
| 1-07 Xưởng Phế Liệu | 1 × 1,5 | khoang tàu đổ, xác thợ lặn cầm súng; 2 **Bụi Tinh Thể Hải Quang** mọc trên vách | **nhận Súng Phép** (phút ~25), **mana đầy 99 khi nhặt** | 0 | Phòng khóa: cửa ra bị **khóa gỉ tâm ngắm đồng xanh-hổ phách ở trên cao** (không dùng màu đỏ để tránh lẫn Đòn Đỏ, `16` P1), chỉ bắn mới mở. Có mana sẵn + bụi tinh thể chém được ⇒ không thể kẹt vì hết mana (03 Q3.10 luật 9) |
| 1-08 Hang Hải Quỳ | 2 × 1 | hành lang tối, 3 bụi Hải Quỳ chặn kín; cụm bào tử trên vách | súng làm đèn: chớp sáng / bắn bào tử ⇒ Hải Quỳ rụt 3,5 s ⇒ đi qua | 3 Hải Quỳ, 1 Xạ Thủ Súng Ẩm ở cuối | Bài **chém để bắn** lần đầu: không đủ mana thì chém Bầy Cá… (không có ở đây) ⇒ phải chém Xạ Thủ lấy mana. Đặt 1 Lính Kiếm trước cửa để có nguồn mana |

### 1.4 Phần giữa & cuối khu
- **Vòng lặp nhỏ 1** (phòng 1-05 → 1-12 → cắt dây chằng mỏ neo thả thang ròng rọc về Chuông 1; lore shipwreck §4.3).
- **Boong Tàu Đô Đốc** (285 m): Thuyền Phó Tàn Quân (tinh nhuệ) gác **Bản Ghi #2** + bùa Lưỡi Dây Dài.
- **Đường tới B1**: Khe Dòng Xiết (cơ chế 2) → **Chuông Lặn Tiên Phong** (310 m, 0 quái, ≤ 10 s tới cửa B1) → đấu trường.
- **Sau B1 (F1)**: lối ra là **giếng đạp tường 4 ô** (phòng khóa) → lên lại Ngã Ba Cột Buồm từ phía trên (vòng chiến thắng) → **Mỏm Cột Buồm Cờ Đỏ** (gờ 7 ô, đã thấy từ phút ~15) có rương vàng lớn + 1 Hạt Hải Quang.
- **Đi xuống Tầng II**: **Giếng Cáp Đứt** sau khoang Đô Đốc. Khe 18 ô chỉ qua bằng Dash Áp Suất ⇒ mở Hẻm Chuông.

### 1.5 Quái & mật độ
| Vùng | Loài | Phòng chiến đấu / tổng |
|---|---|---|
| Lườn tàu, cột buồm | Lính Kiếm, Lính Lao, Xạ Thủ, Cua Quan Tài (2 con, giả rương **cạnh rương thật** ⇒ dạy nghi ngờ) | 7 / 28 |
| Trong thân tàu | Hà Đục Khoan | 3 |
| Khe Dòng Xiết | Hà Đục Khoan trong dòng | 1 |
| Boong Đô Đốc | Thuyền Phó (tinh nhuệ) + 2 Lính Kiếm | 1 |

### 1.6 Phần thưởng
Xem bảng chuẩn `09` Q9.8 (khu 1: 18 vật). Điểm thiết kế: 1 trong 5 rương là **Cua Quan Tài** giả rương, đặt cạnh rương thật ⇒ dạy nghi ngờ; San Hô Lam Ngọc ×3 đặt chỗ dễ thấy ⇒ dạy "vật liệu không cần cày".

### 1.7 Lần quay lại
- F2 (móc): vòng neo trên Khe Dòng Xiết ⇒ đỉnh cột buồm lớn: Mảnh Vảy.
- F3 (Mạch Lướt): khe 24 ô giữa hai xác tàu ⇒ bùa.
- F4 (Sonar): tường cộng hưởng giả trong khoang Đô Đốc ⇒ lore Vane Râu Sắt.
- Quái quay lại: Lính Kiếm 45 máu, kiếm bậc 2–3 ⇒ **2 nhát** (từ 4 nhát ban đầu): cảm giác mạnh lên (`R5`). Quái nhỏ 25 máu ⇒ 1 nhát từ bậc 3.

---

## KHU 2 — HANG TẢO HUYẾT & TRẦN DẦU (280–480 m, nhánh Tây)

### 2.1 Bản sắc
| Mục | Nội dung |
|---|---|
| Cảm xúc | *Ngột ngạt & khám phá*: rủi ro bẫy trần |
| Mốc | rừng Huyết Tảo đỏ cao 30 m (ngoại lệ đỏ duy nhất Tầng I); trần dầu đen óng cầu vồng; xác thợ lặn kẹt nửa người trong túi dầu trên trần (vignette lore) |
| Vai trò thiết kế | **Nhánh tùy chọn có lợi**: bình máu thứ 3 sớm, Đạn Nhiệt, lối tắt Vòng Trái xuống Hẻm Chuông. Không bắt buộc cho cốt truyện ⇒ thưởng người tò mò |

### 2.2 Cơ chế đặc trưng
1. **"Bánh mì kẹp chất lỏng"**: cột khí lưu huỳnh (vùng bơi nâng lên) ở dưới, **trần dầu úp ngược** (dính, chậm 70%) ở trên ⇒ hành lang hẹp phải canh độ cao. Khởi: một cột khí, trần xa. Thừa: trần hạ dần còn 7–8 ô. Chuyển: **Đỉa Dầu Trần** rơi từ trần. Hợp: nhiều cột khí + trần thấp + đỉa.
2. **Đốt trần dầu** (Đạn Nhiệt, nhặt giữa khu): túi khí metan dưới trần nổ chớp **2–3 s**, thiêu đỉa, chảy nút sáp. Khởi: nút sáp chặn cửa nhỏ. Thừa: đốt để giết bầy đỉa. Chuyển: đốt thì trần sụt dầu cháy xuống ⇒ phải tránh. Hợp: lối tắt lớn xuống Hẻm Chuông.
3. **Rừng Huyết Tảo** (đi bộ chém dây leo): chém tảo cao ngang vai mở đường, ẩn rương; Giun ống (không có ở đây: Tầng IV) → thay bằng **Bầy Cá Mòi** trong cột khí (nguồn mana dễ).

### 2.3 Địa hình đoạn đầu (5 phòng)
| Phòng | Địa hình | Dạy | Quái |
|---|---|---|---|
| 2-01 Khe Nứt Đá Vôi | khe hẹp cao 6 ô, dốc xuống 30° | vào hang (đổi ánh sáng ấm → đỏ tối) | 0 |
| 2-02 Thảm Huyết Tảo | sàn sỏi dài 2 màn, tảo cao 3 ô che tầm nhìn; chém tảo lộ **rương giấu** | chém môi trường có thưởng | 1 Lính Kiếm |
| 2-03 Cột Khí Đầu Tiên | giếng 1 × 2 màn, 1 cột khí giữa nâng 2× tốc bơi; trần dầu ở **12 ô** phía trên đỉnh cột (xa, an toàn) | vùng bơi nâng | Bầy Cá Mòi (6) |
| 2-04 Hành Lang Kẹp | 3 cột khí nối nhau, trần dầu **hạ dần 8 → 7 ô** | canh độ cao giữa khí và dầu | 2 Đỉa Dầu |
| 2-05 **Lán Rigg** | túi khí khô | trạm buôn Rigg (sớm): bán Râu Dò Dòng, bản đồ nhánh | 0 |

### 2.3b Cao trào khu (không có boss chính)
- **Mini-boss Mẹ Đỉa Dầu** trong khoang trần dầu (tùy chọn, gác 1 Mảnh Bình) (`06` Q6.4).
- **Chạy trốn "Thoát Trần Dầu Cháy"** ngay sau khi đốt nút sáp lớn: lửa lan dọc trần 90 s, điểm hồi sinh giữa đường ở giây 45 (mọi độ khó), kết thúc ở hầm thoát Vòng Trái. D 5,5 / I 9 (`10b` Khu 2). Lý do: khu không có boss cần một đỉnh; đoạn chạy trốn mất rất ít người chơi (0,3–4%, `R10` §3) nếu có điểm hồi sinh giữa.

### 2.4 Kết nối & vòng lặp
- Vào: Khe Nứt từ Nghĩa Địa (từ đầu). **Nửa trước** (Thảm Huyết Tảo, cột khí, Lán Rigg, 2 Mảnh Bình) đi được bằng F0. **Nửa sau** bị chặn bởi **gờ 7 ô** (cần F1) ở phòng 2-07: Đạn Nhiệt (2-08), nút sáp, Vòng Trái, Gác Đá Tàu Trinh Sát. Lý do: bản trước để Đạn Nhiệt và lối Vòng Trái mở với F0 ⇒ F0 xuống được Tầng II, vừa có thể kẹt (không leo lên lại) vừa lấy được Bazan trước B1, phá khóa bậc kiếm (người soát phát hiện).
- **Vòng Trái (lớn)**: đốt nút sáp phòng cuối ⇒ hầm thoát thẳng xuống **tầng giữa Hẻm Chuông** (bỏ qua Giếng Cáp Đứt) ⇒ quay lại Nghĩa Địa không cần đi lại đường cáp.
- **Gác Đá Tàu Trinh Sát Xích Kỳ** (470 m): gờ 7 ô + đạp tường (F1) ⇒ rương vàng lớn + Hạt Hải Quang (lore kelp-oil §4.3).

### 2.5 Phần thưởng
Xem `09` Q9.8 (khu 2: 14 vật). Điểm thiết kế: 2 Mảnh Bình ở nửa trước + 1 Mảnh Bình ở Nghĩa Địa = 3 mảnh ⇒ người tò mò đi nhánh Tây sớm có **bình thứ 3 trước B1** (thưởng khám phá rõ ràng nhất của Tầng I).

---

## KHU 3 — HẺM CHUÔNG CÔNG NGHIỆP (450–760 m)

### 3.1 Bản sắc
| Mục | Nội dung |
|---|---|
| Cảm xúc | *Căng thẳng công nghiệp*: kim loại rên, sóng nổ |
| Mốc | khe vực dọc gắn giàn khoan đồng; **3 Chuông Lặn** (Số 2 kính lồi cong vào trong, Số 3 xưởng Marlow, Số 4 xác đấm lõm) làm mốc độ sâu; màn bọt khí trắng sủi |
| Màu | chàm sắt `#1E2E42`, đồng rỉ `#6E563B`, đèn amber `#E89B3C` (**dưới 450 m cấm đỏ/cam thụ động**, chỉ đèn và điểm yếu) |
| Hình dạng | **Trục dọc**: đi xuống rẻ, đi lên đắt ⇒ thang tời Chuông mở từ dưới làm đường lên nhanh |

### 3.2 Cơ chế đặc trưng
1. **Giàn khoan dọc + đạp tường** (vừa có F1). Khởi: giếng 4 ô đá rãnh. Thừa: giàn khoan so le, bục một chiều. Chuyển: **bục chuông treo đung đưa** (chu kỳ 3 s). Hợp: đạp tường + dash ngang giữa hai giàn.
2. **Màn bọt khí & sóng nổ**: Tôm Súng bắn đạn 2 nhịp; ống rò tạo màn bọt (giảm 85% sóng). Khởi: 1 Tôm Súng, 1 màn bọt ngay cạnh. Thừa: màn bọt **bật tắt theo van** (4 s bật / 2 s tắt). Chuyển: Dậm Nặng nút áp suất để giữ màn bọt bật. Hợp: B2.
3. **Hồ muối nảy**: đáy các khoang trũng. Khởi: nảy thường 11 ô lên gờ 10 ô (cao hơn nhảy F1). Thừa: Dậm Nặng nảy 15 ô lên gờ 12–14. Chuyển: Sao Biển lăn rơi xuống hồ. Hợp: chuỗi nảy giữa 3 hồ.

### 3.3 Địa hình đoạn đầu (6 phòng)
| Phòng | Kích thước | Địa hình (ô) | Dạy | Quái |
|---|---|---|---|---|
| 3-01 Miệng Giếng Cáp Đứt | 1 × 2 | rơi xuống **hố một chiều 10 ô** (không lên lại được bằng nhảy) | cam kết vào tầng mới | 0 |
| 3-02 Giàn Khoan Thứ Nhất | 1 × 2 | giếng đá rãnh 4 ô cao 16 ô, gờ nghỉ ở 10 ô; bên cạnh là giàn khoan bằng sắt **trơn** (không đạp được) để đối chiếu. **Bazan #1** trên gờ nghỉ | đá rãnh vs đá trơn (03 Q3.4) | 0 |
| 3-03 Chuông Số 2 | 1 × 1 | khoang chuông kính cong | lưu | 0 |
| 3-04 Hành Lang Màn Bọt | 2 × 1 | sàn sắt dài, 2 màn bọt cố định, 1 Tôm Súng ở cuối trên mỏm đá | nấp sau màn bọt; tiến dần | 1 Tôm Súng, 1 Lươn Ống Khí (đều 50 máu) |
| 3-05 Hồ Muối Đầu Tiên | 1 × 1,5 | hồ muối rộng 10 ô ở đáy, gờ đích cao **10 ô** (nhảy F1 8,1 không tới; nảy thường 11 ô, lề 1); **Bazan #2** trên gờ đích | nảy hồ muối | 1 Sao Biển (làn trên vách) |
| 3-06 Bục Chuông Đung Đưa | 2 × 1 | hố **26 ô** (không nhảy + dash qua được: tối đa 21,8), 2 chuông treo đung đưa (chu kỳ 3 s) làm bục giữa | canh thời gian | 0 |

> **Luật mở đầu Tầng II (từ `10` Q10.2):** 10 phút đầu chỉ đặt quái **50 máu**. Bazan #1, #2 nằm trên đường chính; Bazan #3 sau thử thách nhỏ (bục chuông 3-06) ⇒ rèn kiếm bậc 1 trước khi gặp quái 90 máu (Thợ Lặn Đứt Cáp 90 máu xuất hiện từ phòng 3-08). Lý do: tránh cảnh kiếm bậc 0 chém quái 90 máu 8 nhát (`10` Q10.2).

### 3.4 Kết nối & vòng lặp
- Vào: Giếng Cáp Đứt (từ Nghĩa Địa, Dash Áp Suất), hầm Vòng Trái (từ Hang Tảo, Đạn Nhiệt).
- **Thang tời phụ Trạm 3 ↔ cửa hang B2** (vòng lặp nhỏ, lore).
- **Thang tời Chuông 2 → Nghĩa Địa** (đường lên nhanh, mở bằng cần gạt ở Chuông 2 từ phía dưới).
- Ra Đông: ống tháo muối ⇒ **Hầm Muối** (từ tầng giữa).
- Ra Nam (bắt buộc): **Cửa Xả Thủy Lực 760 m**: **xích đối trọng ⇒ cần Đôi Tay (B2)**. Cổng trêu thấy ngay từ 3-04 (cửa cống đá cổ khắc Thal-Vael phía dưới vực, rất to).

### 3.5 Quái & tinh nhuệ
Tôm Súng, Thợ Lặn Đứt Cáp, Sao Biển, Lươn Ống Khí (ống đồng gãy), Rận Muối (gần hồ). Tinh nhuệ **Thợ Lặn Trưởng Ca** gác Xác Chuông Số 4 (lore vignette B2) ⇒ thưởng bùa Cổ Tay Nhẹ. 12 / 40 phòng có chiến đấu.

### 3.6 Phần thưởng
Xem `09` Q9.8 (khu 3: 18 vật). Bazan ×4 xuất hiện **ngay sau B1** ⇒ khóa bậc kiếm 1 đúng thời điểm (06 Q6.1). Cửa hàng Marlow: Nòng Nén, khoang mana, Đá Mài Neo, Nòng Mát.

### 3.7 Lần quay lại
- F2 móc neo: vực giữa giàn khoan ⇒ rương lớn.
- Osmotic: đáy hồ muối Hẻm Chuông ⇒ Mảnh Vảy.
- Sonar: phòng tối hầm sâu ⇒ bùa.

---

## KHU 4 — HẦM MUỐI CỔ TÍCH (620–980 m, nhánh Đông)

### 4.1 Bản sắc
| Mục | Nội dung |
|---|---|
| Cảm xúc | *Kỳ ảo lạnh lẽo*: bảo tàng thời gian, im lặng chiến lược |
| Mốc | 4 tàu Salthold nguyên vẹn treo trong cột muối; **dải Nhiệt Tầng** lung linh ngang màn ở 720 m (mốc dọc tự nhiên: biết mình trên hay dưới dải) |
| Vai trò | Nhánh tùy chọn + **Vòng Phải** xuống Cổ Thành cánh Đông; **dạy tàng hình** trước Tầng IV |

### 4.2 Cơ chế đặc trưng
1. **Nhiệt Tầng chắn sonar**: Cá Dơi Sonar tuần tra trên dải; lặn dưới dải ⇒ vô hình (lore). Khởi: 1 Cá Dơi, dải rộng. Thừa: dải mỏng dần, phải canh nhịp sonar 2,5 s. Chuyển: dải bị **trụ muối sập** cắt đứt ⇒ phải đi trên một đoạn. Hợp: 2 Cá Dơi + Rận Muối.
2. **Khoang ngập muối bão hòa (moon-walk)**: vùng bơi 360°, tàu treo giữa cột muối. **Tốc bơi giữ nguyên** (không giảm: trụ cột 1); cảm giác "lơ lửng chậm rãi" làm bằng gia tốc mềm hơn (0,15 s thay vì 0,08 s) và hoạt ảnh, không bằng trần tốc độ. Bản trước để 0,8× là tự vi phạm 02 Q2.6 (người soát phát hiện).
3. **Ảo ảnh halocline**: mặt nước muối trông như túi khí nhưng là bẫy chậm (lore). Bắn thử ⇒ đạn nảy lại ⇒ biết là giả. Dạy "kiểm chứng trước khi tin" (như Cá Đèn Mồi Con / B4).

### 4.3 Phần thưởng
Xem `09` Q9.8 (khu 4: 14 vật). Điểm nhấn: **Két Sắt Salthold Đắm** dưới đáy hồ muối (cần Áo Osmotic), rương vàng lớn nhất game; Bản Ghi #4 ở Bảo Tàng 4 Tàu. Trạm Chợ Rigg dời về cửa Hầm Muối (660 m).

### 4.3b Cao trào khu
- **Mini-boss Tôm Súng Đôi** gác Két Salthold (`06` Q6.4).
- **Chạy trốn "Triều Muối Sập"**: lấy Két xong thì trụ muối đổ, sóng muối dâng 75 s, hồi sinh giữa ở giây 40. D 6,5 / I 9 (`10b` Khu 4).

### 4.4 Kết nối
Tây: ống tháo muối (Hẻm Chuông, F1). Đông Nam: vết nứt 980 m ⇒ **Cổ Thành cánh Đông** (vào Tầng III trước khi mở cổng chính, cần F2 móc qua vực muối). Tinh nhuệ **Tôm Súng Đôi** gác Két Sắt.
