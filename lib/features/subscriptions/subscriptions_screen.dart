import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/providers/app_state.dart';
import '../../core/utils/package_utils.dart';
import '../../core/utils/payment_utils.dart';
import '../../core/providers/subscription_providers.dart';
import '../../models/app_models.dart';
import '../content/data/content_repository.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import 'payment_checkout_screen.dart';

class SubscriptionsScreen extends ConsumerStatefulWidget {
  const SubscriptionsScreen({super.key});

  @override
  ConsumerState<SubscriptionsScreen> createState() =>
      _SubscriptionsScreenState();
}

class _SubscriptionsScreenState extends ConsumerState<SubscriptionsScreen> {
  bool _checkoutInFlight = false;

  Future<void> _startCheckout(
    BuildContext context,
    Map<String, dynamic> raw,
    SubscriptionPlan plan,
  ) async {
    if (_checkoutInFlight) return;
    final packageId = parsePackageId(raw['id']);
    if (packageId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Invalid package.')),
      );
      return;
    }

    final messenger = ScaffoldMessenger.of(context);
    setState(() => _checkoutInFlight = true);
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
            amountInr: (order['amountInr'] as num?)?.toDouble() ?? 999,
            orderId: orderId,
            razorpayOrderId: razorpayOrderId,
            keyId: keyId,
            customerPhone: order['customerPhone']?.toString() ?? '',
            customerName: order['customerName']?.toString() ?? 'Student',
          ),
        ),
      );
      if (verifyResult != null && isPaymentVerified(verifyResult)) {
        final planName = verifyResult['subscription'] is Map
            ? (verifyResult['subscription'] as Map)['plan_name']?.toString()
            : null;
        final resolvedPlan = (planName?.isNotEmpty == true ? planName! : plan.name);
        ref.read(appUiControllerProvider.notifier).activateSubscription(resolvedPlan);
        for (var attempt = 0; attempt < 3; attempt++) {
          await ref.read(authBlocProvider).refreshProfile();
          if (ref.read(appUiControllerProvider).hasActiveSubscription) break;
          await Future<void>.delayed(Duration(seconds: 1 + attempt));
        }
        ContentRepository.clearCache();
        if (!context.mounted) return;
        messenger.showSnackBar(
          SnackBar(
            content: Text('$resolvedPlan activated successfully.'),
          ),
        );
        context.go('/dashboard/0');
      } else if (verifyResult != null) {
        messenger.showSnackBar(
          const SnackBar(
            content: Text(
                'Payment received but not confirmed yet. Tap Confirm payment.'),
          ),
        );
      }
    } catch (e) {
      messenger.showSnackBar(
        SnackBar(content: Text('Payment issue: ${paymentErrorMessage(e)}')),
      );
    } finally {
      if (mounted) {
        setState(() => _checkoutInFlight = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final hasActiveSubscription = ref.watch(
      appUiControllerProvider.select((s) => s.hasActiveSubscription),
    );
    final activePlan = ref.watch(
      appUiControllerProvider.select((s) => s.selectedPlan),
    );
    final packagesAsync = ref.watch(subscriptionPackagesProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Subscriptions')),
      body: RefreshIndicator(
        onRefresh: () async {
          ref.invalidate(subscriptionPackagesProvider);
          await ref.read(subscriptionPackagesProvider.future);
        },
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
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
                packagesAsync.when(
                  loading: () => const SkeletonLoader(cardCount: 2),
                  error: (error, _) => Column(
                    children: [
                      EmptyStateWidget(
                        title: 'Plans load nahi ho paaye',
                        subtitle: error.toString(),
                        icon: Icons.error_outline_rounded,
                      ),
                      const SizedBox(height: AppSpacing.md),
                      PrimaryButton(
                        label: 'Retry',
                        expanded: true,
                        icon: Icons.refresh_rounded,
                        onPressed: () =>
                            ref.invalidate(subscriptionPackagesProvider),
                      ),
                    ],
                  ),
                  data: (entries) {
                    if (entries.isEmpty) {
                      return Column(
                        children: [
                          const EmptyStateWidget(
                            title: 'No plans available',
                            subtitle:
                                'Server par Starter plan active nahi hai. Admin panel se package check karein.',
                            icon: Icons.workspace_premium_outlined,
                          ),
                          const SizedBox(height: AppSpacing.md),
                          PrimaryButton(
                            label: 'Refresh',
                            expanded: true,
                            icon: Icons.refresh_rounded,
                            onPressed: () =>
                                ref.invalidate(subscriptionPackagesProvider),
                          ),
                        ],
                      );
                    }

                    return Column(
                      children: [
                        for (final entry in entries)
                          Padding(
                            padding:
                                const EdgeInsets.only(bottom: AppSpacing.md),
                            child: PlanCard(
                              plan: entry.plan,
                              active: hasActiveSubscription &&
                                  activePlan == entry.plan.name,
                              onSelect: () => _startCheckout(
                                context,
                                entry.raw,
                                entry.plan,
                              ),
                            ),
                          ),
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
        constraints: const BoxConstraints(minWidth: 320),
        child: DataTable(
          columnSpacing: 22,
          headingRowColor: WidgetStatePropertyAll(AppColors.surfaceMuted),
          columns: const [
            DataColumn(label: Text('Feature')),
            DataColumn(label: Text('Rs 999 Plan')),
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
