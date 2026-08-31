import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getData } from "@/lib/data";

export default async function EventsPage() {
  const data = await getData();
  return (
    <div className="mx-auto max-w-7xl">
      <Badge tone="primary">Event Intelligence</Badge>
      <h1 className="mt-4 text-4xl font-semibold">Events that produce measurable follow-up</h1>
      <p className="mt-3 max-w-3xl text-[var(--muted-foreground)]">
        CollabOS connects attendance, member needs and service supply so Growth Hack can show outcomes after the room clears.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {data.events.map((event) => (
          <Card key={event.id} className="p-6">
            <CalendarDays className="h-6 w-6 text-[var(--primary)]" />
            <h2 className="mt-5 text-xl font-semibold">{event.name}</h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{event.description}</p>
            <div className="mt-5 flex items-center justify-between">
              <Badge>{event.attendeeCount} attendees</Badge>
              <Link href={`/events/${event.id}`} aria-label={`View ${event.name}`}>
                <ArrowUpRight className="h-5 w-5 text-[var(--primary)]" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
