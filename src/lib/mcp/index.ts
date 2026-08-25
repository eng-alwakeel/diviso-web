import { createMcpHandler } from "@lovable.dev/mcp-js";
import listGroups from "./tools/list-groups";
import getGroup from "./tools/get-group";
import listExpenses from "./tools/list-expenses";
import listBalances from "./tools/list-balances";
import listSettlements from "./tools/list-settlements";
import createExpense from "./tools/create-expense";

export default createMcpHandler({
  name: "diviso",
  version: "1.0.0",
  instructions:
    "Diviso is a group expense-splitting app. Use list_groups to find a group, then get_group, list_expenses, list_balances and list_settlements to read its data, and create_expense to add a new shared expense (split equally between active members).",
  tools: [
    listGroups,
    getGroup,
    listExpenses,
    listBalances,
    listSettlements,
    createExpense,
  ],
});
