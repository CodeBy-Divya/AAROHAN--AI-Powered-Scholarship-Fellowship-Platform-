"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Download, 
  Eye, 
  Plus
} from "lucide-react";

export default function DashboardApplicationsPage() {
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const myApplications = [
    {
      id: "NFST-2026-8821",
      scheme: "National Fellowship for Scheduled Tribes (NFST)",
      type: "Ph.D. Research Fellowship",
      institution: "Central University of Jharkhand, Ranchi",
      dateSubmitted: "15 September 2026",
      status: "Under Scrutiny",
      statusBadge: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300",
      actionRequired: "Upload fresh scan of ST Certificate (faint revenue seal)",
      stipend: "Rs. 37,000/mo (JRF) + HRA",
      currentStage: "Stage 3 of 5: Desk Officer Scrutiny",
    },
    {
      id: "NOS-2026-4412",
      scheme: "National Overseas Scholarship (NOS)",
      type: "Masters in Data Science",
      institution: "University College London (UCL), United Kingdom",
      dateSubmitted: "10 August 2026",
      status: "Screening Passed",
      statusBadge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300",
      actionRequired: "None (Awaiting Final Central Committee Selection List)",
      stipend: "100% Tuition Fees + GBP 9,900/year",
      currentStage: "Stage 4 of 5: Committee Selection",
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            My Scholarship Applications
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track and manage your submitted scholarship applications, review action items, and download sanction letters.
          </p>
        </div>
        <Link
          href="/dashboard/scholarships"
          className="bg-[#0B2545] hover:bg-[#0D315D] dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for New Scheme</span>
        </Link>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {myApplications.map((app) => (
          <div
            key={app.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:shadow-md transition-shadow space-y-4"
          >
            {/* Top row */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-black text-[#0B2545] dark:text-emerald-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                  {app.id}
                </span>
                <span className="text-xs text-slate-400">|</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Submitted on: <strong>{app.dateSubmitted}</strong>
                </span>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${app.statusBadge}`}>
                {app.status}
              </span>
            </div>

            {/* Scheme Title & Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {app.scheme}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {app.type} - {app.institution}
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold pt-1">
                  Stipend Benefit: {app.stipend}
                </p>
              </div>

              {/* Progress Box */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Current Stage
                </span>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {app.currentStage}
                </p>
              </div>
            </div>

            {/* Action Alert if deficiency exists */}
            {app.actionRequired.includes("Upload") ? (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start justify-between gap-3">
                <div className="flex items-start space-x-2 text-amber-900 dark:text-amber-300 text-xs">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <span className="font-bold">Next Action Required: </span>
                    <span>{app.actionRequired}</span>
                  </div>
                </div>
                <Link
                  href="/dashboard/status"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3 py-1 rounded-lg transition-colors flex-shrink-0"
                >
                  Resolve Now
                </Link>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>All documents verified with high confidence score. No action pending from your side.</span>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <Link
                href="/dashboard/status"
                className="font-bold text-[#0B2545] dark:text-emerald-400 hover:underline flex items-center space-x-1"
              >
                <span>View Full Scrutiny Timeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => alert(`Downloading formal acknowledgement receipt for ${app.id}`)}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center space-x-1 font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Receipt</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
