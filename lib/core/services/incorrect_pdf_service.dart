import 'dart:developer' as developer;
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:printing/printing.dart';

import '../../widgets/paginated_answer_review.dart';
import '../utils/question_fields.dart';

/// Data structure for a single question to be exported in the PDF report.
class IncorrectPdfQuestion {
  final String questionText;
  final List<String> options;
  final int correctIndex;
  final int? selectedIndex;
  final String? explanation;
  final String? chapterOrSubject;

  const IncorrectPdfQuestion({
    required this.questionText,
    required this.options,
    required this.correctIndex,
    this.selectedIndex,
    this.explanation,
    this.chapterOrSubject,
  });

  bool get wasAttempted => selectedIndex != null;
  bool get isCorrect => selectedIndex != null && selectedIndex == correctIndex;

  factory IncorrectPdfQuestion.fromAnswerReviewEntry(
    AnswerReviewEntry entry, {
    String? defaultChapter,
  }) {
    return IncorrectPdfQuestion(
      questionText: entry.questionText,
      options: entry.options,
      correctIndex: entry.correctIndex,
      selectedIndex: entry.selectedIndex,
      explanation: entry.explanation,
      chapterOrSubject: entry.subtitle ?? defaultChapter,
    );
  }

  factory IncorrectPdfQuestion.fromMap(
    Map<String, dynamic> question, {
    String? userSelectedOption,
    String? defaultChapter,
  }) {
    final keys = ['A', 'B', 'C', 'D'];
    final correct = readCorrectOption(question);
    final correctIdx = keys.indexOf(correct).clamp(0, 3);
    
    int? selectedIdx;
    if (userSelectedOption != null && userSelectedOption.trim().isNotEmpty) {
      selectedIdx = keys.indexOf(userSelectedOption.trim().toUpperCase());
      if (selectedIdx < 0 || selectedIdx > 3) selectedIdx = null;
    }

    final opts = keys.map((k) => readQuestionOption(question, k)).toList();

    return IncorrectPdfQuestion(
      questionText: readQuestionText(question),
      options: opts,
      correctIndex: correctIdx,
      selectedIndex: selectedIdx,
      explanation: question['explanation']?.toString() ??
          question['solution']?.toString(),
      chapterOrSubject: question['chapter_name']?.toString() ??
          question['subject_name']?.toString() ??
          question['topic']?.toString() ??
          defaultChapter,
    );
  }
}

/// Core service for generating and downloading client-side PDF of incorrect options.
class IncorrectPdfService {
  /// Generate and prompt download/share for incorrect questions.
  /// Does NOT save any file to the server.
  static Future<bool> downloadIncorrectQuestionsPdf({
    required BuildContext context,
    required String title,
    required List<IncorrectPdfQuestion> questions,
    String? subtitle,
  }) async {
    // Filter only incorrect questions
    final incorrectList = questions
        .where((q) => !q.isCorrect)
        .toList();

    if (incorrectList.isEmpty) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Sahi kaam! Iss set me koi incorrect question nahi hai.'),
            backgroundColor: Colors.green,
          ),
        );
      }
      return false;
    }

    try {
      // Show loading indicator
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Generating Incorrect Questions PDF...'),
            duration: Duration(seconds: 2),
          ),
        );
      }

      // Load fonts with fallback
      pw.Font regularFont;
      pw.Font boldFont;

      try {
        regularFont = await PdfGoogleFonts.notoSansDevanagariRegular();
        boldFont = await PdfGoogleFonts.notoSansDevanagariBold();
      } catch (e) {
        developer.log('Google fonts load failed for PDF, using default', error: e);
        regularFont = pw.Font.helvetica();
        boldFont = pw.Font.helveticaBold();
      }

      final pdf = pw.Document(
        title: 'Incorrect Questions - $title',
        author: 'Indraprastha NEET Academy',
      );

      final dateStr = DateFormat('dd MMM yyyy, hh:mm a').format(DateTime.now());
      final primaryColor = PdfColor.fromHex('#4F5DE4');
      final dangerColor = PdfColor.fromHex('#E53935');
      final successColor = PdfColor.fromHex('#2E7D32');
      final greyColor = PdfColor.fromHex('#666666');
      final lightBg = PdfColor.fromHex('#F8F9FA');
      final wrongBg = PdfColor.fromHex('#FFEBEE');
      final correctBg = PdfColor.fromHex('#E8F5E9');

      pdf.addPage(
        pw.MultiPage(
          pageFormat: PdfPageFormat.a4,
          margin: const pw.EdgeInsets.all(32),
          theme: pw.ThemeData.withFont(
            base: regularFont,
            bold: boldFont,
          ),
          header: (pw.Context context) {
            return pw.Container(
              margin: const pw.EdgeInsets.only(bottom: 16),
              padding: const pw.EdgeInsets.only(bottom: 8),
              decoration: const pw.BoxDecoration(
                border: pw.Border(
                  bottom: pw.BorderSide(color: PdfColors.grey300, width: 1),
                ),
              ),
              child: pw.Row(
                mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                children: [
                  pw.Column(
                    crossAxisAlignment: pw.CrossAxisAlignment.start,
                    children: [
                      pw.Text(
                        'INDRAPRASTHA NEET ACADEMY',
                        style: pw.TextStyle(
                          font: boldFont,
                          fontSize: 10,
                          color: primaryColor,
                          letterSpacing: 1.2,
                        ),
                      ),
                      pw.Text(
                        'Incorrect Options & Solutions Report',
                        style: pw.TextStyle(
                          font: boldFont,
                          fontSize: 14,
                          color: PdfColors.black,
                        ),
                      ),
                    ],
                  ),
                  pw.Text(
                    dateStr,
                    style: pw.TextStyle(
                      font: regularFont,
                      fontSize: 9,
                      color: greyColor,
                    ),
                  ),
                ],
              ),
            );
          },
          footer: (pw.Context context) {
            return pw.Container(
              margin: const pw.EdgeInsets.only(top: 16),
              padding: const pw.EdgeInsets.only(top: 8),
              decoration: const pw.BoxDecoration(
                border: pw.Border(
                  top: pw.BorderSide(color: PdfColors.grey300, width: 1),
                ),
              ),
              child: pw.Row(
                mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                children: [
                  pw.Text(
                    'Generated client-side • Indraprastha NEET Academy App',
                    style: pw.TextStyle(fontSize: 8, color: greyColor),
                  ),
                  pw.Text(
                    'Page ${context.pageNumber} of ${context.pagesCount}',
                    style: pw.TextStyle(fontSize: 8, color: greyColor),
                  ),
                ],
              ),
            );
          },
          build: (pw.Context pdfContext) {
            return [
              // Summary Header Box
              pw.Container(
                width: double.infinity,
                padding: const pw.EdgeInsets.all(12),
                decoration: pw.BoxDecoration(
                  color: lightBg,
                  borderRadius: pw.BorderRadius.circular(6),
                  border: pw.Border.all(color: PdfColors.grey300),
                ),
                child: pw.Column(
                  crossAxisAlignment: pw.CrossAxisAlignment.start,
                  children: [
                    pw.Row(
                      mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                      children: [
                        pw.Expanded(
                          child: pw.Text(
                            title,
                            style: pw.TextStyle(
                              font: boldFont,
                              fontSize: 13,
                              color: PdfColors.indigo900,
                            ),
                          ),
                        ),
                        pw.Container(
                          padding: const pw.EdgeInsets.symmetric(
                              horizontal: 8, vertical: 4),
                          decoration: pw.BoxDecoration(
                            color: dangerColor,
                            borderRadius: pw.BorderRadius.circular(12),
                          ),
                          child: pw.Text(
                            '${incorrectList.length} Incorrect',
                            style: pw.TextStyle(
                              font: boldFont,
                              fontSize: 9,
                              color: PdfColors.white,
                            ),
                          ),
                        ),
                      ],
                    ),
                    if (subtitle != null && subtitle.trim().isNotEmpty) ...[
                      pw.SizedBox(height: 4),
                      pw.Text(
                        subtitle,
                        style: pw.TextStyle(fontSize: 10, color: greyColor),
                      ),
                    ],
                  ],
                ),
              ),

              pw.SizedBox(height: 16),

              // Questions List
              ...List.generate(incorrectList.length, (index) {
                final q = incorrectList[index];
                final qNum = index + 1;
                final optionKeys = ['A', 'B', 'C', 'D'];

                return pw.Container(
                  margin: const pw.EdgeInsets.only(bottom: 18),
                  padding: const pw.EdgeInsets.all(12),
                  decoration: pw.BoxDecoration(
                    borderRadius: pw.BorderRadius.circular(6),
                    border: pw.Border.all(color: PdfColors.grey300),
                  ),
                  child: pw.Column(
                    crossAxisAlignment: pw.CrossAxisAlignment.start,
                    children: [
                      // Question Header
                      pw.Row(
                        crossAxisAlignment: pw.CrossAxisAlignment.start,
                        children: [
                          pw.Container(
                            padding: const pw.EdgeInsets.symmetric(
                                horizontal: 6, vertical: 2),
                            decoration: pw.BoxDecoration(
                              color: primaryColor,
                              borderRadius: pw.BorderRadius.circular(4),
                            ),
                            child: pw.Text(
                              'Q$qNum',
                              style: pw.TextStyle(
                                font: boldFont,
                                fontSize: 10,
                                color: PdfColors.white,
                              ),
                            ),
                          ),
                          pw.SizedBox(width: 8),
                          pw.Expanded(
                            child: pw.Text(
                              q.questionText.isNotEmpty
                                  ? q.questionText
                                  : '(Question text unavailable)',
                              style: pw.TextStyle(
                                font: boldFont,
                                fontSize: 11,
                                color: PdfColors.black,
                              ),
                            ),
                          ),
                        ],
                      ),

                      if (q.chapterOrSubject != null &&
                          q.chapterOrSubject!.isNotEmpty) ...[
                        pw.SizedBox(height: 4),
                        pw.Text(
                          'Chapter/Topic: ${q.chapterOrSubject}',
                          style: pw.TextStyle(
                            font: regularFont,
                            fontSize: 8,
                            color: greyColor,
                          ),
                        ),
                      ],

                      pw.SizedBox(height: 10),

                      // Options
                      ...List.generate(q.options.length, (optIdx) {
                        final optKey = optionKeys[optIdx];
                        final optText = q.options[optIdx];
                        final isUserSelected = q.selectedIndex == optIdx;
                        final isCorrectOpt = q.correctIndex == optIdx;

                        PdfColor bg = PdfColors.white;
                        PdfColor borderColor = PdfColors.grey300;
                        pw.Widget? badge;

                        if (isUserSelected && !isCorrectOpt) {
                          bg = wrongBg;
                          borderColor = dangerColor;
                          badge = pw.Container(
                            padding: const pw.EdgeInsets.symmetric(
                                horizontal: 4, vertical: 1),
                            decoration: pw.BoxDecoration(
                              color: dangerColor,
                              borderRadius: pw.BorderRadius.circular(3),
                            ),
                            child: pw.Text(
                              'YOUR ANSWER (INCORRECT)',
                              style: pw.TextStyle(
                                font: boldFont,
                                fontSize: 7,
                                color: PdfColors.white,
                              ),
                            ),
                          );
                        } else if (isCorrectOpt) {
                          bg = correctBg;
                          borderColor = successColor;
                          badge = pw.Container(
                            padding: const pw.EdgeInsets.symmetric(
                                horizontal: 4, vertical: 1),
                            decoration: pw.BoxDecoration(
                              color: successColor,
                              borderRadius: pw.BorderRadius.circular(3),
                            ),
                            child: pw.Text(
                              'CORRECT ANSWER',
                              style: pw.TextStyle(
                                font: boldFont,
                                fontSize: 7,
                                color: PdfColors.white,
                              ),
                            ),
                          );
                        }

                        return pw.Container(
                          margin: const pw.EdgeInsets.only(bottom: 6),
                          padding: const pw.EdgeInsets.all(6),
                          decoration: pw.BoxDecoration(
                            color: bg,
                            borderRadius: pw.BorderRadius.circular(4),
                            border: pw.Border.all(color: borderColor),
                          ),
                          child: pw.Row(
                            children: [
                              pw.Text(
                                '$optKey) ',
                                style: pw.TextStyle(
                                  font: boldFont,
                                  fontSize: 9,
                                  color: isCorrectOpt
                                      ? successColor
                                      : (isUserSelected
                                          ? dangerColor
                                          : PdfColors.black),
                                ),
                              ),
                              pw.Expanded(
                                child: pw.Text(
                                  optText.isNotEmpty ? optText : '—',
                                  style: pw.TextStyle(
                                    font: regularFont,
                                    fontSize: 9.5,
                                    color: PdfColors.black,
                                  ),
                                ),
                              ),
                              ...? (badge != null ? [badge] : null),
                            ],
                          ),
                        );
                      }),

                      // Status summary if skipped/unattempted
                      if (!q.wasAttempted) ...[
                        pw.SizedBox(height: 4),
                        pw.Text(
                          'Status: Unattempted',
                          style: pw.TextStyle(
                            font: boldFont,
                            fontSize: 8.5,
                            color: dangerColor,
                          ),
                        ),
                      ],

                      // Explanation / Solution Box
                      if (q.explanation != null &&
                          q.explanation!.trim().isNotEmpty) ...[
                        pw.SizedBox(height: 8),
                        pw.Container(
                          width: double.infinity,
                          padding: const pw.EdgeInsets.all(8),
                          decoration: pw.BoxDecoration(
                            color: lightBg,
                            borderRadius: pw.BorderRadius.circular(4),
                            border: pw.Border.all(color: PdfColors.grey300),
                          ),
                          child: pw.Column(
                            crossAxisAlignment: pw.CrossAxisAlignment.start,
                            children: [
                              pw.Text(
                                'Solution / Explanation:',
                                style: pw.TextStyle(
                                  font: boldFont,
                                  fontSize: 8.5,
                                  color: primaryColor,
                                ),
                              ),
                              pw.SizedBox(height: 2),
                              pw.Text(
                                q.explanation!.trim(),
                                style: pw.TextStyle(
                                  font: regularFont,
                                  fontSize: 8.5,
                                  color: PdfColors.grey900,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ],
                  ),
                );
              }),
            ];
          },
        ),
      );

      final pdfBytes = await pdf.save();
      final sanitizedTitle = title
          .replaceAll(RegExp(r'[^\w\s\-]'), '')
          .replaceAll(RegExp(r'\s+'), '_');
      final fileName = 'Incorrect_Questions_${sanitizedTitle}_${DateTime.now().millisecondsSinceEpoch}.pdf';

      // Open native save/print/share modal (works on Web, Android, iOS, Windows, Mac)
      await Printing.sharePdf(
        bytes: pdfBytes,
        filename: fileName,
      );

      return true;
    } catch (e, stack) {
      developer.log('Error generating incorrect options PDF', error: e, stackTrace: stack);
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('PDF banane me error aaya: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
      return false;
    }
  }

  /// Helper to convert AnswerReviewEntry items to PDF questions and trigger download
  static Future<bool> downloadFromReviewEntries({
    required BuildContext context,
    required String title,
    required List<AnswerReviewEntry> entries,
    String? subtitle,
  }) {
    final pdfQuestions = entries
        .map((e) => IncorrectPdfQuestion.fromAnswerReviewEntry(e, defaultChapter: subtitle))
        .toList();

    return downloadIncorrectQuestionsPdf(
      context: context,
      title: title,
      questions: pdfQuestions,
      subtitle: subtitle,
    );
  }

  /// Helper to convert Raw Question maps & user answers to PDF questions and trigger download
  static Future<bool> downloadFromRawQuestions({
    required BuildContext context,
    required String title,
    required List<Map<String, dynamic>> questions,
    required Map<dynamic, String> userAnswers, // map index or qId -> answer 'A','B','C','D'
    String? subtitle,
  }) {
    final pdfQuestions = <IncorrectPdfQuestion>[];

    for (var i = 0; i < questions.length; i++) {
      final q = questions[i];
      final userAns = userAnswers[i] ?? userAnswers[q['id']?.toString()] ?? userAnswers[q['id']];
      pdfQuestions.add(
        IncorrectPdfQuestion.fromMap(
          q,
          userSelectedOption: userAns,
          defaultChapter: subtitle,
        ),
      );
    }

    return downloadIncorrectQuestionsPdf(
      context: context,
      title: title,
      questions: pdfQuestions,
      subtitle: subtitle,
    );
  }
}
