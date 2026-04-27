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

  Future<Map<String, dynamic>> sendOtp(String phone) async {
    final response = await _client.post(
      Uri.parse('$baseUrl/auth/send-otp'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'phone': phone}),
    );
    return _decodeResponse(response);
  }

  Future<Map<String, dynamic>> verifyOtp({
    required String phone,
    required String otp,
  }) async {
    final response = await _client.post(
      Uri.parse('$baseUrl/auth/verify-otp'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'phone': phone, 'otp': otp}),
    );
    return _decodeResponse(response);
  }

  Future<Map<String, dynamic>> completeSignup({
    required String phone,
    required String fullName,
    required int batchId,
    required String courseCategory,
    required String collegeState,
    required String mbbsYear,
    required String medicalCollege,
    String preferredLanguage = 'English',
  }) async {
    final response = await _client.post(
      Uri.parse('$baseUrl/auth/complete-signup'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'phone': phone,
        'fullName': fullName,
        'targetExamYear': 'NEET',
        'preferredPlan': 'Starter',
        'batchId': batchId,
        'preferredLanguage': preferredLanguage,
        'courseCategory': courseCategory,
        'collegeState': collegeState,
        'mbbsYear': mbbsYear,
        'medicalCollege': medicalCollege,
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

  Future<List<String>> fetchStates() async {
    final response = await _client.get(Uri.parse('$baseUrl/auth/states'));
    final data = _decodeResponse(response);
    return List<String>.from(data['states'] as List<dynamic>);
  }

  Future<List<String>> fetchColleges(String state) async {
    final response =
        await _client.get(Uri.parse('$baseUrl/auth/colleges?state=$state'));
    final data = _decodeResponse(response);
    return List<String>.from(data['colleges'] as List<dynamic>);
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
