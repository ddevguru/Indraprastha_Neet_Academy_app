import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../core/providers/app_state.dart';
import '../features/content/data/content_repository.dart';
import '../theme/app_tokens.dart';
import 'app_widgets.dart';

/// Shows AI similar questions dialog allowing user to choose 1 to 10 questions to generate.
Future<void> showSimilarQuestionsDialog(
  BuildContext context,
  WidgetRef? ref, {
  required String questionText,
  int? sourceQuestionId,
  String? sourceType,
  int? testId,
  String? subject,
  String? topic,
  List<String>? options,
  String? explanation,
  String? userAnswer,
}) async {
  await showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (ctx) => _SimilarQuestionsConfigSheet(
      sourceQuestionId: sourceQuestionId,
      sourceType: sourceType,
      testId: testId,
      questionText: questionText,
      subject: subject,
      topic: topic,
      options: options,
      explanation: explanation,
      userAnswer: userAnswer,
      parentRef: ref,
    ),
  );
}

class _SimilarQuestionsConfigSheet extends StatefulWidget {
  const _SimilarQuestionsConfigSheet({
    this.sourceQuestionId,
    this.sourceType,
    this.testId,
    required this.questionText,
    this.subject,
    this.topic,
    this.options,
    this.explanation,
    this.userAnswer,
    this.parentRef,
  });

  final int? sourceQuestionId;
  final String? sourceType;
  final int? testId;
  final String questionText;
  final String? subject;
  final String? topic;
  final List<String>? options;
  final String? explanation;
  final String? userAnswer;
  final WidgetRef? parentRef;

  @override
  State<_SimilarQuestionsConfigSheet> createState() =>
      __SimilarQuestionsConfigSheetState();
}

class __SimilarQuestionsConfigSheetState
    extends State<_SimilarQuestionsConfigSheet> {
  int _selectedCount = 5; // Default 5 questions as per requirement
  bool _generating = false;
  String? _error;

  Future<void> _startGeneration() async {
    if (_generating) return; // Prevent duplicate submissions

    setState(() {
      _generating = true;
      _error = null;
    });

    try {
      final SharedPreferences prefs;
      if (widget.parentRef != null) {
        prefs = widget.parentRef!.read(sharedPreferencesProvider);
      } else {
        prefs = await SharedPreferences.getInstance();
      }
      final repo = ContentRepository(prefs: prefs);

      final data = await repo.fetchSimilarQuestionsData(
        sourceQuestionId: widget.sourceQuestionId,
        sourceType: widget.sourceType,
        testId: widget.testId,
        questionText: widget.questionText,
        subject: widget.subject,
        topic: widget.topic,
        options: widget.options,
        explanation: widget.explanation,
        userAnswer: widget.userAnswer,
        count: _selectedCount,
      );

      final generated =
          List<Map<String, dynamic>>.from(data['questions'] ?? const []);

      if (!mounted) return;
      Navigator.pop(context); // Close bottom sheet

      if (generated.isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text(
              'No practice questions generated. Please check server configuration or try again.',
            ),
          ),
        );
        return;
      }

      // Navigate to interactive practice screen
      final resolvedTitle = (data['concept']?.toString().isNotEmpty == true)
          ? data['concept'].toString()
          : (data['topic']?.toString().isNotEmpty == true
              ? data['topic'].toString()
              : (widget.topic ?? widget.subject ?? 'Similar Practice'));

      await Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => AISimilarQuestionsQuizScreen(
            title: resolvedTitle,
            batchId: data['batch_id'] as int?,
            subject: data['subject']?.toString() ?? widget.subject ?? '',
            chapter: data['chapter']?.toString() ?? data['topic']?.toString() ?? widget.topic ?? '',
            concept: data['concept']?.toString() ?? '',
            questions: generated,
          ),
        ),
      );
    } catch (e) {
      if (mounted) {
        setState(() {
          _generating = false;
          _error = e.toString().replaceAll('Exception: ', '');
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      padding: EdgeInsets.only(
        left: AppSpacing.lg,
        right: AppSpacing.lg,
        top: AppSpacing.lg,
        bottom: MediaQuery.of(context).viewInsets.bottom + AppSpacing.xl,
      ),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1E293B) : Colors.white,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(AppRadii.xl)),
        boxShadow: AppShadows.soft,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.only(bottom: AppSpacing.md),
              decoration: BoxDecoration(
                color: isDark ? Colors.white24 : Colors.grey.shade300,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  gradient: AppGradients.primary,
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.auto_awesome_rounded, color: Colors.white, size: 22),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Solve Similar Questions',
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      'AI-Powered Personalized Practice',
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: AppColors.primary,
                        fontWeight: FontWeight.w600,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.md),

          // Context badges
          if ((widget.topic?.trim().isNotEmpty ?? false) ||
              (widget.subject?.trim().isNotEmpty ?? false)) ...[
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF0F172A) : const Color(0xFFF1F5F9),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(
                  color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
                ),
              ),
              child: Row(
                children: [
                  const Icon(Icons.menu_book_rounded, size: 14, color: AppColors.primary),
                  const SizedBox(width: 6),
                  Expanded(
                    child: Text(
                      [widget.subject?.trim(), widget.topic?.trim()]
                          .where((s) => s != null && s.isNotEmpty)
                          .join(' • '),
                      style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.md),
          ],

          if (_error != null) ...[
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.red.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(AppRadii.md),
                border: Border.all(color: Colors.red.withValues(alpha: 0.4)),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Icon(Icons.error_outline_rounded, color: Colors.red, size: 18),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      _error!,
                      style: const TextStyle(color: Colors.red, fontSize: 13),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.md),
          ],

          Text(
            'Select number of similar questions to practice:',
            style: theme.textTheme.titleSmall?.copyWith(
              fontWeight: FontWeight.w600,
              fontSize: 13,
            ),
          ),
          const SizedBox(height: AppSpacing.sm),

          // 1 to 10 question count chips
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: List.generate(10, (idx) {
              final count = idx + 1;
              final isSel = _selectedCount == count;
              return ChoiceChip(
                label: Text(
                  '$count',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                    color: isSel ? Colors.white : (isDark ? Colors.white70 : const Color(0xFF334155)),
                  ),
                ),
                selected: isSel,
                selectedColor: AppColors.primary,
                backgroundColor: isDark ? const Color(0xFF334155) : const Color(0xFFF1F5F9),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                  side: BorderSide(
                    color: isSel ? AppColors.primary : Colors.transparent,
                  ),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                onSelected: _generating
                    ? null
                    : (val) {
                        if (val) setState(() => _selectedCount = count);
                      },
              );
            }),
          ),
          const SizedBox(height: AppSpacing.lg),

          if (_generating) ...[
            Center(
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 16),
                child: Column(
                  children: [
                    const CircularProgressIndicator(color: AppColors.primary),
                    const SizedBox(height: AppSpacing.md),
                    Text(
                      'AI is crafting $_selectedCount personalized questions for this concept...',
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      'Strictly locked to chapter & difficulty',
                      style: TextStyle(fontSize: 11, color: AppColors.textSecondary),
                    ),
                  ],
                ),
              ),
            ),
          ] else ...[
            PrimaryButton(
              label: 'Generate Practice Questions ($_selectedCount)',
              icon: Icons.auto_awesome_rounded,
              expanded: true,
              onPressed: _startGeneration,
            ),
          ],
        ],
      ),
    );
  }
}

/// Interactive practice quiz screen for generated similar MCQs
class AISimilarQuestionsQuizScreen extends ConsumerStatefulWidget {
  const AISimilarQuestionsQuizScreen({
    super.key,
    required this.title,
    required this.questions,
    this.batchId,
    this.subject,
    this.chapter,
    this.concept,
  });

  final String title;
  final List<Map<String, dynamic>> questions;
  final int? batchId;
  final String? subject;
  final String? chapter;
  final String? concept;

  @override
  ConsumerState<AISimilarQuestionsQuizScreen> createState() =>
      _AISimilarQuestionsQuizScreenState();
}

class _AISimilarQuestionsQuizScreenState
    extends ConsumerState<AISimilarQuestionsQuizScreen> {
  int _currentIndex = 0;
  final Map<int, String> _selectedAnswers = {};
  int _correctCount = 0;
  bool _finished = false;
  bool _reviewingAll = false;

  void _selectOption(int qIndex, String optionKey, String correctOption) {
    if (_selectedAnswers.containsKey(qIndex)) return; // Already answered
    setState(() {
      _selectedAnswers[qIndex] = optionKey;
      if (optionKey.toUpperCase() == correctOption.toUpperCase()) {
        _correctCount++;
      }
    });

    // If batchId exists and user has answered all, submit answers in background
    if (_selectedAnswers.length == widget.questions.length && widget.batchId != null) {
      _submitBatchResults();
    }
  }

  Future<void> _submitBatchResults() async {
    try {
      final prefs = ref.read(sharedPreferencesProvider);
      final repo = ContentRepository(prefs: prefs);
      final answerMap = <String, String>{};
      _selectedAnswers.forEach((idx, ans) {
        final q = widget.questions[idx];
        final idKey = q['db_id']?.toString() ?? '$idx';
        answerMap[idKey] = ans;
      });
      await repo.submitSimilarQuestionsBatchAnswers(
        batchId: widget.batchId!,
        answers: answerMap,
      );
    } catch (e) {
      // Background save error non-fatal to quiz UI
      debugPrint('[BATCH_SUBMIT_WARNING]: $e');
    }
  }

  void _nextQuestion() {
    if (_currentIndex < widget.questions.length - 1) {
      setState(() => _currentIndex++);
    } else {
      setState(() {
        _finished = true;
        _reviewingAll = false;
      });
      if (widget.batchId != null) {
        _submitBatchResults();
      }
    }
  }

  void _previousQuestion() {
    if (_currentIndex > 0) {
      setState(() => _currentIndex--);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final total = widget.questions.length;

    if (_finished && !_reviewingAll) {
      final accuracy = total > 0 ? (_correctCount / total * 100).round() : 0;
      final wrongCount = total - _correctCount;

      return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
          automaticallyImplyLeading: false,
        ),
        body: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(AppSpacing.xl),
            child: CenteredContent(
              maxWidth: 600,
              child: Container(
                padding: const EdgeInsets.all(AppSpacing.xl),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF1E293B) : Colors.white,
                  borderRadius: BorderRadius.circular(AppRadii.xl),
                  border: Border.all(color: AppColors.primary.withValues(alpha: 0.3)),
                  boxShadow: AppShadows.soft,
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: accuracy >= 70
                            ? AppColors.success.withValues(alpha: 0.15)
                            : const Color(0xFFF59E0B).withValues(alpha: 0.15),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        accuracy >= 70
                            ? Icons.emoji_events_rounded
                            : Icons.auto_awesome_rounded,
                        color: accuracy >= 70 ? AppColors.success : const Color(0xFFF59E0B),
                        size: 56,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    Text(
                      'Personalized Practice Completed!',
                      textAlign: TextAlign.center,
                      style: theme.textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      'Score: $_correctCount / $total ($accuracy%)',
                      style: const TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: AppColors.primary,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),

                    // Metrics row
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _buildMetricPill(
                          label: 'Correct',
                          value: '$_correctCount',
                          color: AppColors.success,
                          icon: Icons.check_circle_outline,
                        ),
                        const SizedBox(width: 12),
                        _buildMetricPill(
                          label: 'Incorrect',
                          value: '$wrongCount',
                          color: AppColors.danger,
                          icon: Icons.highlight_off,
                        ),
                        const SizedBox(width: 12),
                        _buildMetricPill(
                          label: 'Accuracy',
                          value: '$accuracy%',
                          color: AppColors.primary,
                          icon: Icons.percent,
                        ),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.lg),

                    Text(
                      accuracy >= 80
                          ? '🎉 Mastery Achieved! You have successfully mastered this core concept.'
                          : '💡 Keep Practicing! Review the step-by-step explanations below to fix remaining gaps.',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 14,
                        color: isDark ? Colors.white70 : AppColors.textSecondary,
                        height: 1.4,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.xl),

                    // Action buttons
                    Row(
                      children: [
                        Expanded(
                          child: OutlinedButton.icon(
                            icon: const Icon(Icons.visibility_outlined, size: 18),
                            label: const Text('Review Answers'),
                            style: OutlinedButton.styleFrom(
                              padding: const EdgeInsets.symmetric(vertical: 13),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(AppRadii.md),
                              ),
                            ),
                            onPressed: () {
                              setState(() {
                                _reviewingAll = true;
                                _currentIndex = 0;
                              });
                            },
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: PrimaryButton(
                            label: 'Finish',
                            icon: Icons.check_circle_rounded,
                            onPressed: () => Navigator.pop(context),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      );
    }

    final currentQ = widget.questions[_currentIndex];
    final qText = currentQ['question_text']?.toString() ??
        currentQ['question']?.toString() ??
        '';
    final optA = currentQ['option_a']?.toString() ?? '';
    final optB = currentQ['option_b']?.toString() ?? '';
    final optC = currentQ['option_c']?.toString() ?? '';
    final optD = currentQ['option_d']?.toString() ?? '';
    final correctOpt = (currentQ['correct_option'] ??
            currentQ['correct_answer'] ??
            'A')
        .toString()
        .toUpperCase();
    final explanation = currentQ['explanation']?.toString() ?? '';

    final options = {'A': optA, 'B': optB, 'C': optC, 'D': optD};
    final userAns = _selectedAnswers[_currentIndex];
    final isAnswered = userAns != null;

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16),
            child: Center(
              child: Text(
                '${_currentIndex + 1} / $total',
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
              ),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: CenteredContent(
          maxWidth: 800,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Progress Bar
              ClipRRect(
                borderRadius: BorderRadius.circular(99),
                child: LinearProgressIndicator(
                  value: (_currentIndex + 1) / total,
                  minHeight: 6,
                  backgroundColor: isDark ? const Color(0xFF334155) : AppColors.border,
                  valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primary),
                ),
              ),
              const SizedBox(height: AppSpacing.lg),

              // Question Card
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppColors.primary.withValues(alpha: 0.15),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            'Question ${_currentIndex + 1} of $total',
                            style: const TextStyle(
                              color: AppColors.primary,
                              fontWeight: FontWeight.bold,
                              fontSize: 12,
                            ),
                          ),
                        ),
                        if (widget.concept != null && widget.concept!.isNotEmpty) ...[
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              widget.concept!,
                              style: const TextStyle(
                                fontSize: 11,
                                color: AppColors.textSecondary,
                                fontStyle: FontStyle.italic,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ],
                      ],
                    ),
                    const SizedBox(height: AppSpacing.md),
                    Text(
                      qText,
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        height: 1.4,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.lg),

                    // Option Buttons
                    ...options.entries.map((entry) {
                      final key = entry.key;
                      final text = entry.value;
                      if (text.isEmpty) return const SizedBox.shrink();

                      final isSelected = userAns == key;
                      final isCorrect = key == correctOpt;

                      Color bg = theme.cardColor;
                      Color border = isDark ? const Color(0xFF343B49) : AppColors.border;
                      Color textColor = theme.colorScheme.onSurface;

                      if (isAnswered) {
                        if (isCorrect) {
                          bg = isDark
                              ? AppColors.success.withValues(alpha: 0.2)
                              : const Color(0xFFE7F8EF);
                          border = AppColors.success;
                          textColor = AppColors.success;
                        } else if (isSelected) {
                          bg = isDark
                              ? AppColors.danger.withValues(alpha: 0.2)
                              : const Color(0xFFFCEAEA);
                          border = AppColors.danger;
                          textColor = AppColors.danger;
                        }
                      }

                      return Padding(
                        padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                        child: InkWell(
                          onTap: isAnswered
                              ? null
                              : () => _selectOption(_currentIndex, key, correctOpt),
                          borderRadius: BorderRadius.circular(AppRadii.md),
                          child: Container(
                            padding: const EdgeInsets.all(AppSpacing.md),
                            decoration: BoxDecoration(
                              color: bg,
                              borderRadius: BorderRadius.circular(AppRadii.md),
                              border: Border.all(
                                color: border,
                                width: isSelected || (isAnswered && isCorrect) ? 2 : 1,
                              ),
                            ),
                            child: Row(
                              children: [
                                Text(
                                  '$key)',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: textColor,
                                  ),
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Text(
                                    text,
                                    style: TextStyle(
                                      color: textColor,
                                      fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                                    ),
                                  ),
                                ),
                                if (isAnswered && isCorrect)
                                  const Icon(Icons.check_circle_rounded,
                                      color: AppColors.success, size: 20),
                                if (isAnswered && isSelected && !isCorrect)
                                  const Icon(Icons.cancel_rounded,
                                      color: AppColors.danger, size: 20),
                              ],
                            ),
                          ),
                        ),
                      );
                    }),
                  ],
                ),
              ),

              const SizedBox(height: AppSpacing.lg),

              // Step-by-step scientific explanation
              if (isAnswered && explanation.isNotEmpty) ...[
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(AppSpacing.md),
                  decoration: BoxDecoration(
                    color: isDark ? const Color(0x1AF59E0B) : const Color(0xFFFFFBEB),
                    borderRadius: BorderRadius.circular(AppRadii.md),
                    border: Border.all(color: const Color(0xFFF59E0B).withValues(alpha: 0.5)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Row(
                        children: [
                          Icon(Icons.lightbulb_rounded, color: Color(0xFFF59E0B), size: 18),
                          SizedBox(width: 8),
                          Text(
                            'Step-by-Step Solution & Concept Explanation',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Color(0xFFF59E0B),
                              fontSize: 13,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        explanation,
                        style: TextStyle(
                          fontSize: 14,
                          height: 1.45,
                          color: isDark ? Colors.white.withValues(alpha: 0.9) : AppColors.textPrimary,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: AppSpacing.lg),
              ],

              // Navigation row
              Row(
                children: [
                  if (_currentIndex > 0) ...[
                    OutlinedButton.icon(
                      onPressed: _previousQuestion,
                      icon: const Icon(Icons.arrow_back_rounded, size: 16),
                      label: const Text('Previous'),
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(AppRadii.md),
                        ),
                      ),
                    ),
                    const SizedBox(width: AppSpacing.md),
                  ],
                  if (isAnswered)
                    Expanded(
                      child: PrimaryButton(
                        label: _currentIndex < total - 1
                            ? 'Next Question'
                            : (_reviewingAll ? 'Return to Summary' : 'Finish Practice'),
                        icon: _currentIndex < total - 1
                            ? Icons.arrow_forward_rounded
                            : Icons.check_circle_rounded,
                        onPressed: _nextQuestion,
                      ),
                    ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMetricPill({
    required String label,
    required String value,
    required Color color,
    required IconData icon,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Column(
        children: [
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icon, color: color, size: 14),
              const SizedBox(width: 4),
              Text(
                value,
                style: TextStyle(fontWeight: FontWeight.bold, color: color, fontSize: 16),
              ),
            ],
          ),
          const SizedBox(height: 2),
          Text(
            label,
            style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }
}
