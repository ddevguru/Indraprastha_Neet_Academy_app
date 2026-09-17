import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

/// Persists in-progress test and practice attempts locally so users can resume.
class AttemptDraftStore {
  AttemptDraftStore(this._prefs, {this.userId});

  final SharedPreferences _prefs;
  final String? userId;

  static String testKey(int testId, [String? userId]) =>
      'test_draft_${userId != null && userId.isNotEmpty ? "${userId}_" : ""}$testId';
  static String practiceKey(int setId, [String? userId]) =>
      'practice_draft_${userId != null && userId.isNotEmpty ? "${userId}_" : ""}$setId';

  Map<String, dynamic>? loadTestDraft(int testId) =>
      _read(testKey(testId, userId));

  Future<void> saveTestDraft(int testId, Map<String, dynamic> draft) =>
      _write(testKey(testId, userId), draft);

  Future<void> clearTestDraft(int testId) => _prefs.remove(testKey(testId, userId));

  Map<String, dynamic>? loadPracticeDraft(int setId) =>
      _read(practiceKey(setId, userId));

  Future<void> savePracticeDraft(int setId, Map<String, dynamic> draft) =>
      _write(practiceKey(setId, userId), draft);

  Future<void> clearPracticeDraft(int setId) =>
      _prefs.remove(practiceKey(setId, userId));

  Map<String, dynamic>? _read(String key) {
    final raw = _prefs.getString(key);
    if (raw == null || raw.isEmpty) return null;
    try {
      return Map<String, dynamic>.from(jsonDecode(raw) as Map);
    } catch (_) {
      return null;
    }
  }

  Future<void> _write(String key, Map<String, dynamic> draft) async {
    await _prefs.setString(key, jsonEncode(draft));
  }
}

bool isTruthyCompletionFlag(dynamic value) {
  if (value == true) return true;
  if (value is num) return value != 0;
  final text = value?.toString().toLowerCase().trim() ?? '';
  return text == 'true' || text == 't' || text == '1';
}
