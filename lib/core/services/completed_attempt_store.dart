import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

/// Store to persist completed attempts for tests, practice sets, PYQs, and daily MCQs
/// so students can view their attempt history in Read-Only Review mode but cannot re-attempt.
class CompletedAttemptStore {
  CompletedAttemptStore(this._prefs);

  final SharedPreferences _prefs;

  static String testKey(int testId) => 'completed_test_$testId';
  static String practiceKey(int setId) => 'completed_practice_$setId';
  static String pyqKey(dynamic chapterId) => 'completed_pyq_$chapterId';
  static String mcqKey(String dateStr) => 'completed_mcq_$dateStr';

  /// Check if a test was attempted
  bool isTestCompleted(int testId) => _hasKey(testKey(testId));

  /// Check if a practice set was attempted
  bool isPracticeCompleted(int setId) => _hasKey(practiceKey(setId));

  /// Check if PYQs for chapter were attempted
  bool isPyqCompleted(dynamic chapterId) => _hasKey(pyqKey(chapterId));

  /// Check if daily MCQ was attempted
  bool isMcqCompleted(String dateStr) => _hasKey(mcqKey(dateStr));

  /// Save completed test attempt
  Future<void> saveCompletedTest(int testId, Map<String, dynamic> data) async {
    await _write(testKey(testId), data);
  }

  /// Load completed test attempt
  Map<String, dynamic>? loadCompletedTest(int testId) => _read(testKey(testId));

  /// Save completed practice attempt
  Future<void> saveCompletedPractice(int setId, Map<String, dynamic> data) async {
    await _write(practiceKey(setId), data);
  }

  /// Load completed practice attempt
  Map<String, dynamic>? loadCompletedPractice(int setId) => _read(practiceKey(setId));

  /// Save completed PYQ attempt
  Future<void> saveCompletedPyq(dynamic chapterId, Map<String, dynamic> data) async {
    await _write(pyqKey(chapterId), data);
  }

  /// Load completed PYQ attempt
  Map<String, dynamic>? loadCompletedPyq(dynamic chapterId) => _read(pyqKey(chapterId));

  /// Save completed Daily MCQ attempt
  Future<void> saveCompletedMcq(String dateStr, Map<String, dynamic> data) async {
    await _write(mcqKey(dateStr), data);
  }

  /// Load completed Daily MCQ attempt
  Map<String, dynamic>? loadCompletedMcq(String dateStr) => _read(mcqKey(dateStr));

  bool _hasKey(String key) {
    return _prefs.containsKey(key);
  }

  Map<String, dynamic>? _read(String key) {
    final raw = _prefs.getString(key);
    if (raw == null || raw.isEmpty) return null;
    try {
      return Map<String, dynamic>.from(jsonDecode(raw) as Map);
    } catch (_) {
      return null;
    }
  }

  Future<void> _write(String key, Map<String, dynamic> data) async {
    final payload = {
      ...data,
      'completed': true,
      'completedAt': data['completedAt'] ?? DateTime.now().toIso8601String(),
    };
    await _prefs.setString(key, jsonEncode(payload));
  }
}
