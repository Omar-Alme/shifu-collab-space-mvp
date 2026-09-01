import Link from "next/link";
import { ArrowRight, Building2, CalendarClock, Handshake, Layers, Wallet } from "lucide-react";
import { OpportunityCard } from "@/app/components/opportunity-card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle, SectionTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { Stat } from "@/components/ui/stat";
import { getData } from "@/lib/data";
import { introductionTone, opportunityMeta } from "@/lib/display";
import { formatCompactCurrency, formatCurrency, formatDate } from "@/lib/utils";
import type { OpportunityType } from "@/lib/types";

const pipelineOrder: OpportunityType[] = [
  "referral",
  "membership_upgrade",
  "shifu_lead",
  "retention"
];

export const metadata = { title: "Overview" };

export default async function DashboardPage() {
  const data = await getData();
  const orgById = new Map(data.organizations.map((org) => [org.id, org]));

  const open = data.opportunities.filter((opp) => !["Won", "Lost"].includes(opp.status));
  const pipelineValue = open.reduce((sum, opp) => sum + opp.estimatedValue, 0);

  const byType = pipelineOrder.map((type) => {
    const items = open.filter((opp) => opp.type === type);
    return {
      type,
      count: items.length,
      value: items.reduce((sum, opp) => sum + opp.estimatedValue, 0)
    };
  });
  const maxValue = Math.max(1, ...byType.map((row) => row.value));

  const priority = [...open].sort((a, b) => b.score - a.score).slice(0, 4);

  const atRisk = open
    .filter((opp) => opp.type === "retention")
    .map((opp) => ({ opp, org: orgById.get(opp.sourceOrganizationId) }))
    .filter((row) => row.org);

  const recentIntroductions = data.introductions.slice(0, 4);

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Overview"
        description="Who to connect, contact, upgrade, retain or help next — scored from member needs, services, workspace activity and event attendance."
        actions={
          <ButtonLink href="/opportunities" variant="primary" size="md">
            Open opportunity engine
            <ArrowRight className="h-3.5 w-3.5" />
          </ButtonLink>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Businesses in network"
          value={data.organizations.length}
          hint={`${data.profiles.length} member contacts`}
          icon={<Building2 className="h-4 w-4" />}
        />
        <Stat
          label="Open opportunities"
          value={open.length}
          hint={`${data.opportunities.length - open.length} closed to date`}
          icon={<Layers className="h-4 w-4" />}
        />
        <Stat
          label="Pipeline value"
          value={formatCompactCurrency(pipelineValue)}
          hint="Estimated across all open items"
          icon={<Wallet className="h-4 w-4" />}
        />
        <Stat
          label="Introductions in flight"
          value={data.introductions.length}
          hint={`${data.tasks.filter((task) => task.status !== "Done").length} open follow-up tasks`}
          icon={<Handshake className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <section className="grid content-start gap-3">
          <SectionTitle
            title="Priority queue"
            description="Highest-fit actions waiting on the community team."
            action={
              <Link
                href="/opportunities"
                className="inline-flex items-center gap-1 text-[13px] font-medium text-brand hover:text-brand-hover"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          />
          {priority.length ? (
            priority.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                source={orgById.get(opp.sourceOrganizationId)}
                target={opp.targetOrganizationId ? orgById.get(opp.targetOrganizationId) : undefined}
                orgHref={(org) => `/members/${org.slug}`}
                compact
              />
            ))
          ) : (
            <EmptyState
              icon={<Layers className="h-4 w-4" />}
              title="No open opportunities"
              description="Everything surfaced by the engine has been actioned."
            />
          )}
        </section>

        <aside className="grid gap-4 self-start">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline by type</CardTitle>
            </CardHeader>
            <CardBody className="grid gap-4 p-4">
              {byType.map((row) => {
                const meta = opportunityMeta[row.type];
                const Icon = meta.icon;
                return (
                  <Link
                    key={row.type}
                    href={`/opportunities?type=${row.type}`}
                    className="group grid gap-2"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 text-[13px] text-ink-2 group-hover:text-ink">
                        <Icon className="h-3.5 w-3.5 text-ink-3" />
                        {meta.short}
                        <span className="tabular text-[12px] text-ink-3">({row.count})</span>
                      </span>
                      <span className="tabular text-[13px] font-medium text-ink">
                        {formatCompactCurrency(row.value)}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-subtle">
                      <div
                        className={
                          row.type === "shifu_lead"
                            ? "h-full rounded-full bg-nav"
                            : row.type === "membership_upgrade"
                              ? "h-full rounded-full bg-positive"
                              : row.type === "retention"
                                ? "h-full rounded-full bg-caution"
                                : "h-full rounded-full bg-brand"
                        }
                        style={{ width: `${Math.max(4, (row.value / maxValue) * 100)}%` }}
                      />
                    </div>
                  </Link>
                );
              })}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Renewals to protect</CardTitle>
              <Badge tone="warning">{atRisk.length}</Badge>
            </CardHeader>
            {atRisk.length ? (
              <div className="divide-y divide-line">
                {atRisk.map(({ opp, org }) => (
                  <Link
                    key={opp.id}
                    href={`/members/${org!.slug}`}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-subtle/60"
                  >
                    <Avatar name={org!.name} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-medium text-ink">
                        {org!.name}
                      </span>
                      <span className="flex items-center gap-1 text-[12px] text-ink-3">
                        <CalendarClock className="h-3 w-3" />
                        Renews {formatDate(org!.renewalDate)}
                      </span>
                    </span>
                    <span className="tabular text-[13px] font-medium text-caution">
                      {opp.score}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <CardBody>
                <p className="text-[13px] text-ink-3">No accounts flagged for retention.</p>
              </CardBody>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent introductions</CardTitle>
            </CardHeader>
            {recentIntroductions.length ? (
              <div className="divide-y divide-line">
                {recentIntroductions.map((intro) => {
                  const from = orgById.get(intro.fromOrganizationId);
                  const to = orgById.get(intro.toOrganizationId);
                  return (
                    <div key={intro.id} className="px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="min-w-0 truncate text-[13px] text-ink">
                          {from?.name} <span className="text-ink-3">→</span> {to?.name}
                        </span>
                        <Badge tone={introductionTone[intro.status] ?? "neutral"}>
                          {intro.status}
                        </Badge>
                      </div>
                      <div className="tabular mt-1 text-[12px] text-ink-3">
                        {formatCurrency(intro.estimatedValue)} estimated
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <CardBody>
                <p className="text-[13px] text-ink-3">No introductions created yet.</p>
              </CardBody>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
}
