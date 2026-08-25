import { createClient } from "@supabase/supabase-js";
import type { ToolContext } from "@lovable.dev/mcp-js";

// The bundled tools run inside a Supabase Edge Function (Deno).
declare const Deno: { env: { get(key: string): string | undefined } } | undefined;

function env(key: string): string {
  const value =
    typeof Deno !== "undefined" ? Deno.env.get(key) : (globalThis as any)?.process?.env?.[key];
  if (!value) throw new Error(`Missing environment variable ${key}`);
  return value;
}

/**
 * Supabase client scoped to the MCP caller. The verified bearer token is
 * forwarded so every query runs under that user's RLS policies.
 */
export function supabaseForUser(ctx: ToolContext) {
  return createClient(env("SUPABASE_URL"), env("SUPABASE_ANON_KEY"), {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function requireAuth(ctx: ToolContext) {
  if (!ctx.isAuthenticated()) {
    throw new Error("Not authenticated. Sign in to Diviso to use this tool.");
  }
  return ctx.getUserId() as string;
}

export function textResult(payload: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(payload) }] };
}

export function errorResult(message: string) {
  return { content: [{ type: "text" as const, text: message }], isError: true };
}
