# TribalScholar - AI-Enabled Scholarship & Fellowship Management System
### Ministry of Tribal Affairs (MoTA), Government of India

TribalScholar is an intelligent scholarship readiness, verification, and decision-support platform designed specifically for Scheduled Tribe (ST) students and verification officials under the Ministry of Tribal Affairs.

---

## Website Navigation Order & Pages

The header navigation is structured in the exact order:

1. **Home (`/`)**:
   - Official MoTA header, National Flag strip, and Ministry insignia.
   - Hero section: "AI-Enabled Scholarship & Fellowship Management System" with clear call-to-actions.
   - Active Schemes: National Fellowship for ST (NFST) and National Overseas Scholarship (NOS) cards with short descriptions, eligibility snapshot, application status, and View Details.
   - Visual and short workflow pipeline: Apply -> Verify -> Scrutiny -> Selection -> Award.
   - Key Features: 6 core capability cards (AI-Assisted Document Verification, Eligibility Assessment, Application Tracking, Deficiency Management, Transparent Workflow, Digital Communication).
   - Important Notices: Latest official announcements and deadlines.
   - Government Footer with directory links, toll-free helpdesk, and privacy policies.

2. **About Us (`/about`)**:
   - Structured into 5 clear sections:
     - Section 1: About the Initiative (End-to-end digitization for MoTA).
     - Section 2: The Problem (Manual scrutiny, repeated correspondence, verification effort, delays, limited visibility, scheme-specific requirements).
     - Section 3: Our Solution (Centralized, configurable platform connecting applicants & officials).
     - Section 4: What We Enable (End-to-end digital lifecycle pipeline).
     - Section 5: Transparency and Security (Role-based access, audit trails, secure handling, status tracking, human oversight of AI-assisted decisions).

3. **Guide (`/guide`)**:
   - Eligibility & How It Works.
   - Application Status Timeline (Stage-by-stage progression from registration to DBT disbursal).
   - Interactive Application Status tracker by Application ID.
   - What Documents & Personal Information Are Required (checklist and upload specifications).

4. **Scholarships (`/scholarships`)**:
   - Interactive multi-criteria eligibility filters:
     - Keyword search (code, degree, title)
     - Academic Level (Ph.D. / M.Phil, Master's, Undergraduate, Class 11-12 & Diploma)
     - Scheme Type (Fellowship, Overseas, Premier Higher Ed, Post-Matric)
     - Study Destination (In India, Abroad in Top 500 QS Universities)
     - Annual Family Income (No limit, Up to Rs. 6.00 Lakh, Up to Rs. 2.50 Lakh)
   - Real-time scheme match counter and one-click filter reset.

5. **FAQ (`/faq`)**:
   - Dedicated searchable FAQ directory.
   - Categorized topics: Eligibility Criteria, AI Scrutiny, Documents, DBT & Payment, and General Portal inquiries.
   - Expandable accordion answers with official guidelines.

6. **Contact Us (`/contact`)**:
   - National toll-free helpline numbers and official email addresses.
   - MoTA Headquarters address (Shastri Bhawan, New Delhi).
   - Interactive support request and grievance submission form with instant tracking token generation.
   - State Tribal Welfare liaison directory.

7. **Login / Register (`/login`)**:
   - Role selector tabs:
     - ST Student / Applicant
     - Govt. Official / Scrutiny Verifier
     - Ministry Administrator
   - One-Click Fast Track Demo Login buttons for instant evaluation.
   - ST Student registration form.

---

## Core Capabilities

- **Floating AI Assistant (Bottom Right Corner)**:
  - Floating widget present across all pages.
  - Powered by Google Gemini API with configurable API Key input in the settings drawer.
  - Intelligent local fallback engine if no key is entered (runs 100% offline).
  - Quick prompt chips for instant scheme guidance.

- **Light / Dark Mode Support**:
  - Sun/Moon toggle button in the header bar.
  - Persists user preference in `localStorage`.
  - Comprehensive Tailwind dark mode classes across all components, cards, tables, modals, and chatbots.

- **Role-Based Dashboards**:
  - **Student Dashboard (`/dashboard/applicant`)**: "Your Next Step" priority action card, circular readiness gauge, 5-stage lifecycle tracker, and document vault.
  - **Official Scrutiny Console (`/dashboard/officer`)**: Actionable scrutiny queue, AI confidence badges, and split-view document verification desk with OCR bounding box preview.
  - **Ministry Executive Analytics (`/dashboard/ministry`)**: Macro KPIs, scheme quota utilization bars, state breakdown, and bottleneck diagnostic charts.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build for production
npm run build

# 3. Start server
npm start
```
