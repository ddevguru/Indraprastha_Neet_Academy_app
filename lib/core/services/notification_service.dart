import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../features/content/data/content_repository.dart';

// Must be a top-level function — called by FCM when app is terminated/background.
@pragma('vm:entry-point')
Future<void> _firebaseBackgroundHandler(RemoteMessage message) async {
  // FCM displays the notification automatically for background/terminated state.
  // No extra work needed here.
}

class NotificationService {
  NotificationService._(this._prefs);
  static late NotificationService instance;

  static void initializeService(SharedPreferences prefs) {
    instance = NotificationService._(prefs);
  }

  final SharedPreferences _prefs;
  final _messaging = FirebaseMessaging.instance;
  final _local = FlutterLocalNotificationsPlugin();

  static const _channelId = 'indraprastha_alerts';
  static const _channelName = 'Indraprastha Alerts';

  Future<void> initialize() async {
    // iOS / Android 13+ permission request
    await _messaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );

    await _messaging.setForegroundNotificationPresentationOptions(
      alert: true,
      badge: true,
      sound: true,
    );

    // Configure local notifications (needed for foreground display)
    const androidInit = AndroidInitializationSettings('@mipmap/ic_launcher');
    const iosInit = DarwinInitializationSettings(
      requestAlertPermission: false,
      requestBadgePermission: false,
      requestSoundPermission: false,
    );
    await _local.initialize(
      const InitializationSettings(android: androidInit, iOS: iosInit),
    );

    // Create high-importance Android channel
    await _local
        .resolvePlatformSpecificImplementation<
            AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(
          const AndroidNotificationChannel(
            _channelId,
            _channelName,
            importance: Importance.max,
            enableVibration: true,
            playSound: true,
          ),
        );

    // Register background/terminated handler
    FirebaseMessaging.onBackgroundMessage(_firebaseBackgroundHandler);

    // Show notification banner when app is in foreground
    FirebaseMessaging.onMessage.listen(_showForegroundNotification);

    // Register token with backend and refresh on rotation
    await uploadToken();
    _messaging.onTokenRefresh.listen((_) => uploadToken());
  }

  Future<void> uploadToken() async {
    try {
      final token = await _messaging.getToken();
      if (token != null && token.isNotEmpty) {
        final repo = ContentRepository(prefs: _prefs);
        await repo.registerFcmToken(token);
      }
    } catch (e) {
      if (kDebugMode) debugPrint('[FCM] token upload error: $e');
    }
  }

  void _showForegroundNotification(RemoteMessage message) {
    final n = message.notification;
    if (n == null) return;
    _local.show(
      n.hashCode,
      n.title,
      n.body,
      const NotificationDetails(
        android: AndroidNotificationDetails(
          _channelId,
          _channelName,
          importance: Importance.max,
          priority: Priority.max,
          enableVibration: true,
          playSound: true,
          icon: '@mipmap/ic_launcher',
        ),
        iOS: DarwinNotificationDetails(
          presentAlert: true,
          presentBadge: true,
          presentSound: true,
        ),
      ),
    );
  }
}
