"use client";

import { cn } from "@/lib/utils";
import { Plane } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from "./nav-items";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border lg:bg-card lg:shrink-0">
      <div className="flex items-center gap-2 px-5 h-16 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Plane className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight text-text-primary">FLT</p>
          <p className="text-[11px] leading-tight text-text-secondary">Flight &amp; Visa Management</p>
        </div>
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
                active ? "bg-light-blue text-primary" : "text-text-secondary hover:bg-light-blue hover:text-primary"
              )}
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
