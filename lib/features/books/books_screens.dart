import 'dart:async';
import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter/foundation.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
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
import '../../core/constants/api_constants.dart';

String cleanChapterTitle(String? rawTitle, [String? topic]) {
  final t = (topic ?? '').trim();
  final r = (rawTitle ?? '').trim();
  if (t.isNotEmpty && !RegExp(r'^(Chapter|Unit)\s*\d+$', caseSensitive: false).hasMatch(t)) {
    var cleanedTopic = t.replaceFirst(RegExp(r'^(Chapter|Unit)\s*\d+\s*[:\-•]?\s*', caseSensitive: false), '').trim();
    cleanedTopic = cleanedTopic.replaceFirst(RegExp(r'^\d+[\.:\-•]\s*'), '').trim();
    if (cleanedTopic.isNotEmpty) return cleanedTopic;
    return t;
  }
  var cleaned = r.replaceFirst(RegExp(r'^(Chapter|Unit)\s*\d+\s*[:\-•]?\s*', caseSensitive: false), '').trim();
  cleaned = cleaned.replaceFirst(RegExp(r'^\d+[\.:\-•]\s*'), '').trim();
  if (cleaned.isNotEmpty && !RegExp(r'^\d+$').hasMatch(cleaned)) {
    return cleaned;
  }
  return t.isNotEmpty ? t : (cleaned.isNotEmpty ? cleaned : r);
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
                                    title: Text(cleanChapterTitle(book['title']?.toString(), book['topic']?.toString())),
                                    subtitle: Text(
                                      [
                                        if ((book['standard']?.toString() ?? '').isNotEmpty) book['standard'].toString(),
                                        if ((book['subject']?.toString() ?? '').isNotEmpty) book['subject'].toString(),
                                      ].join(' • '),
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
                        title: Text(cleanChapterTitle(book['title']?.toString(), book['topic']?.toString())),
                        subtitle: Text(
                          [
                            if ((book['standard']?.toString() ?? '').isNotEmpty) book['standard'].toString(),
                            if ((book['subject']?.toString() ?? '').isNotEmpty) book['subject'].toString(),
                          ].join(' • '),
                        ),
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
        final driveLink = _resolveMaterialLink(chapter);
        final hasDrivePdf = driveLink.isNotEmpty;

        return Scaffold(
          appBar: AppBar(
            title: Text(cleanChapterTitle(chapter['title']?.toString(), chapter['topic']?.toString())),
            actions: [
              if (hasDrivePdf)
                IconButton(
                  tooltip: 'View Original PDF',
                  icon: const Icon(Icons.picture_as_pdf_outlined),
                  onPressed: () {
                    final previewUrl = _toDrivePreviewUrl(driveLink);
                    if (previewUrl != null) {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (_) => Scaffold(
                            appBar: AppBar(
                              title: Text(cleanChapterTitle(chapter['title']?.toString(), chapter['topic']?.toString())),
                            ),
                            body: _PdfOrNotesPanel(chapter: chapter),
                          ),
                        ),
                      );
                    }
                  },
                ),
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
          ),
          body: _HighlightEbookPanel(
            chapter: chapter,
            highlightQuestions: highlightQuestions,
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
  final Set<int> _solvedQuestionIds = {};

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
                    const Icon(Icons.bolt_rounded, color: AppColors.primary),
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
                          color: isSolved ? Colors.green.shade400 : AppColors.primary.withValues(alpha: 0.4),
                        ),
                      ),
                      child: InkWell(
                        onTap: () {
                          Navigator.of(ctx).pop();
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
                                      color: isSolved ? Colors.green : AppColors.primary,
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
                                      color: isSolved ? Colors.green : AppColors.primary,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(width: 4),
                                  Icon(
                                    isSolved ? Icons.check_rounded : Icons.arrow_forward_rounded,
                                    size: 12,
                                    color: isSolved ? Colors.green : AppColors.primary,
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
    final chapterTitle = cleanChapterTitle(widget.chapter['title']?.toString(), widget.chapter['topic']?.toString());
    final noteSummary = _normalizeExtractedText(widget.chapter['note_summary']?.toString() ?? '');
    final chapterId = widget.chapter['id'] is int
        ? widget.chapter['id'] as int
        : int.tryParse(widget.chapter['id']?.toString() ?? '');

    return SizedBox.expand(
      child: SurfaceCard(
        padding: EdgeInsets.zero,
        child: InteractiveHighlightReader(
          chapterId: chapterId,
          chapterTitle: chapterTitle,
          content: noteSummary,
          highlightQuestions: questions,
          solvedQuestionIds: _solvedQuestionIds,
          onQuestionTap: (q) => _openQuestionPopup(context, q),
          onViewAllQuestions: () => _showAllQuestionsSheet(context),
        ),
      ),
    );
  }
}

// ── MemoNeet-Style Interactive Digital Text Reader with Tap-to-Solve Underlines ──

enum _ReaderBlockType {
  h1,
  h2,
  h3,
  callout,
  bullet,
  paragraph,
  image,
  figureCaption,
  table,
}

class _ReaderBlock {
  const _ReaderBlock({
    required this.type,
    required this.text,
    this.imageUrl,
    this.caption,
  });
  final _ReaderBlockType type;
  final String text;
  final String? imageUrl;
  final String? caption;
}

class InteractiveHighlightReader extends StatefulWidget {
  const InteractiveHighlightReader({
    super.key,
    this.chapterId,
    required this.chapterTitle,
    required this.content,
    required this.highlightQuestions,
    required this.solvedQuestionIds,
    required this.onQuestionTap,
    this.onViewAllQuestions,
  });

  final int? chapterId;
  final String chapterTitle;
  final String content;
  final List<Map<String, dynamic>> highlightQuestions;
  final Set<int> solvedQuestionIds;
  final void Function(Map<String, dynamic> question) onQuestionTap;
  final VoidCallback? onViewAllQuestions;

  @override
  State<InteractiveHighlightReader> createState() => _InteractiveHighlightReaderState();
}

class _InteractiveHighlightReaderState extends State<InteractiveHighlightReader> {
  double _fontSize = 15.5;
  Map<String, String> _localNotes = {};
  Set<String> _solvedBlanks = {};

  @override
  void initState() {
    super.initState();
    _loadLocalNotesAndBlanks();
  }

  Future<void> _loadLocalNotesAndBlanks() async {
    final prefs = await SharedPreferences.getInstance();
    final chId = widget.chapterId ?? 0;
    final prefix = 'student_note_${chId}_';
    final notes = <String, String>{};
    for (final key in prefs.getKeys()) {
      if (key.startsWith(prefix)) {
        final val = prefs.getString(key);
        if (val != null && val.isNotEmpty) {
          notes[key.substring(prefix.length)] = val;
        }
      }
    }
    final blanksList = prefs.getStringList('chapter_blanks_$chId') ?? [];
    if (mounted) {
      setState(() {
        _localNotes = notes;
        _solvedBlanks = blanksList.toSet();
      });
    }
  }

  Future<void> _saveLocalNote(String sentenceKey, String note) async {
    final prefs = await SharedPreferences.getInstance();
    final chId = widget.chapterId ?? 0;
    final key = 'student_note_${chId}_$sentenceKey';
    if (note.trim().isEmpty) {
      await prefs.remove(key);
      if (mounted) {
        setState(() => _localNotes.remove(sentenceKey));
      }
    } else {
      await prefs.setString(key, note.trim());
      if (mounted) {
        setState(() => _localNotes[sentenceKey] = note.trim());
      }
    }
  }

  Future<void> _markBlankSolved(String blankKey) async {
    final prefs = await SharedPreferences.getInstance();
    final chId = widget.chapterId ?? 0;
    _solvedBlanks.add(blankKey);
    await prefs.setStringList('chapter_blanks_$chId', _solvedBlanks.toList());
    if (mounted) setState(() {});
  }

  Future<void> _resetBlank(String blankKey) async {
    final prefs = await SharedPreferences.getInstance();
    final chId = widget.chapterId ?? 0;
    _solvedBlanks.remove(blankKey);
    await prefs.setStringList('chapter_blanks_$chId', _solvedBlanks.toList());
    if (mounted) setState(() {});
  }

  void _openWhiteCanvas(BuildContext context, String highlightText) {
    final cleanKey = highlightText
        .replaceAll(RegExp(r'[^a-zA-Z0-9]'), '')
        .toLowerCase();
    final sentenceKey = cleanKey.length > 40 ? cleanKey.substring(0, 40) : cleanKey;
    final initialNote = _localNotes[sentenceKey] ?? '';

    showDialog(
      context: context,
      builder: (ctx) => _WhiteCanvasNoteDialog(
        highlightText: highlightText,
        initialNote: initialNote,
        onSave: (note) => _saveLocalNote(sentenceKey, note),
      ),
    );
  }

  void _openBlankSolveDialog(BuildContext context, String sentenceContext, String answer, String blankKey) {
    final isAlreadySolved = _solvedBlanks.contains(blankKey);
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => _BlankSolveBottomSheet(
        sentenceContext: sentenceContext,
        correctAnswer: answer,
        isSolved: isAlreadySolved,
        onSolved: () => _markBlankSolved(blankKey),
        onReset: () => _resetBlank(blankKey),
      ),
    );
  }

  bool _isBlockHeadingOrSpecial(String line) {
    final trimmed = line.trim();
    if (trimmed.isEmpty) return false;
    if (trimmed.startsWith('#')) return true;
    if (trimmed.startsWith('[IMAGE:')) return true;
    if (RegExp(r'^(Figure|Fig\.)\s*\d+', caseSensitive: false).hasMatch(trimmed)) return true;
    if (RegExp(r'^(Section|Topic)\s+\d+', caseSensitive: false).hasMatch(trimmed)) return true;
    if (RegExp(r'^\d+(\.\d+){1,2}\s+[A-Za-z]').hasMatch(trimmed)) return true;
    if (RegExp(r'^(NOTE|IMPORTANT|KEY CONCEPT|DEFINITION|FORMULA|TIP|REMEMBER|SUMMARY|POINTS TO PONDER|NCERT HIGHLIGHT)[\s:]', caseSensitive: false).hasMatch(trimmed)) return true;
    if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) return true;
    if (RegExp(r'^\([a-z0-9]\)\s+').hasMatch(trimmed)) return true;
    if (RegExp(r'^(Kingdom|Phylum|Subphylum|Division|Class|Order|Family|Genus)\s+[–\-:]?\s*[A-Z]', caseSensitive: false).hasMatch(trimmed)) return true;
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) return true;
    if (RegExp(r'^(Table|TABLE)\s*\d+[\s.:]', caseSensitive: false).hasMatch(trimmed)) return true;
    return false;
  }

  _ReaderBlock _classifyBlock(String text) {
    final t = text.trim();
    if (t.startsWith('[IMAGE:')) {
      final match = RegExp(r'^\[IMAGE:\s*([^|\]]+)(?:\s*\|\s*Caption:\s*([^\]]*))?\]', caseSensitive: false).firstMatch(t);
      final url = match?.group(1)?.trim() ?? '';
      final cap = match?.group(2)?.trim() ?? '';
      return _ReaderBlock(
        type: _ReaderBlockType.image,
        text: cap.isNotEmpty ? cap : 'Figure Diagram',
        imageUrl: url,
        caption: cap,
      );
    }
    if (RegExp(r'^(Figure|Fig\.)\s*\d+', caseSensitive: false).hasMatch(t)) {
      return _ReaderBlock(type: _ReaderBlockType.figureCaption, text: t);
    }
    if (t.startsWith('### ')) {
      return _ReaderBlock(type: _ReaderBlockType.h3, text: t.substring(4).trim());
    }
    if (t.startsWith('## ')) {
      return _ReaderBlock(type: _ReaderBlockType.h2, text: t.substring(3).trim());
    }
    if (t.startsWith('# ')) {
      return _ReaderBlock(type: _ReaderBlockType.h1, text: t.substring(2).trim());
    }
    if (RegExp(r'^(NOTE|IMPORTANT|KEY CONCEPT|DEFINITION|FORMULA|TIP|REMEMBER|SUMMARY|POINTS TO PONDER|NCERT HIGHLIGHT)[\s:]', caseSensitive: false).hasMatch(t)) {
      return _ReaderBlock(type: _ReaderBlockType.callout, text: t);
    }
    if (t.startsWith('•') || t.startsWith('- ') || t.startsWith('* ')) {
      return _ReaderBlock(type: _ReaderBlockType.bullet, text: t.replaceFirst(RegExp(r'^[•\-\*]\s*'), ''));
    }
    if (RegExp(r'^\([a-z0-9]\)\s+').hasMatch(t)) {
      if (RegExp(r'^\([a-d]\)\s+[A-Za-z0-9\s-]+\([b-d]\)', caseSensitive: false).hasMatch(t)) {
        return _ReaderBlock(type: _ReaderBlockType.paragraph, text: t);
      }
      return _ReaderBlock(type: _ReaderBlockType.bullet, text: t);
    }
    if (RegExp(r'^(Section|Topic)\s+\d+', caseSensitive: false).hasMatch(t)) {
      return _ReaderBlock(type: _ReaderBlockType.h1, text: t);
    }
    if (RegExp(r'^\d+\.\d+\.\d+\s+').hasMatch(t)) {
      return _ReaderBlock(type: _ReaderBlockType.h3, text: t);
    }
    if (RegExp(r'^\d+\.\d+\s+').hasMatch(t)) {
      return _ReaderBlock(type: _ReaderBlockType.h2, text: t);
    }
    if (RegExp(r'^(Kingdom|Phylum|Subphylum|Division|Class|Order|Family|Genus)\s+[–\-:]?\s*[A-Z]', caseSensitive: false).hasMatch(t)) {
      return _ReaderBlock(type: _ReaderBlockType.h2, text: t);
    }
    return _ReaderBlock(type: _ReaderBlockType.paragraph, text: t);
  }

  List<_ReaderBlock> _parseBlocks(String content) {
    final blocks = <_ReaderBlock>[];
    final raw = content.replaceAll('\r\n', '\n').replaceAll('\r', '\n').trim();
    if (raw.isEmpty) return blocks;

    final lines = raw.split('\n');
    final buffer = StringBuffer();

    void flushParagraph() {
      final text = buffer.toString().trim();
      buffer.clear();
      if (text.isNotEmpty) {
        blocks.add(_classifyBlock(text));
      }
    }

    for (var i = 0; i < lines.length; i++) {
      final line = lines[i].trim();
      if (line.isEmpty) {
        flushParagraph();
        continue;
      }

      // Filter out standalone chapter numbers (e.g. "CHAPTER 4", "Chapter 6", "Unit 2")
      if (RegExp(r'^(chapter|unit)\s+\d+$', caseSensitive: false).hasMatch(line)) {
        continue;
      }

      // Filter out standalone page numbers (e.g. "37", "38", "124")
      if (RegExp(r'^\d{1,4}$').hasMatch(line)) {
        continue;
      }

      // Filter out reprint footers (e.g. "Reprint 2025-26")
      if (RegExp(r'^reprint\s*\d{4}-\d{2}$', caseSensitive: false).hasMatch(line)) {
        continue;
      }

      // Filter out standalone subject headers (e.g. "BIOLOGY", "PHYSICS", "CHEMISTRY")
      if (RegExp(r'^(biology|physics|chemistry)$', caseSensitive: false).hasMatch(line)) {
        continue;
      }

      // Handle Markdown tables: lines starting and ending with '|'
      if (line.startsWith('|') && line.endsWith('|')) {
        flushParagraph();
        final tableBuffer = StringBuffer();
        tableBuffer.writeln(line);
        while (i + 1 < lines.length && lines[i + 1].trim().startsWith('|') && lines[i + 1].trim().endsWith('|')) {
          i++;
          tableBuffer.writeln(lines[i].trim());
        }
        blocks.add(_ReaderBlock(
          type: _ReaderBlockType.table,
          text: tableBuffer.toString().trim(),
        ));
        continue;
      }

      // Handle standalone image tag
      if (line.startsWith('[IMAGE:')) {
        flushParagraph();
        blocks.add(_classifyBlock(line));

        // Skip subsequent duplicate figure caption lines and sub-figure labels
        while (i + 1 < lines.length) {
          final nextLine = lines[i + 1].trim();
          if (RegExp(r'^(figure|fig\.)\s*\d+', caseSensitive: false).hasMatch(nextLine) ||
              RegExp(r'^\([a-d]\)\s+[A-Za-z]', caseSensitive: false).hasMatch(nextLine) ||
              RegExp(r'^\([a-z]\)$', caseSensitive: false).hasMatch(nextLine) ||
              RegExp(r'^[a-dA-D]$').hasMatch(nextLine)) {
            i++;
          } else {
            break;
          }
        }
        continue;
      }

      // Handle standalone Figure caption if not preceded by [IMAGE:]
      if (RegExp(r'^(figure|fig\.)\s*\d+', caseSensitive: false).hasMatch(line)) {
        flushParagraph();
        var fullCaption = line;
        while (i + 1 < lines.length) {
          final nextLine = lines[i + 1].trim();
          if (RegExp(r'^\([a-d]\)\s+[A-Za-z]', caseSensitive: false).hasMatch(nextLine) ||
              RegExp(r'^\([a-z]\)$', caseSensitive: false).hasMatch(nextLine) ||
              RegExp(r'^[a-dA-D]$').hasMatch(nextLine)) {
            fullCaption += ' $nextLine';
            i++;
          } else {
            break;
          }
        }
        blocks.add(_classifyBlock(fullCaption));
        continue;
      }

      // Handle orphaned sub-labels like "(a)", "(b)", "(c)", "(d)", "(i)", "(ii)" or standalone single letters "a", "b"
      if (RegExp(r'^\(([a-z]|\d+|[ivx]+)\)$', caseSensitive: false).hasMatch(line) ||
          RegExp(r'^[a-dA-D]$').hasMatch(line)) {
        continue;
      }

      // If line is sub-figure labels like "(c) Scorpion (d) Prawn", or "(a) Locust (b) Butterfly"
      if (RegExp(r'^\([a-d]\)\s+[A-Za-z]', caseSensitive: false).hasMatch(line)) {
        // If the previous block was an image or figureCaption, skip it because the diagram already has the labels
        if (blocks.isNotEmpty &&
            (blocks.last.type == _ReaderBlockType.image ||
             blocks.last.type == _ReaderBlockType.figureCaption)) {
          continue;
        }
      }

      if (_isBlockHeadingOrSpecial(line)) {
        flushParagraph();
        blocks.add(_classifyBlock(line));
      } else {
        if (buffer.isNotEmpty) {
          buffer.write(' ');
        }
        buffer.write(line);
      }
    }
    flushParagraph();

    return blocks;
  }

  Widget _buildH1Block(BuildContext context, String text, bool isDark) {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(top: AppSpacing.xl, bottom: AppSpacing.md),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF2B170E) : AppColors.primarySoft,
        borderRadius: BorderRadius.circular(AppRadii.md),
        border: Border.all(
          color: isDark ? AppColors.primaryDark : AppColors.border,
          width: 1,
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 4.5,
            height: 28,
            margin: const EdgeInsets.only(right: 12, top: 2),
            decoration: BoxDecoration(
              color: AppColors.primary,
              borderRadius: BorderRadius.circular(3),
            ),
          ),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
                  margin: const EdgeInsets.only(bottom: 4),
                  decoration: BoxDecoration(
                    color: isDark ? AppColors.primary : AppColors.primaryDark,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: const Text(
                    'SECTION / TOPIC',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 9.5,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 0.6,
                    ),
                  ),
                ),
                Text(
                  text,
                  style: TextStyle(
                    fontSize: _fontSize + 3.5,
                    fontWeight: FontWeight.w900,
                    letterSpacing: -0.2,
                    color: isDark ? Colors.white : AppColors.primaryDark,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildH2Block(BuildContext context, String text, bool isDark) {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(top: AppSpacing.lg, bottom: AppSpacing.xs),
      padding: const EdgeInsets.only(bottom: 6),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: (isDark ? AppColors.accentLight : AppColors.primary).withValues(alpha: 0.25),
            width: 1.5,
          ),
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            width: 8,
            height: 8,
            margin: const EdgeInsets.only(right: 8),
            decoration: const BoxDecoration(
              color: AppColors.primary,
              shape: BoxShape.circle,
            ),
          ),
          Expanded(
            child: Text(
              text,
              style: TextStyle(
                fontSize: _fontSize + 1.5,
                fontWeight: FontWeight.w800,
                color: isDark ? const Color(0xFFFFA055) : const Color(0xFFC04610),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildH3Block(BuildContext context, String text, bool isDark) {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(top: AppSpacing.md, bottom: AppSpacing.xxs),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            width: 3.5,
            height: 16,
            margin: const EdgeInsets.only(right: 8),
            decoration: BoxDecoration(
              color: const Color(0xFF0F766E),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          Expanded(
            child: Text(
              text,
              style: TextStyle(
                fontSize: _fontSize + 0.5,
                fontWeight: FontWeight.w700,
                color: isDark ? const Color(0xFF5EEAD4) : const Color(0xFF0F766E),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCalloutBlock(BuildContext context, String text, bool isDark) {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.symmetric(vertical: AppSpacing.md),
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF282012) : AppColors.goldSoft,
        borderRadius: BorderRadius.circular(AppRadii.sm),
        border: Border.all(
          color: isDark ? const Color(0xFF854D0E) : AppColors.gold.withValues(alpha: 0.5),
          width: 1.2,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.lightbulb_rounded, size: 16, color: isDark ? const Color(0xFFFDE047) : AppColors.gold),
              const SizedBox(width: 6),
              Text(
                'HIGH-YIELD NOTE / CONCEPT',
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 0.5,
                  color: isDark ? const Color(0xFFFDE047) : AppColors.gold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          SelectableText.rich(
            TextSpan(
              children: _buildParagraphSpans(context, text, isDark),
            ),
            style: TextStyle(
              fontSize: _fontSize - 0.5,
              height: 1.65,
              fontStyle: FontStyle.italic,
              color: isDark ? const Color(0xFFFEF08A) : const Color(0xFF78350F),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBulletBlock(BuildContext context, String text, bool isDark) {
    return Padding(
      padding: const EdgeInsets.only(left: 6, bottom: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 8, right: 10),
            child: Container(
              width: 6,
              height: 6,
              decoration: const BoxDecoration(
                color: AppColors.primary,
                shape: BoxShape.circle,
              ),
            ),
          ),
          Expanded(
            child: SelectableText.rich(
              TextSpan(
                children: _buildParagraphSpans(context, text, isDark),
              ),
              style: TextStyle(
                fontSize: _fontSize,
                height: 1.72,
                color: isDark ? const Color(0xFFE2E8F0) : const Color(0xFF1E293B),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildParagraphBlock(BuildContext context, String text, bool isDark) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: SelectableText.rich(
        TextSpan(
          children: _buildParagraphSpans(context, text, isDark),
        ),
        style: TextStyle(
          fontSize: _fontSize,
          height: 1.75,
          letterSpacing: 0.1,
          color: isDark ? const Color(0xFFE2E8F0) : const Color(0xFF1E293B),
        ),
      ),
    );
  }

  void _openDiagramPopup(BuildContext context, String imageUrl, String caption) {
    showDialog(
      context: context,
      barrierColor: Colors.black.withValues(alpha: 0.92),
      builder: (ctx) => _DiagramZoomDialog(imageUrl: imageUrl, caption: caption),
    );
  }

  Widget _buildImageBlock(BuildContext context, _ReaderBlock block, bool isDark) {
    var rawUrl = block.imageUrl?.trim() ?? '';
    if (rawUrl.isEmpty) return const SizedBox.shrink();
    if (rawUrl.startsWith('/')) {
      rawUrl = '$baseUrl$rawUrl';
    }

    final captionText = block.caption ?? '';

    return Container(
      width: double.infinity,
      margin: const EdgeInsets.symmetric(vertical: AppSpacing.md),
      padding: const EdgeInsets.all(AppSpacing.sm),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1E1E2D) : Colors.white,
        borderRadius: BorderRadius.circular(AppRadii.md),
        border: Border.all(
          color: isDark ? const Color(0xFF2E2E3E) : AppColors.border,
          width: 1.2,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: isDark ? 0.25 : 0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Fixed size diagram card with tap-to-zoom
          InkWell(
            onTap: () => _openDiagramPopup(context, rawUrl, captionText),
            borderRadius: BorderRadius.circular(AppRadii.sm),
            child: Stack(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(AppRadii.sm),
                  child: Container(
                    height: 230,
                    width: double.infinity,
                    color: isDark ? const Color(0xFF14141E) : const Color(0xFFF8FAFC),
                    alignment: Alignment.center,
                    child: FastNetworkImage(
                      url: rawUrl,
                      width: double.infinity,
                      height: 230,
                      fit: BoxFit.contain,
                    ),
                  ),
                ),
                // Tap to zoom hint pill
                Positioned(
                  bottom: 8,
                  right: 8,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.black.withValues(alpha: 0.65),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.zoom_in_rounded, size: 13, color: Colors.white),
                        SizedBox(width: 4),
                        Text(
                          'Tap to zoom',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 10.5,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
          if (captionText.isNotEmpty) ...[
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF282012) : AppColors.primarySoft,
                borderRadius: BorderRadius.circular(AppRadii.sm),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.image_outlined, size: 14, color: AppColors.primary),
                  const SizedBox(width: 6),
                  Flexible(
                    child: Text(
                      captionText,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: isDark ? const Color(0xFFFFA055) : AppColors.primaryDark,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildTableBlock(BuildContext context, String tableText, bool isDark) {
    final rawLines = tableText
        .split('\n')
        .map((l) => l.trim())
        .where((l) => l.startsWith('|') && l.endsWith('|'))
        .toList();
    if (rawLines.length < 2) return const SizedBox.shrink();

    final headerCells = rawLines[0]
        .split('|')
        .map((c) => c.trim())
        .where((c) => c.isNotEmpty)
        .toList();

    int dataStartIndex = 1;
    if (rawLines.length > 1 && RegExp(r'^[|\s\-:]+$').hasMatch(rawLines[1])) {
      dataStartIndex = 2;
    }

    final dataRows = <List<String>>[];
    for (var r = dataStartIndex; r < rawLines.length; r++) {
      final cells = rawLines[r]
          .split('|')
          .map((c) => c.trim())
          .where((c) => c.isNotEmpty)
          .toList();
      if (cells.isNotEmpty) {
        dataRows.add(cells);
      }
    }

    if (headerCells.isEmpty || dataRows.isEmpty) return const SizedBox.shrink();

    return Container(
      width: double.infinity,
      margin: const EdgeInsets.symmetric(vertical: AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1A1A27) : Colors.white,
        borderRadius: BorderRadius.circular(AppRadii.md),
        border: Border.all(
          color: isDark ? const Color(0xFF2E2E3E) : AppColors.border,
          width: 1.2,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: isDark ? 0.25 : 0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF2B170E) : AppColors.primarySoft,
              borderRadius: const BorderRadius.vertical(top: Radius.circular(AppRadii.md - 1)),
              border: Border(
                bottom: BorderSide(
                  color: isDark ? const Color(0xFF3E2718) : AppColors.border,
                ),
              ),
            ),
            child: Row(
              children: [
                const Icon(Icons.table_chart_rounded, size: 16, color: AppColors.primary),
                const SizedBox(width: 8),
                const Text(
                  'HIGH-YIELD COMPARISON TABLE',
                  style: TextStyle(
                    fontSize: 11.5,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 0.6,
                    color: AppColors.primaryDark,
                  ),
                ),
                const Spacer(),
                Text(
                  '↔ Swipe horizontally',
                  style: TextStyle(
                    fontSize: 10.5,
                    fontWeight: FontWeight.w500,
                    color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
                  ),
                ),
              ],
            ),
          ),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: DataTable(
              headingRowHeight: 44,
              dataRowMinHeight: 40,
              dataRowMaxHeight: double.infinity,
              horizontalMargin: 12,
              columnSpacing: 16,
              headingRowColor: WidgetStateProperty.all(
                isDark ? const Color(0xFF241C16) : const Color(0xFFFFF7ED),
              ),
              dataRowColor: WidgetStateProperty.resolveWith((states) {
                return isDark ? const Color(0xFF1A1A27) : Colors.white;
              }),
              columns: headerCells.map((h) {
                return DataColumn(
                  label: Text(
                    h.replaceAll('**', ''),
                    style: TextStyle(
                      fontWeight: FontWeight.w800,
                      fontSize: 12.5,
                      color: isDark ? const Color(0xFFFFA055) : AppColors.primaryDark,
                    ),
                  ),
                );
              }).toList(),
              rows: dataRows.asMap().entries.map((entry) {
                final rowIndex = entry.key;
                final row = entry.value;
                final isEven = rowIndex % 2 == 0;
                return DataRow(
                  color: WidgetStateProperty.all(
                    isEven
                        ? (isDark ? const Color(0xFF1E1E2D) : const Color(0xFFFAFAFA))
                        : (isDark ? const Color(0xFF171722) : Colors.white),
                  ),
                  cells: List.generate(headerCells.length, (colIndex) {
                    final cellText = colIndex < row.length ? row[colIndex] : '';
                    return DataCell(
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 8),
                        child: ConstrainedBox(
                          constraints: const BoxConstraints(maxWidth: 220),
                          child: Text(
                            cellText.replaceAll('**', ''),
                            style: TextStyle(
                              fontSize: 12,
                              height: 1.45,
                              color: isDark ? const Color(0xFFE2E8F0) : const Color(0xFF1E293B),
                            ),
                          ),
                        ),
                      ),
                    );
                  }),
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }

  String? _resolveFigureImageUrl(int? chapterId, String caption) {
    if (chapterId == null) return null;
    final match = RegExp(r'^(?:Figure|Fig\.)\s*(\d+)(?:\.(\d+))?', caseSensitive: false).firstMatch(caption.trim());
    if (match == null) return null;

    // Animal Kingdom mapping (Chapters 37 & 124)
    if (chapterId == 37 || chapterId == 124) {
      final sub = match.group(2) ?? '';
      final lowerCap = caption.toLowerCase();
      if (sub == '1') {
        if (lowerCap.contains('(a)')) return '/content/chapters/$chapterId/images/3';
        if (lowerCap.contains('(b)')) return '/content/chapters/$chapterId/images/2';
        return '/content/chapters/$chapterId/images/2';
      }
      if (sub == '2') return '/content/chapters/$chapterId/images/1';
      if (sub == '3') return '/content/chapters/$chapterId/images/4';
      if (sub == '4') return '/content/chapters/$chapterId/images/5';
      if (sub == '5') return '/content/chapters/$chapterId/images/6';
      if (sub == '6') return '/content/chapters/$chapterId/images/7';
      if (sub == '7') return '/content/chapters/$chapterId/images/8';
      if (sub == '8') return '/content/chapters/$chapterId/images/9';
      if (sub == '9') return '/content/chapters/$chapterId/images/10';
      if (sub == '10') return '/content/chapters/$chapterId/images/12';
      if (sub == '11') return '/content/chapters/$chapterId/images/11';
      if (sub == '12') return '/content/chapters/$chapterId/images/13';
      if (sub == '13') return '/content/chapters/$chapterId/images/14';
      if (sub == '14') return '/content/chapters/$chapterId/images/15';
      if (sub == '15') return '/content/chapters/$chapterId/images/16';
      if (sub == '16') return '/content/chapters/$chapterId/images/17';
      if (sub == '17') return '/content/chapters/$chapterId/images/18';
      if (sub == '18') return '/content/chapters/$chapterId/images/19';
      if (sub == '19') return '/content/chapters/$chapterId/images/20';
      if (sub == '20') return '/content/chapters/$chapterId/images/22';
      if (sub == '21') return '/content/chapters/$chapterId/images/21';
      if (sub == '22') return '/content/chapters/$chapterId/images/23';
      if (sub == '23') return '/content/chapters/$chapterId/images/24';
      if (sub == '24') return '/content/chapters/$chapterId/images/25';
    }

    final numStr = match.group(2) ?? match.group(1);
    final idx = int.tryParse(numStr ?? '');
    if (idx != null && idx > 0) {
      return '/content/chapters/$chapterId/images/$idx';
    }
    return null;
  }

  Widget _buildFigureCaptionBlock(BuildContext context, String text, bool isDark) {
    final resolvedUrl = _resolveFigureImageUrl(widget.chapterId, text);
    if (resolvedUrl != null) {
      return _buildImageBlock(
        context,
        _ReaderBlock(
          type: _ReaderBlockType.image,
          text: text,
          imageUrl: resolvedUrl,
          caption: text,
        ),
        isDark,
      );
    }

    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(top: 4, bottom: AppSpacing.md),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1B1B26) : const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(AppRadii.sm),
        border: Border.all(
          color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 2, right: 8),
            child: Icon(
              Icons.collections_bookmark_rounded,
              size: 16,
              color: isDark ? const Color(0xFF38BDF8) : const Color(0xFF0284C7),
            ),
          ),
          Expanded(
            child: Text(
              text,
              style: TextStyle(
                fontSize: _fontSize - 1.5,
                fontWeight: FontWeight.w600,
                fontStyle: FontStyle.italic,
                height: 1.5,
                color: isDark ? const Color(0xFFBAE6FD) : const Color(0xFF0369A1),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBlockWidget(BuildContext context, _ReaderBlock block, bool isDark) {
    switch (block.type) {
      case _ReaderBlockType.h1:
        return _buildH1Block(context, block.text, isDark);
      case _ReaderBlockType.h2:
        return _buildH2Block(context, block.text, isDark);
      case _ReaderBlockType.h3:
        return _buildH3Block(context, block.text, isDark);
      case _ReaderBlockType.callout:
        return _buildCalloutBlock(context, block.text, isDark);
      case _ReaderBlockType.bullet:
        return _buildBulletBlock(context, block.text, isDark);
      case _ReaderBlockType.paragraph:
        return _buildParagraphBlock(context, block.text, isDark);
      case _ReaderBlockType.image:
        return _buildImageBlock(context, block, isDark);
      case _ReaderBlockType.figureCaption:
        return _buildFigureCaptionBlock(context, block.text, isDark);
      case _ReaderBlockType.table:
        return _buildTableBlock(context, block.text, isDark);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final questions = widget.highlightQuestions;
    final blocks = _parseBlocks(widget.content);

    return Column(
      children: [
        // ── Reader Top Bar (Clean font size controls only) ───────────
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: 4),
          decoration: BoxDecoration(
            color: isDark ? const Color(0xFF1E1E2D) : AppColors.primarySoft,
            border: Border(bottom: BorderSide(color: theme.dividerColor.withValues(alpha: 0.15))),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              IconButton(
                visualDensity: VisualDensity.compact,
                icon: const Text('A-', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                tooltip: 'Decrease font size',
                onPressed: _fontSize > 13 ? () => setState(() => _fontSize -= 1.0) : null,
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: isDark ? Colors.black26 : Colors.white.withValues(alpha: 0.8),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  '${_fontSize.toStringAsFixed(1)} pt',
                  style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600),
                ),
              ),
              IconButton(
                visualDensity: VisualDensity.compact,
                icon: const Text('A+', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                tooltip: 'Increase font size',
                onPressed: _fontSize < 24 ? () => setState(() => _fontSize += 1.0) : null,
              ),
            ],
          ),
        ),

        // ── Main Reading Content ───────────────────────────────────
        Expanded(
          child: blocks.isEmpty
              ? Center(
                  child: Padding(
                    padding: const EdgeInsets.all(AppSpacing.xl),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: const BoxDecoration(
                            color: AppColors.primarySoft,
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.auto_stories_rounded, size: 48, color: AppColors.primary),
                        ),
                        const SizedBox(height: AppSpacing.md),
                        Text(
                          'Interactive Digital Notes',
                          style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: AppSpacing.xs),
                        Text(
                          'Notes and textbook text will be displayed here.',
                          textAlign: TextAlign.center,
                          style: theme.textTheme.bodyMedium?.copyWith(color: Colors.grey),
                        ),
                      ],
                    ),
                  ),
                )
              : SingleChildScrollView(
                  padding: const EdgeInsets.fromLTRB(AppSpacing.lg, AppSpacing.sm, AppSpacing.lg, AppSpacing.xxl),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Formatted Structured Blocks (H1, H2, H3, Callouts, Bullets, Paragraphs, Images, Tables)
                      for (final block in blocks)
                        _buildBlockWidget(context, block, isDark),
                    ],
                  ),
                ),
        ),
      ],
    );
  }

  List<InlineSpan> _buildParagraphSpans(BuildContext context, String paragraph, bool isDark) {
    final spans = <InlineSpan>[];
    if (paragraph.isEmpty) return spans;

    // Phase 1: Collect [BLANK: answer] tokens
    final blankRegex = RegExp(r'\[BLANK:\s*([^\]]+)\]', caseSensitive: false);
    final blankMatches = blankRegex.allMatches(paragraph).toList();

    // Phase 2: Collect highlight question tokens (if any)
    final highlightMatches = <_HighlightMatch>[];
    if (widget.highlightQuestions.isNotEmpty) {
      final normPara = paragraph.toLowerCase();
      for (final q in widget.highlightQuestions) {
        final hlText = (q['highlight_text']?.toString() ?? '').trim();
        if (hlText.length < 5) continue;
        final normHl = hlText.toLowerCase();
        int startIdx = normPara.indexOf(normHl);
        if (startIdx == -1 && normHl.length > 25) {
          final sub = normHl.substring(0, 25);
          startIdx = normPara.indexOf(sub);
        }
        if (startIdx != -1) {
          final matchLen = math.min(hlText.length, paragraph.length - startIdx);
          highlightMatches.add(_HighlightMatch(
            start: startIdx,
            end: startIdx + matchLen,
            question: q,
          ));
        }
      }
    }

    // Combine all tokens
    final allTokens = <_SpanTokenItem>[];
    for (final bm in blankMatches) {
      final ans = bm.group(1)?.trim() ?? '';
      final bKey = 'blank_${widget.chapterId}_${ans.toLowerCase().replaceAll(RegExp(r'[^a-z0-9]'), '')}';
      allTokens.add(_SpanTokenItem(
        type: _SpanTokenType.blank,
        start: bm.start,
        end: bm.end,
        text: bm.group(0)!,
        blankAnswer: ans,
        blankKey: bKey,
      ));
    }

    for (final hm in highlightMatches) {
      final overlaps = allTokens.any((t) => !(hm.end <= t.start || hm.start >= t.end));
      if (!overlaps) {
        allTokens.add(_SpanTokenItem(
          type: _SpanTokenType.highlight,
          start: hm.start,
          end: hm.end,
          text: paragraph.substring(hm.start, hm.end),
          question: hm.question,
        ));
      }
    }

    if (allTokens.isEmpty) {
      return [TextSpan(text: paragraph)];
    }

    allTokens.sort((a, b) => a.start.compareTo(b.start));

    // Filter overlapping tokens
    final cleanTokens = <_SpanTokenItem>[];
    int lastEnd = 0;
    for (final token in allTokens) {
      if (token.start >= lastEnd) {
        cleanTokens.add(token);
        lastEnd = token.end;
      }
    }

    int cursor = 0;
    for (final token in cleanTokens) {
      if (token.start > cursor) {
        spans.add(TextSpan(text: paragraph.substring(cursor, token.start)));
      }

      if (token.type == _SpanTokenType.blank) {
        final answer = token.blankAnswer ?? '';
        final blankKey = token.blankKey ?? '';
        final isSolved = _solvedBlanks.contains(blankKey);

        if (isSolved) {
          spans.add(
            WidgetSpan(
              alignment: PlaceholderAlignment.middle,
              child: GestureDetector(
                onTap: () => _openBlankSolveDialog(
                  context,
                  paragraph.replaceAll(RegExp(r'\[BLANK:[^\]]+\]'), '_______'),
                  answer,
                  blankKey,
                ),
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: isDark ? const Color(0xFF064E3B) : const Color(0xFFD1FAE5),
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(
                      color: isDark ? const Color(0xFF10B981) : const Color(0xFF059669),
                      width: 1.2,
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        answer,
                        style: TextStyle(
                          fontWeight: FontWeight.w800,
                          fontSize: _fontSize - 0.5,
                          color: isDark ? const Color(0xFF6EE7B7) : const Color(0xFF065F46),
                        ),
                      ),
                      const SizedBox(width: 4),
                      const Icon(Icons.check_circle_rounded, size: 12, color: Color(0xFF10B981)),
                    ],
                  ),
                ),
              ),
            ),
          );
        } else {
          spans.add(
            WidgetSpan(
              alignment: PlaceholderAlignment.middle,
              child: GestureDetector(
                onTap: () => _openBlankSolveDialog(
                  context,
                  paragraph.replaceAll(RegExp(r'\[BLANK:[^\]]+\]'), '_______'),
                  answer,
                  blankKey,
                ),
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                  padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 3),
                  decoration: BoxDecoration(
                    color: isDark ? const Color(0xFF282012) : const Color(0xFFFEF3C7),
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(
                      color: isDark ? const Color(0xFFF59E0B) : const Color(0xFFD97706),
                      width: 1.4,
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        '[  _______ ?  ]',
                        style: TextStyle(
                          color: isDark ? const Color(0xFFFCD34D) : const Color(0xFF92400E),
                          fontWeight: FontWeight.w800,
                          fontSize: _fontSize - 1.0,
                          letterSpacing: 0.5,
                        ),
                      ),
                      const SizedBox(width: 4),
                      Icon(
                        Icons.edit_note_rounded,
                        size: 13,
                        color: isDark ? const Color(0xFFFCD34D) : const Color(0xFFB45309),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          );
        }
      } else if (token.type == _SpanTokenType.highlight) {
        final matchedText = token.text;
        final cleanKey = matchedText
            .replaceAll(RegExp(r'[^a-zA-Z0-9]'), '')
            .toLowerCase();
        final sentenceKey = cleanKey.length > 40 ? cleanKey.substring(0, 40) : cleanKey;
        final hasNote = _localNotes.containsKey(sentenceKey);

        // Clickable underlined sentence -> Opens White Canvas Notepad
        spans.add(
          TextSpan(
            text: matchedText,
            style: TextStyle(
              fontWeight: FontWeight.w600,
              decoration: TextDecoration.underline,
              decorationColor: hasNote ? const Color(0xFF10B981) : const Color(0xFFF59E0B),
              decorationThickness: 2.0,
              decorationStyle: TextDecorationStyle.solid,
              color: hasNote
                  ? (isDark ? const Color(0xFFA7F3D0) : const Color(0xFF065F46))
                  : (isDark ? const Color(0xFFFDE68A) : const Color(0xFF78350F)),
              backgroundColor: hasNote
                  ? (isDark ? Colors.green.withValues(alpha: 0.15) : const Color(0xFFECFDF5))
                  : (isDark ? Colors.amber.withValues(alpha: 0.15) : const Color(0xFFFEF3C7)),
            ),
            recognizer: TapGestureRecognizer()..onTap = () => _openWhiteCanvas(context, matchedText),
          ),
        );

        // Inline Note Badge
        spans.add(
          WidgetSpan(
            alignment: PlaceholderAlignment.middle,
            child: GestureDetector(
              onTap: () => _openWhiteCanvas(context, matchedText),
              child: Container(
                margin: const EdgeInsets.only(left: 4, right: 4),
                padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1.5),
                decoration: BoxDecoration(
                  color: hasNote
                      ? (isDark ? const Color(0xFF064E3B) : const Color(0xFFD1FAE5))
                      : (isDark ? const Color(0xFF282012) : const Color(0xFFFEF3C7)),
                  borderRadius: BorderRadius.circular(5),
                  border: Border.all(
                    color: hasNote ? const Color(0xFF10B981) : const Color(0xFFF59E0B),
                    width: 1.0,
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      hasNote ? Icons.description_rounded : Icons.edit_note_rounded,
                      size: 10,
                      color: hasNote ? const Color(0xFF10B981) : const Color(0xFFD97706),
                    ),
                    const SizedBox(width: 2),
                    Text(
                      hasNote ? 'Note' : 'Note',
                      style: TextStyle(
                        color: hasNote ? const Color(0xFF059669) : const Color(0xFFB45309),
                        fontSize: 8.5,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      }

      cursor = token.end;
    }

    if (cursor < paragraph.length) {
      spans.add(TextSpan(text: paragraph.substring(cursor)));
    }

    return spans;
  }
}

enum _SpanTokenType { blank, highlight }

class _SpanTokenItem {
  _SpanTokenItem({
    required this.type,
    required this.start,
    required this.end,
    required this.text,
    this.blankAnswer,
    this.blankKey,
    this.question,
  });

  final _SpanTokenType type;
  final int start;
  final int end;
  final String text;
  final String? blankAnswer;
  final String? blankKey;
  final Map<String, dynamic>? question;
}

class _WhiteCanvasNoteDialog extends StatefulWidget {
  const _WhiteCanvasNoteDialog({
    required this.highlightText,
    required this.initialNote,
    required this.onSave,
  });

  final String highlightText;
  final String initialNote;
  final void Function(String note) onSave;

  @override
  State<_WhiteCanvasNoteDialog> createState() => _WhiteCanvasNoteDialogState();
}

class _WhiteCanvasNoteDialogState extends State<_WhiteCanvasNoteDialog> {
  late final TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.initialNote);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _handleSave() {
    widget.onSave(_controller.text);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Note saved to this device memory! (Offline & Private)'),
        duration: Duration(seconds: 2),
        backgroundColor: Color(0xFF059669),
      ),
    );
    Navigator.of(context).pop();
  }

  void _handleDelete() {
    widget.onSave('');
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Note removed from device memory.'),
        duration: Duration(seconds: 2),
      ),
    );
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Dialog(
      backgroundColor: Colors.transparent,
      insetPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 24),
      child: Container(
        width: double.infinity,
        constraints: const BoxConstraints(maxWidth: 520),
        decoration: BoxDecoration(
          color: isDark ? const Color(0xFF181824) : Colors.white,
          borderRadius: BorderRadius.circular(AppRadii.lg),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.35),
              blurRadius: 20,
              offset: const Offset(0, 8),
            ),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Top Header
            Container(
              padding: const EdgeInsets.fromLTRB(16, 14, 10, 12),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF222234) : const Color(0xFFF8FAFC),
                borderRadius: const BorderRadius.vertical(top: Radius.circular(AppRadii.lg)),
                border: Border(
                  bottom: BorderSide(
                    color: isDark ? const Color(0xFF2E2E44) : const Color(0xFFE2E8F0),
                  ),
                ),
              ),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(7),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Icon(Icons.draw_rounded, color: AppColors.primary, size: 20),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Study Notepad & Canvas',
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w800,
                            letterSpacing: -0.2,
                          ),
                        ),
                        const SizedBox(height: 1),
                        Row(
                          children: [
                            const Icon(Icons.phonelink_lock_rounded, size: 11, color: Color(0xFF10B981)),
                            const SizedBox(width: 3),
                            Text(
                              'Device Storage Only • Private & Offline',
                              style: TextStyle(
                                fontSize: 10.5,
                                fontWeight: FontWeight.w600,
                                color: isDark ? const Color(0xFF6EE7B7) : const Color(0xFF059669),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close_rounded, size: 20),
                    visualDensity: VisualDensity.compact,
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                ],
              ),
            ),

            Flexible(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Highlighted Reference Quote Box
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                      decoration: BoxDecoration(
                        color: isDark ? const Color(0xFF282012) : const Color(0xFFFFFBEB),
                        borderRadius: BorderRadius.circular(AppRadii.sm),
                        border: Border.all(
                          color: isDark ? const Color(0xFF78350F) : const Color(0xFFFDE68A),
                        ),
                      ),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Icon(
                            Icons.format_quote_rounded,
                            size: 18,
                            color: isDark ? const Color(0xFFFBBF24) : const Color(0xFFD97706),
                          ),
                          const SizedBox(width: 6),
                          Expanded(
                            child: Text(
                              widget.highlightText,
                              style: TextStyle(
                                fontSize: 12.5,
                                height: 1.45,
                                fontStyle: FontStyle.italic,
                                fontWeight: FontWeight.w600,
                                color: isDark ? const Color(0xFFFEF3C7) : const Color(0xFF78350F),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 14),

                    // White Paper Canvas Writing Area
                    Container(
                      width: double.infinity,
                      decoration: BoxDecoration(
                        color: isDark ? const Color(0xFF111119) : const Color(0xFFFAFAFA),
                        borderRadius: BorderRadius.circular(AppRadii.md),
                        border: Border.all(
                          color: isDark ? const Color(0xFF33334A) : const Color(0xFFCBD5E1),
                          width: 1.2,
                        ),
                      ),
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                      child: TextField(
                        controller: _controller,
                        minLines: 6,
                        maxLines: 12,
                        style: TextStyle(
                          fontSize: 14,
                          height: 1.55,
                          color: isDark ? const Color(0xFFF1F5F9) : const Color(0xFF0F172A),
                        ),
                        decoration: InputDecoration(
                          hintText: 'Type your personal notes, mnemonics, or revision points here...',
                          hintStyle: TextStyle(
                            fontSize: 13,
                            color: isDark ? Colors.grey.shade500 : Colors.grey.shade400,
                          ),
                          border: InputBorder.none,
                          isDense: true,
                          contentPadding: EdgeInsets.zero,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Bottom Buttons
            Container(
              padding: const EdgeInsets.fromLTRB(16, 10, 16, 14),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF222234) : const Color(0xFFF8FAFC),
                borderRadius: const BorderRadius.vertical(bottom: Radius.circular(AppRadii.lg)),
                border: Border(
                  top: BorderSide(
                    color: isDark ? const Color(0xFF2E2E44) : const Color(0xFFE2E8F0),
                  ),
                ),
              ),
              child: Row(
                children: [
                  if (widget.initialNote.trim().isNotEmpty) ...[
                    OutlinedButton.icon(
                      style: OutlinedButton.styleFrom(
                        foregroundColor: const Color(0xFFEF4444),
                        side: const BorderSide(color: Color(0xFFFCA5A5)),
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      ),
                      icon: const Icon(Icons.delete_outline_rounded, size: 16),
                      label: const Text('Delete'),
                      onPressed: _handleDelete,
                    ),
                    const SizedBox(width: 10),
                  ],
                  const Spacer(),
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(),
                    child: const Text('Cancel'),
                  ),
                  const SizedBox(width: 8),
                  FilledButton.icon(
                    style: FilledButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
                    ),
                    icon: const Icon(Icons.check_rounded, size: 18),
                    label: const Text('Save Note'),
                    onPressed: _handleSave,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _BlankSolveBottomSheet extends StatefulWidget {
  const _BlankSolveBottomSheet({
    required this.sentenceContext,
    required this.correctAnswer,
    required this.isSolved,
    required this.onSolved,
    required this.onReset,
  });

  final String sentenceContext;
  final String correctAnswer;
  final bool isSolved;
  final VoidCallback onSolved;
  final VoidCallback onReset;

  @override
  State<_BlankSolveBottomSheet> createState() => _BlankSolveBottomSheetState();
}

class _BlankSolveBottomSheetState extends State<_BlankSolveBottomSheet> {
  final TextEditingController _guessController = TextEditingController();
  bool? _isCorrect;
  bool _revealed = false;

  @override
  void initState() {
    super.initState();
    if (widget.isSolved) {
      _revealed = true;
      _guessController.text = widget.correctAnswer;
    }
  }

  @override
  void dispose() {
    _guessController.dispose();
    super.dispose();
  }

  void _checkAnswer() {
    final input = _guessController.text.trim().toLowerCase();
    final target = widget.correctAnswer.trim().toLowerCase();
    if (input.isEmpty) return;

    if (input == target || target.contains(input)) {
      setState(() {
        _isCorrect = true;
        _revealed = true;
      });
      widget.onSolved();
    } else {
      setState(() {
        _isCorrect = false;
      });
    }
  }

  void _reveal() {
    setState(() {
      _revealed = true;
      _guessController.text = widget.correctAnswer;
    });
    widget.onSolved();
  }

  void _reset() {
    widget.onReset();
    setState(() {
      _isCorrect = null;
      _revealed = false;
      _guessController.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      decoration: BoxDecoration(
        color: theme.scaffoldBackgroundColor,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(AppRadii.xl)),
        boxShadow: const [
          BoxShadow(color: Colors.black26, blurRadius: 16, offset: Offset(0, -4)),
        ],
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
                    color: AppColors.primary.withValues(alpha: 0.18),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.flash_on_rounded, color: AppColors.primary, size: 20),
                ),
                const SizedBox(width: AppSpacing.sm),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Active Recall • Fill In The Blank',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                      ),
                      Text(
                        'Test your NCERT keyword memory on the spot',
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

            // Sentence context
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF1E1E2D) : const Color(0xFFF1F5F9),
                borderRadius: BorderRadius.circular(AppRadii.md),
                border: Border.all(
                  color: isDark ? const Color(0xFF2E2E3E) : const Color(0xFFCBD5E1),
                ),
              ),
              child: Text(
                widget.sentenceContext,
                style: TextStyle(
                  fontSize: 14,
                  height: 1.5,
                  fontWeight: FontWeight.w500,
                  color: isDark ? const Color(0xFFE2E8F0) : const Color(0xFF1E293B),
                ),
              ),
            ),
            const SizedBox(height: AppSpacing.md),

            // Answer Input
            TextField(
              controller: _guessController,
              autofocus: !widget.isSolved,
              enabled: !_revealed,
              textInputAction: TextInputAction.done,
              onSubmitted: (_) => _checkAnswer(),
              decoration: InputDecoration(
                labelText: 'Type the missing word / keyword',
                hintText: 'e.g. ${widget.correctAnswer.length} letters...',
                prefixIcon: const Icon(Icons.edit_rounded),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(AppRadii.md)),
              ),
            ),
            const SizedBox(height: AppSpacing.sm),

            // Result Feedback
            if (_isCorrect == true || _revealed)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(12),
                margin: const EdgeInsets.only(bottom: AppSpacing.sm),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF064E3B) : const Color(0xFFD1FAE5),
                  borderRadius: BorderRadius.circular(AppRadii.sm),
                  border: Border.all(color: const Color(0xFF10B981)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.check_circle_rounded, color: Color(0xFF10B981), size: 20),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Correct Answer: "${widget.correctAnswer}"',
                        style: TextStyle(
                          color: isDark ? const Color(0xFFA7F3D0) : const Color(0xFF065F46),
                          fontWeight: FontWeight.w700,
                          fontSize: 13,
                        ),
                      ),
                    ),
                  ],
                ),
              )
            else if (_isCorrect == false)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(12),
                margin: const EdgeInsets.only(bottom: AppSpacing.sm),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF450A0A) : const Color(0xFFFEE2E2),
                  borderRadius: BorderRadius.circular(AppRadii.sm),
                  border: Border.all(color: const Color(0xFFEF4444)),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.cancel_rounded, color: Color(0xFFEF4444), size: 20),
                    SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Not quite right. Try again or tap Reveal Answer!',
                        style: TextStyle(
                          color: Color(0xFFB91C1C),
                          fontWeight: FontWeight.w600,
                          fontSize: 12.5,
                        ),
                      ),
                    ),
                  ],
                ),
              ),

            // Buttons
            Row(
              children: [
                if (!_revealed) ...[
                  Expanded(
                    child: OutlinedButton(
                      onPressed: _reveal,
                      child: const Text('Reveal Answer'),
                    ),
                  ),
                  const SizedBox(width: AppSpacing.sm),
                  Expanded(
                    child: FilledButton(
                      onPressed: _checkAnswer,
                      child: const Text('Submit Guess'),
                    ),
                  ),
                ] else ...[
                  Expanded(
                    child: OutlinedButton.icon(
                      icon: const Icon(Icons.refresh_rounded, size: 16),
                      label: const Text('Reset Blank'),
                      onPressed: _reset,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.sm),
                  Expanded(
                    child: FilledButton.tonal(
                      onPressed: () => Navigator.of(context).pop(),
                      child: const Text('Done'),
                    ),
                  ),
                ],
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _HighlightMatch {
  _HighlightMatch({required this.start, required this.end, required this.question});
  final int start;
  final int end;
  final Map<String, dynamic> question;
}

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

class _DiagramZoomDialog extends StatefulWidget {
  const _DiagramZoomDialog({required this.imageUrl, required this.caption});
  final String imageUrl;
  final String caption;

  @override
  State<_DiagramZoomDialog> createState() => _DiagramZoomDialogState();
}

class _DiagramZoomDialogState extends State<_DiagramZoomDialog> {
  final TransformationController _controller = TransformationController();
  double _currentScale = 1.0;

  void _zoomBy(double factor) {
    setState(() {
      _currentScale = (_currentScale * factor).clamp(1.0, 6.0);
      _controller.value = Matrix4.identity()..scale(_currentScale);
    });
  }

  void _resetZoom() {
    setState(() {
      _currentScale = 1.0;
      _controller.value = Matrix4.identity();
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.transparent,
      insetPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 20),
      child: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: BoxDecoration(
          color: const Color(0xFF0F0F17),
          borderRadius: BorderRadius.circular(AppRadii.lg),
          border: Border.all(color: const Color(0xFF2A2A3C)),
        ),
        child: Column(
          children: [
            // Header
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              decoration: const BoxDecoration(
                color: Color(0xFF1A1A26),
                borderRadius: BorderRadius.vertical(top: Radius.circular(AppRadii.lg)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.image_outlined, color: AppColors.primary, size: 20),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      widget.caption.isNotEmpty ? widget.caption : 'Diagram View',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 13.5,
                        fontWeight: FontWeight.w600,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close_rounded, color: Colors.white70, size: 22),
                    onPressed: () => Navigator.of(context).pop(),
                    tooltip: 'Close',
                  ),
                ],
              ),
            ),
            // Image Canvas with InteractiveViewer
            Expanded(
              child: GestureDetector(
                onDoubleTap: () {
                  if (_currentScale > 1.2) {
                    _resetZoom();
                  } else {
                    _zoomBy(2.0);
                  }
                },
                child: Center(
                  child: InteractiveViewer(
                    transformationController: _controller,
                    minScale: 1.0,
                    maxScale: 6.0,
                    clipBehavior: Clip.none,
                    onInteractionUpdate: (_) {
                      _currentScale = _controller.value.getMaxScaleOnAxis();
                    },
                    child: FastNetworkImage(
                      url: widget.imageUrl,
                      fit: BoxFit.contain,
                    ),
                  ),
                ),
              ),
            ),
            // Bottom Zoom Controls Bar
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
              decoration: const BoxDecoration(
                color: Color(0xFF1A1A26),
                borderRadius: BorderRadius.vertical(bottom: Radius.circular(AppRadii.lg)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Pinch or double-tap to zoom (${_currentScale.toStringAsFixed(1)}x)',
                    style: const TextStyle(color: Colors.white54, fontSize: 11),
                  ),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.zoom_out_rounded, color: Colors.white),
                        onPressed: () => _zoomBy(0.75),
                        tooltip: 'Zoom Out',
                      ),
                      TextButton(
                        onPressed: _resetZoom,
                        child: const Text('Reset', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold)),
                      ),
                      IconButton(
                        icon: const Icon(Icons.zoom_in_rounded, color: Colors.white),
                        onPressed: () => _zoomBy(1.33),
                        tooltip: 'Zoom In',
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}