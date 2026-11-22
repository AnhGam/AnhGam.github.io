# 10b — Độ Khó Theo Đoạn: Hai Đường, 9 Loại Đoạn, Biểu Đồ 8 Khu

> Phụ thuộc vào: `03` (loại phòng), `05`, `06` (boss + mini-boss Q6.4), `08a/b` (khu), `_research/R10` (chính), `R5`.
> Thay cho mô hình "răng cưa ở cấp boss" của bản trước (10 Q10.1). Nhận xét của bạn đúng: độ khó là **chuỗi đoạn nối tiếp, bị ngắt quãng**, và đoạn chỉ có di chuyển **không mặc định là dễ**.

---

## Q10b.1 — Hai đường riêng: Độ khó (D) và Cường độ (I)

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Một con số "độ khó" không mô tả được việc đoạn platforming có thể rất khó mà vẫn bình tĩnh, còn đoạn chạy trốn rất căng mà khó vừa phải. |
| **Chọn** | Mỗi đoạn có **2 điểm 0–10**: **D (độ khó)** = kỹ năng / hiểu biết cần có để qua, đo bằng số lần chết mỗi phút, máu mất mỗi phòng. **I (cường độ)** = mức hồi hộp, cái giá nếu sai, áp lực thời gian, đo bằng chấm điểm khi xem người chơi thử. |
| **Vì sao** | The Level Design Book tách rõ hai khái niệm: intensity là "suspense, the player's stake, or engagement", không phải độ khó (`R10` §1). Bằng chứng dữ liệu: **White Palace** của HK (chỉ có nhảy, D rất cao, bình tĩnh) được **~86% người vào hoàn thành**; các **đoạn chạy trốn** của Ori / Nine Sols (I cao nhất ngoài boss) chỉ mất **0,3–4%** người chơi (`R10` §3, Steam API kéo ngày 2026-11-22). |
| **Hệ quả** | Đoạn khó **không** làm mất người chơi. Thứ làm mất người chơi là **đoạn dài đều đều không điểm nhấn** (Ori BF đoạn Forlorn −20%, Ori WotW trước Kwolok −21%) và **cấu trúc phạt tệ** (chết là chơi lại cả đoạn dài: lời chê lớn nhất về đoạn thoát Ginso Tree) (`R10` §3–4). |

## Q10b.2 — 9 loại đoạn (áp vào game này)

| Loại | D | I | Độ dài | Đặt ở đâu | Ví dụ trong game |
|---|---|---|---|---|---|
| **Vào khu / vùng an toàn** | 1–2 | 1–3 | 20–60 s | phòng đầu mỗi khu và ngay sau mọi lối ra boss | 5-02 Đại Sảnh Hé Lộ; 7-01 Hố Đứt Gãy |
| **Tăng dần (dạy → thử)** | 2→5 | 2→5 | 3–8 phòng | sau vùng an toàn | dạy cơ chế đặc trưng của khu (03 Q3.5) |
| **Trận đánh lớn** (đấu trường, sóng quái) | 5–7 | 6–8 | 45–120 s | giữa và cuối khu, 1–2 lần mỗi vòng nhỏ | phòng khóa cửa ghép 2 vai trò quái (05 Phần D) |
| **Thử thách nhảy** (platforming thuần) | **4–10** | 3–6 | 30–180 s, điểm hồi sinh mỗi ≤ 30–60 s thao tác | trước boss làm bài kiểm tra kỹ năng (có điểm lưu **giữa** thử thách và cửa boss), hoặc nhánh tùy chọn cuối khu | Giếng Cộng Hưởng (Ống Vang), Đường Áp Suất (hậu game) |
| **Giải đố / quan sát** | 2–5 | 2–4 | 1–2 phòng | xen giữa các trận đánh | trụ cộng hưởng, nút áp suất, van nước |
| **Chạy trốn / thoát** | 5–8 | **8–10** | 60–180 s, **điểm hồi sinh giữa đường mỗi ~60 s ở mọi độ khó** | ngay sau mục tiêu của khu (mẫu Ori), hoặc làm pha cuối của boss | Thoát Trần Dầu Cháy, Triều Muối Sập, Cầu Xương Sụp |
| **Boss / mini-boss** | 7–9 (cuối 9–10) | 9–10 | 1–6 phút mỗi lần thử | cuối khu, đấu trường ở nhánh cụt (Bao 2026: boss nằm ở ngõ cụt) | 06 |
| **Nghỉ / khoe sức mạnh** | 1–3 | 1–3 | 30–90 s | **ngay sau boss / nâng cấp**: dùng năng lực mới phá chướng ngại cũ | phòng khóa dạy Dash Áp Suất + đường về Mỏm Cột Buồm |
| **Hub / về điểm lưu** | 0 | 0–1 | người chơi tự quyết | sau mỗi 1–2 khu, qua lối tắt | Chuông Lặn, Tháp Ossa |

Nguồn từng hàng: `R10` §4 (Booth L4D: nghỉ 30–45 s; Valve beat chart Episode Two; Schell "flow channel wave"; Hodent "saw tooth"; Ori escapes; White Palace; Level Design Book).

## Q10b.3 — Luật đặt đoạn

1. **Sau mọi boss: nghỉ 30–90 s (I ≤ 3) rồi mới tăng.** Đoạn nghỉ dùng chính phần thưởng của boss để phá chướng ngại cũ (Booth: relax 30–45 s; Schell: "khó dần → thưởng → dễ một lúc"; Hodent: cho so sánh cũ / mới) (`R10` §5.1).
2. **"Gặp quái yếu vì ta đã mạnh hơn" là cú tụt của răng cưa, không cần phòng đặc biệt:** đầu khu mới dùng lại quái khu trước (giờ chết 2–3 nhát), rồi mới đưa quái mới (`R10` §5.2; số nhát ở `09` Q9.6).
3. **Thử thách nhảy: trước boss** (có điểm lưu giữa thử thách và cửa boss) **hoặc tùy chọn**. **Không bao giờ nằm giữa điểm hồi sinh và cửa boss**: luật chạy lại ≤ 10 s (`R10` §5.3, phê bình HK về đường chạy lại dài tới thử thách khó).
4. **Vào khu mới luôn là một quãng nghỉ**, kể cả khu khó hơn (L4D: nghỉ tới phòng an toàn kế tiếp) (`R10` §5.4).
5. **Không có đoạn phẳng:** trên đường chính, cứ **10–15 phút** có một điểm nhấn (trận lớn, chạy trốn, cảnh lộ toàn cảnh) (`R10` §5.5: mất 20–21% ở các đoạn khám phá dài của Ori).
6. **Cẩn thận ở đầu game:** bước từ boss 1 sang boss 2 làm mất 12–34% người chơi ở mọi game đo được ⇒ boss khu 1–2 D chỉ **5–6 / 10** (`R10` §5.6).
7. **Không quá 3 đoạn liền nhau có I chênh ≤ 1**, và không 2 đoạn liền nhau có I ≥ 8 nếu không có đoạn nghỉ xen giữa (`R10` §7.1, nhãn [N]: dùng như kinh nghiệm, chưa có game đo).
8. **Khu không có boss chính thì cao trào là chạy trốn / thử thách nhảy / mini-boss.** Đây chính là chỗ đặt các đoạn "chỉ di chuyển mà khó" (Celeste kết chương, Ori kết vùng) (`R10` §7.2).

## Q10b.4 — Đường cong toàn game (đỉnh D mỗi khu)

| Khu | Đỉnh D | Đỉnh là gì | Đáy sau đỉnh (≈ 50–60% đỉnh) |
|---|---|---|---|
| 1 Nghĩa Địa | **5** | B1 Cự Giải | 2,5 (đầu Hang Tảo / Hẻm Chuông với Đôi Chân) |
| 2 Hang Tảo (tùy chọn) | **5,5** | Thoát Trần Dầu Cháy + mini-boss Mẹ Đỉa Dầu | 3 |
| 3 Hẻm Chuông | **6,5** | B2 Tôm Bọ Ngựa | 3,5 |
| 4 Hầm Muối (tùy chọn) | **6,5** | Triều Muối Sập (chạy trốn) + Tôm Súng Đôi | 3,5 |
| 5 Cổ Thành | **7,5** | B3 Mẫu Sứa | 4 |
| 6 Ống Vang (tùy chọn) | **8** | Giếng Cộng Hưởng (thử thách nhảy D 8, I 4) + Người Gác Đàn Ống | 4,5 |
| 7 Rãnh Hóa Thạch | **8,5** | B4 Hài Ngư (+ Cầu Xương Sụp chạy trốn trước đó) | 5 |
| 8 Lõi Neo | **9,5** | B5 Tàn Ảnh | — |
| Hậu game | 10 | **Đường Áp Suất** (thử thách nhảy kiểu Path of Pain, I 3) | — |

> Răng cưa đi lên: mỗi đáy cao hơn đáy trước, mỗi đỉnh cao hơn đỉnh trước (`R10` §7.2, Hodent saw tooth). Khu tùy chọn có đỉnh ngang hoặc cao hơn khu chính kế trước để thưởng người đi sâu bằng thử thách, không phạt người bỏ qua.

## Q10b.5 — Biểu đồ đoạn từng khu (đường chính + nhánh chính)

Ký hiệu cột: **#**, loại đoạn, **D**, **I**, phút ước lượng. Phút cộng lại ≈ ngân sách khu ở 08a Q8.0.

### Khu 1 — Nghĩa Địa (75 phút)
| # | Đoạn | D | I | ph |
|---|---|---|---|---|
| 1 | Vào: Túi Bùn Tỉnh Dậy (phòng 1-01, cảnh ghê tởm vảy) | 1 | 2 | 2 |
| 2 | Tăng: Lườn Tàu, Khe Quẫy Vây (1-02…1-04) | 2→3 | 3 | 8 |
| 3 | Hub: Ngã Ba Cột Buồm, Chuông 1 (lần đầu gặp quái, Boyle) | 2 | 2 | 5 |
| 4 | Tăng: Xưởng Phế Liệu, nhận súng, Hang Hải Quỳ (chém để bắn) | 3 | 4 | 12 |
| 5 | Giải đố: cắt dây chằng mỏ neo mở vòng nhỏ về Chuông 1 | 2 | 2 | 5 |
| 6 | Trận lớn: rừng cột buồm có Lính Kiếm + Lính Lao + Cua Quan Tài giả rương | 4 | 6 | 6 |
| 7 | Nhánh tùy chọn: Boong Đô Đốc → **mini-boss Thuyền Phó** (D 5, I 8) | 5 | 8 | 10 |
| 8 | Tăng: Khe Dòng Xiết (dòng mạnh/yếu theo nhịp, Hà Đục Khoan) | 4 | 5 | 10 |
| 9 | Chuông Tiên Phong (0 quái, ≤ 10 s tới cửa) | 0 | 2 | 1 |
| 10 | **B1 Cự Giải** | **5** | 10 | ~1,1 / lần thử |
| 11 | Nghỉ / khoe: phòng khóa giếng đạp tường, nhảy 8 ô, về Mỏm Cột Buồm | 1–2 | 2 | 4 |
| 12 | Về hub qua thang ròng rọc | 0 | 1 | 2 |

### Khu 2 — Hang Tảo & Trần Dầu (40 phút, tùy chọn)
| # | Đoạn | D | I | ph |
|---|---|---|---|---|
| 1 | Vào: Khe Nứt Đá Vôi (sáng ấm → đỏ tối) | 1 | 2 | 1 |
| 2 | Tăng: Thảm Huyết Tảo (chém tảo tìm rương), cột khí đầu tiên + Bầy Cá Mòi (dễ lấy mana) | 2→3 | 3 | 8 |
| 3 | Hub: Lán Rigg | 0 | 1 | 2 |
| 4 | Tăng: hành lang kẹp khí–dầu, Đỉa Dầu Trần (cổng gờ 7 ô: phần sau cần F1) | 4 | 5 | 8 |
| 5 | Nhánh: **mini-boss Mẹ Đỉa Dầu** trong khoang trần dầu (gác 1 Mảnh Bình) | 5 | 8 | 6 |
| 6 | Mục tiêu: nhặt Đạn Nhiệt, đốt nút sáp lớn | 3 | 4 | 4 |
| 7 | **Chạy trốn: Thoát Trần Dầu Cháy** (lửa lan dọc trần 90 s; điểm hồi sinh giữa đường ở giây 45) | **5,5** | **9** | 2 |
| 8 | Nghỉ: hầm thoát Vòng Trái xuống Hẻm Chuông (vòng lớn mở) | 1 | 2 | 2 |

### Khu 3 — Hẻm Chuông (110 phút)
| # | Đoạn | D | I | ph |
|---|---|---|---|---|
| 1 | Vào: Miệng Giếng Cáp Đứt (hố một chiều) | 1 | 3 | 1 |
| 2 | Tụt răng cưa: quái 50 máu, 2 Bazan trên đường chính (rèn bậc 1) | 2→3 | 3 | 12 |
| 3 | Tăng: giàn khoan + đạp tường; hành lang màn bọt khí | 4 | 5 | 15 |
| 4 | Hub: Chuông 3 Marlow (rèn kiếm, Nòng Nén) | 0 | 1 | 5 |
| 5 | Giải đố: van bật tắt màn bọt, nút áp suất | 3 | 3 | 8 |
| 6 | Trận lớn: Tôm Súng + Thợ Lặn trên giàn khoan có màn bọt | 6 | 7 | 6 |
| 7 | Tăng: hồ muối nảy, bục chuông đung đưa | 5 | 5 | 15 |
| 8 | Nhánh: Xác Chuông 4 → **mini-boss Thợ Lặn Trưởng Ca** | 6 | 8 | 10 |
| 9 | Nhánh tùy chọn: thử thách nhảy "Giàn Khoan Sập" (D 6, I 4, có rương) | 6 | 4 | 6 |
| 10 | Chuông sát cửa B2 | 0 | 2 | 1 |
| 11 | **B2 Tôm Bọ Ngựa** | **6,5** | 10 | ~1,4 / lần |
| 12 | Nghỉ / khoe: phòng khóa Móc Neo, kéo xích Cửa Xả | 1–2 | 2 | 4 |
| 13 | Về hub qua thang tời phụ | 0 | 1 | 2 |

### Khu 4 — Hầm Muối (50 phút, tùy chọn)
| # | Đoạn | D | I | ph |
|---|---|---|---|---|
| 1 | Vào: ống tháo muối, im lặng chiến lược | 1 | 2 | 1 |
| 2 | Tăng: Nhiệt Tầng chắn sonar, Cá Dơi (dạy tàng hình) | 3→5 | 5 | 12 |
| 3 | Lặng / ngắm: Bảo Tàng 4 Tàu (Bản Ghi #4) | 1 | 1 | 4 |
| 4 | Giải đố: ảo ảnh halocline (bắn thử mới biết) | 3 | 3 | 6 |
| 5 | Tăng: khoang ngập muối bơi 360° + Rận Muối | 4 | 4 | 10 |
| 6 | **Mini-boss Tôm Súng Đôi** gác cửa kho Két Salthold (cần Osmotic để lặn tới) | 6 | 8 | 6 |
| 7 | Nghỉ: khoang đệm có Chuông lưu, mở khóa vào phòng Két | 0 | 2 | 1 |
| 8 | **Chạy trốn: Triều Muối Sập** (nhấc Két ⇒ trụ muối đổ, sóng muối dâng 75 s; hồi sinh giữa ở giây 40) | **6,5** | **9** | 2 |
| 9 | Nghỉ: vết nứt Vòng Phải dẫn xuống Cổ Thành cánh Đông | 1 | 2 | 3 |

### Khu 5 — Cổ Thành Nere-Keth (120 phút)
| # | Đoạn | D | I | ph |
|---|---|---|---|---|
| 1 | Vào: Đại Sảnh Hé Lộ (camera lùi, phòng lặng) | 0 | 2 | 2 |
| 2 | Tụt răng cưa: quái Tầng II còn sót, móc neo lần đầu ngoài phòng khóa | 3 | 3 | 10 |
| 3 | Hub: Tháp Ossa (705 nm, Osmotic) | 0 | 1 | 6 |
| 4 | Tăng: Mạch Phù Ấn bơi dọc tháp, Sứa Chuông, Chình | 4→6 | 5 | 20 |
| 5 | Giải đố: nút áp suất đôi (khối đá + chính mình) | 4 | 3 | 8 |
| 6 | Trận lớn: hành lang tượng có Bạch Tuộc Đá Khắc + Cua Đèn | 6 | 7 | 8 |
| 7 | Lặng **bắt buộc**: Sảnh 3 Tranh Tường (60% sự thật) + Chuông | 0 | 3 | 5 |
| 8 | Nhánh: **mini-boss Hộ Vệ Đèn Cổ** | 6,5 | 8 | 10 |
| 9 | Tăng: cầu vòm gãy, đạp → móc → dash | 6 | 6 | 15 |
| 10 | Chuông tháp sát B3 | 0 | 2 | 1 |
| 11 | **B3 Mẫu Sứa** (Pha 2 bơi 360°) | **7,5** | 10 | ~1,8 / lần |
| 12 | Nghỉ / khoe: Mạch Lướt qua khe 24 ô vừa thấy; mở Mạch Phù Ấn Tốc Hành | 2 | 2 | 5 |

### Khu 6 — Thánh Đường Ống Vang (50 phút, tùy chọn)
| # | Đoạn | D | I | ph |
|---|---|---|---|---|
| 1 | Vào: cầu đá tây, nhạc sinh từ ống đàn | 1 | 2 | 1 |
| 2 | Giải đố: trụ cộng hưởng 3 tần số | 4 | 3 | 10 |
| 3 | Tăng: hành lang sấm âm học + màn bọt bật tắt (quái Tầng III dùng lại) | 5 | 6 | 10 |
| 4 | **Thử thách nhảy: Giếng Cộng Hưởng** (bơi xuyên khe các vòng sóng, 4 đoạn × 40 s, hồi sinh mỗi đoạn) | **8** | **4** | 8 |
| 5 | **Mini-boss Người Gác Đàn Ống** (cấu trúc Thal-Vael giữ hầm Đĩa Đúc Sóng) | 7 | 8 | 8 |
| 6 | Thưởng / lặng: Bục Hai Trưởng Lão (Bản Ghi #5), Bàn Đúc (Ống Ngắm) | 0 | 2 | 5 |
| 7 | Nghỉ: nút tinh thể mở Hẻm Cộng Hưởng (vòng lớn xuống Rãnh) | 1 | 2 | 3 |

### Khu 7 — Rãnh Hóa Thạch (120 phút)
| # | Đoạn | D | I | ph |
|---|---|---|---|---|
| 1 | Vào: Hố Đứt Gãy (rơi dài, nhạc tắt dần) | 1 | 4 | 2 |
| 2 | Tăng: cầu xương có Giun Ống (đi nhẹ), Nhện Biển Xương | 5 | 6 | 15 |
| 3 | Lặng căng: Vực Sao Bị Che (Rình Mồi chỉ lướt qua, chưa đánh) | 2 | 7 | 3 |
| 4 | Tăng: cột phun nhiệt thang máy, lệch luồng bằng súng | 6 | 5 | 15 |
| 5 | Giải đố: Bãi Mồi Giả (Cá Đèn Mồi Con) | 4 | 6 | 6 |
| 6 | Trận lớn: Tôm Đỏ cặp đôi quanh ống phun | 7 | 8 | 8 |
| 7 | Nghỉ: Chuông nhánh hốc sọ phụ (≤ 10 s tới cửa mini-boss) | 0 | 2 | 1 |
| 8 | Nhánh: hốc sọ phụ → **mini-boss Rình Mồi Già** | 7,5 | 9 | 10 |
| 9 | Nghỉ: quay lại Chuông nhánh, đổi bùa | 0 | 2 | 2 |
| 10 | **Chạy trốn: Cầu Xương Sụp** (đàn Giun Ống thức dậy, cầu đổ dần 100 s; hồi sinh giữa ở giây 50) | 7 | **9** | 2 |
| 11 | Chuông Rỉ Sét (0 quái) | 0 | 3 | 1 |
| 12 | **B4 Hài Ngư** | **8,5** | 10 | ~2,3 / lần |
| 13 | Nghỉ / khoe: Sonar in bản đồ cả khu, quái siêu đen lộ hình | 2 | 3 | 5 |

> Luật 7 (Q10b.3) được giữ suốt cả 8 khu: không có 2 đoạn liền nhau I ≥ 8 mà thiếu đoạn nghỉ xen giữa (kể cả cặp mini-boss → chạy trốn ở Khu 4 và cặp chạy trốn → B4 ở Khu 7).

### Khu 8 — Lõi Neo (30 phút)
| # | Đoạn | D | I | ph |
|---|---|---|---|---|
| 1 | Vào: hành lang hạ xuống, Vàng Vỡ, Bàn Đúc (rèn bậc 4) | 1 | 4 | 5 |
| 2 | Trận lớn ×3: Bóng Nước Kiểm Định (mỗi trận nhắc lại một bài cũ) | 7→8 | 8 | 8 |
| 3 | Lặng: Núi Kho Báu Cổ Đọng | 0 | 3 | 2 |
| 4 | Ngưỡng Tế Đàn (0 quái, điểm hồi sinh) | 0 | 4 | 1 |
| 5 | **B5 Tàn Ảnh** | **9,5** | 10 | ~3,9 / lần |
| 6 | Kết: cảnh Ký Ức, San Hô Tự Hàn, bơi lên mặt biển (đoạn khoe toàn phần) | 0 | 5 | 6 |

## Q10b.6 — Đo ở playtest (theo từng đoạn)

| Chỉ số | Cách tính | Ngưỡng cảnh báo |
|---|---|---|
| Số lần chết / phút | chết ÷ phút hoạt động trong đoạn | lệch > 2 bậc D so với kế hoạch |
| Máu mất / phòng | sát thương nhận ÷ máu tối đa | phòng tăng dần > 60% máu |
| Số lần thử đến lần qua đầu | trung vị, p90 | p90 > 3 × trung vị |
| Thời gian qua + độ lệch | trung vị, p90 | p90 > 2,5 × trung vị (có "bức tường vô hình") |
| Điểm bỏ chơi | đoạn cuối trước khi thoát game không lưu | > 5% ở một đoạn chạy trốn; > 10% ở boss giữa; > 20% ở boss cuối |
| Cường độ | người thiết kế chấm 0–10 mỗi phút khi xem 5+ người chơi | lệch > 2 so với kế hoạch |

Nguồn: `R10` §6 (Cal Poly thesis bản đồ nhiệt chết theo phòng; ACM 2024 độ khó platformer theo số chết + thời gian; Booth: sát thương làm tăng cường độ). Ngưỡng bỏ chơi lấy từ Steam: boss giữa 1–13%, boss cuối 12–19%, đoạn chạy trốn 0,3–4% (`R10` §3, §8).

**Biểu đồ trình bày:** mỗi khu một trang; trục x là số đoạn / phút; hai đường D (kế hoạch, rồi số đo) và I (kế hoạch, rồi điểm chấm); nền tô màu theo loại đoạn; vạch trên trục x là điểm hồi sinh (`R10` §7.3, mẫu beat chart Valve Episode Two + đường thứ hai).
