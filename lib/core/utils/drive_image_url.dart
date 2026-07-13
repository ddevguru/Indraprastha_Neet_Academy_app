import '../constants/api_constants.dart';

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

bool isApiImageUrl(String raw) => raw.trim().contains('/content/images/');

String buildApiImageUrl(String fileId, {int thumbWidth = 900}) {
  final w = thumbWidth.clamp(200, 1600);
  return '$baseUrl/content/images/$fileId?w=$w';
}

/// Direct Google Drive thumbnail — fallback when API proxy is unavailable.
String buildDriveThumbnailUrl(String fileId, {int thumbWidth = 900}) {
  final w = thumbWidth.clamp(200, 1600);
  return 'https://drive.google.com/thumbnail?id=$fileId&sz=w$w';
}

String buildDriveViewUrl(String fileId) =>
    'https://drive.google.com/uc?export=view&id=$fileId';

/// Resolve any stored Drive/API URL to a loadable URL (API proxy preferred).
String resolveDriveImageUrl(String raw, {int thumbWidth = 900}) {
  final value = raw.trim();
  if (value.isEmpty) return value;
  final id = extractDriveFileId(value);
  if (id != null && id.isNotEmpty) {
    return buildApiImageUrl(id, thumbWidth: thumbWidth);
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
    return buildApiImageUrl(fileId);
  }
  final link = question['question_image_link']?.toString().trim() ?? '';
  if (link.isEmpty) return '';
  final id = extractDriveFileId(link);
  if (id != null && id.isNotEmpty) return buildApiImageUrl(id);
  return link;
}

String explanationImageRawUrl(Map<String, dynamic> data) {
  final fileId = data['image_drive_file_id']?.toString().trim() ??
      data['explanation_image_drive_file_id']?.toString().trim() ??
      '';
  if (fileId.isNotEmpty) return buildApiImageUrl(fileId);
  final link = data['image_url']?.toString().trim() ??
      data['image_drive_link']?.toString().trim() ??
      data['explanation_image_link']?.toString().trim() ??
      '';
  if (link.isEmpty) return '';
  final id = extractDriveFileId(link);
  if (id != null && id.isNotEmpty) return buildApiImageUrl(id);
  return link;
}

bool hasQuestionImage(Map<String, dynamic> question) {
  final fileId = question['question_image_drive_file_id']?.toString().trim() ?? '';
  final link = question['question_image_link']?.toString().trim() ?? '';
  return fileId.isNotEmpty || link.isNotEmpty;
}
