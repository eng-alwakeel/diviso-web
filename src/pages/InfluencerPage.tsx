import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BRAND_CONFIG } from '@/lib/brandConfig';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import { SEO } from '@/components/SEO';

const InfluencerPage: React.FC = () => {
  const navigate = useNavigate();
  const { trackWithUTM } = useGoogleAnalytics();

  // Track page view on mount
  useEffect(() => {
    trackWithUTM('influencer_page_view', {
      page_path: '/from'
    });
  }, [trackWithUTM]);

  // CTA Handler
  const handleCTA = async () => {
    trackWithUTM('influencer_cta_click');
    
    navigate('/download');
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background"
      dir="rtl"
    >
      <SEO 
        title="استخدمت تطبيق بسيط للقسمة بين الأصدقاء"
        description="خصوصًا في الشعبنة، ريحنا من اللخبطة. اللي حاب يجرّبه 👇"
        ogImage="https://diviso.app/og-image.png"
        noIndex={false}
      />

      {/* Logo */}
      <img 
        src={BRAND_CONFIG.logo} 
        alt="Diviso" 
        className="h-12 w-auto mb-8" 
      />

      {/* H1 Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-6 leading-tight">
        أنا استخدمت هذا التطبيق<br />
        وريحني من لخبطة القسمة
      </h1>

      {/* Description */}
      <p className="text-lg text-muted-foreground text-center max-w-md mb-8 leading-relaxed">
        في الطلعات والسفر دايم القسمة تلخبط<br />
        خصوصًا وقت الشعبنة<br />
        هذا التطبيق خلّى كل شي واضح بدون إحراج
      </p>

      {/* Primary CTA */}
      <Button 
        onClick={handleCTA}
        size="lg"
        className="text-xl px-12 py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
      >
        جرّبه الحين
      </Button>

      {/* Trust Line */}
      <p className="text-sm text-muted-foreground text-center mt-4">
        دقيقة وتبدأ تستخدمه مع مجموعتك
      </p>
    </div>
  );
};

export default InfluencerPage;
