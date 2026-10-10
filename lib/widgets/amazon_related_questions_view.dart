import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../features/content/data/content_repository.dart';
import '../theme/app_tokens.dart';
import 'ai_similar_questions_dialog.dart';

/// Global in-memory cache for related questions so switching between cards is instant
final Map<String, Map<String, dynamic>> _relatedQuestionsMemoryCache = {};

/// AI-Powered Similar Questions Component
/// Displays similar questions directly underneath the current question and explanation,
/// strictly matching the exact topic and core concept tested in this specific question.
class AmazonRelatedQuestionsView extends ConsumerStatefulWidget {
  const AmazonRelatedQuestionsView({
    super.key,
    required this.questionText,
    this.sourceQuestionId,
    this.sourceType,
    this.testId,
    this.userAnswer,
    this.subject,
    this.topic,
    this.options,
    this.explanation,
    this.similarQuestion,
    this.initialCount = 3,
  });

  final String questionText;
  final int? sourceQuestionId;
  final String? sourceType;
  final int? testId;
  final String? userAnswer;
  final String? subject;
  final String? topic;
  final List<String>? options;
  final String? explanation;
  final Map<String, dynamic>? similarQuestion;
  final int initialCount;

  @override
  ConsumerState<AmazonRelatedQuestionsView> createState() =>
      _AmazonRelatedQuestionsViewState();
}

typedef AISimilarQuestionsInlineView = AmazonRelatedQuestionsView;

class _AmazonRelatedQuestionsViewState
    extends ConsumerState<AmazonRelatedQuestionsView>
    with SingleTickerProviderStateMixin {
  bool _isLoading = false;
  String? _error;
  List<Map<String, dynamic>> _questions = [];
  String _resolvedTopic = '';
  String _resolvedConcept = '';
  String _resolvedSubject = '';

  // Card interactive answer state: map of question index -> selected option string
  final Map<int, String> _cardSelectedOptions = {};
  final Map<int, bool> _cardShowExplanation = {};

  late final AnimationController _shimmerController;

  String get _cacheKey =>
      '${widget.subject ?? ""}_${widget.topic ?? ""}_${widget.questionText.trim().hashCode}';

  @override
  void initState() {
    super.initState();
    _shimmerController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1400),
    )..repeat();

    _loadRelatedQuestions();
  }

  @override
  void didUpdateWidget(covariant AmazonRelatedQuestionsView oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.questionText != widget.questionText ||
        oldWidget.topic != widget.topic ||
        oldWidget.subject != widget.subject) {
      _cardSelectedOptions.clear();
      _cardShowExplanation.clear();
      _loadRelatedQuestions();
    }
  }

  @override
  void dispose() {
    _shimmerController.dispose();
    super.dispose();
  }

  Future<void> _loadRelatedQuestions({bool forceRefresh = false}) async {
    setState(() {
      _isLoading = false;
      _error = null;
      if (widget.similarQuestion != null) {
        _questions = [widget.similarQuestion!];
      } else {
        _questions = const [];
      }
    });
  }

  void _openInteractiveQuiz(BuildContext context) {
    if (_questions.isEmpty) return;
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => AISimilarQuestionsQuizScreen(
          title: _resolvedConcept.isNotEmpty
              ? _resolvedConcept
              : (_resolvedTopic.isNotEmpty ? _resolvedTopic : 'Similar Practice Questions'),
          questions: _questions,
          subject: _resolvedSubject.isNotEmpty ? _resolvedSubject : widget.subject,
          chapter: _resolvedTopic.isNotEmpty ? _resolvedTopic : widget.topic,
          concept: _resolvedConcept,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final sq = widget.similarQuestion ?? (_questions.isNotEmpty ? _questions.first : null);
    if (sq == null) {
      return const SizedBox.shrink();
    }

    return Container(
      margin: const EdgeInsets.only(top: AppSpacing.md),
      width: double.infinity,
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF4F46E5), Color(0xFF7C3AED)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(AppRadii.lg),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF4F46E5).withValues(alpha: 0.25),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.2),
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.psychology_alt_rounded, color: Colors.white, size: 20),
          ),
          const SizedBox(width: AppSpacing.md),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  'Got this question wrong?',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                  ),
                ),
                SizedBox(height: 2),
                Text(
                  'Practice a similar question set by your teacher',
                  style: TextStyle(
                    color: Colors.white70,
                    fontSize: 11,
                  ),
                ),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: () => showSingleSimilarQuestionSheet(
              context,
              similarQuestion: sq,
              questionTitle: 'Similar Question Practice',
            ),
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.white,
              foregroundColor: const Color(0xFF4F46E5),
              elevation: 0,
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              textStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(AppRadii.md),
              ),
            ),
            child: const Text('Solve Similar Question'),
          ),
        ],
      ),
    );
  }

  Widget _buildTagPill({
    required IconData icon,
    required String text,
    required Color color,
    required bool isDark,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: color.withValues(alpha: isDark ? 0.2 : 0.08),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 11, color: color),
          const SizedBox(width: 4),
          Flexible(
            child: Text(
              text,
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.w600,
                color: color,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuestionCarousel(ThemeData theme, bool isDark) {
    return SizedBox(
      height: 290,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        physics: const BouncingScrollPhysics(),
        itemCount: _questions.length,
        separatorBuilder: (context, index) => const SizedBox(width: AppSpacing.md),
        itemBuilder: (context, index) {
          final q = _questions[index];
          return _buildRelatedCard(index, q, theme, isDark);
        },
      ),
    );
  }

  Widget _buildRelatedCard(
    int index,
    Map<String, dynamic> q,
    ThemeData theme,
    bool isDark,
  ) {
    final qText = (q['question_text'] ?? q['questionText'] ?? q['question'] ?? '').toString();
    final correctOpt = (q['correct_option'] ?? q['correctOption'] ?? 'A').toString().toUpperCase();
    final explanation = (q['explanation'] ?? '').toString();

    final userSelected = _cardSelectedOptions[index];
    final showExpl = _cardShowExplanation[index] ?? false;

    final optionsMap = {
      'A': (q['option_a'] ?? q['optionA'] ?? '').toString(),
      'B': (q['option_b'] ?? q['optionB'] ?? '').toString(),
      'C': (q['option_c'] ?? q['optionC'] ?? '').toString(),
      'D': (q['option_d'] ?? q['optionD'] ?? '').toString(),
    };

    return Container(
      width: 270,
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF0F172A) : Colors.white,
        borderRadius: BorderRadius.circular(AppRadii.md),
        border: Border.all(
          color: userSelected != null
              ? (userSelected == correctOpt ? Colors.green : Colors.red)
              : (isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0)),
          width: userSelected != null ? 1.5 : 1.0,
        ),
        boxShadow: AppShadows.soft,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Card Top Badge
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                decoration: BoxDecoration(
                  color: AppColors.primary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  'Similar Q#${index + 1}',
                  style: const TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primary,
                  ),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: const Color(0xFF10B981).withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: const Text(
                  'NEET MCQ',
                  style: TextStyle(
                    fontSize: 9,
                    fontWeight: FontWeight.w700,
                    color: Color(0xFF10B981),
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: AppSpacing.sm),

          // Question snippet text
          Expanded(
            child: SingleChildScrollView(
              physics: const BouncingScrollPhysics(),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    qText,
                    style: TextStyle(
                      fontSize: 11.5,
                      fontWeight: FontWeight.w600,
                      height: 1.35,
                      color: isDark ? Colors.white : const Color(0xFF1E293B),
                    ),
                    maxLines: 4,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: AppSpacing.sm),

                  // Mini interactive options (A, B, C, D)
                  ...['A', 'B', 'C', 'D'].map((optKey) {
                    final optText = optionsMap[optKey] ?? '';
                    if (optText.isEmpty) return const SizedBox.shrink();

                    final isSelected = userSelected == optKey;
                    final isCorrect = correctOpt == optKey;

                    Color bg = Colors.transparent;
                    Color border = isDark ? Colors.white12 : Colors.grey.shade200;
                    Color textCol = isDark ? Colors.white70 : Colors.black87;

                    if (userSelected != null) {
                      if (isCorrect) {
                        bg = Colors.green.withValues(alpha: 0.15);
                        border = Colors.green;
                        textCol = Colors.green.shade800;
                      } else if (isSelected) {
                        bg = Colors.red.withValues(alpha: 0.15);
                        border = Colors.red;
                        textCol = Colors.red.shade800;
                      }
                    }

                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          _cardSelectedOptions[index] = optKey;
                          _cardShowExplanation[index] = true;
                        });
                      },
                      child: Container(
                        margin: const EdgeInsets.only(bottom: 5),
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
                        decoration: BoxDecoration(
                          color: bg,
                          borderRadius: BorderRadius.circular(6),
                          border: Border.all(color: border),
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 18,
                              height: 18,
                              alignment: Alignment.center,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: isSelected
                                    ? (isCorrect ? Colors.green : Colors.red)
                                    : (isDark ? Colors.white10 : Colors.grey.shade200),
                              ),
                              child: Text(
                                optKey,
                                style: TextStyle(
                                  fontSize: 9,
                                  fontWeight: FontWeight.bold,
                                  color: isSelected ? Colors.white : textCol,
                                ),
                              ),
                            ),
                            const SizedBox(width: 6),
                            Expanded(
                              child: Text(
                                optText,
                                style: TextStyle(fontSize: 10.5, color: textCol),
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  }),

                  if (showExpl && explanation.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Container(
                      padding: const EdgeInsets.all(6),
                      decoration: BoxDecoration(
                        color: Colors.blue.withValues(alpha: 0.08),
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(color: Colors.blue.withValues(alpha: 0.2)),
                      ),
                      child: Text(
                        '💡 $explanation',
                        style: TextStyle(
                          fontSize: 9.5,
                          height: 1.3,
                          color: isDark ? Colors.blue.shade200 : Colors.blue.shade900,
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLoadingCarousel(bool isDark) {
    return SizedBox(
      height: 200,
      child: AnimatedBuilder(
        animation: _shimmerController,
        builder: (context, _) {
          return ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: 3,
            separatorBuilder: (context, index) => const SizedBox(width: AppSpacing.md),
            itemBuilder: (context, index) {
              return Container(
                width: 250,
                padding: const EdgeInsets.all(AppSpacing.md),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF0F172A) : Colors.white,
                  borderRadius: BorderRadius.circular(AppRadii.md),
                  border: Border.all(
                    color: isDark ? Colors.white12 : Colors.grey.shade200,
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 80,
                      height: 16,
                      decoration: BoxDecoration(
                        color: isDark ? Colors.white10 : Colors.grey.shade200,
                        borderRadius: BorderRadius.circular(4),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Container(
                      width: double.infinity,
                      height: 12,
                      decoration: BoxDecoration(
                        color: isDark ? Colors.white10 : Colors.grey.shade200,
                        borderRadius: BorderRadius.circular(4),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      width: 180,
                      height: 12,
                      decoration: BoxDecoration(
                        color: isDark ? Colors.white10 : Colors.grey.shade200,
                        borderRadius: BorderRadius.circular(4),
                      ),
                    ),
                    const Spacer(),
                    Container(
                      width: double.infinity,
                      height: 28,
                      decoration: BoxDecoration(
                        color: isDark ? Colors.white10 : Colors.grey.shade200,
                        borderRadius: BorderRadius.circular(6),
                      ),
                    ),
                  ],
                ),
              );
            },
          );
        },
      ),
    );
  }

  Widget _buildErrorState(ThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.red.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.red.withValues(alpha: 0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.error_outline, color: Colors.red, size: 20),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  _error ?? 'AI question generation encountered an issue.',
                  style: const TextStyle(fontSize: 11, color: Colors.red),
                ),
              ),
              TextButton(
                onPressed: () => _loadRelatedQuestions(forceRefresh: true),
                child: const Text('Retry', style: TextStyle(fontSize: 11)),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Align(
            alignment: Alignment.centerRight,
            child: OutlinedButton.icon(
              onPressed: () => showSimilarQuestionsDialog(
                context,
                ref,
                questionText: widget.questionText,
                sourceQuestionId: widget.sourceQuestionId,
                sourceType: widget.sourceType,
                testId: widget.testId,
                userAnswer: widget.userAnswer,
                subject: _resolvedSubject.isNotEmpty ? _resolvedSubject : widget.subject,
                topic: _resolvedTopic.isNotEmpty ? _resolvedTopic : widget.topic,
                options: widget.options,
                explanation: widget.explanation,
              ),
              icon: const Icon(Icons.auto_awesome, size: 14),
              label: const Text('Solve Similar Questions (1-10)', style: TextStyle(fontSize: 11)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState(ThemeData theme) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text(
              'No practice questions generated yet for this concept.',
              style: theme.textTheme.bodySmall?.copyWith(color: AppColors.textSecondary),
            ),
            const SizedBox(height: 8),
            ElevatedButton.icon(
              onPressed: () => showSimilarQuestionsDialog(
                context,
                ref,
                questionText: widget.questionText,
                sourceQuestionId: widget.sourceQuestionId,
                sourceType: widget.sourceType,
                testId: widget.testId,
                userAnswer: widget.userAnswer,
                subject: _resolvedSubject.isNotEmpty ? _resolvedSubject : widget.subject,
                topic: _resolvedTopic.isNotEmpty ? _resolvedTopic : widget.topic,
                options: widget.options,
                explanation: widget.explanation,
              ),
              icon: const Icon(Icons.auto_awesome, size: 16),
              label: const Text('Solve Similar Questions (1-10)', style: TextStyle(fontSize: 12)),
            ),
          ],
        ),
      ),
    );
  }
}
