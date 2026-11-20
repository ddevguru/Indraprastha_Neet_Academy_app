import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../theme/app_tokens.dart';
import '../models/ai_intelligence_models.dart';
import '../services/ai_intelligence_repository.dart';

class AiDashboardScreen extends ConsumerStatefulWidget {
  const AiDashboardScreen({super.key});

  @override
  ConsumerState<AiDashboardScreen> createState() => _AiDashboardScreenState();
}

class _AiDashboardScreenState extends ConsumerState<AiDashboardScreen> {
  late Future<AiOverviewData> _overviewFuture;
  bool _isAnalyzing = false;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  void _loadData() {
    setState(() {
      _overviewFuture = ref.read(aiIntelligenceRepositoryProvider).fetchOverview();
    });
  }

  Future<void> _triggerAnalysis() async {
    setState(() => _isAnalyzing = true);
    try {
      final updated = await ref.read(aiIntelligenceRepositoryProvider).triggerAnalysis();
      setState(() {
        _overviewFuture = Future.value(updated);
        _isAnalyzing = false;
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('AI Learning Analysis updated with latest test & practice performance!'),
            backgroundColor: AppColors.success,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isAnalyzing = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to update analysis: $e'),
            backgroundColor: AppColors.danger,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final scaffoldBg = Theme.of(context).scaffoldBackgroundColor;
    final textColor = isDark ? Colors.white : AppColors.textPrimary;
    final subtextColor = isDark ? const Color(0xFFB0B7C3) : AppColors.textSecondary;

    return Scaffold(
      backgroundColor: scaffoldBg,
      appBar: AppBar(
        title: Text(
          'AI Learning Intelligence',
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
        actions: [
          IconButton(
            tooltip: 'Re-analyze with AI',
            icon: _isAnalyzing
                ? const SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.primary),
                  )
                : const Icon(Icons.auto_awesome, color: AppColors.primary),
            onPressed: _isAnalyzing ? null : _triggerAnalysis,
          ),
          IconButton(
            tooltip: 'Refresh',
            icon: Icon(Icons.refresh, color: textColor),
            onPressed: _loadData,
          ),
        ],
      ),
      body: FutureBuilder<AiOverviewData>(
        future: _overviewFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const CircularProgressIndicator(color: AppColors.primary),
                  const SizedBox(height: 16),
                  Text(
                    'Analyzing your learning patterns with AI...',
                    style: TextStyle(color: subtextColor, fontSize: 13),
                  ),
                ],
              ),
            );
          }

          if (snapshot.hasError) {
            return Center(
              child: Padding(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.error_outline, size: 48, color: AppColors.danger),
                    const SizedBox(height: 12),
                    Text(
                      'Failed to load AI Intelligence: ${snapshot.error}',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: textColor),
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton.icon(
                      onPressed: _loadData,
                      icon: const Icon(Icons.refresh),
                      label: const Text('Try Again'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        foregroundColor: Colors.white,
                      ),
                    ),
                  ],
                ),
              ),
            );
          }

          final data = snapshot.data!;
          return RefreshIndicator(
            onRefresh: () async => _loadData(),
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
              children: [
                _buildMasteryHeroCard(data, isDark),
                const SizedBox(height: 22),
                _buildFourCategoryHeader(textColor),
                const SizedBox(height: 12),
                _buildFourCategoryGrid(context, data.categories, isDark),
                const SizedBox(height: 24),
                _buildTodayPlanSection(context, data.todayRecommendations, isDark, textColor, subtextColor),
                const SizedBox(height: 24),
                _buildSubjectMasterySection(data.subjectMastery, isDark, textColor, subtextColor),
                const SizedBox(height: 32),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildMasteryHeroCard(AiOverviewData data, bool isDark) {
    final masteryColor = data.overallMastery >= 75
        ? const Color(0xFF10B981)
        : (data.overallMastery >= 50 ? const Color(0xFFF59E0B) : const Color(0xFFEF4444));

    final cardBg = isDark ? const Color(0xFF171A22) : Colors.white;
    final cardBorder = isDark ? const Color(0xFF2E3440) : AppColors.border;
    final primaryTextColor = isDark ? Colors.white : AppColors.textPrimary;
    final secondaryTextColor = isDark ? const Color(0xFFB0B7C3) : AppColors.textSecondary;

    return Container(
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: cardBorder, width: 1.2),
        boxShadow: isDark
            ? [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.35),
                  blurRadius: 16,
                  offset: const Offset(0, 6),
                ),
              ]
            : AppShadows.soft,
      ),
      padding: const EdgeInsets.all(20),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Circular Mastery Gauge
          Stack(
            alignment: Alignment.center,
            children: [
              SizedBox(
                width: 86,
                height: 86,
                child: CircularProgressIndicator(
                  value: (data.overallMastery / 100.0).clamp(0.0, 1.0),
                  strokeWidth: 8,
                  backgroundColor: isDark
                      ? Colors.white.withValues(alpha: 0.08)
                      : const Color(0xFFF0E4D8),
                  valueColor: AlwaysStoppedAnimation<Color>(masteryColor),
                ),
              ),
              Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    '${data.overallMastery.toStringAsFixed(0)}%',
                    style: TextStyle(
                      color: primaryTextColor,
                      fontSize: 22,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  Text(
                    'Mastery',
                    style: TextStyle(
                      color: secondaryTextColor,
                      fontSize: 10,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(width: 20),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Icon(Icons.psychology, color: AppColors.primary, size: 20),
                    const SizedBox(width: 6),
                    Text(
                      'Estimated NEET Score',
                      style: TextStyle(
                        color: secondaryTextColor,
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                RichText(
                  text: TextSpan(
                    children: [
                      TextSpan(
                        text: '${data.predictedNeetScore}',
                        style: TextStyle(
                          color: primaryTextColor,
                          fontSize: 32,
                          fontWeight: FontWeight.w900,
                          letterSpacing: -0.5,
                        ),
                      ),
                      TextSpan(
                        text: ' / 720',
                        style: TextStyle(
                          color: secondaryTextColor,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  '${data.totalTopicsAnalyzed} topics monitored • ${data.masteredTopicsCount} mastered',
                  style: TextStyle(
                    color: secondaryTextColor,
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFourCategoryHeader(Color textColor) {
    return Row(
      children: [
        const Icon(Icons.dashboard_customize_outlined, size: 20, color: AppColors.primary),
        const SizedBox(width: 8),
        Text(
          'Learning Condition Breakdown',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w800,
            color: textColor,
          ),
        ),
      ],
    );
  }

  Widget _buildFourCategoryGrid(BuildContext context, CategoryCounts counts, bool isDark) {
    return GridView.count(
      crossAxisCount: 2,
      crossAxisSpacing: 12,
      mainAxisSpacing: 12,
      childAspectRatio: 1.25,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      children: [
        _buildCategoryCard(
          context: context,
          categoryKey: 'not_studied',
          title: 'Not Studied',
          subtitle: 'Unopened chapters & topics',
          count: counts.notStudiedCount,
          icon: Icons.menu_book_rounded,
          color: const Color(0xFF2563EB), // Blue
          isDark: isDark,
        ),
        _buildCategoryCard(
          context: context,
          categoryKey: 'poorly_understood',
          title: 'Poorly Understood',
          subtitle: 'Scoring low due to neg. marks',
          count: counts.poorlyUnderstoodCount,
          icon: Icons.trending_down_rounded,
          color: const Color(0xFFD97706), // Amber
          isDark: isDark,
        ),
        _buildCategoryCard(
          context: context,
          categoryKey: 'repeated_mistakes',
          title: 'Repeated Mistakes',
          subtitle: 'Tests, Practice & MCQs mistakes',
          count: counts.repeatedMistakesCount,
          icon: Icons.replay_circle_filled_rounded,
          color: const Color(0xFFDC2626), // Red
          isDark: isDark,
        ),
        _buildCategoryCard(
          context: context,
          categoryKey: 'needs_revision',
          title: 'Needs Revision',
          subtitle: 'Forgetting curve decay alerts',
          count: counts.needsRevisionCount,
          icon: Icons.update_rounded,
          color: const Color(0xFF7C3AED), // Purple
          isDark: isDark,
        ),
      ],
    );
  }

  Widget _buildCategoryCard({
    required BuildContext context,
    required String categoryKey,
    required String title,
    required String subtitle,
    required int count,
    required IconData icon,
    required Color color,
    required bool isDark,
  }) {
    final cardBg = isDark ? const Color(0xFF171A22) : Colors.white;
    final cardBorder = isDark ? const Color(0xFF2E3440) : AppColors.border;

    return InkWell(
      onTap: () {
        context.push('/ai-learning/category/$categoryKey');
      },
      borderRadius: BorderRadius.circular(16),
      child: Container(
        decoration: BoxDecoration(
          color: cardBg,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: count > 0 ? color.withValues(alpha: isDark ? 0.45 : 0.35) : cardBorder,
            width: 1.4,
          ),
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
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: color.withValues(alpha: isDark ? 0.20 : 0.12),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(icon, color: color, size: 20),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: count > 0 ? color : (isDark ? const Color(0xFF2E3440) : const Color(0xFFE5E7EB)),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    '$count',
                    style: TextStyle(
                      color: count > 0 ? Colors.white : (isDark ? Colors.white70 : AppColors.textSecondary),
                      fontWeight: FontWeight.w800,
                      fontSize: 13,
                    ),
                  ),
                ),
              ],
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w800,
                    color: isDark ? Colors.white : color,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: TextStyle(
                    fontSize: 10,
                    color: isDark ? const Color(0xFFB0B7C3) : AppColors.textSecondary,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTodayPlanSection(
    BuildContext context,
    List<StudyPlanItem> recommendations,
    bool isDark,
    Color textColor,
    Color subtextColor,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                const Icon(Icons.checklist_rtl_rounded, size: 20, color: AppColors.primary),
                const SizedBox(width: 8),
                Text(
                  "Today's AI Study Plan",
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w800,
                    color: textColor,
                  ),
                ),
              ],
            ),
            TextButton(
              onPressed: () => context.push('/ai-learning/study-plan'),
              child: const Text('View All', style: TextStyle(fontWeight: FontWeight.w700, color: AppColors.primary)),
            ),
          ],
        ),
        const SizedBox(height: 8),
        if (recommendations.isEmpty)
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF171A22) : Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: isDark ? const Color(0xFF2E3440) : AppColors.border),
            ),
            child: Center(
              child: Text(
                'No pending study tasks today! Great job staying ahead.',
                style: TextStyle(color: subtextColor, fontSize: 13),
              ),
            ),
          )
        else
          ...recommendations.take(3).map((rec) => _buildPlanItemCard(context, rec, isDark, textColor, subtextColor)),
      ],
    );
  }

  Widget _buildPlanItemCard(
    BuildContext context,
    StudyPlanItem item,
    bool isDark,
    Color textColor,
    Color subtextColor,
  ) {
    Color badgeColor = AppColors.primary;
    if (item.category == 'REPEATED_MISTAKES') {
      badgeColor = const Color(0xFFDC2626);
    } else if (item.category == 'POORLY_UNDERSTOOD') {
      badgeColor = const Color(0xFFD97706);
    } else if (item.category == 'NEEDS_REVISION') {
      badgeColor = const Color(0xFF7C3AED);
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF171A22) : Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: isDark ? const Color(0xFF2E3440) : AppColors.border),
        boxShadow: isDark ? null : AppShadows.soft,
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
        leading: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: badgeColor.withValues(alpha: isDark ? 0.20 : 0.12),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(
            item.actionType == 'study_chapter'
                ? Icons.menu_book
                : (item.actionType == 'practice_mcqs' ? Icons.format_list_bulleted : Icons.history_edu),
            color: badgeColor,
            size: 20,
          ),
        ),
        title: Text(
          item.title,
          style: TextStyle(
            fontWeight: FontWeight.w700,
            fontSize: 13,
            color: textColor,
          ),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 2),
            Text(
              item.description,
              style: TextStyle(fontSize: 11, color: subtextColor),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            const SizedBox(height: 4),
            Row(
              children: [
                Text(
                  '${item.subject} • ${item.estimatedMinutes} mins',
                  style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: badgeColor),
                ),
              ],
            ),
          ],
        ),
        trailing: Icon(Icons.arrow_forward_ios_rounded, size: 14, color: subtextColor),
        onTap: () {
          context.push('/ai-learning/topic?subject=${Uri.encodeComponent(item.subject)}&topic=${Uri.encodeComponent(item.topic)}');
        },
      ),
    );
  }

  Widget _buildSubjectMasterySection(
    List<SubjectMasteryItem> subjects,
    bool isDark,
    Color textColor,
    Color subtextColor,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const Icon(Icons.bar_chart_rounded, size: 20, color: AppColors.primary),
            const SizedBox(width: 8),
            Text(
              'Subject Mastery Breakdown',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w800,
                color: textColor,
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        ...subjects.map((s) => _buildSubjectMasteryBar(s, isDark, textColor, subtextColor)),
      ],
    );
  }

  Widget _buildSubjectMasteryBar(
    SubjectMasteryItem item,
    bool isDark,
    Color textColor,
    Color subtextColor,
  ) {
    Color barColor = const Color(0xFF2563EB);
    if (item.subject.toLowerCase().contains('chem')) {
      barColor = const Color(0xFF10B981);
    } else if (item.subject.toLowerCase().contains('bio')) {
      barColor = const Color(0xFF7C3AED);
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF171A22) : Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: isDark ? const Color(0xFF2E3440) : AppColors.border),
        boxShadow: isDark ? null : AppShadows.soft,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                item.subject,
                style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: textColor),
              ),
              Text(
                '${item.mastery.toStringAsFixed(0)}% Mastery',
                style: TextStyle(fontWeight: FontWeight.w800, fontSize: 13, color: barColor),
              ),
            ],
          ),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(6),
            child: LinearProgressIndicator(
              value: (item.mastery / 100.0).clamp(0.0, 1.0),
              minHeight: 8,
              backgroundColor: barColor.withValues(alpha: isDark ? 0.20 : 0.12),
              valueColor: AlwaysStoppedAnimation<Color>(barColor),
            ),
          ),
          const SizedBox(height: 6),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('${item.topicCount} topics analyzed', style: TextStyle(fontSize: 11, color: subtextColor)),
              Text('Accuracy: ${item.accuracy.toStringAsFixed(1)}%', style: TextStyle(fontSize: 11, color: subtextColor)),
            ],
          ),
        ],
      ),
    );
  }
}
