import 'dart:io';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/teacher_models.dart';
import '../services/teacher_api_service.dart';
import '../theme/app_tokens.dart';
import '../theme/theme_controller.dart';
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
          SnackBar(content: Text('Failed: $e'), backgroundColor: AppColors.danger),
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
          SnackBar(content: Text('Failed: $e'), backgroundColor: AppColors.danger),
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
            style: FilledButton.styleFrom(backgroundColor: AppColors.success),
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
          const SnackBar(content: Text('✓ Marked as resolved'), backgroundColor: AppColors.success),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed: $e'), backgroundColor: AppColors.danger),
        );
      }
    } finally {
      if (mounted) setState(() => _actionBusy = false);
    }
  }

  Future<void> _pickAndUploadAttachment() async {
    try {
      final res = await FilePicker.platform.pickFiles(
        type: FileType.custom,
        allowedExtensions: ['jpg', 'jpeg', 'png', 'pdf', 'mp3', 'm4a', 'wav'],
      );
      if (res == null || res.files.isEmpty) return;

      final file = res.files.first;
      if (file.path == null) return;

      setState(() => _uploadingFile = true);
      final uploaded = await TeacherApiService.uploadFileToDrive(
        File(file.path!),
        subfolder: 'TeacherAnswers',
      );

      setState(() {
        _answerAttachments.add(uploaded);
        _uploadingFile = false;
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('✓ "${file.name}" uploaded to Google Drive')),
        );
      }
    } catch (e) {
      if (mounted) {
        setState(() => _uploadingFile = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Upload failed: $e'), backgroundColor: AppColors.danger),
        );
      }
    }
  }

  Future<void> _submitAnswer() async {
    final text = _answerCtrl.text.trim();
    if (text.isEmpty && _answerAttachments.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please write an answer or attach a file solution')),
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
        _tabController.animateTo(2);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('✓ Answer successfully submitted to student!'),
            backgroundColor: AppColors.success,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to submit answer: $e'), backgroundColor: AppColors.danger),
        );
      }
    } finally {
      if (mounted) setState(() => _submittingAnswer = false);
    }
  }

  Color _getStatusColor(String status) {
    switch (status.toLowerCase().replaceAll(' ', '_')) {
      case 'pending':
        return AppColors.warning;
      case 'assigned':
        return const Color(0xFF6366F1);
      case 'in_progress':
        return const Color(0xFF0EA5E9);
      case 'answered':
        return const Color(0xFF10B981);
      case 'resolved':
        return AppColors.success;
      case 'reopened':
        return AppColors.danger;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          _doubt != null ? 'Doubt #${_doubt!.id}' : 'Doubt Detail',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 18,
            color: isDark ? Colors.white : AppColors.textPrimary,
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(
              isDark ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
              color: isDark ? AppColors.accentLight : AppColors.primary,
            ),
            tooltip: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
            onPressed: () => ThemeController.toggleTheme(context),
          ),
          if (_doubt != null) ...[
            if (_doubt!.status.toLowerCase() == 'pending')
              TextButton(
                onPressed: _actionBusy ? null : _claimDoubt,
                style: TextButton.styleFrom(foregroundColor: AppColors.primary),
                child: const Text('Claim', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            if (_doubt!.status.toLowerCase() == 'assigned')
              TextButton(
                onPressed: _actionBusy ? null : _startSolving,
                style: TextButton.styleFrom(foregroundColor: const Color(0xFF6366F1)),
                child: const Text('Start', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            if (_doubt!.status.toLowerCase() != 'resolved')
              IconButton(
                icon: const Icon(Icons.check_circle_outline, color: AppColors.success),
                tooltip: 'Mark Resolved',
                onPressed: _actionBusy ? null : _markResolved,
              ),
          ],
        ],
      ),
      body: Builder(
        builder: (ctx) {
          if (_loading) {
            return const Center(child: CircularProgressIndicator(color: AppColors.primary));
          }

          if (_doubt == null) {
            return Center(
              child: Text(
                _error.isNotEmpty ? _error : 'Doubt not found',
                style: TextStyle(color: isDark ? Colors.white70 : AppColors.textPrimary),
              ),
            );
          }

          final statusColor = _getStatusColor(_doubt!.status);

          return Column(
            children: [
              // Top Question Card
              Container(
                decoration: BoxDecoration(
                  color: isDark ? AppColors.darkSurface : AppColors.surface,
                  border: Border(
                    bottom: BorderSide(
                      color: isDark ? AppColors.darkBorder : AppColors.border,
                      width: 1,
                    ),
                  ),
                  boxShadow: isDark ? AppShadows.darkSoft : AppShadows.soft,
                ),
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: AppColors.primary.withValues(alpha: 0.12),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(
                            '${_doubt!.classLevel} • ${_doubt!.subject}',
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: AppColors.primary,
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: statusColor.withValues(alpha: 0.12),
                            borderRadius: BorderRadius.circular(6),
                            border: Border.all(color: statusColor.withValues(alpha: 0.3)),
                          ),
                          child: Text(
                            _doubt!.status.toUpperCase().replaceAll('_', ' '),
                            style: TextStyle(
                              color: statusColor,
                              fontWeight: FontWeight.bold,
                              fontSize: 11,
                            ),
                          ),
                        ),
                        const Spacer(),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: isDark ? AppColors.darkSurfaceElevated : AppColors.surfaceElevated,
                            borderRadius: BorderRadius.circular(6),
                            border: Border.all(
                              color: isDark ? AppColors.darkBorderStrong : AppColors.border,
                            ),
                          ),
                          child: Text(
                            'Doubt #${_doubt!.id}',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
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
                        color: isDark ? Colors.white : AppColors.textPrimary,
                      ),
                    ),
                    if (_doubt!.description?.isNotEmpty == true) ...[
                      const SizedBox(height: 6),
                      Text(
                        _doubt!.description!,
                        style: TextStyle(
                          fontSize: 13,
                          color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                          height: 1.4,
                        ),
                      ),
                    ],

                    // Submitted Attachments Chips
                    if (_doubt!.attachments.isNotEmpty) ...[
                      const SizedBox(height: 12),
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children: _doubt!.attachments.map((att) {
                          if (att.isImage) {
                            return GestureDetector(
                              onTap: () {
                                final link = att.driveViewLink ?? att.directImageUrl;
                                if (link.isNotEmpty) {
                                  launchUrl(Uri.parse(link), mode: LaunchMode.externalApplication);
                                }
                              },
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(8),
                                child: CachedNetworkImage(
                                  imageUrl: att.directImageUrl,
                                  width: 80,
                                  height: 80,
                                  fit: BoxFit.cover,
                                  placeholder: (_, __) => Container(
                                    width: 80,
                                    height: 80,
                                    color: isDark ? AppColors.darkSurfaceElevated : AppColors.surfaceElevated,
                                    child: const Center(child: CircularProgressIndicator(strokeWidth: 2)),
                                  ),
                                  errorWidget: (_, __, ___) => Container(
                                    width: 80,
                                    height: 80,
                                    color: isDark ? AppColors.darkSurfaceElevated : AppColors.surfaceElevated,
                                    child: const Icon(Icons.image, color: Colors.grey),
                                  ),
                                ),
                              ),
                            );
                          }
                          if (att.isAudio) {
                            return ActionChip(
                              avatar: const Icon(Icons.audiotrack, size: 16, color: AppColors.primary),
                              label: Text('🎵 ${att.originalFilename} (Play Audio)', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                              backgroundColor: AppColors.primary.withValues(alpha: 0.12),
                              onPressed: () {
                                final link = att.directAudioUrl;
                                if (link.isNotEmpty) {
                                  launchUrl(Uri.parse(link), mode: LaunchMode.externalApplication);
                                }
                              },
                            );
                          }
                          final link = att.driveViewLink ?? att.fileUrl ?? '';
                          return ActionChip(
                            avatar: Icon(
                              att.isPdf ? Icons.picture_as_pdf : Icons.attach_file,
                              size: 16,
                              color: AppColors.primary,
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

              // Tab bar matching student app style
              Container(
                color: isDark ? AppColors.darkSurface : AppColors.surface,
                child: TabBar(
                  controller: _tabController,
                  labelColor: AppColors.primary,
                  unselectedLabelColor: isDark ? AppColors.darkTextMuted : AppColors.textSecondary,
                  indicatorColor: AppColors.primary,
                  indicatorWeight: 3,
                  labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
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
                          Container(
                            decoration: BoxDecoration(
                              color: isDark ? AppColors.darkSurface : AppColors.surface,
                              borderRadius: BorderRadius.circular(AppRadii.md),
                              border: Border.all(
                                color: isDark ? AppColors.darkBorder : AppColors.border,
                                width: 1.1,
                              ),
                              boxShadow: isDark ? AppShadows.darkSoft : AppShadows.soft,
                            ),
                            padding: const EdgeInsets.all(18),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Faculty Solution Explanation',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 14,
                                    color: isDark ? Colors.white : AppColors.textPrimary,
                                  ),
                                ),
                                const SizedBox(height: 10),
                                TextField(
                                  controller: _answerCtrl,
                                  maxLines: 8,
                                  style: TextStyle(color: isDark ? Colors.white : AppColors.textPrimary),
                                  decoration: InputDecoration(
                                    hintText: 'Enter step-by-step solution...\n'
                                        'End with: "Therefore, Option (A) is the correct answer."',
                                    hintStyle: TextStyle(color: isDark ? AppColors.darkTextMuted : AppColors.textSecondary),
                                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(AppRadii.sm)),
                                    filled: true,
                                    fillColor: isDark ? AppColors.darkSurfaceElevated : AppColors.surfaceElevated,
                                  ),
                                ),
                                const SizedBox(height: 14),

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
                                    const SizedBox(width: 10),
                                    Text(
                                      'Saved to Admin Drive',
                                      style: TextStyle(
                                        fontSize: 11,
                                        color: isDark ? AppColors.darkTextMuted : AppColors.textSecondary,
                                      ),
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

                                const SizedBox(height: 18),
                                Align(
                                  alignment: Alignment.centerRight,
                                  child: FilledButton.icon(
                                    style: FilledButton.styleFrom(
                                      backgroundColor: AppColors.primary,
                                      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                                      minimumSize: const Size(0, 48),
                                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadii.sm)),
                                    ),
                                    onPressed: _submittingAnswer ? null : _submitAnswer,
                                    icon: _submittingAnswer
                                        ? const SizedBox(
                                            width: 16,
                                            height: 16,
                                            child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                                          )
                                        : const Icon(Icons.send, size: 18),
                                    label: const Text('Submit Answer', style: TextStyle(fontWeight: FontWeight.bold)),
                                  ),
                                ),
                              ],
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
                        initialDocument: _doubt!.whiteboard ?? _doubt!.publishedWhiteboard,
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
                                style: TextStyle(
                                  color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                                ),
                              ),
                            ),
                          )
                        else
                          ..._doubt!.responses.map((resp) {
                            return Container(
                              margin: const EdgeInsets.only(bottom: 12),
                              decoration: BoxDecoration(
                                color: isDark ? AppColors.darkSurface : AppColors.surface,
                                borderRadius: BorderRadius.circular(AppRadii.md),
                                border: Border.all(
                                  color: isDark ? AppColors.darkBorder : AppColors.border,
                                  width: 1.1,
                                ),
                                boxShadow: isDark ? AppShadows.darkSoft : AppShadows.soft,
                              ),
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        'Answer by ${resp.teacherName}',
                                        style: const TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 13,
                                          color: AppColors.primary,
                                        ),
                                      ),
                                      Text(
                                        resp.createdAt != null
                                            ? resp.createdAt.toString().split('.').first
                                            : '',
                                        style: TextStyle(
                                          fontSize: 11,
                                          color: isDark ? AppColors.darkTextMuted : AppColors.textSecondary,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 8),
                                  Text(
                                    resp.responseText,
                                    style: TextStyle(
                                      fontSize: 13,
                                      height: 1.45,
                                      color: isDark ? Colors.grey.shade200 : AppColors.textPrimary,
                                    ),
                                  ),
                                  if (resp.attachments.isNotEmpty) ...[
                                    const SizedBox(height: 10),
                                    Wrap(
                                      spacing: 6,
                                      children: resp.attachments.map((att) {
                                        final link = att.driveViewLink ?? att.fileUrl ?? '';
                                        return ActionChip(
                                          avatar: const Icon(Icons.open_in_new, size: 14, color: AppColors.primary),
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
