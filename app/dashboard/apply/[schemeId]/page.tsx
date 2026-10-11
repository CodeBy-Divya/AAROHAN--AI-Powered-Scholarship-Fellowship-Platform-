"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { SCHEMES, Scheme } from "@/lib/data";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Upload, 
  FileText, 
  Check, 
  User, 
  Users, 
  GraduationCap, 
  Landmark, 
  FileCheck, 
  ShieldCheck, 
  Printer, 
  Building2, 
  Phone, 
  Mail, 
  Calendar,
  AlertCircle
} from "lucide-react";

interface UploadedDoc {
  fileName: string;
  fileSize: string;
  uploaded: boolean;
  qualityScore: number;
  extractedField: string;
}

export default function DashboardApplySchemePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const schemeId = params.schemeId as string;
  const scheme = SCHEMES.find((s) => s.id === schemeId) || SCHEMES[0];

  // 5 Application Phases
  const [currentPhase, setCurrentPhase] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [applicationId, setApplicationId] = useState<string>("");

  // Phase 1: Personal Details (prefilled from active user profile)
  const [fullName, setFullName] = useState(user?.name || "Pooja Xalxo");
  const [gender, setGender] = useState(user?.gender || "Female");
  const [dob, setDob] = useState("2000-07-14");
  const [tribeName, setTribeName] = useState(user?.tribe || "Oraon");
  const [aadhaarNumber, setAadhaarNumber] = useState("4589 2314 " + (user?.aadhaarLast4 || "8842"));
  const [mobileNumber, setMobileNumber] = useState(user?.phone || "9876543210");
  const [emailId, setEmailId] = useState(user?.email || "student@demo.in");
  const [state, setState] = useState(user?.state || "Jharkhand");
  const [district, setDistrict] = useState(user?.district || "Ranchi");
  const [address, setAddress] = useState("H.No 42, Birsa Nagar, Morabadi, Ranchi, Jharkhand - 834008");
  const [isDivyangjan, setIsDivyangjan] = useState("No");

  // Phase 1 Documents
  const [casteDoc, setCasteDoc] = useState<UploadedDoc>({
    fileName: "ST_Caste_Certificate_SDO_Ranchi.pdf",
    fileSize: "680 KB",
    uploaded: true,
    qualityScore: 98,
    extractedField: "Oraon Tribe (SDO Ranchi)",
  });
  const [aadhaarDoc, setAadhaarDoc] = useState<UploadedDoc>({
    fileName: "Aadhaar_Card_Front_Back.pdf",
    fileSize: "450 KB",
    uploaded: true,
    qualityScore: 99,
    extractedField: "UIDAI e-KYC Verified",
  });

  // Phase 2: Family Details
  const [fatherName, setFatherName] = useState("Mangra Xalxo");
  const [motherName, setMotherName] = useState("Somi Xalxo");
  const [fatherOccupation, setFatherOccupation] = useState("Agriculture / Farming");
  const [motherOccupation, setMotherOccupation] = useState("Homemaker");
  const [familyIncome, setFamilyIncome] = useState("240000");
  const [rationCardNumber, setRationCardNumber] = useState("JH-BPL-2024-88412");
  const [numDependents, setNumDependents] = useState("4");
  const [isTaxAssessee, setIsTaxAssessee] = useState("No");

  // Phase 2 Documents
  const [incomeDoc, setIncomeDoc] = useState<UploadedDoc>({
    fileName: "Income_Certificate_Tehsildar_2026.pdf",
    fileSize: "720 KB",
    uploaded: true,
    qualityScore: 96,
    extractedField: "Annual Family Income: Rs. 2,40,000",
  });

  // Phase 3: Education Details
  const [prevExam, setPrevExam] = useState("Post-Graduation (M.Sc. Biotechnology)");
  const [prevBoard, setPrevBoard] = useState("Ranchi University");
  const [prevPassingYear, setPrevPassingYear] = useState("2025");
  const [prevRollNo, setPrevRollNo] = useState("RU-PG-23-0941");
  const [prevPercentage, setPrevPercentage] = useState("78.4");
  const [institutionName, setInstitutionName] = useState(user?.institution || "Central University of Jharkhand");
  const [aisheCode, setAisheCode] = useState("U-0205");
  const [courseName, setCourseName] = useState(user?.course || "Ph.D. in Environmental Sciences");
  const [currentYear, setCurrentYear] = useState("1st Year");
  const [admissionDate, setAdmissionDate] = useState("2026-08-10");
  const [enrollmentNo, setEnrollmentNo] = useState("CUJ/PHD/ENV/2026/012");
  const [accommodationType, setAccommodationType] = useState("Hosteller");
  const [synopsisTitle, setSynopsisTitle] = useState("Ecological Preservation and Ethnobotanical Knowledge Systems of Chota Nagpur Tribes");
  const [guideName, setGuideName] = useState("Prof. S. K. Murmu");

  // Phase 3 Documents
  const [admissionDoc, setAdmissionDoc] = useState<UploadedDoc>({
    fileName: "CUJ_Admission_Order_Fee_Receipt.pdf",
    fileSize: "512 KB",
    uploaded: true,
    qualityScore: 95,
    extractedField: "CUJ Reg: CUJ/PHD/ENV/2026/012",
  });
  const [marksheetDoc, setMarksheetDoc] = useState<UploadedDoc>({
    fileName: "MSc_Consolidated_Marksheet.pdf",
    fileSize: "840 KB",
    uploaded: true,
    qualityScore: 97,
    extractedField: "Marks: 78.4% (First Class)",
  });

  // Phase 4: Bank & Aadhaar DBT Details
  const [bankName, setBankName] = useState("State Bank of India");
  const [branchName, setBranchName] = useState("Morabadi Branch, Ranchi");
  const [accountNumber, setAccountNumber] = useState("39485720194");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("39485720194");
  const [ifscCode, setIfscCode] = useState("SBIN0004123");
  const [accountHolderName, setAccountHolderName] = useState(user?.name || "Pooja Xalxo");
  const [dbtSeeded, setDbtSeeded] = useState("Yes - Seeded with NPCI Mapper");
  const [dbtConsent, setDbtConsent] = useState(true);

  // Phase 4 Documents
  const [bankPassbookDoc, setBankPassbookDoc] = useState<UploadedDoc>({
    fileName: "SBI_Passbook_Front_Page.pdf",
    fileSize: "610 KB",
    uploaded: true,
    qualityScore: 98,
    extractedField: "SBI A/C 39485720194 | IFSC: SBIN0004123",
  });

  // Phase 5 Declarations
  const [declaration1, setDeclaration1] = useState(true);
  const [declaration2, setDeclaration2] = useState(true);
  const [declaration3, setDeclaration3] = useState(true);

  // Sync profile details if user changes
  useEffect(() => {
    if (user) {
      if (user.name) setFullName(user.name);
      if (user.gender) setGender(user.gender);
      if (user.tribe) setTribeName(user.tribe);
      if (user.state) setState(user.state);
      if (user.district) setDistrict(user.district);
      if (user.phone) setMobileNumber(user.phone);
      if (user.email) setEmailId(user.email);
      if (user.institution) setInstitutionName(user.institution);
      if (user.course) setCourseName(user.course);
      if (user.name) setAccountHolderName(user.name);
    }
  }, [user]);

  const phases = [
    { num: 1, title: "Personal Details", icon: User },
    { num: 2, title: "Family Details", icon: Users },
    { num: 3, title: "Education Details", icon: GraduationCap },
    { num: 4, title: "Bank & DBT Details", icon: Landmark },
    { num: 5, title: "Review & Submit", icon: FileCheck },
  ];

  const handleNextPhase = () => {
    if (currentPhase < 5) {
      setCurrentPhase(currentPhase + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPhase = () => {
    if (currentPhase > 1) {
      setCurrentPhase(currentPhase - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `${scheme.code}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setApplicationId(generatedId);

    // Save newly created application to localStorage so Dashboard Applications page lists it
    try {
      const existingAppsStr = localStorage.getItem("aarohan_applications");
      const existingApps = existingAppsStr ? JSON.parse(existingAppsStr) : [];
      const newApp = {
        id: generatedId,
        scheme: `${scheme.name} (${scheme.code})`,
        type: scheme.type,
        institution: institutionName,
        dateSubmitted: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }),
        status: "Under Scrutiny",
        statusBadge: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300",
        actionRequired: "Verification initiated by Institutional Nodal Officer (INO)",
        stipend: scheme.financialBenefit,
        currentStage: "Stage 2 of 5: Institutional Nodal Verification",
      };
      localStorage.setItem("aarohan_applications", JSON.stringify([newApp, ...existingApps]));
    } catch {
      // ignore
    }

    setIsSubmitted(true);
  };

  // Helper renderer for document upload in each phase
  const renderUploadBox = (
    label: string,
    authority: string,
    doc: UploadedDoc,
    setDoc: React.Dispatch<React.SetStateAction<UploadedDoc>>
  ) => {
    return (
      <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <label className="text-xs font-bold text-slate-900 dark:text-white block">
              {label} <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              Issuing Authority: {authority}
            </span>
          </div>

          {doc.uploaded && (
            <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800 self-start sm:self-auto">
              <CheckCircle2 className="w-3 h-3" />
              <span>{doc.qualityScore}% AI Verified</span>
            </span>
          )}
        </div>

        {doc.uploaded ? (
          <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 overflow-hidden">
              <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="truncate">
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                  {doc.fileName}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {doc.fileSize} - {doc.extractedField}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDoc((prev) => ({ ...prev, uploaded: false }))}
              className="text-slate-400 hover:text-red-600 text-[11px] font-semibold shrink-0 ml-2"
            >
              Replace
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 rounded-lg p-4 text-center cursor-pointer bg-white dark:bg-slate-900">
            <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Click to upload or drag file here
            </span>
            <span className="text-[10px] text-slate-400">PDF, JPG, PNG (Max 2MB)</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setDoc({
                    fileName: file.name,
                    fileSize: `${Math.round(file.size / 1024)} KB`,
                    uploaded: true,
                    qualityScore: 98,
                    extractedField: "Uploaded Document Verified",
                  });
                }
              }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Breadcrumb & Target Scheme Info */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/scholarships"
          className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-[#0B2545] dark:hover:text-white flex items-center space-x-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Scholarships Directory</span>
        </Link>
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400">Applying Under:</span>
          <span className="font-extrabold text-[#0B2545] dark:text-emerald-400 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
            {scheme.code} Scheme
          </span>
        </div>
      </div>

      {/* Scheme Application Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${scheme.badgeColor}`}>
              {scheme.type}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full font-medium">
              Academic Session 2026-27
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Application for {scheme.name}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">{scheme.hindiName}</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 md:text-right shrink-0">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-bold uppercase tracking-wider">
            Sanctioned Grant / Stipend
          </span>
          <strong className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-extrabold block mt-0.5">
            {scheme.financialBenefit}
          </strong>
        </div>
      </div>

      {/* Multi-Phase Stepper Progress Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center text-xs">
          {phases.map((phase) => {
            const Icon = phase.icon;
            const isActive = currentPhase === phase.num;
            const isPast = currentPhase > phase.num;

            return (
              <button
                key={phase.num}
                type="button"
                onClick={() => setCurrentPhase(phase.num)}
                className={`p-2 sm:p-2.5 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                  isActive
                    ? "bg-[#0B2545] text-white font-bold shadow-xs"
                    : isPast
                    ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800"
                    : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : isPast
                    ? "bg-emerald-200 dark:bg-emerald-900 text-emerald-800"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-600"
                }`}>
                  {isPast ? <Check className="w-3 h-3 text-emerald-700 dark:text-emerald-300" /> : phase.num}
                </span>
                <span className="hidden md:inline text-[11px] leading-tight truncate">{phase.title}</span>
              </button>
            );
          })}
        </div>

        {/* Progress Bar Line */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-600 h-full transition-all duration-300"
            style={{ width: `${(currentPhase / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Content Cards */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        {/* Phase 1: Personal Details */}
        {currentPhase === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <User className="w-4 h-4 text-emerald-600" />
                <span>Phase 1: Personal Details &amp; Identity Verification</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Enter your identity particulars exactly as recorded on your official ST Tribe certificate and Aadhaar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Legal Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Date of Birth (DOB) <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ST Community Tribe Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={tribeName}
                  onChange={(e) => setTribeName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  12-Digit Aadhaar Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  State of Domicile <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  District <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Differently Abled (Divyangjan)?
                </label>
                <select
                  value={isDivyangjan}
                  onChange={(e) => setIsDivyangjan(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes (Eligible for Escort / Reader Allowance)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Permanent Residential Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                />
              </div>
            </div>

            {/* Phase 1 Document Uploads */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Mandatory Document Uploads for Phase 1:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {renderUploadBox("ST Community Caste Certificate", "SDM / Tehsildar / SDO", casteDoc, setCasteDoc)}
                {renderUploadBox("Aadhaar Card / Identity Card", "UIDAI e-Aadhaar", aadhaarDoc, setAadhaarDoc)}
              </div>
            </div>

            {/* Phase 1 Actions */}
            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handleNextPhase}
                className="bg-[#0B2545] hover:bg-[#0D315D] text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center space-x-1.5 transition-colors shadow-xs"
              >
                <span>Save &amp; Continue to Family Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Phase 2: Family Details */}
        {currentPhase === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Phase 2: Family &amp; Income Details</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Provide parental information and gross annual family income from all sources.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Father&apos;s Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mother&apos;s Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Father&apos;s Occupation
                </label>
                <input
                  type="text"
                  value={fatherOccupation}
                  onChange={(e) => setFatherOccupation(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mother&apos;s Occupation
                </label>
                <input
                  type="text"
                  value={motherOccupation}
                  onChange={(e) => setMotherOccupation(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Total Annual Family Income (in ₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={familyIncome}
                  onChange={(e) => setFamilyIncome(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  BPL / Ration Card Number (If Applicable)
                </label>
                <input
                  type="text"
                  value={rationCardNumber}
                  onChange={(e) => setRationCardNumber(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Number of Dependents / Siblings
                </label>
                <input
                  type="number"
                  value={numDependents}
                  onChange={(e) => setNumDependents(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Is Parent Income Tax Assessee?
                </label>
                <select
                  value={isTaxAssessee}
                  onChange={(e) => setIsTaxAssessee(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            {/* Phase 2 Document Upload */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Mandatory Document Uploads for Phase 2:
              </h3>
              <div>
                {renderUploadBox("Annual Family Income Certificate", "Tehsildar / SDM (Current Financial Year)", incomeDoc, setIncomeDoc)}
              </div>
            </div>

            {/* Phase 2 Actions */}
            <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handlePrevPhase}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
              >
                Previous: Personal Details
              </button>
              <button
                type="button"
                onClick={handleNextPhase}
                className="bg-[#0B2545] hover:bg-[#0D315D] text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center space-x-1.5 transition-colors shadow-xs"
              >
                <span>Save &amp; Continue to Education Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Phase 3: Education Details */}
        {currentPhase === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span>Phase 3: Academic &amp; Education Details</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Enter details regarding your qualifying examinations and present collegiate registration.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Previous Qualifying Degree / Class <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={prevExam}
                  onChange={(e) => setPrevExam(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Board / University <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={prevBoard}
                  onChange={(e) => setPrevBoard(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Passing Year &amp; Roll Number <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Year"
                    value={prevPassingYear}
                    onChange={(e) => setPrevPassingYear(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Roll No"
                    value={prevRollNo}
                    onChange={(e) => setPrevRollNo(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Percentage / CGPA Secured <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={prevPercentage}
                  onChange={(e) => setPrevPercentage(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Current Institution / University Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  AISHE Code / University Code
                </label>
                <input
                  type="text"
                  value={aisheCode}
                  onChange={(e) => setAisheCode(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Current Course / Degree Enrolled <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Current Year of Study &amp; Admission Date <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={currentYear}
                    onChange={(e) => setCurrentYear(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year">5th Year</option>
                  </select>
                  <input
                    type="date"
                    value={admissionDate}
                    onChange={(e) => setAdmissionDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  College Enrolment / Roll Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={enrollmentNo}
                  onChange={(e) => setEnrollmentNo(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Student Accommodation Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={accommodationType}
                  onChange={(e) => setAccommodationType(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                >
                  <option value="Hosteller">Hosteller (Residing in College/Univ Hostel)</option>
                  <option value="Day Scholar">Day Scholar (Commuting from Home)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Research Topic / Synopsis Title (If Applicable)
                </label>
                <input
                  type="text"
                  value={synopsisTitle}
                  onChange={(e) => setSynopsisTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Phase 3 Documents Upload */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Mandatory Document Uploads for Phase 3:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {renderUploadBox("College Admission Letter & Fee Receipt", "Registrar / Dean of Institution", admissionDoc, setAdmissionDoc)}
                {renderUploadBox("Previous Qualifying Marksheet", "University / Examination Board", marksheetDoc, setMarksheetDoc)}
              </div>
            </div>

            {/* Phase 3 Actions */}
            <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handlePrevPhase}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
              >
                Previous: Family Details
              </button>
              <button
                type="button"
                onClick={handleNextPhase}
                className="bg-[#0B2545] hover:bg-[#0D315D] text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center space-x-1.5 transition-colors shadow-xs"
              >
                <span>Save &amp; Continue to Bank &amp; DBT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Phase 4: Bank & DBT Details */}
        {currentPhase === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Landmark className="w-4 h-4 text-emerald-600" />
                <span>Phase 4: Bank Account &amp; Aadhaar DBT Details</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Scholarship stipends are disbursed directly to your Aadhaar-seeded bank account through PFMS.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Account Holder Name (Must match Student Name) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Bank Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Confirm Bank Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={confirmAccountNumber}
                  onChange={(e) => setConfirmAccountNumber(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Bank IFSC Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white font-mono uppercase focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Branch Name &amp; Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Aadhaar NPCI DBT Seeding Status
                </label>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center space-x-2 text-emerald-800 dark:text-emerald-300 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{dbtSeeded}</span>
                </div>
              </div>

              <div className="sm:col-span-2 pt-1">
                <label className="flex items-start space-x-2 cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={dbtConsent}
                    onChange={(e) => setDbtConsent(e.target.checked)}
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs leading-relaxed">
                    I give my consent to receive scholarship disbursement directly into this Aadhaar-linked bank account via PFMS DBT.
                  </span>
                </label>
              </div>
            </div>

            {/* Phase 4 Document Upload */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Mandatory Document Uploads for Phase 4:
              </h3>
              <div>
                {renderUploadBox("Bank Passbook Front Page / Cancelled Cheque", "Core Banking Branch", bankPassbookDoc, setBankPassbookDoc)}
              </div>
            </div>

            {/* Phase 4 Actions */}
            <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handlePrevPhase}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
              >
                Previous: Education Details
              </button>
              <button
                type="button"
                onClick={handleNextPhase}
                className="bg-[#0B2545] hover:bg-[#0D315D] text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center space-x-1.5 transition-colors shadow-xs"
              >
                <span>Save &amp; Continue to Final Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Phase 5: Review & Final Submission */}
        {currentPhase === 5 && (
          <form onSubmit={handleSubmitApplication} className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Phase 5: Application Summary &amp; Final Submission</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Carefully review all submitted data and uploaded certificates before final confirmation.
              </p>
            </div>

            {/* Summary Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Personal Summary */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-1.5">
                  <strong className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Personal Details</span>
                  </strong>
                  <button
                    type="button"
                    onClick={() => setCurrentPhase(1)}
                    className="text-emerald-700 dark:text-emerald-400 font-semibold text-[11px] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                  <p><strong>Name:</strong> {fullName}</p>
                  <p><strong>DOB &amp; Gender:</strong> {dob} | {gender}</p>
                  <p><strong>ST Community:</strong> {tribeName}</p>
                  <p><strong>Aadhaar:</strong> {aadhaarNumber}</p>
                  <p><strong>Contact:</strong> {mobileNumber} | {emailId}</p>
                  <p><strong>Location:</strong> {district}, {state}</p>
                </div>
              </div>

              {/* Family Summary */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-1.5">
                  <strong className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Family &amp; Income</span>
                  </strong>
                  <button
                    type="button"
                    onClick={() => setCurrentPhase(2)}
                    className="text-emerald-700 dark:text-emerald-400 font-semibold text-[11px] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                  <p><strong>Father:</strong> {fatherName} ({fatherOccupation})</p>
                  <p><strong>Mother:</strong> {motherName} ({motherOccupation})</p>
                  <p><strong>Annual Income:</strong> ₹{Number(familyIncome).toLocaleString("en-IN")}</p>
                  <p><strong>Ration Card:</strong> {rationCardNumber || "N/A"}</p>
                  <p><strong>Dependents:</strong> {numDependents}</p>
                </div>
              </div>

              {/* Academic Summary */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-1.5">
                  <strong className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Academic &amp; Course</span>
                  </strong>
                  <button
                    type="button"
                    onClick={() => setCurrentPhase(3)}
                    className="text-emerald-700 dark:text-emerald-400 font-semibold text-[11px] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                  <p><strong>Previous Exam:</strong> {prevExam} ({prevPercentage}%)</p>
                  <p><strong>Institution:</strong> {institutionName}</p>
                  <p><strong>Course:</strong> {courseName} ({currentYear})</p>
                  <p><strong>Roll No:</strong> {enrollmentNo}</p>
                  <p><strong>Residence:</strong> {accommodationType}</p>
                </div>
              </div>

              {/* Bank Summary */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-1.5">
                  <strong className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <Landmark className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Bank &amp; DBT Account</span>
                  </strong>
                  <button
                    type="button"
                    onClick={() => setCurrentPhase(4)}
                    className="text-emerald-700 dark:text-emerald-400 font-semibold text-[11px] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                  <p><strong>Bank:</strong> {bankName}</p>
                  <p><strong>Account Holder:</strong> {accountHolderName}</p>
                  <p><strong>Account Number:</strong> {accountNumber}</p>
                  <p><strong>IFSC:</strong> {ifscCode}</p>
                  <p><strong>Branch:</strong> {branchName}</p>
                </div>
              </div>
            </div>

            {/* Document Scrutiny Checklist */}
            <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2 text-xs">
              <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Document Scrutiny Status (All 5 Documents Uploaded &amp; Pre-Verified)</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-emerald-800 dark:text-emerald-300">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ST Community Certificate Verified ({casteDoc.fileName})</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Aadhaar Card Verified ({aadhaarDoc.fileName})</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Income Certificate Verified ({incomeDoc.fileName})</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Admission Receipt Verified ({admissionDoc.fileName})</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Bank Passbook Verified ({bankPassbookDoc.fileName})</span>
                </div>
              </div>
            </div>

            {/* Statutory Declarations */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
              <h3 className="font-bold text-slate-900 dark:text-white">Applicant Statutory Undertaking:</h3>
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={declaration1}
                  onChange={(e) => setDeclaration1(e.target.checked)}
                  required
                  className="mt-0.5 rounded text-emerald-600"
                />
                <span>
                  I hereby declare that all information and certificates furnished by me are genuine and authentic.
                </span>
              </label>
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={declaration2}
                  onChange={(e) => setDeclaration2(e.target.checked)}
                  required
                  className="mt-0.5 rounded text-emerald-600"
                />
                <span>
                  I declare that I am not in receipt of any other central or state government scholarship for this course.
                </span>
              </label>
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={declaration3}
                  onChange={(e) => setDeclaration3(e.target.checked)}
                  required
                  className="mt-0.5 rounded text-emerald-600"
                />
                <span>
                  I understand that providing false data will lead to disqualification, cancellation, and recovery of scholarship.
                </span>
              </label>
            </div>

            {/* Submission Actions */}
            <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handlePrevPhase}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
              >
                Previous: Bank Details
              </button>
              <button
                type="submit"
                disabled={!declaration1 || !declaration2 || !declaration3}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-8 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FileCheck className="w-4 h-4" />
                <span>Submit Final Application</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Submission Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 mx-auto flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                Application Successfully Submitted
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Acknowledgement Receipt Generated
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Your application for <strong>{scheme.name} ({scheme.code})</strong> has been registered on the Ministry of Tribal Affairs portal.
              </p>
            </div>

            {/* Application Identifier Card */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-left space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Application Number:</span>
                <strong className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">{applicationId}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Applicant Name:</span>
                <strong className="text-slate-800 dark:text-slate-200">{fullName}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Target Scheme:</span>
                <strong className="text-slate-800 dark:text-slate-200">{scheme.code}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Current Stage:</span>
                <strong className="text-slate-800 dark:text-slate-200">Stage 2: Institutional Nodal Verification (INO)</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-2 border border-slate-200 dark:border-slate-700"
              >
                <Printer className="w-4 h-4" />
                <span>Print Acknowledgement Receipt</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard/applications")}
                className="w-full py-3 bg-[#0B2545] hover:bg-[#0D315D] text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center space-x-2 shadow-xs"
              >
                <span>View in My Applications</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
