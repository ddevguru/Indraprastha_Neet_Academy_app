import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../core/utils/drive_image_url.dart';
import '../theme/app_tokens.dart';

/// Cached, drive-aware image widget for faster repeat loads across the app.
class FastNetworkImage extends StatelessWidget {
  const FastNetworkImage({
    super.key,
    required this.url,
    this.height,
    this.width,
    this.fit = BoxFit.contain,
    this.borderRadius,
  });

  final String url;
  final double? height;
  final double? width;
  final BoxFit fit;
  final BorderRadius? borderRadius;

  @override
  Widget build(BuildContext context) {
    final resolved = resolveDriveImageUrl(url);
    if (resolved.isEmpty) return const SizedBox.shrink();

    final memHeight = height != null ? (height! * 2).round().clamp(200, 1200) : 800;

    Widget image = CachedNetworkImage(
      imageUrl: resolved,
      height: height,
      width: width,
      fit: fit,
      memCacheHeight: memHeight,
      fadeInDuration: const Duration(milliseconds: 120),
      fadeOutDuration: const Duration(milliseconds: 80),
      placeholder: (_, __) => Container(
        height: height ?? 120,
        width: width,
        alignment: Alignment.center,
        color: AppColors.surfaceMuted,
        child: const SizedBox(
          width: 22,
          height: 22,
          child: CircularProgressIndicator(strokeWidth: 2),
        ),
      ),
      errorWidget: (_, __, ___) => Container(
        height: height ?? 120,
        width: width,
        alignment: Alignment.center,
        color: AppColors.surfaceMuted,
        child: const Text('Image unavailable', style: TextStyle(fontSize: 12)),
      ),
    );

    if (borderRadius != null) {
      image = ClipRRect(borderRadius: borderRadius!, child: image);
    }
    return image;
  }
}

Widget buildFastReviewImage(String rawUrl) {
  return FastNetworkImage(
    url: rawUrl,
    width: double.infinity,
    fit: BoxFit.contain,
    borderRadius: BorderRadius.circular(AppRadii.md),
  );
}
