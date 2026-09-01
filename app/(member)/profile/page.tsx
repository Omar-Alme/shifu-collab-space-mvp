import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { PageHeader } from "@/components/ui/page-header";
import { getData } from "@/lib/data";
import { ReplaceLogoButton, SaveDetailsForm, TagEditor } from "./profile-editor";

export const metadata = { title: "Business profile" };

export default async function ProfilePage() {
  const data = await getData();
  const org = data.organizations.find((item) => item.id === "org-ottawa-builders")!;
  const services = data.services.filter((s) => s.organizationId === org.id);
  const needs = data.needs.filter((n) => n.organizationId === org.id);
  const industries = [...new Set(data.organizations.map((item) => item.industry))].sort();

  return (
    <div className="mx-auto grid max-w-4xl gap-6">
      <PageHeader
        title="Business profile"
        description="This is what the community sees, and what the matching engine reads when it looks for introductions."
        actions={<Badge tone="outline">Visible to all members</Badge>}
      />

      <Card>
        <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar name={org.name} size="lg" />
          <div className="min-w-0 flex-1">
            <h2 className="text-[16px] font-semibold text-ink">{org.name}</h2>
            <p className="mt-0.5 text-[13px] text-ink-2">
              {org.industry} · {org.employeeCount} employees · {org.location}
            </p>
          </div>
          <ReplaceLogoButton />
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <div>
              <CardTitle>What you offer</CardTitle>
              <p className="mt-0.5 text-[12px] text-ink-3">
                Service tags used for discovery and referral matching.
              </p>
            </div>
          </CardHeader>
          <TagEditor
            initialTags={services.map((s) => s.name)}
            tone="neutral"
            placeholder="Add a service…"
          />
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div>
              <CardTitle>What you need</CardTitle>
              <p className="mt-0.5 text-[12px] text-ink-3">
                Keep this current so CollabSpace can make stronger introductions.
              </p>
            </div>
          </CardHeader>
          <TagEditor
            initialTags={needs.map((n) => n.name)}
            tone="brand"
            placeholder="Add a need…"
          />
        </Card>
      </div>

      <Card>
        <SaveDetailsForm>
          <CardHeader>
            <div>
              <CardTitle>Public business details</CardTitle>
              <p className="mt-0.5 text-[12px] text-ink-3">
                Shown on your directory listing.
              </p>
            </div>
          </CardHeader>
          <CardBody className="grid gap-4 sm:grid-cols-2">
            <Field label="Business name">
              <Input defaultValue={org.name} />
            </Field>
            <Field label="Industry">
              <Select defaultValue={org.industry}>
                {industries.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Location">
              <Input defaultValue={org.location} />
            </Field>
            <Field label="Website">
              <Input defaultValue={org.website} />
            </Field>
            <div className="sm:col-span-2">
              <Field
                label="Description"
                hint="Two sentences on what you do and who you do it for works best."
              >
                <Textarea defaultValue={org.description} />
              </Field>
            </div>
          </CardBody>
        </SaveDetailsForm>
      </Card>
    </div>
  );
}
