import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../utils/drive_image_url.dart';

class FastNetworkImage extends StatelessWidget {
  const FastNetworkImage({
    super.key,
    required this.url,
    this.height,
    this.width,
    this.fit = BoxFit.cover,
    this.borderRadius,
    this.thumbWidth = 800,
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

    Widget image = CachedNetworkImage(
      imageUrl: resolved,
      cacheKey: driveImageCacheKey(url),
      height: height,
      width: width,
      fit: fit,
      memCacheHeight: height != null ? (height! * 1.5).round().clamp(160, 900) : 600,
      maxWidthDiskCache: 1200,
      maxHeightDiskCache: 1200,
      fadeInDuration: Duration.zero,
      fadeOutDuration: Duration.zero,
      useOldImageOnUrlChange: true,
      placeholder: (_, __) => Container(
        height: height ?? 120,
        width: width,
        color: const Color(0xFFF3F4F6),
        alignment: Alignment.center,
        child: const SizedBox(
          width: 20,
          height: 20,
          child: CircularProgressIndicator(strokeWidth: 2),
        ),
      ),
      errorWidget: (_, __, ___) => Container(
        height: height ?? 120,
        width: width,
        color: const Color(0xFFF3F4F6),
        alignment: Alignment.center,
        child: const Text('Image unavailable', style: TextStyle(fontSize: 12)),
      ),
    );

    if (borderRadius != null) {
      image = ClipRRect(borderRadius: borderRadius!, child: image);
    }
    return image;
  }
}
