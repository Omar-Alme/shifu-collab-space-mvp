import { ArrowRightLeft, Handshake, TrendingUp } from "lucide-react";
import { createIntroduction, changeOpportunityStatus } from "@/app/actions/opportunities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Opportunity, Organization } from "@/lib/types";

const labels = {
  referral: "Referral Match",
  membership_upgrade: "Membership Opportunity",
  shifu_lead: "Business Shifu",
  retention: "Retention Risk"
};

const tones = {
  referral: "primary",
  membership_upgrade: "success",
  shifu_lead: "dark",
  retention: "warning"
} as const;

const statuses = ["New", "Review", "Contacted", "Introduction Sent", "Won", "Lost"];

export function OpportunityCard({
  opportunity,
  source,
  target,
  compact = false,
  admin = true
}: {
  opportunity: Opportunity;
  source?: Organization;
  target?: Organization;
  compact?: boolean;
  admin?: boolean;
}) {
  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <Badge tone={tones[opportunity.type]}>{labels[opportunity.type]}</Badge>
          <h3 className="mt-3 text-lg font-semibold">{opportunity.title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <span>{source?.name}</span>
            {target ? (
              <>
                <ArrowRightLeft className="h-4 w-4 text-[var(--primary)]" />
                <span>{target.name}</span>
              </>
            ) : null}
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
            {opportunity.reasoning}
          </p>
          {!compact ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="neutral">Status: {opportunity.status}</Badge>
              <Badge tone="success">{formatCurrency(opportunity.estimatedValue)} potential</Badge>
            </div>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
          <div className="text-right">
            <div className="text-3xl font-semibold text-[var(--primary)]">{opportunity.score}%</div>
            <div className="text-xs text-[var(--muted-foreground)]">Business fit</div>
          </div>
          {admin && !compact ? (
            <div className="flex flex-wrap gap-2 md:justify-end">
              <form action={changeOpportunityStatus}>
                <input type="hidden" name="id" value={opportunity.id} />
                <select
                  name="status"
                  defaultValue={opportunity.status}
                  className="h-10 rounded-[10px] border border-[var(--border)] bg-white px-3 text-sm"
                  aria-label="Change opportunity status"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <Button variant="secondary" size="sm" className="ml-2" type="submit">
                  <TrendingUp className="h-4 w-4" /> Update
                </Button>
              </form>
              {opportunity.type === "referral" && target ? (
                <form action={createIntroduction}>
                  <input type="hidden" name="id" value={opportunity.id} />
                  <Button size="sm" type="submit">
                    <Handshake className="h-4 w-4" /> Create Introduction
                  </Button>
                </form>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
