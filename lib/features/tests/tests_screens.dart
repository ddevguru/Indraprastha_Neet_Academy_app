import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../core/data/dummy_data.dart';
import '../../models/app_models.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

class TestsScreen extends StatelessWidget {
  const TestsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final upcoming = DummyData.tests.where((test) => !test.completed).toList();
    final completed = DummyData.tests.where((test) => test.completed).toList();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppSpacing.lg),
      child: CenteredContent(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SectionHeader(
              title: 'Test series',
              subtitle:
                  'Grand tests, subject tests, chapter tests, upcoming schedules, and result reviews.',
            ),
            const SizedBox(height: AppSpacing.lg),
            const SearchBarWidget(hint: 'Search mocks, subject tests, and chapters'),
            const SizedBox(height: AppSpacing.lg),
            Wrap(
              spacing: AppSpacing.sm,
              runSpacing: AppSpacing.sm,
              children: const [
                _FilterChip('Grand tests'),
                _FilterChip('Subject tests'),
                _FilterChip('Chapter tests'),
                _FilterChip('Upcoming'),
                _FilterChip('Completed'),
              ],
            ),
            const SizedBox(height: AppSpacing.xl),
            const SectionHeader(
              title: 'Upcoming tests',
              subtitle: 'Prepare your next assessment windows with clarity.',
            ),
            const SizedBox(height: AppSpacing.md),
            ...upcoming.map(
              (test) => Padding(
                padding: const EdgeInsets.only(bottom: AppSpacing.md),
                child: TestCard(
                  test: test,
                  onTap: () => context.push('/tests/detail/${test.id}'),
                ),
              ),
            ),
            const SizedBox(height: AppSpacing.xl),
            const SectionHeader(
              title: 'Completed tests',
              subtitle: 'Review finished attempts and improve from the result snapshot.',
            ),
            const SizedBox(height: AppSpacing.md),
            ...completed.map(
              (test) => Padding(
                padding: const EdgeInsets.only(bottom: AppSpacing.md),
                child: TestCard(
                  test: test,
                  onTap: () => context.push('/tests/result/${test.id}'),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class TestDetailScreen extends StatelessWidget {
  const TestDetailScreen({
    super.key,
    required this.test,
  });

  final TestItem test;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(test.title)),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: CenteredContent(
          maxWidth: 960,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(test.category, style: Theme.of(context).textTheme.labelLarge),
                    const SizedBox(height: AppSpacing.sm),
                    Text(test.title, style: Theme.of(context).textTheme.headlineSmall),
                    const SizedBox(height: AppSpacing.sm),
                    Text(test.syllabusCoverage),
                    const SizedBox(height: AppSpacing.lg),
                    Row(
                      children: [
                        Expanded(
                          child: StatCard(
                            title: 'Duration',
                            value: '${test.durationMinutes} min',
                            subtitle: test.scheduleLabel,
                            icon: Icons.schedule_rounded,
                          ),
                        ),
                        const SizedBox(width: AppSpacing.md),
                        Expanded(
                          child: StatCard(
                            title: 'Questions',
                            value: '${test.questions}',
                            subtitle: '${test.marks} marks',
                            icon: Icons.help_outline_rounded,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    Wrap(
                      spacing: AppSpacing.sm,
                      runSpacing: AppSpacing.sm,
                      children: [
                        _FilterChip(test.syllabusCoverage),
                        const _FilterChip('Negative marking enabled'),
                        const _FilterChip('Result review included'),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.xl),
                    PrimaryButton(
                      label: 'Start test',
                      expanded: true,
                      icon: Icons.play_arrow_rounded,
                      onPressed: () => context.push('/tests/result/${test.id}'),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class TestResultScreen extends StatelessWidget {
  const TestResultScreen({
    super.key,
    required this.test,
  });

  final TestItem test;

  @override
  Widget build(BuildContext context) {
    const breakdown = [
      ('Physics', 0.64),
      ('Chemistry', 0.76),
      ('Botany', 0.88),
      ('Zoology', 0.81),
    ];

    return Scaffold(
      appBar: AppBar(title: Text('${test.title} Result')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: CenteredContent(
          maxWidth: 1100,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              LayoutBuilder(
                builder: (context, constraints) {
                  final compact = constraints.maxWidth < 760;
                  return compact
                      ? Column(
                          children: const [
                            _ResultOverview(),
                            SizedBox(height: AppSpacing.md),
                            _CorrectWrongPanel(),
                          ],
                        )
                      : const Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(flex: 3, child: _ResultOverview()),
                            SizedBox(width: AppSpacing.md),
                            Expanded(flex: 2, child: _CorrectWrongPanel()),
                          ],
                        );
                },
              ),
              const SizedBox(height: AppSpacing.xl),
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SectionHeader(
                      title: 'Subject-wise breakdown',
                      subtitle: 'Accuracy and score balance across subjects.',
                    ),
                    const SizedBox(height: AppSpacing.md),
                    ...breakdown.map(
                      (item) => Padding(
                        padding: const EdgeInsets.only(bottom: AppSpacing.md),
                        child: MetricBar(
                          label: item.$1,
                          value: item.$2,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.lg),
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    SectionHeader(
                      title: 'Attempt summary',
                      subtitle:
                          'Track rank, speed, and consistency trends from the latest result.',
                    ),
                    SizedBox(height: AppSpacing.md),
                    MiniBarChart(
                      values: [0.55, 0.62, 0.68, 0.74, 0.79],
                      labels: ['T-4', 'T-3', 'T-2', 'T-1', 'Now'],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ResultOverview extends StatelessWidget {
  const _ResultOverview();

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          SectionHeader(
            title: 'Result snapshot',
            subtitle: 'Your latest demo performance metrics.',
          ),
          SizedBox(height: AppSpacing.md),
          Row(
            children: [
              Expanded(
                child: StatCard(
                  title: 'Score',
                  value: '612 / 720',
                  subtitle: 'Mock rank 214',
                  icon: Icons.emoji_events_outlined,
                ),
              ),
              SizedBox(width: AppSpacing.md),
              Expanded(
                child: StatCard(
                  title: 'Accuracy',
                  value: '79%',
                  subtitle: '142 correct answers',
                  icon: Icons.track_changes_rounded,
                ),
              ),
            ],
          ),
          SizedBox(height: AppSpacing.md),
          Row(
            children: [
              Expanded(
                child: StatCard(
                  title: 'Time spent',
                  value: '176 min',
                  subtitle: '24 min saved',
                  icon: Icons.timer_outlined,
                ),
              ),
              SizedBox(width: AppSpacing.md),
              Expanded(
                child: StatCard(
                  title: 'Improvement',
                  value: '+38',
                  subtitle: 'Vs previous mock',
                  icon: Icons.trending_up_rounded,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _CorrectWrongPanel extends StatelessWidget {
  const _CorrectWrongPanel();

  @override
  Widget build(BuildContext context) {
    return const SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Correct vs wrong', style: TextStyle(fontWeight: FontWeight.w700)),
          SizedBox(height: AppSpacing.lg),
          StatCard(
            title: 'Correct',
            value: '142',
            subtitle: 'Strong recall in Biology',
            icon: Icons.check_circle_rounded,
          ),
          SizedBox(height: AppSpacing.md),
          StatCard(
            title: 'Wrong',
            value: '31',
            subtitle: 'Mostly Physics numericals',
            icon: Icons.cancel_rounded,
          ),
          SizedBox(height: AppSpacing.md),
          StatCard(
            title: 'Unattempted',
            value: '7',
            subtitle: 'Time management opportunity',
            icon: Icons.more_horiz_rounded,
          ),
        ],
      ),
    );
  }
}

class _FilterChip extends StatelessWidget {
  const _FilterChip(this.label);

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.sm,
      ),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(99),
        border: Border.all(color: AppColors.border),
      ),
      child: Text(label),
    );
  }
}
