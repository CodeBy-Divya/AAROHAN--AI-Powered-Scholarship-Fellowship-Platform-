"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { SCHEMES, Scheme } from "@/lib/data";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Search, 
  ShieldCheck, 
  Calendar, 
  HelpCircle,
  Award,
  Layers,
  FileCheck2,
  BookOpen
} from "lucide-react";

export default function HomePage() {
  const { language, user, role } = useAuth();

  // Interactive Eligibility Finder states
  const [selectedDegree, setSelectedDegree] = useState<string>("phd");
  const [selectedLocation, setSelectedLocation] = useState<string>("india");
  const [selectedIncome, setSelectedIncome] = useState<string>("under6");
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>(SCHEMES);

  const runEligibilityCheck = () => {
    let result = [...SCHEMES];
    if (selectedLocation === "abroad") {
      result = result.filter((s) => s.code === "NOS");
    } else if (selectedDegree === "phd") {
      result = result.filter((s) => s.code === "NFST" || s.code === "NOS");
    } else if (selectedDegree === "ug") {
      result = result.filter((s) => s.code === "TOPCLASS" || s.code === "PMS-ST");
    }
    setFilteredSchemes(result);
  };

  const getDashboardHref = () => {
    if (role === "officer") return "/dashboard/officer";
    if (role === "ministry") return "/dashboard/ministry";
    return "/dashboard/applicant";
  };

  return (
    <div className="space-y-16 pb-16 bg-[#FAF8F4] dark:bg-slate-950 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B2545] via-[#0D315D] to-[#0B2545] dark:from-slate-950 dark:via-[#0B2545] dark:to-slate-950 text-white pt-16 pb-20 px-4 sm:px-8 border-b-4 border-[#D98A00]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF8F4_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ministry of Tribal Affairs - National Digital Initiative</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                {language === "hi" ? (
                  <>
                    आपके सपने, <span className="text-[#D98A00]">हमारा सहयोग।</span>
                  </>
                ) : (
                  <>
                    Your Dreams. <br />
                    <span className="text-[#D98A00]">Our Support.</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl">
                {language === "hi"
                  ? "अनुसूचित जनजाति (ST) के छात्रों के लिए भारत एवं विदेशों में उच्च शिक्षा, एम.फिल एवं पी.एचडी शोध हेतु समर्पित एआई-सक्षम राष्ट्रीय छात्रवृत्ति एवं फैलोशिप मंच।"
                  : "Empowering Scheduled Tribe students to pursue Master's, Ph.D., and premier degree programmes in India & top global universities with automated document verification and direct DBT support."}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start items-center">
                {user ? (
                  <Link
                    href={getDashboardHref()}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-900/30 transition-all flex items-center space-x-2 text-sm sm:text-base"
                  >
                    <span>Go to My Dashboard ({user.roleTitle})</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/scholarships"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-900/30 transition-all flex items-center space-x-2 text-sm sm:text-base"
                    >
                      <GraduationCap className="w-5 h-5" />
                      <span>{language === "hi" ? "छात्रवृत्तियां देखें" : "Explore Scholarships (NFST / NOS)"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href="/login"
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold px-5 py-3.5 rounded-xl transition-all flex items-center space-x-2 text-sm"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{language === "hi" ? "अधिकारी / लॉगिन" : "Official / Role Login"}</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Tagline principle pills */}
              <div className="pt-4 flex flex-wrap gap-2 text-[11px] text-slate-300 font-medium justify-center lg:justify-start">
                <span className="bg-white/10 px-2.5 py-1 rounded-md">Pre-Submission AI Check</span>
                <span className="bg-white/10 px-2.5 py-1 rounded-md">Zero Document Rejection</span>
                <span className="bg-white/10 px-2.5 py-1 rounded-md">Direct DBT to Aadhaar Bank</span>
              </div>
            </div>

            {/* Right Column: Hero Interactive Spotlight Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-6 text-slate-900 dark:text-white shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                      Active Application Cycle 2026-27
                    </span>
                  </div>
                  <span className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-mono font-semibold">
                    MoTA Live
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 hover:border-emerald-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">National Fellowship (NFST)</span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">M.Phil & Ph.D. in Indian Universities</h4>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                        750 Slots
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
                      <span>Stipend: <strong className="text-slate-800 dark:text-slate-200">Rs. 35,000/mo + HRA</strong></span>
                      <span className="text-slate-500 dark:text-slate-400">Deadline: 15 Nov</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 hover:border-amber-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase">Overseas Scholarship (NOS)</span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Masters & Ph.D. in Top 500 Global Unis</h4>
                      </div>
                      <span className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                        20 Slots
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
                      <span>Support: <strong className="text-slate-800 dark:text-slate-200">100% Tuition + Living</strong></span>
                      <span className="text-amber-700 dark:text-amber-400 font-semibold">Closing Soon</span>
                    </div>
                  </div>
                </div>

                {/* Quick Navigation to Portal Sections */}
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-semibold text-slate-700 dark:text-slate-300">
                    <span>Direct Access</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Dedicated Modules</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    <Link
                      href="/scholarships"
                      className="bg-white dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-1.5 px-1 rounded border border-slate-200 dark:border-slate-600 text-[11px] transition-colors"
                    >
                      Scholarships
                    </Link>
                    <Link
                      href="/about"
                      className="bg-white dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-1.5 px-1 rounded border border-slate-200 dark:border-slate-600 text-[11px] transition-colors"
                    >
                      About & FAQs
                    </Link>
                    <Link
                      href="/login"
                      className="bg-white dark:bg-slate-700 hover:bg-purple-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-1.5 px-1 rounded border border-slate-200 dark:border-slate-600 text-[11px] transition-colors"
                    >
                      Login / Roles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* National Impact Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
          <div className="border-r border-slate-100 dark:border-slate-800 last:border-none pr-4 text-center sm:text-left">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total DBT Disbursed</p>
            <p className="text-2xl sm:text-3xl font-black text-mota-navy dark:text-emerald-400 mt-1">Rs. 482+ Cr</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center justify-center sm:justify-start mt-0.5">
              <span>Direct Bank Transfer</span>
            </p>
          </div>

          <div className="border-r border-slate-100 dark:border-slate-800 last:border-none pr-4 text-center sm:text-left">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ST Scholars Benefitted</p>
            <p className="text-2xl sm:text-3xl font-black text-mota-green dark:text-emerald-300 mt-1">18,450+</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Across 36 States & UTs</p>
          </div>

          <div className="border-r border-slate-100 dark:border-slate-800 last:border-none pr-4 text-center sm:text-left">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">AI Readiness Verification</p>
            <p className="text-2xl sm:text-3xl font-black text-[#D98A00] mt-1">94.2%</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">First-Time Approval Rate</p>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Average Processing Time</p>
            <p className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-200 mt-1">14 Days</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">Reduced from 90+ days</p>
          </div>
        </div>
      </section>

      {/* Flagship Schemes Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-mota-green dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Flagship Programs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Featured Scholarship & Fellowship Schemes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Configured with scheme-specific eligibility, merit workflows, and document scrutiny.
            </p>
          </div>

          <Link
            href="/scholarships"
            className="text-xs font-bold text-mota-navy dark:text-emerald-400 hover:underline flex items-center space-x-1"
          >
            <span>View All Schemes & Apply Filters</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SCHEMES.slice(0, 2).map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${scheme.badgeColor}`}>
                    {scheme.type}
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Apply by: <strong>{scheme.deadline}</strong></span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {scheme.name} ({scheme.code})
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 italic">{scheme.hindiName}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{scheme.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Level & Program</span>
                    <strong className="text-slate-800 dark:text-slate-200">{scheme.level}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Annual Quota</span>
                    <strong className="text-slate-800 dark:text-slate-200">{scheme.slots}</strong>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-slate-200/60 dark:border-slate-700 mt-1">
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Financial Support</span>
                    <strong className="text-emerald-700 dark:text-emerald-400">{scheme.financialBenefit}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href={`/apply/${scheme.id}`}
                  className="bg-mota-navy hover:bg-mota-navy-dark dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/scholarships"
                  className="text-xs font-semibold text-mota-green dark:text-emerald-400 hover:underline"
                >
                  Full Requirements
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transparent 8-Step Application Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-mota-navy dark:text-emerald-400 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            Transparent Workflow Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            The Student & Officer Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            From pre-check to Direct Benefit Transfer (DBT), eliminating opaque delays.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { step: 1, title: "Discover", desc: "Explore schemes matching your criteria" },
            { step: 2, title: "Understand", desc: "Clear guidelines and document checklists" },
            { step: 3, title: "Prepare", desc: "Gather ST, Income, and Academic records" },
            { step: 4, title: "AI Verify", desc: "Automated OCR quality and mismatch check" },
            { step: 5, title: "Apply", desc: "Submit with verified confidence score" },
            { step: 6, title: "Fix", desc: "Resolve flagged deficiencies within 7 days" },
            { step: 7, title: "Track", desc: "Live stage progression & officer notes" },
            { step: 8, title: "Succeed", desc: "Sanction order & direct DBT transfer" },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white dark:bg-slate-900 rounded-xl p-3.5 border border-slate-200 dark:border-slate-800 text-center space-y-2 hover:border-mota-navy dark:hover:border-emerald-500 transition-all shadow-2xs"
            >
              <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-extrabold inline-flex items-center justify-center">
                {item.step}
              </span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick FAQs Teaser */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Need help understanding eligibility, document formats, or DBT payments?
        </p>
        <Link
          href="/about#faqs"
          className="inline-flex items-center space-x-2 bg-mota-navy hover:bg-mota-navy-dark dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors"
        >
          <span>Read Full FAQ Directory & Guidelines</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>
    </div>
  );
}
