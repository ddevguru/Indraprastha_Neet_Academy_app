import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

/// Free-tier preview: first [freeItemLimit] items per content type stay unlocked.
class ContentAccess {
  ContentAccess._();

  static const int freeItemLimit = 2;

  static bool isItemUnlocked({
    required int index,
    required bool hasActiveSubscription,
  }) {
    if (hasActiveSubscription) return true;
    return index < freeItemLimit;
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
