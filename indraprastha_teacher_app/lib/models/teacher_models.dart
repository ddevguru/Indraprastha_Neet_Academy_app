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
      id: json['id'] ?? 0,
      userId: json['user_id'] ?? 0,
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
      id: json['id'] ?? 0,
      classLevel: json['class_level'] ?? '',
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
      id: json['id'] ?? 0,
      studentId: json['student_id'] ?? 0,
      studentName: json['student_name'] ?? 'Student',
      classLevel: json['class_level'] ?? '',
      subject: json['subject'] ?? '',
      title: json['title'] ?? 'Doubt',
      description: json['description'],
      status: json['status'] ?? 'pending',
      assignedTeacherId: json['assigned_teacher_id'],
      assignedTeacherName: json['assigned_teacher_name'],
      createdAt: json['created_at'] != null ? DateTime.tryParse(json['created_at']) : null,
      attachments: atts,
      responses: resps,
      whiteboard: json['whiteboard'] != null ? Map<String, dynamic>.from(json['whiteboard'] as Map) : null,
      publishedWhiteboard: json['published_whiteboard'] != null
          ? Map<String, dynamic>.from(json['published_whiteboard'] as Map)
          : null,
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
      id: json['id'],
      storageKey: json['storage_key'] ?? '',
      originalFilename: json['original_filename'] ?? 'file',
      mimeType: json['mime_type'] ?? 'application/octet-stream',
      fileSize: json['file_size'] ?? 0,
      driveFileId: json['drive_file_id'],
      driveViewLink: json['drive_view_link'],
      fileUrl: json['file_url'],
    );
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
      id: json['id'] ?? 0,
      teacherId: json['teacher_id'] ?? 0,
      teacherName: json['teacher_name'] ?? 'Faculty Member',
      responseText: json['response_text'] ?? '',
      createdAt: json['created_at'] != null ? DateTime.tryParse(json['created_at']) : null,
      attachments: atts,
    );
  }
}
