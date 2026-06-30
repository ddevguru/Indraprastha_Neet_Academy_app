import 'package:posthog_flutter/posthog_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Product analytics via PostHog. Tracking starts only after user consent.
class AnalyticsService {
  AnalyticsService._();

  static final AnalyticsService instance = AnalyticsService._();

  static const _consentKey = 'analytics_consent_granted';
  static const _apiKey = String.fromEnvironment(
    'POSTHOG_API_KEY',
    defaultValue: '',
  );
  static const _host = String.fromEnvironment(
    'POSTHOG_HOST',
    defaultValue: 'https://us.i.posthog.com',
  );

  bool _initialized = false;
  bool _consentGranted = false;

  bool get hasConsent => _consentGranted;
  bool get isConfigured => _apiKey.isNotEmpty;

  Future<void> bootstrap(SharedPreferences prefs) async {
    _consentGranted = prefs.getBool(_consentKey) ?? false;
    if (_consentGranted && isConfigured) {
      await _initPostHog();
    }
  }

  Future<void> grantConsent(SharedPreferences prefs) async {
    await prefs.setBool(_consentKey, true);
    _consentGranted = true;
    if (isConfigured) {
      await _initPostHog();
    }
  }

  Future<void> revokeConsent(SharedPreferences prefs) async {
    await prefs.setBool(_consentKey, false);
    _consentGranted = false;
    if (_initialized) {
      await Posthog().reset();
    }
  }

  Future<void> _initPostHog() async {
    if (_initialized || !isConfigured) return;
    final config = PostHogConfig(_apiKey);
    config.host = _host;
    config.captureApplicationLifecycleEvents = true;
    await Posthog().setup(config);
    _initialized = true;
  }

  void identify(String userId, {Map<String, Object>? properties}) {
    if (!_consentGranted || !_initialized) return;
    Posthog().identify(userId: userId, userProperties: properties);
  }

  void capture(String event, {Map<String, Object>? properties}) {
    if (!_consentGranted || !_initialized) return;
    Posthog().capture(eventName: event, properties: properties);
  }

  void trackSignedUp({String? method}) {
    capture('signed_up', properties: {if (method != null) 'method': method});
  }

  void trackOnboardingStep(String stepKey) {
    capture('onboarding_step_completed', properties: {'step': stepKey});
  }

  void trackFunnelEvent(String event) {
    capture(event);
  }
}
