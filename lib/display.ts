import { Handshake, ShieldAlert, Sparkles, TrendingUp, type LucideIcon } from "lucide-react";
import type { BadgeTone } from "@/components/ui/badge";
import type { OpportunityStatus, OpportunityType } from "@/lib/types";

/* Presentation-only mappings. The engine owns the values; this file owns
   how they read on screen. */

export const opportunityMeta: Record<
  OpportunityType,
  { label: string; short: string; tone: BadgeTone; icon: LucideIcon; blurb: string }
> = {
  referral: {
    label: "Referral match",
    short: "Referral",
    tone: "brand",
    icon: Handshake,
    blurb: "A member need that another member already sells."
  },
  membership_upgrade: {
    label: "Membership upgrade",
    short: "Membership",
    tone: "success",
    icon: TrendingUp,
    blurb: "Usage patterns that outgrew the current plan."
  },
  shifu_lead: {
    label: "Business Shifu",
    short: "Shifu",
    tone: "dark",
    icon: Sparkles,
    blurb: "Operational signals pointing to a diagnostic fit."
  },
  retention: {
    label: "Retention risk",
    short: "Retention",
    tone: "warning",
    icon: ShieldAlert,
    blurb: "Quiet accounts with a renewal on the horizon."
  }
};

export const statusTone: Record<OpportunityStatus, BadgeTone> = {
  New: "brand",
  Review: "neutral",
  Contacted: "accent",
  "Introduction Sent": "accent",
  Won: "success",
  Lost: "danger"
};

export const opportunityStatuses: OpportunityStatus[] = [
  "New",
  "Review",
  "Contacted",
  "Introduction Sent",
  "Won",
  "Lost"
];

export function scoreTone(score: number) {
  if (score >= 85) return "success" as const;
  if (score >= 70) return "brand" as const;
  return "warning" as const;
}

export const introductionTone: Record<string, BadgeTone> = {
  Drafted: "neutral",
  Sent: "accent",
  Accepted: "success",
  Won: "success"
};

export const priorityTone = {
  high: "brand",
  medium: "neutral",
  low: "outline"
} as const;

export function interactionLabel(type: string) {
  return type
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
