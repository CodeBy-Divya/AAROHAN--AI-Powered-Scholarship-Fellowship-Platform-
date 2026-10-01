"use client";

import React, { useState } from "react";
import { 
  AlertCircle, 
  Send, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Search,
  ShieldCheck,
  PhoneCall
} from "lucide-react";

export default function GrievancesPage() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("University Verification");
  const [description, setDescription] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const [grievancesList, setGrievancesList] = useState([
    {
      token: "GRV-2026-9812",
      category: "Document Clarification",
      subject: "Query regarding father's name spelling discrepancy on Class 10 vs ST certificate",
      date: "20 September 2026",
      status: "Resolved",
      statusBadge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
      resolution: "Official clarification provided: Upload affidavit proforma as per Annexure-VI. Resolved within 3 days.",
      officer: "Shri R. K. Soren, Nodal Grievance Officer",
    },
    {
      token: "GRV-2026-8741",
      category: "University Verification",
      subject: "Delay in university nodal officer bonafide approval queue",
      date: "25 September 2026",
      status: "In Progress",
      statusBadge: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
      resolution: "Reminder notification dispatched to Registrar, Central University of Jharkhand. Resolution due within 48 hours.",
      officer: "Automated MoTA SLA Tracker",
    },
  ]);

  const handleSubmitGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    const newToken = `GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEntry = {
      token: newToken,
      category,
      subject,
      date: "Just Now",
      status: "Under Scrutiny",
      statusBadge: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
      resolution: "Grievance received. Acknowledged under Citizen's Charter SLA. Assigned to Scholarship Section.",
      officer: "Assigned to MoTA Nodal Officer",
    };

    setGrievancesList([newEntry, ...grievancesList]);
    setSubmittedMessage(`Your grievance has been formally registered with Token #${newToken}. A confirmation SMS has been dispatched.`);
    setSubject("");
    setDescription("");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            Citizen&apos;s Charter Guaranteed SLA
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1.5">
            Grievance Redressal Desk
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Lodge official complaints, track time-bound resolution status, or escalate university approval delays.
          </p>
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="font-bold text-slate-900 dark:text-white">Toll-Free Helpline</p>
          <p className="text-emerald-700 dark:text-emerald-400 font-black text-sm">1800-11-7788</p>
        </div>
      </div>

      {/* Lodge Grievance Form */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-emerald-600" />
          <span>Lodge a New Grievance</span>
        </h2>

        {submittedMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{submittedMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmitGrievance} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Grievance Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white"
              >
                <option value="University Verification">University / Institute Verification Delay</option>
                <option value="Document Clarification">Document Scrutiny Clarification</option>
                <option value="Bank Seeding">PFMS / Aadhaar Bank Seeding Inquiry</option>
                <option value="Disbursement Delay">Stipend Disbursement Delay</option>
                <option value="Other">Other Technical Grievance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                placeholder="Brief summary of issue..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Detailed Description &amp; Application Reference
            </label>
            <textarea
              rows={3}
              required
              placeholder="Provide exact details, university name, or deficiency note context..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#0B2545] hover:bg-[#0D315D] dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Formal Grievance</span>
          </button>
        </form>
      </div>

      {/* Grievance History */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Grievance History &amp; Resolution Tracking
        </h2>

        <div className="space-y-3">
          {grievancesList.map((g) => (
            <div
              key={g.token}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-black text-[#0B2545] dark:text-emerald-400">
                    {g.token}
                  </span>
                  <span className="text-xs text-slate-400">|</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{g.category}</span>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${g.statusBadge}`}>
                  {g.status}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {g.subject}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                <strong className="text-slate-800 dark:text-slate-200">Resolution Update: </strong>
                {g.resolution}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>{g.officer}</span>
                <span>Lodged: {g.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
