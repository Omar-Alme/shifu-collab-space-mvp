import { createClient } from "@supabase/supabase-js";
import { demoData } from "../../lib/demo-data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.log("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to seed Supabase.");
  process.exit(0);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false }
});

function snake(row: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [
      key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
      value
    ])
  );
}

async function upsert(table: string, rows: Record<string, unknown>[]) {
  const { error } = await supabase.from(table).upsert(rows.map(snake), { onConflict: "id" });
  if (error) throw new Error(`${table}: ${error.message}`);
  console.log(`Seeded ${rows.length} ${table}`);
}

async function main() {
  await upsert("memberships", demoData.memberships);
  await upsert("organizations", demoData.organizations);
  await upsert("profiles", demoData.profiles);
  await upsert("services", demoData.services);
  await upsert("needs", demoData.needs);
  await upsert("events", demoData.events);
  await upsert("event_attendees", demoData.eventAttendees);
  await upsert("interactions", demoData.interactions);
  await upsert("opportunities", demoData.opportunities);
  await upsert("introductions", demoData.introductions);
  await upsert("tasks", demoData.tasks);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
