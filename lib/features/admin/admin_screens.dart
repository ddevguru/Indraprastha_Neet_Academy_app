import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';

import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import 'data/admin_repository.dart';

class AdminPanelScreen extends StatefulWidget {
  const AdminPanelScreen({super.key});

  @override
  State<AdminPanelScreen> createState() => _AdminPanelScreenState();
}

class _AdminPanelScreenState extends State<AdminPanelScreen> {
  final _repo = AdminRepository();
  final _username = TextEditingController(text: 'admin');
  final _password = TextEditingController(text: 'admin@123');

  bool _loading = false;
  String? _message;

  @override
  Widget build(BuildContext context) {
    if (!_repo.isLoggedIn) {
      return Scaffold(
        appBar: AppBar(title: const Text('Admin Login')),
        body: CenteredContent(
          maxWidth: 480,
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: SurfaceCard(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Separate Admin App', style: Theme.of(context).textTheme.titleLarge),
                  const SizedBox(height: AppSpacing.sm),
                  const Text('Admin panel user app se alag flow par chalega.'),
                  const SizedBox(height: AppSpacing.lg),
                  TextField(
                    controller: _username,
                    decoration: const InputDecoration(labelText: 'Username'),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  TextField(
                    controller: _password,
                    decoration: const InputDecoration(labelText: 'Password'),
                  ),
                  const SizedBox(height: AppSpacing.md),
                  PrimaryButton(
                    label: _loading ? 'Logging in...' : 'Login',
                    expanded: true,
                    onPressed: _loading
                        ? null
                        : () async {
                            setState(() => _loading = true);
                            try {
                              await _repo.login(
                                username: _username.text.trim(),
                                password: _password.text.trim(),
                              );
                              if (mounted) {
                                setState(() => _message = 'Admin login successful');
                              }
                            } catch (e) {
                              setState(() => _message = e.toString());
                            } finally {
                              if (mounted) setState(() => _loading = false);
                            }
                          },
                  ),
                  if (_message != null) ...[
                    const SizedBox(height: AppSpacing.sm),
                    Text(_message!),
                  ],
                ],
              ),
            ),
          ),
        ),
      );
    }

    return _AdminShell(repo: _repo);
  }
}

class _AdminShell extends StatefulWidget {
  const _AdminShell({required this.repo});

  final AdminRepository repo;

  @override
  State<_AdminShell> createState() => _AdminShellState();
}

class _AdminShellState extends State<_AdminShell> {
  int _tab = 0;

  @override
  Widget build(BuildContext context) {
    final pages = [
      _AdminOverviewTab(repo: widget.repo),
      _AdminBooksTab(repo: widget.repo),
      _AdminPracticeTestsTab(repo: widget.repo),
      _AdminVideosTab(repo: widget.repo),
    ];
    return Scaffold(
      appBar: AppBar(title: const Text('Admin App')),
      body: pages[_tab],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _tab,
        onDestinationSelected: (value) => setState(() => _tab = value),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.dashboard_outlined), label: 'Overview'),
          NavigationDestination(icon: Icon(Icons.menu_book_rounded), label: 'Books'),
          NavigationDestination(icon: Icon(Icons.assignment_rounded), label: 'Practice/Test'),
          NavigationDestination(icon: Icon(Icons.play_circle_outline_rounded), label: 'Videos'),
        ],
      ),
    );
  }
}

class _AdminOverviewTab extends StatelessWidget {
  const _AdminOverviewTab({required this.repo});

  final AdminRepository repo;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: repo.dashboard(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        final stats = Map<String, dynamic>.from(snapshot.data?['stats'] as Map? ?? {});
        return SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: CenteredContent(
            maxWidth: 1000,
            child: Wrap(
              spacing: AppSpacing.md,
              runSpacing: AppSpacing.md,
              children: [
                _StatTile(title: 'Books', value: '${stats['books'] ?? 0}'),
                _StatTile(title: 'Practice', value: '${stats['practiceSets'] ?? 0}'),
                _StatTile(title: 'Tests', value: '${stats['tests'] ?? 0}'),
                _StatTile(title: 'Videos', value: '${stats['videos'] ?? 0}'),
                _StatTile(title: 'Users', value: '${stats['users'] ?? 0}'),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _AdminBooksTab extends StatefulWidget {
  const _AdminBooksTab({required this.repo});

  final AdminRepository repo;

  @override
  State<_AdminBooksTab> createState() => _AdminBooksTabState();
}

class _AdminBooksTabState extends State<_AdminBooksTab> {
  final _title = TextEditingController();
  final _subject = TextEditingController(text: 'Physics');
  final _topic = TextEditingController();
  final _bookIdForPdf = TextEditingController();
  final _chapterTitle = TextEditingController();
  int? _batchId;
  String _classLabel = 'Class 11';
  int? _editingBookId;
  File? _pdfFile;

  Future<Map<String, dynamic>> _load() async {
    final batches = await widget.repo.batches();
    final books = await widget.repo.books();
    return {'batches': batches['batches'], 'books': books['books']};
  }

  Future<void> _pickPdf() async {
    final result = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: ['pdf'],
    );
    if (result == null || result.files.single.path == null) return;
    setState(() => _pdfFile = File(result.files.single.path!));
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: _load(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        final batches = List<Map<String, dynamic>>.from(snapshot.data?['batches'] as List? ?? const []);
        final books = List<Map<String, dynamic>>.from(snapshot.data?['books'] as List? ?? const []);
        _batchId ??= batches.isNotEmpty ? batches.first['id'] as int : null;
        return SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: CenteredContent(
            maxWidth: 1100,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _HierarchySelectors(
                  batches: batches,
                  batchId: _batchId,
                  classLabel: _classLabel,
                  onBatchChanged: (v) => setState(() => _batchId = v),
                  onClassChanged: (v) => setState(() => _classLabel = v),
                ),
                const SizedBox(height: AppSpacing.md),
                SurfaceCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _editingBookId == null ? 'Add Book' : 'Update Book #$_editingBookId',
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                      const SizedBox(height: AppSpacing.md),
                      TextField(controller: _title, decoration: const InputDecoration(labelText: 'Book title')),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _subject, decoration: const InputDecoration(labelText: 'Subject')),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _topic, decoration: const InputDecoration(labelText: 'Topic')),
                      const SizedBox(height: AppSpacing.md),
                      PrimaryButton(
                        label: _editingBookId == null ? 'Add Book' : 'Update Book',
                        expanded: true,
                        onPressed: _batchId == null
                            ? null
                            : () async {
                                if (_editingBookId == null) {
                                  await widget.repo.addBook(
                                    batchId: _batchId!,
                                    classLabel: _classLabel,
                                    title: _title.text.trim(),
                                    subject: _subject.text.trim(),
                                    topic: _topic.text.trim(),
                                  );
                                } else {
                                  await widget.repo.updateBook(
                                    bookId: _editingBookId!,
                                    classLabel: _classLabel,
                                    title: _title.text.trim(),
                                    subject: _subject.text.trim(),
                                    topic: _topic.text.trim(),
                                  );
                                }
                                if (mounted) setState(() => _editingBookId = null);
                              },
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: AppSpacing.lg),
                SurfaceCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Upload Chapter PDF', style: Theme.of(context).textTheme.titleMedium),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _bookIdForPdf, decoration: const InputDecoration(labelText: 'Book ID')),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _chapterTitle, decoration: const InputDecoration(labelText: 'Chapter title')),
                      const SizedBox(height: AppSpacing.sm),
                      Row(
                        children: [
                          Expanded(
                            child: Text(_pdfFile == null ? 'No PDF selected' : _pdfFile!.path.split(Platform.pathSeparator).last),
                          ),
                          TextButton(onPressed: _pickPdf, child: const Text('Pick PDF')),
                        ],
                      ),
                      PrimaryButton(
                        label: 'Upload PDF',
                        expanded: true,
                        onPressed: _pdfFile == null
                            ? null
                            : () async {
                                await widget.repo.uploadBookPdf(
                                  bookId: int.parse(_bookIdForPdf.text.trim()),
                                  chapterTitle: _chapterTitle.text.trim(),
                                  pdfFile: _pdfFile!,
                                );
                                if (mounted) {
                                  setState(() => _pdfFile = null);
                                }
                              },
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: AppSpacing.lg),
                ...books.map(
                  (book) => Padding(
                    padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                    child: ListTile(
                      tileColor: AppColors.surfaceMuted,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadii.md)),
                      title: Text(book['title']?.toString() ?? ''),
                      subtitle: Text(
                        '${book['batch_name']} | ${book['class_label'] ?? ''} | ${book['subject'] ?? ''} | ${book['topic'] ?? ''}',
                      ),
                      trailing: Wrap(
                        spacing: 6,
                        children: [
                          IconButton(
                            onPressed: () {
                              setState(() {
                                _editingBookId = book['id'] as int;
                                _title.text = book['title']?.toString() ?? '';
                                _subject.text = book['subject']?.toString() ?? '';
                                _topic.text = book['topic']?.toString() ?? '';
                                _classLabel = book['class_label']?.toString().isNotEmpty == true
                                    ? book['class_label'].toString()
                                    : _classLabel;
                              });
                            },
                            icon: const Icon(Icons.edit_outlined),
                          ),
                          IconButton(
                            onPressed: () async {
                              await widget.repo.deleteBook(book['id'] as int);
                              if (mounted) setState(() {});
                            },
                            icon: const Icon(Icons.delete_outline_rounded),
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
    );
  }
}

class _AdminPracticeTestsTab extends StatefulWidget {
  const _AdminPracticeTestsTab({required this.repo});

  final AdminRepository repo;

  @override
  State<_AdminPracticeTestsTab> createState() => _AdminPracticeTestsTabState();
}

class _AdminPracticeTestsTabState extends State<_AdminPracticeTestsTab> {
  int? _batchId;
  String _classLabel = 'Class 11';
  final _subject = TextEditingController(text: 'Biology');
  final _topic = TextEditingController();
  final _practiceTitle = TextEditingController();
  final _testTitle = TextEditingController();
  int? _editingPracticeId;
  int? _editingTestId;
  final _testIdForQuestion = TextEditingController();
  final _question = TextEditingController();
  final _optA = TextEditingController();
  final _optB = TextEditingController();
  final _optC = TextEditingController();
  final _optD = TextEditingController();
  final _correct = TextEditingController(text: 'A');
  final _explanation = TextEditingController();

  Future<Map<String, dynamic>> _load() async {
    final batches = await widget.repo.batches();
    final practice = await widget.repo.practiceSets();
    final tests = await widget.repo.tests();
    return {
      'batches': batches['batches'],
      'practice': practice['practiceSets'],
      'tests': tests['tests'],
    };
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: _load(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        final batches = List<Map<String, dynamic>>.from(snapshot.data?['batches'] as List? ?? const []);
        final practices = List<Map<String, dynamic>>.from(snapshot.data?['practice'] as List? ?? const []);
        final tests = List<Map<String, dynamic>>.from(snapshot.data?['tests'] as List? ?? const []);
        _batchId ??= batches.isNotEmpty ? batches.first['id'] as int : null;

        return SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: CenteredContent(
            maxWidth: 1100,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _HierarchySelectors(
                  batches: batches,
                  batchId: _batchId,
                  classLabel: _classLabel,
                  onBatchChanged: (v) => setState(() => _batchId = v),
                  onClassChanged: (v) => setState(() => _classLabel = v),
                ),
                const SizedBox(height: AppSpacing.md),
                SurfaceCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Add Practice Set', style: Theme.of(context).textTheme.titleMedium),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _practiceTitle, decoration: const InputDecoration(labelText: 'Practice title')),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _subject, decoration: const InputDecoration(labelText: 'Subject')),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _topic, decoration: const InputDecoration(labelText: 'Topic')),
                      const SizedBox(height: AppSpacing.md),
                      PrimaryButton(
                        label: _editingPracticeId == null ? 'Add Practice' : 'Update Practice',
                        expanded: true,
                        onPressed: _batchId == null
                            ? null
                            : () async {
                                if (_editingPracticeId == null) {
                                  await widget.repo.addPractice(
                                    batchId: _batchId!,
                                    classLabel: _classLabel,
                                    title: _practiceTitle.text.trim(),
                                    subject: _subject.text.trim(),
                                    topic: _topic.text.trim(),
                                  );
                                } else {
                                  await widget.repo.updatePractice(
                                    id: _editingPracticeId!,
                                    classLabel: _classLabel,
                                    title: _practiceTitle.text.trim(),
                                    subject: _subject.text.trim(),
                                    topic: _topic.text.trim(),
                                  );
                                  _editingPracticeId = null;
                                }
                                if (mounted) setState(() {});
                              },
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: AppSpacing.md),
                SurfaceCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Add Test', style: Theme.of(context).textTheme.titleMedium),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _testTitle, decoration: const InputDecoration(labelText: 'Test title')),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _subject, decoration: const InputDecoration(labelText: 'Subject')),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _topic, decoration: const InputDecoration(labelText: 'Topic')),
                      const SizedBox(height: AppSpacing.md),
                      PrimaryButton(
                        label: _editingTestId == null ? 'Add Test' : 'Update Test',
                        expanded: true,
                        onPressed: _batchId == null
                            ? null
                            : () async {
                                if (_editingTestId == null) {
                                  await widget.repo.addTest(
                                    batchId: _batchId!,
                                    classLabel: _classLabel,
                                    title: _testTitle.text.trim(),
                                    subject: _subject.text.trim(),
                                    topic: _topic.text.trim(),
                                  );
                                } else {
                                  await widget.repo.updateTest(
                                    id: _editingTestId!,
                                    classLabel: _classLabel,
                                    title: _testTitle.text.trim(),
                                    subject: _subject.text.trim(),
                                    topic: _topic.text.trim(),
                                  );
                                  _editingTestId = null;
                                }
                                if (mounted) setState(() {});
                              },
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: AppSpacing.md),
                SurfaceCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Type Test Question', style: Theme.of(context).textTheme.titleMedium),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _testIdForQuestion, decoration: const InputDecoration(labelText: 'Test ID')),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _question, decoration: const InputDecoration(labelText: 'Question')),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _optA, decoration: const InputDecoration(labelText: 'Option A')),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _optB, decoration: const InputDecoration(labelText: 'Option B')),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _optC, decoration: const InputDecoration(labelText: 'Option C')),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _optD, decoration: const InputDecoration(labelText: 'Option D')),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _correct, decoration: const InputDecoration(labelText: 'Correct option (A/B/C/D)')),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _explanation, decoration: const InputDecoration(labelText: 'Explanation')),
                      const SizedBox(height: AppSpacing.md),
                      PrimaryButton(
                        label: 'Save Question',
                        expanded: true,
                        onPressed: () async {
                          await widget.repo.addTestQuestion(
                            testId: int.parse(_testIdForQuestion.text.trim()),
                            subject: _subject.text.trim(),
                            question: _question.text.trim(),
                            optionA: _optA.text.trim(),
                            optionB: _optB.text.trim(),
                            optionC: _optC.text.trim(),
                            optionD: _optD.text.trim(),
                            correctOption: _correct.text.trim().toUpperCase(),
                            explanation: _explanation.text.trim(),
                          );
                        },
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: AppSpacing.lg),
                Text('Practice Sets', style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: AppSpacing.sm),
                ...practices.map(
                  (item) => ListTile(
                    title: Text(item['title']?.toString() ?? ''),
                    subtitle: Text('${item['batch_name']} | ${item['class_label'] ?? ''} | ${item['subject'] ?? ''} | ${item['topic'] ?? ''}'),
                    trailing: Wrap(
                      spacing: 6,
                      children: [
                        IconButton(
                          onPressed: () {
                            setState(() {
                              _editingPracticeId = item['id'] as int;
                              _practiceTitle.text = item['title']?.toString() ?? '';
                              _subject.text = item['subject']?.toString() ?? '';
                              _topic.text = item['topic']?.toString() ?? '';
                            });
                          },
                          icon: const Icon(Icons.edit_outlined),
                        ),
                        IconButton(
                          onPressed: () async {
                            await widget.repo.deletePractice(item['id'] as int);
                            if (mounted) setState(() {});
                          },
                          icon: const Icon(Icons.delete_outline),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: AppSpacing.md),
                Text('Tests', style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: AppSpacing.sm),
                ...tests.map(
                  (item) => ListTile(
                    title: Text(item['title']?.toString() ?? ''),
                    subtitle: Text('${item['batch_name']} | ${item['class_label'] ?? ''} | ${item['subject'] ?? ''} | ${item['topic'] ?? ''}'),
                    trailing: Wrap(
                      spacing: 6,
                      children: [
                        IconButton(
                          onPressed: () {
                            setState(() {
                              _editingTestId = item['id'] as int;
                              _testTitle.text = item['title']?.toString() ?? '';
                              _subject.text = item['subject']?.toString() ?? '';
                              _topic.text = item['topic']?.toString() ?? '';
                            });
                          },
                          icon: const Icon(Icons.edit_outlined),
                        ),
                        IconButton(
                          onPressed: () async {
                            await widget.repo.deleteTest(item['id'] as int);
                            if (mounted) setState(() {});
                          },
                          icon: const Icon(Icons.delete_outline),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _AdminVideosTab extends StatefulWidget {
  const _AdminVideosTab({required this.repo});

  final AdminRepository repo;

  @override
  State<_AdminVideosTab> createState() => _AdminVideosTabState();
}

class _AdminVideosTabState extends State<_AdminVideosTab> {
  int? _batchId;
  String _classLabel = 'Class 11';
  final _title = TextEditingController();
  final _subject = TextEditingController(text: 'Biology');
  final _topic = TextEditingController();
  int? _editingVideoId;
  File? _videoFile;

  Future<Map<String, dynamic>> _load() async {
    final batches = await widget.repo.batches();
    final videos = await widget.repo.videos();
    return {'batches': batches['batches'], 'videos': videos['videos']};
  }

  Future<void> _pickVideo() async {
    final result = await FilePicker.platform.pickFiles(type: FileType.video);
    if (result == null || result.files.single.path == null) return;
    setState(() => _videoFile = File(result.files.single.path!));
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: _load(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        final batches = List<Map<String, dynamic>>.from(snapshot.data?['batches'] as List? ?? const []);
        final videos = List<Map<String, dynamic>>.from(snapshot.data?['videos'] as List? ?? const []);
        _batchId ??= batches.isNotEmpty ? batches.first['id'] as int : null;
        return SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: CenteredContent(
            maxWidth: 1100,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _HierarchySelectors(
                  batches: batches,
                  batchId: _batchId,
                  classLabel: _classLabel,
                  onBatchChanged: (v) => setState(() => _batchId = v),
                  onClassChanged: (v) => setState(() => _classLabel = v),
                ),
                const SizedBox(height: AppSpacing.md),
                SurfaceCard(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Upload Video', style: Theme.of(context).textTheme.titleLarge),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _title, decoration: const InputDecoration(labelText: 'Video title')),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _subject, decoration: const InputDecoration(labelText: 'Subject')),
                      const SizedBox(height: AppSpacing.sm),
                      TextField(controller: _topic, decoration: const InputDecoration(labelText: 'Topic')),
                      const SizedBox(height: AppSpacing.sm),
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              _videoFile == null
                                  ? 'No video selected'
                                  : _videoFile!.path.split(Platform.pathSeparator).last,
                            ),
                          ),
                          TextButton(onPressed: _pickVideo, child: const Text('Pick Video')),
                        ],
                      ),
                      PrimaryButton(
                        label: _editingVideoId == null ? 'Upload' : 'Update metadata',
                        expanded: true,
                        onPressed: _batchId == null
                            ? null
                            : () async {
                                if (_editingVideoId == null) {
                                  if (_videoFile == null) return;
                                  await widget.repo.uploadVideo(
                                    batchId: _batchId!,
                                    classLabel: _classLabel,
                                    title: _title.text.trim(),
                                    subject: _subject.text.trim(),
                                    topic: _topic.text.trim(),
                                    file: _videoFile!,
                                  );
                                  if (mounted) setState(() => _videoFile = null);
                                } else {
                                  await widget.repo.updateVideo(
                                    id: _editingVideoId!,
                                    classLabel: _classLabel,
                                    title: _title.text.trim(),
                                    subject: _subject.text.trim(),
                                    topic: _topic.text.trim(),
                                  );
                                  if (mounted) setState(() => _editingVideoId = null);
                                }
                              },
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: AppSpacing.lg),
                ...videos.map(
                  (v) => ListTile(
                    title: Text(v['title']?.toString() ?? ''),
                    subtitle: Text('${v['batch_name']} | ${v['class_label'] ?? ''} | ${v['subject'] ?? ''} | ${v['topic'] ?? ''}'),
                    trailing: Wrap(
                      spacing: 6,
                      children: [
                        IconButton(
                          onPressed: () {
                            setState(() {
                              _editingVideoId = v['id'] as int;
                              _title.text = v['title']?.toString() ?? '';
                              _subject.text = v['subject']?.toString() ?? '';
                              _topic.text = v['topic']?.toString() ?? '';
                            });
                          },
                          icon: const Icon(Icons.edit_outlined),
                        ),
                        IconButton(
                          onPressed: () async {
                            await widget.repo.deleteVideo(v['id'] as int);
                            if (mounted) setState(() {});
                          },
                          icon: const Icon(Icons.delete_outline),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _HierarchySelectors extends StatelessWidget {
  const _HierarchySelectors({
    required this.batches,
    required this.batchId,
    required this.classLabel,
    required this.onBatchChanged,
    required this.onClassChanged,
  });

  final List<Map<String, dynamic>> batches;
  final int? batchId;
  final String classLabel;
  final ValueChanged<int?> onBatchChanged;
  final ValueChanged<String> onClassChanged;

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Batch/Class Mapping', style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: AppSpacing.sm),
          DropdownButtonFormField<int>(
            initialValue: batchId,
            items: batches
                .map(
                  (b) => DropdownMenuItem<int>(
                    value: b['id'] as int,
                    child: Text('${b['name']}'),
                  ),
                )
                .toList(),
            onChanged: onBatchChanged,
            decoration: const InputDecoration(labelText: 'Batch'),
          ),
          const SizedBox(height: AppSpacing.sm),
          DropdownButtonFormField<String>(
            initialValue: classLabel,
            items: const [
              DropdownMenuItem(value: 'Class 11', child: Text('Class 11')),
              DropdownMenuItem(value: 'Class 12', child: Text('Class 12')),
              DropdownMenuItem(value: 'Dropper', child: Text('Dropper')),
            ],
            onChanged: (value) {
              if (value != null) onClassChanged(value);
            },
            decoration: const InputDecoration(labelText: 'Class'),
          ),
        ],
      ),
    );
  }
}

class _StatTile extends StatelessWidget {
  const _StatTile({required this.title, required this.value});

  final String title;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 170,
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: AppColors.surfaceMuted,
        borderRadius: BorderRadius.circular(AppRadii.md),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title),
          const SizedBox(height: AppSpacing.xs),
          Text(value, style: Theme.of(context).textTheme.titleLarge),
        ],
      ),
    );
  }
}
