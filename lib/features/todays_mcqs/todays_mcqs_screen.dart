import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/providers/daily_mcqs_provider.dart';
import '../../models/daily_mcq_item.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

String _resolveDriveImageUrl(String raw) {
  if (raw.isEmpty) return raw;
  final uri = Uri.tryParse(raw);
  if (uri == null) return raw;
  String? id = uri.queryParameters['id'];
  if (id == null || id.isEmpty) {
    final parts = uri.pathSegments;
    final idx = parts.indexOf('file');
    if (idx >= 0 && idx + 2 < parts.length && parts[idx + 1] == 'd') {
      id = parts[idx + 2];
    }
  }
  if (id == null || id.isEmpty) return raw;
  return 'https://drive.google.com/uc?export=view&id=$id';
}

class TodaysMcqsScreen extends ConsumerWidget {
  const TodaysMcqsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final async = ref.watch(mcqOfDayProvider);
    return Scaffold(
      appBar: AppBar(
        title: const Text("Today's MCQs"),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_rounded),
            onPressed: () => ref.read(mcqOfDayProvider.notifier).refresh(),
          ),
        ],
      ),
      body: async.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.xl),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.wifi_off_rounded, size: 48, color: AppColors.danger),
                const SizedBox(height: AppSpacing.md),
                Text('Could not load MCQs', style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: AppSpacing.xs),
                Text(e.toString(), textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.bodySmall),
                const SizedBox(height: AppSpacing.lg),
                PrimaryButton(
                  label: 'Retry',
                  onPressed: () => ref.read(mcqOfDayProvider.notifier).refresh(),
                ),
              ],
            ),
          ),
        ),
        data: (mcqs) {
          final active = mcqs.active;
          final archived = mcqs.archived;
          if (mcqs.isEmpty) {
            return const Center(
              child: EmptyStateWidget(
                title: 'No MCQs today',
                subtitle: 'Admin has not added any MCQs yet. Check back later.',
                icon: Icons.quiz_outlined,
              ),
            );
          }
          return RefreshIndicator(
            onRefresh: () => ref.read(mcqOfDayProvider.notifier).refresh(),
            child: ListView(
              padding: const EdgeInsets.all(AppSpacing.lg),
              children: [
                if (active.isNotEmpty) ...[
                  SectionHeader(
                    title: "Today's MCQs",
                    subtitle: '${active.length} question${active.length == 1 ? '' : 's'} active',
                  ),
                  const SizedBox(height: AppSpacing.md),
                  ...active.map((q) => Padding(
                        padding: const EdgeInsets.only(bottom: AppSpacing.lg),
                        child: _McqSolveCard(mcq: q),
                      )),
                ],
                if (archived.isNotEmpty) ...[
                  const SizedBox(height: AppSpacing.sm),
                  SectionHeader(
                    title: 'Yesterday (24 h passed)',
                    subtitle: 'These MCQs have expired from today\'s rotation.',
                  ),
                  const SizedBox(height: AppSpacing.md),
                  ...archived.map((q) => Padding(
                        padding: const EdgeInsets.only(bottom: AppSpacing.lg),
                        child: _McqSolveCard(mcq: q, expired: true),
                      )),
                ],
              ],
            ),
          );
        },
      ),
    );
  }
}

class _McqSolveCard extends StatefulWidget {
  const _McqSolveCard({required this.mcq, this.expired = false});

  final McqOfDay mcq;
  final bool expired;

  @override
  State<_McqSolveCard> createState() => _McqSolveCardState();
}

class _McqSolveCardState extends State<_McqSolveCard> {
  String? _selected;
  bool _revealed = false;

  @override
  Widget build(BuildContext context) {
    final mcq = widget.mcq;
    final correct = mcq.correctOption;

    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ── Header ─────────────────────────────────────────────────────
          Row(
            children: [
              if (mcq.subject.isNotEmpty) ...[
                Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.sm, vertical: 2),
                  decoration: BoxDecoration(
                    color: AppColors.indigoSoft,
                    borderRadius: BorderRadius.circular(AppRadii.sm),
                  ),
                  child: Text(
                    mcq.subject,
                    style: Theme.of(context).textTheme.labelSmall?.copyWith(
                          color: AppColors.indigo,
                          fontWeight: FontWeight.w700,
                        ),
                  ),
                ),
                const SizedBox(width: AppSpacing.sm),
              ],
              if (mcq.topic.isNotEmpty)
                Expanded(
                  child: Text(
                    mcq.topic,
                    style: Theme.of(context).textTheme.bodySmall,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              if (widget.expired)
                const Icon(Icons.history_rounded, size: 16, color: AppColors.textSecondary),
            ],
          ),
          const SizedBox(height: AppSpacing.md),

          // ── Question ────────────────────────────────────────────────────
          Text(
            mcq.question,
            style: Theme.of(context)
                .textTheme
                .titleSmall
                ?.copyWith(fontWeight: FontWeight.w600, height: 1.5),
          ),

          // ── Question image ───────────────────────────────────────────────
          if (mcq.questionImageLink.isNotEmpty) ...[
            const SizedBox(height: AppSpacing.sm),
            ClipRRect(
              borderRadius: BorderRadius.circular(AppRadii.md),
              child: Image.network(
                _resolveDriveImageUrl(mcq.questionImageLink),
                fit: BoxFit.contain,
                loadingBuilder: (_, child, progress) =>
                    progress == null ? child : const SizedBox(height: 120,
                        child: Center(child: CircularProgressIndicator(strokeWidth: 2))),
                errorBuilder: (_, _, _) => const SizedBox.shrink(),
              ),
            ),
          ],

          const SizedBox(height: AppSpacing.md),

          // ── Options ─────────────────────────────────────────────────────
          ...mcq.options.entries.map((e) {
            final isSel = _selected == e.key;
            final isCorrect = _revealed && e.key == correct;
            final isWrong = _revealed && isSel && e.key != correct;
            return Padding(
              padding: const EdgeInsets.only(bottom: AppSpacing.sm),
              child: InkWell(
                onTap: widget.expired
                    ? null
                    : () => setState(() => _selected = e.key),
                borderRadius: BorderRadius.circular(AppRadii.md),
                child: Container(
                  padding: const EdgeInsets.all(AppSpacing.md),
                  decoration: BoxDecoration(
                    color: isCorrect
                        ? const Color(0xFFE7F8EF)
                        : isWrong
                            ? const Color(0xFFFCEAEA)
                            : isSel
                                ? AppColors.indigoSoft
                                : Theme.of(context).cardColor,
                    borderRadius: BorderRadius.circular(AppRadii.md),
                    border: Border.all(
                      color: isCorrect
                          ? AppColors.success
                          : isWrong
                              ? AppColors.danger
                              : isSel
                                  ? AppColors.indigo
                                  : AppColors.border,
                    ),
                  ),
                  child: Row(
                    children: [
                      CircleAvatar(
                        radius: 12,
                        backgroundColor: isCorrect
                            ? AppColors.success
                            : isWrong
                                ? AppColors.danger
                                : isSel
                                    ? AppColors.indigo
                                    : AppColors.border,
                        child: Text(
                          e.key,
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
                            color: (isCorrect || isWrong || isSel)
                                ? Colors.white
                                : AppColors.textSecondary,
                          ),
                        ),
                      ),
                      const SizedBox(width: AppSpacing.sm),
                      Expanded(
                        child: Text(
                          e.value,
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                      ),
                      if (isCorrect)
                        const Icon(Icons.check_circle_rounded,
                            size: 18, color: AppColors.success),
                      if (isWrong)
                        const Icon(Icons.cancel_rounded,
                            size: 18, color: AppColors.danger),
                    ],
                  ),
                ),
              ),
            );
          }),

          const SizedBox(height: AppSpacing.xs),

          // ── Check / Hide answer ─────────────────────────────────────────
          if (!widget.expired)
            PrimaryButton(
              label: _revealed ? 'Hide Answer' : 'Check Answer',
              onPressed: () => setState(() => _revealed = !_revealed),
            ),

          // ── Explanation ─────────────────────────────────────────────────
          if (_revealed && mcq.explanation.isNotEmpty) ...[
            const SizedBox(height: AppSpacing.md),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: AppColors.indigoSoft,
                borderRadius: BorderRadius.circular(AppRadii.md),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Explanation',
                    style: Theme.of(context).textTheme.labelLarge?.copyWith(
                          color: AppColors.indigo,
                          fontWeight: FontWeight.w700,
                        ),
                  ),
                  const SizedBox(height: AppSpacing.xs),
                  Text(
                    mcq.explanation,
                    style: Theme.of(context)
                        .textTheme
                        .bodySmall
                        ?.copyWith(height: 1.5),
                  ),
                ],
              ),
            ),
          ],

          if (widget.expired) ...[
            const SizedBox(height: AppSpacing.sm),
            Text(
              'Correct answer: ${mcq.correctOption}  •  ${mcq.options[mcq.correctOption] ?? ''}',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppColors.success,
                    fontWeight: FontWeight.w600,
                  ),
            ),
          ],
        ],
      ),
    );
  }
}
