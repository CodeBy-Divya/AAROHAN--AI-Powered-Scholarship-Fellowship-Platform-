# Aarohan — Master Build Spec (SIH 2026 · SIH26239)

> Paste this whole file into your AI coding tool (Antigravity / Cursor / Claude Code) as the first message.
> Work through it phase by phase. Do not skip the acceptance checks.

---

## 0. Instructions to the coding agent (read first)

You are a senior full-stack + AI/ML engineer building a **working, demo-ready prototype**, not mockups.

1. **Inspect the existing repo first.** Write a short `docs/ASSESSMENT.md` (current stack, what works, what is broken, what to reuse, what to change). Preserve useful work. Do not blindly rewrite.
2. **Then build.** Do not stop at a plan. Work in phases (Section 17). After each phase: run the app, run the tests, and confirm every acceptance check. Fix failures before continuing.
3. **Every critical feature must really work end to end** (real upload, real OCR, real DB writes). Never fake the core flow in frontend-only code.
4. **If an external service (LLM API, PaddleOCR, TrOCR) is unavailable, fall back automatically** to a local/deterministic path and label the output "Demo AI mode". The app must run fully offline with `docker compose up`.
5. Keep secrets in `.env`. Provide `.env.example`. No keys in frontend code.
6. Commit small and often. Keep files small. No business logic in UI components.
7. At the end, produce the final deliverables in Section 18.

---

## 1. Product in one paragraph

**TribalScholar** is an AI-powered scholarship *readiness, verification and management layer* for Scheduled Tribe students, built for the Ministry of Tribal Affairs (Problem SIH26239, Smart Education). It does **not** replace the National Scholarship Portal. It sits on top of the journey and **prevents avoidable application failures before submission**: the student photographs documents, the system reads them, checks quality and consistency, explains what is wrong and how to fix it, and only then submits. Officers get an evidence-based review console. The Ministry gets analytics that show where the process is failing.

**Tagline:** Scholarships | Fellowships | Brighter Futures
**Hero:** "Your Dreams. Our Support."
**Principle:** Discover → Understand → Prepare → Verify → Apply → Fix → Track → Succeed

**Three roles:** Student · Officer/Verifier · Ministry Admin.

---

## 2. Non-negotiable principles

1. **The LLM never decides eligibility or approval.**
   Rules Engine decides eligibility → LLM only explains the result → Human officer makes final decisions.
2. **Never accuse of fraud.** Use "Potential inconsistency detected — human review required."
3. **Explainable everywhere.** Every AI/rule result exposes: value, confidence, evidence (source doc + page + bounding box), and the rule used.
4. **Never invent** eligibility rules, deadlines, amounts, or government facts. Use only configured scheme data. If unknown, say: "I couldn't verify this from the available official information."
5. **Readiness score is an estimate**, always labelled "Application readiness estimate — not official approval."
6. **Only collect data a scheme actually requires.** Sensitive documents are private, access-controlled, and audited.
7. **Demo data is clearly labelled** and contains no real personal data.

---

## 3. THE core vertical slice (build and perfect this first)

This is the "click a picture → extract everything" flow. It must work flawlessly before anything else is polished.

```
Student opens Document Center on phone/laptop
  → taps "Scan document" (camera) or uploads file (JPG/PNG/PDF)
  → client-side: auto-rotate, crop preview, compress to ≤1 MB
  → POST /documents/upload  (returns immediately with document_id + job_id)
  → Background job:
       1. validate file (type, size, magic bytes)
       2. preprocess (orientation, deskew, denoise, contrast) — keep original untouched
       3. quality check (blur, resolution, brightness, glare, skew, crop)
       4. classify document type
       5. OCR (words + confidence + bounding boxes)
       6. extract structured fields (value, confidence, bbox, page, method)
       7. normalize (dates, names, numbers, currency)
       8. validate (format, expiry, required fields)
       9. cross-check against profile + other documents → mismatches
      10. compute document confidence + route (routine / officer / mandatory)
  → Frontend streams progress via SSE:
       "Uploading… → Detecting document type… → Reading text… → Extracting fields…
        → Checking quality… → Checking consistency… → Done"
  → UI shows: extracted fields, confidence, quality score, issues, [Fix] / [Replace] / [Confirm]
  → Student can correct any extracted field (edits are logged; original OCR value is kept)
  → Readiness score recalculates automatically
```

**Acceptance checks for the slice:**
- [ ] Taking/uploading a photo of a sample income certificate returns extracted name, income, certificate number, issue date, issuing authority within ~10 s on a normal laptop.
- [ ] A blurred version of the same photo is flagged "Poor quality" with the specific reason and fix tips.
- [ ] A certificate whose name differs slightly from the profile (e.g. "Divya Boral" vs "Divya Borol") raises a *potential mismatch* with both values shown.
- [ ] Re-uploading a corrected document reruns the pipeline and readiness rises.
- [ ] The UI never freezes while OCR runs.

---

## 4. Fixed technology decisions (do not debate these)

| Layer | Choice | Notes |
|---|---|---|
| Frontend | **Next.js (App Router) + React + TypeScript + Tailwind** | Use existing framework if already React-based and healthy |
| UI kit | shadcn/ui (Radix) + lucide icons | Accessible by default |
| Charts | Recharts | |
| i18n | next-intl (or i18next) | JSON language files, English + Hindi shipped |
| Backend | **Python FastAPI** + Pydantic v2 + SQLAlchemy 2 + Alembic | |
| DB | **PostgreSQL** (+ pgvector for RAG) | via docker-compose |
| Jobs | FastAPI BackgroundTasks + `processing_jobs` table (upgrade path: Celery/RQ) | Keep simple |
| Realtime | Server-Sent Events for job progress | |
| Auth | Own JWT (access + refresh, httpOnly cookies), bcrypt/argon2, RBAC | Runs locally without external services |
| Storage | `StorageProvider` abstraction; default = private local volume with signed, expiring URLs; S3/Supabase adapter stub | |
| OCR | `OCRProvider` interface: **Tesseract (default, always works)**, **PaddleOCR (preferred if installed)**, **TrOCR (handwriting regions, optional)** | Auto-fallback chain |
| CV | OpenCV + Pillow + numpy | |
| Fuzzy match | rapidfuzz | |
| LLM | `LLMProvider` interface: Gemini / OpenAI-compatible / **MockProvider (demo mode)** | Chosen via env var |
| Embeddings | Provider abstraction; default local `sentence-transformers` multilingual model, mock fallback | |
| Infra | `docker-compose.yml` (frontend, backend, postgres) + Makefile | One command start |
| Tests | pytest, Playwright (E2E), Vitest | |

**OCR strategy (important, be pragmatic):**
```
Image → preprocess → PaddleOCR (if available)
                        └─ else / low confidence → Tesseract (eng+hin+other langs)
Handwritten regions (detected by low printed-OCR confidence in form-field areas)
                        → TrOCR (only if model is installed; otherwise flag for human review)
Structured extraction → regex + keyword-anchored proximity on OCR lines (deterministic)
                        → optional LLM/vision JSON-schema fallback for missing fields
                          (output re-validated by regex; marked method="llm")
```
TrOCR/Paddle are heavy: make them optional extras (`pip install .[ocr-full]`), and make sure the default install works with Tesseract alone.

---

## 5. Repository structure

```
tribalscholar/
├─ frontend/
│  ├─ app/                    # routes: (public) (student) (officer) (ministry)
│  ├─ components/ui/          # design-system primitives
│  ├─ features/               # eligibility, documents, readiness, copilot, review, analytics
│  ├─ hooks/  lib/  services/ # api client, sse client, offline queue
│  ├─ i18n/                   # en.json, hi.json (+ easy to add more)
│  └─ types/
├─ backend/app/
│  ├─ api/                    # routers: auth, students, scholarships, eligibility, applications,
│  │                          #   documents, ai, notifications, grievances, admin
│  ├─ models/  schemas/  services/
│  ├─ rules/                  # rules engine (pure functions, fully unit-tested)
│  ├─ document_processing/    # pipeline, preprocess, quality, classifier, extractors, normalizer,
│  │                          #   validator, mismatch, confidence
│  ├─ ocr/                    # base.py, tesseract.py, paddle.py, trocr.py, router.py
│  ├─ ai/                     # llm providers, rag, prompts, case_summary, explainer, copilot
│  ├─ analytics/  auth/  workers/  utils/
├─ database/migrations/  database/seeds/
├─ docs/  (ASSESSMENT.md, architecture, api, ai, demo)
├─ tests/  (unit, integration, e2e)
├─ docker-compose.yml  .env.example  Makefile  README.md
```

---

## 6. Data model (relational; JSON only where truly flexible)

`users, roles, student_profiles, officer_profiles, scholarships, scholarship_rules, document_types, scholarship_required_documents, scholarship_deadlines, applications, application_steps, application_timeline, documents, document_extractions (one row per field), document_quality_results, document_mismatches, eligibility_results (one row per requirement), deficiencies, processing_jobs, ai_reviews, officer_reviews, notifications, grievances, fellowship_records, knowledge_documents, knowledge_chunks (with vector), audit_logs, system_settings`

Key relationships:
- `applications` → student, scholarship, status, readiness_score, ai_confidence, routing_bucket
- `documents` → application, document_type, storage_key (private), original + processed image keys, status
- `document_extractions` → document, field_name, value, normalized_value, confidence, bbox (x,y,w,h), page, method (`ocr_paddle|ocr_tesseract|trocr|regex|llm|manual`), edited_by_user
- `deficiencies` → application, document (nullable), type, severity, explanation, fix_steps, status (open/resolved)
- `audit_logs` → actor, role, action, entity, entity_id, before/after, timestamp, ip (append-only)

---

## 7. Document intelligence — detailed requirements

### 7.1 Configurable document taxonomy (table, not hardcoded)
ST certificate · caste certificate · income certificate · domicile certificate · marksheet · degree certificate · admission proof · ID proof (Aadhaar-masked) · bank document · research proposal · recommendation letter · fellowship document · passport/visa · other.
Each type defines: keywords (en/hi) for classification, expected fields, field regexes, validity rules, example image, "why required" text, tips.

### 7.2 Classifier
Keyword/regex scoring on OCR text (multilingual) + simple layout hints. Return `{type, confidence}`. If confidence < 0.6 → "Not sure what this document is" → ask the student to confirm type.

### 7.3 Quality engine (transparent, out of 100)
| Check | Method | Example threshold |
|---|---|---|
| Blur | variance of Laplacian | < 100 → poor |
| Resolution | long side px | < 1000 → low |
| Brightness | mean gray | <60 dark / >200 overexposed |
| Contrast | std of gray | < 35 low |
| Glare | % near-saturated pixels | > 3% → glare |
| Skew | minAreaRect / Hough angle | > 5° |
| Crop/corners | document contour coverage | < 80% frame → cropped |
| Text readability | mean OCR word confidence | < 0.6 |
| Duplicate page | perceptual hash | same hash → duplicate |

Show each check with pass/warn/fail and a plain-language tip. Score = weighted sum; always show the breakdown.

### 7.4 Preprocessing (OpenCV)
orientation → deskew → perspective correction (largest 4-point contour) → shadow/illumination normalization → denoise → CLAHE contrast → adaptive threshold copy for OCR. **Store original and processed images separately.**

### 7.5 Extraction output (every field)
```json
{
  "document_type": "income_certificate",
  "fields": {
    "name":   {"value":"Divya Borol","confidence":0.93,"bbox":[120,210,340,40],"page":1,"method":"ocr_paddle"},
    "income": {"value":"180000","confidence":0.96,"bbox":[...],"page":1,"method":"regex"}
  },
  "quality": {"score":91,"checks":[...]},
  "overall_confidence": 0.94
}
```

### 7.6 Normalization
Names (lowercase, strip honorifics Shri/Smt/Kumari/Mr/Ms, punctuation, extra spaces, transliteration-tolerant), dates → ISO, Indian number formats (₹1,80,000 → 180000), income words/digits, certificate numbers.

### 7.7 Mismatch engine
Compare application/profile ↔ each document, and document ↔ document, for: name, DOB, father/mother name, institution, course, income, certificate number, dates.
- Names: rapidfuzz token-sort ratio: ≥ 97 match · 80–97 **potential mismatch** · < 80 mismatch.
- DOB/numbers: exact after normalization.
- Also flag: expired certificate, issue date after application date, missing signature/stamp (heuristic), duplicate document across applications (hash) as a *risk signal*.
- Output wording: "Potential inconsistency — please review", never "fraud".

### 7.8 Confidence and routing
```
overall = weighted(ocr_conf, classification_conf, field_extraction_conf, rule_match, quality/100)
≥ 0.90 and no conflicts  → Routine verification queue
0.70 – 0.90              → Officer review
< 0.70 or any conflict   → Mandatory human review
```
Show the individual confidences to the officer.

### 7.9 Provide sample assets
Generate a folder `demo_assets/` with synthetic sample certificates (fake names, fake numbers, clearly marked "SAMPLE") — good scan, blurred, tilted, name-mismatch, expired — so the demo works without real documents. Include a script to regenerate them.

---

## 8. Rules engine and scholarship configuration

Rules live in the DB (editable by Ministry admin), evaluated by pure Python functions.

```json
{
  "scheme_id": "demo_post_matric_st",
  "name": "Post Matric Scholarship for ST Students (DEMO CONFIG)",
  "rules": [
    {"id":"cat","field":"category","op":"eq","value":"ST","label":"Belongs to Scheduled Tribe","evidence_doc":"st_certificate"},
    {"id":"lvl","field":"education_level","op":"in","value":["post_matric","graduate","postgraduate"],"label":"Education level","evidence_doc":"admission_proof"},
    {"id":"inc","field":"family_income","op":"lte","value":250000,"label":"Family income within limit","evidence_doc":"income_certificate"}
  ],
  "required_documents": ["st_certificate","income_certificate","marksheet","admission_proof","bank_document"],
  "deadlines": {"open":"…","close":"…","verification":"…","correction":"…"},
  "post_selection": ["annual_renewal","progress_report"]
}
```
**All numeric limits, dates and amounts in seed data are placeholders marked `DEMO — verify against official guidelines`.** Seed 4–6 schemes (e.g. post-matric, top-class education, national fellowship, overseas-type, scholarship for higher studies) as configs.

Operators: `eq, neq, in, not_in, lte, gte, between, exists, and/or groups`.
Result per rule: `{requirement, your_value, required, result: met|not_met|unknown|needs_document, evidence, what_to_do}`.

**Explainable eligibility UI:** "You appear eligible" + table (Requirement | Your info | Result | Evidence) + *Why? / What we checked / What is still missing / Next step*. For not-eligible: state the unmet requirement, the student's value, the required value, and suggest other matching schemes. LLM only phrases the explanation from the rule results.

---

## 9. Readiness score (transparent formula)

| Factor | Weight | How computed |
|---|---|---|
| Eligibility completeness | 20 | rules answered/needed and met |
| Application completeness | 20 | required form fields filled |
| Document completeness | 25 | required docs uploaded & type-verified |
| Document quality | 15 | average quality score of required docs |
| Consistency | 20 | 100 − penalties for mismatches (potential=−10, hard=−25, per item) |

Show total + each factor with a one-line reason. Every deduction links to a concrete **Fix** action. Label: "Application readiness estimate — not official approval." Answers: *"If I submit now, how likely am I to face an avoidable deficiency?"*

Band labels: ≥ 90 "Ready to submit" · 70–89 "Almost ready" · < 70 "Needs attention".

---

## 10. "Fix My Application" (Detect → Explain → Fix → Recheck)

Every deficiency renders as: **Problem** · **Why it happened** · **How to fix** (numbered steps) · **[Scan again] [Upload file] [Edit field]** → auto-rerun pipeline → auto-recompute readiness → mark deficiency resolved.
Cover: missing/blurry/wrong-type/expired/unreadable docs, name/DOB/institution mismatch, incomplete form, missing page, missing signature. No technical errors ever shown to users (e.g. show "We couldn't read this document clearly. Try a clearer photo in good light.").

---

## 11. Officer module

- **Verification Queue** tabs: All · New · High confidence · Human review · Low confidence · Deficiency · Resubmitted · Escalated. Columns: App ID, Applicant, Scheme, State, Submitted, AI Confidence, Issues, Status, Action. Server-side pagination + filters.
- **Application Review** split view: left = original document with **bounding-box overlays**; right = extracted fields (value, confidence, method), rule results, mismatches, previous actions.
- **AI Case Summary** (LLM phrases it from structured data only): eligibility checks, docs detected n/m, potential issues, AI confidence, recommendation ("Routine verification" / "Human review required"), + **View evidence**.
- Actions: Verify · Approve · Reject (reason required) · Request correction · Request resubmission · Escalate · Assign · Add note. Every action → `audit_logs` + student notification + timeline event.
- **Audit log viewer** per application and global.

---

## 12. Ministry module

Dashboards (aggregate only, no unnecessary personal data): totals, by state/district/scheme, funnel (Discovered → Started → Submitted → Verified → Scrutinized → Selected), pending verification, deficiency rate, document-issue rate, completion rate, avg processing time, top deficiency reasons, AI confidence distribution, state map/heat table.

**Process Improvement Engine (key differentiator):** rule-based insight generator over aggregates, e.g.
- "42% of applicants in <region> fail at income-certificate upload → Add clearer income-certificate guidance before upload."
- "High abandonment at Academic Details → Add contextual help there."
Show insight cards with metric, evidence, and recommendation. Call it **Deficiency Intelligence** — do not claim the model "learns automatically."

Also: Scheme Management + Rules Management screens (CRUD over the config in Section 8), System Monitoring (job queue, OCR success rate, avg OCR time).

---

## 13. Scholarship Copilot (RAG)

Official scheme docs/FAQs → chunk → embed → pgvector → retrieve → LLM answer with **source citations**.
Context injected: student profile, current application, readiness, missing docs, status. Must answer things like *"What documents do I need?"*, *"Why is my application not ready?"*, *"What should I do first?"* from real data.
Grounding prompt: use only provided context; never invent rules/deadlines/amounts; no approvals/rejections; if unknown say "I couldn't verify this from the available official information."; uncertain verification → recommend human review.
Works in Hindi + English. Mock provider returns deterministic answers built from the same context so the demo works offline.

---

## 14. Student experience

**Pages:** Landing, Scholarship Explorer, Scholarship Details (+ How to Apply video/steps/common mistakes), Resources, FAQs, Help; Login/Register; Dashboard; Profile; Scholarship Finder; Eligibility Checker; Application Form; Document Center; Scanner; Readiness; Fix My Application; Timeline; Notifications; Copilot; Learning Hub; Grievance; Post-selection; Settings.

**Dashboard = "What should I do next?"** Big **Your Next Step** card (e.g. "Upload a clearer income certificate" -> [Fix now]), Application Health widget (86% Ready with verified/attention items), deadlines, recommended schemes, document checklist (verified / attention / pending), notifications.

**Timeline:** Started → Submitted → Document verification → Eligibility verification → Scrutiny → Selection → Final decision → Scholarship management; each step has date, status, responsible stage, plain-language explanation, next action. Never just "Processing".

**Grievances:** submit + attach + track; AI may suggest a category; officers resolve.
**Notifications:** in-app now; email/SMS via provider interface (console/mock provider by default).
**Post-selection:** award details, renewal, reports, milestones, deadlines, messages.
**Deadline calendar:** official dates only; reminders at 30/7/2 days.

**Multilingual:** English + Hindi fully translated; structure supports Bengali, Gujarati, Marathi, Tamil, Telugu, Odia, Assamese by adding JSON files. Language switch never loses form state. Keep scheme/document official names unchanged.
**Voice (optional, after core works):** Web Speech API TTS to read pages/status; speech-to-text for Copilot; mute control.
**Accessibility:** WCAG AA contrast, keyboard navigation, ARIA labels, text-size control, reduced-motion, icon+text, status = colour + text, plain language.
**Lite mode:** auto-detect slow network (`navigator.connection`) → banner "Poor connection detected — Lite Mode enabled"; client image compression, chunked/resumable upload with retry, IndexedDB draft + upload queue, minimal animation, cached guidance via service worker.
**Mobile-first:** bottom nav (Home · Scholarships · Applications · Documents · Assistant · Profile); design camera-scan flow separately for mobile.

---

## 15. Design system (must not look "AI-generated")

Tokens: Deep Navy `#0B2545` (primary) · Forest Green `#1B6B4A` (secondary) · Teal `#0E8A8A` (accent) · Soft Blue `#4F86C6` (info) · Amber `#D98A00` (warning) · Red `#C62828` (errors only) · Success Green `#2E7D32` · Warm White `#FAF8F4` (bg) · Surface `#FFFFFF` · Text `#0B1B2B` · Muted Slate `#5B6B7A`.
Avoid: neon, glowing effects, heavy gradients, glassmorphism, 3D, chatbot-bubble clichés, excess animation.
Style: clean fintech/government-digital feel, rounded cards, consistent spacing scale, one sans font family (e.g. Inter / Noto Sans with Devanagari support), simple icons with labels.
Build primitives: Button, Card, Badge (status), Input, Select, Modal, Drawer, Toast, Tooltip, Stepper, Progress, Table, Chart wrappers, EmptyState, Skeleton.
Every screen answers: where am I, what is happening, what do I do, why, what happens next. Include loading, empty, error and success states everywhere.

---

## 16. Security & privacy

RBAC on every endpoint (student sees only own data; officer sees assigned/region queue; admin sees aggregates + config) · argon2/bcrypt · JWT in httpOnly cookies + refresh rotation · rate limiting · Pydantic input validation · file type by magic bytes + size limit + malware-scan hook (`ScanProvider`, ClamAV adapter stub) · private storage + short-lived signed URLs · audit log on all officer/admin actions and document access · mask Aadhaar (store last 4 only) · no secrets in frontend · CORS locked down · security tests for unauthorised access, role escalation, and document access.

---

## 17. Build phases (with gates)

| Phase | Build | Gate (must pass before next) |
|---|---|---|
| 1 Foundation | docker-compose, DB + migrations, auth, RBAC, design system, layouts/nav, i18n skeleton | `docker compose up` works; 3 roles can log in; role-protected routes verified |
| 2 Student core | landing, scholarships (seeded), details, finder, eligibility checker w/ rules engine, profile, application form (draft/save), dashboard | Eligibility table renders from DB rules; unit tests for rules pass |
| 3 **Document intelligence** | upload + camera, storage, preprocessing, quality, classifier, Tesseract→(Paddle)→(TrOCR) chain, extraction, normalization, mismatch, confidence, SSE progress | **All checks in Section 3 pass** using `demo_assets` |
| 4 Readiness + Fix | readiness engine, deficiencies, Fix My Application, recheck loop, checklist, Application Health | Fix→reupload→score rises works end to end |
| 5 Officer workflow | queue, review split-view with bbox overlay, case summary, actions, audit log, timeline, notifications, resubmission | Officer decision updates student timeline + audit log |
| 6 AI | RAG + Copilot, explanations, case summary via provider abstraction + mock | Copilot answers from real student context; cites sources; works offline in mock mode |
| 7 Ministry | analytics, funnel, deficiency intelligence, process insights, geo table, scheme/rules mgmt | Insight cards generated from seeded data |
| 8 Differentiators | Hindi complete, voice, lite mode + offline queue, video guides, post-selection, grievances | Language switch keeps state; Lite mode banner + resumable upload works |
| 9 Polish | responsive/mobile QA, a11y audit, loading/empty/error states, perf (lazy load, pagination, indexes), tests, demo seed | Full judge demo (below) runs with no errors |

**Testing:** pytest unit tests (rules, normalization, quality scoring, mismatch, readiness), integration tests (upload → OCR → readiness; officer workflow), Playwright E2E (login, eligibility, upload, submit, track), security tests.
**Priority if time is short:** Sections 3, 7–11 and 14's dashboard/checklist/timeline first. Voice, advanced anomaly signals, and offline sync are optional.

---

## 18. Demo mode and judge flow

**Seed data (synthetic, labelled DEMO):** 3 personas — `student@demo.in`, `officer@demo.in`, `ministry@demo.in` (password in README), ~300 synthetic applications across states/schemes with varied statuses, deficiencies, mismatches, and timelines so analytics look real.

**Judge demo script (build so this runs smoothly in ~6 minutes):**
1. Student opens the site, selects Hindi → English, taps **Find My Scholarship**
2. Finder recommends schemes with "Why this matches you" checklists
3. **Check eligibility** → requirement-by-requirement explanation
4. Start application → fill profile
5. **Scan income certificate with phone camera** → live progress → extracted fields with confidence
6. System flags **name mismatch** (potential inconsistency) + a slightly blurry document
7. **Fix My Application** explains what/why/how → student rescans/corrects
8. Readiness goes from ~78% → **96% "Ready to submit"** → submit
9. Officer opens the application: **AI case summary**, evidence overlay on the document, confidence breakdown, timeline
10. Low-confidence document lands in **Human review queue**; officer requests correction / approves → audit log entry
11. Student sees plain-language status update
12. Ministry dashboard: funnel, common problems, state insights
13. Process Improvement Engine: "Improve income-certificate guidance"
14. Ask Copilot "What should I do first?" (Hindi + English)

---

## 19. Final deliverables (produce at the end)

1. Architecture overview (diagram + plain-language explanation of each major decision)
2. Folder structure
3. Database schema (ERD)
4. API list (auto OpenAPI + `docs/api`)
5. AI architecture (rules vs LLM vs human)
6. OCR architecture (providers, fallback chain, thresholds)
7. `.env.example` (`DATABASE_URL, AUTH_SECRET, AI_PROVIDER, AI_API_KEY, STORAGE_PROVIDER, STORAGE_PATH, OCR_ENGINE, OCR_SERVICE_URL, EMAIL_API_KEY, SMS_API_KEY`)
8. Install + run instructions (`docker compose up`, `make dev`, `make seed`)
9. Test commands (`make test`, `make e2e`)
10. Demo credentials + demo workflow
11. Known limitations (be honest: handwriting accuracy, OCR on low-quality photos, demo rules are not official)
12. Future improvements (NSP/DigiLocker integration, more languages, trained classifiers, real SMS/email)
13. SIH presentation flow (problem → insight → solution → live demo → impact → roadmap)

**Positioning line for the presentation:**
> "We built an intelligent scholarship readiness and decision-support layer that prevents avoidable application failures before submission, uses document intelligence to assist verification, routes uncertain cases to human officials, and turns aggregate application problems into actionable process improvements."

**Now begin: inspect the repo, write `docs/ASSESSMENT.md`, then start Phase 1.**
