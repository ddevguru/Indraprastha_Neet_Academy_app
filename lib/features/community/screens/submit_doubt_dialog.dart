import 'dart:io';
import 'dart:typed_data';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import '../services/community_service.dart';

class SubmitDoubtDialog extends StatefulWidget {
  final String initialClassLevel;
  final String initialSubject;
  final int? communityId;
  final Uint8List? whiteboardSnapshotBytes;

  const SubmitDoubtDialog({
    super.key,
    required this.initialClassLevel,
    required this.initialSubject,
    this.communityId,
    this.whiteboardSnapshotBytes,
  });

  @override
  State<SubmitDoubtDialog> createState() => _SubmitDoubtDialogState();
}

class _SubmitDoubtDialogState extends State<SubmitDoubtDialog> {
  final CommunityService _service = CommunityService();

  late String _selectedClass;
  late String _selectedSubject;
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descController = TextEditingController();

  final List<Map<String, dynamic>> _attachments = [];
  bool _isUploading = false;
  bool _isSubmitting = false;

  final List<String> _classes = ['Class 11', 'Class 12'];
  final List<String> _subjects = ['Physics', 'Chemistry', 'Biology'];

  @override
  void initState() {
    super.initState();
    _selectedClass = widget.initialClassLevel.isNotEmpty ? widget.initialClassLevel : 'Class 11';
    _selectedSubject = widget.initialSubject.isNotEmpty ? widget.initialSubject : 'Physics';

    if (widget.whiteboardSnapshotBytes != null) {
      _uploadSnapshot(widget.whiteboardSnapshotBytes!);
    }
  }

  Future<void> _uploadSnapshot(Uint8List bytes) async {
    setState(() => _isUploading = true);
    try {
      final res = await _service.uploadMedia(
        fileBytes: bytes,
        fileName: 'whiteboard_query_${DateTime.now().millisecondsSinceEpoch}.png',
        mimeType: 'image/png',
        subfolder: 'DoubtMedia',
      );
      if (mounted) {
        setState(() {
          _attachments.add({
            'storageKey': res['storageKey'],
            'originalFilename': res['originalFilename'] ?? 'whiteboard_snapshot.png',
            'mimeType': 'image/png',
            'fileSize': res['fileSize'] ?? bytes.length,
            'driveFileId': res['driveFileId'] ?? '',
            'driveViewLink': res['viewLink'] ?? '',
            'driveDownloadLink': res['downloadLink'] ?? '',
          });
        });
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to attach whiteboard snapshot: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isUploading = false);
    }
  }

  Future<void> _pickAndUploadMedia(FileType type) async {
    try {
      final result = await FilePicker.platform.pickFiles(
        type: type,
        allowMultiple: false,
        withData: true,
      );

      if (result == null || result.files.isEmpty) return;

      final pickedFile = result.files.first;
      Uint8List? bytes = pickedFile.bytes;
      if (bytes == null && pickedFile.path != null) {
        bytes = await File(pickedFile.path!).readAsBytes();
      }

      if (bytes == null) return;

      setState(() => _isUploading = true);

      String mime = 'application/octet-stream';
      final name = pickedFile.name.toLowerCase();
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

      final uploadRes = await _service.uploadMedia(
        fileBytes: bytes,
        fileName: pickedFile.name,
        mimeType: mime,
        subfolder: 'DoubtMedia',
      );

      if (mounted) {
        setState(() {
          _attachments.add({
            'storageKey': uploadRes['storageKey'],
            'originalFilename': uploadRes['originalFilename'] ?? pickedFile.name,
            'mimeType': mime,
            'fileSize': uploadRes['fileSize'] ?? bytes!.length,
            'driveFileId': uploadRes['driveFileId'] ?? '',
            'driveViewLink': uploadRes['viewLink'] ?? '',
            'driveDownloadLink': uploadRes['downloadLink'] ?? '',
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

  Future<void> _submitDoubt() async {
    final title = _titleController.text.trim();
    final desc = _descController.text.trim();

    if (title.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter a brief doubt title')),
      );
      return;
    }
    if (desc.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please describe your doubt or concept difficulty')),
      );
      return;
    }

    setState(() => _isSubmitting = true);
    try {
      final doubt = await _service.submitDoubt(
        title: title,
        description: desc,
        classLevel: _selectedClass,
        subject: _selectedSubject,
        communityId: widget.communityId,
        attachments: _attachments,
      );

      if (mounted) {
        Navigator.pop(context, doubt);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Doubt #${doubt.id} submitted! Assigned teachers will respond soon.'),
            backgroundColor: const Color(0xFF2E8B57),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Submission failed: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isSubmitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final primaryColor = isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350);

    return Container(
      padding: EdgeInsets.only(
        top: 20,
        left: 20,
        right: 20,
        bottom: MediaQuery.of(context).viewInsets.bottom + 20,
      ),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF171A22) : Colors.white,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: (isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350)).withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Icon(Icons.help_outline, color: primaryColor, size: 22),
                    ),
                    const SizedBox(width: 10),
                    Text(
                      'Ask Teacher / Submit Doubt',
                      style: TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.bold,
                        color: isDark ? Colors.white : const Color(0xFF002350),
                      ),
                    ),
                  ],
                ),
                IconButton(
                  icon: Icon(Icons.close, color: isDark ? Colors.white70 : Colors.black54),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
            const Divider(height: 24),

            // Class and Subject selector
            Row(
              children: [
                Expanded(
                  child: DropdownButtonFormField<String>(
                    initialValue: _selectedClass,
                    dropdownColor: isDark ? const Color(0xFF1E222D) : Colors.white,
                    style: TextStyle(color: isDark ? Colors.white : Colors.black87),
                    decoration: InputDecoration(
                      labelText: 'Class',
                      labelStyle: TextStyle(color: isDark ? Colors.white70 : null),
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    ),
                    items: _classes.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList(),
                    onChanged: (v) => setState(() => _selectedClass = v!),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: DropdownButtonFormField<String>(
                    initialValue: _selectedSubject,
                    dropdownColor: isDark ? const Color(0xFF1E222D) : Colors.white,
                    style: TextStyle(color: isDark ? Colors.white : Colors.black87),
                    decoration: InputDecoration(
                      labelText: 'Subject',
                      labelStyle: TextStyle(color: isDark ? Colors.white70 : null),
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    ),
                    items: _subjects.map((s) => DropdownMenuItem(value: s, child: Text(s))).toList(),
                    onChanged: (v) => setState(() => _selectedSubject = v!),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Title
            TextField(
              controller: _titleController,
              style: TextStyle(color: isDark ? Colors.white : Colors.black87),
              decoration: InputDecoration(
                labelText: 'Topic / Doubt Title *',
                labelStyle: TextStyle(color: isDark ? Colors.white70 : null),
                hintText: 'e.g. Lenz Law Direction, Aldol Condensation Mechanism',
                hintStyle: TextStyle(color: isDark ? Colors.white38 : null),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
              ),
            ),
            const SizedBox(height: 14),

            // Description
            TextField(
              controller: _descController,
              maxLines: 4,
              style: TextStyle(color: isDark ? Colors.white : Colors.black87),
              decoration: InputDecoration(
                labelText: 'Detailed Explanation of your Doubt *',
                labelStyle: TextStyle(color: isDark ? Colors.white70 : null),
                hintText: 'State where you are stuck, formulas tried, or specific step question...',
                hintStyle: TextStyle(color: isDark ? Colors.white38 : null),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
              ),
            ),
            const SizedBox(height: 14),

            // Media Attachments
            Text(
              'Attach Media (Uploaded directly to Google Drive):',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                color: isDark ? Colors.white70 : Colors.black87,
              ),
            ),
            const SizedBox(height: 8),

            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                OutlinedButton.icon(
                  onPressed: _isUploading ? null : () => _pickAndUploadMedia(FileType.image),
                  icon: const Icon(Icons.photo_outlined, size: 16),
                  label: const Text('Image', style: TextStyle(fontSize: 12)),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: isDark ? Colors.white : const Color(0xFF002350),
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  ),
                ),
                OutlinedButton.icon(
                  onPressed: _isUploading ? null : () => _pickAndUploadMedia(FileType.video),
                  icon: const Icon(Icons.videocam_outlined, size: 16),
                  label: const Text('Video', style: TextStyle(fontSize: 12)),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: isDark ? Colors.white : const Color(0xFF002350),
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  ),
                ),
                OutlinedButton.icon(
                  onPressed: _isUploading ? null : () => _pickAndUploadMedia(FileType.audio),
                  icon: const Icon(Icons.mic_none, size: 16),
                  label: const Text('Audio', style: TextStyle(fontSize: 12)),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: isDark ? Colors.white : const Color(0xFF002350),
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  ),
                ),
                OutlinedButton.icon(
                  onPressed: _isUploading ? null : () => _pickAndUploadMedia(FileType.custom),
                  icon: const Icon(Icons.picture_as_pdf_outlined, size: 16),
                  label: const Text('PDF / Doc', style: TextStyle(fontSize: 12)),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: isDark ? Colors.white : const Color(0xFF002350),
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  ),
                ),
              ],
            ),

            if (_isUploading) ...[
              const SizedBox(height: 10),
              Row(
                children: [
                  const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2)),
                  const SizedBox(width: 10),
                  Text(
                    'Uploading directly to Admin Google Drive...',
                    style: TextStyle(fontSize: 12, color: isDark ? Colors.white60 : Colors.grey),
                  ),
                ],
              ),
            ],

            if (_attachments.isNotEmpty) ...[
              const SizedBox(height: 10),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: _attachments.asMap().entries.map((entry) {
                  final index = entry.key;
                  final att = entry.value;
                  return Chip(
                    backgroundColor: isDark ? const Color(0xFF1E222D) : null,
                    avatar: const Icon(Icons.cloud_done, color: Color(0xFF2E8B57), size: 16),
                    label: Text(
                      att['originalFilename'] ?? 'File',
                      style: TextStyle(
                        fontSize: 11,
                        color: isDark ? Colors.white : Colors.black87,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                    onDeleted: () => setState(() => _attachments.removeAt(index)),
                    deleteIconColor: Colors.red,
                  );
                }).toList(),
              ),
            ],

            const SizedBox(height: 20),

            // Submit Button
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: isDark ? const Color(0xFFD2AE39) : const Color(0xFF002350),
                  foregroundColor: isDark ? const Color(0xFF002350) : Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                onPressed: _isSubmitting || _isUploading ? null : _submitDoubt,
                child: _isSubmitting
                    ? CircularProgressIndicator(color: isDark ? const Color(0xFF002350) : Colors.white)
                    : const Text(
                        'Submit Doubt to Teachers',
                        style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
