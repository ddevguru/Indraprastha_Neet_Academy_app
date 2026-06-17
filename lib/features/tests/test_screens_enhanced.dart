import 'package:flutter/material.dart';
import '../../theme/app_tokens.dart';
/// Enhanced Test Taking Screen with Progress Dots
class EnhancedTestScreen extends StatefulWidget {
  final int testId;
  final String testTitle;
  final int totalQuestions;
  final int durationMinutes;

  const EnhancedTestScreen({
    super.key,
    required this.testId,
    required this.testTitle,
    required this.totalQuestions,
    required this.durationMinutes,
  });

  @override
  State<EnhancedTestScreen> createState() => _EnhancedTestScreenState();
}

class _EnhancedTestScreenState extends State<EnhancedTestScreen> {
  late List<QuestionData> questions;
  int currentQuestionIndex = 0;
  int timeRemainingSeconds = 0;
  Set<int> answeredQuestions = {};
  Set<int> markedForReview = {};
  Map<int, String> userAnswers = {};

  @override
  void initState() {
    super.initState();
    timeRemainingSeconds = widget.durationMinutes * 60;
    _loadQuestions();
    _startTimer();
  }

  void _loadQuestions() {
   
    questions = List.generate(
      widget.totalQuestions,
      (index) => QuestionData(
        id: index + 1,
        questionText: 'Sample Question ${index + 1}',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'A',
        topic: 'Sample Topic',
      ),
    );
  }

  void _startTimer() {
    Future.delayed(const Duration(seconds: 1)).then((_) {
      if (mounted && timeRemainingSeconds > 0) {
        setState(() => timeRemainingSeconds--);
        _startTimer();
      }
    });
  }

  String _formatTime(int seconds) {
    int minutes = seconds ~/ 60;
    int secs = seconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${secs.toString().padLeft(2, '0')}';
  }

  void _handleAnswer(String answer) {
    setState(() {
      userAnswers[currentQuestionIndex] = answer;
      answeredQuestions.add(currentQuestionIndex);
      markedForReview.remove(currentQuestionIndex);
    });
  }

  void _markForReview() {
    setState(() {
      markedForReview.add(currentQuestionIndex);
    });
  }

  void _goToNextQuestion() {
    if (currentQuestionIndex < widget.totalQuestions - 1) {
      setState(() => currentQuestionIndex++);
    }
  }

  void _goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
      setState(() => currentQuestionIndex--);
    }
  }

  void _submitTest() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Submit Test?'),
        content: const Text('Are you sure you want to submit? You cannot change answers after this.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () {
              Navigator.pop(context);
              _navigateToResults();
            },
            child: const Text('Submit'),
          ),
        ],
      ),
    );
  }

  void _navigateToResults() {
    // Navigate to results screen
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => TestResultsScreen(
          testId: widget.testId,
          testTitle: widget.testTitle,
          totalQuestions: widget.totalQuestions,
          userAnswers: userAnswers,
          answeredQuestions: answeredQuestions.length,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final currentQuestion = questions[currentQuestionIndex];
    final isAnswered = answeredQuestions.contains(currentQuestionIndex);
    final isMarked = markedForReview.contains(currentQuestionIndex);

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.testTitle),
        elevation: 0,
      ),
      body: Column(
        children: [
          // Timer and Progress Bar
          _buildTimerAndProgress(),

          // Progress Dots
          _buildProgressDots(),

          // Question Container
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Question Counter
                  Text(
                    'Question ${currentQuestionIndex + 1} of ${widget.totalQuestions}',
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

                            return GestureDetector(
                              onTap: () => _handleAnswer(option),
                              child: Container(
                                margin:
                                    const EdgeInsets.only(bottom: 10),
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: isSelected
                                      ? AppColors.primarySoft
                                      : Colors.white,
                                  borderRadius:
                                      BorderRadius.circular(8),
                                  border: Border.all(
                                    color: isSelected
                                        ? AppColors.primary
                                        : AppColors.border,
                                    width: isSelected ? 2 : 1,
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
                                          color: isSelected
                                              ? AppColors.primary
                                              : AppColors.border,
                                        ),
                                        color: isSelected
                                            ? AppColors.primary
                                            : Colors.transparent,
                                      ),
                                      child: isSelected
                                          ? const Icon(
                                              Icons.check,
                                              size: 14,
                                              color: Colors.white,
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
                  FilledButton.tonal(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) =>
                              ExplanationDetailScreen(
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
                        Text('View Explanation'),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Navigation and Status Bar
          _buildNavigationBar(isAnswered, isMarked),
        ],
      ),
    );
  }

  Widget _buildTimerAndProgress() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: timeRemainingSeconds < 300
            ? Colors.red.shade50
            : Colors.blue.shade50,
        border: Border(
          bottom: BorderSide(
            color: timeRemainingSeconds < 300
                ? Colors.red.shade200
                : Colors.blue.shade200,
          ),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Time Remaining',
                    style: TextStyle(
                      fontSize: 12,
                      color: AppColors.textSecondary,
                    ),
                  ),
                  Text(
                    _formatTime(timeRemainingSeconds),
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.w700,
                      color: timeRemainingSeconds < 300
                          ? Colors.red
                          : AppColors.primary,
                    ),
                  ),
                ],
              ),
              if (timeRemainingSeconds < 300)
                const Icon(
                  Icons.warning_amber_rounded,
                  color: Colors.red,
                ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildProgressDots() {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Question Progress',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
              Row(
                children: [
                  _buildProgressLegend('Answered', Colors.green),
                  const SizedBox(width: 16),
                  _buildProgressLegend('Marked', Colors.orange),
                  const SizedBox(width: 16),
                  _buildProgressLegend('Not Attempted', Colors.grey),
                ],
              ),
            ],
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 6,
            runSpacing: 6,
            children: List.generate(
              widget.totalQuestions,
              (index) {
                Color dotColor;
                if (markedForReview.contains(index)) {
                  dotColor = Colors.orange;
                } else if (answeredQuestions.contains(index)) {
                  dotColor = Colors.green;
                } else {
                  dotColor = Colors.grey.shade300;
                }

                return GestureDetector(
                  onTap: () {
                    setState(() => currentQuestionIndex = index);
                  },
                  child: Container(
                    width: 32,
                    height: 32,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: dotColor,
                      border: Border.all(
                        color: currentQuestionIndex == index
                            ? AppColors.primary
                            : Colors.transparent,
                        width: 2,
                      ),
                    ),
                    child: Center(
                      child: Text(
                        '${index + 1}',
                        style: TextStyle(
                          color: dotColor == Colors.grey.shade300
                              ? Colors.grey
                              : Colors.white,
                          fontSize: 10,
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
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildProgressStat(
                'Answered',
                answeredQuestions.length.toString(),
              ),
              _buildProgressStat(
                'Marked',
                markedForReview.length.toString(),
              ),
              _buildProgressStat(
                'Remaining',
                (widget.totalQuestions -
                        answeredQuestions.length -
                        markedForReview.length)
                    .toString(),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildProgressLegend(String label, Color color) {
    return Row(
      children: [
        Container(
          width: 8,
          height: 8,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: color,
          ),
        ),
        const SizedBox(width: 4),
        Text(
          label,
          style: const TextStyle(fontSize: 10),
        ),
      ],
    );
  }

  Widget _buildProgressStat(String label, String value) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
            fontSize: 16,
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

  Widget _buildNavigationBar(bool isAnswered, bool isMarked) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(
          top: BorderSide(color: AppColors.border),
        ),
      ),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: _goToPreviousQuestion,
                  child: const Text('← Previous'),
                ),
              ),
              const SizedBox(width: 12),
              FilledButton.tonal(
                onPressed: _markForReview,
                child: Text(isMarked ? 'Marked ✓' : 'Mark for Review'),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: FilledButton(
                  onPressed: _goToNextQuestion,
                  child: const Text('Next →'),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            child: FilledButton.tonal(
              onPressed: _submitTest,
              style: FilledButton.styleFrom(
                backgroundColor:
                    AppColors.primary.withValues(alpha: 0.1),
              ),
              child: const Text('Submit Test'),
            ),
          ),
        ],
      ),
    );
  }
}

/// Explanation Detail Screen - Separate Page for Full Explanation
class ExplanationDetailScreen extends StatelessWidget {
  final QuestionData question;
  final String? userAnswer;

  const ExplanationDetailScreen({
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
                        isCorrect ? Icons.check_circle : Icons.close_rounded,
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
                    userAnswer != null
                        ? '$userAnswer) ${question.options[_getOptionIndex(userAnswer!)]}'
                        : 'Not answered',
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                      color: isCorrect ? Colors.green.shade700 : Colors.red.shade700,
                    ),
                  ),
                ],
              ),
            ),

            if (!isCorrect) ...[
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
                  if (question.explanationImageUrl != null) ...[
                    const SizedBox(height: 16),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: Image.network(
                        question.explanationImageUrl!,
                        width: double.infinity,
                        fit: BoxFit.cover,
                      ),
                    ),
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

            // Close Button
            SizedBox(
              width: double.infinity,
              child: FilledButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('Back to Test'),
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

/// Test Results Screen with Performance Comparison
class TestResultsScreen extends StatefulWidget {
  final int testId;
  final String testTitle;
  final int totalQuestions;
  final Map<int, String> userAnswers;
  final int answeredQuestions;

  const TestResultsScreen({
    super.key,
    required this.testId,
    required this.testTitle,
    required this.totalQuestions,
    required this.userAnswers,
    required this.answeredQuestions,
  });

  @override
  State<TestResultsScreen> createState() => _TestResultsScreenState();
}

class _TestResultsScreenState extends State<TestResultsScreen> {
  late Future<Map<String, dynamic>> _resultsFuture;
  late PageController _reviewController;

  @override
  void initState() {
    super.initState();
    _resultsFuture = _fetchResults();
    _reviewController = PageController();
  }

  @override
  void dispose() {
    _reviewController.dispose();
    super.dispose();
  }

  Future<Map<String, dynamic>> _fetchResults() async {
    // TODO: Calculate score and fetch comparison data from API
    await Future.delayed(const Duration(seconds: 1));

    // Mock data
    int score = (widget.answeredQuestions * 4).clamp(0, 360);
    return {
      'score': score,
      'percentage': ((score / 360) * 100).toStringAsFixed(1),
      'totalQuestions': widget.totalQuestions,
      'correct': widget.answeredQuestions,
      'accuracy': ((widget.answeredQuestions / widget.totalQuestions) * 100)
          .toStringAsFixed(1),
      'comparison': {
        'userPercentile': 75, // User's percentile (0-100)
        'averageScore': 280,
        'highestScore': 340,
        'studentsCount': 1250,
        'betterThanPercent': 75,
        'worsePercentage': 25,
      },
    };
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: _resultsFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Scaffold(
            body: const Center(child: CircularProgressIndicator()),
          );
        }

        if (snapshot.hasError) {
          return Scaffold(
            body: Center(child: Text('Error: ${snapshot.error}')),
          );
        }

        final results = snapshot.data ?? {};

        return Scaffold(
          appBar: AppBar(
            title: Text('${widget.testTitle} - Results'),
          ),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                // Score Card
                _buildScoreCard(results),

                const SizedBox(height: 24),

                // Subject Wise Performance
                _buildSubjectPerformance(),

                const SizedBox(height: 24),

                // Performance Comparison Graph
                _buildPerformanceComparison(results['comparison'] ?? {}),

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
                        onPressed: () {
                          // Navigate to full analysis
                        },
                        child: const Text('Full Analysis'),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildScoreCard(Map<String, dynamic> results) {
    final score = results['score'] ?? 0;
    final percentage = results['percentage'] ?? '0';

    return Container(
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
          Text(
            'Your Score',
            style: TextStyle(
              fontSize: 14,
              color: Colors.white70,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            '$score / 360',
            style: const TextStyle(
              fontSize: 48,
              fontWeight: FontWeight.w800,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            '$percentage%',
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w700,
              color: Colors.white70,
            ),
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.2),
              borderRadius: BorderRadius.circular(20),
            ),
            child: const Text(
              '✓ Test Submitted Successfully',
              style: TextStyle(
                color: Colors.white,
                fontSize: 12,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSubjectPerformance() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Subject-wise Performance',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w700,
          ),
        ),
        const SizedBox(height: 16),
        _buildSubjectBar('Physics', 82),
        const SizedBox(height: 12),
        _buildSubjectBar('Chemistry', 78),
        const SizedBox(height: 12),
        _buildSubjectBar('Biology', 72),
      ],
    );
  }

  Widget _buildSubjectBar(String subject, int accuracy) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              subject,
              style: const TextStyle(fontWeight: FontWeight.w600),
            ),
            Text(
              '$accuracy%',
              style: const TextStyle(fontWeight: FontWeight.w700),
            ),
          ],
        ),
        const SizedBox(height: 6),
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: LinearProgressIndicator(
            value: accuracy / 100,
            minHeight: 8,
            backgroundColor: Colors.grey.shade200,
            valueColor: AlwaysStoppedAnimation<Color>(
              accuracy >= 75
                  ? Colors.green
                  : accuracy >= 60
                      ? Colors.orange
                      : Colors.red,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildReviewSection() {
    final questionCount = widget.totalQuestions;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Answer Review',
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
        ),
        const SizedBox(height: 16),
        // PageView for review questions
        SizedBox(
          height: 380,
          child: PageView.builder(
            controller: _reviewController,
            onPageChanged: (index) {
              setState(() {});
            },
            itemCount: questionCount,
            itemBuilder: (context, index) => _buildReviewCard(index),
          ),
        ),
        const SizedBox(height: 12),
        // Page dots indicator
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(
            questionCount,
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

  Widget _buildReviewCard(int index) {
    // Mock question data - in production fetch from results
    final isCorrect = index % 3 != 0; // Mock: 2/3 correct
    final userAnswer = ['A', 'B', 'C', 'D'][index % 4];
    final correctAnswer = ['B', 'C', 'D', 'A'][index % 4];

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
                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
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
              'Sample Question ${index + 1}: What is the correct answer?',
              style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
            ),
            const SizedBox(height: 12),
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
                        Text('Option $userAnswer', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
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
                        Text('Option $correctAnswer', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            if (!isCorrect) ...[
              const Divider(),
              const SizedBox(height: 8),
              Row(
                children: [
                  const Icon(Icons.lightbulb_outline, size: 16, color: AppColors.primary),
                  const SizedBox(width: 8),
                  const Expanded(child: Text('Explanation', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600))),
                ],
              ),
              const SizedBox(height: 8),
              const Text(
                'This is the explanation for why this answer is correct. Study this carefully.',
                style: TextStyle(fontSize: 12),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildPerformanceComparison(
      Map<String, dynamic> comparison) {
    final userPercentile =
        (comparison['userPercentile'] as num?)?.toInt() ?? 75;
    final betterThanPercent =
        (comparison['betterThanPercent'] as num?)?.toInt() ?? 75;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'How You Compare',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w700,
          ),
        ),
        const SizedBox(height: 16),

        // Percentile Card
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.blue.shade50,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.blue.shade200),
          ),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Your Percentile',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: Colors.blue.shade100,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      '$userPercentile%',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                        color: Colors.blue.shade700,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: userPercentile / 100,
                  minHeight: 6,
                  backgroundColor: Colors.grey.shade300,
                  valueColor: AlwaysStoppedAnimation<Color>(
                    Colors.blue.shade500,
                  ),
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 16),

        // Performance Message
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: Colors.green.shade50,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.green.shade200),
          ),
          child: Row(
            children: [
              Icon(
                Icons.trending_up_rounded,
                color: Colors.green.shade600,
                size: 24,
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Great Job! 🎉',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                        color: Colors.green.shade700,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'You scored better than $betterThanPercent% of test takers',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.green.shade600,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 16),

        // Comparison Chart
        _buildComparisonChart(comparison),
      ],
    );
  }

  Widget _buildComparisonChart(
      Map<String, dynamic> comparison) {
    final averageScore =
        (comparison['averageScore'] as num?)?.toInt() ?? 280;
    final userScore = widget.answeredQuestions * 4;
    final maxValue = 360.0;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Score Distribution',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 12),

        // Simple Bar Chart
        Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Column(
              children: [
                Container(
                  width: 50,
                  height: (averageScore / maxValue) * 150,
                  decoration: BoxDecoration(
                    color: Colors.orange.shade300,
                    borderRadius: const BorderRadius.vertical(
                      top: Radius.circular(6),
                    ),
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Average',
                  style: TextStyle(fontSize: 12),
                ),
                Text(
                  averageScore.toString(),
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
            Column(
              children: [
                Container(
                  width: 50,
                  height: (userScore / maxValue) * 150,
                  decoration: BoxDecoration(
                    color: Colors.blue.shade500,
                    borderRadius: const BorderRadius.vertical(
                      top: Radius.circular(6),
                    ),
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Your Score',
                  style: TextStyle(fontSize: 12),
                ),
                Text(
                  userScore.toString(),
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
            Column(
              children: [
                Container(
                  width: 50,
                  height: 150,
                  decoration: BoxDecoration(
                    color: Colors.green.shade400,
                    borderRadius: const BorderRadius.vertical(
                      top: Radius.circular(6),
                    ),
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Highest',
                  style: TextStyle(fontSize: 12),
                ),
                const Text(
                  '340',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          ],
        ),
      ],
    );
  }
}

/// Model for Question Data
class QuestionData {
  final int id;
  final String questionText;
  final List<String> options;
  final String correctAnswer;
  final String topic;
  final String? explanation;
  final String? explanationImageUrl;

  QuestionData({
    required this.id,
    required this.questionText,
    required this.options,
    required this.correctAnswer,
    required this.topic,
    this.explanation,
    this.explanationImageUrl,
  });
}
