import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

/// Static info pages for drawer links (`/info/:slug`).
class InfoDetailScreen extends StatelessWidget {
  const InfoDetailScreen({super.key, required this.slug});

  final String slug;

  @override
  Widget build(BuildContext context) {
    final meta = _Meta.forSlug(slug);
    return Scaffold(
      appBar: AppBar(title: Text(meta.title)),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: CenteredContent(
          maxWidth: 720,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                meta.title,
                style: Theme.of(context).textTheme.headlineSmall,
              ),
              const SizedBox(height: AppSpacing.md),
              Text(
                meta.body,
                style: Theme.of(context).textTheme.bodyLarge,
              ),
              if (meta.extra != null) ...[
                const SizedBox(height: AppSpacing.lg),
                meta.extra!(context),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class _Meta {
  const _Meta({
    required this.title,
    required this.body,
    this.extra,
  });

  final String title;
  final String body;
  final Widget Function(BuildContext context)? extra;

  static _Meta forSlug(String slug) {
    switch (slug) {
      case 'learn-more':
        return const _Meta(
          title: 'Learn more',
          body:
              'Indraprastha NEET Academy app combines chapter-wise books, PYQs, practice sets, '
              'test series, and analytics in one focused flow.\n\n'
              'How students use it:\n'
              '1) Read concept notes and chapter PDFs\n'
              '2) Switch to PYQs from the same chapter\n'
              '3) Attempt practice/test modules\n'
              '4) Review AI insights and improve weak areas',
        );
      case 'faq':
        return const _Meta(
          title: 'FAQ',
          body:
              'Q: How is content assigned?\n'
              'A: Content is filtered by your selected batch, class, and subject.\n\n'
              'Q: Can I continue from another device?\n'
              'A: Yes, but active session stays on one device at a time for account safety.\n\n'
              'Q: Where can I find chapter PYQs?\n'
              'A: Open a chapter in Books and switch to the PYQ section.',
        );
      case 'contact':
        return const _Meta(
          title: 'Contact us',
          body:
              'Academic support:\n'
              'Email: support@indraprasthaneetacademy.com\n'
              'Phone/WhatsApp: +91-XXXXXXXXXX\n'
              'Hours: Mon-Sat, 10:00 AM - 7:00 PM IST\n\n'
              'For technical issues, include your registered mobile number and a screenshot.',
        );
      case 'about':
        return const _Meta(
          title: 'About us',
          body:
              'Indraprastha NEET Academy focuses on disciplined preparation for NEET through '
              'concept clarity, daily practice, and test-based improvement.\n\n'
              'Our approach: structured study plans, chapter-wise testing, and revision loops '
              'that turn mistakes into score growth.',
        );
      case 'rate-us':
        return _Meta(
          title: 'Rate us',
          body: 'Enjoying the experience? A store rating helps more students discover us.',
          extra: (context) => Wrap(
                spacing: AppSpacing.sm,
                children: List.generate(
                  5,
                  (i) => IconButton(
                    icon: const Icon(Icons.star_rounded),
                    color: AppColors.indigo,
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Thanks — ${i + 1} stars (demo).'),
                        ),
                      );
                    },
                  ),
                ),
              ),
        );
      case 'terms':
        return const _Meta(
          title: 'Terms & conditions',
          body:
              '1) Course access is for the registered student account only.\n'
              '2) Sharing app content, videos, or PDFs without permission is prohibited.\n'
              '3) Test performance data is used to generate learning analytics inside the app.\n'
              '4) Subscription and access policies may be updated by the academy.\n\n'
              'Please read complete policy details from official support before purchase.',
        );
      case 'share':
        return _Meta(
          title: 'Share the app',
          body:
              'Copy a placeholder store link to share with friends. Integrate Share.sheet or '
              'branch links in production.',
          extra: (context) => FilledButton.icon(
                onPressed: () async {
                  const link = 'https://indraprastha-neet.example.app';
                  await Clipboard.setData(const ClipboardData(text: link));
                  if (!context.mounted) return;
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Link copied to clipboard.')),
                  );
                },
                icon: const Icon(Icons.link_rounded),
                label: const Text('Copy demo link'),
              ),
        );
      case 'report-piracy':
        return const _Meta(
          title: 'Report video piracy',
          body:
              'If you find unauthorized sharing of academy videos, report immediately:\n'
              'Email: piracy@indraprasthaneetacademy.com\n\n'
              'Please share:\n'
              '- Link where content is uploaded\n'
              '- Screenshot with timestamp\n'
              '- Your contact number for follow-up',
        );
      default:
        return const _Meta(
          title: 'Page',
          body: 'This section is not available yet.',
        );
    }
  }
}
