import 'package:flutter/material.dart';
import '../models/teacher_models.dart';
import '../services/teacher_api_service.dart';
import '../theme/app_tokens.dart';
import '../theme/theme_controller.dart';
import 'teacher_doubt_detail_screen.dart';

class TeacherDoubtQueueScreen extends StatefulWidget {
  const TeacherDoubtQueueScreen({super.key});

  @override
  State<TeacherDoubtQueueScreen> createState() => _TeacherDoubtQueueScreenState();
}

class _TeacherDoubtQueueScreenState extends State<TeacherDoubtQueueScreen> {
  bool _loading = true;
  String _error = '';
  List<TeacherDoubtItem> _doubts = [];

  String _statusFilter = '';
  String _classFilter = '';
  String _subjectFilter = '';
  final _searchCtrl = TextEditingController();
  int? _actionInProgressId;

  @override
  void initState() {
    super.initState();
    _fetchDoubts();
  }

  Future<void> _fetchDoubts() async {
    setState(() {
      _loading = true;
      _error = '';
    });
    try {
      final list = await TeacherApiService.getDoubts(
        status: _statusFilter,
        classLevel: _classFilter,
        subject: _subjectFilter,
        search: _searchCtrl.text.trim(),
      );
      if (!mounted) return;
      setState(() {
        _doubts = list;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _error = e.toString().replaceFirst('Exception: ', '');
        _loading = false;
      });
    }
  }

  Future<void> _claimDoubt(int doubtId) async {
    setState(() => _actionInProgressId = doubtId);
    try {
      await TeacherApiService.claimDoubt(doubtId);
      await _fetchDoubts();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('✓ Doubt claimed successfully')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to claim: $e'), backgroundColor: AppColors.danger),
        );
      }
    } finally {
      if (mounted) setState(() => _actionInProgressId = null);
    }
  }

  Future<void> _startSolving(int doubtId) async {
    setState(() => _actionInProgressId = doubtId);
    try {
      await TeacherApiService.startSolvingDoubt(doubtId);
      await _fetchDoubts();
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to start: $e'), backgroundColor: AppColors.danger),
        );
      }
    } finally {
      if (mounted) setState(() => _actionInProgressId = null);
    }
  }

  Color _getStatusColor(String status) {
    switch (status.toLowerCase().replaceAll(' ', '_')) {
      case 'pending':
        return AppColors.warning;
      case 'assigned':
        return const Color(0xFF6366F1);
      case 'in_progress':
        return const Color(0xFF0EA5E9);
      case 'answered':
        return const Color(0xFF10B981);
      case 'resolved':
        return AppColors.success;
      case 'reopened':
        return AppColors.danger;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Subject Doubts Queue',
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
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Refresh',
            onPressed: _fetchDoubts,
          ),
        ],
      ),
      body: Column(
        children: [
          // Filter Header Card
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: isDark ? AppColors.darkSurface : AppColors.surface,
              border: Border(
                bottom: BorderSide(
                  color: isDark ? AppColors.darkBorder : AppColors.border,
                  width: 1,
                ),
              ),
              boxShadow: isDark ? AppShadows.darkSoft : AppShadows.soft,
            ),
            child: Column(
              children: [
                TextField(
                  controller: _searchCtrl,
                  style: TextStyle(color: isDark ? Colors.white : AppColors.textPrimary),
                  onSubmitted: (_) => _fetchDoubts(),
                  decoration: InputDecoration(
                    hintText: 'Search doubt title or ID...',
                    hintStyle: TextStyle(
                      color: isDark ? AppColors.darkTextMuted : AppColors.textSecondary,
                    ),
                    prefixIcon: Icon(
                      Icons.search,
                      size: 20,
                      color: isDark ? AppColors.darkTextMuted : AppColors.textSecondary,
                    ),
                    suffixIcon: IconButton(
                      icon: const Icon(Icons.arrow_forward, size: 18, color: AppColors.primary),
                      onPressed: _fetchDoubts,
                    ),
                    contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    isDense: true,
                    filled: true,
                    fillColor: isDark ? AppColors.darkSurfaceElevated : AppColors.surfaceElevated,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(AppRadii.sm),
                      borderSide: BorderSide(color: isDark ? AppColors.darkBorderStrong : AppColors.borderStrong),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(AppRadii.sm),
                      borderSide: BorderSide(color: isDark ? AppColors.darkBorder : AppColors.border),
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        initialValue: _statusFilter,
                        dropdownColor: isDark ? AppColors.darkSurfaceElevated : AppColors.surface,
                        style: TextStyle(color: isDark ? Colors.white : AppColors.textPrimary, fontSize: 12),
                        items: const [
                          DropdownMenuItem(value: '', child: Text('All Statuses')),
                          DropdownMenuItem(value: 'pending', child: Text('Pending')),
                          DropdownMenuItem(value: 'assigned', child: Text('Assigned')),
                          DropdownMenuItem(value: 'in_progress', child: Text('In Progress')),
                          DropdownMenuItem(value: 'answered', child: Text('Answered')),
                          DropdownMenuItem(value: 'resolved', child: Text('Resolved')),
                          DropdownMenuItem(value: 'reopened', child: Text('Reopened')),
                        ],
                        onChanged: (v) {
                          _statusFilter = v ?? '';
                          _fetchDoubts();
                        },
                        decoration: InputDecoration(
                          labelText: 'Status',
                          labelStyle: TextStyle(
                            color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                            fontSize: 12,
                          ),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          isDense: true,
                          fillColor: isDark ? AppColors.darkSurfaceElevated : AppColors.surfaceElevated,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        initialValue: _classFilter,
                        dropdownColor: isDark ? AppColors.darkSurfaceElevated : AppColors.surface,
                        style: TextStyle(color: isDark ? Colors.white : AppColors.textPrimary, fontSize: 12),
                        items: const [
                          DropdownMenuItem(value: '', child: Text('All Classes')),
                          DropdownMenuItem(value: 'Class 11', child: Text('Class 11')),
                          DropdownMenuItem(value: 'Class 12', child: Text('Class 12')),
                        ],
                        onChanged: (v) {
                          _classFilter = v ?? '';
                          _fetchDoubts();
                        },
                        decoration: InputDecoration(
                          labelText: 'Class',
                          labelStyle: TextStyle(
                            color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                            fontSize: 12,
                          ),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          isDense: true,
                          fillColor: isDark ? AppColors.darkSurfaceElevated : AppColors.surfaceElevated,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        initialValue: _subjectFilter,
                        dropdownColor: isDark ? AppColors.darkSurfaceElevated : AppColors.surface,
                        style: TextStyle(color: isDark ? Colors.white : AppColors.textPrimary, fontSize: 12),
                        items: const [
                          DropdownMenuItem(value: '', child: Text('All Subjects')),
                          DropdownMenuItem(value: 'Physics', child: Text('Physics')),
                          DropdownMenuItem(value: 'Chemistry', child: Text('Chemistry')),
                          DropdownMenuItem(value: 'Biology', child: Text('Biology')),
                        ],
                        onChanged: (v) {
                          _subjectFilter = v ?? '';
                          _fetchDoubts();
                        },
                        decoration: InputDecoration(
                          labelText: 'Subject',
                          labelStyle: TextStyle(
                            color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                            fontSize: 12,
                          ),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          isDense: true,
                          fillColor: isDark ? AppColors.darkSurfaceElevated : AppColors.surfaceElevated,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),

          // Main Doubts List
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
                : _error.isNotEmpty
                    ? Center(
                        child: Padding(
                          padding: const EdgeInsets.all(24),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Icon(Icons.error_outline, size: 40, color: AppColors.danger),
                              const SizedBox(height: 12),
                              Text(
                                _error,
                                textAlign: TextAlign.center,
                                style: TextStyle(color: isDark ? Colors.white70 : AppColors.textPrimary),
                              ),
                              const SizedBox(height: 16),
                              FilledButton(
                                onPressed: _fetchDoubts,
                                child: const Text('Try Again'),
                              ),
                            ],
                          ),
                        ),
                      )
                    : _doubts.isEmpty
                        ? Center(
                            child: Padding(
                              padding: const EdgeInsets.all(32),
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Icon(
                                    Icons.inbox_outlined,
                                    size: 48,
                                    color: isDark ? Colors.grey.shade600 : Colors.grey.shade400,
                                  ),
                                  const SizedBox(height: 12),
                                  Text(
                                    'No doubts matching your filters.',
                                    style: TextStyle(
                                      color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          )
                        : RefreshIndicator(
                            color: AppColors.primary,
                            onRefresh: _fetchDoubts,
                            child: ListView.builder(
                              padding: const EdgeInsets.all(16),
                              itemCount: _doubts.length,
                              itemBuilder: (ctx, i) {
                                final doubt = _doubts[i];
                                final isBusy = _actionInProgressId == doubt.id;
                                final isPending = doubt.status.toLowerCase() == 'pending';
                                final isAssigned = doubt.status.toLowerCase() == 'assigned';
                                final statusColor = _getStatusColor(doubt.status);

                                return Container(
                                  margin: const EdgeInsets.only(bottom: 12),
                                  decoration: BoxDecoration(
                                    color: isDark ? AppColors.darkSurface : AppColors.surface,
                                    borderRadius: BorderRadius.circular(AppRadii.md),
                                    border: Border.all(
                                      color: isDark ? AppColors.darkBorder : AppColors.border,
                                      width: 1.1,
                                    ),
                                    boxShadow: isDark ? AppShadows.darkSoft : AppShadows.soft,
                                  ),
                                  child: InkWell(
                                    borderRadius: BorderRadius.circular(AppRadii.md),
                                    onTap: () async {
                                      await Navigator.of(context).push(
                                        MaterialPageRoute(
                                          builder: (_) => TeacherDoubtDetailScreen(doubtId: doubt.id),
                                        ),
                                      );
                                      _fetchDoubts();
                                    },
                                    child: Padding(
                                      padding: const EdgeInsets.all(16),
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Row(
                                            children: [
                                              Container(
                                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                                decoration: BoxDecoration(
                                                  color: AppColors.primary.withValues(alpha: 0.12),
                                                  borderRadius: BorderRadius.circular(6),
                                                ),
                                                child: Text(
                                                  '#${doubt.id}',
                                                  style: const TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                    color: AppColors.primary,
                                                    fontSize: 12,
                                                  ),
                                                ),
                                              ),
                                              const SizedBox(width: 8),
                                              Container(
                                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                                decoration: BoxDecoration(
                                                  color: isDark ? AppColors.darkSurfaceElevated : AppColors.surfaceElevated,
                                                  borderRadius: BorderRadius.circular(6),
                                                  border: Border.all(
                                                    color: isDark ? AppColors.darkBorderStrong : AppColors.border,
                                                  ),
                                                ),
                                                child: Text(
                                                  '${doubt.classLevel} • ${doubt.subject}',
                                                  style: TextStyle(
                                                    fontSize: 11,
                                                    fontWeight: FontWeight.w600,
                                                    color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                                                  ),
                                                ),
                                              ),
                                              const Spacer(),
                                              Container(
                                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                                decoration: BoxDecoration(
                                                  color: statusColor.withValues(alpha: 0.12),
                                                  borderRadius: BorderRadius.circular(6),
                                                  border: Border.all(color: statusColor.withValues(alpha: 0.3)),
                                                ),
                                                child: Text(
                                                  doubt.status.toUpperCase().replaceAll('_', ' '),
                                                  style: TextStyle(
                                                    color: statusColor,
                                                    fontWeight: FontWeight.bold,
                                                    fontSize: 10,
                                                  ),
                                                ),
                                              ),
                                            ],
                                          ),
                                          const SizedBox(height: 10),
                                          Text(
                                            doubt.title,
                                            maxLines: 2,
                                            overflow: TextOverflow.ellipsis,
                                            style: TextStyle(
                                              fontWeight: FontWeight.bold,
                                              fontSize: 15,
                                              color: isDark ? Colors.white : AppColors.textPrimary,
                                            ),
                                          ),
                                          if (doubt.description?.isNotEmpty == true) ...[
                                            const SizedBox(height: 6),
                                            Text(
                                              doubt.description!,
                                              maxLines: 2,
                                              overflow: TextOverflow.ellipsis,
                                              style: TextStyle(
                                                fontSize: 13,
                                                color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                                                height: 1.4,
                                              ),
                                            ),
                                          ],
                                          const SizedBox(height: 12),
                                          Row(
                                            children: [
                                              if (doubt.attachments.isNotEmpty) ...[
                                                Icon(
                                                  Icons.attach_file,
                                                  size: 15,
                                                  color: isDark ? AppColors.darkTextMuted : AppColors.textSecondary,
                                                ),
                                                const SizedBox(width: 4),
                                                Text(
                                                  '${doubt.attachments.length} attachment${doubt.attachments.length > 1 ? 's' : ''}',
                                                  style: TextStyle(
                                                    fontSize: 12,
                                                    color: isDark ? AppColors.darkTextMuted : AppColors.textSecondary,
                                                  ),
                                                ),
                                              ],
                                              const Spacer(),
                                              if (isPending)
                                                FilledButton(
                                                  style: FilledButton.styleFrom(
                                                    backgroundColor: AppColors.primary,
                                                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                                                    minimumSize: const Size(0, 36),
                                                    visualDensity: VisualDensity.compact,
                                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                                  ),
                                                  onPressed: isBusy ? null : () => _claimDoubt(doubt.id),
                                                  child: isBusy
                                                      ? const SizedBox(
                                                          width: 14,
                                                          height: 14,
                                                          child: CircularProgressIndicator(
                                                            strokeWidth: 2,
                                                            color: Colors.white,
                                                          ),
                                                        )
                                                      : const Text('Claim Doubt', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                                                ),
                                              if (isAssigned)
                                                FilledButton(
                                                  style: FilledButton.styleFrom(
                                                    backgroundColor: const Color(0xFF6366F1),
                                                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                                                    minimumSize: const Size(0, 36),
                                                    visualDensity: VisualDensity.compact,
                                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                                  ),
                                                  onPressed: isBusy ? null : () => _startSolving(doubt.id),
                                                  child: isBusy
                                                      ? const SizedBox(
                                                          width: 14,
                                                          height: 14,
                                                          child: CircularProgressIndicator(
                                                            strokeWidth: 2,
                                                            color: Colors.white,
                                                          ),
                                                        )
                                                      : const Text('Start Solving', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                                                ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                );
                              },
                            ),
                          ),
          ),
        ],
      ),
    );
  }
}
