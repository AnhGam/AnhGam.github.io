# 05 — Quái Vật & AI (luật công bằng, máu, đòn, 24 loài)

> Phụ thuộc vào: `02` (tốc độ người chơi), `04` (sát thương / tầm / đỡ đòn / phá thế), lore bestiary, `_research/R3`, `R4`.
> Bị phụ thuộc bởi: `06` (boss dùng lại luật), `08` (đặt quái theo phòng), `09` (rơi đồ), `10` (độ khó).

---

## Phần A — Luật chung (áp dụng cho mọi quái)

### QA.1 — Thời gian báo trước (telegraph)

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Báo trước bao lâu để né / đỡ được bằng phản xạ người thường, mà vẫn có áp lực? |
| **Chọn** | Bảng dưới. **Không đòn nào** khởi động nhanh hơn **24 f (0,4 s)**. Đòn đỏ (không đỡ được) ≥ **36 f**. Đòn nặng / diện rộng ≥ **48 f**. Mọi đòn ≥ 36 f có **tiếng báo** bắt đầu cùng khung hình đầu tiên của tư thế gồng. |
| **Vì sao** | 1) Phản xạ thị giác đơn giản ~215–250 ms; dữ liệu lớn trên mạng trung bình 284 ms (`R4` R1, nguồn A). 2) Critpoints (Wagar): tối thiểu 20–25 f; 15–18 f thì "chỉ bấm bừa, không phán đoán được" (`R4` R2). Ta có **đỡ đòn bằng canh giờ**, nên cần dải 20–26 f để *phán đoán*, không chỉ phản xạ. Lấy 24 f. 3) Âm thanh tới não nhanh hơn hình 30–80 ms (`R4` R3), nên mọi đòn mạnh phải có tiếng. 4) Tư thế báo trước phải trùng khớp thời điểm thật (`R4` R7, phàn nàn Sekiro). Đòn thứ hai bất ngờ không báo phá niềm tin (`R4` R8: Moss Knight HK là phàn nàn hàng đầu) ⇒ **cấm đòn nối ẩn**. |

| Loại đòn | Báo trước | Kênh báo |
|---|---|---|
| Quái thường cận chiến (viền bạc) | **24–32 f** (0,4–0,53 s) | dáng gồng + vệt bạc nháy 2 f + tiếng "xẹt" cao |
| Đòn đỏ (cắn / tóm / lao thân) | **36–44 f** | mắt / miệng đỏ + tiếng gầm trầm |
| Sóng / điện / cavitation (xanh / hổ phách) | **48–60 f** | vòng sáng tụ dần + tiếng rè tăng dần |
| Đạn nhắm | ngắm **30 f** có tia ngắm hiện, khóa hướng 8 f cuối | tia sáng mảnh + tiếng "tách" |
| Bẫy phục kích (lần đầu bung) | ≥ **24 f** + tiếng (lao thân / cắn: theo hàng đỏ ≥ 36 f) | luôn có dấu hiệu thường trực (vây phập phồng, mắt lóe) |
| Đòn bắt đầu ngoài màn hình | **cấm**, trừ khi **dấu hiệu báo trước hiện trong màn ≥ 36 f**: tia bắn tỉa (mũi tên mép màn), boss nhảy khỏi màn (bóng đổ to dần trên sàn) | mũi tên mép màn + tiếng sonar / bóng đổ |

### QA.2 — Nhịp tấn công & giới hạn số quái đánh cùng lúc

| Ô | Nội dung |
|---|---|
| **Chọn** | **Mỗi quái trung bình 1 đòn / 2–3 s**, không đánh hai đòn liền, không đánh khi đang khựng. **Hệ thống vé tấn công**: người chơi có "sức chứa vây" **12** và "sức chứa đòn" **10** (đúng số Amalur). Trọng số ta đặt: quái thường vây 3 / đòn 3; tinh nhuệ vây 6 / đòn 5–6; đòn đỏ / diện rộng đòn 7 (một lúc chỉ một đòn như vậy). Đây là **đề xuất của R4 §5 suy ra từ tỉ lệ Amalur** (Amalur dùng lính 4, troll 8; đòn húc 6, chém 3), không phải số chép nguyên. Trả vé ngay khi ra đòn xong. Quái trên màn hình được **giành vé** của quái ngoài màn hình. |
| **Vì sao** | Khảo sát DmC, GoW3, Bayonetta, NG2, Arkham, AC3, PoP: mỗi quái 2–3 s một đòn (`R4` R12). Kingdoms of Amalur dùng mô hình "sức chứa" này (vây 12, đòn 10; lính 4, troll 8). Ta giữ sức chứa 12 / 10 và **chỉnh trọng số theo đề xuất R4 §5** (`R4` R13, Game AI Pro ch.28, nguồn A). Doom 2016 cho quái trên màn giành vé (`R4` R14). HL2 dùng 2 suất bắn mỗi đội (`R4` R11, mã nguồn A). |
| **Độ khó** | Chỉ chỉnh hai con số sức chứa: Dễ 8/7, Thường 12/10, Khó 16/13 (Dễ/Khó là **suy luận** của ta theo hướng `R4` §5 "difficulty = raise the two capacities only"; R4 chỉ cho số vây 8/12/16) |

### QA.3 — Đạn của quái

| Ô | Nội dung |
|---|---|
| **Chọn** | Tốc đạn **230–300 px/s** (1,2–1,6× tốc bơi 190), **luôn chậm hơn dash** (560 px/s). Ít đạn thì nhanh, nhiều đạn thì chậm. **Phát đầu tiên sau khi phát hiện luôn trượt** (trượt rõ ràng: đạn sượt qua có tiếng). Độ chính xác tăng dần trong 3–5 phát. Chỉ quái đang giữ **"vé trúng"** mới bắn trúng được; bộ đếm giờ trúng toàn cục **0,8 s** × hệ số (người chơi đang lao vào quái ×0,5; đang nấp màn bọt ×2; đang chém quái khác ×1,5). **Không nhắm đón đầu** ở Tầng I–II; Tầng III+ chỉ đón đầu một phần (trộn 0–40%, chỉ theo vận tốc hiện tại, không đoán điểm cuối dash). |
| **Vì sao** | BioShock: phát đầu luôn trượt, độ chính xác tăng dần trong trận (Ken Levine; `R4` R17, A qua B). Game AI Pro 3 ch.33 (Splinter Cell, DOOM, Watch Dogs 2): chỉ một quái giữ vé được bắn trúng, các phát khác cố ý trượt *nhìn thấy được* (`R4` R18–R20, A). Bắn đón đầu hoàn toàn thấy bất công; trộn theo hệ số và không đoán điểm cuối dash (`R4` §2). Không có nguồn công bố tỉ lệ tốc đạn / tốc người (`R4` §8.3): 1,2–1,6× là đề xuất notebook, ta kẹp thêm luật "chậm hơn dash" để đạn nào cũng né được bằng dash. |
| **Hitbox đạn** | Bằng **50–60%** hình vẽ viên đạn (shmup: hitbox đạn nhỏ hơn hình, `R4` R27). |

### QA.4 — Hitbox / hurtbox của quái

| Thành phần | Quy định | Nguồn |
|---|---|---|
| Hurtbox quái (vùng bị chém trúng) | = bóng hình quái, **không nhỏ hơn** (có thể rộng hơn 10%) | `R4` R26 [N]; ưu tiên người chơi |
| Hitbox đòn quái | ≤ 85% vệt vung / càng hình vẽ | `R4` R24–R25 |
| Chạm thân | chỉ khi đang ra đòn / lao / xoay, hoặc loài có gai thân (ghi rõ từng loài) | `04` Q4.1, `R4` R28–R30 |
| Tóm (grab) | luôn có **0,7 s** để bấm dash thoát + 0,5 s bất tử sau khi thoát | `R4` R31 [N] |

### QA.5 — Máy trạng thái chuẩn (dùng cho mọi quái)

```
NGỦ/TUẦN TRA ──(giác quan phát hiện)──► CẢNH GIÁC 0,4 s (dấu hiệu sinh học: vây xòe / mắt lóe; KHÔNG đánh)
CẢNH GIÁC ──► ĐUỔI (tới tầm; xin vé)
ĐUỔI ──(có vé + trong tầm + trên màn hình)──► GỒNG (báo trước theo QA.1)
GỒNG ──► RA ĐÒN ──► HỒI (cửa sổ phạt 0,3–0,5 s) ──► trả vé ──► NGHỈ (2–3 s trung bình)
bất kỳ ──(trúng chém)──► KHỰNG (không ra đòn mới cho tới khi hết khựng)  [trừ khi đang GỒNG giáp cứng]
ĐUỔI ──(mất mọi giác quan 3,5 s HOẶC ra ngoài dây xích 1,5 màn)──► VỀ CHỖ (hồi máu) ──► TUẦN TRA
```
- Nguồn: `R4` §4.1 (mẫu quái thường), §4.2 (phục kích), §4.3 (giác quan), §4.4 (tầm xa). Kiến trúc: FSM cho quái thường (Doom 2016 dùng HFSM), chọn đòn theo điểm tiện ích (utility) cho tinh nhuệ và boss (`R4` §4).
- **"Giáp cứng khi gồng" (hyper-armor):** chỉ tinh nhuệ / quái nặng. Thanh phá thế đầy thì vẫn ngắt được. Đây là lý do combo spam có giới hạn (`04` Q4.2).

### QA.6 — Bốn kênh giác quan (lore → AI)

| Kênh | Phát hiện bằng | Người chơi né bằng | Lore |
|---|---|---|---|
| **Chấn động đáy** | bước chân (đi > 60% tốc), Dậm Nặng, đáp đất mạnh, dash | đi chậm (cần analog < 60%), đứng yên, lướt trên vùng bơi | Áp Lực Chì làm rung đáy |
| **Âm thanh** | tiếng súng (bán kính 12 ô), nổ cavitation, chuông | nấp sau **Nhiệt Tầng** hoặc **màn bọt khí** (chặn âm) | bestiary "4 kênh" |
| **Ánh sáng** | đèn, chớp súng, vầng sáng hero (2,5 m) | tắt đèn / không bắn | quang hướng (phototaxis) |
| **Hóa học** | máu: khi hero < 35% máu, mùi lan theo dòng | ra khỏi dòng chảy, đi ngược dòng | sinh vật ngửi máu |

## Phần B — Máu quái suy ra từ số nhát chém

**Công thức:** `Máu` chọn sao cho **số nhát thật theo chuỗi combo** (10 / 10 / 15 lặp lại; từ F2 là 10 / 10 / 15 / 20) đúng bằng mục tiêu ở bậc kiếm dự kiến. Tính bằng `_calc/metrics.py` (bản trước dùng "sát thương trung bình" nên một số ô lệch 1 nhát, người soát phát hiện). Sát thương trung bình tham khảo: combo 3 = 11,7 / 19,8 / 28 / 36,2 / 44,3; combo 4 = 13,8 / 23,4 / 33 / 42,6 / 52,2 cho bậc 0–4.

| Tầng | Bậc kiếm dự kiến (combo) | Quái nhỏ | Quái thường | Tinh nhuệ |
|---|---|---|---|---|
| I (Nghĩa Địa, Hang Tảo) | 0 (combo 3) | **25** (3 nhát) | **45** (4) | **120** (11) |
| II (Hẻm Chuông, Hầm Muối) | 1 (combo 3) | **50** (3) | **90** (5) | **220** (12) |
| III (Cổ Thành, Ống Vang) | 2 (combo 4) | **80** (3) | **165** (6) | **330** (11) |
| IV (Rãnh Hóa Thạch) | 3 (combo 4) | **105** (3) | **210** (6) | **450** (12) |
| V (Lõi Neo) | 4 (combo 4) | — | — | **500** (cấu trúc kiểm định, 11) |

**Quay lại vùng cũ** (quái thường bị đánh bằng bậc kiếm sau, output `_calc`): Tầng I 4 → 3 → **2** → 2 → 2 nhát; Tầng II 5 → 4 → 3 → 3; Tầng III 6 → 4 → 4. Quái nhỏ Tầng I (25) chết **1 nhát** từ bậc 3 (31; bậc 2 = 24 còn thiếu 1).

> **Vì sao:** HK giữ boss ở 40–80 nhát suốt game, nhưng để quái cũ tụt về 1 nhát khi kiếm mạnh lên (`R3` §1.7–1.8). Đó chính là **cảm giác mạnh lên khi quay lại vùng cũ** (`R5` §3). Độ khó vùng sau đến từ **loài mới cứng hơn**, không tăng máu loài cũ (`R3` §1.7). Khi một loài cũ phải xuất hiện lại ở tầng sâu, dùng **biến thể** (tên mới, màu mới, thêm 1 hành vi), không lén tăng máu.

## Phần C — 24 loài (14 đã có + 10 mới) + 7 mini-boss

Ký hiệu vai trò (Birkhead, `R4` R34): **Khuyến** (khuyến khích một cơ chế), **Ép** (bắt buộc cơ chế), **Đập** (quái vui để đập), **Thử** (thử kỹ năng). Không gian: **Đáy**, **Giữa** (giữa nước), **Bẫy**, **Gác** (tinh nhuệ gác nhánh). Sát thương mặc định **1 Vảy**; đòn 2 Vảy luôn ghi rõ và có báo trước ≥ 48 f (04 Q4.1).

### Tầng I — Nghĩa Địa Thuyền Đắm & Hang Tảo Huyết (180–480 m)

| # | Loài | Vai trò | Giác quan | Máu | Đòn (gồng / chém / hồi) | Sát thương | Khắc chế / bài học | Rơi |
|---|---|---|---|---|---|---|---|---|
| 1 | **Cua Quan Tài** (đã có) | Ép · Bẫy-Đáy | chấn động | 45 | Nằm giả rương; bung: **húc đỏ** gồng 36 / lao 4 ô 12 f / hồi 30 f | 1 | Mai trước bật kiếm (chém trúng mai ⇒ clash bạc, không mất máu). **Nhảy qua đầu chém bụng sau** hoặc bắn bật nắp. Bài học: "rương cũng có thể là quái" (dạy trước Boss 4 mồi giả). Dấu hiệu thường trực: nắp rương phập phồng thở mỗi 2 s | 8–15 Sv |
| 2 | **Hải Quỳ Roi Rụt Sáng** (đã có) | Khuyến · Bẫy | ánh sáng (sợ sáng) | 25 | Quất roi bạc gồng 24 / 6 f / 20 f, tầm 3 ô | 1 | Chớp súng hoặc bắn cụm bào tử sáng ⇒ **rụt vào hốc 3,5 s** (công cụ, không phải bẫy). Dạy: súng còn là đèn | — |
| 3 | **Hà Đục Khoan** (đã có) | Đập · Bẫy làn | chấn động trên gỗ | 25 | Thò đầu khoan từ vách: mạt gỗ rơi + tiếng khoan **36 f** (lao thân ⇒ chuẩn đỏ) trước khi đâm ngang 5 ô | 1 (chạm thân khi đang khoan) | Đứng yên ⇒ không phát hiện. Chém đúng lúc đầu thò ⇒ gãy mũi khoan. **Dụ đâm vào cột mục ⇒ sập cầu, mở lối tắt** | — |
| 4a | **Tàn Quân Cờ Đỏ — Lính Kiếm Móc** (đã có) | Đập | nhìn | 45 | Combo 2 nhát bạc: gồng 26 f / 4 f; **nhát 2 gồng riêng 24 f, có vệt bạc riêng** / hồi 24 f | 1 | Clash nhát 1 ⇒ khựng, chém bù. Thoại "Thằng khăn đỏ… trả tàu lại đây!" (40% lore) | 5–10 Sv |
| 4b | **Tàn Quân — Lính Lao Thừng** (đã có) | Thử (giữ cự ly) | nhìn | 45 | Ném lao: tia ngắm 30 f / bay 300 px/s / **kéo dây về 40 f = cửa phạt** | 1 | Dash xuyên khi lao đang bay, chém lúc kéo dây | 5–10 Sv |
| 4c | **Tàn Quân — Xạ Thủ Súng Ẩm** (đã có) | Thử | nhìn + âm | 25 | Súng hỏa mai ẩm: ngắm 30 f, **3 viên toả số lẻ** (viên giữa nhắm người) 260 px/s; nạp lại 2 s | 1 | Phát đầu trượt. Nhích ngang một bước để né toả lẻ (`R4` §2). Áp sát ⇒ chạy lùi | 5–10 Sv |
| 5 | **Đỉa Dầu Trần** (**MỚI**) | Khuyến · Bẫy-trần | rung + ánh sáng | 25 | Treo trong trần dầu; rơi thẳng khi hero đi ngang dưới: **giọt dầu đen rơi trước 36 f** + tiếng nhớt | 1 + dính dầu (chậm 50% 1 s) | Nhìn bóng giọt dầu trên sàn, dừng một nhịp. **Đạn Nhiệt đốt trần ⇒ đỉa cháy rụng cả loạt**. Lore: kelp-oil ghi "sinh vật ký sinh ẩn trong dầu sẽ lao xuống tập kích" | — |
| 6 | **Bầy Cá Mòi Xương** (**MỚI**) | Đập · Giữa (bầy) | nhìn + rung | 8 mỗi con, bầy 6–10 | Tối đa **2 con lao** cùng lúc (vé bầy), **gồng 36 f** (đỏ: lao thân); còn lại bơi vòng | 1 | Chém ngang quét bầy, mỗi con chết 1 nhát. **Nguồn chém dễ để nạp mana** (không phải vật phẩm rơi) ⇒ dạy vòng chém để bắn. Chỉ ở cột khí Hang Tảo (vùng bơi). Lore: mưa xác hữu cơ nuôi cá nhỏ | — |

- **Mini-boss Tầng I** (chi tiết `06` Q6.4): **Thuyền Phó Tàn Quân** (290 máu): combo 3 nhát (nhát 1–2 bạc 26/24 f; nhát 3 viền đỏ: chém xoay 36 f) + gọi 1 Lính Lao. Gác nhánh Boong Tàu Đô Đốc / Bản Ghi #2.

### Tầng II — Hẻm Chuông Công Nghiệp & Hầm Muối Cổ Tích (450–980 m)

| # | Loài | Vai trò | Giác quan | Máu | Đòn | Sát thương | Khắc chế / bài học | Rơi |
|---|---|---|---|---|---|---|---|---|
| 7 | **Sao Biển Răng Cưa** (đã có) | Đập · làn cố định | rung cáp + hóa | 50 | Cuộn tròn **36 f** (tiếng răng cưa rít) rồi **lăn dọc ống / tường / trần 260 px/s** theo làn cố định | 1 (chạm thân **khi lăn**) | Chém ngang bị bật (clash). **Bắn trúng tâm khi đang lăn ⇒ rơi xuống hồ muối**. Nhảy qua theo nhịp làn | 10 Sv |
| 8 | **Tôm Súng Ngắn** (đã có) | Ép · bắn tỉa | âm + nhìn gần | 50 | Khóa chốt **48 f** ("tách" + sáng trắng-lam ở kẽ càng) → đạn bọt 2 nhịp: bay 240 px/s, **chạm / hết tầm thì nổ xanh sau 0,4 s** bán kính 2 ô | 1 | Nấp **màn bọt khí** (giảm 85% sóng nổ). Nhịp 1 né dash. Chém lúc càng mở | 10–15 Sv |
| 9 | **Thợ Lặn Đứt Cáp** (đã có) | Thử · nặng | rung | 90 | Cờ lê nặng bạc gồng **40 f** / 6 f / hồi **40 f**; giáp cứng khi gồng | **1** (Tầng II chưa được dùng đòn 2 Vảy, 04 Q4.1) | Clash được (viền bạc) ⇒ +30 phá thế. **Hai đòn kết vào kính mũ ⇒ vỡ kính, "nổ lõm" chết ngay** (lore Implosion Kill) | 15 Sv + 1 Mảnh Đồng Cáp ở con đặt sẵn duy nhất của khu |
| 10 | **Mực Nang Gương Muối** (đã có) | Khuyến · Giữa | nhìn + sóng | 50 | Vân thôi miên (làm nhòe màn 1 s); **phun mực đặc** gồng 30 f: đám mực làm chậm 40% + che tầm nhìn 2 s; mực đánh lạc đạn đuổi | 1 + chậm | Chém chéo từ trên xuống. **Bắn bọt cavitation thổi tan mây mực.** Dạy đọc vị trí qua dấu hiệu nhỏ (lớp gợn) | 10 Sv |
| 11 | **Lươn Ống Khí** (**MỚI**) | Đập · Bẫy làn | rung + âm | 50 | Trú trong ống đồng gãy; thò ra cắn **đỏ** gồng 36 f (bọt trào ở miệng ống) rồi rút về | 1 | Chém đầu khi rút về (cửa 30 f). Bắn vào ống ⇒ lươn bị đẩy ra lộ thân | — |
| 12 | **Rận Muối Kết Tinh** (**MỚI**) | Khuyến (pogo nạp dash) | rung | 50 | Bò trên vách / trần hố muối; bị đánh ⇒ **cuộn tròn thành quả cầu muối cứng** (chém bật, viền bạc) 3 s | 1 (chỉ khi lăn trên dốc) | **Chém xuống nảy pogo trên lưng cuộn ⇒ nạp lại dash giữa hố** (vượt hố rộng hơn nhảy + dash khi có Rận bám ở giữa). Pogo chỉ cao 2,5 ô nên không dùng để lên gờ. Đòn kết / đạn phá giáp ⇒ vỡ vỏ. Dạy pogo (HK) | 5 Nc (= 0,5 Sv) |
| 13 | **Cá Dơi Sonar** (**MỚI**) | Ép · Giữa săn | **âm (sonar)** | 90 | Tuần tra **trên** Nhiệt Tầng; phát sonar "click" mỗi 2,5 s (vòng sóng nhìn thấy được); trúng vòng ⇒ lao **đỏ** gồng 40 f | 1 | **Lặn dưới Nhiệt Tầng ⇒ vô hình với nó** (lore halocline-salt-vaults). Đứng yên khi vòng sóng quét qua. Dạy tàng hình, chuẩn bị Tầng IV | 10 Sv |

- **Mini-boss Tầng II** (`06` Q6.4): **Thợ Lặn Trưởng Ca** (500 máu): cờ lê (bạc 40 f) + móc kéo người lại (tóm đỏ 40 f, có 0,7 s thoát), gác Xác Chuông Số 4. **Tôm Súng Đôi** (2 con, mỗi con 260 máu; đạn chẵn kẹp hai bên: "đứng yên" mới né được, `R4` §2) gác Két Sắt Salthold.

### Tầng III — Cổ Thành Nere-Keth & Thánh Đường Ống Vang (850–1.480 m)

| # | Loài | Vai trò | Giác quan | Máu | Đòn | Sát thương | Khắc chế / bài học | Rơi |
|---|---|---|---|---|---|---|---|---|
| 14 | **Sứa Chuông Điện** (đã có) | Khuyến · vùng cấm | điện + cộng hưởng | 80 | Trôi theo trục Mạch Phù Ấn; ngân chuông **60 f** rồi phóng **vòng điện** bán kính 3 ô (khe hở ≥ 1,5 lần hurtbox) | 1 | Bắn đỉnh chuông ⇒ lệch pha, tắt điện, rơi như đá **4 s** (thành bục đứng tạm!). Hoặc dash i-frame qua vòng | 15 Sv |
| 15 | **Bạch Tuộc Đá Khắc** (đã có) | Thử · tinh nhuệ phục kích | nhìn + âm gần | 330 | Giả tượng; mắt chữ W chớp khi bị soi. Ba thế theo cách người chơi di chuyển: **người đi đáy ⇒ quất roi 8 tay** (bạc, 28 f); **người nhảy / bơi ⇒ phóng gai** (đỏ, 36 f); **người bắn ⇒ dẹt mình né** (hurtbox −70%). Đổi thế mất **0,4 s = cửa phạt** | 1 | Đọc thế qua hình dáng. Clash roi ⇒ cắt 1 tay, mất ngụy trang (`R4` §7 mimic octopus) | **1 Hạt Hải Quang Sạch — chỉ con đặt sẵn ở Hành Lang Tượng (Cổ Thành), rơi một lần**; các con khác 15 Sv |
| 16 | **Ốc Sên Vang Tần** (đã có) | Khuyến (vị trí) | âm | 80 | Không chủ động. Bị đánh / trúng sóng âm ⇒ vỏ nhấp nháy **50 f** rồi **nổ dây chuyền** 3 ô, mỗi mắt xích trễ 0,3 s | **2** (cả quái lẫn người; Tầng III, báo trước 50 f ≥ 48) | **Vũ khí môi trường**: dụ quái mạnh đến gần rồi kích nổ. Nổ làm nứt tường vôi (mở bí mật) | — |
| 17 | **Cua Đèn Đền** (**MỚI**) | Đập · Đáy | nhìn | 80 | Vác đèn san hô trên càng; vung đèn bạc gồng 26 f; đèn chiếu sáng 4 ô quanh nó | 1 | Hạ xong ⇒ **đèn rơi, nhặt được, soi phòng tối 30 s** (chuẩn bị Tầng IV, dạy "ánh sáng là tài nguyên") | 10 Sv |
| 18 | **Chình Phù Ấn** (**MỚI**) | Thử · Giữa (vùng bơi) | điện | 165 | Cưỡi Mạch Phù Ấn; lao thẳng dọc ống **đỏ** gồng 40 f (ống sáng dồn về phía nó), tốc 1,8× bơi | 1 | Bơi ra khỏi trục ống trước khi lao. Lao trượt ⇒ kẹt đầu vào mép ống 1 s, chém tự do. Dạy đọc làn trong vùng bơi 360° | 15 Sv |

- **Mini-boss Tầng III** (`06` Q6.4): **Hộ Vệ Đèn Cổ** (820 máu, cấu trúc san hô Thal-Vael tự động giữ đèn): quét bạc 28 f; đập đất xanh lan sóng 50 f; chiếu tia sáng làm chói 48 f; hồi máu từ đèn gần (bắn tắt đèn trước). Gác Sảnh Tranh Tường nhánh bí mật.

### Tầng IV — Rãnh Hóa Thạch Leviathan (1.400–2.050 m)

| # | Loài | Vai trò | Giác quan | Máu | Đòn | Sát thương | Khắc chế / bài học | Rơi |
|---|---|---|---|---|---|---|---|---|
| 19 | **Giun Ống Lưu Huỳnh** (đã có) | Khuyến (đi chậm) | **chấn động + âm** | 105 | Mù. Đi nhanh / Dậm / bắn trong 5 ô ⇒ cát rung **36 f** rồi vòi răng phóng lên làn cố định 4 ô (đỏ) | 1 | **Đi chậm** (analog < 60%) hoặc lướt bằng luồng nhiệt phía trên. Dạy di chuyển nhẹ | — |
| 20 | **Rình Mồi Siêu Đen** (đã có) | Thử · tinh nhuệ săn | ánh sáng yếu | 450 | Vô hình ngoài vầng sáng. Lộ qua **"sao bị che"** (che phù du phía sau) + tiếng ù trầm. Đớp **đỏ** gồng **48 f**; **không bao giờ bắt đầu đòn ngoài màn hình** | **2** (Tầng IV, báo trước 48 f) | Chớp sáng súng ⇒ lóa võng mạc **5 s** (chém tự do). Kính 705 nm thấy rõ. Né sang ngang khi nghe tiếng ù dồn | **1 Hạt Hải Quang Sạch — chỉ con đặt sẵn ở Hang Rình Mồi (7-09), rơi một lần (con ở 7-03 chỉ lướt qua trình diễn, không đánh)**; các con khác 15 Sv |
| 21 | **Tôm Đỏ Huyết Đới** (đã có) | Thử · cặp đôi | nhìn | 210 mỗi con | Luôn đi **cặp**; **luân phiên** lao kẹp từ hai phía (đỏ, gồng 40 f; không bao giờ cùng lúc, vé 1); dưới đèn lam thành đen vô hình, đỏ rực dưới 705 nm / ánh lửa | 1 | Đứng gần ống nhiệt (ánh cam làm lộ). Clash càng | 15 Sv |
| 22 | **Nhện Biển Xương** (**MỚI**) | Đập · Đáy (cầu xương) | rung | 105 | Chân dài như cà kheo bước trên cầu xương; đạp chân bạc gồng 28 f; thân cao ngang đầu hero | 1 | **Chân là bục**: đứng trên chân để với gờ cao (khi nó đứng yên). Chém thân bằng chém lên | 10 Sv |
| 23 | **Cá Đèn Mồi Con** (**MỚI**) | Khuyến · Bẫy mồi | ánh sáng | 105 | Thả mồi sáng **giống Chuông Lặn / vật phẩm**; lại gần ⇒ hút nước kéo vào **đỏ** gồng 40 f | 1 | Mồi nhấp nháy **lệch nhịp** so với vật phẩm thật, không có tiếng ngân. Bắn mồi ⇒ lộ. **Dạy trước cơ chế 3 mồi giả của Boss 4** | — |

- **Mini-boss Tầng IV** (`06` Q6.4): **Rình Mồi Già** (biến thể 20, **1.280 máu** = 31 nhát bậc 3, có đòn đuôi bạc 30 f) gác **hốc sọ phụ** (nhánh tùy chọn, **không phải** hốc chứa Chuông Rỉ Sét, chỗ đó 0 quái).

### Tầng V — Lõi Neo

| # | Loài | Vai trò | Máu | Ghi chú |
|---|---|---|---|---|
| 24 | **Bóng Nước Kiểm Định** (**MỚI**) | Thử | 500 | Cấu trúc nước áp suất của Bio-Core, **mô phỏng lại** một loài đã gặp (ngẫu nhiên trong 6 loài tiêu biểu) với nhịp nhanh hơn 15% (mọi đòn vẫn ≥ sàn báo trước QA.1). 3 trận trong hành lang trước Ngưỡng Tế Đàn. Bản nhỏ (100 máu) xuất hiện trong B5 Pha 1. Lore: "Bài Kiểm Định Tái Khóa". Ngưỡng Tế Đàn **0 quái** (lore) |

## Phần D — Kiểm tra bao phủ vai trò

| Tầng | Đáy | Giữa | Bẫy | Tầm xa | Tinh nhuệ gác | Loài mới |
|---|---|---|---|---|---|---|
| I | Cua Quan Tài, Lính Kiếm | Bầy Cá Mòi | Hải Quỳ, Hà Đục, Đỉa Dầu | Lính Lao, Xạ Thủ | Thuyền Phó | 2 |
| II | Thợ Lặn, Rận Muối | Mực Nang, Cá Dơi | Lươn Ống | Tôm Súng, Sao Biển (làn) | Trưởng Ca, Tôm Súng Đôi | 3 |
| III | Cua Đèn | Sứa Điện, Chình | Bạch Tuộc, Ốc Nổ | (Bạch Tuộc thế gai) | Hộ Vệ Đèn | 2 |
| IV | Nhện Xương, Giun Ống | Tôm Đỏ | Cá Đèn Mồi | (Rình Mồi) | Rình Mồi Già | 2 |
| V | — | — | — | — | Bóng Nước | 1 |

> **Dùng lại quái (thêm sau `13` Q13.1):** từ khu 6 trở đi **≥ 50% loài là loài dùng lại**, trộn theo cặp vai trò mới (Blasphemous: ~45% loài xuất hiện ở nhiều vùng, mỗi vùng chỉ thêm 2–6 loài riêng, `R9`). Ống Vang dùng lại toàn bộ quái Tầng III + mini-boss riêng; Rãnh có 2 loài mới + 3 loài đã có hình.

> Mỗi phòng ghép **≥ 2 vai trò đối nghịch** (Đáy + Giữa, hoặc Bẫy + Tầm xa) (`R4` R36 [N], `DeepSeaMV-04` "Vertical Lock"). Ví dụ: Cá Dơi (phạt ở cao, trên Nhiệt Tầng) + Rận Muối (chặn đường thấp, phải chém vỡ hoặc pogo qua) ⇒ phải canh nhịp sonar để đổi độ cao.

> Tổng: **24 loài** (14 cũ, tính Tàn Quân là 1 loài 3 biến thể, + 10 mới) + **7 mini-boss** (`06` Q6.4: Thuyền Phó, Mẹ Đỉa Dầu, Trưởng Ca, Tôm Súng Đôi, Hộ Vệ Đèn Cổ, Người Gác Đàn Ống, Rình Mồi Già). Khớp mục tiêu 22–24 loài đã bàn. Mỗi loài mới có **một bài học cơ chế riêng** dẫn tới một boss hoặc tầng sau (Cua Quan Tài & Cá Đèn ⇒ Boss 4; Cá Dơi ⇒ tàng hình Tầng IV; Rận Muối ⇒ pogo; Cua Đèn ⇒ ánh sáng). Đúng kiểu HK dạy chìa khóa bằng chính loài quái chặn đường (`R6` §5.2).


## Phần E — Rủi ro & cách đo
- Đo số lần trúng đòn theo loài. Loài nào gây > 30% số lần trúng của cả tầng thì xem lại báo trước / hitbox.
- Đếm số đòn "không thấy đến" trong video playtest (người chơi bị đánh mà không nhìn về phía quái). Mục tiêu 0. Nếu có thì tăng báo trước hoặc thêm tiếng.
- Người chơi có dùng mẹo môi trường (sứa rơi làm bục, ốc nổ dây chuyền, đỉa cháy) không? Mục tiêu ≥ 50% người chơi tự khám phá ít nhất 2 mẹo. Nếu không thì đặt thêm "bản tập" (03 Q3.5).
