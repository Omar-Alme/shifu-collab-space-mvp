import { OrgCard } from "@/app/components/org-card";
import { Badge } from "@/components/ui/badge";
import { getData } from "@/lib/data";

export default async function MembersPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const data = await getData();
  const params = await searchParams;
  const q = (params.q ?? "").toLowerCase();
  const industry = params.industry ?? "";
  const orgs = data.organizations.filter((org) => {
    const services = data.services.filter((service) => service.organizationId === org.id);
    const matchesQuery = !q || [org.name, org.industry, org.description, ...services.map((s) => s.name)].join(" ").toLowerCase().includes(q);
    const matchesIndustry = !industry || org.industry === industry;
    return matchesQuery && matchesIndustry;
  });
  const industries = [...new Set(data.organizations.map((org) => org.industry))].sort();

  return (
    <div className="mx-auto max-w-7xl">
      <Badge tone="primary">Member Intelligence</Badge>
      <h1 className="mt-4 text-4xl font-semibold">Business Directory</h1>
      <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
        Search the CollabSpace ecosystem by company, service, industry and current business needs.
      </p>
      <form className="mt-8 grid gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-white p-4 md:grid-cols-[1fr_260px_auto]">
        <input name="q" defaultValue={params.q} placeholder="Search members, services or industries..." className="h-11 rounded-[10px] border border-[var(--border)] px-3 text-sm outline-none focus:border-[var(--primary)]" />
        <select name="industry" defaultValue={industry} className="h-11 rounded-[10px] border border-[var(--border)] px-3 text-sm">
          <option value="">All industries</option>
          {industries.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <button className="h-11 rounded-[10px] bg-[var(--shifu)] px-5 text-sm font-medium text-white">Search</button>
      </form>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {orgs.map((org) => (
          <OrgCard
            key={org.id}
            org={org}
            membership={data.memberships.find((m) => m.id === org.membershipId)}
            services={data.services.filter((s) => s.organizationId === org.id)}
            needs={data.needs.filter((n) => n.organizationId === org.id)}
            href={`/members/${org.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
