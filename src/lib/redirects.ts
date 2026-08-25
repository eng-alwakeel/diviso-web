/**
 * Centralized redirect configuration
 * Add old routes and their new destinations here
 *
 * The web app is now public-pages only — all former internal (logged-in)
 * screens redirect to /download, which points visitors to the mobile app.
 */
export const REDIRECTS: Record<string, string> = {
  '/privacy-policy': '/privacy',
  '/admin': '/admin-dashboard',

  // Former auth entry points
  '/login': '/download',
  '/signup': '/download',
  '/register': '/download',
  '/join': '/download',

  // Former internal app screens
  '/welcome': '/download',
  '/dashboard': '/download',
  '/onboarding': '/download',
  '/dice': '/download',
  '/plans': '/download',
  '/create-plan': '/download',
  '/plan/:id': '/download',
  '/create-group': '/download',
  '/group/:id': '/download',
  '/group/:id/invite': '/download',
  '/group/:id/settings': '/download',
  '/add-expense': '/download',
  '/my-expenses': '/download',
  '/my-expenses/:type': '/download',
  '/my-groups': '/download',
  '/financial-plan': '/download',
  '/create-unified-budget': '/download',
  '/referral': '/download',
  '/referral-center': '/download',
  '/notifications': '/download',
  '/settings': '/download',
  '/pricing-protected': '/download',
  '/my-tickets': '/download',
  '/credit-store': '/download',
  '/store': '/download',
  '/offerwall': '/download',
  '/ad-test': '/download',
  '/recommendation-test': '/download',
  '/install': '/download',
};
