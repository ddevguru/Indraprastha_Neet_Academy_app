import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../core/providers/daily_mcqs_provider.dart';
import '../../models/daily_mcq_item.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

// Preview screen: shows count & subjects before the user starts.
class TodaysMcqTestPreviewScreen extends ConsumerWidget {
  const TodaysMcqTestPreviewScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final async = ref.watch(mcqOfDayProvider);
    final dateLabel = DateFormat('EEEE, d MMM yyyy').format(DateTime.now());

    return Scaffold(
      appBar: AppBar(title: const Text("Today's MCQ test")),
      body: async.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('Error: $e')),
        data: (mcqs) {
          final active = mcqs.active;
          final subjects = active.map((m) => m.subject).where((s) => s.isNotEmpty).toSet().toList();

          return SingleChildScrollView(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: CenteredContent(
              maxWidth: 560,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Before you start',
                      style: Theme.of(context).textTheme.headlineSmall),
                  const SizedBox(height: AppSpacing.sm),
                  Text(
                    'Review today\'s MCQ set and tap Start when you are ready.',
                    style: Theme.of(context)
                        .textTheme
                        .bodyMedium
                        ?.copyWith(color: AppColors.textSecondary),
                  ),
                  const SizedBox(height: AppSpacing.xl),
                  SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("Today's MCQ test",
                            style: Theme.of(context).textTheme.titleLarge),
                        const SizedBox(height: AppSpacing.xs),
                        Text(dateLabel,
                            style: Theme.of(context).textTheme.bodySmall),
                        const Divider(height: AppSpacing.xl),
                        _PreviewRow(
                          icon: Icons.quiz_outlined,
                          label: 'Questions',
                          value: active.isEmpty
                              ? '0 — no MCQs in today\'s window'
                              : '${active.length} MCQ${active.length == 1 ? '' : 's'}',
                        ),
                        if (subjects.isNotEmpty) ...[
                          const SizedBox(height: AppSpacing.md),
                          _PreviewRow(
                            icon: Icons.school_outlined,
                            label: 'Subjects',
                            value: subjects.join(', '),
                          ),
                        ],
                        if (active.isNotEmpty) ...[
                          const SizedBox(height: AppSpacing.md),
                          Text('Topics',
                              style: Theme.of(context).textTheme.titleSmall),
                          const SizedBox(height: AppSpacing.sm),
                          ...active.map((q) => Padding(
                                padding: const EdgeInsets.only(
                                    bottom: AppSpacing.xs),
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Icon(Icons.circle,
                                        size: 6, color: AppColors.indigo),
                                    const SizedBox(width: AppSpacing.sm),
                                    Expanded(
                                        child: Text(
                                      q.topic.isNotEmpty
                                          ? '${q.subject} · ${q.topic}'
                                          : q.subject.isNotEmpty
                                              ? q.subject
                                              : 'General',
                                    )),
                                  ],
                                ),
                              )),
                        ],
                      ],
                    ),
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  PrimaryButton(
                    label: 'Start test',
                    icon: Icons.play_arrow_rounded,
                    onPressed: active.isEmpty
                        ? null
                        : () => context.push('/todays-mcq-test/attempt'),
                  ),
                  const SizedBox(height: AppSpacing.md),
                  Center(
                    child: TextButton(
                      onPressed: () => context.push('/todays-mcqs'),
                      child: const Text('View all MCQs & archived'),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
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
              Text(label,
                  style: Theme.of(context)
                      .textTheme
                      .labelMedium
                      ?.copyWith(color: AppColors.textSecondary)),
              Text(value, style: Theme.of(context).textTheme.bodyLarge),
            ],
          ),
        ),
      ],
    );
  }
}

// Attempt screen: shows real MCQs one by one with scoring.
class TodaysMcqTestAttemptScreen extends ConsumerStatefulWidget {
  const TodaysMcqTestAttemptScreen({super.key});

  @override
  ConsumerState<TodaysMcqTestAttemptScreen> createState() =>
      _TodaysMcqTestAttemptScreenState();
}

class _TodaysMcqTestAttemptScreenState
    extends ConsumerState<TodaysMcqTestAttemptScreen> {
  int _index = 0;
  String? _selected;
  bool _submitted = false;
  int _correctCount = 0;

  void _next(List<McqOfDay> active) {
    if (_index >= active.length - 1) {
      _showResult(active.length);
    } else {
      setState(() {
        _index++;
        _selected = null;
        _submitted = false;
      });
    }
  }

  void _showResult(int total) {
    showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        title: const Text('Test complete!'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              '$_correctCount / $total correct',
              style: Theme.of(ctx).textTheme.headlineMedium?.copyWith(
                    color: AppColors.indigo,
                    fontWeight: FontWeight.w800,
                  ),
            ),
            const SizedBox(height: 8),
            Text(
                'Accuracy: ${total > 0 ? (_correctCount * 100 ~/ total) : 0}%'),
          ],
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
  }

  @override
  Widget build(BuildContext context) {
    final async = ref.watch(mcqOfDayProvider);
    return async.when(
      loading: () => const Scaffold(
          body: Center(child: CircularProgressIndicator())),
      error: (e, _) => Scaffold(
        appBar: AppBar(title: const Text("Today's MCQ test")),
        body: Center(child: Text('Error: $e')),
      ),
      data: (mcqs) {
        final active = mcqs.active;
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
                      'No active MCQs. Check back after the admin adds today\'s set.',
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    FilledButton(
                      onPressed: context.pop,
                      child: const Text('Back'),
                    ),
                  ],
                ),
              ),
            ),
          );
        }

        final q = active[_index.clamp(0, active.length - 1)];
        final correct = q.correctOption;

        return Scaffold(
          appBar: AppBar(
            title: const Text("Today's MCQ test"),
            bottom: PreferredSize(
              preferredSize: const Size.fromHeight(4),
              child: LinearProgressIndicator(
                value: (_index + 1) / active.length,
                backgroundColor: AppColors.border,
                color: AppColors.indigo,
              ),
            ),
          ),
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
                          subtitle: 'Questions',
                          icon: Icons.timelapse_rounded,
                        ),
                      ),
                      const SizedBox(width: AppSpacing.md),
                      Expanded(
                        child: StatCard(
                          title: 'Score',
                          value: '$_correctCount correct',
                          subtitle: 'so far',
                          icon: Icons.check_circle_outline_rounded,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        if (q.subject.isNotEmpty || q.topic.isNotEmpty)
                          Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: AppSpacing.sm,
                                vertical: AppSpacing.xs),
                            decoration: BoxDecoration(
                              color: AppColors.indigoSoft,
                              borderRadius: BorderRadius.circular(99),
                            ),
                            child: Text(
                              [q.subject, q.topic]
                                  .where((s) => s.isNotEmpty)
                                  .join(' · '),
                              style: const TextStyle(
                                color: AppColors.indigo,
                                fontWeight: FontWeight.w600,
                                fontSize: 13,
                              ),
                            ),
                          ),
                        const SizedBox(height: AppSpacing.md),
                        Text(
                          q.question,
                          style: Theme.of(context)
                              .textTheme
                              .titleSmall
                              ?.copyWith(
                                  fontWeight: FontWeight.w600, height: 1.5),
                        ),
                        if (q.questionImageLink.isNotEmpty) ...[
                          const SizedBox(height: AppSpacing.sm),
                          ClipRRect(
                            borderRadius: BorderRadius.circular(AppRadii.md),
                            child: Image.network(
                              q.questionImageLink,
                              fit: BoxFit.contain,
                              errorBuilder: (_, _, _) => const SizedBox.shrink(),
                            ),
                          ),
                        ],
                        const SizedBox(height: AppSpacing.lg),
                        ...q.options.entries.map((e) {
                          final isSel = _selected == e.key;
                          final isCorrect = _submitted && e.key == correct;
                          final isWrong =
                              _submitted && isSel && e.key != correct;
                          return Padding(
                            padding:
                                const EdgeInsets.only(bottom: AppSpacing.md),
                            child: InkWell(
                              onTap: _submitted
                                  ? null
                                  : () => setState(() => _selected = e.key),
                              borderRadius:
                                  BorderRadius.circular(AppRadii.md),
                              child: Container(
                                width: double.infinity,
                                padding: const EdgeInsets.all(AppSpacing.md),
                                decoration: BoxDecoration(
                                  color: isCorrect
                                      ? const Color(0xFFE7F8EF)
                                      : isWrong
                                          ? const Color(0xFFFCEAEA)
                                          : isSel
                                              ? AppColors.indigoSoft
                                              : AppColors.surfaceMuted,
                                  borderRadius:
                                      BorderRadius.circular(AppRadii.md),
                                  border: Border.all(
                                    color: isCorrect
                                        ? AppColors.success
                                        : isWrong
                                            ? AppColors.danger
                                            : isSel
                                                ? AppColors.indigo
                                                : AppColors.border,
                                  ),
                                ),
                                child: Text('${e.key})  ${e.value}'),
                              ),
                            ),
                          );
                        }),
                        if (_submitted && q.explanation.isNotEmpty) ...[
                          const Divider(),
                          const SizedBox(height: AppSpacing.xs),
                          Text(
                            'Explanation',
                            style: Theme.of(context)
                                .textTheme
                                .labelLarge
                                ?.copyWith(
                                    color: AppColors.indigo,
                                    fontWeight: FontWeight.w700),
                          ),
                          const SizedBox(height: AppSpacing.xs),
                          Text(q.explanation,
                              style: Theme.of(context).textTheme.bodySmall),
                        ],
                      ],
                    ),
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  if (!_submitted)
                    PrimaryButton(
                      label: 'Submit answer',
                      icon: Icons.check_rounded,
                      onPressed: _selected == null
                          ? null
                          : () => setState(() {
                                _submitted = true;
                                if (_selected == correct) _correctCount++;
                              }),
                    )
                  else
                    PrimaryButton(
                      label: _index >= active.length - 1
                          ? 'Finish test'
                          : 'Next question',
                      icon: Icons.arrow_forward_rounded,
                      onPressed: () => _next(active),
                    ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
