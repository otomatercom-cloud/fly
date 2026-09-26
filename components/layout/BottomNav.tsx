"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOTTOM_NAV_ITEMS, DRAWER_EXTRA_ITEMS } from "./nav-items";
import { useNav } from "./nav-context";

export function BottomNav() {
  const pathname = usePathname();
  const { openDrawer, drawerOpen } = useNav();

  // "More" is highlighted when the active route lives in the drawer-only
  // list, so a page like Profile or Notifications still shows *something*
  // active in the bottom bar instead of nothing being highlighted.
  const moreActive =
    drawerOpen || DRAWER_EXTRA_ITEMS.some((item) => pathname === item.href || pathname.startsWith(item.href + "/"));

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 pb-[env(safe-area-inset-bottom)]"
      aria-label="Primary"
    >
      <ul className="grid grid-cols-5">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 min-h-14 text-[11px] font-medium",
                  active ? "text-primary" : "text-text-secondary"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-5 w-5" aria-hidden />
                {item.label}
              </Link>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            onClick={openDrawer}
            aria-haspopup="dialog"
            aria-expanded={drawerOpen}
            className={cn(
              "flex w-full flex-col items-center justify-center gap-1 py-2.5 min-h-14 text-[11px] font-medium",
              moreActive ? "text-primary" : "text-text-secondary"
            )}
          >
            <Menu className="h-5 w-5" aria-hidden />
            More
          </button>
        </li>
      </ul>
    </nav>
  );
}
