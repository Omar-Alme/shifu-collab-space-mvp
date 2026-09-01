import { cn } from "@/lib/utils";

const tones = {
  brand: "bg-brand",
  accent: "bg-accent",
  success: "bg-positive",
  warning: "bg-caution",
  danger: "bg-critical",
  neutral: "bg-ink"
} as const;

export function Meter({
  value,
  tone = "brand",
  className
}: {
  value: number;
  tone?: keyof typeof tones;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-subtle", className)}
    >
      <div
        className={cn("h-full rounded-full", tones[tone])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

/** Score with an inline bar — used wherever a 0-100 fit score appears. */
export function ScoreMeter({
  value,
  label,
  tone = "brand",
  className
}: {
  value: number;
  label?: string;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <div className={cn("w-28", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <span className="tabular text-[15px] font-semibold text-ink">{value}</span>
        {label ? <span className="text-[11px] text-ink-3">{label}</span> : null}
      </div>
      <Meter value={value} tone={tone} className="mt-1.5" />
    </div>
  );
}
