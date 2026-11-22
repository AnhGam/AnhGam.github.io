# 11 — Game Feel Tổng Hợp (phản hồi từng hành động)

> Phụ thuộc vào: `02`, `04`, `05`, `_research/R8` (chính), `R3` §4.4.
> Nguyên tắc nền (bằng chứng): một nghiên cứu xếp hạng bình luận Steam theo "cảm giác va chạm" thấy **hitstop, âm thanh khớp hình và điều khiển camera** là 3 yếu tố quan trọng nhất; thiếu một trong ba là có thể "phá hỏng" cảm giác (arXiv 2208.06155, `R8` §0). "Juice" làm game hấp dẫn hơn nhưng **không làm người chơi chơi giỏi hơn** (Hicks và cộng sự, CHI PLAY 2019) ⇒ tiêu "juice" vào đúng 3 chỗ trên, và **không bao giờ đánh đổi độ dễ đọc**.

---

## Q11.1 — Bảng phản hồi theo hành động (60 fps, 640×360)

> **Nhãn trung thực:** hitstop theo bậc (3/5/8 f), mức trauma cộng (+0,14 / 0,28 / 0,52), tịnh tiến tối đa 8 px, giảm 2,8 trauma/s, nháy theo bậc, luật đẩy dưới nước đều là **đề xuất notebook** (`R8` §1.2, §2.3, §3 ghi [internal]). Phần có nguồn gốc: mô hình trauma² + nhiễu Perlin (Eiserloh GDC 2016), đóng băng dash 3 f (Celeste source), hitstop clash/đòn nặng nằm trong dải Smash / SF6 (`R8` §1.1). Tất cả chỉnh ở greybox.

| Hành động | Hitstop (người / mục tiêu) | Rung màn (trauma +) | Nháy | Âm thanh | Hạt / hình | Nguồn |
|---|---|---|---|---|---|---|
| Đi | — | — | — | bước trầm 120–300 Hz, 8–12 biến thể, cao độ ±7% | 2–3 hạt bùn | `R8` §7.2 |
| Nhảy (bật) | — | — | — | quẫy vây "phụt" | vây xòe 2 f, chuỗi bọt dưới chân | 02 Q2.2 |
| Đáp (rơi > 3 ô) | — | +0,10 (không thấy rung, chỉ "nảy" camera 2 px) | — | "bịch" trầm | nén 3 f + bụi ngang | `R8` §8 |
| Quẫy Vây / Dash Áp Suất | đóng băng 2 / 3 f | — | — | "vụt" + rít áp suất (T1) | vệt bọt chân không, giãn người 2 f | Celeste dash freeze 3 f (`R8` §1.1) |
| Chém nhát 1–2 trúng | **3 / 4 f** | 0 | quái trắng 2 f | "chát" kim loại 1,8–4,2 kHz + thân 120–900 Hz | tia lửa nhỏ | `R8` §9 (nhẹ 3 f) |
| Đòn kết trúng | **5 / 7 f** | +0,28 | quái trắng 3 f | lớp trầm thêm | tia lửa lớn | `R8` §1.2 (vừa) |
| Neo Bổ trúng | **8 / 10 f** | +0,52 | trắng 4 f + viền | "bùm" trầm + đuôi 150 ms | hất văng, vệt nước | `R8` §1.2 (nặng) |
| Va tường (quái bị hất) | 0 / 8 f | +0,52 | — | "rầm" | bụi tường | `R8` §1.2 |
| **Clash** | **6 / 6 f chung** | +0,28 | sao vàng trắng `#FFF29C` 120–180 ms | "keng" 1,5–4,2 kHz + chuông; nhạc & môi trường giảm −4 dB trong 250 ms | tia lửa tỏa | `R8` §7.2, 04 Q4.4 |
| Bắn Bọt Cavitation | 0 | +0,05 (đẩy camera ngược hướng bắn 3 px, 100 ms) | chớp nòng 1 f | "pụp" nén khí | vòng bọt | Vlambeer "camera kick" (`R8` §2.2) |
| Bọt nổ nhịp 2 | 1 f | +0,14 | chớp trắng-lam 2 f (sonoluminescence) | "tách" khô | vòng khúc xạ | `R8` §1.2 (đạn ít hitstop) |
| Nhát Cắt Hải Quang | 4 f khi thả | +0,35 | — | ngân dài | lưỡi liềm sáng | — |
| Mana đầy | — | — | vòng HUD lam 150 ms | chuông 2 nốt 1,6 → 3,2 kHz, **không lọc** | — | `R8` §7.2 |
| Người chơi trúng đòn | **12 f** (đòn 2 Vảy: 18 f) | +0,5 | màn đỏ mép 0,1 s | âm thế giới bị bóp nghẹt trong thời gian bất tử | nhấp nháy 0,08 s | HK đóng băng + bóp âm (`R8` §1.1, §5) |
| Hạ quái | 4 f (hạ cuối phòng: 8 f) | +0,2 | — | "phụt" + tiếng rơi | xác / vỏ **nằm lại** 10 s | Vlambeer "permanence" (`R8` §0) |
| Hạ boss | 30 f + chậm 0,5× trong 1 s | +0,8 | trắng toàn màn 1 lần | im lặng 1 s rồi nhạc | — | — |

**Luật hitstop:** tối đa **12 f** cho đòn thường (trừ hạ boss). Người tiếp tục trước mục tiêu ~2 f ⇒ có lợi thế khung hình, combo mượt. **Nhớ phím vẫn chạy trong lúc hitstop.** Dưới nước: đóng băng nhân vật + vật lý, **nước và hạt nền vẫn chạy** ("asymmetric freeze") (`R8` §1.2 [internal]).

**Luật rung màn:** mô hình **trauma** của Eiserloh (GDC 2016): độ rung = trauma², nhiễu Perlin (không ngẫu nhiên từng khung), tịnh tiến tối đa **8 px**, xoay ≤ 1°, giảm 2,8 trauma/s, làm tròn về pixel nguyên (`R8` §2). Hệ quả có chủ đích: **đòn nhẹ không rung** (trauma 0,14 ⇒ 0,16 px), chỉ dùng hitstop + nháy + tiếng.

## Q11.2 — Giật lùi & đẩy

| Đối tượng | Giá trị | Ghi chú |
|---|---|---|
| Người chơi khi chém trúng trên đất | **0** | Thân chì (trụ cột 1). Thay cho giật lùi kiểu HK, ta đẩy **quái** ra (04 Q4.2) |
| Người chơi khi chém trúng trên không | khựng trôi 8 f (giảm rơi 85%) | Dead Cells "air stall" |
| Người chơi khi trúng đòn | 1 ô, khóa 0,15 s | 04 Q4.1 |
| Quái nhỏ trúng nhát 1–2 | 0,5 ô | |
| Quái trúng đòn kết | 2 ô | |
| Quái trúng Neo Bổ | hất 620–850 px/s; va tường nếu vuông góc ≥ 280 px/s | `R8` §3 [internal] |
| **Luật dưới nước** | trong 6–9 f sau hitstop giảm lực cản còn 12–15%, nếu không thì cú đẩy biến mất sau 2–3 khung | `R8` §3 [internal] |

## Q11.3 — Phản hồi máu thấp
Dưới 30% máu (thường là 1–2 Vảy): băng giá ở 4 góc kính (**tâm màn luôn sạch**), vòng HUD nháy san hô, tiếng thở dồn, nhịp tim 40–80 Hz, nhạc nền −6 dB (`R8` §5 [internal]). **Không còi báo chói tai** (`DeepSeaMV-03`: còi chói tai lặp lại là lỗi kiểu Sonic).

## Q11.4 — Âm thanh: luật bus
| Bus | Lọc | Nội dung |
|---|---|---|
| Giao diện / bộ đồ | **không lọc** | mana đầy, nhặt đồ, chuông lưu |
| Chiến đấu & báo trước | lọc thấp 3,5–5,5 kHz, **sàn 2,5 kHz** | chém, clash, tiếng gồng đòn quái |
| Môi trường | lọc theo khoảng cách: 4,5 kHz ở 2 m → 1,1 kHz ở 15 m → 250–450 Hz ở 40 m | sóng, xích, quái xa |
- **Không lọc trầm cả game.** "Dưới nước nghe đục" chỉ áp cho môi trường; âm chiến đấu phải luôn rõ (`R8` §7.2). Lý do: âm báo đòn tới não nhanh hơn hình 30–80 ms (`R4` R3), lọc đục là lấy mất lợi thế đó.

## Q11.5 — Độ dễ đọc (ưu tiên cao hơn "juice")
| Luật | Giá trị | Nguồn |
|---|---|---|
| Hạt nền (tuyết biển) | độ đục 15–25%, độ sáng ≤ 40%, **không có đốm sáng 1–2 px** (dễ nhầm là đạn); mờ đi 40–60% khi đang đánh | `R8` §8 [internal] |
| Không khói / bọt đục che dáng gồng đòn của quái | luôn | `R8` §8 |
| Lớp tiền cảnh mờ còn 15% khi hero đi gần | luôn | lore depth-strata P6 |
| Viền sáng nhân vật & quái 1–2 px | luôn | lore depth-strata P4 |
| Nháy toàn màn | ≤ 3 lần / giây | WCAG 2.3.1 (`R8` §2.4) |
| Màu dành riêng (áp dụng cho **lớp gameplay P4**: viền, phát sáng của vật tương tác / quái / đòn) | **bạc** = đỡ được · **đỏ** = cắn / tóm · **lam / hổ phách** = sóng / điện · **đồng ấm** = vòng neo · **mắt đỏ đồng** = khóa súng | 04 Q4.4, 03 Q3.4. Không dùng các màu này làm **phát sáng / viền** trên lớp gameplay. Đèn amber, cờ đỏ trang trí chỉ được ở **lớp nền P2–P3**, giảm bão hòa ≥ 40% (lore depth-strata) |
| Dưới 450 m cấm đỏ / cam thụ động trên đá, cây | lore Beer-Lambert | màu đỏ còn lại là tín hiệu nguy hiểm, rất dễ đọc |

## Q11.6 — Trợ năng
Thanh trượt rung màn 0–100%, tắt nháy, phụ đề cho mọi âm báo đòn (vòng sóng hướng ở mép màn, `DeepSeaMV-03` 03.04: mọi tín hiệu âm phải có hình tương đương), đổi phím hoàn toàn, chọn giữ / bấm cho mọi nút giữ (neo chân, treo móc), chế độ mù màu (đỏ / bạc / lam có thêm **hình dạng** khác nhau: răng cưa / sọc / vòng).
