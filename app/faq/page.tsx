"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  DollarSign, 
  GraduationCap,
  Landmark
} from "lucide-react";

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const faqs = [
    {
      category: "general",
      categoryLabel: "General Portal",
      q: "What is TribalScholar and which ministry administers it?",
      a: "TribalScholar is the digital scholarship and fellowship management platform developed for the Ministry of Tribal Affairs (MoTA), Government of India. It provides end-to-end administration for flagship Central schemes such as NFST and NOS.",
    },
    {
      category: "ai",
      categoryLabel: "AI Scrutiny",
      q: "What is the exact role of AI in document verification?",
      a: "The AI system is strictly an intelligent assistant and does NOT decide approvals or rejections. It uses Optical Character Recognition (OCR) and computer vision to verify image quality (detecting blur, glare, or cut-offs), extract certificate numbers, and identify potential discrepancies before submission. Final eligibility and approvals are made by authorized Ministry Scrutiny Officers.",
    },
    {
      category: "eligibility",
      categoryLabel: "Eligibility Rules",
      q: "Can I apply for both NFST and NOS in the same academic year?",
      a: "Yes, eligible candidates can submit applications for both schemes if they meet the respective criteria. However, under Government of India guidelines, a scholar can only avail financial benefits from one active Central fellowship or scholarship scheme at any given time.",
    },
    {
      category: "eligibility",
      categoryLabel: "Eligibility Rules",
      q: "What is the family income ceiling for the National Fellowship (NFST)?",
      a: "Under the revised NFST guidelines, there is no mandatory ceiling on annual family income for research scholars pursuing regular full-time Ph.D. degrees. However, in cases of identical merit, preference is given to scholars from lower annual income brackets (< Rs. 6.00 Lakhs).",
    },
    {
      category: "documents",
      categoryLabel: "Document Requirements",
      q: "What should I do if my income or caste certificate is flagged as deficient?",
      a: "Log into your Student Dashboard and locate the 'Your Next Step' card. Click 'Fix Document Now' to inspect the specific reason (such as a faint revenue seal or name discrepancy). You have a 7-day grace period to re-scan and upload a clear document without losing your submission priority.",
    },
    {
      category: "dbt",
      categoryLabel: "DBT & Payment",
      q: "How are scholarship stipends disbursed to selected scholars?",
      a: "Stipends and allowances are credited directly into the scholar's bank account through the Public Financial Management System (PFMS) and Direct Benefit Transfer (DBT) using Aadhaar-seeded accounts. No manual cheques or institutional intermediaries are involved.",
    },
    {
      category: "documents",
      categoryLabel: "Document Requirements",
      q: "Who is the competent authority to issue the ST Caste Certificate?",
      a: "The Scheduled Tribe certificate must be issued by a competent revenue authority not below the rank of Sub-Divisional Officer (SDO), Sub-Divisional Magistrate (SDM), or District Collector. Certificates issued by local panchayats or non-gazetted bodies are not accepted.",
    },
    {
      category: "general",
      categoryLabel: "General Portal",
      q: "How can I escalate a query or file a grievance regarding my application?",
      a: "You can file a formal grievance via the Grievance Redressal desk on the Student Dashboard or submit a query through our Contact Us page. Every grievance is assigned a unique tracking token and is resolved within 15 working days.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "ALL" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAF8F4] dark:bg-slate-950 min-h-[calc(100vh-140px)] py-10 px-4 sm:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-mota-green dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Frequently Asked Questions
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Official Guidelines & Answers
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Find answers to commonly asked questions regarding MoTA scholarship schemes, eligibility conditions, AI document scrutiny, and DBT disbursals.
          </p>
        </div>

        {/* Search & Topic Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by question, keyword (e.g. income limit, DBT, seal, NFST)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: "ALL", label: "All Questions" },
              { id: "eligibility", label: "Eligibility Criteria" },
              { id: "ai", label: "AI Scrutiny & Quality" },
              { id: "documents", label: "Documents & Certificates" },
              { id: "dbt", label: "DBT & Payment" },
              { id: "general", label: "General & Portal" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
                  activeCategory === tab.id
                    ? "bg-mota-navy dark:bg-emerald-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center text-xs text-slate-500 dark:text-slate-400">
              No questions found matching your search. Please check the spelling or view all categories.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isExpanded = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isExpanded ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between space-x-3 text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-mota-green dark:text-emerald-400 uppercase tracking-wider block mb-1">
                        {faq.categoryLabel}
                      </span>
                      <span>{faq.q}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0 mt-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0 mt-1" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Banner */}
        <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Didn&apos;t find what you were looking for?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Submit an inquiry through our official support desk or ask our AI Assistant.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-mota-navy hover:bg-mota-navy-dark dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5"
          >
            <span>Contact Helpdesk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
