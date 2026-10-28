import 'dart:convert';
import 'package:flutter/material.dart';
import '../widgets/whiteboard_canvas.dart';
import 'student_whiteboard_screen.dart';

class TeacherSolutionWhiteboardScreen extends StatelessWidget {
  final int doubtId;
  final String classLevel;
  final String subject;
  final Map<String, dynamic> solutionWhiteboard;
  final int? communityId;

  const TeacherSolutionWhiteboardScreen({
    super.key,
    required this.doubtId,
    required this.classLevel,
    required this.subject,
    required this.solutionWhiteboard,
    this.communityId,
  });

  List<WhiteboardStroke> _parseStrokes() {
    final rawDoc = solutionWhiteboard['documentJson'] ?? solutionWhiteboard['document_json'];
    if (rawDoc == null) return [];
    try {
      final map = rawDoc is String ? jsonDecode(rawDoc) : rawDoc;
      if (map is Map && map['elements'] is List) {
        return (map['elements'] as List)
            .map((e) => WhiteboardStroke.fromJson(Map<String, dynamic>.from(e as Map)))
            .toList();
      }
    } catch (_) {}
    return [];
  }

  void _copyToMyWhiteboard(BuildContext context) {
    if (communityId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Personal workspace ID unavailable for copy')),
      );
      return;
    }

    final rawDoc = solutionWhiteboard['documentJson'] ?? solutionWhiteboard['document_json'];

    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (ctx) => StudentWhiteboardScreen(
          communityId: communityId!,
          classLevel: classLevel,
          subject: subject,
          initialDocument: rawDoc is Map ? Map<String, dynamic>.from(rawDoc) : (rawDoc is String ? jsonDecode(rawDoc) : null),
        ),
      ),
    );

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Copied solution to your editable personal whiteboard!'),
        backgroundColor: Color(0xFF2E8B57),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final strokes = _parseStrokes();

    return Scaffold(
      backgroundColor: const Color(0xFFF5F7FA),
      appBar: AppBar(
        backgroundColor: const Color(0xFF002350),
        foregroundColor: Colors.white,
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Row(
              children: [
                Icon(Icons.lock_outline, size: 16, color: Color(0xFFD2AE39)),
                SizedBox(width: 6),
                Text(
                  'Teacher Solution — Read Only',
                  style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                ),
              ],
            ),
            Text(
              'Doubt #$doubtId • $classLevel $subject',
              style: const TextStyle(fontSize: 11, color: Colors.white70),
            ),
          ],
        ),
        actions: [
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFD2AE39),
              foregroundColor: const Color(0xFF002350),
              elevation: 0,
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            ),
            onPressed: () => _copyToMyWhiteboard(context),
            icon: const Icon(Icons.copy, size: 16),
            label: const Text('Copy to My Whiteboard', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
          ),
          const SizedBox(width: 10),
        ],
      ),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: const Color(0xFFFFFBEB),
            child: Row(
              children: [
                const Icon(Icons.visibility, color: Color(0xFFD2AE39), size: 18),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'This canvas was published by your teacher. You can pan and zoom to inspect steps. Click "Copy to My Whiteboard" to edit a private copy.',
                    style: TextStyle(fontSize: 11, color: Colors.brown.shade900),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: InteractiveViewer(
              minScale: 0.5,
              maxScale: 4.0,
              boundaryMargin: const EdgeInsets.all(200),
              child: Center(
                child: AspectRatio(
                  aspectRatio: 4 / 3,
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      boxShadow: [
                        BoxShadow(color: Colors.black.withValues(alpha: 0.1), blurRadius: 10, offset: const Offset(0, 4)),
                      ],
                    ),
                    child: CustomPaint(
                      painter: WhiteboardPainter(strokes: strokes),
                      size: Size.infinite,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
