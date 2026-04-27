import 'package:flutter/foundation.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:webview_flutter/webview_flutter.dart';

import '../../core/constants/api_constants.dart';
import '../../core/providers/app_state.dart';
import '../content/data/content_repository.dart';
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
      errorBuilder: (context, e, stack) => Container(
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
  Future<Map<String, dynamic>>? _dataFuture;

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

  Future<void> _refresh() async {
    setState(() => _dataFuture = _loadData());
    await _dataFuture;
  }

  Future<void> _openBookChapter(BuildContext context, Map<String, dynamic> book) async {
    final bookId = int.tryParse(book['id']?.toString() ?? '');
    if (bookId == null) return;

    if (!context.mounted) return;
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) => const Center(child: CircularProgressIndicator()),
    );

    List<Map<String, dynamic>> chapters;
    try {
      chapters = await ContentRepository().fetchChapters(bookId);
    } catch (_) {
      chapters = [];
    }

    if (!context.mounted) return;
    Navigator.of(context).pop(); // dismiss loading dialog

    if (chapters.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('No chapters available for this book.')),
      );
      return;
    }

    // Single chapter → navigate directly, no sheet needed.
    if (chapters.length == 1) {
      final chapterId = int.tryParse(chapters.first['id']?.toString() ?? '');
      if (!context.mounted || chapterId == null) return;
      Navigator.of(context).push(
        MaterialPageRoute(builder: (_) => ChapterDetailScreen(chapterId: chapterId)),
      );
      return;
    }

    // Multiple chapters → show selection sheet with clear chapter numbers.
    if (!context.mounted) return;
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (sheetCtx) => DraggableScrollableSheet(
        initialChildSize: 0.5,
        minChildSize: 0.3,
        maxChildSize: 0.85,
        expand: false,
        builder: (_, controller) => Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 10),
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.grey.shade400,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 12),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Select Chapter',
                    style: Theme.of(sheetCtx)
                        .textTheme
                        .titleMedium
                        ?.copyWith(fontWeight: FontWeight.w700),
                  ),
                  Text(
                    book['title']?.toString() ?? '',
                    style: Theme.of(sheetCtx).textTheme.bodySmall,
                  ),
                ],
              ),
            ),
            const Divider(height: 16),
            Expanded(
              child: ListView.builder(
                controller: controller,
                itemCount: chapters.length,
                itemBuilder: (_, i) {
                  final ch = chapters[i];
                  final chapterId = int.tryParse(ch['id']?.toString() ?? '');
                  final title = ch['title']?.toString() ?? '';
                  final overview = ch['overview']?.toString() ?? '';
                  return ListTile(
                    leading: CircleAvatar(
                      radius: 16,
                      backgroundColor: AppColors.indigo,
                      child: Text(
                        '${i + 1}',
                        style: const TextStyle(color: Colors.white, fontSize: 12),
                      ),
                    ),
                    title: Text(
                      'Chapter ${i + 1}${title.isNotEmpty ? ' — $title' : ''}',
                      style: const TextStyle(fontWeight: FontWeight.w600),
                    ),
                    subtitle: overview.isNotEmpty
                        ? Text(overview, maxLines: 1, overflow: TextOverflow.ellipsis)
                        : null,
                    trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 14),
                    onTap: () {
                      Navigator.of(sheetCtx).pop();
                      if (chapterId == null) return;
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (_) => ChapterDetailScreen(chapterId: chapterId),
                        ),
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  List<Widget> _buildSubjectCards(BuildContext context, List<Map<String, dynamic>> books) {
    final Map<String, List<Map<String, dynamic>>> bySubject = {};
    for (final book in books) {
      final subject = (book['subject']?.toString() ?? '').trim();
      final key = subject.isEmpty ? 'General' : subject;
      bySubject.putIfAbsent(key, () => []).add(book);
    }
    return bySubject.entries.map((entry) => Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.md),
      child: SurfaceCard(
        child: ListTile(
          contentPadding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: AppSpacing.xs),
          leading: const CircleAvatar(
            backgroundColor: AppColors.indigoSoft,
            child: Icon(Icons.menu_book_outlined, color: AppColors.indigo),
          ),
          title: Text(entry.key, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
          subtitle: Text('${entry.value.length} book${entry.value.length == 1 ? '' : 's'}'),
          trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16),
          onTap: () => _openSubjectBooks(context, entry.key, entry.value),
        ),
      ),
    )).toList();
  }

  void _openSubjectBooks(
    BuildContext context,
    String subject,
    List<Map<String, dynamic>> subjectBooks,
  ) {
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (sheetCtx) => DraggableScrollableSheet(
        initialChildSize: 0.5,
        minChildSize: 0.3,
        maxChildSize: 0.85,
        expand: false,
        builder: (_, controller) => Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 10),
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.grey.shade400,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 12),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: [
                  const CircleAvatar(
                    radius: 18,
                    backgroundColor: AppColors.indigoSoft,
                    child: Icon(Icons.menu_book_outlined, color: AppColors.indigo, size: 18),
                  ),
                  const SizedBox(width: AppSpacing.sm),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(subject,
                            style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
                        Text('${subjectBooks.length} book${subjectBooks.length == 1 ? '' : 's'}',
                            style: Theme.of(context).textTheme.bodySmall),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.sm),
            const Divider(height: 1),
            Expanded(
              child: ListView.separated(
                controller: controller,
                padding: const EdgeInsets.symmetric(vertical: AppSpacing.sm),
                itemCount: subjectBooks.length,
                separatorBuilder: (ctx, i) => const Divider(height: 1),
                itemBuilder: (_, i) {
                  final book = subjectBooks[i];
                  final topic = book['topic']?.toString() ?? '';
                  return ListTile(
                    leading: const Icon(Icons.book_outlined, color: AppColors.indigo),
                    title: Text(book['title']?.toString() ?? ''),
                    subtitle: topic.isNotEmpty ? Text(topic) : null,
                    trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16),
                    onTap: () {
                      Navigator.of(sheetCtx).pop();
                      _openBookChapter(context, book);
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final uiState = ref.watch(appUiControllerProvider);
    return RefreshIndicator(
      onRefresh: _refresh,
      child: SingleChildScrollView(
      physics: const AlwaysScrollableScrollPhysics(),
      padding: const EdgeInsets.all(AppSpacing.lg),
      child: CenteredContent(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SectionHeader(
              title: 'Books and notes',
              subtitle:
                  'Structured reading for NCERT, handwritten notes, formula sheets, diagrams, and bookmarks.',
            ),
            const SizedBox(height: AppSpacing.lg),
            const SearchBarWidget(hint: 'Search books, notes, chapters, diagrams'),
            const SizedBox(height: AppSpacing.lg),
            FutureBuilder<Map<String, dynamic>>(
              future: _dataFuture,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
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
                    else ..._buildSubjectCards(context, books),
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
                            ...bookmarkedBooks.map(
                              (book) => Padding(
                                padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                                child: ListTile(
                                  contentPadding: EdgeInsets.zero,
                                  leading: const Icon(Icons.bookmark_rounded),
                                  title: Text(book['title']?.toString() ?? ''),
                                  subtitle: Text('${book['subject'] ?? ''} • ${book['topic'] ?? ''}'),
                                  trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16),
                                  onTap: () => _openBookChapter(context, book),
                                ),
                              ),
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
    ),
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
                // ── Compact status bar ──────────────────────────────────────
                Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.lg, vertical: AppSpacing.xs),
                  child: Row(
                    children: [
                      const Icon(Icons.quiz_outlined, size: 14, color: AppColors.textSecondary),
                      const SizedBox(width: 4),
                      Text(
                        '${chapter['linked_pyq_count'] ?? pyqs.length} PYQs',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                      if (chapter['has_pdf'] == true) ...[
                        const SizedBox(width: AppSpacing.md),
                        const Icon(Icons.picture_as_pdf_rounded, size: 14, color: AppColors.danger),
                        const SizedBox(width: 4),
                        Text('PDF', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.danger)),
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
  final Map<int, String> _selected = {};
  final Set<int> _revealed = {};

  @override
  Widget build(BuildContext context) {
    if (widget.pyqs.isEmpty) {
      return const _DetailPanel(
        title: 'PYQs',
        content: 'No PYQs added yet.',
        bullets: ['Admin panel se PYQs add hone ke baad yahan solve kar sakte ho.'],
      );
    }
    return SizedBox.expand(
      child: SurfaceCard(
        padding: const EdgeInsets.all(AppSpacing.md),
        child: ListView.builder(
          itemCount: widget.pyqs.length,
        itemBuilder: (context, index) {
          final q = widget.pyqs[index];
          final correct = (q['correct_option']?.toString() ?? 'A').toUpperCase();
          final opts = {
            'A': q['option_a']?.toString() ?? '',
            'B': q['option_b']?.toString() ?? '',
            'C': q['option_c']?.toString() ?? '',
            'D': q['option_d']?.toString() ?? '',
          };
          final selected = _selected[index];
          final revealed = _revealed.contains(index);
          return Padding(
            padding: const EdgeInsets.only(bottom: AppSpacing.lg),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Q${index + 1}. ${q['question'] ?? ''}',
                    style: Theme.of(context).textTheme.titleMedium),
                if ((q['question_image_link']?.toString() ?? '').isNotEmpty) ...[
                  const SizedBox(height: AppSpacing.sm),
                  _buildQuestionImage(q['question_image_link'].toString()),
                ],
                const SizedBox(height: AppSpacing.sm),
                ...opts.entries.map((e) {
                  final isSel = selected == e.key;
                  final isCorrect = revealed && e.key == correct;
                  final isWrong = revealed && isSel && e.key != correct;
                  return Padding(
                    padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                    child: InkWell(
                      onTap: () => setState(() => _selected[index] = e.key),
                      borderRadius: BorderRadius.circular(AppRadii.md),
                      child: Container(
                        padding: const EdgeInsets.all(AppSpacing.md),
                        decoration: BoxDecoration(
                          color: isCorrect
                              ? const Color(0xFFE7F8EF)
                              : isWrong
                                  ? const Color(0xFFFCEAEA)
                                  : isSel
                                      ? AppColors.indigoSoft
                                      : Theme.of(context).cardColor,
                          borderRadius: BorderRadius.circular(AppRadii.md),
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
                        child: Text('${e.key}) ${e.value}'),
                      ),
                    ),
                  );
                }),
                const SizedBox(height: AppSpacing.xs),
                Row(
                  children: [
                    Expanded(
                      child: PrimaryButton(
                        label: revealed ? 'Hide answer' : 'Check answer',
                        onPressed: () => setState(() {
                          if (revealed) {
                            _revealed.remove(index);
                          } else {
                            _revealed.add(index);
                          }
                        }),
                      ),
                    ),
                  ],
                ),
                if (revealed) ...[
                  const SizedBox(height: AppSpacing.sm),
                  Text(
                    'Explanation: ${q['explanation'] ?? ''}',
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ],
              ],
            ),
          );
        },
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
  static const _storage = FlutterSecureStorage();
  int _previewKey = 0;
  WebViewController? _webViewController;
  String? _loadedChapterId;

  @override
  void initState() {
    super.initState();
    _initController();
  }

  @override
  void didUpdateWidget(_PdfOrNotesPanel oldWidget) {
    super.didUpdateWidget(oldWidget);
    final newId = widget.chapter['id']?.toString() ?? '';
    if (newId != _loadedChapterId) _initController();
  }

  Future<void> _initController() async {
    final chapterId = widget.chapter['id']?.toString() ?? '';
    if (widget.chapter['has_pdf'] != true || chapterId.isEmpty) return;
    final token = await _storage.read(key: 'auth_token');
    if (token == null || !mounted) return;
    final url = '$baseUrl/content/chapter/$chapterId/pdf-view';
    final ctrl = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(Colors.white)
      ..setNavigationDelegate(NavigationDelegate(
        onNavigationRequest: (req) => req.url.startsWith(baseUrl)
            ? NavigationDecision.navigate
            : NavigationDecision.prevent,
      ))
      ..loadRequest(Uri.parse(url), headers: {'Authorization': 'Bearer $token'});
    if (!mounted) return;
    setState(() {
      _webViewController = ctrl;
      _loadedChapterId = chapterId;
    });
  }

  Future<void> _reload() async {
    final token = await _storage.read(key: 'auth_token');
    if (token == null || !mounted) return;
    final chapterId = widget.chapter['id']?.toString() ?? '';
    await _webViewController?.loadRequest(
      Uri.parse('$baseUrl/content/chapter/$chapterId/pdf-view'),
      headers: {'Authorization': 'Bearer $token'},
    );
    if (mounted) setState(() => _previewKey++);
  }

  @override
  Widget build(BuildContext context) {
    final hasPdf = widget.chapter['has_pdf'] == true;
    final isPdfType =
        (widget.chapter['material_type']?.toString() ?? '').toLowerCase().contains('pdf');
    final note = _normalizeExtractedText(widget.chapter['note_summary']?.toString() ?? '');

    // ── PDF type but file not yet uploaded ────────────────────────────────
    if (isPdfType && !hasPdf) {
      return SizedBox.expand(
        child: SurfaceCard(
          child: Center(
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.xl),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.picture_as_pdf_rounded, size: 52, color: AppColors.danger),
                  const SizedBox(height: AppSpacing.md),
                  Text('PDF not available',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
                  const SizedBox(height: AppSpacing.xs),
                  const Text('PDF has not been uploaded yet. Ask the admin to upload it.', textAlign: TextAlign.center),
                  if (note.trim().isNotEmpty) ...[
                    const SizedBox(height: AppSpacing.lg),
                    const Divider(),
                    const SizedBox(height: AppSpacing.sm),
                    _ScrollableNoteBox(note: note),
                  ],
                ],
              ),
            ),
          ),
        ),
      );
    }

    // ── PDF controller loading ─────────────────────────────────────────────
    if (hasPdf && _webViewController == null) {
      return const SizedBox.expand(child: Center(child: CircularProgressIndicator()));
    }

    // ── PDF viewer ready ───────────────────────────────────────────────────
    if (hasPdf && _webViewController != null) {
      return SizedBox.expand(
        child: SurfaceCard(
          padding: EdgeInsets.zero,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: AppSpacing.sm),
                child: Row(
                  children: [
                    const Icon(Icons.auto_stories_rounded, size: 18, color: AppColors.indigo),
                    const SizedBox(width: AppSpacing.xs),
                    const Expanded(child: Text('Chapter Reader', style: TextStyle(fontWeight: FontWeight.w700))),
                    IconButton(
                      icon: const Icon(Icons.refresh_rounded, size: 18),
                      tooltip: 'Reload PDF',
                      visualDensity: VisualDensity.compact,
                      onPressed: _reload,
                    ),
                  ],
                ),
              ),
              const Divider(height: 1),
              Expanded(
                flex: note.trim().isNotEmpty ? 8 : 10,
                child: ClipRect(
                  child: WebViewWidget(
                    key: ValueKey('pdf-$_previewKey'),
                    controller: _webViewController!,
                    gestureRecognizers: {
                      Factory<VerticalDragGestureRecognizer>(VerticalDragGestureRecognizer.new),
                    },
                  ),
                ),
              ),
              if (note.trim().isNotEmpty) ...[
                const Divider(height: 1),
                Expanded(
                  flex: 5,
                  child: Padding(
                    padding: const EdgeInsets.all(AppSpacing.xs),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(children: [
                          const Icon(Icons.menu_book_outlined, size: 16, color: AppColors.indigo),
                          const SizedBox(width: AppSpacing.xs),
                          Text('Notes', style: Theme.of(context).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700)),
                        ]),
                        const SizedBox(height: AppSpacing.xs),
                        Expanded(child: _ExpandableNoteBox(note: note)),
                      ],
                    ),
                  ),
                ),
              ],
            ],
          ),
        ),
      );
    }

    // ── Text / notes fallback ──────────────────────────────────────────────
    return SizedBox.expand(
      child: _DetailPanel(
        title: 'Notes',
        content: note.trim().isNotEmpty ? note : '',
        bullets: const ['Concept overview cards', 'Formula and memory anchors', 'High-yield mistakes to avoid'],
      ),
    );
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
                    color: highlight ? AppColors.indigoSoft : AppColors.surfaceMuted,
                    borderRadius: BorderRadius.circular(AppRadii.md),
                  ),
                  child: SelectableText(
                    formatted.isEmpty ? 'No content available yet.' : formatted,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(height: 1.45),
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
                    const Padding(
                      padding: EdgeInsets.only(top: 4),
                      child: Icon(Icons.check_circle_rounded,
                          size: 18, color: AppColors.indigo),
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

class _ExpandableNoteBox extends StatefulWidget {
  const _ExpandableNoteBox({required this.note});
  final String note;

  @override
  State<_ExpandableNoteBox> createState() => _ExpandableNoteBoxState();
}

class _ExpandableNoteBoxState extends State<_ExpandableNoteBox> {
  final _scrollController = ScrollController();

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: AppColors.surfaceMuted,
        borderRadius: BorderRadius.circular(AppRadii.md),
        border: Border.all(color: AppColors.border),
      ),
      child: Scrollbar(
        controller: _scrollController,
        thumbVisibility: true,
        child: SingleChildScrollView(
          controller: _scrollController,
          padding: const EdgeInsets.fromLTRB(
              AppSpacing.md, AppSpacing.md, AppSpacing.lg, AppSpacing.md),
          child: SelectableText(
            widget.note,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  height: 1.7,
                  fontSize: 14,
                  letterSpacing: 0.15,
                ),
          ),
        ),
      ),
    );
  }
}

class _ScrollableNoteBox extends StatefulWidget {
  const _ScrollableNoteBox({required this.note});
  final String note;

  @override
  State<_ScrollableNoteBox> createState() => _ScrollableNoteBoxState();
}

class _ScrollableNoteBoxState extends State<_ScrollableNoteBox> {
  final _scrollController = ScrollController();

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 300,
      width: double.infinity,
      decoration: BoxDecoration(
        color: AppColors.surfaceMuted,
        borderRadius: BorderRadius.circular(AppRadii.md),
        border: Border.all(color: AppColors.border),
      ),
      child: Scrollbar(
        controller: _scrollController,
        thumbVisibility: true,
        child: SingleChildScrollView(
          controller: _scrollController,
          padding: const EdgeInsets.fromLTRB(
              AppSpacing.md, AppSpacing.md, AppSpacing.lg, AppSpacing.md),
          child: SelectableText(
            widget.note,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  height: 1.6,
                  letterSpacing: 0.1,
                  fontSize: 13.5,
                ),
          ),
        ),
      ),
    );
  }
}