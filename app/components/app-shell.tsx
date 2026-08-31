import Link from "next/link";
import Image from "next/image";
import { BarChart3, CalendarDays, Compass, LayoutDashboard, Settings, Users, Zap } from "lucide-react";
import { switchRole } from "@/app/actions/auth";
import type { Role } from "@/lib/types";
import collabspaceLogo from "@/app/Collabspace-Logo.webp";

const adminNav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/members", label: "Members", icon: Users },
  { href: "/opportunities", label: "Opportunities", icon: Zap },
  { href: "/events", label: "Events", icon: CalendarDays }
];

const memberNav = [
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/directory", label: "Directory", icon: Users },
  { href: "/network", label: "Network", icon: BarChart3 },
  { href: "/profile", label: "Profile", icon: Settings }
];

export function AppShell({
  children,
  role
}: {
  children: React.ReactNode;
  role: Role;
}) {
  const nav = role === "admin" ? adminNav : memberNav;
  return (
    <div className="min-h-screen lg:flex">
      <aside className="border-b border-[var(--border)] bg-[#171717] text-white lg:fixed lg:inset-y-0 lg:w-72 lg:border-b-0 lg:border-r lg:border-neutral-800">
        <div className="flex h-full flex-col px-5 py-6">
          <Link href={role === "admin" ? "/dashboard" : "/discover"} className="block">
            <Image
              src={collabspaceLogo}
              alt="CollabSpace"
              className="h-auto w-40 brightness-0 invert"
              priority
            />
            <div className="mt-5 text-2xl font-semibold">Operating System</div>
          </Link>
          <nav className="mt-8 grid gap-1">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm text-neutral-300 transition hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="my-6 border-t border-neutral-800" />
          <form
            action={async () => {
              "use server";
              await switchRole(role === "admin" ? "member" : "admin");
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-sm text-neutral-300 transition hover:bg-white/10 hover:text-white"
            >
              <Compass className="h-4 w-4" />
              {role === "admin" ? "Member Experience" : "Admin View"}
            </button>
          </form>
          <div className="mt-auto pt-8 text-xs text-neutral-500">
            Demo workspace
          </div>
        </div>
      </aside>
      <main className="w-full px-5 py-6 lg:ml-72 lg:px-10 lg:py-9">{children}</main>
    </div>
  );
}
