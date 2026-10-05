"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { DEMO_APPLICATIONS, ApplicationRecord } from "@/lib/data";
import { 
  ShieldCheck, 
  Search, 
  Check, 
  X, 
  Eye, 
  SlidersHorizontal,
  Sparkles,
  AlertCircle,
  FileText
} from "lucide-react";

export default function OfficerDashboardPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<ApplicationRecord[]>(DEMO_APPLICATIONS);
  const [selectedSchemeFilter, setSelectedSchemeFilter] = useState<string>("ALL");
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Review drawer/modal state
  const [activeReviewApp, setActiveReviewApp] = useState<ApplicationRecord | null>(null);
  const [deficiencyFeedback, setDeficiencyFeedback] = useState<string>("");
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Filter applications
  const filteredApps = applications.filter((app) => {
    const matchesScheme = selectedSchemeFilter === "ALL" || app.schemeCode === selectedSchemeFilter;
    const matchesStage = selectedStageFilter === "ALL" || app.stage === selectedStageFilter;
    const matchesQuery = 
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tribe.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesScheme && matchesStage && matchesQuery;
  });

  const handleOpenReview = (app: ApplicationRecord) => {
    setActiveReviewApp(app);
    setDeficiencyFeedback(app.deficiencyNote || "");
    setActionNotice(null);
  };

  const handleApproveApplication = () => {
    if (!activeReviewApp) return;
    setApplications((prev) =>
      prev.map((a) =>
        a.id === activeReviewApp.id
          ? { ...a, stage: "Eligibility Verification", stageStep: 3, deficiencyCount: 0 }
          : a
      )
    );
    setActionNotice(`Application ${activeReviewApp.applicationNumber} approved and forwarded to Eligibility Stage.`);
    setTimeout(() => {
      setActiveReviewApp(null);
    }, 1500);
  };

  const handleSendDeficiency = () => {
    if (!activeReviewApp) return;
    setApplications((prev) =>
      prev.map((a) =>
        a.id === activeReviewApp.id
          ? { ...a, stage: "Deficient", deficiencyCount: (a.deficiencyCount || 0) + 1, deficiencyNote: deficiencyFeedback }
          : a
      )
    );
    setActionNotice(`Deficiency notice transmitted to student ${activeReviewApp.studentName}.`);
    setTimeout(() => {
      setActiveReviewApp(null);
    }, 1500);
  };

  return (
    <div className="bg-[#FAF8F4] dark:bg-slate-950 min-h-[calc(100vh-140px)] py-8 px-4 sm:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Officer Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-mota-navy text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Scrutiny and Verification Console
                </h1>
                <span className="bg-blue-100 text-blue-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-300">
                  Level-1 Verification Officer
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                {user ? user.name : "Dr. Arvind Meena"} - Senior Scrutiny Officer, Fellowship Division
              </p>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                Officer ID: <strong>{user?.id || "OFF-MOTA-552"}</strong> - Ministry of Tribal Affairs, New Delhi
              </p>
            </div>
          </div>

          {/* Quick stats pills */}
          <div className="flex items-center space-x-3 text-xs">
            <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-center">
              <span className="block text-base font-black text-amber-900">14</span>
              <span className="text-[10px] text-amber-800 font-semibold">Pending Scrutiny</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-center">
              <span className="block text-base font-black text-emerald-900">38</span>
              <span className="text-[10px] text-emerald-800 font-semibold">Verified Today</span>
            </div>
          </div>
        </div>

        {/* Actionable Scrutiny Queue */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Controls Bar: Filters & Search */}
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Scheme filter */}
              <div className="flex items-center space-x-1.5 text-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-semibold text-slate-700">Scheme:</span>
                <select
                  value={selectedSchemeFilter}
                  onChange={(e) => setSelectedSchemeFilter(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-mota-navy"
                >
                  <option value="ALL">All Schemes</option>
                  <option value="NFST">NFST (National Fellowship)</option>
                  <option value="NOS">NOS (Overseas Scholarship)</option>
                  <option value="TOPCLASS">Top Class Education</option>
                </select>
              </div>

              {/* Stage filter */}
              <div className="flex items-center space-x-1.5 text-xs">
                <span className="font-semibold text-slate-700">Stage:</span>
                <select
                  value={selectedStageFilter}
                  onChange={(e) => setSelectedStageFilter(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-mota-navy"
                >
                  <option value="ALL">All Stages</option>
                  <option value="Document Scrutiny">Document Scrutiny</option>
                  <option value="Eligibility Verification">Eligibility Verification</option>
                  <option value="Merit Screening">Merit Screening</option>
                  <option value="Deficient">Flagged Deficient</option>
                  <option value="Sanctioned">Sanctioned</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search scholar name, ID, tribe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-mota-navy"
              />
            </div>
          </div>

          {/* Applications Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-3 px-4">Applicant & Community</th>
                  <th className="py-3 px-4">Scheme & Application No.</th>
                  <th className="py-3 px-4">AI Confidence</th>
                  <th className="py-3 px-4">Readiness</th>
                  <th className="py-3 px-4">Current Stage</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{app.studentName}</div>
                      <div className="text-[11px] text-slate-500">{app.tribe} - {app.state}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-mota-navy">{app.schemeCode}</span>
                      <div className="text-[11px] font-mono text-slate-500">{app.applicationNumber}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-1.5">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                            app.aiConfidence >= 90
                              ? "bg-emerald-100 text-emerald-800"
                              : app.aiConfidence >= 75
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {app.aiConfidence}% AI Score
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {app.aiConfidence >= 90 ? "High Fidelity OCR" : "Human Review Recommended"}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {app.readinessScore}%
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          app.stage === "Sanctioned"
                            ? "bg-emerald-100 text-emerald-800"
                            : app.stage === "Deficient"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        <span>{app.stage}</span>
                      </span>
                      {app.deficiencyCount > 0 && (
                        <div className="text-[10px] text-amber-700 font-semibold mt-0.5">
                          {app.deficiencyCount} deficiency flagged
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenReview(app)}
                        className="bg-mota-navy hover:bg-mota-navy-dark text-white font-bold text-[11px] px-3.5 py-1.5 rounded-lg transition-colors flex items-center space-x-1 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Scrutinize</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Split-View Document Scrutiny Console Modal */}
      {activeReviewApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="bg-mota-navy text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-base font-bold">
                    Multi-Level Verification Desk: {activeReviewApp.studentName}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {activeReviewApp.schemeName} - App No: {activeReviewApp.applicationNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveReviewApp(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notification alert if action taken */}
            {actionNotice && (
              <div className="bg-emerald-600 text-white text-xs font-bold p-3 text-center">
                {actionNotice}
              </div>
            )}

            {/* Split Screen Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              {/* Left Column (6 cols): Document Evidence & Simulated OCR Preview */}
              <div className="md:col-span-6 p-5 bg-slate-50 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Uploaded Document Scan & AI Bounding Boxes
                  </h4>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                    Page 1 of 1
                  </span>
                </div>

                {/* Simulated Document Preview Card */}
                <div className="bg-white border-2 border-slate-300 rounded-xl p-5 shadow-xs relative font-serif text-[11px] leading-relaxed text-slate-800 space-y-3">
                  <div className="text-center border-b border-slate-200 pb-2">
                    <p className="font-bold uppercase tracking-wider text-slate-900 text-xs">
                      GOVERNMENT OF JHARKHAND
                    </p>
                    <p className="text-[10px] text-slate-500">
                      OFFICE OF THE SUB-DIVISIONAL OFFICER, RANCHI
                    </p>
                    <p className="font-bold text-xs mt-1 text-slate-900">
                      SCHEDULED TRIBE CASTE CERTIFICATE
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p>
                      This is to certify that Kum.{" "}
                      <span className="bg-emerald-100 text-emerald-950 font-bold px-1.5 py-0.5 rounded border border-emerald-400">
                        Pooja Xalxo
                      </span>{" "}
                      daughter of Shri Ramu Xalxo, resident of Village Sukurhuttu, District Ranchi in the State of Jharkhand belongs to the{" "}
                      <span className="bg-emerald-100 text-emerald-950 font-bold px-1.5 py-0.5 rounded border border-emerald-400">
                        Oraon Community
                      </span>{" "}
                      which is recognized as a Scheduled Tribe under the Constitution (Scheduled Tribes) Order, 1950.
                    </p>
                    <p>
                      Certificate No: <strong className="font-mono">JH/RNC/ST/2021/8821</strong>
                    </p>
                    <p>
                      Date of Issue: <strong>14/06/2021</strong>
                    </p>
                  </div>

                  <div className="pt-4 flex justify-between items-end border-t border-slate-200">
                    <div className="text-[9px] text-slate-500 font-mono">
                      DigiLocker Verified: URI: in.gov.jh.edistrict.8821
                    </div>
                    <div className="text-right">
                      <div className="w-16 h-8 border border-dashed border-emerald-500 bg-emerald-50 text-[9px] text-emerald-800 flex items-center justify-center font-sans font-bold">
                        Digital Seal
                      </div>
                      <span className="text-[9px] text-slate-500">Sub-Divisional Officer</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
                  <div className="font-bold flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>AI OCR Confidence Breakdown:</span>
                  </div>
                  <p className="text-[11px] text-blue-800">
                    - Candidate Name: 99.1% match with profile record.<br />
                    - Tribe Name (Oraon): Matches Approved Central MoTA ST Gazette.<br />
                    - Issuing Authority: SDO Ranchi (Authorized Competent Level).
                  </p>
                </div>
              </div>

              {/* Right Column (6 cols): Verification Checklist & Decision Controls */}
              <div className="md:col-span-6 p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Officer Verification & Decision Desk
                </h4>

                {/* Validation checklist */}
                <div className="space-y-2 text-xs">
                  <label className="flex items-center space-x-2.5 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-700" />
                    <span>ST Certificate verified against Central Gazette list</span>
                  </label>
                  <label className="flex items-center space-x-2.5 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-700" />
                    <span>Ph.D. full-time regular admission confirmed by University</span>
                  </label>
                  <label className="flex items-center space-x-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                    <input type="checkbox" className="rounded text-mota-navy" />
                    <span>Income criteria &lt; Rs. 6.0L verified or exempted under NFST norms</span>
                  </label>
                </div>

                {/* Deficiency feedback textarea */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Deficiency Note / Officer Remarks (Sent directly to applicant)
                  </label>
                  <textarea
                    rows={3}
                    value={deficiencyFeedback}
                    onChange={(e) => setDeficiencyFeedback(e.target.value)}
                    placeholder="Enter plain-language instructions to the student if asking for document re-upload or clarification..."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-3">
                  <button
                    onClick={handleSendDeficiency}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Flag Deficiency to Student</span>
                  </button>

                  <button
                    onClick={handleApproveApplication}
                    className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve & Next Stage</span>
                  </button>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 text-center font-mono">
                  Audit Log: Officer actions are permanently signed with Timestamp and IP.
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
