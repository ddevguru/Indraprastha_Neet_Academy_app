import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../core/providers/app_state.dart';
import '../features/content/data/content_repository.dart';
import '../theme/app_tokens.dart';
import 'app_widgets.dart';

/// Shows AI similar questions dialog allowing user to choose 1 to 10 questions to generate.
Future<void> showSimilarQuestionsDialog(
  BuildContext context,
  WidgetRef ref, {
  required String questionText,
  String? subject,
  String? topic,
  List<String>? options,
  String? explanation,
}) async {
  await showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (ctx) => _SimilarQuestionsConfigSheet(
      questionText: questionText,
      subject: subject,
      topic: topic,
      options: options,
      explanation: explanation,
      parentRef: ref,
    ),
  );
}

class _SimilarQuestionsConfigSheet extends StatefulWidget {
  const _SimilarQuestionsConfigSheet({
    required this.questionText,
    this.subject,
    this.topic,
    this.options,
    this.explanation,
    required this.parentRef,
  });

  final String questionText;
  final String? subject;
  final String? topic;
  final List<String>? options;
  final String? explanation;
  final WidgetRef parentRef;

  @override
  State<_SimilarQuestionsConfigSheet> createState() =>
      __SimilarQuestionsConfigSheetState();
}

class __SimilarQuestionsConfigSheetState
    extends State<_SimilarQuestionsConfigSheet> {
  int _selectedCount = 3;
  bool _generating = false;
  String? _error;

  Future<void> _startGeneration() async {
    setState(() {
      _generating = true;
      _error = null;
    });

    try {
      final prefs = widget.parentRef.read(sharedPreferencesProvider);
      final repo = ContentRepository(prefs: prefs);

      final generated = await repo.generateSimilarQuestions(
        questionText: widget.questionText,
        subject: widget.subject,
        topic: widget.topic,
        options: widget.options,
        explanation: widget.explanation,
        count: _selectedCount,
      );

      if (!mounted) return;
      Navigator.pop(context); // Close bottom sheet

      if (generated.isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Could not generate similar questions. Please try again.')),
        );
        return;
      }

      // Navigate to interactive quiz screen
      await Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => AISimilarQuestionsQuizScreen(
            title: 'AI Practice: ${widget.topic ?? widget.subject ?? "Similar Concept"}',
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
                      'AI will generate concept-matched NEET questions.',
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.lg),
          if (_error != null) ...[
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.red.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(AppRadii.md),
                border: Border.all(color: Colors.red.withValues(alpha: 0.4)),
              ),
              child: Text(
                _error!,
                style: const TextStyle(color: Colors.red, fontSize: 13),
              ),
            ),
            const SizedBox(height: AppSpacing.md),
          ],
          Text(
            'Select number of similar questions (1 to 10):',
            style: theme.textTheme.titleSmall?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          // Count preset chips
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [1, 3, 5, 10].map((c) {
              final isSel = _selectedCount == c;
              return ChoiceChip(
                label: Text('$c Qs'),
                selected: isSel,
                onSelected: (val) {
                  if (val) setState(() => _selectedCount = c);
                },
                selectedColor: AppColors.primary,
                labelStyle: TextStyle(
                  color: isSel ? Colors.white : theme.colorScheme.onSurface,
                  fontWeight: FontWeight.w600,
                ),
              );
            }).toList(),
          ),
          const SizedBox(height: AppSpacing.sm),
          // Slider 1 to 10
          Row(
            children: [
              const Text('1', style: TextStyle(fontWeight: FontWeight.bold)),
              Expanded(
                child: Slider(
                  value: _selectedCount.toDouble(),
                  min: 1,
                  max: 10,
                  divisions: 9,
                  label: '$_selectedCount Questions',
                  activeColor: AppColors.primary,
                  onChanged: (v) => setState(() => _selectedCount = v.round()),
                ),
              ),
              const Text('10', style: TextStyle(fontWeight: FontWeight.bold)),
            ],
          ),
          const SizedBox(height: AppSpacing.lg),
          if (_generating) ...[
            Center(
              child: Column(
                children: [
                  const CircularProgressIndicator(),
                  const SizedBox(height: AppSpacing.md),
                  Text(
                    'AI is generating $_selectedCount similar NEET questions...',
                    style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
                  ),
                ],
              ),
            ),
          ] else ...[
            PrimaryButton(
              label: 'Generate $_selectedCount Questions ✨',
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

/// Interactive quiz screen for generated similar MCQs
class AISimilarQuestionsQuizScreen extends StatefulWidget {
  const AISimilarQuestionsQuizScreen({
    super.key,
    required this.title,
    required this.questions,
  });

  final String title;
  final List<Map<String, dynamic>> questions;

  @override
  State<AISimilarQuestionsQuizScreen> createState() =>
      _AISimilarQuestionsQuizScreenState();
}

class _AISimilarQuestionsQuizScreenState
    extends State<AISimilarQuestionsQuizScreen> {
  int _currentIndex = 0;
  final Map<int, String> _selectedAnswers = {};
  int _correctCount = 0;
  bool _finished = false;

  void _selectOption(int qIndex, String optionKey, String correctOption) {
    if (_selectedAnswers.containsKey(qIndex)) return; // Already selected
    setState(() {
      _selectedAnswers[qIndex] = optionKey;
      if (optionKey.toUpperCase() == correctOption.toUpperCase()) {
        _correctCount++;
      }
    });
  }

  void _nextQuestion() {
    if (_currentIndex < widget.questions.length - 1) {
      setState(() => _currentIndex++);
    } else {
      setState(() => _finished = true);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    if (_finished) {
      final total = widget.questions.length;
      final accuracy = total > 0 ? (_correctCount / total * 100).round() : 0;

      return Scaffold(
        appBar: AppBar(title: Text(widget.title)),
        body: Center(
          child: Padding(
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
                    const Icon(Icons.emoji_events_rounded, color: Colors.amber, size: 64),
                    const SizedBox(height: AppSpacing.md),
                    Text(
                      'Practice Completed!',
                      style: theme.textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      'Score: $_correctCount / $total ($accuracy%)',
                      style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.primary),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    Text(
                      accuracy >= 75
                          ? '🎉 Excellent work! You have mastered this concept.'
                          : '👍 Good effort! Review the explanations to strengthen weak points.',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 14, color: isDark ? Colors.white70 : AppColors.textSecondary),
                    ),
                    const SizedBox(height: AppSpacing.xl),
                    PrimaryButton(
                      label: 'Done',
                      icon: Icons.check_circle_rounded,
                      expanded: true,
                      onPressed: () => Navigator.pop(context),
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
    final qText = currentQ['question_text']?.toString() ?? currentQ['question']?.toString() ?? '';
    final optA = currentQ['option_a']?.toString() ?? '';
    final optB = currentQ['option_b']?.toString() ?? '';
    final optC = currentQ['option_c']?.toString() ?? '';
    final optD = currentQ['option_d']?.toString() ?? '';
    final correctOpt = (currentQ['correct_option'] ?? currentQ['correct_answer'] ?? 'A').toString().toUpperCase();
    final explanation = currentQ['explanation']?.toString() ?? '';

    final options = {'A': optA, 'B': optB, 'C': optC, 'D': optD};
    final userAns = _selectedAnswers[_currentIndex];
    final isAnswered = userAns != null;

    return Scaffold(
      appBar: AppBar(
        title: Text('${widget.title} (${_currentIndex + 1}/${widget.questions.length})'),
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
                  value: (_currentIndex + 1) / widget.questions.length,
                  minHeight: 6,
                  backgroundColor: AppColors.border,
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
                            'Question ${_currentIndex + 1}',
                            style: const TextStyle(
                              color: AppColors.primary,
                              fontWeight: FontWeight.bold,
                              fontSize: 13,
                            ),
                          ),
                        ),
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
                          bg = isDark ? AppColors.success.withValues(alpha: 0.2) : const Color(0xFFE7F8EF);
                          border = AppColors.success;
                          textColor = AppColors.success;
                        } else if (isSelected) {
                          bg = isDark ? AppColors.danger.withValues(alpha: 0.2) : const Color(0xFFFCEAEA);
                          border = AppColors.danger;
                          textColor = AppColors.danger;
                        }
                      }

                      return Padding(
                        padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                        child: InkWell(
                          onTap: isAnswered ? null : () => _selectOption(_currentIndex, key, correctOpt),
                          borderRadius: BorderRadius.circular(AppRadii.md),
                          child: Container(
                            padding: const EdgeInsets.all(AppSpacing.md),
                            decoration: BoxDecoration(
                              color: bg,
                              borderRadius: BorderRadius.circular(AppRadii.md),
                              border: Border.all(color: border, width: isSelected || (isAnswered && isCorrect) ? 2 : 1),
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
                                  const Icon(Icons.check_circle_rounded, color: AppColors.success, size: 20),
                                if (isAnswered && isSelected && !isCorrect)
                                  const Icon(Icons.cancel_rounded, color: AppColors.danger, size: 20),
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

              // Explanation Card (shows after answer)
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
                            'AI Explanation',
                            style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFFF59E0B)),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        explanation,
                        style: TextStyle(
                          fontSize: 14,
                          height: 1.4,
                          color: isDark ? Colors.white.withValues(alpha: 0.9) : AppColors.textPrimary,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: AppSpacing.lg),
              ],

              if (isAnswered) ...[
                PrimaryButton(
                  label: _currentIndex < widget.questions.length - 1 ? 'Next Question' : 'Finish Practice',
                  icon: _currentIndex < widget.questions.length - 1 ? Icons.arrow_forward_rounded : Icons.check_circle_rounded,
                  expanded: true,
                  onPressed: _nextQuestion,
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
