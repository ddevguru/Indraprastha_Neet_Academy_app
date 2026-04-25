import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

import '../../../core/constants/api_constants.dart';

class ContentRepository {
  ContentRepository({http.Client? client}) : _client = client ?? http.Client();

  final http.Client _client;
  static const _secureStorage = FlutterSecureStorage();

  Future<String?> get _token async => _secureStorage.read(key: 'auth_token');

  Future<Map<String, dynamic>> fetchCourse() =>
      _get('/content/course');

  Future<List<Map<String, dynamic>>> fetchBooks() async {
    final data = await _get('/content/books');
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

  Future<Map<String, dynamic>> fetchLatestAnalytics() =>
      _get('/content/analytics/latest');

  Future<List<Map<String, dynamic>>> fetchVideos() async {
    final data = await _get('/content/videos');
    return List<Map<String, dynamic>>.from(data['videos'] as List<dynamic>);
  }

  Future<Map<String, dynamic>> _get(String path) async {
    final token = await _token;
    if (token == null) {
      return {};
    }
    final response = await _client.get(
      Uri.parse('$baseUrl$path'),
      headers: {'Authorization': 'Bearer $token'},
    );
    final body = response.body.isEmpty
        ? <String, dynamic>{}
        : jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return body;
    }
    throw Exception(body['error']?.toString() ?? 'Failed request');
  }
}
