import 'dart:async';
import 'dart:io';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';
import 'package:path_provider/path_provider.dart';
import 'package:record/record.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/community_models.dart';
import '../services/community_service.dart';
import 'my_doubts_screen.dart';

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

class _CommunityChatScreenState extends State<CommunityChatScreen> {
  final CommunityService _service = CommunityService();
  final TextEditingController _textController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  List<CommunityMessage> _messages = [];
  bool _isLoading = true;
  bool _isSending = false;
  bool _isUploading = false;
  final List<Map<String, dynamic>> _pendingAttachments = [];

  // Voice Recording state
  AudioRecorder? _audioRecorder;
  bool _isRecording = false;
  int _recordSeconds = 0;
  Timer? _recordTimer;
  String? _recordingPath;

  @override
  void initState() {
    super.initState();
    _audioRecorder = AudioRecorder();
    _loadMessages();
  }

  @override
  void dispose() {
    _recordTimer?.cancel();
    _audioRecorder?.dispose();
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
      final attachments = List<Map<String, dynamic>>.from(_pendingAttachments);

      // 1. Submit as Doubt so it immediately appears in 'My Doubts' and Teacher App Queue
      DoubtItem? doubt;
      try {
        final title = text.isNotEmpty
            ? (text.length > 60 ? '${text.substring(0, 57)}...' : text)
            : (attachments.isNotEmpty ? 'Question: ${attachments.first['originalFilename'] ?? 'Media'}' : 'New Question');
        final desc = text.isNotEmpty ? text : 'Please see the attached question.';

        doubt = await _service.submitDoubt(
          title: title,
          description: desc,
          classLevel: widget.classLevel,
          subject: widget.subject,
          communityId: widget.communityId,
          attachments: attachments,
        );
      } catch (e) {
        debugPrint('[SUBMIT_DOUBT_FROM_CHAT_ERROR] $e');
      }

      // 2. Send message into Subject Chat Workspace with doubtId link
      final msg = await _service.sendMessage(
        widget.communityId,
        textContent: text,
        messageType: attachments.isNotEmpty
            ? attachments.first['mimeType'].toString().split('/').first
            : 'text',
        attachments: attachments,
        doubtId: doubt?.id,
      );

      _textController.clear();
      _pendingAttachments.clear();

      if (mounted) {
        setState(() {
          _messages.add(msg);
        });
        _scrollToBottom();

        if (doubt != null) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Doubt #${doubt.id} submitted! Visible in "My Doubts" section.'),
              backgroundColor: const Color(0xFF2E8B57),
              duration: const Duration(seconds: 4),
              action: SnackBarAction(
                label: 'View Doubts',
                textColor: const Color(0xFFD2AE39),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (ctx) => const MyDoubtsScreen(),
                    ),
                  );
                },
              ),
            ),
          );
        }
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

  Future<void> _startRecording() async {
    try {
      if (_audioRecorder == null) return;
      if (!await _audioRecorder!.hasPermission()) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Microphone permission is required to record voice notes.')),
          );
        }
        return;
      }

      final tempDir = await getTemporaryDirectory();
      final path = '${tempDir.path}/voice_note_${DateTime.now().millisecondsSinceEpoch}.m4a';
      _recordingPath = path;

      await _audioRecorder!.start(
        const RecordConfig(
          encoder: AudioEncoder.aacLc,
          bitRate: 128000,
          sampleRate: 44100,
        ),
        path: path,
      );

      setState(() {
        _isRecording = true;
        _recordSeconds = 0;
      });

      _recordTimer?.cancel();
      _recordTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
        if (mounted && _isRecording) {
          setState(() => _recordSeconds++);
        }
      });
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Could not start recording: $e')),
        );
      }
    }
  }

  Future<void> _cancelRecording() async {
    try {
      _recordTimer?.cancel();
      if (_audioRecorder != null && await _audioRecorder!.isRecording()) {
        await _audioRecorder!.stop();
      }
      if (_recordingPath != null) {
        final f = File(_recordingPath!);
        if (await f.exists()) {
          await f.delete();
        }
      }
    } catch (e) {
      debugPrint('[CANCEL_RECORD_ERROR] $e');
    } finally {
      if (mounted) {
        setState(() {
          _isRecording = false;
          _recordSeconds = 0;
          _recordingPath = null;
        });
      }
    }
  }

  Future<void> _finishRecording() async {
    try {
      _recordTimer?.cancel();
      if (_audioRecorder == null) return;
      final path = await _audioRecorder!.stop();
      setState(() {
        _isRecording = false;
      });

      final finalPath = path ?? _recordingPath;
      if (finalPath == null) return;
      final file = File(finalPath);
      if (!await file.exists()) return;

      final bytes = await file.readAsBytes();
      if (bytes.isEmpty) return;

      setState(() => _isUploading = true);

      final fileName = 'voice_note_${DateTime.now().millisecondsSinceEpoch}.m4a';
      final res = await _service.uploadMedia(
        fileBytes: bytes,
        fileName: fileName,
        mimeType: 'audio/m4a',
        subfolder: '${widget.classLevel} - ${widget.subject}',
      );

      if (mounted) {
        setState(() {
          _pendingAttachments.add({
            'storageKey': res['storageKey'],
            'originalFilename': fileName,
            'mimeType': 'audio/m4a',
            'fileSize': res['fileSize'] ?? bytes.length,
            'driveFileId': res['driveFileId'] ?? '',
            'driveViewLink': res['viewLink'] ?? '',
            'driveDownloadLink': res['downloadLink'] ?? '',
          });
        });

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Voice note recorded & attached! Tap Send to submit.'),
            backgroundColor: Color(0xFF2E8B57),
            duration: Duration(seconds: 2),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to save voice note: $e')),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isUploading = false;
          _recordSeconds = 0;
          _recordingPath = null;
        });
      }
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
                    'Private Subject Workspace • Direct Chat',
                    style: TextStyle(fontSize: 10, color: Colors.white70),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: isDark ? const Color(0xFF1E293B) : const Color(0xFFEBF8FF),
            child: Row(
              children: [
                Icon(Icons.info_outline, size: 15, color: isDark ? const Color(0xFF60A5FA) : const Color(0xFF3182CE)),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Directly type your doubts, questions, or notes below. Teachers can review and assist you right here.',
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
                                'Ask doubts, send questions, or attach images, audio notes, and documents directly in this chat.',
                                textAlign: TextAlign.center,
                                style: TextStyle(fontSize: 12, color: Colors.grey),
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
                                        if (msg.doubtId != null)
                                          Container(
                                            margin: const EdgeInsets.only(bottom: 6),
                                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                            decoration: BoxDecoration(
                                              color: themeGold.withValues(alpha: 0.25),
                                              borderRadius: BorderRadius.circular(6),
                                            ),
                                            child: Row(
                                              mainAxisSize: MainAxisSize.min,
                                              children: [
                                                const Icon(Icons.help_outline, size: 12, color: themeGold),
                                                const SizedBox(width: 4),
                                                Text(
                                                  'Doubt #${msg.doubtId}',
                                                  style: const TextStyle(
                                                    color: themeGold,
                                                    fontSize: 11,
                                                    fontWeight: FontWeight.bold,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        if (msg.attachments.isNotEmpty) ...[
                                          ...msg.attachments.map((att) {
                                            if (att.isImage) {
                                              final link = att.directImageUrl;
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
                                              return InkWell(
                                                onTap: () {
                                                  final link = att.isAudio
                                                      ? att.directAudioUrl
                                                      : (att.driveViewLink.isNotEmpty
                                                          ? att.driveViewLink
                                                          : (att.driveDownloadLink.isNotEmpty ? att.driveDownloadLink : att.storageKey));
                                                  if (link.isNotEmpty) {
                                                    launchUrl(Uri.parse(link), mode: LaunchMode.externalApplication);
                                                  }
                                                },
                                                borderRadius: BorderRadius.circular(8),
                                                child: Container(
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
                                                      const SizedBox(width: 6),
                                                      const Icon(Icons.open_in_new, color: Colors.white60, size: 13),
                                                    ],
                                                  ),
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
                                        Row(
                                          mainAxisSize: MainAxisSize.min,
                                          children: [
                                            Text(
                                              timeStr,
                                              style: const TextStyle(color: Colors.white60, fontSize: 10),
                                            ),
                                            if (msg.doubtId != null) ...[
                                              const SizedBox(width: 6),
                                              const Icon(Icons.check_circle_outline, color: themeGold, size: 11),
                                              const SizedBox(width: 2),
                                              const Text(
                                                'Active Doubt',
                                                style: TextStyle(color: themeGold, fontSize: 10, fontWeight: FontWeight.bold),
                                              ),
                                            ],
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
                                          leading: const Icon(Icons.photo_library_outlined, color: Colors.blue),
                                          title: Text('Attach Image', style: TextStyle(color: isDark ? Colors.white : Colors.black87)),
                                          onTap: () {
                                            Navigator.pop(ctx);
                                            _pickAttachment(FileType.image);
                                          },
                                        ),
                                        ListTile(
                                          leading: const Icon(Icons.mic, color: Colors.redAccent),
                                          title: Text('Record Voice Note (Mic)', style: TextStyle(color: isDark ? Colors.white : Colors.black87, fontWeight: FontWeight.bold)),
                                          subtitle: Text('Record live voice explanation directly with microphone', style: TextStyle(color: isDark ? Colors.white54 : Colors.black54, fontSize: 11)),
                                          onTap: () {
                                            Navigator.pop(ctx);
                                            _startRecording();
                                          },
                                        ),
                                        ListTile(
                                          leading: const Icon(Icons.audio_file_outlined, color: Colors.amber),
                                          title: Text('Pick Audio File (Storage)', style: TextStyle(color: isDark ? Colors.white : Colors.black87, fontWeight: FontWeight.bold)),
                                          subtitle: Text('Choose existing .mp3, .m4a, or .wav file from device', style: TextStyle(color: isDark ? Colors.white54 : Colors.black54, fontSize: 11)),
                                          onTap: () {
                                            Navigator.pop(ctx);
                                            _pickAttachment(FileType.audio);
                                          },
                                        ),
                                        ListTile(
                                          leading: const Icon(Icons.video_library_outlined, color: Colors.deepPurple),
                                          title: Text('Attach Video', style: TextStyle(color: isDark ? Colors.white : Colors.black87)),
                                          onTap: () {
                                            Navigator.pop(ctx);
                                            _pickAttachment(FileType.video);
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
                      if (_isRecording)
                        Expanded(
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                            decoration: BoxDecoration(
                              color: Colors.red.withValues(alpha: isDark ? 0.2 : 0.1),
                              borderRadius: BorderRadius.circular(24),
                              border: Border.all(color: Colors.red.withValues(alpha: 0.5)),
                            ),
                            child: Row(
                              children: [
                                const Icon(Icons.fiber_manual_record, color: Colors.red, size: 16),
                                const SizedBox(width: 8),
                                Text(
                                  'Recording  ${(_recordSeconds ~/ 60).toString().padLeft(2, '0')}:${(_recordSeconds % 60).toString().padLeft(2, '0')}',
                                  style: const TextStyle(color: Colors.red, fontWeight: FontWeight.bold, fontSize: 13),
                                ),
                                const Spacer(),
                                IconButton(
                                  tooltip: 'Cancel & Discard',
                                  icon: const Icon(Icons.delete_outline, color: Colors.red, size: 22),
                                  onPressed: _cancelRecording,
                                ),
                                IconButton(
                                  tooltip: 'Attach Voice Note',
                                  icon: const Icon(Icons.check_circle, color: Color(0xFF2E8B57), size: 26),
                                  onPressed: _finishRecording,
                                ),
                              ],
                            ),
                          ),
                        )
                      else ...[
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
                                hintText: 'Type your question, doubt, or note here...',
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
                          tooltip: 'Record Voice Note',
                          icon: Icon(Icons.mic, color: isDark ? themeGold : themeNavy),
                          onPressed: _isUploading || _isSending ? null : _startRecording,
                        ),
                        IconButton(
                          tooltip: 'Send',
                          icon: _isSending
                              ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2))
                              : Icon(Icons.send, color: isDark ? themeGold : themeNavy),
                          onPressed: _isSending ? null : _sendMessage,
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ],
          ),
    );
  }
}
