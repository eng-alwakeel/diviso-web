import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { errorResult, requireAuth, supabaseForUser, textResult } from "../supabase";

export default defineTool({
  name: "get_group",
  title: "Get group details",
  description:
    "Get one Diviso group with its members and totals. Use list_groups first to find the group id.",
  inputSchema: {
    group_id: z.string().uuid().describe("The group's UUID."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ group_id }, ctx) => {
    try {
      requireAuth(ctx);
      const supabase = supabaseForUser(ctx);

      const { data: group, error: groupError } = await supabase
        .from("groups")
        .select("id, name, currency, group_type, status, created_at")
        .eq("id", group_id)
        .maybeSingle();
      if (groupError) return errorResult(groupError.message);
      if (!group) return errorResult("Group not found or not accessible.");

      const { data: members } = await supabase
        .from("group_members")
        .select("id, user_id, display_name, role, status")
        .eq("group_id", group_id)
        .is("archived_at", null);

      const { data: expenses } = await supabase
        .from("expenses")
        .select("amount")
        .eq("group_id", group_id);

      const total = (expenses ?? []).reduce((sum, e) => sum + Number(e.amount ?? 0), 0);

      return textResult({
        group,
        members: members ?? [],
        expense_count: expenses?.length ?? 0,
        total_spent: total,
      });
    } catch (e) {
      return errorResult(e instanceof Error ? e.message : String(e));
    }
  },
});
