import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

import '../../../core/constants/api_constants.dart';
import '../../../models/daily_mcq_item.dart';

class ContentRepository {
  ContentRepository({http.Client? client}) : _client = client ?? _sharedClient;

  final http.Client _client;
  static final http.Client _sharedClient = http.Client();
  static const _secureStorage = FlutterSecureStorage();
  static final Map<String, ({DateTime at, Map<String, dynamic> data})> _cache = {};
  static const Duration _cacheTtl = Duration(seconds: 20);

  Future<String?> get _token async => _secureStorage.read(key: 'auth_token');

  Future<Map<String, dynamic>> fetchCourse() =>
      _get('/content/course', bypassCache: true);

  Future<List<Map<String, dynamic>>> fetchBooks() async {
    final data = await _get('/content/books', bypassCache: true);
    return List<Map<String, dynamic>>.from(data['books'] as List<dynamic>);
  }

  Future<List<Map<String, dynamic>>> fetchChapters(int bookId) async {
    final data = await _get('/content/books/$bookId/chapters', bypassCache: true);
    return List<Map<String, dynamic>>.from(data['chapters'] as List<dynamic>);
  }

  Future<List<Map<String, dynamic>>> fetchPyqs(int chapterId) async {
    final data = await _get('/content/chapters/$chapterId/pyqs');
    return List<Map<String, dynamic>>.from(data['pyqs'] as List<dynamic>);
  }

  Future<List<Map<String, dynamic>>> fetchPracticeSets() async {
    final data = await _get('/content/practice-sets');
    return List<Map<String, dynamic>>.from(
      data['practiceSets'] as List<dynamic>,
    );
  }

  Future<Map<String, dynamic>> fetchChapterDetail(int chapterId) =>
      _get('/content/chapters/$chapterId');

  Future<Map<String, dynamic>> fetchPracticeAttemptData(int setId) =>
      _get('/content/practice-sets/$setId/questions');

  Future<List<Map<String, dynamic>>> fetchTests() async {
    final data = await _get('/content/tests');
    return List<Map<String, dynamic>>.from(data['tests'] as List<dynamic>);
  }

  Future<Map<String, dynamic>> fetchTestQuestions(int testId) =>
      _get('/content/tests/$testId/questions');

  Future<Map<String, dynamic>> submitTestAttempt({
    required int testId,
    required int score,
    required double accuracy,
    required int correctCount,
    required int wrongCount,
    required int unattemptedCount,
  }) async {
    final token = await _token;
    if (token == null) {
      throw Exception('Not logged in. Please login again.');
    }
    final response = await _client.post(
      Uri.parse('$baseUrl/content/tests/$testId/submit'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'score': score,
        'accuracy': accuracy,
        'correctCount': correctCount,
        'wrongCount': wrongCount,
        'unattemptedCount': unattemptedCount,
      }),
    );
    final body = response.body.isEmpty
        ? <String, dynamic>{}
        : jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode >= 200 && response.statusCode < 300) {
      _cache.clear();
      return body;
    }
    throw Exception(body['error']?.toString() ?? 'Failed request');
  }

  Future<Map<String, dynamic>> fetchLatestAnalytics() =>
      _get('/content/analytics/latest');

  Future<List<Map<String, dynamic>>> fetchVideos() async {
    final data = await _get('/content/videos');
    return List<Map<String, dynamic>>.from(data['videos'] as List<dynamic>);
  }

  Future<List<Map<String, dynamic>>> fetchPackages() async {
    final data = await _get('/content/packages');
    return List<Map<String, dynamic>>.from(data['packages'] as List<dynamic>);
  }

  Future<List<DailyMcqItem>> fetchDailyMcqs() async {
    try {
      final data = await _get('/content/mcqs');
      final mcqs = data['mcqs'] as List<dynamic>? ?? [];
      return mcqs
          .map((m) => DailyMcqItem.fromApi(m as Map<String, dynamic>))
          .toList();
    } catch (_) {
      return [];
    }
  }

  Future<int> fetchDailyMcqCount() async {
    try {
      final data = await _get('/content/mcqs');
      final mcqs = data['mcqs'] as List<dynamic>? ?? [];
      return mcqs.length;
    } catch (_) {
      return 0;
    }
  }

  Future<Map<String, dynamic>> _get(
    String path, {
    bool bypassCache = false,
  }) async {
    final token = await _token;
    if (token == null) {
      return {};
    }
    final cacheKey = '$token::$path';
    final cached = _cache[cacheKey];
    final now = DateTime.now();
    if (!bypassCache && cached != null && now.difference(cached.at) <= _cacheTtl) {
      return cached.data;
    }
    final response = await _client.get(
      Uri.parse('$baseUrl$path'),
      headers: {'Authorization': 'Bearer $token'},
    );
    final body = response.body.isEmpty
        ? <String, dynamic>{}
        : jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode >= 200 && response.statusCode < 300) {
      _cache[cacheKey] = (at: now, data: body);
      return body;
    }
    throw Exception(body['error']?.toString() ?? 'Failed request');
  }
}
