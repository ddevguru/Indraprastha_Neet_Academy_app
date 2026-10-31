import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../../theme/app_tokens.dart';
import '../models/community_models.dart';
import '../services/community_service.dart';
import 'teacher_solution_whiteboard_screen.dart';

class TeacherResponseDetailScreen extends StatefulWidget {
  final DoubtItem doubt;
  final DoubtResponseItem response;
  final VoidCallback? onStatusChanged;

  const TeacherResponseDetailScreen({
    super.key,
    required this.doubt,
    required this.response,
    this.onStatusChanged,
  });

  @override
  State<TeacherResponseDetailScreen> createState() => _TeacherResponseDetailScreenState();
}

class _TeacherResponseDetailScreenState extends State<TeacherResponseDetailScreen> {
  final CommunityService _service = CommunityService();
  late DoubtItem _doubt;
  bool _isResolving = false;

  @override
  void initState() {
    super.initState();
    _doubt = widget.doubt;
  }

  Future<void> _markResolved() async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (ctx) {
        final isDark = Theme.of(ctx).brightness == Brightness.dark;
        return AlertDialog(
          backgroundColor: isDark ? const Color(0xFF1E222D) : Colors.white,
          title: Text(
            'Confirm Resolution',
            style: TextStyle(color: isDark ? Colors.white : Colors.black87, fontWeight: FontWeight.bold),
          ),
          content: Text(
            'Did this teacher response clarify your doubt completely?',
            style: TextStyle(color: isDark ? Colors.grey.shade300 : Colors.black87),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx, false),
              child: Text('Not Yet', style: TextStyle(color: isDark ? Colors.grey.shade400 : Colors.grey)),
            ),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF2E8B57),
                foregroundColor: Colors.white,
              ),
              onPressed: () => Navigator.pop(ctx, true),
              child: const Text('Yes, Mark Resolved'),
            ),
          ],
        );
      },
    );

    if (confirm != true) return;

    setState(() => _isResolving = true);
    try {
      await _service.confirmResolution(_doubt.id);
      final updated = await _service.fetchDoubtDetail(_doubt.id);
      if (mounted) {
        setState(() {
          _doubt = updated;
          _isResolving = false;
        });
        widget.onStatusChanged?.call();
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('✓ Great! Doubt marked as resolved.'),
            backgroundColor: Color(0xFF2E8B57),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isResolving = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to mark resolved: $e')),
        );
      }
    }
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
            hintText: 'Explain which step or concept in this answer still needs clarification...',
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
              backgroundColor: isDark ? AppColors.accentLight : AppColors.primary,
              foregroundColor: isDark ? Colors.black : Colors.white,
            ),
            onPressed: () async {
              final reason = controller.text.trim();
              if (reason.isEmpty) return;
              Navigator.pop(ctx);
              try {
                await _service.reopenDoubt(_doubt.id, reason);
                final updated = await _service.fetchDoubtDetail(_doubt.id);
                if (mounted) {
                  setState(() => _doubt = updated);
                  widget.onStatusChanged?.call();
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Doubt sent back to faculty for clarification.')),
                  );
                }
              } catch (e) {
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Failed to request clarification: $e')),
                  );
                }
              }
            },
            child: const Text('Submit Request'),
          ),
        ],
      ),
    );
  }

  void _openImageViewer(CommunityAttachment att) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final viewUrl = att.resolvedViewUrl;

    showDialog(
      context: context,
      builder: (ctx) {
        return Dialog(
          backgroundColor: Colors.transparent,
          insetPadding: const EdgeInsets.all(12),
          child: Stack(
            alignment: Alignment.center,
            children: [
              Container(
                width: double.infinity,
                constraints: BoxConstraints(
                  maxHeight: MediaQuery.of(context).size.height * 0.85,
                ),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF141721) : Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: const [
                    BoxShadow(color: Colors.black45, blurRadius: 20, spreadRadius: 4),
                  ],
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Header
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  att.originalFilename,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 14,
                                    color: isDark ? Colors.white : Colors.black87,
                                  ),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  'Pinch to zoom / Double tap',
                                  style: TextStyle(
                                    fontSize: 11,
                                    color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          if (viewUrl.isNotEmpty)
                            IconButton(
                              icon: const Icon(Icons.open_in_new, size: 20),
                              tooltip: 'Open in Browser / Drive',
                              onPressed: () => launchUrl(Uri.parse(viewUrl), mode: LaunchMode.externalApplication),
                            ),
                          IconButton(
                            icon: const Icon(Icons.close, size: 22),
                            onPressed: () => Navigator.pop(ctx),
                          ),
                        ],
                      ),
                    ),
                    const Divider(height: 1),
                    // Zoomable Image
                    Expanded(
                      child: ClipRRect(
                        borderRadius: const BorderRadius.vertical(bottom: Radius.circular(16)),
                        child: InteractiveViewer(
                          minScale: 0.5,
                          maxScale: 4.0,
                          child: Center(
                            child: CachedNetworkImage(
                              imageUrl: att.directImageUrl,
                              fit: BoxFit.contain,
                              placeholder: (_, __) => const Center(
                                child: CircularProgressIndicator(),
                              ),
                              errorWidget: (_, __, ___) => Center(
                                child: Padding(
                                  padding: const EdgeInsets.all(24),
                                  child: Column(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      const Icon(Icons.broken_image, size: 48, color: Colors.grey),
                                      const SizedBox(height: 12),
                                      const Text('Unable to preview image directly'),
                                      const SizedBox(height: 12),
                                      if (viewUrl.isNotEmpty)
                                        ElevatedButton.icon(
                                          onPressed: () => launchUrl(Uri.parse(viewUrl), mode: LaunchMode.externalApplication),
                                          icon: const Icon(Icons.open_in_browser),
                                          label: const Text('Open in Google Drive'),
                                        ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardBg = isDark ? const Color(0xFF1E222D) : Colors.white;
    final borderColor = isDark ? const Color(0xFF2E3545) : Colors.black.withValues(alpha: 0.08);
    final respTime = DateFormat('dd MMM yyyy, hh:mm a').format(widget.response.createdAt.toLocal());
    final attachments = widget.response.attachments;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF0F1117) : const Color(0xFFF7F8FA),
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Teacher Solution', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
            Text(
              'Doubt #${_doubt.id} • ${_doubt.classLevel} - ${_doubt.subject}',
              style: TextStyle(
                fontSize: 12,
                color: isDark ? Colors.grey.shade400 : Colors.white70,
                fontWeight: FontWeight.normal,
              ),
            ),
          ],
        ),
        backgroundColor: isDark ? const Color(0xFF161922) : AppColors.primary,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Faculty Header Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: cardBg,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: borderColor),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: isDark ? 0.3 : 0.04),
                    blurRadius: 10,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 24,
                    backgroundColor: isDark ? const Color(0xFF002350) : const Color(0xFFE2E8F0),
                    child: Icon(Icons.school, size: 26, color: isDark ? const Color(0xFFD2AE39) : AppColors.primary),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              widget.response.teacherName.isNotEmpty ? widget.response.teacherName : 'Subject Faculty',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: isDark ? Colors.white : Colors.black87,
                              ),
                            ),
                            const SizedBox(width: 6),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                              decoration: BoxDecoration(
                                color: const Color(0xFF2E8B57).withValues(alpha: 0.15),
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: const Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Icon(Icons.verified, size: 12, color: Color(0xFF2E8B57)),
                                  SizedBox(width: 3),
                                  Text(
                                    'Verified Faculty',
                                    style: TextStyle(fontSize: 10, color: Color(0xFF2E8B57), fontWeight: FontWeight.bold),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            Icon(Icons.schedule, size: 13, color: isDark ? Colors.grey.shade400 : Colors.grey.shade600),
                            const SizedBox(width: 4),
                            Text(
                              respTime,
                              style: TextStyle(fontSize: 12, color: isDark ? Colors.grey.shade400 : Colors.grey.shade600),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Doubt Question Context Card
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF181C26) : const Color(0xFFF1F5F9),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: borderColor),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: isDark ? AppColors.primaryDark : AppColors.primarySoft,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          '${_doubt.classLevel} • ${_doubt.subject}',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: isDark ? Colors.white : AppColors.primary,
                          ),
                        ),
                      ),
                      const Spacer(),
                      Text(
                        'Status: ${_doubt.status}',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          color: _doubt.status == 'Resolved' ? const Color(0xFF2E8B57) : Colors.orange,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    _doubt.title,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: isDark ? Colors.white : Colors.black87,
                    ),
                  ),
                  if (_doubt.description.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Text(
                      _doubt.description,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontSize: 12,
                        color: isDark ? Colors.grey.shade300 : Colors.grey.shade700,
                      ),
                    ),
                  ],
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Answer Explanation Box
            Text(
              'Teacher Explanation',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: isDark ? AppColors.accentLight : AppColors.primary,
              ),
            ),
            const SizedBox(height: 8),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: cardBg,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: borderColor),
              ),
              child: SelectableText(
                widget.response.responseText.isNotEmpty
                    ? widget.response.responseText
                    : 'Please check the attached solution media and documents below.',
                style: TextStyle(
                  fontSize: 15,
                  height: 1.55,
                  letterSpacing: 0.2,
                  color: isDark ? Colors.grey.shade100 : Colors.black87,
                ),
              ),
            ),

            const SizedBox(height: 24),

            // Solution Media Section
            Row(
              children: [
                Icon(Icons.attachment_rounded, size: 20, color: isDark ? AppColors.accentLight : AppColors.primary),
                const SizedBox(width: 8),
                Text(
                  'Attached Media & Solutions (${attachments.length})',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: isDark ? AppColors.accentLight : AppColors.primary,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),

            if (attachments.isEmpty)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: cardBg,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: borderColor),
                ),
                child: Text(
                  'No additional media files attached with this text explanation.',
                  style: TextStyle(
                    fontSize: 13,
                    fontStyle: FontStyle.italic,
                    color: isDark ? Colors.grey.shade400 : Colors.grey.shade600,
                  ),
                ),
              )
            else
              ...attachments.map((att) {
                final viewUrl = att.resolvedViewUrl;
                final downloadUrl = att.resolvedDownloadUrl;

                // 1. Image Card with Full Interactive Zoom Preview
                if (att.isImage) {
                  return Container(
                    margin: const EdgeInsets.only(bottom: 16),
                    decoration: BoxDecoration(
                      color: cardBg,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: borderColor),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: isDark ? 0.2 : 0.04),
                          blurRadius: 8,
                          offset: const Offset(0, 3),
                        ),
                      ],
                    ),
                    clipBehavior: Clip.antiAlias,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Top info bar
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                          child: Row(
                            children: [
                              const Icon(Icons.image, size: 18, color: Colors.blueAccent),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  att.originalFilename,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 13,
                                    color: isDark ? Colors.white : Colors.black87,
                                  ),
                                ),
                              ),
                              if (att.fileSize > 0)
                                Text(
                                  '${(att.fileSize / 1024).toStringAsFixed(1)} KB',
                                  style: TextStyle(fontSize: 11, color: isDark ? Colors.grey.shade400 : Colors.grey),
                                ),
                            ],
                          ),
                        ),
                        // Image Thumbnail with tap to open fullscreen zoom viewer
                        GestureDetector(
                          onTap: () => _openImageViewer(att),
                          child: Stack(
                            alignment: Alignment.center,
                            children: [
                              Container(
                                width: double.infinity,
                                constraints: const BoxConstraints(maxHeight: 280),
                                color: isDark ? const Color(0xFF141721) : const Color(0xFFF1F5F9),
                                child: CachedNetworkImage(
                                  imageUrl: att.directImageUrl,
                                  width: double.infinity,
                                  fit: BoxFit.contain,
                                  placeholder: (_, __) => const SizedBox(
                                    height: 180,
                                    child: Center(child: CircularProgressIndicator()),
                                  ),
                                  errorWidget: (_, __, ___) => Container(
                                    height: 140,
                                    color: isDark ? const Color(0xFF181C26) : Colors.grey.shade100,
                                    child: Center(
                                      child: Column(
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          const Icon(Icons.image_outlined, size: 40, color: Colors.grey),
                                          const SizedBox(height: 8),
                                          Text(
                                            'Tap to view solution image',
                                            style: TextStyle(
                                              fontSize: 12,
                                              color: isDark ? Colors.grey.shade400 : Colors.grey.shade700,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              // Floating Zoom Badge
                              Positioned(
                                bottom: 10,
                                right: 10,
                                child: Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                                  decoration: BoxDecoration(
                                    color: Colors.black.withValues(alpha: 0.75),
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                  child: const Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Icon(Icons.zoom_in, color: Colors.white, size: 16),
                                      SizedBox(width: 4),
                                      Text(
                                        'Pinch to Zoom',
                                        style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        // Bottom action buttons
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              TextButton.icon(
                                onPressed: () => _openImageViewer(att),
                                icon: const Icon(Icons.fullscreen, size: 18),
                                label: const Text('Fullscreen View'),
                              ),
                              if (viewUrl.isNotEmpty) ...[
                                const SizedBox(width: 8),
                                TextButton.icon(
                                  onPressed: () => launchUrl(Uri.parse(viewUrl), mode: LaunchMode.externalApplication),
                                  icon: const Icon(Icons.open_in_browser, size: 18),
                                  label: const Text('Open in Drive'),
                                ),
                              ],
                            ],
                          ),
                        ),
                      ],
                    ),
                  );
                }

                // 2. Audio Card
                if (att.isAudio) {
                  final audioUrl = att.directAudioUrl;
                  return Container(
                    margin: const EdgeInsets.only(bottom: 14),
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: cardBg,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: borderColor),
                    ),
                    child: Row(
                      children: [
                        CircleAvatar(
                          radius: 22,
                          backgroundColor: const Color(0xFFDD6B20).withValues(alpha: 0.15),
                          child: const Icon(Icons.mic, color: Color(0xFFDD6B20), size: 24),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Voice Explanation by Faculty',
                                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                att.originalFilename,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: TextStyle(fontSize: 11, color: isDark ? Colors.grey.shade400 : Colors.grey),
                              ),
                            ],
                          ),
                        ),
                        ElevatedButton.icon(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFFDD6B20),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          ),
                          onPressed: () {
                            if (audioUrl.isNotEmpty) {
                              launchUrl(Uri.parse(audioUrl), mode: LaunchMode.externalApplication);
                            }
                          },
                          icon: const Icon(Icons.play_arrow, size: 18),
                          label: const Text('Listen', style: TextStyle(fontWeight: FontWeight.bold)),
                        ),
                      ],
                    ),
                  );
                }

                // 3. Video Card
                if (att.isVideo) {
                  return Container(
                    margin: const EdgeInsets.only(bottom: 14),
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: cardBg,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: borderColor),
                    ),
                    child: Row(
                      children: [
                        CircleAvatar(
                          radius: 22,
                          backgroundColor: const Color(0xFF805AD5).withValues(alpha: 0.15),
                          child: const Icon(Icons.play_circle_fill, color: Color(0xFF805AD5), size: 24),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Video Solution by Faculty',
                                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                att.originalFilename,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: TextStyle(fontSize: 11, color: isDark ? Colors.grey.shade400 : Colors.grey),
                              ),
                            ],
                          ),
                        ),
                        ElevatedButton.icon(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF805AD5),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          ),
                          onPressed: () {
                            if (viewUrl.isNotEmpty) {
                              launchUrl(Uri.parse(viewUrl), mode: LaunchMode.externalApplication);
                            }
                          },
                          icon: const Icon(Icons.video_collection, size: 18),
                          label: const Text('Watch', style: TextStyle(fontWeight: FontWeight.bold)),
                        ),
                      ],
                    ),
                  );
                }

                // 4. PDF or Generic Document Card
                return Container(
                  margin: const EdgeInsets.only(bottom: 14),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: cardBg,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: borderColor),
                  ),
                  child: Row(
                    children: [
                      CircleAvatar(
                        radius: 22,
                        backgroundColor: (att.isPdf ? Colors.redAccent : AppColors.primary).withValues(alpha: 0.15),
                        child: Icon(
                          att.isPdf ? Icons.picture_as_pdf : Icons.insert_drive_file,
                          color: att.isPdf ? Colors.redAccent : AppColors.primary,
                          size: 24,
                        ),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              att.originalFilename,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              att.isPdf ? 'PDF Solution Document' : 'Attached Document File',
                              style: TextStyle(fontSize: 11, color: isDark ? Colors.grey.shade400 : Colors.grey),
                            ),
                          ],
                        ),
                      ),
                      OutlinedButton.icon(
                        style: OutlinedButton.styleFrom(
                          foregroundColor: isDark ? AppColors.accentLight : AppColors.primary,
                          side: BorderSide(color: isDark ? AppColors.accentLight : AppColors.primary),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        ),
                        onPressed: () {
                          final link = viewUrl.isNotEmpty ? viewUrl : downloadUrl;
                          if (link.isNotEmpty) {
                            launchUrl(Uri.parse(link), mode: LaunchMode.externalApplication);
                          }
                        },
                        icon: const Icon(Icons.open_in_new, size: 16),
                        label: const Text('Open'),
                      ),
                    ],
                  ),
                );
              }),

            // Interactive Whiteboard Canvas Card if available
            if (_doubt.publishedSolutionWhiteboard != null) ...[
              const SizedBox(height: 12),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: isDark
                        ? [const Color(0xFF1E222D), const Color(0xFF0F172A)]
                        : [const Color(0xFFF0FDF4), const Color(0xFFE2E8F0)],
                  ),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFF2E8B57).withValues(alpha: 0.3)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Row(
                      children: [
                        Icon(Icons.draw, color: Color(0xFF2E8B57), size: 22),
                        SizedBox(width: 8),
                        Text(
                          'Interactive Solution Canvas Available',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF2E8B57)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'Teacher has also solved this doubt step-by-step on the interactive digital whiteboard.',
                      style: TextStyle(fontSize: 12, color: isDark ? Colors.grey.shade300 : Colors.black87),
                    ),
                    const SizedBox(height: 12),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF2E8B57),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        ),
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => TeacherSolutionWhiteboardScreen(
                                doubtId: _doubt.id,
                                classLevel: _doubt.classLevel,
                                subject: _doubt.subject,
                                solutionWhiteboard: _doubt.publishedSolutionWhiteboard!,
                              ),
                            ),
                          );
                        },
                        icon: const Icon(Icons.gesture, size: 18),
                        label: const Text('Open Solution Whiteboard Canvas', style: TextStyle(fontWeight: FontWeight.bold)),
                      ),
                    ),
                  ],
                ),
              ),
            ],

            const SizedBox(height: 32),

            // Bottom Actions: Need Clarification & Mark Resolved
            if (_doubt.status != 'Resolved') ...[
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 13),
                        side: BorderSide(color: isDark ? AppColors.accentLight : AppColors.primary),
                        foregroundColor: isDark ? AppColors.accentLight : AppColors.primary,
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
                        padding: const EdgeInsets.symmetric(vertical: 13),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      onPressed: _isResolving ? null : _markResolved,
                      icon: _isResolving
                          ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                          : const Icon(Icons.check, size: 18),
                      label: const Text('Mark Resolved', style: TextStyle(fontWeight: FontWeight.bold)),
                    ),
                  ),
                ],
              ),
            ] else ...[
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
                      color: isDark ? AppColors.accentLight : AppColors.primary,
                      width: 1.5,
                    ),
                    foregroundColor: isDark ? AppColors.accentLight : AppColors.primary,
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

            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}
