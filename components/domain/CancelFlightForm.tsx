"use client";

import { Alert } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { CurrencyDisplay } from "@/components/ui/format";
import { useActionState } from "react";
import { submitCancellationAction, type CancelActionState } from "@/app/(app)/flights/[id]/cancel/actions";

const initialState: CancelActionState = { error: null };

export function CancelFlightForm({
  bookingId,
  ticketAmount,
  charge,
  refund,
  policyName,
  currencySymbol,
}: {
  bookingId: number;
  ticketAmount: number;
  charge: number;
  refund: number;
  policyName: string | null;
  currencySymbol: string;
}) {
  const [state, formAction, pending] = useActionState(submitCancellationAction, initialState);

  return (
    <form action={formAction} className="space-y-5 pb-36 sm:pb-0">
      <input type="hidden" name="bookingId" value={bookingId} />

      {/* Charge calculation breakdown — figures come from Odoo, never
          re-derived on the client (spec: Odoo is sole source of truth). */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-3">
        <h3 className="text-sm font-semibold text-text-primary">Charge Calculation</h3>
        {policyName && <p className="text-xs text-text-secondary">Policy applied: {policyName}</p>}
        <dl className="space-y-2 text-sm">
          <Row label="Ticket Amount" value={<CurrencyDisplay amount={ticketAmount} symbol={currencySymbol} />} />
          <Row
            label="Cancellation Charge"
            value={<CurrencyDisplay amount={charge} symbol={currencySymbol} className="text-danger" />}
          />
          <div className="border-t border-border pt-2">
            <Row
              label="Estimated Refund"
              value={<CurrencyDisplay amount={refund} symbol={currencySymbol} className="text-success" />}
              bold
            />
          </div>
        </dl>
        <p className="text-xs text-text-secondary">
          This is an estimate. The final refund amount is confirmed by our team after review.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="reason" className="text-sm font-medium text-text-primary">
          Reason for cancellation (optional)
        </label>
        <textarea
          id="reason"
          name="reason"
          rows={3}
          className="w-full rounded-lg border border-border bg-white p-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Let us know why you're cancelling..."
        />
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 min-h-11">
        <input
          type="checkbox"
          name="confirm"
          required
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-border text-primary focus:ring-primary"
        />
        <span className="text-sm text-text-secondary">
          I understand the cancellation charge shown above and confirm I want to request cancellation of this
          booking. This request cannot be undone once submitted.
        </span>
      </label>

      {state.error && (
        <Alert tone="danger" title="Couldn't submit cancellation">
          {state.error}
        </Alert>
      )}

      {/* Sticky action bar on mobile so the primary action is always reachable.
          Sits above the fixed bottom nav (which is visible below lg and has
          its own z-40), not underneath it. */}
      <div className="fixed sm:static bottom-[calc(56px+env(safe-area-inset-bottom))] lg:bottom-0 left-0 right-0 sm:bg-transparent bg-card border-t sm:border-0 border-border p-4 sm:p-0 z-40">
        <Button type="submit" variant="danger" fullWidth loading={pending} size="lg">
          Submit Cancellation Request
        </Button>
      </div>
    </form>
  );
}

function Row({ label, value, bold }: { label: string; value: React.ReactNode; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-text-secondary">{label}</dt>
      <dd className={bold ? "text-base font-semibold text-text-primary" : "font-medium text-text-primary"}>
        {value}
      </dd>
    </div>
  );
}
