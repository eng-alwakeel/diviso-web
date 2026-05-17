import type { LucideIcon } from "lucide-react";

export type ActionIntent = "navigate" | "modal" | "rpc" | "emit";

export type ActionContextKey =
  | "dashboard"
  | "my-groups"
  | "group-details"
  | "group-settings"
  | "group-invite"
  | "expenses"
  | "balance-drilldown"
  | "plans"
  | "plan-details"
  | "trip-planner"
  | "financial-plan"
  | "referral"
  | "credit-store"
  | "my-tickets"
  | "notifications"
  | "pricing-protected"
  | "dice"
  | "form"
  | "none"
  | "default";

export interface ActionRuntimeContext {
  pathname: string;
  params: Record<string, string>;
  user?: { id: string } | null;
}

export interface ActionGuard {
  id: string;
  check: (ctx: ActionRuntimeContext) => boolean | Promise<boolean>;
}

export interface ActionDescriptor {
  id: string;
  labelKey: string; // i18n key under common.fab.*
  icon: LucideIcon;
  intent: ActionIntent;
  /**
   * For "navigate": route string (may contain `:id` placeholders) or resolver.
   * For "emit"/"modal"/"rpc": optional informational target; ActionItem
   * dispatches a window CustomEvent("diviso:action") so pages can react.
   */
  target: string | ((ctx: ActionRuntimeContext) => string);
  guards?: ActionGuard[];
  visibleWhen?: (ctx: ActionRuntimeContext) => boolean;
  analytics?: { event: string };
}

export type ActionContextDefinition = {
  key: ActionContextKey;
  actions: string[]; // action ids
};
