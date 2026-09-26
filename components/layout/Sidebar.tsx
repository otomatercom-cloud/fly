"use client";

import { logoutAction } from "@/app/login/logout-action";
import { cn } from "@/lib/utils";
import { ChevronsLeft, LogOut, Plane } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "./nav-items";
import { useNav } from "./nav-context";

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed } = useNav();

  return (
    <aside
      className={cn(
        "hidden lg:flex lg:flex-col lg:shrink-0 bg-navy transition-[width] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]",
        collapsed ? "lg:w-[70px]" : "lg:w-[245px]"
      )}
    >
      <div className={cn("flex items-center h-16 border-b border-white/10", collapsed ? "justify-center px-2" : "gap-2 px-5")}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
          <Plane className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight text-white truncate">FLT</p>
            <p className="text-[11px] leading-tight text-sidebar-muted truncate">Flight &amp; Visa Management</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-1">
        {SIDEBAR_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                collapsed && "justify-center px-0",
                active
                  ? "bg-sidebar-active text-white shadow-[0_0_0_1px_rgba(8,124,240,0.4),0_4px_12px_-2px_rgba(8,124,240,0.5)]"
                  : "text-sidebar-text hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer: collapse toggle + sign out — spec's "settings/logout near the bottom" */}
      <div className="border-t border-white/10 p-3 space-y-1">
        <form action={logoutAction}>
          <button
            type="submit"
            title={collapsed ? "Sign out" : undefined}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-text transition-colors hover:bg-white/5 hover:text-white",
              collapsed && "justify-center px-0"
            )}
          >
            <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden />
            {!collapsed && "Sign out"}
          </button>
        </form>
        <button
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-muted transition-colors hover:bg-white/5 hover:text-white",
            collapsed && "justify-center px-0"
          )}
        >
          <ChevronsLeft className={cn("h-[18px] w-[18px] shrink-0 transition-transform duration-250", collapsed && "rotate-180")} aria-hidden />
          {!collapsed && "Collapse"}
        </button>
      </div>
    </aside>
  );
}
