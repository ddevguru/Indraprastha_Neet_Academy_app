import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../features/content/data/content_repository.dart';

// Must be a top-level function — called by FCM when app is terminated/background.
@pragma('vm:entry-point')
Future<void> firebaseBackgroundHandler(RemoteMessage message) async {
  // FCM automatically handles background UI when notification payload is included.
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
    // 1. iOS / Android 13+ permission request
    try {
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
    } catch (e) {
      if (kDebugMode) debugPrint('[FCM] permission error: $e');
    }

    // 2. Configure local notifications
    try {
      const androidInit = AndroidInitializationSettings('@mipmap/ic_launcher');
      const iosInit = DarwinInitializationSettings(
        requestAlertPermission: false,
        requestBadgePermission: false,
        requestSoundPermission: false,
      );
      await _local.initialize(
        const InitializationSettings(android: androidInit, iOS: iosInit),
      );
    } catch (e) {
      if (kDebugMode) debugPrint('[FCM] local init error: $e');
    }

    // 3. Create high-importance Android channel with sound and vibration
    try {
      await _local
          .resolvePlatformSpecificImplementation<
              AndroidFlutterLocalNotificationsPlugin>()
          ?.createNotificationChannel(
            const AndroidNotificationChannel(
              _channelId,
              _channelName,
              description: 'High Importance Notifications',
              importance: Importance.max,
              enableVibration: true,
              playSound: true,
            ),
          );
    } catch (e) {
      if (kDebugMode) debugPrint('[FCM] channel create error: $e');
    }

    // 4. Request exact notifications permission (Android 13+)
    try {
      await _local
          .resolvePlatformSpecificImplementation<
              AndroidFlutterLocalNotificationsPlugin>()
          ?.requestNotificationsPermission();
    } catch (_) {}

    // 5. Register handlers
    try {
      FirebaseMessaging.onBackgroundMessage(firebaseBackgroundHandler);
      FirebaseMessaging.onMessage.listen(_showForegroundNotification);
    } catch (e) {
      if (kDebugMode) debugPrint('[FCM] handler error: $e');
    }

    // 6. Register token with backend and refresh on rotation
    await uploadToken();
    try {
      _messaging.onTokenRefresh.listen((_) => uploadToken());
    } catch (_) {}
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
