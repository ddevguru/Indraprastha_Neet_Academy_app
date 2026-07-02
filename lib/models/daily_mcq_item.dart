import 'app_models.dart';

class DailyMcqItem {
  const DailyMcqItem({
    required this.id,
    required this.subject,
    required this.chapterId,
    required this.chapterTitle,
    required this.standardLabel,
    required this.preview,
    required this.issuedAt,
    this.isActive = true,
    this.optionA,
    this.optionB,
    this.optionC,
    this.optionD,
    this.correctOption,
    this.explanation,
    this.explanationImageLink,
  });

  final String id;
  final SubjectType subject;
  final String chapterId;
  final String chapterTitle;
  final String standardLabel;
  final String preview;
  final DateTime issuedAt;
  final bool isActive;
  final String? optionA;
  final String? optionB;
  final String? optionC;
  final String? optionD;
  final int? correctOption; // 0=A, 1=B, 2=C, 3=D
  final String? explanation;
  final String? explanationImageLink;

  List<String> get options => [optionA, optionB, optionC, optionD]
      .whereType<String>()
      .where((o) => o.isNotEmpty)
      .toList();

  bool get hasRealOptions => optionA != null && optionA!.isNotEmpty;

  DateTime get expiresAt {
    final day = DateTime(issuedAt.year, issuedAt.month, issuedAt.day);
    return day.add(const Duration(days: 1));
  }

  bool get isInTodaysWindow {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final issued = DateTime(issuedAt.year, issuedAt.month, issuedAt.day);
    return issued == today && isActive;
  }

  bool get isArchived => !isInTodaysWindow;

  factory DailyMcqItem.fromApi(Map<String, dynamic> m) {
    SubjectType subject = SubjectType.physics;
    final s = (m['subject'] as String? ?? '').toLowerCase();
    if (s.contains('chem')) {
      subject = SubjectType.chemistry;
    } else if (s.contains('bot') || s.contains('plant')) {
      subject = SubjectType.botany;
    } else if (s.contains('zoo') || s.contains('animal')) {
      subject = SubjectType.zoology;
    }

    int? correctOption;
    final co = (m['correct_option'] as String? ?? '').toUpperCase();
    if (co == 'A') {
      correctOption = 0;
    } else if (co == 'B') {
      correctOption = 1;
    } else if (co == 'C') {
      correctOption = 2;
    } else if (co == 'D') {
      correctOption = 3;
    }

    final createdRaw = m['created_at']?.toString();
    final issuedAt = createdRaw != null
        ? (DateTime.tryParse(createdRaw)?.toLocal() ?? DateTime.now())
        : DateTime.now();

    return DailyMcqItem(
      id: m['id'].toString(),
      subject: subject,
      chapterId: (m['topic'] as String?)?.replaceAll(' ', '_').toLowerCase() ?? '',
      chapterTitle: m['topic'] as String? ?? '',
      standardLabel: m['class_label'] as String? ?? '',
      preview: m['question'] as String? ?? '',
      issuedAt: issuedAt,
      isActive: m['is_active'] as bool? ?? true,
      optionA: m['option_a'] as String?,
      optionB: m['option_b'] as String?,
      optionC: m['option_c'] as String?,
      optionD: m['option_d'] as String?,
      correctOption: correctOption,
      explanation: m['explanation'] as String?,
      explanationImageLink: m['explanation_image_link'] as String?,
    );
  }
}

extension DailyMcqListX on List<DailyMcqItem> {
  List<DailyMcqItem> get activeInTodaysFeed =>
      where((e) => e.isInTodaysWindow).toList();

  List<DailyMcqItem> get archivedToChapters =>
      where((e) => !e.isInTodaysWindow).toList();

  List<DailyMcqItem> archivedForChapter(String chapterId) =>
      where((e) => !e.isInTodaysWindow && e.chapterId == chapterId).toList();
}
