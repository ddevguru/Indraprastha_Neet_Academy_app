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
            content: Text('AI Learning Analysis updated with latest test performance!'),
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
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text(
          'AI Learning Intelligence',
          style: TextStyle(fontWeight: FontWeight.w700, fontSize: 18),
        ),
        backgroundColor: AppColors.surface,
        elevation: 0,
        centerTitle: false,
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
            icon: const Icon(Icons.refresh),
            onPressed: _loadData,
          ),
        ],
      ),
      body: FutureBuilder<AiOverviewData>(
        future: _overviewFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  CircularProgressIndicator(color: AppColors.primary),
                  SizedBox(height: 16),
                  Text('Analyzing your learning patterns with AI...', style: TextStyle(color: AppColors.textSecondary)),
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
                      style: const TextStyle(color: AppColors.textPrimary),
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton.icon(
                      onPressed: _loadData,
                      icon: const Icon(Icons.refresh),
                      label: const Text('Try Again'),
                      style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary),
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
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
              children: [
                _buildMasteryHeroCard(data),
                const SizedBox(height: 20),
                _buildFourCategoryHeader(),
                const SizedBox(height: 12),
                _buildFourCategoryGrid(context, data.categories),
                const SizedBox(height: 24),
                _buildTodayPlanSection(context, data.todayRecommendations),
                const SizedBox(height: 24),
                _buildSubjectMasterySection(data.subjectMastery),
                const SizedBox(height: 32),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildMasteryHeroCard(AiOverviewData data) {
    return Container(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.12),
            blurRadius: 16,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Circular Mastery Gauge
              Stack(
                alignment: Alignment.center,
                children: [
                  SizedBox(
                    width: 84,
                    height: 84,
                    child: CircularProgressIndicator(
                      value: (data.overallMastery / 100.0).clamp(0.0, 1.0),
                      strokeWidth: 8,
                      backgroundColor: Colors.white12,
                      valueColor: AlwaysStoppedAnimation<Color>(
                        data.overallMastery >= 75
                            ? const Color(0xFF10B981)
                            : (data.overallMastery >= 50 ? const Color(0xFFF59E0B) : const Color(0xFFEF4444)),
                      ),
                    ),
                  ),
                  Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        '${data.overallMastery.toStringAsFixed(0)}%',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 22,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      const Text(
                        'Mastery',
                        style: TextStyle(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.w500),
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
                        const Icon(Icons.psychology, color: AppColors.accentLight, size: 20),
                        const SizedBox(width: 6),
                        Text(
                          'Estimated NEET Score',
                          style: TextStyle(color: Colors.white.withOpacity(0.85), fontSize: 13, fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    RichText(
                      text: TextSpan(
                        children: [
                          TextSpan(
                            text: '${data.predictedNeetScore}',
                            style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w900),
                          ),
                          const TextSpan(
                            text: ' / 720',
                            style: TextStyle(color: Colors.white60, fontSize: 16, fontWeight: FontWeight.w500),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      '${data.totalTopicsAnalyzed} topics monitored • ${data.masteredTopicsCount} mastered',
                      style: const TextStyle(color: Colors.white70, fontSize: 12),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildFourCategoryHeader() {
    return const Row(
      children: [
        Icon(Icons.dashboard_customize_outlined, size: 20, color: AppColors.primary),
        SizedBox(width: 8),
        Text(
          'Learning Condition Breakdown',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w700,
            color: AppColors.textPrimary,
          ),
        ),
      ],
    );
  }

  Widget _buildFourCategoryGrid(BuildContext context, CategoryCounts counts) {
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
          bgColor: const Color(0xFFEFF6FF),
        ),
        _buildCategoryCard(
          context: context,
          categoryKey: 'poorly_understood',
          title: 'Poorly Understood',
          subtitle: 'Studied but accuracy < 52%',
          count: counts.poorlyUnderstoodCount,
          icon: Icons.trending_down_rounded,
          color: const Color(0xFFD97706), // Amber
          bgColor: const Color(0xFFFFFBEB),
        ),
        _buildCategoryCard(
          context: context,
          categoryKey: 'repeated_mistakes',
          title: 'Repeated Mistakes',
          subtitle: 'Persistent errors across tests',
          count: counts.repeatedMistakesCount,
          icon: Icons.replay_circle_filled_rounded,
          color: const Color(0xFFDC2626), // Red
          bgColor: const Color(0xFFFEF2F2),
        ),
        _buildCategoryCard(
          context: context,
          categoryKey: 'needs_revision',
          title: 'Needs Revision',
          subtitle: 'Forgetting curve decay alerts',
          count: counts.needsRevisionCount,
          icon: Icons.update_rounded,
          color: const Color(0xFF7C3AED), // Purple
          bgColor: const Color(0xFFF5F3FF),
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
    required Color bgColor,
  }) {
    return InkWell(
      onTap: () {
        context.push('/ai-learning/category/$categoryKey');
      },
      borderRadius: BorderRadius.circular(16),
      child: Container(
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: color.withOpacity(0.25), width: 1.5),
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
                    color: color.withOpacity(0.15),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(icon, color: color, size: 20),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: color,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    '$count',
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w800,
                      fontSize: 14,
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
                    fontSize: 14,
                    fontWeight: FontWeight.w800,
                    color: color,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: const TextStyle(
                    fontSize: 10,
                    color: AppColors.textSecondary,
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

  Widget _buildTodayPlanSection(BuildContext context, List<StudyPlanItem> recommendations) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Row(
              children: [
                Icon(Icons.checklist_rtl_rounded, size: 20, color: AppColors.primary),
                SizedBox(width: 8),
                Text(
                  "Today's AI Study Plan",
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: AppColors.textPrimary,
                  ),
                ),
              ],
            ),
            TextButton(
              onPressed: () => context.push('/ai-learning/study-plan'),
              child: const Text('View All', style: TextStyle(fontWeight: FontWeight.w700)),
            ),
          ],
        ),
        const SizedBox(height: 8),
        if (recommendations.isEmpty)
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppColors.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.border),
            ),
            child: const Center(
              child: Text(
                'No pending study tasks today! Great job staying ahead.',
                style: TextStyle(color: AppColors.textSecondary),
              ),
            ),
          )
        else
          ...recommendations.take(3).map((rec) => _buildPlanItemCard(context, rec)),
      ],
    );
  }

  Widget _buildPlanItemCard(BuildContext context, StudyPlanItem item) {
    Color badgeColor = AppColors.primary;
    if (item.category == 'REPEATED_MISTAKES') badgeColor = const Color(0xFFDC2626);
    else if (item.category == 'POORLY_UNDERSTOOD') badgeColor = const Color(0xFFD97706);
    else if (item.category == 'NEEDS_REVISION') badgeColor = const Color(0xFF7C3AED);

    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.border),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
        leading: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: badgeColor.withOpacity(0.12),
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
          style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13, color: AppColors.textPrimary),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 2),
            Text(
              item.description,
              style: const TextStyle(fontSize: 11, color: AppColors.textSecondary),
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
        trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 14, color: AppColors.textSecondary),
        onTap: () {
          context.push('/ai-learning/topic?subject=${Uri.encodeComponent(item.subject)}&topic=${Uri.encodeComponent(item.topic)}');
        },
      ),
    );
  }

  Widget _buildSubjectMasterySection(List<SubjectMasteryItem> subjects) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Row(
          children: [
            Icon(Icons.bar_chart_rounded, size: 20, color: AppColors.primary),
            SizedBox(width: 8),
            Text(
              'Subject Mastery Breakdown',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                color: AppColors.textPrimary,
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        ...subjects.map((s) => _buildSubjectMasteryBar(s)),
      ],
    );
  }

  Widget _buildSubjectMasteryBar(SubjectMasteryItem item) {
    Color barColor = const Color(0xFF2563EB);
    if (item.subject.toLowerCase().contains('chem')) barColor = const Color(0xFF10B981);
    else if (item.subject.toLowerCase().contains('bio')) barColor = const Color(0xFF7C3AED);

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                item.subject,
                style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: AppColors.textPrimary),
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
              backgroundColor: barColor.withOpacity(0.12),
              valueColor: AlwaysStoppedAnimation<Color>(barColor),
            ),
          ),
          const SizedBox(height: 6),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('${item.topicCount} topics analyzed', style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
              Text('Accuracy: ${item.accuracy.toStringAsFixed(1)}%', style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
            ],
          ),
        ],
      ),
    );
  }
}

