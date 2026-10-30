import 'package:flutter/material.dart';
import 'screens/teacher_dashboard_screen.dart';
import 'screens/teacher_doubt_queue_screen.dart';
import 'screens/teacher_login_screen.dart';
import 'screens/teacher_profile_screen.dart';
import 'services/teacher_api_service.dart';
import 'theme/app_theme.dart';
import 'theme/app_tokens.dart';
import 'theme/theme_controller.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await TeacherApiService.init();
  await ThemeController.init();
  runApp(const IndraprasthaTeacherApp());
}

class IndraprasthaTeacherApp extends StatefulWidget {
  const IndraprasthaTeacherApp({super.key});

  @override
  State<IndraprasthaTeacherApp> createState() => _IndraprasthaTeacherAppState();
}

class _IndraprasthaTeacherAppState extends State<IndraprasthaTeacherApp> {
  bool _isLoggedIn = false;

  @override
  void initState() {
    super.initState();
    _isLoggedIn = TeacherApiService.token != null;
  }

  void _onLoginSuccess() {
    setState(() => _isLoggedIn = true);
  }

  void _onLogout() {
    setState(() => _isLoggedIn = false);
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<ThemeMode>(
      valueListenable: ThemeController.themeModeNotifier,
      builder: (context, currentThemeMode, _) {
        return MaterialApp(
          title: 'Indraprastha Faculty Portal',
          debugShowCheckedModeBanner: false,
          theme: AppTheme.light(),
          darkTheme: AppTheme.dark(),
          themeMode: currentThemeMode,
          home: _isLoggedIn
              ? TeacherMainScaffold(onLogout: _onLogout)
              : TeacherLoginScreen(onLoginSuccess: _onLoginSuccess),
        );
      },
    );
  }
}

class TeacherMainScaffold extends StatefulWidget {
  final VoidCallback onLogout;
  const TeacherMainScaffold({super.key, required this.onLogout});

  @override
  State<TeacherMainScaffold> createState() => _TeacherMainScaffoldState();
}

class _TeacherMainScaffoldState extends State<TeacherMainScaffold> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final screens = [
      TeacherDashboardScreen(onOpenQueue: () => setState(() => _currentIndex = 1)),
      const TeacherDoubtQueueScreen(),
      TeacherProfileScreen(onLogout: widget.onLogout),
    ];

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: screens,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkSurface : AppColors.surface,
          border: Border(
            top: BorderSide(
              color: isDark ? AppColors.darkBorder : AppColors.border,
              width: 1,
            ),
          ),
          boxShadow: isDark ? AppShadows.darkSoft : AppShadows.soft,
        ),
        child: NavigationBar(
          selectedIndex: _currentIndex,
          backgroundColor: Colors.transparent,
          indicatorColor: isDark
              ? AppColors.primary.withValues(alpha: 0.25)
              : AppColors.primarySoft,
          height: 72,
          onDestinationSelected: (i) => setState(() => _currentIndex = i),
          destinations: [
            NavigationDestination(
              icon: Icon(
                Icons.dashboard_outlined,
                color: isDark ? Colors.grey.shade400 : AppColors.textSecondary,
              ),
              selectedIcon: const Icon(
                Icons.dashboard,
                color: AppColors.primary,
              ),
              label: 'Dashboard',
            ),
            NavigationDestination(
              icon: Icon(
                Icons.quiz_outlined,
                color: isDark ? Colors.grey.shade400 : AppColors.textSecondary,
              ),
              selectedIcon: const Icon(
                Icons.quiz,
                color: AppColors.primary,
              ),
              label: 'Doubts Queue',
            ),
            NavigationDestination(
              icon: Icon(
                Icons.person_outline,
                color: isDark ? Colors.grey.shade400 : AppColors.textSecondary,
              ),
              selectedIcon: const Icon(
                Icons.person,
                color: AppColors.primary,
              ),
              label: 'Profile',
            ),
          ],
        ),
      ),
    );
  }
}
