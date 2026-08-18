import 'package:flutter/material.dart';
import 'dart:convert';
import 'dart:math';
import 'package:http/http.dart' as http;
import '../../theme/app_tokens.dart';
import '../../core/providers/app_state.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class StreaksScreen extends ConsumerStatefulWidget {
  const StreaksScreen({super.key});

  @override
  ConsumerState<StreaksScreen> createState() => _StreaksScreenState();
}

class _StreaksScreenState extends ConsumerState<StreaksScreen> {
  late DateTime currentDate;
  int? expandedMonth;
  late Future<Map<String, dynamic>> _currentStreakFuture;
  late Future<List<Map<String, dynamic>>> _monthsFuture;
  final Map<String, Future<Map<int, dynamic>>> _monthStreaksCache = {};
  String _debugLog = 'Loading...';
  bool _showDebug = true;

  @override
  void initState() {
    super.initState();
    currentDate = DateTime.now();
    _currentStreakFuture = _fetchCurrentStreak();
    _monthsFuture = _fetchMonths();
  }

  // Fetch current streak from API
  Future<Map<String, dynamic>> _fetchCurrentStreak() async {
    try {
      final token = await _getAuthToken();
      final response = await http.get(
        Uri.parse('${_getApiBaseUrl()}/api/streaks/current'),
        headers: {'Authorization': 'Bearer $token'},
      ).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      // Return mock data as fallback
      return {
        'currentStreak': 3,
        'totalActiveDays': 27,
        'totalQuestions': 234,
        'totalTimeMinutes': 9360,
        'lastActive': DateTime.now().toString(),
      };
    } catch (e) {
      // Return mock data on error
      return {
        'currentStreak': 3,
        'totalActiveDays': 27,
        'totalQuestions': 234,
        'totalTimeMinutes': 9360,
      };
    }
  }

  // Fetch all months with streaks
  Future<List<Map<String, dynamic>>> _fetchMonths() async {
    try {
      final token = await _getAuthToken();
      final url = '${_getApiBaseUrl()}/api/streaks/months';
      _addLog('📍 Fetching months from: $url');

      final response = await http.get(
        Uri.parse(url),
        headers: token.isNotEmpty ? {'Authorization': 'Bearer $token'} : {},
      ).timeout(const Duration(seconds: 10));

      _addLog('✅ Months Response: ${response.statusCode}');
      _addLog('📋 Response: ${response.body.substring(0, min(200, response.body.length))}');

      if (response.statusCode == 200) {
        final list = jsonDecode(response.body) as List;
        _addLog('📊 Parsed ${list.length} months');
        return list.cast<Map<String, dynamic>>();
      }
      _addLog('❌ Months API failed: ${response.statusCode}');

      // Return all 12 months as fallback
      return _getAllMonths();
    } catch (e) {
      _addLog('🔥 Error fetching months: $e');
      return _getAllMonths();
    }
  }

  List<Map<String, dynamic>> _getAllMonths() {
    return [
      {'month': 'January 2026', 'month_num': '01', 'year': '2026'},
      {'month': 'February 2026', 'month_num': '02', 'year': '2026'},
      {'month': 'March 2026', 'month_num': '03', 'year': '2026'},
      {'month': 'April 2026', 'month_num': '04', 'year': '2026'},
      {'month': 'May 2026', 'month_num': '05', 'year': '2026'},
      {'month': 'June 2026', 'month_num': '06', 'year': '2026'},
      {'month': 'July 2026', 'month_num': '07', 'year': '2026'},
      {'month': 'August 2026', 'month_num': '08', 'year': '2026'},
      {'month': 'September 2026', 'month_num': '09', 'year': '2026'},
      {'month': 'October 2026', 'month_num': '10', 'year': '2026'},
      {'month': 'November 2026', 'month_num': '11', 'year': '2026'},
      {'month': 'December 2026', 'month_num': '12', 'year': '2026'},
    ];
  }

  // Fetch monthly streaks
  Future<Map<int, dynamic>> _fetchMonthlyStreaks(String month, String year) async {
    try {
      final token = await _getAuthToken();
      final url = '${_getApiBaseUrl()}/api/streaks/monthly/$month/$year';
      _addLog('📍 Fetching monthly streaks: $url');

      final response = await http.get(
        Uri.parse(url),
        headers: token.isNotEmpty ? {'Authorization': 'Bearer $token'} : {},
      ).timeout(const Duration(seconds: 8));

      _addLog('✅ Monthly streaks response: ${response.statusCode}');
      _addLog('📋 Response: ${response.body.substring(0, min(200, response.body.length))}');

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body) as Map<String, dynamic>;
        final result = <int, dynamic>{};

        // Parse response - handle both formats
        data.forEach((key, value) {
          final date = int.tryParse(key) ?? 0;
          if (date > 0 && date <= 31) {
            if (value is Map) {
              result[date] = value;
            } else if (value is int) {
              result[date] = {'streak': value};
            } else {
              result[date] = {'streak': 0};
            }
          }
        });

        _addLog('📊 Parsed ${result.length} dates for $month/$year');
        return result;
      } else {
        _addLog('❌ Monthly API Error: ${response.statusCode} - ${response.body}');
        throw Exception('API Error: ${response.statusCode}');
      }
    } catch (e) {
      _addLog('🔥 Error fetching monthly streaks: $e');
      rethrow;
    }
  }

  // Fetch activity details for a specific day
  Future<Map<String, dynamic>> _fetchActivityDetails(String date) async {
    try {
      final token = await _getAuthToken();
      final response = await http.get(
        Uri.parse('${_getApiBaseUrl()}/api/streaks/day/$date'),
        headers: {'Authorization': 'Bearer $token'},
      ).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      return {};
    } catch (e) {
      return {};
    }
  }

  String _formatMinutes(dynamic minutes) {
    if (minutes == null || minutes == 0) return '0m';
    final m = (minutes is int) ? minutes : (minutes as num).toInt();
    final hours = m ~/ 60;
    final mins = m % 60;
    if (hours > 0) {
      return '${hours}h ${mins}m';
    }
    return '${mins}m';
  }

  String _getApiBaseUrl() {
    return 'https://api.indraprasthaneetacademy.com';
  }

  Future<String> _getAuthToken() async {
    // TODO: Get actual token from SharedPreferences or auth provider
    // For now, return empty string and let API handle it
    return '';
  }

  void _addLog(String message) {
    print(message);
    setState(() {
      _debugLog += '\n$message';
    });
  }

  Color _getStreakColor(int streak) {
    if (streak == 0) return Colors.grey.shade300;
    if (streak <= 3) return AppColors.warning.withValues(alpha: 0.3);
    if (streak <= 7) return AppColors.primary.withValues(alpha: 0.5);
    if (streak <= 10) return AppColors.primary.withValues(alpha: 0.8);
    return AppColors.success.withValues(alpha: 0.8);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Your Streaks'),
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(_showDebug ? Icons.bug_report : Icons.bug_report_outlined),
            onPressed: () {
              setState(() {
                _showDebug = !_showDebug;
              });
            },
          ),
        ],
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
            // Current Streak Card
            FutureBuilder<Map<String, dynamic>>(
              future: _currentStreakFuture,
              builder: (context, snapshot) {
                final data = snapshot.data ?? {};
                return Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    gradient: AppGradients.primary,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Current Streak',
                        style: TextStyle(
                          color: Colors.white70,
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          const Icon(
                            Icons.local_fire_department_rounded,
                            color: Colors.orange,
                            size: 32,
                          ),
                          const SizedBox(width: 12),
                          Text(
                            '${data['currentStreak'] ?? 0} days',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 32,
                              fontWeight: FontWeight.w800,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Column(
                            children: [
                              Text(
                                '${data['totalActiveDays'] ?? 0}',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 18,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                              const Text(
                                'Total Days',
                                style: TextStyle(
                                  color: Colors.white70,
                                  fontSize: 11,
                                ),
                              ),
                            ],
                          ),
                          Column(
                            children: [
                              Text(
                                _formatMinutes(data['totalTimeMinutes'] ?? 0),
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 18,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                              const Text(
                                'Total Time',
                                style: TextStyle(
                                  color: Colors.white70,
                                  fontSize: 11,
                                ),
                              ),
                            ],
                          ),
                          Column(
                            children: [
                              Text(
                                '${data['totalQuestions'] ?? 0}',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 18,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                              const Text(
                                'Questions',
                                style: TextStyle(
                                  color: Colors.white70,
                                  fontSize: 11,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              },
            ),

            const SizedBox(height: 32),

            // Monthly Streaks
            Text(
              'Monthly Breakdown',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 16),

            FutureBuilder<List<Map<String, dynamic>>>(
              future: _monthsFuture,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }

                final months = snapshot.data ?? [];

                return Column(
                  children: List.generate(months.length, (monthIndex) {
                    final month = months[monthIndex];
                    final monthStr =
                        '${month['month_num']?.toString().padLeft(2, '0')}';
                    final yearStr = month['year']?.toString() ?? '';
                    final isExpanded = expandedMonth == monthIndex;

                    return Column(
                      children: [
                        // Month Header
                        Container(
                          decoration: BoxDecoration(
                            color: Colors.grey.shade100,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: ListTile(
                            onTap: () {
                              setState(() {
                                expandedMonth =
                                    isExpanded ? null : monthIndex;
                              });
                            },
                            title: Text(
                              month['month'] ?? '',
                              style: const TextStyle(
                                fontWeight: FontWeight.w600,
                                fontSize: 16,
                              ),
                            ),
                            trailing: Icon(
                              isExpanded
                                  ? Icons.expand_less_rounded
                                  : Icons.expand_more_rounded,
                            ),
                          ),
                        ),

                        // Dates Grid (when expanded)
                        if (isExpanded)
                          Padding(
                            padding: const EdgeInsets.only(top: 12),
                            child: FutureBuilder<Map<int, dynamic>>(
                              future: _monthStreaksCache.putIfAbsent(
                                '$monthStr-$yearStr',
                                () => _fetchMonthlyStreaks(monthStr, yearStr),
                              ),
                              builder: (context, streaksSnapshot) {
                                if (streaksSnapshot.connectionState ==
                                    ConnectionState.waiting) {
                                  return const Padding(
                                    padding: EdgeInsets.all(16),
                                    child: SizedBox(
                                      height: 50,
                                      child: CircularProgressIndicator(
                                        strokeWidth: 2,
                                      ),
                                    ),
                                  );
                                }

                                if (streaksSnapshot.hasError) {
                                  return Padding(
                                    padding: const EdgeInsets.all(16),
                                    child: Column(
                                      children: [
                                        Icon(Icons.error_outline,
                                            color: Colors.red.shade600),
                                        const SizedBox(height: 8),
                                        Text(
                                          'Error: ${streaksSnapshot.error}',
                                          style: TextStyle(
                                            color: Colors.red.shade600,
                                            fontSize: 12,
                                          ),
                                          textAlign: TextAlign.center,
                                        ),
                                      ],
                                    ),
                                  );
                                }

                                var streaks = streaksSnapshot.data ?? {};

                                // Ensure all dates 1-31 exist in streaks map
                                if (streaks.isEmpty) {
                                  streaks = {};
                                  for (int i = 1; i <= 31; i++) {
                                    streaks[i] = {'streak': 0};
                                  }
                                }

                                return GridView.builder(
                                  shrinkWrap: true,
                                  physics:
                                      const NeverScrollableScrollPhysics(),
                                  gridDelegate:
                                      const SliverGridDelegateWithFixedCrossAxisCount(
                                    crossAxisCount: 7,
                                    childAspectRatio: 1.1,
                                    mainAxisSpacing: 6,
                                    crossAxisSpacing: 6,
                                  ),
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 8, vertical: 8),
                                  itemCount: 31,
                                  itemBuilder: (context, index) {
                                    final date = index + 1;
                                    final streakData =
                                        streaks[date] as Map<String, dynamic>?;
                                    final streak =
                                        (streakData?['streak'] as int?) ?? 0;

                                    return GestureDetector(
                                      onTap: streak > 0
                                          ? () {
                                              final dateStr =
                                                  '$yearStr-${monthStr.padLeft(2, '0')}-${date.toString().padLeft(2, '0')}';
                                              _showActivityDetails(
                                                context,
                                                month['month'] ?? '',
                                                date,
                                                streak,
                                                dateStr,
                                              );
                                            }
                                          : null,
                                      child: Container(
                                        decoration: BoxDecoration(
                                          color: _getStreakColor(streak),
                                          borderRadius:
                                              BorderRadius.circular(6),
                                          border: Border.all(
                                            color: streak > 0
                                                ? AppColors.primary
                                                : Colors.grey.shade300,
                                            width: streak > 0 ? 1.5 : 0.5,
                                          ),
                                        ),
                                        child: Stack(
                                          children: [
                                            Center(
                                              child: Column(
                                                mainAxisAlignment:
                                                    MainAxisAlignment.center,
                                                children: [
                                                  Text(
                                                    '$date',
                                                    style: TextStyle(
                                                      fontWeight:
                                                          FontWeight.w600,
                                                      fontSize: 11,
                                                      color: streak > 0
                                                          ? Colors.black87
                                                          : Colors.grey
                                                              .shade500,
                                                    ),
                                                  ),
                                                  if (streak > 0) ...[
                                                    const SizedBox(height: 2),
                                                    Text(
                                                      '$streak',
                                                      style:
                                                          const TextStyle(
                                                        fontWeight:
                                                            FontWeight.w700,
                                                        fontSize: 9,
                                                        color: Colors.black54,
                                                      ),
                                                    ),
                                                  ],
                                                ],
                                              ),
                                            ),
                                            if (streak > 0)
                                              Positioned(
                                                top: 2,
                                                right: 2,
                                                child: Icon(
                                                  Icons
                                                      .local_fire_department_rounded,
                                                  size: 10,
                                                  color: streak > 10
                                                      ? Colors.deepOrange
                                                      : AppColors.primary,
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

                        const SizedBox(height: 16),
                      ],
                    );
                  }),
                );
              },
            ),
            ],
            ),
          ),
          // Debug Panel
          if (_showDebug)
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: Container(
                color: Colors.black87,
                padding: const EdgeInsets.all(12),
                constraints: const BoxConstraints(maxHeight: 200),
                child: SingleChildScrollView(
                  child: Text(
                    _debugLog,
                    style: const TextStyle(
                      color: Colors.greenAccent,
                      fontSize: 10,
                      fontFamily: 'Courier',
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }

  void _showActivityDetails(
    BuildContext context,
    String month,
    int date,
    int streak,
    String dateStr,
  ) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) {
        return FutureBuilder<Map<String, dynamic>>(
          future: _fetchActivityDetails(dateStr),
          builder: (context, snapshot) {
            final activity = snapshot.data ?? {};

            return DraggableScrollableSheet(
              expand: false,
              builder: (context, scrollController) {
                return Container(
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(20),
                      topRight: Radius.circular(20),
                    ),
                  ),
                  child: ListView(
                    controller: scrollController,
                    padding: const EdgeInsets.all(20),
                    children: [
                      // Header
                      Center(
                        child: Column(
                          children: [
                            Container(
                              width: 40,
                              height: 4,
                              decoration: BoxDecoration(
                                color: Colors.grey.shade300,
                                borderRadius: BorderRadius.circular(2),
                              ),
                            ),
                            const SizedBox(height: 20),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Icon(
                                  Icons.local_fire_department_rounded,
                                  color: Colors.orange,
                                  size: 24,
                                ),
                                const SizedBox(width: 8),
                                Text(
                                  'Day $date $month',
                                  style: Theme.of(context)
                                      .textTheme
                                      .headlineSmall,
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 24),

                      // Stats
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Column(
                            children: [
                              Text(
                                _formatMinutes(
                                    activity['totalTime'] ?? 0),
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w700,
                                  color: AppColors.primary,
                                ),
                              ),
                              const Text(
                                'Time Spent',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: AppColors.textSecondary,
                                ),
                              ),
                            ],
                          ),
                          Column(
                            children: [
                              Text(
                                '$streak',
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w700,
                                  color: Colors.orange,
                                ),
                              ),
                              const Text(
                                'Streak Days',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: AppColors.textSecondary,
                                ),
                              ),
                            ],
                          ),
                          Column(
                            children: [
                              Text(
                                activity['lastActive'] ?? 'N/A',
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w700,
                                  color: AppColors.success,
                                ),
                              ),
                              const Text(
                                'Last Active',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: AppColors.textSecondary,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),

                      const SizedBox(height: 24),
                      const Divider(),
                      const SizedBox(height: 16),

                      // Activities
                      Text(
                        'Activities',
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const SizedBox(height: 12),

                      ...(activity['activities'] as List?)?.map((act) {
                            return Padding(
                              padding: const EdgeInsets.only(bottom: 12),
                              child: Container(
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: Colors.grey.shade50,
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(
                                      color: Colors.grey.shade200),
                                ),
                                child: Row(
                                  children: [
                                    const Icon(
                                      Icons.assignment_rounded,
                                      color: AppColors.primary,
                                      size: 20,
                                    ),
                                    const SizedBox(width: 12),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            act['type'] ?? 'Activity',
                                            style: const TextStyle(
                                              fontWeight: FontWeight.w600,
                                              fontSize: 13,
                                            ),
                                          ),
                                          Text(
                                            act['count'] ?? '',
                                            style: const TextStyle(
                                              fontSize: 12,
                                              color: AppColors
                                                  .textSecondary,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    Text(
                                      _formatMinutes(
                                          act['duration'] ?? 0),
                                      style: const TextStyle(
                                        fontSize: 12,
                                        fontWeight: FontWeight.w600,
                                        color: AppColors.primary,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            );
                          }).toList() ??
                          [],

                      const SizedBox(height: 20),
                      const Divider(),
                      const SizedBox(height: 16),

                      // Content Viewed
                      Text(
                        'Content Viewed',
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const SizedBox(height: 12),

                      ...(activity['contentViewed'] as List?)?.map((c) {
                            return Padding(
                              padding: const EdgeInsets.only(bottom: 10),
                              child: Row(
                                children: [
                                  const Icon(
                                    Icons.check_circle_rounded,
                                    color: AppColors.success,
                                    size: 20,
                                  ),
                                  const SizedBox(width: 12),
                                  Expanded(
                                    child: Text(
                                      c is Map ? c['name'] ?? '' : c.toString(),
                                      style: const TextStyle(
                                        fontSize: 13,
                                        color: AppColors.textPrimary,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            );
                          }).toList() ??
                          [],

                      const SizedBox(height: 24),
                    ],
                  ),
                );
              },
            );
          },
        );
      },
    );
  }
}
