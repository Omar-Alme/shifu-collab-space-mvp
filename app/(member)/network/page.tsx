import { Sparkles } from "lucide-react";
import { OpportunityCard } from "@/app/components/opportunity-card";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { Stat } from "@/components/ui/stat";
import { getData } from "@/lib/data";

export const metadata = { title: "Your network" };

export default async function NetworkPage() {
  const data = await getData();
  const memberOrg = data.organizations.find((org) => org.id === "org-ottawa-builders")!;
  const orgById = new Map(data.organizations.map((org) => [org.id, org]));

  const visible = data.opportunities
    .filter(
      (opp) =>
        opp.type === "referral" &&
        (opp.sourceOrganizationId === memberOrg.id ||
          opp.targetOrganizationId === memberOrg.id)
    )
    .sort((a, b) => b.score - a.score);

  const myNeedCategories = new Set(
    data.needs.filter((need) => need.organizationId === memberOrg.id).map((need) => need.category)
  );
  const matchingServices = data.services.filter(
    (service) =>
      service.organizationId !== memberOrg.id && myNeedCategories.has(service.category)
  );
  const sharedEvents = new Set(
    data.eventAttendees
      .filter((attendee) => attendee.organizationId === memberOrg.id)
      .map((attendee) => attendee.eventId)
  ).size;

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Your network"
        description="Recommendations focus on relevant businesses and warm introductions. Internal management scoring is never shown here."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat
          label="Recommended connections"
          value={visible.length}
          hint="Matched to your open needs"
        />
        <Stat
          label="Events attended"
          value={sharedEvents}
          hint="Shared rooms build warmer intros"
        />
        <Stat
          label="Matching services"
          value={matchingServices.length}
          hint="Offered across the community"
        />
      </div>

      {visible.length ? (
        <div className="grid gap-3">
          {visible.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              source={orgById.get(opp.sourceOrganizationId)}
              target={opp.targetOrganizationId ? orgById.get(opp.targetOrganizationId) : undefined}
              orgHref={(org) => `/directory/${org.slug}`}
              compact
              admin={false}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Sparkles className="h-4 w-4" />}
          title="No connections suggested yet"
          description="Add what your business is looking for and CollabSpace will match you against the network."
          action={
            <ButtonLink href="/profile" variant="secondary" size="sm">
              Update your profile
            </ButtonLink>
          }
        />
      )}
    </div>
  );
}
