import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, SectionTitle } from "@/components/ui/card";
import { getData } from "@/lib/data";

export default async function ProfilePage() {
  const data = await getData();
  const org = data.organizations.find((item) => item.id === "org-ottawa-builders")!;
  const services = data.services.filter((s) => s.organizationId === org.id);
  const needs = data.needs.filter((n) => n.organizationId === org.id);
  return (
    <div className="mx-auto max-w-5xl">
      <Badge tone="primary">Member Profile</Badge>
      <h1 className="mt-4 text-4xl font-semibold">{org.name}</h1>
      <p className="mt-3 max-w-3xl text-[var(--muted-foreground)]">{org.description}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <SectionTitle title="What You Offer" description="Member-editable service tags used for discovery and referral matching." />
          <div className="mt-4 flex flex-wrap gap-2">{services.map((s) => <Badge key={s.id}>{s.name}</Badge>)}</div>
          <div className="mt-5 grid gap-3">
            <input placeholder="Add an offer..." className="h-11 rounded-[10px] border border-[var(--border)] px-3 text-sm" />
            <Button variant="secondary">Save Offers</Button>
          </div>
        </Card>
        <Card className="p-6">
          <SectionTitle title="What You Need" description="Keep this current so CollabSpace can make stronger introductions." />
          <div className="mt-4 flex flex-wrap gap-2">{needs.map((n) => <Badge key={n.id} tone="primary">{n.name}</Badge>)}</div>
          <div className="mt-5 grid gap-3">
            <input placeholder="Add a need..." className="h-11 rounded-[10px] border border-[var(--border)] px-3 text-sm" />
            <Button variant="secondary">Save Needs</Button>
          </div>
        </Card>
      </div>
      <Card className="mt-6 p-6">
        <SectionTitle title="Public Business Details" />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <input defaultValue={org.name} className="h-11 rounded-[10px] border border-[var(--border)] px-3 text-sm" />
          <input defaultValue={org.industry} className="h-11 rounded-[10px] border border-[var(--border)] px-3 text-sm" />
          <textarea defaultValue={org.description} className="min-h-28 rounded-[10px] border border-[var(--border)] p-3 text-sm md:col-span-2" />
        </div>
        <Button className="mt-5">Update Profile</Button>
      </Card>
    </div>
  );
}
