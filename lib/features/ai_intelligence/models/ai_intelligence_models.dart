class AiOverviewData {
  final int userId;
  final double overallMastery;
  final int predictedNeetScore;
  final int totalTopicsAnalyzed;
  final int masteredTopicsCount;
  final CategoryCounts categories;
  final List<SubjectMasteryItem> subjectMastery;
  final List<StudyPlanItem> todayRecommendations;

  const AiOverviewData({
    required this.userId,
    required this.overallMastery,
    required this.predictedNeetScore,
    required this.totalTopicsAnalyzed,
    required this.masteredTopicsCount,
    required this.categories,
    required this.subjectMastery,
    required this.todayRecommendations,
  });

  factory AiOverviewData.fromJson(Map<String, dynamic> json) {
    final cat = json['categories'] as Map<String, dynamic>? ?? {};
    final subList = json['subjectMastery'] as List<dynamic>? ?? [];
    final recList = json['todayRecommendations'] as List<dynamic>? ?? [];

    return AiOverviewData(
      userId: json['userId'] is int ? json['userId'] as int : int.tryParse(json['userId']?.toString() ?? '0') ?? 0,
      overallMastery: (json['overallMastery'] is num) ? (json['overallMastery'] as num).toDouble() : double.tryParse(json['overallMastery']?.toString() ?? '0') ?? 0.0,
      predictedNeetScore: json['predictedNeetScore'] is int ? json['predictedNeetScore'] as int : int.tryParse(json['predictedNeetScore']?.toString() ?? '0') ?? 0,
      totalTopicsAnalyzed: json['totalTopicsAnalyzed'] is int ? json['totalTopicsAnalyzed'] as int : int.tryParse(json['totalTopicsAnalyzed']?.toString() ?? '0') ?? 0,
      masteredTopicsCount: json['masteredTopicsCount'] is int ? json['masteredTopicsCount'] as int : int.tryParse(json['masteredTopicsCount']?.toString() ?? '0') ?? 0,
      categories: CategoryCounts.fromJson(cat),
      subjectMastery: subList.map((e) => SubjectMasteryItem.fromJson(e as Map<String, dynamic>)).toList(),
      todayRecommendations: recList.map((e) => StudyPlanItem.fromJson(e as Map<String, dynamic>)).toList(),
    );
  }
}

class CategoryCounts {
  final int notStudiedCount;
  final int poorlyUnderstoodCount;
  final int repeatedMistakesCount;
  final int needsRevisionCount;

  const CategoryCounts({
    required this.notStudiedCount,
    required this.poorlyUnderstoodCount,
    required this.repeatedMistakesCount,
    required this.needsRevisionCount,
  });

  factory CategoryCounts.fromJson(Map<String, dynamic> json) {
    return CategoryCounts(
      notStudiedCount: json['notStudiedCount'] is int ? json['notStudiedCount'] as int : int.tryParse(json['notStudiedCount']?.toString() ?? '0') ?? 0,
      poorlyUnderstoodCount: json['poorlyUnderstoodCount'] is int ? json['poorlyUnderstoodCount'] as int : int.tryParse(json['poorlyUnderstoodCount']?.toString() ?? '0') ?? 0,
      repeatedMistakesCount: json['repeatedMistakesCount'] is int ? json['repeatedMistakesCount'] as int : int.tryParse(json['repeatedMistakesCount']?.toString() ?? '0') ?? 0,
      needsRevisionCount: json['needsRevisionCount'] is int ? json['needsRevisionCount'] as int : int.tryParse(json['needsRevisionCount']?.toString() ?? '0') ?? 0,
    );
  }
}

class SubjectMasteryItem {
  final String subject;
  final double mastery;
  final double accuracy;
  final int topicCount;

  const SubjectMasteryItem({
    required this.subject,
    required this.mastery,
    required this.accuracy,
    required this.topicCount,
  });

  factory SubjectMasteryItem.fromJson(Map<String, dynamic> json) {
    return SubjectMasteryItem(
      subject: json['subject']?.toString() ?? '',
      mastery: (json['mastery'] is num) ? (json['mastery'] as num).toDouble() : double.tryParse(json['mastery']?.toString() ?? '0') ?? 0.0,
      accuracy: (json['accuracy'] is num) ? (json['accuracy'] as num).toDouble() : double.tryParse(json['accuracy']?.toString() ?? '0') ?? 0.0,
      topicCount: json['topicCount'] is int ? json['topicCount'] as int : int.tryParse(json['topicCount']?.toString() ?? '0') ?? 0,
    );
  }
}

class TopicLearningItem {
  final int id;
  final String subject;
  final String chapter;
  final String topic;
  final String studyStatus;
  final double masteryScore;
  final String masteryCategory;
  final double predictionConfidence;
  final String performanceTrend;
  final bool isNotStudied;
  final bool isPoorlyUnderstood;
  final bool isRepeatedlyIncorrect;
  final bool isNeedsRevision;
  final int totalQuestionsAttempted;
  final int totalQuestionsCorrect;
  final double accuracyPercentage;
  final int repeatedMistakeCount;
  final double retentionEstimate;
  final String revisionPriority;
  final String aiExplanation;
  final String recommendedAction;

  const TopicLearningItem({
    required this.id,
    required this.subject,
    required this.chapter,
    required this.topic,
    required this.studyStatus,
    required this.masteryScore,
    required this.masteryCategory,
    required this.predictionConfidence,
    required this.performanceTrend,
    required this.isNotStudied,
    required this.isPoorlyUnderstood,
    required this.isRepeatedlyIncorrect,
    required this.isNeedsRevision,
    required this.totalQuestionsAttempted,
    required this.totalQuestionsCorrect,
    required this.accuracyPercentage,
    required this.repeatedMistakeCount,
    required this.retentionEstimate,
    required this.revisionPriority,
    required this.aiExplanation,
    required this.recommendedAction,
  });

  factory TopicLearningItem.fromJson(Map<String, dynamic> json) {
    return TopicLearningItem(
      id: json['id'] is int ? json['id'] as int : int.tryParse(json['id']?.toString() ?? '0') ?? 0,
      subject: json['subject']?.toString() ?? '',
      chapter: json['chapter']?.toString() ?? '',
      topic: json['topic']?.toString() ?? '',
      studyStatus: json['study_status']?.toString() ?? 'UNKNOWN',
      masteryScore: (json['mastery_score'] is num) ? (json['mastery_score'] as num).toDouble() : double.tryParse(json['mastery_score']?.toString() ?? '0') ?? 0.0,
      masteryCategory: json['mastery_category']?.toString() ?? 'NOVICE',
      predictionConfidence: (json['prediction_confidence'] is num) ? (json['prediction_confidence'] as num).toDouble() : double.tryParse(json['prediction_confidence']?.toString() ?? '0') ?? 0.0,
      performanceTrend: json['performance_trend']?.toString() ?? 'STABLE',
      isNotStudied: json['is_not_studied'] == true,
      isPoorlyUnderstood: json['is_poorly_understood'] == true,
      isRepeatedlyIncorrect: json['is_repeatedly_incorrect'] == true,
      isNeedsRevision: json['is_needs_revision'] == true,
      totalQuestionsAttempted: json['total_questions_attempted'] is int ? json['total_questions_attempted'] as int : int.tryParse(json['total_questions_attempted']?.toString() ?? '0') ?? 0,
      totalQuestionsCorrect: json['total_questions_correct'] is int ? json['total_questions_correct'] as int : int.tryParse(json['total_questions_correct']?.toString() ?? '0') ?? 0,
      accuracyPercentage: (json['accuracy_percentage'] is num) ? (json['accuracy_percentage'] as num).toDouble() : double.tryParse(json['accuracy_percentage']?.toString() ?? '0') ?? 0.0,
      repeatedMistakeCount: json['repeated_mistake_count'] is int ? json['repeated_mistake_count'] as int : int.tryParse(json['repeated_mistake_count']?.toString() ?? '0') ?? 0,
      retentionEstimate: (json['retention_estimate'] is num) ? (json['retention_estimate'] as num).toDouble() : double.tryParse(json['retention_estimate']?.toString() ?? '100') ?? 100.0,
      revisionPriority: json['revision_priority']?.toString() ?? 'NONE',
      aiExplanation: json['ai_explanation']?.toString() ?? '',
      recommendedAction: json['recommended_action']?.toString() ?? '',
    );
  }
}

class TopicDetailData extends TopicLearningItem {
  final List<RepeatedMistakeItem> repeatedMistakesList;

  const TopicDetailData({
    required super.id,
    required super.subject,
    required super.chapter,
    required super.topic,
    required super.studyStatus,
    required super.masteryScore,
    required super.masteryCategory,
    required super.predictionConfidence,
    required super.performanceTrend,
    required super.isNotStudied,
    required super.isPoorlyUnderstood,
    required super.isRepeatedlyIncorrect,
    required super.isNeedsRevision,
    required super.totalQuestionsAttempted,
    required super.totalQuestionsCorrect,
    required super.accuracyPercentage,
    required super.repeatedMistakeCount,
    required super.retentionEstimate,
    required super.revisionPriority,
    required super.aiExplanation,
    required super.recommendedAction,
    required this.repeatedMistakesList,
  });

  factory TopicDetailData.fromJson(Map<String, dynamic> json) {
    final base = TopicLearningItem.fromJson(json);
    final rawMistakes = json['repeatedMistakesList'] as List<dynamic>? ?? [];

    return TopicDetailData(
      id: base.id,
      subject: base.subject,
      chapter: base.chapter,
      topic: base.topic,
      studyStatus: base.studyStatus,
      masteryScore: base.masteryScore,
      masteryCategory: base.masteryCategory,
      predictionConfidence: base.predictionConfidence,
      performanceTrend: base.performanceTrend,
      isNotStudied: base.isNotStudied,
      isPoorlyUnderstood: base.isPoorlyUnderstood,
      isRepeatedlyIncorrect: base.isRepeatedlyIncorrect,
      isNeedsRevision: base.isNeedsRevision,
      totalQuestionsAttempted: base.totalQuestionsAttempted,
      totalQuestionsCorrect: base.totalQuestionsCorrect,
      accuracyPercentage: base.accuracyPercentage,
      repeatedMistakeCount: base.repeatedMistakeCount,
      retentionEstimate: base.retentionEstimate,
      revisionPriority: base.revisionPriority,
      aiExplanation: base.aiExplanation,
      recommendedAction: base.recommendedAction,
      repeatedMistakesList: rawMistakes.map((e) => RepeatedMistakeItem.fromJson(e as Map<String, dynamic>)).toList(),
    );
  }
}

class RepeatedMistakeItem {
  final int id;
  final String concept;
  final int? questionId;
  final String sourceType;
  final int wrongAttemptCount;
  final String lastWrongAnswer;
  final String correctAnswer;
  final String questionText;
  final String explanation;
  final bool isResolved;

  const RepeatedMistakeItem({
    required this.id,
    required this.concept,
    this.questionId,
    required this.sourceType,
    required this.wrongAttemptCount,
    required this.lastWrongAnswer,
    required this.correctAnswer,
    required this.questionText,
    required this.explanation,
    required this.isResolved,
  });

  factory RepeatedMistakeItem.fromJson(Map<String, dynamic> json) {
    return RepeatedMistakeItem(
      id: json['id'] is int ? json['id'] as int : int.tryParse(json['id']?.toString() ?? '0') ?? 0,
      concept: json['concept']?.toString() ?? '',
      questionId: json['question_id'] as int?,
      sourceType: json['source_type']?.toString() ?? 'test',
      wrongAttemptCount: json['wrong_attempt_count'] is int ? json['wrong_attempt_count'] as int : int.tryParse(json['wrong_attempt_count']?.toString() ?? '1') ?? 1,
      lastWrongAnswer: json['last_wrong_answer']?.toString() ?? '',
      correctAnswer: json['correct_answer']?.toString() ?? '',
      questionText: json['question_text']?.toString() ?? '',
      explanation: json['explanation']?.toString() ?? '',
      isResolved: json['is_resolved'] == true,
    );
  }
}

class StudyPlanItem {
  final int id;
  final String category;
  final int priority;
  final String subject;
  final String chapter;
  final String topic;
  final String actionType;
  final String title;
  final String description;
  final String targetResourceType;
  final int estimatedMinutes;
  final bool isCompleted;

  const StudyPlanItem({
    required this.id,
    required this.category,
    required this.priority,
    required this.subject,
    required this.chapter,
    required this.topic,
    required this.actionType,
    required this.title,
    required this.description,
    required this.targetResourceType,
    required this.estimatedMinutes,
    required this.isCompleted,
  });

  factory StudyPlanItem.fromJson(Map<String, dynamic> json) {
    return StudyPlanItem(
      id: json['id'] is int ? json['id'] as int : int.tryParse(json['id']?.toString() ?? '0') ?? 0,
      category: json['category']?.toString() ?? '',
      priority: json['priority'] is int ? json['priority'] as int : int.tryParse(json['priority']?.toString() ?? '1') ?? 1,
      subject: json['subject']?.toString() ?? '',
      chapter: json['chapter']?.toString() ?? '',
      topic: json['topic']?.toString() ?? '',
      actionType: json['action_type']?.toString() ?? 'study_chapter',
      title: json['title']?.toString() ?? '',
      description: json['description']?.toString() ?? '',
      targetResourceType: json['target_resource_type']?.toString() ?? 'book_chapter',
      estimatedMinutes: json['estimated_minutes'] is int ? json['estimated_minutes'] as int : int.tryParse(json['estimated_minutes']?.toString() ?? '15') ?? 15,
      isCompleted: json['is_completed'] == true,
    );
  }
}

class StudyPlanData {
  final List<StudyPlanItem> pendingTasks;
  final List<StudyPlanItem> completedTasks;
  final int pendingCount;
  final int completedCount;
  final int totalEstimatedMinutes;

  const StudyPlanData({
    required this.pendingTasks,
    required this.completedTasks,
    required this.pendingCount,
    required this.completedCount,
    required this.totalEstimatedMinutes,
  });

  factory StudyPlanData.fromJson(Map<String, dynamic> json) {
    final pendingRaw = json['pendingTasks'] as List<dynamic>? ?? [];
    final completedRaw = json['completedTasks'] as List<dynamic>? ?? [];
    final summary = json['summary'] as Map<String, dynamic>? ?? {};

    return StudyPlanData(
      pendingTasks: pendingRaw.map((e) => StudyPlanItem.fromJson(e as Map<String, dynamic>)).toList(),
      completedTasks: completedRaw.map((e) => StudyPlanItem.fromJson(e as Map<String, dynamic>)).toList(),
      pendingCount: summary['pendingCount'] is int ? summary['pendingCount'] as int : int.tryParse(summary['pendingCount']?.toString() ?? '0') ?? 0,
      completedCount: summary['completedCount'] is int ? summary['completedCount'] as int : int.tryParse(summary['completedCount']?.toString() ?? '0') ?? 0,
      totalEstimatedMinutes: summary['totalEstimatedMinutes'] is int ? summary['totalEstimatedMinutes'] as int : int.tryParse(summary['totalEstimatedMinutes']?.toString() ?? '0') ?? 0,
    );
  }
}
