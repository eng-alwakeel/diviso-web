import { Receipt, UserPlus, CalendarPlus } from "lucide-react";
import { registerActions } from "../registry";
import { requireAuth } from "../guards";

registerActions([
  {
    id: "add_expense",
    labelKey: "fab.add_expense",
    icon: Receipt,
    intent: "navigate",
    target: "/add-expense",
    guards: [requireAuth],
    analytics: { event: "fab_add_expense" },
  },
  {
    id: "create_group",
    labelKey: "fab.create_group",
    icon: UserPlus,
    intent: "navigate",
    target: "/create-group",
    guards: [requireAuth],
    analytics: { event: "fab_create_group" },
  },
  {
    id: "create_plan",
    labelKey: "fab.create_plan",
    icon: CalendarPlus,
    intent: "navigate",
    target: "/create-plan",
    guards: [requireAuth],
    analytics: { event: "fab_create_plan" },
  },
]);

export {};
