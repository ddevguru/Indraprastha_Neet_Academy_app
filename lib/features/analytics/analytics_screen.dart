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
    return FutureBuilder<Map<String, dynamic>>(
      future: _analyticsFuture,
      builder: (context, snapshot) {
        final payload = snapshot.data ?? const {};
        final donut = (payload['donut'] as Map<String, dynamic>?) ?? const {};
        final overall = (payload['analytics'] as Map<String, dynamic>?) ?? const {};
        final insights = (payload['insights'] as List<dynamic>?) ?? const [];
        final correct = (donut['correct'] ?? 0) as int;
        final wrong = (donut['wrong'] ?? 0) as int;
        final unattempted = (donut['unattempted'] ?? 0) as int;
        final total = correct + wrong + unattempted;
        final attempted = correct + wrong;
        final accuracy = attempted == 0 ? 0 : ((correct / attempted) * 100).round();
        final attemptRate = total == 0 ? 0 : ((attempted / total) * 100).round();
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
                    children: [
                      StatCard(
                        title: 'Overall accuracy',
                        value: '$accuracy%',
                        subtitle: 'Based on submitted test attempts',
                        icon: Icons.track_changes_rounded,
                      ),
                      StatCard(
                        title: 'Questions attempted',
                        value: '$attempted',
                        subtitle: 'Correct: $correct . Wrong: $wrong',
                        icon: Icons.calendar_month_rounded,
                      ),
                      StatCard(
                        title: 'Attempt rate',
                        value: '$attemptRate%',
                        subtitle: 'Attempted vs total served questions',
                        icon: Icons.menu_book_rounded,
                      ),
                      StatCard(
                        title: 'Best score',
                        value: '${overall['best_score'] ?? 0}',
                        subtitle: 'Latest analytics snapshot',
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
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SectionHeader(
                      title: 'Performance signals',
                      subtitle: 'Live metrics pulled from your latest backend analytics.',
                    ),
                    const SizedBox(height: AppSpacing.md),
                    Padding(
                      padding: const EdgeInsets.only(bottom: AppSpacing.md),
                      child: MetricBar(
                        label: 'Overall accuracy',
                        value: ((overall['overall_accuracy'] as num?) ?? 0) / 100,
                        trailing: '${overall['overall_accuracy'] ?? 0}%',
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(bottom: AppSpacing.md),
                      child: MetricBar(
                        label: 'Best score',
                        value: ((overall['best_score'] as num?) ?? 0) / 720,
                        trailing: '${overall['best_score'] ?? 0}/720',
                      ),
                    ),
                    MetricBar(
                      label: 'Average score',
                      value: ((overall['average_score'] as num?) ?? 0) / 720,
                      trailing: '${overall['average_score'] ?? 0}/720',
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.lg),
              const SurfaceCard(
                child: EmptyStateWidget(
                  title: 'Topic-level breakdown pending',
                  subtitle:
                      'Backend me per-subject / per-topic analytics add hote hi detailed weak-strong topics yahan live show honge.',
                  icon: Icons.analytics_outlined,
                ),
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

