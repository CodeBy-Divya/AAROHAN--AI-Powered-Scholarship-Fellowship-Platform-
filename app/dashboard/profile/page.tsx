"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { 
  User, 
  ShieldCheck, 
  Landmark, 
  GraduationCap, 
  CreditCard, 
  CheckCircle2,
  Printer,
  FileCheck,
  Building2,
  MapPin,
  Calendar,
  Sparkles
} from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* 1. Hero Profile Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#06182C] via-[#0B2545] to-[#0D315D] text-white p-6 sm:p-8 shadow-xl border border-slate-700/60">
        {/* Ambient Glow Accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none translate-y-1/2"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-40"></div>

        <div className="relative z-10 space-y-6">
          {/* Top Government Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 p-1 flex items-center justify-center backdrop-blur-md">
                <Landmark className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 font-mono block">
                  Ministry of Tribal Affairs - MoTA
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  National Tribal Scholars Verified Registry
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Scholar: Session 2026-27</span>
              </span>
              <button
                onClick={handlePrint}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/20 transition-all flex items-center space-x-1.5 backdrop-blur-md cursor-pointer print:hidden"
                title="Print Scholar Profile Card"
              >
                <Printer className="w-3.5 h-3.5 text-slate-300" />
                <span>Print Profile</span>
              </button>
            </div>
          </div>

          {/* Main Scholar Header Body */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              {/* Scholar Avatar with Gold-Emerald Ring */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 text-white flex items-center justify-center text-3xl sm:text-4xl font-black shadow-2xl border-2 border-emerald-400/60 ring-4 ring-amber-400/20">
                  {user ? user.name.charAt(0) : "P"}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full ring-2 ring-[#0B2545] shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Scholar Information */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {user ? user.name : "Pooja Rameshwar"}
                  </h1>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>ST Verified Scholar</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-medium flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span>Ph.D. in Tribal Linguistics</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-300">Central University of Jharkhand</span>
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="bg-white/10 text-slate-200 px-2.5 py-1 rounded-lg border border-white/10 font-mono text-[11px]">
                    Scholar ID: <strong className="text-white">ST-2026-8821</strong>
                  </span>
                  <span className="bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-400/30 text-[11px] font-semibold">
                    Flagship Scheme: National Fellowship (NFST)
                  </span>
                  <span className="bg-white/10 text-slate-300 px-2.5 py-1 rounded-lg border border-white/10 text-[11px]">
                    Domicile: <strong className="text-white">Jharkhand</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Readiness & Verification Widget */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-2 sm:w-64 shrink-0">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Profile Verification</span>
                <span className="text-emerald-300 font-black">100% Complete</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full w-full rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 pt-1">
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>DigiLocker: Verified</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>DBT: PFMS Ready</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Grid of Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal & Tribal Community Details */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <User className="w-4 h-4 text-emerald-600" />
            <span>Tribal Identity &amp; Personal Info</span>
          </h2>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">Full Legal Name:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{user ? user.name : "Pooja Rameshwar"}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">Tribal Community:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Oraon (Scheduled Tribe)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">State of Domicile:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Jharkhand</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">Caste Certificate No:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">JH-ST-2024-99812</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 dark:text-slate-400">Issuing Revenue Authority:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">SDM, Ranchi District</span>
            </div>
          </div>
        </div>

        {/* Bank & DBT Mandate Information */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>Direct Benefit Transfer (DBT) Bank Data</span>
          </h2>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">Bank Name:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">State Bank of India</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">Core Banking Account:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">XXXX-XXXX-4512</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">IFSC Code:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">SBIN0000167</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">Aadhaar NPCI Status:</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Seeded &amp; Active</span>
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 dark:text-slate-400">PFMS Verification:</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">Cleared for DBT</span>
            </div>
          </div>
        </div>

        {/* Academic Enrollment Information */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 md:col-span-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>Academic Research Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">University</span>
              <strong className="text-slate-800 dark:text-slate-200">Central University of Jharkhand</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Degree &amp; Subject</span>
              <strong className="text-slate-800 dark:text-slate-200">Ph.D. in Tribal Linguistics</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Research Guide</span>
              <strong className="text-slate-800 dark:text-slate-200">Prof. A. K. Sharma</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
