import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";

export const HeroSection = () => {
  const { t, i18n } = useTranslation('landing');
  const { trackClickCTA } = useGoogleAnalytics();
  const isRTL = i18n.language === 'ar';
  const [showScrollArrow, setShowScrollArrow] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollArrow(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
            {isRTL 
              ? 'قسّم المصاريف بينكم بسهولة وبدون إحراج'
              : <>Split expenses easily with <span className="text-primary">Diviso</span> — no awkwardness</>
            }
          </h1>
          
          {/* Use Cases Line */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-6">
            {['travel', 'housing', 'friends', 'family', 'outings', 'coworkers'].map((useCase, index) => (
              <span key={useCase} className="flex items-center">
                <span className="text-base md:text-lg text-white/90 font-medium">
                  {t(`hero.useCases.${useCase}`)}
                </span>
                {index < 5 && (
                  <span className="text-white/50 mx-2 md:mx-3">•</span>
                )}
              </span>
            ))}
          </div>

          {/* Value Description */}
          <p className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed max-w-xl mx-auto">
            {t('hero.valueDesc')}
          </p>

          {/* CTA Button */}
          <div className="mb-8">
            <Button 
              variant="secondary" 
              size="lg" 
              className="text-lg px-8 py-6 h-auto relative overflow-hidden shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)] hover:shadow-[0_0_50px_rgba(var(--primary-rgb),0.6)] hover:scale-105 transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
              onClick={() => {
                trackClickCTA('start_free', 'hero_section');
                window.location.href = '/download';
              }}
            >
              {t('hero.startFree')}
            </Button>
          </div>

        </div>
      </div>

      {/* Scroll Down Arrow */}
      {showScrollArrow && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown 
            className="w-8 h-8 text-white/60 animate-[bounce_2s_ease-in-out_infinite]" 
            style={{ willChange: 'transform' }}
          />
        </div>
      )}
    </section>
  );
};
