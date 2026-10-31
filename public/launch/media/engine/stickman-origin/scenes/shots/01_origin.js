// "القصة الحقيقية" — Diviso founder story (Adel's voice), ~61s 9:16
import { E, V, registerShot, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, rr, seg, glow, alpha, linGrad, backdrop } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { LIME, brand, ar, cap, tag, fireCircle, portrait, phoneFrame, chat, fadeA, POSES, drawFigure, desert, campfire, tent, YOU, FAHAD, SAUD, MAJED } from './_lib.js';
import { FOUNDER } from '../cast.js';

const LOGO = new Image(); LOGO.src = '/fonts/icon.png'; await LOGO.decode().catch(() => {});
const KID = { top: 'tshirt', color: '#e8a33a', head: 'none', kid: true };
const KID2 = { top: 'dress', color: '#c45a8a', head: 'ponytail', headColor: '#2a1c18', kid: true };
const blurNight = (g, t) => { blurLayer(g, 16, (g) => fireCircle(g, t, { z: 1.5 })); veil(g, '#07081a', 0.4); };

// night room with a desk + laptop (Excel)
function room(g, t, o = {}) {
  backdrop(g, ['#0d1020', '#151a30', '#1c2038']);
  const Z = o.z ?? 1.45; g.save(); g.translate(E.W / 2, E.H * 0.62); g.scale(Z, Z); g.translate(-E.W / 2, -E.H * 0.62);
  const GY = E.H * V(0.8, 0.72);
  FX.windowFrame(g, { x: E.W / 2 + 120, y: E.H * 0.33, w: 300, h: 300, cols: 2, rows: 2, frame: '#0b0d18', bar: 10 }, (g, x, y, w, h) => { g.fillStyle = linGrad(g, 0, y, 0, y + h, ['#0a0e28', '#1d2550']); g.fillRect(x, y, w, h); FX.stars(g, t, { count: 40, seed: 3, area: [x, y, w, h] }); FX.moon(g, x + w * 0.7, y + h * 0.3, 22); });
  if (o.clock !== false) { circle(g, E.W / 2 - 300, E.H * 0.37, 70, '#e8e4da'); g.save(); g.translate(E.W / 2 - 300, E.H * 0.37); g.rotate(Math.PI * 2 * (2 / 12)); seg(g, [[0, 0], [0, -38]], 8, '#111'); g.restore(); g.save(); g.translate(E.W / 2 - 300, E.H * 0.37); g.rotate(t * 0.8); seg(g, [[0, 0], [0, -55]], 5, '#111'); g.restore(); }
  g.fillStyle = '#2a2230'; g.fillRect(-E.W, GY, E.W * 3, E.H);
  rr(g, E.W / 2 - 320, GY - 230, 640, 26, 8); g.fillStyle = '#5a4434'; g.fill();
  seg(g, [[E.W / 2 - 290, GY - 210], [E.W / 2 - 290, GY]], 14, '#3e2e24'); seg(g, [[E.W / 2 + 290, GY - 210], [E.W / 2 + 290, GY]], 14, '#3e2e24');
  // laptop
  const lx = E.W / 2 + 60, ly = GY - 230;
  g.save(); g.translate(lx, ly); rr(g, -150, -190, 300, 190, 12); g.fillStyle = '#1b1d24'; g.fill(); rr(g, -138, -178, 276, 166, 6); g.fillStyle = '#eef3ea'; g.fill();
  for (let r = 0; r < 9; r++) for (let c = 0; c < 5; c++) { g.strokeStyle = '#b9c7b5'; g.lineWidth = 1; g.strokeRect(-130 + c * 53, -170 + r * 17 + ((t * 30) % 17) * (o.scroll ? 1 : 0), 53, 17); }
  g.fillStyle = '#1f7a3a'; g.fillRect(-138, -178, 276, 14);
  if (o.hl != null) { g.fillStyle = 'rgba(255,214,90,.55)'; g.fillRect(-130, -170 + (Math.floor(t * 2) % 9) * 17, 265, 17); }
  rr(g, -170, 0, 340, 16, 6); g.fillStyle = '#2a2d36'; g.fill(); g.restore();
  glow(g, lx, ly - 90, 420, '#bfe3ff', 0.18);
  drawFigure(g, { x: E.W / 2 - 150, y: GY, s: 1.45, facing: 1, outfit: FOUNDER, pose: o.pose || POSES.sit, expr: o.expr || 'thinking', rim: { color: '#bfe3ff', dir: [1, -0.3], w: 4 } });
  g.restore();
  return { GY };
}
function excelBig(g, t, o = {}) {
  phoneFrame(g, t, (g, w, h) => {
    g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h); g.fillStyle = '#1f7a3a'; g.fillRect(0, 0, w, 150);
    ar(g, 'حسابات_المخيم_نهائي_٧.xlsx', w / 2, 95, { size: 34, color: '#ffffff', glowC: 'transparent' });
    const off = (t * 120) % 60;
    for (let r = 0; r < 26; r++) for (let c = 0; c < 5; c++) { g.strokeStyle = '#cfd8cc'; g.lineWidth = 1.5; g.strokeRect(20 + c * ((w - 40) / 5), 170 + r * 60 - off, (w - 40) / 5, 60); if ((r * 7 + c * 3) % 4 === 0) { g.fillStyle = 'rgba(60,70,60,.55)'; g.fillRect(34 + c * ((w - 40) / 5), 192 + r * 60 - off, 60 + ((r + c) % 3) * 20, 14); } }
    if (o.red) for (let i = 0; i < 4; i++) { const y = 300 + i * 260 - off; rr(g, 30, y, w - 60, 56, 8); g.strokeStyle = '#e0332a'; g.lineWidth = 5; g.stroke(); }
  }, { glow: '#7fd09a', rot: o.rot ?? -0.04 });
}

// s01 — أنا كنت ماسك الحسابات (hook)
registerShot('s01', { draw(g, t, info) {
  room(g, t, { expr: 'thinking', hl: true });
  cap(g, t, info.dur, 'أنا كنت ماسك الحسابات 🧾', E.H * 0.12, { size: 76 });
  brand(g);
} });
// s02 — عندنا مخيم.. ونظام القطّة
registerShot('s02', { draw(g, t, info) {
  fireCircle(g, t, { z: 1.2 + 0.08 * t / info.dur, youExpr: 'joy', fahadExpr: 'joy', majedExpr: 'happy' });
  cap(g, t, info.dur, 'عندنا مخيم… ونظام قطّة 🏕️', E.H * 0.13);
  brand(g);
} });
// s03 — وكل مرة نفس القصة
registerShot('s03', { draw(g, t, info) {
  fireCircle(g, t, { z: 1.45, fire: 0.6, youExpr: 'neutral', fahadExpr: 'neutral', saudExpr: 'neutral', majedExpr: 'neutral' });
  veil(g, '#000', 0.45);
  ar(g, 'وكل مرة… نفس القصة 😮‍💨', E.W / 2, E.H * 0.42, { size: 84, a: fadeA(t, info.dur) });
  brand(g);
} });
// s04 — ملف إكسل طويل + قروبين
registerShot('s04', { draw(g, t, info) {
  backdrop(g, ['#0b1220', '#132018']);
  excelBig(g, t, { rot: -0.05 });
  const b = (str, x, y, at) => { const p = ease.outBack(prog(t, at, at + 0.3)); if (p <= 0) return; g.save(); g.translate(x, y); g.scale(p, p); g.rotate(x < E.W / 2 ? -0.08 : 0.08); rr(g, -230, -70, 460, 140, 34); g.fillStyle = '#1f3a2a'; g.fill(); g.lineWidth = 4; g.strokeStyle = '#7fd09a'; g.stroke(); ar(g, str, 0, 2, { size: 44, glowC: 'transparent' }); g.restore(); };
  b('💬 قروب السوالف', E.W * 0.3, E.H * 0.7, 1.4); b('🧮 قروب الحساب', E.W * 0.7, E.H * 0.78, 2.3);
  cap(g, t, info.dur, 'ملف إكسل طويل… وقروبين 😵', E.H * 0.07, { size: 64 });
  brand(g);
} });
// s05 — كم علي؟ حوّلت؟ مين باقي ما دفع؟
registerShot('s05', { draw(g, t, info) {
  backdrop(g, ['#0b1220', '#132018']);
  chat(g, t, [{ at: 0.05, text: 'كم علي؟ 🤔', name: 'فهد', nameColor: '#e8e2d6', size: 46 }, { at: 0.8, text: 'حوّلت؟ 💸', name: 'سعود', nameColor: '#7fb0ff', size: 46 }, { at: 1.6, text: 'مين باقي ما دفع؟ 😤', name: 'ماجد', nameColor: '#ff8a7a', size: 46 }, { at: 2.3, text: 'لحظة أراجع الإكسل…', me: true }], { title: 'قروب الحساب 🧮' });
  brand(g);
} });
// s06 — وأنا بالليل.. أطابق الأرقام سطر سطر
registerShot('s06', { draw(g, t, info) {
  room(g, t, { expr: t > 1.8 ? 'sleepy' : 'thinking', hl: true });
  cap(g, t, info.dur, 'بالليل… أطابق سطر سطر 🌙', E.H * 0.12);
  ar(g, '٢:٠٠ ص', E.W / 2 - 300, E.H * 0.26 + 120, { size: 40, color: '#e8e4da' });
  brand(g);
} });
// s07 — وبالسفر كان عندنا تطبيق نعتمد عليه.. أنا وأصحابي وعوائلنا
registerShot('s07', { draw(g, t, info) {
  const cam = { z: 1.35, y: -40 };
  const { GY } = desert(g, t, cam, { night: false });
  layer(g, cam, 0.3, (g) => { const px = lerp(-200, E.W + 200, (t / info.dur)); g.save(); g.translate(px, E.H * 0.2); ar(g, '✈️', 0, 0, { size: 110, glowC: 'transparent' }); g.restore(); });
  layer(g, cam, 1, (g) => {
    const s = 1.3, rim = { color: '#ffd59a', dir: [-1, -0.4], w: 4 };
    const f = (x, of, p, ex, prop) => drawFigure(g, { x: E.W / 2 + x, y: GY + 40, s, facing: x < 0 ? 1 : -1, outfit: of, pose: p, expr: ex, rim, prop });
    f(-330, FOUNDER, POSES.phone, 'happy', 'phone'); f(-160, FAHAD, POSES.wave, 'joy'); f(-40, KID, POSES.cheer, 'joy'); f(120, KID2, POSES.wave, 'joy'); f(230, SAUD, POSES.stand, 'happy'); f(350, MAJED, POSES.wave, 'joy');
    rr(g, E.W / 2 - 520, GY - 70, 90, 110, 14); g.fillStyle = '#c45a3a'; g.fill(); seg(g, [[E.W / 2 - 495, GY - 70], [E.W / 2 - 495, GY - 110], [E.W / 2 - 455, GY - 110], [E.W / 2 - 455, GY - 70]], 6, '#3a2a22');
  });
  cap(g, t, info.dur, 'وبالسفر… تطبيق نعتمد عليه ✈️', E.H * 0.12, { size: 66 });
  ar(g, 'أنا وأصحابي وعوائلنا 👨‍👩‍👧', E.W / 2, E.H * 0.2, { size: 52, a: ease.out(prog(t, 2.2, 2.6)), weight: 600 });
  brand(g);
} });
// s08 — وفي يوم.. فتحناه.. ولقيناه قفل
registerShot('s08', { draw(g, t, info) {
  backdrop(g, ['#07090f', '#10131c']);
  const shut = t > 2.3, sh = shut ? Math.max(0, 1 - (t - 2.3) * 3) : 0;
  g.save(); g.translate(Math.sin(t * 90) * 14 * sh, 0);
  phoneFrame(g, t, (g, w, h) => {
    g.fillStyle = '#121418'; g.fillRect(0, 0, w, h);
    const p = ease.out(prog(t, 0.6, 1.2));
    rr(g, w / 2 - 110, h * 0.3 - 110, 220, 220, 50); g.fillStyle = shut ? '#3a3d44' : '#4a8fd6'; g.fill(); ar(g, '✈️', w / 2, h * 0.3 + 6, { size: 110, glowC: 'transparent', a: shut ? 0.35 : 1 });
    ar(g, 'تطبيق السفر', w / 2, h * 0.3 + 170, { size: 40, color: '#cfd3dc', glowC: 'transparent', a: p });
    if (shut) { const q = ease.outBack(prog(t, 2.3, 2.7)); g.save(); g.translate(w / 2, h * 0.62); g.scale(q, q); rr(g, -300, -150, 600, 300, 40); g.fillStyle = '#23262e'; g.fill(); ar(g, '🔒', 0, -70, { size: 80, glowC: 'transparent' }); ar(g, 'هذا التطبيق لم يعد متاحاً', 0, 40, { size: 40, color: '#ffffff', glowC: 'transparent' }); g.restore(); }
  }, { glow: shut ? '#e0332a' : '#4a8fd6' });
  g.restore();
  cap(g, t, info.dur, shut ? 'ولقيناه… قفل 🔒' : 'وفي يوم… فتحناه', E.H * 0.07, { size: 70, color: shut ? '#ff8a7a' : '#fff6e6' });
  brand(g);
} });
// s09 — رجعنا للإكسل.. ورجع الصداع
registerShot('s09', { draw(g, t, info) {
  room(g, t, { expr: 'confused', pose: POSES.facepalm, hl: true, clock: false });
  cap(g, t, info.dur, 'رجعنا للإكسل… ورجع الصداع 🤕', E.H * 0.12, { size: 66 });
  brand(g);
} });
// s10 — وقتها كنت أدوّر على مشروع ينفع الناس
registerShot('s10', { draw(g, t, info) {
  const cam = { z: 1.5, y: -60, x: -40 + 20 * t };
  const { GY } = desert(g, t, cam, { night: true });
  layer(g, cam, 1, (g) => drawFigure(g, { x: E.W / 2, y: GY + 40, s: 1.5, facing: 1, outfit: FOUNDER, pose: POSES.think, expr: 'thinking', rim: { color: '#a9b8ff', dir: [1, -0.5], w: 4 } }));
  cap(g, t, info.dur, 'كنت أدوّر على مشروع… ينفع الناس 🤍', E.H * 0.13, { size: 62 });
  brand(g);
} });
// s11 — القطّة في كل مكان: المخيم، السفر، السكن، الدوام
registerShot('s11', { draw(g, t, info) {
  backdrop(g, ['#0b0f1a', '#14202a']);
  const cells = [['🏕️', 'المخيم', 1.5], ['✈️', 'السفر', 2.3], ['🏠', 'السكن', 2.74], ['💼', 'الدوام', 3.36]];
  cells.forEach(([e, n, at], i) => { const p = ease.outBack(prog(t, at, at + 0.3)); if (p <= 0) return; const x = E.W / 2 + (i % 2 ? -230 : 230), y = E.H * 0.38 + Math.floor(i / 2) * 470; g.save(); g.translate(x, y); g.scale(p, p); rr(g, -200, -200, 400, 400, 50); g.fillStyle = '#1b2a22'; g.fill(); g.lineWidth = 5; g.strokeStyle = alpha(LIME, 0.7); g.stroke(); ar(g, e, 0, -40, { size: 130, glowC: 'transparent' }); ar(g, n, 0, 120, { size: 56, color: LIME, glowC: 'transparent' }); g.restore(); });
  cap(g, t, info.dur, 'وانتبهت: القطّة في كل مكان 👀', E.H * 0.1, { size: 64 });
  brand(g);
} });
// s12 — فقلت: خلني أسوي التطبيق اللي نحتاجه.. بنفسي
registerShot('s12', { draw(g, t, info) {
  blurLayer(g, 16, (g) => room(g, t, { clock: false }));
  veil(g, '#07081a', 0.45);
  const { cx, cy, r } = portrait(g, t, FOUNDER, t > 1.2 ? 'determined' : 'thinking', { rim: '#ffe28a' });
  const on = ease.out(prog(t, 1.2, 1.6));
  glow(g, cx + r * 0.9, cy - r * 1.15, 260 * (0.3 + on), '#ffe28a', 0.25 + 0.5 * on);
  ar(g, '💡', cx + r * 0.9, cy - r * 1.15, { size: 150, glowC: 'transparent', a: 0.4 + 0.6 * on });
  cap(g, t, info.dur, 'خلني أسويه… بنفسي 💪', E.H * 0.1, { size: 70 });
  brand(g);
} });
// s13 — وسويت ديفيزو (logo reveal)
registerShot('s13', { draw(g, t, info) {
  backdrop(g, ['#07090f', '#0f1a12']);
  const p = ease.outBack(prog(t, 0.6, 1.2)), s = 420 * p;
  glow(g, E.W / 2, E.H * 0.45, 700, LIME, 0.25 * p);
  if (s > 0 && LOGO.naturalWidth) { g.save(); rr(g, E.W / 2 - s / 2, E.H * 0.45 - s / 2, s, s, s * 0.22); g.clip(); g.drawImage(LOGO, E.W / 2 - s / 2, E.H * 0.45 - s / 2, s, s); g.restore(); }
  ar(g, 'وسويت ديفيزو', E.W / 2, E.H * 0.68, { size: 96, color: LIME, a: ease.out(prog(t, 1.0, 1.4)) });
  brand(g);
} });
// Diviso-style app screen (same look as the kashta film)
function appScreen(g, t, title, rows) {
  phoneFrame(g, t, (g, w, h) => {
    g.fillStyle = '#f4f6f1'; g.fillRect(0, 0, w, h); g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, 200);
    ar(g, title, w - 50, 130, { size: 48, align: 'right', color: '#121512', glowC: 'transparent' });
    rows.forEach((r, i) => {
      const p = ease.out(prog(t, r.at, r.at + 0.3)); if (p <= 0) return; const y = 250 + i * 170;
      g.save(); g.globalAlpha *= p; g.translate((1 - p) * 80, 0);
      rr(g, 36, y, w - 72, 140, 30); g.fillStyle = '#ffffff'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#e3e7df'; g.stroke();
      circle(g, w - 110, y + 70, 42, '#eef5df'); ar(g, r.icon, w - 110, y + 72, { size: 40, glowC: 'transparent' });
      ar(g, r.a, w - 175, y + 50, { size: 38, align: 'right', color: '#121512', glowC: 'transparent' });
      if (r.b) ar(g, r.b, w - 175, y + 98, { size: 26, align: 'right', color: '#6b7466', glowC: 'transparent', weight: 400 });
      if (r.right) ar(g, r.right, 90, y + 70, { size: 40, align: 'left', color: r.rightColor || '#121512', glowC: 'transparent' });
      g.restore();
    });
  }, { glow: LIME });
}
// s14 — مجموعة وحدة.. رابطها بالقروب.. وكل واحد يسجّل اللي دفعه
registerShot('s14', { draw(g, t, info) {
  UI.blueprint(g, { grid: 60, a: 0.05 });
  appScreen(g, t, 'مخيم الشباب 🏕️', [
    { at: 0.4, icon: '🔗', a: 'رابط المجموعة', b: 'انرسل بالقروب ✓' },
    { at: 1.8, icon: '🍖', a: 'عشاء', b: 'دفعه فهد', right: '٤٨٠' },
    { at: 2.5, icon: '⛽', a: 'بنزين', b: 'دفعه سعود', right: '٢٠٠' },
    { at: 3.2, icon: '🪵', a: 'حطب وفحم', b: 'دفعها ماجد', right: '١٢٠' },
  ]);
  cap(g, t, info.dur, 'مجموعة وحدة… وكل واحد يسجّل ✍️', E.H * 0.06, { size: 60 });
  brand(g);
} });
// s15 — والحساب يطلع لحاله: مين له ومين عليه
registerShot('s15', { draw(g, t, info) {
  UI.blueprint(g, { grid: 60, a: 0.05 });
  appScreen(g, t, 'الأرصدة ✅', [
    { at: 0.5, icon: '⚪', a: 'فهد', b: 'له', right: '+ ٢٨٠', rightColor: '#2f7a1c' },
    { at: 0.9, icon: '🔵', a: 'سعود', b: 'خالص', right: '✓ ٠', rightColor: '#2f7a1c' },
    { at: 1.3, icon: '🔴', a: 'ماجد', b: 'عليه', right: '− ٨٠', rightColor: '#c0392b' },
    { at: 1.7, icon: '🟢', a: 'أنت', b: 'عليك', right: '− ٢٠٠', rightColor: '#c0392b' },
  ]);
  cap(g, t, info.dur, 'والحساب يطلع لحاله ⚡', E.H * 0.06, { size: 62, color: LIME });
  brand(g);
} });
// s16 — اليوم.. المخيم عليه، وسفراتنا عليه.. وأنا؟ ارتحت من الإكسل
registerShot('s16', { draw(g, t, info) {
  fireCircle(g, t, { z: 1.2, youPose: POSES.cheer, fahadPose: POSES.cheer, majedPose: POSES.cheer, youExpr: 'joy', fahadExpr: 'joy', saudExpr: 'joy', majedExpr: 'joy' });
  const p = ease.outBack(prog(t, 3.2, 3.6));
  if (p > 0) { g.save(); g.translate(E.W / 2, E.H * 0.33); g.scale(p, p); rr(g, -110, -110, 220, 220, 40); g.fillStyle = '#1f7a3a'; g.fill(); ar(g, 'X', 0, 6, { size: 120, color: '#ffffff', glowC: 'transparent' }); seg(g, [[-130, 130], [130, -130]], 26, '#e0332a'); g.restore(); }
  cap(g, t, info.dur, t < 3 ? 'اليوم… المخيم والسفرات عليه 🏕️✈️' : 'وأنا؟ ارتحت من الإكسل 😌', E.H * 0.13, { size: 62 });
  brand(g);
} });
// s17 — ديفيزو.. انولد من قطّة حقيقية.. عشان قطّتكم
registerShot('s17', { draw(g, t, info) {
  backdrop(g, ['#07090f', '#0f1a12']);
  glow(g, E.W / 2, E.H * 0.45, 800, LIME, 0.14);
  ar(g, 'ديفيزو', E.W / 2, E.H * 0.33, { size: 130, color: LIME, a: ease.out(prog(t, 0.1, 0.5)) });
  ar(g, 'انولد من قطّة حقيقية…', E.W / 2, E.H * 0.45, { size: 72, a: ease.out(prog(t, 0.8, 1.2)) });
  ar(g, 'عشان قطّتكم 💚', E.W / 2, E.H * 0.54, { size: 84, a: ease.out(prog(t, 2.3, 2.7)) });
  brand(g);
} });
// s18 — CTA
registerShot('s18', { draw(g, t, info) {
  fireCircle(g, t, { z: 1.3, youExpr: 'joy', fahadExpr: 'joy', saudExpr: 'joy', majedExpr: 'joy' });
  const a = ease.out(prog(t, 0.1, 0.5));
  rr(g, 60, E.H * 0.07, E.W - 120, E.H * 0.2, 40); g.fillStyle = alpha('#0d0f0c', 0.8 * a); g.fill();
  ar(g, 'سوّوا مجموعتكم', E.W / 2, E.H * 0.13, { size: 84, color: LIME, a });
  ar(g, 'وارموا الرابط بالقروب 👇', E.W / 2, E.H * 0.21, { size: 62, a: ease.out(prog(t, 0.6, 1.0)) });
  const b = ease.out(prog(t, 1.2, 1.6));
  if (b > 0) { rr(g, E.W / 2 - 260, E.H * 0.31, 520, 110, 55); g.fillStyle = alpha('#0d0f0c', 0.85 * b); g.fill(); g.lineWidth = 4; g.strokeStyle = alpha(LIME, b); g.stroke(); ar(g, 'متوفر على App Store', E.W / 2, E.H * 0.31 + 55, { size: 46, a: b }); }
  brand(g);
} });
