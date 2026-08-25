# Diviso | قسّم بذكاء، سافر براحة
**Split Smart, Travel Easy**

تطبيق ذكي لإدارة المصاريف المشتركة مع الأصدقاء والعائلة والزملاء. قسّم النفقات بطريقة عادلة وذكية مع ميزات الذكاء الاصطناعي المتطورة.

## Project info

**Production**: https://diviso.app

## Local development

The only requirement is having Node.js (>= 20) & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd diviso-web

# Step 3: Install the necessary dependencies.
npm ci

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (database, auth, edge functions)
- Capacitor (iOS / Android wrapper)

## Deployment

The web app is hosted on [Vercel](https://vercel.com). Every push to `main` triggers a production deployment; pushes to other branches create preview deployments.

Build settings (also defined in `vercel.json`):

- **Build command**: `npm run build`
- **Output directory**: `dist`
- SPA rewrites route all paths to `index.html` (except the static pages under `public/from/` and `public/launch/`).

Environment variables (set in the Vercel project settings):

- `VITE_MOYASAR_PUBLISHABLE_KEY` — Moyasar payments publishable key
- `VITE_GOOGLE_CLIENT_ID` — optional, enables Google One Tap sign-in

The custom domain `diviso.app` is connected through the Vercel dashboard (Project → Settings → Domains).
