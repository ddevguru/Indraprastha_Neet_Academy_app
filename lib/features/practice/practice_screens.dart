import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:share_plus/share_plus.dart';

import '../../core/access/content_access.dart';
import '../../core/providers/app_state.dart';
import '../../core/services/onboarding_checklist_service.dart';
import '../../core/services/practice_saved_store.dart';
import '../content/data/content_repository.dart';
import '../onboarding/onboarding_checklist_widget.dart';
import '../../models/app_models.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import '../../widgets/content_lock.dart';
import '../../widgets/paginated_answer_review.dart';
import '../../widgets/fast_network_image.dart';
import '../../core/utils/drive_image_url.dart';
import '../../core/utils/question_fields.dart';

String _optionLabel(int index, String value) => formatOptionLabel(
      String.fromCharCode(65 + index),
      value,
    );

Widget _buildQuestionImage(String rawUrl) {
  return FastNetworkImage(
    url: rawUrl,
    width: double.infinity,
    height: 220,
    fit: BoxFit.contain,
    thumbWidth: 900,
    borderRadius: BorderRadius.circular(AppRadii.md),
  );
}

class PracticeHomeScreen extends ConsumerStatefulWidget {
  const PracticeHomeScreen({super.key});

  @override
  ConsumerState<PracticeHomeScreen> createState() => _PracticeHomeScreenState();
}

class _PracticeHomeScreenState extends ConsumerState<PracticeHomeScreen> {
  late final Future<List<Map<String, dynamic>>> _practiceFuture;

  @override
  void initState() {
    super.initState();
    _practiceFuture = ContentRepository().fetchPracticeSets();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      unawaited(completeOnboardingStep(
        ref,
        OnboardingChecklistStep.attemptFirstPractice,
      ));
    });
  }

  void _onCategoryTap(
    BuildContext context,
    String label,
    List<Map<String, dynamic>> allSets,
    bool hasSubscription,
  ) {
    switch (label) {
      case 'Topic-wise MCQs':
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => TopicWiseMcqsScreen(
              allSets: allSets,
              hasActiveSubscription: hasSubscription,
            ),
          ),
        );
      case 'Custom practice':
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => CustomPracticeScreen(
              allSets: allSets,
              hasActiveSubscription: hasSubscription,
            ),
          ),
        );
      case 'Incorrect questions':
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => const IncorrectQuestionsScreen(),
          ),
        );
      case 'Bookmarked questions':
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => const BookmarkedQuestionsScreen(),
          ),
        );
      default:
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('$label — coming soon')),
        );
    }
  }

  @override
  Widget build(BuildContext context) {
    final hasSubscription = ref.watch(appUiControllerProvider).hasActiveSubscription;
    final savedPractice = ref.watch(practiceSavedControllerProvider);
    const categories = [
      ('Topic-wise MCQs', Icons.grid_view_rounded),
      ('PYQs', Icons.history_edu_rounded),
      ('Custom practice', Icons.tune_rounded),
      ('Incorrect questions', Icons.refresh_rounded),
      ('Bookmarked questions', Icons.bookmark_rounded),
    ];

    int? countFor(String label) {
      switch (label) {
        case 'Incorrect questions':
          return savedPractice.incorrect.isEmpty
              ? null
              : savedPractice.incorrect.length;
        case 'Bookmarked questions':
          return savedPractice.bookmarked.isEmpty
              ? null
              : savedPractice.bookmarked.length;
        default:
          return null;
      }
    }

    return SingleChildScrollView(
      padding: mobileScrollPadding(context),
      child: CenteredContent(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SectionHeader(
              title: 'Practice module',
              subtitle:
                  'Daily drills, PYQs, custom sets, incorrect question review, and question bookmarks.',
            ),
            if (!hasSubscription) ...[
              const SizedBox(height: AppSpacing.md),
              const FreePreviewBanner(),
            ],
            const SizedBox(height: AppSpacing.lg),
            const SearchBarWidget(hint: 'Search topics, PYQ packs, and practice sets'),
            const SizedBox(height: AppSpacing.lg),
            FutureBuilder<List<Map<String, dynamic>>>(
              future: _practiceFuture,
              builder: (context, snapshot) {
                final allSets = snapshot.data ?? const [];
                return LayoutBuilder(
                  builder: (context, constraints) {
                    final twoColumnWidth = (constraints.maxWidth - AppSpacing.md) / 2;
                    final itemWidth = constraints.maxWidth >= 460
                        ? twoColumnWidth
                        : constraints.maxWidth;
                    return Wrap(
                      spacing: AppSpacing.md,
                      runSpacing: AppSpacing.md,
                      children: categories
                          .map(
                            (category) => SizedBox(
                              width: itemWidth,
                              child: InkWell(
                                onTap: () => _onCategoryTap(
                                  context,
                                  category.$1,
                                  allSets,
                                  hasSubscription,
                                ),
                                borderRadius: BorderRadius.circular(AppRadii.lg),
                                child: SurfaceCard(
                                  child: Row(
                                    children: [
                                      CircleAvatar(
                                        backgroundColor: AppColors.indigoSoft,
                                        child: Icon(category.$2, color: AppColors.indigo),
                                      ),
                                      const SizedBox(width: AppSpacing.md),
                                      Expanded(
                                        child: Text(
                                          category.$1,
                                          style: const TextStyle(
                                            fontWeight: FontWeight.w600,
                                          ),
                                        ),
                                      ),
                                      if (countFor(category.$1) != null)
                                        Container(
                                          margin: const EdgeInsets.only(
                                            right: AppSpacing.sm,
                                          ),
                                          padding: const EdgeInsets.symmetric(
                                            horizontal: AppSpacing.sm,
                                            vertical: 2,
                                          ),
                                          decoration: BoxDecoration(
                                            color: AppColors.indigoSoft,
                                            borderRadius:
                                                BorderRadius.circular(99),
                                          ),
                                          child: Text(
                                            '${countFor(category.$1)}',
                                            style: const TextStyle(
                                              color: AppColors.indigo,
                                              fontWeight: FontWeight.w700,
                                              fontSize: 12,
                                            ),
                                          ),
                                        ),
                                      const Icon(
                                        Icons.arrow_forward_ios_rounded,
                                        size: 14,
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          )
                          .toList(),
                    );
                  },
                );
              },
            ),
            const SizedBox(height: AppSpacing.xl),
            const SectionHeader(
              title: 'Recommended sets',
              subtitle:
                  'Pick the next drill based on topic priority and previous accuracy.',
            ),
            const SizedBox(height: AppSpacing.md),
            FutureBuilder<List<Map<String, dynamic>>>(
              future: _practiceFuture,
              builder: (context, snapshot) {
                final sets = snapshot.data ?? const [];
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const SkeletonLoader(cardCount: 3);
                }
                if (sets.isEmpty) {
                  return const EmptyStateWidget(
                    title: 'No practice sets yet',
                    subtitle: 'Admin panel se practice sets add karne ke baad yahan dikhenge.',
                    icon: Icons.bolt_rounded,
                  );
                }
                return Column(
                  children: sets.asMap().entries.map(
                        (entry) {
                          final locked = !ContentAccess.isItemUnlocked(
                            index: entry.key,
                            hasActiveSubscription: hasSubscription,
                          );
                          final set = entry.value;
                          return Padding(
                            padding: const EdgeInsets.only(bottom: AppSpacing.md),
                            child: _PracticeSetCard(
                              set: PracticeSet(
                                id: '${set['id']}',
                                title: set['title']?.toString() ?? 'Practice Set',
                                topic: set['topic']?.toString() ?? '',
                                questionCount:
                                    (set['question_count'] as num?)?.toInt() ?? 0,
                                difficulty:
                                    set['difficulty']?.toString() ?? 'Moderate',
                                estimatedMinutes:
                                    (set['estimated_minutes'] as num?)?.toInt() ?? 20,
                                accuracy: 0,
                                tag: 'Batch-wise',
                              ),
                              locked: locked,
                            ),
                          );
                        },
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

class PracticeAttemptScreen extends ConsumerStatefulWidget {
  const PracticeAttemptScreen({
    super.key,
    required this.setId,
    this.customQuestions,
    this.customTitle,
  });

  final int setId;
  final List<Map<String, dynamic>>? customQuestions;
  final String? customTitle;

  @override
  ConsumerState<PracticeAttemptScreen> createState() =>
      _PracticeAttemptScreenState();
}

class _PracticeAttemptScreenState extends ConsumerState<PracticeAttemptScreen> {
  int _currentIndex = 0;
  int? _selectedOption;
  bool _submitted = false;
  bool _finished = false;
  bool _loading = true;
  String? _loadError;
  int _correctCount = 0;
  int _wrongCount = 0;
  final Map<int, String> _answers = {};
  Map<String, dynamic> _set = {};
  List<Map<String, dynamic>> _questions = [];

  @override
  void initState() {
    super.initState();
    _loadAttempt();
    WidgetsBinding.instance.addPostFrameCallback((_) => _guardAccess());
  }

  Future<void> _guardAccess() async {
    if (widget.customQuestions != null) return;
    final authUser = ref.read(authBlocProvider).state.user;
    final hasSubscription =
        ref.read(appUiControllerProvider).hasActiveSubscription ||
            (authUser?.hasActiveSubscription ?? false);
    if (hasSubscription || !mounted) return;
    final sets = await ContentRepository().fetchPracticeSets();
    if (!mounted) return;
    final ids = sets.map((s) => '${s['id']}').toList();
    final unlocked = ContentAccess.isIdUnlocked(
      itemId: '${widget.setId}',
      orderedIds: ids,
      hasActiveSubscription: false,
    );
    if (!unlocked && mounted) {
      ContentAccess.openSubscriptions(context);
      Navigator.of(context).maybePop();
    }
  }

  Future<void> _loadAttempt() async {
    if (widget.customQuestions != null) {
      _set = {'title': widget.customTitle ?? 'Practice'};
      _questions = List<Map<String, dynamic>>.from(widget.customQuestions!);
      unawaited(
        warmImageCacheUrls(
          _questions
              .map((q) => questionImageRawUrl(q))
              .where((url) => url.isNotEmpty),
          thumbWidth: 700,
          maxItems: 12,
        ),
      );
      if (mounted) setState(() => _loading = false);
      return;
    }
    try {
      final data = await ContentRepository().fetchPracticeAttemptData(widget.setId);
      _set = Map<String, dynamic>.from(data['practiceSet'] as Map? ?? {});
      _questions = List<Map<String, dynamic>>.from(
        data['questions'] as List<dynamic>? ?? const [],
      );
      unawaited(
        warmImageCacheUrls(
          _questions
              .map((q) => questionImageRawUrl(q))
              .where((url) => url.isNotEmpty),
          thumbWidth: 700,
          maxItems: 12,
        ),
      );
      _loadError = null;
    } catch (e) {
      _loadError = e.toString();
      rethrow;
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  SavedPracticeQuestion _savedEntryFor(Map<String, dynamic> question) {
    return SavedPracticeQuestion(
      id: question['id'].toString(),
      setId: widget.setId,
      setTitle: _set['title']?.toString() ?? 'Practice',
      question: Map<String, dynamic>.from(question),
    );
  }

  void _checkAnswer(Map<String, dynamic> question) {
    if (_selectedOption == null) return;
    final correctOption = readCorrectOption(question);
    final keys = ['A', 'B', 'C', 'D'];
    final selectedKey = keys[_selectedOption!.clamp(0, 3)];
    _answers[_currentIndex] = selectedKey;
    if (selectedKey == correctOption) {
      _correctCount++;
    } else {
      _wrongCount++;
      ref
          .read(practiceSavedControllerProvider.notifier)
          .addIncorrect(_savedEntryFor(question));
    }
    setState(() => _submitted = true);
  }

  void _nextQuestion() {
    if (_currentIndex >= _questions.length - 1) {
      setState(() => _finished = true);
      return;
    }
    setState(() {
      _currentIndex++;
      _selectedOption = null;
      _submitted = false;
    });
  }

  List<AnswerReviewEntry> _reviewEntries() {
    return List.generate(
      _questions.length,
      (i) => AnswerReviewEntry.fromAbcdMap(
        question: _questions[i],
        index: i,
        selectedOption: _answers[i],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }
    if (_loadError != null || _questions.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: Text(_set['title']?.toString() ?? 'Practice')),
        body: Center(
          child: EmptyStateWidget(
            title: 'No questions found',
            subtitle: _loadError ?? 'Is set ke liye abhi questions add nahi hue.',
            icon: Icons.help_outline_rounded,
          ),
        ),
      );
    }

    if (_finished) {
      final total = _questions.length;
      final accuracy = total > 0 ? (_correctCount / total * 100) : 0.0;
      return Scaffold(
        appBar: AppBar(title: Text(_set['title']?.toString() ?? 'Practice Result')),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: CenteredContent(
            maxWidth: 720,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
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
                        '$_correctCount/$total',
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
                        style: TextStyle(color: Colors.white70, fontSize: 16),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: AppSpacing.lg),
                Row(
                  children: [
                    Expanded(
                      child: StatCard(
                        title: 'Correct',
                        value: '$_correctCount',
                        subtitle: 'questions',
                        icon: Icons.check_circle_outline_rounded,
                      ),
                    ),
                    const SizedBox(width: AppSpacing.md),
                    Expanded(
                      child: StatCard(
                        title: 'Wrong',
                        value: '$_wrongCount',
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
                const SizedBox(height: AppSpacing.lg),
                PrimaryButton(
                  label: 'Review answers',
                  expanded: true,
                  icon: Icons.fact_check_rounded,
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => PaginatedAnswerReviewScreen(
                          title: 'Practice Review',
                          items: _reviewEntries(),
                        ),
                      ),
                    );
                  },
                ),
                const SizedBox(height: AppSpacing.sm),
                SecondaryButton(
                  label: 'Back to topics',
                  expanded: true,
                  onPressed: () => Navigator.of(context).pop(),
                ),
              ],
            ),
          ),
        ),
      );
    }

    final question = _questions[_currentIndex];
        final options = [
          readQuestionOption(question, 'A'),
          readQuestionOption(question, 'B'),
          readQuestionOption(question, 'C'),
          readQuestionOption(question, 'D'),
        ];
        final correctOption = readCorrectOption(question);
        final correctIndex = ['A', 'B', 'C', 'D'].indexOf(correctOption).clamp(0, 3);
        final savedPractice = ref.watch(practiceSavedControllerProvider);
        final qId = question['id'].toString();
        final isBookmarked = savedPractice.bookmarkedIds.contains(qId);

        return Scaffold(
          appBar: AppBar(
            title: Text(_set['title']?.toString() ?? 'Practice'),
            actions: [
              IconButton(
                onPressed: () {
                  final shareText = StringBuffer()
                    ..writeln('Question:')
                    ..writeln(question['question']?.toString() ?? '')
                    ..writeln()
                    ..writeln('Options:')
                    ..writeln('A) ${options[0]}')
                    ..writeln('B) ${options[1]}')
                    ..writeln('C) ${options[2]}')
                    ..writeln('D) ${options[3]}')
                    ..writeln()
                    ..writeln('Shared from Indraprastha Practice');
                  SharePlus.instance.share(
                    ShareParams(text: shareText.toString()),
                  );
                },
                icon: const Icon(Icons.share_outlined),
                tooltip: 'Share question',
              ),
              IconButton(
                onPressed: () => ref
                    .read(practiceSavedControllerProvider.notifier)
                    .toggleBookmark(_savedEntryFor(question)),
                icon: Icon(
                  isBookmarked
                      ? Icons.bookmark_rounded
                      : Icons.bookmark_border_rounded,
                ),
              ),
            ],
          ),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: CenteredContent(
              maxWidth: 920,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  StatCard(
                    title: 'Set progress',
                    value: '${_currentIndex + 1}/${_questions.length}',
                    subtitle: '${_set['estimated_minutes'] ?? 20} min estimated',
                    icon: Icons.timelapse_rounded,
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        buildQuestionTextBlock(
                          context,
                          question,
                          style: questionContentTextStyle(
                            context,
                            fontSize: 20,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        if (hasQuestionImage(question)) ...[
                          const SizedBox(height: AppSpacing.md),
                          _buildQuestionImage(questionImageRawUrl(question)),
                        ],
                        const SizedBox(height: AppSpacing.lg),
                        ...List.generate(options.length, (index) {
                          final selected = _selectedOption == index;
                          final revealState = _submitted && (selected || index == correctIndex);
                          final isDark = Theme.of(context).brightness == Brightness.dark;
                          final isCorrectOption = index == correctIndex;
                          Color bg;
                          Color border;
                          Color textColor;
                          if (revealState) {
                            if (isCorrectOption) {
                              bg = isDark
                                  ? AppColors.success.withValues(alpha: 0.18)
                                  : const Color(0xFFE7F8EF);
                              border = AppColors.success;
                              textColor = isDark
                                  ? const Color(0xFF6EE7A0)
                                  : AppColors.success;
                            } else {
                              bg = isDark
                                  ? AppColors.danger.withValues(alpha: 0.18)
                                  : const Color(0xFFFCEAEA);
                              border = AppColors.danger;
                              textColor = isDark
                                  ? const Color(0xFFFF9B8F)
                                  : AppColors.danger;
                            }
                          } else if (selected) {
                            bg = isDark
                                ? AppColors.primary.withValues(alpha: 0.2)
                                : AppColors.indigoSoft;
                            border = AppColors.indigo;
                            textColor = AppColors.primary;
                          } else {
                            bg = Theme.of(context).cardColor;
                            border = isDark
                                ? const Color(0xFF343B49)
                                : AppColors.border;
                            textColor = Theme.of(context).colorScheme.onSurface;
                          }
                          return Padding(
                            padding: const EdgeInsets.only(bottom: AppSpacing.md),
                            child: InkWell(
                              onTap: _submitted ? null : () => setState(() => _selectedOption = index),
                              borderRadius: BorderRadius.circular(AppRadii.md),
                              child: Container(
                                padding: const EdgeInsets.all(AppSpacing.md),
                                decoration: BoxDecoration(
                                  color: bg,
                                  borderRadius: BorderRadius.circular(AppRadii.md),
                                  border: Border.all(color: border),
                                ),
                                child: Text(
                                  _optionLabel(index, options[index]),
                                  style: questionContentTextStyle(
                                    context,
                                    fontWeight: selected || revealState
                                        ? FontWeight.w600
                                        : FontWeight.w400,
                                    color: textColor,
                                  ),
                                ),
                              ),
                            ),
                          );
                        }),
                        const SizedBox(height: AppSpacing.sm),
                        PrimaryButton(
                          label: _submitted
                              ? (_currentIndex >= _questions.length - 1
                                  ? 'Finish & see results'
                                  : 'Next question')
                              : 'Submit answer',
                          icon: _submitted
                              ? Icons.arrow_forward_rounded
                              : Icons.check_rounded,
                          expanded: true,
                          onPressed: (_submitted || _selectedOption != null)
                              ? () {
                                  if (!_submitted) {
                                    _checkAnswer(question);
                                    return;
                                  }
                                  _nextQuestion();
                                }
                              : null,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
  }
}

class _PracticeSetCard extends StatelessWidget {
  const _PracticeSetCard({
    required this.set,
    this.locked = false,
  });

  final PracticeSet set;
  final bool locked;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => ContentAccess.handleTap(
        context: context,
        locked: locked,
        onUnlocked: () => context.push('/practice/attempt/${set.id}'),
      ),
      borderRadius: BorderRadius.circular(AppRadii.lg),
      child: Opacity(
        opacity: locked ? 0.72 : 1,
        child: SurfaceCard(
          child: Row(
            children: [
              Container(
                width: 56,
                height: 56,
                decoration: BoxDecoration(
                  gradient: locked ? null : AppGradients.primary,
                  color: locked ? AppColors.goldSoft : null,
                  borderRadius: BorderRadius.circular(18),
                ),
                child: Icon(
                  locked ? Icons.lock_rounded : Icons.bolt_rounded,
                  color: locked ? AppColors.gold : Colors.white,
                ),
              ),
            const SizedBox(width: AppSpacing.lg),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(set.title, style: Theme.of(context).textTheme.titleMedium),
                  const SizedBox(height: AppSpacing.xs),
                  Text('${set.topic} . ${set.tag}'),
                  const SizedBox(height: AppSpacing.sm),
                  Wrap(
                    spacing: AppSpacing.sm,
                    runSpacing: AppSpacing.sm,
                    children: [
                      _MetaPill(label: '${set.questionCount} questions'),
                      _MetaPill(label: set.difficulty),
                      _MetaPill(label: '${set.estimatedMinutes} mins'),
                      _MetaPill(label: 'Prev ${(set.accuracy * 100).round()}%'),
                    ],
                  ),
                ],
              ),
            ),
            buildContentTrailing(locked: locked),
          ],
        ),
      ),
      ),
    );
  }
}

class _MetaPill extends StatelessWidget {
  const _MetaPill({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm,
        vertical: AppSpacing.xs,
      ),
      decoration: BoxDecoration(
        color: Theme.of(context).brightness == Brightness.dark
            ? AppColors.surfaceMuted.withValues(alpha: 0.2)
            : AppColors.surfaceMuted,
        borderRadius: BorderRadius.circular(99),
      ),
      child: Text(label),
    );
  }
}

// ── Topic-wise MCQs drill-down ────────────────────────────────────────────────

class TopicWiseMcqsScreen extends StatelessWidget {
  const TopicWiseMcqsScreen({
    super.key,
    required this.allSets,
    required this.hasActiveSubscription,
  });

  final List<Map<String, dynamic>> allSets;
  final bool hasActiveSubscription;

  Map<String, List<Map<String, dynamic>>> _groupBySubject() {
    final map = <String, List<Map<String, dynamic>>>{};
    for (final set in allSets) {
      final subject = set['subject']?.toString().trim() ?? '';
      final standard = set['class_label']?.toString().trim() ??
          set['standard_label']?.toString().trim() ??
          '';
      final key = (standard.isNotEmpty && subject.isNotEmpty)
          ? '$standard $subject'
          : subject.isNotEmpty
              ? subject
              : 'General';
      map.putIfAbsent(key, () => []).add(set);
    }
    return map;
  }

  @override
  Widget build(BuildContext context) {
    final groups = _groupBySubject();
    return Scaffold(
      appBar: AppBar(title: const Text('Topic-wise MCQs')),
      body: groups.isEmpty
          ? const Center(
              child: EmptyStateWidget(
                title: 'No practice sets yet',
                subtitle: 'Admin panel se practice sets add karne ke baad yahan dikhenge.',
                icon: Icons.grid_view_rounded,
              ),
            )
          : ListView.separated(
              padding: const EdgeInsets.all(AppSpacing.lg),
              itemCount: groups.length,
              separatorBuilder: (context, index) => const SizedBox(height: AppSpacing.md),
              itemBuilder: (context, i) {
                final subject = groups.keys.elementAt(i);
                final sets = groups[subject]!;
                return _SubjectGroupCard(
                  subject: subject,
                  sets: sets,
                  allSets: allSets,
                  hasActiveSubscription: hasActiveSubscription,
                );
              },
            ),
    );
  }
}

class _SubjectGroupCard extends StatelessWidget {
  const _SubjectGroupCard({
    required this.subject,
    required this.sets,
    required this.allSets,
    required this.hasActiveSubscription,
  });

  final String subject;
  final List<Map<String, dynamic>> sets;
  final List<Map<String, dynamic>> allSets;
  final bool hasActiveSubscription;

  IconData _iconFor(String s) {
    final lower = s.toLowerCase();
    if (lower.contains('physics')) return Icons.rocket_launch_rounded;
    if (lower.contains('chem')) return Icons.science_rounded;
    if (lower.contains('bot')) return Icons.spa_rounded;
    if (lower.contains('zoo')) return Icons.pets_rounded;
    return Icons.menu_book_rounded;
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => Navigator.of(context).push(
        MaterialPageRoute(
          builder: (_) => _SubjectTopicsScreen(
            subject: subject,
            sets: sets,
            allSets: allSets,
            hasActiveSubscription: hasActiveSubscription,
          ),
        ),
      ),
      borderRadius: BorderRadius.circular(AppRadii.lg),
      child: SurfaceCard(
        child: Row(
          children: [
            CircleAvatar(
              backgroundColor: AppColors.indigoSoft,
              child: Icon(_iconFor(subject), color: AppColors.indigo),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(subject,
                      style: const TextStyle(fontWeight: FontWeight.w600)),
                  Text('${sets.length} practice set${sets.length == 1 ? '' : 's'}'),
                ],
              ),
            ),
            const Icon(Icons.arrow_forward_ios_rounded, size: 16),
          ],
        ),
      ),
    );
  }
}

class _SubjectTopicsScreen extends StatelessWidget {
  const _SubjectTopicsScreen({
    required this.subject,
    required this.sets,
    required this.allSets,
    required this.hasActiveSubscription,
  });

  final String subject;
  final List<Map<String, dynamic>> sets;
  final List<Map<String, dynamic>> allSets;
  final bool hasActiveSubscription;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(subject)),
      body: ListView.separated(
        padding: const EdgeInsets.all(AppSpacing.lg),
        itemCount: sets.length,
        separatorBuilder: (context, index) => const SizedBox(height: AppSpacing.md),
        itemBuilder: (context, i) {
          final set = sets[i];
          final locked = hasActiveSubscription ? false : i > 0;
          return _PracticeSetCard(
            locked: locked,
            set: PracticeSet(
              id: '${set['id']}',
              title: set['title']?.toString() ?? 'Practice Set',
              topic: set['topic']?.toString() ?? '',
              questionCount: (set['question_count'] as num?)?.toInt() ?? 0,
              difficulty: set['difficulty']?.toString() ?? 'Moderate',
              estimatedMinutes: (set['estimated_minutes'] as num?)?.toInt() ?? 20,
              accuracy: 0,
              tag: set['class_label']?.toString() ?? set['standard_label']?.toString() ?? 'Topic',
            ),
          );
        },
      ),
    );
  }
}

// ── Saved / custom practice flows ─────────────────────────────────────────────

class BookmarkedQuestionsScreen extends ConsumerWidget {
  const BookmarkedQuestionsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final saved = ref.watch(practiceSavedControllerProvider);
    return _SavedQuestionsScreen(
      title: 'Bookmarked questions',
      emptyTitle: 'No bookmarked questions yet',
      emptySubtitle:
          'Practice karte waqt app bar par bookmark icon dabao — saved questions yahan dikhenge.',
      emptyIcon: Icons.bookmark_border_rounded,
      questions: saved.bookmarked,
      onRemove: (id) => ref
          .read(practiceSavedControllerProvider.notifier)
          .removeBookmark(id),
      practiceTitle: 'Bookmarked practice',
    );
  }
}

class IncorrectQuestionsScreen extends ConsumerWidget {
  const IncorrectQuestionsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final saved = ref.watch(practiceSavedControllerProvider);
    return _SavedQuestionsScreen(
      title: 'Incorrect questions',
      emptyTitle: 'No incorrect questions yet',
      emptySubtitle:
          'Galat answer dene par questions yahan save honge taaki aap unhe dobara practice kar saken.',
      emptyIcon: Icons.refresh_rounded,
      questions: saved.incorrect,
      onRemove: (id) =>
          ref.read(practiceSavedControllerProvider.notifier).removeIncorrect(id),
      practiceTitle: 'Incorrect review',
      showClearAll: saved.incorrect.isNotEmpty,
      onClearAll: () =>
          ref.read(practiceSavedControllerProvider.notifier).clearIncorrect(),
    );
  }
}

class _SavedQuestionsScreen extends StatelessWidget {
  const _SavedQuestionsScreen({
    required this.title,
    required this.emptyTitle,
    required this.emptySubtitle,
    required this.emptyIcon,
    required this.questions,
    required this.onRemove,
    required this.practiceTitle,
    this.showClearAll = false,
    this.onClearAll,
  });

  final String title;
  final String emptyTitle;
  final String emptySubtitle;
  final IconData emptyIcon;
  final List<SavedPracticeQuestion> questions;
  final ValueChanged<String> onRemove;
  final String practiceTitle;
  final bool showClearAll;
  final VoidCallback? onClearAll;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
        actions: [
          if (showClearAll)
            IconButton(
              onPressed: onClearAll,
              icon: const Icon(Icons.delete_sweep_outlined),
              tooltip: 'Clear all',
            ),
        ],
      ),
      body: questions.isEmpty
          ? Center(
              child: EmptyStateWidget(
                title: emptyTitle,
                subtitle: emptySubtitle,
                icon: emptyIcon,
              ),
            )
          : Column(
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(
                    AppSpacing.lg,
                    AppSpacing.lg,
                    AppSpacing.lg,
                    AppSpacing.sm,
                  ),
                  child: PrimaryButton(
                    label: 'Practice all (${questions.length})',
                    expanded: true,
                    icon: Icons.play_arrow_rounded,
                    onPressed: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (_) => PracticeAttemptScreen(
                            setId: 0,
                            customTitle: practiceTitle,
                            customQuestions: questions
                                .map((item) => item.question)
                                .toList(),
                          ),
                        ),
                      );
                    },
                  ),
                ),
                Expanded(
                  child: ListView.separated(
                    padding: const EdgeInsets.all(AppSpacing.lg),
                    itemCount: questions.length,
                    separatorBuilder: (context, index) =>
                        const SizedBox(height: AppSpacing.md),
                    itemBuilder: (context, index) {
                      final item = questions[index];
                      final preview = readQuestionText(item.question);
                      return InkWell(
                        onTap: () {
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (_) => PracticeAttemptScreen(
                                setId: item.setId,
                                customTitle: item.setTitle,
                                customQuestions: [item.question],
                              ),
                            ),
                          );
                        },
                        borderRadius: BorderRadius.circular(AppRadii.lg),
                        child: SurfaceCard(
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      item.setTitle,
                                      style: TextStyle(
                                        color: AppColors.textSecondary,
                                        fontSize: 12,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                    const SizedBox(height: AppSpacing.xs),
                                    Text(
                                      preview.isEmpty
                                          ? 'Question ${index + 1}'
                                          : preview,
                                      maxLines: 3,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              IconButton(
                                onPressed: () => onRemove(item.id),
                                icon: const Icon(Icons.close_rounded, size: 18),
                                tooltip: 'Remove',
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
    );
  }
}

class CustomPracticeScreen extends StatefulWidget {
  const CustomPracticeScreen({
    super.key,
    required this.allSets,
    required this.hasActiveSubscription,
  });

  final List<Map<String, dynamic>> allSets;
  final bool hasActiveSubscription;

  @override
  State<CustomPracticeScreen> createState() => _CustomPracticeScreenState();
}

class _CustomPracticeScreenState extends State<CustomPracticeScreen> {
  late final Future<Map<String, dynamic>> _filtersFuture;
  String? _selectedSubject;
  String? _selectedTopic;
  int _questionCount = 10;
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    _filtersFuture = ContentRepository().fetchContentFilters();
  }

  List<Map<String, dynamic>> get _filteredSets {
    return widget.allSets.where((set) {
      final subject = set['subject']?.toString() ?? '';
      final topic = set['topic']?.toString() ?? '';
      if (_selectedSubject != null &&
          _selectedSubject!.isNotEmpty &&
          subject != _selectedSubject) {
        return false;
      }
      if (_selectedTopic != null &&
          _selectedTopic!.isNotEmpty &&
          topic != _selectedTopic) {
        return false;
      }
      return true;
    }).toList();
  }

  Future<void> _startPractice() async {
    final sets = _filteredSets;
    if (sets.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Is filter ke liye koi practice set nahi mila.')),
      );
      return;
    }

    setState(() => _loading = true);
    try {
      final repo = ContentRepository();
      final allQuestions = <Map<String, dynamic>>[];
      for (final set in sets) {
        final setId = (set['id'] as num?)?.toInt();
        if (setId == null) continue;
        final data = await repo.fetchPracticeAttemptData(setId);
        final questions = List<Map<String, dynamic>>.from(
          data['questions'] as List<dynamic>? ?? const [],
        );
        for (final question in questions) {
          allQuestions.add(Map<String, dynamic>.from(question));
        }
      }

      if (!mounted) return;
      if (allQuestions.isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Selected filters ke liye questions nahi mile.')),
        );
        return;
      }

      allQuestions.shuffle();
      final picked = allQuestions.take(_questionCount).toList();
      final titleParts = <String>[
        if (_selectedSubject != null && _selectedSubject!.isNotEmpty)
          _selectedSubject!,
        if (_selectedTopic != null && _selectedTopic!.isNotEmpty) _selectedTopic!,
      ];
      final title = titleParts.isEmpty
          ? 'Custom practice'
          : 'Custom: ${titleParts.join(' · ')}';

      if (!mounted) return;
      await Navigator.of(context).push(
        MaterialPageRoute(
          builder: (_) => PracticeAttemptScreen(
            setId: 0,
            customTitle: title,
            customQuestions: picked,
          ),
        ),
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Practice load nahi ho payi: $e')),
      );
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Custom practice')),
      body: FutureBuilder<Map<String, dynamic>>(
        future: _filtersFuture,
        builder: (context, snapshot) {
          final subjects = List<String>.from(
            (snapshot.data?['subjects'] as List<dynamic>? ?? const [])
                .map((item) => item is String
                    ? item
                    : item['value']?.toString() ?? '')
                .where((value) => value.isNotEmpty),
          );
          final topics = List<String>.from(
            (snapshot.data?['topics'] as List<dynamic>? ?? const [])
                .map((item) =>
                    item is String ? item : item['value']?.toString() ?? '')
                .where((value) => value.isNotEmpty),
          );

          return SingleChildScrollView(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: CenteredContent(
              maxWidth: 720,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SectionHeader(
                    title: 'Build your drill',
                    subtitle:
                        'Subject aur topic choose karo, phir random questions se custom set banao.',
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Subject',
                          style: Theme.of(context).textTheme.titleSmall,
                        ),
                        const SizedBox(height: AppSpacing.sm),
                        DropdownButtonFormField<String?>(
                          value: _selectedSubject,
                          decoration: const InputDecoration(
                            hintText: 'All subjects',
                            border: OutlineInputBorder(),
                          ),
                          items: [
                            const DropdownMenuItem<String?>(
                              value: null,
                              child: Text('All subjects'),
                            ),
                            ...subjects.map(
                              (subject) => DropdownMenuItem<String?>(
                                value: subject,
                                child: Text(subject),
                              ),
                            ),
                          ],
                          onChanged: (value) => setState(() {
                            _selectedSubject = value;
                            _selectedTopic = null;
                          }),
                        ),
                        const SizedBox(height: AppSpacing.lg),
                        Text(
                          'Topic',
                          style: Theme.of(context).textTheme.titleSmall,
                        ),
                        const SizedBox(height: AppSpacing.sm),
                        DropdownButtonFormField<String?>(
                          value: _selectedTopic,
                          decoration: const InputDecoration(
                            hintText: 'All topics',
                            border: OutlineInputBorder(),
                          ),
                          items: [
                            const DropdownMenuItem<String?>(
                              value: null,
                              child: Text('All topics'),
                            ),
                            ...topics.map(
                              (topic) => DropdownMenuItem<String?>(
                                value: topic,
                                child: Text(topic),
                              ),
                            ),
                          ],
                          onChanged: (value) =>
                              setState(() => _selectedTopic = value),
                        ),
                        const SizedBox(height: AppSpacing.lg),
                        Text(
                          'Questions',
                          style: Theme.of(context).textTheme.titleSmall,
                        ),
                        const SizedBox(height: AppSpacing.sm),
                        Wrap(
                          spacing: AppSpacing.sm,
                          children: [5, 10, 15, 20, 30].map((count) {
                            final selected = _questionCount == count;
                            return ChoiceChip(
                              label: Text('$count'),
                              selected: selected,
                              onSelected: (_) =>
                                  setState(() => _questionCount = count),
                            );
                          }).toList(),
                        ),
                        const SizedBox(height: AppSpacing.lg),
                        Text(
                          '${_filteredSets.length} matching set${_filteredSets.length == 1 ? '' : 's'} available',
                          style: TextStyle(color: AppColors.textSecondary),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  PrimaryButton(
                    label: _loading ? 'Loading questions...' : 'Start custom practice',
                    expanded: true,
                    icon: Icons.play_arrow_rounded,
                    onPressed: _loading ? null : _startPractice,
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
