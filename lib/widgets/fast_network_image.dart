import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

import '../core/utils/drive_image_url.dart';
import '../theme/app_tokens.dart';

/// Cached image widget — loads via authenticated API proxy first, then Drive fallbacks.
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
  static const _secureStorage = FlutterSecureStorage();
  int _fallbackStep = 0;
  Map<String, String>? _headers;
  bool _headersLoaded = false;

  @override
  void initState() {
    super.initState();
    _loadAuthHeaders();
  }

  Future<void> _loadAuthHeaders() async {
    final token = await _secureStorage.read(key: 'auth_token');
    if (!mounted) return;
    setState(() {
      _headers = token != null && token.isNotEmpty
          ? {'Authorization': 'Bearer $token'}
          : {};
      _headersLoaded = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    final resolved = _resolvedUrl();
    if (resolved.isEmpty) return const SizedBox.shrink();

    final needsAuth = isApiImageUrl(resolved);
    if (needsAuth && !_headersLoaded) {
      return _loadingBox();
    }
    if (needsAuth && (_headers == null || _headers!['Authorization'] == null)) {
      if (_fallbackStep < 2) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (mounted) setState(() => _fallbackStep += 1);
        });
        return _loadingBox();
      }
    }

    final memHeight =
        widget.height != null ? (widget.height! * 1.5).round().clamp(160, 900) : 600;
    final diskW =
        widget.width != null ? (widget.width! * 2).round().clamp(320, 1200) : 1200;
    final diskH =
        widget.height != null ? (widget.height! * 2).round().clamp(240, 1200) : 1200;

    Widget image = CachedNetworkImage(
      imageUrl: resolved,
      cacheKey: '${driveImageCacheKey(widget.url)}:$_fallbackStep',
      httpHeaders: needsAuth ? _headers : null,
      height: widget.height,
      width: widget.width,
      fit: widget.fit,
      memCacheHeight: memHeight,
      maxWidthDiskCache: diskW,
      maxHeightDiskCache: diskH,
      fadeInDuration: const Duration(milliseconds: 150),
      fadeOutDuration: Duration.zero,
      useOldImageOnUrlChange: true,
      placeholder: (context, imageUrl) => _loadingBox(),
      errorWidget: (context, imageUrl, error) {
        if (_fallbackStep < 2) {
          WidgetsBinding.instance.addPostFrameCallback((_) {
            if (mounted) setState(() => _fallbackStep += 1);
          });
          return _loadingBox();
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
    final raw = widget.url.trim();
    if (raw.isEmpty) return raw;
    final id = extractDriveFileId(raw);
    if (id == null || id.isEmpty) {
      return isApiImageUrl(raw) ? raw : resolveDriveImageUrl(raw, thumbWidth: widget.thumbWidth);
    }
    return switch (_fallbackStep) {
      0 => buildApiImageUrl(id, thumbWidth: widget.thumbWidth),
      1 => buildDriveThumbnailUrl(id, thumbWidth: widget.thumbWidth),
      _ => buildDriveViewUrl(id),
    };
  }

  Widget _loadingBox() {
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
  final token = await const FlutterSecureStorage().read(key: 'auth_token');
  final headers = token != null && token.isNotEmpty
      ? {'Authorization': 'Bearer $token'}
      : null;

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
        if (isApiImageUrl(url) && headers != null) {
          await http.get(Uri.parse(url), headers: headers);
        } else {
          await DefaultCacheManager().getSingleFile(url);
        }
      } catch (_) {}
    }),
  );
}
