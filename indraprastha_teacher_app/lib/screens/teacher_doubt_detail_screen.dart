import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/teacher_models.dart';
import '../services/teacher_api_service.dart';
import '../widgets/teacher_whiteboard_canvas.dart';

class TeacherDoubtDetailScreen extends StatefulWidget {
  final int doubtId;
  const TeacherDoubtDetailScreen({super.key, required this.doubtId});

  @override
  State<TeacherDoubtDetailScreen> createState() => _TeacherDoubtDetailScreenState();
}

class _TeacherDoubtDetailScreenState extends State<TeacherDoubtDetailScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  bool _loading = true;
  String _error = '';
  TeacherDoubtItem? _doubt;
  bool _actionBusy = false;

  // Answer composer
  final _answerCtrl = TextEditingController();
  final List<DoubtMediaAttachment> _answerAttachments = [];
  bool _uploadingFile = false;
  bool _submittingAnswer = false;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _fetchDetail();
  }

  @override
  void dispose() {
    _tabController.dispose();
    _answerCtrl.dispose();
    super.dispose();
  }

  Future<void> _fetchDetail() async {
    setState(() {
      _loading = true;
      _error = '';
    });
    try {
      final item = await TeacherApiService.getDoubtDetail(widget.doubtId);
      if (!mounted) return;
      setState(() {
        _doubt = item;
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

  Future<void> _claimDoubt() async {
    setState(() => _actionBusy = true);
    try {
      await TeacherApiService.claimDoubt(widget.doubtId);
      await _fetchDetail();
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed: $e'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) setState(() => _actionBusy = false);
    }
  }

  Future<void> _startSolving() async {
    setState(() => _actionBusy = true);
    try {
      await TeacherApiService.startSolvingDoubt(widget.doubtId);
      await _fetchDetail();
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed: $e'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) setState(() => _actionBusy = false);
    }
  }

  Future<void> _markResolved() async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Mark Doubt as Resolved?'),
        content: const Text('This will complete the doubt resolution for the student.'),
        actions: [
          TextButton(onPressed: () => Navigator.of(ctx).pop(false), child: const Text('Cancel')),
          FilledButton(
            style: FilledButton.styleFrom(backgroundColor: const Color(0xFF2E8B57)),
            onPressed: () => Navigator.of(ctx).pop(true),
            child: const Text('Mark Resolved'),
          ),
        ],
      ),
    );
    if (confirm != true) return;

    setState(() => _actionBusy = true);
    try {
      await TeacherApiService.markResolved(widget.doubtId);
      await _fetchDetail();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('✓ Doubt marked as resolved!'), backgroundColor: Color(0xFF2E8B57)),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed: $e'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) setState(() => _actionBusy = false);
    }
  }

  Future<void> _pickAndUploadAttachment() async {
    final result = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: ['jpg', 'jpeg', 'png', 'pdf', 'mp4', 'm4a', 'mp3', 'wav'],
    );
    if (result == null || result.files.single.path == null) return;

    final file = File(result.files.single.path!);
    setState(() => _uploadingFile = true);

    try {
      final uploaded = await TeacherApiService.uploadFileToDrive(
        file,
        subfolder: 'doubts/${widget.doubtId}/teacher_responses',
      );
      if (mounted) {
        setState(() {
          _answerAttachments.add(uploaded);
        });
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('✓ File uploaded directly to Admin Google Drive')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Drive Upload failed: $e'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) setState(() => _uploadingFile = false);
    }
  }

  Future<void> _submitAnswer() async {
    final text = _answerCtrl.text.trim();
    if (text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter an explanation before submitting')),
      );
      return;
    }

    setState(() => _submittingAnswer = true);
    try {
      await TeacherApiService.submitAnswer(
        widget.doubtId,
        responseText: text,
        attachments: _answerAttachments,
      );
      _answerCtrl.clear();
      _answerAttachments.clear();
      await _fetchDetail();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('✓ Answer successfully submitted to student!'),
            backgroundColor: Color(0xFF2E8B57),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to submit answer: $e'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) setState(() => _submittingAnswer = false);
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
    return Scaffold(
      backgroundColor: const Color(0xFFF5F7FA),
      appBar: AppBar(
        backgroundColor: const Color(0xFF002350),
        foregroundColor: Colors.white,
        title: Text(
          _doubt != null ? 'Doubt #${_doubt!.id}' : 'Doubt Detail',
          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
        ),
        actions: [
          if (_doubt != null) ...[
            if (_doubt!.status == 'pending')
              TextButton(
                onPressed: _actionBusy ? null : _claimDoubt,
                child: const Text('Claim', style: TextStyle(color: Color(0xFFD2AE39), fontWeight: FontWeight.bold)),
              ),
            if (_doubt!.status == 'assigned')
              TextButton(
                onPressed: _actionBusy ? null : _startSolving,
                child: const Text('Start', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
              ),
            if (_doubt!.status != 'resolved')
              IconButton(
                icon: const Icon(Icons.check_circle_outline, color: Color(0xFF2E8B57)),
                tooltip: 'Mark Resolved',
                onPressed: _actionBusy ? null : _markResolved,
              ),
          ],
        ],
      ),
      body: Builder(
        builder: (context) {
          final isDark = Theme.of(context).brightness == Brightness.dark;

          if (_loading) {
            return const Center(child: CircularProgressIndicator());
          }
          if (_error.isNotEmpty || _doubt == null) {
            return Center(
              child: Text(
                _error.isNotEmpty ? _error : 'Doubt not found',
                style: TextStyle(color: isDark ? Colors.white70 : Colors.black87),
              ),
            );
          }

          return Column(
            children: [
              // Top Question Card
              Container(
                color: isDark ? const Color(0xFF171A22) : Colors.white,
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: (isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350)).withValues(alpha: 0.12),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            '${_doubt!.classLevel} • ${_doubt!.subject}',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: _getStatusColor(_doubt!.status).withValues(alpha: 0.15),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            _doubt!.status.toUpperCase(),
                            style: TextStyle(
                              color: _getStatusColor(_doubt!.status),
                              fontWeight: FontWeight.bold,
                              fontSize: 11,
                            ),
                          ),
                        ),
                        const Spacer(),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: isDark ? const Color(0xFF2E3545) : Colors.grey.shade100,
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            'Doubt #${_doubt!.id}',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: isDark ? Colors.grey.shade300 : Colors.grey.shade700,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Text(
                      _doubt!.title,
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: isDark ? Colors.white : Colors.black87,
                      ),
                    ),
                    if (_doubt!.description?.isNotEmpty == true) ...[
                      const SizedBox(height: 6),
                      Text(
                        _doubt!.description!,
                        style: TextStyle(
                          fontSize: 13,
                          color: isDark ? Colors.grey.shade300 : Colors.grey.shade800,
                          height: 1.4,
                        ),
                      ),
                    ],

                    // Submitted Attachments Chips
                    if (_doubt!.attachments.isNotEmpty) ...[
                      const SizedBox(height: 10),
                      Wrap(
                        spacing: 8,
                        runSpacing: 6,
                        children: _doubt!.attachments.map((att) {
                          final isImg = att.mimeType.startsWith('image/');
                          final link = att.driveViewLink ?? att.fileUrl ?? '';
                          return ActionChip(
                            avatar: Icon(
                              isImg ? Icons.image : Icons.attach_file,
                              size: 16,
                              color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
                            ),
                            label: Text(att.originalFilename, style: const TextStyle(fontSize: 12)),
                            onPressed: () {
                              if (link.isNotEmpty) {
                                launchUrl(Uri.parse(link), mode: LaunchMode.externalApplication);
                              }
                            },
                          );
                        }).toList(),
                      ),
                    ],
                  ],
                ),
              ),

              // Tab bar
              Container(
                color: isDark ? const Color(0xFF171A22) : Colors.white,
                child: TabBar(
                  controller: _tabController,
                  labelColor: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
                  unselectedLabelColor: isDark ? Colors.grey.shade400 : Colors.grey,
                  indicatorColor: const Color(0xFFD2AE39),
                  indicatorWeight: 3,
                  tabs: [
                    const Tab(icon: Icon(Icons.edit_note), text: 'Answer'),
                    const Tab(icon: Icon(Icons.draw), text: 'Whiteboard'),
                    Tab(icon: const Icon(Icons.history), text: 'History (${_doubt!.responses.length})'),
                  ],
                ),
              ),

              // Tab Views
              Expanded(
                child: TabBarView(
                  controller: _tabController,
                  physics: const NeverScrollableScrollPhysics(),
                  children: [
                    // Tab 1: Written Answer Composer
                    Padding(
                      padding: const EdgeInsets.all(16),
                      child: ListView(
                        children: [
                          Card(
                            elevation: 0,
                            color: isDark ? const Color(0xFF1E222D) : Colors.white,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                              side: BorderSide(color: isDark ? const Color(0xFF2E3545) : Colors.grey.withValues(alpha: 0.2)),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Faculty Solution Explanation',
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 14,
                                      color: isDark ? Colors.white : Colors.black87,
                                    ),
                                  ),
                                  const SizedBox(height: 8),
                                  TextField(
                                    controller: _answerCtrl,
                                    maxLines: 8,
                                    style: TextStyle(color: isDark ? Colors.white : Colors.black87),
                                    decoration: InputDecoration(
                                      hintText: 'Enter step-by-step solution...\n'
                                          'End with: "Therefore, Option (A) is the correct answer."',
                                      hintStyle: TextStyle(color: isDark ? Colors.white38 : null),
                                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                                      filled: true,
                                      fillColor: isDark ? const Color(0xFF11131A) : const Color(0xFFF9FAFC),
                                    ),
                                  ),
                                        const SizedBox(height: 12),

                                        // Attachments
                                        Row(
                                          children: [
                                            OutlinedButton.icon(
                                              icon: _uploadingFile
                                                  ? const SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2))
                                                  : const Icon(Icons.upload_file, size: 18),
                                              label: const Text('Add File to Drive'),
                                              onPressed: _uploadingFile ? null : _pickAndUploadAttachment,
                                            ),
                                            const SizedBox(width: 8),
                                            Text(
                                              'Saved to Admin Drive',
                                              style: TextStyle(fontSize: 11, color: Colors.grey.shade600),
                                            ),
                                          ],
                                        ),

                                        if (_answerAttachments.isNotEmpty) ...[
                                          const SizedBox(height: 10),
                                          Wrap(
                                            spacing: 6,
                                            children: _answerAttachments.asMap().entries.map((entry) {
                                              final idx = entry.key;
                                              final att = entry.value;
                                              return Chip(
                                                label: Text(att.originalFilename, style: const TextStyle(fontSize: 11)),
                                                deleteIcon: const Icon(Icons.close, size: 14),
                                                onDeleted: () => setState(() => _answerAttachments.removeAt(idx)),
                                              );
                                            }).toList(),
                                          ),
                                        ],

                                        const SizedBox(height: 16),
                                        Align(
                                          alignment: Alignment.centerRight,
                                          child: FilledButton.icon(
                                            style: FilledButton.styleFrom(
                                              backgroundColor: const Color(0xFF002350),
                                              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                                            ),
                                            onPressed: _submittingAnswer ? null : _submitAnswer,
                                            icon: _submittingAnswer
                                                ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                                                : const Icon(Icons.send, size: 18),
                                            label: const Text('Submit Answer', style: TextStyle(fontWeight: FontWeight.bold)),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),

                          // Tab 2: Interactive Solution Whiteboard
                          Padding(
                            padding: const EdgeInsets.all(12),
                            child: TeacherWhiteboardCanvas(
                              doubtId: widget.doubtId,
                              initialDocument: _doubt!.whiteboard,
                              onPublished: _fetchDetail,
                            ),
                          ),

                          // Tab 3: Response History
                          ListView(
                            padding: const EdgeInsets.all(16),
                            children: [
                              if (_doubt!.responses.isEmpty)
                                Center(
                                  child: Padding(
                                    padding: const EdgeInsets.all(32),
                                    child: Text(
                                      'No responses submitted yet by faculty.',
                                      style: TextStyle(color: isDark ? Colors.grey.shade400 : Colors.grey),
                                    ),
                                  ),
                                )
                              else
                                ..._doubt!.responses.map((resp) {
                                  return Card(
                                    elevation: 0,
                                    color: isDark ? const Color(0xFF1E222D) : Colors.white,
                                    margin: const EdgeInsets.only(bottom: 12),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(12),
                                      side: BorderSide(color: isDark ? const Color(0xFF2E3545) : Colors.grey.withValues(alpha: 0.15)),
                                    ),
                                    child: Padding(
                                      padding: const EdgeInsets.all(14),
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Row(
                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                            children: [
                                              Text(
                                                'Answer by ${resp.teacherName}',
                                                style: TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 13,
                                                  color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
                                                ),
                                              ),
                                              Text(
                                                resp.createdAt != null
                                                    ? resp.createdAt.toString().split('.').first
                                                    : '',
                                                style: TextStyle(fontSize: 11, color: isDark ? Colors.grey.shade400 : Colors.grey),
                                              ),
                                            ],
                                          ),
                                          const SizedBox(height: 8),
                                          Text(
                                            resp.responseText,
                                            style: TextStyle(
                                              fontSize: 13,
                                              height: 1.4,
                                              color: isDark ? Colors.grey.shade300 : Colors.black87,
                                            ),
                                          ),
                                          if (resp.attachments.isNotEmpty) ...[
                                            const SizedBox(height: 10),
                                            Wrap(
                                              spacing: 6,
                                              children: resp.attachments.map((att) {
                                                final link = att.driveViewLink ?? att.fileUrl ?? '';
                                                return ActionChip(
                                                  avatar: Icon(Icons.open_in_new, size: 14, color: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350)),
                                                  label: Text(att.originalFilename, style: const TextStyle(fontSize: 11)),
                                                  onPressed: () {
                                                    if (link.isNotEmpty) {
                                                      launchUrl(Uri.parse(link), mode: LaunchMode.externalApplication);
                                                    }
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
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                );
        },
      ),
    );
  }
}
