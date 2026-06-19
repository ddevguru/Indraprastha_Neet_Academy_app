import 'package:flutter/material.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';

import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import '../content/data/content_repository.dart';

class PaymentCheckoutScreen extends StatefulWidget {
  const PaymentCheckoutScreen({
    super.key,
    required this.packageName,
    required this.amountInr,
    required this.orderId,
    required this.razorpayOrderId,
    required this.keyId,
    this.customerPhone = '',
    this.customerName = 'Student',
  });

  final String packageName;
  final double amountInr;
  final String orderId;
  final String razorpayOrderId;
  final String keyId;
  final String customerPhone;
  final String customerName;

  @override
  State<PaymentCheckoutScreen> createState() => _PaymentCheckoutScreenState();
}

class _PaymentCheckoutScreenState extends State<PaymentCheckoutScreen> {
  late final Razorpay _razorpay;
  bool _processing = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _razorpay = Razorpay();
    _razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, _handleSuccess);
    _razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, _handleError);
    _razorpay.on(Razorpay.EVENT_EXTERNAL_WALLET, _handleExternalWallet);
    WidgetsBinding.instance.addPostFrameCallback((_) => _openCheckout());
  }

  @override
  void dispose() {
    _razorpay.clear();
    super.dispose();
  }

  void _openCheckout() {
    if (widget.keyId.isEmpty || widget.razorpayOrderId.isEmpty) {
      setState(() => _error = 'Payment configuration missing. Contact support.');
      return;
    }

    final options = <String, dynamic>{
      'key': widget.keyId,
      'amount': (widget.amountInr * 100).round(),
      'name': 'Indraprastha NEET Academy',
      'order_id': widget.razorpayOrderId,
      'description': widget.packageName,
      'prefill': {
        'contact': widget.customerPhone,
        'name': widget.customerName,
      },
      'theme': {'color': '#4338CA'},
    };

    try {
      _razorpay.open(options);
    } catch (e) {
      setState(() => _error = e.toString());
    }
  }

  Future<void> _handleSuccess(PaymentSuccessResponse response) async {
    if (_processing) return;
    setState(() {
      _processing = true;
      _error = null;
    });

    try {
      final paymentId = response.paymentId ?? '';
      final orderId = response.orderId ?? '';
      final signature = response.signature ?? '';
      if (paymentId.isEmpty || orderId.isEmpty || signature.isEmpty) {
        throw Exception('Incomplete payment response');
      }

      final result = await ContentRepository().verifyPayment(
        orderId: widget.orderId,
        razorpayPaymentId: paymentId,
        razorpayOrderId: orderId,
        razorpaySignature: signature,
      );
      if (!mounted) return;
      if (result['paid'] == true) {
        Navigator.of(context).pop(result);
        return;
      }
      setState(() => _error = 'Payment verification failed. Please contact support.');
    } catch (e) {
      if (!mounted) return;
      setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _processing = false);
    }
  }

  void _handleError(PaymentFailureResponse response) {
    if (!mounted) return;
    setState(() {
      _error = response.message ?? 'Payment cancelled or failed.';
      _processing = false;
    });
  }

  void _handleExternalWallet(ExternalWalletResponse response) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('External wallet: ${response.walletName ?? ''}')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Complete payment')),
      body: Padding(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: CenteredContent(
          maxWidth: 560,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.packageName,
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Text('Amount: ₹${widget.amountInr.toStringAsFixed(0)}'),
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      _processing
                          ? 'Verifying payment...'
                          : 'Razorpay checkout should open automatically.',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ),
              ),
              if (_error != null) ...[
                const SizedBox(height: AppSpacing.md),
                Text(_error!, style: const TextStyle(color: AppColors.danger)),
              ],
              const SizedBox(height: AppSpacing.lg),
              PrimaryButton(
                label: 'Retry payment',
                expanded: true,
                icon: Icons.payment_rounded,
                onPressed: _processing ? null : _openCheckout,
              ),
              const SizedBox(height: AppSpacing.sm),
              SecondaryButton(
                label: 'Cancel',
                expanded: true,
                onPressed: _processing ? null : () => Navigator.of(context).pop(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
