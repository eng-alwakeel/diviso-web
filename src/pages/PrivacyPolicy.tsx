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
  Phone,
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
      title: "جمع البيانات",
      content:
        "نجمع الاسم والبريد الإلكتروني عند إنشاء الحساب.",
    },
    {
      icon: <Eye className="h-4 w-4 text-primary" />,
      title: "استخدام البيانات",
      content:
        "لتشغيل التطبيق وتحسين تجربتك.",
    },
    {
      icon: <Lock className="h-4 w-4 text-primary" />,
      title: "مشاركة البيانات",
      content:
        "لا نبيع بياناتك أبداً.",
    },
    {
      icon: <Megaphone className="h-4 w-4 text-primary" />,
      title: "الإعلانات",
      content:
        "نستخدم Google AdMob بمعرفات مجهولة فقط.",
    },
    {
      icon: <Shield className="h-4 w-4 text-primary" />,
      title: "الأمان",
      content:
        "تشفير SSL وحماية على مستوى الصف.",
    },
    {
      icon: <Trash2 className="h-4 w-4 text-primary" />,
      title: "حذف الحساب",
      content:
        "من الإعدادات في أي وقت.",
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
      title: "Data Collection",
      content:
        "Name and email when creating an account.",
    },
    {
      icon: <Eye className="h-4 w-4 text-primary" />,
      title: "Data Usage",
      content:
        "To operate the app and improve your experience.",
    },
    {
      icon: <Lock className="h-4 w-4 text-primary" />,
      title: "Data Sharing",
      content:
        "We never sell your personal data.",
    },
    {
      icon: <Megaphone className="h-4 w-4 text-primary" />,
      title: "Advertising",
      content:
        "Google AdMob with anonymized identifiers only.",
    },
    {
      icon: <Shield className="h-4 w-4 text-primary" />,
      title: "Security",
      content:
        "SSL encryption and row-level security.",
    },
    {
      icon: <Trash2 className="h-4 w-4 text-primary" />,
      title: "Account Deletion",
      content:
        "From Settings at any time.",
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
            Last updated: May 2026 | آخر تحديث: مايو 2026
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
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground">
                        {section.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {section.content}
                      </p>
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
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground">
                        {section.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {section.content}
                      </p>
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
