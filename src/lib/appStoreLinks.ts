// Single source of truth for native app store links.
// Flip ANDROID_AVAILABLE to true once Google Play is publicly released —
// all conditional UI (Pricing badge, ReferralLanding button + smart app
// banner meta + android download handler) will reactivate automatically.
// FAQ/blog/structured-data wording must still be updated by hand at that
// point (search for "Android coming soon" / "نسخة أندرويد قريباً").
export const ANDROID_AVAILABLE = false;

export const APP_STORE_ID = "6761329043";
// No country code so the App Store auto-localizes worldwide.
export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.diviso";

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
