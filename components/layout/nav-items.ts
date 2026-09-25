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

// Mobile bottom nav is intentionally a short, thumb-reachable set — not the
// full desktop sidebar squeezed down. Profile/menu lives in the top bar.
export const BOTTOM_NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/flights", label: "Flights", icon: Plane },
  { href: "/visa", label: "Visa", icon: Globe },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/notifications", label: "Alerts", icon: Bell },
] as const;
