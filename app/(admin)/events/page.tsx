import Link from "next/link";
import { ArrowUpRight, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { getData } from "@/lib/data";
import { formatDayParts } from "@/lib/utils";

export const metadata = { title: "Events" };

function DateBlock({ value }: { value: string }) {
  const { month, day } = formatDayParts(value);
  return (
    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg border border-line bg-subtle">
      <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-brand">
        {month}
      </span>
      <span className="tabular text-[16px] font-semibold leading-none text-ink">{day}</span>
    </div>
  );
}

export default async function EventsPage() {
  const data = await getData();
  const events = [...data.events].sort((a, b) => (a.startAt < b.startAt ? 1 : -1));

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Events"
        description="CollabOS connects attendance, member needs and service supply so every event can show what it produced after the room clears."
        actions={<Badge tone="outline">{events.length} events</Badge>}
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => {
          const attendees = data.eventAttendees.filter((a) => a.eventId === event.id);
          const guests = attendees.filter((a) => a.status === "guest").length;
          return (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group flex flex-col rounded-xl border border-line bg-surface p-4 shadow-card transition-all hover:border-line-strong hover:shadow-raised"
            >
              <div className="flex items-start gap-3">
                <DateBlock value={event.startAt} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="truncate text-[14px] font-semibold text-ink">{event.name}</h2>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-3 transition-colors group-hover:text-brand" />
                  </div>
                  <Badge tone="outline" className="mt-1">
                    {event.type}
                  </Badge>
                </div>
              </div>

              <p className="mt-3 line-clamp-2 text-[13px] leading-6 text-ink-2">
                {event.description}
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-3 text-[12px] text-ink-3">
                <span className="inline-flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span className="tabular">{event.attendeeCount}</span> attendees
                </span>
                {guests ? (
                  <span className="tabular">{guests} guests</span>
                ) : null}
                <span className="inline-flex min-w-0 items-center gap-1">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
