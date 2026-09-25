import { Card, StatusBadge } from "@/components/ui";
import { DateDisplay } from "@/components/ui/format";
import { cn } from "@/lib/utils";
import { PASSPORT_STATUS_TONE, toneAccent } from "@/lib/status-colors";
import type { Passport } from "@/types/api";
import { BadgeCheck, FileClock, ShieldAlert, Stamp } from "lucide-react";

const STATUS_ICON = {
  valid: BadgeCheck,
  expiring_soon: ShieldAlert,
  expired: ShieldAlert,
  draft: FileClock,
} as const;

export function PassportCard({ passport, index = 0 }: { passport: Passport; index?: number }) {
  const tone = PASSPORT_STATUS_TONE[passport.status] ?? "neutral";
  const accent = toneAccent(tone);
  const Icon = STATUS_ICON[passport.status as keyof typeof STATUS_ICON] ?? Stamp;

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
            <p className="text-xs text-text-secondary">Passport Number</p>
            <p className="text-sm font-semibold text-text-primary">{passport.passport_number}</p>
          </div>
        </div>
        <StatusBadge domain="passport" status={passport.status} />
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <dt className="text-xs text-text-secondary">Name</dt>
          <dd className="text-sm text-text-primary">{passport.full_name}</dd>
        </div>
        <div>
          <dt className="text-xs text-text-secondary">Nationality</dt>
          <dd className="text-sm text-text-primary">{passport.nationality ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-xs text-text-secondary">Issue Date</dt>
          <dd className="text-sm text-text-primary"><DateDisplay iso={passport.issue_date} /></dd>
        </div>
        <div>
          <dt className="text-xs text-text-secondary">Expiry Date</dt>
          <dd className="text-sm text-text-primary"><DateDisplay iso={passport.expiry_date} /></dd>
        </div>
      </dl>
    </Card>
  );
}
