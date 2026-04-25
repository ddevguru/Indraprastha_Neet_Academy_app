import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/data/dummy_data.dart';
import '../../core/providers/app_state.dart';
import '../content/data/content_repository.dart';
import '../../models/app_models.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

class PracticeHomeScreen extends StatefulWidget {
  const PracticeHomeScreen({super.key});

  @override
  State<PracticeHomeScreen> createState() => _PracticeHomeScreenState();
}

class _PracticeHomeScreenState extends State<PracticeHomeScreen> {
  late final Future<List<Map<String, dynamic>>> _practiceFuture;

  @override
  void initState() {
    super.initState();
    _practiceFuture = ContentRepository().fetchPracticeSets();
  }

  @override
  Widget build(BuildContext context) {
    const categories = [
      ('Topic-wise MCQs', Icons.grid_view_rounded),
      ('PYQs', Icons.history_edu_rounded),
      ('Custom practice', Icons.tune_rounded),
      ('Incorrect questions', Icons.refresh_rounded),
      ('Bookmarked questions', Icons.bookmark_rounded),
    ];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppSpacing.lg),
      child: CenteredContent(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SectionHeader(
              title: 'Practice module',
              subtitle:
                  'Daily drills, PYQs, custom sets, incorrect question review, and question bookmarks.',
            ),
            const SizedBox(height: AppSpacing.lg),
            const SearchBarWidget(hint: 'Search topics, PYQ packs, and practice sets'),
            const SizedBox(height: AppSpacing.lg),
            Wrap(
              spacing: AppSpacing.md,
              runSpacing: AppSpacing.md,
              children: categories
                  .map(
                    (category) => SizedBox(
                      width: 220,
                      child: SurfaceCard(
                        child: Row(
                          children: [
                            CircleAvatar(
                              backgroundColor: AppColors.indigoSoft,
                              child: Icon(category.$2, color: AppColors.indigo),
                            ),
                            const SizedBox(width: AppSpacing.md),
                            Expanded(child: Text(category.$1)),
                          ],
                        ),
                      ),
                    ),
                  )
                  .toList(),
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
                  return const Center(child: CircularProgressIndicator());
                }
                if (sets.isEmpty) {
                  return const EmptyStateWidget(
                    title: 'No practice sets yet',
                    subtitle: 'Admin panel se practice sets add karne ke baad yahan dikhenge.',
                    icon: Icons.bolt_rounded,
                  );
                }
                return Column(
                  children: sets
                      .map(
                        (set) => Padding(
                          padding: const EdgeInsets.only(bottom: AppSpacing.md),
                          child: _PracticeSetCard(
                            set: PracticeSet(
                              id: '${set['id']}',
                              title: set['title']?.toString() ?? 'Practice Set',
                              topic: set['topic']?.toString() ?? '',
                              questionCount: 0,
                              difficulty: set['difficulty']?.toString() ?? 'Moderate',
                              estimatedMinutes: (set['estimated_minutes'] as num?)?.toInt() ?? 20,
                              accuracy: 0,
                              tag: 'Batch-wise',
                            ),
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

class PracticeAttemptScreen extends ConsumerStatefulWidget {
  const PracticeAttemptScreen({
    super.key,
    required this.set,
  });

  final PracticeSet set;

  @override
  ConsumerState<PracticeAttemptScreen> createState() =>
      _PracticeAttemptScreenState();
}

class _PracticeAttemptScreenState extends ConsumerState<PracticeAttemptScreen> {
  int _currentIndex = 0;
  int? _selectedOption;
  bool _submitted = false;

  PracticeQuestion get _question =>
      DummyData.practiceQuestions[_currentIndex % DummyData.practiceQuestions.length];

  @override
  Widget build(BuildContext context) {
    final question = _question;
    final uiState = ref.watch(appUiControllerProvider);
    final isBookmarked = uiState.bookmarkedQuestionIds.contains(question.id);

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.set.title),
        actions: [
          IconButton(
            onPressed: () => ref
                .read(appUiControllerProvider.notifier)
                .toggleQuestionBookmark(question.id),
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
              Row(
                children: [
                  Expanded(
                    child: StatCard(
                      title: 'Set progress',
                      value: '${_currentIndex + 1}/${DummyData.practiceQuestions.length}',
                      subtitle: '${widget.set.estimatedMinutes} min estimated',
                      icon: Icons.timelapse_rounded,
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  const Expanded(
                    child: StatCard(
                      title: 'Mode',
                      value: 'Practice',
                      subtitle: 'Frontend interactive attempt',
                      icon: Icons.edit_note_rounded,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppSpacing.lg),
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: AppSpacing.sm,
                            vertical: AppSpacing.xs,
                          ),
                          decoration: BoxDecoration(
                            color: AppColors.indigoSoft,
                            borderRadius: BorderRadius.circular(99),
                          ),
                          child: Text(
                            '${question.subject.label} . ${question.chapter}',
                            style: const TextStyle(
                              color: AppColors.indigo,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                        const Spacer(),
                        TextButton.icon(
                          onPressed: () {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Question marked for review.'),
                              ),
                            );
                          },
                          icon: const Icon(Icons.flag_outlined),
                          label: const Text('Mark for review'),
                        ),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    Text(
                      question.question,
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    ...List.generate(question.options.length, (index) {
                      final selected = _selectedOption == index;
                      final correct = index == question.correctIndex;
                      final revealState = _submitted &&
                          (selected || correct);

                      return Padding(
                        padding: const EdgeInsets.only(bottom: AppSpacing.md),
                        child: InkWell(
                          onTap: _submitted
                              ? null
                              : () => setState(() => _selectedOption = index),
                          borderRadius: BorderRadius.circular(AppRadii.md),
                          child: Container(
                            padding: const EdgeInsets.all(AppSpacing.md),
                            decoration: BoxDecoration(
                              color: revealState
                                  ? (correct
                                      ? const Color(0xFFE7F8EF)
                                      : const Color(0xFFFCEAEA))
                                  : selected
                                      ? AppColors.indigoSoft
                                      : Theme.of(context).cardColor,
                              borderRadius: BorderRadius.circular(AppRadii.md),
                              border: Border.all(
                                color: revealState
                                    ? (correct
                                        ? AppColors.success
                                        : AppColors.danger)
                                    : selected
                                        ? AppColors.indigo
                                        : AppColors.border,
                              ),
                            ),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                CircleAvatar(
                                  radius: 14,
                                  backgroundColor: Colors.white,
                                  child: Text(String.fromCharCode(65 + index)),
                                ),
                                const SizedBox(width: AppSpacing.md),
                                Expanded(child: Text(question.options[index])),
                              ],
                            ),
                          ),
                        ),
                      );
                    }),
                    const SizedBox(height: AppSpacing.sm),
                    Row(
                      children: [
                        Expanded(
                          child: SecondaryButton(
                            label: isBookmarked
                                ? 'Bookmarked'
                                : 'Bookmark question',
                            icon: isBookmarked
                                ? Icons.bookmark_rounded
                                : Icons.bookmark_border_rounded,
                            onPressed: () => ref
                                .read(appUiControllerProvider.notifier)
                                .toggleQuestionBookmark(question.id),
                          ),
                        ),
                        const SizedBox(width: AppSpacing.md),
                        Expanded(
                          child: PrimaryButton(
                            label: _submitted ? 'Next question' : 'Submit answer',
                            icon: Icons.arrow_forward_rounded,
                            onPressed: () {
                              if (!_submitted) {
                                if (_selectedOption == null) {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                      content: Text('Select an option first.'),
                                    ),
                                  );
                                  return;
                                }
                                setState(() => _submitted = true);
                                return;
                              }

                              if (_currentIndex <
                                  DummyData.practiceQuestions.length - 1) {
                                setState(() {
                                  _currentIndex++;
                                  _selectedOption = null;
                                  _submitted = false;
                                });
                              } else {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                    content: Text(
                                      'Practice set completed in demo mode.',
                                    ),
                                  ),
                                );
                              }
                            },
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              if (_submitted) ...[
                const SizedBox(height: AppSpacing.lg),
                SurfaceCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Explanation',
                          style: Theme.of(context).textTheme.titleLarge),
                      const SizedBox(height: AppSpacing.sm),
                      Text(question.explanation),
                    ],
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class _PracticeSetCard extends StatelessWidget {
  const _PracticeSetCard({required this.set});

  final PracticeSet set;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => context.push('/practice/attempt/${set.id}'),
      borderRadius: BorderRadius.circular(AppRadii.lg),
      child: SurfaceCard(
        child: Row(
          children: [
            Container(
              width: 56,
              height: 56,
              decoration: BoxDecoration(
                gradient: AppGradients.primary,
                borderRadius: BorderRadius.circular(18),
              ),
              child: const Icon(Icons.bolt_rounded, color: Colors.white),
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
            const SizedBox(width: AppSpacing.md),
            const Icon(Icons.arrow_forward_ios_rounded, size: 18),
          ],
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
