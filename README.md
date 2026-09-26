# TribalScholar: AI-Enabled Scholarship and Fellowship Management System

Unified Digital Portal for the Ministry of Tribal Affairs (MoTA), Government of India.

---

## Table of Contents
- [Problem Statement (PS) Overview](#problem-statement-ps-overview)
- [About This Application](#about-this-application)
- [Key Features](#key-features)
- [System Architecture and Tech Stack](#system-architecture-and-tech-stack)
- [Folder Structure](#folder-structure)
- [How to Clone](#how-to-clone)
- [How to Run This Project](#how-to-run-this-project)
- [Role-Based Access and Demo Accounts](#role-based-access-and-demo-accounts)
- [License and Governance](#license-and-governance)

---

## Problem Statement (PS) Overview

### Problem Statement Details
- **Problem Statement ID**: 26239
- **Problem Statement Title**: AI-Enabled Scholarship and Fellowship Management System for Scheduled Tribes
- **Ministry / Department**: Ministry of Tribal Affairs (MoTA), Government of India
- **Category**: Software
- **Theme**: Smart Education
- **Official References**:
  - Ministry Portal: https://tribal.nic.in/ScholarshiP.aspx
  - DBT Tribal Portal: https://dbttribal.gov.in/AllScheme.aspx

### Background and Context
The Ministry of Tribal Affairs implements flagship scholarship and fellowship schemes to provide critical financial assistance to Scheduled Tribe (ST) students pursuing higher education in India and abroad. Major schemes include:
1. **National Fellowship for Scheduled Tribes (NFST)**: Supporting eligible scholars pursuing regular, full-time M.Phil. and Ph.D. research programmes in recognized Indian universities.
2. **National Overseas Scholarship (NOS)**: Supporting meritorious ST candidates pursuing Master's and Ph.D. programmes abroad in top-ranked international universities.
3. **Top Class Education for ST Students**: Degree funding in premier institutions (IITs, IIMs, NITs, AIIMS, NLUs).
4. **Post-Matric Scholarship for ST Students**: Higher secondary and collegiate education assistance.

### The Problem
The implementation of these schemes traditionally involves multiple sequential stages: applicant registration, online form filling, certificate submission, institutional bonafide verification, official scrutiny, screening committee selection, communication, and post-selection fellowship disbursement.

Key administrative and operational challenges identified:
- **Manual Scrutiny Bottlenecks**: High volume of paper and scan verification causing weeks of backlog per cycle.
- **Repeated Correspondence**: Minor, avoidable errors (faint revenue seals, slight name spelling discrepancies, unreadable stamps) trigger prolonged back-and-forth letters and emails.
- **Verification Effort**: Desk officers spend over 60% of operational time performing repetitive manual cross-checks.
- **Processing Delays**: Multi-tier manual workflows previously stretched processing cycles up to 90+ days.
- **Limited Real-Time Visibility**: Applicants lacked visibility into the exact stage of their file (e.g., whether pending at university, scrutiny desk, or finance division).
- **Managing Scheme-Specific Requirements**: Each scheme entails distinct qualifying criteria, income ceilings, age limits, and documentation rules requiring configurable administration.

### Expected Solution
An integrated, intelligent digital workflow that:
1. Provides a single-window digital application lifecycle (submission, OCR check, scrutiny, selection, and communication).
2. Automates document verification using configurable scheme-specific rules and computer-vision OCR pre-checks to flag deficiencies before submission.
3. Supports transparent merit screening and quota allotment while preserving human officer oversight.
4. Offers dedicated, role-based dashboards for Applicants, Scrutiny Officers, and Ministry Administrators.
5. Manages deficiency redressal through structured 7-day correction windows without cancelling submission priority.
6. Connects with Public Financial Management System (PFMS) for direct Direct Benefit Transfer (DBT) disbursal into Aadhaar-seeded accounts.

---

## About This Application

**TribalScholar** is the production-ready implementation addressing Problem Statement 26239. It bridges students and government officials through an accessible, high-performance web interface designed according to Government of India web standards.

The application serves three primary user personas:
1. **Scheduled Tribe Students / Scholars**: Discover schemes, verify qualification eligibility, test document uploads against AI readability checks, submit applications, track real-time progress, and resolve deficiency notices.
2. **Scrutiny and Verification Officers**: Review incoming queues prioritized by AI confidence scores, inspect split-screen document viewer with OCR text extraction, issue targeted deficiency queries, and recommend approvals.
3. **Ministry Executives and Decision Makers**: Monitor national-level key performance indicators (KPIs), scheme quota utilization, state-wise scholar distribution, and identify operational bottlenecks.

---

## Key Features

1. **AI-Assisted Document Pre-Verification**
   - Client-side and server-side OCR simulation that analyzes uploaded certificates (Caste, Income, University Admission, Marksheets) for blurriness, resolution, cutoff seals, and character legibility before final submission.
   - Prevents unnecessary rejections due to unreadable scans.

2. **Dynamic Multi-Criteria Scheme Directory & Filters**
   - Searchable scholarship catalog with real-time filters:
     - Academic Level (Ph.D./M.Phil, Master's, Undergraduate, Class 11-12/Diploma).
     - Scheme Type (Fellowship, Overseas, Premier Higher Ed, Post-Matric).
     - Study Destination (India vs. Abroad in Top 500 QS Universities).
     - Family Annual Income Ceilings.

3. **5-Stage Application Status Timeline**
   - Standardized milestone progression:
     `Apply` -> `Verify` -> `Scrutiny` -> `Selection` -> `Award`
   - Real-time status lookup widget on the Guide page allowing applicants to search by Application ID (e.g., `NFST-2026-8821`, `NOS-2026-4412`).

4. **Deficiency Resolution Window**
   - When an officer notes an unreadable seal or discrepancy, the student receives an automated notice with a 7-day grace period to re-upload the specific file without losing queue priority.

5. **Split-Screen Scrutiny Officer Desk**
   - Side-by-side inspection console displaying applicant metadata alongside the uploaded document with extracted OCR text and highlighted discrepancy overlays.

6. **Ministry Analytics & Executive Dashboard**
   - Real-time reporting on total funds disbursed via DBT, state/UT quota utilization, average turnaround times, and first-time verification pass rates.

7. **Floating AI Assistant (Bottom-Right Corner)**
   - Context-aware chatbot available on all pages.
   - Configurable Google Gemini API integration (users can enter their key via the settings drawer).
   - Built-in intelligent local rule-based fallback running 100% offline if no API key is provided.

8. **Accessibility and Government Standards**
   - Light and Dark theme toggle with persistence.
   - Text size adjusters (A, A+, A++) and high-contrast accessibility mode.
   - Bilingual support framework (English / Hindi).
   - Strictly zero emojis across UI, code, and documentation.

---

## System Architecture and Tech Stack

- **Framework**: Next.js 14 (App Router, Server & Client Components)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3 with `class` dark mode strategy
- **Icons**: Lucide React (Standard SVG icons)
- **AI Integration**: Google Gemini API via custom client with offline fallback
- **State Management**: React Context (`auth-context.tsx`, `theme-context.tsx`)
- **Compatibility**: Node.js 18.x, 20.x, or later

---

## Folder Structure

```
SC-ST Portal/
├── .gitignore                      # Git exclusion rules (dependencies, build, logs, env, OS)
├── package.json                    # Project metadata, dependencies, and execution scripts
├── package-lock.json               # Locked dependency tree
├── tsconfig.json                   # TypeScript compiler configuration (ES2020 target)
├── tailwind.config.js              # Tailwind styling config (dark mode, custom theme colors)
├── postcss.config.js               # PostCSS plugin definitions
├── next-env.d.ts                   # Next.js TypeScript declarations
├── README.md                       # Complete project documentation
├── Problem_Statement.md            # Original SIH 26239 problem statement brief
├── TribalScholar_Master_Build_Spec.md # Complete architectural and UI specification
│
├── app/                            # Next.js 14 App Router
│   ├── layout.tsx                  # Root layout (Header, Chatbot, Footer, Context Providers)
│   ├── globals.css                 # Global CSS variables, fonts, and Tailwind directives
│   ├── page.tsx                    # Home page (Hero, Active Schemes, Workflow, Features, Notices)
│   ├── about/
│   │   └── page.tsx                # About Us page (5 sections: Initiative, Problem, Solution, Enablement, Security)
│   ├── guide/
│   │   └── page.tsx                # Guide page (Eligibility, How It Works, Status Timeline, Document Checklist)
│   ├── scholarships/
│   │   └── page.tsx                # Scholarships page (Search, multi-criteria filters, scheme cards)
│   ├── faq/
│   │   └── page.tsx                # Dedicated FAQ page (Searchable accordion with category tabs)
│   ├── contact/
│   │   └── page.tsx                # Contact Us page (Helplines, MoTA HQ address, grievance ticket generator)
│   ├── login/
│   │   └── page.tsx                # Role-based login and registration page with Fast Track Demo buttons
│   ├── apply/
│   │   └── [schemeId]/
│   │       └── page.tsx            # Multi-step dynamic application submission form
│   └── dashboard/
│       ├── applicant/
│       │   └── page.tsx            # Student Dashboard (Action card, readiness meter, document vault)
│       ├── officer/
│       │   └── page.tsx            # Scrutiny Officer Console (Queue, split-view OCR inspection desk)
│       └── ministry/
│           └── page.tsx            # Ministry Analytics Dashboard (Macro KPIs, quota bars, bottlenecks)
│
├── components/                     # Reusable UI Components
│   ├── Header.tsx                  # Top banner, government strip, navigation links, auth actions
│   ├── Footer.tsx                  # Government footer, official links, contact information, policies
│   ├── Chatbot.tsx                 # Floating AI assistant widget with Gemini API and offline fallback
│   ├── ThemeToggle.tsx             # Sun/Moon light and dark mode switcher
│   └── AuthModal.tsx               # Quick authentication modal for fast role switching
│
└── lib/                            # Shared Logic, Contexts, and Mock Data
    ├── auth-context.tsx            # Authentication state, active user roles, language, and accessibility
    ├── theme-context.tsx           # Dark mode state provider synced with localStorage and HTML class
    ├── data.ts                     # Master dataset for schemes, mock applicants, and officer queues
    └── gemini.ts                   # Gemini API client with offline intent recognition fallback
```

---

## How to Clone

To download and set up this repository locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/tribalscholar-portal.git
   ```

2. **Navigate to the project root**:
   ```bash
   cd tribalscholar-portal
   ```
   *(Or on Windows, navigate to your designated workspace folder, e.g., `cd "e:\SC-ST Portal"`).*

---

## How to Run This Project

### Prerequisites
Make sure you have installed on your computer:
- **Node.js** (v18.17.0 or later recommended; v20.x supported)
- **npm** (bundled with Node.js) or **yarn** / **pnpm**

Check your installed versions:
```bash
node -v
npm -v
```

### 1. Install Dependencies
Run the following command in the project root:
```bash
npm install
```

### 2. Run in Development Mode (Live Hot-Reload)
To develop and test live code edits:
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```
*(If port 3000 is occupied, Next.js will automatically select an available port such as `http://localhost:3001` or you can specify `npx next dev -p 3001`).*

### 3. Build and Run in Production Mode (Recommended for Demos)
To produce an optimized build and run the high-performance production server:

1. **Create the production build**:
   ```bash
   npm run build
   ```
2. **Start the production server**:
   ```bash
   npm start
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Role-Based Access and Demo Accounts

The portal includes pre-configured demo profiles allowing evaluators to experience the platform from all perspectives without manual account creation:

Navigate to `/login` and select any of the **One-Click Fast Track Demo Login** options:

1. **Scheduled Tribe Applicant / Scholar**
   - **Name**: Pooja Rameshwar
   - **Role**: `applicant`
   - **Destination**: `/dashboard/applicant`
   - **Features**: Live 5-stage application tracker, deficiency action alert, document vault, and readiness meter.

2. **Scrutiny and Verification Officer**
   - **Name**: Dr. Arvind Kumar
   - **Role**: `officer`
   - **Destination**: `/dashboard/officer`
   - **Features**: Scrutiny queue with AI confidence scores, document inspection desk with OCR text extraction, and deficiency issuance.

3. **Ministry Executive / Administrator**
   - **Name**: Joint Secretary, Ministry of Tribal Affairs
   - **Role**: `ministry`
   - **Destination**: `/dashboard/ministry`
   - **Features**: National budget metrics (Rs. 482+ Cr disbursed), scheme quota tracking, state-wise breakdowns, and turnaround analytics.

---

## License and Governance

Developed for the **Ministry of Tribal Affairs (MoTA), Government of India**.  
Designed to uphold Article 46 of the Constitution of India, promoting the educational and economic interests of Scheduled Tribes with equity, efficiency, and transparency.
