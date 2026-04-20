import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../models/daily_mcq_item.dart';
import '../data/daily_mcqs_data.dart';

class DailyMcqsNotifier extends Notifier<List<DailyMcqItem>> {
  @override
  List<DailyMcqItem> build() => DailyMcqsData.seedSession();

  void reset() {
    state = DailyMcqsData.seedSession();
  }
}

final dailyMcqsProvider =
    NotifierProvider<DailyMcqsNotifier, List<DailyMcqItem>>(DailyMcqsNotifier.new);
