# Launch Guide Implementation

Based on the [App Launch Guide](https://docs.google.com/document/d/198gQ1xegmf88Tf6-rf4ncI91JXadmv-E/mobilebasic).

## Block 1 — Open Graph (Flutter Web)

**Done in:** `web/index.html`

- Title, description, `og:*` and `twitter:*` tags
- OG image URL: `https://www.indraprasthaneetacademy.com/og-image.png` (upload a **1200×630** PNG to your marketing site)

**Test previews:**

- [opengraph.xyz](https://www.opengraph.xyz/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

Social platforms cache aggressively — use the debugger to force a re-scrape after updating the image.

## Block 2 — Subdomain hosting

Recommended layout:

| URL | Project |
|-----|---------|
| `www.indraprasthaneetacademy.com` | Marketing site (landing, rank predictor, legal pages) |
| `app.indraprasthaneetacademy.com` | Flutter web build (`flutter build web`) |
| `api.indraprasthaneetacademy.com` | Node backend (already configured in `api_constants.dart`) |

**DNS (example):**

- `CNAME www` → Vercel/Netlify hosting for marketing site
- `CNAME app` → Flutter web / Firebase Hosting / Vercel
- `CNAME api` → Your API server

**Vercel:** Add `app.indraprasthaneetacademy.com` as a custom domain on the app project.

**Cookies/auth:** JWT is stored in secure storage on mobile; web uses separate origin — do not expect shared cookies between `www` and `app` unless you implement cross-domain SSO.

## Block 3 — Onboarding checklist

**Done in:** `lib/features/onboarding/onboarding_checklist_widget.dart`

Five steps on the home dashboard after login:

1. Open first chapter (Books)
2. Attempt first practice set
3. Take first mock test
4. Review analytics
5. Save a chapter for revision

Progress syncs to PostgreSQL via `GET/PATCH /api/auth/onboarding-checklist`.

## Block 4 — PostHog analytics

**Done in:** `lib/core/services/analytics_service.dart`, `lib/widgets/cookie_consent_banner.dart`

Build with your PostHog project key:

```bash
flutter run --dart-define=POSTHOG_API_KEY=phc_your_key --dart-define=POSTHOG_HOST=https://us.i.posthog.com
```

**Funnel events:** `signed_up`, `logged_in`, `onboarding_step_completed`

**PostHog dashboard:** Insights → New funnel → add the events above.

Cookie consent is shown before tracking starts (required for GDPR).

## Block 5 — sitemap.xml + robots.txt

**Done in:** `web/sitemap.xml`, `web/robots.txt`

Submit `https://app.indraprasthaneetacademy.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

Also submit your marketing site sitemap separately if it has more public pages.

## Website links in the app

Official URLs are in `lib/core/constants/website_constants.dart` and appear in:

- About us (`/info/about`)
- Terms (`/info/terms`)
- Share the app
- Profile settings
- App drawer
- Cookie consent banner

## Delete student account

**Profile → Account actions → Delete student account**

Backend deletes the PostgreSQL user (cascade) and attempts Firebase user deletion when `firebase_uid` is set.

## Apple Sign In (iOS)

See [APPLE_SIGN_IN_SETUP.md](./APPLE_SIGN_IN_SETUP.md).
