import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover";
import { useActionMenu } from "./ActionMenuProvider";
import { ActionItem } from "./ActionItem";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Renders the menu opened by the BottomNav FAB.
 * - Mobile: bottom Drawer (sheet)
 * - Desktop: floating Popover anchored to bottom-right
 */
export function FloatingActionMenu() {
  const { isOpen, close, actions, runtimeContext } = useActionMenu();
  const isMobile = useIsMobile();

  if (actions.length === 0) return null;

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(o) => !o && close()}>
        <DrawerContent className="pb-8">
          <div className="mx-auto w-full max-w-sm px-4 pt-4">
            <div className="flex flex-col gap-2">
              {actions.map((a) => (
                <ActionItem
                  key={a.id}
                  action={a}
                  runtimeContext={runtimeContext}
                  onAfterRun={close}
                />
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={(o) => !o && close()}>
      <PopoverAnchor asChild>
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 pointer-events-none" />
      </PopoverAnchor>
      <PopoverContent
        align="center"
        side="top"
        className="w-72 p-2"
        style={{ zIndex: 70 }}
      >
        <div className="flex flex-col gap-1">
          {actions.map((a) => (
            <ActionItem
              key={a.id}
              action={a}
              runtimeContext={runtimeContext}
              onAfterRun={close}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
