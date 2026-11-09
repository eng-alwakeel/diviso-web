// Shared server-to-server auth for Edge Functions called from Postgres
// (pg_net triggers / pg_cron) with verify_jwt = false.
//
// A request is accepted when ANY of these holds:
//   (a) the bearer token equals Deno.env SUPABASE_SERVICE_ROLE_KEY exactly
//       (or one of SUPABASE_SECRET_KEYS, when the runtime exposes them)
//   (b) the bearer token is a JWT with role = service_role for THIS project,
//       not expired, and its signature is verified by the platform
//       (Auth admin endpoint — only a validly signed service_role key passes)
//   (c) the bearer token / apikey is an sb_secret_ key, verified the same way
//   (+) an optional per-function shared secret (e.g. CRON_SECRET) matches
//
// Nothing here ever logs or returns a key value — only kinds and lengths.

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const PROJECT_REF = (() => {
  try {
    return new URL(SUPABASE_URL).hostname.split(".")[0];
  } catch {
    return "";
  }
})();

export type AuthResult = { ok: true; via: string } | { ok: false; reason: string };

function bearer(req: Request): string {
  const h = req.headers.get("Authorization") ?? "";
  return h.replace(/^Bearer\s+/i, "").trim();
}

export function keyKind(v: string | null | undefined): string {
  if (!v) return "empty";
  if (v.startsWith("eyJ")) return "jwt";
  if (v.startsWith("sb_secret_")) return "sb_secret";
  if (v.startsWith("sb_publishable_")) return "sb_publishable";
  return "other";
}

function timingSafeEqual(a: string, b: string): boolean {
  const ea = new TextEncoder().encode(a);
  const eb = new TextEncoder().encode(b);
  if (ea.length !== eb.length) return false;
  let diff = 0;
  for (let i = 0; i < ea.length; i++) diff |= ea[i] ^ eb[i];
  return diff === 0;
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

function envSecretKeys(): string[] {
  const out: string[] = [];
  const srk = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (srk) out.push(srk.trim());
  // Newer runtimes expose the project's secret keys as a JSON map.
  const raw = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (raw) {
    try {
      for (const v of Object.values(JSON.parse(raw) as Record<string, string>)) {
        if (typeof v === "string" && v) out.push(v.trim());
      }
    } catch { /* ignore malformed */ }
  }
  return out;
}

// Positive verifications are cached per token hash for a few minutes so a
// burst of notifications costs one round-trip, not one per push.
const verifiedCache = new Map<string, number>();
const CACHE_MS = 10 * 60 * 1000;

async function sha256(v: string): Promise<string> {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(v));
  return Array.from(new Uint8Array(d)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// The Auth admin API only answers 200 to a validly signed service_role
// credential (legacy JWT or sb_secret_). This is the signature check for (b)/(c).
async function platformVerifiesServiceKey(token: string): Promise<boolean> {
  const h = await sha256(token);
  const exp = verifiedCache.get(h);
  if (exp && exp > Date.now()) return true;

  const headers: Record<string, string> = { apikey: token };
  if (keyKind(token) === "jwt") headers.Authorization = `Bearer ${token}`;
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=1`, { headers });
    await r.body?.cancel();
    if (r.ok) {
      verifiedCache.set(h, Date.now() + CACHE_MS);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function authorizeServiceCaller(
  req: Request,
  opts: { fn: string; extraSecretEnv?: string } = { fn: "unknown" },
): Promise<AuthResult> {
  const token = bearer(req);
  const apikey = (req.headers.get("apikey") ?? "").trim();
  const candidates = [token, apikey].filter((v) => v.length > 0);

  // (+) optional shared secret, e.g. CRON_SECRET
  if (opts.extraSecretEnv) {
    const s = (Deno.env.get(opts.extraSecretEnv) ?? "").trim();
    const hdr = (req.headers.get("x-cron-secret") ?? "").trim();
    if (s && [hdr, token].some((v) => v && timingSafeEqual(v, s))) {
      return { ok: true, via: opts.extraSecretEnv };
    }
  }

  // (a) exact match with the runtime's own service key(s)
  const envKeys = envSecretKeys();
  for (const c of candidates) {
    if (envKeys.some((k) => timingSafeEqual(c, k))) return { ok: true, via: "env_key" };
  }

  for (const c of candidates) {
    const kind = keyKind(c);
    // (b) service_role JWT for this project, signature verified by the platform
    if (kind === "jwt") {
      const p = decodeJwtPayload(c);
      if (!p || p.role !== "service_role") continue;
      if (PROJECT_REF && p.ref && p.ref !== PROJECT_REF) continue;
      if (typeof p.exp === "number" && p.exp * 1000 < Date.now()) continue;
      if (await platformVerifiesServiceKey(c)) return { ok: true, via: "service_role_jwt" };
    }
    // (c) new-style secret key
    if (kind === "sb_secret") {
      if (await platformVerifiesServiceKey(c)) return { ok: true, via: "sb_secret" };
    }
  }

  // Diagnostics without secrets: kinds, lengths, whitespace, claimed role.
  const envSrk = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  console.warn(`[${opts.fn}] unauthorized`, JSON.stringify({
    header_kind: keyKind(token),
    header_len: token.length,
    header_role: keyKind(token) === "jwt" ? (decodeJwtPayload(token)?.role ?? null) : null,
    apikey_kind: keyKind(apikey),
    env_srk_kind: keyKind(envSrk),
    env_srk_len: envSrk.length,
    env_srk_has_ws: /\s/.test(envSrk),
    env_secret_keys_present: !!Deno.env.get("SUPABASE_SECRET_KEYS"),
  }));
  return { ok: false, reason: "unauthorized" };
}
