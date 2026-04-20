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
              'Indraprastha NEET Academy brings NCERT reading, daily MCQs, practice, '
              'tests, and revision into one calm workspace. This build is a frontend demo — '
              'no live classes or payments are processed here.',
        );
      case 'faq':
        return const _Meta(
          title: 'FAQ',
          body:
              'Q: Is this the full production app?\n'
              'A: This is a UI prototype with local demo data.\n\n'
              'Q: Where do daily MCQs go after 24 hours?\n'
              'A: They are linked to the same chapter in Books / PYQs (demo behaviour).\n\n'
              'Q: Which plan unlocks videos?\n'
              'A: Rank Pro shows the full video list in the Videos tab.',
        );
      case 'contact':
        return const _Meta(
          title: 'Contact us',
          body:
              'Academic support (demo):\n'
              'Email: support@indraprastha-neet.example\n'
              'Hours: Mon–Sat, 10:00–18:00 IST\n\n'
              'Replace these details with your production contacts.',
        );
      case 'about':
        return const _Meta(
          title: 'About us',
          body:
              'Indraprastha NEET Academy focuses on disciplined syllabus coverage, '
              'mistake-led revision, and exam-style pacing — designed for serious NEET aspirants.',
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
              'This demo app is provided as-is for evaluation. No warranty. '
              'All timetable, pricing, and content copy are placeholders until your legal '
              'team publishes final terms.',
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
              'If you find our videos re-uploaded without permission, email '
              'piracy@indraprastha-neet.example with the URL and screenshot. '
              'This form is a placeholder in the MVP.',
        );
      default:
        return const _Meta(
          title: 'Page',
          body: 'This section is not available yet.',
        );
    }
  }
}
