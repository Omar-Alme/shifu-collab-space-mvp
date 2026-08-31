import { AppShell } from "@/app/components/app-shell";
import { getDemoRole } from "@/lib/auth";

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const role = await getDemoRole();
  return <AppShell role={role}>{children}</AppShell>;
}
