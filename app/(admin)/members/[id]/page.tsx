import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarClock, ExternalLink, Layers, MapPin } from "lucide-react";
import { OpportunityCard } from "@/app/components/opportunity-card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { DataPoint } from "@/components/ui/stat";
import { getData } from "@/lib/data";
import { interactionLabel, priorityTone } from "@/lib/display";
import { formatDate, formatMonthYear } from "@/lib/utils";

export const metadata = { title: "Member" };

function SignalRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[12px] text-nav-ink">{label}</span>
        <span className="tabular text-[15px] font-semibold text-white">{value}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-brand"
          style={{ width: `${Math.max(3, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

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
  const interactions = data.interactions
    .filter((i) => i.organizationId === org.id)
    .sort((a, b) => (a.occurredAt < b.occurredAt ? 1 : -1));
  const opportunities = data.opportunities.filter(
    (opp) => opp.sourceOrganizationId === org.id || opp.targetOrganizationId === org.id
  );
  const people = data.profiles.filter((p) => p.organizationId === org.id);
  const eventsAttended = new Set(
    data.eventAttendees.filter((a) => a.organizationId === org.id).map((a) => a.eventId)
  ).size;
  const orgById = new Map(data.organizations.map((item) => [item.id, item]));

  return (
    <div className="grid gap-6">
      <div>
        <Link
          href="/members"
          className="inline-flex items-center gap-1.5 text-[13px] text-ink-3 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Members
        </Link>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <Avatar name={org.name} size="lg" />
            <div className="min-w-0">
              <h1 className="text-[22px] leading-8 text-ink">{org.name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-2">
                <span>{org.industry}</span>
                <span aria-hidden className="text-ink-3">·</span>
                <span>{org.employeeCount} employees</span>
                <span aria-hidden className="text-ink-3">·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {org.location}
                </span>
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <Badge tone="brand">{membership?.name ?? "Member"}</Badge>
                <Badge tone="outline">{org.growthStage}</Badge>
                <Badge tone="outline">
                  <CalendarClock className="h-3 w-3" />
                  Renews {formatDate(org.renewalDate)}
                </Badge>
              </div>
            </div>
          </div>
          <a
            href={org.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-brand hover:text-brand-hover"
          >
            Visit website
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid content-start gap-4">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardBody>
              <p className="max-w-3xl text-[13px] leading-6 text-ink-2">{org.description}</p>
              <div className="mt-5 grid gap-4 border-t border-line pt-4 sm:grid-cols-2 md:grid-cols-4">
                <DataPoint label="Member since" value={formatMonthYear(org.memberSince)} />
                <DataPoint label="Revenue range" value={org.annualRevenueRange} />
                <DataPoint label="Growth stage" value={org.growthStage} />
                <DataPoint label="Membership" value={membership?.name ?? "Member"} />
              </div>
            </CardBody>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Offers</CardTitle>
                <Badge tone="outline">{services.length}</Badge>
              </CardHeader>
              <CardBody className="flex flex-wrap gap-1.5">
                {services.length ? (
                  services.map((s) => (
                    <Badge key={s.id} tone="neutral">
                      {s.name}
                    </Badge>
                  ))
                ) : (
                  <p className="text-[13px] text-ink-3">No services listed yet.</p>
                )}
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Looking for</CardTitle>
                <Badge tone="outline">{needs.length}</Badge>
              </CardHeader>
              <CardBody className="flex flex-wrap gap-1.5">
                {needs.length ? (
                  needs.map((n) => (
                    <Badge key={n.id} tone={priorityTone[n.priority]}>
                      {n.name}
                    </Badge>
                  ))
                ) : (
                  <p className="text-[13px] text-ink-3">No open needs recorded.</p>
                )}
              </CardBody>
            </Card>
          </div>

          <div className="grid content-start gap-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[15px] font-semibold text-ink">Opportunities</h2>
              <Badge tone="outline">{opportunities.length}</Badge>
            </div>
            {opportunities.length ? (
              opportunities.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  source={orgById.get(opp.sourceOrganizationId)}
                  target={
                    opp.targetOrganizationId ? orgById.get(opp.targetOrganizationId) : undefined
                  }
                  orgHref={(item) => `/members/${item.slug}`}
                  compact
                />
              ))
            ) : (
              <EmptyState
                icon={<Layers className="h-4 w-4" />}
                title="No opportunities yet"
                description="Nothing in this account's signals has crossed the engine's threshold."
              />
            )}
          </div>
        </div>

        <aside className="grid gap-4 self-start">
          <div className="rounded-xl border border-nav-line bg-nav p-5">
            <h2 className="text-[15px] font-semibold text-white">Internal signals</h2>
            <p className="mt-0.5 text-[12px] text-nav-ink">
              Management-only scoring. Never shown to members.
            </p>
            <div className="mt-5 grid gap-4">
              <SignalRow label="Business Shifu fit" value={org.shifuFitScore} />
              <SignalRow label="Founder dependency" value={org.founderDependencyScore} />
              <SignalRow label="Engagement" value={org.engagementScore} />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Workspace activity</CardTitle>
              <span className="text-[11px] text-ink-3">Last 90 days</span>
            </CardHeader>
            <div className="divide-y divide-line text-[13px]">
              {[
                ["Workspace visits", org.visitsLast90],
                ["Meeting room bookings", org.meetingRoomBookingsLast90],
                ["Events attended", eventsAttended],
                ["Contacts on file", people.length]
              ].map(([label, value]) => (
                <div key={String(label)} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-ink-2">{label}</span>
                  <span className="tabular font-medium text-ink">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
            </CardHeader>
            <CardBody>
              {interactions.length ? (
                <ol className="relative grid gap-4 border-l border-line pl-4">
                  {interactions.map((interaction) => (
                    <li key={interaction.id} className="relative">
                      <span className="absolute -left-[21px] top-1.5 h-1.5 w-1.5 rounded-full bg-brand ring-4 ring-surface" />
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[13px] font-medium text-ink">
                          {interactionLabel(interaction.type)}
                        </span>
                        <span className="shrink-0 text-[11px] text-ink-3">
                          {formatDate(interaction.occurredAt)}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[12px] leading-5 text-ink-3">
                        {interaction.description}
                      </p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-[13px] text-ink-3">No logged interactions.</p>
              )}
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  );
}
