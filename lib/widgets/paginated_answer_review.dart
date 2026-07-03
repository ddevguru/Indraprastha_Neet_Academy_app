import 'package:flutter/material.dart';

import '../theme/app_tokens.dart';
import 'app_widgets.dart';

String resolveDriveImageUrl(String raw) {
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

class _ReviewOptionStyle {
  const _ReviewOptionStyle({
    required this.background,
    required this.border,
    required this.text,
  });

  final Color background;
  final Color border;
  final Color text;

  static _ReviewOptionStyle neutral(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return _ReviewOptionStyle(
      background: Theme.of(context).cardColor,
      border: isDark ? const Color(0xFF343B49) : AppColors.border,
      text: Theme.of(context).colorScheme.onSurface,
    );
  }

  static _ReviewOptionStyle correct(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return _ReviewOptionStyle(
      background: isDark
          ? AppColors.success.withValues(alpha: 0.18)
          : const Color(0xFFE7F8EF),
      border: AppColors.success,
      text: isDark ? const Color(0xFF6EE7A0) : AppColors.textPrimary,
    );
  }

  static _ReviewOptionStyle wrong(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return _ReviewOptionStyle(
      background: isDark
          ? AppColors.danger.withValues(alpha: 0.18)
          : const Color(0xFFFCEAEA),
      border: AppColors.danger,
      text: isDark ? const Color(0xFFFF9B8F) : AppColors.textPrimary,
    );
  }
}

Widget buildReviewImage(String rawUrl) {
  return ClipRRect(
    borderRadius: BorderRadius.circular(AppRadii.md),
    child: Image.network(
      resolveDriveImageUrl(rawUrl),
      width: double.infinity,
      fit: BoxFit.contain,
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

String resolveExplanationImageUrl(Map<String, dynamic> imgData) {
  final direct = imgData['image_url']?.toString() ??
      imgData['image_drive_link']?.toString() ??
      '';
  if (direct.trim().isNotEmpty) return direct;
  final fileId = imgData['image_drive_file_id']?.toString() ?? '';
  if (fileId.isNotEmpty) {
    return 'https://drive.google.com/uc?export=view&id=$fileId';
  }
  return '';
}

/// One question entry for paginated answer review.
class AnswerReviewEntry {
  const AnswerReviewEntry({
    required this.questionText,
    required this.options,
    required this.correctIndex,
    this.selectedIndex,
    this.questionImageUrl,
    this.explanation,
    this.explanationImageUrl,
    this.explanationImagesList,
    this.subtitle,
    this.optionPrefix = true,
  });

  final String questionText;
  final String? questionImageUrl;
  final List<String> options;
  final int correctIndex;
  final int? selectedIndex;
  final String? explanation;
  final String? explanationImageUrl;
  final List<Map<String, dynamic>>? explanationImagesList;
  final String? subtitle;
  final bool optionPrefix;

  bool get isCorrect => selectedIndex != null && selectedIndex == correctIndex;
  bool get wasAttempted => selectedIndex != null;

  static AnswerReviewEntry fromAbcdMap({
    required Map<String, dynamic> question,
    required int index,
    String? selectedOption,
  }) {
    final correct = (question['correct_option']?.toString() ?? 'A').toUpperCase();
    final keys = ['A', 'B', 'C', 'D'];
    final options = keys
        .map((k) => question['option_${k.toLowerCase()}']?.toString() ?? '')
        .toList();
    final correctIndex = keys.indexOf(correct).clamp(0, 3);
    final selectedIndex = selectedOption == null
        ? null
        : keys.indexOf(selectedOption.toUpperCase()).clamp(0, 3);

    return AnswerReviewEntry(
      questionText: question['question']?.toString() ?? '',
      questionImageUrl: question['question_image_link']?.toString(),
      options: options,
      correctIndex: correctIndex,
      selectedIndex: selectedIndex == null && selectedOption == null ? null : selectedIndex,
      explanation: question['explanation']?.toString(),
      explanationImageUrl: question['explanation_image_link']?.toString(),
      explanationImagesList: question['explanation_images_list'] != null
          ? List<Map<String, dynamic>>.from(
              (question['explanation_images_list'] as List).map(
                (e) => Map<String, dynamic>.from(e as Map),
              ),
            )
          : null,
    );
  }
}

/// Full-screen review: one question per page with progress dots and stats.
class PaginatedAnswerReviewScreen extends StatefulWidget {
  const PaginatedAnswerReviewScreen({
    super.key,
    required this.title,
    required this.items,
    this.initialIndex = 0,
    this.score,
    this.totalMarks,
    this.accuracy,
  });

  final String title;
  final List<AnswerReviewEntry> items;
  final int initialIndex;
  final int? score;
  final int? totalMarks;
  final double? accuracy;

  @override
  State<PaginatedAnswerReviewScreen> createState() =>
      _PaginatedAnswerReviewScreenState();
}

class _PaginatedAnswerReviewScreenState extends State<PaginatedAnswerReviewScreen> {
  late int _index;
  late final PageController _pageController;

  @override
  void initState() {
    super.initState();
    _index = widget.initialIndex.clamp(0, widget.items.length - 1);
    _pageController = PageController(initialPage: _index);
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  int get _correctCount =>
      widget.items.where((e) => e.isCorrect).length;

  int get _wrongCount => widget.items
      .where((e) => e.wasAttempted && !e.isCorrect)
      .length;

  int get _skippedCount =>
      widget.items.where((e) => !e.wasAttempted).length;

  void _goTo(int next) {
    if (next < 0 || next >= widget.items.length) return;
    setState(() => _index = next);
    _pageController.animateToPage(
      next,
      duration: const Duration(milliseconds: 280),
      curve: Curves.easeInOut,
    );
  }

  @override
  Widget build(BuildContext context) {
    if (widget.items.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: Text(widget.title)),
        body: const Center(child: Text('No questions to review.')),
      );
    }

    final total = widget.items.length;
    final isLast = _index >= total - 1;

    return Scaffold(
      appBar: AppBar(title: Text(widget.title)),
      body: Column(
        children: [
          if (widget.score != null && widget.totalMarks != null)
            Padding(
              padding: const EdgeInsets.fromLTRB(
                AppSpacing.lg,
                AppSpacing.md,
                AppSpacing.lg,
                0,
              ),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.all(AppSpacing.md),
                decoration: BoxDecoration(
                  color: AppColors.indigoSoft,
                  borderRadius: BorderRadius.circular(AppRadii.md),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Your score',
                            style: Theme.of(context).textTheme.labelLarge,
                          ),
                          const SizedBox(height: 4),
                          Text(
                            '${widget.score} / ${widget.totalMarks}',
                            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                                  fontWeight: FontWeight.w800,
                                  color: AppColors.indigo,
                                ),
                          ),
                        ],
                      ),
                    ),
                    if (widget.accuracy != null)
                      Text(
                        '${widget.accuracy!.toStringAsFixed(1)}% accuracy',
                        style: Theme.of(context).textTheme.labelLarge,
                      ),
                  ],
                ),
              ),
            ),
          Padding(
            padding: const EdgeInsets.fromLTRB(
              AppSpacing.lg,
              AppSpacing.md,
              AppSpacing.lg,
              AppSpacing.sm,
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        'Question ${_index + 1} of $total',
                        style: Theme.of(context).textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.w700,
                            ),
                      ),
                    ),
                    _StatChip(
                      label: 'Correct',
                      value: '$_correctCount',
                      color: AppColors.success,
                      icon: Icons.check_circle_rounded,
                    ),
                    const SizedBox(width: AppSpacing.xs),
                    _StatChip(
                      label: 'Wrong',
                      value: '$_wrongCount',
                      color: AppColors.danger,
                      icon: Icons.cancel_rounded,
                    ),
                    if (_skippedCount > 0) ...[
                      const SizedBox(width: AppSpacing.xs),
                      _StatChip(
                        label: 'Skipped',
                        value: '$_skippedCount',
                        color: AppColors.textSecondary,
                        icon: Icons.remove_circle_outline_rounded,
                      ),
                    ],
                  ],
                ),
                const SizedBox(height: AppSpacing.md),
                _ReviewDots(
                  items: widget.items,
                  currentIndex: _index,
                  onDotTap: _goTo,
                ),
              ],
            ),
          ),
          const Divider(height: 1),
          Expanded(
            child: PageView.builder(
              controller: _pageController,
              onPageChanged: (i) => setState(() => _index = i),
              itemCount: total,
              itemBuilder: (context, i) => _ReviewQuestionPage(
                index: i,
                entry: widget.items[i],
              ),
            ),
          ),
          SafeArea(
            top: false,
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: Row(
                children: [
                  Expanded(
                    child: SecondaryButton(
                      label: 'Previous',
                      onPressed: _index == 0 ? null : () => _goTo(_index - 1),
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: PrimaryButton(
                      label: isLast ? 'Done' : 'Next',
                      icon: isLast
                          ? Icons.check_rounded
                          : Icons.arrow_forward_rounded,
                      onPressed: isLast
                          ? () => Navigator.of(context).pop()
                          : () => _goTo(_index + 1),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _StatChip extends StatelessWidget {
  const _StatChip({
    required this.label,
    required this.value,
    required this.color,
    required this.icon,
  });

  final String label;
  final String value;
  final Color color;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm,
        vertical: AppSpacing.xs,
      ),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(99),
        border: Border.all(color: color.withValues(alpha: 0.35)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: color),
          const SizedBox(width: 4),
          Text(
            value,
            style: TextStyle(
              fontWeight: FontWeight.w800,
              fontSize: 12,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}

class _ReviewDots extends StatelessWidget {
  const _ReviewDots({
    required this.items,
    required this.currentIndex,
    required this.onDotTap,
  });

  final List<AnswerReviewEntry> items;
  final int currentIndex;
  final void Function(int index) onDotTap;

  Color _dotColor(AnswerReviewEntry entry) {
    if (!entry.wasAttempted) return AppColors.textSecondary.withValues(alpha: 0.35);
    return entry.isCorrect ? AppColors.success : AppColors.danger;
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: List.generate(items.length, (i) {
          final entry = items[i];
          final isCurrent = i == currentIndex;
          final color = _dotColor(entry);
          return GestureDetector(
            onTap: () => onDotTap(i),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              width: isCurrent ? 12 : 8,
              height: isCurrent ? 12 : 8,
              margin: const EdgeInsets.symmetric(horizontal: 4),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: color,
                border: isCurrent
                    ? Border.all(color: AppColors.indigo, width: 2)
                    : null,
                boxShadow: isCurrent
                    ? [
                        BoxShadow(
                          color: AppColors.indigo.withValues(alpha: 0.35),
                          blurRadius: 4,
                        ),
                      ]
                    : null,
              ),
            ),
          );
        }),
      ),
    );
  }
}

class _ReviewQuestionPage extends StatelessWidget {
  const _ReviewQuestionPage({
    required this.index,
    required this.entry,
  });

  final int index;
  final AnswerReviewEntry entry;

  static const _optionLetters = ['A', 'B', 'C', 'D'];

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final hasExplanation = (entry.explanation?.isNotEmpty ?? false) ||
        (entry.explanationImageUrl?.isNotEmpty ?? false) ||
        (entry.explanationImagesList?.isNotEmpty ?? false);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppSpacing.lg),
      child: CenteredContent(
        maxWidth: 980,
        child: SurfaceCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.sm,
                      vertical: 2,
                    ),
                    decoration: BoxDecoration(
                      color: isDark
                          ? AppColors.primary.withValues(alpha: 0.2)
                          : AppColors.indigoSoft,
                      borderRadius: BorderRadius.circular(99),
                    ),
                    child: Text(
                      'Q${index + 1}',
                      style: const TextStyle(
                        color: AppColors.primary,
                        fontWeight: FontWeight.w700,
                        fontSize: 12,
                      ),
                    ),
                  ),
                  if (entry.subtitle != null && entry.subtitle!.isNotEmpty) ...[
                    const SizedBox(width: AppSpacing.sm),
                    Expanded(
                      child: Text(
                        entry.subtitle!,
                        style: Theme.of(context).textTheme.labelMedium,
                      ),
                    ),
                  ],
                  const Spacer(),
                  Icon(
                    !entry.wasAttempted
                        ? Icons.help_outline_rounded
                        : entry.isCorrect
                            ? Icons.check_circle_rounded
                            : Icons.cancel_rounded,
                    color: !entry.wasAttempted
                        ? AppColors.textSecondary
                        : entry.isCorrect
                            ? AppColors.success
                            : AppColors.danger,
                    size: 22,
                  ),
                ],
              ),
              const SizedBox(height: AppSpacing.md),
              Text(
                entry.questionText,
                style: Theme.of(context).textTheme.titleMedium,
              ),
              if (entry.questionImageUrl != null &&
                  entry.questionImageUrl!.isNotEmpty) ...[
                const SizedBox(height: AppSpacing.md),
                buildReviewImage(entry.questionImageUrl!),
              ],
              const SizedBox(height: AppSpacing.lg),
              ...List.generate(entry.options.length, (i) {
                final isCorrect = i == entry.correctIndex;
                final isSelected = entry.selectedIndex == i;
                final style = isCorrect
                    ? _ReviewOptionStyle.correct(context)
                    : isSelected && !isCorrect
                        ? _ReviewOptionStyle.wrong(context)
                        : _ReviewOptionStyle.neutral(context);
                final prefix = entry.optionPrefix && i < _optionLetters.length
                    ? '${_optionLetters[i]}) '
                    : '';
                return Padding(
                  padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(AppSpacing.md),
                    decoration: BoxDecoration(
                      color: style.background,
                      borderRadius: BorderRadius.circular(AppRadii.md),
                      border: Border.all(color: style.border),
                    ),
                    child: Text(
                      '$prefix${entry.options[i]}',
                      style: TextStyle(
                        color: style.text,
                        fontWeight: isCorrect || isSelected
                            ? FontWeight.w600
                            : FontWeight.w400,
                      ),
                    ),
                  ),
                );
              }),
              const SizedBox(height: AppSpacing.sm),
              Text(
                entry.selectedIndex == null
                    ? 'Your answer: Not attempted'
                    : 'Your answer: ${entry.optionPrefix && entry.selectedIndex! < _optionLetters.length ? _optionLetters[entry.selectedIndex!] : entry.options[entry.selectedIndex!]}  •  ${entry.isCorrect ? "Correct" : "Wrong"}',
                style: TextStyle(
                  fontWeight: FontWeight.w700,
                  color: entry.selectedIndex == null
                      ? AppColors.textSecondary
                      : (entry.isCorrect ? AppColors.success : AppColors.danger),
                ),
              ),
              if (hasExplanation) ...[
                const SizedBox(height: AppSpacing.lg),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(AppSpacing.md),
                  decoration: BoxDecoration(
                    color: Theme.of(context).brightness == Brightness.dark
                        ? const Color(0x1AF59E0B)
                        : const Color(0xFFFFFBEB),
                    borderRadius: BorderRadius.circular(AppRadii.md),
                    border: Border.all(
                      color: const Color(0xFFF59E0B).withValues(alpha: 0.5),
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Row(
                        children: [
                          Icon(Icons.lightbulb_rounded,
                              color: Color(0xFFF59E0B), size: 16),
                          SizedBox(width: 6),
                          Text(
                            'Explanation',
                            style: TextStyle(
                              fontWeight: FontWeight.w700,
                              color: Color(0xFFF59E0B),
                            ),
                          ),
                        ],
                      ),
                      if (entry.explanation != null &&
                          entry.explanation!.isNotEmpty) ...[
                        const SizedBox(height: 6),
                        Text(
                          entry.explanation!,
                          style: TextStyle(
                            color: isDark
                                ? Colors.white.withValues(alpha: 0.9)
                                : AppColors.textPrimary,
                          ),
                        ),
                      ],
                      if (entry.explanationImageUrl != null &&
                          entry.explanationImageUrl!.isNotEmpty) ...[
                        const SizedBox(height: 10),
                        buildReviewImage(entry.explanationImageUrl!),
                      ],
                      if (entry.explanationImagesList?.isNotEmpty ?? false)
                        ...entry.explanationImagesList!.map((imgData) {
                          final caption = imgData['caption']?.toString() ?? '';
                          final imageUrl = resolveExplanationImageUrl(imgData);
                          return Padding(
                            padding: const EdgeInsets.only(top: 10),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                if (caption.isNotEmpty) ...[
                                  Text(
                                    caption,
                                    style: const TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                  const SizedBox(height: 6),
                                ],
                                if (imageUrl.isNotEmpty)
                                  buildReviewImage(imageUrl),
                              ],
                            ),
                          );
                        }),
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
