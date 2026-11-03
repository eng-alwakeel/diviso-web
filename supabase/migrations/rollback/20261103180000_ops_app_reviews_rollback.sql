-- Rollback for 20261103180000_ops_app_reviews.sql
-- Unschedules the job only. Dropping the table deletes data, which needs Adel's word,
-- so the drop line stays commented out.
select cron.unschedule('fetch-app-reviews-daily')
  where exists (select 1 from cron.job where jobname = 'fetch-app-reviews-daily');
drop function if exists public.ops_upsert_app_reviews(jsonb);  -- no data loss
-- drop table if exists ops.app_reviews;
