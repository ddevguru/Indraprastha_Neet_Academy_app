import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';

import '../core/utils/drive_image_url.dart';
import '../theme/app_tokens.dart';

/// Cached Drive-thumbnail image widget.
class FastNetworkImage extends StatefulWidget {
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
  State<FastNetworkImage> createState() => _FastNetworkImageState();
}

class _FastNetworkImageState extends State<FastNetworkImage> {
  int _fallbackStep = 0;

  @override
  Widget build(BuildContext context) {
    final resolved = _resolvedUrl();
    if (resolved.isEmpty) return const SizedBox.shrink();

    final memHeight =
        widget.height != null ? (widget.height! * 1.5).round().clamp(160, 900) : 600;
    final diskW =
        widget.width != null ? (widget.width! * 2).round().clamp(320, 1200) : 1200;
    final diskH =
        widget.height != null ? (widget.height! * 2).round().clamp(240, 1200) : 1200;

    Widget image = CachedNetworkImage(
      imageUrl: resolved,
      cacheKey: '${driveImageCacheKey(widget.url)}:$_fallbackStep',
      height: widget.height,
      width: widget.width,
      fit: widget.fit,
      memCacheHeight: memHeight,
      maxWidthDiskCache: diskW,
      maxHeightDiskCache: diskH,
      fadeInDuration: const Duration(milliseconds: 150),
      fadeOutDuration: Duration.zero,
      useOldImageOnUrlChange: true,
      placeholder: (context, imageUrl) => Container(
        height: widget.height ?? 120,
        width: widget.width,
        alignment: Alignment.center,
        color: AppColors.surfaceMuted,
        child: const SizedBox(
          width: 20,
          height: 20,
          child: CircularProgressIndicator(strokeWidth: 2),
        ),
      ),
      errorWidget: (context, imageUrl, error) {
        if (_fallbackStep < 2) {
          WidgetsBinding.instance.addPostFrameCallback((_) {
            if (mounted) setState(() => _fallbackStep += 1);
          });
          return Container(
            height: widget.height ?? 120,
            width: widget.width,
            alignment: Alignment.center,
            color: AppColors.surfaceMuted,
            child: const SizedBox(
              width: 20,
              height: 20,
              child: CircularProgressIndicator(strokeWidth: 2),
            ),
          );
        }
        return _errorBox(widget.height, widget.width);
      },
    );

    if (widget.borderRadius != null) {
      image = ClipRRect(borderRadius: widget.borderRadius!, child: image);
    }
    return image;
  }

  String _resolvedUrl() {
    final id = extractDriveFileId(widget.url);
    if (id == null || id.isEmpty) {
      return widget.url.trim();
    }
    return switch (_fallbackStep) {
      0 => buildDriveThumbnailUrl(id, thumbWidth: widget.thumbWidth),
      1 => buildDriveViewUrl(id),
      _ => buildDriveThumbnailUrl(id, thumbWidth: (widget.thumbWidth * 0.7).round()),
    };
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
