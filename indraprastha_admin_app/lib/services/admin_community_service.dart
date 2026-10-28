import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AdminCommunityService {
  static const String baseUrl = 'https://api.indraprasthaneetacademy.com/api';
  static const String _tokenKey = 'admin_auth_token';

  static Future<String?> _getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_tokenKey);
  }

  static Future<Map<String, String>> _headers({bool isJson = true}) async {
    final token = await _getToken();
    final headers = <String, String>{};
    if (token != null && token.isNotEmpty) {
      headers['Authorization'] = 'Bearer $token';
    }
    if (isJson) {
      headers['Content-Type'] = 'application/json';
    }
    return headers;
  }

  // ---------------- Teacher Management ----------------

  static Future<List<Map<String, dynamic>>> getTeachers() async {
    final res = await http.get(
      Uri.parse('$baseUrl/admin/teachers'),
      headers: await _headers(),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Failed to load teachers: ${res.body}');
    }
    final data = jsonDecode(res.body);
    final list = data['teachers'] as List? ?? [];
    return list.map((e) => Map<String, dynamic>.from(e as Map)).toList();
  }

  static Future<Map<String, dynamic>> createTeacher({
    required String email,
    required String password,
    required String displayName,
    String? teacherCode,
    List<Map<String, String>>? assignments,
  }) async {
    final res = await http.post(
      Uri.parse('$baseUrl/admin/teachers'),
      headers: await _headers(),
      body: jsonEncode({
        'email': email,
        'password': password,
        'displayName': displayName,
        'teacherCode': teacherCode ?? '',
        'assignments': assignments ?? [],
      }),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      final err = jsonDecode(res.body);
      throw Exception(err['error'] ?? 'Failed to create teacher');
    }
    return jsonDecode(res.body);
  }

  static Future<void> updateTeacher(
    int teacherId, {
    String? displayName,
    bool? isActive,
    String? password,
  }) async {
    final body = <String, dynamic>{};
    if (displayName != null) body['displayName'] = displayName;
    if (isActive != null) body['isActive'] = isActive;
    if (password != null && password.isNotEmpty) body['password'] = password;

    final res = await http.patch(
      Uri.parse('$baseUrl/admin/teachers/$teacherId'),
      headers: await _headers(),
      body: jsonEncode(body),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      final err = jsonDecode(res.body);
      throw Exception(err['error'] ?? 'Failed to update teacher');
    }
  }

  static Future<void> addTeacherAssignment(
    int teacherId, {
    required String classLevel,
    required String subject,
  }) async {
    final res = await http.post(
      Uri.parse('$baseUrl/admin/teachers/$teacherId/assignments'),
      headers: await _headers(),
      body: jsonEncode({
        'classLevel': classLevel,
        'subject': subject,
      }),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      final err = jsonDecode(res.body);
      throw Exception(err['error'] ?? 'Failed to add subject assignment');
    }
  }

  static Future<void> removeTeacherAssignment(
    int teacherId,
    int assignmentId,
  ) async {
    final res = await http.delete(
      Uri.parse('$baseUrl/admin/teachers/$teacherId/assignments/$assignmentId'),
      headers: await _headers(),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      final err = jsonDecode(res.body);
      throw Exception(err['error'] ?? 'Failed to remove assignment');
    }
  }

  static Future<Map<String, dynamic>> getTeacherPerformance(int teacherId) async {
    final res = await http.get(
      Uri.parse('$baseUrl/admin/teachers/$teacherId/performance'),
      headers: await _headers(),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Failed to load teacher performance: ${res.body}');
    }
    return jsonDecode(res.body);
  }

  // ---------------- Doubt Tracking & Monitoring ----------------

  static Future<Map<String, dynamic>> getDoubts({
    String? classLevel,
    String? subject,
    String? status,
    String? search,
    int limit = 50,
    int offset = 0,
  }) async {
    final query = <String, String>{
      'limit': '$limit',
      'offset': '$offset',
      if (classLevel != null && classLevel.isNotEmpty) 'class_level': classLevel,
      if (subject != null && subject.isNotEmpty) 'subject': subject,
      if (status != null && status.isNotEmpty) 'status': status,
      if (search != null && search.isNotEmpty) 'search': search,
    };
    final uri = Uri.parse('$baseUrl/admin/doubts').replace(queryParameters: query);
    final res = await http.get(uri, headers: await _headers());
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Failed to load doubts: ${res.body}');
    }
    return jsonDecode(res.body);
  }

  static Future<Map<String, dynamic>> getDoubtDetail(int doubtId) async {
    final res = await http.get(
      Uri.parse('$baseUrl/admin/doubts/$doubtId'),
      headers: await _headers(),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Failed to load doubt detail: ${res.body}');
    }
    return jsonDecode(res.body);
  }

  static Future<Map<String, dynamic>> getDoubtsAnalytics() async {
    final res = await http.get(
      Uri.parse('$baseUrl/admin/doubts-analytics'),
      headers: await _headers(),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Failed to load doubts analytics: ${res.body}');
    }
    return jsonDecode(res.body);
  }

  static String getCsvReportUrl({String? status, String? classLevel, String? subject}) {
    final query = <String, String>{
      if (status != null && status.isNotEmpty) 'status': status,
      if (classLevel != null && classLevel.isNotEmpty) 'class_level': classLevel,
      if (subject != null && subject.isNotEmpty) 'subject': subject,
    };
    return Uri.parse('$baseUrl/admin/reports/doubts')
        .replace(queryParameters: query)
        .toString();
  }
}
