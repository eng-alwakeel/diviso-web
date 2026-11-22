// MSG-145: the smart link's two copies (edge api/smart-link.js and the page
// src/lib/appStoreLinks.ts) must send the same visitor to the same URL.
// Run: node scripts/check-smart-link.mjs   (exits 1 on any mismatch)
import { build } from "esbuild";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import handler, { targets, platformOf } from "../api/smart-link.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TMP = join(ROOT, "node_modules", ".cache", "check-smart-link");
mkdirSync(TMP, { recursive: true });
const out = join(TMP, "appStoreLinks.mjs");
await build({ entryPoints: [join(ROOT, "src/lib/appStoreLinks.ts")], outfile: out, bundle: true, format: "esm", platform: "node", logLevel: "silent" });
const site = await import(pathToFileURL(out).href);

let fail = 0;
const eq = (name, a, b) => {
  if (a !== b) { fail++; console.error(`✗ ${name}\n  got:  ${a}\n  want: ${b}`); } else console.log(`✓ ${name}`);
};

const AS = "https://apps.apple.com/app/id6761329043?pt=118372368";
const GP = "https://play.google.com/store/apps/details?id=app.diviso&referrer=";
const cases = [
  ["no params", "", `${AS}&ct=smart_link&mt=8`, `${GP}${encodeURIComponent("utm_source=smart_link&utm_medium=web&utm_campaign=smart_link")}`],
  ["ct only", "ct=blog_split_rent", `${AS}&ct=blog_split_rent&mt=8`, `${GP}${encodeURIComponent("utm_source=smart_link&utm_medium=web&utm_campaign=blog_split_rent")}`],
  ["utm only", "utm_source=tiktok&utm_medium=bio&utm_campaign=games_nov", `${AS}&ct=games_nov&mt=8`, `${GP}${encodeURIComponent("utm_source=tiktok&utm_medium=bio&utm_campaign=games_nov")}`],
  ["ct + utm", "ct=share_x&utm_source=app&utm_medium=share&utm_campaign=share_statement", `${AS}&ct=share_x&mt=8`, `${GP}${encodeURIComponent("utm_source=app&utm_medium=share&utm_campaign=share_statement")}`],
  ["dirty input", "utm_campaign=Games Nov!!&utm_source=Insta", `${AS}&ct=games_nov&mt=8`, `${GP}${encodeURIComponent("utm_source=insta&utm_medium=web&utm_campaign=games_nov")}`],
];
for (const [name, qs, ios, android] of cases) {
  const p = new URLSearchParams(qs);
  const e = targets(p), s = site.smartLinkTargets(p);
  eq(`${name} · edge ios`, e.ios, ios);
  eq(`${name} · edge android`, e.android, android);
  eq(`${name} · page ios = edge`, s.ios, e.ios);
  eq(`${name} · page android = edge`, s.android, e.android);
}

const UA = {
  iphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1",
  android: "Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36",
  desktop: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
  googlebot: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  whatsapp: "WhatsApp/2.24.1 A",
};
eq("ua iphone", platformOf(UA.iphone), "ios");
eq("ua android", platformOf(UA.android), "android");
eq("ua desktop", platformOf(UA.desktop), "desktop");
eq("ua googlebot (Android UA) stays on the page", platformOf(UA.googlebot), "desktop");
eq("ua whatsapp preview", platformOf(UA.whatsapp), "desktop");

const run = (ua, url) => {
  const res = { headers: {}, setHeader(k, v) { this.headers[k.toLowerCase()] = v; }, end() {} };
  handler({ url, headers: { "user-agent": ua } }, res);
  return res;
};
eq("handler iphone → App Store", run(UA.iphone, "/api/smart-link?ct=x").headers.location, `${AS}&ct=x&mt=8`);
eq("handler android → Play", run(UA.android, "/api/smart-link?utm_campaign=y").headers.location, `${GP}${encodeURIComponent("utm_source=smart_link&utm_medium=web&utm_campaign=y")}`);
eq("handler bot → page with web=1", run(UA.googlebot, "/api/smart-link?ct=x").headers.location, "/download?ct=x&web=1");

console.log(fail ? `\n${fail} mismatch(es)` : "\nall smart-link checks passed");
process.exit(fail ? 1 : 0);
