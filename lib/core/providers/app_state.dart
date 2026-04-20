import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../features/auth/bloc/auth_bloc.dart';
import '../../features/auth/data/auth_repository.dart';

final sharedPreferencesProvider = Provider<SharedPreferences>(
  (_) => throw UnimplementedError('sharedPreferencesProvider must be overridden'),
);

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  final prefs = ref.watch(sharedPreferencesProvider);
  return AuthRepository(prefs: prefs);
});

final authBlocProvider = Provider<AuthBloc>((ref) {
  final repository = ref.watch(authRepositoryProvider);
  final bloc = AuthBloc(repository);
  ref.onDispose(bloc.close);
  return bloc;
});

@immutable
class AppUiState {
  const AppUiState({
    this.themeMode = ThemeMode.light,
    this.hasActiveSubscription = false,
    this.selectedPlan = 'Starter',
    this.bookmarkedBookIds = const {'book_notes_bio'},
    this.bookmarkedQuestionIds = const {'pq2'},
    this.savedChapterIds = const {'plant_kingdom', 'chemical_bonding'},
    this.notificationsEnabled = true,
    this.downloadOnWifiOnly = true,
  });

  final ThemeMode themeMode;
  /// Dummy gate: only subscribers may use app content (books, tests, etc.).
  final bool hasActiveSubscription;
  final String selectedPlan;
  final Set<String> bookmarkedBookIds;
  final Set<String> bookmarkedQuestionIds;
  final Set<String> savedChapterIds;
  final bool notificationsEnabled;
  final bool downloadOnWifiOnly;

  AppUiState copyWith({
    ThemeMode? themeMode,
    bool? hasActiveSubscription,
    String? selectedPlan,
    Set<String>? bookmarkedBookIds,
    Set<String>? bookmarkedQuestionIds,
    Set<String>? savedChapterIds,
    bool? notificationsEnabled,
    bool? downloadOnWifiOnly,
  }) {
    return AppUiState(
      themeMode: themeMode ?? this.themeMode,
      hasActiveSubscription: hasActiveSubscription ?? this.hasActiveSubscription,
      selectedPlan: selectedPlan ?? this.selectedPlan,
      bookmarkedBookIds: bookmarkedBookIds ?? this.bookmarkedBookIds,
      bookmarkedQuestionIds:
          bookmarkedQuestionIds ?? this.bookmarkedQuestionIds,
      savedChapterIds: savedChapterIds ?? this.savedChapterIds,
      notificationsEnabled: notificationsEnabled ?? this.notificationsEnabled,
      downloadOnWifiOnly: downloadOnWifiOnly ?? this.downloadOnWifiOnly,
    );
  }
}

class AppUiController extends Notifier<AppUiState> {
  @override
  AppUiState build() => const AppUiState();

  void toggleTheme(bool isDark) {
    state = state.copyWith(themeMode: isDark ? ThemeMode.dark : ThemeMode.light);
  }

  void selectPlan(String planName) {
    state = state.copyWith(selectedPlan: planName);
  }

  /// Call when user completes a plan purchase in the Subscriptions UI (dummy).
  void activateSubscription(String planName) {
    state = state.copyWith(
      hasActiveSubscription: true,
      selectedPlan: planName,
    );
  }

  /// Reset when logging out so the next session can demo non-subscriber flow.
  void resetSubscriptionGate() {
    state = state.copyWith(hasActiveSubscription: false);
  }

  void toggleBookBookmark(String bookId) {
    final next = <String>{...state.bookmarkedBookIds};
    next.contains(bookId) ? next.remove(bookId) : next.add(bookId);
    state = state.copyWith(bookmarkedBookIds: next);
  }

  void toggleQuestionBookmark(String questionId) {
    final next = <String>{...state.bookmarkedQuestionIds};
    next.contains(questionId) ? next.remove(questionId) : next.add(questionId);
    state = state.copyWith(bookmarkedQuestionIds: next);
  }

  void toggleSavedChapter(String chapterId) {
    final next = <String>{...state.savedChapterIds};
    next.contains(chapterId) ? next.remove(chapterId) : next.add(chapterId);
    state = state.copyWith(savedChapterIds: next);
  }

  void setNotifications(bool enabled) {
    state = state.copyWith(notificationsEnabled: enabled);
  }

  void setDownloadPreference(bool wifiOnly) {
    state = state.copyWith(downloadOnWifiOnly: wifiOnly);
  }
}

final appUiControllerProvider = NotifierProvider<AppUiController, AppUiState>(
  AppUiController.new,
);
