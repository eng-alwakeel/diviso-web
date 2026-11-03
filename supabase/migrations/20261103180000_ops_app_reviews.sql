-- MSG-071: App Store customer reviews for the store-ratings agent.
-- Table: ops.app_reviews (no reviewer name stored). service_role read only.
-- Rollback: supabase/migrations/rollback/20261103180000_ops_app_reviews_rollback.sql

create schema if not exists ops;

create table if not exists ops.app_reviews (
  review_id  text primary key,
  country    text not null check (country in ('sa','ae','kw','us')),
  rating     smallint check (rating between 1 and 5),
  title      text,
  body       text,
  version    text,
  updated_at timestamptz,
  fetched_at timestamptz not null default now()
);

create index if not exists app_reviews_country_updated_idx
  on ops.app_reviews (country, updated_at desc);

alter table ops.app_reviews enable row level security;
alter table ops.app_reviews force row level security;

revoke all on ops.app_reviews from public, anon, authenticated;
grant usage on schema ops to service_role;
grant select on ops.app_reviews to service_role;  -- writes only via ops_upsert_app_reviews

drop policy if exists app_reviews_service_role_read on ops.app_reviews;
create policy app_reviews_service_role_read on ops.app_reviews
  for select to service_role using (true);

-- Write path (MSG-075 §3): `ops` stays OUT of the API's exposed schemas.
-- fetch-app-reviews calls this RPC in `public`; only service_role may execute it.
-- Takes a jsonb array of {review_id,country,rating,title,body,version,updated_at}.
-- Any reviewer/author key in the payload is ignored (never stored).
create or replace function public.ops_upsert_app_reviews(p_rows jsonb)
returns integer
language plpgsql
security definer
set search_path = pg_catalog, pg_temp
as $$
declare
  v_count integer;
begin
  if p_rows is null or jsonb_typeof(p_rows) <> 'array' then
    raise exception 'ops_upsert_app_reviews: p_rows must be a jsonb array';
  end if;

  insert into ops.app_reviews as t
         (review_id, country, rating, title, body, version, updated_at, fetched_at)
  select r.review_id, r.country, r.rating, r.title, r.body, r.version, r.updated_at, now()
    from jsonb_to_recordset(p_rows) as r(review_id text, country text, rating smallint,
                                         title text, body text, version text, updated_at timestamptz)
   where r.review_id is not null
  on conflict (review_id) do update
     set country    = excluded.country,
         rating     = excluded.rating,
         title      = excluded.title,
         body       = excluded.body,
         version    = excluded.version,
         updated_at = excluded.updated_at,
         fetched_at = excluded.fetched_at;

  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

revoke all on function public.ops_upsert_app_reviews(jsonb) from public, anon, authenticated;
grant execute on function public.ops_upsert_app_reviews(jsonb) to service_role;

-- Daily 05:30 UTC. Auth: x-ops-secret from Vault `ops_cron_secret`, the same
-- pattern as asc-snapshot-daily (diviso-web 20261012170000). Do not inline any key.
select cron.unschedule('fetch-app-reviews-daily')
  where exists (select 1 from cron.job where jobname = 'fetch-app-reviews-daily');

select cron.schedule(
  'fetch-app-reviews-daily',
  '30 5 * * *',
  $$
  select net.http_post(
    url     := 'https://iwthriddasxzbjddpzzf.supabase.co/functions/v1/fetch-app-reviews',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-ops-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'ops_cron_secret')
    ),
    body    := '{}'::jsonb,
    timeout_milliseconds := 30000
  );
  $$
);
