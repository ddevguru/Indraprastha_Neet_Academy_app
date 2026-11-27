import 'dart:async';
import 'dart:convert';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:http/http.dart' as http;

import 'teacher_api_service.dart';

/// Continuously captures the Teacher App's root RepaintBoundary and streams
/// lightweight compressed frames + active screen metadata to the Admin Panel.
class TeacherScreenCastService {
  static final GlobalKey rootRepaintKey = GlobalKey();

  static Timer? _timer;
  static bool _isCapturing = false;
  static bool _isResumed = true;
  static int _lastFrameSignature = 0;
  static String _currentScreen = 'Dashboard';
  static String _currentActivity = 'Active in Faculty Portal';

  static void updateScreen(String screen, [String? activity]) {
    _currentScreen = screen;
    if (activity != null && activity.isNotEmpty) {
      _currentActivity = activity;
    } else {
      _currentActivity = 'Viewing $screen';
    }
  }

  static void setLifecycleResumed(bool resumed) {
    _isResumed = resumed;
    if (!resumed) {
      _sendOfflinePing('background');
    }
  }

  static void start() {
    if (_timer != null) return;
    _timer = Timer.periodic(const Duration(milliseconds: 1500), (_) {
      _captureAndUpload();
    });
    // Trigger initial capture right after first frame
    Future.delayed(const Duration(milliseconds: 600), _captureAndUpload);
  }

  static void stop() {
    _timer?.cancel();
    _timer = null;
    _lastFrameSignature = 0;
    _sendOfflinePing('offline');
  }

  static int _computeQuickSignature(List<int> bytes) {
    if (bytes.isEmpty) return 0;
    int sig = bytes.length;
    final step = (bytes.length / 32).ceil().clamp(1, bytes.length);
    for (int i = 0; i < bytes.length; i += step) {
      sig = (sig * 31 + bytes[i]) & 0x7fffffff;
    }
    return sig;
  }

  static Future<void> _captureAndUpload() async {
    if (_isCapturing || !_isResumed) return;
    final token = TeacherApiService.token;
    if (token == null || token.isEmpty) return;

    final ctx = rootRepaintKey.currentContext;
    if (ctx == null) return;

    final renderObject = ctx.findRenderObject();
    if (renderObject is! RenderRepaintBoundary) return;
    if (renderObject.debugNeedsPaint) return;

    _isCapturing = true;
    try {
      final ui.Image image = await renderObject.toImage(pixelRatio: 0.4);
      final width = image.width;
      final height = image.height;
      final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
      image.dispose();

      if (byteData == null) return;
      final bytes = byteData.buffer.asUint8List();
      final sig = _computeQuickSignature(bytes);

      String frameB64 = '';
      if (sig != _lastFrameSignature) {
        _lastFrameSignature = sig;
        frameB64 = base64Encode(bytes);
      }

      await http
          .post(
            Uri.parse('${TeacherApiService.baseUrl}/teacher/screen-cast'),
            headers: {
              'Authorization': 'Bearer $token',
              'Content-Type': 'application/json',
            },
            body: jsonEncode({
              'currentScreen': _currentScreen,
              'currentActivity': _currentActivity,
              'frameBase64': frameB64,
              'frameWidth': width,
              'frameHeight': height,
              'appState': 'active',
            }),
          )
          .timeout(const Duration(seconds: 4));
    } catch (_) {
      // Silent fail so casting never interrupts teacher workflow
    } finally {
      _isCapturing = false;
    }
  }

  static Future<void> _sendOfflinePing(String state) async {
    final token = TeacherApiService.token;
    if (token == null || token.isEmpty) return;
    try {
      await http
          .post(
            Uri.parse('${TeacherApiService.baseUrl}/teacher/screen-cast/offline'),
            headers: {
              'Authorization': 'Bearer $token',
              'Content-Type': 'application/json',
            },
            body: jsonEncode({'appState': state}),
          )
          .timeout(const Duration(seconds: 3));
    } catch (_) {}
  }
}

class TeacherScreenCastNavigatorObserver extends NavigatorObserver {
  void _notifyRoute(Route<dynamic>? route) {
    if (route == null) return;
    final name = route.settings.name;
    if (name != null && name.isNotEmpty && name != '/') {
      TeacherScreenCastService.updateScreen(name);
    } else if (route is MaterialPageRoute) {
      final routeStr = route.toString();
      if (routeStr.contains('DoubtDetail')) {
        TeacherScreenCastService.updateScreen('Doubt Detail', 'Solving student doubt');
      } else if (routeStr.contains('Whiteboard')) {
        TeacherScreenCastService.updateScreen('Solution Whiteboard', 'Drawing on whiteboard');
      }
    }
  }

  @override
  void didPush(Route<dynamic> route, Route<dynamic>? previousRoute) {
    super.didPush(route, previousRoute);
    _notifyRoute(route);
  }

  @override
  void didPop(Route<dynamic> route, Route<dynamic>? previousRoute) {
    super.didPop(route, previousRoute);
    if (previousRoute?.settings.name == '/') {
      TeacherScreenCastService.updateScreen('Faculty Portal');
    } else {
      _notifyRoute(previousRoute);
    }
  }
}

