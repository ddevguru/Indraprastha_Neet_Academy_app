import 'package:flutter/material.dart';
import '../models/teacher_models.dart';
import '../services/teacher_api_service.dart';
import 'teacher_doubt_detail_screen.dart';

class TeacherDoubtQueueScreen extends StatefulWidget {
  const TeacherDoubtQueueScreen({super.key});

  @override
  State<TeacherDoubtQueueScreen> createState() => _TeacherDoubtQueueScreenState();
}

class _TeacherDoubtQueueScreenState extends State<TeacherDoubtQueueScreen> {
  bool _loading = true;
  String _error = '';
  List<TeacherDoubtItem> _doubts = [];

  String _statusFilter = '';
  String _classFilter = '';
  String _subjectFilter = '';
  final _searchCtrl = TextEditingController();
  int? _actionInProgressId;

  @override
  void initState() {
    super.initState();
    _fetchDoubts();
  }

  Future<void> _fetchDoubts() async {
    setState(() {
      _loading = true;
      _error = '';
    });
    try {
      final list = await TeacherApiService.getDoubts(
        status: _statusFilter,
        classLevel: _classFilter,
        subject: _subjectFilter,
        search: _searchCtrl.text.trim(),
      );
      if (!mounted) return;
      setState(() {
        _doubts = list;
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

  Future<void> _claimDoubt(int doubtId) async {
    setState(() => _actionInProgressId = doubtId);
    try {
      await TeacherApiService.claimDoubt(doubtId);
      await _fetchDoubts();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('✓ Doubt claimed successfully')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to claim: $e'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) setState(() => _actionInProgressId = null);
    }
  }

  Future<void> _startSolving(int doubtId) async {
    setState(() => _actionInProgressId = doubtId);
    try {
      await TeacherApiService.startSolvingDoubt(doubtId);
      await _fetchDoubts();
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to start: $e'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) setState(() => _actionInProgressId = null);
    }
  }

  Color _getStatusColor(String status) {
    switch (status.toLowerCase()) {
      case 'pending':
        return const Color(0xFFD2AE39);
      case 'assigned':
        return Colors.indigo;
      case 'in_progress':
        return Colors.blue;
      case 'answered':
        return Colors.teal;
      case 'resolved':
        return const Color(0xFF2E8B57);
      case 'reopened':
        return const Color(0xFFD92D20);
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF11131A) : const Color(0xFFF5F7FA),
      appBar: AppBar(
        backgroundColor: const Color(0xFF002350),
        foregroundColor: Colors.white,
        title: const Text('Subject Doubts Queue', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Refresh',
            onPressed: _fetchDoubts,
          ),
        ],
      ),
      body: Column(
        children: [
          // Filter Header Card
          Container(
            padding: const EdgeInsets.all(12),
            color: isDark ? const Color(0xFF171A22) : Colors.white,
            child: Column(
              children: [
                TextField(
                  controller: _searchCtrl,
                  style: TextStyle(color: isDark ? Colors.white : Colors.black87),
                  onSubmitted: (_) => _fetchDoubts(),
                  decoration: InputDecoration(
                    hintText: 'Search doubt title or ID...',
                    hintStyle: TextStyle(color: isDark ? Colors.white38 : Colors.grey),
                    prefixIcon: Icon(Icons.search, size: 20, color: isDark ? Colors.white54 : Colors.grey),
                    suffixIcon: IconButton(
                      icon: Icon(Icons.arrow_forward, size: 18, color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350)),
                      onPressed: _fetchDoubts,
                    ),
                    contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    isDense: true,
                    filled: isDark,
                    fillColor: isDark ? const Color(0xFF1E222D) : Colors.white,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: BorderSide(color: isDark ? const Color(0xFF2E3545) : Colors.grey.shade300),
                    ),
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        initialValue: _statusFilter,
                        dropdownColor: isDark ? const Color(0xFF1E222D) : Colors.white,
                        style: TextStyle(color: isDark ? Colors.white : Colors.black87, fontSize: 12),
                        items: const [
                          DropdownMenuItem(value: '', child: Text('All Statuses')),
                          DropdownMenuItem(value: 'pending', child: Text('Pending')),
                          DropdownMenuItem(value: 'assigned', child: Text('Assigned')),
                          DropdownMenuItem(value: 'in_progress', child: Text('In Progress')),
                          DropdownMenuItem(value: 'answered', child: Text('Answered')),
                          DropdownMenuItem(value: 'resolved', child: Text('Resolved')),
                          DropdownMenuItem(value: 'reopened', child: Text('Reopened')),
                        ],
                        onChanged: (v) {
                          _statusFilter = v ?? '';
                          _fetchDoubts();
                        },
                        decoration: InputDecoration(
                          labelText: 'Status',
                          labelStyle: TextStyle(color: isDark ? Colors.white70 : null),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          isDense: true,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        initialValue: _classFilter,
                        dropdownColor: isDark ? const Color(0xFF1E222D) : Colors.white,
                        style: TextStyle(color: isDark ? Colors.white : Colors.black87, fontSize: 12),
                        items: const [
                          DropdownMenuItem(value: '', child: Text('All Classes')),
                          DropdownMenuItem(value: 'Class 11', child: Text('Class 11')),
                          DropdownMenuItem(value: 'Class 12', child: Text('Class 12')),
                        ],
                        onChanged: (v) {
                          _classFilter = v ?? '';
                          _fetchDoubts();
                        },
                        decoration: InputDecoration(
                          labelText: 'Class',
                          labelStyle: TextStyle(color: isDark ? Colors.white70 : null),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          isDense: true,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        initialValue: _subjectFilter,
                        dropdownColor: isDark ? const Color(0xFF1E222D) : Colors.white,
                        style: TextStyle(color: isDark ? Colors.white : Colors.black87, fontSize: 12),
                        items: const [
                          DropdownMenuItem(value: '', child: Text('All Subjects')),
                          DropdownMenuItem(value: 'Physics', child: Text('Physics')),
                          DropdownMenuItem(value: 'Chemistry', child: Text('Chemistry')),
                          DropdownMenuItem(value: 'Biology', child: Text('Biology')),
                        ],
                        onChanged: (v) {
                          _subjectFilter = v ?? '';
                          _fetchDoubts();
                        },
                        decoration: InputDecoration(
                          labelText: 'Subject',
                          labelStyle: TextStyle(color: isDark ? Colors.white70 : null),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          isDense: true,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),

          if (_error.isNotEmpty)
            Container(
              padding: const EdgeInsets.all(10),
              margin: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.red.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(_error, style: const TextStyle(color: Colors.red, fontSize: 12)),
            ),

          // Doubts List
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator())
                : _doubts.isEmpty
                    ? Center(
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.inbox_outlined, size: 48, color: Colors.grey),
                            const SizedBox(height: 12),
                            const Text(
                              'No doubts found',
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              'No doubts match the current filters.',
                              style: TextStyle(fontSize: 12, color: isDark ? Colors.grey.shade400 : Colors.grey.shade600),
                            ),
                          ],
                        ),
                      )
                    : ListView.separated(
                        padding: const EdgeInsets.all(12),
                        itemCount: _doubts.length,
                        separatorBuilder: (_, index) => const SizedBox(height: 8),
                        itemBuilder: (ctx, i) {
                          final doubt = _doubts[i];
                          final isBusy = _actionInProgressId == doubt.id;
                          final isPending = doubt.status == 'pending';
                          final isAssigned = doubt.status == 'assigned';

                          return Card(
                            elevation: 0,
                            color: isDark ? const Color(0xFF1E222D) : Colors.white,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                              side: BorderSide(color: isDark ? const Color(0xFF2E3545) : Colors.grey.withValues(alpha: 0.2)),
                            ),
                            child: InkWell(
                              borderRadius: BorderRadius.circular(12),
                              onTap: () async {
                                await Navigator.of(context).push(
                                  MaterialPageRoute(
                                    builder: (_) => TeacherDoubtDetailScreen(doubtId: doubt.id),
                                  ),
                                );
                                _fetchDoubts();
                              },
                              child: Padding(
                                padding: const EdgeInsets.all(14),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        Text(
                                          '#${doubt.id}',
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
                                            fontSize: 14,
                                          ),
                                        ),
                                        const SizedBox(width: 8),
                                        Container(
                                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                          decoration: BoxDecoration(
                                            color: (isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350)).withValues(alpha: 0.12),
                                            borderRadius: BorderRadius.circular(4),
                                          ),
                                          child: Text(
                                            '${doubt.classLevel} • ${doubt.subject}',
                                            style: TextStyle(
                                              fontSize: 11,
                                              fontWeight: FontWeight.w600,
                                              color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
                                            ),
                                          ),
                                        ),
                                        const Spacer(),
                                        Container(
                                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                          decoration: BoxDecoration(
                                            color: _getStatusColor(doubt.status).withValues(alpha: 0.15),
                                            borderRadius: BorderRadius.circular(4),
                                          ),
                                          child: Text(
                                            doubt.status.toUpperCase(),
                                            style: TextStyle(
                                              color: _getStatusColor(doubt.status),
                                              fontWeight: FontWeight.bold,
                                              fontSize: 10,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 8),
                                    Text(
                                      doubt.title,
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 15,
                                        color: isDark ? Colors.white : Colors.black87,
                                      ),
                                    ),
                                    if (doubt.description?.isNotEmpty == true) ...[
                                      const SizedBox(height: 4),
                                      Text(
                                        doubt.description!,
                                        maxLines: 2,
                                        overflow: TextOverflow.ellipsis,
                                        style: TextStyle(
                                          fontSize: 13,
                                          color: isDark ? Colors.grey.shade300 : Colors.grey.shade700,
                                        ),
                                      ),
                                    ],
                                    const SizedBox(height: 10),
                                    Row(
                                      children: [
                                        Container(
                                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                          decoration: BoxDecoration(
                                            color: isDark ? const Color(0xFF2E3545) : Colors.grey.shade100,
                                            borderRadius: BorderRadius.circular(4),
                                          ),
                                          child: Text(
                                            'Doubt Query',
                                            style: TextStyle(fontSize: 11, color: isDark ? Colors.grey.shade400 : Colors.grey.shade600),
                                          ),
                                        ),
                                        if (doubt.attachments.isNotEmpty) ...[
                                          const SizedBox(width: 8),
                                          Icon(Icons.attach_file, size: 14, color: isDark ? Colors.grey.shade400 : Colors.grey.shade600),
                                          Text(
                                            '${doubt.attachments.length}',
                                            style: TextStyle(fontSize: 12, color: isDark ? Colors.grey.shade400 : Colors.grey.shade600),
                                          ),
                                        ],
                                        const Spacer(),
                                        if (isPending)
                                          FilledButton(
                                            style: FilledButton.styleFrom(
                                              backgroundColor: const Color(0xFF002350),
                                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                                              visualDensity: VisualDensity.compact,
                                            ),
                                            onPressed: isBusy ? null : () => _claimDoubt(doubt.id),
                                            child: isBusy
                                                ? const SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                                                : const Text('Claim Doubt', style: TextStyle(fontSize: 12)),
                                          ),
                                        if (isAssigned)
                                          FilledButton(
                                            style: FilledButton.styleFrom(
                                              backgroundColor: Colors.indigo,
                                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                                              visualDensity: VisualDensity.compact,
                                            ),
                                            onPressed: isBusy ? null : () => _startSolving(doubt.id),
                                            child: isBusy
                                                ? const SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                                                : const Text('Start Solving', style: TextStyle(fontSize: 12)),
                                          ),
                                      ],
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
      ),
    );
  }
}
