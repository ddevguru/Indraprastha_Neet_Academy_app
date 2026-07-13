import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../utils/drive_image_url.dart';

class FastNetworkImage extends StatefulWidget {
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
  State<FastNetworkImage> createState() => _FastNetworkImageState();
}

class _FastNetworkImageState extends State<FastNetworkImage> {
  int _fallbackStep = 0;

  @override
  Widget build(BuildContext context) {
    final resolved = _resolvedUrl();
    if (resolved.isEmpty) return const SizedBox.shrink();

    Widget image = CachedNetworkImage(
      imageUrl: resolved,
      cacheKey: '${driveImageCacheKey(widget.url)}:$_fallbackStep',
      height: widget.height,
      width: widget.width,
      fit: widget.fit,
      memCacheHeight:
          widget.height != null ? (widget.height! * 1.5).round().clamp(160, 900) : 600,
      maxWidthDiskCache: 1200,
      maxHeightDiskCache: 1200,
      fadeInDuration: const Duration(milliseconds: 150),
      fadeOutDuration: Duration.zero,
      useOldImageOnUrlChange: true,
      placeholder: (_, __) => Container(
        height: widget.height ?? 120,
        width: widget.width,
        color: const Color(0xFFF3F4F6),
        alignment: Alignment.center,
        child: const SizedBox(
          width: 20,
          height: 20,
          child: CircularProgressIndicator(strokeWidth: 2),
        ),
      ),
      errorWidget: (_, __, ___) {
        if (_fallbackStep < 2) {
          WidgetsBinding.instance.addPostFrameCallback((_) {
            if (mounted) setState(() => _fallbackStep += 1);
          });
          return Container(
            height: widget.height ?? 120,
            width: widget.width,
            color: const Color(0xFFF3F4F6),
            alignment: Alignment.center,
            child: const SizedBox(
              width: 20,
              height: 20,
              child: CircularProgressIndicator(strokeWidth: 2),
            ),
          );
        }
        return Container(
          height: widget.height ?? 120,
          width: widget.width,
          color: const Color(0xFFF3F4F6),
          alignment: Alignment.center,
          child: const Text('Image unavailable', style: TextStyle(fontSize: 12)),
        );
      },
    );

    if (widget.borderRadius != null) {
      image = ClipRRect(borderRadius: widget.borderRadius!, child: image);
    }
    return image;
  }

  String _resolvedUrl() {
    final id = extractDriveFileId(widget.url);
    if (id == null || id.isEmpty) return widget.url.trim();
    return switch (_fallbackStep) {
      0 => buildDriveThumbnailUrl(id, thumbWidth: widget.thumbWidth),
      1 => buildDriveViewUrl(id),
      _ => buildDriveThumbnailUrl(id, thumbWidth: (widget.thumbWidth * 0.7).round()),
    };
  }
}
