import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../core/providers/daily_mcqs_provider.dart';
import '../../models/app_models.dart';
import '../../models/daily_mcq_item.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

class TodaysMcqsScreen extends ConsumerWidget {
  const TodaysMcqsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncItems = ref.watch(dailyMcqsProvider);

    return Scaffold(
      appBar: AppBar(title: const Text("Today's MCQs")),
      body: asyncItems.when(
        loading: () => const Center(child: CircularProgressIndicator()),
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
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: CenteredContent(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SectionHeader(
                    title: "Today's rotation",
                    subtitle:
                        'Questions stay here for 24 hours from issue time, then move into '
                        'Books → chapter → PYQs / practice for that standard.',
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  if (active.isEmpty)
                    const EmptyStateWidget(
                      title: 'No MCQs in the daily window',
                      subtitle:
                          'Everything issued in the last session has moved to your chapters. '
                          'Open a chapter below or pull to refresh after the next daily drop.',
                      icon: Icons.quiz_outlined,
                    )
                  else
                    ...active.map((e) => Padding(
                          padding: const EdgeInsets.only(bottom: AppSpacing.md),
                          child: _McqCard(item: e, showTimer: true),
                        )),
                  if (archived.isNotEmpty) ...[
                    const SizedBox(height: AppSpacing.xl),
                    SectionHeader(
                      title: 'Moved to your chapters (24h passed)',
                      subtitle:
                          'These now appear under the matching subject and chapter in Books and Practice.',
                    ),
                    const SizedBox(height: AppSpacing.md),
                    ...archived.map((e) => Padding(
                          padding: const EdgeInsets.only(bottom: AppSpacing.md),
                          child: _McqCard(
                            item: e,
                            showTimer: false,
                            onOpenChapter: () =>
                                context.push('/books/chapter/${e.chapterId}'),
                          ),
                        )),
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
    this.onOpenChapter,
  });

  final DailyMcqItem item;
  final bool showTimer;
  final VoidCallback? onOpenChapter;

  @override
  Widget build(BuildContext context) {
    final timeFmt = DateFormat('MMM d, h:mm a');
    final remaining = item.expiresAt.difference(DateTime.now());

    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                backgroundColor: AppColors.indigoSoft,
                child: Icon(item.subject.icon, color: AppColors.indigo, size: 20),
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
            ],
          ),
          const SizedBox(height: AppSpacing.md),
          Text(item.preview),
          const SizedBox(height: AppSpacing.sm),
          Text(
            'Issued ${timeFmt.format(item.issuedAt)}',
            style: Theme.of(context).textTheme.bodySmall,
          ),
          if (showTimer && item.isInTodaysWindow) ...[
            const SizedBox(height: AppSpacing.xs),
            Text(
              remaining.inMinutes > 0
                  ? "Leaves Today's MCQs in ${_formatRemaining(remaining)}"
                  : 'Moving to chapter library shortly',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppColors.indigo,
                    fontWeight: FontWeight.w600,
                  ),
            ),
          ],
          if (onOpenChapter != null) ...[
            const SizedBox(height: AppSpacing.md),
            Align(
              alignment: Alignment.centerRight,
              child: TextButton.icon(
                onPressed: onOpenChapter,
                icon: const Icon(Icons.menu_book_rounded, size: 18),
                label: const Text('Open chapter'),
              ),
            ),
          ],
        ],
      ),
    );
  }

  String _formatRemaining(Duration d) {
    final h = d.inHours;
    final m = d.inMinutes.remainder(60);
    if (h > 0) return '${h}h ${m}m';
    return '${m}m';
  }
}
