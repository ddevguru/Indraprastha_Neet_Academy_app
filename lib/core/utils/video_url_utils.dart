/// Utility functions to format video links for secure in-app playback
/// without allowing external application launches or downloads.
library;

/// Resolves a raw video URL (Google Drive, YouTube, MP4) into a direct embed URL
/// suitable for WebViewController.loadRequest().
String resolveInAppEmbedUrl(String raw) {
  final trimmed = raw.trim();
  if (trimmed.isEmpty) return trimmed;

  // Google Drive Video -> Use preview embed URL directly (requires drive.google.com origin)
  if (trimmed.contains('drive.google.com') || trimmed.contains('googleusercontent.com')) {
    final fileId = extractGoogleDriveFileId(trimmed);
    if (fileId != null && fileId.isNotEmpty) {
      return 'https://drive.google.com/file/d/$fileId/preview';
    }
  }

  // YouTube Video -> Use YouTube embed player URL
  if (trimmed.contains('youtube.com') || trimmed.contains('youtu.be')) {
    final ytId = extractYouTubeVideoId(trimmed);
    if (ytId != null && ytId.isNotEmpty) {
      return 'https://www.youtube.com/embed/$ytId?autoplay=1&modestbranding=1&rel=0&playsinline=1';
    }
  }

  return trimmed;
}

/// Extracts Google Drive File ID from various link formats.
String? extractGoogleDriveFileId(String url) {
  if (url.trim().isEmpty) return null;
  final uri = Uri.tryParse(url.trim());
  if (uri == null) return null;

  final idFromQuery = uri.queryParameters['id'];
  if (idFromQuery != null && idFromQuery.isNotEmpty) return idFromQuery;

  final s = uri.toString();
  final m1 = RegExp(r'/file/d/([^/]+)').firstMatch(s);
  if (m1 != null) return m1.group(1);

  final m2 = RegExp(r'drive\.google\.com\/open\?id=([^&]+)').firstMatch(s);
  if (m2 != null) return m2.group(1);

  final m3 = RegExp(r'drive\.google\.com\/uc\?.*id=([^&]+)').firstMatch(s);
  if (m3 != null) return m3.group(1);

  final m4 = RegExp(r'[?&]id=([^&]+)').firstMatch(s);
  if (m4 != null) return m4.group(1);

  return null;
}

/// Extracts YouTube Video ID from various link formats.
String? extractYouTubeVideoId(String url) {
  if (url.trim().isEmpty) return null;
  final uri = Uri.tryParse(url.trim());
  if (uri == null) return null;

  final s = uri.toString();
  final m1 = RegExp(r'v=([^&]+)').firstMatch(s);
  if (m1 != null) return m1.group(1);

  final m2 = RegExp(r'youtu\.be/([^?#]+)').firstMatch(s);
  if (m2 != null) return m2.group(1);

  final m3 = RegExp(r'youtube\.com/embed/([^?#]+)').firstMatch(s);
  if (m3 != null) return m3.group(1);

  return null;
}
