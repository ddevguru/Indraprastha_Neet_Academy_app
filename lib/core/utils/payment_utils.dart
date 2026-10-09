bool isPaymentVerified(Map<String, dynamic> result) {
  if (result['paid'] == true) return true;
  if (result['paid']?.toString().toLowerCase() == 'true') return true;
  final orderStatus = result['orderStatus']?.toString().toLowerCase() ?? '';
  if (orderStatus == 'paid' || orderStatus == 'captured' || orderStatus == 'authorized') {
    return true;
  }
  final subscription = result['subscription'];
  if (subscription is Map && subscription['status']?.toString().toLowerCase() == 'active') {
    return true;
  }
  return false;
}

String paymentErrorMessage(Object error) {
  final text = error.toString();
  if (text.contains('Invalid payment signature')) {
    return 'Payment verification failed. Please contact support if amount was deducted.';
  }
  if (text.contains('Not logged in')) {
    return 'Session expired. Please log in again.';
  }
  return text.replaceFirst('Exception: ', '');
}
