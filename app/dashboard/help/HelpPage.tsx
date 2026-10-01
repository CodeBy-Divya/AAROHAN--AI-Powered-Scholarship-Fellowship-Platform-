"use client";

import React from "react";
import Link from "next/link";
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  Landmark, 
  FileText, 
  Download, 
  ExternalLink,
  BookOpen,
  ShieldCheck
} from "lucide-react";

export default function HelpPage() {
  const documents = [
    {
      name: "NFST Scheme Operational Guidelines & Norms (PDF)",
      size: "1.2 MB",
      desc: "Comprehensive manual on eligibility, stipend revisions, HRA calculations, and tenure rules.",
      href: "/scholarships",
    },
    {
      name: "National Overseas Scholarship (NOS) Selection Rules (PDF)",
      size: "890 KB",
      desc: "Guidelines regarding top 500 QS global universities, income thresholds, and tuition reimbursements.",
      href: "/scholarships",
    },
    {
      name: "Standard Aadhaar-Seeding Bank Mandate Form (PDF)",
      size: "245 KB",
      desc: "Official bank proforma for submitting to your branch to link account with NPCI mapper.",
      href: "/guide",
    },
    {
      name: "Half-Yearly Progress Report Format (Annexure-II)",
      size: "180 KB",
      desc: "Mandatory university verification proforma required for 6-monthly stipend continuation.",
      href: "/guide",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            Support Desk &amp; Documentation
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1.5">
            Help, Guidelines &amp; Scheme About
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Access statutory scheme manuals, downloadable proformas, and national toll-free support helplines.
          </p>
        </div>
      </div>

      {/* Contact Support Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">National Toll-Free Helpline</h3>
          <p className="text-base font-black text-emerald-700 dark:text-emerald-400">1800-11-7788</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Mon - Fri, 9:30 AM - 5:30 PM</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">Scholarship Support Email</h3>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 break-all">helpdesk-tribalscholar@gov.in</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Guaranteed 48-Hour Response SLA</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-400 flex items-center justify-center">
            <Landmark className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">Ministry Headquarters</h3>
          <p className="text-xs text-slate-800 dark:text-slate-200">Shastri Bhawan, New Delhi</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Scholarship &amp; Fellowship Section</p>
        </div>
      </div>

      {/* Official Guidelines & Proforma Downloads */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <FileText className="w-4 h-4 text-emerald-600" />
          <span>Downloadable Statutory Manuals &amp; Annexures</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {doc.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">
                    {doc.size}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {doc.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                <Link
                  href={doc.href}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center space-x-1"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <button
                  type="button"
                  onClick={() => alert(`Downloading ${doc.name}`)}
                  className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center space-x-1 text-xs font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
