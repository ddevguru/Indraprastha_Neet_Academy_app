import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

import '../../core/data/dummy_data.dart';
import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import 'bloc/auth_bloc.dart';
import 'widgets/apple_sign_in_button.dart';

// ─── Splash ──────────────────────────────────────────────────────────────────

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
      } else if (state.onboardingSeen) {
        context.go('/login');
      } else {
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

// ─── Onboarding ──────────────────────────────────────────────────────────────

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});
  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _controller = PageController();
  int _currentPage = 0;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _advanceOnboarding() async {
    if (_currentPage < DummyData.onboarding.length - 1) {
      final nextPage = _currentPage + 1;
      await _controller.animateToPage(
        nextPage,
        duration: const Duration(milliseconds: 320),
        curve: Curves.easeOutCubic,
      );
      return;
    }
    final router = GoRouter.of(context);
    await context.read<AuthBloc>().markOnboardingSeen();
    if (!mounted) return;
    router.go('/login');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          const GradientOrbs(),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: LayoutBuilder(
                builder: (context, constraints) {
                  return Align(
                    alignment: Alignment.center,
                    child: ConstrainedBox(
                      constraints: BoxConstraints(
                        maxWidth: 900,
                        maxHeight: constraints.maxHeight,
                      ),
                      child: SurfaceCard(
                        borderRadius: AppRadii.xl,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            const AppLogo(size: 56, showGlow: true, padding: 4),
                            const SizedBox(height: AppSpacing.md),
                            Expanded(
                              child: PageView.builder(
                                controller: _controller,
                                physics: const BouncingScrollPhysics(),
                                itemCount: DummyData.onboarding.length,
                                onPageChanged: (value) =>
                                    setState(() => _currentPage = value),
                                itemBuilder: (context, index) {
                                  final item = DummyData.onboarding[index];
                                  return SingleChildScrollView(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: AppSpacing.md,
                                      vertical: AppSpacing.sm,
                                    ),
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Icon(item.icon,
                                            size: 52, color: AppColors.indigo),
                                        const SizedBox(height: AppSpacing.lg),
                                        Text(
                                          item.title,
                                          textAlign: TextAlign.center,
                                          style: Theme.of(context)
                                              .textTheme
                                              .headlineSmall,
                                        ),
                                        const SizedBox(height: AppSpacing.sm),
                                        Text(
                                          item.subtitle,
                                          textAlign: TextAlign.center,
                                          style: Theme.of(context)
                                              .textTheme
                                              .titleMedium,
                                        ),
                                        const SizedBox(height: AppSpacing.md),
                                        Text(item.caption,
                                            textAlign: TextAlign.center),
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
                                  margin: const EdgeInsets.only(
                                      right: AppSpacing.xs),
                                  width: _currentPage == index ? 28 : 10,
                                  height: 10,
                                  decoration: BoxDecoration(
                                    gradient: _currentPage == index
                                        ? AppGradients.primary
                                        : null,
                                    color: _currentPage == index
                                        ? null
                                        : AppColors.border,
                                    borderRadius: BorderRadius.circular(99),
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(height: AppSpacing.lg),
                            PrimaryButton(
                              label: _currentPage ==
                                      DummyData.onboarding.length - 1
                                  ? 'Get Started'
                                  : 'Continue',
                              expanded: true,
                              icon: Icons.arrow_forward_rounded,
                              onPressed: _advanceOnboarding,
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

// ─── Login (phone + password) ─────────────────────────────────────────────────

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _phone = TextEditingController();
  final _password = TextEditingController();
  bool _obscurePassword = true;

  @override
  void dispose() {
    _phone.dispose();
    _password.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<AuthBloc, AuthState>(
      listener: (context, state) {
        if (state.errorMessage != null) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(state.errorMessage!)),
          );
        }
        if (state.isLoggedIn) {
          context.go('/dashboard/0');
        } else if (state.firebaseIdToken != null && state.isNewUser) {
          context.go('/signup/apple-complete');
        }
      },
      builder: (context, state) {
        return _AuthBody(
          title: 'Login',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const AppleSignInButton(label: 'Sign in with Apple'),
              const SizedBox(height: 12),
              const Row(
                children: [
                  Expanded(child: Divider()),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 8),
                    child: Text('or'),
                  ),
                  Expanded(child: Divider()),
                ],
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _phone,
                keyboardType: TextInputType.phone,
                decoration: const InputDecoration(
                  labelText: 'Phone number',
                  prefixText: '+91 ',
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _password,
                obscureText: _obscurePassword,
                decoration: InputDecoration(
                  labelText: 'Password',
                  suffixIcon: IconButton(
                    icon: Icon(_obscurePassword
                        ? Icons.visibility_off
                        : Icons.visibility),
                    onPressed: () =>
                        setState(() => _obscurePassword = !_obscurePassword),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: state.loading
                    ? null
                    : () => context
                        .read<AuthBloc>()
                        .login(_phone.text.trim(), _password.text),
                child: state.loading
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Text('Login'),
              ),
              const SizedBox(height: 10),
              TextButton(
                onPressed: () => context.go('/signup'),
                child: const Text('New student? Sign up'),
              ),
            ],
          ),
        );
      },
    );
  }
}

// ─── Signup (Firebase OTP → password → details) ───────────────────────────────

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});
  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _phone = TextEditingController();
  final _otp = TextEditingController();
  final _name = TextEditingController();
  final _password = TextEditingController();
  final _confirmPassword = TextEditingController();
  final String _course = 'Neet Dropper Batch';
  int? _batchId;
  String _board = '';
  bool _obscurePassword = true;
  bool _obscureConfirm = true;

  static const _boards = ['ISC', 'CBSE', 'State Boards', 'Open School'];

  @override
  void initState() {
    super.initState();
    context.read<AuthBloc>().loadBatches();
  }

  @override
  void dispose() {
    _phone.dispose();
    _otp.dispose();
    _name.dispose();
    _password.dispose();
    _confirmPassword.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<AuthBloc, AuthState>(
      listener: (context, state) {
        if (state.errorMessage != null) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(state.errorMessage!)),
          );
        }
        if (state.isLoggedIn) {
          context.go('/dashboard/0');
        } else if (state.firebaseIdToken != null &&
            state.isNewUser &&
            state.otpSent == false) {
          context.go('/signup/apple-complete');
        }
      },
      builder: (context, state) {
        // step 0 = enter phone, step 1 = enter OTP, step 2 = password + details
        final int step = !state.otpSent ? 0 : (!state.isOtpVerified ? 1 : 2);

        return _AuthBody(
          title: 'Create Account',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              if (step == 0) ...[
                const AppleSignInButton(label: 'Sign up with Apple'),
                const SizedBox(height: 12),
                const Row(
                  children: [
                    Expanded(child: Divider()),
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 8),
                      child: Text('or use phone'),
                    ),
                    Expanded(child: Divider()),
                  ],
                ),
                const SizedBox(height: 12),
              ],
              // ── Step 0: Phone ──────────────────────────────────────────
              if (step == 0) ...[
                TextField(
                  controller: _phone,
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(
                    labelText: 'Phone number',
                    prefixText: '+91 ',
                  ),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: state.loading
                      ? null
                      : () => context
                          .read<AuthBloc>()
                          .sendOtp(_phone.text.trim()),
                  child: state.loading
                      ? const SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Text('Send OTP'),
                ),
                const SizedBox(height: 10),
                TextButton(
                  onPressed: () => context.go('/login'),
                  child: const Text('Already have an account? Login'),
                ),
              ],

              // ── Step 1: OTP ────────────────────────────────────────────
              if (step == 1) ...[
                Text(
                  'OTP sent to +91 ${state.phoneNumber}',
                  style: Theme.of(context).textTheme.bodyMedium,
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _otp,
                  keyboardType: TextInputType.number,
                  maxLength: 6,
                  decoration: const InputDecoration(
                    labelText: 'Enter 6-digit OTP',
                    counterText: '',
                  ),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: state.loading
                      ? null
                      : () =>
                          context.read<AuthBloc>().verifyOtp(_otp.text.trim()),
                  child: state.loading
                      ? const SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Text('Verify OTP'),
                ),
              ],

              // ── Step 2: Password + Details ─────────────────────────────
              if (step == 2) ...[
                TextField(
                  controller: _name,
                  decoration:
                      const InputDecoration(labelText: 'Full name'),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _password,
                  obscureText: _obscurePassword,
                  decoration: InputDecoration(
                    labelText: 'Set password (min 6 characters)',
                    suffixIcon: IconButton(
                      icon: Icon(_obscurePassword
                          ? Icons.visibility_off
                          : Icons.visibility),
                      onPressed: () => setState(
                          () => _obscurePassword = !_obscurePassword),
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _confirmPassword,
                  obscureText: _obscureConfirm,
                  decoration: InputDecoration(
                    labelText: 'Confirm password',
                    suffixIcon: IconButton(
                      icon: Icon(_obscureConfirm
                          ? Icons.visibility_off
                          : Icons.visibility),
                      onPressed: () =>
                          setState(() => _obscureConfirm = !_obscureConfirm),
                    ),
                  ),
                ),
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
                      .map((b) =>
                          DropdownMenuItem(value: b.id, child: Text(b.name)))
                      .toList(),
                  onChanged: (v) => setState(() => _batchId = v),
                  decoration: const InputDecoration(labelText: 'Batch'),
                ),
                const SizedBox(height: 12),
                DropdownButtonFormField<String>(
                  initialValue: _board.isEmpty ? null : _board,
                  items: _boards
                      .map((b) =>
                          DropdownMenuItem(value: b, child: Text(b)))
                      .toList(),
                  onChanged: (v) => setState(() => _board = v ?? ''),
                  decoration: const InputDecoration(labelText: 'Board'),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: state.loading
                      ? null
                      : () {
                          if (_name.text.trim().length < 2) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                  content: Text('Enter your full name')),
                            );
                            return;
                          }
                          if (_password.text.length < 6) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                  content: Text(
                                      'Password must be at least 6 characters')),
                            );
                            return;
                          }
                          if (_password.text != _confirmPassword.text) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                  content: Text('Passwords do not match')),
                            );
                            return;
                          }
                          if (_batchId == null) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                  content: Text('Please select your batch')),
                            );
                            return;
                          }
                          context.read<AuthBloc>().completeSignup(
                                fullName: _name.text.trim(),
                                password: _password.text,
                                batchId: _batchId!,
                                courseCategory:
                                    _board.isNotEmpty ? _board : _course,
                              );
                        },
                  child: state.loading
                      ? const SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Text('Complete Signup'),
                ),
              ],
            ],
          ),
        );
      },
    );
  }
}

class ForgotPasswordScreen extends StatelessWidget {
  const ForgotPasswordScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return const _AuthBody(
      title: 'Forgot Password',
      child: Text(
        'Please contact your academy to reset your password.',
        textAlign: TextAlign.center,
      ),
    );
  }
}

// ─── Shared layout ────────────────────────────────────────────────────────────

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
            child: SingleChildScrollView(
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
                        Text(title,
                            style:
                                Theme.of(context).textTheme.headlineSmall),
                        const SizedBox(height: AppSpacing.md),
                        child,
                      ],
                    ),
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
