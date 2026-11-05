import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { trackAnalyticsEvent } from "@/hooks/useAnalyticsEvents";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { APP_STORE_ID, APP_STORE_URL, EXTERNAL_LINK_PROPS } from "@/lib/appStoreLinks";

/**
 * Fallback for a game-table invite `https://diviso.app/t/<code>` (1.0.21,
 * MSG-096 §4). With the app installed iOS opens it in the app (the
 * `/t/*` entry in apple-app-site-association); this page is only for people
 * without the app. A table is visible to its members only, so there is no
 * preview here — just what a table is and the store link. Same look as the
 * group invite page `/i/*`.
 */
const CODE_RE = /^[A-Za-z0-9]{6,32}$/;

const TableInviteRoute = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation(["groups"]);
  const valid = !!code && CODE_RE.test(code);

  useEffect(() => {
    if (valid) trackAnalyticsEvent("table_invite_opened", { source: "web_fallback" });
  }, [valid]);

  // Smart App Banner: opens the same link in the app once installed.
  useEffect(() => {
    if (!valid) return;
    const m = document.createElement("meta");
    m.name = "apple-itunes-app";
    m.content = `app-id=${APP_STORE_ID}, app-argument=https://diviso.app/t/${code}`;
    document.head.appendChild(m);
    return () => m.remove();
  }, [code, valid]);

  const handleDownload = () => {
    trackAnalyticsEvent("download_clicked", { store: "ios", source: "table_invite" });
  };

  if (!valid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-sm p-6 text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-xl font-bold text-foreground">{t("groups:table_invite.invalid")}</h1>
          <p className="text-sm text-muted-foreground">{t("groups:table_invite.invalid_desc")}</p>
          <Button onClick={() => navigate("/")} variant="ghost" className="w-full">
            {t("groups:table_invite.back_home")}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 flex items-center justify-center p-6">
      <Card className="w-full max-w-sm p-6 text-center space-y-6 shadow-xl">
        <div className="mx-auto w-24 h-24 rounded-3xl bg-primary/15 flex items-center justify-center text-5xl shadow-inner">
          <span aria-hidden>🃏</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground leading-snug">
          {t("groups:table_invite.title")}
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed">{t("groups:table_invite.pitch")}</p>

        <p className="text-sm text-muted-foreground">{t("groups:table_invite.open_in_app")}</p>

        <Button asChild size="lg" className="w-full gap-2 font-bold">
          <a href={APP_STORE_URL} {...EXTERNAL_LINK_PROPS} onClick={handleDownload}>
            {t("groups:table_invite.download")}
            <ArrowRight className="w-4 h-4" />
          </a>
        </Button>

        <p className="text-[11px] text-muted-foreground/80">Diviso</p>
      </Card>
    </div>
  );
};

export default TableInviteRoute;
