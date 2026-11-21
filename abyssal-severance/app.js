(() => {
  const TABS = { timeline: window.LORE_TIMELINE, strata: window.LORE_STRATA };
  const TAB_LABEL = { timeline: 'Lịch Sử', strata: 'Địa Tầng' };
  const CAT_LABEL = { core: 'Core', faction: 'Phe / NPC', system: 'Hệ thống', branch: 'Nhánh phụ', lore: 'Lore / Mảnh' };
  const byId = {};
  for (const [tab, list] of Object.entries(TABS)) for (const n of list) byId[n.id] = { ...n, tab };

  const $ = (id) => document.getElementById(id);
  const viewport = $('viewport'), stage = $('canvas-stage'), svg = $('edges-svg'), layer = $('nodes-layer');
  const drawer = $('detail-drawer');
  const state = { tab: 'timeline', filter: 'all', selected: null, history: [], scale: 1, tx: 0, ty: 0 };

  // ---------- render ----------
  function render() {
    const list = TABS[state.tab];
    layer.innerHTML = '';
    for (const n of list) {
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
    renderQuickNav();
    applyFilter();
  }

  function box(id) {
    const el = layer.querySelector(`[data-id="${id}"]`);
    return el && { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight };
  }

  function drawEdges() {
    let maxX = 0, maxY = 0, paths = '';
    for (const n of TABS[state.tab]) {
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

  function renderQuickNav() {
    const core = TABS[state.tab].filter((n) => n.kind === 'core');
    $('quick-nav').innerHTML = `<div class="quick-nav-title">Mốc Core — ${TAB_LABEL[state.tab]}</div>` +
      core.map((n) => `<button class="quick-item" data-id="${n.id}"><span class="quick-item-tag">${n.meta}</span><span class="quick-item-name">${n.title}</span></button>`).join('');
    $('quick-nav').querySelectorAll('.quick-item').forEach((b) => b.addEventListener('click', () => select(b.dataset.id, true)));
  }

  // ---------- filter & highlight ----------
  function visibleByFilter(n) {
    if (state.filter === 'all' || n.kind === 'core') return true;
    if (state.filter === 'core-only') return false;
    return n.cat === state.filter;
  }

  function applyFilter() {
    const sel = state.selected && byId[state.selected].tab === state.tab ? state.selected : null;
    const related = new Set();
    if (sel) {
      related.add(sel);
      const n = byId[sel];
      n.from.forEach(([p]) => related.add(p));
      n.links.forEach(([l]) => related.add(l));
      TABS[state.tab].forEach((m) => { if (m.from.some(([p]) => p === sel)) related.add(m.id); });
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
    document.querySelectorAll('.quick-item').forEach((q) => q.classList.toggle('active', q.dataset.id === sel));
  }

  // ---------- pan / zoom ----------
  function applyTransform() {
    stage.style.transform = `translate(${state.tx}px, ${state.ty}px) scale(${state.scale})`;
    $('zoom-label').textContent = Math.round(state.scale * 100) + '%';
  }

  function zoomAt(factor, cx, cy) {
    const s = Math.min(2.2, Math.max(0.2, state.scale * factor));
    state.tx = cx - (cx - state.tx) * (s / state.scale);
    state.ty = cy - (cy - state.ty) * (s / state.scale);
    state.scale = s;
    applyTransform();
  }

  function fit() {
    const list = TABS[state.tab];
    const xs = list.map((n) => box(n.id));
    const minX = Math.min(...xs.map((b) => b.x)), minY = Math.min(...xs.map((b) => b.y));
    const maxX = Math.max(...xs.map((b) => b.x + b.w)), maxY = Math.max(...xs.map((b) => b.y + b.h));
    const vw = viewport.clientWidth, vh = viewport.clientHeight;
    state.scale = Math.min(1, (vw - 60) / (maxX - minX), (vh - 60) / (maxY - minY));
    state.tx = (vw - (maxX - minX) * state.scale) / 2 - minX * state.scale;
    state.ty = 30 - minY * state.scale;
    applyTransform();
  }

  function centerOn(id) {
    const b = box(id);
    if (!b) return;
    if (state.scale < 0.7) state.scale = 0.85;
    state.tx = viewport.clientWidth / 2 - (b.x + b.w / 2) * state.scale;
    state.ty = viewport.clientHeight / 2 - (b.y + b.h / 2) * state.scale;
    applyTransform();
  }

  let drag = null;
  viewport.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.tree-node')) return;
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

  // ---------- tabs ----------
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
      `<span class="node-kind kind-${n.kind === 'core' ? 'core' : 'branch'}">${n.kind === 'core' ? 'Core Build' : 'Building Phụ'}</span>` +
      `<span class="node-kind kind-${n.cat === 'core' ? 'core' : n.cat}">${CAT_LABEL[n.cat]}</span>` +
      `<span class="node-kind kind-lore">Tab ${TAB_LABEL[n.tab]}</span>`;
    $('drawer-title').textContent = n.title;
    $('drawer-subtitle').textContent = n.meta;

    const step = (cls, label, text) => text ? `<div class="causal-step"><div class="causal-step-label ${cls}">${label}</div><p>${text}</p></div>` : '';
    const causal = step('cause', 'Nguyên nhân', n.cause) + step('', 'Diễn biến', n.event) + step('effect', 'Hệ quả', n.effect);
    const parents = n.from.map(([p]) => [p, 'Node cha trên cây']);
    const children = TABS[n.tab].filter((m) => m.from.some(([p]) => p === n.id)).map((m) => [m.id, 'Nhánh dẫn ra']);
    const links = [...n.links, ...parents, ...children].filter(([id], i, arr) => byId[id] && arr.findIndex(([x]) => x === id) === i);

    $('drawer-body').innerHTML = `
      <div class="drawer-quote">${n.summary}</div>
      ${causal ? `<div><div class="section-label">Chuỗi nhân quả</div><div class="causal-grid">${causal}</div></div>` : ''}
      ${n.rules.length ? `<div><div class="section-label">Luật & số đo</div><ul class="rules-list">${n.rules.map((r) => `<li>${r}</li>`).join('')}</ul></div>` : ''}
      ${n.palette.length ? `<div><div class="section-label">Bảng màu</div><div class="palette-row">${n.palette.map(([hex, name]) => `<span class="swatch"><span class="swatch-box" style="background:${hex}"></span>${hex} · ${name}</span>`).join('')}</div></div>` : ''}
      ${links.length ? `<div><div class="section-label">Liên kết (bấm để nhảy)</div><div class="cross-links">${links.map(([id, why]) => `
        <button class="cross-link-btn" data-id="${id}"><span class="cross-link-main"><span class="cross-link-title">${byId[id].title}</span><span class="cross-link-reason">${why}</span></span>${byId[id].tab !== n.tab ? `<span class="cross-link-tab">→ ${TAB_LABEL[byId[id].tab]}</span>` : ''}</button>`).join('')}</div></div>` : ''}
      <div><div class="section-label">Nguồn lore/</div><div class="sources-box">${n.sources.map((s) => `<span class="source-chip">${s}</span>`).join('')}</div></div>`;
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
    const hits = Object.values(byId).filter((n) => norm(`${n.title} ${n.meta} ${n.summary}`).includes(q)).slice(0, 12);
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
