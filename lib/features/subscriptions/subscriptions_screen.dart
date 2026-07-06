import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/providers/app_state.dart';
import '../../models/app_models.dart';
import '../content/data/content_repository.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import 'payment_checkout_screen.dart';

class SubscriptionsScreen extends ConsumerWidget {
  const SubscriptionsScreen({super.key});

  bool _isSingleAllowedPlan(Map<String, dynamic> item) {
    final amount = (item['amount_inr'] as num?)?.toDouble();
    if (amount != null && amount > 0 && amount <= 100) return true;
    final name = item['name']?.toString().toLowerCase() ?? '';
    if (name.contains('starter')) return true;
    final price = item['price_label']?.toString().replaceAll(',', '') ?? '';
    return (price.contains('1') || price.contains('999')) && !price.contains('4999');
  }

  Future<void> _startCheckout(
    BuildContext context,
    WidgetRef ref,
    Map<String, dynamic> raw,
    SubscriptionPlan plan,
  ) async {
    final packageId = (raw['id'] as num?)?.toInt();
    if (packageId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Invalid package.')),
      );
      return;
    }

    final messenger = ScaffoldMessenger.of(context);
    try {
      messenger.showSnackBar(
        const SnackBar(content: Text('Creating payment order...')),
      );
      final order = await ContentRepository().createPaymentOrder(packageId);
      final orderId = order['orderId']?.toString() ?? '';
      final razorpayOrderId = order['razorpayOrderId']?.toString() ?? '';
      final keyId = order['keyId']?.toString() ?? '';
      if (orderId.isEmpty || razorpayOrderId.isEmpty || keyId.isEmpty) {
        throw Exception('Payment order not created');
      }
      if (!context.mounted) return;
      final verifyResult = await Navigator.push<Map<String, dynamic>>(
        context,
        MaterialPageRoute(
          builder: (_) => PaymentCheckoutScreen(
            packageName: plan.name,
            amountInr: (order['amountInr'] as num?)?.toDouble() ?? 0,
            orderId: orderId,
            razorpayOrderId: razorpayOrderId,
            keyId: keyId,
            customerPhone: order['customerPhone']?.toString() ?? '',
            customerName: order['customerName']?.toString() ?? 'Student',
          ),
        ),
      );
      if (verifyResult?['paid'] == true) {
        ref.read(appUiControllerProvider.notifier).activateSubscription(plan.name);
        if (!context.mounted) return;
        messenger.showSnackBar(
          SnackBar(content: Text('${plan.name} activated successfully.')),
        );
        context.go('/dashboard/0');
      }
    } catch (e) {
      messenger.showSnackBar(
        SnackBar(content: Text('Payment failed: $e')),
      );
    }
  }

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
                    'Secure payment via Razorpay. After payment, your subscription activates automatically.',
              ),
              const SizedBox(height: AppSpacing.xl),
              FutureBuilder<List<Map<String, dynamic>>>(
                future: plansFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const SkeletonLoader(cardCount: 3);
                  }
                  final allRawPlans = snapshot.data ?? const [];
                  final rawPlans = allRawPlans.where(_isSingleAllowedPlan).toList();
                  final plans = rawPlans
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
                          final raw = rawPlans[index];
                          return PlanCard(
                            plan: plan,
                            active: ui.hasActiveSubscription && activePlan == plan.name,
                            onSelect: () => _startCheckout(context, ref, raw, plan),
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
            DataColumn(label: Text('Rs 1 Plan')),
          ],
          rows: [
            _row('NCERT smart reading', 'Yes', textStyle),
            _row('Practice modules', 'Limited', textStyle),
            _row('Full test series', 'Selected', textStyle),
            _row('Advanced analytics', 'Basic', textStyle),
          ],
        ),
      ),
    );
  }

  DataRow _row(
    String feature,
    String available,
    TextStyle? textStyle,
  ) {
    return DataRow(
      cells: [
        DataCell(Text(feature, style: textStyle)),
        DataCell(Text(available, style: textStyle)),
      ],
    );
  }
}
