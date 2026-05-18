
-- ============================================
-- 1. PROFILES: Prevent privilege escalation via UPDATE
-- ============================================
CREATE OR REPLACE FUNCTION public.prevent_profile_privilege_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  caller uuid := auth.uid();
  is_admin boolean := false;
BEGIN
  -- Service role bypasses (no auth.uid())
  IF caller IS NULL THEN
    RETURN NEW;
  END IF;

  -- Check if caller has owner/admin app_role
  SELECT EXISTS(
    SELECT 1 FROM public.user_roles
    WHERE user_id = caller AND role IN ('owner'::app_role, 'admin'::app_role)
  ) INTO is_admin;

  IF NOT is_admin THEN
    -- Block changes to privileged columns by non-admins
    IF NEW.is_admin IS DISTINCT FROM OLD.is_admin THEN
      RAISE EXCEPTION 'Not allowed to modify is_admin';
    END IF;
    IF NEW.is_banned IS DISTINCT FROM OLD.is_banned THEN
      RAISE EXCEPTION 'Not allowed to modify is_banned';
    END IF;
    IF NEW.banned_by IS DISTINCT FROM OLD.banned_by THEN
      RAISE EXCEPTION 'Not allowed to modify banned_by';
    END IF;
    IF NEW.ban_reason IS DISTINCT FROM OLD.ban_reason THEN
      RAISE EXCEPTION 'Not allowed to modify ban_reason';
    END IF;
    IF NEW.banned_until IS DISTINCT FROM OLD.banned_until THEN
      RAISE EXCEPTION 'Not allowed to modify banned_until';
    END IF;
    IF NEW.is_founding_user IS DISTINCT FROM OLD.is_founding_user THEN
      RAISE EXCEPTION 'Not allowed to modify is_founding_user';
    END IF;
    IF NEW.user_number IS DISTINCT FROM OLD.user_number THEN
      RAISE EXCEPTION 'Not allowed to modify user_number';
    END IF;
    IF NEW.odoo_partner_id IS DISTINCT FROM OLD.odoo_partner_id THEN
      RAISE EXCEPTION 'Not allowed to modify odoo_partner_id';
    END IF;
    IF NEW.last_admin_action_at IS DISTINCT FROM OLD.last_admin_action_at THEN
      RAISE EXCEPTION 'Not allowed to modify last_admin_action_at';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_profile_privilege_escalation ON public.profiles;
CREATE TRIGGER trg_prevent_profile_privilege_escalation
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.prevent_profile_privilege_escalation();

-- ============================================
-- 2. USER_ROLES: Only owners can assign admin-level roles
-- ============================================
DROP POLICY IF EXISTS "Role insert privilege scoped" ON public.user_roles;
DROP POLICY IF EXISTS "Role update privilege scoped" ON public.user_roles;
DROP POLICY IF EXISTS "Role delete privilege scoped" ON public.user_roles;

CREATE POLICY "Role insert privilege scoped"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'owner'::app_role)
  OR (
    has_role(auth.uid(), 'admin'::app_role)
    AND role NOT IN ('owner'::app_role, 'admin'::app_role, 'finance_admin'::app_role, 'ads_admin'::app_role, 'growth_admin'::app_role, 'developer'::app_role)
  )
);

CREATE POLICY "Role update privilege scoped"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (
  has_role(auth.uid(), 'owner'::app_role)
  OR (
    has_role(auth.uid(), 'admin'::app_role)
    AND role NOT IN ('owner'::app_role, 'admin'::app_role, 'finance_admin'::app_role, 'ads_admin'::app_role, 'growth_admin'::app_role, 'developer'::app_role)
  )
)
WITH CHECK (
  has_role(auth.uid(), 'owner'::app_role)
  OR (
    has_role(auth.uid(), 'admin'::app_role)
    AND role NOT IN ('owner'::app_role, 'admin'::app_role, 'finance_admin'::app_role, 'ads_admin'::app_role, 'growth_admin'::app_role, 'developer'::app_role)
  )
);

CREATE POLICY "Role delete privilege scoped"
ON public.user_roles
FOR DELETE
TO authenticated
USING (
  has_role(auth.uid(), 'owner'::app_role)
  OR (
    has_role(auth.uid(), 'admin'::app_role)
    AND role NOT IN ('owner'::app_role, 'admin'::app_role, 'finance_admin'::app_role, 'ads_admin'::app_role, 'growth_admin'::app_role, 'developer'::app_role)
  )
);

-- ============================================
-- 3. BALANCE_NOTIFICATIONS: restrict INSERT to payer
-- ============================================
DROP POLICY IF EXISTS "Authenticated users can insert balance notifications" ON public.balance_notifications;
CREATE POLICY "Payers can insert balance notifications"
ON public.balance_notifications
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = payer_id);

-- ============================================
-- 4. COIN/CREDITS/REWARDS: Remove client INSERT
-- ============================================
DROP POLICY IF EXISTS "Users can insert their own transactions" ON public.coin_transactions;
DROP POLICY IF EXISTS "System can insert credits" ON public.usage_credits;
DROP POLICY IF EXISTS "System can insert rewards" ON public.reward_points;
-- These should now only be written via SECURITY DEFINER RPCs or service-role edge functions.

-- ============================================
-- 5. USER_SUBSCRIPTIONS: Remove user INSERT/UPDATE
-- ============================================
DROP POLICY IF EXISTS "Users can create own subscription" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can update own subscription" ON public.user_subscriptions;
-- Subscriptions are now only writable via service-role (webhooks, edge functions).

-- ============================================
-- 6. PUBLIC READ → AUTHENTICATED ONLY
-- ============================================
DROP POLICY IF EXISTS "Everyone can read enabled ad_types" ON public.ad_types;
CREATE POLICY "Authenticated can read enabled ad_types"
ON public.ad_types FOR SELECT TO authenticated USING (is_enabled = true);

DROP POLICY IF EXISTS "Everyone can read enabled ad_placements" ON public.ad_placements;
CREATE POLICY "Authenticated can read enabled ad_placements"
ON public.ad_placements FOR SELECT TO authenticated USING (is_enabled = true);

DROP POLICY IF EXISTS "Everyone can read active offers" ON public.offers;
CREATE POLICY "Authenticated can read active offers"
ON public.offers FOR SELECT TO authenticated USING (status = 'active'::text);

DROP POLICY IF EXISTS "Anyone can view active runbooks" ON public.support_runbooks;
CREATE POLICY "Authenticated can view active runbooks"
ON public.support_runbooks FOR SELECT TO authenticated USING (is_active = true);

-- ============================================
-- 7. EMAIL VERIFICATION CODES: hide from client
-- ============================================
DROP POLICY IF EXISTS "Users can view their own verification codes" ON public.email_verification_codes;
-- Codes must be verified server-side only.
