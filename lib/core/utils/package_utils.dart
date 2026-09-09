import 'dart:convert';

import '../../models/app_models.dart';

int? parsePackageId(dynamic raw) {
  if (raw is int) return raw;
  if (raw is num) return raw.toInt();
  return int.tryParse(raw?.toString() ?? '');
}

List<String> parsePackageFeatures(dynamic raw) {
  if (raw is List) {
    return raw.map((e) => e.toString()).where((s) => s.trim().isNotEmpty).toList();
  }
  if (raw is String && raw.trim().isNotEmpty) {
    try {
      final decoded = jsonDecode(raw);
      if (decoded is List) {
        return decoded.map((e) => e.toString()).where((s) => s.trim().isNotEmpty).toList();
      }
    } catch (_) {}
  }
  return const [];
}

bool isStarterPackage(Map<String, dynamic> item) {
  final name = item['name']?.toString().toLowerCase() ?? '';
  if (name.contains('starter')) return true;
  final amountRaw = item['amount_inr'];
  final amount = amountRaw is num
      ? amountRaw.toDouble()
      : double.tryParse(amountRaw?.toString() ?? '');
  if (amount != null && amount >= 99 && amount <= 3500) return true;
  final price = item['price_label']?.toString().replaceAll(',', '') ?? '';
  return (price.contains('2999') || price.contains('999')) && !price.contains('4999');
}

String formatValidityLabel(String? rawValidity) {
  final v = (rawValidity ?? '').trim();
  if (v.isEmpty || v.toLowerCase().contains('year') || v.toLowerCase().contains('1') || v.toLowerCase().contains('month')) {
    return '1 Year (Valid until NEET Exam)';
  }
  return '$v (Valid until NEET Exam)';
}

SubscriptionPlanData subscriptionPlanFromApi(Map<String, dynamic> item) {
  return SubscriptionPlanData(
    raw: item,
    plan: SubscriptionPlan(
      name: item['name']?.toString() ?? 'Plan',
      priceLabel: item['price_label']?.toString() ?? '',
      validity: formatValidityLabel(item['validity']?.toString()),
      highlight: item['highlight']?.toString() ?? 'Full 1 Year Access until NEET Exam',
      features: parsePackageFeatures(item['features_json']),
      isRecommended: item['name']?.toString().toLowerCase().contains('rank') ?? false,
    ),
  );
}

class SubscriptionPlanData {
  const SubscriptionPlanData({required this.raw, required this.plan});

  final Map<String, dynamic> raw;
  final SubscriptionPlan plan;
}
