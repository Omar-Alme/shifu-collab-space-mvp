import { demoData } from "@/lib/demo-data";
import type { Need, Opportunity, Organization, ServiceTag } from "@/lib/types";

const relatedCategories: Record<string, string[]> = {
  Accounting: ["Accounting & Finance", "Data & Analytics"],
  "IT & Software": ["Software", "Cybersecurity", "Data & Analytics"],
  Marketing: ["Creative Services", "Media", "Events"],
  HR: ["Recruiting", "Education", "Consulting"],
  "Professional Services": ["Legal", "Insurance", "Mortgage", "Consulting"]
};

function relatedCategoryScore(need: Need, service: ServiceTag) {
  if (need.category === service.category || need.name === service.name) {
    return 50;
  }
  const related = relatedCategories[need.category] ?? [];
  if (related.includes(service.category) || related.includes(service.name)) {
    return 20;
  }
  return 0;
}

export function scoreReferral(
  source: Organization,
  target: Organization,
  needs: Need[],
  services: ServiceTag[]
) {
  let score = 0;
  let bestNeed: Need | undefined;
  let bestService: ServiceTag | undefined;

  for (const need of needs.filter((item) => item.organizationId === source.id)) {
    for (const service of services.filter((item) => item.organizationId === target.id)) {
      const pairScore = relatedCategoryScore(need, service);
      if (pairScore > score) {
        score = pairScore;
        bestNeed = need;
        bestService = service;
      }
    }
  }

  if (!bestNeed || !bestService) {
    return null;
  }

  const bothActive = source.engagementScore > 55 && target.engagementScore > 55;
  const sharedGrowthHack = demoData.eventAttendees.some(
    (a) => a.eventId === "event-growth-hack-august" && a.organizationId === source.id
  ) && demoData.eventAttendees.some(
    (a) => a.eventId === "event-growth-hack-august" && a.organizationId === target.id
  );

  score += bothActive ? 10 : 0;
  score += sharedGrowthHack ? 10 : 0;
  score += source.engagementScore > 75 || target.engagementScore > 75 ? 5 : 0;
  score += source.growthStage === target.growthStage ? 5 : 0;

  return {
    score: Math.min(score, 100),
    need: bestNeed,
    service: bestService,
    reasoning: `${source.name} is looking for ${bestNeed.name.toLowerCase()} support. ${target.name} offers ${bestService.name.toLowerCase()} services${sharedGrowthHack ? " and both recently attended Growth Hack" : ""}.`
  };
}

export function generateReferralOpportunities(): Opportunity[] {
  const generated: Opportunity[] = [];
  for (const source of demoData.organizations) {
    for (const target of demoData.organizations) {
      if (source.id === target.id) continue;
      const result = scoreReferral(source, target, demoData.needs, demoData.services);
      if (!result || result.score < 76) continue;
      generated.push({
        id: `generated-${source.id}-${target.id}`,
        type: "referral",
        sourceOrganizationId: source.id,
        targetOrganizationId: target.id,
        score: result.score,
        status: "New",
        title: `${source.name} and ${target.name}`,
        description: result.reasoning,
        reasoning: result.reasoning,
        estimatedValue: result.score * 180,
        createdAt: "2026-08-31"
      });
    }
  }
  return generated
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}
