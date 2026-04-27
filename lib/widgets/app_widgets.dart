import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import '../models/app_models.dart';
import '../theme/app_tokens.dart';

class CenteredContent extends StatelessWidget {
  const CenteredContent({
    super.key,
    required this.child,
    this.maxWidth = 1180,
  });

  final Widget child;
  final double maxWidth;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ConstrainedBox(
        constraints: BoxConstraints(maxWidth: maxWidth),
        child: child,
      ),
    );
  }
}

class SurfaceCard extends StatelessWidget {
  const SurfaceCard({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(AppSpacing.lg),
    this.borderRadius = AppRadii.lg,
    this.gradient,
    this.borderColor,
  });

  final Widget child;
  final EdgeInsets padding;
  final double borderRadius;
  final Gradient? gradient;
  final Color? borderColor;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Container(
      padding: padding,
      decoration: BoxDecoration(
        color: gradient == null ? Theme.of(context).cardColor : null,
        gradient: gradient ?? (isDark ? null : AppGradients.softSurface),
        borderRadius: BorderRadius.circular(borderRadius),
        border: Border.all(color: borderColor ?? scheme.outlineVariant),
        boxShadow: AppShadows.soft,
      ),
      child: child,
    );
  }
}

class PrimaryButton extends StatelessWidget {
  const PrimaryButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.icon,
    this.expanded = false,
  });

  final String label;
  final VoidCallback? onPressed;
  final IconData? icon;
  final bool expanded;

  @override
  Widget build(BuildContext context) {
    final button = FilledButton.icon(
      onPressed: onPressed,
      style: FilledButton.styleFrom(
        minimumSize: const Size.fromHeight(52),
        backgroundColor: AppColors.indigo,
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
        textStyle: const TextStyle(fontWeight: FontWeight.w700),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadii.md),
        ),
      ),
      icon: icon == null ? const SizedBox.shrink() : Icon(icon, size: 18),
      label: Text(label),
    );

    if (expanded) {
      return SizedBox(width: double.infinity, child: button);
    }
    return button;
  }
}

class SecondaryButton extends StatelessWidget {
  const SecondaryButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.icon,
    this.expanded = false,
  });

  final String label;
  final VoidCallback? onPressed;
  final IconData? icon;
  final bool expanded;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final button = OutlinedButton.icon(
      onPressed: onPressed,
      style: OutlinedButton.styleFrom(
        minimumSize: const Size.fromHeight(52),
        foregroundColor: scheme.onSurface,
        side: BorderSide(color: scheme.outlineVariant),
        backgroundColor: scheme.surfaceContainerHighest.withValues(alpha: 0.35),
        textStyle: const TextStyle(fontWeight: FontWeight.w700),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadii.md),
        ),
      ),
      icon: icon == null ? const SizedBox.shrink() : Icon(icon, size: 18),
      label: Text(label),
    );

    if (expanded) {
      return SizedBox(width: double.infinity, child: button);
    }
    return button;
  }
}

class AppTextField extends StatelessWidget {
  const AppTextField({
    super.key,
    required this.label,
    this.hint,
    this.controller,
    this.keyboardType,
    this.validator,
    this.prefixIcon,
    this.maxLines = 1,
  });

  final String label;
  final String? hint;
  final TextEditingController? controller;
  final TextInputType? keyboardType;
  final String? Function(String?)? validator;
  final IconData? prefixIcon;
  final int maxLines;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      keyboardType: keyboardType,
      validator: validator,
      maxLines: maxLines,
      decoration: InputDecoration(
        labelText: label,
        hintText: hint,
        prefixIcon: prefixIcon == null ? null : Icon(prefixIcon, size: 20),
      ),
    );
  }
}

class PasswordField extends StatefulWidget {
  const PasswordField({
    super.key,
    required this.label,
    this.controller,
    this.validator,
  });

  final String label;
  final TextEditingController? controller;
  final String? Function(String?)? validator;

  @override
  State<PasswordField> createState() => _PasswordFieldState();
}

class _PasswordFieldState extends State<PasswordField> {
  bool _obscure = true;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: widget.controller,
      obscureText: _obscure,
      validator: widget.validator,
      decoration: InputDecoration(
        labelText: widget.label,
        prefixIcon: const Icon(Icons.lock_outline_rounded, size: 20),
        suffixIcon: IconButton(
          onPressed: () => setState(() => _obscure = !_obscure),
          icon: Icon(
            _obscure
                ? Icons.visibility_off_rounded
                : Icons.visibility_rounded,
          ),
        ),
      ),
    );
  }
}

class SectionHeader extends StatelessWidget {
  const SectionHeader({
    super.key,
    required this.title,
    required this.subtitle,
    this.actionLabel,
    this.onAction,
  });

  final String title;
  final String subtitle;
  final String? actionLabel;
  final VoidCallback? onAction;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: AppSpacing.xs),
              Text(subtitle),
            ],
          ),
        ),
        if (actionLabel != null)
          TextButton(onPressed: onAction, child: Text(actionLabel!)),
      ],
    );
  }
}

class SearchBarWidget extends StatelessWidget {
  const SearchBarWidget({
    super.key,
    this.hint = 'Search chapters, PYQs, notes, and tests',
  });

  final String hint;

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      padding: EdgeInsets.zero,
      borderRadius: AppRadii.xl,
      child: TextField(
        decoration: InputDecoration(
          hintText: hint,
          prefixIcon: const Icon(Icons.search_rounded),
          suffixIcon: const Icon(Icons.tune_rounded),
          filled: true,
          fillColor: Colors.transparent,
          enabledBorder: InputBorder.none,
          focusedBorder: InputBorder.none,
          border: InputBorder.none,
        ),
      ),
    );
  }
}

class SubjectCard extends StatelessWidget {
  const SubjectCard({super.key, required this.progress});

  final SubjectProgress progress;

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                radius: 20,
                backgroundColor: AppColors.indigoSoft,
                child: Icon(progress.subject.icon, color: AppColors.indigo),
              ),
              const Spacer(),
              Text(
                '${(progress.accuracy * 100).round()}% accuracy',
                style: Theme.of(context).textTheme.labelMedium,
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.md),
          Text(progress.subject.label, style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: AppSpacing.xs),
          Text('${progress.pendingTopics} topics left'),
          const SizedBox(height: AppSpacing.md),
          LinearProgressIndicator(
            value: progress.coverage,
            minHeight: 8,
            borderRadius: BorderRadius.circular(99),
            backgroundColor: AppColors.indigoSoft,
          ),
          const SizedBox(height: AppSpacing.xs),
          Text('Coverage ${(progress.coverage * 100).round()}%'),
        ],
      ),
    );
  }
}

class BookCard extends StatelessWidget {
  const BookCard({
    super.key,
    required this.book,
    required this.onTap,
    required this.onBookmark,
    required this.isBookmarked,
  });

  final BookItem book;
  final VoidCallback onTap;
  final VoidCallback onBookmark;
  final bool isBookmarked;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(AppRadii.lg),
      child: SurfaceCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                _Tag(text: book.subject.label),
                const Spacer(),
                IconButton(
                  onPressed: onBookmark,
                  icon: Icon(
                    isBookmarked
                        ? Icons.bookmark_rounded
                        : Icons.bookmark_border_rounded,
                    color: AppColors.indigo,
                  ),
                ),
              ],
            ),
            Text(book.title, style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: AppSpacing.xs),
            Text('${book.level} . ${book.chapterCount} chapters'),
            const SizedBox(height: AppSpacing.md),
            LinearProgressIndicator(
              value: book.progress,
              minHeight: 8,
              borderRadius: BorderRadius.circular(99),
              backgroundColor: AppColors.indigoSoft,
            ),
            const SizedBox(height: AppSpacing.sm),
            Row(
              children: [
                Text('Progress ${(book.progress * 100).round()}%'),
                const Spacer(),
                Text(book.lastOpened),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class TestCard extends StatelessWidget {
  const TestCard({
    super.key,
    required this.test,
    required this.onTap,
  });

  final TestItem test;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(AppRadii.lg),
      child: SurfaceCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                _Tag(text: test.category),
                const Spacer(),
                Icon(
                  test.completed
                      ? Icons.check_circle_rounded
                      : Icons.schedule_rounded,
                  color: test.completed ? AppColors.success : AppColors.indigo,
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(test.title, style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: AppSpacing.xs),
            Text(
              '${test.questions} questions . ${test.durationMinutes} mins . ${test.marks} marks',
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(test.syllabusCoverage),
            const SizedBox(height: AppSpacing.md),
            Text(
              test.completed ? 'Score ${test.scoreLabel}' : test.scheduleLabel,
              style: Theme.of(context).textTheme.labelLarge,
            ),
          ],
        ),
      ),
    );
  }
}

class StatCard extends StatelessWidget {
  const StatCard({
    super.key,
    required this.title,
    required this.value,
    required this.subtitle,
    this.icon,
  });

  final String title;
  final String value;
  final String subtitle;
  final IconData? icon;

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (icon != null)
            CircleAvatar(
              radius: 18,
              backgroundColor: AppColors.indigoSoft,
              child: Icon(icon, size: 18, color: AppColors.indigo),
            ),
          if (icon != null) const SizedBox(height: AppSpacing.md),
          Text(title, style: Theme.of(context).textTheme.bodyMedium),
          const SizedBox(height: AppSpacing.xs),
          Text(value, style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: AppSpacing.xs),
          Text(subtitle),
        ],
      ),
    );
  }
}

class PlanCard extends StatelessWidget {
  const PlanCard({
    super.key,
    required this.plan,
    required this.active,
    required this.onSelect,
  });

  final SubscriptionPlan plan;
  final bool active;
  final VoidCallback onSelect;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: plan.isRecommended ? AppGradients.primary : null,
        color: plan.isRecommended ? null : Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(AppRadii.lg),
        border: Border.all(
          color: plan.isRecommended ? Colors.transparent : AppColors.border,
        ),
        boxShadow: AppShadows.soft,
      ),
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Text(
                  plan.name,
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        color: plan.isRecommended ? Colors.white : null,
                      ),
                ),
                const Spacer(),
                if (active)
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.sm,
                      vertical: AppSpacing.xs,
                    ),
                    decoration: BoxDecoration(
                      color: active
                          ? (plan.isRecommended
                              ? Colors.white24
                              : AppColors.indigoSoft)
                          : null,
                      borderRadius: BorderRadius.circular(99),
                    ),
                    child: Text(
                      'Active',
                      style: TextStyle(
                        color: plan.isRecommended ? Colors.white : AppColors.indigo,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              plan.priceLabel,
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    color: plan.isRecommended ? Colors.white : null,
                  ),
            ),
            const SizedBox(height: AppSpacing.xs),
            Text(
              '${plan.validity} . ${plan.highlight}',
              style: TextStyle(
                color: plan.isRecommended
                    ? Colors.white70
                    : Theme.of(context).colorScheme.onSurfaceVariant,
              ),
            ),
            const SizedBox(height: AppSpacing.md),
            ...plan.features.map(
              (feature) => Padding(
                padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Icon(
                      Icons.check_circle_rounded,
                      size: 18,
                      color: plan.isRecommended ? Colors.white : AppColors.success,
                    ),
                    const SizedBox(width: AppSpacing.sm),
                    Expanded(
                      child: Text(
                        feature,
                        style: TextStyle(
                          color:
                              plan.isRecommended ? Colors.white : AppColors.textPrimary,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const Spacer(),
            const SizedBox(height: AppSpacing.md),
            SizedBox(
              width: double.infinity,
              child: plan.isRecommended
                  ? FilledButton(
                      onPressed: onSelect,
                      style: FilledButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: AppColors.indigo,
                        minimumSize: const Size.fromHeight(50),
                      ),
                      child: Text(active ? 'Current plan' : 'Choose plan'),
                    )
                  : OutlinedButton(
                      onPressed: onSelect,
                      style: OutlinedButton.styleFrom(
                        minimumSize: const Size.fromHeight(50),
                        side: const BorderSide(color: AppColors.border),
                      ),
                      child: Text(active ? 'Current plan' : 'Choose plan'),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

class EmptyStateWidget extends StatelessWidget {
  const EmptyStateWidget({
    super.key,
    required this.title,
    required this.subtitle,
    required this.icon,
  });

  final String title;
  final String subtitle;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return SurfaceCard(
      child: Column(
        children: [
          CircleAvatar(
            radius: 28,
            backgroundColor: AppColors.indigoSoft,
            child: Icon(icon, size: 28, color: AppColors.indigo),
          ),
          const SizedBox(height: AppSpacing.md),
          Text(title, style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: AppSpacing.xs),
          Text(
            subtitle,
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class MetricBar extends StatelessWidget {
  const MetricBar({
    super.key,
    required this.label,
    required this.value,
    this.trailing,
  });

  final String label;
  final double value;
  final String? trailing;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(child: Text(label)),
            Text(trailing ?? '${(value * 100).round()}%'),
          ],
        ),
        const SizedBox(height: AppSpacing.xs),
        ClipRRect(
          borderRadius: BorderRadius.circular(99),
          child: LinearProgressIndicator(
            value: value,
            minHeight: 8,
            backgroundColor: AppColors.indigoSoft,
          ),
        ),
      ],
    );
  }
}

class MiniTrendChart extends StatelessWidget {
  const MiniTrendChart({
    super.key,
    required this.values,
  });

  final List<double> values;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 120,
      child: CustomPaint(
        painter: _TrendPainter(values),
        child: const SizedBox.expand(),
      ),
    );
  }
}

class MiniBarChart extends StatelessWidget {
  const MiniBarChart({
    super.key,
    required this.values,
    required this.labels,
  });

  final List<double> values;
  final List<String> labels;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: List.generate(values.length, (index) {
        return Expanded(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: AppSpacing.xs / 2),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Container(
                  height: 90 * values[index],
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(99),
                    gradient: AppGradients.primary,
                  ),
                ),
                const SizedBox(height: AppSpacing.xs),
                Text(labels[index], style: Theme.of(context).textTheme.bodySmall),
              ],
            ),
          ),
        );
      }),
    );
  }
}

class _Tag extends StatelessWidget {
  const _Tag({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm,
        vertical: AppSpacing.xs,
      ),
      decoration: BoxDecoration(
        color: AppColors.indigoSoft,
        borderRadius: BorderRadius.circular(99),
      ),
      child: Text(
        text,
        style: const TextStyle(
          color: AppColors.indigo,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}

class GradientOrbs extends StatelessWidget {
  const GradientOrbs({super.key});

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: Stack(
        children: [
          Positioned(
            top: -60,
            left: -30,
            child: _orb(160, const Color(0x22E85A1C)),
          ),
          Positioned(
            bottom: -40,
            right: 10,
            child: _orb(180, const Color(0x18FFB86C)),
          ),
          Positioned(
            top: 130,
            right: -50,
            child: _orb(140, const Color(0x14D14A12)),
          ),
          Positioned(
            top: 220,
            left: 80,
            child: _orb(180, const Color(0x12C99A33)),
          ),
        ],
      ),
    );
  }

  Widget _orb(double size, Color color) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: RadialGradient(
          colors: [color, Colors.transparent],
        ),
      ),
    );
  }
}

class AppLogo extends StatelessWidget {
  const AppLogo({
    super.key,
    this.size = 72,
    this.showGlow = false,
    this.padding = 8,
  });

  final double size;
  final bool showGlow;
  final double padding;

  @override
  Widget build(BuildContext context) {
    final image = Container(
      width: size,
      height: size,
      padding: EdgeInsets.all(padding),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(size * 0.26),
        border: Border.all(color: AppColors.borderStrong),
        boxShadow: showGlow
            ? [
                ...AppShadows.soft,
                const BoxShadow(
                  color: Color(0x22C99A33),
                  blurRadius: 28,
                  offset: Offset(0, 12),
                  spreadRadius: -12,
                ),
              ]
            : AppShadows.soft,
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(size * 0.2),
        child: Image.asset(
          'assets/images/academy_logo.png',
          fit: BoxFit.cover,
        ),
      ),
    );

    return AnimatedScale(
      scale: 1,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeOutCubic,
      child: image,
    );
  }
}

class AnimatedEntrance extends StatefulWidget {
  const AnimatedEntrance({
    super.key,
    required this.child,
    this.delay = Duration.zero,
    this.offset = const Offset(0, 18),
  });

  final Widget child;
  final Duration delay;
  final Offset offset;

  @override
  State<AnimatedEntrance> createState() => _AnimatedEntranceState();
}

class _AnimatedEntranceState extends State<AnimatedEntrance> {
  bool _visible = false;

  @override
  void initState() {
    super.initState();
    Future<void>.delayed(widget.delay, () {
      if (!mounted) return;
      setState(() => _visible = true);
    });
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedSlide(
      duration: const Duration(milliseconds: 550),
      curve: Curves.easeOutCubic,
      offset: _visible ? Offset.zero : widget.offset / 40,
      child: AnimatedOpacity(
        duration: const Duration(milliseconds: 450),
        curve: Curves.easeOut,
        opacity: _visible ? 1 : 0,
        child: widget.child,
      ),
    );
  }
}

class _TrendPainter extends CustomPainter {
  _TrendPainter(this.values);

  final List<double> values;

  @override
  void paint(Canvas canvas, Size size) {
    if (values.isEmpty) return;

    final linePaint = Paint()
      ..shader = const LinearGradient(
        colors: [AppColors.indigo, AppColors.blue],
      ).createShader(Offset.zero & size)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3
      ..strokeCap = StrokeCap.round;

    final fillPaint = Paint()
      ..shader = LinearGradient(
        colors: [
          AppColors.indigo.withValues(alpha: 0.20),
          AppColors.blue.withValues(alpha: 0.02),
        ],
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
      ).createShader(Offset.zero & size);

    final path = Path();
    final fillPath = Path();
    final double step =
        values.length == 1 ? 0 : size.width / (values.length - 1);

    for (var i = 0; i < values.length; i++) {
      final double x = i * step;
      final y = size.height -
          (size.height * values[i].clamp(0.0, 1.0).toDouble());
      if (i == 0) {
        path.moveTo(x, y);
        fillPath.moveTo(x, size.height);
        fillPath.lineTo(x, y);
      } else {
        path.lineTo(x, y);
        fillPath.lineTo(x, y);
      }
    }

    fillPath
      ..lineTo(size.width, size.height)
      ..close();

    canvas.drawPath(fillPath, fillPaint);
    canvas.drawPath(path, linePaint);

    for (var i = 0; i < values.length; i++) {
      final double x = i * step;
      final y = size.height -
          (size.height * values[i].clamp(0.0, 1.0).toDouble());
      canvas.drawCircle(
        Offset(x, y),
        4,
        Paint()..color = Colors.white,
      );
      canvas.drawCircle(
        Offset(x, y),
        3,
        Paint()..color = AppColors.indigo,
      );
    }
  }

  @override
  bool shouldRepaint(covariant _TrendPainter oldDelegate) {
    return !listEquals(values, oldDelegate.values);
  }
}
