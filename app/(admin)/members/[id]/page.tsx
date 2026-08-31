import { notFound } from "next/navigation";
import { OpportunityCard } from "@/app/components/opportunity-card";
import { Badge } from "@/components/ui/badge";
import { Card, SectionTitle } from "@/components/ui/card";
import { getData } from "@/lib/data";

export default async function MemberProfilePage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getData();
  const org = data.organizations.find((item) => item.slug === id || item.id === id);
  if (!org) notFound();
  const membership = data.memberships.find((m) => m.id === org.membershipId);
  const services = data.services.filter((s) => s.organizationId === org.id);
  const needs = data.needs.filter((n) => n.organizationId === org.id);
  const interactions = data.interactions.filter((i) => i.organizationId === org.id);
  const opportunities = data.opportunities.filter((opp) => opp.sourceOrganizationId === org.id || opp.targetOrganizationId === org.id);
  const orgById = new Map(data.organizations.map((item) => [item.id, item]));

  return (
    <div className="mx-auto max-w-7xl">
      <Badge tone="primary">{membership?.name ?? "Member"}</Badge>
      <h1 className="mt-4 text-4xl font-semibold">{org.name}</h1>
      <p className="mt-2 text-lg text-[var(--muted-foreground)]">{org.industry} · {org.employeeCount} employees · {org.location}</p>
      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Card className="p-6">
            <SectionTitle title="About" />
            <p className="mt-4 leading-7 text-[var(--muted-foreground)]">{org.description}</p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div><div className="text-sm text-[var(--muted-foreground)]">Member since</div><div className="font-semibold">{new Date(org.memberSince).getFullYear()}</div></div>
              <div><div className="text-sm text-[var(--muted-foreground)]">Revenue range</div><div className="font-semibold">{org.annualRevenueRange}</div></div>
              <div><div className="text-sm text-[var(--muted-foreground)]">Growth stage</div><div className="font-semibold">{org.growthStage}</div></div>
            </div>
          </Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <SectionTitle title="Offers" />
              <div className="mt-4 flex flex-wrap gap-2">{services.map((s) => <Badge key={s.id}>{s.name}</Badge>)}</div>
            </Card>
            <Card className="p-6">
              <SectionTitle title="Looking For" />
              <div className="mt-4 flex flex-wrap gap-2">{needs.map((n) => <Badge key={n.id} tone={n.priority === "high" ? "primary" : "neutral"}>{n.name}</Badge>)}</div>
            </Card>
          </div>
          <Card className="p-6">
            <SectionTitle title="Opportunities" description="Connections and business actions involving this organization." />
            <div className="mt-4 grid gap-4">
              {opportunities.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  source={orgById.get(opp.sourceOrganizationId)}
                  target={opp.targetOrganizationId ? orgById.get(opp.targetOrganizationId) : undefined}
                  compact
                />
              ))}
            </div>
          </Card>
        </div>
        <aside className="space-y-6">
          <Card className="bg-[var(--shifu)] p-6 text-white">
            <h2 className="text-xl font-semibold text-white">Admin Signals</h2>
            <p className="mt-1 text-sm text-neutral-400">Internal business intelligence hidden from members.</p>
            <div className="mt-5 grid gap-4">
              <div><div className="text-sm text-neutral-400">Shifu Fit</div><div className="text-3xl font-semibold">{org.shifuFitScore}%</div></div>
              <div><div className="text-sm text-neutral-400">Founder Dependency</div><div className="text-3xl font-semibold">{org.founderDependencyScore}%</div></div>
              <div><div className="text-sm text-neutral-400">Engagement</div><div className="text-3xl font-semibold">{org.engagementScore}%</div></div>
            </div>
          </Card>
          <Card className="p-6">
            <SectionTitle title="Engagement" />
            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex justify-between"><span>Growth Hack events</span><strong>4</strong></div>
              <div className="flex justify-between"><span>Workspace visits</span><strong>{org.visitsLast90}</strong></div>
              <div className="flex justify-between"><span>Meeting room bookings</span><strong>{org.meetingRoomBookingsLast90}</strong></div>
            </div>
          </Card>
          <Card className="p-6">
            <SectionTitle title="Recent Activity" />
            <div className="mt-4 space-y-4">
              {interactions.map((interaction) => (
                <div key={interaction.id} className="border-l-2 border-[var(--primary)] pl-4">
                  <div className="text-sm font-medium">{interaction.type.replace("_", " ")}</div>
                  <div className="text-sm text-[var(--muted-foreground)]">{interaction.description}</div>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
