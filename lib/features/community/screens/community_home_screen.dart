import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/community_models.dart';
import '../services/community_service.dart';
import 'community_chat_screen.dart';
import 'my_doubts_screen.dart';

class CommunityHomeScreen extends StatefulWidget {
  const CommunityHomeScreen({super.key});

  @override
  State<CommunityHomeScreen> createState() => _CommunityHomeScreenState();
}

class _CommunityHomeScreenState extends State<CommunityHomeScreen> with SingleTickerProviderStateMixin {
  final CommunityService _service = CommunityService();
  late TabController _tabController;
  List<CommunitySubject> _subjects = [];
  bool _isLoading = true;
  int _doubtsKey = 0;

  static const navyColor = Color(0xFF002350);
  static const goldColor = Color(0xFFD2AE39);

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _tabController.addListener(() {
      if (_tabController.index == 1 && mounted) {
        setState(() => _doubtsKey++);
      }
    });
    _loadSubjects();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _loadSubjects() async {
    setState(() => _isLoading = true);
    try {
      final subjects = await _service.fetchSubjects();
      if (mounted) {
        setState(() {
          _subjects = subjects;
          _isLoading = false;
        });
      }
    } catch (_) {
      if (mounted) {
        setState(() {
          _subjects = _getFallbackSubjects();
          _isLoading = false;
        });
      }
    }
  }

  List<CommunitySubject> _getFallbackSubjects() {
    return [
      CommunitySubject(
        communityId: 1,
        classLevel: 'Class 11',
        subject: 'Chemistry',
        icon: '⚗️',
        color: const Color(0xFFE53E3E),
        totalMessages: 0,
        lastActivityAt: DateTime.now(),
        lastMessageSnippet: '',
        lastMessageType: 'text',
      ),
      CommunitySubject(
        communityId: 2,
        classLevel: 'Class 11',
        subject: 'Biology',
        icon: '🧬',
        color: const Color(0xFF2E8B57),
        totalMessages: 0,
        lastActivityAt: DateTime.now(),
        lastMessageSnippet: '',
        lastMessageType: 'text',
      ),
      CommunitySubject(
        communityId: 3,
        classLevel: 'Class 11',
        subject: 'Physics',
        icon: '⚛️',
        color: const Color(0xFF3182CE),
        totalMessages: 0,
        lastActivityAt: DateTime.now(),
        lastMessageSnippet: '',
        lastMessageType: 'text',
      ),
      CommunitySubject(
        communityId: 4,
        classLevel: 'Class 12',
        subject: 'Chemistry',
        icon: '🧪',
        color: const Color(0xFFDD6B20),
        totalMessages: 0,
        lastActivityAt: DateTime.now(),
        lastMessageSnippet: '',
        lastMessageType: 'text',
      ),
      CommunitySubject(
        communityId: 5,
        classLevel: 'Class 12',
        subject: 'Biology',
        icon: '🌿',
        color: const Color(0xFF38A169),
        totalMessages: 0,
        lastActivityAt: DateTime.now(),
        lastMessageSnippet: '',
        lastMessageType: 'text',
      ),
      CommunitySubject(
        communityId: 6,
        classLevel: 'Class 12',
        subject: 'Physics',
        icon: '⚡',
        color: const Color(0xFF805AD5),
        totalMessages: 0,
        lastActivityAt: DateTime.now(),
        lastMessageSnippet: '',
        lastMessageType: 'text',
      ),
    ];
  }

  void _openChat(CommunitySubject sub) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (ctx) => CommunityChatScreen(
          communityId: sub.communityId,
          classLevel: sub.classLevel,
          subject: sub.subject,
          color: sub.color,
          icon: sub.icon,
        ),
      ),
    ).then((_) {
      _loadSubjects();
      if (mounted) setState(() => _doubtsKey++);
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final headingColor = isDark ? Colors.white : navyColor;
    final subtitleColor = isDark ? Colors.grey.shade400 : Colors.grey.shade600;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF11131A) : const Color(0xFFF5F7FA),
      body: Column(
        children: [
          // Header
          Container(
            padding: const EdgeInsets.fromLTRB(16, 14, 16, 0),
            color: isDark ? const Color(0xFF171A22) : Colors.white,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(6),
                      decoration: BoxDecoration(
                        color: (isDark ? goldColor : navyColor).withValues(alpha: 0.12),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Icon(Icons.forum, color: isDark ? goldColor : navyColor, size: 20),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      'Private Student Community',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: headingColor,
                        letterSpacing: -0.3,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  'Your isolated subject workspaces, persistent notes & doubt resolution',
                  style: TextStyle(fontSize: 12, color: subtitleColor),
                ),
                const SizedBox(height: 12),
                TabBar(
                  controller: _tabController,
                  indicatorColor: isDark ? goldColor : navyColor,
                  labelColor: isDark ? goldColor : navyColor,
                  unselectedLabelColor: isDark ? Colors.grey.shade400 : Colors.grey,
                  labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                  tabs: const [
                    Tab(
                      icon: Icon(Icons.view_module_outlined, size: 18),
                      text: 'Subject Workspaces',
                    ),
                    Tab(
                      icon: Icon(Icons.help_center_outlined, size: 18),
                      text: 'My Doubts',
                    ),
                  ],
                ),
              ],
            ),
          ),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : RefreshIndicator(
                        onRefresh: _loadSubjects,
                        child: ListView(
                          padding: const EdgeInsets.all(16),
                          children: [
                            Container(
                              padding: const EdgeInsets.all(14),
                              margin: const EdgeInsets.only(bottom: 16),
                              decoration: BoxDecoration(
                                color: isDark ? const Color(0xFF1E293B) : const Color(0xFFEBF8FF),
                                borderRadius: BorderRadius.circular(14),
                                border: Border.all(color: isDark ? const Color(0xFF334155) : const Color(0xFFBEE3F8)),
                              ),
                              child: Row(
                                children: [
                                  Icon(Icons.shield_outlined, color: isDark ? const Color(0xFF60A5FA) : const Color(0xFF3182CE), size: 24),
                                  const SizedBox(width: 12),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          'Strict Student Privacy Guaranteed',
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 13,
                                            color: isDark ? const Color(0xFF93C5FD) : Colors.blue.shade900,
                                          ),
                                        ),
                                        const SizedBox(height: 2),
                                        Text(
                                          'Each of the 6 workspaces below belongs only to your account. Open a subject to chat, draw on whiteboard, and ask doubts.',
                                          style: TextStyle(
                                            fontSize: 11,
                                            color: isDark ? const Color(0xFFBFDBFE) : Colors.blue.shade800,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            LayoutBuilder(
                              builder: (ctx, constraints) {
                                final isWide = constraints.maxWidth > 650;
                                return GridView.builder(
                                  shrinkWrap: true,
                                  physics: const NeverScrollableScrollPhysics(),
                                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                                    crossAxisCount: isWide ? 3 : 2,
                                    crossAxisSpacing: 12,
                                    mainAxisSpacing: 12,
                                    childAspectRatio: isWide ? 1.4 : 1.15,
                                  ),
                                  itemCount: _subjects.length,
                                  itemBuilder: (ctx, index) {
                                    final sub = _subjects[index];
                                    return _buildSubjectCard(sub);
                                  },
                                );
                              },
                            ),
                          ],
                        ),
                      ),
                MyDoubtsScreen(key: ValueKey(_doubtsKey)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSubjectCard(CommunitySubject sub) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final timeStr = DateFormat('dd MMM').format(sub.lastActivityAt.toLocal());

    return Card(
      elevation: 0,
      color: isDark ? const Color(0xFF1E222D) : Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(
          color: isDark ? const Color(0xFF2E3545) : Colors.black.withValues(alpha: 0.08),
        ),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: () => _openChat(sub),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    width: 42,
                    height: 42,
                    decoration: BoxDecoration(
                      color: sub.color.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    alignment: Alignment.center,
                    child: Text(sub.icon, style: const TextStyle(fontSize: 22)),
                  ),
                  if (sub.totalMessages > 0)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: (isDark ? goldColor : navyColor).withValues(alpha: 0.12),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        '${sub.totalMessages} msgs',
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          color: isDark ? goldColor : navyColor,
                        ),
                      ),
                    ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: sub.color.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      sub.classLevel.toUpperCase(),
                      style: TextStyle(
                        fontSize: 9,
                        fontWeight: FontWeight.w800,
                        color: sub.color,
                        letterSpacing: 0.5,
                      ),
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    sub.subject,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: isDark ? Colors.white : const Color(0xFF1A202C),
                    ),
                  ),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Active $timeStr',
                    style: TextStyle(fontSize: 10, color: isDark ? Colors.grey.shade400 : Colors.grey),
                  ),
                  Row(
                    children: [
                      Text(
                        'Open',
                        style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: sub.color),
                      ),
                      Icon(Icons.arrow_forward_ios, size: 10, color: sub.color),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
