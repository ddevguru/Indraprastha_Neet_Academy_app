import 'package:flutter/material.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/fast_network_image.dart';

/// Enhanced Practice/PYQ Screen with Explanation Page & Progress Dots
class EnhancedPracticeScreen extends StatefulWidget {
  final int practiceSetId;
  final String practiceTitle;
  final List<String> questions;

  const EnhancedPracticeScreen({
    super.key,
    required this.practiceSetId,
    required this.practiceTitle,
    required this.questions,
  });

  @override
  State<EnhancedPracticeScreen> createState() =>
      _EnhancedPracticeScreenState();
}

class _EnhancedPracticeScreenState extends State<EnhancedPracticeScreen> {
  late List<PracticeQuestion> practiceQuestions;
  int currentQuestionIndex = 0;
  Set<int> answeredQuestions = {};
  Map<int, String> userAnswers = {};
  bool _showResults = false;
  late PageController _reviewController;

  @override
  void initState() {
    super.initState();
    _loadQuestions();
    _reviewController = PageController();
  }

  @override
  void dispose() {
    _reviewController.dispose();
    super.dispose();
  }

  void _loadQuestions() {
    // TODO: Load from API
    practiceQuestions = List.generate(
      widget.questions.length,
      (index) => PracticeQuestion(
        id: index + 1,
        questionText: 'Sample Question ${index + 1}',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'A',
        topic: 'Topic ${index % 5 + 1}',
        explanation: 'This is the explanation for question ${index + 1}...',
      ),
    );
  }

  void _handleAnswer(String answer) {
    setState(() {
      userAnswers[currentQuestionIndex] = answer;
      answeredQuestions.add(currentQuestionIndex);
    });

    // Show feedback
    final isCorrect = answer == practiceQuestions[currentQuestionIndex].correctAnswer;
    _showAnswerFeedback(isCorrect);
  }

  void _showAnswerFeedback(bool isCorrect) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          isCorrect ? '✓ Correct!' : '✗ Incorrect',
        ),
        backgroundColor: isCorrect ? Colors.green : Colors.red,
        duration: const Duration(seconds: 1),
      ),
    );
  }

  void _goToNextQuestion() {
    if (currentQuestionIndex < widget.questions.length - 1) {
      setState(() => currentQuestionIndex++);
    }
  }

  void _goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
      setState(() => currentQuestionIndex--);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_showResults) {
      return _buildResultsScreen();
    }

    final currentQuestion = practiceQuestions[currentQuestionIndex];
    final isAnswered = answeredQuestions.contains(currentQuestionIndex);

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.practiceTitle),
        elevation: 0,
      ),
      body: Column(
        children: [
          // Progress Dots
          _buildProgressSection(),

          // Question Container
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Question Number
                  Text(
                    'Question ${currentQuestionIndex + 1} of ${widget.questions.length}',
                    style: const TextStyle(
                      fontSize: 14,
                      color: AppColors.textSecondary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Question Text
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppColors.border),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          currentQuestion.questionText,
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 16),

                        // Options
                        ...List.generate(
                          currentQuestion.options.length,
                          (index) {
                            final option =
                                ['A', 'B', 'C', 'D'][index];
                            final isSelected =
                                userAnswers[currentQuestionIndex] == option;
                            final isCorrectAnswer =
                                option == currentQuestion.correctAnswer;
                            final shouldShowCorrect = isAnswered &&
                                isCorrectAnswer &&
                                !isSelected;

                            return GestureDetector(
                              onTap: isAnswered
                                  ? null
                                  : () => _handleAnswer(option),
                              child: Container(
                                margin:
                                    const EdgeInsets.only(bottom: 10),
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: shouldShowCorrect
                                      ? Colors.green.shade50
                                      : isSelected
                                          ? AppColors.primarySoft
                                          : Colors.white,
                                  borderRadius:
                                      BorderRadius.circular(8),
                                  border: Border.all(
                                    color: shouldShowCorrect
                                        ? Colors.green
                                        : isSelected
                                            ? AppColors.primary
                                            : AppColors.border,
                                    width:
                                        shouldShowCorrect || isSelected
                                            ? 2
                                            : 1,
                                  ),
                                ),
                                child: Row(
                                  children: [
                                    Container(
                                      width: 24,
                                      height: 24,
                                      decoration: BoxDecoration(
                                        shape: BoxShape.circle,
                                        border: Border.all(
                                          color: shouldShowCorrect
                                              ? Colors.green
                                              : isSelected
                                                  ? AppColors
                                                      .primary
                                                  : AppColors
                                                      .border,
                                        ),
                                        color: shouldShowCorrect
                                            ? Colors.green
                                            : isSelected
                                                ? AppColors.primary
                                                : Colors.transparent,
                                      ),
                                      child: isSelected ||
                                              shouldShowCorrect
                                          ? Icon(
                                              Icons.check,
                                              size: 14,
                                              color: shouldShowCorrect
                                                  ? Colors.white
                                                  : Colors.white,
                                            )
                                          : null,
                                    ),
                                    const SizedBox(width: 12),
                                    Expanded(
                                      child: Text(
                                        '$option) ${currentQuestion.options[index]}',
                                        style: const TextStyle(
                                          fontSize: 14,
                                        ),
                                      ),
                                    ),
                                    if (shouldShowCorrect)
                                      const Icon(
                                        Icons.check_circle,
                                        color: Colors.green,
                                        size: 20,
                                      ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 16),

                  // View Explanation Button
                  if (isAnswered)
                    SizedBox(
                      width: double.infinity,
                      child: FilledButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) =>
                                  PracticeExplanationScreen(
                                question: currentQuestion,
                                userAnswer: userAnswers[
                                    currentQuestionIndex],
                              ),
                            ),
                          );
                        },
                        child: const Row(
                          mainAxisAlignment:
                              MainAxisAlignment.center,
                          children: [
                            Icon(Icons.lightbulb_outline, size: 18),
                            SizedBox(width: 8),
                            Text('View Full Explanation'),
                          ],
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),

          // Navigation Bar
          _buildNavigationBar(),
        ],
      ),
    );
  }

  Widget _buildProgressSection() {
    return Container(
      padding: const EdgeInsets.all(16),
      color: Colors.white,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Question Progress',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
          const SizedBox(height: 12),

          // Progress Dots
          Wrap(
            spacing: 4,
            runSpacing: 4,
            children: List.generate(
              widget.questions.length,
              (index) {
                final isAnswered = answeredQuestions.contains(index);
                final isCurrentQuestion = index == currentQuestionIndex;

                return GestureDetector(
                  onTap: () {
                    setState(() => currentQuestionIndex = index);
                  },
                  child: Container(
                    width: 28,
                    height: 28,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: isAnswered ? Colors.green : Colors.grey.shade300,
                      border: Border.all(
                        color: isCurrentQuestion
                            ? AppColors.primary
                            : Colors.transparent,
                        width: 2,
                      ),
                    ),
                    child: Center(
                      child: Text(
                        '${index + 1}',
                        style: TextStyle(
                          color: isAnswered ? Colors.white : Colors.grey,
                          fontSize: 9,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),

          const SizedBox(height: 12),

          // Progress Stats
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildStatChip(
                'Attempted',
                answeredQuestions.length.toString(),
              ),
              _buildStatChip(
                'Remaining',
                (widget.questions.length - answeredQuestions.length)
                    .toString(),
              ),
              _buildStatChip(
                'Accuracy',
                '${(answeredQuestions.isEmpty ? 0 : answeredQuestions.length)} / ${widget.questions.length}',
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatChip(String label, String value) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w700,
            color: AppColors.primary,
          ),
        ),
        Text(
          label,
          style: const TextStyle(
            fontSize: 10,
            color: AppColors.textSecondary,
          ),
        ),
      ],
    );
  }

  Widget _buildNavigationBar() {
    final isLastQuestion = currentQuestionIndex == widget.questions.length - 1;
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(
          top: BorderSide(color: AppColors.border),
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: OutlinedButton(
              onPressed: currentQuestionIndex > 0 ? _goToPreviousQuestion : null,
              child: const Text('← Previous'),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: FilledButton(
              onPressed: isLastQuestion
                  ? () => setState(() => _showResults = true)
                  : _goToNextQuestion,
              child: Text(isLastQuestion ? 'Finish & View Score' : 'Next →'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildResultsScreen() {
    int correct = 0;
    for (int i = 0; i < practiceQuestions.length; i++) {
      if (userAnswers[i] == practiceQuestions[i].correctAnswer) {
        correct++;
      }
    }
    final wrong = userAnswers.length - correct;
    final unattempted = practiceQuestions.length - userAnswers.length;
    final accuracy = userAnswers.isEmpty ? 0.0 : (correct / userAnswers.length) * 100;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Practice Results'),
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Score Card
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    AppColors.primaryDark,
                    AppColors.primary,
                    AppColors.accentLight,
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                children: [
                  const Text(
                    'Your Score',
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.white70,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    '$correct / ${practiceQuestions.length}',
                    style: const TextStyle(
                      fontSize: 48,
                      fontWeight: FontWeight.w800,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '${accuracy.toStringAsFixed(1)}%',
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.w700,
                      color: Colors.white70,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Performance Stats
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.grey.shade100,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Performance Breakdown',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      Column(
                        children: [
                          Text(
                            correct.toString(),
                            style: const TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.w700,
                              color: Colors.green,
                            ),
                          ),
                          const Text(
                            'Correct',
                            style: TextStyle(
                              fontSize: 12,
                              color: AppColors.textSecondary,
                            ),
                          ),
                        ],
                      ),
                      Column(
                        children: [
                          Text(
                            wrong.toString(),
                            style: const TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.w700,
                              color: Colors.red,
                            ),
                          ),
                          const Text(
                            'Wrong',
                            style: TextStyle(
                              fontSize: 12,
                              color: AppColors.textSecondary,
                            ),
                          ),
                        ],
                      ),
                      Column(
                        children: [
                          Text(
                            unattempted.toString(),
                            style: const TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.w700,
                              color: AppColors.textSecondary,
                            ),
                          ),
                          const Text(
                            'Unattempted',
                            style: TextStyle(
                              fontSize: 12,
                              color: AppColors.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 32),

            // Review Section with Page Dots
            _buildReviewSection(),

            const SizedBox(height: 24),

            // Action Buttons
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text('Back'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: FilledButton(
                    onPressed: () => setState(() => _showResults = false),
                    child: const Text('Review Answers'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildReviewSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Answer Review',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 16),
        SizedBox(
          height: 380,
          child: PageView.builder(
            controller: _reviewController,
            onPageChanged: (_) => setState(() {}),
            itemCount: practiceQuestions.length,
            itemBuilder: (context, index) => _buildPracticeReviewCard(index),
          ),
        ),
        const SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(
            practiceQuestions.length,
            (index) => Container(
              width: 8,
              height: 8,
              margin: const EdgeInsets.symmetric(horizontal: 4),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: _reviewController.hasClients &&
                       _reviewController.page!.round() == index
                    ? AppColors.primary
                    : AppColors.border,
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildPracticeReviewCard(int index) {
    final question = practiceQuestions[index];
    final userAnswer = userAnswers[index];
    final isCorrect = userAnswer == question.correctAnswer;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.border),
      ),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Question ${index + 1}',
                  style: Theme.of(context).textTheme.labelLarge,
                ),
                Icon(
                  isCorrect ? Icons.check_circle : Icons.cancel,
                  color: isCorrect ? Colors.green : Colors.red,
                  size: 20,
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              question.questionText,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 12),
            if (userAnswer != null)
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.red.withValues(alpha: 0.08),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Colors.red.withValues(alpha: 0.3)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.close, color: Colors.red, size: 18),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Your Answer', style: TextStyle(fontSize: 11, color: Colors.red)),
                          Text(userAnswer, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: Colors.green.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.green.withValues(alpha: 0.3)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.check, color: Colors.green, size: 18),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Correct Answer', style: TextStyle(fontSize: 11, color: Colors.green)),
                        Text(question.correctAnswer, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            if (question.explanation != null && question.explanation!.isNotEmpty) ...[
              const Divider(),
              const SizedBox(height: 8),
              Row(
                children: [
                  const Icon(Icons.lightbulb_outline, size: 16, color: AppColors.primary),
                  const SizedBox(width: 8),
                  const Text('Explanation', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                question.explanation!,
                style: const TextStyle(fontSize: 12),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

/// Practice Explanation Screen
class PracticeExplanationScreen extends StatelessWidget {
  final PracticeQuestion question;
  final String? userAnswer;

  const PracticeExplanationScreen({
    super.key,
    required this.question,
    this.userAnswer,
  });

  @override
  Widget build(BuildContext context) {
    final isCorrect = userAnswer == question.correctAnswer;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Explanation'),
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Question
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.blue.shade50,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.blue.shade200),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Question',
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.blue.shade700,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    question.questionText,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Your Answer
            if (userAnswer != null)
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: isCorrect
                      ? Colors.green.shade50
                      : Colors.red.shade50,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: isCorrect
                        ? Colors.green.shade200
                        : Colors.red.shade200,
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(
                          isCorrect
                              ? Icons.check_circle
                              : Icons.close_rounded,
                          color: isCorrect ? Colors.green : Colors.red,
                          size: 20,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'Your Answer',
                          style: TextStyle(
                            fontSize: 12,
                            color: isCorrect
                                ? Colors.green.shade700
                                : Colors.red.shade700,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '$userAnswer) ${question.options[_getOptionIndex(userAnswer!)]}',
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        color: isCorrect
                            ? Colors.green.shade700
                            : Colors.red.shade700,
                      ),
                    ),
                  ],
                ),
              ),

            if (!isCorrect && userAnswer != null) ...[
              const SizedBox(height: 20),

              // Correct Answer
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.green.shade50,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.green.shade200),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(
                          Icons.check_circle,
                          color: Colors.green,
                          size: 20,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'Correct Answer',
                          style: TextStyle(
                            fontSize: 12,
                            color: Colors.green.shade700,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '${question.correctAnswer}) ${question.options[_getOptionIndex(question.correctAnswer)]}',
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF1F8A54),
                      ),
                    ),
                  ],
                ),
              ),
            ],

            const SizedBox(height: 24),

            // Detailed Explanation
            Text(
              'Detailed Explanation',
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 12),

            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    question.explanation ?? 'No explanation available',
                    style: const TextStyle(
                      fontSize: 14,
                      height: 1.6,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  // Display multiple explanation images
                  if (question.explanationImages.isNotEmpty) ...[
                    const SizedBox(height: 16),
                    ...question.explanationImages.map((img) {
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            if (img.caption?.isNotEmpty ?? false) ...[
                              Text(
                                img.caption!,
                                style: const TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              const SizedBox(height: 6),
                            ],
                            ClipRRect(
                              borderRadius: BorderRadius.circular(8),
                              child: FastNetworkImage(
                                url: img.imageUrl,
                                fit: BoxFit.cover,
                                thumbWidth: 800,
                              ),
                            ),
                          ],
                        ),
                      );
                    }),
                  ],
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Topic Info
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.grey.shade100,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  Icon(
                    Icons.label_outline,
                    size: 16,
                    color: Colors.grey.shade600,
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Topic: ${question.topic}',
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Back Button
            SizedBox(
              width: double.infinity,
              child: FilledButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('Back to Questions'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  int _getOptionIndex(String option) {
    switch (option) {
      case 'A':
        return 0;
      case 'B':
        return 1;
      case 'C':
        return 2;
      case 'D':
        return 3;
      default:
        return 0;
    }
  }
}

/// Model for Practice Question
class PracticeQuestion {
  final int id;
  final String questionText;
  final List<String> options;
  final String correctAnswer;
  final String topic;
  final String? explanation;
  final List<ExplanationImage> explanationImages;

  PracticeQuestion({
    required this.id,
    required this.questionText,
    required this.options,
    required this.correctAnswer,
    required this.topic,
    this.explanation,
    this.explanationImages = const [],
  });
}

/// Model for Explanation Images
class ExplanationImage {
  final int id;
  final String imageUrl;
  final String? caption;
  final int orderIndex;

  ExplanationImage({
    required this.id,
    required this.imageUrl,
    this.caption,
    required this.orderIndex,
  });

  factory ExplanationImage.fromJson(Map<String, dynamic> json) {
    return ExplanationImage(
      id: json['id'] ?? 0,
      imageUrl: json['image_url'] ?? json['image_drive_link'] ?? '',
      caption: json['caption'],
      orderIndex: json['order_index'] ?? 0,
    );
  }
}
