import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listGroups from "./tools/list-groups";
import getGroup from "./tools/get-group";
import listExpenses from "./tools/list-expenses";
import listBalances from "./tools/list-balances";
import listSettlements from "./tools/list-settlements";
import createExpense from "./tools/create-expense";

export default defineMcp({
  name: "diviso",
  title: "Diviso",
  version: "1.0.0",
  instructions:
    "Diviso is a group expense-splitting app. Every tool acts on behalf of the signed-in Diviso user. Use list_groups to find a group id, then get_group, list_expenses, list_balances and list_settlements to read its data, and create_expense to add a shared expense that is split equally between the active members. Amounts are in the group's own currency (usually SAR).",
  auth: auth.oauth.issuer({
    issuer: "https://iwthriddasxzbjddpzzf.supabase.co/auth/v1",
    // Supabase GoTrue mints project-wide `aud: "authenticated"` tokens.
    acceptedAudiences: ["authenticated"],
    resourceName: "Diviso",
    resourceDocumentation: "https://diviso.app/support",
  }),
  tools: [
    listGroups,
    getGroup,
    listExpenses,
    listBalances,
    listSettlements,
    createExpense,
  ],
});
