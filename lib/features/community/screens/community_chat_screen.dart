import 'dart:io';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';
import '../models/community_models.dart';
import '../services/community_service.dart';
import 'student_whiteboard_screen.dart';
import 'submit_doubt_dialog.dart';

class CommunityChatScreen extends StatefulWidget {
  final int communityId;
  final String classLevel;
  final String subject;
  final String icon;
  final Color color;

  const CommunityChatScreen({
    super.key,
    required this.communityId,
    required this.classLevel,
    required this.subject,
    required this.icon,
    required this.color,
  });

  @override
  State<CommunityChatScreen> createState() => _CommunityChatScreenState();
}

class _CommunityChatScreenState extends State<CommunityChatScreen> with SingleTickerProviderStateMixin {
  final CommunityService _service = CommunityService();
  final TextEditingController _textController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  late TabController _tabController;

  List<CommunityMessage> _messages = [];
  bool _isLoading = true;
  bool _isSending = false;
  bool _isUploading = false;
  final List<Map<String, dynamic>> _pendingAttachments = [];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _loadMessages();
  }

  @override
  void dispose() {
    _tabController.dispose();
    _textController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  Future<void> _loadMessages() async {
    setState(() => _isLoading = true);
    try {
      final msgs = await _service.fetchMessages(widget.communityId);
      if (mounted) setState(() => _messages = msgs);
      _scrollToBottom();
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load chat history: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  Future<void> _sendMessage() async {
    final text = _textController.text.trim();
    if (text.isEmpty && _pendingAttachments.isEmpty) return;

    setState(() => _isSending = true);
    try {
      final msg = await _service.sendMessage(
        widget.communityId,
        textContent: text,
        messageType: _pendingAttachments.isNotEmpty ? _pendingAttachments.first['mimeType'].toString().split('/').first : 'text',
        attachments: List.from(_pendingAttachments),
      );

      _textController.clear();
      _pendingAttachments.clear();

      if (mounted) {
        setState(() {
          _messages.add(msg);
        });
        _scrollToBottom();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Send failed: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isSending = false);
    }
  }

  Future<void> _pickAttachment(FileType type) async {
    try {
      final result = await FilePicker.platform.pickFiles(
        type: type,
        allowMultiple: false,
        withData: true,
      );
      if (result == null || result.files.isEmpty) return;

      final file = result.files.first;
      Uint8List? bytes = file.bytes;
      if (bytes == null && file.path != null) {
        bytes = await File(file.path!).readAsBytes();
      }
      if (bytes == null) return;

      setState(() => _isUploading = true);

      String mime = 'application/octet-stream';
      final name = file.name.toLowerCase();
      if (name.endsWith('.png')) {
        mime = 'image/png';
      } else if (name.endsWith('.jpg') || name.endsWith('.jpeg')) {
        mime = 'image/jpeg';
      } else if (name.endsWith('.mp4')) {
        mime = 'video/mp4';
      } else if (name.endsWith('.mp3')) {
        mime = 'audio/mp3';
      } else if (name.endsWith('.m4a')) {
        mime = 'audio/m4a';
      } else if (name.endsWith('.pdf')) {
        mime = 'application/pdf';
      }

      final res = await _service.uploadMedia(
        fileBytes: bytes,
        fileName: file.name,
        mimeType: mime,
        subfolder: '${widget.classLevel} - ${widget.subject}',
      );

      if (mounted) {
        setState(() {
          _pendingAttachments.add({
            'storageKey': res['storageKey'],
            'originalFilename': res['originalFilename'] ?? file.name,
            'mimeType': mime,
            'fileSize': res['fileSize'] ?? bytes!.length,
            'driveFileId': res['driveFileId'] ?? '',
            'driveViewLink': res['viewLink'] ?? '',
            'driveDownloadLink': res['downloadLink'] ?? '',
          });
        });
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Upload failed: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isUploading = false);
    }
  }

  void _showMessageOptions(CommunityMessage msg) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
      builder: (ctx) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (msg.textContent.isNotEmpty)
              ListTile(
                leading: const Icon(Icons.copy),
                title: const Text('Copy Text'),
                onTap: () {
                  Clipboard.setData(ClipboardData(text: msg.textContent));
                  Navigator.pop(ctx);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Copied to clipboard')),
                  );
                },
              ),
            ListTile(
              leading: const Icon(Icons.edit_outlined),
              title: const Text('Edit Message'),
              onTap: () {
                Navigator.pop(ctx);
                _editMessageDialog(msg);
              },
            ),
            ListTile(
              leading: const Icon(Icons.delete_outline, color: Colors.red),
              title: const Text('Delete Message', style: TextStyle(color: Colors.red)),
              onTap: () async {
                Navigator.pop(ctx);
                try {
                  await _service.deleteMessage(msg.id);
                  if (mounted) {
                    setState(() => _messages.removeWhere((m) => m.id == msg.id));
                  }
                } catch (e) {
                  if (mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Delete failed: $e')),
                    );
                  }
                }
              },
            ),
          ],
        ),
      ),
    );
  }

  void _editMessageDialog(CommunityMessage msg) {
    final controller = TextEditingController(text: msg.textContent);
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Edit Message'),
        content: TextField(
          controller: controller,
          maxLines: 3,
          decoration: const InputDecoration(border: OutlineInputBorder()),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () async {
              final newText = controller.text.trim();
              if (newText.isEmpty) return;
              Navigator.pop(ctx);
              try {
                await _service.editMessage(msg.id, newText);
                _loadMessages();
              } catch (e) {
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Edit failed: $e')),
                  );
                }
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _openMediaFullscreen(String url, String title) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (ctx) => Scaffold(
          backgroundColor: Colors.black,
          appBar: AppBar(
            backgroundColor: Colors.black,
            foregroundColor: Colors.white,
            title: Text(title, style: const TextStyle(fontSize: 14)),
          ),
          body: Center(
            child: InteractiveViewer(
              child: CachedNetworkImage(
                imageUrl: url,
                placeholder: (context, url) => const CircularProgressIndicator(color: Colors.white),
                errorWidget: (context, url, error) => const Icon(Icons.broken_image, color: Colors.white, size: 48),
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    const themeNavy = Color(0xFF002350);
    const themeGold = Color(0xFFD2AE39);

    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF11131A) : const Color(0xFFF5F7FA),
      appBar: AppBar(
        backgroundColor: themeNavy,
        foregroundColor: Colors.white,
        elevation: 1,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: widget.color.withValues(alpha: 0.2),
                shape: BoxShape.circle,
              ),
              child: Text(widget.icon, style: const TextStyle(fontSize: 18)),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '${widget.classLevel} — ${widget.subject}',
                    style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                  ),
                  const Text(
                    'Private Workspace • Chat & Whiteboard',
                    style: TextStyle(fontSize: 10, color: Colors.white70),
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          FilledButton.icon(
            style: FilledButton.styleFrom(
              backgroundColor: const Color(0xFFD2AE39),
              foregroundColor: const Color(0xFF002350),
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              visualDensity: VisualDensity.compact,
            ),
            icon: const Icon(Icons.help_outline, size: 16),
            label: const Text('Ask Doubt', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
            onPressed: () {
              showModalBottomSheet(
                context: context,
                isScrollControlled: true,
                backgroundColor: Colors.transparent,
                builder: (ctx) => SubmitDoubtDialog(
                  initialClassLevel: widget.classLevel,
                  initialSubject: widget.subject,
                  communityId: widget.communityId,
                ),
              );
            },
          ),
          const SizedBox(width: 4),
          IconButton(
            icon: const Icon(Icons.draw_outlined),
            tooltip: 'Whiteboard Canvas',
            onPressed: () {
              _tabController.animateTo(1);
            },
          ),
          const SizedBox(width: 4),
        ],
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: themeGold,
          indicatorWeight: 3,
          labelColor: themeGold,
          unselectedLabelColor: Colors.white70,
          labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
          tabs: const [
            Tab(
              icon: Icon(Icons.chat_bubble_outline, size: 18),
              text: 'Chat & Notes',
            ),
            Tab(
              icon: Icon(Icons.draw, size: 18),
              text: 'Whiteboard Canvas',
            ),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        physics: const NeverScrollableScrollPhysics(),
        children: [
          // Tab 0: Chat & Notes
          Column(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                color: isDark ? const Color(0xFF1E293B) : const Color(0xFFEBF8FF),
                child: Row(
                  children: [
                    Icon(Icons.lock_outline, size: 14, color: isDark ? const Color(0xFF60A5FA) : const Color(0xFF3182CE)),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'This workspace is strictly private to you. Teachers only see questions you explicitly submit via "Ask Doubt".',
                        style: TextStyle(
                          fontSize: 11,
                          color: isDark ? const Color(0xFFBFDBFE) : Colors.blue.shade900,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: _isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : _messages.isEmpty
                        ? Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(widget.icon, style: const TextStyle(fontSize: 48)),
                                const SizedBox(height: 12),
                                Text(
                                  'Welcome to ${widget.classLevel} ${widget.subject}',
                                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                                ),
                                const SizedBox(height: 6),
                                const Padding(
                                  padding: EdgeInsets.symmetric(horizontal: 40),
                                  child: Text(
                                    'Write notes, save formulas, attach diagrams, or switch to the Whiteboard tab to sketch equations.',
                                    textAlign: TextAlign.center,
                                    style: TextStyle(fontSize: 12, color: Colors.grey),
                                  ),
                                ),
                                const SizedBox(height: 16),
                                OutlinedButton.icon(
                                  onPressed: () => _tabController.animateTo(1),
                                  icon: const Icon(Icons.draw_outlined),
                                  label: const Text('Open Whiteboard Canvas'),
                                  style: OutlinedButton.styleFrom(
                                    foregroundColor: isDark ? themeGold : themeNavy,
                                    side: BorderSide(color: isDark ? themeGold : themeNavy),
                                  ),
                                ),
                              ],
                            ),
                          )
                        : ListView.builder(
                            controller: _scrollController,
                            padding: const EdgeInsets.all(16),
                            itemCount: _messages.length,
                            itemBuilder: (ctx, index) {
                              final msg = _messages[index];
                              final timeStr = DateFormat('hh:mm a').format(msg.createdAt.toLocal());
                              return Align(
                                alignment: Alignment.centerRight,
                                child: GestureDetector(
                                  onLongPress: () => _showMessageOptions(msg),
                                  child: Container(
                                    margin: const EdgeInsets.only(bottom: 12),
                                    constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.8),
                                    padding: const EdgeInsets.all(12),
                                    decoration: BoxDecoration(
                                      color: themeNavy,
                                      borderRadius: const BorderRadius.only(
                                        topLeft: Radius.circular(16),
                                        topRight: Radius.circular(16),
                                        bottomLeft: Radius.circular(16),
                                        bottomRight: Radius.circular(4),
                                      ),
                                      boxShadow: [
                                        BoxShadow(color: Colors.black.withValues(alpha: 0.06), blurRadius: 4, offset: const Offset(0, 2)),
                                      ],
                                    ),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.end,
                                      children: [
                                        if (msg.attachments.isNotEmpty) ...[
                                          ...msg.attachments.map((att) {
                                            if (att.isImage) {
                                              final link = att.driveViewLink.isNotEmpty ? att.driveViewLink : att.storageKey;
                                              return GestureDetector(
                                                onTap: () => _openMediaFullscreen(link, att.originalFilename),
                                                child: ClipRRect(
                                                  borderRadius: BorderRadius.circular(8),
                                                  child: Container(
                                                    margin: const EdgeInsets.only(bottom: 6),
                                                    child: CachedNetworkImage(
                                                      imageUrl: link,
                                                      height: 160,
                                                      width: double.infinity,
                                                      fit: BoxFit.cover,
                                                      placeholder: (context, url) => Container(
                                                        height: 160,
                                                        color: Colors.white10,
                                                        child: const Center(child: CircularProgressIndicator(strokeWidth: 2)),
                                                      ),
                                                      errorWidget: (context, url, error) => Container(
                                                        height: 100,
                                                        color: Colors.white10,
                                                        child: const Center(child: Icon(Icons.image, color: Colors.white70)),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                              );
                                            } else {
                                              return Container(
                                                margin: const EdgeInsets.only(bottom: 6),
                                                padding: const EdgeInsets.all(8),
                                                decoration: BoxDecoration(
                                                  color: Colors.white12,
                                                  borderRadius: BorderRadius.circular(8),
                                                ),
                                                child: Row(
                                                  mainAxisSize: MainAxisSize.min,
                                                  children: [
                                                    Icon(
                                                      att.isVideo ? Icons.videocam : (att.isAudio ? Icons.audiotrack : Icons.insert_drive_file),
                                                      color: themeGold,
                                                      size: 20,
                                                    ),
                                                    const SizedBox(width: 8),
                                                    Flexible(
                                                      child: Text(
                                                        att.originalFilename,
                                                        style: const TextStyle(color: Colors.white, fontSize: 12),
                                                        overflow: TextOverflow.ellipsis,
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                              );
                                            }
                                          }),
                                        ],
                                        if (msg.textContent.isNotEmpty)
                                          Align(
                                            alignment: Alignment.centerLeft,
                                            child: Text(
                                              msg.textContent,
                                              style: const TextStyle(color: Colors.white, fontSize: 14, height: 1.3),
                                            ),
                                          ),
                                        const SizedBox(height: 4),
                                        Text(
                                          timeStr,
                                          style: const TextStyle(color: Colors.white60, fontSize: 10),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              );
                            },
                          ),
              ),
              if (_pendingAttachments.isNotEmpty)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                  color: isDark ? const Color(0xFF1E222D) : Colors.grey.shade200,
                  child: SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: _pendingAttachments.asMap().entries.map((entry) {
                        final index = entry.key;
                        final att = entry.value;
                        return Padding(
                          padding: const EdgeInsets.only(right: 8),
                          child: Chip(
                            backgroundColor: isDark ? const Color(0xFF2E3545) : Colors.white,
                            avatar: const Icon(Icons.check_circle, color: Color(0xFF2E8B57), size: 16),
                            label: Text(
                              att['originalFilename'] ?? 'File',
                              style: TextStyle(fontSize: 11, color: isDark ? Colors.white : Colors.black87),
                            ),
                            onDeleted: () => setState(() => _pendingAttachments.removeAt(index)),
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                ),
              if (_isUploading)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                  color: isDark ? const Color(0xFF171A22) : Colors.white,
                  child: Row(
                    children: [
                      const SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2)),
                      const SizedBox(width: 8),
                      Text(
                        'Uploading to Admin Google Drive...',
                        style: TextStyle(fontSize: 11, color: isDark ? Colors.grey.shade400 : Colors.grey),
                      ),
                    ],
                  ),
                ),

              // Subject-specific Doubt Quick Bar
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF1E222D) : const Color(0xFFFFF9E6),
                  border: Border(
                    top: BorderSide(color: isDark ? const Color(0xFF2E3545) : const Color(0xFFFFE082)),
                    bottom: BorderSide(color: isDark ? const Color(0xFF2E3545) : const Color(0xFFFFE082)),
                  ),
                ),
                child: Row(
                  children: [
                    Icon(Icons.help_outline, size: 16, color: isDark ? const Color(0xFFD2AE39) : const Color(0xFFB78103)),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        '${widget.classLevel} ${widget.subject} Doubt?',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: isDark ? Colors.white70 : const Color(0xFF5D4037),
                        ),
                      ),
                    ),
                    TextButton.icon(
                      style: TextButton.styleFrom(
                        visualDensity: VisualDensity.compact,
                        foregroundColor: isDark ? const Color(0xFF90CDF4) : const Color(0xFF2B6CB0),
                      ),
                      onPressed: () {
                        _tabController.animateTo(1);
                      },
                      icon: const Icon(Icons.draw_outlined, size: 15),
                      label: const Text('Draw on Canvas', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600)),
                    ),
                    const SizedBox(width: 4),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFD2AE39),
                        foregroundColor: const Color(0xFF002350),
                        visualDensity: VisualDensity.compact,
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        elevation: 0,
                      ),
                      onPressed: () {
                        showModalBottomSheet(
                          context: context,
                          isScrollControlled: true,
                          backgroundColor: Colors.transparent,
                          builder: (ctx) => SubmitDoubtDialog(
                            initialClassLevel: widget.classLevel,
                            initialSubject: widget.subject,
                            communityId: widget.communityId,
                          ),
                        );
                      },
                      child: const Text('Ask Teacher →', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11)),
                    ),
                  ],
                ),
              ),

              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF171A22) : Colors.white,
                  boxShadow: [
                    BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 4, offset: const Offset(0, -2)),
                  ],
                ),
                child: SafeArea(
                  child: Row(
                    children: [
                      IconButton(
                        icon: Icon(Icons.add_circle_outline, color: isDark ? themeGold : themeNavy),
                        onPressed: _isUploading
                            ? null
                            : () {
                                showModalBottomSheet(
                                  context: context,
                                  backgroundColor: isDark ? const Color(0xFF1E222D) : Colors.white,
                                  shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
                                  builder: (ctx) => SafeArea(
                                    child: Wrap(
                                      children: [
                                        ListTile(
                                          leading: const Icon(Icons.draw, color: Color(0xFFD2AE39)),
                                          title: Text('Open Whiteboard / Canvas', style: TextStyle(color: isDark ? Colors.white : Colors.black87)),
                                          subtitle: Text('Draw equations, diagrams or mind maps', style: TextStyle(color: isDark ? Colors.grey.shade400 : Colors.grey)),
                                          onTap: () {
                                            Navigator.pop(ctx);
                                            _tabController.animateTo(1);
                                          },
                                        ),
                                        ListTile(
                                          leading: const Icon(Icons.photo_library_outlined, color: Colors.blue),
                                          title: Text('Attach Image', style: TextStyle(color: isDark ? Colors.white : Colors.black87)),
                                          onTap: () {
                                            Navigator.pop(ctx);
                                            _pickAttachment(FileType.image);
                                          },
                                        ),
                                        ListTile(
                                          leading: const Icon(Icons.video_library_outlined, color: Colors.red),
                                          title: Text('Attach Video', style: TextStyle(color: isDark ? Colors.white : Colors.black87)),
                                          onTap: () {
                                            Navigator.pop(ctx);
                                            _pickAttachment(FileType.video);
                                          },
                                        ),
                                        ListTile(
                                          leading: const Icon(Icons.mic_none, color: Colors.amber),
                                          title: Text('Attach Audio Note', style: TextStyle(color: isDark ? Colors.white : Colors.black87)),
                                          onTap: () {
                                            Navigator.pop(ctx);
                                            _pickAttachment(FileType.audio);
                                          },
                                        ),
                                        ListTile(
                                          leading: const Icon(Icons.picture_as_pdf_outlined, color: Colors.green),
                                          title: Text('Attach PDF Document', style: TextStyle(color: isDark ? Colors.white : Colors.black87)),
                                          onTap: () {
                                            Navigator.pop(ctx);
                                            _pickAttachment(FileType.custom);
                                          },
                                        ),
                                      ],
                                    ),
                                  ),
                                );
                              },
                      ),
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12),
                          decoration: BoxDecoration(
                            color: isDark ? const Color(0xFF1E222D) : const Color(0xFFF0F4F8),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: TextField(
                            controller: _textController,
                            maxLines: null,
                            keyboardType: TextInputType.multiline,
                            style: TextStyle(color: isDark ? Colors.white : Colors.black87),
                            decoration: InputDecoration(
                              hintText: 'Type notes, formulas, or questions...',
                              hintStyle: TextStyle(color: isDark ? Colors.grey.shade500 : Colors.grey.shade600),
                              border: InputBorder.none,
                              contentPadding: const EdgeInsets.symmetric(vertical: 8),
                            ),
                            onSubmitted: (_) => _sendMessage(),
                          ),
                        ),
                      ),
                      const SizedBox(width: 4),
                      IconButton(
                        icon: _isSending
                            ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2))
                            : Icon(Icons.send, color: isDark ? themeGold : themeNavy),
                        onPressed: _isSending ? null : _sendMessage,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),

          // Tab 1: Whiteboard Canvas
          StudentWhiteboardScreen(
            communityId: widget.communityId,
            classLevel: widget.classLevel,
            subject: widget.subject,
            isEmbedded: true,
            onSwitchToChat: () => _tabController.animateTo(0),
          ),
        ],
      ),
    );
  }
}
