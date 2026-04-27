import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../theme/app_tokens.dart';
import 'app_drawer.dart';
import 'app_widgets.dart';

class AdaptiveScaffold extends ConsumerWidget {
  const AdaptiveScaffold({
    super.key,
    required this.currentIndex,
    required this.body,
    required this.onDestinationSelected,
    required this.appBarTitle,
  });

  final int currentIndex;
  final Widget body;
  final ValueChanged<int> onDestinationSelected;
  final String appBarTitle;

  static const _destinations = [
    NavigationDestination(icon: Icon(Icons.home_outlined), label: 'Home'),
    NavigationDestination(icon: Icon(Icons.menu_book_outlined), label: 'Books'),
    NavigationDestination(icon: Icon(Icons.bolt_outlined), label: 'Practice'),
    NavigationDestination(icon: Icon(Icons.assignment_outlined), label: 'Tests'),
    NavigationDestination(icon: Icon(Icons.play_circle_outline_rounded), label: 'Videos'),
  ];

  static const _railDestinations = [
    NavigationRailDestination(
      icon: Icon(Icons.home_outlined),
      label: Text('Home'),
    ),
    NavigationRailDestination(
      icon: Icon(Icons.menu_book_outlined),
      label: Text('Books'),
    ),
    NavigationRailDestination(
      icon: Icon(Icons.bolt_outlined),
      label: Text('Practice'),
    ),
    NavigationRailDestination(
      icon: Icon(Icons.assignment_outlined),
      label: Text('Tests'),
    ),
    NavigationRailDestination(
      icon: Icon(Icons.play_circle_outline_rounded),
      label: Text('Videos'),
    ),
  ];

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final width = MediaQuery.sizeOf(context).width;
    final useRail = width >= 900;
    final scheme = Theme.of(context).colorScheme;

    final appBar = AppBar(
      backgroundColor: scheme.surface.withValues(alpha: 0.92),
      foregroundColor: scheme.onSurface,
      elevation: 0,
      surfaceTintColor: Colors.transparent,
      leading: Builder(
        builder: (ctx) => IconButton(
          icon: const Icon(Icons.menu_rounded),
          tooltip: 'Menu',
          onPressed: () => Scaffold.of(ctx).openDrawer(),
        ),
      ),
      title: Text(
        appBarTitle,
        style: const TextStyle(fontWeight: FontWeight.w700),
      ),
    );

    if (useRail) {
      return Scaffold(
        appBar: appBar,
        drawer: const AppDrawer(),
        body: SafeArea(
          child: Row(
            children: [
              Container(
                width: 280,
                margin: const EdgeInsets.all(AppSpacing.lg),
                padding: const EdgeInsets.all(AppSpacing.md),
                decoration: BoxDecoration(
                  color: Theme.of(context).cardColor,
                  borderRadius: BorderRadius.circular(AppRadii.xl),
                  border: Border.all(color: scheme.outlineVariant),
                  boxShadow: AppShadows.soft,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const _BrandBlock(),
                    const SizedBox(height: AppSpacing.lg),
                    Expanded(
                      child: NavigationRail(
                        selectedIndex: currentIndex,
                        useIndicator: true,
                        groupAlignment: -0.8,
                        labelType: NavigationRailLabelType.all,
                        destinations: _railDestinations,
                        onDestinationSelected: onDestinationSelected,
                        selectedIconTheme: const IconThemeData(color: AppColors.primary),
                        selectedLabelTextStyle: const TextStyle(
                          color: AppColors.primary,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    const SurfaceCard(
                      padding: EdgeInsets.all(AppSpacing.md),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Today\'s focus',
                            style: TextStyle(fontWeight: FontWeight.w700),
                          ),
                          SizedBox(height: AppSpacing.xs),
                          Text('Finish Plant Kingdom revision and one mock review.'),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: SafeArea(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(0, AppSpacing.lg, AppSpacing.lg, AppSpacing.lg),
                    child: body,
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      appBar: appBar,
      drawer: const AppDrawer(),
      body: SafeArea(child: body),
      bottomNavigationBar: NavigationBar(
        selectedIndex: currentIndex,
        destinations: _destinations,
        onDestinationSelected: onDestinationSelected,
        indicatorColor: scheme.secondaryContainer,
        labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
      ),
    );
  }
}

class _BrandBlock extends StatelessWidget {
  const _BrandBlock();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const AppLogo(size: 46, padding: 3),
        const SizedBox(width: AppSpacing.md),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Indraprastha',
                style: TextStyle(fontWeight: FontWeight.w700),
              ),
              Text(
                'NEET Academy',
                style: Theme.of(context)
                    .textTheme
                    .bodySmall
                    ?.copyWith(color: Theme.of(context).colorScheme.onSurfaceVariant),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
