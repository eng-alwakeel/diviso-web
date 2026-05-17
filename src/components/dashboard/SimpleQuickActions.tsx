import { useTranslation } from "react-i18next";
import { QuickActionsPanel } from "@/components/actions/QuickActionsPanel";

/** Legacy alias — delegates to QuickActionsPanel in list mode. */
export const SimpleQuickActions = () => {
  const { t } = useTranslation("dashboard");
  return (
    <QuickActionsPanel
      variant="list"
      ids={["add_expense", "create_group", "create_plan"]}
      title={t("quick_actions.title")}
    />
  );
};
