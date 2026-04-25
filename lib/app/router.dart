import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../core/data/dummy_data.dart';
import '../core/providers/app_state.dart';
import '../features/analytics/analytics_screen.dart';
import '../features/auth/auth_screens.dart';
import '../features/books/books_screens.dart';
import '../features/dashboard/dashboard_screens.dart';
import '../features/info/info_screens.dart';
import '../features/todays_mcqs/todays_mcqs_screen.dart';
import '../features/todays_mcqs/todays_mcq_test_screens.dart';
import '../features/practice/practice_screens.dart';
import '../features/profile/profile_screens.dart';
import '../features/subscriptions/paywall_screen.dart';
import '../features/subscriptions/subscriptions_screen.dart';
import '../features/tests/tests_screens.dart';

final goRouterProvider = Provider<GoRouter>((ref) {
  final authBloc = ref.read(authBlocProvider);
  String? redirect(BuildContext context, GoRouterState state) {
    final auth = authBloc.state;
    final ui = ref.read(appUiControllerProvider);
    final loc = state.uri.path;

    const publicPaths = <String>{
      '/',
      '/onboarding',
      '/login',
      '/signup',
      '/forgot-password',
    };
    const purchasePaths = {'/paywall', '/subscriptions'};

    if (!auth.isLoggedIn) {
      if (publicPaths.contains(loc)) return null;
      return '/login';
    }

    if (!ui.hasActiveSubscription) {
      if (purchasePaths.contains(loc)) return null;
      if (loc == '/') return null;
      if (publicPaths.contains(loc)) return '/paywall';
      return '/paywall';
    }

    if (loc == '/paywall') return '/dashboard/0';
    if (loc == '/login' ||
        loc == '/signup' ||
        loc == '/onboarding' ||
        loc == '/forgot-password') {
      return '/dashboard/0';
    }
    return null;
  }

  final router = GoRouter(
    initialLocation: '/',
    refreshListenable: GoRouterRefreshStream(authBloc.stream),
    redirect: redirect,
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: '/onboarding',
        builder: (context, state) => const OnboardingScreen(),
      ),
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/signup',
        builder: (context, state) => const SignupScreen(),
      ),
      GoRoute(
        path: '/forgot-password',
        builder: (context, state) => const ForgotPasswordScreen(),
      ),
      GoRoute(
        path: '/paywall',
        builder: (context, state) => const PaywallScreen(),
      ),
      GoRoute(
        path: '/dashboard/:tab',
        pageBuilder: (context, state) {
          final tabIndex = int.tryParse(state.pathParameters['tab'] ?? '0') ?? 0;
          return NoTransitionPage(
            child: DashboardShellScreen(tabIndex: tabIndex.clamp(0, 4)),
          );
        },
      ),
      GoRoute(
        path: '/books/chapter/:chapterId',
        builder: (context, state) {
          final chapterId =
              int.tryParse(state.pathParameters['chapterId'] ?? '') ?? 0;
          return ChapterDetailScreen(chapterId: chapterId);
        },
      ),
      GoRoute(
        path: '/practice/attempt/:setId',
        builder: (context, state) {
          final setId = int.tryParse(state.pathParameters['setId'] ?? '') ?? 0;
          return PracticeAttemptScreen(setId: setId);
        },
      ),
      GoRoute(
        path: '/tests/detail/:testId',
        builder: (context, state) {
          final testId = state.pathParameters['testId']!;
          return TestDetailScreen(test: DummyData.findTest(testId));
        },
      ),
      GoRoute(
        path: '/tests/result/:testId',
        builder: (context, state) {
          final testId = state.pathParameters['testId']!;
          return TestResultScreen(test: DummyData.findTest(testId));
        },
      ),
      GoRoute(
        path: '/todays-mcq-test',
        builder: (context, state) => const TodaysMcqTestPreviewScreen(),
      ),
      GoRoute(
        path: '/todays-mcq-test/attempt',
        builder: (context, state) => const TodaysMcqTestAttemptScreen(),
      ),
      GoRoute(
        path: '/todays-mcqs',
        builder: (context, state) => const TodaysMcqsScreen(),
      ),
      GoRoute(
        path: '/info/:slug',
        builder: (context, state) {
          final slug = state.pathParameters['slug'] ?? '';
          return InfoDetailScreen(slug: slug);
        },
      ),
      GoRoute(
        path: '/analytics',
        builder: (context, state) => const AnalyticsScreen(),
      ),
      GoRoute(
        path: '/subscriptions',
        builder: (context, state) => const SubscriptionsScreen(),
      ),
      GoRoute(
        path: '/saved',
        builder: (context, state) => const SavedRevisionScreen(),
      ),
      GoRoute(
        path: '/notifications',
        builder: (context, state) => const NotificationsScreen(),
      ),
      GoRoute(
        path: '/profile/edit',
        builder: (context, state) => const EditProfileScreen(),
      ),
      GoRoute(
        path: '/profile',
        builder: (context, state) => const ProfileShellScreen(),
      ),
    ],
  );

  ref.listen(appUiControllerProvider, (previous, next) => router.refresh());
  return router;
});

class GoRouterRefreshStream extends ChangeNotifier {
  GoRouterRefreshStream(Stream<dynamic> stream) {
    _subscription = stream.asBroadcastStream().listen((_) => notifyListeners());
  }

  late final StreamSubscription<dynamic> _subscription;

  @override
  void dispose() {
    _subscription.cancel();
    super.dispose();
  }
}
