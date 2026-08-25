import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { errorResult, requireAuth, supabaseForUser, textResult } from "../supabase";

export default defineTool({
  name: "create_expense",
  title: "Add an expense",
  description:
    "Add an expense to a Diviso group and split it equally between the active members. Ask the user to confirm the amount and description first.",
  inputSchema: {
    group_id: z.string().uuid().describe("The group's UUID."),
    amount: z.number().positive().describe("Total amount of the expense."),
    description: z.string().min(1).max(200).describe("What the expense was for."),
    payer_id: z
      .string()
      .uuid()
      .optional()
      .describe("User id of who paid. Defaults to the signed-in user."),
    spent_at: z
      .string()
      .optional()
      .describe("ISO date of the expense. Defaults to now."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ group_id, amount, description, payer_id, spent_at }, ctx) => {
    try {
      const userId = requireAuth(ctx);
      const supabase = supabaseForUser(ctx);

      const { data: group, error: groupError } = await supabase
        .from("groups")
        .select("id, currency, status")
        .eq("id", group_id)
        .maybeSingle();
      if (groupError) return errorResult(groupError.message);
      if (!group) return errorResult("Group not found or not accessible.");

      const { data: members, error: membersError } = await supabase
        .from("group_members")
        .select("user_id")
        .eq("group_id", group_id)
        .eq("status", "active")
        .is("archived_at", null);
      if (membersError) return errorResult(membersError.message);

      const participants = (members ?? [])
        .map((m) => m.user_id)
        .filter((id): id is string => Boolean(id));
      if (participants.length === 0) {
        return errorResult("This group has no active members to split the expense between.");
      }

      const { data: expense, error: expenseError } = await supabase
        .from("expenses")
        .insert({
          group_id,
          amount,
          currency: group.currency,
          description,
          created_by: userId,
          payer_id: payer_id ?? userId,
          spent_at: spent_at ?? new Date().toISOString(),
        })
        .select("id, amount, currency, description, payer_id, spent_at")
        .single();
      if (expenseError) return errorResult(expenseError.message);

      const share = Math.round((amount / participants.length) * 100) / 100;
      const splits = participants.map((memberId, index) => ({
        expense_id: expense.id,
        member_id: memberId,
        // Push any rounding remainder onto the first participant.
        share_amount:
          index === 0
            ? Math.round((amount - share * (participants.length - 1)) * 100) / 100
            : share,
      }));

      const { error: splitsError } = await supabase.from("expense_splits").insert(splits);
      if (splitsError) {
        await supabase.from("expenses").delete().eq("id", expense.id);
        return errorResult(`Could not split the expense: ${splitsError.message}`);
      }

      return textResult({ expense, split_between: participants.length, share_per_person: share });
    } catch (e) {
      return errorResult(e instanceof Error ? e.message : String(e));
    }
  },
});
