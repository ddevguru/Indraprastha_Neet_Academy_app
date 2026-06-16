import 'package:flutter/material.dart';

// Screen 1: Test Score Summary
class TestScoreSummaryScreen extends StatelessWidget {
  final dynamic testResponse;
  final VoidCallback onReviewTap;

  const TestScoreSummaryScreen({
    Key? key,
    required this.testResponse,
    required this.onReviewTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final attempt = testResponse['attempt'] ?? {};
    final analytics = testResponse['analytics'] ?? {};
    final aiAnalytics = testResponse['aiAnalytics'] ?? {};
    final insights = aiAnalytics['insights'] ?? [];

    final score = attempt['score'] ?? 0;
    final accuracy = attempt['accuracy'] ?? 0.0;
    final correctCount = analytics['correct_count'] ?? 0;
    final wrongCount = analytics['wrong_count'] ?? 0;
    final unattemptedCount = analytics['unattempted_count'] ?? 0;

    return SingleChildScrollView(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Score Display
            Card(
              elevation: 4,
              child: Container(
                padding: EdgeInsets.all(24),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Color(0xFFE53935), Color(0xFFC62828)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  children: [
                    Text(
                      '$score',
                      style: TextStyle(
                        fontSize: 64,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    SizedBox(height: 8),
                    Text(
                      '${accuracy.toStringAsFixed(1)}% Accuracy',
                      style: TextStyle(
                        fontSize: 24,
                        color: Colors.white70,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(height: 24),

            // Performance Breakdown
            Container(
              padding: EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.grey[100],
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                children: [
                  Text(
                    'Performance Breakdown',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _buildStatCard(
                        label: 'Correct',
                        value: '$correctCount',
                        color: Colors.green,
                      ),
                      _buildStatCard(
                        label: 'Wrong',
                        value: '$wrongCount',
                        color: Colors.red,
                      ),
                      _buildStatCard(
                        label: 'Unattempted',
                        value: '$unattemptedCount',
                        color: Colors.orange,
                      ),
                    ],
                  ),
                ],
              ),
            ),
            SizedBox(height: 24),

            // AI Insights
            if (insights.isNotEmpty)
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '🤖 AI Insights',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 12),
                  ListView.builder(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    itemCount: insights.length,
                    itemBuilder: (context, index) {
                      final insight = insights[index];
                      return _buildInsightCard(
                        title: insight['insight_title'] ?? '',
                        body: insight['insight_body'] ?? '',
                        priority: insight['priority'] ?? 'medium',
                      );
                    },
                  ),
                  SizedBox(height: 24),
                ],
              ),

            // Review Button
            ElevatedButton(
              onPressed: onReviewTap,
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFFE53935),
                padding: EdgeInsets.symmetric(horizontal: 48, vertical: 16),
              ),
              child: Text(
                'Review Questions',
                style: TextStyle(fontSize: 16, color: Colors.white),
              ),
            ),
            SizedBox(height: 16),
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text('Back'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard({
    required String label,
    required String value,
    required Color color,
  }) {
    return Column(
      children: [
        CircleAvatar(
          radius: 30,
          backgroundColor: color.withValues(alpha: 0.2),
          child: Text(
            value,
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
        ),
        SizedBox(height: 8),
        Text(label, style: TextStyle(fontSize: 12)),
      ],
    );
  }

  Widget _buildInsightCard({
    required String title,
    required String body,
    required String priority,
  }) {
    Color getPriorityColor() {
      switch (priority) {
        case 'high':
          return Colors.red;
        case 'medium':
          return Colors.orange;
        default:
          return Colors.blue;
      }
    }

    return Card(
      margin: EdgeInsets.only(bottom: 12),
      child: Container(
        padding: EdgeInsets.all(12),
        decoration: BoxDecoration(
          border: Border(
            left: BorderSide(color: getPriorityColor(), width: 4),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 4),
            Text(body, style: TextStyle(fontSize: 13)),
          ],
        ),
      ),
    );
  }
}

// Screen 2: Question Review with Pagination
class QuestionReviewScreen extends StatefulWidget {
  final List<dynamic> questions;

  const QuestionReviewScreen({
    Key? key,
    required this.questions,
  }) : super(key: key);

  @override
  _QuestionReviewScreenState createState() => _QuestionReviewScreenState();
}

class _QuestionReviewScreenState extends State<QuestionReviewScreen> {
  late PageController _pageController;
  int currentIndex = 0;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _nextQuestion() {
    if (currentIndex < widget.questions.length - 1) {
      _pageController.nextPage(
        duration: Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  void _previousQuestion() {
    if (currentIndex > 0) {
      _pageController.previousPage(
        duration: Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Review: ${currentIndex + 1}/${widget.questions.length}'),
        backgroundColor: Color(0xFFE53935),
      ),
      body: Column(
        children: [
          // Pagination dots
          Container(
            padding: EdgeInsets.all(16),
            color: Colors.grey[100],
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(
                widget.questions.length,
                (i) => Container(
                  width: i == currentIndex ? 12 : 8,
                  height: 8,
                  margin: EdgeInsets.symmetric(horizontal: 4),
                  decoration: BoxDecoration(
                    color: i == currentIndex ? Color(0xFFE53935) : Colors.grey,
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            ),
          ),

          // Questions PageView
          Expanded(
            child: PageView.builder(
              controller: _pageController,
              onPageChanged: (index) {
                setState(() => currentIndex = index);
              },
              itemCount: widget.questions.length,
              itemBuilder: (context, index) {
                return _QuestionReviewCard(question: widget.questions[index]);
              },
            ),
          ),

          // Navigation buttons
          Container(
            padding: EdgeInsets.all(16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ElevatedButton.icon(
                  onPressed: currentIndex > 0 ? _previousQuestion : null,
                  icon: Icon(Icons.arrow_back),
                  label: Text('Previous'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.grey[400],
                  ),
                ),
                ElevatedButton.icon(
                  onPressed: currentIndex < widget.questions.length - 1
                      ? _nextQuestion
                      : null,
                  icon: Icon(Icons.arrow_forward),
                  label: Text('Next'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFFE53935),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// Individual question card
class _QuestionReviewCard extends StatelessWidget {
  final dynamic question;

  const _QuestionReviewCard({Key? key, required this.question}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isCorrect = question['user_answer'] == question['correct_answer'];
    final explanationImages = question['explanation_images_list'] ?? [];

    return SingleChildScrollView(
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Question text
          Container(
            padding: EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.grey[200],
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              question['question'] ?? '',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
            ),
          ),
          SizedBox(height: 16),

          // Answer status
          Container(
            padding: EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: isCorrect ? Colors.green[50] : Colors.red[50],
              border: Border.all(
                color: isCorrect ? Colors.green : Colors.red,
              ),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  isCorrect ? '✓ CORRECT' : '✗ INCORRECT',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: isCorrect ? Colors.green : Colors.red,
                  ),
                ),
                SizedBox(height: 8),
                Text(
                  'Your Answer: ${question['user_answer']}',
                  style: TextStyle(fontSize: 14),
                ),
                Text(
                  'Correct Answer: ${question['correct_answer']}',
                  style: TextStyle(fontSize: 14),
                ),
              ],
            ),
          ),
          SizedBox(height: 16),

          // Explanation text
          if (question['explanation'] != null)
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Explanation',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 8),
                Text(question['explanation']),
                SizedBox(height: 16),
              ],
            ),

          // Explanation images
          if (explanationImages.isNotEmpty)
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Diagrams & Images',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 12),
                ListView.builder(
                  shrinkWrap: true,
                  physics: NeverScrollableScrollPhysics(),
                  itemCount: explanationImages.length,
                  itemBuilder: (context, index) {
                    final img = explanationImages[index];
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.circular(8),
                          child: Image.network(
                            img['image_url'] ?? '',
                            errorBuilder: (context, error, stackTrace) =>
                                Container(
                              color: Colors.grey[300],
                              child: Icon(Icons.broken_image),
                            ),
                          ),
                        ),
                        if (img['caption'] != null && img['caption'].isNotEmpty)
                          Padding(
                            padding: EdgeInsets.only(top: 8),
                            child: Text(
                              img['caption'],
                              style: TextStyle(
                                fontSize: 12,
                                fontStyle: FontStyle.italic,
                                color: Colors.grey[600],
                              ),
                            ),
                          ),
                        SizedBox(height: 16),
                      ],
                    );
                  },
                ),
              ],
            ),
        ],
      ),
    );
  }
}
