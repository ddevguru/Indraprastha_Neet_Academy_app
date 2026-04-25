import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/providers/app_state.dart';
import '../../models/app_models.dart';
import '../content/data/content_repository.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

class SubscriptionsScreen extends ConsumerWidget {
  const SubscriptionsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final ui = ref.watch(appUiControllerProvider);
    final activePlan = ui.selectedPlan;
    final plansFuture = ContentRepository().fetchPackages();

    return Scaffold(
      appBar: AppBar(title: const Text('Subscriptions')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: CenteredContent(
          maxWidth: 1160,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SectionHeader(
                title: 'Choose your plan',
                subtitle:
                    'Tap a plan to activate it (demo). Only subscribed users can use the rest of the app.',
              ),
              const SizedBox(height: AppSpacing.xl),
              FutureBuilder<List<Map<String, dynamic>>>(
                future: plansFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  }
                  final plans = (snapshot.data ?? const [])
                      .map(
                        (item) => SubscriptionPlan(
                          name: item['name']?.toString() ?? 'Plan',
                          priceLabel: item['price_label']?.toString() ?? '',
                          validity: item['validity']?.toString() ?? '',
                          highlight: item['highlight']?.toString() ?? '',
                          features: List<String>.from(
                            item['features_json'] as List<dynamic>? ?? const [],
                          ),
                          isRecommended:
                              (item['name']?.toString().toLowerCase().contains('rank') ?? false),
                        ),
                      )
                      .toList();
                  if (plans.isEmpty) {
                    return const EmptyStateWidget(
                      title: 'No plans available',
                      subtitle: 'Admin panel se package add karne ke baad yahan dikhenge.',
                      icon: Icons.workspace_premium_outlined,
                    );
                  }

                  return LayoutBuilder(
                    builder: (context, constraints) {
                      final crossAxisCount = constraints.maxWidth > 1060
                          ? 4
                          : constraints.maxWidth > 760
                              ? 2
                              : 1;

                      return GridView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: plans.length,
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: crossAxisCount,
                          crossAxisSpacing: AppSpacing.md,
                          mainAxisSpacing: AppSpacing.md,
                          childAspectRatio: 0.82,
                        ),
                        itemBuilder: (context, index) {
                          final plan = plans[index];
                          return PlanCard(
                            plan: plan,
                            active: ui.hasActiveSubscription && activePlan == plan.name,
                            onSelect: () {
                              ref
                                  .read(appUiControllerProvider.notifier)
                                  .activateSubscription(plan.name);
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text('${plan.name} activated.'),
                                ),
                              );
                              context.go('/dashboard/0');
                            },
                          );
                        },
                      );
                    },
                  );
                },
              ),
              const SizedBox(height: AppSpacing.xl),
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SectionHeader(
                      title: 'Compare plans',
                      subtitle:
                          'Review access differences before selecting a learning workflow.',
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    _ComparePlansTable(),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

}

class _ComparePlansTable extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final textStyle = Theme.of(context).textTheme.bodyMedium;
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: ConstrainedBox(
        constraints: const BoxConstraints(minWidth: 760),
        child: DataTable(
          columnSpacing: 22,
          headingRowColor: WidgetStatePropertyAll(AppColors.surfaceMuted),
          columns: const [
            DataColumn(label: Text('Feature')),
            DataColumn(label: Text('Starter')),
            DataColumn(label: Text('Practice')),
            DataColumn(label: Text('Rank Pro')),
            DataColumn(label: Text('Test Series Plus')),
          ],
          rows: [
            _row('NCERT smart reading', 'Yes', 'Yes', 'Yes', 'Limited', textStyle),
            _row('Practice modules', 'Limited', 'Unlimited', 'Unlimited', 'No', textStyle),
            _row('Full test series', 'No', 'Selected', 'Yes', 'Yes', textStyle),
            _row('Advanced analytics', 'Basic', 'Standard', 'Premium', 'Standard', textStyle),
          ],
        ),
      ),
    );
  }

  DataRow _row(
    String feature,
    String starter,
    String practice,
    String rankPro,
    String testSeries,
    TextStyle? textStyle,
  ) {
    return DataRow(
      cells: [
        DataCell(Text(feature, style: textStyle)),
        DataCell(Text(starter, style: textStyle)),
        DataCell(Text(practice, style: textStyle)),
        DataCell(Text(rankPro, style: textStyle)),
        DataCell(Text(testSeries, style: textStyle)),
      ],
    );
  }
}
