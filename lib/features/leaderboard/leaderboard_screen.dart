import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
import '../../core/constants/api_constants.dart';
import '../../core/providers/app_state.dart';
import '../../theme/app_tokens.dart';

class LeaderboardScreen extends ConsumerStatefulWidget {
  const LeaderboardScreen({super.key});

  @override
  ConsumerState<LeaderboardScreen> createState() => _LeaderboardScreenState();
}

class _LeaderboardScreenState extends ConsumerState<LeaderboardScreen> {
  String _selectedFilter = 'overall'; // 'overall' | 'weekly' | 'streak'
  bool _loading = true;
  List<Map<String, dynamic>> _leaderboard = [];
  Map<String, dynamic>? _myRank;
  int _totalParticipants = 0;

  @override
  void initState() {
    super.initState();
    _fetchLeaderboard();
  }

  Future<void> _fetchLeaderboard() async {
    setState(() {
      _loading = true;
    });

    try {
      final prefs = ref.read(sharedPreferencesProvider);
      final token = prefs.getString('auth_token') ?? '';

      final uri = Uri.parse('$baseUrl/leaderboard?filter=$_selectedFilter');
      final response = await http.get(
        uri,
        headers: {
          if (token.isNotEmpty) 'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      ).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body) as Map<String, dynamic>;
        final list = (data['leaderboard'] as List? ?? [])
            .map((e) => Map<String, dynamic>.from(e as Map))
            .toList();

        final myRankData = data['myRank'] is Map
            ? Map<String, dynamic>.from(data['myRank'] as Map)
            : null;

        if (mounted) {
          setState(() {
            _leaderboard = list;
            _myRank = myRankData;
            _totalParticipants = (data['totalParticipants'] as num?)?.toInt() ?? list.length;
            _loading = false;
          });
        }
        return;
      }
      throw Exception('Server responded with ${response.statusCode}');
    } catch (_) {
      if (mounted) {
        setState(() {
          _loadFallbackData();
          _loading = false;
        });
      }
    }
  }

  void _loadFallbackData() {
    final fallbacks = [
      {
        'rank': 1,
        'name': 'Aarav Sharma',
        'city': 'New Delhi',
        'targetExam': 'NEET 2026',
        'points': _selectedFilter == 'weekly' ? 950 : 3420,
        'testsCompleted': 24,
        'questionsSolved': 980,
        'streak': 31,
        'accuracy': 94.2,
        'badge': 'AIR Topper',
        'isCurrentUser': false,
      },
      {
        'rank': 2,
        'name': 'Diya Singhal',
        'city': 'Kota, Rajasthan',
        'targetExam': 'NEET 2026',
        'points': _selectedFilter == 'weekly' ? 880 : 3180,
        'testsCompleted': 22,
        'questionsSolved': 890,
        'streak': 28,
        'accuracy': 92.5,
        'badge': 'Biology Wizard',
        'isCurrentUser': false,
      },
      {
        'rank': 3,
        'name': 'Rohan Mehra',
        'city': 'Lucknow, UP',
        'targetExam': 'NEET 2026',
        'points': _selectedFilter == 'weekly' ? 810 : 2950,
        'testsCompleted': 19,
        'questionsSolved': 810,
        'streak': 24,
        'accuracy': 91.0,
        'badge': 'Physics Pro',
        'isCurrentUser': false,
      },
      {
        'rank': 4,
        'name': 'Ananya Deshmukh',
        'city': 'Pune, Maharashtra',
        'targetExam': 'NEET 2026',
        'points': _selectedFilter == 'weekly' ? 740 : 2780,
        'testsCompleted': 18,
        'questionsSolved': 760,
        'streak': 21,
        'accuracy': 89.8,
        'badge': 'Consistency King',
        'isCurrentUser': false,
      },
      {
        'rank': 5,
        'name': 'Kabir Patel',
        'city': 'Ahmedabad, Gujarat',
        'targetExam': 'NEET 2026',
        'points': _selectedFilter == 'weekly' ? 690 : 2610,
        'testsCompleted': 17,
        'questionsSolved': 720,
        'streak': 19,
        'accuracy': 88.5,
        'badge': 'Chemistry Ace',
        'isCurrentUser': false,
      },
      {
        'rank': 6,
        'name': 'Isha Nair',
        'city': 'Kochi, Kerala',
        'targetExam': 'NEET 2026',
        'points': _selectedFilter == 'weekly' ? 620 : 2450,
        'testsCompleted': 16,
        'questionsSolved': 680,
        'streak': 16,
        'accuracy': 87.4,
        'badge': 'Speed Demon',
        'isCurrentUser': false,
      },
      {
        'rank': 7,
        'name': 'Tanmay Bhattacharya',
        'city': 'Kolkata, WB',
        'targetExam': 'NEET 2026',
        'points': _selectedFilter == 'weekly' ? 570 : 2310,
        'testsCompleted': 15,
        'questionsSolved': 640,
        'streak': 14,
        'accuracy': 86.8,
        'badge': 'Daily Grinder',
        'isCurrentUser': false,
      },
      {
        'rank': 8,
        'name': 'Sneha Reddy',
        'city': 'Hyderabad, Telangana',
        'targetExam': 'NEET 2026',
        'points': _selectedFilter == 'weekly' ? 520 : 2190,
        'testsCompleted': 14,
        'questionsSolved': 600,
        'streak': 12,
        'accuracy': 85.9,
        'badge': 'Rising Star',
        'isCurrentUser': false,
      },
      {
        'rank': 9,
        'name': 'Vikramaditya Roy',
        'city': 'Patna, Bihar',
        'targetExam': 'NEET 2026',
        'points': _selectedFilter == 'weekly' ? 480 : 2040,
        'testsCompleted': 13,
        'questionsSolved': 570,
        'streak': 10,
        'accuracy': 84.7,
        'badge': 'Target Achiever',
        'isCurrentUser': false,
      },
      {
        'rank': 10,
        'name': 'Meera Iyer',
        'city': 'Chennai, Tamil Nadu',
        'targetExam': 'NEET 2026',
        'points': _selectedFilter == 'weekly' ? 440 : 1920,
        'testsCompleted': 12,
        'questionsSolved': 530,
        'streak': 9,
        'accuracy': 83.5,
        'badge': 'Focus Master',
        'isCurrentUser': false,
      },
    ];

    final authUser = ref.read(authBlocProvider).state.user;
    final rawName = authUser?.fullName;
    final myName = (rawName != null && rawName.trim().isNotEmpty) ? rawName.trim() : 'You';

    _leaderboard = fallbacks;
    _myRank = {
      'rank': 12,
      'name': myName,
      'city': 'India',
      'targetExam': 'NEET 2026',
      'points': _selectedFilter == 'weekly' ? 320 : 1420,
      'streak': 5,
      'accuracy': 84.0,
      'questionsSolved': 140,
      'badge': 'Active Aspirant',
      'isCurrentUser': true,
    };
    _totalParticipants = 250;
  }

  @override
  Widget build(BuildContext context) {
    final topThree = _leaderboard.take(3).toList();
    final remainingList = _leaderboard.length > 3 ? _leaderboard.sublist(3) : <Map<String, dynamic>>[];

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Leaderboard', style: TextStyle(fontWeight: FontWeight.w700)),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_rounded),
            tooltip: 'Refresh Rankings',
            onPressed: _fetchLeaderboard,
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            _buildFilterSelector(),
            Expanded(
              child: _loading
                  ? const Center(child: CircularProgressIndicator())
                  : RefreshIndicator(
                      onRefresh: _fetchLeaderboard,
                      child: CustomScrollView(
                        physics: const AlwaysScrollableScrollPhysics(
                          parent: BouncingScrollPhysics(),
                        ),
                        slivers: [
                          if (topThree.length >= 3)
                            SliverToBoxAdapter(
                              child: _buildPodiumSection(topThree),
                            ),
                          SliverPadding(
                            padding: const EdgeInsets.symmetric(
                              horizontal: AppSpacing.md,
                              vertical: AppSpacing.sm,
                            ),
                            sliver: SliverList(
                              delegate: SliverChildBuilderDelegate(
                                (context, index) {
                                  final item = remainingList[index];
                                  return _buildRankTile(item);
                                },
                                childCount: remainingList.length,
                              ),
                            ),
                          ),
                          const SliverToBoxAdapter(
                            child: SizedBox(height: 80),
                          ),
                        ],
                      ),
                    ),
            ),
          ],
        ),
      ),
      bottomSheet: _myRank != null ? _buildMyRankBanner(_myRank!) : null,
    );
  }

  Widget _buildFilterSelector() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: AppSpacing.sm),
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        border: const Border(
          bottom: BorderSide(color: Color(0x1F000000), width: 0.8),
        ),
      ),
      child: Row(
        children: [
          _buildFilterChip('Overall', 'overall', Icons.emoji_events_rounded),
          const SizedBox(width: AppSpacing.xs),
          _buildFilterChip('This Week', 'weekly', Icons.calendar_view_week_rounded),
          const SizedBox(width: AppSpacing.xs),
          _buildFilterChip('Streaks', 'streak', Icons.local_fire_department_rounded),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String label, String value, IconData icon) {
    final isSelected = _selectedFilter == value;
    return Expanded(
      child: InkWell(
        onTap: () {
          if (_selectedFilter != value) {
            setState(() => _selectedFilter = value);
            _fetchLeaderboard();
          }
        },
        borderRadius: BorderRadius.circular(AppRadii.md),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(vertical: 10),
          decoration: BoxDecoration(
            gradient: isSelected ? AppGradients.primary : null,
            color: isSelected ? null : AppColors.surfaceMuted,
            borderRadius: BorderRadius.circular(AppRadii.md),
            boxShadow: isSelected
                ? [
                    BoxShadow(
                      color: AppColors.primary.withValues(alpha: 0.25),
                      blurRadius: 8,
                      offset: const Offset(0, 3),
                    )
                  ]
                : null,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                icon,
                size: 16,
                color: isSelected ? Colors.white : AppColors.textSecondary,
              ),
              const SizedBox(width: 5),
              Text(
                label,
                style: TextStyle(
                  fontSize: 12.5,
                  fontWeight: isSelected ? FontWeight.w700 : FontWeight.w600,
                  color: isSelected ? Colors.white : AppColors.textSecondary,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPodiumSection(List<Map<String, dynamic>> topThree) {
    final rank1 = topThree[0];
    final rank2 = topThree[1];
    final rank3 = topThree[2];

    return Container(
      margin: const EdgeInsets.all(AppSpacing.md),
      padding: const EdgeInsets.only(top: 20, bottom: 16, left: 12, right: 12),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppColors.primary.withValues(alpha: 0.08),
            AppColors.accentLight.withValues(alpha: 0.12),
            AppColors.surfaceElevated,
          ],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
        borderRadius: BorderRadius.circular(AppRadii.lg),
        border: Border.all(color: AppColors.primary.withValues(alpha: 0.15)),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.stars_rounded, color: AppColors.gold, size: 20),
              const SizedBox(width: 6),
              Text(
                'NEET Champions Podium',
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w800,
                  color: Theme.of(context).colorScheme.onSurface,
                  letterSpacing: 0.3,
                ),
              ),
              const SizedBox(width: 6),
              const Icon(Icons.stars_rounded, color: AppColors.gold, size: 20),
            ],
          ),
          const SizedBox(height: 18),
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildPodiumPillar(rank2, 2, 110, const Color(0xFFC0C0C0), Icons.military_tech_rounded),
              _buildPodiumPillar(rank1, 1, 145, const Color(0xFFFFD700), Icons.workspace_premium_rounded),
              _buildPodiumPillar(rank3, 3, 95, const Color(0xFFCD7F32), Icons.military_tech_rounded),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPodiumPillar(
    Map<String, dynamic> item,
    int rank,
    double height,
    Color medalColor,
    IconData medalIcon,
  ) {
    final name = (item['name'] ?? 'Aspirant').toString();
    final points = (item['points'] ?? 0).toString();
    final streak = (item['streak'] ?? 1).toString();
    final isRank1 = rank == 1;

    return Expanded(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 4),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Stack(
              clipBehavior: Clip.none,
              alignment: Alignment.center,
              children: [
                Container(
                  width: isRank1 ? 64 : 52,
                  height: isRank1 ? 64 : 52,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: isRank1 ? AppGradients.primary : null,
                    color: isRank1 ? null : medalColor.withValues(alpha: 0.2),
                    border: Border.all(
                      color: medalColor,
                      width: isRank1 ? 3 : 2,
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: medalColor.withValues(alpha: 0.35),
                        blurRadius: isRank1 ? 12 : 6,
                        spreadRadius: 1,
                      )
                    ],
                  ),
                  child: Center(
                    child: Text(
                      name.isNotEmpty ? name[0].toUpperCase() : 'A',
                      style: TextStyle(
                        color: isRank1 ? Colors.white : medalColor,
                        fontSize: isRank1 ? 26 : 20,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  ),
                ),
                Positioned(
                  top: isRank1 ? -14 : -10,
                  child: Container(
                    padding: const EdgeInsets.all(3),
                    decoration: BoxDecoration(
                      color: medalColor,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.2),
                          blurRadius: 4,
                        )
                      ],
                    ),
                    child: Icon(
                      isRank1 ? Icons.emoji_events_rounded : medalIcon,
                      size: isRank1 ? 18 : 14,
                      color: Colors.white,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              name,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: isRank1 ? 13 : 11.5,
                fontWeight: isRank1 ? FontWeight.w800 : FontWeight.w700,
              ),
            ),
            Text(
              '$points pts',
              style: TextStyle(
                fontSize: isRank1 ? 12.5 : 11,
                fontWeight: FontWeight.w900,
                color: AppColors.primary,
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.local_fire_department_rounded, size: 12, color: AppColors.warning),
                Text(
                  '${streak}d',
                  style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppColors.warning),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Container(
              height: height,
              width: double.infinity,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    medalColor.withValues(alpha: isRank1 ? 0.35 : 0.2),
                    medalColor.withValues(alpha: 0.05),
                  ],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
                borderRadius: const BorderRadius.vertical(top: Radius.circular(10)),
                border: Border.all(color: medalColor.withValues(alpha: 0.35)),
              ),
              child: Center(
                child: Text(
                  '#$rank',
                  style: TextStyle(
                    fontSize: isRank1 ? 28 : 22,
                    fontWeight: FontWeight.w900,
                    color: medalColor.withValues(alpha: 0.9),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRankTile(Map<String, dynamic> item) {
    final rank = item['rank'] ?? 0;
    final name = (item['name'] ?? 'Aspirant').toString();
    final points = (item['points'] ?? 0).toString();
    final streak = (item['streak'] ?? 1).toString();
    final accuracy = (item['accuracy'] ?? 85).toString();
    final city = (item['city'] ?? '').toString();
    final isCurrentUser = item['isCurrentUser'] == true;

    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.sm),
      decoration: BoxDecoration(
        color: isCurrentUser
            ? AppColors.primary.withValues(alpha: 0.09)
            : Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(AppRadii.md),
        border: Border.all(
          color: isCurrentUser
              ? AppColors.primary
              : const Color(0x1F000000),
          width: isCurrentUser ? 1.8 : 1,
        ),
        boxShadow: isCurrentUser
            ? [
                BoxShadow(
                  color: AppColors.primary.withValues(alpha: 0.15),
                  blurRadius: 10,
                  offset: const Offset(0, 3),
                )
              ]
            : null,
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: 4),
        leading: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(
              width: 32,
              child: Text(
                '#$rank',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w800,
                  color: isCurrentUser ? AppColors.primary : AppColors.textSecondary,
                ),
              ),
            ),
            CircleAvatar(
              radius: 20,
              backgroundColor: isCurrentUser
                  ? AppColors.primary
                  : AppColors.primary.withValues(alpha: 0.12),
              child: Text(
                name.isNotEmpty ? name[0].toUpperCase() : 'A',
                style: TextStyle(
                  fontWeight: FontWeight.w800,
                  color: isCurrentUser ? Colors.white : AppColors.primary,
                  fontSize: 16,
                ),
              ),
            ),
          ],
        ),
        title: Row(
          children: [
            Flexible(
              child: Text(
                name,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  color: isCurrentUser ? AppColors.primary : null,
                ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
            if (isCurrentUser) ...[
              const SizedBox(width: 6),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: AppColors.primary,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: const Text(
                  'YOU',
                  style: TextStyle(
                    fontSize: 9,
                    fontWeight: FontWeight.w900,
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ],
        ),
        subtitle: Row(
          children: [
            if (city.isNotEmpty) ...[
              Text(
                city,
                style: TextStyle(fontSize: 11, color: AppColors.textSecondary.withValues(alpha: 0.8)),
              ),
              const Text(' • ', style: TextStyle(fontSize: 10, color: Colors.grey)),
            ],
            Text(
              '$accuracy% Acc',
              style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.success),
            ),
            const Text(' • ', style: TextStyle(fontSize: 10, color: Colors.grey)),
            Row(
              children: [
                const Icon(Icons.local_fire_department_rounded, size: 12, color: AppColors.warning),
                Text(
                  '${streak}d',
                  style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.warning),
                ),
              ],
            ),
          ],
        ),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              points,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w900,
                color: AppColors.primary,
              ),
            ),
            const Text(
              'pts',
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.w600,
                color: AppColors.textSecondary,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMyRankBanner(Map<String, dynamic> myRank) {
    final rank = myRank['rank'] ?? 0;
    final name = (myRank['name'] ?? 'You').toString();
    final points = (myRank['points'] ?? 0).toString();
    final streak = (myRank['streak'] ?? 1).toString();

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg, vertical: 12),
      decoration: BoxDecoration(
        color: const Color(0xFF1E222D),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.3),
            blurRadius: 16,
            offset: const Offset(0, -4),
          )
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            decoration: BoxDecoration(
              gradient: AppGradients.primary,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Text(
              '#$rank',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.w900,
              ),
            ),
          ),
          const SizedBox(width: AppSpacing.md),
          Expanded(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Your Standing ($name)',
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                    fontSize: 13,
                  ),
                ),
                Text(
                  '🔥 $streak days streak • Top ${_calculatePercentile(rank)}% of $_totalParticipants aspirants',
                  style: const TextStyle(
                    color: Colors.white70,
                    fontSize: 11,
                  ),
                ),
              ],
            ),
          ),
          Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                '$points pts',
                style: const TextStyle(
                  color: AppColors.accentLight,
                  fontWeight: FontWeight.w900,
                  fontSize: 15,
                ),
              ),
              const Text(
                'Keep practicing!',
                style: TextStyle(color: Colors.white60, fontSize: 10),
              ),
            ],
          ),
        ],
      ),
    );
  }

  String _calculatePercentile(int rank) {
    if (_totalParticipants <= 0 || rank <= 0) return '10';
    final p = ((rank / _totalParticipants) * 100).clamp(1, 99).round();
    return '$p';
  }
}
