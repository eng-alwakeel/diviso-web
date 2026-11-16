-- ╔═══════════════════════════════════════════════════════════════════╗
-- ║ MSG-134 §2 — account deletion with ownership transfer.            ║
-- ║ NOT APPLIED. Adel applies it, then deploys delete-account.        ║
-- ╚═══════════════════════════════════════════════════════════════════╝
-- public.delete_account_prepare(p_user uuid) does every database step of
-- «حذف الحساب» in ONE transaction (any error → nothing changed):
--   1. each group the user owns → owner = its oldest active member
--      (joined_at, then id); if the user is its only active member the
--      group is deleted with everything that cascades from it.
--   2. the user's own rows are deleted; audit / admin pointers to the
--      user are cleared (nullable columns only).
--   3. mode:
--      'hard' — nothing shared is left → profile row deleted; the Edge
--               Function then hard-deletes the auth user.
--      'soft' — the user still appears in other people's money records
--               (expenses / splits / settlements / messages / approvals / budgets
--               / invites / plans / votes / admin rows), which the schema
--               protects with ON DELETE RESTRICT (splits would even CASCADE
--               away and silently change balances). The profile is
--               anonymised («مستخدم محذوف», no phone/avatar/bio/city/name),
--               memberships stay so the group's balances stay correct, and
--               the Edge Function soft-deletes the auth user (no sign-in,
--               identity removed).
-- Callable by service_role only (the Edge Function), never by clients.

create or replace function public.delete_account_prepare(p_user uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  g record;
  v_new uuid;
  v_transferred int := 0;
  v_deleted int := 0;
  v_shared boolean;
  t text;
  r record;
begin
  if p_user is null then raise exception 'user_required' using errcode = '22023'; end if;
  if not exists (select 1 from public.profiles where id = p_user) then
    return jsonb_build_object('mode', 'hard', 'transferred_groups', 0, 'deleted_groups', 0, 'note', 'no_profile');
  end if;

  -- 1. Owned groups.
  for g in select id from public.groups where owner_id = p_user order by created_at, id for update loop
    select gm.user_id into v_new
      from public.group_members gm
     where gm.group_id = g.id and gm.status = 'active'
       and gm.user_id is not null and gm.user_id <> p_user
     order by gm.joined_at nulls last, gm.id
     limit 1;
    if v_new is not null then
      update public.groups set owner_id = v_new where id = g.id;
      update public.group_members set role = 'owner' where group_id = g.id and user_id = v_new;
      update public.group_members set role = 'member' where group_id = g.id and user_id = p_user;
      v_transferred := v_transferred + 1;
    else
      if to_regclass('public.plans') is not null then
        update public.plans set group_id = null where group_id = g.id;   -- FK has no ON DELETE
      end if;
      delete from public.groups where id = g.id;                         -- the rest cascades
      v_deleted := v_deleted + 1;
    end if;
  end loop;

  -- 2. The user's own rows (tables without a cascading FK to the user).
  for r in select * from (values
      ('notifications', 'user_id'), ('user_settings', 'user_id'),
      ('user_subscriptions', 'user_id'), ('user_referral_codes', 'user_id'),
      ('referral_rewards', 'user_id'), ('receipt_ocr', 'created_by'),
      ('referrals', 'inviter_id'), ('security_logs', 'user_id'),
      ('ad_impressions', 'user_id'), ('user_ad_preferences', 'user_id')) v(tbl, col) loop
    if to_regclass('public.' || r.tbl) is not null then
      execute format('delete from public.%I where %I = $1', r.tbl, r.col) using p_user;
    end if;
  end loop;
  -- Personal plans (no group) the user owns.
  if to_regclass('public.plans') is not null then
    delete from public.plans where owner_user_id = p_user and group_id is null;
  end if;
  -- Nullable pointers to the user from other rows.
  for r in select * from (values
      ('settlements', 'confirmed_by'), ('invites', 'accepted_by'),
      ('profiles', 'banned_by'), ('support_tickets', 'assigned_to'),
      ('support_tickets', 'escalated_to'), ('email_campaigns', 'sent_by')) v(tbl, col) loop
    if to_regclass('public.' || r.tbl) is not null and exists (
         select 1 from information_schema.columns
          where table_schema = 'public' and table_name = r.tbl and column_name = r.col) then
      execute format('update public.%I set %I = null where %I = $1', r.tbl, r.col, r.col) using p_user;
    end if;
  end loop;

  -- 3. Anything shared left that the schema will not let us delete?
  v_shared := false;
  for r in select * from (values
      ('expenses', 'created_by'), ('expenses', 'payer_id'),
      ('expense_splits', 'member_id'),   -- CASCADE: a hard delete would erase their shares
      ('settlements', 'from_user_id'), ('settlements', 'to_user_id'),
      ('messages', 'sender_id'), ('expense_approvals', 'approved_by'),
      ('budgets', 'created_by'), ('invites', 'created_by'),
      ('plans', 'owner_user_id'), ('plan_votes', 'created_by'),
      ('user_roles', 'created_by'), ('admin_audit_log', 'admin_id'),
      ('credit_notes', 'issued_by'), ('admin_kpi_targets', 'created_by')) v(tbl, col) loop
    exit when v_shared;
    if to_regclass('public.' || r.tbl) is not null and exists (
         select 1 from information_schema.columns
          where table_schema = 'public' and table_name = r.tbl and column_name = r.col) then
      execute format('select exists (select 1 from public.%I where %I = $1)', r.tbl, r.col)
        into v_shared using p_user;
    end if;
  end loop;

  if v_shared then
    update public.profiles
       set name = 'مستخدم محذوف', display_name = 'مستخدم محذوف',
           phone = null, avatar_url = null, bio = null, city = null,
           updated_at = now()
     where id = p_user;
    return jsonb_build_object('mode', 'soft', 'transferred_groups', v_transferred, 'deleted_groups', v_deleted);
  end if;

  delete from public.group_members where user_id = p_user;
  delete from public.profiles where id = p_user;
  return jsonb_build_object('mode', 'hard', 'transferred_groups', v_transferred, 'deleted_groups', v_deleted);
end;
$$;

revoke all on function public.delete_account_prepare(uuid) from public, anon, authenticated;
grant execute on function public.delete_account_prepare(uuid) to service_role;
