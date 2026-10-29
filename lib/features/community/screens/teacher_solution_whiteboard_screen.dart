import 'dart:convert';
import 'package:flutter/material.dart';
import '../widgets/whiteboard_canvas.dart';

class TeacherSolutionWhiteboardScreen extends StatefulWidget {
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

  @override
  State<TeacherSolutionWhiteboardScreen> createState() => _TeacherSolutionWhiteboardScreenState();
}

class _TeacherSolutionWhiteboardScreenState extends State<TeacherSolutionWhiteboardScreen> {
  final TransformationController _transController = TransformationController();
  double _currentScale = 1.0;

  @override
  void initState() {
    super.initState();
    _transController.addListener(_onTransformChanged);
  }

  @override
  void dispose() {
    _transController.removeListener(_onTransformChanged);
    _transController.dispose();
    super.dispose();
  }

  void _onTransformChanged() {
    final scale = _transController.value.getMaxScaleOnAxis();
    if (scale != _currentScale) {
      setState(() => _currentScale = scale);
    }
  }

  void _zoomIn() {
    final newScale = (_currentScale * 1.25).clamp(0.5, 4.0);
    _setZoom(newScale);
  }

  void _zoomOut() {
    final newScale = (_currentScale / 1.25).clamp(0.5, 4.0);
    _setZoom(newScale);
  }

  void _resetZoom() {
    _transController.value = Matrix4.identity();
    setState(() => _currentScale = 1.0);
  }

  void _setZoom(double targetScale) {
    _transController.value = Matrix4.diagonal3Values(targetScale, targetScale, 1.0);
    setState(() => _currentScale = targetScale);
  }

  List<WhiteboardStroke> _parseStrokes() {
    final rawDoc = widget.solutionWhiteboard['documentJson'] ?? widget.solutionWhiteboard['document_json'];
    if (rawDoc == null) return [];
    try {
      final map = rawDoc is String ? jsonDecode(rawDoc) : rawDoc;
      if (map is Map && map['elements'] is List) {
        return (map['elements'] as List)
            .map((e) => WhiteboardStroke.fromJson(Map<String, dynamic>.from(e as Map)))
            .toList();
      }
      if (map is Map && map['strokes'] is List) {
        return (map['strokes'] as List)
            .map((e) => WhiteboardStroke.fromJson(Map<String, dynamic>.from(e as Map)))
            .toList();
      }
    } catch (_) {}
    return [];
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final strokes = _parseStrokes();

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF11131A) : const Color(0xFFF5F7FA),
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
              'Doubt #${widget.doubtId} • ${widget.classLevel} ${widget.subject}',
              style: const TextStyle(fontSize: 11, color: Colors.white70),
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          // Banner
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: isDark ? const Color(0xFF1E222D) : const Color(0xFFFFFBEB),
            child: Row(
              children: [
                const Icon(Icons.visibility, color: Color(0xFFD2AE39), size: 18),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'This solution canvas was drawn and published by your teacher. You can pan and zoom to inspect steps.',
                    style: TextStyle(
                      fontSize: 11,
                      color: isDark ? Colors.white70 : Colors.brown.shade900,
                    ),
                  ),
                ),
                // Zoom toolbar controls
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    IconButton(
                      icon: Icon(Icons.zoom_out, size: 18, color: isDark ? Colors.white70 : Colors.black87),
                      padding: EdgeInsets.zero,
                      constraints: const BoxConstraints(),
                      tooltip: 'Zoom Out',
                      onPressed: _zoomOut,
                    ),
                    const SizedBox(width: 6),
                    GestureDetector(
                      onTap: _resetZoom,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: isDark ? const Color(0xFF2E3545) : Colors.grey.shade300,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          '${(_currentScale * 100).toInt()}%',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: isDark ? Colors.white : Colors.black87,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 6),
                    IconButton(
                      icon: Icon(Icons.zoom_in, size: 18, color: isDark ? Colors.white70 : Colors.black87),
                      padding: EdgeInsets.zero,
                      constraints: const BoxConstraints(),
                      tooltip: 'Zoom In',
                      onPressed: _zoomIn,
                    ),
                  ],
                ),
              ],
            ),
          ),
          Expanded(
            child: InteractiveViewer(
              transformationController: _transController,
              minScale: 0.5,
              maxScale: 4.0,
              boundaryMargin: const EdgeInsets.all(200),
              child: Center(
                child: AspectRatio(
                  aspectRatio: 4 / 3,
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      border: Border.all(
                        color: isDark ? const Color(0xFF2E3545) : Colors.grey.shade300,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.15),
                          blurRadius: 10,
                          offset: const Offset(0, 4),
                        ),
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
