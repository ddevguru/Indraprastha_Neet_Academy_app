import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import '../../../core/constants/api_constants.dart';
import '../../../models/app_models.dart';

class AuthRepository {
  AuthRepository({
    required SharedPreferences prefs,
    http.Client? client,
  })  : _prefs = prefs,
        _client = client ?? http.Client();

  static const _tokenKey = 'auth_token';
  static const _userKey = 'auth_user';
  static const _onboardingSeenKey = 'onboarding_seen';
  static const _secureStorage = FlutterSecureStorage();

  final SharedPreferences _prefs;
  final http.Client _client;

  bool get onboardingSeen => _prefs.getBool(_onboardingSeenKey) ?? false;

  Future<void> setOnboardingSeen() async {
    await _prefs.setBool(_onboardingSeenKey, true);
  }

  String? get token => _prefs.getString(_tokenKey);

  AppUser? get cachedUser {
    final raw = _prefs.getString(_userKey);
    if (raw == null) return null;
    try {
      return AppUser.fromJson(jsonDecode(raw) as Map<String, dynamic>);
    } catch (_) {
      return null;
    }
  }

  Future<void> saveSession({
    required String token,
    required AppUser user,
  }) async {
    await _secureStorage.write(key: _tokenKey, value: token);
    await _secureStorage.write(key: _userKey, value: jsonEncode(user.toJson()));
  }

  Future<void> clearSession() async {
    await _secureStorage.delete(key: _tokenKey);
    await _secureStorage.delete(key: _userKey);
  }

  /// Verifies Firebase ID token on backend — returns whether user is new.
  Future<Map<String, dynamic>> verifyFirebaseToken(String idToken) async {
    final response = await _client.post(
      Uri.parse('$baseUrl/auth/verify-firebase-token'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'idToken': idToken}),
    );
    return _decodeResponse(response);
  }

  /// Login with phone + password (no OTP required).
  Future<Map<String, dynamic>> login({
    required String phone,
    required String password,
  }) async {
    final response = await _client.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'phone': phone, 'password': password}),
    );
    return _decodeResponse(response);
  }

  /// Complete signup — sends Firebase ID token + password + details.
  Future<Map<String, dynamic>> completeSignup({
    required String idToken,
    required String fullName,
    required String password,
    required int batchId,
    required String courseCategory,
    String preferredLanguage = 'English',
  }) async {
    final response = await _client.post(
      Uri.parse('$baseUrl/auth/complete-signup'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'idToken': idToken,
        'fullName': fullName,
        'password': password,
        'batchId': batchId,
        'courseCategory': courseCategory,
        'preferredLanguage': preferredLanguage,
      }),
    );
    return _decodeResponse(response);
  }

  Future<List<BatchOption>> fetchBatches() async {
    final response = await _client.get(Uri.parse('$baseUrl/auth/batches'));
    final data = _decodeResponse(response);
    final batches = List<Map<String, dynamic>>.from(
      data['batches'] as List<dynamic>,
    );
    return batches.map(BatchOption.fromJson).toList();
  }

  Future<void> deleteAccount(String token) async {
    final response = await _client.delete(
      Uri.parse('$baseUrl/auth/delete-account'),
      headers: {'Authorization': 'Bearer $token'},
    );
    _decodeResponse(response);
    await clearSession();
  }

  Future<String?> readSecureToken() => _secureStorage.read(key: _tokenKey);

  Future<AppUser?> readSecureUser() async {
    final raw = await _secureStorage.read(key: _userKey);
    if (raw == null) return null;
    try {
      return AppUser.fromJson(jsonDecode(raw) as Map<String, dynamic>);
    } catch (_) {
      return null;
    }
  }

  Future<AppUser> fetchMe(String token) async {
    final response = await _client.get(
      Uri.parse('$baseUrl/auth/me'),
      headers: {'Authorization': 'Bearer $token'},
    );
    final data = _decodeResponse(response);
    return AppUser.fromJson(data['user'] as Map<String, dynamic>);
  }

  Map<String, dynamic> _decodeResponse(http.Response response) {
    final jsonBody = response.body.isEmpty
        ? <String, dynamic>{}
        : jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return jsonBody;
    }
    throw AuthException(jsonBody['error']?.toString() ?? 'Something went wrong');
  }
}

class AuthException implements Exception {
  AuthException(this.message);
  final String message;
  @override
  String toString() => message;
}
