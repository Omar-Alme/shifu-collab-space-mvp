# CollabOS

CollabOS is a private business-network intelligence and opportunity platform for CollabSpace. It turns a coworking and business community into a searchable, measurable opportunity engine.

The MVP answers one operating question for CollabSpace management:

> Who should we connect, contact, upgrade, retain or help next?

## Why It Exists

CollabSpace is more than coworking: it is a business community, referral network, event platform and growth environment for Ottawa entrepreneurs. CollabOS gives that community an operating layer:

- Management can see every business in the ecosystem.
- Members can discover relevant companies and services.
- The system surfaces B2B referral matches.
- Membership upgrade and retention opportunities become trackable.
- Business Shifu diagnostic candidates can be identified from operational signals.
- Growth Hack outcomes can be measured after the event.

## Architecture

- `app/` contains the Next.js App Router routes.
- `app/(admin)` contains management-only pages.
- `app/(member)` contains member-facing discovery and profile pages.
- `app/components/` contains the app shell, navigation and the shared opportunity and organization cards.
- `components/ui/` contains the design-system primitives (button, badge, card, table, field, meter, stat, tabs, empty state).
- `app/globals.css` defines the design tokens: colour, radius, shadow and type scale.
- `lib/display.ts` maps domain values (opportunity type, status, priority) to their on-screen label and tone.
- `lib/demo-data.ts` contains the pitch demo dataset.
- `lib/data.ts` is the data access boundary. It reads Supabase when configured and falls back to local demo data when not.
- `lib/opportunity-engine.ts` contains deterministic matching rules.
- `supabase/migrations` contains the relational schema, constraints, indexes and RLS policies.
- `supabase/seed/demo-data.ts` seeds the same demo story data into Supabase.

## Tech Stack

- Next.js 16.3.3
- TypeScript
- App Router
- Tailwind CSS
- Supabase
- Supabase Auth-ready demo role model
- PostgreSQL
- Tailwind CSS v4 design tokens
- Inter / Inter Tight via `next/font`
- Lucide icons
- Recharts-ready dependency for future analytics views

## Database Setup

Supabase project:

- Name: `CollabOS`
- Project ref: `mcnhylnwagifspepfdqg`
- URL: `https://mcnhylnwagifspepfdqg.supabase.co`

Create a Supabase project, then run the SQL in:

```bash
supabase/migrations/20260831211200_collabos_initial_schema.sql
```

The schema includes:

- `profiles`
- `organizations`
- `memberships`
- `services`
- `needs`
- `events`
- `event_attendees`
- `interactions`
- `opportunities`
- `introductions`
- `tasks`

Foreign keys, indexes and RLS policies are included.

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://mcnhylnwagifspepfdqg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-or-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Do not expose `SUPABASE_SERVICE_ROLE_KEY` to the browser or Vercel public variables.

## Seed Process

After applying the migration:

```bash
npm run seed:local
```

The seed creates 35 fictional Ottawa businesses, 50 people, memberships, events, service tags, needs, interactions, opportunities, introductions and tasks.

## Demo Credentials

The MVP uses simple demo role switching for pitch speed:

- Admin: `admin@collabos.demo`
- Member: `member@collabos.demo`
- Password for demos: `collabos-demo`

Use `/login` to enter either experience.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The app works without Supabase variables by using the local demo dataset. When Supabase variables are present, pages query Supabase through the shared data layer.

## Deployment

Deploy to Vercel as a standard Next.js app.

1. Add Supabase environment variables in Vercel.
2. Apply the Supabase migration.
3. Run the seed script locally against the Supabase project.
4. Deploy the app.

## Current MVP Features

- Admin dashboard with KPI cards and opportunity feed.
- Member/business directory with search and filtering.
- Admin member profile with Shifu fit, engagement and retention signals.
- Member-safe public business profiles.
- Opportunity engine with referral, membership, Shifu and retention tabs.
- Opportunity status updates.
- Create Introduction action for referral opportunities.
- Growth Hack event intelligence page.
- Member discover, network and profile surfaces.
- Deterministic matching logic separated from UI components.

## Future Integrations

- HubSpot or another CRM
- Stripe or membership billing
- Google Calendar
- Event platforms
- Email delivery
- Access control systems
- Room booking systems
- Member CRM imports
- Business Shifu CRM or diagnostic workflow
- LLM-assisted opportunity explanation enrichment
