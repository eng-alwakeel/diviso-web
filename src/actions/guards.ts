import type { ActionGuard } from "./types";

/**
 * Placeholder guards. Wire to real auth/quota hooks later without
 * changing call sites or the FAB UI.
 */
export const requireAuth: ActionGuard = {
  id: "require_auth",
  check: () => true,
};

export const requireGroupMember: ActionGuard = {
  id: "require_group_member",
  check: (ctx) => Boolean(ctx.params.id),
};

export const requireQuota: ActionGuard = {
  id: "require_quota",
  check: () => true,
};
