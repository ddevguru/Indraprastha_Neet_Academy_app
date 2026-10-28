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
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFFF5F7FA),
        colorScheme: ColorScheme.fromSeed(
          seedColor: primaryNavy,
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
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (i) => setState(() => _currentIndex = i),
        indicatorColor: const Color(0xFFD2AE39).withValues(alpha: 0.25),
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.dashboard_outlined),
            selectedIcon: Icon(Icons.dashboard, color: Color(0xFF002350)),
            label: 'Dashboard',
          ),
          NavigationDestination(
            icon: Icon(Icons.quiz_outlined),
            selectedIcon: Icon(Icons.quiz, color: Color(0xFF002350)),
            label: 'Doubts Queue',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outline),
            selectedIcon: Icon(Icons.person, color: Color(0xFF002350)),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
