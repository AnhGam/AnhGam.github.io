// Tab 1 — Trục Lịch Sử & Nhân Quả. kind: core|branch; cat: core|faction|system|branch|lore.
// from: [[parentId, 'core'|'branch'|'loop']] vẽ cạnh từ node cha tới node này.
window.LORE_TIMELINE = [
  {
    id: 't-thalvael', kind: 'core', cat: 'core', x: 560, y: 0,
    title: 'Thal-Vael xuống đáy, dựng Nere-Keth', meta: '~1,400 BT',
    summary: 'Nhánh người cổ làm chủ San Hô Hải Quang và buồng đá điều áp, rút xuống vách ấm Tầng III tránh băng hà.',
    cause: 'Thời kỳ băng hà trên mặt đất.',
    event: 'Thal-Vael định cư dọc vách ấm Tầng III, lai tạo San Hô Hải Quang, xây Cổ Thành Nere-Keth.',
    effect: 'Hình thành nền văn minh kỹ sư áp suất — gốc của mọi công nghệ Hải Quang về sau.',
    rules: ['<strong>Hải Quang</strong> là dòng năng lượng thiêng chạy qua mạch đá.', 'Nhịp <strong>Choir-Pulse</strong> 3 hồi: Thanh – Trầm – Tắt.'],
    palette: [['#22D3EE', 'San hô ngọc lam'], ['#BFA054', 'Vàng cổ thành'], ['#121E2E', 'Bazan chàm']],
    links: [['s-nereketh', 'Nơi Cổ Thành còn đứng'], ['t-choir', 'Hậu duệ ở lại']],
    sources: ['systems/history-and-timeline.md', 'locations/nere-keth-coral-citadel.md'],
    from: []
  },
  {
    id: 't-anchor', kind: 'core', cat: 'core', x: 560, y: 240,
    title: 'Đúc Mỏ Neo Triều Tịch & Lõi Bio-Core', meta: '~1,150 BT',
    summary: 'Ghim Mỏ Neo vào họng phun Tầng V; tổng hợp Vực Chủ Vô Diện làm hệ miễn dịch giữ cân bằng áp suất.',
    cause: 'Mảng kiến tạo Tầng V rung chuyển, đe dọa đẩy bùn nhiệt lên mặt biển.',
    event: 'Hội đồng kỹ sư đúc Mỏ Neo (đối trọng 40m) và tạo Lõi Trí Tuệ Sinh Học liên kết rễ san hô.',
    effect: 'Vực Vael ổn định hơn 1,000 năm — nhưng mạch nhiệt bị ghim quá lâu.',
    rules: ['Nhiệt lõi <strong>464°C</strong>, áp suất <strong>240 atm</strong>.', 'Bio-Core chỉ có quyền năng trong phạm vi Vực Vael — không phải thần.'],
    palette: [['#D4AF37', 'Vàng cổ vỡ'], ['#D8F8FF', 'Hải Quang bạch kim'], ['#0A0B10', 'Hắc thạch']],
    links: [['s-vaelmoor', 'Tế Đàn Lõi Neo — Tầng V'], ['t-restore', 'Chu trình hàn gắn cuối game']],
    sources: ['systems/history-and-timeline.md', 'locations/vael-moor-anchor-core.md'],
    from: [['t-thalvael', 'core']]
  },
  {
    id: 't-decline', kind: 'core', cat: 'core', x: 560, y: 480,
    title: 'Suy tàn sinh học & di cư lên Wick-Isles', meta: '~400 BT – 10 BT',
    summary: 'Dinh dưỡng tầng giữa cạn, bức xạ Hải Quang làm giảm sinh sản; lớp trẻ lưỡng cư bỏ biển lên đảo.',
    cause: 'Mạch nhiệt bị ghim quá lâu + bức xạ Hải Quang tích tụ trong tháp kín.',
    event: 'Thal-Vael trẻ (phổi cạn + màng khe cổ) lên đồng hóa với ngư dân Wick-Isles.',
    effect: 'Gene lặn Huyết Hải Quang lẫn vào dân đảo; dưới đáy chỉ còn Giáo Hội Đèn Vực.',
    rules: ['Cơ chế <strong>lưỡng cư kép</strong> là chìa khóa vì sao Kors sống sót bản án.'],
    palette: [['#3E6B6D', 'Lục xám khói']],
    links: [['t-kors', 'Kors là hậu duệ'], ['t-choir', 'Nhóm ở lại']],
    sources: ['systems/history-and-timeline.md'],
    from: [['t-anchor', 'core']]
  },
  {
    id: 't-kors', kind: 'core', cat: 'core', x: 560, y: 720,
    title: 'Kors — đứa con lai đáy bùn & Hạm Đội Xích Kỳ', meta: 'Trước 0 PE',
    summary: 'Sinh ở Wick-Isles với sẹo khe mang, nhận Mảnh Bùa La Bàn từ mẹ, lập 7 chiến thuyền khăn đỏ.',
    cause: 'Bị dân chài xua đuổi trong nạn đói biển; mẹ mất để lại Compass Shard.',
    event: 'Kors cướp tàu lập Hạm Đội Xích Kỳ, cướp vàng Salthold, săn hải đồ cổ.',
    effect: 'Có đủ 3 chìa: máu lai + Bùa La Bàn + Drop-Pod trục vớt gần Wick-Isles.',
    rules: ['Nhịn thở gấp <strong>5 lần</strong> trẻ đảo thường.', 'Hạm đội: <strong>7</strong> chiến thuyền bọc đồng.'],
    palette: [['#A62C3B', 'Khăn đỏ Xích Kỳ']],
    links: [['t-armada', 'Hạm đội & phó tướng Vane'], ['t-wick', 'Quê nhà Wick-Isles']],
    sources: ['characters/hero-captain-kors.md', 'systems/history-and-timeline.md'],
    from: [['t-decline', 'core']]
  },
  {
    id: 't-blacktide', kind: 'core', cat: 'core', x: 560, y: 960,
    title: 'Đêm Sóng Đen — nhát kiếm sập đối trọng', meta: 'Đêm 14 → rạng 15 Triều Đen, 0 PE',
    summary: 'Kors nhảy Drop-Pod xuống Tầng V, dùng Kiếm Buộc Dây chém chốt kẹt, khối đối trọng 40m sập bịt họng phun.',
    cause: 'Vỏ địa chất Tầng V nứt; cột nước đen lưu huỳnh dâng hướng Bạch Hải.',
    event: 'Cắt cáp hãm, rơi theo xoáy, cắm Bùa vào ổ dẫn, chém đứt chốt thép — đối trọng sập.',
    effect: 'Bạch Hải được cứu 100%; phễu phản chấn kéo chìm 7 tàu Xích Kỳ + 34 tàu Salthold.',
    rules: ['Vành khóa đối trọng cao <strong>40m</strong>.', 'Vết chém xiên rạng quang còn trên thân Neo.'],
    palette: [['#14121D', 'Dầu đen'], ['#22D3EE', 'Kiếm bão hòa Hải Quang']],
    links: [['s-vaelmoor', 'Hiện trường Tầng V'], ['t-salthold', 'Tàu buôn bị hút chìm'], ['t-frag', 'Bản Ghi #2 & #5 kể lại đêm này']],
    sources: ['systems/history-and-timeline.md', 'story-logic-audit.md'],
    from: [['t-kors', 'core'], ['t-wick', 'branch'], ['t-armada', 'branch']]
  },
  {
    id: 't-sentence', kind: 'core', cat: 'core', x: 560, y: 1200,
    title: 'Bản Án Ngũ Ấn & Giấc Ngủ Bùn Yếm Khí', meta: '0 PE',
    summary: 'Bio-Core nhận ra máu Thal-Vael nên không hủy: nén Kors thành Image #2, tách 4 phần thân vào 4 thủy quái.',
    cause: 'Giao thức miễn dịch kích hoạt khi chốt đối trọng bị cưỡng ép.',
    event: 'Bio-Compression; Chân–Tay–Thân–Đầu thành 4 Hạch; Ký Ức khóa ở Tầng V.',
    effect: 'Kors nằm 200 năm trong túi bùn yếm khí Tầng I; Áp Lực Chì thành luật gameplay.',
    rules: ['Mật độ cơ thể <strong>~1,680 kg/m³</strong> vs nước biển ~1,025.', 'Chỉ bơi được <strong>1–2s</strong> ngoài vùng 360°.'],
    palette: [['#8A8365', 'Cát vàng xỉn'], ['#A62C3B', 'Đai đỏ']],
    links: [['t-leak', 'Luật vật lý sinh ra'], ['s-graveyard', 'Nơi Kors tỉnh dậy']],
    sources: ['systems/fivefold-severance-and-physics.md', 'artifacts/five-vessels-of-form.md'],
    from: [['t-blacktide', 'core']]
  },
  {
    id: 't-salvage', kind: 'core', cat: 'core', x: 560, y: 1440,
    title: 'Thành lập Hội Trục Vớt Sắt', meta: '84 PE',
    summary: 'Tàu lưới vớt gỗ dính Đá Hải Quang; chủ xưởng đồng Kael-Var đúc Chuông Lặn 1 atm thả xuống Tầng I.',
    cause: '80 năm biển lặng + Hải Quang rò rỉ nổi lên mặt.',
    event: 'Lập Hội, đúc Chuông Lặn khóa khí nối cáp thép.',
    effect: 'Bắt đầu Cuộc Đổ Xô Xuống Vực — khai thác tinh thể làm yếu mạng áp suất.',
    rules: ['Chuông giữ <strong>1 atm</strong> bên trong, ngoài <strong>19–75 atm</strong>.', 'Lương thợ lặn <strong>4 Sv/tháng</strong>.'],
    palette: [['#6E563B', 'Đồng rỉ'], ['#E89B3C', 'Đèn amber']],
    links: [['t-economy', 'Kinh tế kho báu'], ['s-surface', 'Bến tời']],
    sources: ['factions/iron-bell-salvagers.md', 'systems/history-and-timeline.md'],
    from: [['t-sentence', 'core']]
  },
  {
    id: 't-bell4', kind: 'core', cat: 'core', x: 560, y: 1680,
    title: 'Thảm họa Chuông Số 4', meta: '142 PE',
    summary: 'Chuông hạ xuống 600m bị Tôm Bọ Ngựa đấm móp vỏ đồng 4 phân; 14 thợ lặn chết, tuyến sâu bỏ hoang.',
    cause: 'Marlow (18 tuổi) khuyên hạ sâu thêm 40 sải bất chấp tiếng gõ cảnh báo.',
    event: 'Cú đấm cavitation + chớp Sonoluminescence 5,000 K xuyên vỏ chuông.',
    effect: 'Marlow mất tay, mang mặc cảm 58 năm; Hội dừng ở Tầng II.',
    rules: ['Vỏ đồng dày <strong>4 phân</strong>, 3 hố lõm từ ngoài vào.'],
    palette: [['#1E2E42', 'Chàm sắt']],
    links: [['s-bellchasm', 'Đấu trường Boss 2'], ['t-marlow', 'Người sống sót']],
    sources: ['characters/four-abyssal-wardens.md', 'characters/npc-cast.md'],
    from: [['t-salvage', 'core']]
  },
  {
    id: 't-awaken', kind: 'core', cat: 'core', x: 560, y: 1920,
    title: 'Rạn nứt thứ cấp — Kors thức tỉnh', meta: '198–200 PE',
    summary: 'Khai thác Hải Quang quá mức làm chấn động Tầng V lan lên, xé túi bùn yếm khí; Kors tỉnh ở 180m.',
    cause: 'Hội Trục Vớt đục quá nhiều tinh thể ở Tầng I–II.',
    event: 'Ấn Ký La Bàn trên xương ức cộng hưởng lại; Kors bò ra trong hình hài Image #2.',
    effect: 'Bắt đầu hành trình 5 Ấn Ký — trong khi trên bờ đang lễ Lưỡng Bách Niên Bình Yên.',
    rules: ['Đây là điểm bắt đầu gameplay.'],
    palette: [['#92D1C2', 'Ánh mặt trời lọc']],
    links: [['s-graveyard', 'Màn chơi đầu tiên'], ['t-kaelvar', 'Lễ hội trên bờ']],
    sources: ['systems/history-and-timeline.md'],
    from: [['t-bell4', 'core'], ['t-contra', 'loop']]
  },
  {
    id: 't-restore', kind: 'core', cat: 'core', x: 560, y: 2160,
    title: 'Ngũ Ấn hồi phục & San Hô Tự Hàn', meta: '200 PE — Kết cục',
    summary: 'Qua Chân → Tay → Thân → Đầu → Ký Ức, Kors vượt Re-Anchoring Stress Test, ghép Bùa vào Kiếm hàn Mỏ Neo.',
    cause: 'Tàn Ảnh Vực Chủ kiểm định chủ thể mang máu Thal-Vael.',
    event: 'Bio-Coral Regeneration hàn kín vết nứt năm xưa.',
    effect: 'Áp Lực Chì tan hoàn toàn (mở bơi 360° toàn bản đồ hậu game + lựa chọn trả nợ thuyền 500 Sv cho Boyle đổi cảnh kết); Kors bơi tự do về mặt Bạch Hải. 100% sự thật, 0% bỏ ngỏ.',
    rules: ['Thứ tự cố định: <strong>Chân → Tay → Thân → Đầu → Ký Ức</strong>.'],
    palette: [['#D8F8FF', 'Hải Quang bạch kim'], ['#D4AF37', 'Vàng cổ']],
    links: [['s-vaelmoor', 'Trận cuối Tầng V'], ['t-anchor', 'Đóng vòng với Mỏ Neo gốc']],
    sources: ['characters/four-abyssal-wardens.md', 'artifacts/five-vessels-of-form.md'],
    from: [['t-awaken', 'core']]
  },

  // ---- Nhánh trái: hệ thống & phe ----
  {
    id: 't-choir', kind: 'branch', cat: 'faction', x: 150, y: 480,
    title: 'Giáo Hội Đèn Vực (Lantern-Choir)', meta: 'Tách nhóm ~400 BT',
    summary: 'Kỹ sư-tu sĩ ở lại bảo trì tháp đèn; trung lập, mất dần nhân lực.',
    cause: 'Dòng di cư bỏ biển để lại một nhóm giữ đèn.',
    event: 'Giữ nghi thức Choir-Pulse, sống trong Tháp Áp Suất Khô.',
    effect: 'Biết sự thật hai mặt về Kors nhưng không can thiệp bản án.',
    rules: ['Chỉ nhận <strong>Hạt Hải Quang Sạch</strong>, không nhận vàng.', 'Rạn nứt nội bộ: bảo thủ vs trung lập.'],
    palette: [['#22D3EE', 'Đèn cổ']],
    links: [['s-ossa', 'Ẩn Sĩ Ossa'], ['t-meme-choir', 'Nhịp chuông bị quên nghĩa']],
    sources: ['factions/lantern-choir.md'],
    from: [['t-decline', 'branch']]
  },
  {
    id: 't-leak', kind: 'branch', cat: 'system', x: 150, y: 1200,
    title: 'Chuỗi hệ quả 5 tầng: Áp Lực Chì & Hải Quang', meta: 'Luật thế giới',
    summary: 'Hai nguyên lý sinh ra mọi cơ chế: đi bộ đáy, bơi giật 1–2s, 4 vùng bơi 360° cục bộ (~25% bản đồ), Kiếm miễn Stamina hồi Mana ↔ Súng Mana, Stamina thuần traversal.',
    cause: 'Bio-Compression + rò rỉ Hải Quang từ vành dẫn rạn nứt.',
    event: '4 dạng vùng bơi: Mạch Phù Ấn, Hồ Muối Siêu Đặc, Ống Phun Thủy Nhiệt, Buồng Khí Chìm.',
    effect: 'Kiếm hút Hải Quang hồi Mana → buộc áp sát (Aggressive Resource Loop).',
    rules: ['Hồ muối <strong>1,320–1,400 kg/m³</strong>.', 'Ống phun nâng <strong>1.8–2.8×</strong> tốc độ bơi.'],
    palette: [['#22D3EE', 'Mạch Phù Ấn'], ['#E64E27', 'Khe nhiệt']],
    links: [['s-swim', 'Vùng bơi trên bản đồ']],
    sources: ['systems/fivefold-severance-and-physics.md'],
    from: [['t-sentence', 'branch']]
  },
  {
    id: 't-economy', kind: 'branch', cat: 'system', x: 150, y: 1440,
    title: 'Kinh tế kho báu: Sv / Nc / Hạt Hải Quang', meta: 'Kỷ Trục Vớt',
    summary: 'Vàng Salthold còn nguyên dưới đáy; 10 Nc tự đổi = 1 Sv ngay khi nhặt; tổng chi 1,580 Sv; Giáo Hội chỉ đổi 9/11 Hạt Hải Quang Sạch cố định.',
    cause: 'Xác 34 tàu buôn + Hải Quang rò rỉ = tài nguyên khai thác.',
    event: 'Tuyến tiếp tế Chuông 1 (180m) → Chuông 2 (480m) → lén xuống Trạm 3 (~540m).',
    effect: '4 Ấn Ký là Hạch Sinh Học — vô giá trị thương mại, không ai cướp được.',
    rules: ['Bình Huyết Tảo <strong>tự nạp miễn phí tại Chuông Lặn</strong>; Boyle bán +1 bình <strong>45 Sv</strong>, Marlow rèn kiếm bậc 1–3 (<strong>50/120/200 Sv</strong>) & Nòng Nén <strong>60 Sv</strong>, Bàn Đúc rèn kiếm bậc 4 (<strong>220 Sv</strong>).', 'Trả nợ thuyền hậu game cho Boyle: <strong>500 Sv</strong>.'],
    palette: [['#D4AF37', 'Sovereign']],
    links: [['s-boyle', 'Shop Lão Boyle'], ['s-marlow', 'Xưởng Marlow']],
    sources: ['systems/ecology-and-treasure-economy.md'],
    from: [['t-salvage', 'branch'], ['t-salthold', 'loop']]
  },
  {
    id: 't-contra', kind: 'branch', cat: 'system', x: 150, y: 1680,
    title: 'Mâu thuẫn: khai thác vs sống còn của biển', meta: 'Contradiction Map',
    summary: 'Càng đục Hải Quang chạy Súng Phép, mạng áp suất Giáo Hội càng yếu → đẩy tới Đêm Sóng Đen lần 2.',
    cause: 'Lợi nhuận Thương Hội.', event: 'Rạn nứt Tầng V lan ngược lên.', effect: 'Trực tiếp đánh thức Kors.',
    rules: ['Áp Lực Chì vừa là xiềng xích, vừa là lợi thế chém phá giáp.'],
    palette: [], links: [['s-marlow', 'Marlow không hiểu mình đang phá gì']],
    sources: ['systems/fivefold-severance-and-physics.md'],
    from: [['t-economy', 'branch']]
  },

  // ---- Nhánh phải: phe phái & con người ----
  {
    id: 't-wick', kind: 'branch', cat: 'faction', x: 980, y: 720,
    title: 'Wick-Isles & Khoang Lặn Drop-Pod', meta: 'Quần Đảo Bấc Đèn',
    summary: 'Đảo núi lửa nghèo cung cấp thợ lặn; nơi trục vớt Drop-Pod đá đen của Thal-Vael.',
    cause: 'Dân lai Thal-Vael định cư.', event: 'Drop-Pod kích hoạt bằng máu lai + Bùa La Bàn.',
    effect: 'Về sau xưởng đảo chế Súng Phép Runeflint.',
    rules: ['Drop-Pod làm bằng <strong>đá đen</strong>, không phải sắt.'],
    palette: [['#2E444D', 'Đá vôi xám xanh']], links: [['t-meme-rune', 'Runeflint ra đời']],
    sources: ['systems/history-and-timeline.md'],
    from: [['t-kors', 'branch']]
  },
  {
    id: 't-armada', kind: 'branch', cat: 'faction', x: 980, y: 960,
    title: 'Hạm Đội Xích Kỳ & Vane Râu Sắt', meta: '0 PE',
    summary: 'Thủy thủ đòi cắt dây chạy vào bờ; chỉ thấy Kors cắt cáp nhảy xuống trước khi tàu chìm.',
    cause: 'Neo trên đỉnh Vực Vael đêm 14.', event: 'Bị phễu phản chấn cuốn xuống Tầng I–II.',
    effect: 'Vane chết kẹt khoang lái tàu Đô Đốc; người sống biến dị.',
    rules: [], palette: [['#A62C3B', 'Cờ đỏ']], links: [['s-graveyard', 'Xác tàu Đô Đốc']],
    sources: ['factions/red-rag-mutineers.md'],
    from: [['t-kors', 'branch']]
  },
  {
    id: 't-salthold', kind: 'branch', cat: 'lore', x: 1400, y: 960,
    title: '34 thương thuyền Salthold', meta: 'Chuyến 14, ngày 14 Triều Đen',
    summary: 'Chở 120 hòm vàng thuế + 4 hòm lễ vật cầu bình yên; chìm cùng đêm — nguồn kho báu Tầng I–II.',
    cause: 'Phễu phản chấn.', event: 'Bị hút chìm.', effect: 'Vàng còn nguyên trong hồ muối thiếu oxy.',
    rules: [], palette: [['#B8DCE6', 'Muối bạc']], links: [['s-salt', 'Hầm Muối giữ xác tàu'], ['t-frag', 'Bản Ghi #4']],
    sources: ['systems/history-and-timeline.md', 'diegetic-fragments.md'],
    from: [['t-blacktide', 'branch']]
  },
  {
    id: 't-redrag', kind: 'branch', cat: 'faction', x: 980, y: 1200,
    title: 'Tàn Quân Cờ Đỏ', meta: '1–200 PE',
    summary: 'Thủy thủ biến dị nửa người nửa cá, giữ vải đỏ cổ tay, hận "tên thuyền trưởng khăn đỏ".',
    cause: 'Bức xạ Hải Quang rò rỉ sau cú đắm.', event: 'Canh vàng tàu cũ 200 năm.',
    effect: 'Kẻ thù Tầng I; mồi lửa nghi ngờ 40% lên Hero.',
    rules: [], palette: [['#A62C3B', 'Vải đỏ']], links: [['t-meme-red', 'Dị đoan khăn đỏ']],
    sources: ['factions/red-rag-mutineers.md'],
    from: [['t-armada', 'branch']]
  },
  {
    id: 't-marlow', kind: 'branch', cat: 'faction', x: 980, y: 1680,
    title: 'Marlow "Tay Đồng"', meta: '18 tuổi (142 PE) → 76 tuổi (200 PE)',
    summary: 'Mất tay trong thảm họa Chuông 4; 8 năm không lên bờ, chế Runeflint tại Trạm 3 (~540m).',
    cause: 'Mặc cảm 14 đồng đội chết.', event: '6 năm nghe tiếng gõ dưới sàn Trạm 3.',
    effect: 'Nâng cấp súng cho Kors; tiếng gõ ngừng sau Boss 2.',
    rules: [], palette: [['#6E563B', 'Đồng thau']], links: [['s-marlow', 'Trạm trên bản đồ']],
    sources: ['characters/npc-cast.md'],
    from: [['t-bell4', 'branch']]
  },
  {
    id: 't-kaelvar', kind: 'branch', cat: 'faction', x: 980, y: 1920,
    title: 'Kael-Var — Đại Lễ Lưỡng Bách Niên', meta: '200 PE',
    summary: 'Thương Hội tháo đê 18m lấy đá xây chợ; tin biển yên là "trời ban".',
    cause: '200 năm không sóng thần.', event: 'Lễ hội pháo hoa.',
    effect: 'Irony: bình yên đến từ chính tên hải tặc họ nguyền rủa.',
    rules: [], palette: [], links: [['t-frag', 'Bản Ghi #1 — sổ thu mua']],
    sources: ['systems/history-and-timeline.md'],
    from: [['t-awaken', 'branch']]
  },

  // ---- Cột xa phải: chuỗi biến chất văn hóa & tài liệu ----
  {
    id: 't-meme-red', kind: 'branch', cat: 'lore', x: 1400, y: 1200,
    title: 'Chuỗi 2: Khăn đỏ → dị đoan bờ biển', meta: 'Memetic Depth',
    summary: 'Hiệu lệnh hạm đội → bùa níu nhân tính → điều cấm kỵ "đừng quấn khăn đỏ qua Vực Vael".',
    cause: '', event: '', effect: '', rules: [], palette: [['#A62C3B', 'Đỏ']], links: [],
    sources: ['diegetic-fragments.md'],
    from: [['t-redrag', 'branch']]
  },
  {
    id: 't-meme-rune', kind: 'branch', cat: 'lore', x: 1400, y: 1440,
    title: 'Chuỗi 1: Khí cụ cân bằng → đạn bắn cá', meta: 'Memetic Depth',
    summary: 'Hải Quang thiêng → kết tinh thô trong bùn → nghiền nhồi Súng Phép bán ở Kael-Var.',
    cause: '', event: '', effect: '', rules: [], palette: [['#22D3EE', 'Hải Quang']],
    links: [['s-runeflint', 'Súng Phép trên bản đồ']],
    sources: ['diegetic-fragments.md'],
    from: [['t-wick', 'loop'], ['t-salvage', 'branch']]
  },
  {
    id: 't-meme-choir', kind: 'branch', cat: 'lore', x: 150, y: 720,
    title: 'Chuỗi 3: Choir-Pulse → 3 tiếng chuông đồng', meta: 'Memetic Depth',
    summary: 'Thợ lặn Chuông 1 & 2 gõ 3 tiếng mỗi lần kéo cáp, tưởng là quy ước của thợ đồng Kael-Var.',
    cause: '', event: '', effect: '', rules: [], palette: [], links: [],
    sources: ['diegetic-fragments.md'],
    from: [['t-choir', 'branch']]
  },
  {
    id: 't-frag', kind: 'branch', cat: 'lore', x: 1400, y: 1920,
    title: '6 Bản Ghi tài liệu thiên lệch (40%)', meta: 'Oblique Worldbuilding',
    summary: 'Sổ thu mua, bảng gỗ khắc móng, đơn thuốc, bản kê hàng, phiếu tần số, bia đá — mỗi Bản Ghi một điểm mù (đặt tên Bản Ghi #1–#6 để tách bạch với Mảnh #5 = Ấn Ký Ký Ức).',
    cause: '', event: 'Rải khắp Tầng I → III.', effect: 'Người chơi tự ghép 40%; Mảnh #5 Ký Ức chốt 100%.',
    rules: ['Mỗi văn bản chỉ <strong>1–3 dòng</strong>.'], palette: [],
    links: [['s-graveyard', 'Bản Ghi #1–#2'], ['s-kelp', 'Bản Ghi #3'], ['s-salt', 'Bản Ghi #4'], ['s-organ', 'Bản Ghi #5'], ['s-nereketh', 'Bản Ghi #6']],
    sources: ['diegetic-fragments.md'],
    from: [['t-kaelvar', 'branch'], ['t-salthold', 'loop']]
  }
];
