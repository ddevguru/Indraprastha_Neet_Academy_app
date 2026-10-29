import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/community_models.dart';
import '../services/community_service.dart';
import 'teacher_solution_whiteboard_screen.dart';

class MyDoubtsScreen extends StatefulWidget {
  final String? initialStatus;

  const MyDoubtsScreen({super.key, this.initialStatus});

  @override
  State<MyDoubtsScreen> createState() => _MyDoubtsScreenState();
}

class _MyDoubtsScreenState extends State<MyDoubtsScreen> {
  final CommunityService _service = CommunityService();

  String _selectedStatus = 'All';
  List<DoubtItem> _doubts = [];
  bool _isLoading = true;

  final List<String> _filters = ['All', 'Pending', 'Assigned', 'In Progress', 'Answered', 'Resolved', 'Reopened'];

  @override
  void initState() {
    super.initState();
    if (widget.initialStatus != null && _filters.contains(widget.initialStatus)) {
      _selectedStatus = widget.initialStatus!;
    }
    _loadDoubts();
  }

  Future<void> _loadDoubts() async {
    setState(() => _isLoading = true);
    try {
      final list = await _service.fetchMyDoubts(
        status: _selectedStatus == 'All' ? null : _selectedStatus,
      );
      if (mounted) setState(() => _doubts = list);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load doubts: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Color _statusColor(String status) {
    switch (status) {
      case 'Pending':
        return Colors.orange;
      case 'Assigned':
        return Colors.blue;
      case 'In Progress':
        return const Color(0xFFD2AE39);
      case 'Answered':
        return const Color(0xFF2E8B57);
      case 'Resolved':
        return const Color(0xFF002350);
      case 'Reopened':
        return Colors.deepPurple;
      default:
        return Colors.grey;
    }
  }

  void _openDoubtDetail(DoubtItem doubt) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (ctx) => DoubtDetailScreen(doubt: doubt, onStatusChanged: _loadDoubts),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF11131A) : const Color(0xFFF5F7FA),
      body: Column(
        children: [
          // Filter Chips
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            color: isDark ? const Color(0xFF171A22) : Colors.white,
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: _filters.map((f) {
                  final isSelected = _selectedStatus == f;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: ChoiceChip(
                      label: Text(f),
                      selected: isSelected,
                      selectedColor: const Color(0xFF002350),
                      labelStyle: TextStyle(
                        color: isSelected ? Colors.white : (isDark ? Colors.white70 : Colors.black87),
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                        fontSize: 12,
                      ),
                      onSelected: (_) {
                        setState(() => _selectedStatus = f);
                        _loadDoubts();
                      },
                    ),
                  );
                }).toList(),
              ),
            ),
          ),

          // Doubts List
          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : _doubts.isEmpty
                    ? Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(Icons.mark_chat_read_outlined, size: 54, color: Colors.grey),
                            const SizedBox(height: 12),
                            Text(
                              _selectedStatus == 'All'
                                  ? 'No doubts submitted yet'
                                  : 'No $_selectedStatus doubts found',
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                            ),
                            const SizedBox(height: 6),
                            const Text(
                              'When you submit questions from your workspace or tests, they will appear here.',
                              style: TextStyle(fontSize: 12, color: Colors.grey),
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      )
                    : RefreshIndicator(
                        onRefresh: _loadDoubts,
                        child: ListView.builder(
                          padding: const EdgeInsets.all(16),
                          itemCount: _doubts.length,
                          itemBuilder: (ctx, index) {
                            final d = _doubts[index];
                            final timeStr = DateFormat('dd MMM, hh:mm a').format(d.createdAt.toLocal());

                            return Card(
                              margin: const EdgeInsets.only(bottom: 12),
                              elevation: 0,
                              color: isDark ? const Color(0xFF1E222D) : Colors.white,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(14),
                                side: BorderSide(
                                  color: isDark ? const Color(0xFF2E3545) : Colors.black.withValues(alpha: 0.08),
                                ),
                              ),
                              child: InkWell(
                                borderRadius: BorderRadius.circular(14),
                                onTap: () => _openDoubtDetail(d),
                                child: Padding(
                                  padding: const EdgeInsets.all(16),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Container(
                                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                            decoration: BoxDecoration(
                                              color: (isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350)).withValues(alpha: 0.12),
                                              borderRadius: BorderRadius.circular(6),
                                            ),
                                            child: Text(
                                              '${d.classLevel} • ${d.subject}',
                                              style: TextStyle(
                                                fontSize: 11,
                                                fontWeight: FontWeight.bold,
                                                color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
                                              ),
                                            ),
                                          ),
                                          Container(
                                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                            decoration: BoxDecoration(
                                              color: _statusColor(d.status).withValues(alpha: 0.12),
                                              borderRadius: BorderRadius.circular(6),
                                            ),
                                            child: Text(
                                              d.status.toUpperCase(),
                                              style: TextStyle(
                                                fontSize: 11,
                                                fontWeight: FontWeight.bold,
                                                color: _statusColor(d.status),
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                      const SizedBox(height: 10),
                                      Text(
                                        d.title,
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 15,
                                          color: isDark ? Colors.white : Colors.black87,
                                        ),
                                      ),
                                      const SizedBox(height: 6),
                                      Text(
                                        d.description,
                                        maxLines: 2,
                                        overflow: TextOverflow.ellipsis,
                                        style: TextStyle(
                                          fontSize: 13,
                                          color: isDark ? Colors.grey.shade300 : Colors.grey.shade700,
                                        ),
                                      ),
                                      const SizedBox(height: 12),
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text(
                                            'Submitted: $timeStr',
                                            style: const TextStyle(fontSize: 11, color: Colors.grey),
                                          ),
                                          if (d.responses.isNotEmpty)
                                            Row(
                                              children: [
                                                const Icon(Icons.check_circle_outline, size: 14, color: Color(0xFF2E8B57)),
                                                const SizedBox(width: 4),
                                                Text(
                                                  '${d.responses.length} Teacher Answer',
                                                  style: const TextStyle(fontSize: 11, color: Color(0xFF2E8B57), fontWeight: FontWeight.bold),
                                                ),
                                              ],
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
          ),
        ],
      ),
    );
  }
}

class DoubtDetailScreen extends StatefulWidget {
  final DoubtItem doubt;
  final VoidCallback onStatusChanged;

  const DoubtDetailScreen({super.key, required this.doubt, required this.onStatusChanged});

  @override
  State<DoubtDetailScreen> createState() => _DoubtDetailScreenState();
}

class _DoubtDetailScreenState extends State<DoubtDetailScreen> {
  final CommunityService _service = CommunityService();
  late DoubtItem _currentDoubt;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _currentDoubt = widget.doubt;
    _refreshDetail();
  }

  Future<void> _refreshDetail() async {
    try {
      final updated = await _service.fetchDoubtDetail(widget.doubt.id);
      if (mounted) setState(() => _currentDoubt = updated);
    } catch (_) {}
  }

  void _reopenDialog() {
    final controller = TextEditingController();
    final isDark = Theme.of(context).brightness == Brightness.dark;
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: isDark ? const Color(0xFF1E222D) : Colors.white,
        title: Text(
          'Ask for Clarification / Reopen',
          style: TextStyle(color: isDark ? Colors.white : Colors.black87, fontWeight: FontWeight.bold),
        ),
        content: TextField(
          controller: controller,
          maxLines: 3,
          style: TextStyle(color: isDark ? Colors.white : Colors.black87),
          decoration: InputDecoration(
            hintText: 'Explain which step or concept still needs clarification...',
            hintStyle: TextStyle(color: isDark ? Colors.grey.shade400 : Colors.grey),
            border: const OutlineInputBorder(),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: Text('Cancel', style: TextStyle(color: isDark ? Colors.grey.shade400 : Colors.grey)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
              foregroundColor: isDark ? const Color(0xFF002350) : Colors.white,
            ),
            onPressed: () async {
              final text = controller.text.trim();
              if (text.isEmpty) return;
              Navigator.pop(ctx);
              setState(() => _isLoading = true);
              try {
                await _service.reopenDoubt(_currentDoubt.id, text);
                widget.onStatusChanged();
                await _refreshDetail();
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Doubt reopened for teacher clarification')),
                  );
                }
              } catch (e) {
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Reopen failed: $e')),
                  );
                }
              } finally {
                if (mounted) setState(() => _isLoading = false);
              }
            },
            child: const Text('Submit Clarification'),
          ),
        ],
      ),
    );
  }

  Future<void> _confirmResolution() async {
    setState(() => _isLoading = true);
    try {
      await _service.confirmResolution(_currentDoubt.id);
      widget.onStatusChanged();
      await _refreshDetail();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Doubt confirmed as resolved! Thank you.'),
            backgroundColor: Color(0xFF2E8B57),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final d = _currentDoubt;
    final timeStr = DateFormat('dd MMM yyyy, hh:mm a').format(d.createdAt.toLocal());

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF11131A) : const Color(0xFFF5F7FA),
      appBar: AppBar(
        backgroundColor: const Color(0xFF002350),
        foregroundColor: Colors.white,
        title: Text('Doubt #${d.id}'),
        actions: [
          if (d.status == 'Resolved')
            Padding(
              padding: const EdgeInsets.only(right: 8),
              child: TextButton.icon(
                onPressed: _reopenDialog,
                icon: const Icon(Icons.replay_rounded, color: Color(0xFFD2AE39), size: 18),
                label: const Text(
                  'Reopen',
                  style: TextStyle(color: Color(0xFFD2AE39), fontWeight: FontWeight.bold),
                ),
              ),
            ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Card(
                    color: isDark ? const Color(0xFF1E222D) : Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                      side: BorderSide(color: isDark ? const Color(0xFF2E3545) : Colors.black.withValues(alpha: 0.08)),
                    ),
                    elevation: 0,
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: (isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350)).withValues(alpha: 0.12),
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: Text(
                                  '${d.classLevel} • ${d.subject}',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 12,
                                    color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
                                  ),
                                ),
                              ),
                              Text(timeStr, style: TextStyle(fontSize: 11, color: isDark ? Colors.grey.shade400 : Colors.grey)),
                            ],
                          ),
                          const SizedBox(height: 12),
                          Text(
                            d.title,
                            style: TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.bold,
                              color: isDark ? Colors.white : Colors.black87,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            d.description,
                            style: TextStyle(
                              fontSize: 14,
                              height: 1.4,
                              color: isDark ? Colors.grey.shade300 : Colors.black87,
                            ),
                          ),
                          if (d.attachments.isNotEmpty) ...[
                            const SizedBox(height: 14),
                            Text(
                              'Submitted Media (Stored in Google Drive):',
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                                color: isDark ? Colors.grey.shade300 : Colors.black87,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Wrap(
                              spacing: 8,
                              runSpacing: 8,
                              children: d.attachments.map((att) {
                                if (att.isImage) {
                                  return GestureDetector(
                                    onTap: () {
                                      final link = att.driveViewLink.isNotEmpty ? att.driveViewLink : att.directImageUrl;
                                      if (link.isNotEmpty) launchUrl(Uri.parse(link), mode: LaunchMode.externalApplication);
                                    },
                                    child: ClipRRect(
                                      borderRadius: BorderRadius.circular(8),
                                      child: CachedNetworkImage(
                                        imageUrl: att.directImageUrl,
                                        width: 100,
                                        height: 100,
                                        fit: BoxFit.cover,
                                        errorWidget: (context, url, error) => Container(
                                          width: 100,
                                          height: 100,
                                          color: Colors.grey.shade200,
                                          child: const Icon(Icons.image),
                                        ),
                                      ),
                                    ),
                                  );
                                }
                                if (att.isAudio) {
                                  return ActionChip(
                                    avatar: const Icon(Icons.audiotrack, size: 16, color: Color(0xFFD2AE39)),
                                    label: Text(att.originalFilename, style: const TextStyle(fontSize: 11)),
                                    onPressed: () {
                                      final link = att.directAudioUrl;
                                      if (link.isNotEmpty) launchUrl(Uri.parse(link), mode: LaunchMode.externalApplication);
                                    },
                                  );
                                }
                                return ActionChip(
                                  avatar: const Icon(Icons.attachment, size: 16),
                                  label: Text(att.originalFilename, style: const TextStyle(fontSize: 11)),
                                  onPressed: () {
                                    final link = att.driveViewLink.isNotEmpty ? att.driveViewLink : att.storageKey;
                                    if (link.isNotEmpty) launchUrl(Uri.parse(link), mode: LaunchMode.externalApplication);
                                  },
                                );
                              }).toList(),
                            ),
                          ],
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 20),

                  if (d.publishedSolutionWhiteboard != null)
                    Card(
                      color: const Color(0xFF002350),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: const Color(0xFFD2AE39).withValues(alpha: 0.2),
                                shape: BoxShape.circle,
                              ),
                              child: const Icon(Icons.draw, color: Color(0xFFD2AE39), size: 28),
                            ),
                            const SizedBox(width: 14),
                            const Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Teacher Solution Whiteboard',
                                    style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15),
                                  ),
                                  SizedBox(height: 4),
                                  Text(
                                    'Published by teacher • Read-only viewer with pan & zoom',
                                    style: TextStyle(color: Colors.white70, fontSize: 11),
                                  ),
                                ],
                              ),
                            ),
                            ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFFD2AE39),
                                foregroundColor: const Color(0xFF002350),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                              ),
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (ctx) => TeacherSolutionWhiteboardScreen(
                                      doubtId: d.id,
                                      classLevel: d.classLevel,
                                      subject: d.subject,
                                      solutionWhiteboard: d.publishedSolutionWhiteboard!,
                                    ),
                                  ),
                                );
                              },
                              child: const Text('Open Canvas', style: TextStyle(fontWeight: FontWeight.bold)),
                            ),
                          ],
                        ),
                      ),
                    ),

                  const SizedBox(height: 20),

                  Row(
                    children: [
                      Icon(Icons.school, color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350), size: 20),
                      const SizedBox(width: 8),
                      Text(
                        'Teacher Answers (${d.responses.length})',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),

                  if (d.responses.isEmpty)
                    Card(
                      color: isDark ? const Color(0xFF1E222D) : Colors.white,
                      elevation: 0,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(14),
                        side: BorderSide(
                          color: isDark ? const Color(0xFF2E3545) : Colors.black.withValues(alpha: 0.08),
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(24),
                        child: Center(
                          child: Column(
                            children: [
                              const Icon(Icons.hourglass_empty, color: Colors.orange, size: 36),
                              const SizedBox(height: 10),
                              Text(
                                'Teacher is reviewing your question...',
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  color: isDark ? Colors.white : Colors.black87,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                d.assignedTeacherName != null
                                    ? 'Assigned to Subject Faculty'
                                    : 'A subject specialist teacher will claim and answer shortly.',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: isDark ? Colors.grey.shade400 : Colors.grey,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    )
                  else
                    ...d.responses.map((resp) {
                      final respTime = DateFormat('dd MMM, hh:mm a').format(resp.createdAt.toLocal());
                      return Card(
                        color: isDark ? const Color(0xFF1E222D) : Colors.white,
                        margin: const EdgeInsets.only(bottom: 12),
                        elevation: 0,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                          side: BorderSide(
                            color: isDark ? const Color(0xFF2E3545) : Colors.black.withValues(alpha: 0.08),
                          ),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Row(
                                    children: [
                                      CircleAvatar(
                                        radius: 14,
                                        backgroundColor: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
                                        child: Icon(Icons.person, size: 16, color: isDark ? const Color(0xFF002350) : Colors.white),
                                      ),
                                      const SizedBox(width: 8),
                                      Text(
                                        'Subject Faculty',
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 13,
                                          color: isDark ? Colors.white : Colors.black87,
                                        ),
                                      ),
                                    ],
                                  ),
                                  Text(
                                    respTime,
                                    style: TextStyle(fontSize: 11, color: isDark ? Colors.grey.shade400 : Colors.grey),
                                  ),
                                ],
                              ),
                              Divider(height: 20, color: isDark ? const Color(0xFF2E3545) : Colors.black.withValues(alpha: 0.08)),
                              Text(
                                resp.responseText,
                                style: TextStyle(
                                  fontSize: 14,
                                  height: 1.4,
                                  color: isDark ? Colors.grey.shade200 : Colors.black87,
                                ),
                              ),
                              if (resp.attachments.isNotEmpty) ...[
                                const SizedBox(height: 12),
                                Wrap(
                                  spacing: 8,
                                  runSpacing: 8,
                                  children: resp.attachments.map((att) {
                                    if (att.isImage) {
                                      return GestureDetector(
                                        onTap: () {
                                          final link = att.driveViewLink.isNotEmpty ? att.driveViewLink : att.directImageUrl;
                                          if (link.isNotEmpty) launchUrl(Uri.parse(link), mode: LaunchMode.externalApplication);
                                        },
                                        child: ClipRRect(
                                          borderRadius: BorderRadius.circular(8),
                                          child: CachedNetworkImage(
                                            imageUrl: att.directImageUrl,
                                            width: 90,
                                            height: 90,
                                            fit: BoxFit.cover,
                                            errorWidget: (_, __, ___) => Container(
                                              width: 90,
                                              height: 90,
                                              color: Colors.grey.shade200,
                                              child: const Icon(Icons.image),
                                            ),
                                          ),
                                        ),
                                      );
                                    }
                                    return ActionChip(
                                      avatar: Icon(att.isAudio ? Icons.audiotrack : Icons.attachment, size: 15, color: const Color(0xFFD2AE39)),
                                      label: Text(att.originalFilename, style: const TextStyle(fontSize: 11)),
                                      onPressed: () {
                                        final link = att.isAudio ? att.directAudioUrl : (att.driveViewLink.isNotEmpty ? att.driveViewLink : att.storageKey);
                                        if (link.isNotEmpty) launchUrl(Uri.parse(link), mode: LaunchMode.externalApplication);
                                      },
                                    );
                                  }).toList(),
                                ),
                              ],
                            ],
                          ),
                        ),
                      );
                    }),

                  const SizedBox(height: 30),

                  if (d.status != 'Resolved')
                    Row(
                      children: [
                        Expanded(
                          child: OutlinedButton.icon(
                            style: OutlinedButton.styleFrom(
                              padding: const EdgeInsets.symmetric(vertical: 12),
                              side: BorderSide(color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350)),
                              foregroundColor: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                            onPressed: _reopenDialog,
                            icon: const Icon(Icons.refresh, size: 18),
                            label: const Text('Need Clarification', style: TextStyle(fontWeight: FontWeight.bold)),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: ElevatedButton.icon(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF2E8B57),
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(vertical: 12),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                            onPressed: _confirmResolution,
                            icon: const Icon(Icons.check, size: 18),
                            label: const Text('Mark Resolved', style: TextStyle(fontWeight: FontWeight.bold)),
                          ),
                        ),
                      ],
                    )
                  else
                    Column(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: const Color(0xFF2E8B57).withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: const Color(0xFF2E8B57).withValues(alpha: 0.3)),
                          ),
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.check_circle, color: Color(0xFF2E8B57)),
                              SizedBox(width: 8),
                              Text(
                                'This doubt has been resolved successfully.',
                                style: TextStyle(color: Color(0xFF2E8B57), fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 12),
                        SizedBox(
                          width: double.infinity,
                          child: OutlinedButton.icon(
                            style: OutlinedButton.styleFrom(
                              padding: const EdgeInsets.symmetric(vertical: 13),
                              side: BorderSide(
                                color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
                                width: 1.5,
                              ),
                              foregroundColor: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                            onPressed: _reopenDialog,
                            icon: const Icon(Icons.replay_rounded, size: 20),
                            label: const Text(
                              'Still Have Questions? Reopen Doubt',
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                            ),
                          ),
                        ),
                      ],
                    ),
                ],
              ),
            ),
    );
  }
}
