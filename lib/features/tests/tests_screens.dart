import 'dart:async';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../content/data/content_repository.dart';
import '../../models/app_models.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

String _resolveDriveImageUrl(String raw) {
  final value = raw.trim();
  if (value.isEmpty) return value;
  final uri = Uri.tryParse(value);
  if (uri == null) return value;
  String? id = uri.queryParameters['id'];
  if (id == null || id.isEmpty) {
    final parts = uri.pathSegments;
    final fileIdx = parts.indexOf('file');
    if (fileIdx >= 0 && fileIdx + 2 < parts.length && parts[fileIdx + 1] == 'd') {
      id = parts[fileIdx + 2];
    }
  }
  if (id == null || id.isEmpty) return value;
  return 'https://drive.google.com/uc?export=view&id=$id';
}

num? _asNum(dynamic value) {
  if (value is num) return value;
  if (value is String) return num.tryParse(value);
  return null;
}

Widget _buildQuestionImage(String rawUrl) {
  return ClipRRect(
    borderRadius: BorderRadius.circular(AppRadii.md),
    child: Image.network(
      _resolveDriveImageUrl(rawUrl),
      fit: BoxFit.cover,
      filterQuality: FilterQuality.low,
      loadingBuilder: (context, child, progress) {
        if (progress == null) return child;
        return Container(
          height: 180,
          alignment: Alignment.center,
          color: AppColors.surfaceMuted,
          child: const CircularProgressIndicator(strokeWidth: 2),
        );
      },
      errorBuilder: (_, __, ___) => Container(
        height: 120,
        alignment: Alignment.center,
        color: AppColors.surfaceMuted,
        child: const Text('Image unavailable'),
      ),
    ),
  );
}

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
                            // completed status from backend latest attempts
                            test: TestItem(
                              id: '${t['id']}',
                              title: t['title']?.toString() ?? 'Test',
                              category: t['category']?.toString() ?? 'Grand test',
                              durationMinutes: (t['duration_minutes'] as num?)?.toInt() ?? 180,
                              marks: (t['marks'] as num?)?.toInt() ?? 720,
                              questions: (t['question_count'] as num?)?.toInt() ?? 180,
                              syllabusCoverage: t['syllabus_coverage']?.toString() ?? '',
                              scheduleLabel: t['schedule_label']?.toString() ?? '',
                              completed: t['is_completed'] == true,
                              scoreLabel: (t['last_score']?.toString() ?? '--'),
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
  Map<String, dynamic>? _submitResponse;
  bool _showReview = false;
  final Map<int, String> _answers = {};
  late final Future<Map<String, dynamic>> _attemptFuture;
  Timer? _timer;

  Map<String, dynamic> _buildLocalSubmitResponse({
    required List<Map<String, dynamic>> questions,
    required Map<String, dynamic> test,
  }) {
    var correct = 0;
    for (var i = 0; i < questions.length; i++) {
      final marked = _answers[i];
      final actual = questions[i]['correct_option']?.toString().toUpperCase() ?? '';
      if (marked == actual) correct++;
    }
    final wrong = _answers.length - correct;
    final unattempted = questions.length - _answers.length;
    final marks = (test['marks'] as num?)?.toInt() ?? 720;
    final score = questions.isEmpty ? 0 : ((correct / questions.length) * marks).round();
    final accuracy = _answers.isEmpty ? 0.0 : (correct / _answers.length) * 100;
    return {
      'attempt': {
        'score': score,
      },
      'analytics': {
        'overall_accuracy': accuracy,
        'correct_count': correct,
        'wrong_count': wrong,
        'unattempted_count': unattempted,
      },
      'donut': {
        'correct': correct,
        'wrong': wrong,
        'unattempted': unattempted,
      },
      'insights': const <Map<String, dynamic>>[],
    };
  }

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
        if (_submitted) {
          final response = _submitResponse ??
              _buildLocalSubmitResponse(
                questions: questions,
                test: test,
              );
          return Scaffold(
            appBar: AppBar(
              title: Text(test['title']?.toString() ?? 'Test Result'),
            ),
            body: SingleChildScrollView(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: CenteredContent(
                maxWidth: 980,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _ScoreSummaryCard(
                      testTitle: test['title']?.toString() ?? 'Test',
                      marks: (test['marks'] as num?)?.toInt() ?? 720,
                      questions: questions.length,
                      response: response,
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    _AiInsightsPanel(
                      insights: List<Map<String, dynamic>>.from(
                        (response['insights'] as List<dynamic>?) ?? const [],
                      ),
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    Row(
                      children: [
                        Expanded(
                          child: PrimaryButton(
                            label: _showReview ? 'Hide review' : 'Review answers',
                            expanded: true,
                            icon: Icons.fact_check_rounded,
                            onPressed: () => setState(() => _showReview = !_showReview),
                          ),
                        ),
                      ],
                    ),
                    if (_showReview) ...[
                      const SizedBox(height: AppSpacing.lg),
                      _AnswerReviewPanel(
                        questions: questions,
                        answers: _answers,
                      ),
                    ],
                  ],
                ),
              ),
            ),
          );
        }

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
                    if ((q['question_image_link']?.toString() ?? '').isNotEmpty) ...[
                      const SizedBox(height: AppSpacing.md),
                      _buildQuestionImage(q['question_image_link'].toString()),
                    ],
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
                              final messenger = ScaffoldMessenger.of(context);
                              try {
                                final res = await ContentRepository().submitTestAttempt(
                                  testId: widget.testId,
                                  score: score,
                                  accuracy: accuracy,
                                  correctCount: correct,
                                  wrongCount: wrong,
                                  unattemptedCount: unattempted,
                                );
                                if (!mounted) return;
                                setState(() {
                                  _submitted = true;
                                  _submitResponse = res;
                                });
                              } catch (e) {
                                if (!mounted) return;
                                setState(() {
                                  _submitted = true;
                                  _submitResponse = _buildLocalSubmitResponse(
                                    questions: questions,
                                    test: test,
                                  );
                                });
                                messenger.showSnackBar(
                                  SnackBar(
                                    content: Text(
                                      'Server submit failed, local result shown. Error: $e',
                                    ),
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

class _ScoreSummaryCard extends StatelessWidget {
  const _ScoreSummaryCard({
    required this.testTitle,
    required this.marks,
    required this.questions,
    required this.response,
  });

  final String testTitle;
  final int marks;
  final int questions;
  final Map<String, dynamic> response;

  @override
  Widget build(BuildContext context) {
    final analytics = Map<String, dynamic>.from(response['analytics'] as Map? ?? const {});
    final attempt = Map<String, dynamic>.from(response['attempt'] as Map? ?? const {});
    final donut = Map<String, dynamic>.from(response['donut'] as Map? ?? const {});
    final correct = _asNum(donut['correct'])?.toInt() ?? _asNum(analytics['correct_count'])?.toInt() ?? 0;
    final wrong = _asNum(donut['wrong'])?.toInt() ?? _asNum(analytics['wrong_count'])?.toInt() ?? 0;
    final unattempted =
        _asNum(donut['unattempted'])?.toInt() ?? _asNum(analytics['unattempted_count'])?.toInt() ?? 0;
    final score = _asNum(attempt['score'])?.toInt() ?? 0;
    final accuracy = _asNum(analytics['overall_accuracy'])?.toDouble() ?? 0.0;

    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Result', style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: AppSpacing.sm),
          Text(testTitle, style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: AppSpacing.lg),
          Row(
            children: [
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(AppSpacing.lg),
                  decoration: BoxDecoration(
                    color: AppColors.indigoSoft,
                    borderRadius: BorderRadius.circular(AppRadii.md),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Score', style: Theme.of(context).textTheme.labelLarge),
                      const SizedBox(height: 6),
                      Text(
                        '$score / $marks',
                        style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                              fontWeight: FontWeight.w800,
                              color: AppColors.indigo,
                            ),
                      ),
                      const SizedBox(height: 6),
                      Text('Accuracy: ${accuracy.toStringAsFixed(1)}%'),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              _DonutMini(correct: correct, wrong: wrong, unattempted: unattempted),
            ],
          ),
          const SizedBox(height: AppSpacing.md),
          Text('Correct: $correct  •  Wrong: $wrong  •  Unattempted: $unattempted'),
        ],
      ),
    );
  }
}

class _DonutMini extends StatelessWidget {
  const _DonutMini({
    required this.correct,
    required this.wrong,
    required this.unattempted,
  });

  final int correct;
  final int wrong;
  final int unattempted;

  @override
  Widget build(BuildContext context) {
    final total = (correct + wrong + unattempted).clamp(1, 1000000);
    final correctPct = correct / total * 100;
    final wrongPct = wrong / total * 100;
    final unattemptedPct = unattempted / total * 100;

    return SizedBox(
      width: 180,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Performance graph', style: TextStyle(fontWeight: FontWeight.w700)),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(999),
            child: Row(
              children: [
                if (correct > 0)
                  Expanded(
                    flex: correct,
                    child: Container(height: 12, color: AppColors.success),
                  ),
                if (wrong > 0)
                  Expanded(
                    flex: wrong,
                    child: Container(height: 12, color: AppColors.danger),
                  ),
                if (unattempted > 0)
                  Expanded(
                    flex: unattempted,
                    child: Container(height: 12, color: AppColors.indigo),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 8),
          Text('Correct: ${correctPct.toStringAsFixed(0)}%'),
          Text('Wrong: ${wrongPct.toStringAsFixed(0)}%'),
          Text('Unattempted: ${unattemptedPct.toStringAsFixed(0)}%'),
        ],
      ),
    );
  }
}

class _AiInsightsPanel extends StatelessWidget {
  const _AiInsightsPanel({required this.insights});

  final List<Map<String, dynamic>> insights;

  @override
  Widget build(BuildContext context) {
    if (insights.isEmpty) {
      return const EmptyStateWidget(
        title: 'AI insights will appear here',
        subtitle: 'Submit a test to generate performance recommendations.',
        icon: Icons.auto_awesome_rounded,
      );
    }
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('AI Insights', style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: AppSpacing.sm),
          ...insights.map((i) {
            final title = i['insight_title']?.toString() ?? 'Insight';
            final body = i['insight_body']?.toString() ?? '';
            final priority = (i['priority']?.toString() ?? 'medium').toLowerCase();
            final color = priority == 'high'
                ? AppColors.danger
                : priority == 'low'
                    ? AppColors.textSecondary
                    : AppColors.indigo;
            return Padding(
              padding: const EdgeInsets.only(bottom: AppSpacing.md),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.all(AppSpacing.lg),
                decoration: BoxDecoration(
                  color: Theme.of(context).brightness == Brightness.dark
                      ? AppColors.surfaceMuted.withValues(alpha: 0.25)
                      : AppColors.surfaceMuted,
                  borderRadius: BorderRadius.circular(AppRadii.md),
                  border: Border.all(color: AppColors.border),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.bolt_rounded, color: color),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            title,
                            style: Theme.of(context)
                                .textTheme
                                .titleMedium
                                ?.copyWith(fontWeight: FontWeight.w800),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(body),
                  ],
                ),
              ),
            );
          }),
        ],
      ),
    );
  }
}

class _AnswerReviewPanel extends StatelessWidget {
  const _AnswerReviewPanel({
    required this.questions,
    required this.answers,
  });

  final List<Map<String, dynamic>> questions;
  final Map<int, String> answers;

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Answer review', style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: AppSpacing.sm),
          ...List.generate(questions.length, (i) {
            final q = questions[i];
            final selected = answers[i]?.toUpperCase();
            final correct = q['correct_option']?.toString().toUpperCase() ?? '';
            final options = <String, String>{
              'A': q['option_a']?.toString() ?? '',
              'B': q['option_b']?.toString() ?? '',
              'C': q['option_c']?.toString() ?? '',
              'D': q['option_d']?.toString() ?? '',
            };
            final isCorrect = selected != null && selected == correct;
            return Padding(
              padding: const EdgeInsets.only(bottom: AppSpacing.lg),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Q${i + 1}. ${q['question'] ?? ''}',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: options.entries.map((e) {
                      final key = e.key;
                      final val = e.value;
                      final isSel = selected == key;
                      final isRight = key == correct;
                      Color bg = Theme.of(context).cardColor;
                      Color border = AppColors.border;
                      if (isRight) {
                        bg = const Color(0xFFE7F8EF);
                        border = AppColors.success;
                      } else if (isSel && !isRight) {
                        bg = const Color(0xFFFCEAEA);
                        border = AppColors.danger;
                      }
                      return Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: bg,
                          borderRadius: BorderRadius.circular(AppRadii.md),
                          border: Border.all(color: border),
                        ),
                        child: Text('$key) $val'),
                      );
                    }).toList(),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    selected == null
                        ? 'Your answer: Not attempted'
                        : 'Your answer: $selected  •  ${isCorrect ? "Correct" : "Wrong"}',
                    style: TextStyle(
                      fontWeight: FontWeight.w700,
                      color: selected == null
                          ? AppColors.textSecondary
                          : (isCorrect ? AppColors.success : AppColors.danger),
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text('Explanation: ${q['explanation'] ?? ''}'),
                  const Divider(height: 24),
                ],
              ),
            );
          }),
        ],
      ),
    );
  }
}
