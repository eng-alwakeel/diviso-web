// delete-account — «حذف الحساب» requested by the signed-in user (MSG-133/134).
//
// Needs migration 20261116160000_delete_account_prepare.sql applied first.
//
// 1. The caller is read from their own JWT; only that user is touched.
// 2. public.delete_account_prepare(user) runs every database step in ONE
//    transaction: owned groups → oldest active member (or deleted when the
//    user is alone), the user's own rows deleted, then either the profile
//    deleted ('hard') or anonymised when other people's money records still
//    point at it ('soft'). Any failure there → nothing changed.
// 3. auth.admin.deleteUser(id) — hard, or soft (shouldSoftDelete) in 'soft'
//    mode so the RESTRICT foreign keys on the profile keep holding.
//    Re-running after a failure here is safe: step 2 is idempotent.
//
// Responses (JSON):
//   200 { message, mode, transferred_groups, deleted_groups }
//   401 { error: 'unauthorized' }
//   500 { error: 'prepare_failed' | 'auth_delete_failed', message }
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { deleteAccountFlow, type PrepareResult } from "./flow.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
    const url = Deno.env.get("SUPABASE_URL")!;
    const admin = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data: { user }, error: userError } = await admin.auth.getUser(token);
    if (userError || !user) return json({ error: "unauthorized" }, 401);

    console.log("delete-account: start", user.id.substring(0, 8));
    const { status, body } = await deleteAccountFlow(
      user.id,
      async (id) => {
        const { data, error } = await admin.rpc("delete_account_prepare", { p_user: id });
        if (error) console.error("delete-account: prepare failed", error.message);
        return { data: data as PrepareResult | null, error };
      },
      async (id, soft) => {
        const { error } = await admin.auth.admin.deleteUser(id, soft);
        if (error) console.error("delete-account: auth delete failed", error.message);
        return { error };
      },
    );
    console.log("delete-account: done", user.id.substring(0, 8), status, body.mode ?? "");
    return json(body, status);
  } catch (e) {
    console.error("delete-account: error", (e as Error)?.message ?? e);
    return json({ error: "prepare_failed", message: "Nothing was deleted. Please try again later." }, 500);
  }
});
