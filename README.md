<p align="center">
  <img src="./assets/images/smart_campus_banner.png" alt="Indraprastha Smart Campus Banner" width="100%" />
</p>

<h1 align="center">🏛️ Smart Campus Resource & Classroom Optimizer</h1>

<p align="center">
  <b>An AI-powered, intelligent resource allocation & timetable optimization system for educational institutions.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Flutter-3.10%2B-02569B?style=for-the-badge&logo=flutter&logoColor=white" alt="Flutter" />
  <img src="https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/PostgreSQL-14%2B-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Firebase-Auth%20%26%20FCM-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/AI_Engine-Gemini%20%2F%20Vertex-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="AI Engine" />
  <img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge" alt="Status" />
</p>

---

## 📌 Status Notice
> [!NOTE]
> **Live Demo Status:** Internal / Self-Hosted Deployment.  
> *A public web link is currently not hosted. Please follow the detailed local setup steps below to run the backend server, web admin portal, and mobile app on your machine.*

---

## 📑 Table of Contents
- [📌 Status Notice](#-status-notice)
- [🧩 Problem Statement](#-problem-statement)
- [💡 Intelligent Solution](#-intelligent-solution)
- [✨ Key Features \& Implemented Modules](#-key-features--implemented-modules)
- [🚀 Bonus \& Extra Implemented Features](#-bonus--extra-implemented-features)
- [🖥️ UI Visual Showcase](#️-ui-visual-showcase)
- [🏗️ System Architecture](#️-system-architecture)
- [✅ Mandatory MVP Checklist](#-mandatory-mvp-checklist)
- [⚙️ Step-by-Step Installation \& Setup](#️-step-by-step-installation--setup)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Backend Setup (`indraprastha-backend`)](#2-backend-setup-indraprastha-backend)
  - [3. Web / Admin App Setup (`indraprastha_admin_app`)](#3-web--admin-app-setup-indraprastha_admin_app)
  - [4. Student Mobile App Setup (`lib`)](#4-student-mobile-app-setup-lib)
- [🔒 Security \& Access Control](#-security--access-control)
- [📜 Documentation Index](#-documentation-index)

---

## 🧩 Problem Statement

**Problem Statement 3: Smart Campus Resource & Classroom Optimizer**  
**Category:** `AI` / `Optimization` / `Student-Centric`

### Background
Colleges and educational institutions often face severe classroom and laboratory scheduling bottlenecks:
- **Uneven Resource Distribution:** Classrooms, laboratories, seminar halls, and equipment remain completely unused during certain peak hours.
- **Overcrowding & Conflicts:** Simultaneously, other rooms suffer from overcrowding, double-booking, or seating capacity mismatches.
- **Static Scheduling:** Traditional static timetables fail to adjust dynamically to changing class sizes, faculty availability, or special equipment requirements (e.g., projector, database server lab, chemistry apparatus).

### Constraints & Allocation Parameters
The optimization engine must process multi-variable parameters:
* 🏫 **Room Capacity:** Max seating vs student batch size.
* 👥 **Student Strength:** Section size and enrollment numbers.
* 👨‍🏫 **Faculty Availability:** Workload limits and teacher schedules.
* 🔬 **Equipment Requirements:** Labs, projectors, specialized software, SMART boards.
* 📅 **Timetable Matrix:** Slot durations and recurring lecture blocks.
* 🟢 **Real-Time Room Availability:** Active occupation status and maintenance schedules.

### Example Scenario
| Facility | Time Slot | Status |
| :--- | :--- | :--- |
| **Room A** | 09:00 - 11:00 AM | Class (Occupied) |
| **Room A** | 11:00 - 01:00 PM | **Empty (Underutilized)** |
| **Room A** | 01:00 - 03:00 PM | Class (Occupied) |
| **Room B** | 09:00 - 01:00 PM | **Full (Overcrowded)** |
| **Room B** | 01:00 - 03:00 PM | Empty |
| **Lab A** | 09:00 - 05:00 PM | **35% Utilization (Low Efficiency)** |

> 💡 **System Recommendation Output:**  
> *"Move Database Lab from Lab B to Lab A at 2:00 PM to eliminate overcrowding in Room B and boost Lab A utilization to 85%."*

---

## 💡 Intelligent Solution

**Indraprastha Smart Campus Optimizer** solves resource inefficiency by uniting a **Heuristic Optimization Engine**, **AI Natural Language Reasoning**, and a **Multi-Platform App Ecosystem** (Web Dashboard + Mobile Apps).

```
   ┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
   │ Timetable Data &     │ ───► │ Heuristic & AI       │ ───► │ Dynamic Re-allocation│
   │ Resource Constraints │      │ Optimization Engine  │      │ & Conflict Resolution│
   └──────────────────────┘      └──────────────────────┘      └──────────────────────┘
                                                                           │
                                                                           ▼
                                                               ┌──────────────────────┐
                                                               │ Plain-English Reason │
                                                               │ & Alert Notifications│
                                                               └──────────────────────┘
```

1. **Automated Conflict Identification:** Detects double-booked rooms, faculty time overlaps, equipment mismatches, and capacity overflow instantly.
2. **Dynamic Slot Re-Allocation:** Uses mathematical greedy search & constraint satisfaction algorithms (CSP) to generate non-conflicting allocations.
3. **Explainable AI Recommendations:** Generates clear, human-readable explanations specifying *why* a room change was suggested and *how much efficiency is gained*.
4. **Live Utilization Tracking:** Displays campus-wide heatmaps showing low, medium, and high capacity rooms throughout the week.

---

## ✨ Key Features & Implemented Modules

- 🏢 **Classroom & Lab Allocation Engine:** Automatic matching based on section strength, lab equipment needs, and room seating capacities.
- ⚡ **Real-Time Conflict Detector:** Flags faculty availability collisions and room overlaps before schedules are published.
- 📊 **Campus Utilization Analytics:** Visual heatmaps showing room usage trends, peak demand hours, and underutilized space metrics.
- 📢 **Automated Swapping Notifications:** Push alerts via Firebase Cloud Messaging (FCM) when a class venue or lab slot changes.
- 🔐 **Role-Based Access Control (RBAC):** Multi-tier authorization for Campus Administrators, Department Heads, Faculty, and Students.

---

## 🚀 Bonus & Extra Implemented Features

In addition to fulfilling the core MVP requirements, our platform includes several advanced modules:

| Extra Feature Module | Description & Capabilities |
| :--- | :--- |
| 🤖 **AI Timetable Generator (Bonus)** | Fully autonomous timetable compilation engine that builds weekly schedules from raw subject-teacher mapping. |
| 💬 **AI Natural Language Explanation** | Integrates AI reasoning to convert raw mathematical allocations into clear step-by-step guidance for department heads. |
| 📚 **Indraprastha Student Ecosystem** | Complete student app integration containing **3,400+ practice questions**, mock test series, and personalized study analytics. |
| 📈 **AI Score & Rank Predictor** | Machine learning analytics for NEET/Academic performance scoring, topic-wise weak area analysis, and accuracy heatmaps. |
| 📱 **Cross-Platform Support** | Unified codebase delivering native Web, Android, iOS, and Windows Desktop administrative experiences. |
| 📥 **Batch CSV/JSON Importers** | Bulk import feature for uploading existing master timetables, room directories, and faculty registries. |

---

## 🖥️ UI Visual Showcase

### 🌐 Admin Web Dashboard & Optimization Workspace
> Real-time room capacity heatmaps, schedule timelines, conflict alerts, and AI recommendation panels.

<p align="center">
  <img src="./assets/images/web_dashboard_preview.png" alt="Web Dashboard Preview" width="95%" />
</p>

---

### 📱 Student & Faculty Mobile App
> Dynamic timetable views, venue navigation, exam analytics, and instant schedule update notifications.

<p align="center">
  <img src="./assets/images/mobile_app_preview.png" alt="Mobile App Preview" width="95%" />
</p>

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Clients["Client Layer"]
        A[Flutter Web Admin Portal]
        B[Flutter Mobile App - iOS/Android]
        C[Windows Desktop App]
    end

    subgraph API["API & Gateway Layer"]
        D[Express.js API Router]
        E[JWT Auth & Rate Limiter]
        F[Firebase FCM Provider]
    end

    subgraph Core["Core Intelligence Engine"]
        G[Constraint Satisfaction Solver]
        H[Resource & Room Heatmap Generator]
        I[AI Reasoning & Explanation Engine]
    end

    subgraph Data["Persistence & Cloud Layer"]
        J[(PostgreSQL 14+ Database)]
        K[Firebase Cloud Services]
        L[Google Cloud Compute Infrastructure]
    end

    A --> D
    B --> D
    C --> D
    D --> E
    E --> G
    E --> H
    E --> I
    G --> J
    H --> J
    I --> K
    D --> F
```

---

## ✅ Mandatory MVP Checklist

| # | Requirement | Implementation Details | Status |
| :-: | :--- | :--- | :-: |
| **1** | **Accept Timetable & Resource Data** | Supports JSON/CSV input & relational database storage for rooms, labs, subjects, faculty, and schedules. | ✅ **100% Done** |
| **2** | **Identify Conflicts & Underutilization** | Real-time scanner flags capacity mismatches, faculty collisions, and rooms with < 40% usage. | ✅ **100% Done** |
| **3** | **Generate Optimized Allocation** | CSP & greedy optimization algorithms re-route classes to ideal available spaces. | ✅ **100% Done** |
| **4** | **Explain the Recommendation** | AI-driven natural language engine explains reasons for room swaps & efficiency gains. | ✅ **100% Done** |
| **🌟** | **Bonus: AI-Generated Optimized Timetable** | Fully automated weekly schedule synthesizer using constraint satisfaction. | ✅ **100% Done** |

---

## ⚙️ Step-by-Step Installation & Setup

### Prerequisites
Before running the application, ensure you have installed:
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [Flutter SDK](https://docs.flutter.dev/get-started/install) (v3.10.x or higher)
- [PostgreSQL](https://www.postgresql.org/) (v14.x or higher)
- Git

---

### 1. Clone Repository

```bash
git clone https://github.com/your-username/indraprastha-smart-campus.git
cd indraprastha-smart-campus
```

---

### 2. Backend Setup (`indraprastha-backend`)

```bash
# Navigate to backend folder
cd indraprastha-backend

# Install dependencies
npm install

# Create environment configuration file
cp .env.example .env
```

#### Configure `.env` File:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/indraprastha_db
JWT_SECRET=your_super_secret_jwt_key_12345
FIREBASE_PROJECT_ID=your-firebase-project-id
```

#### Run Database Setup & Start Backend:
```bash
# Initialize DB tables & seed test data
npm run db:setup

# Start development server with Nodemon
npm run dev
```
> 🚀 Backend server will start at: `http://localhost:5000`

---

### 3. Web / Admin App Setup (`indraprastha_admin_app`)

```bash
# Navigate to admin app directory
cd ../indraprastha_admin_app

# Fetch dependencies
flutter pub get

# Run Admin Web Portal in Chrome browser
flutter run -d chrome

# (Optional) Run as native Windows Desktop Application
flutter run -d windows
```

---

### 4. Student Mobile App Setup (`lib`)

```bash
# Return to root Flutter workspace
cd ..

# Fetch mobile dependencies
flutter pub get

# Run on connected Android / iOS device or Emulator
flutter run
```

---

## 🔒 Security & Access Control

- 🔑 **Authentication:** Phone OTP (Firebase) + Passwords hashed with `bcrypt` (10 rounds).
- 🛡️ **Session Management:** Secure JWT tokens with 24-hour expiration.
- ⚡ **Rate Limiting:** IP-based request throttling to prevent DDoS and brute-force attacks.
- 🔒 **Data Encryption:** TLS/HTTPS transit protection and encrypted local Keystore/Keychain storage.

---

## 📜 Documentation Index

For detailed technical specifications, architectural diagrams, and PRD documents, refer to the [`docs/`](./docs) folder:

- 📊 **[Product Requirements Document (PRD)](./docs/TECHNICAL_PRD.md)**
- 🏗️ **[Technical Architecture & Database Schema](./docs/TECHNICAL_ARCHITECTURE.md)**
- 🎨 **[Frontend Design System & Specifications](./docs/TECHNICAL_FRONTEND_SPEC.md)**
- 🔒 **[Security & Access Control Specifications](./docs/TECHNICAL_SECURITY_ACCESS.md)**
- 🤖 **[AI Features & Implementation Guide](./docs/AI_FEATURES_IMPLEMENTATION_GUIDE.md)**

---

<p align="center">
  Crafted with ❤️ by <b>Team Indraprastha</b> • Smart Campus & Learning Ecosystem
</p>
