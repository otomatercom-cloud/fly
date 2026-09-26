"use client";

// Shared UI-only state for the app shell: whether the desktop sidebar is
// collapsed to icon-only, and whether the mobile off-canvas drawer is open.
// Nothing here touches data/auth — purely visual/navigation state, kept in
// a small context so TopBar's hamburger button and Sidebar's collapse
// toggle (separate client components, siblings under layout.tsx) can share
// it without prop-drilling through the async server layout.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const SIDEBAR_COLLAPSED_KEY = "flt-sidebar-collapsed";

interface NavContextValue {
  collapsed: boolean;
  toggleCollapsed: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const NavContext = createContext<NavContextValue | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  // Starts false (expanded) so server- and first-client-render markup
  // match; the real remembered value is applied right after mount to
  // avoid a hydration mismatch, then persisted on every change.
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // Intentional one-time sync from localStorage after mount, so the
    // server-rendered/first-client-render markup (always "expanded")
    // matches before the remembered value is applied — avoids a hydration
    // mismatch. This is the standard pattern for reading browser-only
    // storage into state; the cascading-render lint rule doesn't apply
    // here since this runs once on mount, not in response to a prop/state
    // change.
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCollapsed(window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1");
    } catch {
      // localStorage unavailable (private mode, etc.) — default expanded.
    }
  }, []);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? "1" : "0");
      } catch {
        // best-effort only
      }
      return next;
    });
  }

  return (
    <NavContext.Provider
      value={{
        collapsed,
        toggleCollapsed,
        drawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within NavProvider");
  return ctx;
}
