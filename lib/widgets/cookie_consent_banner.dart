import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../core/providers/app_state.dart';
import '../core/services/analytics_service.dart';
import '../theme/app_tokens.dart';
import 'website_links.dart';

/// GDPR-compliant consent before PostHog analytics starts tracking.
class CookieConsentBanner extends ConsumerStatefulWidget {
  const CookieConsentBanner({super.key, required this.child});

  final Widget child;

  @override
  ConsumerState<CookieConsentBanner> createState() =>
      _CookieConsentBannerState();
}

class _CookieConsentBannerState extends ConsumerState<CookieConsentBanner> {
  bool _visible = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _checkConsent());
  }

  Future<void> _checkConsent() async {
    final prefs = ref.read(sharedPreferencesProvider);
    await AnalyticsService.instance.bootstrap(prefs);
    if (!mounted) return;
    // Native apps use App Store privacy disclosures; banner blocks onboarding CTAs.
    if (!kIsWeb) {
      setState(() => _visible = false);
      return;
    }
    setState(() {
      _visible = !AnalyticsService.instance.hasConsent;
    });
  }

  Future<void> _accept() async {
    final prefs = ref.read(sharedPreferencesProvider);
    await AnalyticsService.instance.grantConsent(prefs);
    if (mounted) setState(() => _visible = false);
  }

  Future<void> _decline() async {
    final prefs = ref.read(sharedPreferencesProvider);
    await AnalyticsService.instance.revokeConsent(prefs);
    if (mounted) setState(() => _visible = false);
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        widget.child,
        if (_visible)
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: Material(
              elevation: 12,
              color: Theme.of(context).colorScheme.surface,
              child: SafeArea(
                top: false,
                child: Padding(
                  padding: const EdgeInsets.all(AppSpacing.lg),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Text(
                        'Analytics & cookies',
                        style: Theme.of(context).textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.w700,
                            ),
                      ),
                      const SizedBox(height: AppSpacing.sm),
                      const Text(
                        'We use analytics cookies to understand how students use the app '
                        'and improve the learning experience. You can accept or decline tracking.',
                      ),
                      const SizedBox(height: AppSpacing.sm),
                      const WebsiteLinksSection(
                        compact: true,
                        showHeading: false,
                      ),
                      const SizedBox(height: AppSpacing.md),
                      Row(
                        children: [
                          Expanded(
                            child: OutlinedButton(
                              onPressed: _decline,
                              child: const Text('Decline'),
                            ),
                          ),
                          const SizedBox(width: AppSpacing.sm),
                          Expanded(
                            child: FilledButton(
                              onPressed: _accept,
                              child: const Text('Accept'),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
      ],
    );
  }
}
