import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Sparkles } from "lucide-react";
import { OpportunityCard } from "@/app/components/opportunity-card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader, CardTitle, SectionTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { Stat } from "@/components/ui/stat";
import { getData } from "@/lib/data";
import { formatCompactCurrency, formatDate } from "@/lib/utils";

export const metadata = { title: "Event intelligence" };

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
  const attendees = data.eventAttendees.filter((a) => a.eventId === event.id);
  const guests = attendees.filter((a) => a.status === "guest");
  const members = attendees.filter((a) => a.status !== "guest");
  const attendingOrgIds = new Set(attendees.map((a) => a.organizationId));

  // Opportunities involving businesses that were actually in the room.
  const inRoom = data.opportunities.filter(
    (opp) =>
      attendingOrgIds.has(opp.sourceOrganizationId) ||
      (opp.targetOrganizationId ? attendingOrgIds.has(opp.targetOrganizationId) : false)
  );
  const matches = inRoom.filter((opp) => opp.type === "referral");
  const shifu = inRoom.filter((opp) => opp.type === "shifu_lead").slice(0, 4);
  const introductions = data.introductions.filter((intro) =>
    matches.some((opp) => opp.id === intro.opportunityId)
  );
  const pipeline = inRoom.reduce((sum, opp) => sum + opp.estimatedValue, 0);

  // Businesses that showed up but are still on the entry-level plan — the
  // honest membership follow-up list from this room.
  const entryPlan = [...data.memberships].sort((a, b) => a.price - b.price)[0];
  const upgradeCandidates = [...attendingOrgIds]
    .map((orgId) => orgById.get(orgId))
    .filter(
      (org): org is NonNullable<typeof org> =>
        Boolean(org) && org!.membershipId === entryPlan?.id
    )
    .sort((a, b) => b.engagementScore - a.engagementScore)
    .slice(0, 5);

  return (
    <div className="grid gap-6">
      <div>
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-[13px] text-ink-3 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Events
        </Link>
        <PageHeader
          className="mt-4"
          title={event.name}
          description="Before: people attend a networking event. After: CollabSpace knows exactly what introductions, referrals and revenue opportunities the room created."
          actions={
            <>
              <Badge tone="outline">
                <CalendarDays className="h-3 w-3" />
                {formatDate(event.startAt)}
              </Badge>
              <Badge tone="outline">
                <MapPin className="h-3 w-3" />
                {event.location}
              </Badge>
            </>
          }
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Stat label="Attendees" value={event.attendeeCount} hint={`${event.type} format`} />
        <Stat label="Members" value={members.length} hint={`${guests.length} guests`} />
        <Stat label="Matches identified" value={matches.length} hint="Referral-grade pairs" />
        <Stat
          label="Introductions"
          value={introductions.length}
          hint="Created from this room"
        />
        <Stat
          label="Pipeline created"
          value={formatCompactCurrency(pipeline)}
          hint="Estimated value"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="grid content-start gap-3">
          <SectionTitle
            title="Suggested introductions"
            description="High-fit pairs where one attendee needs what another attendee sells."
          />
          {matches.length ? (
            matches
              .slice(0, 6)
              .map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  source={orgById.get(opp.sourceOrganizationId)}
                  target={
                    opp.targetOrganizationId ? orgById.get(opp.targetOrganizationId) : undefined
                  }
                  orgHref={(org) => `/members/${org.slug}`}
                  compact
                />
              ))
          ) : (
            <EmptyState
              icon={<Sparkles className="h-4 w-4" />}
              title="No matches from this room yet"
              description="Once attendees list their needs and services, pairs will surface here."
            />
          )}
        </section>

        <aside className="grid gap-4 self-start">
          <Card>
            <CardHeader>
              <CardTitle>Membership conversations</CardTitle>
              <Badge tone="outline">{upgradeCandidates.length}</Badge>
            </CardHeader>
            <p className="border-b border-line px-4 py-2 text-[12px] text-ink-3">
              Attendees still on the {entryPlan?.name ?? "entry"} plan, ordered by how
              engaged they are.
            </p>
            {upgradeCandidates.length ? (
              <div className="divide-y divide-line">
                {upgradeCandidates.map((org) => (
                  <Link
                    key={org.id}
                    href={`/members/${org.slug}`}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-subtle/60"
                  >
                    <Avatar name={org.name} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-medium text-ink">
                        {org.name}
                      </span>
                      <span className="block truncate text-[12px] text-ink-3">{org.industry}</span>
                    </span>
                    <span className="tabular shrink-0 text-[13px] text-ink-2">
                      {org.engagementScore}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <CardBody>
                <p className="text-[13px] text-ink-3">
                  Every business in the room is already on a higher plan.
                </p>
              </CardBody>
            )}
          </Card>

          <div className="rounded-xl border border-nav-line bg-nav p-5">
            <h2 className="text-[15px] font-semibold text-white">Business Shifu candidates</h2>
            <p className="mt-0.5 text-[12px] text-nav-ink">
              Management-only. High-potential owners spotted in the room.
            </p>
            <div className="mt-4 grid gap-2">
              {shifu.length ? (
                shifu.map((opp) => {
                  const org = orgById.get(opp.sourceOrganizationId);
                  return (
                    <Link
                      key={opp.id}
                      href={org ? `/members/${org.slug}` : "/opportunities?type=shifu_lead"}
                      className="flex items-center justify-between gap-3 rounded-lg border border-nav-line bg-white/[0.03] px-3 py-2.5 transition-colors hover:bg-white/[0.07]"
                    >
                      <span className="min-w-0 truncate text-[13px] font-medium text-white">
                        {org?.name}
                      </span>
                      <span className="tabular shrink-0 text-[13px] text-brand">{opp.score}</span>
                    </Link>
                  );
                })
              ) : (
                <p className="text-[13px] text-nav-ink">No diagnostic candidates from this event.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
