// shared helpers for the Kashta film
import { E, V, rr, seg, circle, glow, alpha, clamp, ease, prog, linGrad, layer } from '/engine/core.js';
import { drawFigure, POSES, breathe, bigFace } from '/engine/rig2d.js';
import { desert, campfire, tent, car } from '../sets/desert.js';
import { YOU, FAHAD, SAUD, MAJED } from '../cast.js';

export const LIME = '#C8F169';
export const CAST = { YOU, FAHAD, SAUD, MAJED };
const LOGO = new Image(); LOGO.src = '/fonts/icon.png'; await LOGO.decode().catch(() => {});
export function brand(g) {
  const w = 330, h = 96, x = E.W / 2 - w / 2, y = E.H - 150;
  g.save(); rr(g, x, y, w, h, 48); g.fillStyle = 'rgba(13,15,12,.82)'; g.fill();
  if (LOGO.complete && LOGO.naturalWidth) { g.save(); rr(g, x + 14, y + 12, 72, 72, 18); g.clip(); g.drawImage(LOGO, x + 14, y + 12, 72, 72); g.restore(); }
  g.fillStyle = '#ffffff'; g.font = '700 50px "Readex"'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.direction = 'ltr'; g.fillText('diviso', x + 104, y + h / 2 + 2); g.restore();
}
export function ar(g, str, x, y, o = {}) {
  const { size = 74, color = '#fff6e6', a = 1, weight = 700, glowC = 'rgba(0,0,0,.85)', align = 'center' } = o;
  if (a <= 0) return;
  g.save(); g.globalAlpha *= clamp(a); g.direction = 'rtl'; g.textAlign = align; g.textBaseline = 'middle';
  g.font = `${weight} ${size}px "Readex"`;
  g.lineJoin = 'round'; g.lineWidth = size * 0.16; g.strokeStyle = glowC; g.strokeText(str, x, y);
  g.fillStyle = color; g.fillText(str, x, y); g.restore();
}
export const fadeA = (t, dur, i = 0.25, o = 0.2) => clamp(Math.min(t / i, (dur - t) / o));
export const cap = (g, t, dur, str, y = E.H * 0.15, o = {}) => ar(g, str, E.W / 2, y, { a: fadeA(t, dur), ...o });
// price tag that pops in
export function tag(g, str, x, y, t, at = 0.3, o = {}) {
  const p = ease.outBack(prog(t, at, at + 0.35)); if (p <= 0) return;
  g.save(); g.translate(x, y); g.scale(p, p); g.rotate(o.rot ?? -0.06);
  g.font = `800 ${o.size || 78}px "Readex"`; const w = g.measureText(str).width + 80;
  rr(g, -w / 2, -60, w, 120, 60); g.fillStyle = o.bg || LIME; g.fill();
  g.direction = 'rtl'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = o.color || '#0d0f0c'; g.fillText(str, 0, 4); g.restore();
}
// the four friends sitting around the fire (night) — returns GY
export function fireCircle(g, t, o = {}) {
  const cam = { z: o.z ?? 1.25, x: o.x ?? 0, y: o.y ?? -40 };
  const { GY } = desert(g, t, cam, { night: true });
  layer(g, cam, 0.7, (g) => { tent(g, E.W / 2 - 620, GY - 10, 1.1); });
  layer(g, cam, 1, (g) => {
    const cx = E.W / 2, s = 1.15, rim = { color: '#ffa65a', dir: [0, 1], w: 4 };
    const f = (x, facing, outfit, pose, expr) => drawFigure(g, { x, y: GY + 40, s, facing, outfit, pose: breathe(pose, t), expr, rim, shadow: false });
    f(cx - 360, 1, YOU, o.youPose || POSES.sit, o.youExpr || 'happy');
    f(cx - 200, 1, FAHAD, o.fahadPose || POSES.sit, o.fahadExpr || 'happy');
    f(cx + 200, -1, SAUD, o.saudPose || POSES.sit, o.saudExpr || 'happy');
    f(cx + 360, -1, MAJED, o.majedPose || POSES.sit, o.majedExpr || 'happy');
    campfire(g, cx, GY + 70, t, 1.05, { intensity: o.fire ?? 1 });
  });
  return { GY };
}
// big talking-head close-up on a blurred background
export function portrait(g, t, outfit, expr, o = {}) {
  const r = V(300, 320) * (1 + 0.035 * t), cx = E.W / 2, cy = E.H * (o.cy ?? 0.55);
  bigFace(g, cx, cy, r, { outfit, expr, rimColor: o.rim || '#ffb070', rimSide: -1, blink: o.blink ?? true, talk: o.talk });
  return { cx, cy, r };
}
// iPhone-like frame with a chat / app screen drawn by fn(g, w, h)
export function phoneFrame(g, t, fn, o = {}) {
  const cx = E.W / 2, cy = E.H * (o.cy ?? 0.52), s = (o.s ?? 1) * (1 + 0.02 * t), pw = 760, ph = 1360;
  g.save(); g.translate(cx, cy); g.scale(s, s); g.rotate(o.rot ?? 0);
  glow(g, 0, 0, 800, o.glow || LIME, 0.1);
  rr(g, -pw / 2, -ph / 2, pw, ph, 80); g.fillStyle = '#0b0c0e'; g.fill();
  rr(g, -pw / 2 + 22, -ph / 2 + 22, pw - 44, ph - 44, 62); g.fillStyle = o.screen || '#0f1412'; g.fill();
  g.save(); rr(g, -pw / 2 + 22, -ph / 2 + 22, pw - 44, ph - 44, 62); g.clip(); g.translate(-pw / 2 + 22, -ph / 2 + 22); fn(g, pw - 44, ph - 44); g.restore();
  rr(g, -90, -ph / 2 + 40, 180, 44, 22); g.fillStyle = '#000'; g.fill();
  g.restore();
}
// WhatsApp-style group chat
export function chat(g, t, msgs, o = {}) {
  phoneFrame(g, t, (g, w, h) => {
    g.fillStyle = o.bg || '#0f1a16'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#1b2a24'; g.fillRect(0, 0, w, 190);
    circle(g, w - 90, 130, 44, '#2f4a3e'); ar(g, '🏕️', w - 90, 132, { size: 44, glowC: 'transparent' });
    ar(g, o.title || 'الشلة', w - 160, 112, { size: 44, align: 'right', glowC: 'transparent' });
    ar(g, 'فهد، سعود، ماجد، أنت', w - 160, 158, { size: 26, align: 'right', weight: 400, color: '#9fb6aa', glowC: 'transparent' });
    let y = 260;
    for (const m of msgs) {
      const a = ease.out(prog(t, m.at, m.at + 0.3)); if (a <= 0) { continue; }
      const me = m.me, size = m.size || 40;
      g.font = `600 ${size}px "Readex"`; const tw = Math.min(w - 160, g.measureText(m.text).width + 60), bh = size + 66 + (m.name ? 34 : 0);
      const x = me ? 40 : w - 40 - tw;
      g.save(); g.globalAlpha *= a; g.translate(0, (1 - a) * 30);
      rr(g, x, y, tw, bh, 26); g.fillStyle = m.color || (me ? '#2c5b3a' : '#24302b'); g.fill();
      if (m.name) ar(g, m.name, x + tw - 28, y + 34, { size: 26, align: 'right', color: m.nameColor || LIME, glowC: 'transparent' });
      ar(g, m.text, x + tw - 30, y + bh / 2 + (m.name ? 16 : 0), { size, align: 'right', color: m.textColor || '#ffffff', glowC: 'transparent', weight: 600 });
      g.restore();
      y += bh + 26;
    }
    if (o.typing != null && t > o.typing) { rr(g, w - 200, y, 160, 70, 35); g.fillStyle = '#24302b'; g.fill(); for (let i = 0; i < 3; i++) circle(g, w - 160 + i * 40, y + 35 + Math.sin(t * 8 + i) * 5, 9, '#9fb6aa'); }
    o.extra?.(g, w, h, y);
  }, o.frame || {});
}
export { POSES, drawFigure, bigFace, desert, campfire, tent, car, YOU, FAHAD, SAUD, MAJED };
