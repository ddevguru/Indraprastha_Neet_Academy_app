import 'package:flutter/material.dart';
import '../models/teacher_models.dart';
import '../services/teacher_api_service.dart';

class TeacherProfileScreen extends StatefulWidget {
  final VoidCallback onLogout;
  const TeacherProfileScreen({super.key, required this.onLogout});

  @override
  State<TeacherProfileScreen> createState() => _TeacherProfileScreenState();
}

class _TeacherProfileScreenState extends State<TeacherProfileScreen> {
  bool _loading = true;
  TeacherProfile? _profile;

  @override
  void initState() {
    super.initState();
    _fetchProfile();
  }

  Future<void> _fetchProfile() async {
    try {
      final p = await TeacherApiService.getProfile();
      if (!mounted) return;
      setState(() {
        _profile = p;
        _loading = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _profile = TeacherApiService.currentProfile;
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final p = _profile ?? TeacherApiService.currentProfile;

    return Scaffold(
      backgroundColor: const Color(0xFFF5F7FA),
      appBar: AppBar(
        backgroundColor: const Color(0xFF002350),
        foregroundColor: Colors.white,
        title: const Text('Faculty Profile', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.all(20),
              children: [
                // Profile Card
                Card(
                  elevation: 0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                    side: BorderSide(color: Colors.grey.withValues(alpha: 0.15)),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      children: [
                        Container(
                          width: 80,
                          height: 80,
                          decoration: const BoxDecoration(
                            color: Color(0xFF002350),
                            shape: BoxShape.circle,
                            boxShadow: [
                              BoxShadow(
                                color: Color(0x33D2AE39),
                                blurRadius: 10,
                                spreadRadius: 2,
                              ),
                            ],
                          ),
                          child: Center(
                            child: Text(
                              (p?.displayName.isNotEmpty == true ? p!.displayName[0] : 'T').toUpperCase(),
                              style: const TextStyle(
                                color: Color(0xFFD2AE39),
                                fontSize: 32,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 14),
                        Text(
                          p?.displayName ?? 'Faculty Member',
                          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF002350)),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          p?.email ?? '',
                          style: TextStyle(fontSize: 13, color: Colors.grey.shade600),
                        ),
                        const SizedBox(height: 10),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: (p?.isActive == true ? Colors.green : Colors.red).withValues(alpha: 0.15),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(
                            p?.isActive == true ? 'ACTIVE FACULTY' : 'INACTIVE',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                              color: p?.isActive == true ? Colors.green : Colors.red,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 16),

                // Assigned Subjects Card
                Card(
                  elevation: 0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                    side: BorderSide(color: Colors.grey.withValues(alpha: 0.15)),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(18),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Assigned Academic Subjects',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF002350)),
                        ),
                        const SizedBox(height: 12),
                        if (p?.assignments.isEmpty == true || p?.assignments == null)
                          const Text('No subjects currently assigned. Contact Academy Administrator.')
                        else
                          ...p!.assignments.map((asgn) {
                            return Container(
                              margin: const EdgeInsets.only(bottom: 8),
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                              decoration: BoxDecoration(
                                color: const Color(0xFFF5F7FA),
                                borderRadius: BorderRadius.circular(10),
                                border: Border.all(color: Colors.grey.withValues(alpha: 0.2)),
                              ),
                              child: Row(
                                children: [
                                  const Icon(Icons.school_outlined, size: 20, color: Color(0xFF002350)),
                                  const SizedBox(width: 10),
                                  Text(
                                    '${asgn.classLevel} — ${asgn.subject}',
                                    style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
                                  ),
                                ],
                              ),
                            );
                          }),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 24),

                // Logout Button
                FilledButton.icon(
                  style: FilledButton.styleFrom(
                    backgroundColor: Colors.red.shade700,
                    minimumSize: const Size.fromHeight(48),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  icon: const Icon(Icons.logout, size: 18),
                  label: const Text('Log Out from Faculty Account', style: TextStyle(fontWeight: FontWeight.bold)),
                  onPressed: () async {
                    final confirm = await showDialog<bool>(
                      context: context,
                      builder: (ctx) => AlertDialog(
                        title: const Text('Confirm Logout'),
                        content: const Text('Are you sure you want to log out of the Faculty Portal?'),
                        actions: [
                          TextButton(onPressed: () => Navigator.of(ctx).pop(false), child: const Text('Cancel')),
                          FilledButton(
                            style: FilledButton.styleFrom(backgroundColor: Colors.red),
                            onPressed: () => Navigator.of(ctx).pop(true),
                            child: const Text('Log Out'),
                          ),
                        ],
                      ),
                    );
                    if (confirm == true) {
                      await TeacherApiService.logout();
                      widget.onLogout();
                    }
                  },
                ),
              ],
            ),
    );
  }
}
