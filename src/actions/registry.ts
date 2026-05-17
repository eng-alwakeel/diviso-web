import type { ActionDescriptor, ActionRuntimeContext } from "./types";

const registry = new Map<string, ActionDescriptor>();

export function registerAction(action: ActionDescriptor): void {
  registry.set(action.id, action);
}

export function registerActions(actions: ActionDescriptor[]): void {
  actions.forEach(registerAction);
}

export function getAction(id: string): ActionDescriptor | undefined {
  return registry.get(id);
}

export function getActions(ids: string[]): ActionDescriptor[] {
  return ids
    .map((id) => registry.get(id))
    .filter((a): a is ActionDescriptor => Boolean(a));
}

export function resolveTarget(
  action: ActionDescriptor,
  ctx: ActionRuntimeContext,
): string {
  if (typeof action.target === "function") return action.target(ctx);
  // Replace :param tokens
  return action.target.replace(/:([a-zA-Z_]+)/g, (_, key) => ctx.params[key] ?? "");
}

export function listRegisteredIds(): string[] {
  return Array.from(registry.keys());
}
