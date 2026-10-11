export interface StipendItem {
  component: string;
  amount: string;
  frequency: string;
  details: string;
}

export interface DocumentItem {
  name: string;
  issuingAuthority: string;
  format: string;
  mandatory: boolean;
  notes: string;
}

export interface SelectionStage {
  stageNumber: number;
  title: string;
  description: string;
  authority: string;
}

export interface NodalContact {
  division: string;
  helpline: string;
  email: string;
  address: string;
  circularNo: string;
}

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
  fundingModel?: string;
  tenure?: string;
  qualifyingExams?: string;
  stipendBreakdown?: StipendItem[];
  documentDetails?: DocumentItem[];
  selectionStages?: SelectionStage[];
  dbtGuidelines?: string[];
  importantTerms?: string[];
  nodalContact?: NodalContact;
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
    financialBenefit: "₹37,000 to ₹42,000/month + Contingency ₹20,500/year + HRA",
    slots: "750 Fellowships annually",
    familyIncomeLimit: "No mandatory ceiling (Priority given to < ₹6.0 Lakhs)",
    fundingModel: "100% Central Sector Scheme (Ministry of Tribal Affairs, Govt. of India)",
    tenure: "5 Years (2 Years JRF + 3 Years SRF, subject to satisfactory bi-annual research assessment)",
    qualifyingExams: "UGC-NET / CSIR-NET / GATE or Confirmed admission in recognized University/IIT/NIT",
    eligibility: [
      "Must belong to Scheduled Tribe (ST) community with valid domicile and caste certificate",
      "Secured admission in regular and full-time M.Phil / Ph.D. course in an accredited Indian institution",
      "Post-Graduate degree with minimum 55% marks (or equivalent cumulative grade)",
      "Scholars holding UGC-NET / CSIR-NET or GATE qualification are accorded top merit ranking",
      "Must not be in receipt of any other fellowship, stipend, or regular government salary concurrently",
    ],
    documentsRequired: [
      "Valid ST Caste Certificate issued by competent authority",
      "M.Phil/Ph.D. Admission / Registration Letter",
      "Post-Graduation Degree & Consolidated Marksheet",
      "Research Synopsis approved by Research Guide",
      "Aadhaar Card (Linked with Bank Account for DBT)",
    ],
    stipendBreakdown: [
      {
        component: "Junior Research Fellowship (JRF)",
        amount: "₹37,000 / month",
        frequency: "Monthly (Years 1 & 2)",
        details: "Disbursed for the initial 24 months of full-time doctoral research upon supervisor biometric attendance certification.",
      },
      {
        component: "Senior Research Fellowship (SRF)",
        amount: "₹42,000 / month",
        frequency: "Monthly (Years 3, 4 & 5)",
        details: "Upgraded after 2 years following evaluation of research publications and progress by a three-member expert committee.",
      },
      {
        component: "Contingency Grant (Humanities & Social Sciences)",
        amount: "₹20,500 / year",
        frequency: "Annual",
        details: "Reimbursement for textbooks, field investigation, archival study tours, and academic survey travel expenses.",
      },
      {
        component: "Contingency Grant (Science, Engg & Technology)",
        amount: "₹25,000 / year",
        frequency: "Annual",
        details: "Allocated for specialized reagents, experimental consumables, computing software, and analytical lab testing.",
      },
      {
        component: "House Rent Allowance (HRA)",
        amount: "8% / 16% / 24% or 9% / 18% / 27%",
        frequency: "Monthly",
        details: "Categorized as per Govt of India classification (X, Y, Z cities) if university campus hostel accommodation is not allotted.",
      },
      {
        component: "Escorts / Reader Assistance",
        amount: "₹3,000 / month",
        frequency: "Monthly",
        details: "Additional assistance for physically challenged (Divyangjan) tribal scholars requiring reader or mobility aid.",
      },
    ],
    documentDetails: [
      {
        name: "Scheduled Tribe (ST) Community Certificate",
        issuingAuthority: "Sub-Divisional Magistrate (SDM) / SDO / Tehsildar",
        format: "PDF (Max 2MB)",
        mandatory: true,
        notes: "Digital / Barcoded certificate verifying Scheduled Tribe status under the Constitution Order.",
      },
      {
        name: "Ph.D./M.Phil Admission & Registration Order",
        issuingAuthority: "Registrar / Dean of Academic Affairs",
        format: "PDF (Max 2MB)",
        mandatory: true,
        notes: "Confirms regular full-time registration, departmental enrolment number, and date of joining.",
      },
      {
        name: "Post-Graduate Degree & Consolidated Marksheet",
        issuingAuthority: "Recognized Central/State University",
        format: "PDF (Max 3MB)",
        mandatory: true,
        notes: "Proof of obtaining minimum 55% aggregate marks in PG qualifying degree.",
      },
      {
        name: "Research Synopsis & Guide Consent Letter",
        issuingAuthority: "Research Supervisor & Head of Department",
        format: "PDF (Max 5MB)",
        mandatory: true,
        notes: "Detailed thesis proposal with approved problem statement, methodology, and supervisor endorsement.",
      },
      {
        name: "Aadhaar Card & NPCI Seeded Bank Passbook",
        issuingAuthority: "UIDAI & Core Banking Branch",
        format: "PDF (Max 1MB)",
        mandatory: true,
        notes: "Bank savings account must be in the scholar's individual name and active on the NPCI Aadhaar bridge.",
      },
    ],
    selectionStages: [
      {
        stageNumber: 1,
        title: "Online Portal Submission & e-KYC",
        description: "Scholar logs in using Aadhaar OTP authentication, registers research parameters, and submits digital documents.",
        authority: "Applicant Action",
      },
      {
        stageNumber: 2,
        title: "AI Document Scrutiny & INO Verification",
        description: "System verifies document readability and Institute Nodal Officer (INO) authenticates full-time institutional enrolment.",
        authority: "Institute Nodal Officer (INO)",
      },
      {
        stageNumber: 3,
        title: "Ministry Scrutiny Cell Verification",
        description: "MoTA scrutiny division validates ST community records, admission tenure, and non-receipt of duplicate grants.",
        authority: "MoTA Scrutiny Cell",
      },
      {
        stageNumber: 4,
        title: "Central Merit Selection Committee Award",
        description: "National Selection Committee selects 750 fellows based on NET/GATE scores, academic track record, and research merit.",
        authority: "National Selection Committee",
      },
      {
        stageNumber: 5,
        title: "Digital Sanction Order & PFMS DBT Disbursement",
        description: "Official award letter is issued digitally. Monthly stipends and annual contingencies are credited via PFMS directly to bank.",
        authority: "Public Financial Management System (PFMS)",
      },
    ],
    dbtGuidelines: [
      "Stipend is credited on a monthly basis strictly through PFMS (Public Financial Management System) Direct Benefit Transfer.",
      "Scholars must ensure their bank account remains active, has no credit ceiling, and is mapped to Aadhaar NPCI mapper.",
      "Continuation into subsequent quarters requires online submission of half-yearly progress reports endorsed by the research guide.",
    ],
    importantTerms: [
      "Candidate cannot accept any other concurrent fellowship, salary, or commercial remuneration during fellowship tenure.",
      "Maximum tenure is 5 years or until submission of Ph.D. thesis / viva voce examination, whichever is earlier.",
      "No parental income ceiling applies, though preference is accorded to scholars from economically vulnerable tribal families.",
    ],
    nodalContact: {
      division: "Fellowship Division, Ministry of Tribal Affairs, Govt. of India",
      helpline: "1800-11-7788 (Toll Free) / 011-23340578",
      email: "fellowship-mota@nic.in",
      address: "Gate No. 3, Jeevan Tara Building, Parliament Street, New Delhi - 110001",
      circularNo: "MoTA/EDU/NFST/2026-27/REG-01",
    },
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
    fundingModel: "100% Central Sector Scheme (Ministry of Tribal Affairs, Govt. of India)",
    tenure: "Master's Degree: Up to 3 Years | Ph.D. Research: Up to 4-5 Years",
    qualifyingExams: "Unconditional offer letter from a foreign university ranked in the Top 500 QS / Times World Rankings",
    eligibility: [
      "Must belong to Scheduled Tribe (ST) community with valid caste certificate",
      "Minimum 55% marks or equivalent CGPA in Bachelor's (for Master's degree) or Master's (for Ph.D. studies)",
      "Age below 35 years as on 1st July of the application year (relaxations as per Central Govt rules)",
      "Unconditional Admission Offer from a university ranked in Top 500 QS / Times Higher Education World Rankings",
      "Total parental/family income from all sources must not exceed ₹6.00 Lakhs per annum",
      "Maximum of two children from the same parent/guardian are eligible under this scheme",
    ],
    documentsRequired: [
      "Digital ST Tribe Certificate with Barcode / DigiLocker verification",
      "Income Certificate issued by Revenue Authority (Tehsildar/SDM)",
      "Unconditional Admission Letter from Foreign University",
      "Valid Passport copy (First & Last pages)",
      "Standardized Test Scores (GRE/GMAT/IELTS/TOEFL if applicable)",
    ],
    stipendBreakdown: [
      {
        component: "Annual Living & Maintenance Allowance (USA & other nations)",
        amount: "$15,400 / year",
        frequency: "Disbursed in tranches",
        details: "Fixed annual subsistence maintenance allowance remitted directly through the Indian High Commission / Embassy.",
      },
      {
        component: "Annual Living & Maintenance Allowance (United Kingdom)",
        amount: "£9,900 / year",
        frequency: "Disbursed in tranches",
        details: "Standard UK living and accommodation allowance disbursed in coordination with Education Wing, High Commission of India, London.",
      },
      {
        component: "Full Foreign University Tuition Fees",
        amount: "100% as per actual institutional invoice",
        frequency: "Direct Institutional Transfer",
        details: "Complete tuition, laboratory fees, and examination costs transferred directly to the foreign university treasury.",
      },
      {
        component: "International Airfare & Visa Charges",
        amount: "Actual Economy Airfare + Visa Processing Fee",
        frequency: "One-Time (Return)",
        details: "Covers round-trip economy air tickets between India and destination university airport plus embassy visa issuance fee.",
      },
      {
        component: "Annual Contingency & Research Grant",
        amount: "£1,100 (UK) / $1,500 (USA & Others)",
        frequency: "Annual",
        details: "For reference textbooks, academic field trips, international conference registrations, and specialized software.",
      },
      {
        component: "Compulsory Health & Medical Insurance",
        amount: "100% of actual health premium",
        frequency: "Annual",
        details: "Mandatory university or national health insurance coverage (including National Health Service NHS surcharge in the UK).",
      },
    ],
    documentDetails: [
      {
        name: "Scheduled Tribe Certificate",
        issuingAuthority: "District Magistrate / Deputy Commissioner / SDM / Tehsildar",
        format: "PDF (Max 2MB)",
        mandatory: true,
        notes: "Digitally certified caste certificate with revenue identification seal.",
      },
      {
        name: "Annual Family Income Certificate",
        issuingAuthority: "Competent Revenue Authority (Tehsildar/SDM) / ITR / Form-16",
        format: "PDF (Max 2MB)",
        mandatory: true,
        notes: "Gross annual income of parents/family must not exceed ₹6.00 Lakhs for the preceding financial year.",
      },
      {
        name: "Unconditional University Admission Offer Letter",
        issuingAuthority: "Host Foreign University (QS Top 500)",
        format: "PDF (Max 4MB)",
        mandatory: true,
        notes: "Admission offer must be unconditional, confirming degree programme, duration, and tuition fee schedule.",
      },
      {
        name: "Valid Indian Passport",
        issuingAuthority: "Regional Passport Office (RPO), Ministry of External Affairs",
        format: "PDF (Max 3MB)",
        mandatory: true,
        notes: "Passport must possess minimum 18 months validity remaining from date of application.",
      },
      {
        name: "Previous Degree Marksheets & Certificates",
        issuingAuthority: "Accredited Indian University / Institute",
        format: "PDF (Max 4MB)",
        mandatory: true,
        notes: "Attested transcripts demonstrating minimum 55% marks in qualifying undergraduate or master's degrees.",
      },
    ],
    selectionStages: [
      {
        stageNumber: 1,
        title: "Online Global Portal Application",
        description: "Candidate uploads unconditional offer letter, transcripts, income proofs, and statement of research purpose.",
        authority: "Applicant",
      },
      {
        stageNumber: 2,
        title: "AI Verification & QS Ranking Screening",
        description: "Automated verification checks QS World Ranking, document resolution, and income ceiling compliance.",
        authority: "Automated Portal System",
      },
      {
        stageNumber: 3,
        title: "Expert Screening Committee Scrutiny",
        description: "Inter-disciplinary committee of university professors reviews research field relevance and academic merits.",
        authority: "MoTA Expert Committee",
      },
      {
        stageNumber: 4,
        title: "Central Selection Committee Final Recommendation",
        description: "Merit ranking finalized for 20 annual overseas scholarship slots across Science, Engg, Medicine, and Humanities.",
        authority: "Inter-Ministerial Selection Board",
      },
      {
        stageNumber: 5,
        title: "Surety Bond Execution & Indian Mission Disbursement",
        description: "Awardee executes legal surety bond. MoTA remits tuition to foreign university and living stipend via Indian Mission abroad.",
        authority: "Indian High Commissions & MoTA",
      },
    ],
    dbtGuidelines: [
      "Tuition fees are remitted directly to the foreign university upon receipt of official invoice from the overseas registrar.",
      "Living maintenance allowances are transferred directly into the scholar's local overseas bank account via the Indian High Commission / Embassy.",
      "Scholars must submit half-yearly academic progress reports signed by their foreign university academic supervisor.",
    ],
    importantTerms: [
      "Maximum of two children from the same parent or family are eligible under this scheme.",
      "Age limit is strictly below 35 years as on 1st July of the application year.",
      "Candidates must return to India within six months of course completion to contribute towards national development.",
    ],
    nodalContact: {
      division: "Overseas Scholarship Section, Ministry of Tribal Affairs",
      helpline: "011-23381665 / 011-23340579",
      email: "nos-tribal@nic.in",
      address: "Shastri Bhawan, Dr. Rajendra Prasad Road, New Delhi - 110001",
      circularNo: "MoTA/NOS/SCH-2026/04",
    },
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
    fundingModel: "100% Central Sector Scheme (Ministry of Tribal Affairs, Govt. of India)",
    tenure: "Full duration of the undergraduate or postgraduate course (4-5 Years for B.Tech/MBBS/Law; 2 Years for MBA/PG)",
    qualifyingExams: "Admission secured through JEE Advanced / NEET / CAT / CLAT / National entrance examination into 256 Notified Institutes",
    eligibility: [
      "Must belong to Scheduled Tribe (ST) community with valid caste certificate",
      "Secured admission in one of the 256 notified premier institutions (IITs, NITs, IIMs, AIIMS, NLUs, IIITs, NIDs)",
      "Total family income from all sources must not exceed ₹6.00 Lakhs per annum",
      "Admission must be regular and full-time under regular curriculum",
      "Valid Aadhaar seeded bank account for Direct Benefit Transfer",
      "Continued funding requires securing at least 50% passing marks in each academic semester",
    ],
    documentsRequired: [
      "ST Category Certificate",
      "Annual Income Certificate (< 6 Months old)",
      "Fee Receipt & Bonafide Certificate from Institute Dean/Registrar",
      "Class 12th / Degree Certificate",
    ],
    stipendBreakdown: [
      {
        component: "Full Institutional Tuition Fee & Non-Refundable Dues",
        amount: "100% actuals (Govt uncapped; up to ₹3.72L/yr for Pvt)",
        frequency: "Per Semester / Annual",
        details: "Direct institutional reimbursement covering tuition, library, examination, and laboratory fees.",
      },
      {
        component: "Monthly Living Expenses Allowance",
        amount: "₹3,000 / month (₹36,000 / year)",
        frequency: "Monthly / Bi-annual",
        details: "Disbursed directly into student savings bank account for mess, hostel, and personal maintenance charges.",
      },
      {
        component: "Annual Books & Stationery Grant",
        amount: "₹5,000 / year",
        frequency: "Annual",
        details: "One-time annual credit for textbooks, reference material, technical calculators, and stationery.",
      },
      {
        component: "Computer / Laptop One-Time Grant",
        amount: "₹45,000 (One-Time)",
        frequency: "First Year of Course",
        details: "Dedicated capital grant for purchasing a computer, laptop, UPS, and printer in the first year of degree.",
      },
    ],
    documentDetails: [
      {
        name: "Scheduled Tribe Certificate",
        issuingAuthority: "SDM / Sub-Divisional Officer / Tehsildar",
        format: "PDF (Max 2MB)",
        mandatory: true,
        notes: "Digital / Verified ST Certificate issued by the designated state authority.",
      },
      {
        name: "Annual Family Income Certificate",
        issuingAuthority: "Tehsildar / Competent Revenue Officer",
        format: "PDF (Max 2MB)",
        mandatory: true,
        notes: "Must be issued for the current financial year certifying annual income <= ₹6.00 Lakhs.",
      },
      {
        name: "Institute Admission Letter & Itemized Fee Structure",
        issuingAuthority: "Dean of Academic Affairs / Registrar of Premier Institute",
        format: "PDF (Max 3MB)",
        mandatory: true,
        notes: "On official institutional letterhead specifying course duration and fee breakup.",
      },
      {
        name: "Class 12th / Senior Secondary Marksheet",
        issuingAuthority: "Recognized Central / State Board (CBSE/ICSE/State Board)",
        format: "PDF (Max 3MB)",
        mandatory: true,
        notes: "Demonstrates qualifying board examination marks and national entrance test rank card.",
      },
      {
        name: "Aadhaar Card & NPCI Mapped Bank Account",
        issuingAuthority: "UIDAI & Bank Branch",
        format: "PDF (Max 1MB)",
        mandatory: true,
        notes: "Bank account must be in the student's name and seeded on the NPCI Aadhaar DBT platform.",
      },
    ],
    selectionStages: [
      {
        stageNumber: 1,
        title: "Admission & Portal Application",
        description: "Admitted tribal student logs in to portal and submits entrance rank, fee demand, and identity proofs.",
        authority: "Applicant",
      },
      {
        stageNumber: 2,
        title: "Institute Level Verification (Level 1)",
        description: "Institute Nodal Officer (Dean Academics) validates student admission roll, hostel stay, and fee receipts.",
        authority: "Institute Nodal Officer (IIT/IIM/AIIMS)",
      },
      {
        stageNumber: 3,
        title: "State Tribal Department Verification (Level 2)",
        description: "State Nodal Officer validates caste credentials against state databases.",
        authority: "State Nodal Directorate",
      },
      {
        stageNumber: 4,
        title: "MoTA Sanction Generation",
        description: "Ministry of Tribal Affairs approves sanction orders against the 1,000 national slots.",
        authority: "Ministry of Tribal Affairs",
      },
      {
        stageNumber: 5,
        title: "PFMS Direct Benefit Transfer",
        description: "Tuition fee transferred directly to institute; living, book, and laptop grants paid to student account.",
        authority: "PFMS Central Gateway",
      },
    ],
    dbtGuidelines: [
      "Institutional tuition fee is paid directly to the institute's official bank account.",
      "Living allowance (₹36,000/yr), books grant (₹5,000/yr), and laptop grant (₹45,000) are credited to student's savings account.",
      "Renewal requires submitting marksheets with at least 50% passing aggregate and continuous attendance.",
    ],
    importantTerms: [
      "Applicable exclusively to students enrolled in the 256 MoTA-notified premier institutions.",
      "Total annual quota is capped at 1,000 scholarships across India.",
      "Family income ceiling is strictly ₹6.00 Lakhs per annum from all verifiable sources.",
    ],
    nodalContact: {
      division: "Higher Education Division, Ministry of Tribal Affairs",
      helpline: "011-23340238 / 1800-11-7788",
      email: "topclass-tribal@nic.in",
      address: "Shastri Bhawan, A-Wing, New Delhi - 110001",
      circularNo: "MoTA/HE/TOPCLASS/2026/REV-03",
    },
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
    fundingModel: "Centrally Sponsored Scheme (75% Central share, 25% State share; 90:10 for NE & Himalayan States)",
    tenure: "Duration of the enrolled course (1 Year for ITI up to 5 Years for professional UG/PG)",
    qualifyingExams: "Passed Class 10th (Secondary School Examination) from recognized education board",
    eligibility: [
      "ST student studying at post-matriculation or post-secondary stage in recognized institution",
      "Enrolled in regular course in Government / Recognized school, polytechnic, college, or university",
      "Total family annual income from all sources does not exceed ₹2.50 Lakhs",
      "Must not hold another central or state government scholarship simultaneously",
      "Must have secured promotion to the relevant academic year without year-back backlog",
    ],
    documentsRequired: [
      "ST Caste Certificate",
      "Parental Income Certificate",
      "Previous Year Marksheet with passing grade",
      "College Bonafide & Fee Structure",
    ],
    stipendBreakdown: [
      {
        component: "Group 1: Degree Courses in Medical, Engg, Agriculture, Tech",
        amount: "Hostellers: ₹1,200/mo | Day Scholars: ₹550/mo",
        frequency: "Monthly (10 Months/yr)",
        details: "Applicable to professional degree courses including MBBS, B.Tech, B.Arch, and Veterinary Science.",
      },
      {
        component: "Group 2: Professional PG & Diplomas (Pharmacy, Nursing, B.Ed)",
        amount: "Hostellers: ₹820/mo | Day Scholars: ₹530/mo",
        frequency: "Monthly (10 Months/yr)",
        details: "Applicable to professional diplomas, post-graduate degrees, management, and paramedical courses.",
      },
      {
        component: "Group 3: General UG & PG Degrees (B.A., B.Sc., B.Com, M.A.)",
        amount: "Hostellers: ₹570/mo | Day Scholars: ₹300/mo",
        frequency: "Monthly (10 Months/yr)",
        details: "Applicable to general undergraduate and postgraduate degrees in science, arts, commerce, and law.",
      },
      {
        component: "Group 4: Higher Secondary & Vocational (Class 11, 12, ITI)",
        amount: "Hostellers: ₹380/mo | Day Scholars: ₹230/mo",
        frequency: "Monthly (10 Months/yr)",
        details: "Applicable to intermediate, higher secondary (10+2), and ITI vocational trade certificate programmes.",
      },
      {
        component: "Compulsory Non-Refundable Institutional Fees",
        amount: "100% of approved fee schedule",
        frequency: "Annual",
        details: "Direct payment of admission fee, tuition fee, library, sports, and laboratory examination charges.",
      },
    ],
    documentDetails: [
      {
        name: "Scheduled Tribe Certificate",
        issuingAuthority: "Tehsildar / SDO / Competent Revenue Authority",
        format: "PDF (Max 2MB)",
        mandatory: true,
        notes: "Issued in the candidate's name specifying sub-caste and state of origin.",
      },
      {
        name: "Annual Family Income Certificate",
        issuingAuthority: "Competent Revenue Authority / Tehsildar",
        format: "PDF (Max 2MB)",
        mandatory: true,
        notes: "Certifying gross household income <= ₹2.50 Lakhs per annum for current financial year.",
      },
      {
        name: "Previous Year Qualifying Marksheet",
        issuingAuthority: "State / Central Board or University",
        format: "PDF (Max 2MB)",
        mandatory: true,
        notes: "Confirms passing status in the preceding class or examination.",
      },
      {
        name: "College Fee Receipt & Bonafide Certificate",
        issuingAuthority: "Principal / Dean / Registrar of College",
        format: "PDF (Max 2MB)",
        mandatory: true,
        notes: "Certifies regular full-time enrolment and verified fee structure for 2026-27.",
      },
      {
        name: "Aadhaar Card & NPCI Seeded Bank Account",
        issuingAuthority: "UIDAI & Bank Branch",
        format: "PDF (Max 1MB)",
        mandatory: true,
        notes: "Bank savings account mapped to Aadhaar for Direct Benefit Transfer.",
      },
    ],
    selectionStages: [
      {
        stageNumber: 1,
        title: "Online Registration on State / National Portal",
        description: "Student enters Aadhaar details, selects college course, and uploads verified certificates.",
        authority: "Applicant",
      },
      {
        stageNumber: 2,
        title: "Institute Level Scrutiny",
        description: "Principal or College Nodal Officer confirms student enrolment, attendance, and fee details.",
        authority: "College Principal / Nodal Officer",
      },
      {
        stageNumber: 3,
        title: "District Welfare Officer Verification",
        description: "District Tribal Welfare Officer scrutinizes caste records and income authenticity.",
        authority: "District Welfare Officer (DWO)",
      },
      {
        stageNumber: 4,
        title: "State Sanction Generation",
        description: "State Directorate of Tribal Welfare compiles beneficiary lists and issues financial sanction.",
        authority: "State Tribal Welfare Directorate",
      },
      {
        stageNumber: 5,
        title: "PFMS Direct Benefit Transfer",
        description: "Stipend and fee reimbursements disbursed directly to student's bank account via PFMS DBT.",
        authority: "PFMS & State Treasury",
      },
    ],
    dbtGuidelines: [
      "Maintenance allowance and compulsory fees are credited straight to student's Aadhaar-linked savings account.",
      "100% digital disbursement under DBT with automated SMS and PFMS tracking.",
      "Demand-driven scheme: every eligible applicant fulfilling criteria receives sanction.",
    ],
    importantTerms: [
      "Parental income ceiling is strictly ₹2.50 Lakhs per annum.",
      "Students cannot combine this with any other government educational scholarship.",
      "Continuation requires regular promotion to the next higher academic class.",
    ],
    nodalContact: {
      division: "Post-Matric Scholarship Directorate, State Tribal Welfare Dept & MoTA",
      helpline: "0120-6619540 (NSP Helpdesk) / 1800-11-7788",
      email: "helpdesk@nsp.gov.in",
      address: "Ministry of Tribal Affairs, New Delhi & Respective State Secretariats",
      circularNo: "MoTA/PMS-ST/REV/2026-02",
    },
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
    fundingModel: "Centrally Sponsored Scheme (75% Central share, 25% State share; 90:10 for NE & Himalayan States)",
    tenure: "2 Years (Class 9 and Class 10)",
    qualifyingExams: "Passed Class 8 from recognized school and admitted into regular Class 9 or 10",
    eligibility: [
      "Must belong to Scheduled Tribe (ST) community",
      "Regular student studying in Class IX or X in Government or recognized private school",
      "Family income from all sources does not exceed ₹2.50 Lakhs per annum",
      "Must not be in receipt of another central or state scholarship",
    ],
    documentsRequired: [
      "ST Category Certificate",
      "Parental Income Certificate",
      "Previous Class Marksheet",
      "Bank Account details / Passbook",
    ],
    stipendBreakdown: [
      {
        component: "Day Scholars Annual Allowance",
        amount: "₹3,500 / year (₹350/mo for 10 months)",
        frequency: "Annual / Bi-annual",
        details: "Provides financial aid for textbooks, school stationery, uniforms, and local transport.",
      },
      {
        component: "Hostellers Annual Allowance",
        amount: "₹7,000 / year (₹700/mo for 10 months)",
        frequency: "Annual / Bi-annual",
        details: "Assists students residing in government or recognized tribal hostels towards boarding and lodging expenses.",
      },
      {
        component: "Additional Allowance for Differently-Abled (Divyangjan)",
        amount: "₹1,000 / year",
        frequency: "Annual",
        details: "Supplementary grant for students with benchmark disabilities enrolled in secondary education.",
      },
    ],
    documentDetails: [
      {
        name: "Scheduled Tribe Certificate",
        issuingAuthority: "Tehsildar / Sub-Divisional Officer",
        format: "PDF / Physical Copy",
        mandatory: true,
        notes: "In the student's name or valid parental ST certificate as permitted by state rules.",
      },
      {
        name: "Annual Family Income Certificate",
        issuingAuthority: "Competent Revenue Authority / Tehsildar",
        format: "PDF / Physical Copy",
        mandatory: true,
        notes: "Family income from all sources must not exceed ₹2.50 Lakhs.",
      },
      {
        name: "Previous Class (Class 8 / 9) Marksheet",
        issuingAuthority: "School Headmaster / Examination Board",
        format: "PDF / Copy",
        mandatory: true,
        notes: "Verifies passing performance and promotion to Class 9 or 10.",
      },
      {
        name: "Student / Guardian Bank Passbook",
        issuingAuthority: "Core Banking Branch",
        format: "PDF / Copy",
        mandatory: true,
        notes: "Bank account in student's name or joint account with parent/guardian seeded with Aadhaar.",
      },
    ],
    selectionStages: [
      {
        stageNumber: 1,
        title: "School Level Data Compilation",
        description: "Headmaster or school nodal teacher collects verified applications and registers on state portal.",
        authority: "School Headmaster",
      },
      {
        stageNumber: 2,
        title: "District Education Officer Verification",
        description: "DEO confirms student enrolments against state student tracking registry.",
        authority: "District Education Officer (DEO)",
      },
      {
        stageNumber: 3,
        title: "State Tribal Directorate Sanction",
        description: "State department sanctions consolidated funds for all eligible secondary students.",
        authority: "State Nodal Directorate",
      },
      {
        stageNumber: 4,
        title: "PFMS Direct Benefit Transfer",
        description: "Disbursed directly into student or guardian Aadhaar-seeded bank account.",
        authority: "PFMS Central Gateway",
      },
    ],
    dbtGuidelines: [
      "All disbursements are made through PFMS DBT into bank accounts mapped with Aadhaar.",
      "Specifically targeted to arrest dropout rates between elementary and secondary schooling.",
    ],
    importantTerms: [
      "Applicable only to regular full-time students in Class IX and Class X.",
      "Family income ceiling is strictly ₹2.50 Lakhs per annum.",
      "Applications for Academic Session 2025-26 are closed; Session 2026-27 opens in July 2026.",
    ],
    nodalContact: {
      division: "Pre-Matric Division, Ministry of Tribal Affairs & State Directorates",
      helpline: "1800-11-7788",
      email: "prematric-tribal@nic.in",
      address: "Ministry of Tribal Affairs, Shastri Bhawan, New Delhi",
      circularNo: "MoTA/PRE-MATRIC/2025-26/01",
    },
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
