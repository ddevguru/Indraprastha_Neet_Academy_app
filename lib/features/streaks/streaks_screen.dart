import 'package:flutter/material.dart';
import '../../theme/app_tokens.dart';

class StreaksScreen extends StatefulWidget {
  const StreaksScreen({super.key});

  @override
  State<StreaksScreen> createState() => _StreaksScreenState();
}

class _StreaksScreenState extends State<StreaksScreen> {
  late DateTime currentDate;
  int? expandedMonth;

  @override
  void initState() {
    super.initState();
    currentDate = DateTime.now();
  }

  // Mock data for streaks - replace with API call
  Map<String, dynamic> getStreaksData() {
    return {
      'January 2026': {
        1: 5,
        2: 5,
        3: 0,
        4: 8,
        5: 8,
        6: 8,
        7: 0,
        8: 10,
        9: 10,
        10: 10,
        11: 10,
        12: 0,
        13: 12,
        14: 12,
        15: 12,
        16: 0,
        17: 0,
        18: 3,
        19: 3,
        20: 3,
        21: 3,
        22: 3,
        23: 3,
        24: 3,
        25: 3,
        26: 3,
        27: 0,
        28: 0,
        29: 2,
        30: 2,
        31: 2,
      },
      'February 2026': {
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 2,
        6: 0,
        7: 5,
        8: 5,
        9: 5,
        10: 5,
        11: 5,
        12: 5,
        13: 5,
        14: 0,
        15: 7,
        16: 7,
        17: 7,
        18: 0,
        19: 0,
        20: 4,
        21: 4,
        22: 4,
        23: 0,
        24: 6,
        25: 6,
        26: 6,
        27: 0,
        28: 3,
      },
      'March 2026': {
        1: 0,
        2: 8,
        3: 8,
        4: 8,
        5: 8,
        6: 8,
        7: 0,
        8: 0,
        9: 10,
        10: 10,
      },
    };
  }

  // Mock activity details - replace with API call
  Map<String, dynamic> getActivityDetails(String month, dynamic date) {
    return {
      'date': '$date $month',
      'totalTime': '2h 45m',
      'lastActive': '10:30 PM',
      'activities': [
        {
          'type': 'Practice',
          'count': '15 questions',
          'time': '45m',
          'icon': Icons.assignment_rounded,
        },
        {
          'type': 'Videos',
          'count': '3 videos watched',
          'time': '1h 20m',
          'icon': Icons.play_circle_rounded,
        },
        {
          'type': 'Tests',
          'count': '1 test attempted',
          'time': '40m',
          'icon': Icons.quiz_rounded,
        },
        {
          'type': 'Books',
          'count': '12 pages read',
          'time': 'Chapter 5',
          'icon': Icons.book_rounded,
        },
      ],
      'contentViewed': [
        'Biology - Cell Biology',
        'Chemistry - Organic Reactions',
        'Physics - Thermodynamics',
      ],
    };
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
