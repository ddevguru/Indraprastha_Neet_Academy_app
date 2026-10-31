import 'dart:convert';
import 'package:flutter/material.dart';
import '../services/community_service.dart';
import '../widgets/whiteboard_canvas.dart';
import 'submit_doubt_dialog.dart';
import '../../../theme/app_tokens.dart';

class StudentWhiteboardScreen extends StatefulWidget {
  final int communityId;
  final String classLevel;
  final String subject;
  final Map<String, dynamic>? initialDocument;
  final bool isEmbedded;
  final VoidCallback? onSwitchToChat;

  const StudentWhiteboardScreen({
    super.key,
    required this.communityId,
    required this.classLevel,
    required this.subject,
    this.initialDocument,
    this.isEmbedded = false,
    this.onSwitchToChat,
  });

  @override
  State<StudentWhiteboardScreen> createState() => _StudentWhiteboardScreenState();
}

class _StudentWhiteboardScreenState extends State<StudentWhiteboardScreen> {
  final CommunityService _service = CommunityService();
  final List<WhiteboardStroke> _strokes = [];
  final List<WhiteboardStroke> _redoStack = [];

  Color _selectedColor = const Color(0xFF1E293B);
  double _strokeWidth = 3.0;
  WhiteboardTool _activeTool = WhiteboardTool.pen;
  bool _isLoading = true;
  bool _isSaving = false;
  double _zoomScale = 1.0;
  Offset _panOffset = Offset.zero;
  WhiteboardStroke? _currentStroke;
  bool _isDrawing = false;
  Size _viewportSize = const Size(800, 600);

  // Multi-touch tracking
  final Map<int, Offset> _activePointers = {};
  double _initialPinchDistance = 0.0;
  double _initialPinchScale = 1.0;
  Offset _initialPinchMidpoint = Offset.zero;
  Offset _initialPanOffset = Offset.zero;
  Offset _lastSingleFingerPos = Offset.zero;

  final List<Color> _palette = const [
    Color(0xFF1E293B), // Charcoal
    Color(0xFFE85A1C), // Brand Orange
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

  void _onPointerDown(PointerDownEvent event) {
    _activePointers[event.pointer] = event.localPosition;

    if (_activePointers.length == 1) {
      if (_activeTool == WhiteboardTool.move) {
        _lastSingleFingerPos = event.localPosition;
      } else {
        _isDrawing = true;
        _redoStack.clear();
        final worldPos = (event.localPosition - _panOffset) / _zoomScale;
        _currentStroke = WhiteboardStroke(
          points: [worldPos],
          color: _selectedColor,
          strokeWidth: _activeTool == WhiteboardTool.eraser ? 28.0 : _strokeWidth,
          isEraser: _activeTool == WhiteboardTool.eraser,
        );
        setState(() {});
      }
    } else if (_activePointers.length >= 2) {
      // 2 fingers detected: cancel drawing stroke and prepare pinch zoom / pan
      if (_isDrawing) {
        _isDrawing = false;
        _currentStroke = null;
      }
      final p1 = _activePointers.values.elementAt(0);
      final p2 = _activePointers.values.elementAt(1);
      _initialPinchDistance = (p1 - p2).distance;
      _initialPinchScale = _zoomScale;
      _initialPinchMidpoint = (p1 + p2) / 2;
      _initialPanOffset = _panOffset;
      setState(() {});
    }
  }

  void _onPointerMove(PointerMoveEvent event) {
    _activePointers[event.pointer] = event.localPosition;

    if (_activePointers.length == 1) {
      if (_activeTool == WhiteboardTool.move) {
        final delta = event.localPosition - _lastSingleFingerPos;
        _lastSingleFingerPos = event.localPosition;
        setState(() {
          _panOffset += delta;
        });
      } else if (_isDrawing && _currentStroke != null) {
        final worldPos = (event.localPosition - _panOffset) / _zoomScale;
        setState(() {
          _currentStroke!.points.add(worldPos);
        });
      }
    } else if (_activePointers.length >= 2) {
      // Pinch zoom and 2-finger pan
      final p1 = _activePointers.values.elementAt(0);
      final p2 = _activePointers.values.elementAt(1);
      final currentDistance = (p1 - p2).distance;
      final currentMidpoint = (p1 + p2) / 2;

      double newScale = _zoomScale;
      if (_initialPinchDistance > 12 && currentDistance > 12) {
        final factor = currentDistance / _initialPinchDistance;
        newScale = (_initialPinchScale * factor).clamp(0.4, 5.0);
      }

      Offset newPan = _initialPanOffset;
      if (_initialPinchScale > 0) {
        final worldFocal = (_initialPinchMidpoint - _initialPanOffset) / _initialPinchScale;
        newPan = currentMidpoint - worldFocal * newScale;
      }

      setState(() {
        _zoomScale = newScale;
        _panOffset = newPan;
      });
    }
  }

  void _onPointerUp(PointerUpEvent event) {
    _activePointers.remove(event.pointer);

    if (_activePointers.length < 2) {
      _initialPinchDistance = 0.0;
    }

    if (_activePointers.length == 1) {
      _lastSingleFingerPos = _activePointers.values.first;
    }

    if (_activePointers.isEmpty) {
      if (_isDrawing && _currentStroke != null) {
        if (_currentStroke!.points.isNotEmpty) {
          _strokes.add(_currentStroke!);
        }
        _currentStroke = null;
        _isDrawing = false;
        setState(() {});
        _saveWhiteboard(showToast: false);
      }
    }
  }

  void _onPointerCancel(PointerCancelEvent event) {
    _activePointers.remove(event.pointer);
    if (_activePointers.isEmpty) {
      _currentStroke = null;
      _isDrawing = false;
      _initialPinchDistance = 0.0;
      setState(() {});
    }
  }

  void _zoomIn() {
    _zoomAroundCenter(1.25);
  }

  void _zoomOut() {
    _zoomAroundCenter(1 / 1.25);
  }

  void _zoomAroundCenter(double factor) {
    final center = Offset(_viewportSize.width / 2, _viewportSize.height / 2);
    final newScale = (_zoomScale * factor).clamp(0.4, 5.0);
    if (_zoomScale > 0) {
      _panOffset = center - (center - _panOffset) * (newScale / _zoomScale);
    }
    setState(() {
      _zoomScale = newScale;
    });
  }

  void _resetZoomAndPan() {
    setState(() {
      _zoomScale = 1.0;
      _panOffset = Offset.zero;
    });
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
    final navyColor = AppColors.primary;
    final goldColor = AppColors.accentLight;

    final content = _isLoading
        ? const Center(child: CircularProgressIndicator())
        : Column(
            children: [
              // Responsive Toolbar: Row 1 (Tools, History, Zoom, Save, Doubt)
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
                        tooltip: 'Pen (Draw)',
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
                      // Move / Hand tool
                      IconButton(
                        icon: Icon(
                          Icons.pan_tool_outlined,
                          size: 20,
                          color: _activeTool == WhiteboardTool.move ? (isDark ? goldColor : navyColor) : Colors.grey,
                        ),
                        tooltip: 'Move Canvas (Drag to move, Pinch to zoom)',
                        onPressed: () => setState(() => _activeTool = WhiteboardTool.move),
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
                        onPressed: _zoomScale > 0.45 ? _zoomOut : null,
                      ),
                      // Zoom display
                      GestureDetector(
                        onTap: _resetZoomAndPan,
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
                        onPressed: _zoomScale < 4.9 ? _zoomIn : null,
                      ),
                      // Recenter / Reset View
                      IconButton(
                        icon: const Icon(Icons.center_focus_strong, size: 18),
                        tooltip: 'Recenter View (100%)',
                        onPressed: _resetZoomAndPan,
                      ),

                      const SizedBox(width: 4),
                      Container(width: 1, height: 24, color: Colors.grey.withValues(alpha: 0.3)),
                      const SizedBox(width: 4),

                      // Cloud Save
                      IconButton(
                        icon: _isSaving
                            ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2))
                            : Icon(Icons.cloud_upload_outlined, size: 20, color: isDark ? goldColor : navyColor),
                        tooltip: 'Save to Cloud',
                        onPressed: _isSaving ? null : () => _saveWhiteboard(showToast: true),
                      ),

                      // Fullscreen toggle (in embedded mode)
                      if (widget.isEmbedded) ...[
                        IconButton(
                          icon: const Icon(Icons.fullscreen, size: 20),
                          tooltip: 'Open Fullscreen Whiteboard',
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (ctx) => StudentWhiteboardScreen(
                                  communityId: widget.communityId,
                                  classLevel: widget.classLevel,
                                  subject: widget.subject,
                                  isEmbedded: false,
                                ),
                              ),
                            ).then((_) => _loadWhiteboard());
                          },
                        ),
                      ],

                      const SizedBox(width: 4),
                      FilledButton.icon(
                        style: FilledButton.styleFrom(
                          backgroundColor: goldColor,
                          foregroundColor: AppColors.primaryDark,
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          visualDensity: VisualDensity.compact,
                        ),
                        onPressed: _submitAsDoubt,
                        icon: const Icon(Icons.send_rounded, size: 14),
                        label: const Text('Ask Doubt', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11)),
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

              // Whiteboard Drawing Canvas Area with Multi-Touch Zoom & Pan
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
                    child: LayoutBuilder(
                      builder: (context, constraints) {
                        _viewportSize = Size(constraints.maxWidth, constraints.maxHeight);
                        final hasTransformed = _zoomScale != 1.0 || _panOffset != Offset.zero;

                        return Stack(
                          children: [
                            Positioned.fill(
                              child: Listener(
                                behavior: HitTestBehavior.opaque,
                                onPointerDown: _onPointerDown,
                                onPointerMove: _onPointerMove,
                                onPointerUp: _onPointerUp,
                                onPointerCancel: _onPointerCancel,
                                child: CustomPaint(
                                  painter: _ScaledStrokePainter(
                                    strokes: _strokes,
                                    currentStroke: _currentStroke,
                                    scale: _zoomScale,
                                    offset: _panOffset,
                                  ),
                                  size: Size.infinite,
                                ),
                              ),
                            ),

                            // Floating Re-center Badge when panned or zoomed
                            if (hasTransformed)
                              Positioned(
                                top: 10,
                                right: 10,
                                child: Material(
                                  color: Colors.transparent,
                                  child: InkWell(
                                    onTap: _resetZoomAndPan,
                                    borderRadius: BorderRadius.circular(20),
                                    child: Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                                      decoration: BoxDecoration(
                                        color: (isDark ? const Color(0xFF1E293B) : Colors.white).withValues(alpha: 0.92),
                                        borderRadius: BorderRadius.circular(20),
                                        border: Border.all(color: isDark ? goldColor : navyColor, width: 1.2),
                                        boxShadow: [
                                          BoxShadow(
                                            color: Colors.black.withValues(alpha: 0.12),
                                            blurRadius: 6,
                                            offset: const Offset(0, 2),
                                          ),
                                        ],
                                      ),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          Icon(Icons.center_focus_strong, size: 14, color: isDark ? goldColor : navyColor),
                                          const SizedBox(width: 4),
                                          Text(
                                            '${(_zoomScale * 100).toInt()}% • Reset View',
                                            style: TextStyle(
                                              fontSize: 11,
                                              fontWeight: FontWeight.bold,
                                              color: isDark ? Colors.white : navyColor,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                              ),

                            // Subtle bottom guidance pill
                            Positioned(
                              bottom: 8,
                              left: 0,
                              right: 0,
                              child: Center(
                                child: IgnorePointer(
                                  child: Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                    decoration: BoxDecoration(
                                      color: Colors.black.withValues(alpha: 0.08),
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                    child: Row(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        Icon(
                                          _activeTool == WhiteboardTool.move
                                              ? Icons.pan_tool_outlined
                                              : (_activeTool == WhiteboardTool.eraser ? Icons.cleaning_services_outlined : Icons.edit),
                                          size: 11,
                                          color: Colors.black54,
                                        ),
                                        const SizedBox(width: 5),
                                        Text(
                                          _activeTool == WhiteboardTool.move
                                              ? '1 finger: Drag to move • 2 fingers: Pinch to zoom'
                                              : '1 finger: ${_activeTool == WhiteboardTool.eraser ? "Erase" : "Draw"} • 2 fingers: Zoom & Move',
                                          style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: Colors.black54),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        );
                      },
                    ),
                  ),
                ),
              ),
            ],
          );

    if (widget.isEmbedded) {
      return Container(
        color: isDark ? const Color(0xFF11131A) : const Color(0xFFF5F7FA),
        child: content,
      );
    }

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF11131A) : const Color(0xFFF5F7FA),
      appBar: AppBar(
        backgroundColor: navyColor,
        foregroundColor: Colors.white,
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.edit_note, size: 18, color: goldColor),
                const SizedBox(width: 6),
                const Text(
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
              foregroundColor: AppColors.primaryDark,
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
      body: content,
    );
  }
}

class _ScaledStrokePainter extends CustomPainter {
  final List<WhiteboardStroke> strokes;
  final WhiteboardStroke? currentStroke;
  final double scale;
  final Offset offset;

  _ScaledStrokePainter({
    required this.strokes,
    this.currentStroke,
    required this.scale,
    required this.offset,
  });

  @override
  void paint(Canvas canvas, Size size) {
    // 1. Draw solid background
    final bgPaint = Paint()..color = Colors.white;
    canvas.drawRect(Offset.zero & size, bgPaint);

    // 2. Subtle grid dots to visualize pan/zoom navigation
    _drawGrid(canvas, size);

    // 3. Apply pan & zoom
    canvas.save();
    canvas.translate(offset.dx, offset.dy);
    canvas.scale(scale, scale);

    for (final stroke in strokes) {
      _drawSingleStroke(canvas, stroke);
    }

    if (currentStroke != null) {
      _drawSingleStroke(canvas, currentStroke!);
    }

    canvas.restore();
  }

  void _drawGrid(Canvas canvas, Size size) {
    final dotPaint = Paint()
      ..color = const Color(0xFFE2E8F0)
      ..style = PaintingStyle.fill;

    const baseSpacing = 36.0;
    final spacing = baseSpacing * scale;
    if (spacing < 14) return; // avoid dense clustering when heavily zoomed out

    final startX = offset.dx % spacing;
    final startY = offset.dy % spacing;

    for (double x = startX; x < size.width; x += spacing) {
      for (double y = startY; y < size.height; y += spacing) {
        canvas.drawCircle(Offset(x, y), 1.2, dotPaint);
      }
    }
  }

  void _drawSingleStroke(Canvas canvas, WhiteboardStroke stroke) {
    if (stroke.points.isEmpty) return;

    final paint = Paint()
      ..color = stroke.isEraser ? Colors.white : stroke.color
      ..strokeWidth = stroke.strokeWidth
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round
      ..style = PaintingStyle.stroke;

    if (stroke.points.length == 1) {
      canvas.drawCircle(stroke.points.first, stroke.strokeWidth / 2, paint..style = PaintingStyle.fill);
      return;
    }

    final path = Path()..moveTo(stroke.points.first.dx, stroke.points.first.dy);
    for (int i = 1; i < stroke.points.length; i++) {
      final p0 = stroke.points[i - 1];
      final p1 = stroke.points[i];
      path.quadraticBezierTo(
        p0.dx,
        p0.dy,
        (p0.dx + p1.dx) / 2,
        (p0.dy + p1.dy) / 2,
      );
    }
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant _ScaledStrokePainter oldDelegate) {
    return oldDelegate.strokes != strokes ||
        oldDelegate.currentStroke != currentStroke ||
        oldDelegate.scale != scale ||
        oldDelegate.offset != offset;
  }
}
