/// Official Indraprastha NEET Academy web properties.
class WebsiteConstants {
  WebsiteConstants._();

  static const String siteName = 'Indraprastha NEET Academy';
  static const String productionDomain = 'https://www.indraprasthaneetacademy.com';

  static const String homepage = productionDomain;
  static const String rankPredictor = '$productionDomain/rank-predictor-reneet-2026';
  static const String privacyPolicy = '$productionDomain/privacy-policy';
  static const String cookiesPolicy = '$productionDomain/cookies-policy';

  /// Used for Open Graph / social preview image (host at this path on production).
  static const String ogImageUrl = '$productionDomain/og-image.png';

  static const String appWebUrl = 'https://app.indraprasthaneetacademy.com';

  static const List<WebsiteLink> links = [
    WebsiteLink(
      label: 'Official website',
      url: homepage,
      iconName: 'language',
    ),
    WebsiteLink(
      label: 'NEET 2026 rank predictor',
      url: rankPredictor,
      iconName: 'trending_up',
    ),
    WebsiteLink(
      label: 'Privacy policy',
      url: privacyPolicy,
      iconName: 'privacy_tip',
    ),
    WebsiteLink(
      label: 'Cookies policy',
      url: cookiesPolicy,
      iconName: 'cookie',
    ),
  ];
}

class WebsiteLink {
  const WebsiteLink({
    required this.label,
    required this.url,
    required this.iconName,
  });

  final String label;
  final String url;
  final String iconName;
}
