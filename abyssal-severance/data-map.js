// Tab 2 — Bản Đồ Mặt Cắt Địa Tầng (Interactive Bathymetric Cutaway Map, 0m -> 2,400m).
// Hệ tọa độ SVG: 1500 x 2600. Độ sâu d (m) ánh xạ y = 120 + d * 0.98.
window.LORE_MAP = {
  width: 1500,
  height: 2600,
  depthToY: (m) => Math.round(120 + m * 0.98),

  strataBands: [
    { id: 'band-0', label: 'Mặt Biển Bạch Hải', d0: 0, d1: 180, atm: '1 – 19 atm', light: 'Quang tầng lọc', bg: '#13242c' },
    { id: 'band-1', label: 'Tầng I · Nghĩa Địa Thuyền Đắm', d0: 180, d1: 450, atm: '19 – 46 atm', light: 'Chạng vạng xanh xám', bg: '#101d24' },
    { id: 'band-2', label: 'Tầng II · Hẻm Chuông Công Nghiệp', d0: 450, d1: 850, atm: '46 – 86 atm', light: 'Tắt ánh sáng mặt trời (cấm đỏ/cam thụ động)', bg: '#0e1821' },
    { id: 'band-3', label: 'Tầng III · Cổ Thành San Hô Nere-Keth', d0: 850, d1: 1400, atm: '86 – 141 atm', light: 'Lân quang san hô & sóng đứng', bg: '#0c151d' },
    { id: 'band-4', label: 'Tầng IV · Rãnh Hóa Thạch Leviathan', d0: 1400, d1: 2050, atm: '141 – 206 atm', light: 'Vùng tối tuyệt đối · Vòng sáng 2.5m', bg: '#080c12' },
    { id: 'band-5', label: 'Tầng V · Tế Đàn Lõi Neo Triều Tịch', d0: 2050, d1: 2400, atm: '206 – 241 atm', light: 'Hải Quang bạch kim & khe nhiệt 464°C', bg: '#070a0f' }
  ],

  // Hình khối địa hình cắt dọc (tách vách đá trái/phải, buồng hang, hẻm, sảnh boss)
  geology: [
    // Vách đá Tây & Đông tạo rãnh chính
    { type: 'rock', d: 'M95,120 L510,120 L485,290 L380,350 L140,390 L135,590 L470,630 L520,760 L500,980 L430,1140 L130,1200 L125,1560 L470,1600 L500,1920 L460,2140 L520,2472 L95,2472 Z', fill: '#12181f', stroke: '#2a3946' },
    { type: 'rock', d: 'M1460,120 L990,120 L1015,280 L1035,510 L995,690 L1380,740 L1390,1080 L1010,1130 L985,1460 L1035,1900 L995,2160 L960,2472 L1460,2472 Z', fill: '#12181f', stroke: '#2a3946' },
    // Khoang rỗng Stratum I-W (Hang Tảo Huyết & Trần Dầu)
    { type: 'cavity', d: 'M165,395 C230,360 390,375 495,435 L505,575 C390,610 215,605 160,550 Z', fill: '#171c22', stroke: '#5a3a3a' },
    // Khoang rỗng Stratum II-E (Hầm Muối Cổ Tích)
    { type: 'cavity', d: 'M995,715 L1340,745 L1355,1055 L995,1080 L980,910 Z', fill: '#121f27', stroke: '#4c7585' },
    // Khoang rỗng Stratum III-W (Thánh Đường Ống Vang)
    { type: 'cavity', d: 'M155,1195 L495,1155 L505,1545 L165,1555 Z', fill: '#141722', stroke: '#8c6f3e' },
    // Hồ muối siêu đặc ở đáy Stratum II & Hầm Muối
    { type: 'brine', d: 'M620,825 Q760,842 900,825 L900,865 L620,865 Z', fill: '#214252', stroke: '#7fa8b8' },
    { type: 'brine', d: 'M1030,985 Q1185,1005 1335,985 L1335,1045 L1030,1045 Z', fill: '#214252', stroke: '#7fa8b8' },
    // Vòm dầu đen úp ngược ở I-W
    { type: 'oil', d: 'M200,395 Q335,365 465,415 L440,432 Q335,395 210,415 Z', fill: '#18141c', stroke: '#6c5a74' },
    // Xương sườn Leviathan khổng lồ ở Tầng IV
    { type: 'bone', d: 'M535,1650 Q640,1610 735,1665 M530,1735 Q645,1695 745,1750 M525,1825 Q640,1785 740,1840 M965,1660 Q860,1620 770,1675 M970,1755 Q855,1715 760,1770 M975,1845 Q865,1805 765,1860', fill: 'none', stroke: '#555d68' }
  ],

  // Dây cáp, lối tắt vòng lặp, đường bơi 360°, cổng phong ấn
  routes: [
    { id: 'r-cable-1', type: 'cable', label: 'Cáp tời Chuông 1 → Chuông 3 (0m – 540m)', d: 'M760,120 L760,410 L820,590 L820,655' },
    { id: 'r-cable-broken', type: 'cable-broken', label: 'Giếng Cáp Đứt (340m → 480m)', d: 'M760,420 L760,555' },
    { id: 'r-loop-west', type: 'shortcut', label: 'Vòng Lặp Tây: Nút Sáp Trần Dầu → Tầng II', d: 'M260,575 C260,650 510,645 555,660' },
    { id: 'r-loop-east', type: 'shortcut', label: 'Vòng Lặp Đông: Vết Nứt Kiến Tạo → Cánh Đông Nere-Keth', d: 'M1180,1045 C1180,1120 960,1100 925,1120' },
    { id: 'r-loop-organ', type: 'shortcut', label: 'Hẻm Cộng Hưởng: Thánh Đường Ống Vang → Tây Tầng IV', d: 'M320,1545 C320,1640 500,1630 555,1650' },
    { id: 'r-swim-1', type: 'swim', label: 'Khe Dòng Xiết Nông (Bơi 360°)', d: 'M610,335 Q665,375 615,415' },
    { id: 'r-swim-3', type: 'swim', label: '3 Cột Giếng Mạch Phù Ấn (Bơi 360°)', d: 'M655,1160 L655,1340 M760,1150 L760,1350 M865,1160 L865,1340' },
    { id: 'r-swim-4', type: 'swim', label: 'Ống Phun Thủy Nhiệt (Thang nhiệt 360°)', d: 'M595,1930 L595,1720 M915,1930 L915,1720' },
    { id: 'r-gate-1', type: 'gate', label: 'Cửa Xả Thủy Lực (760m — cần Móc Neo)', x1: 680, y1: 882, x2: 840, y2: 882 },
    { id: 'r-gate-4', type: 'gate', label: 'Cổng Ấn Phong Bốn Mảnh (2,050m — Chân+Tay+Thân+Đầu)', x1: 660, y1: 2129, x2: 860, y2: 2129 }
  ],

  // Các điểm tương tác trên bản đồ (giữ đủ toàn bộ ID s-* mà data-timeline.js liên kết!)
  pois: [
    // === 0m BỀ MẶT ===
    {
      id: 's-surface', x: 760, y: 120, depth: '0m', kind: 'hub', cat: 'core', layer: 'regions',
      title: 'Mặt Biển Bạch Hải — Bến Tời Hội Trục Vớt', meta: '0m · Cảng Kael-Var · Salthold · Wick-Isles',
      summary: 'Tàu Cẩu Hội Trục Vớt thả cáp thép chính xuống Chuông 1. Trên bờ là Cảng Kael-Var (đập đê 18m mở chợ Lễ Lưỡng Bách Niên 200 PE), Thành Đá Muối Salthold và Quần Đảo Bấc Đèn.',
      cause: 'Mỏ Neo bị chém đứt năm 0 PE làm mực triều rút, phơi bãi cạn cho Kael-Var xây cảng.',
      event: 'Kors từng bị kết án tại đây vì giữ lại Chuông 4 trong thảm họa 142 PE.',
      effect: 'Đích đến cuối cùng: Kors bơi tự do xuyên suốt 2,400m trở về Bạch Hải.',
      rules: ['Tiếp tế theo chu kỳ <strong>Triều Rút 14 ngày</strong>.', 'Tài liệu nền: Cảng Kael-Var, Salthold (34 thương thuyền), Wick-Isles.'],
      palette: [['#8ab7c2', 'Ánh mặt trời lọc'], ['#c29b54', 'Đồng bến tời']],
      links: [['t-kaelvar', 'Lễ hội 200 PE trên bờ'], ['t-salvage', 'Lịch sử Hội Trục Vớt'], ['t-wick', 'Quê hương Wick-Isles']],
      sources: ['systems/history-and-timeline.md', 'locations/shipwreck-graveyard.md']
    },

    // === TẦNG I: 180–450m ===
    {
      id: 's-graveyard', x: 645, y: 310, depth: '180–340m', kind: 'region', cat: 'core', layer: 'regions',
      title: 'I · Nghĩa Địa Thuyền Đắm & Túi Bùn Yếm Khí', meta: 'Stratum I · 180–340m · Kors tỉnh dậy',
      summary: 'Mảnh vỡ 34 thương thuyền Salthold và hạm đội Đô Đốc Xích Kỳ nằm chồng lên nhau. Kors tỉnh dậy tại Túi Bùn Yếm Khí (180m) với cơ thể cá nhân hóa (Image #2) và thanh kiếm mất lõi.',
      cause: 'Xác hạm đội 0 PE và tàu buôn Salthold bị hút xuống rãnh.',
      event: 'Kors nhặt phế liệu Súng Phép, gặp Lão Boyle, thu Mảnh #1 & #2, vượt Khe Dòng Xiết Nông.',
      effect: 'Dẫn tới Boong Tàu Đô Đốc và Đấu Trường Cự Giải Thiết Giáp.',
      rules: ['Vùng bơi: <strong>Khe Dòng Xiết Nông</strong> (hiệu ứng Venturi giữa 2 thân tàu).', 'Kinh tế: rương tàu Salthold chứa <strong>18–45 Sv</strong>, Cua Giáp Rương canh giữ.'],
      palette: [['#4d7c7e', 'Lục xám khói'], ['#8a8365', 'Cát vàng xỉn']],
      links: [['t-awaken', 'Lý do Kors tỉnh'], ['t-armada', 'Hạm đội Xích Kỳ']],
      sources: ['locations/shipwreck-graveyard.md']
    },
    {
      id: 's-boyle', x: 865, y: 295, depth: '205m', kind: 'bell', cat: 'faction', layer: 'stations',
      title: 'Chuông Lặn Số 1 — Lão Boyle', meta: '205m · Trạm 1 atm · Mảnh #1',
      summary: 'Trạm chuông đồng 1 atm treo từ cáp Bạch Hải, nơi Lão Boyle làm ca 14 ngày. Shop bán Bình Huyết Tảo (2→5), nâng trần HP/Stamina. Kẹp ở vách chuông là Mảnh #1 (Sổ thu mua vàng).',
      cause: '', event: 'Thoại của Boyle thay đổi tại các mốc 0/5, 2/5, 4/5 Ấn.', effect: '',
      rules: ['Mảnh #1: Sổ thu mua ghi chép thỏi vàng bị gỉ muối khác thường.', 'Điểm mù: Boyle không biết đê Kael-Var mở được là nhờ chính nhát kiếm của Kors.'],
      palette: [], links: [['t-economy', 'Bảng giá vật tư']],
      sources: ['characters/npc-cast.md', 'systems/diegetic-fragments.md']
    },
    {
      id: 's-runeflint', x: 580, y: 365, depth: '235m', kind: 'loot', cat: 'branch', layer: 'loot',
      title: 'Xưởng Phế Liệu & Súng Phép Runeflint', meta: '235m · Khu Khe Dòng Xiết',
      summary: 'Kors ghép thân Súng Phép Runeflint từ phế liệu hạm đội và tinh thể Hải Quang thô. Bắn Cavitation Bolt tiêu hao Mana để phá khóa gỉ, kích van từ xa.',
      cause: '', event: '', effect: 'Mở đường vào Hẻm Chuông và các van cơ khí Tầng II.',
      rules: ['Bậc 2 Heavy Bore (ở Tầng III-W): nổ <strong>2 nhịp trễ 0.15s</strong>.'],
      palette: [['#4d9aa1', 'Buồng nén Hải Quang']],
      links: [['t-meme-rune', 'Chuỗi biến chất Hải Quang']],
      sources: ['artifacts/five-vessels-of-form.md']
    },
    {
      id: 's-armada-deck', x: 635, y: 395, depth: '285m', kind: 'cave', cat: 'lore', layer: 'fragments',
      title: 'Boong Tàu Đô Đốc Xích Kỳ · Mảnh #2', meta: '285m · Mảnh #2 (Bảng gỗ khắc móng)',
      summary: 'Thân soái hạm của Vane Râu Sắt gãy đôi. Tàn Quân Cờ Đỏ canh xác tàu. Trên vách khoang thuyền trưởng còn Mảnh #2 khắc bằng móng tay kể lại khoảnh khắc biển tách làm đôi năm 0 PE.',
      cause: '', event: '', effect: 'Mảnh #2 hé lộ góc nhìn thực chiến về Đêm Sóng Đen.',
      rules: ['Có lối rẽ sang phía Tây: <strong>Khe Nứt Đá Vôi</strong> dẫn vào Hang Tảo Huyết.'],
      palette: [['#b8534b', 'Cờ đỏ mục']],
      links: [['t-armada', 'Đô Đốc Vane Râu Sắt'], ['t-frag', 'Mảnh #2']],
      sources: ['locations/shipwreck-graveyard.md', 'systems/diegetic-fragments.md']
    },
    {
      id: 's-bell-vanguard', x: 855, y: 410, depth: '310m', kind: 'bell', cat: 'system', layer: 'stations',
      title: 'Chuông Lặn Tiên Phong (Checkpoint)', meta: '310m · 0 kẻ địch · Dấu 8 móng',
      summary: 'Chuông tiền tiêu trống rỗng nằm ngay trước sân Boss 1. Khu vực an toàn 0-enemy để hồi phục; ngoài cửa chuông hằn rõ vết cào của 8 đầu chân đốt khổng lồ.',
      cause: '', event: '', effect: 'Lối tắt Dây Neo nối thẳng lên Chuông Số 1 sau khi mở chốt.',
      rules: ['Pháp y môi trường: <strong>8 vết đầu chân đốt</strong> cào sâu vào cát nén.'],
      palette: [], links: [],
      sources: ['locations/shipwreck-graveyard.md']
    },
    {
      id: 's-boss-1', x: 755, y: 455, depth: '340m', kind: 'boss', cat: 'core', layer: 'bosses',
      title: 'Đấu Trường Boss 1: Cự Giải Thiết Giáp', meta: '340m · Thưởng: Ấn #1 Đôi Chân',
      summary: 'Cua nhện cao 5.5m hàn mũi tàu đồng Đô Đốc lên mai. Pha 1 giáp kín — lừa húc kẹt cột buồm; Pha 2 vỡ giáp dậm sập sàn. Hạ gục trả lại đôi chân người + Dash Áp Suất & Wall-Kick.',
      cause: 'Hạch Đôi Chân bắn vào khoang tàu Đô Đốc năm 0 PE.',
      event: 'Đánh bại mở Giếng Cáp Đứt xuống Tầng II.',
      effect: 'Mở khóa: <strong>Dash Áp Suất · Đạp Tường · Dậm Nặng</strong>.',
      rules: ['Cấm dùng đạn thô ở Pha 1 vì giáp mũi tàu phản đòn.'],
      palette: [['#c29b54', 'Mũi đồng hàn']],
      links: [['t-restore', 'Ấn #1 Đôi Chân']],
      sources: ['characters/four-abyssal-wardens.md', 'locations/shipwreck-graveyard.md']
    },

    // === TẦNG I-W: HANG TẢO HUYẾT & TRẦN DẦU (280–480m) ===
    {
      id: 's-kelp', x: 350, y: 455, depth: '280–440m', kind: 'cave', cat: 'branch', layer: 'regions',
      title: 'I-W · Rừng Huyết Tảo & Chỗ Trú Rigg', meta: '280–440m · Nhánh Tây',
      summary: 'Hang đá vôi chứa thảm Huyết Tảo đỏ thẫm (nguồn hồi máu) và lán ẩn náu đầu tiên của Rigg "Mù Sóng". Vào từ Khe Nứt Đá Vôi sau tàu tiếp tế Xích Kỳ.',
      cause: '', event: 'Rigg đổi thông tin kho báu và thu hồi tảo.', effect: 'Mở đường tới Vòm Trần Dầu Đen.',
      rules: ['Huyết tảo dùng làm nguyên liệu pha <strong>Bình Huyết Tảo</strong>.'],
      palette: [['#b8534b', 'Huyết tảo'], ['#2e444d', 'Đá vôi xám xanh']],
      links: [['s-rigg', 'Rigg ở Tầng II-E']],
      sources: ['locations/kelp-oil-caverns.md']
    },
    {
      id: 's-oil-ceiling', x: 255, y: 425, depth: '310m', kind: 'cave', cat: 'lore', layer: 'fragments',
      title: 'Vòm Trần Dầu Đen Úp Ngược · Mảnh #3', meta: '310–420m · Dầu 880 kg/m³ · Túi khí đẩy lên',
      summary: 'Dầu thô nhẹ (880 kg/m³) bám thành vòm đen trên trần hang. Các túi khí lưu huỳnh bốc thẳng lên tạo giếng bơi 360°. Gần đó có Mảnh #3: đơn nợ thuốc của Boyle viết cho Rigg.',
      cause: '', event: 'Kích nổ Nút Sáp Nhựa Đường bằng Đạn Nhiệt tạo chớp nhiệt 2–3 giây.', effect: 'Mở Vòng Lặp Tây thông sang Tầng II.',
      rules: ['Chớp nhiệt cháy trần dầu kéo dài <strong>2–3s</strong>.'],
      palette: [['#18141c', 'Dầu đen'], ['#c97b3b', 'Chớp nhiệt']],
      links: [['t-frag', 'Mảnh #3']],
      sources: ['locations/kelp-oil-caverns.md', 'systems/diegetic-fragments.md']
    },
    {
      id: 's-kelp-perch', x: 430, y: 535, depth: '470m', kind: 'loot', cat: 'branch', layer: 'loot',
      title: 'Gác Đá Tàu Trinh Sát Xích Kỳ', meta: '470m · Cần Ấn #1 Đôi Chân (Wall-Kick)',
      summary: 'Mảnh tàu trinh sát mắc kẹt trên vách cao. Cần Wall-Kick để leo tới; thưởng rương vàng lớn và 1 Hạt Hải Quang Sạch.',
      cause: '', event: '', effect: 'Mang Hạt Hải Quang Sạch cho Ẩn Sĩ Ossa ở Tầng III.',
      rules: ['Yêu cầu: <strong>Ấn #1 Đôi Chân</strong>.'],
      palette: [], links: [['s-ossa', 'Đổi Hạt ở Ossa']],
      sources: ['locations/kelp-oil-caverns.md']
    },

    // === TẦNG II: 450–760m ===
    {
      id: 's-bellchasm', x: 760, y: 590, depth: '450–600m', kind: 'region', cat: 'core', layer: 'regions',
      title: 'II · Hẻm Chuông Công Nghiệp & Chuông Số 2', meta: 'Stratum II · 450–760m · Dưới 450m cấm đỏ/cam',
      summary: 'Hẻm đá vách đứng gắn đầy giàn khoan đồng, ống khí nén rò rỉ tạo Bức Màn Bọt Khí (giảm 85% sát thương sóng chấn động). Chuông Số 2 (480m) có kính lồi cong vào trong đề chữ "03.02".',
      cause: 'Hội Trục Vớt hạ giàn khoan tìm quặng đồng và Hải Quang thô.',
      event: 'Kors đi qua Giàn Khoan Đồng, gặp Marlow ở Trạm 3, điều tra xác Chuông 4.',
      effect: 'Mở hướng xuống Đấu Trường Boss 2 và nhánh Đông Hầm Muối.',
      rules: ['Luật ánh sáng: dưới <strong>450m</strong> cấm đỏ/cam thụ động.', 'Bức Màn Bọt Khí giảm <strong>85%</strong> sát thương xung kích.'],
      palette: [['#1e2e42', 'Chàm sắt'], ['#c29b54', 'Đồng rỉ']],
      links: [['t-bell4', 'Thảm họa 142 PE'], ['t-leak', 'Luật ánh sáng 450m']],
      sources: ['locations/industrial-bell-chasm.md']
    },
    {
      id: 's-marlow', x: 895, y: 645, depth: '540m', kind: 'bell', cat: 'faction', layer: 'stations',
      title: 'Trạm Chuông Số 3 — Marlow "Tay Đồng"', meta: '540m · Nâng cấp Súng Phép & Đạn Nhiệt',
      summary: 'Người sống sót duy nhất của Chuông 4 năm 142 PE. Xưởng nâng cấp Súng Phép, khoang Mana và chế Đầu Đạn Nhiệt Lưu Huỳnh. Sau khi hạ Boss 2, tiếng gõ dưới sàn Trạm 3 bỗng im bặt.',
      cause: '', event: 'Khóa chốt 80ms; bọt khí nổ chậm 0.4s.', effect: 'Đạn Nhiệt dùng để kích nổ Trần Dầu ở Tầng I-W.',
      rules: ['Điểm mù: Marlow tưởng tiếng gõ là mạch đồng, không biết đó là nhịp Tôm Bọ Ngựa.'],
      palette: [['#c29b54', 'Tay đồng']],
      links: [['t-marlow', 'Lý lịch 142 PE'], ['t-economy', 'Bảng giá xưởng']],
      sources: ['characters/npc-cast.md', 'locations/industrial-bell-chasm.md']
    },
    {
      id: 's-bell4-wreck', x: 645, y: 705, depth: '600m', kind: 'cave', cat: 'lore', layer: 'stations',
      title: 'Xác Chuông Lặn Số 4 (142 PE)', meta: '600m · 3 vết lõm đại bác · Cháy 5,000 K',
      summary: 'Vỏ chuông đồng dày 4cm bị nện lõm 3 hố như trúng đại bác, kèm dấu cháy phát quang 5,000 K từ bọt cavitation của Tôm Bọ Ngựa Xích Sắt.',
      cause: 'Tiếng khoan 142 PE kích động Tôm Bọ Ngựa mang Hạch Đôi Tay.',
      event: 'Marlow thoát chết nhờ vướng cáp; 11 thợ còn lại mất tích.',
      effect: 'Cảnh báo trực quan về đòn 2 nhịp trước khi vào Boss 2.',
      rules: ['Sonoluminescence: <strong>5,000 K</strong> trên vỏ đồng dày <strong>4cm</strong>.'],
      palette: [['#6e563b', 'Đồng cháy']],
      links: [['t-bell4', 'Sự kiện 142 PE']],
      sources: ['locations/industrial-bell-chasm.md']
    },
    {
      id: 's-boss-2', x: 760, y: 792, depth: '740m', kind: 'boss', cat: 'core', layer: 'bosses',
      title: 'Đấu Trường Boss 2: Tôm Bọ Ngựa Xích Sắt', meta: '740m · 2 Màn Bọt Khí · Thưởng: Ấn #2 Đôi Tay',
      summary: 'Đấu trường đáy giàn khoan có 2 Bức Màn Bọt Khí và Hồ Muối Siêu Đặc phản chiếu. Đòn đấm 2 nhịp cavitation (né nhịp 1 bằng Dash, nấp sau màn bọt triệt nhịp 2). Thưởng: Đôi Tay người + combo 4 nhát & Móc Neo.',
      cause: 'Hạch Đôi Tay khoáng hóa chùy thành tạ đồng.',
      event: 'Hạ gục mở Cửa Xả Thủy Lực (760m) và tời cáp lên thẳng Trạm Marlow.',
      effect: 'Mở khóa: <strong>Anchor-Grapple (Móc Neo)</strong> & combo 4 nhát.',
      rules: ['Bọt khí triệt tiêu <strong>85–90%</strong> sóng xung kích nhịp 2.'],
      palette: [['#c97b3b', 'Chớp 5,000 K'], ['#4d9aa1', 'Bọt khí']],
      links: [['t-restore', 'Ấn #2 Đôi Tay']],
      sources: ['characters/four-abyssal-wardens.md', 'locations/industrial-bell-chasm.md']
    },

    // === TẦNG II-E: HẦM MUỐI CỔ TÍCH (620–980m) ===
    {
      id: 's-salt', x: 1120, y: 800, depth: '620–980m', kind: 'region', cat: 'branch', layer: 'regions',
      title: 'II-E · Hầm Muối Cổ Tích & Dải Nhiệt Khúc Xạ', meta: '620–980m · Brine >300‰ · Nhánh Đông',
      summary: 'Mỏ muối ngầm có Dải Nhiệt Tầng Khúc Xạ (720m) phản xạ sóng sonar giúp ẩn mình, và Hồ Muối Kép bảo quản xác tàu nguyên vẹn 200 năm không phân hủy.',
      cause: 'Độ mặn >300‰ (1,320–1,400 kg/m³) tạo môi trường yếm khí tuyệt đối.',
      event: 'Vết Nứt Kiến Tạo Đông (980m) tạo Vòng Lặp Phải thông vào cánh Đông Nere-Keth.',
      effect: 'Cần Áo Nhớn Osmotic (từ Ossa) mới lặn xuống đáy hồ muối lấy két sắt.',
      rules: ['Độ mặn Brine <strong>&gt;300‰</strong>, tỷ trọng <strong>1,320–1,400 kg/m³</strong>.'],
      palette: [['#244f6e', 'Lam tinh thể'], ['#a7c2cc', 'Muối bạc']],
      links: [['t-salthold', 'Hạm đội buôn Salthold']],
      sources: ['locations/halocline-salt-vaults.md']
    },
    {
      id: 's-rigg', x: 1095, y: 730, depth: '660m', kind: 'bell', cat: 'faction', layer: 'stations',
      title: 'Trạm Chợ Rigg "Mù Sóng"', meta: '660m · Đổi Nc lấy bùa & bản đồ nhánh',
      summary: 'Rigg dời trạm từ Hang Tảo sang cửa Hầm Muối, bán bản đồ kho báu nhánh ngang và đổi Nc lấy bùa tăng vàng rơi.',
      cause: '', event: '', effect: '',
      rules: ['Điểm mù: Rigg không bao giờ hỏi vì sao 4 tàu Salthold chết trong tư thế tháo chạy.'],
      palette: [], links: [['s-kelp', 'Lán sớm ở Hang Tảo']],
      sources: ['characters/npc-cast.md']
    },
    {
      id: 's-salt-museum', x: 1250, y: 865, depth: '780m', kind: 'cave', cat: 'lore', layer: 'fragments',
      title: 'Bảo Tàng 4 Tàu Salthold (Chuyến 14) · Mảnh #4', meta: '780m · Bẫy Ảo Ảnh Halocline · Mảnh #4',
      summary: '4 thương thuyền Salthold còn nguyên gỗ, vải buồm và xác thủy thủ giữ tư thế chèo trốn chạy. Chứa Mảnh #4 (Bản kê hàng Chuyến 14). Bề mặt hồ muối tạo Ảo Ảnh túi khí giả.',
      cause: '', event: '', effect: 'Mảnh #4 chứng minh Salthold biến mất ngay đêm Đô Đốc Xích Kỳ tấn công.',
      rules: ['Không thể thở ở bề mặt halocline — đó là <strong>Ảo Ảnh Khúc Xạ</strong>.'],
      palette: [['#a7c2cc', 'Muối bạc']],
      links: [['t-frag', 'Mảnh #4'], ['t-salthold', 'Chuyến 14']],
      sources: ['locations/halocline-salt-vaults.md', 'systems/diegetic-fragments.md']
    },
    {
      id: 's-salt-vault', x: 1185, y: 1015, depth: '940m', kind: 'loot', cat: 'branch', layer: 'loot',
      title: 'Két Sắt Salthold Đắm (Đáy Hồ Muối)', meta: '940m · Cần Áo Nhớn Osmotic',
      summary: 'Két bạc lớn nhất trò chơi kèm bản vẽ nâng cấp nặng của Runeflint. Áp lực thẩm thấu ở đáy >300‰ nghiền nát thợ lặn thường nếu thiếu Áo Nhớn Osmotic.',
      cause: '', event: '', effect: '',
      rules: ['Yêu cầu: <strong>Áo Nhớn Osmotic</strong> (từ Ossa).'],
      palette: [], links: [['s-ossa', 'Nhận Áo Osmotic']],
      sources: ['locations/halocline-salt-vaults.md']
    },

    // === TẦNG III: CỔ THÀNH NERE-KETH (850–1,280m) ===
    {
      id: 's-nereketh', x: 760, y: 1030, depth: '850–1,120m', kind: 'region', cat: 'core', layer: 'regions',
      title: 'III · Quảng Trường San Hô Nere-Keth', meta: 'Stratum III · 850–1,280m · Cổ thành Thal-Vael',
      summary: 'Đô thị bazan chàm kết hợp san hô phát quang của người Thal-Vael cổ đại. Mục tiêu hành hương của Giáo Hội Đèn Vực. Nối trực tiếp với Sảnh Tranh Tường 18m và 3 cột Mạch Phù Ấn.',
      cause: 'Được xây dựng để bảo vệ và điều hòa đường xuống Lõi Neo.',
      event: 'Kors gặp Ẩn Sĩ Ossa, đọc 60% lịch sử tại Bia Đá & Tranh Tường.',
      effect: 'Mở đường sang Thánh Đường Ống Vang (Tây) và Boss 3 (Đáy sảnh).',
      rules: ['Bắt đầu xuất hiện <strong>Mạch Phù Ấn</strong> (360° Lumen-Currents).'],
      palette: [['#121e2e', 'Bazan chàm'], ['#4d9aa1', 'San hô ngọc lam'], ['#c29b54', 'Vàng cổ thành']],
      links: [['t-thalvael', 'Văn minh Thal-Vael']],
      sources: ['locations/nere-keth-coral-citadel.md']
    },
    {
      id: 's-ossa', x: 895, y: 1055, depth: '920m', kind: 'bell', cat: 'faction', layer: 'stations',
      title: 'Tháp Áp Suất Khô — Ẩn Sĩ Ossa', meta: '920m · Đổi Hạt Hải Quang · Kính 705nm & Áo Osmotic',
      summary: 'Trưởng lão Giáo Hội Đèn Vực. Nhận Hạt Hải Quang Sạch để rèn Kính Lọc 705nm (nhìn xuyên ngụy trang đỏ Tầng IV), Áo Nhớn Osmotic và Ấn Tái Tạo. Nhận ra dòng máu Thal-Vael trong Kors ở mốc 3/5.',
      cause: '', event: '', effect: '',
      rules: ['Kính <strong>705nm</strong> ≠ Flashburst: nhìn xuyên cá săn mồi đỏ thay vì làm chói.'],
      palette: [], links: [['t-choir', 'Giáo Hội Đèn Vực']],
      sources: ['characters/npc-cast.md', 'locations/nere-keth-coral-citadel.md']
    },
    {
      id: 's-mural-hall', x: 620, y: 1075, depth: '960m', kind: 'cave', cat: 'lore', layer: 'fragments',
      title: 'Sảnh 3 Tranh Tường 18m & Bia Đá · Mảnh #6', meta: '960m · Hé lộ 60% lịch sử',
      summary: 'Ba bức phù điêu cao 18m tạc nghi lễ tách biển của Thal-Vael và chiếc Mỏ Neo 40m. Chân bia khắc Mảnh #6 cho phép người chơi ghép tới 60% sự thật trước khi xuống Tầng IV.',
      cause: '', event: '', effect: '',
      rules: ['Mỗi bức tranh cao <strong>18m</strong> dọc trục thang đứng.'],
      palette: [['#c29b54', 'Phù điêu vàng cổ']],
      links: [['t-frag', 'Mảnh #6']],
      sources: ['locations/nere-keth-coral-citadel.md', 'systems/diegetic-fragments.md']
    },
    {
      id: 's-swim', x: 760, y: 1210, depth: '1,050–1,180m', kind: 'cave', cat: 'system', layer: 'regions',
      title: '3 Cột Giếng Mạch Phù Ấn (Vùng Bơi 360°)', meta: '1,050–1,180m · 4 dạng Vùng Bơi & 8-Plane Parallax',
      summary: 'Ba cột nước cao 60m phát sáng liên tục nối tầng trên xuống Đấu Trường Boss 3. Là chuẩn mực của 4 dạng Vùng Bơi 360° (Mạch Phù Ấn · Hồ Muối · Ống Phun Thủy Nhiệt · Buồng Khí Chìm).',
      cause: '', event: '', effect: '',
      rules: ['Plane P4 giữ tương phản <strong>70–100%</strong>, rim-light 1–2px.', 'Mỗi vùng có <strong>≥ 2 lối vào/ra</strong>.'],
      palette: [['#4d9aa1', 'Dòng lân quang']],
      links: [['t-leak', 'Vật lý 8-Plane']],
      sources: ['locations/depth-strata-and-swim-zones.md']
    },
    {
      id: 's-boss-3', x: 760, y: 1335, depth: '1,240m', kind: 'boss', cat: 'core', layer: 'bosses',
      title: 'Đấu Trường Boss 3: Mẫu Sứa Chuông Cổ', meta: '1,240m · Đại sảnh 3 tầng · Thưởng: Ấn #3 Thân Mình',
      summary: 'Sứa điện-áp suất khổng lồ treo giữa đại sảnh 3 tầng. Pha 1 phá 3 van thạch anh trên 3 cột lân quang; Pha 2 chống sóng áp suất đảo chiều. Thưởng: Lồng ngực nở + Kháng Áp Suất vĩnh viễn.',
      cause: 'Hạch Thân Mình nhập túi khí sứa cổ thành lò phản ứng sinh học.',
      event: 'Chiến thắng mở Hố Đứt Gãy Tầng IV (1,280m).',
      effect: 'Mở khóa: <strong>Kháng Áp Suất Tầng Sâu</strong> & màng thở Hải Quang.',
      rules: [], palette: [['#4d9aa1', 'Xúc tu điện']],
      links: [['t-restore', 'Ấn #3 Thân Mình']],
      sources: ['characters/four-abyssal-wardens.md', 'locations/nere-keth-coral-citadel.md']
    },

    // === TẦNG III-W: THÁNH ĐƯỜNG ỐNG VANG (1,100–1,480m) ===
    {
      id: 's-organ', x: 330, y: 1275, depth: '1,100–1,300m', kind: 'region', cat: 'branch', layer: 'regions',
      title: 'III-W · Thánh Đường Ống Vang & Phím Cộng Hưởng', meta: '1,100–1,480m · Nhánh Tây',
      summary: 'Cơ cấu đàn ống thủy lực khổng lồ của Thal-Vael. Hành lang phím Trầm / Trung / Cao giải đố bằng Súng Phép để đóng/mở bức màn bọt khí cản sóng hủy diệt.',
      cause: 'Hệ thống phát tín hiệu cộng hưởng điều khiển nhịp nước sâu.',
      event: 'Đi qua Giếng Cộng Hưởng Sóng Đứng cao 50m (bơi 360° hổ phách).',
      effect: 'Thông Hẻm Cộng Hưởng (1,480m) sang sườn Tây Tầng IV.',
      rules: ['Tần số chia 3 bậc: <strong>Trầm · Trung · Cao</strong>.'],
      palette: [['#c29b54', 'Sóng hổ phách'], ['#1b1930', 'Đá đen tím']],
      links: [['t-choir', 'Chuỗi Choir-Pulse']],
      sources: ['locations/sunken-resonance-organ.md']
    },
    {
      id: 's-organ-vault', x: 255, y: 1465, depth: '1,390m', kind: 'loot', cat: 'lore', layer: 'fragments',
      title: 'Bục Hai Trưởng Lão & Hầm Đĩa Sóng · Mảnh #5', meta: '1,390m · Mảnh #5 · Heavy Bore 2 nhịp',
      summary: 'Phòng chỉ huy nơi hai trưởng lão Thal-Vael ghi lại Mảnh #5 (Phiếu thử nghiệm ống vang số 7 về dấu hiệu rạn Lõi Neo). Chứa nâng cấp Heavy Cavitation Bore (nổ 2 nhịp 0.15s) và Ống Ngắm Cộng Hưởng.',
      cause: '', event: '', effect: '',
      rules: ['Bản nâng cấp <strong>Heavy Bore</strong> cho Súng Phép Runeflint.'],
      palette: [], links: [['t-frag', 'Mảnh #5']],
      sources: ['locations/sunken-resonance-organ.md', 'systems/diegetic-fragments.md']
    },

    // === TẦNG IV: RÃNH HÓA THẠCH LEVIATHAN (1,400–2,050m) ===
    {
      id: 's-fossil', x: 760, y: 1620, depth: '1,400–1,850m', kind: 'region', cat: 'core', layer: 'regions',
      title: 'IV · Cầu Xương Sống Leviathan (Vùng Occluded)', meta: 'Stratum IV · 1,400–2,050m · Vòng sáng 2.5m',
      summary: 'Bộ xương Leviathan dài hàng trăm mét bắc ngang vực mực đen (#07090f). Vòng sáng quanh Kors thu hẹp còn 2.5m. Sinh vật săn mồi hấp thụ 99.95% ánh sáng; bẫy đỏ 705nm ẩn trong bóng tối.',
      cause: '', event: 'Rọi Kính 705nm để lộ kẻ rình mồi; cưỡi luồng Ống Phun Thủy Nhiệt 60–464°C.',
      effect: 'Tiến vào Chuông Lặn Rỉ Sét và Hố Xương Sườn Boss 4.',
      rules: ['Vòng sáng Hero: <strong>2.5m</strong>.', 'Da thú săn mồi đen <strong>99.95%</strong>.'],
      palette: [['#07090f', 'Đen vực mực'], ['#6e7480', 'Xương hóa thạch'], ['#b8534b', 'Nhiệt 464°C']],
      links: [['t-leak', 'Vật lý 705nm']],
      sources: ['locations/leviathan-fossil-trench.md']
    },
    {
      id: 's-bell-rusted', x: 875, y: 1850, depth: '1,910m', kind: 'bell', cat: 'system', layer: 'stations',
      title: 'Chuông Lặn Rỉ Sét (Checkpoint Độc Lập)', meta: '1,910m · Không có dây cáp nối mặt biển',
      summary: 'Chuông đồng cổ bị đứt hoàn toàn khỏi mặt biển, mắc kẹt trong hốc sọ Leviathan gần Boss 4. Hoạt động như điểm lưu cuối trước hầm xương sườn.',
      cause: '', event: '', effect: '',
      rules: ['Không có dây tời nối lên Bạch Hải.'],
      palette: [], links: [],
      sources: ['locations/leviathan-fossil-trench.md']
    },
    {
      id: 's-boss-4', x: 760, y: 1990, depth: '2,000m', kind: 'boss', cat: 'core', layer: 'bosses',
      title: 'Đấu Trường Boss 4: Hài Ngư Đèn Lồng', meta: '2,000m · 3 mồi giả · Thưởng: Ấn #4 Đầu & Sonar',
      summary: 'Hố xương sườn tối đen có 2 ống phun thủy nhiệt ở rìa. Boss tung 3 đốm mồi sáng giả; dùng Kính 705nm định vị đầu thật và kích ống phun/Flashburst gây chói Rhodopsin Bleaching 4.5s. Thưởng: Mặt người & Nhãn Quang Sonar.',
      cause: 'Hạch Đầu biến mồi câu sinh học thành hải đăng giả.',
      event: 'Mở Cổng Ấn Phong Bốn Mảnh (2,050m) bằng Chân + Tay + Thân + Đầu.',
      effect: 'Mở khóa: <strong>Nhãn Quang Sonar</strong> dò toàn bộ bản đồ tối.',
      rules: ['Thời gian mù sáng Rhodopsin Bleaching: <strong>4.5s</strong>.'],
      palette: [['#b8534b', 'Ống phun nhiệt'], ['#a7c2cc', 'Sóng Sonar']],
      links: [['t-restore', 'Ấn #4 Đầu']],
      sources: ['characters/four-abyssal-wardens.md', 'locations/leviathan-fossil-trench.md']
    },

    // === TẦNG V: TẾ ĐÀN LÕI NEO TRIỀU TỊCH (2,050–2,400m) ===
    {
      id: 's-altar-threshold', x: 645, y: 2195, depth: '2,110m', kind: 'bell', cat: 'system', layer: 'stations',
      title: 'Ngưỡng Tế Đàn & 8 Trụ Luật Bazan', meta: '2,110m · Điểm hồi sinh 0-enemy',
      summary: 'Bệ đá bazan khắc 8 trụ luật cổ quanh Núi Kho Báu Cô Đọng. Là điểm hồi sinh an toàn 0 kẻ địch trước khi bước vào Khoang Triệt Tiêu Trọng Lực.',
      cause: '', event: '', effect: '',
      rules: [], palette: [], links: [],
      sources: ['locations/vael-moor-anchor-core.md']
    },
    {
      id: 's-vaelmoor', x: 760, y: 2360, depth: '2,400m', kind: 'boss', cat: 'core', layer: 'regions',
      title: 'V · Mỏ Neo Triều Tịch 40m & Tàn Ảnh Vực Chủ', meta: '2,400m · Khoang Triệt Tiêu Trọng Lực · Ấn #5 Ký Ức',
      summary: 'Mỏ Neo khổng lồ cao 40m mang vết chém năm 0 PE giữa Khoang Triệt Tiêu 100% Áp Lực Chì (bơi 360° toàn sảnh). Tàn Ảnh Vực Chủ kiểm định Re-Anchoring Stress Test → trả về Ấn #5 Ký Ức (100% cốt truyện).',
      cause: 'Chính Kors (Image #2) là người chém đứt Mỏ Neo năm 0 PE.',
      event: 'Hàn gắn Mỏ Neo bằng San Hô Tự Hàn; Mạch Phù Ấn Tốc Hành đưa Kors bơi thẳng về 0m.',
      effect: 'Kết thúc chu kỳ chia cắt 200 năm giữa Bạch Hải và Vực Vael.',
      rules: ['Nhiệt lõi khe nứt: <strong>464°C</strong>.', 'Khoang triệt tiêu <strong>100% Áp Lực Chì</strong>.'],
      palette: [['#e4ecee', 'Hải Quang bạch kim'], ['#c29b54', 'Vàng cổ vỡ']],
      links: [['t-blacktide', 'Hiện trường Đêm Sóng Đen'], ['t-restore', 'Kết cục hàn gắn'], ['t-anchor', 'Lõi Mỏ Neo gốc']],
      sources: ['locations/vael-moor-anchor-core.md']
    }
  ]
};
