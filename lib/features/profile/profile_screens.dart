import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/providers/app_state.dart';
import '../auth/bloc/auth_bloc.dart';
import '../content/data/content_repository.dart';
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

class SavedRevisionScreen extends ConsumerStatefulWidget {
  const SavedRevisionScreen({super.key});

  @override
  ConsumerState<SavedRevisionScreen> createState() => _SavedRevisionScreenState();
}

class _SavedRevisionScreenState extends ConsumerState<SavedRevisionScreen> {
  late final Future<Map<String, dynamic>> _savedFuture;

  @override
  void initState() {
    super.initState();
    _savedFuture = _loadSaved();
  }

  Future<Map<String, dynamic>> _loadSaved() async {
    final repo = ContentRepository();
    final books = await repo.fetchBooks();
    final tests = await repo.fetchTests();
    final chapterFutures = books.map((book) async {
      final id = int.tryParse(book['id']?.toString() ?? '');
      if (id == null) return <Map<String, dynamic>>[];
      return repo.fetchChapters(id);
    }).toList();
    final chapterLists = await Future.wait(chapterFutures);
    final allChapters = chapterLists.expand((e) => e).toList();
    return {
      'books': books,
      'tests': tests,
      'chapters': allChapters,
    };
  }

  @override
  Widget build(BuildContext context) {
    final uiState = ref.watch(appUiControllerProvider);
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
              FutureBuilder<Map<String, dynamic>>(
                future: _savedFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  }
                  final books = List<Map<String, dynamic>>.from(
                    snapshot.data?['books'] as List<dynamic>? ?? const [],
                  );
                  final tests = List<Map<String, dynamic>>.from(
                    snapshot.data?['tests'] as List<dynamic>? ?? const [],
                  );
                  final allChapters = List<Map<String, dynamic>>.from(
                    snapshot.data?['chapters'] as List<dynamic>? ?? const [],
                  );
                  final savedChapters = allChapters
                      .where((ch) => uiState.savedChapterIds.contains(ch['id']?.toString()))
                      .toList();

                  return Column(
                    children: [
                      LayoutBuilder(
                        builder: (context, constraints) {
                          final compact = constraints.maxWidth < 860;
                          final panel = _SavedChaptersPanel(savedChapters: savedChapters);
                          final revision = _RevisionListsPanel(
                            tests: tests,
                            books: books,
                          );
                          return compact
                              ? Column(
                                  children: [
                                    panel,
                                    const SizedBox(height: AppSpacing.md),
                                    revision,
                                  ],
                                )
                              : Row(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Expanded(child: panel),
                                    const SizedBox(width: AppSpacing.md),
                                    Expanded(child: revision),
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
                              subtitle: 'Quick access to backend-loaded study items.',
                            ),
                            const SizedBox(height: AppSpacing.md),
                            if (books.isEmpty)
                              const EmptyStateWidget(
                                title: 'No recent material',
                                subtitle: 'Books add hone ke baad recent materials yahan dikhenge.',
                                icon: Icons.history_toggle_off_rounded,
                              )
                            else
                              ...books.take(4).map(
                                (book) => ListTile(
                                  contentPadding: EdgeInsets.zero,
                                  title: Text(book['title']?.toString() ?? ''),
                                  subtitle: Text(
                                    '${book['subject'] ?? ''} . ${book['topic'] ?? ''}',
                                  ),
                                  trailing:
                                      const Icon(Icons.arrow_forward_ios_rounded, size: 16),
                                ),
                              ),
                          ],
                        ),
                      ),
                    ],
                  );
                },
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
          child: FutureBuilder<Map<String, dynamic>>(
            future: Future.wait([
              ContentRepository().fetchTests(),
              ContentRepository().fetchLatestAnalytics(),
            ]).then((v) => {'tests': v[0], 'analytics': v[1]}),
            builder: (context, snapshot) {
              final tests = List<Map<String, dynamic>>.from(
                snapshot.data?['tests'] as List<dynamic>? ?? const [],
              );
              final analytics =
                  Map<String, dynamic>.from(snapshot.data?['analytics'] as Map? ?? const {});
              final insights = List<Map<String, dynamic>>.from(
                analytics['insights'] as List<dynamic>? ?? const [],
              );
              final notifications = <Map<String, dynamic>>[
                ...tests.take(3).map(
                  (t) => {
                    'title': 'Test available: ${t['title']}',
                    'message':
                        '${t['category'] ?? 'Test'} . ${t['subject'] ?? ''} . ${t['schedule_label'] ?? ''}',
                    'time': 'Now',
                    'unread': true,
                  },
                ),
                ...insights.take(3).map(
                  (i) => {
                    'title': i['insight_title']?.toString() ?? 'AI insight',
                    'message': i['insight_body']?.toString() ?? '',
                    'time': 'Latest',
                    'unread': false,
                  },
                ),
              ];

              return SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SectionHeader(
                      title: 'Activity feed',
                      subtitle:
                          'Backend-driven test reminders and AI performance updates.',
                    ),
                    const SizedBox(height: AppSpacing.md),
                    if (notifications.isEmpty)
                      const EmptyStateWidget(
                        title: 'No notifications yet',
                        subtitle: 'Tests ya analytics generate hone par updates yahan aayengi.',
                        icon: Icons.notifications_off_outlined,
                      )
                    else
                      ...notifications.map(
                        (item) => Container(
                          margin: const EdgeInsets.only(bottom: AppSpacing.md),
                          padding: const EdgeInsets.all(AppSpacing.md),
                          decoration: BoxDecoration(
                            color: (item['unread'] as bool)
                                ? AppColors.indigoSoft
                                : AppColors.surfaceMuted,
                            borderRadius: BorderRadius.circular(AppRadii.md),
                          ),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const CircleAvatar(
                                backgroundColor: Colors.white,
                                child: Icon(Icons.notifications_active_rounded,
                                    color: AppColors.indigo),
                              ),
                              const SizedBox(width: AppSpacing.md),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      item['title']?.toString() ?? '',
                                      style: Theme.of(context).textTheme.titleMedium,
                                    ),
                                    const SizedBox(height: AppSpacing.xs),
                                    Text(item['message']?.toString() ?? ''),
                                  ],
                                ),
                              ),
                              const SizedBox(width: AppSpacing.md),
                              Text(item['time']?.toString() ?? ''),
                            ],
                          ),
                        ),
                      ),
                  ],
                ),
              );
            },
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
            subtitle: 'Control notifications, downloads, and exam preferences.',
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

  final List<Map<String, dynamic>> savedChapters;

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
                title: Text(chapter['title']?.toString() ?? ''),
                subtitle: Text(chapter['overview']?.toString() ?? ''),
                trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16),
                onTap: () => context.push('/books/chapter/${chapter['id']}'),
              ),
            ),
        ],
      ),
    );
  }
}

class _RevisionListsPanel extends StatelessWidget {
  const _RevisionListsPanel({
    required this.tests,
    required this.books,
  });

  final List<Map<String, dynamic>> tests;
  final List<Map<String, dynamic>> books;

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
          ...[
            ...tests.take(2).map(
              (test) => {
                'title': test['title']?.toString() ?? '',
                'subtitle':
                    '${test['category'] ?? ''} . ${test['subject'] ?? ''} drill',
                'type': 'Test revision',
              },
            ),
            ...books.take(2).map(
              (book) => {
                'title': book['title']?.toString() ?? '',
                'subtitle':
                    '${book['subject'] ?? ''} . ${book['topic'] ?? ''}',
                'type': 'Saved notes',
              },
            ),
          ].map(
            (item) => ListTile(
              contentPadding: EdgeInsets.zero,
              leading: const CircleAvatar(
                backgroundColor: AppColors.indigoSoft,
                child: Icon(Icons.checklist_rounded, color: AppColors.indigo),
              ),
              title: Text(item['title']?.toString() ?? ''),
              subtitle: Text('${item['type'] ?? ''} . ${item['subtitle'] ?? ''}'),
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
