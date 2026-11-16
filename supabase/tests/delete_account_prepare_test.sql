-- Tests for public.delete_account_prepare (MSG-134 §2). Run by
-- supabase/tests/run_delete_account_test.sh on a throwaway local Postgres.
create or replace function pg_temp.ok(c boolean, label text) returns void language plpgsql as $$
begin if not coalesce(c, false) then raise exception 'FAIL %', label; end if; raise notice 'ok: %', label; end $$;

insert into auth.users(id) values
 ('00000000-0000-0000-0000-0000000000a1'),('00000000-0000-0000-0000-0000000000b1'),
 ('00000000-0000-0000-0000-0000000000c1'),('00000000-0000-0000-0000-0000000000d1'),
 ('00000000-0000-0000-0000-0000000000e1');
insert into public.profiles(id, name, display_name, phone, city) values
 ('00000000-0000-0000-0000-0000000000a1','Adel','Adel','0500','Makkah'),
 ('00000000-0000-0000-0000-0000000000b1','Bader','Bader',null,null),
 ('00000000-0000-0000-0000-0000000000c1','Saud','Saud',null,null),
 ('00000000-0000-0000-0000-0000000000d1','Dana','Dana','0511','Riyadh'),
 ('00000000-0000-0000-0000-0000000000e1','Eid','Eid',null,null);

-- A owns g1 (members: c joined first, b later) and g2 (alone, with an expense).
insert into public.groups(id, name, owner_id, created_at) values
 ('00000000-0000-0000-0000-00000000000a','g1','00000000-0000-0000-0000-0000000000a1', now()),
 ('00000000-0000-0000-0000-00000000000b','g2','00000000-0000-0000-0000-0000000000a1', now());
insert into public.group_members(group_id, user_id, role, joined_at, status) values
 ('00000000-0000-0000-0000-00000000000a','00000000-0000-0000-0000-0000000000a1','owner', now()-interval '9 days','active'),
 ('00000000-0000-0000-0000-00000000000a','00000000-0000-0000-0000-0000000000b1','member', now()-interval '2 days','active'),
 ('00000000-0000-0000-0000-00000000000a','00000000-0000-0000-0000-0000000000c1','member', now()-interval '5 days','active'),
 ('00000000-0000-0000-0000-00000000000a','00000000-0000-0000-0000-0000000000e1','member', now()-interval '8 days','pending'),
 ('00000000-0000-0000-0000-00000000000b','00000000-0000-0000-0000-0000000000a1','owner', now(),'active');
insert into public.expenses(id, group_id, created_by, payer_id, amount) values
 ('00000000-0000-0000-0000-0000000000f2','00000000-0000-0000-0000-00000000000b','00000000-0000-0000-0000-0000000000a1','00000000-0000-0000-0000-0000000000a1', 50);
insert into public.expense_splits(expense_id, member_id, share_amount) values
 ('00000000-0000-0000-0000-0000000000f2','00000000-0000-0000-0000-0000000000a1', 50);
insert into public.notifications(user_id) values ('00000000-0000-0000-0000-0000000000a1');
insert into public.user_settings(user_id, language) values ('00000000-0000-0000-0000-0000000000a1','ar');
insert into public.plans(id, owner_user_id, group_id) values
 (gen_random_uuid(),'00000000-0000-0000-0000-0000000000a1', null),
 (gen_random_uuid(),'00000000-0000-0000-0000-0000000000c1','00000000-0000-0000-0000-00000000000b');

-- D: member of g1 with a split in C's expense (shared money) → soft.
insert into public.group_members(group_id, user_id, role, joined_at, status) values
 ('00000000-0000-0000-0000-00000000000a','00000000-0000-0000-0000-0000000000d1','member', now()-interval '1 day','active');
insert into public.expenses(id, group_id, created_by, payer_id, amount) values
 ('00000000-0000-0000-0000-0000000000f1','00000000-0000-0000-0000-00000000000a','00000000-0000-0000-0000-0000000000c1','00000000-0000-0000-0000-0000000000c1', 90);
insert into public.expense_splits(expense_id, member_id, share_amount) values
 ('00000000-0000-0000-0000-0000000000f1','00000000-0000-0000-0000-0000000000c1', 45),
 ('00000000-0000-0000-0000-0000000000f1','00000000-0000-0000-0000-0000000000d1', 45);

-- ── A: transfer g1, delete g2, hard ──────────────────────────────────────
select pg_temp.ok((public.delete_account_prepare('00000000-0000-0000-0000-0000000000a1')
                   = '{"mode":"hard","transferred_groups":1,"deleted_groups":1}'::jsonb), 'A: hard, 1 transferred, 1 deleted');
select pg_temp.ok((select owner_id from public.groups where id='00000000-0000-0000-0000-00000000000a') = '00000000-0000-0000-0000-0000000000c1',
                  'A: g1 owner = oldest ACTIVE member (Saud, not the older pending Eid)');
select pg_temp.ok((select role::text from public.group_members where group_id='00000000-0000-0000-0000-00000000000a' and user_id='00000000-0000-0000-0000-0000000000c1') = 'owner', 'A: new owner role');
select pg_temp.ok(not exists (select 1 from public.groups where id='00000000-0000-0000-0000-00000000000b'), 'A: solo group deleted');
select pg_temp.ok(not exists (select 1 from public.expenses where id='00000000-0000-0000-0000-0000000000f2'), 'A: solo group expense cascaded');
select pg_temp.ok((select group_id from public.plans where owner_user_id='00000000-0000-0000-0000-0000000000c1') is null, 'A: plan of the deleted group detached');
select pg_temp.ok(not exists (select 1 from public.plans where owner_user_id='00000000-0000-0000-0000-0000000000a1'), 'A: personal plan deleted');
select pg_temp.ok(not exists (select 1 from public.notifications where user_id='00000000-0000-0000-0000-0000000000a1'), 'A: notifications deleted');
select pg_temp.ok(not exists (select 1 from public.user_settings where user_id='00000000-0000-0000-0000-0000000000a1'), 'A: settings deleted');
select pg_temp.ok(not exists (select 1 from public.profiles where id='00000000-0000-0000-0000-0000000000a1'), 'A: profile deleted');
select pg_temp.ok(not exists (select 1 from public.group_members where user_id='00000000-0000-0000-0000-0000000000a1'), 'A: memberships gone');
select pg_temp.ok((select count(*) from public.expense_splits where expense_id='00000000-0000-0000-0000-0000000000f1') = 2, 'A: other people''s splits untouched');

-- ── D: shared split → soft, anonymised, balances intact ─────────────────
select pg_temp.ok((public.delete_account_prepare('00000000-0000-0000-0000-0000000000d1')->>'mode') = 'soft', 'D: soft');
select pg_temp.ok((select name = 'مستخدم محذوف' and display_name = 'مستخدم محذوف' and phone is null and city is null
                     from public.profiles where id='00000000-0000-0000-0000-0000000000d1'), 'D: profile anonymised');
select pg_temp.ok((select share_amount from public.expense_splits where member_id='00000000-0000-0000-0000-0000000000d1') = 45, 'D: split kept (balance unchanged)');
select pg_temp.ok(exists (select 1 from public.group_members where user_id='00000000-0000-0000-0000-0000000000d1'), 'D: membership kept');
select pg_temp.ok((public.delete_account_prepare('00000000-0000-0000-0000-0000000000d1')->>'mode') = 'soft', 'D: re-run is safe');

-- ── C: now owns g1 and paid an expense → transfer to Bader, soft ─────────
select pg_temp.ok((public.delete_account_prepare('00000000-0000-0000-0000-0000000000c1')
                   = '{"mode":"soft","transferred_groups":1,"deleted_groups":0}'::jsonb), 'C: soft, transferred');
select pg_temp.ok((select owner_id from public.groups where id='00000000-0000-0000-0000-00000000000a') = '00000000-0000-0000-0000-0000000000b1', 'C: g1 → Bader');

-- ── grants ───────────────────────────────────────────────────────────────
select pg_temp.ok(not has_function_privilege('anon', 'public.delete_account_prepare(uuid)', 'execute'), 'anon cannot execute');
select pg_temp.ok(not has_function_privilege('authenticated', 'public.delete_account_prepare(uuid)', 'execute'), 'authenticated cannot execute');
select pg_temp.ok(has_function_privilege('service_role', 'public.delete_account_prepare(uuid)', 'execute'), 'service_role can execute');

select 'delete_account_prepare: ALL PASS' as result;
