-- Production persistence contract. Apply with Supabase before enabling production mode.
create extension if not exists pgcrypto;

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);
create table if not exists memberships (
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','admin','member','viewer')),
  primary key (organization_id, user_id)
);
create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);
create table if not exists fleets (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  environment text not null check (environment in ('development','staging','production')),
  created_at timestamptz not null default now()
);
create table if not exists agent_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  fleet_id uuid not null references fleets(id) on delete cascade,
  event_id text not null,
  run_id text not null,
  span_id text not null,
  parent_span_id text,
  kind text not null,
  phase text not null,
  status text not null,
  occurred_at timestamptz not null,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  unique (workspace_id, event_id)
);
create table if not exists policy_versions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  version text not null,
  definition jsonb not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (workspace_id, version)
);
create table if not exists authorizations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  idempotency_key text not null,
  action_digest text not null,
  decision text not null check (decision in ('allow','deny','require_approval','throttle')),
  reason_code text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (workspace_id, idempotency_key)
);
create table if not exists approvals (
  id uuid primary key default gen_random_uuid(),
  authorization_id uuid not null references authorizations(id) on delete cascade,
  action_digest text not null,
  approved_by uuid not null references auth.users(id),
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);
create table if not exists audit_reports (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  fleet_id uuid not null references fleets(id) on delete cascade,
  score integer not null check (score between 0 and 100),
  readiness text not null,
  artifact_path text,
  generated_at timestamptz not null default now()
);

alter table organizations enable row level security;
alter table memberships enable row level security;
alter table workspaces enable row level security;
alter table fleets enable row level security;
alter table agent_events enable row level security;
alter table policy_versions enable row level security;
alter table authorizations enable row level security;
alter table approvals enable row level security;
alter table audit_reports enable row level security;

create policy "members can read their organization" on organizations for select using (exists (select 1 from memberships where memberships.organization_id = organizations.id and memberships.user_id = auth.uid()));
create policy "members can read memberships" on memberships for select using (user_id = auth.uid() or exists (select 1 from memberships own where own.organization_id = memberships.organization_id and own.user_id = auth.uid() and own.role in ('owner','admin')));
create policy "members can access workspace data" on workspaces for all using (exists (select 1 from memberships where memberships.organization_id = workspaces.organization_id and memberships.user_id = auth.uid())) with check (exists (select 1 from memberships where memberships.organization_id = workspaces.organization_id and memberships.user_id = auth.uid() and memberships.role in ('owner','admin')));
create policy "workspace membership scopes fleets" on fleets for all using (exists (select 1 from workspaces join memberships on memberships.organization_id = workspaces.organization_id where workspaces.id = fleets.workspace_id and memberships.user_id = auth.uid())) with check (exists (select 1 from workspaces join memberships on memberships.organization_id = workspaces.organization_id where workspaces.id = fleets.workspace_id and memberships.user_id = auth.uid() and memberships.role in ('owner','admin')));
create policy "workspace membership scopes events" on agent_events for select using (exists (select 1 from workspaces join memberships on memberships.organization_id = workspaces.organization_id where workspaces.id = agent_events.workspace_id and memberships.user_id = auth.uid()));
create policy "workspace membership scopes policies" on policy_versions for all using (exists (select 1 from workspaces join memberships on memberships.organization_id = workspaces.organization_id where workspaces.id = policy_versions.workspace_id and memberships.user_id = auth.uid())) with check (exists (select 1 from workspaces join memberships on memberships.organization_id = workspaces.organization_id where workspaces.id = policy_versions.workspace_id and memberships.user_id = auth.uid() and memberships.role in ('owner','admin')));
create policy "workspace membership scopes authorizations" on authorizations for select using (exists (select 1 from workspaces join memberships on memberships.organization_id = workspaces.organization_id where workspaces.id = authorizations.workspace_id and memberships.user_id = auth.uid()));
create policy "approvers can read approvals" on approvals for select using (exists (select 1 from authorizations join workspaces on workspaces.id = authorizations.workspace_id join memberships on memberships.organization_id = workspaces.organization_id where authorizations.id = approvals.authorization_id and memberships.user_id = auth.uid()));
create policy "workspace membership scopes reports" on audit_reports for select using (exists (select 1 from workspaces join memberships on memberships.organization_id = workspaces.organization_id where workspaces.id = audit_reports.workspace_id and memberships.user_id = auth.uid()));
