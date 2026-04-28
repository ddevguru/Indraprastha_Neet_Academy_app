import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:share_plus/share_plus.dart';

import '../../core/providers/app_state.dart';
import '../content/data/content_repository.dart';
import '../../models/app_models.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

String _decodeHtmlEntities(String input) {
  return input
      .replaceAll('&nbsp;', ' ')
      .replaceAll('&amp;', '&')
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&quot;', '"')
      .replaceAll('&#39;', "'")
      .replaceAll('&apos;', "'");
}

String _sanitizeRichText(dynamic rawValue) {
  if (rawValue == null) return '';
  final text = rawValue.toString().trim();
  if (text.isEmpty) return '';
  final withoutBreaks = text
      .replaceAll(RegExp(r'(?i)<br\s*/?>'), '\n')
      .replaceAll(RegExp(r'(?i)</p\s*>'), '\n')
      .replaceAll(RegExp(r'(?i)<p[^>]*>'), '');
  final withoutTags = withoutBreaks.replaceAll(RegExp(r'<[^>]*>'), '');
  final decoded = _decodeHtmlEntities(withoutTags);
  return decoded
      .replaceAll('\r\n', '\n')
      .replaceAll(RegExp(r'\n{3,}'), '\n\n')
      .trim();
}

List<String> _extractOptions(Map<String, dynamic> question) {
  final directOptions = [
    question['option_a'] ?? question['optionA'],
    question['option_b'] ?? question['optionB'],
    question['option_c'] ?? question['optionC'],
    question['option_d'] ?? question['optionD'],
  ].map(_sanitizeRichText).toList();

  if (directOptions.any((option) => option.isNotEmpty)) {
    return directOptions;
  }

  final dynamic fallback = question['options'];
  if (fallback is List) {
    final options = fallback.map(_sanitizeRichText).toList();
    while (options.length < 4) {
      options.add('');
    }
    return options.take(4).toList();
  }
  if (fallback is Map) {
    return [
      _sanitizeRichText(fallback['A'] ?? fallback['a'] ?? fallback['1']),
      _sanitizeRichText(fallback['B'] ?? fallback['b'] ?? fallback['2']),
      _sanitizeRichText(fallback['C'] ?? fallback['c'] ?? fallback['3']),
      _sanitizeRichText(fallback['D'] ?? fallback['d'] ?? fallback['4']),
    ];
  }
  return const ['', '', '', ''];
}

int _resolveCorrectIndex(Map<String, dynamic> question) {
  final raw = (question['correct_option'] ?? question['correctOption'] ?? 'A')
      .toString()
      .trim();
  if (raw.isEmpty) return 0;

  final asInt = int.tryParse(raw);
  if (asInt != null && asInt >= 1 && asInt <= 4) {
    return asInt - 1;
  }

  final normalized = raw.toUpperCase();
  final firstChar = normalized.isNotEmpty ? normalized[0] : 'A';
  final indexFromChar = ['A', 'B', 'C', 'D'].indexOf(firstChar);
  if (indexFromChar >= 0) return indexFromChar;

  if (normalized.contains('OPTION_A')) return 0;
  if (normalized.contains('OPTION_B')) return 1;
  if (normalized.contains('OPTION_C')) return 2;
  if (normalized.contains('OPTION_D')) return 3;
  return 0;
}

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
      errorBuilder: (_, __, ___) => Container(
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
            LayoutBuilder(
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
                          child: SurfaceCard(
                            child: Row(
                              children: [
                                CircleAvatar(
                                  backgroundColor: AppColors.indigoSoft,
                                  child:
                                      Icon(category.$2, color: AppColors.indigo),
                                ),
                                const SizedBox(width: AppSpacing.md),
                                Expanded(child: Text(category.$1)),
                              ],
                            ),
                          ),
                        ),
                      )
                      .toList(),
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
        final questionText = _sanitizeRichText(question['question']);
        final options = _extractOptions(question);
        final nonEmptyOptionIndexes = List<int>.generate(options.length, (i) => i)
            .where((i) => options[i].trim().isNotEmpty)
            .toList();
        final correctIndex = _resolveCorrectIndex(question).clamp(0, 3);
        final correctLabel = ['A', 'B', 'C', 'D'][correctIndex];
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
                    ..writeln(questionText)
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
                          questionText.isEmpty
                              ? 'Question text unavailable'
                              : questionText,
                          style: Theme.of(context).textTheme.titleLarge,
                        ),
                        if ((question['question_image_link']?.toString() ?? '').isNotEmpty) ...[
                          const SizedBox(height: AppSpacing.md),
                          _buildQuestionImage(question['question_image_link'].toString()),
                        ],
                        const SizedBox(height: AppSpacing.lg),
                        ...nonEmptyOptionIndexes.map((index) {
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
                                child: Text('${['A', 'B', 'C', 'D'][index]}) ${options[index]}'),
                              ),
                            ),
                          );
                        }),
                        if (nonEmptyOptionIndexes.isEmpty)
                          const Padding(
                            padding: EdgeInsets.only(bottom: AppSpacing.md),
                            child: Text('Options unavailable for this question.'),
                          ),
                        const SizedBox(height: AppSpacing.sm),
                        PrimaryButton(
                          label: _submitted ? 'Next question' : 'Submit answer',
                          icon: Icons.arrow_forward_rounded,
                          expanded: true,
                          onPressed: () {
                            if (!_submitted) {
                              if (_selectedOption == null || nonEmptyOptionIndexes.isEmpty) {
                                return;
                              }
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
                          Text('Explanation',
                              style: Theme.of(context).textTheme.titleLarge),
                          const SizedBox(height: AppSpacing.sm),
                          Text(
                            _sanitizeRichText(question['explanation']).isEmpty
                                ? 'No explanation available.'
                                : _sanitizeRichText(question['explanation']),
                          ),
                          const SizedBox(height: AppSpacing.xs),
                          Text(
                            'Correct answer: $correctLabel',
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                  fontWeight: FontWeight.w600,
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
