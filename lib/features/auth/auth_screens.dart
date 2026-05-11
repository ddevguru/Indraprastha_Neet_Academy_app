import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

import '../../core/data/dummy_data.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import 'bloc/auth_bloc.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});
  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Timer(const Duration(milliseconds: 1000), () {
      if (!mounted) return;
      final state = context.read<AuthBloc>().state;
      if (state.isLoggedIn) {
        context.go('/dashboard/0');
      } else {
        // Keep 3-slider onboarding visible for every logged-out launch.
        context.go('/onboarding');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          const GradientOrbs(),
          CenteredContent(
            maxWidth: 560,
            child: Center(
              child: AnimatedEntrance(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(32),
                      child: Image.asset(
                        'assets/images/splash_logo.png',
                        width: 140,
                        height: 140,
                        fit: BoxFit.cover,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.xl),
                    Text(
                      'Indraprastha NEET Academy',
                      style: Theme.of(context).textTheme.headlineSmall,
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: AppSpacing.xl),
                    const SizedBox(
                      width: 34,
                      height: 34,
                      child: CircularProgressIndicator(strokeWidth: 3),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _controller = PageController();
  int _currentPage = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          const GradientOrbs(),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: CenteredContent(
                maxWidth: 900,
                child: SurfaceCard(
                  borderRadius: AppRadii.xl,
                  child: Column(
                    children: [
                      const AppLogo(size: 56, showGlow: true, padding: 4),
                      const SizedBox(height: AppSpacing.md),
                      Expanded(
                        child: PageView.builder(
                          controller: _controller,
                          itemCount: DummyData.onboarding.length,
                          onPageChanged: (value) =>
                              setState(() => _currentPage = value),
                          itemBuilder: (context, index) {
                            final item = DummyData.onboarding[index];
                            return Padding(
                              padding: const EdgeInsets.symmetric(
                                horizontal: AppSpacing.md,
                              ),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Icon(item.icon, size: 52, color: AppColors.indigo),
                                  const SizedBox(height: AppSpacing.lg),
                                  Text(
                                    item.title,
                                    textAlign: TextAlign.center,
                                    style: Theme.of(context).textTheme.headlineSmall,
                                  ),
                                  const SizedBox(height: AppSpacing.sm),
                                  Text(
                                    item.subtitle,
                                    textAlign: TextAlign.center,
                                    style: Theme.of(context).textTheme.titleMedium,
                                  ),
                                  const SizedBox(height: AppSpacing.md),
                                  Text(item.caption, textAlign: TextAlign.center),
                                ],
                              ),
                            );
                          },
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: List.generate(
                          DummyData.onboarding.length,
                          (index) => AnimatedContainer(
                            duration: const Duration(milliseconds: 220),
                            margin: const EdgeInsets.only(right: AppSpacing.xs),
                            width: _currentPage == index ? 28 : 10,
                            height: 10,
                            decoration: BoxDecoration(
                              gradient:
                                  _currentPage == index ? AppGradients.primary : null,
                              color:
                                  _currentPage == index ? null : AppColors.border,
                              borderRadius: BorderRadius.circular(99),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: AppSpacing.lg),
                      PrimaryButton(
                        label:
                            _currentPage == DummyData.onboarding.length - 1
                                ? 'Get Started'
                                : 'Continue',
                        expanded: true,
                        icon: Icons.arrow_forward_rounded,
                        onPressed: () async {
                          if (_currentPage < DummyData.onboarding.length - 1) {
                            _controller.nextPage(
                              duration: const Duration(milliseconds: 320),
                              curve: Curves.easeOutCubic,
                            );
                            return;
                          }
                          final router = GoRouter.of(context);
                          await context.read<AuthBloc>().markOnboardingSeen();
                          if (!mounted) return;
                          router.go('/login');
                        },
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _phone = TextEditingController();
  final _otp = TextEditingController();

  @override
  void dispose() {
    _phone.dispose();
    _otp.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<AuthBloc, AuthState>(
      listener: (context, state) {
        if (state.errorMessage != null) {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(state.errorMessage!)));
        }
        if (state.isLoggedIn) context.go('/dashboard/0');
        if (state.isOtpVerified && state.isNewUser) context.go('/signup');
      },
      builder: (context, state) {
        return _AuthBody(
          title: 'Login with OTP',
          child: Column(
            children: [
              TextField(controller: _phone, keyboardType: TextInputType.phone, decoration: const InputDecoration(labelText: 'Phone number')),
              const SizedBox(height: 12),
              if (state.otpSent) TextField(controller: _otp, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'Enter OTP')),
              if (state.otpDebugCode != null) Text('Test OTP: ${state.otpDebugCode}'),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: state.loading
                    ? null
                    : () async {
                        if (!state.otpSent) {
                          await context.read<AuthBloc>().sendOtp(_phone.text.trim());
                        } else {
                          await context.read<AuthBloc>().verifyOtp(_otp.text.trim());
                        }
                      },
                child: Text(state.otpSent ? 'Verify OTP' : 'Send OTP'),
              ),
              const SizedBox(height: 8),
              TextButton(onPressed: () => context.go('/signup'), child: const Text('New user? Signup')),
            ],
          ),
        );
      },
    );
  }
}

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});
  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _phone = TextEditingController();
  final _otp = TextEditingController();
  final _name = TextEditingController();
  final String _course = 'Neet Dropper Batch';
  int? _batchId;
  String _state = '';
  String _board = '';

  @override
  void initState() {
    super.initState();
    context.read<AuthBloc>().loadStates();
    context.read<AuthBloc>().loadBatches();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<AuthBloc, AuthState>(
      listener: (context, state) {
        if (state.errorMessage != null) {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(state.errorMessage!)));
        }
        if (state.isLoggedIn) context.go('/dashboard/0');
      },
      builder: (context, state) {
        final step = !state.otpSent ? 0 : (!state.isOtpVerified ? 1 : 2);
        return _AuthBody(
          title: 'Signup with OTP',
          child: Column(children: [
            if (step == 0) ...[
              TextField(controller: _phone, keyboardType: TextInputType.phone, decoration: const InputDecoration(labelText: 'Phone number')),
              const SizedBox(height: 12),
              ElevatedButton(onPressed: () => context.read<AuthBloc>().sendOtp(_phone.text.trim()), child: const Text('Send OTP')),
            ],
            if (step == 1) ...[
              TextField(controller: _otp, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'OTP')),
              const SizedBox(height: 12),
              ElevatedButton(onPressed: () => context.read<AuthBloc>().verifyOtp(_otp.text.trim()), child: const Text('Verify OTP')),
            ],
            if (step == 2) ...[
              TextField(controller: _name, decoration: const InputDecoration(labelText: 'Full name')),
              const SizedBox(height: 12),
              TextFormField(
                initialValue: _course,
                readOnly: true,
                decoration: const InputDecoration(labelText: 'Course'),
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<int>(
                initialValue: _batchId,
                items: state.availableBatches
                    .map(
                      (b) => DropdownMenuItem(
                        value: b.id,
                        child: Text(b.name),
                      ),
                    )
                    .toList(),
                onChanged: (v) => setState(() => _batchId = v),
                decoration: const InputDecoration(labelText: 'Batch'),
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                initialValue: _state.isEmpty ? null : _state,
                items: state.availableStates
                    .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                    .toList(),
                onChanged: (v) {
                  if (v == null) return;
                  setState(() => _state = v);
                },
                decoration: const InputDecoration(labelText: 'State'),
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                initialValue: _board.isEmpty ? null : _board,
                items: const [
                  DropdownMenuItem(value: 'ISC', child: Text('ISC')),
                  DropdownMenuItem(value: 'CBSE', child: Text('CBSE')),
                  DropdownMenuItem(value: 'State board', child: Text('State board')),
                ],
                onChanged: (v) => setState(() => _board = v ?? ''),
                decoration: const InputDecoration(labelText: 'Board'),
              ),
              const SizedBox(height: 14),
              ElevatedButton(
                onPressed: () {
                  if (_batchId == null) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Please select your batch')),
                    );
                    return;
                  }
                  context.read<AuthBloc>().completeSignup(
                        fullName: _name.text.trim(),
                        batchId: _batchId!,
                        courseCategory: _board.isNotEmpty ? _board : _course,
                        collegeState: _state,
                        mbbsYear: '',
                        medicalCollege: '',
                      );
                },
                child: const Text('Complete Signup'),
              ),
            ],
          ]),
        );
      },
    );
  }
}

class ForgotPasswordScreen extends StatelessWidget {
  const ForgotPasswordScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return const _AuthBody(title: 'Only OTP supported', child: Text('Use phone OTP login/signup.'));
  }
}

class _AuthBody extends StatelessWidget {
  const _AuthBody({required this.title, required this.child});
  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          const GradientOrbs(),
          Center(
            child: SizedBox(
              width: 460,
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: SurfaceCard(
                  borderRadius: AppRadii.xl,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const AppLogo(size: 52, padding: 4),
                      const SizedBox(height: AppSpacing.md),
                      Text(title, style: Theme.of(context).textTheme.headlineSmall),
                      const SizedBox(height: AppSpacing.md),
                      child,
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
