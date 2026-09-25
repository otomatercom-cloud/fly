// Single place mapping a status "tone" (the same tone StatusBadge already
// uses, see components/ui/Badge.tsx) to the accent colors a card uses for
// its left border / tinted background / icon — so a passport, visa, or any
// future status-driven card all read the same "valid = green, expiring /
// pending = amber, expired / rejected = red, draft = neutral" language at a
// glance, not just via the small badge text.
export type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";

interface ToneAccent {
  border: string;
  bg: string;
  icon: string;
  ring: string;
}

const ACCENTS: Record<StatusTone, ToneAccent> = {
  neutral: {
    border: "border-l-slate-300",
    bg: "bg-slate-50",
    icon: "text-slate-500",
    ring: "ring-slate-200",
  },
  success: {
    border: "border-l-success",
    bg: "bg-success-bg",
    icon: "text-success",
    ring: "ring-success/20",
  },
  warning: {
    border: "border-l-warning",
    bg: "bg-warning-bg",
    icon: "text-warning",
    ring: "ring-warning/20",
  },
  danger: {
    border: "border-l-danger",
    bg: "bg-danger-bg",
    icon: "text-danger",
    ring: "ring-danger/20",
  },
  info: {
    border: "border-l-info",
    bg: "bg-info-bg",
    icon: "text-info",
    ring: "ring-info/20",
  },
};

export function toneAccent(tone: StatusTone): ToneAccent {
  return ACCENTS[tone] ?? ACCENTS.neutral;
}

export const PASSPORT_STATUS_TONE: Record<string, StatusTone> = {
  draft: "neutral",
  valid: "success",
  expiring_soon: "warning",
  expired: "danger",
};

export const VISA_STATUS_TONE: Record<string, StatusTone> = {
  draft: "neutral",
  submitted: "info",
  processing: "info",
  approved: "success",
  rejected: "danger",
  active: "success",
  expired: "danger",
  cancelled: "neutral",
};
