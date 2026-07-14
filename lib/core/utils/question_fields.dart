import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../theme/app_tokens.dart';
import 'drive_image_url.dart';

/// Read question fields from API maps (snake_case or camelCase).
String readQuestionText(Map<String, dynamic> question) {
  final direct = question['question']?.toString().trim() ?? '';
  if (direct.isNotEmpty) return direct;
  return question['Question']?.toString().trim() ?? '';
}

String readQuestionOption(Map<String, dynamic> question, String letter) {
  final key = letter.toUpperCase();
  final snake = 'option_${letter.toLowerCase()}';
  final camel = 'option$key';
  for (final field in [snake, camel, 'option $key']) {
    final value = question[field]?.toString().trim() ?? '';
    if (value.isNotEmpty) return value;
  }
  return '';
}

Map<String, String> readQuestionOptions(Map<String, dynamic> question) {
  return {
    'A': readQuestionOption(question, 'A'),
    'B': readQuestionOption(question, 'B'),
    'C': readQuestionOption(question, 'C'),
    'D': readQuestionOption(question, 'D'),
  };
}

String readCorrectOption(Map<String, dynamic> question) {
  return (question['correct_option'] ?? question['correctOption'] ?? 'A')
      .toString()
      .toUpperCase();
}

String formatOptionLabel(String key, String value) {
  final text = value.trim();
  if (text.isEmpty) return '$key) —';
  return '$key) $text';
}

TextStyle questionContentTextStyle(
  BuildContext context, {
  double? fontSize,
  FontWeight? fontWeight,
  Color? color,
}) {
  return GoogleFonts.notoSansDevanagari(
    fontSize: fontSize ?? 16,
    height: 1.45,
    fontWeight: fontWeight ?? FontWeight.w500,
    color: color ?? Theme.of(context).colorScheme.onSurface,
  );
}

Widget buildQuestionTextBlock(
  BuildContext context,
  Map<String, dynamic> question, {
  TextStyle? style,
}) {
  final text = readQuestionText(question);
  final resolved = style ?? questionContentTextStyle(context, fontSize: 17);
  if (text.isNotEmpty) {
    return Text(text, style: resolved);
  }
  if (hasQuestionImage(question)) {
    return Text(
      'Question image neeche hai',
      style: resolved.copyWith(color: AppColors.textSecondary),
    );
  }
  return Text(
    'Question text load nahi hua',
    style: resolved.copyWith(color: AppColors.danger),
  );
}
