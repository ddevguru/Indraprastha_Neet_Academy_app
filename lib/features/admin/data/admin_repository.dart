import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;

import '../../../core/constants/api_constants.dart';

class AdminRepository {
  AdminRepository({http.Client? client}) : _client = client ?? http.Client();

  final http.Client _client;
  String? _token;

  bool get isLoggedIn => _token != null;

  Future<void> login({
    required String username,
    required String password,
  }) async {
    final response = await _client.post(
      Uri.parse('$baseUrl/admin/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'username': username, 'password': password}),
    );
    final body = jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception(body['error'] ?? 'Login failed');
    }
    _token = body['token']?.toString();
  }

  Future<Map<String, dynamic>> dashboard() => _get('/admin/dashboard');
  Future<Map<String, dynamic>> batches() => _get('/admin/batches');
  Future<Map<String, dynamic>> filters() => _get('/admin/filters');
  Future<Map<String, dynamic>> books() => _get('/admin/books');
  Future<Map<String, dynamic>> practiceSets() => _get('/admin/practice-sets');
  Future<Map<String, dynamic>> tests() => _get('/admin/tests');
  Future<Map<String, dynamic>> videos() => _get('/admin/videos');

  Future<void> addBook({
    required int batchId,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
  }) async {
    await _post('/admin/books', {
      'batchId': batchId,
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
      'level': 'Core',
      'category': 'NCERT books',
    });
  }

  Future<void> updateBook({
    required int bookId,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
  }) async {
    await _put('/admin/books/$bookId', {
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
    });
  }

  Future<void> deleteBook(int bookId) => _delete('/admin/books/$bookId');

  Future<void> addPractice({
    required int batchId,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
  }) async {
    await _post('/admin/practice-sets', {
      'batchId': batchId,
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
    });
  }

  Future<void> updatePractice({
    required int id,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
  }) async {
    await _put('/admin/practice-sets/$id', {
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
    });
  }

  Future<void> deletePractice(int id) => _delete('/admin/practice-sets/$id');

  Future<void> addTest({
    required int batchId,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
  }) async {
    await _post('/admin/tests', {
      'batchId': batchId,
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
      'category': 'Grand test',
    });
  }

  Future<void> updateTest({
    required int id,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
  }) async {
    await _put('/admin/tests/$id', {
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
    });
  }

  Future<void> deleteTest(int id) => _delete('/admin/tests/$id');

  Future<Map<String, dynamic>> testQuestions(int testId) =>
      _get('/admin/tests/$testId/questions');

  Future<void> addTestQuestion({
    required int testId,
    required String subject,
    required String question,
    required String optionA,
    required String optionB,
    required String optionC,
    required String optionD,
    required String correctOption,
    required String explanation,
  }) async {
    await _post('/admin/tests/$testId/questions', {
      'subject': subject,
      'question': question,
      'optionA': optionA,
      'optionB': optionB,
      'optionC': optionC,
      'optionD': optionD,
      'correctOption': correctOption,
      'explanation': explanation,
    });
  }

  Future<void> uploadVideo({
    required int batchId,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
    required File file,
  }) async {
    if (_token == null) throw Exception('Admin not logged in');
    final req = http.MultipartRequest(
      'POST',
      Uri.parse('$baseUrl/admin/videos/upload'),
    );
    req.headers['Authorization'] = 'Bearer $_token';
    req.fields['batchId'] = '$batchId';
    req.fields['classLabel'] = classLabel;
    req.fields['title'] = title;
    req.fields['subject'] = subject;
    req.fields['topic'] = topic;
    req.fields['chapterHint'] = '';
    req.fields['sectionLabel'] = 'Concept explainers';
    req.fields['durationLabel'] = '15 min';
    req.files.add(await http.MultipartFile.fromPath('video', file.path));
    final streamed = await req.send();
    if (streamed.statusCode < 200 || streamed.statusCode >= 300) {
      throw Exception('Video upload failed');
    }
  }

  Future<void> updateVideo({
    required int id,
    required String classLabel,
    required String title,
    required String subject,
    required String topic,
  }) async {
    await _put('/admin/videos/$id', {
      'classLabel': classLabel,
      'title': title,
      'subject': subject,
      'topic': topic,
    });
  }

  Future<void> deleteVideo(int id) => _delete('/admin/videos/$id');

  Future<void> uploadBookPdf({
    required int bookId,
    required String chapterTitle,
    required File pdfFile,
  }) async {
    if (_token == null) throw Exception('Admin not logged in');
    final req = http.MultipartRequest(
      'POST',
      Uri.parse('$baseUrl/admin/books/$bookId/chapters/upload-pdf'),
    );
    req.headers['Authorization'] = 'Bearer $_token';
    req.fields['title'] = chapterTitle;
    req.files.add(await http.MultipartFile.fromPath('pdf', pdfFile.path));
    final streamed = await req.send();
    if (streamed.statusCode < 200 || streamed.statusCode >= 300) {
      throw Exception('PDF upload failed');
    }
  }

  Future<Map<String, dynamic>> _get(String path) async {
    if (_token == null) throw Exception('Admin not logged in');
    final response = await _client.get(
      Uri.parse('$baseUrl$path'),
      headers: {'Authorization': 'Bearer $_token'},
    );
    final body = jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception(body['error'] ?? 'Request failed');
    }
    return body;
  }

  Future<Map<String, dynamic>> _post(
    String path,
    Map<String, dynamic> payload,
  ) async {
    if (_token == null) throw Exception('Admin not logged in');
    final response = await _client.post(
      Uri.parse('$baseUrl$path'),
      headers: {
        'Authorization': 'Bearer $_token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(payload),
    );
    final body = jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception(body['error'] ?? 'Request failed');
    }
    return body;
  }

  Future<Map<String, dynamic>> _put(
    String path,
    Map<String, dynamic> payload,
  ) async {
    if (_token == null) throw Exception('Admin not logged in');
    final response = await _client.put(
      Uri.parse('$baseUrl$path'),
      headers: {
        'Authorization': 'Bearer $_token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(payload),
    );
    final body = jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception(body['error'] ?? 'Request failed');
    }
    return body;
  }

  Future<void> _delete(String path) async {
    if (_token == null) throw Exception('Admin not logged in');
    final response = await _client.delete(
      Uri.parse('$baseUrl$path'),
      headers: {'Authorization': 'Bearer $_token'},
    );
    final body = jsonDecode(response.body) as Map<String, dynamic>;
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception(body['error'] ?? 'Request failed');
    }
  }
}
