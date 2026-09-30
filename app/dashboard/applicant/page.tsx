"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { DEMO_APPLICATIONS } from "@/lib/data";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Upload, 
  FileText, 
  Sparkles, 
  ArrowUpRight, 
  HelpCircle, 
  RefreshCw,
  Eye,
  ShieldCheck,
  Check,
  X
} from "lucide-react";

export default function ApplicantDashboard() {
  const { user } = useAuth();
  const [readinessScore, setReadinessScore] = useState(86);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocToFix, setSelectedDocToFix] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Active student application
  const activeApp = DEMO_APPLICATIONS[0]; // Pooja Xalxo's NFST application

  const handleFixDocument = (docName: string) => {
    setSelectedDocToFix(docName);
    setShowUploadModal(true);
    setUploadSuccess(false);
  };

  const handleSimulateReupload = () => {
    setTimeout(() => {
      setUploadSuccess(true);
      setReadinessScore(96);
      setTimeout(() => {
        setShowUploadModal(false);
      }, 1800);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-2xl font-bold shadow-md">
              {user ? user.name.charAt(0) : "P"}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Welcome back, {user ? user.name : "Pooja Xalxo"}
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                  ST Scholar
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                {user?.course || "Ph.D. in Environmental Sciences & Tribal Ecology"} - {user?.institution || "Central University of Jharkhand"}
              </p>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                MoTA Applicant ID: <strong>{user?.id || "USR-ST-2026-904"}</strong> - Domicile: <strong>{user?.state || "Jharkhand"}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:self-center">
            <Link
              href="/#schemes"
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5"
            >
              <span>Explore Other Schemes</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Priority "Your Next Step" Action Card */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white border-2 border-amber-400 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">
                  Action Required to Expedite Scrutiny
                </span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.2 rounded">
                  7 Days Remaining
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Clarification requested on Family Income Certificate
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                The Revenue Officer&apos;s seal on your uploaded income certificate is partially blurred. Please re-upload a clean, high-resolution scan to raise your readiness score to 100%.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleFixDocument("Income Certificate")}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-sm flex items-center space-x-2 flex-shrink-0"
          >
            <Upload className="w-4 h-4" />
            <span>Fix Document Now</span>
          </button>
        </div>

        {/* Grid: Application Health & Active Scheme Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (8 cols): Active Application & Progress Timeline */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Active Application Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    Active Application
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">
                    {activeApp.schemeName} ({activeApp.schemeCode})
                  </h2>
                  <p className="text-xs text-slate-500 font-mono">
                    App No: <strong>{activeApp.applicationNumber}</strong> - Submitted: {activeApp.submittedAt}
                  </p>
                </div>

                <span className="bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Stage: {activeApp.stage}</span>
                </span>
              </div>

              {/* 5-Stage Visual Progress Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Verification Lifecycle Tracker
                </h4>
                
                <div className="grid grid-cols-5 gap-2 relative">
                  {[
                    { step: 1, label: "Submission", status: "completed", date: "24 Sep 2026" },
                    { step: 2, label: "Doc Scrutiny", status: "in-progress", date: "In Scrutiny" },
                    { step: 3, label: "Eligibility", status: "pending", date: "Pending" },
                    { step: 4, label: "Merit Screen", status: "pending", date: "Pending" },
                    { step: 5, label: "Sanction", status: "pending", date: "Award" },
                  ].map((s) => (
                    <div key={s.step} className="flex flex-col items-center text-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          s.status === "completed"
                            ? "bg-emerald-600 text-white shadow-xs"
                            : s.status === "in-progress"
                            ? "bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse"
                            : "bg-slate-100 text-slate-400 border border-slate-200"
                        }`}
                      >
                        {s.status === "completed" ? <Check className="w-4 h-4" /> : s.step}
                      </div>
                      <span className="text-[11px] font-bold text-slate-800 mt-2 leading-tight">
                        {s.label}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">{s.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Stage Description Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs space-y-1.5">
                <div className="flex items-center space-x-2 font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-mota-navy" />
                  <span>Current Stage: Level-1 Document Scrutiny</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Your application is currently being scrutinized by the MoTA Fellowship Division desk. AI pre-checks verified your ST Certificate (Oraon tribe) and M.Sc. Marksheet with 94% confidence. Human officer review of the clarified income certificate is awaited.
                </p>
              </div>
            </div>

            {/* Document Vault & Checklist */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Application Document Vault
                  </h3>
                  <p className="text-xs text-slate-500">
                    Scheme-required documentation and real-time AI validation status
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  4 of 5 Verified
                </span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {/* Doc 1: ST Caste Certificate */}
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-900">ST Caste Certificate</p>
                      <p className="text-[11px] text-slate-500">
                        Cert No: JH/RNC/ST/2021/8821 - SDO Ranchi - Verified via DigiLocker
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[11px] flex items-center space-x-1 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                    <button className="text-slate-400 hover:text-slate-700">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Doc 2: Family Income Certificate */}
                <div className="py-3 flex items-center justify-between bg-amber-50/50 -mx-2 px-2 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="font-bold text-slate-900 flex items-center gap-1.5">
                        Family Income Certificate
                        <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.2 rounded">
                          Deficiency Flagged
                        </span>
                      </p>
                      <p className="text-[11px] text-amber-800">
                        AI Quality Check: Seal contrast faint (64% confidence). Requires clear rescan.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleFixDocument("Income Certificate")}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-2.5 py-1 rounded text-[11px] transition-colors"
                    >
                      Rescan / Fix
                    </button>
                  </div>
                </div>

                {/* Doc 3: Ph.D. Admission Letter */}
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-900">Ph.D. Admission / Enrolment Letter</p>
                      <p className="text-[11px] text-slate-500">
                        Central University of Jharkhand - Reg: CUJ/PhD/ENV/2026/012
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[11px] flex items-center space-x-1 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                    <button className="text-slate-400 hover:text-slate-700">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Doc 4: PG Consolidated Marksheet */}
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-900">M.Sc. Consolidated Marksheet</p>
                      <p className="text-[11px] text-slate-500">
                        Score: 78.4% (First Class with Distinction) - Min criteria: 55%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[11px] flex items-center space-x-1 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                    <button className="text-slate-400 hover:text-slate-700">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Doc 5: Bank Account & Aadhaar DBT */}
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-900">Aadhaar Linked Bank Mandate (DBT)</p>
                      <p className="text-[11px] text-slate-500">
                        State Bank of India - A/c ending 4019 - NPCI Aadhaar Seeding: ACTIVE
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[11px] flex items-center space-x-1 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                    <button className="text-slate-400 hover:text-slate-700">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Readiness Gauge & Assistance */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* AI Application Readiness Gauge */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 text-center">
              <div className="flex items-center justify-between text-left">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Application Readiness
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Estimated probability of zero-deficiency approval
                  </p>
                </div>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>

              {/* Circular Gauge Representation */}
              <div className="py-4">
                <div className="relative inline-flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-8 border-slate-100 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-3xl font-black text-slate-900">
                        {readinessScore}%
                      </span>
                      <span className="block text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                        {readinessScore >= 90 ? "Excellent" : "Good"}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  {readinessScore >= 95
                    ? "All documents verified with high confidence."
                    : "1 actionable item remaining to achieve 100% readiness"}
                </p>
              </div>

              {/* Checklist breakdown */}
              <div className="text-left space-y-2 text-xs border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ST Community Verification</span>
                  </span>
                  <span className="font-bold text-emerald-700">Passed</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Academic Qualification &gt; 55%</span>
                  </span>
                  <span className="font-bold text-emerald-700">Passed</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span className="flex items-center space-x-1.5">
                    {readinessScore >= 95 ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    )}
                    <span>Income Certificate Clarity</span>
                  </span>
                  <span className={`font-bold ${readinessScore >= 95 ? "text-emerald-700" : "text-amber-600"}`}>
                    {readinessScore >= 95 ? "Verified" : "Needs Re-scan"}
                  </span>
                </div>
              </div>
            </div>

            {/* Scheme Helpline Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Need Help or Clarification?
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Have a doubt regarding document guidelines or fellowship disbursals? Connect with the MoTA Fellowship Desk.
              </p>
              <div className="pt-1">
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded-lg transition-colors">
                  Lodge Grievance / Query
                </button>
              </div>
            </div>

          </div>
        </div>

      {/* Fix Document Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Rescan / Replace {selectedDocToFix}
                </h3>
                <p className="text-[11px] text-slate-500">
                  AI will analyze seal sharpness and text legibility immediately
                </p>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {uploadSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6 text-emerald-700" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Document Verified Successfully
                </h4>
                <p className="text-xs text-slate-600">
                  Issuing authority seal detected with 98% confidence. Your readiness score is updated to 96%.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center space-y-2 hover:border-emerald-500 cursor-pointer transition-colors bg-slate-50">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">
                    Click to select file or take phone photo
                  </p>
                  <p className="text-[11px] text-slate-400">
                    PDF, JPG, PNG up to 5 MB (Auto-deskew & compression enabled)
                  </p>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900">
                  <strong>Tip:</strong> Ensure the Tehsildar/Revenue Officer&apos;s circular seal and registration number are clearly visible without camera flash glare.
                </div>

                <button
                  onClick={handleSimulateReupload}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Run AI Verification & Update</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
