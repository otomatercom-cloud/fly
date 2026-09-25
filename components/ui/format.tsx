export function formatDate(iso: string | null | undefined, opts?: Intl.DateTimeFormatOptions) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", opts ?? { day: "2-digit", month: "short", year: "numeric" });
}

export function formatTime(iso: string | null | undefined) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export function DateDisplay({ iso, className }: { iso: string | null | undefined; className?: string }) {
  return <span className={className}>{formatDate(iso)}</span>;
}

export function DateTimeDisplay({ iso, className }: { iso: string | null | undefined; className?: string }) {
  return (
    <span className={className}>
      {formatDate(iso)} · {formatTime(iso)}
    </span>
  );
}

export function CurrencyDisplay({
  amount,
  symbol = "₹",
  className,
}: {
  amount: number;
  symbol?: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {symbol}
      {amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
    </span>
  );
}

/** Days remaining until an expiry date; never shown as an aggressive
 * countdown for already-expired documents (spec §Visa Detail Page). */
export function daysUntil(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const target = new Date(iso);
  if (Number.isNaN(target.getTime())) return null;
  const now = new Date();
  const diffMs = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate()) -
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round(diffMs / 86400000);
}

export function ExpiryCountdown({ iso }: { iso: string | null | undefined }) {
  const days = daysUntil(iso);
  if (days === null) return null;
  if (days < 0) {
    return <span className="text-sm font-medium text-danger">Expired</span>;
  }
  return (
    <span className="text-sm text-text-secondary">
      Expires in <span className="font-semibold text-text-primary">{days} day{days === 1 ? "" : "s"}</span>
    </span>
  );
}
