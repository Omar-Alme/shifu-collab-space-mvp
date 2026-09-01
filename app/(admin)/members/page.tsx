import Link from "next/link";
import { SearchX, Users } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input, Select } from "@/components/ui/field";
import { Meter } from "@/components/ui/meter";
import { PageHeader } from "@/components/ui/page-header";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { getData } from "@/lib/data";
import { scoreTone } from "@/lib/display";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Members" };

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
  const membershipById = new Map(data.memberships.map((m) => [m.id, m]));
  const filtered = Boolean(q || industry);

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Members"
        description="Every business in the CollabSpace ecosystem, with the internal signals that drive membership, retention and diagnostic conversations."
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
            aria-label="Search members"
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
              Apply
            </Button>
            {filtered ? (
              <ButtonLink href="/members" variant="ghost">
                Reset
              </ButtonLink>
            ) : null}
          </div>
        </form>
      </Card>

      {orgs.length ? (
        <Card className="overflow-hidden">
          <Table>
            <THead>
              <tr>
                <TH>Business</TH>
                <TH className="hidden md:table-cell">Membership</TH>
                <TH className="hidden lg:table-cell">Engagement</TH>
                <TH className="hidden lg:table-cell">Shifu fit</TH>
                <TH className="hidden xl:table-cell">Visits · 90d</TH>
                <TH className="hidden sm:table-cell">Renewal</TH>
              </tr>
            </THead>
            <tbody>
              {orgs.map((org) => {
                const membership = membershipById.get(org.membershipId);
                return (
                  <TR key={org.id}>
                    <TD>
                      <Link href={`/members/${org.slug}`} className="flex items-center gap-3">
                        <Avatar name={org.name} size="sm" />
                        <span className="min-w-0">
                          <span className="block truncate font-medium text-ink">{org.name}</span>
                          <span className="block truncate text-[12px] text-ink-3">
                            {org.industry} · {org.employeeCount} staff · {org.location}
                          </span>
                        </span>
                      </Link>
                    </TD>
                    <TD className="hidden md:table-cell">
                      <Badge tone="outline">{membership?.name ?? "Member"}</Badge>
                    </TD>
                    <TD className="hidden lg:table-cell">
                      <div className="w-24">
                        <span className="tabular text-[13px] font-medium text-ink">
                          {org.engagementScore}
                        </span>
                        <Meter
                          value={org.engagementScore}
                          tone={scoreTone(org.engagementScore)}
                          className="mt-1"
                        />
                      </div>
                    </TD>
                    <TD className="hidden lg:table-cell">
                      <div className="w-24">
                        <span className="tabular text-[13px] font-medium text-ink">
                          {org.shifuFitScore}
                        </span>
                        <Meter value={org.shifuFitScore} tone="neutral" className="mt-1" />
                      </div>
                    </TD>
                    <TD className="tabular hidden text-ink-2 xl:table-cell">
                      {org.visitsLast90}
                    </TD>
                    <TD className="hidden whitespace-nowrap text-ink-2 sm:table-cell">
                      {formatDate(org.renewalDate)}
                    </TD>
                  </TR>
                );
              })}
            </tbody>
          </Table>
        </Card>
      ) : (
        <EmptyState
          icon={filtered ? <SearchX className="h-4 w-4" /> : <Users className="h-4 w-4" />}
          title="No businesses match those filters"
          description="Try a broader search term or clear the industry filter."
          action={
            <ButtonLink href="/members" variant="secondary" size="sm">
              Clear filters
            </ButtonLink>
          }
        />
      )}
    </div>
  );
}
