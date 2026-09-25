"use client";

import { cn } from "@/lib/utils";
import type { Notification, NotificationCategory } from "@/types/api";
import {
  AlertOctagon,
  Bell,
  CheckCircle2,
  Clock,
  FileWarning,
  PlaneTakeoff,
  RefreshCcw,
  Stamp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { markNotificationReadAction } from "@/app/(app)/notifications/actions";

const CATEGORY_META: Record<NotificationCategory, { icon: typeof Bell; tone: string }> = {
  flight_cancellation: { icon: AlertOctagon, tone: "text-danger bg-danger-bg" },
  flight_delay: { icon: Clock, tone: "text-warning bg-warning-bg" },
  flight_change: { icon: PlaneTakeoff, tone: "text-warning bg-warning-bg" },
  visa_expiry: { icon: Stamp, tone: "text-warning bg-warning-bg" },
  passport_expiry: { icon: Stamp, tone: "text-warning bg-warning-bg" },
  document_required: { icon: FileWarning, tone: "text-warning bg-warning-bg" },
  cancellation_request_update: { icon: RefreshCcw, tone: "text-info bg-info-bg" },
  refund_update: { icon: CheckCircle2, tone: "text-success bg-success-bg" },
  rebooking_required: { icon: PlaneTakeoff, tone: "text-danger bg-danger-bg" },
  general_alert: { icon: Bell, tone: "text-info bg-info-bg" },
};

function relatedHref(notification: Notification): string | null {
  if (!notification.related_model || !notification.related_id) return null;
  const map: Record<string, string> = {
    "flt.flight.booking": `/flights/${notification.related_id}`,
    "flt.visa": `/visa/${notification.related_id}`,
    "flt.cancellation.request": `/cancellations/${notification.related_id}`,
  };
  return map[notification.related_model] ?? null;
}

export function NotificationItem({ notification, prominent }: { notification: Notification; prominent?: boolean }) {
  const [read, setRead] = useState(notification.is_read);
  const { icon: Icon, tone } = CATEGORY_META[notification.category] ?? CATEGORY_META.general_alert;
  const href = relatedHref(notification);
  const isCancellationAlert = notification.category === "flight_cancellation";

  async function handleOpen() {
    if (!read) {
      setRead(true);
      await markNotificationReadAction(notification.id);
    }
  }

  const content = (
    <div
      className={cn(
        "flex gap-3 rounded-xl border p-4 transition-colors",
        isCancellationAlert && prominent ? "border-danger/30 bg-danger-bg" : "border-border bg-card",
        !read && !isCancellationAlert && "bg-light-blue/40"
      )}
    >
      <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", tone)}>
        <Icon className="h-4.5 w-4.5" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-text-primary">{notification.title}</p>
          {!read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />}
        </div>
        <p className="mt-0.5 text-sm text-text-secondary">{notification.message}</p>
        <p className="mt-1.5 text-xs text-text-secondary">{timeAgo(notification.date)}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={handleOpen} className="block">
        {content}
      </Link>
    );
  }
  return (
    <button onClick={handleOpen} className="block w-full text-left">
      {content}
    </button>
  );
}

function timeAgo(iso: string | null) {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}
