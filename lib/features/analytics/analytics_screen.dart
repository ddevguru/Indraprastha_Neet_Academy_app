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

  // Backend may return numbers as String, int, or double — handle all three
  static double _n(dynamic v) =>
      v == null ? 0.0 : double.tryParse(v.toString()) ?? 0.0;
  static int _i(dynamic v) => _n(v).toInt();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: _analyticsFuture,
      builder: (context, snapshot) {
        final isLoading = snapshot.connectionState == ConnectionState.waiting;

        // Always render UI immediately — use empty map while loading
        final payload = snapshot.data ?? const {};
        final donut = (payload['donut'] as Map<String, dynamic>?) ?? const {};
        final overall = (payload['analytics'] as Map<String, dynamic>?) ?? const {};
        final insights = (payload['insights'] as List<dynamic>?) ?? const [];

        // Backend may return numbers as String/int/double — use _n/_i helpers
        final correct = _i(donut['correct']);
        final wrong = _i(donut['wrong']);
        final unattempted = _i(donut['unattempted']);
        final total = correct + wrong + unattempted;
        final attempted = correct + wrong;
        final accuracy = attempted == 0 ? 0 : ((correct / attempted) * 100).round();
        final attemptRate = total == 0 ? 0 : ((attempted / total) * 100).round();

        return Scaffold(
          appBar: AppBar(
            title: const Text('Analytics'),
            // Thin progress bar while data loads — screen still shows content
            bottom: isLoading
                ? const PreferredSize(
                    preferredSize: Size.fromHeight(3),
                    child: LinearProgressIndicator(),
                  )
                : null,
          ),
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
                        'Your NEET analytics snapshot — accuracy, attempt rate, and AI insights.',
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  LayoutBuilder(
                    builder: (context, constraints) {
                      final crossAxisCount = constraints.maxWidth > 980 ? 4 : 2;
                      return GridView.count(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        crossAxisCount: crossAxisCount,
                        crossAxisSpacing: AppSpacing.md,
                        mainAxisSpacing: AppSpacing.md,
                        childAspectRatio: 1.3,
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
                            subtitle: 'Correct: $correct  •  Wrong: $wrong',
                            icon: Icons.quiz_rounded,
                          ),
                          StatCard(
                            title: 'Attempt rate',
                            value: '$attemptRate%',
                            subtitle: 'Out of $total questions served',
                            icon: Icons.playlist_add_check_rounded,
                          ),
                          StatCard(
                            title: 'Best score',
                            value: '${_i(overall['best_score'])}',
                            subtitle: 'Out of 720 marks',
                            icon: Icons.trending_up_rounded,
                          ),
                        ],
                      );
                    },
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  SurfaceCard(
                    child: total == 0
                        ? const EmptyStateWidget(
                            title: 'No test data yet',
                            subtitle:
                                'Attempt a test to see your accuracy breakdown here.',
                            icon: Icons.donut_large_rounded,
                          )
                        : Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
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
                                          'Submit a test to generate AI insights.')
                                    else
                                      ...insights.map(
                                        (item) => ListTile(
                                          contentPadding: EdgeInsets.zero,
                                          leading:
                                              const Icon(Icons.auto_awesome_rounded),
                                          title: Text(
                                              item['insight_title']?.toString() ?? ''),
                                          subtitle: Text(
                                              item['insight_body']?.toString() ?? ''),
                                        ),
                                      ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SectionHeader(
                          title: 'Performance signals',
                          subtitle: 'Live metrics from your latest analytics.',
                        ),
                        const SizedBox(height: AppSpacing.md),
                        MetricBar(
                          label: 'Overall accuracy',
                          value: (_n(overall['overall_accuracy']) / 100).clamp(0.0, 1.0),
                          trailing: '${_i(overall['overall_accuracy'])}%',
                        ),
                        const SizedBox(height: AppSpacing.md),
                        MetricBar(
                          label: 'Best score',
                          value: (_n(overall['best_score']) / 720).clamp(0.0, 1.0),
                          trailing: '${_i(overall['best_score'])}/720',
                        ),
                        const SizedBox(height: AppSpacing.md),
                        MetricBar(
                          label: 'Average score',
                          value: (_n(overall['average_score']) / 720).clamp(0.0, 1.0),
                          trailing: '${_i(overall['average_score'])}/720',
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  const SurfaceCard(
                    child: EmptyStateWidget(
                      title: 'Topic-level breakdown coming soon',
                      subtitle:
                          'Per-subject and per-topic analytics will appear here once the backend pushes them.',
                      icon: Icons.analytics_outlined,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.lg),
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
    const stroke = 20.0;
    final rect = Rect.fromLTWH(
        stroke, stroke, size.width - stroke * 2, size.height - stroke * 2);
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
