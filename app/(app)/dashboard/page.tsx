import { EmptyState, StatusBadge } from "@/components/ui";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { DateDisplay, ExpiryCountdown } from "@/components/ui/format";
import { CancellationAlertBanner } from "@/components/domain/CancellationAlertBanner";
import { FlightRoute, FlightTimeMeta } from "@/components/domain/FlightRoute";
import { KpiCard } from "@/components/domain/KpiCard";
import { NotificationItem } from "@/components/domain/NotificationItem";
import { getDashboard, getMe } from "@/lib/odoo-client";
import { Bell, CircleAlert, FileUp, Plane, Stamp, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default async function DashboardPage() {
  const [data, partner] = await Promise.all([getDashboard(), getMe()]);
  const firstName = partner.name.split(" ")[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">
          {greeting()}, {firstName} 👋
        </h1>
        <p className="mt-0.5 text-sm text-text-secondary">Here&apos;s your travel overview.</p>
      </div>

      {/* 1. Flight cancellation/change alerts — highest priority, per spec */}
      {data.alerts.length > 0 && (
        <div className="space-y-3">
          {data.alerts.map((b) => (
            <CancellationAlertBanner key={b.id} booking={b} />
          ))}
        </div>
      )}

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KpiCard label="Upcoming Flights" value={data.kpis.upcoming_flights} icon={Plane} />
        <KpiCard label="Active Visas" value={data.kpis.active_visas} icon={Globe} />
        <KpiCard label="Pending Actions" value={data.kpis.pending_actions} icon={CircleAlert} tone="warning" />
        <KpiCard label="Notifications" value={data.kpis.unread_notifications} icon={Bell} tone={data.kpis.unread_notifications > 0 ? "danger" : "primary"} />
      </div>

      {/* 2. Next upcoming flight */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Flight</CardTitle>
        </CardHeader>
        {data.next_flight ? (
          <div>
            {data.next_flight.first_segment && (
              <>
                <FlightRoute segment={data.next_flight.first_segment} />
                <FlightTimeMeta segment={data.next_flight.first_segment} />
              </>
            )}
            <div className="mt-3 flex items-center justify-between">
              <StatusBadge domain="booking" status={data.next_flight.status} />
              <LinkButton href={`/flights/${data.next_flight.id}`} size="sm">
                View Flight
              </LinkButton>
            </div>
          </div>
        ) : (
          <EmptyState
            icon={Plane}
            title="No upcoming flights"
            description="You don't have any upcoming flight bookings."
            action={
              <LinkButton href="/flights" variant="secondary" size="sm">
                View Travel History
              </LinkButton>
            }
          />
        )}
      </Card>

      {/* 3 & 4. Visa / Passport status */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Visa Status</CardTitle>
          </CardHeader>
          {data.visas.length > 0 ? (
            <div className="space-y-4">
              {data.visas.map((visa) => (
                <div key={visa.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{visa.country}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StatusBadge domain="visa" status={visa.status} />
                      <DateDisplay iso={visa.expiry_date} className="text-xs text-text-secondary" />
                    </div>
                  </div>
                  <LinkButton href={`/visa/${visa.id}`} variant="secondary" size="sm">
                    View
                  </LinkButton>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={Stamp} title="No active visas" />
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Passport Status</CardTitle>
          </CardHeader>
          {data.passports.length > 0 ? (
            <div className="space-y-4">
              {data.passports.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{p.passport_number}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StatusBadge domain="passport" status={p.status} />
                      <ExpiryCountdown iso={p.expiry_date} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={Stamp} title="No passport on file" />
          )}
        </Card>
      </div>

      {/* 5. Important notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Important Notifications</CardTitle>
          <LinkButton href="/notifications" variant="ghost" size="sm">
            View All
          </LinkButton>
        </CardHeader>
        {data.notifications.length > 0 ? (
          <div className="space-y-2">
            {data.notifications.map((n) => (
              <NotificationItem key={n.id} notification={n} prominent />
            ))}
          </div>
        ) : (
          <EmptyState icon={Bell} title="No notifications" description="You're all caught up." />
        )}
      </Card>

      {/* 6. Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 gap-3">
          <LinkButton href="/flights" variant="secondary" icon={<Plane className="h-4 w-4" />}>
            View Flights
          </LinkButton>
          <LinkButton href="/documents" variant="secondary" icon={<FileUp className="h-4 w-4" />}>
            Upload Document
          </LinkButton>
          <LinkButton href="/visa" variant="secondary" icon={<Globe className="h-4 w-4" />}>
            View Visa
          </LinkButton>
          <LinkButton
            href={data.next_flight ? `/flights/${data.next_flight.id}` : "/flights"}
            variant="secondary"
            icon={<CircleAlert className="h-4 w-4" />}
          >
            Request Cancellation
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}
