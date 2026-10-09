import 'dart:math' as math;
import 'package:flutter/material.dart';

class TestRadarChart extends StatelessWidget {
  final List<Map<String, dynamic>> subjects;
  final double height;

  const TestRadarChart({
    super.key,
    required this.subjects,
    this.height = 300,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    if (subjects.isEmpty) {
      return SizedBox(
        height: height,
        child: Center(
          child: Text(
            'No subject data available for radar chart',
            style: TextStyle(
              fontSize: 13,
              color: Theme.of(context).colorScheme.onSurfaceVariant,
            ),
          ),
        ),
      );
    }

    return Column(
      children: [
        SizedBox(
          height: height,
          width: double.infinity,
          child: CustomPaint(
            painter: _RadarChartPainter(
              subjects: subjects,
              theme: Theme.of(context),
              isDark: isDark,
            ),
          ),
        ),
        const SizedBox(height: 12),
        _buildLegend(context, isDark),
      ],
    );
  }

  Widget _buildLegend(BuildContext context, bool isDark) {
    final top100Color = isDark ? const Color(0xFFFBBF24) : const Color(0xFFD97706);
    final studentColor = isDark ? const Color(0xFF34D399) : const Color(0xFF059669);

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Row(
          children: [
            Container(
              width: 14,
              height: 14,
              decoration: BoxDecoration(
                color: top100Color.withValues(alpha: 0.3),
                border: Border.all(color: top100Color, width: 2),
                borderRadius: BorderRadius.circular(3),
              ),
            ),
            const SizedBox(width: 6),
            Text(
              'Top 20 Average',
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: top100Color,
              ),
            ),
          ],
        ),
        const SizedBox(width: 24),
        Row(
          children: [
            Container(
              width: 14,
              height: 14,
              decoration: BoxDecoration(
                color: studentColor.withValues(alpha: 0.35),
                border: Border.all(color: studentColor, width: 2.5),
                borderRadius: BorderRadius.circular(3),
              ),
            ),
            const SizedBox(width: 6),
            Text(
              'Your Performance',
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w700,
                color: studentColor,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _RadarChartPainter extends CustomPainter {
  final List<Map<String, dynamic>> subjects;
  final ThemeData theme;
  final bool isDark;

  _RadarChartPainter({
    required this.subjects,
    required this.theme,
    required this.isDark,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = math.min(size.width, size.height) / 2 - 50;
    final count = subjects.length;

    if (count == 0 || radius <= 0) return;

    final gridPaint = Paint()
      ..color = isDark ? Colors.white.withValues(alpha: 0.12) : Colors.black.withValues(alpha: 0.12)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.0;

    final axisPaint = Paint()
      ..color = isDark ? Colors.white.withValues(alpha: 0.18) : Colors.black.withValues(alpha: 0.18)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.2;

    // Draw 4 concentric polygon grid rings (25%, 50%, 75%, 100%)
    for (int step = 1; step <= 4; step++) {
      final r = (radius / 4) * step;
      final path = Path();
      for (int i = 0; i < count; i++) {
        final angle = -math.pi / 2 + (2 * math.pi * i / count);
        final x = center.dx + r * math.cos(angle);
        final y = center.dy + r * math.sin(angle);
        if (i == 0) {
          path.moveTo(x, y);
        } else {
          path.lineTo(x, y);
        }
      }
      path.close();
      canvas.drawPath(path, gridPaint);
    }

    // Draw radial axis lines and subject text labels
    final textStyle = TextStyle(
      fontSize: 12,
      fontWeight: FontWeight.w700,
      color: theme.colorScheme.onSurface,
    );

    final scoreSubStyle = TextStyle(
      fontSize: 10,
      fontWeight: FontWeight.w600,
      color: theme.colorScheme.onSurfaceVariant,
    );

    for (int i = 0; i < count; i++) {
      final angle = -math.pi / 2 + (2 * math.pi * i / count);
      final x = center.dx + radius * math.cos(angle);
      final y = center.dy + radius * math.sin(angle);

      canvas.drawLine(center, Offset(x, y), axisPaint);

      // Draw Subject & Score label outside outer ring
      final item = subjects[i];
      final subjName = (item['subject'] ?? 'Subject').toString();
      final studentScore = (item['student_score'] as num?)?.toInt() ?? 0;
      final top100Avg = (item['top20_average'] ?? item['top100_average'] as num?)?.toInt() ?? 0;

      final labelRadius = radius + 28;
      final lx = center.dx + labelRadius * math.cos(angle);
      final ly = center.dy + labelRadius * math.sin(angle);

      final tpTitle = TextPainter(
        text: TextSpan(
          text: subjName,
          style: textStyle,
          children: [
            TextSpan(
              text: '\n$studentScore / $top100Avg',
              style: scoreSubStyle,
            ),
          ],
        ),
        textAlign: TextAlign.center,
        textDirection: TextDirection.ltr,
      );
      tpTitle.layout();

      final textOffset = Offset(
        lx - tpTitle.width / 2,
        ly - tpTitle.height / 2,
      );
      tpTitle.paint(canvas, textOffset);
    }

    // Dataset 1: Top 20 Average Polygon
    final top100Path = Path();
    for (int i = 0; i < count; i++) {
      final item = subjects[i];
      final top100Avg = (item['top20_average'] ?? item['top100_average'] as num?)?.toDouble() ?? 0.0;
      final maxScore = (item['max_score'] as num?)?.toDouble() ?? 180.0;
      final ratio = maxScore > 0 ? (top100Avg / maxScore).clamp(0.0, 1.0) : 0.0;

      final angle = -math.pi / 2 + (2 * math.pi * i / count);
      final r = radius * ratio;
      final x = center.dx + r * math.cos(angle);
      final y = center.dy + r * math.sin(angle);

      if (i == 0) {
        top100Path.moveTo(x, y);
      } else {
        top100Path.lineTo(x, y);
      }
    }
    top100Path.close();

    final top100FillColor = isDark ? const Color(0xFFF59E0B).withValues(alpha: 0.25) : const Color(0xFFF59E0B).withValues(alpha: 0.18);
    final top100StrokeColor = isDark ? const Color(0xFFFBBF24) : const Color(0xFFD97706);

    final top100FillPaint = Paint()
      ..color = top100FillColor
      ..style = PaintingStyle.fill;

    final top100StrokePaint = Paint()
      ..color = top100StrokeColor
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.2;

    canvas.drawPath(top100Path, top100FillPaint);
    canvas.drawPath(top100Path, top100StrokePaint);

    // Dataset 2: Student Performance Polygon
    final studentPath = Path();
    final studentPoints = <Offset>[];

    for (int i = 0; i < count; i++) {
      final item = subjects[i];
      final studentScore = (item['student_score'] as num?)?.toDouble() ?? 0.0;
      final maxScore = (item['max_score'] as num?)?.toDouble() ?? 180.0;
      final ratio = maxScore > 0 ? (studentScore / maxScore).clamp(0.0, 1.0) : 0.0;

      final angle = -math.pi / 2 + (2 * math.pi * i / count);
      final r = radius * ratio;
      final pt = Offset(
        center.dx + r * math.cos(angle),
        center.dy + r * math.sin(angle),
      );
      studentPoints.add(pt);

      if (i == 0) {
        studentPath.moveTo(pt.dx, pt.dy);
      } else {
        studentPath.lineTo(pt.dx, pt.dy);
      }
    }
    studentPath.close();

    final studentFillColor = isDark ? const Color(0xFF10B981).withValues(alpha: 0.35) : const Color(0xFF059669).withValues(alpha: 0.25);
    final studentStrokeColor = isDark ? const Color(0xFF34D399) : const Color(0xFF059669);

    final studentFillPaint = Paint()
      ..color = studentFillColor
      ..style = PaintingStyle.fill;

    final studentStrokePaint = Paint()
      ..color = studentStrokeColor
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3.0;

    canvas.drawPath(studentPath, studentFillPaint);
    canvas.drawPath(studentPath, studentStrokePaint);

    // Vertex dots on Student Polygon
    final dotPaint = Paint()..color = isDark ? const Color(0xFF34D399) : const Color(0xFF047857);
    final dotBorderPaint = Paint()
      ..color = isDark ? const Color(0xFF11131A) : Colors.white
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0;

    for (final pt in studentPoints) {
      canvas.drawCircle(pt, 5.0, dotPaint);
      canvas.drawCircle(pt, 5.0, dotBorderPaint);
    }
  }

  @override
  bool shouldRepaint(covariant _RadarChartPainter oldDelegate) {
    return oldDelegate.subjects != subjects || oldDelegate.isDark != isDark;
  }
}

