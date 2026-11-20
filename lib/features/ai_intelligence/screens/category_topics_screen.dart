import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../theme/app_tokens.dart';
import '../models/ai_intelligence_models.dart';
import '../services/ai_intelligence_repository.dart';

class CategoryTopicsScreen extends ConsumerStatefulWidget {
  const CategoryTopicsScreen({
    super.key,
    required this.initialCategory,
  });

  final String initialCategory;

  @override
  ConsumerState<CategoryTopicsScreen> createState() => _CategoryTopicsScreenState();
}

class _CategoryTopicsScreenState extends ConsumerState<CategoryTopicsScreen> {
  late String _selectedCategory;
  String _selectedSubject = 'All';
  late Future<List<TopicLearningItem>> _topicsFuture;

  static const _categories = [
    {'key': 'not_studied', 'title': 'Not Studied', 'icon': Icons.menu_book_rounded, 'color': Color(0xFF2563EB)},
    {'key': 'poorly_understood', 'title': 'Poorly Understood', 'icon': Icons.trending_down_rounded, 'color': Color(0xFFD97706)},
    {'key': 'repeated_mistakes', 'title': 'Repeated Mistakes', 'icon': Icons.replay_circle_filled_rounded, 'color': Color(0xFFDC2626)},
    {'key': 'needs_revision', 'title': 'Needs Revision', 'icon': Icons.update_rounded, 'color': Color(0xFF7C3AED)},
  ];

  @override
  void initState() {
    super.initState();
    _selectedCategory = widget.initialCategory;
    _loadTopics();
  }

  void _loadTopics() {
    setState(() {
      _topicsFuture = ref.read(aiIntelligenceRepositoryProvider).fetchCategoryTopics(
            _selectedCategory,
            subject: _selectedSubject == 'All' ? null : _selectedSubject,
          );
    });
  }

  Color get _currentCategoryColor {
    final match = _categories.firstWhere((c) => c['key'] == _selectedCategory, orElse: () => _categories[0]);
    return match['color'] as Color;
  }

  String get _currentCategoryTitle {
    final match = _categories.firstWhere((c) => c['key'] == _selectedCategory, orElse: () => _categories[0]);
    return match['title'] as String;
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final scaffoldBg = Theme.of(context).scaffoldBackgroundColor;
    final textColor = isDark ? Colors.white : AppColors.textPrimary;
    final subtextColor = isDark ? const Color(0xFFB0B7C3) : AppColors.textSecondary;
    final dividerColor = isDark ? const Color(0xFF2E3440) : AppColors.border;

    return Scaffold(
      backgroundColor: scaffoldBg,
      appBar: AppBar(
        title: Text(
          _currentCategoryTitle,
          style: TextStyle(
            fontWeight: FontWeight.w800,
            fontSize: 18,
            color: textColor,
          ),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
        iconTheme: IconThemeData(color: textColor),
      ),
      body: Column(
        children: [
          // Category selector tabs
          _buildCategoryPills(isDark, textColor),
          // Subject filter chips
          _buildSubjectFilterRow(isDark, textColor, subtextColor),
          Divider(height: 1, thickness: 1, color: dividerColor),
          // Topics list
          Expanded(
            child: FutureBuilder<List<TopicLearningItem>>(
              future: _topicsFuture,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator(color: AppColors.primary));
                }

                if (snapshot.hasError) {
                  return Center(
                    child: Padding(
                      padding: const EdgeInsets.all(24.0),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.error_outline, color: AppColors.danger, size: 48),
                          const SizedBox(height: 12),
                          Text(
                            'Failed to load topics: ${snapshot.error}',
                            textAlign: TextAlign.center,
                            style: TextStyle(color: textColor),
                          ),
                          const SizedBox(height: 16),
                          ElevatedButton(
                            onPressed: _loadTopics,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppColors.primary,
                              foregroundColor: Colors.white,
                            ),
                            child: const Text('Retry'),
                          ),
                        ],
                      ),
                    ),
                  );
                }

                final topics = snapshot.data ?? [];
                if (topics.isEmpty) {
                  return Center(
                    child: Padding(
                      padding: const EdgeInsets.all(32.0),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.check_circle_outline, size: 56, color: _currentCategoryColor),
                          const SizedBox(height: 16),
                          Text(
                            'No topics found in $_currentCategoryTitle!',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w800,
                              color: textColor,
                            ),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            'Keep practicing tests and topic sets to identify personalized diagnostics.',
                            textAlign: TextAlign.center,
                            style: TextStyle(color: subtextColor, fontSize: 13),
                          ),
                        ],
                      ),
                    ),
                  );
                }

                return ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: topics.length,
                  itemBuilder: (context, index) {
                    final item = topics[index];
                    return _buildTopicCard(context, item, isDark, textColor, subtextColor);
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryPills(bool isDark, Color textColor) {
    final barBg = isDark ? const Color(0xFF171A22) : Colors.white;

    return Container(
      color: barBg,
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Row(
          children: _categories.map((c) {
            final isSelected = c['key'] == _selectedCategory;
            final color = c['color'] as Color;
            return Padding(
              padding: const EdgeInsets.only(right: 8),
              child: ChoiceChip(
                selected: isSelected,
                avatar: Icon(
                  c['icon'] as IconData,
                  size: 16,
                  color: isSelected ? Colors.white : color,
                ),
                label: Text(
                  c['title'] as String,
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: isSelected ? FontWeight.w800 : FontWeight.w600,
                    color: isSelected ? Colors.white : (isDark ? Colors.white70 : textColor),
                  ),
                ),
                selectedColor: color,
                backgroundColor: color.withValues(alpha: isDark ? 0.15 : 0.08),
                side: BorderSide(
                  color: isSelected ? color : (isDark ? const Color(0xFF2E3440) : AppColors.border),
                  width: 1.2,
                ),
                onSelected: (selected) {
                  if (selected) {
                    setState(() {
                      _selectedCategory = c['key'] as String;
                      _loadTopics();
                    });
                  }
                },
              ),
            );
          }).toList(),
        ),
      ),
    );
  }

  Widget _buildSubjectFilterRow(bool isDark, Color textColor, Color subtextColor) {
    final subjects = ['All', 'Physics', 'Chemistry', 'Biology'];
    final barBg = isDark ? const Color(0xFF171A22) : Colors.white;

    return Container(
      color: barBg,
      padding: const EdgeInsets.only(left: 16, right: 16, bottom: 8),
      child: Row(
        children: subjects.map((sub) {
          final isSelected = _selectedSubject == sub;
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: FilterChip(
              selected: isSelected,
              label: Text(
                sub,
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                  color: isSelected
                      ? (isDark ? Colors.white : AppColors.primary)
                      : subtextColor,
                ),
              ),
              selectedColor: isDark
                  ? AppColors.primary.withValues(alpha: 0.35)
                  : AppColors.primarySoft,
              backgroundColor: isDark
                  ? const Color(0xFF1F242E)
                  : AppColors.surfaceElevated,
              side: BorderSide(
                color: isSelected
                    ? AppColors.primary
                    : (isDark ? const Color(0xFF2E3440) : AppColors.border),
                width: 1,
              ),
              checkmarkColor: isDark ? Colors.white : AppColors.primary,
              onSelected: (selected) {
                setState(() {
                  _selectedSubject = sub;
                  _loadTopics();
                });
              },
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildTopicCard(
    BuildContext context,
    TopicLearningItem item,
    bool isDark,
    Color textColor,
    Color subtextColor,
  ) {
    Color badgeColor = _currentCategoryColor;
    final cardBg = isDark ? const Color(0xFF171A22) : Colors.white;
    final cardBorder = isDark ? const Color(0xFF2E3440) : AppColors.border;
    final metricBg = isDark ? const Color(0xFF1F242E) : const Color(0xFFFFF8F2);
    final metricBorder = isDark ? const Color(0xFF2E3440) : AppColors.border;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: cardBorder, width: 1.2),
        boxShadow: isDark
            ? [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.25),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ]
            : AppShadows.soft,
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(16),
          onTap: () {
            context.push('/ai-learning/topic?subject=${Uri.encodeComponent(item.subject)}&topic=${Uri.encodeComponent(item.topic)}');
          },
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: badgeColor.withValues(alpha: isDark ? 0.22 : 0.12),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        item.subject,
                        style: TextStyle(
                          color: badgeColor,
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                    Row(
                      children: [
                        Text(
                          '${item.masteryScore.toStringAsFixed(0)}% Mastery',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w800,
                            color: item.masteryScore >= 75
                                ? AppColors.success
                                : (item.masteryScore >= 50 ? AppColors.warning : AppColors.danger),
                          ),
                        ),
                        const SizedBox(width: 4),
                        Icon(Icons.arrow_forward_ios_rounded, size: 12, color: subtextColor),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  item.topic,
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w800,
                    color: textColor,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  'Chapter: ${item.chapter}',
                  style: TextStyle(fontSize: 12, color: subtextColor),
                ),
                const SizedBox(height: 10),

                // MARKS & PERFORMANCE BREAKDOWN (Specially highlighted for Poorly Understood)
                if (_selectedCategory == 'poorly_understood') ...[
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isDark ? const Color(0xFF281C10) : const Color(0xFFFFF3E0),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(
                        color: const Color(0xFFD97706).withValues(alpha: isDark ? 0.40 : 0.35),
                        width: 1.2,
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                const Icon(Icons.stars_rounded, size: 16, color: Color(0xFFD97706)),
                                const SizedBox(width: 6),
                                Text(
                                  'NEET Score: ${item.marksObtained} / ${item.maxMarks} Marks',
                                  style: TextStyle(
                                    fontSize: 13,
                                    fontWeight: FontWeight.w800,
                                    color: isDark ? Colors.white : const Color(0xFF92400E),
                                  ),
                                ),
                              ],
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                              decoration: BoxDecoration(
                                color: const Color(0xFFD97706),
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: Text(
                                '${item.marksPercentage.toStringAsFixed(0)}%',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 10,
                                  fontWeight: FontWeight.w800,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                '• ${item.totalQuestionsCorrect} Correct (+${item.totalQuestionsCorrect * 4} Marks)',
                                style: const TextStyle(fontSize: 11, color: AppColors.success, fontWeight: FontWeight.w600),
                              ),
                            ),
                            Expanded(
                              child: Text(
                                '• -${item.negativeMarks} Marks Lost (Negative)',
                                style: const TextStyle(fontSize: 11, color: AppColors.danger, fontWeight: FontWeight.w700),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 8),
                ] else ...[
                  // Standard Metric Row
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    decoration: BoxDecoration(
                      color: metricBg,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: metricBorder, width: 1),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _buildMiniMetric('Accuracy', '${item.accuracyPercentage.toStringAsFixed(0)}%', textColor, subtextColor),
                        _buildMiniMetric('Attempts', '${item.totalQuestionsAttempted} Qs', textColor, subtextColor),
                        if (_selectedCategory == 'repeated_mistakes')
                          _buildMiniMetric('Repeated Errors', '${item.repeatedMistakeCount}', textColor, subtextColor, color: AppColors.danger)
                        else if (_selectedCategory == 'needs_revision')
                          _buildMiniMetric('Retention', '${item.retentionEstimate.toStringAsFixed(0)}%', textColor, subtextColor, color: const Color(0xFF7C3AED))
                        else
                          _buildMiniMetric('Score', '${item.marksObtained} Marks', textColor, subtextColor, color: AppColors.primary),
                      ],
                    ),
                  ),
                  const SizedBox(height: 10),
                ],

                // AI Explanation excerpt
                if (item.aiExplanation.isNotEmpty)
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Icon(Icons.lightbulb_outline, size: 16, color: AppColors.gold),
                      const SizedBox(width: 6),
                      Expanded(
                        child: Text(
                          item.aiExplanation,
                          style: TextStyle(fontSize: 12, color: subtextColor, height: 1.3),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildMiniMetric(
    String label,
    String value,
    Color textColor,
    Color subtextColor, {
    Color? color,
  }) {
    return Column(
      children: [
        Text(
          value,
          style: TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w800,
            color: color ?? textColor,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: TextStyle(fontSize: 10, color: subtextColor),
        ),
      ],
    );
  }
}
