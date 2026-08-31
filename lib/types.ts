export type Role = "admin" | "member";
export type OpportunityType =
  | "referral"
  | "membership_upgrade"
  | "shifu_lead"
  | "retention";
export type OpportunityStatus =
  | "New"
  | "Review"
  | "Contacted"
  | "Introduction Sent"
  | "Won"
  | "Lost";

export type Membership = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
};

export type Organization = {
  id: string;
  name: string;
  slug: string;
  industry: string;
  description: string;
  website: string;
  employeeCount: number;
  annualRevenueRange: string;
  growthStage: string;
  location: string;
  logoUrl?: string;
  memberSince: string;
  membershipId: string;
  founderDependencyScore: number;
  engagementScore: number;
  shifuFitScore: number;
  visitsLast90: number;
  meetingRoomBookingsLast90: number;
  renewalDate: string;
  createdAt: string;
};

export type Profile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  role: Role;
  organizationId: string;
  bio: string;
  linkedinUrl?: string;
  createdAt: string;
};

export type ServiceTag = {
  id: string;
  organizationId: string;
  name: string;
  category: string;
  description: string;
};

export type Need = {
  id: string;
  organizationId: string;
  name: string;
  category: string;
  priority: "low" | "medium" | "high";
  description: string;
};

export type Event = {
  id: string;
  name: string;
  type: string;
  location: string;
  startAt: string;
  attendeeCount: number;
  description: string;
};

export type EventAttendee = {
  id: string;
  eventId: string;
  profileId: string;
  organizationId: string;
  status: "member" | "guest" | "vendor";
  attended: boolean;
};

export type Interaction = {
  id: string;
  organizationId: string;
  profileId: string;
  type: string;
  description: string;
  occurredAt: string;
};

export type Opportunity = {
  id: string;
  type: OpportunityType;
  sourceOrganizationId: string;
  targetOrganizationId?: string;
  score: number;
  status: OpportunityStatus;
  title: string;
  description: string;
  reasoning: string;
  estimatedValue: number;
  createdAt: string;
};

export type Introduction = {
  id: string;
  opportunityId: string;
  fromOrganizationId: string;
  toOrganizationId: string;
  status: "Drafted" | "Sent" | "Accepted" | "Won";
  notes: string;
  estimatedValue: number;
  realizedValue: number;
  createdAt: string;
};

export type Task = {
  id: string;
  opportunityId: string;
  title: string;
  assignedTo: string;
  status: "Open" | "In Progress" | "Done";
  dueDate: string;
};

export type DemoData = {
  memberships: Membership[];
  organizations: Organization[];
  profiles: Profile[];
  services: ServiceTag[];
  needs: Need[];
  events: Event[];
  eventAttendees: EventAttendee[];
  interactions: Interaction[];
  opportunities: Opportunity[];
  introductions: Introduction[];
  tasks: Task[];
};
