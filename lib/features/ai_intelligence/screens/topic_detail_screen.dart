import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../theme/app_tokens.dart';
import '../models/ai_intelligence_models.dart';
import '../services/ai_intelligence_repository.dart';

class TopicDetailScreen extends ConsumerStatefulWidget {
  const TopicDetailScreen({
    super.key,
    required this.subject,
    required this.topic,
  });

  final String subject;
  final String topic;

  @override
  ConsumerState<TopicDetailScreen> createState() => _TopicDetailScreenState();
}

class _TopicDetailScreenState extends ConsumerState<TopicDetailScreen> {
  late Future<TopicDetailData> _detailFuture;

  @override
  void initState() {
    super.initState();
    _loadDetail();
  }

  void _loadDetail() {
    setState(() {
      _detailFuture = ref.read(aiIntelligenceRepositoryProvider).fetchTopicDetail(
            widget.subject,
            widget.topic,
          );
    });
  }

  Color _getMasteryColor(double score) {
    if (score >= 75) return const Color(0xFF10B981); // Green
    if (score >= 50) return const Color(0xFFF59E0B); // Amber
    return const Color(0xFFEF4444); // Red
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final scaffoldBg = Theme.of(context).scaffoldBackgroundColor;
    final textColor = isDark ? Colors.white : AppColors.textPrimary;
    final subtextColor = isDark ? const Color(0xFFB0B7C3) : AppColors.textSecondary;

    return Scaffold(
      backgroundColor: scaffoldBg,
      appBar: AppBar(
        title: Text(
          'Topic Intelligence',
          style: TextStyle(
            fontWeight: FontWeight.w800,
            fontSize: 18,
            color: textColor,
          ),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
        iconTheme: IconThemeData(color: textColor),
      ),
      body: FutureBuilder<TopicDetailData>(
        future: _detailFuture,
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
                      'Failed to load topic detail: ${snapshot.error}',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: textColor),
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: _loadDetail,
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

          final detail = snapshot.data!;
          return ListView(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            children: [
              _buildHeaderCard(detail, isDark, textColor, subtextColor),
              const SizedBox(height: 16),
              _buildAiExplanationBanner(detail, isDark),
              const SizedBox(height: 16),
              _buildPerformanceMetricsGrid(detail, isDark, textColor, subtextColor),
              const SizedBox(height: 16),
              _buildForgettingCurveCard(detail, isDark, textColor, subtextColor),
              if (detail.repeatedMistakesList.isNotEmpty) ...[
                const SizedBox(height: 20),
                _buildRepeatedMistakesSection(detail.repeatedMistakesList, isDark, textColor, subtextColor),
              ],
              const SizedBox(height: 24),
              _buildActionRecommendations(context, detail, isDark, textColor),
              const SizedBox(height: 32),
            ],
          );
        },
      ),
    );
  }

  Widget _buildHeaderCard(
    TopicDetailData detail,
    bool isDark,
    Color textColor,
    Color subtextColor,
  ) {
    final masteryColor = _getMasteryColor(detail.masteryScore);
    final cardBg = isDark ? const Color(0xFF171A22) : Colors.white;
    final cardBorder = isDark ? const Color(0xFF2E3440) : AppColors.border;

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: cardBorder, width: 1.2),
        boxShadow: isDark
            ? [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.35),
                  blurRadius: 16,
                  offset: const Offset(0, 6),
                ),
              ]
            : AppShadows.soft,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: isDark
                      ? AppColors.primary.withValues(alpha: 0.22)
                      : AppColors.primarySoft,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  detail.subject,
                  style: const TextStyle(
                    color: AppColors.primary,
                    fontWeight: FontWeight.w800,
                    fontSize: 12,
                  ),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: masteryColor.withValues(alpha: isDark ? 0.20 : 0.12),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: masteryColor.withValues(alpha: 0.4)),
                ),
                child: Text(
                  detail.masteryCategory,
                  style: TextStyle(
                    color: masteryColor,
                    fontWeight: FontWeight.w800,
                    fontSize: 11,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            detail.topic,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w900,
              color: textColor,
              letterSpacing: -0.3,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'Chapter: ${detail.chapter}',
            style: TextStyle(fontSize: 13, color: subtextColor),
          ),
          const SizedBox(height: 16),
          // Mastery Progress Bar
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Calculated Mastery Score',
                style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: subtextColor),
              ),
              Text(
                '${detail.masteryScore.toStringAsFixed(1)}%',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: masteryColor),
              ),
            ],
          ),
          const SizedBox(height: 6),
          ClipRRect(
            borderRadius: BorderRadius.circular(6),
            child: LinearProgressIndicator(
              value: (detail.masteryScore / 100.0).clamp(0.0, 1.0),
              minHeight: 10,
              backgroundColor: masteryColor.withValues(alpha: isDark ? 0.20 : 0.12),
              valueColor: AlwaysStoppedAnimation<Color>(masteryColor),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAiExplanationBanner(TopicDetailData detail, bool isDark) {
    final bannerBg = isDark ? const Color(0xFF2A1F10) : const Color(0xFFFFF8EE);
    final borderColor = isDark ? const Color(0xFFB45309) : const Color(0xFFF59E0B);
    final titleColor = isDark ? const Color(0xFFFDE68A) : const Color(0xFF92400E);
    final descColor = isDark ? const Color(0xFFFEF3C7) : const Color(0xFF78350F);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: bannerBg,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: borderColor.withValues(alpha: 0.4), width: 1.2),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(Icons.psychology_alt_rounded, color: Color(0xFFD97706), size: 24),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'AI Academic Diagnostic & Score Impact',
                  style: TextStyle(fontWeight: FontWeight.w800, fontSize: 13, color: titleColor),
                ),
                const SizedBox(height: 5),
                Text(
                  detail.aiExplanation.isNotEmpty
                      ? detail.aiExplanation
                      : 'Continue regular testing to maintain mastery and prevent memory decay.',
                  style: TextStyle(fontSize: 12, color: descColor, height: 1.45),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPerformanceMetricsGrid(
    TopicDetailData detail,
    bool isDark,
    Color textColor,
    Color subtextColor,
  ) {
    final cardBg = isDark ? const Color(0xFF171A22) : Colors.white;
    final cardBorder = isDark ? const Color(0xFF2E3440) : AppColors.border;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: cardBorder, width: 1.2),
        boxShadow: isDark ? null : AppShadows.soft,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'NEET Marks & Performance',
                style: TextStyle(fontWeight: FontWeight.w800, fontSize: 14, color: textColor),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: detail.marksObtained >= (detail.maxMarks * 0.75)
                      ? AppColors.success.withValues(alpha: 0.15)
                      : (detail.marksObtained >= (detail.maxMarks * 0.5)
                          ? AppColors.warning.withValues(alpha: 0.15)
                          : AppColors.danger.withValues(alpha: 0.15)),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  '${detail.marksPercentage.toStringAsFixed(0)}% Score',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w800,
                    color: detail.marksObtained >= (detail.maxMarks * 0.75)
                        ? AppColors.success
                        : (detail.marksObtained >= (detail.maxMarks * 0.5)
                            ? AppColors.warning
                            : AppColors.danger),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          // 4 Metric Tiles in 2x2 grid
          Row(
            children: [
              Expanded(
                child: _buildMetricTile(
                  'Net NEET Score',
                  '${detail.marksObtained}/${detail.maxMarks}',
                  Icons.stars_rounded,
                  AppColors.primary,
                  isDark,
                  subtextColor,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildMetricTile(
                  'Negative Penalty',
                  '-${detail.negativeMarks} Marks',
                  Icons.remove_circle_outline,
                  AppColors.danger,
                  isDark,
                  subtextColor,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _buildMetricTile(
                  'Accuracy',
                  '${detail.accuracyPercentage.toStringAsFixed(0)}%',
                  Icons.track_changes_rounded,
                  detail.accuracyPercentage >= 70 ? AppColors.success : AppColors.danger,
                  isDark,
                  subtextColor,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildMetricTile(
                  'Solved Questions',
                  '${detail.totalQuestionsCorrect} / ${detail.totalQuestionsAttempted}',
                  Icons.quiz_outlined,
                  const Color(0xFF2563EB),
                  isDark,
                  subtextColor,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMetricTile(
    String label,
    String value,
    IconData icon,
    Color color,
    bool isDark,
    Color subtextColor,
  ) {
    final tileBg = isDark ? const Color(0xFF1F242E) : const Color(0xFFFFF8F2);
    final tileBorder = isDark ? const Color(0xFF2E3440) : AppColors.border;

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: tileBg,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: tileBorder, width: 1),
      ),
      child: Row(
        children: [
          Icon(icon, color: color, size: 22),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  value,
                  style: TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: color),
                  overflow: TextOverflow.ellipsis,
                ),
                Text(
                  label,
                  style: TextStyle(fontSize: 10, color: subtextColor, fontWeight: FontWeight.w500),
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildForgettingCurveCard(
    TopicDetailData detail,
    bool isDark,
    Color textColor,
    Color subtextColor,
  ) {
    final cardBg = isDark ? const Color(0xFF1E172E) : const Color(0xFFF9F7FF);
    final cardBorder = isDark ? const Color(0xFF4C2A85) : const Color(0xFFDDD6FE);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: cardBorder, width: 1.2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Icon(Icons.history_toggle_off_rounded, color: Color(0xFF7C3AED), size: 20),
                  const SizedBox(width: 8),
                  Text(
                    'Memory Retention (Forgetting Curve)',
                    style: TextStyle(
                      fontWeight: FontWeight.w800,
                      fontSize: 13,
                      color: isDark ? const Color(0xFFDDD6FE) : const Color(0xFF5B21B6),
                    ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: detail.revisionPriority == 'HIGH'
                      ? AppColors.danger
                      : (detail.revisionPriority == 'MEDIUM' ? AppColors.warning : const Color(0xFF7C3AED)),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  '${detail.revisionPriority} Priority',
                  style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.w700),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Calculated Retention',
                style: TextStyle(fontSize: 12, color: isDark ? const Color(0xFFCACFDA) : const Color(0xFF6D28D9)),
              ),
              Text(
                '${detail.retentionEstimate.toStringAsFixed(0)}%',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w900,
                  color: isDark ? Colors.white : const Color(0xFF5B21B6),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: (detail.retentionEstimate / 100.0).clamp(0.0, 1.0),
              minHeight: 8,
              backgroundColor: const Color(0xFF7C3AED).withValues(alpha: isDark ? 0.25 : 0.15),
              valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF7C3AED)),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Based on Ebbinghaus spaced-repetition: review regularly to reinforce neural retention before forgetting accelerates.',
            style: TextStyle(fontSize: 11, color: isDark ? const Color(0xFFB0B7C3) : const Color(0xFF6D28D9)),
          ),
        ],
      ),
    );
  }

  Widget _buildRepeatedMistakesSection(
    List<RepeatedMistakeItem> mistakes,
    bool isDark,
    Color textColor,
    Color subtextColor,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                const Icon(Icons.warning_amber_rounded, size: 20, color: AppColors.danger),
                const SizedBox(width: 8),
                Text(
                  'Recurring Mistakes (${mistakes.length})',
                  style: TextStyle(fontWeight: FontWeight.w800, fontSize: 15, color: textColor),
                ),
              ],
            ),
            Text(
              'Tests, Practice & MCQs',
              style: TextStyle(fontSize: 11, color: subtextColor, fontWeight: FontWeight.w600),
            ),
          ],
        ),
        const SizedBox(height: 10),
        ...mistakes.map((m) => _buildMistakeCard(m, isDark, textColor, subtextColor)),
      ],
    );
  }

  Widget _buildMistakeCard(
    RepeatedMistakeItem m,
    bool isDark,
    Color textColor,
    Color subtextColor,
  ) {
    final cardBg = isDark ? const Color(0xFF1E1719) : const Color(0xFFFFF5F5);
    final cardBorder = isDark ? const Color(0xFF4C1D1D) : const Color(0xFFFECACA);

    Color sourceColor = const Color(0xFF2563EB); // Test Series
    if (m.sourceType.toLowerCase().contains('practice')) {
      sourceColor = const Color(0xFF0D9488); // Topic Practice
    } else if (m.sourceType.toLowerCase().contains('pyq')) {
      sourceColor = const Color(0xFF7C3AED); // PYQ
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: cardBg,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: cardBorder, width: 1.2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: sourceColor.withValues(alpha: isDark ? 0.25 : 0.12),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      m.sourceType,
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w800,
                        color: sourceColor,
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Wrong ${m.wrongAttemptCount} times',
                    style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 11, color: AppColors.danger),
                  ),
                ],
              ),
              if (m.isResolved)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: AppColors.success.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: const Text(
                    '✓ Resolved',
                    style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: AppColors.success),
                  ),
                ),
            ],
          ),
          if (m.questionText.isNotEmpty) ...[
            const SizedBox(height: 8),
            Text(
              m.questionText,
              style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: textColor),
            ),
          ],
          if (m.lastWrongAnswer.isNotEmpty || m.correctAnswer.isNotEmpty) ...[
            const SizedBox(height: 8),
            Row(
              children: [
                if (m.lastWrongAnswer.isNotEmpty)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: AppColors.danger.withValues(alpha: isDark ? 0.20 : 0.10),
                      borderRadius: BorderRadius.circular(6),
                      border: Border.all(color: AppColors.danger.withValues(alpha: 0.3)),
                    ),
                    child: Text(
                      'Your Answer: Option ${m.lastWrongAnswer} ✗',
                      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.danger),
                    ),
                  ),
                const SizedBox(width: 8),
                if (m.correctAnswer.isNotEmpty)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: AppColors.success.withValues(alpha: isDark ? 0.20 : 0.10),
                      borderRadius: BorderRadius.circular(6),
                      border: Border.all(color: AppColors.success.withValues(alpha: 0.3)),
                    ),
                    child: Text(
                      'Correct: Option ${m.correctAnswer} ✓',
                      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.success),
                    ),
                  ),
              ],
            ),
          ],
          if (m.explanation.isNotEmpty) ...[
            const SizedBox(height: 8),
            Text(
              'Explanation: ${m.explanation}',
              style: TextStyle(fontSize: 11, color: subtextColor, height: 1.35),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildActionRecommendations(
    BuildContext context,
    TopicDetailData detail,
    bool isDark,
    Color textColor,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Recommended Next Steps',
          style: TextStyle(fontWeight: FontWeight.w800, fontSize: 15, color: textColor),
        ),
        const SizedBox(height: 12),
        ElevatedButton.icon(
          onPressed: () {
            context.push('/dashboard/2'); // Practice tab
          },
          icon: const Icon(Icons.play_circle_fill_rounded),
          label: Text('Solve Practice MCQs for ${detail.topic}'),
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.primary,
            foregroundColor: Colors.white,
            minimumSize: const Size.fromHeight(48),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(14),
            ),
          ),
        ),
        const SizedBox(height: 10),
        OutlinedButton.icon(
          onPressed: () {
            context.push('/dashboard/1'); // Notes tab
          },
          icon: const Icon(Icons.menu_book_rounded),
          label: Text('Read NCERT Chapter: ${detail.chapter}'),
          style: OutlinedButton.styleFrom(
            foregroundColor: textColor,
            side: BorderSide(color: isDark ? const Color(0xFF343B49) : AppColors.borderStrong),
            minimumSize: const Size.fromHeight(48),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(14),
            ),
          ),
        ),
      ],
    );
  }
}
