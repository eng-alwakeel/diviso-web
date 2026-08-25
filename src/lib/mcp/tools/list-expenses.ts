import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { errorResult, requireAuth, supabaseForUser, textResult } from "../supabase";

export default defineTool({
  name: "list_expenses",
  title: "List expenses",
  description:
    "List expenses in a Diviso group, newest first, including amount, payer and description.",
  inputSchema: {
    group_id: z.string().uuid().describe("The group's UUID."),
    limit: z.number().int().min(1).max(100).optional().describe("Max rows, default 25."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ group_id, limit }, ctx) => {
    try {
      requireAuth(ctx);
      const supabase = supabaseForUser(ctx);
      const { data, error } = await supabase
        .from("expenses")
        .select("id, amount, currency, description, payer_id, spent_at, status, created_at")
        .eq("group_id", group_id)
        .order("spent_at", { ascending: false })
        .limit(limit ?? 25);
      if (error) return errorResult(error.message);
      return textResult({ expenses: data ?? [] });
    } catch (e) {
      return errorResult(e instanceof Error ? e.message : String(e));
    }
  },
});
