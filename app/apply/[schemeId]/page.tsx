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
  AlertTriangle
} from "lucide-react";

export default function ApplicationFormPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const schemeId = params.schemeId as string;
  const scheme = SCHEMES.find((s) => s.id === schemeId) || SCHEMES[0];

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Personal & Community Details
  const [fullName, setFullName] = useState(user?.name || "Pooja Xalxo");
  const [gender, setGender] = useState("Female");
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

  return (
    <div className="bg-[#FAF8F4] min-h-[calc(100vh-140px)] py-8 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/#schemes"
            className="text-xs font-bold text-slate-600 hover:text-mota-navy flex items-center space-x-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Schemes</span>
          </Link>
          <span className="text-xs text-slate-500 font-mono">
            Scheme ID: <strong className="text-mota-navy">{scheme.code}</strong>
          </span>
        </div>

        {/* Scheme Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
              {scheme.type}
            </span>
            <h1 className="text-xl font-bold text-slate-900 mt-2">
              Application for {scheme.name}
            </h1>
            <p className="text-xs text-slate-500 italic mt-0.5">{scheme.hindiName}</p>
          </div>
          <div className="text-right sm:self-center">
            <span className="text-xs text-slate-500 block">Financial Assistance</span>
            <strong className="text-xs text-emerald-700 font-bold">{scheme.financialBenefit}</strong>
          </div>
        </div>

        {/* Stepper Wizard Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[
              { num: 1, label: "Personal & ST Details" },
              { num: 2, label: "Academic & Research" },
              { num: 3, label: "AI Document Check" },
              { num: 4, label: "Review & Submit" },
            ].map((step) => (
              <div
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`cursor-pointer p-2.5 rounded-xl transition-all ${
                  currentStep === step.num
                    ? "bg-mota-navy text-white font-bold shadow-xs"
                    : currentStep > step.num
                    ? "bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200"
                    : "text-slate-400 hover:bg-slate-100"
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
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          
          {/* STEP 1: Personal & Community */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Step 1: Personal and Scheduled Tribe (ST) Domicile
                </h3>
                <p className="text-xs text-slate-500">
                  Ensure details match your ST Caste Certificate issued by the Revenue Officer / SDO.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Candidate Full Name (As per 10th / ST Certificate)
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-mota-navy font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-mota-navy font-medium"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Transgender">Transgender</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Aadhaar Last 4 Digits (For DBT Linking)
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={aadhaarLast4}
                    onChange={(e) => setAadhaarLast4(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-mota-navy font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Scheduled Tribe (ST) Community Name
                  </label>
                  <input
                    type="text"
                    value={tribeName}
                    onChange={(e) => setTribeName(e.target.value)}
                    placeholder="e.g. Oraon, Santhal, Gond, Bhotia"
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-mota-navy font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Domicile State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-mota-navy hover:bg-mota-navy-dark text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-colors flex items-center space-x-1.5"
                >
                  <span>Save & Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Academic & Research */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Step 2: Academic Details and Research Proposal
                </h3>
                <p className="text-xs text-slate-500">
                  Details of your Master&apos;s degree and enrolled Ph.D. programme in India.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Host University / Research Institute (Recognized by UGC)
                  </label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-mota-navy font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Enrolled Programme / Course
                  </label>
                  <input
                    type="text"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Date of Enrolment / Admission
                  </label>
                  <input
                    type="date"
                    value={admissionDate}
                    onChange={(e) => setAdmissionDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Post-Graduation (Master&apos;s) Marks / Percentage (%)
                  </label>
                  <input
                    type="text"
                    value={pgPercentage}
                    onChange={(e) => setPgPercentage(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-mota-navy font-bold text-emerald-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Research Guide / Supervisor Name
                  </label>
                  <input
                    type="text"
                    value={guideName}
                    onChange={(e) => setGuideName(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Approved Ph.D. Research Synopsis Topic
                  </label>
                  <textarea
                    rows={2}
                    value={synopsisTitle}
                    onChange={(e) => setSynopsisTitle(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-mota-navy"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-lg transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="bg-mota-navy hover:bg-mota-navy-dark text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-colors flex items-center space-x-1.5"
                >
                  <span>Proceed to Document Intelligence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: AI Document Quality & Verification */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Step 3: AI Document Intelligence and Quality Assurance</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Documents are automatically checked for seal visibility, text clarity, and name consistency.
                  </p>
                </div>
              </div>

              {/* Document items list with AI analysis */}
              <div className="space-y-4 text-xs">
                
                {/* Caste certificate */}
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <FileText className="w-5 h-5 text-emerald-700" />
                      <div>
                        <p className="font-bold text-slate-900">ST Caste Certificate (DigiLocker / SDO)</p>
                        <p className="text-[11px] text-slate-500">{casteDoc.fileName} - {casteDoc.fileSize}</p>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px] flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>{casteDoc.qualityScore}% Quality Score</span>
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-100 text-[11px] flex justify-between items-center text-slate-700">
                    <span>Extracted Community: <strong>{casteDoc.extractedField}</strong></span>
                    <span className="text-emerald-700 font-semibold">{casteDoc.confidence}% AI Confidence</span>
                  </div>
                </div>

                {/* Income certificate with simulated deficiency */}
                <div className={`p-4 rounded-xl border ${incomeDoc.issue ? "border-amber-300 bg-amber-50/50" : "border-emerald-200 bg-emerald-50/50"} space-y-2`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <FileText className={`w-5 h-5 ${incomeDoc.issue ? "text-amber-700" : "text-emerald-700"}`} />
                      <div>
                        <p className="font-bold text-slate-900">Family Income Certificate</p>
                        <p className="text-[11px] text-slate-500">{incomeDoc.fileName} - {incomeDoc.fileSize}</p>
                      </div>
                    </div>
                    <span className={`font-bold px-2 py-0.5 rounded text-[11px] flex items-center space-x-1 ${
                      incomeDoc.issue ? "bg-amber-200 text-amber-900" : "bg-emerald-100 text-emerald-800"
                    }`}>
                      <span>{incomeDoc.qualityScore}% Quality Score</span>
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-[11px] flex flex-wrap justify-between items-center gap-2 text-slate-700">
                    <span>Extracted Income: <strong>{incomeDoc.extractedField}</strong></span>
                    {incomeDoc.issue ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-amber-800 font-semibold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                          <span>{incomeDoc.issue}</span>
                        </span>
                        <button
                          onClick={() => handleSimulateDocRecheck("income")}
                          disabled={incomeDoc.analyzing}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-2 py-0.5 rounded text-[10px] flex items-center space-x-1 transition-colors"
                        >
                          {incomeDoc.analyzing ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <Upload className="w-3 h-3" />
                          )}
                          <span>{incomeDoc.analyzing ? "Analyzing..." : "Re-scan with HD"}</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-emerald-700 font-semibold">{incomeDoc.confidence}% AI Confidence</span>
                    )}
                  </div>
                </div>

                {/* Admission & Marksheet */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">M.Sc. Marksheet</p>
                      <p className="text-[10px] text-slate-500">Verified: 78.4%</p>
                    </div>
                    <span className="text-emerald-700 font-bold">97% AI Conf</span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">Ph.D. Admission Letter</p>
                      <p className="text-[10px] text-slate-500">Verified: Central Univ</p>
                    </div>
                    <span className="text-emerald-700 font-bold">96% AI Conf</span>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-lg transition-colors"
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
                <h3 className="text-base font-bold text-slate-900">
                  Step 4: Final Declaration and Submission
                </h3>
                <p className="text-xs text-slate-500">
                  Review your verified application details before submitting to the Ministry Scrutiny Desk.
                </p>
              </div>

              {/* Summary table */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-slate-500 block">Candidate Name:</span>
                    <strong className="text-slate-900">{fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">ST Community:</span>
                    <strong className="text-slate-900">{tribeName} ({state})</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Enrolled Institution:</span>
                    <strong className="text-slate-900">{institution}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Marks in PG Degree:</span>
                    <strong className="text-emerald-700">{pgPercentage}% (Eligible)</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Application Readiness Score:</span>
                  <span className="font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {incomeDoc.issue ? "86% Ready" : "98% Ready to Submit"}
                  </span>
                </div>
              </div>

              {/* Statutory Undertaking */}
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 space-y-2">
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="mt-0.5 rounded text-mota-navy" />
                  <span>
                    I hereby declare that all particulars stated above and certificates uploaded are true and authentic. I understand that any false declaration will lead to immediate cancellation of the fellowship and recovery of funds under DBT rules.
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-lg transition-colors"
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
