import {
  Building2,
  CalendarDays,
  Compass,
  LayoutDashboard,
  Sparkles,
  UserRound,
  Users,
  type LucideIcon
} from "lucide-react";
import type { Role } from "@/lib/types";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type NavGroup = {
  heading: string;
  items: NavItem[];
};

export const navigation: Record<Role, NavGroup[]> = {
  admin: [
    {
      heading: "Intelligence",
      items: [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/opportunities", label: "Opportunities", icon: Sparkles }
      ]
    },
    {
      heading: "Community",
      items: [
        { href: "/members", label: "Members", icon: Building2 },
        { href: "/events", label: "Events", icon: CalendarDays }
      ]
    }
  ],
  member: [
    {
      heading: "Explore",
      items: [
        { href: "/discover", label: "Discover", icon: Compass },
        { href: "/directory", label: "Directory", icon: Users }
      ]
    },
    {
      heading: "You",
      items: [
        { href: "/network", label: "Your network", icon: Sparkles },
        { href: "/profile", label: "Business profile", icon: UserRound }
      ]
    }
  ]
};

export const homeFor: Record<Role, string> = {
  admin: "/dashboard",
  member: "/discover"
};

export const searchFor: Record<Role, string> = {
  admin: "/members",
  member: "/directory"
};

export function labelForPath(role: Role, pathname: string) {
  const items = navigation[role].flatMap((group) => group.items);
  const match = items
    .filter((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0];
  return match?.label;
}
