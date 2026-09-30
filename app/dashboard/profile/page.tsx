"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { 
  User, 
  ShieldCheck, 
  Landmark, 
  GraduationCap, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail,
  CheckCircle2
} from "lucide-react";

export default function DashboardProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center space-x-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-white flex items-center justify-center text-2xl font-black shadow-md">
          {user ? user.name.charAt(0) : "P"}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {user ? user.name : "Pooja Rameshwar"}
            </h1>
            <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
              ST Verified Scholar
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Registered Scholar ID: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">ST-2026-8821</span> | Central Scheme: NFST
          </p>
        </div>
      </div>

      {/* Grid of Profile Details */}
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
