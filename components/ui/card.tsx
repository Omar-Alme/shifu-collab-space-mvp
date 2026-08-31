import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] shadow-[0_12px_30px_rgba(23,23,23,0.04)]",
        className
      )}
      {...props}
    />
  );
}

export function SectionTitle({
  title,
  description
}: {
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-normal text-[var(--foreground)]">
        {title}
      </h2>
      {description ? (
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
