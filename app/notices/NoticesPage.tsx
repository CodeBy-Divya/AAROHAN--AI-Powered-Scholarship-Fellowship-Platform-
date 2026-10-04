"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Bell, 
  FileText, 
  Download, 
  Calendar, 
  Landmark, 
  ArrowRight, 
  ExternalLink,
  Search,
  Filter,
  AlertCircle
} from "lucide-react";

export default function NoticesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const notices = [
    {
      id: "notice-01",
      refNo: "F. No. 11015/02/2026-Sch",
      date: "28 September 2026",
      category: "NFST Fellowship",
      title: "Opening of Online Application Window for National Fellowship for ST Students (NFST) - Academic Cycle 2026-27",
      issuingAuthority: "Scholarship Division, Ministry of Tribal Affairs, Shastri Bhawan, New Delhi",
      summary:
        "The Ministry of Tribal Affairs invites online applications from eligible Scheduled Tribe (ST) candidates pursuing regular full-time Ph.D. degrees in recognized Indian universities for 750 annual fellowship slots. Eligible scholars must submit applications along with valid ST caste certificate, university bonafide certificate, and research registration orders. Last date for online submission: 15 November 2026.",
      attachmentName: "Official Notification No. 11015/02/2026-Sch (PDF)",
      attachmentSize: "284 KB",
      href: "/scholarships",
    },
    {
      id: "notice-02",
      refNo: "F. No. 19012/01/2026-DBT",
      date: "24 September 2026",
      category: "Direct Benefit Transfer",
      title: "Mandatory NPCI Aadhaar-Seeding and Bank Mandate Compliance for Fellowship Stipend Disbursal",
      issuingAuthority: "Direct Benefit Transfer (DBT) Cell, Ministry of Tribal Affairs",
      summary:
        "All candidates applying for MoTA scholarship and fellowship schemes must ensure that their savings bank account is linked and actively seeded with Aadhaar on the NPCI mapper for Direct Benefit Transfer through the Public Financial Management System (PFMS). Failure to seed bank accounts with NPCI will result in automated payment rejections during electronic treasury clearance.",
      attachmentName: "Advisory on NPCI Aadhaar Seeding & Bank Proforma (PDF)",
      attachmentSize: "412 KB",
      href: "/guide",
    },
    {
      id: "notice-03",
      refNo: "F. No. 14013/05/2026-NOS",
      date: "19 September 2026",
      category: "National Overseas Scholarship",
      title: "National Overseas Scholarship (NOS) 2026-27: First Tranche Scrutiny and Deficiency Resolution Notice",
      issuingAuthority: "Overseas Scholarship Section, Ministry of Tribal Affairs",
      summary:
        "Applications received under the first tranche of NOS 2026-27 are currently under active scrutiny by the Screening Desk. Candidates whose documents have been flagged for deficiency (e.g. unreadable revenue stamps or missing unconditional offer letters) are granted a strict 7-day correction window from the date of SMS/portal notification to upload rectified documents.",
      attachmentName: "NOS First Tranche Scrutiny Guidelines & Circular (PDF)",
      attachmentSize: "320 KB",
      href: "/guide",
    },
    {
      id: "notice-04",
      refNo: "F. No. 11016/04/2026-TopClass",
      date: "10 September 2026",
      category: "Top Class Education",
      title: "Updated Directory of Empanelled Institutions under the Scheme of Top Class Education for ST Students (2026-27)",
      issuingAuthority: "Scholarship Division, Ministry of Tribal Affairs",
      summary:
        "The Ministry notifies the revised list of 259 premier notified institutions (including IITs, IIMs, NITs, AIIMS, and National Law Universities) covered under the Top Class Education Scheme for the 2026-27 academic session. Nodal Officers of empanelled institutions are requested to verify student credentials through the institutional verification portal.",
      attachmentName: "List of 259 Empanelled Premier Institutes (PDF)",
      attachmentSize: "590 KB",
      href: "/scholarships",
    },
    {
      id: "notice-05",
      refNo: "F. No. 16011/02/2026-Grievance",
      date: "01 September 2026",
      category: "Grievance Redressal",
      title: "Citizen's Charter Directive on Time-Bound Disposal of Scholarship Inquiries and Grievance Appeals",
      issuingAuthority: "Grievance Redressal Cell, Ministry of Tribal Affairs",
      summary:
        "In accordance with Government of India Citizen's Charter standards, the Ministry mandates that all student inquiries, university verification delays, and grievance appeals filed on the Aarohan portal or CPGRAMS must be acknowledged within 48 hours and definitively disposed of within a maximum turnaround of 15 working days.",
      attachmentName: "Citizen's Charter & Service Level Agreement Circular (PDF)",
      attachmentSize: "198 KB",
      href: "/contact",
    },
  ];

  const categories = [
    { id: "ALL", label: "All Circulars" },
    { id: "NFST Fellowship", label: "NFST Fellowship" },
    { id: "National Overseas Scholarship", label: "NOS Scheme" },
    { id: "Direct Benefit Transfer", label: "DBT & PFMS" },
    { id: "Top Class Education", label: "Top Class Education" },
    { id: "Grievance Redressal", label: "Grievance & Charter" },
  ];

  const filteredNotices = notices.filter(
    (n) => selectedCategory === "ALL" || n.category === selectedCategory
  );

  return (
    <div className="bg-[#FAF8F4] dark:bg-slate-950 min-h-screen py-10 px-4 sm:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800 uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5" />
            <span>Official Gazette & Notifications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Important Notices & Circulars
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Statutory notifications, scheme opening announcements, deadline schedules, and official memorandums issued by the Ministry of Tribal Affairs, Government of India.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
                selectedCategory === cat.id
                  ? "bg-mota-navy dark:bg-emerald-600 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Notices Cards List */}
        <div className="space-y-5">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 text-xs">
                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-mota-green dark:text-emerald-400" />
                  <span>Date: <strong className="text-slate-800 dark:text-slate-200">{notice.date}</strong></span>
                  <span>|</span>
                  <span className="font-mono text-slate-600 dark:text-slate-400">{notice.refNo}</span>
                </div>
                <span className="bg-emerald-50 dark:bg-emerald-950/60 text-mota-green dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-bold px-2.5 py-0.5 rounded text-[11px]">
                  {notice.category}
                </span>
              </div>

              {/* Title & Authority */}
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {notice.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                  <Landmark className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{notice.issuingAuthority}</span>
                </p>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {notice.summary}
              </p>

              {/* Action & Supporting Document */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                  <FileText className="w-4 h-4 text-mota-navy dark:text-emerald-400 flex-shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{notice.attachmentName}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({notice.attachmentSize})</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Link
                    href={notice.href}
                    className="bg-mota-navy hover:bg-mota-navy-dark dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5"
                  >
                    <span>View Scheme Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="text-xs font-bold text-mota-navy dark:text-emerald-400 hover:underline inline-flex items-center space-x-1"
          >
            <span>Return to Homepage</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
