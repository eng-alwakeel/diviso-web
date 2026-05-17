import { Outlet } from "react-router-dom";
import { ActionMenuProvider } from "@/components/actions/ActionMenuProvider";
import { FloatingActionMenu } from "@/components/actions/FloatingActionMenu";
import { BottomNav } from "@/components/BottomNav";

/**
 * Unified layout for authenticated app screens.
 * Provides ActionMenu context, mounts a single BottomNav and FloatingActionMenu.
 * Pages should NOT import BottomNav directly anymore.
 */
export function AppLayout() {
  return (
    <ActionMenuProvider>
      <Outlet />
      <BottomNav />
      <FloatingActionMenu />
    </ActionMenuProvider>
  );
}

export default AppLayout;
