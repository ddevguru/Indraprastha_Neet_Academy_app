import 'package:flutter/material.dart';

enum SubjectType { physics, chemistry, botany, zoology }

extension SubjectTypeX on SubjectType {
  String get label => switch (this) {
        SubjectType.physics => 'Physics',
        SubjectType.chemistry => 'Chemistry',
        SubjectType.botany => 'Botany',
        SubjectType.zoology => 'Zoology',
      };

  IconData get icon => switch (this) {
        SubjectType.physics => Icons.rocket_launch_rounded,
        SubjectType.chemistry => Icons.science_rounded,
        SubjectType.botany => Icons.spa_rounded,
        SubjectType.zoology => Icons.pets_rounded,
      };
}

class AppUser {
  const AppUser({
    required this.fullName,
    required this.mobileNumber,
    this.email = '',
    this.targetExamYear = 'NEET',
    this.preferredPlan = 'Starter',
    this.preferredLanguage = 'English',
    this.courseCategory,
    this.collegeState,
    this.mbbsAdmissionYear,
    this.medicalCollege,
    this.batchId,
    this.batchName,
  });

  final String fullName;
  final String mobileNumber;
  final String email;
  final String targetExamYear;
  final String preferredPlan;
  final String preferredLanguage;
  final String? courseCategory;
  final String? collegeState;
  final String? mbbsAdmissionYear;
  final String? medicalCollege;
  final int? batchId;
  final String? batchName;

  AppUser copyWith({
    String? fullName,
    String? mobileNumber,
    String? email,
    String? targetExamYear,
    String? preferredPlan,
    String? preferredLanguage,
    String? courseCategory,
    String? collegeState,
    String? mbbsAdmissionYear,
    String? medicalCollege,
    int? batchId,
    String? batchName,
  }) {
    return AppUser(
      fullName: fullName ?? this.fullName,
      mobileNumber: mobileNumber ?? this.mobileNumber,
      email: email ?? this.email,
      targetExamYear: targetExamYear ?? this.targetExamYear,
      preferredPlan: preferredPlan ?? this.preferredPlan,
      preferredLanguage: preferredLanguage ?? this.preferredLanguage,
      courseCategory: courseCategory ?? this.courseCategory,
      collegeState: collegeState ?? this.collegeState,
      mbbsAdmissionYear: mbbsAdmissionYear ?? this.mbbsAdmissionYear,
      medicalCollege: medicalCollege ?? this.medicalCollege,
      batchId: batchId ?? this.batchId,
      batchName: batchName ?? this.batchName,
    );
  }

  factory AppUser.fromJson(Map<String, dynamic> json) {
    return AppUser(
      fullName: (json['full_name'] ?? json['fullName'] ?? '') as String,
      mobileNumber: (json['phone'] ?? json['mobileNumber'] ?? '') as String,
      email: (json['email'] ?? '') as String,
      targetExamYear:
          (json['target_exam_year'] ?? json['targetExamYear'] ?? 'NEET')
              as String,
      preferredPlan:
          (json['preferred_plan'] ?? json['preferredPlan'] ?? 'Starter')
              as String,
      preferredLanguage:
          (json['preferred_language'] ?? json['preferredLanguage'] ?? 'English')
              as String,
      courseCategory:
          (json['course_category'] ?? json['courseCategory']) as String?,
      collegeState: (json['college_state'] ?? json['collegeState']) as String?,
      mbbsAdmissionYear:
          (json['mbbs_admission_year'] ?? json['mbbsAdmissionYear']) as String?,
      medicalCollege:
          (json['medical_college'] ?? json['medicalCollege']) as String?,
      batchId: (json['batch_id'] ?? json['batchId']) as int?,
      batchName: (json['batch_name'] ?? json['batchName']) as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'full_name': fullName,
      'phone': mobileNumber,
      'email': email,
      'target_exam_year': targetExamYear,
      'preferred_plan': preferredPlan,
      'preferred_language': preferredLanguage,
      'course_category': courseCategory,
      'college_state': collegeState,
      'mbbs_admission_year': mbbsAdmissionYear,
      'medical_college': medicalCollege,
      'batch_id': batchId,
      'batch_name': batchName,
    };
  }
}

class BatchOption {
  const BatchOption({
    required this.id,
    required this.name,
    required this.targetYear,
    required this.classLabel,
  });

  final int id;
  final String name;
  final String targetYear;
  final String classLabel;

  factory BatchOption.fromJson(Map<String, dynamic> json) {
    return BatchOption(
      id: json['id'] as int,
      name: json['name'] as String,
      targetYear: (json['target_year'] ?? '') as String,
      classLabel: (json['class_label'] ?? '') as String,
    );
  }
}

class OnboardingItem {
  const OnboardingItem({
    required this.title,
    required this.subtitle,
    required this.caption,
    required this.icon,
  });

  final String title;
  final String subtitle;
  final String caption;
  final IconData icon;
}

class SubjectProgress {
  const SubjectProgress({
    required this.subject,
    required this.coverage,
    required this.accuracy,
    required this.pendingTopics,
  });

  final SubjectType subject;
  final double coverage;
  final double accuracy;
  final int pendingTopics;
}

class BookChapter {
  const BookChapter({
    required this.id,
    required this.title,
    required this.overview,
    required this.noteSummary,
    required this.pyqSummary,
    required this.highlight,
    required this.linkedPyqCount,
    this.materialType = 'text',
    this.materialDriveLink,
  });

  final String id;
  final String title;
  final String overview;
  final String noteSummary;
  final String pyqSummary;
  final String highlight;
  final int linkedPyqCount;
  final String materialType;
  final String? materialDriveLink;
}

class BookItem {
  const BookItem({
    required this.id,
    required this.title,
    required this.subject,
    required this.level,
    required this.chapterCount,
    required this.progress,
    required this.lastOpened,
    required this.category,
    required this.chapters,
  });

  final String id;
  final String title;
  final SubjectType subject;
  final String level;
  final int chapterCount;
  final double progress;
  final String lastOpened;
  final String category;
  final List<BookChapter> chapters;
}

class PracticeSet {
  const PracticeSet({
    required this.id,
    required this.title,
    required this.topic,
    required this.questionCount,
    required this.difficulty,
    required this.estimatedMinutes,
    required this.accuracy,
    required this.tag,
  });

  final String id;
  final String title;
  final String topic;
  final int questionCount;
  final String difficulty;
  final int estimatedMinutes;
  final double accuracy;
  final String tag;
}

class PracticeQuestion {
  const PracticeQuestion({
    required this.id,
    required this.subject,
    required this.chapter,
    required this.question,
    required this.options,
    required this.correctIndex,
    required this.explanation,
  });

  final String id;
  final SubjectType subject;
  final String chapter;
  final String question;
  final List<String> options;
  final int correctIndex;
  final String explanation;
}

class TestItem {
  const TestItem({
    required this.id,
    required this.title,
    required this.category,
    required this.durationMinutes,
    required this.marks,
    required this.questions,
    required this.syllabusCoverage,
    required this.scheduleLabel,
    required this.completed,
    required this.scoreLabel,
  });

  final String id;
  final String title;
  final String category;
  final int durationMinutes;
  final int marks;
  final int questions;
  final String syllabusCoverage;
  final String scheduleLabel;
  final bool completed;
  final String scoreLabel;
}

class SubscriptionPlan {
  const SubscriptionPlan({
    required this.name,
    required this.priceLabel,
    required this.validity,
    required this.highlight,
    required this.features,
    this.isRecommended = false,
  });

  final String name;
  final String priceLabel;
  final String validity;
  final String highlight;
  final List<String> features;
  final bool isRecommended;
}

class AppNotification {
  const AppNotification({
    required this.title,
    required this.message,
    required this.timeLabel,
    required this.icon,
    this.isUnread = false,
  });

  final String title;
  final String message;
  final String timeLabel;
  final IconData icon;
  final bool isUnread;
}

class RevisionItem {
  const RevisionItem({
    required this.title,
    required this.subtitle,
    required this.type,
  });

  final String title;
  final String subtitle;
  final String type;
}

class NeetVideoItem {
  const NeetVideoItem({
    required this.id,
    required this.title,
    required this.subject,
    required this.durationLabel,
    required this.chapterHint,
    required this.sectionLabel,
    this.instructorImage,
    this.rating = 4.5,
  });

  final String id;
  final String title;
  final SubjectType subject;
  final String durationLabel;
  final String chapterHint;
  final String sectionLabel;
  final String? instructorImage;   // ← Added
  final double rating;
  
}
