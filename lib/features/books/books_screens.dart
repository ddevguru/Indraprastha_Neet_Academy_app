import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;

import 'package:flutter/foundation.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';
import 'package:webview_flutter/webview_flutter.dart';

import '../../core/access/content_access.dart';
import '../../core/providers/app_state.dart';
import '../content/data/content_repository.dart';
import '../practice/practice_screens.dart';
import '../onboarding/onboarding_checklist_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../core/services/completed_attempt_store.dart';
import '../../core/services/incorrect_pdf_service.dart';
import '../../core/services/onboarding_checklist_service.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import '../../widgets/content_lock.dart';
import '../../widgets/paginated_answer_review.dart';
import '../../widgets/ai_similar_questions_dialog.dart';
import '../../widgets/fast_network_image.dart';
import '../../core/utils/drive_image_url.dart';
import '../../core/utils/question_fields.dart';

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

String _optionLabel(String key, String value) => formatOptionLabel(key, value);

class BooksScreen extends ConsumerStatefulWidget {
  const BooksScreen({super.key});

  @override
  ConsumerState<BooksScreen> createState() => _BooksScreenState();
}

class _BooksScreenState extends ConsumerState<BooksScreen> {
  late final Future<Map<String, dynamic>> _dataFuture;

  @override
  void initState() {
    super.initState();
    _dataFuture = _loadData(ref.read(contentRepositoryProvider));
  }

  Future<Map<String, dynamic>> _loadData(ContentRepository repo) async {
    final results = await Future.wait([
      repo.fetchCourse(),
      repo.fetchBooks(),
    ]);
    final course = results[0] as Map<String, dynamic>;
    final books = results[1] as List<Map<String, dynamic>>;
    return {'course': course['course'], 'books': books};
  }

  Future<void> _openBookChapter(BuildContext context, Map<String, dynamic> book) async {
    final bookId = int.tryParse(book['id']?.toString() ?? '');
    if (bookId == null) return;
    final chapters =
        await ref.read(contentRepositoryProvider).fetchChapters(bookId);
    if (!context.mounted) return;
    final messenger = ScaffoldMessenger.of(context);
    if (chapters.isEmpty) {
      messenger.showSnackBar(
        const SnackBar(
          content: Text('No chapters available for this book.'),
        ),
      );
      return;
    }

    // Prefer the PDF chapter; fall back to first chapter.
    final target = chapters.firstWhere(
      (c) => (c['material_type']?.toString() ?? '').toLowerCase() == 'pdf',
      orElse: () => chapters.first,
    );
    final chapterId = int.tryParse(target['id']?.toString() ?? '');
    if (!context.mounted || chapterId == null) return;
    unawaited(completeOnboardingStep(
      ref,
      OnboardingChecklistStep.openFirstChapter,
    ));
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => ChapterDetailScreen(chapterId: chapterId),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final uiState = ref.watch(appUiControllerProvider);
    final hasSubscription =
        uiState.hasActiveSubscription ||
            (ref.watch(authBlocProvider).state.user?.hasActiveSubscription ??
                false);
    return SingleChildScrollView(
      padding: mobileScrollPadding(context),
      child: CenteredContent(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SectionHeader(
              title: 'Books and notes',
              subtitle:
                  'Structured reading for NCERT, handwritten notes, formula sheets, diagrams, and bookmarks.',
            ),
            if (!hasSubscription) ...[
              const SizedBox(height: AppSpacing.md),
              const FreePreviewBanner(),
            ],
            const SizedBox(height: AppSpacing.lg),
            const SearchBarWidget(hint: 'Search books, notes, chapters, diagrams'),
            const SizedBox(height: AppSpacing.lg),
            FutureBuilder<Map<String, dynamic>>(
              future: _dataFuture,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const SkeletonLoader(cardCount: 4);
                }
                if (snapshot.hasError) {
                  return EmptyStateWidget(
                    title: 'Unable to load notes',
                    subtitle: snapshot.error.toString(),
                    icon: Icons.error_outline_rounded,
                  );
                }
                final course =
                    (snapshot.data?['course'] as Map<String, dynamic>?) ?? {};
                final books = List<Map<String, dynamic>>.from(
                  snapshot.data?['books'] as List<dynamic>? ?? const [],
                );
                final bookmarkedIds = uiState.bookmarkedBookIds
                    .map((e) => e.toString())
                    .toSet();
                final bookmarkedBooks = books
                    .where((b) => bookmarkedIds.contains(b['id']?.toString() ?? ''))
                    .toList();
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SurfaceCard(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Course',
                              style: Theme.of(context).textTheme.titleMedium),
                          const SizedBox(height: AppSpacing.xs),
                          Text(course['name']?.toString() ?? 'Neet Dropper Batch'),
                          const SizedBox(height: AppSpacing.sm),
                          Text(
                            'Current batch: ${course['batch_name'] ?? '-'} (${course['class_label'] ?? '-'})',
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: AppSpacing.xl),
                    if (books.isEmpty)
                      const EmptyStateWidget(
                        title: 'No books available',
                        subtitle: 'Study modules and books will appear here.',
                        icon: Icons.menu_book_outlined,
                      )
                    else
                      _SubjectBooksSection(
                        books: books,
                        hasActiveSubscription: hasSubscription,
                        onBookTap: (book, locked) => ContentAccess.handleTap(
                          context: context,
                          locked: locked,
                          onUnlocked: () => _openBookChapter(context, book),
                        ),
                      ),
                    const SizedBox(height: AppSpacing.xl),
                    SurfaceCard(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SectionHeader(
                            title: 'Saved bookmarks',
                            subtitle:
                                'Your quick-access reading stack for high-yield revision.',
                          ),
                          const SizedBox(height: AppSpacing.md),
                          if (bookmarkedBooks.isEmpty)
                            const EmptyStateWidget(
                              title: 'No bookmarks yet',
                              subtitle:
                                  'Bookmark books to build a faster revision stack.',
                              icon: Icons.bookmark_border_rounded,
                            )
                          else
                            ...bookmarkedBooks.asMap().entries.map(
                              (entry) {
                                final book = entry.value;
                                final bookId = book['id']?.toString() ?? '';
                                final locked = !ContentAccess.isItemUnlocked(
                                  index: books.indexWhere(
                                    (b) => b['id']?.toString() == bookId,
                                  ),
                                  hasActiveSubscription: hasSubscription,
                                );
                                return Padding(
                                  padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                                  child: ListTile(
                                    contentPadding: EdgeInsets.zero,
                                    leading: Icon(
                                      locked
                                          ? Icons.lock_rounded
                                          : Icons.bookmark_rounded,
                                      color: locked ? AppColors.gold : null,
                                    ),
                                    title: Text(book['title']?.toString() ?? ''),
                                    subtitle: Text(
                                      '${book['subject'] ?? ''} • ${book['topic'] ?? ''}',
                                    ),
                                    trailing: buildContentTrailing(locked: locked),
                                    onTap: () => ContentAccess.handleTap(
                                      context: context,
                                      locked: locked,
                                      onUnlocked: () =>
                                          _openBookChapter(context, book),
                                    ),
                                  ),
                                );
                              },
                            ),
                        ],
                      ),
                    ),
                  ],
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

// ── Subject-wise books grouping ───────────────────────────────────────────────

class _SubjectBooksSection extends StatefulWidget {
  const _SubjectBooksSection({
    required this.books,
    required this.hasActiveSubscription,
    required this.onBookTap,
  });

  final List<Map<String, dynamic>> books;
  final bool hasActiveSubscription;
  final void Function(Map<String, dynamic> book, bool locked) onBookTap;

  @override
  State<_SubjectBooksSection> createState() => _SubjectBooksSectionState();
}

class _SubjectBooksSectionState extends State<_SubjectBooksSection> {
  late final Map<String, List<Map<String, dynamic>>> _grouped;
  final Set<String> _expanded = {};

  static IconData _iconFor(String subject) {
    final s = subject.toLowerCase();
    if (s.contains('physics')) return Icons.rocket_launch_rounded;
    if (s.contains('chem')) return Icons.science_rounded;
    if (s.contains('bot')) return Icons.spa_rounded;
    if (s.contains('zoo')) return Icons.pets_rounded;
    if (s.contains('bio')) return Icons.biotech_rounded;
    return Icons.menu_book_rounded;
  }

  @override
  void initState() {
    super.initState();
    _grouped = {};
    for (final book in widget.books) {
      final raw = book['subject']?.toString().trim() ?? '';
      final subject = raw.isNotEmpty ? raw : 'General';
      _grouped.putIfAbsent(subject, () => []).add(book);
    }
    if (_grouped.isNotEmpty) _expanded.add(_grouped.keys.first);
  }

  @override
  Widget build(BuildContext context) {
    final bookIndexById = <String, int>{
      for (var i = 0; i < widget.books.length; i++)
        widget.books[i]['id']?.toString() ?? '$i': i,
    };

    return Column(
      children: _grouped.entries.map((entry) {
        final subject = entry.key;
        final books = entry.value;
        final isOpen = _expanded.contains(subject);
        return Padding(
          padding: const EdgeInsets.only(bottom: AppSpacing.md),
          child: SurfaceCard(
            padding: EdgeInsets.zero,
            child: Column(
              children: [
                InkWell(
                  onTap: () => setState(() {
                    if (isOpen) {
                      _expanded.remove(subject);
                    } else {
                      _expanded.add(subject);
                    }
                  }),
                  borderRadius: BorderRadius.circular(AppRadii.lg),
                  child: Padding(
                    padding: const EdgeInsets.all(AppSpacing.md),
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
                              Text('${books.length} book${books.length == 1 ? '' : 's'}'),
                            ],
                          ),
                        ),
                        Icon(
                          isOpen
                              ? Icons.keyboard_arrow_up_rounded
                              : Icons.keyboard_arrow_down_rounded,
                        ),
                      ],
                    ),
                  ),
                ),
                if (isOpen) ...[
                  const Divider(height: 1),
                  ...books.map(
                    (book) {
                      final bookId = book['id']?.toString() ?? '';
                      final index = bookIndexById[bookId] ?? 0;
                      final locked = !ContentAccess.isItemUnlocked(
                        index: index,
                        hasActiveSubscription: widget.hasActiveSubscription,
                      );
                      return ListTile(
                        leading: Icon(
                          locked
                              ? Icons.lock_rounded
                              : Icons.auto_stories_rounded,
                          color: locked ? AppColors.gold : null,
                        ),
                        title: Text(book['title']?.toString() ?? ''),
                        subtitle: Text(book['topic']?.toString() ?? ''),
                        trailing: buildContentTrailing(locked: locked),
                        onTap: () => widget.onBookTap(book, locked),
                      );
                    },
                  ),
                ],
              ],
            ),
          ),
        );
      }).toList(),
    );
  }
}

class ChapterDetailScreen extends ConsumerWidget {
  const ChapterDetailScreen({
    super.key,
    required this.chapterId,
  });

  final int chapterId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final repo = ref.read(contentRepositoryProvider);
    final chapterFuture = repo.fetchChapterDetail(chapterId);
    final pyqFuture = repo.fetchPyqs(chapterId);
    final highlightQuestionsFuture = repo.fetchHighlightQuestions(chapterId);
    return FutureBuilder<Map<String, dynamic>>(
      future: Future.wait([chapterFuture, pyqFuture, highlightQuestionsFuture]).then((v) => {
        'chapter': (v[0] as Map<String, dynamic>)['chapter'],
        'pyqs': v[1] as List<Map<String, dynamic>>,
        'highlightQuestions': v[2] as List<Map<String, dynamic>>,
      }),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(body: Center(child: CircularProgressIndicator()));
        }
        final chapter = Map<String, dynamic>.from(
          snapshot.data?['chapter'] as Map? ?? const {},
        );
        final pyqs = List<Map<String, dynamic>>.from(
          snapshot.data?['pyqs'] as List<dynamic>? ?? const [],
        );
        final highlightQuestions = List<Map<String, dynamic>>.from(
          snapshot.data?['highlightQuestions'] as List<dynamic>? ?? const [],
        );
        final chapterIdString = chapter['id']?.toString() ?? '$chapterId';
        final isSaved =
            ref.watch(appUiControllerProvider).savedChapterIds.contains(chapterIdString);
        return DefaultTabController(
          length: 2,
          child: Scaffold(
            appBar: AppBar(
              title: Text(chapter['title']?.toString() ?? 'Chapter'),
              actions: [
                IconButton(
                  onPressed: () => ref
                      .read(appUiControllerProvider.notifier)
                      .toggleSavedChapter(chapterIdString),
                  icon: Icon(
                    isSaved
                        ? Icons.bookmark_rounded
                        : Icons.bookmark_border_rounded,
                  ),
                ),
              ],
              bottom: const TabBar(
                tabs: [
                  Tab(text: 'Book & Notes'),
                  Tab(text: 'Highlights'),
                ],
              ),
            ),
            body: Column(
              children: [
                // ── Chapter info header ─────────────────────────────────────
                Padding(
                  padding: const EdgeInsets.fromLTRB(
                      AppSpacing.lg, AppSpacing.md, AppSpacing.lg, AppSpacing.sm),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        chapter['title']?.toString() ?? '',
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                      if ((chapter['overview']?.toString() ?? '').isNotEmpty) ...[
                        const SizedBox(height: AppSpacing.xs),
                        Text(chapter['overview']?.toString() ?? ''),
                      ],
                      const SizedBox(height: AppSpacing.xs),
                      Row(
                        children: [
                          Text(
                            'Linked PYQs: ${chapter['linked_pyq_count'] ?? pyqs.length}',
                            style: Theme.of(context).textTheme.bodySmall,
                          ),
                          const Spacer(),
                          if (pyqs.isNotEmpty)
                            InkWell(
                              onTap: () => Navigator.of(context).push(
                                MaterialPageRoute(
                                  builder: (_) => PracticeAttemptScreen(
                                    setId: 0,
                                    chapterName: chapter['title']?.toString() ?? 'Chapter PYQs',
                                    chapterQuestions: pyqs,
                                  ),
                                ),
                              ),
                              borderRadius: BorderRadius.circular(AppRadii.md),
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                decoration: BoxDecoration(
                                  gradient: AppGradients.primary,
                                  borderRadius: BorderRadius.circular(AppRadii.md),
                                ),
                                child: const Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Icon(Icons.play_arrow_rounded, color: Colors.white, size: 16),
                                    SizedBox(width: 4),
                                    Text(
                                      'Practice PYQs',
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 12,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                        ],
                      ),
                    ],
                  ),
                ),
                const Divider(height: 1),
                Expanded(
                  child: TabBarView(
                    children: [
                      _PdfOrNotesPanel(chapter: chapter),
                      _HighlightEbookPanel(
                        chapter: chapter,
                        highlightQuestions: highlightQuestions,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _PyqSolvePanel extends ConsumerStatefulWidget {
  const _PyqSolvePanel({required this.pyqs});

  final List<Map<String, dynamic>> pyqs;

  @override
  ConsumerState<_PyqSolvePanel> createState() => _PyqSolvePanelState();
}

class _PyqSolvePanelState extends ConsumerState<_PyqSolvePanel> {
  int _index = 0;
  final Map<int, String> _answers = {};
  bool _submitted = false;

  dynamic get _pyqKey =>
      widget.pyqs.isNotEmpty ? (widget.pyqs.first['chapter_id'] ?? widget.pyqs.first['id'] ?? 'default_pyq') : 'default_pyq';

  @override
  void initState() {
    super.initState();
    _restoreCompletedState();
    unawaited(
      warmImageCacheUrls(
        widget.pyqs
            .map((q) => questionImageRawUrl(q))
            .where((url) => url.isNotEmpty),
        thumbWidth: 700,
        maxItems: 12,
      ),
    );
  }

  Future<void> _restoreCompletedState() async {
    final prefs = await SharedPreferences.getInstance();
    final userId = ref.read(authBlocProvider).state.user?.mobileNumber;
    final completedStore = CompletedAttemptStore(prefs, userId: userId);
    final completed = completedStore.loadCompletedPyq(_pyqKey);
    if (completed != null && mounted) {
      final savedAnswers = completed['answers'];
      if (savedAnswers is Map) {
        savedAnswers.forEach((key, value) {
          final idx = int.tryParse(key.toString());
          if (idx != null && value != null) {
            _answers[idx] = value.toString();
          }
        });
      }
      setState(() {
        _submitted = true;
      });
    }
  }

  Future<void> _saveCompletedState() async {
    final prefs = await SharedPreferences.getInstance();
    final userId = ref.read(authBlocProvider).state.user?.mobileNumber;
    final completedStore = CompletedAttemptStore(prefs, userId: userId);
    await completedStore.saveCompletedPyq(_pyqKey, {
      'answers': _answers.map((k, v) => MapEntry('$k', v)),
      'completedAt': DateTime.now().toIso8601String(),
    });
  }

  void _openReview() {
    final items = List.generate(
      widget.pyqs.length,
      (i) => AnswerReviewEntry.fromAbcdMap(
        question: widget.pyqs[i],
        index: i,
        selectedOption: _answers[i],
      ),
    );
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => PaginatedAnswerReviewScreen(
          title: 'PYQ Review',
          items: items,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (widget.pyqs.isEmpty) {
      return const _DetailPanel(
        title: 'PYQs',
        content: 'No PYQs added yet.',
        bullets: ['Previous year questions will appear here once published.'],
      );
    }

    if (_submitted) {
      var correct = 0;
      for (var i = 0; i < widget.pyqs.length; i++) {
        final marked = _answers[i]?.toUpperCase();
        final actual =
            widget.pyqs[i]['correct_option']?.toString().toUpperCase() ?? '';
        if (marked == actual) correct++;
      }
      final wrong = _answers.length - correct;
      final unattempted = widget.pyqs.length - _answers.length;
      final attempted = correct + wrong;
      final accuracy = attempted == 0 ? 0.0 : (correct / attempted) * 100;
      final score = (correct * 4) - (wrong * 1);
      final totalMarks = widget.pyqs.length * 4;

      return SizedBox.expand(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.md),
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
                      '$score/$totalMarks',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 48,
                        fontWeight: FontWeight.w900,
                        height: 1,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.xs),
                    const Text(
                      'Your Score (Marks)',
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
                      value: '$correct',
                      subtitle: 'questions',
                      icon: Icons.check_circle_outline_rounded,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: StatCard(
                      title: 'Wrong',
                      value: '$wrong',
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
              const SizedBox(height: AppSpacing.md),
              Text(
                'Correct: $correct  •  Wrong: $wrong  •  Skipped: $unattempted',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
              const SizedBox(height: AppSpacing.lg),
              PrimaryButton(
                label: 'Review answers',
                expanded: true,
                icon: Icons.fact_check_rounded,
                onPressed: _openReview,
              ),
              const SizedBox(height: AppSpacing.sm),
              SecondaryButton(
                label: 'Download Incorrect PDF',
                expanded: true,
                icon: Icons.picture_as_pdf_rounded,
                onPressed: () {
                  final items = List.generate(
                    widget.pyqs.length,
                    (i) => AnswerReviewEntry.fromAbcdMap(
                      question: widget.pyqs[i],
                      index: i,
                      selectedOption: _answers[i],
                    ),
                  );
                  IncorrectPdfService.downloadFromReviewEntries(
                    context: context,
                    title: 'PYQ Result',
                    entries: items,
                  );
                },
              ),
              const SizedBox(height: AppSpacing.sm),
              SecondaryButton(
                label: 'Solve again',
                expanded: true,
                onPressed: () => setState(() {
                  _submitted = false;
                  _index = 0;
                  _answers.clear();
                }),
              ),
            ],
          ),
        ),
      );
    }

    final q = widget.pyqs[_index.clamp(0, widget.pyqs.length - 1)];
    final selected = _answers[_index];
    final options = readQuestionOptions(q);
    final correctOpt = readCorrectOption(q);

    return SizedBox.expand(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.md),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            StatCard(
              title: 'Progress',
              value: '${_index + 1}/${widget.pyqs.length}',
              subtitle: 'Chapter PYQs',
              icon: Icons.timelapse_rounded,
            ),
            const SizedBox(height: AppSpacing.md),
            SurfaceCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  buildQuestionTextBlock(
                    context,
                    q,
                    style: questionContentTextStyle(
                      context,
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  if (hasQuestionImage(q)) ...[
                    const SizedBox(height: AppSpacing.sm),
                    _buildQuestionImage(questionImageRawUrl(q)),
                  ],
                  const SizedBox(height: AppSpacing.md),
                  ...options.entries.map((e) {
                    final isSel = selected == e.key;
                    final isCorrect = e.key == correctOpt;
                    final isAnswered = selected != null;
                    final isDark = Theme.of(context).brightness == Brightness.dark;

                    Color bg;
                    Color border;
                    Color textColor;

                    if (isAnswered) {
                      if (isCorrect) {
                        bg = isDark
                            ? AppColors.success.withValues(alpha: 0.18)
                            : const Color(0xFFE7F8EF);
                        border = AppColors.success;
                        textColor = isDark ? const Color(0xFF6EE7A0) : AppColors.success;
                      } else if (isSel) {
                        bg = isDark
                            ? AppColors.danger.withValues(alpha: 0.18)
                            : const Color(0xFFFCEAEA);
                        border = AppColors.danger;
                        textColor = isDark ? const Color(0xFFFF9B8F) : AppColors.danger;
                      } else {
                        bg = Theme.of(context).cardColor;
                        border = isDark ? const Color(0xFF343B49) : AppColors.border;
                        textColor = Theme.of(context).colorScheme.onSurface;
                      }
                    } else if (isSel) {
                      bg = isDark
                          ? AppColors.primary.withValues(alpha: 0.2)
                          : AppColors.indigoSoft;
                      border = AppColors.indigo;
                      textColor = AppColors.primary;
                    } else {
                      bg = Theme.of(context).cardColor;
                      border = isDark ? const Color(0xFF343B49) : AppColors.border;
                      textColor = Theme.of(context).colorScheme.onSurface;
                    }

                    final optImg = readQuestionOptionImage(q, e.key);

                    return Padding(
                      padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                      child: InkWell(
                        onTap: () => setState(() => _answers[_index] = e.key),
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
                              Text(
                                _optionLabel(e.key, e.value),
                                style: questionContentTextStyle(context, color: textColor),
                              ),
                              if (optImg.isNotEmpty) ...[
                                const SizedBox(height: 8),
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(AppRadii.sm),
                                  child: FastNetworkImage(
                                    url: optImg,
                                    width: double.infinity,
                                    height: 160,
                                    fit: BoxFit.contain,
                                    borderRadius: BorderRadius.circular(AppRadii.sm),
                                  ),
                                ),
                              ],
                            ],
                          ),
                        ),
                      ),
                    );
                  }),
                  if (selected != null) ...[
                    const SizedBox(height: AppSpacing.md),
                    Builder(
                      builder: (context) {
                        final isDark = Theme.of(context).brightness == Brightness.dark;
                        final expText = q['explanation']?.toString().trim() ?? '';
                        final expImgUrl = explanationImageRawUrl(q);
                        final expImagesList = q['explanation_images_list'] != null
                            ? List<Map<String, dynamic>>.from(
                                (q['explanation_images_list'] as List).map(
                                  (e) => Map<String, dynamic>.from(e as Map),
                                ),
                              )
                            : <Map<String, dynamic>>[];

                        final hasExpText = expText.isNotEmpty;
                        final hasExpImg = expImgUrl.isNotEmpty;
                        final hasExpList = expImagesList.isNotEmpty;

                        final rawSim = q['similar_question'] ?? q['similarQuestion'];
                        Map<String, dynamic>? simQMap;
                        if (rawSim is Map) {
                          simQMap = Map<String, dynamic>.from(rawSim);
                        } else if (rawSim is String && rawSim.trim().isNotEmpty) {
                          try {
                            final d = jsonDecode(rawSim);
                            if (d is Map) simQMap = Map<String, dynamic>.from(d);
                          } catch (_) {}
                        }

                        return Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              width: double.infinity,
                              padding: const EdgeInsets.all(AppSpacing.md),
                              decoration: BoxDecoration(
                                color: isDark ? const Color(0xFF1E293B) : const Color(0xFFF0F7FF),
                                borderRadius: BorderRadius.circular(AppRadii.lg),
                                border: Border.all(
                                  color: isDark ? const Color(0xFF334155) : const Color(0xFFBAE6FD),
                                ),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Icon(
                                        Icons.lightbulb_rounded,
                                        color: isDark ? const Color(0xFFF59E0B) : const Color(0xFF0284C7),
                                        size: 20,
                                      ),
                                      const SizedBox(width: 8),
                                      Text(
                                        'Explanation',
                                        style: questionContentTextStyle(
                                          context,
                                          fontSize: 16,
                                          fontWeight: FontWeight.w700,
                                          color: isDark ? const Color(0xFFF8FAFC) : const Color(0xFF0F172A),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: AppSpacing.sm),
                                  if (hasExpText)
                                    Text(
                                      expText,
                                      style: questionContentTextStyle(
                                        context,
                                        fontSize: 15,
                                        fontWeight: FontWeight.w400,
                                      ),
                                    ),
                                  if (hasExpImg) ...[
                                    if (hasExpText) const SizedBox(height: AppSpacing.sm),
                                    _buildQuestionImage(expImgUrl),
                                  ],
                                  if (hasExpList) ...[
                                    for (final imgData in expImagesList) ...[
                                      const SizedBox(height: AppSpacing.sm),
                                      _buildQuestionImage(explanationImageRawUrl(imgData)),
                                    ],
                                  ],
                                  if (!hasExpText && !hasExpImg && !hasExpList)
                                    Text(
                                      'No explanation available for this question.',
                                      style: questionContentTextStyle(
                                        context,
                                        fontSize: 14,
                                        color: Theme.of(context)
                                            .colorScheme
                                            .onSurface
                                            .withValues(alpha: 0.6),
                                      ),
                                    ),
                                ],
                              ),
                            ),
                            if (simQMap != null) ...[
                              const SizedBox(height: AppSpacing.md),
                              Material(
                                color: Colors.transparent,
                                child: InkWell(
                                  onTap: () {
                                    showSingleSimilarQuestionSheet(
                                      context,
                                      similarQuestion: simQMap,
                                      questionTitle: 'PYQ ${_index + 1} - Similar Question',
                                    );
                                  },
                                  borderRadius: BorderRadius.circular(AppRadii.lg),
                                  child: Ink(
                                    width: double.infinity,
                                    padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: 12),
                                    decoration: BoxDecoration(
                                      gradient: const LinearGradient(
                                        colors: [Color(0xFF4F46E5), Color(0xFF7C3AED)],
                                        begin: Alignment.topLeft,
                                        end: Alignment.bottomRight,
                                      ),
                                      borderRadius: BorderRadius.circular(AppRadii.lg),
                                      boxShadow: [
                                        BoxShadow(
                                          color: const Color(0xFF4F46E5).withValues(alpha: 0.25),
                                          blurRadius: 10,
                                          offset: const Offset(0, 4),
                                        ),
                                      ],
                                    ),
                                    child: const Row(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        Icon(Icons.auto_awesome_rounded, color: Colors.white, size: 18),
                                        SizedBox(width: 8),
                                        Text(
                                          'Solve Similar Question',
                                          style: TextStyle(
                                            color: Colors.white,
                                            fontSize: 14,
                                            fontWeight: FontWeight.w700,
                                            letterSpacing: 0.3,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ],
                        );
                      },
                    ),
                  ],
                ],
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
                    label: _index == widget.pyqs.length - 1
                        ? 'Submit PYQs'
                        : 'Next',
                    onPressed: () {
                      if (_index < widget.pyqs.length - 1) {
                        setState(() => _index++);
                      } else {
                        unawaited(_saveCompletedState());
                        setState(() => _submitted = true);
                      }
                    },
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _PdfOrNotesPanel extends StatefulWidget {
  const _PdfOrNotesPanel({required this.chapter});

  final Map<String, dynamic> chapter;

  @override
  State<_PdfOrNotesPanel> createState() => _PdfOrNotesPanelState();
}

class _PdfOrNotesPanelState extends State<_PdfOrNotesPanel> {
  int _previewKey = 0;
  WebViewController? _webViewController;
  String? _loadedPreviewUrl;

  @override
  Widget build(BuildContext context) {
    final materialType = (widget.chapter['material_type']?.toString() ?? '').toLowerCase();
    final isPdfMaterial = materialType.contains('pdf');
    final driveLink = _resolveMaterialLink(widget.chapter);
    final note = _normalizeExtractedText(widget.chapter['note_summary']?.toString() ?? '');
    final previewUrl = _toDrivePreviewUrl(driveLink);
    _ensurePreviewController(previewUrl);

    // ── Error state: PDF chapter but no valid Drive link ───────────────────
    if (isPdfMaterial && previewUrl == null) {
      return SizedBox.expand(
        child: SurfaceCard(
          child: Center(
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.xl),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.picture_as_pdf_rounded,
                      size: 52, color: AppColors.danger),
                  const SizedBox(height: AppSpacing.md),
                  Text(
                    'PDF not available',
                    style: Theme.of(context)
                        .textTheme
                        .titleMedium
                        ?.copyWith(fontWeight: FontWeight.w700),
                  ),
                  const SizedBox(height: AppSpacing.xs),
                  const Text(
                    'The PDF link for this chapter is missing or invalid. '
                    'Ask the admin to re-upload the PDF from the admin panel.',
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),
        ),
      );
    }

    // ── Normal PDF viewer ──────────────────────────────────────────────────
    if (isPdfMaterial && previewUrl != null) {
      return SizedBox.expand(
        child: SurfaceCard(
          padding: EdgeInsets.zero,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: 8),
                decoration: BoxDecoration(
                  gradient: AppGradients.primary,
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(AppRadii.md)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.auto_stories_rounded, color: Colors.white, size: 18),
                    const SizedBox(width: AppSpacing.sm),
                    Expanded(
                      child: Text(
                        widget.chapter['title']?.toString() ?? 'Chapter eBook',
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w800,
                          fontSize: 13,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.refresh_rounded, color: Colors.white, size: 18),
                      tooltip: 'Reload eBook',
                      visualDensity: VisualDensity.compact,
                      onPressed: () {
                        _webViewController?.loadRequest(Uri.parse(previewUrl));
                        setState(() {
                          _previewKey++;
                        });
                      },
                    ),
                  ],
                ),
              ),
              Expanded(
                child: ClipRRect(
                  borderRadius: const BorderRadius.only(
                    bottomLeft: Radius.circular(AppRadii.md),
                    bottomRight: Radius.circular(AppRadii.md),
                  ),
                  child: WebViewWidget(
                    key: ValueKey('pdf-preview-$_previewKey'),
                    controller: _webViewController!,
                    gestureRecognizers: {
                      Factory<EagerGestureRecognizer>(
                        EagerGestureRecognizer.new,
                      ),
                    },
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    }

    // ── Text / notes fallback ──────────────────────────────────────────────
    return SizedBox.expand(
      child: _DetailPanel(
        title: 'Structured notes',
        content: note.trim().isNotEmpty
            ? note
            : (isPdfMaterial
                ? 'Loading chapter eBook content...'
                : ''),
        bullets: const [
          'Concept overview cards',
          'Formula and memory anchors',
          'High-yield mistakes to avoid',
        ],
      ),
    );
  }

  void _ensurePreviewController(String? previewUrl) {
    if (previewUrl == null) return;
    if (_webViewController != null && _loadedPreviewUrl == previewUrl) return;
    _webViewController = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(Colors.transparent)
      ..loadRequest(Uri.parse(previewUrl));
    _loadedPreviewUrl = previewUrl;
  }
}

String _resolveMaterialLink(Map<String, dynamic> chapter) {
  const candidateKeys = [
    'material_drive_link',
    'material_link',
    'pdf_link',
    'drive_link',
    'url',
  ];
  for (final key in candidateKeys) {
    final value = chapter[key]?.toString().trim() ?? '';
    if (value.isNotEmpty) {
      return value;
    }
  }
  return '';
}

String? _toDrivePreviewUrl(String raw) {
  if (raw.trim().isEmpty) return null;
  final uri = Uri.tryParse(raw);
  if (uri == null) return null;

  final id = _extractGoogleDriveFileId(uri);
  if (id != null && id.isNotEmpty) {
    return 'https://drive.google.com/file/d/$id/preview';
  }

  // Fallback: just open the given URL in webview.
  return raw;
}

String? _extractGoogleDriveFileId(Uri uri) {
  final idFromQuery = uri.queryParameters['id'];
  if (idFromQuery != null && idFromQuery.isNotEmpty) return idFromQuery;

  final s = uri.toString();
  final m1 = RegExp(r'/file/d/([^/]+)').firstMatch(s);
  if (m1 != null) return m1.group(1);

  final m2 = RegExp(r'drive\.google\.com\/open\?id=([^&]+)').firstMatch(s);
  if (m2 != null) return m2.group(1);

  final m3 = RegExp(r'[?&]id=([^&]+)').firstMatch(s);
  if (m3 != null) return m3.group(1);

  return null;
}

String _normalizeExtractedText(String raw) {
  var s = raw.replaceAll('\u0000', '').trim();
  if (s.isEmpty) return '';
  // If the text is char-per-line (vertical), join it.
  final lines = s.split('\n');
  final shortLines = lines.where((l) => l.trim().isNotEmpty && l.trim().length <= 3).length;
  if (lines.length > 30 && (shortLines / lines.length) > 0.8) {
    s = lines.map((l) => l.trim()).where((l) => l.isNotEmpty).join(' ');
  }
  // Light cleanup: normalize whitespace but preserve paragraphs.
  s = s.replaceAll(RegExp(r'\r'), '\n');
  s = s.replaceAll(RegExp(r'[ \t]+'), ' ');
  s = s.replaceAll(RegExp(r'\n{3,}'), '\n\n');
  return s.trim();
}

// ── Highlighted eBook Panel with Interactive MCQ Solving ─────────────────────

class _HighlightEbookPanel extends StatefulWidget {
  const _HighlightEbookPanel({
    required this.chapter,
    required this.highlightQuestions,
  });

  final Map<String, dynamic> chapter;
  final List<Map<String, dynamic>> highlightQuestions;

  @override
  State<_HighlightEbookPanel> createState() => _HighlightEbookPanelState();
}

class _HighlightEbookPanelState extends State<_HighlightEbookPanel> {
  int _previewKey = 0;
  WebViewController? _webViewController;
  final Set<int> _solvedQuestionIds = {};
  String? _loadedFileId;
  bool _isLoading = false;
  bool _useDriveFallback = false;
  bool _pdfViewMode = false;

  @override
  void initState() {
    super.initState();
    _loadPdf();
  }

  @override
  void didUpdateWidget(covariant _HighlightEbookPanel oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.chapter['id'] != widget.chapter['id'] ||
        oldWidget.chapter['highlight_drive_link'] != widget.chapter['highlight_drive_link'] ||
        oldWidget.chapter['material_drive_link'] != widget.chapter['material_drive_link']) {
      _loadPdf();
    }
  }

  String _extractFileId() {
    final hlFileId = widget.chapter['highlight_drive_file_id']?.toString().trim() ?? '';
    if (hlFileId.isNotEmpty) return hlFileId;

    final hlLink = widget.chapter['highlight_drive_link']?.toString().trim() ?? '';
    if (hlLink.isNotEmpty) {
      final uri = Uri.tryParse(hlLink);
      final id = uri != null ? _extractGoogleDriveFileId(uri) : null;
      if (id != null && id.isNotEmpty) return id;
    }

    final matFileId = widget.chapter['material_drive_file_id']?.toString().trim() ?? '';
    if (matFileId.isNotEmpty) return matFileId;

    final matLink = widget.chapter['material_drive_link']?.toString().trim() ?? '';
    if (matLink.isNotEmpty) {
      final uri = Uri.tryParse(matLink);
      final id = uri != null ? _extractGoogleDriveFileId(uri) : null;
      if (id != null && id.isNotEmpty) return id;
    }

    return '';
  }

  Future<void> _loadPdf() async {
    final fileId = _extractFileId();
    if (fileId.isEmpty) {
      if (mounted) {
        setState(() {
          _isLoading = false;
          _loadedFileId = '';
          _webViewController = null;
        });
      }
      return;
    }

    if (_loadedFileId == fileId && _webViewController != null) return;
    _loadedFileId = fileId;

    if (mounted) {
      setState(() {
        _isLoading = true;
        _useDriveFallback = false;
      });
    }

    Uint8List? bytes;

    // 1. Try local cache
    try {
      final tempDir = await getTemporaryDirectory();
      final cacheFile = File('${tempDir.path}/hl_ebook_$fileId.pdf');
      if (await cacheFile.exists() && (await cacheFile.length()) > 5000) {
        bytes = await cacheFile.readAsBytes();
      }
    } catch (_) {}

    // 2. Download from Google Drive if not cached
    if (bytes == null || bytes.isEmpty) {
      final directDownloadUrl = 'https://drive.usercontent.google.com/download?id=$fileId&export=download';
      final ucDownloadUrl = 'https://drive.google.com/uc?export=download&id=$fileId';

      try {
        final res = await http.get(Uri.parse(directDownloadUrl)).timeout(const Duration(seconds: 8));
        if (res.statusCode == 200 && res.bodyBytes.length > 5000) {
          bytes = res.bodyBytes;
        }
      } catch (_) {}

      if (bytes == null || bytes.isEmpty) {
        try {
          final res = await http.get(Uri.parse(ucDownloadUrl)).timeout(const Duration(seconds: 8));
          if (res.statusCode == 200 && res.bodyBytes.length > 5000) {
            bytes = res.bodyBytes;
          }
        } catch (_) {}
      }

      if (bytes != null && bytes.isNotEmpty) {
        try {
          final tempDir = await getTemporaryDirectory();
          final cacheFile = File('${tempDir.path}/hl_ebook_$fileId.pdf');
          await cacheFile.writeAsBytes(bytes);
        } catch (_) {}
      }
    }

    if (bytes != null && bytes.isNotEmpty && mounted) {
      final b64 = base64Encode(bytes);
      _setupInteractivePdf(fileId: fileId, base64Data: b64);
      setState(() {
        _isLoading = false;
        _useDriveFallback = false;
      });
      return;
    }

    // 3. Fallback to Google Drive native preview
    if (mounted) {
      _setupDriveFallback(fileId: fileId);
      setState(() {
        _isLoading = false;
        _useDriveFallback = true;
      });
    }
  }

  void _setupInteractivePdf({required String fileId, required String base64Data}) {
    final fallbackPreviewUrl = 'https://drive.google.com/file/d/$fileId/preview';
    final html = _buildInteractivePdfHtml(
      base64Pdf: base64Data,
      fallbackPreviewUrl: fallbackPreviewUrl,
    );

    _webViewController = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(Colors.white)
      ..addJavaScriptChannel(
        'HighlightChannel',
        onMessageReceived: (JavaScriptMessage message) {
          try {
            final data = jsonDecode(message.message) as Map<String, dynamic>;
            final qId = data['questionId'];
            if (qId != null) {
              Map<String, dynamic>? targetQ;
              for (final q in widget.highlightQuestions) {
                if (q['id'] == qId || q['id']?.toString() == qId.toString()) {
                  targetQ = q;
                  break;
                }
              }
              if (targetQ != null && mounted) {
                _openQuestionPopup(context, targetQ);
              }
            }
          } catch (_) {}
        },
      )
      ..loadHtmlString(html, baseUrl: 'https://indraprasthaneetacademy.com');
  }

  void _setupDriveFallback({required String fileId}) {
    final previewUrl = 'https://drive.google.com/file/d/$fileId/preview';
    _webViewController = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(Colors.transparent)
      ..loadRequest(Uri.parse(previewUrl));
  }

  String _buildInteractivePdfHtml({
    required String base64Pdf,
    required String fallbackPreviewUrl,
  }) {
    final questionsJson = jsonEncode(widget.highlightQuestions);
    final solvedIdsJson = jsonEncode(_solvedQuestionIds.toList());

    return '''<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, user-scalable=yes">
  <title>Highlighted eBook Reader</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf_viewer.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background-color: #525659;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      overflow-x: hidden;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    #viewer-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px 0 40px 0;
      gap: 12px;
    }
    .page-wrapper {
      position: relative;
      background: #ffffff;
      box-shadow: 0 4px 14px rgba(0,0,0,0.3);
      border-radius: 2px;
      overflow: hidden;
    }
    .page-canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
    .textLayer {
      position: absolute;
      left: 0; top: 0; right: 0; bottom: 0;
      overflow: hidden;
      opacity: 1;
      line-height: 1.0;
      pointer-events: none;
    }
    .textLayer span {
      color: transparent;
      position: absolute;
      white-space: pre;
      cursor: default;
      transform-origin: 0% 0%;
      pointer-events: none;
    }
    .textLayer span.clickable-highlight {
      pointer-events: auto !important;
      cursor: pointer !important;
      background-color: rgba(34, 197, 94, 0.35) !important;
      border-bottom: 3px solid #16a34a !important;
      border-radius: 3px;
      box-shadow: 0 1px 4px rgba(22, 163, 74, 0.4);
      z-index: 100 !important;
      -webkit-tap-highlight-color: rgba(34, 197, 94, 0.5);
      transition: background-color 0.15s ease;
    }
    .textLayer span.clickable-highlight:active {
      background-color: rgba(34, 197, 94, 0.65) !important;
    }
    .textLayer span.clickable-highlight-solved {
      pointer-events: auto !important;
      cursor: pointer !important;
      background-color: rgba(59, 130, 246, 0.25) !important;
      border-bottom: 2.5px solid #2563eb !important;
      border-radius: 3px;
      z-index: 100 !important;
    }
    #loading-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      color: #333333;
      font-size: 14px;
      font-weight: 600;
    }
    .spinner {
      width: 36px;
      height: 36px;
      border: 3.5px solid #e2e8f0;
      border-top-color: #d97706;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 12px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div id="loading-overlay">
    <div class="spinner"></div>
    <div id="loading-text">Rendering eBook Pages...</div>
  </div>

  <div id="viewer-container"></div>

  <script>
    const questionsData = $questionsJson;
    const solvedIds = new Set($solvedIdsJson);
    let pdfDoc = null;
    let switchedToFallback = false;

    // Failover safety timer: if PDF.js takes more than 7s, switch to Drive viewer automatically
    const failoverTimer = setTimeout(function() {
      if (!pdfDoc && !switchedToFallback) {
        switchedToFallback = true;
        window.location.replace('$fallbackPreviewUrl');
      }
    }, 7000);

    window.notifySolved = function(qid) {
      solvedIds.add(qid);
      document.querySelectorAll('[data-qid="' + qid + '"]').forEach(el => {
        el.classList.remove('clickable-highlight');
        el.classList.add('clickable-highlight-solved');
      });
    };

    window.scrollToPage = function(pageNum) {
      const el = document.getElementById('page-wrapper-' + pageNum);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    async function initPdf() {
      try {
        if (!window.pdfjsLib) {
          throw new Error('PDF.js library not loaded');
        }
        // Disable external worker to avoid Cross-Origin Worker SOP errors on Android WebView
        pdfjsLib.GlobalWorkerOptions.workerSrc = '';

        const b64Data = "$base64Pdf";
        const binStr = atob(b64Data);
        const len = binStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binStr.charCodeAt(i);
        }

        const loadingTask = pdfjsLib.getDocument({
          data: bytes,
          cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
          cMapPacked: true,
        });
        pdfDoc = await loadingTask.promise;
        clearTimeout(failoverTimer);

        const container = document.getElementById('viewer-container');
        container.innerHTML = '';

        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
          await renderPage(pageNum, container);
          if (pageNum === 1) {
            const overlay = document.getElementById('loading-overlay');
            if (overlay) overlay.style.display = 'none';
          }
        }
        const overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.style.display = 'none';
      } catch (err) {
        console.warn('Interactive PDF.js viewer failed, falling back to Google Drive viewer:', err);
        clearTimeout(failoverTimer);
        if (!switchedToFallback) {
          switchedToFallback = true;
          window.location.replace('$fallbackPreviewUrl');
        }
      }
    }

    async function renderPage(pageNum, container) {
      const page = await pdfDoc.getPage(pageNum);
      const viewport1 = page.getViewport({ scale: 1.0 });
      const screenWidth = window.innerWidth || document.documentElement.clientWidth || 360;
      const targetWidth = Math.min(screenWidth - 16, 850);
      const scale = targetWidth / viewport1.width;
      const viewport = page.getViewport({ scale: scale });

      const pageWrapper = document.createElement('div');
      pageWrapper.className = 'page-wrapper';
      pageWrapper.id = 'page-wrapper-' + pageNum;
      pageWrapper.style.width = Math.floor(viewport.width) + 'px';
      pageWrapper.style.height = Math.floor(viewport.height) + 'px';

      const canvas = document.createElement('canvas');
      canvas.className = 'page-canvas';
      const dpr = Math.min(window.devicePixelRatio || 1.5, 2.0);
      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = Math.floor(viewport.width) + 'px';
      canvas.style.height = Math.floor(viewport.height) + 'px';

      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      pageWrapper.appendChild(canvas);

      const textLayerDiv = document.createElement('div');
      textLayerDiv.className = 'textLayer';
      textLayerDiv.style.width = Math.floor(viewport.width) + 'px';
      textLayerDiv.style.height = Math.floor(viewport.height) + 'px';
      pageWrapper.style.setProperty('--scale-factor', viewport.scale);
      textLayerDiv.style.setProperty('--scale-factor', viewport.scale);
      pageWrapper.appendChild(textLayerDiv);

      container.appendChild(pageWrapper);

      // Render canvas
      await page.render({
        canvasContext: ctx,
        viewport: viewport
      }).promise;

      // Render text layer
      try {
        const textContent = await page.getTextContent();
        const textTask = pdfjsLib.renderTextLayer({
          textContent: textContent,
          textContentSource: textContent,
          container: textLayerDiv,
          viewport: viewport
        });
        await (textTask.promise || textTask);
      } catch (e) {
        console.warn('Text layer render error on page ' + pageNum, e);
      }

      // Bind highlight clicks
      bindHighlightsForPage(pageNum, textLayerDiv);
    }

    function triggerQuestion(qid) {
      if (window.HighlightChannel && window.HighlightChannel.postMessage) {
        window.HighlightChannel.postMessage(JSON.stringify({ questionId: qid }));
      }
    }

    function bindHighlightsForPage(pageNum, textLayerDiv) {
      const pageQuestions = questionsData.filter(q => {
        const p = parseInt(q.page_number);
        return isNaN(p) || p === pageNum || p === 0;
      });
      if (pageQuestions.length === 0) return;

      const spans = Array.from(textLayerDiv.querySelectorAll('span'));
      if (spans.length === 0) return;

      let charToSpan = [];
      let fullText = '';
      for (let i = 0; i < spans.length; i++) {
        const s = spans[i].textContent || '';
        for (let j = 0; j < s.length; j++) {
          charToSpan.push(i);
          fullText += s[j];
        }
      }

      // Map each alphanumeric character in fullText to its original charToSpan index
      let alphaOnly = '';
      let alphaToCharIdx = [];
      for (let k = 0; k < fullText.length; k++) {
        const ch = fullText[k].toLowerCase();
        if (/[a-z0-9]/.test(ch)) {
          alphaOnly += ch;
          alphaToCharIdx.push(k);
        }
      }

      pageQuestions.forEach(q => {
        const rawTarget = q.highlight_text || '';
        let targetAlpha = '';
        for (let k = 0; k < rawTarget.length; k++) {
          const ch = rawTarget[k].toLowerCase();
          if (/[a-z0-9]/.test(ch)) {
            targetAlpha += ch;
          }
        }
        if (targetAlpha.length < 3) return;

        let matchStart = alphaOnly.indexOf(targetAlpha);
        let matchEnd = -1;

        if (matchStart !== -1) {
          matchEnd = matchStart + targetAlpha.length;
        } else if (targetAlpha.length > 25) {
          // Try matching significant sub-phrases (first 25 alphanumeric chars)
          const subTarget = targetAlpha.substring(0, 25);
          matchStart = alphaOnly.indexOf(subTarget);
          if (matchStart !== -1) {
            matchEnd = matchStart + Math.min(targetAlpha.length, alphaOnly.length - matchStart);
          }
        }

        if (matchStart === -1) return;

        // Map alpha indices back to spans
        const origCharStart = alphaToCharIdx[matchStart];
        const origCharEnd = alphaToCharIdx[Math.min(matchEnd - 1, alphaToCharIdx.length - 1)] + 1;

        const matchedSpanIndices = new Set();
        for (let c = origCharStart; c < origCharEnd && c < charToSpan.length; c++) {
          matchedSpanIndices.add(charToSpan[c]);
        }

        const isSolved = solvedIds.has(q.id);

        matchedSpanIndices.forEach(spanIdx => {
          const spanEl = spans[spanIdx];
          if (!spanEl) return;

          spanEl.classList.add(isSolved ? 'clickable-highlight-solved' : 'clickable-highlight');
          spanEl.setAttribute('data-qid', q.id);
          spanEl.setAttribute('title', 'Tap to solve: ' + (q.question || ''));

          spanEl.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            triggerQuestion(q.id);
          };
          spanEl.ontouchend = function(e) {
            e.preventDefault();
            e.stopPropagation();
            triggerQuestion(q.id);
          };
        });
      });

      // Delegated event listener on textLayerDiv for seamless mobile touch responsiveness
      textLayerDiv.addEventListener('click', function(e) {
        const target = e.target.closest('[data-qid]');
        if (target) {
          const qid = parseInt(target.getAttribute('data-qid'));
          if (!isNaN(qid)) {
            e.preventDefault();
            e.stopPropagation();
            triggerQuestion(qid);
          }
        }
      });
      textLayerDiv.addEventListener('touchend', function(e) {
        const target = e.target.closest('[data-qid]');
        if (target) {
          const qid = parseInt(target.getAttribute('data-qid'));
          if (!isNaN(qid)) {
            e.preventDefault();
            e.stopPropagation();
            triggerQuestion(qid);
          }
        }
      });
    }

    window.addEventListener('DOMContentLoaded', initPdf);
  </script>
</body>
</html>''';
  }

  void _openQuestionPopup(BuildContext context, Map<String, dynamic> question) {
    final qId = int.tryParse(question['id']?.toString() ?? '');
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => _HighlightQuestionSolvePopup(
        question: question,
        onSolved: () {
          if (qId != null) {
            setState(() => _solvedQuestionIds.add(qId));
            _webViewController?.runJavaScript('if (window.notifySolved) { window.notifySolved($qId); }');
          }
        },
      ),
    );
  }

  void _showAllQuestionsSheet(BuildContext context) {
    final questions = widget.highlightQuestions;
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => DraggableScrollableSheet(
        initialChildSize: 0.75,
        minChildSize: 0.4,
        maxChildSize: 0.95,
        builder: (ctx, scrollController) => Container(
          decoration: BoxDecoration(
            color: Theme.of(ctx).scaffoldBackgroundColor,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(AppRadii.xl)),
          ),
          child: Column(
            children: [
              Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.symmetric(vertical: AppSpacing.md),
                decoration: BoxDecoration(
                  color: Colors.grey.withValues(alpha: 0.35),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
                child: Row(
                  children: [
                    const Icon(Icons.highlight_rounded, color: Colors.amber),
                    const SizedBox(width: AppSpacing.sm),
                    Text(
                      'All Highlight Questions (${questions.length})',
                      style: Theme.of(ctx).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
                    ),
                    const Spacer(),
                    IconButton(
                      icon: const Icon(Icons.close_rounded),
                      onPressed: () => Navigator.of(ctx).pop(),
                    ),
                  ],
                ),
              ),
              const Divider(),
              Expanded(
                child: ListView.separated(
                  controller: scrollController,
                  padding: const EdgeInsets.all(AppSpacing.md),
                  itemCount: questions.length,
                  separatorBuilder: (_, __) => const SizedBox(height: AppSpacing.sm),
                  itemBuilder: (c, idx) {
                    final q = questions[idx];
                    final page = q['page_number']?.toString() ?? '1';
                    final hlText = q['highlight_text']?.toString() ?? '';
                    final questionText = q['question']?.toString() ?? '';
                    final qId = int.tryParse(q['id']?.toString() ?? '');
                    final isSolved = qId != null && _solvedQuestionIds.contains(qId);

                    return Card(
                      elevation: 1,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(AppRadii.md),
                        side: BorderSide(
                          color: isSolved ? Colors.green.shade400 : Colors.amber.shade300,
                        ),
                      ),
                      child: InkWell(
                        onTap: () {
                          Navigator.of(ctx).pop();
                          final p = int.tryParse(page);
                          if (p != null) {
                            _webViewController?.runJavaScript('if (window.scrollToPage) { window.scrollToPage($p); }');
                          }
                          _openQuestionPopup(context, q);
                        },
                        borderRadius: BorderRadius.circular(AppRadii.md),
                        child: Padding(
                          padding: const EdgeInsets.all(AppSpacing.md),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: isSolved ? Colors.green : Colors.amber.shade700,
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                    child: Text(
                                      'Page $page',
                                      style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                  const SizedBox(width: 8),
                                  Expanded(
                                    child: Text(
                                      '"$hlText"',
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(
                                        fontStyle: FontStyle.italic,
                                        fontWeight: FontWeight.w600,
                                        fontSize: 12,
                                      ),
                                    ),
                                  ),
                                  if (isSolved)
                                    const Icon(Icons.check_circle_rounded, size: 16, color: Colors.green),
                                ],
                              ),
                              const SizedBox(height: 8),
                              Text(
                                questionText,
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
                              ),
                              const SizedBox(height: 8),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.end,
                                children: [
                                  Text(
                                    isSolved ? 'Solved ✓' : 'Tap to solve',
                                    style: TextStyle(
                                      fontSize: 11,
                                      color: isSolved ? Colors.green : const Color(0xFFD97706),
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(width: 4),
                                  Icon(
                                    isSolved ? Icons.check_rounded : Icons.arrow_forward_rounded,
                                    size: 12,
                                    color: isSolved ? Colors.green : const Color(0xFFD97706),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final questions = widget.highlightQuestions;
    final theme = Theme.of(context);
    final chapterTitle = widget.chapter['title']?.toString() ?? 'Chapter eBook';
    final fileId = _extractFileId();
    final noteSummary = _normalizeExtractedText(widget.chapter['note_summary']?.toString() ?? '');

    // Default to MemoNeet-style Interactive Digital Text Reader
    if (!_pdfViewMode && (noteSummary.isNotEmpty || questions.isNotEmpty || fileId.isEmpty)) {
      return SizedBox.expand(
        child: SurfaceCard(
          padding: EdgeInsets.zero,
          child: InteractiveHighlightReader(
            chapterTitle: chapterTitle,
            content: noteSummary,
            highlightQuestions: questions,
            solvedQuestionIds: _solvedQuestionIds,
            onQuestionTap: (q) => _openQuestionPopup(context, q),
            onViewAllQuestions: () => _showAllQuestionsSheet(context),
            hasPdf: fileId.isNotEmpty,
            isPdfViewMode: _pdfViewMode,
            onTogglePdfMode: fileId.isNotEmpty
                ? () {
                    setState(() => _pdfViewMode = true);
                    if (_webViewController == null) _loadPdf();
                  }
                : null,
          ),
        ),
      );
    }

    return SizedBox.expand(
      child: SurfaceCard(
        padding: EdgeInsets.zero,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ── Top Header / Reading Bar ─────────────────────────────────
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: 8),
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xFFD97706), Color(0xFFF59E0B)],
                ),
                borderRadius: BorderRadius.vertical(top: Radius.circular(AppRadii.md)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.picture_as_pdf_rounded, color: Colors.white, size: 20),
                  const SizedBox(width: AppSpacing.sm),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '$chapterTitle (PDF View)',
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w800,
                            fontSize: 14,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        Text(
                          questions.isEmpty
                              ? 'Viewing PDF document'
                              : '${questions.length} Highlight Questions on page',
                          style: const TextStyle(color: Colors.white70, fontSize: 11),
                        ),
                      ],
                    ),
                  ),
                  FilledButton.tonalIcon(
                    style: FilledButton.styleFrom(
                      backgroundColor: Colors.white.withValues(alpha: 0.28),
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      minimumSize: Size.zero,
                      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    ),
                    icon: const Icon(Icons.menu_book_rounded, size: 14),
                    label: const Text('Text Reader', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                    onPressed: () => setState(() => _pdfViewMode = false),
                  ),
                  const SizedBox(width: 4),
                  if (questions.isNotEmpty)
                    Padding(
                      padding: const EdgeInsets.only(right: 6),
                      child: FilledButton.tonal(
                        style: FilledButton.styleFrom(
                          backgroundColor: Colors.white.withValues(alpha: 0.25),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          minimumSize: Size.zero,
                          tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                        ),
                        onPressed: () => _showAllQuestionsSheet(context),
                        child: Text(
                          '${_solvedQuestionIds.length}/${questions.length} Solved',
                          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                  IconButton(
                    icon: const Icon(Icons.refresh_rounded, color: Colors.white, size: 18),
                    tooltip: 'Reload Highlighted PDF',
                    visualDensity: VisualDensity.compact,
                    onPressed: () {
                      _loadedFileId = null;
                      _loadPdf();
                      setState(() => _previewKey++);
                    },
                  ),
                ],
              ),
            ),

            // ── Main Content Area: PDF View with On-Page Clickable Highlights ─────
            Expanded(
              child: fileId.isEmpty
                  ? Center(
                      child: Padding(
                        padding: const EdgeInsets.all(AppSpacing.xl),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.picture_as_pdf_rounded, size: 52, color: Colors.orange),
                            const SizedBox(height: AppSpacing.md),
                            Text(
                              'Highlighted eBook PDF Not Uploaded Yet',
                              style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700),
                            ),
                            const SizedBox(height: AppSpacing.xs),
                            const Text(
                              'The highlighted eBook PDF for this chapter has not been uploaded yet. '
                              'Please upload the highlighted eBook PDF from the admin panel.',
                              textAlign: TextAlign.center,
                            ),
                            if (questions.isNotEmpty) ...[
                              const SizedBox(height: AppSpacing.lg),
                              FilledButton.icon(
                                icon: const Icon(Icons.highlight_rounded),
                                label: Text('View ${questions.length} Highlight Questions'),
                                onPressed: () => _showAllQuestionsSheet(context),
                              ),
                            ],
                          ],
                        ),
                      ),
                    )
                  : _isLoading
                      ? Center(
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const CircularProgressIndicator(color: Color(0xFFD97706)),
                              const SizedBox(height: 16),
                              Text(
                                'Loading Highlighted eBook...',
                                style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                'Preparing interactive on-page questions...',
                                style: theme.textTheme.bodySmall?.copyWith(color: Colors.grey),
                              ),
                            ],
                          ),
                        )
                      : (_webViewController != null
                          ? Stack(
                              children: [
                                Positioned.fill(
                                  child: ClipRRect(
                                    child: WebViewWidget(
                                      key: ValueKey('highlight-pdfjs-preview-$_previewKey-$fileId'),
                                      controller: _webViewController!,
                                      gestureRecognizers: {
                                        Factory<EagerGestureRecognizer>(
                                          EagerGestureRecognizer.new,
                                        ),
                                      },
                                    ),
                                  ),
                                ),
                                if (_useDriveFallback && questions.isNotEmpty)
                                  Positioned(
                                    bottom: AppSpacing.md,
                                    left: AppSpacing.lg,
                                    right: AppSpacing.lg,
                                    child: Material(
                                      elevation: 6,
                                      borderRadius: BorderRadius.circular(30),
                                      color: const Color(0xFFD97706),
                                      child: InkWell(
                                        onTap: () => _showAllQuestionsSheet(context),
                                        borderRadius: BorderRadius.circular(30),
                                        child: Padding(
                                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                                          child: Row(
                                            mainAxisAlignment: MainAxisAlignment.center,
                                            children: [
                                              const Icon(Icons.highlight_rounded, color: Colors.white, size: 20),
                                              const SizedBox(width: 8),
                                              Text(
                                                '${questions.length} Highlight Questions • Tap to Solve',
                                                style: const TextStyle(
                                                  color: Colors.white,
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 13,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                              ],
                            )
                          : const SizedBox.shrink()),
            ),
          ],
        ),
      ),
    );
  }
}

// ── MemoNeet-Style Interactive Digital Text Reader with Tap-to-Solve Underlines ──

class InteractiveHighlightReader extends StatefulWidget {
  const InteractiveHighlightReader({
    super.key,
    required this.chapterTitle,
    required this.content,
    required this.highlightQuestions,
    required this.solvedQuestionIds,
    required this.onQuestionTap,
    this.onViewAllQuestions,
    this.hasPdf = false,
    this.isPdfViewMode = false,
    this.onTogglePdfMode,
  });

  final String chapterTitle;
  final String content;
  final List<Map<String, dynamic>> highlightQuestions;
  final Set<int> solvedQuestionIds;
  final void Function(Map<String, dynamic> question) onQuestionTap;
  final VoidCallback? onViewAllQuestions;
  final bool hasPdf;
  final bool isPdfViewMode;
  final VoidCallback? onTogglePdfMode;

  @override
  State<InteractiveHighlightReader> createState() => _InteractiveHighlightReaderState();
}

class _InteractiveHighlightReaderState extends State<InteractiveHighlightReader> {
  double _fontSize = 15.5;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final questions = widget.highlightQuestions;

    final rawContent = widget.content.trim();
    final paragraphs = rawContent.isNotEmpty
        ? rawContent
            .split(RegExp(r'\r?\n\s*\r?\n'))
            .map((p) => p.trim())
            .where((p) => p.isNotEmpty)
            .toList()
        : <String>[];

    return Column(
      children: [
        // ── Reader Top Bar ─────────────────────────────────────────
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: 8),
          decoration: BoxDecoration(
            color: isDark ? const Color(0xFF1E1E2D) : const Color(0xFFFFF7ED),
            border: Border(bottom: BorderSide(color: theme.dividerColor.withValues(alpha: 0.15))),
          ),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [Color(0xFFE53935), Color(0xFFFF5722)]),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.bolt_rounded, size: 14, color: Colors.white),
                    const SizedBox(width: 4),
                    Text(
                      '${questions.length} PYQ Highlights',
                      style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Text(
                '${widget.solvedQuestionIds.length}/${questions.length} Solved',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  color: isDark ? const Color(0xFF6EE7B7) : const Color(0xFF059669),
                ),
              ),
              const Spacer(),
              // Font size controls
              IconButton(
                visualDensity: VisualDensity.compact,
                icon: const Text('A-', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                tooltip: 'Decrease font size',
                onPressed: _fontSize > 13 ? () => setState(() => _fontSize -= 1.0) : null,
              ),
              IconButton(
                visualDensity: VisualDensity.compact,
                icon: const Text('A+', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                tooltip: 'Increase font size',
                onPressed: _fontSize < 24 ? () => setState(() => _fontSize += 1.0) : null,
              ),
              if (widget.onViewAllQuestions != null && questions.isNotEmpty)
                IconButton(
                  visualDensity: VisualDensity.compact,
                  icon: const Icon(Icons.format_list_bulleted_rounded, size: 20),
                  tooltip: 'View All Questions List',
                  onPressed: widget.onViewAllQuestions,
                ),
              if (widget.hasPdf && widget.onTogglePdfMode != null)
                IconButton(
                  visualDensity: VisualDensity.compact,
                  icon: const Icon(Icons.picture_as_pdf_rounded, size: 19),
                  tooltip: 'View Original PDF',
                  onPressed: widget.onTogglePdfMode,
                ),
            ],
          ),
        ),

        // ── Main Reading Content ───────────────────────────────────
        Expanded(
          child: paragraphs.isEmpty
              ? Center(
                  child: Padding(
                    padding: const EdgeInsets.all(AppSpacing.xl),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: Colors.amber.withValues(alpha: 0.15),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.auto_stories_rounded, size: 48, color: Colors.amber),
                        ),
                        const SizedBox(height: AppSpacing.md),
                        Text(
                          'Interactive Digital Notes',
                          style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: AppSpacing.xs),
                        Text(
                          'Upload chapter PDF in the Admin Panel to automatically generate this chapter\'s text with clickable PYQ underlines.',
                          textAlign: TextAlign.center,
                          style: theme.textTheme.bodyMedium?.copyWith(color: Colors.grey),
                        ),
                        if (questions.isNotEmpty) ...[
                          const SizedBox(height: AppSpacing.lg),
                          FilledButton.icon(
                            icon: const Icon(Icons.bolt_rounded),
                            label: Text('Solve ${questions.length} Linked PYQs Now'),
                            onPressed: widget.onViewAllQuestions,
                          ),
                        ],
                        if (widget.hasPdf && widget.onTogglePdfMode != null) ...[
                          const SizedBox(height: AppSpacing.sm),
                          OutlinedButton.icon(
                            icon: const Icon(Icons.picture_as_pdf_rounded),
                            label: const Text('View Original PDF on Drive'),
                            onPressed: widget.onTogglePdfMode,
                          ),
                        ],
                      ],
                    ),
                  ),
                )
              : SingleChildScrollView(
                  padding: const EdgeInsets.fromLTRB(AppSpacing.lg, AppSpacing.md, AppSpacing.lg, AppSpacing.xxl),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Interactive instruction pill
                      Container(
                        margin: const EdgeInsets.only(bottom: AppSpacing.md),
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF2D1515) : const Color(0xFFFFF1F2),
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(
                            color: isDark ? const Color(0xFF7F1D1D) : const Color(0xFFFECDD3),
                          ),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.touch_app_rounded, color: Color(0xFFE53935), size: 18),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                'Tap any red-underlined sentence to solve its NEET PYQ on the spot!',
                                style: TextStyle(
                                  fontSize: 11.5,
                                  fontWeight: FontWeight.w700,
                                  color: isDark ? const Color(0xFFFCA5A5) : const Color(0xFF991B1B),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),

                      // Chapter Title Banner
                      Text(
                        widget.chapterTitle,
                        style: TextStyle(
                          fontSize: _fontSize + 4,
                          fontWeight: FontWeight.w800,
                          letterSpacing: -0.3,
                          color: isDark ? Colors.white : const Color(0xFF0F172A),
                        ),
                      ),
                      const SizedBox(height: AppSpacing.md),

                      // Formatted Text Paragraphs with Clickable Underlines
                      for (final p in paragraphs) ...[
                        SelectableText.rich(
                          TextSpan(
                            children: _buildParagraphSpans(context, p, isDark),
                          ),
                          style: TextStyle(
                            fontSize: _fontSize,
                            height: 1.72,
                            color: isDark ? const Color(0xFFE2E8F0) : const Color(0xFF1E293B),
                          ),
                        ),
                        const SizedBox(height: 14),
                      ],
                    ],
                  ),
                ),
        ),
      ],
    );
  }

  List<InlineSpan> _buildParagraphSpans(BuildContext context, String paragraph, bool isDark) {
    if (widget.highlightQuestions.isEmpty) {
      return [TextSpan(text: paragraph)];
    }

    final normPara = paragraph.toLowerCase();
    final matches = <_HighlightMatch>[];

    for (final q in widget.highlightQuestions) {
      final hlText = (q['highlight_text']?.toString() ?? '').trim();
      if (hlText.length < 5) continue;

      final normHl = hlText.toLowerCase();
      int startIdx = normPara.indexOf(normHl);

      // Fuzzy sub-phrase matching if exact sentence has minor whitespace differences
      if (startIdx == -1 && normHl.length > 25) {
        final sub = normHl.substring(0, 25);
        startIdx = normPara.indexOf(sub);
      }

      if (startIdx != -1) {
        final matchLen = math.min(hlText.length, paragraph.length - startIdx);
        matches.add(_HighlightMatch(
          start: startIdx,
          end: startIdx + matchLen,
          question: q,
        ));
      }
    }

    if (matches.isEmpty) {
      return [TextSpan(text: paragraph)];
    }

    matches.sort((a, b) => a.start.compareTo(b.start));

    // Remove overlapping regions
    final cleanMatches = <_HighlightMatch>[];
    int lastEnd = 0;
    for (final m in matches) {
      if (m.start >= lastEnd) {
        cleanMatches.add(m);
        lastEnd = m.end;
      }
    }

    final spans = <InlineSpan>[];
    int cursor = 0;

    for (final m in cleanMatches) {
      if (m.start > cursor) {
        spans.add(TextSpan(text: paragraph.substring(cursor, m.start)));
      }

      final matchedText = paragraph.substring(m.start, m.end);
      final qId = int.tryParse(m.question['id']?.toString() ?? '');
      final isSolved = qId != null && widget.solvedQuestionIds.contains(qId);

      // Clickable red-underlined sentence
      spans.add(
        TextSpan(
          text: matchedText,
          style: TextStyle(
            fontWeight: FontWeight.w600,
            decoration: TextDecoration.underline,
            decorationColor: isSolved ? const Color(0xFF10B981) : const Color(0xFFE53935),
            decorationThickness: 2.5,
            decorationStyle: TextDecorationStyle.solid,
            color: isSolved
                ? (isDark ? const Color(0xFFA7F3D0) : const Color(0xFF065F46))
                : (isDark ? const Color(0xFFFFB74D) : const Color(0xFF9A3412)),
            backgroundColor: isSolved
                ? (isDark ? Colors.green.withValues(alpha: 0.15) : const Color(0xFFECFDF5))
                : (isDark ? Colors.red.withValues(alpha: 0.12) : const Color(0xFFFFF1F2)),
          ),
          recognizer: TapGestureRecognizer()..onTap = () => widget.onQuestionTap(m.question),
        ),
      );

      // Inline Pill Badge right after the underlined line
      spans.add(
        WidgetSpan(
          alignment: PlaceholderAlignment.middle,
          child: GestureDetector(
            onTap: () => widget.onQuestionTap(m.question),
            child: Container(
              margin: const EdgeInsets.only(left: 4, right: 4),
              padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
              decoration: BoxDecoration(
                color: isSolved ? const Color(0xFF10B981) : const Color(0xFFE53935),
                borderRadius: BorderRadius.circular(6),
                boxShadow: [
                  BoxShadow(
                    color: (isSolved ? Colors.green : Colors.red).withValues(alpha: 0.3),
                    blurRadius: 3,
                    offset: const Offset(0, 1),
                  ),
                ],
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    isSolved ? Icons.check_circle_rounded : Icons.bolt_rounded,
                    size: 10,
                    color: Colors.white,
                  ),
                  const SizedBox(width: 2),
                  Text(
                    isSolved ? 'SOLVED' : 'PYQ',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 8.5,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 0.3,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      );

      cursor = m.end;
    }

    if (cursor < paragraph.length) {
      spans.add(TextSpan(text: paragraph.substring(cursor)));
    }

    return spans;
  }
}

class _HighlightMatch {
  _HighlightMatch({required this.start, required this.end, required this.question});
  final int start;
  final int end;
  final Map<String, dynamic> question;
}

// ── Interactive Question Solve Dialog / Popup ────────────────────────────────

class _HighlightQuestionSolvePopup extends StatefulWidget {
  const _HighlightQuestionSolvePopup({required this.question, this.onSolved});

  final Map<String, dynamic> question;
  final VoidCallback? onSolved;

  @override
  State<_HighlightQuestionSolvePopup> createState() => _HighlightQuestionSolvePopupState();
}

class _HighlightQuestionSolvePopupState extends State<_HighlightQuestionSolvePopup> {
  String? _selectedOption;
  bool _submitted = false;

  @override
  Widget build(BuildContext context) {
    final q = widget.question;
    final highlightText = q['highlight_text']?.toString() ?? '';
    final pageNumber = q['page_number']?.toString() ?? '1';
    final questionText = q['question']?.toString() ?? '';
    final optA = q['option_a']?.toString() ?? '';
    final optB = q['option_b']?.toString() ?? '';
    final optC = q['option_c']?.toString() ?? '';
    final optD = q['option_d']?.toString() ?? '';
    final correctOpt = (q['correct_option']?.toString() ?? 'A').toUpperCase().trim();
    final explanation = q['explanation']?.toString() ?? '';

    final isCorrect = _submitted && _selectedOption == correctOpt;
    final isIncorrect = _submitted && _selectedOption != correctOpt;

    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      decoration: BoxDecoration(
        color: theme.scaffoldBackgroundColor,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(AppRadii.xl)),
      ),
      padding: EdgeInsets.only(
        top: AppSpacing.md,
        left: AppSpacing.md,
        right: AppSpacing.md,
        bottom: MediaQuery.of(context).viewInsets.bottom + AppSpacing.xl,
      ),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            // Drag handle & Header
            Center(
              child: Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.only(bottom: AppSpacing.md),
                decoration: BoxDecoration(
                  color: Colors.grey.withValues(alpha: 0.35),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.amber.withValues(alpha: 0.18),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.highlight_rounded, color: Colors.amber, size: 20),
                ),
                const SizedBox(width: AppSpacing.sm),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Highlighted Concept MCQ',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                      ),
                      Text(
                        'Page $pageNumber • Practice from highlighted text',
                        style: theme.textTheme.bodySmall,
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.close_rounded),
                  onPressed: () => Navigator.of(context).pop(),
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.md),

            // Highlighted Quote Card
            if (highlightText.isNotEmpty)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(AppSpacing.md),
                decoration: BoxDecoration(
                  color: isDark
                      ? Colors.amber.shade900.withValues(alpha: 0.25)
                      : const Color(0xFFFEF3C7),
                  borderRadius: BorderRadius.circular(AppRadii.md),
                  border: Border.all(
                    color: isDark ? Colors.amber.shade700 : const Color(0xFFFCD34D),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.menu_book_rounded, size: 14, color: Color(0xFFB45309)),
                        const SizedBox(width: 6),
                        Text(
                          'HIGHLIGHTED TEXT (Page $pageNumber)',
                          style: const TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 0.5,
                            color: Color(0xFFB45309),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      '"$highlightText"',
                      style: TextStyle(
                        fontStyle: FontStyle.italic,
                        fontWeight: FontWeight.w600,
                        fontSize: 13,
                        color: isDark ? Colors.amber.shade100 : const Color(0xFF78350F),
                      ),
                    ),
                  ],
                ),
              ),
            const SizedBox(height: AppSpacing.md),

            // Question Text
            Text(
              questionText,
              style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: AppSpacing.md),

            // Options A, B, C, D
            ...['A', 'B', 'C', 'D'].map((optKey) {
              final optText = optKey == 'A'
                  ? optA
                  : optKey == 'B'
                      ? optB
                      : optKey == 'C'
                          ? optC
                          : optD;
              if (optText.isEmpty) return const SizedBox.shrink();

              final isSelected = _selectedOption == optKey;
              final isCorrectOpt = optKey == correctOpt;

              Color? bgColor;
              Color borderColor = theme.colorScheme.outlineVariant;
              Color textColor = theme.textTheme.bodyMedium?.color ?? Colors.black;

              if (_submitted) {
                if (isCorrectOpt) {
                  bgColor = Colors.green.withValues(alpha: 0.15);
                  borderColor = Colors.green;
                  textColor = Colors.green.shade800;
                } else if (isSelected && !isCorrectOpt) {
                  bgColor = Colors.red.withValues(alpha: 0.15);
                  borderColor = Colors.red;
                  textColor = Colors.red.shade800;
                }
              } else if (isSelected) {
                bgColor = theme.colorScheme.primary.withValues(alpha: 0.1);
                borderColor = theme.colorScheme.primary;
              }

              return Padding(
                padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                child: InkWell(
                  onTap: _submitted
                      ? null
                      : () => setState(() => _selectedOption = optKey),
                  borderRadius: BorderRadius.circular(AppRadii.md),
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                    decoration: BoxDecoration(
                      color: bgColor,
                      borderRadius: BorderRadius.circular(AppRadii.md),
                      border: Border.all(
                        color: borderColor,
                        width: isSelected || (_submitted && isCorrectOpt) ? 1.5 : 1.0,
                      ),
                    ),
                    child: Row(
                      children: [
                        Container(
                          width: 28,
                          height: 28,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: _submitted && isCorrectOpt
                                ? Colors.green
                                : (_submitted && isSelected && !isCorrectOpt)
                                    ? Colors.red
                                    : (isSelected
                                        ? theme.colorScheme.primary
                                        : Colors.grey.withValues(alpha: 0.2)),
                          ),
                          child: Text(
                            optKey,
                            style: TextStyle(
                              color: isSelected || (_submitted && isCorrectOpt) ? Colors.white : null,
                              fontWeight: FontWeight.bold,
                              fontSize: 12,
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Text(
                            optText,
                            style: TextStyle(
                              fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                              color: textColor,
                            ),
                          ),
                        ),
                        if (_submitted && isCorrectOpt)
                          const Icon(Icons.check_circle_rounded, color: Colors.green, size: 20)
                        else if (_submitted && isSelected && !isCorrectOpt)
                          const Icon(Icons.cancel_rounded, color: Colors.red, size: 20),
                      ],
                    ),
                  ),
                ),
              );
            }),

            const SizedBox(height: AppSpacing.sm),

            // Action / Status / Explanation
            if (!_submitted)
              SizedBox(
                width: double.infinity,
                child: FilledButton.icon(
                  icon: const Icon(Icons.check_rounded),
                  label: const Text('Submit Answer'),
                  onPressed: _selectedOption == null
                      ? null
                      : () {
                          setState(() => _submitted = true);
                          if (_selectedOption == correctOpt) {
                            widget.onSolved?.call();
                          }
                        },
                ),
              )
            else ...[
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(AppSpacing.md),
                decoration: BoxDecoration(
                  color: isCorrect
                      ? Colors.green.withValues(alpha: 0.12)
                      : Colors.red.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(AppRadii.md),
                  border: Border.all(
                    color: isCorrect ? Colors.green.shade400 : Colors.red.shade400,
                  ),
                ),
                child: Row(
                  children: [
                    Icon(
                      isCorrect ? Icons.check_circle_rounded : Icons.info_rounded,
                      color: isCorrect ? Colors.green : Colors.red,
                    ),
                    const SizedBox(width: AppSpacing.sm),
                    Expanded(
                      child: Text(
                        isCorrect
                            ? 'Correct Answer! Great comprehension!'
                            : 'Incorrect. The correct option is ($correctOpt).',
                        style: TextStyle(
                          color: isCorrect ? Colors.green.shade800 : Colors.red.shade800,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              if (explanation.isNotEmpty) ...[
                const SizedBox(height: AppSpacing.sm),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(AppSpacing.md),
                  decoration: BoxDecoration(
                    color: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.4),
                    borderRadius: BorderRadius.circular(AppRadii.md),
                    border: Border.all(color: theme.colorScheme.outlineVariant),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Explanation:',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                      ),
                      const SizedBox(height: 4),
                      Text(explanation),
                    ],
                  ),
                ),
              ],
              const SizedBox(height: AppSpacing.md),
              Row(
                children: [
                  if (isIncorrect)
                    Expanded(
                      child: OutlinedButton.icon(
                        icon: const Icon(Icons.refresh_rounded),
                        label: const Text('Try Again'),
                        onPressed: () => setState(() {
                          _submitted = false;
                          _selectedOption = null;
                        }),
                      ),
                    ),
                  if (isIncorrect) const SizedBox(width: AppSpacing.sm),
                  Expanded(
                    child: FilledButton.tonal(
                      onPressed: () => Navigator.of(context).pop(),
                      child: const Text('Done'),
                    ),
                  ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _DetailPanel extends StatelessWidget {
  const _DetailPanel({
    required this.title,
    required this.content,
    required this.bullets,
    this.highlight = false,
  });

  final String title;
  final String content;
  final List<String> bullets;
  final bool highlight;

  @override
  Widget build(BuildContext context) {
    final formatted = _formatReadableContent(content);
    final scheme = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final panelColor = highlight
        ? (isDark
            ? scheme.primaryContainer.withValues(alpha: 0.55)
            : AppColors.indigoSoft)
        : scheme.surfaceContainerHighest;
    final textStyle = Theme.of(context).textTheme.bodyMedium?.copyWith(
          height: 1.45,
          color: highlight && isDark ? scheme.onPrimaryContainer : null,
        );
    // SizedBox.expand ensures this panel fills its Expanded slot in TabBarView.
    return SizedBox.expand(
      child: SurfaceCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: AppSpacing.sm),
            Expanded(
              child: SingleChildScrollView(
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(AppSpacing.lg),
                  decoration: BoxDecoration(
                    color: panelColor,
                    borderRadius: BorderRadius.circular(AppRadii.md),
                    border: highlight && isDark
                        ? Border.all(color: scheme.outlineVariant)
                        : null,
                  ),
                  child: SelectableText(
                    formatted.isEmpty ? 'No content available yet.' : formatted,
                    style: textStyle,
                  ),
                ),
              ),
            ),
            const SizedBox(height: AppSpacing.lg),
            ...bullets.map(
              (bullet) => Padding(
                padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(top: 4),
                      child: Icon(
                        Icons.check_circle_rounded,
                        size: 18,
                        color: isDark ? scheme.primary : AppColors.indigo,
                      ),
                    ),
                    const SizedBox(width: AppSpacing.sm),
                    Expanded(child: Text(bullet)),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

String _formatReadableContent(String raw) {
  var text = raw.trim();
  if (text.isEmpty) return '';
  text = text
      .replaceAll(RegExp(r'\s+'), ' ')
      .replaceAll(RegExp(r'([.?!])\s+'), r'$1\n\n')
      .replaceAll(RegExp(r'(\d+\.)\s+'), r'\n$1 ')
      .replaceAll(RegExp(r'([:;])\s+'), r'$1\n');
  return text.trim();
}