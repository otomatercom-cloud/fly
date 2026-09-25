"use client";

import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { BadgePercent, Globe2, Plane, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

// Promotional banners shown on the dashboard. No ad backend exists yet —
// this is a small, self-contained rotating carousel with static content
// the business can edit here directly. If/when real promos need to be
// managed without a code change, this list should move behind a
// GET /api/flt/promotions endpoint (same pattern as everything else in
// odoo-client.ts) — swapping the data source wouldn't change this
// component's rendering at all.
interface Promo {
  id: string;
  icon: typeof Plane;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  gradient: string;
}

const PROMOS: Promo[] = [
  {
    id: "flight-deals",
    icon: Plane,
    eyebrow: "Limited Time",
    title: "Fly more, pay less",
    description: "Exclusive fares on Gulf & Southeast Asia routes this month.",
    cta: "View Flights",
    href: "/flights",
    gradient: "from-primary to-secondary",
  },
  {
    id: "visa-fast-track",
    icon: ShieldCheck,
    eyebrow: "New",
    title: "Fast-track visa processing",
    description: "Get your visa application reviewed and submitted faster.",
    cta: "Apply for Visa",
    href: "/visa/new",
    gradient: "from-navy to-primary",
  },
  {
    id: "passport-renewal",
    icon: Globe2,
    eyebrow: "Reminder",
    title: "Renew before you fly",
    description: "Keep your passport valid for at least 6 months before travel.",
    cta: "Add Passport",
    href: "/passport/new",
    gradient: "from-secondary to-info",
  },
  {
    id: "referral",
    icon: BadgePercent,
    eyebrow: "Offer",
    title: "Refer a friend, earn rewards",
    description: "Invite friends and family to FLT for exclusive perks.",
    cta: "Learn More",
    href: "/dashboard",
    gradient: "from-primary-hover to-navy",
  },
];

export function PromoCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % PROMOS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {PROMOS.map((promo) => {
          const Icon = promo.icon;
          return (
            <div key={promo.id} className="w-full flex-shrink-0">
              <div
                className={cn(
                  "relative flex items-center gap-4 overflow-hidden rounded-xl bg-gradient-to-br p-5 sm:p-6 text-white",
                  promo.gradient
                )}
              >
                {/* Subtle animated sheen for a bit of life without being noisy */}
                <div
                  className="pointer-events-none absolute inset-0 animate-shimmer opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                  }}
                />
                <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <div className="relative min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-white/75">{promo.eyebrow}</p>
                  <p className="mt-0.5 text-base sm:text-lg font-semibold leading-tight">{promo.title}</p>
                  <p className="mt-0.5 text-sm text-white/85 line-clamp-1">{promo.description}</p>
                </div>
                <LinkButton
                  href={promo.href}
                  size="sm"
                  className="relative flex-shrink-0 bg-white !text-text-primary hover:bg-white/90"
                >
                  {promo.cta}
                </LinkButton>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {PROMOS.map((promo, i) => (
          <button
            key={promo.id}
            aria-label={`Show promotion ${i + 1}`}
            onClick={() => setActive(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === active ? "w-5 bg-primary" : "w-1.5 bg-border"
            )}
          />
        ))}
      </div>
    </div>
  );
}
