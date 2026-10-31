int _parseInt(dynamic val, [int fallback = 0]) {
  if (val == null) return fallback;
  if (val is int) return val;
  if (val is num) return val.toInt();
  return int.tryParse(val.toString()) ?? fallback;
}


class TeacherProfile {
  final int id;
  final int userId;
  final String teacherCode;
  final String displayName;
  final String email;
  final bool isActive;
  final List<TeacherSubjectAssignment> assignments;

  TeacherProfile({
    required this.id,
    required this.userId,
    required this.teacherCode,
    required this.displayName,
    required this.email,
    required this.isActive,
    required this.assignments,
  });

  factory TeacherProfile.fromJson(Map<String, dynamic> json) {
    final asgns = (json['assignments'] as List? ?? [])
        .map((e) => TeacherSubjectAssignment.fromJson(Map<String, dynamic>.from(e as Map)))
        .toList();
    return TeacherProfile(
      id: _parseInt(json['id']),
      userId: _parseInt(json['user_id'] ?? json['userId']),
      teacherCode: json['teacher_code'] ?? '',
      displayName: json['display_name'] ?? 'Faculty Member',
      email: json['email'] ?? '',
      isActive: json['is_active'] == true,
      assignments: asgns,
    );
  }
}

class TeacherSubjectAssignment {
  final int id;
  final String classLevel;
  final String subject;

  TeacherSubjectAssignment({
    required this.id,
    required this.classLevel,
    required this.subject,
  });

  factory TeacherSubjectAssignment.fromJson(Map<String, dynamic> json) {
    return TeacherSubjectAssignment(
      id: _parseInt(json['id']),
      classLevel: json['class_level'] ?? json['classLevel'] ?? '',
      subject: json['subject'] ?? '',
    );
  }
}

class TeacherDoubtItem {
  final int id;
  final int studentId;
  final String studentName;
  final String classLevel;
  final String subject;
  final String title;
  final String? description;
  final String status;
  final int? assignedTeacherId;
  final String? assignedTeacherName;
  final DateTime? createdAt;
  final List<DoubtMediaAttachment> attachments;
  final List<TeacherDoubtResponseItem> responses;
  final Map<String, dynamic>? whiteboard;
  final Map<String, dynamic>? publishedWhiteboard;

  TeacherDoubtItem({
    required this.id,
    required this.studentId,
    required this.studentName,
    required this.classLevel,
    required this.subject,
    required this.title,
    this.description,
    required this.status,
    this.assignedTeacherId,
    this.assignedTeacherName,
    this.createdAt,
    this.attachments = const [],
    this.responses = const [],
    this.whiteboard,
    this.publishedWhiteboard,
  });

  factory TeacherDoubtItem.fromJson(Map<String, dynamic> json) {
    final atts = (json['attachments'] as List? ?? [])
        .map((e) => DoubtMediaAttachment.fromJson(Map<String, dynamic>.from(e as Map)))
        .toList();
    final resps = (json['responses'] as List? ?? [])
        .map((e) => TeacherDoubtResponseItem.fromJson(Map<String, dynamic>.from(e as Map)))
        .toList();

    return TeacherDoubtItem(
      id: _parseInt(json['id'] ?? json['doubt_id']),
      studentId: _parseInt(json['student_id'] ?? json['studentId']),
      // Full student anonymity: do not show student identities in teacher portal
      studentName: 'Student',
      classLevel: json['class_level'] ?? json['classLevel'] ?? '',
      subject: json['subject'] ?? '',
      title: json['title'] ?? 'Doubt',
      description: json['description'],
      status: json['status'] ?? 'pending',
      assignedTeacherId: json['assigned_teacher_id'] != null
          ? _parseInt(json['assigned_teacher_id'])
          : (json['assignedTeacherId'] != null ? _parseInt(json['assignedTeacherId']) : null),
      assignedTeacherName: json['assigned_teacher_name'] ?? json['assignedTeacherName'],
      createdAt: json['created_at'] != null ? DateTime.tryParse(json['created_at'].toString()) : null,
      attachments: atts,
      responses: resps,
      whiteboard: json['whiteboard'] != null
          ? Map<String, dynamic>.from(json['whiteboard'] as Map)
          : (json['solutionWhiteboard'] != null
              ? Map<String, dynamic>.from(json['solutionWhiteboard'] as Map)
              : (json['solution_whiteboard'] != null
                  ? Map<String, dynamic>.from(json['solution_whiteboard'] as Map)
                  : null)),
      publishedWhiteboard: json['published_whiteboard'] != null
          ? Map<String, dynamic>.from(json['published_whiteboard'] as Map)
          : (json['publishedSolutionWhiteboard'] != null
              ? Map<String, dynamic>.from(json['publishedSolutionWhiteboard'] as Map)
              : null),
    );
  }
}

class DoubtMediaAttachment {
  final int? id;
  final String storageKey;
  final String originalFilename;
  final String mimeType;
  final int fileSize;
  final String? driveFileId;
  final String? driveViewLink;
  final String? fileUrl;

  DoubtMediaAttachment({
    this.id,
    required this.storageKey,
    required this.originalFilename,
    required this.mimeType,
    required this.fileSize,
    this.driveFileId,
    this.driveViewLink,
    this.fileUrl,
  });

  factory DoubtMediaAttachment.fromJson(Map<String, dynamic> json) {
    return DoubtMediaAttachment(
      id: json['id'] != null ? _parseInt(json['id']) : null,
      storageKey: json['storage_key'] ?? json['storageKey'] ?? '',
      originalFilename: json['original_filename'] ?? json['originalFilename'] ?? 'file',
      mimeType: json['mime_type'] ?? json['mimeType'] ?? 'application/octet-stream',
      fileSize: _parseInt(json['file_size'] ?? json['fileSize']),
      driveFileId: json['drive_file_id'] ?? json['driveFileId'],
      driveViewLink: json['drive_view_link'] ?? json['driveViewLink'],
      fileUrl: json['file_url'] ?? json['fileUrl'],
    );
  }

  bool get isImage =>
      mimeType.startsWith('image/') ||
      originalFilename.toLowerCase().endsWith('.jpg') ||
      originalFilename.toLowerCase().endsWith('.png') ||
      originalFilename.toLowerCase().endsWith('.jpeg') ||
      originalFilename.toLowerCase().endsWith('.webp');

  bool get isVideo =>
      mimeType.startsWith('video/') ||
      originalFilename.toLowerCase().endsWith('.mp4') ||
      originalFilename.toLowerCase().endsWith('.mov') ||
      originalFilename.toLowerCase().endsWith('.mkv') ||
      originalFilename.toLowerCase().endsWith('.webm') ||
      originalFilename.toLowerCase().endsWith('.avi') ||
      originalFilename.toLowerCase().endsWith('.3gp') ||
      originalFilename.toLowerCase().endsWith('.m4v');

  bool get isAudio =>
      mimeType.startsWith('audio/') ||
      originalFilename.toLowerCase().endsWith('.mp3') ||
      originalFilename.toLowerCase().endsWith('.m4a') ||
      originalFilename.toLowerCase().endsWith('.wav') ||
      originalFilename.toLowerCase().endsWith('.aac') ||
      originalFilename.toLowerCase().endsWith('.ogg');

  bool get isPdf =>
      mimeType.contains('pdf') || originalFilename.toLowerCase().endsWith('.pdf');

  String get directImageUrl {
    String id = driveFileId?.trim() ?? '';
    if (id.isEmpty && driveViewLink != null && driveViewLink!.isNotEmpty) {
      final match = RegExp(r'/d/([a-zA-Z0-9_-]+)').firstMatch(driveViewLink!);
      if (match != null) {
        id = match.group(1) ?? '';
      }
    }
    if (id.isNotEmpty) {
      return 'https://drive.google.com/thumbnail?id=$id&sz=w1000';
    }
    if (driveViewLink != null && driveViewLink!.isNotEmpty && !driveViewLink!.contains('drive.google.com/file/d/')) {
      return driveViewLink!;
    }
    return fileUrl ?? storageKey;
  }

  String get directAudioUrl {
    String id = driveFileId?.trim() ?? '';
    if (id.isEmpty && driveViewLink != null && driveViewLink!.isNotEmpty) {
      final match = RegExp(r'/d/([a-zA-Z0-9_-]+)').firstMatch(driveViewLink!);
      if (match != null) {
        id = match.group(1) ?? '';
      }
    }
    if (id.isNotEmpty) {
      return 'https://docs.google.com/uc?export=download&id=$id';
    }
    return fileUrl ?? driveViewLink ?? storageKey;
  }

  Map<String, dynamic> toJson() => {
        if (id != null) 'id': id,
        'storage_key': storageKey,
        'original_filename': originalFilename,
        'mime_type': mimeType,
        'file_size': fileSize,
        if (driveFileId != null) 'drive_file_id': driveFileId,
        if (driveViewLink != null) 'drive_view_link': driveViewLink,
        if (fileUrl != null) 'file_url': fileUrl,
      };
}

class TeacherDoubtResponseItem {
  final int id;
  final int teacherId;
  final String teacherName;
  final String responseText;
  final DateTime? createdAt;
  final List<DoubtMediaAttachment> attachments;

  TeacherDoubtResponseItem({
    required this.id,
    required this.teacherId,
    required this.teacherName,
    required this.responseText,
    this.createdAt,
    this.attachments = const [],
  });

  factory TeacherDoubtResponseItem.fromJson(Map<String, dynamic> json) {
    final atts = (json['attachments'] as List? ?? [])
        .map((e) => DoubtMediaAttachment.fromJson(Map<String, dynamic>.from(e as Map)))
        .toList();
    return TeacherDoubtResponseItem(
      id: _parseInt(json['id']),
      teacherId: _parseInt(json['teacher_id'] ?? json['teacherId']),
      teacherName: json['teacher_name'] ?? json['teacherName'] ?? 'Faculty Member',
      responseText: json['response_text'] ?? json['responseText'] ?? '',
      createdAt: json['created_at'] != null ? DateTime.tryParse(json['created_at'].toString()) : null,
      attachments: atts,
    );
  }
}
