"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Role } from "@/lib/types";

export async function demoLogin(formData: FormData) {
  const role = String(formData.get("role")) as Role;
  const jar = await cookies();
  jar.set("collabos-role", role, {
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  redirect(role === "admin" ? "/dashboard" : "/discover");
}

export async function switchRole(role: Role) {
  const jar = await cookies();
  jar.set("collabos-role", role, {
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  redirect(role === "admin" ? "/dashboard" : "/discover");
}
