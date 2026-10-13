import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';

import 'screens/error_logs_page.dart';
import 'services/admin_error_logger.dart';
import 'utils/drive_image_url.dart';
import 'widgets/fast_network_image.dart';

const String baseUrl = 'https://api.indraprasthaneetacademy.com/api';

Map<String, dynamic> _decodeApiJson(
  String raw, {
  required int statusCode,
  required String method,
  required String path,
}) {
  var cleaned = raw.trim();
  if (cleaned.startsWith('\ufeff')) cleaned = cleaned.substring(1);
  if (cleaned.isEmpty) {
    if (statusCode >= 200 && statusCode < 300) return {};
    throw Exception('Empty server response ($statusCode) for $method $path');
  }
  if (cleaned.startsWith('<')) {
    if (statusCode == 413) {
      throw Exception(
        'Image bahut badi hai (413 Payload Too Large). '
        'Chhoti image use karo (max 5MB) ya server par nginx client_max_body_size badhao.',
      );
    }
    throw Exception(
      'Server returned HTML ($statusCode) for $method $path. '
      'API endpoint unavailable — backend redeploy check karo.',
    );
  }
  try {
    final decoded = jsonDecode(cleaned);
    if (decoded is Map<String, dynamic>) return decoded;
    if (decoded is Map) return Map<String, dynamic>.from(decoded);
    throw Exception('Invalid JSON object from $method $path');
  } on FormatException catch (e) {
    final preview =
        cleaned.length > 160 ? '${cleaned.substring(0, 160)}...' : cleaned;
    throw Exception(
        'Invalid server response ($statusCode) for $method $path: $preview ($e)');
  }
}

String _friendlyError(Object e) {
  final msg = e.toString().replaceFirst('Exception: ', '');
  if (msg.contains('413') || msg.contains('Payload Too Large')) {
    return 'Image file bahut badi hai. 5MB se chhoti image use karo.';
  }
  if (msg.contains('FormatException') ||
      msg.contains('Invalid server response')) {
    return 'Server ne sahi JSON nahi bheja. Backend Google Cloud par redeploy/restart karo.';
  }
  if (msg.contains('does not exist') && msg.contains('column')) {
    return 'Database columns missing — backend restart karo (db.js migration).';
  }
  if (msg.contains('Invalid id')) {
    return 'Server se galat ID aayi. Page refresh karke dubara try karo.';
  }
  return msg;
}

int _asInt(dynamic value, {String label = 'id'}) {
  if (value is int) return value;
  if (value is num) return value.toInt();
  final parsed = int.tryParse(value?.toString() ?? '');
  if (parsed != null) return parsed;
  throw FormatException('Invalid $label: $value');
}

const int _maxQuestionImageBytes = 5 * 1024 * 1024;

Future<bool> _validateImageFile(BuildContext context, File file) async {
  final size = await file.length();
  if (size <= _maxQuestionImageBytes) return true;
  if (!context.mounted) return false;
  _showActionSnackBar(
    context,
    'Image ${(size / (1024 * 1024)).toStringAsFixed(1)}MB hai. Max 5MB allowed.',
    isError: true,
  );
  return false;
}

Widget _buildOptionImagePickerRow({
  required String label,
  required File? file,
  required String imageLink,
  required void Function(File?) onPick,
  required VoidCallback onRemove,
}) {
  final hasImage = file != null || imageLink.isNotEmpty;
  final displayName = file != null
      ? file.path.split(Platform.pathSeparator).last
      : (imageLink.isNotEmpty ? '$label image uploaded' : 'No $label image');
  return Padding(
    padding: const EdgeInsets.symmetric(vertical: 2),
    child: Row(
      children: [
        Icon(
          hasImage ? Icons.image_rounded : Icons.image_outlined,
          size: 16,
          color: hasImage ? Colors.indigo : Colors.grey,
        ),
        const SizedBox(width: 6),
        Expanded(
          child: Text(
            displayName,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              fontSize: 12,
              color: hasImage ? null : Colors.grey.shade600,
              fontWeight: hasImage ? FontWeight.w500 : FontWeight.normal,
            ),
          ),
        ),
        TextButton.icon(
          style: TextButton.styleFrom(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            visualDensity: VisualDensity.compact,
          ),
          icon: const Icon(Icons.add_photo_alternate_outlined, size: 15),
          label: Text('Pick $label Image', style: const TextStyle(fontSize: 11)),
          onPressed: () async {
            final result = await FilePicker.platform.pickFiles(type: FileType.image);
            if (result?.files.single.path == null) return;
            onPick(File(result!.files.single.path!));
          },
        ),
        if (hasImage)
          IconButton(
            icon: const Icon(Icons.close_rounded, size: 16, color: Colors.red),
            tooltip: 'Remove $label image',
            visualDensity: VisualDensity.compact,
            onPressed: onRemove,
          ),
      ],
    ),
  );
}

Widget _busyButtonChild(bool busy, String label) {
  if (!busy) return Text(label);
  return Row(
    mainAxisSize: MainAxisSize.min,
    children: [
      const SizedBox(
        width: 16,
        height: 16,
        child: CircularProgressIndicator(strokeWidth: 2),
      ),
      const SizedBox(width: 10),
      Text(label),
    ],
  );
}

Future<void> _handleTaskError(
  BuildContext context,
  String task,
  Object error, {
  StackTrace? stackTrace,
  Map<String, dynamic>? details,
}) async {
  await AdminErrorLogger.instance.log(
    task,
    error,
    stackTrace: stackTrace,
    details: details,
  );
  if (!context.mounted) return;
  _showActionSnackBar(context, '$task failed: ${_friendlyError(error)}',
      isError: true);
}

void _openErrorLogs(BuildContext context) {
  Navigator.of(context).push(
    MaterialPageRoute(builder: (_) => const ErrorLogsPage()),
  );
}

void _showActionSnackBar(
  BuildContext context,
  String message, {
  bool isError = false,
}) {
  final messenger = ScaffoldMessenger.of(context);
  messenger.showSnackBar(
    SnackBar(
      content: Text(message),
      backgroundColor: isError ? Theme.of(context).colorScheme.error : null,
    ),
  );
}

Future<bool> _confirmDeleteDialog(
  BuildContext context, {
  required String title,
  required String body,
}) async {
  final result = await showDialog<bool>(
    context: context,
    builder: (ctx) => AlertDialog(
      title: Text(title),
      content: Text(body),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(ctx).pop(false),
          child: const Text('Cancel'),
        ),
        FilledButton(
          onPressed: () => Navigator.of(ctx).pop(true),
          child: const Text('Delete'),
        ),
      ],
    ),
  );
  return result == true;
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await AdminErrorLogger.instance.init();
  FlutterError.onError = (details) {
    AdminErrorLogger.instance.log(
      'FlutterError',
      details.exception,
      stackTrace: details.stack,
    );
  };
  runApp(const AdminApp());
}

class AdminApp extends StatefulWidget {
  const AdminApp({super.key});

  @override
  State<AdminApp> createState() => _AdminAppState();
}

class _AdminAppState extends State<AdminApp> {
  ThemeMode _themeMode = ThemeMode.dark;

  @override
  Widget build(BuildContext context) {
    const lightScheme = ColorScheme(
      brightness: Brightness.light,
      primary: Color(0xFFE85A1C),
      onPrimary: Colors.white,
      secondary: Color(0xFFFFB86C),
      onSecondary: Color(0xFF141414),
      error: Color(0xFFD92D20),
      onError: Colors.white,
      surface: Color(0xFFFFFFFF),
      onSurface: Color(0xFF141414),
      primaryContainer: Color(0xFFFFE8D6),
      onPrimaryContainer: Color(0xFF141414),
      secondaryContainer: Color(0xFFFFF1E6),
      onSecondaryContainer: Color(0xFF141414),
      surfaceContainerHighest: Color(0xFFFFF1E6),
      outline: Color(0xFFE8D4C4),
      outlineVariant: Color(0xFFD4B8A4),
    );
    const darkScheme = ColorScheme(
      brightness: Brightness.dark,
      primary: Color(0xFFE85A1C),
      onPrimary: Colors.white,
      secondary: Color(0xFFFFB86C),
      onSecondary: Color(0xFF141414),
      error: Color(0xFFD92D20),
      onError: Colors.white,
      surface: Color(0xFF171A22),
      onSurface: Colors.white,
      primaryContainer: Color(0xFF2A1F1A),
      onPrimaryContainer: Color(0xFFFFE8D6),
      secondaryContainer: Color(0xFF3A2D23),
      onSecondaryContainer: Color(0xFFFFEAD6),
      surfaceContainerHighest: Color(0xFF252A35),
      outline: Color(0xFF343B49),
      outlineVariant: Color(0xFF313744),
    );
    return MaterialApp(
      title: 'Indraprastha Admin',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: lightScheme,
        scaffoldBackgroundColor: const Color(0xFFFFF8F2),
        appBarTheme: AppBarTheme(
          backgroundColor: lightScheme.surface,
          foregroundColor: lightScheme.onSurface,
          elevation: 0,
          centerTitle: false,
          titleTextStyle: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w700,
          ),
        ),
        cardTheme: CardThemeData(
          elevation: 0,
          color: lightScheme.surface,
          margin: EdgeInsets.zero,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
            side: BorderSide(color: lightScheme.outlineVariant),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor:
              lightScheme.surfaceContainerHighest.withValues(alpha: 0.35),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: BorderSide(color: lightScheme.outlineVariant),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: BorderSide(color: lightScheme.outlineVariant),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: BorderSide(color: lightScheme.primary, width: 1.4),
          ),
          contentPadding:
              const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        ),
        filledButtonTheme: FilledButtonThemeData(
          style: FilledButton.styleFrom(
            minimumSize: const Size.fromHeight(48),
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
            textStyle: const TextStyle(fontWeight: FontWeight.w700),
          ),
        ),
        navigationBarTheme: NavigationBarThemeData(
          elevation: 0,
          backgroundColor: lightScheme.surface,
          indicatorColor: lightScheme.secondaryContainer,
          labelTextStyle: WidgetStateProperty.resolveWith((states) {
            return TextStyle(
              fontWeight: states.contains(WidgetState.selected)
                  ? FontWeight.w700
                  : FontWeight.w500,
            );
          }),
        ),
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        colorScheme: darkScheme,
        scaffoldBackgroundColor: const Color(0xFF11131A),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.transparent,
          foregroundColor: Colors.white,
          elevation: 0,
          surfaceTintColor: Colors.transparent,
        ),
        cardTheme: CardThemeData(
          elevation: 0,
          color: darkScheme.surface,
          margin: EdgeInsets.zero,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
            side: BorderSide(color: darkScheme.outlineVariant),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: const Color(0xFF1D212B),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: BorderSide(color: darkScheme.outline),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: BorderSide(color: darkScheme.outline),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: BorderSide(color: darkScheme.primary, width: 1.4),
          ),
          contentPadding:
              const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        ),
        filledButtonTheme: FilledButtonThemeData(
          style: FilledButton.styleFrom(
            minimumSize: const Size.fromHeight(48),
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
            textStyle: const TextStyle(fontWeight: FontWeight.w700),
          ),
        ),
      ),
      themeMode: _themeMode,
      home: AdminHome(
        onToggleTheme: () {
          setState(() {
            _themeMode =
                _themeMode == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
          });
        },
      ),
    );
  }
}

class AdminHome extends StatefulWidget {
  const AdminHome({super.key, required this.onToggleTheme});

  final VoidCallback onToggleTheme;

  @override
  State<AdminHome> createState() => _AdminHomeState();
}

class _AdminHomeState extends State<AdminHome> {
  final _api = AdminApi();
  int _tab = 0;
  bool _restoringSession = true;
  bool? _driveConnected;
  bool _checkedDriveAfterLogin = false;
  static const _titles = [
    'Dashboard',
    'Setup',
    'Books',
    'Practice',
    'Tests',
    'MCQ of the Day',
    'Videos',
    'Packages',
    'Users',
    'Complaints',
    'Notifications',
    'Slider Banners',
  ];
  static const _navItems = [
    (Icons.dashboard_outlined, 'Dashboard'),
    (Icons.account_tree_outlined, 'Setup'),
    (Icons.upload_file_outlined, 'Books'),
    (Icons.flash_on_outlined, 'Practice'),
    (Icons.fact_check_outlined, 'Tests'),
    (Icons.quiz_outlined, 'MCQ of the Day'),
    (Icons.smart_display_outlined, 'Videos'),
    (Icons.workspace_premium_outlined, 'Packages'),
    (Icons.people_outline_rounded, 'Users'),
    (Icons.report_outlined, 'Complaints'),
    (Icons.notifications_outlined, 'Notifications'),
    (Icons.view_carousel_outlined, 'Slider Banners'),
  ];

  @override
  void initState() {
    super.initState();
    _restoreSession();
  }

  Future<void> _restoreSession() async {
    await _api.restoreSession();
    if (_api.token != null) {
      await _checkDriveConnection(showPrompt: false);
    }
    if (!mounted) return;
    setState(() => _restoringSession = false);
  }

  Future<void> _checkDriveConnection({required bool showPrompt}) async {
    try {
      final status = await _api.driveOAuthStatus();
      final connected = status['hasRefreshToken'] == true;
      if (!mounted) return;
      setState(() => _driveConnected = connected);
      if (!connected) {
        setState(() => _tab = 1);
        if (showPrompt) {
          _showActionSnackBar(
            context,
            'Please connect Google Drive first to enable uploads.',
            isError: true,
          );
        }
      }
    } catch (_) {
      if (!mounted) return;
      setState(() => _driveConnected = false);
      if (showPrompt) {
        _showActionSnackBar(
          context,
          'Could not verify Drive connection. Open Setup and connect Drive.',
          isError: true,
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_restoringSession) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }
    final pages = [
      OverviewPage(api: _api, onNavigate: (t) => setState(() => _tab = t)),
      SetupPage(api: _api),
      BooksPage(api: _api),
      PracticePage(api: _api),
      TestsPage(api: _api),
      McqsPage(api: _api),
      VideosPage(api: _api),
      PackagesPage(api: _api),
      UsersPage(api: _api),
      ComplaintsPage(api: _api),
      NotificationsPage(api: _api),
      SliderBannersPage(api: _api),
    ];
    final isLoggedIn = _api.token != null;
    if (isLoggedIn && !_checkedDriveAfterLogin) {
      _checkedDriveAfterLogin = true;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _checkDriveConnection(showPrompt: true);
      });
    }
    if (!isLoggedIn) {
      _checkedDriveAfterLogin = false;
      _driveConnected = null;
    }
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final scheme = Theme.of(context).colorScheme;
    final isWide = MediaQuery.sizeOf(context).width >= 900;
    final title = _tab < _titles.length ? _titles[_tab] : 'Admin';

    Future<void> handleBack() async {
      if (Navigator.of(context).canPop()) {
        Navigator.of(context).pop();
        return;
      }
      if (_tab != 0) {
        setState(() => _tab = 0);
        return;
      }
      final shouldExit = await showDialog<bool>(
        context: context,
        builder: (ctx) => AlertDialog(
          title: const Text('Exit admin app?'),
          content: const Text('Kya aap app band karna chahte ho?'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(ctx).pop(false),
              child: const Text('Cancel'),
            ),
            FilledButton(
              onPressed: () => Navigator.of(ctx).pop(true),
              child: const Text('Exit'),
            ),
          ],
        ),
      );
      if (shouldExit == true) {
        SystemNavigator.pop();
      }
    }

    // Shared body content widget
    final bodyContent = Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            scheme.primaryContainer.withValues(alpha: 0.22),
            Theme.of(context).scaffoldBackgroundColor,
          ],
        ),
      ),
      child: _api.token == null
          ? LoginPage(
              api: _api,
              onLoginSuccess: () async {
                setState(() => _checkedDriveAfterLogin = false);
                await _checkDriveConnection(showPrompt: true);
                if (mounted) setState(() {});
              },
            )
          : pages[_tab],
    );

    // Sidebar nav list (shared between drawer and desktop rail)
    Widget buildNavList({bool inDrawer = false}) {
      return Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(vertical: 8),
              itemCount: _navItems.length,
              itemBuilder: (context, index) {
                final item = _navItems[index];
                final selected = _tab == index;
                return Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  child: ListTile(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12)),
                    selected: selected,
                    selectedTileColor: scheme.primaryContainer,
                    leading: Icon(item.$1,
                        color: selected ? scheme.primary : null, size: 20),
                    title: Text(
                      item.$2,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontWeight:
                            selected ? FontWeight.w700 : FontWeight.w500,
                        color: selected ? scheme.primary : null,
                        fontSize: 14,
                      ),
                    ),
                    onTap: () {
                      setState(() => _tab = index);
                      if (inDrawer) Navigator.of(context).pop();
                    },
                  ),
                );
              },
            ),
          ),
          Divider(height: 1, color: scheme.outlineVariant),
          Padding(
            padding: const EdgeInsets.fromLTRB(8, 4, 8, 12),
            child: ListTile(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12)),
              leading: const Icon(Icons.logout_rounded, size: 20),
              title: const Text('Logout', style: TextStyle(fontSize: 14)),
              onTap: () async {
                if (inDrawer) Navigator.of(context).pop();
                await _api.clearSession();
                if (!mounted) return;
                setState(() => _tab = 0);
              },
            ),
          ),
        ],
      );
    }

    // Gradient sidebar header
    final sidebarHeader = Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(16, 20, 16, 18),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFFB8440E), Color(0xFFE85A1C)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
                color: Colors.white24, borderRadius: BorderRadius.circular(12)),
            clipBehavior: Clip.antiAlias,
            child: Image.asset('assets/images/app_icon.png', fit: BoxFit.cover),
          ),
          const SizedBox(width: 10),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Indraprastha',
                    style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w800,
                        fontSize: 15)),
                Text('Admin Panel',
                    style: TextStyle(color: Colors.white70, fontSize: 12)),
              ],
            ),
          ),
        ],
      ),
    );

    // ── Desktop layout (wide): permanent sidebar + content ──────────────────
    if (isLoggedIn && isWide) {
      return PopScope(
        canPop: false,
        onPopInvokedWithResult: (didPop, _) {
          if (!didPop) handleBack();
        },
        child: Scaffold(
          body: Row(
            children: [
              // Permanent sidebar
              SizedBox(
                width: 240,
                child: Container(
                  decoration: BoxDecoration(
                    color: isDark ? const Color(0xFF1A1D26) : Colors.white,
                    border:
                        Border(right: BorderSide(color: scheme.outlineVariant)),
                  ),
                  child: Column(
                    children: [
                      sidebarHeader,
                      Expanded(child: buildNavList()),
                    ],
                  ),
                ),
              ),
              // Content area
              Expanded(
                child: Column(
                  children: [
                    // Top bar
                    Container(
                      height: 56,
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      decoration: BoxDecoration(
                        color: isDark ? const Color(0xFF1A1D26) : Colors.white,
                        border: Border(
                            bottom: BorderSide(color: scheme.outlineVariant)),
                      ),
                      child: Row(
                        children: [
                          Expanded(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(title,
                                    style: const TextStyle(
                                        fontWeight: FontWeight.w700,
                                        fontSize: 17)),
                                if (_driveConnected == false)
                                  Text('Drive not connected — go to Setup',
                                      style: TextStyle(
                                          fontSize: 11, color: scheme.error)),
                              ],
                            ),
                          ),
                          IconButton(
                            onPressed: () => _openErrorLogs(context),
                            icon:
                                const Icon(Icons.bug_report_outlined, size: 20),
                            tooltip: 'Error logs',
                          ),
                          IconButton(
                            onPressed: widget.onToggleTheme,
                            icon: Icon(
                                isDark
                                    ? Icons.light_mode_outlined
                                    : Icons.dark_mode_outlined,
                                size: 20),
                            tooltip: 'Toggle theme',
                          ),
                          IconButton(
                            onPressed: () async {
                              await _api.clearSession();
                              if (!mounted) return;
                              setState(() => _tab = 0);
                            },
                            icon: const Icon(Icons.logout_rounded, size: 20),
                            tooltip: 'Logout',
                          ),
                        ],
                      ),
                    ),
                    Expanded(child: bodyContent),
                  ],
                ),
              ),
            ],
          ),
        ),
      );
    }

    // ── Mobile / narrow layout: hamburger drawer ──────────────────────────────
    return PopScope(
      canPop: !isLoggedIn,
      onPopInvokedWithResult: (didPop, _) {
        if (!didPop && isLoggedIn) handleBack();
      },
      child: Scaffold(
        drawer: isLoggedIn
            ? Drawer(
                child: Column(
                  children: [
                    sidebarHeader,
                    Expanded(child: buildNavList(inDrawer: true)),
                  ],
                ),
              )
            : null,
        appBar: AppBar(
          title: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title,
                  style: const TextStyle(
                      fontWeight: FontWeight.w700, fontSize: 18)),
              if (isLoggedIn && _driveConnected == false)
                Text('Drive not connected',
                    style: Theme.of(context)
                        .textTheme
                        .bodySmall
                        ?.copyWith(color: scheme.error)),
            ],
          ),
          actions: [
            if (isLoggedIn)
              IconButton(
                onPressed: () => _openErrorLogs(context),
                icon: const Icon(Icons.bug_report_outlined, size: 22),
                tooltip: 'Error logs',
              ),
            IconButton(
              onPressed: widget.onToggleTheme,
              icon: Icon(
                  isDark ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
                  size: 22),
              tooltip: 'Toggle theme',
            ),
            if (isLoggedIn)
              IconButton(
                onPressed: () async {
                  await _api.clearSession();
                  if (!mounted) return;
                  setState(() => _tab = 0);
                },
                icon: const Icon(Icons.logout_rounded, size: 22),
                tooltip: 'Logout',
              ),
            const SizedBox(width: 4),
          ],
        ),
        body: bodyContent,
      ),
    );
  }
}

class LoginPage extends StatefulWidget {
  const LoginPage({
    super.key,
    required this.api,
    required this.onLoginSuccess,
  });

  final AdminApi api;
  final VoidCallback onLoginSuccess;

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _username = TextEditingController(text: 'admin');
  final _password = TextEditingController(text: 'admin@123');
  String? _message;
  bool _loading = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final scheme = theme.colorScheme;
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 460),
        child: Card(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 74,
                  height: 74,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: scheme.outlineVariant),
                  ),
                  clipBehavior: Clip.antiAlias,
                  child: Image.asset('assets/images/app_icon.png',
                      fit: BoxFit.cover),
                ),
                const SizedBox(height: 12),
                Text(
                  'Welcome back',
                  style: theme.textTheme.titleLarge
                      ?.copyWith(fontWeight: FontWeight.w700),
                ),
                const SizedBox(height: 4),
                Text(
                  'Login to manage courses, books, tests, and videos',
                  textAlign: TextAlign.center,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: scheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _username,
                  decoration: const InputDecoration(labelText: 'Username'),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _password,
                  decoration: const InputDecoration(labelText: 'Password'),
                  obscureText: true,
                ),
                const SizedBox(height: 16),
                FilledButton(
                  onPressed: _loading
                      ? null
                      : () async {
                          setState(() => _loading = true);
                          try {
                            await widget.api.login(
                              _username.text.trim(),
                              _password.text.trim(),
                            );
                            if (!mounted) return;
                            setState(() => _message = 'Login success');
                            widget.onLoginSuccess();
                          } catch (e) {
                            setState(() => _message = '$e');
                          } finally {
                            if (mounted) setState(() => _loading = false);
                          }
                        },
                  child: Text(_loading ? 'Please wait...' : 'Login'),
                ),
                if (_message != null) ...[
                  const SizedBox(height: 8),
                  Text(
                    _message!,
                    style: TextStyle(
                      color: _message == 'Login success'
                          ? Colors.green
                          : scheme.error,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class OverviewPage extends StatelessWidget {
  const OverviewPage({super.key, required this.api, required this.onNavigate});

  final AdminApi api;
  final void Function(int tab) onNavigate;

  static const _statConfigs = [
    (
      label: 'Users',
      key: 'users',
      icon: Icons.people_outline_rounded,
      tab: 8,
      color: Color(0xFF1976D2)
    ),
    (
      label: 'Books',
      key: 'books',
      icon: Icons.menu_book_rounded,
      tab: 2,
      color: Color(0xFF7B1FA2)
    ),
    (
      label: 'Practice',
      key: 'practiceSets',
      icon: Icons.flash_on_rounded,
      tab: 3,
      color: Color(0xFFE85A1C)
    ),
    (
      label: 'Tests',
      key: 'tests',
      icon: Icons.fact_check_rounded,
      tab: 4,
      color: Color(0xFFD92D20)
    ),
    (
      label: 'Videos',
      key: 'videos',
      icon: Icons.smart_display_rounded,
      tab: 6,
      color: Color(0xFF2E7D32)
    ),
    (
      label: 'Packages',
      key: 'packages',
      icon: Icons.workspace_premium_rounded,
      tab: 7,
      color: Color(0xFFC99A33)
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: api.dashboard(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        }
        final stats =
            Map<String, dynamic>.from(snapshot.data?['stats'] as Map? ?? {});
        return CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: Container(
                margin: const EdgeInsets.all(16),
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [
                      Color(0xFFB8440E),
                      Color(0xFFE85A1C),
                      Color(0xFFFFB86C)
                    ],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: const [
                    BoxShadow(
                        color: Color(0x30E85A1C),
                        blurRadius: 20,
                        offset: Offset(0, 8)),
                  ],
                ),
                child: Row(
                  children: [
                    Container(
                      width: 52,
                      height: 52,
                      decoration: BoxDecoration(
                        color: Colors.white24,
                        borderRadius: BorderRadius.circular(14),
                      ),
                      clipBehavior: Clip.antiAlias,
                      child: Image.asset('assets/images/app_icon.png',
                          fit: BoxFit.cover),
                    ),
                    const SizedBox(width: 14),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Indraprastha NEET Academy',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w800,
                                  fontSize: 16)),
                          SizedBox(height: 4),
                          Text('Admin Dashboard — manage all content from here',
                              style: TextStyle(
                                  color: Colors.white70, fontSize: 12)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            SliverPadding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
              sliver: SliverGrid(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 1.55,
                ),
                delegate: SliverChildBuilderDelegate(
                  (context, i) {
                    final cfg = _statConfigs[i];
                    final count = stats[cfg.key] ?? 0;
                    return _StatCard(
                      label: cfg.label,
                      count: count,
                      icon: cfg.icon,
                      accent: cfg.color,
                      onTap: () => onNavigate(cfg.tab),
                    );
                  },
                  childCount: _statConfigs.length,
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}

class _StatCard extends StatelessWidget {
  const _StatCard({
    required this.label,
    required this.count,
    required this.icon,
    required this.accent,
    required this.onTap,
  });
  final String label;
  final dynamic count;
  final IconData icon;
  final Color accent;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Material(
      color: isDark ? const Color(0xFF1E2330) : Colors.white,
      borderRadius: BorderRadius.circular(18),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(18),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(18),
            border: Border.all(
              color: isDark ? const Color(0xFF313744) : const Color(0xFFE8D4C4),
            ),
          ),
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: accent.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Icon(icon, color: accent, size: 20),
                  ),
                  const Icon(Icons.arrow_forward_ios_rounded,
                      size: 12, color: Color(0xFF9E9E9E)),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '$count',
                    style: Theme.of(context)
                        .textTheme
                        .headlineSmall
                        ?.copyWith(fontWeight: FontWeight.w800),
                  ),
                  Text(
                    label,
                    style:
                        const TextStyle(fontSize: 13, color: Color(0xFF757575)),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class SetupPage extends StatefulWidget {
  const SetupPage({super.key, required this.api});

  final AdminApi api;

  @override
  State<SetupPage> createState() => _SetupPageState();
}

class _SetupPageState extends State<SetupPage> {
  final _batchName = TextEditingController();
  final _batchTarget = TextEditingController(text: '2028');
  final _batchClass = TextEditingController(text: 'Class 11');
  final _className = TextEditingController();
  final _subjectName = TextEditingController();
  final _oauthCode = TextEditingController();
  int? _classId;
  String? _status;
  String? _oauthUrl;
  bool? _driveConnected;
  List<dynamic> _classes = const [];

  @override
  void initState() {
    super.initState();
    _loadClasses();
    _loadDriveStatus();
  }

  Future<void> _loadClasses() async {
    final classes = await widget.api.classes();
    setState(() {
      _classes = classes;
      if (_classes.isNotEmpty) {
        _classId = (_classes.first as Map<String, dynamic>)['id'] as int;
      }
    });
  }

  Future<void> _loadDriveStatus() async {
    try {
      final status = await widget.api.driveOAuthStatus();
      setState(() => _driveConnected = status['hasRefreshToken'] == true);
    } catch (_) {}
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                const Align(
                  alignment: Alignment.centerLeft,
                  child: Text('Create Batch'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _batchName,
                  decoration: const InputDecoration(labelText: 'Batch Name'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _batchTarget,
                  decoration: const InputDecoration(labelText: 'Target Year'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _batchClass,
                  decoration: const InputDecoration(labelText: 'Class Label'),
                ),
                const SizedBox(height: 8),
                FilledButton(
                  onPressed: () async {
                    try {
                      await widget.api.createBatch(
                        name: _batchName.text.trim(),
                        targetYear: _batchTarget.text.trim(),
                        classLabel: _batchClass.text.trim(),
                      );
                      setState(() => _status = 'Batch created');
                      if (context.mounted) {
                        _showActionSnackBar(
                            context, 'Batch created successfully');
                      }
                    } catch (e) {
                      setState(() => _status = 'Batch create failed: $e');
                      if (context.mounted) {
                        _showActionSnackBar(context, 'Batch create failed',
                            isError: true);
                      }
                    }
                  },
                  child: const Text('Create Batch'),
                ),
              ],
            ),
          ),
        ),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                const Align(
                  alignment: Alignment.centerLeft,
                  child: Text('Create Class'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _className,
                  decoration: const InputDecoration(labelText: 'Class Name'),
                ),
                const SizedBox(height: 8),
                FilledButton(
                  onPressed: () async {
                    try {
                      await widget.api.createClass(_className.text.trim());
                      await _loadClasses();
                      setState(() => _status = 'Class created');
                      if (context.mounted) {
                        _showActionSnackBar(
                            context, 'Class created successfully');
                      }
                    } catch (e) {
                      setState(() => _status = 'Class create failed: $e');
                      if (context.mounted) {
                        _showActionSnackBar(context, 'Class create failed',
                            isError: true);
                      }
                    }
                  },
                  child: const Text('Create Class'),
                ),
              ],
            ),
          ),
        ),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                const Align(
                  alignment: Alignment.centerLeft,
                  child: Text('Create Subject'),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<int>(
                  initialValue: _classId,
                  items: _classes
                      .map(
                        (c) => DropdownMenuItem<int>(
                          value: (c as Map<String, dynamic>)['id'] as int,
                          child: Text(c['name'].toString()),
                        ),
                      )
                      .toList(),
                  onChanged: (v) => setState(() => _classId = v),
                  decoration: const InputDecoration(labelText: 'Class'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _subjectName,
                  decoration: const InputDecoration(labelText: 'Subject Name'),
                ),
                const SizedBox(height: 8),
                FilledButton(
                  onPressed: _classId == null
                      ? null
                      : () async {
                          try {
                            await widget.api.createSubject(
                              classId: _classId!,
                              name: _subjectName.text.trim(),
                            );
                            setState(() => _status = 'Subject created');
                            if (context.mounted) {
                              _showActionSnackBar(
                                  context, 'Subject created successfully');
                            }
                          } catch (e) {
                            setState(
                                () => _status = 'Subject create failed: $e');
                            if (context.mounted) {
                              _showActionSnackBar(
                                  context, 'Subject create failed',
                                  isError: true);
                            }
                          }
                        },
                  child: const Text('Create Subject'),
                ),
              ],
            ),
          ),
        ),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Connect Google Drive (one-time)'),
                const SizedBox(height: 8),
                Text(
                  _driveConnected == true
                      ? 'Status: Connected'
                      : 'Status: Not connected',
                ),
                const SizedBox(height: 8),
                FilledButton.tonal(
                  onPressed: () async {
                    try {
                      final start = await widget.api.driveOAuthStart();
                      final authUrl = start['authUrl']?.toString() ?? '';
                      if (authUrl.isEmpty) {
                        throw Exception('Auth URL not found');
                      }
                      setState(() => _oauthUrl = authUrl);
                      final launched = await launchUrl(
                        Uri.parse(authUrl),
                        mode: LaunchMode.externalApplication,
                      );
                      if (!context.mounted) return;
                      if (!launched) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                              content: Text(
                                  'Could not open browser. Copy URL manually.')),
                        );
                      }
                    } catch (e) {
                      setState(() => _status = 'Drive auth URL failed: $e');
                    }
                  },
                  child: const Text('1) Open Google consent'),
                ),
                if (_oauthUrl != null) ...[
                  const SizedBox(height: 8),
                  SelectableText(
                    _oauthUrl!,
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ],
                const SizedBox(height: 8),
                TextField(
                  controller: _oauthCode,
                  decoration: const InputDecoration(
                    labelText: '2) Paste code from callback URL',
                  ),
                ),
                const SizedBox(height: 8),
                FilledButton(
                  onPressed: () async {
                    try {
                      final code = _oauthCode.text.trim();
                      if (code.isEmpty) {
                        setState(() => _status = 'Please paste OAuth code');
                        return;
                      }
                      await widget.api.driveOAuthExchange(code);
                      await _loadDriveStatus();
                      _oauthCode.clear();
                      if (context.mounted) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                              content: Text('Drive connected successfully')),
                        );
                      }
                    } catch (e) {
                      setState(
                          () => _status = 'Drive code exchange failed: $e');
                    }
                  },
                  child: const Text('3) Save connection'),
                ),
              ],
            ),
          ),
        ),
        if (_status != null)
          Padding(
            padding: const EdgeInsets.only(top: 8),
            child: Text(_status!),
          ),
      ],
    );
  }
}

class BooksPage extends StatefulWidget {
  const BooksPage({super.key, required this.api});

  final AdminApi api;

  @override
  State<BooksPage> createState() => _BooksPageState();
}

class _BooksPageState extends State<BooksPage> {
  List<dynamic> _batches = const [];
  List<dynamic> _books = const [];
  int? _batchId;
  int? _editingId;
  final _classLabel = TextEditingController(text: 'Class 11');
  final _subject = TextEditingController(text: 'Physics');
  final _bookTitle = TextEditingController();
  final _chapter = TextEditingController();
  final _manualChapterTitle = TextEditingController();
  final _chapterOverview = TextEditingController();
  final _chapterHighlight = TextEditingController();
  final _pyqQuestion = TextEditingController();
  final _pyqOptionA = TextEditingController();
  final _pyqOptionB = TextEditingController();
  final _pyqOptionC = TextEditingController();
  final _pyqOptionD = TextEditingController();
  final _pyqExplanation = TextEditingController();
  final _pyqExplanationVideoLink = TextEditingController();
  String _pyqCorrect = 'A';
  int? _editingPyqId;
  File? _pyqImage;
  String _pyqImageLink = '';
  File? _pyqExplanationImage;
  String _pyqExplanationImageLink = '';
  String _bookCategory = 'NCERT books';
  int? _selectedBookId;
  int? _selectedChapterId;
  List<dynamic> _chapters = const [];
  File? _pdf;
  String? _status;
  double _pdfProgress = 0.0;
  bool _pdfUploading = false;

  void _resetBookForm() {
    _editingId = null;
    _bookTitle.clear();
    _chapter.clear();
    _manualChapterTitle.clear();
    _chapterOverview.clear();
    _chapterHighlight.clear();
    _pdf = null;
  }

  @override
  void initState() {
    super.initState();
    _loadBatches();
  }

  Future<void> _loadBatches() async {
    try {
      final batches = await widget.api.batches();
      final books = await widget.api.books();
      if (!mounted) return;
      setState(() {
        _batches = batches['batches'] as List<dynamic>;
        _books = books['books'] as List<dynamic>;
        if (_batches.isNotEmpty && _batchId == null) {
          _batchId = (_batches.first as Map<String, dynamic>)['id'] as int;
        }
        if (_books.isNotEmpty &&
            (_selectedBookId == null ||
                !_books.any((b) => (b as Map<String, dynamic>)['id'] == _selectedBookId))) {
          _selectedBookId = (_books.first as Map<String, dynamic>)['id'] as int;
        }
      });
      await _loadChaptersForSelectedBook();
    } catch (e) {
      if (mounted) setState(() => _status = 'Failed to load: $e');
    }
  }

  Future<void> _loadChaptersForSelectedBook() async {
    if (_selectedBookId == null) {
      if (mounted) {
        setState(() {
          _chapters = const [];
          _selectedChapterId = null;
        });
      }
      return;
    }
    try {
      final data = await widget.api.bookChapters(_selectedBookId!);
      if (!mounted) return;
      setState(() {
        _chapters = data;
        if (_chapters.isNotEmpty) {
          if (!_chapters.any((c) => (c as Map<String, dynamic>)['id'] == _selectedChapterId)) {
            _selectedChapterId = (_chapters.first as Map<String, dynamic>)['id'] as int;
          }
        } else {
          _selectedChapterId = null;
        }
      });
    } catch (e) {
      if (mounted) {
        setState(() {
          _chapters = const [];
          _selectedChapterId = null;
          _status = 'Failed to load chapters: $e';
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                DropdownButtonFormField<int>(
                  key: ValueKey('batch_dropdown_$_batchId'),
                  initialValue: _batches.any(
                          (b) => (b as Map<String, dynamic>)['id'] == _batchId)
                      ? _batchId
                      : null,
                  items: _batches
                      .map(
                        (b) => DropdownMenuItem<int>(
                          value: (b as Map<String, dynamic>)['id'] as int,
                          child: Text(b['name'].toString()),
                        ),
                      )
                      .toList(),
                  onChanged: (v) => setState(() => _batchId = v),
                  decoration: const InputDecoration(labelText: 'Batch'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _classLabel,
                  decoration: const InputDecoration(labelText: 'Class'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _bookTitle,
                  decoration: const InputDecoration(labelText: 'Book title'),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  initialValue: _bookCategory,
                  items: const [
                    DropdownMenuItem(
                        value: 'NCERT books', child: Text('NCERT books')),
                    DropdownMenuItem(
                        value: 'Handwritten notes',
                        child: Text('Handwritten notes')),
                    DropdownMenuItem(
                        value: 'Formula sheets', child: Text('Formula sheets')),
                    DropdownMenuItem(
                        value: 'Reference book', child: Text('Reference book')),
                  ],
                  onChanged: (v) =>
                      setState(() => _bookCategory = v ?? 'NCERT books'),
                  decoration: const InputDecoration(labelText: 'Book category'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _subject,
                  decoration: const InputDecoration(labelText: 'Subject'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _chapter,
                  decoration: const InputDecoration(labelText: 'Chapter'),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(
                      child:
                          Text(_pdf == null ? 'No PDF selected' : _pdf!.path),
                    ),
                    TextButton(
                      onPressed: () async {
                        final result = await FilePicker.platform.pickFiles(
                          type: FileType.custom,
                          allowedExtensions: ['pdf'],
                        );
                        if (result == null ||
                            result.files.single.path == null) {
                          return;
                        }
                        setState(() => _pdf = File(result.files.single.path!));
                      },
                      child: const Text('Pick PDF'),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                FilledButton(
                  onPressed: (_batchId == null || _pdfUploading)
                      ? null
                      : () async {
                          try {
                            final title = _bookTitle.text.trim();
                            final subject = _subject.text.trim();
                            final topic = _chapter.text.trim();
                            if (title.isEmpty ||
                                subject.isEmpty ||
                                topic.isEmpty) {
                              setState(() => _status =
                                  'Please fill title, subject and chapter.');
                              if (context.mounted) {
                                _showActionSnackBar(
                                  context,
                                  'Title, Subject aur Chapter required hai.',
                                  isError: true,
                                );
                              }
                              return;
                            }
                            int? savedBookId;
                            if (_editingId == null) {
                              savedBookId = await widget.api.addBook(
                                batchId: _batchId!,
                                classLabel: _classLabel.text.trim(),
                                title: title,
                                subject: subject,
                                topic: topic,
                                category: _bookCategory,
                              );
                            } else {
                              await widget.api.updateBook(
                                id: _editingId!,
                                classLabel: _classLabel.text.trim(),
                                title: title,
                                subject: subject,
                                topic: topic,
                              );
                              savedBookId = _editingId;
                            }
                            if (_pdf != null) {
                              setState(() {
                                _pdfUploading = true;
                                _pdfProgress = 0.0;
                              });
                              await widget.api.uploadBookByHierarchyChunked(
                                batchId: _batchId!,
                                classLabel: _classLabel.text.trim(),
                                subject: subject,
                                chapterTitle: topic,
                                pdfFile: _pdf!,
                                bookId: savedBookId,
                                onProgress: (p) {
                                  if (mounted) setState(() => _pdfProgress = p);
                                },
                              );
                            }
                            await _loadBatches();
                            if (savedBookId != null && savedBookId > 0) {
                              _selectedBookId = savedBookId;
                              await _loadChaptersForSelectedBook();
                            }
                            setState(() {
                              _status = _pdf != null
                                  ? 'Book and PDF saved successfully'
                                  : 'Book saved successfully';
                              _resetBookForm();
                            });
                            if (context.mounted) {
                              _showActionSnackBar(
                                context,
                                _pdf != null
                                    ? 'Book and PDF added successfully'
                                    : 'Book saved successfully',
                              );
                            }
                          } catch (e) {
                            setState(() => _status = 'Failed: $e');
                            if (context.mounted) {
                              _showActionSnackBar(context, 'Book save failed',
                                  isError: true);
                            }
                          } finally {
                            if (mounted) setState(() => _pdfUploading = false);
                          }
                        },
                  child: Text(_editingId == null ? 'Add Book' : 'Update Book'),
                ),
                if (_pdfUploading) ...[
                  const SizedBox(height: 10),
                  LinearProgressIndicator(
                      value: _pdfProgress == 0 ? null : _pdfProgress),
                ],
                const SizedBox(height: 10),
                const Divider(),
                const Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'Chapter / Highlight / PYQ tools',
                    style: TextStyle(fontWeight: FontWeight.w700),
                  ),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<int>(
                  key: ValueKey('book_dropdown_$_selectedBookId'),
                  initialValue: _books.any(
                          (b) => (b as Map<String, dynamic>)['id'] == _selectedBookId)
                      ? _selectedBookId
                      : null,
                  items: _books
                      .map(
                        (b) => DropdownMenuItem<int>(
                          value: (b as Map<String, dynamic>)['id'] as int,
                          child: Text('${b['title']} (${b['subject'] ?? ''})'),
                        ),
                      )
                      .toList(),
                  onChanged: (v) async {
                    setState(() {
                      _selectedBookId = v;
                      _selectedChapterId = null;
                      _chapters = const [];
                    });
                    await _loadChaptersForSelectedBook();
                  },
                  decoration: const InputDecoration(labelText: 'Select book'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _manualChapterTitle,
                  decoration: const InputDecoration(
                    labelText: 'Chapter title / name',
                    hintText: 'e.g. Anatomy of Flowering Plants',
                  ),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _chapterOverview,
                  minLines: 2,
                  maxLines: 3,
                  decoration:
                      const InputDecoration(labelText: 'Chapter overview'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _chapterHighlight,
                  decoration:
                      const InputDecoration(labelText: 'Highlight (manual)'),
                ),
                const SizedBox(height: 8),
                FilledButton.tonal(
                  onPressed: _selectedBookId == null
                      ? null
                      : () async {
                          final title = _manualChapterTitle.text.trim().isNotEmpty
                              ? _manualChapterTitle.text.trim()
                              : (_chapter.text.trim().isNotEmpty
                                  ? _chapter.text.trim()
                                  : 'Chapter ${_chapters.length + 1}');
                          await widget.api.createBookChapter(
                            bookId: _selectedBookId!,
                            title: title,
                            overview: _chapterOverview.text.trim(),
                            noteSummary: '',
                            highlight: _chapterHighlight.text.trim(),
                          );
                          _manualChapterTitle.clear();
                          _chapterOverview.clear();
                          _chapterHighlight.clear();
                          await _loadChaptersForSelectedBook();
                          setState(
                              () => _status = 'Manual chapter/highlight added');
                          if (context.mounted) {
                            _showActionSnackBar(
                                context, 'Chapter added successfully');
                          }
                        },
                  child: const Text('Add Chapter + Highlight'),
                ),
                if (_chapters.isNotEmpty) ...[
                  const SizedBox(height: 10),
                  Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      'Chapters in selected book (${_chapters.length}):',
                      style: const TextStyle(
                          fontWeight: FontWeight.w600, fontSize: 13),
                    ),
                  ),
                  const SizedBox(height: 6),
                  Wrap(
                    spacing: 6,
                    runSpacing: 6,
                    children: _chapters.map((ch) {
                      final chMap = ch as Map<String, dynamic>;
                      final chId = chMap['id'] as int;
                      final chTitle =
                          chMap['title']?.toString() ?? 'Chapter $chId';
                      final isSelected = chId == _selectedChapterId;
                      return ChoiceChip(
                        label: Text(chTitle),
                        selected: isSelected,
                        onSelected: (selected) {
                          if (selected) {
                            setState(() => _selectedChapterId = chId);
                          }
                        },
                      );
                    }).toList(),
                  ),
                ],
                const SizedBox(height: 8),
                DropdownButtonFormField<int>(
                  key: ValueKey(
                      'chapter_dropdown_${_selectedBookId}_${_selectedChapterId}_${_chapters.length}'),
                  initialValue: _chapters.any(
                          (c) => (c as Map<String, dynamic>)['id'] == _selectedChapterId)
                      ? _selectedChapterId
                      : null,
                  items: _chapters
                      .map(
                        (c) => DropdownMenuItem<int>(
                          value: (c as Map<String, dynamic>)['id'] as int,
                          child: Text(c['title']?.toString() ?? ''),
                        ),
                      )
                      .toList(),
                  onChanged: (v) => setState(() => _selectedChapterId = v),
                  decoration: InputDecoration(
                    labelText: 'Select chapter for PYQ',
                    helperText: _chapters.isEmpty
                        ? 'No chapters found for this book. Add a chapter above.'
                        : null,
                  ),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _pyqQuestion,
                  minLines: 2,
                  maxLines: 4,
                  decoration: const InputDecoration(labelText: 'PYQ question'),
                ),
                const SizedBox(height: 8),
                TextField(
                    controller: _pyqOptionA,
                    decoration: const InputDecoration(labelText: 'Option A')),
                const SizedBox(height: 8),
                TextField(
                    controller: _pyqOptionB,
                    decoration: const InputDecoration(labelText: 'Option B')),
                const SizedBox(height: 8),
                TextField(
                    controller: _pyqOptionC,
                    decoration: const InputDecoration(labelText: 'Option C')),
                const SizedBox(height: 8),
                TextField(
                    controller: _pyqOptionD,
                    decoration: const InputDecoration(labelText: 'Option D')),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  initialValue: _pyqCorrect,
                  items: const [
                    DropdownMenuItem(value: 'A', child: Text('Correct: A')),
                    DropdownMenuItem(value: 'B', child: Text('Correct: B')),
                    DropdownMenuItem(value: 'C', child: Text('Correct: C')),
                    DropdownMenuItem(value: 'D', child: Text('Correct: D')),
                  ],
                  onChanged: (v) => setState(() => _pyqCorrect = v ?? 'A'),
                  decoration:
                      const InputDecoration(labelText: 'Correct option'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _pyqExplanation,
                  minLines: 3,
                  maxLines: 8,
                  decoration: const InputDecoration(
                    labelText: 'Explanation (paragraph)',
                    alignLabelWithHint: true,
                  ),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _pyqExplanationVideoLink,
                  decoration: const InputDecoration(
                    labelText: 'Explanation Video Link (YouTube / Drive / MP4 URL)',
                    hintText: 'e.g. https://www.youtube.com/watch?... or Google Drive link',
                    prefixIcon: Icon(Icons.smart_display_outlined),
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        _pyqImage == null
                            ? (_pyqImageLink.isEmpty
                                ? 'No question image'
                                : 'Question image uploaded')
                            : _pyqImage!.path
                                .split(Platform.pathSeparator)
                                .last,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(fontSize: 12),
                      ),
                    ),
                    TextButton(
                      onPressed: () async {
                        final result = await FilePicker.platform
                            .pickFiles(type: FileType.image);
                        if (result?.files.single.path == null) return;
                        setState(
                            () => _pyqImage = File(result!.files.single.path!));
                      },
                      child: const Text('Question image'),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        _pyqExplanationImage == null
                            ? (_pyqExplanationImageLink.isEmpty
                                ? 'No explanation image'
                                : 'Explanation image uploaded')
                            : _pyqExplanationImage!.path
                                .split(Platform.pathSeparator)
                                .last,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(fontSize: 12),
                      ),
                    ),
                    TextButton(
                      onPressed: () async {
                        final result = await FilePicker.platform
                            .pickFiles(type: FileType.image);
                        if (result?.files.single.path == null) return;
                        setState(() => _pyqExplanationImage =
                            File(result!.files.single.path!));
                      },
                      child: const Text('Explanation image'),
                    ),
                    if (_pyqExplanationImage != null ||
                        _pyqExplanationImageLink.isNotEmpty)
                      TextButton(
                        onPressed: () => setState(() {
                          _pyqExplanationImage = null;
                          _pyqExplanationImageLink = '';
                        }),
                        child: const Text('Remove'),
                      ),
                  ],
                ),
                const SizedBox(height: 8),
                FilledButton.tonal(
                  onPressed: _selectedChapterId == null
                      ? null
                      : () async {
                          var imageLink = _pyqImageLink;
                          var expLink = _pyqExplanationImageLink;
                          final videoLink = _pyqExplanationVideoLink.text.trim();
                          if (_editingPyqId != null) {
                            if (_pyqImage != null && _batchId != null) {
                              if (!await _validateImageFile(context, _pyqImage!)) {
                                throw Exception('Question image too large');
                              }
                              imageLink = await widget.api.uploadQuestionImage(
                                batchId: _batchId!,
                                classLabel: _classLabel.text.trim(),
                                subject: _subject.text.trim(),
                                topic: _chapter.text.trim().isEmpty
                                    ? 'PYQ'
                                    : _chapter.text.trim(),
                                file: _pyqImage!,
                                contentType: 'pyq',
                                contentId: _selectedChapterId,
                              );
                            }
                            if (_pyqExplanationImage != null && _batchId != null) {
                              if (!await _validateImageFile(
                                  context, _pyqExplanationImage!)) {
                                throw Exception('Explanation image too large');
                              }
                              expLink = await widget.api.uploadQuestionImage(
                                batchId: _batchId!,
                                classLabel: _classLabel.text.trim(),
                                subject: _subject.text.trim(),
                                topic: _chapter.text.trim().isEmpty
                                    ? 'PYQ'
                                    : _chapter.text.trim(),
                                file: _pyqExplanationImage!,
                                contentType: 'pyq_explanation',
                                contentId: _selectedChapterId,
                              );
                            }
                            await widget.api.updatePyq(
                              id: _editingPyqId!,
                              question: _pyqQuestion.text.trim(),
                              optionA: _pyqOptionA.text.trim(),
                              optionB: _pyqOptionB.text.trim(),
                              optionC: _pyqOptionC.text.trim(),
                              optionD: _pyqOptionD.text.trim(),
                              correctOption: _pyqCorrect,
                              explanation: _pyqExplanation.text.trim(),
                              questionImageLink: imageLink,
                              explanationImageLink: expLink,
                              explanationVideoLink: videoLink,
                            );
                            setState(() => _editingPyqId = null);
                          } else {
                            if (_pyqImage != null &&
                                !await _validateImageFile(context, _pyqImage!)) {
                              throw Exception('Question image too large');
                            }
                            if (_pyqExplanationImage != null &&
                                !await _validateImageFile(
                                    context, _pyqExplanationImage!)) {
                              throw Exception('Explanation image too large');
                            }
                            if (_pyqImage != null || _pyqExplanationImage != null) {
                              await widget.api.addPyqWithMedia(
                                chapterId: _selectedChapterId!,
                                question: _pyqQuestion.text.trim(),
                                optionA: _pyqOptionA.text.trim(),
                                optionB: _pyqOptionB.text.trim(),
                                optionC: _pyqOptionC.text.trim(),
                                optionD: _pyqOptionD.text.trim(),
                                correctOption: _pyqCorrect,
                                explanation: _pyqExplanation.text.trim(),
                                questionImage: _pyqImage,
                                explanationImage: _pyqExplanationImage,
                                questionImageLink: imageLink,
                                explanationImageLink: expLink,
                                explanationVideoLink: videoLink,
                              );
                            } else {
                              await widget.api.addPyq(
                                chapterId: _selectedChapterId!,
                                question: _pyqQuestion.text.trim(),
                                optionA: _pyqOptionA.text.trim(),
                                optionB: _pyqOptionB.text.trim(),
                                optionC: _pyqOptionC.text.trim(),
                                optionD: _pyqOptionD.text.trim(),
                                correctOption: _pyqCorrect,
                                explanation: _pyqExplanation.text.trim(),
                                questionImageLink: imageLink,
                                explanationImageLink: expLink,
                                explanationVideoLink: videoLink,
                              );
                            }
                          }
                          setState(() {
                            _status = 'PYQ saved';
                            _pyqImage = null;
                            _pyqImageLink = imageLink;
                            _pyqExplanationImage = null;
                            _pyqExplanationImageLink = expLink;
                            _pyqExplanationVideoLink.clear();
                          });
                          if (context.mounted) {
                            _showActionSnackBar(
                                context, 'PYQ saved successfully');
                          }
                        },
                  child: Text(_editingPyqId == null ? 'Add PYQ' : 'Update PYQ'),
                ),
                const SizedBox(height: 8),
                FilledButton.tonal(
                  onPressed: _selectedChapterId == null
                      ? null
                      : () async {
                          final pyqs =
                              await widget.api.pyqs(_selectedChapterId!);
                          if (!context.mounted) return;
                          showModalBottomSheet(
                            context: context,
                            showDragHandle: true,
                            builder: (_) => SafeArea(
                              child: ListView(
                                padding: const EdgeInsets.all(16),
                                children: [
                                  Text('Manage PYQs',
                                      style: Theme.of(context)
                                          .textTheme
                                          .titleLarge),
                                  const SizedBox(height: 10),
                                  if (pyqs.isEmpty)
                                    const Text('No PYQs found')
                                  else
                                    ...pyqs.map(
                                      (q) => Card(
                                        margin:
                                            const EdgeInsets.only(bottom: 10),
                                        child: Padding(
                                          padding: const EdgeInsets.all(10),
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              Text(q['question']?.toString() ??
                                                  ''),
                                              const SizedBox(height: 4),
                                              Text(
                                                  'Correct: ${q['correct_option'] ?? '-'}'),
                                              if (hasQuestionImage(q)) ...[
                                                const SizedBox(height: 8),
                                                ClipRRect(
                                                  borderRadius:
                                                      BorderRadius.circular(8),
                                                  child: FastNetworkImage(
                                                    url: questionImageRawUrl(q),
                                                    height: 120,
                                                    width: double.infinity,
                                                    fit: BoxFit.cover,
                                                    thumbWidth: 600,
                                                  ),
                                                ),
                                              ],
                                              const SizedBox(height: 8),
                                              Wrap(
                                                spacing: 6,
                                                runSpacing: 6,
                                                children: [
                                                  OutlinedButton.icon(
                                                    onPressed: () {
                                                      setState(() {
                                                        _editingPyqId =
                                                            q['id'] as int;
                                                        _pyqQuestion.text = q[
                                                                    'question']
                                                                ?.toString() ??
                                                            '';
                                                        _pyqOptionA.text = q[
                                                                    'option_a']
                                                                ?.toString() ??
                                                            '';
                                                        _pyqOptionB.text = q[
                                                                    'option_b']
                                                                ?.toString() ??
                                                            '';
                                                        _pyqOptionC.text = q[
                                                                    'option_c']
                                                                ?.toString() ??
                                                            '';
                                                        _pyqOptionD.text = q[
                                                                    'option_d']
                                                                ?.toString() ??
                                                            '';
                                                        _pyqCorrect =
                                                            q['correct_option']
                                                                    ?.toString() ??
                                                                'A';
                                                        _pyqExplanation
                                                            .text = q[
                                                                    'explanation']
                                                                ?.toString() ??
                                                            '';
                                                        _pyqExplanationVideoLink.text =
                                                            q['explanation_video_link']?.toString() ??
                                                                q['explanation_video_url']?.toString() ??
                                                                '';
                                                        _pyqImageLink =
                                                            q['question_image_link']
                                                                    ?.toString() ??
                                                                '';
                                                        _pyqImage = null;
                                                      });
                                                      Navigator.of(context)
                                                          .pop();
                                                    },
                                                    icon: const Icon(
                                                        Icons.edit_outlined),
                                                    label: const Text('Edit'),
                                                  ),
                                                  OutlinedButton.icon(
                                                    onPressed: () async {
                                                      if (_batchId == null) {
                                                        return;
                                                      }
                                                      final picked =
                                                          await FilePicker
                                                              .platform
                                                              .pickFiles(
                                                        type: FileType.image,
                                                      );
                                                      if (picked?.files.single
                                                              .path ==
                                                          null) {
                                                        return;
                                                      }
                                                      final link = await widget
                                                          .api
                                                          .uploadQuestionImage(
                                                        batchId: _batchId!,
                                                        classLabel: _classLabel
                                                            .text
                                                            .trim(),
                                                        subject: _subject.text
                                                            .trim(),
                                                        topic: _chapter.text
                                                                .trim()
                                                                .isEmpty
                                                            ? 'PYQ'
                                                            : _chapter.text
                                                                .trim(),
                                                        file: File(picked!.files
                                                            .single.path!),
                                                      );
                                                      await widget.api
                                                          .updatePyq(
                                                        id: q['id'] as int,
                                                        question: q['question']
                                                                ?.toString() ??
                                                            '',
                                                        optionA: q['option_a']
                                                                ?.toString() ??
                                                            '',
                                                        optionB: q['option_b']
                                                                ?.toString() ??
                                                            '',
                                                        optionC: q['option_c']
                                                                ?.toString() ??
                                                            '',
                                                        optionD: q['option_d']
                                                                ?.toString() ??
                                                            '',
                                                        correctOption:
                                                            q['correct_option']
                                                                    ?.toString() ??
                                                                'A',
                                                        explanation: q[
                                                                    'explanation']
                                                                ?.toString() ??
                                                            '',
                                                        questionImageLink: link,
                                                      );
                                                      if (context.mounted) {
                                                        Navigator.of(context)
                                                            .pop();
                                                      }
                                                    },
                                                    icon: const Icon(
                                                        Icons.image_outlined),
                                                    label: const Text(
                                                        'Replace image'),
                                                  ),
                                                  OutlinedButton.icon(
                                                    onPressed: () async {
                                                      await widget.api
                                                          .updatePyq(
                                                        id: q['id'] as int,
                                                        question: q['question']
                                                                ?.toString() ??
                                                            '',
                                                        optionA: q['option_a']
                                                                ?.toString() ??
                                                            '',
                                                        optionB: q['option_b']
                                                                ?.toString() ??
                                                            '',
                                                        optionC: q['option_c']
                                                                ?.toString() ??
                                                            '',
                                                        optionD: q['option_d']
                                                                ?.toString() ??
                                                            '',
                                                        correctOption:
                                                            q['correct_option']
                                                                    ?.toString() ??
                                                                'A',
                                                        explanation: q[
                                                                    'explanation']
                                                                ?.toString() ??
                                                            '',
                                                        questionImageLink: '',
                                                      );
                                                      if (context.mounted) {
                                                        Navigator.of(context)
                                                            .pop();
                                                      }
                                                    },
                                                    icon: const Icon(Icons
                                                        .image_not_supported_outlined),
                                                    label: const Text(
                                                        'Remove image'),
                                                  ),
                                                  OutlinedButton.icon(
                                                    onPressed: () async {
                                                      await widget.api
                                                          .deletePyq(
                                                              q['id'] as int);
                                                      if (context.mounted) {
                                                        Navigator.of(context)
                                                            .pop();
                                                      }
                                                    },
                                                    icon: const Icon(
                                                        Icons.delete_outline),
                                                    label: const Text('Delete'),
                                                  ),
                                                ],
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                ],
                              ),
                            ),
                          );
                        },
                  child: const Text('Manage PYQs (Edit/Delete)'),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 12),
        if (_books.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Row(children: [
              const Icon(Icons.menu_book_rounded,
                  size: 16, color: Color(0xFFE85A1C)),
              const SizedBox(width: 6),
              Text('Books (${_books.length})',
                  style: const TextStyle(
                      fontWeight: FontWeight.w700, fontSize: 15)),
            ]),
          ),
        ..._books.map((book) {
          final b = book as Map<String, dynamic>;
          final category = b['category']?.toString() ?? '';
          return Container(
            margin: const EdgeInsets.only(bottom: 10),
            decoration: BoxDecoration(
              color: Theme.of(context).cardTheme.color,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                  color: Theme.of(context).colorScheme.outlineVariant),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(14, 12, 8, 0),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color:
                              const Color(0xFF7B1FA2).withValues(alpha: 0.12),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Icon(Icons.upload_file_rounded,
                            color: Color(0xFF7B1FA2), size: 18),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(b['title']?.toString() ?? '',
                                style: const TextStyle(
                                    fontWeight: FontWeight.w700, fontSize: 14)),
                            const SizedBox(height: 2),
                            Text(
                              '${b['subject'] ?? ''} • ${b['topic'] ?? ''}',
                              style: const TextStyle(
                                  fontSize: 12, color: Color(0xFF757575)),
                            ),
                          ],
                        ),
                      ),
                      IconButton(
                          icon: const Icon(Icons.edit_outlined, size: 20),
                          onPressed: () {
                            setState(() {
                              _editingId = b['id'] as int;
                              _bookTitle.text = b['title']?.toString() ?? '';
                              _classLabel.text =
                                  b['class_label']?.toString() ?? '';
                              _subject.text = b['subject']?.toString() ?? '';
                              _chapter.text = b['topic']?.toString() ?? '';
                            });
                          }),
                      IconButton(
                        icon: const Icon(Icons.delete_outline,
                            size: 20, color: Color(0xFFD92D20)),
                        onPressed: () async {
                          final ok = await _confirmDeleteDialog(context,
                              title: 'Delete Book?',
                              body: 'This will permanently remove this book.');
                          if (!ok) return;
                          try {
                            await widget.api.deleteBook(b['id'] as int);
                            await _loadBatches();
                            if (context.mounted) {
                              _showActionSnackBar(
                                  context, 'Book deleted successfully');
                            }
                          } catch (e) {
                            if (context.mounted) {
                              _showActionSnackBar(context, 'Book delete failed',
                                  isError: true);
                            }
                          }
                        },
                      ),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(14, 8, 14, 12),
                  child: Wrap(spacing: 6, runSpacing: 4, children: [
                    _ChipBadge(
                        label: b['batch_name']?.toString() ?? '',
                        color: const Color(0xFF1976D2)),
                    _ChipBadge(
                        label: b['class_label']?.toString() ?? '',
                        color: const Color(0xFF7B1FA2)),
                    if (category.isNotEmpty)
                      _ChipBadge(
                          label: category, color: const Color(0xFF2E7D32)),
                  ]),
                ),
              ],
            ),
          );
        }),
        if (_status != null) Text(_status!),
      ],
    );
  }
}

class PracticePage extends StatefulWidget {
  const PracticePage({super.key, required this.api});
  final AdminApi api;
  @override
  State<PracticePage> createState() => _PracticePageState();
}

class _PracticePageState extends State<PracticePage> {
  final _scroll = ScrollController();
  final _title = TextEditingController();
  final _classLabel = TextEditingController(text: 'Class 11');
  final _subject = TextEditingController(text: 'Biology');
  final _topic = TextEditingController();
  int? _batchId;
  int? _editingId;
  int? _selectedSetId;
  int? _editingPracticeQuestionId;
  final _pqQuestion = TextEditingController();
  final _pqOptionA = TextEditingController();
  final _pqOptionB = TextEditingController();
  final _pqOptionC = TextEditingController();
  final _pqOptionD = TextEditingController();
  final _pqExplanation = TextEditingController();
  final _pqExplanationVideoLink = TextEditingController();
  String _pqCorrect = 'A';
  File? _pqImage;
  String _pqImageLink = '';
  File? _pqExplanationImage;
  String _pqExplanationImageLink = '';
  File? _pqOptionAImage;
  String _pqOptionAImageLink = '';
  File? _pqOptionBImage;
  String _pqOptionBImageLink = '';
  File? _pqOptionCImage;
  String _pqOptionCImageLink = '';
  File? _pqOptionDImage;
  String _pqOptionDImageLink = '';
  // Similar Question for Practice MCQ
  final _pqSimilarQuestion = TextEditingController();
  final _pqSimilarOptionA = TextEditingController();
  final _pqSimilarOptionB = TextEditingController();
  final _pqSimilarOptionC = TextEditingController();
  final _pqSimilarOptionD = TextEditingController();
  final _pqSimilarExplanation = TextEditingController();
  String _pqSimilarCorrect = 'A';
  bool _pqShowSimilarQuestion = false;
  File? _pqSimilarQuestionImage;
  String _pqSimilarQuestionImageLink = '';
  File? _pqSimilarExplanationImage;
  String _pqSimilarExplanationImageLink = '';
  final List<File> _pqSimilarPendingExtraExplanationImages = [];
  final List<String> _pqSimilarExistingExplanationImages = [];

  List<dynamic> _batches = const [];
  List<dynamic> _items = const [];
  bool _savingPracticeQuestion = false;

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    _scroll.dispose();
    _title.dispose();
    _classLabel.dispose();
    _subject.dispose();
    _topic.dispose();
    _pqQuestion.dispose();
    _pqOptionA.dispose();
    _pqOptionB.dispose();
    _pqOptionC.dispose();
    _pqOptionD.dispose();
    _pqExplanation.dispose();
    _pqExplanationVideoLink.dispose();
    _pqSimilarQuestion.dispose();
    _pqSimilarOptionA.dispose();
    _pqSimilarOptionB.dispose();
    _pqSimilarOptionC.dispose();
    _pqSimilarOptionD.dispose();
    _pqSimilarExplanation.dispose();
    super.dispose();
  }

  void _resetPracticeForm() {
    _title.clear();
    _classLabel.text = 'Class 11';
    _subject.text = 'Biology';
    _topic.clear();
    setState(() {
      _editingId = null;
    });
  }

  void _resetPracticeQuestionForm() {
    _pqQuestion.clear();
    _pqOptionA.clear();
    _pqOptionB.clear();
    _pqOptionC.clear();
    _pqOptionD.clear();
    _pqExplanation.clear();
    _pqExplanationVideoLink.clear();
    _pqSimilarQuestion.clear();
    _pqSimilarOptionA.clear();
    _pqSimilarOptionB.clear();
    _pqSimilarOptionC.clear();
    _pqSimilarOptionD.clear();
    _pqSimilarExplanation.clear();
    setState(() {
      _editingPracticeQuestionId = null;
      _pqImage = null;
      _pqImageLink = '';
      _pqExplanationImage = null;
      _pqExplanationImageLink = '';
      _pqOptionAImage = null;
      _pqOptionAImageLink = '';
      _pqOptionBImage = null;
      _pqOptionBImageLink = '';
      _pqOptionCImage = null;
      _pqOptionCImageLink = '';
      _pqOptionDImage = null;
      _pqOptionDImageLink = '';
      _pqCorrect = 'A';
      _pqSimilarCorrect = 'A';
      _pqShowSimilarQuestion = false;
      _pqSimilarQuestionImage = null;
      _pqSimilarQuestionImageLink = '';
      _pqSimilarExplanationImage = null;
      _pqSimilarExplanationImageLink = '';
      _pqSimilarPendingExtraExplanationImages.clear();
      _pqSimilarExistingExplanationImages.clear();
    });
  }

  Future<void> _load() async {
    try {
      final b = await widget.api.batches();
      final p = await widget.api.practiceSets();
      if (!mounted) return;
      setState(() {
        _batches = b['batches'] as List<dynamic>;
        _items = p['practiceSets'] as List<dynamic>;
        _batchId ??=
            _batches.isNotEmpty ? _asInt((_batches.first as Map)['id']) : null;
        if (_selectedSetId == null ||
            !_items.any((x) => _asInt((x as Map)['id']) == _selectedSetId)) {
          _selectedSetId =
              _items.isNotEmpty ? _asInt((_items.first as Map)['id']) : null;
        }
      });
    } catch (e, st) {
      await _handleTaskError(context, 'Load practice sets', e, stackTrace: st);
    }
  }

  Future<void> _showEditPracticeDialog(Map<String, dynamic> item) async {
    final setId = _asInt(item['id'], label: 'setId');
    final titleCtrl = TextEditingController(text: item['title']?.toString() ?? '');
    final classCtrl = TextEditingController(text: item['class_label']?.toString() ?? 'Class 11');
    final subjectCtrl = TextEditingController(text: item['subject']?.toString() ?? 'Biology');
    final topicCtrl = TextEditingController(text: item['topic']?.toString() ?? '');
    int? editBatchId = _asInt(item['batch_id'] ?? _batchId);
    bool saving = false;

    await showDialog<void>(
      context: context,
      builder: (dialogCtx) => StatefulBuilder(
        builder: (ctx, setDialogState) => AlertDialog(
          title: const Row(
            children: [
              Icon(Icons.edit_outlined, color: Color(0xFFE85A1C)),
              SizedBox(width: 8),
              Expanded(child: Text('Edit Practice Set')),
            ],
          ),
          content: SizedBox(
            width: 480,
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  DropdownButtonFormField<int>(
                    value: _batches.any((b) => _asInt(b['id']) == editBatchId) ? editBatchId : null,
                    items: _batches
                        .map((e) => DropdownMenuItem(
                              value: _asInt((e as Map<String, dynamic>)['id']),
                              child: Text(e['name'].toString()),
                            ))
                        .toList(),
                    onChanged: (v) => setDialogState(() => editBatchId = v),
                    decoration: const InputDecoration(labelText: 'Batch'),
                  ),
                  const SizedBox(height: 10),
                  TextField(
                    controller: titleCtrl,
                    decoration: const InputDecoration(labelText: 'Practice Title'),
                  ),
                  const SizedBox(height: 10),
                  TextField(
                    controller: classCtrl,
                    decoration: const InputDecoration(labelText: 'Class'),
                  ),
                  const SizedBox(height: 10),
                  TextField(
                    controller: subjectCtrl,
                    decoration: const InputDecoration(labelText: 'Subject'),
                  ),
                  const SizedBox(height: 10),
                  TextField(
                    controller: topicCtrl,
                    decoration: const InputDecoration(labelText: 'Topic'),
                  ),
                ],
              ),
            ),
          ),
          actions: [
            TextButton(
              onPressed: saving ? null : () => Navigator.of(dialogCtx).pop(),
              child: const Text('Cancel'),
            ),
            FilledButton(
              onPressed: saving
                  ? null
                  : () async {
                      if (titleCtrl.text.trim().isEmpty) {
                        _showActionSnackBar(dialogCtx, 'Title cannot be empty', isError: true);
                        return;
                      }
                      setDialogState(() => saving = true);
                      try {
                        await widget.api.updatePractice(
                          id: setId,
                          batchId: editBatchId,
                          classLabel: classCtrl.text.trim(),
                          title: titleCtrl.text.trim(),
                          subject: subjectCtrl.text.trim(),
                          topic: topicCtrl.text.trim(),
                        );
                        if (dialogCtx.mounted) {
                          Navigator.of(dialogCtx).pop();
                        }
                        await _load();
                        if (mounted) {
                          _showActionSnackBar(context, 'Practice set updated successfully');
                        }
                      } catch (e) {
                        setDialogState(() => saving = false);
                        if (dialogCtx.mounted) {
                          _showActionSnackBar(dialogCtx, 'Update failed: ${_friendlyError(e)}', isError: true);
                        }
                      }
                    },
              child: _busyButtonChild(saving, 'Update Practice'),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _showManagePracticeSetsDialog() async {
    if (_items.isEmpty) return;
    await showDialog<void>(
      context: context,
      builder: (dialogCtx) => StatefulBuilder(
        builder: (ctx, setDialogState) {
          return AlertDialog(
            title: Row(
              children: [
                const Icon(Icons.flash_on_rounded, color: Color(0xFFE85A1C)),
                const SizedBox(width: 8),
                Text('Manage Practice Sets (${_items.length})'),
              ],
            ),
            content: SizedBox(
              width: 600,
              child: ListView.separated(
                shrinkWrap: true,
                itemCount: _items.length,
                separatorBuilder: (_, __) => const Divider(height: 1),
                itemBuilder: (context, index) {
                  final item = _items[index] as Map<String, dynamic>;
                  final setId = _asInt(item['id'], label: 'setId');
                  final title = item['title']?.toString() ?? 'Practice Set #$setId';
                  final subj = item['subject']?.toString() ?? '';
                  final topic = item['topic']?.toString() ?? '';
                  return ListTile(
                    contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    leading: Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: const Color(0xFFE85A1C).withValues(alpha: 0.12),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Icon(Icons.flash_on_rounded, color: Color(0xFFE85A1C), size: 20),
                    ),
                    title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    subtitle: Text([if (subj.isNotEmpty) subj, if (topic.isNotEmpty) topic].join(' • '), style: const TextStyle(fontSize: 12)),
                    trailing: Wrap(
                      spacing: 4,
                      children: [
                        IconButton(
                          tooltip: 'Manage Questions',
                          icon: const Icon(Icons.list_alt_outlined, size: 20),
                          onPressed: () {
                            Navigator.of(dialogCtx).pop();
                            _openQuestionsForSet(setId);
                          },
                        ),
                        IconButton(
                          tooltip: 'Edit Practice Set',
                          icon: const Icon(Icons.edit_outlined, size: 20),
                          onPressed: () {
                            Navigator.of(dialogCtx).pop();
                            _showEditPracticeDialog(item);
                          },
                        ),
                        IconButton(
                          tooltip: 'Delete Practice Set',
                          icon: const Icon(Icons.delete_outline, size: 20, color: Color(0xFFD92D20)),
                          onPressed: () async {
                            final ok = await _confirmDeleteDialog(
                              context,
                              title: 'Delete Practice?',
                              body: 'This practice set will be removed permanently.',
                            );
                            if (!ok) return;
                            try {
                              await widget.api.deletePractice(setId);
                              await _load();
                              if (mounted) {
                                setDialogState(() {});
                                _showActionSnackBar(context, 'Practice deleted successfully');
                              }
                            } catch (e, st) {
                              if (mounted) {
                                await _handleTaskError(context, 'Delete practice', e, stackTrace: st);
                              }
                            }
                          },
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(dialogCtx).pop(),
                child: const Text('Close'),
              ),
            ],
          );
        },
      ),
    );
  }

  Future<void> _showPracticeQuestionDialog(
    BuildContext hostContext, {
    required int setId,
    Map<String, dynamic>? initialQuestion,
    VoidCallback? onSaved,
  }) async {
    final isEdit = initialQuestion != null;
    final questionId = isEdit ? _asInt(initialQuestion['id'], label: 'questionId') : null;

    final qQuestion = TextEditingController(text: initialQuestion?['question']?.toString() ?? '');
    final qOptionA = TextEditingController(text: initialQuestion?['option_a']?.toString() ?? '');
    final qOptionB = TextEditingController(text: initialQuestion?['option_b']?.toString() ?? '');
    final qOptionC = TextEditingController(text: initialQuestion?['option_c']?.toString() ?? '');
    final qOptionD = TextEditingController(text: initialQuestion?['option_d']?.toString() ?? '');
    final qExplanation = TextEditingController(text: initialQuestion?['explanation']?.toString() ?? '');
    final qExplanationVideoLink = TextEditingController(
      text: initialQuestion?['explanation_video_link']?.toString() ??
          initialQuestion?['explanation_video_url']?.toString() ??
          '',
    );
    String qCorrect = initialQuestion?['correct_option']?.toString() ?? 'A';
    if (!const ['A', 'B', 'C', 'D'].contains(qCorrect)) qCorrect = 'A';

    File? qImage;
    String qImageLink = initialQuestion?['question_image_link']?.toString() ?? '';
    File? qExplanationImage;
    String qExplanationImageLink = initialQuestion?['explanation_image_link']?.toString() ?? '';
    File? qOptionAImage;
    String qOptionAImageLink = initialQuestion?['option_a_image_link']?.toString() ?? '';
    File? qOptionBImage;
    String qOptionBImageLink = initialQuestion?['option_b_image_link']?.toString() ?? '';
    File? qOptionCImage;
    String qOptionCImageLink = initialQuestion?['option_c_image_link']?.toString() ?? '';
    File? qOptionDImage;
    String qOptionDImageLink = initialQuestion?['option_d_image_link']?.toString() ?? '';

    // Similar Question
    final qSimilarQuestion = TextEditingController();
    final qSimilarOptionA = TextEditingController();
    final qSimilarOptionB = TextEditingController();
    final qSimilarOptionC = TextEditingController();
    final qSimilarOptionD = TextEditingController();
    final qSimilarExplanation = TextEditingController();
    String qSimilarCorrect = 'A';
    bool qShowSimilarQuestion = false;
    File? qSimilarQuestionImage;
    String qSimilarQuestionImageLink = '';
    File? qSimilarExplanationImage;
    String qSimilarExplanationImageLink = '';
    final List<File> qSimilarPendingExtraExplanationImages = [];
    final List<String> qSimilarExistingExplanationImages = [];

    final sq = initialQuestion?['similar_question'];
    Map<String, dynamic>? sqMap;
    if (sq is Map) {
      sqMap = Map<String, dynamic>.from(sq);
    } else if (sq is String && sq.trim().isNotEmpty) {
      try {
        final dec = jsonDecode(sq);
        if (dec is Map) sqMap = Map<String, dynamic>.from(dec);
      } catch (_) {}
    }
    if (sqMap != null && (sqMap['question']?.toString().trim().isNotEmpty ?? false)) {
      qSimilarQuestion.text = sqMap['question']?.toString() ?? '';
      qSimilarOptionA.text = sqMap['option_a']?.toString() ?? sqMap['optionA']?.toString() ?? '';
      qSimilarOptionB.text = sqMap['option_b']?.toString() ?? sqMap['optionB']?.toString() ?? '';
      qSimilarOptionC.text = sqMap['option_c']?.toString() ?? sqMap['optionC']?.toString() ?? '';
      qSimilarOptionD.text = sqMap['option_d']?.toString() ?? sqMap['optionD']?.toString() ?? '';
      qSimilarCorrect = sqMap['correct_option']?.toString() ?? sqMap['correctOption']?.toString() ?? 'A';
      if (!const ['A', 'B', 'C', 'D'].contains(qSimilarCorrect)) qSimilarCorrect = 'A';
      qSimilarExplanation.text = sqMap['explanation']?.toString() ?? '';
      qSimilarQuestionImageLink = sqMap['question_image_link']?.toString() ?? sqMap['image_url']?.toString() ?? '';
      qSimilarExplanationImageLink = sqMap['explanation_image_link']?.toString() ?? '';
      final rawExtra = sqMap['explanation_images'] ?? sqMap['explanation_images_list'];
      if (rawExtra is List) {
        for (final item in rawExtra) {
          final s = (item is String ? item : (item is Map ? (item['image_url'] ?? item['imageLink'] ?? '') : '')).toString().trim();
          if (s.isNotEmpty) qSimilarExistingExplanationImages.add(s);
        }
      }
      qShowSimilarQuestion = true;
    }

    bool saving = false;

    await showDialog<void>(
      context: hostContext,
      barrierDismissible: false,
      builder: (dialogCtx) => StatefulBuilder(
        builder: (ctx, setDialogState) => AlertDialog(
          title: Row(
            children: [
              Icon(isEdit ? Icons.edit_note_rounded : Icons.add_circle_outline, color: const Color(0xFFE85A1C)),
              const SizedBox(width: 8),
              Expanded(
                child: Text(isEdit ? 'Edit Practice Question' : 'Add Practice Question'),
              ),
            ],
          ),
          content: SizedBox(
            width: 560,
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  TextField(
                    controller: qQuestion,
                    minLines: 2,
                    maxLines: 4,
                    decoration: const InputDecoration(
                      labelText: 'Question *',
                      hintText: 'Enter question text',
                    ),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: qOptionA,
                    decoration: const InputDecoration(labelText: 'Option A *'),
                  ),
                  _buildOptionImagePickerRow(
                    label: 'Option A',
                    file: qOptionAImage,
                    imageLink: qOptionAImageLink,
                    onPick: (file) => setDialogState(() => qOptionAImage = file),
                    onRemove: () => setDialogState(() {
                      qOptionAImage = null;
                      qOptionAImageLink = '';
                    }),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: qOptionB,
                    decoration: const InputDecoration(labelText: 'Option B *'),
                  ),
                  _buildOptionImagePickerRow(
                    label: 'Option B',
                    file: qOptionBImage,
                    imageLink: qOptionBImageLink,
                    onPick: (file) => setDialogState(() => qOptionBImage = file),
                    onRemove: () => setDialogState(() {
                      qOptionBImage = null;
                      qOptionBImageLink = '';
                    }),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: qOptionC,
                    decoration: const InputDecoration(labelText: 'Option C *'),
                  ),
                  _buildOptionImagePickerRow(
                    label: 'Option C',
                    file: qOptionCImage,
                    imageLink: qOptionCImageLink,
                    onPick: (file) => setDialogState(() => qOptionCImage = file),
                    onRemove: () => setDialogState(() {
                      qOptionCImage = null;
                      qOptionCImageLink = '';
                    }),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: qOptionD,
                    decoration: const InputDecoration(labelText: 'Option D *'),
                  ),
                  _buildOptionImagePickerRow(
                    label: 'Option D',
                    file: qOptionDImage,
                    imageLink: qOptionDImageLink,
                    onPick: (file) => setDialogState(() => qOptionDImage = file),
                    onRemove: () => setDialogState(() {
                      qOptionDImage = null;
                      qOptionDImageLink = '';
                    }),
                  ),
                  const SizedBox(height: 8),
                  DropdownButtonFormField<String>(
                    value: qCorrect,
                    items: const [
                      DropdownMenuItem(value: 'A', child: Text('Correct Option: A')),
                      DropdownMenuItem(value: 'B', child: Text('Correct Option: B')),
                      DropdownMenuItem(value: 'C', child: Text('Correct Option: C')),
                      DropdownMenuItem(value: 'D', child: Text('Correct Option: D')),
                    ],
                    onChanged: (v) => setDialogState(() => qCorrect = v ?? 'A'),
                    decoration: const InputDecoration(labelText: 'Correct Option *'),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: qExplanation,
                    minLines: 2,
                    maxLines: 6,
                    decoration: const InputDecoration(
                      labelText: 'Explanation (optional)',
                      alignLabelWithHint: true,
                    ),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: qExplanationVideoLink,
                    decoration: const InputDecoration(
                      labelText: 'Explanation Video Link (YouTube / Drive / MP4 URL)',
                      hintText: 'e.g. https://www.youtube.com/watch?... or Google Drive link',
                      prefixIcon: Icon(Icons.smart_display_outlined),
                    ),
                  ),
                  const SizedBox(height: 8),
                  // Question image
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          qImage == null
                              ? (qImageLink.isEmpty ? 'No question image' : 'Question image uploaded')
                              : qImage!.path.split(Platform.pathSeparator).last,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(fontSize: 12),
                        ),
                      ),
                      TextButton(
                        onPressed: () async {
                          final result = await FilePicker.platform.pickFiles(type: FileType.image);
                          if (result?.files.single.path == null) return;
                          setDialogState(() => qImage = File(result!.files.single.path!));
                        },
                        child: const Text('Pick Image'),
                      ),
                      if (qImage != null || qImageLink.isNotEmpty)
                        TextButton(
                          onPressed: () => setDialogState(() {
                            qImage = null;
                            qImageLink = '';
                          }),
                          child: const Text('Remove', style: TextStyle(color: Colors.red)),
                        ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  // Explanation image
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          qExplanationImage == null
                              ? (qExplanationImageLink.isEmpty ? 'No explanation image' : 'Explanation image uploaded')
                              : qExplanationImage!.path.split(Platform.pathSeparator).last,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(fontSize: 12),
                        ),
                      ),
                      TextButton(
                        onPressed: () async {
                          final result = await FilePicker.platform.pickFiles(type: FileType.image);
                          if (result?.files.single.path == null) return;
                          setDialogState(() => qExplanationImage = File(result!.files.single.path!));
                        },
                        child: const Text('Pick Image'),
                      ),
                      if (qExplanationImage != null || qExplanationImageLink.isNotEmpty)
                        TextButton(
                          onPressed: () => setDialogState(() {
                            qExplanationImage = null;
                            qExplanationImageLink = '';
                          }),
                          child: const Text('Remove', style: TextStyle(color: Colors.red)),
                        ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  // Similar Question Section
                  Container(
                    decoration: BoxDecoration(
                      color: Theme.of(ctx).cardColor,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(
                        color: qSimilarQuestion.text.trim().isNotEmpty
                            ? Colors.indigo.shade400
                            : Theme.of(ctx).colorScheme.outlineVariant,
                      ),
                    ),
                    child: ExpansionTile(
                      initiallyExpanded: qShowSimilarQuestion,
                      onExpansionChanged: (v) => setDialogState(() => qShowSimilarQuestion = v),
                      leading: const Icon(Icons.help_center_outlined, color: Color(0xFF4F46E5)),
                      title: Row(
                        children: [
                          const Text('Solve Similar Question', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                          const SizedBox(width: 8),
                          if (qSimilarQuestion.text.trim().isNotEmpty)
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                              decoration: BoxDecoration(
                                color: Colors.green.withValues(alpha: 0.15),
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: const Text('Added', style: TextStyle(color: Colors.green, fontSize: 10, fontWeight: FontWeight.bold)),
                            )
                          else
                            Text('(Optional)', style: TextStyle(fontSize: 11, color: Colors.grey.shade600)),
                        ],
                      ),
                      children: [
                        Padding(
                          padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                          child: Column(
                            children: [
                              TextField(
                                controller: qSimilarQuestion,
                                minLines: 2,
                                maxLines: 4,
                                decoration: const InputDecoration(
                                  labelText: 'Similar Question text',
                                  hintText: 'Enter parallel question on this concept',
                                ),
                              ),
                              const SizedBox(height: 8),
                              TextField(controller: qSimilarOptionA, decoration: const InputDecoration(labelText: 'Similar Option A')),
                              const SizedBox(height: 8),
                              TextField(controller: qSimilarOptionB, decoration: const InputDecoration(labelText: 'Similar Option B')),
                              const SizedBox(height: 8),
                              TextField(controller: qSimilarOptionC, decoration: const InputDecoration(labelText: 'Similar Option C')),
                              const SizedBox(height: 8),
                              TextField(controller: qSimilarOptionD, decoration: const InputDecoration(labelText: 'Similar Option D')),
                              const SizedBox(height: 8),
                              DropdownButtonFormField<String>(
                                value: qSimilarCorrect,
                                items: const [
                                  DropdownMenuItem(value: 'A', child: Text('Correct: A')),
                                  DropdownMenuItem(value: 'B', child: Text('Correct: B')),
                                  DropdownMenuItem(value: 'C', child: Text('Correct: C')),
                                  DropdownMenuItem(value: 'D', child: Text('Correct: D')),
                                ],
                                onChanged: (v) => setDialogState(() => qSimilarCorrect = v ?? 'A'),
                                decoration: const InputDecoration(labelText: 'Correct Option for Similar Question'),
                              ),
                              const SizedBox(height: 8),
                              TextField(
                                controller: qSimilarExplanation,
                                minLines: 2,
                                maxLines: 4,
                                decoration: const InputDecoration(labelText: 'Explanation for Similar Question'),
                              ),
                              const SizedBox(height: 10),
                              // Similar Question Image
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      qSimilarQuestionImage == null
                                          ? (qSimilarQuestionImageLink.isEmpty
                                              ? 'No similar question image'
                                              : 'Similar question image uploaded')
                                          : qSimilarQuestionImage!.path.split(Platform.pathSeparator).last,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(fontSize: 12),
                                    ),
                                  ),
                                  TextButton(
                                    onPressed: () async {
                                      final result = await FilePicker.platform.pickFiles(type: FileType.image);
                                      if (result?.files.single.path == null) return;
                                      setDialogState(() => qSimilarQuestionImage = File(result!.files.single.path!));
                                    },
                                    child: const Text('Pick Image'),
                                  ),
                                  if (qSimilarQuestionImage != null || qSimilarQuestionImageLink.isNotEmpty)
                                    TextButton(
                                      onPressed: () => setDialogState(() {
                                        qSimilarQuestionImage = null;
                                        qSimilarQuestionImageLink = '';
                                      }),
                                      child: const Text('Remove', style: TextStyle(color: Colors.red)),
                                    ),
                                ],
                              ),
                              const SizedBox(height: 6),
                              // Similar Question Explanation Image
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      qSimilarExplanationImage == null
                                          ? (qSimilarExplanationImageLink.isEmpty
                                              ? 'No similar explanation image'
                                              : 'Similar explanation image uploaded')
                                          : qSimilarExplanationImage!.path.split(Platform.pathSeparator).last,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(fontSize: 12),
                                    ),
                                  ),
                                  TextButton(
                                    onPressed: () async {
                                      final result = await FilePicker.platform.pickFiles(type: FileType.image);
                                      if (result?.files.single.path == null) return;
                                      setDialogState(() => qSimilarExplanationImage = File(result!.files.single.path!));
                                    },
                                    child: const Text('Pick Image'),
                                  ),
                                  if (qSimilarExplanationImage != null || qSimilarExplanationImageLink.isNotEmpty)
                                    TextButton(
                                      onPressed: () => setDialogState(() {
                                        qSimilarExplanationImage = null;
                                        qSimilarExplanationImageLink = '';
                                      }),
                                      child: const Text('Remove', style: TextStyle(color: Colors.red)),
                                    ),
                                ],
                              ),
                              const SizedBox(height: 8),
                              // Multiple Explanation Images for Similar Question
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      qSimilarPendingExtraExplanationImages.isEmpty && qSimilarExistingExplanationImages.isEmpty
                                          ? 'No extra explanation images'
                                          : '${qSimilarExistingExplanationImages.length} saved, ${qSimilarPendingExtraExplanationImages.length} ready to upload',
                                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
                                    ),
                                  ),
                                  TextButton.icon(
                                    icon: const Icon(Icons.add_photo_alternate_outlined, size: 16),
                                    label: const Text('Add Images'),
                                    onPressed: () async {
                                      final result = await FilePicker.platform.pickFiles(
                                        type: FileType.image,
                                        allowMultiple: true,
                                      );
                                      if (result == null) return;
                                      setDialogState(() {
                                        for (final f in result.files) {
                                          if (f.path != null) {
                                            qSimilarPendingExtraExplanationImages.add(File(f.path!));
                                          }
                                        }
                                      });
                                    },
                                  ),
                                ],
                              ),
                              if (qSimilarExistingExplanationImages.isNotEmpty) ...[
                                ...qSimilarExistingExplanationImages.asMap().entries.map((entry) {
                                  final idx = entry.key;
                                  return ListTile(
                                    dense: true,
                                    contentPadding: EdgeInsets.zero,
                                    leading: const Icon(Icons.image_outlined, size: 18),
                                    title: Text('Saved Explanation Image #${idx + 1}', style: const TextStyle(fontSize: 12)),
                                    trailing: IconButton(
                                      icon: const Icon(Icons.delete_outline_rounded, size: 18, color: Colors.red),
                                      onPressed: () => setDialogState(() => qSimilarExistingExplanationImages.removeAt(idx)),
                                    ),
                                  );
                                }),
                              ],
                              if (qSimilarPendingExtraExplanationImages.isNotEmpty) ...[
                                ...qSimilarPendingExtraExplanationImages.asMap().entries.map((entry) {
                                  final idx = entry.key;
                                  final file = entry.value;
                                  return ListTile(
                                    dense: true,
                                    contentPadding: EdgeInsets.zero,
                                    leading: const Icon(Icons.add_photo_alternate_outlined, size: 18, color: Colors.indigo),
                                    title: Text(file.path.split(Platform.pathSeparator).last, style: const TextStyle(fontSize: 12)),
                                    trailing: IconButton(
                                      icon: const Icon(Icons.close_rounded, size: 18, color: Colors.red),
                                      onPressed: () => setDialogState(() => qSimilarPendingExtraExplanationImages.removeAt(idx)),
                                    ),
                                  );
                                }),
                              ],
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          actions: [
            TextButton(
              onPressed: saving ? null : () => Navigator.of(dialogCtx).pop(),
              child: const Text('Cancel'),
            ),
            FilledButton(
              onPressed: saving
                  ? null
                  : () async {
                      if (qQuestion.text.trim().isEmpty ||
                          qOptionA.text.trim().isEmpty ||
                          qOptionB.text.trim().isEmpty ||
                          qOptionC.text.trim().isEmpty ||
                          qOptionD.text.trim().isEmpty) {
                        _showActionSnackBar(dialogCtx, 'Please fill question and all options (A, B, C, D)', isError: true);
                        return;
                      }

                      setDialogState(() => saving = true);
                      try {
                        var imgLink = qImageLink;
                        var expImgLink = qExplanationImageLink;
                        final vidLink = qExplanationVideoLink.text.trim();

                        final currentSet = _items.firstWhere(
                          (x) => _asInt((x as Map)['id']) == setId,
                          orElse: () => null,
                        );
                        final bId = currentSet != null ? _asInt(currentSet['batch_id'] ?? _batchId) : _batchId;
                        final effectiveBatchId = bId ?? (_batches.isNotEmpty ? _asInt((_batches.first as Map)['id']) : null);
                        final cls = currentSet != null ? currentSet['class_label']?.toString() ?? '' : _classLabel.text.trim();
                        final sbj = currentSet != null ? currentSet['subject']?.toString() ?? '' : _subject.text.trim();
                        final tpc = currentSet != null ? currentSet['topic']?.toString() ?? '' : _topic.text.trim();

                        Map<String, dynamic>? simData;
                        if (qSimilarQuestion.text.trim().isNotEmpty) {
                          if (effectiveBatchId != null) {
                            if (qSimilarQuestionImage != null) {
                              if (!await _validateImageFile(dialogCtx, qSimilarQuestionImage!)) {
                                throw Exception('Similar question image too large');
                              }
                              qSimilarQuestionImageLink = await widget.api.uploadQuestionImage(
                                batchId: effectiveBatchId,
                                classLabel: cls,
                                subject: sbj,
                                topic: tpc.isEmpty ? 'Practice Questions' : tpc,
                                file: qSimilarQuestionImage!,
                                contentType: 'similar_question',
                                contentId: setId,
                              );
                            }
                            if (qSimilarExplanationImage != null) {
                              if (!await _validateImageFile(dialogCtx, qSimilarExplanationImage!)) {
                                throw Exception('Similar explanation image too large');
                              }
                              qSimilarExplanationImageLink = await widget.api.uploadQuestionImage(
                                batchId: effectiveBatchId,
                                classLabel: cls,
                                subject: sbj,
                                topic: tpc.isEmpty ? 'Practice Questions' : tpc,
                                file: qSimilarExplanationImage!,
                                contentType: 'similar_explanation',
                                contentId: setId,
                              );
                            }
                            if (qSimilarPendingExtraExplanationImages.isNotEmpty) {
                              for (final extraFile in qSimilarPendingExtraExplanationImages) {
                                if (!await _validateImageFile(dialogCtx, extraFile)) {
                                  throw Exception('Similar explanation image too large');
                                }
                                final extraLink = await widget.api.uploadQuestionImage(
                                  batchId: effectiveBatchId,
                                  classLabel: cls,
                                  subject: sbj,
                                  topic: tpc.isEmpty ? 'Practice Questions' : tpc,
                                  file: extraFile,
                                  contentType: 'similar_explanation_extra',
                                  contentId: setId,
                                );
                                if (extraLink.isNotEmpty) {
                                  qSimilarExistingExplanationImages.add(extraLink);
                                }
                              }
                              qSimilarPendingExtraExplanationImages.clear();
                            }
                          }

                          simData = {
                            'question': qSimilarQuestion.text.trim(),
                            'option_a': qSimilarOptionA.text.trim(),
                            'option_b': qSimilarOptionB.text.trim(),
                            'option_c': qSimilarOptionC.text.trim(),
                            'option_d': qSimilarOptionD.text.trim(),
                            'correct_option': qSimilarCorrect,
                            'explanation': qSimilarExplanation.text.trim(),
                            if (qSimilarQuestionImageLink.isNotEmpty) 'question_image_link': qSimilarQuestionImageLink,
                            if (qSimilarExplanationImageLink.isNotEmpty) 'explanation_image_link': qSimilarExplanationImageLink,
                            if (qSimilarExistingExplanationImages.isNotEmpty) 'explanation_images': qSimilarExistingExplanationImages,
                          };
                        }

                        if (effectiveBatchId != null) {
                          if (qOptionAImage != null) {
                            if (!await _validateImageFile(dialogCtx, qOptionAImage!)) {
                              throw Exception('Option A image too large');
                            }
                            qOptionAImageLink = await widget.api.uploadQuestionImage(
                              batchId: effectiveBatchId,
                              classLabel: cls,
                              subject: sbj,
                              topic: tpc.isEmpty ? 'Practice Questions' : tpc,
                              file: qOptionAImage!,
                              contentType: 'practice_option_a',
                              contentId: setId,
                            );
                          }
                          if (qOptionBImage != null) {
                            if (!await _validateImageFile(dialogCtx, qOptionBImage!)) {
                              throw Exception('Option B image too large');
                            }
                            qOptionBImageLink = await widget.api.uploadQuestionImage(
                              batchId: effectiveBatchId,
                              classLabel: cls,
                              subject: sbj,
                              topic: tpc.isEmpty ? 'Practice Questions' : tpc,
                              file: qOptionBImage!,
                              contentType: 'practice_option_b',
                              contentId: setId,
                            );
                          }
                          if (qOptionCImage != null) {
                            if (!await _validateImageFile(dialogCtx, qOptionCImage!)) {
                              throw Exception('Option C image too large');
                            }
                            qOptionCImageLink = await widget.api.uploadQuestionImage(
                              batchId: effectiveBatchId,
                              classLabel: cls,
                              subject: sbj,
                              topic: tpc.isEmpty ? 'Practice Questions' : tpc,
                              file: qOptionCImage!,
                              contentType: 'practice_option_c',
                              contentId: setId,
                            );
                          }
                          if (qOptionDImage != null) {
                            if (!await _validateImageFile(dialogCtx, qOptionDImage!)) {
                              throw Exception('Option D image too large');
                            }
                            qOptionDImageLink = await widget.api.uploadQuestionImage(
                              batchId: effectiveBatchId,
                              classLabel: cls,
                              subject: sbj,
                              topic: tpc.isEmpty ? 'Practice Questions' : tpc,
                              file: qOptionDImage!,
                              contentType: 'practice_option_d',
                              contentId: setId,
                            );
                          }
                        }

                        if (!isEdit) {
                          if (dialogCtx.mounted && qImage != null && !await _validateImageFile(dialogCtx, qImage!)) {
                            throw Exception('Question image too large');
                          }
                          if (dialogCtx.mounted && qExplanationImage != null && !await _validateImageFile(dialogCtx, qExplanationImage!)) {
                            throw Exception('Explanation image too large');
                          }
                          if (qImage != null || qExplanationImage != null) {
                            await widget.api.addPracticeQuestionWithMedia(
                              setId: setId,
                              question: qQuestion.text.trim(),
                              optionA: qOptionA.text.trim(),
                              optionB: qOptionB.text.trim(),
                              optionC: qOptionC.text.trim(),
                              optionD: qOptionD.text.trim(),
                              correctOption: qCorrect,
                              explanation: qExplanation.text.trim(),
                              questionImage: qImage,
                              explanationImage: qExplanationImage,
                              questionImageLink: imgLink,
                              explanationImageLink: expImgLink,
                              explanationVideoLink: vidLink,
                              optionAImageLink: qOptionAImageLink,
                              optionBImageLink: qOptionBImageLink,
                              optionCImageLink: qOptionCImageLink,
                              optionDImageLink: qOptionDImageLink,
                              similarQuestion: simData,
                            );
                          } else {
                            await widget.api.addPracticeQuestion(
                              setId: setId,
                              question: qQuestion.text.trim(),
                              optionA: qOptionA.text.trim(),
                              optionB: qOptionB.text.trim(),
                              optionC: qOptionC.text.trim(),
                              optionD: qOptionD.text.trim(),
                              correctOption: qCorrect,
                              explanation: qExplanation.text.trim(),
                              questionImageLink: imgLink,
                              explanationImageLink: expImgLink,
                              explanationVideoLink: vidLink,
                              optionAImageLink: qOptionAImageLink,
                              optionBImageLink: qOptionBImageLink,
                              optionCImageLink: qOptionCImageLink,
                              optionDImageLink: qOptionDImageLink,
                              similarQuestion: simData,
                            );
                          }
                        } else {
                          final currentSet = _items.firstWhere(
                            (x) => _asInt((x as Map)['id']) == setId,
                            orElse: () => null,
                          );
                          final bId = currentSet != null ? _asInt(currentSet['batch_id'] ?? _batchId) : _batchId;
                          final cls = currentSet != null ? currentSet['class_label']?.toString() ?? '' : _classLabel.text.trim();
                          final sbj = currentSet != null ? currentSet['subject']?.toString() ?? '' : _subject.text.trim();
                          final tpc = currentSet != null ? currentSet['topic']?.toString() ?? '' : _topic.text.trim();

                          if (bId != null) {
                            final uploads = <Future<void>>[];
                            if (qImage != null) {
                              uploads.add(() async {
                                if (!await _validateImageFile(dialogCtx, qImage!)) {
                                  throw Exception('Question image too large');
                                }
                                imgLink = await widget.api.uploadQuestionImage(
                                  batchId: bId,
                                  classLabel: cls,
                                  subject: sbj,
                                  topic: tpc.isEmpty ? 'Practice Questions' : tpc,
                                  file: qImage!,
                                  contentType: 'practice',
                                  contentId: setId,
                                );
                              }());
                            }
                            if (qExplanationImage != null) {
                              uploads.add(() async {
                                if (!await _validateImageFile(dialogCtx, qExplanationImage!)) {
                                  throw Exception('Explanation image too large');
                                }
                                expImgLink = await widget.api.uploadQuestionImage(
                                  batchId: bId,
                                  classLabel: cls,
                                  subject: sbj,
                                  topic: tpc.isEmpty ? 'Practice Questions' : tpc,
                                  file: qExplanationImage!,
                                  contentType: 'practice_explanation',
                                  contentId: setId,
                                );
                              }());
                            }
                            if (uploads.isNotEmpty) {
                              await Future.wait(uploads);
                            }
                          }
                          await widget.api.updatePracticeQuestion(
                            id: questionId!,
                            question: qQuestion.text.trim(),
                            optionA: qOptionA.text.trim(),
                            optionB: qOptionB.text.trim(),
                            optionC: qOptionC.text.trim(),
                            optionD: qOptionD.text.trim(),
                            correctOption: qCorrect,
                            explanation: qExplanation.text.trim(),
                            questionImageLink: imgLink,
                            explanationImageLink: expImgLink,
                            explanationVideoLink: vidLink,
                            optionAImageLink: qOptionAImageLink,
                            optionBImageLink: qOptionBImageLink,
                            optionCImageLink: qOptionCImageLink,
                            optionDImageLink: qOptionDImageLink,
                            similarQuestion: simData,
                          );
                        }

                        if (dialogCtx.mounted) {
                          Navigator.of(dialogCtx).pop();
                        }
                        onSaved?.call();
                        if (hostContext.mounted) {
                          _showActionSnackBar(
                            hostContext,
                            isEdit ? 'Practice question updated successfully' : 'Practice question added successfully',
                          );
                        }
                      } catch (e) {
                        setDialogState(() => saving = false);
                        if (dialogCtx.mounted) {
                          _showActionSnackBar(dialogCtx, 'Save failed: ${_friendlyError(e)}', isError: true);
                        }
                      }
                    },
              child: _busyButtonChild(saving, isEdit ? 'Update Question' : 'Save Question'),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _openQuestionsForSet(int setId) async {
    try {
      setState(() => _selectedSetId = setId);
      List<dynamic> qs = await widget.api.practiceQuestions(setId);
      if (!mounted) return;

      final setObj = _items.firstWhere(
        (x) => _asInt((x as Map)['id']) == setId,
        orElse: () => null,
      );
      final setTitle = setObj != null ? (setObj['title']?.toString() ?? '') : '';

      final screenWidth = MediaQuery.sizeOf(context).width;
      final dialogWidth = (screenWidth > 900 ? 900.0 : (screenWidth * 0.95)).clamp(400.0, 950.0);
      final dialogHeight = (MediaQuery.sizeOf(context).height * 0.88).clamp(450.0, 850.0);

      await showDialog<void>(
        context: context,
        barrierDismissible: true,
        builder: (dialogCtx) => StatefulBuilder(
          builder: (ctx, setDialogState) {
            Future<void> reloadQuestions() async {
              try {
                final updated = await widget.api.practiceQuestions(setId);
                setDialogState(() => qs = updated);
              } catch (_) {}
            }

            return Dialog(
              backgroundColor: Theme.of(context).scaffoldBackgroundColor,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              insetPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
              child: SizedBox(
                width: dialogWidth,
                height: dialogHeight,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 14, 14, 12),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Row(
                                  children: [
                                    const Icon(Icons.flash_on_rounded, color: Color(0xFFE85A1C), size: 22),
                                    const SizedBox(width: 8),
                                    Flexible(
                                      child: Text(
                                        'Practice Questions (${qs.length})',
                                        style: const TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                  ],
                                ),
                                if (setTitle.isNotEmpty)
                                  Padding(
                                    padding: const EdgeInsets.only(top: 4, left: 30),
                                    child: Text(
                                      setTitle,
                                      style: TextStyle(
                                        fontSize: 13,
                                        color: Theme.of(context).colorScheme.onSurfaceVariant,
                                      ),
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 12),
                          FilledButton.icon(
                            onPressed: () {
                              _showPracticeQuestionDialog(
                                context,
                                setId: setId,
                                onSaved: reloadQuestions,
                              );
                            },
                            icon: const Icon(Icons.add, size: 18),
                            label: const Text('Add Question'),
                          ),
                          const SizedBox(width: 8),
                          IconButton(
                            icon: const Icon(Icons.close),
                            tooltip: 'Close',
                            onPressed: () => Navigator.of(dialogCtx).pop(),
                          ),
                        ],
                      ),
                    ),
                    const Divider(height: 1),
                    Expanded(
                      child: ListView(
                        padding: const EdgeInsets.all(16),
                        children: [
                          if (qs.isEmpty)
                            Padding(
                              padding: const EdgeInsets.symmetric(vertical: 40),
                              child: Center(
                                child: Column(
                                  children: [
                                    Icon(Icons.quiz_outlined, size: 48, color: Colors.grey.shade400),
                                    const SizedBox(height: 12),
                                    const Text(
                                      'No questions added to this practice set yet.',
                                      style: TextStyle(fontSize: 14),
                                    ),
                                    const SizedBox(height: 14),
                                    FilledButton.tonalIcon(
                                      onPressed: () {
                                        _showPracticeQuestionDialog(
                                          context,
                                          setId: setId,
                                          onSaved: reloadQuestions,
                                        );
                                      },
                                      icon: const Icon(Icons.add),
                                      label: const Text('Add Question Now'),
                                    ),
                                  ],
                                ),
                              ),
                            )
                          else
                            ...qs.asMap().entries.map((entry) {
                              final idx = entry.key;
                              final question = entry.value as Map<String, dynamic>;
                              final qId = _asInt(question['id'], label: 'questionId');
                              final correctOpt = (question['correct_option'] ?? '').toString().toUpperCase();

                              return Card(
                                margin: const EdgeInsets.only(bottom: 12),
                                elevation: 1,
                                shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                                side: BorderSide(color: Theme.of(context).colorScheme.outlineVariant),
                              ),
                              child: Padding(
                                padding: const EdgeInsets.all(16),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        Container(
                                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                          decoration: BoxDecoration(
                                            color: const Color(0xFFE85A1C).withValues(alpha: 0.12),
                                            borderRadius: BorderRadius.circular(6),
                                          ),
                                          child: Text(
                                            'Q${idx + 1}',
                                            style: const TextStyle(
                                              fontWeight: FontWeight.bold,
                                              fontSize: 12,
                                              color: Color(0xFFE85A1C),
                                            ),
                                          ),
                                        ),
                                        const SizedBox(width: 8),
                                        Container(
                                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                          decoration: BoxDecoration(
                                            color: Colors.green.withValues(alpha: 0.12),
                                            borderRadius: BorderRadius.circular(6),
                                            border: Border.all(color: Colors.green.withValues(alpha: 0.3)),
                                          ),
                                          child: Text(
                                            'Correct: Option $correctOpt',
                                            style: const TextStyle(
                                              fontSize: 11,
                                              fontWeight: FontWeight.bold,
                                              color: Colors.green,
                                            ),
                                          ),
                                        ),
                                        if (question['similar_question'] != null) ...[
                                          const SizedBox(width: 8),
                                          Container(
                                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                            decoration: BoxDecoration(
                                              color: Colors.indigo.withValues(alpha: 0.12),
                                              borderRadius: BorderRadius.circular(6),
                                            ),
                                            child: const Text(
                                              'Similar Q Added',
                                              style: TextStyle(
                                                fontSize: 11,
                                                color: Colors.indigo,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ],
                                    ),
                                    const SizedBox(height: 10),
                                    Text(
                                      question['question']?.toString() ?? '',
                                      style: const TextStyle(
                                        fontWeight: FontWeight.w600,
                                        fontSize: 14,
                                        height: 1.4,
                                      ),
                                    ),
                                    const SizedBox(height: 10),
                                    Container(
                                      padding: const EdgeInsets.all(10),
                                      decoration: BoxDecoration(
                                        color: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.4),
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          for (final opt in ['A', 'B', 'C', 'D']) ...[
                                            Builder(builder: (c) {
                                              final optKey = 'option_${opt.toLowerCase()}';
                                              final optText = question[optKey]?.toString() ?? '';
                                              final optImg = question['option_${opt.toLowerCase()}_image_link']?.toString() ?? '';
                                              if (optText.isEmpty && optImg.isEmpty) return const SizedBox.shrink();
                                              final isCorrect = correctOpt == opt;
                                              return Padding(
                                                padding: const EdgeInsets.symmetric(vertical: 3),
                                                child: Column(
                                                  crossAxisAlignment: CrossAxisAlignment.start,
                                                  children: [
                                                    Row(
                                                      crossAxisAlignment: CrossAxisAlignment.start,
                                                      children: [
                                                        Text(
                                                          '($opt) ',
                                                          style: TextStyle(
                                                            fontWeight: FontWeight.bold,
                                                            fontSize: 12,
                                                            color: isCorrect ? Colors.green : Theme.of(context).colorScheme.onSurfaceVariant,
                                                          ),
                                                        ),
                                                        Expanded(
                                                          child: Text(
                                                            optText,
                                                            style: TextStyle(
                                                              fontSize: 12,
                                                              fontWeight: isCorrect ? FontWeight.w600 : FontWeight.normal,
                                                              color: isCorrect ? Colors.green : null,
                                                            ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                    if (optImg.isNotEmpty) ...[
                                                      const SizedBox(height: 4),
                                                      ClipRRect(
                                                        borderRadius: BorderRadius.circular(6),
                                                        child: FastNetworkImage(
                                                          url: optImg,
                                                          height: 80,
                                                          fit: BoxFit.contain,
                                                          thumbWidth: 300,
                                                        ),
                                                      ),
                                                    ],
                                                  ],
                                                ),
                                              );
                                            }),
                                          ],
                                        ],
                                      ),
                                    ),
                                    if ((question['explanation']?.toString().trim().isNotEmpty ?? false)) ...[
                                      const SizedBox(height: 8),
                                      Text(
                                        'Explanation: ${question['explanation']}',
                                        style: TextStyle(
                                          fontSize: 12,
                                          fontStyle: FontStyle.italic,
                                          color: Theme.of(context).colorScheme.onSurfaceVariant,
                                        ),
                                      ),
                                    ],
                                    if (hasQuestionImage(question)) ...[
                                      const SizedBox(height: 10),
                                      ClipRRect(
                                        borderRadius: BorderRadius.circular(8),
                                        child: FastNetworkImage(
                                          url: questionImageRawUrl(question),
                                          height: 140,
                                          width: double.infinity,
                                          fit: BoxFit.contain,
                                          thumbWidth: 600,
                                        ),
                                      ),
                                    ],
                                    const SizedBox(height: 12),
                                    Wrap(
                                      spacing: 8,
                                      runSpacing: 6,
                                      children: [
                                        FilledButton.tonalIcon(
                                          onPressed: () {
                                            _showPracticeQuestionDialog(
                                              context,
                                              setId: setId,
                                              initialQuestion: question,
                                              onSaved: reloadQuestions,
                                            );
                                          },
                                          icon: const Icon(Icons.edit_outlined, size: 16),
                                          label: const Text('Edit Question'),
                                        ),
                                        OutlinedButton.icon(
                                          onPressed: () async {
                                            final moveToSetId = await showDialog<int?>(
                                              context: context,
                                              builder: (dialogContext) => AlertDialog(
                                                title: const Text('Move to Practice Set'),
                                                content: SizedBox(
                                                  width: 400,
                                                  child: SingleChildScrollView(
                                                    child: Column(
                                                      mainAxisSize: MainAxisSize.min,
                                                      children: _items
                                                          .where((set) =>
                                                              _asInt((set as Map<String, dynamic>)['id']) != setId)
                                                          .map((set) {
                                                        final setMap = set as Map<String, dynamic>;
                                                        final sId = _asInt(setMap['id']);
                                                        return ListTile(
                                                          title: Text(setMap['title']?.toString() ?? ''),
                                                          onTap: () => Navigator.of(dialogContext).pop(sId),
                                                        );
                                                      }).toList(),
                                                    ),
                                                  ),
                                                ),
                                              ),
                                            );
                                            if (moveToSetId != null) {
                                              try {
                                                await widget.api.movePracticeQuestion(
                                                  id: qId,
                                                  practiceSetId: moveToSetId,
                                                );
                                                await reloadQuestions();
                                                if (mounted) {
                                                  _showActionSnackBar(context, 'Question moved successfully');
                                                }
                                              } catch (e) {
                                                if (mounted) {
                                                  _showActionSnackBar(context, 'Move failed: $e', isError: true);
                                                }
                                              }
                                            }
                                          },
                                          icon: const Icon(Icons.drive_file_move_outlined, size: 16),
                                          label: const Text('Move'),
                                        ),
                                        OutlinedButton.icon(
                                          onPressed: () async {
                                            final confirm = await showDialog<bool>(
                                              context: context,
                                              builder: (dialogContext) => AlertDialog(
                                                title: const Text('Delete Question?'),
                                                content: const Text(
                                                  'Is question delete ho jayega. Ye action undo nahi ho sakta.',
                                                ),
                                                actions: [
                                                  TextButton(
                                                    onPressed: () => Navigator.of(dialogContext).pop(false),
                                                    child: const Text('Cancel'),
                                                  ),
                                                  TextButton(
                                                    onPressed: () => Navigator.of(dialogContext).pop(true),
                                                    child: const Text('Delete', style: TextStyle(color: Colors.red)),
                                                  ),
                                                ],
                                              ),
                                            );
                                            if (confirm == true) {
                                              try {
                                                await widget.api.deletePracticeQuestion(qId);
                                                await reloadQuestions();
                                                if (mounted) {
                                                  _showActionSnackBar(context, 'Question deleted successfully');
                                                }
                                              } catch (e) {
                                                if (mounted) {
                                                  _showActionSnackBar(context, 'Delete failed: $e', isError: true);
                                                }
                                              }
                                            }
                                          },
                                          icon: const Icon(Icons.delete_outlined, color: Colors.red, size: 16),
                                          label: const Text('Delete', style: TextStyle(color: Colors.red)),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            );
                          }),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
    } catch (e, st) {
      if (!mounted) return;
      await _handleTaskError(
        context,
        'Load practice questions',
        e,
        stackTrace: st,
        details: {'setId': setId},
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      controller: _scroll,
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (_editingId != null)
                  Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    decoration: BoxDecoration(
                      color: const Color(0xFFE85A1C).withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: const Color(0xFFE85A1C).withValues(alpha: 0.3)),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.edit_outlined, size: 16, color: Color(0xFFE85A1C)),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            'Editing Practice Set #$_editingId',
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                          ),
                        ),
                        TextButton(
                          onPressed: _resetPracticeForm,
                          child: const Text('Cancel Edit'),
                        ),
                      ],
                    ),
                  ),
                DropdownButtonFormField<int>(
                  value: _batches.any((b) => _asInt(b['id']) == _batchId) ? _batchId : null,
                  items: _batches
                      .map(
                        (e) => DropdownMenuItem(
                          value: _asInt((e as Map<String, dynamic>)['id']),
                          child: Text(e['name'].toString()),
                        ),
                      )
                      .toList(),
                  onChanged: (v) => setState(() => _batchId = v),
                  decoration: const InputDecoration(labelText: 'Batch'),
                ),
                const SizedBox(height: 8),
                TextField(
                    controller: _title,
                    decoration:
                        const InputDecoration(labelText: 'Practice title')),
                const SizedBox(height: 8),
                TextField(
                    controller: _classLabel,
                    decoration: const InputDecoration(labelText: 'Class')),
                const SizedBox(height: 8),
                TextField(
                    controller: _subject,
                    decoration: const InputDecoration(labelText: 'Subject')),
                const SizedBox(height: 8),
                TextField(
                    controller: _topic,
                    decoration: const InputDecoration(labelText: 'Topic')),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    FilledButton(
                      onPressed: (_batchId == null && _editingId == null)
                          ? null
                          : () async {
                              try {
                                if (_editingId == null) {
                                  await widget.api.addPractice(
                                    batchId: _batchId!,
                                    classLabel: _classLabel.text.trim(),
                                    title: _title.text.trim(),
                                    subject: _subject.text.trim(),
                                    topic: _topic.text.trim(),
                                  );
                                  _resetPracticeForm();
                                  if (context.mounted) {
                                    _showActionSnackBar(
                                        context, 'Practice added successfully');
                                  }
                                } else {
                                  await widget.api.updatePractice(
                                    id: _editingId!,
                                    batchId: _batchId,
                                    classLabel: _classLabel.text.trim(),
                                    title: _title.text.trim(),
                                    subject: _subject.text.trim(),
                                    topic: _topic.text.trim(),
                                  );
                                  _resetPracticeForm();
                                  if (context.mounted) {
                                    _showActionSnackBar(
                                        context, 'Practice updated successfully');
                                  }
                                }
                                await _load();
                              } catch (e) {
                                if (context.mounted) {
                                  _showActionSnackBar(
                                      context, 'Practice save failed: ${_friendlyError(e)}',
                                      isError: true);
                                }
                              }
                            },
                      child: Text(
                          _editingId == null ? 'Add Practice' : 'Update Practice'),
                    ),
                    if (_editingId != null)
                      OutlinedButton(
                        onPressed: _resetPracticeForm,
                        child: const Text('Cancel edit'),
                      ),
                    FilledButton.tonalIcon(
                      onPressed: _items.isEmpty
                          ? null
                          : () => _showManagePracticeSetsDialog(),
                      icon: const Icon(Icons.list_alt_outlined, size: 18),
                      label: const Text('Manage Practice Sets'),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                const Divider(),
                if (_editingPracticeQuestionId != null)
                  Container(
                    margin: const EdgeInsets.only(bottom: 8),
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    decoration: BoxDecoration(
                      color: Colors.blue.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: Colors.blue.withValues(alpha: 0.3)),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.edit_outlined, size: 16, color: Colors.blue),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            'Editing Question #$_editingPracticeQuestionId',
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                          ),
                        ),
                        TextButton(
                          onPressed: _resetPracticeQuestionForm,
                          child: const Text('Cancel Edit'),
                        ),
                      ],
                    ),
                  ),
                const Align(
                  alignment: Alignment.centerLeft,
                  child: Text('Add questions to practice',
                      style: TextStyle(fontWeight: FontWeight.w700)),
                ),
                const SizedBox(height: 4),
                const Text(
                  'Topic-wise MCQs yahan add karein. Chapter PYQs ke liye Books tab use karein — dono alag sections hain.',
                  style: TextStyle(fontSize: 12),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<int>(
                  value: _items.any((t) => _asInt(t['id']) == _selectedSetId)
                      ? _selectedSetId
                      : null,
                  items: _items
                      .map(
                        (t) => DropdownMenuItem<int>(
                          value: _asInt((t as Map<String, dynamic>)['id']),
                          child: Text(t['title']?.toString() ?? ''),
                        ),
                      )
                      .toList(),
                  onChanged: (v) => setState(() => _selectedSetId = v),
                  decoration:
                      const InputDecoration(labelText: 'Select practice set'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _pqQuestion,
                  minLines: 2,
                  maxLines: 4,
                  decoration: const InputDecoration(labelText: 'Question'),
                ),
                const SizedBox(height: 8),
                TextField(
                    controller: _pqOptionA,
                    decoration: const InputDecoration(labelText: 'Option A')),
                _buildOptionImagePickerRow(
                  label: 'Option A',
                  file: _pqOptionAImage,
                  imageLink: _pqOptionAImageLink,
                  onPick: (file) => setState(() => _pqOptionAImage = file),
                  onRemove: () => setState(() {
                    _pqOptionAImage = null;
                    _pqOptionAImageLink = '';
                  }),
                ),
                const SizedBox(height: 8),
                TextField(
                    controller: _pqOptionB,
                    decoration: const InputDecoration(labelText: 'Option B')),
                _buildOptionImagePickerRow(
                  label: 'Option B',
                  file: _pqOptionBImage,
                  imageLink: _pqOptionBImageLink,
                  onPick: (file) => setState(() => _pqOptionBImage = file),
                  onRemove: () => setState(() {
                    _pqOptionBImage = null;
                    _pqOptionBImageLink = '';
                  }),
                ),
                const SizedBox(height: 8),
                TextField(
                    controller: _pqOptionC,
                    decoration: const InputDecoration(labelText: 'Option C')),
                _buildOptionImagePickerRow(
                  label: 'Option C',
                  file: _pqOptionCImage,
                  imageLink: _pqOptionCImageLink,
                  onPick: (file) => setState(() => _pqOptionCImage = file),
                  onRemove: () => setState(() {
                    _pqOptionCImage = null;
                    _pqOptionCImageLink = '';
                  }),
                ),
                const SizedBox(height: 8),
                TextField(
                    controller: _pqOptionD,
                    decoration: const InputDecoration(labelText: 'Option D')),
                _buildOptionImagePickerRow(
                  label: 'Option D',
                  file: _pqOptionDImage,
                  imageLink: _pqOptionDImageLink,
                  onPick: (file) => setState(() => _pqOptionDImage = file),
                  onRemove: () => setState(() {
                    _pqOptionDImage = null;
                    _pqOptionDImageLink = '';
                  }),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  value: const ['A', 'B', 'C', 'D'].contains(_pqCorrect) ? _pqCorrect : 'A',
                  items: const [
                    DropdownMenuItem(value: 'A', child: Text('Correct: A')),
                    DropdownMenuItem(value: 'B', child: Text('Correct: B')),
                    DropdownMenuItem(value: 'C', child: Text('Correct: C')),
                    DropdownMenuItem(value: 'D', child: Text('Correct: D')),
                  ],
                  onChanged: (v) => setState(() => _pqCorrect = v ?? 'A'),
                  decoration:
                      const InputDecoration(labelText: 'Correct option'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _pqExplanation,
                  minLines: 3,
                  maxLines: 8,
                  decoration: const InputDecoration(
                    labelText: 'Explanation (paragraph)',
                    alignLabelWithHint: true,
                  ),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _pqExplanationVideoLink,
                  decoration: const InputDecoration(
                    labelText: 'Explanation Video Link (YouTube / Drive / MP4 URL)',
                    hintText: 'e.g. https://www.youtube.com/watch?... or Google Drive link',
                    prefixIcon: Icon(Icons.smart_display_outlined),
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        _pqImage == null
                            ? (_pqImageLink.isEmpty
                                ? 'No question image'
                                : 'Question image uploaded')
                            : _pqImage!.path.split(Platform.pathSeparator).last,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(fontSize: 12),
                      ),
                    ),
                    TextButton(
                      onPressed: () async {
                        final result = await FilePicker.platform
                            .pickFiles(type: FileType.image);
                        if (result?.files.single.path == null) return;
                        setState(
                            () => _pqImage = File(result!.files.single.path!));
                      },
                      child: const Text('Question image'),
                    ),
                    if (_pqImage != null || _pqImageLink.isNotEmpty)
                      TextButton(
                        onPressed: () => setState(() {
                          _pqImage = null;
                          _pqImageLink = '';
                        }),
                        child: const Text('Remove', style: TextStyle(color: Colors.red)),
                      ),
                  ],
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        _pqExplanationImage == null
                            ? (_pqExplanationImageLink.isEmpty
                                ? 'No explanation image'
                                : 'Explanation image uploaded')
                            : _pqExplanationImage!.path
                                .split(Platform.pathSeparator)
                                .last,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(fontSize: 12),
                      ),
                    ),
                    TextButton(
                      onPressed: () async {
                        final result = await FilePicker.platform
                            .pickFiles(type: FileType.image);
                        if (result?.files.single.path == null) return;
                        setState(() => _pqExplanationImage =
                            File(result!.files.single.path!));
                      },
                      child: const Text('Explanation image'),
                    ),
                    if (_pqExplanationImage != null ||
                        _pqExplanationImageLink.isNotEmpty)
                      TextButton(
                        onPressed: () => setState(() {
                          _pqExplanationImage = null;
                          _pqExplanationImageLink = '';
                        }),
                        child: const Text('Remove', style: TextStyle(color: Colors.red)),
                      ),
                  ],
                ),
                const SizedBox(height: 12),
                // Similar Question Section
                Container(
                  decoration: BoxDecoration(
                    color: Theme.of(context).cardColor,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: _pqSimilarQuestion.text.trim().isNotEmpty
                          ? Colors.indigo.shade400
                          : Theme.of(context).colorScheme.outlineVariant,
                    ),
                  ),
                  child: ExpansionTile(
                    initiallyExpanded: _pqShowSimilarQuestion,
                    onExpansionChanged: (val) => setState(() => _pqShowSimilarQuestion = val),
                    leading: const Icon(Icons.help_center_outlined, color: Color(0xFF4F46E5)),
                    title: Row(
                      children: [
                        const Text(
                          'Solve Similar Question',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                        ),
                        const SizedBox(width: 8),
                        if (_pqSimilarQuestion.text.trim().isNotEmpty)
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: Colors.green.withValues(alpha: 0.15),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: const Text('Added', style: TextStyle(color: Colors.green, fontSize: 10, fontWeight: FontWeight.bold)),
                          )
                        else
                          Text('(Optional)', style: TextStyle(fontSize: 11, color: Colors.grey.shade600)),
                      ],
                    ),
                    subtitle: const Text(
                      'Shown to student if they get this question wrong, or when solving all similar questions.',
                      style: TextStyle(fontSize: 11),
                    ),
                    children: [
                      Padding(
                        padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            TextField(
                              controller: _pqSimilarQuestion,
                              minLines: 2,
                              maxLines: 4,
                              decoration: const InputDecoration(
                                labelText: 'Similar Question text',
                                hintText: 'Enter a parallel question on this concept',
                              ),
                            ),
                            const SizedBox(height: 8),
                            TextField(
                              controller: _pqSimilarOptionA,
                              decoration: const InputDecoration(labelText: 'Similar Option A'),
                            ),
                            const SizedBox(height: 8),
                            TextField(
                              controller: _pqSimilarOptionB,
                              decoration: const InputDecoration(labelText: 'Similar Option B'),
                            ),
                            const SizedBox(height: 8),
                            TextField(
                              controller: _pqSimilarOptionC,
                              decoration: const InputDecoration(labelText: 'Similar Option C'),
                            ),
                            const SizedBox(height: 8),
                            TextField(
                              controller: _pqSimilarOptionD,
                              decoration: const InputDecoration(labelText: 'Similar Option D'),
                            ),
                            const SizedBox(height: 8),
                            DropdownButtonFormField<String>(
                              value: const ['A', 'B', 'C', 'D'].contains(_pqSimilarCorrect) ? _pqSimilarCorrect : 'A',
                              items: const [
                                DropdownMenuItem(value: 'A', child: Text('Correct: A')),
                                DropdownMenuItem(value: 'B', child: Text('Correct: B')),
                                DropdownMenuItem(value: 'C', child: Text('Correct: C')),
                                DropdownMenuItem(value: 'D', child: Text('Correct: D')),
                              ],
                              onChanged: (v) => setState(() => _pqSimilarCorrect = v ?? 'A'),
                              decoration: const InputDecoration(labelText: 'Correct Option for Similar Question'),
                            ),
                            const SizedBox(height: 8),
                            TextField(
                              controller: _pqSimilarExplanation,
                              minLines: 2,
                              maxLines: 4,
                              decoration: const InputDecoration(
                                labelText: 'Explanation for Similar Question (Optional)',
                              ),
                            ),
                            const SizedBox(height: 10),
                            // Similar Question Image
                            Row(
                              children: [
                                Expanded(
                                  child: Text(
                                    _pqSimilarQuestionImage == null
                                        ? (_pqSimilarQuestionImageLink.isEmpty
                                            ? 'No similar question image'
                                            : 'Similar question image uploaded')
                                        : _pqSimilarQuestionImage!.path.split(Platform.pathSeparator).last,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(fontSize: 12),
                                  ),
                                ),
                                TextButton(
                                  onPressed: () async {
                                    final result = await FilePicker.platform.pickFiles(type: FileType.image);
                                    if (result?.files.single.path == null) return;
                                    setState(() => _pqSimilarQuestionImage = File(result!.files.single.path!));
                                  },
                                  child: const Text('Pick Image'),
                                ),
                                if (_pqSimilarQuestionImage != null || _pqSimilarQuestionImageLink.isNotEmpty)
                                  TextButton(
                                    onPressed: () => setState(() {
                                      _pqSimilarQuestionImage = null;
                                      _pqSimilarQuestionImageLink = '';
                                    }),
                                    child: const Text('Remove', style: TextStyle(color: Colors.red)),
                                  ),
                              ],
                            ),
                            const SizedBox(height: 6),
                            // Similar Question Explanation Image
                            Row(
                              children: [
                                Expanded(
                                  child: Text(
                                    _pqSimilarExplanationImage == null
                                        ? (_pqSimilarExplanationImageLink.isEmpty
                                            ? 'No similar explanation image'
                                            : 'Similar explanation image uploaded')
                                        : _pqSimilarExplanationImage!.path.split(Platform.pathSeparator).last,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(fontSize: 12),
                                  ),
                                ),
                                TextButton(
                                  onPressed: () async {
                                    final result = await FilePicker.platform.pickFiles(type: FileType.image);
                                    if (result?.files.single.path == null) return;
                                    setState(() => _pqSimilarExplanationImage = File(result!.files.single.path!));
                                  },
                                  child: const Text('Pick Image'),
                                ),
                                if (_pqSimilarExplanationImage != null || _pqSimilarExplanationImageLink.isNotEmpty)
                                  TextButton(
                                    onPressed: () => setState(() {
                                      _pqSimilarExplanationImage = null;
                                      _pqSimilarExplanationImageLink = '';
                                    }),
                                    child: const Text('Remove', style: TextStyle(color: Colors.red)),
                                  ),
                              ],
                            ),
                            const SizedBox(height: 8),
                            // Multiple Explanation Images for Similar Question
                            Row(
                              children: [
                                Expanded(
                                  child: Text(
                                    _pqSimilarPendingExtraExplanationImages.isEmpty && _pqSimilarExistingExplanationImages.isEmpty
                                        ? 'No extra explanation images'
                                        : '${_pqSimilarExistingExplanationImages.length} saved, ${_pqSimilarPendingExtraExplanationImages.length} ready to upload',
                                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
                                  ),
                                ),
                                TextButton.icon(
                                  icon: const Icon(Icons.add_photo_alternate_outlined, size: 16),
                                  label: const Text('Add Images'),
                                  onPressed: () async {
                                    final result = await FilePicker.platform.pickFiles(
                                      type: FileType.image,
                                      allowMultiple: true,
                                    );
                                    if (result == null) return;
                                    setState(() {
                                      for (final f in result.files) {
                                        if (f.path != null) {
                                          _pqSimilarPendingExtraExplanationImages.add(File(f.path!));
                                        }
                                      }
                                    });
                                  },
                                ),
                              ],
                            ),
                            if (_pqSimilarExistingExplanationImages.isNotEmpty) ...[
                              ..._pqSimilarExistingExplanationImages.asMap().entries.map((entry) {
                                final idx = entry.key;
                                return ListTile(
                                  dense: true,
                                  contentPadding: EdgeInsets.zero,
                                  leading: const Icon(Icons.image_outlined, size: 18),
                                  title: Text('Saved Explanation Image #${idx + 1}', style: const TextStyle(fontSize: 12)),
                                  trailing: IconButton(
                                    icon: const Icon(Icons.delete_outline_rounded, size: 18, color: Colors.red),
                                    onPressed: () => setState(() => _pqSimilarExistingExplanationImages.removeAt(idx)),
                                  ),
                                );
                              }),
                            ],
                            if (_pqSimilarPendingExtraExplanationImages.isNotEmpty) ...[
                              ..._pqSimilarPendingExtraExplanationImages.asMap().entries.map((entry) {
                                final idx = entry.key;
                                final file = entry.value;
                                return ListTile(
                                  dense: true,
                                  contentPadding: EdgeInsets.zero,
                                  leading: const Icon(Icons.add_photo_alternate_outlined, size: 18, color: Colors.indigo),
                                  title: Text(file.path.split(Platform.pathSeparator).last, style: const TextStyle(fontSize: 12)),
                                  trailing: IconButton(
                                    icon: const Icon(Icons.close_rounded, size: 18, color: Colors.red),
                                    onPressed: () => setState(() => _pqSimilarPendingExtraExplanationImages.removeAt(idx)),
                                  ),
                                );
                              }),
                            ],
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    FilledButton.tonal(
                      onPressed: _selectedSetId == null || _savingPracticeQuestion
                          ? null
                          : () async {
                              setState(() => _savingPracticeQuestion = true);
                              try {
                                var imageLink = _pqImageLink;
                                var expLink = _pqExplanationImageLink;
                                final videoLink = _pqExplanationVideoLink.text.trim();

                                final currentSet = _items.firstWhere(
                                  (x) => _asInt((x as Map)['id']) == _selectedSetId,
                                  orElse: () => null,
                                );
                                final bId = currentSet != null ? _asInt(currentSet['batch_id'] ?? _batchId) : _batchId;
                                final effectiveBatchId = bId ?? (_batches.isNotEmpty ? _asInt((_batches.first as Map)['id']) : null);
                                final cls = currentSet != null ? currentSet['class_label']?.toString() ?? '' : _classLabel.text.trim();
                                final sbj = currentSet != null ? currentSet['subject']?.toString() ?? '' : _subject.text.trim();
                                final tpc = currentSet != null ? currentSet['topic']?.toString() ?? '' : _topic.text.trim();

                                Map<String, dynamic>? similarQuestionData;
                                if (_pqSimilarQuestion.text.trim().isNotEmpty) {
                                  if (effectiveBatchId != null) {
                                    if (_pqSimilarQuestionImage != null) {
                                      if (!await _validateImageFile(context, _pqSimilarQuestionImage!)) {
                                        throw Exception('Similar question image too large');
                                      }
                                      _pqSimilarQuestionImageLink = await widget.api.uploadQuestionImage(
                                        batchId: effectiveBatchId,
                                        classLabel: cls,
                                        subject: sbj,
                                        topic: tpc.isEmpty ? 'Practice Questions' : tpc,
                                        file: _pqSimilarQuestionImage!,
                                        contentType: 'similar_question',
                                        contentId: _selectedSetId,
                                      );
                                    }
                                    if (_pqSimilarExplanationImage != null) {
                                      if (!await _validateImageFile(context, _pqSimilarExplanationImage!)) {
                                        throw Exception('Similar explanation image too large');
                                      }
                                      _pqSimilarExplanationImageLink = await widget.api.uploadQuestionImage(
                                        batchId: effectiveBatchId,
                                        classLabel: cls,
                                        subject: sbj,
                                        topic: tpc.isEmpty ? 'Practice Questions' : tpc,
                                        file: _pqSimilarExplanationImage!,
                                        contentType: 'similar_explanation',
                                        contentId: _selectedSetId,
                                      );
                                    }
                                    if (_pqSimilarPendingExtraExplanationImages.isNotEmpty) {
                                      for (final extraFile in _pqSimilarPendingExtraExplanationImages) {
                                        if (!await _validateImageFile(context, extraFile)) {
                                          throw Exception('Similar explanation extra image too large');
                                        }
                                        final extraLink = await widget.api.uploadQuestionImage(
                                          batchId: effectiveBatchId,
                                          classLabel: cls,
                                          subject: sbj,
                                          topic: tpc.isEmpty ? 'Practice Questions' : tpc,
                                          file: extraFile,
                                          contentType: 'similar_explanation_extra',
                                          contentId: _selectedSetId,
                                        );
                                        if (extraLink.isNotEmpty) {
                                          _pqSimilarExistingExplanationImages.add(extraLink);
                                        }
                                      }
                                      _pqSimilarPendingExtraExplanationImages.clear();
                                    }
                                  }

                                  similarQuestionData = {
                                    'question': _pqSimilarQuestion.text.trim(),
                                    'option_a': _pqSimilarOptionA.text.trim(),
                                    'option_b': _pqSimilarOptionB.text.trim(),
                                    'option_c': _pqSimilarOptionC.text.trim(),
                                    'option_d': _pqSimilarOptionD.text.trim(),
                                    'correct_option': _pqSimilarCorrect,
                                    'explanation': _pqSimilarExplanation.text.trim(),
                                    if (_pqSimilarQuestionImageLink.isNotEmpty) 'question_image_link': _pqSimilarQuestionImageLink,
                                    if (_pqSimilarExplanationImageLink.isNotEmpty) 'explanation_image_link': _pqSimilarExplanationImageLink,
                                    if (_pqSimilarExistingExplanationImages.isNotEmpty) 'explanation_images': _pqSimilarExistingExplanationImages,
                                  };
                                }

                                if (effectiveBatchId != null) {
                                  if (_pqOptionAImage != null) {
                                    if (!await _validateImageFile(context, _pqOptionAImage!)) {
                                      throw Exception('Option A image too large');
                                    }
                                    _pqOptionAImageLink = await widget.api.uploadQuestionImage(
                                      batchId: effectiveBatchId,
                                      classLabel: cls,
                                      subject: sbj,
                                      topic: tpc.isEmpty ? 'Practice Questions' : tpc,
                                      file: _pqOptionAImage!,
                                      contentType: 'practice_option_a',
                                      contentId: _selectedSetId,
                                    );
                                  }
                                  if (_pqOptionBImage != null) {
                                    if (!await _validateImageFile(context, _pqOptionBImage!)) {
                                      throw Exception('Option B image too large');
                                    }
                                    _pqOptionBImageLink = await widget.api.uploadQuestionImage(
                                      batchId: effectiveBatchId,
                                      classLabel: cls,
                                      subject: sbj,
                                      topic: tpc.isEmpty ? 'Practice Questions' : tpc,
                                      file: _pqOptionBImage!,
                                      contentType: 'practice_option_b',
                                      contentId: _selectedSetId,
                                    );
                                  }
                                  if (_pqOptionCImage != null) {
                                    if (!await _validateImageFile(context, _pqOptionCImage!)) {
                                      throw Exception('Option C image too large');
                                    }
                                    _pqOptionCImageLink = await widget.api.uploadQuestionImage(
                                      batchId: effectiveBatchId,
                                      classLabel: cls,
                                      subject: sbj,
                                      topic: tpc.isEmpty ? 'Practice Questions' : tpc,
                                      file: _pqOptionCImage!,
                                      contentType: 'practice_option_c',
                                      contentId: _selectedSetId,
                                    );
                                  }
                                  if (_pqOptionDImage != null) {
                                    if (!await _validateImageFile(context, _pqOptionDImage!)) {
                                      throw Exception('Option D image too large');
                                    }
                                    _pqOptionDImageLink = await widget.api.uploadQuestionImage(
                                      batchId: effectiveBatchId,
                                      classLabel: cls,
                                      subject: sbj,
                                      topic: tpc.isEmpty ? 'Practice Questions' : tpc,
                                      file: _pqOptionDImage!,
                                      contentType: 'practice_option_d',
                                      contentId: _selectedSetId,
                                    );
                                  }
                                }

                                if (_editingPracticeQuestionId == null) {
                                  if (_pqImage != null &&
                                      !await _validateImageFile(context, _pqImage!)) {
                                    throw Exception('Question image too large');
                                  }
                                  if (_pqExplanationImage != null &&
                                      !await _validateImageFile(
                                          context, _pqExplanationImage!)) {
                                    throw Exception('Explanation image too large');
                                  }
                                  if (_pqImage != null || _pqExplanationImage != null) {
                                    await widget.api.addPracticeQuestionWithMedia(
                                      setId: _selectedSetId!,
                                      question: _pqQuestion.text.trim(),
                                      optionA: _pqOptionA.text.trim(),
                                      optionB: _pqOptionB.text.trim(),
                                      optionC: _pqOptionC.text.trim(),
                                      optionD: _pqOptionD.text.trim(),
                                      correctOption: _pqCorrect,
                                      explanation: _pqExplanation.text.trim(),
                                      questionImage: _pqImage,
                                      explanationImage: _pqExplanationImage,
                                      questionImageLink: imageLink,
                                      explanationImageLink: expLink,
                                      explanationVideoLink: videoLink,
                                      optionAImageLink: _pqOptionAImageLink,
                                      optionBImageLink: _pqOptionBImageLink,
                                      optionCImageLink: _pqOptionCImageLink,
                                      optionDImageLink: _pqOptionDImageLink,
                                      similarQuestion: similarQuestionData,
                                    );
                                  } else {
                                    await widget.api.addPracticeQuestion(
                                      setId: _selectedSetId!,
                                      question: _pqQuestion.text.trim(),
                                      optionA: _pqOptionA.text.trim(),
                                      optionB: _pqOptionB.text.trim(),
                                      optionC: _pqOptionC.text.trim(),
                                      optionD: _pqOptionD.text.trim(),
                                      correctOption: _pqCorrect,
                                      explanation: _pqExplanation.text.trim(),
                                      questionImageLink: imageLink,
                                      explanationImageLink: expLink,
                                      explanationVideoLink: videoLink,
                                      optionAImageLink: _pqOptionAImageLink,
                                      optionBImageLink: _pqOptionBImageLink,
                                      optionCImageLink: _pqOptionCImageLink,
                                      optionDImageLink: _pqOptionDImageLink,
                                      similarQuestion: similarQuestionData,
                                    );
                                  }
                                } else {
                                  final currentSet = _items.firstWhere(
                                    (x) => _asInt((x as Map)['id']) == _selectedSetId,
                                    orElse: () => null,
                                  );
                                  final bId = currentSet != null ? _asInt(currentSet['batch_id'] ?? _batchId) : _batchId;

                                  if (bId != null) {
                                    final uploads = <Future<void>>[];
                                    if (_pqImage != null) {
                                      uploads.add(() async {
                                        if (!await _validateImageFile(
                                            context, _pqImage!)) {
                                          throw Exception('Question image too large');
                                        }
                                        imageLink =
                                            await widget.api.uploadQuestionImage(
                                          batchId: bId,
                                          classLabel: _classLabel.text.trim(),
                                          subject: _subject.text.trim(),
                                          topic: _topic.text.trim().isEmpty
                                              ? 'Practice Questions'
                                              : _topic.text.trim(),
                                          file: _pqImage!,
                                          contentType: 'practice',
                                          contentId: _selectedSetId,
                                        );
                                      }());
                                    }
                                    if (_pqExplanationImage != null) {
                                      uploads.add(() async {
                                        if (!await _validateImageFile(
                                            context, _pqExplanationImage!)) {
                                          throw Exception(
                                              'Explanation image too large');
                                        }
                                        expLink =
                                            await widget.api.uploadQuestionImage(
                                          batchId: bId,
                                          classLabel: _classLabel.text.trim(),
                                          subject: _subject.text.trim(),
                                          topic: _topic.text.trim().isEmpty
                                              ? 'Practice Questions'
                                              : _topic.text.trim(),
                                          file: _pqExplanationImage!,
                                          contentType: 'practice_explanation',
                                          contentId: _selectedSetId,
                                        );
                                      }());
                                    }
                                    if (uploads.isNotEmpty) {
                                      await Future.wait(uploads);
                                    }
                                  }
                                  await widget.api.updatePracticeQuestion(
                                    id: _editingPracticeQuestionId!,
                                    question: _pqQuestion.text.trim(),
                                    optionA: _pqOptionA.text.trim(),
                                    optionB: _pqOptionB.text.trim(),
                                    optionC: _pqOptionC.text.trim(),
                                    optionD: _pqOptionD.text.trim(),
                                    correctOption: _pqCorrect,
                                    explanation: _pqExplanation.text.trim(),
                                    questionImageLink: imageLink,
                                    explanationImageLink: expLink,
                                    explanationVideoLink: videoLink,
                                    optionAImageLink: _pqOptionAImageLink,
                                    optionBImageLink: _pqOptionBImageLink,
                                    optionCImageLink: _pqOptionCImageLink,
                                    optionDImageLink: _pqOptionDImageLink,
                                    similarQuestion: similarQuestionData,
                                  );
                                }
                                _resetPracticeQuestionForm();
                                if (!mounted) return;
                                if (context.mounted) {
                                  _showActionSnackBar(
                                      context, 'Practice question saved successfully');
                                }
                              } catch (e, st) {
                                if (!context.mounted) return;
                                await _handleTaskError(
                                  context,
                                  'Practice question save',
                                  e,
                                  stackTrace: st,
                                  details: {
                                    'setId': _selectedSetId,
                                    'editingPracticeQuestionId':
                                        _editingPracticeQuestionId,
                                  },
                                );
                              } finally {
                                if (mounted) {
                                  setState(() => _savingPracticeQuestion = false);
                                }
                              }
                            },
                      child: _busyButtonChild(
                        _savingPracticeQuestion,
                        _editingPracticeQuestionId == null ? 'Add Question' : 'Update Question',
                      ),
                    ),
                    if (_editingPracticeQuestionId != null)
                      OutlinedButton(
                        onPressed: _resetPracticeQuestionForm,
                        child: const Text('Cancel edit'),
                      ),
                    FilledButton.tonalIcon(
                      onPressed: _items.isEmpty
                          ? null
                          : () {
                              if (_selectedSetId != null) {
                                _openQuestionsForSet(_selectedSetId!);
                              } else {
                                _showManagePracticeSetsDialog();
                              }
                            },
                      icon: const Icon(Icons.list_alt_outlined, size: 18),
                      label: const Text('Manage Questions for Set'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        if (_items.isNotEmpty)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Row(children: [
              const Icon(Icons.flash_on_rounded,
                  size: 16, color: Color(0xFFE85A1C)),
              const SizedBox(width: 6),
              Text('Practice Sets (${_items.length})',
                  style: const TextStyle(
                      fontWeight: FontWeight.w700, fontSize: 15)),
            ]),
          ),
        ..._items.map(
          (e) {
            final item = e as Map<String, dynamic>;
            final setId = _asInt(item['id'], label: 'setId');
            return Container(
              margin: const EdgeInsets.only(bottom: 10),
              decoration: BoxDecoration(
                color: Theme.of(context).cardTheme.color,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                    color: Theme.of(context).colorScheme.outlineVariant),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  InkWell(
                    borderRadius:
                        const BorderRadius.vertical(top: Radius.circular(16)),
                    onTap: () => _openQuestionsForSet(setId),
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(14, 12, 8, 0),
                      child: Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: const Color(0xFFE85A1C)
                                  .withValues(alpha: 0.12),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: const Icon(Icons.flash_on_rounded,
                                color: Color(0xFFE85A1C), size: 18),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(item['title']?.toString() ?? '',
                                    style: const TextStyle(
                                        fontWeight: FontWeight.w700,
                                        fontSize: 14)),
                                const SizedBox(height: 2),
                                Text(
                                    '${item['subject'] ?? ''} • ${item['topic'] ?? ''}',
                                    style: const TextStyle(
                                        fontSize: 12,
                                        color: Color(0xFF757575))),
                                const SizedBox(height: 2),
                                const Text('Tap to view & add questions',
                                    style: TextStyle(
                                        fontSize: 11,
                                        color: Color(0xFFE85A1C))),
                              ],
                            ),
                          ),
                          IconButton(
                            tooltip: 'View & Manage questions',
                            icon: const Icon(Icons.list_alt_outlined, size: 20),
                            onPressed: () => _openQuestionsForSet(setId),
                          ),
                          IconButton(
                            tooltip: 'Edit Practice Set',
                            icon: const Icon(Icons.edit_outlined, size: 20),
                            onPressed: () => _showEditPracticeDialog(item),
                          ),
                          IconButton(
                            tooltip: 'Delete Practice Set',
                            icon: const Icon(Icons.delete_outline,
                                size: 20, color: Color(0xFFD92D20)),
                            onPressed: () async {
                              final ok = await _confirmDeleteDialog(
                                context,
                                title: 'Delete Practice?',
                                body:
                                    'This practice set will be removed permanently.',
                              );
                              if (!ok) return;
                              try {
                                await widget.api.deletePractice(setId);
                                await _load();
                                if (context.mounted) {
                                  _showActionSnackBar(
                                      context, 'Practice deleted successfully');
                                }
                              } catch (e, st) {
                                if (!context.mounted) return;
                                await _handleTaskError(
                                    context, 'Delete practice', e,
                                    stackTrace: st);
                              }
                            },
                          ),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(14, 8, 14, 12),
                    child: Wrap(spacing: 6, runSpacing: 4, children: [
                      _ChipBadge(
                          label: item['batch_name']?.toString() ?? '',
                          color: const Color(0xFF1976D2)),
                      _ChipBadge(
                          label: item['class_label']?.toString() ?? '',
                          color: const Color(0xFF7B1FA2)),
                    ]),
                  ),
                ],
              ),
            );
          },
        ),
      ],
    );
  }
}

class TestsPage extends StatefulWidget {
  const TestsPage({super.key, required this.api});
  final AdminApi api;
  @override
  State<TestsPage> createState() => _TestsPageState();
}

class _TestsPageState extends State<TestsPage> {
  final _scroll = ScrollController();
  static const List<String> _testCategories = <String>[
    'Grand test',
    'Subject test',
    'Chapter test',
  ];
  final _title = TextEditingController();
  final _classLabel = TextEditingController(text: 'Class 11');
  final _subject = TextEditingController(text: 'Biology');
  final _topic = TextEditingController();
  final _duration = TextEditingController(text: '180');
  final _marks = TextEditingController(text: '720');
  final _questionCount = TextEditingController(text: '180');
  final _schedule = TextEditingController(text: 'Upcoming');
  String _testCategory = 'Grand test';
  final _testQuestion = TextEditingController();
  final _testOptionA = TextEditingController();
  final _testOptionB = TextEditingController();
  final _testOptionC = TextEditingController();
  final _testOptionD = TextEditingController();
  final _testExplanation = TextEditingController();
  final _testExplanationVideoLink = TextEditingController();
  String _testCorrect = 'A';
  int? _editingQuestionId;
  File? _testQuestionImage;
  String _testQuestionImageLink = '';
  File? _testExplanationImage;
  String _testExplanationImageLink = '';
  File? _testOptionAImage;
  String _testOptionAImageLink = '';
  File? _testOptionBImage;
  String _testOptionBImageLink = '';
  File? _testOptionCImage;
  String _testOptionCImageLink = '';
  File? _testOptionDImage;
  String _testOptionDImageLink = '';
  // Similar Question for Test MCQ
  final _testSimilarQuestion = TextEditingController();
  final _testSimilarOptionA = TextEditingController();
  final _testSimilarOptionB = TextEditingController();
  final _testSimilarOptionC = TextEditingController();
  final _testSimilarOptionD = TextEditingController();
  final _testSimilarExplanation = TextEditingController();
  String _testSimilarCorrect = 'A';
  bool _testShowSimilarQuestion = false;
  File? _testSimilarQuestionImage;
  String _testSimilarQuestionImageLink = '';
  File? _testSimilarExplanationImage;
  String _testSimilarExplanationImageLink = '';
  final List<File> _testSimilarPendingExtraExplanationImages = [];
  final List<String> _testSimilarExistingExplanationImages = [];

  final List<File> _pendingExtraExplanationImages = [];
  List<dynamic> _savedExplanationImages = const [];
  int? _batchId;
  int? _editingId;
  int? _selectedTestId;
  List<dynamic> _batches = const [];
  List<dynamic> _items = const [];
  String? _status;
  bool _savingQuestion = false;

  Future<void> _loadTestExplanationImages(int questionId) async {
    final images = await widget.api.fetchExplanationImages(
      questionType: 'test_question',
      questionId: questionId,
    );
    if (!mounted) return;
    setState(() => _savedExplanationImages = images);
  }

  Future<void> _uploadPendingTestExplanationImages(int questionId) async {
    if (_batchId == null || _pendingExtraExplanationImages.isEmpty) return;
    await Future.wait(
      _pendingExtraExplanationImages.map(
        (file) => widget.api.addExplanationImage(
          questionType: 'test_question',
          questionId: questionId,
          batchId: _batchId!,
          classLabel: _classLabel.text.trim(),
          subject: _subject.text.trim(),
          topic: _topic.text.trim().isEmpty
              ? 'Test Questions'
              : _topic.text.trim(),
          file: file,
        ),
      ),
    );
    _pendingExtraExplanationImages.clear();
    unawaited(_loadTestExplanationImages(questionId));
  }

  void _resetTestForm() {
    _title.clear();
    _classLabel.text = 'Class 11';
    _subject.clear();
    _topic.clear();
    _duration.text = '180';
    _marks.text = '720';
    _questionCount.text = '180';
    _schedule.text = 'Upcoming';
    setState(() {
      _testCategory = 'Grand test';
      _editingId = null;
      _status = null;
    });
  }

  void _resetTestQuestionForm() {
    _testQuestion.clear();
    _testOptionA.clear();
    _testOptionB.clear();
    _testOptionC.clear();
    _testOptionD.clear();
    _testExplanation.clear();
    _testExplanationVideoLink.clear();
    _testSimilarQuestion.clear();
    _testSimilarOptionA.clear();
    _testSimilarOptionB.clear();
    _testSimilarOptionC.clear();
    _testSimilarOptionD.clear();
    _testSimilarExplanation.clear();
    setState(() {
      _editingQuestionId = null;
      _testCorrect = 'A';
      _testSimilarCorrect = 'A';
      _testShowSimilarQuestion = false;
      _testSimilarQuestionImage = null;
      _testSimilarQuestionImageLink = '';
      _testSimilarExplanationImage = null;
      _testSimilarExplanationImageLink = '';
      _testSimilarPendingExtraExplanationImages.clear();
      _testSimilarExistingExplanationImages.clear();
      _testQuestionImage = null;
      _testQuestionImageLink = '';
      _testExplanationImage = null;
      _testExplanationImageLink = '';
      _testOptionAImage = null;
      _testOptionAImageLink = '';
      _testOptionBImage = null;
      _testOptionBImageLink = '';
      _testOptionCImage = null;
      _testOptionCImageLink = '';
      _testOptionDImage = null;
      _testOptionDImageLink = '';
      _pendingExtraExplanationImages.clear();
      _savedExplanationImages = const [];
    });
  }

  Future<void> _showEditTestDialog(Map<String, dynamic> item) async {
    final testId = _asInt(item['id'], label: 'testId');
    final titleCtrl = TextEditingController(text: item['title']?.toString() ?? '');
    final classCtrl = TextEditingController(text: item['class_label']?.toString() ?? 'Class 11');
    final subjectCtrl = TextEditingController(text: item['subject']?.toString() ?? 'Biology');
    final topicCtrl = TextEditingController(text: item['topic']?.toString() ?? '');
    final durationCtrl = TextEditingController(text: item['duration_minutes']?.toString() ?? '180');
    final marksCtrl = TextEditingController(text: item['marks']?.toString() ?? '720');
    final questionCountCtrl = TextEditingController(text: item['question_count']?.toString() ?? '180');
    final scheduleCtrl = TextEditingController(text: item['schedule_label']?.toString() ?? 'Upcoming');
    String categoryValue = item['category']?.toString() ?? 'Grand test';
    if (!_testCategories.contains(categoryValue)) {
      categoryValue = categoryValue.toLowerCase().contains('student') ? 'Subject test' : 'Grand test';
    }
    bool saving = false;

    await showDialog<void>(
      context: context,
      builder: (dialogCtx) => StatefulBuilder(
        builder: (ctx, setDialogState) => AlertDialog(
          title: const Row(
            children: [
              Icon(Icons.edit_outlined, color: Color(0xFFD92D20)),
              SizedBox(width: 8),
              Expanded(child: Text('Edit Test')),
            ],
          ),
          content: SizedBox(
            width: 500,
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  DropdownButtonFormField<String>(
                    value: categoryValue,
                    items: _testCategories
                        .map((category) => DropdownMenuItem<String>(
                              value: category,
                              child: Text(category),
                            ))
                        .toList(),
                    onChanged: (v) => setDialogState(() => categoryValue = v ?? 'Grand test'),
                    decoration: const InputDecoration(labelText: 'Test category'),
                  ),
                  const SizedBox(height: 10),
                  TextField(
                    controller: titleCtrl,
                    decoration: const InputDecoration(labelText: 'Test Title'),
                  ),
                  const SizedBox(height: 10),
                  TextField(
                    controller: classCtrl,
                    decoration: const InputDecoration(labelText: 'Class'),
                  ),
                  const SizedBox(height: 10),
                  TextField(
                    controller: subjectCtrl,
                    decoration: const InputDecoration(labelText: 'Subject'),
                  ),
                  const SizedBox(height: 10),
                  TextField(
                    controller: topicCtrl,
                    decoration: const InputDecoration(labelText: 'Topic'),
                  ),
                  const SizedBox(height: 10),
                  TextField(
                    controller: durationCtrl,
                    decoration: const InputDecoration(labelText: 'Duration (minutes)'),
                  ),
                  const SizedBox(height: 10),
                  TextField(
                    controller: marksCtrl,
                    decoration: const InputDecoration(labelText: 'Total marks'),
                  ),
                  const SizedBox(height: 10),
                  TextField(
                    controller: questionCountCtrl,
                    decoration: const InputDecoration(labelText: 'Question count'),
                  ),
                  const SizedBox(height: 10),
                  TextField(
                    controller: scheduleCtrl,
                    decoration: const InputDecoration(labelText: 'Schedule label'),
                  ),
                ],
              ),
            ),
          ),
          actions: [
            TextButton(
              onPressed: saving ? null : () => Navigator.of(dialogCtx).pop(),
              child: const Text('Cancel'),
            ),
            FilledButton(
              onPressed: saving
                  ? null
                  : () async {
                      if (titleCtrl.text.trim().isEmpty) {
                        _showActionSnackBar(dialogCtx, 'Title cannot be empty', isError: true);
                        return;
                      }
                      setDialogState(() => saving = true);
                      try {
                        await widget.api.updateTest(
                          id: testId,
                          classLabel: classCtrl.text.trim(),
                          title: titleCtrl.text.trim(),
                          subject: subjectCtrl.text.trim(),
                          topic: topicCtrl.text.trim(),
                          category: categoryValue,
                          durationMinutes: int.tryParse(durationCtrl.text.trim()) ?? 180,
                          marks: int.tryParse(marksCtrl.text.trim()) ?? 720,
                          questionCount: int.tryParse(questionCountCtrl.text.trim()) ?? 180,
                          scheduleLabel: scheduleCtrl.text.trim(),
                        );
                        if (dialogCtx.mounted) {
                          Navigator.of(dialogCtx).pop();
                        }
                        await _load();
                        if (mounted) {
                          _showActionSnackBar(context, 'Test updated successfully');
                        }
                      } catch (e) {
                        setDialogState(() => saving = false);
                        if (dialogCtx.mounted) {
                          _showActionSnackBar(dialogCtx, 'Update failed: ${_friendlyError(e)}', isError: true);
                        }
                      }
                    },
              child: _busyButtonChild(saving, 'Update Test'),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _showManageTestsDialog() async {
    if (_items.isEmpty) return;
    await showDialog<void>(
      context: context,
      builder: (dialogCtx) => StatefulBuilder(
        builder: (ctx, setDialogState) {
          return AlertDialog(
            title: Row(
              children: [
                const Icon(Icons.fact_check_rounded, color: Color(0xFFD92D20)),
                const SizedBox(width: 8),
                Text('Manage Tests (${_items.length})'),
              ],
            ),
            content: SizedBox(
              width: 600,
              child: ListView.separated(
                shrinkWrap: true,
                itemCount: _items.length,
                separatorBuilder: (_, __) => const Divider(height: 1),
                itemBuilder: (context, index) {
                  final item = _items[index] as Map<String, dynamic>;
                  final testId = _asInt(item['id'], label: 'testId');
                  final title = item['title']?.toString() ?? 'Test #$testId';
                  final subj = item['subject']?.toString() ?? '';
                  final topic = item['topic']?.toString() ?? '';
                  final cat = item['category']?.toString() ?? '';
                  return ListTile(
                    contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    leading: Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: const Color(0xFFD92D20).withValues(alpha: 0.12),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Icon(Icons.fact_check_rounded, color: Color(0xFFD92D20), size: 20),
                    ),
                    title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    subtitle: Text([if (cat.isNotEmpty) cat, if (subj.isNotEmpty) subj, if (topic.isNotEmpty) topic].join(' • '), style: const TextStyle(fontSize: 12)),
                    trailing: Wrap(
                      spacing: 4,
                      children: [
                        IconButton(
                          tooltip: 'Manage Questions',
                          icon: const Icon(Icons.list_alt_outlined, size: 20),
                          onPressed: () {
                            Navigator.of(dialogCtx).pop();
                            _openQuestionsForTest(testId);
                          },
                        ),
                        IconButton(
                          tooltip: 'Edit Test',
                          icon: const Icon(Icons.edit_outlined, size: 20),
                          onPressed: () {
                            Navigator.of(dialogCtx).pop();
                            _showEditTestDialog(item);
                          },
                        ),
                        IconButton(
                          tooltip: 'Delete Test',
                          icon: const Icon(Icons.delete_outline, size: 20, color: Color(0xFFD92D20)),
                          onPressed: () async {
                            final ok = await _confirmDeleteDialog(
                              context,
                              title: 'Delete Test?',
                              body: 'This test and its questions will be removed permanently.',
                            );
                            if (!ok) return;
                            try {
                              await widget.api.deleteTest(testId);
                              await _load();
                              if (mounted) {
                                setDialogState(() {});
                                _showActionSnackBar(context, 'Test deleted successfully');
                              }
                            } catch (_) {
                              if (mounted) {
                                _showActionSnackBar(context, 'Test delete failed', isError: true);
                              }
                            }
                          },
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(dialogCtx).pop(),
                child: const Text('Close'),
              ),
            ],
          );
        },
      ),
    );
  }

  Future<void> _showTestQuestionDialog(
    BuildContext hostContext, {
    required int testId,
    Map<String, dynamic>? initialQuestion,
    VoidCallback? onSaved,
  }) async {
    final isEdit = initialQuestion != null;
    final questionId = isEdit ? _asInt(initialQuestion['id'], label: 'questionId') : null;

    final qQuestion = TextEditingController(text: initialQuestion?['question']?.toString() ?? '');
    final qOptionA = TextEditingController(text: initialQuestion?['option_a']?.toString() ?? '');
    final qOptionB = TextEditingController(text: initialQuestion?['option_b']?.toString() ?? '');
    final qOptionC = TextEditingController(text: initialQuestion?['option_c']?.toString() ?? '');
    final qOptionD = TextEditingController(text: initialQuestion?['option_d']?.toString() ?? '');
    final qExplanation = TextEditingController(text: initialQuestion?['explanation']?.toString() ?? '');
    final qExplanationVideoLink = TextEditingController(
      text: initialQuestion?['explanation_video_link']?.toString() ??
          initialQuestion?['explanation_video_url']?.toString() ??
          '',
    );
    String qCorrect = initialQuestion?['correct_option']?.toString() ?? 'A';
    if (!const ['A', 'B', 'C', 'D'].contains(qCorrect)) qCorrect = 'A';

    File? qImage;
    String qImageLink = initialQuestion?['question_image_link']?.toString() ?? '';
    File? qExplanationImage;
    String qExplanationImageLink = initialQuestion?['explanation_image_link']?.toString() ?? '';
    File? qOptionAImage;
    String qOptionAImageLink = initialQuestion?['option_a_image_link']?.toString() ?? '';
    File? qOptionBImage;
    String qOptionBImageLink = initialQuestion?['option_b_image_link']?.toString() ?? '';
    File? qOptionCImage;
    String qOptionCImageLink = initialQuestion?['option_c_image_link']?.toString() ?? '';
    File? qOptionDImage;
    String qOptionDImageLink = initialQuestion?['option_d_image_link']?.toString() ?? '';

    // Similar Question
    final qSimilarQuestion = TextEditingController();
    final qSimilarOptionA = TextEditingController();
    final qSimilarOptionB = TextEditingController();
    final qSimilarOptionC = TextEditingController();
    final qSimilarOptionD = TextEditingController();
    final qSimilarExplanation = TextEditingController();
    String qSimilarCorrect = 'A';
    bool qShowSimilarQuestion = false;
    File? qSimilarQuestionImage;
    String qSimilarQuestionImageLink = '';
    File? qSimilarExplanationImage;
    String qSimilarExplanationImageLink = '';
    final List<File> qSimilarPendingExtraExplanationImages = [];
    final List<String> qSimilarExistingExplanationImages = [];

    final sq = initialQuestion?['similar_question'];
    Map<String, dynamic>? sqMap;
    if (sq is Map) {
      sqMap = Map<String, dynamic>.from(sq);
    } else if (sq is String && sq.trim().isNotEmpty) {
      try {
        final dec = jsonDecode(sq);
        if (dec is Map) sqMap = Map<String, dynamic>.from(dec);
      } catch (_) {}
    }
    if (sqMap != null && (sqMap['question']?.toString().trim().isNotEmpty ?? false)) {
      qSimilarQuestion.text = sqMap['question']?.toString() ?? '';
      qSimilarOptionA.text = sqMap['option_a']?.toString() ?? sqMap['optionA']?.toString() ?? '';
      qSimilarOptionB.text = sqMap['option_b']?.toString() ?? sqMap['optionB']?.toString() ?? '';
      qSimilarOptionC.text = sqMap['option_c']?.toString() ?? sqMap['optionC']?.toString() ?? '';
      qSimilarOptionD.text = sqMap['option_d']?.toString() ?? sqMap['optionD']?.toString() ?? '';
      qSimilarCorrect = sqMap['correct_option']?.toString() ?? sqMap['correctOption']?.toString() ?? 'A';
      if (!const ['A', 'B', 'C', 'D'].contains(qSimilarCorrect)) qSimilarCorrect = 'A';
      qSimilarExplanation.text = sqMap['explanation']?.toString() ?? '';
      qSimilarQuestionImageLink = sqMap['question_image_link']?.toString() ?? sqMap['image_url']?.toString() ?? '';
      qSimilarExplanationImageLink = sqMap['explanation_image_link']?.toString() ?? '';
      final rawExtra = sqMap['explanation_images'] ?? sqMap['explanation_images_list'];
      if (rawExtra is List) {
        for (final item in rawExtra) {
          final s = (item is String ? item : (item is Map ? (item['image_url'] ?? item['imageLink'] ?? '') : '')).toString().trim();
          if (s.isNotEmpty) qSimilarExistingExplanationImages.add(s);
        }
      }
      qShowSimilarQuestion = true;
    }

    bool saving = false;

    await showDialog<void>(
      context: hostContext,
      barrierDismissible: false,
      builder: (dialogCtx) => StatefulBuilder(
        builder: (ctx, setDialogState) => AlertDialog(
          title: Row(
            children: [
              Icon(isEdit ? Icons.edit_note_rounded : Icons.add_circle_outline, color: const Color(0xFFD92D20)),
              const SizedBox(width: 8),
              Expanded(
                child: Text(isEdit ? 'Edit Test Question' : 'Add Test Question'),
              ),
            ],
          ),
          content: SizedBox(
            width: 560,
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  TextField(
                    controller: qQuestion,
                    minLines: 2,
                    maxLines: 4,
                    decoration: const InputDecoration(
                      labelText: 'Question *',
                      hintText: 'Enter question text',
                    ),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: qOptionA,
                    decoration: const InputDecoration(labelText: 'Option A *'),
                  ),
                  _buildOptionImagePickerRow(
                    label: 'Option A',
                    file: qOptionAImage,
                    imageLink: qOptionAImageLink,
                    onPick: (file) => setDialogState(() => qOptionAImage = file),
                    onRemove: () => setDialogState(() {
                      qOptionAImage = null;
                      qOptionAImageLink = '';
                    }),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: qOptionB,
                    decoration: const InputDecoration(labelText: 'Option B *'),
                  ),
                  _buildOptionImagePickerRow(
                    label: 'Option B',
                    file: qOptionBImage,
                    imageLink: qOptionBImageLink,
                    onPick: (file) => setDialogState(() => qOptionBImage = file),
                    onRemove: () => setDialogState(() {
                      qOptionBImage = null;
                      qOptionBImageLink = '';
                    }),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: qOptionC,
                    decoration: const InputDecoration(labelText: 'Option C *'),
                  ),
                  _buildOptionImagePickerRow(
                    label: 'Option C',
                    file: qOptionCImage,
                    imageLink: qOptionCImageLink,
                    onPick: (file) => setDialogState(() => qOptionCImage = file),
                    onRemove: () => setDialogState(() {
                      qOptionCImage = null;
                      qOptionCImageLink = '';
                    }),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: qOptionD,
                    decoration: const InputDecoration(labelText: 'Option D *'),
                  ),
                  _buildOptionImagePickerRow(
                    label: 'Option D',
                    file: qOptionDImage,
                    imageLink: qOptionDImageLink,
                    onPick: (file) => setDialogState(() => qOptionDImage = file),
                    onRemove: () => setDialogState(() {
                      qOptionDImage = null;
                      qOptionDImageLink = '';
                    }),
                  ),
                  const SizedBox(height: 8),
                  DropdownButtonFormField<String>(
                    value: qCorrect,
                    items: const [
                      DropdownMenuItem(value: 'A', child: Text('Correct Option: A')),
                      DropdownMenuItem(value: 'B', child: Text('Correct Option: B')),
                      DropdownMenuItem(value: 'C', child: Text('Correct Option: C')),
                      DropdownMenuItem(value: 'D', child: Text('Correct Option: D')),
                    ],
                    onChanged: (v) => setDialogState(() => qCorrect = v ?? 'A'),
                    decoration: const InputDecoration(labelText: 'Correct Option *'),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: qExplanation,
                    minLines: 2,
                    maxLines: 6,
                    decoration: const InputDecoration(
                      labelText: 'Explanation (optional)',
                      alignLabelWithHint: true,
                    ),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: qExplanationVideoLink,
                    decoration: const InputDecoration(
                      labelText: 'Explanation Video Link (YouTube / Drive / MP4 URL)',
                      hintText: 'e.g. https://www.youtube.com/watch?... or Google Drive link',
                      prefixIcon: Icon(Icons.smart_display_outlined),
                    ),
                  ),
                  const SizedBox(height: 8),
                  // Question image
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          qImage == null
                              ? (qImageLink.isEmpty ? 'No question image' : 'Question image uploaded')
                              : qImage!.path.split(Platform.pathSeparator).last,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(fontSize: 12),
                        ),
                      ),
                      TextButton(
                        onPressed: () async {
                          final result = await FilePicker.platform.pickFiles(type: FileType.image);
                          if (result?.files.single.path == null) return;
                          setDialogState(() => qImage = File(result!.files.single.path!));
                        },
                        child: const Text('Pick Image'),
                      ),
                      if (qImage != null || qImageLink.isNotEmpty)
                        TextButton(
                          onPressed: () => setDialogState(() {
                            qImage = null;
                            qImageLink = '';
                          }),
                          child: const Text('Remove', style: TextStyle(color: Colors.red)),
                        ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  // Explanation image
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          qExplanationImage == null
                              ? (qExplanationImageLink.isEmpty ? 'No explanation image' : 'Explanation image uploaded')
                              : qExplanationImage!.path.split(Platform.pathSeparator).last,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(fontSize: 12),
                        ),
                      ),
                      TextButton(
                        onPressed: () async {
                          final result = await FilePicker.platform.pickFiles(type: FileType.image);
                          if (result?.files.single.path == null) return;
                          setDialogState(() => qExplanationImage = File(result!.files.single.path!));
                        },
                        child: const Text('Pick Image'),
                      ),
                      if (qExplanationImage != null || qExplanationImageLink.isNotEmpty)
                        TextButton(
                          onPressed: () => setDialogState(() {
                            qExplanationImage = null;
                            qExplanationImageLink = '';
                          }),
                          child: const Text('Remove', style: TextStyle(color: Colors.red)),
                        ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  // Similar Question Section
                  Container(
                    decoration: BoxDecoration(
                      color: Theme.of(ctx).cardColor,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(
                        color: qSimilarQuestion.text.trim().isNotEmpty
                            ? Colors.indigo.shade400
                            : Theme.of(ctx).colorScheme.outlineVariant,
                      ),
                    ),
                    child: ExpansionTile(
                      initiallyExpanded: qShowSimilarQuestion,
                      onExpansionChanged: (v) => setDialogState(() => qShowSimilarQuestion = v),
                      leading: const Icon(Icons.help_center_outlined, color: Color(0xFF4F46E5)),
                      title: Row(
                        children: [
                          const Text('Solve Similar Question', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                          const SizedBox(width: 8),
                          if (qSimilarQuestion.text.trim().isNotEmpty)
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                              decoration: BoxDecoration(
                                color: Colors.green.withValues(alpha: 0.15),
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: const Text('Added', style: TextStyle(color: Colors.green, fontSize: 10, fontWeight: FontWeight.bold)),
                            )
                          else
                            Text('(Optional)', style: TextStyle(fontSize: 11, color: Colors.grey.shade600)),
                        ],
                      ),
                      children: [
                        Padding(
                          padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                          child: Column(
                            children: [
                              TextField(
                                controller: qSimilarQuestion,
                                minLines: 2,
                                maxLines: 4,
                                decoration: const InputDecoration(
                                  labelText: 'Similar Question text',
                                  hintText: 'Enter parallel question on this concept',
                                ),
                              ),
                              const SizedBox(height: 8),
                              TextField(controller: qSimilarOptionA, decoration: const InputDecoration(labelText: 'Similar Option A')),
                              const SizedBox(height: 8),
                              TextField(controller: qSimilarOptionB, decoration: const InputDecoration(labelText: 'Similar Option B')),
                              const SizedBox(height: 8),
                              TextField(controller: qSimilarOptionC, decoration: const InputDecoration(labelText: 'Similar Option C')),
                              const SizedBox(height: 8),
                              TextField(controller: qSimilarOptionD, decoration: const InputDecoration(labelText: 'Similar Option D')),
                              const SizedBox(height: 8),
                              DropdownButtonFormField<String>(
                                value: qSimilarCorrect,
                                items: const [
                                  DropdownMenuItem(value: 'A', child: Text('Correct: A')),
                                  DropdownMenuItem(value: 'B', child: Text('Correct: B')),
                                  DropdownMenuItem(value: 'C', child: Text('Correct: C')),
                                  DropdownMenuItem(value: 'D', child: Text('Correct: D')),
                                ],
                                onChanged: (v) => setDialogState(() => qSimilarCorrect = v ?? 'A'),
                                decoration: const InputDecoration(labelText: 'Correct Option for Similar Question'),
                              ),
                              const SizedBox(height: 8),
                              TextField(
                                controller: qSimilarExplanation,
                                minLines: 2,
                                maxLines: 4,
                                decoration: const InputDecoration(labelText: 'Explanation for Similar Question'),
                              ),
                              const SizedBox(height: 10),
                              // Similar Question Image
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      qSimilarQuestionImage == null
                                          ? (qSimilarQuestionImageLink.isEmpty
                                              ? 'No similar question image'
                                              : 'Similar question image uploaded')
                                          : qSimilarQuestionImage!.path.split(Platform.pathSeparator).last,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(fontSize: 12),
                                    ),
                                  ),
                                  TextButton(
                                    onPressed: () async {
                                      final result = await FilePicker.platform.pickFiles(type: FileType.image);
                                      if (result?.files.single.path == null) return;
                                      setDialogState(() => qSimilarQuestionImage = File(result!.files.single.path!));
                                    },
                                    child: const Text('Pick Image'),
                                  ),
                                  if (qSimilarQuestionImage != null || qSimilarQuestionImageLink.isNotEmpty)
                                    TextButton(
                                      onPressed: () => setDialogState(() {
                                        qSimilarQuestionImage = null;
                                        qSimilarQuestionImageLink = '';
                                      }),
                                      child: const Text('Remove', style: TextStyle(color: Colors.red)),
                                    ),
                                ],
                              ),
                              const SizedBox(height: 6),
                              // Similar Question Explanation Image
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      qSimilarExplanationImage == null
                                          ? (qSimilarExplanationImageLink.isEmpty
                                              ? 'No similar explanation image'
                                              : 'Similar explanation image uploaded')
                                          : qSimilarExplanationImage!.path.split(Platform.pathSeparator).last,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(fontSize: 12),
                                    ),
                                  ),
                                  TextButton(
                                    onPressed: () async {
                                      final result = await FilePicker.platform.pickFiles(type: FileType.image);
                                      if (result?.files.single.path == null) return;
                                      setDialogState(() => qSimilarExplanationImage = File(result!.files.single.path!));
                                    },
                                    child: const Text('Pick Image'),
                                  ),
                                  if (qSimilarExplanationImage != null || qSimilarExplanationImageLink.isNotEmpty)
                                    TextButton(
                                      onPressed: () => setDialogState(() {
                                        qSimilarExplanationImage = null;
                                        qSimilarExplanationImageLink = '';
                                      }),
                                      child: const Text('Remove', style: TextStyle(color: Colors.red)),
                                    ),
                                ],
                              ),
                              const SizedBox(height: 8),
                              // Multiple Explanation Images for Similar Question
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      qSimilarPendingExtraExplanationImages.isEmpty && qSimilarExistingExplanationImages.isEmpty
                                          ? 'No extra explanation images'
                                          : '${qSimilarExistingExplanationImages.length} saved, ${qSimilarPendingExtraExplanationImages.length} ready to upload',
                                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
                                    ),
                                  ),
                                  TextButton.icon(
                                    icon: const Icon(Icons.add_photo_alternate_outlined, size: 16),
                                    label: const Text('Add Images'),
                                    onPressed: () async {
                                      final result = await FilePicker.platform.pickFiles(
                                        type: FileType.image,
                                        allowMultiple: true,
                                      );
                                      if (result == null) return;
                                      setDialogState(() {
                                        for (final f in result.files) {
                                          if (f.path != null) {
                                            qSimilarPendingExtraExplanationImages.add(File(f.path!));
                                          }
                                        }
                                      });
                                    },
                                  ),
                                ],
                              ),
                              if (qSimilarExistingExplanationImages.isNotEmpty) ...[
                                ...qSimilarExistingExplanationImages.asMap().entries.map((entry) {
                                  final idx = entry.key;
                                  return ListTile(
                                    dense: true,
                                    contentPadding: EdgeInsets.zero,
                                    leading: const Icon(Icons.image_outlined, size: 18),
                                    title: Text('Saved Explanation Image #${idx + 1}', style: const TextStyle(fontSize: 12)),
                                    trailing: IconButton(
                                      icon: const Icon(Icons.delete_outline_rounded, size: 18, color: Colors.red),
                                      onPressed: () => setDialogState(() => qSimilarExistingExplanationImages.removeAt(idx)),
                                    ),
                                  );
                                }),
                              ],
                              if (qSimilarPendingExtraExplanationImages.isNotEmpty) ...[
                                ...qSimilarPendingExtraExplanationImages.asMap().entries.map((entry) {
                                  final idx = entry.key;
                                  final file = entry.value;
                                  return ListTile(
                                    dense: true,
                                    contentPadding: EdgeInsets.zero,
                                    leading: const Icon(Icons.add_photo_alternate_outlined, size: 18, color: Colors.indigo),
                                    title: Text(file.path.split(Platform.pathSeparator).last, style: const TextStyle(fontSize: 12)),
                                    trailing: IconButton(
                                      icon: const Icon(Icons.close_rounded, size: 18, color: Colors.red),
                                      onPressed: () => setDialogState(() => qSimilarPendingExtraExplanationImages.removeAt(idx)),
                                    ),
                                  );
                                }),
                              ],
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          actions: [
            TextButton(
              onPressed: saving ? null : () => Navigator.of(dialogCtx).pop(),
              child: const Text('Cancel'),
            ),
            FilledButton(
              onPressed: saving
                  ? null
                  : () async {
                      if (qQuestion.text.trim().isEmpty ||
                          qOptionA.text.trim().isEmpty ||
                          qOptionB.text.trim().isEmpty ||
                          qOptionC.text.trim().isEmpty ||
                          qOptionD.text.trim().isEmpty) {
                        _showActionSnackBar(dialogCtx, 'Please fill question and all options (A, B, C, D)', isError: true);
                        return;
                      }

                      setDialogState(() => saving = true);
                      try {
                        var imgLink = qImageLink;
                        var expImgLink = qExplanationImageLink;
                        final vidLink = qExplanationVideoLink.text.trim();

                        final currentTest = _items.firstWhere(
                          (x) => _asInt((x as Map)['id']) == testId,
                          orElse: () => null,
                        );
                        final bId = currentTest != null ? _asInt(currentTest['batch_id'] ?? _batchId) : _batchId;
                        final effectiveBatchId = bId ?? (_batches.isNotEmpty ? _asInt((_batches.first as Map)['id']) : null);
                        final cls = currentTest != null ? currentTest['class_label']?.toString() ?? '' : _classLabel.text.trim();
                        final sbj = currentTest != null ? currentTest['subject']?.toString() ?? '' : _subject.text.trim();
                        final tpc = currentTest != null ? currentTest['topic']?.toString() ?? '' : _topic.text.trim();

                        Map<String, dynamic>? simData;
                        if (qSimilarQuestion.text.trim().isNotEmpty) {
                          if (effectiveBatchId != null) {
                            if (qSimilarQuestionImage != null) {
                              if (!await _validateImageFile(dialogCtx, qSimilarQuestionImage!)) {
                                throw Exception('Similar question image too large');
                              }
                              qSimilarQuestionImageLink = await widget.api.uploadQuestionImage(
                                batchId: effectiveBatchId,
                                classLabel: cls,
                                subject: sbj,
                                topic: tpc.isEmpty ? 'Test Questions' : tpc,
                                file: qSimilarQuestionImage!,
                                contentType: 'similar_question',
                                contentId: testId,
                              );
                            }
                            if (qSimilarExplanationImage != null) {
                              if (!await _validateImageFile(dialogCtx, qSimilarExplanationImage!)) {
                                throw Exception('Similar explanation image too large');
                              }
                              qSimilarExplanationImageLink = await widget.api.uploadQuestionImage(
                                batchId: effectiveBatchId,
                                classLabel: cls,
                                subject: sbj,
                                topic: tpc.isEmpty ? 'Test Questions' : tpc,
                                file: qSimilarExplanationImage!,
                                contentType: 'similar_explanation',
                                contentId: testId,
                              );
                            }
                            if (qSimilarPendingExtraExplanationImages.isNotEmpty) {
                              for (final extraFile in qSimilarPendingExtraExplanationImages) {
                                if (!await _validateImageFile(dialogCtx, extraFile)) {
                                  throw Exception('Similar explanation image too large');
                                }
                                final extraLink = await widget.api.uploadQuestionImage(
                                  batchId: effectiveBatchId,
                                  classLabel: cls,
                                  subject: sbj,
                                  topic: tpc.isEmpty ? 'Test Questions' : tpc,
                                  file: extraFile,
                                  contentType: 'similar_explanation_extra',
                                  contentId: testId,
                                );
                                if (extraLink.isNotEmpty) {
                                  qSimilarExistingExplanationImages.add(extraLink);
                                }
                              }
                              qSimilarPendingExtraExplanationImages.clear();
                            }
                          }

                          simData = {
                            'question': qSimilarQuestion.text.trim(),
                            'option_a': qSimilarOptionA.text.trim(),
                            'option_b': qSimilarOptionB.text.trim(),
                            'option_c': qSimilarOptionC.text.trim(),
                            'option_d': qSimilarOptionD.text.trim(),
                            'correct_option': qSimilarCorrect,
                            'explanation': qSimilarExplanation.text.trim(),
                            if (qSimilarQuestionImageLink.isNotEmpty) 'question_image_link': qSimilarQuestionImageLink,
                            if (qSimilarExplanationImageLink.isNotEmpty) 'explanation_image_link': qSimilarExplanationImageLink,
                            if (qSimilarExistingExplanationImages.isNotEmpty) 'explanation_images': qSimilarExistingExplanationImages,
                          };
                        }

                        if (effectiveBatchId != null) {
                          if (qOptionAImage != null) {
                            if (!await _validateImageFile(dialogCtx, qOptionAImage!)) {
                              throw Exception('Option A image too large');
                            }
                            qOptionAImageLink = await widget.api.uploadQuestionImage(
                              batchId: effectiveBatchId,
                              classLabel: cls,
                              subject: sbj,
                              topic: tpc.isEmpty ? 'Test Questions' : tpc,
                              file: qOptionAImage!,
                              contentType: 'test_option_a',
                              contentId: testId,
                            );
                          }
                          if (qOptionBImage != null) {
                            if (!await _validateImageFile(dialogCtx, qOptionBImage!)) {
                              throw Exception('Option B image too large');
                            }
                            qOptionBImageLink = await widget.api.uploadQuestionImage(
                              batchId: effectiveBatchId,
                              classLabel: cls,
                              subject: sbj,
                              topic: tpc.isEmpty ? 'Test Questions' : tpc,
                              file: qOptionBImage!,
                              contentType: 'test_option_b',
                              contentId: testId,
                            );
                          }
                          if (qOptionCImage != null) {
                            if (!await _validateImageFile(dialogCtx, qOptionCImage!)) {
                              throw Exception('Option C image too large');
                            }
                            qOptionCImageLink = await widget.api.uploadQuestionImage(
                              batchId: effectiveBatchId,
                              classLabel: cls,
                              subject: sbj,
                              topic: tpc.isEmpty ? 'Test Questions' : tpc,
                              file: qOptionCImage!,
                              contentType: 'test_option_c',
                              contentId: testId,
                            );
                          }
                          if (qOptionDImage != null) {
                            if (!await _validateImageFile(dialogCtx, qOptionDImage!)) {
                              throw Exception('Option D image too large');
                            }
                            qOptionDImageLink = await widget.api.uploadQuestionImage(
                              batchId: effectiveBatchId,
                              classLabel: cls,
                              subject: sbj,
                              topic: tpc.isEmpty ? 'Test Questions' : tpc,
                              file: qOptionDImage!,
                              contentType: 'test_option_d',
                              contentId: testId,
                            );
                          }
                        }

                        if (!isEdit) {
                          if (dialogCtx.mounted && qImage != null && !await _validateImageFile(dialogCtx, qImage!)) {
                            throw Exception('Question image too large');
                          }
                          if (dialogCtx.mounted && qExplanationImage != null && !await _validateImageFile(dialogCtx, qExplanationImage!)) {
                            throw Exception('Explanation image too large');
                          }
                          if (qImage != null || qExplanationImage != null) {
                            await widget.api.addTestQuestionWithMedia(
                              testId: testId,
                              question: qQuestion.text.trim(),
                              optionA: qOptionA.text.trim(),
                              optionB: qOptionB.text.trim(),
                              optionC: qOptionC.text.trim(),
                              optionD: qOptionD.text.trim(),
                              correctOption: qCorrect,
                              explanation: qExplanation.text.trim(),
                              subject: sbj,
                              questionImage: qImage,
                              explanationImage: qExplanationImage,
                              questionImageLink: imgLink,
                              explanationImageLink: expImgLink,
                              explanationVideoLink: vidLink,
                              optionAImageLink: qOptionAImageLink,
                              optionBImageLink: qOptionBImageLink,
                              optionCImageLink: qOptionCImageLink,
                              optionDImageLink: qOptionDImageLink,
                              similarQuestion: simData,
                            );
                          } else {
                            await widget.api.addTestQuestion(
                              testId: testId,
                              question: qQuestion.text.trim(),
                              optionA: qOptionA.text.trim(),
                              optionB: qOptionB.text.trim(),
                              optionC: qOptionC.text.trim(),
                              optionD: qOptionD.text.trim(),
                              correctOption: qCorrect,
                              explanation: qExplanation.text.trim(),
                              subject: sbj,
                              questionImageLink: imgLink,
                              explanationImageLink: expImgLink,
                              explanationVideoLink: vidLink,
                              optionAImageLink: qOptionAImageLink,
                              optionBImageLink: qOptionBImageLink,
                              optionCImageLink: qOptionCImageLink,
                              optionDImageLink: qOptionDImageLink,
                              similarQuestion: simData,
                            );
                          }
                        } else {
                          final currentTest = _items.firstWhere(
                            (x) => _asInt((x as Map)['id']) == testId,
                            orElse: () => null,
                          );
                          final bId = currentTest != null ? _asInt(currentTest['batch_id'] ?? _batchId) : _batchId;
                          final cls = currentTest != null ? currentTest['class_label']?.toString() ?? '' : _classLabel.text.trim();
                          final sbj = currentTest != null ? currentTest['subject']?.toString() ?? '' : _subject.text.trim();
                          final tpc = currentTest != null ? currentTest['topic']?.toString() ?? '' : _topic.text.trim();

                          if (bId != null) {
                            final uploads = <Future<void>>[];
                            if (qImage != null) {
                              uploads.add(() async {
                                if (!await _validateImageFile(dialogCtx, qImage!)) {
                                  throw Exception('Question image too large');
                                }
                                imgLink = await widget.api.uploadQuestionImage(
                                  batchId: bId,
                                  classLabel: cls,
                                  subject: sbj,
                                  topic: tpc.isEmpty ? 'Test Questions' : tpc,
                                  file: qImage!,
                                  contentType: 'test',
                                  contentId: testId,
                                );
                              }());
                            }
                            if (qExplanationImage != null) {
                              uploads.add(() async {
                                if (!await _validateImageFile(dialogCtx, qExplanationImage!)) {
                                  throw Exception('Explanation image too large');
                                }
                                expImgLink = await widget.api.uploadQuestionImage(
                                  batchId: bId,
                                  classLabel: cls,
                                  subject: sbj,
                                  topic: tpc.isEmpty ? 'Test Questions' : tpc,
                                  file: qExplanationImage!,
                                  contentType: 'test_explanation',
                                  contentId: testId,
                                );
                              }());
                            }
                            if (uploads.isNotEmpty) {
                              await Future.wait(uploads);
                            }
                          }
                          await widget.api.updateTestQuestion(
                            id: questionId!,
                            question: qQuestion.text.trim(),
                            optionA: qOptionA.text.trim(),
                            optionB: qOptionB.text.trim(),
                            optionC: qOptionC.text.trim(),
                            optionD: qOptionD.text.trim(),
                            correctOption: qCorrect,
                            explanation: qExplanation.text.trim(),
                            subject: sbj,
                            questionImageLink: imgLink,
                            explanationImageLink: expImgLink,
                            explanationVideoLink: vidLink,
                            optionAImageLink: qOptionAImageLink,
                            optionBImageLink: qOptionBImageLink,
                            optionCImageLink: qOptionCImageLink,
                            optionDImageLink: qOptionDImageLink,
                            similarQuestion: simData,
                          );
                        }

                        if (dialogCtx.mounted) {
                          Navigator.of(dialogCtx).pop();
                        }
                        onSaved?.call();
                        if (hostContext.mounted) {
                          _showActionSnackBar(
                            hostContext,
                            isEdit ? 'Test question updated successfully' : 'Test question added successfully',
                          );
                        }
                      } catch (e) {
                        setDialogState(() => saving = false);
                        if (dialogCtx.mounted) {
                          _showActionSnackBar(dialogCtx, 'Save failed: ${_friendlyError(e)}', isError: true);
                        }
                      }
                    },
              child: _busyButtonChild(saving, isEdit ? 'Update Question' : 'Save Question'),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _openQuestionsForTest(int testId) async {
    try {
      setState(() => _selectedTestId = testId);
      List<dynamic> qs = await widget.api.testQuestions(testId);
      if (!mounted) return;

      final testObj = _items.firstWhere(
        (x) => _asInt((x as Map)['id']) == testId,
        orElse: () => null,
      );
      final testTitle = testObj != null ? (testObj['title']?.toString() ?? '') : '';

      final screenWidth = MediaQuery.sizeOf(context).width;
      final dialogWidth = (screenWidth > 900 ? 900.0 : (screenWidth * 0.95)).clamp(400.0, 950.0);
      final dialogHeight = (MediaQuery.sizeOf(context).height * 0.88).clamp(450.0, 850.0);

      await showDialog<void>(
        context: context,
        barrierDismissible: true,
        builder: (dialogCtx) => StatefulBuilder(
          builder: (ctx, setDialogState) {
            Future<void> reloadQuestions() async {
              try {
                final updated = await widget.api.testQuestions(testId);
                setDialogState(() => qs = updated);
              } catch (_) {}
            }

            return Dialog(
              backgroundColor: Theme.of(context).scaffoldBackgroundColor,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              insetPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
              child: SizedBox(
                width: dialogWidth,
                height: dialogHeight,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 14, 14, 12),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Row(
                                  children: [
                                    const Icon(Icons.fact_check_rounded, color: Color(0xFFD92D20), size: 22),
                                    const SizedBox(width: 8),
                                    Flexible(
                                      child: Text(
                                        'Test Questions (${qs.length})',
                                        style: const TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                  ],
                                ),
                                if (testTitle.isNotEmpty)
                                  Padding(
                                    padding: const EdgeInsets.only(top: 4, left: 30),
                                    child: Text(
                                      testTitle,
                                      style: TextStyle(
                                        fontSize: 13,
                                        color: Theme.of(context).colorScheme.onSurfaceVariant,
                                      ),
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 12),
                          FilledButton.icon(
                            onPressed: () {
                              _showTestQuestionDialog(
                                context,
                                testId: testId,
                                onSaved: reloadQuestions,
                              );
                            },
                            icon: const Icon(Icons.add, size: 18),
                            label: const Text('Add Question'),
                          ),
                          const SizedBox(width: 8),
                          IconButton(
                            icon: const Icon(Icons.close),
                            tooltip: 'Close',
                            onPressed: () => Navigator.of(dialogCtx).pop(),
                          ),
                        ],
                      ),
                    ),
                    const Divider(height: 1),
                    Expanded(
                      child: ListView(
                        padding: const EdgeInsets.all(16),
                        children: [
                          if (qs.isEmpty)
                            Padding(
                              padding: const EdgeInsets.symmetric(vertical: 40),
                              child: Center(
                                child: Column(
                                  children: [
                                    Icon(Icons.quiz_outlined, size: 48, color: Colors.grey.shade400),
                                    const SizedBox(height: 12),
                                    const Text(
                                      'No questions added to this test yet.',
                                      style: TextStyle(fontSize: 14),
                                    ),
                                    const SizedBox(height: 14),
                                    FilledButton.tonalIcon(
                                      onPressed: () {
                                        _showTestQuestionDialog(
                                          context,
                                          testId: testId,
                                          onSaved: reloadQuestions,
                                        );
                                      },
                                      icon: const Icon(Icons.add),
                                      label: const Text('Add Question Now'),
                                    ),
                                  ],
                                ),
                              ),
                            )
                          else
                            ...qs.asMap().entries.map((entry) {
                              final idx = entry.key;
                              final question = entry.value as Map<String, dynamic>;
                              final qId = _asInt(question['id'], label: 'questionId');
                              final correctOpt = (question['correct_option'] ?? '').toString().toUpperCase();

                              return Card(
                                margin: const EdgeInsets.only(bottom: 12),
                                elevation: 1,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                  side: BorderSide(color: Theme.of(context).colorScheme.outlineVariant),
                                ),
                                child: Padding(
                                  padding: const EdgeInsets.all(16),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        children: [
                                          Container(
                                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                            decoration: BoxDecoration(
                                              color: const Color(0xFFD92D20).withValues(alpha: 0.12),
                                              borderRadius: BorderRadius.circular(6),
                                            ),
                                            child: Text(
                                              'Q${idx + 1}',
                                              style: const TextStyle(
                                                fontWeight: FontWeight.bold,
                                                fontSize: 12,
                                                color: Color(0xFFD92D20),
                                              ),
                                            ),
                                          ),
                                          const SizedBox(width: 8),
                                          Container(
                                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                            decoration: BoxDecoration(
                                              color: Colors.green.withValues(alpha: 0.12),
                                              borderRadius: BorderRadius.circular(6),
                                              border: Border.all(color: Colors.green.withValues(alpha: 0.3)),
                                            ),
                                            child: Text(
                                              'Correct: Option $correctOpt',
                                              style: const TextStyle(
                                                fontSize: 11,
                                                fontWeight: FontWeight.bold,
                                                color: Colors.green,
                                              ),
                                            ),
                                          ),
                                          if (question['similar_question'] != null) ...[
                                            const SizedBox(width: 8),
                                            Container(
                                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                              decoration: BoxDecoration(
                                                color: Colors.indigo.withValues(alpha: 0.12),
                                                borderRadius: BorderRadius.circular(6),
                                              ),
                                              child: const Text(
                                                'Similar Q Added',
                                                style: TextStyle(
                                                  fontSize: 11,
                                                  color: Colors.indigo,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                            ),
                                          ],
                                        ],
                                      ),
                                      const SizedBox(height: 10),
                                      Text(
                                        question['question']?.toString() ?? '',
                                        style: const TextStyle(
                                          fontWeight: FontWeight.w600,
                                          fontSize: 14,
                                          height: 1.4,
                                        ),
                                      ),
                                      const SizedBox(height: 10),
                                      Container(
                                        padding: const EdgeInsets.all(10),
                                        decoration: BoxDecoration(
                                          color: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.4),
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            for (final opt in ['A', 'B', 'C', 'D']) ...[
                                              Builder(builder: (c) {
                                                final optKey = 'option_${opt.toLowerCase()}';
                                                final optText = question[optKey]?.toString() ?? '';
                                                final optImg = question['option_${opt.toLowerCase()}_image_link']?.toString() ?? '';
                                                if (optText.isEmpty && optImg.isEmpty) return const SizedBox.shrink();
                                                final isCorrect = correctOpt == opt;
                                                return Padding(
                                                  padding: const EdgeInsets.symmetric(vertical: 3),
                                                  child: Column(
                                                    crossAxisAlignment: CrossAxisAlignment.start,
                                                    children: [
                                                      Row(
                                                        crossAxisAlignment: CrossAxisAlignment.start,
                                                        children: [
                                                          Text(
                                                            '($opt) ',
                                                            style: TextStyle(
                                                              fontWeight: FontWeight.bold,
                                                              fontSize: 12,
                                                              color: isCorrect ? Colors.green : Theme.of(context).colorScheme.onSurfaceVariant,
                                                            ),
                                                          ),
                                                          Expanded(
                                                            child: Text(
                                                              optText,
                                                              style: TextStyle(
                                                                fontSize: 12,
                                                                fontWeight: isCorrect ? FontWeight.w600 : FontWeight.normal,
                                                                color: isCorrect ? Colors.green : null,
                                                              ),
                                                            ),
                                                          ),
                                                        ],
                                                      ),
                                                      if (optImg.isNotEmpty) ...[
                                                        const SizedBox(height: 4),
                                                        ClipRRect(
                                                          borderRadius: BorderRadius.circular(6),
                                                          child: FastNetworkImage(
                                                            url: optImg,
                                                            height: 80,
                                                            fit: BoxFit.contain,
                                                            thumbWidth: 300,
                                                          ),
                                                        ),
                                                      ],
                                                    ],
                                                  ),
                                                );
                                              }),
                                            ],
                                          ],
                                        ),
                                      ),
                                      if ((question['explanation']?.toString().trim().isNotEmpty ?? false)) ...[
                                        const SizedBox(height: 8),
                                        Text(
                                          'Explanation: ${question['explanation']}',
                                          style: TextStyle(
                                            fontSize: 12,
                                            fontStyle: FontStyle.italic,
                                            color: Theme.of(context).colorScheme.onSurfaceVariant,
                                          ),
                                        ),
                                      ],
                                      if ((question['explanation_video_link']?.toString().trim().isNotEmpty ?? false) ||
                                          (question['explanation_video_url']?.toString().trim().isNotEmpty ?? false)) ...[
                                        const SizedBox(height: 6),
                                        Row(
                                          children: [
                                            const Icon(Icons.smart_display_outlined, size: 16, color: Colors.blue),
                                            const SizedBox(width: 4),
                                            Expanded(
                                              child: Text(
                                                'Video: ${(question['explanation_video_link'] ?? question['explanation_video_url']).toString()}',
                                                style: const TextStyle(fontSize: 11, color: Colors.blue),
                                                maxLines: 1,
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ],
                                      if (hasQuestionImage(question)) ...[
                                        const SizedBox(height: 10),
                                        ClipRRect(
                                          borderRadius: BorderRadius.circular(8),
                                          child: FastNetworkImage(
                                            url: questionImageRawUrl(question),
                                            height: 140,
                                            width: double.infinity,
                                            fit: BoxFit.contain,
                                            thumbWidth: 600,
                                          ),
                                        ),
                                      ],
                                      const SizedBox(height: 12),
                                      Wrap(
                                        spacing: 8,
                                        runSpacing: 6,
                                        children: [
                                          FilledButton.tonalIcon(
                                            onPressed: () {
                                              _showTestQuestionDialog(
                                                context,
                                                testId: testId,
                                                initialQuestion: question,
                                                onSaved: reloadQuestions,
                                              );
                                            },
                                            icon: const Icon(Icons.edit_outlined, size: 16),
                                            label: const Text('Edit Question'),
                                          ),
                                          OutlinedButton.icon(
                                            onPressed: () async {
                                              List<dynamic> existingSets = [];
                                              try {
                                                final res = await widget.api.practiceSets();
                                                existingSets = (res['practiceSets'] as List<dynamic>?) ?? [];
                                              } catch (_) {}

                                              if (!context.mounted) return;

                                              final targetSetId = await showDialog<int?>(
                                                context: context,
                                                builder: (dialogContext) => AlertDialog(
                                                  title: const Text('Move to Practice Set'),
                                                  content: SizedBox(
                                                    width: double.maxFinite,
                                                    child: ListView(
                                                      shrinkWrap: true,
                                                      children: [
                                                        ListTile(
                                                          leading: const Icon(Icons.auto_awesome, color: Colors.deepPurple),
                                                          title: const Text('Auto-match / Create New'),
                                                          subtitle: const Text('Smartly matches existing set or creates a new one'),
                                                          onTap: () => Navigator.of(dialogContext).pop(-1),
                                                        ),
                                                        const Divider(),
                                                        if (existingSets.isNotEmpty)
                                                          const Padding(
                                                            padding: EdgeInsets.only(left: 16, top: 8, bottom: 4),
                                                            child: Text('Select Existing Practice Set:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                                                          ),
                                                        ...existingSets.map((set) {
                                                          final setMap = set as Map<String, dynamic>;
                                                          final sId = _asInt(setMap['id']);
                                                          final title = setMap['title']?.toString() ?? '';
                                                          final topic = setMap['topic']?.toString() ?? '';
                                                          final subj = setMap['subject']?.toString() ?? '';
                                                          return ListTile(
                                                            leading: const Icon(Icons.folder_open),
                                                            title: Text(title.isNotEmpty ? title : topic),
                                                            subtitle: Text([if (subj.isNotEmpty) subj, if (topic.isNotEmpty && topic != title) topic].join(' • ')),
                                                            onTap: () => Navigator.of(dialogContext).pop(sId),
                                                          );
                                                        }),
                                                      ],
                                                    ),
                                                  ),
                                                  actions: [
                                                    TextButton(
                                                      onPressed: () => Navigator.of(dialogContext).pop(null),
                                                      child: const Text('Cancel'),
                                                    ),
                                                  ],
                                                ),
                                              );

                                              if (targetSetId == null) return;

                                              final actualTargetId = targetSetId == -1 ? null : targetSetId;
                                              try {
                                                await widget.api.moveTestQuestionsToPractice(
                                                  testId,
                                                  [qId],
                                                  targetPracticeSetId: actualTargetId,
                                                );
                                                await reloadQuestions();
                                                if (context.mounted) {
                                                  _showActionSnackBar(context, 'Question moved to practice set');
                                                }
                                              } catch (e) {
                                                if (context.mounted) {
                                                  _showActionSnackBar(context, 'Move failed: $e', isError: true);
                                                }
                                              }
                                            },
                                            icon: const Icon(Icons.drive_file_move_outlined, size: 16),
                                            label: const Text('Move to Practice'),
                                          ),
                                          OutlinedButton.icon(
                                            onPressed: () async {
                                              final confirm = await showDialog<bool>(
                                                context: context,
                                                builder: (dialogContext) => AlertDialog(
                                                  title: const Text('Delete Question?'),
                                                  content: const Text(
                                                    'Is question delete ho jayega. Ye action undo nahi ho sakta.',
                                                  ),
                                                  actions: [
                                                    TextButton(
                                                      onPressed: () => Navigator.of(dialogContext).pop(false),
                                                      child: const Text('Cancel'),
                                                    ),
                                                    TextButton(
                                                      onPressed: () => Navigator.of(dialogContext).pop(true),
                                                      child: const Text('Delete', style: TextStyle(color: Colors.red)),
                                                    ),
                                                  ],
                                                ),
                                              );
                                              if (confirm == true) {
                                                try {
                                                  await widget.api.deleteTestQuestion(qId);
                                                  await reloadQuestions();
                                                  if (mounted) {
                                                    _showActionSnackBar(context, 'Question deleted successfully');
                                                  }
                                                } catch (e) {
                                                  if (mounted) {
                                                    _showActionSnackBar(context, 'Delete failed: $e', isError: true);
                                                  }
                                                }
                                              }
                                            },
                                            icon: const Icon(Icons.delete_outline, size: 16, color: Colors.red),
                                            label: const Text('Delete', style: TextStyle(color: Colors.red)),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            }),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      );
    } catch (e, st) {
      if (!mounted) return;
      await _handleTaskError(
        context,
        'Load test questions',
        e,
        stackTrace: st,
        details: {'testId': testId},
      );
    }
  }


  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    _scroll.dispose();
    _title.dispose();
    _classLabel.dispose();
    _subject.dispose();
    _topic.dispose();
    _duration.dispose();
    _marks.dispose();
    _questionCount.dispose();
    _schedule.dispose();
    _testQuestion.dispose();
    _testOptionA.dispose();
    _testOptionB.dispose();
    _testOptionC.dispose();
    _testOptionD.dispose();
    _testExplanation.dispose();
    _testExplanationVideoLink.dispose();
    _testSimilarQuestion.dispose();
    _testSimilarOptionA.dispose();
    _testSimilarOptionB.dispose();
    _testSimilarOptionC.dispose();
    _testSimilarOptionD.dispose();
    _testSimilarExplanation.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    try {
      final b = await widget.api.batches();
      final t = await widget.api.tests();
      if (!mounted) return;
      setState(() {
        _batches = b['batches'] as List<dynamic>;
        _items = t['tests'] as List<dynamic>;
        _batchId ??= _batches.isNotEmpty
            ? _asInt((_batches.first as Map<String, dynamic>)['id'])
            : null;
      });
    } catch (e, st) {
      await _handleTaskError(context, 'Load tests', e, stackTrace: st);
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      controller: _scroll,
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                DropdownButtonFormField<int>(
                  initialValue: _batchId,
                  items: _batches
                      .map(
                        (e) => DropdownMenuItem(
                          value: _asInt((e as Map<String, dynamic>)['id']),
                          child: Text(e['name'].toString()),
                        ),
                      )
                      .toList(),
                  onChanged: (v) => setState(() => _batchId = v),
                  decoration: const InputDecoration(labelText: 'Batch'),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  initialValue: _testCategory,
                  items: _testCategories
                      .map(
                        (category) => DropdownMenuItem<String>(
                          value: category,
                          child: Text(category),
                        ),
                      )
                      .toList(),
                  onChanged: (value) =>
                      setState(() => _testCategory = value ?? 'Grand test'),
                  decoration: const InputDecoration(labelText: 'Test category'),
                ),
                const SizedBox(height: 8),
                TextField(
                    controller: _title,
                    decoration: const InputDecoration(labelText: 'Test title')),
                const SizedBox(height: 8),
                TextField(
                    controller: _classLabel,
                    decoration: const InputDecoration(labelText: 'Class')),
                const SizedBox(height: 8),
                TextField(
                    controller: _subject,
                    decoration: const InputDecoration(labelText: 'Subject')),
                const SizedBox(height: 8),
                TextField(
                    controller: _topic,
                    decoration: const InputDecoration(labelText: 'Topic')),
                const SizedBox(height: 8),
                TextField(
                    controller: _duration,
                    decoration:
                        const InputDecoration(labelText: 'Duration (minutes)')),
                const SizedBox(height: 8),
                TextField(
                    controller: _marks,
                    decoration:
                        const InputDecoration(labelText: 'Total marks')),
                const SizedBox(height: 8),
                TextField(
                    controller: _questionCount,
                    decoration:
                        const InputDecoration(labelText: 'Question count')),
                const SizedBox(height: 8),
                TextField(
                    controller: _schedule,
                    decoration:
                        const InputDecoration(labelText: 'Schedule label')),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    FilledButton(
                      onPressed: _batchId == null
                          ? null
                          : () async {
                              try {
                                if (_editingId == null) {
                                  await widget.api.addTest(
                                    batchId: _batchId!,
                                    classLabel: _classLabel.text.trim(),
                                    title: _title.text.trim(),
                                    subject: _subject.text.trim(),
                                    topic: _topic.text.trim(),
                                    category: _testCategory,
                                    durationMinutes:
                                        int.tryParse(_duration.text.trim()) ?? 180,
                                    marks: int.tryParse(_marks.text.trim()) ?? 720,
                                    questionCount:
                                        int.tryParse(_questionCount.text.trim()) ??
                                            180,
                                    scheduleLabel: _schedule.text.trim(),
                                  );
                                  _resetTestForm();
                                  setState(
                                      () => _status = 'Test added successfully');
                                  if (context.mounted) {
                                    _showActionSnackBar(
                                        context, 'Test added successfully');
                                  }
                                } else {
                                  await widget.api.updateTest(
                                    id: _editingId!,
                                    classLabel: _classLabel.text.trim(),
                                    title: _title.text.trim(),
                                    subject: _subject.text.trim(),
                                    topic: _topic.text.trim(),
                                    category: _testCategory,
                                    durationMinutes:
                                        int.tryParse(_duration.text.trim()) ?? 180,
                                    marks: int.tryParse(_marks.text.trim()) ?? 720,
                                    questionCount:
                                        int.tryParse(_questionCount.text.trim()) ??
                                            180,
                                    scheduleLabel: _schedule.text.trim(),
                                  );
                                  _editingId = null;
                                  setState(
                                      () => _status = 'Test updated successfully');
                                  if (context.mounted) {
                                    _showActionSnackBar(
                                        context, 'Test updated successfully');
                                  }
                                }
                                await _load();
                              } catch (e, st) {
                                setState(() => _status = 'Test save failed: ${_friendlyError(e)}');
                                if (context.mounted) {
                                  await _handleTaskError(
                                    context,
                                    'Test save',
                                    e,
                                    stackTrace: st,
                                    details: {'editingId': _editingId},
                                  );
                                }
                              }
                            },
                      child: Text(_editingId == null ? 'Add Test' : 'Update Test'),
                    ),
                    if (_editingId != null)
                      OutlinedButton(
                        onPressed: _resetTestForm,
                        child: const Text('Cancel edit'),
                      ),
                    FilledButton.tonalIcon(
                      onPressed: _items.isEmpty
                          ? null
                          : () => _showManageTestsDialog(),
                      icon: const Icon(Icons.list_alt_outlined, size: 18),
                      label: const Text('Manage Tests'),
                    ),
                  ],
                ),
                if (_status != null) ...[
                  const SizedBox(height: 8),
                  Text(_status!),
                ],
                const SizedBox(height: 10),
                const Divider(),
                if (_editingQuestionId != null)
                  Container(
                    margin: const EdgeInsets.only(bottom: 8),
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    decoration: BoxDecoration(
                      color: Colors.blue.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: Colors.blue.withValues(alpha: 0.3)),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.edit_outlined, size: 16, color: Colors.blue),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            'Editing Question #$_editingQuestionId',
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                          ),
                        ),
                        TextButton(
                          onPressed: _resetTestQuestionForm,
                          child: const Text('Cancel Edit'),
                        ),
                      ],
                    ),
                  ),
                const Align(
                  alignment: Alignment.centerLeft,
                  child: Text('Add questions to test',
                      style: TextStyle(fontWeight: FontWeight.w700)),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<int>(
                  value: _items.any((t) => _asInt(t['id']) == _selectedTestId)
                      ? _selectedTestId
                      : null,
                  items: _items
                      .map(
                        (t) => DropdownMenuItem<int>(
                          value: _asInt((t as Map<String, dynamic>)['id']),
                          child: Text(t['title']?.toString() ?? ''),
                        ),
                      )
                      .toList(),
                  onChanged: (v) => setState(() => _selectedTestId = v),
                  decoration: const InputDecoration(labelText: 'Select test'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _testQuestion,
                  minLines: 2,
                  maxLines: 4,
                  decoration: const InputDecoration(labelText: 'Question'),
                ),
                const SizedBox(height: 8),
                TextField(
                    controller: _testOptionA,
                    decoration: const InputDecoration(labelText: 'Option A')),
                _buildOptionImagePickerRow(
                  label: 'Option A',
                  file: _testOptionAImage,
                  imageLink: _testOptionAImageLink,
                  onPick: (file) => setState(() => _testOptionAImage = file),
                  onRemove: () => setState(() {
                    _testOptionAImage = null;
                    _testOptionAImageLink = '';
                  }),
                ),
                const SizedBox(height: 8),
                TextField(
                    controller: _testOptionB,
                    decoration: const InputDecoration(labelText: 'Option B')),
                _buildOptionImagePickerRow(
                  label: 'Option B',
                  file: _testOptionBImage,
                  imageLink: _testOptionBImageLink,
                  onPick: (file) => setState(() => _testOptionBImage = file),
                  onRemove: () => setState(() {
                    _testOptionBImage = null;
                    _testOptionBImageLink = '';
                  }),
                ),
                const SizedBox(height: 8),
                TextField(
                    controller: _testOptionC,
                    decoration: const InputDecoration(labelText: 'Option C')),
                _buildOptionImagePickerRow(
                  label: 'Option C',
                  file: _testOptionCImage,
                  imageLink: _testOptionCImageLink,
                  onPick: (file) => setState(() => _testOptionCImage = file),
                  onRemove: () => setState(() {
                    _testOptionCImage = null;
                    _testOptionCImageLink = '';
                  }),
                ),
                const SizedBox(height: 8),
                TextField(
                    controller: _testOptionD,
                    decoration: const InputDecoration(labelText: 'Option D')),
                _buildOptionImagePickerRow(
                  label: 'Option D',
                  file: _testOptionDImage,
                  imageLink: _testOptionDImageLink,
                  onPick: (file) => setState(() => _testOptionDImage = file),
                  onRemove: () => setState(() {
                    _testOptionDImage = null;
                    _testOptionDImageLink = '';
                  }),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  initialValue: _testCorrect,
                  items: const [
                    DropdownMenuItem(value: 'A', child: Text('Correct: A')),
                    DropdownMenuItem(value: 'B', child: Text('Correct: B')),
                    DropdownMenuItem(value: 'C', child: Text('Correct: C')),
                    DropdownMenuItem(value: 'D', child: Text('Correct: D')),
                  ],
                  onChanged: (v) => setState(() => _testCorrect = v ?? 'A'),
                  decoration:
                      const InputDecoration(labelText: 'Correct option'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _testExplanation,
                  minLines: 3,
                  maxLines: 8,
                  decoration: const InputDecoration(
                    labelText: 'Explanation (paragraph)',
                    alignLabelWithHint: true,
                  ),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _testExplanationVideoLink,
                  decoration: const InputDecoration(
                    labelText: 'Explanation Video Link (YouTube / Drive / MP4 URL)',
                    hintText: 'e.g. https://www.youtube.com/watch?... or Google Drive link',
                    prefixIcon: Icon(Icons.smart_display_outlined),
                  ),
                ),
                const SizedBox(height: 8),
                // Question image
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        _testQuestionImage == null
                            ? (_testQuestionImageLink.isEmpty
                                ? 'No question image'
                                : 'Question image uploaded')
                            : _testQuestionImage!.path
                                .split(Platform.pathSeparator)
                                .last,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(fontSize: 12),
                      ),
                    ),
                    TextButton(
                      onPressed: () async {
                        final result = await FilePicker.platform
                            .pickFiles(type: FileType.image);
                        if (result?.files.single.path == null) return;
                        setState(() => _testQuestionImage =
                            File(result!.files.single.path!));
                      },
                      child: const Text('Question image'),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                // Explanation image
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        _testExplanationImage == null
                            ? (_testExplanationImageLink.isEmpty
                                ? 'No explanation image'
                                : 'Explanation image uploaded')
                            : _testExplanationImage!.path
                                .split(Platform.pathSeparator)
                                .last,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(fontSize: 12),
                      ),
                    ),
                    TextButton(
                      onPressed: () async {
                        final result = await FilePicker.platform
                            .pickFiles(type: FileType.image);
                        if (result?.files.single.path == null) return;
                        setState(() => _testExplanationImage =
                            File(result!.files.single.path!));
                      },
                      child: const Text('Explanation image'),
                    ),
                    if (_testExplanationImage != null ||
                        _testExplanationImageLink.isNotEmpty)
                      TextButton(
                        onPressed: () => setState(() {
                          _testExplanationImage = null;
                          _testExplanationImageLink = '';
                        }),
                        child: const Text('Remove'),
                      ),
                  ],
                ),
                const SizedBox(height: 8),
                const Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'Additional explanation images (save question first, then add more)',
                    style: TextStyle(fontWeight: FontWeight.w600, fontSize: 12),
                  ),
                ),
                const SizedBox(height: 6),
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        _pendingExtraExplanationImages.isEmpty
                            ? 'No extra images selected'
                            : '${_pendingExtraExplanationImages.length} image(s) ready to upload',
                        style: const TextStyle(fontSize: 12),
                      ),
                    ),
                    TextButton(
                      onPressed: () async {
                        final result = await FilePicker.platform.pickFiles(
                          type: FileType.image,
                          allowMultiple: true,
                        );
                        if (result == null) return;
                        setState(() {
                          for (final f in result.files) {
                            if (f.path != null) {
                              _pendingExtraExplanationImages.add(File(f.path!));
                            }
                          }
                        });
                      },
                      child: const Text('Add more images'),
                    ),
                  ],
                ),
                if (_savedExplanationImages.isNotEmpty) ...[
                  const SizedBox(height: 6),
                  ..._savedExplanationImages.map(
                    (img) => ListTile(
                      dense: true,
                      contentPadding: EdgeInsets.zero,
                      title: Text(
                        (img as Map)['caption']?.toString().isNotEmpty == true
                            ? img['caption'].toString()
                            : 'Explanation image #${img['order_index'] ?? ''}',
                        style: const TextStyle(fontSize: 12),
                      ),
                      trailing: IconButton(
                        icon:
                            const Icon(Icons.delete_outline_rounded, size: 18),
                        onPressed: () async {
                          final id = (img)['id'] as int?;
                          if (id == null) return;
                          await widget.api.deleteExplanationImage(id);
                          if (_editingQuestionId != null) {
                            await _loadTestExplanationImages(
                                _editingQuestionId!);
                          }
                        },
                      ),
                    ),
                  ),
                ],
                const SizedBox(height: 12),
                Container(
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.3),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: Theme.of(context).colorScheme.outlineVariant,
                    ),
                  ),
                  child: Column(
                    children: [
                      SwitchListTile(
                        title: const Text(
                          'Add Solve Similar Question',
                          style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
                        ),
                        subtitle: const Text(
                          'Shown to student if they answer wrong, or in review if 100% correct',
                          style: TextStyle(fontSize: 12),
                        ),
                        value: _testShowSimilarQuestion || _testSimilarQuestion.text.isNotEmpty,
                        onChanged: (val) {
                          setState(() {
                            _testShowSimilarQuestion = val;
                          });
                        },
                      ),
                      if (_testShowSimilarQuestion || _testSimilarQuestion.text.isNotEmpty)
                        Padding(
                          padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              TextField(
                                controller: _testSimilarQuestion,
                                minLines: 2,
                                maxLines: 4,
                                decoration: const InputDecoration(
                                  labelText: 'Similar Question Text',
                                  hintText: 'Enter a parallel / similar practice question...',
                                ),
                              ),
                              const SizedBox(height: 8),
                              TextField(
                                controller: _testSimilarOptionA,
                                decoration: const InputDecoration(labelText: 'Similar Option A'),
                              ),
                              const SizedBox(height: 8),
                              TextField(
                                controller: _testSimilarOptionB,
                                decoration: const InputDecoration(labelText: 'Similar Option B'),
                              ),
                              const SizedBox(height: 8),
                              TextField(
                                controller: _testSimilarOptionC,
                                decoration: const InputDecoration(labelText: 'Similar Option C'),
                              ),
                              const SizedBox(height: 8),
                              TextField(
                                controller: _testSimilarOptionD,
                                decoration: const InputDecoration(labelText: 'Similar Option D'),
                              ),
                              const SizedBox(height: 8),
                              DropdownButtonFormField<String>(
                                initialValue: _testSimilarCorrect,
                                items: const [
                                  DropdownMenuItem(value: 'A', child: Text('Correct: A')),
                                  DropdownMenuItem(value: 'B', child: Text('Correct: B')),
                                  DropdownMenuItem(value: 'C', child: Text('Correct: C')),
                                  DropdownMenuItem(value: 'D', child: Text('Correct: D')),
                                ],
                                onChanged: (v) => setState(() => _testSimilarCorrect = v ?? 'A'),
                                decoration: const InputDecoration(labelText: 'Correct Option for Similar Question'),
                              ),
                              const SizedBox(height: 8),
                              TextField(
                                controller: _testSimilarExplanation,
                                minLines: 2,
                                maxLines: 4,
                                decoration: const InputDecoration(
                                  labelText: 'Explanation for Similar Question (Optional)',
                                ),
                              ),
                              const SizedBox(height: 10),
                              // Similar Question Image
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      _testSimilarQuestionImage == null
                                          ? (_testSimilarQuestionImageLink.isEmpty
                                              ? 'No similar question image'
                                              : 'Similar question image uploaded')
                                          : _testSimilarQuestionImage!.path.split(Platform.pathSeparator).last,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(fontSize: 12),
                                    ),
                                  ),
                                  TextButton(
                                    onPressed: () async {
                                      final result = await FilePicker.platform.pickFiles(type: FileType.image);
                                      if (result?.files.single.path == null) return;
                                      setState(() => _testSimilarQuestionImage = File(result!.files.single.path!));
                                    },
                                    child: const Text('Pick Image'),
                                  ),
                                  if (_testSimilarQuestionImage != null || _testSimilarQuestionImageLink.isNotEmpty)
                                    TextButton(
                                      onPressed: () => setState(() {
                                        _testSimilarQuestionImage = null;
                                        _testSimilarQuestionImageLink = '';
                                      }),
                                      child: const Text('Remove', style: TextStyle(color: Colors.red)),
                                    ),
                                ],
                              ),
                              const SizedBox(height: 6),
                              // Similar Question Explanation Image
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      _testSimilarExplanationImage == null
                                          ? (_testSimilarExplanationImageLink.isEmpty
                                              ? 'No similar explanation image'
                                              : 'Similar explanation image uploaded')
                                          : _testSimilarExplanationImage!.path.split(Platform.pathSeparator).last,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(fontSize: 12),
                                    ),
                                  ),
                                  TextButton(
                                    onPressed: () async {
                                      final result = await FilePicker.platform.pickFiles(type: FileType.image);
                                      if (result?.files.single.path == null) return;
                                      setState(() => _testSimilarExplanationImage = File(result!.files.single.path!));
                                    },
                                    child: const Text('Pick Image'),
                                  ),
                                  if (_testSimilarExplanationImage != null || _testSimilarExplanationImageLink.isNotEmpty)
                                    TextButton(
                                      onPressed: () => setState(() {
                                        _testSimilarExplanationImage = null;
                                        _testSimilarExplanationImageLink = '';
                                      }),
                                      child: const Text('Remove', style: TextStyle(color: Colors.red)),
                                    ),
                                ],
                              ),
                              const SizedBox(height: 8),
                              // Multiple Explanation Images for Similar Question
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      _testSimilarPendingExtraExplanationImages.isEmpty && _testSimilarExistingExplanationImages.isEmpty
                                          ? 'No extra explanation images'
                                          : '${_testSimilarExistingExplanationImages.length} saved, ${_testSimilarPendingExtraExplanationImages.length} ready to upload',
                                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
                                    ),
                                  ),
                                  TextButton.icon(
                                    icon: const Icon(Icons.add_photo_alternate_outlined, size: 16),
                                    label: const Text('Add Images'),
                                    onPressed: () async {
                                      final result = await FilePicker.platform.pickFiles(
                                        type: FileType.image,
                                        allowMultiple: true,
                                      );
                                      if (result == null) return;
                                      setState(() {
                                        for (final f in result.files) {
                                          if (f.path != null) {
                                            _testSimilarPendingExtraExplanationImages.add(File(f.path!));
                                          }
                                        }
                                      });
                                    },
                                  ),
                                ],
                              ),
                              if (_testSimilarExistingExplanationImages.isNotEmpty) ...[
                                ..._testSimilarExistingExplanationImages.asMap().entries.map((entry) {
                                  final idx = entry.key;
                                  return ListTile(
                                    dense: true,
                                    contentPadding: EdgeInsets.zero,
                                    leading: const Icon(Icons.image_outlined, size: 18),
                                    title: Text('Saved Explanation Image #${idx + 1}', style: const TextStyle(fontSize: 12)),
                                    trailing: IconButton(
                                      icon: const Icon(Icons.delete_outline_rounded, size: 18, color: Colors.red),
                                      onPressed: () => setState(() => _testSimilarExistingExplanationImages.removeAt(idx)),
                                    ),
                                  );
                                }),
                              ],
                              if (_testSimilarPendingExtraExplanationImages.isNotEmpty) ...[
                                ..._testSimilarPendingExtraExplanationImages.asMap().entries.map((entry) {
                                  final idx = entry.key;
                                  final file = entry.value;
                                  return ListTile(
                                    dense: true,
                                    contentPadding: EdgeInsets.zero,
                                    leading: const Icon(Icons.add_photo_alternate_outlined, size: 18, color: Colors.indigo),
                                    title: Text(file.path.split(Platform.pathSeparator).last, style: const TextStyle(fontSize: 12)),
                                    trailing: IconButton(
                                      icon: const Icon(Icons.close_rounded, size: 18, color: Colors.red),
                                      onPressed: () => setState(() => _testSimilarPendingExtraExplanationImages.removeAt(idx)),
                                    ),
                                  );
                                }),
                              ],
                            ],
                          ),
                        ),
                    ],
                  ),
                ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    FilledButton.tonal(
                      onPressed: _selectedTestId == null || _savingQuestion
                          ? null
                          : () async {
                              setState(() => _savingQuestion = true);
                              try {
                                var imageLink = _testQuestionImageLink;
                                var expLink = _testExplanationImageLink;
                                final videoLink = _testExplanationVideoLink.text.trim();

                                final currentTest = _items.firstWhere(
                                  (x) => _asInt((x as Map)['id']) == _selectedTestId,
                                  orElse: () => null,
                                );
                                final bId = currentTest != null ? _asInt(currentTest['batch_id'] ?? _batchId) : _batchId;
                                final effectiveBatchId = bId ?? (_batches.isNotEmpty ? _asInt((_batches.first as Map)['id']) : null);
                                final cls = currentTest != null ? currentTest['class_label']?.toString() ?? '' : _classLabel.text.trim();
                                final sbj = currentTest != null ? currentTest['subject']?.toString() ?? '' : _subject.text.trim();
                                final tpc = currentTest != null ? currentTest['topic']?.toString() ?? '' : _topic.text.trim();

                                Map<String, dynamic>? similarQuestionData;
                                if (_testSimilarQuestion.text.trim().isNotEmpty) {
                                  if (effectiveBatchId != null) {
                                    if (_testSimilarQuestionImage != null) {
                                      if (!await _validateImageFile(context, _testSimilarQuestionImage!)) {
                                        throw Exception('Similar question image too large');
                                      }
                                      _testSimilarQuestionImageLink = await widget.api.uploadQuestionImage(
                                        batchId: effectiveBatchId,
                                        classLabel: cls,
                                        subject: sbj,
                                        topic: tpc.isEmpty ? 'Test Questions' : tpc,
                                        file: _testSimilarQuestionImage!,
                                        contentType: 'similar_question',
                                        contentId: _selectedTestId,
                                      );
                                    }
                                    if (_testSimilarExplanationImage != null) {
                                      if (!await _validateImageFile(context, _testSimilarExplanationImage!)) {
                                        throw Exception('Similar explanation image too large');
                                      }
                                      _testSimilarExplanationImageLink = await widget.api.uploadQuestionImage(
                                        batchId: effectiveBatchId,
                                        classLabel: cls,
                                        subject: sbj,
                                        topic: tpc.isEmpty ? 'Test Questions' : tpc,
                                        file: _testSimilarExplanationImage!,
                                        contentType: 'similar_explanation',
                                        contentId: _selectedTestId,
                                      );
                                    }
                                    if (_testSimilarPendingExtraExplanationImages.isNotEmpty) {
                                      for (final extraFile in _testSimilarPendingExtraExplanationImages) {
                                        if (!await _validateImageFile(context, extraFile)) {
                                          throw Exception('Similar explanation extra image too large');
                                        }
                                        final extraLink = await widget.api.uploadQuestionImage(
                                          batchId: effectiveBatchId,
                                          classLabel: cls,
                                          subject: sbj,
                                          topic: tpc.isEmpty ? 'Test Questions' : tpc,
                                          file: extraFile,
                                          contentType: 'similar_explanation_extra',
                                          contentId: _selectedTestId,
                                        );
                                        if (extraLink.isNotEmpty) {
                                          _testSimilarExistingExplanationImages.add(extraLink);
                                        }
                                      }
                                      _testSimilarPendingExtraExplanationImages.clear();
                                    }
                                  }

                                  similarQuestionData = {
                                    'question': _testSimilarQuestion.text.trim(),
                                    'option_a': _testSimilarOptionA.text.trim(),
                                    'option_b': _testSimilarOptionB.text.trim(),
                                    'option_c': _testSimilarOptionC.text.trim(),
                                    'option_d': _testSimilarOptionD.text.trim(),
                                    'correct_option': _testSimilarCorrect,
                                    'explanation': _testSimilarExplanation.text.trim(),
                                    if (_testSimilarQuestionImageLink.isNotEmpty) 'question_image_link': _testSimilarQuestionImageLink,
                                    if (_testSimilarExplanationImageLink.isNotEmpty) 'explanation_image_link': _testSimilarExplanationImageLink,
                                    if (_testSimilarExistingExplanationImages.isNotEmpty) 'explanation_images': _testSimilarExistingExplanationImages,
                                  };
                                }

                                var savedQuestionId = _editingQuestionId;
                                final wasEditing = _editingQuestionId != null;
                                final hasMedia = _testQuestionImage != null ||
                                    _testExplanationImage != null ||
                                    _pendingExtraExplanationImages.isNotEmpty;
                                if (effectiveBatchId != null) {
                                  if (_testOptionAImage != null) {
                                    if (!await _validateImageFile(context, _testOptionAImage!)) {
                                      throw Exception('Option A image too large');
                                    }
                                    _testOptionAImageLink = await widget.api.uploadQuestionImage(
                                      batchId: effectiveBatchId,
                                      classLabel: cls,
                                      subject: sbj,
                                      topic: tpc.isEmpty ? 'Test Questions' : tpc,
                                      file: _testOptionAImage!,
                                      contentType: 'test_option_a',
                                      contentId: _selectedTestId,
                                    );
                                  }
                                  if (_testOptionBImage != null) {
                                    if (!await _validateImageFile(context, _testOptionBImage!)) {
                                      throw Exception('Option B image too large');
                                    }
                                    _testOptionBImageLink = await widget.api.uploadQuestionImage(
                                      batchId: effectiveBatchId,
                                      classLabel: cls,
                                      subject: sbj,
                                      topic: tpc.isEmpty ? 'Test Questions' : tpc,
                                      file: _testOptionBImage!,
                                      contentType: 'test_option_b',
                                      contentId: _selectedTestId,
                                    );
                                  }
                                  if (_testOptionCImage != null) {
                                    if (!await _validateImageFile(context, _testOptionCImage!)) {
                                      throw Exception('Option C image too large');
                                    }
                                    _testOptionCImageLink = await widget.api.uploadQuestionImage(
                                      batchId: effectiveBatchId,
                                      classLabel: cls,
                                      subject: sbj,
                                      topic: tpc.isEmpty ? 'Test Questions' : tpc,
                                      file: _testOptionCImage!,
                                      contentType: 'test_option_c',
                                      contentId: _selectedTestId,
                                    );
                                  }
                                  if (_testOptionDImage != null) {
                                    if (!await _validateImageFile(context, _testOptionDImage!)) {
                                      throw Exception('Option D image too large');
                                    }
                                    _testOptionDImageLink = await widget.api.uploadQuestionImage(
                                      batchId: effectiveBatchId,
                                      classLabel: cls,
                                      subject: sbj,
                                      topic: tpc.isEmpty ? 'Test Questions' : tpc,
                                      file: _testOptionDImage!,
                                      contentType: 'test_option_d',
                                      contentId: _selectedTestId,
                                    );
                                  }
                                }

                                if (_editingQuestionId == null) {
                                  final filesToValidate = <File>[
                                    if (_testQuestionImage != null)
                                      _testQuestionImage!,
                                    if (_testExplanationImage != null)
                                      _testExplanationImage!,
                                    ..._pendingExtraExplanationImages,
                                  ];
                                  for (final file in filesToValidate) {
                                    if (!await _validateImageFile(
                                        context, file)) {
                                      throw Exception(
                                          'Image too large (max 5 MB each)');
                                    }
                                  }
                                  if (hasMedia) {
                                    setState(() => _status =
                                        'Uploading ${filesToValidate.length} image(s)...');
                                    savedQuestionId =
                                        await widget.api.addTestQuestionWithMedia(
                                      testId: _selectedTestId!,
                                      question: _testQuestion.text.trim(),
                                      optionA: _testOptionA.text.trim(),
                                      optionB: _testOptionB.text.trim(),
                                      optionC: _testOptionC.text.trim(),
                                      optionD: _testOptionD.text.trim(),
                                      correctOption: _testCorrect,
                                      explanation:
                                          _testExplanation.text.trim(),
                                      subject: _subject.text.trim(),
                                      questionImage: _testQuestionImage,
                                      explanationImage: _testExplanationImage,
                                      extraExplanationImages:
                                          List<File>.from(
                                              _pendingExtraExplanationImages),
                                      questionImageLink: imageLink,
                                      explanationImageLink: expLink,
                                      explanationVideoLink: videoLink,
                                      optionAImageLink: _testOptionAImageLink,
                                      optionBImageLink: _testOptionBImageLink,
                                      optionCImageLink: _testOptionCImageLink,
                                      optionDImageLink: _testOptionDImageLink,
                                      similarQuestion: similarQuestionData,
                                    );
                                    _pendingExtraExplanationImages.clear();
                                  } else {
                                    savedQuestionId =
                                        await widget.api.addTestQuestion(
                                      testId: _selectedTestId!,
                                      question: _testQuestion.text.trim(),
                                      optionA: _testOptionA.text.trim(),
                                      optionB: _testOptionB.text.trim(),
                                      optionC: _testOptionC.text.trim(),
                                      optionD: _testOptionD.text.trim(),
                                      correctOption: _testCorrect,
                                      explanation:
                                          _testExplanation.text.trim(),
                                      subject: _subject.text.trim(),
                                      questionImageLink: imageLink,
                                      explanationImageLink: expLink,
                                      explanationVideoLink: videoLink,
                                      optionAImageLink: _testOptionAImageLink,
                                      optionBImageLink: _testOptionBImageLink,
                                      optionCImageLink: _testOptionCImageLink,
                                      optionDImageLink: _testOptionDImageLink,
                                      similarQuestion: similarQuestionData,
                                    );
                                  }
                                } else {
                                  if (_batchId != null) {
                                    final uploads = <Future<void>>[];
                                    if (_testQuestionImage != null) {
                                      uploads.add(() async {
                                        if (!await _validateImageFile(
                                            context, _testQuestionImage!)) {
                                          throw Exception(
                                              'Question image too large');
                                        }
                                        imageLink = await widget.api
                                            .uploadQuestionImage(
                                          batchId: _batchId!,
                                          classLabel: _classLabel.text.trim(),
                                          subject: _subject.text.trim(),
                                          topic: _topic.text.trim().isEmpty
                                              ? 'Test Questions'
                                              : _topic.text.trim(),
                                          file: _testQuestionImage!,
                                          contentType: 'test',
                                          contentId: _selectedTestId,
                                        );
                                      }());
                                    }
                                    if (_testExplanationImage != null) {
                                      uploads.add(() async {
                                        if (!await _validateImageFile(
                                            context,
                                            _testExplanationImage!)) {
                                          throw Exception(
                                              'Explanation image too large');
                                        }
                                        expLink = await widget.api
                                            .uploadQuestionImage(
                                          batchId: _batchId!,
                                          classLabel: _classLabel.text.trim(),
                                          subject: _subject.text.trim(),
                                          topic: _topic.text.trim().isEmpty
                                              ? 'Test Questions'
                                              : _topic.text.trim(),
                                          file: _testExplanationImage!,
                                          contentType: 'test_explanation',
                                          contentId: _selectedTestId,
                                        );
                                      }());
                                    }
                                    if (uploads.isNotEmpty) {
                                      await Future.wait(uploads);
                                    }
                                  }
                                  await widget.api.updateTestQuestion(
                                    id: _editingQuestionId!,
                                    question: _testQuestion.text.trim(),
                                    optionA: _testOptionA.text.trim(),
                                    optionB: _testOptionB.text.trim(),
                                    optionC: _testOptionC.text.trim(),
                                    optionD: _testOptionD.text.trim(),
                                    correctOption: _testCorrect,
                                    explanation: _testExplanation.text.trim(),
                                    subject: _subject.text.trim(),
                                    questionImageLink: imageLink,
                                    explanationImageLink: expLink,
                                    explanationVideoLink: videoLink,
                                    optionAImageLink: _testOptionAImageLink,
                                    optionBImageLink: _testOptionBImageLink,
                                    optionCImageLink: _testOptionCImageLink,
                                    optionDImageLink: _testOptionDImageLink,
                                    similarQuestion: similarQuestionData,
                                  );
                                }
                                if (wasEditing &&
                                    savedQuestionId != null &&
                                    _pendingExtraExplanationImages.isNotEmpty) {
                                  await _uploadPendingTestExplanationImages(
                                      savedQuestionId);
                                }
                                _resetTestQuestionForm();
                                setState(() => _status = 'Question saved');
                                if (context.mounted) {
                                  _showActionSnackBar(
                                      context, 'Question saved successfully');
                                }
                              } catch (e, st) {
                                setState(() => _status =
                                    'Question add failed: ${_friendlyError(e)}');
                                if (!context.mounted) return;
                                await _handleTaskError(
                                  context,
                                  'Test question save',
                                  e,
                                  stackTrace: st,
                                  details: {
                                    'testId': _selectedTestId,
                                    'editingQuestionId': _editingQuestionId,
                                  },
                                );
                              } finally {
                                if (mounted) {
                                  setState(() => _savingQuestion = false);
                                }
                              }
                            },
                      child: _busyButtonChild(
                        _savingQuestion,
                        _editingQuestionId == null
                            ? 'Add Question'
                            : 'Save & add next',
                      ),
                    ),
                    if (_editingQuestionId != null)
                      OutlinedButton(
                        onPressed: _resetTestQuestionForm,
                        child: const Text('Cancel edit'),
                      ),
                    FilledButton.tonalIcon(
                      onPressed: _items.isEmpty
                          ? null
                          : () {
                              if (_selectedTestId != null) {
                                _openQuestionsForTest(_selectedTestId!);
                              } else {
                                _showManageTestsDialog();
                              }
                            },
                      icon: const Icon(Icons.list_alt_outlined, size: 18),
                      label: const Text('Manage Questions for Test'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        if (_items.isNotEmpty)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Row(children: [
              const Icon(Icons.fact_check_rounded,
                  size: 16, color: Color(0xFFD92D20)),
              const SizedBox(width: 6),
              Text('Tests (${_items.length})',
                  style: const TextStyle(
                      fontWeight: FontWeight.w700, fontSize: 15)),
            ]),
          ),
        ..._items.map(
          (e) {
            final item = e as Map<String, dynamic>;
            final testId = _asInt(item['id'], label: 'testId');
            return Container(
              margin: const EdgeInsets.only(bottom: 10),
              decoration: BoxDecoration(
                color: Theme.of(context).cardTheme.color,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                    color: Theme.of(context).colorScheme.outlineVariant),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  InkWell(
                    borderRadius:
                        const BorderRadius.vertical(top: Radius.circular(16)),
                    onTap: () => _openQuestionsForTest(testId),
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(14, 12, 8, 0),
                      child: Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                                color: const Color(0xFFD92D20)
                                    .withValues(alpha: 0.12),
                                borderRadius: BorderRadius.circular(10)),
                            child: const Icon(Icons.fact_check_rounded,
                                color: Color(0xFFD92D20), size: 18),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(item['title']?.toString() ?? '',
                                    style: const TextStyle(
                                        fontWeight: FontWeight.w700,
                                        fontSize: 14)),
                                const SizedBox(height: 2),
                                Text(
                                    '${item['subject'] ?? ''} • ${item['topic'] ?? ''}',
                                    style: const TextStyle(
                                        fontSize: 12,
                                        color: Color(0xFF757575))),
                                const SizedBox(height: 2),
                                const Text('Tap to view & manage questions',
                                    style: TextStyle(
                                        fontSize: 11,
                                        color: Color(0xFFD92D20))),
                              ],
                            ),
                          ),
                          IconButton(
                            tooltip: 'View & Manage questions',
                            icon: const Icon(Icons.list_alt_outlined, size: 20),
                            onPressed: () => _openQuestionsForTest(testId),
                          ),
                          IconButton(
                            tooltip: 'Edit Test',
                            icon: const Icon(Icons.edit_outlined, size: 20),
                            onPressed: () => _showEditTestDialog(item),
                          ),
                          IconButton(
                            tooltip: 'Delete Test',
                            icon: const Icon(Icons.delete_outline,
                                size: 20, color: Color(0xFFD92D20)),
                            onPressed: () async {
                              final ok = await _confirmDeleteDialog(context,
                                  title: 'Delete Test?',
                                  body:
                                      'This test and its questions will be removed permanently.');
                              if (!ok) return;
                              try {
                                await widget.api.deleteTest(testId);
                                await _load();
                                if (context.mounted) {
                                  _showActionSnackBar(
                                      context, 'Test deleted successfully');
                                }
                              } catch (_) {
                                if (context.mounted) {
                                  _showActionSnackBar(
                                      context, 'Test delete failed',
                                      isError: true);
                                }
                              }
                            },
                          ),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(14, 8, 14, 12),
                    child: Wrap(spacing: 6, runSpacing: 4, children: [
                      _ChipBadge(
                          label: item['batch_name']?.toString() ?? '',
                          color: const Color(0xFF1976D2)),
                      _ChipBadge(
                          label: item['class_label']?.toString() ?? '',
                          color: const Color(0xFF7B1FA2)),
                      _ChipBadge(
                          label: item['category']?.toString() ?? 'Grand test',
                          color: const Color(0xFF6D4C41)),
                      _ChipBadge(
                          label: '${item['duration_minutes'] ?? ''} min',
                          color: const Color(0xFF2E7D32)),
                      _ChipBadge(
                          label: '${item['marks'] ?? ''} marks',
                          color: const Color(0xFFE85A1C)),
                    ]),
                  ),
                ],
              ),
            );
          },
        ),
      ],
    );
  }
}

// ─── MCQs Page ────────────────────────────────────────────────────────────────

class McqsPage extends StatefulWidget {
  const McqsPage({super.key, required this.api});
  final AdminApi api;
  @override
  State<McqsPage> createState() => _McqsPageState();
}

class _McqsPageState extends State<McqsPage> {
  final _question = TextEditingController();
  final _classLabel = TextEditingController(text: 'Class 11');
  final _subject = TextEditingController(text: 'Biology');
  final _topic = TextEditingController();
  final _optionA = TextEditingController();
  final _optionB = TextEditingController();
  final _optionC = TextEditingController();
  final _optionD = TextEditingController();
  final _explanation = TextEditingController();
  String _correct = 'A';
  int? _batchId;
  int? _editingId;
  File? _image;
  String _imageLink = '';
  File? _explanationImage;
  String _explanationImageLink = '';
  List<dynamic> _batches = const [];
  List<dynamic> _mcqs = const [];

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final b = await widget.api.batches();
    final m = await widget.api.mcqs();
    setState(() {
      _batches = b['batches'] as List<dynamic>;
      _mcqs = m['mcqs'] as List<dynamic>;
      _batchId ??= _batches.isNotEmpty
          ? (_batches.first as Map<String, dynamic>)['id'] as int
          : null;
    });
  }

  void _resetForm() {
    _question.clear();
    _optionA.clear();
    _optionB.clear();
    _optionC.clear();
    _optionD.clear();
    _explanation.clear();
    setState(() {
      _editingId = null;
      _image = null;
      _imageLink = '';
      _explanationImage = null;
      _explanationImageLink = '';
      _correct = 'A';
    });
  }

  DateTime? _mcqCreatedAt(Map<String, dynamic> m) {
    final raw = m['created_at']?.toString();
    if (raw == null || raw.isEmpty) return null;
    return DateTime.tryParse(raw)?.toLocal();
  }

  bool _isTodaysMcq(Map<String, dynamic> m) {
    final created = _mcqCreatedAt(m);
    if (created == null) return m['is_active'] == true;
    final now = DateTime.now();
    return created.year == now.year &&
        created.month == now.month &&
        created.day == now.day;
  }

  List<Map<String, dynamic>> get _todaysMcqs =>
      _mcqs.map((e) => e as Map<String, dynamic>).where(_isTodaysMcq).toList();

  List<Map<String, dynamic>> get _archivedMcqs => _mcqs
      .map((e) => e as Map<String, dynamic>)
      .where((m) => !_isTodaysMcq(m))
      .toList();

  Widget _buildMcqCard(Map<String, dynamic> m, {required bool archived}) {
    final hasImage = hasQuestionImage(m);
    final created = _mcqCreatedAt(m);
    final dateLabel = created != null
        ? '${created.day.toString().padLeft(2, '0')}/${created.month.toString().padLeft(2, '0')}/${created.year}'
        : '';

    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (archived) ...[
              Row(
                children: [
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: Colors.grey.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(99),
                    ),
                    child: Text(
                      'Archived · $dateLabel',
                      style: const TextStyle(
                          fontSize: 11, fontWeight: FontWeight.w600),
                    ),
                  ),
                  const SizedBox(width: 8),
                  const Text(
                    'View only for students',
                    style: TextStyle(fontSize: 11, color: Colors.grey),
                  ),
                ],
              ),
              const SizedBox(height: 8),
            ],
            Text(m['question']?.toString() ?? '',
                style: const TextStyle(fontWeight: FontWeight.w600)),
            const SizedBox(height: 4),
            Text('A: ${m['option_a'] ?? ''}  B: ${m['option_b'] ?? ''}',
                style: const TextStyle(fontSize: 12)),
            Text('C: ${m['option_c'] ?? ''}  D: ${m['option_d'] ?? ''}',
                style: const TextStyle(fontSize: 12)),
            Text(
                'Correct: ${m['correct_option'] ?? '-'}  |  ${m['subject'] ?? ''}  ${m['topic'] ?? ''}',
                style: TextStyle(
                    fontSize: 12,
                    color: archived ? Colors.grey : Colors.green)),
            if (hasImage) ...[
              const SizedBox(height: 6),
              ClipRRect(
                borderRadius: BorderRadius.circular(6),
                child: FastNetworkImage(
                  url: questionImageRawUrl(m),
                  height: 100,
                  width: double.infinity,
                  fit: BoxFit.cover,
                  thumbWidth: 500,
                ),
              ),
            ],
            const SizedBox(height: 8),
            Wrap(
              spacing: 6,
              children: [
                OutlinedButton.icon(
                  onPressed: () {
                    setState(() {
                      _editingId = m['id'] as int;
                      _question.text = m['question']?.toString() ?? '';
                      _optionA.text = m['option_a']?.toString() ?? '';
                      _optionB.text = m['option_b']?.toString() ?? '';
                      _optionC.text = m['option_c']?.toString() ?? '';
                      _optionD.text = m['option_d']?.toString() ?? '';
                      _correct = m['correct_option']?.toString() ?? 'A';
                      _explanation.text = m['explanation']?.toString() ?? '';
                      _imageLink = m['question_image_link']?.toString() ?? '';
                      _image = null;
                    });
                  },
                  icon: const Icon(Icons.edit_outlined, size: 16),
                  label: const Text('Edit'),
                ),
                OutlinedButton.icon(
                  onPressed: () async {
                    final shouldDelete = await _confirmDeleteDialog(
                      context,
                      title: 'Delete MCQ?',
                      body: 'This MCQ will be removed permanently.',
                    );
                    if (!shouldDelete) return;
                    try {
                      await widget.api.deleteMcq(m['id'] as int);
                      await _load();
                      if (!mounted) return;
                      _showActionSnackBar(context, 'MCQ deleted');
                    } catch (_) {
                      if (!mounted) return;
                      _showActionSnackBar(context, 'Delete failed',
                          isError: true);
                    }
                  },
                  icon: const Icon(Icons.delete_outline, size: 16),
                  label: const Text('Delete'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          color: const Color(0xFFFFF8F2),
          child: const Padding(
            padding: EdgeInsets.all(12),
            child: Text(
              'MCQ of the Day — yahan sirf daily MCQs add hote hain. '
              'Tests alag "Tests" tab mein hain. Naya din shuru hone par purane MCQs archive ho jayenge; '
              'students sirf aaj ke MCQs ka test de sakte hain, purane sirf dekh sakte hain.',
              style: TextStyle(fontSize: 13),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                const Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'Add MCQ of the Day',
                    style: TextStyle(fontWeight: FontWeight.w700),
                  ),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<int>(
                  initialValue: _batchId,
                  items: _batches
                      .map((e) => DropdownMenuItem<int>(
                            value: (e as Map<String, dynamic>)['id'] as int,
                            child: Text(e['name'].toString()),
                          ))
                      .toList(),
                  onChanged: (v) => setState(() => _batchId = v),
                  decoration: const InputDecoration(labelText: 'Batch'),
                ),
                const SizedBox(height: 8),
                TextField(
                    controller: _classLabel,
                    decoration: const InputDecoration(labelText: 'Class')),
                const SizedBox(height: 8),
                TextField(
                    controller: _subject,
                    decoration: const InputDecoration(labelText: 'Subject')),
                const SizedBox(height: 8),
                TextField(
                    controller: _topic,
                    decoration: const InputDecoration(labelText: 'Topic')),
                const SizedBox(height: 8),
                TextField(
                  controller: _question,
                  minLines: 2,
                  maxLines: 4,
                  decoration: const InputDecoration(labelText: 'Question'),
                ),
                const SizedBox(height: 8),
                TextField(
                    controller: _optionA,
                    decoration: const InputDecoration(labelText: 'Option A')),
                const SizedBox(height: 8),
                TextField(
                    controller: _optionB,
                    decoration: const InputDecoration(labelText: 'Option B')),
                const SizedBox(height: 8),
                TextField(
                    controller: _optionC,
                    decoration: const InputDecoration(labelText: 'Option C')),
                const SizedBox(height: 8),
                TextField(
                    controller: _optionD,
                    decoration: const InputDecoration(labelText: 'Option D')),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  initialValue: _correct,
                  items: const [
                    DropdownMenuItem(value: 'A', child: Text('Correct: A')),
                    DropdownMenuItem(value: 'B', child: Text('Correct: B')),
                    DropdownMenuItem(value: 'C', child: Text('Correct: C')),
                    DropdownMenuItem(value: 'D', child: Text('Correct: D')),
                  ],
                  onChanged: (v) => setState(() => _correct = v ?? 'A'),
                  decoration:
                      const InputDecoration(labelText: 'Correct option'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _explanation,
                  minLines: 3,
                  maxLines: 8,
                  decoration: const InputDecoration(
                    labelText: 'Explanation (paragraph)',
                    alignLabelWithHint: true,
                  ),
                ),
                const SizedBox(height: 8),
                // Question image
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        _image == null
                            ? (_imageLink.isEmpty
                                ? 'No question image'
                                : 'Question image uploaded')
                            : _image!.path.split(Platform.pathSeparator).last,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(fontSize: 12),
                      ),
                    ),
                    TextButton(
                      onPressed: () async {
                        final result = await FilePicker.platform
                            .pickFiles(type: FileType.image);
                        if (result?.files.single.path == null) return;
                        setState(
                            () => _image = File(result!.files.single.path!));
                      },
                      child: const Text('Question image'),
                    ),
                    if (_image != null || _imageLink.isNotEmpty)
                      TextButton(
                        onPressed: () => setState(() {
                          _image = null;
                          _imageLink = '';
                        }),
                        child: const Text('Remove'),
                      ),
                  ],
                ),
                const SizedBox(height: 4),
                // Explanation image
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        _explanationImage == null
                            ? (_explanationImageLink.isEmpty
                                ? 'No explanation image'
                                : 'Explanation image uploaded')
                            : _explanationImage!.path
                                .split(Platform.pathSeparator)
                                .last,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(fontSize: 12),
                      ),
                    ),
                    TextButton(
                      onPressed: () async {
                        final result = await FilePicker.platform
                            .pickFiles(type: FileType.image);
                        if (result?.files.single.path == null) return;
                        setState(() => _explanationImage =
                            File(result!.files.single.path!));
                      },
                      child: const Text('Explanation image'),
                    ),
                    if (_explanationImage != null ||
                        _explanationImageLink.isNotEmpty)
                      TextButton(
                        onPressed: () => setState(() {
                          _explanationImage = null;
                          _explanationImageLink = '';
                        }),
                        child: const Text('Remove'),
                      ),
                  ],
                ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  children: [
                    FilledButton(
                      onPressed: _batchId == null
                          ? null
                          : () async {
                              try {
                                var link = _imageLink;
                                if (_image != null) {
                                  link = await widget.api.uploadQuestionImage(
                                    batchId: _batchId!,
                                    classLabel: _classLabel.text.trim(),
                                    subject: _subject.text.trim(),
                                    topic: _topic.text.trim().isEmpty
                                        ? 'MCQs'
                                        : _topic.text.trim(),
                                    file: _image!,
                                    contentType: 'mcq',
                                  );
                                }
                                var expLink = _explanationImageLink;
                                if (_explanationImage != null) {
                                  expLink =
                                      await widget.api.uploadQuestionImage(
                                    batchId: _batchId!,
                                    classLabel: _classLabel.text.trim(),
                                    subject: _subject.text.trim(),
                                    topic: _topic.text.trim().isEmpty
                                        ? 'MCQs'
                                        : _topic.text.trim(),
                                    file: _explanationImage!,
                                    contentType: 'mcq_explanation',
                                  );
                                }
                                if (_editingId == null) {
                                  await widget.api.addMcq(
                                    batchId: _batchId!,
                                    classLabel: _classLabel.text.trim(),
                                    subject: _subject.text.trim(),
                                    topic: _topic.text.trim(),
                                    question: _question.text.trim(),
                                    optionA: _optionA.text.trim(),
                                    optionB: _optionB.text.trim(),
                                    optionC: _optionC.text.trim(),
                                    optionD: _optionD.text.trim(),
                                    correctOption: _correct,
                                    explanation: _explanation.text.trim(),
                                    questionImageLink: link,
                                    explanationImageLink: expLink,
                                  );
                                } else {
                                  await widget.api.updateMcq(
                                    id: _editingId!,
                                    classLabel: _classLabel.text.trim(),
                                    subject: _subject.text.trim(),
                                    topic: _topic.text.trim(),
                                    question: _question.text.trim(),
                                    optionA: _optionA.text.trim(),
                                    optionB: _optionB.text.trim(),
                                    optionC: _optionC.text.trim(),
                                    optionD: _optionD.text.trim(),
                                    correctOption: _correct,
                                    explanation: _explanation.text.trim(),
                                    questionImageLink:
                                        link.isEmpty ? null : link,
                                    explanationImageLink:
                                        expLink.isEmpty ? null : expLink,
                                  );
                                }
                                await _load();
                                _resetForm();
                                if (context.mounted) {
                                  _showActionSnackBar(
                                      context, 'MCQ saved successfully');
                                }
                              } catch (e) {
                                if (context.mounted) {
                                  _showActionSnackBar(
                                      context, 'MCQ save failed',
                                      isError: true);
                                }
                              }
                            },
                      child: Text(_editingId == null
                          ? 'Add MCQ of the Day'
                          : 'Update MCQ'),
                    ),
                    if (_editingId != null)
                      OutlinedButton(
                        onPressed: _resetForm,
                        child: const Text('Cancel'),
                      ),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 8),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Row(
            children: [
              const Icon(Icons.today_rounded,
                  size: 16, color: Color(0xFF1F8A54)),
              const SizedBox(width: 6),
              Text(
                "Today's MCQs (${_todaysMcqs.length})",
                style:
                    const TextStyle(fontWeight: FontWeight.w700, fontSize: 15),
              ),
            ],
          ),
        ),
        if (_todaysMcqs.isEmpty)
          const Padding(
            padding: EdgeInsets.only(bottom: 12),
            child: Text(
              'Aaj ke liye koi MCQ nahi hai. Upar form se add karein.',
              style: TextStyle(color: Colors.grey),
            ),
          )
        else
          ..._todaysMcqs.map((m) => _buildMcqCard(m, archived: false)),
        if (_archivedMcqs.isNotEmpty) ...[
          const SizedBox(height: 12),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Row(
              children: [
                const Icon(Icons.history_rounded, size: 16, color: Colors.grey),
                const SizedBox(width: 6),
                Text(
                  'Archived MCQs (${_archivedMcqs.length})',
                  style: const TextStyle(
                      fontWeight: FontWeight.w700, fontSize: 15),
                ),
              ],
            ),
          ),
          const Padding(
            padding: EdgeInsets.only(bottom: 8),
            child: Text(
              'Purane din ke MCQs — students inhe sirf dekh sakte hain, test nahi de sakte.',
              style: TextStyle(fontSize: 12, color: Colors.grey),
            ),
          ),
          ..._archivedMcqs.map((m) => _buildMcqCard(m, archived: true)),
        ],
      ],
    );
  }
}

// ───────────────────────────────────────────────────────────────────���─────────

class VideosPage extends StatefulWidget {
  const VideosPage({super.key, required this.api});
  final AdminApi api;
  @override
  State<VideosPage> createState() => _VideosPageState();
}

class _VideosPageState extends State<VideosPage> {
  final _title = TextEditingController();
  final _classLabel = TextEditingController(text: 'Class 11');
  final _subject = TextEditingController(text: 'Biology');
  final _topic = TextEditingController();
  File? _video;
  double _progress = 0.0;
  int? _batchId;
  int? _editingId;
  List<dynamic> _batches = const [];
  List<dynamic> _items = const [];
  String? _status;
  bool _uploading = false;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final b = await widget.api.batches();
    final v = await widget.api.videos();
    setState(() {
      _batches = b['batches'] as List<dynamic>;
      _items = v['videos'] as List<dynamic>;
      _batchId ??= _batches.isNotEmpty
          ? (_batches.first as Map<String, dynamic>)['id'] as int
          : null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                DropdownButtonFormField<int>(
                  initialValue: _batchId,
                  items: _batches
                      .map((e) => DropdownMenuItem(
                          value: (e as Map<String, dynamic>)['id'] as int,
                          child: Text(e['name'].toString())))
                      .toList(),
                  onChanged: (v) => setState(() => _batchId = v),
                  decoration: const InputDecoration(labelText: 'Batch'),
                ),
                const SizedBox(height: 8),
                TextField(
                    controller: _title,
                    decoration:
                        const InputDecoration(labelText: 'Video title')),
                const SizedBox(height: 8),
                TextField(
                    controller: _classLabel,
                    decoration: const InputDecoration(labelText: 'Class')),
                const SizedBox(height: 8),
                TextField(
                    controller: _subject,
                    decoration: const InputDecoration(labelText: 'Subject')),
                const SizedBox(height: 8),
                TextField(
                    controller: _topic,
                    decoration: const InputDecoration(labelText: 'Topic')),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(
                        child: Text(_video == null
                            ? 'No file selected'
                            : _video!.path)),
                    TextButton(
                      onPressed: () async {
                        final result = await FilePicker.platform
                            .pickFiles(type: FileType.video);
                        if (result?.files.single.path == null) return;
                        setState(
                            () => _video = File(result!.files.single.path!));
                      },
                      child: const Text('Pick video'),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                FilledButton(
                  onPressed: _batchId == null || _uploading
                      ? null
                      : () async {
                          setState(() {
                            _uploading = true;
                            _status = null;
                          });
                          try {
                            if (_editingId == null) {
                              if (_title.text.trim().isEmpty) {
                                throw Exception('Video title is required');
                              }
                              if (_video == null) {
                                throw Exception('Pick a video file first');
                              }
                              await widget.api.uploadVideoChunked(
                                batchId: _batchId!,
                                classLabel: _classLabel.text.trim(),
                                title: _title.text.trim(),
                                subject: _subject.text.trim(),
                                topic: _topic.text.trim(),
                                file: _video!,
                                onProgress: (p) {
                                  if (mounted) setState(() => _progress = p);
                                },
                              );
                              _video = null;
                              _title.clear();
                              _topic.clear();
                              setState(() => _progress = 0.0);
                              setState(() =>
                                  _status = 'Video uploaded successfully');
                              if (context.mounted) {
                                _showActionSnackBar(
                                    context, 'Video uploaded successfully');
                              }
                            } else {
                              await widget.api.updateVideo(
                                id: _editingId!,
                                classLabel: _classLabel.text.trim(),
                                title: _title.text.trim(),
                                subject: _subject.text.trim(),
                                topic: _topic.text.trim(),
                              );
                              _editingId = null;
                              setState(() => _status = 'Video updated');
                              if (context.mounted) {
                                _showActionSnackBar(
                                    context, 'Video updated successfully');
                              }
                            }
                            await _load();
                          } catch (e) {
                            setState(() => _status = 'Upload failed: $e');
                            if (context.mounted) {
                              _showActionSnackBar(
                                  context, 'Video action failed',
                                  isError: true);
                            }
                          } finally {
                            if (mounted) {
                              setState(() => _uploading = false);
                            }
                          }
                        },
                  child: Text(
                    _uploading
                        ? 'Please wait...'
                        : (_editingId == null
                            ? 'Upload Video'
                            : 'Update Video'),
                  ),
                ),
                if (_uploading) ...[
                  const SizedBox(height: 10),
                  LinearProgressIndicator(
                      value: _progress == 0 ? null : _progress),
                ],
                if (_status != null) ...[
                  const SizedBox(height: 8),
                  Text(_status!),
                ],
              ],
            ),
          ),
        ),
        if (_items.isNotEmpty)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Row(children: [
              const Icon(Icons.smart_display_rounded,
                  size: 16, color: Color(0xFF2E7D32)),
              const SizedBox(width: 6),
              Text('Videos (${_items.length})',
                  style: const TextStyle(
                      fontWeight: FontWeight.w700, fontSize: 15)),
            ]),
          ),
        ..._items.map((e) {
          final item = e as Map<String, dynamic>;
          return Container(
            margin: const EdgeInsets.only(bottom: 10),
            decoration: BoxDecoration(
              color: Theme.of(context).cardTheme.color,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                  color: Theme.of(context).colorScheme.outlineVariant),
            ),
            padding: const EdgeInsets.all(14),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                      color: const Color(0xFF2E7D32).withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(12)),
                  child: const Icon(Icons.smart_display_rounded,
                      color: Color(0xFF2E7D32), size: 22),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(item['title']?.toString() ?? '',
                            style: const TextStyle(
                                fontWeight: FontWeight.w700, fontSize: 14)),
                        const SizedBox(height: 3),
                        Text(
                            '${item['subject'] ?? ''} • ${item['topic'] ?? ''}',
                            style: const TextStyle(
                                fontSize: 12, color: Color(0xFF757575))),
                        const SizedBox(height: 6),
                        Wrap(spacing: 6, children: [
                          _ChipBadge(
                              label: item['batch_name']?.toString() ?? '',
                              color: const Color(0xFF1976D2)),
                          _ChipBadge(
                              label: item['class_label']?.toString() ?? '',
                              color: const Color(0xFF7B1FA2)),
                        ]),
                      ]),
                ),
                IconButton(
                    icon: const Icon(Icons.edit_outlined, size: 20),
                    onPressed: () {
                      setState(() {
                        _editingId = item['id'] as int;
                        _title.text = item['title']?.toString() ?? '';
                        _classLabel.text =
                            item['class_label']?.toString() ?? '';
                        _subject.text = item['subject']?.toString() ?? '';
                        _topic.text = item['topic']?.toString() ?? '';
                      });
                    }),
                IconButton(
                  icon: const Icon(Icons.delete_outline,
                      size: 20, color: Color(0xFFD92D20)),
                  onPressed: () async {
                    final ok = await _confirmDeleteDialog(context,
                        title: 'Delete Video?',
                        body: 'This video entry will be deleted.');
                    if (!ok) return;
                    try {
                      await widget.api.deleteVideo(item['id'] as int);
                      await _load();
                      if (context.mounted) {
                        _showActionSnackBar(
                            context, 'Video deleted successfully');
                      }
                    } catch (_) {
                      if (context.mounted) {
                        _showActionSnackBar(context, 'Video delete failed',
                            isError: true);
                      }
                    }
                  },
                ),
              ],
            ),
          );
        }),
      ],
    );
  }
}

class PackagesPage extends StatefulWidget {
  const PackagesPage({super.key, required this.api});
  final AdminApi api;
  @override
  State<PackagesPage> createState() => _PackagesPageState();
}

class _PackagesPageState extends State<PackagesPage> {
  final _name = TextEditingController();
  final _price = TextEditingController();
  final _validity = TextEditingController();
  final _highlight = TextEditingController();
  final _features = TextEditingController();
  int? _editingId;
  List<dynamic> _items = const [];

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final data = await widget.api.packages();
    setState(() => _items = data['packages'] as List<dynamic>);
  }

  List<String> get _featureList => _features.text
      .split('\n')
      .map((e) => e.trim())
      .where((e) => e.isNotEmpty)
      .toList();

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                TextField(
                    controller: _name,
                    decoration:
                        const InputDecoration(labelText: 'Package name')),
                const SizedBox(height: 8),
                TextField(
                    controller: _price,
                    decoration:
                        const InputDecoration(labelText: 'Price label')),
                const SizedBox(height: 8),
                TextField(
                    controller: _validity,
                    decoration: const InputDecoration(labelText: 'Validity')),
                const SizedBox(height: 8),
                TextField(
                    controller: _highlight,
                    decoration: const InputDecoration(labelText: 'Highlight')),
                const SizedBox(height: 8),
                TextField(
                  controller: _features,
                  minLines: 3,
                  maxLines: 5,
                  decoration: const InputDecoration(
                    labelText: 'Features (one per line)',
                  ),
                ),
                const SizedBox(height: 8),
                FilledButton(
                  onPressed: () async {
                    try {
                      if (_editingId == null) {
                        await widget.api.addPackage(
                          name: _name.text.trim(),
                          priceLabel: _price.text.trim(),
                          validity: _validity.text.trim(),
                          highlight: _highlight.text.trim(),
                          features: _featureList,
                        );
                        if (context.mounted) {
                          _showActionSnackBar(
                              context, 'Package added successfully');
                        }
                      } else {
                        await widget.api.updatePackage(
                          id: _editingId!,
                          name: _name.text.trim(),
                          priceLabel: _price.text.trim(),
                          validity: _validity.text.trim(),
                          highlight: _highlight.text.trim(),
                          features: _featureList,
                        );
                        _editingId = null;
                        if (context.mounted) {
                          _showActionSnackBar(
                              context, 'Package updated successfully');
                        }
                      }
                      await _load();
                    } catch (_) {
                      if (context.mounted) {
                        _showActionSnackBar(context, 'Package save failed',
                            isError: true);
                      }
                    }
                  },
                  child: Text(
                      _editingId == null ? 'Add Package' : 'Update Package'),
                ),
              ],
            ),
          ),
        ),
        if (_items.isNotEmpty)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Row(children: [
              const Icon(Icons.workspace_premium_rounded,
                  size: 16, color: Color(0xFFC99A33)),
              const SizedBox(width: 6),
              Text('Packages (${_items.length})',
                  style: const TextStyle(
                      fontWeight: FontWeight.w700, fontSize: 15)),
            ]),
          ),
        ..._items.map((e) {
          final item = e as Map<String, dynamic>;
          final featureList = (item['features_json'] as List<dynamic>? ?? []);
          return Container(
            margin: const EdgeInsets.only(bottom: 10),
            decoration: BoxDecoration(
              color: Theme.of(context).cardTheme.color,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                  color: Theme.of(context).colorScheme.outlineVariant),
            ),
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: const Color(0xFFC99A33).withValues(alpha: 0.12),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Icon(Icons.workspace_premium_rounded,
                          color: Color(0xFFC99A33), size: 22),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(item['name']?.toString() ?? '',
                                style: const TextStyle(
                                    fontWeight: FontWeight.w700, fontSize: 15)),
                            const SizedBox(height: 3),
                            Row(children: [
                              const Icon(Icons.currency_rupee,
                                  size: 13, color: Color(0xFFE85A1C)),
                              Text(item['price_label']?.toString() ?? '',
                                  style: const TextStyle(
                                      fontSize: 13,
                                      color: Color(0xFFE85A1C),
                                      fontWeight: FontWeight.w600)),
                              const SizedBox(width: 8),
                              Text('• ${item['validity'] ?? ''}',
                                  style: const TextStyle(
                                      fontSize: 12, color: Color(0xFF757575))),
                            ]),
                          ]),
                    ),
                    IconButton(
                      icon: const Icon(Icons.edit_outlined, size: 20),
                      onPressed: () => setState(() {
                        _editingId = item['id'] as int;
                        _name.text = item['name']?.toString() ?? '';
                        _price.text = item['price_label']?.toString() ?? '';
                        _validity.text = item['validity']?.toString() ?? '';
                        _highlight.text = item['highlight']?.toString() ?? '';
                        _features.text =
                            (item['features_json'] as List<dynamic>? ?? [])
                                .join('\n');
                      }),
                    ),
                    IconButton(
                      icon: const Icon(Icons.delete_outline,
                          size: 20, color: Color(0xFFD92D20)),
                      onPressed: () async {
                        final ok = await _confirmDeleteDialog(context,
                            title: 'Delete Package?',
                            body: 'This package will be removed permanently.');
                        if (!ok) return;
                        try {
                          await widget.api.deletePackage(item['id'] as int);
                          await _load();
                          if (context.mounted) {
                            _showActionSnackBar(
                                context, 'Package deleted successfully');
                          }
                        } catch (_) {
                          if (context.mounted) {
                            _showActionSnackBar(
                                context, 'Package delete failed',
                                isError: true);
                          }
                        }
                      },
                    ),
                  ],
                ),
                if ((item['highlight']?.toString() ?? '').isNotEmpty) ...[
                  const SizedBox(height: 8),
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(
                      color: const Color(0xFFC99A33).withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(item['highlight'].toString(),
                        style: const TextStyle(
                            fontSize: 12,
                            color: Color(0xFF8B6914),
                            fontWeight: FontWeight.w500)),
                  ),
                ],
                if (featureList.isNotEmpty) ...[
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 6,
                    runSpacing: 4,
                    children: featureList
                        .take(4)
                        .map((f) => Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                  color: const Color(0xFF1976D2)
                                      .withValues(alpha: 0.1),
                                  borderRadius: BorderRadius.circular(20)),
                              child: Text(f.toString(),
                                  style: const TextStyle(
                                      fontSize: 11, color: Color(0xFF1976D2))),
                            ))
                        .toList(),
                  ),
                  if (featureList.length > 4)
                    Padding(
                      padding: const EdgeInsets.only(top: 4),
                      child: Text('+${featureList.length - 4} more',
                          style: const TextStyle(
                              fontSize: 11, color: Color(0xFF757575))),
                    ),
                ],
              ],
            ),
          );
        }),
      ],
    );
  }
}

// ── Shared UI helpers ─────────────────────────────────────────────────────────

class _ChipBadge extends StatelessWidget {
  const _ChipBadge({required this.label, required this.color});
  final String label;
  final Color color;
  @override
  Widget build(BuildContext context) {
    if (label.isEmpty) return const SizedBox.shrink();
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(label,
          style: TextStyle(
              fontSize: 11, fontWeight: FontWeight.w600, color: color)),
    );
  }
}

// ── Users Page ────────────────────────────────────────────────────────────────

class UsersPage extends StatefulWidget {
  const UsersPage({super.key, required this.api});
  final AdminApi api;
  @override
  State<UsersPage> createState() => _UsersPageState();
}

class _UsersPageState extends State<UsersPage> {
  List<dynamic> _users = const [];
  bool _loading = true;
  String? _error;
  final _search = TextEditingController();
  String _query = '';

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await widget.api.users();
      setState(() {
        _users = (data['users'] as List<dynamic>? ?? []);
        _loading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _loading = false;
      });
    }
  }

  List<dynamic> get _filtered {
    if (_query.isEmpty) return _users;
    final q = _query.toLowerCase();
    return _users.where((u) {
      final m = u as Map<String, dynamic>;
      return (m['full_name']?.toString().toLowerCase().contains(q) ?? false) ||
          (m['email']?.toString().toLowerCase().contains(q) ?? false) ||
          (m['phone']?.toString().toLowerCase().contains(q) ?? false);
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    if (_loading) return const Center(child: CircularProgressIndicator());
    if (_error != null) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('Error: $_error', textAlign: TextAlign.center),
            const SizedBox(height: 12),
            FilledButton.icon(
              onPressed: _load,
              icon: const Icon(Icons.refresh),
              label: const Text('Retry'),
            ),
          ],
        ),
      );
    }
    final filtered = _filtered;
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
          child: Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _search,
                  decoration: InputDecoration(
                    hintText: 'Search by name, email or phone…',
                    prefixIcon: const Icon(Icons.search, size: 20),
                    suffixIcon: _query.isNotEmpty
                        ? IconButton(
                            icon: const Icon(Icons.clear, size: 18),
                            onPressed: () {
                              _search.clear();
                              setState(() => _query = '');
                            },
                          )
                        : null,
                    contentPadding: const EdgeInsets.symmetric(
                        horizontal: 14, vertical: 10),
                  ),
                  onChanged: (v) => setState(() => _query = v),
                ),
              ),
              const SizedBox(width: 10),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  color: scheme.primaryContainer,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  '${filtered.length} users',
                  style: TextStyle(
                      fontWeight: FontWeight.w700,
                      color: scheme.onPrimaryContainer,
                      fontSize: 13),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 8),
        Expanded(
          child: filtered.isEmpty
              ? const Center(child: Text('No users found.'))
              : ListView.separated(
                  padding: const EdgeInsets.fromLTRB(16, 4, 16, 24),
                  itemCount: filtered.length,
                  separatorBuilder: (context2, i2) => const SizedBox(height: 8),
                  itemBuilder: (context, i) {
                    final u = filtered[i] as Map<String, dynamic>;
                    final name = u['full_name']?.toString() ?? 'Unknown';
                    final phone = u['phone']?.toString() ?? '';
                    final batch = u['batch_name']?.toString() ?? '';
                    final plan = u['preferred_plan']?.toString() ?? '';
                    final year = u['target_exam_year']?.toString() ?? '';
                    final isPremium = u['has_active_subscription'] == true;
                    final isBlocked = u['is_blocked'] == true;
                    final subscriptionPlan =
                        u['subscription_plan']?.toString() ?? '';
                    final expiresAt =
                        u['subscription_expires_at']?.toString() ?? '';
                    final initials = name.trim().isNotEmpty
                        ? name
                            .trim()
                            .split(' ')
                            .map((w) => w.isNotEmpty ? w[0] : '')
                            .take(2)
                            .join()
                            .toUpperCase()
                        : '?';
                    final colors = [
                      const Color(0xFF1976D2),
                      const Color(0xFF7B1FA2),
                      const Color(0xFFE85A1C),
                      const Color(0xFF2E7D32),
                      const Color(0xFFC99A33),
                      const Color(0xFFD92D20),
                    ];
                    final avatarColor = colors[i % colors.length];
                    return Container(
                      decoration: BoxDecoration(
                        color: Theme.of(context).cardTheme.color,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: scheme.outlineVariant),
                      ),
                      padding: const EdgeInsets.all(14),
                      child: Row(
                        children: [
                          CircleAvatar(
                            radius: 24,
                            backgroundColor:
                                avatarColor.withValues(alpha: 0.15),
                            child: Text(
                              initials,
                              style: TextStyle(
                                color: avatarColor,
                                fontWeight: FontWeight.w700,
                                fontSize: 15,
                              ),
                            ),
                          ),
                          const SizedBox(width: 14),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Expanded(
                                      child: Text(name,
                                          style: const TextStyle(
                                              fontWeight: FontWeight.w700,
                                              fontSize: 15)),
                                    ),
                                    if (isBlocked)
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                        decoration: BoxDecoration(
                                          color: Colors.red.withValues(alpha: 0.1),
                                          borderRadius: BorderRadius.circular(4),
                                          border: Border.all(color: Colors.red.withValues(alpha: 0.5)),
                                        ),
                                        child: const Text('BLOCKED', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Colors.red)),
                                      ),
                                  ],
                                ),
                                const SizedBox(height: 4),
                                Container(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 8, vertical: 3),
                                  decoration: BoxDecoration(
                                    color: isPremium
                                        ? const Color(0xFF2E7D32)
                                            .withValues(alpha: 0.14)
                                        : const Color(0xFF757575)
                                            .withValues(alpha: 0.12),
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                  child: Text(
                                    isPremium
                                        ? 'Premium${subscriptionPlan.isNotEmpty ? ' • $subscriptionPlan' : ''}'
                                        : 'Free user',
                                    style: TextStyle(
                                      fontSize: 11,
                                      fontWeight: FontWeight.w700,
                                      color: isPremium
                                          ? const Color(0xFF2E7D32)
                                          : const Color(0xFF757575),
                                    ),
                                  ),
                                ),
                                if (isPremium && expiresAt.isNotEmpty) ...[
                                  const SizedBox(height: 4),
                                  Text(
                                    'Valid till ${expiresAt.split('T').first}',
                                    style: const TextStyle(
                                        fontSize: 11, color: Color(0xFF757575)),
                                  ),
                                ],
                                if (phone.isNotEmpty) ...[
                                  const SizedBox(height: 2),
                                  Row(children: [
                                    const Icon(Icons.phone_outlined,
                                        size: 13, color: Color(0xFF757575)),
                                    const SizedBox(width: 4),
                                    Text(phone,
                                        style: const TextStyle(
                                            fontSize: 13,
                                            color: Color(0xFF757575))),
                                  ]),
                                ],
                                if (batch.isNotEmpty ||
                                    plan.isNotEmpty ||
                                    year.isNotEmpty) ...[
                                  const SizedBox(height: 6),
                                  Wrap(
                                    spacing: 6,
                                    runSpacing: 4,
                                    children: [
                                      if (batch.isNotEmpty)
                                        Container(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 8, vertical: 3),
                                          decoration: BoxDecoration(
                                            color: scheme.secondaryContainer,
                                            borderRadius:
                                                BorderRadius.circular(20),
                                          ),
                                          child: Text(batch,
                                              style: TextStyle(
                                                  fontSize: 11,
                                                  fontWeight: FontWeight.w600,
                                                  color: scheme
                                                      .onSecondaryContainer)),
                                        ),
                                      if (year.isNotEmpty)
                                        Container(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 8, vertical: 3),
                                          decoration: BoxDecoration(
                                            color: const Color(0xFF1976D2)
                                                .withValues(alpha: 0.12),
                                            borderRadius:
                                                BorderRadius.circular(20),
                                          ),
                                          child: Text('Target $year',
                                              style: const TextStyle(
                                                  fontSize: 11,
                                                  fontWeight: FontWeight.w600,
                                                  color: Color(0xFF1976D2))),
                                        ),
                                      if (plan.isNotEmpty)
                                        Container(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 8, vertical: 3),
                                          decoration: BoxDecoration(
                                            color: const Color(0xFFE85A1C)
                                                .withValues(alpha: 0.12),
                                            borderRadius:
                                                BorderRadius.circular(20),
                                          ),
                                          child: Text(plan,
                                              style: const TextStyle(
                                                  fontSize: 11,
                                                  fontWeight: FontWeight.w600,
                                                  color: Color(0xFFE85A1C))),
                                        ),
                                    ],
                                  ),
                                ],
                              ],
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
        ),
      ],
    );
  }
}

class ComplaintsPage extends StatefulWidget {
  const ComplaintsPage({super.key, required this.api});
  final AdminApi api;
  @override
  State<ComplaintsPage> createState() => _ComplaintsPageState();
}

class _ComplaintsPageState extends State<ComplaintsPage> {
  List<dynamic> _complaints = const [];
  bool _loading = true;
  String? _error;
  final _search = TextEditingController();
  String _query = '';
  String _filterStatus = 'all';
  String _filterType = 'all'; // 'all', 'question_report', 'general'

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await widget.api.complaints();
      setState(() {
        _complaints = (data['complaints'] as List<dynamic>? ?? []);
        _loading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _loading = false;
      });
    }
  }

  List<dynamic> get _filtered {
    var filtered = _complaints;
    // Filter by report type
    if (_filterType != 'all') {
      filtered = filtered.where((c) {
        final m = c as Map<String, dynamic>;
        final rt = m['report_type']?.toString() ?? 'general';
        return rt == _filterType;
      }).toList();
    }
    // Filter by status
    if (_filterStatus != 'all') {
      filtered = filtered.where((c) {
        final m = c as Map<String, dynamic>;
        return (m['status']?.toString() ?? '').toLowerCase() == _filterStatus;
      }).toList();
    }
    if (_query.isEmpty) return filtered;
    final q = _query.toLowerCase();
    return filtered.where((c) {
      final m = c as Map<String, dynamic>;
      return (m['full_name']?.toString().toLowerCase().contains(q) ?? false) ||
          (m['email']?.toString().toLowerCase().contains(q) ?? false) ||
          (m['title']?.toString().toLowerCase().contains(q) ?? false);
    }).toList();
  }

  int _countByType(String type) {
    if (type == 'all') return _complaints.length;
    return _complaints.where((c) {
      final m = c as Map<String, dynamic>;
      final rt = m['report_type']?.toString() ?? 'general';
      return rt == type;
    }).length;
  }

  Color _statusColor(String? status) {
    switch (status?.toLowerCase()) {
      case 'open':
        return const Color(0xFFE85A1C);
      case 'in-progress':
        return const Color(0xFF2196F3);
      case 'resolved':
        return const Color(0xFF4CAF50);
      case 'closed':
        return const Color(0xFF9E9E9E);
      default:
        return const Color(0xFF757575);
    }
  }

  Color _reportTypeColor(String? reportType) {
    switch (reportType) {
      case 'question_report':
        return const Color(0xFFFF6B35);
      default:
        return const Color(0xFF5C6BC0);
    }
  }

  IconData _reportTypeIcon(String? reportType) {
    switch (reportType) {
      case 'question_report':
        return Icons.quiz_outlined;
      default:
        return Icons.support_agent_outlined;
    }
  }

  String _reportTypeLabel(String? reportType) {
    switch (reportType) {
      case 'question_report':
        return 'Question Report';
      default:
        return 'General';
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) return const Center(child: CircularProgressIndicator());
    if (_error != null) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.error_outline, size: 48, color: Colors.red),
            const SizedBox(height: 12),
            Text('Error: $_error', textAlign: TextAlign.center),
            const SizedBox(height: 12),
            FilledButton.icon(
              onPressed: _load,
              icon: const Icon(Icons.refresh),
              label: const Text('Retry'),
            ),
          ],
        ),
      );
    }
    final filtered = _filtered;
    return Column(
      children: [
        // ── Type Filter Tabs ──────────────────────────────────────────────
        Container(
          color: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.4),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          child: Row(
            children: [
              _buildTypeTab('all', 'All', Icons.list_alt_outlined),
              const SizedBox(width: 8),
              _buildTypeTab('question_report', 'Question Reports', Icons.quiz_outlined),
              const SizedBox(width: 8),
              _buildTypeTab('general', 'General', Icons.support_agent_outlined),
            ],
          ),
        ),

        // ── Search + Status Filter ────────────────────────────────────────
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
          child: Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _search,
                  decoration: InputDecoration(
                    hintText: 'Search by name, email or issue…',
                    prefixIcon: const Icon(Icons.search, size: 20),
                    suffixIcon: _query.isNotEmpty
                        ? IconButton(
                            icon: const Icon(Icons.clear, size: 18),
                            onPressed: () {
                              _search.clear();
                              setState(() => _query = '');
                            },
                          )
                        : null,
                    contentPadding: const EdgeInsets.symmetric(
                        horizontal: 14, vertical: 10),
                  ),
                  onChanged: (v) => setState(() => _query = v),
                ),
              ),
              const SizedBox(width: 10),
              DropdownButton<String>(
                value: _filterStatus,
                items: const [
                  DropdownMenuItem(value: 'all', child: Text('All Status')),
                  DropdownMenuItem(value: 'open', child: Text('Open')),
                  DropdownMenuItem(value: 'in-progress', child: Text('In Progress')),
                  DropdownMenuItem(value: 'resolved', child: Text('Resolved')),
                  DropdownMenuItem(value: 'closed', child: Text('Closed')),
                ],
                onChanged: (v) => setState(() => _filterStatus = v ?? 'all'),
              ),
            ],
          ),
        ),

        // ── List ──────────────────────────────────────────────────────────
        Expanded(
          child: filtered.isEmpty
              ? Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        _filterType == 'question_report'
                            ? Icons.quiz_outlined
                            : Icons.inbox_outlined,
                        size: 48,
                        color: Colors.grey.shade400,
                      ),
                      const SizedBox(height: 12),
                      Text(
                        _query.isEmpty && _filterStatus == 'all' && _filterType == 'all'
                            ? 'No reports yet'
                            : 'No results found',
                        style: const TextStyle(color: Colors.grey),
                      ),
                    ],
                  ),
                )
              : ListView.builder(
                  padding: const EdgeInsets.only(bottom: 24),
                  itemCount: filtered.length,
                  itemBuilder: (_, i) {
                    final complaint = filtered[i] as Map<String, dynamic>;
                    final status = complaint['status']?.toString() ?? 'open';
                    final createdAt = complaint['created_at']?.toString() ?? '';
                    final reportType = complaint['report_type']?.toString() ?? 'general';
                    final typeColor = _reportTypeColor(reportType);
                    final typeIcon = _reportTypeIcon(reportType);
                    final typeLabel = _reportTypeLabel(reportType);

                    return Card(
                      margin: const EdgeInsets.symmetric(
                          horizontal: 16, vertical: 6),
                      elevation: 1,
                      child: InkWell(
                        borderRadius: BorderRadius.circular(12),
                        onTap: () {
                          showDialog(
                            context: context,
                            builder: (_) => _ComplaintDetailsDialog(
                              complaint: complaint,
                              api: widget.api,
                              onStatusChanged: _load,
                            ),
                          );
                        },
                        child: Padding(
                          padding: const EdgeInsets.all(12),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              // Leading icon
                              Container(
                                width: 44,
                                height: 44,
                                decoration: BoxDecoration(
                                  color: typeColor.withValues(alpha: 0.15),
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: Icon(
                                  typeIcon,
                                  color: typeColor,
                                  size: 22,
                                ),
                              ),
                              const SizedBox(width: 12),
                              // Content
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        // Report type badge
                                        Container(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 7, vertical: 2),
                                          decoration: BoxDecoration(
                                            color: typeColor.withValues(alpha: 0.1),
                                            borderRadius: BorderRadius.circular(4),
                                            border: Border.all(
                                                color: typeColor.withValues(alpha: 0.3)),
                                          ),
                                          child: Text(
                                            typeLabel,
                                            style: TextStyle(
                                              fontSize: 10,
                                              fontWeight: FontWeight.w600,
                                              color: typeColor,
                                            ),
                                          ),
                                        ),
                                        const SizedBox(width: 6),
                                        // Status badge
                                        Container(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 7, vertical: 2),
                                          decoration: BoxDecoration(
                                            color: _statusColor(status)
                                                .withValues(alpha: 0.1),
                                            borderRadius: BorderRadius.circular(4),
                                          ),
                                          child: Text(
                                            status,
                                            style: TextStyle(
                                              fontSize: 10,
                                              fontWeight: FontWeight.w600,
                                              color: _statusColor(status),
                                            ),
                                          ),
                                        ),
                                        const Spacer(),
                                        Text(
                                          createdAt.split('T').first,
                                          style: const TextStyle(
                                            fontSize: 10,
                                            color: Colors.grey,
                                          ),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 6),
                                    Text(
                                      complaint['title']?.toString() ?? 'N/A',
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(
                                          fontWeight: FontWeight.w600,
                                          fontSize: 13),
                                    ),
                                    const SizedBox(height: 2),
                                    Text(
                                      '${complaint['full_name'] ?? 'N/A'}  •  ${complaint['phone'] ?? complaint['email'] ?? 'N/A'}',
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(
                                          fontSize: 11, color: Colors.grey),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      complaint['description']?.toString() ?? '',
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(
                                          fontSize: 11,
                                          color: Colors.grey),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
        ),
      ],
    );
  }

  Widget _buildTypeTab(String type, String label, IconData icon) {
    final isSelected = _filterType == type;
    final count = _countByType(type);
    final color = type == 'question_report'
        ? const Color(0xFFFF6B35)
        : type == 'general'
            ? const Color(0xFF5C6BC0)
            : Theme.of(context).colorScheme.primary;
    return Expanded(
      child: InkWell(
        borderRadius: BorderRadius.circular(8),
        onTap: () => setState(() => _filterType = type),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 180),
          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 6),
          decoration: BoxDecoration(
            color: isSelected ? color.withValues(alpha: 0.12) : Colors.transparent,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color: isSelected ? color : Colors.transparent,
              width: 1.5,
            ),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icon,
                  size: 18, color: isSelected ? color : Colors.grey.shade500),
              const SizedBox(height: 3),
              Text(
                label,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 10,
                  fontWeight:
                      isSelected ? FontWeight.w700 : FontWeight.w500,
                  color: isSelected ? color : Colors.grey.shade600,
                ),
              ),
              const SizedBox(height: 2),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                decoration: BoxDecoration(
                  color: isSelected
                      ? color.withValues(alpha: 0.2)
                      : Colors.grey.shade200,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  '$count',
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w700,
                    color: isSelected ? color : Colors.grey.shade600,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _search.dispose();
    super.dispose();
  }
}

class _ComplaintDetailsDialog extends StatefulWidget {
  final Map<String, dynamic> complaint;
  final AdminApi api;
  final VoidCallback onStatusChanged;

  const _ComplaintDetailsDialog({
    required this.complaint,
    required this.api,
    required this.onStatusChanged,
  });

  @override
  State<_ComplaintDetailsDialog> createState() =>
      _ComplaintDetailsDialogState();
}

class _ComplaintDetailsDialogState extends State<_ComplaintDetailsDialog> {
  late String _status;
  bool _updating = false;

  @override
  void initState() {
    super.initState();
    _status = widget.complaint['status']?.toString() ?? 'open';
  }

  Future<void> _updateStatus(String newStatus) async {
    setState(() => _updating = true);
    try {
      await widget.api.updateComplaintStatus(
        complaintId: widget.complaint['id'],
        status: newStatus,
      );
      setState(() => _status = newStatus);
      widget.onStatusChanged();
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Status updated successfully')),
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e'), backgroundColor: Colors.red),
      );
    } finally {
      setState(() => _updating = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final reportType = widget.complaint['report_type']?.toString() ?? 'general';
    final isQuestionReport = reportType == 'question_report';
    final typeColor = isQuestionReport
        ? const Color(0xFFFF6B35)
        : const Color(0xFF5C6BC0);
    final typeLabel = isQuestionReport ? 'Question Report' : 'General Complaint';

    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      title: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: typeColor.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(
              isQuestionReport ? Icons.quiz_outlined : Icons.support_agent_outlined,
              color: typeColor,
              size: 20,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Report Details',
                    style: TextStyle(
                        fontSize: 16, fontWeight: FontWeight.w700)),
                Container(
                  margin: const EdgeInsets.only(top: 3),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: typeColor.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(
                        color: typeColor.withValues(alpha: 0.3)),
                  ),
                  child: Text(
                    typeLabel,
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w600,
                      color: typeColor,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      content: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            _infoRow(Icons.title_outlined, 'Issue',
                widget.complaint['title']?.toString() ?? 'N/A'),
            const Divider(height: 20),
            _infoRow(Icons.person_outline, 'Name',
                widget.complaint['full_name']?.toString() ?? 'N/A'),
            _infoRow(Icons.email_outlined, 'Email',
                widget.complaint['email']?.toString() ?? 'N/A'),
            _infoRow(Icons.phone_outlined, 'Phone',
                widget.complaint['phone']?.toString() ?? 'N/A'),
            const Divider(height: 20),
            const Text(
              'Description:',
              style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13),
            ),
            const SizedBox(height: 8),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.grey.shade50,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.grey.shade200),
              ),
              child: Text(
                widget.complaint['description']?.toString() ?? 'N/A',
                style: const TextStyle(fontSize: 13, height: 1.5),
              ),
            ),
            const SizedBox(height: 16),
            const Text(
              'Update Status:',
              style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: ['open', 'in-progress', 'resolved', 'closed']
                  .map((s) => ChoiceChip(
                        label: Text(s),
                        selected: _status == s,
                        onSelected: _updating
                            ? null
                            : (selected) {
                                if (selected) _updateStatus(s);
                              },
                      ))
                  .toList(),
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Close'),
        ),
      ],
    );
  }

  Widget _infoRow(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 16, color: Colors.grey.shade500),
          const SizedBox(width: 8),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label,
                  style: const TextStyle(
                      fontSize: 10,
                      color: Colors.grey,
                      fontWeight: FontWeight.w500)),
              const SizedBox(height: 1),
              Text(value,
                  style: const TextStyle(
                      fontSize: 13, fontWeight: FontWeight.w600)),
            ],
          ),
        ],
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// NOTIFICATIONS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

class NotificationsPage extends StatefulWidget {
  const NotificationsPage({super.key, required this.api});
  final AdminApi api;
  @override
  State<NotificationsPage> createState() => _NotificationsPageState();
}

class _NotificationsPageState extends State<NotificationsPage>
    with SingleTickerProviderStateMixin {
  late final TabController _tabCtrl;

  // Compose fields
  final _titleCtrl = TextEditingController();
  final _bodyCtrl = TextEditingController();
  final _imageUrlCtrl = TextEditingController();
  String _targetType = 'all'; // 'all' or 'specific'
  bool _sending = false;

  // User selection
  List<dynamic> _allUsers = const [];
  final Set<int> _selectedUserIds = {};
  final _userSearchCtrl = TextEditingController();
  String _userQuery = '';
  bool _usersLoading = false;

  // History
  List<dynamic> _history = const [];
  bool _historyLoading = true;

  @override
  void initState() {
    super.initState();
    _tabCtrl = TabController(length: 2, vsync: this);
    _loadHistory();
    _tabCtrl.addListener(() {
      if (!_tabCtrl.indexIsChanging) setState(() {});
    });
  }

  @override
  void dispose() {
    _tabCtrl.dispose();
    _titleCtrl.dispose();
    _bodyCtrl.dispose();
    _imageUrlCtrl.dispose();
    _userSearchCtrl.dispose();
    super.dispose();
  }

  Future<void> _loadHistory() async {
    setState(() => _historyLoading = true);
    try {
      final data = await widget.api.notificationHistory();
      setState(() {
        _history = (data['notifications'] as List<dynamic>? ?? []);
        _historyLoading = false;
      });
    } catch (_) {
      setState(() => _historyLoading = false);
    }
  }

  Future<void> _loadUsers() async {
    if (_allUsers.isNotEmpty) return;
    setState(() => _usersLoading = true);
    try {
      final data = await widget.api.users();
      setState(() {
        _allUsers = (data['users'] as List<dynamic>? ?? []);
        _usersLoading = false;
      });
    } catch (_) {
      setState(() => _usersLoading = false);
    }
  }

  List<dynamic> get _filteredUsers {
    if (_userQuery.isEmpty) return _allUsers;
    final q = _userQuery.toLowerCase();
    return _allUsers.where((u) {
      final m = u as Map<String, dynamic>;
      return (m['full_name']?.toString().toLowerCase().contains(q) ?? false) ||
          (m['phone']?.toString().toLowerCase().contains(q) ?? false);
    }).toList();
  }

  Future<void> _send() async {
    final title = _titleCtrl.text.trim();
    final body = _bodyCtrl.text.trim();
    if (title.isEmpty || body.isEmpty) {
      _showSnack('Title aur Body required hain', isError: true);
      return;
    }
    if (_targetType == 'specific' && _selectedUserIds.isEmpty) {
      _showSnack('Kam se kam ek user select karo', isError: true);
      return;
    }
    setState(() => _sending = true);
    try {
      final result = await widget.api.sendNotification(
        title: title,
        body: body,
        imageUrl: _imageUrlCtrl.text.trim().isEmpty
            ? null
            : _imageUrlCtrl.text.trim(),
        targetType: _targetType,
        userIds: _targetType == 'specific' ? _selectedUserIds.toList() : [],
      );
      final sentCount = result['sentCount'] ?? 0;
      if (!mounted) return;
      _showSnack('✅ Notification bhej di! ($sentCount devices tak pahunchi)');
      _titleCtrl.clear();
      _bodyCtrl.clear();
      _imageUrlCtrl.clear();
      _selectedUserIds.clear();
      setState(() => _targetType = 'all');
      await _loadHistory();
      _tabCtrl.animateTo(1);
    } catch (e) {
      if (!mounted) return;
      _showSnack('Error: ${e.toString().replaceFirst("Exception: ", "")}',
          isError: true);
    } finally {
      if (mounted) setState(() => _sending = false);
    }
  }

  void _showSnack(String msg, {bool isError = false}) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text(msg),
      backgroundColor:
          isError ? Theme.of(context).colorScheme.error : const Color(0xFF2E7D32),
    ));
  }

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      children: [
        // Tab bar
        Container(
          color: isDark ? const Color(0xFF1A1D26) : Colors.white,
          child: TabBar(
            controller: _tabCtrl,
            tabs: const [
              Tab(icon: Icon(Icons.edit_notifications_outlined), text: 'Compose'),
              Tab(icon: Icon(Icons.history_rounded), text: 'History'),
            ],
            labelColor: scheme.primary,
            unselectedLabelColor: scheme.onSurface.withValues(alpha: 0.6),
            indicatorColor: scheme.primary,
          ),
        ),
        Expanded(
          child: TabBarView(
            controller: _tabCtrl,
            children: [
              _buildComposePage(scheme),
              _buildHistoryPage(scheme),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildComposePage(ColorScheme scheme) {
    final title = _titleCtrl.text.trim();
    final body = _bodyCtrl.text.trim();
    final hasPreview = title.isNotEmpty || body.isNotEmpty;

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      children: [
        // ── Section: Notification Content ───────────────────────────────────
        _sectionHeader('🔔 Notification Content', scheme),
        const SizedBox(height: 10),
        TextField(
          controller: _titleCtrl,
          onChanged: (_) => setState(() {}),
          decoration: const InputDecoration(
            labelText: 'Title *',
            hintText: 'e.g. 🏆 New Test Available!',
            prefixIcon: Icon(Icons.title_rounded, size: 20),
          ),
          maxLength: 65,
        ),
        const SizedBox(height: 12),
        TextField(
          controller: _bodyCtrl,
          onChanged: (_) => setState(() {}),
          maxLines: 3,
          decoration: const InputDecoration(
            labelText: 'Message Body *',
            hintText: 'e.g. Aaj ka Grand Test live ho gaya hai. Abhi attempt karo!',
            prefixIcon: Padding(
              padding: EdgeInsets.only(bottom: 40),
              child: Icon(Icons.message_outlined, size: 20),
            ),
          ),
          maxLength: 178,
        ),
        const SizedBox(height: 12),
        TextField(
          controller: _imageUrlCtrl,
          onChanged: (_) => setState(() {}),
          decoration: const InputDecoration(
            labelText: 'Image URL (optional)',
            hintText: 'https://...',
            prefixIcon: Icon(Icons.image_outlined, size: 20),
          ),
        ),

        // ── Live Preview ─────────────────────────────────────────────────────
        if (hasPreview) ...[
          const SizedBox(height: 20),
          _sectionHeader('👁️ Preview (Android notification)', scheme),
          const SizedBox(height: 10),
          _buildNotificationPreview(title, body, scheme),
        ],

        // ── Section: Target ──────────────────────────────────────────────────
        const SizedBox(height: 20),
        _sectionHeader('🎯 Send To', scheme),
        const SizedBox(height: 10),
        Container(
          decoration: BoxDecoration(
            color: scheme.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: scheme.outlineVariant),
          ),
          child: Column(
            children: [
              RadioListTile<String>(
                value: 'all',
                groupValue: _targetType,
                onChanged: (v) => setState(() => _targetType = v!),
                title: const Text('All Users',
                    style: TextStyle(fontWeight: FontWeight.w700)),
                subtitle: const Text('Saare registered users ko bhejo'),
                secondary: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: const Color(0xFF1976D2).withValues(alpha: 0.12),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: const Text('Broadcast',
                      style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          color: Color(0xFF1976D2))),
                ),
                activeColor: scheme.primary,
              ),
              Divider(height: 1, color: scheme.outlineVariant),
              RadioListTile<String>(
                value: 'specific',
                groupValue: _targetType,
                onChanged: (v) {
                  setState(() => _targetType = v!);
                  _loadUsers();
                },
                title: const Text('Specific Users',
                    style: TextStyle(fontWeight: FontWeight.w700)),
                subtitle: Text(
                  _selectedUserIds.isEmpty
                      ? 'List se users select karo'
                      : '${_selectedUserIds.length} user${_selectedUserIds.length == 1 ? '' : 's'} selected',
                ),
                secondary: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: scheme.primaryContainer,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text('Targeted',
                      style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          color: scheme.primary)),
                ),
                activeColor: scheme.primary,
              ),
            ],
          ),
        ),

        // ── User list (when specific) ─────────────────────────────────────
        if (_targetType == 'specific') ...[
          const SizedBox(height: 12),
          TextField(
            controller: _userSearchCtrl,
            onChanged: (v) => setState(() => _userQuery = v),
            decoration: InputDecoration(
              hintText: 'Users search karo…',
              prefixIcon: const Icon(Icons.search, size: 20),
              suffixIcon: _userQuery.isNotEmpty
                  ? IconButton(
                      icon: const Icon(Icons.clear, size: 18),
                      onPressed: () {
                        _userSearchCtrl.clear();
                        setState(() => _userQuery = '');
                      },
                    )
                  : null,
              contentPadding:
                  const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            ),
          ),
          const SizedBox(height: 8),
          if (_usersLoading)
            const Center(
                child: Padding(
              padding: EdgeInsets.all(24),
              child: CircularProgressIndicator(),
            ))
          else
            _buildUserSelectionList(scheme),
        ],

        // ── Send Button ──────────────────────────────────────────────────────
        const SizedBox(height: 24),
        FilledButton.icon(
          onPressed: _sending ? null : _send,
          icon: _sending
              ? const SizedBox(
                  width: 18,
                  height: 18,
                  child: CircularProgressIndicator(
                      strokeWidth: 2, color: Colors.white),
                )
              : const Icon(Icons.send_rounded),
          label: Text(_sending ? 'Bhej rahe hain…' : 'Notification Bhejo'),
          style: FilledButton.styleFrom(
            minimumSize: const Size.fromHeight(52),
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            backgroundColor: scheme.primary,
          ),
        ),
      ],
    );
  }

  Widget _buildNotificationPreview(
      String title, String body, ColorScheme scheme) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Container(
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF252A35) : const Color(0xFFF0F4FF),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: scheme.outlineVariant),
      ),
      padding: const EdgeInsets.all(12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Android Phone',
              style: TextStyle(
                  fontSize: 11,
                  color: scheme.onSurface.withValues(alpha: 0.5),
                  fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          // Notification card
          Container(
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF1A1D26) : Colors.white,
              borderRadius: BorderRadius.circular(14),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.08),
                  blurRadius: 12,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // App icon
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFFB8440E), Color(0xFFE85A1C)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Icon(Icons.school_rounded,
                      color: Colors.white, size: 22),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Text('Indraprastha',
                              style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.w700,
                                  color: Color(0xFFE85A1C))),
                          const SizedBox(width: 6),
                          Text('now',
                              style: TextStyle(
                                  fontSize: 11,
                                  color: scheme.onSurface
                                      .withValues(alpha: 0.4))),
                        ],
                      ),
                      const SizedBox(height: 3),
                      Text(
                        title.isEmpty ? 'Notification Title' : title,
                        style: TextStyle(
                          fontWeight: FontWeight.w700,
                          fontSize: 14,
                          color: title.isEmpty
                              ? scheme.onSurface.withValues(alpha: 0.3)
                              : scheme.onSurface,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 2),
                      Text(
                        body.isEmpty ? 'Message body yahan dikhega…' : body,
                        style: TextStyle(
                          fontSize: 13,
                          color: body.isEmpty
                              ? scheme.onSurface.withValues(alpha: 0.3)
                              : scheme.onSurface.withValues(alpha: 0.75),
                        ),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildUserSelectionList(ColorScheme scheme) {
    final filtered = _filteredUsers;
    if (filtered.isEmpty) {
      return Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: scheme.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: scheme.outlineVariant),
        ),
        child: const Center(child: Text('Koi user nahi mila')),
      );
    }

    final colors = [
      const Color(0xFF1976D2),
      const Color(0xFF7B1FA2),
      const Color(0xFFE85A1C),
      const Color(0xFF2E7D32),
      const Color(0xFFC99A33),
    ];

    return Container(
      decoration: BoxDecoration(
        color: scheme.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: scheme.outlineVariant),
      ),
      child: Column(
        children: [
          // Select all / clear
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Row(
              children: [
                Text('${filtered.length} users',
                    style: TextStyle(
                        fontWeight: FontWeight.w700,
                        color: scheme.onSurface.withValues(alpha: 0.7),
                        fontSize: 13)),
                const Spacer(),
                TextButton.icon(
                  onPressed: () {
                    setState(() {
                      for (final u in filtered) {
                        final id = (u as Map<String, dynamic>)['id'];
                        if (id is int) _selectedUserIds.add(id);
                      }
                    });
                  },
                  icon: const Icon(Icons.select_all, size: 16),
                  label: const Text('Sab select karo',
                      style: TextStyle(fontSize: 12)),
                  style: TextButton.styleFrom(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 8, vertical: 4)),
                ),
                TextButton.icon(
                  onPressed: () => setState(() => _selectedUserIds.clear()),
                  icon: const Icon(Icons.deselect, size: 16),
                  label: const Text('Clear', style: TextStyle(fontSize: 12)),
                  style: TextButton.styleFrom(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 8, vertical: 4)),
                ),
              ],
            ),
          ),
          const Divider(height: 1),
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: filtered.length,
            separatorBuilder: (_, __) =>
                Divider(height: 1, color: scheme.outlineVariant),
            itemBuilder: (context, i) {
              final u = filtered[i] as Map<String, dynamic>;
              final id = u['id'];
              final userId = id is int ? id : int.tryParse(id?.toString() ?? '');
              if (userId == null) return const SizedBox.shrink();
              final name = u['full_name']?.toString() ?? 'Unknown';
              final phone = u['phone']?.toString() ?? '';
              final isPremium = u['has_active_subscription'] == true;
              final initials = name.trim().isNotEmpty
                  ? name
                      .trim()
                      .split(' ')
                      .map((w) => w.isNotEmpty ? w[0] : '')
                      .take(2)
                      .join()
                      .toUpperCase()
                  : '?';
              final avatarColor = colors[i % colors.length];
              final isSelected = _selectedUserIds.contains(userId);
              return CheckboxListTile(
                value: isSelected,
                onChanged: (checked) {
                  setState(() {
                    if (checked == true) {
                      _selectedUserIds.add(userId);
                    } else {
                      _selectedUserIds.remove(userId);
                    }
                  });
                },
                activeColor: scheme.primary,
                secondary: CircleAvatar(
                  radius: 20,
                  backgroundColor: avatarColor.withValues(alpha: 0.15),
                  child: Text(initials,
                      style: TextStyle(
                          color: avatarColor,
                          fontWeight: FontWeight.w700,
                          fontSize: 13)),
                ),
                title: Text(name,
                    style: const TextStyle(
                        fontWeight: FontWeight.w600, fontSize: 14)),
                subtitle: Row(
                  children: [
                    if (phone.isNotEmpty)
                      Text(phone,
                          style: TextStyle(
                              fontSize: 12,
                              color: scheme.onSurface.withValues(alpha: 0.6))),
                    if (phone.isNotEmpty) const SizedBox(width: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: isPremium
                            ? const Color(0xFF2E7D32).withValues(alpha: 0.12)
                            : scheme.outlineVariant.withValues(alpha: 0.5),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        isPremium ? 'Premium' : 'Free',
                        style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.w700,
                            color: isPremium
                                ? const Color(0xFF2E7D32)
                                : scheme.onSurface.withValues(alpha: 0.5)),
                      ),
                    ),
                  ],
                ),
                controlAffinity: ListTileControlAffinity.trailing,
                dense: true,
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildHistoryPage(ColorScheme scheme) {
    if (_historyLoading) {
      return const Center(child: CircularProgressIndicator());
    }
    if (_history.isEmpty) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.notifications_none_rounded,
                size: 56, color: scheme.onSurface.withValues(alpha: 0.3)),
            const SizedBox(height: 12),
            Text('Abhi tak koi notification nahi bheji',
                style: TextStyle(
                    color: scheme.onSurface.withValues(alpha: 0.5))),
            const SizedBox(height: 16),
            FilledButton.icon(
              onPressed: _loadHistory,
              icon: const Icon(Icons.refresh),
              label: const Text('Refresh'),
            ),
          ],
        ),
      );
    }
    return RefreshIndicator(
      onRefresh: _loadHistory,
      child: ListView.separated(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
        itemCount: _history.length,
        separatorBuilder: (_, __) => const SizedBox(height: 10),
        itemBuilder: (context, i) {
          final n = _history[i] as Map<String, dynamic>;
          final title = n['title']?.toString() ?? '';
          final body = n['body']?.toString() ?? '';
          final targetType = n['target_type']?.toString() ?? 'all';
          final sentCount = n['sent_count'] ?? 0;
          final createdAt = n['created_at']?.toString() ?? '';
          final dateLabel = createdAt.length >= 10 ? createdAt.substring(0, 10) : createdAt;
          final timeLabel = createdAt.length >= 16 ? createdAt.substring(11, 16) : '';

          return Container(
            decoration: BoxDecoration(
              color: Theme.of(context).cardTheme.color,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: scheme.outlineVariant),
            ),
            padding: const EdgeInsets.all(14),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFFB8440E), Color(0xFFE85A1C)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(Icons.notifications_rounded,
                      color: Colors.white, size: 22),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(title,
                          style: const TextStyle(
                              fontWeight: FontWeight.w700, fontSize: 15)),
                      const SizedBox(height: 3),
                      Text(body,
                          style: TextStyle(
                              fontSize: 13,
                              color: scheme.onSurface.withValues(alpha: 0.7)),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          _historyChip(
                            targetType == 'all'
                                ? '📢 All Users'
                                : '🎯 Specific',
                            targetType == 'all'
                                ? const Color(0xFF1976D2)
                                : scheme.primary,
                          ),
                          const SizedBox(width: 6),
                          _historyChip(
                            '📱 $sentCount devices',
                            const Color(0xFF2E7D32),
                          ),
                          const Spacer(),
                          Text('$dateLabel $timeLabel',
                              style: TextStyle(
                                  fontSize: 11,
                                  color: scheme.onSurface
                                      .withValues(alpha: 0.45))),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _historyChip(String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(label,
          style: TextStyle(
              fontSize: 11, fontWeight: FontWeight.w700, color: color)),
    );
  }

  Widget _sectionHeader(String text, ColorScheme scheme) {
    return Text(text,
        style: TextStyle(
            fontWeight: FontWeight.w800,
            fontSize: 15,
            color: scheme.onSurface));
  }
}

class SliderBannersPage extends StatefulWidget {
  const SliderBannersPage({super.key, required this.api});

  final AdminApi api;

  @override
  State<SliderBannersPage> createState() => _SliderBannersPageState();
}

class _SliderBannersPageState extends State<SliderBannersPage> {
  late Future<List<Map<String, dynamic>>> _future;

  @override
  void initState() {
    super.initState();
    _load();
  }

  void _load() {
    setState(() {
      _future = widget.api.fetchSliderImages();
    });
  }

  void _showBannerDialog([Map<String, dynamic>? item]) {
    final isEdit = item != null;
    final titleCtrl = TextEditingController(text: item?['title'] ?? '');
    final urlCtrl = TextEditingController(text: item?['image_url'] ?? '');
    final linkCtrl = TextEditingController(text: item?['target_link'] ?? '');
    final orderCtrl = TextEditingController(text: (item?['display_order'] ?? 1).toString());
    bool isActive = item?['is_active'] ?? true;
    bool busy = false;
    bool uploadingImage = false;
    File? selectedLocalFile;

    showDialog(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (dialogCtx, setDialogState) {
          final currentUrl = urlCtrl.text.trim();
          return AlertDialog(
            title: Text(isEdit ? 'Edit Slider Banner' : 'Add New Slider Banner'),
            content: SingleChildScrollView(
              child: SizedBox(
                width: 480,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    TextField(
                      controller: titleCtrl,
                      decoration: const InputDecoration(
                        labelText: 'Banner Title / Caption',
                        hintText: 'e.g. NEET 2026 Rank Booster',
                      ),
                    ),
                    const SizedBox(height: 14),
                    Text(
                      'Banner Image *',
                      style: Theme.of(context).textTheme.titleSmall?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                    const SizedBox(height: 6),
                    if (selectedLocalFile != null || currentUrl.isNotEmpty) ...[
                      ClipRRect(
                        borderRadius: BorderRadius.circular(8),
                        child: Container(
                          height: 140,
                          width: double.infinity,
                          color: Colors.black12,
                          child: selectedLocalFile != null
                              ? Image.file(selectedLocalFile!, fit: BoxFit.cover)
                              : Image.network(
                                  currentUrl,
                                  fit: BoxFit.cover,
                                  errorBuilder: (c, e, s) => const Center(
                                    child: Icon(Icons.broken_image, size: 40, color: Colors.grey),
                                  ),
                                ),
                        ),
                      ),
                      const SizedBox(height: 8),
                    ],
                    Row(
                      children: [
                        Expanded(
                          child: OutlinedButton.icon(
                            onPressed: (uploadingImage || busy)
                                ? null
                                : () async {
                                    try {
                                      final result = await FilePicker.platform.pickFiles(
                                        type: FileType.image,
                                      );
                                      if (result?.files.single.path == null) return;
                                      final pickedFile = File(result!.files.single.path!);
                                      setDialogState(() {
                                        selectedLocalFile = pickedFile;
                                        uploadingImage = true;
                                      });

                                      final uploadedUrl =
                                          await widget.api.uploadSliderBannerImage(pickedFile);
                                      if (dialogCtx.mounted) {
                                        setDialogState(() {
                                          urlCtrl.text = uploadedUrl;
                                          uploadingImage = false;
                                        });
                                        _showActionSnackBar(dialogCtx, 'Image uploaded successfully!');
                                      }
                                    } catch (e) {
                                      if (dialogCtx.mounted) {
                                        setDialogState(() => uploadingImage = false);
                                        _showActionSnackBar(
                                          dialogCtx,
                                          'Image upload failed: $e',
                                          isError: true,
                                        );
                                      }
                                    }
                                  },
                            icon: uploadingImage
                                ? const SizedBox(
                                    width: 16,
                                    height: 16,
                                    child: CircularProgressIndicator(strokeWidth: 2),
                                  )
                                : const Icon(Icons.upload_file_rounded),
                            label: Text(
                              uploadingImage
                                  ? 'Uploading Image...'
                                  : (selectedLocalFile != null || currentUrl.isNotEmpty
                                      ? 'Change Image (Upload from Device)'
                                      : 'Upload Image from Media / Device'),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    TextField(
                      controller: urlCtrl,
                      onChanged: (_) => setDialogState(() {}),
                      decoration: const InputDecoration(
                        labelText: 'Image URL',
                        hintText: 'https://... (auto-filled on upload)',
                        isDense: true,
                      ),
                    ),
                    const SizedBox(height: 14),
                    TextField(
                      controller: linkCtrl,
                      decoration: const InputDecoration(
                        labelText: 'Target Link (Optional)',
                        hintText: 'https://...',
                      ),
                    ),
                    const SizedBox(height: 12),
                    TextField(
                      controller: orderCtrl,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        labelText: 'Display Order (1, 2, 3...)',
                      ),
                    ),
                    const SizedBox(height: 10),
                    SwitchListTile(
                      contentPadding: EdgeInsets.zero,
                      title: const Text('Active Banner'),
                      value: isActive,
                      onChanged: (val) => setDialogState(() => isActive = val),
                    ),
                  ],
                ),
              ),
            ),
            actions: [
              TextButton(
                onPressed: (busy || uploadingImage) ? null : () => Navigator.of(ctx).pop(),
                child: const Text('Cancel'),
              ),
              FilledButton(
                onPressed: (busy || uploadingImage)
                    ? null
                    : () async {
                        final url = urlCtrl.text.trim();
                        if (url.isEmpty) {
                          _showActionSnackBar(ctx, 'Image upload step or URL required', isError: true);
                          return;
                        }
                        setDialogState(() => busy = true);
                        try {
                          if (isEdit) {
                            await widget.api.updateSliderImage(
                              item['id'] as int,
                              title: titleCtrl.text.trim(),
                              imageUrl: url,
                              targetLink: linkCtrl.text.trim(),
                              displayOrder: int.tryParse(orderCtrl.text) ?? 0,
                              isActive: isActive,
                            );
                          } else {
                            await widget.api.addSliderImage(
                              title: titleCtrl.text.trim(),
                              imageUrl: url,
                              targetLink: linkCtrl.text.trim(),
                              displayOrder: int.tryParse(orderCtrl.text) ?? 0,
                              isActive: isActive,
                            );
                          }
                          if (ctx.mounted) Navigator.of(ctx).pop();
                          _load();
                          if (mounted) {
                            _showActionSnackBar(
                              context,
                              isEdit ? 'Slider banner updated' : 'Slider banner added',
                            );
                          }
                        } catch (e) {
                          setDialogState(() => busy = false);
                          if (ctx.mounted) {
                            _showActionSnackBar(ctx, 'Error: $e', isError: true);
                          }
                        }
                      },
                child: _busyButtonChild(busy, isEdit ? 'Save Changes' : 'Add Banner'),
              ),
            ],
          );
        },
      ),
    );
  }

  Future<void> _deleteBanner(int id) async {
    final confirm = await _confirmDeleteDialog(
      context,
      title: 'Delete Slider Banner?',
      body: 'Kya aap is banner image ko delete karna chahte ho?',
    );
    if (!confirm) return;
    try {
      await widget.api.deleteSliderImage(id);
      _load();
      if (mounted) _showActionSnackBar(context, 'Banner deleted successfully');
    } catch (e) {
      if (mounted) _showActionSnackBar(context, 'Delete failed: $e', isError: true);
    }
  }

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          LayoutBuilder(
            builder: (context, constraints) {
              final isNarrow = constraints.maxWidth < 600;
              final titleText = Text(
                'Home Image Slider Banners',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
              );
              final subtitleText = Text(
                'Manage 5 auto-sliding images displayed right below "Today\'s MCQs" on student app.',
                style: TextStyle(color: scheme.onSurface.withValues(alpha: 0.7)),
              );

              if (isNarrow) {
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    titleText,
                    const SizedBox(height: 4),
                    subtitleText,
                    const SizedBox(height: 12),
                    FilledButton.icon(
                      onPressed: () => _showBannerDialog(),
                      icon: const Icon(Icons.add_photo_alternate_outlined),
                      label: const Text('Add Banner'),
                    ),
                  ],
                );
              }

              return Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        titleText,
                        const SizedBox(height: 4),
                        subtitleText,
                      ],
                    ),
                  ),
                  const SizedBox(width: 16),
                  FilledButton.icon(
                    onPressed: () => _showBannerDialog(),
                    icon: const Icon(Icons.add_photo_alternate_outlined),
                    label: const Text('Add Banner'),
                  ),
                ],
              );
            },
          ),
          const SizedBox(height: 20),
          FutureBuilder<List<Map<String, dynamic>>>(
            future: _future,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(
                  child: Padding(
                    padding: EdgeInsets.all(40),
                    child: CircularProgressIndicator(),
                  ),
                );
              }
              if (snapshot.hasError) {
                return Center(
                  child: Text('Failed to load slider images: ${snapshot.error}'),
                );
              }
              final list = snapshot.data ?? [];
              if (list.isEmpty) {
                return Center(
                  child: Padding(
                    padding: const EdgeInsets.all(40),
                    child: Column(
                      children: [
                        const Icon(Icons.image_outlined, size: 48, color: Colors.grey),
                        const SizedBox(height: 12),
                        const Text('No slider images yet.'),
                        const SizedBox(height: 12),
                        ElevatedButton(
                          onPressed: () => _showBannerDialog(),
                          child: const Text('Add First Slider Banner'),
                        ),
                      ],
                    ),
                  ),
                );
              }

              return ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: list.length,
                itemBuilder: (context, index) {
                  final item = list[index];
                  final id = item['id'] as int;
                  final title = item['title']?.toString() ?? '';
                  final url = item['image_url']?.toString() ?? '';
                  final order = item['display_order'] ?? 0;
                  final isActive = item['is_active'] == true;

                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Row(
                        children: [
                          ClipRRect(
                            borderRadius: BorderRadius.circular(8),
                            child: SizedBox(
                              width: 100,
                              height: 60,
                              child: Image.network(
                                url,
                                fit: BoxFit.cover,
                                errorBuilder: (_, __, ___) => Container(
                                  color: Colors.grey.shade300,
                                  child: const Icon(Icons.broken_image),
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  title.isNotEmpty ? title : 'Banner #$id',
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  url,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: scheme.onSurface.withValues(alpha: 0.6),
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Row(
                                  children: [
                                    Chip(
                                      label: Text('Order: $order'),
                                      padding: EdgeInsets.zero,
                                      materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                    ),
                                    const SizedBox(width: 8),
                                    Chip(
                                      label: Text(isActive ? 'Active' : 'Inactive'),
                                      backgroundColor: isActive
                                          ? Colors.green.withValues(alpha: 0.15)
                                          : Colors.grey.withValues(alpha: 0.15),
                                      labelStyle: TextStyle(
                                        color: isActive ? Colors.green : Colors.grey,
                                        fontWeight: FontWeight.bold,
                                      ),
                                      padding: EdgeInsets.zero,
                                      materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                          IconButton(
                            icon: const Icon(Icons.edit_outlined),
                            onPressed: () => _showBannerDialog(item),
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete_outline, color: Colors.red),
                            onPressed: () => _deleteBanner(id),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              );
            },
          ),
        ],
      ),
    );
  }
}

class AdminApi {
  static const _tokenKey = 'admin_auth_token';
  String? token;
  final http.Client _client = http.Client();

  Future<void> restoreSession() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString(_tokenKey);
  }

  Future<void> login(String username, String password) async {
    const path = '/admin/login';
    try {
      final response = await _client.post(
        Uri.parse('$baseUrl$path'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'username': username, 'password': password}),
      );
      final body = _decodeApiJson(
        response.body,
        statusCode: response.statusCode,
        method: 'POST',
        path: path,
      );
      if (response.statusCode < 200 || response.statusCode >= 300) {
        throw Exception(body['error'] ?? 'login failed');
      }
      token = body['token']?.toString();
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_tokenKey, token ?? '');
    } catch (e, st) {
      await AdminErrorLogger.instance.log('POST $path', e, stackTrace: st);
      rethrow;
    }
  }

  Future<void> clearSession() async {
    token = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
  }

  Future<Map<String, dynamic>> dashboard() => _get('/admin/dashboard');
  Future<Map<String, dynamic>> users() => _get('/admin/users');
  
  Future<void> toggleUserBlock(int userId, bool isBlocked) async {
    await _patch('/admin/users/$userId/block', {'isBlocked': isBlocked});
  }

  Future<void> deleteUser(int userId) async {
    await _delete('/admin/users/$userId');
  }

  Future<Map<String, dynamic>> notificationHistory() =>
      _get('/admin/notifications');
  Future<Map<String, dynamic>> batches() => _get('/admin/batches');
  Future<Map<String, dynamic>> books() => _get('/admin/books');
  Future<Map<String, dynamic>> practiceSets() => _get('/admin/practice-sets');
  Future<Map<String, dynamic>> tests() => _get('/admin/tests');
  Future<Map<String, dynamic>> videos() => _get('/admin/videos');
  Future<Map<String, dynamic>> packages() => _get('/admin/packages');
  Future<Map<String, dynamic>> complaints() => _get('/support/complaints');
  Future<Map<String, dynamic>> driveOAuthStart() =>
      _get('/admin/drive/oauth/start');
  Future<Map<String, dynamic>> driveOAuthStatus() =>
      _get('/admin/drive/oauth/status');

  Future<List<Map<String, dynamic>>> fetchSliderImages() async {
    final res = await _get('/admin/slider-images');
    final list = res['sliderImages'] as List? ?? [];
    return list.map((e) => Map<String, dynamic>.from(e as Map)).toList();
  }

  Future<void> addSliderImage({
    required String title,
    required String imageUrl,
    String? targetLink,
    int? displayOrder,
    bool? isActive,
  }) async {
    await _postMap('/admin/slider-images', {
      'title': title,
      'image_url': imageUrl,
      'target_link': targetLink ?? '',
      'display_order': displayOrder ?? 0,
      'is_active': isActive ?? true,
    });
  }

  Future<void> updateSliderImage(
    int id, {
    String? title,
    String? imageUrl,
    String? targetLink,
    int? displayOrder,
    bool? isActive,
  }) async {
    await _put('/admin/slider-images/$id', {
      if (title != null) 'title': title,
      if (imageUrl != null) 'image_url': imageUrl,
      if (targetLink != null) 'target_link': targetLink,
      if (displayOrder != null) 'display_order': displayOrder,
      if (isActive != null) 'is_active': isActive,
    });
  }

  Future<void> deleteSliderImage(int id) async {
    await _delete('/admin/slider-images/$id');
  }

  Future<String> uploadSliderBannerImage(File file) async {
    const path = '/admin/slider-images/upload';
    if (token == null) throw Exception('Login first');
    try {
      final req = http.MultipartRequest('POST', Uri.parse('$baseUrl$path'));
      req.headers['Authorization'] = 'Bearer $token';
      final bytes = await file.readAsBytes();
      final name = file.path.split(Platform.pathSeparator).last;
      req.files.add(http.MultipartFile.fromBytes('image', bytes, filename: name));
      final streamed = await req.send();
      final bodyText = await streamed.stream.bytesToString();
      final json = _decodeApiJson(
        bodyText,
        statusCode: streamed.statusCode,
        method: 'POST',
        path: path,
      );
      if (streamed.statusCode < 200 || streamed.statusCode >= 300) {
        throw Exception(json['error'] ?? 'Slider image upload failed');
      }
      final link = json['imageUrl']?.toString() ?? json['imageLink']?.toString() ?? '';
      if (link.isEmpty) throw Exception('No image URL returned from server');
      return link;
    } catch (e) {
      rethrow;
    }
  }

  Future<void> createBatch({
    required String name,
    required String targetYear,
    required String classLabel,
  }) async {
    await _post('/admin/batches', {
      'name': name,
      'targetYear': targetYear,
      'classLabel': classLabel,
    });
  }

  Future<List<dynamic>> classes() async =>
      (await _get('/admin/classes'))['classes'] as List<dynamic>;

  Future<void> createClass(String name) async {
    await _post('/admin/classes', {'name': name});
  }

  Future<void> createSubject({
    required int classId,
    required String name,
  }) async {
    await _post('/admin/subjects', {'classId': classId, 'name': name});
  }

  Future<void> driveOAuthExchange(String code) async {
    await _post('/admin/drive/oauth/exchange', {'code': code});
  }

  Future<void> uploadBookByHierarchyChunked({
    required int batchId,
    required String classLabel,
    required String subject,
    required String chapterTitle,
    required File pdfFile,
    required void Function(double progress) onProgress,
    int? bookId,
  }) async {
    if (token == null) throw Exception('Login first');
    final fileName = pdfFile.path.split(Platform.pathSeparator).last;
    final initPayload = <String, dynamic>{
      'batchId': batchId,
      'classLabel': classLabel,
      'subject': subject,
      'chapterTitle': chapterTitle,
      'fileName': fileName,
      'mimeType': 'application/pdf',
    };
    if (bookId != null && bookId > 0) initPayload['bookId'] = bookId;
    final init = await _postMap('/admin/books/pdf-upload-init', initPayload);
    final uploadId = init['uploadId']?.toString();
    final chunkSize = (init['chunkSize'] as num?)?.toInt() ?? (512 * 1024);
    if (uploadId == null || uploadId.isEmpty) {
      throw Exception('PDF upload init failed');
    }

    final totalBytes = await pdfFile.length();
    final totalChunks = (totalBytes / chunkSize).ceil();
    var sent = 0;

    final raf = await pdfFile.open();
    try {
      for (var i = 0; i < totalChunks; i++) {
        final remaining = totalBytes - (i * chunkSize);
        final size = remaining >= chunkSize ? chunkSize : remaining;
        final bytes = await raf.read(size);

        final req = http.MultipartRequest(
          'POST',
          Uri.parse('$baseUrl/admin/books/pdf-upload-chunk'),
        );
        req.headers['Authorization'] = 'Bearer $token';
        req.fields['uploadId'] = uploadId;
        req.fields['index'] = '$i';
        req.fields['totalChunks'] = '$totalChunks';
        req.files.add(http.MultipartFile.fromBytes('chunk', bytes,
            filename: 'chunk_$i.bin'));
        final streamed = await req.send();
        if (streamed.statusCode < 200 || streamed.statusCode >= 300) {
          final payload = await streamed.stream.bytesToString();
          throw Exception('PDF chunk upload failed: $payload');
        }

        sent += bytes.length;
        onProgress(sent / totalBytes);
      }
    } finally {
      await raf.close();
    }

    await _post('/admin/books/pdf-upload-complete', {'uploadId': uploadId});
  }

  Future<int> addBook({
    required int batchId,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
    String category = 'NCERT books',
  }) async {
    final body = await _postMap('/admin/books', {
      'batchId': batchId,
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
      'category': category,
    });
    final book = Map<String, dynamic>.from(body['book'] as Map? ?? const {});
    return (book['id'] as num?)?.toInt() ?? 0;
  }

  Future<List<dynamic>> bookChapters(int bookId) async =>
      (await _get('/admin/books/$bookId/chapters'))['chapters']
          as List<dynamic>;

  Future<void> createBookChapter({
    required int bookId,
    required String title,
    required String overview,
    required String noteSummary,
    required String highlight,
  }) async {
    if (bookId <= 0) return;
    await _post('/admin/books/$bookId/chapters', {
      'title': title,
      'overview': overview,
      'noteSummary': noteSummary,
      'highlight': highlight,
    });
  }

  Future<void> updateBook({
    required int id,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
  }) async {
    await _put('/admin/books/$id', {
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
    });
  }

  Future<void> deleteBook(int id) => _delete('/admin/books/$id');

  Future<void> addPractice({
    required int batchId,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
  }) async {
    await _post('/admin/practice-sets', {
      'batchId': batchId,
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
    });
  }

  Future<void> updatePractice({
    required int id,
    int? batchId,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
  }) async {
    await _put('/admin/practice-sets/$id', {
      if (batchId != null) 'batchId': batchId,
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
    });
  }

  Future<void> deletePractice(int id) => _delete('/admin/practice-sets/$id');

  Future<void> addTest({
    required int batchId,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
    String category = 'Grand test',
    int durationMinutes = 180,
    int marks = 720,
    int questionCount = 180,
    String scheduleLabel = 'Upcoming',
  }) async {
    await _post('/admin/tests', {
      'batchId': batchId,
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
      'category': category,
      'durationMinutes': durationMinutes,
      'marks': marks,
      'questionCount': questionCount,
      'scheduleLabel': scheduleLabel,
    });
  }

  Future<void> updateTest({
    required int id,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
    String category = 'Grand test',
    int durationMinutes = 180,
    int marks = 720,
    int questionCount = 180,
    String scheduleLabel = 'Upcoming',
  }) async {
    await _put('/admin/tests/$id', {
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
      'category': category,
      'durationMinutes': durationMinutes,
      'marks': marks,
      'questionCount': questionCount,
      'scheduleLabel': scheduleLabel,
    });
  }

  Future<void> deleteTest(int id) => _delete('/admin/tests/$id');

  Future<int> addTestQuestion({
    required int testId,
    required String question,
    required String optionA,
    required String optionB,
    required String optionC,
    required String optionD,
    required String correctOption,
    required String explanation,
    required String subject,
    String questionImageLink = '',
    String explanationImageLink = '',
    String explanationVideoLink = '',
    Map<String, dynamic>? similarQuestion,
    String optionAImageLink = '',
    String optionBImageLink = '',
    String optionCImageLink = '',
    String optionDImageLink = '',
  }) async {
    final body = await _postMap('/admin/tests/$testId/questions', {
      'question': question,
      'optionA': optionA,
      'optionB': optionB,
      'optionC': optionC,
      'optionD': optionD,
      'correctOption': correctOption,
      'explanation': explanation,
      'subject': subject,
      'questionImageLink': questionImageLink,
      'explanationImageLink': explanationImageLink,
      'explanationVideoLink': explanationVideoLink,
      'optionAImageLink': optionAImageLink,
      'optionBImageLink': optionBImageLink,
      'optionCImageLink': optionCImageLink,
      'optionDImageLink': optionDImageLink,
      if (similarQuestion != null) 'similarQuestion': similarQuestion,
    });
    final questionObj = body['question'];
    if (questionObj is Map<String, dynamic>) {
      final id = questionObj['id'];
      if (id is int) return id;
      if (id is num) return id.toInt();
      if (id is String) {
        final parsed = int.tryParse(id);
        if (parsed != null) return parsed;
      }
    }
    throw Exception(
        body['error']?.toString() ?? 'Server returned an unexpected response');
  }

  Future<Map<String, dynamic>> _postQuestionWithMedia({
    required String path,
    required Map<String, String> fields,
    File? questionImage,
    File? explanationImage,
    List<File> extraExplanationImages = const [],
  }) async {
    if (token == null) throw Exception('Login first');
    try {
      final req = http.MultipartRequest('POST', Uri.parse('$baseUrl$path'));
      req.headers['Authorization'] = 'Bearer $token';
      req.fields.addAll(fields);
      if (questionImage != null) {
        final bytes = await questionImage.readAsBytes();
        final name = questionImage.path.split(Platform.pathSeparator).last;
        req.files.add(
          http.MultipartFile.fromBytes('questionImage', bytes, filename: name),
        );
      }
      if (explanationImage != null) {
        final bytes = await explanationImage.readAsBytes();
        final name = explanationImage.path.split(Platform.pathSeparator).last;
        req.files.add(
          http.MultipartFile.fromBytes('explanationImage', bytes, filename: name),
        );
      }
      for (final extra in extraExplanationImages) {
        final bytes = await extra.readAsBytes();
        final name = extra.path.split(Platform.pathSeparator).last;
        req.files.add(
          http.MultipartFile.fromBytes(
            'extraExplanationImages',
            bytes,
            filename: name,
          ),
        );
      }
      final streamed = await req
          .send()
          .timeout(const Duration(minutes: 15));
      final bodyText = await streamed.stream.bytesToString();
      final json = _decodeApiJson(
        bodyText,
        statusCode: streamed.statusCode,
        method: 'POST',
        path: path,
      );
      if (streamed.statusCode < 200 || streamed.statusCode >= 300) {
        throw Exception(json['error'] ?? 'Request failed');
      }
      return json;
    } catch (e, st) {
      await AdminErrorLogger.instance.log('POST $path', e, stackTrace: st);
      rethrow;
    }
  }

  int? _parseEntityId(dynamic id) {
    if (id is int) return id;
    if (id is num) return id.toInt();
    if (id is String) return int.tryParse(id);
    return null;
  }

  Future<int> addTestQuestionWithMedia({
    required int testId,
    required String question,
    required String optionA,
    required String optionB,
    required String optionC,
    required String optionD,
    required String correctOption,
    required String explanation,
    required String subject,
    File? questionImage,
    File? explanationImage,
    List<File> extraExplanationImages = const [],
    String questionImageLink = '',
    String explanationImageLink = '',
    String explanationVideoLink = '',
    Map<String, dynamic>? similarQuestion,
    String optionAImageLink = '',
    String optionBImageLink = '',
    String optionCImageLink = '',
    String optionDImageLink = '',
  }) async {
    final body = await _postQuestionWithMedia(
      path: '/admin/tests/$testId/questions/with-media',
      fields: {
        'question': question,
        'optionA': optionA,
        'optionB': optionB,
        'optionC': optionC,
        'optionD': optionD,
        'correctOption': correctOption,
        'explanation': explanation,
        'subject': subject,
        'questionImageLink': questionImageLink,
        'explanationImageLink': explanationImageLink,
        'explanationVideoLink': explanationVideoLink,
        'optionAImageLink': optionAImageLink,
        'optionBImageLink': optionBImageLink,
        'optionCImageLink': optionCImageLink,
        'optionDImageLink': optionDImageLink,
        if (similarQuestion != null) 'similarQuestion': jsonEncode(similarQuestion),
      },
      questionImage: questionImage,
      explanationImage: explanationImage,
      extraExplanationImages: extraExplanationImages,
    );
    final parsed = _parseEntityId((body['question'] as Map?)?['id']);
    if (parsed != null) return parsed;
    throw Exception(
      body['error']?.toString() ?? 'Server returned an unexpected response',
    );
  }

  Future<List<dynamic>> testQuestions(int testId) async =>
      (await _get('/admin/tests/$testId/questions'))['questions']
          as List<dynamic>;

  Future<void> updateTestQuestion({
    required int id,
    required String question,
    required String optionA,
    required String optionB,
    required String optionC,
    required String optionD,
    required String correctOption,
    required String explanation,
    required String subject,
    String questionImageLink = '',
    String explanationImageLink = '',
    String explanationVideoLink = '',
    Map<String, dynamic>? similarQuestion,
    String optionAImageLink = '',
    String optionBImageLink = '',
    String optionCImageLink = '',
    String optionDImageLink = '',
  }) async {
    await _put('/admin/test-questions/$id', {
      'question': question,
      'optionA': optionA,
      'optionB': optionB,
      'optionC': optionC,
      'optionD': optionD,
      'correctOption': correctOption,
      'explanation': explanation,
      'subject': subject,
      'questionImageLink': questionImageLink,
      'explanationImageLink': explanationImageLink,
      if (explanationVideoLink.trim().isNotEmpty)
        'explanationVideoLink': explanationVideoLink.trim(),
      'optionAImageLink': optionAImageLink,
      'optionBImageLink': optionBImageLink,
      'optionCImageLink': optionCImageLink,
      'optionDImageLink': optionDImageLink,
      if (similarQuestion != null) 'similarQuestion': similarQuestion,
    });
  }

  Future<void> deleteTestQuestion(int id) =>
      _delete('/admin/test-questions/$id');

  Future<void> moveTestQuestionsToPractice(
    int testId,
    List<int> questionIds, {
    int? targetPracticeSetId,
  }) async {
    await _postMap('/admin/tests/$testId/move-to-practice', {
      'questionIds': questionIds,
      if (targetPracticeSetId != null) 'targetPracticeSetId': targetPracticeSetId,
    });
  }

  Future<List<dynamic>> practiceQuestions(int setId) async =>
      (await _get('/admin/practice-sets/$setId/questions'))['questions']
          as List<dynamic>;

  Future<void> addPracticeQuestion({
    required int setId,
    required String question,
    required String optionA,
    required String optionB,
    required String optionC,
    required String optionD,
    required String correctOption,
    required String explanation,
    String questionImageLink = '',
    String explanationImageLink = '',
    String explanationVideoLink = '',
    String optionAImageLink = '',
    String optionBImageLink = '',
    String optionCImageLink = '',
    String optionDImageLink = '',
    Map<String, dynamic>? similarQuestion,
  }) async {
    await _postMap('/admin/practice-sets/$setId/questions', {
      'question': question,
      'optionA': optionA,
      'optionB': optionB,
      'optionC': optionC,
      'optionD': optionD,
      'correctOption': correctOption,
      'explanation': explanation,
      'questionImageLink': questionImageLink,
      'explanationImageLink': explanationImageLink,
      'explanationVideoLink': explanationVideoLink,
      'optionAImageLink': optionAImageLink,
      'optionBImageLink': optionBImageLink,
      'optionCImageLink': optionCImageLink,
      'optionDImageLink': optionDImageLink,
      if (similarQuestion != null) 'similarQuestion': similarQuestion,
    });
  }

  Future<void> addPracticeQuestionWithMedia({
    required int setId,
    required String question,
    required String optionA,
    required String optionB,
    required String optionC,
    required String optionD,
    required String correctOption,
    required String explanation,
    File? questionImage,
    File? explanationImage,
    String questionImageLink = '',
    String explanationImageLink = '',
    String explanationVideoLink = '',
    String optionAImageLink = '',
    String optionBImageLink = '',
    String optionCImageLink = '',
    String optionDImageLink = '',
    Map<String, dynamic>? similarQuestion,
  }) async {
    await _postQuestionWithMedia(
      path: '/admin/practice-sets/$setId/questions/with-media',
      fields: {
        'question': question,
        'optionA': optionA,
        'optionB': optionB,
        'optionC': optionC,
        'optionD': optionD,
        'correctOption': correctOption,
        'explanation': explanation,
        'questionImageLink': questionImageLink,
        'explanationImageLink': explanationImageLink,
        'explanationVideoLink': explanationVideoLink,
        'optionAImageLink': optionAImageLink,
        'optionBImageLink': optionBImageLink,
        'optionCImageLink': optionCImageLink,
        'optionDImageLink': optionDImageLink,
        if (similarQuestion != null) 'similarQuestion': jsonEncode(similarQuestion),
      },
      questionImage: questionImage,
      explanationImage: explanationImage,
    );
  }

  Future<void> updatePracticeQuestion({
    required int id,
    required String question,
    required String optionA,
    required String optionB,
    required String optionC,
    required String optionD,
    required String correctOption,
    required String explanation,
    String questionImageLink = '',
    String explanationImageLink = '',
    String explanationVideoLink = '',
    String optionAImageLink = '',
    String optionBImageLink = '',
    String optionCImageLink = '',
    String optionDImageLink = '',
    Map<String, dynamic>? similarQuestion,
  }) async {
    await _put('/admin/practice-questions/$id', {
      'question': question,
      'optionA': optionA,
      'optionB': optionB,
      'optionC': optionC,
      'optionD': optionD,
      'correctOption': correctOption,
      'explanation': explanation,
      'questionImageLink': questionImageLink,
      'explanationImageLink': explanationImageLink,
      if (explanationVideoLink.trim().isNotEmpty)
        'explanationVideoLink': explanationVideoLink.trim(),
      'optionAImageLink': optionAImageLink,
      'optionBImageLink': optionBImageLink,
      'optionCImageLink': optionCImageLink,
      'optionDImageLink': optionDImageLink,
      if (similarQuestion != null) 'similarQuestion': similarQuestion,
    });
  }

  Future<void> movePracticeQuestion({required int id, required int practiceSetId}) =>
      _put('/admin/practice-questions/$id', {'practiceSetId': practiceSetId});

  Future<void> deletePracticeQuestion(int id) =>
      _delete('/admin/practice-questions/$id');

  Future<void> addPyq({
    required int chapterId,
    required String question,
    required String optionA,
    required String optionB,
    required String optionC,
    required String optionD,
    required String correctOption,
    required String explanation,
    String questionImageLink = '',
    String explanationImageLink = '',
    String explanationVideoLink = '',
  }) async {
    await _post('/admin/chapters/$chapterId/pyqs', {
      'question': question,
      'optionA': optionA,
      'optionB': optionB,
      'optionC': optionC,
      'optionD': optionD,
      'correctOption': correctOption,
      'explanation': explanation,
      'yearLabel': 'NEET',
      'questionImageLink': questionImageLink,
      'explanationImageLink': explanationImageLink,
      'explanationVideoLink': explanationVideoLink,
    });
  }

  Future<void> addPyqWithMedia({
    required int chapterId,
    required String question,
    required String optionA,
    required String optionB,
    required String optionC,
    required String optionD,
    required String correctOption,
    required String explanation,
    File? questionImage,
    File? explanationImage,
    String questionImageLink = '',
    String explanationImageLink = '',
    String explanationVideoLink = '',
  }) async {
    await _postQuestionWithMedia(
      path: '/admin/chapters/$chapterId/pyqs/with-media',
      fields: {
        'question': question,
        'optionA': optionA,
        'optionB': optionB,
        'optionC': optionC,
        'optionD': optionD,
        'correctOption': correctOption,
        'explanation': explanation,
        'yearLabel': 'NEET',
        'questionImageLink': questionImageLink,
        'explanationImageLink': explanationImageLink,
        'explanationVideoLink': explanationVideoLink,
      },
      questionImage: questionImage,
      explanationImage: explanationImage,
    );
  }

  Future<List<dynamic>> pyqs(int chapterId) async =>
      (await _get('/admin/chapters/$chapterId/pyqs'))['pyqs'] as List<dynamic>;

  Future<void> updatePyq({
    required int id,
    required String question,
    required String optionA,
    required String optionB,
    required String optionC,
    required String optionD,
    required String correctOption,
    required String explanation,
    String questionImageLink = '',
    String explanationImageLink = '',
    String explanationVideoLink = '',
  }) async {
    await _put('/admin/pyqs/$id', {
      'question': question,
      'optionA': optionA,
      'optionB': optionB,
      'optionC': optionC,
      'optionD': optionD,
      'correctOption': correctOption,
      'explanation': explanation,
      'yearLabel': 'NEET',
      'questionImageLink': questionImageLink,
      'explanationImageLink': explanationImageLink,
      'explanationVideoLink': explanationVideoLink,
    });
  }

  Future<void> deletePyq(int id) => _delete('/admin/pyqs/$id');

  Future<Map<String, dynamic>> mcqs() => _get('/admin/mcqs');

  Future<void> addMcq({
    required int batchId,
    required String classLabel,
    required String subject,
    required String topic,
    required String question,
    required String optionA,
    required String optionB,
    required String optionC,
    required String optionD,
    required String correctOption,
    required String explanation,
    String questionImageLink = '',
    String explanationImageLink = '',
  }) async {
    await _post('/admin/mcqs', {
      'batchId': batchId,
      'classLabel': classLabel,
      'subject': subject,
      'topic': topic,
      'question': question,
      'optionA': optionA,
      'optionB': optionB,
      'optionC': optionC,
      'optionD': optionD,
      'correctOption': correctOption,
      'explanation': explanation,
      'questionImageLink': questionImageLink,
      'explanationImageLink': explanationImageLink,
    });
  }

  Future<void> updateMcq({
    required int id,
    required String classLabel,
    required String subject,
    required String topic,
    required String question,
    required String optionA,
    required String optionB,
    required String optionC,
    required String optionD,
    required String correctOption,
    required String explanation,
    String? questionImageLink,
    String? explanationImageLink,
  }) async {
    await _put('/admin/mcqs/$id', {
      'classLabel': classLabel,
      'subject': subject,
      'topic': topic,
      'question': question,
      'optionA': optionA,
      'optionB': optionB,
      'optionC': optionC,
      'optionD': optionD,
      'correctOption': correctOption,
      'explanation': explanation,
      'questionImageLink': questionImageLink,
      'explanationImageLink': explanationImageLink,
    });
  }

  Future<void> deleteMcq(int id) => _delete('/admin/mcqs/$id');

  Future<List<dynamic>> fetchExplanationImages({
    required String questionType,
    required int questionId,
  }) async {
    final body =
        await _get('/admin/questions/$questionType/$questionId/explanations');
    return body['explanationImages'] as List<dynamic>? ?? const [];
  }

  Future<void> addExplanationImage({
    required String questionType,
    required int questionId,
    required int batchId,
    required String classLabel,
    required String subject,
    required String topic,
    required File file,
    String caption = '',
  }) async {
    if (token == null) throw Exception('Login first');
    final req = http.MultipartRequest(
        'POST', Uri.parse('$baseUrl/admin/explanation-images'));
    req.headers['Authorization'] = 'Bearer $token';
    req.fields['questionType'] = questionType;
    req.fields['questionId'] = '$questionId';
    req.fields['batchId'] = '$batchId';
    req.fields['classLabel'] = classLabel;
    req.fields['subject'] = subject;
    req.fields['topic'] = topic;
    req.fields['caption'] = caption;
    final bytes = await file.readAsBytes();
    final name = file.path.split(Platform.pathSeparator).last;
    req.files.add(http.MultipartFile.fromBytes('image', bytes, filename: name));
    final streamed = await req.send();
    if (streamed.statusCode < 200 || streamed.statusCode >= 300) {
      throw Exception(await streamed.stream.bytesToString());
    }
  }

  Future<void> deleteExplanationImage(int imageId) =>
      _delete('/admin/explanation-images/$imageId');

  Future<String> uploadQuestionImage({
    required int batchId,
    required String classLabel,
    required String subject,
    required String topic,
    required File file,
    String contentType = '',
    int? contentId,
  }) async {
    const path = '/admin/question-images/upload';
    if (token == null) throw Exception('Login first');
    try {
      final req = http.MultipartRequest('POST', Uri.parse('$baseUrl$path'));
      req.headers['Authorization'] = 'Bearer $token';
      req.fields['batchId'] = '$batchId';
      req.fields['classLabel'] = classLabel;
      req.fields['subject'] = subject;
      req.fields['topic'] = topic;
      if (contentType.trim().isNotEmpty) {
        req.fields['contentType'] = contentType.trim();
      }
      if (contentId != null) req.fields['contentId'] = '$contentId';
      final bytes = await file.readAsBytes();
      final name = file.path.split(Platform.pathSeparator).last;
      req.files
          .add(http.MultipartFile.fromBytes('image', bytes, filename: name));
      final streamed = await req.send();
      final bodyText = await streamed.stream.bytesToString();
      final json = _decodeApiJson(
        bodyText,
        statusCode: streamed.statusCode,
        method: 'POST',
        path: path,
      );
      if (streamed.statusCode < 200 || streamed.statusCode >= 300) {
        throw Exception(json['error'] ?? 'Image upload failed');
      }
      return json['driveLink']?.toString() ??
          json['imageLink']?.toString() ??
          '';
    } catch (e, st) {
      await AdminErrorLogger.instance.log('POST $path', e, stackTrace: st);
      rethrow;
    }
  }

  Future<void> uploadVideo({
    required int batchId,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
    required File file,
    String? chapterHint,
    String? sectionLabel,
    String? durationLabel,
  }) async {
    if (token == null) throw Exception('Login first');
    final req = http.MultipartRequest(
      'POST',
      Uri.parse('$baseUrl/admin/videos/upload'),
    );
    req.headers['Authorization'] = 'Bearer $token';
    req.fields['batchId'] = '$batchId';
    req.fields['classLabel'] = classLabel;
    req.fields['title'] = title;
    req.fields['subject'] = subject;
    req.fields['topic'] = topic;
    req.fields['chapterHint'] = chapterHint ?? topic;
    req.fields['sectionLabel'] = sectionLabel ?? 'Concept explainers';
    req.fields['durationLabel'] = durationLabel ?? '15 min';
    final videoBytes = await file.readAsBytes();
    final videoName = file.path.split(Platform.pathSeparator).last;
    req.files.add(
        http.MultipartFile.fromBytes('video', videoBytes, filename: videoName));
    final streamed = await req.send();
    if (streamed.statusCode < 200 || streamed.statusCode >= 300) {
      throw Exception(await streamed.stream.bytesToString());
    }
  }

  Future<void> uploadVideoChunked({
    required int batchId,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
    required File file,
    required void Function(double progress) onProgress,
  }) async {
    if (token == null) throw Exception('Login first');

    final fileName = file.path.split(Platform.pathSeparator).last;
    final init = await _postMap('/admin/videos/upload-init', {
      'batchId': batchId,
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
      'chapterHint': topic,
      'sectionLabel': 'Concept explainers',
      'durationLabel': '15 min',
      'fileName': fileName,
      'mimeType': 'video/mp4',
    });
    final uploadId = init['uploadId']?.toString();
    final chunkSize = (init['chunkSize'] as num?)?.toInt() ?? (2 * 1024 * 1024);
    if (uploadId == null || uploadId.isEmpty) {
      throw Exception('Upload init failed');
    }

    final totalBytes = await file.length();
    final totalChunks = (totalBytes / chunkSize).ceil();
    var sent = 0;

    final raf = await file.open();
    try {
      for (var i = 0; i < totalChunks; i++) {
        final remaining = totalBytes - (i * chunkSize);
        final size = remaining >= chunkSize ? chunkSize : remaining;
        final bytes = await raf.read(size);

        final req = http.MultipartRequest(
          'POST',
          Uri.parse('$baseUrl/admin/videos/upload-chunk'),
        );
        req.headers['Authorization'] = 'Bearer $token';
        req.fields['uploadId'] = uploadId;
        req.fields['index'] = '$i';
        req.fields['totalChunks'] = '$totalChunks';
        req.files.add(http.MultipartFile.fromBytes('chunk', bytes,
            filename: 'chunk_$i.bin'));

        final streamed = await req.send();
        if (streamed.statusCode < 200 || streamed.statusCode >= 300) {
          final payload = await streamed.stream.bytesToString();
          throw Exception('Chunk upload failed: $payload');
        }

        sent += bytes.length;
        onProgress(sent / totalBytes);
      }
    } finally {
      await raf.close();
    }

    await _post('/admin/videos/upload-complete', {'uploadId': uploadId});
  }

  Future<void> updateVideo({
    required int id,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
  }) async {
    await _put('/admin/videos/$id', {
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
    });
  }

  Future<void> deleteVideo(int id) => _delete('/admin/videos/$id');

  Future<void> addPackage({
    required String name,
    required String priceLabel,
    required String validity,
    required String highlight,
    required List<String> features,
  }) async {
    await _post('/admin/packages', {
      'name': name,
      'priceLabel': priceLabel,
      'validity': validity,
      'highlight': highlight,
      'features': features,
      'isActive': true,
    });
  }

  Future<void> updatePackage({
    required int id,
    required String name,
    required String priceLabel,
    required String validity,
    required String highlight,
    required List<String> features,
  }) async {
    await _put('/admin/packages/$id', {
      'name': name,
      'priceLabel': priceLabel,
      'validity': validity,
      'highlight': highlight,
      'features': features,
    });
  }

  Future<void> deletePackage(int id) => _delete('/admin/packages/$id');

  Future<void> updateComplaintStatus({
    required int complaintId,
    required String status,
  }) async {
    await _patch('/support/complaints/$complaintId/status', {
      'status': status,
    });
  }

  Future<Map<String, dynamic>> sendNotification({
    required String title,
    required String body,
    String? imageUrl,
    required String targetType, // 'all' or 'specific'
    List<int> userIds = const [],
  }) async {
    return _postMap('/admin/notifications/send', {
      'title': title,
      'body': body,
      if (imageUrl != null && imageUrl.isNotEmpty) 'imageUrl': imageUrl,
      'targetType': targetType,
      'userIds': userIds,
    });
  }

  Future<Map<String, dynamic>> _get(String path) async {
    if (token == null) throw Exception('Login first');
    try {
      final response = await _client.get(
        Uri.parse('$baseUrl$path'),
        headers: {'Authorization': 'Bearer $token'},
      );
      final body = _decodeApiJson(
        response.body,
        statusCode: response.statusCode,
        method: 'GET',
        path: path,
      );
      if (response.statusCode < 200 || response.statusCode >= 300) {
        throw Exception(
            body['error'] ?? 'request failed (${response.statusCode})');
      }
      return body;
    } catch (e, st) {
      await AdminErrorLogger.instance.log('GET $path', e, stackTrace: st);
      rethrow;
    }
  }

  Future<void> _post(String path, Map<String, dynamic> payload) async {
    await _postMap(path, payload);
  }

  Future<Map<String, dynamic>> _postMap(
    String path,
    Map<String, dynamic> payload,
  ) async {
    if (token == null) throw Exception('Login first');
    try {
      final response = await _client.post(
        Uri.parse('$baseUrl$path'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode(payload),
      );
      final body = _decodeApiJson(
        response.body,
        statusCode: response.statusCode,
        method: 'POST',
        path: path,
      );
      if (response.statusCode < 200 || response.statusCode >= 300) {
        throw Exception(body['error'] ?? body['details'] ?? response.body);
      }
      return body;
    } catch (e, st) {
      await AdminErrorLogger.instance.log(
        'POST $path',
        e,
        stackTrace: st,
        details: payload,
      );
      rethrow;
    }
  }

  Future<void> _put(String path, Map<String, dynamic> payload) async {
    if (token == null) throw Exception('Login first');
    try {
      final response = await _client.put(
        Uri.parse('$baseUrl$path'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode(payload),
      );
      final body = _decodeApiJson(
        response.body,
        statusCode: response.statusCode,
        method: 'PUT',
        path: path,
      );
      if (response.statusCode < 200 || response.statusCode >= 300) {
        throw Exception(body['error'] ?? body['details'] ?? response.body);
      }
    } catch (e, st) {
      await AdminErrorLogger.instance.log(
        'PUT $path',
        e,
        stackTrace: st,
        details: payload,
      );
      rethrow;
    }
  }

  Future<void> _patch(String path, Map<String, dynamic> payload) async {
    if (token == null) throw Exception('Login first');
    try {
      final response = await _client.patch(
        Uri.parse('$baseUrl$path'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode(payload),
      );
      final body = _decodeApiJson(
        response.body,
        statusCode: response.statusCode,
        method: 'PATCH',
        path: path,
      );
      if (response.statusCode < 200 || response.statusCode >= 300) {
        throw Exception(body['error'] ?? body['details'] ?? response.body);
      }
    } catch (e, st) {
      await AdminErrorLogger.instance.log(
        'PATCH $path',
        e,
        stackTrace: st,
        details: payload,
      );
      rethrow;
    }
  }

  Future<void> _delete(String path) async {
    if (token == null) throw Exception('Login first');
    try {
      final response = await _client.delete(
        Uri.parse('$baseUrl$path'),
        headers: {'Authorization': 'Bearer $token'},
      );
      if (response.statusCode < 200 || response.statusCode >= 300) {
        final body = _decodeApiJson(
          response.body,
          statusCode: response.statusCode,
          method: 'DELETE',
          path: path,
        );
        throw Exception(body['error'] ?? response.body);
      }
    } catch (e, st) {
      await AdminErrorLogger.instance.log('DELETE $path', e, stackTrace: st);
      rethrow;
    }
  }
}
