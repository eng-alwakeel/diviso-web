import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { errorResult, requireAuth, supabaseForUser, textResult } from "../supabase";

export default defineTool({
  name: "list_balances",
  title: "List group balances",
  description:
    "Compute who owes whom in a Diviso group: per-member paid, share and net balance (positive = owed money).",
  inputSchema: {
    group_id: z.string().uuid().describe("The group's UUID."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ group_id }, ctx) => {
    try {
      requireAuth(ctx);
      const supabase = supabaseForUser(ctx);

      const { data: group } = await supabase
        .from("groups")
        .select("currency")
        .eq("id", group_id)
        .maybeSingle();

      const { data: members, error: membersError } = await supabase
        .from("group_members")
        .select("user_id, display_name")
        .eq("group_id", group_id)
        .is("archived_at", null);
      if (membersError) return errorResult(membersError.message);

      const { data: expenses, error: expensesError } = await supabase
        .from("expenses")
        .select("id, amount, payer_id")
        .eq("group_id", group_id);
      if (expensesError) return errorResult(expensesError.message);

      const expenseIds = (expenses ?? []).map((e) => e.id);
      const { data: splits } = expenseIds.length
        ? await supabase
            .from("expense_splits")
            .select("expense_id, member_id, share_amount")
            .in("expense_id", expenseIds)
        : { data: [] as { member_id: string; share_amount: number }[] };

      const paid = new Map<string, number>();
      for (const e of expenses ?? []) {
        if (!e.payer_id) continue;
        paid.set(e.payer_id, (paid.get(e.payer_id) ?? 0) + Number(e.amount ?? 0));
      }
      const owes = new Map<string, number>();
      for (const s of splits ?? []) {
        owes.set(s.member_id, (owes.get(s.member_id) ?? 0) + Number(s.share_amount ?? 0));
      }

      const balances = (members ?? [])
        .filter((m) => m.user_id)
        .map((m) => {
          const p = paid.get(m.user_id as string) ?? 0;
          const o = owes.get(m.user_id as string) ?? 0;
          return {
            user_id: m.user_id,
            name: m.display_name,
            paid: Math.round(p * 100) / 100,
            share: Math.round(o * 100) / 100,
            net: Math.round((p - o) * 100) / 100,
          };
        });

      return textResult({ currency: group?.currency ?? "SAR", balances });
    } catch (e) {
      return errorResult(e instanceof Error ? e.message : String(e));
    }
  },
});
