import { BottomNav } from "@/components/layout/BottomNav";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { NavProvider } from "@/components/layout/nav-context";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { ApiError, getMe, getNotifications } from "@/lib/odoo-client";
import { clearSessionId } from "@/lib/session";
import { redirect } from "next/navigation";

// Every page here is per-customer data behind a session. In real mode
// (ODOO_BASE_URL set) cookies() usage already makes these dynamic
// automatically; this forces the same in mock mode too, so a production
// build never serves a build-time-frozen snapshot of mock data instead of
// picking up state changes from actions (mark-as-read, cancellation
// submit, profile update).
export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  let partner, notifications;
  try {
    [partner, notifications] = await Promise.all([getMe(), getNotifications()]);
  } catch (err) {
    if (err instanceof ApiError && (err.status === 401 || err.code === "session_expired")) {
      await clearSessionId();
      redirect("/login");
    }
    throw err;
  }
  const unreadCount = notifications.items.filter((n) => !n.is_read).length;

  return (
    <NavProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col min-w-0">
          <TopBar partner={partner} unreadCount={unreadCount} />
          <main className="flex-1 px-4 py-5 pb-24 sm:px-6 sm:py-6 lg:pb-6 max-w-6xl w-full mx-auto">
            {children}
          </main>
          <BottomNav />
        </div>
        <MobileDrawer />
      </div>
    </NavProvider>
  );
}
