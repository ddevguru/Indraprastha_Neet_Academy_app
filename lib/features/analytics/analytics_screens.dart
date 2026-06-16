import 'package:flutter/material.dart';
import '../../theme/app_tokens.dart';

/// Analytics Dashboard - Main entry point
class AnalyticsDashboard extends StatefulWidget {
  const AnalyticsDashboard({super.key});

  @override
  State<AnalyticsDashboard> createState() => _AnalyticsDashboardState();
}

class _AnalyticsDashboardState extends State<AnalyticsDashboard> {
  late Future<Map<String, dynamic>> _dashboardFuture;

  @override
  void initState() {
    super.initState();
    _dashboardFuture = _fetchDashboard();
  }

  Future<Map<String, dynamic>> _fetchDashboard() async {
    // TODO: Call API endpoint /analytics/dashboard
    // For now, return mock data
    await Future.delayed(const Duration(seconds: 1));
    return {
      'today': {
        'study_hours': 2.5,
        'questions_attempted': 45,
        'accuracy_percent': 80,
      },
      'this_week': {
        'total_study_hours': 14.5,
        'days_studied': 5,
        'tests_completed': 2,
        'average_accuracy': 78,
        'streak_days': 5,
      },
      'performance_heatmap': {
        'Physics': {
          'Mechanics': {'accuracy': 90, 'color': 'green'},
          'Waves': {'accuracy': 70, 'color': 'yellow'},
          'Optics': {'accuracy': 65, 'color': 'orange'},
        },
        'Chemistry': {
          'Organic': {'accuracy': 85, 'color': 'green'},
          'Inorganic': {'accuracy': 60, 'color': 'yellow'},
          'Physical': {'accuracy': 75, 'color': 'yellow'},
        },
        'Biology': {
          'Botany': {'accuracy': 70, 'color': 'yellow'},
          'Zoology': {'accuracy': 65, 'color': 'orange'},
        },
      },
      'overall_stats': {
        'total_tests': 5,
        'average_score': 285,
        'average_accuracy': 77,
        'physics': 75,
        'chemistry': 73,
        'biology': 68,
      },
      'weak_areas': [
        {'subject': 'Biology', 'topic': 'Ecology', 'accuracy': 55},
        {'subject': 'Chemistry', 'topic': 'Inorganic', 'accuracy': 60},
      ],
      'recommendations': [
        'Focus on Biology - your weakest subject',
        'Maintain your 5-day study streak',
        'Practice Ecology more',
      ],
    };
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: _dashboardFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        }

        final data = snapshot.data ?? {};

        return CustomScrollView(
          slivers: [
            // Today's Stats Card
            SliverToBoxAdapter(
              child: _buildTodayCard(data['today'] ?? {}),
            ),

            // This Week Stats
            SliverToBoxAdapter(
              child: _buildWeekCard(data['this_week'] ?? {}),
            ),

            // Subject Accuracy Charts
            SliverToBoxAdapter(
              child: _buildSubjectAccuracy(data['overall_stats'] ?? {}),
            ),

            // Performance Heatmap
            SliverToBoxAdapter(
              child: _buildHeatmap(data['performance_heatmap'] ?? {}),
            ),

            // Weak Areas
            SliverToBoxAdapter(
              child: _buildWeakAreas(data['weak_areas'] ?? []),
            ),

            // Recommendations
            SliverToBoxAdapter(
              child: _buildRecommendations(data['recommendations'] ?? []),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: 20)),
          ],
        );
      },
    );
  }

  /// Today's Activity Card
  Widget _buildTodayCard(Map<String, dynamic> today) {
    final studyHours = (today['study_hours'] as num?)?.toDouble() ?? 0;
    final questionsAttempted = (today['questions_attempted'] as num?)?.toInt() ?? 0;
    final accuracy = (today['accuracy_percent'] as num?)?.toInt() ?? 0;

    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFFB8440E), Color(0xFFE85A1C), Color(0xFFFFB86C)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Today\'s Progress',
            style: TextStyle(
              color: Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _StatBox(
                label: 'Study Hours',
                value: '$studyHours h',
                icon: Icons.schedule,
              ),
              _StatBox(
                label: 'Questions',
                value: '$questionsAttempted',
                icon: Icons.quiz,
              ),
              _StatBox(
                label: 'Accuracy',
                value: '$accuracy%',
                icon: Icons.check_circle,
              ),
            ],
          ),
        ],
      ),
    );
  }

  /// Weekly Stats Card
  Widget _buildWeekCard(Map<String, dynamic> week) {
    final studyHours = (week['total_study_hours'] as num?)?.toDouble() ?? 0;
    final daysStudied = (week['days_studied'] as num?)?.toInt() ?? 0;
    final testsCompleted = (week['tests_completed'] as num?)?.toInt() ?? 0;
    final streakDays = (week['streak_days'] as num?)?.toInt() ?? 0;
    final avgAccuracy = (week['average_accuracy'] as num?)?.toInt() ?? 0;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'This Week',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w700,
              color: AppColors.textPrimary,
            ),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _MiniStat(label: 'Study Hours', value: '${studyHours.toStringAsFixed(1)}h'),
              _MiniStat(label: 'Days', value: '$daysStudied'),
              _MiniStat(label: 'Tests', value: '$testsCompleted'),
              _MiniStat(label: 'Streak', value: '$streakDays 🔥'),
            ],
          ),
          const SizedBox(height: 12),
          // Accuracy bar
          Row(
            children: [
              const Text(
                'Average Accuracy: ',
                style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
              ),
              Expanded(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: avgAccuracy / 100,
                    minHeight: 6,
                    backgroundColor: Colors.grey[300],
                    valueColor: AlwaysStoppedAnimation<Color>(
                      avgAccuracy >= 75 ? Colors.green : Colors.orange,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Text(
                '$avgAccuracy%',
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textPrimary,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  /// Subject-wise Accuracy Chart
  Widget _buildSubjectAccuracy(Map<String, dynamic> stats) {
    final physics = (stats['physics'] as num?)?.toInt() ?? 0;
    final chemistry = (stats['chemistry'] as num?)?.toInt() ?? 0;
    final biology = (stats['biology'] as num?)?.toInt() ?? 0;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Subject-wise Accuracy',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w700,
              color: AppColors.textPrimary,
            ),
          ),
          const SizedBox(height: 16),
          _AccuracyBar(
            subject: 'Physics',
            accuracy: physics,
            color: const Color(0xFF1976D2),
          ),
          const SizedBox(height: 12),
          _AccuracyBar(
            subject: 'Chemistry',
            accuracy: chemistry,
            color: const Color(0xFF7B1FA2),
          ),
          const SizedBox(height: 12),
          _AccuracyBar(
            subject: 'Biology',
            accuracy: biology,
            color: const Color(0xFF2E7D32),
          ),
        ],
      ),
    );
  }

  /// Performance Heatmap
  Widget _buildHeatmap(Map<String, dynamic> heatmap) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Performance Heatmap',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w700,
              color: AppColors.textPrimary,
            ),
          ),
          const SizedBox(height: 12),
          ...heatmap.entries.map((subject) {
            return _SubjectHeatmapTile(
              subject: subject.key,
              topics: subject.value as Map<String, dynamic>,
            );
          }),
        ],
      ),
    );
  }

  /// Weak Areas Section
  Widget _buildWeakAreas(List<dynamic> weakAreas) {
    if (weakAreas.isEmpty) {
      return const SizedBox.shrink();
    }

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFFFEBEE),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFD92D20).withValues(alpha: 0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.warning_amber_rounded, color: Color(0xFFD92D20)),
              const SizedBox(width: 8),
              const Text(
                'Weak Areas - Focus Here',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: Color(0xFFD92D20),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          ...weakAreas.map((area) {
            final subject = area['subject'] ?? 'Unknown';
            final topic = area['topic'] ?? 'Unknown';
            final accuracy = (area['accuracy'] as num?)?.toInt() ?? 0;

            return Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          topic,
                          style: const TextStyle(
                            fontWeight: FontWeight.w600,
                            fontSize: 14,
                          ),
                        ),
                        Text(
                          subject,
                          style: const TextStyle(
                            fontSize: 12,
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      '$accuracy%',
                      style: const TextStyle(
                        fontWeight: FontWeight.w700,
                        color: Color(0xFFD92D20),
                      ),
                    ),
                  ),
                ],
              ),
            );
          }),
        ],
      ),
    );
  }

  /// Recommendations Section
  Widget _buildRecommendations(List<dynamic> recommendations) {
    if (recommendations.isEmpty) {
      return const SizedBox.shrink();
    }

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFE8F5E9),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF1F8A54).withValues(alpha: 0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.lightbulb_outline, color: Color(0xFF1F8A54)),
              const SizedBox(width: 8),
              const Text(
                'AI Recommendations',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: Color(0xFF1F8A54),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          ...recommendations.map((rec) {
            return Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Padding(
                    padding: EdgeInsets.only(top: 2),
                    child: Icon(
                      Icons.check_circle,
                      size: 16,
                      color: Color(0xFF1F8A54),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      rec.toString(),
                      style: const TextStyle(
                        fontSize: 13,
                        height: 1.4,
                      ),
                    ),
                  ),
                ],
              ),
            );
          }),
        ],
      ),
    );
  }
}

/// Stat Box for Today's Card
class _StatBox extends StatelessWidget {
  final String label;
  final String value;
  final IconData icon;

  const _StatBox({
    required this.label,
    required this.value,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Icon(icon, color: Colors.white, size: 28),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 18,
            fontWeight: FontWeight.w700,
          ),
        ),
        Text(
          label,
          style: const TextStyle(
            color: Colors.white70,
            fontSize: 11,
          ),
        ),
      ],
    );
  }
}

/// Mini Stat for Week Card
class _MiniStat extends StatelessWidget {
  final String label;
  final String value;

  const _MiniStat({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w700,
            color: AppColors.textPrimary,
          ),
        ),
        Text(
          label,
          style: const TextStyle(
            fontSize: 10,
            color: AppColors.textSecondary,
          ),
        ),
      ],
    );
  }
}

/// Accuracy Bar Chart
class _AccuracyBar extends StatelessWidget {
  final String subject;
  final int accuracy;
  final Color color;

  const _AccuracyBar({
    required this.subject,
    required this.accuracy,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              subject,
              style: const TextStyle(
                fontWeight: FontWeight.w600,
                fontSize: 14,
              ),
            ),
            Text(
              '$accuracy%',
              style: TextStyle(
                fontWeight: FontWeight.w700,
                color: color,
              ),
            ),
          ],
        ),
        const SizedBox(height: 4),
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: LinearProgressIndicator(
            value: accuracy / 100,
            minHeight: 8,
            backgroundColor: Colors.grey[200],
            valueColor: AlwaysStoppedAnimation<Color>(color),
          ),
        ),
      ],
    );
  }
}

/// Subject Heatmap Tile
class _SubjectHeatmapTile extends StatefulWidget {
  final String subject;
  final Map<String, dynamic> topics;

  const _SubjectHeatmapTile({
    required this.subject,
    required this.topics,
  });

  @override
  State<_SubjectHeatmapTile> createState() => _SubjectHeatmapTileState();
}

class _SubjectHeatmapTileState extends State<_SubjectHeatmapTile> {
  bool expanded = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        GestureDetector(
          onTap: () {
            setState(() => expanded = !expanded);
          },
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                widget.subject,
                style: const TextStyle(
                  fontWeight: FontWeight.w600,
                  fontSize: 13,
                ),
              ),
              Icon(
                expanded ? Icons.expand_less : Icons.expand_more,
                size: 18,
              ),
            ],
          ),
        ),
        if (expanded) ...[
          const SizedBox(height: 8),
          ...widget.topics.entries.map((topicEntry) {
            final topicName = topicEntry.key;
            final topicData = topicEntry.value as Map<String, dynamic>;
            final accuracy = (topicData['accuracy'] as num?)?.toInt() ?? 0;
            final color = _getHeatmapColor(topicData['color'] as String?);

            return Padding(
              padding: const EdgeInsets.only(bottom: 6),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      topicName,
                      style: const TextStyle(fontSize: 12),
                    ),
                  ),
                  Container(
                    width: 40,
                    height: 24,
                    decoration: BoxDecoration(
                      color: color,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Center(
                      child: Text(
                        '$accuracy%',
                        style: const TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w700,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            );
          }),
        ],
        const Divider(height: 12),
      ],
    );
  }

  Color _getHeatmapColor(String? colorCode) {
    switch (colorCode) {
      case 'green':
        return const Color(0xFF1F8A54);
      case 'yellow':
        return const Color(0xFFF59E0B);
      case 'orange':
        return const Color(0xFFFF9500);
      case 'red':
        return const Color(0xFFD92D20);
      default:
        return Colors.grey;
    }
  }
}
