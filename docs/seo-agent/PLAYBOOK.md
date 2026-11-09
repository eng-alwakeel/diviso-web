# SEO/GEO Playbook — diviso.app blog
Binding rules for the blog content agent (scheduled task «Diviso Daily SEO/GEO Blog Article») and the weekly SEO analyst. Read in full on every run. Mirrors the pattern used for Damanati, adapted to Diviso.

## 1. Goal
More App Store installs from search and AI answer engines (Google, Bing/IndexNow, ChatGPT search, Perplexity, Google AI Overviews). Quality over volume: **3 articles per week (Sun/Tue/Thu)**.

## 2. Picking the task (in this order)
1. `docs/seo-agent/insights.md` has an open `[ ]` item → do it, mark `[x] YYYY-MM-DD`.
2. An article whose `publishDate` is older than 120 days and appears in insights as "strengthen" → refresh it (new data/FAQ, no fake refresh; keep slug).
3. Otherwise the first `todo` row in `docs/seo-agent/backlog.md`.
4. Never repeat an angle already in `src/content/blog/articles.ts` (read the file, not memory).

## 3. Format (the renderer only understands this)
- `BlogArticle` object inserted at the TOP of `blogArticles` in `src/content/blog/articles.ts`. `category` ∈ guides | tips | news | comparisons. `publishDate` = today (`date +%Y-%m-%d`).
- Body: `## H2`, `### H3`, `**bold**`, `- bullet`, blank-line paragraphs. **No markdown tables.**
- Arabic and English written natively (not literal translation), same structure, ~800–1400 words each.
- Do NOT edit `public/sitemap.xml`, RSS or IndexNow: the build generates sitemap/RSS and `.github/workflows/indexnow.yml` pings IndexNow after deploy.

## 4. GEO rules (so AI engines quote us)
- Open with `## الإجابة المختصرة` / `## The short answer`: 2–3 self-contained sentences answering the exact query.
- H2s phrased as the questions people type. Define terms. Concrete numbers and a worked example.
- A short Q&A block near the end (`### question` + 1–3 sentence answer).
- End with one bold CTA sentence pointing at Diviso (the page template adds the App Store button with `ct=blog_<slug>`).

## 5. Content rules
- No prices, no credit amounts, no "free/مجاني" claims, no "free trial".
- No Android / Google Play (internal testing only).
- No unreleased features; no invented stats, testimonials or user counts; cite official sources for any regulation or number.
- Competitors may be named only in `comparisons` articles, factually and neutrally.
- Saudi first (riyal, local scenarios), with UK/English scenarios welcome in English sections.

## 6. Verify and publish
`npm ci && npm run build` must pass (the build prerenders every article — a failure means broken content). Then commit only `src/content/blog/articles.ts` and `docs/seo-agent/*` with `content(blog): <slug>` and push to `main`. On a rejected push: `git pull --rebase origin main` and retry. On auth/403: stop and report.

## 7. Logging
Move the backlog row to "Published" and append to `docs/seo-agent/log.md`: `YYYY-MM-DD | new/refresh/insight | https://diviso.app/blog/<slug> | note`.

## 8. Weekly analyst (Sunday)
Pulls Search Console (sc-domain:diviso.app) + GA4 when connected, Vercel analytics otherwise; writes `insights.md`:
- CTR < 1.5% with high impressions → new title/description (ready text).
- Position 8–20 → section to add.
- Queries without a page → new backlog row.
- Pages with traffic but no `app_store_click` → CTA/internal-link fix.
