import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../core/providers/app_state.dart';
import '../theme/app_tokens.dart';

const List<String> _issueCategories = [
  'Incorrect Answer / Answer Key Error',
  'Typo or Formatting Error in Question/Options',
  'Image Missing or Unclear',
  'Out of Syllabus / Incorrect Question',
  'Other Issue',
];

Future<void> showQuestionReportDialog(
  BuildContext context, {
  required String questionId,
  String? questionText,
  String? moduleTitle,
}) {
  return showDialog<void>(
    context: context,
    builder: (context) => QuestionReportDialog(
      questionId: questionId,
      questionText: questionText,
      moduleTitle: moduleTitle,
    ),
  );
}

class QuestionReportDialog extends ConsumerStatefulWidget {
  const QuestionReportDialog({
    super.key,
    required this.questionId,
    this.questionText,
    this.moduleTitle,
  });

  final String questionId;
  final String? questionText;
  final String? moduleTitle;

  @override
  ConsumerState<QuestionReportDialog> createState() =>
      _QuestionReportDialogState();
}

class _QuestionReportDialogState extends ConsumerState<QuestionReportDialog> {
  String _selectedCategory = _issueCategories.first;
  final _detailsController = TextEditingController();
  bool _isSubmitting = false;

  @override
  void dispose() {
    _detailsController.dispose();
    super.dispose();
  }

  Future<void> _submitReport() async {
    setState(() => _isSubmitting = true);
    try {
      final repo = ref.read(contentRepositoryProvider);
      final title =
          'Question Report [Q#${widget.questionId}] - $_selectedCategory';
      final descBuf = StringBuffer()
        ..writeln('Module/Set: ${widget.moduleTitle ?? "N/A"}')
        ..writeln('Question ID: ${widget.questionId}')
        ..writeln('Issue Category: $_selectedCategory');

      if (widget.questionText != null && widget.questionText!.isNotEmpty) {
        final preview = widget.questionText!.length > 100
            ? '${widget.questionText!.substring(0, 100)}...'
            : widget.questionText!;
        descBuf.writeln('Question Preview: $preview');
      }

      if (_detailsController.text.trim().isNotEmpty) {
        descBuf.writeln('\nUser Notes:\n${_detailsController.text.trim()}');
      }

      await repo.submitComplaint(
        title: title,
        description: descBuf.toString(),
        reportType: 'question_report',
      );

      if (!mounted) return;
      Navigator.of(context).pop();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Question issue reported successfully! Our team will review it.'),
          backgroundColor: Colors.green,
          duration: Duration(seconds: 3),
        ),
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to submit report: ${e.toString().replaceAll("Exception: ", "")}'),
          backgroundColor: AppColors.danger,
        ),
      );
    } finally {
      if (mounted) setState(() => _isSubmitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadii.lg),
      ),
      title: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: AppColors.warning.withValues(alpha: 0.15),
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.report_problem_rounded,
              color: AppColors.warning,
              size: 22,
            ),
          ),
          const SizedBox(width: 12),
          const Expanded(
            child: Text(
              'Report Question Issue',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
      content: SingleChildScrollView(
        child: SizedBox(
          width: 440,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Disclaimer banner
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppColors.indigoSoft,
                  borderRadius: BorderRadius.circular(AppRadii.md),
                  border: Border.all(color: AppColors.indigo.withValues(alpha: 0.2)),
                ),
                child: Row(
                  children: [
                    const Icon(
                      Icons.info_outline_rounded,
                      size: 18,
                      color: AppColors.indigo,
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Indraprastha Academy values 100% accuracy. If you found an error in this question or answer key, please let us know.',
                        style: TextStyle(
                          fontSize: 12,
                          color: Theme.of(context).colorScheme.onSurface,
                          height: 1.3,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.md),

              // Issue Category Selector
              const Text(
                'Select Issue Type',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 6),
              DropdownButtonFormField<String>(
                value: _selectedCategory,
                isExpanded: true,
                decoration: InputDecoration(
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 10,
                  ),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(AppRadii.md),
                  ),
                ),
                items: _issueCategories.map((cat) {
                  return DropdownMenuItem<String>(
                    value: cat,
                    child: Text(
                      cat,
                      style: const TextStyle(fontSize: 13),
                    ),
                  );
                }).toList(),
                onChanged: _isSubmitting
                    ? null
                    : (val) {
                        if (val != null) {
                          setState(() => _selectedCategory = val);
                        }
                      },
              ),
              const SizedBox(height: AppSpacing.md),

              // Additional Details Text Box
              const Text(
                'Describe Issue / Feedback',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 6),
              TextField(
                controller: _detailsController,
                enabled: !_isSubmitting,
                maxLines: 3,
                style: const TextStyle(fontSize: 13),
                decoration: InputDecoration(
                  hintText: 'Enter details (e.g. Correct answer should be B, framing is incorrect)...',
                  hintStyle: const TextStyle(fontSize: 12),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(AppRadii.md),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
      actions: [
        TextButton(
          onPressed: _isSubmitting ? null : () => Navigator.of(context).pop(),
          child: const Text('Cancel'),
        ),
        FilledButton.icon(
          onPressed: _isSubmitting ? null : _submitReport,
          icon: _isSubmitting
              ? const SizedBox(
                  width: 16,
                  height: 16,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: Colors.white,
                  ),
                )
              : const Icon(Icons.send_rounded, size: 16),
          label: Text(_isSubmitting ? 'Submitting...' : 'Submit Report'),
        ),
      ],
    );
  }
}

class QuestionDisclaimerReportMark extends StatelessWidget {
  const QuestionDisclaimerReportMark({
    super.key,
    required this.questionId,
    this.questionText,
    this.moduleTitle,
  });

  final String questionId;
  final String? questionText;
  final String? moduleTitle;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: AppSpacing.sm, bottom: AppSpacing.xs),
      child: Center(
        child: InkWell(
          onTap: () => showQuestionReportDialog(
            context,
            questionId: questionId,
            questionText: questionText,
            moduleTitle: moduleTitle,
          ),
          borderRadius: BorderRadius.circular(AppRadii.sm),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(
                  Icons.report_problem_outlined,
                  size: 15,
                  color: AppColors.textSecondary,
                ),
                const SizedBox(width: 5),
                Text(
                  'Disclaimer & Report Question Issue',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    color: Theme.of(context)
                        .colorScheme
                        .onSurface
                        .withValues(alpha: 0.65),
                    decoration: TextDecoration.underline,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
