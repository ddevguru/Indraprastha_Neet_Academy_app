import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../auth/bloc/auth_bloc.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

/// Shown when the user is signed in but has no active subscription (dummy gate).
class PaywallScreen extends ConsumerWidget {
  const PaywallScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Subscription required')),
      body: Stack(
        children: [
          const GradientOrbs(),
          SafeArea(
            child: CenteredContent(
              maxWidth: 480,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.lock_outline_rounded,
                    size: 56,
                    color: Theme.of(context).colorScheme.primary,
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  Text(
                    'Unlock full access',
                    style: Theme.of(context).textTheme.headlineSmall,
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Text(
                    'Subscribe once to use books, practice, tests, videos, analytics, '
                    'and the rest of the app. Without an active plan, nothing is available '
                    'beyond this screen (demo behaviour).',
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                  const SizedBox(height: AppSpacing.xl),
                  PrimaryButton(
                    label: 'View plans',
                    expanded: true,
                    icon: Icons.workspace_premium_rounded,
                    onPressed: () => context.go('/subscriptions'),
                  ),
                  const SizedBox(height: AppSpacing.md),
                  TextButton(
                    onPressed: () =>
                        context.read<AuthBloc>().logout(),
                    child: const Text('Log out'),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
