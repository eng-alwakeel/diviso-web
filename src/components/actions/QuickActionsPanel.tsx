import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActionMenu } from "./ActionMenuProvider";
import { ActionItem } from "./ActionItem";
import { getActions } from "@/actions/registry";
import "@/actions";

interface QuickActionsPanelProps {
  ids?: string[];
  variant?: "grid" | "list" | "inline";
  title?: string;
}

/**
 * Inline panel that exposes the same actions used by the FAB,
 * without opening a drawer. Replaces the old QuickActions / SimpleQuickActions
 * / MinimalQuickActions components.
 */
export function QuickActionsPanel({ ids, variant = "grid", title }: QuickActionsPanelProps) {
  const { runtimeContext, actions: ctxActions } = useActionMenu();
  const actions = ids ? getActions(ids) : ctxActions;

  if (actions.length === 0) return null;

  if (variant === "inline") {
    return (
      <div className="flex gap-3">
        {actions.map((a) => (
          <div key={a.id} className="flex-1">
            <ActionItem action={a} runtimeContext={runtimeContext} variant="tile" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <Card className="border border-border">
        {title && (
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent className="space-y-2">
          {actions.map((a) => (
            <ActionItem key={a.id} action={a} runtimeContext={runtimeContext} />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border border-border bg-card">
      {title && (
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {actions.map((a) => (
            <ActionItem key={a.id} action={a} runtimeContext={runtimeContext} variant="tile" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
