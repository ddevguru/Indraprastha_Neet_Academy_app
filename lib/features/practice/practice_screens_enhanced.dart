import 'package:flutter/material.dart';
import '../../theme/app_tokens.dart';

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

  @override
  void initState() {
    super.initState();
    _loadQuestions();
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
              onPressed: currentQuestionIndex < widget.questions.length - 1
                  ? _goToNextQuestion
                  : null,
              child: const Text('Next →'),
            ),
          ),
        ],
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
              child: Text(
                question.explanation ?? 'No explanation available',
                style: const TextStyle(
                  fontSize: 14,
                  height: 1.6,
                  color: AppColors.textPrimary,
                ),
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

  PracticeQuestion({
    required this.id,
    required this.questionText,
    required this.options,
    required this.correctAnswer,
    required this.topic,
    this.explanation,
  });
}
