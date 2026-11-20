import 'dart:typed_data';

import 'package:flutter/material.dart';

/// Full-screen zoomable image viewer dialog with pinch-to-zoom,
/// double-tap zoom, pan, and dedicated on-screen Zoom In / Out / Reset buttons.
class ZoomableImageViewerDialog extends StatefulWidget {
  const ZoomableImageViewerDialog({
    super.key,
    this.imageBytes,
    this.imageUrl,
    this.title = 'Question Image',
  }) : assert(imageBytes != null || imageUrl != null,
            'Either imageBytes or imageUrl must be provided');

  final Uint8List? imageBytes;
  final String? imageUrl;
  final String title;

  @override
  State<ZoomableImageViewerDialog> createState() =>
      _ZoomableImageViewerDialogState();
}

class _ZoomableImageViewerDialogState extends State<ZoomableImageViewerDialog>
    with SingleTickerProviderStateMixin {
  late TransformationController _transformationController;
  late AnimationController _animationController;
  Animation<Matrix4>? _animation;

  double _currentScale = 1.0;
  static const double _minScale = 0.5;
  static const double _maxScale = 6.0;

  @override
  void initState() {
    super.initState();
    _transformationController = TransformationController();
    _transformationController.addListener(_onTransformationChanged);

    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 220),
    )..addListener(() {
        if (_animation != null) {
          _transformationController.value = _animation!.value;
        }
      });
  }

  void _onTransformationChanged() {
    final scale = _transformationController.value.getMaxScaleOnAxis();
    if ((scale - _currentScale).abs() > 0.02) {
      setState(() {
        _currentScale = scale;
      });
    }
  }

  @override
  void dispose() {
    _transformationController.removeListener(_onTransformationChanged);
    _transformationController.dispose();
    _animationController.dispose();
    super.dispose();
  }

  void _animateToMatrix(Matrix4 target) {
    _animation = Matrix4Tween(
      begin: _transformationController.value,
      end: target,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeOutCubic,
    ));
    _animationController.forward(from: 0);
  }

  void _zoomIn() {
    final newScale = (_currentScale * 1.35).clamp(_minScale, _maxScale);
    final target = Matrix4.diagonal3Values(newScale, newScale, 1.0);
    _animateToMatrix(target);
  }

  void _zoomOut() {
    final newScale = (_currentScale / 1.35).clamp(_minScale, _maxScale);
    final target = Matrix4.diagonal3Values(newScale, newScale, 1.0);
    _animateToMatrix(target);
  }

  void _resetZoom() {
    _animateToMatrix(Matrix4.identity());
  }

  void _handleDoubleTap(TapDownDetails details) {
    if (_currentScale > 1.1) {
      _resetZoom();
    } else {
      // Zoom in to 2.5x centered at tap position
      final pos = details.localPosition;
      final target = Matrix4.identity()
        ..multiply(Matrix4.translationValues(-pos.dx * 1.5, -pos.dy * 1.5, 0.0))
        ..multiply(Matrix4.diagonal3Values(2.5, 2.5, 1.0));
      _animateToMatrix(target);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.transparent,
      insetPadding: EdgeInsets.zero,
      child: Scaffold(
        backgroundColor: Colors.black.withValues(alpha: 0.94),
        body: SafeArea(
          child: Stack(
            children: [
              // 1. Zoomable Image Container
              Positioned.fill(
                child: GestureDetector(
                  onDoubleTapDown: _handleDoubleTap,
                  onDoubleTap: () {},
                  child: InteractiveViewer(
                    transformationController: _transformationController,
                    minScale: _minScale,
                    maxScale: _maxScale,
                    boundaryMargin: const EdgeInsets.all(double.infinity),
                    clipBehavior: Clip.none,
                    child: Center(
                      child: widget.imageBytes != null
                          ? Image.memory(
                              widget.imageBytes!,
                              fit: BoxFit.contain,
                              gaplessPlayback: true,
                            )
                          : Image.network(
                              widget.imageUrl!,
                              fit: BoxFit.contain,
                              loadingBuilder: (context, child, progress) {
                                if (progress == null) return child;
                                return const Center(
                                  child: CircularProgressIndicator(
                                    color: Colors.white,
                                  ),
                                );
                              },
                              errorBuilder: (_, __, ___) => const Center(
                                child: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Icon(
                                      Icons.broken_image_rounded,
                                      color: Colors.white60,
                                      size: 48,
                                    ),
                                    SizedBox(height: 8),
                                    Text(
                                      'Failed to load image',
                                      style: TextStyle(color: Colors.white70),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                    ),
                  ),
                ),
              ),

              // 2. Top Header Bar
              Positioned(
                top: 0,
                left: 0,
                right: 0,
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.black.withValues(alpha: 0.8),
                        Colors.transparent,
                      ],
                    ),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(6),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Icon(
                          Icons.image_search_rounded,
                          color: Colors.white,
                          size: 20,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              widget.title,
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                            Text(
                              'Zoom: ${(_currentScale * 100).toInt()}% • Pinch or double-tap to zoom',
                              style: TextStyle(
                                color: Colors.white.withValues(alpha: 0.7),
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ),
                      IconButton(
                        onPressed: () => Navigator.of(context).pop(),
                        icon: const Icon(
                          Icons.close_rounded,
                          color: Colors.white,
                          size: 26,
                        ),
                        tooltip: 'Close',
                        style: IconButton.styleFrom(
                          backgroundColor: Colors.white.withValues(alpha: 0.15),
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              // 3. Floating Bottom Controls (Zoom In, Zoom Out, Reset)
              Positioned(
                bottom: 24,
                left: 0,
                right: 0,
                child: Center(
                  child: Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                    decoration: BoxDecoration(
                      color: const Color(0xFF1E293B).withValues(alpha: 0.92),
                      borderRadius: BorderRadius.circular(30),
                      border: Border.all(
                        color: Colors.white.withValues(alpha: 0.2),
                        width: 1,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.5),
                          blurRadius: 16,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        _ControlButton(
                          icon: Icons.remove_rounded,
                          tooltip: 'Zoom Out',
                          onPressed: _zoomOut,
                        ),
                        const SizedBox(width: 8),
                        GestureDetector(
                          onTap: _resetZoom,
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 10, vertical: 6),
                            decoration: BoxDecoration(
                              color: Colors.white.withValues(alpha: 0.12),
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const Icon(
                                  Icons.refresh_rounded,
                                  size: 14,
                                  color: Colors.white70,
                                ),
                                const SizedBox(width: 4),
                                Text(
                                  '${(_currentScale * 100).toInt()}%',
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 12,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        _ControlButton(
                          icon: Icons.add_rounded,
                          tooltip: 'Zoom In',
                          onPressed: _zoomIn,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ControlButton extends StatelessWidget {
  const _ControlButton({
    required this.icon,
    required this.tooltip,
    required this.onPressed,
  });

  final IconData icon;
  final String tooltip;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onPressed,
        borderRadius: BorderRadius.circular(20),
        child: Padding(
          padding: const EdgeInsets.all(8),
          child: Icon(icon, color: Colors.white, size: 22),
        ),
      ),
    );
  }
}

/// Helper function to open the zoomable image popup from anywhere
void showZoomableImagePopup(
  BuildContext context, {
  Uint8List? imageBytes,
  String? imageUrl,
  String title = 'Question Image',
}) {
  showDialog(
    context: context,
    useSafeArea: false,
    barrierColor: Colors.black.withValues(alpha: 0.85),
    builder: (context) => ZoomableImageViewerDialog(
      imageBytes: imageBytes,
      imageUrl: imageUrl,
      title: title,
    ),
  );
}
