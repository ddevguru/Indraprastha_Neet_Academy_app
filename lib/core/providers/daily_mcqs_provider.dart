import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../features/content/data/content_repository.dart';
import '../../models/daily_mcq_item.dart';

class DailyMcqsNotifier extends AsyncNotifier<List<DailyMcqItem>> {
  @override
  Future<List<DailyMcqItem>> build() => ContentRepository().fetchDailyMcqs();

  Future<void> refresh() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() => ContentRepository().fetchDailyMcqs());
  }
}

final dailyMcqsProvider =
    AsyncNotifierProvider<DailyMcqsNotifier, List<DailyMcqItem>>(
      DailyMcqsNotifier.new,
    );
