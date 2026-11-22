// MSG-145 smart link: https://diviso.app/download on a phone goes straight
// to the right store. vercel.json rewrites /download here only when the
// User-Agent looks like an iPhone/iPad/iPod/Android browser; everything else
// (computers, crawlers, link previews) gets the normal page with both
// badges + QR. The mapping mirrors smartLinkTargets() in
// src/lib/appStoreLinks.ts — scripts/check-smart-link.mjs keeps them equal.

export const APP_STORE_URL = "https://apps.apple.com/app/id6761329043";
export const PROVIDER_TOKEN = "118372368";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.diviso";

export const token = (raw) =>
  String(raw).toLowerCase().replace(/[^a-z0-9_]+/g, "_").slice(0, 40).replace(/_+$/, "");

const BOT = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram|twitterbot|linkedin|preview|lighthouse/i;

export function platformOf(ua) {
  ua = ua || "";
  if (BOT.test(ua)) return "desktop";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/android/i.test(ua)) return "android";
  return "desktop";
}

export function targets(params) {
  const ct = params.get("ct") || "";
  const src = params.get("utm_source") || "";
  const med = params.get("utm_medium") || "";
  const camp = params.get("utm_campaign") || "";
  const ref =
    `utm_source=${token(src || "smart_link")}&utm_medium=${token(med || "web")}` +
    `&utm_campaign=${token(camp || ct || "smart_link")}`;
  return {
    ios: `${APP_STORE_URL}?pt=${PROVIDER_TOKEN}&ct=${token(ct || camp || "smart_link")}&mt=8`,
    android: `${PLAY_STORE_URL}&referrer=${encodeURIComponent(ref)}`,
  };
}

export default function handler(req, res) {
  const url = new URL(req.url, "https://www.diviso.app");
  const platform = platformOf(req.headers["user-agent"]);
  // The rewrite only sends phones, but never redirect a computer or a bot:
  // hand them the page instead.
  const q = url.searchParams;
  const t = targets(q);
  let location = platform === "ios" ? t.ios : t.android;
  if (platform === "desktop") {
    q.set("web", "1");
    location = `/download?${q.toString()}`;
  }
  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("Vary", "User-Agent");
  res.statusCode = 302;
  res.setHeader("Location", location);
  res.end();
}
