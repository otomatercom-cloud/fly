import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Tone = "neutral" | "success" | "warning" | "danger" | "info";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-slate-100 text-slate-700",
  success: "bg-success-bg text-success",
  warning: "bg-warning-bg text-warning",
  danger: "bg-danger-bg text-danger",
  info: "bg-info-bg text-info",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

// ----------------------------------------------------------------------
// StatusBadge — the single place mapping a business status string to a
// label + tone, so every page shows the same badge for the same status.
// ----------------------------------------------------------------------
const BOOKING_STATUS: Record<string, { label: string; tone: Tone }> = {
  draft: { label: "Draft", tone: "neutral" },
  reserved: { label: "Reserved", tone: "info" },
  confirmed: { label: "Confirmed", tone: "success" },
  ticketed: { label: "Ticketed", tone: "success" },
  checked_in: { label: "Checked In", tone: "success" },
  completed: { label: "Completed", tone: "neutral" },
  cancellation_requested: { label: "Cancellation Requested", tone: "warning" },
  cancelled: { label: "Cancelled", tone: "danger" },
  airline_cancelled: { label: "Airline Cancelled", tone: "danger" },
  no_show: { label: "No Show", tone: "danger" },
};

const VISA_STATUS: Record<string, { label: string; tone: Tone }> = {
  draft: { label: "Draft", tone: "neutral" },
  submitted: { label: "Submitted", tone: "info" },
  processing: { label: "Processing", tone: "info" },
  approved: { label: "Approved", tone: "success" },
  rejected: { label: "Rejected", tone: "danger" },
  active: { label: "Active", tone: "success" },
  expired: { label: "Expired", tone: "danger" },
  cancelled: { label: "Cancelled", tone: "neutral" },
};

const PASSPORT_STATUS: Record<string, { label: string; tone: Tone }> = {
  draft: { label: "Draft", tone: "neutral" },
  valid: { label: "Valid", tone: "success" },
  expiring_soon: { label: "Expiring Soon", tone: "warning" },
  expired: { label: "Expired", tone: "danger" },
};

const DOCUMENT_STATUS: Record<string, { label: string; tone: Tone }> = {
  pending: { label: "Pending Review", tone: "warning" },
  verified: { label: "Verified", tone: "success" },
  rejected: { label: "Rejected", tone: "danger" },
  expired: { label: "Expired", tone: "danger" },
};

const CANCELLATION_STATUS: Record<string, { label: string; tone: Tone }> = {
  draft: { label: "Draft", tone: "neutral" },
  submitted: { label: "Submitted", tone: "info" },
  under_review: { label: "Under Review", tone: "warning" },
  approved: { label: "Approved", tone: "success" },
  rejected: { label: "Rejected", tone: "danger" },
  processed: { label: "Processed", tone: "success" },
  cancelled: { label: "Cancelled", tone: "neutral" },
};

const MAPS = {
  booking: BOOKING_STATUS,
  visa: VISA_STATUS,
  passport: PASSPORT_STATUS,
  document: DOCUMENT_STATUS,
  cancellation: CANCELLATION_STATUS,
} as const;

export function StatusBadge({
  domain,
  status,
  className,
}: {
  domain: keyof typeof MAPS;
  status: string;
  className?: string;
}) {
  const entry = MAPS[domain][status] ?? { label: status, tone: "neutral" as Tone };
  return (
    <Badge tone={entry.tone} className={className}>
      {entry.label}
    </Badge>
  );
}
