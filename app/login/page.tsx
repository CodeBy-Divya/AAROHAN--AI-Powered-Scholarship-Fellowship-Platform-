"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
  Sparkles,
  GraduationCap,
  ShieldAlert,
  Hash
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, language } = useAuth();

  const [activeRole, setActiveRole] = useState<"applicant" | "officer" | "ministry">("applicant");
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Privacy-safe credentials (NO Name, NO Email, NO Phone, NO Aadhaar, NO Govt ID)
  const [username, setUsername] = useState("ST-2026-8821");
  const [password, setPassword] = useState("Scholar@2026");
  const [rememberMe, setRememberMe] = useState(true);

  // Privacy-safe student registration states (NO Name, NO Email, NO Phone, NO Aadhaar, NO Govt ID)
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPin, setRegPin] = useState("");
  const [regTribe, setRegTribe] = useState("Oraon");
  const [regState, setRegState] = useState("Jharkhand");

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
    if (roleKey === "officer") {
      router.push("/dashboard/officer");
    } else if (roleKey === "ministry") {
      router.push("/dashboard/ministry");
    } else {
      router.push("/dashboard/applicant");
    }
  };

  return (
    <div className="bg-[#FAF8F4] dark:bg-slate-950 min-h-[calc(100vh-140px)] py-12 px-4 sm:px-8 transition-colors flex items-center justify-center">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Banner Header */}
        <div className="bg-[#0B2545] text-white p-6 sm:p-8 text-center space-y-2 relative">
          <div className="w-12 h-12 rounded-2xl bg-white/10 mx-auto flex items-center justify-center">
            <Landmark className="w-6 h-6 text-emerald-400" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            {language === "hi" ? "जनजातीय कार्य मंत्रालय - पोर्टल लॉगिन" : "MoTA Digital Portal Access"}
          </h1>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            {language === "hi"
              ? "सुरक्षित पोर्टल लॉगिन (उपयोगकर्ता आईडी एवं पासवर्ड द्वारा)"
              : "Secure Role-Based Portal Access using Username & Security Key"}
          </p>
        </div>

        {/* Role Selector Tabs */}
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

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Quick Demo Access Box */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-5 h-5 text-amber-700 dark:text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-950 dark:text-amber-300">
                  Instant Demo Login
                </p>
                <p className="text-[11px] text-amber-800 dark:text-amber-400">
                  Quick access for {activeRole === "applicant" ? "ST Scholar Workspace" : activeRole === "officer" ? "Official Scrutiny Console" : "Ministry Executive Dashboard"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleDemoQuickLogin(activeRole)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-colors flex items-center space-x-1 flex-shrink-0 shadow-xs"
            >
              <span>Instant Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {activeTab === "login" ? (
            /* Sign In Section - Strictly NO Aadhaar, NO Govt ID, NO Name, NO Email, NO Phone */
            <div className="space-y-5">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Sign In to Existing Account
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Enter your assigned Portal User ID and password to access your dashboard.
                </p>
              </div>

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
                      placeholder="e.g. ST-2026-8821 or scholar_username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password / Security Key
                    </label>
                    <a href="#forgot" className="text-[11px] text-mota-navy dark:text-emerald-400 hover:underline">
                      Reset Password?
                    </a>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="Enter password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-mota-navy focus:ring-mota-navy"
                    />
                    <span>Remember this session</span>
                  </label>
                  <span className="flex items-center text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                    <Lock className="w-3 h-3 mr-1" /> 256-Bit SSL
                  </span>
                </div>

                <button
                  type="submit"
                  className={`w-full py-2.5 rounded-xl text-white font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2 ${
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

              {/* Dedicated Registration Prompt for Students (Zero PII collected) */}
              {activeRole === "applicant" && (
                <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 text-center space-y-1.5">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    First-time Scheduled Tribe applicant without an account?
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("register")}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-mota-green dark:text-emerald-400 hover:underline"
                  >
                    <span>Register as New ST Applicant</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Dedicated Registration View - Strictly NO Aadhaar, NO Govt ID, NO Name, NO Email, NO Phone */
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    New Applicant Registration (ST)
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Create your secure portal login credentials.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </button>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-300">
                <strong>Privacy Safeguard:</strong> This portal does not collect personal contact numbers, government ID cards, or Aadhaar numbers for initial account registration.
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Choose Desired Portal User ID / Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. scholar_pooja or ST_researcher"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Create Password
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        placeholder="Create password..."
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      4-Digit Security PIN
                    </label>
                    <div className="relative">
                      <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        maxLength={4}
                        required
                        placeholder="e.g. 7821"
                        value={regPin}
                        onChange={(e) => setRegPin(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Scheduled Tribe Community
                    </label>
                    <select
                      value={regTribe}
                      onChange={(e) => setRegTribe(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                    >
                      <option value="Oraon">Oraon (Kurukh)</option>
                      <option value="Santhal">Santhal</option>
                      <option value="Gond">Gond</option>
                      <option value="Munda">Munda</option>
                      <option value="Bodo">Bodo</option>
                      <option value="Bhil">Bhil</option>
                      <option value="Khasi">Khasi</option>
                      <option value="Ho">Ho</option>
                      <option value="Other">Other Recognized ST</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      State of Origin / Domicile
                    </label>
                    <select
                      value={regState}
                      onChange={(e) => setRegState(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
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

                <button
                  type="submit"
                  className="w-full py-2.5 bg-mota-green hover:bg-mota-green-light rounded-xl text-white font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Generate Portal Access &amp; Proceed</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
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
