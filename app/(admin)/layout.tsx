import { redirect } from "next/navigation";
import { AppShell } from "@/app/components/app-shell";
import { getDemoRole } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const role = await getDemoRole();
  if (role !== "admin") redirect("/discover");
  return <AppShell role="admin">{children}</AppShell>;
}
