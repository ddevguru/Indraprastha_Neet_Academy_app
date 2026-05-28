import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:share_plus/share_plus.dart';

import '../../core/providers/app_state.dart';
import '../content/data/content_repository.dart';
import '../../models/app_models.dart';
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
      errorBuilder: (ctx, err, st) => Container(
        height: 120,
        alignment: Alignment.center,
        color: AppColors.surfaceMuted,
        child: const Text('Image unavailable'),
      ),
    ),
  );
}

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

  void _onCategoryTap(BuildContext context, String label, List<Map<String, dynamic>> allSets) {
    if (label == 'Topic-wise MCQs') {
      Navigator.of(context).push(
        MaterialPageRoute(builder: (_) => TopicWiseMcqsScreen(allSets: allSets)),
      );
      return;
    }
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('$label — coming soon')),
    );
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
                                onTap: () => _onCategoryTap(context, category.$1, allSets),
                                borderRadius: BorderRadius.circular(AppRadii.lg),
                                child: SurfaceCard(
                                  child: Row(
                                    children: [
                                      CircleAvatar(
                                        backgroundColor: AppColors.indigoSoft,
                                        child: Icon(category.$2, color: AppColors.indigo),
                                      ),
                                      const SizedBox(width: AppSpacing.md),
                                      Expanded(child: Text(category.$1)),
                                      const Icon(Icons.arrow_forward_ios_rounded, size: 14),
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
                  children: sets
                      .map(
                        (set) => Padding(
                          padding: const EdgeInsets.only(bottom: AppSpacing.md),
                          child: _PracticeSetCard(
                            set: PracticeSet(
                              id: '${set['id']}',
                              title: set['title']?.toString() ?? 'Practice Set',
                              topic: set['topic']?.toString() ?? '',
                              questionCount: (set['question_count'] as num?)?.toInt() ?? 0,
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
    required this.setId,
  });

  final int setId;

  @override
  ConsumerState<PracticeAttemptScreen> createState() =>
      _PracticeAttemptScreenState();
}

class _PracticeAttemptScreenState extends ConsumerState<PracticeAttemptScreen> {
  int _currentIndex = 0;
  int? _selectedOption;
  bool _submitted = false;
  late final Future<Map<String, dynamic>> _attemptFuture;

  @override
  void initState() {
    super.initState();
    _attemptFuture = ContentRepository().fetchPracticeAttemptData(widget.setId);
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: _attemptFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(body: Center(child: CircularProgressIndicator()));
        }
        final set = Map<String, dynamic>.from(snapshot.data?['practiceSet'] as Map? ?? {});
        final questions = List<Map<String, dynamic>>.from(
          snapshot.data?['questions'] as List<dynamic>? ?? const [],
        );
        if (questions.isEmpty) {
          return Scaffold(
            appBar: AppBar(title: Text(set['title']?.toString() ?? 'Practice')),
            body: const Center(
              child: EmptyStateWidget(
                title: 'No questions found',
                subtitle: 'Is set ke liye abhi questions add nahi hue.',
                icon: Icons.help_outline_rounded,
              ),
            ),
          );
        }

        final question = questions[_currentIndex.clamp(0, questions.length - 1)];
        final options = [
          question['option_a']?.toString() ?? '',
          question['option_b']?.toString() ?? '',
          question['option_c']?.toString() ?? '',
          question['option_d']?.toString() ?? '',
        ];
        final correctOption = (question['correct_option']?.toString() ?? 'A').toUpperCase();
        final correctIndex = ['A', 'B', 'C', 'D'].indexOf(correctOption).clamp(0, 3);
        final uiState = ref.watch(appUiControllerProvider);
        final qId = question['id'].toString();
        final isBookmarked = uiState.bookmarkedQuestionIds.contains(qId);

        return Scaffold(
          appBar: AppBar(
            title: Text(set['title']?.toString() ?? 'Practice'),
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
                    .read(appUiControllerProvider.notifier)
                    .toggleQuestionBookmark(qId),
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
                    value: '${_currentIndex + 1}/${questions.length}',
                    subtitle: '${set['estimated_minutes'] ?? 20} min estimated',
                    icon: Icons.timelapse_rounded,
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          question['question']?.toString() ?? '',
                          style: Theme.of(context).textTheme.titleLarge,
                        ),
                        if ((question['question_image_link']?.toString() ?? '').isNotEmpty) ...[
                          const SizedBox(height: AppSpacing.md),
                          _buildQuestionImage(question['question_image_link'].toString()),
                        ],
                        const SizedBox(height: AppSpacing.lg),
                        ...List.generate(options.length, (index) {
                          final selected = _selectedOption == index;
                          final revealState = _submitted && (selected || index == correctIndex);
                          return Padding(
                            padding: const EdgeInsets.only(bottom: AppSpacing.md),
                            child: InkWell(
                              onTap: _submitted ? null : () => setState(() => _selectedOption = index),
                              borderRadius: BorderRadius.circular(AppRadii.md),
                              child: Container(
                                padding: const EdgeInsets.all(AppSpacing.md),
                                decoration: BoxDecoration(
                                  color: revealState
                                      ? (index == correctIndex
                                          ? const Color(0xFFE7F8EF)
                                          : const Color(0xFFFCEAEA))
                                      : selected
                                          ? AppColors.indigoSoft
                                          : Theme.of(context).cardColor,
                                  borderRadius: BorderRadius.circular(AppRadii.md),
                                  border: Border.all(
                                    color: revealState
                                        ? (index == correctIndex
                                            ? AppColors.success
                                            : AppColors.danger)
                                        : selected
                                            ? AppColors.indigo
                                            : AppColors.border,
                                  ),
                                ),
                                child: Text(
                                  options[index],
                                  style: TextStyle(
                                    color: revealState
                                        ? (index == correctIndex
                                            ? AppColors.success
                                            : AppColors.danger)
                                        : selected
                                            ? AppColors.primaryDark
                                            : Theme.of(context).colorScheme.onSurface,
                                    fontWeight: selected || revealState
                                        ? FontWeight.w600
                                        : FontWeight.w400,
                                  ),
                                ),
                              ),
                            ),
                          );
                        }),
                        const SizedBox(height: AppSpacing.sm),
                        PrimaryButton(
                          label: _submitted ? 'Next question' : 'Submit answer',
                          icon: Icons.arrow_forward_rounded,
                          expanded: true,
                          onPressed: () {
                            if (!_submitted) {
                              if (_selectedOption == null) return;
                              setState(() => _submitted = true);
                              return;
                            }
                            if (_currentIndex < questions.length - 1) {
                              setState(() {
                                _currentIndex++;
                                _selectedOption = null;
                                _submitted = false;
                              });
                            } else {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(content: Text('Practice set completed.')),
                              );
                            }
                          },
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
                          Row(
                            children: [
                              const Icon(Icons.lightbulb_rounded,
                                  color: Color(0xFFF59E0B), size: 22),
                              const SizedBox(width: AppSpacing.sm),
                              Text('Explanation',
                                  style: Theme.of(context).textTheme.titleLarge),
                            ],
                          ),
                          const SizedBox(height: AppSpacing.md),
                          Container(
                            width: double.infinity,
                            padding: const EdgeInsets.all(AppSpacing.md),
                            decoration: BoxDecoration(
                              color: Theme.of(context).brightness == Brightness.dark
                                  ? const Color(0x1AF59E0B)
                                  : const Color(0xFFFFFBEB),
                              borderRadius: BorderRadius.circular(AppRadii.md),
                              border: Border.all(color: const Color(0xFFF59E0B).withValues(alpha: 0.5)),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  question['explanation']?.toString().isNotEmpty == true
                                      ? question['explanation'].toString()
                                      : 'No explanation provided for this question.',
                                  style: Theme.of(context).textTheme.bodyLarge,
                                ),
                                if ((question['explanation_image_link']?.toString() ?? '').isNotEmpty) ...[
                                  const SizedBox(height: AppSpacing.md),
                                  _buildQuestionImage(question['explanation_image_link'].toString()),
                                ],
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        );
      },
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

// ── Topic-wise MCQs drill-down ────────────────────────────────────────────────

class TopicWiseMcqsScreen extends StatelessWidget {
  const TopicWiseMcqsScreen({super.key, required this.allSets});

  final List<Map<String, dynamic>> allSets;

  Map<String, List<Map<String, dynamic>>> _groupBySubject() {
    final map = <String, List<Map<String, dynamic>>>{};
    for (final set in allSets) {
      final subject = set['subject']?.toString().trim() ?? '';
      final standard = set['standard_label']?.toString().trim() ?? '';
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
                return _SubjectGroupCard(subject: subject, sets: sets);
              },
            ),
    );
  }
}

class _SubjectGroupCard extends StatelessWidget {
  const _SubjectGroupCard({required this.subject, required this.sets});

  final String subject;
  final List<Map<String, dynamic>> sets;

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
          builder: (_) => _SubjectTopicsScreen(subject: subject, sets: sets),
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
  const _SubjectTopicsScreen({required this.subject, required this.sets});

  final String subject;
  final List<Map<String, dynamic>> sets;

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
          return _PracticeSetCard(
            set: PracticeSet(
              id: '${set['id']}',
              title: set['title']?.toString() ?? 'Practice Set',
              topic: set['topic']?.toString() ?? '',
              questionCount: (set['question_count'] as num?)?.toInt() ?? 0,
              difficulty: set['difficulty']?.toString() ?? 'Moderate',
              estimatedMinutes: (set['estimated_minutes'] as num?)?.toInt() ?? 20,
              accuracy: 0,
              tag: set['standard_label']?.toString() ?? 'Topic',
            ),
          );
        },
      ),
    );
  }
}
