import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { campaignToken } from '@/lib/appStoreLinks';
import { BRAND_CONFIG } from '@/lib/brandConfig';

interface LandingCTAProps {
  ctaText: string;
  subtext: string;
  isRTL: boolean;
}

const LandingCTA: React.FC<LandingCTAProps> = ({ ctaText, subtext, isRTL }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // Smart link (MSG-145): the page picks the store per device; ct keeps this page's name.
  const downloadPath = `/download?ct=${campaignToken(`web_${pathname.replace(/^\//, '')}`)}`;

  const handleCTA = () => {
    navigate(downloadPath);
  };

  return (
    <section 
      className="py-20 px-6 bg-gradient-to-t from-primary/10 via-primary/5 to-background"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-6">
          <img 
            src={BRAND_CONFIG.logo} 
            alt="Diviso Logo" 
            className="h-10 w-auto mx-auto" 
          />
        </div>

        {/* Motivational Text */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          {isRTL ? 'جرّب Diviso الآن' : 'Try Diviso Now'}
        </h2>

        {/* CTA Button */}
        <Button 
          onClick={handleCTA}
          size="lg"
          className="text-xl px-12 py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 mb-4"
        >
          {ctaText}
        </Button>

        {/* Subtext */}
        <p className="text-muted-foreground text-sm">
          {subtext}
        </p>
      </div>
    </section>
  );
};

export default LandingCTA;
