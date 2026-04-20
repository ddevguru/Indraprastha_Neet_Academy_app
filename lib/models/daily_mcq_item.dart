import 'app_models.dart';

/// Rotates through "Today's MCQs"; after 24 hours from [issuedAt] the item is
/// treated as moved into the chapter's permanent PYQ / practice section (demo).
class DailyMcqItem {
  const DailyMcqItem({
    required this.id,
    required this.subject,
    required this.chapterId,
    required this.chapterTitle,
    required this.standardLabel,
    required this.preview,
    required this.issuedAt,
  });

  final String id;
  final SubjectType subject;
  final String chapterId;
  final String chapterTitle;
  final String standardLabel;
  final String preview;
  final DateTime issuedAt;

  DateTime get expiresAt => issuedAt.add(const Duration(hours: 24));

  bool get isInTodaysWindow => DateTime.now().isBefore(expiresAt);
}

extension DailyMcqListX on List<DailyMcqItem> {
  List<DailyMcqItem> get activeInTodaysFeed =>
      where((e) => e.isInTodaysWindow).toList();

  List<DailyMcqItem> get archivedToChapters =>
      where((e) => !e.isInTodaysWindow).toList();

  List<DailyMcqItem> archivedForChapter(String chapterId) =>
      where((e) => !e.isInTodaysWindow && e.chapterId == chapterId).toList();
}
