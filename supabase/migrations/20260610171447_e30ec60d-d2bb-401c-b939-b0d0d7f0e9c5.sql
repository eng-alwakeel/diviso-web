
-- 1) Drop client-side INSERT/UPDATE policies on financial/reward tables
DROP POLICY IF EXISTS "Users can insert own purchases" ON public.credit_purchases;
DROP POLICY IF EXISTS "Users can create own subscription purchases" ON public.subscription_purchases;
DROP POLICY IF EXISTS "Users can insert their own referral rewards" ON public.referral_rewards;
DROP POLICY IF EXISTS "Users can update their own referral rewards" ON public.referral_rewards;

-- 2) Server-side RPC to create a pending credit purchase with validated values
CREATE OR REPLACE FUNCTION public.create_credit_purchase(p_package_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_pkg public.credit_packages%ROWTYPE;
  v_total_credits integer;
  v_purchase_id uuid;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT * INTO v_pkg FROM public.credit_packages
   WHERE id = p_package_id AND is_active = true;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Package not found or inactive';
  END IF;

  v_total_credits := v_pkg.credits + COALESCE(v_pkg.bonus_credits, 0);

  INSERT INTO public.credit_purchases (user_id, package_id, credits_purchased, price_paid, status)
  VALUES (v_user_id, v_pkg.id, v_total_credits, v_pkg.price_sar, 'pending')
  RETURNING id INTO v_purchase_id;

  RETURN v_purchase_id;
END;
$$;

REVOKE ALL ON FUNCTION public.create_credit_purchase(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_credit_purchase(uuid) TO authenticated;

-- 3) Server-side RPC to create a pending subscription purchase with validated values
CREATE OR REPLACE FUNCTION public.create_subscription_purchase(
  p_plan_id uuid,
  p_billing_cycle text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_plan public.subscription_plans%ROWTYPE;
  v_purchase_id uuid;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF p_billing_cycle NOT IN ('monthly','yearly') THEN
    RAISE EXCEPTION 'Invalid billing cycle';
  END IF;

  SELECT * INTO v_plan FROM public.subscription_plans
   WHERE id = p_plan_id AND is_active = true;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Plan not found or inactive';
  END IF;

  INSERT INTO public.subscription_purchases (user_id, plan_id, billing_cycle, price_paid, status)
  VALUES (v_user_id, v_plan.id, p_billing_cycle, v_plan.price_sar, 'pending')
  RETURNING id INTO v_purchase_id;

  RETURN v_purchase_id;
END;
$$;

REVOKE ALL ON FUNCTION public.create_subscription_purchase(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_subscription_purchase(uuid, text) TO authenticated;
