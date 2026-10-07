import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:http/http.dart' as http;

import '../../../core/constants/api_constants.dart';
import '../../../core/providers/app_state.dart';
import '../../../theme/app_tokens.dart';
import '../../../widgets/app_widgets.dart';

class WeeklyStreakWidget extends ConsumerStatefulWidget {
  const WeeklyStreakWidget({super.key});

  @override
  ConsumerState<WeeklyStreakWidget> createState() => _WeeklyStreakWidgetState();
}

class _WeeklyStreakWidgetState extends ConsumerState<WeeklyStreakWidget> {
  late Future<Map<String, dynamic>> _streakDataFuture;

  @override
  void initState() {
    super.initState();
    _streakDataFuture = _loadWeeklyStreakData();
  }

  Future<Map<String, dynamic>> _loadWeeklyStreakData() async {
    int currentStreak = 0;
    final Map<String, bool> activeDaysMap = {};

    final authRepo = ref.read(authRepositoryProvider);
    final token = authRepo.token ?? '';
    final headers = token.isNotEmpty ? {'Authorization': 'Bearer $token'} : <String, String>{};

    // 1. Fetch current streak summary
    try {
      final res = await http
          .get(Uri.parse('$baseUrl/streaks/current'), headers: headers)
          .timeout(const Duration(seconds: 5));
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        currentStreak = (data['currentStreak'] as num?)?.toInt() ?? 0;
      }
    } catch (_) {}

    // 2. Determine dates for current week (Mon-Sun)
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final currentWeekday = today.weekday; // 1 = Mon, 7 = Sun
    final monday = today.subtract(Duration(days: currentWeekday - 1));

    // Gather required months
    final Set<String> monthKeys = {};
    final List<DateTime> weekDates = [];
    for (int i = 0; i < 7; i++) {
      final d = monday.add(Duration(days: i));
      weekDates.add(d);
      final monthStr = d.month.toString().padLeft(2, '0');
      final yearStr = d.year.toString();
      monthKeys.add('$monthStr-$yearStr');
    }

    // 3. Fetch monthly data for required months
    for (final key in monthKeys) {
      final parts = key.split('-');
      final monthStr = parts[0];
      final yearStr = parts[1];
      try {
        final res = await http
            .get(Uri.parse('$baseUrl/streaks/monthly/$monthStr/$yearStr'), headers: headers)
            .timeout(const Duration(seconds: 5));
        if (res.statusCode == 200) {
          final data = jsonDecode(res.body) as Map<String, dynamic>;
          data.forEach((dayKey, val) {
            final dayNum = int.tryParse(dayKey) ?? 0;
            if (dayNum > 0) {
              int streakVal = 0;
              if (val is Map) {
                streakVal = (val['streak'] as num?)?.toInt() ?? 0;
              } else if (val is int) {
                streakVal = val;
              }
              if (streakVal > 0) {
                final dateStr = '$yearStr-$monthStr-${dayNum.toString().padLeft(2, '0')}';
                activeDaysMap[dateStr] = true;
              }
            }
          });
        }
      } catch (_) {}
    }

    return {
      'currentStreak': currentStreak,
      'weekDates': weekDates,
      'activeDaysMap': activeDaysMap,
      'today': today,
    };
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return FutureBuilder<Map<String, dynamic>>(
      future: _streakDataFuture,
      builder: (context, snapshot) {
        final data = snapshot.data;
        final int currentStreak = data?['currentStreak'] ?? 0;
        final Map<String, bool> activeDaysMap = data?['activeDaysMap'] ?? {};
        final DateTime now = DateTime.now();
        final DateTime today = DateTime(now.year, now.month, now.day);
        final int currentWeekday = today.weekday;
        final DateTime monday = today.subtract(Duration(days: currentWeekday - 1));

        final List<DateTime> weekDates = data?['weekDates'] ??
            List.generate(7, (i) => monday.add(Duration(days: i)));

        const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        int activeThisWeekCount = 0;
        for (final d in weekDates) {
          final key = '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';
          if (activeDaysMap[key] == true) {
            activeThisWeekCount++;
          }
        }

        return Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: () => context.push('/streaks'),
            borderRadius: BorderRadius.circular(AppRadii.xl),
            child: SurfaceCard(
              borderRadius: AppRadii.xl,
              padding: const EdgeInsets.all(AppSpacing.md),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // ── Header Row ──────────────────────────────────────────
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [Color(0xFFFF6B00), Color(0xFFFF9E00)],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(12),
                          boxShadow: [
                            BoxShadow(
                              color: const Color(0xFFFF6B00).withValues(alpha: 0.3),
                              blurRadius: 8,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: const Icon(
                          Icons.local_fire_department_rounded,
                          color: Colors.white,
                          size: 20,
                        ),
                      ),
                      const SizedBox(width: AppSpacing.sm),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Text(
                                  "Weekly Streak",
                                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 16,
                                      ),
                                ),
                                const SizedBox(width: 8),
                                Container(
                                  padding: const EdgeInsets.symmetric(
                                    horizontal: 8,
                                    vertical: 2,
                                  ),
                                  decoration: BoxDecoration(
                                    color: AppColors.primary.withValues(alpha: 0.12),
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  child: Text(
                                    "$currentStreak ${currentStreak == 1 ? 'day' : 'days'} 🔥",
                                    style: const TextStyle(
                                      color: AppColors.primary,
                                      fontWeight: FontWeight.w700,
                                      fontSize: 12,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 2),
                            Text(
                              "$activeThisWeekCount of 7 days active this week",
                              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                    color: isDark ? Colors.white60 : Colors.grey.shade600,
                                    fontSize: 12,
                                  ),
                            ),
                          ],
                        ),
                      ),
                      Icon(
                        Icons.chevron_right_rounded,
                        color: isDark ? Colors.white54 : Colors.grey.shade400,
                        size: 24,
                      ),
                    ],
                  ),

                  const SizedBox(height: AppSpacing.md),

                  // ── 7 Days Pills Row ─────────────────────────────────────
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: List.generate(7, (index) {
                      final date = weekDates[index];
                      final isToday = date.year == today.year &&
                          date.month == today.month &&
                          date.day == today.day;
                      final isFuture = date.isAfter(today);

                      final dateKey =
                          '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
                      final isActive = activeDaysMap[dateKey] == true;

                      // Styles according to state
                      Color bgColor;
                      Color textColor;
                      Color dayNameColor;
                      BoxBorder? border;

                      if (isActive) {
                        bgColor = AppColors.primary;
                        textColor = Colors.white;
                        dayNameColor = Colors.white.withValues(alpha: 0.85);
                      } else if (isToday) {
                        bgColor = isDark
                            ? AppColors.primary.withValues(alpha: 0.15)
                            : AppColors.primarySoft;
                        textColor = AppColors.primary;
                        dayNameColor = AppColors.primary;
                        border = Border.all(color: AppColors.primary, width: 1.5);
                      } else if (isFuture) {
                        bgColor = isDark
                            ? Colors.white.withValues(alpha: 0.04)
                            : Colors.grey.shade100;
                        textColor = isDark ? Colors.white30 : Colors.grey.shade400;
                        dayNameColor = isDark ? Colors.white30 : Colors.grey.shade400;
                      } else {
                        // Past inactive day
                        bgColor = isDark
                            ? Colors.white.withValues(alpha: 0.06)
                            : Colors.grey.shade200;
                        textColor = isDark ? Colors.white54 : Colors.grey.shade600;
                        dayNameColor = isDark ? Colors.white38 : Colors.grey.shade500;
                      }

                      return Expanded(
                        child: Container(
                          margin: const EdgeInsets.symmetric(horizontal: 2.5),
                          padding: const EdgeInsets.symmetric(vertical: 8),
                          decoration: BoxDecoration(
                            color: bgColor,
                            borderRadius: BorderRadius.circular(14),
                            border: border,
                            boxShadow: isActive
                                ? [
                                    BoxShadow(
                                      color: AppColors.primary.withValues(alpha: 0.25),
                                      blurRadius: 6,
                                      offset: const Offset(0, 3),
                                    ),
                                  ]
                                : null,
                          ),
                          child: Column(
                            children: [
                              Text(
                                dayLabels[index],
                                style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: isToday ? FontWeight.bold : FontWeight.w500,
                                  color: dayNameColor,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                '${date.day}',
                                style: TextStyle(
                                  fontSize: 14,
                                  fontWeight:
                                      isActive || isToday ? FontWeight.bold : FontWeight.w600,
                                  color: textColor,
                                ),
                              ),
                              const SizedBox(height: 4),
                              if (isActive)
                                const Icon(
                                  Icons.local_fire_department_rounded,
                                  color: Colors.amberAccent,
                                  size: 14,
                                )
                              else if (isToday)
                                Container(
                                  width: 5,
                                  height: 5,
                                  decoration: const BoxDecoration(
                                    color: AppColors.primary,
                                    shape: BoxShape.circle,
                                  ),
                                )
                              else
                                const SizedBox(height: 5),
                            ],
                          ),
                        ),
                      );
                    }),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
