import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/community_models.dart';
import '../services/community_service.dart';
import 'community_chat_screen.dart';
import 'my_doubts_screen.dart';
import 'submit_doubt_dialog.dart';

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

  static const Color navyColor = Color(0xFF002350);
  static const Color goldColor = Color(0xFFD2AE39);
  static const Color bgLight = Color(0xFFF5F7FA);

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
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
      final list = await _service.fetchSubjects();
      if (mounted) setState(() => _subjects = list);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load subject workspaces: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  void _openChat(CommunitySubject sub) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (ctx) => CommunityChatScreen(
          communityId: sub.communityId,
          classLevel: sub.classLevel,
          subject: sub.subject,
          icon: sub.icon,
          color: sub.color,
        ),
      ),
    ).then((_) => _loadSubjects());
  }

  void _openSubmitDoubt() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => const SubmitDoubtDialog(
        initialClassLevel: 'Class 11',
        initialSubject: 'Physics',
      ),
    ).then((_) {
      if (_tabController.index == 1) {
        setState(() {});
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgLight,
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
            color: Colors.white,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(6),
                              decoration: BoxDecoration(
                                color: navyColor.withValues(alpha: 0.08),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: const Icon(Icons.forum, color: navyColor, size: 20),
                            ),
                            const SizedBox(width: 8),
                            const Text(
                              'Private Student Community',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: navyColor,
                                letterSpacing: -0.3,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Your isolated subject workspaces, persistent notes & doubt resolution',
                          style: TextStyle(fontSize: 12, color: Colors.grey),
                        ),
                      ],
                    ),
                    ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: goldColor,
                        foregroundColor: navyColor,
                        elevation: 0,
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      ),
                      onPressed: _openSubmitDoubt,
                      icon: const Icon(Icons.add_comment_outlined, size: 16),
                      label: const Text('Ask Teacher', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                TabBar(
                  controller: _tabController,
                  indicatorColor: navyColor,
                  labelColor: navyColor,
                  unselectedLabelColor: Colors.grey,
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
                                color: const Color(0xFFEBF8FF),
                                borderRadius: BorderRadius.circular(14),
                                border: Border.all(color: const Color(0xFFBEE3F8)),
                              ),
                              child: Row(
                                children: [
                                  const Icon(Icons.shield_outlined, color: Color(0xFF3182CE), size: 24),
                                  const SizedBox(width: 12),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          'Strict Student Privacy Guaranteed',
                                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.blue.shade900),
                                        ),
                                        const SizedBox(height: 2),
                                        Text(
                                          'Each of the 6 workspaces below belongs only to your account. Other students and teachers cannot see your private notes or whiteboard drawings.',
                                          style: TextStyle(fontSize: 11, color: Colors.blue.shade800),
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
                const MyDoubtsScreen(),
              ],
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: navyColor,
        foregroundColor: Colors.white,
        onPressed: _openSubmitDoubt,
        icon: const Icon(Icons.help_outline, color: goldColor),
        label: const Text('Ask Doubt', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
    );
  }

  Widget _buildSubjectCard(CommunitySubject sub) {
    final timeStr = DateFormat('dd MMM').format(sub.lastActivityAt.toLocal());

    return Card(
      elevation: 2,
      shadowColor: Colors.black.withValues(alpha: 0.08),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
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
                        color: navyColor.withValues(alpha: 0.08),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        '${sub.totalMessages} msgs',
                        style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: navyColor),
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
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF1A202C),
                    ),
                  ),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Active $timeStr',
                    style: const TextStyle(fontSize: 10, color: Colors.grey),
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
