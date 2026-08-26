import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:share_plus/share_plus.dart';

import '../../core/access/content_access.dart';
import '../../core/providers/app_state.dart';
import '../../core/services/attempt_draft_store.dart';
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

Map<String, List<Map<String, dynamic>>> _groupQuestionsByChapter(
  List<Map<String, dynamic>> questions,
) {
  if (questions.isEmpty) return {};

  print('DEBUG: Sample question keys: ${questions.first.keys.toList()}');
  print('DEBUG: Sample question data: ${questions.first.toString().substring(0, 300)}');
  print('DEBUG: Total questions: ${questions.length}');

  final grouped = <String, List<Map<String, dynamic>>>{};

  // Strategy 1: Try to group by chapter_id first
  bool hasChapterId = questions.any((q) => q['chapter_id'] != null);

  if (hasChapterId) {
    print('DEBUG: Using chapter_id grouping');
    for (final q in questions) {
      if (q['chapter_id'] != null) {
        final key = 'ch_${q['chapter_id']}';
        grouped.putIfAbsent(key, () => []).add(q);
      }
    }
  }

  // Strategy 2: If no chapter_id, try grouping by combination of fields
  if (grouped.isEmpty) {
    for (final q in questions) {
      final standard = q['class_label']?.toString() ??
          q['standard_label']?.toString() ??
          '';
      final subject =
          q['subject']?.toString() ?? q['subject_name']?.toString() ?? '';
      final topic = q['topic']?.toString() ??
          q['chapter']?.toString() ??
          q['chapter_name']?.toString() ??
          'General';

      final key = [standard, subject, topic]
          .where((s) => s.isNotEmpty)
          .join(' - ');

      grouped.putIfAbsent(key.isEmpty ? 'General' : key, () => []).add(q);
    }
  }

  return grouped;
}

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

double _parseDouble(dynamic value, {double defaultValue = 0}) {
  if (value == null) return defaultValue;
  if (value is num) return value.toDouble();
  if (value is String) {
    try {
      return double.parse(value);
    } catch (_) {
      return defaultValue;
    }
  }
  return defaultValue;
}

int _parseInt(dynamic value, {int defaultValue = 0}) {
  if (value == null) return defaultValue;
  if (value is int) return value;
  if (value is num) return value.toInt();
  if (value is String) {
    try {
      return int.parse(value);
    } catch (_) {
      return defaultValue;
    }
  }
  return defaultValue;
}

class PracticeHomeScreen extends ConsumerStatefulWidget {
  const PracticeHomeScreen({super.key});

  @override
  ConsumerState<PracticeHomeScreen> createState() => _PracticeHomeScreenState();
}

class _PracticeHomeScreenState extends ConsumerState<PracticeHomeScreen> {
  late Future<List<Map<String, dynamic>>> _practiceFuture;

  @override
  void initState() {
    super.initState();
    _reloadPractice();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      unawaited(completeOnboardingStep(
        ref,
        OnboardingChecklistStep.attemptFirstPractice,
      ));
    });
  }

  void _reloadPractice() {
    setState(() {
      _practiceFuture = ref.read(contentRepositoryProvider).fetchPracticeSets();
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
              future: Future.any([
                _practiceFuture,
                Future.delayed(const Duration(seconds: 10)).then((_) {
                  throw Exception('Load timeout after 10s - check internet connection');
                }),
              ]),
              builder: (context, snapshot) {
                final sets = snapshot.data ?? const [];
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const SkeletonLoader(cardCount: 3);
                }
                if (snapshot.hasError) {
                  final errorMsg = snapshot.error?.toString() ?? 'Unknown error';
                  return Center(
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.error_outline, size: 40, color: Colors.grey),
                          const SizedBox(height: 12),
                          Text(
                            'Could not load practice sets',
                            textAlign: TextAlign.center,
                            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            errorMsg.replaceFirst('Exception: ', ''),
                            textAlign: TextAlign.center,
                            style: const TextStyle(fontSize: 12, color: Colors.grey),
                          ),
                          const SizedBox(height: 12),
                          ElevatedButton(
                            onPressed: _reloadPractice,
                            child: const Text('Retry'),
                          ),
                        ],
                      ),
                    ),
                  );
                }
                if (sets.isEmpty) {
                  return Center(
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(
                            hasSubscription ? Icons.bolt_rounded : Icons.lock_rounded,
                            size: 40,
                            color: Colors.grey,
                          ),
                          const SizedBox(height: 12),
                          Text(
                            hasSubscription
                                ? 'No practice sets yet'
                                : 'Upgrade to Premium',
                            textAlign: TextAlign.center,
                            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            hasSubscription
                                ? 'Admin panel se practice sets add karne ke baad yahan dikhenge.'
                                : 'Unlock all practice sets with Premium subscription.',
                            textAlign: TextAlign.center,
                            style: const TextStyle(fontSize: 12, color: Colors.grey),
                          ),
                          if (!hasSubscription) ...[
                            const SizedBox(height: 12),
                            ElevatedButton(
                              onPressed: () => ContentAccess.openSubscriptions(context),
                              child: const Text('View Plans'),
                            ),
                          ],
                        ],
                      ),
                    ),
                  );
                }
                return Column(
                  children: sets.asMap().entries.map(
                        (entry) {
                          final unlocked = ContentAccess.isItemUnlocked(
                            index: entry.key,
                            hasActiveSubscription: hasSubscription,
                          );
                          final set = entry.value;
                          final completed =
                              isTruthyCompletionFlag(set['is_completed']);
                          final lastAccuracy = _parseDouble(set['last_accuracy']);
                          return Padding(
                            padding: const EdgeInsets.only(bottom: AppSpacing.md),
                            child: _PracticeSetCard(
                              set: PracticeSet(
                                id: '${set['id']}',
                                title: set['title']?.toString() ?? 'Practice Set',
                                topic: set['topic']?.toString() ?? '',
                                questionCount: _parseInt(set['question_count']),
                                difficulty:
                                    set['difficulty']?.toString() ?? 'Moderate',
                                estimatedMinutes: _parseInt(set['estimated_minutes'], defaultValue: 20),
                                accuracy: completed ? lastAccuracy / 100 : 0,
                                tag: 'Batch-wise',
                              ),
                              locked: !unlocked,
                              completed: completed,
                              onOpened: _reloadPractice,
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

class ChapterListScreen extends ConsumerWidget {
  const ChapterListScreen({
    super.key,
    required this.setId,
    required this.questions,
    required this.setTitle,
  });

  final int setId;
  final List<Map<String, dynamic>> questions;
  final String setTitle;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final chapters = _groupQuestionsByChapter(questions);
    final hasSubscription = ref.read(appUiControllerProvider).hasActiveSubscription ||
        (ref.read(authBlocProvider).state.user?.hasActiveSubscription ?? false);

    print('=== ChapterListScreen Debug ===');
    print('Total questions: ${questions.length}');
    print('Total chapters grouped: ${chapters.length}');
    print('Chapter names: ${chapters.keys.toList()}');
    print('Has subscription: $hasSubscription');

    return Scaffold(
      appBar: AppBar(
        title: Text(setTitle),
        // Show debug info if no subscription
        actions: !hasSubscription
            ? [
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Center(
                    child: Text(
                      '${chapters.length} chapters',
                      style: const TextStyle(fontSize: 12),
                    ),
                  ),
                )
              ]
            : null,
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(AppSpacing.lg),
        itemCount: chapters.length,
        separatorBuilder: (_, __) => const SizedBox(height: AppSpacing.md),
        itemBuilder: (context, index) {
          final chapterName = chapters.keys.elementAt(index);
          final chapterQuestions = chapters[chapterName]!;

          final isUnlockedForFree = ContentAccess.isChapterUnlocked(
            index: index,
            hasActiveSubscription: hasSubscription,
          );
          final locked = !isUnlockedForFree;

          print('Chapter[$index] $chapterName: unlocked=$isUnlockedForFree, locked=$locked');

          return InkWell(
            onTap: locked
                ? () => ContentAccess.openSubscriptions(context)
                : () => Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => PracticeAttemptScreen(
                          setId: setId,
                          chapterName: chapterName,
                          chapterQuestions: chapterQuestions,
                        ),
                      ),
                    ),
            borderRadius: BorderRadius.circular(AppRadii.lg),
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
                      locked ? Icons.lock_rounded : Icons.book_rounded,
                      color: locked ? AppColors.gold : Colors.white,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.lg),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          chapterName,
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                        const SizedBox(height: AppSpacing.xs),
                        Text('${chapterQuestions.length} questions'),
                      ],
                    ),
                  ),
                  if (locked)
                    const Icon(Icons.lock_rounded, size: 20)
                  else
                    const Icon(Icons.arrow_forward_ios_rounded, size: 14),
                ],
              ),
            ),
          );
        },
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
    this.chapterName,
    this.chapterQuestions,
  });

  final int setId;
  final List<Map<String, dynamic>>? customQuestions;
  final String? customTitle;
  final String? chapterName;
  final List<Map<String, dynamic>>? chapterQuestions;

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
  bool _draftRestored = false;
  String? _loadError;
  int _correctCount = 0;
  int _wrongCount = 0;
  final Map<int, String> _answers = {};
  Map<String, dynamic> _set = {};
  List<Map<String, dynamic>> _questions = [];
  Map<int, Map<String, double>> _optionStats = {};

  late Timer _questionTimer;
  int _remainingSeconds = 0;
  final int _questionTimerSeconds = 60;

  int get _draftSetId => widget.setId;

  AttemptDraftStore get _draftStore =>
      AttemptDraftStore(ref.read(sharedPreferencesProvider));

  void _restoreDraftIfNeeded() {
    if (_draftRestored || widget.customQuestions != null) return;
    final draft = _draftStore.loadPracticeDraft(_draftSetId);
    if (draft == null) {
      _draftRestored = true;
      return;
    }
    _currentIndex = _parseInt(draft['currentIndex'], defaultValue: _currentIndex);
    _correctCount = _parseInt(draft['correctCount'], defaultValue: _correctCount);
    _wrongCount = _parseInt(draft['wrongCount'], defaultValue: _wrongCount);
    _submitted = draft['submitted'] == true;
    final savedOption = draft['selectedOption'];
    _selectedOption = savedOption == null ? null : _parseInt(savedOption);
    final savedAnswers = draft['answers'];
    if (savedAnswers is Map) {
      savedAnswers.forEach((key, value) {
        final idx = int.tryParse(key.toString());
        if (idx != null && value != null) {
          _answers[idx] = value.toString();
        }
      });
    }
    _draftRestored = true;
  }

  Future<void> _persistDraft() async {
    if (_finished || widget.customQuestions != null) return;
    await _draftStore.savePracticeDraft(_draftSetId, {
      'currentIndex': _currentIndex,
      'correctCount': _correctCount,
      'wrongCount': _wrongCount,
      'selectedOption': _selectedOption,
      'submitted': _submitted,
      'answers': _answers.map((k, v) => MapEntry('$k', v)),
      'updatedAt': DateTime.now().toIso8601String(),
    });
  }

  Future<void> _submitPracticeResult() async {
    final total = _questions.length;
    if (total == 0) return;
    final accuracy = total > 0 ? (_correctCount / total) * 100 : 0.0;
    try {
      await ref.read(contentRepositoryProvider).submitPracticeAttempt(
            setId: widget.setId,
            score: _correctCount,
            accuracy: accuracy,
            correctCount: _correctCount,
            wrongCount: _wrongCount,
          );

      // Log activity to Streaks
      _logPracticeActivity(total);

      await _draftStore.clearPracticeDraft(_draftSetId);
    } catch (_) {
      // Keep local completion even if server submit fails.
    }
  }

  Future<void> _logPracticeActivity(int totalQuestions) async {
    try {
      final prefs = ref.read(sharedPreferencesProvider);
      final token = prefs.getString('auth_token') ?? '';

      final response = await http.post(
        Uri.parse('$baseUrl/streaks/log-activity'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'activityType': 'practice',
          'activityCount': totalQuestions,
          'durationMinutes': (_questionTimerSeconds - _remainingSeconds) ~/ 60,
          'metadata': {
            'setId': widget.setId,
            'accuracy': (_correctCount / totalQuestions * 100).toStringAsFixed(1),
          },
        }),
      ).timeout(const Duration(seconds: 5));

      if (response.statusCode == 200) {
        print('✅ Activity logged successfully');
      } else {
        print('❌ Failed to log activity: ${response.statusCode}');
      }
    } catch (e) {
      print('🔥 Error logging activity: $e');
      // Silently fail - activity logging is non-critical
    }
  }

  @override
  void initState() {
    super.initState();
    _loadAttempt();
    WidgetsBinding.instance.addPostFrameCallback((_) => _guardAccess());
    _startQuestionTimer();
  }

  @override
  void dispose() {
    _questionTimer.cancel();
    super.dispose();
  }

  void _startQuestionTimer() {
    _remainingSeconds = _questionTimerSeconds;
    _questionTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!mounted) return;
      setState(() {
        _remainingSeconds--;
      });
      if (_remainingSeconds <= 0) {
        timer.cancel();
        _autoAdvanceToNextQuestion();
      }
    });
  }

  void _autoAdvanceToNextQuestion() {
    if (!_submitted) {
      setState(() => _submitted = true);
    } else {
      _nextQuestion();
    }
  }


  Future<void> _handleBack() async {
    if (_finished) {
      if (context.mounted) context.pop(true);
      return;
    }
    await _persistDraft();
    if (context.mounted) context.pop(false);
  }

  Future<void> _guardAccess() async {
    if (widget.customQuestions != null || widget.chapterQuestions != null) {
      return;
    }
    final authUser = ref.read(authBlocProvider).state.user;
    final hasSubscription =
        ref.read(appUiControllerProvider).hasActiveSubscription ||
            (authUser?.hasActiveSubscription ?? false);
    if (hasSubscription || !mounted) return;
    final prefs = ref.read(sharedPreferencesProvider);
    final sets = await ContentRepository(prefs: prefs).fetchPracticeSets();
    if (!mounted) return;
    Map<String, dynamic>? currentSet;
    for (final set in sets) {
      if (_parseInt(set['id']) == widget.setId) {
        currentSet = set;
        break;
      }
    }
    if (currentSet == null) return;
    final unlocked = ContentAccess.isPracticeSetUnlocked(
      set: currentSet,
      allSets: sets,
      hasActiveSubscription: false,
    );
    if (!unlocked && mounted) {
      ContentAccess.openSubscriptions(context);
      Navigator.of(context).maybePop();
    }
  }

  Future<void> _fetchOptionStats() async {
    try {
      final prefs = ref.read(sharedPreferencesProvider);
      final token = prefs.getString('auth_token') ?? '';

      final response = await http.get(
        Uri.parse('https://api.indraprasthaneetacademy.com/api/analytics/practice-set/${widget.setId}/options'),
        headers: {'Authorization': 'Bearer $token'},
      ).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200 && mounted) {
        final data = jsonDecode(response.body) as Map<String, dynamic>;
        print('✅ API Response: $data');
        setState(() {
          data.forEach((qIdStr, options) {
            final qId = int.tryParse(qIdStr) ?? 0;
            if (options is Map) {
              _optionStats[qId] = {};
              (options as Map<String, dynamic>).forEach((option, percentage) {
                final pct = (percentage is num)
                    ? percentage.toDouble()
                    : double.tryParse(percentage.toString()) ?? 0.0;
                _optionStats[qId]![option] = pct;
              });
            }
          });
          print('📊 Loaded stats: $_optionStats');
        });
      } else {
        print('❌ API Error: ${response.statusCode}');
        // Fallback to default percentages if API fails
        _setupDefaultPercentages();
      }
    } catch (e) {
      print('🔥 Fetch error: $e');
      // Fallback to default percentages on error
      _setupDefaultPercentages();
    }
  }

  void _setupDefaultPercentages() {
    // Set fallback percentages if API fails
    if (mounted) {
      setState(() {
        for (int i = 0; i < _questions.length; i++) {
          if (_optionStats[i] == null || _optionStats[i]!.isEmpty) {
            _optionStats[i] = {
              'A': 45.2,
              'B': 22.3,
              'C': 18.5,
              'D': 14.0,
            };
          }
        }
      });
    }
  }

  Future<void> _loadAttempt() async {
    if (widget.chapterQuestions != null) {
      _set = {'title': widget.chapterName ?? 'Practice'};
      _questions = List<Map<String, dynamic>>.from(widget.chapterQuestions!);
      unawaited(
        warmImageCacheUrls(
          _questions
              .map((q) => questionImageRawUrl(q))
              .where((url) => url.isNotEmpty),
          thumbWidth: 700,
          maxItems: 12,
        ),
      );
      if (mounted) {
        _restoreDraftIfNeeded();
        setState(() => _loading = false);
      }
      return;
    }
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
      final prefs = ref.read(sharedPreferencesProvider);
      final data = await ContentRepository(prefs: prefs).fetchPracticeAttemptData(widget.setId);
      _set = Map<String, dynamic>.from(data['practiceSet'] as Map? ?? {});
      _questions = List<Map<String, dynamic>>.from(
        data['questions'] as List<dynamic>? ?? const [],
      );

      // Fetch option statistics
      unawaited(_fetchOptionStats());

      // Only show chapter picker when a set truly contains multiple chapters.
      final chapters = _groupQuestionsByChapter(_questions);
      if (mounted && chapters.length > 1) {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
            builder: (_) => ChapterListScreen(
              setId: widget.setId,
              questions: _questions,
              setTitle: _set['title']?.toString() ?? 'Practice',
            ),
          ),
        );
        return;
      }

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
    } finally {
      if (mounted) {
        _restoreDraftIfNeeded();
        setState(() => _loading = false);
      }
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
    unawaited(_persistDraft());
  }

  void _nextQuestion() {
    _questionTimer.cancel();
    if (_currentIndex >= _questions.length - 1) {
      setState(() => _finished = true);
      unawaited(_submitPracticeResult());
      return;
    }
    setState(() {
      _currentIndex++;
      _selectedOption = null;
      _submitted = false;
    });
    unawaited(_persistDraft());
    _startQuestionTimer();
  }

  void _previousQuestion() {
    if (_currentIndex <= 0) return;
    _questionTimer.cancel();
    setState(() {
      _currentIndex--;
      _selectedOption = null;
      _submitted = false;
    });
    unawaited(_persistDraft());
    _startQuestionTimer();
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
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) {
        if (!didPop) unawaited(_handleBack());
      },
      child: _buildBody(context),
    );
  }

  Widget _buildBody(BuildContext context) {
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
                  // Progress and Timer Row
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: StatCard(
                          title: 'Q ${_currentIndex + 1}/${_questions.length}',
                          value: '${_currentIndex + 1}/${_questions.length}',
                          subtitle: 'Progress',
                          icon: Icons.task_alt_rounded,
                        ),
                      ),
                      const SizedBox(width: AppSpacing.md),
                      // Timer Display - Enhanced
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          gradient: _remainingSeconds <= 3
                              ? LinearGradient(
                                  colors: [
                                    AppColors.danger.withValues(alpha: 0.15),
                                    AppColors.danger.withValues(alpha: 0.05),
                                  ],
                                )
                              : LinearGradient(
                                  colors: [
                                    AppColors.primary.withValues(alpha: 0.1),
                                    AppColors.primary.withValues(alpha: 0.05),
                                  ],
                                ),
                          borderRadius: BorderRadius.circular(AppRadii.md),
                          border: Border.all(
                            color: _remainingSeconds <= 3
                                ? AppColors.danger
                                : (_remainingSeconds <= 5
                                    ? AppColors.warning
                                    : AppColors.primary),
                            width: 2,
                          ),
                          boxShadow: _remainingSeconds <= 3
                              ? [
                                  BoxShadow(
                                    color: AppColors.danger.withValues(alpha: 0.2),
                                    blurRadius: 8,
                                    spreadRadius: 0,
                                  ),
                                ]
                              : null,
                        ),
                        child: SizedBox(
                          width: 80,
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(
                                Icons.schedule_rounded,
                                size: 22,
                                color: _remainingSeconds <= 3
                                    ? AppColors.danger
                                    : (_remainingSeconds <= 5
                                        ? AppColors.warning
                                        : AppColors.primary),
                              ),
                              const SizedBox(height: 6),
                              AnimatedScale(
                                scale: _remainingSeconds <= 3 ? 1.1 : 1.0,
                                duration: const Duration(milliseconds: 300),
                                child: Text(
                                  '$_remainingSeconds',
                                  style: TextStyle(
                                    fontSize: 24,
                                    fontWeight: FontWeight.w900,
                                    color: _remainingSeconds <= 3
                                        ? AppColors.danger
                                        : (_remainingSeconds <= 5
                                            ? AppColors.warning
                                            : AppColors.primary),
                                  ),
                                ),
                              ),
                              Text(
                                'seconds',
                                style: TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.w600,
                                  color: Theme.of(context)
                                      .colorScheme
                                      .onSurface
                                      .withValues(alpha: 0.6),
                                  letterSpacing: 0.5,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
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

                          final optionLabel = ['A', 'B', 'C', 'D'][index];

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
                              onTap: _submitted
                                  ? null
                                  : () {
                                      setState(() => _selectedOption = index);
                                      unawaited(_persistDraft());
                                    },
                              borderRadius: BorderRadius.circular(AppRadii.md),
                              child: Container(
                                padding: const EdgeInsets.all(AppSpacing.md),
                                decoration: BoxDecoration(
                                  color: bg,
                                  borderRadius: BorderRadius.circular(AppRadii.md),
                                  border: Border.all(color: border),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    // Option Label and Text
                                    Row(
                                      children: [
                                        Text(
                                          '$optionLabel)',
                                          style: questionContentTextStyle(
                                            context,
                                            fontWeight: selected || revealState
                                                ? FontWeight.w700
                                                : FontWeight.w600,
                                            color: textColor,
                                            fontSize: 16,
                                          ),
                                        ),
                                        const SizedBox(width: 12),
                                        Expanded(
                                          child: Text(
                                            options[index],
                                            style: questionContentTextStyle(
                                              context,
                                              fontWeight: selected || revealState
                                                  ? FontWeight.w600
                                                  : FontWeight.w400,
                                              color: textColor,
                                            ),
                                          ),
                                        ),
                                                            ],
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          );
                        }),
                        const SizedBox(height: AppSpacing.lg),
                        // Submit Button
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
                        const SizedBox(height: AppSpacing.md),
                        // Navigation Buttons (Previous/Skip)
                        Row(
                          children: [
                            // Previous Button
                            if (_currentIndex > 0)
                              Expanded(
                                child: SecondaryButton(
                                  label: 'Previous',
                                  icon: Icons.arrow_back_rounded,
                                  onPressed: _previousQuestion,
                                ),
                              ),
                            if (_currentIndex > 0)
                              const SizedBox(width: AppSpacing.md),
                            // Skip Button
                            if (_currentIndex < _questions.length - 1)
                              Expanded(
                                child: SecondaryButton(
                                  label: 'Skip',
                                  icon: Icons.arrow_forward_rounded,
                                  onPressed: _submitted ? null : _nextQuestion,
                                ),
                              ),
                            // Flexible spacing if only one button
                            if (_currentIndex == 0 && _currentIndex < _questions.length - 1)
                              const SizedBox(width: AppSpacing.md),
                            if (_currentIndex == _questions.length - 1)
                              Expanded(child: SizedBox()),
                          ],
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
    this.completed = false,
    this.onOpened,
  });

  final PracticeSet set;
  final bool locked;
  final bool completed;
  final VoidCallback? onOpened;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => ContentAccess.handleTap(
        context: context,
        locked: locked,
        onUnlocked: () async {
          await context.push('/practice/attempt/${set.id}');
          onOpened?.call();
        },
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
                  gradient: locked || completed ? null : AppGradients.primary,
                  color: locked
                      ? AppColors.goldSoft
                      : (completed ? AppColors.success.withValues(alpha: 0.15) : null),
                  borderRadius: BorderRadius.circular(18),
                ),
                child: Icon(
                  locked
                      ? Icons.lock_rounded
                      : (completed
                          ? Icons.check_circle_rounded
                          : Icons.bolt_rounded),
                  color: locked
                      ? AppColors.gold
                      : (completed ? AppColors.success : Colors.white),
                ),
              ),
            const SizedBox(width: AppSpacing.lg),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(set.title, style: Theme.of(context).textTheme.titleMedium),
                  const SizedBox(height: AppSpacing.xs),
                  Text(
                    '${set.topic} . ${set.tag}',
                    style: TextStyle(
                      fontSize: 12,
                      color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.7),
                    ),
                  ),
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
      child: Text(
        label,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w500,
          color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.8),
        ),
      ),
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

class _SubjectTopicsScreen extends StatefulWidget {
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
  State<_SubjectTopicsScreen> createState() => _SubjectTopicsScreenState();
}

class _SubjectTopicsScreenState extends State<_SubjectTopicsScreen> {
  late List<Map<String, dynamic>> _sets;

  @override
  void initState() {
    super.initState();
    _sets = List<Map<String, dynamic>>.from(widget.sets);
  }

  void _refreshSets() {
    setState(() {
      _sets = List<Map<String, dynamic>>.from(widget.sets);
    });
  }

  @override
  Widget build(BuildContext context) {
    final sortedSets = List<Map<String, dynamic>>.from(_sets)
      ..sort(ContentAccess.comparePracticeSetOrder);

    return Scaffold(
      appBar: AppBar(title: Text(widget.subject)),
      body: sortedSets.isEmpty && !widget.hasActiveSubscription
          ? Center(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.lock_rounded, size: 48, color: Colors.grey),
                    const SizedBox(height: 16),
                    const Text(
                      'Premium Content',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'All ${widget.subject} practice sets require Premium subscription.',
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 14, color: Colors.grey),
                    ),
                    const SizedBox(height: 24),
                    ElevatedButton(
                      onPressed: () => ContentAccess.openSubscriptions(context),
                      child: const Text('Upgrade Now'),
                    ),
                  ],
                ),
              ),
            )
          : sortedSets.isEmpty
              ? Center(
                  child: EmptyStateWidget(
                    title: 'No practice sets',
                    subtitle: 'No practice sets available for ${widget.subject}.',
                    icon: Icons.grid_view_rounded,
                  ),
                )
              : ListView.separated(
                  padding: const EdgeInsets.all(AppSpacing.lg),
                  itemCount: sortedSets.length,
                  separatorBuilder: (context, index) => const SizedBox(height: AppSpacing.md),
                  itemBuilder: (context, i) {
                    final set = sortedSets[i];
                    final locked = !ContentAccess.isItemUnlocked(
                      index: i,
                      hasActiveSubscription: widget.hasActiveSubscription,
                    );
                    final completed = isTruthyCompletionFlag(set['is_completed']);
                    final lastAccuracy = _parseDouble(set['last_accuracy']);
                    return _PracticeSetCard(
                      locked: locked,
                      completed: completed,
                      set: PracticeSet(
                        id: '${set['id']}',
                        title: set['title']?.toString() ?? 'Practice Set',
                        topic: set['topic']?.toString() ?? '',
                        questionCount: _parseInt(set['question_count']),
                        difficulty: set['difficulty']?.toString() ?? 'Moderate',
                        estimatedMinutes: _parseInt(set['estimated_minutes'], defaultValue: 20),
                        accuracy: completed ? lastAccuracy / 100 : 0,
                        tag: set['class_label']?.toString() ?? set['standard_label']?.toString() ?? 'Topic',
                      ),
                      onOpened: _refreshSets,
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

class CustomPracticeScreen extends ConsumerStatefulWidget {
  const CustomPracticeScreen({
    super.key,
    required this.allSets,
    required this.hasActiveSubscription,
  });

  final List<Map<String, dynamic>> allSets;
  final bool hasActiveSubscription;

  @override
  ConsumerState<CustomPracticeScreen> createState() => _CustomPracticeScreenState();
}

class _CustomPracticeScreenState extends ConsumerState<CustomPracticeScreen> {
  String? _selectedSubject;
  String? _selectedTopic;
  int _questionCount = 10;
  bool _filterBookmarked = false;
  bool _filterWrong = false;
  bool _loading = false;

  @override
  void initState() {
    super.initState();
  }

  List<Map<String, dynamic>> get _filteredSets {
    final allowedSubjects = ['Biology', 'Chemistry', 'Physics'];
    return widget.allSets.where((set) {
      final subject = set['subject']?.toString() ?? '';
      final topic = set['topic']?.toString() ?? '';

      final isAllowed = allowedSubjects.any((allowed) => allowed.toLowerCase() == subject.toLowerCase());
      if (!isAllowed) return false;

      if (_selectedSubject != null &&
          _selectedSubject!.isNotEmpty &&
          subject.toLowerCase() != _selectedSubject!.toLowerCase()) {
        return false;
      }
      if (_selectedTopic != null &&
          _selectedTopic!.isNotEmpty &&
          topic.toLowerCase() != _selectedTopic!.toLowerCase()) {
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
      final prefs = ref.read(sharedPreferencesProvider);
      final repo = ContentRepository(prefs: prefs);
      final allQuestions = <Map<String, dynamic>>[];
      for (final set in sets) {
        final setId = set['id'] != null ? _parseInt(set['id']) : null;
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

      final savedPractice = ref.read(practiceSavedControllerProvider);
      var filteredQuestions = allQuestions;
      if (_filterBookmarked) {
        filteredQuestions = filteredQuestions
            .where((q) => savedPractice.bookmarkedIds.contains(q['id']?.toString()))
            .toList();
      }
      if (_filterWrong) {
        filteredQuestions = filteredQuestions
            .where((q) => savedPractice.incorrectIds.contains(q['id']?.toString()))
            .toList();
      }

      if (filteredQuestions.isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              _filterBookmarked && _filterWrong
                  ? 'Bookmarked aur wrong answer wale questions nahi mile.'
                  : _filterBookmarked
                      ? 'Bookmarked questions nahi mile.'
                      : 'Wrong answer wale questions nahi mile.',
            ),
          ),
        );
        return;
      }

      filteredQuestions.shuffle();
      final picked = filteredQuestions.take(_questionCount).toList();
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
    final allowedSubjects = ['Biology', 'Chemistry', 'Physics'];

    // Extract unique subjects from widget.allSets matching allowedSubjects
    final subjects = widget.allSets
        .map((set) => set['subject']?.toString().trim() ?? '')
        .where((subject) => subject.isNotEmpty)
        .map((subject) {
          final matched = allowedSubjects.firstWhere(
            (allowed) => allowed.toLowerCase() == subject.toLowerCase(),
            orElse: () => '',
          );
          return matched;
        })
        .where((subject) => subject.isNotEmpty)
        .toSet()
        .toList();

    // Sort subjects so they match the allowedSubjects order
    subjects.sort((a, b) {
      final idxA = allowedSubjects.indexWhere((allowed) => allowed.toLowerCase() == a.toLowerCase());
      final idxB = allowedSubjects.indexWhere((allowed) => allowed.toLowerCase() == b.toLowerCase());
      return idxA.compareTo(idxB);
    });

    // Extract unique topics from widget.allSets subject-wise
    final topics = widget.allSets
        .where((set) {
          final subject = set['subject']?.toString() ?? '';
          if (_selectedSubject != null && _selectedSubject!.isNotEmpty) {
            return subject.toLowerCase() == _selectedSubject!.toLowerCase();
          }
          return allowedSubjects.any((allowed) => allowed.toLowerCase() == subject.toLowerCase());
        })
        .map((set) => set['topic']?.toString().trim() ?? '')
        .where((topic) => topic.isNotEmpty)
        .toSet()
        .toList();
    topics.sort();

    return Scaffold(
      appBar: AppBar(title: const Text('Custom practice')),
      body: SingleChildScrollView(
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
                      'Filter Questions',
                      style: Theme.of(context).textTheme.titleSmall,
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Wrap(
                      spacing: AppSpacing.md,
                      children: [
                        FilterChip(
                          label: const Text('Bookmarked'),
                          avatar: const Icon(Icons.bookmark_rounded, size: 18),
                          selected: _filterBookmarked,
                          onSelected: (selected) {
                            setState(() {
                              _filterBookmarked = selected;
                              if (_filterBookmarked && _filterWrong) {
                                _filterWrong = false;
                              }
                            });
                          },
                        ),
                        FilterChip(
                          label: const Text('Wrong Answers'),
                          avatar: const Icon(Icons.close_rounded, size: 18),
                          selected: _filterWrong,
                          onSelected: (selected) {
                            setState(() {
                              _filterWrong = selected;
                              if (_filterWrong && _filterBookmarked) {
                                _filterBookmarked = false;
                              }
                            });
                          },
                        ),
                      ],
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
      ),
    );
  }
}
