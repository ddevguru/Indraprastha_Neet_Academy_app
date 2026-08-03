import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../core/providers/app_state.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';

class HelpCenterScreen extends ConsumerStatefulWidget {
  const HelpCenterScreen({super.key});

  @override
  ConsumerState<HelpCenterScreen> createState() => _HelpCenterScreenState();
}

class _HelpCenterScreenState extends ConsumerState<HelpCenterScreen> {
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  bool _isSubmitting = false;

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  Future<void> _submitComplaint() async {
    if (_titleController.text.isEmpty || _descriptionController.text.isEmpty) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill in all fields')),
      );
      return;
    }

    setState(() => _isSubmitting = true);
    try {
      final repo = ref.read(contentRepositoryProvider);

      // Submit complaint to backend
      await repo.submitComplaint(
        title: _titleController.text.trim(),
        description: _descriptionController.text.trim(),
      );

      if (!mounted) return;

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Complaint submitted successfully! We\'ll review it shortly.'),
          backgroundColor: Colors.green,
          duration: Duration(seconds: 3),
        ),
      );
      _titleController.clear();
      _descriptionController.clear();
    } catch (e) {
      if (!mounted) return;
      final errorMsg = e.toString()
          .replaceFirst('Exception: ', '')
          .replaceFirst('FormatException: ', '');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error: $errorMsg'),
          backgroundColor: Colors.red,
          duration: const Duration(seconds: 5),
        ),
      );
    } finally {
      if (mounted) setState(() => _isSubmitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Help Center')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: CenteredContent(
          maxWidth: 900,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Report an Issue',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w800,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: AppSpacing.sm),
              Text(
                'Tell us about any issues you\'re facing in the app or with your tests. Include images if needed.',
                style: TextStyle(
                  fontSize: 14,
                  color: AppColors.textSecondary,
                ),
              ),
              const SizedBox(height: AppSpacing.lg),
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Title
                    const Text(
                      'Issue Title',
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    TextField(
                      controller: _titleController,
                      decoration: InputDecoration(
                        hintText: 'e.g., Practice set not loading',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(AppRadii.md),
                        ),
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: AppSpacing.md,
                          vertical: AppSpacing.sm,
                        ),
                      ),
                      maxLines: 1,
                    ),
                    const SizedBox(height: AppSpacing.lg),

                    // Description
                    const Text(
                      'Description',
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    TextField(
                      controller: _descriptionController,
                      decoration: InputDecoration(
                        hintText: 'Describe the issue in detail...',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(AppRadii.md),
                        ),
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: AppSpacing.md,
                          vertical: AppSpacing.sm,
                        ),
                      ),
                      maxLines: 5,
                    ),
                    const SizedBox(height: AppSpacing.lg),

                    // Submit Button
                    SizedBox(
                      width: double.infinity,
                      child: PrimaryButton(
                        label: _isSubmitting ? 'Submitting...' : 'Submit Complaint',
                        onPressed: _isSubmitting ? null : _submitComplaint,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.xl),
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Need Quick Help?',
                      style: TextStyle(
                        fontWeight: FontWeight.w700,
                        fontSize: 16,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    _HelpTile(
                      icon: Icons.chat_bubble_outline_rounded,
                      title: 'Join Our Mentorship',
                      subtitle: 'Get help from mentors on Telegram',
                      onTap: () async {
                        final uri = Uri.parse('https://t.me/+yiL4ctVZQVMwNDY1');
                        await launchUrl(uri, mode: LaunchMode.externalApplication);
                      },
                    ),
                    const SizedBox(height: AppSpacing.md),
                    _HelpTile(
                      icon: Icons.mail_outline_rounded,
                      title: 'Email Us',
                      subtitle: 'contact@indraprasthaneetacademy.com',
                      onTap: () async {
                        final uri = Uri(
                          scheme: 'mailto',
                          path: 'contact@indraprasthaneetacademy.com',
                          queryParameters: {
                            'subject': 'Help Request from Indraprastha App',
                          },
                        );
                        await launchUrl(uri);
                      },
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _HelpTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  const _HelpTile({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(AppRadii.md),
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.md),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.primary.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(AppRadii.md),
              ),
              child: Icon(icon, color: AppColors.primary, size: 24),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(Icons.chevron_right_rounded, color: AppColors.textSecondary),
          ],
        ),
      ),
    );
  }
}
