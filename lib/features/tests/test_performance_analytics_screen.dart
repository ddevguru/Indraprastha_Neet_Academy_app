import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/providers/app_state.dart';
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
                  const CircularProgressIndicator(color: Color(0xFF0F172A)),
                  const SizedBox(height: 20),
                  const Text(
                    'Analyzing your performance...',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: Color(0xFF0F172A)),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Your AI mentor is preparing your analysis...',
                    style: TextStyle(fontSize: 13, color: Colors.grey.shade600),
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
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      snapshot.error.toString(),
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 13, color: Colors.grey),
                    ),
                    const SizedBox(height: 20),
                    ElevatedButton.icon(
                      onPressed: () {
                        setState(() {
                          _analyticsFuture = ref.read(contentRepositoryProvider).fetchTestPerformanceAnalysis(widget.testId);
                        });
                      },
                      icon: const Icon(Icons.refresh_rounded),
                      label: const Text('Retry Analysis'),
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
          backgroundColor: const Color(0xFFF8FAFC),
          appBar: AppBar(
            title: Text(test['name']?.toString() ?? 'Test Performance Analytics'),
            elevation: 0,
          ),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // 1. Score & Rank Summary Header
                _buildHeaderCard(test, student, benchmark),

                const SizedBox(height: 16),

                // 2. Performance Category Card
                _buildCategoryCard(student['performance_category']?.toString() ?? 'Average'),

                const SizedBox(height: 20),

                // 3. Radar Chart (Top 100 vs Student) - NO Performance Gap Table
                _buildRadarChartCard(subjects),

                const SizedBox(height: 20),

                // 4. Subject Performance Cards
                _buildSubjectCardsSection(subjects),

                const SizedBox(height: 20),

                // 5. Overall Average vs Top 100 Comparison Cards
                _buildOverallBenchmarkCard(benchmark),

                const SizedBox(height: 20),

                // 6. Priority Areas Section
                if (priorityAreas.isNotEmpty) _buildPriorityAreasCard(priorityAreas),

                const SizedBox(height: 20),

                // 7. Weak Topics & Strong Topics Sections
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(child: _buildTopicsCard('Weak Topics', weakTopics, Colors.red.shade700, Icons.warning_amber_rounded)),
                    const SizedBox(width: 12),
                    Expanded(child: _buildTopicsCard('Strong Topics', strongTopics, Colors.green.shade700, Icons.check_circle_outline_rounded)),
                  ],
                ),

                const SizedBox(height: 20),

                // 8. Historical Performance & Topic Improvement Section
                if (historicalPerf.isNotEmpty || topicImprovement.isNotEmpty)
                  _buildHistoricalImprovementCard(historicalPerf, topicImprovement),

                const SizedBox(height: 20),

                // 9. Recommended Practice from Database
                _buildRecommendedPracticeSection(recommendedPractice),

                const SizedBox(height: 20),

                // 10. AI Mentor Analysis Card
                _buildAiMentorCard(aiAnalysis),

                const SizedBox(height: 24),

                // 11. Question Review & Action Buttons
                if (widget.onReviewAnswers != null || widget.onDownloadPdf != null)
                  _buildActionButtons(),

                const SizedBox(height: 32),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildHeaderCard(Map<String, dynamic> test, Map<String, dynamic> student, Map<String, dynamic> benchmark) {
    final score = (student['score'] as num?)?.toInt() ?? 0;
    final maxScore = (test['maximum_score'] as num?)?.toInt() ?? 720;
    final rank = (student['rank'] as num?)?.toInt() ?? 1;
    final totalParticipants = (student['total_participants'] as num?)?.toInt() ?? (benchmark['overall_participant_count'] as num?)?.toInt() ?? 1;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF0F172A), Color(0xFF1E293B)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.12),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
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
                  const Text('YOUR SCORE', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF94A3B8))),
                  const SizedBox(height: 4),
                  RichText(
                    text: TextSpan(
                      text: '$score',
                      style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Color(0xFF38BDF8)),
                      children: [
                        TextSpan(text: ' / $maxScore', style: const TextStyle(fontSize: 14, color: Colors.white70)),
                      ],
                    ),
                  ),
                ],
              ),
              Container(width: 1, height: 40, color: Colors.white24),
              Column(
                children: [
                  const Text('ALL INDIA RANK', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF94A3B8))),
                  const SizedBox(height: 4),
                  RichText(
                    text: TextSpan(
                      text: '#$rank',
                      style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Color(0xFFFBBF24)),
                      children: [
                        TextSpan(text: ' of $totalParticipants', style: const TextStyle(fontSize: 13, color: Colors.white70)),
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

  Widget _buildCategoryCard(String category) {
    Color badgeColor = const Color(0xFF2563EB);
    IconData icon = Icons.star_rounded;

    if (category == 'Excellent') {
      badgeColor = const Color(0xFF059669);
      icon = Icons.workspace_premium_rounded;
    } else if (category == 'Strong') {
      badgeColor = const Color(0xFF0284C7);
      icon = Icons.thumb_up_alt_rounded;
    } else if (category == 'Above Average') {
      badgeColor = const Color(0xFF7C3AED);
      icon = Icons.trending_up_rounded;
    } else if (category == 'Needs Improvement') {
      badgeColor = const Color(0xFFDC2626);
      icon = Icons.priority_high_rounded;
    }

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: badgeColor.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: badgeColor.withValues(alpha: 0.3)),
      ),
      child: Row(
        children: [
          Icon(icon, color: badgeColor, size: 24),
          const SizedBox(width: 12),
          Text(
            'Performance Category:',
            style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.grey.shade800),
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

  Widget _buildRadarChartCard(List<Map<String, dynamic>> subjects) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 8, offset: const Offset(0, 2)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Performance vs Top 100 Benchmark',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
          ),
          const SizedBox(height: 4),
          const Text(
            'Visual radar comparison of your score polygon vs Top 100 average polygon.',
            style: TextStyle(fontSize: 12, color: Color(0xFF64748B)),
          ),
          const SizedBox(height: 16),
          TestRadarChart(subjects: subjects, height: 260),
        ],
      ),
    );
  }

  Widget _buildSubjectCardsSection(List<Map<String, dynamic>> subjects) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Subject Performance Breakdown',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
        ),
        const SizedBox(height: 12),
        for (final s in subjects) ...[
          Card(
            margin: const EdgeInsets.only(bottom: 10),
            elevation: 0,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
              side: BorderSide(color: Colors.grey.shade200),
            ),
            child: Padding(
              padding: const EdgeInsets.all(14.0),
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
                              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                            ),
                            const SizedBox(width: 8),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                              decoration: BoxDecoration(
                                color: _getStatusColor(s['status']?.toString() ?? '').withValues(alpha: 0.1),
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: Text(
                                (s['status'] ?? 'Average').toString(),
                                style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: _getStatusColor(s['status']?.toString() ?? '')),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            Text('Your Score: ', style: TextStyle(fontSize: 12, color: Colors.grey.shade600)),
                            Text('${(s['student_score'] as num?)?.toInt() ?? 0} / ${(s['max_score'] as num?)?.toInt() ?? 180}', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
                          ],
                        ),
                      ],
                    ),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text('Top 100 Avg: ${(s['top100_average'] as num?)?.toInt() ?? 0}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFFD97706))),
                      const SizedBox(height: 4),
                      Text('Overall Avg: ${(s['overall_average'] as num?)?.toInt() ?? 0}', style: TextStyle(fontSize: 11, color: Colors.grey.shade600)),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ],
    );
  }

  Color _getStatusColor(String status) {
    if (status == 'Excellent' || status == 'Strong') return Colors.green.shade700;
    if (status == 'Needs Improvement') return Colors.red.shade700;
    return Colors.blue.shade700;
  }

  Widget _buildOverallBenchmarkCard(Map<String, dynamic> benchmark) {
    final overallAvg = (benchmark['overall_average_score'] as num?)?.toInt() ?? 0;
    final top100Avg = (benchmark['top100_average_score'] as num?)?.toInt() ?? 0;
    final top100Count = (benchmark['top100_count'] as num?)?.toInt() ?? 100;
    final totalCount = (benchmark['overall_participant_count'] as num?)?.toInt() ?? 1;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 8, offset: const Offset(0, 2)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Test Overall Statistics',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF1F5F9),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Column(
                    children: [
                      const Text('Overall Test Average', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Color(0xFF64748B))),
                      const SizedBox(height: 4),
                      Text('$overallAvg', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF334155))),
                      Text('All $totalCount candidates', style: const TextStyle(fontSize: 10, color: Color(0xFF94A3B8))),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFEF3C7),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Column(
                    children: [
                      const Text('Top Benchmark Average', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Color(0xFF92400E))),
                      const SizedBox(height: 4),
                      Text('$top100Avg', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFFD97706))),
                      Text('Top $top100Count candidates', style: const TextStyle(fontSize: 10, color: Color(0xFFB45309))),
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

  Widget _buildPriorityAreasCard(List<Map<String, dynamic>> priorityAreas) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFFFFBEB),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFFDE68A)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: const [
              Icon(Icons.stars_rounded, color: Color(0xFFD97706), size: 22),
              SizedBox(width: 8),
              Text(
                'Top Priority Revision Areas',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF92400E)),
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
                    backgroundColor: const Color(0xFFD97706),
                    child: Text('${(p['priority'] as num?)?.toInt() ?? 1}', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      '${(p['subject'] ?? '')} → ${(p['topic'] ?? '')}',
                      style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Color(0xFF78350F)),
                    ),
                  ),
                  Text('${(p['score_percentage'] as num?)?.toInt() ?? 0}% score', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFFB45309))),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildTopicsCard(String title, List<Map<String, dynamic>> topics, Color color, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade200),
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
            Text('None detected', style: TextStyle(fontSize: 12, color: Colors.grey.shade500))
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
                        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFF334155)),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    Text('${(t['score_percentage'] ?? t['accuracy'] as num?)?.toInt() ?? 0}%', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: color)),
                  ],
                ),
              ),
            ],
        ],
      ),
    );
  }

  Widget _buildHistoricalImprovementCard(List<Map<String, dynamic>> history, List<Map<String, dynamic>> improvements) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 8, offset: const Offset(0, 2)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Historical Progress & Improvement',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
          ),
          const SizedBox(height: 12),
          if (improvements.isNotEmpty) ...[
            const Text('Topic Level Improvements:', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: Color(0xFF475569))),
            const SizedBox(height: 8),
            for (final imp in improvements) ...[
              Padding(
                padding: const EdgeInsets.only(bottom: 6),
                child: Row(
                  children: [
                    Icon(
                      ((imp['improvement'] as num?)?.toInt() ?? 0) >= 0 ? Icons.trending_up_rounded : Icons.trending_down_rounded,
                      color: ((imp['improvement'] as num?)?.toInt() ?? 0) >= 0 ? Colors.green : Colors.red,
                      size: 18,
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        '${(imp['topic'] ?? '')}: ${(imp['previous_percentage'] as num?)?.toInt() ?? 0}% → ${(imp['current_percentage'] as num?)?.toInt() ?? 0}%',
                        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
                      ),
                    ),
                    Text(
                      '${((imp['improvement'] as num?)?.toInt() ?? 0) >= 0 ? '+' : ''}${(imp['improvement'] as num?)?.toInt() ?? 0}%',
                      style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: ((imp['improvement'] as num?)?.toInt() ?? 0) >= 0 ? Colors.green.shade700 : Colors.red.shade700),
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

  Widget _buildRecommendedPracticeSection(List<Map<String, dynamic>> practiceSets) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Recommended Practice Sets',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
        ),
        const SizedBox(height: 8),
        if (practiceSets.isEmpty)
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.grey.shade200),
            ),
            child: const Text(
              'No targeted practice test is currently available.',
              style: TextStyle(fontSize: 13, color: Colors.grey),
            ),
          )
        else
          for (final ps in practiceSets) ...[
            Card(
              margin: const EdgeInsets.only(bottom: 8),
              elevation: 0,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
                side: BorderSide(color: Colors.grey.shade200),
              ),
              child: ListTile(
                leading: const CircleAvatar(
                  backgroundColor: Color(0xFFEFF6FF),
                  child: Icon(Icons.quiz_rounded, color: Color(0xFF2563EB)),
                ),
                title: Text((ps['title'] ?? 'Practice Set').toString(), style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                subtitle: Text('${(ps['subject'] ?? '')} • ${(ps['topic'] ?? '')}', style: const TextStyle(fontSize: 12)),
                trailing: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2563EB),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
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

  Widget _buildAiMentorCard(Map<String, dynamic> ai) {
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
        gradient: const LinearGradient(
          colors: [Color(0xFF0284C7), Color(0xFF0F172A)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(color: Colors.black.withValues(alpha: 0.1), blurRadius: 10, offset: const Offset(0, 4)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: const [
              Icon(Icons.psychology_rounded, color: Color(0xFF38BDF8), size: 26),
              SizedBox(width: 10),
              Text(
                'AI Academic Mentor Guidance',
                style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: Colors.white),
              ),
            ],
          ),
          const Divider(color: Colors.white24, height: 24),
          if (summary.isNotEmpty) ...[
            Text(summary, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFF7DD3FC))),
            const SizedBox(height: 8),
          ],
          if (overview.isNotEmpty) ...[
            Text(overview, style: const TextStyle(fontSize: 13, color: Colors.white70, height: 1.4)),
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
            const Text('Actionable Recommendations:', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
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
                borderRadius: BorderRadius.circular(8),
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

  Widget _buildActionButtons() {
    return Column(
      children: [
        if (widget.onReviewAnswers != null)
          SizedBox(
            width: double.infinity,
            height: 48,
            child: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF0F172A),
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              onPressed: widget.onReviewAnswers,
              icon: const Icon(Icons.fact_check_rounded),
              label: const Text('Review Answers', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
            ),
          ),
        if (widget.onDownloadPdf != null) ...[
          const SizedBox(height: 10),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: OutlinedButton.icon(
              style: OutlinedButton.styleFrom(
                foregroundColor: const Color(0xFF0F172A),
                side: const BorderSide(color: Color(0xFF0F172A)),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              onPressed: widget.onDownloadPdf,
              icon: const Icon(Icons.picture_as_pdf_rounded),
              label: const Text('Download Incorrect PDF', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
            ),
          ),
        ],
      ],
    );
  }
}
