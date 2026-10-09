import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/providers/app_state.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import '../practice/practice_screens.dart';
import 'widgets/test_radar_chart.dart';

class TestPerformanceAnalyticsScreen extends ConsumerStatefulWidget {
  final int testId;
  final Map<String, dynamic>? preloadedData;
  final VoidCallback? onReviewAnswers;
  final VoidCallback? onDownloadPdf;

  const TestPerformanceAnalyticsScreen({
    super.key,
    required this.testId,
    this.preloadedData,
    this.onReviewAnswers,
    this.onDownloadPdf,
  });

  @override
  ConsumerState<TestPerformanceAnalyticsScreen> createState() => _TestPerformanceAnalyticsScreenState();
}

class _TestPerformanceAnalyticsScreenState extends ConsumerState<TestPerformanceAnalyticsScreen> {
  late Future<Map<String, dynamic>> _analyticsFuture;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  void _loadData() {
    if (widget.preloadedData != null && widget.preloadedData!['subjects'] != null) {
      _analyticsFuture = Future.value(widget.preloadedData!);
    } else {
      _analyticsFuture = ref.read(contentRepositoryProvider).fetchTestPerformanceAnalysis(widget.testId);
    }
  }

  List<Map<String, dynamic>> _castMapList(dynamic list) {
    if (list is! List) return [];
    return list.whereType<Map>().map((m) => Map<String, dynamic>.from(m)).toList();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final scheme = theme.colorScheme;
    final isDark = theme.brightness == Brightness.dark;

    return FutureBuilder<Map<String, dynamic>>(
      future: _analyticsFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Scaffold(
            appBar: AppBar(title: const Text('Performance Analytics')),
            body: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircularProgressIndicator(color: scheme.primary),
                  const SizedBox(height: 20),
                  Text(
                    'Analyzing your performance...',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: scheme.onSurface,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Your AI mentor is preparing your analysis...',
                    style: TextStyle(
                      fontSize: 13,
                      color: scheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
          );
        }

        if (snapshot.hasError) {
          return Scaffold(
            appBar: AppBar(title: const Text('Performance Analytics')),
            body: Center(
              child: Padding(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.error_outline_rounded, color: Colors.redAccent, size: 48),
                    const SizedBox(height: 16),
                    Text(
                      'Failed to load analytics',
                      style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      snapshot.error.toString(),
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 13, color: scheme.onSurfaceVariant),
                    ),
                    const SizedBox(height: 20),
                    PrimaryButton(
                      label: 'Retry Analysis',
                      icon: Icons.refresh_rounded,
                      onPressed: () {
                        setState(() {
                          _analyticsFuture = ref.read(contentRepositoryProvider).fetchTestPerformanceAnalysis(widget.testId);
                        });
                      },
                    ),
                  ],
                ),
              ),
            ),
          );
        }

        final data = snapshot.data ?? {};
        final test = data['test'] is Map ? Map<String, dynamic>.from(data['test'] as Map) : <String, dynamic>{};
        final student = data['student'] is Map ? Map<String, dynamic>.from(data['student'] as Map) : <String, dynamic>{};
        final benchmark = data['benchmark'] is Map ? Map<String, dynamic>.from(data['benchmark'] as Map) : <String, dynamic>{};
        final subjects = _castMapList(data['subjects']);
        final weakTopics = _castMapList(data['weak_topics']);
        final strongTopics = _castMapList(data['strong_topics']);
        final priorityAreas = _castMapList(data['priority_areas']);
        final historicalPerf = _castMapList(data['historical_performance']);
        final topicImprovement = _castMapList(data['topic_improvement']);
        final recommendedPractice = _castMapList(data['recommended_practice']);
        final aiAnalysis = data['ai_analysis'] is Map ? Map<String, dynamic>.from(data['ai_analysis'] as Map) : <String, dynamic>{};

        return Scaffold(
          appBar: AppBar(
            title: Text(test['name']?.toString() ?? 'Test Performance Analytics'),
            elevation: 0,
          ),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: CenteredContent(
              maxWidth: 900,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // 1. Score & Rank Summary Header Card
                  _buildHeaderCard(context, test, student, benchmark),

                  const SizedBox(height: 16),

                  // 2. Performance Category Card
                  _buildCategoryCard(context, student['performance_category']?.toString() ?? 'Average', isDark),

                  const SizedBox(height: 20),

                  // 3. Radar Chart (Top 100 vs Student)
                  _buildRadarChartCard(context, subjects, isDark),

                  const SizedBox(height: 20),

                  // 4. Subject Performance Cards
                  _buildSubjectCardsSection(context, subjects, isDark),

                  const SizedBox(height: 20),

                  // 5. Overall Average vs Top 100 Comparison Cards
                  _buildOverallBenchmarkCard(context, benchmark, isDark),

                  const SizedBox(height: 20),

                  // 6. Priority Areas Section
                  if (priorityAreas.isNotEmpty) _buildPriorityAreasCard(context, priorityAreas, isDark),

                  const SizedBox(height: 20),

                  // 7. Weak Topics & Strong Topics Sections
                  LayoutBuilder(
                    builder: (context, constraints) {
                      final isWide = constraints.maxWidth > 550;
                      if (isWide) {
                        return Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(child: _buildTopicsCard(context, 'Weak Topics', weakTopics, isDark ? const Color(0xFFF87171) : const Color(0xFFDC2626), Icons.warning_amber_rounded, isDark)),
                            const SizedBox(width: 12),
                            Expanded(child: _buildTopicsCard(context, 'Strong Topics', strongTopics, isDark ? const Color(0xFF34D399) : const Color(0xFF059669), Icons.check_circle_outline_rounded, isDark)),
                          ],
                        );
                      }
                      return Column(
                        children: [
                          _buildTopicsCard(context, 'Weak Topics', weakTopics, isDark ? const Color(0xFFF87171) : const Color(0xFFDC2626), Icons.warning_amber_rounded, isDark),
                          const SizedBox(height: 12),
                          _buildTopicsCard(context, 'Strong Topics', strongTopics, isDark ? const Color(0xFF34D399) : const Color(0xFF059669), Icons.check_circle_outline_rounded, isDark),
                        ],
                      );
                    },
                  ),

                  const SizedBox(height: 20),

                  // 8. Historical Performance & Topic Improvement Section
                  if (historicalPerf.isNotEmpty || topicImprovement.isNotEmpty)
                    _buildHistoricalImprovementCard(context, historicalPerf, topicImprovement, isDark),

                  const SizedBox(height: 20),

                  // 9. Recommended Practice from Database
                  _buildRecommendedPracticeSection(context, recommendedPractice, isDark),

                  const SizedBox(height: 20),

                  // 10. AI Mentor Analysis Card
                  _buildAiMentorCard(context, aiAnalysis, isDark),

                  const SizedBox(height: 24),

                  // 11. Question Review & Action Buttons
                  if (widget.onReviewAnswers != null || widget.onDownloadPdf != null)
                    _buildActionButtons(context),

                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildHeaderCard(BuildContext context, Map<String, dynamic> test, Map<String, dynamic> student, Map<String, dynamic> benchmark) {
    final score = (student['score'] as num?)?.toInt() ?? 0;
    final maxScore = (test['maximum_score'] as num?)?.toInt() ?? 720;
    final rank = (student['rank'] as num?)?.toInt() ?? 1;
    final totalParticipants = (student['total_participants'] as num?)?.toInt() ?? (benchmark['overall_participant_count'] as num?)?.toInt() ?? 1;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: AppGradients.primary,
        borderRadius: BorderRadius.circular(AppRadii.lg),
        boxShadow: AppShadows.soft,
      ),
      child: Column(
        children: [
          Text(
            test['name']?.toString() ?? 'NEET Test Analysis',
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Column(
                children: [
                  Text(
                    'YOUR SCORE',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: Colors.white.withValues(alpha: 0.8),
                    ),
                  ),
                  const SizedBox(height: 4),
                  RichText(
                    text: TextSpan(
                      text: '$score',
                      style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Color(0xFF38BDF8)),
                      children: [
                        TextSpan(
                          text: ' / $maxScore',
                          style: TextStyle(fontSize: 14, color: Colors.white.withValues(alpha: 0.8)),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              Container(width: 1, height: 40, color: Colors.white.withValues(alpha: 0.25)),
              Column(
                children: [
                  Text(
                    'ALL INDIA RANK',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: Colors.white.withValues(alpha: 0.8),
                    ),
                  ),
                  const SizedBox(height: 4),
                  RichText(
                    text: TextSpan(
                      text: '#$rank',
                      style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Color(0xFFFBBF24)),
                      children: [
                        TextSpan(
                          text: ' of $totalParticipants',
                          style: TextStyle(fontSize: 13, color: Colors.white.withValues(alpha: 0.8)),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryCard(BuildContext context, String category, bool isDark) {
    Color badgeColor = isDark ? const Color(0xFF60A5FA) : const Color(0xFF2563EB);
    IconData icon = Icons.star_rounded;

    if (category == 'Excellent') {
      badgeColor = isDark ? const Color(0xFF34D399) : const Color(0xFF059669);
      icon = Icons.workspace_premium_rounded;
    } else if (category == 'Strong') {
      badgeColor = isDark ? const Color(0xFF38BDF8) : const Color(0xFF0284C7);
      icon = Icons.thumb_up_alt_rounded;
    } else if (category == 'Above Average') {
      badgeColor = isDark ? const Color(0xFFA78BFA) : const Color(0xFF7C3AED);
      icon = Icons.trending_up_rounded;
    } else if (category == 'Needs Improvement') {
      badgeColor = isDark ? const Color(0xFFF87171) : const Color(0xFFDC2626);
      icon = Icons.priority_high_rounded;
    }

    final scheme = Theme.of(context).colorScheme;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: badgeColor.withValues(alpha: isDark ? 0.15 : 0.08),
        borderRadius: BorderRadius.circular(AppRadii.md),
        border: Border.all(color: badgeColor.withValues(alpha: 0.35)),
      ),
      child: Row(
        children: [
          Icon(icon, color: badgeColor, size: 24),
          const SizedBox(width: 12),
          Text(
            'Performance Category:',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: scheme.onSurface,
            ),
          ),
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: badgeColor,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              category,
              style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRadarChartCard(BuildContext context, List<Map<String, dynamic>> subjects, bool isDark) {
    final scheme = Theme.of(context).colorScheme;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF171A22) : Colors.white,
        borderRadius: BorderRadius.circular(AppRadii.lg),
        border: Border.all(color: scheme.outlineVariant),
        boxShadow: AppShadows.soft,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Performance vs Top 20 Benchmark',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: scheme.onSurface,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'Visual radar comparison of your score polygon vs Top 20 average polygon.',
            style: TextStyle(fontSize: 12, color: scheme.onSurfaceVariant),
          ),
          const SizedBox(height: 16),
          TestRadarChart(subjects: subjects, height: 260),
        ],
      ),
    );
  }

  Widget _buildSubjectCardsSection(BuildContext context, List<Map<String, dynamic>> subjects, bool isDark) {
    final scheme = Theme.of(context).colorScheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Subject Performance Breakdown',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: scheme.onSurface,
          ),
        ),
        const SizedBox(height: 12),
        for (final s in subjects) ...[
          Container(
            margin: const EdgeInsets.only(bottom: 10),
            padding: const EdgeInsets.all(14.0),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF171A22) : Colors.white,
              borderRadius: BorderRadius.circular(AppRadii.md),
              border: Border.all(color: scheme.outlineVariant),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text(
                            (s['subject'] ?? 'Subject').toString(),
                            style: TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.bold,
                              color: scheme.onSurface,
                            ),
                          ),
                          const SizedBox(width: 8),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(
                              color: _getStatusColor(s['status']?.toString() ?? '', isDark).withValues(alpha: isDark ? 0.2 : 0.1),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              (s['status'] ?? 'Average').toString(),
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: _getStatusColor(s['status']?.toString() ?? '', isDark),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          Text('Your Score: ', style: TextStyle(fontSize: 12, color: scheme.onSurfaceVariant)),
                          Text(
                            '${(s['student_score'] as num?)?.toInt() ?? 0} / ${(s['max_score'] as num?)?.toInt() ?? 180}',
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                              color: scheme.onSurface,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      'Top 20 Avg: ${(s['top20_average'] ?? s['top100_average'] as num?)?.toInt() ?? 0}',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: isDark ? const Color(0xFFFBBF24) : const Color(0xFFD97706),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Overall Avg: ${(s['overall_average'] as num?)?.toInt() ?? 0}',
                      style: TextStyle(fontSize: 11, color: scheme.onSurfaceVariant),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ],
    );
  }

  Color _getStatusColor(String status, bool isDark) {
    if (status == 'Excellent' || status == 'Strong') {
      return isDark ? const Color(0xFF34D399) : const Color(0xFF059669);
    }
    if (status == 'Needs Improvement') {
      return isDark ? const Color(0xFFF87171) : const Color(0xFFDC2626);
    }
    return isDark ? const Color(0xFF60A5FA) : const Color(0xFF2563EB);
  }

  Widget _buildOverallBenchmarkCard(BuildContext context, Map<String, dynamic> benchmark, bool isDark) {
    final overallAvg = (benchmark['overall_average_score'] as num?)?.toInt() ?? 0;
    final top100Avg = (benchmark['top20_average_score'] ?? benchmark['top100_average_score'] as num?)?.toInt() ?? 0;
    final top100Count = (benchmark['top20_count'] ?? benchmark['top100_count'] as num?)?.toInt() ?? 20;
    final totalCount = (benchmark['overall_participant_count'] as num?)?.toInt() ?? 1;

    final scheme = Theme.of(context).colorScheme;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF171A22) : Colors.white,
        borderRadius: BorderRadius.circular(AppRadii.lg),
        border: Border.all(color: scheme.outlineVariant),
        boxShadow: AppShadows.soft,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Test Overall Statistics',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: scheme.onSurface,
            ),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: isDark ? const Color(0xFF252A35) : const Color(0xFFF1F5F9),
                    borderRadius: BorderRadius.circular(AppRadii.sm),
                  ),
                  child: Column(
                    children: [
                      Text(
                        'Overall Test Average',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: scheme.onSurfaceVariant,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '$overallAvg',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: scheme.onSurface,
                        ),
                      ),
                      Text(
                        'All $totalCount candidates',
                        style: TextStyle(fontSize: 10, color: scheme.onSurfaceVariant),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: isDark ? const Color(0xFF332612) : const Color(0xFFFEF3C7),
                    borderRadius: BorderRadius.circular(AppRadii.sm),
                  ),
                  child: Column(
                    children: [
                      Text(
                        'Top Benchmark Average',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: isDark ? const Color(0xFFFCD34D) : const Color(0xFF92400E),
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '$top100Avg',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: isDark ? const Color(0xFFFBBF24) : const Color(0xFFD97706),
                        ),
                      ),
                      Text(
                        'Top $top100Count candidates',
                        style: TextStyle(
                          fontSize: 10,
                          color: isDark ? const Color(0xFFFDE68A) : const Color(0xFFB45309),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPriorityAreasCard(BuildContext context, List<Map<String, dynamic>> priorityAreas, bool isDark) {
    final scheme = Theme.of(context).colorScheme;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF2E2211) : const Color(0xFFFFFBEB),
        borderRadius: BorderRadius.circular(AppRadii.lg),
        border: Border.all(
          color: isDark ? const Color(0xFF78350F) : const Color(0xFFFDE68A),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.stars_rounded,
                color: isDark ? const Color(0xFFFBBF24) : const Color(0xFFD97706),
                size: 22,
              ),
              const SizedBox(width: 8),
              Text(
                'Top Priority Revision Areas',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: isDark ? const Color(0xFFFBBF24) : const Color(0xFF92400E),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          for (final p in priorityAreas) ...[
            Padding(
              padding: const EdgeInsets.only(bottom: 8.0),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 11,
                    backgroundColor: AppColors.primary,
                    child: Text(
                      '${(p['priority'] as num?)?.toInt() ?? 1}',
                      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      '${(p['subject'] ?? '')} → ${(p['topic'] ?? '')}',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                        color: isDark ? scheme.onSurface : const Color(0xFF78350F),
                      ),
                    ),
                  ),
                  Text(
                    '${(p['score_percentage'] as num?)?.toInt() ?? 0}% score',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: isDark ? const Color(0xFFFCD34D) : const Color(0xFFB45309),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildTopicsCard(BuildContext context, String title, List<Map<String, dynamic>> topics, Color color, IconData icon, bool isDark) {
    final scheme = Theme.of(context).colorScheme;

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF171A22) : Colors.white,
        borderRadius: BorderRadius.circular(AppRadii.md),
        border: Border.all(color: scheme.outlineVariant),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 18),
              const SizedBox(width: 6),
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: color),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          if (topics.isEmpty)
            Text(
              'None detected',
              style: TextStyle(fontSize: 12, color: scheme.onSurfaceVariant),
            )
          else
            for (final t in topics) ...[
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 3),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        (t['topic'] ?? t['name'] ?? '').toString(),
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: scheme.onSurface,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    Text(
                      '${(t['score_percentage'] ?? t['accuracy'] as num?)?.toInt() ?? 0}%',
                      style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: color),
                    ),
                  ],
                ),
              ),
            ],
        ],
      ),
    );
  }

  Widget _buildHistoricalImprovementCard(BuildContext context, List<Map<String, dynamic>> history, List<Map<String, dynamic>> improvements, bool isDark) {
    final scheme = Theme.of(context).colorScheme;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF171A22) : Colors.white,
        borderRadius: BorderRadius.circular(AppRadii.lg),
        border: Border.all(color: scheme.outlineVariant),
        boxShadow: AppShadows.soft,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Historical Progress & Improvement',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: scheme.onSurface,
            ),
          ),
          const SizedBox(height: 12),
          if (improvements.isNotEmpty) ...[
            Text(
              'Topic Level Improvements:',
              style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: scheme.onSurfaceVariant),
            ),
            const SizedBox(height: 8),
            for (final imp in improvements) ...[
              Padding(
                padding: const EdgeInsets.only(bottom: 6),
                child: Row(
                  children: [
                    Icon(
                      ((imp['improvement'] as num?)?.toInt() ?? 0) >= 0 ? Icons.trending_up_rounded : Icons.trending_down_rounded,
                      color: ((imp['improvement'] as num?)?.toInt() ?? 0) >= 0
                          ? (isDark ? const Color(0xFF34D399) : Colors.green)
                          : (isDark ? const Color(0xFFF87171) : Colors.red),
                      size: 18,
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        '${(imp['topic'] ?? '')}: ${(imp['previous_percentage'] as num?)?.toInt() ?? 0}% → ${(imp['current_percentage'] as num?)?.toInt() ?? 0}%',
                        style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: scheme.onSurface),
                      ),
                    ),
                    Text(
                      '${((imp['improvement'] as num?)?.toInt() ?? 0) >= 0 ? '+' : ''}${(imp['improvement'] as num?)?.toInt() ?? 0}%',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                        color: ((imp['improvement'] as num?)?.toInt() ?? 0) >= 0
                            ? (isDark ? const Color(0xFF34D399) : Colors.green.shade700)
                            : (isDark ? const Color(0xFFF87171) : Colors.red.shade700),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ],
        ],
      ),
    );
  }

  Widget _buildRecommendedPracticeSection(BuildContext context, List<Map<String, dynamic>> practiceSets, bool isDark) {
    final scheme = Theme.of(context).colorScheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Recommended Practice Sets',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: scheme.onSurface,
          ),
        ),
        const SizedBox(height: 8),
        if (practiceSets.isEmpty)
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF171A22) : Colors.white,
              borderRadius: BorderRadius.circular(AppRadii.md),
              border: Border.all(color: scheme.outlineVariant),
            ),
            child: Text(
              'No targeted practice test is currently available.',
              style: TextStyle(fontSize: 13, color: scheme.onSurfaceVariant),
            ),
          )
        else
          for (final ps in practiceSets) ...[
            Container(
              margin: const EdgeInsets.only(bottom: 8),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF171A22) : Colors.white,
                borderRadius: BorderRadius.circular(AppRadii.md),
                border: Border.all(color: scheme.outlineVariant),
              ),
              child: ListTile(
                leading: CircleAvatar(
                  backgroundColor: isDark ? const Color(0xFF252A35) : const Color(0xFFFFE8D6),
                  child: const Icon(Icons.quiz_rounded, color: AppColors.primary),
                ),
                title: Text(
                  (ps['title'] ?? 'Practice Set').toString(),
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: scheme.onSurface),
                ),
                subtitle: Text(
                  '${(ps['subject'] ?? '')} • ${(ps['topic'] ?? '')}',
                  style: TextStyle(fontSize: 12, color: scheme.onSurfaceVariant),
                ),
                trailing: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadii.sm)),
                  ),
                  onPressed: () {
                    final setId = (ps['id'] as num?)?.toInt() ?? 0;
                    final title = (ps['title'] ?? 'Practice Set').toString();
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => PracticeAttemptScreen(
                          setId: setId,
                          customTitle: title,
                        ),
                      ),
                    );
                  },
                  child: const Text('Start'),
                ),
              ),
            ),
          ],
      ],
    );
  }

  Widget _buildAiMentorCard(BuildContext context, Map<String, dynamic> ai, bool isDark) {
    if (ai.isEmpty) return const SizedBox.shrink();

    final summary = (ai['summary'] ?? '').toString();
    final overview = (ai['performance_overview'] ?? '').toString();
    final prioritySubj = (ai['priority_subject'] ?? '').toString();
    final recommendations = List<String>.from((ai['recommendations'] as List<dynamic>?) ?? []);
    final motivation = (ai['motivation'] ?? '').toString();

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: isDark
              ? [const Color(0xFF1E2638), const Color(0xFF111726)]
              : [const Color(0xFF1E293B), const Color(0xFF0F172A)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(AppRadii.lg),
        border: Border.all(color: AppColors.primary.withValues(alpha: 0.4)),
        boxShadow: AppShadows.soft,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: const [
              Icon(Icons.psychology_rounded, color: AppColors.primary, size: 26),
              SizedBox(width: 10),
              Text(
                'AI Academic Mentor Guidance',
                style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: Colors.white),
              ),
            ],
          ),
          const Divider(color: Colors.white24, height: 24),
          if (summary.isNotEmpty) ...[
            Text(
              summary,
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFF7DD3FC)),
            ),
            const SizedBox(height: 8),
          ],
          if (overview.isNotEmpty) ...[
            Text(
              overview,
              style: const TextStyle(fontSize: 13, color: Colors.white70, height: 1.4),
            ),
            const SizedBox(height: 12),
          ],
          if (prioritySubj.isNotEmpty) ...[
            RichText(
              text: TextSpan(
                text: 'Primary Focus Subject: ',
                style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Color(0xFFFBBF24)),
                children: [
                  TextSpan(text: prioritySubj, style: const TextStyle(color: Colors.white)),
                ],
              ),
            ),
            const SizedBox(height: 12),
          ],
          if (recommendations.isNotEmpty) ...[
            const Text(
              'Actionable Recommendations:',
              style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
            ),
            const SizedBox(height: 6),
            for (final rec in recommendations) ...[
              Padding(
                padding: const EdgeInsets.only(bottom: 4),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('• ', style: TextStyle(color: Color(0xFF38BDF8), fontWeight: FontWeight.bold)),
                    Expanded(child: Text(rec, style: const TextStyle(fontSize: 13, color: Colors.white70))),
                  ],
                ),
              ),
            ],
            const SizedBox(height: 12),
          ],
          if (motivation.isNotEmpty) ...[
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(AppRadii.sm),
              ),
              child: Text(
                '💪 "$motivation"',
                style: const TextStyle(fontSize: 12, fontStyle: FontStyle.italic, color: Color(0xFFFDE68A)),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildActionButtons(BuildContext context) {
    return Column(
      children: [
        if (widget.onReviewAnswers != null)
          PrimaryButton(
            label: 'Review Answers',
            icon: Icons.fact_check_rounded,
            expanded: true,
            onPressed: widget.onReviewAnswers,
          ),
        if (widget.onDownloadPdf != null) ...[
          const SizedBox(height: 10),
          SecondaryButton(
            label: 'Download Incorrect PDF',
            icon: Icons.picture_as_pdf_rounded,
            expanded: true,
            onPressed: widget.onDownloadPdf,
          ),
        ],
      ],
    );
  }
}

