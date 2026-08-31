import { redirect } from "next/navigation";
import { getDemoRole } from "@/lib/auth";

export default async function Home() {
  const role = await getDemoRole();
  redirect(role === "admin" ? "/dashboard" : "/discover");
}
