# TribalScholar - AI-Enabled Scholarship & Fellowship Management System
### Ministry of Tribal Affairs (MoTA), Government of India - SIH 2026 Problem Statement 26239

TribalScholar is an intelligent scholarship readiness, verification, and decision-support platform designed specifically for Scheduled Tribe (ST) students and verification officials under the Ministry of Tribal Affairs.

---

## Website Navigation Order & Pages

The header navigation is structured in the following order:

1. **Home (`/`)**:
   - Official MoTA header, National Flag strip, and Ministry insignia.
   - Live national impact metrics (DBT Disbursed, Scholars Funded, Processing Turnaround).
   - Preview of flagship schemes with direct application links.
   - 8-step visual workflow architecture.

2. **About Us (`/about`)**:
   - Constitutional mandate under Article 46 and SIH 2026 Problem Statement 26239 background.
   - Three operational pillars: AI Pre-submission, Explainable Scrutiny, and 100% Direct Benefit Transfer (DBT).
   - Core governance objectives and institutional stakeholders.

3. **Scholarships (`/scholarships`)**:
   - Interactive multi-criteria eligibility filters:
     - Keyword search (code, degree, title)
     - Academic Level (Ph.D. / M.Phil, Master's, Undergraduate, Class 11-12 & Diploma)
     - Scheme Type (Fellowship, Overseas, Premier Higher Ed, Post-Matric)
     - Study Destination (In India, Abroad in Top 500 QS Universities)
     - Annual Family Income (No limit, Up to Rs. 6.00 Lakh, Up to Rs. 2.50 Lakh)
   - Real-time scheme match counter and one-click filter reset.

4. **FAQ (`/faq`)**:
   - Dedicated searchable FAQ directory.
   - Categorized topics: Eligibility Criteria, AI Scrutiny, Documents, DBT & Payment, and General Portal inquiries.
   - Expandable accordion answers with official guidelines.

5. **Contact Us (`/contact`)**:
   - National toll-free helpline numbers and official email addresses.
   - MoTA Headquarters address (Shastri Bhawan, New Delhi).
   - Interactive support request and grievance submission form with instant tracking token generation.
   - State Tribal Welfare liaison directory (Jharkhand, Odisha, Madhya Pradesh, North East).

6. **Login / Register (`/login`)**:
   - Role selector tabs:
     - ST Student / Applicant
     - Govt. Official / Scrutiny Verifier
     - Ministry Administrator
   - One-Click Fast Track Demo Login buttons for instant evaluation.
   - ST Student registration form.

---

## Features

- **Floating AI Assistant (Bottom Right Corner)**:
  - Floating widget present on all pages.
  - Powered by Google Gemini API with configurable API Key input in the settings drawer.
  - Intelligent local fallback engine if no key is entered (runs 100% offline).
  - Quick prompt chips for instant scheme guidance.

- **Light / Dark Mode Support**:
  - Sun/Moon toggle button in the header bar.
  - Persists user preference in `localStorage`.
  - Comprehensive Tailwind dark mode classes across all components, cards, tables, modals, and chatbots.

- **Role-Based Dashboards**:
  - **Student Dashboard (`/dashboard/applicant`)**: "Your Next Step" priority action card, circular readiness gauge (86% to 96%), 5-stage lifecycle tracker, and document vault.
  - **Official Scrutiny Console (`/dashboard/officer`)**: Actionable scrutiny queue, AI confidence badges, and split-view document verification desk with OCR bounding box preview.
  - **Ministry Executive Analytics (`/dashboard/ministry`)**: Macro KPIs, scheme quota utilization bars, state breakdown, and bottleneck diagnostic charts.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in your browser
http://localhost:3001
```
