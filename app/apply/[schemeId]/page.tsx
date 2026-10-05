"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { SCHEMES } from "@/lib/data";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Upload, 
  FileText, 
  Sparkles, 
  Check, 
  RefreshCw,
  AlertTriangle,
  Lock,
  Landmark,
  UserCheck
} from "lucide-react";

export default function ApplySchemePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const schemeId = params.schemeId as string;
  const scheme = SCHEMES.find((s) => s.id === schemeId) || SCHEMES[0];

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Personal & Community Details (prefilled with user profile if available)
  const [fullName, setFullName] = useState(user?.name || "");
  const [gender, setGender] = useState(user?.gender || "Female");
  const [dob, setDob] = useState("1998-07-14");
  const [aadhaarLast4, setAadhaarLast4] = useState(user?.aadhaarLast4 || "8842");
  const [tribeName, setTribeName] = useState(user?.tribe || "Oraon");
  const [state, setState] = useState(user?.state || "Jharkhand");
  const [district, setDistrict] = useState(user?.district || "Ranchi");

  // Step 2: Academic & Research Details
  const [institution, setInstitution] = useState(user?.institution || "Central University of Jharkhand");
  const [course, setCourse] = useState(user?.course || "Ph.D. in Environmental Sciences");
  const [admissionDate, setAdmissionDate] = useState("2026-08-10");
  const [pgPercentage, setPgPercentage] = useState("78.4");
  const [synopsisTitle, setSynopsisTitle] = useState("Ecological Preservation and Ethnobotanical Knowledge Systems of Chota Nagpur Plateau Tribes");
  const [guideName, setGuideName] = useState("Prof. S. K. Murmu");

  // Step 3: Document Uploads & AI Quality Analysis
  interface DocUploadStatus {
    uploaded: boolean;
    fileName: string;
    fileSize: string;
    analyzing: boolean;
    qualityScore: number;
    extractedField: string;
    confidence: number;
    issue?: string;
  }

  const [casteDoc, setCasteDoc] = useState<DocUploadStatus>({
    uploaded: true,
    fileName: "JH_ST_Cert_Pooja_8821.pdf",
    fileSize: "680 KB",
    analyzing: false,
    qualityScore: 98,
    extractedField: "Oraon Tribe (SDO Ranchi)",
    confidence: 99,
  });

  const [incomeDoc, setIncomeDoc] = useState<DocUploadStatus>({
    uploaded: true,
    fileName: "Income_Cert_2026_Scanned.jpg",
    fileSize: "1.2 MB",
    analyzing: false,
    qualityScore: 72,
    extractedField: "Annual Family Income: Rs. 2,40,000",
    confidence: 68,
    issue: "Issuing authority stamp faint (Re-scan recommended)",
  });

  const [marksheetDoc, setMarksheetDoc] = useState<DocUploadStatus>({
    uploaded: true,
    fileName: "MSc_Biotechnology_Consolidated.pdf",
    fileSize: "840 KB",
    analyzing: false,
    qualityScore: 96,
    extractedField: "Score: 78.4% (First Class)",
    confidence: 97,
  });

  const [admissionDoc, setAdmissionDoc] = useState<DocUploadStatus>({
    uploaded: true,
    fileName: "CUJ_Admission_Offer_Letter.pdf",
    fileSize: "512 KB",
    analyzing: false,
    qualityScore: 95,
    extractedField: "CUJ Reg: CUJ/PhD/ENV/2026/012",
    confidence: 96,
  });

  const handleSimulateDocRecheck = (docType: "income" | "caste") => {
    if (docType === "income") {
      setIncomeDoc((prev) => ({ ...prev, analyzing: true }));
      setTimeout(() => {
        setIncomeDoc({
          uploaded: true,
          fileName: "Income_Cert_HD_Rescan.pdf",
          fileSize: "720 KB",
          analyzing: false,
          qualityScore: 98,
          extractedField: "Annual Family Income: Rs. 2,40,000 (Tehsildar Ranchi)",
          confidence: 98,
        });
      }, 1400);
    }
  };

  const handleFinalSubmit = () => {
    router.push("/dashboard/applicant");
  };

  // MANDATORY LOGIN GUARD
  if (!user) {
    return (
      <div className="bg-[#FAF8F4] dark:bg-slate-950 min-h-[calc(100vh-140px)] py-16 px-4 sm:px-8 flex items-center justify-center transition-colors">
        <div className="max-w-lg w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 mx-auto flex items-center justify-center text-amber-700 dark:text-amber-400">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
              Authentication Required
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Login is Mandatory to Apply
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Under Ministry of Tribal Affairs guidelines, scholarship applications can only be initiated and submitted by authenticated Scheduled Tribe scholars.
            </p>
          </div>

          {/* Target Scheme Snapshot */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-left space-y-1.5">
            <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">
              Target Scheme
            </span>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              {scheme.name} ({scheme.code})
            </h2>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
              {scheme.financialBenefit}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Link
              href={`/login?redirect=/apply/${scheme.id}`}
              className="w-full py-3 bg-mota-navy hover:bg-mota-navy-dark text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-2 shadow-xs"
            >
              <UserCheck className="w-4 h-4" />
              <span>Sign In to Continue Application</span>
            </Link>

            <Link
              href={`/login?mode=register&redirect=/apply/${scheme.id}`}
              className="w-full py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-mota-green dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700 rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-2"
            >
              <span>Register as New ST Applicant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="pt-2">
              <Link
                href="/scholarships"
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors inline-flex items-center space-x-1"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Return to Scholarships Directory</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F4] dark:bg-slate-950 min-h-[calc(100vh-140px)] py-8 px-4 sm:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/scholarships"
            className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-mota-navy dark:hover:text-white flex items-center space-x-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Schemes</span>
          </Link>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Scheme ID: <strong className="text-mota-navy dark:text-emerald-400">{scheme.code}</strong>
          </span>
        </div>

        {/* Scheme Header Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
              {scheme.type}
            </span>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
              Application for {scheme.name}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-0.5">{scheme.hindiName}</p>
          </div>
          <div className="text-right sm:self-center">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Financial Assistance</span>
            <strong className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">{scheme.financialBenefit}</strong>
          </div>
        </div>

        {/* Stepper Wizard Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[
              { num: 1, label: "Personal & ST Details" },
              { num: 2, label: "Academic & Research" },
              { num: 3, label: "Document Verification" },
              { num: 4, label: "Review & Submit" },
            ].map((step) => (
              <div
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`cursor-pointer p-2.5 rounded-xl transition-all ${
                  currentStep === step.num
                    ? "bg-mota-navy text-white font-bold shadow-xs"
                    : currentStep > step.num
                    ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800"
                    : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center justify-center space-x-1.5">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                    {currentStep > step.num ? <Check className="w-3 h-3" /> : step.num}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Form Panels */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          
          {/* STEP 1: Personal & Community */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Step 1: Personal and Scheduled Tribe (ST) Domicile
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ensure details match your ST Caste Certificate issued by the Revenue Officer / SDO.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Candidate Full Name (As per 10th / ST Certificate)
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-mota-navy font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-mota-navy font-medium"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Third Gender / Other">Third Gender / Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Aadhaar Last 4 Digits (For DBT Linking)
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={aadhaarLast4}
                    onChange={(e) => setAadhaarLast4(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-mota-navy font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Scheduled Tribe Community Name
                  </label>
                  <input
                    type="text"
                    value={tribeName}
                    onChange={(e) => setTribeName(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Domicile State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Home District / Revenue Sub-Division
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-mota-navy hover:bg-mota-navy-dark text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-colors flex items-center space-x-1.5"
                >
                  <span>Continue to Academic Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Academic & Research */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Step 2: Academic Programme and Research Synopsis
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Provide current enrolment details at your UGC/AICTE recognized university.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Admitted University / Institute Name
                  </label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Degree / Course Name
                  </label>
                  <input
                    type="text"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Date of Admission / Registration
                  </label>
                  <input
                    type="date"
                    value={admissionDate}
                    onChange={(e) => setAdmissionDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Qualifying Post-Graduate Marks (%)
                  </label>
                  <input
                    type="text"
                    value={pgPercentage}
                    onChange={(e) => setPgPercentage(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Designated Research Supervisor / Guide Name
                  </label>
                  <input
                    type="text"
                    value={guideName}
                    onChange={(e) => setGuideName(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Approved Research Title / Synopsis Topic
                  </label>
                  <textarea
                    rows={2}
                    value={synopsisTitle}
                    onChange={(e) => setSynopsisTitle(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-5 py-2.5 rounded-lg transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="bg-mota-navy hover:bg-mota-navy-dark text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-colors flex items-center space-x-1.5"
                >
                  <span>Continue to Documents</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Document Uploads & Automated Inspection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Step 3: Upload Certificates &amp; Pre-Submission Inspection
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Uploaded files undergo automated optical inspection to verify stamp clarity, legibility, and text consistency before submission.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Caste Certificate Card */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      1. ST Category Certificate
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-400 px-2 py-0.5 rounded flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>Legible (98%)</span>
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-mono bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <p className="font-semibold">{casteDoc.fileName} ({casteDoc.fileSize})</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Extracted: {casteDoc.extractedField}
                    </p>
                  </div>
                </div>

                {/* Income Certificate Card */}
                <div className={`border rounded-xl p-4 space-y-3 ${
                  incomeDoc.issue ? "border-amber-300 dark:border-amber-700 bg-amber-50/40 dark:bg-amber-950/20" : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      2. Income Certificate
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center space-x-1 ${
                      incomeDoc.issue 
                        ? "text-amber-800 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300" 
                        : "text-emerald-700 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-400"
                    }`}>
                      {incomeDoc.issue ? <AlertTriangle className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                      <span>{incomeDoc.issue ? "Faint Stamp" : "Verified (98%)"}</span>
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-mono bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <p className="font-semibold">{incomeDoc.fileName} ({incomeDoc.fileSize})</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {incomeDoc.extractedField}
                    </p>
                  </div>

                  {incomeDoc.issue && (
                    <div className="p-2 bg-amber-100/70 dark:bg-amber-950/60 rounded-lg text-[11px] text-amber-900 dark:text-amber-300 flex items-center justify-between">
                      <span>{incomeDoc.issue}</span>
                      <button
                        type="button"
                        onClick={() => handleSimulateDocRecheck("income")}
                        disabled={incomeDoc.analyzing}
                        className="bg-amber-800 text-white font-bold px-2 py-1 rounded text-[10px] hover:bg-amber-900 flex items-center space-x-1"
                      >
                        {incomeDoc.analyzing ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <span>Re-scan &amp; Fix</span>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Marksheet Card */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      3. Degree &amp; Consolidated Marksheet
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-400 px-2 py-0.5 rounded flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>Legible (96%)</span>
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-mono bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <p className="font-semibold">{marksheetDoc.fileName} ({marksheetDoc.fileSize})</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {marksheetDoc.extractedField}
                    </p>
                  </div>
                </div>

                {/* Admission Offer Letter Card */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      4. University Admission / Offer Letter
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-400 px-2 py-0.5 rounded flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>Legible (95%)</span>
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-mono bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <p className="font-semibold">{admissionDoc.fileName} ({admissionDoc.fileSize})</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {admissionDoc.extractedField}
                    </p>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-5 py-2.5 rounded-lg transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="bg-mota-navy hover:bg-mota-navy-dark text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-colors flex items-center space-x-1.5"
                >
                  <span>Review Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Final Submission */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Step 4: Final Declaration and Submission
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Review your verified application details before submitting to the Ministry Scrutiny Desk.
                </p>
              </div>

              {/* Summary table */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Candidate Name:</span>
                    <strong className="text-slate-900 dark:text-white">{fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">ST Community:</span>
                    <strong className="text-slate-900 dark:text-white">{tribeName} ({state})</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Enrolled Institution:</span>
                    <strong className="text-slate-900 dark:text-white">{institution}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Marks in Qualifying Degree:</span>
                    <strong className="text-emerald-700 dark:text-emerald-400">{pgPercentage}% (Eligible)</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300">Document Verification Status:</span>
                  <span className="font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    {incomeDoc.issue ? "86% Ready" : "98% Ready to Submit"}
                  </span>
                </div>
              </div>

              {/* Statutory Undertaking */}
              <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-[11px] text-blue-900 dark:text-blue-300 space-y-2">
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-0.5 rounded text-mota-navy" />
                  <span>
                    I hereby declare that all particulars stated above and certificates uploaded are true and authentic. I understand that any false declaration will lead to immediate cancellation of the fellowship and recovery of funds under DBT rules.
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-5 py-2.5 rounded-lg transition-colors"
                >
                  Back to Documents
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-8 py-3 rounded-xl transition-all shadow-md flex items-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm and Submit Application</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
