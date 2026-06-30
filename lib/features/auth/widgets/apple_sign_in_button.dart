import 'dart:io' show Platform;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:sign_in_with_apple/sign_in_with_apple.dart';

import '../bloc/auth_bloc.dart';

/// Sign in with Apple button — shown on iOS only (App Store requirement).
class AppleSignInButton extends StatelessWidget {
  const AppleSignInButton({super.key, this.label = 'Continue with Apple'});

  final String label;

  static bool get isAvailable =>
      !kIsWeb && Platform.isIOS;

  Future<void> _handleSignIn(BuildContext context) async {
    final bloc = context.read<AuthBloc>();
    final loggedIn = await bloc.signInWithApple();
    if (!context.mounted) return;
    if (loggedIn) {
      context.go('/dashboard/0');
    } else if (bloc.state.firebaseIdToken != null && bloc.state.isNewUser) {
      context.go('/signup/apple-complete');
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!isAvailable) return const SizedBox.shrink();

    final isDark = Theme.of(context).brightness == Brightness.dark;

    return BlocBuilder<AuthBloc, AuthState>(
      builder: (context, state) {
        if (state.loading) {
          return const SizedBox(
            height: 48,
            child: Center(
              child: SizedBox(
                width: 24,
                height: 24,
                child: CircularProgressIndicator(strokeWidth: 2),
              ),
            ),
          );
        }

        return SizedBox(
          width: double.infinity,
          height: 48,
          child: SignInWithAppleButton(
            onPressed: () => _handleSignIn(context),
            style: isDark
                ? SignInWithAppleButtonStyle.white
                : SignInWithAppleButtonStyle.black,
            borderRadius: BorderRadius.circular(12),
            text: label,
          ),
        );
      },
    );
  }
}
