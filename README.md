# Aarohan: AI-Enabled Scholarship Management System
Aarohan is an AI-enabled scholarship management platform built for the Ministry of Tribal Affairs. It prevents avoidable application rejections by pre-verifying student documents before final submission, empowers scrutiny officers with a split-screen verification console, and accelerates Direct Benefit Transfer (DBT) disbursements for Scheduled Tribe scholars nationwide.

## Problem Statement

- **Problem Statement ID**: 26239
- **Problem Statement Title**: AI-Enabled Scholarship and Fellowship Management System for Scheduled Tribes
- **Ministry / Department**: Ministry of Tribal Affairs (MoTA), Government of India
- **Category**: Software
- **Theme**: Smart Education

<img width="1376" height="768" alt="image" src="public/screenshots/architecture_diagram.png" />

---

## Description of Aarohan

**Aarohan** (TribalScholar) is a production-ready digital platform built for the Ministry of Tribal Affairs (MoTA) to administer scholarship and fellowship schemes for Scheduled Tribe (ST) students pursuing higher secondary, undergraduate, postgraduate, doctoral, and international studies.

Aarohan does not aim to replace the National Scholarship Portal (NSP). Instead, it sits directly on top of the applicant journey as an intelligent **readiness, verification, and management layer** designed to eliminate the root cause of scheme processing bottlenecks: **avoidable application failures before submission**.

### Guiding Principles

- **Journey Lifecycle**: Discover -> Understand -> Prepare -> Verify -> Apply -> Fix -> Track -> Succeed.
- **Rules Over Black-Box Models**: Deterministic rules engines decide eligibility and scheme compliance; AI/LLM components only explain the results in plain language; human officers retain final statutory decision authority.
- **Constructive Tone**: The system never accuses students of fraud; inconsistencies are flagged as *"Potential inconsistency detected - human review required"*.
- **Total Explainability**: Every check surfaces the observed value, required threshold, confidence score, and specific source document evidence.
- **Zero Hallucination Guard**: The system never invents guidelines, deadlines, or stipend figures; all responses are strictly grounded in configured ministry scheme rules.
- **Three Core Personas**:
  1. Scheduled Tribe Applicant / Scholar
  2. Scrutiny and Verification Officer (INO / DWO / Ministry Desk Officer)
  3. Ministry Executive and Policy Administrator


## Why We Built This and Who Gets Benefited

### Why We Built This

Traditional scholarship workflows across central and state welfare departments face severe structural bottlenecks:

1. **The Avoidable Rejection Dilemma**:
   Over 40% of scholarship rejections or delays stem from preventable clerical faults: faint revenue stamps, slightly blurred scans, cut-off seals, or minor name discrepancies between university admission orders and Aadhaar records (for example, "Pooja Xalxo" vs. "Pooja Rameshwar Xalxo"). Under traditional workflows, these result in outright rejection or months of postal correspondence.

2. **The Verification Desk Backlog**:
   Desk officers spend more than 60% of their working hours manually cross-checking raw scanned certificates against basic form fields, extending verification cycles up to 90 or more days per batch.

3. **The Black-Box Status Problem**:
   Students historically saw only ambiguous status labels like "Under Processing" without knowing whether their file was pending at their college, district revenue office, state directorate, or central ministry desk.

4. **Lack of Operational Intelligence**:
   Ministries had no systematic way to identify why applicants in specific regions abandoned forms or frequently submitted deficient income certificates.

Aarohan resolves these bottlenecks by shifting quality assurance to the moment of capture, offering structured 7-day deficiency correction windows, and synchronizing applicant data directly with scrutiny queues.

### Who Gets Benefited

1. **Scheduled Tribe Students and Research Scholars**:
   - **Discover & Check**: Search central schemes (NFST, NOS, Top Class, PMS-ST) and test eligibility against an explainable rule table.
   - **Pre-Submission Quality Feedback**: Instant feedback on document clarity (blur, glare, resolution) before submitting.
   - **Readiness Score**: A transparent 0-100% composite score estimating approval probability.
   - **Fix My Application Loop**: Resolve flagged defects within a protected 7-day grace period without forfeiting submission priority.
   - **Direct Benefit Transfer (DBT)**: Seamless fund disbursement via Aadhaar NPCI mapper and PFMS directly into savings accounts.

2. **Scrutiny and Verification Officers**:
   - **Triage Queues**: Automated triaging into Routine (high confidence >= 90%), Officer Review (70-90%), and Mandatory Human Review (< 70% or hard conflict) queues.
   - **Side-by-Side Review Desk**: Inspect student metadata alongside the original certificate with bounding-box extraction highlights.
   - **Structured Deficiency Notices**: Dispatch clear, actionable resubmission instructions with one click.
   - **Tamper-Evident Audit Trails**: Every verification, approval, deficiency note, and resubmission is permanently logged.

3. **Ministry Administrators and Policy Makers**:
   - **National Fund Visibility**: Real-time tracking of sanctioned budgets (INR 482+ Cr), scheme quota allocations, and disbursements.
   - **Regional & Gender Equity Metrics**: Monitor state-wise coverage and maintain female scholar participation above 51%.
   - **Deficiency Intelligence (Process Improvement Engine)**: Aggregate analysis flags systemic problems (for example, high income-certificate rejection in a specific state) so administrators can publish targeted guidance before application deadlines.


## Key Features

- **In-Dashboard 5-Phase Application Workflow**:
  - Hosted strictly within the authenticated student workspace at `/dashboard/apply/[schemeId]`.
  - Structured across 5 standardized Government of India stages: Personal Details, Family Particulars, Academic Enrolment, Bank & DBT Mandate, and Scrutiny Review.
  - Dedicated file upload dropzones in each phase for ST Caste Certificate, Annual Income Certificate, Previous Marksheets, Admission Order / Fee Receipt, and Bank Passbook.
  - Automatically pre-fills active student profile information to minimize redundant manual data entry.

- **AI-Assisted Document Intelligence & Scan Quality Pre-Checks**:
  - Real-time pre-submission scan analysis evaluating blur (Laplacian variance), contrast (grayscale standard deviation), brightness, and document skew.
  - Alerts applicants to poor-quality scans with actionable fix tips before submission, preventing avoidable scrutiny rejections.
  - Optical confidence scoring across uploaded certificates to detect and flag unreadable text early.

- **Cross-Document Name & Record Consistency Verification**:
  - Token-sort ratio algorithms cross-check student legal name, parental details, date of birth, and institution between application form inputs and uploaded certificates.
  - Flags potential discrepancies (such as spelling variations or name order changes) as constructive inconsistency notices rather than outright rejections.

- **Explainable Application Readiness Scoring (0 to 100%)**:
  - Transparent composite health score estimating the probability of zero-deficiency scrutiny approval.
  - Computed from 5 weighted factors: Eligibility Rules Completeness (20%), Application Form Completeness (20%), Document Upload Completeness (25%), Scan Quality (15%), and Cross-Document Consistency (20%).
  - Categorized into clear readiness bands: `Ready to submit` (>= 90%), `Almost ready` (70-89%), and `Needs attention` (< 70%).

- **Self-Service "Fix My Application" Resolution Loop**:
  - Automatically converts officer-flagged deficiencies into actionable student repair cards.
  - Displays the specific defect, explains why it was flagged, and provides numbered step-by-step resolution guidance.
  - Enables instant camera rescanning or file re-uploading with automatic readiness score recalculation and defect resolution.

- **Strict Session Boundaries & Role-Based Route Guards**:
  - Strict compartmentalization between public marketing pages and authenticated dashboard workspaces.
  - Prevents active logged-in users from accessing public pages without explicitly signing out, eliminating confusing dual-navigation states.
  - Automatically redirects unauthenticated guests attempting to apply for any scholarship to `/login?redirect=...`.

- **Level-1 Scrutiny Officer Verification Console**:
  - Centralized verification desk located at `/dashboard/officer` with automated queue triaging: Routine (high confidence >= 90%), Officer Review (70-90%), and Mandatory Human Review (< 70% or hard conflict).
  - Split-screen verification desk displaying student profile particulars alongside original certificate scans and extracted OCR bounding boxes.
  - One-click deficiency notice dispatch with pre-filled or customizable officer feedback notes.

- **Real-Time Cross-Queue Application Synchronization**:
  - Newly submitted student applications automatically persist in local state and immediately appear in the student's My Applications registry and the Level-1 Officer review queue without manual page reloads.

- **Official Printable Acknowledgement Receipts**:
  - Replaces raw browser alerts with a formal Government of India / MoTA e-Receipt modal.
  - Surfaces official application tracking ID, scheme name, student credentials, submission timestamp, scrutiny stage, and sanctioned stipend rate with native `window.print()` support.

- **Full-Height AI Assistant (Aarohan Copilot) with Web Speech**:
  - Dedicated 100% viewport container (`/dashboard/chatbot`) with an input bar permanently docked above the footer and smooth internal chat transcript scrolling.
  - Native Web Speech API integration: Speech Synthesis (read-aloud voice feature) and Speech Recognition (voice dictation).
  - Deep-link contextual handling: clicking "Ask AI Assistant" on any scholarship card automatically routes to the chatbot with the scheme query pre-populated.
  - Built-in deterministic offline fallback engine ensuring 100% availability even without an external API key.

- **Direct Benefit Transfer (DBT) & Aadhaar NPCI Mandate Validation**:
  - Dedicated verification of core banking savings accounts, IFSC codes, bank branch data, and active Aadhaar seeding on the NPCI mapper.
  - Mandatory PFMS Direct Benefit Transfer consent check ensuring scholarship stipends disburse directly to verified student bank accounts.

- **GIGW Accessibility Compliance & Strictly Zero Emojis**:
  - Adheres to Guidelines for Indian Government Websites (GIGW) with high-contrast color ratios, dynamic text size scalers (A, A+, A++), and a bilingual English/Hindi interface.
  - Strictly zero emojis across all 24 code files, page templates, icons, labels, and documentation.
  - Preserves the official circular Ministry of Tribal Affairs emblem (`/logo.png`).



## Technology Stack

| Layer | Selected Technology | Purpose and Architectural Rationale |
|---|---|---|
| **App Framework** | **Next.js 14 (App Router)** | Lightweight full-stack React framework providing server-side rendering, client hydration, and unified routing. |
| **Language** | **TypeScript 5** | Strict static typing across all components, interfaces, routes, and data models. |
| **Styling** | **Tailwind CSS 3** | Utility-first CSS engine with class dark mode and official MoTA color tokens (Deep Navy `#0B2545`, Forest Green `#1B6B4A`, Golden Warmth `#D98A00`). |
| **Icons** | **Lucide React** | Clean, accessible SVG icons used consistently across all components in place of emojis. |
| **AI / Copilot** | **Google Gemini API + Offline Engine** | Cloud generative AI assistant paired with a deterministic local rule-based fallback for 100% offline functionality. |
| **Speech & Audio** | **Web Speech API** | Native browser SpeechSynthesis (Text-to-Speech) and SpeechRecognition (Dictation) for hands-free interaction. |
| **State & Persistence** | **React Context & Storage Sync** | Modular state management for authentication (`auth-context`), dark mode (`theme-context`), and application synchronization. |


## Quick Start and Installation

### Prerequisites

Ensure you have installed:
- **Node.js**: `v18.17.0` or higher (verified on Node `v24.15.0`)
- **npm**: `v9.x` or higher (or `yarn` / `pnpm`)

Verify your installed versions:
```bash
node -v
npm -v
```

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/aarohan-portal.git
cd aarohan-portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 4. Type Safety Verification

To verify that all TypeScript types compile cleanly:
```bash
npx tsc --noEmit
```
Expected output: Exits with code 0 and zero errors.

### 5. Build and Run Production Server

To compile the optimized production bundle and start the server:
```bash
npm run build
npm start
```
The production server will be live and accessible at `http://localhost:3000`.

### 6. Fast-Track Demo Accounts

The portal includes pre-configured demo profiles on the login page (`/login`) for evaluation:

| Role | Demo Account Name | Designation / Identity | Primary Features |
|---|---|---|---|
| **ST Scholar** | Pooja Xalxo | ST Research Scholar (Ph.D.), Oraon Tribe | 5-Phase Application, Readiness Meter, My Applications, DBT Bank Data |
| **Scrutiny Officer** | Dr. Arvind Meena | Senior Scrutiny Officer, Fellowship Division  | Live Scrutiny Queue, Side-by-Side Review Desk, Deficiency Console |
| **Ministry Admin** | Joint Secretary | Ministry of Tribal Affairs, New Delhi  | National Analytics (INR 482+ Cr), Quota Bars, Regional Equity Ratios |


## Folder Structure

```
SC-ST Portal/
├── .env.example                    # Sample environment variables
├── .gitignore                      # Git exclusion rules (dependencies, build artifacts, caches, logs)
├── Aarohan_Master_Build_Spec.md    # Master architectural specification
├── Problem_Statement.md            # SIH 26239 problem statement brief
├── README.md                       # Complete project documentation
├── next-env.d.ts                   # Next.js TypeScript declarations
├── package.json                    # Project dependencies and operational scripts
├── package-lock.json               # Locked dependency tree
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.js              # Tailwind CSS configuration with custom theme colors
├── tsconfig.json                   # TypeScript compiler settings
│
├── app/                            # Next.js 14 App Router (All 24 Routes)
│   ├── globals.css                 # Global CSS variables, fonts, and Tailwind directives
│   ├── layout.tsx                  # Root HTML wrapper and global context providers
│   ├── page.tsx                    # Public Home Page
│   │
│   ├── about/                      # Public About Us Page
│   │   └── page.tsx
│   ├── apply/                      # Public Route Forwarder
│   │   └── [schemeId]/
│   │       └── page.tsx            # Safely redirects guests to login and scholars to dashboard
│   ├── contact/                    # Public Contact Us and Helpdesk Page
│   │   └── page.tsx
│   ├── faq/                        # Public Frequently Asked Questions Page
│   │   └── page.tsx
│   ├── guide/                      # Public Step-by-Step Guide and Application Flow
│   │   └── page.tsx
│   ├── login/                      # Role-Based Login and Registration with Demo Profiles
│   │   └── page.tsx
│   ├── notices/                    # Public Circulars and Notifications Page
│   │   └── page.tsx
│   ├── scholarships/               # Public Scholarship Explorer Directory
│   │   └── page.tsx
│   │
│   └── dashboard/                  # Authenticated Dashboard Shell
│       ├── layout.tsx              # Dashboard sidebar, ticking clock, profile dropdown, footer
│       ├── page.tsx                # Role-based dashboard redirector
│       ├── applicant/              # Scholar Dashboard Home (Action card, readiness meter)
│       │   └── page.tsx
│       ├── applications/           # My Applications List and Printable e-Receipts
│       │   └── page.tsx
│       ├── apply/                  # 5-Phase In-Dashboard Scholarship Application Form
│       │   └── [schemeId]/
│       │       └── page.tsx
│       ├── chatbot/                # Pinned Full-Height AI Assistant with Speech Features
│       │   └── page.tsx
│       ├── grievances/             # Grievance Lodging and Resolution Tracker
│       │   └── page.tsx
│       ├── help/                   # Help Center and Scheme Guidelines Download
│       │   └── page.tsx
│       ├── ministry/               # Ministry Executive Analytics Hub
│       │   └── page.tsx
│       ├── officer/                # Scrutiny and Verification Officer Console
│       │   └── page.tsx
│       ├── profile/                # Scholar Profile, Tribal Identity, and DBT Mandate
│       │   └── page.tsx
│       ├── scholarships/           # In-Dashboard Scholarship Directory and Direct Apply Links
│       │   └── page.tsx
│       └── status/                 # 5-Stage Application Scrutiny Timeline Tracker
│           └── page.tsx
│
├── components/                     # Shared UI Components
│   ├── AuthModal.tsx               # Quick authentication modal
│   ├── Chatbot.tsx                 # Floating assistant component
│   ├── Footer.tsx                  # Public Government of India footer
│   ├── Header.tsx                  # Public government header, branding, and navigation
│   ├── PublicShell.tsx             # Public route session boundary guard
│   └── ThemeToggle.tsx             # Light and dark theme switcher
│
├── docs/                           # Architecture Documentation
│   └── ASSESSMENT.md               # Technical assessment and roadmap documentation
│
├── lib/                            # Application State, Utilities, and Master Data
│   ├── auth-context.tsx            # Authentication state, session guards, and hydration tracking
│   ├── data.ts                     # Master scheme catalog, benchmark applications, and officer queues
│   ├── gemini.ts                   # Google Gemini API client with offline heuristic fallback
│   └── theme-context.tsx           # Dark mode persistence and HTML class synchronization
│
└── public/                         # Static Assets
    ├── logo.png                    # Official circular Ministry of Tribal Affairs emblem
    └── favicon.ico                 # Browser favicon
```


## Future Improvements

1. **Direct DigiLocker OAuth2 API Integration**: Establish direct server-to-server OAuth2 connections with DigiLocker to pull digitally signed caste, income, and domicile certificates directly from state revenue issuers, eliminating manual document scanning.

2. **Automated Two-Way PFMS Webhook Settlement**: Connect live webhooks with the Public Financial Management System (PFMS) to track real-time transaction reference numbers (UTR) and trigger automated SMS disbursement alerts to scholars.

3. **Handwritten Script OCR via TrOCR / PaddleOCR**: Incorporate specialized vision transformer models (TrOCR) to accurately parse handwritten revenue certificates and manual signatures common in remote tribal sub-divisions.

4. **Regional Tribal Dialect Multilingual Copilot**: Expand the AI speech synthesis and recognition models to support indigenous tribal languages, including Santhali, Gondi, Bodo, and Mundari, alongside Hindi and English.

5. **Progressive Web App (PWA) with Offline Caching**: Enable local draft caching via IndexedDB and service workers so tribal students in low-connectivity areas can draft and review applications completely offline before submitting once connectivity is restored.

6. **Deficiency Intelligence Feedback Loop**: Connect aggregate verification bottlenecks directly to scheme guidelines, automatically generating actionable recommendations for administrators to clarify confusing criteria before each academic cycle.
