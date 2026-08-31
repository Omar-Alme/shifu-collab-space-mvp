import { ArrowRight, Building2, Network } from "lucide-react";
import Image from "next/image";
import { demoLogin } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import collabspaceLogo from "@/app/Collabspace-Logo.webp";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl">
        <div className="mb-8">
          <Image src={collabspaceLogo} alt="CollabSpace" className="h-auto w-48" priority />
          <div className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">CollabOS</div>
          <h1 className="mt-3 max-w-3xl text-5xl font-semibold tracking-normal text-[var(--foreground)]">
            Turn a business community into a measurable opportunity engine.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted-foreground)]">
            A private operating platform for CollabSpace to understand members, create introductions, and surface membership and Business Shifu opportunities.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <Building2 className="mb-5 h-8 w-8 text-[var(--primary)]" />
            <h2 className="text-2xl font-semibold">Admin demo</h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              View ecosystem intelligence, opportunities, Growth Hack output, and internal revenue signals.
            </p>
            <form action={demoLogin} className="mt-6">
              <input type="hidden" name="role" value="admin" />
              <Button className="w-full">
                Continue as admin <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-3 text-xs text-[var(--muted-foreground)]">
              admin@collabos.demo / collabos-demo
            </p>
          </Card>
          <Card className="p-6">
            <Network className="mb-5 h-8 w-8 text-[var(--accent)]" />
            <h2 className="text-2xl font-semibold">Member demo</h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Search the member network, view public business profiles, and discover recommended connections.
            </p>
            <form action={demoLogin} className="mt-6">
              <input type="hidden" name="role" value="member" />
              <Button variant="dark" className="w-full">
                Continue as member <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-3 text-xs text-[var(--muted-foreground)]">
              member@collabos.demo / collabos-demo
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}
