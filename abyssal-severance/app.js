(() => {
  const TIMELINE = window.LORE_TIMELINE || [];
  const MAP = window.LORE_MAP;
  const TAB_LABEL = { timeline: 'Lịch Sử', map: 'Bản Đồ Địa Tầng' };
  const CAT_LABEL = { core: 'Core', faction: 'Phe / NPC', system: 'Hệ thống', branch: 'Nhánh phụ', lore: 'Lore / Mảnh' };

  const PIN_ICONS = {
    hub: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 2V13M4.5 9.5C4.5 11.7 6 13 8 13C10 13 11.5 11.7 11.5 9.5M6 5H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    region: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5" stroke="currentColor" stroke-width="1.4"/><circle cx="8" cy="8" r="1.8" fill="currentColor"/></svg>',
    bell: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4.5 11.5H11.5L10.5 6.5C10.2 4.8 9.2 3.8 8 3.8C6.8 3.8 5.8 4.8 5.5 6.5L4.5 11.5Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M7 13H9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    boss: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 2.5L13 8L8 13.5L3 8L8 2.5Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/></svg>',
    cave: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2.5 13V9C2.5 5.5 5 3.5 8 3.5C11 3.5 13.5 5.5 13.5 9V13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 13V10C5.5 8.4 6.6 7.4 8 7.4C9.4 7.4 10.5 8.4 10.5 10V13" stroke="currentColor" stroke-width="1.3"/></svg>',
    loot: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><rect x="3" y="5" width="10" height="8" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M3 8.5H13M7.2 8.5V10.2H8.8V8.5" stroke="currentColor" stroke-width="1.3"/></svg>'
  };

  const byId = {};
  for (const n of TIMELINE) byId[n.id] = { ...n, tab: 'timeline' };
  for (const p of MAP.pois) byId[p.id] = { ...p, tab: 'map', from: [] };

  const $ = (id) => document.getElementById(id);
  const viewport = $('viewport'), stage = $('canvas-stage'), svg = $('edges-svg'), underlay = $('map-underlay'), layer = $('nodes-layer');
  const drawer = $('detail-drawer');
  const state = { tab: 'timeline', filter: 'all', mapLayer: 'all', selected: null, history: [], scale: 1, tx: 0, ty: 0 };

  function render() {
    const isMap = state.tab === 'map';
    viewport.classList.toggle('is-chart', !isMap);
    $('filter-group-timeline').classList.toggle('hidden', isMap);
    $('legend-timeline').classList.toggle('hidden', isMap);
    $('filter-group-map').classList.toggle('hidden', !isMap);
    $('legend-map').classList.toggle('hidden', !isMap);
    underlay.classList.toggle('hidden', !isMap);
    svg.classList.toggle('hidden', isMap);

    if (isMap) renderMap();
    else renderTimeline();
    renderQuickNav();
    applyFilter();
  }

  // ---------- Tab 1: Timeline Tree ----------
  function renderTimeline() {
    layer.innerHTML = '';
    for (const n of TIMELINE) {
      const el = document.createElement('div');
      el.className = `tree-node ${n.kind === 'core' ? 'is-core' : 'is-branch'} cat-${n.cat}`;
      el.dataset.id = n.id;
      el.style.left = n.x + 'px';
      el.style.top = n.y + 'px';
      el.innerHTML = `
        <div class="node-top"><span class="node-kind kind-${n.kind === 'core' ? 'core' : n.cat}">${n.kind === 'core' ? 'Core Build' : CAT_LABEL[n.cat]}</span><span class="node-meta">${n.meta}</span></div>
        <div class="node-title">${n.title}</div>
        <div class="node-summary">${n.summary}</div>
        <div class="node-footer"><span>${n.links.length} liên kết</span><span class="cta">Chi tiết →</span></div>`;
      el.addEventListener('click', (e) => { e.stopPropagation(); select(n.id, true); });
      layer.appendChild(el);
    }
    drawEdges();
  }

  function box(id) {
    const el = layer.querySelector(`[data-id="${id}"]`);
    if (!el) return null;
    if (el.classList.contains('map-pin')) {
      return { x: el.offsetLeft - el.offsetWidth / 2, y: el.offsetTop - el.offsetHeight / 2, w: el.offsetWidth, h: el.offsetHeight };
    }
    return { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight };
  }

  function drawEdges() {
    let maxX = 0, maxY = 0, paths = '';
    for (const n of TIMELINE) {
      const b = box(n.id);
      maxX = Math.max(maxX, b.x + b.w); maxY = Math.max(maxY, b.y + b.h);
      for (const [pid, type] of n.from) {
        const a = box(pid);
        if (!a) continue;
        let x1, y1, x2, y2, d;
        const dx = (b.x + b.w / 2) - (a.x + a.w / 2), dy = (b.y + b.h / 2) - (a.y + a.h / 2);
        if (Math.abs(dy) > Math.abs(dx) * 0.6) {
          x1 = a.x + a.w / 2; y1 = dy > 0 ? a.y + a.h : a.y;
          x2 = b.x + b.w / 2; y2 = dy > 0 ? b.y : b.y + b.h;
          const m = (y2 - y1) / 2;
          d = `M${x1},${y1} C${x1},${y1 + m} ${x2},${y2 - m} ${x2},${y2}`;
        } else {
          x1 = dx > 0 ? a.x + a.w : a.x; y1 = a.y + a.h / 2;
          x2 = dx > 0 ? b.x : b.x + b.w; y2 = b.y + b.h / 2;
          const m = (x2 - x1) / 2;
          d = `M${x1},${y1} C${x1 + m},${y1} ${x2 - m},${y2} ${x2},${y2}`;
        }
        paths += `<path class="edge-path edge-${type}" data-a="${pid}" data-b="${n.id}" d="${d}"/>`;
      }
    }
    svg.setAttribute('width', maxX + 400);
    svg.setAttribute('height', maxY + 400);
    svg.innerHTML = paths;
  }

  // ---------- Tab 2: Bathymetric Cutaway Map (HD-2D Artwork + Vector Overlays) ----------
  function renderMap() {
    const W = MAP.width, H = MAP.height;
    underlay.setAttribute('width', W);
    underlay.setAttribute('height', H);
    underlay.setAttribute('viewBox', `0 0 ${W} ${H}`);

    let s = `<defs>
      <linearGradient id="seam-blend" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0b1014" stop-opacity="0"/>
        <stop offset="50%" stop-color="#0b1014" stop-opacity="0.92"/>
        <stop offset="100%" stop-color="#0b1014" stop-opacity="0"/>
      </linearGradient>
    </defs>`;

    // 3 HD-2D painted cutaway slices (x: 100..1500)
    for (const sl of MAP.slices) {
      s += `<image href="${sl.href}" x="100" y="${sl.y}" width="1400" height="${sl.h}" preserveAspectRatio="none" />`;
    }

    // Soft dark vignette seams at slice joins (933 & 1816)
    s += `<rect x="100" y="${933 - 44}" width="1400" height="88" fill="url(#seam-blend)" />`;
    s += `<rect x="100" y="${1816 - 44}" width="1400" height="88" fill="url(#seam-blend)" />`;

    // Subtle strata divider lines & right-edge tags
    for (const band of MAP.strataBands) {
      const y0 = MAP.depthToY(band.d0);
      s += `<line x1="100" y1="${y0}" x2="${W}" y2="${y0}" stroke="rgba(228,236,238,0.22)" stroke-width="1" stroke-dasharray="5 5" />`;
      s += `<rect x="${W - 315}" y="${y0 + 8}" width="302" height="38" rx="5" fill="rgba(11,16,20,0.78)" stroke="#253340" stroke-width="1" />`;
      s += `<text x="${W - 22}" y="${y0 + 24}" text-anchor="end" class="map-band-label">${band.label}</text>`;
      s += `<text x="${W - 22}" y="${y0 + 39}" text-anchor="end" class="map-band-meta">${band.d0}m – ${band.d1}m · ${band.atm}</text>`;
    }

    // Depth ruler (left margin x: 0..100)
    s += `<rect x="0" y="0" width="100" height="${H}" fill="#0c1218" />`;
    s += `<line x1="100" y1="0" x2="100" y2="${H}" stroke="#374b5c" stroke-width="1.5" />`;
    const milestones = new Set([0, 180, 340, 450, 600, 760, 850, 1280, 1400, 2050, 2400]);
    for (let d = 0; d <= 2400; d += 100) {
      const y = MAP.depthToY(d);
      const major = milestones.has(d) || d % 400 === 0;
      s += `<line x1="${major ? 72 : 84}" y1="${y}" x2="100" y2="${y}" stroke="${major ? '#c29b54' : '#374b5c'}" stroke-width="${major ? 1.5 : 1}" />`;
      if (major) s += `<text x="66" y="${y + 4}" text-anchor="end" class="map-ruler-text">${d}m</text>`;
    }
    for (const d of milestones) {
      if (d % 100 === 0) continue;
      const y = MAP.depthToY(d);
      s += `<line x1="72" y1="${y}" x2="100" y2="${y}" stroke="#c29b54" stroke-width="1.5" />`;
      s += `<text x="66" y="${y + 4}" text-anchor="end" class="map-ruler-text">${d}m</text>`;
    }

    // Routes (cables, shortcuts, 360 swim shafts, gates)
    for (const r of MAP.routes) {
      if (r.type === 'gate') {
        s += `<line x1="${r.x1}" y1="${r.y1}" x2="${r.x2}" y2="${r.y2}" stroke="#b8534b" stroke-width="4" />`;
        s += `<rect x="${(r.x1 + r.x2) / 2 - 125}" y="${r.y1 - 24}" width="250" height="18" rx="4" fill="rgba(11,16,20,0.86)" stroke="#b8534b" stroke-width="1" />`;
        s += `<text x="${(r.x1 + r.x2) / 2}" y="${r.y1 - 11}" text-anchor="middle" class="map-route-label">${r.label}</text>`;
      } else {
        const stroke = r.type === 'cable' ? '#c29b54' : r.type === 'cable-broken' ? '#9eb0b8' : r.type === 'shortcut' ? '#c97b3b' : '#4d9aa1';
        const dash = r.type === 'shortcut' ? '7 5' : r.type === 'cable-broken' ? '4 5' : '';
        s += `<path d="${r.d}" fill="none" stroke="${stroke}" stroke-width="${r.type === 'swim' ? 3 : 2.2}" ${dash ? `stroke-dasharray="${dash}"` : ''} opacity="0.92" />`;
      }
    }
    underlay.innerHTML = s;

    // Interactive POI pins
    layer.innerHTML = '';
    for (const p of MAP.pois) {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = `map-pin pin-${p.kind}`;
      el.dataset.id = p.id;
      el.style.left = p.x + 'px';
      el.style.top = p.y + 'px';
      el.innerHTML = `
        <span class="pin-icon">${PIN_ICONS[p.kind] || PIN_ICONS.region}</span>
        <span class="pin-body">
          <span class="pin-depth">${p.depth}</span>
          <span class="pin-title">${p.title}</span>
        </span>`;
      el.addEventListener('click', (e) => { e.stopPropagation(); select(p.id, true); });
      layer.appendChild(el);
    }
  }

  function renderQuickNav() {
    if (state.tab === 'map') {
      $('quick-nav').innerHTML = `<div class="quick-nav-title">Trục Độ Sâu (0m – 2,400m)</div>` +
        MAP.pois.filter((p) => p.kind === 'hub' || p.kind === 'region' || p.kind === 'boss')
          .map((p) => `<button class="quick-item" type="button" data-id="${p.id}"><span class="quick-item-tag">${p.depth}</span><span class="quick-item-name">${p.title}</span></button>`).join('');
    } else {
      const core = TIMELINE.filter((n) => n.kind === 'core');
      $('quick-nav').innerHTML = `<div class="quick-nav-title">Mốc Core — Lịch Sử</div>` +
        core.map((n) => `<button class="quick-item" type="button" data-id="${n.id}"><span class="quick-item-tag">${n.meta}</span><span class="quick-item-name">${n.title}</span></button>`).join('');
    }
    $('quick-nav').querySelectorAll('.quick-item').forEach((b) => b.addEventListener('click', () => select(b.dataset.id, true)));
  }

  // ---------- filter & highlight ----------
  function visibleByFilter(n) {
    if (n.tab === 'map') {
      if (state.mapLayer === 'all') return true;
      if (state.mapLayer === 'regions') return n.kind === 'hub' || n.kind === 'region' || n.kind === 'cave';
      if (state.mapLayer === 'stations') return n.kind === 'bell';
      if (state.mapLayer === 'bosses') return n.kind === 'boss';
      if (state.mapLayer === 'fragments') return n.layer === 'fragments' || n.kind === 'loot';
      return true;
    }
    if (state.filter === 'all' || n.kind === 'core') return true;
    if (state.filter === 'core-only') return false;
    return n.cat === state.filter;
  }

  function applyFilter() {
    const sel = state.selected && byId[state.selected]?.tab === state.tab ? state.selected : null;
    if (state.tab === 'map') {
      layer.querySelectorAll('.map-pin').forEach((el) => {
        const p = byId[el.dataset.id];
        const dim = !visibleByFilter(p) || (sel && sel !== p.id);
        el.classList.toggle('node-dimmed', !!dim);
        el.classList.toggle('selected', p.id === sel);
      });
    } else {
      const related = new Set();
      if (sel) {
        related.add(sel);
        const n = byId[sel];
        n.from.forEach(([p]) => related.add(p));
        n.links.forEach(([l]) => related.add(l));
        TIMELINE.forEach((m) => { if (m.from.some(([p]) => p === sel)) related.add(m.id); });
      }
      layer.querySelectorAll('.tree-node').forEach((el) => {
        const n = byId[el.dataset.id];
        const dim = !visibleByFilter(n) || (sel && !related.has(n.id));
        el.classList.toggle('node-dimmed', !!dim);
        el.classList.toggle('selected', n.id === sel);
      });
      svg.querySelectorAll('path').forEach((p) => {
        const a = byId[p.dataset.a], b = byId[p.dataset.b];
        const hit = sel && (p.dataset.a === sel || p.dataset.b === sel);
        p.classList.toggle('edge-highlight', !!hit);
        p.classList.toggle('edge-dimmed', !hit && (!visibleByFilter(a) || !visibleByFilter(b) || !!sel));
      });
    }
    document.querySelectorAll('.quick-item').forEach((q) => q.classList.toggle('active', q.dataset.id === sel));
  }

  // ---------- pan / zoom ----------
  function applyTransform() {
    stage.style.transform = `translate(${state.tx}px, ${state.ty}px) scale(${state.scale})`;
    $('zoom-label').textContent = Math.round(state.scale * 100) + '%';
  }

  function zoomAt(factor, cx, cy) {
    const s = Math.min(2.2, Math.max(0.22, state.scale * factor));
    state.tx = cx - (cx - state.tx) * (s / state.scale);
    state.ty = cy - (cy - state.ty) * (s / state.scale);
    state.scale = s;
    applyTransform();
  }

  function fit() {
    const vw = viewport.clientWidth, vh = viewport.clientHeight;
    if (state.tab === 'map') {
      state.scale = Math.min(0.92, Math.max(0.62, (vw - 48) / MAP.width));
      state.tx = (vw - MAP.width * state.scale) / 2;
      state.ty = 12;
      applyTransform();
      return;
    }
    const xs = TIMELINE.map((n) => box(n.id)).filter(Boolean);
    if (!xs.length) return;
    const minX = Math.min(...xs.map((b) => b.x)), minY = Math.min(...xs.map((b) => b.y));
    const maxX = Math.max(...xs.map((b) => b.x + b.w)), maxY = Math.max(...xs.map((b) => b.y + b.h));
    state.scale = Math.min(1, (vw - 60) / (maxX - minX), (vh - 60) / (maxY - minY));
    state.tx = (vw - (maxX - minX) * state.scale) / 2 - minX * state.scale;
    state.ty = 30 - minY * state.scale;
    applyTransform();
  }

  function centerOn(id) {
    const b = box(id);
    if (!b) return;
    if (state.scale < 0.72) state.scale = 0.86;
    state.tx = viewport.clientWidth / 2 - (b.x + b.w / 2) * state.scale;
    state.ty = viewport.clientHeight / 2 - (b.y + b.h / 2) * state.scale;
    applyTransform();
  }

  let drag = null;
  viewport.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.tree-node, .map-pin')) return;
    drag = { x: e.clientX - state.tx, y: e.clientY - state.ty, moved: false };
    viewport.classList.add('dragging');
  });
  window.addEventListener('pointermove', (e) => {
    if (!drag) return;
    state.tx = e.clientX - drag.x; state.ty = e.clientY - drag.y; drag.moved = true;
    applyTransform();
  });
  window.addEventListener('pointerup', () => {
    if (drag && !drag.moved && state.selected) { state.selected = null; applyFilter(); }
    drag = null; viewport.classList.remove('dragging');
  });
  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const r = viewport.getBoundingClientRect();
    zoomAt(e.deltaY < 0 ? 1.12 : 1 / 1.12, e.clientX - r.left, e.clientY - r.top);
  }, { passive: false });
  $('btn-zoom-in').onclick = () => zoomAt(1.2, viewport.clientWidth / 2, viewport.clientHeight / 2);
  $('btn-zoom-out').onclick = () => zoomAt(1 / 1.2, viewport.clientWidth / 2, viewport.clientHeight / 2);
  $('btn-fit').onclick = fit;

  // ---------- tabs & filters ----------
  function switchTab(tab) {
    if (state.tab === tab) return;
    state.tab = tab;
    document.querySelectorAll('.tab-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.tab === tab);
      b.setAttribute('aria-selected', b.dataset.tab === tab);
    });
    render();
    fit();
  }
  document.querySelectorAll('.tab-btn').forEach((b) => b.addEventListener('click', () => switchTab(b.dataset.tab)));

  document.querySelectorAll('.filter-pill').forEach((b) => b.addEventListener('click', () => {
    state.filter = b.dataset.filter;
    document.querySelectorAll('.filter-pill').forEach((x) => x.classList.toggle('active', x === b));
    applyFilter();
  }));

  document.querySelectorAll('.map-layer-pill').forEach((b) => b.addEventListener('click', () => {
    state.mapLayer = b.dataset.layer;
    document.querySelectorAll('.map-layer-pill').forEach((x) => x.classList.toggle('active', x === b));
    applyFilter();
  }));

  // ---------- drawer ----------
  function select(id, pushHistory) {
    const n = byId[id];
    if (!n) return;
    if (pushHistory && state.selected && state.selected !== id) state.history.push(state.selected);
    switchTab(n.tab);
    state.selected = id;
    applyFilter();
    centerOn(id);
    openDrawer(n);
  }

  function openDrawer(n) {
    drawer.classList.remove('hidden');
    $('btn-history-back').classList.toggle('hidden', state.history.length === 0);
    $('drawer-badges').innerHTML =
      `<span class="node-kind kind-${n.kind === 'core' || n.kind === 'region' || n.kind === 'hub' ? 'core' : 'branch'}">${n.tab === 'map' ? (n.depth || 'Địa điểm') : (n.kind === 'core' ? 'Core Build' : 'Nhánh phụ')}</span>` +
      `<span class="node-kind kind-${n.cat === 'core' ? 'core' : n.cat}">${CAT_LABEL[n.cat] || 'Bản đồ'}</span>` +
      `<span class="node-kind kind-lore">${TAB_LABEL[n.tab]}</span>`;
    $('drawer-title').textContent = n.title;
    $('drawer-subtitle').textContent = n.meta;

    const step = (cls, label, text) => text ? `<div class="causal-step"><div class="causal-step-label ${cls}">${label}</div><p>${text}</p></div>` : '';
    const causal = step('cause', 'Nguyên nhân', n.cause) + step('', 'Diễn biến', n.event) + step('effect', 'Hệ quả', n.effect);
    const parents = (n.from || []).map(([p]) => [p, 'Node cha trên cây']);
    const children = n.tab === 'timeline' ? TIMELINE.filter((m) => m.from.some(([p]) => p === n.id)).map((m) => [m.id, 'Nhánh dẫn ra']) : [];
    const links = [...(n.links || []), ...parents, ...children].filter(([id], i, arr) => byId[id] && arr.findIndex(([x]) => x === id) === i);

    $('drawer-body').innerHTML = `
      <div class="drawer-quote">${n.summary}</div>
      ${causal ? `<div><div class="section-label">Chuỗi nhân quả</div><div class="causal-grid">${causal}</div></div>` : ''}
      ${n.rules && n.rules.length ? `<div><div class="section-label">Luật &amp; số đo</div><ul class="rules-list">${n.rules.map((r) => `<li>${r}</li>`).join('')}</ul></div>` : ''}
      ${n.palette && n.palette.length ? `<div><div class="section-label">Bảng màu</div><div class="palette-row">${n.palette.map(([hex, name]) => `<span class="swatch"><span class="swatch-box" style="background:${hex}"></span>${hex} · ${name}</span>`).join('')}</div></div>` : ''}
      ${links.length ? `<div><div class="section-label">Liên kết (bấm để nhảy)</div><div class="cross-links">${links.map(([id, why]) => `
        <button class="cross-link-btn" type="button" data-id="${id}"><span class="cross-link-main"><span class="cross-link-title">${byId[id].title}</span><span class="cross-link-reason">${why}</span></span>${byId[id].tab !== n.tab ? `<span class="cross-link-tab">→ ${TAB_LABEL[byId[id].tab]}</span>` : ''}</button>`).join('')}</div></div>` : ''}
      <div><div class="section-label">Nguồn lore/</div><div class="sources-box">${(n.sources || []).map((s) => `<span class="source-chip">${s}</span>`).join('')}</div></div>`;
    $('drawer-body').querySelectorAll('.cross-link-btn').forEach((b) => b.addEventListener('click', () => select(b.dataset.id, true)));
    $('drawer-body').scrollTop = 0;
  }

  $('btn-close-drawer').onclick = () => { drawer.classList.add('hidden'); state.selected = null; state.history = []; applyFilter(); };
  $('btn-history-back').onclick = () => { const id = state.history.pop(); if (id) select(id, false); };

  // ---------- search ----------
  const input = $('search-input'), results = $('search-results');
  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase();
  input.addEventListener('input', () => {
    const q = norm(input.value.trim());
    if (!q) { results.classList.add('hidden'); return; }
    const hits = Object.values(byId).filter((n) => norm(`${n.title} ${n.meta} ${n.summary} ${n.depth || ''}`).includes(q)).slice(0, 12);
    results.innerHTML = hits.length ? hits.map((n) => `<div class="search-item" data-id="${n.id}"><span class="search-item-title">${n.title}</span><span class="search-item-meta">${TAB_LABEL[n.tab]} · ${n.meta}</span></div>`).join('')
      : '<div class="search-item"><span class="search-item-meta">Không tìm thấy</span></div>';
    results.classList.remove('hidden');
    results.querySelectorAll('[data-id]').forEach((el) => el.addEventListener('click', () => {
      results.classList.add('hidden'); input.value = ''; select(el.dataset.id, true);
    }));
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.search-wrap')) results.classList.add('hidden'); });

  window.addEventListener('resize', fit);
  render();
  fit();
})();
