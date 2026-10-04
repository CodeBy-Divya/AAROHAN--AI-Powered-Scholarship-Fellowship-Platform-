"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { 
  X, 
  User, 
  ShieldCheck, 
  Building2, 
  ArrowRight, 
  KeyRound, 
  Mail, 
  Sparkles,
  CheckCircle2,
  Lock,
  Landmark,
  GraduationCap
} from "lucide-react";

export default function AuthModal() {
  const router = useRouter();
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    login, 
    authModalInitialRole,
    language 
  } = useAuth();

  const [activeRole, setActiveRole] = useState<"applicant" | "officer" | "ministry">("applicant");
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Student registration states
  const [regName, setRegName] = useState("");
  const [regTribe, setRegTribe] = useState("");
  const [regState, setRegState] = useState("Jharkhand");
  const [regAadhaar, setRegAadhaar] = useState("");

  useEffect(() => {
    if (authModalInitialRole) {
      setActiveRole(authModalInitialRole);
    }
  }, [authModalInitialRole]);

  // Update default demo credentials when role changes
  useEffect(() => {
    if (activeRole === "applicant") {
      setEmail("student@demo.in");
      setPassword("Student@2026");
    } else if (activeRole === "officer") {
      setEmail("officer@demo.in");
      setPassword("Officer@2026");
    } else {
      setEmail("ministry@demo.in");
      setPassword("Ministry@2026");
    }
  }, [activeRole]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(activeRole);
    closeAuthModal();

    if (activeRole === "officer") {
      router.push("/dashboard/officer");
    } else if (activeRole === "ministry") {
      router.push("/dashboard/ministry");
    } else {
      router.push("/dashboard/applicant");
    }
  };

  const handleDemoQuickLogin = (roleKey: "applicant" | "officer" | "ministry") => {
    login(roleKey);
    closeAuthModal();
    if (roleKey === "officer") {
      router.push("/dashboard/officer");
    } else if (roleKey === "ministry") {
      router.push("/dashboard/ministry");
    } else {
      router.push("/dashboard/applicant");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div 
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0B2545] text-white p-5 flex items-center justify-between relative">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src="/logo.png" alt="Aarohan Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {language === "hi" ? "आरोहण - पोर्टल लॉगिन" : "Aarohan Portal Access"}
              </h3>
              <p className="text-xs text-slate-300">
                {language === "hi"
                  ? "कृपया अपनी भूमिका का चयन करें (आवेदक / सत्यापन अधिकारी / मंत्रालय)"
                  : "Select your role to access your dedicated dashboard"}
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-slate-100 p-2 grid grid-cols-3 gap-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => {
              setActiveRole("applicant");
              setActiveTab("login");
            }}
            className={`flex flex-col items-center py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
              activeRole === "applicant"
                ? "bg-white text-emerald-800 shadow-xs border border-emerald-300 ring-2 ring-emerald-500/20"
                : "text-slate-600 hover:bg-slate-200/70"
            }`}
          >
            <div className="flex items-center space-x-1.5 mb-1">
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span>ST Student</span>
            </div>
            <span className="text-[10px] font-normal text-slate-500">Applicant / Scholar</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveRole("officer");
              setActiveTab("login");
            }}
            className={`flex flex-col items-center py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
              activeRole === "officer"
                ? "bg-white text-blue-900 shadow-xs border border-blue-300 ring-2 ring-blue-500/20"
                : "text-slate-600 hover:bg-slate-200/70"
            }`}
          >
            <div className="flex items-center space-x-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Govt. Official</span>
            </div>
            <span className="text-[10px] font-normal text-slate-500">Scrutiny / Verifier</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveRole("ministry");
              setActiveTab("login");
            }}
            className={`flex flex-col items-center py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
              activeRole === "ministry"
                ? "bg-white text-purple-900 shadow-xs border border-purple-300 ring-2 ring-purple-500/20"
                : "text-slate-600 hover:bg-slate-200/70"
            }`}
          >
            <div className="flex items-center space-x-1.5 mb-1">
              <Building2 className="w-4 h-4 text-purple-700" />
              <span>Ministry Admin</span>
            </div>
            <span className="text-[10px] font-normal text-slate-500">MoTA Headquarters</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Role Info Banner */}
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${
              activeRole === "applicant"
                ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                : activeRole === "officer"
                ? "bg-blue-50/70 border-blue-200 text-blue-950"
                : "bg-purple-50/70 border-purple-200 text-purple-950"
            }`}
          >
            <div>
              <span className="font-bold block text-sm">
                {activeRole === "applicant" && "Scheduled Tribe Student Portal"}
                {activeRole === "officer" && "Scrutiny and Verification Console"}
                {activeRole === "ministry" && "Ministry Executive & Analytics Dashboard"}
              </span>
              <span className="text-slate-600 text-[11px]">
                {activeRole === "applicant" && "Track applications, verify certificates with AI, and resolve deficiencies."}
                {activeRole === "officer" && "Scrutinize NFST/NOS files, inspect AI confidence scores, and approve applications."}
                {activeRole === "ministry" && "Monitor national budget disbursements, equity ratios, and scheme KPIs."}
              </span>
            </div>
          </div>

          {/* Quick Demo Login Option for Judges & Evaluators */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-5 h-5 text-amber-700 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-950">Fast Track Demo Mode</p>
                <p className="text-[11px] text-amber-800">
                  Instant sign-in with pre-configured persona for {activeRole === "applicant" ? "Pooja Xalxo" : activeRole === "officer" ? "Dr. Arvind Meena" : "Smt. R. Ananthalakshmi, IAS"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleDemoQuickLogin(activeRole)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-colors shadow-xs flex items-center space-x-1 flex-shrink-0"
            >
              <span>Instant Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Login or Register Toggle (Only for Applicants) */}
          {activeRole === "applicant" && (
            <div className="flex border-b border-slate-200 pb-1">
              <button
                type="button"
                onClick={() => setActiveTab("login")}
                className={`pb-2 text-xs font-bold mr-4 border-b-2 transition-colors ${
                  activeTab === "login"
                    ? "border-emerald-600 text-emerald-800"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                Sign In to Account
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("register")}
                className={`pb-2 text-xs font-bold border-b-2 transition-colors ${
                  activeTab === "register"
                    ? "border-emerald-600 text-emerald-800"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                New Applicant Registration (ST)
              </button>
            </div>
          )}

          {activeTab === "login" ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registered Email ID / MoTA User ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-mota-navy focus:border-mota-navy"
                    placeholder="e.g. student@demo.in"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password / Passcode
                  </label>
                  <a href="#forgot" className="text-[11px] text-mota-navy hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-mota-navy focus:border-mota-navy"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-mota-navy focus:ring-mota-navy"
                  />
                  <span>Remember this device for 30 days</span>
                </label>
                <span className="flex items-center text-[11px] text-emerald-700 font-medium">
                  <Lock className="w-3 h-3 mr-1" /> 256-Bit SSL Encrypted
                </span>
              </div>

              <button
                type="submit"
                className={`w-full py-2.5 rounded-lg text-white font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2 ${
                  activeRole === "applicant"
                    ? "bg-mota-green hover:bg-mota-green-light"
                    : activeRole === "officer"
                    ? "bg-mota-navy hover:bg-mota-navy-dark"
                    : "bg-purple-800 hover:bg-purple-900"
                }`}
              >
                <span>Sign In to {activeRole === "applicant" ? "Student Dashboard" : activeRole === "officer" ? "Official Console" : "Ministry Dashboard"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Student Registration Form */
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name (As per Matriculation / ST Certificate)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pooja Xalxo"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-mota-navy"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Scheduled Tribe Community
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oraon, Santhal, Gond"
                    value={regTribe}
                    onChange={(e) => setRegTribe(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-mota-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Domicile State / UT
                  </label>
                  <select
                    value={regState}
                    onChange={(e) => setRegState(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-mota-navy"
                  >
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Aadhaar Last 4 Digits
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    required
                    placeholder="XXXX"
                    value={regAadhaar}
                    onChange={(e) => setRegAadhaar(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-mota-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-mota-navy"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-[11px] text-emerald-900 flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  Your profile will automatically initialize the AI Document Readiness engine to assist with NFST and NOS applications.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-mota-green hover:bg-mota-green-light rounded-lg text-white font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <span>Create Applicant Account & Proceed</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
