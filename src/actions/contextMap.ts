import type { ActionContextKey } from "./types";

/**
 * Default action ids per context — max 3 per page.
 * Pages can override at runtime via useRegisterPageActions.
 */
export const CONTEXT_ACTIONS: Record<ActionContextKey, string[]> = {
  dashboard: ["add_expense", "create_group", "create_plan"],
  "my-groups": ["create_group", "join_by_link", "create_plan"],
  "group-details": ["group_add_expense", "settlement", "invite_member"],
  "group-settings": ["invite_member", "edit_group", "archive_group"],
  "group-invite": ["join_by_link", "invite_member"],
  expenses: ["add_expense", "filter_expenses", "export_summary"],
  "balance-drilldown": ["settlement", "export_summary", "filter_expenses"],
  plans: ["create_plan", "create_trip_plan", "convert_plan_to_group"],
  "plan-details": ["group_add_expense", "share_plan", "convert_plan_to_group"],
  "trip-planner": ["add_plan_item", "share_plan", "convert_plan_to_group"],
  "financial-plan": ["add_plan_item", "create_plan", "export_summary"],
  referral: ["share_referral", "copy_referral_code"],
  "credit-store": ["buy_credits"],
  "my-tickets": ["create_ticket"],
  notifications: ["mark_notifications_read", "notification_settings"],
  "pricing-protected": ["buy_credits"],
  dice: ["create_plan", "share_plan"],
  // Pages where the FAB should NOT appear
  form: [],
  none: [],
  default: ["add_expense", "create_group", "create_plan"],
};

export function resolveContextFromPath(pathname: string): ActionContextKey {
  // Form / read-only pages → no FAB
  if (
    pathname === "/add-expense" ||
    pathname === "/create-group" ||
    pathname === "/create-plan" ||
    pathname === "/create-unified-budget" ||
    pathname === "/settings" ||
    pathname === "/changelog" ||
    pathname === "/pricing" ||
    pathname === "/pricing-chart"
  ) {
    return "form";
  }

  // Group sub-routes (order matters: more specific first)
  if (/^\/group\/[^/]+\/settings/.test(pathname)) return "group-settings";
  if (/^\/group\/[^/]+\/invite/.test(pathname)) return "group-invite";
  if (/^\/group\/[^/]+/.test(pathname)) return "group-details";

  if (pathname === "/dashboard") return "dashboard";
  if (pathname.startsWith("/my-groups")) return "my-groups";
  if (/^\/my-expenses\/[^/]+/.test(pathname)) return "balance-drilldown";
  if (pathname === "/my-expenses") return "expenses";

  if (pathname === "/plans") return "plans";
  if (/^\/plan\/[^/]+/.test(pathname)) return "plan-details";
  if (pathname === "/trip-planner") return "trip-planner";
  if (pathname === "/financial-plan") return "financial-plan";

  if (pathname === "/referral") return "referral";
  if (pathname === "/credit-store") return "credit-store";
  if (pathname === "/my-tickets") return "my-tickets";
  if (pathname === "/notifications") return "notifications";
  if (pathname === "/pricing-protected") return "pricing-protected";
  if (pathname === "/dice") return "dice";

  return "default";
}
