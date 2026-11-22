import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Sparkles, Users, Wallet } from "lucide-react";
import { useAnalyticsEvents } from "@/hooks/useAnalyticsEvents";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { SMART_LINK_URL, smartLinkTargets, trackAppStoreClick, trackPlayStoreClick } from "@/lib/appStoreLinks";
import { StoreBadges, StoreLinks, usePlatform } from "@/components/StoreBadges";

// MSG-145 smart link. Phones are normally redirected at the edge
// (api/smart-link.js) before this page loads; this page covers the rest:
// an iPad asking for the desktop site gets the App Store, a computer sees
// both badges + a QR of this same link (the phone that scans it is sent to
// its own store). `?web=1` = the edge sent a crawler here: never redirect.
export default function Download() {
  const { trackEvent } = useAnalyticsEvents();
  const [params] = useSearchParams();
  const platform = usePlatform();
  const targets = useMemo(() => smartLinkTargets(params), [params]);
  const ct = params.get("ct") || params.get("utm_campaign") || "smart_link";

  const links: StoreLinks = {
    ios: targets.ios,
    android: targets.android,
    onIos: () => {
      trackAppStoreClick(ct);
      trackEvent("download_clicked", { store: "ios", source: "download_page" });
    },
    onAndroid: () => {
      trackPlayStoreClick(ct);
      trackEvent("download_clicked", { store: "android", source: "download_page" });
    },
  };

  useEffect(() => {
    trackEvent("download_page_viewed", { platform });
    if (params.get("web") === "1" || platform === "desktop") return;
    window.location.replace(platform === "ios" ? targets.ios : targets.android);
  }, [platform, params, targets, trackEvent]);

  // QR = this smart link with the same campaign, tagged as a QR scan.
  const qrParams = new URLSearchParams(params);
  qrParams.delete("web");
  if (!qrParams.get("ct")) qrParams.set("ct", "web_download_qr");
  if (!qrParams.get("utm_medium")) qrParams.set("utm_medium", "qr");
  const qrValue = `${SMART_LINK_URL}?${qrParams.toString()}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 flex flex-col">
      <SEO
        title="حمّل تطبيق ديفيزو | Download Diviso"
        description="ديفيزو على جوالك: قسّم المصاريف مع أصدقائك وعائلتك. حمّل التطبيق لجوالك."
        canonical="https://www.diviso.app/download"
      />
      <Header />

      <main className="container mx-auto max-w-2xl px-4 py-10 sm:py-16 flex-1">
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" /> Diviso
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            ديفيزو الآن في تطبيق الجوال 📱
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            إدارة المجموعات، تقسيم المصاريف، والتسويات كلها من جوالك. حمّل التطبيق وسجّل دخولك
            بنفس حسابك.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <StoreBadges links={links} height={52} />

          {platform === "desktop" && (
            <Card className="mt-6 p-6 flex flex-col items-center gap-3">
              <p className="text-sm font-medium text-muted-foreground">
                امسح الرمز بكاميرا جوالك لتحميل التطبيق
              </p>
              <QRCodeDisplay value={qrValue} size={180} showActions={false} />
            </Card>
          )}
        </section>

        <section className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Wallet, title: "قسّم أي مصروف", desc: "فواتير، رحلات، إيجار — بعدالة." },
            { icon: Users, title: "تسوية جماعية", desc: "أقل عدد تحويلات، أوضح صورة." },
            { icon: Sparkles, title: "اقتراحات ذكية", desc: "فواتير وتصنيفات تلقائية." },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="p-4 text-center">
              <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-semibold text-foreground text-sm">{title}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </Card>
          ))}
        </section>

        <footer className="mt-12 text-center text-xs text-muted-foreground">
          <Link to="/privacy" className="hover:text-foreground">الخصوصية</Link>
          <span className="mx-2">·</span>
          <Link to="/terms" className="hover:text-foreground">الشروط</Link>
          <span className="mx-2">·</span>
          <Link to="/support" className="hover:text-foreground">الدعم</Link>
        </footer>
      </main>

      <Footer />
    </div>
  );
}
