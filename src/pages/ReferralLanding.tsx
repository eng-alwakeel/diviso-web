import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, Sparkles, Users, Wallet, Apple, Smartphone, ArrowRight, Loader2 } from "lucide-react";
import { useAnalyticsEvents } from "@/hooks/useAnalyticsEvents";

import { ANDROID_AVAILABLE, APP_STORE_URL, APP_STORE_ID, PLAY_STORE_URL, EXTERNAL_LINK_PROPS } from "@/lib/appStoreLinks";
import { detectPlatform, Platform } from "@/lib/platform";
const DEEP_LINK_SCHEME = "diviso://referral";

export default function ReferralLanding() {
  const { referralCode } = useParams<{ referralCode: string }>();
  const { trackEvent } = useAnalyticsEvents();
  const [platform, setPlatform] = useState<Platform>("desktop");
  const [inviter, setInviter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());

    if (!referralCode) {
      setInvalid(true);
      setLoading(false);
      return;
    }

    // Persist code for post-install / post-signup
    try {
      localStorage.setItem("diviso_referral_code", referralCode);
      localStorage.setItem("diviso_referral_saved_at", String(Date.now()));
    } catch {}

    trackEvent("referral_page_viewed", { code: referralCode, platform: detectPlatform() });

    (async () => {
      try {
        const { data } = await supabase
          .from("user_referral_codes")
          .select("profiles!user_referral_codes_user_id_fkey(name, display_name)")
          .eq("referral_code", referralCode)
          .maybeSingle();
        const p: any = (data as any)?.profiles;
        if (!data) setInvalid(true);
        else setInviter(p?.display_name || p?.name || null);
      } catch {
        setInvalid(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [referralCode, trackEvent]);

  // Inject Smart App Banner meta tags (iOS & Android)
  useEffect(() => {
    const tags: HTMLMetaElement[] = [];
    const add = (name: string, content: string) => {
      const m = document.createElement("meta");
      m.name = name;
      m.content = content;
      document.head.appendChild(m);
      tags.push(m);
    };
    add(
      "apple-itunes-app",
      `app-id=${APP_STORE_ID}, app-argument=diviso://referral/${referralCode ?? ""}`,
    );
    if (ANDROID_AVAILABLE) {
      add("google-play-app", "app-id=app.diviso");
    }
    return () => tags.forEach((t) => t.remove());
  }, [referralCode]);

  const handleDownload = (store: "ios" | "android") => {
    if (store === "android" && !ANDROID_AVAILABLE) return;
    trackEvent("download_clicked", { store, code: referralCode });
    window.open(store === "ios" ? APP_STORE_URL : PLAY_STORE_URL, "_blank", "noopener,noreferrer");
  };

  const handleOpenInApp = () => {
    trackEvent("referral_deep_link_clicked", { code: referralCode });
    window.location.href = `${DEEP_LINK_SCHEME}/${referralCode}`;
  };

  const pageUrl = `https://diviso.app/j/${referralCode ?? ""}`;
  const title = `🎁 You've been invited to Diviso — Get 100 points`;
  const description = inviter
    ? `${inviter} invited you to Diviso. Sign up with this link and earn 100 points instantly.`
    : `You've been invited to Diviso. Sign up and earn 100 points instantly.`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <SEO
        title={title}
        description={description}
        canonical={pageUrl}
        noIndex={true}
      />

      <main className="container mx-auto max-w-2xl px-4 py-10 sm:py-16">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" /> Diviso
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            🎁 You've been invited to Diviso!
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            {inviter ? (
              <>
                <span className="font-semibold text-foreground">{inviter}</span> wants you to split
                expenses smarter — together.
              </>
            ) : (
              <>Split expenses with friends, family & travel groups — effortlessly.</>
            )}
          </p>
          {invalid && (
            <p className="text-sm text-destructive">
              Note: this referral code couldn't be verified, but you can still sign up.
            </p>
          )}
        </section>

        {/* Reward */}
        <Card className="mt-8 p-6 bg-gradient-to-br from-primary/15 to-primary/5 border-primary/30">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm uppercase tracking-wider text-primary font-semibold">
                Your reward
              </p>
              <h2 className="text-2xl font-bold text-foreground mt-1">Get 100 points on signup</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Use points to unlock smart features, AI receipts, and more. Code:{" "}
                <span className="font-mono font-semibold text-foreground">{referralCode}</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Download CTAs */}
        <section className="mt-8 space-y-3">
          <p className="text-center text-sm font-medium text-muted-foreground">
            Download the app to get started
          </p>
          <div className={`grid grid-cols-1 ${ANDROID_AVAILABLE ? "sm:grid-cols-2" : ""} gap-3`}>
            <Button
              size="lg"
              variant="default"
              onClick={() => handleDownload("ios")}
              className="h-14 text-base"
            >
              <Apple className="h-5 w-5" />
              Download on the App Store
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
                Android — coming soon
              </div>
            )}
          </div>

          {platform !== "desktop" && (
            <Button
              variant="ghost"
              className="w-full text-primary"
              onClick={handleOpenInApp}
            >
              Already installed? Open in app <ArrowRight className="h-4 w-4" />
            </Button>
          )}

        </section>

        {/* Features */}
        <section className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Wallet, title: "Split anything", desc: "Bills, trips, rent — fairly." },
            { icon: Users, title: "Group settle-up", desc: "Minimum transactions, max clarity." },
            { icon: Sparkles, title: "Smart suggestions", desc: "Receipts & categories, automated." },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="p-4 text-center">
              <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-semibold text-foreground text-sm">{title}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </Card>
          ))}
        </section>

        <footer className="mt-12 text-center text-xs text-muted-foreground">
          <Link to="/privacy-policy" className="hover:text-foreground">Privacy</Link>
          <span className="mx-2">·</span>
          <Link to="/terms" className="hover:text-foreground">Terms</Link>
          <span className="mx-2">·</span>
          <Link to="/" className="hover:text-foreground">diviso.app</Link>
        </footer>
      </main>
    </div>
  );
}
