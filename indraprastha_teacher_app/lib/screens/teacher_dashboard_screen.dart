import 'package:flutter/material.dart';
import '../models/teacher_models.dart';
import '../services/teacher_api_service.dart';
import 'teacher_doubt_detail_screen.dart';

class TeacherDashboardScreen extends StatefulWidget {
  final VoidCallback onOpenQueue;
  const TeacherDashboardScreen({super.key, required this.onOpenQueue});

  @override
  State<TeacherDashboardScreen> createState() => _TeacherDashboardScreenState();
}

class _TeacherDashboardScreenState extends State<TeacherDashboardScreen> {
  bool _loading = true;
  String _error = '';
  Map<String, dynamic> _stats = {};
  List<TeacherSubjectAssignment> _assignments = [];
  List<TeacherDoubtItem> _recentDoubts = [];

  @override
  void initState() {
    super.initState();
    _fetchDashboard();
  }

  Future<void> _fetchDashboard() async {
    setState(() {
      _loading = true;
      _error = '';
    });
    try {
      final data = await TeacherApiService.getDashboard();
      final statsData = (data['stats'] ?? data['metrics']) as Map<String, dynamic>? ?? {};
      final asgnsData = (data['assignments'] as List? ?? [])
          .map((e) => TeacherSubjectAssignment.fromJson(Map<String, dynamic>.from(e as Map)))
          .toList();
      final doubtsData = (data['recentDoubts'] as List? ?? [])
          .map((e) => TeacherDoubtItem.fromJson(Map<String, dynamic>.from(e as Map)))
          .toList();

      if (!mounted) return;
      setState(() {
        _stats = statsData;
        _assignments = asgnsData;
        _recentDoubts = doubtsData;
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

  Widget _buildStatCard(BuildContext context, String label, String value, IconData icon, Color color) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Card(
      elevation: 0,
      color: isDark ? const Color(0xFF1E222D) : Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(14),
        side: BorderSide(color: isDark ? const Color(0xFF2E3545) : Colors.grey.withValues(alpha: 0.15)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey, fontWeight: FontWeight.w500)),
                Icon(icon, size: 20, color: color),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              value,
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: color),
            ),
          ],
        ),
      ),
    );
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
    final profile = TeacherApiService.currentProfile;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF11131A) : const Color(0xFFF5F7FA),
      appBar: AppBar(
        backgroundColor: const Color(0xFF002350),
        foregroundColor: Colors.white,
        title: const Text('Faculty Dashboard', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Refresh',
            onPressed: _fetchDashboard,
          ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: _fetchDashboard,
              child: ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  // Welcome Header Card
                  Container(
                    padding: const EdgeInsets.all(18),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFF002350), Color(0xFF0A3772)],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFF002350).withValues(alpha: 0.2),
                          blurRadius: 10,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            CircleAvatar(
                              radius: 22,
                              backgroundColor: const Color(0xFFD2AE39),
                              foregroundColor: const Color(0xFF002350),
                              child: Text(
                                (profile?.displayName.isNotEmpty == true ? profile!.displayName[0] : 'T').toUpperCase(),
                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    profile?.displayName ?? 'Faculty Member',
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(height: 2),
                                  Text(
                                    'Code: ${profile?.teacherCode ?? '—'} • ${profile?.email ?? ''}',
                                    style: const TextStyle(color: Color(0xFFD2AE39), fontSize: 12),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 14),
                        const Divider(color: Colors.white24, height: 1),
                        const SizedBox(height: 10),
                        const Text(
                          'Your Assigned Subjects:',
                          style: TextStyle(color: Colors.white70, fontSize: 11, fontWeight: FontWeight.w600),
                        ),
                        const SizedBox(height: 6),
                        Wrap(
                          spacing: 6,
                          runSpacing: 6,
                          children: _assignments.map((asgn) {
                            return Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: Colors.white.withValues(alpha: 0.15),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Text(
                                '${asgn.classLevel} — ${asgn.subject}',
                                style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w600),
                              ),
                            );
                          }).toList(),
                        ),
                      ],
                    ),
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
                      child: Text(_error, style: const TextStyle(color: Colors.red, fontSize: 12)),
                    ),

                  // KPI Grid
                  Text(
                    'Doubt Resolution Overview',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
                    ),
                  ),
                  const SizedBox(height: 10),
                  GridView.count(
                    crossAxisCount: 3,
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    crossAxisSpacing: 10,
                    mainAxisSpacing: 10,
                    childAspectRatio: 1.1,
                    children: [
                      _buildStatCard(context, 'Pending', '${_stats['pending'] ?? 0}', Icons.hourglass_empty, const Color(0xFFD2AE39)),
                      _buildStatCard(context, 'Assigned', '${_stats['assigned'] ?? 0}', Icons.assignment_ind_outlined, Colors.indigo),
                      _buildStatCard(context, 'In Progress', '${_stats['inProgress'] ?? _stats['in_progress'] ?? 0}', Icons.pending_actions_outlined, Colors.blue),
                      _buildStatCard(context, 'Answered', '${_stats['answered'] ?? 0}', Icons.done, Colors.teal),
                      _buildStatCard(context, 'Resolved', '${_stats['resolved'] ?? 0}', Icons.check_circle_outline, const Color(0xFF2E8B57)),
                      _buildStatCard(context, 'Reopened', '${_stats['reopened'] ?? 0}', Icons.replay, const Color(0xFFD92D20)),
                    ],
                  ),

                  const SizedBox(height: 20),

                  // Queue CTA
                  Card(
                    color: const Color(0xFF002350),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: const Color(0xFFD2AE39).withValues(alpha: 0.2),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: const Icon(Icons.school, color: Color(0xFFD2AE39), size: 28),
                          ),
                          const SizedBox(width: 14),
                          const Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('Subject Doubts Queue', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15)),
                                SizedBox(height: 2),
                                Text('Claim & solve pending doubts for students', style: TextStyle(color: Colors.white70, fontSize: 12)),
                              ],
                            ),
                          ),
                          FilledButton(
                            style: FilledButton.styleFrom(
                              backgroundColor: const Color(0xFFD2AE39),
                              foregroundColor: const Color(0xFF002350),
                            ),
                            onPressed: widget.onOpenQueue,
                            child: const Text('Open Queue', style: TextStyle(fontWeight: FontWeight.bold)),
                          ),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Recent doubts section
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Recent Assigned Doubts',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
                        ),
                      ),
                      TextButton(
                        onPressed: widget.onOpenQueue,
                        child: const Text('View All →'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),

                  if (_recentDoubts.isEmpty)
                    Card(
                      elevation: 0,
                      color: isDark ? const Color(0xFF1E222D) : Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                        side: BorderSide(color: isDark ? const Color(0xFF2E3545) : Colors.grey.withValues(alpha: 0.15)),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(32),
                        child: Center(
                          child: Column(
                            children: [
                              const Icon(Icons.check_circle_outline, color: Color(0xFF2E8B57), size: 36),
                              const SizedBox(height: 8),
                              Text(
                                'No pending doubts in your queue right now!',
                                style: TextStyle(color: isDark ? Colors.grey.shade400 : Colors.black87),
                              ),
                            ],
                          ),
                        ),
                      ),
                    )
                  else
                    ..._recentDoubts.map((doubt) {
                      return Card(
                        elevation: 0,
                        color: isDark ? const Color(0xFF1E222D) : Colors.white,
                        margin: const EdgeInsets.only(bottom: 10),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                          side: BorderSide(color: isDark ? const Color(0xFF2E3545) : Colors.grey.withValues(alpha: 0.15)),
                        ),
                        child: ListTile(
                          onTap: () async {
                            await Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (_) => TeacherDoubtDetailScreen(doubtId: doubt.id),
                              ),
                            );
                            _fetchDashboard();
                          },
                          leading: CircleAvatar(
                            backgroundColor: _getStatusColor(doubt.status).withValues(alpha: 0.15),
                            child: Icon(Icons.help_outline, color: _getStatusColor(doubt.status)),
                          ),
                          title: Text(
                            doubt.title,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 14,
                              color: isDark ? Colors.white : Colors.black87,
                            ),
                          ),
                          subtitle: Text(
                            '${doubt.classLevel} • ${doubt.subject} • Doubt #${doubt.id}',
                            style: TextStyle(fontSize: 12, color: isDark ? Colors.grey.shade400 : Colors.grey.shade600),
                          ),
                          trailing: Container(
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
                        ),
                      );
                    }),
                ],
              ),
            ),
    );
  }
}
