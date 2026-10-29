import 'dart:typed_data';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';

enum WhiteboardTool { pen, eraser, move, line, rectangle, circle, text }

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
        'type': isEraser ? 'eraser' : 'pen',
        'points': points.map((p) => [p.dx, p.dy]).toList(),
        'color': '#${color.toARGB32().toRadixString(16).padLeft(8, '0').substring(2)}',
        'strokeWidth': strokeWidth,
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
    final points = <Offset>[];
    for (final p in rawPoints) {
      if (p is Map) {
        final x = (p['x'] as num?)?.toDouble() ?? (p['dx'] as num?)?.toDouble() ?? 0.0;
        final y = (p['y'] as num?)?.toDouble() ?? (p['dy'] as num?)?.toDouble() ?? 0.0;
        points.add(Offset(x, y));
      } else if (p is List && p.length >= 2) {
        final x = (p[0] as num?)?.toDouble() ?? 0.0;
        final y = (p[1] as num?)?.toDouble() ?? 0.0;
        points.add(Offset(x, y));
      }
    }

    final sw = (json['strokeWidth'] as num?)?.toDouble() ??
        (json['stroke_width'] as num?)?.toDouble() ??
        3.0;
    final isEraser = json['type'] == 'eraser' || json['isEraser'] == true;

    return WhiteboardStroke(
      points: points,
      color: parseColor(json['color']),
      strokeWidth: sw,
      isEraser: isEraser,
    );
  }
}

class WhiteboardPainter extends CustomPainter {
  final List<WhiteboardStroke> strokes;
  final WhiteboardStroke? currentStroke;
  final Color backgroundColor;

  WhiteboardPainter({
    required this.strokes,
    this.currentStroke,
    this.backgroundColor = Colors.white,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final bgPaint = Paint()..color = backgroundColor;
    canvas.drawRect(Offset.zero & size, bgPaint);

    for (final stroke in strokes) {
      drawStrokeToCanvas(canvas, stroke, backgroundColor);
    }

    if (currentStroke != null) {
      drawStrokeToCanvas(canvas, currentStroke!, backgroundColor);
    }
  }

  static void drawStrokeToCanvas(Canvas canvas, WhiteboardStroke stroke, Color backgroundColor) {
    if (stroke.points.isEmpty) return;

    final paint = Paint()
      ..color = stroke.isEraser ? backgroundColor : stroke.color
      ..strokeWidth = stroke.strokeWidth
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round
      ..style = PaintingStyle.stroke;

    if (stroke.points.length == 1) {
      canvas.drawCircle(stroke.points[0], stroke.strokeWidth / 2, paint..style = PaintingStyle.fill);
      return;
    }

    final path = Path();
    path.moveTo(stroke.points[0].dx, stroke.points[0].dy);

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
  bool shouldRepaint(covariant WhiteboardPainter oldDelegate) => true;
}

class WhiteboardSnapshotter {
  static Future<Uint8List?> capturePng(List<WhiteboardStroke> strokes, {Size size = const Size(800, 600)}) async {
    final recorder = ui.PictureRecorder();
    final canvas = Canvas(recorder, Offset.zero & size);
    final bgPaint = Paint()..color = Colors.white;
    canvas.drawRect(Offset.zero & size, bgPaint);

    if (strokes.isNotEmpty) {
      double minX = double.infinity, minY = double.infinity;
      double maxX = -double.infinity, maxY = -double.infinity;

      for (final s in strokes) {
        for (final p in s.points) {
          if (p.dx < minX) minX = p.dx;
          if (p.dy < minY) minY = p.dy;
          if (p.dx > maxX) maxX = p.dx;
          if (p.dy > maxY) maxY = p.dy;
        }
      }

      canvas.save();
      if (minX.isFinite && maxX.isFinite && maxX > minX && maxY > minY) {
        const padding = 40.0;
        final contentW = maxX - minX;
        final contentH = maxY - minY;
        final scaleX = (size.width - padding * 2) / contentW;
        final scaleY = (size.height - padding * 2) / contentH;
        final fitScale = (scaleX < scaleY ? scaleX : scaleY).clamp(0.05, 1.2);

        final targetCenterX = size.width / 2;
        final targetCenterY = size.height / 2;
        final contentCenterX = (minX + maxX) / 2;
        final contentCenterY = (minY + maxY) / 2;

        canvas.translate(targetCenterX - contentCenterX * fitScale, targetCenterY - contentCenterY * fitScale);
        canvas.scale(fitScale, fitScale);
      }

      for (final s in strokes) {
        WhiteboardPainter.drawStrokeToCanvas(canvas, s, Colors.white);
      }
      canvas.restore();
    }

    final picture = recorder.endRecording();
    final image = await picture.toImage(size.width.toInt(), size.height.toInt());
    final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
    return byteData?.buffer.asUint8List();
  }
}
