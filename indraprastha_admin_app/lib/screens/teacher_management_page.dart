import 'package:flutter/material.dart';
import '../services/admin_community_service.dart';

class TeacherManagementPage extends StatefulWidget {
  const TeacherManagementPage({super.key});

  @override
  State<TeacherManagementPage> createState() => _TeacherManagementPageState();
}

class _TeacherManagementPageState extends State<TeacherManagementPage> {
  bool _loading = true;
  String _error = '';
  List<Map<String, dynamic>> _teachers = [];

  @override
  void initState() {
    super.initState();
    _loadTeachers();
  }

  Future<void> _loadTeachers() async {
    setState(() {
      _loading = true;
      _error = '';
    });
    try {
      final list = await AdminCommunityService.getTeachers();
      if (!mounted) return;
      setState(() {
        _teachers = list;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _error = e.toString().replaceFirst('Exception: ', '');
        _loading = false;
      });
    }
  }

  Future<void> _showCreateTeacherDialog() async {
    final nameCtrl = TextEditingController();
    final emailCtrl = TextEditingController();
    final passwordCtrl = TextEditingController();
    final codeCtrl = TextEditingController(text: 'T-${DateTime.now().millisecondsSinceEpoch % 10000}');
    String selectedClass = 'Class 11';
    String selectedSubject = 'Physics';
    bool busy = false;
    String? dialogError;

    await showDialog(
      context: context,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (ctx, setDialogState) {
            return AlertDialog(
              title: const Text('Add Faculty Teacher'),
              content: SingleChildScrollView(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 440),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      if (dialogError != null)
                        Container(
                          padding: const EdgeInsets.all(8),
                          margin: const EdgeInsets.only(bottom: 12),
                          decoration: BoxDecoration(
                            color: Colors.red.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            dialogError!,
                            style: const TextStyle(color: Colors.red, fontSize: 12),
                          ),
                        ),
                      TextField(
                        controller: nameCtrl,
                        decoration: const InputDecoration(
                          labelText: 'Faculty Full Name *',
                          prefixIcon: Icon(Icons.person_outline),
                        ),
                      ),
                      const SizedBox(height: 12),
                      TextField(
                        controller: emailCtrl,
                        keyboardType: TextInputType.emailAddress,
                        decoration: const InputDecoration(
                          labelText: 'Email Address *',
                          prefixIcon: Icon(Icons.email_outlined),
                        ),
                      ),
                      const SizedBox(height: 12),
                      TextField(
                        controller: passwordCtrl,
                        obscureText: true,
                        decoration: const InputDecoration(
                          labelText: 'Initial Password *',
                          prefixIcon: Icon(Icons.lock_outline),
                        ),
                      ),
                      const SizedBox(height: 12),
                      TextField(
                        controller: codeCtrl,
                        decoration: const InputDecoration(
                          labelText: 'Teacher Code',
                          prefixIcon: Icon(Icons.badge_outlined),
                        ),
                      ),
                      const SizedBox(height: 16),
                      const Align(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          'Initial Subject Assignment:',
                          style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          Expanded(
                            child: DropdownButtonFormField<String>(
                              initialValue: selectedClass,
                              items: const [
                                DropdownMenuItem(value: 'Class 11', child: Text('Class 11')),
                                DropdownMenuItem(value: 'Class 12', child: Text('Class 12')),
                              ],
                              onChanged: (v) => setDialogState(() => selectedClass = v ?? 'Class 11'),
                              decoration: const InputDecoration(labelText: 'Class'),
                            ),
                          ),
                          const SizedBox(width: 8),
                          Expanded(
                            child: DropdownButtonFormField<String>(
                              initialValue: selectedSubject,
                              items: const [
                                DropdownMenuItem(value: 'Physics', child: Text('Physics')),
                                DropdownMenuItem(value: 'Chemistry', child: Text('Chemistry')),
                                DropdownMenuItem(value: 'Biology', child: Text('Biology')),
                              ],
                              onChanged: (v) => setDialogState(() => selectedSubject = v ?? 'Physics'),
                              decoration: const InputDecoration(labelText: 'Subject'),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              actions: [
                TextButton(
                  onPressed: busy ? null : () => Navigator.of(ctx).pop(),
                  child: const Text('Cancel'),
                ),
                FilledButton(
                  onPressed: busy
                      ? null
                      : () async {
                          if (nameCtrl.text.trim().isEmpty ||
                              emailCtrl.text.trim().isEmpty ||
                              passwordCtrl.text.trim().isEmpty) {
                            setDialogState(() => dialogError = 'Please fill all required fields');
                            return;
                          }
                          setDialogState(() {
                            busy = true;
                            dialogError = null;
                          });
                          try {
                            await AdminCommunityService.createTeacher(
                              email: emailCtrl.text.trim(),
                              password: passwordCtrl.text.trim(),
                              displayName: nameCtrl.text.trim(),
                              teacherCode: codeCtrl.text.trim(),
                              assignments: [
                                {'classLevel': selectedClass, 'subject': selectedSubject}
                              ],
                            );
                            if (ctx.mounted) Navigator.of(ctx).pop();
                            _loadTeachers();
                            if (mounted) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text('Faculty teacher "${nameCtrl.text.trim()}" created successfully!'),
                                  backgroundColor: Colors.green,
                                ),
                              );
                            }
                          } catch (e) {
                            setDialogState(() {
                              busy = false;
                              dialogError = e.toString().replaceFirst('Exception: ', '');
                            });
                          }
                        },
                  child: busy
                      ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2))
                      : const Text('Create Teacher'),
                ),
              ],
            );
          },
        );
      },
    );
  }

  Future<void> _showAddAssignmentDialog(int teacherId, String teacherName) async {
    String selectedClass = 'Class 11';
    String selectedSubject = 'Physics';
    bool busy = false;

    await showDialog(
      context: context,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (ctx, setDialogState) {
            return AlertDialog(
              title: Text('Assign Subject to $teacherName'),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  DropdownButtonFormField<String>(
                    initialValue: selectedClass,
                    items: const [
                      DropdownMenuItem(value: 'Class 11', child: Text('Class 11')),
                      DropdownMenuItem(value: 'Class 12', child: Text('Class 12')),
                    ],
                    onChanged: (v) => setDialogState(() => selectedClass = v ?? 'Class 11'),
                    decoration: const InputDecoration(labelText: 'Class'),
                  ),
                  const SizedBox(height: 12),
                  DropdownButtonFormField<String>(
                    initialValue: selectedSubject,
                    items: const [
                      DropdownMenuItem(value: 'Physics', child: Text('Physics')),
                      DropdownMenuItem(value: 'Chemistry', child: Text('Chemistry')),
                      DropdownMenuItem(value: 'Biology', child: Text('Biology')),
                    ],
                    onChanged: (v) => setDialogState(() => selectedSubject = v ?? 'Physics'),
                    decoration: const InputDecoration(labelText: 'Subject'),
                  ),
                ],
              ),
              actions: [
                TextButton(
                  onPressed: busy ? null : () => Navigator.of(ctx).pop(),
                  child: const Text('Cancel'),
                ),
                FilledButton(
                  onPressed: busy
                      ? null
                      : () async {
                          setDialogState(() => busy = true);
                          try {
                            await AdminCommunityService.addTeacherAssignment(
                              teacherId,
                              classLevel: selectedClass,
                              subject: selectedSubject,
                            );
                            if (ctx.mounted) Navigator.of(ctx).pop();
                            _loadTeachers();
                          } catch (e) {
                            setDialogState(() => busy = false);
                            if (ctx.mounted) {
                              ScaffoldMessenger.of(ctx).showSnackBar(
                                SnackBar(content: Text(e.toString()), backgroundColor: Colors.red),
                              );
                            }
                          }
                        },
                  child: busy
                      ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2))
                      : const Text('Add Assignment'),
                ),
              ],
            );
          },
        );
      },
    );
  }

  Future<void> _showPerformanceDialog(int teacherId, String teacherName) async {
    showDialog(
      context: context,
      builder: (ctx) {
        return FutureBuilder<Map<String, dynamic>>(
          future: AdminCommunityService.getTeacherPerformance(teacherId),
          builder: (ctx, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const AlertDialog(
                content: SizedBox(
                  height: 100,
                  child: Center(child: CircularProgressIndicator()),
                ),
              );
            }
            if (snapshot.hasError || snapshot.data == null) {
              return AlertDialog(
                title: Text('$teacherName Performance'),
                content: Text('Error: ${snapshot.error}'),
                actions: [
                  TextButton(onPressed: () => Navigator.of(ctx).pop(), child: const Text('Close')),
                ],
              );
            }

            final perf = snapshot.data!['performance'] as Map<String, dynamic>? ?? {};
            return AlertDialog(
              title: Row(
                children: [
                  const Icon(Icons.analytics_outlined, color: Color(0xFF002350)),
                  const SizedBox(width: 8),
                  Text('$teacherName Workload'),
                ],
              ),
              content: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 380),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    _perfRow('Assigned Doubts', '${perf['assignedCount'] ?? 0}'),
                    _perfRow('Answered Doubts', '${perf['answeredCount'] ?? 0}'),
                    _perfRow('Resolved Doubts', '${perf['resolvedCount'] ?? 0}'),
                    _perfRow('Reopened Doubts', '${perf['reopenedCount'] ?? 0}'),
                    const Divider(height: 24),
                    _perfRow(
                      'Avg First-Response Time',
                      perf['avgFirstResponseMinutes'] != null
                          ? '${perf['avgFirstResponseMinutes']} mins'
                          : 'N/A',
                    ),
                    _perfRow(
                      'Avg Resolution Time',
                      perf['avgResolutionHours'] != null
                          ? '${perf['avgResolutionHours']} hrs'
                          : 'N/A',
                    ),
                  ],
                ),
              ),
              actions: [
                TextButton(onPressed: () => Navigator.of(ctx).pop(), child: const Text('Close')),
              ],
            );
          },
        );
      },
    );
  }

  Widget _perfRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 13, color: Colors.grey)),
          Text(value, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700)),
        ],
      ),
    );
  }

  Future<void> _toggleTeacherActive(int teacherId, bool currentStatus) async {
    try {
      await AdminCommunityService.updateTeacher(teacherId, isActive: !currentStatus);
      _loadTeachers();
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to update status: $e'), backgroundColor: Colors.red),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _showCreateTeacherDialog,
        icon: const Icon(Icons.person_add_alt_1),
        label: const Text('Add Teacher', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF002350),
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            LayoutBuilder(
              builder: (context, constraints) {
                final isCompact = constraints.maxWidth < 650;
                if (isCompact) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Expanded(
                            child: Text(
                              'Teacher & Faculty Management',
                              style: TextStyle(fontSize: 19, fontWeight: FontWeight.bold),
                            ),
                          ),
                          IconButton.filledTonal(
                            icon: const Icon(Icons.refresh),
                            tooltip: 'Refresh',
                            onPressed: _loadTeachers,
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Manage subject teachers, assign classes, and monitor doubt workload',
                        style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                      ),
                      const SizedBox(height: 12),
                      SizedBox(
                        width: double.infinity,
                        child: FilledButton.icon(
                          icon: const Icon(Icons.person_add_alt_1),
                          label: const Text('Add Faculty Teacher'),
                          style: FilledButton.styleFrom(
                            backgroundColor: const Color(0xFF002350),
                            padding: const EdgeInsets.symmetric(vertical: 12),
                          ),
                          onPressed: _showCreateTeacherDialog,
                        ),
                      ),
                    ],
                  );
                }
                return Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Teacher & Faculty Management',
                            style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Manage subject teachers, assign classes, and monitor doubt workload',
                            style: TextStyle(fontSize: 13, color: Colors.grey.shade600),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    Row(
                      children: [
                        IconButton(
                          icon: const Icon(Icons.refresh),
                          tooltip: 'Refresh',
                          onPressed: _loadTeachers,
                        ),
                        const SizedBox(width: 8),
                        FilledButton.icon(
                          icon: const Icon(Icons.person_add_alt_1),
                          label: const Text('Add Faculty Teacher'),
                          style: FilledButton.styleFrom(
                            backgroundColor: const Color(0xFF002350),
                          ),
                          onPressed: _showCreateTeacherDialog,
                        ),
                      ],
                    ),
                  ],
                );
              },
            ),
            const SizedBox(height: 16),
            if (_error.isNotEmpty)
              Container(
                padding: const EdgeInsets.all(12),
                margin: const EdgeInsets.only(bottom: 16),
                decoration: BoxDecoration(
                  color: Colors.red.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(_error, style: const TextStyle(color: Colors.red)),
              ),
            Expanded(
              child: _loading
                  ? const Center(child: CircularProgressIndicator())
                  : _teachers.isEmpty
                      ? Center(
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Icon(Icons.school_outlined, size: 48, color: Colors.grey),
                              const SizedBox(height: 12),
                              const Text('No teachers created yet'),
                              const SizedBox(height: 12),
                              FilledButton.icon(
                                icon: const Icon(Icons.person_add_alt_1),
                                onPressed: _showCreateTeacherDialog,
                                label: const Text('Create First Teacher'),
                                style: FilledButton.styleFrom(
                                  backgroundColor: const Color(0xFF002350),
                                ),
                              ),
                            ],
                          ),
                        )
                      : ListView.separated(
                          itemCount: _teachers.length + 1,
                          separatorBuilder: (_, index) => const SizedBox(height: 12),
                          itemBuilder: (ctx, i) {
                            if (i == _teachers.length) {
                              return Padding(
                                padding: const EdgeInsets.only(top: 8, bottom: 84),
                                child: Center(
                                  child: OutlinedButton.icon(
                                    style: OutlinedButton.styleFrom(
                                      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                                    ),
                                    icon: const Icon(Icons.person_add_alt_1),
                                    label: const Text('Add Another Faculty Teacher'),
                                    onPressed: _showCreateTeacherDialog,
                                  ),
                                ),
                              );
                            }
                            final teacher = _teachers[i];
                            final id = teacher['id'] as int;
                            final name = teacher['display_name'] ?? 'Teacher';
                            final email = teacher['email'] ?? '';
                            final code = teacher['teacher_code'] ?? '—';
                            final isActive = teacher['is_active'] == true;
                            final assignments = teacher['assignments'] as List? ?? [];

                            return Card(
                              elevation: 0,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                                side: BorderSide(color: Colors.grey.withValues(alpha: 0.2)),
                              ),
                              child: Padding(
                                padding: const EdgeInsets.all(16),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        CircleAvatar(
                                          backgroundColor: const Color(0xFF002350),
                                          foregroundColor: Colors.white,
                                          child: Text(name.isNotEmpty ? name[0].toUpperCase() : 'T'),
                                        ),
                                        const SizedBox(width: 12),
                                        Expanded(
                                          child: Column(
                                            crossAxisAlignment: CrossAxisAlignment.start,
                                            children: [
                                              Row(
                                                children: [
                                                  Text(
                                                    name,
                                                    style: const TextStyle(
                                                      fontWeight: FontWeight.bold,
                                                      fontSize: 16,
                                                    ),
                                                  ),
                                                  const SizedBox(width: 8),
                                                  Container(
                                                    padding: const EdgeInsets.symmetric(
                                                      horizontal: 8,
                                                      vertical: 2,
                                                    ),
                                                    decoration: BoxDecoration(
                                                      color: isActive
                                                          ? Colors.green.withValues(alpha: 0.15)
                                                          : Colors.red.withValues(alpha: 0.15),
                                                      borderRadius: BorderRadius.circular(4),
                                                    ),
                                                    child: Text(
                                                      isActive ? 'ACTIVE' : 'INACTIVE',
                                                      style: TextStyle(
                                                        fontSize: 11,
                                                        fontWeight: FontWeight.w700,
                                                        color: isActive ? Colors.green : Colors.red,
                                                      ),
                                                    ),
                                                  ),
                                                ],
                                              ),
                                              const SizedBox(height: 2),
                                              Text(
                                                '$email • Code: $code',
                                                style: TextStyle(
                                                  fontSize: 12,
                                                  color: Colors.grey.shade600,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                        IconButton(
                                          icon: const Icon(Icons.analytics_outlined),
                                          tooltip: 'View Performance',
                                          onPressed: () => _showPerformanceDialog(id, name),
                                        ),
                                        IconButton(
                                          icon: Icon(
                                            isActive ? Icons.block : Icons.check_circle_outline,
                                            color: isActive ? Colors.red : Colors.green,
                                          ),
                                          tooltip: isActive ? 'Deactivate' : 'Activate',
                                          onPressed: () => _toggleTeacherActive(id, isActive),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 12),
                                    const Divider(height: 1),
                                    const SizedBox(height: 8),
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        const Text(
                                          'Assigned Classes & Subjects:',
                                          style: TextStyle(
                                            fontSize: 12,
                                            fontWeight: FontWeight.w600,
                                            color: Colors.grey,
                                          ),
                                        ),
                                        TextButton.icon(
                                          style: TextButton.styleFrom(visualDensity: VisualDensity.compact),
                                          icon: const Icon(Icons.add, size: 16),
                                          label: const Text('Assign Subject', style: TextStyle(fontSize: 12)),
                                          onPressed: () => _showAddAssignmentDialog(id, name),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 6),
                                    if (assignments.isEmpty)
                                      const Text(
                                        'No subjects assigned yet.',
                                        style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic, color: Colors.grey),
                                      )
                                    else
                                      Wrap(
                                        spacing: 8,
                                        runSpacing: 6,
                                        children: assignments.map((asgn) {
                                          final asgnId = asgn['id'] as int;
                                          final cl = asgn['class_level'] ?? '';
                                          final sb = asgn['subject'] ?? '';
                                          return Chip(
                                            label: Text('$cl — $sb', style: const TextStyle(fontSize: 12)),
                                            deleteIcon: const Icon(Icons.close, size: 14),
                                            onDeleted: () async {
                                              try {
                                                await AdminCommunityService.removeTeacherAssignment(id, asgnId);
                                                _loadTeachers();
                                              } catch (e) {
                                                if (context.mounted) {
                                                  ScaffoldMessenger.of(context).showSnackBar(
                                                    SnackBar(content: Text('Failed: $e'), backgroundColor: Colors.red),
                                                  );
                                                }
                                              }
                                            },
                                          );
                                        }).toList(),
                                      ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
            ),
          ],
        ),
      ),
    );
  }
}
