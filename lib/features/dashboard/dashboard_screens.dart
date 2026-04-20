import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/data/dummy_data.dart';
import '../../core/providers/app_state.dart';
import '../auth/bloc/auth_bloc.dart';
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
    final user = context.watch<AuthBloc>().state.user ?? DummyData.defaultUser;
    final uiState = ref.watch(appUiControllerProvider);
    final width = MediaQuery.sizeOf(context).width;
    final compact = width < 720;

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
            compact
                ? Column(
                    children: [
                      _CurrentPlanCard(activePlan: uiState.selectedPlan),
                      const SizedBox(height: AppSpacing.lg),
                      const _DailyTargetCard(),
                    ],
                  )
                : Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        flex: 2,
                        child: _CurrentPlanCard(activePlan: uiState.selectedPlan),
                      ),
                      const SizedBox(width: AppSpacing.lg),
                      const Expanded(child: _DailyTargetCard()),
                    ],
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
                final crossAxisCount = constraints.maxWidth > 920
                    ? 3
                    : constraints.maxWidth > 580
                        ? 2
                        : 1;
                return GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: DummyData.books.take(3).length,
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: crossAxisCount,
                    crossAxisSpacing: AppSpacing.md,
                    mainAxisSpacing: AppSpacing.md,
                    childAspectRatio: 1.35,
                  ),
                  itemBuilder: (context, index) {
                    final book = DummyData.books[index];
                    return BookCard(
                      book: book,
                      isBookmarked: uiState.bookmarkedBookIds.contains(book.id),
                      onBookmark: () => ref
                          .read(appUiControllerProvider.notifier)
                          .toggleBookBookmark(book.id),
                      onTap: () => context.push(
                        '/books/chapter/${book.chapters.first.id}',
                      ),
                    );
                  },
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
                final crossAxisCount = constraints.maxWidth > 1000
                    ? 4
                    : constraints.maxWidth > 620
                        ? 2
                        : 1;
                return GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: DummyData.subjectProgress.length,
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: crossAxisCount,
                    crossAxisSpacing: AppSpacing.md,
                    mainAxisSpacing: AppSpacing.md,
                    childAspectRatio: 1.15,
                  ),
                  itemBuilder: (context, index) => SubjectCard(
                    progress: DummyData.subjectProgress[index],
                  ),
                );
              },
            ),
            const SizedBox(height: AppSpacing.xl),
            LayoutBuilder(
              builder: (context, constraints) {
                if (constraints.maxWidth < 820) {
                  return Column(
                    children: const [
                      _RecentTestsPanel(),
                      SizedBox(height: AppSpacing.lg),
                      _WeakTopicsPanel(),
                    ],
                  );
                }

                return const Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(flex: 3, child: _RecentTestsPanel()),
                    SizedBox(width: AppSpacing.lg),
                    Expanded(flex: 2, child: _WeakTopicsPanel()),
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
  const _CurrentPlanCard({required this.activePlan});

  final String activePlan;

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
              _PlanMiniStat(title: 'Syllabus', value: '74%'),
              const SizedBox(width: AppSpacing.lg),
              _PlanMiniStat(title: 'Daily streak', value: '16 days'),
              const SizedBox(width: AppSpacing.lg),
              _PlanMiniStat(title: 'Tests taken', value: '11'),
            ],
          ),
        ],
      ),
    );
  }
}

class _DailyTargetCard extends StatelessWidget {
  const _DailyTargetCard();

  @override
  Widget build(BuildContext context) {
    return const SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Daily target', style: TextStyle(fontWeight: FontWeight.w700)),
          SizedBox(height: AppSpacing.sm),
          MetricBar(label: 'MCQs completed', value: 0.72, trailing: '72 / 100'),
          SizedBox(height: AppSpacing.md),
          MetricBar(label: 'Revision minutes', value: 0.58, trailing: '35 / 60'),
          SizedBox(height: AppSpacing.md),
          MetricBar(label: 'Tests reviewed', value: 0.5, trailing: '1 / 2'),
        ],
      ),
    );
  }
}

class _RecentTestsPanel extends StatelessWidget {
  const _RecentTestsPanel();

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
          ...DummyData.tests.map(
            (test) => Padding(
              padding: const EdgeInsets.only(bottom: AppSpacing.md),
              child: TestCard(
                test: test,
                onTap: () => context.push('/tests/detail/${test.id}'),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _WeakTopicsPanel extends StatelessWidget {
  const _WeakTopicsPanel();

  @override
  Widget build(BuildContext context) {
    const topics = [
      ('Rotational Motion', 'Physics', 'Needs formula revision'),
      ('Thermodynamics', 'Chemistry', 'Low accuracy in numericals'),
      ('Morphology of Flowering Plants', 'Botany', 'Facts not stable'),
      ('Breathing and Exchange of Gases', 'Zoology', 'Diagram recall pending'),
    ];

    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Weak topics', style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: AppSpacing.xs),
          const Text('Prioritize these areas over the next few sessions.'),
          const SizedBox(height: AppSpacing.md),
          ...topics.map(
            (topic) => ListTile(
              contentPadding: EdgeInsets.zero,
              leading: const CircleAvatar(
                backgroundColor: AppColors.indigoSoft,
                child: Icon(Icons.priority_high_rounded, color: AppColors.indigo),
              ),
              title: Text(topic.$1),
              subtitle: Text('${topic.$2} . ${topic.$3}'),
              trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16),
            ),
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
