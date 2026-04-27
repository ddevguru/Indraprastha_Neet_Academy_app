import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/providers/app_state.dart';
import '../auth/bloc/auth_bloc.dart';
import '../content/data/content_repository.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/adaptive_scaffold.dart';
import '../../widgets/app_widgets.dart';
import '../books/books_screens.dart';
import '../practice/practice_screens.dart';
import '../tests/tests_screens.dart';
import '../videos/videos_screen.dart';

String _greetingLine(String firstName) {
  final h = DateTime.now().hour;
  final g = h < 12
      ? 'Good morning'
      : (h < 17 ? 'Good afternoon' : 'Good evening');
  return '$g, $firstName';
}

class DashboardShellScreen extends StatelessWidget {
  const DashboardShellScreen({
    super.key,
    required this.tabIndex,
  });

  final int tabIndex;

  static const _titles = [
    'Home',
    'Books',
    'Practice',
    'Tests',
    'Videos',
  ];

  @override
  Widget build(BuildContext context) {
    final pages = [
      const DashboardHomeScreen(),
      const BooksScreen(),
      const PracticeHomeScreen(),
      const TestsScreen(),
      const VideosScreen(),
    ];

    final index = tabIndex.clamp(0, pages.length - 1);

    return AdaptiveScaffold(
      currentIndex: index,
      appBarTitle: _titles[index],
      onDestinationSelected: (i) => context.go('/dashboard/$i'),
      body: pages[index],
    );
  }
}

class DashboardHomeScreen extends ConsumerWidget {
  const DashboardHomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = context.watch<AuthBloc>().state.user;
    final uiState = ref.watch(appUiControllerProvider);
    if (user == null) {
      return const Center(child: CircularProgressIndicator());
    }
    final width = MediaQuery.sizeOf(context).width;
    final compact = width < 720;
    final statsFuture = Future.wait([
      ContentRepository().fetchTests(),
      ContentRepository().fetchLatestAnalytics(),
    ]);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppSpacing.lg),
      child: CenteredContent(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SurfaceCard(
              borderRadius: AppRadii.xl,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Align(
                    alignment: Alignment.centerRight,
                    child: Container(
                      decoration: BoxDecoration(
                        color: AppColors.surfaceMuted,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            onPressed: () => ref
                                .read(appUiControllerProvider.notifier)
                                .toggleTheme(uiState.themeMode != ThemeMode.dark),
                            tooltip: uiState.themeMode == ThemeMode.dark
                                ? 'Switch to light mode'
                                : 'Switch to dark mode',
                            icon: Icon(
                              uiState.themeMode == ThemeMode.dark
                                  ? Icons.light_mode_rounded
                                  : Icons.dark_mode_rounded,
                            ),
                          ),
                          IconButton(
                            onPressed: () => context.push('/saved'),
                            icon: const Icon(Icons.bookmark_outline_rounded),
                          ),
                          IconButton(
                            onPressed: () => context.push('/notifications'),
                            icon: const Icon(Icons.notifications_none_rounded),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const AppLogo(size: 58, padding: 4),
                      const SizedBox(width: AppSpacing.md),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            FittedBox(
                              fit: BoxFit.scaleDown,
                              alignment: Alignment.centerLeft,
                              child: Text(
                                _greetingLine(user.fullName.split(' ').first),
                                style:
                                    Theme.of(context).textTheme.headlineMedium,
                                maxLines: 1,
                              ),
                            ),
                            const SizedBox(height: AppSpacing.sm),
                            Material(
                              color: Colors.transparent,
                              child: InkWell(
                                onTap: () =>
                                    context.push('/todays-mcq-test'),
                                borderRadius:
                                    BorderRadius.circular(AppRadii.md),
                                child: Padding(
                                  padding: const EdgeInsets.symmetric(
                                    vertical: AppSpacing.xs,
                                  ),
                                  child: Row(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      const Padding(
                                        padding:
                                            EdgeInsets.only(top: 2),
                                        child: Icon(
                                          Icons.quiz_outlined,
                                          size: 22,
                                          color: AppColors.indigo,
                                        ),
                                      ),
                                      const SizedBox(width: AppSpacing.sm),
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              "Today's MCQ test",
                                              style: Theme.of(context)
                                                  .textTheme
                                                  .titleMedium
                                                  ?.copyWith(
                                                    color: AppColors.indigo,
                                                    fontWeight:
                                                        FontWeight.w700,
                                                  ),
                                            ),
                                            const SizedBox(height: 2),
                                            Text(
                                              'Day of the MCQs — see which subjects & chapters, then start',
                                              style: Theme.of(context)
                                                  .textTheme
                                                  .bodySmall
                                                  ?.copyWith(
                                                    color:
                                                        AppColors.textSecondary,
                                                  ),
                                            ),
                                          ],
                                        ),
                                      ),
                                      const Icon(
                                        Icons.chevron_right_rounded,
                                        color: AppColors.indigo,
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(height: AppSpacing.xs),
                            Text(
                              '${user.targetExamYear} target. Stay consistent and keep the revision cycle tight.',
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.lg),
            const SearchBarWidget(),
            const SizedBox(height: AppSpacing.lg),
            FutureBuilder<List<dynamic>>(
              future: statsFuture,
              builder: (context, snapshot) {
                final tests = snapshot.data != null
                    ? List<Map<String, dynamic>>.from(snapshot.data![0] as List)
                    : const <Map<String, dynamic>>[];
                final analytics = snapshot.data != null
                    ? Map<String, dynamic>.from(snapshot.data![1] as Map)
                    : const <String, dynamic>{};
                final donut = Map<String, dynamic>.from(
                  analytics['donut'] as Map? ?? const {},
                );
                final attempted =
                    (donut['correct'] ?? 0) + (donut['wrong'] ?? 0);
                final total =
                    attempted + (donut['unattempted'] ?? 0);
                final coverage = total == 0 ? 0.0 : (attempted / total).clamp(0.0, 1.0);
                final accuracy = attempted == 0
                    ? 0.0
                    : ((donut['correct'] ?? 0) / attempted).clamp(0.0, 1.0);
                final streak = (analytics['analytics']?['overall_accuracy'] ?? 0)
                    .toString();

                if (compact) {
                  return Column(
                    children: [
                      _CurrentPlanCard(
                        activePlan: user.preferredPlan,
                        syllabus: '${(coverage * 100).round()}%',
                        streak: '${streak == '0' ? '--' : '$streak%'}',
                        testsTaken: '${tests.length}',
                      ),
                      const SizedBox(height: AppSpacing.lg),
                      _DailyTargetCard(
                        coverage: coverage,
                        accuracy: accuracy,
                        testsTaken: tests.length,
                      ),
                    ],
                  );
                }
                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      flex: 2,
                      child: _CurrentPlanCard(
                        activePlan: user.preferredPlan,
                        syllabus: '${(coverage * 100).round()}%',
                        streak: '${streak == '0' ? '--' : '$streak%'}',
                        testsTaken: '${tests.length}',
                      ),
                    ),
                    const SizedBox(width: AppSpacing.lg),
                    Expanded(
                      child: _DailyTargetCard(
                        coverage: coverage,
                        accuracy: accuracy,
                        testsTaken: tests.length,
                      ),
                    ),
                  ],
                );
              },
            ),
            const SizedBox(height: AppSpacing.xl),
            SectionHeader(
              title: 'Continue studying',
              subtitle: 'Jump back into your active study materials.',
              actionLabel: 'Open books',
              onAction: () => context.go('/dashboard/1'),
            ),
            const SizedBox(height: AppSpacing.md),
            LayoutBuilder(
              builder: (context, constraints) {
                return const EmptyStateWidget(
                  title: 'Books list moved to Books tab',
                  subtitle: 'Ab yahan dummy cards nahi dikhaye ja rahe. Real content Books tab se load hota hai.',
                  icon: Icons.menu_book_rounded,
                );
              },
            ),
            const SizedBox(height: AppSpacing.xl),
            SectionHeader(
              title: 'Subject progress',
              subtitle: 'Coverage and accuracy snapshot across core subjects.',
              actionLabel: 'View analytics',
              onAction: () => context.push('/analytics'),
            ),
            const SizedBox(height: AppSpacing.md),
            LayoutBuilder(
              builder: (context, constraints) {
                return const EmptyStateWidget(
                  title: 'Analytics-driven progress',
                  subtitle: 'Progress section backend analytics se bind ho raha hai. Dummy snapshot hata diya gaya hai.',
                  icon: Icons.insights_rounded,
                );
              },
            ),
            const SizedBox(height: AppSpacing.xl),
            LayoutBuilder(
              builder: (context, constraints) {
                if (constraints.maxWidth < 820) {
                  return Column(
                    children: [
                      _RecentTestsPanel(testsFuture: ContentRepository().fetchTests()),
                      SizedBox(height: AppSpacing.lg),
                      _WeakTopicsPanel(analyticsFuture: ContentRepository().fetchLatestAnalytics()),
                    ],
                  );
                }

                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      flex: 3,
                      child: _RecentTestsPanel(
                        testsFuture: ContentRepository().fetchTests(),
                      ),
                    ),
                    SizedBox(width: AppSpacing.lg),
                    Expanded(
                      flex: 2,
                      child: _WeakTopicsPanel(
                        analyticsFuture: ContentRepository().fetchLatestAnalytics(),
                      ),
                    ),
                  ],
                );
              },
            ),
            const SizedBox(height: AppSpacing.xl),
            const _QuickActionsPanel(),
          ],
        ),
      ),
    );
  }
}

class _CurrentPlanCard extends StatelessWidget {
  const _CurrentPlanCard({
    required this.activePlan,
    required this.syllabus,
    required this.streak,
    required this.testsTaken,
  });

  final String activePlan;
  final String syllabus;
  final String streak;
  final String testsTaken;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: AppGradients.primary,
        borderRadius: BorderRadius.circular(AppRadii.xl),
        boxShadow: AppShadows.soft,
      ),
      padding: const EdgeInsets.all(AppSpacing.xl),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppSpacing.md,
                  vertical: AppSpacing.xs,
                ),
                decoration: BoxDecoration(
                  color: Colors.white24,
                  borderRadius: BorderRadius.circular(99),
                ),
                child: const Text(
                  'Current plan',
                  style: TextStyle(color: Colors.white),
                ),
              ),
              const Spacer(),
              TextButton(
                onPressed: () => context.push('/subscriptions'),
                child: const Text(
                  'Manage',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.lg),
          Text(
            activePlan,
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: Colors.white,
                ),
          ),
          const SizedBox(height: AppSpacing.sm),
          const Text(
            'Full access to practice modules, test series, analytics, and revision lists.',
            style: TextStyle(color: Colors.white70),
          ),
          const SizedBox(height: AppSpacing.lg),
          Row(
            children: [
              _PlanMiniStat(title: 'Syllabus', value: syllabus),
              const SizedBox(width: AppSpacing.lg),
              _PlanMiniStat(title: 'Accuracy', value: streak),
              const SizedBox(width: AppSpacing.lg),
              _PlanMiniStat(title: 'Tests taken', value: testsTaken),
            ],
          ),
        ],
      ),
    );
  }
}

class _DailyTargetCard extends StatelessWidget {
  const _DailyTargetCard({
    required this.coverage,
    required this.accuracy,
    required this.testsTaken,
  });

  final double coverage;
  final double accuracy;
  final int testsTaken;

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Daily target', style: TextStyle(fontWeight: FontWeight.w700)),
          const SizedBox(height: AppSpacing.sm),
          MetricBar(
            label: 'Syllabus coverage',
            value: coverage,
            trailing: '${(coverage * 100).round()}%',
          ),
          const SizedBox(height: AppSpacing.md),
          MetricBar(
            label: 'Accuracy',
            value: accuracy,
            trailing: '${(accuracy * 100).round()}%',
          ),
          const SizedBox(height: AppSpacing.md),
          MetricBar(
            label: 'Tests reviewed',
            value: testsTaken == 0 ? 0 : 1,
            trailing: '$testsTaken total',
          ),
        ],
      ),
    );
  }
}

class _RecentTestsPanel extends StatelessWidget {
  const _RecentTestsPanel({required this.testsFuture});

  final Future<List<Map<String, dynamic>>> testsFuture;

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SectionHeader(
            title: 'Recent tests',
            subtitle: 'Upcoming and recently completed assessments.',
            actionLabel: 'Open tests',
            onAction: () => context.go('/dashboard/3'),
          ),
          const SizedBox(height: AppSpacing.md),
          FutureBuilder<List<Map<String, dynamic>>>(
            future: testsFuture,
            builder: (context, snapshot) {
              final tests = snapshot.data ?? const [];
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              }
              if (tests.isEmpty) {
                return const EmptyStateWidget(
                  title: 'No tests yet',
                  subtitle: 'Admin panel se test add hone ke baad yahan dikhेंगे.',
                  icon: Icons.assignment_outlined,
                );
              }
              return Column(
                children: tests.take(3).map((t) {
                  return ListTile(
                    contentPadding: EdgeInsets.zero,
                    title: Text(t['title']?.toString() ?? ''),
                    subtitle: Text(
                      '${t['category'] ?? ''} . ${t['subject'] ?? ''}',
                    ),
                  );
                }).toList(),
              );
            },
          ),
        ],
      ),
    );
  }
}

class _WeakTopicsPanel extends StatelessWidget {
  const _WeakTopicsPanel({required this.analyticsFuture});

  final Future<Map<String, dynamic>> analyticsFuture;

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('AI insights', style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: AppSpacing.xs),
          const Text('Latest performance suggestions from backend analytics.'),
          const SizedBox(height: AppSpacing.md),
          FutureBuilder<Map<String, dynamic>>(
            future: analyticsFuture,
            builder: (context, snapshot) {
              final insights = List<Map<String, dynamic>>.from(
                snapshot.data?['insights'] as List<dynamic>? ?? const [],
              );
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              }
              if (insights.isEmpty) {
                return const EmptyStateWidget(
                  title: 'No insights yet',
                  subtitle: 'Test submit hone ke baad AI insights yahan आएंगे.',
                  icon: Icons.lightbulb_outline,
                );
              }
              return Column(
                children: insights.take(3).map((insight) {
                  return ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: const CircleAvatar(
                      backgroundColor: AppColors.indigoSoft,
                      child: Icon(Icons.lightbulb_rounded, color: AppColors.indigo),
                    ),
                    title: Text(insight['insight_title']?.toString() ?? ''),
                    subtitle: Text(insight['insight_body']?.toString() ?? ''),
                  );
                }).toList(),
              );
            },
          ),
        ],
      ),
    );
  }
}

class _QuickActionsPanel extends StatelessWidget {
  const _QuickActionsPanel();

  @override
  Widget build(BuildContext context) {
    final actions = [
      ('Analytics', Icons.insights_rounded, '/analytics'),
      ('Subscriptions', Icons.workspace_premium_rounded, '/subscriptions'),
      ('Saved & Revision', Icons.bookmarks_rounded, '/saved'),
      ('Notifications', Icons.notifications_active_outlined, '/notifications'),
    ];

    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SectionHeader(
            title: 'Quick actions',
            subtitle: 'Reach important learning workflows faster.',
          ),
          const SizedBox(height: AppSpacing.md),
          Wrap(
            spacing: AppSpacing.md,
            runSpacing: AppSpacing.md,
            children: actions
                .map(
                  (action) => SizedBox(
                    width: 220,
                    child: InkWell(
                      onTap: () => context.push(action.$3),
                      borderRadius: BorderRadius.circular(AppRadii.lg),
                      child: SurfaceCard(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            CircleAvatar(
                              backgroundColor: AppColors.indigoSoft,
                              child: Icon(action.$2, color: AppColors.indigo),
                            ),
                            const SizedBox(height: AppSpacing.md),
                            Text(
                              action.$1,
                              style: Theme.of(context).textTheme.titleMedium,
                            ),
                            const SizedBox(height: AppSpacing.xs),
                            const Text('Open module'),
                          ],
                        ),
                      ),
                    ),
                  ),
                )
                .toList(),
          ),
        ],
      ),
    );
  }
}

class _PlanMiniStat extends StatelessWidget {
  const _PlanMiniStat({
    required this.title,
    required this.value,
  });

  final String title;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(color: Colors.white70)),
          const SizedBox(height: AppSpacing.xs),
          Text(
            value,
            style: const TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.w700,
              fontSize: 18,
            ),
          ),
        ],
      ),
    );
  }
}
