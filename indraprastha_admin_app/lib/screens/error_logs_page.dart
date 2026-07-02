import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../services/admin_error_logger.dart';

class ErrorLogsPage extends StatefulWidget {
  const ErrorLogsPage({super.key});

  @override
  State<ErrorLogsPage> createState() => _ErrorLogsPageState();
}

class _ErrorLogsPageState extends State<ErrorLogsPage> {
  String _logs = '';
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() => _loading = true);
    final text = await AdminErrorLogger.instance.readAll();
    if (!mounted) return;
    setState(() {
      _logs = text;
      _loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final path = AdminErrorLogger.instance.logFilePath;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Error logs'),
        actions: [
          IconButton(
            tooltip: 'Copy all',
            onPressed: _logs.isEmpty
                ? null
                : () async {
                    await Clipboard.setData(ClipboardData(text: _logs));
                    if (!context.mounted) return;
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Logs copied to clipboard')),
                    );
                  },
            icon: const Icon(Icons.copy_rounded),
          ),
          IconButton(
            tooltip: 'Clear logs',
            onPressed: _logs.isEmpty
                ? null
                : () async {
                    await AdminErrorLogger.instance.clear();
                    await _load();
                  },
            icon: const Icon(Icons.delete_outline_rounded),
          ),
          IconButton(
            tooltip: 'Refresh',
            onPressed: _load,
            icon: const Icon(Icons.refresh_rounded),
          ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (path.isNotEmpty)
                    Text(
                      'Log file: $path',
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  const SizedBox(height: 12),
                  Expanded(
                    child: _logs.isEmpty
                        ? const Center(
                            child: Text('No errors logged yet.'),
                          )
                        : Container(
                            width: double.infinity,
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: Theme.of(context).colorScheme.surfaceContainerHighest,
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                color: Theme.of(context).colorScheme.outlineVariant,
                              ),
                            ),
                            child: SingleChildScrollView(
                              child: SelectableText(
                                _logs,
                                style: const TextStyle(
                                  fontFamily: 'monospace',
                                  fontSize: 12,
                                  height: 1.4,
                                ),
                              ),
                            ),
                          ),
                  ),
                ],
              ),
            ),
    );
  }
}
