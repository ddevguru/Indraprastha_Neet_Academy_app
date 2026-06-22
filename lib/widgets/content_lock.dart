import 'package:flutter/material.dart';

import '../core/access/content_access.dart';
import '../theme/app_tokens.dart';

/// Bottom inset so scroll content clears the mobile navigation bar.
EdgeInsets mobileScrollPadding(BuildContext context) {
  final width = MediaQuery.sizeOf(context).width;
  final extraBottom = width < 900 ? AppSpacing.xl : 0.0;
  return EdgeInsets.fromLTRB(
    AppSpacing.lg,
    AppSpacing.lg,
    AppSpacing.lg,
    AppSpacing.lg + extraBottom,
  );
}

class FreePreviewBanner extends StatelessWidget {
  const FreePreviewBanner({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.primaryContainer.withValues(alpha: 0.45),
        borderRadius: BorderRadius.circular(AppRadii.md),
        border: Border.all(
          color: Theme.of(context).colorScheme.outlineVariant,
        ),
      ),
      child: Row(
        children: [
          Icon(
            Icons.lock_open_rounded,
            color: Theme.of(context).colorScheme.primary,
            size: 20,
          ),
          const SizedBox(width: AppSpacing.sm),
          Expanded(
            child: Text(
              'Free preview: ${ContentAccess.freeItemLimit} items unlocked. '
              'Subscribe to access everything.',
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ),
        ],
      ),
    );
  }
}

class LockedContentBadge extends StatelessWidget {
  const LockedContentBadge({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: AppColors.goldSoft.withValues(
          alpha: Theme.of(context).brightness == Brightness.dark ? 0.2 : 1,
        ),
        borderRadius: BorderRadius.circular(999),
      ),
      child: const Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.lock_rounded, size: 14, color: AppColors.gold),
          SizedBox(width: 4),
          Text(
            'Locked',
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w700,
              color: AppColors.gold,
            ),
          ),
        ],
      ),
    );
  }
}

Widget buildContentTrailing({
  required bool locked,
  IconData unlockedIcon = Icons.arrow_forward_ios_rounded,
}) {
  if (locked) {
    return const Icon(Icons.lock_rounded, color: AppColors.gold, size: 20);
  }
  return Icon(unlockedIcon, size: 16);
}
