import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../theme/app_tokens.dart';
import '../models/ai_intelligence_models.dart';
import '../services/ai_intelligence_repository.dart';

class StudyPlanScreen extends ConsumerStatefulWidget {
  const StudyPlanScreen({super.key});

  @override
  ConsumerState<StudyPlanScreen> createState() => _StudyPlanScreenState();
}

class _StudyPlanScreenState extends ConsumerState<StudyPlanScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  late Future<StudyPlanData> _planFuture;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _loadPlan();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _loadPlan() {
    setState(() {
      _planFuture = ref.read(aiIntelligenceRepositoryProvider).fetchStudyPlan();
    });
  }

  Future<void> _completeTask(StudyPlanItem item) async {
    try {
      await ref.read(aiIntelligenceRepositoryProvider).completeRecommendation(item.id);
      _loadPlan();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Completed: "${item.title}"!'),
            backgroundColor: AppColors.success,
            duration: const Duration(seconds: 2),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to update task: $e'),
            backgroundColor: AppColors.danger,
          ),
        );
      }
    }
  }

  Color _getCategoryColor(String category) {
    if (category == 'REPEATED_MISTAKES') return const Color(0xFFDC2626);
    if (category == 'POORLY_UNDERSTOOD') return const Color(0xFFD97706);
    if (category == 'NEEDS_REVISION') return const Color(0xFF7C3AED);
    return const Color(0xFF2563EB); // NOT_STUDIED
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final scaffoldBg = Theme.of(context).scaffoldBackgroundColor;
    final textColor = isDark ? Colors.white : AppColors.textPrimary;
    final subtextColor = isDark ? const Color(0xFFB0B7C3) : AppColors.textSecondary;
    final tabBg = isDark ? const Color(0xFF171A22) : Colors.white;

    return Scaffold(
      backgroundColor: scaffoldBg,
      appBar: AppBar(
        title: Text(
          'Personalized Study Plan',
          style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18, color: textColor),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
        iconTheme: IconThemeData(color: textColor),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(48),
          child: Container(
            color: tabBg,
            child: TabBar(
              controller: _tabController,
              indicatorColor: AppColors.primary,
              labelColor: AppColors.primary,
              unselectedLabelColor: subtextColor,
              labelStyle: const TextStyle(fontWeight: FontWeight.w800, fontSize: 13),
              tabs: const [
                Tab(text: 'Pending Tasks'),
                Tab(text: 'Completed Tasks'),
              ],
            ),
          ),
        ),
      ),
      body: FutureBuilder<StudyPlanData>(
        future: _planFuture,
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
                    const Icon(Icons.error_outline, size: 48, color: AppColors.danger),
                    const SizedBox(height: 12),
                    Text(
                      'Failed to load study plan: ${snapshot.error}',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: textColor),
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: _loadPlan,
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

          final plan = snapshot.data!;
          return Column(
            children: [
              _buildSummaryHeader(plan, isDark, subtextColor),
              Expanded(
                child: TabBarView(
                  controller: _tabController,
                  children: [
                    _buildTasksList(plan.pendingTasks, isPending: true, isDark: isDark, textColor: textColor, subtextColor: subtextColor),
                    _buildTasksList(plan.completedTasks, isPending: false, isDark: isDark, textColor: textColor, subtextColor: subtextColor),
                  ],
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildSummaryHeader(StudyPlanData plan, bool isDark, Color subtextColor) {
    final barBg = isDark ? const Color(0xFF171A22) : Colors.white;
    final borderColor = isDark ? const Color(0xFF2E3440) : AppColors.border;

    return Container(
      color: barBg,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(color: borderColor, width: 1)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildSummaryItem('Pending Tasks', '${plan.pendingCount}', AppColors.primary, subtextColor),
          _buildSummaryItem('Completed', '${plan.completedCount}', AppColors.success, subtextColor),
          _buildSummaryItem('Est. Time', '${plan.totalEstimatedMinutes}m', const Color(0xFF7C3AED), subtextColor),
        ],
      ),
    );
  }

  Widget _buildSummaryItem(String label, String value, Color color, Color subtextColor) {
    return Column(
      children: [
        Text(value, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: color)),
        const SizedBox(height: 2),
        Text(label, style: TextStyle(fontSize: 11, color: subtextColor, fontWeight: FontWeight.w500)),
      ],
    );
  }

  Widget _buildTasksList(
    List<StudyPlanItem> tasks, {
    required bool isPending,
    required bool isDark,
    required Color textColor,
    required Color subtextColor,
  }) {
    if (tasks.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                isPending ? Icons.task_alt_rounded : Icons.history_rounded,
                size: 56,
                color: isPending ? AppColors.success : subtextColor,
              ),
              const SizedBox(height: 16),
              Text(
                isPending ? 'All tasks complete! You are fully on track.' : 'No completed tasks recorded yet.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: textColor),
              ),
            ],
          ),
        ),
      );
    }

    final cardBg = isDark ? const Color(0xFF171A22) : Colors.white;
    final cardBorder = isDark ? const Color(0xFF2E3440) : AppColors.border;
    final tagBg = isDark ? const Color(0xFF1F242E) : const Color(0xFFFFF8F2);

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: tasks.length,
      itemBuilder: (context, index) {
        final item = tasks[index];
        final catColor = _getCategoryColor(item.category);

        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          decoration: BoxDecoration(
            color: cardBg,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: cardBorder, width: 1.2),
            boxShadow: isDark ? null : AppShadows.soft,
          ),
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (isPending)
                  Padding(
                    padding: const EdgeInsets.only(top: 2, right: 10),
                    child: IconButton(
                      icon: Icon(Icons.circle_outlined, color: subtextColor, size: 24),
                      onPressed: () => _completeTask(item),
                      tooltip: 'Mark Complete',
                    ),
                  )
                else
                  const Padding(
                    padding: EdgeInsets.only(top: 8, right: 12),
                    child: Icon(Icons.check_circle_rounded, color: AppColors.success, size: 22),
                  ),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: catColor.withValues(alpha: isDark ? 0.22 : 0.12),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              item.category.replaceAll('_', ' '),
                              style: TextStyle(color: catColor, fontWeight: FontWeight.w800, fontSize: 10),
                            ),
                          ),
                          Text(
                            '${item.estimatedMinutes} min',
                            style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: subtextColor),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Text(
                        item.title,
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w800,
                          color: isPending ? textColor : subtextColor,
                          decoration: isPending ? null : TextDecoration.lineThrough,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        item.description,
                        style: TextStyle(fontSize: 12, color: subtextColor, height: 1.3),
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: tagBg,
                              borderRadius: BorderRadius.circular(6),
                              border: Border.all(color: cardBorder, width: 0.8),
                            ),
                            child: Text(
                              '${item.subject} • ${item.chapter}',
                              style: TextStyle(fontSize: 10, color: subtextColor, fontWeight: FontWeight.w600),
                            ),
                          ),
                          const Spacer(),
                          if (isPending)
                            TextButton.icon(
                              onPressed: () {
                                context.push('/ai-learning/topic?subject=${Uri.encodeComponent(item.subject)}&topic=${Uri.encodeComponent(item.topic)}');
                              },
                              icon: const Icon(Icons.arrow_forward, size: 14),
                              label: const Text('Start', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800)),
                              style: TextButton.styleFrom(
                                foregroundColor: AppColors.primary,
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              ),
                            ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
