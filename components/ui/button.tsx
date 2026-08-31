import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "dark";
  size?: "sm" | "md";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[10px] border font-medium transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60",
        size === "sm" ? "h-9 px-3 text-sm" : "h-11 px-4 text-sm",
        variant === "primary" &&
          "border-[var(--primary)] bg-[var(--primary)] text-white shadow-sm hover:bg-[var(--primary-dark)]",
        variant === "secondary" &&
          "border-[var(--border)] bg-white text-[var(--foreground)] hover:bg-[var(--muted)]",
        variant === "ghost" &&
          "border-transparent bg-transparent text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
        variant === "dark" &&
          "border-[var(--shifu)] bg-[var(--shifu)] text-white hover:bg-black",
        className
      )}
      {...props}
    />
  );
}
