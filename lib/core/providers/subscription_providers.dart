import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/utils/package_utils.dart';
import '../../features/content/data/content_repository.dart';

/// Cached subscription plans — survives router refresh without reloading UI.
final subscriptionPackagesProvider =
    FutureProvider<List<SubscriptionPlanData>>((ref) async {
  final raw = await ContentRepository().fetchPackages();
  return raw
      .where(isStarterPackage)
      .map(subscriptionPlanFromApi)
      .toList();
});
