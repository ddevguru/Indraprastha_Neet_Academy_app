import 'dart:typed_data';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';

enum WhiteboardTool { pen, eraser, line, rectangle, circle, text }

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
    Color parseColor(String? hex) {
      if (hex == null) return const Color(0xFF002350);
      try {
        return Color(int.parse('FF${hex.replaceAll('#', '')}', radix: 16));
      } catch (_) {
        return const Color(0xFF002350);
      }
    }

    final rawPoints = json['points'] as List? ?? [];
    final points = <Offset>[];
    for (final p in rawPoints) {
      if (p is List && p.length >= 2) {
        points.add(Offset(
          (p[0] as num).toDouble(),
          (p[1] as num).toDouble(),
        ));
      }
    }

    return WhiteboardStroke(
      points: points,
      color: parseColor(json['color']),
      strokeWidth: (json['strokeWidth'] as num?)?.toDouble() ?? 3.0,
      isEraser: json['type'] == 'eraser',
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
      _drawStroke(canvas, stroke);
    }

    if (currentStroke != null) {
      _drawStroke(canvas, currentStroke!);
    }
  }

  void _drawStroke(Canvas canvas, WhiteboardStroke stroke) {
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
    final painter = WhiteboardPainter(strokes: strokes);
    painter.paint(canvas, size);

    final picture = recorder.endRecording();
    final image = await picture.toImage(size.width.toInt(), size.height.toInt());
    final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
    return byteData?.buffer.asUint8List();
  }
}
