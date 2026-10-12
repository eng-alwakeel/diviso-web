// asc-snapshot — daily App Store Connect snapshot for the Diviso agent system.
//
// Called once a day by pg_cron (job "asc-snapshot-daily"). Pulls app versions,
// latest builds, recent customer reviews and diagnostic signatures from the
// App Store Connect API and stores ONE row in ops.asc_snapshots. The daily
// report / product agents read that table (read-only) via the Supabase MCP.
//
// Secrets (Edge Function secrets, never in code):
//   ASC_KEY_ID, ASC_ISSUER_ID, ASC_PRIVATE_KEY (contents of AuthKey_<id>.p8)
//   OPS_CRON_SECRET (must match vault secret "ops_cron_secret" used by cron)
// Auto-provided: SUPABASE_DB_URL.
import { importPKCS8, SignJWT } from "npm:jose@5.9.6";
import postgres from "npm:postgres@3.4.5";

const APP_ID = "6761329043"; // Diviso
const ASC = "https://api.appstoreconnect.apple.com";

async function ascToken(): Promise<string> {
  const key = await importPKCS8(Deno.env.get("ASC_PRIVATE_KEY")!.replace(/\\n/g, "\n"), "ES256");
  return await new SignJWT({})
    .setProtectedHeader({ alg: "ES256", kid: Deno.env.get("ASC_KEY_ID")!, typ: "JWT" })
    .setIssuer(Deno.env.get("ASC_ISSUER_ID")!)
    .setIssuedAt()
    .setExpirationTime("15m")
    .setAudience("appstoreconnect-v1")
    .sign(key);
}

async function get(token: string, path: string) {
  const r = await fetch(`${ASC}${path}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!r.ok) throw new Error(`${path} → HTTP ${r.status}: ${(await r.text()).slice(0, 300)}`);
  return await r.json();
}

Deno.serve(async (req) => {
  if (req.headers.get("x-ops-secret") !== Deno.env.get("OPS_CRON_SECRET")) {
    return new Response("forbidden", { status: 403 });
  }
  const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { prepare: false, max: 1 });
  try {
    const token = await ascToken();
    const [versions, builds, reviews] = await Promise.all([
      get(token, `/v1/apps/${APP_ID}/appStoreVersions?limit=5&fields[appStoreVersions]=versionString,appStoreState,platform,createdDate`),
      get(token, `/v1/builds?filter[app]=${APP_ID}&sort=-uploadedDate&limit=5&fields[builds]=version,uploadedDate,processingState,expired`),
      get(token, `/v1/apps/${APP_ID}/customerReviews?sort=-createdDate&limit=50&fields[customerReviews]=rating,title,body,territory,createdDate`),
    ]);

    let diagnostics: unknown[] = [];
    const latestBuild = builds.data?.[0]?.id;
    if (latestBuild) {
      try {
        const d = await get(token, `/v1/builds/${latestBuild}/diagnosticSignatures?limit=10`);
        diagnostics = (d.data ?? []).map((s: any) => ({
          type: s.attributes?.diagnosticType,
          signature: s.attributes?.signature,
          weight: s.attributes?.weight,
        }));
      } catch (e) {
        diagnostics = [{ error: String(e).slice(0, 200) }];
      }
    }

    const payload = {
      app_id: APP_ID,
      versions: (versions.data ?? []).map((v: any) => ({ id: v.id, ...v.attributes })),
      builds: (builds.data ?? []).map((b: any) => ({ id: b.id, ...b.attributes })),
      reviews: (reviews.data ?? []).map((r: any) => ({
        id: r.id,
        rating: r.attributes?.rating,
        title: r.attributes?.title,
        body: String(r.attributes?.body ?? "").slice(0, 500),
        territory: r.attributes?.territory,
        createdDate: r.attributes?.createdDate,
      })),
      diagnostics,
    };
    await sql`insert into ops.asc_snapshots (ok, payload) values (true, ${sql.json(payload)})`;
    return Response.json({ ok: true, versions: payload.versions.length, reviews: payload.reviews.length });
  } catch (e) {
    const msg = String(e).slice(0, 500);
    await sql`insert into ops.asc_snapshots (ok, error) values (false, ${msg})`.catch(() => {});
    return Response.json({ ok: false, error: msg }, { status: 500 });
  } finally {
    await sql.end();
  }
});
