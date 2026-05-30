import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, HelpCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Support = () => {
  const navigate = useNavigate();
  const { isRTL } = useLanguage();

  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Support"
        description="Get help with Diviso. Contact our support team or browse the FAQ."
        canonical="https://diviso.app/support"
      />
      <Header />
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-black" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Support
          </h1>
          <p className="text-muted-foreground">
            Need help? We are here for you.
          </p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-8">
            {/* FAQ Link */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <HelpCircle className="h-4 w-4 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">FAQ</h2>
              </div>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  Find answers to the most common questions in our FAQ section.
                </p>
                <Link to="/faq">
                  <Button variant="outline" className="gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Go to FAQ
                  </Button>
                </Link>
              </div>
            </section>

            {/* Contact Email */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Contact Us</h2>
              </div>
              <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                <p className="text-muted-foreground">
                  Could not find what you are looking for? Reach out to our support team.
                </p>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a
                    href="mailto:support@diviso.app"
                    className="text-primary hover:underline font-medium"
                  >
                    support@diviso.app
                  </a>
                </div>
              </div>
            </section>
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

export default Support;
