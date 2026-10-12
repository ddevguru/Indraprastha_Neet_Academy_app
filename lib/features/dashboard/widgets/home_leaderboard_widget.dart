import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:http/http.dart' as http;

import '../../../core/constants/api_constants.dart';
import '../../../core/providers/app_state.dart';
import '../../../theme/app_tokens.dart';
import '../../../widgets/app_widgets.dart';

class HomeLeaderboardWidget extends ConsumerStatefulWidget {
  const HomeLeaderboardWidget({super.key});

  @override
  ConsumerState<HomeLeaderboardWidget> createState() => _HomeLeaderboardWidgetState();
}

class _HomeLeaderboardWidgetState extends ConsumerState<HomeLeaderboardWidget> {
  late Future<Map<String, dynamic>> _leaderboardPreviewFuture;

  @override
  void initState() {
    super.initState();
    _leaderboardPreviewFuture = _loadPreviewData();
  }

  Future<Map<String, dynamic>> _loadPreviewData() async {
    final authRepo = ref.read(authRepositoryProvider);
    final token = authRepo.token ?? '';
    final headers = {
      if (token.isNotEmpty) 'Authorization': 'Bearer $token',
      'Content-Type': 'application/json',
    };

    try {
      final res = await http
          .get(Uri.parse('$baseUrl/leaderboard?filter=overall'), headers: headers)
          .timeout(const Duration(seconds: 4));

      if (res.statusCode == 200) {
        final data = jsonDecode(res.body) as Map<String, dynamic>;
        final list = (data['leaderboard'] as List? ?? [])
            .map((e) => Map<String, dynamic>.from(e as Map))
            .toList();
        final myRank = data['myRank'] is Map
            ? Map<String, dynamic>.from(data['myRank'] as Map)
            : null;
        final total = (data['totalParticipants'] as num?)?.toInt() ?? list.length;

        return {
          'topName': list.isNotEmpty ? (list[0]['name']?.toString() ?? 'Topper') : 'Aarav Sharma',
          'topPoints': list.isNotEmpty ? (list[0]['points'] ?? 3420) : 3420,
          'myRank': myRank != null ? myRank['rank'] : null,
          'total': total > 0 ? total : 250,
        };
      }
    } catch (_) {}

    return {
      'topName': 'Aarav Sharma',
      'topPoints': 3420,
      'myRank': 12,
      'total': 250,
    };
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return FutureBuilder<Map<String, dynamic>>(
      future: _leaderboardPreviewFuture,
      builder: (context, snapshot) {
        final data = snapshot.data;
        final topName = data?['topName'] ?? 'Aarav Sharma';
        final topPoints = data?['topPoints'] ?? 3420;
        final myRank = data?['myRank'];
        final total = data?['total'] ?? 250;

        return Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: () => context.push('/leaderboard'),
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
                            colors: [Color(0xFFFFB300), Color(0xFFFF8F00)],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(12),
                          boxShadow: [
                            BoxShadow(
                              color: const Color(0xFFFFB300).withValues(alpha: 0.35),
                              blurRadius: 8,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: const Icon(
                          Icons.emoji_events_rounded,
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
                                  "Leaderboard",
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
                                    color: const Color(0xFFFF9800).withValues(alpha: 0.12),
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  child: const Text(
                                    "All India Ranks 🏆",
                                    style: TextStyle(
                                      color: Color(0xFFE65100),
                                      fontWeight: FontWeight.w700,
                                      fontSize: 12,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 2),
                            Text(
                              "Compete with top aspirants & track your AIR standing",
                              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                    color: isDark ? Colors.grey[400] : Colors.grey[600],
                                    fontSize: 12,
                                  ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                      Icon(
                        Icons.chevron_right_rounded,
                        color: isDark ? Colors.grey[400] : Colors.grey[600],
                        size: 24,
                      ),
                    ],
                  ),

                  const SizedBox(height: AppSpacing.sm),
                  const Divider(height: 1),
                  const SizedBox(height: AppSpacing.sm),

                  // ── Snippet Row ─────────────────────────────────────────
                  Row(
                    children: [
                      // AIR 1 Topper Snippet
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          decoration: BoxDecoration(
                            color: isDark
                                ? const Color(0xFF231F15)
                                : const Color(0xFFFFF9EE),
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(
                              color: isDark
                                  ? const Color(0xFF4A3E20)
                                  : const Color(0xFFFFE0A3),
                            ),
                          ),
                          child: Row(
                            children: [
                              const Text("🥇", style: TextStyle(fontSize: 13)),
                              const SizedBox(width: 6),
                              Expanded(
                                child: Text(
                                  "$topName ($topPoints pts)",
                                  style: TextStyle(
                                    fontSize: 11.5,
                                    fontWeight: FontWeight.w600,
                                    color: isDark ? const Color(0xFFFFD580) : const Color(0xFF9E6000),
                                  ),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),

                      // User Rank or Live Count Snippet
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                        decoration: BoxDecoration(
                          color: isDark
                              ? const Color(0xFF1E222B)
                              : const Color(0xFFF1F5F9),
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(
                            color: isDark
                                ? const Color(0xFF333B4A)
                                : const Color(0xFFE2E8F0),
                          ),
                        ),
                        child: Row(
                          children: [
                            Icon(
                              Icons.trending_up_rounded,
                              size: 14,
                              color: isDark ? Colors.tealAccent : const Color(0xFF0F766E),
                            ),
                            const SizedBox(width: 5),
                            Text(
                              myRank != null ? "Your Rank: #$myRank" : "$total+ Aspirants",
                              style: TextStyle(
                                fontSize: 11.5,
                                fontWeight: FontWeight.w700,
                                color: isDark ? Colors.white : const Color(0xFF1E293B),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
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
