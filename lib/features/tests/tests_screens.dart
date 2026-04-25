import 'dart:async';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../content/data/content_repository.dart';
import '../../models/app_models.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

class TestsScreen extends StatefulWidget {
  const TestsScreen({super.key});

  @override
  State<TestsScreen> createState() => _TestsScreenState();
}

class _TestsScreenState extends State<TestsScreen> {
  late final Future<List<Map<String, dynamic>>> _testsFuture;

  @override
  void initState() {
    super.initState();
    _testsFuture = ContentRepository().fetchTests();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppSpacing.lg),
      child: CenteredContent(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SectionHeader(
              title: 'Test series',
              subtitle:
                  'Grand tests, subject tests, chapter tests, upcoming schedules, and result reviews.',
            ),
            const SizedBox(height: AppSpacing.lg),
            const SearchBarWidget(hint: 'Search mocks, subject tests, and chapters'),
            const SizedBox(height: AppSpacing.lg),
            Wrap(
              spacing: AppSpacing.sm,
              runSpacing: AppSpacing.sm,
              children: const [
                _FilterChip('Grand tests'),
                _FilterChip('Subject tests'),
                _FilterChip('Chapter tests'),
                _FilterChip('Upcoming'),
                _FilterChip('Completed'),
              ],
            ),
            const SizedBox(height: AppSpacing.xl),
            const SectionHeader(
              title: 'Upcoming tests',
              subtitle: 'Prepare your next assessment windows with clarity.',
            ),
            const SizedBox(height: AppSpacing.md),
            FutureBuilder<List<Map<String, dynamic>>>(
              future: _testsFuture,
              builder: (context, snapshot) {
                final tests = snapshot.data ?? const [];
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }
                if (tests.isEmpty) {
                  return const EmptyStateWidget(
                    title: 'No tests yet',
                    subtitle: 'Admin panel se test series add hone ke baad yahan list dikhegi.',
                    icon: Icons.assignment_rounded,
                  );
                }
                return Column(
                  children: tests
                      .map(
                        (t) => Padding(
                          padding: const EdgeInsets.only(bottom: AppSpacing.md),
                          child: TestCard(
                            test: TestItem(
                              id: '${t['id']}',
                              title: t['title']?.toString() ?? 'Test',
                              category: t['category']?.toString() ?? 'Grand test',
                              durationMinutes: (t['duration_minutes'] as num?)?.toInt() ?? 180,
                              marks: (t['marks'] as num?)?.toInt() ?? 720,
                              questions: (t['question_count'] as num?)?.toInt() ?? 180,
                              syllabusCoverage: t['syllabus_coverage']?.toString() ?? '',
                              scheduleLabel: t['schedule_label']?.toString() ?? '',
                              completed: false,
                              scoreLabel: '--',
                            ),
                            onTap: () => context.push('/tests/detail/${t['id']}'),
                          ),
                        ),
                      )
                      .toList(),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class TestDetailScreen extends StatelessWidget {
  const TestDetailScreen({
    super.key,
    required this.testId,
  });

  final int testId;

  @override
  Widget build(BuildContext context) {
    final future = ContentRepository().fetchTestQuestions(testId);
    return FutureBuilder<Map<String, dynamic>>(
      future: future,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(body: Center(child: CircularProgressIndicator()));
        }
        final test = Map<String, dynamic>.from(snapshot.data?['test'] as Map? ?? const {});
        return Scaffold(
          appBar: AppBar(title: Text(test['title']?.toString() ?? 'Test')),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: CenteredContent(
              maxWidth: 960,
              child: SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(test['subject']?.toString() ?? '', style: Theme.of(context).textTheme.labelLarge),
                    const SizedBox(height: AppSpacing.sm),
                    Text(test['title']?.toString() ?? '', style: Theme.of(context).textTheme.headlineSmall),
                    const SizedBox(height: AppSpacing.lg),
                    Row(
                      children: [
                        Expanded(
                          child: StatCard(
                            title: 'Duration',
                            value: '${test['duration_minutes'] ?? 180} min',
                            subtitle: 'Set by admin',
                            icon: Icons.schedule_rounded,
                          ),
                        ),
                        const SizedBox(width: AppSpacing.md),
                        Expanded(
                          child: StatCard(
                            title: 'Questions',
                            value: '${test['question_count'] ?? 0}',
                            subtitle: '${test['marks'] ?? 0} marks',
                            icon: Icons.help_outline_rounded,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.xl),
                    PrimaryButton(
                      label: 'Start test',
                      expanded: true,
                      icon: Icons.play_arrow_rounded,
                      onPressed: () => context.push('/tests/result/$testId'),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}

class TestResultScreen extends StatefulWidget {
  const TestResultScreen({
    super.key,
    required this.testId,
  });

  final int testId;

  @override
  State<TestResultScreen> createState() => _TestResultScreenState();
}

class _TestResultScreenState extends State<TestResultScreen> {
  int _index = 0;
  int _timeLeft = 0;
  bool _submitted = false;
  bool _submitting = false;
  final Map<int, String> _answers = {};
  late final Future<Map<String, dynamic>> _attemptFuture;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _attemptFuture = ContentRepository().fetchTestQuestions(widget.testId);
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: _attemptFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(body: Center(child: CircularProgressIndicator()));
        }
        final test = Map<String, dynamic>.from(snapshot.data?['test'] as Map? ?? const {});
        final questions = List<Map<String, dynamic>>.from(
          snapshot.data?['questions'] as List<dynamic>? ?? const [],
        );
        if (_timeLeft == 0 && !_submitted) {
          _timeLeft = ((test['duration_minutes'] as num?)?.toInt() ?? 180) * 60;
          _timer ??= Timer.periodic(const Duration(seconds: 1), (timer) {
            if (!mounted || _submitted) {
              timer.cancel();
              return;
            }
            if (_timeLeft <= 0) {
              timer.cancel();
              setState(() => _submitted = true);
              return;
            }
            setState(() => _timeLeft--);
          });
        }
        if (questions.isEmpty) {
          return const Scaffold(
            body: Center(
              child: EmptyStateWidget(
                title: 'No questions in this test',
                subtitle: 'Admin panel me test questions add karein.',
                icon: Icons.help_outline_rounded,
              ),
            ),
          );
        }
        final q = questions[_index.clamp(0, questions.length - 1)];
        final selected = _answers[_index];
        final options = <String, String>{
          'A': q['option_a']?.toString() ?? '',
          'B': q['option_b']?.toString() ?? '',
          'C': q['option_c']?.toString() ?? '',
          'D': q['option_d']?.toString() ?? '',
        };
        return Scaffold(
          appBar: AppBar(
            title: Text(test['title']?.toString() ?? 'Test Attempt'),
            actions: [
              Padding(
                padding: const EdgeInsets.only(right: 14, top: 14),
                child: Text(
                  '${(_timeLeft ~/ 60).toString().padLeft(2, '0')}:${(_timeLeft % 60).toString().padLeft(2, '0')}',
                  style: const TextStyle(fontWeight: FontWeight.w700),
                ),
              ),
            ],
          ),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: CenteredContent(
              maxWidth: 980,
              child: SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Q ${_index + 1}/${questions.length}',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: AppSpacing.md),
                    Text(q['question']?.toString() ?? ''),
                    const SizedBox(height: AppSpacing.lg),
                    ...options.entries.map(
                      (e) => Padding(
                        padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                        child: OutlinedButton(
                          onPressed: _submitted
                              ? null
                              : () => setState(() => _answers[_index] = e.key),
                          style: OutlinedButton.styleFrom(
                            minimumSize: const Size.fromHeight(52),
                            backgroundColor: selected == e.key
                                ? AppColors.indigoSoft
                                : Theme.of(context).cardColor,
                            side: BorderSide(
                              color: selected == e.key
                                  ? AppColors.indigo
                                  : AppColors.border,
                            ),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(AppRadii.md),
                            ),
                          ),
                          child: Align(
                            alignment: Alignment.centerLeft,
                            child: Text(
                              '${e.key}) ${e.value}',
                              style: TextStyle(
                                fontWeight: selected == e.key
                                    ? FontWeight.w700
                                    : FontWeight.w500,
                                color: AppColors.textPrimary,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    Row(
                      children: [
                        Expanded(
                          child: SecondaryButton(
                            label: 'Previous',
                            onPressed: _index == 0 ? null : () => setState(() => _index--),
                          ),
                        ),
                        const SizedBox(width: AppSpacing.md),
                        Expanded(
                          child: PrimaryButton(
                            label: _index == questions.length - 1 ? 'Submit test' : 'Next',
                            onPressed: _submitting
                                ? null
                                : () async {
                              if (_index < questions.length - 1) {
                                setState(() => _index++);
                                return;
                              }
                              setState(() => _submitting = true);
                              int correct = 0;
                              for (var i = 0; i < questions.length; i++) {
                                final marked = _answers[i];
                                final actual =
                                    questions[i]['correct_option']?.toString().toUpperCase() ?? '';
                                if (marked == actual) correct++;
                              }
                              final wrong = _answers.length - correct;
                              final unattempted = questions.length - _answers.length;
                              final marks = (test['marks'] as num?)?.toInt() ?? 720;
                              final score = questions.isEmpty
                                  ? 0
                                  : ((correct / questions.length) * marks).round();
                              final accuracy = _answers.isEmpty
                                  ? 0.0
                                  : (correct / _answers.length) * 100;
                              try {
                                await ContentRepository().submitTestAttempt(
                                  testId: widget.testId,
                                  score: score,
                                  accuracy: accuracy,
                                  correctCount: correct,
                                  wrongCount: wrong,
                                  unattemptedCount: unattempted,
                                );
                                if (!mounted) return;
                                final messenger = ScaffoldMessenger.of(context);
                                setState(() => _submitted = true);
                                messenger.showSnackBar(
                                  SnackBar(
                                    content: Text(
                                      'Submitted: Score $score/$marks | Correct $correct',
                                    ),
                                  ),
                                );
                              } catch (e) {
                                if (!mounted) return;
                                final messenger = ScaffoldMessenger.of(context);
                                messenger.showSnackBar(
                                  SnackBar(
                                    content: Text('Submit failed: $e'),
                                  ),
                                );
                              } finally {
                                if (mounted) setState(() => _submitting = false);
                              }
                            },
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}

class _FilterChip extends StatelessWidget {
  const _FilterChip(this.label);

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.sm,
      ),
      decoration: BoxDecoration(
        color: Theme.of(context).brightness == Brightness.dark
            ? AppColors.surfaceMuted.withValues(alpha: 0.22)
            : AppColors.surface,
        borderRadius: BorderRadius.circular(99),
        border: Border.all(color: AppColors.border),
      ),
      child: Text(label),
    );
  }
}
