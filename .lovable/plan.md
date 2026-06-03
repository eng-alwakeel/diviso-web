# App Store / Google Play Site-Wide Audit & Fix

## Audit results

I searched the entire repo (src/, public/, index.html) for: `apple.com`, `play.google`, `App Store`, `Google Play`, `app-store`, `iOS`, `Android`, `download`, `install`, `أندرويد`, `آيفون`, `متجر`, `قريباً`, `coming soon`, and related structured-data / smart-app-banner tags.

### Files WITH matches (will be changed)

| Area | File | Issue |
|---|---|---|
| Pricing page | `src/pages/Pricing.tsx` | Hardcoded `APP_STORE_URL` (no app id) + `PLAY_STORE_URL`; both CTA buttons (lines 250, 311) link to stores; bottom badges section (385–422); subtitle line 389 says "متاح على iPhone و Android" |
| Referral landing | `src/pages/ReferralLanding.tsx` | Placeholder App Store URL `id0000000000`, Play Store URL, Smart App Banner meta (`apple-itunes-app`, `google-play-app`), platform detection + Android download branch, two store buttons (lines 183, 192) |
| SEO landing data | `src/content/seo-pages/seoLandingPagesData.ts:322` | FAQ entry: "Is Diviso available on iOS and Android?" → answer says "Native apps are coming soon" (stale) |
| Blog article | `src/content/blog/articles.ts:2368` | "Available on iOS, Android, and web" |
| Structured data | `index.html:70` | JSON-LD `"operatingSystem": "Web, iOS, Android"` |
| Structured data | `src/pages/UseCaseDetails.tsx:114` | Same JSON-LD `operatingSystem` value |

### Areas SEARCHED with NO app-store/Play-Store matches (verified clean)

- `src/components/Header.tsx`, `src/components/Footer.tsx` (footer only links to `/install` PWA page — no store badges)
- `src/components/HeroSection.tsx` and all `src/components/landing/*` (hero CTA goes to `/dashboard`)
- `src/pages/FAQ.tsx` + `src/i18n/locales/{ar,en}/faq.json` (no iOS/Android availability Q&A exists)
- `src/pages/Support.tsx`, `src/pages/PrivacyPolicy.tsx`, `src/pages/TermsConditions.tsx`, `src/pages/HowItWorks.tsx`, `src/pages/Welcome.tsx`, `src/pages/Onboarding.tsx`
- `src/pages/Install.tsx` + `src/i18n/locales/{ar,en}/install.json` (PWA install page only — no native store links; the "android" tab here is Chrome PWA install instructions, NOT Google Play, so it stays)
- `src/i18n/locales/**/*.json` (download strings refer to PWA / invite messaging, not native stores — `groups.download_app` = "download Diviso to split expenses", generic, stays)
- `public/launch/index.html`, `public/from/index.html`, `public/manifest.json`, `public/sw.js`
- `src/content/blog/articles.ts` (only 1 hit at line 2368)
- `src/content/use-cases/useCases.ts` (no matches)

## Changes (old → new)

### 1. Add a single shared flag/constants module

**Create** `src/lib/appStoreLinks.ts`:
```ts
// Single source of truth for native app store links.
// Flip ANDROID_AVAILABLE to true once Google Play is publicly released.
export const ANDROID_AVAILABLE = false;
export const APP_STORE_URL = "https://apps.apple.com/app/id6761329043";
export const APP_STORE_ID = "6761329043";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.diviso";
```

### 2. `src/pages/Pricing.tsx`

- Replace local `APP_STORE_URL` / `PLAY_STORE_URL` constants with imports from `@/lib/appStoreLinks`.
- Both CTA buttons (`<a href={APP_STORE_URL}>ابدأ مجاناً</a>` line 250, `<a href={APP_STORE_URL}>شراء الحزمة</a>` line 311): add `target="_blank" rel="noopener noreferrer"`.
- Subtitle line 389: `"متاح على iPhone و Android — مجاناً."` → `"متاح على iPhone — نسخة أندرويد قريباً."`
- App Store badge: add `target="_blank" rel="noopener noreferrer"`.
- Google Play badge: wrap in `{ANDROID_AVAILABLE && (...)}` so it disappears entirely; replace with a small disabled label `"Android — قريباً"` (muted, non-clickable) so layout still feels balanced.

### 3. `src/pages/ReferralLanding.tsx`

- Replace placeholder URLs with imports from `@/lib/appStoreLinks`.
- Smart App Banner: keep `apple-itunes-app` with real `app-id=6761329043`; remove `google-play-app` meta when `!ANDROID_AVAILABLE`.
- `handleDownload`: short-circuit android branch when `!ANDROID_AVAILABLE` (no-op + toast or fall through to web continue).
- "Download on the App Store" button (line 183): add `target="_blank" rel="noopener noreferrer"`.
- "Get it on Google Play" button (line 192): conditionally render only when `ANDROID_AVAILABLE`; otherwise show a disabled "Android — coming soon" pill.
- Platform detection logic: when detected `android` and `!ANDROID_AVAILABLE`, default UI to "continue on web" instead of pushing the store.

### 4. `src/content/seo-pages/seoLandingPagesData.ts` (line 322)

Old: `{ question: 'Is Diviso available on iOS and Android?', answer: 'Diviso is a progressive web app that works on any device with a browser. Native apps are coming soon.' }`

New: `{ question: 'Is Diviso available on iOS and Android?', answer: 'Diviso is available on the App Store for iPhone and iPad (https://apps.apple.com/app/id6761329043). The Android version is coming soon. Diviso also works as a progressive web app in any browser.' }`

### 5. `src/content/blog/articles.ts` (line 2368)

Old: `- ✅ Available on iOS, Android, and web`
New: `- ✅ Available on iOS (App Store) and web — Android coming soon`

### 6. `index.html` (line 70) & `src/pages/UseCaseDetails.tsx` (line 114)

Old: `"operatingSystem": "Web, iOS, Android"`
New: `"operatingSystem": "Web, iOS"`

### 7. i18n files — verification only

No translation keys reference App Store / Google Play / native download. The only download keys (`groups.download_app`, `groups.whatsapp_message`, `landing.features.cta.downloadApp`) are generic "get Diviso" copy that already correctly steers users to web/PWA. **No i18n file changes needed.** (Will re-grep to confirm before finishing.)

## Re-enable Android later

Single flip: set `ANDROID_AVAILABLE = true` in `src/lib/appStoreLinks.ts`. All conditional UI (Pricing badge, ReferralLanding button + smart-app-banner meta + android download handler) reactivates automatically. FAQ/blog/structured-data wording must be updated by hand at that point (clear comments will mark each spot).

## Out of scope (untouched)

- Backend, Supabase, edge functions
- `/install` PWA page and `install.json` (PWA install ≠ Play Store)
- Any visual restyling beyond hiding the Play badge
- Publishing — I will NOT publish; only stage changes for your preview review.
