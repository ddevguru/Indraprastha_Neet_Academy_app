import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

/// Persists in-progress test and practice attempts locally so users can resume.
class AttemptDraftStore {
  AttemptDraftStore(this._prefs);

  final SharedPreferences _prefs;

  static String testKey(int testId) => 'test_draft_$testId';
  static String practiceKey(int setId) => 'practice_draft_$setId';

  Map<String, dynamic>? loadTestDraft(int testId) =>
      _read(testKey(testId));

  Future<void> saveTestDraft(int testId, Map<String, dynamic> draft) =>
      _write(testKey(testId), draft);

  Future<void> clearTestDraft(int testId) => _prefs.remove(testKey(testId));

  Map<String, dynamic>? loadPracticeDraft(int setId) =>
      _read(practiceKey(setId));

  Future<void> savePracticeDraft(int setId, Map<String, dynamic> draft) =>
      _write(practiceKey(setId), draft);

  Future<void> clearPracticeDraft(int setId) =>
      _prefs.remove(practiceKey(setId));

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
