import 'package:flutter/material.dart';
import 'screens/teacher_dashboard_screen.dart';
import 'screens/teacher_doubt_queue_screen.dart';
import 'screens/teacher_login_screen.dart';
import 'screens/teacher_profile_screen.dart';
import 'services/teacher_api_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await TeacherApiService.init();
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
    const primaryNavy = Color(0xFF002350);
    const accentGold = Color(0xFFD2AE39);

    return MaterialApp(
      title: 'Indraprastha Faculty Portal',
      debugShowCheckedModeBanner: false,
      themeMode: ThemeMode.system,
      theme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.light,
        scaffoldBackgroundColor: const Color(0xFFF5F7FA),
        colorScheme: ColorScheme.fromSeed(
          seedColor: primaryNavy,
          brightness: Brightness.light,
          primary: primaryNavy,
          secondary: accentGold,
          surface: Colors.white,
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: primaryNavy,
          foregroundColor: Colors.white,
          elevation: 0,
        ),
        cardTheme: CardThemeData(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
            side: BorderSide(color: Colors.grey.withValues(alpha: 0.15)),
          ),
        ),
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF11131A),
        colorScheme: const ColorScheme.dark(
          primary: accentGold,
          secondary: accentGold,
          surface: Color(0xFF1E222D),
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF171A22),
          foregroundColor: Colors.white,
          elevation: 0,
        ),
        cardTheme: CardThemeData(
          elevation: 0,
          color: const Color(0xFF1E222D),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
            side: const BorderSide(color: Color(0xFF2E3545)),
          ),
        ),
      ),
      home: _isLoggedIn
          ? TeacherMainScaffold(onLogout: _onLogout)
          : TeacherLoginScreen(onLoginSuccess: _onLoginSuccess),
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
          border: Border(
            top: BorderSide(
              color: isDark ? const Color(0xFF2E3545) : Colors.black.withValues(alpha: 0.08),
            ),
          ),
        ),
        child: NavigationBar(
          selectedIndex: _currentIndex,
          backgroundColor: isDark ? const Color(0xFF171A22) : Colors.white,
          indicatorColor: const Color(0xFFD2AE39).withValues(alpha: 0.25),
          onDestinationSelected: (i) => setState(() => _currentIndex = i),
          destinations: [
            NavigationDestination(
              icon: Icon(Icons.dashboard_outlined, color: isDark ? Colors.grey.shade400 : null),
              selectedIcon: Icon(Icons.dashboard, color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350)),
              label: 'Dashboard',
            ),
            NavigationDestination(
              icon: Icon(Icons.quiz_outlined, color: isDark ? Colors.grey.shade400 : null),
              selectedIcon: Icon(Icons.quiz, color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350)),
              label: 'Doubts Queue',
            ),
            NavigationDestination(
              icon: Icon(Icons.person_outline, color: isDark ? Colors.grey.shade400 : null),
              selectedIcon: Icon(Icons.person, color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350)),
              label: 'Profile',
            ),
          ],
        ),
      ),
    );
  }
}
