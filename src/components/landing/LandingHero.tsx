import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { campaignToken } from '@/lib/appStoreLinks';
import { BRAND_CONFIG } from '@/lib/brandConfig';

interface LandingHeroProps {
  title: string;
  ctaText: string;
  isRTL: boolean;
}

const LandingHero: React.FC<LandingHeroProps> = ({ title, ctaText, isRTL }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // Smart link (MSG-145): the page picks the store per device; ct keeps this page's name.
  const downloadPath = `/download?ct=${campaignToken(`web_${pathname.replace(/^\//, '')}`)}`;

  const handleCTA = () => {
    navigate(downloadPath);
  };

  return (
    <section className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Logo */}
      <div className="mb-6">
        <img 
          src={BRAND_CONFIG.logo} 
          alt="Diviso Logo" 
          className="h-12 w-auto" 
        />
      </div>

      {/* Hero Title */}
      <h1 
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-foreground max-w-3xl leading-tight mb-6"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {title}
      </h1>

      {/* CTA Button */}
      <Button 
        onClick={handleCTA}
        size="lg"
        className="text-lg px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 mb-4"
      >
        {ctaText}
      </Button>

      {/* Social Proof */}
      <p className="text-sm text-muted-foreground flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        {isRTL ? '+10,000 مستخدم يثقون في Diviso' : '+10,000 users trust Diviso'}
      </p>
    </section>
  );
};

export default LandingHero;
