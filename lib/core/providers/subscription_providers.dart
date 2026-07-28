import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/utils/package_utils.dart';
import '../../features/content/data/content_repository.dart';
import 'app_state.dart';

/// Cached subscription plans — survives router refresh without reloading UI.
final subscriptionPackagesProvider =
    FutureProvider<List<SubscriptionPlanData>>((ref) async {
  final prefs = ref.read(sharedPreferencesProvider);
  final raw = await ContentRepository(prefs: prefs).fetchPackages();
  return raw
      .where(isStarterPackage)
      .map(subscriptionPlanFromApi)
      .toList();
});
