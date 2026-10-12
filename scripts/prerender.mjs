// Post-build static generation for crawlers and AI answer engines.
//
// The site is a client-rendered SPA, so without this step every /blog/<slug>
// URL returns the homepage shell (homepage <title>, no article text) to any
// crawler that does not execute JavaScript (GPTBot, PerplexityBot, ClaudeBot,
// most social/RSS fetchers) and delays indexing for Google.
//
// After `vite build`, this script writes a real HTML file per article and per
// SEO landing page (dist/<route>/index.html) with the correct <title>, meta,
// canonical, Open Graph, JSON-LD and the full article text inside #root.
// React then mounts with createRoot() and replaces #root as before, so users
// see exactly the same app. Vercel serves these files before the SPA rewrite.
//
// It also generates /rss.xml (Arabic), /rss-en.xml (English) and adds any
// missing blog / landing URLs to /sitemap.xml.

import { build } from "esbuild";
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const SITE = "https://diviso.app";
const APP_STORE_ID = "6761329043";
const PROVIDER_TOKEN = "118372368";
const TMP = join(ROOT, "node_modules", ".prerender-tmp");

// ---------------------------------------------------------------- data load
async function loadModule(entry) {
  mkdirSync(TMP, { recursive: true });
  const out = join(TMP, entry.replace(/[^\w]/g, "_") + ".mjs");
  await build({
    entryPoints: [join(ROOT, entry)],
    outfile: out,
    bundle: true,
    format: "esm",
    platform: "node",
    logLevel: "silent",
    alias: { "@": join(ROOT, "src") },
  });
  return import(pathToFileURL(out).href + `?t=${Date.now()}`);
}

// ---------------------------------------------------------------- helpers
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Same markdown subset the BlogPost page renders (src/pages/BlogPost.tsx).
function formatContent(content) {
  return esc(content.trim())
    .replace(/&quot;/g, '"')
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<)(.+)$/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "")
    // block elements must not sit inside <p> (the SPA renderer tolerates it; crawlers prefer valid HTML)
    .replace(/<p>\s*(<(?:h2|h3|ul)>)/g, "$1")
    .replace(/(<\/(?:h2|h3|ul)>)\s*<\/p>/g, "$1")
    .replace(/^<\/p>/, "");
}

// App Store campaign token: max 40 chars, [a-z0-9_].
export const ct = (s) => s.toLowerCase().replace(/[^a-z0-9_]+/g, "_").slice(0, 40).replace(/_+$/, "");
const appStoreUrl = (token) =>
  `https://apps.apple.com/app/id${APP_STORE_ID}?pt=${PROVIDER_TOKEN}&ct=${ct(token)}&mt=8`;

function setTag(html, regex, replacement) {
  return regex.test(html) ? html.replace(regex, replacement) : html.replace("</head>", `    ${replacement}\n  </head>`);
}
function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\\s+${attr}="${key.replace(/[:.]/g, "\\$&")}"[^>]*>`, "i");
  return setTag(html, re, `<meta ${attr}="${key}" content="${esc(value)}" />`);
}

function renderPage(template, p) {
  let html = template;
  html = html.replace(/<html[^>]*>/i, `<html lang="${p.lang}" dir="${p.dir}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(p.title)}</title>`);
  html = setMeta(html, "name", "description", p.description);
  if (p.keywords) html = setMeta(html, "name", "keywords", p.keywords);
  html = setTag(html, /<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${p.url}" />`);
  html = html.replace(/\s*<link\s+rel="alternate"\s+hreflang="[^"]*"[^>]*>/gi, "");
  for (const [lang, href] of p.alternates || []) {
    html = html.replace("</head>", `    <link rel="alternate" hreflang="${lang}" href="${href}" />\n  </head>`);
  }
  html = setMeta(html, "property", "og:title", p.title);
  html = setMeta(html, "property", "og:description", p.description);
  html = setMeta(html, "property", "og:url", p.url);
  html = setMeta(html, "property", "og:type", p.ogType || "website");
  html = setMeta(html, "property", "og:image", p.image || `${SITE}/og-image.png`);
  html = setMeta(html, "name", "twitter:title", p.title);
  html = setMeta(html, "name", "twitter:description", p.description);
  html = setMeta(html, "name", "twitter:image", p.image || `${SITE}/og-image.png`);
  for (const ld of p.jsonLd || []) {
    html = html.replace(
      "</head>",
      `    <script type="application/ld+json" data-prerender>${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>\n  </head>`,
    );
  }
  html = html.replace(/<div id="root"><\/div>/, `<div id="root">${p.body}</div>`);
  if (!html.includes(p.body.slice(0, 40))) throw new Error(`#root injection failed for ${p.url}`);
  return html;
}

function writeRoute(route, html) {
  const dir = join(DIST, route.replace(/^\/+|\/+$/g, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
}

const nav = (isAr) =>
  `<header><a href="/">Diviso</a> · <a href="/blog">${isAr ? "المدونة" : "Blog"}</a> · <a href="/how-it-works">${
    isAr ? "كيف يعمل" : "How it works"
  }</a></header>`;

// ---------------------------------------------------------------- main
const template = readFileSync(join(DIST, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error("dist/index.html has no empty #root");

const { blogArticles } = await loadModule("src/content/blog/articles.ts");
const { seoLandingPages } = await loadModule("src/content/seo-pages/seoLandingPagesData.ts");

const org = { "@type": "Organization", name: "Diviso", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` } };

// Blog articles
for (const a of blogArticles) {
  const url = `${SITE}/blog/${a.slug}`;
  const token = `blog_${a.slug}`;
  const related = blogArticles
    .filter((b) => b.slug !== a.slug && b.category === a.category)
    .slice(0, 5)
    .map((b) => `<li><a href="/blog/${b.slug}">${esc(b.title)}</a></li>`)
    .join("");
  const body = `<div dir="rtl" lang="ar" data-prerender="blog">${nav(true)}<main><article>
<h1>${esc(a.title)}</h1><p><time datetime="${a.publishDate}">${a.publishDate}</time> · ${a.readTime} د</p>
${formatContent(a.content)}
<p><strong><a href="${appStoreUrl(token)}">حمّل Diviso من App Store</a></strong></p></article>
<article lang="en" dir="ltr"><h2>${esc(a.titleEn)}</h2>
${formatContent(a.contentEn)}
<p><strong><a href="${appStoreUrl(token)}">Get Diviso on the App Store</a></strong></p></article>
${related ? `<nav><h2>مقالات ذات صلة</h2><ul>${related}</ul></nav>` : ""}</main></div>`;
  writeRoute(
    `/blog/${a.slug}`,
    renderPage(template, {
      lang: "ar",
      dir: "rtl",
      title: `${a.title} | Diviso`,
      description: a.description,
      keywords: [...a.keywords, ...a.keywordsEn].join(", "),
      url,
      ogType: "article",
      image: a.ogImage,
      alternates: [["ar", url], ["en", `${url}?lang=en`], ["x-default", url]],
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: a.title,
          alternativeHeadline: a.titleEn,
          description: a.description,
          image: a.ogImage || `${SITE}/og-image.png`,
          datePublished: a.publishDate,
          dateModified: a.publishDate,
          inLanguage: ["ar", "en"],
          author: org,
          publisher: org,
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          keywords: a.keywords.join(", "),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Diviso", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "المدونة", item: `${SITE}/blog` },
            { "@type": "ListItem", position: 3, name: a.title, item: url },
          ],
        },
      ],
      body,
    }),
  );
}

// Blog index
{
  const items = blogArticles
    .map(
      (a) =>
        `<li><a href="/blog/${a.slug}">${esc(a.title)}</a> — <span lang="en" dir="ltr">${esc(a.titleEn)}</span><br/><small>${esc(
          a.description,
        )}</small></li>`,
    )
    .join("\n");
  writeRoute(
    "/blog",
    renderPage(template, {
      lang: "ar",
      dir: "rtl",
      title: "مدونة Diviso — أدلة تقسيم المصاريف المشتركة | Diviso Blog",
      description:
        "أدلة عملية لتقسيم المصاريف بين الأصدقاء والعائلة وشركاء السكن والرحلات. Practical guides to splitting shared expenses fairly.",
      url: `${SITE}/blog`,
      alternates: [["ar", `${SITE}/blog`], ["en", `${SITE}/blog?lang=en`], ["x-default", `${SITE}/blog`]],
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Diviso Blog",
          url: `${SITE}/blog`,
          publisher: org,
          blogPost: blogArticles.slice(0, 50).map((a) => ({
            "@type": "BlogPosting",
            headline: a.title,
            url: `${SITE}/blog/${a.slug}`,
            datePublished: a.publishDate,
          })),
        },
      ],
      body: `<div dir="rtl" lang="ar" data-prerender="blog-index">${nav(true)}<main><h1>مدونة Diviso</h1><ul>${items}</ul></main></div>`,
    }),
  );
}

// SEO landing pages
for (const p of seoLandingPages) {
  const lang = p.lang || "en";
  const dir = p.dir || (lang === "ar" ? "rtl" : "ltr");
  const isAr = lang === "ar";
  const url = `${SITE}${p.route}`;
  const faqs = (p.faqs || []).map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join("");
  const body = `<div dir="${dir}" lang="${lang}" data-prerender="landing">${nav(isAr)}<main><h1>${esc(p.h1)}</h1>
<p>${esc(p.heroSubtitle)}</p>${(p.bodyContent || []).map((t) => `<p>${esc(t)}</p>`).join("")}
${(p.features || []).length ? `<ul>${p.features.map((f) => `<li><strong>${esc(f.title)}</strong> — ${esc(f.description)}</li>`).join("")}</ul>` : ""}
${(p.useCases || []).length ? `<ul>${p.useCases.map((u) => `<li><strong>${esc(u.title)}</strong> — ${esc(u.description)}</li>`).join("")}</ul>` : ""}
${faqs ? `<section><h2>FAQ</h2>${faqs}</section>` : ""}
<p><strong><a href="${appStoreUrl(`web_${p.slug}`)}">${esc(p.ctaText)}</a></strong></p></main></div>`;
  const jsonLd = (p.faqs || []).length
    ? [
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: p.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
        },
      ]
    : [];
  const alternates = [];
  if (p.hreflangPair) {
    alternates.push([lang, url], [isAr ? "en" : "ar", `${SITE}${p.hreflangPair}`], ["x-default", isAr ? `${SITE}${p.hreflangPair}` : url]);
  }
  writeRoute(
    p.route,
    renderPage(template, { lang, dir, title: p.seoTitle, description: p.metaDescription, keywords: p.keywords, url, alternates, jsonLd, body }),
  );
}

// RSS (latest 50 per language)
function rss(lang) {
  const isAr = lang === "ar";
  const items = blogArticles
    .slice(0, 50)
    .map((a) => {
      const link = `${SITE}/blog/${a.slug}${isAr ? "" : "?lang=en"}`;
      return `    <item>
      <title>${esc(isAr ? a.title : a.titleEn)}</title>
      <link>${link}</link>
      <guid isPermaLink="false">diviso-blog-${a.slug}</guid>
      <pubDate>${new Date(`${a.publishDate}T06:00:00+03:00`).toUTCString()}</pubDate>
      <category>${a.category}</category>
      <description>${esc(isAr ? a.description : a.descriptionEn)}</description>
    </item>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${isAr ? "مدونة Diviso" : "Diviso Blog"}</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/${isAr ? "rss.xml" : "rss-en.xml"}" rel="self" type="application/rss+xml" />
    <description>${isAr ? "أدلة تقسيم المصاريف المشتركة" : "Guides to splitting shared expenses"}</description>
    <language>${lang}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}
writeFileSync(join(DIST, "rss.xml"), rss("ar"));
writeFileSync(join(DIST, "rss-en.xml"), rss("en"));

// Sitemap: add any blog / landing URL that is missing (the static file stays the base).
{
  const path = join(DIST, "sitemap.xml");
  let xml = readFileSync(path, "utf8");
  const add = [];
  const want = [
    { loc: `${SITE}/blog`, lastmod: blogArticles[0]?.publishDate, freq: "daily", pri: "0.8" },
    ...blogArticles.map((a) => ({ loc: `${SITE}/blog/${a.slug}`, lastmod: a.publishDate, freq: "monthly", pri: "0.7" })),
    ...seoLandingPages.map((p) => ({ loc: `${SITE}${p.route}`, lastmod: null, freq: "monthly", pri: "0.8" })),
  ];
  for (const u of want) {
    if (xml.includes(`<loc>${u.loc}</loc>`)) continue;
    add.push(
      `  <url>\n    <loc>${u.loc}</loc>\n${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ""}    <changefreq>${u.freq}</changefreq>\n    <priority>${u.pri}</priority>\n  </url>`,
    );
  }
  if (add.length) xml = xml.replace("</urlset>", `${add.join("\n")}\n</urlset>`);
  writeFileSync(path, xml);
  console.log(`[prerender] sitemap: +${add.length} urls`);
}

if (existsSync(TMP)) rmSync(TMP, { recursive: true, force: true });
console.log(`[prerender] ${blogArticles.length} articles, 1 blog index, ${seoLandingPages.length} landing pages, rss.xml + rss-en.xml`);
