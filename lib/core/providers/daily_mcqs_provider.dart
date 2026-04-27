import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../features/content/data/content_repository.dart';
import '../../models/daily_mcq_item.dart';

class McqOfDayNotifier extends AsyncNotifier<List<McqOfDay>> {
  @override
  Future<List<McqOfDay>> build() => _fetch();

  Future<List<McqOfDay>> _fetch() async {
    final raw = await ContentRepository().fetchMcqOfDay();
    return raw.map(McqOfDay.fromJson).toList();
  }

  Future<void> refresh() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(_fetch);
  }
}

final mcqOfDayProvider =
    AsyncNotifierProvider<McqOfDayNotifier, List<McqOfDay>>(
        McqOfDayNotifier.new);
