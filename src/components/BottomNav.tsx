import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Users, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useActionMenu } from "@/components/actions/ActionMenuProvider";

// Module-level mount guard prevents duplicates if a legacy page still
// renders <BottomNav /> after AppLayout already mounted it.
let mountCount = 0;

export const BottomNav = () => {
  const location = useLocation();
  const { t } = useTranslation("common");
  const { toggle, actions } = useActionMenu();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    mountCount += 1;
    setShouldRender(mountCount === 1);
    return () => {
      mountCount -= 1;
    };
  }, []);

  if (!shouldRender) return null;

  const items = [
    { to: "/dashboard", label: t("nav.home"), icon: Home },
    { to: "/my-groups", label: t("nav.groups"), icon: Users },
  ];

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path.split("?")[0]);
  const linkCls = (active: boolean) =>
    `flex flex-col items-center justify-center gap-1 flex-1 py-2 text-xs transition-colors ${
      active ? "text-primary" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <nav
      className="fixed bottom-0 inset-x-0 mb-2"
      style={{ zIndex: "var(--z-bottomnav, 40)" as unknown as number }}
    >
      <div className="mx-auto max-w-2xl lg:max-w-6xl px-6 pb-[env(safe-area-inset-bottom)]">
        <div
          className="relative rounded-[28px]"
          style={{
            background: "rgba(15, 18, 24, 0.72)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.20)",
          }}
        >
          {/* FAB trigger only — menu lives in <FloatingActionMenu/> */}
          {actions.length > 0 && (
            <div
              className="absolute left-1/2 -translate-x-1/2 -top-6"
              style={{ zIndex: "var(--z-fam-trigger, 45)" as unknown as number }}
            >
              <button
                onClick={toggle}
                className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg ring-2 ring-background/80 flex items-center justify-center hover:opacity-90 transition-opacity active:scale-95"
                aria-label={t("add")}
              >
                <Plus className="h-7 w-7" strokeWidth={2.5} />
              </button>
            </div>
          )}

          {/* Tab Bar */}
          <ul className="flex items-stretch justify-between">
            {items.map(({ to, label, icon: Icon }, index) => (
              <li key={to} className={`flex-1 ${index === 0 ? "pe-6" : "ps-6"}`}>
                <NavLink
                  to={to}
                  aria-label={label}
                  className={() => linkCls(isActive(to))}
                  end={to === "/dashboard"}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-[10px]">{label}</span>
                  {isActive(to) && (
                    <span className="mt-1 h-1 w-6 rounded-full bg-primary" aria-hidden />
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
