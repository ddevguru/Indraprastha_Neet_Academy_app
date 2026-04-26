import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';

import '../../core/providers/app_state.dart';
import '../content/data/content_repository.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

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

  @override
  Widget build(BuildContext context) {
    final uiState = ref.watch(appUiControllerProvider);
    return SingleChildScrollView(
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
                    else
                      ...books.map(
                        (book) => Padding(
                          padding: const EdgeInsets.only(bottom: AppSpacing.md),
                          child: SurfaceCard(
                            child: ListTile(
                              contentPadding: EdgeInsets.zero,
                              title: Text(book['title']?.toString() ?? ''),
                              subtitle: Text(
                                '${book['subject'] ?? ''} . ${book['topic'] ?? ''}',
                              ),
                              trailing: const Icon(
                                Icons.arrow_forward_ios_rounded,
                                size: 16,
                              ),
                              onTap: () async {
                                final bookId =
                                    int.tryParse(book['id']?.toString() ?? '');
                                if (bookId == null) return;
                                final chapters =
                                    await ContentRepository().fetchChapters(bookId);
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
                                final chapterId = int.tryParse(
                                  chapters.first['id']?.toString() ?? '',
                                );
                                if (chapterId == null) return;
                                if (!context.mounted) return;
                                Navigator.of(context).push(
                                  MaterialPageRoute(
                                    builder: (_) =>
                                        ChapterDetailScreen(chapterId: chapterId),
                                  ),
                                );
                              },
                            ),
                          ),
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
                            ...bookmarkedBooks.map(
                              (book) => Padding(
                                padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                                child: ListTile(
                                  contentPadding: EdgeInsets.zero,
                                  leading: const Icon(Icons.bookmark_rounded),
                                  title: Text(book['title']?.toString() ?? ''),
                                  subtitle: Text('${book['subject'] ?? ''} • ${book['topic'] ?? ''}'),
                                  trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16),
                                  onTap: () async {
                                    final bookId =
                                        int.tryParse(book['id']?.toString() ?? '');
                                    if (bookId == null) return;
                                    final chapters =
                                        await ContentRepository().fetchChapters(bookId);
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
                                    final chapterId = int.tryParse(
                                      chapters.first['id']?.toString() ?? '',
                                    );
                                    if (chapterId == null) return;
                                    if (!context.mounted) return;
                                    Navigator.of(context).push(
                                      MaterialPageRoute(
                                        builder: (_) =>
                                            ChapterDetailScreen(chapterId: chapterId),
                                      ),
                                    );
                                  },
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
            body: SingleChildScrollView(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: CenteredContent(
                maxWidth: 1100,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SurfaceCard(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            chapter['title']?.toString() ?? '',
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                          const SizedBox(height: AppSpacing.xs),
                          Text(chapter['overview']?.toString() ?? ''),
                          const SizedBox(height: AppSpacing.md),
                          Text('Linked PYQs: ${chapter['linked_pyq_count'] ?? pyqs.length}'),
                        ],
                      ),
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    if ((chapter['material_type']?.toString() ?? '') == 'pdf' &&
                        chapter['material_drive_link'] != null) ...[
                      SurfaceCard(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: const [
                                Icon(Icons.picture_as_pdf_rounded, color: AppColors.danger),
                                SizedBox(width: AppSpacing.md),
                                Expanded(
                                  child: Text(
                                    'Admin uploaded PDF material for this chapter.',
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: AppSpacing.md),
                            PrimaryButton(
                              label: 'Open PDF',
                              expanded: false,
                              onPressed: () async {
                                final uri = Uri.tryParse(
                                  chapter['material_drive_link'].toString(),
                                );
                                if (uri == null) return;
                                await launchUrl(
                                  uri,
                                  mode: LaunchMode.inAppBrowserView,
                                );
                              },
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: AppSpacing.lg),
                    ],
                    SizedBox(
                      height: 420,
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
    return SurfaceCard(
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
                  ClipRRect(
                    borderRadius: BorderRadius.circular(AppRadii.md),
                    child: Image.network(
                      q['question_image_link'].toString(),
                      fit: BoxFit.cover,
                      errorBuilder: (_, __, ___) => const SizedBox.shrink(),
                    ),
                  ),
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
    );
  }
}

class _PdfOrNotesPanel extends StatelessWidget {
  const _PdfOrNotesPanel({required this.chapter});

  final Map<String, dynamic> chapter;

  @override
  Widget build(BuildContext context) {
    final materialType = (chapter['material_type']?.toString() ?? '').toLowerCase();
    final driveLink = chapter['material_drive_link']?.toString() ?? '';
    final note = _normalizeExtractedText(chapter['note_summary']?.toString() ?? '');
    final previewUrl = _toDrivePreviewUrl(driveLink);

    if (materialType == 'pdf' && previewUrl != null) {
      return SurfaceCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Structured notes', style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: AppSpacing.sm),
            Expanded(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(AppRadii.md),
                child: WebViewWidget(
                  controller: WebViewController()
                    ..setJavaScriptMode(JavaScriptMode.unrestricted)
                    ..setBackgroundColor(Colors.transparent)
                    ..loadRequest(Uri.parse(previewUrl)),
                ),
              ),
            ),
            if (note.trim().isNotEmpty) ...[
              const SizedBox(height: AppSpacing.md),
              Text(
                'Extracted text',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: AppSpacing.xs),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(AppSpacing.md),
                decoration: BoxDecoration(
                  color: AppColors.surfaceMuted,
                  borderRadius: BorderRadius.circular(AppRadii.md),
                ),
                child: SelectableText(
                  note,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(height: 1.45),
                ),
              ),
            ],
          ],
        ),
      );
    }

    return _DetailPanel(
      title: 'Structured notes',
      content: note.trim().isNotEmpty
          ? note
          : (materialType == 'pdf'
              ? 'PDF uploaded, but extracted text is not available (scan/image PDF). Use Open PDF.'
              : ''),
      bullets: const [
        'Concept overview cards',
        'Formula and memory anchors',
        'High-yield mistakes to avoid',
      ],
    );
  }

  String? _toDrivePreviewUrl(String raw) {
    if (raw.trim().isEmpty) return null;
    final uri = Uri.tryParse(raw);
    if (uri == null) return null;

    // If we can extract Drive fileId, use /preview (best for embedded view).
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
    return SurfaceCard(
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
