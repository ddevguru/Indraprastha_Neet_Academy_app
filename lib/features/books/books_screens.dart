import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../core/data/dummy_data.dart';
import '../../core/providers/app_state.dart';
import '../../core/providers/daily_mcqs_provider.dart';
import '../../models/daily_mcq_item.dart';
import '../../models/app_models.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

class BooksScreen extends ConsumerWidget {
  const BooksScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
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
            SurfaceCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Course',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: AppSpacing.xs),
                  const Text('Neet Dropper Batch'),
                  const SizedBox(height: AppSpacing.sm),
                  const Text(
                    'Batches: Target Neet 2028 (Class 11), Target Neet 2027 (Class 12), Target Neet 2027 (Dropper)',
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.lg),
            Wrap(
              spacing: AppSpacing.sm,
              runSpacing: AppSpacing.sm,
              children: const [
                _CategoryChip('NCERT books'),
                _CategoryChip('Handwritten notes'),
                _CategoryChip('Short notes'),
                _CategoryChip('Formula sheets'),
                _CategoryChip('Biology diagrams'),
                _CategoryChip('Saved bookmarks'),
              ],
            ),
            const SizedBox(height: AppSpacing.xl),
            LayoutBuilder(
              builder: (context, constraints) {
                final crossAxisCount = constraints.maxWidth > 1000
                    ? 3
                    : constraints.maxWidth > 620
                        ? 2
                        : 1;
                return GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: DummyData.books.length,
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: crossAxisCount,
                    crossAxisSpacing: AppSpacing.md,
                    mainAxisSpacing: AppSpacing.md,
                    childAspectRatio: 1.22,
                  ),
                  itemBuilder: (context, index) {
                    final book = DummyData.books[index];
                    return BookCard(
                      book: book,
                      isBookmarked: uiState.bookmarkedBookIds.contains(book.id),
                      onBookmark: () => ref
                          .read(appUiControllerProvider.notifier)
                          .toggleBookBookmark(book.id),
                      onTap: () =>
                          context.push('/books/chapter/${book.chapters.first.id}'),
                    );
                  },
                );
              },
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
                  if (uiState.bookmarkedBookIds.isEmpty)
                    const EmptyStateWidget(
                      title: 'No bookmarks yet',
                      subtitle:
                          'Save books and chapters from your reading flow to build a faster revision stack.',
                      icon: Icons.bookmark_border_rounded,
                    )
                  else
                    ...DummyData.books
                        .where(
                          (book) => uiState.bookmarkedBookIds.contains(book.id),
                        )
                        .map(
                          (book) => ListTile(
                            contentPadding: EdgeInsets.zero,
                            title: Text(book.title),
                            subtitle: Text('${book.subject.label} . ${book.lastOpened}'),
                            trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16),
                            onTap: () =>
                                context.push('/books/chapter/${book.chapters.first.id}'),
                          ),
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

class ChapterDetailScreen extends ConsumerWidget {
  const ChapterDetailScreen({
    super.key,
    required this.chapter,
  });

  final BookChapter chapter;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isSaved = ref.watch(appUiControllerProvider).savedChapterIds.contains(
          chapter.id,
        );
    final movedMcqs =
        ref.watch(dailyMcqsProvider).archivedForChapter(chapter.id);

    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: Text(chapter.title),
          actions: [
            IconButton(
              onPressed: () {
                ref
                    .read(appUiControllerProvider.notifier)
                    .toggleSavedChapter(chapter.id);
              },
              icon: Icon(
                isSaved ? Icons.bookmark_rounded : Icons.bookmark_border_rounded,
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
                      Row(
                        children: [
                          const CircleAvatar(
                            backgroundColor: AppColors.indigoSoft,
                            child: Icon(Icons.auto_stories_rounded, color: AppColors.indigo),
                          ),
                          const SizedBox(width: AppSpacing.md),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  chapter.title,
                                  style: Theme.of(context).textTheme.titleLarge,
                                ),
                                const SizedBox(height: AppSpacing.xs),
                                Text(chapter.overview),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: AppSpacing.lg),
                      Row(
                        children: [
                          Expanded(
                            child: StatCard(
                              title: 'Linked PYQs',
                              value: '${chapter.linkedPyqCount}',
                              subtitle: 'Exam-linked questions',
                              icon: Icons.route_rounded,
                            ),
                          ),
                          const SizedBox(width: AppSpacing.md),
                          const Expanded(
                            child: StatCard(
                              title: 'Revision status',
                              value: '2 passes',
                              subtitle: 'Last revised 3 days ago',
                              icon: Icons.refresh_rounded,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                if (movedMcqs.isNotEmpty) ...[
                  const SizedBox(height: AppSpacing.lg),
                  SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SectionHeader(
                          title: 'From daily MCQs (now in this chapter)',
                          subtitle:
                              "After 24 hours these leave Today's MCQs and stay linked here for PYQ-style review.",
                        ),
                        const SizedBox(height: AppSpacing.md),
                        ...movedMcqs.map(
                          (q) => Padding(
                            padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Icon(
                                  q.subject.icon,
                                  size: 20,
                                  color: AppColors.indigo,
                                ),
                                const SizedBox(width: AppSpacing.sm),
                                Expanded(
                                  child: Text(
                                    q.preview,
                                    style:
                                        Theme.of(context).textTheme.bodyMedium,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
                const SizedBox(height: AppSpacing.lg),
                if (chapter.materialType == 'pdf' &&
                    chapter.materialDriveLink != null) ...[
                  SurfaceCard(
                    child: Row(
                      children: [
                        const Icon(Icons.picture_as_pdf_rounded,
                            color: AppColors.danger),
                        const SizedBox(width: AppSpacing.md),
                        const Expanded(
                          child: Text(
                            'Admin uploaded PDF material for this chapter.',
                          ),
                        ),
                        PrimaryButton(
                          label: 'Open PDF',
                          onPressed: () async {
                            final uri = Uri.tryParse(chapter.materialDriveLink!);
                            if (uri == null) return;
                            await launchUrl(
                              uri,
                              mode: LaunchMode.externalApplication,
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
                      _DetailPanel(
                        title: 'Structured notes',
                        content: chapter.noteSummary,
                        bullets: const [
                          'Concept overview cards',
                          'Formula and memory anchors',
                          'High-yield mistakes to avoid',
                        ],
                      ),
                      _DetailPanel(
                        title: 'PYQ links',
                        content: chapter.pyqSummary,
                        bullets: const [
                          'Last 10-year NEET-style patterns',
                          'Topic-weight hints',
                          'Mark questions for revision',
                        ],
                      ),
                      _DetailPanel(
                        title: 'Important lines',
                        content: chapter.highlight,
                        bullets: const [
                          'Highlighted lines for revision',
                          'One-tap bookmark mock UI',
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
  }
}

class _CategoryChip extends StatelessWidget {
  const _CategoryChip(this.label);

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
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: AppSpacing.sm),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(AppSpacing.lg),
            decoration: BoxDecoration(
              color: highlight ? AppColors.indigoSoft : AppColors.surfaceMuted,
              borderRadius: BorderRadius.circular(AppRadii.md),
            ),
            child: Text(content),
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
}
