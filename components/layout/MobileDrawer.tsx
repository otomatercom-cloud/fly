"use client";

import { logoutAction } from "@/app/login/logout-action";
import { cn } from "@/lib/utils";
import { LogOut, Plane, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useNav } from "./nav-context";
import { SIDEBAR_ITEMS } from "./nav-items";

// Mobile off-canvas drawer (spec §5): full nav list, backdrop, slide-in from
// the left, closes on backdrop click, Escape, or navigating to an item.
export function MobileDrawer() {
  const { drawerOpen, closeDrawer } = useNav();
  const pathname = usePathname();

  useEffect(() => {
    if (!drawerOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, closeDrawer]);

  // Close automatically whenever the route changes (nav-item click).
  useEffect(() => {
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      className={cn(
        "lg:hidden fixed inset-0 z-50 transition-opacity duration-250",
        drawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-hidden={!drawerOpen}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={closeDrawer} />

      <aside
        className={cn(
          "absolute inset-y-0 left-0 w-[78%] max-w-[300px] bg-navy flex flex-col shadow-2xl transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between gap-2 px-5 h-16 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Plane className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight text-white">FLT</p>
              <p className="text-[11px] leading-tight text-sidebar-muted">Flight &amp; Visa Management</p>
            </div>
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-sidebar-text hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-active text-white shadow-[0_0_0_1px_rgba(8,124,240,0.4),0_4px_12px_-2px_rgba(8,124,240,0.5)]"
                    : "text-sidebar-text hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-text hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden />
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}
