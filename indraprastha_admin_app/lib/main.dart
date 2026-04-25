import 'dart:convert';
import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

const String baseUrl = 'https://indraprastha-backend.onrender.com/api';

void main() {
  runApp(const AdminApp());
}

class AdminApp extends StatefulWidget {
  const AdminApp({super.key});

  @override
  State<AdminApp> createState() => _AdminAppState();
}

class _AdminAppState extends State<AdminApp> {
  ThemeMode _themeMode = ThemeMode.light;

  static const _seed = Color(0xFFE85A1C);

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
    final darkScheme = ColorScheme.fromSeed(
      seedColor: _seed,
      brightness: Brightness.dark,
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
          fillColor: lightScheme.surfaceContainerHighest.withValues(alpha: 0.35),
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
          contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        ),
        filledButtonTheme: FilledButtonThemeData(
          style: FilledButton.styleFrom(
            minimumSize: const Size.fromHeight(48),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
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
  static const _titles = [
    'Overview',
    'Setup',
    'Books',
    'Practice',
    'Tests',
    'Videos',
    'Packages',
  ];
  static const _navItems = [
    (Icons.dashboard_outlined, 'Overview'),
    (Icons.account_tree_outlined, 'Setup'),
    (Icons.upload_file_outlined, 'Books'),
    (Icons.flash_on_outlined, 'Practice'),
    (Icons.fact_check_outlined, 'Tests'),
    (Icons.smart_display_outlined, 'Videos'),
    (Icons.workspace_premium_outlined, 'Packages'),
  ];

  @override
  Widget build(BuildContext context) {
    final pages = [
      OverviewPage(api: _api),
      SetupPage(api: _api),
      BooksPage(api: _api),
      PracticePage(api: _api),
      TestsPage(api: _api),
      VideosPage(api: _api),
      PackagesPage(api: _api),
    ];
    final title = _titles[_tab.clamp(0, _titles.length - 1)];
    final isLoggedIn = _api.token != null;
    return Scaffold(
      drawer: isLoggedIn
          ? Drawer(
              child: SafeArea(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(16, 12, 16, 10),
                      child: Row(
                        children: [
                          ClipRRect(
                            borderRadius: BorderRadius.circular(12),
                            child: Image.asset(
                              'assets/images/app_icon.png',
                              width: 42,
                              height: 42,
                              fit: BoxFit.cover,
                            ),
                          ),
                          const SizedBox(width: 10),
                          const Expanded(
                            child: Text(
                              'Indraprastha Admin',
                              style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const Divider(height: 1),
                    Expanded(
                      child: ListView.builder(
                        itemCount: _navItems.length,
                        itemBuilder: (context, index) {
                          final item = _navItems[index];
                          return ListTile(
                            leading: Icon(item.$1),
                            title: Text(item.$2),
                            selected: _tab == index,
                            onTap: () {
                              setState(() => _tab = index);
                              Navigator.of(context).pop();
                            },
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),
            )
          : null,
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Indraprastha Admin'),
            Text(
              title,
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ],
        ),
        actions: [
          IconButton(
            onPressed: widget.onToggleTheme,
            icon: const Icon(Icons.dark_mode_outlined, size: 22),
            tooltip: 'Dark/Light',
          ),
          const SizedBox(width: 4),
        ],
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Theme.of(context).colorScheme.primaryContainer.withValues(alpha: 0.28),
              Theme.of(context).scaffoldBackgroundColor,
            ],
          ),
        ),
        child: _api.token == null
            ? LoginPage(
                api: _api,
                onLoginSuccess: () => setState(() {}),
              )
            : pages[_tab],
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
                  child: Image.asset('assets/images/app_icon.png', fit: BoxFit.cover),
                ),
                const SizedBox(height: 12),
                Text(
                  'Welcome back',
                  style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700),
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
                      color: _message == 'Login success' ? Colors.green : scheme.error,
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
  const OverviewPage({super.key, required this.api});

  final AdminApi api;

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
        final stats = Map<String, dynamic>.from(snapshot.data?['stats'] as Map? ?? {});
        final items = [
          ('Users', stats['users'] ?? 0),
          ('Books', stats['books'] ?? 0),
          ('Practice', stats['practiceSets'] ?? 0),
          ('Tests', stats['tests'] ?? 0),
          ('Videos', stats['videos'] ?? 0),
          ('Packages', stats['packages'] ?? 0),
        ];
        return LayoutBuilder(
          builder: (context, constraints) {
            final width = constraints.maxWidth;
            final crossAxisCount = width > 1100
                ? 4
                : width > 760
                    ? 3
                    : 2;
            return GridView.count(
              padding: const EdgeInsets.all(16),
              crossAxisCount: crossAxisCount,
              childAspectRatio: 1.45,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              children: items
                  .map(
                    (e) => Card(
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              e.$1,
                              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                    fontWeight: FontWeight.w600,
                                  ),
                            ),
                            const SizedBox(height: 10),
                            Text(
                              '${e.$2}',
                              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                    fontWeight: FontWeight.w800,
                                  ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  )
                  .toList(),
            );
          },
        );
      },
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
  int? _classId;
  String? _status;
  List<dynamic> _classes = const [];

  @override
  void initState() {
    super.initState();
    _loadClasses();
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
                    await widget.api.createBatch(
                      name: _batchName.text.trim(),
                      targetYear: _batchTarget.text.trim(),
                      classLabel: _batchClass.text.trim(),
                    );
                    setState(() => _status = 'Batch created');
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
                    await widget.api.createClass(_className.text.trim());
                    await _loadClasses();
                    setState(() => _status = 'Class created');
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
                          await widget.api.createSubject(
                            classId: _classId!,
                            name: _subjectName.text.trim(),
                          );
                          setState(() => _status = 'Subject created');
                        },
                  child: const Text('Create Subject'),
                ),
              ],
            ),
          ),
        ),
        if (_status != null) Padding(
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
  final _chapterOverview = TextEditingController();
  final _chapterHighlight = TextEditingController();
  final _pyqQuestion = TextEditingController();
  final _pyqOptionA = TextEditingController();
  final _pyqOptionB = TextEditingController();
  final _pyqOptionC = TextEditingController();
  final _pyqOptionD = TextEditingController();
  final _pyqExplanation = TextEditingController();
  String _pyqCorrect = 'A';
  String _bookCategory = 'NCERT books';
  int? _selectedBookId;
  int? _selectedChapterId;
  List<dynamic> _chapters = const [];
  File? _pdf;
  String? _status;
  double _pdfProgress = 0.0;
  bool _pdfUploading = false;

  @override
  void initState() {
    super.initState();
    _loadBatches();
  }

  Future<void> _loadBatches() async {
    final batches = await widget.api.batches();
    final books = await widget.api.books();
    setState(() {
      _batches = batches['batches'] as List<dynamic>;
      _books = books['books'] as List<dynamic>;
      if (_batches.isNotEmpty) {
        _batchId = (_batches.first as Map<String, dynamic>)['id'] as int;
      }
      if (_books.isNotEmpty && _selectedBookId == null) {
        _selectedBookId = (_books.first as Map<String, dynamic>)['id'] as int;
      }
    });
    await _loadChaptersForSelectedBook();
  }

  Future<void> _loadChaptersForSelectedBook() async {
    if (_selectedBookId == null) {
      setState(() => _chapters = const []);
      return;
    }
    final data = await widget.api.bookChapters(_selectedBookId!);
    setState(() {
      _chapters = data;
      _selectedChapterId =
          _chapters.isNotEmpty ? (_chapters.first as Map<String, dynamic>)['id'] as int : null;
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
                    DropdownMenuItem(value: 'NCERT books', child: Text('NCERT books')),
                    DropdownMenuItem(value: 'Handwritten notes', child: Text('Handwritten notes')),
                    DropdownMenuItem(value: 'Formula sheets', child: Text('Formula sheets')),
                    DropdownMenuItem(value: 'Reference book', child: Text('Reference book')),
                  ],
                  onChanged: (v) => setState(() => _bookCategory = v ?? 'NCERT books'),
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
                      child: Text(_pdf == null ? 'No PDF selected' : _pdf!.path),
                    ),
                    TextButton(
                      onPressed: () async {
                        final result = await FilePicker.platform.pickFiles(
                          type: FileType.custom,
                          allowedExtensions: ['pdf'],
                        );
                        if (result == null || result.files.single.path == null) return;
                        setState(() => _pdf = File(result.files.single.path!));
                      },
                      child: const Text('Pick PDF'),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                FilledButton(
                  onPressed: _batchId == null
                      ? null
                      : () async {
                          try {
                            final chapterTitle = _chapter.text.trim().isEmpty
                                ? 'Introduction'
                                : _chapter.text.trim();
                            if (_editingId == null) {
                              final bookId = await widget.api.addBook(
                                batchId: _batchId!,
                                classLabel: _classLabel.text.trim(),
                                title: _bookTitle.text.trim().isEmpty
                                    ? '${_subject.text.trim()} Book'
                                    : _bookTitle.text.trim(),
                                subject: _subject.text.trim(),
                                topic: chapterTitle,
                                category: _bookCategory,
                              );
                              await widget.api.createBookChapter(
                                bookId: bookId,
                                title: chapterTitle,
                                overview:
                                    'Chapter overview will be managed from admin panel.',
                                noteSummary:
                                    'Add notes/PDF content for this chapter.',
                                highlight: 'Start with high-yield concepts first.',
                              );
                            } else {
                              await widget.api.updateBook(
                                id: _editingId!,
                                classLabel: _classLabel.text.trim(),
                                title: _bookTitle.text.trim(),
                                subject: _subject.text.trim(),
                                topic: chapterTitle,
                              );
                              _editingId = null;
                            }
                            await _loadBatches();
                            setState(() => _status = 'Book saved with chapter');
                          } catch (e) {
                            setState(() => _status = 'Failed: $e');
                          }
                        },
                  child: Text(_editingId == null ? 'Add Book' : 'Update Book'),
                ),
                const SizedBox(height: 8),
                FilledButton.tonal(
                  onPressed: (_pdf == null || _batchId == null || _pdfUploading)
                      ? null
                      : () async {
                          try {
                            setState(() {
                              _pdfUploading = true;
                              _pdfProgress = 0.0;
                              _status = null;
                            });
                            await widget.api.uploadBookByHierarchyChunked(
                              batchId: _batchId!,
                              classLabel: _classLabel.text.trim(),
                              subject: _subject.text.trim(),
                              chapterTitle: _chapter.text.trim().isEmpty
                                  ? 'Introduction'
                                  : _chapter.text.trim(),
                              pdfFile: _pdf!,
                              onProgress: (p) {
                                if (mounted) setState(() => _pdfProgress = p);
                              },
                            );
                            await _loadBatches();
                            setState(() => _status = 'PDF uploaded to Drive successfully');
                          } catch (e) {
                            setState(() => _status = 'PDF upload failed: $e');
                          } finally {
                            if (mounted) setState(() => _pdfUploading = false);
                          }
                        },
                  child: const Text('Upload Chapter PDF'),
                ),
                if (_pdfUploading) ...[
                  const SizedBox(height: 10),
                  LinearProgressIndicator(value: _pdfProgress == 0 ? null : _pdfProgress),
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
                  initialValue: _selectedBookId,
                  items: _books
                      .map(
                        (b) => DropdownMenuItem<int>(
                          value: (b as Map<String, dynamic>)['id'] as int,
                          child: Text('${b['title']} (${b['subject'] ?? ''})'),
                        ),
                      )
                      .toList(),
                  onChanged: (v) async {
                    setState(() => _selectedBookId = v);
                    await _loadChaptersForSelectedBook();
                  },
                  decoration: const InputDecoration(labelText: 'Select book'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _chapterOverview,
                  minLines: 2,
                  maxLines: 3,
                  decoration: const InputDecoration(labelText: 'Chapter overview'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _chapterHighlight,
                  decoration: const InputDecoration(labelText: 'Highlight (manual)'),
                ),
                const SizedBox(height: 8),
                FilledButton.tonal(
                  onPressed: _selectedBookId == null
                      ? null
                      : () async {
                          final selected = _books.firstWhere(
                            (e) => (e as Map<String, dynamic>)['id'] == _selectedBookId,
                            orElse: () => <String, dynamic>{},
                          );
                          final selectedSubject =
                              (selected as Map<String, dynamic>)['subject']?.toString() ?? '';
                          if (selectedSubject.isNotEmpty &&
                              selectedSubject != _subject.text.trim()) {
                            setState(() => _status = 'Selected subject mismatch with this book');
                            return;
                          }
                          await widget.api.createBookChapter(
                            bookId: _selectedBookId!,
                            title: _chapter.text.trim().isEmpty
                                ? 'Chapter ${_chapters.length + 1}'
                                : _chapter.text.trim(),
                            overview: _chapterOverview.text.trim(),
                            noteSummary: '',
                            highlight: _chapterHighlight.text.trim(),
                          );
                          await _loadChaptersForSelectedBook();
                          setState(() => _status = 'Manual chapter/highlight added');
                        },
                  child: const Text('Add Chapter + Highlight'),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<int>(
                  initialValue: _selectedChapterId,
                  items: _chapters
                      .map(
                        (c) => DropdownMenuItem<int>(
                          value: (c as Map<String, dynamic>)['id'] as int,
                          child: Text(c['title']?.toString() ?? ''),
                        ),
                      )
                      .toList(),
                  onChanged: (v) => setState(() => _selectedChapterId = v),
                  decoration: const InputDecoration(labelText: 'Select chapter for PYQ'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _pyqQuestion,
                  minLines: 2,
                  maxLines: 4,
                  decoration: const InputDecoration(labelText: 'PYQ question'),
                ),
                const SizedBox(height: 8),
                TextField(controller: _pyqOptionA, decoration: const InputDecoration(labelText: 'Option A')),
                const SizedBox(height: 8),
                TextField(controller: _pyqOptionB, decoration: const InputDecoration(labelText: 'Option B')),
                const SizedBox(height: 8),
                TextField(controller: _pyqOptionC, decoration: const InputDecoration(labelText: 'Option C')),
                const SizedBox(height: 8),
                TextField(controller: _pyqOptionD, decoration: const InputDecoration(labelText: 'Option D')),
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
                  decoration: const InputDecoration(labelText: 'Correct option'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _pyqExplanation,
                  decoration: const InputDecoration(labelText: 'Explanation'),
                ),
                const SizedBox(height: 8),
                FilledButton.tonal(
                  onPressed: _selectedChapterId == null
                      ? null
                      : () async {
                          await widget.api.addPyq(
                            chapterId: _selectedChapterId!,
                            question: _pyqQuestion.text.trim(),
                            optionA: _pyqOptionA.text.trim(),
                            optionB: _pyqOptionB.text.trim(),
                            optionC: _pyqOptionC.text.trim(),
                            optionD: _pyqOptionD.text.trim(),
                            correctOption: _pyqCorrect,
                            explanation: _pyqExplanation.text.trim(),
                          );
                          setState(() => _status = 'PYQ added manually');
                        },
                  child: const Text('Add PYQ'),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 12),
        ..._books.map(
          (book) => Card(
            child: ListTile(
              title: Text(book['title']?.toString() ?? ''),
              subtitle: Text(
                '${book['batch_name'] ?? ''} | ${book['class_label'] ?? ''} | ${book['subject'] ?? ''} | ${book['topic'] ?? ''}',
              ),
              trailing: Wrap(
                spacing: 4,
                children: [
                  IconButton(
                    onPressed: () {
                      setState(() {
                        _editingId = book['id'] as int;
                        _bookTitle.text = book['title']?.toString() ?? '';
                        _classLabel.text = book['class_label']?.toString() ?? '';
                        _subject.text = book['subject']?.toString() ?? '';
                        _chapter.text = book['topic']?.toString() ?? '';
                      });
                    },
                    icon: const Icon(Icons.edit_outlined),
                  ),
                  IconButton(
                    onPressed: () async {
                      await widget.api.deleteBook(book['id'] as int);
                      await _loadBatches();
                    },
                    icon: const Icon(Icons.delete_outline),
                  ),
                ],
              ),
            ),
          ),
        ),
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
  final _title = TextEditingController();
  final _classLabel = TextEditingController(text: 'Class 11');
  final _subject = TextEditingController(text: 'Biology');
  final _topic = TextEditingController();
  int? _batchId;
  int? _editingId;
  List<dynamic> _batches = const [];
  List<dynamic> _items = const [];

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final b = await widget.api.batches();
    final p = await widget.api.practiceSets();
    setState(() {
      _batches = b['batches'] as List<dynamic>;
      _items = p['practiceSets'] as List<dynamic>;
      _batchId ??= _batches.isNotEmpty ? (_batches.first as Map<String, dynamic>)['id'] as int : null;
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
                  items: _batches.map((e) => DropdownMenuItem(value: (e as Map<String, dynamic>)['id'] as int, child: Text(e['name'].toString()))).toList(),
                  onChanged: (v) => setState(() => _batchId = v),
                  decoration: const InputDecoration(labelText: 'Batch'),
                ),
                const SizedBox(height: 8),
                TextField(controller: _title, decoration: const InputDecoration(labelText: 'Practice title')),
                const SizedBox(height: 8),
                TextField(controller: _classLabel, decoration: const InputDecoration(labelText: 'Class')),
                const SizedBox(height: 8),
                TextField(controller: _subject, decoration: const InputDecoration(labelText: 'Subject')),
                const SizedBox(height: 8),
                TextField(controller: _topic, decoration: const InputDecoration(labelText: 'Topic')),
                const SizedBox(height: 8),
                FilledButton(
                  onPressed: _batchId == null
                      ? null
                      : () async {
                          if (_editingId == null) {
                            await widget.api.addPractice(
                              batchId: _batchId!,
                              classLabel: _classLabel.text.trim(),
                              title: _title.text.trim(),
                              subject: _subject.text.trim(),
                              topic: _topic.text.trim(),
                            );
                          } else {
                            await widget.api.updatePractice(
                              id: _editingId!,
                              classLabel: _classLabel.text.trim(),
                              title: _title.text.trim(),
                              subject: _subject.text.trim(),
                              topic: _topic.text.trim(),
                            );
                            _editingId = null;
                          }
                          await _load();
                        },
                  child: Text(_editingId == null ? 'Add Practice' : 'Update Practice'),
                ),
              ],
            ),
          ),
        ),
        ..._items.map(
          (e) => Card(
            child: ListTile(
              title: Text((e as Map<String, dynamic>)['title']?.toString() ?? ''),
              subtitle: Text('${e['batch_name'] ?? ''} | ${e['class_label'] ?? ''} | ${e['subject'] ?? ''} | ${e['topic'] ?? ''}'),
              trailing: Wrap(
                spacing: 4,
                children: [
                  IconButton(
                    onPressed: () {
                      setState(() {
                        _editingId = e['id'] as int;
                        _title.text = e['title']?.toString() ?? '';
                        _classLabel.text = e['class_label']?.toString() ?? '';
                        _subject.text = e['subject']?.toString() ?? '';
                        _topic.text = e['topic']?.toString() ?? '';
                      });
                    },
                    icon: const Icon(Icons.edit_outlined),
                  ),
                  IconButton(
                    onPressed: () async {
                      await widget.api.deletePractice(e['id'] as int);
                      await _load();
                    },
                    icon: const Icon(Icons.delete_outline),
                  ),
                ],
              ),
            ),
          ),
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
  final _title = TextEditingController();
  final _classLabel = TextEditingController(text: 'Class 11');
  final _subject = TextEditingController(text: 'Biology');
  final _topic = TextEditingController();
  final _duration = TextEditingController(text: '180');
  final _marks = TextEditingController(text: '720');
  final _questionCount = TextEditingController(text: '180');
  final _schedule = TextEditingController(text: 'Upcoming');
  final _testQuestion = TextEditingController();
  final _testOptionA = TextEditingController();
  final _testOptionB = TextEditingController();
  final _testOptionC = TextEditingController();
  final _testOptionD = TextEditingController();
  final _testExplanation = TextEditingController();
  String _testCorrect = 'A';
  int? _batchId;
  int? _editingId;
  int? _selectedTestId;
  List<dynamic> _batches = const [];
  List<dynamic> _items = const [];
  String? _status;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final b = await widget.api.batches();
    final t = await widget.api.tests();
    setState(() {
      _batches = b['batches'] as List<dynamic>;
      _items = t['tests'] as List<dynamic>;
      _batchId ??= _batches.isNotEmpty ? (_batches.first as Map<String, dynamic>)['id'] as int : null;
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
                  items: _batches.map((e) => DropdownMenuItem(value: (e as Map<String, dynamic>)['id'] as int, child: Text(e['name'].toString()))).toList(),
                  onChanged: (v) => setState(() => _batchId = v),
                  decoration: const InputDecoration(labelText: 'Batch'),
                ),
                const SizedBox(height: 8),
                TextField(controller: _title, decoration: const InputDecoration(labelText: 'Test title')),
                const SizedBox(height: 8),
                TextField(controller: _classLabel, decoration: const InputDecoration(labelText: 'Class')),
                const SizedBox(height: 8),
                TextField(controller: _subject, decoration: const InputDecoration(labelText: 'Subject')),
                const SizedBox(height: 8),
                TextField(controller: _topic, decoration: const InputDecoration(labelText: 'Topic')),
                const SizedBox(height: 8),
                TextField(controller: _duration, decoration: const InputDecoration(labelText: 'Duration (minutes)')),
                const SizedBox(height: 8),
                TextField(controller: _marks, decoration: const InputDecoration(labelText: 'Total marks')),
                const SizedBox(height: 8),
                TextField(controller: _questionCount, decoration: const InputDecoration(labelText: 'Question count')),
                const SizedBox(height: 8),
                TextField(controller: _schedule, decoration: const InputDecoration(labelText: 'Schedule label')),
                const SizedBox(height: 8),
                FilledButton(
                  onPressed: _batchId == null
                      ? null
                      : () async {
                          if (_editingId == null) {
                            await widget.api.addTest(
                              batchId: _batchId!,
                              classLabel: _classLabel.text.trim(),
                              title: _title.text.trim(),
                              subject: _subject.text.trim(),
                              topic: _topic.text.trim(),
                              durationMinutes: int.tryParse(_duration.text.trim()) ?? 180,
                              marks: int.tryParse(_marks.text.trim()) ?? 720,
                              questionCount: int.tryParse(_questionCount.text.trim()) ?? 180,
                              scheduleLabel: _schedule.text.trim(),
                            );
                            setState(() => _status = 'Test added successfully');
                          } else {
                            await widget.api.updateTest(
                              id: _editingId!,
                              classLabel: _classLabel.text.trim(),
                              title: _title.text.trim(),
                              subject: _subject.text.trim(),
                              topic: _topic.text.trim(),
                            );
                            _editingId = null;
                            setState(() => _status = 'Test updated successfully');
                          }
                          await _load();
                        },
                  child: Text(_editingId == null ? 'Add Test' : 'Update Test'),
                ),
                if (_status != null) ...[
                  const SizedBox(height: 8),
                  Text(_status!),
                ],
                const SizedBox(height: 10),
                const Divider(),
                const Align(
                  alignment: Alignment.centerLeft,
                  child: Text('Add questions to test', style: TextStyle(fontWeight: FontWeight.w700)),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<int>(
                  initialValue: _selectedTestId,
                  items: _items
                      .map(
                        (t) => DropdownMenuItem<int>(
                          value: (t as Map<String, dynamic>)['id'] as int,
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
                TextField(controller: _testOptionA, decoration: const InputDecoration(labelText: 'Option A')),
                const SizedBox(height: 8),
                TextField(controller: _testOptionB, decoration: const InputDecoration(labelText: 'Option B')),
                const SizedBox(height: 8),
                TextField(controller: _testOptionC, decoration: const InputDecoration(labelText: 'Option C')),
                const SizedBox(height: 8),
                TextField(controller: _testOptionD, decoration: const InputDecoration(labelText: 'Option D')),
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
                  decoration: const InputDecoration(labelText: 'Correct option'),
                ),
                const SizedBox(height: 8),
                TextField(controller: _testExplanation, decoration: const InputDecoration(labelText: 'Explanation')),
                const SizedBox(height: 8),
                FilledButton.tonal(
                  onPressed: _selectedTestId == null
                      ? null
                      : () async {
                          await widget.api.addTestQuestion(
                            testId: _selectedTestId!,
                            question: _testQuestion.text.trim(),
                            optionA: _testOptionA.text.trim(),
                            optionB: _testOptionB.text.trim(),
                            optionC: _testOptionC.text.trim(),
                            optionD: _testOptionD.text.trim(),
                            correctOption: _testCorrect,
                            explanation: _testExplanation.text.trim(),
                            subject: _subject.text.trim(),
                          );
                          setState(() => _status = 'Question added');
                        },
                  child: const Text('Add Question'),
                ),
              ],
            ),
          ),
        ),
        ..._items.map(
          (e) => Card(
            child: ListTile(
              title: Text((e as Map<String, dynamic>)['title']?.toString() ?? ''),
              subtitle: Text('${e['batch_name'] ?? ''} | ${e['class_label'] ?? ''} | ${e['subject'] ?? ''} | ${e['topic'] ?? ''}'),
              trailing: Wrap(
                spacing: 4,
                children: [
                  IconButton(
                    tooltip: 'View questions',
                    onPressed: () async {
                      final id = e['id'] as int;
                      final qs = await widget.api.testQuestions(id);
                      if (!context.mounted) return;
                      showModalBottomSheet(
                        context: context,
                        showDragHandle: true,
                        builder: (_) => SafeArea(
                          child: ListView(
                            padding: const EdgeInsets.all(16),
                            children: [
                              Text('Questions', style: Theme.of(context).textTheme.titleLarge),
                              const SizedBox(height: 12),
                              if (qs.isEmpty)
                                const Text('No questions yet')
                              else
                                ...qs.map(
                                  (q) => Padding(
                                    padding: const EdgeInsets.only(bottom: 12),
                                    child: Text('• ${q['question'] ?? ''}'),
                                  ),
                                ),
                            ],
                          ),
                        ),
                      );
                    },
                    icon: const Icon(Icons.list_alt_outlined),
                  ),
                  IconButton(
                    onPressed: () {
                      setState(() {
                        _editingId = e['id'] as int;
                        _title.text = e['title']?.toString() ?? '';
                        _classLabel.text = e['class_label']?.toString() ?? '';
                        _subject.text = e['subject']?.toString() ?? '';
                        _topic.text = e['topic']?.toString() ?? '';
                      });
                    },
                    icon: const Icon(Icons.edit_outlined),
                  ),
                  IconButton(
                    onPressed: () async {
                      await widget.api.deleteTest(e['id'] as int);
                      await _load();
                    },
                    icon: const Icon(Icons.delete_outline),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}

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
      _batchId ??= _batches.isNotEmpty ? (_batches.first as Map<String, dynamic>)['id'] as int : null;
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
                  items: _batches.map((e) => DropdownMenuItem(value: (e as Map<String, dynamic>)['id'] as int, child: Text(e['name'].toString()))).toList(),
                  onChanged: (v) => setState(() => _batchId = v),
                  decoration: const InputDecoration(labelText: 'Batch'),
                ),
                const SizedBox(height: 8),
                TextField(controller: _title, decoration: const InputDecoration(labelText: 'Video title')),
                const SizedBox(height: 8),
                TextField(controller: _classLabel, decoration: const InputDecoration(labelText: 'Class')),
                const SizedBox(height: 8),
                TextField(controller: _subject, decoration: const InputDecoration(labelText: 'Subject')),
                const SizedBox(height: 8),
                TextField(controller: _topic, decoration: const InputDecoration(labelText: 'Topic')),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(child: Text(_video == null ? 'No file selected' : _video!.path)),
                    TextButton(
                      onPressed: () async {
                        final result = await FilePicker.platform.pickFiles(type: FileType.video);
                        if (result?.files.single.path == null) return;
                        setState(() => _video = File(result!.files.single.path!));
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
                              setState(() => _status = 'Video uploaded successfully');
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
                            }
                            await _load();
                          } catch (e) {
                            setState(() => _status = 'Upload failed: $e');
                          } finally {
                            if (mounted) {
                              setState(() => _uploading = false);
                            }
                          }
                        },
                  child: Text(
                    _uploading
                        ? 'Please wait...'
                        : (_editingId == null ? 'Upload Video' : 'Update Video'),
                  ),
                ),
                if (_uploading) ...[
                  const SizedBox(height: 10),
                  LinearProgressIndicator(value: _progress == 0 ? null : _progress),
                ],
                if (_status != null) ...[
                  const SizedBox(height: 8),
                  Text(_status!),
                ],
              ],
            ),
          ),
        ),
        ..._items.map(
          (e) => Card(
            child: ListTile(
              title: Text((e as Map<String, dynamic>)['title']?.toString() ?? ''),
              subtitle: Text('${e['batch_name'] ?? ''} | ${e['class_label'] ?? ''} | ${e['subject'] ?? ''} | ${e['topic'] ?? ''}'),
              trailing: Wrap(
                spacing: 4,
                children: [
                  IconButton(
                    onPressed: () {
                      setState(() {
                        _editingId = e['id'] as int;
                        _title.text = e['title']?.toString() ?? '';
                        _classLabel.text = e['class_label']?.toString() ?? '';
                        _subject.text = e['subject']?.toString() ?? '';
                        _topic.text = e['topic']?.toString() ?? '';
                      });
                    },
                    icon: const Icon(Icons.edit_outlined),
                  ),
                  IconButton(
                    onPressed: () async {
                      await widget.api.deleteVideo(e['id'] as int);
                      await _load();
                    },
                    icon: const Icon(Icons.delete_outline),
                  ),
                ],
              ),
            ),
          ),
        ),
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
                TextField(controller: _name, decoration: const InputDecoration(labelText: 'Package name')),
                const SizedBox(height: 8),
                TextField(controller: _price, decoration: const InputDecoration(labelText: 'Price label')),
                const SizedBox(height: 8),
                TextField(controller: _validity, decoration: const InputDecoration(labelText: 'Validity')),
                const SizedBox(height: 8),
                TextField(controller: _highlight, decoration: const InputDecoration(labelText: 'Highlight')),
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
                    if (_editingId == null) {
                      await widget.api.addPackage(
                        name: _name.text.trim(),
                        priceLabel: _price.text.trim(),
                        validity: _validity.text.trim(),
                        highlight: _highlight.text.trim(),
                        features: _featureList,
                      );
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
                    }
                    await _load();
                  },
                  child: Text(_editingId == null ? 'Add Package' : 'Update Package'),
                ),
              ],
            ),
          ),
        ),
        ..._items.map(
          (e) {
            final item = e as Map<String, dynamic>;
            final features = (item['features_json'] as List<dynamic>? ?? []).join(', ');
            return Card(
              child: ListTile(
                title: Text(item['name']?.toString() ?? ''),
                subtitle: Text('${item['price_label']} | ${item['validity']}\n$features'),
                isThreeLine: true,
                trailing: Wrap(
                  spacing: 4,
                  children: [
                    IconButton(
                      onPressed: () {
                        setState(() {
                          _editingId = item['id'] as int;
                          _name.text = item['name']?.toString() ?? '';
                          _price.text = item['price_label']?.toString() ?? '';
                          _validity.text = item['validity']?.toString() ?? '';
                          _highlight.text = item['highlight']?.toString() ?? '';
                          _features.text =
                              (item['features_json'] as List<dynamic>? ?? []).join('\n');
                        });
                      },
                      icon: const Icon(Icons.edit_outlined),
                    ),
                    IconButton(
                      onPressed: () async {
                        await widget.api.deletePackage(item['id'] as int);
                        await _load();
                      },
                      icon: const Icon(Icons.delete_outline),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ],
    );
  }
}

class AdminApi {
  String? token;
  final http.Client _client = http.Client();

  Future<void> login(String username, String password) async {
    final response = await _client.post(
      Uri.parse('$baseUrl/admin/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'username': username, 'password': password}),
    );
    final body = jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception(body['error'] ?? 'login failed');
    }
    token = body['token']?.toString();
  }

  Future<Map<String, dynamic>> dashboard() => _get('/admin/dashboard');
  Future<Map<String, dynamic>> batches() => _get('/admin/batches');
  Future<Map<String, dynamic>> books() => _get('/admin/books');
  Future<Map<String, dynamic>> practiceSets() => _get('/admin/practice-sets');
  Future<Map<String, dynamic>> tests() => _get('/admin/tests');
  Future<Map<String, dynamic>> videos() => _get('/admin/videos');
  Future<Map<String, dynamic>> packages() => _get('/admin/packages');

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

  Future<List<dynamic>> classes() async => (await _get('/admin/classes'))['classes'] as List<dynamic>;

  Future<void> createClass(String name) async {
    await _post('/admin/classes', {'name': name});
  }

  Future<void> createSubject({
    required int classId,
    required String name,
  }) async {
    await _post('/admin/subjects', {'classId': classId, 'name': name});
  }

  Future<void> uploadBookByHierarchyChunked({
    required int batchId,
    required String classLabel,
    required String subject,
    required String chapterTitle,
    required File pdfFile,
    required void Function(double progress) onProgress,
  }) async {
    if (token == null) throw Exception('Login first');
    final fileName = pdfFile.path.split(Platform.pathSeparator).last;
    final init = await _postMap('/admin/books/pdf-upload-init', {
      'batchId': batchId,
      'classLabel': classLabel,
      'subject': subject,
      'chapterTitle': chapterTitle,
      'fileName': fileName,
      'mimeType': 'application/pdf',
    });
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
        req.files.add(http.MultipartFile.fromBytes('chunk', bytes, filename: 'chunk_$i.bin'));
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
      (await _get('/admin/books/$bookId/chapters'))['chapters'] as List<dynamic>;

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
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
  }) async {
    await _put('/admin/practice-sets/$id', {
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
  }) async {
    await _put('/admin/tests/$id', {
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
    });
  }

  Future<void> deleteTest(int id) => _delete('/admin/tests/$id');

  Future<void> addTestQuestion({
    required int testId,
    required String question,
    required String optionA,
    required String optionB,
    required String optionC,
    required String optionD,
    required String correctOption,
    required String explanation,
    required String subject,
  }) async {
    await _post('/admin/tests/$testId/questions', {
      'question': question,
      'optionA': optionA,
      'optionB': optionB,
      'optionC': optionC,
      'optionD': optionD,
      'correctOption': correctOption,
      'explanation': explanation,
      'subject': subject,
    });
  }

  Future<List<dynamic>> testQuestions(int testId) async =>
      (await _get('/admin/tests/$testId/questions'))['questions'] as List<dynamic>;

  Future<void> addPyq({
    required int chapterId,
    required String question,
    required String optionA,
    required String optionB,
    required String optionC,
    required String optionD,
    required String correctOption,
    required String explanation,
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
    });
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
    req.files.add(http.MultipartFile.fromBytes('video', videoBytes, filename: videoName));
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
        req.files.add(http.MultipartFile.fromBytes('chunk', bytes, filename: 'chunk_$i.bin'));

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

  Future<Map<String, dynamic>> _get(String path) async {
    if (token == null) throw Exception('Login first');
    final response = await _client.get(
      Uri.parse('$baseUrl$path'),
      headers: {'Authorization': 'Bearer $token'},
    );
    final body = jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception(body['error'] ?? 'request failed');
    }
    return body;
  }

  Future<void> _post(String path, Map<String, dynamic> payload) async {
    if (token == null) throw Exception('Login first');
    final response = await _client.post(
      Uri.parse('$baseUrl$path'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(payload),
    );
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception(response.body);
    }
  }

  Future<Map<String, dynamic>> _postMap(
    String path,
    Map<String, dynamic> payload,
  ) async {
    if (token == null) throw Exception('Login first');
    final response = await _client.post(
      Uri.parse('$baseUrl$path'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(payload),
    );
    final body = response.body.isEmpty
        ? <String, dynamic>{}
        : jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception(body['error'] ?? response.body);
    }
    return body;
  }

  Future<void> _put(String path, Map<String, dynamic> payload) async {
    if (token == null) throw Exception('Login first');
    final response = await _client.put(
      Uri.parse('$baseUrl$path'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(payload),
    );
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception(response.body);
    }
  }

  Future<void> _delete(String path) async {
    if (token == null) throw Exception('Login first');
    final response = await _client.delete(
      Uri.parse('$baseUrl$path'),
      headers: {'Authorization': 'Bearer $token'},
    );
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception(response.body);
    }
  }
}
