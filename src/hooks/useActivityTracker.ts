import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Updates profiles.last_active_at (ORD-014).
 *
 * Calls touch_last_active(), which takes the user id from auth.uid() on the
 * server and writes at most once per hour. The old update_user_activity(uuid)
 * is locked (no EXECUTE for authenticated) and must not be re-opened.
 *
 * Runs on mount and again whenever a user signs in, so a session that starts
 * signed-out is still counted once the user logs in.
 */
export function useActivityTracker() {
  const trackedUserId = useRef<string | null>(null);

  useEffect(() => {
    const touch = async (userId: string | undefined) => {
      if (!userId || trackedUserId.current === userId) return;
      try {
        const { error } = await supabase.rpc("touch_last_active");
        if (error) {
          console.error("Error updating user activity:", error);
        } else {
          trackedUserId.current = userId;
        }
      } catch (err) {
        console.error("Activity tracking error:", err);
      }
    };

    supabase.auth.getUser().then(({ data: { user } }) => touch(user?.id));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") touch(session?.user?.id);
    });

    return () => subscription.unsubscribe();
  }, []);
}
