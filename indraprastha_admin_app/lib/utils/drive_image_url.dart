const String apiBaseUrl = 'https://api.indraprasthaneetacademy.com/api';

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
  return '$apiBaseUrl/content/images/$fileId?w=$w';
}

String resolveDriveImageUrl(String raw, {int thumbWidth = 900}) {
  final value = raw.trim();
  if (value.isEmpty) return value;
  if (isApiImageUrl(value)) return value;
  final id = extractDriveFileId(value);
  if (id != null && id.isNotEmpty) {
    return buildApiImageUrl(id, thumbWidth: thumbWidth);
  }
  return value;
}

String driveImageCacheKey(String raw) {
  final id = extractDriveFileId(raw);
  if (id != null && id.isNotEmpty) return 'drive:$id';
  return raw.trim();
}
