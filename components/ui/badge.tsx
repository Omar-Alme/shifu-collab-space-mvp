import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "neutral",
  className
}: {
  children: React.ReactNode;
  tone?: "neutral" | "primary" | "success" | "warning" | "danger" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        tone === "neutral" && "border-[var(--border)] bg-[var(--muted)] text-[var(--muted-foreground)]",
        tone === "primary" && "border-orange-200 bg-orange-50 text-[var(--primary-dark)]",
        tone === "success" && "border-green-200 bg-green-50 text-[var(--success)]",
        tone === "warning" && "border-amber-200 bg-amber-50 text-[var(--warning)]",
        tone === "danger" && "border-red-200 bg-red-50 text-[var(--danger)]",
        tone === "dark" && "border-neutral-800 bg-[var(--shifu)] text-white",
        className
      )}
    >
      {children}
    </span>
  );
}
