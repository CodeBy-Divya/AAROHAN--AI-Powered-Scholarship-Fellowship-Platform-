"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Upload, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Building,
  UserCheck
} from "lucide-react";

export default function StatusPage() {
  const [showFixModal, setShowFixModal] = useState(false);
  const [fixedState, setFixedState] = useState(false);

  const stages = [
    {
      step: 1,
      title: "Online Registration & Submission",
      role: "Applicant Submission",
      completedDate: "15 September 2026, 11:32 AM",
      status: "Completed",
      notes: "Application form submitted with Aadhaar OTP e-KYC. Reference ID NFST-2026-8821 generated.",
      isDone: true,
    },
    {
      step: 2,
      title: "AI-Assisted Quality Pre-Verification",
      role: "System Automation",
      completedDate: "15 September 2026, 11:36 AM",
      status: "Completed (Confidence: 94.2%)",
      notes: "OCR scanned all 5 uploaded documents. ST Caste Certificate flagged with faint seal warning for officer inspection.",
      isDone: true,
    },
    {
      step: 3,
      title: "Official Scrutiny & Deficiency Handling",
      role: "Desk Officer: Dr. Arvind Meena",
      completedDate: "In Progress (Since 28 September 2026)",
      status: fixedState ? "Deficiency Resolved" : "Under Scrutiny - Deficiency Flagged",
      notes: fixedState
        ? "Corrected high-resolution ST Certificate received. Officer approval in final queue."
        : "Deficiency Notice: Faint revenue magistrate seal on caste certificate. Please re-upload a clear scan within 7 days.",
      isDone: fixedState,
      isCurrent: !fixedState,
      actionRequired: !fixedState,
    },
    {
      step: 4,
      title: "Central Selection Committee Screening",
      role: "MoTA Selection Board",
      completedDate: "Scheduled for 20 October 2026",
      status: "Pending Stage 3 Clearance",
      notes: "Merit ranking and 750 quota slot allotment as per Presidential ST reservation guidelines.",
      isDone: false,
    },
    {
      step: 5,
      title: "Sanction Order & Direct Benefit Transfer",
      role: "Ministry Finance Division",
      completedDate: "Expected October 2026",
      status: "Pending",
      notes: "Electronic sanction letter and PFMS automated bank stipend disbursement.",
      isDone: false,
    },
  ];

  const handleSimulateFix = () => {
    setFixedState(true);
    setShowFixModal(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            Real-Time Audit Trail
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1.5">
            Application Status: NFST-2026-8821
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            National Fellowship for ST Students (Ph.D. in Tribal Linguistics) | Central University of Jharkhand
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            {fixedState ? "Stage 3 Cleared" : "Stage 3: Action Pending"}
          </span>
        </div>
      </div>

      {/* Action alert box if not yet fixed */}
      {!fixedState && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <h4 className="font-bold text-amber-950 dark:text-amber-200 text-sm">
                7-Day Deficiency Window Active
              </h4>
              <p className="text-amber-800 dark:text-amber-300">
                Scrutiny Officer noted: &quot;Revenue seal is partially faint on uploaded ST certificate. Upload a 300 DPI flat scan with visible SDO/Collector stamp.&quot;
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowFixModal(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-xs flex-shrink-0"
          >
            Fix Document Now
          </button>
        </div>
      )}

      {/* 5-Stage Status Timeline */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          Stage Progression &amp; Officer Verification History
        </h2>

        {/* Timeline Line */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 sm:ml-5 space-y-8 pb-2">
          {stages.map((stage) => (
            <div key={stage.step} className="relative pl-7 sm:pl-9">
              {/* Centered Circle */}
              <div
                className={`absolute -left-[17px] top-3.5 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold shadow-xs z-10 ${
                  stage.isDone
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : stage.isCurrent
                    ? "bg-amber-500 border-amber-500 text-white animate-pulse"
                    : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-400"
                }`}
              >
                {stage.step}
              </div>

              {/* Card */}
              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Stage {stage.step} : {stage.role}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      stage.isDone
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        : stage.isCurrent
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {stage.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {stage.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {stage.notes}
                </p>

                <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{stage.completedDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Fix Modal */}
      {showFixModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Re-Scan &amp; Upload ST Caste Certificate
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Upload a clear PDF or 300 DPI flat scan. The AI verification engine will instantly inspect readability and seal visibility.
            </p>

            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 p-6 rounded-2xl text-center space-y-2 bg-slate-50 dark:bg-slate-800/50">
              <Upload className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Click to browse or drop file here
              </p>
              <p className="text-[10px] text-slate-400">
                PDF format up to 2MB. Ensure SDM / SDO revenue seal is uncropped.
              </p>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowFixModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSimulateFix}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs"
              >
                Simulate Upload &amp; Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
