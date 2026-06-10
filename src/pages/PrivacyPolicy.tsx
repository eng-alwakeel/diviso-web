import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Mail,
  Database,
  Lock,
  Trash2,
  Eye,
  Megaphone,
  Clock,
  Globe,
  Scale,
  Users,
  CloudCog,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { isRTL } = useLanguage();

  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  const arabicSections = [
    {
      icon: <Database className="h-4 w-4 text-primary" />,
      title: "البيانات التي نجمعها",
      content: (
        <ul className="list-disc pr-4 space-y-1">
          <li>الاسم وعنوان البريد الإلكتروني</li>
          <li>رقم الهاتف (للدعوات وتسجيل الدخول)</li>
          <li>الصورة الشخصية</li>
          <li>بيانات المجموعات والمصاريف والتسويات</li>
          <li>تفاصيل وسائل السحب (IBAN / STC Pay)</li>
          <li>تقييمات الأعضاء</li>
          <li>معرف الإعلانات (IDFA) — لأغراض الإعلانات فقط</li>
          <li>رموز إشعارات الدفع (FCM)</li>
        </ul>
      ),
    },
    {
      icon: <Eye className="h-4 w-4 text-primary" />,
      title: "استخدام البيانات",
      content:
        "لتشغيل التطبيق وتحسين تجربتك وتوفير الخدمات المطلوبة.",
    },
    {
      icon: <Lock className="h-4 w-4 text-primary" />,
      title: "مشاركة البيانات",
      content:
        "لا نبيع بياناتك أبداً. نشارك البيانات فقط مع مقدمي الخدمات الضروريين المذكورين أدناه.",
    },
    {
      icon: <Megaphone className="h-4 w-4 text-primary" />,
      title: "الإعلانات",
      content:
        "نستخدم Google AdMob بمعرفات مجهولة فقط. يمكنك تعطيل الإعلانات المخصصة من الإعدادات.",
    },
    {
      icon: <ExternalLink className="h-4 w-4 text-primary" />,
      title: "خدمات الطرف الثالث",
      content: (
        <ul className="list-disc pr-4 space-y-1">
          <li>Supabase — المصادقة والخادم والقاعدة البيانات</li>
          <li>Google AdMob — الإعلانات</li>
          <li>Firebase Cloud Messaging — إشعارات الدفع</li>
          <li>Google Places — البحث عن المواقع</li>
          <li>Google Gemini — الاقتراحات الذكية</li>
          <li>Apple — المشتريات داخل التطبيق</li>
          <li>Resend — البريد الإلكتروني</li>
          <li>Twilio — دعوات واتساب</li>
          <li>Moyasar — المدفوعات عبر الويب</li>
        </ul>
      ),
    },
    {
      icon: <Clock className="h-4 w-4 text-primary" />,
      title: "الاحتفاظ بالبيانات",
      content:
        "نحتفظ بالبيانات طالما كان الحساب نشطاً. تُحذف البيانات الشخصية خلال 30 يوماً من حذف الحساب، باستثناء السجلات المحاسبية والضريبية المطلوبة قانونياً.",
    },
    {
      icon: <Globe className="h-4 w-4 text-primary" />,
      title: "النقل الدولي للبيانات",
      content:
        "يتم استضافة البيانات على خوادم Supabase في أوروبا. قد تُعالج بعض البيانات (مثل الإعلانات والإشعارات) عبر خوادم دولية. نتخذ الإجراءات اللازمة لضمان الحماية المناسبة.",
    },
    {
      icon: <Users className="h-4 w-4 text-primary" />,
      title: "الأطفال",
      content:
        "التطبيق غير موجه للأشخاص دون 13 سنة. إذا اكتشفنا جمع بيانات لطفل دون 13 سنة، سنحذفها فوراً.",
    },
    {
      icon: <Scale className="h-4 w-4 text-primary" />,
      title: "حقوقك",
      content: (
        <ul className="list-disc pr-4 space-y-1">
          <li>الوصول إلى بياناتك</li>
          <li>تصحيح أو تحديث بياناتك</li>
          <li>حذف حسابك والبيانات المرتبطة به</li>
          <li>تعطيل الإعلانات المخصصة</li>
          <li>الاعتراض على بعض أنواع المعالجة</li>
        </ul>
      ),
    },
    {
      icon: <Shield className="h-4 w-4 text-primary" />,
      title: "الأمان",
      content:
        "تشفير SSL، حماية على مستوى الصفوف (RLS)، ومصادقة متعددة العوامل.",
    },
    {
      icon: <Trash2 className="h-4 w-4 text-primary" />,
      title: "حذف الحساب",
      content:
        "من الإعدادات في أي وقت. بعد الحذف، تُحذف البيانات الشخصية خلال 30 يوماً.",
    },
    {
      icon: <Mail className="h-4 w-4 text-primary" />,
      title: "التواصل",
      content: (
        <>
          {"support@diviso.app — "}
          <a
            href="mailto:support@diviso.app"
            className="text-primary hover:underline"
          >
            اضغط هنا للإرسال
          </a>
        </>
      ),
    },
  ];

  const englishSections = [
    {
      icon: <Database className="h-4 w-4 text-primary" />,
      title: "Data We Collect",
      content: (
        <ul className="list-disc pl-4 space-y-1">
          <li>Name and email address</li>
          <li>Phone number (for invites and login)</li>
          <li>Profile photo</li>
          <li>Group, expense, and settlement data</li>
          <li>Payout method details (IBAN / STC Pay)</li>
          <li>Member ratings</li>
          <li>Advertising identifier (IDFA) — for ads only</li>
          <li>Push notification tokens (FCM)</li>
        </ul>
      ),
    },
    {
      icon: <Eye className="h-4 w-4 text-primary" />,
      title: "How We Use Data",
      content:
        "To operate the app, improve your experience, and deliver the services you request.",
    },
    {
      icon: <Lock className="h-4 w-4 text-primary" />,
      title: "Data Sharing",
      content:
        "We never sell your data. We only share it with the necessary service providers listed below.",
    },
    {
      icon: <Megaphone className="h-4 w-4 text-primary" />,
      title: "Advertising",
      content:
        "We use Google AdMob with anonymized identifiers only. You can disable personalized ads in Settings.",
    },
    {
      icon: <ExternalLink className="h-4 w-4 text-primary" />,
      title: "Third-Party Services",
      content: (
        <ul className="list-disc pl-4 space-y-1">
          <li>Supabase — Authentication, backend, and database</li>
          <li>Google AdMob — Advertising</li>
          <li>Firebase Cloud Messaging — Push notifications</li>
          <li>Google Places — Location search</li>
          <li>Google Gemini — Smart suggestions</li>
          <li>Apple — In-app purchases</li>
          <li>Resend — Email delivery</li>
          <li>Twilio — WhatsApp invites</li>
          <li>Moyasar — Web payments</li>
        </ul>
      ),
    },
    {
      icon: <Clock className="h-4 w-4 text-primary" />,
      title: "Data Retention",
      content:
        "We retain data as long as your account is active. Personal data is deleted within 30 days of account deletion, except for accounting and tax records required by law.",
    },
    {
      icon: <Globe className="h-4 w-4 text-primary" />,
      title: "International Data Transfers",
      content:
        "Data is hosted on Supabase servers in Europe. Some data (e.g., ads, notifications) may be processed internationally. We take appropriate safeguards to protect your data.",
    },
    {
      icon: <Users className="h-4 w-4 text-primary" />,
      title: "Children",
      content:
        "The app is not directed at children under 13. If we discover we have collected data from a child under 13, we will delete it immediately.",
    },
    {
      icon: <Scale className="h-4 w-4 text-primary" />,
      title: "Your Rights",
      content: (
        <ul className="list-disc pl-4 space-y-1">
          <li>Access your data</li>
          <li>Correct or update your data</li>
          <li>Delete your account and associated data</li>
          <li>Opt out of personalized ads</li>
          <li>Object to certain types of processing</li>
        </ul>
      ),
    },
    {
      icon: <Shield className="h-4 w-4 text-primary" />,
      title: "Security",
      content:
        "SSL encryption, row-level security (RLS), and multi-factor authentication.",
    },
    {
      icon: <Trash2 className="h-4 w-4 text-primary" />,
      title: "Account Deletion",
      content:
        "From Settings at any time. After deletion, personal data is removed within 30 days.",
    },
    {
      icon: <Mail className="h-4 w-4 text-primary" />,
      title: "Contact",
      content: (
        <>
          <a
            href="mailto:support@diviso.app"
            className="text-primary hover:underline"
          >
            support@diviso.app
          </a>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Privacy Policy"
        description="Diviso Privacy Policy. Learn how we collect, use, and protect your data."
        canonical="https://diviso.app/privacy"
      />
      <Header />
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-black" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            سياسة الخصوصية
          </p>
          <p className="text-sm text-muted-foreground">
            Last updated: June 2026 | آخر تحديث: يونيو 2026
          </p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-12">
            {/* Arabic Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center border-b border-border pb-4">
                النسخة العربية
              </h2>
              <div className="space-y-4">
                {arabicSections.map((section, index) => (
                  <div
                    key={`ar-${index}`}
                    className="bg-muted/50 p-4 rounded-lg flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                      {section.icon}
                    </div>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold text-foreground">
                        {section.title}
                      </h3>
                      <div className="text-muted-foreground text-sm">
                        {section.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* English Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center border-b border-border pb-4">
                English Version
              </h2>
              <div className="space-y-4">
                {englishSections.map((section, index) => (
                  <div
                    key={`en-${index}`}
                    className="bg-muted/50 p-4 rounded-lg flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                      {section.icon}
                    </div>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold text-foreground">
                        {section.title}
                      </h3>
                      <div className="text-muted-foreground text-sm">
                        {section.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={() => navigate(-1)} className="gap-2" size="lg">
            <BackIcon className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
