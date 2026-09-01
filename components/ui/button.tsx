import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "subtle";
type Size = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "border-brand bg-brand text-white hover:border-brand-hover hover:bg-brand-hover",
  secondary:
    "border-line-strong bg-surface text-ink shadow-card hover:bg-subtle",
  ghost:
    "border-transparent bg-transparent text-ink-2 hover:bg-subtle hover:text-ink",
  dark: "border-nav bg-nav text-white hover:bg-nav-2",
  subtle: "border-transparent bg-subtle text-ink hover:bg-line"
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-2.5 text-[13px]",
  md: "h-9 px-3.5 text-[13px]",
  lg: "h-10 px-4 text-sm",
  icon: "h-8 w-8"
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  variant = "secondary",
  size = "md",
  ...props
}: React.ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
