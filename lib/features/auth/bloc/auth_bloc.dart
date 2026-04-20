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
    this.otpDebugCode,
    this.availableStates = const [],
    this.availableColleges = const [],
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
  final String? otpDebugCode;
  final List<String> availableStates;
  final List<String> availableColleges;

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
    String? otpDebugCode,
    List<String>? availableStates,
    List<String>? availableColleges,
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
      otpDebugCode: otpDebugCode ?? this.otpDebugCode,
      availableStates: availableStates ?? this.availableStates,
      availableColleges: availableColleges ?? this.availableColleges,
    );
  }
}

class AuthBloc extends Cubit<AuthState> {
  AuthBloc(this._repository) : super(AuthState(onboardingSeen: _repository.onboardingSeen));

  final AuthRepository _repository;
  bool _bootstrapped = false;

  Future<void> bootstrapSession() async {
    if (_bootstrapped) return;
    _bootstrapped = true;
    final token = _repository.token;
    final user = _repository.cachedUser;
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

  Future<void> sendOtp(String rawPhone) async {
    final phone = rawPhone.replaceAll(RegExp(r'\D'), '');
    if (phone.length < 10) {
      emit(state.copyWith(errorMessage: 'Enter valid 10-digit phone number'));
      return;
    }

    emit(state.copyWith(loading: true, clearError: true, phoneNumber: phone));
    try {
      final data = await _repository.sendOtp(phone);
      emit(
        state.copyWith(
          loading: false,
          otpSent: true,
          phoneNumber: phone,
          otpDebugCode: data['otpForTesting']?.toString(),
        ),
      );
    } catch (e) {
      emit(state.copyWith(loading: false, errorMessage: e.toString()));
    }
  }

  Future<bool> verifyOtp(String otp) async {
    if (state.phoneNumber.isEmpty) {
      emit(state.copyWith(errorMessage: 'Send OTP first'));
      return false;
    }
    emit(state.copyWith(loading: true, clearError: true));
    try {
      final data = await _repository.verifyOtp(
        phone: state.phoneNumber,
        otp: otp.trim(),
      );
      final isNewUser = data['isNewUser'] == true;
      if (!isNewUser) {
        final token = data['token']?.toString();
        final userJson = data['user'] as Map<String, dynamic>?;
        if (token != null && userJson != null) {
          final user = AppUser.fromJson(userJson);
          await _repository.saveSession(token: token, user: user);
          await _repository.setOnboardingSeen();
          emit(
            state.copyWith(
              loading: false,
              user: user,
              token: token,
              onboardingSeen: true,
              isOtpVerified: true,
              isNewUser: false,
            ),
          );
          return true;
        }
      }

      emit(
        state.copyWith(
          loading: false,
          isOtpVerified: true,
          isNewUser: true,
        ),
      );
      return true;
    } catch (e) {
      emit(state.copyWith(loading: false, errorMessage: e.toString()));
      return false;
    }
  }

  Future<void> loadStates() async {
    try {
      final states = await _repository.fetchStates();
      emit(state.copyWith(availableStates: states));
    } catch (_) {
      // no-op
    }
  }

  Future<void> loadColleges(String stateName) async {
    emit(state.copyWith(availableColleges: const []));
    try {
      final colleges = await _repository.fetchColleges(stateName);
      emit(state.copyWith(availableColleges: colleges));
    } catch (_) {
      // no-op
    }
  }

  Future<bool> completeSignup({
    required String fullName,
    required String courseCategory,
    required String collegeState,
    required String mbbsYear,
    required String medicalCollege,
  }) async {
    emit(state.copyWith(loading: true, clearError: true));
    try {
      final data = await _repository.completeSignup(
        phone: state.phoneNumber,
        fullName: fullName,
        courseCategory: courseCategory,
        collegeState: collegeState,
        mbbsYear: mbbsYear,
        medicalCollege: medicalCollege,
      );

      final token = data['token']?.toString();
      final userJson = data['user'] as Map<String, dynamic>?;
      if (token == null || userJson == null) {
        throw AuthException('Invalid signup response');
      }

      final user = AppUser.fromJson(userJson);
      await _repository.saveSession(token: token, user: user);
      await _repository.setOnboardingSeen();
      emit(
        state.copyWith(
          loading: false,
          user: user,
          token: token,
          onboardingSeen: true,
          isNewUser: false,
        ),
      );
      return true;
    } catch (e) {
      emit(state.copyWith(loading: false, errorMessage: e.toString()));
      return false;
    }
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
    emit(
      state.copyWith(
        clearSession: true,
        otpSent: false,
        isOtpVerified: false,
        isNewUser: false,
        phoneNumber: '',
      ),
    );
  }
}
