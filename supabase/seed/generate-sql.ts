import { demoData } from "../../lib/demo-data";

const table = process.argv[2] as keyof typeof demoData | undefined;

if (!table || !(table in demoData)) {
  console.error(`Usage: tsx supabase/seed/generate-sql.ts <${Object.keys(demoData).join("|")}>`);
  process.exit(1);
}

function snakeKey(key: string) {
  return key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function snakeRow(row: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [snakeKey(key), value ?? null])
  );
}

const tableName = table === "eventAttendees" ? "event_attendees" : table;
const rows = (demoData[table] as Record<string, unknown>[]).map(snakeRow);
function literal(value: unknown) {
  if (value === null || value === undefined || value === "") return "null";
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  return `'${String(value).replace(/'/g, "''")}'`;
}

const columns = Object.keys(rows[0] ?? {});
const values = rows
  .map((row) => `(${columns.map((column) => literal(row[column])).join(", ")})`)
  .join(",\n");

console.log(`insert into ${tableName} (${columns.join(", ")}) values`);
console.log(values);
console.log(";");
console.log(`-- ${rows.length} rows`);
