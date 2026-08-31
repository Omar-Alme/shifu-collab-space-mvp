import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { initials } from "@/lib/utils";
import type { Membership, Need, Organization, ServiceTag } from "@/lib/types";

export function OrgCard({
  org,
  membership,
  services,
  needs,
  href
}: {
  org: Organization;
  membership?: Membership;
  services: ServiceTag[];
  needs: Need[];
  href: string;
}) {
  return (
    <Card className="p-5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(23,23,23,0.08)]">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[var(--shifu)] text-sm font-semibold text-white">
          {initials(org.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold">{org.name}</h3>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{org.industry}</p>
            </div>
            <Link href={href} aria-label={`View ${org.name}`}>
              <ArrowUpRight className="h-4 w-4 text-[var(--muted-foreground)]" />
            </Link>
          </div>
          <p className="mt-3 line-clamp-2 text-sm text-[var(--muted-foreground)]">
            {org.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {services.slice(0, 3).map((service) => (
              <Badge key={service.id} tone="neutral">{service.name}</Badge>
            ))}
          </div>
          <div className="mt-4 text-xs text-[var(--muted-foreground)]">
            Looking for: {needs.slice(0, 2).map((need) => need.name).join(", ")}
          </div>
          <div className="mt-3">
            <Badge tone="primary">{membership?.name ?? "Member"}</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
