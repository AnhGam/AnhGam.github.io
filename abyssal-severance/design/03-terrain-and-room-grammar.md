# 03 — Ngữ Pháp Địa Hình & Phòng

> Phụ thuộc vào: `01`, `02` (mọi số đo), `_research/R2`, `R6` §5, `R7`.
> Bị phụ thuộc bởi: `08` (từng khu vực), `07` (các "then" của skill).

Vì sao cần file này: Metroidvania không phải mặt đất phẳng. Địa hình là **câu đố bằng cơ thể**: mỗi khe, gờ, trần là một câu hỏi "cậu làm được gì với nhảy, dash, đạp tường?". Nếu không có ngữ pháp chung, mỗi phòng sẽ dựng theo cảm tính, khe "gần được" làm người chơi tưởng mình kém (`R2` §2).

---

## Q3.1 — Đơn vị nhỏ nhất: nhóm nhịp (rhythm group)

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Bên trong một phòng, các thử thách nối nhau thế nào để tay người chơi có "nhịp", không lộn xộn? |
| **Chọn** | Mỗi phòng = chuỗi **nhóm nhịp dài 5–15 giây**, mỗi nhóm 3–6 hành động (đi / nhảy / chờ / dash / đạp). Giữa hai nhóm luôn có **sàn nghỉ ≥ 4 ô** không có nguy hiểm. Hero nặng nên dùng nhịp **swing (dài-ngắn)** cho chuỗi nhảy đáy (cảm giác lội bước); dùng nhịp **đều** cho chuỗi dash/đạp tường (cảm giác thoát xác sau khi có Đôi Chân). |
| **Vì sao** | Smith, Treanor, Whitehead, Mateas (FDG 2009) và Launchpad (2011): nhóm nhịp 5/10/15/20 s nối nhau bằng "a small platform that acts as a rest area"; mỗi động từ có hình học tương ứng (nhảy ↔ khe/lò xo; chờ-đi ↔ máy dập; chờ-đi-chờ ↔ bục di chuyển) (`R2` §1.1). Nhóm 20 s quá dài cho hero chậm: thất bại ở giây 18 phải làm lại nhiều. Nên trần 15 s. |
| **Bằng chứng** | `R2` §1.1 (độ tin cậy A). |
| **Cảm giác** | Người chơi "đọc" được: thấy sàn nghỉ là biết sắp hết một đoạn. |
| **Rủi ro & đo** | Đo ở playtest: số lần chết trong mỗi nhóm nhịp. Nhóm nào > 3 lần chết trung vị thì tách đôi hoặc thêm sàn nghỉ. |

## Q3.2 — Danh mục mẫu địa hình (dùng số của 02)

Ký hiệu: **Jh** = nhảy cao, **Jw** = nhảy xa, **D** = dash. F0: Jh 5,1, Jw 11,2, D 4. F1+: Jh 8,1, Jw 14,8, D 7 (T1). Mạch Lướt (T2): 2 × 7 trên không. Móc neo: tầm 10. Đạp tường: 6,15 ô mỗi cú. Đơn vị: **ô**. Mọi số lấy từ `_calc/metrics.py`.

| # | Mẫu | Kiểm tra kỹ năng gì | Kích thước (F0 / F1+) | Dùng ở đâu (08) | Nguồn |
|---|---|---|---|---|---|
| 1 | **Khe thường** | canh nhảy | ≤ 10 / ≤ 13 | khắp nơi | R2 #1 |
| 2 | **Khe có đáy** (rơi xuống không chết, leo lại được) | học khe không mất máu | rộng như #1, sâu ≤ 4 / ≤ 7 | phòng dạy | Miyamoto 1-1 (R2 #2) |
| 3 | **Bản tập trước khe thật** | tập không rủi ro | y hệt khe thật, ngay trước nó | lần đầu mọi kỹ năng | Miyamoto (R2 #26) |
| 4 | **Bậc lên** | độ cao nhảy | ≤ 4 / ≤ 7 | khắp nơi | R2 #5 |
| 5 | **Cầu thang so le** (cột buồm gãy, giàn khoan) | nhảy lặp nhịp | bậc 2–4 / 3–7, cách 3–6 | Tầng I–II | R2 #6 |
| 6 | **Hố một chiều** (van) | cam kết, đẩy vào phòng mới | sâu ≥ 6 / ≥ 9 (không nhảy lại được), vách trơn | đầu khu, đường xuống tầng | Super Metroid Morph Ball room (R2 #7) |
| 7 | **Trần thấp trên nguy hiểm** | ép dash ngang, cấm nhảy | trần 5–6 ô | Hang Dầu, hành lang ống | R2 #8 |
| 8 | **Khe bò** (bò dẹt tự động) | quan sát, tìm bí mật | cao 2 ô (thấp hơn hitbox đứng F0 36 px) | lối bí mật | 02 Q2.11 |
| 9 | **Hố gai / nước độc / lõi cột nhiệt** | chính xác, giá thất bại | theo #1 | Tầng II–IV | R2 #10 |
| 10 | **Giếng đạp tường** | đạp tường (F1) | rộng 4, cao ≥ 10; gờ nghỉ mỗi ≤ 30 | Hẻm Chuông, Cổ Thành | Super Metroid Etecoon (R2 #11–12) |
| 11 | **Gờ so le giếng rộng** | đạp tường + chọn tường | giếng 8–12, gờ cách **9–14** (Jh 8,1 < Δy ≤ Jh + 6,15) | Cổ Thành | R2 #13 |
| 12 | **Bục di chuyển** (chuông treo đung đưa, xích tời) | canh thời gian | chu kỳ 2,5–4 s | Hẻm Chuông | Launchpad (R2 #14) |
| 13 | **Máy dập** (búa giàn khoan, van đập) | chờ – đi | mở ≥ 0,9 s (F1 qua 2 ô trong 0,18 s, có lề) | Hẻm Chuông | R2 #15 |
| 14 | **Ván mục sập** | không do dự | sập 0,7 s sau khi chạm | Nghĩa Địa | R2 #16 |
| 15 | **Vách/sàn vỡ** | tìm bí mật, Dậm Nặng / dash T1 / súng | dày 1–2 ô, có vết nứt | mọi khu | R2 #18 |
| 16 | **Bục một chiều** | luồng dọc | — | giàn khoan, cầu xương | R2 #20 |
| 17 | **Bệ nảy** (hồ muối, vỏ sò đá) | nảy cao | nảy thường 11 ô (gờ đích 10), Dậm 15 ô (gờ đích 12–14); cách mọi cổng gờ / tường khác ≥ 10 ô | Hẻm Chuông, Hầm Muối | 02 Q2.8 |
| 18 | **Dòng chảy ngang** | neo chân / đi ngược | túi nước lặng mỗi ≤ 13 ô | Nghĩa Địa (Khe Dòng Xiết), Hẻm Chuông | R2 #22 |
| 19 | **Dòng chảy xuống trên hố** | dash cắt ngang | hố 8–12 | Hẻm Chuông, Tầng IV | R2 §6 |
| 20 | **Nảy trên quái / gai (pogo)** | chém xuống trên không, chuỗi trên không | pogo chỉ cao 2,5–3 ô nên **không dùng để vượt gờ**; dùng để **nạp lại dash giữa hố**: hố rộng hơn nhảy + dash nhưng có quái / vỏ cứng lơ lửng ở giữa | tùy chọn, bí mật | HK pogo (R2 #23) |
| 21 | **Vực móc neo** | móc + văng | rộng **≥ 30** (vượt cả Mạch Lướt); vòng cách ≤ 8 | Hẻm Chuông đáy, Cổ Thành | R2 #24 |
| 22 | **Vùng an toàn ở cửa vào** | đọc phòng trước khi hành động | ≥ 3 ô ngoài mọi đường đạn | **mọi phòng** | Khalifa (R2 #25) |
| 23 | **Nhánh rủi ro – phần thưởng** | tùy chọn khó hơn | đường trên khó, có thưởng | mọi khu | Celeste dâu (R2 #27) |
| 24 | **Thắt cổ chai → đấu trường** | đẩy căng thẳng | lối 3 ô mở ra phòng 1 màn | trước mini-boss | Khalifa (R2 #28) |
| 25 | **Cột nhiệt thang máy** | đứng vành ngoài, tránh lõi | lõi 1,5 ô bỏng, vành nâng | Tầng IV | lore + R2 §6 |
| 26 | **Trần dầu úp ngược** | tránh chạm trần, dash xuống | trần dầu cách sàn **7–8 ô** ở nửa trước Hang Tảo (F0 với tới 5,1 + thân 2,25 ≈ 7,3 ô ⇒ nhảy hết sức là chạm) | Hang Dầu | lore |
| 27 | **Phòng tối** | đọc sàn bằng vầng sáng 2,5 m | vầng sáng viền ≥ 3,5 H | Tầng IV | R2 §6 [D] |
| 28 | **Màn bọt khí** | nấp sóng nổ (giảm **85%** sát thương sóng) | dày ≥ 2 ô | Hẻm Chuông, Ống Vang | lore |

## Q3.3 — Cổng năng lực = bất đẳng thức hình học

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Khi người chơi gặp chỗ không qua được, họ phải hiểu ngay "đây là cổng", không phải "mình kém". |
| **Chọn** | Mọi cổng là **bất đẳng thức có lề ≥ 1 ô** (bảng dưới) + **hình ảnh riêng cho từng loại cổng** (bảng Q3.4). |
| **Vì sao** | Khe "gần được" là lỗi kinh điển, `DeepSeaMV-08` ghi: "người chơi đâm đầu vào khu vực chưa đủ điều kiện mà không nhận biết được đó là gate hay do mình thao tác kém". Lề ≥ 1 ô đảm bảo không ai "suýt" qua được. |
| **Bằng chứng** | `R2` §4.1. |

| Cổng | Chặn | Mở bằng | Bất đẳng thức (ô) | Kích thước dùng |
|---|---|---|---|---|
| Khe Quẫy Vây | F0 nhảy | T0 dash | Jw+2 ≤ w ≤ Jw+D−1 ⇒ 13,2 ≤ w ≤ 14,2 | **14** (chỉ đầu game) |
| **Gờ Đôi Chân** | F0 nhảy (5,1) | nhảy F1 (8,1) | F0 Jh+1 ≤ h ≤ F1 Jh−1 ⇒ 6,1 ≤ h ≤ 7,1 ⇒ **h = 7** | **7** |
| **Khe Dash Áp Suất** | F1 nhảy | T1 dash | 16,8 ≤ w ≤ 20,8 | **17–20** |
| **Tường cao** | nhảy | đạp tường (F1) | h ≥ Jh+1 = 9,1 ⇒ **≥ 10**, mặt **đá có rãnh**. Leo được cả **một bức tường đơn** (đạp ra rồi lái về, tới đỉnh vẫn sát tường) ⇒ cổng nằm ở **chất liệu** (đá rãnh / đá trơn), không cần tường đối diện | ≥ 10 |
| Vách hà mục | đi | dash T1 / Dậm Nặng | vật thể đặc trưng | — |
| Sàn ván mục | đi | Dậm Nặng (F1) | vật thể đặc trưng | — |
| **Vực móc neo** | nhảy + 2 dash | móc (F2) | w ≥ Jw + 2D + 1 = 29,8 không có bục giữa | **30–44**, vòng cách ≤ 8 |
| Xích đối trọng / cửa kéo | đi | Đôi Tay kéo (F2) | vật thể đặc trưng | — |
| **Khe Mạch Lướt** | nhảy + 1 dash | 2 dash trên không (F3) | Jw+D+2 ≤ w ≤ Jw+2D−1 ⇒ 23,8 ≤ w ≤ 27,8 | **24–27** (không có vòng neo) |
| Màng áp suất | vào Rãnh Hóa Thạch | Thân Mình (F3) | **theo vị trí**: mọi lối vào Rãnh (Hố Đứt Gãy, Hẻm Cộng Hưởng), không theo mét | xem 08b §6.4 |
| Phòng tối hoàn toàn / tường cộng hưởng | thấy đường | Sonar (F4) | — | xem 07 |
| Khóa gỉ xa / van cao | đi | súng phép (đầu game) | công tắc ngoài tầm với | — |
| Nút sáp dưới trần dầu | đi | Đạn Nhiệt (nhánh Hang Dầu) | vật thể đặc trưng | — |
| Khóa tinh thể | đi | Ống Ngắm Cộng Hưởng | vật thể đặc trưng | — |
| Bẫy / lối đỏ tàng hình | thấy | Kính 705 nm | — | Tầng IV |
| Đáy hồ muối | lặn | Áo Osmotic | — | Hầm Muối, Hẻm Chuông |

> "Khe Mạch Lướt" (24–27) và "Vực móc neo" (≥ 30) **không chồng nhau**. Vẫn giữ quy ước nhìn: vực có vòng neo ⇒ móc; không vòng ⇒ Mạch Lướt.

## Q3.4 — Ngôn ngữ hình ảnh của cổng (để người chơi tự nhận ra)

| Cổng | Dấu hiệu nhìn | Dấu hiệu nghe | Lý do |
|---|---|---|---|
| Gờ Đôi Chân | **dấu chân 8 đốt của cua khổng lồ** in trên vách gờ (bóng gió: thứ đã cướp đôi chân) | — | Khóa có "custom graphics seen nowhere else" (R2 §4.2); kể chuyện qua môi trường |
| Vách hà mục | ván gỗ đục lỗ hà, rỉ nước | tiếng gỗ kẽo kẹt khi đến gần | ba kênh (nhìn, nghe, hạt) (R2 §4.1 [D]) |
| Tường cao đạp được | **đá có rãnh** (đạp được) vs đá trơn bóng (không) | — | R2 §4.1 "textured kickable vs smooth" |
| Vòng neo | vòng đồng ấm màu, viền sáng 1 px | khẽ "ngân" khi trong tầm | vật độc nhất toàn game |
| Xích đối trọng | tay quay + xích dày | — | — |
| Khóa gỉ súng | **mắt khóa đỏ đồng** (vòng bia) | — | Ori Light Burst (R6 §5.1) |
| Nút sáp trần dầu | khối hổ phách đen, có bọt kẹt bên dưới | bọt lục bục | lore |
| Khóa tinh thể | tinh thể hổ phách rung | ù ù khi lại gần | R6 §5.1 |
| Phòng tối | cửa phòng đen kịt, gió lạnh | im lặng | R6 §5.1 |
| Lối đỏ ẩn | "sao bị che" (bóng che phù du phát sáng) | — | lore Rãnh Hóa Thạch |

**Luật:** lần đầu gặp mỗi loại cổng phải nằm **15–60 phút trước** khi có chìa, ở chỗ dễ nhớ (cạnh Chuông Lặn / mốc kiến trúc). Notebook đề xuất 15–30 phút (`R6` §1.4, `R2` §4.2 [D], chưa có game đo); ta nới tới 60 phút vì giữa hai Hóa Hình có thể tới ~150 phút (07 Q7.6). Ngoại lệ: Quẫy Vây (phút 3) là phòng dạy, không có cổng trêu trước. Đặt 2–3 cổng "trêu" trong giờ đầu (`R6` §5.2 [D]). **Bản đồ tự đánh dấu cổng đã thấy** bằng biểu tượng loại cổng. Lý do: Aquaria bị chê vì không đánh dấu dòng chảy chặn đường, người chơi quên cổng ở đâu (`DeepSeaMV-03`); Lost Crown làm "Memory Shards" (ảnh chụp trong game ghim lên bản đồ) cũng để giải đúng vấn đề này (`R6` §5.2).

## Q3.5 — Dạy một năng lực mới (quy trình 5 bước)

| Ô | Nội dung |
|---|---|
| **Chọn** | Mọi năng lực mới đi qua đúng 5 bước. |
| **Vì sao** | Đồng thuận của Super Metroid (phòng Morph Ball, phòng phải chạy, giếng Etecoon), Celeste, Trespasser (`R2` §3.4); Khalifa "giới thiệu năng lực mới trong tình huống đơn giản, thường ngay sau cao trào" (`R2` §1.5). |

1. **Phòng khóa (tutorial):** không ra được nếu không dùng năng lực. Không có quái, không có nguy hiểm chết người.
2. **Phòng tập rẻ:** thất bại chỉ mất thời gian (khe có đáy).
3. **Phòng tập có giá:** thất bại mất máu (gai, nước độc).
4. **Phòng kết hợp:** năng lực mới + năng lực cũ (ví dụ đạp tường + dash).
5. **Vòng chiến thắng:** đường về mở một **cổng đã thấy từ trước** ⇒ thưởng ngay trong 1–2 màn.

**Áp dụng cụ thể:**

| Năng lực | Bước 1 (phòng khóa) | Bước 2 | Bước 3 | Bước 4 | Bước 5 |
|---|---|---|---|---|---|
| **Quẫy Vây** (phút 3) | **khe 14 ô**, đáy sâu **7 ô vách trơn** (F0 nhảy 5,1 không leo lên được), có **dốc cát dẫn ngược về mép xuất phát** ⇒ rơi chỉ mất thời gian | trần thấp 5 ô, sàn bùn (không hại) | khe 14 ô trên gai san hô | nhảy + quẫy qua 2 khe liên tiếp | lối tắt về túi bùn tỉnh dậy |
| **Dash Áp Suất + nhảy F1** (Boss 1) | lối ra đấu trường: **gờ 7 ô** + khe 18 ô, sàn kín | khe 17–20 có đáy | khe 18 trên hố tàu | dash xuyên quái nhỏ | về **Mỏm Cột Buồm Cờ Đỏ** (thấy từ phút ~15) |
| **Đạp tường** (Boss 1) | giếng chimney 4 ô ngay ngoài đấu trường, đáy kín (kiểu Morph Ball) | giếng rộng có gờ so le 9–14 | giếng có gai đáy | đạp + dash ngang qua miệng giếng | **Mỏm Cột Buồm Cờ Đỏ** + Gác Đá Tàu Trinh Sát (Hang Tảo) |
| **Dậm Nặng** (Boss 1, phút ~75) | sàn ván mục giữa đấu trường sau boss | ván mục che rương | Dậm trên hồ muối nảy 15 ô | Dậm + đè nút áp suất mở cửa đang đóng | sàn mục ở Nghĩa Địa có rương (thấy từ trước) |
| **Móc Neo** (Boss 2) | lối ra là thác chảy xuống, 1 vòng neo trên đầu | vực 30 ô có đáy, 3 vòng | vòng trên gai | đạp tường → móc giữa không trung | vực Hẻm Chuông đã thấy trước |
| **Mạch Lướt** (Boss 3) | cột Mạch Phù Ấn đứt đoạn 25 ô | khe 24 có đáy | khe 26 trên vực | đạp → 2 lướt → móc | Cổ Thành cánh Nam |
| **Sonar** (Boss 4) | hố sụt tối đen, chỉ đi được khi quét | tường cộng hưởng giả | quái siêu đen trong tối | quét → thấy Giun Ống ẩn → đi chậm qua (kết hợp đi nhẹ) | phòng tối Tầng II (thấy từ trước) |

**Chìa phụ** (Thân Mình chịu áp, Áo Osmotic, Kính 705 nm, Ống Ngắm, Đạn Nhiệt, kéo xích Đôi Tay) dùng **quy trình rút gọn 3 bước**: (1) thấy cổng trước, (2) phòng dùng an toàn ngay khi có chìa, (3) thưởng trong 1–2 màn. Lý do: chìa phụ chỉ mở cổng, không đổi cách di chuyển, nên không cần tập nhiều (Cook: chỉ dạy kỹ năng khi chuỗi trước đã vững, `R2` §1.2).

## Q3.6 — Loại phòng & tỉ lệ

| Loại | Mục đích | Tỉ lệ trong khu | Thời lượng điển hình |
|---|---|---|---|
| Di chuyển (playground) | chuỗi động từ, quái nhẹ | 30–35% | 15–35 s |
| Đấu trường (khóa mềm / khóa cứng) | thử chiến đấu | 20–25% | 20–60 s |
| Phòng cơ chế (van, tời, nước) | câu đố trong 1–2 phòng liền nhau | 15–20% | 30–90 s |
| Phòng lặng / ngắm cảnh / tranh tường | giảm căng | 10–15% | 20–40 s |
| Phòng ngưỡng / lối tắt | đóng vòng lặp | 5–10% | — |
| Chuông Lặn (lưu) | mỗi 6–10 phòng (~3–5 phút) | — | — |
| Bí mật | sau vách vỡ, mỗi ngõ cụt có thưởng | xem 09 | — |
| Boss | ngoại vi đồ thị, chạy lại ≤ 10 s từ Chuông | — | — |

> Trung thực: các tỉ lệ trên lấy từ tài liệu đề xuất ([D], `R2` §3.2), **chưa có số đo công khai** từ game thật. Dùng làm điểm xuất phát; đo lại ở playtest bằng thời gian thực tế trong từng loại phòng. Có một bằng chứng thật: Bao và cộng sự (2026) đo mạng không gian của HK, Lost Crown, Blasphemous 2, cho thấy điểm lưu **phân tán đều** (NNI 1,302) và boss **cách xa nhau** (`R2` §3.2, độ tin cậy A). Ta theo đúng hai điều này.

## Q3.7 — Kích thước phòng

| Loại | Kích thước (màn = 40 × 22,5 ô) |
|---|---|
| Hành lang | 1–3 màn ngang × 1 màn cao |
| Giếng dọc | 1 màn ngang × 2–4 màn cao |
| Đấu trường quái | 1 × 1 màn |
| Đấu trường boss | **1 × 1** màn; **1 × 1,5** hoặc **1,5 × 1,5** chỉ khi có luật "boss chỉ ra đòn khi đang trong màn" + camera kéo theo boss (trọng số boss 0,5, `R8` §6.2 [internal]) |
| Sảnh trung tâm khu | 2 × 2 màn |
| Vùng bơi 360° | 1–3 màn mỗi chiều; cứ 6–10 thân người phải có một vật cản/điểm nhấn (R2 §6 [D]) |
| Khoảng trống tối đa không có gì | ≤ 1,5 màn (R2 §3.1 [D]) |

## Q3.8 — Vòng lặp & lối tắt

| Luật | Giá trị | Nguồn |
|---|---|---|
| Lối tắt chỉ mở từ phía xa (một chiều) | mọi lối tắt | R2 §5 (Level Design Book, Dark Souls, HK) |
| Vòng lặp nhỏ | quay về Chuông/hub sau mỗi **4–7 phòng** (3–5 phút đi, 10–20 s về) | R2 §5 [D] |
| Vòng lặp lớn (giữa khu) | ≥ 1 mỗi 1–2 giờ chơi | R2 §5 [D]; lore đã có Vòng Trái (Hang Dầu ↔ Nghĩa Địa) và Vòng Phải (Hầm Muối ↔ Cổ Thành) |
| Mở cổng ⇒ thưởng trong 1–2 màn | luôn | R2 §5 [D] |
| Van một chiều phải đi tiếp được bằng bộ kỹ năng hiện có | luôn (chống khóa đường) | R2 §4.3, Dreamnoid |
| "Bộ kỹ năng ra ≤ bộ kỹ năng vào" | mọi chỗ sequence break | R2 §4.3 [D] |
| Mỗi tầng kỹ năng di chuyển rút ngắn đường cũ | 35–50% | R2 §5 [D] (đo ở playtest) |

**Mô hình thế giới:** *trục dọc + vòng ngang* (Super Metroid). Nghĩa Địa = phễu dẫn đường (dạy), sau Đôi Chân thì mở thành mạng. Hướng **đi xuống rẻ** (rơi), **đi lên đắt** ⇒ mỗi khu phải có ≥ 1 đường đi lên nhanh mở từ dưới: thang tời chuông, cột nhiệt, Mạch Phù Ấn tốc hành (`R2` §5 gợi ý). Lý do: hero nặng, rơi thì dễ, leo thì tốn stamina; nếu không có đường lên nhanh, quay lại khu trên sẽ thành cực hình (lỗi "backtracking tẻ nhạt", `DeepSeaMV-08` §1).

## Q3.9 — Đặt phần thưởng trong địa hình

| Luật | Nguồn |
|---|---|
| Mỗi ngõ cụt / đường xa đều có thưởng | Dreamnoid (R2 §7) |
| Lên kế hoạch mọi ô thưởng trên toàn bản đồ cùng lúc, kiểm mật độ đều | Dreamnoid |
| Bí mật phải tìm được bằng quan sát (vết nứt + tiếng + hạt), không đoán mò kiểu La-Mulana | R2 §7 [C/D] |
| Cho thấy thưởng trước khi với tới (sau cổng) | Super Metroid Charge Beam corridor (R2 §4.2, A); Loewenstein "curiosity gap" (R7) |
| Vật phẩm trên khe hở = thưởng rủi ro + dẫn đường | Smith 2009, Miyamoto (R2 §7, A) |
| **14–20 vật phẩm mỗi khu chính** (bảng chuẩn `09` Q9.8); tham chiếu các game 10–17 / vùng | R7 |
| Thưởng bất ngờ thay vì thưởng báo trước (không giết động lực tự thân) | Deci 1999, 128 nghiên cứu: thưởng báo trước d ≈ −0,36, thưởng bất ngờ d ≈ 0,01 (R7) |

## Q3.10 — Quy trình kiểm một phòng trước khi xong (checklist)

1. Có vùng an toàn ở mọi cửa vào? (#22)
2. Mọi khe/gờ đúng bảng Q3.2 cho hình hài **thấp nhất** có thể vào phòng này?
3. Mọi cổng đúng bất đẳng thức Q3.3 với lề ≥ 1 ô?
4. Không đoạn đi thẳng > 3 s không có tương tác?
5. Chiều cao trần đủ cho F4 (01 Q1.3) ở chỗ không cố ý cấm nhảy?
6. Không quái/nguy hiểm nào đặt ngay điểm đáp của cú nhảy mù (nhảy xuống mà chưa thấy đáy)?
7. Phòng có lối ra đi được bằng bộ kỹ năng thấp nhất vào được không (chống khóa đường)?
8. Có ít nhất 1 thứ để nhìn (mốc kiến trúc) để nhận diện phòng trên bản đồ tư duy? (`DeepSeaMV-08` §1: mốc kiến trúc chống lạc)
9. **Mọi "then" dùng súng** (khóa gỉ, van xa) phải có **nguồn chém trong cùng phòng**: quái hồi sinh, hoặc **Bụi Tinh Thể Hải Quang** (vật chém được, +11 mana mỗi nhát, mọc lại sau 10 s). Không thì phòng có thể kẹt cứng vì 0 mana (lỗi người soát tìm ra ở phòng 1-07).
10. **Trong bán kính 10 ô quanh mọi cổng gờ / tường / khe**: không có gai, quái, vỏ cứng chém nảy pogo được; không có hồ muối, cột khí, cột nhiệt nâng lên được. Trừ khi đó chính là lối đi dự định (khi đó cổng phải dựng theo độ cao nảy, 02 Q2.8).
11. Phòng boss: mọi đòn bắt đầu khi boss **đang trong màn**; đòn từ ngoài màn chỉ được dùng khi **dấu hiệu báo trước hiện trong màn ≥ 36 f** (bóng đổ, mũi tên mép màn) (05 QA.1).
