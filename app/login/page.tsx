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
  Mail, 
  KeyRound, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Lock, 
  Sparkles,
  GraduationCap
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, language } = useAuth();

  const [activeRole, setActiveRole] = useState<"applicant" | "officer" | "ministry">("applicant");
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Form states
  const [email, setEmail] = useState("student@demo.in");
  const [password, setPassword] = useState("Student@2026");
  const [rememberMe, setRememberMe] = useState(true);

  // Student registration states
  const [regName, setRegName] = useState("");
  const [regTribe, setRegTribe] = useState("");
  const [regState, setRegState] = useState("Jharkhand");
  const [regAadhaar, setRegAadhaar] = useState("");
  const [regEmail, setRegEmail] = useState("");

  const handleRoleSelect = (roleKey: "applicant" | "officer" | "ministry") => {
    setActiveRole(roleKey);
    setActiveTab("login");
    if (roleKey === "applicant") {
      setEmail("student@demo.in");
      setPassword("Student@2026");
    } else if (roleKey === "officer") {
      setEmail("officer@demo.in");
      setPassword("Officer@2026");
    } else {
      setEmail("ministry@demo.in");
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
              ? "कृपया अपनी भूमिका का चयन करें (आवेदक / सत्यापन अधिकारी / मंत्रालय)"
              : "Role-Based Authentication for Applicants, Verification Officials, and Ministry Executives"}
          </p>
        </div>

        {/* Role Selector */}
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
                  Pre-seeded persona for {activeRole === "applicant" ? "Pooja Xalxo (Scholar)" : activeRole === "officer" ? "Dr. Arvind Meena (Officer)" : "Smt. R. Ananthalakshmi (Ministry)"}
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
            /* Sign In Section */
            <div className="space-y-5">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Sign In to Existing Account
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Enter your registered credentials to access your official portal dashboard.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Registered Email Address / MoTA User ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password / Access Code
                    </label>
                    <a href="#forgot" className="text-[11px] text-mota-navy dark:text-emerald-400 hover:underline">
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
                    <span>Remember this device for 30 days</span>
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

              {/* Distinct New Registration Prompt for Students (Separated, Not Side-by-Side) */}
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
            /* Dedicated Registration View */
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    New Applicant Registration (ST)
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Create your student profile with Aadhaar and tribal community details.
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

              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name (As per Matriculation / ST Certificate)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pooja Xalxo"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Scheduled Tribe Community
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Oraon, Santhal, Gond"
                      value={regTribe}
                      onChange={(e) => setRegTribe(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Domicile State
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Aadhaar Last 4 Digits
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      required
                      placeholder="XXXX"
                      value={regAadhaar}
                      onChange={(e) => setRegAadhaar(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-mota-green hover:bg-mota-green-light rounded-xl text-white font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Create Applicant Profile & Proceed</span>
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
                    Sign In to Existing Account
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
