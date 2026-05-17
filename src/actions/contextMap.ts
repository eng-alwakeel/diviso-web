import type { ActionContextKey } from "./types";

/**
 * Default action ids per context. Pages can override at runtime via
 * useRegisterPageActions but most use the defaults.
 */
export const CONTEXT_ACTIONS: Record<ActionContextKey, string[]> = {
  dashboard: ["add_expense", "create_group", "create_plan"],
  "my-groups": ["create_group", "join_by_link", "create_plan"],
  "group-details": ["group_add_expense", "settlement", "invite_member"],
  expenses: ["add_expense"],
  plans: ["create_plan"],
  "plan-details": ["group_add_expense", "invite_member"],
  default: ["add_expense", "create_group", "create_plan"],
};

export function resolveContextFromPath(pathname: string): ActionContextKey {
  if (/^\/group\/[^/]+/.test(pathname)) return "group-details";
  if (pathname === "/dashboard") return "dashboard";
  if (pathname.startsWith("/my-groups")) return "my-groups";
  if (pathname.startsWith("/my-expenses") || pathname === "/add-expense") return "expenses";
  if (pathname === "/plans") return "plans";
  if (/^\/plan\/[^/]+/.test(pathname)) return "plan-details";
  return "default";
}
