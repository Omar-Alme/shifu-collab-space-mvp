import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { OpportunityCard } from "@/app/components/opportunity-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getData } from "@/lib/data";

export default async function DiscoverPage() {
  const data = await getData();
  const memberOrg = data.organizations.find((org) => org.id === "org-ottawa-builders")!;
  const orgById = new Map(data.organizations.map((org) => [org.id, org]));
  const recommendations = data.opportunities
    .filter((opp) => opp.type === "referral" && opp.sourceOrganizationId === memberOrg.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl">
      <Badge tone="primary">Discover</Badge>
      <h1 className="mt-4 text-5xl font-semibold tracking-normal">Discover your CollabSpace network.</h1>
      <p className="mt-4 max-w-3xl text-lg text-[var(--muted-foreground)]">
        Find the people, businesses and expertise already inside your community.
      </p>
      <form action="/directory" className="mt-8 flex max-w-3xl items-center gap-3 rounded-[16px] border border-[var(--border)] bg-white p-3 shadow-[0_18px_40px_rgba(23,23,23,0.06)]">
        <Search className="ml-2 h-5 w-5 text-[var(--muted-foreground)]" />
        <input name="q" placeholder="What are you looking for?" className="h-12 min-w-0 flex-1 bg-transparent text-base outline-none" />
        <button className="rounded-[10px] bg-[var(--primary)] px-5 py-3 text-sm font-medium text-white">Search</button>
      </form>
      <div className="mt-5 flex flex-wrap gap-2">
        {["accountant", "marketing", "lawyer", "IT", "developer", "construction"].map((item) => (
          <Link key={item} href={`/directory?q=${item}`} className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-sm text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]">
            {item}
          </Link>
        ))}
      </div>
      <div className="mt-10 grid gap-6 xl:grid-cols-[1fr_360px]">
        <section>
          <h2 className="text-xl font-semibold">Recommended for You</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">Based on what Ottawa Builders Group is looking for.</p>
          <div className="mt-4 grid gap-4">
            {recommendations.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                source={orgById.get(opp.sourceOrganizationId)}
                target={opp.targetOrganizationId ? orgById.get(opp.targetOrganizationId) : undefined}
                compact
                admin={false}
              />
            ))}
          </div>
        </section>
        <Card className="p-6">
          <h2 className="text-xl font-semibold">You are looking for</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.needs.filter((need) => need.organizationId === memberOrg.id).map((need) => (
              <Badge key={need.id} tone="primary">{need.name}</Badge>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-[var(--muted-foreground)]">
            Member recommendations show useful connection context without exposing internal Shifu, retention or revenue classifications.
          </p>
          <Link href="/profile" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)]">
            Edit profile <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Card>
      </div>
    </div>
  );
}
