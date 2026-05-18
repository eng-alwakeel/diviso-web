
-- 1. Invoices INSERT
DROP POLICY IF EXISTS "System can insert invoices" ON public.invoices;
CREATE POLICY "Users can insert own invoices"
ON public.invoices FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

-- 2. user_roles privilege escalation
DROP POLICY IF EXISTS "Owners and admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Owners and admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Owners and admins can delete roles" ON public.user_roles;

CREATE POLICY "Role insert privilege scoped"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'owner'::app_role)
  OR (
    has_role(auth.uid(), 'admin'::app_role)
    AND role NOT IN ('owner'::app_role, 'admin'::app_role)
  )
);

CREATE POLICY "Role update privilege scoped"
ON public.user_roles FOR UPDATE TO authenticated
USING (
  has_role(auth.uid(), 'owner'::app_role)
  OR (
    has_role(auth.uid(), 'admin'::app_role)
    AND role NOT IN ('owner'::app_role, 'admin'::app_role)
  )
)
WITH CHECK (
  has_role(auth.uid(), 'owner'::app_role)
  OR (
    has_role(auth.uid(), 'admin'::app_role)
    AND role NOT IN ('owner'::app_role, 'admin'::app_role)
  )
);

CREATE POLICY "Role delete privilege scoped"
ON public.user_roles FOR DELETE TO authenticated
USING (
  has_role(auth.uid(), 'owner'::app_role)
  OR (
    has_role(auth.uid(), 'admin'::app_role)
    AND role NOT IN ('owner'::app_role, 'admin'::app_role)
  )
);

-- 3. affiliate_partners
DROP POLICY IF EXISTS "Anyone can view active partners" ON public.affiliate_partners;
CREATE POLICY "Authenticated users can view active partners"
ON public.affiliate_partners FOR SELECT TO authenticated
USING (is_active = true);

-- 4. admin_feature_flags
DROP POLICY IF EXISTS "Feature flags are readable by everyone" ON public.admin_feature_flags;
CREATE POLICY "Authenticated users can read feature flags"
ON public.admin_feature_flags FOR SELECT TO authenticated
USING (true);

-- 5. family_invitations
DROP POLICY IF EXISTS "Users can view invitations with valid token" ON public.family_invitations;
CREATE POLICY "Users can view invitations targeted to them"
ON public.family_invitations FOR SELECT TO authenticated
USING (
  family_owner_id = auth.uid()
  OR accepted_by = auth.uid()
  OR (
    status = 'pending'
    AND expires_at > now()
    AND auth.uid() IS NOT NULL
    AND (
      invited_email = (auth.jwt() ->> 'email')
      OR (invited_phone IS NOT NULL AND invited_phone = (auth.jwt() ->> 'phone'))
    )
  )
);

-- 6. subscription_purchases unrestricted UPDATE
DROP POLICY IF EXISTS "Service role can update subscription purchases" ON public.subscription_purchases;
