import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../core/providers/app_state.dart';
import '../features/content/data/content_repository.dart';
import '../theme/app_tokens.dart';
import 'ai_similar_questions_dialog.dart';

/// Global in-memory cache for related questions so switching between cards is instant
final Map<String, Map<String, dynamic>> _relatedQuestionsMemoryCache = {};

/// Amazon-Style Related Questions Carousel Component
/// Displays similar questions directly underneath the current question and explanation,
/// strictly matching the exact topic and core concept tested in this specific question.
class AmazonRelatedQuestionsView extends ConsumerStatefulWidget {
  const AmazonRelatedQuestionsView({
    super.key,
    required this.questionText,
    this.subject,
    this.topic,
    this.options,
    this.explanation,
    this.initialCount = 3,
  });

  final String questionText;
  final String? subject;
  final String? topic;
  final List<String>? options;
  final String? explanation;
  final int initialCount;

  @override
  ConsumerState<AmazonRelatedQuestionsView> createState() =>
      _AmazonRelatedQuestionsViewState();
}

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
    final key = _cacheKey;
    if (!forceRefresh && _relatedQuestionsMemoryCache.containsKey(key)) {
      final cached = _relatedQuestionsMemoryCache[key]!;
      setState(() {
        _isLoading = false;
        _error = null;
        _questions = List<Map<String, dynamic>>.from(cached['questions'] ?? const []);
        _resolvedSubject = cached['subject']?.toString() ?? widget.subject ?? '';
        _resolvedTopic = cached['topic']?.toString() ?? widget.topic ?? '';
        _resolvedConcept = cached['concept']?.toString() ?? '';
      });
      return;
    }

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final prefs = ref.read(sharedPreferencesProvider);
      final repo = ContentRepository(prefs: prefs);

      final data = await repo.fetchSimilarQuestionsData(
        questionText: widget.questionText,
        subject: widget.subject,
        topic: widget.topic,
        options: widget.options,
        explanation: widget.explanation,
        count: widget.initialCount,
      );

      final fetchedQuestions =
          List<Map<String, dynamic>>.from(data['questions'] ?? const []);

      if (mounted) {
        setState(() {
          _isLoading = false;
          _questions = fetchedQuestions;
          _resolvedSubject = data['subject']?.toString() ?? widget.subject ?? '';
          _resolvedTopic = data['topic']?.toString() ?? widget.topic ?? '';
          _resolvedConcept = data['concept']?.toString() ?? '';
        });

        // Store in cache
        _relatedQuestionsMemoryCache[key] = {
          'subject': _resolvedSubject,
          'topic': _resolvedTopic,
          'concept': _resolvedConcept,
          'questions': fetchedQuestions,
        };
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _isLoading = false;
          _error = e.toString().replaceAll('Exception: ', '');
        });
      }
    }
  }

  void _openInteractiveQuiz(BuildContext context) {
    if (_questions.isEmpty) return;
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => AISimilarQuestionsQuizScreen(
          title: _resolvedConcept.isNotEmpty
              ? _resolvedConcept
              : (_resolvedTopic.isNotEmpty ? _resolvedTopic : 'Related Practice Questions'),
          questions: _questions,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.only(top: AppSpacing.md),
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1E293B) : const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(AppRadii.lg),
        border: Border.all(
          color: isDark ? const Color(0xFF334155) : const Color(0xFFE2E8F0),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Section Header: Amazon style "Related to this item"
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(7),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFFFF9900), Color(0xFFFF6600)], // Amazon orange vibe
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Icon(Icons.auto_awesome, color: Colors.white, size: 16),
              ),
              const SizedBox(width: AppSpacing.sm),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Related to this Question (Amazon Style)',
                      style: theme.textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                        fontSize: 13,
                        color: isDark ? Colors.white : const Color(0xFF0F172A),
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      'Questions matching this exact topic and core formula/concept',
                      style: theme.textTheme.bodySmall?.copyWith(
                        fontSize: 11,
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
              if (!_isLoading)
                IconButton(
                  tooltip: 'Refresh similar questions',
                  icon: const Icon(Icons.refresh_rounded, size: 18),
                  color: AppColors.textSecondary,
                  onPressed: () => _loadRelatedQuestions(forceRefresh: true),
                ),
            ],
          ),

          // Topic & Concept Pills
          if (_resolvedTopic.isNotEmpty || _resolvedConcept.isNotEmpty) ...[
            const SizedBox(height: AppSpacing.sm),
            Wrap(
              spacing: 6,
              runSpacing: 4,
              children: [
                if (_resolvedSubject.isNotEmpty)
                  _buildTagPill(
                    icon: Icons.school_outlined,
                    text: _resolvedSubject,
                    color: const Color(0xFF6366F1),
                    isDark: isDark,
                  ),
                if (_resolvedTopic.isNotEmpty)
                  _buildTagPill(
                    icon: Icons.menu_book_rounded,
                    text: _resolvedTopic,
                    color: AppColors.primary,
                    isDark: isDark,
                  ),
                if (_resolvedConcept.isNotEmpty)
                  _buildTagPill(
                    icon: Icons.lightbulb_rounded,
                    text: _resolvedConcept,
                    color: const Color(0xFFD97706),
                    isDark: isDark,
                  ),
              ],
            ),
          ],

          const SizedBox(height: AppSpacing.md),

          // Content body: Loading skeleton, Error retry, or Carousel
          if (_isLoading)
            _buildLoadingCarousel(isDark)
          else if (_error != null)
            _buildErrorState(theme)
          else if (_questions.isEmpty)
            _buildEmptyState(theme)
          else
            _buildQuestionCarousel(theme, isDark),

          // Bottom Bar Action
          if (_questions.isNotEmpty && !_isLoading) ...[
            const SizedBox(height: AppSpacing.md),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () => _openInteractiveQuiz(context),
                    icon: const Icon(Icons.play_circle_fill_rounded, size: 18),
                    label: Text(
                      'Practice All ${_questions.length} Related Qs (Quiz Mode)',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 11, horizontal: 12),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(AppRadii.md),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: AppSpacing.sm),
                OutlinedButton.icon(
                  onPressed: () => showSimilarQuestionsDialog(
                    context,
                    ref,
                    questionText: widget.questionText,
                    subject: _resolvedSubject.isNotEmpty ? _resolvedSubject : widget.subject,
                    topic: _resolvedTopic.isNotEmpty ? _resolvedTopic : widget.topic,
                    options: widget.options,
                    explanation: widget.explanation,
                  ),
                  icon: const Icon(Icons.tune_rounded, size: 16),
                  label: const Text('Configure (1-10)', style: TextStyle(fontSize: 11)),
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 11, horizontal: 10),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(AppRadii.md),
                    ),
                  ),
                ),
              ],
            ),
          ],
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
      child: Row(
        children: [
          const Icon(Icons.error_outline, color: Colors.red, size: 20),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              _error ?? 'Failed to load related questions.',
              style: const TextStyle(fontSize: 11, color: Colors.red),
            ),
          ),
          TextButton(
            onPressed: () => _loadRelatedQuestions(forceRefresh: true),
            child: const Text('Retry', style: TextStyle(fontSize: 11)),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState(ThemeData theme) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Text(
          'No related questions available for this concept.',
          style: theme.textTheme.bodySmall?.copyWith(color: AppColors.textSecondary),
        ),
      ),
    );
  }
}
