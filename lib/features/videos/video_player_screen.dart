import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:video_player/video_player.dart';

import '../../theme/app_tokens.dart';

class VideoPlayerScreen extends StatefulWidget {
  const VideoPlayerScreen({
    super.key,
    required this.title,
    required this.subtitle,
    required this.videoUrl,
  });

  final String title;
  final String subtitle;
  final String videoUrl;

  @override
  State<VideoPlayerScreen> createState() => _VideoPlayerScreenState();
}

class _VideoPlayerScreenState extends State<VideoPlayerScreen> {
  late final VideoPlayerController _controller;
  Timer? _hideControlsTimer;
  bool _showControls = true;
  bool _muted = false;
  double _playbackSpeed = 1.0;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _initializeVideo();
  }

  Future<void> _initializeVideo() async {
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.landscapeLeft,
      DeviceOrientation.landscapeRight,
    ]);

    _controller = VideoPlayerController.networkUrl(
      Uri.parse(widget.videoUrl),
      videoPlayerOptions:  VideoPlayerOptions(mixWithOthers: true),
    );

    _controller.addListener(_videoListener);

    try {
      await _controller.initialize();
      if (!mounted) return;

      await _controller.play();
      _startHideControlsTimer();
      setState(() => _errorMessage = null);
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _errorMessage = 'Video load nahi ho paaya.\nInternet check karke Retry dabayein.';
      });
    }
  }

  void _videoListener() {
    if (!mounted) return;
    if (_controller.value.hasError) {
      setState(() {
        _errorMessage = 'Playback Error: ${_controller.value.errorDescription ?? "Unknown error"}';
      });
    }
    setState(() {});
  }

  @override
  void dispose() {
    _hideControlsTimer?.cancel();
    _controller.removeListener(_videoListener);
    _controller.dispose();
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
    SystemChrome.setPreferredOrientations(DeviceOrientation.values);
    super.dispose();
  }

  void _startHideControlsTimer() {
    _hideControlsTimer?.cancel();
    _hideControlsTimer = Timer(const Duration(seconds: 3), () {
      if (mounted && _controller.value.isPlaying) {
        setState(() => _showControls = false);
      }
    });
  }

  void _toggleControls() {
    setState(() => _showControls = !_showControls);
    if (_showControls) _startHideControlsTimer();
  }

  void _togglePlayback() {
    if (_controller.value.isPlaying) {
      _controller.pause();
    } else {
      _controller.play();
      _startHideControlsTimer();
    }
    setState(() {});
  }

  Future<void> _seekRelative(Duration delta) async {
    final position = _controller.value.position;
    final duration = _controller.value.duration;
    final target = position + delta;
    final clamped = target < Duration.zero
        ? Duration.zero
        : (target > duration ? duration : target);
    await _controller.seekTo(clamped);
  }

  void _toggleMute() {
    _muted = !_muted;
    _controller.setVolume(_muted ? 0 : 1);
    setState(() {});
  }

  void _cycleSpeed() {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    final index = speeds.indexOf(_playbackSpeed);
    _playbackSpeed = speeds[(index + 1) % speeds.length];
    _controller.setPlaybackSpeed(_playbackSpeed);
    setState(() {});
  }

  String _format(Duration d) {
    final minutes = d.inMinutes.remainder(60).toString().padLeft(2, '0');
    final seconds = d.inSeconds.remainder(60).toString().padLeft(2, '0');
    return d.inHours > 0
        ? '${d.inHours}:$minutes:$seconds'
        : '$minutes:$seconds';
  }

  @override
  Widget build(BuildContext context) {
    final value = _controller.value;
    final initialized = value.isInitialized;

    return Scaffold(
      backgroundColor: Colors.black,
      body: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: _toggleControls,
        child: Stack(
          fit: StackFit.expand,
          children: [
            // Video
            if (initialized)
              Center(
                child: AspectRatio(
                  aspectRatio: value.aspectRatio,
                  child: VideoPlayer(_controller),
                ),
              )
            else
              const Center(
                child: CircularProgressIndicator(color: Colors.white),
              ),

            // Error Message
            if (_errorMessage != null)
              Center(
                child: Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        _errorMessage!,
                        textAlign: TextAlign.center,
                        style: const TextStyle(color: Colors.white, fontSize: 16),
                      ),
                      const SizedBox(height: 20),
                      FilledButton.icon(
                        onPressed: _initializeVideo,
                        icon: const Icon(Icons.refresh_rounded),
                        label: const Text('Retry'),
                      ),
                    ],
                  ),
                ),
              ),

            // Controls
            if (_showControls || !value.isPlaying)
              Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Color(0xAA000000), Color(0x22000000), Color(0xCC000000)],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                ),
              ),

            if (_showControls || !value.isPlaying)
              SafeArea(
                child: Padding(
                  padding: const EdgeInsets.all(AppSpacing.md),
                  child: Column(
                    children: [
                      // Top Bar
                      Row(
                        children: [
                          IconButton(
                            onPressed: () => Navigator.pop(context),
                            icon: const Icon(Icons.arrow_back_rounded, color: Colors.white),
                          ),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(widget.title,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                                Text(widget.subtitle,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(color: Colors.white70, fontSize: 13)),
                              ],
                            ),
                          ),
                        ],
                      ),

                      const Spacer(),

                      // Center Play/Pause Buttons
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          _RoundControlButton(
                            icon: Icons.replay_10_rounded,
                            onPressed: initialized ? () => _seekRelative(const Duration(seconds: -10)) : null,
                          ),
                          const SizedBox(width: 40),
                          _RoundControlButton(
                            icon: value.isPlaying ? Icons.pause_rounded : Icons.play_arrow_rounded,
                            size: 74,
                            onPressed: initialized ? _togglePlayback : null,
                          ),
                          const SizedBox(width: 40),
                          _RoundControlButton(
                            icon: Icons.forward_10_rounded,
                            onPressed: initialized ? () => _seekRelative(const Duration(seconds: 10)) : null,
                          ),
                        ],
                      ),

                      const Spacer(),

                      // Bottom Controls
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
                        child: Column(
                          children: [
                            SliderTheme(
                              data: SliderTheme.of(context).copyWith(
                                activeTrackColor: AppColors.primary,
                                inactiveTrackColor: Colors.white24,
                                thumbColor: Colors.white,
                                trackHeight: 4,
                              ),
                              child: Slider(
                                value: initialized ? value.position.inMilliseconds.toDouble().clamp(0, value.duration.inMilliseconds.toDouble()) : 0,
                                max: initialized ? value.duration.inMilliseconds.toDouble() : 1,
                                onChanged: initialized
                                    ? (val) => _controller.seekTo(Duration(milliseconds: val.toInt()))
                                    : null,
                              ),
                            ),
                            Row(
                              children: [
                                Text(_format(value.position), style: const TextStyle(color: Colors.white)),
                                const Spacer(),
                                Text(_format(value.duration), style: const TextStyle(color: Colors.white70)),
                                const SizedBox(width: 16),
                                IconButton(
                                  onPressed: initialized ? _toggleMute : null,
                                  icon: Icon(_muted ? Icons.volume_off : Icons.volume_up, color: Colors.white),
                                ),
                                TextButton(
                                  onPressed: initialized ? _cycleSpeed : null,
                                  child: Text('${_playbackSpeed.toStringAsFixed(1)}x',
                                      style: const TextStyle(color: Colors.white)),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _RoundControlButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback? onPressed;
  final double size;

  const _RoundControlButton({
    required this.icon,
    required this.onPressed,
    this.size = 58,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white.withOpacity(0.2),
      shape: const CircleBorder(),
      child: InkWell(
        customBorder: const CircleBorder(),
        onTap: onPressed,
        child: SizedBox(
          width: size,
          height: size,
          child: Icon(icon, color: Colors.white, size: size * 0.45),
        ),
      ),
    );
  }
}