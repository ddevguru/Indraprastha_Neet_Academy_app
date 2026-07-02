import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../core/access/content_access.dart';
import '../../core/providers/app_state.dart';
import '../../core/providers/daily_mcqs_provider.dart';
import '../../models/app_models.dart';
import '../../models/daily_mcq_item.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import '../../widgets/content_lock.dart';

class TodaysMcqsScreen extends ConsumerWidget {
  const TodaysMcqsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncItems = ref.watch(dailyMcqsProvider);
    final hasSubscription = ref.watch(appUiControllerProvider).hasActiveSubscription;

    return Scaffold(
      appBar: AppBar(title: const Text("Today's MCQs")),
      body: asyncItems.when(
        loading: () => const SkeletonLoader(cardCount: 5),
        error: (e, _) => Center(
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text('Failed to load MCQs: $e', textAlign: TextAlign.center),
                const SizedBox(height: AppSpacing.md),
                FilledButton(
                  onPressed: () => ref.read(dailyMcqsProvider.notifier).refresh(),
                  child: const Text('Retry'),
                ),
              ],
            ),
          ),
        ),
        data: (items) {
          final active = items.activeInTodaysFeed;
          final archived = items.archivedToChapters;

          return SingleChildScrollView(
            padding: mobileScrollPadding(context),
            child: CenteredContent(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SectionHeader(
                    title: "Today's MCQs",
                    subtitle:
                        'Sirf aaj ke MCQs ka test de sakte ho. Purane MCQs neeche archive mein dikhte hain — '
                        'unhe sirf dekh sakte ho, test nahi.',
                  ),
                  if (!hasSubscription) ...[
                    const SizedBox(height: AppSpacing.md),
                    const FreePreviewBanner(),
                  ],
                  const SizedBox(height: AppSpacing.lg),
                  if (active.isEmpty)
                    const EmptyStateWidget(
                      title: 'Aaj ke liye koi MCQ nahi hai',
                      subtitle:
                          'Admin jab aaj ka MCQ of the Day add karega, yahan dikhega. '
                          'Purane MCQs archive section mein milenge.',
                      icon: Icons.quiz_outlined,
                    )
                  else
                    ...active.asMap().entries.map((entry) {
                      final locked = !ContentAccess.isItemUnlocked(
                        index: entry.key,
                        hasActiveSubscription: hasSubscription,
                      );
                      return Padding(
                        padding: const EdgeInsets.only(bottom: AppSpacing.md),
                        child: _McqCard(
                          item: entry.value,
                          showTimer: true,
                          locked: locked,
                          onLockedTap: () => ContentAccess.openSubscriptions(context),
                        ),
                      );
                    }),
                  if (archived.isNotEmpty) ...[
                    const SizedBox(height: AppSpacing.xl),
                    SectionHeader(
                      title: 'Archived MCQs (view only)',
                      subtitle:
                          'Purane din ke MCQs — sirf questions dekh sakte ho, test nahi de sakte.',
                    ),
                    const SizedBox(height: AppSpacing.md),
                    ...archived.asMap().entries.map((entry) {
                      return Padding(
                        padding: const EdgeInsets.only(bottom: AppSpacing.md),
                        child: _McqCard(
                          item: entry.value,
                          showTimer: false,
                          viewOnly: true,
                        ),
                      );
                    }),
                  ],
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class _McqCard extends StatelessWidget {
  const _McqCard({
    required this.item,
    this.showTimer = false,
    this.locked = false,
    this.onLockedTap,
    this.viewOnly = false,
  });

  final DailyMcqItem item;
  final bool showTimer;
  final bool locked;
  final VoidCallback? onLockedTap;
  final bool viewOnly;

  @override
  Widget build(BuildContext context) {
    final timeFmt = DateFormat('MMM d, h:mm a');

    return Opacity(
      opacity: locked ? 0.72 : 1,
      child: InkWell(
        onTap: locked ? onLockedTap : null,
        borderRadius: BorderRadius.circular(AppRadii.lg),
        child: SurfaceCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  CircleAvatar(
                    backgroundColor: locked
                        ? AppColors.goldSoft
                        : AppColors.indigoSoft,
                    child: Icon(
                      locked ? Icons.lock_rounded : item.subject.icon,
                      color: locked ? AppColors.gold : AppColors.indigo,
                      size: 20,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '${item.subject.label} · ${item.standardLabel}',
                          style: Theme.of(context).textTheme.labelLarge,
                        ),
                        Text(
                          item.chapterTitle,
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                      ],
                    ),
                  ),
                  if (locked) const LockedContentBadge(),
                ],
              ),
              const SizedBox(height: AppSpacing.md),
              Text(item.preview),
              if (viewOnly && item.hasRealOptions) ...[
                const SizedBox(height: AppSpacing.sm),
                ...item.options.asMap().entries.map(
                  (e) => Padding(
                    padding: const EdgeInsets.only(bottom: 4),
                    child: Text(
                      '${String.fromCharCode(65 + e.key)}) ${e.value}',
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ),
                ),
              ],
              const SizedBox(height: AppSpacing.sm),
              Text(
                viewOnly
                    ? 'Published ${timeFmt.format(item.issuedAt)} · View only'
                    : 'Issued ${timeFmt.format(item.issuedAt)}',
                style: Theme.of(context).textTheme.bodySmall,
              ),
              if (viewOnly) ...[
                const SizedBox(height: AppSpacing.xs),
                Text(
                  'Test closed — sirf dekh sakte ho',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: AppColors.textSecondary,
                        fontStyle: FontStyle.italic,
                      ),
                ),
              ],
              if (showTimer && item.isInTodaysWindow) ...[
                const SizedBox(height: AppSpacing.xs),
                Text(
                  'Available until midnight tonight',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: AppColors.indigo,
                        fontWeight: FontWeight.w600,
                      ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
