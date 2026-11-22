# 10 — Độ Khó, Cảm Giác "Mình Giỏi Lên" & Các Mẹo Ẩn

> Phụ thuộc vào: `02`, `04`, `05`, `06`, `09`, `_research/R5` (chính), `R4`.
> Câu hỏi của bạn: *"làm sao để người chơi cảm thấy họ thật sự tốt hơn qua từng phần? Có thể fake cảm giác họ tốt hơn bằng difficulty curve? Fake cảm giác…"*

---

## Q10.1 — Hình dạng đường cong độ khó

> **Bản chi tiết theo đoạn (hai đường độ khó / cường độ, 9 loại đoạn, biểu đồ cho 8 khu) ở `10b-segment-difficulty-curves.md`.** Mục dưới là tổng quan cấp boss, giữ để tham chiếu.

| Ô | Nội dung |
|---|---|
| **Vấn đề** | Độ khó tăng theo thời gian như thế nào để không chán, không nản? |
| **Phương án** | (A) Tăng tuyến tính. (B) **Bậc thang gợn sóng / răng cưa**: tăng trong một tầng, đỉnh ở boss, **tụt xuống** đầu tầng mới (vì cơ thể mới quá mạnh so với quái đầu tầng), đỉnh sau cao hơn đỉnh trước. |
| **Chọn** | **(B)**: đỉnh boss sau cao hơn đỉnh trước, **đo bằng số lần thử trung vị** theo bảng Q10.6 (B1 1–3 → B2–B3 3–6 → B4 5–10 → B5 5–15). Bản trước ghi "khó hơn 15–25% mỗi đỉnh" nhưng chính bảng mục tiêu tăng tới ~+125% từ B1 lên B2 (người soát phát hiện) ⇒ bỏ con số %. Ở cấp phòng: **dồn – đỉnh – lặng**: sau mỗi phòng đấu trường là một phòng lặng / di chuyển nhẹ. |
| **Vì sao** | Hodent: bậc thang gợn sóng (`R5` §1). Left 4 Dead AI Director (Booth, GDC 2009): Dồn → Đỉnh 3–5 s → Tắt dần → Lặng 30–45 s gần như không có mối đe dọa (`R5` §1, nguồn A). Mô hình răng cưa đã có sẵn trong bảng số nhát (`09` Q9.6: quái tầng hiện tại 4–6 nhát, quái cũ 2 nhát, quái nhỏ cũ 1 nhát). |

```
độ khó
  │                                              ▲B5
  │                                   ▲B4       ╱
  │                       ▲B3       ╱ │      ╱
  │           ▲B2       ╱ │      ╱    │   ╱
  │  ▲B1    ╱ │      ╱    │   ╱       │ ╱
  │ ╱ │  ╱    │   ╱       │ ╱          
  │╱  │╱      │ ╱                         ← tụt ở đầu mỗi tầng (cơ thể mới mạnh hơn quái đầu tầng)
  └──────────────────────────────────────── thời gian (11 giờ)
    Tầng I    II        III        IV      V
```

## Q10.2 — Ba nguồn "cảm giác mạnh lên" (thật, không phải mẹo)

| Nguồn | Cách làm | Bằng chứng |
|---|---|---|
| **1. Động từ mới** | Mỗi Hóa Hình = động từ mới cho cả khám phá lẫn chiến đấu (`07` Q7.2) | Koster: vui là học mẫu mới; mẫu đã thuộc thì chán ⇒ phải liên tục thêm mẫu (`R5` §1). Tiến trình bằng năng lực được cảm nhận mạnh hơn tiến trình chỉ số (`R5` §3) |
| **2. Thân thể thay đổi trên màn hình** | Khom → đứng thẳng → người; tầm chém dài ra (1,75 → 2 → 2,25 ô); đi nhanh hơn (F1 +20%); nhảy cao hơn (5,1 → 8,1 ô) | SDT: năng lực (competence) + nâng cấp hữu hình (`R5` §3, Ryan 2006 nguồn A). **Luật cấm** (cảnh báo `R5`): không Hóa Hình nào được làm chậm hay giảm cơ động. Đã kiểm: mọi số ở 02 chỉ tăng |
| **3. Quay lại vùng cũ** | Quái thường Tầng I tụt từ 4 nhát xuống 2, quái nhỏ còn 1 (`09` Q9.6). Ngay sau Đôi Tay có **3 lý do mạnh để quay về Tầng I**, nhưng **không ép**: (a) Lão Boyle đổi thoại ở mốc 2/5 (lão đánh rơi cờ lê khi thấy dáng hải tặc, lore npc-cast) và bán thêm +1 Vảy thứ hai; (b) vòng neo trên Khe Dòng Xiết dẫn tới Mảnh Vảy (08a §1.7); (c) thang tời Chuông 2 → Chuông 1 đưa lên trong 15 s | `R5` §3 khuyên đặt tuyến **bắt buộc**. Ta chọn **có động cơ, không bắt buộc**, vì quay lại bắt buộc dễ thành "backtracking tẻ nhạt", lỗi số 1 trong `DeepSeaMV-08` §1. Đo ở playtest: nếu < 60% người chơi tự quay lại Tầng I trước B3 thì chuyển (b) thành vật phẩm bắt buộc |

> **Đo đường cong sức mạnh tương đối** (`R5` §3, [R]): ngay sau boss, người chơi mạnh hơn mức cần cho quái đầu tầng **1,5–2×**; tới boss kế, còn **~1,0×**. Kiểm tra với số của ta: nếu đầu Tầng II người chơi vẫn cầm kiếm bậc 0 mà gặp quái 90 máu thì cần **8 nhát** (10+10+15 lặp lại, `_calc`), quá nặng. Vì vậy: **2 viên Bazan đầu tiên nằm trên đường chính trong 10 phút đầu Tầng II**, viên thứ 3 sau một thử thách nhỏ; trước khi rèn, chỉ đặt **loài 50 máu** (Rận Muối, Lươn, Tôm Súng) ⇒ 5 nhát bậc 0 (10 + 10 + 15 + 10 = 45 < 50). Rèn bậc 1 xong: quái 90 máu ⇒ 5 nhát (đúng chuẩn). Luật đã ghi vào 08a §3.

## Q10.3 — Mẹo ẩn ("fake" có kiểm soát)

| Ô | Nội dung |
|---|---|
| **Nguyên tắc chọn mẹo** | (1) **Giấu mẹo chỉ giúp người đang khó khăn**: người chơi gần như không phát hiện, và không làm giảm độ vui (Hunicke 2005: số lần chết trong 15 phút đầu từ 6,4 xuống 4,0, độ vui không giảm, nhiều người không biết; `R5` §2, nguồn A). (2) **Không giấu độ khó tăng khi chơi giỏi** (kiểu rank RE4): người giỏi phát hiện thì bực. (3) **Tắt toàn bộ mẹo ẩn ở chế độ Khó**, như XCOM 2 tắt ở Legend ⇒ người giỏi tin game (`R5` §2). (4) Không dùng mẹo **làm yếu cảm giác mạnh lên** (HK tăng máu Husk Sentry sau khi nâng kiếm: chỉ áp cho tinh nhuệ, `R5` §2). |

| Mẹo | Cơ chế cụ thể (số) | Tiền lệ | Rủi ro bị phát hiện |
|---|---|---|---|
| **Vảy cuối dai** | Đòn làm máu từ **≥ 2 Vảy về 0** ⇒ còn **1 Vảy** (tối đa 1 lần mỗi lần nghỉ Chuông). Khi còn 1 Vảy: bất tử sau trúng đòn **1,2 → 1,8 s** | Dead Cells: đòn chí mạng khi còn trên 25% máu thì để lại 1 HP; BioShock: đòn chí mạng cho 1–2 s bất tử (`R5` §2, `R4` R49) | rất thấp: người chơi thấy "sống sót trong gang tấc" |
| **Đòn đầu từ quái chưa thấy mình không trúng** | Quái phải qua trạng thái CẢNH GIÁC 0,4 s mới được ra đòn (05 QA.5). **Phát bắn đầu luôn trượt** (05 QA.3) | BioShock "first shots miss" (`R4` R17) | thấp: đọc như phát cảnh cáo |
| **Vé trúng cho quái tầm xa** | Chỉ 1 quái tầm xa được bắn trúng mỗi 0,8 s × hệ số | Game AI Pro 3 ch.33 (`R4` R18) | thấp: các phát trượt vẫn sượt sát, có tiếng |
| **Boss nhẹ tay sau nhiều lần chết** | Chết ở cùng boss ≥ 3 lần (tính từ lần thắng gần nhất) ⇒ mỗi lần chết thêm: **máu boss −6%**, báo trước **+2 f**; cộng dồn tối đa **−24% máu, +8 f** (không cộng dồn vào Pha 1 B5 khi đã giảm 60%, `16` P1). Thắng thì đặt lại | Crash Bandicoot (Aku Aku, điểm lưu thêm sau N lần chết: "help weaker players without changing the game for better players", `R5` §2, nguồn A) | thấp: chỉ người đang kẹt mới gặp; ở boss trung vị 3–6 lần thử thì phần lớn người chơi nhận ≤ −12% |
| **Chạy lại ngắn + bỏ cảnh mở đầu** | ≤ 10 s, 0 quái, bỏ cảnh từ lần 2 (06 Q6.1) | `R5` §4.3 | không phải mẹo: chất lượng |
| **Điều khiển dễ dãi** | coyote 6 f, nhớ phím, chỉnh góc 8 px, nhận đạp tường 4 px (02 Q2.9) | Celeste (Thorson; `R5` §2: "gần như không ai phản đối") | không có: đọc là "điều khiển tốt" ⇒ tăng cảm giác năng lực (Ryan 2006) |
| **Bình không mất khi uống bị ngắt** | 04 Q4.6 | — | không: thấy là công bằng |
| **Đỡ đòn rộng tay** | clash box +4 px so với hitbox chém | — | không |
| **Bao vàng không rơi chỗ chết nguy hiểm** | Nếu chết trong hố gai / lõi cột nhiệt / ngoài đất đứng ⇒ bao vàng hiện ở **mép đất an toàn gần nhất** | `R5` §5 [N]: tiền nổi tới túi khí / cổng boss gần nhất để không chết lần hai | thấp |

**Không dùng:**
- **Rank tăng độ khó theo kỹ năng (RE4):** người giỏi thấy bị phạt vì giỏi (`R5` §2).
- **Tăng máu quái theo cấp vũ khí:** phá cảm giác mạnh lên. Chỉ dùng cho **tinh nhuệ hậu game** (Q10.5), nơi người chơi tự chọn.
- **Hồi sinh miễn phí kiểu Vita-Chamber** (máu boss không hồi khi chết): bị chê "quá dễ", phá căng thẳng (`R5` §2).

## Q10.4 — Trợ giúp nhìn thấy (người chơi tự chọn)

| Trợ giúp | Khi nào hiện | Hiệu ứng | Vì sao |
|---|---|---|---|
| **Bùa Hộ Vực** | sau **5 lần chết** ở cùng boss, Chuông Lặn hỏi một lần: "Mang bùa hộ thân?" | nhận sát thương **−40%** trong trận boss đó; **không** khóa thành tựu, **không** đánh dấu save | Doom Eternal Sentinel Armor (2 lần chết, chỉ boss, không khóa thành tựu, `R5` §2). Ta đặt 5 lần vì đã có nhẹ tay ẩn từ lần 3 |
| **Menu Hỗ Trợ** (có từ đầu, mục Tùy chọn) | bất cứ lúc nào | tốc độ game 70–100%; stamina vô hạn; sát thương nhận 50%; +2 bình; bỏ qua đoạn platform (dịch chuyển tới gờ an toàn sau 3 lần rơi) | Celeste Assist Mode: phản hồi "overwhelmingly positive". Sau khi sửa: không nhãn, không dấu xấu hổ trên save (`R5` §2). Super Guide của Nintendo bị chê vì đánh dấu save ⇒ ta **không đánh dấu** |

## Q10.5 — Chế độ Khó & nội dung khó tùy chọn

| Nội dung | Chi tiết | Ai dùng (dự kiến) |
|---|---|---|
| **Chế độ "Áp Suất Cao"** (chọn ở đầu game hoặc hậu game) | tắt **toàn bộ** mẹo ẩn Q10.3 (trừ điều khiển dễ dãi); sức chứa vé 16 / 13; đòn ≥ 48 f của tinh nhuệ và boss gây **2 Vảy** (giữ luật 04 Q4.1); báo trước −15% **nhưng kẹp theo loại**: bạc ≥ 24 f, đỏ ≥ 36 f, sóng / đòn 2 Vảy ≥ 48 f (sàn công bằng 05 QA.1, 04 Q4.1) | Ori hard mode: 4,9–6,5% người sở hữu (`R5` §4.1) |
| **Ký Ức Chiến Trận** (hậu game, mở bằng Xà Cừ Chí Tôn) | đánh lại 5 boss + 7 mini-boss, mỗi bậc "Áp Suất" +máu +tốc đòn (theo mô hình Boss Cell của Dead Cells) | Boss Cell giữ 56–78% người chơi mỗi bậc (`R5` §4.1) |
| **Chế độ "Một Hơi"** (chết là mất save), hậu game | tùy chọn | HK Steel Soul 4,7% (`R5` §4.1) |

## Q10.6 — Chỉ số playtest (KPI) cho độ khó

| Chỉ số | Mục tiêu | Nguồn |
|---|---|---|
| Số lần thử trung vị mỗi boss | B1 1–3 · B2–B3 3–6 · B4 5–10 · B5 5–15 | `R5` §4.2 [R] |
| p90 số lần thử | ≤ 3 × trung vị | `R5` §4.2 |
| "Thắng sát nút" (thắng khi còn ≤ 30% máu) | ≥ 60% số trận thắng boss | `R5` §6 (Scheurle: cảm giác vừa đủ sống sót) |
| Tỉ lệ bỏ cuộc ở một khu đầu | ≤ 15% | `R5` §6 |
| Người hạ B1 chơi tới kết thúc | 40–50% (nếu chất lượng ngang HK / Celeste) | Steam: HK 35%, Celeste 49%, Silksong 48%, Ori 43% (`R5` §4.1) |
| Điểm chết bản đồ nhiệt (heatmap) | không có ô nào chiếm > 10% số lần chết của khu | đề xuất |

> **Chỗ nguy nhất là B1–B3**: dữ liệu Steam cho thấy người chơi rời đi nhiều nhất ở boss 1–3 (Nine Sols −29% ở bức tường đầu; Celeste −18% ở Ch3; HK −22% ở Soul Master / Mantis Lords). Các boss sau chỉ mất 2–10% mỗi boss (`R5` §4.1). ⇒ Ưu tiên playtest và mẹo ẩn cho **B1, B2, B3** trước.

## Q10.7 — Rủi ro
- Nhẹ tay ẩn bị cộng đồng đào ra (datamine). Cách giảm thiệt hại: công bố trong mục "Hỗ trợ" rằng game có điều chỉnh nhẹ khi người chơi gặp khó, và **chế độ Áp Suất Cao tắt hết**. Cách XCOM 2 làm: tắt ở Legend nên người giỏi vẫn tin (`R5` §2).
- Người cố tình chết để boss yếu đi: tối đa −24%. Chết nhiều tốn thời gian hơn tiết kiệm ⇒ không đáng để lạm dụng.
