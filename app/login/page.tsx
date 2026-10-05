"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { 
  Landmark, 
  User, 
  ShieldCheck, 
  Building2, 
  KeyRound, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Lock, 
  GraduationCap,
  AlertCircle,
  Mail,
  MapPin
} from "lucide-react";

const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect");
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";

  const { login, registerApplicant, language } = useAuth();

  const [activeRole, setActiveRole] = useState<"applicant" | "officer" | "ministry">("applicant");
  const [activeTab, setActiveTab] = useState<"login" | "register">(initialMode);

  // Sign In Credentials
  const [username, setUsername] = useState("ST-2026-8821");
  const [password, setPassword] = useState("Scholar@2026");
  const [rememberMe, setRememberMe] = useState(true);

  // New Applicant Registration Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState(""); // Email ID or Phone Number
  const [state, setState] = useState("Jharkhand");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [regError, setRegError] = useState("");

  const handleRoleSelect = (roleKey: "applicant" | "officer" | "ministry") => {
    setActiveRole(roleKey);
    setActiveTab("login");
    if (roleKey === "applicant") {
      setUsername("ST-2026-8821");
      setPassword("Scholar@2026");
    } else if (roleKey === "officer") {
      setUsername("OFFICER-771");
      setPassword("Officer@2026");
    } else {
      setUsername("MINISTRY-01");
      setPassword("Ministry@2026");
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(activeRole);
    if (redirectTarget) {
      router.push(redirectTarget);
    } else if (activeRole === "officer") {
      router.push("/dashboard/officer");
    } else if (activeRole === "ministry") {
      router.push("/dashboard/ministry");
    } else {
      router.push("/dashboard/applicant");
    }
  };

  const handleDemoQuickLogin = (roleKey: "applicant" | "officer" | "ministry") => {
    login(roleKey);
    if (redirectTarget) {
      router.push(redirectTarget);
    } else if (roleKey === "officer") {
      router.push("/dashboard/officer");
    } else if (roleKey === "ministry") {
      router.push("/dashboard/ministry");
    } else {
      router.push("/dashboard/applicant");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");

    if (!firstName.trim() || !lastName.trim()) {
      setRegError("Please provide both First Name and Last Name.");
      return;
    }
    if (!gender) {
      setRegError("Please select your gender.");
      return;
    }
    if (!contact.trim()) {
      setRegError("Please provide an Email ID or Phone Number.");
      return;
    }
    if (!state) {
      setRegError("Please select your State.");
      return;
    }
    if (regPassword.length < 6) {
      setRegError("Password must be at least 6 characters long.");
      return;
    }
    if (regPassword !== confirmPassword) {
      setRegError("Password and Confirm Password do not match.");
      return;
    }

    registerApplicant({
      firstName,
      lastName,
      gender,
      contact,
      state,
      password: regPassword,
    });

    if (redirectTarget) {
      router.push(redirectTarget);
    } else {
      router.push("/dashboard/applicant");
    }
  };

  return (
    <div className="bg-[#FAF8F4] dark:bg-slate-950 min-h-[calc(100vh-140px)] py-12 px-4 sm:px-8 transition-colors flex items-center justify-center">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Banner Header */}
        <div className="bg-[#0B2545] text-white p-6 sm:p-8 text-center space-y-2 relative">
          <div className="w-14 h-14 rounded-2xl bg-white p-1.5 mx-auto flex items-center justify-center shadow-md overflow-hidden">
            <img src="/logo.png" alt="Aarohan Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            {language === "hi" ? "आरोहण - पोर्टल लॉगिन" : "Aarohan Portal Access"}
          </h1>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            {language === "hi"
              ? "सुरक्षित पोर्टल लॉगिन एवं अनुसूचित जनजाति आवेदक पंजीकरण"
              : "Ministry of Tribal Affairs - Secure Authentication and ST Registration"}
          </p>
        </div>

        {/* Redirect Notice if redirecting after login */}
        {redirectTarget && (
          <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800 p-3 text-xs text-amber-900 dark:text-amber-200 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <span>Login is mandatory to apply for scholarships. Please sign in or register to proceed.</span>
          </div>
        )}

        {/* Role Selector Tabs (Only active in login view) */}
        {activeTab === "login" && (
          <div className="bg-slate-100 dark:bg-slate-800/80 p-2.5 grid grid-cols-3 gap-2 border-b border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => handleRoleSelect("applicant")}
              className={`flex flex-col items-center py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                activeRole === "applicant"
                  ? "bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 shadow-xs border border-emerald-300 dark:border-emerald-700"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <div className="flex items-center space-x-1.5 mb-1">
                <GraduationCap className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>ST Student</span>
              </div>
              <span className="text-[10px] font-normal text-slate-500">Applicant / Scholar</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect("officer")}
              className={`flex flex-col items-center py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                activeRole === "officer"
                  ? "bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-400 shadow-xs border border-blue-300 dark:border-blue-700"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <div className="flex items-center space-x-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                <span>Govt. Official</span>
              </div>
              <span className="text-[10px] font-normal text-slate-500">Scrutiny / Verifier</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect("ministry")}
              className={`flex flex-col items-center py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                activeRole === "ministry"
                  ? "bg-white dark:bg-slate-900 text-purple-900 dark:text-purple-400 shadow-xs border border-purple-300 dark:border-purple-700"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <div className="flex items-center space-x-1.5 mb-1">
                <Building2 className="w-4 h-4 text-purple-700 dark:text-purple-400" />
                <span>Ministry Admin</span>
              </div>
              <span className="text-[10px] font-normal text-slate-500">MoTA Headquarters</span>
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          
          {activeTab === "login" ? (
            <div className="space-y-6">
              
              {/* Evaluator Fast Track Access */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Quick Evaluator Fast-Track Access
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                    1-Click Direct Demo
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoQuickLogin("applicant")}
                    className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-left hover:border-emerald-500 transition-all text-xs"
                  >
                    <strong className="block text-slate-800 dark:text-slate-200">ST Student</strong>
                    <span className="text-[10px] text-slate-500 font-mono">ST-2026-8821</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoQuickLogin("officer")}
                    className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-left hover:border-blue-500 transition-all text-xs"
                  >
                    <strong className="block text-slate-800 dark:text-slate-200">Verifier</strong>
                    <span className="text-[10px] text-slate-500 font-mono">OFFICER-771</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoQuickLogin("ministry")}
                    className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-left hover:border-purple-500 transition-all text-xs"
                  >
                    <strong className="block text-slate-800 dark:text-slate-200">Ministry</strong>
                    <span className="text-[10px] text-slate-500 font-mono">MINISTRY-01</span>
                  </button>
                </div>
              </div>

              {/* Sign In Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Portal Username / User ID
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. ST-2026-8821"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password / Security Key
                    </label>
                    <span className="text-[11px] text-slate-400">Case-sensitive</span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password..."
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-mota-navy focus:ring-mota-navy"
                    />
                    <span>Remember this device</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl text-white font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2 ${
                    activeRole === "applicant"
                      ? "bg-mota-green hover:bg-mota-green-light"
                      : activeRole === "officer"
                      ? "bg-blue-800 hover:bg-blue-900"
                      : "bg-purple-800 hover:bg-purple-900"
                  }`}
                >
                  <span>Sign In to {activeRole === "applicant" ? "Student Dashboard" : activeRole === "officer" ? "Official Console" : "Ministry Dashboard"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Dedicated Registration Prompt for Students */}
              {activeRole === "applicant" && (
                <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 text-center space-y-1.5">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    First-time Scheduled Tribe applicant without an account?
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("register");
                      setRegError("");
                    }}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-mota-green dark:text-emerald-400 hover:underline"
                  >
                    <span>Register as New ST Applicant</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Dedicated New Applicant Registration Form */
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    New Applicant Registration (ST)
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Fill in your details to create an official ST applicant account.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("login");
                    setRegError("");
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </button>
              </div>

              {regError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{regError}</span>
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pooja"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Xalxo"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                      />
                    </div>
                  </div>
                </div>

                {/* Gender & Email / Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                    >
                      <option value="">Select Gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Third Gender / Other">Third Gender / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email ID or Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. pooja@example.com or 9876543210"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                      />
                    </div>
                  </div>
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    State / UT of Domicile <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        placeholder="Min 6 characters..."
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        placeholder="Re-enter password..."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-mota-green hover:bg-mota-green-light rounded-xl text-white font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2 mt-2"
                >
                  <span>Complete Registration &amp; Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("login");
                      setRegError("");
                    }}
                    className="font-bold text-mota-navy dark:text-emerald-400 hover:underline"
                  >
                    Sign In with User ID
                  </button>
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}


export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F4] dark:bg-slate-950 flex items-center justify-center p-8 text-slate-500">
          Loading Portal Login...
        </div>
      }
    >
      <LoginForm />
    </React.Suspense>
  );
}
