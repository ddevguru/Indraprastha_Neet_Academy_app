import 'dart:async';

import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../theme/app_tokens.dart';

class HomeImageSlider extends StatefulWidget {
  const HomeImageSlider({
    super.key,
    required this.images,
  });

  final List<Map<String, dynamic>> images;

  @override
  State<HomeImageSlider> createState() => _HomeImageSliderState();
}

class _HomeImageSliderState extends State<HomeImageSlider> {
  late final PageController _pageController;
  Timer? _timer;
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    _pageController = PageController(initialPage: 0);
    _startAutoSlide();
  }

  void _startAutoSlide() {
    if (widget.images.length <= 1) return;
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 4), (timer) {
      if (!mounted || !_pageController.hasClients) return;
      final nextIndex = (_currentIndex + 1) % widget.images.length;
      _pageController.animateToPage(
        nextIndex,
        duration: const Duration(milliseconds: 600),
        curve: Curves.easeInOutCubic,
      );
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _pageController.dispose();
    super.dispose();
  }

  Future<void> _handleBannerTap(String? link) async {
    if (link == null || link.trim().isEmpty) return;
    final uri = Uri.tryParse(link.trim());
    if (uri != null && await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (widget.images.isEmpty) return const SizedBox.shrink();

    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      children: [
        SizedBox(
          height: 160,
          child: PageView.builder(
            controller: _pageController,
            onPageChanged: (index) {
              setState(() {
                _currentIndex = index;
              });
            },
            itemCount: widget.images.length,
            itemBuilder: (context, index) {
              final item = widget.images[index];
              final imageUrl = item['image_url']?.toString() ?? '';
              final title = item['title']?.toString() ?? '';
              final targetLink = item['target_link']?.toString();

              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 2.0),
                child: Material(
                  color: Colors.transparent,
                  borderRadius: BorderRadius.circular(AppRadii.xl),
                  clipBehavior: Clip.antiAlias,
                  child: InkWell(
                    onTap: () => _handleBannerTap(targetLink),
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(AppRadii.xl),
                        color: isDark ? const Color(0xFF1E2330) : const Color(0xFFF0F4F8),
                        boxShadow: AppShadows.soft,
                      ),
                      child: Stack(
                        fit: StackFit.expand,
                        children: [
                          if (imageUrl.isNotEmpty)
                            Image.network(
                              imageUrl,
                              fit: BoxFit.cover,
                              loadingBuilder: (context, child, loadingProgress) {
                                if (loadingProgress == null) return child;
                                return Center(
                                  child: CircularProgressIndicator(
                                    strokeWidth: 2,
                                    value: loadingProgress.expectedTotalBytes != null
                                        ? loadingProgress.cumulativeBytesLoaded /
                                            loadingProgress.expectedTotalBytes!
                                        : null,
                                  ),
                                );
                              },
                              errorBuilder: (context, error, stackTrace) {
                                return Container(
                                  color: isDark
                                      ? const Color(0xFF252A35)
                                      : const Color(0xFFE2E8F0),
                                  alignment: Alignment.center,
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Icon(
                                        Icons.image_not_supported_outlined,
                                        color: isDark ? Colors.white54 : Colors.grey,
                                        size: 32,
                                      ),
                                      if (title.isNotEmpty) ...[
                                        const SizedBox(height: 6),
                                        Text(
                                          title,
                                          style: TextStyle(
                                            color: isDark ? Colors.white70 : Colors.black87,
                                            fontWeight: FontWeight.w600,
                                            fontSize: 13,
                                          ),
                                        ),
                                      ],
                                    ],
                                  ),
                                );
                              },
                            )
                          else
                            Container(
                              color: AppColors.primary,
                              alignment: Alignment.center,
                              child: Text(
                                title.isNotEmpty ? title : 'Indraprastha NEET Academy',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                            ),
                          // Subtle gradient overlay for title legibility
                          if (title.isNotEmpty)
                            Positioned(
                              left: 0,
                              right: 0,
                              bottom: 0,
                              child: Container(
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  gradient: LinearGradient(
                                    colors: [
                                      Colors.transparent,
                                      Colors.black.withValues(alpha: 0.8),
                                    ],
                                    begin: Alignment.topCenter,
                                    end: Alignment.bottomCenter,
                                  ),
                                ),
                                child: Text(
                                  title,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold,
                                    shadows: [
                                      Shadow(
                                        color: Colors.black45,
                                        blurRadius: 4,
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                        ],
                      ),
                    ),
                  ),
                ),
              );
            },
          ),
        ),
        if (widget.images.length > 1) ...[
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(
              widget.images.length,
              (index) {
                final isSelected = index == _currentIndex;
                return AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  margin: const EdgeInsets.symmetric(horizontal: 3),
                  width: isSelected ? 18 : 6,
                  height: 6,
                  decoration: BoxDecoration(
                    color: isSelected
                        ? AppColors.primary
                        : (isDark ? Colors.white30 : Colors.black26),
                    borderRadius: BorderRadius.circular(3),
                  ),
                );
              },
            ),
          ),
        ],
      ],
    );
  }
}
