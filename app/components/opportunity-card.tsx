import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";
import { changeOpportunityStatus, createIntroduction } from "@/app/actions/opportunities";
import { Avatar } from "@/components/ui/avatar";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/field";
import { Meter } from "@/components/ui/meter";
import { opportunityMeta, opportunityStatuses, scoreTone, statusTone } from "@/lib/display";
import { cn, formatCurrency } from "@/lib/utils";
import type { Opportunity, Organization } from "@/lib/types";

function OrgChip({ org, href }: { org?: Organization; href?: string }) {
  if (!org) return null;
  const inner = (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <Avatar name={org.name} size="xs" />
      <span className="truncate font-medium text-ink">{org.name}</span>
    </span>
  );
  return href ? (
    <Link href={href} className="min-w-0 rounded transition-opacity hover:opacity-70">
      {inner}
    </Link>
  ) : (
    inner
  );
}

export function OpportunityCard({
  opportunity,
  source,
  target,
  compact = false,
  admin = true,
  orgHref
}: {
  opportunity: Opportunity;
  source?: Organization;
  target?: Organization;
  compact?: boolean;
  admin?: boolean;
  /** Builds a link for an org chip — omit to render chips as plain text. */
  orgHref?: (org: Organization) => string;
}) {
  const meta = opportunityMeta[opportunity.type];
  const Icon = meta.icon;
  const showActions = admin && !compact;

  return (
    <Card className="overflow-hidden transition-colors hover:border-line-strong">
      <div className="flex gap-3 p-4 sm:gap-5">
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border",
            meta.tone === "dark"
              ? "border-nav bg-nav text-white"
              : meta.tone === "success"
                ? "border-positive-line bg-positive-soft text-positive"
                : meta.tone === "warning"
                  ? "border-caution-line bg-caution-soft text-caution"
                  : "border-brand-line bg-brand-soft text-brand"
          )}
        >
          <Icon className="h-4 w-4" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[12px] font-medium text-ink-3">{meta.label}</span>
            <span className="text-ink-3">·</span>
            <StatusBadge tone={statusTone[opportunity.status]}>
              {opportunity.status}
            </StatusBadge>
          </div>

          <h3 className="mt-1.5 text-[15px] font-semibold leading-6 text-ink">
            {opportunity.title}
          </h3>

          {source ? (
            <div className="mt-2.5 flex min-w-0 flex-wrap items-center gap-2 text-[13px]">
              <OrgChip org={source} href={orgHref && source ? orgHref(source) : undefined} />
              {target ? (
                <>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-3" />
                  <OrgChip org={target} href={orgHref && target ? orgHref(target) : undefined} />
                </>
              ) : null}
            </div>
          ) : null}

          <p
            className={cn(
              "mt-2.5 max-w-3xl text-[13px] leading-6 text-ink-2",
              compact && "line-clamp-2"
            )}
          >
            {opportunity.reasoning}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge tone="outline">
              {formatCurrency(opportunity.estimatedValue)} potential
            </Badge>
          </div>

          {/* Score moves below the copy once the card is too narrow for a column. */}
          <div className="mt-3 flex items-center gap-3 border-t border-line pt-3 sm:hidden">
            <span className="text-[11px] text-ink-3">Fit score</span>
            <span className="tabular text-[18px] font-semibold leading-none text-ink">
              {opportunity.score}
            </span>
            <Meter
              value={opportunity.score}
              tone={scoreTone(opportunity.score)}
              className="max-w-28 flex-1"
            />
          </div>
        </div>

        <div className="hidden shrink-0 flex-col items-end gap-1.5 sm:flex sm:w-32">
          <span className="text-[11px] text-ink-3">Fit score</span>
          <div className="flex items-baseline gap-1">
            <span className="tabular text-[22px] font-semibold leading-none text-ink">
              {opportunity.score}
            </span>
            <span className="text-[12px] text-ink-3">/100</span>
          </div>
          <Meter
            value={opportunity.score}
            tone={scoreTone(opportunity.score)}
            className="w-full"
          />
        </div>
      </div>

      {showActions ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-subtle/50 px-4 py-2.5">
          <form action={changeOpportunityStatus} className="flex items-center gap-2">
            <input type="hidden" name="id" value={opportunity.id} />
            <label className="text-[12px] text-ink-3" htmlFor={`status-${opportunity.id}`}>
              Status
            </label>
            <Select
              id={`status-${opportunity.id}`}
              name="status"
              defaultValue={opportunity.status}
              className="h-8 w-44"
            >
              {opportunityStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
            <Button variant="secondary" size="sm" type="submit">
              Update
            </Button>
          </form>

          {opportunity.type === "referral" && target ? (
            <form action={createIntroduction}>
              <input type="hidden" name="id" value={opportunity.id} />
              <Button size="sm" type="submit">
                <Handshake className="h-3.5 w-3.5" />
                Create introduction
              </Button>
            </form>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}
