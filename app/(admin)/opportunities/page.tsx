import { OpportunityCard } from "@/app/components/opportunity-card";
import { Badge } from "@/components/ui/badge";
import { getData } from "@/lib/data";
import type { OpportunityType } from "@/lib/types";

const tabs: Array<[string, string | undefined]> = [
  ["All", undefined],
  ["Referrals", "referral"],
  ["Membership", "membership_upgrade"],
  ["Business Shifu", "shifu_lead"],
  ["Retention", "retention"]
];

export default async function OpportunitiesPage({
  searchParams
}: {
  searchParams: Promise<{ type?: OpportunityType }>;
}) {
  const data = await getData();
  const { type } = await searchParams;
  const orgById = new Map(data.organizations.map((org) => [org.id, org]));
  const opportunities = data.opportunities.filter((opp) => !type || opp.type === type);

  return (
    <div className="mx-auto max-w-7xl">
      <Badge tone="primary">Opportunity Engine</Badge>
      <h1 className="mt-4 text-4xl font-semibold">Prioritized business opportunities</h1>
      <p className="mt-3 max-w-3xl text-[var(--muted-foreground)]">
        Deterministic rules compare member needs, services, activity and business signals to recommend the next best action.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map(([label, value]) => (
          <a
            key={label}
            href={value ? `/opportunities?type=${value}` : "/opportunities"}
            className={`rounded-full border px-4 py-2 text-sm font-medium ${type === value || (!type && !value) ? "border-[var(--primary)] bg-[var(--primary)] text-white" : "border-[var(--border)] bg-white text-[var(--muted-foreground)]"}`}
          >
            {label}
          </a>
        ))}
      </div>
      <div className="mt-6 grid gap-4">
        {opportunities.map((opp) => (
          <OpportunityCard
            key={opp.id}
            opportunity={opp}
            source={orgById.get(opp.sourceOrganizationId)}
            target={opp.targetOrganizationId ? orgById.get(opp.targetOrganizationId) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
