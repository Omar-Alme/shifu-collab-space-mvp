import Image from "next/image";
import { ArrowRight, Building2, Check, Network } from "lucide-react";
import { demoLogin } from "@/app/actions/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import collabspaceLogo from "@/app/Collabspace-Logo.webp";

const proofPoints = [
  "Every business in the ecosystem, searchable by service and need",
  "Referral matches scored from real member signals",
  "Membership, retention and Business Shifu opportunities in one pipeline",
  "Growth Hack outcomes measured after the room clears"
];

const roles = [
  {
    role: "admin",
    icon: Building2,
    title: "Management",
    email: "admin@collabos.demo",
    description:
      "Ecosystem intelligence, the opportunity engine, Growth Hack output and internal revenue signals.",
    variant: "primary" as const
  },
  {
    role: "member",
    icon: Network,
    title: "Member",
    email: "member@collabos.demo",
    description:
      "Search the member network, view public business profiles and see recommended connections.",
    variant: "secondary" as const
  }
];

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel */}
      <section className="relative hidden flex-col justify-between overflow-hidden bg-nav px-12 py-12 lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative flex items-center gap-3">
          <Image src={collabspaceLogo} alt="CollabSpace" className="h-9 w-auto rounded-md" priority />
          <span className="text-[13px] font-semibold text-white">CollabOS</span>
        </div>

        <div className="relative max-w-lg">
          <h1 className="text-[38px] leading-[1.15] text-white">
            Turn a business community into a measurable opportunity engine.
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-nav-ink">
            CollabOS is the operating layer for CollabSpace — it answers who to
            connect, contact, upgrade, retain or help next.
          </p>
          <ul className="mt-8 grid gap-3">
            {proofPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-[13px] leading-6 text-nav-ink">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-[12px] text-nav-ink/70">
          Private workspace for CollabSpace management and members.
        </p>
      </section>

      {/* Sign-in panel */}
      <section className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 lg:hidden">
            <Image src={collabspaceLogo} alt="CollabSpace" className="h-9 w-auto rounded-md" priority />
            <span className="text-[13px] font-semibold text-ink">CollabOS</span>
          </div>

          <div className="mt-8 lg:mt-0">
            <Badge tone="brand">Demo access</Badge>
            <h2 className="mt-3 text-[24px] text-ink">Choose an experience</h2>
            <p className="mt-2 text-[13px] leading-6 text-ink-2">
              Both views run on the same dataset. Management sees internal
              scoring; members see only what is safe to share.
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            {roles.map((option) => {
              const Icon = option.icon;
              return (
                <form
                  key={option.role}
                  action={demoLogin}
                  className="group rounded-xl border border-line bg-surface p-4 shadow-card transition-colors hover:border-line-strong"
                >
                  <input type="hidden" name="role" value={option.role} />
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-subtle text-ink-2">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[14px] font-semibold text-ink">{option.title}</h3>
                      <p className="mt-1 text-[13px] leading-6 text-ink-2">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <code className="truncate rounded-md border border-line bg-subtle px-2 py-1 text-[11px] text-ink-3">
                      {option.email}
                    </code>
                    <Button variant={option.variant} size="sm" type="submit">
                      Continue
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </form>
              );
            })}
          </div>

          <p className="mt-6 text-[12px] text-ink-3">
            Demo password for both accounts:{" "}
            <span className="font-medium text-ink-2">collabos-demo</span>
          </p>
        </div>
      </section>
    </main>
  );
}
