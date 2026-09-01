import * as React from "react";
import { cn } from "@/lib/utils";

export function Stat({
  label,
  value,
  hint,
  icon,
  className
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-surface px-4 py-3.5 shadow-card",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12px] font-medium text-ink-3">{label}</span>
        {icon ? <span className="text-ink-3">{icon}</span> : null}
      </div>
      <div className="tabular mt-2 text-[26px] font-semibold leading-none tracking-[-0.02em] text-ink">
        {value}
      </div>
      {hint ? <div className="mt-2 text-[12px] text-ink-3">{hint}</div> : null}
    </div>
  );
}

/** Compact label/value row for detail panels. */
export function DataPoint({
  label,
  value,
  className
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="text-[12px] text-ink-3">{label}</div>
      <div className="mt-1 truncate text-[13px] font-medium text-ink">{value}</div>
    </div>
  );
}
