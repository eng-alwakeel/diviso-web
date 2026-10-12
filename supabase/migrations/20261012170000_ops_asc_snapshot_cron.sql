-- Schedules the daily App Store Connect snapshot (06:30 Riyadh = 03:30 UTC),
-- before the 07:07 daily report reads ops.asc_snapshots.
-- Prerequisites (one-time, done by the owner):
--   1) select vault.create_secret('<random>', 'ops_cron_secret');
--   2) supabase secrets set OPS_CRON_SECRET=<same random> ASC_KEY_ID=… ASC_ISSUER_ID=… ASC_PRIVATE_KEY="$(cat AuthKey_….p8)"
--   3) supabase functions deploy asc-snapshot
-- ops schema + ops.asc_snapshots + ops.kpi_snapshot() were created in migration ops_schema_kpis_and_asc_snapshots.
select cron.schedule(
  'asc-snapshot-daily',
  '30 3 * * *',
  $$
  select net.http_post(
    url := 'https://iwthriddasxzbjddpzzf.supabase.co/functions/v1/asc-snapshot',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-ops-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'ops_cron_secret')
    ),
    body := '{}'::jsonb
  );
  $$
);
