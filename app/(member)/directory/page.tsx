import { OrgCard } from "@/app/components/org-card";
import { Badge } from "@/components/ui/badge";
import { getData } from "@/lib/data";

export default async function DirectoryPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const data = await getData();
  const params = await searchParams;
  const q = (params.q ?? "").toLowerCase();
  const orgs = data.organizations.filter((org) => {
    const services = data.services.filter((service) => service.organizationId === org.id);
    return !q || [org.name, org.industry, org.description, ...services.map((s) => s.name)].join(" ").toLowerCase().includes(q);
  });

  return (
    <div className="mx-auto max-w-7xl">
      <Badge tone="primary">CollabSpace Network</Badge>
      <h1 className="mt-4 text-4xl font-semibold">Member Directory</h1>
      <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
        Find businesses, services and expertise already inside the CollabSpace community.
      </p>
      <form className="mt-8 rounded-[var(--radius)] border border-[var(--border)] bg-white p-4">
        <input name="q" defaultValue={params.q} placeholder="Search members, services or industries..." className="h-11 w-full rounded-[10px] border border-[var(--border)] px-3 text-sm outline-none focus:border-[var(--primary)]" />
      </form>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {orgs.map((org) => (
          <OrgCard
            key={org.id}
            org={org}
            membership={data.memberships.find((m) => m.id === org.membershipId)}
            services={data.services.filter((s) => s.organizationId === org.id)}
            needs={data.needs.filter((n) => n.organizationId === org.id)}
            href={`/directory/${org.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
