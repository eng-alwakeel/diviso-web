// Single source of truth for native app store links.
// Google Play went live 2026-11-22 (app.diviso, 1.0.20 / 51) — MSG-145.
export const ANDROID_AVAILABLE = true;

export const APP_STORE_ID = "6761329043";
// No country code so the App Store auto-localizes worldwide.
export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;
export const PLAY_PACKAGE = "app.diviso";
export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}`;

export const EXTERNAL_LINK_PROPS = {
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
};

// Apple provider token (same developer account) + campaign token (ct).
// ct shows up in App Store Connect → App Analytics → Campaigns, so every
// App Store link on the site carries one: web_<page>, blog_<slug>, invite…
// Rules: max 40 chars, lowercase [a-z0-9_]. Keep in sync with scripts/prerender.mjs.
export const APP_STORE_PROVIDER_TOKEN = "118372368";

export const campaignToken = (raw: string): string =>
  raw.toLowerCase().replace(/[^a-z0-9_]+/g, "_").slice(0, 40).replace(/_+$/, "");

export const appStoreUrl = (ct: string): string =>
  `${APP_STORE_URL}?pt=${APP_STORE_PROVIDER_TOKEN}&ct=${campaignToken(ct)}&mt=8`;

// GA4 key event: app_store_click with the same ct (register `ct` as an
// event-scoped custom dimension "campaign_tag_ct" in GA4 to report on it).
export const trackAppStoreClick = (ct: string): void => {
  try {
    window.gtag?.("event", "app_store_click", {
      ct: campaignToken(ct),
      page_path: window.location.pathname,
    });
  } catch {
    /* analytics must never block navigation */
  }
};

// ── Google Play (MSG-145) ────────────────────────────────────────────────
// Play attribution rides on the `referrer` parameter (URL-encoded utm_*),
// which shows up in Play Console → Acquisition. Same lowercase token rules
// as ct so the two stores report under the same names.
export interface PlayUtm {
  source: string;
  medium: string;
  campaign: string;
}

export const playStoreUrl = ({ source, medium, campaign }: PlayUtm): string => {
  const referrer =
    `utm_source=${campaignToken(source)}&utm_medium=${campaignToken(medium)}` +
    `&utm_campaign=${campaignToken(campaign)}`;
  return `${PLAY_STORE_URL}&referrer=${encodeURIComponent(referrer)}`;
};

// Site placements: App Store ct=web_<source>; Play utm_source=web,
// utm_medium=<source>, utm_campaign=web_<source>.
export const webPlayStoreUrl = (source: string): string =>
  playStoreUrl({ source: "web", medium: source, campaign: `web_${source}` });

export const trackPlayStoreClick = (campaign: string): void => {
  try {
    window.gtag?.("event", "play_store_click", {
      campaign: campaignToken(campaign),
      page_path: window.location.pathname,
    });
  } catch {
    /* analytics must never block navigation */
  }
};

// ── Smart link: https://diviso.app/download (MSG-145) ────────────────────
// iPhone/iPad → App Store, Android → Google Play, computer → both + QR.
// Phones are redirected at the edge (api/smart-link.js); the page repeats
// the same mapping for anything the edge can't tell (iPadOS desktop UA).
// Every "download" button that can't know the device links here with its
// own ct (and utm_* when it has them).
export const SMART_LINK_URL = "https://www.diviso.app/download";

export const smartLinkUrl = (ct: string, utm?: Partial<PlayUtm>): string => {
  const q = new URLSearchParams({ ct: campaignToken(ct) });
  if (utm?.source) q.set("utm_source", utm.source);
  if (utm?.medium) q.set("utm_medium", utm.medium);
  if (utm?.campaign) q.set("utm_campaign", utm.campaign);
  return `${SMART_LINK_URL}?${q.toString()}`;
};

// Maps the smart link's query to each store. Keep in sync with
// api/smart-link.js (same rules, tested by scripts/check-smart-link.mjs).
//  iOS ct:  ?ct=… → else utm_campaign → else "smart_link"
//  Play:    utm_source → else "smart_link"; utm_medium → else "web";
//           utm_campaign → else ct → else "smart_link"
export const smartLinkTargets = (params: URLSearchParams): { ios: string; android: string } => {
  const ct = params.get("ct") || "";
  const src = params.get("utm_source") || "";
  const med = params.get("utm_medium") || "";
  const camp = params.get("utm_campaign") || "";
  return {
    ios: appStoreUrl(ct || camp || "smart_link"),
    android: playStoreUrl({
      source: src || "smart_link",
      medium: med || "web",
      campaign: camp || ct || "smart_link",
    }),
  };
};
