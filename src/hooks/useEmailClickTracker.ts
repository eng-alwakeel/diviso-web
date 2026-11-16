import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * ORD-014 (ج): records an `email_click` first-party event when a visitor
 * lands from one of our emails (links carry utm_medium=email, added by
 * send-broadcast-email).
 *
 * - Goes through log_event(), which works signed-in or anonymous and takes the
 *   user id from auth.uid() on the server. No email, name or amount is sent:
 *   only the utm values and the path.
 * - Once per campaign per browser session, so a refresh doesn't double count.
 * - If log_event isn't deployed yet the call fails silently.
 */
// Captured at load, before any client-side redirect can drop the query string.
const LANDING_SEARCH = typeof window !== "undefined" ? window.location.search : "";
const LANDING_PATH = typeof window !== "undefined" ? window.location.pathname : "";

export function useEmailClickTracker() {
  useEffect(() => {
    const params = new URLSearchParams(LANDING_SEARCH);
    if (params.get("utm_medium") !== "email") return;

    const campaign = (params.get("utm_campaign") || "unknown").slice(0, 64);
    const onceKey = `diviso_email_click_${campaign}`;
    try {
      if (sessionStorage.getItem(onceKey)) return;
      sessionStorage.setItem(onceKey, "1");
    } catch {
      // sessionStorage unavailable (private mode): still log once for this load.
    }

    const props: Record<string, string> = {
      utm_source: (params.get("utm_source") || "email").slice(0, 64),
      utm_campaign: campaign,
      path: LANDING_PATH.slice(0, 64),
    };
    const content = params.get("utm_content");
    if (content) props.utm_content = content.slice(0, 64);

    supabase
      .rpc("log_event", { p_event: "email_click", p_props: props })
      .then(({ error }) => {
        if (error) console.debug("email_click not logged:", error.message);
      });
  }, []);
}
