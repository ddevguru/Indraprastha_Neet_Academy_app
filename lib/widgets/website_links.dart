import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../core/constants/website_constants.dart';
import '../theme/app_tokens.dart';

/// Tappable list of official academy website links.
class WebsiteLinksSection extends StatelessWidget {
  const WebsiteLinksSection({
    super.key,
    this.compact = false,
    this.showHeading = true,
  });

  final bool compact;
  final bool showHeading;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (showHeading) ...[
          Text(
            'Official links',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
          ),
          const SizedBox(height: AppSpacing.sm),
        ],
        ...WebsiteConstants.links.map(
          (link) => _WebsiteLinkTile(link: link, compact: compact),
        ),
      ],
    );
  }
}

class _WebsiteLinkTile extends StatelessWidget {
  const _WebsiteLinkTile({
    required this.link,
    required this.compact,
  });

  final WebsiteLink link;
  final bool compact;

  IconData _iconFor(String name) => switch (name) {
        'trending_up' => Icons.trending_up_rounded,
        'privacy_tip' => Icons.privacy_tip_outlined,
        'cookie' => Icons.cookie_outlined,
        _ => Icons.language_rounded,
      };

  Future<void> _open(BuildContext context) async {
    final uri = Uri.parse(link.url);
    final launched = await launchUrl(uri, mode: LaunchMode.externalApplication);
    if (!launched && context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Could not open ${link.label}')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (compact) {
      return ListTile(
        contentPadding: EdgeInsets.zero,
        dense: true,
        leading: Icon(_iconFor(link.iconName), color: AppColors.indigo, size: 22),
        title: Text(link.label),
        trailing: const Icon(Icons.open_in_new_rounded, size: 18),
        onTap: () => _open(context),
      );
    }

    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.sm),
      child: OutlinedButton.icon(
        onPressed: () => _open(context),
        icon: Icon(_iconFor(link.iconName), size: 20),
        label: Align(
          alignment: Alignment.centerLeft,
          child: Text(link.label),
        ),
        style: OutlinedButton.styleFrom(
          alignment: Alignment.centerLeft,
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.md,
            vertical: AppSpacing.md,
          ),
        ),
      ),
    );
  }
}
