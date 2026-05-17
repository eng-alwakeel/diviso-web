import { Receipt, Handshake, UserPlus, Link as LinkIcon } from "lucide-react";
import { registerActions } from "../registry";
import { requireAuth, requireGroupMember } from "../guards";

registerActions([
  {
    id: "group_add_expense",
    labelKey: "fab.add_expense",
    icon: Receipt,
    intent: "navigate",
    target: (ctx) => `/add-expense?group=${ctx.params.id ?? ""}`,
    guards: [requireAuth, requireGroupMember],
    analytics: { event: "fab_group_add_expense" },
  },
  {
    id: "settlement",
    labelKey: "fab.settlement",
    icon: Handshake,
    intent: "navigate",
    target: (ctx) => `/group/${ctx.params.id ?? ""}/settlement`,
    guards: [requireAuth, requireGroupMember],
    analytics: { event: "fab_settlement" },
  },
  {
    id: "invite_member",
    labelKey: "fab.invite_member",
    icon: UserPlus,
    intent: "navigate",
    target: (ctx) => `/group/${ctx.params.id ?? ""}/invite`,
    guards: [requireAuth, requireGroupMember],
    analytics: { event: "fab_invite_member" },
  },
  {
    id: "join_by_link",
    labelKey: "fab.join_by_link",
    icon: LinkIcon,
    intent: "navigate",
    target: "/join",
    guards: [requireAuth],
    analytics: { event: "fab_join_by_link" },
  },
]);

export {};
