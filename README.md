# TribalScholar - AI-Enabled Scholarship & Fellowship Management System
### Ministry of Tribal Affairs (MoTA), Government of India - SIH 2026 Problem Statement 26239

TribalScholar is an intelligent scholarship readiness, verification, and decision-support platform designed specifically for Scheduled Tribe (ST) students and verification officials under the Ministry of Tribal Affairs.

---

## Key Features Implemented (Phase 1)

1. **Official MoTA Portal and Brand Experience**:
   - Official branding, Ministry insignia, National Flag stripe, and bilingual toggle (English / Hindi).
   - Accessibility toolbar: Text size scaling (`A`, `A+`, `A++`) and High Contrast mode.
   - Flagship scheme explorer:
     - **NFST** (National Fellowship for Scheduled Tribe Students)
     - **NOS** (National Overseas Scholarship for ST Candidates)
     - **Top Class Education Scheme** (IITs, IIMs, AIIMS, NITs)
     - **Post-Matric Scholarship for ST Students**
   - Interactive 3-point Eligibility Pre-checker Wizard.
   - Transparent 8-Step Verification Journey (Discover -> Understand -> Prepare -> AI Verify -> Apply -> Fix -> Track -> Succeed).

2. **Unified Role-Based Authentication**:
   - Single secure entrypoint with dedicated role tabs:
     - ST Student / Applicant
     - Scrutiny Officer / Govt. Official
     - Ministry Administrator
   - **One-Click Demo Logins** with pre-seeded personas for seamless evaluation:
     - **Student**: `student@demo.in` / `Student@2026` (Pooja Xalxo, Ph.D. Scholar, Jharkhand)
     - **Officer**: `officer@demo.in` / `Officer@2026` (Dr. Arvind Meena, Senior Scrutiny Officer)
     - **Ministry**: `ministry@demo.in` / `Ministry@2026` (Smt. R. Ananthalakshmi, IAS, Joint Secretary)

3. **Role-Based Professional Dashboards**:
   - **Student Dashboard (`/dashboard/applicant`)**:
     - **"Your Next Step" Action Card**: Highlights real-time deficiency resolutions.
     - **AI Application Readiness Score Gauge** (86% with interactive re-scan simulation).
     - **5-Stage Verification Lifecycle Tracker** (Submission -> Doc Scrutiny -> Eligibility -> Merit -> Sanction).
     - **Document Vault**: Real-time status of Caste Certificate, Income Certificate, Admission Letter, Marksheet, and DBT Aadhaar Link.
   - **Government Official / Scrutiny Console (`/dashboard/officer`)**:
     - Scrutiny queue with filters by scheme, stage, and candidate search.
     - AI Confidence scoring badges (High Fidelity OCR vs Human Review Recommended).
     - **Split-View Verification Modal**: Left-side document preview with simulated OCR bounding boxes; right-side checklist, deficiency remark transmitter, and stage approval controls.
   - **Ministry Executive Analytics (`/dashboard/ministry`)**:
     - Macro metrics: Total Sanctions (18,450+), DBT Disbursed (Rs. 482.4 Cr), Turnaround time (14 days), Gender parity (48.6% female scholars).
     - Scheme quota utilization progress bars (NFST 95%, NOS 90%, Top Class 92%).
     - State-wise beneficiary breakdown and Process Bottleneck Intelligence.

4. **Multi-Step Application Wizard (`/apply/[schemeId]`)**:
   - 4-step guided application for NFST and NOS schemes.
   - Integrated AI Document Intelligence quality scoring and real-time deficiency re-scan.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in your browser
http://localhost:3000
```
