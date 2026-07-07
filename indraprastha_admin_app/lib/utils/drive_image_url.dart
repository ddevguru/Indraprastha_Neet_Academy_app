String? extractDriveFileId(String raw) {
  final value = raw.trim();
  if (value.isEmpty) return null;
  final uri = Uri.tryParse(value);
  if (uri == null) return null;
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

String resolveDriveImageUrl(String raw, {int thumbWidth = 900}) {
  final value = raw.trim();
  if (value.isEmpty) return value;
  final id = extractDriveFileId(value);
  if (id != null && id.isNotEmpty) {
    final w = thumbWidth.clamp(200, 1600);
    return 'https://drive.google.com/thumbnail?id=$id&sz=w$w';
  }
  return value;
}

String driveImageCacheKey(String raw) {
  final id = extractDriveFileId(raw);
  if (id != null && id.isNotEmpty) return 'drive:$id';
  return raw.trim();
}
