// "كشتة الشلة" — Diviso stickman film, episode 0 (~87s, 9:16)
import { E, V, registerShot, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, rr, seg, glow, alpha, linGrad } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { cafe, cafeTable, cup } from '../sets/cafe.js';
import { LIME, brand, ar, cap, tag, fireCircle, portrait, phoneFrame, chat, fadeA, POSES, drawFigure, desert, campfire, tent, car, YOU, FAHAD, SAUD, MAJED } from './_lib.js';

const day = (g, t, cam) => desert(g, t, cam, { night: false });
const blurNight = (g, t) => { blurLayer(g, 16, (g) => fireCircle(g, t, { z: 1.5 })); veil(g, '#07081a', 0.35); };

// s01 — هذي قصة أربعة أصحاب
registerShot('s01', { draw(g, t, info) {
  fireCircle(g, t, { z: 1.15 + 0.12 * ease.inOut(t / info.dur), youExpr: 'joy', majedExpr: 'joy' });
  cap(g, t, info.dur, 'هذي قصة أربعة أصحاب…', E.H * 0.14);
  brand(g);
} });

// s02 — فهد.. سعود.. ماجد.. وأنت  (4 quick portraits)
registerShot('s02', { draw(g, t, info) {
  const seq = [[FAHAD, 'فهد', 'smile'], [SAUD, 'سعود', 'happy'], [MAJED, 'ماجد', 'smirk'], [YOU, 'وأنت 👈', 'joy']];
  const i = Math.min(3, Math.floor(t / (info.dur / 4))), lt = t - i * info.dur / 4;
  blurNight(g, t);
  const [o, n, ex] = seq[i];
  portrait(g, lt, o, ex, { rim: '#ffa65a' });
  ar(g, n, E.W / 2, E.H * 0.18, { size: 110, color: i === 3 ? LIME : '#fff6e6', a: ease.out(prog(lt, 0, 0.2)) });
  brand(g);
} });

// s03 — عشرين سنة صحبة… إلين جات الكشتة
registerShot('s03', { draw(g, t, info) {
  const cam = { z: 1.35, y: -20 };
  const { GY } = cafe(g, t, cam, { mood: 'golden' });
  layer(g, cam, 1, (g) => {
    const cx = E.W / 2, s = 1.25, rim = { color: '#ffc68a', dir: [0, -1], w: 4 };
    const tb = cafeTable(g, cx, GY); cup(g, cx - 60, tb.top, 1.1); cup(g, cx + 50, tb.top, 1.1);
    const f = (x, fc, of, p, ex) => drawFigure(g, { x, y: GY, s, facing: fc, outfit: of, pose: p, expr: ex, rim, shadow: false });
    f(cx - 330, 1, YOU, POSES.sitBack, 'joy'); f(cx - 150, 1, FAHAD, POSES.sit, 'joy'); f(cx + 150, -1, SAUD, POSES.sitBack, 'joy'); f(cx + 330, -1, MAJED, POSES.sit, 'happy');
  });
  const k = t / info.dur;
  if (k < 0.6) cap(g, t, info.dur * 0.6, '٢٠ سنة صحبة 🤝', E.H * 0.15);
  else { veil(g, '#000', 0.35 * prog(k, 0.6, 0.75)); ar(g, 'إلين جات الكشتة… 🏕️', E.W / 2, E.H * 0.42, { size: 96, color: LIME, a: ease.out(prog(k, 0.62, 0.75)) }); }
  brand(g);
} });

// helper: golden desert with one character + prop + price tag
function dayShot(g, t, info, who, opts) {
  const cam = { z: 1.45 + 0.05 * t, y: -40, x: opts.camX || 0 };
  const { GY } = day(g, t, cam);
  layer(g, cam, 0.85, (g) => opts.bg?.(g, GY));
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: E.W / 2 + (opts.x || 0), y: GY + 40, s: 1.5, facing: opts.facing || 1, outfit: who, pose: opts.pose || POSES.stand, expr: opts.expr || 'happy', rim: { color: '#ffd59a', dir: [-1, -0.4], w: 4 }, prop: opts.prop });
    opts.fg?.(g, GY);
  });
  FX.dust(g, t, { count: 30, color: '#ffe2bd', a: 0.3 });
  cap(g, t, info.dur, opts.caption, E.H * 0.14);
  tag(g, opts.price, E.W / 2 + (opts.tagX ?? 0), E.H * 0.27, t, opts.tagAt ?? 0.6);
  brand(g);
}
// s04 — سعود عبّى البنزين: ٢٠٠
registerShot('s04', { draw(g, t, info) {
  dayShot(g, t, info, SAUD, { caption: 'الخميس العصر… سعود ⛽', price: 'بنزين ٢٠٠', tagAt: 2.4, x: -180, pose: POSES.point, expr: 'joy',
    bg: (g, GY) => car(g, E.W / 2 + 250, GY + 40, 1.1, '#ece6da', -1) });
} });
// s05 — فهد جاب الذبيحة: ١٢٠٠
registerShot('s05', { draw(g, t, info) {
  dayShot(g, t, info, FAHAD, { caption: 'فهد جاب الذبيحة 🐑', price: 'ذبيحة ١٬٢٠٠', tagAt: 1.8, pose: POSES.holdFront, expr: 'joy',
    fg: (g, GY) => { const x = E.W / 2 + 70, y = GY + 40 - 175 * 1.5; g.fillStyle = '#c9c2b0'; g.beginPath(); g.ellipse(x, y, 190, 46, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#f2d27a'; g.beginPath(); g.ellipse(x, y - 14, 160, 38, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#8a4a2a'; g.beginPath(); g.ellipse(x, y - 46, 95, 44, 0, 0, Math.PI * 2); g.fill(); } });
} });
// s06 — ماجد حجز المخيم: ٨٠٠
registerShot('s06', { draw(g, t, info) {
  dayShot(g, t, info, MAJED, { caption: 'ماجد حجز المخيم ⛺', price: 'مخيم ٨٠٠', tagAt: 1.5, x: 200, facing: -1, pose: POSES.point, expr: 'joy',
    bg: (g, GY) => tent(g, E.W / 2 - 160, GY + 40, 1.4) });
} });
// s07 — وأنت؟ الحطب، الفحم، الغاز، الموية، القهوة… ١٠٠٠ تقريباً
registerShot('s07', { draw(g, t, info) {
  const items = [['🪵', 0.6, 'حطب'], ['⚫', 1.15, 'فحم'], ['🧯', 1.85, 'غاز'], ['💧', 2.55, 'موية'], ['☕', 3.35, 'قهوة']];
  dayShot(g, t, info, YOU, { caption: 'وأنت؟ 😅', price: '١٬٠٠٠ تقريباً 🤷', tagAt: 4.9, tagX: 0, pose: POSES.shrug, expr: t > 3.6 ? 'surprised' : 'happy',
    fg: (g, GY) => {
      const slots = [[-200, 0], [200, 0], [-200, 105], [200, 105], [0, 210]];
      items.forEach(([e, at, n], i) => { const p = ease.outBack(prog(t, at, at + 0.3)); if (p <= 0) return; const [dx, dy] = slots[i]; g.save(); g.translate(E.W / 2 + dx, E.H * 0.36 + dy - (1 - p) * 200); g.scale(p, p); g.rotate(Math.sin(t * 2 + i) * 0.05); rr(g, -130, -50, 260, 100, 24); g.fillStyle = 'rgba(20,16,14,.88)'; g.fill(); ar(g, `${n} ${e}`, 0, 2, { size: 46, glowC: 'transparent' }); g.restore(); });
    } });
} });
// s08 — وكانت كشتة… ما تنعاد
registerShot('s08', { draw(g, t, info) {
  fireCircle(g, t, { z: 1.45 - 0.2 * ease.inOut(t / info.dur), youPose: POSES.cheer, saudPose: POSES.sitBack, youExpr: 'joy', fahadExpr: 'joy', saudExpr: 'joy', majedExpr: 'joy' });
  cap(g, t, info.dur, 'وكانت كشتة… ما تنعاد 🔥', E.H * 0.14);
  brand(g);
} });
// s09 — لين رجعوا (fire dies)
registerShot('s09', { draw(g, t, info) {
  const k = clamp(t / info.dur);
  fireCircle(g, t, { z: 1.25, fire: 1 - k * 0.9, youExpr: 'neutral', fahadExpr: 'neutral', saudExpr: 'neutral', majedExpr: 'neutral' });
  veil(g, '#000', 0.5 * k);
  cap(g, t, info.dur, 'لين رجعوا…', E.H * 0.42, { size: 96 });
  brand(g);
} });
// s10 — الأحد.. في القروب: يا شباب كم علي؟
registerShot('s10', { draw(g, t, info) {
  UI.blueprint(g, { grid: 60, a: 0.05 });
  chat(g, t, [{ at: 0.2, text: 'كشتة أسطورية 🔥🔥', name: 'ماجد', nameColor: '#ff8a7a' }, { at: 1.4, text: 'يا شباب، كم علي؟ 🤔', me: true, size: 46 }], { typing: 2.4 });
  ar(g, 'الأحد…', E.W / 2, E.H * 0.06, { size: 66, a: fadeA(t, info.dur) });
  brand(g);
} });
// thinking figure with a floating number
function calcShot(g, t, info, who, prop, num, caption, opts = {}) {
  const cam = { z: 1.7, y: -80 };
  const { GY } = cafe(g, t, cam, { mood: 'interiorWarm' });
  veil(g, '#1a1020', 0.25);
  layer(g, cam, 1, (g) => drawFigure(g, { x: E.W / 2, y: GY, s: 1.5, facing: 1, outfit: who, pose: opts.pose || POSES.phone, expr: 'thinking', prop, rim: { color: '#ffd59a', dir: [0, -1], w: 4 } }));
  const p = ease.outBack(prog(t, 0.8, 1.2));
  if (p > 0) { g.save(); g.translate(E.W / 2 + 230, E.H * 0.3); g.scale(p, p); UI.bubble(g, 0, 0, { w: 380, h: 190, dots: false }); ar(g, num, 0, -6, { size: 92, color: '#1a1020', glowC: 'transparent' }); g.restore(); }
  cap(g, t, info.dur, caption, E.H * 0.12);
  brand(g);
}
registerShot('s11', { draw(g, t, info) { calcShot(g, t, info, FAHAD, 'phone', '٨٧٥؟', 'فهد حسبها بالجوال 📱'); } });
registerShot('s12', { draw(g, t, info) { calcShot(g, t, info, SAUD, 'paper', '١٬٠٥٠؟', 'سعود حسبها بالورقة 📝', { pose: POSES.holdFront }); } });
// s13 — ماجد: قسّموها بالتساوي
registerShot('s13', { draw(g, t, info) {
  blurNight(g, t);
  const { cx, cy, r } = portrait(g, t, MAJED, 'smirk', { talk: 0.6 });
  const p = ease.outBack(prog(t, 0.3, 0.7));
  if (p > 0) { g.save(); g.translate(cx + r * 0.6, cy - r * 1.25); g.scale(p, p); UI.bubble(g, 0, 0, { w: 520, h: 170, dots: false }); ar(g, 'بالتساوي! 🤝', 0, -4, { size: 70, color: '#1a1020', glowC: 'transparent' }); g.restore(); }
  cap(g, t, info.dur, 'وماجد قال…', E.H * 0.12);
  brand(g);
} });
// s14 — بس ماجد ما أكل من الذبيحة أصلاً
registerShot('s14', { draw(g, t, info) {
  blurNight(g, t);
  const { cx, cy, r } = portrait(g, t, MAJED, 'surprised');
  const p = ease.outBack(prog(t, 0.6, 1.0));
  if (p > 0) { g.save(); g.translate(cx - r * 0.95, cy - r * 1.1); g.scale(p, p); circle(g, 0, 0, 120, 'rgba(255,255,255,.92)'); ar(g, '🐑', 0, 6, { size: 120, glowC: 'transparent' }); seg(g, [[-90, -90], [90, 90]], 22, '#e0332a'); g.restore(); }
  cap(g, t, info.dur, 'بس ماجد ما أكل من الذبيحة 🙄', E.H * 0.12, { size: 64 });
  brand(g);
} });
// s15 — ثلاث أيام.. ثلاث أرقام.. تمام.. أوكي (cold chat)
registerShot('s15', { draw(g, t, info) {
  backdropCold(g, t);
  chat(g, t, [{ at: 0.1, text: 'حسبتها: عليك ٨٧٥', name: 'فهد', nameColor: '#e8e2d6' }, { at: 1.0, text: 'لا، ١٬٠٥٠ 📝', name: 'سعود', nameColor: '#7fb0ff' }, { at: 1.8, text: 'بالتساوي وخلاص', name: 'ماجد', nameColor: '#ff8a7a' }, { at: 3.0, text: 'تمام.', me: true }, { at: 3.9, text: 'أوكي.', name: 'فهد', nameColor: '#e8e2d6' }], { bg: '#121a22', frame: { glow: '#7fb0ff' } });
  ar(g, '٣ أيام · ٣ أرقام 🥶', E.W / 2, E.H * 0.06, { size: 62, color: '#cfe0ff', a: fadeA(t, info.dur) });
  brand(g);
} });
function backdropCold(g, t) { g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#0b1220', '#16233a']); g.fillRect(0, 0, E.W, E.H); FX.snow?.(g, t, { count: 60 }); }
// s16 — وأنت؟ قررت تسكت.. وتبلعها
registerShot('s16', { draw(g, t, info) {
  blurNight(g, t);
  const { cx, cy, r } = portrait(g, t, YOU, 'confused', { blink: true });
  const z = ease.out(prog(t, 0.9, 1.5));
  if (z > 0) { g.save(); g.translate(cx, cy + r * 0.38); rr(g, -r * 0.4 * z, -16, r * 0.8 * z, 32, 10); g.fillStyle = '#cfcfd6'; g.fill(); for (let i = -6; i <= 6; i++) if (Math.abs(i * r * 0.06) < r * 0.4 * z) { g.fillStyle = '#7a7a84'; g.fillRect(i * r * 0.06 - 4, -12, 8, 24); } g.restore(); }
  cap(g, t, info.dur, 'وأنت؟ سكتّ… وبلعتها 😶', E.H * 0.12);
  brand(g);
} });
// s17 — إلين واحد قال: خلّونا نحطها في ديفيزو
registerShot('s17', { draw(g, t, info) {
  UI.blueprint(g, { grid: 60, a: 0.05 });
  const fl = Math.max(0, 1 - Math.abs(t - 1.6) / 0.25); if (fl > 0) veil(g, LIME, 0.25 * fl);
  chat(g, t, [{ at: 0.1, text: 'أوكي.', name: 'فهد', nameColor: '#e8e2d6' }, { at: 1.4, text: 'خلّونا نحطها في ديفيزو 💡', name: 'سعود', nameColor: '#7fb0ff', color: '#2f4a1c', size: 44 }],
    { extra: (g, w, h, y) => { const p = ease.outBack(prog(t, 2.2, 2.6)); if (p <= 0) return; g.save(); g.translate(w / 2, y + 120); g.scale(p, p); rr(g, -280, -90, 560, 180, 30); g.fillStyle = '#1b2414'; g.fill(); g.lineWidth = 4; g.strokeStyle = LIME; g.stroke(); ar(g, 'ديفيزو · مجموعة الكشتة 🏕️', 0, -26, { size: 36, color: LIME, glowC: 'transparent' }); ar(g, 'اضغط للانضمام', 0, 34, { size: 30, color: '#cfd8c8', glowC: 'transparent', weight: 400 }); g.restore(); } });
  brand(g);
} });
// Diviso-style app screen
function appScreen(g, t, title, rows, o = {}) {
  phoneFrame(g, t, (g, w, h) => {
    g.fillStyle = '#f4f6f1'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, 200);
    ar(g, title, w - 50, 130, { size: 48, align: 'right', color: '#121512', glowC: 'transparent' });
    rows.forEach((r, i) => {
      const p = ease.out(prog(t, r.at, r.at + 0.3)); if (p <= 0) return;
      const y = 250 + i * 170;
      g.save(); g.globalAlpha *= p; g.translate((1 - p) * 80, 0);
      rr(g, 36, y, w - 72, 140, 30); g.fillStyle = '#ffffff'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#e3e7df'; g.stroke();
      if (r.icon) { circle(g, w - 110, y + 70, 42, '#eef5df'); ar(g, r.icon, w - 110, y + 72, { size: 40, glowC: 'transparent' }); }
      ar(g, r.a, w - 175, y + 50, { size: 38, align: 'right', color: '#121512', glowC: 'transparent' });
      if (r.b) ar(g, r.b, w - 175, y + 98, { size: 26, align: 'right', color: '#6b7466', glowC: 'transparent', weight: 400 });
      if (r.right) ar(g, r.right, 90, y + 70, { size: r.rightSize || 40, align: 'left', color: r.rightColor || '#121512', glowC: 'transparent' });
      if (r.check != null) { const on = typeof r.check === 'function' ? r.check(t) : r.check; rr(g, 70, y + 40, 110, 60, 30); g.fillStyle = on ? '#8fc23a' : '#d9ddd5'; g.fill(); circle(g, on ? 150 : 100, y + 70, 24, '#ffffff'); }
      g.restore();
    });
    o.extra?.(g, w, h);
  }, { glow: LIME });
}
// s18 — سوّوا مجموعة.. كل واحد سجّل اللي دفعه
registerShot('s18', { draw(g, t, info) {
  UI.blueprint(g, { grid: 60, a: 0.05 });
  appScreen(g, t, 'كشتة الشلة 🏕️', [
    { at: 0.5, icon: '⛽', a: 'بنزين', b: 'دفعها سعود', right: '٢٠٠' },
    { at: 1.1, icon: '🐑', a: 'ذبيحة', b: 'دفعها فهد', right: '١٬٢٠٠' },
    { at: 1.7, icon: '⛺', a: 'مخيم', b: 'دفعها ماجد', right: '٨٠٠' },
    { at: 2.3, icon: '🪵', a: 'حطب وفحم وغاز وقهوة', b: 'دفعتها أنت', right: '١٬٠٠٠' },
  ]);
  cap(g, t, info.dur, 'كل واحد سجّل اللي دفعه ✍️', E.H * 0.06, { size: 62 });
  brand(g);
} });
// s19 — الذبيحة؟ اختاروا مين يشارك.. بدون ماجد
registerShot('s19', { draw(g, t, info) {
  UI.blueprint(g, { grid: 60, a: 0.05 });
  appScreen(g, t, 'ذبيحة 🐑 · مين يشارك؟', [
    { at: 0.3, icon: '🟢', a: 'أنت', check: true },
    { at: 0.5, icon: '⚪', a: 'فهد', check: true },
    { at: 0.7, icon: '🔵', a: 'سعود', check: true },
    { at: 0.9, icon: '🔴', a: 'ماجد', b: 'ما أكل 🙃', check: (t) => t < 2.8 },
  ]);
  cap(g, t, info.dur, 'اللي ما أكل… ما يدفع ✓', E.H * 0.06, { size: 62, color: LIME });
  brand(g);
} });
// s20 — وطلع الكشف في ثواني
registerShot('s20', { draw(g, t, info) {
  UI.blueprint(g, { grid: 60, a: 0.05 });
  appScreen(g, t, 'الكشف ✅', [
    { at: 0.6, icon: '🔵', a: 'سعود ← فهد', right: '٣٠٠', rightColor: '#2f7a1c' },
    { at: 1.0, icon: '🔵', a: 'سعود ← ماجد', right: '٣٠٠', rightColor: '#2f7a1c' },
    { at: 1.4, icon: '🔵', a: 'سعود ← أنت', right: '١٠٠', rightColor: '#2f7a1c' },
  ]);
  cap(g, t, info.dur, 'وطلع الكشف في ثواني ⚡', E.H * 0.06, { size: 62 });
  brand(g);
} });
// s21 — سعود.. عليه سبعمية
registerShot('s21', { draw(g, t, info) {
  blurNight(g, t);
  const { cx, cy, r } = portrait(g, t, SAUD, 'shocked');
  FX.speedLines?.(g, t, { cx, cy, a: 0.25 });
  ar(g, '٧٠٠', cx, cy - r * 1.75, { size: 170, color: '#ff5a4a', a: ease.out(prog(t, 0.05, 0.25)) });
  brand(g);
} });
// s22 — والمحفظة؟ في السيارة طبعاً
registerShot('s22', { draw(g, t, info) {
  const cam = { z: 1.4, y: -40 };
  const { GY } = day(g, t, cam);
  layer(g, cam, 0.85, (g) => car(g, E.W / 2 + 230, GY + 40, 1.1, '#ece6da', -1));
  layer(g, cam, 1, (g) => drawFigure(g, { x: E.W / 2 - 220, y: GY + 40, s: 1.5, facing: 1, outfit: SAUD, pose: POSES.point, expr: 'nervous', rim: { color: '#ffd59a', dir: [-1, -0.4], w: 4 } }));
  const p = ease.outBack(prog(t, 0.8, 1.2));
  if (p > 0) { g.save(); g.translate(E.W / 2 - 60, E.H * 0.33); g.scale(p, p); UI.bubble(g, 0, 0, { w: 520, h: 170, dots: false }); ar(g, 'بالسيارة! 🚗', 0, -4, { size: 64, color: '#1a1020', glowC: 'transparent' }); g.restore(); }
  cap(g, t, info.dur, 'والمحفظة؟ 👛', E.H * 0.14);
  brand(g);
} });
// s23 — خلاص.. والقروب رجع يرسل ميمز
registerShot('s23', { draw(g, t, info) {
  UI.blueprint(g, { grid: 60, a: 0.05 });
  chat(g, t, [{ at: 0.2, text: 'تم التحويل ✅', name: 'سعود', nameColor: '#7fb0ff' }, { at: 0.9, text: '😂😂😂', name: 'فهد', nameColor: '#e8e2d6', size: 60 }, { at: 1.5, text: 'الكشتة الجاية متى؟ 🏕️', name: 'ماجد', nameColor: '#ff8a7a' }, { at: 2.2, text: 'الخميس 😎', me: true }]);
  ar(g, 'والقروب رجع يضحك 😂', E.W / 2, E.H * 0.06, { size: 62, a: fadeA(t, info.dur) });
  brand(g);
} });
// s24 — tagline
registerShot('s24', { draw(g, t, info) {
  fireCircle(g, t, { z: 1.2, youPose: POSES.cheer, fahadPose: POSES.cheer, saudPose: POSES.wave, majedPose: POSES.cheer, youExpr: 'joy', fahadExpr: 'joy', saudExpr: 'joy', majedExpr: 'joy' });
  const a = ease.out(prog(t, 0.2, 0.7));
  rr(g, 60, E.H * 0.07, E.W - 120, E.H * 0.24, 40); g.fillStyle = alpha('#0d0f0c', 0.75 * a); g.fill();
  ar(g, 'ديفيزو', E.W / 2, E.H * 0.12, { size: 96, color: LIME, a });
  ar(g, 'خلّ الحساب واضح…', E.W / 2, E.H * 0.19, { size: 64, a: ease.out(prog(t, 0.9, 1.3)) });
  ar(g, 'وخلّ الصحبة تبقى 🤝', E.W / 2, E.H * 0.255, { size: 64, a: ease.out(prog(t, 2.3, 2.7)) });
  brand(g);
} });
// s25 — teaser
registerShot('s25', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#07090f', '#121a14']); g.fillRect(0, 0, E.W, E.H);
  glow(g, E.W / 2, E.H * 0.45, 700, LIME, 0.12);
  ar(g, 'الحلقة الجاية', E.W / 2, E.H * 0.38, { size: 72, a: ease.out(prog(t, 0.1, 0.5)) });
  ar(g, 'السفرة ✈️', E.W / 2, E.H * 0.48, { size: 140, color: LIME, a: ease.out(prog(t, 0.5, 0.9)) });
  ar(g, 'تابعنا عشان ما تفوتك 👀', E.W / 2, E.H * 0.6, { size: 52, a: ease.out(prog(t, 1.2, 1.6)), weight: 600 });
  brand(g);
} });
