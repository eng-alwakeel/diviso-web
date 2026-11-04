-- MSG-079: cron job "daily-engagement-cron" sent a hard-coded anon key, so the
-- function (CRON_SECRET-only check) answered 401 every day. Read the
-- service_role key from Vault at run time instead; no key in the job text.
-- Already applied on production 2026-11-04 via cron.alter_job.
select cron.alter_job(
  (select jobid from cron.job where jobname = 'daily-engagement-cron'),
  command := $cmd$
  select net.http_post(
    url := 'https://iwthriddasxzbjddpzzf.supabase.co/functions/v1/daily-engagement-cron',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'service_role_key')
    ),
    body := jsonb_build_object('time', now())
  ) as request_id;
$cmd$);
