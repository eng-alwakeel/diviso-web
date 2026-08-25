import { createClient } from "@supabase/supabase-js";
import type { ToolContext } from "@lovable.dev/mcp-js";

/**
 * Supabase client scoped to the MCP caller. The verified bearer token is
 * forwarded so every query runs under that user's RLS policies.
 */
export function supabaseForUser(ctx: ToolContext) {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
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
