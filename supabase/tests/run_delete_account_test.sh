#!/usr/bin/env bash
# Runs delete_account_prepare_test.sql against the migration on a throwaway
# local Postgres with minimal stubs. Never touches a remote database.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
DIR="$(mktemp -d /tmp/diviso-delacct.XXXXXX)"; PORT="${PORT:-54421}"
trap 'pg_ctl -D "$DIR/data" -m immediate stop >/dev/null 2>&1 || true; rm -rf "$DIR"' EXIT
initdb -D "$DIR/data" -U postgres --auth=trust >/dev/null
pg_ctl -D "$DIR/data" -o "-p $PORT -k $DIR -c listen_addresses=''" -l "$DIR/log" start >/dev/null
PSQL=(psql -h "$DIR" -p "$PORT" -U postgres -d postgres -v ON_ERROR_STOP=1 -q)
"${PSQL[@]}" <<'SQL'
create role anon nologin; create role authenticated nologin; create role service_role nologin;
create schema auth;
-- auth.users / auth.identities: the GoTrue columns that hold personal
-- identifiers, with GoTrue's uniqueness rules (MSG-137 §3 a/b).
create table auth.users (id uuid primary key, email text, phone text unique,
  email_change text, phone_change text, encrypted_password text,
  raw_user_meta_data jsonb default '{}'::jsonb, raw_app_meta_data jsonb default '{}'::jsonb,
  deleted_at timestamptz);
create unique index users_email_partial_key on auth.users (email);
create table auth.identities (id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null, provider_id text not null, identity_data jsonb not null default '{}'::jsonb,
  unique (provider_id, provider));
create type member_role as enum ('owner','admin','member');
create table public.profiles (id uuid primary key references auth.users(id) on delete cascade,
  name text, display_name text, phone text, avatar_url text, bio text, city text,
  banned_by uuid references auth.users(id), updated_at timestamptz default now());
-- production: idx_profiles_phone (diviso-web 20250816112559).
create unique index idx_profiles_phone on public.profiles (phone) where phone is not null;
create table public.groups (id uuid primary key, name text, owner_id uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz default now());
create table public.group_members (id uuid primary key default gen_random_uuid(),
  group_id uuid references public.groups(id) on delete cascade, user_id uuid references public.profiles(id) on delete cascade,
  role member_role not null default 'member', joined_at timestamptz default now(), status text not null default 'active');
create table public.expenses (id uuid primary key, group_id uuid references public.groups(id) on delete cascade,
  created_by uuid not null references public.profiles(id) on delete restrict,
  payer_id uuid not null references public.profiles(id) on delete restrict, amount numeric);
create table public.expense_splits (expense_id uuid references public.expenses(id) on delete cascade,
  member_id uuid references public.profiles(id) on delete cascade, share_amount numeric);
create table public.settlements (id uuid primary key default gen_random_uuid(), group_id uuid references public.groups(id) on delete cascade,
  from_user_id uuid references public.profiles(id) on delete restrict, to_user_id uuid references public.profiles(id) on delete restrict,
  confirmed_by uuid references auth.users(id));
create table public.messages (id uuid primary key default gen_random_uuid(), group_id uuid references public.groups(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete restrict);
create table public.plans (id uuid primary key, owner_user_id uuid not null references public.profiles(id), group_id uuid references public.groups(id));
create table public.notifications (id uuid primary key default gen_random_uuid(), user_id uuid references public.profiles(id) on delete cascade);
create table public.user_settings (user_id uuid primary key, language text);
SQL
"${PSQL[@]}" -f "$ROOT/supabase/migrations/20261116160000_delete_account_prepare.sql"
"${PSQL[@]}" -f "$ROOT/supabase/tests/delete_account_prepare_test.sql"
