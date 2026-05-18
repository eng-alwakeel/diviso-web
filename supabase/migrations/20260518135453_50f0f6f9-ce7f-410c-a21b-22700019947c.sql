CREATE OR REPLACE FUNCTION public.get_invite_preview(p_token text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_token_record RECORD;
  v_group RECORD;
  v_inviter_name text;
  v_member_count int;
BEGIN
  -- Look up token (no auth required)
  SELECT t.token, t.group_id, t.expires_at, t.max_uses, t.current_uses, t.created_by
    INTO v_token_record
  FROM public.group_join_tokens t
  WHERE t.token::text = p_token
  LIMIT 1;

  IF v_token_record IS NULL THEN
    RETURN jsonb_build_object(
      'is_valid', false,
      'reason', 'not_found'
    );
  END IF;

  IF v_token_record.expires_at IS NOT NULL AND v_token_record.expires_at <= now() THEN
    RETURN jsonb_build_object(
      'is_valid', false,
      'reason', 'expired',
      'expires_at', v_token_record.expires_at
    );
  END IF;

  IF v_token_record.max_uses IS NOT NULL
     AND v_token_record.max_uses <> -1
     AND v_token_record.current_uses >= v_token_record.max_uses THEN
    RETURN jsonb_build_object(
      'is_valid', false,
      'reason', 'usage_exceeded'
    );
  END IF;

  -- Fetch minimal group info
  SELECT g.id, g.name, g.group_type
    INTO v_group
  FROM public.groups g
  WHERE g.id = v_token_record.group_id
  LIMIT 1;

  IF v_group IS NULL THEN
    RETURN jsonb_build_object(
      'is_valid', false,
      'reason', 'group_missing'
    );
  END IF;

  -- Inviter display name (best-effort, public-safe)
  SELECT COALESCE(p.display_name, p.name, NULL)
    INTO v_inviter_name
  FROM public.profiles p
  WHERE p.id = v_token_record.created_by
  LIMIT 1;

  -- Member count (only active, non-archived)
  SELECT COUNT(*)::int
    INTO v_member_count
  FROM public.group_members m
  WHERE m.group_id = v_group.id
    AND m.archived_at IS NULL;

  RETURN jsonb_build_object(
    'is_valid', true,
    'group_name', v_group.name,
    'group_type', v_group.group_type,
    'inviter_name', v_inviter_name,
    'member_count', v_member_count,
    'expires_at', v_token_record.expires_at
  );
END;
$$;

-- Allow anonymous and authenticated callers to preview invites
GRANT EXECUTE ON FUNCTION public.get_invite_preview(text) TO anon, authenticated;