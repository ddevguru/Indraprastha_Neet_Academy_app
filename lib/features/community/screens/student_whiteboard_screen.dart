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
  WhiteboardStroke? _currentStroke;

  WhiteboardTool _activeTool = WhiteboardTool.pen;
  Color _selectedColor = const Color(0xFF002350); // Navy
  double _strokeWidth = 4.0;
  bool _isSaving = false;
  bool _isLoading = true;

  static const List<Color> _palette = [
    Color(0xFF002350), // Navy
    Color(0xFFD2AE39), // Gold
    Color(0xFF2E8B57), // Success Green
    Color(0xFFE53E3E), // Red
    Color(0xFF3182CE), // Blue
    Color(0xFF805AD5), // Purple
    Color(0xFF1A202C), // Dark Slate
  ];

  @override
  void initState() {
    super.initState();
    _loadWhiteboard();
  }

  Future<void> _loadWhiteboard() async {
    setState(() => _isLoading = true);
    try {
      if (widget.initialDocument != null) {
        _parseAndApplyDocument(widget.initialDocument!);
      } else {
        final data = await _service.fetchWhiteboard(widget.communityId);
        _parseAndApplyDocument(data['document_json']);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load whiteboard: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  void _parseAndApplyDocument(dynamic doc) {
    if (doc == null) return;
    try {
      final map = doc is String ? jsonDecode(doc) : doc;
      if (map is Map && map['elements'] is List) {
        _strokes.clear();
        for (final item in map['elements']) {
          if (item is Map) {
            _strokes.add(WhiteboardStroke.fromJson(Map<String, dynamic>.from(item)));
          }
        }
      }
    } catch (_) {}
  }

  Future<void> _saveWhiteboard({bool showToast = true}) async {
    setState(() => _isSaving = true);
    try {
      final docJson = {
        'version': 1,
        'elements': _strokes.map((s) => s.toJson()).toList(),
      };

      // Generate thumbnail snapshot
      final pngBytes = await WhiteboardSnapshotter.capturePng(_strokes);
      String snapshotLink = '';
      if (pngBytes != null) {
        try {
          final uploadRes = await _service.uploadMedia(
            fileBytes: pngBytes,
            fileName: 'whiteboard_snapshot_${DateTime.now().millisecondsSinceEpoch}.png',
            mimeType: 'image/png',
            subfolder: '${widget.classLevel} - ${widget.subject}',
          );
          snapshotLink = uploadRes['imageLink'] ?? uploadRes['viewLink'] ?? '';
        } catch (_) {}
      }

      await _service.saveWhiteboard(
        widget.communityId,
        documentJson: docJson,
        snapshotDriveLink: snapshotLink,
      );

      if (mounted) {
        if (showToast) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Whiteboard saved to cloud successfully!'),
              backgroundColor: Color(0xFF2E8B57),
              duration: Duration(seconds: 2),
            ),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Save error: $e')),
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
        content: const Text('This will erase all current drawing on this whiteboard.'),
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
                Icon(Icons.edit_note, size: 20, color: Color(0xFFD2AE39)),
                SizedBox(width: 8),
                Text(
                  'My Whiteboard — Editable',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                ),
              ],
            ),
            Text(
              '${widget.classLevel} • ${widget.subject} (Private)',
              style: const TextStyle(fontSize: 11, color: Colors.white70),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.undo),
            tooltip: 'Undo',
            onPressed: _strokes.isNotEmpty ? _undo : null,
          ),
          IconButton(
            icon: const Icon(Icons.redo),
            tooltip: 'Redo',
            onPressed: _redoStack.isNotEmpty ? _redo : null,
          ),
          IconButton(
            icon: const Icon(Icons.delete_outline),
            tooltip: 'Clear Canvas',
            onPressed: _clearCanvas,
          ),
          IconButton(
            icon: _isSaving
                ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                : const Icon(Icons.cloud_upload_outlined),
            tooltip: 'Save to Cloud',
            onPressed: _isSaving ? null : () => _saveWhiteboard(showToast: true),
          ),
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFD2AE39),
              foregroundColor: const Color(0xFF002350),
              elevation: 0,
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            ),
            onPressed: _submitAsDoubt,
            icon: const Icon(Icons.help_outline, size: 16),
            label: const Text('Ask Doubt', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : Column(
              children: [
                // Toolbar
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    boxShadow: [
                      BoxShadow(color: Colors.black.withValues(alpha: 0.04), blurRadius: 4, offset: const Offset(0, 2)),
                    ],
                  ),
                  child: Row(
                    children: [
                      IconButton(
                        icon: Icon(
                          Icons.edit,
                          color: _activeTool == WhiteboardTool.pen ? const Color(0xFF002350) : Colors.grey,
                        ),
                        tooltip: 'Pen',
                        onPressed: () => setState(() => _activeTool = WhiteboardTool.pen),
                      ),
                      IconButton(
                        icon: Icon(
                          Icons.cleaning_services,
                          color: _activeTool == WhiteboardTool.eraser ? const Color(0xFF002350) : Colors.grey,
                        ),
                        tooltip: 'Eraser',
                        onPressed: () => setState(() => _activeTool = WhiteboardTool.eraser),
                      ),
                      const VerticalDivider(width: 16, thickness: 1),
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
                                  width: isSelected ? 28 : 22,
                                  height: isSelected ? 28 : 22,
                                  decoration: BoxDecoration(
                                    color: color,
                                    shape: BoxShape.circle,
                                    border: isSelected
                                        ? Border.all(color: Colors.black, width: 2)
                                        : Border.all(color: Colors.grey.shade300, width: 1),
                                  ),
                                ),
                              );
                            }).toList(),
                          ),
                        ),
                      ),
                      SizedBox(
                        width: 100,
                        child: Slider(
                          value: _strokeWidth,
                          min: 2,
                          max: 20,
                          activeColor: const Color(0xFF002350),
                          onChanged: (v) => setState(() => _strokeWidth = v),
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: ClipRect(
                    child: GestureDetector(
                      onPanStart: (details) {
                        setState(() {
                          _currentStroke = WhiteboardStroke(
                            points: [details.localPosition],
                            color: _selectedColor,
                            strokeWidth: _activeTool == WhiteboardTool.eraser ? _strokeWidth * 3 : _strokeWidth,
                            isEraser: _activeTool == WhiteboardTool.eraser,
                          );
                        });
                      },
                      onPanUpdate: (details) {
                        if (_currentStroke == null) return;
                        setState(() {
                          _currentStroke!.points.add(details.localPosition);
                        });
                      },
                      onPanEnd: (_) {
                        if (_currentStroke != null) {
                          setState(() {
                            _strokes.add(_currentStroke!);
                            _currentStroke = null;
                            _redoStack.clear();
                          });
                        }
                      },
                      child: CustomPaint(
                        painter: WhiteboardPainter(
                          strokes: _strokes,
                          currentStroke: _currentStroke,
                        ),
                        size: Size.infinite,
                      ),
                    ),
                  ),
                ),
              ],
            ),
    );
  }
}
