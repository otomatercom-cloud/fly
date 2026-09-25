import { Card, StatusBadge } from "@/components/ui";
import { DateDisplay } from "@/components/ui/format";
import type { Passport } from "@/types/api";

export function PassportCard({ passport }: { passport: Passport }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-text-secondary">Passport Number</p>
          <p className="text-sm font-semibold text-text-primary">{passport.passport_number}</p>
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
