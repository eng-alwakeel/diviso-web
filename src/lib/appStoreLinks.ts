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
