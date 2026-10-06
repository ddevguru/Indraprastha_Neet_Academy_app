import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../core/constants/website_constants.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import '../../widgets/website_links.dart';

const String kContactPhoneNumber = '+917703033682';
const String kContactPhoneDisplay = '+91 77030 33682';
const String kContactEmail = 'support@indraprasthaneetacademy.com';
const String kPiracyEmail = 'piracy@indraprasthaneetacademy.com';

/// Premium, interactive info screens for drawer links (`/info/:slug`).
class InfoDetailScreen extends StatelessWidget {
  const InfoDetailScreen({super.key, required this.slug});

  final String slug;

  @override
  Widget build(BuildContext context) {
    Widget content;
    String appBarTitle;

    switch (slug) {
      case 'contact':
        appBarTitle = 'Contact Us';
        content = const _ContactUsView();
        break;
      case 'report-piracy':
        appBarTitle = 'Report Video Piracy';
        content = const _ReportPiracyView();
        break;
      case 'share':
        appBarTitle = 'Share The App';
        content = const _ShareAppView();
        break;
      case 'terms':
        appBarTitle = 'Terms & Conditions';
        content = const _TermsAndConditionsView();
        break;
      case 'rate-us':
        appBarTitle = 'Rate Us';
        content = const _RateUsView();
        break;
      case 'about':
        appBarTitle = 'About Us';
        content = const _AboutUsView();
        break;
      case 'faq':
        appBarTitle = 'FAQs & Help';
        content = const _FaqView();
        break;
      case 'learn-more':
        appBarTitle = 'Learn More';
        content = const _LearnMoreView();
        break;
      default:
        appBarTitle = 'Info';
        content = const _DefaultInfoView();
        break;
    }

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          appBarTitle,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: Theme.of(context).colorScheme.onSurface,
          ),
        ),
        elevation: 0,
        backgroundColor: Colors.transparent,
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.sm,
        ),
        child: CenteredContent(
          maxWidth: 840,
          child: content,
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. CONTACT US VIEW
// ─────────────────────────────────────────────────────────────────────────────
class _ContactUsView extends StatelessWidget {
  const _ContactUsView();

  Future<void> _makeCall() async {
    final uri = Uri.parse('tel:$kContactPhoneNumber');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }

  Future<void> _openWhatsApp() async {
    final uri = Uri.parse(
        'https://wa.me/917703033682?text=Hello%20Indraprastha%20NEET%20Academy%20Team,%20I%20have%20a%20query:');
    await launchUrl(uri, mode: LaunchMode.externalApplication);
  }

  Future<void> _sendEmail() async {
    final uri = Uri(
      scheme: 'mailto',
      path: kContactEmail,
      queryParameters: {
        'subject': 'Support Inquiry - Indraprastha App',
      },
    );
    await launchUrl(uri);
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textMuted = isDark ? const Color(0xFF9CA3AF) : AppColors.textSecondary;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // Hero Card
        _HeaderHeroCard(
          icon: Icons.headset_mic_rounded,
          title: 'We are Here to Help!',
          subtitle:
              'Connect with Indraprastha NEET Academy for academic support, queries, or assistance.',
          gradientColors: isDark
              ? const [Color(0xFFC74007), Color(0xFF802200)]
              : const [Color(0xFFE85A1C), Color(0xFFD14A12)],
        ),
        const SizedBox(height: AppSpacing.lg),

        // Highlighted Direct Contact Phone Card
        Container(
          padding: const EdgeInsets.all(AppSpacing.lg),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: isDark
                  ? [const Color(0xFF232836), const Color(0xFF161922)]
                  : [const Color(0xFFFFF3EB), const Color(0xFFFFE5D4)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(AppRadii.lg),
            border: Border.all(
              color: isDark
                  ? AppColors.primary.withValues(alpha: 0.6)
                  : AppColors.primary.withValues(alpha: 0.3),
              width: 1.5,
            ),
            boxShadow: isDark
                ? [
                    BoxShadow(
                      color: AppColors.primary.withValues(alpha: 0.15),
                      blurRadius: 20,
                      spreadRadius: 2,
                    )
                  ]
                : AppShadows.soft,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: isDark ? 0.25 : 0.15),
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(Icons.phone_in_talk_rounded,
                        color: AppColors.primary, size: 28),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Direct Phone & WhatsApp',
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w600,
                            color: textMuted,
                          ),
                        ),
                        Text(
                          kContactPhoneDisplay,
                          style: TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.w900,
                            color: Theme.of(context).colorScheme.onSurface,
                            letterSpacing: 0.5,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppSpacing.md),
              Wrap(
                spacing: AppSpacing.sm,
                runSpacing: AppSpacing.sm,
                children: [
                  ElevatedButton.icon(
                    onPressed: _makeCall,
                    icon: const Icon(Icons.call_rounded, size: 18),
                    label: const Text('Call Now'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(
                          horizontal: AppSpacing.md, vertical: AppSpacing.sm),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(AppRadii.md),
                      ),
                    ),
                  ),
                  OutlinedButton.icon(
                    onPressed: _openWhatsApp,
                    icon: const Icon(Icons.chat_bubble_outline_rounded,
                        size: 18, color: Color(0xFF25D366)),
                    label: const Text('WhatsApp Chat'),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: const Color(0xFF25D366),
                      side: const BorderSide(color: Color(0xFF25D366), width: 1.5),
                      backgroundColor: isDark ? const Color(0x1F25D366) : null,
                      padding: const EdgeInsets.symmetric(
                          horizontal: AppSpacing.md, vertical: AppSpacing.sm),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(AppRadii.md),
                      ),
                    ),
                  ),
                  IconButton(
                    tooltip: 'Copy Number',
                    icon: Icon(Icons.copy_rounded, color: textMuted),
                    onPressed: () async {
                      await Clipboard.setData(
                          const ClipboardData(text: kContactPhoneNumber));
                      if (!context.mounted) return;
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                            content: Text('Contact number copied to clipboard!')),
                      );
                    },
                  ),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: AppSpacing.lg),

        // Grid of Other Contact Options
        LayoutBuilder(
          builder: (context, constraints) {
            final isWide = constraints.maxWidth > 550;
            return Wrap(
              spacing: AppSpacing.md,
              runSpacing: AppSpacing.md,
              children: [
                SizedBox(
                  width: isWide ? (constraints.maxWidth - AppSpacing.md) / 2 : double.infinity,
                  child: _ContactCardTile(
                    icon: Icons.email_rounded,
                    title: 'Email Support',
                    subtitle: kContactEmail,
                    actionLabel: 'Send Mail',
                    onTap: _sendEmail,
                  ),
                ),
                SizedBox(
                  width: isWide ? (constraints.maxWidth - AppSpacing.md) / 2 : double.infinity,
                  child: _ContactCardTile(
                    icon: Icons.groups_rounded,
                    title: 'Telegram Mentorship',
                    subtitle: 'Join official student discussion channel',
                    actionLabel: 'Join Group',
                    onTap: () async {
                      final uri = Uri.parse('https://t.me/+uhvoD-tFdkA5Zjc1');
                      await launchUrl(uri, mode: LaunchMode.externalApplication);
                    },
                  ),
                ),
              ],
            );
          },
        ),
        const SizedBox(height: AppSpacing.lg),

        // Working Hours Card
        SurfaceCard(
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: isDark
                      ? Colors.blue.withValues(alpha: 0.2)
                      : Colors.blue.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(AppRadii.md),
                ),
                child: const Icon(Icons.access_time_filled_rounded,
                    color: Colors.blue, size: 24),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Support Timings',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
                        color: Theme.of(context).colorScheme.onSurface,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      'Monday to Saturday: 10:00 AM – 7:00 PM IST',
                      style: TextStyle(fontSize: 13, color: textMuted),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: AppSpacing.xl),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. REPORT VIDEO PIRACY VIEW
// ─────────────────────────────────────────────────────────────────────────────
class _ReportPiracyView extends StatelessWidget {
  const _ReportPiracyView();

  Future<void> _reportViaWhatsApp() async {
    final uri = Uri.parse(
      'https://wa.me/917703033682?text=Hi%20Indraprastha%20Team,%20I%20want%20to%20report%20video/content%20piracy:%0A- Link/Details: ',
    );
    await launchUrl(uri, mode: LaunchMode.externalApplication);
  }

  Future<void> _reportViaEmail() async {
    final uri = Uri(
      scheme: 'mailto',
      path: kPiracyEmail,
      queryParameters: {
        'subject': 'PIRACY REPORT - Indraprastha Content Violation',
        'body':
            'Hi Indraprastha Security Team,\n\nI want to report illegal distribution of academy content:\n\n1. Link / Channel / Group URL:\n2. Uploader Details:\n3. Proof / Screenshot:\n\nMy Contact Number:\n',
      },
    );
    await launchUrl(uri);
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textMuted = isDark ? const Color(0xFF9CA3AF) : AppColors.textSecondary;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _HeaderHeroCard(
          icon: Icons.shield_rounded,
          title: 'Report Video & Content Piracy',
          subtitle:
              'Zero tolerance against unauthorized sharing or selling of Indraprastha videos, test papers & PDFs.',
          gradientColors: isDark
              ? const [Color(0xFF9E1B11), Color(0xFF68100A)]
              : const [Color(0xFFD92D20), Color(0xFF9E1B11)],
        ),
        const SizedBox(height: AppSpacing.lg),

        // Quick Action Card
        SurfaceCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Icon(Icons.warning_amber_rounded, color: AppColors.danger, size: 24),
                  const SizedBox(width: 8),
                  Text(
                    'Instant Report Channel',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppSpacing.sm),
              Text(
                'Help us maintain quality education by reporting unauthorized Telegram channels, Google Drive links, YouTube re-uploads, or website leaks.',
                style: TextStyle(fontSize: 13, color: textMuted, height: 1.4),
              ),
              const SizedBox(height: AppSpacing.md),
              Wrap(
                spacing: AppSpacing.sm,
                runSpacing: AppSpacing.sm,
                children: [
                  FilledButton.icon(
                    onPressed: _reportViaWhatsApp,
                    icon: const Icon(Icons.chat_bubble_outline_rounded, size: 18),
                    label: const Text('Report on WhatsApp (+91 77030 33682)'),
                    style: FilledButton.styleFrom(
                      backgroundColor: const Color(0xFF25D366),
                      foregroundColor: Colors.white,
                    ),
                  ),
                  OutlinedButton.icon(
                    onPressed: _reportViaEmail,
                    icon: const Icon(Icons.email_outlined, size: 18),
                    label: const Text('Report via Email'),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: AppSpacing.lg),

        // What to include checklist
        SurfaceCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'What to Include in Your Report',
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.bold,
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              const SizedBox(height: AppSpacing.md),
              const _ChecklistPoint(
                number: '1',
                title: 'Piracy Source Link',
                description: 'Telegram group invite link, YouTube URL, or website link.',
              ),
              const _ChecklistPoint(
                number: '2',
                title: 'Screenshot or Proof',
                description: 'Screenshot showing the leaked video/PDF content.',
              ),
              const _ChecklistPoint(
                number: '3',
                title: 'Uploader Info',
                description: 'Username or phone number of the seller/uploader if available.',
              ),
            ],
          ),
        ),
        const SizedBox(height: AppSpacing.lg),

        // Legal Notice Banner
        Container(
          padding: const EdgeInsets.all(AppSpacing.md),
          decoration: BoxDecoration(
            color: AppColors.danger.withValues(alpha: isDark ? 0.18 : 0.08),
            borderRadius: BorderRadius.circular(AppRadii.md),
            border: Border.all(color: AppColors.danger.withValues(alpha: isDark ? 0.4 : 0.2)),
          ),
          child: const Row(
            children: [
              Icon(Icons.gavel_rounded, color: AppColors.danger, size: 22),
              SizedBox(width: AppSpacing.md),
              Expanded(
                child: Text(
                  'Legal Warning: Strict legal prosecution under Copyright Act 1957 will be taken against offenders.',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: AppColors.danger,
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: AppSpacing.xl),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. SHARE APP VIEW
// ─────────────────────────────────────────────────────────────────────────────
class _ShareAppView extends StatelessWidget {
  const _ShareAppView();

  Future<void> _shareApp(BuildContext context) async {
    const text =
        'Crack NEET with Indraprastha NEET Academy!\n\n'
        '✨ NCERT Line-by-Line MCQs\n'
        '🎯 Chapter-wise PYQs & Tests\n'
        '⚡ Instant AI Score Analytics\n\n'
        'Download/Visit app here:\n'
        '${WebsiteConstants.homepage}';

    try {
      // ignore: deprecated_member_use
      await Share.share(text, subject: 'Join Indraprastha NEET Academy');
    } catch (_) {
      await Clipboard.setData(const ClipboardData(text: text));
      if (!context.mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('App share text copied to clipboard!')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textMuted = isDark ? const Color(0xFF9CA3AF) : AppColors.textSecondary;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _HeaderHeroCard(
          icon: Icons.share_rounded,
          title: 'Share Indraprastha Academy',
          subtitle:
              'Help your fellow NEET aspirants discover disciplined preparation & NCERT line-by-line MCQs!',
          gradientColors: isDark
              ? const [Color(0xFF3730A3), Color(0xFF1E1B4B)]
              : const [Color(0xFF4F46E5), Color(0xFF3730A3)],
        ),
        const SizedBox(height: AppSpacing.lg),

        SurfaceCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Spread the Word',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              const SizedBox(height: AppSpacing.xs),
              Text(
                'Empower your friends with top quality question banks and test analytics.',
                style: TextStyle(fontSize: 13, color: textMuted),
              ),
              const SizedBox(height: AppSpacing.lg),
              Container(
                padding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.md, vertical: AppSpacing.sm),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF1E2230) : Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
                  borderRadius: BorderRadius.circular(AppRadii.md),
                  border: Border.all(
                      color: isDark ? const Color(0xFF313744) : Theme.of(context).colorScheme.outline.withValues(alpha: 0.2)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.link_rounded, color: AppColors.primary, size: 20),
                    const SizedBox(width: AppSpacing.sm),
                    Expanded(
                      child: Text(
                        WebsiteConstants.homepage,
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                          color: Theme.of(context).colorScheme.onSurface,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    IconButton(
                      icon: Icon(Icons.copy_rounded, size: 18, color: textMuted),
                      tooltip: 'Copy Link',
                      onPressed: () async {
                        await Clipboard.setData(
                            const ClipboardData(text: WebsiteConstants.homepage));
                        if (!context.mounted) return;
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Website link copied!')),
                        );
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.lg),
              SizedBox(
                width: double.infinity,
                child: PrimaryButton(
                  label: 'Share App Now',
                  onPressed: () => _shareApp(context),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: AppSpacing.lg),

        const WebsiteLinksSection(),
        const SizedBox(height: AppSpacing.xl),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. TERMS & CONDITIONS VIEW
// ─────────────────────────────────────────────────────────────────────────────
class _TermsAndConditionsView extends StatelessWidget {
  const _TermsAndConditionsView();

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _HeaderHeroCard(
          icon: Icons.article_rounded,
          title: 'Terms & Conditions',
          subtitle:
              'Please review our policies regarding student access, content usage, and test analytics.',
          gradientColors: isDark
              ? const [Color(0xFF1D4ED8), Color(0xFF1E3A8A)]
              : const [Color(0xFF3B82F6), Color(0xFF1D4ED8)],
        ),
        const SizedBox(height: AppSpacing.lg),

        const _PolicySectionTile(
          number: '1',
          title: 'Student Account Access',
          description:
              'Course access is non-transferable and strictly intended for individual registered student accounts. Concurrent multi-device logins are restricted for data safety.',
        ),
        const SizedBox(height: AppSpacing.md),
        const _PolicySectionTile(
          number: '2',
          title: 'Intellectual Property Protection',
          description:
              'All question banks, NCERT notes, video lectures, and test series are sole intellectual property of Indraprastha NEET Academy. Redistribution or piracy is strictly prohibited.',
        ),
        const SizedBox(height: AppSpacing.md),
        const _PolicySectionTile(
          number: '3',
          title: 'Test Data & Score Analytics',
          description:
              'Your test responses and time spent per question are analyzed securely to generate AI-driven weakness recommendations and rank predictions.',
        ),
        const SizedBox(height: AppSpacing.md),
        const _PolicySectionTile(
          number: '4',
          title: 'Subscription & Refunds',
          description:
              'Subscriptions provide access to target batch contents for the active duration. Payments follow standard academy subscription refund policies.',
        ),
        const SizedBox(height: AppSpacing.lg),

        const WebsiteLinksSection(),
        const SizedBox(height: AppSpacing.xl),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. RATE US VIEW
// ─────────────────────────────────────────────────────────────────────────────
class _RateUsView extends StatefulWidget {
  const _RateUsView();

  @override
  State<_RateUsView> createState() => _RateUsViewState();
}

class _RateUsViewState extends State<_RateUsView> {
  int _selectedRating = 5;
  final _feedbackController = TextEditingController();

  @override
  void dispose() {
    _feedbackController.dispose();
    super.dispose();
  }

  void _submitRating() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Thank you for rating us $_selectedRating Stars!'),
        backgroundColor: AppColors.success,
      ),
    );
    _feedbackController.clear();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final ratingLabels = [
      'Need Improvement',
      'Fair Experience',
      'Good App',
      'Very Good!',
      'Outstanding! Loved it!'
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _HeaderHeroCard(
          icon: Icons.star_rounded,
          title: 'Your Feedback Matters!',
          subtitle:
              'Help us make Indraprastha NEET Academy even better for all medical aspirants.',
          gradientColors: isDark
              ? const [Color(0xFFD97706), Color(0xFF78350F)]
              : const [Color(0xFFF59E0B), Color(0xFFD97706)],
        ),
        const SizedBox(height: AppSpacing.lg),

        SurfaceCard(
          child: Column(
            children: [
              const SizedBox(height: AppSpacing.sm),
              Text(
                'How is your experience so far?',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              const SizedBox(height: AppSpacing.md),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(5, (index) {
                  final starVal = index + 1;
                  final isSelected = starVal <= _selectedRating;
                  return IconButton(
                    iconSize: 38,
                    icon: Icon(
                      isSelected ? Icons.star_rounded : Icons.star_outline_rounded,
                      color: isSelected ? const Color(0xFFF59E0B) : Colors.grey,
                    ),
                    onPressed: () => setState(() => _selectedRating = starVal),
                  );
                }),
              ),
              const SizedBox(height: AppSpacing.xs),
              Text(
                ratingLabels[_selectedRating - 1],
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  color: Color(0xFFD97706),
                ),
              ),
              const SizedBox(height: AppSpacing.lg),
              TextField(
                controller: _feedbackController,
                maxLines: 3,
                style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
                decoration: InputDecoration(
                  hintText: 'Share what you like or suggestions to improve...',
                  hintStyle: TextStyle(color: isDark ? const Color(0xFF9CA3AF) : AppColors.textSecondary),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(AppRadii.md),
                  ),
                ),
              ),
              const SizedBox(height: AppSpacing.lg),
              SizedBox(
                width: double.infinity,
                child: PrimaryButton(
                  label: 'Submit Rating & Feedback',
                  onPressed: _submitRating,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: AppSpacing.xl),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. ABOUT US VIEW
// ─────────────────────────────────────────────────────────────────────────────
class _AboutUsView extends StatelessWidget {
  const _AboutUsView();

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textMuted = isDark ? const Color(0xFF9CA3AF) : AppColors.textSecondary;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _HeaderHeroCard(
          icon: Icons.school_rounded,
          title: 'Indraprastha NEET Academy',
          subtitle: 'Disciplined Preparation, NCERT Precision, and Proven NEET Score Growth.',
          gradientColors: isDark
              ? const [Color(0xFFC74007), Color(0xFF802200)]
              : const [Color(0xFFE85A1C), Color(0xFFB8440E)],
        ),
        const SizedBox(height: AppSpacing.lg),

        SurfaceCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Our Mission',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              const SizedBox(height: AppSpacing.sm),
              Text(
                'At Indraprastha NEET Academy, we focus on turning NCERT clarity into exam-day confidence. Our learning ecosystem combines chapter concept reading, immediate PYQ practice, rigorous mock testing, and AI-assisted score analytics.',
                style: TextStyle(fontSize: 14, height: 1.5, color: textMuted),
              ),
              const SizedBox(height: AppSpacing.lg),
              Divider(color: isDark ? const Color(0xFF313744) : AppColors.border),
              const SizedBox(height: AppSpacing.md),
              Text(
                'Key Pillars of Academy',
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.bold,
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              const SizedBox(height: AppSpacing.md),
              const _FeatureBullet(
                icon: Icons.menu_book_rounded,
                title: 'NCERT Line-by-Line Focus',
                subtitle: 'Direct questions mapped strictly to latest NEET Syllabus.',
              ),
              const SizedBox(height: AppSpacing.sm),
              const _FeatureBullet(
                icon: Icons.analytics_rounded,
                title: 'Smart Analytics',
                subtitle: 'Identify weak sub-topics and time wasted per question.',
              ),
              const SizedBox(height: AppSpacing.sm),
              const _FeatureBullet(
                icon: Icons.support_agent_rounded,
                title: 'Dedicated Mentorship',
                subtitle: 'Doubt support & guidance via Telegram & WhatsApp.',
              ),
            ],
          ),
        ),
        const SizedBox(height: AppSpacing.lg),

        const WebsiteLinksSection(),
        const SizedBox(height: AppSpacing.xl),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. FAQS VIEW
// ─────────────────────────────────────────────────────────────────────────────
class _FaqView extends StatefulWidget {
  const _FaqView();

  @override
  State<_FaqView> createState() => _FaqViewState();
}

class _FaqViewState extends State<_FaqView> {
  final _searchCtrl = TextEditingController();
  String _searchQuery = '';
  String _selectedCategory = 'All';

  final List<String> _categories = const [
    'All',
    'Target Batches',
    'NTA & Pattern',
    'Account & App',
  ];

  final List<Map<String, String>> _faqs = const [
    {
      'cat': 'Account & App',
      'q': 'How is study content assigned in the app?',
      'a': 'Content is automatically customized according to your selected Target Batch, Class (11th/12th/Dropper), and Subject.',
    },
    {
      'cat': 'Account & App',
      'q': 'Can I access the app from multiple devices?',
      'a': 'You can switch devices, but for safety and account integrity, only one active session remains logged in at a time.',
    },
    {
      'cat': 'Target Batches',
      'q': 'Where can I find Chapter-wise PYQs?',
      'a': 'Open any book or chapter in the Books section and switch to the PYQ tab at the top.',
    },
    {
      'cat': 'Target Batches',
      'q': 'How do I contact support for payment or test issues?',
      'a': 'Call or WhatsApp our team directly at +91 77030 33682 or submit a ticket from the Help Center.',
    },
    {
      'cat': 'NTA & Pattern',
      'q': 'Are tests created on latest NTA NEET pattern?',
      'a': 'Yes, all mock tests, section-wise tests, and MCQ of the day follow the latest NTA exam pattern and negative marking schemes.',
    },
  ];

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textMuted = isDark ? const Color(0xFF9CA3AF) : AppColors.textSecondary;

    final filtered = _faqs.where((item) {
      final matchesCategory = _selectedCategory == 'All' || item['cat'] == _selectedCategory;
      final q = item['q']!.toLowerCase();
      final a = item['a']!.toLowerCase();
      final query = _searchQuery.toLowerCase();
      final matchesQuery = query.isEmpty || q.contains(query) || a.contains(query);
      return matchesCategory && matchesQuery;
    }).toList();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _HeaderHeroCard(
          icon: Icons.quiz_rounded,
          title: 'Frequently Asked Questions',
          subtitle: 'Find quick answers to common queries about test series, content & accounts.',
          gradientColors: isDark
              ? const [Color(0xFF047857), Color(0xFF064E3B)]
              : const [Color(0xFF059669), Color(0xFF047857)],
        ),
        const SizedBox(height: AppSpacing.lg),

        // Search bar
        TextField(
          controller: _searchCtrl,
          onChanged: (val) => setState(() => _searchQuery = val.trim()),
          style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
          decoration: InputDecoration(
            hintText: 'Search FAQs...',
            hintStyle: TextStyle(color: textMuted),
            prefixIcon: Icon(Icons.search_rounded, color: textMuted),
            suffixIcon: _searchQuery.isNotEmpty
                ? IconButton(
                    icon: Icon(Icons.close_rounded, color: textMuted),
                    onPressed: () {
                      _searchCtrl.clear();
                      setState(() => _searchQuery = '');
                    },
                  )
                : null,
            filled: true,
            fillColor: isDark ? const Color(0xFF1E2230) : Theme.of(context).colorScheme.surface,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(AppRadii.md),
              borderSide: BorderSide(
                color: isDark ? const Color(0xFF313744) : Theme.of(context).colorScheme.outline.withValues(alpha: 0.2),
              ),
            ),
          ),
        ),
        const SizedBox(height: AppSpacing.md),

        // Category Filter Chips
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          physics: const BouncingScrollPhysics(),
          child: Row(
            children: _categories.map((cat) {
              final isSelected = _selectedCategory == cat;
              return Padding(
                padding: const EdgeInsets.only(right: AppSpacing.xs),
                child: FilterChip(
                  label: Text(cat),
                  selected: isSelected,
                  onSelected: (_) => setState(() => _selectedCategory = cat),
                  selectedColor: AppColors.primary.withValues(alpha: isDark ? 0.3 : 0.2),
                  checkmarkColor: AppColors.primary,
                  labelStyle: TextStyle(
                    fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                    color: isSelected
                        ? AppColors.primary
                        : (isDark ? Colors.white70 : AppColors.textPrimary),
                    fontSize: 12,
                  ),
                  backgroundColor: isDark ? const Color(0xFF1E2230) : Colors.white,
                  side: BorderSide(
                    color: isSelected
                        ? AppColors.primary
                        : (isDark ? const Color(0xFF313744) : const Color(0xFFE0E0E0)),
                  ),
                ),
              );
            }).toList(),
          ),
        ),
        const SizedBox(height: AppSpacing.md),

        // Accordion list
        if (filtered.isEmpty)
          Padding(
            padding: const EdgeInsets.all(AppSpacing.xl),
            child: Center(
              child: Text(
                'No matching questions found.',
                style: TextStyle(color: textMuted),
              ),
            ),
          )
        else
          ...filtered.map(
            (item) => Padding(
              padding: const EdgeInsets.only(bottom: AppSpacing.sm),
              child: Card(
                elevation: 0,
                color: isDark ? const Color(0xFF181B26) : Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(AppRadii.md),
                  side: BorderSide(
                    color: isDark
                        ? const Color(0xFF2A2E3D)
                        : Theme.of(context).colorScheme.outline.withValues(alpha: 0.15),
                  ),
                ),
                child: ExpansionTile(
                  iconColor: AppColors.primary,
                  collapsedIconColor: textMuted,
                  tilePadding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.md, vertical: 4),
                  leading: const Icon(Icons.help_outline_rounded,
                      color: AppColors.primary, size: 22),
                  title: Text(
                    item['q']!,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(
                          AppSpacing.md, 0, AppSpacing.md, AppSpacing.md),
                      child: Text(
                        item['a']!,
                        style: TextStyle(
                          fontSize: 13,
                          height: 1.5,
                          color: textMuted,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        const SizedBox(height: AppSpacing.lg),

        // Bottom Call to Action
        SurfaceCard(
          child: Row(
            children: [
              const Icon(Icons.headset_mic_rounded, color: AppColors.primary, size: 24),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Still have questions?',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Theme.of(context).colorScheme.onSurface,
                      ),
                    ),
                    Text(
                      'Contact support line: +91 77030 33682',
                      style: TextStyle(fontSize: 12, color: textMuted),
                    ),
                  ],
                ),
              ),
              TextButton(
                onPressed: () async {
                  final uri = Uri.parse('tel:$kContactPhoneNumber');
                  if (await canLaunchUrl(uri)) await launchUrl(uri);
                },
                child: const Text('Call Support'),
              ),
            ],
          ),
        ),
        const SizedBox(height: AppSpacing.xl),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. LEARN MORE VIEW
// ─────────────────────────────────────────────────────────────────────────────
class _LearnMoreView extends StatelessWidget {
  const _LearnMoreView();

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _HeaderHeroCard(
          icon: Icons.lightbulb_rounded,
          title: 'Learn How Indraprastha Works',
          subtitle: 'Follow our structured 4-step preparation cycle to score 680+ in NEET.',
          gradientColors: isDark
              ? const [Color(0xFF6D28D9), Color(0xFF4C1D95)]
              : const [Color(0xFF8B5CF6), Color(0xFF6D28D9)],
        ),
        const SizedBox(height: AppSpacing.lg),

        const _ChecklistPoint(
          number: '1',
          title: 'Read Concept Notes & NCERT Books',
          description: 'Access chapter PDFs and line-by-line highlighted key points.',
        ),
        const SizedBox(height: AppSpacing.sm),
        const _ChecklistPoint(
          number: '2',
          title: 'Practice Chapter-wise PYQs',
          description: 'Solve past 15+ years NEET questions with step-by-step solutions.',
        ),
        const SizedBox(height: AppSpacing.sm),
        const _ChecklistPoint(
          number: '3',
          title: 'Attempt Section & Full Tests',
          description: 'Real exam timer mode with instant negative marking analysis.',
        ),
        const SizedBox(height: AppSpacing.sm),
        const _ChecklistPoint(
          number: '4',
          title: 'Review AI Performance Insights',
          description: 'Turn your mistakes into score growth with personalized revision loops.',
        ),
        const SizedBox(height: AppSpacing.xl),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT VIEW
// ─────────────────────────────────────────────────────────────────────────────
class _DefaultInfoView extends StatelessWidget {
  const _DefaultInfoView();

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Padding(
      padding: const EdgeInsets.all(AppSpacing.xl),
      child: Center(
        child: Text(
          'This section is available in the latest version.',
          style: TextStyle(color: isDark ? const Color(0xFF9CA3AF) : AppColors.textSecondary),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// REUSABLE UI WIDGET COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
class _HeaderHeroCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final List<Color> gradientColors;

  const _HeaderHeroCard({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.gradientColors,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.xl),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: gradientColors,
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(AppRadii.lg),
        boxShadow: const [
          BoxShadow(
            color: Color(0x29000000),
            blurRadius: 16,
            offset: Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.2),
              borderRadius: BorderRadius.circular(AppRadii.md),
            ),
            child: Icon(icon, color: Colors.white, size: 30),
          ),
          const SizedBox(height: AppSpacing.md),
          Text(
            title,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 22,
              fontWeight: FontWeight.w900,
              letterSpacing: 0.2,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            subtitle,
            style: TextStyle(
              color: Colors.white.withValues(alpha: 0.9),
              fontSize: 13,
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }
}

class _ContactCardTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final String actionLabel;
  final VoidCallback onTap;

  const _ContactCardTile({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.actionLabel,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textMuted = isDark ? const Color(0xFF9CA3AF) : AppColors.textSecondary;

    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: AppColors.primary.withValues(alpha: isDark ? 0.2 : 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(icon, color: AppColors.primary, size: 22),
              ),
              const SizedBox(width: AppSpacing.sm),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                    color: Theme.of(context).colorScheme.onSurface,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            subtitle,
            style: TextStyle(fontSize: 12, color: textMuted),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: AppSpacing.md),
          SizedBox(
            width: double.infinity,
            child: OutlinedButton(
              onPressed: onTap,
              style: OutlinedButton.styleFrom(
                foregroundColor: Theme.of(context).colorScheme.onSurface,
                side: BorderSide(
                  color: isDark
                      ? const Color(0xFF374151)
                      : Theme.of(context).colorScheme.outlineVariant,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(AppRadii.md),
                ),
              ),
              child: Text(actionLabel),
            ),
          ),
        ],
      ),
    );
  }
}

class _ChecklistPoint extends StatelessWidget {
  final String number;
  final String title;
  final String description;

  const _ChecklistPoint({
    required this.number,
    required this.title,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textMuted = isDark ? const Color(0xFF9CA3AF) : AppColors.textSecondary;

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 28,
          height: 28,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: AppColors.primary.withValues(alpha: isDark ? 0.25 : 0.15),
            shape: BoxShape.circle,
          ),
          child: Text(
            number,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              color: AppColors.primary,
              fontSize: 13,
            ),
          ),
        ),
        const SizedBox(width: AppSpacing.md),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                description,
                style: TextStyle(fontSize: 12, color: textMuted, height: 1.4),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _PolicySectionTile extends StatelessWidget {
  final String number;
  final String title;
  final String description;

  const _PolicySectionTile({
    required this.number,
    required this.title,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textMuted = isDark ? const Color(0xFF9CA3AF) : AppColors.textSecondary;

    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                '$number. ',
                style: const TextStyle(
                  fontWeight: FontWeight.w900,
                  fontSize: 15,
                  color: AppColors.primary,
                ),
              ),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                    color: Theme.of(context).colorScheme.onSurface,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.xs),
          Text(
            description,
            style: TextStyle(fontSize: 13, height: 1.4, color: textMuted),
          ),
        ],
      ),
    );
  }
}

class _FeatureBullet extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;

  const _FeatureBullet({
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textMuted = isDark ? const Color(0xFF9CA3AF) : AppColors.textSecondary;

    return Row(
      children: [
        Icon(icon, color: AppColors.primary, size: 20),
        const SizedBox(width: AppSpacing.sm),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 13,
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              Text(
                subtitle,
                style: TextStyle(fontSize: 12, color: textMuted),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

