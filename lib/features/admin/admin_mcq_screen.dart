import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

import '../../core/constants/api_constants.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

const _storage = FlutterSecureStorage();
const _tokenKey = 'admin_auth_token';

// ── Repository ──────────────────────────────────────────────────────────────

class _AdminRepo {
  static final _client = http.Client();

  static Future<String?> _token() => _storage.read(key: _tokenKey);

  static Future<Map<String, dynamic>> login(
      String username, String password) async {
    final res = await _client.post(
      Uri.parse('$baseUrl/admin/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'username': username, 'password': password}),
    );
    final body = jsonDecode(res.body) as Map<String, dynamic>;
    if (res.statusCode == 200 && body['token'] != null) {
      await _storage.write(key: _tokenKey, value: body['token'] as String);
    }
    return body;
  }

  static Future<void> logout() => _storage.delete(key: _tokenKey);

  static Future<List<Map<String, dynamic>>> listMcqs() async {
    final token = await _token();
    if (token == null) return [];
    final res = await _client.get(
      Uri.parse('$baseUrl/admin/mcq-of-day'),
      headers: {'Authorization': 'Bearer $token'},
    );
    if (res.statusCode != 200) return [];
    final body = jsonDecode(res.body) as Map<String, dynamic>;
    return List<Map<String, dynamic>>.from(body['mcqs'] as List? ?? []);
  }

  static Future<bool> addMcq(Map<String, dynamic> payload) async {
    final token = await _token();
    if (token == null) return false;
    final res = await _client.post(
      Uri.parse('$baseUrl/admin/mcq-of-day'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(payload),
    );
    return res.statusCode == 200;
  }

  static Future<bool> deleteMcq(int id) async {
    final token = await _token();
    if (token == null) return false;
    final res = await _client.delete(
      Uri.parse('$baseUrl/admin/mcq-of-day/$id'),
      headers: {'Authorization': 'Bearer $token'},
    );
    return res.statusCode == 200;
  }
}

// ── Main Screen ─────────────────────────────────────────────────────────────

class AdminMcqScreen extends StatefulWidget {
  const AdminMcqScreen({super.key});

  @override
  State<AdminMcqScreen> createState() => _AdminMcqScreenState();
}

class _AdminMcqScreenState extends State<AdminMcqScreen> {
  bool _checkingAuth = true;
  bool _loggedIn = false;

  @override
  void initState() {
    super.initState();
    _checkToken();
  }

  Future<void> _checkToken() async {
    final token = await _storage.read(key: _tokenKey);
    setState(() {
      _loggedIn = token != null && token.isNotEmpty;
      _checkingAuth = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_checkingAuth) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }
    if (!_loggedIn) {
      return _AdminLoginScreen(onLogin: () => setState(() => _loggedIn = true));
    }
    return _AdminMcqListScreen(
        onLogout: () => setState(() => _loggedIn = false));
  }
}

// ── Login Screen ────────────────────────────────────────────────────────────

class _AdminLoginScreen extends StatefulWidget {
  const _AdminLoginScreen({required this.onLogin});
  final VoidCallback onLogin;

  @override
  State<_AdminLoginScreen> createState() => _AdminLoginScreenState();
}

class _AdminLoginScreenState extends State<_AdminLoginScreen> {
  final _user = TextEditingController();
  final _pass = TextEditingController();
  bool _loading = false;
  String? _error;

  @override
  void dispose() {
    _user.dispose();
    _pass.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    final u = _user.text.trim();
    final p = _pass.text.trim();
    if (u.isEmpty || p.isEmpty) {
      setState(() => _error = 'Enter username and password');
      return;
    }
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final res = await _AdminRepo.login(u, p);
      if (res['token'] != null) {
        widget.onLogin();
      } else {
        setState(() => _error = res['error']?.toString() ?? 'Login failed');
      }
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Admin — MCQ of the Day')),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.xl),
          child: CenteredContent(
            maxWidth: 400,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Admin login',
                    style: Theme.of(context).textTheme.headlineSmall),
                const SizedBox(height: AppSpacing.lg),
                TextField(
                  controller: _user,
                  decoration: const InputDecoration(
                      labelText: 'Username', prefixIcon: Icon(Icons.person_outline_rounded)),
                  textInputAction: TextInputAction.next,
                ),
                const SizedBox(height: AppSpacing.md),
                TextField(
                  controller: _pass,
                  decoration: const InputDecoration(
                      labelText: 'Password', prefixIcon: Icon(Icons.lock_outline_rounded)),
                  obscureText: true,
                  onSubmitted: (_) => _submit(),
                ),
                if (_error != null) ...[
                  const SizedBox(height: AppSpacing.sm),
                  Text(_error!,
                      style: const TextStyle(color: AppColors.danger)),
                ],
                const SizedBox(height: AppSpacing.lg),
                _loading
                    ? const Center(child: CircularProgressIndicator())
                    : PrimaryButton(label: 'Login', onPressed: _submit),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ── MCQ List + Add Screen ────────────────────────────────────────────────────

class _AdminMcqListScreen extends StatefulWidget {
  const _AdminMcqListScreen({required this.onLogout});
  final VoidCallback onLogout;

  @override
  State<_AdminMcqListScreen> createState() => _AdminMcqListScreenState();
}

class _AdminMcqListScreenState extends State<_AdminMcqListScreen> {
  List<Map<String, dynamic>> _mcqs = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() => _loading = true);
    final list = await _AdminRepo.listMcqs();
    if (mounted) setState(() {
      _mcqs = list;
      _loading = false;
    });
  }

  Future<void> _delete(int id) async {
    final ok = await _AdminRepo.deleteMcq(id);
    if (ok) _load();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('MCQ of the Day — Admin'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_rounded),
            onPressed: _load,
          ),
          IconButton(
            tooltip: 'Logout',
            icon: const Icon(Icons.logout_rounded),
            onPressed: () async {
              await _AdminRepo.logout();
              widget.onLogout();
            },
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () async {
          final added = await Navigator.of(context).push<bool>(
            MaterialPageRoute(builder: (_) => const _AddMcqScreen()),
          );
          if (added == true) { _load(); }
        },
        icon: const Icon(Icons.add_rounded),
        label: const Text('Add MCQ'),
        backgroundColor: AppColors.indigo,
        foregroundColor: Colors.white,
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _mcqs.isEmpty
              ? const Center(
                  child: EmptyStateWidget(
                    title: 'No MCQs yet',
                    subtitle: 'Tap + Add MCQ to create the first one.',
                    icon: Icons.quiz_outlined,
                  ),
                )
              : RefreshIndicator(
                  onRefresh: _load,
                  child: ListView.builder(
                    padding: const EdgeInsets.fromLTRB(
                        AppSpacing.md, AppSpacing.md, AppSpacing.md, 120),
                    itemCount: _mcqs.length,
                    itemBuilder: (_, i) {
                      final m = _mcqs[i];
                      final id = (m['id'] as num).toInt();
                      final issuedAt = m['issued_at']?.toString() ?? '';
                      final dt = DateTime.tryParse(issuedAt);
                      final expired = dt != null &&
                          DateTime.now()
                                  .difference(dt)
                                  .inHours >=
                              24;
                      return Card(
                        margin: const EdgeInsets.only(bottom: AppSpacing.sm),
                        child: ListTile(
                          leading: CircleAvatar(
                            backgroundColor: expired
                                ? AppColors.surfaceMuted
                                : AppColors.indigoSoft,
                            child: Icon(
                              expired
                                  ? Icons.history_rounded
                                  : Icons.quiz_rounded,
                              color: expired
                                  ? AppColors.textSecondary
                                  : AppColors.indigo,
                              size: 20,
                            ),
                          ),
                          title: Text(
                            m['question']?.toString() ?? '',
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          subtitle: Text(
                            [
                              m['subject']?.toString() ?? '',
                              m['topic']?.toString() ?? '',
                              if (dt != null)
                                'Issued ${dt.day}/${dt.month} ${dt.hour}:${dt.minute.toString().padLeft(2, '0')}',
                              if (expired) '• Expired',
                            ].where((s) => s.isNotEmpty).join('  '),
                            style: TextStyle(
                                fontSize: 12,
                                color: expired
                                    ? AppColors.textSecondary
                                    : null),
                          ),
                          trailing: IconButton(
                            icon: const Icon(Icons.delete_outline_rounded,
                                color: AppColors.danger),
                            onPressed: () => _confirmDelete(context, id),
                          ),
                        ),
                      );
                    },
                  ),
                ),
    );
  }

  void _confirmDelete(BuildContext context, int id) {
    showDialog<void>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Delete MCQ?'),
        content: const Text('This cannot be undone.'),
        actions: [
          TextButton(
              onPressed: () => Navigator.of(ctx).pop(),
              child: const Text('Cancel')),
          TextButton(
            onPressed: () {
              Navigator.of(ctx).pop();
              _delete(id);
            },
            child:
                const Text('Delete', style: TextStyle(color: AppColors.danger)),
          ),
        ],
      ),
    );
  }
}

// ── Add MCQ Screen ───────────────────────────────────────────────────────────

class _AddMcqScreen extends StatefulWidget {
  const _AddMcqScreen();

  @override
  State<_AddMcqScreen> createState() => _AddMcqScreenState();
}

class _AddMcqScreenState extends State<_AddMcqScreen> {
  final _question = TextEditingController();
  final _optA = TextEditingController();
  final _optB = TextEditingController();
  final _optC = TextEditingController();
  final _optD = TextEditingController();
  final _explanation = TextEditingController();
  final _imageLink = TextEditingController();
  final _subject = TextEditingController();
  final _topic = TextEditingController();
  String _correct = 'A';
  bool _loading = false;
  String? _error;

  @override
  void dispose() {
    for (final c in [
      _question, _optA, _optB, _optC, _optD,
      _explanation, _imageLink, _subject, _topic
    ]) {
      c.dispose();
    }
    super.dispose();
  }

  Future<void> _submit() async {
    final q = _question.text.trim();
    final a = _optA.text.trim();
    final b = _optB.text.trim();
    final c = _optC.text.trim();
    final d = _optD.text.trim();
    if (q.isEmpty || a.isEmpty || b.isEmpty || c.isEmpty || d.isEmpty) {
      setState(() => _error = 'Question and all four options are required');
      return;
    }
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final ok = await _AdminRepo.addMcq({
        'question': q,
        'optionA': a,
        'optionB': b,
        'optionC': c,
        'optionD': d,
        'correctOption': _correct,
        'explanation': _explanation.text.trim(),
        'questionImageLink': _imageLink.text.trim(),
        'subject': _subject.text.trim(),
        'topic': _topic.text.trim(),
      });
      if (ok && mounted) {
        Navigator.of(context).pop(true);
      } else {
        setState(() => _error = 'Failed to save. Check your connection.');
      }
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Add MCQ of the Day')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: CenteredContent(
          maxWidth: 640,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _label(context, 'Question *'),
              TextField(
                controller: _question,
                maxLines: 3,
                decoration: const InputDecoration(
                    hintText: 'Write the MCQ question here...'),
              ),
              const SizedBox(height: AppSpacing.md),

              // Image link
              _label(context, 'Question image (Google Drive link or URL)'),
              TextField(
                controller: _imageLink,
                decoration: const InputDecoration(
                    hintText:
                        'https://drive.google.com/file/d/... (optional)'),
              ),
              const SizedBox(height: AppSpacing.lg),

              _label(context, 'Options *'),
              ...[
                ('A', _optA),
                ('B', _optB),
                ('C', _optC),
                ('D', _optD),
              ].map((pair) => Padding(
                    padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                    child: TextField(
                      controller: pair.$2,
                      decoration: InputDecoration(
                        labelText: 'Option ${pair.$1}',
                        prefixIcon: CircleAvatar(
                          radius: 14,
                          backgroundColor:
                              _correct == pair.$1 ? AppColors.indigo : AppColors.surfaceMuted,
                          child: Text(
                            pair.$1,
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w700,
                              color: _correct == pair.$1
                                  ? Colors.white
                                  : AppColors.textSecondary,
                            ),
                          ),
                        ),
                      ),
                    ),
                  )),

              const SizedBox(height: AppSpacing.md),
              _label(context, 'Correct answer *'),
              Wrap(
                spacing: AppSpacing.sm,
                children: ['A', 'B', 'C', 'D'].map((opt) {
                  final sel = _correct == opt;
                  return ChoiceChip(
                    label: Text(opt),
                    selected: sel,
                    onSelected: (_) => setState(() => _correct = opt),
                    selectedColor: AppColors.indigo,
                    labelStyle: TextStyle(
                        color: sel ? Colors.white : null,
                        fontWeight: FontWeight.w700),
                  );
                }).toList(),
              ),

              const SizedBox(height: AppSpacing.lg),
              _label(context, 'Explanation'),
              TextField(
                controller: _explanation,
                maxLines: 3,
                decoration: const InputDecoration(
                    hintText: 'Explain why the answer is correct (optional)'),
              ),

              const SizedBox(height: AppSpacing.lg),
              Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _label(context, 'Subject'),
                        TextField(
                          controller: _subject,
                          decoration:
                              const InputDecoration(hintText: 'e.g. Biology'),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _label(context, 'Topic'),
                        TextField(
                          controller: _topic,
                          decoration: const InputDecoration(
                              hintText: 'e.g. Human Heart'),
                        ),
                      ],
                    ),
                  ),
                ],
              ),

              if (_error != null) ...[
                const SizedBox(height: AppSpacing.md),
                Text(_error!,
                    style: const TextStyle(color: AppColors.danger)),
              ],

              const SizedBox(height: AppSpacing.xl),
              _loading
                  ? const Center(child: CircularProgressIndicator())
                  : PrimaryButton(
                      label: 'Save MCQ',
                      icon: Icons.save_rounded,
                      onPressed: _submit,
                    ),
              const SizedBox(height: AppSpacing.xl),
            ],
          ),
        ),
      ),
    );
  }

  Widget _label(BuildContext context, String text) => Padding(
        padding: const EdgeInsets.only(bottom: AppSpacing.xs),
        child: Text(text,
            style: Theme.of(context)
                .textTheme
                .labelLarge
                ?.copyWith(fontWeight: FontWeight.w600)),
      );
}
