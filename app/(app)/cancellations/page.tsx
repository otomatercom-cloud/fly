import { Card, EmptyState, StatusBadge } from "@/components/ui";
import { CurrencyDisplay, DateDisplay } from "@/components/ui/format";
import { getCancellationRequests } from "@/lib/odoo-client";
import { XCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Cancellation Requests" };

export default async function CancellationsPage() {
  const { items } = await getCancellationRequests();

  return (
    <div className="space-y-5 max-w-2xl">
      <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">Cancellation Requests</h1>

      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((req) => (
            <Link key={req.id} href={`/cancellations/${req.id}`} className="block">
              <Card className="hover:border-primary/40 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate">{req.name}</p>
                    <p className="text-xs text-text-secondary">Booking {req.booking_name}</p>
                  </div>
                  <StatusBadge domain="cancellation" status={req.status} />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-text-secondary">
                    Requested <DateDisplay iso={req.request_date} />
                  </span>
                  <CurrencyDisplay amount={req.refund_amount} symbol={req.currency_symbol} className="font-semibold text-success" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={XCircle}
          title="No cancellation requests"
          description="Requests you submit for flight cancellations will appear here with their status and refund progress."
        />
      )}
    </div>
  );
}
