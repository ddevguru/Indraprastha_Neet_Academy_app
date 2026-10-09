import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import '../../../core/constants/api_constants.dart';
import '../../../models/daily_mcq_item.dart';

class ContentRepository {
  ContentRepository({
    http.Client? client,
    SharedPreferences? prefs,
  })  : _client = client ?? _sharedClient,
        _prefs = prefs;

  final http.Client _client;
  final SharedPreferences? _prefs;
  static final http.Client _sharedClient = http.Client();
  static final Map<String, ({DateTime at, Map<String, dynamic> data})> _cache = {};
  static const Duration _cacheTtl = Duration(minutes: 5);

  static void clearCache() => _cache.clear();

  Future<String?> get _token async => _prefs?.getString('auth_token');

  List<Map<String, dynamic>> _mapsFromListKey(
    Map<String, dynamic> data,
    String key,
  ) {
    final raw = data[key];
    if (raw is! List) return const [];
    return raw
        .map((e) => Map<String, dynamic>.from(e as Map))
        .toList();
  }

  Future<Map<String, dynamic>> fetchCourse() =>
      _get('/content/course');

  Future<List<Map<String, dynamic>>> fetchAdminNotifications() async {
    final data = await _get('/content/notifications', bypassCache: true);
    return _mapsFromListKey(data, 'notifications');
  }

  Future<List<Map<String, dynamic>>> fetchSliderImages() async {
    try {
      final data = await _get('/content/slider-images', bypassCache: true);
      final list = _mapsFromListKey(data, 'sliderImages');
      if (list.isNotEmpty) return list;
    } catch (e) {
      if (kDebugMode) print('fetchSliderImages error: $e');
    }
    return const [
      {
        'id': 1,
        'title': 'NEET 2026/2027 Rank Booster',
        'image_url': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=80',
        'target_link': '',
      },
      {
        'id': 2,
        'title': 'Biology NCERT Line-by-Line',
        'image_url': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
        'target_link': '',
      },
      {
        'id': 3,
        'title': 'Full Syllabus Mock Test Series',
        'image_url': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
        'target_link': '',
      },
      {
        'id': 4,
        'title': 'Physics & Chemistry Formula Sheets',
        'image_url': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
        'target_link': '',
      },
      {
        'id': 5,
        'title': 'Daily Revision & Target Practice',
        'image_url': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&auto=format&fit=crop&q=80',
        'target_link': '',
      },
    ];
  }

  Future<List<Map<String, dynamic>>> fetchBooks({
    String? subject,
    String? topic,
  }) async {
    final data = await _get(_scopedPath('/content/books', subject: subject, topic: topic));
    return _mapsFromListKey(data, 'books');
  }

  Future<List<Map<String, dynamic>>> fetchChapters(int bookId) async {
    final data = await _get('/content/books/$bookId/chapters');
    return _mapsFromListKey(data, 'chapters');
  }

  Future<List<Map<String, dynamic>>> fetchPyqs(int chapterId) async {
    final data = await _get('/content/chapters/$chapterId/pyqs', bypassCache: true);
    return _mapsFromListKey(data, 'pyqs');
  }

  Future<List<Map<String, dynamic>>> fetchPracticeSets({
    String? subject,
    String? topic,
  }) async {
    final data = await _get(
      _scopedPath('/content/practice-sets', subject: subject, topic: topic),
    );
    return _mapsFromListKey(data, 'practiceSets');
  }

  Future<Map<String, dynamic>> fetchChapterDetail(int chapterId) =>
      _get('/content/chapters/$chapterId');

  Future<Map<String, dynamic>> fetchPracticeAttemptData(int setId) =>
      _get('/content/practice-sets/$setId/questions', bypassCache: true);

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
    return _mapsFromListKey(data, 'tests');
  }

  Future<Map<String, dynamic>> fetchContentFilters() =>
      _get('/content/filters');

  Future<Map<String, dynamic>> fetchTestQuestions(int testId) =>
      _get('/content/tests/$testId/questions', bypassCache: true);

  Future<Map<String, dynamic>> submitTestAttempt({
    required int testId,
    required int score,
    required double accuracy,
    required int correctCount,
    required int wrongCount,
    required int unattemptedCount,
    List<Map<String, dynamic>>? userAnswers,
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
        if (userAnswers != null) 'userAnswers': userAnswers,
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

  Future<Map<String, dynamic>> fetchTestPerformanceAnalysis(int testId) async {
    final token = await _token;
    if (token == null) {
      throw Exception('Not logged in. Please login again.');
    }
    final response = await _client.get(
      Uri.parse('$baseUrl/content/tests/$testId/performance-analysis'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );
    final body = response.body.isEmpty
        ? <String, dynamic>{}
        : jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return body['data'] is Map
          ? Map<String, dynamic>.from(body['data'] as Map)
          : body;
    }
    throw Exception(body['error']?.toString() ?? 'Failed to fetch performance analysis');
  }


  Future<Map<String, dynamic>> submitPracticeAttempt({
    required int setId,
    required int score,
    required double accuracy,
    required int correctCount,
    required int wrongCount,
  }) async {
    final token = await _token;
    if (token == null) {
      throw Exception('Not logged in. Please login again.');
    }
    final response = await _client.post(
      Uri.parse('$baseUrl/content/practice-sets/$setId/submit'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'score': score,
        'accuracy': accuracy,
        'correctCount': correctCount,
        'wrongCount': wrongCount,
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

  Future<Map<String, dynamic>> fetchSimilarQuestionsData({
    int? sourceQuestionId,
    String? sourceType,
    int? testId,
    required String questionText,
    String? subject,
    String? topic,
    List<String>? options,
    String? explanation,
    String? userAnswer,
    int count = 5,
  }) async {
    final token = await _token;
    if (token == null) {
      throw Exception('Not logged in. Please login again.');
    }
    final response = await _client.post(
      Uri.parse('$baseUrl/content/ai/similar-questions'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        if (sourceQuestionId != null) 'source_question_id': sourceQuestionId,
        'source_type': sourceType ?? 'test',
        if (testId != null) 'test_id': testId,
        'questionText': questionText,
        'subject': subject ?? '',
        'topic': topic ?? '',
        'options': options ?? [],
        'explanation': explanation ?? '',
        if (userAnswer != null) 'user_answer': userAnswer,
        'requested_count': count,
        'count': count,
      }),
    );
    final body = response.body.isEmpty
        ? <String, dynamic>{}
        : jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode >= 200 && response.statusCode < 300) {
      final list = body['questions'];
      final questions = (list is List)
          ? list.whereType<Map>().map((m) => Map<String, dynamic>.from(m)).toList()
          : <Map<String, dynamic>>[];
      return {
        'batch_id': body['batch_id'],
        'subject': body['subject']?.toString() ?? subject ?? '',
        'chapter': body['chapter']?.toString() ?? topic ?? '',
        'topic': body['topic']?.toString() ?? topic ?? '',
        'concept': body['concept']?.toString() ?? '',
        'questions': questions,
      };
    }
    throw Exception(body['error']?.toString() ?? 'Failed to generate similar questions');
  }

  Future<List<Map<String, dynamic>>> generateSimilarQuestions({
    int? sourceQuestionId,
    String? sourceType,
    int? testId,
    required String questionText,
    String? subject,
    String? topic,
    List<String>? options,
    String? explanation,
    String? userAnswer,
    int count = 5,
  }) async {
    final res = await fetchSimilarQuestionsData(
      sourceQuestionId: sourceQuestionId,
      sourceType: sourceType,
      testId: testId,
      questionText: questionText,
      subject: subject,
      topic: topic,
      options: options,
      explanation: explanation,
      userAnswer: userAnswer,
      count: count,
    );
    return List<Map<String, dynamic>>.from(res['questions'] ?? const []);
  }

  Future<Map<String, dynamic>> submitSimilarQuestionsBatchAnswers({
    required int batchId,
    required Map<String, String> answers,
  }) async {
    final token = await _token;
    if (token == null) {
      throw Exception('Not logged in. Please login again.');
    }
    final response = await _client.post(
      Uri.parse('$baseUrl/content/ai/similar-questions/$batchId/submit'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({'answers': answers}),
    );
    final body = response.body.isEmpty
        ? <String, dynamic>{}
        : jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return body;
    }
    throw Exception(body['error']?.toString() ?? 'Failed to submit answers');
  }

  Future<Map<String, dynamic>> submitComplaint({
    required String title,
    required String description,
    String reportType = 'general',
  }) async {
    final token = await _token;
    if (token == null) {
      throw Exception('Not logged in. Please login again.');
    }
    try {
      final response = await _client.post(
        Uri.parse('$baseUrl/support/complaints'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'title': title,
          'description': description,
          'report_type': reportType,
        }),
      );

      if (response.statusCode >= 200 && response.statusCode < 300) {
        if (response.body.isEmpty) return {};
        return jsonDecode(response.body) as Map<String, dynamic>;
      }

      // Handle error responses
      if (response.body.isEmpty) {
        throw Exception('Server returned ${response.statusCode} with no response');
      }

      try {
        final errorBody = jsonDecode(response.body) as Map<String, dynamic>;
        throw Exception(errorBody['error']?.toString() ?? 'Server error (${response.statusCode})');
      } catch (e) {
        // Response isn't JSON
        if (response.body.startsWith('<')) {
          throw Exception('Server error (${response.statusCode}): Backend may be down');
        }
        throw Exception(response.body);
      }
    } catch (e) {
      throw Exception(e.toString().replaceFirst('Exception: ', ''));
    }
  }

  Future<List<Map<String, dynamic>>> fetchVideos() async {
    final data = await _get('/content/videos');
    return _mapsFromListKey(data, 'videos');
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
    if (token.trim().isEmpty) return;
    try {
      final authToken = await _token;
      final headers = <String, String>{
        'Content-Type': 'application/json',
      };
      if (authToken != null && authToken.isNotEmpty) {
        headers['Authorization'] = 'Bearer $authToken';
      }
      final res = await _client.post(
        Uri.parse('$baseUrl/content/fcm-token'),
        headers: headers,
        body: jsonEncode({'token': token.trim()}),
      );
      if (kDebugMode) {
        debugPrint('[FCM] Token register status: ${res.statusCode} -> ${res.body}');
      }
    } catch (e) {
      if (kDebugMode) {
        debugPrint('[FCM] Token upload error: $e');
      }
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
