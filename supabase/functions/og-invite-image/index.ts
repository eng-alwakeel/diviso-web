// Dynamic Open Graph image generator for Diviso group invites.
// Returns a 1200x630 PNG personalized with group name, inviter,
// member count and a type-based emoji. Designed for WhatsApp / X /
// Facebook crawlers.
//
// Endpoint:
//   GET /functions/v1/og-invite-image?token=<INVITE_TOKEN>
//
// Falls back to a generic branded image when the token is missing /
// invalid / expired.

import { Resvg, initWasm } from "npm:@resvg/resvg-wasm@2.6.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ---------- One-time module init (warm across invocations) ----------

let wasmReady: Promise<void> | null = null;
function ensureWasm(): Promise<void> {
  if (!wasmReady) {
    wasmReady = (async () => {
      try {
        // resvgWasm is a WebAssembly.Module thanks to Deno's wasm loader
        await initWasm(resvgWasm as unknown as WebAssembly.Module);
      } catch (e) {
        // Fallback: fetch the wasm bytes directly (cold-start path)
        const res = await fetch(
          "https://esm.sh/@resvg/resvg-wasm@2.6.2/index_bg.wasm",
        );
        const bytes = await res.arrayBuffer();
        await initWasm(bytes);
      }
    })();
  }
  return wasmReady;
}

// Arabic font (Cairo) — fetched once, kept in memory.
let fontPromise: Promise<Uint8Array> | null = null;
function getFont(): Promise<Uint8Array> {
  if (!fontPromise) {
    fontPromise = (async () => {
      const url =
        "https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hOA-W1ToLQ-HmkA.ttf";
      const res = await fetch(url);
      if (!res.ok) throw new Error(`font fetch failed: ${res.status}`);
      return new Uint8Array(await res.arrayBuffer());
    })();
  }
  return fontPromise;
}

// In-memory PNG cache keyed by token (or "__fallback__").
// Edge function instances are reused across invocations so this gives
// us a per-instance CDN-like cache for free.
const imageCache = new Map<string, { png: Uint8Array; expires: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 min

// ---------- Helpers ----------

type GroupType = "trip" | "food" | "housing" | "generic" | string | null;

function emojiFor(type: GroupType): string {
  switch ((type || "").toLowerCase()) {
    case "trip":
    case "travel":
      return "✈️";
    case "food":
    case "meal":
    case "restaurant":
      return "🍔";
    case "housing":
    case "home":
    case "rent":
      return "🏠";
    default:
      return "💸";
  }
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function truncate(s: string, max: number): string {
  if (!s) return s;
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

interface InvitePreview {
  is_valid: boolean;
  group_name?: string | null;
  group_type?: string | null;
  inviter_name?: string | null;
  member_count?: number | null;
}

async function fetchPreview(token: string): Promise<InvitePreview | null> {
  const supaUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supaUrl || !anonKey) return null;
  try {
    const res = await fetch(`${supaUrl}/rest/v1/rpc/get_invite_preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ p_token: token }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error("preview fetch failed", e);
    return null;
  }
}

// ---------- SVG composition ----------

interface SvgInput {
  groupName: string;
  inviterLine: string;
  memberLine: string;
  emoji: string;
  isFallback: boolean;
}

function buildSvg({
  groupName,
  inviterLine,
  memberLine,
  emoji,
  isFallback,
}: SvgInput): string {
  // Diviso lime green palette
  const bgFrom = "#C8F169";
  const bgTo = "#A3D940";
  const ink = "#0D0D0D";
  const muted = "#1f2937";
  const cardBg = "#ffffff";

  const safeGroup = escapeXml(truncate(groupName, 38));
  const safeInviter = escapeXml(truncate(inviterLine, 48));
  const safeMembers = escapeXml(truncate(memberLine, 32));

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bgFrom}"/>
      <stop offset="100%" stop-color="${bgTo}"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="18" flood-color="#000" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative circles -->
  <circle cx="120" cy="100" r="180" fill="#ffffff" opacity="0.10"/>
  <circle cx="1080" cy="540" r="220" fill="#ffffff" opacity="0.10"/>

  <!-- Brand row -->
  <g transform="translate(60, 60)">
    <rect width="56" height="56" rx="14" fill="${ink}"/>
    <text x="28" y="40" font-family="Cairo, sans-serif" font-size="34" font-weight="900"
          fill="${bgFrom}" text-anchor="middle">D</text>
    <text x="80" y="42" font-family="Cairo, sans-serif" font-size="32" font-weight="800"
          fill="${ink}">Diviso</text>
  </g>

  <!-- Central card -->
  <g filter="url(#shadow)">
    <rect x="80" y="150" width="1040" height="380" rx="32" fill="${cardBg}"/>
  </g>

  <!-- Card content -->
  <g>
    <text x="600" y="245" font-family="Cairo, sans-serif" font-size="78"
          text-anchor="middle">${emoji}</text>

    <text x="600" y="335" font-family="Cairo, sans-serif" font-size="52"
          font-weight="800" fill="${ink}" text-anchor="middle">${safeGroup}</text>

    <text x="600" y="385" font-family="Cairo, sans-serif" font-size="28"
          font-weight="500" fill="${muted}" text-anchor="middle">${safeInviter}</text>

    <text x="600" y="430" font-family="Cairo, sans-serif" font-size="24"
          font-weight="400" fill="#6b7280" text-anchor="middle">${safeMembers}</text>

    <!-- CTA pill -->
    <g transform="translate(420, 460)">
      <rect width="360" height="60" rx="30" fill="${ink}"/>
      <text x="180" y="40" font-family="Cairo, sans-serif" font-size="26"
            font-weight="700" fill="${bgFrom}" text-anchor="middle">
        قسّموا المصاريف بدون تعقيد
      </text>
    </g>
  </g>

  <!-- Footer -->
  <text x="600" y="590" font-family="Cairo, sans-serif" font-size="22"
        font-weight="600" fill="${ink}" opacity="0.7" text-anchor="middle">
    ${isFallback ? "diviso.app" : "انضم الآن على diviso.app"}
  </text>
</svg>`;
}

// ---------- Rendering ----------

async function renderPng(svg: string): Promise<Uint8Array> {
  await ensureWasm();
  const font = await getFont();
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
    font: {
      fontBuffers: [font],
      loadSystemFonts: false,
      defaultFontFamily: "Cairo",
    },
    background: "rgba(255,255,255,1)",
  });
  return resvg.render().asPng();
}

function fallbackInput(): SvgInput {
  return {
    groupName: "Diviso",
    inviterLine: "قسّم المصاريف مع أصحابك بسهولة",
    memberLine: "بدون لخبطة، بدون إحراج",
    emoji: "💸",
    isFallback: true,
  };
}

function inputFromPreview(p: InvitePreview): SvgInput {
  const group = (p.group_name || "مجموعة").trim();
  const inviter = p.inviter_name?.trim();
  const count = typeof p.member_count === "number" ? p.member_count : 0;
  return {
    groupName: group,
    inviterLine: inviter ? `${inviter} يدعوك للانضمام` : "دعوة للانضمام",
    memberLine: count > 0 ? `${count} عضو في المجموعة` : "كن أول الأعضاء",
    emoji: emojiFor(p.group_type ?? null),
    isFallback: false,
  };
}

// ---------- HTTP entry ----------

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = (url.searchParams.get("token") || "").trim();
    const cacheKey = token || "__fallback__";

    // Serve from in-memory cache
    const cached = imageCache.get(cacheKey);
    if (cached && cached.expires > Date.now()) {
      return new Response(cached.png, {
        headers: {
          ...corsHeaders,
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=600, s-maxage=3600",
          "X-Cache": "HIT",
        },
      });
    }

    let input: SvgInput;
    if (!token) {
      input = fallbackInput();
    } else {
      const preview = await fetchPreview(token);
      input = preview && preview.is_valid
        ? inputFromPreview(preview)
        : fallbackInput();
    }

    const svg = buildSvg(input);
    const png = await renderPng(svg);

    imageCache.set(cacheKey, { png, expires: Date.now() + CACHE_TTL_MS });

    return new Response(png, {
      headers: {
        ...corsHeaders,
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=600, s-maxage=3600",
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("og-invite-image error:", error);
    // Last-resort fallback: tiny transparent PNG
    const empty = new Uint8Array([
      137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1,
      0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137, 0, 0, 0, 13, 73, 68, 65, 84,
      120, 156, 99, 0, 1, 0, 0, 5, 0, 1, 13, 10, 45, 180, 0, 0, 0, 0, 73, 69,
      78, 68, 174, 66, 96, 130,
    ]);
    return new Response(empty, {
      headers: {
        ...corsHeaders,
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
      },
    });
  }
});
