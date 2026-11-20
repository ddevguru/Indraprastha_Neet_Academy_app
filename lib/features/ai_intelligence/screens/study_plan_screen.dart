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
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Personalized Study Plan', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 18)),
        backgroundColor: AppColors.surface,
        elevation: 0,
        centerTitle: false,
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppColors.primary,
          labelColor: AppColors.primary,
          unselectedLabelColor: AppColors.textSecondary,
          labelStyle: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14),
          tabs: const [
            Tab(text: 'Pending Tasks'),
            Tab(text: 'Completed Tasks'),
          ],
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
                    Text('Failed to load study plan: ${snapshot.error}', textAlign: TextAlign.center),
                    const SizedBox(height: 16),
                    ElevatedButton(onPressed: _loadPlan, child: const Text('Retry')),
                  ],
                ),
              ),
            );
          }

          final plan = snapshot.data!;
          return Column(
            children: [
              _buildSummaryHeader(plan),
              Expanded(
                child: TabBarView(
                  controller: _tabController,
                  children: [
                    _buildTasksList(plan.pendingTasks, isPending: true),
                    _buildTasksList(plan.completedTasks, isPending: false),
                  ],
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildSummaryHeader(StudyPlanData plan) {
    return Container(
      color: AppColors.surface,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildSummaryItem('Pending', '${plan.pendingCount}', AppColors.primary),
          _buildSummaryItem('Completed', '${plan.completedCount}', AppColors.success),
          _buildSummaryItem('Est. Time', '${plan.totalEstimatedMinutes}m', const Color(0xFF7C3AED)),
        ],
      ),
    );
  }

  Widget _buildSummaryItem(String label, String value, Color color) {
    return Column(
      children: [
        Text(value, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: color)),
        const SizedBox(height: 2),
        Text(label, style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
      ],
    );
  }

  Widget _buildTasksList(List<StudyPlanItem> tasks, {required bool isPending}) {
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
                color: isPending ? AppColors.success : AppColors.textSecondary,
              ),
              const SizedBox(height: 16),
              Text(
                isPending ? 'All tasks complete! You are fully on track.' : 'No completed tasks recorded yet.',
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: AppColors.textPrimary),
              ),
            ],
          ),
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: tasks.length,
      itemBuilder: (context, index) {
        final item = tasks[index];
        final catColor = _getCategoryColor(item.category);

        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppColors.border),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.02),
                blurRadius: 6,
                offset: const Offset(0, 2),
              ),
            ],
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
                      icon: const Icon(Icons.circle_outlined, color: AppColors.textSecondary, size: 24),
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
                              color: catColor.withOpacity(0.12),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              item.category.replaceAll('_', ' '),
                              style: TextStyle(color: catColor, fontWeight: FontWeight.w800, fontSize: 10),
                            ),
                          ),
                          Text(
                            '${item.estimatedMinutes} min',
                            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.textSecondary),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Text(
                        item.title,
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w800,
                          color: isPending ? AppColors.textPrimary : AppColors.textSecondary,
                          decoration: isPending ? null : TextDecoration.lineThrough,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        item.description,
                        style: const TextStyle(fontSize: 12, color: AppColors.textSecondary, height: 1.3),
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: AppColors.backgroundAlt,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              '${item.subject} • ${item.chapter}',
                              style: const TextStyle(fontSize: 10, color: AppColors.textSecondary),
                            ),
                          ),
                          const Spacer(),
                          if (isPending)
                            TextButton.icon(
                              onPressed: () {
                                context.push('/ai-learning/topic?subject=${Uri.encodeComponent(item.subject)}&topic=${Uri.encodeComponent(item.topic)}');
                              },
                              icon: const Icon(Icons.arrow_forward, size: 14),
                              label: const Text('Start', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
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

