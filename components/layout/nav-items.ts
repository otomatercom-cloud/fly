import { Bell, FileText, Globe, Home, Plane, Stamp, UserCircle, XCircle } from "lucide-react";

export const SIDEBAR_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/flights", label: "Flights", icon: Plane },
  { href: "/visa", label: "Visa", icon: Globe },
  { href: "/passport", label: "Passport", icon: Stamp },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/cancellations", label: "Cancellations", icon: XCircle },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Profile", icon: UserCircle },
] as const;

// Mobile bottom nav: thumb-reachable slots for the most-used destinations.
// Passport was previously missing here — that was the reported "passport
// menu not showing" bug (BottomNav simply had no Passport tab, nothing to
// do with footer CSS). Now it's a direct tab; everything else (Documents,
// Cancellations, Notifications, Profile) lives behind "More", which opens
// the mobile off-canvas drawer (see MobileDrawer.tsx).
export const BOTTOM_NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/flights", label: "Flights", icon: Plane },
  { href: "/passport", label: "Passport", icon: Stamp },
  { href: "/visa", label: "Visa", icon: Globe },
] as const;

// Items shown inside the mobile drawer ("More" sheet) — the rest of the
// full nav list that doesn't fit in the bottom bar.
export const DRAWER_EXTRA_ITEMS = [
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/cancellations", label: "Cancellations", icon: XCircle },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Profile", icon: UserCircle },
] as const;
