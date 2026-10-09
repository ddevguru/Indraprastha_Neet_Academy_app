import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/access/content_access.dart';
import '../../core/providers/app_state.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import '../../widgets/content_lock.dart';
import '../../widgets/fast_network_image.dart';
import '../../core/utils/video_url_utils.dart';
import 'video_player_screen.dart';

class VideosScreen extends ConsumerWidget {
  const VideosScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final hasSubscription =
        ref.watch(appUiControllerProvider).hasActiveSubscription ||
            (ref.watch(authBlocProvider).state.user?.hasActiveSubscription ??
                false);
    final videosFuture = ref.read(contentRepositoryProvider).fetchVideos();

    return SingleChildScrollView(
      padding: mobileScrollPadding(context),
      child: CenteredContent(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SectionHeader(
              title: 'Videos',
              subtitle: 'Full NEET video library — all batches.',
            ),
            if (!hasSubscription) ...[
              const SizedBox(height: AppSpacing.md),
              const FreePreviewBanner(),
            ],
            const SizedBox(height: AppSpacing.lg),
            const SearchBarWidget(hint: 'Search chapters and video topics'),
            const SizedBox(height: AppSpacing.xl),

            FutureBuilder<List<Map<String, dynamic>>>(
                future: videosFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const SkeletonLoader(cardCount: 4);
                  }
                  if (snapshot.hasError) {
                    return EmptyStateWidget(
                      title: 'Unable to load videos',
                      subtitle: snapshot.error.toString(),
                      icon: Icons.error_outline_rounded,
                    );
                  }
                  final videos = snapshot.data ?? const [];
                  if (videos.isEmpty) {
                    return const EmptyStateWidget(
                      title: 'No videos available',
                      subtitle: 'Uploaded video lectures will appear here.',
                      icon: Icons.video_library_outlined,
                    );
                  }
                  return Column(
                    children: [
                      ...videos.asMap().entries.map((entry) {
                      final video = entry.value;
                      final locked = !ContentAccess.isItemUnlocked(
                        index: entry.key,
                        hasActiveSubscription: hasSubscription,
                      );
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
                          onTap: () => ContentAccess.handleTap(
                            context: context,
                            locked: locked,
                            onUnlocked: () =>
                                _openVideo(context, video, driveLink),
                          ),
                          borderRadius: BorderRadius.circular(AppRadii.lg),
                          child: Opacity(
                            opacity: locked ? 0.72 : 1,
                            child: SurfaceCard(
                              child: Row(
                                children: [
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(12),
                                  child: FastNetworkImage(
                                    url: teacherAvatar,
                                    width: 64,
                                    height: 64,
                                    fit: BoxFit.cover,
                                    thumbWidth: 200,
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
                                              color: Theme.of(context).colorScheme.onSurfaceVariant,
                                            ),
                                      ),
                                    ],
                                  ),
                                ),
                                Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(
                                      locked
                                          ? Icons.lock_rounded
                                          : Icons.play_circle_fill_rounded,
                                      size: 42,
                                      color: locked ? AppColors.gold : AppColors.indigo,
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    );
                    }),
                    ],
                  );
                },
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
    if (url.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Video link missing for this item.')),
      );
      return;
    }
    final playableUrl = resolveInAppEmbedUrl(url);
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => VideoPlayerScreen(
          title: video['title']?.toString() ?? 'Video Lecture',
          subtitle:
              '${video['subject'] ?? ''} • ${video['chapter_hint'] ?? video['topic'] ?? ''}',
          videoUrl: playableUrl,
          fallbackUrl: url,
        ),
      ),
    );
  }
}