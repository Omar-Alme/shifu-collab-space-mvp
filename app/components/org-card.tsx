import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  const extraServices = Math.max(0, services.length - 3);

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-line bg-surface p-4 shadow-card transition-all hover:border-line-strong hover:shadow-raised"
    >
      <div className="flex items-start gap-3">
        <Avatar name={org.name} size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-[14px] font-semibold text-ink">{org.name}</h3>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-3 transition-colors group-hover:text-brand" />
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] text-ink-3">
            <span>{org.industry}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {org.location}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-[13px] leading-6 text-ink-2">{org.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {services.slice(0, 3).map((service) => (
          <Badge key={service.id} tone="neutral">
            {service.name}
          </Badge>
        ))}
        {extraServices ? <Badge tone="outline">+{extraServices}</Badge> : null}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-3 text-[12px]">
        <span className="min-w-0 truncate text-ink-3">
          {needs.length ? (
            <>
              Looking for{" "}
              <span className="text-ink-2">
                {needs.slice(0, 2).map((need) => need.name).join(", ")}
              </span>
            </>
          ) : (
            "No open needs listed"
          )}
        </span>
        <Badge tone="outline">{membership?.name ?? "Member"}</Badge>
      </div>
    </Link>
  );
}
