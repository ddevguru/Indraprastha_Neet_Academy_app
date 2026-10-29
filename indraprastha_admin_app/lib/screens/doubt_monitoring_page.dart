import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../services/admin_community_service.dart';
import '../widgets/fast_network_image.dart';
import '../utils/drive_image_url.dart';

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
        _analytics = (analyticsData['analytics'] ?? analyticsData['metrics']) as Map<String, dynamic>? ?? {};
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
    final width = MediaQuery.of(context).size.width;
    if (width > 700) {
      showDialog(
        context: context,
        barrierDismissible: true,
        builder: (ctx) => Dialog(
          backgroundColor: Colors.transparent,
          insetPadding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 860, maxHeight: 900),
            child: _DoubtDetailSheet(doubtId: doubtId, isDialog: true),
          ),
        ),
      );
    } else {
      showModalBottomSheet(
        context: context,
        isScrollControlled: true,
        backgroundColor: Colors.transparent,
        builder: (ctx) => _DoubtDetailSheet(doubtId: doubtId, isDialog: false),
      );
    }
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
                _buildMetricCard(
                  'Total Submitted',
                  '${_analytics['total_doubts'] ?? _analytics['totalSubmitted'] ?? 0}',
                  Icons.quiz_outlined,
                  Colors.blue,
                ),
                const SizedBox(width: 10),
                _buildMetricCard(
                  'Pending',
                  '${_analytics['pending_doubts'] ?? _analytics['pending'] ?? 0}',
                  Icons.hourglass_empty,
                  Colors.amber.shade800,
                ),
                const SizedBox(width: 10),
                _buildMetricCard(
                  'Resolved',
                  '${_analytics['resolved_doubts'] ?? _analytics['totalResolved'] ?? 0}',
                  Icons.check_circle_outline,
                  Colors.green,
                ),
                const SizedBox(width: 10),
                _buildMetricCard(
                  'Reopened',
                  '${_analytics['reopened_doubts'] ?? _analytics['reopened'] ?? 0}',
                  Icons.replay,
                  Colors.deepOrange,
                ),
                const SizedBox(width: 10),
                _buildMetricCard(
                  'Avg Resolution',
                  (_analytics['avg_resolution_hours'] ?? _analytics['avgResolutionHours']) != null
                      ? '${_analytics['avg_resolution_hours'] ?? _analytics['avgResolutionHours']}h'
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
                                final id = int.tryParse('${d['id'] ?? d['doubt_id']}') ?? 0;
                                final title = d['title'] ?? 'Doubt';
                                final studentName = d['student_name'] ?? 'Student';
                                final cl = d['class_level'] ?? '';
                                final sb = d['subject'] ?? '';
                                final status = d['status'] ?? 'pending';
                                final teacherName = d['assigned_teacher_name'];
                                final handlingTeacher = d['handling_teacher_name'] ?? teacherName;
                                final reopenCount = int.tryParse('${d['reopen_count']}') ?? 0;
                                final createdAt = d['created_at'] ?? d['submission_time'];

                                return ListTile(
                                  onTap: () => _showDoubtDetail(id),
                                  title: Row(
                                    children: [
                                      Text(
                                        '#$id',
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          color: Theme.of(context).colorScheme.primary,
                                        ),
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
                                        Text('$cl • $sb', style: TextStyle(fontSize: 12, color: Theme.of(context).brightness == Brightness.dark ? Colors.grey.shade400 : Colors.grey.shade600)),
                                        const SizedBox(width: 12),
                                        Text(
                                          handlingTeacher != null
                                              ? 'Faculty: $handlingTeacher'
                                              : 'Faculty: Unassigned',
                                          style: TextStyle(
                                            fontSize: 12,
                                            fontWeight: FontWeight.w500,
                                            color: handlingTeacher != null
                                                ? (Theme.of(context).brightness == Brightness.dark
                                                    ? Colors.indigoAccent
                                                    : Colors.indigo)
                                                : Colors.grey,
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
  final bool isDialog;
  const _DoubtDetailSheet({required this.doubtId, this.isDialog = false});

  static Color _getDoubtStatusColor(String status) {
    switch (status.toLowerCase().replaceAll(' ', '_')) {
      case 'pending':
        return const Color(0xFFF59E0B);
      case 'assigned':
        return const Color(0xFF6366F1);
      case 'in_progress':
        return const Color(0xFF0EA5E9);
      case 'answered':
        return const Color(0xFF10B981);
      case 'resolved':
        return const Color(0xFF22C55E);
      case 'reopened':
        return const Color(0xFFF97316);
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final surfaceColor = isDark ? const Color(0xFF171A22) : Colors.white;
    final borderColor = isDark ? const Color(0xFF313744) : const Color(0xFFE2E8F0);

    if (isDialog) {
      return Container(
        decoration: BoxDecoration(
          color: surfaceColor,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: borderColor),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: isDark ? 0.6 : 0.2),
              blurRadius: 30,
              offset: const Offset(0, 10),
            ),
          ],
        ),
        clipBehavior: Clip.antiAlias,
        child: _buildFuture(context, null),
      );
    }

    return DraggableScrollableSheet(
      initialChildSize: 0.85,
      minChildSize: 0.5,
      maxChildSize: 0.95,
      builder: (ctx, scrollController) {
        return Container(
          decoration: BoxDecoration(
            color: surfaceColor,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
            border: Border.all(color: borderColor),
          ),
          clipBehavior: Clip.antiAlias,
          child: _buildFuture(context, scrollController),
        );
      },
    );
  }

  Widget _buildFuture(BuildContext context, ScrollController? scrollController) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final borderColor = isDark ? const Color(0xFF313744) : const Color(0xFFE2E8F0);

    return FutureBuilder<Map<String, dynamic>>(
      future: AdminCommunityService.getDoubtDetail(doubtId),
      builder: (ctx, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(40),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const CircularProgressIndicator(color: Color(0xFFE85A1C)),
                  const SizedBox(height: 16),
                  Text(
                    'Loading doubt details...',
                    style: TextStyle(
                      color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
                      fontSize: 13,
                    ),
                  ),
                ],
              ),
            ),
          );
        }

        if (snapshot.hasError || snapshot.data == null) {
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.error_outline, color: Colors.redAccent, size: 40),
                  const SizedBox(height: 12),
                  Text(
                    'Error: ${snapshot.error}',
                    style: TextStyle(color: isDark ? Colors.white70 : Colors.black87),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () => Navigator.of(ctx).pop(),
                    child: const Text('Close'),
                  ),
                ],
              ),
            ),
          );
        }

        final data = snapshot.data!;
        final doubt = (data['doubt'] as Map<String, dynamic>?) ?? {};
        final activityTimeline = (doubt['timeline'] ?? data['activityTimeline'] ?? []) as List;
        final responses = (doubt['responses'] as List?) ?? [];
        final attachments = (doubt['attachments'] as List?) ?? [];
        final publishedWb = doubt['solutionWhiteboard'] ?? doubt['published_whiteboard'];

        final status = (doubt['status'] ?? 'pending').toString();
        final statusColor = _getDoubtStatusColor(status);

        return Column(
          children: [
            // Pinned Header
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF1E222D) : const Color(0xFFF8FAFC),
                border: Border(bottom: BorderSide(color: borderColor)),
              ),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: const Color(0xFFE85A1C).withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(6),
                      border: Border.all(color: const Color(0xFFE85A1C).withValues(alpha: 0.4)),
                    ),
                    child: Text(
                      'Doubt #${doubt['id'] ?? doubtId}',
                      style: const TextStyle(
                        color: Color(0xFFE85A1C),
                        fontWeight: FontWeight.bold,
                        fontSize: 13,
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: statusColor.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(6),
                      border: Border.all(color: statusColor.withValues(alpha: 0.4)),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          width: 7,
                          height: 7,
                          decoration: BoxDecoration(
                            color: statusColor,
                            shape: BoxShape.circle,
                          ),
                        ),
                        const SizedBox(width: 6),
                        Text(
                          status.toUpperCase().replaceAll('_', ' '),
                          style: TextStyle(
                            color: statusColor,
                            fontWeight: FontWeight.bold,
                            fontSize: 11,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Spacer(),
                  IconButton(
                    icon: Icon(Icons.close, color: isDark ? Colors.white70 : Colors.black87),
                    tooltip: 'Close',
                    onPressed: () => Navigator.of(ctx).pop(),
                  ),
                ],
              ),
            ),

            // Scrollable Body
            Expanded(
              child: ListView(
                controller: scrollController,
                padding: const EdgeInsets.all(22),
                children: [
                  // Title
                  Text(
                    doubt['title']?.toString().isNotEmpty == true
                        ? doubt['title'].toString()
                        : 'Doubt #${doubt['id'] ?? doubtId}',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: isDark ? Colors.white : const Color(0xFF0F172A),
                    ),
                  ),
                  const SizedBox(height: 10),

                  // Metadata Chips Row
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      _buildMetaChip(
                        icon: Icons.school_outlined,
                        label: 'Class: ${doubt['class_level'] ?? 'N/A'}',
                        isDark: isDark,
                      ),
                      _buildMetaChip(
                        icon: Icons.menu_book_outlined,
                        label: 'Subject: ${doubt['subject'] ?? 'N/A'}',
                        isDark: isDark,
                      ),
                      _buildMetaChip(
                        icon: Icons.person_outline,
                        label: 'Student: ${doubt['student_name'] ?? 'Student'}',
                        isDark: isDark,
                      ),
                      if (doubt['student_phone'] != null && doubt['student_phone'].toString().isNotEmpty)
                        _buildMetaChip(
                          icon: Icons.phone_outlined,
                          label: doubt['student_phone'].toString(),
                          isDark: isDark,
                        ),
                      if (doubt['assigned_teacher_name'] != null && doubt['assigned_teacher_name'].toString().isNotEmpty)
                        _buildMetaChip(
                          icon: Icons.school,
                          label: 'Faculty: ${doubt['assigned_teacher_name']}',
                          isDark: isDark,
                          highlightColor: isDark ? Colors.tealAccent : Colors.teal.shade700,
                        ),
                      if (doubt['created_at'] != null)
                        _buildMetaChip(
                          icon: Icons.access_time_outlined,
                          label: doubt['created_at'].toString().split('T').first,
                          isDark: isDark,
                        ),
                    ],
                  ),
                  const SizedBox(height: 22),

                  // Question Description
                  _buildSectionHeader(
                    icon: Icons.help_outline,
                    title: 'Question Description',
                    isDark: isDark,
                  ),
                  const SizedBox(height: 8),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: isDark ? const Color(0xFF1E222D) : const Color(0xFFF8FAFC),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: borderColor),
                    ),
                    child: SelectableText(
                      (doubt['description'] ?? 'No text description provided by student.').toString(),
                      style: TextStyle(
                        fontSize: 14,
                        height: 1.5,
                        color: isDark ? const Color(0xFFF1F5F9) : const Color(0xFF1E293B),
                      ),
                    ),
                  ),

                  // Submitted Attachments (Images, Audio, Documents)
                  if (attachments.isNotEmpty) ...[
                    const SizedBox(height: 22),
                    _buildSectionHeader(
                      icon: Icons.attach_file,
                      title: 'Submitted Media & Attachments (${attachments.length})',
                      isDark: isDark,
                    ),
                    const SizedBox(height: 10),
                    ...attachments.map((att) => _buildAttachmentItem(att, isDark, borderColor)),
                  ],

                  // Teacher Solutions & Responses
                  const SizedBox(height: 24),
                  _buildSectionHeader(
                    icon: Icons.question_answer_outlined,
                    title: 'Faculty Solutions & Responses (${responses.length})',
                    isDark: isDark,
                  ),
                  const SizedBox(height: 10),
                  if (responses.isEmpty)
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: isDark ? const Color(0xFF1E222D) : const Color(0xFFF8FAFC),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: borderColor),
                      ),
                      child: Row(
                        children: [
                          Icon(
                            Icons.pending_actions,
                            color: isDark ? Colors.grey.shade500 : Colors.grey.shade600,
                            size: 20,
                          ),
                          const SizedBox(width: 10),
                          Text(
                            'No responses submitted yet by faculty.',
                            style: TextStyle(
                              color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
                              fontSize: 13,
                            ),
                          ),
                        ],
                      ),
                    )
                  else
                    ...responses.map((resp) {
                      final tName = resp['teacher_name'] ?? 'Faculty Teacher';
                      final text = (resp['response_text'] ?? '').toString();
                      final createdAt = resp['created_at'];
                      final respAtts = (resp['attachments'] as List?) ?? [];

                      return Container(
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF1A2332) : const Color(0xFFF0FDF4),
                          border: Border.all(
                            color: isDark ? Colors.teal.shade800.withValues(alpha: 0.6) : Colors.teal.shade200,
                          ),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.all(6),
                                      decoration: BoxDecoration(
                                        color: Colors.teal.withValues(alpha: 0.2),
                                        shape: BoxShape.circle,
                                      ),
                                      child: const Icon(Icons.school, size: 14, color: Colors.teal),
                                    ),
                                    const SizedBox(width: 8),
                                    Text(
                                      'By $tName',
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 13,
                                        color: isDark ? Colors.tealAccent : const Color(0xFF0F766E),
                                      ),
                                    ),
                                  ],
                                ),
                                if (createdAt != null)
                                  Text(
                                    createdAt.toString().replaceAll('T', ' ').split('.').first,
                                    style: TextStyle(
                                      fontSize: 11,
                                      color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
                                    ),
                                  ),
                              ],
                            ),
                            if (text.isNotEmpty) ...[
                              const SizedBox(height: 10),
                              SelectableText(
                                text,
                                style: TextStyle(
                                  fontSize: 13,
                                  height: 1.45,
                                  color: isDark ? const Color(0xFFE2E8F0) : const Color(0xFF1E293B),
                                ),
                              ),
                            ],
                            if (respAtts.isNotEmpty) ...[
                              const SizedBox(height: 12),
                              Wrap(
                                spacing: 8,
                                children: respAtts.map((ra) {
                                  final raLink = (ra['drive_view_link'] ?? ra['file_url'] ?? '').toString();
                                  final raName = (ra['original_filename'] ?? 'Attachment').toString();
                                  return ActionChip(
                                    avatar: const Icon(Icons.attachment, size: 14),
                                    label: Text(raName, style: const TextStyle(fontSize: 11)),
                                    onPressed: () {
                                      if (raLink.isNotEmpty) {
                                        launchUrl(Uri.parse(raLink), mode: LaunchMode.externalApplication);
                                      }
                                    },
                                  );
                                }).toList(),
                              ),
                            ],
                          ],
                        ),
                      );
                    }),

                  // Published Whiteboard
                  if (publishedWb != null) ...[
                    const SizedBox(height: 20),
                    Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: isDark ? const Color(0xFF162E2A) : const Color(0xFFF0FDFA),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: isDark ? Colors.teal.shade700 : Colors.teal.shade300,
                        ),
                      ),
                      child: Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: Colors.teal.withValues(alpha: 0.2),
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(Icons.draw, color: Colors.teal, size: 22),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Interactive Whiteboard Solution Published',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 13,
                                    color: isDark ? Colors.tealAccent : const Color(0xFF0F766E),
                                  ),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  'Version ${publishedWb['version'] ?? '1'} • Updated at ${publishedWb['published_at'] ?? publishedWb['updated_at'] ?? 'N/A'}',
                                  style: TextStyle(
                                    fontSize: 11,
                                    color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
                                  ),
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
                  _buildSectionHeader(
                    icon: Icons.history,
                    title: 'Doubt Lifecycle Audit Trail (${activityTimeline.length})',
                    isDark: isDark,
                  ),
                  const SizedBox(height: 10),
                  if (activityTimeline.isEmpty)
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: isDark ? const Color(0xFF1E222D) : const Color(0xFFF8FAFC),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: borderColor),
                      ),
                      child: Text(
                        'No timeline events recorded.',
                        style: TextStyle(
                          color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
                          fontSize: 12,
                        ),
                      ),
                    )
                  else
                    Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: isDark ? const Color(0xFF1E222D) : const Color(0xFFF8FAFC),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: borderColor),
                      ),
                      child: Column(
                        children: activityTimeline.map((ev) {
                          final evType = (ev['event_type'] ?? '').toString();
                          final role = (ev['actor_role'] ?? '').toString();
                          final actorName = (ev['actor_name'] ?? role).toString();
                          final ts = (ev['event_timestamp'] ?? '').toString();

                          return Padding(
                            padding: const EdgeInsets.symmetric(vertical: 4),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Container(
                                  margin: const EdgeInsets.only(top: 5),
                                  width: 7,
                                  height: 7,
                                  decoration: const BoxDecoration(
                                    color: Color(0xFFE85A1C),
                                    shape: BoxShape.circle,
                                  ),
                                ),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: RichText(
                                    text: TextSpan(
                                      style: TextStyle(
                                        fontSize: 12,
                                        color: isDark ? Colors.grey.shade300 : const Color(0xFF334155),
                                      ),
                                      children: [
                                        TextSpan(
                                          text: '${evType.toUpperCase().replaceAll('_', ' ')}: ',
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            color: isDark ? Colors.white : Colors.black87,
                                          ),
                                        ),
                                        TextSpan(
                                          text: 'by $actorName ($role)',
                                          style: TextStyle(
                                            color: isDark ? Colors.orangeAccent.shade100 : Colors.indigo.shade700,
                                          ),
                                        ),
                                        if (ts.isNotEmpty)
                                          TextSpan(
                                            text: ' • ${ts.replaceAll('T', ' ').split('.').first}',
                                            style: TextStyle(
                                              fontSize: 11,
                                              color: isDark ? Colors.grey.shade500 : Colors.grey.shade600,
                                            ),
                                          ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          );
                        }).toList(),
                      ),
                    ),
                ],
              ),
            ),
          ],
        );
      },
    );
  }

  Widget _buildAttachmentItem(dynamic att, bool isDark, Color borderColor) {
    final attMap = att is Map ? att : <String, dynamic>{};
    final fileId = (attMap['drive_file_id'] ?? extractDriveFileId(attMap['drive_view_link'] ?? attMap['file_url'] ?? '') ?? '').toString().trim();
    final filename = (attMap['original_filename'] ?? 'Attachment').toString();
    final mime = (attMap['mime_type'] ?? '').toString().toLowerCase();
    final viewLink = (attMap['drive_view_link'] ?? (fileId.isNotEmpty ? 'https://drive.google.com/file/d/$fileId/view' : attMap['file_url'] ?? '')).toString();

    final isImage = mime.startsWith('image/') ||
        filename.endsWith('.jpg') ||
        filename.endsWith('.jpeg') ||
        filename.endsWith('.png') ||
        filename.endsWith('.webp') ||
        filename.endsWith('.gif');

    final isAudio = mime.startsWith('audio/') ||
        filename.endsWith('.mp3') ||
        filename.endsWith('.m4a') ||
        filename.endsWith('.wav') ||
        filename.endsWith('.aac') ||
        filename.endsWith('.ogg');

    if (isImage) {
      final imgUrl = fileId.isNotEmpty
          ? buildDriveThumbnailUrl(fileId, thumbWidth: 1000)
          : (viewLink.isNotEmpty ? resolveDriveImageUrl(viewLink) : '');

      return Container(
        margin: const EdgeInsets.only(bottom: 12),
        decoration: BoxDecoration(
          color: isDark ? const Color(0xFF1E222D) : const Color(0xFFF8FAFC),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: borderColor),
        ),
        clipBehavior: Clip.antiAlias,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            InkWell(
              onTap: () {
                if (viewLink.isNotEmpty) {
                  launchUrl(Uri.parse(viewLink), mode: LaunchMode.externalApplication);
                }
              },
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    height: 250,
                    width: double.infinity,
                    color: isDark ? const Color(0xFF141720) : const Color(0xFFF1F5F9),
                    child: imgUrl.isNotEmpty
                        ? FastNetworkImage(
                            url: imgUrl,
                            fit: BoxFit.contain,
                            height: 250,
                          )
                        : const Center(child: Icon(Icons.image_not_supported, size: 40)),
                  ),
                  Positioned(
                    top: 10,
                    right: 10,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                      decoration: BoxDecoration(
                        color: Colors.black.withValues(alpha: 0.75),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.fullscreen, color: Colors.white, size: 16),
                          SizedBox(width: 4),
                          Text(
                            'Tap to View Full Image',
                            style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w600),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              child: Row(
                children: [
                  const Icon(Icons.image_outlined, size: 16, color: Colors.blueAccent),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      filename,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        color: isDark ? Colors.grey.shade300 : const Color(0xFF334155),
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  if (viewLink.isNotEmpty)
                    TextButton.icon(
                      icon: const Icon(Icons.open_in_new, size: 14),
                      label: const Text('Open in Drive', style: TextStyle(fontSize: 12)),
                      style: TextButton.styleFrom(
                        visualDensity: VisualDensity.compact,
                        foregroundColor: const Color(0xFFE85A1C),
                      ),
                      onPressed: () => launchUrl(Uri.parse(viewLink), mode: LaunchMode.externalApplication),
                    ),
                ],
              ),
            ),
          ],
        ),
      );
    }

    if (isAudio) {
      return Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isDark ? const Color(0xFF1E222D) : const Color(0xFFF8FAFC),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.blueAccent.withValues(alpha: 0.35)),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.blueAccent.withValues(alpha: 0.15),
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.audiotrack, color: Colors.blueAccent, size: 22),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    filename,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 13,
                      color: isDark ? Colors.white : const Color(0xFF0F172A),
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    'Voice note recorded by student',
                    style: TextStyle(
                      fontSize: 11,
                      color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
                    ),
                  ),
                ],
              ),
            ),
            ElevatedButton.icon(
              icon: const Icon(Icons.play_circle_fill, size: 16),
              label: const Text('Play Audio'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blueAccent,
                foregroundColor: Colors.white,
                elevation: 0,
                textStyle: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
              ),
              onPressed: () {
                final audioUrl = fileId.isNotEmpty
                    ? 'https://docs.google.com/uc?export=download&id=$fileId'
                    : viewLink;
                if (audioUrl.isNotEmpty) {
                  launchUrl(Uri.parse(audioUrl), mode: LaunchMode.externalApplication);
                }
              },
            ),
          ],
        ),
      );
    }

    // Default other file
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1E222D) : const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: borderColor),
      ),
      child: Row(
        children: [
          const Icon(Icons.insert_drive_file_outlined, color: Colors.orangeAccent),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              filename,
              style: TextStyle(fontSize: 13, color: isDark ? Colors.white : Colors.black87),
            ),
          ),
          if (viewLink.isNotEmpty)
            TextButton.icon(
              icon: const Icon(Icons.open_in_new, size: 14),
              label: const Text('View Document'),
              style: TextButton.styleFrom(foregroundColor: const Color(0xFFE85A1C)),
              onPressed: () => launchUrl(Uri.parse(viewLink), mode: LaunchMode.externalApplication),
            ),
        ],
      ),
    );
  }

  static Widget _buildMetaChip({
    required IconData icon,
    required String label,
    required bool isDark,
    Color? highlightColor,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1E222D) : const Color(0xFFF1F5F9),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: isDark ? const Color(0xFF313744) : const Color(0xFFE2E8F0),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            icon,
            size: 14,
            color: highlightColor ?? (isDark ? Colors.grey.shade400 : Colors.grey.shade600),
          ),
          const SizedBox(width: 6),
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w500,
              color: highlightColor ?? (isDark ? Colors.grey.shade200 : const Color(0xFF334155)),
            ),
          ),
        ],
      ),
    );
  }

  static Widget _buildSectionHeader({
    required IconData icon,
    required String title,
    required bool isDark,
  }) {
    return Row(
      children: [
        Icon(icon, size: 16, color: const Color(0xFFE85A1C)),
        const SizedBox(width: 8),
        Text(
          title,
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: isDark ? Colors.white : const Color(0xFF0F172A),
          ),
        ),
      ],
    );
  }
}

