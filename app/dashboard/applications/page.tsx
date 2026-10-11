"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Download, 
  Eye, 
  Plus,
  Printer,
  X,
  ShieldCheck
} from "lucide-react";

export default function ApplicationsPage() {
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [selectedReceiptApp, setSelectedReceiptApp] = useState<any | null>(null);

  const defaultApplications = [
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

  const [applications, setApplications] = useState(defaultApplications);

  useEffect(() => {
    try {
      const storedStr = localStorage.getItem("aarohan_applications");
      if (storedStr) {
        const stored = JSON.parse(storedStr);
        if (Array.isArray(stored) && stored.length > 0) {
          const existingIds = new Set(stored.map((a: { id: string }) => a.id));
          const rest = defaultApplications.filter((a) => !existingIds.has(a.id));
          setApplications([...stored, ...rest]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

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
        {applications.map((app) => (
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
                  onClick={() => setSelectedReceiptApp(app)}
                  className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center space-x-1 font-bold bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800/80 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>View / Print Receipt</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Official Acknowledgement Receipt Modal */}
      {selectedReceiptApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    Official e-Receipt
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                    Application Acknowledgement Receipt
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReceiptApp(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ministry Sub-header */}
            <div className="text-center bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-0.5">
              <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                Ministry of Tribal Affairs - Government of India
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Aarohan Direct Benefit Transfer (DBT) Scholarship Management Portal
              </p>
            </div>

            {/* Receipt Summary Grid */}
            <div className="space-y-2 text-xs divide-y divide-slate-100 dark:divide-slate-800">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Application Number:</span>
                <span className="font-mono font-bold text-[#0B2545] dark:text-emerald-400 text-sm">
                  {selectedReceiptApp.id}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Target Scheme:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-right max-w-[300px]">
                  {selectedReceiptApp.scheme}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Institution:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300 text-right max-w-[300px]">
                  {selectedReceiptApp.institution}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Submission Date:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {selectedReceiptApp.dateSubmitted}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Scrutiny Stage:</span>
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  {selectedReceiptApp.currentStage}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Financial Sanction Rate:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  {selectedReceiptApp.stipend}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedReceiptApp(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-[#0B2545] hover:bg-[#0D315D] text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-xs transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
