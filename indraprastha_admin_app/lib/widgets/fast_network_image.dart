import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

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
  static const _tokenKey = 'admin_auth_token';
  Map<String, String>? _headers;
  bool _useFallback = false;

  @override
  void initState() {
    super.initState();
    _loadHeaders();
  }

  Future<void> _loadHeaders() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString(_tokenKey);
    if (!mounted) return;
    setState(() {
      _headers = token == null ? null : {'Authorization': 'Bearer $token'};
    });
  }

  @override
  Widget build(BuildContext context) {
    final resolved = _useFallback
        ? _driveFallbackUrl(widget.url)
        : resolveDriveImageUrl(widget.url, thumbWidth: widget.thumbWidth);
    if (resolved.isEmpty) return const SizedBox.shrink();

    Widget image = CachedNetworkImage(
      imageUrl: resolved,
      httpHeaders: isApiImageUrl(resolved) ? _headers : null,
      cacheKey: driveImageCacheKey(widget.url),
      height: widget.height,
      width: widget.width,
      fit: widget.fit,
      memCacheHeight:
          widget.height != null ? (widget.height! * 1.5).round().clamp(160, 900) : 600,
      maxWidthDiskCache: 1200,
      maxHeightDiskCache: 1200,
      fadeInDuration: const Duration(milliseconds: 120),
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
        if (!_useFallback) {
          final fallback = _driveFallbackUrl(widget.url);
          if (fallback.isNotEmpty && fallback != resolved) {
            WidgetsBinding.instance.addPostFrameCallback((_) {
              if (mounted) setState(() => _useFallback = true);
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

  String _driveFallbackUrl(String raw) {
    final id = extractDriveFileId(raw);
    if (id == null || id.isEmpty) return '';
    final w = widget.thumbWidth.clamp(200, 1600);
    return 'https://drive.google.com/thumbnail?id=$id&sz=w$w';
  }
}
