import { SearchX } from "lucide-react";
import { OrgCard } from "@/app/components/org-card";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input, Select } from "@/components/ui/field";
import { PageHeader } from "@/components/ui/page-header";
import { getData } from "@/lib/data";

export const metadata = { title: "Directory" };

export default async function DirectoryPage({
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
    const matchesQuery =
      !q ||
      [org.name, org.industry, org.description, ...services.map((s) => s.name)]
        .join(" ")
        .toLowerCase()
        .includes(q);
    const matchesIndustry = !industry || org.industry === industry;
    return matchesQuery && matchesIndustry;
  });

  const industries = [...new Set(data.organizations.map((org) => org.industry))].sort();
  const filtered = Boolean(q || industry);

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Member directory"
        description="Businesses, services and expertise already inside the CollabSpace community."
        actions={
          <Badge tone="outline">
            {orgs.length} of {data.organizations.length} businesses
          </Badge>
        }
      />

      <Card className="p-3">
        <form className="grid gap-2 md:grid-cols-[minmax(0,1fr)_200px_auto]">
          <Input
            name="q"
            defaultValue={params.q}
            placeholder="Search by business, service or industry…"
            aria-label="Search the directory"
          />
          <Select name="industry" defaultValue={industry} aria-label="Filter by industry">
            <option value="">All industries</option>
            {industries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <div className="flex gap-2">
            <Button type="submit" variant="secondary" className="flex-1 md:flex-none">
              Search
            </Button>
            {filtered ? (
              <ButtonLink href="/directory" variant="ghost">
                Reset
              </ButtonLink>
            ) : null}
          </div>
        </form>
      </Card>

      {q ? (
        <p className="-mt-2 text-[13px] text-ink-3">
          Results for <span className="font-medium text-ink">&ldquo;{params.q}&rdquo;</span>
        </p>
      ) : null}

      {orgs.length ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
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
      ) : (
        <EmptyState
          icon={<SearchX className="h-4 w-4" />}
          title="Nothing matched that search"
          description="Try a broader term — for example “accounting” instead of a specific firm name."
          action={
            <ButtonLink href="/directory" variant="secondary" size="sm">
              Browse all businesses
            </ButtonLink>
          }
        />
      )}
    </div>
  );
}
