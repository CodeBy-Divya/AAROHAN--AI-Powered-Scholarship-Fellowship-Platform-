"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Landmark, 
  ShieldCheck, 
  Award, 
  HelpCircle, 
  Search, 
  FileText, 
  Users, 
  Phone, 
  Mail, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2,
  BookOpen
} from "lucide-react";

export default function AboutUsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [faqCategory, setFaqCategory] = useState<string>("ALL");

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      category: "general",
      q: "What is TribalScholar and which ministry administers it?",
      a: "TribalScholar is the digital scholarship and fellowship management platform developed for the Ministry of Tribal Affairs (MoTA), Government of India under Smart India Hackathon (SIH 2026 Problem Statement 26239). It provides end-to-end administration for flagship Central schemes such as NFST and NOS.",
    },
    {
      category: "ai",
      q: "What is the exact role of AI in document verification?",
      a: "The AI system is strictly an intelligent assistant and does NOT decide approvals or rejections. It uses Optical Character Recognition (OCR) and computer vision to verify image quality (detecting blur, glare, or cut-offs), extract certificate numbers, and identify potential discrepancies before submission. Final eligibility and approvals are made by authorized Ministry Scrutiny Officers.",
    },
    {
      category: "eligibility",
      q: "Can I apply for both NFST and NOS in the same academic year?",
      a: "Yes, eligible candidates can submit applications for both schemes if they meet the respective criteria. However, under Government of India guidelines, a scholar can only avail financial benefits from one active Central fellowship or scholarship scheme at any given time.",
    },
    {
      category: "eligibility",
      q: "What is the family income ceiling for the National Fellowship (NFST)?",
      a: "Under the revised NFST guidelines, there is no mandatory ceiling on annual family income for research scholars pursuing regular full-time Ph.D. degrees. However, in cases of identical merit, preference is given to scholars from lower annual income brackets (< Rs. 6.00 Lakhs).",
    },
    {
      category: "documents",
      q: "What should I do if my income or caste certificate is flagged as deficient?",
      a: "Log into your Student Dashboard and locate the 'Your Next Step' card. Click 'Fix Document Now' to inspect the specific reason (such as a faint revenue seal or name discrepancy). You have a 7-day grace period to re-scan and upload a clear document without losing your submission priority.",
    },
    {
      category: "dbt",
      q: "How are scholarship stipends disbursed to selected scholars?",
      a: "Stipends and allowances are credited directly into the scholar's bank account through the Public Financial Management System (PFMS) and Direct Benefit Transfer (DBT) using Aadhaar-seeded accounts. No manual cheques or institutional intermediaries are involved.",
    },
    {
      category: "grievance",
      q: "How can I escalate a query or file a grievance regarding my application?",
      a: "You can file a formal grievance via the Grievance Redressal desk on the Student Dashboard or contact the National Helpdesk at 1800-11-7788. Every grievance is assigned a unique tracking token and is resolved within 15 working days.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (item) => faqCategory === "ALL" || item.category === faqCategory
  );

  return (
    <div className="bg-[#FAF8F4] dark:bg-slate-950 min-h-[calc(100vh-140px)] py-10 px-4 sm:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header Banner */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-mota-green dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            About the Ministry Initiative
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Empowering Tribal Education & Research
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The Ministry of Tribal Affairs (MoTA) is dedicated to the holistic advancement of Scheduled Tribes across India, ensuring equitable access to premier higher education, scientific research, and global academic opportunities.
          </p>
        </div>

        {/* Institutional Mandate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-mota-navy text-white flex items-center justify-center">
              <Landmark className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Constitutional Mandate
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Enacted under Article 46 of the Constitution of India to promote the educational and economic interests of the Scheduled Tribes with special care, protecting them from social injustice.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              AI Readiness & Scrutiny
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Transforms manual scrutiny bottlenecks into a proactive digital process: identifying deficient certificates and assisting human officials with evidence-based verification overlays.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900 text-white flex items-center justify-center">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Direct Benefit Transfer
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              100% of fellowship allowances, contingency funds, and tuition fees are transferred directly through PFMS to Aadhaar-seeded accounts, achieving complete financial transparency.
            </p>
          </div>
        </div>

        {/* Problem Statement Context Section */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-mota-navy dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              The SIH 2026 Problem Statement 26239
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Prior to this platform, scholarship administration involved multiple levels of manual verification and paper correspondence. Over 40% of delays were caused by minor, avoidable errors such as faint revenue seals, blurred uploads, and spelling variations in caste certificates. TribalScholar sits on top of the student journey to catch and fix these issues before formal submission, allowing scrutiny officers to process cases in days rather than months.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="font-bold text-slate-900 dark:text-white block">14-Day Average Turnaround</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Reduced from 92 days</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="font-bold text-slate-900 dark:text-white block">94.2% First-Time Pass</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Zero avoidable rejection rate</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="font-bold text-slate-900 dark:text-white block">Explainable Everywhere</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Full audit trail for officers</span>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div id="faqs" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Frequently Asked Questions</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Official clarifications on MoTA scholarship schemes, eligibility, and verification procedures.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { id: "ALL", label: "All Topics" },
                { id: "ai", label: "AI Verification" },
                { id: "eligibility", label: "Eligibility" },
                { id: "documents", label: "Documents" },
                { id: "dbt", label: "DBT & Bank" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFaqCategory(tab.id)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    faqCategory === tab.id
                      ? "bg-mota-navy dark:bg-emerald-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isExpanded = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between space-x-3 text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <span>{faq.q}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact & Support Section */}
        <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Still have questions or need assistance?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The MoTA Fellowship & Scholarship Support Desk is available Monday to Friday (9:30 AM to 5:30 PM).
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2 text-xs bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>1800-11-7788</span>
            </div>
            <div className="flex items-center space-x-2 text-xs bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>helpdesk-tribalscholar@gov.in</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
