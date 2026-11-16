// sets/desert.js — Saudi desert (barr) for the kashta: night with stars + campfire, or golden afternoon.
import { E, V, layer, backdrop, rr, seg, circle, poly, linGrad, glow, alpha, shade, rng } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const desertGround = () => E.H * V(0.8, 0.7);
export function desert(g, t, cam, o = {}) {
  const night = o.night ?? true, GY = desertGround(), CX = E.W / 2;
  layer(g, cam, 0.08, (g) => {
    backdrop(g, night ? ['#060918', '#111739', '#2a2350', '#4a2f4a'] : ['#4f4778', '#c9806a', '#f2b27a', '#f9d49c']);
    if (night) { FX.stars(g, t, { count: 260, seed: 4, area: [-E.W * 0.5, -E.H * 0.2, E.W * 2, GY * 0.95] }); FX.moon(g, CX + 330, GY - V(640, 1080), 44); }
    else FX.sun(g, CX - 300, GY - V(240, 360), 74, '#fff3dc', '#ffc27a', 6);
  });
  layer(g, cam, 0.25, (g) => FX.hills(g, { seed: 3, y: GY - V(110, 170), amp: V(120, 170), color: night ? '#1a1733' : '#b5714a', freq: 0.0018 }));
  layer(g, cam, 0.5, (g) => FX.hills(g, { seed: 9, y: GY - V(30, 60), amp: V(80, 110), color: night ? '#261d36' : '#cf8f5a', freq: 0.0028 }));
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, GY - 20, 0, GY + 700, night ? ['#3a2a3a', '#211826', '#120c16'] : ['#e2a868', '#c98a52', '#8e5a36']);
    g.fillRect(-E.W, GY - 20, E.W * 3, E.H * 2);
    const r = rng(11); g.fillStyle = night ? 'rgba(0,0,0,.18)' : 'rgba(120,70,30,.18)';
    for (let i = 0; i < 40; i++) { g.beginPath(); g.ellipse(-E.W + r() * E.W * 3, GY + 30 + r() * 600, 60 + r() * 120, 4 + r() * 5, 0, 0, Math.PI * 2); g.fill(); }
  });
  return { GY, CX, night };
}
export function campfire(g, x, y, t, s = 1, o = {}) {
  const k = o.intensity ?? 1; if (k <= 0) return;
  g.save(); g.translate(x, y); g.scale(s, s);
  for (const a of [-0.35, 0.35]) { g.save(); g.rotate(a); rr(g, -70, -14, 140, 26, 12); g.fillStyle = '#4a2c1c'; g.fill(); g.restore(); }
  for (let i = 0; i < 8; i++) circle(g, -60 + i * 17, 6, 11, '#5a5258');
  glow(g, 0, -40, 520 * k, '#ff8a3a', 0.35 * k);
  g.save(); g.globalCompositeOperation = 'lighter';
  const fl = (w, h, c, ph) => { const f = 1 + 0.12 * Math.sin(t * 11 + ph) + 0.06 * Math.sin(t * 23 + ph * 2); g.fillStyle = c; g.beginPath(); g.moveTo(-w, 0); g.quadraticCurveTo(-w * 0.9, -h * 0.5 * f, Math.sin(t * 7 + ph) * w * 0.25, -h * f * k); g.quadraticCurveTo(w * 0.9, -h * 0.5 * f, w, 0); g.closePath(); g.fill(); };
  fl(58, 170, 'rgba(255,90,30,.75)', 0); fl(42, 130, 'rgba(255,160,40,.8)', 1.3); fl(24, 80, 'rgba(255,240,170,.9)', 2.1);
  const r = rng(5); for (let i = 0; i < 14; i++) { const ph = (t * (0.6 + r() * 0.5) + r()) % 1; circle(g, (r() - 0.5) * 120 + Math.sin(t * 3 + i) * 14, -40 - ph * 360 * k, 3 * (1 - ph), `rgba(255,200,120,${0.9 * (1 - ph) * k})`); }
  g.restore(); g.restore();
}
export function tent(g, x, y, s = 1, color = '#d9c9a8') {
  g.save(); g.translate(x, y); g.scale(s, s);
  poly(g, [[-200, 0], [0, -230], [200, 0]], color); poly(g, [[0, -230], [200, 0], [120, 0]], shade(color, -0.25));
  poly(g, [[-55, 0], [0, -120], [55, 0]], '#2a1c18'); seg(g, [[0, -230], [0, -270]], 6, '#3a2a22');
  g.restore();
}
export function car(g, x, y, s = 1, color = '#ece6da', facing = 1) {
  g.save(); g.translate(x, y); g.scale(s * facing, s);
  rr(g, -230, -150, 460, 110, 28); g.fillStyle = color; g.fill();
  rr(g, -150, -235, 290, 100, 24); g.fillStyle = color; g.fill();
  g.fillStyle = '#2b3446'; rr(g, -130, -220, 115, 70, 10); g.fill(); rr(g, 0, -220, 115, 70, 10); g.fill();
  g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(-230, -80, 460, 14);
  for (const wx of [-140, 140]) { circle(g, wx, -40, 48, '#1a1a1e'); circle(g, wx, -40, 22, '#8a8a90'); }
  rr(g, 205, -130, 26, 18, 6); g.fillStyle = '#ffe9a8'; g.fill();
  g.restore();
}
