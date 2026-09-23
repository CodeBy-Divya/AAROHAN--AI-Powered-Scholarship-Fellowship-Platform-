# Repository Assessment & Architectural Strategy

## 1. Current State Assessment
- **Existing Files**: 
  - `Problem_Statement.md`: Ministry of Tribal Affairs (MoTA) Smart Education SIH Problem Statement (26239).
  - `TribalScholar_Master_Build_Spec.md`: Complete blueprint detailing user journeys, roles, OCR pipelines, and acceptance criteria.
- **Runtimes Detected**:
  - Node.js `v24.15.0`
  - npm `11.12.1`
  - Python `3.12.7`
- **Application Codebase**: Fresh start (greenfield within the workspace).

---

## 2. Tech Stack Strategy (Lightweight & Modular)
To fulfill the requirement of **"not using really heavy tech stacks"** while ensuring high reliability, speed, and clean code:

| Layer | Selected Tech | Rationale |
|---|---|---|
| **Frontend & App Framework** | **Next.js 14/15 (App Router, React, TypeScript)** | Single unified lightweight runtime. Handles SSR, client interactivity, and clean API endpoints without needing heavyweight Kubernetes or microservice orchestration. |
| **Styling & UI** | **Tailwind CSS + Lucide Icons** | Ultra-lightweight, zero runtime CSS bloat, pixel-perfect government design language (Deep Navy `#0B2545`, Forest Green `#1B6B4A`, Golden Warmth `#D98A00`). |
| **Role-Based Auth & Session** | **Lightweight JWT / Session Auth (Cookie-based)** | Self-contained, zero cloud dependency, immediate role switching for demos (Applicant, Scrutiny Officer, Ministry Admin). |
| **AI & Document Intelligence** | **Client & Server Document Pipeline (Regex + Heuristics + Tesseract/Mock AI mode)** | Fast, runs locally without requiring gigabytes of GPU models, graceful fallback with real confidence scoring and bounding box coordinates. |
| **State & Data Store** | **JSON/SQLite lightweight persistent store** | Zero database installation overhead; allows one-click running with `npm run dev`. |

---

## 3. Phased Execution Roadmap

### Phase 1: Portal Foundation, Landing Page & Role-Based Auth
- MoTA Portal Brand & Landing Page (Scheme overview: NFST & NOS, Eligibility teaser, Process timeline, Language switch EN/HI).
- Unified Role-Based Auth (Student / Applicant, Scrutiny Officer / Verifier, Ministry Admin).
- Role-based route protection & role switcher for seamless testing/demonstration.

### Phase 2: Role-Based Dashboards
- **Student Dashboard**: Application status, "What to do next" action card, Readiness score indicator, Document vault status, Grievances, Scheme recommendations.
- **Government Official / Scrutiny Dashboard**: Scrutiny queue, filter by scheme/state, status overview, deficiency tagging & communication interface.
- **Ministry Admin Dashboard**: Macro analytics, application volume, gender & regional equity metrics, fund disbursement metrics.

### Phase 3: AI Document Intelligence & Verification Pipeline
- Document upload / camera capture interface with client-side preview.
- Extraction engine: Income certificate, Caste certificate, Marksheet, Bonafide letter.
- Confidence scoring, blur/quality detection, and field mismatch detection (e.g. name variance).
- Interactive Split-view verification console for officials with bounding-box highlights.

### Phase 4: Scheme Application Workflow & Deficiency Resolution
- End-to-end multi-step application form for NFST & NOS.
- "Fix My Application" deficiency loop: real-time feedback & resubmission.
- Audit trail & transparent status tracking.

### Phase 5: AI Copilot & Final Polish
- Context-aware bilingual Assistant / Copilot (RAG on official scheme guidelines).
- Comprehensive test coverage, demo seed data, and offline readiness.
