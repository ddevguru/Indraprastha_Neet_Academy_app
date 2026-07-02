import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:path_provider/path_provider.dart';

/// Persists admin app errors to a local log file for debugging on device.
class AdminErrorLogger {
  AdminErrorLogger._();
  static final AdminErrorLogger instance = AdminErrorLogger._();

  File? _logFile;

  Future<void> init() async {
    try {
      final dir = await getApplicationDocumentsDirectory();
      _logFile = File('${dir.path}/admin_error.log');
      if (!await _logFile!.exists()) {
        await _logFile!.writeAsString('');
      }
    } catch (e, st) {
      debugPrint('AdminErrorLogger init failed: $e\n$st');
    }
  }

  String get logFilePath => _logFile?.path ?? '';

  Future<void> log(
    String context,
    Object error, {
    StackTrace? stackTrace,
    Map<String, dynamic>? details,
  }) async {
    final ts = DateTime.now().toIso8601String();
    final buffer = StringBuffer()
      ..writeln('[$ts] $context')
      ..writeln('Error: $error');
    if (details != null && details.isNotEmpty) {
      buffer.writeln('Details: $details');
    }
    if (stackTrace != null) {
      buffer.writeln(stackTrace);
    }
    buffer.writeln('---');
    final entry = buffer.toString();
    debugPrint('[AdminError] $entry');
    try {
      await _logFile?.writeAsString(entry, mode: FileMode.append, flush: true);
    } catch (e) {
      debugPrint('Failed to write admin error log: $e');
    }
  }

  Future<String> readAll() async {
    final file = _logFile;
    if (file == null || !await file.exists()) return '';
    return file.readAsString();
  }

  Future<void> clear() async {
    final file = _logFile;
    if (file == null) return;
    await file.writeAsString('');
  }
}
