"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  DollarSign, 
  CheckCircle, 
  Download,
  Landmark
} from "lucide-react";

export default function MinistryDashboard() {
  const { user } = useAuth();

  return (
    <div className="bg-[#FAF8F4] min-h-[calc(100vh-140px)] py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Ministry Executive Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-900 text-white flex items-center justify-center shadow-md">
              <Landmark className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  Ministry Executive and Performance Analytics
                </h1>
                <span className="bg-purple-100 text-purple-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-purple-300">
                  National Headquarters
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                {user ? user.name : "Smt. R. Ananthalakshmi, IAS"} - Joint Secretary (Scholarships, DBT & IT Systems)
              </p>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                Ministry of Tribal Affairs - Shastri Bhawan, New Delhi
              </p>
            </div>
          </div>

          <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5 self-start sm:self-center">
            <Download className="w-3.5 h-3.5" />
            <span>Export Annual MoTA Report</span>
          </button>
        </div>

        {/* Top Macro Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
              <span>Total Sanctions</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">18,450</p>
            <p className="text-[11px] text-emerald-600 font-medium">
              +14.8% increase over FY 2025
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
              <span>DBT Disbursed (FY 26)</span>
              <DollarSign className="w-4 h-4 text-mota-navy" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-mota-navy">Rs. 482.4 Cr</p>
            <p className="text-[11px] text-slate-500 font-medium">
              100% Aadhaar-seeded Direct Transfer
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
              <span>Avg Processing Turnaround</span>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-blue-700">14 Days</p>
            <p className="text-[11px] text-emerald-600 font-medium">
              Down from 92 days (Pre-AI manual era)
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
              <span>ST Female Participation</span>
              <CheckCircle className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-purple-800">48.6%</p>
            <p className="text-[11px] text-purple-600 font-medium">
              Near gender parity in Ph.D. fellowships
            </p>
          </div>
        </div>

        {/* Scheme Performance & Bottleneck Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Scheme Sanctions Breakdown (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Scheme-Wise Sanction & Utilization
                </h3>
                <p className="text-xs text-slate-500">
                  Active budget allocation and target fulfillment
                </p>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
                Cycle: 2026-27
              </span>
            </div>

            <div className="space-y-4">
              {/* NFST Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>National Fellowship for ST (NFST)</span>
                  <span className="text-emerald-700">712 of 750 Slots Sanctioned (95%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-emerald-600 h-3 rounded-full" style={{ width: "95%" }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Budget Utilized: Rs. 142.8 Cr</span>
                  <span>Average Fellowship: Rs. 35,000/mo</span>
                </div>
              </div>

              {/* NOS Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>National Overseas Scholarship (NOS)</span>
                  <span className="text-amber-700">18 of 20 Slots Sanctioned (90%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-amber-500 h-3 rounded-full" style={{ width: "90%" }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Budget Utilized: Rs. 38.2 Cr</span>
                  <span>Countries: UK, USA, Australia, Germany</span>
                </div>
              </div>

              {/* Top Class Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Top Class Education in Premier Institutes</span>
                  <span className="text-blue-700">920 of 1,000 Slots Sanctioned (92%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: "92%" }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Institutes: IITs, IIMs, AIIMS, NITs</span>
                  <span>100% Tuition Fees covered</span>
                </div>
              </div>
            </div>

            {/* Geographical Distribution Highlights */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Top Beneficiary States & UTs
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">Jharkhand</span>
                  <strong className="text-slate-900 text-sm">3,840 Scholars</strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">Odisha</span>
                  <strong className="text-slate-900 text-sm">3,210 Scholars</strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">Madhya Pradesh</span>
                  <strong className="text-slate-900 text-sm">2,980 Scholars</strong>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">North East States</span>
                  <strong className="text-slate-900 text-sm">4,420 Scholars</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Deficiency Intelligence & Root Cause Insights (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Process Bottleneck Intelligence
              </h3>
              <p className="text-xs text-slate-500">
                AI diagnostic on common reasons for verification delays
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                <div className="flex justify-between font-bold text-amber-900">
                  <span>Revenue Seal Faint / Glare</span>
                  <span>41%</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  Most common failure on Income Certificates from rural sub-divisions.
                </p>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
                <div className="flex justify-between font-bold text-blue-900">
                  <span>Name Discrepancy (Spelling)</span>
                  <span>29%</span>
                </div>
                <p className="text-[11px] text-blue-800">
                  Variation between Aadhaar, Matriculation, and ST certificate.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Bank Aadhaar NPCI Link Inactive</span>
                  <span>18%</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Account not seeded with DBT server prior to disbursement.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                System Recommendation:
              </span>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                The AI Pre-Submission Quality Check prevented 3,420 avoidable application rejections this cycle by prompting students to rescan before final submission.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
