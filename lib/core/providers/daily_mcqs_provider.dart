import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../features/content/data/content_repository.dart';
import '../../models/daily_mcq_item.dart';
import 'app_state.dart';

class DailyMcqsNotifier extends AsyncNotifier<List<DailyMcqItem>> {
  @override
  Future<List<DailyMcqItem>> build() {
    final prefs = ref.read(sharedPreferencesProvider);
    return ContentRepository(prefs: prefs).fetchDailyMcqs();
  }

  Future<void> refresh() async {
    state = const AsyncLoading();
    final prefs = ref.read(sharedPreferencesProvider);
    state = await AsyncValue.guard(() => ContentRepository(prefs: prefs).fetchDailyMcqs());
  }
}

final dailyMcqsProvider =
    AsyncNotifierProvider<DailyMcqsNotifier, List<DailyMcqItem>>(
      DailyMcqsNotifier.new,
    );
