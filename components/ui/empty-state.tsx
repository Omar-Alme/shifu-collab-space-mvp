import * as React from "react";

export function EmptyState({
  icon,
  title,
  description,
  action
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line-strong bg-surface/60 px-6 py-14 text-center">
      {icon ? (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-subtle text-ink-3">
          {icon}
        </div>
      ) : null}
      <p className="text-[14px] font-medium text-ink">{title}</p>
      {description ? (
        <p className="mt-1 max-w-sm text-[13px] text-ink-3">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
