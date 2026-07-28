import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

/// Free-tier preview: first [freeItemLimit] items per content type stay unlocked.
class ContentAccess {
  ContentAccess._();

  static const int freeItemLimit = 1;
  static const int freeTestLimit = 3;

  static bool isItemUnlocked({
    required int index,
    required bool hasActiveSubscription,
  }) {
    if (hasActiveSubscription) return true;
    return index < freeItemLimit;
  }

  static bool isTestUnlocked({
    required int index,
    required bool hasActiveSubscription,
  }) {
    if (hasActiveSubscription) return true;
    return index < freeTestLimit;
  }

  static bool isIdUnlocked({
    required String itemId,
    required List<String> orderedIds,
    required bool hasActiveSubscription,
  }) {
    if (hasActiveSubscription) return true;
    final index = orderedIds.indexOf(itemId);
    if (index < 0) return false;
    return index < freeItemLimit;
  }

  static bool isTestIdUnlocked({
    required String testId,
    required List<String> orderedIds,
    required bool hasActiveSubscription,
  }) {
    if (hasActiveSubscription) return true;
    final index = orderedIds.indexOf(testId);
    if (index < 0) return false;
    return index < freeTestLimit;
  }

  static String practiceSubjectKey(Map<String, dynamic> set) {
    final subject = set['subject']?.toString().trim() ?? '';
    final standard = set['class_label']?.toString().trim() ??
        set['standard_label']?.toString().trim() ??
        '';
    if (standard.isNotEmpty && subject.isNotEmpty) return '$standard $subject';
    if (subject.isNotEmpty) return subject;
    return 'General';
  }

  static int comparePracticeSetOrder(
    Map<String, dynamic> a,
    Map<String, dynamic> b,
  ) {
    final idA = (a['id'] as num?)?.toInt() ?? 0;
    final idB = (b['id'] as num?)?.toInt() ?? 0;
    return idA.compareTo(idB);
  }

  static List<Map<String, dynamic>> setsInSameSubject(
    Map<String, dynamic> set,
    List<Map<String, dynamic>> allSets,
  ) {
    final key = practiceSubjectKey(set);
    return allSets
        .where((s) => practiceSubjectKey(s) == key)
        .toList()
      ..sort(comparePracticeSetOrder);
  }

  /// One free practice set per subject group for non-subscribers.
  static bool isPracticeSetUnlocked({
    required Map<String, dynamic> set,
    required List<Map<String, dynamic>> allSets,
    required bool hasActiveSubscription,
  }) {
    if (hasActiveSubscription) return true;
    final subjectSets = setsInSameSubject(set, allSets);
    final ids = subjectSets.map((s) => '${s['id']}').toList();
    return isIdUnlocked(
      itemId: '${set['id']}',
      orderedIds: ids,
      hasActiveSubscription: false,
    );
  }

  /// One free chapter within a multi-chapter practice set.
  static bool isChapterUnlocked({
    required int index,
    required bool hasActiveSubscription,
  }) {
    return isItemUnlocked(
      index: index,
      hasActiveSubscription: hasActiveSubscription,
    );
  }

  static void openSubscriptions(BuildContext context) {
    context.push('/subscriptions');
  }

  static void handleTap({
    required BuildContext context,
    required bool locked,
    required VoidCallback onUnlocked,
  }) {
    if (locked) {
      openSubscriptions(context);
      return;
    }
    onUnlocked();
  }
}
