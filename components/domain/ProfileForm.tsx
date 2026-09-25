"use client";

import { Alert } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import type { Partner } from "@/types/api";
import { useActionState } from "react";
import { updateProfileAction, type ProfileActionState } from "@/app/(app)/profile/actions";

const initialState: ProfileActionState = { error: null, success: false };

export function ProfileForm({ partner }: { partner: Partner }) {
  const [state, formAction, pending] = useActionState(updateProfileAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
        <h3 className="text-sm font-semibold text-text-primary">Account</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ReadOnlyField label="Full Name" value={partner.name} />
          <ReadOnlyField label="Email" value={partner.email ?? "—"} />
          <ReadOnlyField label="Nationality" value={partner.nationality ?? "—"} />
          <ReadOnlyField label="Country" value={partner.country ?? "—"} />
        </div>
        <p className="text-xs text-text-secondary">
          These details are managed by our team. Contact support if any of this needs to change.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
        <h3 className="text-sm font-semibold text-text-primary">Contact Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField label="Phone" name="phone" defaultValue={partner.phone ?? ""} type="tel" />
          <TextField label="City" name="city" defaultValue={partner.city ?? ""} />
          <TextField label="Street Address" name="street" defaultValue={partner.street ?? ""} className="sm:col-span-2" />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
        <h3 className="text-sm font-semibold text-text-primary">Emergency Contact</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField label="Name" name="emergency_contact_name" defaultValue={partner.emergency_contact_name ?? ""} />
          <TextField label="Phone" name="emergency_contact_phone" defaultValue={partner.emergency_contact_phone ?? ""} type="tel" />
        </div>
      </div>

      {state.error && (
        <Alert tone="danger" title="Couldn't save changes">
          {state.error}
        </Alert>
      )}
      {state.success && (
        <Alert tone="success" title="Profile updated">
          Your changes have been saved.
        </Alert>
      )}

      <Button type="submit" loading={pending} fullWidth size="lg">
        Save Changes
      </Button>
    </form>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-text-secondary">{label}</p>
      <p className="text-sm font-medium text-text-primary mt-1">{value}</p>
    </div>
  );
}

function TextField({
  label,
  name,
  defaultValue,
  type = "text",
  className,
}: {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-lg border border-border bg-white p-3 text-sm text-text-primary min-h-11 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
