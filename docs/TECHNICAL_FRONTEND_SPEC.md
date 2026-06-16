# Frontend Specification Document
## Indraprastha NEET Academy

**Version:** 1.0  
**Last Updated:** June 15, 2026  
**Owner:** Frontend Lead  
**Status:** Active

---

## 1. Overview

Indraprastha NEET Academy frontend is a **cross-platform application** built with **Flutter**, supporting:
- **iOS** (minimum version 12.0)
- **Android** (minimum SDK 21, target 34)
- **Web** (Chrome, Firefox, Safari, Edge)
- **Windows** (Windows 10+)

**Framework:** Flutter 3.10.1+  
**State Management:** BLoC Pattern  
**Design System:** Material 3

---

## 2. Architecture

### 2.1 Project Structure

```
indraprastha/
├── lib/
│   ├── main.dart                    # App entry point
│   ├── core/
│   │   ├── constants/
│   │   │   ├── api_constants.dart
│   │   │   └── theme_constants.dart
│   │   ├── theme/
│   │   │   └── app_tokens.dart      # Colors, spacing, typography
│   │   └── utils/
│   │       ├── validators.dart
│   │       └── extensions.dart
│   ├── models/
│   │   └── app_models.dart          # Data models (User, Test, etc.)
│   ├── features/
│   │   ├── auth/
│   │   │   ├── data/
│   │   │   │   └── auth_repository.dart
│   │   │   ├── bloc/
│   │   │   │   └── auth_bloc.dart
│   │   │   └── presentation/
│   │   │       └── auth_screens.dart
│   │   ├── dashboard/
│   │   ├── courses/
│   │   ├── practice/
│   │   ├── tests/
│   │   └── videos/
│   └── services/
│       └── firebase_service.dart
├── pubspec.yaml
└── test/
    └── ...
```

### 2.2 Layered Architecture

```
Presentation Layer (UI)
├── Screens / Pages
├── Widgets / Components
└── BLoC (Business Logic)

Domain Layer
├── Use Cases
└── Repository Interfaces

Data Layer
├── Repositories (Implementations)
├── API Client
└── Local Storage
```

---

## 3. Design System

### 3.1 Color Palette

**Primary Brand:** Warm Orange-Amber

```dart
class AppColors {
  // Primary colors
  static const Color primary = Color(0xFFE85A1C);      // Main orange
  static const Color primaryDark = Color(0xFFB8440E);  // Dark orange
  static const Color primarySoft = Color(0xFFFFE8D6);  // Light orange
  
  // Accent colors
  static const Color accentLight = Color(0xFFFFB86C);  // Bright orange
  static const Color gold = Color(0xFFC99A33);
  
  // Background
  static const Color background = Color(0xFFFFF8F2);   // Cream
  static const Color backgroundAlt = Color(0xFFFFEFDF);
  
  // Surface
  static const Color surface = Colors.white;
  static const Color surfaceElevated = Color(0xFFFFFBF7);
  
  // Text
  static const Color textPrimary = Color(0xFF141414);
  static const Color textSecondary = Color(0xFF5C5C5C);
  
  // Status colors
  static const Color success = Color(0xFF1F8A54);
  static const Color warning = Color(0xFFF59E0B);
  static const Color danger = Color(0xFFD92D20);
  
  // Borders
  static const Color border = Color(0xFFE8D4C4);
  static const Color borderStrong = Color(0xFFD4B8A4);
}
```

### 3.2 Typography

```dart
class AppTypography {
  // Headlines
  static const headline1 = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.w800,
    color: AppColors.textPrimary,
  );
  
  // Body text
  static const body1 = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w400,
    color: AppColors.textPrimary,
  );
  
  // Labels
  static const label = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w600,
    color: AppColors.textSecondary,
  );
}
```

### 3.3 Spacing Scale

```dart
class AppSpacing {
  static const double xxs = 4;    // Micro
  static const double xs = 8;     // Extra small
  static const double sm = 12;    // Small
  static const double md = 16;    // Medium (default)
  static const double lg = 20;    // Large
  static const double xl = 24;    // Extra large
  static const double xxl = 32;   // 2X large
  static const double xxxl = 40;  // 3X large
}
```

### 3.4 Border Radius

```dart
class AppRadii {
  static const double sm = 12;
  static const double md = 16;
  static const double lg = 22;
  static const double xl = 28;
}
```

---

## 4. Authentication Screens

### 4.1 Signup Flow

#### Screen 1: Phone Verification

```
┌─────────────────────────────┐
│   INDRAPRASTHA NEET        │
│      ACADEMY               │
├─────────────────────────────┤
│                             │
│   Get Started               │
│   Enter your phone          │
│                             │
│  [+91 |  9876543210     ]  │
│                             │
│  Send OTP Button            │
│  Login existing? → link     │
│                             │
└─────────────────────────────┘
```

**Key Actions:**
- Enter phone number (10 digits)
- Validate format (Indian phone)
- Send OTP button triggers Firebase Phone Auth
- Error handling (invalid format, rate limit)

---

#### Screen 2: OTP Verification

```
┌─────────────────────────────┐
│   OTP Verification          │
├─────────────────────────────┤
│                             │
│   6-digit OTP sent to       │
│   +91 98765 43210           │
│                             │
│   [6][6][1][9][8][7]       │
│   (Auto-input boxes)        │
│                             │
│   Verify & Continue         │
│   Resend OTP? (30s) ↻       │
│                             │
│   Wrong number? Change      │
│                             │
└─────────────────────────────┘
```

**Key Actions:**
- Auto-fill OTP input boxes
- Countdown timer for resend (30 seconds)
- Verify button triggers Firebase OTP verification
- Error messages for wrong OTP

---

#### Screen 3: Create Account

```
┌─────────────────────────────┐
│   Create Account            │
├─────────────────────────────┤
│                             │
│   Full Name                 │
│   [Aarav Sharma         ]  │
│                             │
│   Password                  │
│   [••••••••••••••••]       │
│   Min 8 characters          │
│                             │
│   Confirm Password          │
│   [••••••••••••••••]       │
│                             │
│   Select Your Batch         │
│   [NEET 2025      ▼]       │
│                             │
│   Course Category           │
│   [Medical        ▼]        │
│                             │
│   Create Account            │
│                             │
└─────────────────────────────┘
```

**Key Fields:**
- **Full Name:** Min 2 chars, max 100
- **Password:** Min 8 chars (shown/hidden toggle)
- **Confirm Password:** Must match
- **Batch:** Dropdown with available batches
- **Course Category:** Dropdown (NEET, future: AIIMS, etc.)

**Validation Rules:**
- Full name: alphabets + spaces only
- Password: minimum 8 characters
- Passwords match: real-time validation
- Batch: required selection

---

### 4.2 Login Flow

```
┌─────────────────────────────┐
│   Welcome Back              │
├─────────────────────────────┤
│                             │
│   Phone Number              │
│   [+91 |  9876543210     ]  │
│                             │
│   Password                  │
│   [••••••••••••••••]        │
│   Show password? □          │
│                             │
│   Login Button              │
│   New here? Signup → link   │
│   Forgot password? (future) │
│                             │
└─────────────────────────────┘
```

**Key Actions:**
- Phone + password entry
- Show/hide password toggle
- Login button triggers backend auth
- Error handling (wrong credentials, user not found)

---

## 5. Main Dashboard

### 5.1 Dashboard Structure

```
┌──────────────────────────────┐
│  ← ← | DASHBOARD | ⋮ Menu   │  (AppBar)
├──────────────────────────────┤
│                              │
│  Hi Aarav! 👋 98% done      │  (Greeting)
│                              │
│ ┌──────────────────────────┐ │
│ │ Daily MCQ                │ │
│ │ Solve today's question   │ │  (Daily MCQ Card)
│ │ [Solve Now →]            │ │
│ └──────────────────────────┘ │
│                              │
│ LEARNING PROGRESS            │  (Section header)
│ ┌──────────────────────────┐ │
│ │ Questions Solved         │ │
│ │ 342 / 1000  ●●●●○○○○    │ │  (Progress card)
│ └──────────────────────────┘ │
│                              │
│ ┌──────────────────────────┐ │
│ │ Accuracy: 78%            │ │
│ │ Speed: 45 Q/hour         │ │  (Performance card)
│ └──────────────────────────┘ │
│                              │
│ ┌──────────────────────────┐ │
│ │ Weak Topics              │ │
│ │ • Organic Chemistry (65%) │ │  (Weak areas)
│ │ • Trigonometry (72%)      │ │
│ │ [Focus Mode →]           │ │
│ └──────────────────────────┘ │
│                              │
├──────────────────────────────┤
│ Courses | Practice | Tests   │  (Bottom navigation)
│ Videos | More               │
└──────────────────────────────┘
```

### 5.2 Dashboard Widgets

| Widget | Purpose | Data Source |
|--------|---------|-------------|
| **Greeting** | Personalized welcome | User's name |
| **Daily MCQ** | Quick practice | daily_mcqs table |
| **Progress Card** | Total questions solved | test_attempts + practice_questions |
| **Performance Card** | Accuracy + speed metrics | exam_analytics table |
| **Weak Topics** | Problem areas | exam_analytics (topic-wise) |
| **Study Streaks** | Motivation (future) | daily_mcqs attempts |

---

## 6. Core Screens

### 6.1 Courses Screen

```
┌──────────────────────────────┐
│  Courses  | [Selected Batch] │
├──────────────────────────────┤
│                              │
│ PHYSICS                      │
│ ┌────────────────────────┐  │
│ │ Mechanics              │  │
│ │ 120 questions • Hard   │  │
│ │ [Start Practice →]     │  │
│ └────────────────────────┘  │
│                              │
│ ┌────────────────────────┐  │
│ │ Electrostatics         │  │
│ │ 89 questions • Easy    │  │
│ │ [Start Practice →]     │  │
│ └────────────────────────┘  │
│                              │
│ CHEMISTRY                    │
│ [Similar structure]          │
│                              │
│ BIOLOGY                      │
│ [Similar structure]          │
│                              │
└──────────────────────────────┘
```

---

### 6.2 Practice Screen

```
┌──────────────────────────────┐
│  Practice Sets               │
├──────────────────────────────┤
│                              │
│ Filter: [Physics ▼] [Sort ▼] │
│                              │
│ SELECTED PRACTICE SET:       │
│ Waves & Sound               │
│ 45 questions • 78% solved   │
│                              │
│ Question 1 / 45              │
│ ┌────────────────────────┐  │
│ │ A wave travels at 20m/s│  │
│ │ with frequency 5Hz.    │  │
│ │ Find wavelength.       │  │
│ │                        │  │
│ │ ◯ A) 4m                │  │
│ │ ◉ B) 5m       Selected │  │
│ │ ◯ C) 2m                │  │
│ │ ◯ D) 10m               │  │
│ └────────────────────────┘  │
│                              │
│ [Previous] [Explain] [Next] │
│                              │
│ Your Answer: B (Correct) ✓   │
│ [View Explanation]           │
│                              │
└──────────────────────────────┘
```

**Features:**
- Question numbering
- 4 MCQ options
- Show/hide explanations with images
- Navigation (previous/next)
- Accuracy tracking
- Topic filtering

---

### 6.3 Tests Screen

```
┌──────────────────────────────┐
│  Mock Tests                  │
├──────────────────────────────┤
│                              │
│ UPCOMING TESTS               │
│ ┌────────────────────────┐  │
│ │ Full Length NEET Test  │  │
│ │ 180 questions • 3 hrs  │  │
│ │ NEET Pattern           │  │
│ │ [Start Test →]         │  │
│ └────────────────────────┘  │
│                              │
│ ┌────────────────────────┐  │
│ │ Physics Test - Part A  │  │
│ │ 45 questions • 1.5 hrs │  │
│ │ [Start Test →]         │  │
│ └────────────────────────┘  │
│                              │
│ COMPLETED TESTS (5)          │
│ ┌────────────────────────┐  │
│ │ Full Length NEET Test  │  │
│ │ Score: 285/360 (79%)   │  │
│ │ Rank: 234th Percentile │  │
│ │ [View Results →]       │  │
│ └────────────────────────┘  │
│                              │
└──────────────────────────────┘
```

---

### 6.4 Test Taking Screen

```
┌──────────────────────────────┐
│ NEET Full Test | Time: 2:45  │  (Timer)
├──────────────────────────────┤
│                              │
│ Question 45 / 180            │
│ ┌────────────────────────┐  │
│ │ Which is the main      │  │
│ │ product of glycolysis? │  │
│ │                        │  │
│ │ ◯ A) Glucose           │  │
│ │ ◯ B) Pyruvate          │  │
│ │ ◯ C) Acetyl-CoA        │  │
│ │ ◯ D) ATP               │  │
│ └────────────────────────┘  │
│                              │
│ ⊗ Not Answered  ✓ Answered  │
│ ◯ Marked for Review (M)     │  (Review indicator)
│                              │
│ [Previous] [Mark] [Next]     │
│                              │
│ Question Navigator:          │
│ ●●●●◯●M◯●●●●●◯●●●●●●●●●●  │ (Visual grid)
│ (Scroll to jump)             │
│                              │
│ Bottom Bar:                  │
│ ⊗ Not Answered: 10           │
│ ✓ Answered: 34               │
│ ◯ Marked: 1                  │
│                              │
├──────────────────────────────┤
│ [Submit Test] [Save & Exit]  │
└──────────────────────────────┘
```

**Features:**
- Real-time timer with warning (< 5 min)
- Question navigator grid
- Mark for review feature
- Question status tracking
- Pause/resume capability

---

### 6.5 Test Results Screen

```
┌──────────────────────────────┐
│ Test Results                 │
├──────────────────────────────┤
│                              │
│ ┌──────────────────────────┐│
│ │ NEET Full Mock Test      ││
│ │ Score: 285 / 360         ││
│ │ Percentage: 79%          ││
│ │ All India Rank: 234      ││ (If competitive)
│ └──────────────────────────┘│
│                              │
│ SUBJECT-WISE PERFORMANCE     │
│ ┌────────────────────────┐  │
│ │ Physics      ████████ 82% │
│ │ Chemistry    ███████░ 78% │
│ │ Biology      ██████░░ 72% │
│ └────────────────────────┘  │
│                              │
│ PERFORMANCE METRICS          │
│ Accuracy: 79%                │
│ Speed: 2.5 min/question      │
│ Marked for Review: 1         │
│                              │
│ DETAILED ANALYSIS            │
│ Physics:                     │
│ • Mechanics: 90% (9/10)      │
│ • Waves: 70% (7/10)          │
│ • Optics: 80% (8/10)         │
│                              │
│ Chemistry:                   │
│ • Organic: 85% (17/20)       │
│ • Inorganic: 65% (13/20)     │
│ • Physical: 80% (16/20)      │
│                              │
│ Biology:                     │
│ • Botany: 75% (15/20)        │
│ • Zoology: 70% (14/20)       │
│                              │
│ [Compare with Previous Test] │
│ [Practice Weak Topics]       │
│ [Share Results]              │
│                              │
└──────────────────────────────┘
```

---

## 7. Videos Screen

```
┌──────────────────────────────┐
│  Videos                      │
├──────────────────────────────┤
│                              │
│ Search: [Search videos...  ] │
│                              │
│ RECOMMENDED FOR YOU          │
│ ┌────────────────────────┐  │
│ │ [Thumbnail Image] ▶️    │  │
│ │ Physics Mechanics      │  │
│ │ Kinematics Part 1      │  │
│ │ Duration: 45 min       │  │
│ │ ⭐ 4.8 (2.3K reviews)  │  │
│ └────────────────────────┘  │
│                              │
│ BIOLOGY VIDEOS               │
│ ┌────────────────────────┐  │
│ │ Photosynthesis Basics  │  │
│ │ Duration: 32 min       │  │
│ │ ⭐ 4.9                 │  │
│ └────────────────────────┘  │
│                              │
│ ┌────────────────────────┐  │
│ │ Plant Hormones         │  │
│ │ Duration: 28 min       │  │
│ │ ⭐ 4.7                 │  │
│ └────────────────────────┘  │
│                              │
│ WATCH HISTORY (8)            │
│ ┌────────────────────────┐  │
│ │ Organic Reactions      │  │
│ │ Continue Watching ► 12min │
│ │ remaining               │  │
│ └────────────────────────┘  │
│                              │
└──────────────────────────────┘
```

**Features:**
- Video search
- Category filtering
- Watch history tracking
- Resume feature (continue from where user left off)
- Ratings and reviews
- Video quality selection (future)

---

## 8. Books Screen

```
┌──────────────────────────────┐
│  Books & Notes               │
├──────────────────────────────┤
│                              │
│ NCERT BOOKS                  │
│ ┌────────────────────────┐  │
│ │ 📕 NCERT Physics 11    │  │
│ │ 15 chapters • 342 pages│  │
│ │ 78% completed          │  │
│ │ [Open →]               │  │
│ └────────────────────────┘  │
│                              │
│ ┌────────────────────────┐  │
│ │ 📗 NCERT Chemistry 11  │  │
│ │ 12 chapters            │  │
│ │ [Open →]               │  │
│ └────────────────────────┘  │
│                              │
│ HANDWRITTEN NOTES            │
│ ┌────────────────────────┐  │
│ │ 📝 JEE Preparation     │  │
│ │ Notes by top rankers   │  │
│ │ [Download →]           │  │
│ └────────────────────────┘  │
│                              │
│ FORMULA SHEETS               │
│ ┌────────────────────────┐  │
│ │ 📄 Physics Formulas    │  │
│ │ All formulas in one    │  │
│ │ [View →]               │  │
│ └────────────────────────┘  │
│                              │
└──────────────────────────────┘
```

---

## 9. User Profile Screen

```
┌──────────────────────────────┐
│  Profile                     │
├──────────────────────────────┤
│          [Avatar]            │
│    Aarav Sharma              │
│    +91 98765 43210           │
│                              │
│ BATCH & COURSE               │
│ Batch: NEET 2025             │
│ Course: Medical              │
│ [Change ▶]                   │
│                              │
│ ACCOUNT SETTINGS             │
│ ┌────────────────────────┐  │
│ │ Change Password        │  │
│ │ Preferred Language     │  │
│ │ Email Notifications    │  │
│ │ Push Notifications     │  │
│ └────────────────────────┘  │
│                              │
│ STATISTICS                   │
│ ┌────────────────────────┐  │
│ │ Questions Solved: 1245 │  │
│ │ Tests Completed: 18    │  │
│ │ Accuracy: 78%          │  │
│ │ Study Streak: 12 days  │  │
│ └────────────────────────┘  │
│                              │
│ LEGAL & SUPPORT              │
│ ┌────────────────────────┐  │
│ │ Privacy Policy         │  │
│ │ Terms of Service       │  │
│ │ About App (v1.0.0)     │  │
│ │ Contact Support        │  │
│ │ Rate App (⭐⭐⭐⭐⭐)    │  │
│ └────────────────────────┘  │
│                              │
│ [Delete Account] [Logout]    │
│                              │
└──────────────────────────────┘
```

---

## 10. State Management (BLoC)

### 10.1 Auth BLoC

```dart
class AuthState extends Equatable {
  final String? phone;
  final String? verificationId;
  final String? firebaseIdToken;
  final AppUser? user;
  final String? token;
  final bool isLoading;
  final String? error;
  final AuthStatus status; // initial, signup, login, authenticated

  // Custom copyWith method
}

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  // Events:
  // - SendOtp(phone)
  // - VerifyOtp(otp)
  // - CompleteSignup(...)
  // - Login(phone, password)
  // - Logout
  
  // Handlers:
  // - on<SendOtp>(_onSendOtp)
  // - on<VerifyOtp>(_onVerifyOtp)
  // - on<CompleteSignup>(_onCompleteSignup)
  // - on<Login>(_onLogin)
  // - on<Logout>(_onLogout)
}
```

### 10.2 Dashboard BLoC

```dart
class DashboardBloc extends Bloc<DashboardEvent, DashboardState> {
  // Events:
  // - LoadDashboard
  // - RefreshProgress
  
  // Queries:
  // - Fetch total questions solved
  // - Fetch accuracy percentage
  // - Fetch weak topics
  // - Fetch daily MCQ
  
  // Cache strategy: 1-hour cache + manual refresh
}
```

### 10.3 Test BLoC

```dart
class TestBloc extends Bloc<TestEvent, TestState> {
  // Events:
  // - LoadTests
  // - StartTest(testId)
  // - SubmitAnswer(questionId, answer)
  // - SubmitTest
  // - LoadResults(attemptId)
  
  // Features:
  // - Track time remaining
  // - Save progress locally
  // - Handle network failures (offline mode future)
  // - Post results to backend
}
```

---

## 11. API Integration

### 11.1 HTTP Client Setup

```dart
class ApiClient {
  final String baseUrl = 'https://api.indraprasthaneetacademy.com/api';
  final http.Client httpClient;
  
  Future<Map<String, dynamic>> login({
    required String phone,
    required String password,
  }) async {
    final response = await httpClient.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: jsonEncode({
        'phone': phone,
        'password': password,
      }),
    );
    
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Login failed');
    }
  }
}
```

### 11.2 Error Handling

```dart
// Custom exception for API errors
class ApiException implements Exception {
  final String message;
  final int? statusCode;
  
  ApiException(this.message, [this.statusCode]);
  
  @override
  String toString() => 'ApiException: $message';
}

// Network error handling
try {
  final result = await _api.fetchTests();
} on ApiException catch (e) {
  _showError('API Error: ${e.message}');
} on SocketException {
  _showError('No internet connection');
} catch (e) {
  _showError('Unexpected error');
}
```

---

## 12. Responsive Design

### 12.1 Breakpoints

```dart
class ResponsiveBreakpoints {
  static const double mobile = 480;
  static const double tablet = 768;
  static const double desktop = 1024;
  
  static bool isMobile(BuildContext context) =>
      MediaQuery.of(context).size.width < tablet;
  
  static bool isTablet(BuildContext context) =>
      MediaQuery.of(context).size.width >= tablet &&
      MediaQuery.of(context).size.width < desktop;
  
  static bool isDesktop(BuildContext context) =>
      MediaQuery.of(context).size.width >= desktop;
}
```

### 12.2 Responsive Layout

```dart
Widget build(BuildContext context) {
  if (ResponsiveBreakpoints.isDesktop(context)) {
    return _buildDesktopLayout();
  } else if (ResponsiveBreakpoints.isTablet(context)) {
    return _buildTabletLayout();
  } else {
    return _buildMobileLayout();
  }
}
```

---

## 13. Performance Optimization

### 13.1 Image Optimization

```dart
// Use `Image.network` with proper caching
Image.network(
  imageUrl,
  fit: BoxFit.cover,
  cacheWidth: 400,
  cacheHeight: 300,
  errorBuilder: (context, error, stackTrace) {
    return Placeholder();
  },
  loadingBuilder: (context, child, progress) {
    if (progress == null) return child;
    return Center(
      child: CircularProgressIndicator(
        value: progress.expectedTotalBytes != null
            ? progress.cumulativeBytesLoaded /
                progress.expectedTotalBytes!
            : null,
      ),
    );
  },
)
```

### 13.2 List Optimization

```dart
// Use `ListView.builder` instead of `ListView`
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) => ListTile(
    title: Text(items[index].title),
  ),
)

// Use `RepaintBoundary` for complex widgets
RepaintBoundary(
  child: ExpensiveWidget(),
)
```

### 13.3 Lazy Loading

```dart
// Load questions one by one during test
class TestScreen extends StatefulWidget {
  @override
  State<TestScreen> createState() => _TestScreenState();
}

class _TestScreenState extends State<TestScreen> {
  int currentQuestionIndex = 0;
  late List<Question> allQuestions;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _buildQuestion(allQuestions[currentQuestionIndex]),
        _buildNavigationButtons(),
      ],
    );
  }
}
```

---

## 14. Accessibility

### 14.1 Semantic Labels

```dart
// Use Semantics widget for screen readers
Semantics(
  label: 'Submit test button',
  button: true,
  enabled: true,
  onTap: () => _submitTest(),
  child: ElevatedButton(
    onPressed: () => _submitTest(),
    child: Text('Submit'),
  ),
)
```

### 14.2 Color Contrast

- Minimum contrast ratio: 4.5:1 for body text
- Verified with tools: Contrast Ratio Checker

### 14.3 Font Size

- Minimum: 12pt (body text)
- Recommended: 14pt+ for readability
- Scalable: Use relative sizing (sp units)

---

## 15. Testing

### 15.1 Unit Tests

```dart
void main() {
  group('AuthRepository', () {
    late AuthRepository authRepository;
    
    setUp(() {
      authRepository = AuthRepository(/* ... */);
    });
    
    test('login returns user when credentials valid', () async {
      final result = await authRepository.login(
        phone: '9876543210',
        password: 'password123',
      );
      
      expect(result['user'], isNotNull);
      expect(result['token'], isNotNull);
    });
  });
}
```

### 15.2 Widget Tests

```dart
void main() {
  group('LoginScreen', () {
    testWidgets('shows error on invalid credentials', (tester) async {
      await tester.pumpWidget(const LoginScreen());
      
      // Find and fill fields
      await tester.enterText(find.byType(TextField).first, '9876543210');
      await tester.enterText(find.byType(TextField).last, 'wrongpass');
      
      // Tap login
      await tester.tap(find.text('Login'));
      await tester.pumpWidget(const Placeholder()); // Wait for async
      
      // Verify error shown
      expect(find.text('Invalid credentials'), findsOneWidget);
    });
  });
}
```

---

## 16. Future Enhancements

- [ ] Offline mode (local data sync)
- [ ] Dark mode (Material You dark theme)
- [ ] Biometric authentication (fingerprint, face)
- [ ] Gamification (badges, leaderboards)
- [ ] Social features (study groups, peer help)
- [ ] AI-powered study recommendations
- [ ] Multi-language support (Hindi, regional languages)

---

## 17. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | June 2026 | Frontend Lead | Initial specification |

---

**Status:** APPROVED  
**Next Review:** September 2026
