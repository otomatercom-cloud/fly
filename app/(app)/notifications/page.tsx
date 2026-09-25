import { EmptyState } from "@/components/ui";
import { NotificationItem } from "@/components/domain/NotificationItem";
import { getNotifications } from "@/lib/odoo-client";
import { Bell } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Notifications" };

export default async function NotificationsPage() {
  const { items } = await getNotifications();
  const unreadCount = items.filter((n) => !n.is_read).length;

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">Notifications</h1>
        {unreadCount > 0 && (
          <p className="text-sm text-text-secondary mt-0.5">
            {unreadCount} unread notification{unreadCount === 1 ? "" : "s"}
          </p>
        )}
      </div>

      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} prominent />
          ))}
        </div>
      ) : (
        <EmptyState icon={Bell} title="You're all caught up" description="New notifications about your flights, visas, and documents will appear here." />
      )}
    </div>
  );
}
