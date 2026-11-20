import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import '../../../core/constants/api_constants.dart';
import '../../../core/providers/app_state.dart';
import '../models/ai_intelligence_models.dart';

final aiIntelligenceRepositoryProvider = Provider<AiIntelligenceRepository>((ref) {
  final prefs = ref.watch(sharedPreferencesProvider);
  return AiIntelligenceRepository(prefs: prefs);
});

class AiIntelligenceRepository {
  AiIntelligenceRepository({
    http.Client? client,
    SharedPreferences? prefs,
  })  : _client = client ?? http.Client(),
        _prefs = prefs;

  final http.Client _client;
  final SharedPreferences? _prefs;

  Future<String?> get _token async => _prefs?.getString('auth_token');

  Future<Map<String, String>> _authHeaders() async {
    final token = await _token;
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      if (token != null && token.isNotEmpty) 'Authorization': 'Bearer $token',
    };
  }

  Future<AiOverviewData> fetchOverview() async {
    final headers = await _authHeaders();
    final url = Uri.parse('$baseUrl/ai-intelligence/overview');
    final response = await _client.get(url, headers: headers);

    if (response.statusCode >= 200 && response.statusCode < 300) {
      final json = jsonDecode(response.body) as Map<String, dynamic>;
      final data = json['data'] as Map<String, dynamic>? ?? json;
      return AiOverviewData.fromJson(data);
    }
    throw Exception('Failed to load AI overview: ${response.statusCode} ${response.body}');
  }

  Future<List<TopicLearningItem>> fetchCategoryTopics(String category, {String? subject}) async {
    final headers = await _authHeaders();
    final queryParams = <String, String>{};
    if (subject != null && subject.isNotEmpty && subject != 'All') {
      queryParams['subject'] = subject;
    }

    final uri = Uri.parse('$baseUrl/ai-intelligence/categories/$category').replace(queryParameters: queryParams.isNotEmpty ? queryParams : null);
    final response = await _client.get(uri, headers: headers);

    if (response.statusCode >= 200 && response.statusCode < 300) {
      final json = jsonDecode(response.body) as Map<String, dynamic>;
      final data = json['data'] as Map<String, dynamic>? ?? json;
      final rawList = data['topics'] as List<dynamic>? ?? [];
      return rawList.map((e) => TopicLearningItem.fromJson(e as Map<String, dynamic>)).toList();
    }
    throw Exception('Failed to load category topics: ${response.statusCode} ${response.body}');
  }

  Future<TopicDetailData> fetchTopicDetail(String subject, String topic) async {
    final headers = await _authHeaders();
    final uri = Uri.parse('$baseUrl/ai-intelligence/topics/detail').replace(queryParameters: {
      'subject': subject,
      'topic': topic,
    });
    final response = await _client.get(uri, headers: headers);

    if (response.statusCode >= 200 && response.statusCode < 300) {
      final json = jsonDecode(response.body) as Map<String, dynamic>;
      final data = json['data'] as Map<String, dynamic>? ?? json;
      return TopicDetailData.fromJson(data);
    }
    throw Exception('Failed to load topic detail: ${response.statusCode} ${response.body}');
  }

  Future<StudyPlanData> fetchStudyPlan() async {
    final headers = await _authHeaders();
    final url = Uri.parse('$baseUrl/ai-intelligence/study-plan');
    final response = await _client.get(url, headers: headers);

    if (response.statusCode >= 200 && response.statusCode < 300) {
      final json = jsonDecode(response.body) as Map<String, dynamic>;
      final data = json['data'] as Map<String, dynamic>? ?? json;
      return StudyPlanData.fromJson(data);
    }
    throw Exception('Failed to load study plan: ${response.statusCode} ${response.body}');
  }

  Future<bool> completeRecommendation(int id) async {
    final headers = await _authHeaders();
    final url = Uri.parse('$baseUrl/ai-intelligence/recommendations/$id/complete');
    final response = await _client.post(url, headers: headers);

    if (response.statusCode >= 200 && response.statusCode < 300) {
      return true;
    }
    throw Exception('Failed to complete recommendation: ${response.statusCode}');
  }

  Future<AiOverviewData> triggerAnalysis() async {
    final headers = await _authHeaders();
    final url = Uri.parse('$baseUrl/ai-intelligence/analyze');
    final response = await _client.post(url, headers: headers);

    if (response.statusCode >= 200 && response.statusCode < 300) {
      final json = jsonDecode(response.body) as Map<String, dynamic>;
      final data = json['data']?['overview'] as Map<String, dynamic>? ?? json['data'] as Map<String, dynamic>? ?? json;
      return AiOverviewData.fromJson(data);
    }
    throw Exception('Failed to run analysis: ${response.statusCode}');
  }
}

