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
  ThemeMode _themeMode = ThemeMode.dark;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Indraprastha Admin',
      theme: ThemeData(useMaterial3: true, colorSchemeSeed: Colors.deepOrange),
      darkTheme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        colorSchemeSeed: Colors.deepOrange,
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
    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin Panel'),
        actions: [
          IconButton(
            onPressed: widget.onToggleTheme,
            icon: const Icon(Icons.dark_mode_outlined),
            tooltip: 'Dark/Light',
          ),
        ],
      ),
      body: _api.token == null ? LoginPage(api: _api) : pages[_tab],
      bottomNavigationBar: _api.token == null
          ? null
          : NavigationBar(
              selectedIndex: _tab,
              onDestinationSelected: (i) => setState(() => _tab = i),
              destinations: const [
                NavigationDestination(
                  icon: Icon(Icons.dashboard_outlined),
                  label: 'Overview',
                ),
                NavigationDestination(
                  icon: Icon(Icons.account_tree_outlined),
                  label: 'Setup',
                ),
                NavigationDestination(
                  icon: Icon(Icons.upload_file_outlined),
                  label: 'Books',
                ),
                NavigationDestination(icon: Icon(Icons.flash_on_outlined), label: 'Practice'),
                NavigationDestination(icon: Icon(Icons.fact_check_outlined), label: 'Tests'),
                NavigationDestination(icon: Icon(Icons.smart_display_outlined), label: 'Videos'),
                NavigationDestination(icon: Icon(Icons.workspace_premium_outlined), label: 'Packages'),
              ],
            ),
    );
  }
}

class LoginPage extends StatefulWidget {
  const LoginPage({super.key, required this.api});

  final AdminApi api;

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
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 420),
        child: Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: _username,
                  decoration: const InputDecoration(labelText: 'Username'),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _password,
                  decoration: const InputDecoration(labelText: 'Password'),
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
                            if (mounted) setState(() => _message = 'Login success');
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
                  Text(_message!),
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
        return GridView.count(
          padding: const EdgeInsets.all(16),
          crossAxisCount: 2,
          childAspectRatio: 1.8,
          children: items
              .map(
                (e) => Card(
                  child: Center(
                    child: ListTile(
                      title: Text(e.$1),
                      subtitle: Text('${e.$2}', style: Theme.of(context).textTheme.headlineSmall),
                    ),
                  ),
                ),
              )
              .toList(),
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
  File? _pdf;
  String? _status;

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
                          if (_editingId == null) {
                            await widget.api.addBook(
                              batchId: _batchId!,
                              classLabel: _classLabel.text.trim(),
                              title: _bookTitle.text.trim().isEmpty
                                  ? '${_subject.text.trim()} Book'
                                  : _bookTitle.text.trim(),
                              subject: _subject.text.trim(),
                              topic: _chapter.text.trim(),
                            );
                          } else {
                            await widget.api.updateBook(
                              id: _editingId!,
                              classLabel: _classLabel.text.trim(),
                              title: _bookTitle.text.trim(),
                              subject: _subject.text.trim(),
                              topic: _chapter.text.trim(),
                            );
                            _editingId = null;
                          }
                          await _loadBatches();
                          setState(() => _status = 'Book saved');
                        },
                  child: Text(_editingId == null ? 'Add Book' : 'Update Book'),
                ),
                const SizedBox(height: 8),
                FilledButton.tonal(
                  onPressed: (_pdf == null || _batchId == null)
                      ? null
                      : () async {
                          await widget.api.uploadBookByHierarchy(
                            batchId: _batchId!,
                            classLabel: _classLabel.text.trim(),
                            subject: _subject.text.trim(),
                            chapterTitle: _chapter.text.trim(),
                            pdfFile: _pdf!,
                          );
                          await _loadBatches();
                          setState(() => _status = 'PDF uploaded');
                        },
                  child: const Text('Upload Chapter PDF'),
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
                            );
                          } else {
                            await widget.api.updateTest(
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
                  child: Text(_editingId == null ? 'Add Test' : 'Update Test'),
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
                  onPressed: _batchId == null
                      ? null
                      : () async {
                          if (_editingId == null) {
                            if (_video == null) return;
                            await widget.api.uploadVideo(
                              batchId: _batchId!,
                              classLabel: _classLabel.text.trim(),
                              title: _title.text.trim(),
                              subject: _subject.text.trim(),
                              topic: _topic.text.trim(),
                              file: _video!,
                            );
                          } else {
                            await widget.api.updateVideo(
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
                  child: Text(_editingId == null ? 'Upload Video' : 'Update Video'),
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

  Future<void> uploadBookByHierarchy({
    required int batchId,
    required String classLabel,
    required String subject,
    required String chapterTitle,
    required File pdfFile,
  }) async {
    if (token == null) throw Exception('Login first');
    final req = http.MultipartRequest(
      'POST',
      Uri.parse('$baseUrl/admin/books/upload-by-hierarchy'),
    );
    req.headers['Authorization'] = 'Bearer $token';
    req.fields['batchId'] = '$batchId';
    req.fields['classLabel'] = classLabel;
    req.fields['subject'] = subject;
    req.fields['chapterTitle'] = chapterTitle;
    req.files.add(await http.MultipartFile.fromPath('pdf', pdfFile.path));
    final streamed = await req.send();
    if (streamed.statusCode < 200 || streamed.statusCode >= 300) {
      final payload = await streamed.stream.bytesToString();
      throw Exception('Upload failed: $payload');
    }
  }

  Future<void> addBook({
    required int batchId,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
  }) async {
    await _post('/admin/books', {
      'batchId': batchId,
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
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
  }) async {
    await _post('/admin/tests', {
      'batchId': batchId,
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
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

  Future<void> uploadVideo({
    required int batchId,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
    required File file,
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
    req.files.add(await http.MultipartFile.fromPath('video', file.path));
    final streamed = await req.send();
    if (streamed.statusCode < 200 || streamed.statusCode >= 300) {
      throw Exception(await streamed.stream.bytesToString());
    }
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
