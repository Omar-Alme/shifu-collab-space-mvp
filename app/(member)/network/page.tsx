import { OpportunityCard } from "@/app/components/opportunity-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getData } from "@/lib/data";

export default async function NetworkPage() {
  const data = await getData();
  const memberOrg = data.organizations.find((org) => org.id === "org-ottawa-builders")!;
  const orgById = new Map(data.organizations.map((org) => [org.id, org]));
  const visible = data.opportunities.filter((opp) => opp.type === "referral" && (opp.sourceOrganizationId === memberOrg.id || opp.targetOrganizationId === memberOrg.id));

  return (
    <div className="mx-auto max-w-6xl">
      <Badge tone="primary">Your Network</Badge>
      <h1 className="mt-4 text-4xl font-semibold">Connection opportunities</h1>
      <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
        Member-facing recommendations focus on relevant businesses and warm introductions, without internal management classifications.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["4", "recommended connections"],
          ["2", "shared Growth Hack events"],
          ["8", "matching services"]
        ].map(([value, label]) => (
          <Card key={label} className="p-5">
            <div className="text-3xl font-semibold">{value}</div>
            <div className="mt-1 text-sm text-[var(--muted-foreground)]">{label}</div>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-4">
        {visible.map((opp) => (
          <OpportunityCard
            key={opp.id}
            opportunity={opp}
            source={orgById.get(opp.sourceOrganizationId)}
            target={opp.targetOrganizationId ? orgById.get(opp.targetOrganizationId) : undefined}
            compact
            admin={false}
          />
        ))}
      </div>
    </div>
  );
}
