import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Apple, Smartphone, Sparkles, Users, Wallet } from "lucide-react";
import { useAnalyticsEvents } from "@/hooks/useAnalyticsEvents";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { ANDROID_AVAILABLE, APP_STORE_URL, PLAY_STORE_URL } from "@/lib/appStoreLinks";
import { detectPlatform, Platform } from "@/lib/platform";

export default function Download() {
  const { trackEvent } = useAnalyticsEvents();
  const [platform, setPlatform] = useState<Platform>("desktop");

  useEffect(() => {
    const p = detectPlatform();
    setPlatform(p);
    trackEvent("download_page_viewed", { platform: p });
  }, [trackEvent]);

  const handleDownload = (store: "ios" | "android") => {
    if (store === "android" && !ANDROID_AVAILABLE) return;
    trackEvent("download_clicked", { store, source: "download_page" });
    window.open(store === "ios" ? APP_STORE_URL : PLAY_STORE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 flex flex-col">
      <SEO
        title="حمّل تطبيق ديفيزو | Download Diviso"
        description="ديفيزو الآن على جوالك — قسّم المصاريف مع أصدقائك وعائلتك بذكاء. حمّل التطبيق من App Store."
        canonical="https://diviso.app/download"
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
            انتقلت تجربة ديفيزو الكاملة إلى التطبيق — إدارة المجموعات، تقسيم المصاريف، والتسويات
            كلها من جوالك. حمّل التطبيق وسجّل دخولك بنفس حسابك.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <div className={`grid grid-cols-1 ${ANDROID_AVAILABLE ? "sm:grid-cols-2" : ""} gap-3`}>
            <Button
              size="lg"
              variant="default"
              onClick={() => handleDownload("ios")}
              className="h-14 text-base"
            >
              <Apple className="h-5 w-5" />
              حمّله من App Store
            </Button>
            {ANDROID_AVAILABLE ? (
              <Button
                size="lg"
                variant={platform === "ios" ? "outline" : "default"}
                onClick={() => handleDownload("android")}
                className="h-14 text-base"
              >
                <Smartphone className="h-5 w-5" />
                Get it on Google Play
              </Button>
            ) : (
              <div className="h-14 flex items-center justify-center gap-2 rounded-md border border-border bg-muted/30 text-muted-foreground text-base">
                <Smartphone className="h-5 w-5" />
                نسخة أندرويد — قريبًا
              </div>
            )}
          </div>

          {platform === "desktop" && (
            <Card className="mt-6 p-6 flex flex-col items-center gap-3">
              <p className="text-sm font-medium text-muted-foreground">
                امسح الرمز بكاميرا جوالك لتحميل التطبيق
              </p>
              <QRCodeDisplay value={APP_STORE_URL} size={180} showActions={false} />
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
