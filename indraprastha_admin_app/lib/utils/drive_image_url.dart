String? extractDriveFileId(String raw) {
  final value = raw.trim();
  if (value.isEmpty) return null;
  final uri = Uri.tryParse(value);
  if (uri == null) return null;

  if (uri.pathSegments.contains('images')) {
    final idx = uri.pathSegments.indexOf('images');
    if (idx >= 0 && idx + 1 < uri.pathSegments.length) {
      final id = uri.pathSegments[idx + 1];
      if (id.isNotEmpty) return id;
    }
  }

  var id = uri.queryParameters['id'];
  if (id == null || id.isEmpty) {
    final parts = uri.pathSegments;
    final fileIdx = parts.indexOf('file');
    if (fileIdx >= 0 && fileIdx + 2 < parts.length && parts[fileIdx + 1] == 'd') {
      id = parts[fileIdx + 2];
    }
  }
  if (id == null || id.isEmpty) return null;
  return id;
}

String buildDriveThumbnailUrl(String fileId, {int thumbWidth = 900}) {
  final w = thumbWidth.clamp(200, 1600);
  return 'https://drive.google.com/thumbnail?id=$fileId&sz=w$w';
}

String buildDriveViewUrl(String fileId) =>
    'https://drive.google.com/uc?export=view&id=$fileId';

String resolveDriveImageUrl(String raw, {int thumbWidth = 900}) {
  final value = raw.trim();
  if (value.isEmpty) return value;
  final id = extractDriveFileId(value);
  if (id != null && id.isNotEmpty) {
    return buildDriveThumbnailUrl(id, thumbWidth: thumbWidth);
  }
  if (value.contains('drive.google.com')) return value;
  return value;
}

String driveImageCacheKey(String raw) {
  final id = extractDriveFileId(raw);
  if (id != null && id.isNotEmpty) return 'drive:$id';
  return raw.trim();
}

String questionImageRawUrl(Map<String, dynamic> question) {
  final fileId = question['question_image_drive_file_id']?.toString().trim() ?? '';
  if (fileId.isNotEmpty) {
    return 'https://drive.google.com/file/d/$fileId/view';
  }
  return question['question_image_link']?.toString().trim() ?? '';
}

bool hasQuestionImage(Map<String, dynamic> question) {
  final fileId = question['question_image_drive_file_id']?.toString().trim() ?? '';
  final link = question['question_image_link']?.toString().trim() ?? '';
  return fileId.isNotEmpty || link.isNotEmpty;
}
