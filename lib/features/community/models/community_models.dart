import 'package:flutter/material.dart';

class CommunitySubject {
  final int communityId;
  final String classLevel;
  final String subject;
  final String icon;
  final Color color;
  final int totalMessages;
  final DateTime lastActivityAt;
  final String lastMessageSnippet;
  final String lastMessageType;

  CommunitySubject({
    required this.communityId,
    required this.classLevel,
    required this.subject,
    required this.icon,
    required this.color,
    required this.totalMessages,
    required this.lastActivityAt,
    required this.lastMessageSnippet,
    required this.lastMessageType,
  });

  factory CommunitySubject.fromJson(Map<String, dynamic> json) {
    Color parseColor(String? hex) {
      if (hex == null || hex.isEmpty) return const Color(0xFF002350);
      try {
        final clean = hex.replaceAll('#', '');
        return Color(int.parse('FF$clean', radix: 16));
      } catch (_) {
        return const Color(0xFF002350);
      }
    }

    return CommunitySubject(
      communityId: json['communityId'] is int ? json['communityId'] : int.tryParse('${json['communityId']}') ?? 0,
      classLevel: json['classLevel'] ?? 'Class 11',
      subject: json['subject'] ?? 'General',
      icon: json['icon'] ?? '📚',
      color: parseColor(json['color']),
      totalMessages: json['totalMessages'] is int ? json['totalMessages'] : int.tryParse('${json['totalMessages']}') ?? 0,
      lastActivityAt: json['lastActivityAt'] != null
          ? DateTime.tryParse('${json['lastActivityAt']}') ?? DateTime.now()
          : DateTime.now(),
      lastMessageSnippet: json['lastMessageSnippet'] ?? '',
      lastMessageType: json['lastMessageType'] ?? 'text',
    );
  }
}

class CommunityAttachment {
  final int id;
  final String storageKey;
  final String originalFilename;
  final String mimeType;
  final int fileSize;
  final String driveFileId;
  final String driveViewLink;
  final String driveDownloadLink;

  CommunityAttachment({
    required this.id,
    required this.storageKey,
    required this.originalFilename,
    required this.mimeType,
    required this.fileSize,
    required this.driveFileId,
    required this.driveViewLink,
    required this.driveDownloadLink,
  });

  factory CommunityAttachment.fromJson(Map<String, dynamic> json) {
    return CommunityAttachment(
      id: json['id'] is int ? json['id'] : int.tryParse('${json['id']}') ?? 0,
      storageKey: json['storageKey'] ?? '',
      originalFilename: json['originalFilename'] ?? 'attachment',
      mimeType: json['mimeType'] ?? 'application/octet-stream',
      fileSize: json['fileSize'] is int ? json['fileSize'] : int.tryParse('${json['fileSize']}') ?? 0,
      driveFileId: json['driveFileId'] ?? '',
      driveViewLink: json['driveViewLink'] ?? '',
      driveDownloadLink: json['driveDownloadLink'] ?? '',
    );
  }

  bool get isImage => mimeType.startsWith('image/') || originalFilename.endsWith('.jpg') || originalFilename.endsWith('.png') || originalFilename.endsWith('.jpeg');
  bool get isVideo => mimeType.startsWith('video/') || originalFilename.endsWith('.mp4') || originalFilename.endsWith('.mov');
  bool get isAudio => mimeType.startsWith('audio/') || originalFilename.endsWith('.mp3') || originalFilename.endsWith('.m4a') || originalFilename.endsWith('.wav');
  bool get isPdf => mimeType.contains('pdf') || originalFilename.endsWith('.pdf');
}

class CommunityMessage {
  final int id;
  final int communityId;
  final int studentId;
  final String messageType;
  final String textContent;
  final DateTime createdAt;
  final DateTime updatedAt;
  final List<CommunityAttachment> attachments;
  final int? doubtId;

  CommunityMessage({
    required this.id,
    required this.communityId,
    required this.studentId,
    required this.messageType,
    required this.textContent,
    required this.createdAt,
    required this.updatedAt,
    this.attachments = const [],
    this.doubtId,
  });

  factory CommunityMessage.fromJson(Map<String, dynamic> json) {
    var rawAtts = json['attachments'];
    List<CommunityAttachment> atts = [];
    if (rawAtts is List) {
      atts = rawAtts.map((e) => CommunityAttachment.fromJson(Map<String, dynamic>.from(e as Map))).toList();
    }

    final rawDoubtId = json['doubt_id'] ?? json['doubtId'];

    return CommunityMessage(
      id: json['id'] is int ? json['id'] : int.tryParse('${json['id']}') ?? 0,
      communityId: json['community_id'] is int ? json['community_id'] : int.tryParse('${json['community_id']}') ?? 0,
      studentId: json['student_id'] is int ? json['student_id'] : int.tryParse('${json['student_id']}') ?? 0,
      messageType: json['message_type'] ?? 'text',
      textContent: json['text_content'] ?? '',
      createdAt: json['created_at'] != null ? DateTime.tryParse('${json['created_at']}') ?? DateTime.now() : DateTime.now(),
      updatedAt: json['updated_at'] != null ? DateTime.tryParse('${json['updated_at']}') ?? DateTime.now() : DateTime.now(),
      attachments: atts,
      doubtId: rawDoubtId is int ? rawDoubtId : int.tryParse('$rawDoubtId'),
    );
  }
}

class DoubtItem {
  final int id;
  final int studentId;
  final String classLevel;
  final String subject;
  final String title;
  final String description;
  final String status;
  final int? assignedTeacherId;
  final String? assignedTeacherName;
  final DateTime createdAt;
  final DateTime updatedAt;
  final DateTime? firstResponseAt;
  final DateTime? resolvedAt;
  final List<CommunityAttachment> attachments;
  final List<DoubtResponseItem> responses;
  final Map<String, dynamic>? publishedSolutionWhiteboard;

  DoubtItem({
    required this.id,
    required this.studentId,
    required this.classLevel,
    required this.subject,
    required this.title,
    required this.description,
    required this.status,
    this.assignedTeacherId,
    this.assignedTeacherName,
    required this.createdAt,
    required this.updatedAt,
    this.firstResponseAt,
    this.resolvedAt,
    this.attachments = const [],
    this.responses = const [],
    this.publishedSolutionWhiteboard,
  });

  factory DoubtItem.fromJson(Map<String, dynamic> json) {
    var rawAtts = json['attachments'];
    List<CommunityAttachment> atts = [];
    if (rawAtts is List) {
      atts = rawAtts.map((e) => CommunityAttachment.fromJson(Map<String, dynamic>.from(e as Map))).toList();
    }

    var rawResps = json['responses'];
    List<DoubtResponseItem> resps = [];
    if (rawResps is List) {
      resps = rawResps.map((e) => DoubtResponseItem.fromJson(Map<String, dynamic>.from(e as Map))).toList();
    }

    Map<String, dynamic>? wb;
    if (json['published_solution_whiteboard'] is Map) {
      wb = Map<String, dynamic>.from(json['published_solution_whiteboard']);
    } else if (json['publishedSolutionWhiteboard'] is Map) {
      wb = Map<String, dynamic>.from(json['publishedSolutionWhiteboard']);
    }

    return DoubtItem(
      id: json['id'] is int ? json['id'] : int.tryParse('${json['id']}') ?? (int.tryParse('${json['doubt_id']}') ?? 0),
      studentId: json['student_id'] is int ? json['student_id'] : int.tryParse('${json['student_id']}') ?? 0,
      classLevel: json['class_level'] ?? 'Class 11',
      subject: json['subject'] ?? 'General',
      title: json['title'] ?? 'Doubt Query',
      description: json['description'] ?? '',
      status: json['status'] ?? 'Pending',
      assignedTeacherId: json['assigned_teacher_id'] != null ? int.tryParse('${json['assigned_teacher_id']}') : null,
      assignedTeacherName: json['assigned_teacher_name'],
      createdAt: json['created_at'] != null ? DateTime.tryParse('${json['created_at']}') ?? DateTime.now() : DateTime.now(),
      updatedAt: json['updated_at'] != null ? DateTime.tryParse('${json['updated_at']}') ?? DateTime.now() : DateTime.now(),
      firstResponseAt: json['first_response_at'] != null ? DateTime.tryParse('${json['first_response_at']}') : null,
      resolvedAt: json['resolved_at'] != null ? DateTime.tryParse('${json['resolved_at']}') : null,
      attachments: atts,
      responses: resps,
      publishedSolutionWhiteboard: wb,
    );
  }
}

class DoubtResponseItem {
  final int id;
  final String responseText;
  final String teacherName;
  final DateTime createdAt;
  final List<CommunityAttachment> attachments;

  DoubtResponseItem({
    required this.id,
    required this.responseText,
    required this.teacherName,
    required this.createdAt,
    this.attachments = const [],
  });

  factory DoubtResponseItem.fromJson(Map<String, dynamic> json) {
    var rawAtts = json['attachments'];
    List<CommunityAttachment> atts = [];
    if (rawAtts is List) {
      atts = rawAtts.map((e) => CommunityAttachment.fromJson(Map<String, dynamic>.from(e as Map))).toList();
    }

    return DoubtResponseItem(
      id: json['id'] is int ? json['id'] : int.tryParse('${json['id']}') ?? 0,
      responseText: json['response_text'] ?? json['responseText'] ?? '',
      teacherName: json['teacher_name'] ?? json['teacherName'] ?? 'Teacher',
      createdAt: json['created_at'] != null
          ? DateTime.tryParse('${json['created_at']}') ?? DateTime.now()
          : (json['createdAt'] != null ? DateTime.tryParse('${json['createdAt']}') ?? DateTime.now() : DateTime.now()),
      attachments: atts,
    );
  }
}
