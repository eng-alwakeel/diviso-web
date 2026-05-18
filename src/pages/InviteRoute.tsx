import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuotaHandler } from "@/hooks/useQuotaHandler";
import { useGroupNotifications } from "@/hooks/useGroupNotifications";
import { trackAnalyticsEvent } from "@/hooks/useAnalyticsEvents";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Sparkles, LogIn, ArrowRight, AlertTriangle } from "lucide-react";

interface InvitePreview {
  is_valid: boolean;
  reason?: string;
  group_name?: string;
  group_type?: string;
  inviter_name?: string;
  member_count?: number;
  expires_at?: string | null;
}

const STORAGE_KEYS = {
  token: "joinToken",
  redirect: "diviso_auth_redirect",
};

const groupTypeEmoji = (t?: string) => {
  switch ((t || "").toLowerCase()) {
    case "trip":
      return "🧳";
    case "party":
    case "meal":
      return "🍽️";
    case "home":
    case "housing":
      return "🏠";
    case "work":
    case "project":
      return "💼";
    default:
      return "👥";
  }
};

const InviteRoute = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { handleQuotaError } = useQuotaHandler();
  const { t } = useTranslation(["groups", "errors"]);
  const { notifyMemberJoined } = useGroupNotifications();

  const [preview, setPreview] = useState<InvitePreview | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(true);
  const [joining, setJoining] = useState(false);
  const [authed, setAuthed] = useState<boolean | null>(null);

  // Load preview + auth state
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!code) {
        navigate("/");
        return;
      }

      trackAnalyticsEvent("invite_opened", { token: code, source: "direct" });

      const [{ data: previewData }, { data: userData }] = await Promise.all([
        supabase.rpc("get_invite_preview", { p_token: code }),
        supabase.auth.getUser(),
      ]);

      if (cancelled) return;

      const parsed = (previewData as unknown as InvitePreview) || {
        is_valid: false,
        reason: "not_found",
      };
      setPreview(parsed);
      setAuthed(!!userData?.user);
      setLoadingPreview(false);

      trackAnalyticsEvent("invite_preview_viewed", {
        token: code,
        is_valid: parsed.is_valid,
        reason: parsed.reason,
      });
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [code, navigate]);

  const handleJoin = async () => {
    if (!code || joining) return;

    trackAnalyticsEvent("invite_share_clicked", { token: code, action: "join" });

    if (authed === false) {
      // Guest: store and redirect to auth
      localStorage.setItem(STORAGE_KEYS.token, code);
      localStorage.setItem(STORAGE_KEYS.redirect, `/i/${code}`);
      navigate(`/auth?redirectTo=${encodeURIComponent(`/i/${code}`)}`);
      return;
    }

    setJoining(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        localStorage.setItem(STORAGE_KEYS.token, code);
        navigate(`/auth?redirectTo=${encodeURIComponent(`/i/${code}`)}`);
        return;
      }

      const { data, error } = await supabase.rpc("join_group_with_token", {
        p_token: code,
      });
      if (error) throw error;

      if (!data) {
        toast({
          variant: "destructive",
          title: t("groups:messages.invalid_invite_link"),
          description: t("groups:messages.invalid_invite_link_desc"),
        });
        navigate("/dashboard");
        return;
      }

      // Notify other members (best-effort)
      try {
        const [groupRes, profileRes] = await Promise.all([
          supabase.from("groups").select("name").eq("id", data).single(),
          supabase
            .from("profiles")
            .select("display_name, name")
            .eq("id", user.id)
            .single(),
        ]);
        const groupName = groupRes.data?.name || preview?.group_name || "مجموعة";
        const memberName =
          profileRes.data?.display_name || profileRes.data?.name || "عضو جديد";
        await notifyMemberJoined(data, groupName, user.id, memberName);
      } catch (e) {
        console.error("notify member joined failed", e);
      }

      trackAnalyticsEvent("joined_from_invite", {
        token: code,
        group_id: data,
        user_id: user.id,
      });

      toast({
        title: t("groups:messages.joined_success"),
        description: t("groups:messages.added_to_group"),
      });
      navigate(`/group/${data}?showProfileCompletion=true`);
    } catch (e: any) {
      console.error("Join group error:", e);
      if (e?.code === "22023") {
        const msg = e.message;
        if (msg === "invalid_or_expired_token") {
          toast({
            variant: "destructive",
            title: t("groups:messages.invite_expired"),
            description: t("groups:messages.invite_expired_desc"),
          });
        } else if (msg === "link_usage_exceeded") {
          toast({
            variant: "destructive",
            title: t("groups:messages.link_usage_exceeded"),
            description: t("groups:messages.link_usage_exceeded_desc"),
          });
        } else {
          toast({
            variant: "destructive",
            title: t("groups:messages.invalid_invite_link"),
            description: t("groups:messages.invalid_invite_link_desc"),
          });
        }
      } else if (!handleQuotaError(e)) {
        toast({
          variant: "destructive",
          title: t("groups:messages.join_error"),
          description: t("groups:messages.join_error_desc"),
        });
      }
    } finally {
      localStorage.removeItem(STORAGE_KEYS.token);
      setJoining(false);
    }
  };

  // ---------- Renders ----------

  if (loadingPreview) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-sm p-6 space-y-4">
          <Skeleton className="h-20 w-20 rounded-full mx-auto" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
          <Skeleton className="h-12 w-full" />
        </Card>
      </div>
    );
  }

  if (!preview?.is_valid) {
    const reasonKey =
      preview?.reason === "expired"
        ? "groups:messages.invite_expired"
        : preview?.reason === "usage_exceeded"
        ? "groups:messages.link_usage_exceeded"
        : "groups:messages.invalid_invite_link";

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-sm p-6 text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-xl font-bold text-foreground">
            {t(reasonKey)}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("groups:messages.invalid_invite_link_desc")}
          </p>
          <Button onClick={() => navigate("/")} className="w-full">
            {t("groups:messages.back_to_home", { defaultValue: "العودة للرئيسية" })}
          </Button>
        </Card>
      </div>
    );
  }

  const emoji = groupTypeEmoji(preview.group_type);
  const memberLabel =
    typeof preview.member_count === "number"
      ? t("groups:messages.member_count", {
          count: preview.member_count,
          defaultValue: `${preview.member_count} عضو`,
        })
      : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 flex items-center justify-center p-6">
      <Card className="w-full max-w-sm p-6 text-center space-y-6 shadow-xl">
        {/* Group avatar / emoji */}
        <div className="mx-auto w-24 h-24 rounded-3xl bg-primary/15 flex items-center justify-center text-5xl shadow-inner">
          <span aria-hidden>{emoji}</span>
        </div>

        <div className="space-y-2">
          {preview.inviter_name && (
            <p className="text-sm text-muted-foreground inline-flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>
                {t("groups:messages.inviter_invited_you", {
                  name: preview.inviter_name,
                  defaultValue: `${preview.inviter_name} دعاك`,
                })}
              </span>
            </p>
          )}
          <h1 className="text-2xl font-bold text-foreground leading-snug">
            {preview.group_name}
          </h1>
          {memberLabel && (
            <p className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{memberLabel}</span>
            </p>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("groups:messages.invite_pitch", {
            defaultValue: "قسّموا المصاريف بدون تعقيد، وكل واحد يعرف كم له وكم عليه.",
          })}
        </p>

        <Button
          onClick={handleJoin}
          disabled={joining}
          size="lg"
          className="w-full gap-2 font-bold"
        >
          {authed ? (
            <>
              {joining
                ? t("groups:messages.joining", { defaultValue: "جاري الانضمام..." })
                : t("groups:messages.join_group", { defaultValue: "انضم للمجموعة" })}
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              {t("groups:messages.signup_to_join", {
                defaultValue: "سجّل دخولك للانضمام",
              })}
            </>
          )}
        </Button>

        <p className="text-[11px] text-muted-foreground/80">
          Diviso · {t("groups:messages.split_fairly", { defaultValue: "قسّم بذكاء" })}
        </p>
      </Card>
    </div>
  );
};

export default InviteRoute;
