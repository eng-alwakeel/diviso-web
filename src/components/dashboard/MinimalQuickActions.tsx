import { QuickActionsPanel } from "@/components/actions/QuickActionsPanel";

/** Legacy alias — delegates to QuickActionsPanel in inline mode. */
export function MinimalQuickActions() {
  return <QuickActionsPanel variant="inline" ids={["add_expense", "create_group"]} />;
}
