// Diviso pilot — "the bill moment, time freezes"
import { E, V, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, shake, circle, ring, rr, seg, glow, alpha, shade, linGrad, text } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { cafe, cafeGround, cafeTable, cup } from '../sets/cafe.js';
import { YOU, FAHAD, SAUD, MAJED, WAITER } from '../cast.js';

const LIME = '#C8F169';
const LOGO = new Image(); LOGO.src = '/fonts/icon.png'; await LOGO.decode().catch(() => {});
function brand(g) {
  const w = 330, h = 96, x = E.W / 2 - w / 2, y = E.H - 150;
  g.save(); rr(g, x, y, w, h, 48); g.fillStyle = 'rgba(13,15,12,.82)'; g.fill();
  if (LOGO.complete && LOGO.naturalWidth) { g.save(); rr(g, x + 14, y + 12, 72, 72, 18); g.clip(); g.drawImage(LOGO, x + 14, y + 12, 72, 72); g.restore(); }
  g.fillStyle = '#ffffff'; g.font = '700 50px "Readex"'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.direction = 'ltr'; g.fillText('diviso', x + 104, y + h / 2 + 2); g.restore();
}
// Arabic caption, RTL, centred, glowing
export function ar(g, str, x, y, o = {}) {
  const { size = 74, color = '#fff6e6', a = 1, weight = 700, glowC = 'rgba(0,0,0,.85)' } = o;
  if (a <= 0) return;
  g.save(); g.globalAlpha *= a; g.direction = 'rtl'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `${weight} ${size}px "Readex"`;
  g.lineJoin = 'round'; g.lineWidth = size * 0.16; g.strokeStyle = glowC; g.strokeText(str, x, y);
  g.fillStyle = color; g.fillText(str, x, y); g.restore();
}
const cap = (g, t, dur, str, y = E.H * 0.16, o = {}) => ar(g, str, E.W / 2, y, { a: clamp(Math.min(t / 0.25, (dur - t) / 0.2)), ...o });
const S = () => 1.25;
const pos = () => ({ a: E.W / 2 - 330, b: E.W / 2 - 150, c: E.W / 2 + 150, d: E.W / 2 + 330 });
function chairAt(g, x, GY, s, facing, color = '#24181e') { g.save(); g.translate(x, 0); g.scale(facing, 1); FX.chair(g, -18 * s, GY, s, color); g.restore(); }

// the 4 friends around the café table
function table(g, t, o = {}) {
  const cam = { z: o.z ?? 1, x: o.x ?? 0, y: o.y ?? 0 };
  const { GY, M } = cafe(g, o.freezeT ?? t, cam, { mood: 'golden' });
  const p = pos(), s = S(), rim = { color: M.rim, dir: [0, -1], w: 4 };
  layer(g, cam, 1, (g) => {
    chairAt(g, p.a, GY, s, 1); chairAt(g, p.b, GY, s, 1); chairAt(g, p.c, GY, s, -1); chairAt(g, p.d, GY, s, -1);
    const tb = cafeTable(g, E.W / 2, GY);
    cup(g, E.W / 2 - 70, tb.top, 1.1); cup(g, E.W / 2 + 40, tb.top, 1.1);
    o.onTable?.(g, tb.top);
    const f = (x, facing, outfit, pose, expr, extra = {}) => drawFigure(g, { x, y: GY, s, facing, outfit, pose: breathe(pose, o.freezeT ?? t), expr, rim, shadow: false, ...extra });
    f(p.a, 1, YOU, o.youPose || POSES.sit, o.youExpr || 'happy', o.youX || {});
    f(p.b, 1, FAHAD, o.fahadPose || POSES.sit, o.fahadExpr || 'happy', o.fahadX || {});
    f(p.c, -1, SAUD, o.saudPose || POSES.sit, o.saudExpr || 'happy', o.saudX || {});
    f(p.d, -1, MAJED, o.majedPose || POSES.sit, o.majedExpr || 'happy', o.majedX || {});
    o.extra?.(g, GY, tb.top);
  });
  if (!o.freeze) FX.dust(g, t, { count: 40, color: '#ffe2bd', a: 0.35 });
  return { GY };
}
function bill(g, x, y, s = 1, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  rr(g, -34, -48, 68, 96, 6); g.fillStyle = '#f6f1e6'; g.fill();
  for (let i = 0; i < 6; i++) { g.fillStyle = 'rgba(40,30,30,.45)'; g.fillRect(-24, -34 + i * 12, i === 5 ? 48 : 30 + (i % 2) * 14, 4); }
  g.fillStyle = '#d64a33'; g.fillRect(-24, 30, 48, 6); g.restore();
}

// s01 — "تعرف هاللحظة؟" wide, everyone laughing
registerShot('s01', { draw(g, t, info) {
  const laugh = { ...POSES.sitBack };
  table(g, t, { z: 1.32 + 0.08 * ease.inOut(t / info.dur), y: -30, youExpr: 'joy', fahadExpr: 'joy', saudExpr: 'happy', majedExpr: 'joy', saudPose: laugh });
  cap(g, t, info.dur, 'تعرف هاللحظة؟');
brand(g); } });

// s02 — "الطلعة خلصت.. والفاتورة وصلت." waiter drops the bill, faces drop
registerShot('s02', { draw(g, t, info) {
  const drop = 1.1, wx = lerp(E.W + 200, E.W / 2 + 60, ease.out(prog(t, 0, 0.9)));
  const after = t > drop + 0.2;
  table(g, t, { z: 1.42, y: -20,
    youExpr: after ? 'worried' : 'happy', fahadExpr: after ? 'nervous' : 'happy', saudExpr: after ? 'scared' : 'happy', majedExpr: after ? 'nervous' : 'happy',
    onTable: (g, top) => { if (t > drop) bill(g, E.W / 2 + 10, top - 6, 0.9, -0.15); },
    extra: (g, GY, top) => {
      const hold = { ...POSES.holdFront };
      drawFigure(g, { x: wx, y: GY, s: S() * 1.05, facing: -1, outfit: WAITER, pose: posesAt(t, [[0, POSES.stand], [0.9, hold], [drop + 0.3, POSES.stand]]), expr: 'smile', rim: { color: mood('golden').rim, dir: [0, -1] } });
      if (t < drop) bill(g, wx - 60, GY - 230 * S() + Math.sin(t * 6) * 4, 0.9, 0.1);
      if (t > drop && t < drop + 0.6) FX.rings(g, E.W / 2 + 10, top - 20, t - drop, { count: 2, r0: 20, r1: 160, speed: 2.2, color: '#fff3e0', a: 0.6 });
    } });
  cap(g, t, info.dur, 'والفاتورة وصلت…');
brand(g); } });

// s03 — "فجأة.. الوقت وقف." FREEZE: blue tint, bill floating, rings
registerShot('s03', { draw(g, t, info) {
  const cam = { z: 1.0 + 0.05 * t, r: -0.02 + 0.01 * t };
  table(g, 0, { freeze: true, freezeT: 0, z: 1.4, y: -20, youExpr: 'shocked', fahadExpr: 'nervous', saudExpr: 'scared', majedExpr: 'nervous', onTable: () => {} });
  g.save(); g.globalCompositeOperation = 'soft-light'; g.fillStyle = 'rgba(80,120,255,.55)'; g.fillRect(0, 0, E.W, E.H); g.restore();
  veil(g, '#0a1030', 0.25);
  const bx = E.W / 2, by = E.H * 0.45 + Math.sin(t * 2) * 10;
  FX.drops(g, t, { count: 40, color: '#d8e4ff', rMax: 8, drift: 2 });
  FX.rings(g, bx, by, t, { count: 3, r0: 100, r1: 520, speed: 0.4, color: '#e8f0ff', a: 0.4 });
  glow(g, bx, by, 260, '#ffffff', 0.25);
  bill(g, bx, by, V(3.2, 3.2), -0.1 + 0.03 * Math.sin(t));
  UI.badge(g, { str: '⏸', x: E.W - 90, y: 230, size: 80, a: ease.out(prog(t, 0.1, 0.5)) });
  cap(g, t, info.dur, 'فجأة… الوقت وقف', E.H * 0.16, { color: '#dfe8ff' });
brand(g); } });

// helper for the frozen giant-face shots
function frozenFace(g, t, info, outfit, expr, line, sub, propFn) {
  blurLayer(g, 14, (g) => cafe(g, 0, { z: 1.6, x: 0, y: -160 }, { mood: 'golden' }));
  g.save(); g.globalCompositeOperation = 'soft-light'; g.fillStyle = 'rgba(80,120,255,.5)'; g.fillRect(0, 0, E.W, E.H); g.restore();
  veil(g, '#0a1030', 0.3);
  const r = V(300, 330) * (1 + 0.04 * t), cx = E.W / 2, cy = E.H * 0.55;
  bigFace(g, cx, cy, r, { outfit, expr, rimColor: '#bcd0ff', rimSide: -1, blink: false });
  propFn?.(g, cx, cy, r, t);
  FX.drops(g, t, { count: 25, color: '#d8e4ff', rMax: 7, drift: 2 });
  cap(g, t, info.dur, line, E.H * 0.14, { color: '#dfe8ff' });
  if (sub) ar(g, sub, E.W / 2, E.H * 0.86, { size: 64, color: LIME, a: ease.out(prog(t, 0.4, 0.8)) });
}
function phone(g, x, y, s, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); rr(g, -26, -50, 52, 100, 10); g.fillStyle = '#16141c'; g.fill(); rr(g, -21, -42, 42, 80, 6); g.fillStyle = '#7fb0ff'; g.fill(); g.restore(); }

// s04 — Fahad: "صار عنده مكالمة مهمة"
registerShot('s04', { draw(g, t, info) {
  frozenFace(g, t, info, FAHAD, 'nervous', 'فهد…', 'مكالمة مهمة 📞', (g, cx, cy, r) => { phone(g, cx + r * 0.95, cy + r * 0.05, 2.4, 0.25); seg(g, [[cx + r * 1.05, cy + r * 0.55], [cx + r * 0.6, cy + r * 1.3]], 60, '#0e0b12'); });
brand(g); } });
// s05 — Saud: wallet in the car
registerShot('s05', { draw(g, t, info) {
  frozenFace(g, t, info, SAUD, 'worried', 'سعود…', 'محفظتي بالسيارة! 🚗', (g, cx, cy, r, t) => { UI.bubble(g, cx + r * 0.9, cy - r * 1.05, { w: 180, h: 110 }); });
brand(g); } });
// s06 — Majed studying the menu
registerShot('s06', { draw(g, t, info) {
  frozenFace(g, t, info, MAJED, 'thinking', 'وماجد…', 'يدرس المنيو 📖', (g, cx, cy, r) => {
    g.save(); g.translate(cx, cy + r * 0.75); g.rotate(-0.05); rr(g, -r * 0.75, -r * 0.35, r * 1.5, r * 0.7, 14); g.fillStyle = '#5a2b22'; g.fill();
    rr(g, -r * 0.68, -r * 0.29, r * 1.36, r * 0.58, 10); g.fillStyle = '#f2e6cf'; g.fill();
    for (let i = 0; i < 5; i++) { g.fillStyle = 'rgba(60,40,30,.5)'; g.fillRect(-r * 0.55, -r * 0.2 + i * r * 0.1, r * (0.5 + (i % 2) * 0.3), 6); }
    ar(g, 'المنيو', 0, -r * 0.42, { size: 44, color: '#f2e6cf' }); g.restore();
  });
brand(g); } });
// s07 — You, as usual, take out the card
registerShot('s07', { draw(g, t, info) {
  frozenFace(g, t, info, YOU, 'confused', 'وأنت؟ كالعادة…', 'طلّعت البطاقة 💳', (g, cx, cy, r, t) => {
    const y = cy + r * 1.0 - 60 * ease.out(prog(t, 0.3, 1.0));
    g.save(); g.translate(cx - r * 0.2, y); g.rotate(-0.15); rr(g, -150, -95, 300, 190, 18); g.fillStyle = '#2b3a8a'; g.fill(); g.fillStyle = '#e8c35a'; g.fillRect(-110, -40, 60, 44); g.fillStyle = 'rgba(255,255,255,.6)'; g.fillRect(-110, 40, 200, 12); g.restore();
    seg(g, [[cx - r * 0.1, cy + r * 1.4], [cx - r * 0.2, y + 60]], 70, '#0e0b12');
  });
brand(g); } });

// s08 — "خلاص.. هالمرة الحساب على ديفيزو." phone with the split
registerShot('s08', { draw(g, t, info) {
  UI.blueprint(g, { grid: 60, a: 0.06 });
  const cx = E.W / 2, cy = E.H * 0.53, s = 1 + 0.03 * t, pw = 560, ph = 1060;
  g.save(); g.translate(cx, cy); g.scale(s, s);
  glow(g, 0, 0, 700, LIME, 0.12);
  rr(g, -pw / 2, -ph / 2, pw, ph, 60); g.fillStyle = '#0d0f0c'; g.fill(); g.lineWidth = 6; g.strokeStyle = alpha(LIME, 0.7); g.stroke();
  rr(g, -pw / 2 + 22, -ph / 2 + 22, pw - 44, ph - 44, 44); g.fillStyle = '#151a13'; g.fill();
  ar(g, 'طلعة الشلة 🍽️', 0, -ph / 2 + 110, { size: 50, color: '#ffffff' });
  ar(g, 'الفاتورة ٤٨٠ ريال', 0, -ph / 2 + 190, { size: 40, color: alpha('#ffffff', 0.7), weight: 400 });
  const rows = [['أنت', YOU.color], ['فهد', '#f2efe8'], ['سعود', '#3a6ea5'], ['ماجد', '#d64a33']];
  rows.forEach(([n, c], i) => {
    const p = ease.outBack(prog(t, 0.3 + i * 0.25, 0.8 + i * 0.25)); if (p <= 0) return;
    const y = -ph / 2 + 330 + i * 150;
    g.save(); g.globalAlpha *= clamp(p); g.translate((1 - p) * 120, 0);
    rr(g, -pw / 2 + 50, y - 55, pw - 100, 110, 26); g.fillStyle = '#1f261c'; g.fill();
    circle(g, pw / 2 - 110, y, 34, c); ar(g, n, pw / 2 - 210, y, { size: 44, color: '#fff' });
    ar(g, '١٢٠ ريال', -pw / 2 + 170, y, { size: 44, color: LIME }); g.restore();
  });
  const ok = ease.out(prog(t, 1.6, 2.1));
  if (ok > 0) { rr(g, -pw / 2 + 50, ph / 2 - 200, pw - 100, 110, 55); g.fillStyle = alpha(LIME, ok); g.fill(); ar(g, 'كل واحد يعرف اللي عليه ✓', 0, ph / 2 - 145, { size: 38, color: '#0d0f0c', a: ok }); }
  g.restore();
  cap(g, t, info.dur, 'هالمرة الحساب على ديفيزو', E.H * 0.08, { color: LIME, size: 68 });
brand(g); } });

// s09 — CTA: friends cheer, end text
registerShot('s09', { draw(g, t, info) {
  table(g, t, { z: 1.3, y: -60, youPose: POSES.cheer, fahadPose: POSES.cheer, saudPose: POSES.wave, majedPose: POSES.cheer, youExpr: 'joy', fahadExpr: 'joy', saudExpr: 'joy', majedExpr: 'joy',
    youX: { prop: 'phone' } });
  veil(g, '#0d0b10', 0.25 * ease.out(prog(t, 1.2, 2)));
  const a = ease.out(prog(t, 0.2, 0.7));
  rr(g, 60, E.H * 0.07, E.W - 120, E.H * 0.25, 40); g.fillStyle = alpha('#0d0f0c', 0.72 * a); g.fill();
  ar(g, 'سوّ مجموعة في ديفيزو', E.W / 2, E.H * 0.13, { size: 76, color: LIME, a });
  ar(g, 'وارمِ الرابط بالقروب', E.W / 2, E.H * 0.2, { size: 64, a: ease.out(prog(t, 0.9, 1.3)) });
  ar(g, 'وكل واحد يعرف اللي عليه 👌', E.W / 2, E.H * 0.27, { size: 54, a: ease.out(prog(t, 1.8, 2.2)), weight: 600 });
  const b = ease.out(prog(t, 2.6, 3.1));
  if (b > 0) { rr(g, E.W / 2 - 260, E.H * 0.84, 520, 110, 55); g.fillStyle = alpha('#0d0f0c', 0.85 * b); g.fill(); g.lineWidth = 4; g.strokeStyle = alpha(LIME, b); g.stroke(); ar(g, 'متوفر على App Store', E.W / 2, E.H * 0.84 + 55, { size: 46, a: b }); }
brand(g); } });
