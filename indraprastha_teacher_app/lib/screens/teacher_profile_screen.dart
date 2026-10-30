import 'package:flutter/material.dart';
import '../models/teacher_models.dart';
import '../services/teacher_api_service.dart';
import '../theme/app_tokens.dart';
import '../theme/theme_controller.dart';

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
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardColor = isDark ? AppColors.darkSurface : AppColors.surface;
    final borderColor = isDark ? AppColors.darkBorder : AppColors.border;
    final p = _profile ?? TeacherApiService.currentProfile;

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Faculty Profile',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 18,
            color: isDark ? Colors.white : AppColors.textPrimary,
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(
              isDark ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
              color: isDark ? AppColors.accentLight : AppColors.primary,
            ),
            tooltip: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
            onPressed: () => ThemeController.toggleTheme(context),
          ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
          : ListView(
              padding: const EdgeInsets.all(20),
              children: [
                // Profile Header Card
                Container(
                  decoration: BoxDecoration(
                    color: cardColor,
                    borderRadius: BorderRadius.circular(AppRadii.lg),
                    border: Border.all(color: borderColor, width: 1.1),
                    boxShadow: isDark ? AppShadows.darkSoft : AppShadows.soft,
                  ),
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    children: [
                      Container(
                        width: 84,
                        height: 84,
                        decoration: BoxDecoration(
                          gradient: AppGradients.primary,
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.primary.withValues(alpha: 0.35),
                              blurRadius: 18,
                              offset: const Offset(0, 6),
                            ),
                          ],
                        ),
                        child: Center(
                          child: Text(
                            (p?.displayName.isNotEmpty == true ? p!.displayName[0] : 'T').toUpperCase(),
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 34,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        p?.displayName ?? 'Faculty Member',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: isDark ? Colors.white : AppColors.textPrimary,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        p?.email ?? '',
                        style: TextStyle(
                          fontSize: 13,
                          color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                        ),
                      ),
                      const SizedBox(height: 10),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                        decoration: BoxDecoration(
                          color: (p?.isActive == true ? AppColors.success : AppColors.danger).withValues(alpha: 0.12),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: (p?.isActive == true ? AppColors.success : AppColors.danger).withValues(alpha: 0.3),
                          ),
                        ),
                        child: Text(
                          p?.isActive == true ? 'ACTIVE FACULTY' : 'INACTIVE',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: p?.isActive == true ? AppColors.success : AppColors.danger,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 18),

                // Appearance & Theme Settings Card (Matches Student App Profile)
                Container(
                  decoration: BoxDecoration(
                    color: cardColor,
                    borderRadius: BorderRadius.circular(AppRadii.lg),
                    border: Border.all(color: borderColor, width: 1.1),
                    boxShadow: isDark ? AppShadows.darkSoft : AppShadows.soft,
                  ),
                  padding: const EdgeInsets.all(18),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(6),
                            decoration: BoxDecoration(
                              color: AppColors.primary.withValues(alpha: 0.12),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: const Icon(Icons.palette_outlined, color: AppColors.primary, size: 20),
                          ),
                          const SizedBox(width: 10),
                          Text(
                            'Appearance & Theme',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 15,
                              color: isDark ? Colors.white : AppColors.textPrimary,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      ValueListenableBuilder<ThemeMode>(
                        valueListenable: ThemeController.themeModeNotifier,
                        builder: (ctx, currentMode, _) {
                          final isDarkModeActive = currentMode == ThemeMode.dark ||
                              (currentMode == ThemeMode.system &&
                                  MediaQuery.of(context).platformBrightness == Brightness.dark);

                          return SwitchListTile(
                            contentPadding: EdgeInsets.zero,
                            activeThumbColor: AppColors.primary,
                            value: isDarkModeActive,
                            onChanged: (val) {
                              ThemeController.setThemeMode(val ? ThemeMode.dark : ThemeMode.light);
                            },
                            title: Text(
                              'Dark Mode',
                              style: TextStyle(
                                fontWeight: FontWeight.w600,
                                fontSize: 14,
                                color: isDark ? Colors.white : AppColors.textPrimary,
                              ),
                            ),
                            subtitle: Text(
                              isDarkModeActive
                                  ? 'Sleek dark theme enabled'
                                  : 'Warm light theme enabled',
                              style: TextStyle(
                                fontSize: 12,
                                color: isDark ? AppColors.darkTextMuted : AppColors.textSecondary,
                              ),
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 18),

                // Assigned Subjects Card
                Container(
                  decoration: BoxDecoration(
                    color: cardColor,
                    borderRadius: BorderRadius.circular(AppRadii.lg),
                    border: Border.all(color: borderColor, width: 1.1),
                    boxShadow: isDark ? AppShadows.darkSoft : AppShadows.soft,
                  ),
                  padding: const EdgeInsets.all(18),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(6),
                            decoration: BoxDecoration(
                              color: AppColors.primary.withValues(alpha: 0.12),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: const Icon(Icons.menu_book_outlined, color: AppColors.primary, size: 20),
                          ),
                          const SizedBox(width: 10),
                          Text(
                            'Assigned Academic Subjects',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 15,
                              color: isDark ? Colors.white : AppColors.textPrimary,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 14),
                      if (p?.assignments.isEmpty == true || p?.assignments == null)
                        Text(
                          'No subjects currently assigned. Contact Academy Administrator.',
                          style: TextStyle(color: isDark ? AppColors.darkTextMuted : AppColors.textSecondary),
                        )
                      else
                        ...p!.assignments.map((asgn) {
                          return Container(
                            margin: const EdgeInsets.only(bottom: 8),
                            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                            decoration: BoxDecoration(
                              color: isDark ? AppColors.darkSurfaceElevated : AppColors.surfaceElevated,
                              borderRadius: BorderRadius.circular(AppRadii.sm),
                              border: Border.all(color: isDark ? AppColors.darkBorderStrong : AppColors.border),
                            ),
                            child: Row(
                              children: [
                                const Icon(Icons.school_outlined, size: 18, color: AppColors.primary),
                                const SizedBox(width: 10),
                                Text(
                                  '${asgn.classLevel} — ${asgn.subject}',
                                  style: TextStyle(
                                    fontWeight: FontWeight.w600,
                                    fontSize: 14,
                                    color: isDark ? Colors.white : AppColors.textPrimary,
                                  ),
                                ),
                              ],
                            ),
                          );
                        }),
                    ],
                  ),
                ),

                const SizedBox(height: 24),

                // Logout Button
                FilledButton.icon(
                  style: FilledButton.styleFrom(
                    backgroundColor: AppColors.danger,
                    minimumSize: const Size.fromHeight(50),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadii.md)),
                  ),
                  icon: const Icon(Icons.logout, size: 18, color: Colors.white),
                  label: const Text('Log Out from Faculty Account', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                  onPressed: () async {
                    final confirm = await showDialog<bool>(
                      context: context,
                      builder: (ctx) => AlertDialog(
                        backgroundColor: cardColor,
                        title: Text(
                          'Confirm Logout',
                          style: TextStyle(color: isDark ? Colors.white : AppColors.textPrimary),
                        ),
                        content: Text(
                          'Are you sure you want to log out of the Faculty Portal?',
                          style: TextStyle(color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                        ),
                        actions: [
                          TextButton(
                            onPressed: () => Navigator.of(ctx).pop(false),
                            child: Text(
                              'Cancel',
                              style: TextStyle(color: isDark ? AppColors.darkTextMuted : AppColors.textSecondary),
                            ),
                          ),
                          FilledButton(
                            style: FilledButton.styleFrom(backgroundColor: AppColors.danger),
                            onPressed: () => Navigator.of(ctx).pop(true),
                            child: const Text('Log Out', style: TextStyle(color: Colors.white)),
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
