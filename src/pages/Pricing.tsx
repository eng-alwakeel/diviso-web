import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Sparkles, Star, Crown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const LIME = "#C8F169";

type Cycle = "monthly" | "yearly";

const plans = [
  {
    id: "starter",
    nameAr: "ستارتر",
    icon: Zap,
    monthly: { price: 19, credits: 70, period: "شهر" },
    yearly: { price: 189, credits: 90, period: "شهر", save: 17, equiv: "15.75" },
    features: [
      "نقاط شهرية تتجدد تلقائياً",
      "جميع الميزات الأساسية",
      "تقسيم غير محدود للمصاريف",
      "دعم عبر البريد",
    ],
  },
  {
    id: "pro",
    nameAr: "برو",
    icon: Star,
    monthly: { price: 29, credits: 90, period: "شهر" },
    yearly: { price: 239, credits: 160, period: "شهر", save: 31, equiv: "19.92" },
    features: [
      "ضعف نقاط ستارتر",
      "ميزانية ذكية",
      "تقارير متقدمة",
      "أولوية في الدعم",
    ],
  },
  {
    id: "max",
    nameAr: "ماكس",
    featured: true,
    badge: "الأكثر شعبية",
    icon: Crown,
    monthly: { price: 39, credits: 260, period: "شهر" },
    yearly: { price: 299, credits: 260, period: "شهر", save: 36, equiv: "24.92" },
    features: [
      "أعلى رصيد نقاط شهرياً",
      "مخطط رحلات بالذكاء",
      "تصدير PDF / Excel غير محدود",
      "دعم VIP فوري",
    ],
  },
];

const packs = [
  { credits: 90, sar: 25, usd: "6.99" },
  { credits: 200, sar: 49, usd: "12.99", badge: "الأكثر شيوعاً", featured: true },
  { credits: 450, sar: 99, usd: "26.99", badge: "أفضل قيمة" },
];

const earnMethods = [
  { emoji: "🎁", title: "مكافأة الترحيب", value: "50 نقطة" },
  { emoji: "🌟", title: "مؤسس Diviso", value: "100 نقطة" },
  { emoji: "📅", title: "تسجيل يومي", value: "5 نقاط" },
  { emoji: "📺", title: "مشاهدة إعلان", value: "1 نقطة" },
  { emoji: "👥", title: "دعوة صديق", value: "10-30 نقطة" },
  { emoji: "🔄", title: "اشتراك شهري", value: "70-260 نقطة" },
  { emoji: "💎", title: "شراء حزمة", value: "90-450 نقطة" },
];

const costs = [
  { tier: "🆓", label: "مجاني", items: "تقسيم المصاريف، عرض البيانات" },
  { tier: "1️⃣", label: "نقطة واحدة", items: "إضافة/تعديل/حذف مصروف، تصدير PDF/Excel، إدارة المجموعة" },
  { tier: "2️⃣", label: "نقطتان", items: "حذف مجموعة، دعوة SMS، تقرير متقدم" },
  { tier: "3️⃣", label: "ثلاث نقاط", items: "إنشاء تسوية، ميزانية ذكية، إنشاء خطة" },
  { tier: "5️⃣", label: "خمس نقاط", items: "إنشاء مجموعة، مخطط الرحلة" },
];

const APP_STORE_URL = "https://apps.apple.com/app/diviso";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.diviso";

const Pricing = () => {
  const [cycle, setCycle] = useState<Cycle>("yearly");

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <SEO
        title="باقات Diviso — أسعار وأرصدة النقاط"
        description="اختر الباقة المناسبة لك: ستارتر، برو، أو ماكس. خصم حتى 36% للاشتراك السنوي + حزم نقاط لمرة واحدة."
        canonical="https://diviso.app/pricing"
      />
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="px-4 max-w-6xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/40 backdrop-blur text-xs mb-5">
            <Sparkles className="w-3.5 h-3.5" style={{ color: LIME }} />
            <span>اختر الباقة المناسبة لك</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            باقات بسيطة. <span style={{ color: LIME }}>قيمة لا تُقاوم.</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            ادفع شهرياً أو وفّر حتى 36% بالاشتراك السنوي. نقاط تتجدد تلقائياً.
          </p>
        </section>

        {/* Billing Toggle */}
        <section className="px-4 mb-10 flex justify-center">
          <div className="relative inline-flex items-center p-1 rounded-full bg-card/60 border border-border backdrop-blur">
            <button
              onClick={() => setCycle("monthly")}
              className={cn(
                "relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors",
                cycle === "monthly" ? "text-black" : "text-muted-foreground"
              )}
              style={cycle === "monthly" ? { backgroundColor: LIME } : undefined}
            >
              شهري
            </button>
            <button
              onClick={() => setCycle("yearly")}
              className={cn(
                "relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2",
                cycle === "yearly" ? "text-black" : "text-muted-foreground"
              )}
              style={cycle === "yearly" ? { backgroundColor: LIME } : undefined}
            >
              سنوي
              <span
                className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-bold",
                  cycle === "yearly" ? "bg-black/15 text-black" : "bg-[color:var(--lime)]/15"
                )}
                style={cycle !== "yearly" ? { color: LIME, backgroundColor: `${LIME}22` } : undefined}
              >
                وفّر حتى 36%
              </span>
            </button>
          </div>
        </section>

        {/* Subscription Plans */}
        <section className="px-4 max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-3 gap-5">
            {plans.map((p) => {
              const data = cycle === "monthly" ? p.monthly : p.yearly;
              const Icon = p.icon;
              const featured = p.featured;
              return (
                <div
                  key={p.id}
                  className={cn(
                    "relative rounded-2xl border bg-card/40 backdrop-blur p-6 flex flex-col transition-all",
                    featured
                      ? "border-transparent shadow-2xl md:scale-[1.03]"
                      : "border-border hover:border-border/80"
                  )}
                  style={
                    featured
                      ? {
                          boxShadow: `0 0 0 1.5px ${LIME}, 0 20px 60px -20px ${LIME}55`,
                        }
                      : undefined
                  }
                >
                  {featured && p.badge && (
                    <div
                      className="absolute -top-3 right-1/2 translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold text-black flex items-center gap-1"
                      style={{ backgroundColor: LIME }}
                    >
                      <Star className="w-3 h-3 fill-black" />
                      {p.badge}
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${LIME}1f`, color: LIME }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold">{p.nameAr}</h3>
                  </div>

                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{data.price}</span>
                    <span className="text-muted-foreground">SAR</span>
                    <span className="text-muted-foreground text-sm">
                      / {cycle === "monthly" ? "شهر" : "سنة"}
                    </span>
                  </div>

                  <div className="text-sm mb-1" style={{ color: LIME }}>
                    {data.credits} نقطة/شهر
                  </div>

                  {cycle === "yearly" && "equiv" in data && (
                    <div className="text-xs text-muted-foreground mb-1">
                      يعادل {(data as any).equiv} SAR/شهر
                    </div>
                  )}

                  {cycle === "yearly" && "save" in data && (
                    <Badge
                      variant="outline"
                      className="self-start mt-1 mb-4 border-[color:var(--border)]"
                      style={{ color: LIME, borderColor: `${LIME}55` }}
                    >
                      وفّر {(data as any).save}%
                    </Badge>
                  )}

                  <ul className="space-y-2.5 my-6 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: LIME }}
                        />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    size="lg"
                    className={cn(
                      "mt-auto w-full font-bold",
                      featured ? "text-black hover:opacity-90" : ""
                    )}
                    style={
                      featured
                        ? { backgroundColor: LIME }
                        : { backgroundColor: `${LIME}1a`, color: LIME, border: `1px solid ${LIME}55` }
                    }
                  >
                    <a href={APP_STORE_URL}>ابدأ مجاناً</a>
                  </Button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Credit Packs */}
        <section className="px-4 max-w-6xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">حزم النقاط</h2>
            <p className="text-muted-foreground">شراء لمرة واحدة — بدون اشتراك.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {packs.map((pack) => (
              <div
                key={pack.credits}
                className={cn(
                  "relative rounded-2xl border bg-card/40 backdrop-blur p-6 text-center",
                  pack.featured ? "border-transparent" : "border-border"
                )}
                style={
                  pack.featured
                    ? { boxShadow: `0 0 0 1.5px ${LIME}, 0 20px 60px -20px ${LIME}55` }
                    : undefined
                }
              >
                {pack.badge && (
                  <div
                    className={cn(
                      "absolute -top-3 right-1/2 translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold",
                      pack.featured ? "text-black" : "border"
                    )}
                    style={
                      pack.featured
                        ? { backgroundColor: LIME }
                        : { color: LIME, borderColor: `${LIME}66`, backgroundColor: `${LIME}14` }
                    }
                  >
                    {pack.badge}
                  </div>
                )}
                <div className="text-4xl font-bold mb-1" style={{ color: LIME }}>
                  {pack.credits}
                </div>
                <div className="text-sm text-muted-foreground mb-4">نقطة</div>
                <div className="flex items-baseline justify-center gap-2 mb-1">
                  <span className="text-2xl font-bold">{pack.sar}</span>
                  <span className="text-muted-foreground text-sm">SAR</span>
                </div>
                <div className="text-xs text-muted-foreground mb-5">~${pack.usd}</div>
                <Button
                  asChild
                  className="w-full font-bold"
                  style={
                    pack.featured
                      ? { backgroundColor: LIME, color: "#000" }
                      : { backgroundColor: `${LIME}1a`, color: LIME, border: `1px solid ${LIME}55` }
                  }
                >
                  <a href={APP_STORE_URL}>شراء الحزمة</a>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Accordions */}
        <section className="px-4 max-w-3xl mx-auto mb-16">
          <Accordion type="multiple" className="space-y-3">
            <AccordionItem
              value="earn"
              className="border border-border rounded-2xl bg-card/40 backdrop-blur px-5"
            >
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-2 font-semibold">
                  <Sparkles className="w-4 h-4" style={{ color: LIME }} />
                  كيف تكسب نقاطاً مجانية؟
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pt-2">
                  {earnMethods.map((m) => (
                    <li
                      key={m.title}
                      className="flex items-center justify-between p-3 rounded-xl bg-background/40 border border-border/50"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-xl">{m.emoji}</span>
                        <span className="text-sm">{m.title}</span>
                      </span>
                      <span className="text-sm font-bold" style={{ color: LIME }}>
                        {m.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="costs"
              className="border border-border rounded-2xl bg-card/40 backdrop-blur px-5"
            >
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-2 font-semibold">
                  <Zap className="w-4 h-4" style={{ color: LIME }} />
                  كم تكلف كل عملية؟
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pt-2">
                  {costs.map((c) => (
                    <li
                      key={c.label}
                      className="flex items-start gap-3 p-3 rounded-xl bg-background/40 border border-border/50"
                    >
                      <span className="text-xl shrink-0">{c.tier}</span>
                      <div className="flex-1">
                        <div className="font-bold text-sm" style={{ color: LIME }}>
                          {c.label}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {c.items}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* App Store Badges */}
        <section className="px-4 max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-2">حمّل التطبيق وابدأ الآن</h3>
          <p className="text-muted-foreground text-sm mb-6">
            متاح على iPhone و Android — مجاناً.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={APP_STORE_URL}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-foreground text-background hover:opacity-90 transition"
              aria-label="Download on the App Store"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden>
                <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.65-2.323-7.34 0-4.31 2.797-6.6 5.552-6.6 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.46z"/>
              </svg>
              <div className="text-start leading-tight">
                <div className="text-[10px] opacity-80">Download on the</div>
                <div className="text-base font-semibold -mt-0.5">App Store</div>
              </div>
            </a>
            <a
              href={PLAY_STORE_URL}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-foreground text-background hover:opacity-90 transition"
              aria-label="Get it on Google Play"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden>
                <path fill="#34A853" d="M3.609 1.814 13.792 12 3.61 22.186a1.5 1.5 0 0 1-.61-1.21V3.024c0-.474.225-.9.61-1.21z"/>
                <path fill="#FBBC04" d="m13.792 12 3.428-3.428 4.39 2.531c.99.57.99 1.225 0 1.795l-4.39 2.53L13.792 12z"/>
                <path fill="#EA4335" d="M17.22 8.572 4.5 1.245A1.5 1.5 0 0 0 3.609 1.814L13.792 12l3.428-3.428z"/>
                <path fill="#4285F4" d="M17.22 15.428 13.792 12 3.61 22.186A1.5 1.5 0 0 0 4.5 22.755l12.72-7.327z"/>
              </svg>
              <div className="text-start leading-tight">
                <div className="text-[10px] opacity-80">GET IT ON</div>
                <div className="text-base font-semibold -mt-0.5">Google Play</div>
              </div>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
