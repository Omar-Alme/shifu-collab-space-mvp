import type { DemoData, EventAttendee, Interaction, Need, Opportunity, Profile, ServiceTag } from "@/lib/types";

const today = "2026-08-31";

export const memberships = [
  { id: "m-community", name: "Community", category: "network", price: 49, description: "Directory access, events, and community benefits." },
  { id: "m-coworking", name: "Coworking", category: "workspace", price: 249, description: "Flexible workspace access for independent professionals." },
  { id: "m-full", name: "Full Access", category: "workspace", price: 499, description: "Daily access, meeting room credits, and event privileges." },
  { id: "m-private", name: "Private Office", category: "office", price: 1400, description: "Dedicated office space for growing teams." }
];

const orgSeed = [
  ["org-ottawa-builders", "Ottawa Builders Group", "ottawa-builders-group", "Construction", "Commercial renovation firm serving property managers and growing Ottawa businesses.", "18", "$1M-$3M", "Scale-up", "Nepean", "m-full", 72, 88, 78, 34, 7, "2026-11-15"],
  ["org-cloudledger", "CloudLedger CPA", "cloudledger-cpa", "Accounting & Finance", "Bookkeeping, controllership and fractional CFO support for owner-led companies.", "9", "$750K-$1M", "Growth", "Kanata", "m-coworking", 42, 91, 61, 28, 4, "2027-02-10"],
  ["org-northstar", "Northstar Marketing", "northstar-marketing", "Marketing", "Performance marketing studio helping local service companies grow qualified pipeline.", "11", "$750K-$1M", "Growth", "Nepean", "m-community", 58, 86, 74, 42, 11, "2027-01-04"],
  ["org-capitaltech", "CapitalTech Solutions", "capitaltech-solutions", "IT & Software", "Managed IT, cybersecurity and automation partner for Ottawa SMEs.", "22", "$3M-$5M", "Scale-up", "Kanata", "m-private", 49, 81, 68, 25, 5, "2027-03-20"],
  ["org-riverside-legal", "Riverside Legal", "riverside-legal", "Legal", "Business law practice focused on contracts, leases, incorporations and acquisitions.", "7", "$500K-$750K", "Established", "Downtown Ottawa", "m-coworking", 36, 67, 47, 16, 2, "2027-04-02"],
  ["org-summit-hr", "Summit HR Partners", "summit-hr-partners", "HR", "Fractional HR and recruiting support for teams moving from founder-led to managed.", "6", "$500K-$750K", "Growth", "Kanata", "m-community", 40, 24, 43, 1, 0, "2026-10-19"],
  ["org-precision", "Precision Manufacturing", "precision-manufacturing", "Manufacturing", "Specialty component manufacturer with rising demand and strained operations.", "18", "$3M-$5M", "Scale-up", "Nepean", "m-full", 88, 79, 91, 29, 6, "2027-05-12"],
  ["org-mapleworks", "MapleWorks Construction", "mapleworks-construction", "Construction", "Residential and light commercial builder expanding into multi-unit projects.", "14", "$1M-$3M", "Growth", "Nepean", "m-coworking", 70, 82, 73, 31, 6, "2027-01-17"],
  ["org-kanata-digital", "Kanata Digital", "kanata-digital", "Software", "Product design and web application studio for business process tools.", "8", "$750K-$1M", "Growth", "Kanata", "m-full", 46, 77, 58, 19, 5, "2027-02-28"],
  ["org-capital-creative", "Capital Creative Studio", "capital-creative-studio", "Creative Services", "Brand identity, photography and launch assets for professional services firms.", "5", "$250K-$500K", "Early", "Downtown Ottawa", "m-community", 37, 73, 39, 12, 2, "2026-12-12"],
  ["org-barrhaven-dental", "Barrhaven Dental Collective", "barrhaven-dental-collective", "Healthcare", "Growing dental clinic group modernizing patient operations and marketing.", "31", "$5M-$10M", "Scale-up", "Barrhaven", "m-private", 81, 69, 87, 17, 4, "2027-06-01"],
  ["org-rideau-realty", "Rideau Realty Advisors", "rideau-realty-advisors", "Real Estate", "Commercial real estate advisory for office, retail and mixed-use tenants.", "10", "$1M-$3M", "Established", "Ottawa", "m-coworking", 44, 64, 52, 13, 3, "2026-12-30"],
  ["org-byward-ecom", "Byward Ecommerce Co.", "byward-ecommerce-co", "Ecommerce", "Direct-to-consumer home goods brand scaling fulfillment and paid acquisition.", "16", "$3M-$5M", "Scale-up", "Nepean", "m-full", 84, 76, 89, 22, 4, "2027-05-08"],
  ["org-greenline", "Greenline Energy Services", "greenline-energy-services", "Energy", "Energy retrofit consultancy serving commercial landlords and institutions.", "12", "$1M-$3M", "Growth", "Kanata", "m-community", 53, 52, 65, 9, 1, "2026-11-07"],
  ["org-civic-grants", "Civic Grants Lab", "civic-grants-lab", "Consulting", "Grant writing and funding strategy for nonprofits and social enterprises.", "4", "$250K-$500K", "Early", "Nepean", "m-coworking", 34, 71, 36, 15, 2, "2027-04-21"],
  ["org-stonebridge", "Stonebridge Insurance", "stonebridge-insurance", "Insurance", "Commercial insurance brokerage for trades, clinics and growing companies.", "13", "$1M-$3M", "Established", "Barrhaven", "m-full", 43, 80, 49, 26, 5, "2027-01-25"],
  ["org-urban-pulse", "Urban Pulse Fitness", "urban-pulse-fitness", "Fitness", "Boutique fitness group opening new Ottawa locations.", "24", "$1M-$3M", "Scale-up", "Nepean", "m-community", 79, 59, 83, 8, 2, "2026-10-28"],
  ["org-lansdowne-foods", "Lansdowne Foods", "lansdowne-foods", "Food & Hospitality", "Specialty catering and prepared meals company serving offices and events.", "20", "$1M-$3M", "Growth", "Ottawa", "m-coworking", 66, 75, 72, 20, 3, "2027-03-09"],
  ["org-glebe-analytics", "Glebe Analytics", "glebe-analytics", "Data & Analytics", "Dashboard and data warehouse implementation for operations teams.", "6", "$500K-$750K", "Early", "Downtown Ottawa", "m-full", 39, 68, 55, 18, 2, "2027-02-14"],
  ["org-elmwood-print", "Elmwood Print House", "elmwood-print-house", "Print & Signage", "Fast-turn signage, trade show booths and print collateral.", "15", "$750K-$1M", "Established", "Nepean", "m-coworking", 41, 62, 44, 14, 1, "2026-12-03"],
  ["org-ottawa-immigration", "Ottawa Immigration Counsel", "ottawa-immigration-counsel", "Immigration", "Immigration advisory for entrepreneurs, families and skilled workers.", "8", "$750K-$1M", "Growth", "Kanata", "m-community", 45, 57, 50, 7, 1, "2026-10-11"],
  ["org-laurier-learning", "Laurier Learning", "laurier-learning", "Education", "Corporate training and leadership workshops for Canadian SMEs.", "9", "$750K-$1M", "Growth", "Ottawa", "m-full", 55, 78, 64, 21, 3, "2027-04-16"],
  ["org-pinecrest-cleaning", "Pinecrest Commercial Cleaning", "pinecrest-commercial-cleaning", "Facilities", "Commercial cleaning company serving offices, clinics and retail.", "32", "$3M-$5M", "Scale-up", "Nepean", "m-community", 76, 46, 84, 5, 0, "2026-10-23"],
  ["org-meridian-mortgage", "Meridian Mortgage Group", "meridian-mortgage-group", "Mortgage", "Mortgage brokerage focused on business owners and real estate investors.", "7", "$500K-$750K", "Growth", "Kanata", "m-coworking", 38, 74, 42, 16, 2, "2027-02-03"],
  ["org-hintonburg-video", "Hintonburg Video Works", "hintonburg-video-works", "Media", "Video production for founders, courses, case studies and social distribution.", "5", "$250K-$500K", "Early", "Hintonburg", "m-community", 31, 63, 37, 10, 1, "2027-01-02"],
  ["org-orleans-physio", "Orleans Physio Group", "orleans-physio-group", "Healthcare", "Physiotherapy clinic group adding locations and digitizing patient intake.", "28", "$3M-$5M", "Scale-up", "Orleans", "m-coworking", 77, 58, 86, 8, 1, "2026-11-22"],
  ["org-sparks-consulting", "Sparks Strategy", "sparks-strategy", "Consulting", "Strategic planning and facilitation for nonprofits and founder-led teams.", "3", "$250K-$500K", "Early", "Downtown Ottawa", "m-community", 35, 21, 34, 0, 0, "2026-09-29"],
  ["org-canal-cyber", "Canal Cyber Defence", "canal-cyber-defence", "Cybersecurity", "Security audits, phishing training and compliance readiness for SMBs.", "10", "$1M-$3M", "Growth", "Kanata", "m-full", 48, 70, 57, 17, 2, "2027-03-19"],
  ["org-westboro-events", "Westboro Event Co.", "westboro-event-co", "Events", "Corporate event planning and sponsorship activation.", "6", "$500K-$750K", "Growth", "Westboro", "m-coworking", 43, 84, 45, 24, 4, "2027-02-20"],
  ["org-parliament-payroll", "Parliament Payroll", "parliament-payroll", "Accounting & Finance", "Payroll, benefits setup and compliance support for Canadian teams.", "12", "$1M-$3M", "Growth", "Ottawa", "m-full", 39, 72, 51, 20, 3, "2027-05-01"],
  ["org-tulip-tech", "Tulip Tech Recruiting", "tulip-tech-recruiting", "Recruiting", "Technical hiring and talent pipeline support for software and IT companies.", "7", "$750K-$1M", "Growth", "Kanata", "m-community", 36, 66, 48, 12, 1, "2026-12-06"],
  ["org-bank-street", "Bank Street Legal Ops", "bank-street-legal-ops", "Legal Tech", "Contract workflow and legal operations consulting.", "5", "$500K-$750K", "Early", "Ottawa", "m-coworking", 45, 65, 54, 11, 1, "2027-04-07"],
  ["org-brightpath", "BrightPath Home Care", "brightpath-home-care", "Healthcare", "Home care provider expanding scheduling, hiring and compliance systems.", "42", "$5M-$10M", "Scale-up", "Nepean", "m-community", 86, 49, 92, 4, 0, "2026-11-03"],
  ["org-redwood-retail", "Redwood Retail Group", "redwood-retail-group", "Retail", "Specialty retail operator with three Ottawa locations and ecommerce growth.", "26", "$3M-$5M", "Scale-up", "Ottawa", "m-full", 71, 61, 79, 13, 2, "2027-03-02"],
  ["org-lighthouse-nonprofit", "Lighthouse Impact", "lighthouse-impact", "Nonprofit", "Social enterprise helping newcomer founders access training and advisors.", "9", "$500K-$750K", "Growth", "Nepean", "m-coworking", 44, 69, 46, 17, 3, "2027-06-14"]
] as const;

export const organizations = orgSeed.map((o) => ({
  id: o[0],
  name: o[1],
  slug: o[2],
  industry: o[3],
  description: o[4],
  website: `https://example.com/${o[2]}`,
  employeeCount: Number(o[5]),
  annualRevenueRange: o[6],
  growthStage: o[7],
  location: o[8],
  membershipId: o[9],
  founderDependencyScore: Number(o[10]),
  engagementScore: Number(o[11]),
  shifuFitScore: Number(o[12]),
  visitsLast90: Number(o[13]),
  meetingRoomBookingsLast90: Number(o[14]),
  renewalDate: o[15],
  memberSince: `${2022 + (orgSeed.findIndex((x) => x[0] === o[0]) % 4)}-0${(orgSeed.findIndex((x) => x[0] === o[0]) % 8) + 1}-15`,
  createdAt: today
}));

export const profiles: Profile[] = organizations.flatMap((org, index) => {
  const names = [
    ["Sarah", "Chen"], ["Marcus", "Bell"], ["Ava", "Tremblay"], ["Noah", "Patel"], ["Maya", "Singh"],
    ["Ethan", "Fraser"], ["Leah", "Martin"], ["Oliver", "Grant"], ["Nora", "Haddad"], ["Lucas", "Wong"],
    ["Amira", "Khan"], ["Ben", "MacDonald"], ["Sofia", "Ricci"], ["Daniel", "Wilson"], ["Priya", "Kapoor"],
    ["Jonah", "Reed"], ["Claire", "Beaulieu"], ["Adam", "Hussein"], ["Lina", "Roy"], ["Thomas", "Greene"],
    ["Elise", "Morrison"], ["Ryan", "O'Neill"], ["Grace", "Lee"], ["Sam", "Alvarez"], ["Mila", "Brooks"],
    ["Jack", "Mansour"], ["Ivy", "Nguyen"], ["Hassan", "Youssef"], ["Chloe", "Carter"], ["Andre", "Leduc"],
    ["Tara", "Bennett"], ["Zain", "Malik"], ["Emma", "Stone"], ["Victor", "Chen"], ["Rachel", "Dube"]
  ];
  const primary = names[index % names.length];
  const secondary = names[(index + 9) % names.length];
  return [
    {
      id: `profile-${org.slug}-1`,
      firstName: primary[0],
      lastName: primary[1],
      email: `${primary[0].toLowerCase()}.${primary[1].toLowerCase().replace(/'/g, "")}@${org.slug}.demo`,
      phone: "613-555-01" + String(index).padStart(2, "0"),
      role: index === 1 ? "member" : "admin",
      organizationId: org.id,
      bio: `Founder or senior operator at ${org.name}, active in the CollabSpace business community.`,
      linkedinUrl: "https://www.linkedin.com/",
      createdAt: today
    },
    ...(index < 15
      ? [{
          id: `profile-${org.slug}-2`,
          firstName: secondary[0],
          lastName: secondary[1],
          email: `${secondary[0].toLowerCase()}.${secondary[1].toLowerCase().replace(/'/g, "")}@${org.slug}.demo`,
          phone: "613-555-02" + String(index).padStart(2, "0"),
          role: "member" as const,
          organizationId: org.id,
          bio: `Growth, operations or relationship lead at ${org.name}.`,
          linkedinUrl: "https://www.linkedin.com/",
          createdAt: today
        }]
      : [])
  ];
});

profiles.unshift({
  id: "profile-admin-demo",
  firstName: "Emile",
  lastName: "Demo",
  email: "admin@collabos.demo",
  phone: "613-555-0001",
  role: "admin",
  organizationId: "org-ottawa-builders",
  bio: "CollabSpace leadership demo account.",
  linkedinUrl: "https://www.linkedin.com/in/emile-salem-58a5929/",
  createdAt: today
});
profiles.unshift({
  id: "profile-member-demo",
  firstName: "Sarah",
  lastName: "Member",
  email: "member@collabos.demo",
  phone: "613-555-0002",
  role: "member",
  organizationId: "org-ottawa-builders",
  bio: "Member demo account looking for accounting, IT and marketing support.",
  linkedinUrl: "https://www.linkedin.com/",
  createdAt: today
});

const serviceMap: Record<string, string[]> = {
  "Accounting & Finance": ["Bookkeeping", "Fractional CFO", "Tax Planning", "Payroll", "KPI Dashboards"],
  Construction: ["Commercial Renovation", "Project Management", "Design Build", "Tenant Improvements"],
  Marketing: ["Lead Generation", "SEO", "Paid Media", "Brand Strategy", "Content Systems"],
  "IT & Software": ["Managed IT", "Cybersecurity", "Workflow Automation", "CRM Integration"],
  Software: ["Web Applications", "Product Design", "Internal Tools", "Automation"],
  Legal: ["Contracts", "Leases", "Incorporation", "M&A Support"],
  HR: ["Recruiting", "HR Policies", "Compensation", "Leadership Training"],
  Manufacturing: ["Precision Components", "Supplier Management", "Production Planning"],
  Healthcare: ["Patient Operations", "Clinic Management", "Scheduling", "Compliance"],
  Ecommerce: ["Fulfillment", "Shopify Operations", "Inventory", "Customer Retention"],
  Consulting: ["Strategic Planning", "Facilitation", "Grant Strategy", "Operating Cadence"],
  "Creative Services": ["Brand Identity", "Photography", "Launch Assets", "Pitch Design"],
  Facilities: ["Office Cleaning", "Clinic Cleaning", "Janitorial Supplies"],
  Cybersecurity: ["Security Audit", "Phishing Training", "Compliance Readiness"],
  Events: ["Event Planning", "Sponsorship", "Trade Show Booths"],
  Recruiting: ["Technical Recruiting", "Talent Pipeline", "Interview Process"],
  "Data & Analytics": ["Dashboards", "Data Warehouse", "Revenue Reporting"],
  Insurance: ["Commercial Insurance", "Risk Review", "Benefits"],
  Mortgage: ["Commercial Mortgage", "Investor Financing", "Refinancing"],
  Media: ["Founder Video", "Case Studies", "Social Clips"],
  "Food & Hospitality": ["Catering", "Corporate Meals", "Event Food"],
  Energy: ["Energy Retrofit", "Grant Support", "Building Audit"],
  "Print & Signage": ["Signage", "Trade Show Booths", "Print Collateral"],
  Immigration: ["Founder Immigration", "Skilled Worker", "Work Permits"],
  Education: ["Corporate Training", "Leadership Workshops", "Onboarding"],
  "Legal Tech": ["Contract Workflow", "Legal Operations", "Document Automation"],
  Retail: ["Retail Operations", "POS Optimization", "Inventory Systems"],
  Nonprofit: ["Founder Training", "Community Programs", "Advisor Matching"],
  Fitness: ["Wellness Programming", "Team Fitness", "Local Partnerships"],
  "Real Estate": ["Tenant Advisory", "Lease Negotiation", "Office Search"]
};

export const services: ServiceTag[] = organizations.flatMap((org) =>
  (serviceMap[org.industry] ?? ["Business Support", "Advisory"]).map((name, i) => ({
    id: `svc-${org.slug}-${i}`,
    organizationId: org.id,
    name,
    category: name.includes("CFO") || name.includes("Bookkeeping") || name.includes("Payroll") ? "Accounting" : org.industry,
    description: `${org.name} offers ${name.toLowerCase()} support for Ottawa businesses.`
  }))
);

const needPool = ["Bookkeeping", "Fractional CFO", "Cybersecurity", "Lead Generation", "Contracts", "Recruiting", "CRM Integration", "Payroll", "Brand Strategy", "Commercial Insurance", "Leadership Training", "KPI Dashboards", "Workflow Automation", "Office Search", "Event Sponsorship", "Signage", "Catering", "Grant Support", "Patient Scheduling", "Inventory Systems"];

export const needs: Need[] = organizations.flatMap((org, index) =>
  [0, 1].map((offset) => {
    const name = needPool[(index + offset * 5) % needPool.length];
    return {
      id: `need-${org.slug}-${offset}`,
      organizationId: org.id,
      name,
      category: name.includes("Bookkeeping") || name.includes("CFO") || name.includes("Payroll") ? "Accounting" : name.includes("CRM") || name.includes("Cybersecurity") || name.includes("Dashboards") ? "IT & Software" : name.includes("Recruiting") || name.includes("Leadership") ? "HR" : name.includes("Lead") || name.includes("Brand") ? "Marketing" : "Professional Services",
      priority: offset === 0 ? "high" : "medium",
      description: `${org.name} is looking for ${name.toLowerCase()} support.`
    };
  })
);

export const events = [
  { id: "event-growth-hack-august", name: "Growth Hack - August", type: "Growth Hack", location: "70 Bongard Avenue, Nepean", startAt: "2026-08-20T18:00:00-04:00", attendeeCount: 112, description: "Monthly trade-show style networking event for Ottawa entrepreneurs and business owners." },
  { id: "event-founder-roundtable", name: "Founder Systems Roundtable", type: "Workshop", location: "300 March Road, Kanata", startAt: "2026-07-16T17:30:00-04:00", attendeeCount: 36, description: "Operators discuss systems, delegation and growth bottlenecks." },
  { id: "event-member-breakfast", name: "Member Referral Breakfast", type: "Networking", location: "70 Bongard Avenue, Nepean", startAt: "2026-06-18T08:30:00-04:00", attendeeCount: 54, description: "Member-only breakfast focused on referrals and warm introductions." }
];

export const eventAttendees: EventAttendee[] = profiles.slice(0, 56).map((profile, index) => ({
  id: `attendee-${index}`,
  eventId: index < 48 ? "event-growth-hack-august" : index % 2 ? "event-founder-roundtable" : "event-member-breakfast",
  profileId: profile.id,
  organizationId: profile.organizationId,
  status: index % 5 === 0 ? "guest" : index % 7 === 0 ? "vendor" : "member",
  attended: true
}));

export const interactions: Interaction[] = organizations.slice(0, 30).map((org, index) => ({
  id: `interaction-${index}`,
  organizationId: org.id,
  profileId: profiles.find((p) => p.organizationId === org.id)?.id ?? "profile-admin-demo",
  type: index % 4 === 0 ? "room_booking" : index % 4 === 1 ? "event_follow_up" : index % 4 === 2 ? "tour" : "intro_call",
  description: index % 4 === 0 ? "Booked a meeting room for client work." : index % 4 === 1 ? "Follow-up conversation after Growth Hack." : index % 4 === 2 ? "Discussed membership options for a growing team." : "Warm introduction call logged by community team.",
  occurredAt: `2026-08-${String((index % 24) + 1).padStart(2, "0")}T10:00:00-04:00`
}));

export const opportunities: Opportunity[] = [
  ["opp-1", "referral", "org-ottawa-builders", "org-cloudledger", 94, "New", "Ottawa Builders needs accounting support", "Ottawa Builders is looking for bookkeeping and fractional CFO support.", "Ottawa Builders needs accounting support and CloudLedger provides bookkeeping, tax and fractional CFO services. Both businesses recently attended Growth Hack.", 18000],
  ["opp-2", "referral", "org-mapleworks", "org-cloudledger", 94, "Review", "MapleWorks and CloudLedger", "MapleWorks is scaling projects and needs financial controls.", "MapleWorks Construction is actively looking for bookkeeping support. CloudLedger provides bookkeeping and fractional CFO services. Both businesses recently attended Growth Hack.", 16000],
  ["opp-3", "referral", "org-byward-ecom", "org-capitaltech", 88, "New", "Byward Ecommerce needs automation", "Byward Ecommerce needs CRM and workflow automation support.", "Byward Ecommerce has fulfillment and CRM bottlenecks. CapitalTech provides automation and CRM integration for growing SMEs.", 22000],
  ["opp-4", "referral", "org-urban-pulse", "org-northstar", 86, "Contacted", "Urban Pulse growth campaign", "Urban Pulse is opening new locations and needs lead generation.", "Urban Pulse is expanding locations. Northstar Marketing provides lead generation and paid media for local service companies.", 14000],
  ["opp-5", "membership_upgrade", "org-northstar", undefined, 89, "New", "Northstar Marketing upgrade path", "High meeting room usage and growing team suggest Full Access or Private Office.", "Northstar is on Community membership with 42 recent visits, 11 room bookings and strong event engagement. A Full Access or Private Office follow-up is warranted.", 5400],
  ["opp-6", "membership_upgrade", "org-pinecrest-cleaning", undefined, 73, "Review", "Pinecrest needs workspace consistency", "Large team and renewal approaching with low workspace usage.", "Pinecrest has 32 employees and likely needs a more structured workspace touchpoint before renewal.", 12000],
  ["opp-7", "shifu_lead", "org-precision", undefined, 91, "New", "Precision Manufacturing diagnostic", "High Business Shifu fit based on operations, founder dependency and revenue stage.", "Precision has 18 employees, growing revenue and founder dependency. Signals point to operational bottlenecks and a strong fit for a Business Shifu diagnostic.", 5000],
  ["opp-8", "shifu_lead", "org-barrhaven-dental", undefined, 87, "Review", "Barrhaven Dental systems opportunity", "Clinic group growth creates process, leadership and KPI dashboard needs.", "Barrhaven Dental has 31 employees and multi-location complexity. Business diagnostics and operational systems could create measurable leverage.", 30000],
  ["opp-9", "shifu_lead", "org-brightpath", undefined, 92, "New", "BrightPath owner-dependency signal", "Home care provider shows strong Shifu diagnostic potential.", "BrightPath has 42 employees, compliance pressure and high founder dependency. It is an excellent candidate for diagnostics, leadership systems and KPI dashboards.", 30000],
  ["opp-10", "retention", "org-summit-hr", undefined, 82, "New", "Summit HR renewal risk", "No visit in 52 days, no recent event attendance and renewal is approaching.", "Summit HR has low recent engagement and an upcoming renewal. A human check-in should happen before the renewal conversation.", 249],
  ["opp-11", "retention", "org-sparks-consulting", undefined, 79, "Contacted", "Sparks Strategy engagement risk", "No recent visits and membership renewal is within 30 days.", "Sparks Strategy has very low activity and an approaching renewal. A retention follow-up can reconnect them to useful referrals.", 49],
  ["opp-12", "referral", "org-elmwood-print", "org-westboro-events", 83, "Introduction Sent", "Event booth partner match", "Westboro Event Co. needs booth and signage execution.", "Westboro Event Co. plans trade show activations. Elmwood Print House provides signage and booth collateral.", 7500],
  ["opp-13", "referral", "org-ottawa-immigration", "org-riverside-legal", 78, "New", "Immigration and legal collaboration", "Two advisory firms serve overlapping newcomer founder needs.", "Ottawa Immigration Counsel and Riverside Legal have complementary services for founder immigration, incorporations and contracts.", 9000],
  ["opp-14", "membership_upgrade", "org-westboro-events", undefined, 76, "New", "Westboro Event Co. room usage", "Frequent event activity suggests Full Access membership.", "Westboro Event Co. attends and hosts frequently. Their usage pattern supports a Full Access conversation.", 3000],
  ["opp-15", "shifu_lead", "org-orleans-physio", undefined, 86, "Review", "Orleans Physio operating system", "Clinic growth and scheduling complexity indicate diagnostic fit.", "Orleans Physio is scaling locations with scheduling and operations needs, a good fit for Business Shifu systems work.", 30000],
  ["opp-16", "referral", "org-redwood-retail", "org-glebe-analytics", 84, "New", "Redwood Retail dashboard need", "Retail operator needs better inventory and revenue reporting.", "Redwood Retail needs inventory and revenue reporting. Glebe Analytics builds dashboards and data infrastructure.", 15000],
  ["opp-17", "referral", "org-lansdowne-foods", "org-stonebridge", 81, "New", "Lansdowne risk coverage", "Growing catering team needs commercial insurance review.", "Lansdowne Foods is growing events work. Stonebridge Insurance can review commercial coverage for hospitality risk.", 6500]
].map(([id, type, sourceOrganizationId, targetOrganizationId, score, status, title, description, reasoning, estimatedValue]) => ({
  id: String(id),
  type: type as Opportunity["type"],
  sourceOrganizationId: String(sourceOrganizationId),
  targetOrganizationId: targetOrganizationId ? String(targetOrganizationId) : undefined,
  score: Number(score),
  status: status as Opportunity["status"],
  title: String(title),
  description: String(description),
  reasoning: String(reasoning),
  estimatedValue: Number(estimatedValue),
  createdAt: today
}));

export const introductions = [
  { id: "intro-1", opportunityId: "opp-12", fromOrganizationId: "org-elmwood-print", toOrganizationId: "org-westboro-events", status: "Sent" as const, notes: "Introduced after Growth Hack vendor discussion.", estimatedValue: 7500, realizedValue: 0, createdAt: today },
  { id: "intro-2", opportunityId: "opp-2", fromOrganizationId: "org-mapleworks", toOrganizationId: "org-cloudledger", status: "Drafted" as const, notes: "Ready for Emile review.", estimatedValue: 16000, realizedValue: 0, createdAt: today },
  { id: "intro-3", opportunityId: "opp-4", fromOrganizationId: "org-urban-pulse", toOrganizationId: "org-northstar", status: "Accepted" as const, notes: "Discovery call booked.", estimatedValue: 14000, realizedValue: 0, createdAt: today }
];

export const tasks = opportunities.slice(0, 10).map((opp, index) => ({
  id: `task-${index}`,
  opportunityId: opp.id,
  title: opp.type === "retention" ? "Create retention follow-up" : opp.type === "shifu_lead" ? "Qualify Shifu diagnostic fit" : opp.type === "membership_upgrade" ? "Create membership follow-up" : "Draft warm introduction",
  assignedTo: "profile-admin-demo",
  status: index % 3 === 0 ? "In Progress" as const : "Open" as const,
  dueDate: `2026-09-${String(index + 3).padStart(2, "0")}`
}));

export const demoData: DemoData = {
  memberships,
  organizations,
  profiles,
  services,
  needs,
  events,
  eventAttendees,
  interactions,
  opportunities,
  introductions,
  tasks
};
