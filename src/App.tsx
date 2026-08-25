import React, { lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import { ImprovedErrorBoundary } from "@/components/ImprovedErrorBoundary";
import { PageErrorBoundary } from "@/components/PageErrorBoundary";
import { EnhancedPerformanceMonitor } from "@/components/performance/EnhancedPerformanceMonitor";
import { withLazyLoading } from "@/components/LazyComponents";
import { AdPreferencesProvider } from "@/contexts/AdPreferencesContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useServiceWorkerUpdate } from "@/hooks/useServiceWorkerUpdate";
import { useNativeFeatures } from "@/hooks/useNativeFeatures";
import { useDeepLinks } from "@/hooks/useDeepLinks";
import { useActivityTracker } from "@/hooks/useActivityTracker";
import { RoleAssignmentNotification } from "@/components/RoleAssignmentNotification";
import { REDIRECTS } from "@/lib/redirects";

// Lazy load critical pages for faster initial load
const LazyIndex = withLazyLoading(lazy(() => import("./pages/Index")));
const LazyAuth = withLazyLoading(lazy(() => import("./pages/Auth")));
const LazyOAuthConsent = withLazyLoading(lazy(() => import("./pages/OAuthConsent")));
import EmailVerify from "./pages/EmailVerify";
import { AdminProtectedRoute } from "./components/AdminProtectedRoute";
import InviteRoute from "./pages/InviteRoute";
import PhoneInviteRoute from "./pages/PhoneInviteRoute";
import NotFound from "./pages/NotFound";

// Lazy load heavy components
const LazyPricing = withLazyLoading(lazy(() => import("./pages/Pricing")));
const LazyPricingChart = withLazyLoading(lazy(() => import("./pages/PricingChart")));
const LazyReferralLanding = withLazyLoading(lazy(() => import("./pages/ReferralLanding")));
const LazyPrivacyPolicy = withLazyLoading(lazy(() => import("./pages/PrivacyPolicy")));
const LazySupport = withLazyLoading(lazy(() => import("./pages/Support")));
const LazyRefundPolicy = withLazyLoading(lazy(() => import("./pages/RefundPolicy")));
const LazyDeleteAccount = withLazyLoading(lazy(() => import("./pages/DeleteAccount")));
const LazyTermsConditions = withLazyLoading(lazy(() => import("./pages/TermsConditions")));
const LazyCookiesPolicy = withLazyLoading(lazy(() => import("./pages/CookiesPolicy")));
const LazyFAQ = withLazyLoading(lazy(() => import("./pages/FAQ")));
const LazyHowItWorks = withLazyLoading(lazy(() => import("./pages/HowItWorks")));
const LazyAdminDashboard = withLazyLoading(lazy(() => import("./pages/AdminDashboard")));
const LazyAdminManagement = withLazyLoading(lazy(() => import("./pages/AdminManagement")));
const LazyTVDashboard = withLazyLoading(lazy(() => import("./pages/TVDashboard")));
const LazySupportDashboard = withLazyLoading(lazy(() => import("./pages/SupportDashboard")));
const LazyPaymentCallback = withLazyLoading(lazy(() => import("./pages/PaymentCallback")));
const LazyBlog = withLazyLoading(lazy(() => import("./pages/Blog")));
const LazyBlogPost = withLazyLoading(lazy(() => import("./pages/BlogPost")));
const LazyUseCases = withLazyLoading(lazy(() => import("./pages/UseCases")));
const LazyUseCaseDetails = withLazyLoading(lazy(() => import("./pages/UseCaseDetails")));
const LazyLandingPage = withLazyLoading(lazy(() => import("./pages/LandingPage")));
const LazyLaunchPage = withLazyLoading(lazy(() => import("./pages/LaunchPage")));
const LazyInfluencerPage = withLazyLoading(lazy(() => import("./pages/InfluencerPage")));
const LazyFoundingProgram = withLazyLoading(lazy(() => import("./pages/FoundingProgram")));
const LazyChangelog = withLazyLoading(lazy(() => import("./pages/Changelog")));
const LazySEOLandingPage = withLazyLoading(lazy(() => import("./pages/SEOLandingPageRoute")));
const LazyDownload = withLazyLoading(lazy(() => import("./pages/Download")));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 60 * 1000, // 3 minutes (reduced from 5)
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: true, // Refetch only when data is stale (respects staleTime)
      refetchOnReconnect: true, // Changed: refetch when reconnecting
      networkMode: 'offlineFirst',
    },
    mutations: {
      retry: 1,
    },
  },
});

// /join/:referralCode used to render a web signup form — now lands on the
// referral download page, preserving the code.
const JoinReferralRedirect: React.FC = () => {
  const { referralCode } = useParams<{ referralCode: string }>();
  return <Navigate to={`/j/${referralCode ?? ""}`} replace />;
};

// Inner component that uses router hooks
const AppRoutes: React.FC = () => {
  // Initialize native features (status bar, back button, etc.)
  useNativeFeatures();
  
  // Handle deep links
  useDeepLinks();
  
  // Track user activity for founding users monthly credits
  useActivityTracker();

  // Track page views for SPA navigation (GTM/GA4)
  const location = useLocation();
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: location.pathname,
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }, [location.pathname]);

  return (
    <>
      <EnhancedPerformanceMonitor />
      <Toaster />
      <Sonner />
      <RoleAssignmentNotification />
      <ImprovedErrorBoundary>
        <Routes>
            {/* /auth stays only as the admin sign-in door + Supabase email links */}
            <Route path="/auth" element={<LazyAuth />} />
            <Route path="/.lovable/oauth/consent" element={<LazyOAuthConsent />} />
            <Route path="/auth/verify" element={<EmailVerify />} />
            <Route path="/" element={<LazyIndex />} />
            <Route path="/download" element={<LazyDownload />} />
            <Route path="/i/:code" element={<InviteRoute />} />
            <Route path="/invite-phone/:token" element={<PhoneInviteRoute />} />
            <Route path="/join/:referralCode" element={<JoinReferralRedirect />} />
            <Route path="/j/:referralCode" element={<LazyReferralLanding />} />
            <Route path="/privacy" element={<LazyPrivacyPolicy />} />
            <Route path="/support" element={<LazySupport />} />
            <Route path="/refund-policy" element={<LazyRefundPolicy />} />
            <Route path="/delete-account" element={<LazyDeleteAccount />} />
            <Route path="/terms" element={<LazyTermsConditions />} />
            <Route path="/cookies" element={<LazyCookiesPolicy />} />
            <Route path="/faq" element={<LazyFAQ />} />
            <Route path="/how-it-works" element={<LazyHowItWorks />} />
            <Route path="/blog" element={<LazyBlog />} />
            <Route path="/blog/:slug" element={<LazyBlogPost />} />
            <Route path="/use-cases" element={<LazyUseCases />} />
            <Route path="/use-cases/:slug" element={<LazyUseCaseDetails />} />
            {/* Landing Pages for Ad Campaigns - Zero Distraction */}
            <Route path="/lp/:slug" element={<LazyLandingPage />} />
            <Route path="/launch" element={<LazyLaunchPage />} />
            <Route path="/from" element={<LazyInfluencerPage />} />
            <Route path="/founding" element={<LazyFoundingProgram />} />
            <Route path="/changelog" element={<LazyChangelog />} />
            {/* SEO Landing Pages — English-first, indexable */}
            <Route path="/split-expenses" element={<LazySEOLandingPage />} />
            <Route path="/split-bills" element={<LazySEOLandingPage />} />
            <Route path="/travel-expense-splitter" element={<LazySEOLandingPage />} />
            <Route path="/roommate-expense-tracker" element={<LazySEOLandingPage />} />
            <Route path="/group-expense-tracker" element={<LazySEOLandingPage />} />
            <Route path="/split-dinner-bill" element={<LazySEOLandingPage />} />
            <Route path="/splitwise-alternative" element={<LazySEOLandingPage />} />
            {/* Bilingual SEO Landing Pages */}
            <Route path="/en/*" element={<LazySEOLandingPage />} />
            <Route path="/ar/*" element={<LazySEOLandingPage />} />
            <Route path="/admin-dashboard" element={<AdminProtectedRoute><LazyAdminDashboard /></AdminProtectedRoute>} />
            <Route path="/admin-management" element={<AdminProtectedRoute><LazyAdminManagement /></AdminProtectedRoute>} />
            <Route path="/admin-tv" element={<AdminProtectedRoute><LazyTVDashboard /></AdminProtectedRoute>} />
            <Route path="/admin/support" element={<AdminProtectedRoute><LazySupportDashboard /></AdminProtectedRoute>} />
            <Route path="/payment-callback" element={<PageErrorBoundary><LazyPaymentCallback /></PageErrorBoundary>} />
            <Route path="/pricing" element={<LazyPricing />} />
            <Route path="/pricing-chart" element={<LazyPricingChart />} />
            
            {/* Centralized redirects from lib/redirects.ts */}
            {Object.entries(REDIRECTS).map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            
            <Route path="*" element={<NotFound />} />
        </Routes>
      </ImprovedErrorBoundary>
    </>
  );
};

const App: React.FC = () => {
  // Monitor service worker for updates (doesn't need router)
  useServiceWorkerUpdate();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AdPreferencesProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AdPreferencesProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
