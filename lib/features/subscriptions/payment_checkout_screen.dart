import 'package:flutter/material.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';

import '../../core/utils/payment_utils.dart';
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
  bool _completed = false;
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
    if (_completed || _processing) return;
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

  Future<Map<String, dynamic>?> _verifyWithServer({
    String? razorpayPaymentId,
    String? razorpayOrderId,
    String? razorpaySignature,
  }) async {
    final result = await ContentRepository().verifyPayment(
      orderId: widget.orderId,
      razorpayPaymentId: razorpayPaymentId,
      razorpayOrderId: razorpayOrderId,
      razorpaySignature: razorpaySignature,
    );
    if (isPaymentVerified(result)) return result;
    throw Exception(
      result['error']?.toString() ?? 'Payment verification failed. Please try confirm payment.',
    );
  }

  Future<void> _confirmPaidAndExit(Map<String, dynamic> result) async {
    _completed = true;
    if (!mounted) return;
    Navigator.of(context).pop(result);
  }

  Future<void> _handleSuccess(PaymentSuccessResponse response) async {
    if (_processing || _completed) return;
    setState(() {
      _processing = true;
      _error = null;
    });

    try {
      final paymentId = response.paymentId?.trim() ?? '';
      final orderId = response.orderId?.trim() ?? '';
      final signature = response.signature?.trim() ?? '';

      Map<String, dynamic>? result;
      if (paymentId.isNotEmpty && orderId.isNotEmpty && signature.isNotEmpty) {
        result = await _verifyWithServer(
          razorpayPaymentId: paymentId,
          razorpayOrderId: orderId,
          razorpaySignature: signature,
        );
      } else {
        // Some Android builds return partial payload — fallback to order-only verify.
        result = await _verifyWithServer();
      }

      if (result != null) {
        await _confirmPaidAndExit(result);
        return;
      }
      setState(() => _error = 'Payment verification failed. Tap confirm payment.');
    } catch (e) {
      if (!mounted) return;
      setState(() => _error = paymentErrorMessage(e));
    } finally {
      if (mounted && !_completed) setState(() => _processing = false);
    }
  }

  Future<void> _confirmPaymentStatus() async {
    if (_processing || _completed) return;
    setState(() {
      _processing = true;
      _error = null;
    });
    try {
      final result = await _verifyWithServer();
      if (result != null) {
        await _confirmPaidAndExit(result);
      }
    } catch (e) {
      if (!mounted) return;
      setState(() => _error = paymentErrorMessage(e));
    } finally {
      if (mounted && !_completed) setState(() => _processing = false);
    }
  }

  void _handleError(PaymentFailureResponse response) {
    if (!mounted || _completed) return;
    // Razorpay Android sometimes fires error after success while verify is running.
    if (_processing) return;
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
                const SizedBox(height: AppSpacing.xs),
                const Text(
                  'Agar payment cut ho chuka hai to "Confirm payment" dabayein.',
                  style: TextStyle(fontSize: 12, color: AppColors.textSecondary),
                ),
              ],
              const SizedBox(height: AppSpacing.lg),
              PrimaryButton(
                label: _processing ? 'Verifying...' : 'Confirm payment',
                expanded: true,
                icon: Icons.verified_rounded,
                onPressed: _processing ? null : _confirmPaymentStatus,
              ),
              const SizedBox(height: AppSpacing.sm),
              SecondaryButton(
                label: 'Retry Razorpay',
                expanded: true,
                icon: Icons.payment_rounded,
                onPressed: _processing || _completed ? null : _openCheckout,
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
