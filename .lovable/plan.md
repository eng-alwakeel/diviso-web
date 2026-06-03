# App Store / Google Play Audit & Update

## Scope of search performed

Searched the entire repo (`src/`, `public/`, `index.html`, all `i18n` locales EN+AR) for: `apps.apple`, `play.google`, `app store`, `google play`, `appstore`, `playstore`, `download`, `install`, `get the app`, `available on`, `coming soon`, `iOS`, `Android`, `iPhone`, `iPad`, `أندرويد`, `آيفون`, `قريباً`, `حمّل`, `ثبّت`, `متجر`, plus Open Graph / JSON-LD blocks.

## Files that contain actual native app-store references (will change)

### 1. `src/pages/Pricing.tsx`
- `APP_STORE_URL` constant (line 88) — `https://apps.apple.com/app/diviso` → `https://apps.apple.com/app/id6761329043`
- `PLAY_STORE_URL` constant (line 89) — remove the constant; gate Google Play UI behind `ANDROID_RELEASED = false` flag.
- Section "App Store Badges" (lines 385-422):
  - Subtitle "متاح على iPhone و Android — مجاناً." → "متوفر الآن على App Store — نسخة أندرويد قريباً."
  - App Store `<a>` → add `target="_blank" rel="noopener noreferrer"`.
  - Google Play `<a>` → wrap in `{ANDROID_RELEASED && (...)}` so it's hidden, with a clear `// TODO: flip ANDROID_RELEASED to true when Play Store listing is live` comment.
- Plan CTAs (lines 250, 311) that also point to `APP_STORE_URL` get the new URL + `target/rel`.

### 2. `src/pages/ReferralLanding.tsx`
- `APP_STORE_URL` (line 11) → `https://apps.apple.com/app/id6761329043`.
- `PLAY_STORE_URL` (line 12) → remove, replaced by `ANDROID_RELEASED = false` flag.
- `apple-itunes-app` meta (line 81) → `app-id=6761329043`.
- `google-play-app` meta (line 83) → only inject when `ANDROID_RELEASED`.
- `handleDownload` (lines 87-90) → only the iOS path; Android path stays unreachable.
- Download CTAs (lines 175-194):
  - iOS button keeps "Download on the App Store", opens new tab.
  - Android button: render only when `ANDROID_RELEASED`; otherwise show a single disabled pill "Android — coming soon".

### 3. FAQ content — `src/i18n/locales/en/faq.json` and `src/i18n/locales/ar/faq.json`
Currently there is **no Q&A about platform availability / where to download**. To make FAQ tell the same story as the hero/footer/download page, add one new entry in each file (placed in the `general` category):
- key: `where_to_download`
- EN Q: "Where can I download the Diviso app?"
- EN A: "Diviso is available now on the App Store for iPhone and iPad — install it from https://apps.apple.com/app/id6761329043. The Android version is coming soon. You can also use Diviso right now from your browser at diviso.app — no download needed."
- AR Q: "وين أقدر أحمّل تطبيق Diviso؟"
- AR A: "Diviso متوفر الآن على App Store للآيفون والآيباد — حمّله من https://apps.apple.com/app/id6761329043. نسخة أندرويد قريباً. وتقدر تستخدم Diviso الحين مباشرة من المتصفح على diviso.app بدون تحميل."

(No existing FAQ string mentions Google Play or "available on Android", so nothing to rewrite — only add the new entry above.)

## Files checked that need NO changes (areas with no matches)

- `src/components/Footer.tsx` — only links to `/install` (PWA install page). No store links. No change.
- `src/components/Header.tsx` — no store links / download wording.
- `src/components/HeroSection.tsx` and `src/components/landing/LandingHero.tsx` — CTA points to `/dashboard` and `/auth`, no store links.
- `src/pages/Support.tsx`, `src/pages/Install.tsx` — `/install` is the PWA "Add to Home Screen" page. The `install.json` iOS/Android tabs refer to PWA install steps (Safari / Chrome), **not** the native stores, so they stay as-is.
- `index.html` — head/meta/JSON-LD only mentions `"operatingSystem": "Web, iOS, Android"` (factual app metadata, not a store link); no `apps.apple` or `play.google` URLs to update.
- `public/llms.txt`, `public/manifest.json`, `public/sw.js`, `public/robots.txt`, `public/launch/index.html`, `public/from/index.html` — no store links.
- All other `src/i18n/locales/*` files (landing, dashboard, groups, referral, plans, credits, install, support, etc.) — strings reference the PWA install or generic "download Diviso" wording without naming a store, so nothing to rewrite. The `landing.installApp` / `groups.download_app` strings continue to point to the browser / PWA install page.
- `src/pages/FAQ.tsx` component — purely renders from `faq.json`, so no code change needed beyond the json additions.

## Single feature flag

Both `Pricing.tsx` and `ReferralLanding.tsx` will define a local `const ANDROID_RELEASED = false;` with a `// Flip to true when the Google Play listing is public.` comment, so re-enabling Android later is a one-line change in each file.

## Deliverable summary the agent will print after build mode

A grouped old → new diff list covering:
- Download / pricing page (Pricing.tsx)
- Referral landing (ReferralLanding.tsx)
- FAQ i18n (en + ar)
- "No-change" confirmation list for Footer, Header, Hero, Install/Support pages, index.html meta, public/*, other locale files.
