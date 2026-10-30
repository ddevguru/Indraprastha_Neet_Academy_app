import 'dart:convert';
import 'package:flutter/material.dart';
import '../services/teacher_api_service.dart';
import '../theme/app_tokens.dart';

class WhiteboardStroke {
  final List<Offset> points;
  final Color color;
  final double strokeWidth;
  final bool isEraser;

  WhiteboardStroke({
    required this.points,
    required this.color,
    required this.strokeWidth,
    this.isEraser = false,
  });

  Map<String, dynamic> toJson() => {
        'color': color.toARGB32(),
        'strokeWidth': strokeWidth,
        'isEraser': isEraser,
        'points': points.map((p) => {'x': p.dx, 'y': p.dy}).toList(),
      };

  factory WhiteboardStroke.fromJson(Map<String, dynamic> json) {
    Color parseColor(dynamic c) {
      if (c == null) return const Color(0xFF002350);
      if (c is int) return Color(c);
      if (c is num) return Color(c.toInt());
      if (c is String) {
        try {
          final clean = c.replaceAll('#', '').trim();
          if (clean.length == 6) return Color(int.parse('FF$clean', radix: 16));
          if (clean.length == 8) return Color(int.parse(clean, radix: 16));
          return Color(int.parse(clean));
        } catch (_) {
          return const Color(0xFF002350);
        }
      }
      return const Color(0xFF002350);
    }

    final rawPoints = json['points'] as List? ?? [];
    final pts = <Offset>[];
    for (final p in rawPoints) {
      if (p is Map) {
        final x = (p['x'] as num?)?.toDouble() ?? (p['dx'] as num?)?.toDouble() ?? 0.0;
        final y = (p['y'] as num?)?.toDouble() ?? (p['dy'] as num?)?.toDouble() ?? 0.0;
        pts.add(Offset(x, y));
      } else if (p is List && p.length >= 2) {
        final x = (p[0] as num?)?.toDouble() ?? 0.0;
        final y = (p[1] as num?)?.toDouble() ?? 0.0;
        pts.add(Offset(x, y));
      }
    }

    final sw = (json['strokeWidth'] as num?)?.toDouble() ?? (json['stroke_width'] as num?)?.toDouble() ?? 3.0;
    final isEraser = json['isEraser'] == true || json['type'] == 'eraser';

    return WhiteboardStroke(
      color: parseColor(json['color']),
      strokeWidth: sw,
      isEraser: isEraser,
      points: pts,
    );
  }
}

class TeacherWhiteboardCanvas extends StatefulWidget {
  final int doubtId;
  final Map<String, dynamic>? initialDocument;
  final VoidCallback? onPublished;

  const TeacherWhiteboardCanvas({
    super.key,
    required this.doubtId,
    this.initialDocument,
    this.onPublished,
  });

  @override
  State<TeacherWhiteboardCanvas> createState() => _TeacherWhiteboardCanvasState();
}

class _TeacherWhiteboardCanvasState extends State<TeacherWhiteboardCanvas> {
  final List<WhiteboardStroke> _strokes = [];
  final List<WhiteboardStroke> _redoStack = [];

  Color _selectedColor = const Color(0xFFE85A1C);
  double _strokeWidth = 3.0;
  bool _isEraser = false;
  bool _isMove = false;
  bool _savingDraft = false;
  bool _publishing = false;
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
    AppColors.primary,
    Color(0xFF1F8A54),
    Color(0xFFD92D20),
    Color(0xFF0284C7),
    Color(0xFF6366F1),
    Color(0xFF141414),
  ];

  @override
  void initState() {
    super.initState();
    _loadInitialStrokes();
  }

  void _loadInitialStrokes() {
    if (widget.initialDocument == null) return;
    try {
      dynamic doc = widget.initialDocument!['document_json'] ??
          widget.initialDocument!['documentJson'] ??
          widget.initialDocument;
      if (doc is String) {
        doc = jsonDecode(doc);
      }
      List? list;
      if (doc is Map) {
        list = (doc['elements'] as List?) ?? (doc['strokes'] as List?);
      } else if (doc is List) {
        list = doc;
      }
      if (list != null) {
        _strokes.clear();
        for (final item in list) {
          _strokes.add(WhiteboardStroke.fromJson(Map<String, dynamic>.from(item as Map)));
        }
      }
    } catch (_) {}
  }

  void _onPointerDown(PointerDownEvent event) {
    _activePointers[event.pointer] = event.localPosition;

    if (_activePointers.length == 1) {
      if (_isMove) {
        _lastSingleFingerPos = event.localPosition;
      } else {
        _isDrawing = true;
        _redoStack.clear();
        final worldPos = (event.localPosition - _panOffset) / _zoomScale;
        _currentStroke = WhiteboardStroke(
          points: [worldPos],
          color: _selectedColor,
          strokeWidth: _isEraser ? 28.0 : _strokeWidth,
          isEraser: _isEraser,
        );
        setState(() {});
      }
    } else if (_activePointers.length >= 2) {
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
      if (_isMove) {
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

  Map<String, dynamic> _getDocumentJson() {
    final strokeList = _strokes.map((s) => s.toJson()).toList();
    return {
      'version': 1,
      'strokes': strokeList,
      'elements': strokeList,
      'updatedAt': DateTime.now().toIso8601String(),
    };
  }

  Future<void> _saveDraft() async {
    setState(() => _savingDraft = true);
    try {
      await TeacherApiService.saveWhiteboardDraft(
        widget.doubtId,
        documentJson: _getDocumentJson(),
      );
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('✓ Whiteboard draft saved privately')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to save draft: $e'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) setState(() => _savingDraft = false);
    }
  }

  Future<void> _publishSolution() async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Publish Solution Whiteboard?'),
        content: const Text(
          'This will publish the current whiteboard drawing live to the student. '
          'The student will see this solution in read-only mode.',
        ),
        actions: [
          TextButton(onPressed: () => Navigator.of(ctx).pop(false), child: const Text('Cancel')),
          FilledButton(
            style: FilledButton.styleFrom(backgroundColor: const Color(0xFF2E8B57)),
            onPressed: () => Navigator.of(ctx).pop(true),
            child: const Text('Publish Live'),
          ),
        ],
      ),
    );

    if (confirm != true) return;

    setState(() => _publishing = true);
    try {
      await TeacherApiService.publishWhiteboardSolution(
        widget.doubtId,
        documentJson: _getDocumentJson(),
      );
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('✓ Solution whiteboard published successfully! Student can now view it.'),
            backgroundColor: Color(0xFF2E8B57),
          ),
        );
        widget.onPublished?.call();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to publish solution: $e'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) setState(() => _publishing = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      children: [
        // Top Toolbar
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          decoration: BoxDecoration(
            color: isDark ? AppColors.darkSurface : AppColors.surface,
            borderRadius: BorderRadius.circular(AppRadii.md),
            border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.border, width: 1.1),
            boxShadow: isDark ? AppShadows.darkSoft : AppShadows.soft,
          ),
          child: Wrap(
            crossAxisAlignment: WrapCrossAlignment.center,
            spacing: 6,
            runSpacing: 6,
            children: [
              // Pen tool
              IconButton(
                icon: const Icon(Icons.edit),
                color: (!_isEraser && !_isMove) ? AppColors.primary : (isDark ? Colors.grey.shade400 : Colors.grey),
                tooltip: 'Pen (Draw)',
                onPressed: () => setState(() {
                  _isEraser = false;
                  _isMove = false;
                }),
              ),
              // Eraser tool
              IconButton(
                icon: const Icon(Icons.cleaning_services_outlined),
                color: _isEraser ? AppColors.danger : (isDark ? Colors.grey.shade400 : Colors.grey),
                tooltip: 'Eraser',
                onPressed: () => setState(() {
                  _isEraser = true;
                  _isMove = false;
                }),
              ),
              // Move / Pan Canvas tool
              IconButton(
                icon: const Icon(Icons.pan_tool_outlined),
                color: _isMove ? AppColors.primary : (isDark ? Colors.grey.shade400 : Colors.grey),
                tooltip: 'Move Canvas (Drag to move, Pinch to zoom)',
                onPressed: () => setState(() {
                  _isMove = true;
                  _isEraser = false;
                }),
              ),
              const SizedBox(width: 4),

              // Color palette
              ..._palette.map((c) {
                final isSelected = !_isEraser && !_isMove && _selectedColor == c;
                return GestureDetector(
                  onTap: () {
                    setState(() {
                      _selectedColor = c;
                      _isEraser = false;
                      _isMove = false;
                    });
                  },
                  child: Container(
                    width: 24,
                    height: 24,
                    decoration: BoxDecoration(
                      color: c,
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: isSelected ? Colors.black : Colors.white,
                        width: isSelected ? 2.5 : 1.5,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.1),
                          blurRadius: 2,
                        ),
                      ],
                    ),
                  ),
                );
              }),

              const SizedBox(width: 4),

              // Stroke width picker
              DropdownButton<double>(
                value: const [2.0, 3.0, 4.0, 6.0, 10.0].contains(_strokeWidth) ? _strokeWidth : 3.0,
                underline: const SizedBox(),
                items: const [
                  DropdownMenuItem(value: 2.0, child: Text('Thin (2px)')),
                  DropdownMenuItem(value: 3.0, child: Text('Normal (3px)')),
                  DropdownMenuItem(value: 4.0, child: Text('Medium (4px)')),
                  DropdownMenuItem(value: 6.0, child: Text('Thick (6px)')),
                  DropdownMenuItem(value: 10.0, child: Text('Broad (10px)')),
                ],
                onChanged: (v) {
                  if (v != null) setState(() => _strokeWidth = v);
                },
              ),

              // Undo
              IconButton(
                icon: const Icon(Icons.undo),
                tooltip: 'Undo',
                onPressed: _strokes.isEmpty
                    ? null
                    : () {
                        setState(() {
                          _redoStack.add(_strokes.removeLast());
                        });
                      },
              ),

              // Redo
              IconButton(
                icon: const Icon(Icons.redo),
                tooltip: 'Redo',
                onPressed: _redoStack.isEmpty
                    ? null
                    : () {
                        setState(() {
                          _strokes.add(_redoStack.removeLast());
                        });
                      },
              ),

              // Clear
              IconButton(
                icon: const Icon(Icons.delete_sweep_outlined, color: Colors.red),
                tooltip: 'Clear Canvas',
                onPressed: _strokes.isEmpty
                    ? null
                    : () {
                        setState(() {
                          _redoStack.clear();
                          _strokes.clear();
                        });
                      },
              ),

              const SizedBox(width: 4),

              // Zoom Out
              IconButton(
                icon: const Icon(Icons.zoom_out, size: 20),
                tooltip: 'Zoom Out',
                onPressed: _zoomScale > 0.45 ? _zoomOut : null,
              ),

              // Zoom Display / Reset
              GestureDetector(
                onTap: _resetZoomAndPan,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: Colors.grey.shade200,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    '${(_zoomScale * 100).toInt()}%',
                    style: const TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: Colors.black87,
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

              // Recenter View
              IconButton(
                icon: const Icon(Icons.center_focus_strong, size: 18),
                tooltip: 'Recenter View (100%)',
                onPressed: _resetZoomAndPan,
              ),
            ],
          ),
        ),

        const SizedBox(height: 8),

        // Interactive Canvas Container
        Expanded(
          child: Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: Colors.grey.withValues(alpha: 0.25)),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.04),
                  blurRadius: 10,
                ),
              ],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(14),
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
                            painter: _StrokePainter(
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
                                  color: Colors.white.withValues(alpha: 0.92),
                                  borderRadius: BorderRadius.circular(20),
                                  border: Border.all(color: const Color(0xFF002350), width: 1.2),
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
                                    const Icon(Icons.center_focus_strong, size: 14, color: AppColors.primary),
                                    const SizedBox(width: 4),
                                    Text(
                                      '${(_zoomScale * 100).toInt()}% • Reset View',
                                      style: const TextStyle(
                                        fontSize: 11,
                                        fontWeight: FontWeight.bold,
                                        color: AppColors.primary,
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
                                    _isMove
                                        ? Icons.pan_tool_outlined
                                        : (_isEraser ? Icons.cleaning_services_outlined : Icons.edit),
                                    size: 11,
                                    color: Colors.black54,
                                  ),
                                  const SizedBox(width: 5),
                                  Text(
                                    _isMove
                                        ? '1 finger: Drag to move • 2 fingers: Pinch to zoom'
                                        : '1 finger: ${_isEraser ? "Erase" : "Draw"} • 2 fingers: Zoom & Move',
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

        const SizedBox(height: 10),

        // Bottom Action Buttons
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            OutlinedButton.icon(
              icon: _savingDraft
                  ? const SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2))
                  : const Icon(Icons.save_outlined, size: 18),
              label: const Text('Save Draft'),
              onPressed: _savingDraft || _publishing ? null : _saveDraft,
            ),
            const SizedBox(width: 12),
            FilledButton.icon(
              style: FilledButton.styleFrom(backgroundColor: AppColors.success),
              icon: _publishing
                  ? const SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                  : const Icon(Icons.publish, size: 18),
              label: const Text('Publish Solution to Student'),
              onPressed: _savingDraft || _publishing ? null : _publishSolution,
            ),
          ],
        ),
      ],
    );
  }
}

class _StrokePainter extends CustomPainter {
  final List<WhiteboardStroke> strokes;
  final WhiteboardStroke? currentStroke;
  final double scale;
  final Offset offset;

  const _StrokePainter({
    required this.strokes,
    this.currentStroke,
    this.scale = 1.0,
    this.offset = Offset.zero,
  });

  @override
  void paint(Canvas canvas, Size size) {
    // 1. Subtle grid dots
    _drawGrid(canvas, size);

    // 2. Pan & zoom transform
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
    if (spacing < 14) return;

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
  bool shouldRepaint(covariant _StrokePainter oldDelegate) {
    return oldDelegate.strokes != strokes ||
        oldDelegate.currentStroke != currentStroke ||
        oldDelegate.scale != scale ||
        oldDelegate.offset != offset;
  }
}
