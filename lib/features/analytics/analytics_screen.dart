import 'package:flutter/material.dart';

import '../content/data/content_repository.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

class AnalyticsScreen extends StatefulWidget {
  const AnalyticsScreen({super.key});

  @override
  State<AnalyticsScreen> createState() => _AnalyticsScreenState();
}

class _AnalyticsScreenState extends State<AnalyticsScreen> {
  late final Future<Map<String, dynamic>> _analyticsFuture;

  @override
  void initState() {
    super.initState();
    _analyticsFuture = _loadAnalytics();
  }

  Future<Map<String, dynamic>> _loadAnalytics() async {
    final repo = ContentRepository();
    try {
      return await repo.fetchLatestAnalytics();
    } catch (_) {
      return const {};
    }
  }

  @override
  Widget build(BuildContext context) {
    const subjectAccuracy = [
      ('Physics', 0.69),
      ('Chemistry', 0.77),
      ('Botany', 0.86),
      ('Zoology', 0.82),
    ];

    return FutureBuilder<Map<String, dynamic>>(
      future: _analyticsFuture,
      builder: (context, snapshot) {
        final payload = snapshot.data ?? const {};
        final donut = (payload['donut'] as Map<String, dynamic>?) ?? const {};
        final insights = (payload['insights'] as List<dynamic>?) ?? const [];
        final correct = (donut['correct'] ?? 0) as int;
        final wrong = (donut['wrong'] ?? 0) as int;
        final unattempted = (donut['unattempted'] ?? 0) as int;
        return Scaffold(
      appBar: AppBar(title: const Text('Analytics')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: CenteredContent(
          maxWidth: 1120,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SectionHeader(
                title: 'Performance dashboard',
                subtitle:
                    'A clean NEET analytics snapshot with subject accuracy, weekly progress, strong areas, and weak topics.',
              ),
              const SizedBox(height: AppSpacing.lg),
              LayoutBuilder(
                builder: (context, constraints) {
                  final crossAxisCount = constraints.maxWidth > 980
                      ? 4
                      : constraints.maxWidth > 620
                          ? 2
                          : 1;
                  return GridView.count(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    crossAxisCount: crossAxisCount,
                    crossAxisSpacing: AppSpacing.md,
                    mainAxisSpacing: AppSpacing.md,
                    childAspectRatio: 1.2,
                    children: const [
                      StatCard(
                        title: 'Overall accuracy',
                        value: '79%',
                        subtitle: 'Up 4% over last 14 days',
                        icon: Icons.track_changes_rounded,
                      ),
                      StatCard(
                        title: 'Weekly progress',
                        value: '18.5 hrs',
                        subtitle: '5.2 hrs revision, 7 tests reviewed',
                        icon: Icons.calendar_month_rounded,
                      ),
                      StatCard(
                        title: 'Syllabus coverage',
                        value: '74%',
                        subtitle: '11 chapters left in high priority queue',
                        icon: Icons.menu_book_rounded,
                      ),
                      StatCard(
                        title: 'Improvement trend',
                        value: '+38',
                        subtitle: 'Average mock score increase',
                        icon: Icons.trending_up_rounded,
                      ),
                    ],
                  );
                },
              ),
              const SizedBox(height: AppSpacing.xl),
              SurfaceCard(
                child: Row(
                  children: [
                    _DonutChart(
                      correct: correct,
                      wrong: wrong,
                      unattempted: unattempted,
                    ),
                    const SizedBox(width: AppSpacing.lg),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'AI Exam Insights',
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                          const SizedBox(height: AppSpacing.sm),
                          if (insights.isEmpty)
                            const Text(
                              'Submit a test to generate AI insights.',
                            )
                          else
                            ...insights.map(
                              (item) => ListTile(
                                contentPadding: EdgeInsets.zero,
                                leading: const Icon(Icons.auto_awesome_rounded),
                                title: Text(item['insight_title']?.toString() ?? ''),
                                subtitle: Text(item['insight_body']?.toString() ?? ''),
                              ),
                            ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.xl),
              LayoutBuilder(
                builder: (context, constraints) {
                  final compact = constraints.maxWidth < 860;
                  return compact
                      ? Column(
                          children: const [
                            _TrendPanel(),
                            SizedBox(height: AppSpacing.md),
                            _WeeklyBarsPanel(),
                          ],
                        )
                      : const Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(flex: 3, child: _TrendPanel()),
                            SizedBox(width: AppSpacing.md),
                            Expanded(flex: 2, child: _WeeklyBarsPanel()),
                          ],
                        );
                },
              ),
              const SizedBox(height: AppSpacing.xl),
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SectionHeader(
                      title: 'Subject-wise accuracy',
                      subtitle: 'Identify where concept depth is already strong and where revision is still needed.',
                    ),
                    const SizedBox(height: AppSpacing.md),
                    ...subjectAccuracy.map(
                      (entry) => Padding(
                        padding: const EdgeInsets.only(bottom: AppSpacing.md),
                        child: MetricBar(
                          label: entry.$1,
                          value: entry.$2,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.lg),
              LayoutBuilder(
                builder: (context, constraints) {
                  final compact = constraints.maxWidth < 860;
                  return compact
                      ? Column(
                          children: const [
                            _TopicPanel(
                              title: 'Weak topics',
                              items: [
                                'Rotational Motion',
                                'Thermodynamics numericals',
                                'Morphology of Flowering Plants',
                                'Neural control diagrams',
                              ],
                            ),
                            SizedBox(height: AppSpacing.md),
                            _TopicPanel(
                              title: 'Strong topics',
                              items: [
                                'Cell Structure',
                                'Molecular Basis of Inheritance',
                                'Chemical Bonding',
                                'Human Physiology',
                              ],
                            ),
                          ],
                        )
                      : const Row(
                          children: [
                            Expanded(
                              child: _TopicPanel(
                                title: 'Weak topics',
                                items: [
                                  'Rotational Motion',
                                  'Thermodynamics numericals',
                                  'Morphology of Flowering Plants',
                                  'Neural control diagrams',
                                ],
                              ),
                            ),
                            SizedBox(width: AppSpacing.md),
                            Expanded(
                              child: _TopicPanel(
                                title: 'Strong topics',
                                items: [
                                  'Cell Structure',
                                  'Molecular Basis of Inheritance',
                                  'Chemical Bonding',
                                  'Human Physiology',
                                ],
                              ),
                            ),
                          ],
                        );
                },
              ),
            ],
          ),
        ),
      ),
        );
      },
    );
  }
}

class _DonutChart extends StatelessWidget {
  const _DonutChart({
    required this.correct,
    required this.wrong,
    required this.unattempted,
  });

  final int correct;
  final int wrong;
  final int unattempted;

  @override
  Widget build(BuildContext context) {
    final total = (correct + wrong + unattempted).toDouble();
    final c = total == 0 ? 0.0 : correct / total;
    final w = total == 0 ? 0.0 : wrong / total;
    final u = total == 0 ? 0.0 : unattempted / total;
    return SizedBox(
      width: 180,
      height: 180,
      child: CustomPaint(
        painter: _DonutPainter(
          correctFraction: c,
          wrongFraction: w,
          unattemptedFraction: u,
        ),
        child: Center(
          child: Text(
            total == 0 ? 'No Test' : '${(c * 100).round()}%',
            style: Theme.of(context).textTheme.titleLarge,
          ),
        ),
      ),
    );
  }
}

class _DonutPainter extends CustomPainter {
  _DonutPainter({
    required this.correctFraction,
    required this.wrongFraction,
    required this.unattemptedFraction,
  });

  final double correctFraction;
  final double wrongFraction;
  final double unattemptedFraction;

  @override
  void paint(Canvas canvas, Size size) {
    final stroke = 20.0;
    final rect = Rect.fromLTWH(stroke, stroke, size.width - stroke * 2, size.height - stroke * 2);
    final base = Paint()
      ..color = AppColors.border
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke;
    canvas.drawArc(rect, 0, 6.28318, false, base);

    final p1 = Paint()
      ..color = AppColors.success
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke;
    final p2 = Paint()
      ..color = AppColors.danger
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke;
    final p3 = Paint()
      ..color = AppColors.warning
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke;

    var start = -1.5708;
    canvas.drawArc(rect, start, 6.28318 * correctFraction, false, p1);
    start += 6.28318 * correctFraction;
    canvas.drawArc(rect, start, 6.28318 * wrongFraction, false, p2);
    start += 6.28318 * wrongFraction;
    canvas.drawArc(rect, start, 6.28318 * unattemptedFraction, false, p3);
  }

  @override
  bool shouldRepaint(covariant _DonutPainter oldDelegate) {
    return oldDelegate.correctFraction != correctFraction ||
        oldDelegate.wrongFraction != wrongFraction ||
        oldDelegate.unattemptedFraction != unattemptedFraction;
  }
}

class _TrendPanel extends StatelessWidget {
  const _TrendPanel();

  @override
  Widget build(BuildContext context) {
    return const SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SectionHeader(
            title: 'Test improvement trend',
            subtitle: 'Mock performance over recent attempts.',
          ),
          SizedBox(height: AppSpacing.md),
          MiniTrendChart(values: [0.42, 0.49, 0.56, 0.61, 0.68, 0.74, 0.79]),
        ],
      ),
    );
  }
}

class _WeeklyBarsPanel extends StatelessWidget {
  const _WeeklyBarsPanel();

  @override
  Widget build(BuildContext context) {
    return const SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Weekly progress', style: TextStyle(fontWeight: FontWeight.w700)),
          SizedBox(height: AppSpacing.sm),
          Text('Study consistency for the last seven days.'),
          SizedBox(height: AppSpacing.lg),
          MiniBarChart(
            values: [0.48, 0.72, 0.65, 0.82, 0.58, 0.76, 0.89],
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          ),
        ],
      ),
    );
  }
}

class _TopicPanel extends StatelessWidget {
  const _TopicPanel({
    required this.title,
    required this.items,
  });

  final String title;
  final List<String> items;

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: AppSpacing.md),
          ...items.map(
            (item) => ListTile(
              contentPadding: EdgeInsets.zero,
              leading: CircleAvatar(
                backgroundColor: title == 'Weak topics'
                    ? const Color(0xFFFCEAEA)
                    : const Color(0xFFE7F8EF),
                child: Icon(
                  title == 'Weak topics'
                      ? Icons.north_east_rounded
                      : Icons.check_rounded,
                  color: title == 'Weak topics'
                      ? AppColors.danger
                      : AppColors.success,
                ),
              ),
              title: Text(item),
              subtitle: Text(
                title == 'Weak topics'
                    ? 'Add this to next revision cycle'
                    : 'Maintain current performance',
              ),
            ),
          ),
        ],
      ),
    );
  }
}
