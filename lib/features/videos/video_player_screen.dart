import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';

import '../../core/utils/video_url_utils.dart';
import '../../theme/app_tokens.dart';

class VideoPlayerScreen extends StatefulWidget {
  const VideoPlayerScreen({
    super.key,
    required this.title,
    required this.subtitle,
    required this.videoUrl,
    this.fallbackUrl,
  });

  final String title;
  final String subtitle;
  final String videoUrl;
  final String? fallbackUrl;

  @override
  State<VideoPlayerScreen> createState() => _VideoPlayerScreenState();
}

class _VideoPlayerScreenState extends State<VideoPlayerScreen> {
  WebViewController? _webViewController;
  bool _isLoading = true;
  String? _errorMessage;
  bool _showTopHeader = true;
  Timer? _hideHeaderTimer;

  @override
  void initState() {
    super.initState();
    _setupLandscapeOrientation();
    _initWebPlayer();
    _startHeaderTimer();
  }

  void _setupLandscapeOrientation() {
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.landscapeLeft,
      DeviceOrientation.landscapeRight,
    ]);
  }

  void _startHeaderTimer() {
    _hideHeaderTimer?.cancel();
    _hideHeaderTimer = Timer(const Duration(seconds: 4), () {
      if (mounted) {
        setState(() => _showTopHeader = false);
      }
    });
  }

  void _toggleHeader() {
    setState(() => _showTopHeader = !_showTopHeader);
    if (_showTopHeader) {
      _startHeaderTimer();
    }
  }

  void _initWebPlayer() {
    final rawTarget = (widget.videoUrl.isNotEmpty ? widget.videoUrl : widget.fallbackUrl ?? '').trim();
    if (rawTarget.isEmpty) {
      setState(() {
        _isLoading = false;
        _errorMessage = 'No video URL available.';
      });
      return;
    }

    final embedUrl = resolveInAppEmbedUrl(rawTarget);

    try {
      late final WebViewController controller;
      controller = WebViewController()
        ..setJavaScriptMode(JavaScriptMode.unrestricted)
        ..setBackgroundColor(Colors.black)
        ..setNavigationDelegate(
          NavigationDelegate(
            onProgress: (int progress) {
              if (progress >= 15 && _isLoading && mounted) {
                setState(() {
                  _isLoading = false;
                  _errorMessage = null;
                });
              }
            },
            onPageStarted: (String url) {},
            onPageFinished: (String url) {
              if (!mounted) return;
              if (_isLoading) {
                setState(() {
                  _isLoading = false;
                  _errorMessage = null;
                });
              }
              _injectAntiDownloadCss(controller);
            },
            onWebResourceError: (WebResourceError error) {
              if (!mounted) return;
              if (error.isForMainFrame == true) {
                setState(() {
                  _isLoading = false;
                  _errorMessage = 'Unable to load video playback.';
                });
              }
            },
            onNavigationRequest: (NavigationRequest request) {
              final targetUrl = request.url;
              if (targetUrl.contains('drive.google.com/file/d/') && targetUrl.endsWith('/preview')) {
                return NavigationDecision.navigate;
              }
              if (targetUrl.contains('youtube.com/embed/')) {
                return NavigationDecision.navigate;
              }
              if (targetUrl == embedUrl || targetUrl == 'about:blank' || targetUrl.startsWith('data:')) {
                return NavigationDecision.navigate;
              }
              return NavigationDecision.prevent;
            },
          ),
        )
        ..loadRequest(Uri.parse(embedUrl));

      _webViewController = controller;
    } catch (e) {
      if (mounted) {
        setState(() {
          _isLoading = false;
          _errorMessage = 'Failed to initialize in-app video player.';
        });
      }
    }
  }

  void _injectAntiDownloadCss(WebViewController controller) {
    const cssScript = '''
      (function() {
        var style = document.createElement('style');
        style.innerHTML = `
          .drive-viewer-popout,
          a[target="_blank"],
          .ytp-youtube-button,
          .ytp-share-button,
          [aria-label*="Pop-out"],
          [aria-label*="Download"],
          [title*="Pop-out"],
          [title*="Download"] {
            display: none !important;
            pointer-events: none !important;
            visibility: hidden !important;
          }
        `;
        document.head.appendChild(style);
      })();
    ''';
    controller.runJavaScript(cssScript).catchError((_) {});
  }

  @override
  void dispose() {
    _hideHeaderTimer?.cancel();
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
    SystemChrome.setPreferredOrientations(DeviceOrientation.values);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: GestureDetector(
        behavior: HitTestBehavior.translucent,
        onTap: _toggleHeader,
        child: Stack(
          fit: StackFit.expand,
          children: [
            // Single Clean Video Player Engine
            if (_webViewController != null)
              SafeArea(
                child: WebViewWidget(controller: _webViewController!),
              ),

            // Loading Spinner
            if (_isLoading)
              const Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    CircularProgressIndicator(color: Colors.white),
                    SizedBox(height: 12),
                    Text(
                      'Starting video...',
                      style: TextStyle(color: Colors.white70, fontSize: 13),
                    ),
                  ],
                ),
              ),

            // Error State
            if (_errorMessage != null && !_isLoading)
              Center(
                child: Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.error_outline_rounded, color: Colors.white70, size: 56),
                      const SizedBox(height: 16),
                      Text(
                        _errorMessage!,
                        textAlign: TextAlign.center,
                        style: const TextStyle(color: Colors.white, fontSize: 16),
                      ),
                      const SizedBox(height: 24),
                      FilledButton.icon(
                        onPressed: () {
                          setState(() {
                            _isLoading = true;
                            _errorMessage = null;
                          });
                          _initWebPlayer();
                        },
                        icon: const Icon(Icons.refresh_rounded),
                        label: const Text('Retry'),
                        style: FilledButton.styleFrom(
                          backgroundColor: AppColors.primary,
                          foregroundColor: Colors.white,
                        ),
                      ),
                    ],
                  ),
                ),
              ),

            // Top Floating Pill Bar (Auto-hides after 4s)
            if (_showTopHeader)
              SafeArea(
                child: Align(
                  alignment: Alignment.topLeft,
                  child: Padding(
                    padding: const EdgeInsets.all(AppSpacing.sm),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.black.withValues(alpha: 0.75),
                        borderRadius: BorderRadius.circular(AppRadii.md),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            onPressed: () => Navigator.pop(context),
                            icon: const Icon(Icons.arrow_back_rounded, color: Colors.white, size: 22),
                            tooltip: 'Back',
                            constraints: const BoxConstraints(),
                            padding: const EdgeInsets.all(6),
                          ),
                          const SizedBox(width: 6),
                          Flexible(
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  widget.title,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
                                ),
                                if (widget.subtitle.isNotEmpty)
                                  Text(
                                    widget.subtitle,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(color: Colors.white70, fontSize: 11),
                                  ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}