# Insights — 2026-11-02
Written by the weekly SEO analyst. No Search Console / GA4 numbers again: the Google accounts connected to the analyst do not hold a diviso.app property. First traffic signal comes from the Metricool tracker (installed 2026-10-28): 26 page views, 20 visits, 19 visitors for 2026-10-26 → 11-01; 1 session from the Google app, 1 view on a blog page. Too small to judge any article, so no CTR- or rank-based items this week.

Crawl status: unchanged. Production (commit f2d02c4) still serves the SPA shell: homepage title, `canonical=https://diviso.app/`, no body text; main has no `public/rss.xml` and builds with `vite build` only. Prerender stays on branch `seo/prerender-crawlable-blog`. A local test merge into main built cleanly: 75 articles, 1 blog index, 29 landing pages, RSS; only the 3 docs/seo-agent files conflict (keep main's copy). Until it merges, articles are not indexable on their own URLs; keep publishing but expect no search traffic.

## Open items
- [ ] retitle how-to-split-rent-with-flatmates-uk: Arabic title has a grammar error («كيف تُقسَّم الإيجار»). New AR title: «كيف يُقسَّم الإيجار بين شركاء السكن؟ بالتساوي أم حسب حجم الغرفة أم الدخل». Keep titleEn, description and slug.
- [ ] new topic: splitwise-vs-tricount-vs-diviso | neutral 3-way comparison, backlog row 9. «splitwise alternative arabic» still shows alternativeto and european-alternatives, plus small landing-page blogs (tabb, split-maadi), so it looks winnable once pages are crawlable | comparisons
- [ ] new topic: tricount-alternative-arabic | Arabic and riyal angle, backlog row 10. Tricount holds a result for «how to split rent with flatmates» and no Arabic-first option appears | comparisons
