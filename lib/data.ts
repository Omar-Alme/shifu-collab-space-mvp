import { unstable_noStore as noStore } from "next/cache";
import { demoData } from "@/lib/demo-data";
import { hasSupabaseEnv, createSupabaseServerClient } from "@/lib/supabase";
import type { DemoData, Introduction, OpportunityStatus } from "@/lib/types";

const localData = structuredClone(demoData) as DemoData;

function mapDbData(rows: Record<string, unknown>[]): Record<string, unknown>[] {
  return rows.map((row) => {
    const mapped: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(row)) {
      mapped[key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase())] = value;
    }
    return mapped;
  });
}

export async function getData(): Promise<DemoData> {
  noStore();
  if (!hasSupabaseEnv()) return localData;

  const supabase = createSupabaseServerClient();
  const [
    memberships,
    organizations,
    profiles,
    services,
    needs,
    events,
    attendees,
    interactions,
    opportunities,
    introductions,
    tasks
  ] = await Promise.all([
    supabase.from("memberships").select("*"),
    supabase.from("organizations").select("*"),
    supabase.from("profiles").select("*"),
    supabase.from("services").select("*"),
    supabase.from("needs").select("*"),
    supabase.from("events").select("*"),
    supabase.from("event_attendees").select("*"),
    supabase.from("interactions").select("*"),
    supabase.from("opportunities").select("*"),
    supabase.from("introductions").select("*"),
    supabase.from("tasks").select("*")
  ]);

  const errors = [memberships, organizations, profiles, services, needs, events, attendees, interactions, opportunities, introductions, tasks]
    .map((result) => result.error)
    .filter(Boolean);
  if (errors.length) {
    console.warn("Supabase unavailable, using local demo data", errors[0]?.message);
    return localData;
  }

  return {
    memberships: mapDbData(memberships.data ?? []) as DemoData["memberships"],
    organizations: mapDbData(organizations.data ?? []) as DemoData["organizations"],
    profiles: mapDbData(profiles.data ?? []) as DemoData["profiles"],
    services: mapDbData(services.data ?? []) as DemoData["services"],
    needs: mapDbData(needs.data ?? []) as DemoData["needs"],
    events: mapDbData(events.data ?? []) as DemoData["events"],
    eventAttendees: mapDbData(attendees.data ?? []) as DemoData["eventAttendees"],
    interactions: mapDbData(interactions.data ?? []) as DemoData["interactions"],
    opportunities: mapDbData(opportunities.data ?? []) as DemoData["opportunities"],
    introductions: mapDbData(introductions.data ?? []) as DemoData["introductions"],
    tasks: mapDbData(tasks.data ?? []) as DemoData["tasks"]
  };
}

export async function updateOpportunityStatus(id: string, status: OpportunityStatus) {
  if (hasSupabaseEnv()) {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("opportunities").update({ status }).eq("id", id);
    if (error) throw error;
  }
  localData.opportunities = localData.opportunities.map((opp) =>
    opp.id === id ? { ...opp, status } : opp
  );
}

export async function createIntroductionForOpportunity(opportunityId: string) {
  const opportunity = localData.opportunities.find((opp) => opp.id === opportunityId);
  if (!opportunity || !opportunity.targetOrganizationId) {
    throw new Error("This opportunity cannot create an introduction.");
  }

  const intro: Introduction = {
    id: `intro-${Date.now()}`,
    opportunityId,
    fromOrganizationId: opportunity.sourceOrganizationId,
    toOrganizationId: opportunity.targetOrganizationId,
    status: "Sent",
    notes: "Created from CollabOS opportunity engine.",
    estimatedValue: opportunity.estimatedValue,
    realizedValue: 0,
    createdAt: new Date().toISOString()
  };

  if (hasSupabaseEnv()) {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("introductions").insert({
      id: intro.id,
      opportunity_id: intro.opportunityId,
      from_organization_id: intro.fromOrganizationId,
      to_organization_id: intro.toOrganizationId,
      status: intro.status,
      notes: intro.notes,
      estimated_value: intro.estimatedValue,
      realized_value: intro.realizedValue
    });
    if (error) throw error;
    await supabase.from("opportunities").update({ status: "Introduction Sent" }).eq("id", opportunityId);
  }

  localData.introductions = [intro, ...localData.introductions];
  await updateOpportunityStatus(opportunityId, "Introduction Sent");
  return intro;
}
