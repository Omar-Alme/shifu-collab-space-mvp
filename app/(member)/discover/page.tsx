import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { OpportunityCard } from "@/app/components/opportunity-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader, CardTitle, SectionTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { getData } from "@/lib/data";
import { priorityTone } from "@/lib/display";

const shortcuts = [
  "accountant",
  "marketing",
  "legal",
  "cybersecurity",
  "recruiting",
  "construction"
];

export const metadata = { title: "Discover" };

export default async function DiscoverPage() {
  const data = await getData();
  const memberOrg = data.organizations.find((org) => org.id === "org-ottawa-builders")!;
  const orgById = new Map(data.organizations.map((org) => [org.id, org]));

  const recommendations = data.opportunities
    .filter((opp) => opp.type === "referral" && opp.sourceOrganizationId === memberOrg.id)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const myNeeds = data.needs.filter((need) => need.organizationId === memberOrg.id);

  // Most common services across the network — a real read on what's available.
  const serviceCounts = new Map<string, number>();
  for (const service of data.services) {
    serviceCounts.set(service.name, (serviceCounts.get(service.name) ?? 0) + 1);
  }
  const popular = [...serviceCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <div className="grid gap-6">
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
        <Badge tone="brand">
          <Sparkles className="h-3 w-3" />
          {data.organizations.length} businesses in your network
        </Badge>
        <h1 className="mt-3 max-w-2xl text-[26px] leading-9 text-ink sm:text-[30px] sm:leading-10">
          Find the people, businesses and expertise already inside CollabSpace.
        </h1>
        <p className="mt-2 max-w-xl text-[14px] leading-6 text-ink-2">
          Search by what you need, not by who you happen to know.
        </p>

        <form
          action="/directory"
          className="mt-6 flex max-w-2xl items-center gap-2 rounded-xl border border-line-strong bg-surface p-1.5 shadow-raised focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15"
        >
          <Search className="ml-2 h-4 w-4 shrink-0 text-ink-3" />
          <input
            name="q"
            placeholder="Bookkeeping, IT support, commercial lease…"
            aria-label="Search the member directory"
            className="h-9 min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-3"
          />
          <button
            type="submit"
            className="h-9 shrink-0 rounded-lg bg-brand px-4 text-[13px] font-medium text-white transition-colors hover:bg-brand-hover"
          >
            Search
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[12px] text-ink-3">Popular:</span>
          {shortcuts.map((item) => (
            <Link
              key={item}
              href={`/directory?q=${item}`}
              className="rounded-md border border-line bg-surface px-2 py-1 text-[12px] text-ink-2 transition-colors hover:border-brand-line hover:bg-brand-soft hover:text-brand-ink"
            >
              {item}
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="grid content-start gap-3">
          <SectionTitle
            title="Recommended for you"
            description={`Matched against what ${memberOrg.name} is currently looking for.`}
            action={
              <Link
                href="/network"
                className="inline-flex items-center gap-1 text-[13px] font-medium text-brand hover:text-brand-hover"
              >
                All connections
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          />
          {recommendations.length ? (
            recommendations.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                source={orgById.get(opp.sourceOrganizationId)}
                target={opp.targetOrganizationId ? orgById.get(opp.targetOrganizationId) : undefined}
                orgHref={(org) => `/directory/${org.slug}`}
                compact
                admin={false}
              />
            ))
          ) : (
            <EmptyState
              icon={<Sparkles className="h-4 w-4" />}
              title="No recommendations yet"
              description="Add what your business is looking for and matches will appear here."
            />
          )}
        </section>

        <aside className="grid gap-4 self-start">
          <Card>
            <CardHeader>
              <CardTitle>What you&rsquo;re looking for</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-1.5">
                {myNeeds.map((need) => (
                  <Badge key={need.id} tone={priorityTone[need.priority]}>
                    {need.name}
                  </Badge>
                ))}
              </div>
              <p className="mt-4 text-[13px] leading-6 text-ink-2">
                Keeping this current is what makes introductions land. It is the
                only thing the matching engine reads about your business.
              </p>
              <Link
                href="/profile"
                className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-brand hover:text-brand-hover"
              >
                Update your profile
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available in the network</CardTitle>
            </CardHeader>
            <div className="divide-y divide-line">
              {popular.map(([name, count]) => (
                <Link
                  key={name}
                  href={`/directory?q=${encodeURIComponent(name)}`}
                  className="flex items-center justify-between gap-3 px-4 py-2.5 transition-colors hover:bg-subtle/60"
                >
                  <span className="min-w-0 truncate text-[13px] text-ink-2">{name}</span>
                  <span className="tabular shrink-0 text-[12px] text-ink-3">{count}</span>
                </Link>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
