import { useTranslation } from "react-i18next";
import type { ActionDescriptor, ActionRuntimeContext } from "@/actions/types";
import { resolveTarget } from "@/actions/registry";
import { useNavigate } from "react-router-dom";

interface ActionItemProps {
  action: ActionDescriptor;
  runtimeContext: ActionRuntimeContext;
  onAfterRun?: () => void;
  variant?: "row" | "tile";
}

export function ActionItem({ action, runtimeContext, onAfterRun, variant = "row" }: ActionItemProps) {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const Icon = action.icon;
  const label = t(action.labelKey);

  const handle = async () => {
    if (action.guards) {
      for (const g of action.guards) {
        const ok = await g.check(runtimeContext);
        if (!ok) return;
      }
    }
    if (action.intent === "navigate") {
      navigate(resolveTarget(action, runtimeContext));
    } else {
      // emit / modal / rpc → broadcast a window event so pages can react
      // without us having to import their internal logic here.
      try {
        window.dispatchEvent(
          new CustomEvent("diviso:action", {
            detail: {
              id: action.id,
              intent: action.intent,
              target: typeof action.target === "string" ? action.target : undefined,
              ctx: runtimeContext,
            },
          }),
        );
      } catch {
        // no-op (SSR / restricted env)
      }
    }
    onAfterRun?.();
  };

  if (variant === "tile") {
    return (
      <button
        onClick={handle}
        className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 hover:bg-accent transition-colors"
      >
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handle}
      className="flex items-center gap-4 rounded-xl px-4 py-4 text-foreground hover:bg-accent transition-colors w-full text-start"
    >
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <span className="text-base font-semibold">{label}</span>
    </button>
  );
}
