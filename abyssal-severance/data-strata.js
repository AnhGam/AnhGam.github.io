// Tab 2 — Trục Địa Tầng & Tiến Trình (Vertical Bathymetric Spine + Lateral Biomes). Cùng schema với data-timeline.js.
window.LORE_STRATA = [
  {
    id: 's-surface', kind: 'core', cat: 'core', x: 560, y: 0,
    title: 'Mặt biển Bạch Hải — Bến Tời Hội Trục Vớt', meta: '0m',
    summary: 'Cảng Kael-Var, Salthold, Wick-Isles. Dây cáp Chuông 1 thả xuống vực.',
    cause: '', event: 'Lễ Lưỡng Bách Niên đang diễn ra trên bờ.', effect: 'Đích đến cuối cùng khi Kors bơi tự do trở về.',
    rules: ['Tiếp tế mỗi tuần Triều Rút.'], palette: [['#92D1C2', 'Ánh mặt trời lọc']],
    links: [['t-kaelvar', 'Lễ hội trên bờ'], ['t-salvage', 'Lịch sử Hội']],
    sources: ['systems/history-and-timeline.md'],
    from: []
  },
  {
    id: 's-graveyard', kind: 'core', cat: 'core', x: 560, y: 240,
    title: 'I · Nghĩa Địa Thuyền Đắm → Boss 1 Cự Giải Thiết Giáp', meta: 'Stratum I · 180–340m · Ấn #1 Đôi Chân',
    summary: 'Kors tỉnh dậy ở 180m. Cua nhện vỏ đá cao 5.5m hàn mũi tàu Đô Đốc lên mai. Thưởng: chân người + Dash, Wall-Kick.',
    cause: 'Hạch Đôi Chân bắn xuống khoang tàu Đô Đốc năm 0 PE.',
    event: 'Pha 1 giáp tàu kín → lừa húc kẹt cột buồm; Pha 2 vỡ giáp, dậm sập sàn.',
    effect: 'Mở Dash Áp Suất, Đạp Tường, Dậm Nặng chống dòng xiết.',
    rules: ['Vùng bơi: <strong>Khe Dòng Xiết Nông</strong>.', 'Pháp y: vết <strong>tám</strong> đầu chân đốt ngoài Chuông Tiên Phong.'],
    palette: [['#3E6B6D', 'Lục xám khói'], ['#8A8365', 'Cát vàng xỉn'], ['#92D1C2', 'Ánh lọc']],
    links: [['t-awaken', 'Lý do Kors tỉnh'], ['t-armada', 'Xác tàu Đô Đốc & Vane']],
    sources: ['locations/shipwreck-graveyard.md', 'characters/four-abyssal-wardens.md'],
    from: [['s-surface', 'core']]
  },
  {
    id: 's-bellchasm', kind: 'core', cat: 'core', x: 560, y: 480,
    title: 'II · Hẻm Chuông Công Nghiệp → Boss 2 Tôm Bọ Ngựa Xích Sắt', meta: 'Stratum II · 450–760m · Ấn #2 Đôi Tay',
    summary: 'Hố giàn khoan có 2 màn bọt khí + hồ muối. Cú đấm 2 nhịp cavitation. Thưởng: tay người + combo 4 nhát, Móc Neo.',
    cause: 'Hạch Đôi Tay khoáng hóa chùy thành tạ đồng.',
    event: 'Né nhịp 1 bằng Dash, nấp sau Bubble Curtain triệt 90% nhịp 2.',
    effect: 'Mở Anchor-Grapple → vào cổng Nere-Keth.',
    rules: ['Khóa chốt <strong>80ms</strong>, bọt nổ chậm <strong>0.4s</strong>.', 'Sonoluminescence <strong>5,000 K</strong>.'],
    palette: [['#1E2E42', 'Chàm sắt'], ['#6E563B', 'Đồng rỉ'], ['#E89B3C', 'Đèn amber']],
    links: [['t-bell4', 'Thảm họa 142 PE']],
    sources: ['locations/industrial-bell-chasm.md', 'characters/four-abyssal-wardens.md'],
    from: [['s-graveyard', 'core'], ['s-kelp', 'loop']]
  },
  {
    id: 's-nereketh', kind: 'core', cat: 'core', x: 560, y: 720,
    title: 'III · Cổ Thành Nere-Keth → Boss 3 Mẫu Sứa Chuông Cổ', meta: 'Stratum III · 850–1,280m · Ấn #3 Thân Mình',
    summary: 'Đại sảnh 3 tầng, 3 cột Mạch Phù Ấn bơi 360°. 3 Khung Tranh Tường + Bia đá (Mảnh 6). Thưởng: Kháng Áp Suất.',
    cause: 'Hạch Thân Mình nhập túi khí sứa cổ thành lò điện-áp suất.',
    event: 'Pha 1 phá 3 van thạch anh; Pha 2 sóng áp suất đảo trọng lực.',
    effect: 'Lồng ngực nở, màng thở Hải Quang; xuống được Tầng IV.',
    rules: ['Vùng bơi: <strong>Mạch Phù Ấn</strong> (Lumen-Currents).'],
    palette: [['#121E2E', 'Bazan chàm'], ['#22D3EE', 'San hô ngọc lam'], ['#BFA054', 'Vàng cổ thành']],
    links: [['t-thalvael', 'Người xây Cổ Thành']],
    sources: ['locations/nere-keth-coral-citadel.md', 'characters/four-abyssal-wardens.md'],
    from: [['s-bellchasm', 'core'], ['s-salt', 'loop']]
  },
  {
    id: 's-fossil', kind: 'core', cat: 'core', x: 560, y: 960,
    title: 'IV · Rãnh Hóa Thạch Leviathan → Boss 4 Hài Ngư Đèn Lồng', meta: 'Stratum IV · 1,400–2,050m · Ấn #4 Đầu',
    summary: 'Hố xương sườn tối đen, 2 ống phun thủy nhiệt. Da siêu đen 99.95%, 3 đốm sáng giả. Thưởng: mặt người + Sonar.',
    cause: 'Hạch Đầu biến mồi câu thành hải đăng giả.',
    event: 'Rọi 705nm tìm đầu thật; dùng Flashburst/ống phun gây Rhodopsin Bleaching 4.5s.',
    effect: 'Nhãn Quang Sonar mở phong ấn Tầng V.',
    rules: ['Vòng sáng Hero chỉ <strong>2.5m</strong>.', 'Vùng bơi: <strong>Ống Phun Thủy Nhiệt</strong>.'],
    palette: [['#07090F', 'Đen vực mực'], ['#6E7480', 'Xương hóa thạch'], ['#E64E27', 'Lửa khe nhiệt']],
    links: [],
    sources: ['locations/leviathan-fossil-trench.md', 'characters/four-abyssal-wardens.md'],
    from: [['s-nereketh', 'core'], ['s-organ', 'branch']]
  },
  {
    id: 's-vaelmoor', kind: 'core', cat: 'core', x: 560, y: 1200,
    title: 'V · Tế Đàn Lõi Neo → Tàn Ảnh Vực Chủ', meta: 'Stratum V · 2,050–2,400m · Ấn #5 Ký Ức',
    summary: 'Sảnh triệt tiêu 100% Áp Lực Chì, bơi 360° quanh Mỏ Neo 40m. Re-Anchoring Stress Test → San Hô Tự Hàn.',
    cause: 'Bio-Core kiểm định chủ thể có đủ sức đóng vòng khóa.',
    event: 'Sóng áp suất đa tầng, dòng xiết đổi chiều, bọt chân không cỡ lớn.',
    effect: 'Ký Ức trả về 100%; Kors hàn Mỏ Neo, bơi về Bạch Hải.',
    rules: ['Vùng bơi: <strong>Khoang Triệt Tiêu Trọng Lực</strong>.', 'Nhiệt lõi <strong>464°C</strong>.'],
    palette: [['#0A0B10', 'Hắc thạch'], ['#D8F8FF', 'Hải Quang bạch kim'], ['#D4AF37', 'Vàng cổ vỡ']],
    links: [['t-blacktide', 'Hiện trường Đêm Sóng Đen'], ['t-restore', 'Kết cục']],
    sources: ['locations/vael-moor-anchor-core.md'],
    from: [['s-fossil', 'core']]
  },

  // ---- Lateral biomes ----
  {
    id: 's-kelp', kind: 'branch', cat: 'branch', x: 150, y: 360,
    title: 'I-W · Hang Tảo Huyết & Trần Dầu', meta: '280–480m',
    summary: 'Túi khí metan-lưu huỳnh dưới váng dầu; kích nổ mở lối tắt về Nghĩa Địa (Vòng Trái).',
    cause: '', event: 'Mảnh 3: đơn thuốc của Boyle cho Rigg.', effect: 'Nguồn Huyết Tảo hồi máu.',
    rules: ['Nổ dưới trần dầu: <strong>2–3s</strong> chớp nhiệt.'],
    palette: [['#2E444D', 'Đá vôi xám xanh'], ['#14121D', 'Dầu đen'], ['#A62C3B', 'Huyết tảo']],
    links: [['t-frag', 'Mảnh 3']],
    sources: ['locations/kelp-oil-caverns.md'],
    from: [['s-graveyard', 'branch']]
  },
  {
    id: 's-salt', kind: 'branch', cat: 'branch', x: 980, y: 600,
    title: 'II-E · Hầm Muối Cổ Tích', meta: '620–980m',
    summary: 'Hồ muối kép giữ xác tàu Salthold nguyên vẹn 200 năm; vết nứt muối dẫn xuống cánh đông Nere-Keth (Vòng Phải).',
    cause: '', event: 'Mảnh 4: bản kê hàng chuyến 14.', effect: 'Rương báu dưới đáy hồ cần Áo Nhớn Osmotic.',
    rules: ['Brine <strong>&gt;300‰</strong>, <strong>1,320–1,400 kg/m³</strong>.'],
    palette: [['#244F6E', 'Lam tinh thể'], ['#B8DCE6', 'Muối bạc'], ['#193A40', 'Sương lục']],
    links: [['t-salthold', '34 tàu Salthold']],
    sources: ['locations/halocline-salt-vaults.md'],
    from: [['s-bellchasm', 'branch']]
  },
  {
    id: 's-organ', kind: 'branch', cat: 'branch', x: 150, y: 840,
    title: 'III-W · Thánh Đường Ống Vang', meta: '1,100–1,480m',
    summary: 'Giếng cộng hưởng sóng đứng; giải đố tần số. Mảnh 5: phiếu thử nghiệm ống vang số 7.',
    cause: '', event: '', effect: 'Hẻm Cộng Hưởng dẫn xuống Tầng IV.',
    rules: [], palette: [['#1B1930', 'Đá đen tím'], ['#F5B041', 'Sóng vang hổ phách'], ['#8BE0F5', 'Bọt bạc']],
    links: [['t-frag', 'Mảnh 5']],
    sources: ['locations/sunken-resonance-organ.md'],
    from: [['s-nereketh', 'branch']]
  },

  // ---- NPC ----
  {
    id: 's-boyle', kind: 'branch', cat: 'faction', x: 980, y: 240,
    title: 'Lão Boyle — Chuông Số 1', meta: 'Tầng I · Hội Trục Vớt',
    summary: 'Ca 14 ngày trong chuông 1 atm; bán & nâng Bình Huyết Tảo (2 → 5), trần HP/Stamina.',
    cause: '', event: 'Thoại đổi ở 0/5, 2/5, 4/5.', effect: '',
    rules: ['Điểm mù: không biết đê bị tháo nhờ chính nhát kiếm của Kors.'], palette: [],
    links: [['t-economy', 'Bảng giá']], sources: ['characters/npc-cast.md'],
    from: [['s-graveyard', 'branch']]
  },
  {
    id: 's-marlow', kind: 'branch', cat: 'faction', x: 1400, y: 480,
    title: 'Marlow "Tay Đồng" — Trạm Chuông 3', meta: 'Tầng II · ~540m',
    summary: 'Chế & nâng cấp Súng Phép, khoang Mana, Đạn Nhiệt.',
    cause: '', event: '', effect: 'Sau Boss 2: tiếng gõ dưới sàn Trạm 3 ngừng.',
    rules: [], palette: [], links: [['t-marlow', 'Lý lịch 142 PE']], sources: ['characters/npc-cast.md'],
    from: [['s-bellchasm', 'branch']]
  },
  {
    id: 's-ossa', kind: 'branch', cat: 'faction', x: 980, y: 840,
    title: 'Ẩn Sĩ Ossa — Giáo Hội Đèn Vực', meta: 'Tầng III · Sảnh Tranh Tường',
    summary: 'Nhận Hạt Hải Quang Sạch; cấp Kính 705nm, Áo Nhớn Osmotic, Ấn Tái Tạo. Nhận ra máu Thal-Vael ở 3/5.',
    cause: '', event: '', effect: '',
    rules: [], palette: [], links: [['t-choir', 'Giáo Hội']], sources: ['characters/npc-cast.md'],
    from: [['s-nereketh', 'branch']]
  },
  {
    id: 's-rigg', kind: 'branch', cat: 'faction', x: 1400, y: 720,
    title: 'Rigg "Mù Sóng" — thợ săn kho báu', meta: 'Hang Tảo → Hầm Muối',
    summary: 'Bán bản đồ kho báu nhánh ngang, đổi Nc lấy bùa nhặt vàng.',
    cause: '', event: '', effect: '',
    rules: ['Điểm mù: không hỏi vì sao 4 tàu Salthold chết trong tư thế tháo chạy.'], palette: [],
    links: [['s-kelp', 'Ẩn náu sớm']], sources: ['characters/npc-cast.md'],
    from: [['s-salt', 'branch']]
  },

  // ---- Trang bị & hệ thống ----
  {
    id: 's-runeflint', kind: 'branch', cat: 'branch', x: -260, y: 240,
    title: 'Súng Phép Runeflint', meta: 'Kinh tế sớm',
    summary: 'Nhặt phế liệu ở Tầng I; bắn Cavitation Bolt bằng Mana. Phá khóa gỉ, kích van, mở Hẻm Chuông.',
    cause: '', event: '', effect: '',
    rules: ['Bậc 2 Heavy Bore: nổ 2 nhịp trễ <strong>0.15s</strong>.'], palette: [['#22D3EE', 'Buồng nén']],
    links: [['t-meme-rune', 'Chuỗi biến chất']], sources: ['artifacts/five-vessels-of-form.md'],
    from: [['s-graveyard', 'branch']]
  },
  {
    id: 's-flare', kind: 'branch', cat: 'branch', x: 150, y: 600,
    title: 'Đầu Đạn Nhiệt Lưu Huỳnh', meta: 'Hang Tảo / Marlow',
    summary: 'Kích nổ túi khí dưới Trần Dầu Đen, mở lối tắt bí mật.',
    cause: '', event: '', effect: '', rules: [], palette: [['#E64E27', 'Lửa']], links: [],
    sources: ['artifacts/five-vessels-of-form.md'],
    from: [['s-kelp', 'branch'], ['s-runeflint', 'loop']]
  },
  {
    id: 's-tuner', kind: 'branch', cat: 'branch', x: -260, y: 840,
    title: 'Ống Ngắm Cộng Hưởng', meta: 'Thánh Đường Ống Vang',
    summary: 'Chỉnh tần số bọt khí làm vỡ khóa tinh thể Tầng III–IV từ xa.',
    cause: '', event: '', effect: '', rules: [], palette: [['#F5B041', 'Hổ phách']], links: [],
    sources: ['artifacts/five-vessels-of-form.md'],
    from: [['s-organ', 'branch']]
  },
  {
    id: 's-filter', kind: 'branch', cat: 'branch', x: -260, y: 1080,
    title: 'Kính Lọc 705nm & Áo Nhớn Osmotic', meta: 'Từ Ẩn Sĩ Ossa',
    summary: '705nm nhìn xuyên ngụy trang đỏ Tầng IV (khác Flashburst gây chói). Áo Osmotic lặn đáy Hồ Muối.',
    cause: '', event: '', effect: '', rules: [], palette: [], links: [['s-ossa', 'Nguồn cấp']],
    sources: ['locations/depth-strata-and-swim-zones.md'],
    from: [['s-ossa', 'loop']]
  },
  {
    id: 's-swim', kind: 'branch', cat: 'system', x: 150, y: 1080,
    title: '4 dạng Vùng Bơi 360° & 8-Plane Parallax', meta: 'Luật level design',
    summary: 'Mạch Phù Ấn · Hồ Muối Siêu Đặc · Ống Phun Thủy Nhiệt · Buồng Khí Chìm. Dưới 450m cấm đỏ/cam thụ động.',
    cause: '', event: '', effect: '',
    rules: ['P4 gameplay plane tương phản <strong>70–100%</strong>, rim-light 1–2px.', 'Mỗi vùng <strong>≥ 2</strong> lối vào/ra.'],
    palette: [], links: [['t-leak', 'Gốc vật lý']], sources: ['locations/depth-strata-and-swim-zones.md'],
    from: [['s-organ', 'branch']]
  },
  {
    id: 's-fauna', kind: 'branch', cat: 'lore', x: 980, y: 1080,
    title: 'Bestiary: 14 loài · 6 ngành', meta: 'Sinh thái theo tầng',
    summary: 'I: Cua Giáp Rương, Hải Quỳ Roi, Giun Đục Ván · II: Tôm Bắn Đá, Mực Nang Gương Muối · III: Sứa Chuông Điện · IV: Giun Ống Lưu Huỳnh, Rình Mồi Siêu Đen…',
    cause: 'Không quang hợp dưới 200m.', event: '3 nguồn năng lượng: mưa xác, huyết tảo, hóa tổng hợp.', effect: 'Không có "người cá dập khuôn".',
    rules: [], palette: [], links: [['t-economy', 'Kinh tế & sinh thái']],
    sources: ['characters/bestiary-abyssal-fauna.md', 'systems/ecology-and-treasure-economy.md'],
    from: [['s-fossil', 'branch']]
  }
];
