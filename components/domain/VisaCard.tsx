import { Card, StatusBadge } from "@/components/ui";
import { DateDisplay, ExpiryCountdown } from "@/components/ui/format";
import { LinkButton } from "@/components/ui/Button";
import type { Visa } from "@/types/api";

export function VisaCard({ visa }: { visa: Visa }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-text-primary">{visa.country}</p>
          <p className="text-xs text-text-secondary capitalize">{visa.visa_type} Visa</p>
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
