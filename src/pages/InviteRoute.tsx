import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { trackAnalyticsEvent } from "@/hooks/useAnalyticsEvents";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Sparkles, ArrowRight, AlertTriangle } from "lucide-react";
import { APP_STORE_ID, APP_STORE_URL, EXTERNAL_LINK_PROPS } from "@/lib/appStoreLinks";

interface InvitePreview {
  is_valid: boolean;
  reason?: string;
  group_name?: string;
  group_type?: string;
  inviter_name?: string;
  member_count?: number;
  expires_at?: string | null;
}

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
  const { t } = useTranslation(["groups", "errors"]);

  const [preview, setPreview] = useState<InvitePreview | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(true);

  // Load preview
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!code) {
        navigate("/");
        return;
      }

      trackAnalyticsEvent("invite_opened", { token: code, source: "direct" });

      const { data: previewData } = await supabase.rpc("get_invite_preview", { p_token: code });

      if (cancelled) return;

      const parsed = (previewData as unknown as InvitePreview) || {
        is_valid: false,
        reason: "not_found",
      };
      setPreview(parsed);
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

  // Smart App Banner: opening the invite in the installed app via universal link
  useEffect(() => {
    if (!code) return;
    const m = document.createElement("meta");
    m.name = "apple-itunes-app";
    m.content = `app-id=${APP_STORE_ID}, app-argument=https://diviso.app/i/${code}`;
    document.head.appendChild(m);
    return () => m.remove();
  }, [code]);

  const handleDownload = () => {
    trackAnalyticsEvent("download_clicked", { store: "ios", source: "invite", token: code });
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
          <Button asChild className="w-full">
            <a href={APP_STORE_URL} {...EXTERNAL_LINK_PROPS} onClick={handleDownload}>
              {t("groups:messages.download_app", { defaultValue: "حمّل التطبيق" })}
            </a>
          </Button>
          <Button onClick={() => navigate("/")} variant="ghost" className="w-full">
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

        <p className="text-sm text-muted-foreground">
          {t("groups:messages.accept_in_app", {
            defaultValue: "حمّل تطبيق ديفيزو وافتح رابط الدعوة من جوالك للانضمام للمجموعة.",
          })}
        </p>

        <Button asChild size="lg" className="w-full gap-2 font-bold">
          <a href={APP_STORE_URL} {...EXTERNAL_LINK_PROPS} onClick={handleDownload}>
            {t("groups:messages.download_app", { defaultValue: "حمّل التطبيق" })}
            <ArrowRight className="w-4 h-4" />
          </a>
        </Button>

        <p className="text-[11px] text-muted-foreground/80">
          Diviso · {t("groups:messages.split_fairly", { defaultValue: "قسّم بذكاء" })}
        </p>
      </Card>
    </div>
  );
};

export default InviteRoute;
