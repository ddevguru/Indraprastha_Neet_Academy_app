import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../services/admin_community_service.dart';

class DoubtMonitoringPage extends StatefulWidget {
  const DoubtMonitoringPage({super.key});

  @override
  State<DoubtMonitoringPage> createState() => _DoubtMonitoringPageState();
}

class _DoubtMonitoringPageState extends State<DoubtMonitoringPage> {
  bool _loading = true;
  String _error = '';
  List<Map<String, dynamic>> _doubts = [];
  Map<String, dynamic> _analytics = {};

  String _statusFilter = '';
  String _classFilter = '';
  String _subjectFilter = '';
  final _searchCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    setState(() {
      _loading = true;
      _error = '';
    });
    try {
      final results = await Future.wait([
        AdminCommunityService.getDoubts(
          status: _statusFilter,
          classLevel: _classFilter,
          subject: _subjectFilter,
          search: _searchCtrl.text.trim(),
        ),
        AdminCommunityService.getDoubtsAnalytics(),
      ]);

      if (!mounted) return;
      final doubtsData = results[0];
      final analyticsData = results[1];

      final list = doubtsData['doubts'] as List? ?? [];
      setState(() {
        _doubts = list.map((e) => Map<String, dynamic>.from(e as Map)).toList();
        _analytics = analyticsData['metrics'] as Map<String, dynamic>? ?? {};
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

  Future<void> _exportCsv() async {
    final url = AdminCommunityService.getCsvReportUrl(
      status: _statusFilter,
      classLevel: _classFilter,
      subject: _subjectFilter,
    );
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    } else {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Could not open CSV export URL')),
        );
      }
    }
  }

  void _showDoubtDetail(int doubtId) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => _DoubtDetailSheet(doubtId: doubtId),
    );
  }

  Widget _buildMetricCard(String label, String value, IconData icon, Color color) {
    return Expanded(
      child: Card(
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
          side: BorderSide(color: Colors.grey.withValues(alpha: 0.2)),
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: color.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(icon, color: color, size: 22),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(label, style: const TextStyle(fontSize: 11, color: Colors.grey)),
                    const SizedBox(height: 2),
                    Text(value, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status.toLowerCase()) {
      case 'pending':
        return Colors.amber.shade800;
      case 'assigned':
        return Colors.indigo;
      case 'in_progress':
        return Colors.blue;
      case 'answered':
        return Colors.teal;
      case 'resolved':
        return Colors.green;
      case 'reopened':
        return Colors.deepOrange;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Doubt Tracking & Resolution Monitoring',
                      style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Monitor student doubt resolution lifecycle, handling faculty, and audit trails',
                      style: TextStyle(fontSize: 13, color: Colors.grey.shade600),
                    ),
                  ],
                ),
                Row(
                  children: [
                    OutlinedButton.icon(
                      icon: const Icon(Icons.file_download_outlined, size: 18),
                      label: const Text('Export CSV'),
                      onPressed: _exportCsv,
                    ),
                    const SizedBox(width: 8),
                    IconButton(
                      icon: const Icon(Icons.refresh),
                      tooltip: 'Refresh',
                      onPressed: _fetchData,
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Analytics KPI Bar
            Row(
              children: [
                _buildMetricCard('Total Submitted', '${_analytics['total_doubts'] ?? 0}', Icons.quiz_outlined, Colors.blue),
                const SizedBox(width: 10),
                _buildMetricCard('Pending', '${_analytics['pending_doubts'] ?? 0}', Icons.hourglass_empty, Colors.amber.shade800),
                const SizedBox(width: 10),
                _buildMetricCard('Resolved', '${_analytics['resolved_doubts'] ?? 0}', Icons.check_circle_outline, Colors.green),
                const SizedBox(width: 10),
                _buildMetricCard('Reopened', '${_analytics['reopened_doubts'] ?? 0}', Icons.replay, Colors.deepOrange),
                const SizedBox(width: 10),
                _buildMetricCard(
                  'Avg Resolution',
                  _analytics['avg_resolution_hours'] != null
                      ? '${_analytics['avg_resolution_hours']}h'
                      : 'N/A',
                  Icons.timer_outlined,
                  Colors.purple,
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Filters row
            Card(
              elevation: 0,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
                side: BorderSide(color: Colors.grey.withValues(alpha: 0.2)),
              ),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                child: Row(
                  children: [
                    Expanded(
                      flex: 2,
                      child: TextField(
                        controller: _searchCtrl,
                        onSubmitted: (_) => _fetchData(),
                        decoration: InputDecoration(
                          hintText: 'Search Doubt ID, Student Name, Question...',
                          prefixIcon: const Icon(Icons.search, size: 18),
                          suffixIcon: IconButton(
                            icon: const Icon(Icons.arrow_forward, size: 16),
                            onPressed: _fetchData,
                          ),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          isDense: true,
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        initialValue: _statusFilter,
                        items: const [
                          DropdownMenuItem(value: '', child: Text('All Statuses')),
                          DropdownMenuItem(value: 'pending', child: Text('Pending')),
                          DropdownMenuItem(value: 'assigned', child: Text('Assigned')),
                          DropdownMenuItem(value: 'in_progress', child: Text('In Progress')),
                          DropdownMenuItem(value: 'answered', child: Text('Answered')),
                          DropdownMenuItem(value: 'reopened', child: Text('Reopened')),
                          DropdownMenuItem(value: 'resolved', child: Text('Resolved')),
                        ],
                        onChanged: (v) {
                          _statusFilter = v ?? '';
                          _fetchData();
                        },
                        decoration: const InputDecoration(
                          labelText: 'Status',
                          contentPadding: EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          isDense: true,
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        initialValue: _classFilter,
                        items: const [
                          DropdownMenuItem(value: '', child: Text('All Classes')),
                          DropdownMenuItem(value: 'Class 11', child: Text('Class 11')),
                          DropdownMenuItem(value: 'Class 12', child: Text('Class 12')),
                        ],
                        onChanged: (v) {
                          _classFilter = v ?? '';
                          _fetchData();
                        },
                        decoration: const InputDecoration(
                          labelText: 'Class',
                          contentPadding: EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          isDense: true,
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        initialValue: _subjectFilter,
                        items: const [
                          DropdownMenuItem(value: '', child: Text('All Subjects')),
                          DropdownMenuItem(value: 'Physics', child: Text('Physics')),
                          DropdownMenuItem(value: 'Chemistry', child: Text('Chemistry')),
                          DropdownMenuItem(value: 'Biology', child: Text('Biology')),
                        ],
                        onChanged: (v) {
                          _subjectFilter = v ?? '';
                          _fetchData();
                        },
                        decoration: const InputDecoration(
                          labelText: 'Subject',
                          contentPadding: EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          isDense: true,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 14),

            if (_error.isNotEmpty)
              Container(
                padding: const EdgeInsets.all(12),
                margin: const EdgeInsets.only(bottom: 12),
                decoration: BoxDecoration(
                  color: Colors.red.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(_error, style: const TextStyle(color: Colors.red)),
              ),

            // Table of Doubts
            Expanded(
              child: _loading
                  ? const Center(child: CircularProgressIndicator())
                  : _doubts.isEmpty
                      ? const Center(
                          child: Text(
                            'No submitted doubts match your criteria.',
                            style: TextStyle(color: Colors.grey),
                          ),
                        )
                      : Card(
                          elevation: 0,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                            side: BorderSide(color: Colors.grey.withValues(alpha: 0.2)),
                          ),
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(12),
                            child: ListView.separated(
                              itemCount: _doubts.length,
                              separatorBuilder: (_, index) => const Divider(height: 1),
                              itemBuilder: (ctx, i) {
                                final d = _doubts[i];
                                final id = d['id'] as int;
                                final title = d['title'] ?? 'Doubt';
                                final studentName = d['student_name'] ?? 'Student';
                                final cl = d['class_level'] ?? '';
                                final sb = d['subject'] ?? '';
                                final status = d['status'] ?? 'pending';
                                final teacherName = d['assigned_teacher_name'];
                                final handlingTeacher = d['handling_teacher_name'] ?? teacherName;
                                final reopenCount = d['reopen_count'] ?? 0;
                                final createdAt = d['created_at'];

                                return ListTile(
                                  onTap: () => _showDoubtDetail(id),
                                  title: Row(
                                    children: [
                                      Text(
                                        '#$id',
                                        style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF002350)),
                                      ),
                                      const SizedBox(width: 8),
                                      Expanded(
                                        child: Text(
                                          title,
                                          maxLines: 1,
                                          overflow: TextOverflow.ellipsis,
                                          style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
                                        ),
                                      ),
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                        decoration: BoxDecoration(
                                          color: _getStatusColor(status).withValues(alpha: 0.15),
                                          borderRadius: BorderRadius.circular(4),
                                        ),
                                        child: Text(
                                          status.toString().toUpperCase(),
                                          style: TextStyle(
                                            color: _getStatusColor(status),
                                            fontWeight: FontWeight.bold,
                                            fontSize: 11,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  subtitle: Padding(
                                    padding: const EdgeInsets.only(top: 4),
                                    child: Row(
                                      children: [
                                        Text('By $studentName', style: const TextStyle(fontSize: 12)),
                                        const SizedBox(width: 12),
                                        Text('$cl • $sb', style: TextStyle(fontSize: 12, color: Colors.grey.shade600)),
                                        const SizedBox(width: 12),
                                        Text(
                                          handlingTeacher != null
                                              ? 'Faculty: $handlingTeacher'
                                              : 'Faculty: Unassigned',
                                          style: TextStyle(
                                            fontSize: 12,
                                            fontWeight: FontWeight.w500,
                                            color: handlingTeacher != null ? Colors.indigo : Colors.grey,
                                          ),
                                        ),
                                        if (reopenCount > 0) ...[
                                          const SizedBox(width: 12),
                                          Container(
                                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                                            decoration: BoxDecoration(
                                              color: Colors.orange.withValues(alpha: 0.15),
                                              borderRadius: BorderRadius.circular(4),
                                            ),
                                            child: Text('Reopened $reopenCount×', style: const TextStyle(fontSize: 10, color: Colors.deepOrange)),
                                          ),
                                        ],
                                        const Spacer(),
                                        Text(
                                          createdAt != null ? createdAt.toString().split('T').first : '',
                                          style: const TextStyle(fontSize: 11, color: Colors.grey),
                                        ),
                                      ],
                                    ),
                                  ),
                                  trailing: const Icon(Icons.chevron_right, size: 20),
                                );
                              },
                            ),
                          ),
                        ),
            ),
          ],
        ),
      ),
    );
  }
}

class _DoubtDetailSheet extends StatelessWidget {
  final int doubtId;
  const _DoubtDetailSheet({required this.doubtId});

  @override
  Widget build(BuildContext context) {
    return DraggableScrollableSheet(
      initialChildSize: 0.85,
      minChildSize: 0.5,
      maxChildSize: 0.95,
      builder: (ctx, scrollController) {
        return Container(
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
          ),
          child: FutureBuilder<Map<String, dynamic>>(
            future: AdminCommunityService.getDoubtDetail(doubtId),
            builder: (ctx, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              }
              if (snapshot.hasError || snapshot.data == null) {
                return Center(child: Text('Error: ${snapshot.error}'));
              }

              final doubt = snapshot.data!['doubt'] as Map<String, dynamic>? ?? {};
              final activityTimeline = snapshot.data!['activityTimeline'] as List? ?? [];
              final responses = doubt['responses'] as List? ?? [];
              final attachments = doubt['attachments'] as List? ?? [];

              return ListView(
                controller: scrollController,
                padding: const EdgeInsets.all(24),
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Doubt #${doubt['id']}: ${doubt['title']}',
                            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            '${doubt['class_level']} • ${doubt['subject']} • Student: ${doubt['student_name'] ?? 'Student'}',
                            style: const TextStyle(fontSize: 13, color: Colors.grey),
                          ),
                        ],
                      ),
                      IconButton(
                        icon: const Icon(Icons.close),
                        onPressed: () => Navigator.of(ctx).pop(),
                      ),
                    ],
                  ),
                  const Divider(height: 24),

                  // Question text
                  const Text('Question Description:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                  const SizedBox(height: 6),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.grey.withValues(alpha: 0.08),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      doubt['description'] ?? 'No text description',
                      style: const TextStyle(fontSize: 13, height: 1.4),
                    ),
                  ),

                  // Submitted attachments
                  if (attachments.isNotEmpty) ...[
                    const SizedBox(height: 16),
                    Text('Submitted Media (${attachments.length}):', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                    const SizedBox(height: 6),
                    Wrap(
                      spacing: 8,
                      children: attachments.map((att) {
                        final link = att['drive_view_link'] ?? att['file_url'] ?? '';
                        final name = att['original_filename'] ?? 'Attachment';
                        return ActionChip(
                          avatar: const Icon(Icons.open_in_new, size: 14),
                          label: Text(name, style: const TextStyle(fontSize: 11)),
                          onPressed: () {
                            if (link.isNotEmpty) launchUrl(Uri.parse(link), mode: LaunchMode.externalApplication);
                          },
                        );
                      }).toList(),
                    ),
                  ],

                  // Faculty Handling & Responses
                  const SizedBox(height: 20),
                  const Text('Teacher Solutions & Responses:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  const SizedBox(height: 8),
                  if (responses.isEmpty)
                    const Text('No responses submitted yet by faculty.', style: TextStyle(color: Colors.grey, fontSize: 12))
                  else
                    ...responses.map((resp) {
                      final tName = resp['teacher_name'] ?? 'Teacher';
                      final text = resp['response_text'] ?? '';
                      final createdAt = resp['created_at'];
                      return Container(
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: const Color(0xFF002350).withValues(alpha: 0.04),
                          border: Border.all(color: const Color(0xFF002350).withValues(alpha: 0.15)),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('By $tName', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                                Text(createdAt?.toString() ?? '', style: const TextStyle(fontSize: 11, color: Colors.grey)),
                              ],
                            ),
                            const SizedBox(height: 6),
                            Text(text, style: const TextStyle(fontSize: 13, height: 1.4)),
                          ],
                        ),
                      );
                    }),

                  // Published Whiteboard
                  if (doubt['published_whiteboard'] != null) ...[
                    const SizedBox(height: 16),
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.teal.withValues(alpha: 0.08),
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: Colors.teal.withValues(alpha: 0.3)),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.draw_outlined, color: Colors.teal),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('Published Whiteboard Solution', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                                Text(
                                  'Version ${doubt['published_whiteboard']['version']} • Published at ${doubt['published_whiteboard']['published_at']}',
                                  style: const TextStyle(fontSize: 11, color: Colors.grey),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],

                  // Audit Activity Timeline
                  const SizedBox(height: 24),
                  const Text('Doubt Lifecycle Audit Trail:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  const SizedBox(height: 8),
                  if (activityTimeline.isEmpty)
                    const Text('No timeline events recorded.', style: TextStyle(color: Colors.grey, fontSize: 12))
                  else
                    ...activityTimeline.map((ev) {
                      final evType = ev['event_type'] ?? '';
                      final role = ev['actor_role'] ?? '';
                      final ts = ev['event_timestamp'] ?? '';
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 4),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('• ', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                            Expanded(
                              child: Text(
                                '$evType by $role ($ts)',
                                style: const TextStyle(fontSize: 12),
                              ),
                            ),
                          ],
                        ),
                      );
                    }),
                ],
              );
            },
          ),
        );
      },
    );
  }
}
