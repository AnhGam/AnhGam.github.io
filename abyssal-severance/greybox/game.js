// Abyssal Severance — Playable Greybox 1–3 (640×360 pixel-perfect, 60 Hz fixed step)
// Exact constants from lore/design/_calc/metrics.py, 01, 02, 04, 06, 14.
(() => {
  const W = 640, H = 360, T = 16, DT = 1 / 60;
  const cvs = document.getElementById('game'), ctx = cvs.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const FORMS = {
    F0: { w: 14, h: 36, walk: 150, v0: 267, gR: 444, gF: 790, dashTiles: 4, dashIframe: 0, wallKick: false, combo4: false, grapple: false, airDashes: 1 },
    F1: { w: 16, h: 50, walk: 180, v0: 376, gR: 554, gF: 947, dashTiles: 7, dashIframe: 8, wallKick: true,  combo4: false, grapple: false, airDashes: 1 },
    F2: { w: 16, h: 50, walk: 180, v0: 376, gR: 554, gF: 947, dashTiles: 7, dashIframe: 8, wallKick: true,  combo4: true,  grapple: true,  airDashes: 2 },
  };
  const COMBO_MULT = [1, 1, 1.5, 2], SWORD_DMG = 10, GUN_DMG = 18, MANA_HIT = 11, GUN_COST = 33;

  const keys = {}, prevKeys = {};
  const down = (...ks) => ks.some(k => keys[k]);
  const pressed = (...ks) => ks.some(k => keys[k] && !prevKeys[k]);

  let sceneId = 'zoo', formId = 'F0', showTel = false;
  let world = null, P = null, cam = { x: 0, y: 0 }, hitstop = 0, shake = 0, tick = 0;
  let bullets = [], sparks = [], enemies = [], boss = null, bell = null;
  let kpi = { meleeDmg: 0, gunDmg: 0, clashes: 0, hitsLanded: 0, fightStart: 0, shotsFilled: 0, lastShotFill: 0, fillSum: 0, bossTries: 0, bossWon: false, bossHpLeft: 0 };

  const aabb = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const addSpark = (x, y, col, n = 8, sp = 90) => {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, s = sp * (0.4 + Math.random() * 0.8);
      sparks.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 14 + (Math.random() * 10 | 0), col });
    }
  };

  function makePlayer(x, y) {
    const f = FORMS[formId];
    return {
      x, y: y - f.h, vx: 0, vy: 0, w: f.w, h: f.h, dir: 1, grounded: true, wallDir: 0, crawling: false,
      coyote: 6, jbuf: 0, dashT: 0, dashCd: 0, airDashLeft: f.airDashes, iframe: 0, hurtCd: 0,
      hp: 6, maxHp: 6, mana: 0, maxMana: 99, stam: 100, maxStam: 100, flasks: 3, maxFlasks: 3, healT: 0,
      atkT: 0, atkCd: 0, comboStep: 0, comboWin: 0, atkDown: false, atkHitSet: new Set(),
      combatTimer: 0, hudAlpha: 0.25, grappleT: 0, grappleTo: null,
      sx: 1, sy: 1, fallDist: 0, stomping: false, sv: 0,
    };
  }

  let drops = [], camKick = { x: 0, y: 0 }, invertT = 0;

  function spawnDrop(x, y, tier = 1) {
    const n = tier === 5 ? 1 : 3;
    for (let i = 0; i < n; i++) {
      drops.push({ x, y, vx: (Math.random() - 0.5) * 140, vy: -90 - Math.random() * 60, tier, life: 600 });
    }
  }

  function buildScene(id) {
    sceneId = id; bullets = []; sparks = []; drops = []; enemies = []; boss = null; bell = null; hitstop = 0; shake = 0; invertT = 0; camKick = { x: 0, y: 0 };
    kpi = { meleeDmg: 0, gunDmg: 0, clashes: 0, hitsLanded: 0, fightStart: tick, shotsFilled: 0, lastShotFill: tick, fillSum: 0, bossTries: kpi.bossTries, bossWon: false, bossHpLeft: 0 };
    const sols = [], labels = [], rings = [], brines = [], currents = [];
    const rect = (tx, ty, tw, th, kind = 'solid') => sols.push({ x: tx * T, y: ty * T, w: tw * T, h: th * T, kind });
    const lbl = (tx, ty, txt) => labels.push({ x: tx * T, y: ty * T, txt });

    if (id === 'zoo') {
      const floorY = 26;
      // Start platform + gaps: 10, 13, 14, 17, 20, 24, 30
      let cx = 0;
      const addPlat = (w, text) => { rect(cx, floorY, w, 6); if (text) lbl(cx + 1, floorY - 1.2, text); cx += w; };
      addPlat(12, 'SPAWN (F0/F1/F2)');
      // Ledges 4, 5, 7, 8, 10
      const ledges = [4, 5, 7, 8, 10];
      ledges.forEach((lh, i) => { rect(14 + i * 5, floorY - lh, 3, lh); lbl(14 + i * 5, floorY - lh - 0.8, `Gờ ${lh}ô`); });
      cx = 40; rect(12, floorY, 28, 6);
      // Crawlway 2-tile high (32px)
      rect(42, floorY - 5, 8, 3); lbl(42, floorY - 6, 'Khe bò 2ô (giữ S)');
      rect(40, floorY, 14, 6); cx = 54;
      // Gaps
      for (const g of [10, 13, 14, 17, 20, 24]) {
        lbl(cx + g / 2 - 2, floorY - 0.8, `Khe ${g}ô`);
        cx += g;
        addPlat(6, '');
      }
      // Grapple chasm 30ô with 4 rings (spacing 8ô)
      lbl(cx + 8, floorY - 7, 'Vực móc neo 30ô (F2 + F)');
      for (let i = 0; i < 4; i++) rings.push({ x: (cx + 5 + i * 7) * T, y: (floorY - 5) * T });
      cx += 30; addPlat(10, 'Đích móc');
      // Brine bounce pool (11ô normal, 15ô stomp)
      brines.push({ x: (cx + 1) * T, y: floorY * T, w: 8 * T, h: 2 * T });
      lbl(cx + 1, floorY - 1, 'Hồ muối (11ô / S+nhảy 15ô)');
      rect(cx + 10, floorY - 10, 4, 10); lbl(cx + 10, floorY - 11, 'Gờ 10ô');
      rect(cx + 16, floorY - 14, 4, 14); lbl(cx + 16, floorY - 15, 'Gờ 14ô');
      rect(cx, floorY + 2, 24, 4); cx += 24;
      // Wall-kick shaft 4ô wide, 34ô tall with rest ledge at 26ô
      rect(cx, floorY - 34, 2, 34); rect(cx + 6, floorY - 34, 2, 30);
      rect(cx + 2, floorY - 24, 2, 1); lbl(cx, floorY - 25, 'Gờ nghỉ');
      lbl(cx, floorY - 1, 'Giếng đạp tường 4ô (F1)');
      rect(cx, floorY, 12, 6); cx += 12;
      // Current corridor with calm pockets every 13ô
      rect(cx, floorY, 40, 6);
      currents.push({ x: (cx + 2) * T, y: (floorY - 6) * T, w: 11 * T, h: 6 * T, fx: -108 });
      currents.push({ x: (cx + 16) * T, y: (floorY - 6) * T, w: 11 * T, h: 6 * T, fx: -108 });
      lbl(cx + 2, floorY - 7, 'Dòng chảy (-60% tốc) + túi nước lặng mỗi 13ô');
      // Safety floor far below
      rect(0, floorY + 10, cx + 44, 2);
      world = { w: (cx + 44) * T, h: (floorY + 14) * T, sols, labels, rings, brines, currents, spawn: { x: 4 * T, y: floorY * T } };
    } else if (id === 'combat') {
      rect(0, 20, 60, 4); rect(0, 0, 2, 24); rect(58, 0, 2, 24);
      rect(14, 15, 6, 1); rect(36, 14, 8, 1);
      bell = { x: 5 * T, y: 17 * T, w: 2 * T, h: 3 * T };
      lbl(3, 16, 'Chuông Lặn (Q/E hồi miễn phí)');
      lbl(20, 12, 'Đánh viền BẠC = Clash Parry (+20 Mana) · Bắn = L/C (33 Mana)');
      enemies.push(makeEnemy('sword', 24 * T, 20 * T));
      enemies.push(makeEnemy('gunner', 39 * T, 14 * T));
      enemies.push(makeEnemy('crab', 48 * T, 20 * T));
      world = { w: 60 * T, h: 24 * T, sols, labels, rings, brines, currents, spawn: { x: 6 * T, y: 20 * T } };
    } else {
      // Boss B1 Cự Giải Đóng Xác (1.5x1 arena = 60x22.5 tiles, upper ledge at 7 tiles)
      rect(0, 20, 60, 4); rect(0, 0, 2, 24); rect(58, 0, 2, 24);
      rect(10, 13, 10, 1); rect(40, 13, 10, 1); // 7-tile high ledges
      bell = { x: 4 * T, y: 17 * T, w: 2 * T, h: 3 * T };
      lbl(3, 16, 'Chuông'); lbl(11, 12, 'Sàn trên 7ô'); lbl(41, 12, 'Sàn trên 7ô');
      boss = {
        name: 'B1 — Cự Giải Đóng Xác', x: 42 * T, y: 20 * T - 52, w: 56, h: 52, vx: 0, dir: -1,
        hp: 520, maxHp: 520, phase: 1, state: 'idle', timer: 50, atkType: '', telegraph: 0, active: 0,
        teleColor: '#d9e6f2', hingeBroken: false, hingeHits: 0, stun: 0, comboCount: 0,
      };
      kpi.bossTries++;
      world = { w: 60 * T, h: 24 * T, sols, labels, rings, brines, currents, spawn: { x: 7 * T, y: 20 * T } };
    }
    P = makePlayer(world.spawn.x, world.spawn.y);
  }

  function makeEnemy(type, x, footY) {
    if (type === 'sword') return { type, name: 'Lính Kiếm Móc', x, y: footY - 38, w: 18, h: 38, hp: 45, maxHp: 45, dir: -1, state: 'idle', timer: 40, tele: 0, active: 0, col: '#d9e6f2', stun: 0, hitCd: 0 };
    if (type === 'gunner') return { type, name: 'Xạ Thủ Súng Ẩm', x, y: footY - 34, w: 16, h: 34, hp: 25, maxHp: 25, dir: -1, state: 'idle', timer: 55, tele: 0, active: 0, col: '#f5b041', stun: 0, hitCd: 0, firstShot: true };
    return { type: 'crab', name: 'Cua Quan Tài', x, y: footY - 28, w: 30, h: 28, hp: 45, maxHp: 45, dir: -1, state: 'idle', timer: 60, tele: 0, active: 0, col: '#ff4d4d', stun: 0, hitCd: 0 };
  }

  function damagePlayer(dmg, kbDir) {
    if (P.iframe > 0 || P.hurtCd > 0) return;
    P.hp = Math.max(0, P.hp - dmg);
    P.hurtCd = 54; P.vx = kbDir * 140; P.vy = -160; P.combatTimer = 240; P.healT = 0;
    hitstop = 4; shake = 6; addSpark(P.x + P.w / 2, P.y + P.h / 2, '#ff4d4d', 12, 110);
    if (P.hp <= 0) buildScene(sceneId);
  }

  function hitEnemy(e, dmg, isGun, kbDir) {
    // Coffin crab front shell clash!
    if (e.type === 'crab' && !isGun && e.state !== 'stun' && Math.sign(P.x - e.x) === e.dir) {
      hitstop = 4; P.vx = -P.dir * 130; addSpark(e.x + e.w / 2, e.y + 12, '#e8f6ff', 10, 120);
      return;
    }
    e.hp -= dmg; e.hitCd = 6; P.combatTimer = 240;
    if (isGun) kpi.gunDmg += dmg; else {
      kpi.meleeDmg += dmg; kpi.hitsLanded++;
      const prevShots = Math.floor(P.mana / GUN_COST);
      P.mana = Math.min(P.maxMana, P.mana + MANA_HIT);
      if (Math.floor(P.mana / GUN_COST) > prevShots) {
        kpi.shotsFilled++; kpi.fillSum += (tick - kpi.lastShotFill) / 60; kpi.lastShotFill = tick;
      }
    }
    hitstop = isGun ? 3 : (P.comboStep >= 2 ? 5 : 3);
    camKick.x = (dir || P.dir) * (P.comboStep >= 2 ? 4 : 2);
    addSpark(e.x + e.w / 2, e.y + e.h / 2, isGun ? '#3ee8d8' : '#fff6dc', 8, 95);
    if (e.hp <= 0) {
      hitstop = 4;
      addSpark(e.x + e.w / 2, e.y + e.h / 2, '#ff9f43', 18, 140);
      addSpark(e.x + e.w / 2, e.y + e.h / 2, '#7ef9ff', 10, 60);
      spawnDrop(e.x + e.w / 2, e.y + e.h / 2, 1);
      e.dead = true;
    }
  }

  function hitBoss(dmg, isGun, fromTop) {
    if (!boss || boss.hp <= 0) return;
    let mult = 1;
    if (!boss.hingeBroken && fromTop) {
      boss.hingeHits++;
      if (boss.hingeHits >= 4) { boss.hingeBroken = true; boss.stun = 90; addSpark(boss.x + boss.w / 2, boss.y + 8, '#ffd166', 22, 160); }
    }
    if (boss.hingeBroken) mult = 1.2;
    const real = Math.round(dmg * mult);
    boss.hp = Math.max(0, boss.hp - real);
    P.combatTimer = 240;
    if (isGun) kpi.gunDmg += real; else {
      kpi.meleeDmg += real; kpi.hitsLanded++;
      const prevShots = Math.floor(P.mana / GUN_COST);
      P.mana = Math.min(P.maxMana, P.mana + MANA_HIT);
      if (Math.floor(P.mana / GUN_COST) > prevShots) {
        kpi.shotsFilled++; kpi.fillSum += (tick - kpi.lastShotFill) / 60; kpi.lastShotFill = tick;
      }
    }
    hitstop = 3; camKick.x = P.dir * 3; addSpark(boss.x + boss.w / 2, boss.y + boss.h / 2, isGun ? '#3ee8d8' : '#fff6dc', 8, 100);
    if (boss.phase === 1 && boss.hp <= boss.maxHp * 0.5) {
      boss.phase = 2; boss.state = 'idle'; boss.timer = 45; shake = 8;
      addSpark(boss.x + boss.w / 2, boss.y + boss.h / 2, '#5ce1e6', 24, 160);
    }
    if (boss.hp <= 0) {
      // 17 Q17.3: Boss Death Throe (3.5s = 210f) + clear all enemy projectiles at f12
      kpi.bossWon = true; kpi.bossHpLeft = P.hp; hitstop = 12; shake = 10; invertT = 1;
      boss.deathT = 210;
      bullets = bullets.filter(b => b.friendly);
    }
  }

  function triggerClash(target) {
    kpi.clashes++; hitstop = 5; shake = 4; invertT = 1; camKick.x = -P.dir * 5;
    P.mana = Math.min(P.maxMana, P.mana + 20);
    P.iframe = Math.max(P.iframe, 10);
    P.vx = -P.dir * 120;
    target.stun = 50; target.state = 'stun'; target.tele = 0; target.active = 0;
    addSpark((P.x + target.x) / 2 + 12, P.y + 18, '#ffffff', 16, 150);
  }

  function stepPlayer() {
    const f = FORMS[formId];
    // Crawl toggle (24px hitbox)
    const wantCrawl = P.grounded && down('KeyS', 'ArrowDown');
    if (wantCrawl && !P.crawling) { P.y += P.h - 24; P.h = 24; P.crawling = true; }
    else if (!wantCrawl && P.crawling) {
      const test = { x: P.x, y: P.y - (f.h - 24), w: P.w, h: f.h };
      if (!world.sols.some(s => aabb(test, s))) { P.y -= (f.h - 24); P.h = f.h; P.crawling = false; }
    }

    // Bell free refill
    if (bell && aabb(P, bell)) {
      P.hp = P.maxHp; P.flasks = P.maxFlasks; P.stam = P.maxStam;
    }

    // Heal flask (Q/E)
    if (pressed('KeyQ', 'KeyE') && P.flasks > 0 && P.hp < P.maxHp && P.grounded && P.healT === 0) P.healT = 54;
    if (P.healT > 0) {
      P.vx *= 0.6; P.healT--;
      if (P.healT === 0) { P.flasks--; P.hp = Math.min(P.maxHp, P.hp + 2); addSpark(P.x + P.w / 2, P.y + P.h / 2, '#ff6b81', 12, 80); }
    }

    // Horizontal move (3f accel)
    const mx = (down('KeyD', 'ArrowRight') ? 1 : 0) - (down('KeyA', 'ArrowLeft') ? 1 : 0);
    if (mx !== 0 && P.dashT === 0 && P.grappleT === 0) P.dir = mx;
    const targetVx = mx * (P.crawling ? f.walk * 0.45 : f.walk);
    if (P.dashT === 0 && P.grappleT === 0 && P.healT === 0) {
      P.vx += (targetVx - P.vx) * 0.35;
      if (Math.abs(mx) === 0 && Math.abs(P.vx) < 8) P.vx = 0;
    }

    // Currents (traversal stamina)
    let inCurrent = false;
    for (const c of world.currents) {
      if (aabb(P, c)) {
        inCurrent = true;
        if (P.stam > 0 && mx > 0) { P.vx = f.walk * 0.40; P.stam = Math.max(0, P.stam - 25 * DT); }
        else P.vx += c.fx * DT * 6;
      }
    }

    // Grapple (F2 + F)
    if (f.grapple && pressed('KeyF') && P.grappleT === 0) {
      let best = null, bd = 10 * T;
      for (const r of world.rings) {
        const d = Math.hypot(r.x - (P.x + P.w / 2), r.y - (P.y + P.h / 2));
        if (d < bd) { bd = d; best = r; }
      }
      if (best) { P.grappleTo = best; P.grappleT = 14; P.airDashLeft = f.airDashes; }
    }
    if (P.grappleT > 0) {
      P.grappleT--;
      const dx = P.grappleTo.x - (P.x + P.w / 2), dy = P.grappleTo.y - (P.y + P.h / 2);
      P.vx = dx * 12; P.vy = dy * 12;
      if (P.grappleT === 0) P.vy = -220;
    }

    // Dash (Shift / K) — ↓ + Dash mid-air on F1+ = Dậm Nặng (15/16 P0 fix, no conflict with ↓+Chém Pogo)
    if (P.dashCd > 0) P.dashCd--;
    if (pressed('ShiftLeft', 'ShiftRight', 'KeyK') && P.dashCd === 0 && P.dashT === 0 && (P.grounded || P.airDashLeft > 0)) {
      if (!P.grounded && down('KeyS', 'ArrowDown') && formId !== 'F0') {
        P.stomping = true; P.vx = 0; P.vy = 480; P.dashCd = 24; P.sx = 0.78; P.sy = 1.24;
      } else {
        if (!P.grounded) P.airDashLeft--;
        P.dashT = 10; P.dashCd = 22; P.iframe = Math.max(P.iframe, f.dashIframe);
        P.vx = P.dir * (f.dashTiles * T) / (10 * DT); P.vy = 0; P.sx = 1.22; P.sy = 0.82;
        addSpark(P.x + P.w / 2, P.y + P.h / 2, f.dashIframe ? '#3ee8d8' : '#b9c7a5', 8, 70);
      }
    }
    if (P.dashT > 0) { P.dashT--; P.vy = 0; }

    // Jump + coyote (6f) + buffer (7f) + wall-kick (vy<=0, +6.15ô)
    if (P.grounded) { P.coyote = 6; P.airDashLeft = f.airDashes; } else if (P.coyote > 0) P.coyote--;
    if (pressed('Space', 'KeyZ')) P.jbuf = 7; else if (P.jbuf > 0) P.jbuf--;

    const onWall = !P.grounded && P.wallDir !== 0 && f.wallKick && P.vy >= 0;
    if (onWall && P.stam > 0) { P.vy = Math.min(P.vy, 55); P.stam = Math.max(0, P.stam - 16 * DT); }
    if (!inCurrent && !onWall && P.grounded) P.stam = Math.min(P.maxStam, P.stam + 45 * DT);

    if (P.jbuf > 0 && P.dashT === 0) {
      if (P.coyote > 0) {
        P.vy = -f.v0; P.grounded = false; P.coyote = 0; P.jbuf = 0; P.sx = 0.85; P.sy = 1.18;
      } else if (onWall && P.stam >= 12) {
        P.vy = -330; P.vx = -P.wallDir * f.walk * 1.1; P.dir = -P.wallDir;
        P.stam = Math.max(0, P.stam - 16); P.jbuf = 0; P.sx = 0.85; P.sy = 1.18;
        addSpark(P.x + (P.wallDir > 0 ? P.w : 0), P.y + P.h / 2, '#d2fff2', 6, 70);
      }
    }
    // Variable jump cut
    if (!down('Space', 'KeyZ') && P.vy < -90) P.vy *= 0.85;

    // Gravity with apex half-gravity
    if (P.dashT === 0 && P.grappleT === 0) {
      let g = P.vy < 0 ? f.gR : f.gF;
      if (down('Space', 'KeyZ') && Math.abs(P.vy) < 40) g *= 0.5;
      P.vy = Math.min(540, P.vy + g * DT);
    }

    // Move & collide X + Ledge Pop (02 Q2.9: jump 6 px, dash 8 px — feet barely below ledge top get lifted on)
    const freeAt = (x, y) => !world.sols.some(s => aabb({ x, y, w: P.w, h: P.h }, s));
    P.x = clamp(P.x + P.vx * DT, 0, world.w - P.w);
    P.wallDir = 0;
    for (const s of world.sols) {
      if (aabb(P, s)) {
        const lift = P.y + P.h - s.y, pop = P.dashT > 0 ? 8 : 6;
        if (!P.grounded && P.vy >= -40 && lift > 0 && lift <= pop && freeAt(P.x, s.y - P.h)) { P.y = s.y - P.h; P.vy = 0; continue; }
        if (P.vx > 0) { P.x = s.x - P.w; P.wallDir = 1; }
        else if (P.vx < 0) { P.x = s.x + s.w; P.wallDir = -1; }
        P.vx = 0;
      }
    }
    // Move & collide Y + Squash & Stretch landing (17 Q17.6)
    const wasGrounded = P.grounded;
    if (!wasGrounded && P.vy > 0) P.fallDist += P.vy * DT;
    P.y += P.vy * DT; P.grounded = false;
    for (const s of world.sols) {
      if (aabb(P, s)) {
        if (P.vy > 0) {
          P.y = s.y - P.h; P.grounded = true;
          if (!wasGrounded) {
            if (P.stomping || P.fallDist > 6 * T) {
              P.sx = 1.26; P.sy = 0.74; shake = Math.max(shake, P.stomping ? 5 : 3);
              addSpark(P.x + P.w / 2, P.y + P.h, '#7ef9ff', P.stomping ? 16 : 8, 95);
            } else { P.sx = 1.18; P.sy = 0.82; }
            P.fallDist = 0; P.stomping = false;
          }
        }
        else if (P.vy < 0) {
          // Ceiling corner correction: slide up to 8 px sideways around a head-bonk (Celeste 4 px @320p)
          const order = P.vx < 0 ? [-1, 1] : [1, -1];
          let nudged = false;
          for (let i = 1; i <= 8 && !nudged; i++) for (const sg of order) {
            if (!nudged && freeAt(P.x + sg * i, P.y)) { P.x += sg * i; nudged = true; }
          }
          if (nudged) continue;
          P.y = s.y + s.h;
        }
        P.vy = 0;
      }
    }
    P.sx += (1 - P.sx) * 0.25; P.sy += (1 - P.sy) * 0.25;
    // Brine bounce pool (11ô normal, 15ô stomp)
    for (const b of world.brines) {
      if (aabb(P, b) && P.vy >= 0) {
        const tiles = down('KeyS', 'ArrowDown') ? 15 : 11;
        P.vy = -Math.sqrt(2 * f.gR * tiles * T);
        addSpark(P.x + P.w / 2, b.y, '#5ce1e6', 12, 100);
      }
    }

    // Cutlass Attack (J / X) — 0 stamina!
    if (P.atkCd > 0) P.atkCd--;
    if (P.comboWin > 0) { P.comboWin--; if (P.comboWin === 0) P.comboStep = 0; }
    if (pressed('KeyJ', 'KeyX') && P.atkCd === 0 && P.healT === 0) {
      P.atkT = 8; P.atkCd = 16; P.atkHitSet.clear();
      P.atkDown = !P.grounded && down('KeyS', 'ArrowDown');
      const maxSteps = f.combo4 ? 4 : 3;
      P.comboStep = P.comboWin > 0 ? (P.comboStep + 1) % maxSteps : 0;
      P.comboWin = 28; P.combatTimer = 240;
    }
    if (P.atkT > 0) {
      P.atkT--;
      const hb = P.atkDown
        ? { x: P.x - 10, y: P.y + P.h - 4, w: P.w + 20, h: 28 }
        : { x: P.dir > 0 ? P.x + P.w - 2 : P.x - 34, y: P.y + 4, w: 36, h: P.h - 8 };
      const dmg = Math.round(SWORD_DMG * COMBO_MULT[P.comboStep]);
      for (const e of enemies) {
        if (e.dead || P.atkHitSet.has(e)) continue;
        if (aabb(hb, e)) {
          P.atkHitSet.add(e);
          if ((e.active > 0 || (e.tele > 0 && e.tele <= 10)) && e.col === '#d9e6f2') {
            triggerClash(e);
          } else {
            hitEnemy(e, dmg, false, P.dir);
            if (P.atkDown) { P.vy = -210; P.airDashLeft = f.airDashes; }
          }
        }
      }
      if (boss && boss.hp > 0 && !P.atkHitSet.has(boss) && aabb(hb, boss)) {
        P.atkHitSet.add(boss);
        if ((boss.active > 0 || (boss.tele > 0 && boss.tele <= 10)) && boss.teleColor === '#d9e6f2') {
          triggerClash(boss);
        } else {
          hitBoss(dmg, false, P.atkDown || P.y + P.h < boss.y + 18);
          if (P.atkDown) { P.vy = -210; P.airDashLeft = f.airDashes; }
        }
      }
    }

    // Cavitation Gun (L / C) — 33 mana
    if (pressed('KeyL', 'KeyC') && P.mana >= GUN_COST && P.healT === 0) {
      P.mana -= GUN_COST; P.combatTimer = 240; shake = 3;
      bullets.push({ x: P.x + P.w / 2 + P.dir * 12, y: P.y + P.h * 0.42, vx: P.dir * 340, vy: 0, friendly: true, dmg: GUN_DMG, life: 45, col: '#3ee8d8' });
    }

    if (P.iframe > 0) P.iframe--;
    if (P.hurtCd > 0) P.hurtCd--;
    if (P.combatTimer > 0) P.combatTimer--;
    // Minimal HUD auto-fade (14-minimal-hud)
    const wantAlpha = (P.combatTimer > 0 || P.hp < P.maxHp || P.stam < P.maxStam) ? 1 : 0.25;
    P.hudAlpha += (wantAlpha - P.hudAlpha) * 0.08;
  }

  function stepEnemies() {
    for (const e of enemies) {
      if (e.dead) continue;
      if (e.hitCd > 0) e.hitCd--;
      if (e.stun > 0) { e.stun--; continue; }
      const dx = (P.x + P.w / 2) - (e.x + e.w / 2);
      e.dir = dx >= 0 ? 1 : -1;
      if (e.state === 'idle') {
        if (e.type === 'sword' && Math.abs(dx) > 42 && Math.abs(dx) < 240) e.x += e.dir * 55 * DT;
        e.timer--;
        if (e.timer <= 0 && Math.abs(dx) < (e.type === 'gunner' ? 320 : 120)) {
          e.state = 'tele';
          e.tele = e.type === 'sword' ? 26 : e.type === 'gunner' ? 30 : 36;
        }
      } else if (e.state === 'tele') {
        e.tele--;
        if (e.tele <= 0) {
          e.state = 'act'; e.active = e.type === 'crab' ? 12 : 8;
          if (e.type === 'gunner') {
            const ang = Math.atan2((P.y + 18) - (e.y + 14), dx) + (e.firstShot ? 0.22 : 0);
            e.firstShot = false;
            for (const off of [-0.14, 0, 0.14]) {
              bullets.push({ x: e.x + e.w / 2, y: e.y + 14, vx: Math.cos(ang + off) * 260, vy: Math.sin(ang + off) * 260, friendly: false, dmg: 1, life: 90, col: '#f5b041' });
            }
          }
        }
      } else if (e.state === 'act') {
        if (e.type === 'crab') e.x += e.dir * 210 * DT;
        const hb = e.type === 'sword' ? { x: e.dir > 0 ? e.x + e.w : e.x - 28, y: e.y + 6, w: 28, h: 24 } : e;
        if (e.type !== 'gunner' && aabb(hb, P)) damagePlayer(1, e.dir);
        e.active--;
        if (e.active <= 0) { e.state = 'idle'; e.timer = e.type === 'gunner' ? 110 : 65; }
      }
    }
  }

  function stepBoss() {
    if (!boss) return;
    if (boss.hp <= 0) {
      if (boss.deathT > 0) {
        boss.deathT--;
        if (boss.deathT === 160 || boss.deathT === 110 || boss.deathT === 50) {
          shake = 6; addSpark(boss.x + Math.random() * boss.w, boss.y + Math.random() * boss.h, '#ffd166', 20, 150);
        }
        if (boss.deathT === 0) {
          addSpark(boss.x + boss.w / 2, boss.y + boss.h / 2, '#5ce1e6', 32, 180);
          spawnDrop(boss.x + boss.w / 2, boss.y + boss.h / 2, 5);
        }
      }
      return;
    }
    if (boss.stun > 0) { boss.stun--; return; }
    const dx = (P.x + P.w / 2) - (boss.x + boss.w / 2);
    if (boss.state === 'idle') {
      boss.dir = dx >= 0 ? 1 : -1;
      if (Math.abs(dx) > 70) boss.x = clamp(boss.x + boss.dir * 65 * DT, 3 * T, 54 * T);
      boss.timer--;
      if (boss.timer <= 0) {
        const r = Math.random();
        if (boss.phase === 2 && r < 0.35) { boss.atkType = 'wave'; boss.tele = 48; boss.teleColor = '#5ce1e6'; }
        else if (r < 0.7) { boss.atkType = 'claw'; boss.tele = 28; boss.teleColor = '#d9e6f2'; boss.comboCount = boss.phase === 2 ? 2 : 1; }
        else { boss.atkType = 'slam'; boss.tele = 38; boss.teleColor = '#ff4d4d'; }
        boss.state = 'tele';
      }
    } else if (boss.state === 'tele') {
      boss.tele--;
      if (boss.tele <= 0) {
        boss.state = 'act'; boss.active = 10;
        if (boss.atkType === 'wave') {
          for (const d of [-1, 1]) bullets.push({ x: boss.x + boss.w / 2, y: boss.y + boss.h - 14, vx: d * 190, vy: 0, friendly: false, dmg: 1, life: 120, col: '#5ce1e6', r: 8 });
          shake = 5;
        }
      }
    } else if (boss.state === 'act') {
      const hb = boss.atkType === 'claw'
        ? { x: boss.dir > 0 ? boss.x + boss.w : boss.x - 42, y: boss.y + 10, w: 42, h: 36 }
        : { x: boss.x - 16, y: boss.y + 8, w: boss.w + 32, h: boss.h - 6 };
      if (boss.atkType !== 'wave' && aabb(hb, P)) damagePlayer(1, boss.dir);
      boss.active--;
      if (boss.active <= 0) {
        if (boss.atkType === 'claw' && boss.comboCount > 1) {
          boss.comboCount--; boss.state = 'tele'; boss.tele = 24;
        } else {
          boss.state = 'idle'; boss.timer = boss.phase === 2 ? 70 : 90;
        }
      }
    }
  }

  function stepBulletsAndSparks() {
    for (const b of bullets) {
      b.x += b.vx * DT; b.y += b.vy * DT; b.life--;
      const r = b.r || 4, box = { x: b.x - r, y: b.y - r, w: r * 2, h: r * 2 };
      if (world.sols.some(s => aabb(box, s))) { b.life = 0; continue; }
      if (b.friendly) {
        for (const e of enemies) if (!e.dead && aabb(box, e)) { hitEnemy(e, b.dmg, true, Math.sign(b.vx)); b.life = 0; break; }
        if (b.life > 0 && boss && boss.hp > 0 && aabb(box, boss)) { hitBoss(b.dmg, true, false); b.life = 0; }
      } else if (aabb(box, P)) { damagePlayer(b.dmg, Math.sign(b.vx) || 1); b.life = 0; }
    }
    bullets = bullets.filter(b => b.life > 0);
    for (const s of sparks) { s.x += s.vx * DT; s.y += s.vy * DT; s.life--; }
    sparks = sparks.filter(s => s.life > 0);
    // Tier 1 Sv & Tier 5 Vessel drops (underwater drag 3.2/s + 3-tile magnet, 17 Q17.4)
    for (const d of drops) {
      d.life--;
      d.vx *= Math.max(0, 1 - 3.2 * DT);
      d.vy = Math.min(180, d.vy + 260 * DT);
      const dx = (P.x + P.w / 2) - d.x, dy = (P.y + P.h / 2) - d.y, dist = Math.hypot(dx, dy);
      if (dist < 3 * T) { d.vx += (dx / (dist || 1)) * 28; d.vy += (dy / (dist || 1)) * 28; }
      if (dist < 14) { d.life = 0; P.sv += d.tier === 5 ? 50 : 5; addSpark(d.x, d.y, d.tier === 5 ? '#5ce1e6' : '#ffd166', 8, 70); continue; }
      d.x += d.vx * DT; d.y += d.vy * DT;
      const box = { x: d.x - 3, y: d.y - 3, w: 6, h: 6 };
      for (const s of world.sols) { if (aabb(box, s) && d.vy > 0) { d.y = s.y - 3; d.vy = -d.vy * 0.4; } }
    }
    drops = drops.filter(d => d.life > 0);
  }

  function draw() {
    ctx.fillStyle = invertT > 0 ? '#e8f6ff' : '#0c1824'; ctx.fillRect(0, 0, W, H);
    if (invertT > 0) invertT--;
    const sx = shake > 0 ? (Math.random() - 0.5) * shake : 0, sy = shake > 0 ? (Math.random() - 0.5) * shake : 0;
    if (shake > 0) shake *= 0.8;
    camKick.x *= 0.72; camKick.y *= 0.72;
    const tx = clamp(P.x + P.w / 2 - W / 2 + P.dir * 36, 0, Math.max(0, world.w - W));
    const ty = clamp(P.y + P.h / 2 - H / 2 - 16, 0, Math.max(0, world.h - H));
    cam.x += (tx - cam.x) * 0.14; cam.y += (ty - cam.y) * 0.14;
    const cx = Math.round(cam.x + sx + camKick.x), cy = Math.round(cam.y + sy + camKick.y);

    ctx.save(); ctx.translate(-cx, -cy);
    // Subtle 16px tile grid
    ctx.strokeStyle = 'rgba(80,140,160,0.08)'; ctx.lineWidth = 1;
    for (let x = (cx - cx % T); x < cx + W; x += T) { ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(x, cy + H); ctx.stroke(); }
    for (let y = (cy - cy % T); y < cy + H; y += T) { ctx.beginPath(); ctx.moveTo(cx, y); ctx.lineTo(cx + W, y); ctx.stroke(); }

    // Currents & brines
    for (const c of world.currents) { ctx.fillStyle = 'rgba(46,160,180,0.18)'; ctx.fillRect(c.x, c.y, c.w, c.h); }
    for (const b of world.brines) { ctx.fillStyle = '#257c8a'; ctx.fillRect(b.x, b.y, b.w, b.h); ctx.fillStyle = '#7ef9ff'; ctx.fillRect(b.x, b.y, b.w, 3); }
    // Solids
    for (const s of world.sols) { ctx.fillStyle = '#24384c'; ctx.fillRect(s.x, s.y, s.w, s.h); ctx.fillStyle = '#4a6b82'; ctx.fillRect(s.x, s.y, s.w, 2); }
    // Grapple rings
    for (const r of world.rings) { ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(r.x, r.y, 6, 0, Math.PI * 2); ctx.stroke(); }
    // Bell
    if (bell) { ctx.fillStyle = '#b88a44'; ctx.fillRect(bell.x, bell.y, bell.w, bell.h); ctx.fillStyle = '#ffe29a'; ctx.fillRect(bell.x + 8, bell.y + 8, 16, 16); }
    // World labels
    ctx.font = '9px monospace'; ctx.fillStyle = '#89b4c9';
    for (const l of world.labels) ctx.fillText(l.txt, l.x, l.y);

    // Enemies
    for (const e of enemies) {
      if (e.dead) continue;
      ctx.fillStyle = e.hitCd > 0 ? '#fff' : e.stun > 0 ? '#778ca3' : e.type === 'crab' ? '#8c3b3b' : '#3b6e6c';
      ctx.fillRect(e.x, e.y, e.w, e.h);
      if (e.tele > 0 || e.active > 0) {
        ctx.strokeStyle = e.col; ctx.lineWidth = 2; ctx.strokeRect(e.x - 2, e.y - 2, e.w + 4, e.h + 4);
      }
    }
    // Boss (including 3.5s Death Throe tremble)
    if (boss && (boss.hp > 0 || boss.deathT > 0)) {
      const bx = boss.deathT > 0 ? boss.x + (Math.random() - 0.5) * 4 : boss.x;
      ctx.fillStyle = boss.deathT > 0 ? (boss.deathT % 8 < 4 ? '#fff' : '#7a283b') : boss.stun > 0 ? '#7f8fa6' : boss.phase === 2 ? '#7a283b' : '#5c3c4c';
      ctx.fillRect(bx, boss.y, boss.w, boss.h);
      ctx.fillStyle = boss.hingeBroken ? '#3ee8d8' : '#d4af37';
      ctx.fillRect(bx + 14, boss.y + 2, 28, 5);
      if (boss.hp > 0 && (boss.tele > 0 || boss.active > 0)) {
        ctx.strokeStyle = boss.teleColor; ctx.lineWidth = 3; ctx.strokeRect(bx - 3, boss.y - 3, boss.w + 6, boss.h + 6);
      }
    }

    // Player (with Squash & Stretch anchored at feet)
    const pw = Math.round(P.w * P.sx), ph = Math.round(P.h * P.sy);
    const px = Math.round(P.x + (P.w - pw) / 2), py = Math.round(P.y + P.h - ph);
    ctx.fillStyle = P.iframe > 0 ? '#3ee8d8' : P.hurtCd % 6 > 2 ? '#ff6b6b' : '#6ec29e';
    ctx.fillRect(px, py, pw, ph);
    ctx.fillStyle = '#fff6dc'; ctx.fillRect(Math.round(px + (P.dir > 0 ? pw - 4 : 1)), Math.round(py + 6), 3, 3);
    if (P.atkT > 0) {
      ctx.fillStyle = 'rgba(235,248,255,0.82)';
      if (P.atkDown) ctx.fillRect(P.x - 10, P.y + P.h - 2, P.w + 20, 24);
      else ctx.fillRect(P.dir > 0 ? P.x + P.w : P.x - 34, P.y + 6, 34, P.h - 12);
    }
    if (P.grappleT > 0 && P.grappleTo) {
      ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(P.x + P.w / 2, P.y + 12); ctx.lineTo(P.grappleTo.x, P.grappleTo.y); ctx.stroke();
    }
    // Contextual diegetic stamina arc next to hero ONLY when < 100%
    if (P.stam < P.maxStam - 0.5) {
      const pct = P.stam / P.maxStam;
      ctx.strokeStyle = pct < 0.25 ? '#ff5252' : '#5ce1e6'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(P.x + P.w + 9, P.y + 10, 6, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pct); ctx.stroke();
    }

    // Bullets, Drops & Sparks
    for (const d of drops) {
      ctx.fillStyle = d.tier === 5 ? '#5ce1e6' : '#ffd166';
      ctx.beginPath(); ctx.arc(d.x, d.y, d.tier === 5 ? 6 : 2.5, 0, Math.PI * 2); ctx.fill();
    }
    for (const b of bullets) { ctx.fillStyle = b.col; ctx.beginPath(); ctx.arc(b.x, b.y, b.r || 4, 0, Math.PI * 2); ctx.fill(); }
    for (const s of sparks) { ctx.fillStyle = s.col; ctx.fillRect(s.x, s.y, 2, 2); }
    ctx.restore();

    // === MINIMAL HUD (≤ 4% screen area, auto-fades out of combat) ===
    ctx.save(); ctx.globalAlpha = P.hudAlpha;
    // Mana vessel (top-left circle)
    const mPct = P.mana / P.maxMana;
    ctx.fillStyle = '#0b1420'; ctx.beginPath(); ctx.arc(22, 22, 11, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = P.mana >= GUN_COST ? '#3ee8d8' : '#2c6070';
    ctx.beginPath(); ctx.arc(22, 22, 9 * Math.sqrt(mPct), 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#89b4c9'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(22, 22, 11, 0, Math.PI * 2); ctx.stroke();
    // Vảy (HP pips)
    for (let i = 0; i < P.maxHp; i++) {
      ctx.fillStyle = i < P.hp ? '#e8f6ff' : 'rgba(137,180,201,0.22)';
      ctx.fillRect(38 + i * 10, 14, 7, 9);
    }
    // Flasks (tiny crimson drops under Vảy)
    for (let i = 0; i < P.maxFlasks; i++) {
      ctx.fillStyle = i < P.flasks ? '#e64e66' : 'rgba(230,78,102,0.2)';
      ctx.fillRect(38 + i * 9, 26, 6, 5);
    }
    ctx.restore();

    // Boss thin bottom bar (only during boss fight)
    if (boss && boss.hp > 0) {
      ctx.fillStyle = 'rgba(7,11,18,0.75)'; ctx.fillRect(140, H - 22, 360, 7);
      ctx.fillStyle = boss.phase === 2 ? '#e64e66' : '#c09a62';
      ctx.fillRect(141, H - 21, 358 * (boss.hp / boss.maxHp), 5);
      ctx.font = '9px monospace'; ctx.fillStyle = '#d6e4ec'; ctx.fillText(boss.name, 140, H - 26);
    } else if (boss && boss.hp <= 0) {
      ctx.font = '12px monospace'; ctx.fillStyle = '#3ee8d8';
      ctx.fillText(`B1 HẠ GỤC! Còn ${kpi.bossHpLeft}/${P.maxHp} Vảy · Bấm R đánh lại`, 180, 60);
    }

    // F3 Telemetry overlay (off by default to preserve zero-UI feel)
    if (showTel) {
      const tot = kpi.meleeDmg + kpi.gunDmg;
      const gunShare = tot ? Math.round(kpi.gunDmg / tot * 100) : 0;
      const elapsed = Math.max(1, (tick - kpi.fightStart) / 60);
      const avgFill = kpi.shotsFilled ? (kpi.fillSum / kpi.shotsFilled).toFixed(2) : '-';
      ctx.fillStyle = 'rgba(7,11,18,0.82)'; ctx.fillRect(W - 196, 8, 188, 92);
      ctx.font = '9px monospace'; ctx.fillStyle = '#9cc48a';
      const lines = [
        `Scene: ${sceneId} | Form: ${formId}`,
        `Pos: ${(P.x / T).toFixed(1)}, ${(P.y / T).toFixed(1)} ô`,
        `Gun share: ${gunShare}% (KPI 15-35%)`,
        `Fill 1 shot: ${avgFill}s (KPI 2.5-4s)`,
        `Clashes: ${kpi.clashes} (${(kpi.clashes / (elapsed / 60)).toFixed(1)}/min)`,
        `Hit rate: ${(kpi.hitsLanded / elapsed).toFixed(2)} hit/s`,
        `HUD alpha: ${P.hudAlpha.toFixed(2)} | Tries: ${kpi.bossTries}`,
      ];
      lines.forEach((ln, i) => ctx.fillText(ln, W - 190, 21 + i * 11));
    }
  }

  window.addEventListener('keydown', e => {
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
    keys[e.code] = true;
    if (e.code === 'KeyR') buildScene(sceneId);
    if (e.code === 'F3') { e.preventDefault(); showTel = !showTel; document.getElementById('btn-hud').classList.toggle('active', showTel); }
  });
  window.addEventListener('keyup', e => { keys[e.code] = false; });

  document.querySelectorAll('[data-scene]').forEach(btn => btn.onclick = () => {
    document.querySelectorAll('[data-scene]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); buildScene(btn.dataset.scene);
  });
  document.querySelectorAll('[data-form]').forEach(btn => btn.onclick = () => {
    document.querySelectorAll('[data-form]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); formId = btn.dataset.form; buildScene(sceneId);
  });
  document.getElementById('btn-reset').onclick = () => buildScene(sceneId);
  document.getElementById('btn-hud').onclick = () => { showTel = !showTel; document.getElementById('btn-hud').classList.toggle('active', showTel); };

  // Expose minimal test hook for automated verification
  window.__greybox = { getState: () => ({ sceneId, formId, P, boss, enemies, kpi }), buildScene, setForm: f => { formId = f; buildScene(sceneId); } };

  buildScene('zoo');
  let acc = 0, last = performance.now();
  function loop(now) {
    acc = Math.min(0.1, acc + (now - last) / 1000); last = now;
    while (acc >= DT) {
      acc -= DT; tick++;
      if (hitstop > 0) hitstop--;
      else { stepPlayer(); stepEnemies(); stepBoss(); stepBulletsAndSparks(); }
      for (const k in keys) prevKeys[k] = keys[k];
    }
    draw(); requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
