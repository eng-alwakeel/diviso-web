import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation, useParams } from "react-router-dom";
import "@/actions"; // ensure registry populated
import { getActions } from "@/actions/registry";
import type { ActionDescriptor, ActionContextKey, ActionRuntimeContext } from "@/actions/types";
import { CONTEXT_ACTIONS, resolveContextFromPath } from "@/actions/contextMap";

interface ActionMenuContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setActionIds: (ids: string[] | null) => void;
  actions: ActionDescriptor[];
  runtimeContext: ActionRuntimeContext;
}

const ActionMenuContext = createContext<ActionMenuContextValue | null>(null);

export function ActionMenuProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [overrideIds, setOverrideIds] = useState<string[] | null>(null);

  const runtimeContext = useMemo<ActionRuntimeContext>(
    () => ({
      pathname: location.pathname,
      params: params as Record<string, string>,
    }),
    [location.pathname, params],
  );

  const contextKey: ActionContextKey = useMemo(
    () => resolveContextFromPath(location.pathname),
    [location.pathname],
  );

  const actionIds = overrideIds ?? CONTEXT_ACTIONS[contextKey] ?? CONTEXT_ACTIONS.default;
  const actions = useMemo(() => getActions(actionIds), [actionIds]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const value = useMemo<ActionMenuContextValue>(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((v) => !v),
      setActionIds: (ids) => setOverrideIds(ids),
      actions,
      runtimeContext,
    }),
    [isOpen, actions, runtimeContext],
  );

  return <ActionMenuContext.Provider value={value}>{children}</ActionMenuContext.Provider>;
}

export function useActionMenu(): ActionMenuContextValue {
  const ctx = useContext(ActionMenuContext);
  if (!ctx) {
    // Safe fallback so legacy pages outside AppLayout don't crash.
    return {
      isOpen: false,
      open: () => {},
      close: () => {},
      toggle: () => {},
      setActionIds: () => {},
      actions: [],
      runtimeContext: { pathname: "/", params: {} },
    };
  }
  return ctx;
}

/**
 * Pages call this to override the default action set for their context.
 * Cleans up on unmount, restoring path-based defaults.
 */
export function useRegisterPageActions(_contextKey: ActionContextKey, ids: string[]) {
  const ctx = useContext(ActionMenuContext);
  const key = ids.join("|");
  useEffect(() => {
    if (!ctx) return;
    ctx.setActionIds(ids);
    return () => ctx.setActionIds(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
