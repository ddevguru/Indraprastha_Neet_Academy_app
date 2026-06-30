import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/providers/app_state.dart';
import '../../core/services/analytics_service.dart';
import '../../core/services/onboarding_checklist_service.dart';
import '../auth/bloc/auth_bloc.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

/// Post-signup checklist guiding students to their first "aha moment".
class OnboardingChecklistWidget extends ConsumerStatefulWidget {
  const OnboardingChecklistWidget({super.key});

  @override
  ConsumerState<OnboardingChecklistWidget> createState() =>
      _OnboardingChecklistWidgetState();
}

class _OnboardingChecklistWidgetState
    extends ConsumerState<OnboardingChecklistWidget> {
  bool _collapsed = false;

  OnboardingChecklistService get _service =>
      OnboardingChecklistService(prefs: ref.read(sharedPreferencesProvider));

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _bootstrap());
  }

  Future<void> _bootstrap() async {
    final token = context.read<AuthBloc>().state.token;
    if (token == null) return;
    await _service.loadFromBackend(token);
    if (mounted) setState(() {});
  }

  Future<void> _dismiss() async {
    await _service.dismiss();
    final token = context.read<AuthBloc>().state.token;
    if (token != null) await _service.syncDismissed(token);
    if (mounted) setState(() {});
  }

  void _navigateForStep(OnboardingChecklistStep step) {
    switch (step) {
      case OnboardingChecklistStep.openFirstChapter:
        context.go('/dashboard/1');
      case OnboardingChecklistStep.attemptFirstPractice:
        context.go('/dashboard/2');
      case OnboardingChecklistStep.takeFirstTest:
        context.go('/dashboard/3');
      case OnboardingChecklistStep.viewAnalytics:
        context.push('/analytics');
      case OnboardingChecklistStep.saveForRevision:
        context.push('/saved');
    }
  }

  @override
  Widget build(BuildContext context) {
    final service = _service;
    if (service.isDismissed && !service.isComplete) return const SizedBox.shrink();
    if (service.isComplete) return const SizedBox.shrink();

    final steps = OnboardingChecklistStep.values;
    final doneCount = steps.where(service.isStepDone).length;
    final progress = doneCount / steps.length;

    return SurfaceCard(
      borderRadius: AppRadii.xl,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Getting started',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w800,
                          ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '$doneCount/${steps.length} complete',
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ],
                ),
              ),
              IconButton(
                tooltip: _collapsed ? 'Expand' : 'Collapse',
                onPressed: () => setState(() => _collapsed = !_collapsed),
                icon: Icon(
                  _collapsed
                      ? Icons.expand_more_rounded
                      : Icons.expand_less_rounded,
                ),
              ),
              if (doneCount > 0)
                IconButton(
                  tooltip: 'Dismiss',
                  onPressed: _dismiss,
                  icon: const Icon(Icons.close_rounded),
                ),
            ],
          ),
          const SizedBox(height: AppSpacing.sm),
          ClipRRect(
            borderRadius: BorderRadius.circular(99),
            child: LinearProgressIndicator(
              value: progress,
              minHeight: 8,
              backgroundColor: AppColors.indigoSoft,
              color: AppColors.indigo,
            ),
          ),
          if (!_collapsed) ...[
            const SizedBox(height: AppSpacing.md),
            ...steps.map((step) {
              final done = service.isStepDone(step);
              return ListTile(
                contentPadding: EdgeInsets.zero,
                dense: true,
                leading: Icon(
                  done ? Icons.check_circle_rounded : Icons.circle_outlined,
                  color: done ? AppColors.success : AppColors.border,
                ),
                title: Text(
                  step.label,
                  style: TextStyle(
                    decoration: done ? TextDecoration.lineThrough : null,
                    color: done
                        ? Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.55)
                        : null,
                  ),
                ),
                trailing: done
                    ? null
                    : const Icon(Icons.chevron_right_rounded, size: 20),
                onTap: done ? null : () => _navigateForStep(step),
              );
            }),
          ],
        ],
      ),
    );
  }
}

/// Call when the user completes a checklist action.
Future<void> completeOnboardingStep(
  WidgetRef ref,
  OnboardingChecklistStep step,
) async {
  final auth = ref.read(authBlocProvider).state;
  final service = OnboardingChecklistService(
    prefs: ref.read(sharedPreferencesProvider),
  );
  await service.markStep(step, token: auth.token);
  AnalyticsService.instance.trackOnboardingStep(step.key);
}
