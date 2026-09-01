"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeftRight, Menu, Presentation, Search, X } from "lucide-react";
import { demoLogin } from "@/app/actions/auth";
import { homeFor, labelForPath, navigation, searchFor } from "@/app/components/nav-config";
import collabspaceLogo from "@/app/Collabspace-Logo.webp";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/types";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Brand({ role }: { role: Role }) {
  return (
    <Link
      href={homeFor[role]}
      className="flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-white/5"
    >
      <Image
        src={collabspaceLogo}
        alt=""
        className="h-8 w-auto rounded-[6px]"
        priority
      />
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-semibold leading-tight text-white">
          CollabOS
        </span>
        <span className="block truncate text-[11px] leading-tight text-nav-ink">
          CollabSpace · Ottawa
        </span>
      </span>
    </Link>
  );
}

function NavList({ role, onNavigate }: { role: Role; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="grid gap-5">
      {navigation[role].map((group) => (
        <div key={group.heading}>
          <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-nav-ink/70">
            {group.heading}
          </div>
          <div className="grid gap-0.5">
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] transition-colors",
                    active
                      ? "bg-white/10 font-medium text-white"
                      : "text-nav-ink hover:bg-white/5 hover:text-white"
                  )}
                >
                  {active ? (
                    <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-brand" />
                  ) : null}
                  <Icon className={cn("h-4 w-4", active ? "text-brand" : "text-nav-ink")} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

function RoleFooter({ role }: { role: Role }) {
  const other: Role = role === "admin" ? "member" : "admin";
  return (
    <div className="border-t border-nav-line pt-3">
      <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/10 text-[11px] font-semibold text-white">
          {role === "admin" ? "ED" : "SC"}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12px] font-medium leading-tight text-white">
            {role === "admin" ? "Emile Demo" : "Sarah Chen"}
          </span>
          <span className="block truncate text-[11px] leading-tight text-nav-ink">
            {role === "admin" ? "Community management" : "Ottawa Builders Group"}
          </span>
        </span>
      </div>
      <form action={demoLogin} className="mt-1">
        <input type="hidden" name="role" value={other} />
        <button
          type="submit"
          className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] text-nav-ink transition-colors hover:bg-white/5 hover:text-white"
        >
          <ArrowLeftRight className="h-4 w-4" />
          Switch to {other} view
        </button>
      </form>
      <a
        href="/pitch-deck.html"
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] text-nav-ink transition-colors hover:bg-white/5 hover:text-white"
      >
        <Presentation className="h-4 w-4" />
        View pitch deck
      </a>
    </div>
  );
}

function SidebarInner({ role, onNavigate }: { role: Role; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-5 px-3 py-4">
      <Brand role={role} />
      <div className="flex-1 overflow-y-auto">
        <NavList role={role} onNavigate={onNavigate} />
      </div>
      <RoleFooter role={role} />
    </div>
  );
}

export function Sidebar({ role }: { role: Role }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-nav-line bg-nav lg:block">
      <SidebarInner role={role} />
    </aside>
  );
}

export function Topbar({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const current = labelForPath(role, pathname);

  // "/" jumps to search, unless the user is already typing somewhere.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }
      event.preventDefault();
      router.push(searchFor[role]);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [role, router]);

  return (
    <>
      <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-line bg-canvas/85 px-4 backdrop-blur-md lg:px-8">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="-ml-1 flex h-8 w-8 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-subtle hover:text-ink lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="flex min-w-0 items-center gap-2 text-[13px]">
          <span className="hidden text-ink-3 sm:inline">
            {role === "admin" ? "Management" : "Member"}
          </span>
          <span className="hidden text-ink-3 sm:inline">/</span>
          <span className="truncate font-medium text-ink">{current ?? "CollabOS"}</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href={searchFor[role]}
            className="group flex h-8 items-center gap-2 rounded-md border border-line bg-surface pl-2.5 pr-2 text-[13px] text-ink-3 shadow-card transition-colors hover:border-line-strong hover:text-ink-2"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search the network</span>
            <kbd className="hidden rounded border border-line bg-subtle px-1 text-[10px] font-medium text-ink-3 md:inline">
              /
            </kbd>
          </Link>
          <span className="hidden rounded-md border border-line bg-surface px-2 py-1 text-[11px] font-medium text-ink-2 shadow-card sm:inline">
            Demo workspace
          </span>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
          />
          <div className="absolute inset-y-0 left-0 w-64 border-r border-nav-line bg-nav shadow-pop">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
              className="absolute right-2 top-3 flex h-8 w-8 items-center justify-center rounded-md text-nav-ink transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarInner role={role} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
