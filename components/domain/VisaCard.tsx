import { Card, StatusBadge } from "@/components/ui";
import { DateDisplay, ExpiryCountdown } from "@/components/ui/format";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { VISA_STATUS_TONE, toneAccent } from "@/lib/status-colors";
import type { Visa } from "@/types/api";
import { BadgeCheck, Clock3, FileClock, Globe, XCircle } from "lucide-react";

const STATUS_ICON = {
  active: BadgeCheck,
  approved: BadgeCheck,
  submitted: Clock3,
  processing: Clock3,
  rejected: XCircle,
  expired: XCircle,
  cancelled: XCircle,
  draft: FileClock,
} as const;

export function VisaCard({ visa, index = 0 }: { visa: Visa; index?: number }) {
  const tone = VISA_STATUS_TONE[visa.status] ?? "neutral";
  const accent = toneAccent(tone);
  const Icon = STATUS_ICON[visa.status as keyof typeof STATUS_ICON] ?? Globe;

  return (
    <Card
      className={cn("border-l-4 animate-fade-in-up animate-stagger", accent.border)}
      style={{ "--stagger-index": index } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-full", accent.bg)}>
            <Icon className={cn("h-4.5 w-4.5", accent.icon)} />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">{visa.country}</p>
            <p className="text-xs text-text-secondary capitalize">{visa.visa_type} Visa</p>
          </div>
        </div>
        <StatusBadge domain="visa" status={visa.status} />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-text-secondary">Expires</p>
          <DateDisplay iso={visa.expiry_date} className="text-sm font-medium text-text-primary" />
        </div>
        <ExpiryCountdown iso={visa.expiry_date} />
      </div>

      <div className="mt-4">
        <LinkButton href={`/visa/${visa.id}`} variant="secondary" size="sm" fullWidth>
          View Details
        </LinkButton>
      </div>
    </Card>
  );
}
