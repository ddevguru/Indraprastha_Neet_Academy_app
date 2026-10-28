import 'dart:convert';
import 'package:flutter/material.dart';
import '../services/community_service.dart';
import '../widgets/whiteboard_canvas.dart';
import 'submit_doubt_dialog.dart';

class StudentWhiteboardScreen extends StatefulWidget {
  final int communityId;
  final String classLevel;
  final String subject;
  final Map<String, dynamic>? initialDocument;

  const StudentWhiteboardScreen({
    super.key,
    required this.communityId,
    required this.classLevel,
    required this.subject,
    this.initialDocument,
  });

  @override
  State<StudentWhiteboardScreen> createState() => _StudentWhiteboardScreenState();
}

class _StudentWhiteboardScreenState extends State<StudentWhiteboardScreen> {
  final CommunityService _service = CommunityService();
  final List<WhiteboardStroke> _strokes = [];
  final List<WhiteboardStroke> _redoStack = [];

  Color _selectedColor = const Color(0xFF002350);
  double _strokeWidth = 3.0;
  WhiteboardTool _activeTool = WhiteboardTool.pen;
  bool _isLoading = true;
  bool _isSaving = false;
  double _zoomScale = 1.0;

  final List<Color> _palette = const [
    Color(0xFF002350), // Navy
    Color(0xFFD2AE39), // Gold
    Color(0xFFE53E3E), // Red
    Color(0xFF2E8B57), // Green
    Color(0xFF3182CE), // Blue
    Color(0xFF805AD5), // Purple
    Color(0xFF000000), // Black
  ];

  @override
  void initState() {
    super.initState();
    _loadWhiteboard();
  }

  Future<void> _loadWhiteboard() async {
    setState(() => _isLoading = true);
    try {
      Map<String, dynamic>? doc = widget.initialDocument;
      if (doc == null) {
        try {
          doc = await _service.fetchWhiteboard(widget.communityId);
        } catch (_) {}
      }

      if (doc != null) {
        dynamic raw = doc['strokes'] ?? doc['elements'];
        if (raw == null && doc['documentJson'] != null) {
          final inner = doc['documentJson'];
          final parsed = inner is String ? jsonDecode(inner) : inner;
          if (parsed is Map) {
            raw = parsed['strokes'] ?? parsed['elements'];
          }
        }
        if (raw is List) {
          _strokes.clear();
          for (final item in raw) {
            if (item is Map) {
              _strokes.add(WhiteboardStroke.fromJson(Map<String, dynamic>.from(item)));
            }
          }
        }
      }
    } catch (_) {
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _saveWhiteboard({bool showToast = false}) async {
    if (_isSaving) return;
    setState(() => _isSaving = true);

    try {
      final docJson = {
        'strokes': _strokes.map((s) => s.toJson()).toList(),
        'updatedAt': DateTime.now().toIso8601String(),
      };
      await _service.saveWhiteboard(widget.communityId, documentJson: docJson);
      if (mounted && showToast) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('✓ Whiteboard saved to your cloud workspace')),
        );
      }
    } catch (e) {
      if (mounted && showToast) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to save: $e'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) setState(() => _isSaving = false);
    }
  }

  void _undo() {
    if (_strokes.isNotEmpty) {
      setState(() {
        _redoStack.add(_strokes.removeLast());
      });
    }
  }

  void _redo() {
    if (_redoStack.isNotEmpty) {
      setState(() {
        _strokes.add(_redoStack.removeLast());
      });
    }
  }

  void _clearCanvas() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Clear Canvas?'),
        content: const Text('This will erase all current drawing on your personal whiteboard.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Cancel')),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFE53E3E), foregroundColor: Colors.white),
            onPressed: () {
              Navigator.pop(ctx);
              setState(() {
                _strokes.clear();
                _redoStack.clear();
              });
            },
            child: const Text('Clear All'),
          ),
        ],
      ),
    );
  }

  void _zoomIn() {
    if (_zoomScale < 3.0) {
      setState(() => _zoomScale = (_zoomScale + 0.25).clamp(0.5, 3.0));
    }
  }

  void _zoomOut() {
    if (_zoomScale > 0.5) {
      setState(() => _zoomScale = (_zoomScale - 0.25).clamp(0.5, 3.0));
    }
  }

  void _resetZoom() {
    setState(() => _zoomScale = 1.0);
  }

  Future<void> _submitAsDoubt() async {
    final pngBytes = await WhiteboardSnapshotter.capturePng(_strokes);
    if (!mounted) return;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => SubmitDoubtDialog(
        initialClassLevel: widget.classLevel,
        initialSubject: widget.subject,
        communityId: widget.communityId,
        whiteboardSnapshotBytes: pngBytes,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    const navyColor = Color(0xFF002350);
    const goldColor = Color(0xFFD2AE39);

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF11131A) : const Color(0xFFF5F7FA),
      appBar: AppBar(
        backgroundColor: navyColor,
        foregroundColor: Colors.white,
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Row(
              children: [
                Icon(Icons.edit_note, size: 18, color: goldColor),
                SizedBox(width: 6),
                Text(
                  'My Whiteboard',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                ),
              ],
            ),
            Text(
              '${widget.classLevel} • ${widget.subject} (Private & Editable)',
              style: const TextStyle(fontSize: 11, color: Colors.white70),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: _isSaving
                ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                : const Icon(Icons.cloud_upload_outlined),
            tooltip: 'Save to Cloud',
            onPressed: _isSaving ? null : () => _saveWhiteboard(showToast: true),
          ),
          FilledButton.icon(
            style: FilledButton.styleFrom(
              backgroundColor: goldColor,
              foregroundColor: navyColor,
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              visualDensity: VisualDensity.compact,
            ),
            onPressed: _submitAsDoubt,
            icon: const Icon(Icons.send_rounded, size: 14),
            label: const Text('Ask Doubt', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11)),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : Column(
              children: [
                // Responsive Toolbar: Row 1 (Tools, History & Zoom)
                Container(
                  color: isDark ? const Color(0xFF171A22) : Colors.white,
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  child: SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: [
                        // Pen
                        IconButton(
                          icon: Icon(
                            Icons.edit,
                            size: 20,
                            color: _activeTool == WhiteboardTool.pen ? (isDark ? goldColor : navyColor) : Colors.grey,
                          ),
                          tooltip: 'Pen',
                          onPressed: () => setState(() => _activeTool = WhiteboardTool.pen),
                        ),
                        // Eraser
                        IconButton(
                          icon: Icon(
                            Icons.cleaning_services_outlined,
                            size: 20,
                            color: _activeTool == WhiteboardTool.eraser ? Colors.red : Colors.grey,
                          ),
                          tooltip: 'Eraser',
                          onPressed: () => setState(() => _activeTool = WhiteboardTool.eraser),
                        ),
                        const SizedBox(width: 4),
                        Container(width: 1, height: 24, color: Colors.grey.withValues(alpha: 0.3)),
                        const SizedBox(width: 4),

                        // Undo
                        IconButton(
                          icon: const Icon(Icons.undo, size: 20),
                          tooltip: 'Undo',
                          onPressed: _strokes.isNotEmpty ? _undo : null,
                        ),
                        // Redo
                        IconButton(
                          icon: const Icon(Icons.redo, size: 20),
                          tooltip: 'Redo',
                          onPressed: _redoStack.isNotEmpty ? _redo : null,
                        ),
                        // Clear
                        IconButton(
                          icon: const Icon(Icons.delete_outline, color: Colors.red, size: 20),
                          tooltip: 'Clear Canvas',
                          onPressed: _strokes.isNotEmpty ? _clearCanvas : null,
                        ),

                        const SizedBox(width: 4),
                        Container(width: 1, height: 24, color: Colors.grey.withValues(alpha: 0.3)),
                        const SizedBox(width: 4),

                        // Zoom Out
                        IconButton(
                          icon: const Icon(Icons.zoom_out, size: 20),
                          tooltip: 'Zoom Out',
                          onPressed: _zoomScale > 0.5 ? _zoomOut : null,
                        ),
                        // Zoom display
                        GestureDetector(
                          onTap: _resetZoom,
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: isDark ? const Color(0xFF2E3545) : Colors.grey.shade200,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              '${(_zoomScale * 100).toInt()}%',
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                                color: isDark ? Colors.white : Colors.black87,
                              ),
                            ),
                          ),
                        ),
                        // Zoom In
                        IconButton(
                          icon: const Icon(Icons.zoom_in, size: 20),
                          tooltip: 'Zoom In',
                          onPressed: _zoomScale < 3.0 ? _zoomIn : null,
                        ),
                      ],
                    ),
                  ),
                ),

                const Divider(height: 1, thickness: 1),

                // Responsive Toolbar: Row 2 (Palette & Thickness)
                Container(
                  color: isDark ? const Color(0xFF171A22) : Colors.white,
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  child: Row(
                    children: [
                      // Palette
                      Expanded(
                        child: SingleChildScrollView(
                          scrollDirection: Axis.horizontal,
                          child: Row(
                            children: _palette.map((color) {
                              final isSelected = _selectedColor == color && _activeTool != WhiteboardTool.eraser;
                              return GestureDetector(
                                onTap: () => setState(() {
                                  _selectedColor = color;
                                  _activeTool = WhiteboardTool.pen;
                                }),
                                child: Container(
                                  margin: const EdgeInsets.symmetric(horizontal: 4),
                                  width: isSelected ? 26 : 20,
                                  height: isSelected ? 26 : 20,
                                  decoration: BoxDecoration(
                                    color: color,
                                    shape: BoxShape.circle,
                                    border: Border.all(
                                      color: isSelected ? (isDark ? Colors.white : Colors.black) : Colors.grey.shade400,
                                      width: isSelected ? 2.5 : 1,
                                    ),
                                  ),
                                ),
                              );
                            }).toList(),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      // Brush thickness slider
                      SizedBox(
                        width: 90,
                        child: Slider(
                          value: _strokeWidth,
                          min: 2,
                          max: 18,
                          activeColor: isDark ? goldColor : navyColor,
                          onChanged: (v) => setState(() => _strokeWidth = v),
                        ),
                      ),
                    ],
                  ),
                ),

                // Whiteboard Drawing Canvas Area with Zoom Transform
                Expanded(
                  child: Container(
                    margin: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: isDark ? const Color(0xFF2E3545) : Colors.grey.shade300,
                        width: 1.5,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.05),
                          blurRadius: 6,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(12),
                      child: GestureDetector(
                        onPanStart: (details) {
                          final localPos = details.localPosition / _zoomScale;
                          setState(() {
                            _redoStack.clear();
                            _strokes.add(
                              WhiteboardStroke(
                                points: [localPos],
                                color: _selectedColor,
                                strokeWidth: _activeTool == WhiteboardTool.eraser ? 24.0 : _strokeWidth,
                                isEraser: _activeTool == WhiteboardTool.eraser,
                              ),
                            );
                          });
                        },
                        onPanUpdate: (details) {
                          final localPos = details.localPosition / _zoomScale;
                          setState(() {
                            if (_strokes.isNotEmpty) {
                              _strokes.last.points.add(localPos);
                            }
                          });
                        },
                        onPanEnd: (_) {
                          _saveWhiteboard(showToast: false);
                        },
                        child: CustomPaint(
                          painter: _ScaledStrokePainter(strokes: _strokes, scale: _zoomScale),
                          size: Size.infinite,
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

class _ScaledStrokePainter extends CustomPainter {
  final List<WhiteboardStroke> strokes;
  final double scale;

  _ScaledStrokePainter({required this.strokes, required this.scale});

  @override
  void paint(Canvas canvas, Size size) {
    canvas.save();
    canvas.scale(scale, scale);

    for (final stroke in strokes) {
      if (stroke.points.isEmpty) continue;

      final paint = Paint()
        ..color = stroke.isEraser ? Colors.white : stroke.color
        ..strokeWidth = stroke.strokeWidth
        ..strokeCap = StrokeCap.round
        ..strokeJoin = StrokeJoin.round
        ..style = PaintingStyle.stroke;

      if (stroke.points.length == 1) {
        canvas.drawCircle(stroke.points.first, stroke.strokeWidth / 2, paint);
      } else {
        final path = Path()..moveTo(stroke.points.first.dx, stroke.points.first.dy);
        for (int i = 1; i < stroke.points.length; i++) {
          path.lineTo(stroke.points[i].dx, stroke.points[i].dy);
        }
        canvas.drawPath(path, paint);
      }
    }

    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant _ScaledStrokePainter oldDelegate) => true;
}
