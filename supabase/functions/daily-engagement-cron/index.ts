import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require shared cron secret
    const cronSecret = Deno.env.get("CRON_SECRET");
    const provided = req.headers.get("x-cron-secret") ||
      (req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "") ?? "");
    if (!cronSecret || provided !== cronSecret) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);


    console.log("[daily-engagement-cron] Starting daily hub computation...");

    // 1. Compute all daily hubs
    const { data: hubResult, error: hubError } = await supabase.rpc(
      "compute_all_daily_hubs"
    );

    if (hubError) {
      console.error("[daily-engagement-cron] Hub compute error:", hubError);
      throw hubError;
    }

    console.log("[daily-engagement-cron] Hub result:", hubResult);

    // 2. Send segmented notifications
    const { data: notifResult, error: notifError } = await supabase.rpc(
      "send_daily_engagement_notifications"
    );

    if (notifError) {
      console.error("[daily-engagement-cron] Notification error:", notifError);
      throw notifError;
    }

    console.log("[daily-engagement-cron] Notification result:", notifResult);

    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      hub: hubResult,
      notifications: notifResult,
    };

    console.log("[daily-engagement-cron] Completed:", response);

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("[daily-engagement-cron] Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
