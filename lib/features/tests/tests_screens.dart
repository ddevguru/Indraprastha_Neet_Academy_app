import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/access/content_access.dart';
import '../../core/providers/app_state.dart';
import '../../core/services/onboarding_checklist_service.dart';
import '../content/data/content_repository.dart';
import '../onboarding/onboarding_checklist_widget.dart';
import '../../models/app_models.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import '../../widgets/fast_network_image.dart';
import '../../widgets/content_lock.dart';
import '../../widgets/paginated_answer_review.dart';

num? _asNum(dynamic value) {
  if (value is num) return value;
  if (value is String) return num.tryParse(value);
  return null;
}

String _formatTestScoreLabel(Map<String, dynamic> test) {
  final score = _asNum(test['last_score']);
  if (score == null) return '--';
  final marks = (_asNum(test['marks']) ?? 720).toInt();
  return '${score.toInt()} / $marks';
}

String _normalizedTestCategory(Map<String, dynamic> test) {
  final category = (test['category']?.toString() ?? '').toLowerCase();
  final title = (test['title']?.toString() ?? '').toLowerCase();
  final topic = (test['topic']?.toString() ?? '').toLowerCase();
  final subject = (test['subject']?.toString() ?? '').toLowerCase();
  final keywords = '$category $title';

  if (keywords.contains('student')) {
    return 'subject';
  }
  if (keywords.contains('subject')) {
    return 'subject';
  }
  if (keywords.contains('chapter') || keywords.contains('topic')) {
    return 'chapter';
  }
  if (keywords.contains('grand') || keywords.contains('full syllabus')) {
    return 'grand';
  }

  // Legacy admin entries sometimes missed the category field. Infer a best-effort
  // type from the title/topic so filters still work for already-created tests.
  if (subject.isNotEmpty) return 'subject';
  if (topic.isNotEmpty) return 'chapter';
  return 'grand';
}

List<Map<String, dynamic>> _questionsForReview({
  required List<Map<String, dynamic>> questions,
  Map<String, dynamic>? submitResponse,
}) {
  final enriched =
      submitResponse?['questionsWithExplanations'] as List<dynamic>?;
  if (enriched != null && enriched.isNotEmpty) {
    return List<Map<String, dynamic>>.from(
      enriched.map((e) => Map<String, dynamic>.from(e as Map)),
    );
  }
  return questions;
}

int? _scoreFromSubmitResponse(Map<String, dynamic>? response) {
  if (response == null) return null;
  final attempt = response['attempt'];
  if (attempt is Map) {
    final score = _asNum(attempt['score']);
    if (score != null) return score.toInt();
  }
  final ai = response['aiAnalytics'];
  if (ai is Map) {
    final score = _asNum(ai['score']);
    if (score != null) return score.toInt();
  }
  return null;
}

double? _accuracyFromSubmitResponse(Map<String, dynamic>? response) {
  if (response == null) return null;
  final analytics = response['analytics'];
  if (analytics is Map) {
    final accuracy = _asNum(analytics['overall_accuracy']);
    if (accuracy != null) return accuracy.toDouble();
  }
  return null;
}

Widget _buildQuestionImage(String rawUrl) {
  return FastNetworkImage(
    url: rawUrl,
    width: double.infinity,
    height: 180,
    fit: BoxFit.cover,
    thumbWidth: 700,
    borderRadius: BorderRadius.circular(AppRadii.md),
  );
}

class TestsScreen extends ConsumerStatefulWidget {
  const TestsScreen({super.key});

  @override
  ConsumerState<TestsScreen> createState() => _TestsScreenState();
}

class _TestsScreenState extends ConsumerState<TestsScreen> {
  late final Future<List<Map<String, dynamic>>> _testsFuture;
  String? _activeFilter;
  static const int _freeUnlockedTestCount = 3;

  static const _filters = [
    'Grand tests',
    'Subject tests',
    'Chapter tests',
    'Upcoming',
    'Completed',
  ];

  @override
  void initState() {
    super.initState();
    _testsFuture = ContentRepository().fetchTests();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      unawaited(completeOnboardingStep(
        ref,
        OnboardingChecklistStep.takeFirstTest,
      ));
    });
  }

  List<Map<String, dynamic>> _applyFilter(List<Map<String, dynamic>> tests) {
    if (_activeFilter == null) return tests;
    return tests.where((t) {
      final category = _normalizedTestCategory(t);
      final isCompleted = t['is_completed'] == true;
      return switch (_activeFilter) {
        'Grand tests' => category == 'grand',
        'Subject tests' => category == 'subject',
        'Chapter tests' => category == 'chapter',
        'Upcoming' => !isCompleted,
        'Completed' => isCompleted,
        _ => true,
      };
    }).toList();
  }

  String _sectionTitle() {
    return switch (_activeFilter) {
      'Grand tests' => 'Grand tests',
      'Subject tests' => 'Subject tests',
      'Chapter tests' => 'Chapter tests',
      'Upcoming' => 'Upcoming tests',
      'Completed' => 'Completed tests',
      _ => 'All tests',
    };
  }

  String _sectionSubtitle() {
    return switch (_activeFilter) {
      'Grand tests' => 'Full-syllabus grand mock tests.',
      'Subject tests' => 'Subject-wise mock tests.',
      'Chapter tests' => 'Chapter-wise tests for focused practice.',
      'Upcoming' => 'Prepare your next assessment windows with clarity.',
      'Completed' => 'Review your submitted tests and scores.',
      _ => 'Grand tests, subject tests, chapter tests, and more.',
    };
  }

  @override
  Widget build(BuildContext context) {
    final hasSubscription =
        ref.watch(appUiControllerProvider).hasActiveSubscription;
    return SingleChildScrollView(
      padding: mobileScrollPadding(context),
      child: CenteredContent(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SectionHeader(
              title: 'Test series',
              subtitle:
                  'Grand tests, subject tests, chapter tests, upcoming schedules, and result reviews.',
            ),
            if (!hasSubscription) ...[
              const SizedBox(height: AppSpacing.md),
              const FreePreviewBanner(),
            ],
            const SizedBox(height: AppSpacing.lg),
            const SearchBarWidget(
                hint: 'Search mocks, subject tests, and chapters'),
            const SizedBox(height: AppSpacing.lg),
            Wrap(
              spacing: AppSpacing.sm,
              runSpacing: AppSpacing.sm,
              children: _filters
                  .map(
                    (label) => _FilterChip(
                      label: label,
                      selected: _activeFilter == label,
                      onTap: () => setState(() {
                        _activeFilter = _activeFilter == label ? null : label;
                      }),
                    ),
                  )
                  .toList(),
            ),
            const SizedBox(height: AppSpacing.xl),
            SectionHeader(
              title: _sectionTitle(),
              subtitle: _sectionSubtitle(),
            ),
            const SizedBox(height: AppSpacing.md),
            FutureBuilder<List<Map<String, dynamic>>>(
              future: _testsFuture,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const SkeletonLoader(cardCount: 4);
                }
                final allTests = snapshot.data ?? const [];
                final tests = _applyFilter(allTests);
                if (allTests.isEmpty) {
                  return const EmptyStateWidget(
                    title: 'No tests yet',
                    subtitle:
                        'Admin panel se test series add hone ke baad yahan list dikhegi.',
                    icon: Icons.assignment_rounded,
                  );
                }
                if (tests.isEmpty) {
                  return EmptyStateWidget(
                    title:
                        'No ${_activeFilter?.toLowerCase() ?? 'tests'} found',
                    subtitle:
                        'Is category mein abhi koi test available nahi hai.',
                    icon: Icons.filter_list_rounded,
                  );
                }
                return Column(
                  children: tests.asMap().entries.map(
                    (entry) {
                      final index = allTests.indexWhere(
                        (t) => '${t['id']}' == '${entry.value['id']}',
                      );
                      final testIndex = index < 0 ? entry.key : index;
                      final locked = hasSubscription
                          ? false
                          : testIndex >= _freeUnlockedTestCount;
                      final t = entry.value;
                      return Padding(
                        padding: const EdgeInsets.only(bottom: AppSpacing.md),
                        child: TestCard(
                          locked: locked,
                          test: TestItem(
                            id: '${t['id']}',
                            title: t['title']?.toString() ?? 'Test',
                            category: t['category']?.toString() ?? 'Grand test',
                            durationMinutes:
                                (t['duration_minutes'] as num?)?.toInt() ?? 180,
                            marks: (t['marks'] as num?)?.toInt() ?? 720,
                            questions:
                                (t['question_count'] as num?)?.toInt() ?? 180,
                            syllabusCoverage:
                                t['syllabus_coverage']?.toString() ?? '',
                            scheduleLabel:
                                t['schedule_label']?.toString() ?? '',
                            completed: t['is_completed'] == true,
                            scoreLabel: _formatTestScoreLabel(t),
                          ),
                          onTap: () => ContentAccess.handleTap(
                            context: context,
                            locked: locked,
                            onUnlocked: () =>
                                context.push('/tests/detail/${t['id']}'),
                          ),
                        ),
                      );
                    },
                  ).toList(),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class TestDetailScreen extends ConsumerWidget {
  const TestDetailScreen({
    super.key,
    required this.testId,
  });

  final int testId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final hasSubscription =
        ref.watch(appUiControllerProvider).hasActiveSubscription;
    final accessFuture = ContentRepository().fetchTests().then((tests) {
      final ids = tests.map((t) => '${t['id']}').toList();
      return ContentAccess.isIdUnlocked(
        itemId: '$testId',
        orderedIds: ids,
        hasActiveSubscription: hasSubscription,
      );
    });
    final future = ContentRepository().fetchTestQuestions(testId);
    return FutureBuilder<List<dynamic>>(
      future: Future.wait([future, accessFuture]),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(
              body: Center(child: CircularProgressIndicator()));
        }
        final unlocked = snapshot.data?[1] as bool? ?? hasSubscription;
        if (!unlocked) {
          WidgetsBinding.instance.addPostFrameCallback((_) {
            if (context.mounted) ContentAccess.openSubscriptions(context);
          });
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }
        final testData = snapshot.data?[0] as Map<String, dynamic>?;
        final test =
            Map<String, dynamic>.from(testData?['test'] as Map? ?? const {});
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
                    Text(test['subject']?.toString() ?? '',
                        style: Theme.of(context).textTheme.labelLarge),
                    const SizedBox(height: AppSpacing.sm),
                    Text(test['title']?.toString() ?? '',
                        style: Theme.of(context).textTheme.headlineSmall),
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
      final actual =
          questions[i]['correct_option']?.toString().toUpperCase() ?? '';
      if (marked == actual) correct++;
    }
    final wrong = _answers.length - correct;
    final unattempted = questions.length - _answers.length;
    final marks = (test['marks'] as num?)?.toInt() ?? 720;
    final score =
        questions.isEmpty ? 0 : ((correct / questions.length) * marks).round();
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
    _attemptFuture =
        ContentRepository().fetchTestQuestions(widget.testId).then((data) {
      final questions = List<Map<String, dynamic>>.from(
        data['questions'] as List<dynamic>? ?? const [],
      );
      unawaited(
        warmImageCacheUrls(
          questions
              .map((q) => q['question_image_link']?.toString() ?? '')
              .where((url) => url.trim().isNotEmpty),
          thumbWidth: 700,
          maxItems: 12,
        ),
      );
      return data;
    });
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
          return const Scaffold(
              body: Center(child: CircularProgressIndicator()));
        }
        final test = Map<String, dynamic>.from(
            snapshot.data?['test'] as Map? ?? const {});
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
                            label: 'Review answers',
                            expanded: true,
                            icon: Icons.fact_check_rounded,
                            onPressed: () {
                              final response = _submitResponse ??
                                  _buildLocalSubmitResponse(
                                    questions: questions,
                                    test: test,
                                  );
                              final reviewQuestions = _questionsForReview(
                                questions: questions,
                                submitResponse: response,
                              );
                              final marks =
                                  (test['marks'] as num?)?.toInt() ?? 720;
                              final items = List.generate(
                                reviewQuestions.length,
                                (i) => AnswerReviewEntry.fromAbcdMap(
                                  question: reviewQuestions[i],
                                  index: i,
                                  selectedOption: _answers[i],
                                ),
                              );
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) =>
                                      PaginatedAnswerReviewScreen(
                                    title: 'Review Answers',
                                    items: items,
                                    score: _scoreFromSubmitResponse(response),
                                    totalMarks: marks,
                                    accuracy:
                                        _accuracyFromSubmitResponse(response),
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                      ],
                    ),
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
                    if ((q['question_image_link']?.toString() ?? '')
                        .isNotEmpty) ...[
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
                                color: selected == e.key
                                    ? AppColors.primaryDark
                                    : Theme.of(context).colorScheme.onSurface,
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
                            onPressed: _index == 0
                                ? null
                                : () => setState(() => _index--),
                          ),
                        ),
                        const SizedBox(width: AppSpacing.md),
                        Expanded(
                          child: PrimaryButton(
                            label: _index == questions.length - 1
                                ? 'Submit test'
                                : 'Next',
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
                                      final actual = questions[i]
                                                  ['correct_option']
                                              ?.toString()
                                              .toUpperCase() ??
                                          '';
                                      if (marked == actual) correct++;
                                    }
                                    final wrong = _answers.length - correct;
                                    final unattempted =
                                        questions.length - _answers.length;
                                    final marks =
                                        (test['marks'] as num?)?.toInt() ?? 720;
                                    final score = questions.isEmpty
                                        ? 0
                                        : ((correct / questions.length) * marks)
                                            .round();
                                    final accuracy = _answers.isEmpty
                                        ? 0.0
                                        : (correct / _answers.length) * 100;
                                    final messenger =
                                        ScaffoldMessenger.of(context);
                                    try {
                                      final res = await ContentRepository()
                                          .submitTestAttempt(
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
                                        _submitResponse =
                                            _buildLocalSubmitResponse(
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
                                      if (mounted) {
                                        setState(() => _submitting = false);
                                      }
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
  const _FilterChip({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.sm,
        ),
        decoration: BoxDecoration(
          color: selected
              ? AppColors.primary
              : isDark
                  ? AppColors.surfaceMuted.withValues(alpha: 0.22)
                  : AppColors.surface,
          borderRadius: BorderRadius.circular(99),
          border: Border.all(
            color: selected ? AppColors.primary : AppColors.border,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
            color: selected
                ? Colors.white
                : Theme.of(context).colorScheme.onSurface,
          ),
        ),
      ),
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
    final analytics =
        Map<String, dynamic>.from(response['analytics'] as Map? ?? const {});
    final attempt =
        Map<String, dynamic>.from(response['attempt'] as Map? ?? const {});
    final donut =
        Map<String, dynamic>.from(response['donut'] as Map? ?? const {});
    final correct = _asNum(donut['correct'])?.toInt() ??
        _asNum(analytics['correct_count'])?.toInt() ??
        0;
    final wrong = _asNum(donut['wrong'])?.toInt() ??
        _asNum(analytics['wrong_count'])?.toInt() ??
        0;
    final unattempted = _asNum(donut['unattempted'])?.toInt() ??
        _asNum(analytics['unattempted_count'])?.toInt() ??
        0;
    final score = _asNum(attempt['score'])?.toInt() ??
        _asNum((response['aiAnalytics'] as Map?)?['score'])?.toInt() ??
        0;
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
                      Text('Score',
                          style: Theme.of(context).textTheme.labelLarge),
                      const SizedBox(height: 6),
                      Text(
                        '$score / $marks',
                        style: Theme.of(context)
                            .textTheme
                            .headlineMedium
                            ?.copyWith(
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
              _DonutMini(
                  correct: correct, wrong: wrong, unattempted: unattempted),
            ],
          ),
          const SizedBox(height: AppSpacing.md),
          Text(
              'Correct: $correct  •  Wrong: $wrong  •  Unattempted: $unattempted'),
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
          const Text('Performance graph',
              style: TextStyle(fontWeight: FontWeight.w700)),
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
            final priority =
                (i['priority']?.toString() ?? 'medium').toLowerCase();
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
