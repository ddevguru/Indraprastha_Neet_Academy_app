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
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Topic Intelligence', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 18)),
        backgroundColor: AppColors.surface,
        elevation: 0,
        centerTitle: false,
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
                    Text('Failed to load topic detail: ${snapshot.error}', textAlign: TextAlign.center),
                    const SizedBox(height: 16),
                    ElevatedButton(onPressed: _loadDetail, child: const Text('Retry')),
                  ],
                ),
              ),
            );
          }

          final detail = snapshot.data!;
          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              _buildHeaderCard(detail),
              const SizedBox(height: 16),
              _buildAiExplanationBanner(detail),
              const SizedBox(height: 16),
              _buildPerformanceMetricsGrid(detail),
              const SizedBox(height: 16),
              _buildForgettingCurveCard(detail),
              if (detail.repeatedMistakesList.isNotEmpty) ...[
                const SizedBox(height: 20),
                _buildRepeatedMistakesSection(detail.repeatedMistakesList),
              ],
              const SizedBox(height: 24),
              _buildActionRecommendations(context, detail),
              const SizedBox(height: 32),
            ],
          );
        },
      ),
    );
  }

  Widget _buildHeaderCard(TopicDetailData detail) {
    final masteryColor = _getMasteryColor(detail.masteryScore);

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.border),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
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
                  color: AppColors.primarySoft,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  detail.subject,
                  style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.w800, fontSize: 12),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: masteryColor.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: masteryColor.withOpacity(0.3)),
                ),
                child: Text(
                  detail.masteryCategory,
                  style: TextStyle(color: masteryColor, fontWeight: FontWeight.w800, fontSize: 11),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            detail.topic,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AppColors.textPrimary),
          ),
          const SizedBox(height: 4),
          Text(
            'Chapter: ${detail.chapter}',
            style: const TextStyle(fontSize: 13, color: AppColors.textSecondary),
          ),
          const SizedBox(height: 16),
          // Mastery Progress Bar
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Estimated Mastery', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.textSecondary)),
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
              backgroundColor: masteryColor.withOpacity(0.12),
              valueColor: AlwaysStoppedAnimation<Color>(masteryColor),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAiExplanationBanner(TopicDetailData detail) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFFFFFBEB), Color(0xFFFEF3C7)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFF59E0B).withOpacity(0.3)),
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
                const Text(
                  'AI Diagnostic Analysis',
                  style: TextStyle(fontWeight: FontWeight.w800, fontSize: 13, color: Color(0xFF92400E)),
                ),
                const SizedBox(height: 4),
                Text(
                  detail.aiExplanation.isNotEmpty
                      ? detail.aiExplanation
                      : 'Consistent study patterns detected. Continue regular testing to strengthen retention.',
                  style: const TextStyle(fontSize: 12, color: Color(0xFF78350F), height: 1.4),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPerformanceMetricsGrid(TopicDetailData detail) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Quantitative Performance',
            style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: AppColors.textPrimary),
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
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildMetricTile(
                  'Questions Attempted',
                  '${detail.totalQuestionsAttempted}',
                  Icons.quiz_outlined,
                  AppColors.primary,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _buildMetricTile(
                  'Correct Answers',
                  '${detail.totalQuestionsCorrect}',
                  Icons.check_circle_outline,
                  AppColors.success,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildMetricTile(
                  'Repeated Mistakes',
                  '${detail.repeatedMistakeCount}',
                  Icons.replay_circle_filled_rounded,
                  detail.repeatedMistakeCount > 0 ? AppColors.danger : AppColors.textSecondary,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMetricTile(String label, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.backgroundAlt,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Icon(icon, color: color, size: 22),
          const SizedBox(width: 10),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(value, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: color)),
              Text(label, style: const TextStyle(fontSize: 10, color: AppColors.textSecondary)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildForgettingCurveCard(TopicDetailData detail) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFF5F3FF),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: const Color(0xFF7C3AED).withOpacity(0.25)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Row(
                children: [
                  Icon(Icons.history_toggle_off_rounded, color: Color(0xFF7C3AED), size: 20),
                  SizedBox(width: 8),
                  Text(
                    'Memory Retention (Forgetting Curve)',
                    style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13, color: Color(0xFF5B21B6)),
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
              const Text('Calculated Retention', style: TextStyle(fontSize: 12, color: Color(0xFF6D28D9))),
              Text(
                '${detail.retentionEstimate.toStringAsFixed(0)}%',
                style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Color(0xFF5B21B6)),
              ),
            ],
          ),
          const SizedBox(height: 6),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: (detail.retentionEstimate / 100.0).clamp(0.0, 1.0),
              minHeight: 8,
              backgroundColor: const Color(0xFF7C3AED).withOpacity(0.15),
              valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF7C3AED)),
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            'Based on Ebbinghaus spaced-repetition: review regularly to reinforce neural retention before it decays.',
            style: TextStyle(fontSize: 11, color: Color(0xFF6D28D9)),
          ),
        ],
      ),
    );
  }

  Widget _buildRepeatedMistakesSection(List<RepeatedMistakeItem> mistakes) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const Icon(Icons.warning_amber_rounded, size: 20, color: AppColors.danger),
            const SizedBox(width: 8),
            Text(
              'Recurring Conceptual Mistakes (${mistakes.length})',
              style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15, color: AppColors.textPrimary),
            ),
          ],
        ),
        const SizedBox(height: 10),
        ...mistakes.map((m) => Container(
              margin: const EdgeInsets.only(bottom: 10),
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: const Color(0xFFFEF2F2),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.danger.withOpacity(0.2)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Failed ${m.wrongAttemptCount} times',
                        style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 12, color: AppColors.danger),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: AppColors.danger.withOpacity(0.12),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          'Concept: ${m.concept.isNotEmpty ? m.concept : "Core MCQ"}',
                          style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: AppColors.danger),
                        ),
                      ),
                    ],
                  ),
                  if (m.questionText.isNotEmpty) ...[
                    const SizedBox(height: 6),
                    Text(m.questionText, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                  ],
                  if (m.explanation.isNotEmpty) ...[
                    const SizedBox(height: 6),
                    Text('Remedy: ${m.explanation}', style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
                  ],
                ],
              ),
            )),
      ],
    );
  }

  Widget _buildActionRecommendations(BuildContext context, TopicDetailData detail) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Recommended Next Steps',
          style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15, color: AppColors.textPrimary),
        ),
        const SizedBox(height: 12),
        ElevatedButton.icon(
          onPressed: () {
            // Navigate to practice home with this topic or practice sets
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
            // Navigate to Books & Notes tab
            context.push('/dashboard/1'); // Notes tab
          },
          icon: const Icon(Icons.menu_book_rounded),
          label: Text('Read NCERT Chapter: ${detail.chapter}'),
          style: OutlinedButton.styleFrom(
            foregroundColor: AppColors.textPrimary,
            side: const BorderSide(color: AppColors.borderStrong),
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
