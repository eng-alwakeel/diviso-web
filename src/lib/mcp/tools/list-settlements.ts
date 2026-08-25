import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { errorResult, requireAuth, supabaseForUser, textResult } from "../supabase";

export default defineTool({
  name: "list_settlements",
  title: "List settlements",
  description:
    "List settlements (payments between members) in a Diviso group, optionally filtered by status.",
  inputSchema: {
    group_id: z.string().uuid().describe("The group's UUID."),
    status: z
      .enum(["pending", "confirmed", "disputed", "all"])
      .optional()
      .describe("Filter by settlement status. Defaults to all."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ group_id, status }, ctx) => {
    try {
      requireAuth(ctx);
      const supabase = supabaseForUser(ctx);
      let query = supabase
        .from("settlements")
        .select(
          "id, amount, currency, from_user_id, to_user_id, status, settlement_type, note, created_at, confirmed_at",
        )
        .eq("group_id", group_id)
        .order("created_at", { ascending: false })
        .limit(100);
      if (status && status !== "all") query = query.eq("status", status);

      const { data, error } = await query;
      if (error) return errorResult(error.message);
      return textResult({ settlements: data ?? [] });
    } catch (e) {
      return errorResult(e instanceof Error ? e.message : String(e));
    }
  },
});
