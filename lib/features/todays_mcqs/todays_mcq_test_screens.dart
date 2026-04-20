import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../core/providers/daily_mcqs_provider.dart';
import '../../models/app_models.dart';
import '../../models/daily_mcq_item.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

/// Shown first: which daily test, subjects & chapters — then user starts attempt.
class TodaysMcqTestPreviewScreen extends ConsumerWidget {
  const TodaysMcqTestPreviewScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final items = ref.watch(dailyMcqsProvider);
    final active = items.activeInTodaysFeed;
    final subjects = _uniqueSubjects(active);
    final dateLabel = DateFormat('EEEE, d MMM yyyy').format(DateTime.now());

    return Scaffold(
      appBar: AppBar(title: const Text("Today's MCQ test")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: CenteredContent(
          maxWidth: 560,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Before you start',
                style: Theme.of(context).textTheme.headlineSmall,
              ),
              const SizedBox(height: AppSpacing.sm),
              Text(
                'Review which test is scheduled for today and which subjects it covers. '
                'Tap Start when you are ready.',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppColors.textSecondary,
                    ),
              ),
              const SizedBox(height: AppSpacing.xl),
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Today's MCQ test",
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: AppSpacing.xs),
                    Text(
                      dateLabel,
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                    const Divider(height: AppSpacing.xl),
                    _PreviewRow(
                      icon: Icons.label_outline_rounded,
                      label: 'Test type',
                      value: 'Daily rotation (demo)',
                    ),
                    const SizedBox(height: AppSpacing.md),
                    _PreviewRow(
                      icon: Icons.quiz_outlined,
                      label: 'Questions',
                      value: active.isEmpty
                          ? '0 (nothing in the 24h window)'
                          : '${active.length} MCQ${active.length == 1 ? '' : 's'}',
                    ),
                    const SizedBox(height: AppSpacing.md),
                    _PreviewRow(
                      icon: Icons.school_outlined,
                      label: 'Subjects',
                      value: subjects.isEmpty
                          ? '—'
                          : subjects.map((s) => s.label).join(', '),
                    ),
                    if (active.isNotEmpty) ...[
                      const SizedBox(height: AppSpacing.md),
                      Text(
                        'Chapters in this test',
                        style: Theme.of(context).textTheme.titleSmall,
                      ),
                      const SizedBox(height: AppSpacing.sm),
                      ...active.map(
                        (e) => Padding(
                          padding: const EdgeInsets.only(bottom: AppSpacing.xs),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Icon(
                                e.subject.icon,
                                size: 18,
                                color: AppColors.indigo,
                              ),
                              const SizedBox(width: AppSpacing.sm),
                              Expanded(
                                child: Text(
                                  '${e.subject.label} · ${e.standardLabel} — ${e.chapterTitle}',
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.lg),
              PrimaryButton(
                label: 'Start test',
                expanded: true,
                icon: Icons.play_arrow_rounded,
                onPressed: active.isEmpty
                    ? null
                    : () => context.push('/todays-mcq-test/attempt'),
              ),
              const SizedBox(height: AppSpacing.md),
              Center(
                child: TextButton(
                  onPressed: () => context.push('/todays-mcqs'),
                  child: const Text('View full rotation & moved questions'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  List<SubjectType> _uniqueSubjects(List<DailyMcqItem> active) {
    final set = <SubjectType>{};
    for (final e in active) {
      set.add(e.subject);
    }
    const order = [
      SubjectType.physics,
      SubjectType.chemistry,
      SubjectType.botany,
      SubjectType.zoology,
    ];
    return order.where(set.contains).toList();
  }
}

class _PreviewRow extends StatelessWidget {
  const _PreviewRow({
    required this.icon,
    required this.label,
    required this.value,
  });

  final IconData icon;
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(icon, size: 22, color: AppColors.indigo),
        const SizedBox(width: AppSpacing.md),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: Theme.of(context).textTheme.labelMedium?.copyWith(
                      color: AppColors.textSecondary,
                    ),
              ),
              Text(
                value,
                style: Theme.of(context).textTheme.bodyLarge,
              ),
            ],
          ),
        ),
      ],
    );
  }
}

/// Interactive attempt for [dailyMcqsProvider] active items only.
class TodaysMcqTestAttemptScreen extends ConsumerStatefulWidget {
  const TodaysMcqTestAttemptScreen({super.key});

  @override
  ConsumerState<TodaysMcqTestAttemptScreen> createState() =>
      _TodaysMcqTestAttemptScreenState();
}

class _TodaysMcqTestAttemptScreenState
    extends ConsumerState<TodaysMcqTestAttemptScreen> {
  int _index = 0;
  int? _selected;
  bool _submitted = false;
  int _correctCount = 0;

  static const _options = [
    'Only the first statement is correct',
    'Only the second statement is correct',
    'Both statements are correct',
    'Neither statement is correct',
  ];

  int _correctOption(DailyMcqItem item) =>
      item.id.hashCode.abs() % _options.length;

  @override
  Widget build(BuildContext context) {
    final active = ref.watch(dailyMcqsProvider).activeInTodaysFeed;
    if (active.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text("Today's MCQ test")),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text(
                  "No questions in today's window. Open the preview screen again after the daily set refreshes.",
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: AppSpacing.lg),
                FilledButton(
                  onPressed: () => context.pop(),
                  child: const Text('Back'),
                ),
              ],
            ),
          ),
        ),
      );
    }

    final item = active[_index.clamp(0, active.length - 1)];
    final correct = _correctOption(item);

    return Scaffold(
      appBar: AppBar(title: const Text("Today's MCQ test")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: CenteredContent(
          maxWidth: 720,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(
                    child: StatCard(
                      title: 'Progress',
                      value: '${_index + 1}/${active.length}',
                      subtitle: 'Daily test',
                      icon: Icons.timelapse_rounded,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: StatCard(
                      title: 'Subject',
                      value: item.subject.label,
                      subtitle: item.standardLabel,
                      icon: item.subject.icon,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppSpacing.lg),
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: AppSpacing.sm,
                        vertical: AppSpacing.xs,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.indigoSoft,
                        borderRadius: BorderRadius.circular(99),
                      ),
                      child: Text(
                        '${item.subject.label} · ${item.chapterTitle}',
                        style: const TextStyle(
                          color: AppColors.indigo,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    Text(
                      item.preview,
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    ...List.generate(_options.length, (i) {
                      final sel = _selected == i;
                      final isCorr = i == correct;
                      final reveal = _submitted && (sel || isCorr);
                      return Padding(
                        padding: const EdgeInsets.only(bottom: AppSpacing.md),
                        child: InkWell(
                          onTap: _submitted
                              ? null
                              : () => setState(() => _selected = i),
                          borderRadius: BorderRadius.circular(AppRadii.md),
                          child: Container(
                            width: double.infinity,
                            padding: const EdgeInsets.all(AppSpacing.md),
                            decoration: BoxDecoration(
                              color: reveal
                                  ? (isCorr
                                      ? Colors.green.withValues(alpha: 0.12)
                                      : Colors.red.withValues(alpha: 0.08))
                                  : (sel
                                      ? AppColors.indigoSoft
                                      : AppColors.surfaceMuted),
                              borderRadius:
                                  BorderRadius.circular(AppRadii.md),
                              border: Border.all(
                                color: reveal && isCorr
                                    ? Colors.green
                                    : (reveal && sel && !isCorr
                                        ? Colors.red
                                        : AppColors.border),
                              ),
                            ),
                            child: Text(_options[i]),
                          ),
                        ),
                      );
                    }),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.lg),
              if (!_submitted)
                PrimaryButton(
                  label: 'Check & continue',
                  expanded: true,
                  icon: Icons.check_rounded,
                  onPressed: _selected == null
                      ? null
                      : () {
                          setState(() {
                            _submitted = true;
                            if (_selected == correct) {
                              _correctCount++;
                            }
                          });
                        },
                )
              else
                PrimaryButton(
                  label: _index >= active.length - 1
                      ? 'Finish test'
                      : 'Next question',
                  expanded: true,
                  icon: Icons.arrow_forward_rounded,
                  onPressed: () {
                    if (_index >= active.length - 1) {
                      showDialog<void>(
                        context: context,
                        builder: (ctx) => AlertDialog(
                          title: const Text('Test complete'),
                          content: Text(
                            'You scored $_correctCount out of ${active.length} (demo scoring).',
                          ),
                          actions: [
                            TextButton(
                              onPressed: () {
                                Navigator.of(ctx).pop();
                                context.go('/dashboard/0');
                              },
                              child: const Text('Back to Home'),
                            ),
                          ],
                        ),
                      );
                    } else {
                      setState(() {
                        _index++;
                        _selected = null;
                        _submitted = false;
                      });
                    }
                  },
                ),
            ],
          ),
        ),
      ),
    );
  }
}
