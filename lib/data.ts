export interface Scheme {
  id: string;
  code: string;
  name: string;
  hindiName: string;
  type: "Fellowship" | "Overseas Scholarship" | "Higher Education" | "Post-Matric";
  level: string;
  coverage: string;
  financialBenefit: string;
  slots: string;
  familyIncomeLimit: string;
  eligibility: string[];
  documentsRequired: string[];
  deadline: string;
  status: "Open" | "Closing Soon" | "Under Scrutiny" | "Closed";
  badgeColor: string;
  description: string;
}

export const SCHEMES: Scheme[] = [
  {
    id: "nfst-2026",
    code: "NFST",
    name: "National Fellowship for Scheduled Tribe Students",
    hindiName: "अनुसूचित जनजाति के छात्रों के लिए राष्ट्रीय फैलोशिप",
    type: "Fellowship",
    level: "M.Phil / Ph.D. (Regular Full-Time)",
    coverage: "Pan India (Recognized Universities & IITs, NITs, Central Unis)",
    financialBenefit: "₹31,000 to ₹35,000/month + Contingency ₹20,500/year + HRA",
    slots: "750 Fellowships annually",
    familyIncomeLimit: "No mandatory ceiling (Priority given to < ₹6.0 Lakhs)",
    eligibility: [
      "Must belong to Scheduled Tribe (ST) community",
      "Secured admission in regular & full-time M.Phil / Ph.D.",
      "Post-Graduate degree with minimum 55% marks",
      "UGC-NET / CSIR-NET or GATE qualified preferred",
    ],
    documentsRequired: [
      "Valid ST Caste Certificate issued by competent authority",
      "M.Phil/Ph.D. Admission / Registration Letter",
      "Post-Graduation Degree & Consolidated Marksheet",
      "Research Synopsis approved by Research Guide",
      "Aadhaar Card (Linked with Bank Account for DBT)",
    ],
    deadline: "15 November 2026",
    status: "Open",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    description: "Supports meritorious ST scholars pursuing advanced research programmes in science, humanities, engineering, and social sciences across premier Indian institutions.",
  },
  {
    id: "nos-2026",
    code: "NOS",
    name: "National Overseas Scholarship for ST Candidates",
    hindiName: "अनुसूचित जनजाति के उम्मीदवारों के लिए राष्ट्रीय प्रवासी छात्रवृत्ति",
    type: "Overseas Scholarship",
    level: "Master's & Ph.D. Abroad",
    coverage: "Top 500 QS/Times World Ranked Foreign Universities",
    financialBenefit: "Full Tuition Fees + Annual Maintenance (£9,900 UK / $15,400 US) + Airfare & Visa",
    slots: "20 Slots annually",
    familyIncomeLimit: "Total Family Income ≤ ₹6.00 Lakhs per annum",
    eligibility: [
      "Must belong to Scheduled Tribe (ST) community",
      "Minimum 55% marks in Bachelor's (for Master's) or Master's (for Ph.D.)",
      "Age below 35 years as on 1st July of application year",
      "Unconditional Offer Letter from Top 500 QS Ranked University",
    ],
    documentsRequired: [
      "Digital ST Tribe Certificate with Barcode / DigiLocker verification",
      "Income Certificate issued by Revenue Authority (Tehsildar/SDM)",
      "Unconditional Admission Letter from Foreign University",
      "Valid Passport copy (First & Last pages)",
      "Standardized Test Scores (GRE/GMAT/IELTS/TOEFL if applicable)",
    ],
    deadline: "30 October 2026",
    status: "Closing Soon",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    description: "Enables ambitious ST scholars to pursue Master’s and Doctoral level courses in prestigious international universities with comprehensive financial backing.",
  },
  {
    id: "topclass-2026",
    code: "TOPCLASS",
    name: "National Scholarship for Higher Education (Top Class) for ST",
    hindiName: "अनुसूचित जनजाति के लिए उच्च शिक्षा (टॉप क्लास) छात्रवृत्ति",
    type: "Higher Education",
    level: "Undergraduate / Postgraduate (IITs, IIMs, AIIMS, NLUs)",
    coverage: "256 Notified Premier Government & Private Institutes",
    financialBenefit: "Full Tuition Fee + Living Expenses (₹3,000/mo) + Books (₹5,000/yr) + PC Allowance (₹45,000 one time)",
    slots: "1,000 Scholarships per year",
    familyIncomeLimit: "Total Family Income ≤ ₹6.00 Lakhs per annum",
    eligibility: [
      "ST student admitted to notified institute as per approved MoTA list",
      "Family income from all sources not exceeding ₹6.00 Lakh per annum",
      "Valid Aadhaar seeded bank account for Direct Benefit Transfer",
    ],
    documentsRequired: [
      "ST Category Certificate",
      "Annual Income Certificate (< 6 Months old)",
      "Fee Receipt & Bonafide Certificate from Institute Dean/Registrar",
      "Class 12th / Degree Certificate",
    ],
    deadline: "30 November 2026",
    status: "Open",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    description: "Recognizes tribal students entering premier professional institutions like IITs, IIMs, and Medical colleges, funding their entire degree.",
  },
  {
    id: "postmatric-2026",
    code: "PMS-ST",
    name: "Post-Matric Scholarship for Scheduled Tribe Students",
    hindiName: "अनुसूचित जनजाति के छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति",
    type: "Post-Matric",
    level: "Class 11, 12th, ITI, Polytechnic, UG & PG Degrees",
    coverage: "Centrally Sponsored Scheme across All States & UTs",
    financialBenefit: "Compulsory non-refundable institutional fees + Monthly maintenance stipend up to ₹1,200/mo",
    slots: "Demand driven (All eligible applicants sanctioned)",
    familyIncomeLimit: "Total Family Income ≤ ₹2.50 Lakhs per annum",
    eligibility: [
      "ST student studying at post-matriculation or post-secondary stage",
      "Enrolled in recognized school, college, or polytechnic",
      "Must not hold another central or state government scholarship",
    ],
    documentsRequired: [
      "ST Caste Certificate",
      "Parental Income Certificate",
      "Previous Year Marksheet with passing grade",
      "College Bonafide & Fee Structure",
    ],
    deadline: "15 December 2026",
    status: "Open",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    description: "The largest foundational scholarship enabling lakhs of tribal boys and girls to stay in higher secondary and undergraduate education.",
  },
  {
    id: "prematric-2025",
    code: "PRE-MATRIC",
    name: "Pre-Matric Scholarship Scheme for ST Students (Class IX & X)",
    hindiName: "कक्षा 9 और 10 के अनुसूचित जनजाति के छात्रों के लिए प्री-मैट्रिक छात्रवृत्ति",
    type: "Post-Matric",
    level: "Class 9 & Class 10 (Secondary)",
    coverage: "Centrally Sponsored Scheme across All States & UTs",
    financialBenefit: "Day Scholars: ₹3,500/year | Hostellers: ₹7,000/year (Direct DBT via PFMS)",
    slots: "Demand driven (All eligible students covered)",
    familyIncomeLimit: "Total Family Income ≤ ₹2.50 Lakhs per annum",
    eligibility: [
      "Must belong to Scheduled Tribe (ST) community",
      "Regular student studying in Class IX or X in Government / recognized school",
      "Family income from all sources does not exceed ₹2.50 Lakhs per annum",
    ],
    documentsRequired: [
      "ST Category Certificate",
      "Parental Income Certificate",
      "Previous Class Marksheet",
      "Bank Account details / Passbook",
    ],
    deadline: "31 January 2026 (Applications Closed)",
    status: "Closed",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-300",
    description: "Supports tribal children at secondary level to arrest high school dropout rates and promote progression to higher studies.",
  },
];

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "applicant" | "officer" | "ministry";
  roleTitle: string;
  category?: string;
  tribe?: string;
  state?: string;
  district?: string;
  gender?: string;
  phone?: string;
  aadhaarLast4?: string;
  institution?: string;
  course?: string;
  readinessScore?: number;
  avatarUrl?: string;
}

export const DEMO_USERS: Record<string, UserProfile> = {
  applicant: {
    id: "USR-ST-2026-904",
    name: "Pooja Xalxo",
    email: "student@demo.in",
    role: "applicant",
    roleTitle: "Scholarship Applicant",
    category: "Scheduled Tribe (ST)",
    tribe: "Oraon (Kurukh)",
    state: "Jharkhand",
    district: "Ranchi",
    aadhaarLast4: "8842",
    institution: "Central University of Jharkhand",
    course: "Ph.D. in Environmental Sciences & Tribal Ecology (Year 1)",
    readinessScore: 86,
  },
  officer: {
    id: "OFF-MOTA-552",
    name: "Dr. Arvind Meena",
    email: "officer@demo.in",
    role: "officer",
    roleTitle: "Senior Scrutiny & Verification Officer",
    state: "National Headquarters, New Delhi",
    district: "Shastri Bhawan",
    institution: "Ministry of Tribal Affairs, Government of India",
  },
  ministry: {
    id: "MIN-ADMIN-101",
    name: "Smt. R. Ananthalakshmi, IAS",
    email: "ministry@demo.in",
    role: "ministry",
    roleTitle: "Joint Secretary (Scholarships, DBT & IT Systems)",
    state: "National Headquarters, New Delhi",
    institution: "Ministry of Tribal Affairs, Government of India",
  },
};

export interface ApplicationRecord {
  id: string;
  applicationNumber: string;
  schemeId: string;
  schemeCode: string;
  schemeName: string;
  studentName: string;
  tribe: string;
  state: string;
  stage: "Draft" | "Submitted" | "Document Scrutiny" | "Eligibility Verification" | "Merit Screening" | "Sanctioned" | "Deficient";
  stageStep: number; // 1 to 5
  readinessScore: number;
  submittedAt: string;
  lastUpdated: string;
  deficiencyCount: number;
  deficiencyNote?: string;
  aiConfidence: number; // 0 to 100
  stCategoryVerified: boolean;
  incomeVerified: boolean;
  admissionVerified: boolean;
  priorityFlag?: boolean;
}

export const DEMO_APPLICATIONS: ApplicationRecord[] = [
  {
    id: "app-101",
    applicationNumber: "MOTA/NFST/2026/09281",
    schemeId: "nfst-2026",
    schemeCode: "NFST",
    schemeName: "National Fellowship for ST Students",
    studentName: "Pooja Xalxo",
    tribe: "Oraon (Jharkhand)",
    state: "Jharkhand",
    stage: "Document Scrutiny",
    stageStep: 2,
    readinessScore: 86,
    submittedAt: "24 Sep 2026",
    lastUpdated: "28 Sep 2026",
    deficiencyCount: 1,
    deficiencyNote: "Income certificate seal is partially blurred; issuing tehsildar sign needs re-verification.",
    aiConfidence: 89,
    stCategoryVerified: true,
    incomeVerified: false,
    admissionVerified: true,
    priorityFlag: true,
  },
  {
    id: "app-102",
    applicationNumber: "MOTA/NOS/2026/00142",
    schemeId: "nos-2026",
    schemeCode: "NOS",
    schemeName: "National Overseas Scholarship for ST",
    studentName: "Birsa Kispotta",
    tribe: "Santhal (Odisha)",
    state: "Odisha",
    stage: "Merit Screening",
    stageStep: 4,
    readinessScore: 98,
    submittedAt: "12 Sep 2026",
    lastUpdated: "27 Sep 2026",
    deficiencyCount: 0,
    aiConfidence: 97,
    stCategoryVerified: true,
    incomeVerified: true,
    admissionVerified: true,
  },
  {
    id: "app-103",
    applicationNumber: "MOTA/TOPCLASS/2026/04118",
    schemeId: "topclass-2026",
    schemeCode: "TOPCLASS",
    schemeName: "Top Class Education Scheme (IIT Bombay)",
    studentName: "Devraj Marandi",
    tribe: "Ho (Jharkhand)",
    state: "Jharkhand",
    stage: "Sanctioned",
    stageStep: 5,
    readinessScore: 100,
    submittedAt: "05 Aug 2026",
    lastUpdated: "25 Sep 2026",
    deficiencyCount: 0,
    aiConfidence: 99,
    stCategoryVerified: true,
    incomeVerified: true,
    admissionVerified: true,
  },
  {
    id: "app-104",
    applicationNumber: "MOTA/NFST/2026/09412",
    schemeId: "nfst-2026",
    schemeCode: "NFST",
    schemeName: "National Fellowship for ST Students",
    studentName: "Anjali Jamatia",
    tribe: "Tripuri (Tripura)",
    state: "Tripura",
    stage: "Deficient",
    stageStep: 2,
    readinessScore: 68,
    submittedAt: "26 Sep 2026",
    lastUpdated: "29 Sep 2026",
    deficiencyCount: 2,
    deficiencyNote: "Name mismatch: Certificate reads 'Anjali Debbarma' while university admission reads 'Anjali Jamatia'. Please upload gazette notification or affidavit.",
    aiConfidence: 62,
    stCategoryVerified: false,
    incomeVerified: true,
    admissionVerified: true,
    priorityFlag: true,
  },
  {
    id: "app-105",
    applicationNumber: "MOTA/NOS/2026/00189",
    schemeId: "nos-2026",
    schemeCode: "NOS",
    schemeName: "National Overseas Scholarship for ST",
    studentName: "Tenzing Bhotia",
    tribe: "Bhotia (Sikkim)",
    state: "Sikkim",
    stage: "Eligibility Verification",
    stageStep: 3,
    readinessScore: 92,
    submittedAt: "19 Sep 2026",
    lastUpdated: "28 Sep 2026",
    deficiencyCount: 0,
    aiConfidence: 94,
    stCategoryVerified: true,
    incomeVerified: true,
    admissionVerified: true,
  },
];
