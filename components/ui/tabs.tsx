import Link from "next/link";
import { cn } from "@/lib/utils";

export type TabItem = {
  label: string;
  href: string;
  active: boolean;
  count?: number;
};

/** Link-driven segmented control — keeps filtering in the URL, no client JS. */
export function LinkTabs({ items, className }: { items: TabItem[]; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center gap-0.5 rounded-lg border border-line bg-surface p-0.5 shadow-card",
        className
      )}
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
            item.active
              ? "bg-nav text-white"
              : "text-ink-2 hover:bg-subtle hover:text-ink"
          )}
        >
          {item.label}
          {typeof item.count === "number" ? (
            <span
              className={cn(
                "tabular rounded px-1 text-[11px]",
                item.active ? "bg-white/15 text-white" : "bg-subtle text-ink-3"
              )}
            >
              {item.count}
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
