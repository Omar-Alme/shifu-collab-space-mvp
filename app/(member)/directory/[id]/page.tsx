import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { DataPoint } from "@/components/ui/stat";
import { getData } from "@/lib/data";
import { formatMonthYear } from "@/lib/utils";

export const metadata = { title: "Business profile" };

export default async function PublicMemberProfile({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const data = await getData();
  const { id } = await params;
  const org = data.organizations.find((item) => item.slug === id);
  if (!org) notFound();

  const membership = data.memberships.find((m) => m.id === org.membershipId);
  const services = data.services.filter((s) => s.organizationId === org.id);
  const needs = data.needs.filter((n) => n.organizationId === org.id);
  const people = data.profiles.filter((p) => p.organizationId === org.id).slice(0, 3);

  return (
    <div className="mx-auto grid max-w-4xl gap-6">
      <div>
        <Link
          href="/directory"
          className="inline-flex items-center gap-1.5 text-[13px] text-ink-3 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Directory
        </Link>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <Avatar name={org.name} size="lg" />
            <div className="min-w-0">
              <h1 className="text-[22px] leading-8 text-ink">{org.name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-2">
                <span>{org.industry}</span>
                <span aria-hidden className="text-ink-3">·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {org.location}
                </span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                <Badge tone="brand">{membership?.name ?? "Member"}</Badge>
                <Badge tone="outline">Member since {formatMonthYear(org.memberSince)}</Badge>
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

      <Card>
        <CardBody>
          <p className="text-[14px] leading-7 text-ink-2">{org.description}</p>
          <div className="mt-5 grid gap-4 border-t border-line pt-4 sm:grid-cols-3">
            <DataPoint label="Team size" value={`${org.employeeCount} people`} />
            <DataPoint label="Growth stage" value={org.growthStage} />
            <DataPoint label="Based in" value={org.location} />
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>What they offer</CardTitle>
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
            <CardTitle>What they&rsquo;re looking for</CardTitle>
            <Badge tone="outline">{needs.length}</Badge>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-1.5">
            {needs.length ? (
              needs.map((n) => (
                <Badge key={n.id} tone="outline">
                  {n.name}
                </Badge>
              ))
            ) : (
              <p className="text-[13px] text-ink-3">Nothing listed right now.</p>
            )}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>People</CardTitle>
          <span className="text-[11px] text-ink-3">Public member contacts</span>
        </CardHeader>
        <div className="divide-y divide-line">
          {people.map((person) => (
            <div
              key={person.id}
              className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Avatar name={`${person.firstName} ${person.lastName}`} size="sm" />
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-ink">
                    {person.firstName} {person.lastName}
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-[12px] text-ink-3">{person.bio}</p>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-3 text-[12px]">
                <a
                  href={`mailto:${person.email}`}
                  className="inline-flex items-center gap-1.5 text-ink-2 transition-colors hover:text-brand"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {person.email}
                </a>
                <span className="inline-flex items-center gap-1.5 text-ink-3">
                  <Phone className="h-3.5 w-3.5" />
                  {person.phone}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
