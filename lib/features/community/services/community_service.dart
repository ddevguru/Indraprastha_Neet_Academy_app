import 'dart:convert';
import 'dart:typed_data';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../../../core/constants/api_constants.dart';
import '../models/community_models.dart';

class CommunityService {
  CommunityService({http.Client? client}) : _client = client ?? http.Client();

  final http.Client _client;

  Future<String?> _getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('auth_token');
  }

  Future<Map<String, String>> _authHeaders({bool jsonBody = true}) async {
    final token = await _getToken();
    final headers = <String, String>{
      if (token != null && token.isNotEmpty) 'Authorization': 'Bearer $token',
    };
    if (jsonBody) {
      headers['Content-Type'] = 'application/json';
    }
    return headers;
  }

  // 1. Fetch the 6 Subject Workspaces
  Future<List<CommunitySubject>> fetchSubjects() async {
    final url = Uri.parse('$baseUrl/community/subjects');
    final headers = await _authHeaders(jsonBody: false);
    final res = await _client.get(url, headers: headers);

    if (res.statusCode >= 200 && res.statusCode < 300) {
      final body = jsonDecode(res.body);
      if (body['subjects'] is List) {
        return (body['subjects'] as List)
            .map((e) => CommunitySubject.fromJson(Map<String, dynamic>.from(e as Map)))
            .toList();
      }
    }
    throw Exception('Failed to load community subjects (${res.statusCode}): ${res.body}');
  }

  // 2. Fetch Messages for a workspace
  Future<List<CommunityMessage>> fetchMessages(int communityId, {String? before}) async {
    var uriStr = '$baseUrl/community/$communityId/messages?limit=60';
    if (before != null) uriStr += '&before=${Uri.encodeComponent(before)}';

    final url = Uri.parse(uriStr);
    final headers = await _authHeaders(jsonBody: false);
    final res = await _client.get(url, headers: headers);

    if (res.statusCode >= 200 && res.statusCode < 300) {
      final body = jsonDecode(res.body);
      if (body['messages'] is List) {
        return (body['messages'] as List)
            .map((e) => CommunityMessage.fromJson(Map<String, dynamic>.from(e as Map)))
            .toList();
      }
    }
    throw Exception('Failed to load messages (${res.statusCode})');
  }

  // 3. Send Message in workspace
  Future<CommunityMessage> sendMessage(
    int communityId, {
    required String textContent,
    String messageType = 'text',
    List<Map<String, dynamic>> attachments = const [],
    int? doubtId,
  }) async {
    final url = Uri.parse('$baseUrl/community/$communityId/messages');
    final headers = await _authHeaders();
    final payload = jsonEncode({
      'textContent': textContent,
      'messageType': messageType,
      'attachments': attachments,
      if (doubtId != null) 'doubtId': doubtId,
    });

    final res = await _client.post(url, headers: headers, body: payload);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      final body = jsonDecode(res.body);
      if (body['message'] is Map) {
        return CommunityMessage.fromJson(Map<String, dynamic>.from(body['message']));
      }
    }
    throw Exception('Failed to send message (${res.statusCode})');
  }

  // 4. Edit Message
  Future<void> editMessage(int messageId, String newText) async {
    final url = Uri.parse('$baseUrl/community/messages/$messageId');
    final headers = await _authHeaders();
    final res = await _client.patch(url, headers: headers, body: jsonEncode({'textContent': newText}));
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Failed to edit message (${res.statusCode})');
    }
  }

  // 5. Delete Message
  Future<void> deleteMessage(int messageId) async {
    final url = Uri.parse('$baseUrl/community/messages/$messageId');
    final headers = await _authHeaders(jsonBody: false);
    final res = await _client.delete(url, headers: headers);
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Failed to delete message (${res.statusCode})');
    }
  }

  // 6. Direct Media Upload to Admin's Google Drive
  Future<Map<String, dynamic>> uploadMedia({
    required Uint8List fileBytes,
    required String fileName,
    required String mimeType,
    String subfolder = 'CommunityMedia',
  }) async {
    final url = Uri.parse('$baseUrl/community/upload');
    final token = await _getToken();

    final req = http.MultipartRequest('POST', url);
    if (token != null && token.isNotEmpty) {
      req.headers['Authorization'] = 'Bearer $token';
    }
    req.fields['subfolder'] = subfolder;
    req.files.add(
      http.MultipartFile.fromBytes(
        'file',
        fileBytes,
        filename: fileName,
      ),
    );

    final streamedRes = await req.send();
    final res = await http.Response.fromStream(streamedRes);

    if (res.statusCode >= 200 && res.statusCode < 300) {
      final body = jsonDecode(res.body);
      if (body['file'] is Map) {
        return Map<String, dynamic>.from(body['file']);
      }
    }
    throw Exception('Failed to upload media (${res.statusCode}): ${res.body}');
  }

  // 7. Get Personal Whiteboard
  Future<Map<String, dynamic>> fetchWhiteboard(int communityId) async {
    final url = Uri.parse('$baseUrl/community/$communityId/whiteboard');
    final headers = await _authHeaders(jsonBody: false);
    final res = await _client.get(url, headers: headers);

    if (res.statusCode >= 200 && res.statusCode < 300) {
      final body = jsonDecode(res.body);
      if (body['whiteboard'] is Map) {
        return Map<String, dynamic>.from(body['whiteboard']);
      }
    }
    throw Exception('Failed to fetch whiteboard (${res.statusCode})');
  }

  // 8. Save/Autosave Personal Whiteboard
  Future<void> saveWhiteboard(
    int communityId, {
    required dynamic documentJson,
    String snapshotDriveLink = '',
    String snapshotDriveFileId = '',
  }) async {
    final url = Uri.parse('$baseUrl/community/$communityId/whiteboard');
    final headers = await _authHeaders();
    final res = await _client.put(
      url,
      headers: headers,
      body: jsonEncode({
        'documentJson': documentJson,
        'snapshotDriveLink': snapshotDriveLink,
        'snapshotDriveFileId': snapshotDriveFileId,
      }),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Failed to save whiteboard (${res.statusCode})');
    }
  }

  // 9. Submit Doubt to Teacher Queue
  Future<DoubtItem> submitDoubt({
    required String title,
    required String description,
    required String classLevel,
    required String subject,
    int? communityId,
    List<Map<String, dynamic>> attachments = const [],
  }) async {
    final url = Uri.parse('$baseUrl/doubts');
    final headers = await _authHeaders();
    final payload = jsonEncode({
      'title': title,
      'description': description,
      'classLevel': classLevel,
      'subject': subject,
      'communityId': communityId,
      'attachments': attachments,
    });

    final res = await _client.post(url, headers: headers, body: payload);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      final body = jsonDecode(res.body);
      if (body['doubt'] is Map) {
        return DoubtItem.fromJson(Map<String, dynamic>.from(body['doubt']));
      }
    }
    throw Exception('Failed to submit doubt (${res.statusCode}): ${res.body}');
  }

  // 10. Fetch My Doubts
  Future<List<DoubtItem>> fetchMyDoubts({String? status, String? subject, String? classLevel}) async {
    var uriStr = '$baseUrl/doubts/my?';
    if (status != null && status.isNotEmpty) uriStr += 'status=${Uri.encodeComponent(status)}&';
    if (subject != null && subject.isNotEmpty) uriStr += 'subject=${Uri.encodeComponent(subject)}&';
    if (classLevel != null && classLevel.isNotEmpty) uriStr += 'classLevel=${Uri.encodeComponent(classLevel)}&';

    final url = Uri.parse(uriStr);
    final headers = await _authHeaders(jsonBody: false);
    final res = await _client.get(url, headers: headers);

    if (res.statusCode >= 200 && res.statusCode < 300) {
      final body = jsonDecode(res.body);
      if (body['doubts'] is List) {
        return (body['doubts'] as List)
            .map((e) => DoubtItem.fromJson(Map<String, dynamic>.from(e as Map)))
            .toList();
      }
    }
    throw Exception('Failed to fetch doubts (${res.statusCode})');
  }

  // 11. Fetch Single Doubt Detail
  Future<DoubtItem> fetchDoubtDetail(int doubtId) async {
    final url = Uri.parse('$baseUrl/doubts/$doubtId');
    final headers = await _authHeaders(jsonBody: false);
    final res = await _client.get(url, headers: headers);

    if (res.statusCode >= 200 && res.statusCode < 300) {
      final body = jsonDecode(res.body);
      if (body['doubt'] is Map) {
        return DoubtItem.fromJson(Map<String, dynamic>.from(body['doubt']));
      }
    }
    throw Exception('Failed to fetch doubt detail (${res.statusCode})');
  }

  // 12. Reopen Doubt
  Future<void> reopenDoubt(int doubtId, String clarificationText) async {
    final url = Uri.parse('$baseUrl/doubts/$doubtId/reopen');
    final headers = await _authHeaders();
    final res = await _client.post(
      url,
      headers: headers,
      body: jsonEncode({'clarificationText': clarificationText}),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Failed to reopen doubt (${res.statusCode}): ${res.body}');
    }
  }

  // 13. Confirm Resolution
  Future<void> confirmResolution(int doubtId) async {
    final url = Uri.parse('$baseUrl/doubts/$doubtId/confirm-resolution');
    final headers = await _authHeaders();
    final res = await _client.post(url, headers: headers, body: jsonEncode({}));
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Failed to confirm resolution (${res.statusCode})');
    }
  }
}
