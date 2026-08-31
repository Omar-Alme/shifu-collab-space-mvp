import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, SectionTitle } from "@/components/ui/card";
import { getData } from "@/lib/data";

export default async function PublicMemberProfile({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const data = await getData();
  const { id } = await params;
  const org = data.organizations.find((item) => item.slug === id);
  if (!org) notFound();
  const services = data.services.filter((s) => s.organizationId === org.id);
  const needs = data.needs.filter((n) => n.organizationId === org.id);
  const people = data.profiles.filter((p) => p.organizationId === org.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl">
      <Badge tone="primary">{org.industry}</Badge>
      <h1 className="mt-4 text-4xl font-semibold">{org.name}</h1>
      <p className="mt-3 max-w-3xl text-lg text-[var(--muted-foreground)]">{org.description}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <SectionTitle title="Offers" />
          <div className="mt-4 flex flex-wrap gap-2">{services.map((s) => <Badge key={s.id}>{s.name}</Badge>)}</div>
        </Card>
        <Card className="p-6">
          <SectionTitle title="Looking For" />
          <div className="mt-4 flex flex-wrap gap-2">{needs.map((n) => <Badge key={n.id} tone="neutral">{n.name}</Badge>)}</div>
        </Card>
      </div>
      <Card className="mt-6 p-6">
        <SectionTitle title="People" description="Public member contacts attached to this organization." />
        <div className="mt-4 grid gap-3">
          {people.map((person) => (
            <div key={person.id} className="flex flex-col gap-2 rounded-[12px] border border-[var(--border)] p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-medium">{person.firstName} {person.lastName}</div>
                <div className="text-sm text-[var(--muted-foreground)]">{person.bio}</div>
              </div>
              <Badge>{person.email}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
