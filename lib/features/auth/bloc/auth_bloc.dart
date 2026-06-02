import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../models/app_models.dart';
import '../data/auth_repository.dart';

class AuthState {
  const AuthState({
    this.user,
    this.token,
    this.onboardingSeen = false,
    this.loading = false,
    this.errorMessage,
    this.otpSent = false,
    this.isOtpVerified = false,
    this.isNewUser = false,
    this.phoneNumber = '',
    this.verificationId,
    this.firebaseIdToken,
    this.availableBatches = const [],
  });

  final AppUser? user;
  final String? token;
  final bool onboardingSeen;
  final bool loading;
  final String? errorMessage;
  final bool otpSent;
  final bool isOtpVerified;
  final bool isNewUser;
  final String phoneNumber;

  /// Firebase verificationId — used to confirm OTP
  final String? verificationId;

  /// Firebase ID token — sent to backend during completeSignup
  final String? firebaseIdToken;

  final List<BatchOption> availableBatches;

  bool get isLoggedIn => user != null && token != null;

  AuthState copyWith({
    AppUser? user,
    String? token,
    bool? onboardingSeen,
    bool? loading,
    String? errorMessage,
    bool clearError = false,
    bool? otpSent,
    bool? isOtpVerified,
    bool? isNewUser,
    String? phoneNumber,
    String? verificationId,
    String? firebaseIdToken,
    List<BatchOption>? availableBatches,
    bool clearSession = false,
  }) {
    return AuthState(
      user: clearSession ? null : user ?? this.user,
      token: clearSession ? null : token ?? this.token,
      onboardingSeen: onboardingSeen ?? this.onboardingSeen,
      loading: loading ?? this.loading,
      errorMessage: clearError ? null : errorMessage ?? this.errorMessage,
      otpSent: otpSent ?? this.otpSent,
      isOtpVerified: isOtpVerified ?? this.isOtpVerified,
      isNewUser: isNewUser ?? this.isNewUser,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      verificationId: verificationId ?? this.verificationId,
      firebaseIdToken: firebaseIdToken ?? this.firebaseIdToken,
      availableBatches: availableBatches ?? this.availableBatches,
    );
  }
}

class AuthBloc extends Cubit<AuthState> {
  AuthBloc(this._repository)
      : super(AuthState(onboardingSeen: _repository.onboardingSeen));

  final AuthRepository _repository;
  bool _bootstrapped = false;

  Future<void> bootstrapSession() async {
    if (_bootstrapped) return;
    _bootstrapped = true;
    final token = await _repository.readSecureToken();
    final user = await _repository.readSecureUser();
    if (token == null || user == null) return;

    emit(state.copyWith(user: user, token: token));
    try {
      final latestUser = await _repository.fetchMe(token);
      await _repository.saveSession(token: token, user: latestUser);
      emit(state.copyWith(user: latestUser));
    } catch (_) {
      await logout();
    }
  }

  Future<void> markOnboardingSeen() async {
    await _repository.setOnboardingSeen();
    emit(state.copyWith(onboardingSeen: true));
  }

  // ─── Login (phone + password, no OTP) ────────────────────────────────────

  Future<void> login(String rawPhone, String password) async {
    final phone = rawPhone.replaceAll(RegExp(r'\D'), '');
    if (phone.length < 10) {
      emit(state.copyWith(errorMessage: 'Enter valid 10-digit phone number'));
      return;
    }
    if (password.isEmpty) {
      emit(state.copyWith(errorMessage: 'Enter your password'));
      return;
    }

    emit(state.copyWith(loading: true, clearError: true));
    try {
      final data = await _repository.login(phone: phone, password: password);
      final token = data['token']?.toString();
      final userJson = data['user'] as Map<String, dynamic>?;
      if (token == null || userJson == null) {
        throw AuthException('Invalid response from server');
      }
      final user = AppUser.fromJson(userJson);
      await _repository.saveSession(token: token, user: user);
      await _repository.setOnboardingSeen();
      emit(state.copyWith(
        loading: false,
        user: user,
        token: token,
        onboardingSeen: true,
      ));
    } catch (e) {
      emit(state.copyWith(loading: false, errorMessage: e.toString()));
    }
  }

  // ─── Signup: Step 1 — Send OTP via Firebase ──────────────────────────────

  Future<void> sendOtp(String rawPhone) async {
    final phone = rawPhone.replaceAll(RegExp(r'\D'), '');
    if (phone.length < 10) {
      emit(state.copyWith(errorMessage: 'Enter valid 10-digit phone number'));
      return;
    }

    emit(state.copyWith(loading: true, clearError: true, phoneNumber: phone));

    await FirebaseAuth.instance.verifyPhoneNumber(
      phoneNumber: '+91$phone',
      timeout: const Duration(seconds: 60),
      verificationCompleted: (PhoneAuthCredential credential) async {
        // Auto-verified on Android — sign in directly
        await _signInWithCredential(credential);
      },
      verificationFailed: (FirebaseAuthException e) {
        emit(state.copyWith(
          loading: false,
          errorMessage: e.message ?? 'Failed to send OTP',
        ));
      },
      codeSent: (String verificationId, int? resendToken) {
        emit(state.copyWith(
          loading: false,
          otpSent: true,
          verificationId: verificationId,
        ));
      },
      codeAutoRetrievalTimeout: (_) {},
    );
  }

  // ─── Signup: Step 2 — Verify OTP, get Firebase ID token ──────────────────

  Future<bool> verifyOtp(String otp) async {
    final verificationId = state.verificationId;
    if (verificationId == null) {
      emit(state.copyWith(errorMessage: 'Send OTP first'));
      return false;
    }

    emit(state.copyWith(loading: true, clearError: true));
    try {
      final credential = PhoneAuthProvider.credential(
        verificationId: verificationId,
        smsCode: otp.trim(),
      );
      return await _signInWithCredential(credential);
    } on FirebaseAuthException catch (e) {
      emit(state.copyWith(
        loading: false,
        errorMessage: e.message ?? 'Invalid OTP',
      ));
      return false;
    }
  }

  Future<bool> _signInWithCredential(PhoneAuthCredential credential) async {
    try {
      final userCredential =
          await FirebaseAuth.instance.signInWithCredential(credential);
      final idToken = await userCredential.user!.getIdToken();

      // Ask backend if this phone is a new user
      final data = await _repository.verifyFirebaseToken(idToken!);
      final isNewUser = data['isNewUser'] == true;

      emit(state.copyWith(
        loading: false,
        isOtpVerified: true,
        isNewUser: isNewUser,
        firebaseIdToken: idToken,
      ));
      return true;
    } catch (e) {
      emit(state.copyWith(loading: false, errorMessage: e.toString()));
      return false;
    }
  }

  // ─── Signup: Step 3 — Complete signup with password + details ────────────

  Future<bool> completeSignup({
    required String fullName,
    required String password,
    required int batchId,
    required String courseCategory,
  }) async {
    final idToken = state.firebaseIdToken;
    if (idToken == null) {
      emit(state.copyWith(errorMessage: 'OTP verification required'));
      return false;
    }

    emit(state.copyWith(loading: true, clearError: true));
    try {
      final data = await _repository.completeSignup(
        idToken: idToken,
        fullName: fullName,
        password: password,
        batchId: batchId,
        courseCategory: courseCategory,
      );

      final token = data['token']?.toString();
      final userJson = data['user'] as Map<String, dynamic>?;
      if (token == null || userJson == null) {
        throw AuthException('Invalid signup response');
      }

      final user = AppUser.fromJson(userJson);
      await _repository.saveSession(token: token, user: user);
      await _repository.setOnboardingSeen();
      emit(state.copyWith(
        loading: false,
        user: user,
        token: token,
        onboardingSeen: true,
        isNewUser: false,
        firebaseIdToken: null,
      ));
      return true;
    } catch (e) {
      emit(state.copyWith(loading: false, errorMessage: e.toString()));
      return false;
    }
  }

  Future<void> loadBatches() async {
    try {
      final batches = await _repository.fetchBatches();
      emit(state.copyWith(availableBatches: batches));
    } catch (_) {}
  }

  Future<void> updateProfile(AppUser user) async {
    emit(state.copyWith(user: user));
    final token = state.token;
    if (token != null) {
      await _repository.saveSession(token: token, user: user);
    }
  }

  Future<void> logout() async {
    await _repository.clearSession();
    await FirebaseAuth.instance.signOut();
    emit(state.copyWith(
      clearSession: true,
      otpSent: false,
      isOtpVerified: false,
      isNewUser: false,
      phoneNumber: '',
    ));
  }

  Future<bool> deleteAccount() async {
    final token = state.token;
    if (token == null) return false;
    emit(state.copyWith(loading: true, clearError: true));
    try {
      await _repository.deleteAccount(token);
      await FirebaseAuth.instance.signOut();
      emit(state.copyWith(
        clearSession: true,
        loading: false,
        otpSent: false,
        isOtpVerified: false,
        isNewUser: false,
        phoneNumber: '',
      ));
      return true;
    } catch (e) {
      emit(state.copyWith(loading: false, errorMessage: e.toString()));
      return false;
    }
  }
}
