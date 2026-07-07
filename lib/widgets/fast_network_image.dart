import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';

import '../core/utils/drive_image_url.dart';
import '../theme/app_tokens.dart';

/// Cached, drive-thumbnail image widget for faster loads across the app.
class FastNetworkImage extends StatelessWidget {
  const FastNetworkImage({
    super.key,
    required this.url,
    this.height,
    this.width,
    this.fit = BoxFit.contain,
    this.borderRadius,
    this.thumbWidth = 900,
  });

  final String url;
  final double? height;
  final double? width;
  final BoxFit fit;
  final BorderRadius? borderRadius;
  final int thumbWidth;

  @override
  Widget build(BuildContext context) {
    final resolved = resolveDriveImageUrl(url, thumbWidth: thumbWidth);
    if (resolved.isEmpty) return const SizedBox.shrink();

    final memHeight = height != null ? (height! * 1.5).round().clamp(160, 900) : 600;
    final diskW = width != null ? (width! * 2).round().clamp(320, 1200) : 1200;
    final diskH = height != null ? (height! * 2).round().clamp(240, 1200) : 1200;

    Widget image = CachedNetworkImage(
      imageUrl: resolved,
      cacheKey: driveImageCacheKey(url),
      height: height,
      width: width,
      fit: fit,
      memCacheHeight: memHeight,
      maxWidthDiskCache: diskW,
      maxHeightDiskCache: diskH,
      fadeInDuration: Duration.zero,
      fadeOutDuration: Duration.zero,
      useOldImageOnUrlChange: true,
      placeholder: (context, imageUrl) => Container(
        height: height ?? 120,
        width: width,
        alignment: Alignment.center,
        color: AppColors.surfaceMuted,
        child: const SizedBox(
          width: 20,
          height: 20,
          child: CircularProgressIndicator(strokeWidth: 2),
        ),
      ),
      errorWidget: (context, imageUrl, error) {
        final fallback = extractDriveFileId(url);
        if (fallback != null) {
          final alt = 'https://drive.google.com/uc?export=view&id=$fallback';
          if (alt != resolved) {
            return CachedNetworkImage(
              imageUrl: alt,
              cacheKey: '${driveImageCacheKey(url)}:full',
              height: height,
              width: width,
              fit: fit,
              fadeInDuration: Duration.zero,
              errorWidget: (context, imageUrl, error) => _errorBox(height, width),
            );
          }
        }
        return _errorBox(height, width);
      },
    );

    if (borderRadius != null) {
      image = ClipRRect(borderRadius: borderRadius!, child: image);
    }
    return image;
  }

  Widget _errorBox(double? height, double? width) {
    return Container(
      height: height ?? 120,
      width: width,
      alignment: Alignment.center,
      color: AppColors.surfaceMuted,
      child: const Text('Image unavailable', style: TextStyle(fontSize: 12)),
    );
  }
}

Widget buildFastReviewImage(String rawUrl) {
  return FastNetworkImage(
    url: rawUrl,
    width: double.infinity,
    fit: BoxFit.contain,
    thumbWidth: 1200,
    borderRadius: BorderRadius.circular(AppRadii.md),
  );
}

Future<void> warmImageCacheUrls(
  Iterable<String> rawUrls, {
  int thumbWidth = 900,
  int maxItems = 8,
}) async {
  final seen = <String>{};
  final urls = <String>[];
  for (final raw in rawUrls) {
    final resolved = resolveDriveImageUrl(raw, thumbWidth: thumbWidth);
    if (resolved.isEmpty || !seen.add(resolved)) continue;
    urls.add(resolved);
    if (urls.length >= maxItems) break;
  }

  await Future.wait(
    urls.map((url) async {
      try {
        await DefaultCacheManager().getSingleFile(url);
      } catch (_) {}
    }),
  );
}
