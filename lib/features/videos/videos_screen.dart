import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/data/dummy_data.dart';
import '../../core/providers/app_state.dart';
import '../../models/app_models.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import 'video_player_screen.dart';

class VideosScreen extends ConsumerWidget {
  const VideosScreen({super.key});

  static const _rankProPlan = 'Rank Pro';

  static const _playableVideoUrls = [
    'https://flutter.github.io/assets-for-api-docs/assets/videos/butterfly.mp4',
    'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
    'https://www.w3schools.com/html/mov_bbb.mp4',
  ];

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final plan = ref.watch(appUiControllerProvider).selectedPlan;
    final isRankPro = plan == _rankProPlan;

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
              // Video List for Rank Pro Users
              ...DummyData.neetVideos.asMap().entries.map((entry) {
                final index = entry.key;
                final video = entry.value;

                return Padding(
                  padding: const EdgeInsets.only(bottom: AppSpacing.md),
                  child: InkWell(
                    onTap: () => _openPlayer(
                      context,
                      video: video,
                      videoUrl: _playableVideoUrls[index % _playableVideoUrls.length],
                    ),
                    borderRadius: BorderRadius.circular(AppRadii.lg),
                    child: SurfaceCard(
                      child: Row(
                        children: [
                          // Instructor Photo (like your screenshot)
                          ClipRRect(
                            borderRadius: BorderRadius.circular(8),
                            child: Image.network(
                              video.instructorImage ?? 'https://via.placeholder.com/64x64/1e88e5/ffffff?text=Dr',
                              width: 64,
                              height: 64,
                              fit: BoxFit.cover,
                              errorBuilder: (context, error, stackTrace) => Container(
                                width: 64,
                                height: 64,
                                color: Colors.grey[800],
                                child: const Icon(Icons.person, color: Colors.white, size: 32),
                              ),
                            ),
                          ),
                          const SizedBox(width: AppSpacing.lg),

                          // Video Info
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  video.title,
                                  style: Theme.of(context).textTheme.titleMedium,
                                ),
                                const SizedBox(height: 6),
                                Text(
                                  '${video.subject.label} • ${video.chapterHint} • ${video.durationLabel}',
                                  style: Theme.of(context).textTheme.bodyMedium,
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  video.sectionLabel,
                                  style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.grey[600]),
                                ),
                              ],
                            ),
                          ),

                          // Rating & Play Button
                          Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Row(
                                children: [
                                  const Icon(Icons.star_rounded, color: Colors.amber, size: 18),
                                  Text(' ${video.rating}', 
                                       style: const TextStyle(fontWeight: FontWeight.bold)),
                                ],
                              ),
                              const SizedBox(height: 12),
                              const Icon(
                                Icons.play_circle_fill_rounded,
                                size: 42,
                                color: Colors.blue,
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              }),
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

  void _openPlayer(BuildContext context, {required NeetVideoItem video, required String videoUrl}) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => VideoPlayerScreen(
          title: video.title,
          subtitle: '${video.subject.label} • ${video.chapterHint}',
          videoUrl: videoUrl,
        ),
      ),
    );
  }
}