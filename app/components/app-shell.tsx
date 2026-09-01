import { Sidebar, Topbar } from "@/app/components/sidebar";
import type { Role } from "@/lib/types";

export function AppShell({
  children,
  role
}: {
  children: React.ReactNode;
  role: Role;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar role={role} />
      <div className="lg:pl-60">
        <Topbar role={role} />
        <main className="px-4 py-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[1180px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
