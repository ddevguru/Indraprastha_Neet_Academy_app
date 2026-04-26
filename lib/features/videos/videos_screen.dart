import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../core/providers/app_state.dart';
import '../content/data/content_repository.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import 'video_player_screen.dart';

class VideosScreen extends ConsumerWidget {
  const VideosScreen({super.key});

  static const _rankProPlan = 'Rank Pro';

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final plan = ref.watch(appUiControllerProvider).selectedPlan;
    final isRankPro = plan == _rankProPlan;
    final videosFuture = ContentRepository().fetchVideos();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppSpacing.lg),
      child: CenteredContent(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SectionHeader(
              title: 'Videos',
              subtitle: isRankPro
                  ? 'Rank Pro: Full NEET Video Library'
                  : 'Unlock complete video library with Rank Pro',
            ),
            const SizedBox(height: AppSpacing.lg),
            const SearchBarWidget(hint: 'Search chapters and video topics'),
            const SizedBox(height: AppSpacing.xl),

            if (!isRankPro) ...[
              // Upgrade Prompt
              SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.lock_outline_rounded,
                            color: Theme.of(context).colorScheme.primary),
                        const SizedBox(width: AppSpacing.sm),
                        const Expanded(
                          child: Text(
                            'Rank Pro Required',
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    const Text(
                      'Subscribe to Rank Pro to unlock all videos including Embryology, Anatomy, etc.',
                    ),
                    const SizedBox(height: AppSpacing.md),
                    PrimaryButton(
                      label: 'View Rank Pro Plans',
                      expanded: true,
                      icon: Icons.workspace_premium_rounded,
                      onPressed: () => context.push('/subscriptions'),
                    ),
                  ],
                ),
              ),
            ] else ...[
              FutureBuilder<List<Map<String, dynamic>>>(
                future: videosFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  }
                  final videos = snapshot.data ?? const [];
                  if (videos.isEmpty) {
                    return const EmptyStateWidget(
                      title: 'No videos available',
                      subtitle: 'Admin panel se videos upload karne ke baad yahan dikhenge.',
                      icon: Icons.video_library_outlined,
                    );
                  }
                  return Column(
                    children: videos.map((video) {
                      final subject = video['subject']?.toString() ?? 'Faculty';
                      final chapterHint =
                          (video['chapter_hint']?.toString().isNotEmpty ?? false)
                              ? video['chapter_hint']?.toString() ?? ''
                              : (video['topic']?.toString() ?? '');
                      final duration = video['duration_label']?.toString() ?? '15 min';
                      final section = video['section_label']?.toString() ?? 'Concept explainers';
                      final driveLink = video['drive_link']?.toString() ?? '';
                      final teacherAvatar =
                          'https://ui-avatars.com/api/?name=${Uri.encodeComponent(subject)}&background=4F5DE4&color=ffffff&size=128';
                      return Padding(
                        padding: const EdgeInsets.only(bottom: AppSpacing.md),
                        child: InkWell(
                          onTap: () => _openVideo(context, video, driveLink),
                          borderRadius: BorderRadius.circular(AppRadii.lg),
                          child: SurfaceCard(
                            child: Row(
                              children: [
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(12),
                                  child: Image.network(
                                    teacherAvatar,
                                    width: 64,
                                    height: 64,
                                    fit: BoxFit.cover,
                                    errorBuilder: (context, error, stackTrace) => Container(
                                      width: 64,
                                      height: 64,
                                      color: AppColors.indigoSoft,
                                      child: const Icon(
                                        Icons.person_rounded,
                                        color: AppColors.indigo,
                                      ),
                                    ),
                                  ),
                                ),
                                const SizedBox(width: AppSpacing.lg),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        video['title']?.toString() ?? 'Video',
                                        style: Theme.of(context).textTheme.titleMedium,
                                      ),
                                      const SizedBox(height: 6),
                                      Text(
                                        '$subject • $chapterHint • $duration',
                                        style: Theme.of(context).textTheme.bodyMedium,
                                      ),
                                      const SizedBox(height: 4),
                                      Text(
                                        section,
                                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                              color: AppColors.textSecondary,
                                            ),
                                      ),
                                    ],
                                  ),
                                ),
                                Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: const [
                                    Icon(
                                      Icons.play_circle_fill_rounded,
                                      size: 42,
                                      color: AppColors.indigo,
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  );
                },
              ),
            ],

            const SizedBox(height: AppSpacing.xl),
            const EmptyStateWidget(
              title: 'More videos coming soon',
              subtitle: 'Full syllabus coverage with detailed explanations',
              icon: Icons.video_library_outlined,
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _openVideo(
    BuildContext context,
    Map<String, dynamic> video,
    String url,
  ) async {
    if (url.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Video link missing for this item.')),
      );
      return;
    }
    final playableUrl = _toPlayableVideoUrl(url);
    final isDirectPlayable =
        playableUrl.contains('.mp4') ||
        playableUrl.contains('storage.googleapis.com') ||
        playableUrl.contains('googleusercontent.com') ||
        playableUrl.contains('drive.google.com/uc?');
    if (isDirectPlayable) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => VideoPlayerScreen(
            title: video['title']?.toString() ?? 'Video',
            subtitle:
                '${video['subject'] ?? ''} • ${video['chapter_hint'] ?? video['topic'] ?? ''}',
            videoUrl: playableUrl,
            fallbackUrl: url,
          ),
        ),
      );
      return;
    }
    final launched = await launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication);
    if (!launched && context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Unable to open video link')),
      );
    }
  }

  String _toPlayableVideoUrl(String raw) {
    final uri = Uri.tryParse(raw);
    if (uri == null) return raw;
    if (!raw.contains('drive.google.com')) return raw;
    final id = _extractGoogleDriveFileId(uri);
    if (id == null || id.isEmpty) return raw;
    return 'https://drive.google.com/uc?export=download&id=$id';
  }

  String? _extractGoogleDriveFileId(Uri uri) {
    final idFromQuery = uri.queryParameters['id'];
    if (idFromQuery != null && idFromQuery.isNotEmpty) {
      return idFromQuery;
    }
    final segments = uri.pathSegments;
    final fileIndex = segments.indexOf('d');
    if (fileIndex >= 0 && fileIndex + 1 < segments.length) {
      return segments[fileIndex + 1];
    }
    final alt = RegExp(r'/file/d/([^/]+)').firstMatch(uri.toString());
    if (alt != null) return alt.group(1);
    return null;
  }
}