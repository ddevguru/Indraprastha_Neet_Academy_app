import 'dart:convert';
import 'dart:math';

import 'package:crypto/crypto.dart';
import 'package:sign_in_with_apple/sign_in_with_apple.dart';

/// User-friendly message for Apple Sign In failures.
String appleSignInErrorMessage(SignInWithAppleAuthorizationException e) {
  switch (e.code) {
    case AuthorizationErrorCode.canceled:
      return '';
    case AuthorizationErrorCode.unknown:
      return 'Apple Sign In is not available on this device. '
          'Use phone login, or try on a real iPhone signed into iCloud.';
    case AuthorizationErrorCode.invalidResponse:
    case AuthorizationErrorCode.notHandled:
    case AuthorizationErrorCode.failed:
      return 'Apple Sign In failed. Please try again.';
    default:
      return e.message;
  }
}

/// Generates a cryptographically secure nonce for Sign in with Apple + Firebase.
String generateAppleSignInNonce([int length = 32]) {
  const charset =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._';
  final random = Random.secure();
  return List.generate(length, (_) => charset[random.nextInt(charset.length)])
      .join();
}

String sha256ofString(String input) {
  final bytes = utf8.encode(input);
  final digest = sha256.convert(bytes);
  return digest.toString();
}
