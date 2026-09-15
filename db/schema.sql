create extension if not exists "pgcrypto";
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  plan text not null default 'free' check (plan in ('free','creator','pro')),
  credits integer not null default 5,
  stripe_customer_id text unique,
  created_at timestamptz not null default now()
);
create table if not exists generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mode text not null,
  prompt text not null,
  input_url text,
  output_url text,
  provider text,
  credits_used integer not null default 1,
  status text not null default 'queued',
  created_at timestamptz not null default now()
);
create table if not exists identity_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  consent_confirmed boolean not null default false,
  reference_urls jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
alter table profiles enable row level security;
alter table generations enable row level security;
alter table identity_profiles enable row level security;
create policy "profiles self" on profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "generations self" on generations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "identity self" on identity_profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
