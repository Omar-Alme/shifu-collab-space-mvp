import Link from "next/link";
import { ArrowUpRight, Handshake, ShieldAlert, Sparkles, TrendingUp, Users } from "lucide-react";
import { OpportunityCard } from "@/app/components/opportunity-card";
import { Badge } from "@/components/ui/badge";
import { Card, SectionTitle } from "@/components/ui/card";
import { getData } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardPage() {
  const data = await getData();
  const open = data.opportunities.filter((opp) => !["Won", "Lost"].includes(opp.status));
  const referral = open.filter((opp) => opp.type === "referral");
  const membership = open.filter((opp) => opp.type === "membership_upgrade");
  const shifu = open.filter((opp) => opp.type === "shifu_lead");
  const retention = open.filter((opp) => opp.type === "retention");
  const orgById = new Map(data.organizations.map((org) => [org.id, org]));
  const metrics = [
    ["500+", "Community Members", Users],
    [String(open.length), "Open Opportunities", Sparkles],
    [String(referral.length), "Referral Matches", Handshake],
    [String(membership.length), "Membership Opportunities", TrendingUp],
    [String(shifu.length), "Shifu Opportunities", ArrowUpRight]
  ] as const;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge tone="primary">Community Intelligence</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal">Who should we connect, contact, upgrade, retain or help next?</h1>
          <p className="mt-3 max-w-3xl text-[var(--muted-foreground)]">
            CollabOS turns CollabSpace member activity, needs, services and events into a measurable business opportunity pipeline.
          </p>
        </div>
        <Link href="/opportunities" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)]">
          Open engine <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map(([value, label, Icon]) => (
          <Card key={label} className="p-5">
            <Icon className="h-5 w-5 text-[var(--primary)]" />
            <div className="mt-5 text-3xl font-semibold">{value}</div>
            <div className="mt-1 text-sm text-[var(--muted-foreground)]">{label}</div>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div>
          <SectionTitle title="Opportunity Feed" description="High-signal actions for CollabSpace management." />
          <div className="mt-4 grid gap-4">
            {open.slice(0, 6).map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                source={orgById.get(opp.sourceOrganizationId)}
                target={opp.targetOrganizationId ? orgById.get(opp.targetOrganizationId) : undefined}
                compact
              />
            ))}
          </div>
        </div>
        <div>
          <SectionTitle title="Pipeline" description="Potential value surfaced from the community graph." />
          <Card className="mt-4 overflow-hidden">
            {[
              ["Referral Value", referral.reduce((sum, opp) => sum + opp.estimatedValue, 0), "primary"],
              ["Membership Revenue Potential", membership.reduce((sum, opp) => sum + opp.estimatedValue, 0), "success"],
              ["Shifu Pipeline", shifu.reduce((sum, opp) => sum + opp.estimatedValue, 0), "dark"],
              ["Retention Risks", retention.reduce((sum, opp) => sum + opp.estimatedValue, 0), "warning"]
            ].map(([label, value, tone]) => (
              <div key={String(label)} className="flex items-center justify-between border-b border-[var(--border)] p-5 last:border-0">
                <div className="flex items-center gap-3">
                  {label === "Retention Risks" ? <ShieldAlert className="h-5 w-5 text-[var(--warning)]" /> : <TrendingUp className="h-5 w-5 text-[var(--primary)]" />}
                  <span className="text-sm font-medium">{label}</span>
                </div>
                <Badge tone={tone as "primary" | "success" | "dark" | "warning"}>{formatCurrency(Number(value))}</Badge>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
