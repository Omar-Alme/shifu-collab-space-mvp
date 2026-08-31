create extension if not exists "pgcrypto";

create table if not exists memberships (
  id text primary key,
  name text not null,
  category text not null,
  price numeric(10,2) not null default 0,
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists organizations (
  id text primary key,
  name text not null,
  slug text not null unique,
  industry text not null,
  description text not null,
  website text,
  employee_count integer not null default 1,
  annual_revenue_range text,
  growth_stage text,
  location text,
  logo_url text,
  member_since date,
  membership_id text references memberships(id),
  founder_dependency_score integer not null default 0 check (founder_dependency_score between 0 and 100),
  engagement_score integer not null default 0 check (engagement_score between 0 and 100),
  shifu_fit_score integer not null default 0 check (shifu_fit_score between 0 and 100),
  visits_last90 integer not null default 0,
  meeting_room_bookings_last90 integer not null default 0,
  renewal_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists profiles (
  id text primary key,
  first_name text not null,
  last_name text not null,
  email text not null unique,
  phone text,
  avatar_url text,
  role text not null check (role in ('admin', 'member')),
  organization_id text not null references organizations(id) on delete cascade,
  bio text,
  linkedin_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists services (
  id text primary key,
  organization_id text not null references organizations(id) on delete cascade,
  name text not null,
  category text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists needs (
  id text primary key,
  organization_id text not null references organizations(id) on delete cascade,
  name text not null,
  category text not null,
  priority text not null check (priority in ('low', 'medium', 'high')),
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists events (
  id text primary key,
  name text not null,
  type text not null,
  location text not null,
  start_at timestamptz not null,
  attendee_count integer not null default 0,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists event_attendees (
  id text primary key,
  event_id text not null references events(id) on delete cascade,
  profile_id text not null references profiles(id) on delete cascade,
  organization_id text not null references organizations(id) on delete cascade,
  status text not null check (status in ('member', 'guest', 'vendor')),
  attended boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists interactions (
  id text primary key,
  organization_id text not null references organizations(id) on delete cascade,
  profile_id text references profiles(id) on delete set null,
  type text not null,
  description text not null,
  occurred_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists opportunities (
  id text primary key,
  type text not null check (type in ('referral', 'membership_upgrade', 'shifu_lead', 'retention')),
  source_organization_id text not null references organizations(id) on delete cascade,
  target_organization_id text references organizations(id) on delete cascade,
  score integer not null check (score between 0 and 100),
  status text not null check (status in ('New', 'Review', 'Contacted', 'Introduction Sent', 'Won', 'Lost')),
  title text not null,
  description text not null,
  reasoning text not null,
  estimated_value numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists introductions (
  id text primary key,
  opportunity_id text not null references opportunities(id) on delete cascade,
  from_organization_id text not null references organizations(id) on delete cascade,
  to_organization_id text not null references organizations(id) on delete cascade,
  status text not null check (status in ('Drafted', 'Sent', 'Accepted', 'Won')),
  notes text,
  estimated_value numeric(12,2) not null default 0,
  realized_value numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists tasks (
  id text primary key,
  opportunity_id text not null references opportunities(id) on delete cascade,
  title text not null,
  assigned_to text references profiles(id) on delete set null,
  status text not null check (status in ('Open', 'In Progress', 'Done')),
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_profiles_org on profiles(organization_id);
create index if not exists idx_organizations_membership on organizations(membership_id);
create index if not exists idx_organizations_industry on organizations(industry);
create index if not exists idx_services_org_category on services(organization_id, category);
create index if not exists idx_needs_org_category on needs(organization_id, category);
create index if not exists idx_event_attendees_event on event_attendees(event_id);
create index if not exists idx_event_attendees_profile on event_attendees(profile_id);
create index if not exists idx_event_attendees_organization on event_attendees(organization_id);
create index if not exists idx_interactions_org_time on interactions(organization_id, occurred_at desc);
create index if not exists idx_interactions_profile on interactions(profile_id);
create index if not exists idx_opportunities_type_status on opportunities(type, status);
create index if not exists idx_opportunities_source on opportunities(source_organization_id);
create index if not exists idx_opportunities_target on opportunities(target_organization_id);
create index if not exists idx_introductions_opportunity on introductions(opportunity_id);
create index if not exists idx_introductions_from_org on introductions(from_organization_id);
create index if not exists idx_introductions_to_org on introductions(to_organization_id);
create index if not exists idx_tasks_opportunity on tasks(opportunity_id);
create index if not exists idx_tasks_assigned_to on tasks(assigned_to);
create index if not exists idx_tasks_status_due on tasks(status, due_date);

alter table memberships enable row level security;
alter table organizations enable row level security;
alter table profiles enable row level security;
alter table services enable row level security;
alter table needs enable row level security;
alter table events enable row level security;
alter table event_attendees enable row level security;
alter table interactions enable row level security;
alter table opportunities enable row level security;
alter table introductions enable row level security;
alter table tasks enable row level security;

-- RLS is intentionally enabled without broad public policies.
-- Add role-aware policies after Supabase Auth users are wired to profiles.
