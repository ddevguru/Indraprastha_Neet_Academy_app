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
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text(
          _currentCategoryTitle,
          style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 18),
        ),
        backgroundColor: AppColors.surface,
        elevation: 0,
        centerTitle: false,
      ),
      body: Column(
        children: [
          // Category selector tabs
          _buildCategoryPills(),
          // Subject filter chips
          _buildSubjectFilterRow(),
          const Divider(height: 1, thickness: 1, color: AppColors.border),
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
                          Text('Failed to load topics: ${snapshot.error}', textAlign: TextAlign.center),
                          const SizedBox(height: 16),
                          ElevatedButton(onPressed: _loadTopics, child: const Text('Retry')),
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
                            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: AppColors.textPrimary),
                          ),
                          const SizedBox(height: 6),
                          const Text(
                            'Keep practicing tests to identify more targeted improvement areas.',
                            textAlign: TextAlign.center,
                            style: TextStyle(color: AppColors.textSecondary, fontSize: 13),
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
                    return _buildTopicCard(context, item);
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryPills() {
    return Container(
      color: AppColors.surface,
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
                    color: isSelected ? Colors.white : AppColors.textPrimary,
                  ),
                ),
                selectedColor: color,
                backgroundColor: color.withOpacity(0.08),
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

  Widget _buildSubjectFilterRow() {
    final subjects = ['All', 'Physics', 'Chemistry', 'Biology'];
    return Container(
      color: AppColors.surface,
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
                  color: isSelected ? AppColors.primary : AppColors.textSecondary,
                ),
              ),
              selectedColor: AppColors.primarySoft,
              backgroundColor: AppColors.backgroundAlt,
              checkmarkColor: AppColors.primary,
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

  Widget _buildTopicCard(BuildContext context, TopicLearningItem item) {
    Color badgeColor = _currentCategoryColor;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.03),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
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
                        color: badgeColor.withOpacity(0.12),
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
                        const Icon(Icons.arrow_forward_ios_rounded, size: 12, color: AppColors.textSecondary),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  item.topic,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w800,
                    color: AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  'Chapter: ${item.chapter}',
                  style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                ),
                const SizedBox(height: 10),
                // Metric row
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  decoration: BoxDecoration(
                    color: AppColors.backgroundAlt,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _buildMiniMetric('Accuracy', '${item.accuracyPercentage.toStringAsFixed(0)}%'),
                      _buildMiniMetric('Attempts', '${item.totalQuestionsAttempted} Qs'),
                      if (_selectedCategory == 'repeated_mistakes')
                        _buildMiniMetric('Repeated Errors', '${item.repeatedMistakeCount}', color: AppColors.danger)
                      else if (_selectedCategory == 'needs_revision')
                        _buildMiniMetric('Retention', '${item.retentionEstimate.toStringAsFixed(0)}%', color: const Color(0xFF7C3AED))
                      else
                        _buildMiniMetric('Status', item.studyStatus),
                    ],
                  ),
                ),
                const SizedBox(height: 10),
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
                          style: const TextStyle(fontSize: 12, color: AppColors.textSecondary, height: 1.3),
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

  Widget _buildMiniMetric(String label, String value, {Color? color}) {
    return Column(
      children: [
        Text(
          value,
          style: TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w800,
            color: color ?? AppColors.textPrimary,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: const TextStyle(fontSize: 10, color: AppColors.textSecondary),
        ),
      ],
    );
  }
}

