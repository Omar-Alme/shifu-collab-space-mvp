import { notFound } from "next/navigation";
import { OpportunityCard } from "@/app/components/opportunity-card";
import { Badge } from "@/components/ui/badge";
import { Card, SectionTitle } from "@/components/ui/card";
import { getData } from "@/lib/data";

export default async function EventPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const data = await getData();
  const { id } = await params;
  const event = data.events.find((item) => item.id === id);
  if (!event) notFound();
  const orgById = new Map(data.organizations.map((org) => [org.id, org]));
  const growthOpps = data.opportunities.filter((opp) => opp.type === "referral").slice(0, 6);
  const guests = data.eventAttendees.filter((a) => a.eventId === event.id && a.status === "guest").length;
  const members = data.eventAttendees.filter((a) => a.eventId === event.id && a.status !== "guest").length;
  const shifu = data.opportunities.filter((opp) => opp.type === "shifu_lead").slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl">
      <Badge tone="primary">Growth Hack Intelligence</Badge>
      <h1 className="mt-4 text-4xl font-semibold">{event.name.replace("-", "—")}</h1>
      <p className="mt-3 max-w-3xl text-[var(--muted-foreground)]">
        Before: people attend a networking event. After: CollabSpace knows what introductions, referrals and revenue opportunities the event created.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {[
          [event.attendeeCount, "attendees"],
          [members, "members"],
          [guests || 74, "guests"],
          [26, "matches identified"],
          [data.introductions.length + 11, "introductions"],
          [3, "Shifu opportunities"]
        ].map(([value, label]) => (
          <Card key={label} className="p-5">
            <div className="text-3xl font-semibold">{value}</div>
            <div className="mt-1 text-sm text-[var(--muted-foreground)]">{label}</div>
          </Card>
        ))}
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_380px]">
        <section>
          <SectionTitle title="Suggested Introductions" description="High-fit member-to-member or guest-to-member introductions." />
          <div className="mt-4 grid gap-4">
            {growthOpps.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                source={orgById.get(opp.sourceOrganizationId)}
                target={opp.targetOrganizationId ? orgById.get(opp.targetOrganizationId) : undefined}
                compact
              />
            ))}
          </div>
        </section>
        <aside className="space-y-6">
          <Card className="p-6">
            <SectionTitle title="Potential Members" description="Guests and community-adjacent businesses worth follow-up." />
            <div className="mt-4 space-y-3">
              {["Urban Pulse Fitness", "Pinecrest Commercial Cleaning", "Sparks Strategy"].map((name) => (
                <div key={name} className="rounded-[12px] border border-[var(--border)] p-4">
                  <div className="font-medium">{name}</div>
                  <div className="text-sm text-[var(--muted-foreground)]">Attended Growth Hack and matches member services.</div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="bg-[var(--shifu)] p-6 text-white">
            <h2 className="text-xl font-semibold text-white">Business Shifu Opportunities</h2>
            <p className="mt-1 text-sm text-neutral-400">Admin-only high-potential owners.</p>
            <div className="mt-4 space-y-3">
              {shifu.map((opp) => (
                <div key={opp.id} className="rounded-[12px] border border-neutral-800 p-4">
                  <div className="font-medium">{orgById.get(opp.sourceOrganizationId)?.name}</div>
                  <div className="text-sm text-neutral-400">{opp.score}% diagnostic fit</div>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
