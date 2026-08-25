import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { errorResult, requireAuth, supabaseForUser, textResult } from "../supabase";

export default defineTool({
  name: "list_groups",
  title: "List groups",
  description:
    "List the Diviso expense-sharing groups the signed-in user belongs to, with id, name, currency and status.",
  inputSchema: {
    status: z
      .enum(["active", "finished", "closed", "all"])
      .optional()
      .describe("Filter by group status. Defaults to all."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status }, ctx) => {
    try {
      requireAuth(ctx);
      const supabase = supabaseForUser(ctx);
      let query = supabase
        .from("groups")
        .select("id, name, currency, group_type, status, created_at")
        .order("created_at", { ascending: false })
        .limit(100);
      if (status && status !== "all") query = query.eq("status", status);

      const { data, error } = await query;
      if (error) return errorResult(error.message);
      return textResult({ groups: data ?? [] });
    } catch (e) {
      return errorResult(e instanceof Error ? e.message : String(e));
    }
  },
});
