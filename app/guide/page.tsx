"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  UserCheck,
  GraduationCap,
  Landmark,
  FileCheck,
  Sparkles
} from "lucide-react";

export default function GuidePage() {
  const timelineStages = [
    {
      step: 1,
      title: "Online Registration & Submission",
      description: "Applicant registers with Aadhaar OTP e-KYC, fills academic and personal details, and uploads mandatory supporting certificates.",
      statusBadge: "Submitted",
      role: "Applicant Action",
      duration: "Immediate upon submit",
    },
    {
      step: 2,
      title: "AI-Assisted Pre-Verification",
      description: "Intelligent OCR and quality checks inspect uploaded files for blurriness, missing seals, certificate validity, and name consistency.",
      statusBadge: "AI Verified",
      role: "System Automation",
      duration: "Within 2-5 minutes",
    },
    {
      step: 3,
      title: "Official Scrutiny & Deficiency Handling",
      description: "MoTA Scrutiny Officers inspect credentials. If discrepancies exist, a deficiency query is issued with a 7-day correction window.",
      statusBadge: "Under Scrutiny",
      role: "Scrutiny Officer",
      duration: "3 - 7 working days",
    },
    {
      step: 4,
      title: "Screening & Committee Selection",
      description: "Applications meeting all scheme guidelines are evaluated by the Central Selection Committee based on merit and quota guidelines.",
      statusBadge: "Committee Selection",
      role: "Selection Committee",
      duration: "As per scheme schedule",
    },
    {
      step: 5,
      title: "Sanction Order & Direct Benefit Transfer",
      description: "Sanction letters are issued digitally. Stipend and allowances are disbursed directly into Aadhaar-seeded bank accounts via PFMS.",
      statusBadge: "Awarded & Disbursed",
      role: "Ministry Finance Division",
      duration: "Monthly / Tranche-wise",
    },
  ];

  const documentChecklist = [
    {
      title: "Scheduled Tribe (ST) Caste Certificate",
      authority: "Sub-Divisional Magistrate (SDM) / SDO / District Magistrate",
      format: "PDF (Max 2MB)",
      notes: "Must clearly display candidate name, father's name, community tribe, state, and official revenue seal with digital or physical signature.",
      requiredFor: "All Schemes (NFST, NOS, Top Class)",
    },
    {
      title: "Annual Family Income Certificate",
      authority: "Competent Revenue Authority / Tehsildar / Form-16 / ITR",
      format: "PDF (Max 2MB)",
      notes: "Issued for the current financial year. Mandatory for schemes with income ceilings (NOS <= Rs. 8.00 Lakhs; Top Class <= Rs. 6.00 Lakhs).",
      requiredFor: "NOS, Top Class, Post-Matric",
    },
    {
      title: "Institution Admission Proof & Bonafide Certificate",
      authority: "Registrar / Dean / Head of Institution (India or Abroad)",
      format: "PDF (Max 3MB)",
      notes: "Proof of confirmed admission to full-time regular M.Phil, Ph.D., Master's, or Under-Graduate degree in an accredited institution.",
      requiredFor: "NFST (Ph.D.), NOS (Abroad Masters/Ph.D.)",
    },
    {
      title: "Academic Marksheets & Degree Certificates",
      authority: "Recognized Board / University / Degree Awarding Body",
      format: "PDF (Max 5MB)",
      notes: "Class 10th (for DOB proof), 12th, Bachelor's and Master's degree marksheets. NOS requires minimum 55% qualifying marks.",
      requiredFor: "All Schemes",
    },
    {
      title: "Aadhaar Card & Bank Mandate (DBT Seeded)",
      authority: "UIDAI & Core Banking Branch",
      format: "PDF (Max 1MB)",
      notes: "Bank account must be in the applicant's name and seeded with NPCI / Aadhaar for Direct Benefit Transfer under PFMS.",
      requiredFor: "Mandatory for all disbursements",
    },
    {
      title: "Valid Passport & Visa / Offer Letter (NOS Only)",
      authority: "Ministry of External Affairs / Host University",
      format: "PDF (Max 3MB)",
      notes: "For National Overseas Scholarship candidates, unconditional offer letter from top 500 QS/THE ranked global universities.",
      requiredFor: "NOS Applicants Only",
    },
  ];

  const personalInfoChecklist = [
    {
      label: "Full Legal Name",
      details: "Must strictly match the spelling in your ST Certificate, Aadhaar card, and Class 10 marksheet.",
    },
    {
      label: "Date of Birth (DOB)",
      details: "As recorded in the secondary school board examination certificate or birth certificate.",
    },
    {
      label: "Aadhaar Number",
      details: "Used for e-KYC verification and direct linking with the Public Financial Management System (PFMS).",
    },
    {
      label: "Active Mobile Number & Email ID",
      details: "SMS alerts and automated notifications regarding deficiency windows and sanction letters are dispatched here.",
    },
    {
      label: "Tribal Community & Sub-Tribe Name",
      details: "Must be listed in the Presidential Order for the specified state of domicile.",
    },
    {
      label: "Bank Account Details",
      details: "Account number, IFSC code, and branch name. Must be active and enabled for DBT transfers.",
    },
  ];

  return (
    <div className="bg-[#FAF8F4] dark:bg-slate-950 min-h-screen py-10 px-4 sm:px-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/60 text-mota-green dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Applicant Guide & Workflow</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Eligibility & Application Process Guide
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Everything you need to know about preparing your application, document requirements, eligibility criteria, and tracking your status through each scrutiny milestone.
          </p>
        </div>

        {/* Section: How It Works & Eligibility */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Eligibility & How It Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              General guidelines and qualifying conditions for Ministry of Tribal Affairs higher education initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-mota-navy dark:text-blue-400 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Category Eligibility</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Candidates must belong to the Scheduled Tribe (ST) category recognized in the State/UT of their origin. A valid ST certificate issued by an authorized revenue magistrate is mandatory.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-mota-green dark:text-emerald-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Academic Qualification</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                For NFST: Admission to regular full-time Ph.D. in recognized Indian universities (UGC/AICTE/Centrally Funded). For NOS: Confirmed admission to Master&apos;s or Ph.D. in top 500 global institutions.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">3. Income & Non-Duplication</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Income guidelines apply as per specific scheme rules (e.g. NOS ceiling of Rs. 8 Lakh/annum). Scholars cannot simultaneously hold another Central Government or UGC scholarship.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Application Lifecycle & Status Timeline */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Application Status Timeline & Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Understand each milestone an application traverses from initial submission to final DBT award.
            </p>
          </div>

          {/* Timeline with circles accurately centered on the vertical line */}
          <div className="relative border-l-2 border-slate-300 dark:border-slate-700 ml-5 sm:ml-6 space-y-8 pb-2">
            {timelineStages.map((stage) => (
              <div key={stage.step} className="relative pl-7 sm:pl-9">
                {/* Dot Marker exactly centered on the 2px line (-left-[17px] centers a 32px circle) */}
                <div className="absolute -left-[17px] top-4 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-mota-navy dark:border-emerald-400 flex items-center justify-center text-xs font-bold text-mota-navy dark:text-emerald-400 shadow-xs z-10">
                  {stage.step}
                </div>

                {/* Card Content */}
                <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Stage {stage.step} : {stage.role}
                    </span>
                    <span className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-full">
                      Status: {stage.statusBadge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {stage.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {stage.description}
                  </p>

                  <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-mota-green dark:text-emerald-400" />
                    <span>Expected Timeline: {stage.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Required Personal Information & Documents */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              What Documents & Personal Information Are Required
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Prepare these verified details and legible PDF files before initiating your application.
            </p>
          </div>

          {/* Personal Information Grid */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-mota-green dark:text-emerald-400" />
              <span>Personal Information Required at Registration</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {personalInfoChecklist.map((info, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {info.label}
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {info.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Documents Checklist */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-mota-navy dark:text-emerald-400" />
              <span>Mandatory Supporting Documents</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentChecklist.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {doc.title}
                    </h4>
                    <span className="text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-mota-green dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
                      {doc.format}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <p><strong className="text-slate-700 dark:text-slate-300">Issuing Authority:</strong> {doc.authority}</p>
                    <p><strong className="text-slate-700 dark:text-slate-300">Applicable To:</strong> {doc.requiredFor}</p>
                    <p className="text-slate-500 dark:text-slate-400 pt-1 leading-relaxed">{doc.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Quality Tips for AI Verification */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-5 rounded-2xl flex items-start space-x-3.5">
            <Sparkles className="w-5 h-5 text-mota-green dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white">
                Tips for Swift AI-Assisted Document Verification
              </h4>
              <p>
                Our automated OCR engine scans certificates upon upload. To avoid deficiency notices, ensure documents are flat, scanned at 300 DPI, without blurriness, finger shadows, or cutoff edges. Revenue seals and registration numbers must remain fully legible.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Bar */}
        <div className="bg-mota-navy dark:bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">Ready to Start Your Application?</h3>
            <p className="text-xs text-slate-300">
              Browse scheme eligibility criteria or log into your student account to begin.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/scholarships"
              className="bg-white hover:bg-slate-100 text-mota-navy font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
            >
              Explore Scholarships
            </Link>
            <Link
              href="/login"
              className="bg-mota-green hover:bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
            >
              Login / Register
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
