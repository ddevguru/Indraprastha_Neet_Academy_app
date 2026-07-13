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
  static const Duration _cacheTtl = Duration(minutes: 5);

  static void clearCache() => _cache.clear();

  Future<String?> get _token async => _secureStorage.read(key: 'auth_token');

  Future<Map<String, dynamic>> fetchCourse() =>
      _get('/content/course');

  Future<List<Map<String, dynamic>>> fetchBooks({
    String? subject,
    String? topic,
  }) async {
    final data = await _get(_scopedPath('/content/books', subject: subject, topic: topic));
    return List<Map<String, dynamic>>.from(data['books'] as List<dynamic>);
  }

  Future<List<Map<String, dynamic>>> fetchChapters(int bookId) async {
    final data = await _get('/content/books/$bookId/chapters');
    return List<Map<String, dynamic>>.from(data['chapters'] as List<dynamic>);
  }

  Future<List<Map<String, dynamic>>> fetchPyqs(int chapterId) async {
    final data = await _get('/content/chapters/$chapterId/pyqs');
    return List<Map<String, dynamic>>.from(data['pyqs'] as List<dynamic>);
  }

  Future<List<Map<String, dynamic>>> fetchPracticeSets({
    String? subject,
    String? topic,
  }) async {
    final data = await _get(
      _scopedPath('/content/practice-sets', subject: subject, topic: topic),
    );
    return List<Map<String, dynamic>>.from(
      data['practiceSets'] as List<dynamic>,
    );
  }

  Future<Map<String, dynamic>> fetchChapterDetail(int chapterId) =>
      _get('/content/chapters/$chapterId');

  Future<Map<String, dynamic>> fetchPracticeAttemptData(int setId) =>
      _get('/content/practice-sets/$setId/questions');

  Future<List<Map<String, dynamic>>> fetchTests({
    String? subject,
    String? topic,
    String? category,
  }) async {
    final data = await _get(
      _scopedPath(
        '/content/tests',
        subject: subject,
        topic: topic,
        extra: category == null || category.isEmpty
            ? null
            : {'category': category},
      ),
    );
    return List<Map<String, dynamic>>.from(data['tests'] as List<dynamic>);
  }

  Future<Map<String, dynamic>> fetchContentFilters() =>
      _get('/content/filters');

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
    final raw = data['packages'];
    if (raw is! List) return const [];
    return raw
        .map((e) => Map<String, dynamic>.from(e as Map))
        .toList();
  }

  Future<Map<String, dynamic>> createPaymentOrder(int packageId) async {
    final token = await _token;
    if (token == null) throw Exception('Not logged in. Please login again.');
    final response = await _client.post(
      Uri.parse('$baseUrl/payments/create-order'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({'packageId': packageId}),
    );
    final body = response.body.isEmpty
        ? <String, dynamic>{}
        : jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return body;
    }
    throw Exception(body['error']?.toString() ?? 'Failed to create payment order');
  }

  Future<Map<String, dynamic>> verifyPayment({
    required String orderId,
    String? razorpayPaymentId,
    String? razorpayOrderId,
    String? razorpaySignature,
  }) async {
    final token = await _token;
    if (token == null) throw Exception('Not logged in. Please login again.');
    final response = await _client.post(
      Uri.parse('$baseUrl/payments/verify'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'orderId': orderId,
        if (razorpayPaymentId != null) 'razorpayPaymentId': razorpayPaymentId,
        if (razorpayOrderId != null) 'razorpayOrderId': razorpayOrderId,
        if (razorpaySignature != null) 'razorpaySignature': razorpaySignature,
      }),
    );
    final body = response.body.isEmpty
        ? <String, dynamic>{}
        : jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return body;
    }
    throw Exception(body['error']?.toString() ?? 'Payment verification failed');
  }

  Future<void> registerFcmToken(String token) async {
    final authToken = await _token;
    if (authToken == null || token.isEmpty) return;
    try {
      await _client.post(
        Uri.parse('$baseUrl/content/fcm-token'),
        headers: {
          'Authorization': 'Bearer $authToken',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({'token': token}),
      );
    } catch (_) {
      // Non-critical — ignore network errors
    }
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

  String _scopedPath(
    String path, {
    String? subject,
    String? topic,
    Map<String, String>? extra,
  }) {
    final params = <String, String>{};
    if (subject != null && subject.trim().isNotEmpty) {
      params['subject'] = subject.trim();
    }
    if (topic != null && topic.trim().isNotEmpty) {
      params['topic'] = topic.trim();
    }
    if (extra != null) {
      extra.forEach((key, value) {
        if (value.trim().isNotEmpty) params[key] = value.trim();
      });
    }
    if (params.isEmpty) return path;
    final query = params.entries
        .map((e) => '${Uri.encodeQueryComponent(e.key)}=${Uri.encodeQueryComponent(e.value)}')
        .join('&');
    return '$path?$query';
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
