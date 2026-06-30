import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';

import '../../core/access/content_access.dart';
import '../../core/providers/app_state.dart';
import '../content/data/content_repository.dart';
import '../onboarding/onboarding_checklist_widget.dart';
import '../../core/services/onboarding_checklist_service.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import '../../widgets/content_lock.dart';
import '../../widgets/paginated_answer_review.dart';

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
      errorBuilder: (ctx, err, st) => Container(
        height: 120,
        alignment: Alignment.center,
        color: AppColors.surfaceMuted,
        child: const Text('Image unavailable'),
      ),
    ),
  );
}

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
    _dataFuture = _loadData();
  }

  Future<Map<String, dynamic>> _loadData() async {
    final repo = ContentRepository();
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
    final chapters = await ContentRepository().fetchChapters(bookId);
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
    final hasSubscription = uiState.hasActiveSubscription;
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
                        subtitle: 'Admin panel se add karne par books yahan dikhengi.',
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
    final chapterFuture = ContentRepository().fetchChapterDetail(chapterId);
    final pyqFuture = ContentRepository().fetchPyqs(chapterId);
    return FutureBuilder<Map<String, dynamic>>(
      future: Future.wait([chapterFuture, pyqFuture]).then((v) => {
        'chapter': (v[0] as Map<String, dynamic>)['chapter'],
        'pyqs': v[1] as List<Map<String, dynamic>>,
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
        final chapterIdString = chapter['id']?.toString() ?? '$chapterId';
        final isSaved =
            ref.watch(appUiControllerProvider).savedChapterIds.contains(chapterIdString);
        return DefaultTabController(
          length: 3,
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
                  Tab(text: 'Book'),
                  Tab(text: 'PYQs'),
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
                      Text(
                        'Linked PYQs: ${chapter['linked_pyq_count'] ?? pyqs.length}',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                      if ((chapter['material_type']?.toString() ?? '') == 'pdf' &&
                          (chapter['material_drive_link']?.toString() ?? '').isNotEmpty) ...[
                        const SizedBox(height: AppSpacing.sm),
                        Row(
                          children: [
                            const Icon(Icons.picture_as_pdf_rounded,
                                size: 18, color: AppColors.danger),
                            const SizedBox(width: AppSpacing.sm),
                            PrimaryButton(
                              label: 'Open PDF',
                              expanded: false,
                              onPressed: () async {
                                final raw =
                                    chapter['material_drive_link']?.toString() ?? '';
                                if (raw.isEmpty) return;
                                final encoded = Uri.encodeComponent(raw);
                                final viewerUrl =
                                    'https://drive.google.com/viewerng/viewer'
                                    '?embedded=true&url=$encoded';
                                final uri = Uri.tryParse(viewerUrl);
                                if (uri == null) return;
                                await launchUrl(
                                  uri,
                                  mode: LaunchMode.inAppBrowserView,
                                );
                              },
                            ),
                          ],
                        ),
                      ],
                    ],
                  ),
                ),
                const Divider(height: 1),
                // ── TabBarView fills all remaining space ────────────────────
                // Using Expanded here (not a fixed-height SizedBox) is what
                // makes the 3 sections visible. A SizedBox inside a
                // SingleChildScrollView collapses TabBarView because both
                // scroll in the same axis and Flutter cannot resolve the
                // unbounded-height constraint.
                Expanded(
                  child: TabBarView(
                    children: [
                      _PdfOrNotesPanel(chapter: chapter),
                      _PyqSolvePanel(pyqs: pyqs),
                      _DetailPanel(
                        title: 'Important lines',
                        content: chapter['highlight']?.toString() ?? '',
                        bullets: const [
                          'Highlighted lines for revision',
                          'One-tap bookmark',
                          'Inline note highlight style',
                        ],
                        highlight: true,
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

class _PyqSolvePanel extends StatefulWidget {
  const _PyqSolvePanel({required this.pyqs});

  final List<Map<String, dynamic>> pyqs;

  @override
  State<_PyqSolvePanel> createState() => _PyqSolvePanelState();
}

class _PyqSolvePanelState extends State<_PyqSolvePanel> {
  int _index = 0;
  final Map<int, String> _answers = {};
  bool _submitted = false;

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
        bullets: ['Admin panel se PYQs add hone ke baad yahan solve kar sakte ho.'],
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
      final accuracy =
          widget.pyqs.isEmpty ? 0.0 : (correct / widget.pyqs.length) * 100;

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
                      '$correct/${widget.pyqs.length}',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 48,
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
    final options = <String, String>{
      'A': q['option_a']?.toString() ?? '',
      'B': q['option_b']?.toString() ?? '',
      'C': q['option_c']?.toString() ?? '',
      'D': q['option_d']?.toString() ?? '',
    };

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
                  Text(
                    'Q${_index + 1}. ${q['question'] ?? ''}',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  if ((q['question_image_link']?.toString() ?? '').isNotEmpty) ...[
                    const SizedBox(height: AppSpacing.sm),
                    _buildQuestionImage(q['question_image_link'].toString()),
                  ],
                  const SizedBox(height: AppSpacing.md),
                  ...options.entries.map((e) {
                    final isSel = selected == e.key;
                    return Padding(
                      padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                      child: InkWell(
                        onTap: () => setState(() => _answers[_index] = e.key),
                        borderRadius: BorderRadius.circular(AppRadii.md),
                        child: Container(
                          padding: const EdgeInsets.all(AppSpacing.md),
                          decoration: BoxDecoration(
                            color: isSel
                                ? AppColors.indigoSoft
                                : Theme.of(context).cardColor,
                            borderRadius: BorderRadius.circular(AppRadii.md),
                            border: Border.all(
                              color: isSel ? AppColors.indigo : AppColors.border,
                            ),
                          ),
                          child: Text('${e.key}) ${e.value}'),
                        ),
                      ),
                    );
                  }),
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
  bool _loadPreview = true;
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
              Padding(
                padding: const EdgeInsets.fromLTRB(
                  AppSpacing.md, AppSpacing.md, AppSpacing.md, 0,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(AppSpacing.md),
                      decoration: BoxDecoration(
                        gradient: AppGradients.primary,
                        borderRadius: BorderRadius.circular(AppRadii.md),
                      ),
                      child: Row(
                        children: const [
                          Icon(Icons.auto_stories_rounded, color: Colors.white),
                          SizedBox(width: AppSpacing.sm),
                          Expanded(
                            child: Text(
                              'Chapter Reader',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.w800,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    Row(
                      children: [
                        Expanded(
                          child: SecondaryButton(
                            label: _loadPreview ? 'Reload Preview' : 'Load Preview',
                            onPressed: () {
                              _webViewController?.loadRequest(Uri.parse(previewUrl));
                              setState(() {
                                _loadPreview = true;
                                _previewKey++;
                              });
                            },
                          ),
                        ),
                        const SizedBox(width: AppSpacing.sm),
                        Expanded(
                          child: PrimaryButton(
                            label: 'Open Full PDF',
                            onPressed: () async {
                              final uri = Uri.tryParse(previewUrl);
                              if (uri == null) return;
                              await launchUrl(uri, mode: LaunchMode.inAppBrowserView);
                            },
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.md),
                  ],
                ),
              ),
              if (_loadPreview)
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
                ? 'PDF uploaded, but extracted text is not available (scan/image PDF). Use Open PDF.'
                : ''),
        bullets: const [
          'Concept overview cards',
          'Formula and memory anchors',
          'High-yield mistakes to avoid',
        ],
      ),
    );
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

  void _ensurePreviewController(String? previewUrl) {
    if (previewUrl == null) return;
    if (_webViewController != null && _loadedPreviewUrl == previewUrl) return;
    _webViewController = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(Colors.transparent)
      ..loadRequest(Uri.parse(previewUrl));
    _loadedPreviewUrl = previewUrl;
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
}