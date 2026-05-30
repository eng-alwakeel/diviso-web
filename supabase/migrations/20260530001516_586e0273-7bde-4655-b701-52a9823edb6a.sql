
-- 1. invoice_items: restrict INSERT to service_role only
DROP POLICY IF EXISTS "System can insert invoice items" ON public.invoice_items;
CREATE POLICY "Service role can insert invoice items"
ON public.invoice_items
FOR INSERT
TO service_role
WITH CHECK (true);

-- 2. recommendations: restrict INSERT to service_role only
DROP POLICY IF EXISTS "Service role can insert recommendations" ON public.recommendations;
CREATE POLICY "Service role can insert recommendations"
ON public.recommendations
FOR INSERT
TO service_role
WITH CHECK (true);

-- 3. email_verification_codes: drop client INSERT/UPDATE; handled via edge functions (service_role)
DROP POLICY IF EXISTS "Users can insert their own verification codes" ON public.email_verification_codes;
DROP POLICY IF EXISTS "Users can update their own verification codes" ON public.email_verification_codes;

-- 4. user_reputation: restrict SELECT to own row only
DROP POLICY IF EXISTS "Anyone authenticated can view reputation" ON public.user_reputation;
CREATE POLICY "Users can view their own reputation"
ON public.user_reputation
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- 5. user_roles: prevent admins from modifying their own role rows (only owners can)
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
    AND user_id <> auth.uid()
    AND role <> ALL (ARRAY['owner'::app_role, 'admin'::app_role, 'finance_admin'::app_role, 'ads_admin'::app_role, 'growth_admin'::app_role, 'developer'::app_role])
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
    AND user_id <> auth.uid()
    AND role <> ALL (ARRAY['owner'::app_role, 'admin'::app_role, 'finance_admin'::app_role, 'ads_admin'::app_role, 'growth_admin'::app_role, 'developer'::app_role])
  )
)
WITH CHECK (
  has_role(auth.uid(), 'owner'::app_role)
  OR (
    has_role(auth.uid(), 'admin'::app_role)
    AND user_id <> auth.uid()
    AND role <> ALL (ARRAY['owner'::app_role, 'admin'::app_role, 'finance_admin'::app_role, 'ads_admin'::app_role, 'growth_admin'::app_role, 'developer'::app_role])
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
    AND user_id <> auth.uid()
    AND role <> ALL (ARRAY['owner'::app_role, 'admin'::app_role, 'finance_admin'::app_role, 'ads_admin'::app_role, 'growth_admin'::app_role, 'developer'::app_role])
  )
);

-- 6. Set search_path on functions that lack it
ALTER FUNCTION public.approve_expense(uuid) SET search_path TO 'public';
ALTER FUNCTION public.auto_confirm_expired_settlements() SET search_path TO 'public';
ALTER FUNCTION public.confirm_settlement(uuid) SET search_path TO 'public';
ALTER FUNCTION public.create_settlement(uuid, uuid, numeric, text) SET search_path TO 'public';
ALTER FUNCTION public.dispute_settlement(uuid, text) SET search_path TO 'public';
ALTER FUNCTION public.get_friends_from_other_groups(uuid, uuid) SET search_path TO 'public';
ALTER FUNCTION public.get_group_balance(uuid) SET search_path TO 'public';
ALTER FUNCTION public.get_group_settlements(uuid) SET search_path TO 'public';
ALTER FUNCTION public.get_pending_actions() SET search_path TO 'public';
ALTER FUNCTION public.get_pending_expenses_for_approval() SET search_path TO 'public';
ALTER FUNCTION public.reject_expense(uuid, text) SET search_path TO 'public';
ALTER FUNCTION public.update_fcm_token_updated_at() SET search_path TO 'public';
