"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  FileText, 
  ExternalLink,
  Download,
  BookOpen,
  PhoneCall,
  Landmark
} from "lucide-react";

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const detailedFaqs = [
    {
      q: "What is the National Fellowship for Scheduled Tribe Students (NFST), and what are the detailed eligibility criteria, fellowship tenure, and stipend amounts?",
      answerIntro:
        "The National Fellowship for Scheduled Tribe Students (NFST) is a flagship Central Sector scheme fully funded by the Ministry of Tribal Affairs (MoTA). It provides financial support to meritorious Scheduled Tribe scholars pursuing regular, full-time M.Phil. and Ph.D. degrees in recognized Indian universities and research institutions.",
      points: [
        {
          heading: "Academic Eligibility & Registration",
          text: "Candidates must have secured confirmed admission to a regular full-time M.Phil. or Ph.D. programme in a University or Institution recognized under Section 2(f) and 12(B) of the UGC Act, 1956, AICTE, or Centrally Funded Technical Institutes (CFTIs). Scholars enrolled in distance education or part-time programmes are strictly ineligible.",
        },
        {
          heading: "Revised Fellowship Stipend (As per MoE/MoTA OM)",
          text: "Junior Research Fellow (JRF): Rs. 37,000 per month for the first two years. Senior Research Fellow (SRF): Rs. 42,000 per month for the remaining three years (following formal evaluation and upgradation). In addition, House Rent Allowance (HRA) is admissible as per Central Government rates (8%, 16%, or 24% / revised 9%, 18%, or 27% based on city classification) if hostel accommodation is not provided by the host university.",
        },
        {
          heading: "Annual Contingency Allowances",
          text: "Humanities & Social Sciences: Rs. 10,000 per annum for the first two years; Rs. 20,500 per annum for the remaining three years. Science, Engineering & Technology: Rs. 12,000 per annum for the first two years; Rs. 28,000 per annum for the remaining three years.",
        },
        {
          heading: "Annual Quota & Income Conditions",
          text: "There are 750 fresh fellowship slots available annually. There is no mandatory annual family income ceiling for regular full-time Ph.D. candidates under the revised guidelines; however, in cases of identical academic merit, preference is given to scholars from lower economic brackets.",
        },
      ],
      supportingDocs: [
        {
          name: "MoTA NFST Scheme Revised Operational Guidelines (PDF)",
          ref: "Ref: MoTA File No. 11015/01/2023-Sch",
          url: "/scholarships",
        },
        {
          name: "Ministry of Education Revised Fellowship Stipend Order (OM No. 12-2/2023-U1)",
          ref: "Applicable to JRF and SRF Scholars Across Central Schemes",
          url: "/scholarships",
        },
      ],
    },
    {
      q: "What are the qualifying conditions, mandatory income limits, and eligible academic disciplines under the National Overseas Scholarship (NOS) scheme?",
      answerIntro:
        "The National Overseas Scholarship (NOS) facilitates low-income Scheduled Tribe scholars to pursue Master's and Ph.D. degrees abroad in top-ranked international universities, covering actual tuition fees, living allowances, and airfare.",
      points: [
        {
          heading: "Academic Qualifications & Qualifying Marks",
          text: "For Ph.D. programmes abroad: Minimum 55% aggregate marks or equivalent grade in the Master's degree. For Master's programmes abroad: Minimum 55% aggregate marks or equivalent grade in the qualifying Bachelor's degree. Candidates must hold an unconditional admission offer letter from a foreign institution ranked within the top 500 in the latest QS World University Rankings or Times Higher Education (THE) World University Rankings.",
        },
        {
          heading: "Mandatory Family Income Ceiling",
          text: "The total annual family income from all sources (including the applicant, spouse, and parents) must not exceed Rs. 8,00,000/- (Rupees Eight Lakhs only) for the financial year preceding the assessment year. An income certificate issued by a competent executive magistrate or Tehsildar is mandatory.",
        },
        {
          heading: "Age Limit & Slot Allocation",
          text: "Applicants must not exceed 35 years of age as on the first day of the application month. There are 20 total slots annually, with 30% of slots earmarked specifically for eligible female candidates.",
        },
        {
          heading: "Financial Benefits Provided",
          text: "100% of actual tuition fees charged by the foreign university are disbursed directly to the institution. Annual Maintenance Allowance: USD 15,400 for USA and countries other than the UK; GBP 9,900 for the United Kingdom. Contingency allowance, visa fees, actual medical insurance premiums, and economy class airfare from India to the destination country and return upon completion are fully reimbursed.",
        },
      ],
      supportingDocs: [
        {
          name: "National Overseas Scholarship Operational Manual (MoTA Gazette Publication)",
          ref: "Statutory Scheme Guidelines for Scheduled Tribe Scholars Abroad",
          url: "/scholarships",
        },
        {
          name: "Approved List of Foreign Universities (Top 500 QS / THE Rankings)",
          ref: "Mandatory Institutional Criteria for NOS Selection",
          url: "/scholarships",
        },
      ],
    },
    {
      q: "What constitutes a legally valid Scheduled Tribe (ST) Certificate, which authorities are competent to issue it, and how does the portal handle flagged deficiencies?",
      answerIntro:
        "A Scheduled Tribe Certificate is the foundational legal document establishing eligibility under MoTA initiatives. The Ministry enforces strict compliance with Supreme Court directives and Presidential Orders to protect public funds and affirmative action rights.",
      points: [
        {
          heading: "Competent Revenue Issuing Authorities",
          text: "As per Ministry of Home Affairs circulars and the Supreme Court judgment in Kumari Madhuri Patil vs. Additional Commissioner, caste certificates are legally valid ONLY when issued by competent revenue authorities in the applicant's state of ancestral origin, including: (1) District Magistrate / Additional District Magistrate / Collector, (2) Sub-Divisional Magistrate (SDM) / Sub-Divisional Officer (SDO) / Taluka Magistrate, (3) Revenue Assistant or Executive Magistrate. Certificates issued by MLAs, MPs, Gram Panchayat Sarpanches, or private bodies are completely invalid.",
        },
        {
          heading: "Verification Checklist on Certificate",
          text: "The certificate must clearly display: (1) Applicant's full legal name matching their Class 10 records and Aadhaar, (2) Father's/Mother's name, (3) The specific sub-tribe name explicitly recognized in the Presidential Order for that State/UT, (4) Official dispatch/registration number, (5) Date of issuance, and (6) Official seal and signature (or verifiable digital e-District cryptographic QR code).",
        },
        {
          heading: "Deficiency Grace Period Procedure",
          text: "If an upload is flagged during scrutiny (due to faint revenue stamps, incomplete page scans, or minor spelling variations), the portal issues an automated deficiency notice. The scholar receives an SMS alert and email notification granting a 7-day correction window to upload a high-resolution re-scan or e-District certificate without forfeiting their application priority.",
        },
      ],
      supportingDocs: [
        {
          name: "Ministry of Home Affairs Guidelines on Scheduled Tribe Certificate Verification",
          ref: "Circular No. 35/1/72-RU (Competent Revenue Magistrates Framework)",
          url: "/guide",
        },
        {
          name: "Supreme Court Landmark Judgment: Kumari Madhuri Patil vs. Addl. Commissioner",
          ref: "Standard Verification Procedure and Scrutiny Committee Directives",
          url: "/guide",
        },
      ],
    },
    {
      q: "How does the Direct Benefit Transfer (DBT) mechanism operate through the Public Financial Management System (PFMS), and how do scholars ensure bank account seeding?",
      answerIntro:
        "All scholarship and fellowship stipends funded by the Ministry of Tribal Affairs are processed exclusively via Direct Benefit Transfer (DBT) integrated with the Public Financial Management System (PFMS) and the National Payments Corporation of India (NPCI).",
      points: [
        {
          heading: "Zero-Intermediary Electronic Fund Transfer",
          text: "No physical cheques, university intermediaries, or third-party bank drafts are used. Once a sanction order is generated by the Ministry Finance Division, the treasury gateway credits the authorized stipend directly into the scholar's bank account via the Aadhaar Payment Bridge (APB) system.",
        },
        {
          heading: "Mandatory Aadhaar Seeding vs. Bank Account Linking",
          text: "There is a vital distinction between merely 'linking' an Aadhaar card to a bank for KYC and 'seeding' an Aadhaar number with the NPCI mapper for Direct Benefit Transfer. Scholars must visit their bank branch in person and submit the official DBT Mandate Form (Annexure-I) requesting their Core Banking Solutions (CBS) savings account to be mapped as the primary recipient for Government of India DBT credits.",
        },
        {
          heading: "Common Causes of DBT Rejections",
          text: "Payment failures occur if: (1) The account is a minor or joint account, (2) The account has remained dormant or inactive due to non-usage, (3) Daily transaction or credit limits are placed on basic savings accounts (PMJDY), or (4) The bank account name has spelling discrepancies when compared to UIDAI Aadhaar data.",
        },
      ],
      supportingDocs: [
        {
          name: "PFMS Student Direct Benefit Transfer (DBT) Onboarding Guidelines",
          ref: "National Public Financial Management System Integration Protocol",
          url: "/guide",
        },
        {
          name: "NPCI Aadhaar-Seeding Mandate Form & Bank Confirmation Proforma",
          ref: "Mandatory Bank Submission Form for Government DBT Beneficiaries",
          url: "/guide",
        },
      ],
    },
    {
      q: "Can a research scholar receive financial benefits from NFST or NOS while simultaneously drawing another scholarship or fellowship?",
      answerIntro:
        "No. Under General Financial Rules (GFR 2017) and Ministry scheme guidelines, dual availing of central or state government fellowships, stipends, or salaried benefits is strictly prohibited.",
      points: [
        {
          heading: "Non-Duplication Clause",
          text: "An eligible candidate is permitted to apply for multiple schemes (such as NFST, NOS, CSIR-NET JRF, or State Fellowships); however, if selected in more than one scheme, the candidate must choose exactly one fellowship. Under no circumstances can a scholar draw living allowances or stipends from two government sources simultaneously.",
        },
        {
          heading: "Mandatory Relinquishment & Legal Undertaking",
          text: "Before the final sanction order is issued, selected candidates must submit a notarized undertaking on non-judicial stamp paper confirming that they are not drawing any financial assistance, fellowship, or salary from the UGC, CSIR, ICAR, ICMR, state governments, or any public sector undertaking.",
        },
        {
          heading: "Legal Repercussions of Duplicate Drawals",
          text: "Any scholar found drawing dual fellowships is subject to immediate cancellation of their award, blacklisting across all Ministry databases, and recovery of the entire disbursed sum with penal interest under the Public Demands Recovery Act.",
        },
      ],
      supportingDocs: [
        {
          name: "General Financial Rules (GFR 2017) Rule 230 on Fellowship Non-Duplication",
          ref: "Ministry of Finance Directives on Central Sector Educational Schemes",
          url: "/scholarships",
        },
        {
          name: "Standard Non-Availing & Relinquishment Undertaking Proforma (Annexure-IV)",
          ref: "Required Prior to First Disbursal Sanction",
          url: "/guide",
        },
      ],
    },
    {
      q: "What is the procedure for half-yearly progress reviews, academic continuation, and upgrading from JRF to SRF under the NFST fellowship?",
      answerIntro:
        "Fellowship disbursements are performance-linked and require regular academic progress submissions endorsed by the host university or research institution.",
      points: [
        {
          heading: "Half-Yearly Progress Reports (HYPR)",
          text: "Scholars must upload a standardized Half-Yearly Academic Progress Report every six months via the Student Dashboard. The report must contain a summary of research coursework, field studies, seminar presentations, or journal submissions, signed by the Research Guide/Supervisor and countersigned by the Head of Department/Dean of the University.",
        },
        {
          heading: "JRF to SRF Upgradation Assessment",
          text: "Upon completing two full years of research tenure as a Junior Research Fellow (JRF), a formal Three-Member Assessment Committee must be constituted by the university: (1) Head of Department, (2) Research Supervisor, and (3) One External Subject Expert outside the department. The committee conducts a viva-voce examination to evaluate research progress.",
        },
        {
          heading: "Sanction of Enhanced SRF Stipend",
          text: "Upon receipt of the Assessment Committee's recommendation, the Ministry upgrades the scholar to Senior Research Fellow (SRF), increasing the stipend from Rs. 37,000/month to Rs. 42,000/month for the remaining duration (up to a cumulative maximum of 5 years).",
        },
      ],
      supportingDocs: [
        {
          name: "NFST Half-Yearly Progress Report Format (Annexure-II)",
          ref: "Standardized University Verification Proforma",
          url: "/guide",
        },
        {
          name: "Three-Member Assessment Committee Report for JRF to SRF Upgradation (Annexure-III)",
          ref: "Mandatory Document for 3rd Year Stipend Enhancement",
          url: "/guide",
        },
      ],
    },
    {
      q: "What is the exact role of AI in document verification, and does machine learning make final approval or rejection decisions?",
      answerIntro:
        "The AI component in Aarohan is strictly designed as an intelligent pre-verification assistant that supports human oversight, adhering strictly to NITI Aayog's National Strategy for Artificial Intelligence and Ethical Governance standards.",
      points: [
        {
          heading: "Pre-Submission Quality Inspection",
          text: "When an applicant uploads a certificate scan, optical character recognition (OCR) and computer vision models inspect the file for resolution clarity (detecting blurriness, glare, and shadow distortions), verify that official stamps or signatures are not cropped out, and extract key alphanumeric values (such as certificate registration numbers and issue dates).",
        },
        {
          heading: "Proactive Warning Over Rejection",
          text: "The AI alerts the student before final submission if a document appears illegible or if extracted details don't match form entries. This empowers the student to re-scan and fix issues immediately, preventing avoidable desk rejections.",
        },
        {
          heading: "Mandatory Human Oversight",
          text: "The AI system does NOT possess the authority to approve, deny, or disqualify any application. All final administrative actions—including scrutiny approval, issuing formal deficiency queries, or recommending committee selection—are executed exclusively by authorized Ministry Scrutiny Officers who inspect the evidence.",
        },
      ],
      supportingDocs: [
        {
          name: "MoTA AI Scrutiny Protocol & Standard Operating Procedures (SOP 2026)",
          ref: "Operational Manual for Verification & Scrutiny Officers",
          url: "/about",
        },
        {
          name: "National Strategy for AI: Responsible AI for All (NITI Aayog Framework)",
          ref: "Guidelines for Algorithmic Transparency and Human-in-the-Loop Governance",
          url: "/about",
        },
      ],
    },
    {
      q: "How can an applicant or selected scholar escalate a query, report university verification delays, or file a formal grievance?",
      answerIntro:
        "The Ministry of Tribal Affairs provides a multi-channel, time-bound grievance redressal framework designed to ensure that no tribal scholar faces unresolved administrative hurdles.",
      points: [
        {
          heading: "Integrated Portal Grievance Desk",
          text: "Registered applicants can submit an online grievance directly through their Student Dashboard or via the public Contact Us page. Every complaint is assigned a permanent tracking token, categorized under specific heads (e.g., University Verification Delay, PFMS Account Rejection, Deficiency Clarification), and routed to the concerned Desk Officer.",
        },
        {
          heading: "Centralized Public Grievance Portal (CPGRAMS)",
          text: "Scholars may also file grievances through the Central Government CPGRAMS portal (https://pgportal.gov.in) under the Ministry of Tribal Affairs department head. Grievances submitted through CPGRAMS are directly monitored at the Joint Secretary level.",
        },
        {
          heading: "Toll-Free Helpline & Resolution SLA",
          text: "Scholars can contact the National Scholarship Helpdesk at 1800-11-7788 (Monday through Friday, 9:30 AM to 5:30 PM). Under the Ministry's Citizen's Charter, all grievances must be acknowledged within 48 hours and definitively resolved within 15 working days.",
        },
      ],
      supportingDocs: [
        {
          name: "Ministry of Tribal Affairs Citizen's Charter & Grievance Resolution Protocol",
          ref: "Public Service Guarantee & Time-Bound Redressal Standards",
          url: "/contact",
        },
        {
          name: "CPGRAMS National Public Grievance Redressal Portal",
          ref: "Department of Administrative Reforms and Public Grievances (DARPG)",
          url: "/contact",
        },
      ],
    },
  ];

  return (
    <div className="bg-[#FAF8F4] dark:bg-slate-950 min-h-screen py-10 px-4 sm:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/60 text-mota-green dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Official FAQs & Regulatory Guidelines</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            In-depth explanations of Ministry of Tribal Affairs (MoTA) scholarship schemes, statutory eligibility, document verification standards, DBT guidelines, and official regulatory orders.
          </p>
        </div>

        {/* Detailed Accordion List */}
        <div className="space-y-5">
          {detailedFaqs.map((faq, idx) => {
            const isExpanded = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between space-x-4 text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <span className="leading-snug">{faq.q}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-mota-green dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 space-y-5 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {/* Intro */}
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      {faq.answerIntro}
                    </p>

                    {/* Detailed Breakdowns */}
                    <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                      {faq.points.map((pt, pIdx) => (
                        <div key={pIdx} className="space-y-1">
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                            {pt.heading}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {pt.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Supporting Links & Regulatory Documents */}
                    <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700 space-y-2">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        Supporting Documents & Regulatory References
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {faq.supportingDocs.map((doc, dIdx) => (
                          <Link
                            key={dIdx}
                            href={doc.url}
                            className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-mota-navy dark:hover:border-emerald-500 transition-colors flex items-start space-x-2.5 group"
                          >
                            <FileText className="w-4 h-4 text-mota-navy dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-mota-navy dark:group-hover:text-emerald-400 truncate">
                                {doc.name}
                              </p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                {doc.ref}
                              </p>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 flex-shrink-0 mt-0.5" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Helpdesk Bottom Banner */}
        <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Need Additional Guidance or Personalized Clarification?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The MoTA Fellowship & Scholarship Support Desk is available Monday to Friday (9:30 AM to 5:30 PM).
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-mota-navy hover:bg-mota-navy-dark dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5 flex-shrink-0"
          >
            <span>Contact Helpdesk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
