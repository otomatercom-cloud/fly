"use client";

import { logoutAction } from "@/app/login/logout-action";
import { cn } from "@/lib/utils";
import type { Partner } from "@/types/api";
import { Bell, ChevronDown, LogOut, Menu, PanelLeft, Plane, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useNav } from "./nav-context";

export function TopBar({ partner, unreadCount }: { partner: Partner; unreadCount: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openDrawer, toggleCollapsed } = useNav();
  const initials = partner.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-card/95 backdrop-blur px-4 sm:px-6">
      <div className="flex items-center gap-2">
        {/* Mobile: opens the off-canvas drawer */}
        <button
          onClick={openDrawer}
          aria-label="Open menu"
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full hover:bg-light-blue text-text-secondary"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
        {/* Desktop: collapse/expand the sidebar */}
        <button
          onClick={toggleCollapsed}
          aria-label="Toggle sidebar"
          className="hidden lg:flex h-10 w-10 items-center justify-center rounded-full hover:bg-light-blue text-text-secondary"
        >
          <PanelLeft className="h-5 w-5" aria-hidden />
        </button>

        {/* Mobile-only compact logo (sidebar carries it on desktop) */}
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Plane className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-text-primary">FLT</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-light-blue"
          aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        >
          <Bell className="h-5 w-5 text-text-secondary" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-light-blue min-h-11"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-light-blue text-xs font-semibold text-primary">
              {initials || <User className="h-4 w-4" />}
            </span>
            <span className="hidden sm:block text-sm font-medium text-text-primary">{partner.name}</span>
            <ChevronDown className={cn("h-4 w-4 text-text-secondary transition-transform", menuOpen && "rotate-180")} />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-lg">
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-text-primary hover:bg-light-blue"
                >
                  <User className="h-4 w-4" /> Profile
                </Link>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-danger hover:bg-danger-bg"
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
