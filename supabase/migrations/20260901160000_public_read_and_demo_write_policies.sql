-- This app does not yet use Supabase Auth (admin/member role switching is a
-- UI cookie only, set in app/actions/auth.ts). Every request the app makes,
-- reads and writes, authenticates as the anon/publishable key
-- (lib/supabase.ts createSupabaseServerClient). These policies scope
-- exactly to that real usage: broad read access for the demo dataset, plus
-- the two specific writes app/actions/opportunities.ts performs.
--
-- Before this migration, RLS was enabled with zero policies on every table,
-- which silently denies every request (0 rows, not an error) rather than
-- failing loudly -- see lib/data.ts, which only falls back to local demo
-- data on a Postgres error, not on an empty result set.

create policy "Public read access" on public.memberships for select to anon using (true);
create policy "Public read access" on public.organizations for select to anon using (true);
create policy "Public read access" on public.profiles for select to anon using (true);
create policy "Public read access" on public.services for select to anon using (true);
create policy "Public read access" on public.needs for select to anon using (true);
create policy "Public read access" on public.events for select to anon using (true);
create policy "Public read access" on public.event_attendees for select to anon using (true);
create policy "Public read access" on public.interactions for select to anon using (true);
create policy "Public read access" on public.opportunities for select to anon using (true);
create policy "Public read access" on public.introductions for select to anon using (true);
create policy "Public read access" on public.tasks for select to anon using (true);

-- changeOpportunityStatus() in app/actions/opportunities.ts
create policy "Demo status updates" on public.opportunities for update to anon using (true) with check (true);

-- createIntroductionForOpportunity() in app/actions/opportunities.ts
create policy "Demo introduction creation" on public.introductions for insert to anon with check (true);
