"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Search, 
  ShieldCheck, 
  Calendar, 
  Layers,
  FileCheck,
  Eye,
  AlertTriangle,
  Send,
  Bell,
  Clock,
  ExternalLink,
  ChevronRight,
  Landmark,
  UserCheck
} from "lucide-react";

export default function HomePage() {
  const { language } = useAuth();

  const activeSchemes = [
    {
      id: "nfst",
      name: "National Fellowship for ST (NFST)",
      fullName: "National Fellowship for Scheduled Tribe Students",
      type: "Research Fellowship (Ph.D.)",
      description:
        "Comprehensive financial assistance for ST scholars pursuing full-time regular M.Phil. and Ph.D. degrees in recognized universities and research institutions across India.",
      eligibilitySnapshot: [
        "ST Category Certificate from authorized revenue magistrate",
        "Confirmed admission in full-time Ph.D. / M.Phil. programme",
        "UGC-NET / CSIR-NET / GATE qualification or university entrance",
        "No mandatory income ceiling for full-time research scholars"
      ],
      status: "Applications Open - Cycle 2026-27",
      statusColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
      deadline: "15 November 2026",
      slots: "750 Annual Slots",
      financialBenefit: "Rs. 35,000/mo (JRF) / Rs. 40,000/mo (SRF) + HRA & Contingency",
    },
    {
      id: "nos",
      name: "National Overseas Scholarship (NOS)",
      fullName: "National Overseas Scholarship for ST Candidates",
      type: "International Study (Masters & Ph.D.)",
      description:
        "Prestigious central scholarship facilitating ST students to pursue postgraduate degrees and doctoral research in top 500 QS/THE ranked global universities abroad.",
      eligibilitySnapshot: [
        "ST Category Certificate with proof of Indian citizenship",
        "Minimum 55% aggregate marks in Bachelor's or Master's degree",
        "Unconditional admission letter from top 500 ranked global institution",
        "Total family annual income from all sources not exceeding Rs. 8.00 Lakhs"
      ],
      status: "Applications Open - Closing Soon",
      statusColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800",
      deadline: "31 October 2026",
      slots: "20 Annual Slots",
      financialBenefit: "100% Tuition Fees + USD 15,400 / GBP 9,900 Annual Living Allowance",
    },
  ];

  const workflowSteps = [
    { stage: "Apply", label: "Digital Application", desc: "Aadhaar e-KYC registration & certificate upload" },
    { stage: "Verify", label: "AI Pre-Verification", desc: "Automated OCR quality & data mismatch checks" },
    { stage: "Scrutiny", label: "Officer Scrutiny", desc: "Desk evaluation & 7-day deficiency redressal" },
    { stage: "Selection", label: "Committee Selection", desc: "Transparent merit assessment & quota allotment" },
    { stage: "Award", label: "DBT Disbursal", desc: "Digital sanction & direct bank account transfer" },
  ];

  const keyFeatures = [
    {
      title: "AI-Assisted Document Verification",
      description:
        "Intelligent pre-submission OCR detects blurred certificates, cut-off seals, expired documents, and name mismatches before official desk scrutiny.",
      icon: Sparkles,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800",
    },
    {
      title: "Eligibility Assessment",
      description:
        "Dynamic, rules-driven eligibility filters evaluate age, academic qualifications, tribal category credentials, and income thresholds automatically.",
      icon: UserCheck,
      color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800",
    },
    {
      title: "Application Tracking",
      description:
        "End-to-end transparent status timeline allowing applicants and administrators to view live progression across every scrutiny milestone.",
      icon: Clock,
      color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800",
    },
    {
      title: "Deficiency Management",
      description:
        "Eliminates outright rejections by offering structured 7-day deficiency rectification windows with targeted feedback directly to applicants.",
      icon: AlertTriangle,
      color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800",
    },
    {
      title: "Transparent Workflow",
      description:
        "Every verification decision and status change is logged with timestamped, immutable audit trails with strict human officer oversight.",
      icon: ShieldCheck,
      color: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-800",
    },
    {
      title: "Digital Communication",
      description:
        "Automated multi-channel SMS alerts, email status notifications, and integrated grievance messaging keep applicants continuously informed.",
      icon: Send,
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800",
    },
  ];

  const importantNotices = [
    {
      id: 1,
      date: "28 September 2026",
      tag: "NFST Cycle",
      title: "NFST Application Window for Academic Year 2026-27 is Now Active",
      description:
        "ST scholars registered for regular full-time Ph.D. degrees in recognized institutions can submit online applications. Ensure your caste certificate is issued by a competent revenue magistrate.",
      link: "/notices",
    },
    {
      id: 2,
      date: "24 September 2026",
      tag: "Mandate Alert",
      title: "Mandatory Aadhaar-Seeded Bank Account for Direct Benefit Transfer (DBT)",
      description:
        "All applicants must ensure their bank accounts are active and linked with NPCI / Aadhaar to enable seamless stipend disbursements under PFMS without intermediate delays.",
      link: "/notices",
    },
    {
      id: 3,
      date: "19 September 2026",
      tag: "NOS Update",
      title: "National Overseas Scholarship (NOS) - First Tranche Scrutiny Underway",
      description:
        "Applications received before 15 September are under officer scrutiny. Applicants with deficiency notices are advised to upload corrected documents within their 7-day window.",
      link: "/notices",
    },
  ];

  return (
    <div className="space-y-16 pb-16 bg-[#FAF8F4] dark:bg-slate-950 transition-colors">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#030e1a] via-[#081e36] to-[#041324] text-white pt-16 sm:pt-20 pb-16 sm:pb-22 px-4 sm:px-8 border-b-4 border-[#D98A00]">
        
        {/* Dynamic Animated Ambient Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-gentle-drift"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* High-Tech Geometric Dot-Matrix Grid with Radial Mask */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30 [background-image:radial-gradient(#ffffff18_1px,transparent_1px)] [background-size:24px_24px]"
          style={{
            maskImage: "radial-gradient(circle at center, black 40%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 85%)"
          }}
        ></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6 sm:space-y-7">
          
          {/* Centered Floating Emblem and Government Accreditation */}
          <div className="flex flex-col items-center justify-center space-y-3.5 sm:space-y-4">
            
            {/* Emblem with Floating and Breathing Glow Ring */}
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse-glow"></div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white p-2.5 shadow-2xl border-2 border-emerald-400/50 flex items-center justify-center overflow-hidden animate-float-slow">
                <img src="/logo.png" alt="Aarohan Official Emblem" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Accreditation Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-inner backdrop-blur-md">
                <Landmark className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Ministry of Tribal Affairs - Government of India</span>
              </div>
              <span className="inline-flex items-center space-x-1.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>Session 2026-27 Active</span>
              </span>
            </div>
          </div>

          {/* Headline & Description */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              Aarohan: AI-Enabled Scholarship &amp; Fellowship Management System
            </h1>
            <p className="text-base sm:text-xl font-bold bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">
              Empowering Scheduled Tribe Scholars Across India &amp; Abroad
            </p>
            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto pt-1">
              A unified digital platform for transparent, efficient, and accessible scholarship administration. Pre-submission document inspection prevents avoidable rejections, while transparent merit scrutiny routes stipends directly via PFMS Direct Benefit Transfer (DBT).
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex flex-wrap gap-4 justify-center items-center">
            <Link
              href="/scholarships"
              className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl shadow-emerald-950/50 hover:shadow-emerald-700/60 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center space-x-2 text-sm sm:text-base cursor-pointer"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Explore Scholarships</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="bg-white text-[#0B2545] hover:bg-slate-100 font-black px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl transition-all flex items-center space-x-2 text-sm sm:text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShieldCheck className="w-5 h-5 text-[#0B2545]" />
              <span>Login</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. Active Schemes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-mota-green dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Current Application Cycle
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Active Schemes
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Flagship schemes providing direct financial assistance to Scheduled Tribe scholars across India and abroad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all p-6 sm:p-8 flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Header & Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${scheme.statusColor}`}>
                    {scheme.status}
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-mota-green dark:text-emerald-400" />
                    <span>Deadline: <strong className="text-slate-800 dark:text-slate-200">{scheme.deadline}</strong></span>
                  </div>
                </div>

                {/* Scheme Title & Description */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {scheme.name}
                  </h3>
                  <p className="text-xs font-semibold text-mota-navy dark:text-emerald-400 mt-0.5">
                    {scheme.type} | {scheme.slots}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {scheme.description}
                  </p>
                </div>

                {/* Financial Benefit Callout */}
                <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 p-3.5 rounded-xl">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Financial Support
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 mt-0.5">
                    {scheme.financialBenefit}
                  </p>
                </div>

                {/* Eligibility Snapshot */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Eligibility Snapshot
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {scheme.eligibilitySnapshot.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-mota-green dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* View Details Action */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href="/scholarships"
                  className="bg-mota-navy hover:bg-mota-navy-dark dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5 shadow-2xs"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/guide"
                  className="text-xs font-semibold text-mota-green dark:text-emerald-400 hover:underline flex items-center space-x-1"
                >
                  <span>Check Requirements</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. How the platform works (Visual and short) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-mota-navy dark:text-emerald-400 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            Transparent Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            How the Platform Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            A seamless, five-stage pipeline connecting applicants directly with scrutiny officers.
          </p>
        </div>

        {/* Short & Visual Pipeline: Apply → Verify → Scrutiny → Selection → Award */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-3 relative group">
                {/* Step Circle */}
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-mota-navy dark:border-emerald-400 flex items-center justify-center text-mota-navy dark:text-emerald-400 font-extrabold text-lg shadow-xs group-hover:scale-105 transition-transform">
                  {idx + 1}
                </div>

                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-mota-navy dark:text-emerald-400 block">
                    {step.stage}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {step.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Connecting arrow for larger screens */}
                {idx < workflowSteps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-5 text-slate-300 dark:text-slate-700 pointer-events-none">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link
              href="/guide"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-mota-navy dark:text-emerald-400 hover:underline"
            >
              <span>View In-Depth Application Timeline & Document Guidelines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Key Features (6 cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-mota-green dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Key Features
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Built to eliminate administrative bottlenecks, protect scholar rights, and expedite disbursements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xs hover:shadow-md transition-all space-y-3"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Important Notices (2-3 latest announcements) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Bell className="w-3.5 h-3.5" />
              <span>Announcements & Circulars</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Important Notices
            </h2>
          </div>
          <Link
            href="/notices"
            className="text-xs font-bold text-mota-navy dark:text-emerald-400 hover:underline flex items-center space-x-1"
          >
            <span>View All Notices & Circulars</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {importantNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-400">{notice.date}</span>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-bold">
                    {notice.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white hover:text-mota-navy transition-colors">
                  {notice.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {notice.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={notice.link}
                  className="text-xs font-semibold text-mota-navy dark:text-emerald-400 hover:underline flex items-center space-x-1"
                >
                  <span>Read Full Notice</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-mota-navy dark:bg-slate-900 text-white rounded-2xl p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black">
              Ready to submit or verify an application?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Access the scholarship portal now to explore available schemes, check eligibility guidelines, or manage applications.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/scholarships"
              className="bg-white hover:bg-slate-100 text-mota-navy font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
            >
              Explore Scholarships
            </Link>
            <Link
              href="/login"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
            >
              Login to Portal
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
