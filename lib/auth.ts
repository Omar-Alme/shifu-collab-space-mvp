import { cookies } from "next/headers";
import type { Role } from "@/lib/types";

export async function getDemoRole(): Promise<Role> {
  const jar = await cookies();
  const value = jar.get("collabos-role")?.value;
  return value === "member" ? "member" : "admin";
}
