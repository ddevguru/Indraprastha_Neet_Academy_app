import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import '../services/admin_community_service.dart';

class TeacherLiveScreensPage extends StatefulWidget {
  const TeacherLiveScreensPage({super.key});

  @override
  State<TeacherLiveScreensPage> createState() => _TeacherLiveScreensPageState();
}

class _TeacherLiveScreensPageState extends State<TeacherLiveScreensPage> {
  Timer? _pollTimer;
  bool _loading = true;
  bool _autoRefresh = true;
  bool _liveOnlyFilter = false;
  String _error = '';
  List<Map<String, dynamic>> _teachers = [];
  final Map<int, Uint8List> _decodedFrames = {};

  @override
  void initState() {
    super.initState();
    _fetchScreens();
    _startPolling();
  }

  @override
  void dispose() {
    _pollTimer?.cancel();
    super.dispose();
  }

  void _startPolling() {
    _pollTimer?.cancel();
    _pollTimer = Timer.periodic(const Duration(milliseconds: 1800), (_) {
      if (_autoRefresh && mounted) {
        _fetchScreens(silent: true);
      }
    });
  }

  Future<void> _fetchScreens({bool silent = false}) async {
    if (!silent) {
      setState(() {
        _loading = true;
        _error = '';
      });
    }
    try {
      final list = await AdminCommunityService.getTeacherLiveScreens();
      for (final t in list) {
        final id = int.tryParse(t['teacherId']?.toString() ?? '') ?? 0;
        final b64 = t['frameBase64']?.toString() ?? '';
        if (id > 0 && b64.isNotEmpty) {
          try {
            _decodedFrames[id] = base64Decode(b64);
          } catch (_) {}
        }
      }
      if (!mounted) return;
      setState(() {
        _teachers = list;
        _loading = false;
        _error = '';
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        if (!silent) {
          _error = e.toString().replaceFirst('Exception: ', '');
        }
      });
    }
  }

  void _openFullScreenWatch(Map<String, dynamic> teacher) {
    final teacherId = int.tryParse(teacher['teacherId']?.toString() ?? '') ?? 0;
    if (teacherId <= 0) return;
    showDialog(
      context: context,
      barrierColor: Colors.black.withValues(alpha: 0.85),
      builder: (ctx) => _FullScreenTeacherWatchDialog(
        teacherId: teacherId,
        initialData: teacher,
        initialBytes: _decodedFrames[teacherId],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final liveCount = _teachers.where((t) => t['isLive'] == true).length;
    final filtered = _liveOnlyFilter
        ? _teachers.where((t) => t['isLive'] == true).toList()
        : _teachers;

    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header Controls
          Wrap(
            spacing: 12,
            runSpacing: 10,
            crossAxisAlignment: WrapCrossAlignment.center,
            alignment: WrapAlignment.spaceBetween,
            children: [
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: Colors.indigo.withValues(alpha: 0.14),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Icon(
                      Icons.cast_connected_rounded,
                      color: Colors.indigo,
                      size: 24,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Live Teacher Screens',
                        style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
                      ),
                      Text(
                        'Real-time monitoring of all faculty activity ($liveCount live / ${_teachers.length} total)',
                        style: TextStyle(
                          fontSize: 12.5,
                          color: isDark ? Colors.grey.shade400 : Colors.grey.shade700,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  FilterChip(
                    selected: _liveOnlyFilter,
                    label: Text('Live Only ($liveCount)'),
                    onSelected: (v) => setState(() => _liveOnlyFilter = v),
                  ),
                  const SizedBox(width: 8),
                  FilterChip(
                    selected: _autoRefresh,
                    avatar: Icon(
                      _autoRefresh ? Icons.play_circle_filled : Icons.pause_circle_filled,
                      size: 16,
                      color: _autoRefresh ? Colors.green : Colors.grey,
                    ),
                    label: Text(_autoRefresh ? 'Auto-Stream ON' : 'Paused'),
                    onSelected: (v) => setState(() => _autoRefresh = v),
                  ),
                  const SizedBox(width: 8),
                  IconButton.outlined(
                    tooltip: 'Refresh Now',
                    onPressed: () => _fetchScreens(),
                    icon: const Icon(Icons.refresh_rounded),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 16),

          if (_error.isNotEmpty)
            Container(
              padding: const EdgeInsets.all(12),
              margin: const EdgeInsets.only(bottom: 12),
              decoration: BoxDecoration(
                color: Colors.red.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: Colors.red.withValues(alpha: 0.4)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.error_outline, color: Colors.red),
                  const SizedBox(width: 8),
                  Expanded(child: Text(_error, style: const TextStyle(color: Colors.red))),
                ],
              ),
            ),

          Expanded(
            child: _loading && _teachers.isEmpty
                ? const Center(child: CircularProgressIndicator())
                : filtered.isEmpty
                    ? Center(
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(
                              Icons.cast_rounded,
                              size: 56,
                              color: Colors.grey.withValues(alpha: 0.5),
                            ),
                            const SizedBox(height: 12),
                            Text(
                              _liveOnlyFilter
                                  ? 'Koi bhi teacher abhi live nahi hai.'
                                  : 'Koi teacher account nahi mila.',
                              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
                            ),
                          ],
                        ),
                      )
                    : LayoutBuilder(
                        builder: (context, constraints) {
                          final width = constraints.maxWidth;
                          final cols = width >= 1200
                              ? 4
                              : width >= 850
                                  ? 3
                                  : width >= 540
                                      ? 2
                                      : 1;
                          return GridView.builder(
                            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                              crossAxisCount: cols,
                              crossAxisSpacing: 14,
                              mainAxisSpacing: 14,
                              childAspectRatio: 0.62,
                            ),
                            itemCount: filtered.length,
                            itemBuilder: (ctx, i) {
                              final t = filtered[i];
                              final id = int.tryParse(t['teacherId']?.toString() ?? '') ?? 0;
                              final isLive = t['isLive'] == true;
                              final appState = t['appState']?.toString() ?? 'offline';
                              final screenName = t['currentScreen']?.toString() ?? 'Not Started';
                              final activity = t['currentActivity']?.toString() ?? '';
                              final secAgo = int.tryParse(t['secondsAgo']?.toString() ?? '') ?? 0;
                              final frameBytes = _decodedFrames[id];

                              return InkWell(
                                onTap: () => _openFullScreenWatch(t),
                                borderRadius: BorderRadius.circular(14),
                                child: Container(
                                  decoration: BoxDecoration(
                                    color: isDark ? const Color(0xFF171A22) : Colors.white,
                                    borderRadius: BorderRadius.circular(14),
                                    border: Border.all(
                                      color: isLive
                                          ? Colors.green.withValues(alpha: 0.7)
                                          : (isDark ? const Color(0xFF2B3040) : Colors.grey.shade300),
                                      width: isLive ? 1.8 : 1,
                                    ),
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.black.withValues(alpha: isDark ? 0.28 : 0.06),
                                        blurRadius: 10,
                                        offset: const Offset(0, 3),
                                      ),
                                    ],
                                  ),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.stretch,
                                    children: [
                                      // Top Teacher Header
                                      Padding(
                                        padding: const EdgeInsets.fromLTRB(10, 10, 10, 8),
                                        child: Row(
                                          children: [
                                            CircleAvatar(
                                              radius: 16,
                                              backgroundColor: isLive
                                                  ? Colors.green.withValues(alpha: 0.18)
                                                  : Colors.grey.withValues(alpha: 0.18),
                                              child: Text(
                                                (t['displayName']?.toString() ?? 'T')
                                                    .substring(0, 1)
                                                    .toUpperCase(),
                                                style: TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  color: isLive ? Colors.green : Colors.grey,
                                                ),
                                              ),
                                            ),
                                            const SizedBox(width: 8),
                                            Expanded(
                                              child: Column(
                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                children: [
                                                  Text(
                                                    t['displayName']?.toString() ?? 'Teacher',
                                                    maxLines: 1,
                                                    overflow: TextOverflow.ellipsis,
                                                    style: const TextStyle(
                                                      fontWeight: FontWeight.w700,
                                                      fontSize: 13.5,
                                                    ),
                                                  ),
                                                  Text(
                                                    t['teacherCode']?.toString() ?? '',
                                                    style: TextStyle(
                                                      fontSize: 11,
                                                      color: Colors.grey.shade500,
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                            Container(
                                              padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                                              decoration: BoxDecoration(
                                                color: isLive
                                                    ? Colors.green
                                                    : (appState == 'background' ? Colors.amber : Colors.grey.shade600),
                                                borderRadius: BorderRadius.circular(12),
                                              ),
                                              child: Row(
                                                mainAxisSize: MainAxisSize.min,
                                                children: [
                                                  Icon(
                                                    isLive ? Icons.fiber_manual_record : Icons.circle_outlined,
                                                    size: 9,
                                                    color: Colors.white,
                                                  ),
                                                  const SizedBox(width: 3),
                                                  Text(
                                                    isLive ? 'LIVE' : (appState == 'background' ? 'BG' : 'OFF'),
                                                    style: const TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 10,
                                                      fontWeight: FontWeight.w800,
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),

                                      // Live Screen Frame Preview
                                      Expanded(
                                        child: Container(
                                          margin: const EdgeInsets.symmetric(horizontal: 10),
                                          decoration: BoxDecoration(
                                            color: const Color(0xFF0E1016),
                                            borderRadius: BorderRadius.circular(10),
                                            border: Border.all(
                                              color: Colors.grey.withValues(alpha: 0.25),
                                            ),
                                          ),
                                          clipBehavior: Clip.antiAlias,
                                          child: frameBytes != null
                                              ? Stack(
                                                  fit: StackFit.expand,
                                                  children: [
                                                    Image.memory(
                                                      frameBytes,
                                                      fit: BoxFit.contain,
                                                      gaplessPlayback: true,
                                                    ),
                                                    Positioned(
                                                      right: 6,
                                                      bottom: 6,
                                                      child: Container(
                                                        padding: const EdgeInsets.symmetric(
                                                          horizontal: 6,
                                                          vertical: 3,
                                                        ),
                                                        decoration: BoxDecoration(
                                                          color: Colors.black.withValues(alpha: 0.72),
                                                          borderRadius: BorderRadius.circular(8),
                                                        ),
                                                        child: const Row(
                                                          mainAxisSize: MainAxisSize.min,
                                                          children: [
                                                            Icon(Icons.fullscreen, size: 13, color: Colors.white),
                                                            SizedBox(width: 3),
                                                            Text(
                                                              'Watch',
                                                              style: TextStyle(
                                                                color: Colors.white,
                                                                fontSize: 10,
                                                                fontWeight: FontWeight.w600,
                                                              ),
                                                            ),
                                                          ],
                                                        ),
                                                      ),
                                                    ),
                                                  ],
                                                )
                                              : Center(
                                                  child: Padding(
                                                    padding: const EdgeInsets.all(12),
                                                    child: Column(
                                                      mainAxisSize: MainAxisSize.min,
                                                      children: [
                                                        Icon(
                                                          Icons.phonelink_off_rounded,
                                                          size: 36,
                                                          color: Colors.grey.shade600,
                                                        ),
                                                        const SizedBox(height: 8),
                                                        Text(
                                                          'Waiting for Teacher App...',
                                                          textAlign: TextAlign.center,
                                                          style: TextStyle(
                                                            color: Colors.grey.shade500,
                                                            fontSize: 11.5,
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ),
                                        ),
                                      ),

                                      // Bottom Activity Info
                                      Padding(
                                        padding: const EdgeInsets.all(10),
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Row(
                                              children: [
                                                const Icon(Icons.layers_outlined, size: 13, color: Colors.indigo),
                                                const SizedBox(width: 4),
                                                Expanded(
                                                  child: Text(
                                                    screenName,
                                                    maxLines: 1,
                                                    overflow: TextOverflow.ellipsis,
                                                    style: const TextStyle(
                                                      fontSize: 12,
                                                      fontWeight: FontWeight.w700,
                                                    ),
                                                  ),
                                                ),
                                              ],
                                            ),
                                            if (activity.isNotEmpty) ...[
                                              const SizedBox(height: 2),
                                              Text(
                                                activity,
                                                maxLines: 1,
                                                overflow: TextOverflow.ellipsis,
                                                style: TextStyle(
                                                  fontSize: 11,
                                                  color: Colors.grey.shade500,
                                                ),
                                              ),
                                            ],
                                            const SizedBox(height: 4),
                                            Text(
                                              t['updatedAt'] == null
                                                  ? 'Never connected'
                                                  : (secAgo <= 3 ? 'Just now' : '${secAgo}s ago'),
                                              style: TextStyle(
                                                fontSize: 10.5,
                                                fontWeight: FontWeight.w600,
                                                color: isLive ? Colors.green : Colors.grey.shade500,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            },
                          );
                        },
                      ),
          ),
        ],
      ),
    );
  }
}

class _FullScreenTeacherWatchDialog extends StatefulWidget {
  const _FullScreenTeacherWatchDialog({
    required this.teacherId,
    required this.initialData,
    this.initialBytes,
  });

  final int teacherId;
  final Map<String, dynamic> initialData;
  final Uint8List? initialBytes;

  @override
  State<_FullScreenTeacherWatchDialog> createState() =>
      _FullScreenTeacherWatchDialogState();
}

class _FullScreenTeacherWatchDialogState
    extends State<_FullScreenTeacherWatchDialog> {
  Timer? _timer;
  late Map<String, dynamic> _data;
  Uint8List? _bytes;

  @override
  void initState() {
    super.initState();
    _data = widget.initialData;
    _bytes = widget.initialBytes;
    _timer = Timer.periodic(const Duration(milliseconds: 1200), (_) => _poll());
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  Future<void> _poll() async {
    try {
      final res = await AdminCommunityService.getTeacherLiveScreen(widget.teacherId);
      if (res == null || !mounted) return;
      final b64 = res['frameBase64']?.toString() ?? '';
      Uint8List? nextBytes;
      if (b64.isNotEmpty) {
        try {
          nextBytes = base64Decode(b64);
        } catch (_) {}
      }
      setState(() {
        _data = res;
        if (nextBytes != null) _bytes = nextBytes;
      });
    } catch (_) {}
  }

  @override
  Widget build(BuildContext context) {
    final isLive = _data['isLive'] == true;
    final name = _data['displayName']?.toString() ?? 'Teacher';
    final screen = _data['currentScreen']?.toString() ?? '';
    final activity = _data['currentActivity']?.toString() ?? '';
    final secAgo = int.tryParse(_data['secondsAgo']?.toString() ?? '') ?? 0;

    return Dialog(
      backgroundColor: Colors.transparent,
      insetPadding: const EdgeInsets.all(16),
      child: Container(
        constraints: const BoxConstraints(maxWidth: 620, maxHeight: 860),
        decoration: BoxDecoration(
          color: const Color(0xFF0E1016),
          borderRadius: BorderRadius.circular(18),
          border: Border.all(
            color: isLive ? Colors.green.withValues(alpha: 0.7) : Colors.grey.shade800,
            width: 1.5,
          ),
        ),
        child: Column(
          children: [
            // Header
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: const BoxDecoration(
                color: Color(0xFF171A22),
                borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
              ),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: isLive ? Colors.green : Colors.grey.shade700,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      isLive ? '● LIVE' : 'OFFLINE',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '$name • $screen',
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w700,
                            fontSize: 15,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        Text(
                          activity.isNotEmpty
                              ? '$activity (${secAgo}s ago)'
                              : 'Updated ${secAgo}s ago',
                          style: TextStyle(color: Colors.grey.shade400, fontSize: 12),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    onPressed: () => Navigator.of(context).pop(),
                    icon: const Icon(Icons.close_rounded, color: Colors.white70),
                  ),
                ],
              ),
            ),

            // Live Screen Canvas
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: _bytes != null
                    ? Center(
                        child: InteractiveViewer(
                          minScale: 1.0,
                          maxScale: 4.0,
                          child: Image.memory(
                            _bytes!,
                            fit: BoxFit.contain,
                            gaplessPlayback: true,
                          ),
                        ),
                      )
                    : const Center(
                        child: Text(
                          'No live screen frame available yet.',
                          style: TextStyle(color: Colors.white60),
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

