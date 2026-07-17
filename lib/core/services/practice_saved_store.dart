import 'dart:convert';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../providers/app_state.dart';

class SavedPracticeQuestion {
  const SavedPracticeQuestion({
    required this.id,
    required this.setId,
    required this.setTitle,
    required this.question,
  });

  final String id;
  final int setId;
  final String setTitle;
  final Map<String, dynamic> question;

  Map<String, dynamic> toJson() => {
        'id': id,
        'setId': setId,
        'setTitle': setTitle,
        'question': question,
      };

  factory SavedPracticeQuestion.fromJson(Map<String, dynamic> json) {
    return SavedPracticeQuestion(
      id: json['id']?.toString() ?? '',
      setId: (json['setId'] as num?)?.toInt() ?? 0,
      setTitle: json['setTitle']?.toString() ?? 'Practice',
      question: Map<String, dynamic>.from(json['question'] as Map? ?? {}),
    );
  }

  SavedPracticeQuestion copyWith({
    int? setId,
    String? setTitle,
    Map<String, dynamic>? question,
  }) {
    return SavedPracticeQuestion(
      id: id,
      setId: setId ?? this.setId,
      setTitle: setTitle ?? this.setTitle,
      question: question ?? this.question,
    );
  }
}

class PracticeSavedState {
  const PracticeSavedState({
    this.bookmarked = const [],
    this.incorrect = const [],
  });

  final List<SavedPracticeQuestion> bookmarked;
  final List<SavedPracticeQuestion> incorrect;

  Set<String> get bookmarkedIds =>
      bookmarked.map((question) => question.id).toSet();

  Set<String> get incorrectIds =>
      incorrect.map((question) => question.id).toSet();

  PracticeSavedState copyWith({
    List<SavedPracticeQuestion>? bookmarked,
    List<SavedPracticeQuestion>? incorrect,
  }) {
    return PracticeSavedState(
      bookmarked: bookmarked ?? this.bookmarked,
      incorrect: incorrect ?? this.incorrect,
    );
  }
}

class PracticeSavedController extends Notifier<PracticeSavedState> {
  static const _bookmarksKey = 'practice_bookmarked_questions_v1';
  static const _incorrectKey = 'practice_incorrect_questions_v1';

  SharedPreferences get _prefs => ref.read(sharedPreferencesProvider);

  @override
  PracticeSavedState build() => _load();

  PracticeSavedState _load() {
    final bookmarked = _decodeList(_prefs.getString(_bookmarksKey));
    final incorrect = _decodeList(_prefs.getString(_incorrectKey));
    return PracticeSavedState(bookmarked: bookmarked, incorrect: incorrect);
  }

  List<SavedPracticeQuestion> _decodeList(String? raw) {
    if (raw == null || raw.isEmpty) return const [];
    try {
      final decoded = jsonDecode(raw) as List<dynamic>;
      return decoded
          .map((item) => SavedPracticeQuestion.fromJson(
                Map<String, dynamic>.from(item as Map),
              ))
          .where((item) => item.id.isNotEmpty)
          .toList();
    } catch (_) {
      return const [];
    }
  }

  Future<void> _persist() async {
    await _prefs.setString(
      _bookmarksKey,
      jsonEncode(state.bookmarked.map((item) => item.toJson()).toList()),
    );
    await _prefs.setString(
      _incorrectKey,
      jsonEncode(state.incorrect.map((item) => item.toJson()).toList()),
    );
  }

  void toggleBookmark(SavedPracticeQuestion entry) {
    final next = List<SavedPracticeQuestion>.from(state.bookmarked);
    final index = next.indexWhere((item) => item.id == entry.id);
    if (index >= 0) {
      next.removeAt(index);
    } else {
      next.insert(0, entry);
    }
    state = state.copyWith(bookmarked: next);
    _persist();
  }

  void removeBookmark(String questionId) {
    final next =
        state.bookmarked.where((item) => item.id != questionId).toList();
    if (next.length == state.bookmarked.length) return;
    state = state.copyWith(bookmarked: next);
    _persist();
  }

  void addIncorrect(SavedPracticeQuestion entry) {
    final next = List<SavedPracticeQuestion>.from(state.incorrect);
    next.removeWhere((item) => item.id == entry.id);
    next.insert(0, entry);
    state = state.copyWith(incorrect: next);
    _persist();
  }

  void removeIncorrect(String questionId) {
    final next =
        state.incorrect.where((item) => item.id != questionId).toList();
    if (next.length == state.incorrect.length) return;
    state = state.copyWith(incorrect: next);
    _persist();
  }

  void clearIncorrect() {
    if (state.incorrect.isEmpty) return;
    state = state.copyWith(incorrect: const []);
    _persist();
  }
}

final practiceSavedControllerProvider =
    NotifierProvider<PracticeSavedController, PracticeSavedState>(
  PracticeSavedController.new,
);
