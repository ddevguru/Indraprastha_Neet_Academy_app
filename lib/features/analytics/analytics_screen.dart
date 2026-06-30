import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/services/onboarding_checklist_service.dart';
import '../content/data/content_repository.dart';
import '../onboarding/onboarding_checklist_widget.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

class AnalyticsScreen extends ConsumerStatefulWidget {
  const AnalyticsScreen({super.key});

  @override
  ConsumerState<AnalyticsScreen> createState() => _AnalyticsScreenState();
}

class _AnalyticsScreenState extends ConsumerState<AnalyticsScreen> {
  late final Future<Map<String, dynamic>> _analyticsFuture;

  @override
  void initState() {
    super.initState();
    _analyticsFuture = _loadAnalytics();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      completeOnboardingStep(ref, OnboardingChecklistStep.viewAnalytics);
    });
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
        final overall =
            (payload['analytics'] as Map<String, dynamic>?) ?? const {};
        final insights =
            (payload['insights'] as List<dynamic>?) ?? const [];

        // Backend may return numbers as String/int/double — use _n/_i helpers
        final correct = _i(donut['correct']);
        final wrong = _i(donut['wrong']);
        final unattempted = _i(donut['unattempted']);
        final total = correct + wrong + unattempted;
        final attempted = correct + wrong;
        final accuracy =
            attempted == 0 ? 0 : ((correct / attempted) * 100).round();
        final attemptRate =
            total == 0 ? 0 : ((attempted / total) * 100).round();

        return Scaffold(
          appBar: AppBar(
            title: const Text('Analytics'),
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

                  // ── Stat cards ─────────────────────────────────────────
                  LayoutBuilder(builder: (context, constraints) {
                    final crossAxisCount =
                        constraints.maxWidth > 980 ? 4 : 2;
                    // Fixed height per card so text never gets clipped
                    final cardHeight =
                        constraints.maxWidth > 980 ? 160.0 : 150.0;
                    return GridView.custom(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      gridDelegate:
                          SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: crossAxisCount,
                        crossAxisSpacing: AppSpacing.md,
                        mainAxisSpacing: AppSpacing.md,
                        mainAxisExtent: cardHeight,
                      ),
                      childrenDelegate: SliverChildListDelegate([
                        _MiniStatCard(
                          title: 'Overall accuracy',
                          value: '$accuracy%',
                          subtitle: 'Based on submitted tests',
                          icon: Icons.track_changes_rounded,
                          color: AppColors.primary,
                        ),
                        _MiniStatCard(
                          title: 'Questions attempted',
                          value: '$attempted',
                          subtitle: '$correct correct  •  $wrong wrong',
                          icon: Icons.quiz_rounded,
                          color: const Color(0xFF1976D2),
                        ),
                        _MiniStatCard(
                          title: 'Attempt rate',
                          value: '$attemptRate%',
                          subtitle: 'Out of $total served',
                          icon: Icons.playlist_add_check_rounded,
                          color: const Color(0xFF2E7D32),
                        ),
                        _MiniStatCard(
                          title: 'Best score',
                          value: '${_i(overall['best_score'])}',
                          subtitle: 'Out of 720 marks',
                          icon: Icons.trending_up_rounded,
                          color: const Color(0xFFC99A33),
                        ),
                      ]),
                    );
                  }),

                  const SizedBox(height: AppSpacing.lg),

                  // ── Donut chart + AI insights ───────────────────────────
                  SurfaceCard(
                    padding: const EdgeInsets.all(AppSpacing.md),
                    child: total == 0
                        ? const EmptyStateWidget(
                            title: 'No test data yet',
                            subtitle:
                                'Attempt a test to see your accuracy breakdown here.',
                            icon: Icons.donut_large_rounded,
                          )
                        : LayoutBuilder(builder: (context, constraints) {
                            final wide = constraints.maxWidth > 480;
                            final chartSize = wide ? 160.0 : 120.0;
                            final chart = _DonutChart(
                              correct: correct,
                              wrong: wrong,
                              unattempted: unattempted,
                              size: chartSize,
                            );
                            final insightsColumn = Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'AI Exam Insights',
                                  style: Theme.of(context)
                                      .textTheme
                                      .titleMedium
                                      ?.copyWith(fontWeight: FontWeight.w700),
                                ),
                                const SizedBox(height: AppSpacing.xs),
                                if (insights.isEmpty)
                                  Text(
                                    'Submit a test to generate AI insights.',
                                    style: Theme.of(context)
                                        .textTheme
                                        .bodySmall
                                        ?.copyWith(
                                            color: Theme.of(context)
                                                .colorScheme
                                                .onSurfaceVariant),
                                  )
                                else
                                  ...insights.take(3).map(
                                        (item) => Padding(
                                          padding: const EdgeInsets.only(
                                              bottom: AppSpacing.xs),
                                          child: Row(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              const Icon(
                                                  Icons.auto_awesome_rounded,
                                                  size: 14,
                                                  color: AppColors.primary),
                                              const SizedBox(width: 6),
                                              Expanded(
                                                child: Text(
                                                  item['insight_title']
                                                          ?.toString() ??
                                                      '',
                                                  style: Theme.of(context)
                                                      .textTheme
                                                      .bodySmall,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                              ],
                            );

                            if (wide) {
                              return Row(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  chart,
                                  const SizedBox(width: AppSpacing.md),
                                  Expanded(child: insightsColumn),
                                ],
                              );
                            }
                            // Narrow: stack vertically
                            return Column(
                              children: [
                                chart,
                                const SizedBox(height: AppSpacing.md),
                                insightsColumn,
                              ],
                            );
                          }),
                  ),

                  const SizedBox(height: AppSpacing.lg),

                  // ── Performance signals ────────────────────────────────
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
                          value: (_n(overall['overall_accuracy']) / 100)
                              .clamp(0.0, 1.0),
                          trailing:
                              '${_i(overall['overall_accuracy'])}%',
                        ),
                        const SizedBox(height: AppSpacing.md),
                        MetricBar(
                          label: 'Best score',
                          value: (_n(overall['best_score']) / 720)
                              .clamp(0.0, 1.0),
                          trailing:
                              '${_i(overall['best_score'])}/720',
                        ),
                        const SizedBox(height: AppSpacing.md),
                        MetricBar(
                          label: 'Average score',
                          value: (_n(overall['average_score']) / 720)
                              .clamp(0.0, 1.0),
                          trailing:
                              '${_i(overall['average_score'])}/720',
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

// ── Compact stat card ────────────────────────────────────────────────────────

class _MiniStatCard extends StatelessWidget {
  const _MiniStatCard({
    required this.title,
    required this.value,
    required this.subtitle,
    required this.icon,
    required this.color,
  });

  final String title;
  final String value;
  final String subtitle;
  final IconData icon;
  final Color color;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: isDark ? Theme.of(context).cardColor : Colors.white,
        borderRadius: BorderRadius.circular(AppRadii.lg),
        border: Border.all(color: Theme.of(context).colorScheme.outlineVariant),
        boxShadow: AppShadows.soft,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Container(
            padding: const EdgeInsets.all(7),
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.12),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, size: 16, color: color),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                value,
                style: Theme.of(context)
                    .textTheme
                    .headlineSmall
                    ?.copyWith(fontWeight: FontWeight.w800),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 2),
              Text(
                title,
                style: Theme.of(context).textTheme.labelMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 1),
              Text(
                subtitle,
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color:
                          Theme.of(context).colorScheme.onSurfaceVariant,
                    ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// ── Donut chart ──────────────────────────────────────────────────────────────

class _DonutChart extends StatelessWidget {
  const _DonutChart({
    required this.correct,
    required this.wrong,
    required this.unattempted,
    this.size = 160,
  });

  final int correct;
  final int wrong;
  final int unattempted;
  final double size;

  @override
  Widget build(BuildContext context) {
    final total = (correct + wrong + unattempted).toDouble();
    final c = total == 0 ? 0.0 : correct / total;
    final w = total == 0 ? 0.0 : wrong / total;
    final u = total == 0 ? 0.0 : unattempted / total;
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: _DonutPainter(
          correctFraction: c,
          wrongFraction: w,
          unattemptedFraction: u,
        ),
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                total == 0 ? '--' : '${(c * 100).round()}%',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w800,
                    ),
              ),
              if (total > 0)
                Text(
                  'Correct',
                  style: Theme.of(context).textTheme.labelSmall?.copyWith(
                        color: AppColors.success,
                      ),
                ),
            ],
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
    final stroke = size.width * 0.13;
    final rect = Rect.fromLTWH(
        stroke, stroke, size.width - stroke * 2, size.height - stroke * 2);
    canvas.drawArc(
        rect,
        0,
        6.28318,
        false,
        Paint()
          ..color = AppColors.border
          ..style = PaintingStyle.stroke
          ..strokeWidth = stroke);

    var start = -1.5708;
    if (correctFraction > 0) {
      canvas.drawArc(
          rect,
          start,
          6.28318 * correctFraction,
          false,
          Paint()
            ..color = AppColors.success
            ..style = PaintingStyle.stroke
            ..strokeWidth = stroke
            ..strokeCap = StrokeCap.round);
      start += 6.28318 * correctFraction;
    }
    if (wrongFraction > 0) {
      canvas.drawArc(
          rect,
          start,
          6.28318 * wrongFraction,
          false,
          Paint()
            ..color = AppColors.danger
            ..style = PaintingStyle.stroke
            ..strokeWidth = stroke
            ..strokeCap = StrokeCap.round);
      start += 6.28318 * wrongFraction;
    }
    if (unattemptedFraction > 0) {
      canvas.drawArc(
          rect,
          start,
          6.28318 * unattemptedFraction,
          false,
          Paint()
            ..color = AppColors.warning
            ..style = PaintingStyle.stroke
            ..strokeWidth = stroke
            ..strokeCap = StrokeCap.round);
    }
  }

  @override
  bool shouldRepaint(covariant _DonutPainter old) =>
      old.correctFraction != correctFraction ||
      old.wrongFraction != wrongFraction ||
      old.unattemptedFraction != unattemptedFraction;
}
