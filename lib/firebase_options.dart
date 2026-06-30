import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Firebase config per platform (from GoogleService-Info.plist / google-services.json).
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      throw UnsupportedError('Firebase is not configured for web.');
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return ios;
      default:
        throw UnsupportedError(
          'Firebase is not supported on $defaultTargetPlatform.',
        );
    }
  }

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyC-3-9it6uWk2d86ghPKnCtZ3dFQ12ERms',
    appId: '1:903265383444:android:beec56e054566f7b7b2301',
    messagingSenderId: '903265383444',
    projectId: 'indraprastha-app',
    storageBucket: 'indraprastha-app.firebasestorage.app',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyBeqEhZ_l6GZPHy7xLyqICOeKqAC5Nlu3I',
    appId: '1:853279094898:ios:96c7c6f7c56a2d65a82aeb',
    messagingSenderId: '853279094898',
    projectId: 'indraprasthaapp',
    storageBucket: 'indraprasthaapp.firebasestorage.app',
    iosBundleId: 'com.rahulkumar.indraprastha',
  );
}
