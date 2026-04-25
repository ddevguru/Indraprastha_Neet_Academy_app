import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/data/dummy_data.dart';
import '../../core/providers/app_state.dart';
import '../auth/bloc/auth_bloc.dart';
import '../../models/app_models.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

/// Full-screen profile with back navigation (opened from drawer or deep link).
class ProfileShellScreen extends StatelessWidget {
  const ProfileShellScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded),
          onPressed: () {
            if (context.canPop()) {
              context.pop();
            } else {
              context.go('/dashboard/0');
            }
          },
        ),
      ),
      body: const ProfileScreen(),
    );
  }
}

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final auth = context.watch<AuthBloc>().state;
    final uiState = ref.watch(appUiControllerProvider);
    final user = auth.user;
    if (user == null) {
      return const Center(child: CircularProgressIndicator());
    }

    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppSpacing.lg),
      child: CenteredContent(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SurfaceCard(
              borderRadius: AppRadii.xl,
              child: LayoutBuilder(
                builder: (context, constraints) {
                  final compact = constraints.maxWidth < 720;
                  return compact
                      ? Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            _ProfileIdentity(user: user),
                            const SizedBox(height: AppSpacing.lg),
                            SizedBox(
                              width: double.infinity,
                              child: PrimaryButton(
                                label: 'Edit profile',
                                onPressed: () => context.push('/profile/edit'),
                              ),
                            ),
                          ],
                        )
                      : Row(
                          children: [
                            Expanded(child: _ProfileIdentity(user: user)),
                            const SizedBox(width: AppSpacing.lg),
                            PrimaryButton(
                              label: 'Edit profile',
                              onPressed: () => context.push('/profile/edit'),
                            ),
                          ],
                        );
                },
              ),
            ),
            const SizedBox(height: AppSpacing.xl),
            LayoutBuilder(
              builder: (context, constraints) {
                final compact = constraints.maxWidth < 860;
                return compact
                    ? Column(
                        children: [
                          _SettingsPanel(user: user, uiState: uiState),
                          const SizedBox(height: AppSpacing.md),
                          _AccountActionsPanel(user: user),
                        ],
                      )
                    : Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            flex: 3,
                            child: _SettingsPanel(user: user, uiState: uiState),
                          ),
                          const SizedBox(width: AppSpacing.md),
                          Expanded(
                            flex: 2,
                            child: _AccountActionsPanel(user: user),
                          ),
                        ],
                      );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _ProfileIdentity extends StatelessWidget {
  const _ProfileIdentity({required this.user});

  final AppUser user;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Stack(
          clipBehavior: Clip.none,
          children: [
            const AppLogo(size: 72, showGlow: true, padding: 4),
            Positioned(
              right: -4,
              bottom: -4,
              child: Container(
                width: 22,
                height: 22,
                decoration: BoxDecoration(
                  color: AppColors.success,
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.white, width: 2),
                ),
              ),
            ),
          ],
        ),
        const SizedBox(width: AppSpacing.lg),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                user.fullName,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: Theme.of(context).textTheme.headlineSmall,
              ),
              const SizedBox(height: AppSpacing.xs),
              Text(
                '${user.email} . ${user.targetExamYear}',
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: AppSpacing.sm),
              Wrap(
                spacing: AppSpacing.sm,
                runSpacing: AppSpacing.sm,
                children: [
                  _ProfileBadge(label: user.preferredPlan),
                  _ProfileBadge(label: user.preferredLanguage),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class SavedRevisionScreen extends ConsumerWidget {
  const SavedRevisionScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final uiState = ref.watch(appUiControllerProvider);
    final savedChapters = DummyData.books
        .expand((book) => book.chapters)
        .where((chapter) => uiState.savedChapterIds.contains(chapter.id))
        .toList();

    return Scaffold(
      appBar: AppBar(title: const Text('Saved and Revision')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: CenteredContent(
          maxWidth: 1100,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SectionHeader(
                title: 'Saved notes and revision',
                subtitle:
                    'Review saved notes, bookmarked questions, revision lists, important chapters, and recent materials.',
              ),
              const SizedBox(height: AppSpacing.lg),
              LayoutBuilder(
                builder: (context, constraints) {
                  final compact = constraints.maxWidth < 860;
                  return compact
                      ? Column(
                          children: [
                            _SavedChaptersPanel(savedChapters: savedChapters),
                            const SizedBox(height: AppSpacing.md),
                            const _RevisionListsPanel(),
                          ],
                        )
                      : Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              child: _SavedChaptersPanel(savedChapters: savedChapters),
                            ),
                            const SizedBox(width: AppSpacing.md),
                            const Expanded(child: _RevisionListsPanel()),
                          ],
                        );
                },
              ),
              const SizedBox(height: AppSpacing.lg),
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SectionHeader(
                      title: 'Recently opened materials',
                      subtitle: 'Quick access to active study items.',
                    ),
                    const SizedBox(height: AppSpacing.md),
                    ...DummyData.books.take(4).map(
                      (book) => ListTile(
                        contentPadding: EdgeInsets.zero,
                        title: Text(book.title),
                        subtitle: Text(book.lastOpened),
                        trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16),
                        onTap: () =>
                            context.push('/books/chapter/${book.chapters.first.id}'),
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

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Notifications')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: CenteredContent(
          maxWidth: 900,
          child: SurfaceCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SectionHeader(
                  title: 'Activity feed',
                  subtitle:
                      'Test reminders, new notes, plan updates, and daily study nudges.',
                ),
                const SizedBox(height: AppSpacing.md),
                ...DummyData.notifications.map(
                  (item) => Container(
                    margin: const EdgeInsets.only(bottom: AppSpacing.md),
                    padding: const EdgeInsets.all(AppSpacing.md),
                    decoration: BoxDecoration(
                      color: item.isUnread
                          ? AppColors.indigoSoft
                          : AppColors.surfaceMuted,
                      borderRadius: BorderRadius.circular(AppRadii.md),
                    ),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        CircleAvatar(
                          backgroundColor: Colors.white,
                          child: Icon(item.icon, color: AppColors.indigo),
                        ),
                        const SizedBox(width: AppSpacing.md),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(item.title,
                                  style: Theme.of(context).textTheme.titleMedium),
                              const SizedBox(height: AppSpacing.xs),
                              Text(item.message),
                            ],
                          ),
                        ),
                        const SizedBox(width: AppSpacing.md),
                        Text(item.timeLabel),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class EditProfileScreen extends ConsumerStatefulWidget {
  const EditProfileScreen({super.key});

  @override
  ConsumerState<EditProfileScreen> createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends ConsumerState<EditProfileScreen> {
  late final TextEditingController _fullName;
  late final TextEditingController _mobileNumber;
  late final TextEditingController _email;
  late final TextEditingController _targetExamYear;
  String _preferredLanguage = 'English';

  @override
  void initState() {
    super.initState();
    final user = context.read<AuthBloc>().state.user;
    if (user == null) {
      _fullName = TextEditingController();
      _mobileNumber = TextEditingController();
      _email = TextEditingController();
      _targetExamYear = TextEditingController();
      return;
    }
    _fullName = TextEditingController(text: user.fullName);
    _mobileNumber = TextEditingController(text: user.mobileNumber);
    _email = TextEditingController(text: user.email);
    _targetExamYear = TextEditingController(text: user.targetExamYear);
    _preferredLanguage = user.preferredLanguage;
  }

  @override
  void dispose() {
    _fullName.dispose();
    _mobileNumber.dispose();
    _email.dispose();
    _targetExamYear.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final currentUser = context.watch<AuthBloc>().state.user;
    if (currentUser == null) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Edit profile')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: CenteredContent(
          maxWidth: 760,
          child: SurfaceCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AppTextField(
                  label: 'Full name',
                  controller: _fullName,
                  prefixIcon: Icons.person_outline_rounded,
                ),
                const SizedBox(height: AppSpacing.md),
                AppTextField(
                  label: 'Mobile number',
                  controller: _mobileNumber,
                  keyboardType: TextInputType.phone,
                  prefixIcon: Icons.call_outlined,
                ),
                const SizedBox(height: AppSpacing.md),
                AppTextField(
                  label: 'Email',
                  controller: _email,
                  keyboardType: TextInputType.emailAddress,
                  prefixIcon: Icons.mail_outline_rounded,
                ),
                const SizedBox(height: AppSpacing.md),
                AppTextField(
                  label: 'Target exam year',
                  controller: _targetExamYear,
                  prefixIcon: Icons.flag_outlined,
                ),
                const SizedBox(height: AppSpacing.md),
                DropdownButtonFormField<String>(
                  initialValue: _preferredLanguage,
                  decoration: const InputDecoration(labelText: 'Preferred language'),
                  items: const [
                    DropdownMenuItem(value: 'English', child: Text('English')),
                    DropdownMenuItem(value: 'Hindi', child: Text('Hindi')),
                    DropdownMenuItem(value: 'English + Hindi', child: Text('English + Hindi')),
                  ],
                  onChanged: (value) {
                    if (value != null) {
                      setState(() => _preferredLanguage = value);
                    }
                  },
                ),
                const SizedBox(height: AppSpacing.xl),
                PrimaryButton(
                  label: 'Save changes',
                  expanded: true,
                  onPressed: () {
                    context.read<AuthBloc>().updateProfile(
                      currentUser.copyWith(
                        fullName: _fullName.text.trim(),
                        mobileNumber: _mobileNumber.text.trim(),
                        email: _email.text.trim(),
                        targetExamYear: _targetExamYear.text.trim(),
                        preferredLanguage: _preferredLanguage,
                      ),
                    );
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Profile updated locally.')),
                    );
                    context.pop();
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _SettingsPanel extends ConsumerWidget {
  const _SettingsPanel({
    required this.user,
    required this.uiState,
  });

  final AppUser user;
  final AppUiState uiState;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SectionHeader(
            title: 'Profile and settings',
            subtitle: 'Control theme, notifications, downloads, and exam preferences.',
          ),
          const SizedBox(height: AppSpacing.md),
          ListTile(
            contentPadding: EdgeInsets.zero,
            leading: const Icon(Icons.flag_outlined),
            title: const Text('Exam target'),
            subtitle: Text(user.targetExamYear),
          ),
          SwitchListTile(
            contentPadding: EdgeInsets.zero,
            value: uiState.themeMode == ThemeMode.dark,
            onChanged: (value) => ref
                .read(appUiControllerProvider.notifier)
                .toggleTheme(value),
            title: const Text('Dark mode'),
            subtitle: const Text('Light theme first, with a local toggle for preference.'),
          ),
          SwitchListTile(
            contentPadding: EdgeInsets.zero,
            value: uiState.notificationsEnabled,
            onChanged: (value) => ref
                .read(appUiControllerProvider.notifier)
                .setNotifications(value),
            title: const Text('Notification settings'),
            subtitle: const Text('Study reminders, tests, and plan updates.'),
          ),
          SwitchListTile(
            contentPadding: EdgeInsets.zero,
            value: uiState.downloadOnWifiOnly,
            onChanged: (value) => ref
                .read(appUiControllerProvider.notifier)
                .setDownloadPreference(value),
            title: const Text('Download settings'),
            subtitle: const Text('Download notes on Wi-Fi only.'),
          ),
        ],
      ),
    );
  }
}

class _AccountActionsPanel extends ConsumerWidget {
  const _AccountActionsPanel({
    required this.user,
  });

  final AppUser user;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SectionHeader(
            title: 'Account actions',
            subtitle: 'Open related frontend modules from one place.',
          ),
          const SizedBox(height: AppSpacing.md),
          ListTile(
            contentPadding: EdgeInsets.zero,
            leading: const Icon(Icons.workspace_premium_outlined),
            title: Text('Active plan: ${user.preferredPlan}'),
            subtitle: const Text('Manage subscription options'),
            onTap: () => context.push('/subscriptions'),
          ),
          ListTile(
            contentPadding: EdgeInsets.zero,
            leading: const Icon(Icons.bookmarks_outlined),
            title: const Text('Saved and revision'),
            subtitle: const Text('Open revision lists and saved notes'),
            onTap: () => context.push('/saved'),
          ),
          ListTile(
            contentPadding: EdgeInsets.zero,
            leading: const Icon(Icons.notifications_none_rounded),
            title: const Text('Notifications'),
            subtitle: const Text('See latest updates'),
            onTap: () => context.push('/notifications'),
          ),
          const SizedBox(height: AppSpacing.md),
          SecondaryButton(
            label: 'Logout',
            icon: Icons.logout_rounded,
            expanded: true,
            onPressed: () {
              context.read<AuthBloc>().logout();
              context.go('/login');
            },
          ),
        ],
      ),
    );
  }
}

class _SavedChaptersPanel extends StatelessWidget {
  const _SavedChaptersPanel({
    required this.savedChapters,
  });

  final List<BookChapter> savedChapters;

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SectionHeader(
            title: 'Important chapters',
            subtitle: 'Saved chapter-level resources ready for revision.',
          ),
          const SizedBox(height: AppSpacing.md),
          if (savedChapters.isEmpty)
            const EmptyStateWidget(
              title: 'No saved chapters',
              subtitle: 'Bookmark a chapter from books or notes to build your revision list.',
              icon: Icons.bookmark_border_rounded,
            )
          else
            ...savedChapters.map(
              (chapter) => ListTile(
                contentPadding: EdgeInsets.zero,
                title: Text(chapter.title),
                subtitle: Text(chapter.overview),
                trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16),
                onTap: () => context.push('/books/chapter/${chapter.id}'),
              ),
            ),
        ],
      ),
    );
  }
}

class _RevisionListsPanel extends StatelessWidget {
  const _RevisionListsPanel();

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SectionHeader(
            title: 'Revision lists',
            subtitle: 'Saved notes, bookmarked questions, and incorrect sets.',
          ),
          const SizedBox(height: AppSpacing.md),
          ...DummyData.revisionItems.map(
            (item) => ListTile(
              contentPadding: EdgeInsets.zero,
              leading: const CircleAvatar(
                backgroundColor: AppColors.indigoSoft,
                child: Icon(Icons.checklist_rounded, color: AppColors.indigo),
              ),
              title: Text(item.title),
              subtitle: Text('${item.type} . ${item.subtitle}'),
            ),
          ),
        ],
      ),
    );
  }
}

class _ProfileBadge extends StatelessWidget {
  const _ProfileBadge({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm,
        vertical: AppSpacing.xs,
      ),
      decoration: BoxDecoration(
        color: AppColors.indigoSoft,
        borderRadius: BorderRadius.circular(99),
      ),
      child: Text(
        label,
        style: const TextStyle(
          color: AppColors.indigo,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}
