import { QuickActionsPanel } from "@/components/actions/QuickActionsPanel";

/** Legacy alias — delegates to the unified QuickActionsPanel. */
export const QuickActions = () => (
  <QuickActionsPanel
    variant="grid"
    ids={["add_expense", "create_group", "create_plan"]}
    title="إجراءات سريعة"
  />
);
