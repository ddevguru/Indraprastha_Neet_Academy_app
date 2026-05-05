import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../core/providers/daily_mcqs_provider.dart';
import '../../models/app_models.dart';
import '../../models/daily_mcq_item.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

class TodaysMcqTestPreviewScreen extends ConsumerWidget {
  const TodaysMcqTestPreviewScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncItems = ref.watch(dailyMcqsProvider);
    final items = asyncItems.asData?.value ?? const [];
    final active = items.activeInTodaysFeed;
    final subjects = _uniqueSubjects(active);
    final dateLabel = DateFormat('EEEE, d MMM yyyy').format(DateTime.now());

    return Scaffold(
      appBar: AppBar(title: const Text("Today's MCQ test")),
      body: asyncItems.isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
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
                            value: 'Daily MCQ test',
                          ),
                          const SizedBox(height: AppSpacing.md),
                          _PreviewRow(
                            icon: Icons.quiz_outlined,
                            label: 'Questions',
                            value: active.isEmpty
                                ? '0 (no active MCQs today)'
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
                              'Topics in this test',
                              style: Theme.of(context).textTheme.titleSmall,
                            ),
                            const SizedBox(height: AppSpacing.sm),
                            ...active.map(
                              (e) => Padding(
                                padding:
                                    const EdgeInsets.only(bottom: AppSpacing.xs),
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
                                        e.chapterTitle.isNotEmpty
                                            ? '${e.subject.label}${e.standardLabel.isNotEmpty ? ' · ${e.standardLabel}' : ''} — ${e.chapterTitle}'
                                            : e.subject.label,
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
                        child: const Text('View full MCQ list'),
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

// ─── Attempt screen ───────────────────────────────────────────────────────────

typedef _AttemptRecord = ({DailyMcqItem item, int? selected, int correct});

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
  int _wrongCount = 0;
  bool _finished = false;
  final List<_AttemptRecord> _history = [];

  static const _fallbackOptions = [
    'Only the first statement is correct',
    'Only the second statement is correct',
    'Both statements are correct',
    'Neither statement is correct',
  ];

  List<String> _optionsFor(DailyMcqItem item) =>
      item.hasRealOptions ? item.options : _fallbackOptions;

  int _correctFor(DailyMcqItem item) =>
      item.correctOption ?? item.id.hashCode.abs() % 4;

  void _checkAndContinue(List<DailyMcqItem> active) {
    if (_selected == null) return;
    final item = active[_index];
    final correct = _correctFor(item);
    setState(() {
      _submitted = true;
      if (_selected == correct) {
        _correctCount++;
      } else {
        _wrongCount++;
      }
    });
  }

  void _next(List<DailyMcqItem> active) {
    final item = active[_index];
    final correct = _correctFor(item);
    _history.add((item: item, selected: _selected, correct: correct));

    if (_index >= active.length - 1) {
      setState(() => _finished = true);
    } else {
      setState(() {
        _index++;
        _selected = null;
        _submitted = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final items = ref.watch(dailyMcqsProvider).asData?.value ?? const [];
    final active = items.activeInTodaysFeed;

    if (_finished) {
      return _McqResultScreen(
        history: _history,
        correctCount: _correctCount,
        wrongCount: _wrongCount,
      );
    }

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
                  'No active MCQs today. Check back after the admin adds questions.',
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
    final options = _optionsFor(item);
    final correct = _correctFor(item);

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
                      subtitle: item.standardLabel.isNotEmpty
                          ? item.standardLabel
                          : item.chapterTitle,
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
                    if (item.chapterTitle.isNotEmpty)
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
                          '${item.subject.label}${item.chapterTitle.isNotEmpty ? ' · ${item.chapterTitle}' : ''}',
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
                    ...List.generate(options.length, (i) {
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
                              borderRadius: BorderRadius.circular(AppRadii.md),
                              border: Border.all(
                                color: reveal && isCorr
                                    ? Colors.green
                                    : (reveal && sel && !isCorr
                                        ? Colors.red
                                        : AppColors.border),
                              ),
                            ),
                            child: Row(
                              children: [
                                Container(
                                  width: 28,
                                  height: 28,
                                  decoration: BoxDecoration(
                                    color: reveal && isCorr
                                        ? Colors.green.withValues(alpha: 0.2)
                                        : reveal && sel && !isCorr
                                            ? Colors.red.withValues(alpha: 0.15)
                                            : sel
                                                ? AppColors.indigo
                                                    .withValues(alpha: 0.15)
                                                : AppColors.border
                                                    .withValues(alpha: 0.5),
                                    shape: BoxShape.circle,
                                  ),
                                  child: Center(
                                    child: Text(
                                      ['A', 'B', 'C', 'D'][i],
                                      style: TextStyle(
                                        fontWeight: FontWeight.w700,
                                        fontSize: 12,
                                        color: reveal && isCorr
                                            ? Colors.green
                                            : reveal && sel && !isCorr
                                                ? Colors.red
                                                : AppColors.indigo,
                                      ),
                                    ),
                                  ),
                                ),
                                const SizedBox(width: AppSpacing.sm),
                                Expanded(child: Text(options[i])),
                                if (reveal)
                                  Icon(
                                    isCorr
                                        ? Icons.check_circle_rounded
                                        : Icons.cancel_rounded,
                                    color: isCorr ? Colors.green : Colors.red,
                                    size: 20,
                                  ),
                              ],
                            ),
                          ),
                        ),
                      );
                    }),
                    if (_submitted &&
                        item.explanation != null &&
                        item.explanation!.isNotEmpty) ...[
                      const Divider(height: AppSpacing.xl),
                      Row(
                        children: [
                          const Icon(Icons.lightbulb_outline_rounded,
                              size: 18, color: AppColors.indigo),
                          const SizedBox(width: AppSpacing.xs),
                          Text(
                            'Explanation',
                            style: Theme.of(context)
                                .textTheme
                                .titleSmall
                                ?.copyWith(color: AppColors.indigo),
                          ),
                        ],
                      ),
                      const SizedBox(height: AppSpacing.sm),
                      Text(
                        item.explanation!,
                        style: Theme.of(context)
                            .textTheme
                            .bodyMedium
                            ?.copyWith(height: 1.5),
                      ),
                    ],
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
                      : () => _checkAndContinue(active),
                )
              else
                PrimaryButton(
                  label: _index >= active.length - 1
                      ? 'Finish & see results'
                      : 'Next question',
                  expanded: true,
                  icon: _index >= active.length - 1
                      ? Icons.bar_chart_rounded
                      : Icons.arrow_forward_rounded,
                  onPressed: () => _next(active),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

// ─── Result screen ────────────────────────────────────────────────────────────

class _McqResultScreen extends StatelessWidget {
  const _McqResultScreen({
    required this.history,
    required this.correctCount,
    required this.wrongCount,
  });

  final List<_AttemptRecord> history;
  final int correctCount;
  final int wrongCount;

  @override
  Widget build(BuildContext context) {
    final total = history.length;
    final accuracy = total > 0 ? (correctCount / total * 100) : 0.0;

    return Scaffold(
      appBar: AppBar(title: const Text('MCQ Results')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: CenteredContent(
          maxWidth: 720,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Score banner
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(AppSpacing.xl),
                decoration: BoxDecoration(
                  gradient: AppGradients.primary,
                  borderRadius: BorderRadius.circular(AppRadii.xl),
                  boxShadow: AppShadows.soft,
                ),
                child: Column(
                  children: [
                    Text(
                      '$correctCount/$total',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 52,
                        fontWeight: FontWeight.w900,
                        height: 1,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.xs),
                    const Text(
                      'Correct answers',
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: 16,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.lg),
              // Stats row
              Row(
                children: [
                  Expanded(
                    child: StatCard(
                      title: 'Correct',
                      value: '$correctCount',
                      subtitle: 'questions',
                      icon: Icons.check_circle_outline_rounded,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: StatCard(
                      title: 'Wrong',
                      value: '$wrongCount',
                      subtitle: 'questions',
                      icon: Icons.cancel_outlined,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: StatCard(
                      title: 'Accuracy',
                      value: '${accuracy.toStringAsFixed(0)}%',
                      subtitle: 'overall',
                      icon: Icons.percent_rounded,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppSpacing.xl),
              Text(
                'Answer Review',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: AppSpacing.md),
              ...history.asMap().entries.map((e) {
                final idx = e.key;
                final rec = e.value;
                final isCorrect = rec.selected == rec.correct;
                final wasAttempted = rec.selected != null;
                final options = rec.item.hasRealOptions
                    ? rec.item.options
                    : const [
                        'Only the first statement is correct',
                        'Only the second statement is correct',
                        'Both statements are correct',
                        'Neither statement is correct',
                      ];
                final correctLabel = rec.correct < options.length
                    ? options[rec.correct]
                    : '—';
                final selectedLabel = wasAttempted && rec.selected! < options.length
                    ? options[rec.selected!]
                    : '—';

                return Padding(
                  padding: const EdgeInsets.only(bottom: AppSpacing.md),
                  child: SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: AppSpacing.sm,
                                vertical: 2,
                              ),
                              decoration: BoxDecoration(
                                color: AppColors.indigoSoft,
                                borderRadius: BorderRadius.circular(99),
                              ),
                              child: Text(
                                'Q${idx + 1}',
                                style: const TextStyle(
                                  color: AppColors.indigo,
                                  fontWeight: FontWeight.w700,
                                  fontSize: 12,
                                ),
                              ),
                            ),
                            const SizedBox(width: AppSpacing.sm),
                            Expanded(
                              child: Text(
                                rec.item.subject.label +
                                    (rec.item.chapterTitle.isNotEmpty
                                        ? ' · ${rec.item.chapterTitle}'
                                        : ''),
                                style: Theme.of(context).textTheme.labelMedium,
                              ),
                            ),
                            Icon(
                              isCorrect
                                  ? Icons.check_circle_rounded
                                  : Icons.cancel_rounded,
                              color: isCorrect ? Colors.green : Colors.red,
                              size: 20,
                            ),
                          ],
                        ),
                        const SizedBox(height: AppSpacing.sm),
                        Text(
                          rec.item.preview,
                          style: Theme.of(context).textTheme.bodyMedium
                              ?.copyWith(fontWeight: FontWeight.w600),
                        ),
                        const SizedBox(height: AppSpacing.sm),
                        if (!isCorrect) ...[
                          _ReviewRow(
                            label: 'Your answer',
                            value: selectedLabel,
                            color: Colors.red,
                            icon: Icons.close_rounded,
                          ),
                          const SizedBox(height: AppSpacing.xs),
                        ],
                        _ReviewRow(
                          label: 'Correct answer',
                          value: correctLabel,
                          color: Colors.green,
                          icon: Icons.check_rounded,
                        ),
                        if (rec.item.explanation != null &&
                            rec.item.explanation!.isNotEmpty) ...[
                          const SizedBox(height: AppSpacing.sm),
                          const Divider(height: 1),
                          const SizedBox(height: AppSpacing.sm),
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Icon(Icons.lightbulb_outline_rounded,
                                  size: 16, color: AppColors.indigo),
                              const SizedBox(width: AppSpacing.xs),
                              Expanded(
                                child: Text(
                                  rec.item.explanation!,
                                  style: Theme.of(context)
                                      .textTheme
                                      .bodySmall
                                      ?.copyWith(height: 1.45),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ],
                    ),
                  ),
                );
              }),
              const SizedBox(height: AppSpacing.lg),
              PrimaryButton(
                label: 'Back to Home',
                expanded: true,
                icon: Icons.home_rounded,
                onPressed: () => context.go('/dashboard/0'),
              ),
              const SizedBox(height: AppSpacing.md),
            ],
          ),
        ),
      ),
    );
  }
}

class _ReviewRow extends StatelessWidget {
  const _ReviewRow({
    required this.label,
    required this.value,
    required this.color,
    required this.icon,
  });

  final String label;
  final String value;
  final Color color;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(icon, size: 16, color: color),
        const SizedBox(width: AppSpacing.xs),
        Text(
          '$label: ',
          style: Theme.of(context)
              .textTheme
              .bodySmall
              ?.copyWith(color: AppColors.textSecondary),
        ),
        Expanded(
          child: Text(
            value,
            style: Theme.of(context)
                .textTheme
                .bodySmall
                ?.copyWith(fontWeight: FontWeight.w600, color: color),
          ),
        ),
      ],
    );
  }
}
