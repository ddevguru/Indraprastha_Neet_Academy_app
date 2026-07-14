import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

import '../core/utils/drive_image_url.dart';
import '../theme/app_tokens.dart';

/// Loads images via authenticated API proxy (preferred) with Drive fallbacks.
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
  static final Map<String, Uint8List> _memoryCache = {};

  int _fallbackStep = 0;
  Uint8List? _bytes;
  bool _loading = true;
  bool _failed = false;

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void didUpdateWidget(covariant FastNetworkImage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.url != widget.url || oldWidget.thumbWidth != widget.thumbWidth) {
      _fallbackStep = 0;
      _bytes = null;
      _loading = true;
      _failed = false;
      _load();
    }
  }

  Future<void> _load() async {
    final resolved = _resolvedUrl();
    if (resolved.isEmpty) {
      if (mounted) setState(() { _loading = false; _failed = true; });
      return;
    }

    final cached = _memoryCache[resolved];
    if (cached != null) {
      if (mounted) setState(() { _bytes = cached; _loading = false; _failed = false; });
      return;
    }

    if (mounted) setState(() { _loading = true; _failed = false; });

    try {
      final token = await _secureStorage.read(key: 'auth_token');
      final headers = <String, String>{};
      if (token != null && token.isNotEmpty) {
        headers['Authorization'] = 'Bearer $token';
      }

      final response = await http
          .get(Uri.parse(resolved), headers: headers.isEmpty ? null : headers)
          .timeout(const Duration(seconds: 45));

      final contentType = response.headers['content-type'] ?? '';
      if (response.statusCode == 200 &&
          response.bodyBytes.isNotEmpty &&
          (contentType.contains('image') || !contentType.contains('json'))) {
        _memoryCache[resolved] = response.bodyBytes;
        if (mounted) {
          setState(() {
            _bytes = response.bodyBytes;
            _loading = false;
            _failed = false;
          });
        }
        return;
      }
    } catch (_) {}

    if (_fallbackStep < 2 && mounted) {
      setState(() {
        _fallbackStep += 1;
        _loading = true;
      });
      await _load();
      return;
    }

    if (mounted) setState(() { _loading = false; _failed = true; });
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) return _loadingBox();
    if (_failed || _bytes == null) return _errorBox();

    Widget image = Image.memory(
      _bytes!,
      height: widget.height,
      width: widget.width,
      fit: widget.fit,
      gaplessPlayback: true,
      errorBuilder: (_, __, ___) => _errorBox(),
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

  Widget _errorBox() {
    return Container(
      height: widget.height ?? 120,
      width: widget.width,
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
  for (final raw in rawUrls) {
    final resolved = resolveDriveImageUrl(raw, thumbWidth: thumbWidth);
    if (resolved.isEmpty || !seen.add(resolved)) continue;
    try {
      if (isApiImageUrl(resolved) && headers != null) {
        final res = await http.get(Uri.parse(resolved), headers: headers);
        if (res.statusCode == 200 && res.bodyBytes.isNotEmpty) {
          _FastNetworkImageState._memoryCache[resolved] = res.bodyBytes;
        }
      } else {
        await DefaultCacheManager().getSingleFile(resolved);
      }
    } catch (_) {}
    if (seen.length >= maxItems) break;
  }
}
