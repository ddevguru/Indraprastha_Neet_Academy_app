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
    return 'Payment verify failed (signature). Server Razorpay keys check karein.';
  }
  if (text.contains('Not logged in')) {
    return 'Session expire ho gaya. Dobara login karke verify karein.';
  }
  return text.replaceFirst('Exception: ', '');
}
