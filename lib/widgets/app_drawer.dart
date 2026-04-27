import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../features/auth/bloc/auth_bloc.dart';
import '../theme/app_tokens.dart';
import 'app_widgets.dart';

/// Side menu inspired by premium learning apps: course, plan, links, profile, logout.
class AppDrawer extends ConsumerWidget {
  const AppDrawer({super.key});

  static const _appVersion = '1.0.0';

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = context.watch<AuthBloc>().state.user;
    final courseLabel = user?.targetExamYear ?? 'NEET';

    return Drawer(
      width: MediaQuery.sizeOf(context).width * 0.82,
      child: Container(
        decoration: const BoxDecoration(gradient: AppGradients.drawer),
        child: SafeArea(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(
                  AppSpacing.lg,
                  AppSpacing.md,
                  AppSpacing.lg,
                  AppSpacing.sm,
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const AppLogo(size: 56, padding: 3),
                    const SizedBox(width: AppSpacing.md),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            user?.fullName ?? 'Student',
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                              color: AppColors.onDrawer,
                              fontWeight: FontWeight.w800,
                              fontSize: 18,
                            ),
                          ),
                          TextButton.icon(
                            onPressed: () {
                              Navigator.of(context).pop();
                              context.push('/profile');
                            },
                            style: TextButton.styleFrom(
                              foregroundColor: AppColors.onDrawerMuted,
                              padding: EdgeInsets.zero,
                              minimumSize: Size.zero,
                              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                            ),
                            icon: const Icon(Icons.settings_outlined, size: 18),
                            label: const Text('Settings'),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const Divider(color: Color(0x33FFFFFF), height: 1),
              Expanded(
                child: ListView(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.sm,
                    vertical: AppSpacing.sm,
                  ),
                  children: [
                    _DrawerTile(
                      title: 'Your Course',
                      subtitle: 'Currently: $courseLabel',
                      trailing: const Icon(
                        Icons.chevron_right_rounded,
                        color: AppColors.onDrawer,
                      ),
                      onTap: () {
                        Navigator.of(context).pop();
                        context.go('/dashboard/0');
                      },
                    ),
                    const Divider(color: Color(0x22FFFFFF)),
                    _DrawerSectionTitle(title: 'Buy Plan'),
                    _DrawerTile(
                      title: 'View plans and pricing',
                      onTap: () {
                        Navigator.of(context).pop();
                        context.push('/subscriptions');
                      },
                    ),
                    const Divider(color: Color(0x22FFFFFF)),
                    _DrawerLink(
                      title: 'Learn More',
                      onTap: () {
                        Navigator.of(context).pop();
                        context.push('/info/learn-more');
                      },
                    ),
                    _DrawerLink(
                      title: 'FAQ',
                      onTap: () {
                        Navigator.of(context).pop();
                        context.push('/info/faq');
                      },
                    ),
                    _DrawerLink(
                      title: 'Contact us',
                      onTap: () {
                        Navigator.of(context).pop();
                        context.push('/info/contact');
                      },
                    ),
                    _DrawerLink(
                      title: 'About us',
                      onTap: () {
                        Navigator.of(context).pop();
                        context.push('/info/about');
                      },
                    ),
                    _DrawerLink(
                      title: 'Rate us',
                      onTap: () {
                        Navigator.of(context).pop();
                        context.push('/info/rate-us');
                      },
                    ),
                    _DrawerLink(
                      title: 'T&C',
                      onTap: () {
                        Navigator.of(context).pop();
                        context.push('/info/terms');
                      },
                    ),
                    _DrawerLink(
                      title: 'Share the app',
                      onTap: () {
                        Navigator.of(context).pop();
                        context.push('/info/share');
                      },
                    ),
                    _DrawerLink(
                      title: 'Report Video Piracy',
                      onTap: () {
                        Navigator.of(context).pop();
                        context.push('/info/report-piracy');
                      },
                    ),
                    const Divider(color: Color(0x33FFFFFF)),
                    _DrawerTile(
                      title: 'Profile',
                      leading: const Icon(Icons.person_rounded, color: AppColors.onDrawer),
                      onTap: () {
                        Navigator.of(context).pop();
                        context.push('/profile');
                      },
                    ),
                    _DrawerTile(
                      title: 'Logout',
                      leading: const Icon(Icons.logout_rounded, color: AppColors.onDrawer),
                      onTap: () {
                        Navigator.of(context).pop();
                        context.read<AuthBloc>().logout();
                        context.go('/login');
                      },
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(AppSpacing.lg),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'v $_appVersion',
                      style: TextStyle(
                        color: AppColors.onDrawer.withValues(alpha: 0.75),
                        fontSize: 12,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.xs),
                    const Text(
                      'INDRAPRASTHA',
                      style: TextStyle(
                        color: AppColors.onDrawer,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 1.2,
                        fontSize: 16,
                      ),
                    ),
                    Text(
                      'NEET ACADEMY',
                      style: TextStyle(
                        color: AppColors.onDrawer.withValues(alpha: 0.9),
                        fontWeight: FontWeight.w600,
                        letterSpacing: 0.8,
                        fontSize: 11,
                      ),
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

class _DrawerSectionTitle extends StatelessWidget {
  const _DrawerSectionTitle({required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(AppSpacing.md, AppSpacing.sm, AppSpacing.md, AppSpacing.xs),
      child: Text(
        title,
        style: const TextStyle(
          color: AppColors.onDrawer,
          fontWeight: FontWeight.w800,
          fontSize: 16,
        ),
      ),
    );
  }
}

class _DrawerTile extends StatelessWidget {
  const _DrawerTile({
    required this.title,
    this.subtitle,
    this.leading,
    this.trailing,
    required this.onTap,
  });

  final String title;
  final String? subtitle;
  final Widget? leading;
  final Widget? trailing;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(AppRadii.md),
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.md,
            vertical: AppSpacing.sm,
          ),
          child: Row(
            children: [
              if (leading != null) ...[
                leading!,
                const SizedBox(width: AppSpacing.sm),
              ],
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        color: AppColors.onDrawer,
                        fontWeight: FontWeight.w700,
                        fontSize: 15,
                      ),
                    ),
                    if (subtitle != null) ...[
                      const SizedBox(height: 2),
                      Text(
                        subtitle!,
                        style: TextStyle(
                          color: AppColors.onDrawer.withValues(alpha: 0.85),
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
              if (trailing != null) trailing!,
            ],
          ),
        ),
      ),
    );
  }
}

class _DrawerLink extends StatelessWidget {
  const _DrawerLink({
    required this.title,
    required this.onTap,
  });

  final String title;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
      title: Text(
        title,
        style: const TextStyle(
          color: AppColors.onDrawer,
          fontWeight: FontWeight.w500,
          fontSize: 15,
        ),
      ),
      onTap: onTap,
    );
  }
}
