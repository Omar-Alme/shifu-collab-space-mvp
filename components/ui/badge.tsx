import { cn } from "@/lib/utils";

export type BadgeTone =
  | "neutral"
  | "outline"
  | "brand"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "dark";

const tones: Record<BadgeTone, string> = {
  neutral: "border-line bg-subtle text-ink-2",
  outline: "border-line bg-surface text-ink-2",
  brand: "border-brand-line bg-brand-soft text-brand-ink",
  accent: "border-accent-line bg-accent-soft text-accent",
  success: "border-positive-line bg-positive-soft text-positive",
  warning: "border-caution-line bg-caution-soft text-caution",
  danger: "border-critical-line bg-critical-soft text-critical",
  dark: "border-nav bg-nav text-white"
};

export function Badge({
  children,
  tone = "neutral",
  className
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-md border px-1.5 py-0.5 text-[11px] font-medium leading-5",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/** A badge with a leading status dot — for lifecycle values, not categories. */
export function StatusBadge({
  children,
  tone = "neutral",
  className
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  const dot: Record<BadgeTone, string> = {
    neutral: "bg-ink-3",
    outline: "bg-ink-3",
    brand: "bg-brand",
    accent: "bg-accent",
    success: "bg-positive",
    warning: "bg-caution",
    danger: "bg-critical",
    dark: "bg-white"
  };
  return (
    <Badge tone={tone} className={className}>
      <span className={cn("h-1.5 w-1.5 rounded-full", dot[tone])} />
      {children}
    </Badge>
  );
}
