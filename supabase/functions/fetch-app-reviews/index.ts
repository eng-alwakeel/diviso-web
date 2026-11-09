// fetch-app-reviews (MSG-071)
// Pulls the public App Store customer-review RSS for Diviso in sa/ae/kw/us
// and upserts into ops.app_reviews keyed by review_id.
// Reviewer name/author is deliberately NOT stored.
// Called daily by pg_cron (05:30 UTC). Deploy with verify_jwt = false;
// auth is the x-ops-secret header (same pattern as asc-snapshot in diviso-web).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";

const APP_ID = "6761329043";
const COUNTRIES = ["sa", "ae", "kw", "us"] as const;

type Row = {
  review_id: string;
  country: string;
  rating: number | null;
  title: string | null;
  body: string | null;
  version: string | null;
  updated_at: string | null;
  fetched_at: string;
};

function label(v: unknown): string | null {
  if (v && typeof v === "object" && "label" in v) {
    const l = (v as { label: unknown }).label;
    return typeof l === "string" ? l : null;
  }
  return null;
}

async function fetchCountry(country: string, fetchedAt: string): Promise<Row[]> {
  const url =
    `https://itunes.apple.com/${country}/rss/customerreviews/id=${APP_ID}/sortBy=mostRecent/json`;
  const res = await fetch(url, { headers: { "User-Agent": "diviso-ops/1.0" } });
  if (!res.ok) throw new Error(`${country}: HTTP ${res.status}`);
  const json = await res.json();
  let entries = json?.feed?.entry ?? [];
  if (!Array.isArray(entries)) entries = [entries];
  const rows: Row[] = [];
  for (const e of entries) {
    // Review entries carry im:rating; the app-metadata entry (older feeds) does not.
    const id = label(e?.id);
    const rating = label(e?.["im:rating"]);
    if (!id || rating === null) continue;
    rows.push({
      review_id: id,
      country,
      rating: Number.parseInt(rating, 10),
      title: label(e?.title),
      body: label(e?.content),
      version: label(e?.["im:version"]),
      updated_at: label(e?.updated),
      fetched_at: fetchedAt,
    });
  }
  return rows;
}

Deno.serve(async (req) => {
  // Same auth as asc-snapshot: shared x-ops-secret from Vault `ops_cron_secret`.
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const opsSecret = Deno.env.get("OPS_CRON_SECRET");
  if (!opsSecret || req.headers.get("x-ops-secret") !== opsSecret) {
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  }

  // `ops` is not an exposed API schema; writes go through the service_role-only
  // RPC public.ops_upsert_app_reviews (MSG-075 §3).
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey);
  const fetchedAt = new Date().toISOString();
  const perCountry: Record<string, number | string> = {};
  const all: Row[] = [];

  for (const c of COUNTRIES) {
    try {
      const rows = await fetchCountry(c, fetchedAt);
      perCountry[c] = rows.length;
      all.push(...rows);
    } catch (err) {
      perCountry[c] = `error: ${(err as Error).message}`;
    }
  }

  if (all.length > 0) {
    const payload = all.map(({ fetched_at: _f, ...r }) => r);
    const { error } = await supabase.rpc("ops_upsert_app_reviews", { p_rows: payload });
    if (error) {
      return new Response(JSON.stringify({ ok: false, error: error.message, perCountry }), {
        status: 500,
      });
    }
  }

  return new Response(JSON.stringify({ ok: true, upserted: all.length, perCountry }), {
    headers: { "Content-Type": "application/json" },
  });
});
