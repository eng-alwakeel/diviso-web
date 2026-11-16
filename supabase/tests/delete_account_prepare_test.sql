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


-- ── G: plain member, nothing shared → hard; the group itself untouched ──
insert into auth.users(id) values ('00000000-0000-0000-0000-0000000000a7');
insert into public.profiles(id, name) values ('00000000-0000-0000-0000-0000000000a7','Ghada');
insert into public.group_members(group_id, user_id, role, joined_at, status) values
 ('00000000-0000-0000-0000-00000000000a','00000000-0000-0000-0000-0000000000a7','member', now(),'active');
select pg_temp.ok((public.delete_account_prepare('00000000-0000-0000-0000-0000000000a7')
                   = '{"mode":"hard","transferred_groups":0,"deleted_groups":0}'::jsonb), 'G: plain member → hard, no transfer');
select pg_temp.ok(not exists (select 1 from public.profiles where id='00000000-0000-0000-0000-0000000000a7'), 'G: profile deleted');
select pg_temp.ok(exists (select 1 from public.groups where id='00000000-0000-0000-0000-00000000000a'), 'G: group untouched');

-- ── F: failure in the middle → NOTHING changed (one transaction) ─────────
insert into auth.users(id) values ('00000000-0000-0000-0000-0000000000f6');
insert into public.profiles(id, name, phone) values ('00000000-0000-0000-0000-0000000000f6','Fahad','0599');
insert into public.groups(id, name, owner_id) values ('00000000-0000-0000-0000-00000000000f','g3','00000000-0000-0000-0000-0000000000f6');
insert into public.group_members(group_id, user_id, role, joined_at, status) values
 ('00000000-0000-0000-0000-00000000000f','00000000-0000-0000-0000-0000000000f6','owner', now()-interval '3 days','active'),
 ('00000000-0000-0000-0000-00000000000f','00000000-0000-0000-0000-0000000000b1','member', now()-interval '1 day','active');
insert into public.expenses(id, group_id, created_by, payer_id, amount) values
 ('00000000-0000-0000-0000-0000000000f7','00000000-0000-0000-0000-00000000000f','00000000-0000-0000-0000-0000000000f6','00000000-0000-0000-0000-0000000000f6', 20);
insert into public.notifications(user_id) values ('00000000-0000-0000-0000-0000000000f6');
-- Make the last step (anonymising the profile) blow up.
create function pg_temp.boom() returns trigger language plpgsql as $$ begin raise exception 'boom'; end $$;
create trigger t_boom before update on public.profiles
  for each row when (new.name = 'مستخدم محذوف' and old.id = '00000000-0000-0000-0000-0000000000f6') execute function pg_temp.boom();
do $$ begin
  perform public.delete_account_prepare('00000000-0000-0000-0000-0000000000f6');
  raise exception 'FAIL F: expected an error';
exception when others then
  if sqlerrm like 'FAIL%' then raise; end if;
  if sqlerrm <> 'boom' then raise exception 'FAIL F: got %', sqlerrm; end if;
end $$;
drop trigger t_boom on public.profiles;
select pg_temp.ok((select owner_id from public.groups where id='00000000-0000-0000-0000-00000000000f') = '00000000-0000-0000-0000-0000000000f6', 'F: ownership NOT transferred after the failure');
select pg_temp.ok(exists (select 1 from public.notifications where user_id='00000000-0000-0000-0000-0000000000f6'), 'F: notifications NOT deleted');
select pg_temp.ok((select name from public.profiles where id='00000000-0000-0000-0000-0000000000f6') = 'Fahad', 'F: profile NOT anonymised');

-- ── S (MSG-137 §3a): soft delete leaves no personal identifier ──────────
-- pg_temp.gotrue_soft_delete mirrors, step by step, what
-- auth.admin.deleteUser(id, true) does in GoTrue
-- (supabase/auth internal/api/admin.go adminUserDelete → models.User
-- SoftDeleteUser + SoftDeleteUserIdentities, master 3e79d8513b,
-- 2026-11-13): email/phone/email_change/phone_change → sha256(id||value)
-- base64url (phone cut to 15), password + tokens cleared, user and app
-- metadata emptied, every identity's identity_data emptied and
-- provider_id → sha256(user_id||provider:provider_id), deleted_at set.
create function pg_temp.obf(p_id uuid, v text) returns text language sql as $$
  select rtrim(translate(encode(sha256(convert_to(p_id::text || coalesce(v, ''), 'UTF8')), 'base64'), '+/', '-_'), '=') $$;
create function pg_temp.gotrue_soft_delete(p uuid) returns void language plpgsql as $$
begin
  update auth.users
     set email = pg_temp.obf(id, coalesce(email, '')),
         phone = left(pg_temp.obf(id, coalesce(phone, '')), 15),
         email_change = pg_temp.obf(id, coalesce(email_change, '')),
         phone_change = left(pg_temp.obf(id, coalesce(phone_change, '')), 15),
         encrypted_password = null, raw_user_meta_data = '{}'::jsonb, raw_app_meta_data = '{}'::jsonb,
         deleted_at = now()
   where id = p and deleted_at is null;
  update auth.identities
     set identity_data = '{}'::jsonb, provider_id = pg_temp.obf(user_id, provider || ':' || provider_id)
   where user_id = p;
end $$;

insert into auth.users(id, email, phone, raw_user_meta_data, raw_app_meta_data) values
 ('00000000-0000-0000-0000-0000000000a8', 'hind@privaterelay.appleid.com', '966555000111',
  '{"full_name":"Hind","email":"hind@privaterelay.appleid.com","phone":"966555000111"}', '{"provider":"apple","providers":["apple","phone"]}');
insert into auth.identities(user_id, provider, provider_id, identity_data) values
 ('00000000-0000-0000-0000-0000000000a8', 'apple', '001234.hindapplesub.0099', '{"sub":"001234.hindapplesub.0099","email":"hind@privaterelay.appleid.com"}'),
 ('00000000-0000-0000-0000-0000000000a8', 'phone', '00000000-0000-0000-0000-0000000000a8', '{"sub":"00000000-0000-0000-0000-0000000000a8","phone":"966555000111"}');
insert into public.profiles(id, name, display_name, phone, avatar_url, bio, city) values
 ('00000000-0000-0000-0000-0000000000a8','Hind','Hind','966555000111','https://x/avatar.png','hi','Jeddah');
insert into public.group_members(group_id, user_id, role, joined_at, status) values
 ('00000000-0000-0000-0000-00000000000a','00000000-0000-0000-0000-0000000000a8','member', now(),'active');
insert into public.expense_splits(expense_id, member_id, share_amount) values
 ('00000000-0000-0000-0000-0000000000f1','00000000-0000-0000-0000-0000000000a8', 10);
select pg_temp.ok((public.delete_account_prepare('00000000-0000-0000-0000-0000000000a8')->>'mode') = 'soft', 'S: shared split → soft');
select pg_temp.gotrue_soft_delete('00000000-0000-0000-0000-0000000000a8');
select pg_temp.ok((select p.name = 'مستخدم محذوف' and p.phone is null and p.avatar_url is null and p.bio is null and p.city is null
                     from public.profiles p where p.id = '00000000-0000-0000-0000-0000000000a8'), 'S: profile has no name/phone/avatar/bio/city');
select pg_temp.ok((select u.email not like '%@%' and u.phone !~ '^[0-9+]+$' and u.deleted_at is not null
                          and u.raw_user_meta_data = '{}'::jsonb and u.raw_app_meta_data = '{}'::jsonb
                     from auth.users u where u.id = '00000000-0000-0000-0000-0000000000a8'),
                  'S: auth.users email/phone hashed, metadata empty, deleted_at set');
select pg_temp.ok(not exists (select 1 from auth.identities i where i.user_id = '00000000-0000-0000-0000-0000000000a8'
                                 and (i.identity_data <> '{}'::jsonb or i.provider_id in ('001234.hindapplesub.0099', '00000000-0000-0000-0000-0000000000a8'))),
                  'S: identities: identity_data empty, Apple sub + phone provider_id hashed');
select pg_temp.ok(not exists (
    select 1 from auth.users u
     where u.id = '00000000-0000-0000-0000-0000000000a8'
       and (u::text like '%966555000111%' or u::text ilike '%hind%' or u::text like '%hindapplesub%'))
  and not exists (
    select 1 from auth.identities i
     where i.user_id = '00000000-0000-0000-0000-0000000000a8'
       and (i::text like '%966555000111%' or i::text ilike '%hind%' or i::text like '%hindapplesub%'))
  and not exists (
    select 1 from public.profiles p
     where p.id = '00000000-0000-0000-0000-0000000000a8'
       and (p::text like '%966555000111%' or p::text ilike '%hind%' or p::text like '%Jeddah%')),
  'S: no trace of the phone, email, Apple sub or name in any row of the user');
select pg_temp.ok((select share_amount from public.expense_splits where member_id = '00000000-0000-0000-0000-0000000000a8') = 10,
                  'S: split untouched');

-- ── R (MSG-137 §3b): same phone + same Apple ID can sign up again ───────
-- New auth user (new id) with the exact email, phone and Apple sub, then
-- the profile row handle_new_user inserts (id, name, display_name, phone).
insert into auth.users(id, email, phone, raw_app_meta_data) values
 ('00000000-0000-0000-0000-0000000000a9', 'hind@privaterelay.appleid.com', '966555000111', '{"provider":"apple"}');
insert into auth.identities(user_id, provider, provider_id, identity_data) values
 ('00000000-0000-0000-0000-0000000000a9', 'apple', '001234.hindapplesub.0099', '{"sub":"001234.hindapplesub.0099"}');
insert into public.profiles(id, name, display_name, phone) values
 ('00000000-0000-0000-0000-0000000000a9', 'Hind', 'Hind', '966555000111');
select pg_temp.ok(exists (select 1 from public.profiles where id = '00000000-0000-0000-0000-0000000000a9' and phone = '966555000111'),
                  'R: soft-deleted user signs up again with the same phone + Apple ID → new account');
select pg_temp.ok(not exists (select 1 from public.group_members where user_id = '00000000-0000-0000-0000-0000000000a9'),
                  'R: the new account starts empty (old memberships stay on the old id)');
-- Hard path: A (phone 0500) was hard-deleted; GoTrue then destroys the auth row.
delete from auth.users where id = '00000000-0000-0000-0000-0000000000a1';
insert into auth.users(id, phone) values ('00000000-0000-0000-0000-0000000000aa', '0500');
insert into public.profiles(id, name, phone) values ('00000000-0000-0000-0000-0000000000aa', 'Adel', '0500');
select pg_temp.ok(exists (select 1 from public.profiles where id = '00000000-0000-0000-0000-0000000000aa' and phone = '0500'),
                  'R: hard-deleted user signs up again with the same phone → new account');

-- ── grants ───────────────────────────────────────────────────────────────
select pg_temp.ok(not has_function_privilege('anon', 'public.delete_account_prepare(uuid)', 'execute'), 'anon cannot execute');
select pg_temp.ok(not has_function_privilege('authenticated', 'public.delete_account_prepare(uuid)', 'execute'), 'authenticated cannot execute');
select pg_temp.ok(has_function_privilege('service_role', 'public.delete_account_prepare(uuid)', 'execute'), 'service_role can execute');

select 'delete_account_prepare: ALL PASS' as result;
