import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import '../constants/api_constants.dart';

/// Post-launch onboarding checklist steps tied to real product actions.
enum OnboardingChecklistStep {
  openFirstChapter('open_first_chapter', 'Open your first chapter in Books'),
  attemptFirstPractice('attempt_first_practice', 'Attempt your first practice set'),
  takeFirstTest('take_first_test', 'Take your first mock test'),
  viewAnalytics('view_analytics', 'Review your performance analytics'),
  saveForRevision('save_for_revision', 'Save a chapter for revision');

  const OnboardingChecklistStep(this.key, this.label);

  final String key;
  final String label;

  static OnboardingChecklistStep? fromKey(String key) {
    for (final step in values) {
      if (step.key == key) return step;
    }
    return null;
  }
}

class OnboardingChecklistService {
  OnboardingChecklistService({
    required SharedPreferences prefs,
    http.Client? client,
  })  : _prefs = prefs,
        _client = client ?? http.Client();

  static const _localKey = 'onboarding_checklist_local';
  static const _dismissedKey = 'onboarding_checklist_dismissed';

  final SharedPreferences _prefs;
  final http.Client _client;

  Set<String> get completedKeys {
    final raw = _prefs.getStringList(_localKey) ?? const [];
    return raw.toSet();
  }

  bool get isDismissed => _prefs.getBool(_dismissedKey) ?? false;

  bool get isComplete =>
      completedKeys.length >= OnboardingChecklistStep.values.length;

  bool isStepDone(OnboardingChecklistStep step) =>
      completedKeys.contains(step.key);

  Future<void> dismiss() async {
    await _prefs.setBool(_dismissedKey, true);
  }

  Future<void> markStep(OnboardingChecklistStep step, {String? token}) async {
    if (isStepDone(step)) return;
    final next = {...completedKeys, step.key};
    await _prefs.setStringList(_localKey, next.toList());
    if (token != null) {
      await _syncToBackend(token, next);
    }
  }

  Future<void> loadFromBackend(String token) async {
    try {
      final response = await _client.get(
        Uri.parse('$baseUrl/auth/onboarding-checklist'),
        headers: {'Authorization': 'Bearer $token'},
      );
      if (response.statusCode != 200) return;
      final body = jsonDecode(response.body) as Map<String, dynamic>;
      final remote = Map<String, dynamic>.from(
        body['checklist'] as Map<String, dynamic>? ?? {},
      );
      final merged = <String>{
        ...completedKeys,
        ...remote.entries
            .where((e) => e.value == true)
            .map((e) => e.key),
      };
      await _prefs.setStringList(_localKey, merged.toList());
      if (body['dismissed'] == true) {
        await _prefs.setBool(_dismissedKey, true);
      }
    } catch (_) {}
  }

  Future<void> _syncToBackend(String token, Set<String> keys) async {
    try {
      final checklist = {
        for (final step in OnboardingChecklistStep.values)
          step.key: keys.contains(step.key),
      };
      await _client.patch(
        Uri.parse('$baseUrl/auth/onboarding-checklist'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({'checklist': checklist}),
      );
    } catch (_) {}
  }

  Future<void> syncDismissed(String token) async {
    try {
      await _client.patch(
        Uri.parse('$baseUrl/auth/onboarding-checklist'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({'dismissed': true}),
      );
    } catch (_) {}
  }
}
