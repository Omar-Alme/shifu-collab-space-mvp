import { Layers } from "lucide-react";
import { OpportunityCard } from "@/app/components/opportunity-card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { LinkTabs, type TabItem } from "@/components/ui/tabs";
import { getData } from "@/lib/data";
import { opportunityMeta } from "@/lib/display";
import { formatCompactCurrency } from "@/lib/utils";
import type { OpportunityType } from "@/lib/types";

const types: OpportunityType[] = [
  "referral",
  "membership_upgrade",
  "shifu_lead",
  "retention"
];

export const metadata = { title: "Opportunities" };

export default async function OpportunitiesPage({
  searchParams
}: {
  searchParams: Promise<{ type?: OpportunityType }>;
}) {
  const data = await getData();
  const { type } = await searchParams;
  const orgById = new Map(data.organizations.map((org) => [org.id, org]));

  const opportunities = data.opportunities
    .filter((opp) => !type || opp.type === type)
    .sort((a, b) => b.score - a.score);

  const tabs: TabItem[] = [
    {
      label: "All",
      href: "/opportunities",
      active: !type,
      count: data.opportunities.length
    },
    ...types.map((value) => ({
      label: opportunityMeta[value].short,
      href: `/opportunities?type=${value}`,
      active: type === value,
      count: data.opportunities.filter((opp) => opp.type === value).length
    }))
  ];

  const totalValue = opportunities.reduce((sum, opp) => sum + opp.estimatedValue, 0);
  const activeMeta = type ? opportunityMeta[type] : undefined;

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Opportunity engine"
        description="Deterministic rules compare member needs, services, workspace activity and event attendance to recommend the next best action."
        actions={
          <>
            <Badge tone="outline">{opportunities.length} items</Badge>
            <Badge tone="outline">{formatCompactCurrency(totalValue)} estimated</Badge>
          </>
        }
      />

      <div className="flex flex-col gap-2">
        <LinkTabs items={tabs} />
        {activeMeta ? (
          <p className="text-[12px] text-ink-3">{activeMeta.blurb}</p>
        ) : null}
      </div>

      {opportunities.length ? (
        <div className="grid gap-3">
          {opportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              source={orgById.get(opp.sourceOrganizationId)}
              target={opp.targetOrganizationId ? orgById.get(opp.targetOrganizationId) : undefined}
              orgHref={(org) => `/members/${org.slug}`}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Layers className="h-4 w-4" />}
          title="Nothing in this lane"
          description="No opportunities of this type have been surfaced yet."
          action={
            <ButtonLink href="/opportunities" variant="secondary" size="sm">
              View all opportunities
            </ButtonLink>
          }
        />
      )}
    </div>
  );
}
