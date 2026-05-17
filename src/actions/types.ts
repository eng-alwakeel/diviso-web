import type { LucideIcon } from "lucide-react";

export type ActionIntent = "navigate" | "modal" | "rpc";

export type ActionContextKey =
  | "dashboard"
  | "my-groups"
  | "group-details"
  | "expenses"
  | "plans"
  | "plan-details"
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
  /** Route string (may contain `:id` placeholders) or resolver function. */
  target: string | ((ctx: ActionRuntimeContext) => string);
  guards?: ActionGuard[];
  visibleWhen?: (ctx: ActionRuntimeContext) => boolean;
  analytics?: { event: string };
}

export type ActionContextDefinition = {
  key: ActionContextKey;
  actions: string[]; // action ids
};
