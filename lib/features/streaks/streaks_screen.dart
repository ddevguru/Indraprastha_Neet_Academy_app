import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../../theme/app_tokens.dart';

class StreaksScreen extends StatefulWidget {
  const StreaksScreen({super.key});

  @override
  State<StreaksScreen> createState() => _StreaksScreenState();
}

class _StreaksScreenState extends State<StreaksScreen> {
  late DateTime currentDate;
  int? expandedMonth;
  late Future<Map<String, dynamic>> _currentStreakFuture;
  late Future<List<Map<String, dynamic>>> _monthsFuture;

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
      final response = await http.get(
        Uri.parse('${_getApiBaseUrl()}/api/streaks/current'),
        headers: {'Authorization': 'Bearer ${await _getAuthToken()}'},
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      return {};
    } catch (e) {
      print('Error fetching current streak: $e');
      return {};
    }
  }

  // Fetch all months with streaks
  Future<List<Map<String, dynamic>>> _fetchMonths() async {
    try {
      final response = await http.get(
        Uri.parse('${_getApiBaseUrl()}/api/streaks/months'),
        headers: {'Authorization': 'Bearer ${await _getAuthToken()}'},
      );
      if (response.statusCode == 200) {
        final list = jsonDecode(response.body) as List;
        return list.cast<Map<String, dynamic>>();
      }
      return [];
    } catch (e) {
      print('Error fetching months: $e');
      return [];
    }
  }

  // Fetch monthly streaks
  Future<Map<int, int>> _fetchMonthlyStreaks(String month, String year) async {
    try {
      final response = await http.get(
        Uri.parse('${_getApiBaseUrl()}/api/streaks/monthly/$month/$year'),
        headers: {'Authorization': 'Bearer ${await _getAuthToken()}'},
      );
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body) as Map<String, dynamic>;
        final result = <int, int>{};
        data.forEach((key, value) {
          final date = int.tryParse(key) ?? 0;
          final streak = (value['streak'] as num?)?.toInt() ?? 0;
          result[date] = streak;
        });
        return result;
      }
      return {};
    } catch (e) {
      print('Error fetching monthly streaks: $e');
      return {};
    }
  }

  // Fetch activity details for a specific day
  Future<Map<String, dynamic>> _fetchActivityDetails(String date) async {
    try {
      final response = await http.get(
        Uri.parse('${_getApiBaseUrl()}/api/streaks/day/$date'),
        headers: {'Authorization': 'Bearer ${await _getAuthToken()}'},
      );
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body) as Map<String, dynamic>;
        return {
          'date': data['date'] ?? date,
          'totalTime': _formatMinutes(data['totalTime'] ?? 0),
          'lastActive': data['lastActive'] ?? 'N/A',
          'activities': _formatActivities(data['activities'] ?? []),
          'contentViewed': _formatContent(data['contentViewed'] ?? []),
        };
      }
      return _getEmptyActivityDetails(date);
    } catch (e) {
      print('Error fetching activity details: $e');
      return _getEmptyActivityDetails(date);
    }
  }

  String _formatMinutes(dynamic minutes) {
    if (minutes == 0) return '0m';
    final m = (minutes is int) ? minutes : (minutes as num).toInt();
    final hours = m ~/ 60;
    final mins = m % 60;
    if (hours > 0) {
      return '${hours}h ${mins}m';
    }
    return '${mins}m';
  }

  List<Map<String, dynamic>> _formatActivities(List activities) {
    return activities.map((act) {
      final typeMap = {
        'practice': Icons.assignment_rounded,
        'test': Icons.quiz_rounded,
        'video': Icons.play_circle_rounded,
        'book': Icons.book_rounded,
      };
      return {
        'type': act['type'] ?? 'Activity',
        'count': '${act['count'] ?? 0} ${_getActivityLabel(act['type'])}',
        'time': _formatMinutes(act['duration'] ?? 0),
        'icon': typeMap[act['type']] ?? Icons.assignment_rounded,
      };
    }).toList();
  }

  List<String> _formatContent(List content) {
    return content.map((c) => c['name'] ?? '').where((s) => s.isNotEmpty).toList();
  }

  String _getActivityLabel(String? type) {
    switch (type) {
      case 'practice':
        return 'questions';
      case 'test':
        return 'attempted';
      case 'video':
        return 'videos';
      case 'book':
        return 'pages';
      default:
        return 'items';
    }
  }

  Map<String, dynamic> _getEmptyActivityDetails(String date) {
    return {
      'date': date,
      'totalTime': '0m',
      'lastActive': 'N/A',
      'activities': [],
      'contentViewed': [],
    };
  }

  String _getApiBaseUrl() {
    // Replace with your backend URL
    return 'http://localhost:3000';
  }

  Future<String> _getAuthToken() async {
    // Get token from SharedPreferences or your auth provider
    return 'your_auth_token';
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
    final streaksData = getStreaksData();
    final months = streaksData.keys.toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Your Streaks'),
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Streak Stats Card
            Container(
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
                      const Text(
                        '3 days',
                        style: TextStyle(
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
                        children: const [
                          Text(
                            '27',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 18,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          Text(
                            'Total Days',
                            style: TextStyle(
                              color: Colors.white70,
                              fontSize: 11,
                            ),
                          ),
                        ],
                      ),
                      Column(
                        children: const [
                          Text(
                            '156h',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 18,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          Text(
                            'Total Time',
                            style: TextStyle(
                              color: Colors.white70,
                              fontSize: 11,
                            ),
                          ),
                        ],
                      ),
                      Column(
                        children: const [
                          Text(
                            '234',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 18,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          Text(
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
            ),

            const SizedBox(height: 32),

            // Monthly Streaks
            Text(
              'Monthly Breakdown',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 16),

            ...List.generate(months.length, (monthIndex) {
              final month = months[monthIndex];
              final dates = streaksData[month] as Map<String, dynamic>;
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
                          expandedMonth = isExpanded ? null : monthIndex;
                        });
                      },
                      title: Text(
                        month,
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
                  if (isExpanded) ...[
                    const SizedBox(height: 12),
                    GridView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 7,
                        childAspectRatio: 1.2,
                        mainAxisSpacing: 8,
                        crossAxisSpacing: 8,
                      ),
                      itemCount: dates.length,
                      itemBuilder: (context, index) {
                        final date = dates.keys.toList()[index] as int;
                        final streak = dates[date] as int;

                        return GestureDetector(
                          onTap: () {
                            _showActivityDetails(context, month, date, streak);
                          },
                          child: Container(
                            decoration: BoxDecoration(
                              color: _getStreakColor(streak),
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(
                                color: streak > 0
                                    ? AppColors.primary
                                    : Colors.grey.shade300,
                                width: 0.5,
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
                                          fontWeight: FontWeight.w600,
                                          fontSize: 12,
                                          color: streak > 0
                                              ? Colors.black87
                                              : Colors.grey.shade600,
                                        ),
                                      ),
                                      if (streak > 0)
                                        Text(
                                          '$streak',
                                          style: const TextStyle(
                                            fontWeight: FontWeight.w700,
                                            fontSize: 11,
                                            color: Colors.black54,
                                          ),
                                        ),
                                    ],
                                  ),
                                ),
                                if (streak > 0)
                                  Positioned(
                                    top: 2,
                                    right: 2,
                                    child: Icon(
                                      Icons.local_fire_department_rounded,
                                      size: 12,
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
                    ),
                  ],

                  const SizedBox(height: 16),
                ],
              );
            }),
          ],
        ),
      ),
    );
  }

  void _showActivityDetails(
    BuildContext context,
    String month,
    int date,
    int streak,
  ) {
    final activity = getActivityDetails(month, date);

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) {
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
                              'Day ${activity['date']}',
                              style: Theme.of(context).textTheme.headlineSmall,
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
                            activity['totalTime'],
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
                            activity['lastActive'],
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
                    'Today\'s Activities',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 12),

                  ...List.generate(
                    (activity['activities'] as List).length,
                    (index) {
                      final act = (activity['activities'] as List)[index];
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: Colors.grey.shade50,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: Colors.grey.shade200),
                          ),
                          child: Row(
                            children: [
                              Icon(
                                act['icon'] as IconData,
                                color: AppColors.primary,
                                size: 20,
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      act['type'] as String,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.w600,
                                        fontSize: 13,
                                      ),
                                    ),
                                    Text(
                                      act['count'] as String,
                                      style: const TextStyle(
                                        fontSize: 12,
                                        color: AppColors.textSecondary,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Text(
                                act['time'] as String,
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
                    },
                  ),

                  const SizedBox(height: 20),
                  const Divider(),
                  const SizedBox(height: 16),

                  // Content Viewed
                  Text(
                    'Content Viewed',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 12),

                  ...List.generate(
                    (activity['contentViewed'] as List).length,
                    (index) {
                      final content = activity['contentViewed'][index] as String;
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
                                content,
                                style: const TextStyle(
                                  fontSize: 13,
                                  color: AppColors.textPrimary,
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),

                  const SizedBox(height: 24),
                ],
              ),
            );
          },
        );
      },
    );
  }
}
