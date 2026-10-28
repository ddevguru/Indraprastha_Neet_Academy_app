import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../models/teacher_models.dart';

class TeacherApiService {
  static const String baseUrl = 'https://api.indraprasthaneetacademy.com/api';
  static const String _tokenKey = 'teacher_auth_token';
  static const String _profileKey = 'teacher_cached_profile';

  static String? _token;
  static TeacherProfile? currentProfile;

  static String? get token => _token;

  static Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString(_tokenKey);
    final profileStr = prefs.getString(_profileKey);
    if (profileStr != null) {
      try {
        currentProfile = TeacherProfile.fromJson(jsonDecode(profileStr));
      } catch (_) {}
    }
  }

  static Future<Map<String, String>> _headers({bool isJson = true}) async {
    final headers = <String, String>{};
    if (_token != null && _token!.isNotEmpty) {
      headers['Authorization'] = 'Bearer $_token';
    }
    if (isJson) {
      headers['Content-Type'] = 'application/json';
    }
    return headers;
  }

  // ---------------- AUTH ----------------

  static Future<TeacherProfile> login(String email, String password) async {
    final res = await http.post(
      Uri.parse('$baseUrl/teacher/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email.trim(), 'password': password}),
    );

    final data = jsonDecode(res.body);
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception(data['error'] ?? 'Login failed. Please check your credentials.');
    }

    _token = data['token']?.toString();
    final teacherJson = data['teacher'] as Map<String, dynamic>;
    currentProfile = TeacherProfile.fromJson(teacherJson);

    final prefs = await SharedPreferences.getInstance();
    if (_token != null) await prefs.setString(_tokenKey, _token!);
    await prefs.setString(_profileKey, jsonEncode(teacherJson));

    return currentProfile!;
  }

  static Future<void> logout() async {
    _token = null;
    currentProfile = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
    await prefs.remove(_profileKey);
  }

  static Future<TeacherProfile> getProfile() async {
    final res = await http.get(
      Uri.parse('$baseUrl/teacher/profile'),
      headers: await _headers(),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Failed to load profile: ${res.body}');
    }
    final data = jsonDecode(res.body);
    final teacherJson = data['teacher'] as Map<String, dynamic>;
    currentProfile = TeacherProfile.fromJson(teacherJson);

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_profileKey, jsonEncode(teacherJson));
    return currentProfile!;
  }

  // ---------------- DASHBOARD & DOUBTS ----------------

  static Future<Map<String, dynamic>> getDashboard() async {
    final res = await http.get(
      Uri.parse('$baseUrl/teacher/dashboard'),
      headers: await _headers(),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Failed to load dashboard: ${res.body}');
    }
    return jsonDecode(res.body);
  }

  static Future<List<TeacherDoubtItem>> getDoubts({
    String? status,
    String? classLevel,
    String? subject,
    String? search,
  }) async {
    final query = <String, String>{
      if (status != null && status.isNotEmpty) 'status': status,
      if (classLevel != null && classLevel.isNotEmpty) 'class_level': classLevel,
      if (subject != null && subject.isNotEmpty) 'subject': subject,
      if (search != null && search.isNotEmpty) 'search': search,
    };
    final uri = Uri.parse('$baseUrl/teacher/doubts').replace(queryParameters: query);
    final res = await http.get(uri, headers: await _headers());

    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Failed to load doubts: ${res.body}');
    }
    final data = jsonDecode(res.body);
    final list = data['doubts'] as List? ?? [];
    return list.map((e) => TeacherDoubtItem.fromJson(Map<String, dynamic>.from(e as Map))).toList();
  }

  static Future<TeacherDoubtItem> getDoubtDetail(int doubtId) async {
    final res = await http.get(
      Uri.parse('$baseUrl/teacher/doubts/$doubtId'),
      headers: await _headers(),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Failed to load doubt details: ${res.body}');
    }
    final data = jsonDecode(res.body);
    return TeacherDoubtItem.fromJson(data['doubt']);
  }

  static Future<void> claimDoubt(int doubtId) async {
    final res = await http.post(
      Uri.parse('$baseUrl/teacher/doubts/$doubtId/claim'),
      headers: await _headers(),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      final err = jsonDecode(res.body);
      throw Exception(err['error'] ?? 'Failed to claim doubt');
    }
  }

  static Future<void> startSolvingDoubt(int doubtId) async {
    final res = await http.post(
      Uri.parse('$baseUrl/teacher/doubts/$doubtId/start'),
      headers: await _headers(),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      final err = jsonDecode(res.body);
      throw Exception(err['error'] ?? 'Failed to start solving doubt');
    }
  }

  static Future<void> submitAnswer(
    int doubtId, {
    required String responseText,
    List<DoubtMediaAttachment> attachments = const [],
  }) async {
    final res = await http.post(
      Uri.parse('$baseUrl/teacher/doubts/$doubtId/responses'),
      headers: await _headers(),
      body: jsonEncode({
        'response_text': responseText.trim(),
        'attachments': attachments.map((a) => a.toJson()).toList(),
      }),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      final err = jsonDecode(res.body);
      throw Exception(err['error'] ?? 'Failed to submit response');
    }
  }

  static Future<void> saveWhiteboardDraft(
    int doubtId, {
    required Map<String, dynamic> documentJson,
    String snapshotDriveLink = '',
  }) async {
    final res = await http.put(
      Uri.parse('$baseUrl/teacher/doubts/$doubtId/whiteboard'),
      headers: await _headers(),
      body: jsonEncode({
        'documentJson': documentJson,
        'snapshotDriveLink': snapshotDriveLink,
      }),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      final err = jsonDecode(res.body);
      throw Exception(err['error'] ?? 'Failed to save whiteboard draft');
    }
  }

  static Future<void> publishWhiteboardSolution(
    int doubtId, {
    required Map<String, dynamic> documentJson,
    String snapshotDriveLink = '',
  }) async {
    final res = await http.post(
      Uri.parse('$baseUrl/teacher/doubts/$doubtId/publish-solution'),
      headers: await _headers(),
      body: jsonEncode({
        'documentJson': documentJson,
        'snapshotDriveLink': snapshotDriveLink,
      }),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      final err = jsonDecode(res.body);
      throw Exception(err['error'] ?? 'Failed to publish whiteboard solution');
    }
  }

  static Future<void> markResolved(int doubtId) async {
    final res = await http.post(
      Uri.parse('$baseUrl/teacher/doubts/$doubtId/resolve'),
      headers: await _headers(),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      final err = jsonDecode(res.body);
      throw Exception(err['error'] ?? 'Failed to resolve doubt');
    }
  }

  // Direct upload to Admin Google Drive via backend
  static Future<DoubtMediaAttachment> uploadFileToDrive(File file, {String subfolder = 'DoubtMedia'}) async {
    final uri = Uri.parse('$baseUrl/community/upload');
    final req = http.MultipartRequest('POST', uri);
    if (_token != null && _token!.isNotEmpty) {
      req.headers['Authorization'] = 'Bearer $_token';
    }
    req.fields['subfolder'] = subfolder;

    final bytes = await file.readAsBytes();
    final name = file.path.split(Platform.pathSeparator).last;
    req.files.add(http.MultipartFile.fromBytes('file', bytes, filename: name));

    final streamed = await req.send();
    final body = await streamed.stream.bytesToString();
    if (streamed.statusCode < 200 || streamed.statusCode >= 300) {
      throw Exception('Failed to upload file to Google Drive: $body');
    }

    final data = jsonDecode(body);
    return DoubtMediaAttachment.fromJson(data['file']);
  }
}
