"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { SCHEMES, Scheme } from "@/lib/data";
import { 
  GraduationCap, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Search,
  RotateCcw,
  SlidersHorizontal,
  FileText,
  Coins,
  Bot,
  HelpCircle,
  Building2,
  Check,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function DashboardScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(null);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setSelectedStatus("ALL");
  };

  const filteredSchemes = useMemo(() => {
    return SCHEMES.filter((scheme) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "ALL" ||
        (selectedCategory === "FELLOWSHIP" && (scheme.code === "NFST" || scheme.type.includes("Fellowship"))) ||
        (selectedCategory === "OVERSEAS" && scheme.code === "NOS") ||
        (selectedCategory === "PREMIER" && scheme.code === "TOPCLASS") ||
        (selectedCategory === "POSTMATRIC" && scheme.code === "PMS-ST") ||
        (selectedCategory === "PREMATRIC" && scheme.code === "PRE-MATRIC");

      // Status filter
      const matchesStatus =
        selectedStatus === "ALL" ||
        (selectedStatus === "open" && scheme.status !== "Closed") ||
        (selectedStatus === "closed" && scheme.status === "Closed");

      // Search query
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        scheme.name.toLowerCase().includes(query) ||
        scheme.code.toLowerCase().includes(query) ||
        scheme.hindiName.toLowerCase().includes(query) ||
        scheme.level.toLowerCase().includes(query) ||
        scheme.description.toLowerCase().includes(query) ||
        scheme.financialBenefit.toLowerCase().includes(query);

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [selectedCategory, selectedStatus, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedSchemeId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Page Title & Summary Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Ministry of Tribal Affairs (MoTA)
            </span>
            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full font-semibold">
              Academic Session 2026-27
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
            Scholarships &amp; Fellowships for ST Students
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Explore all Central Government scholarship schemes for higher education, research fellowships, and overseas study with complete eligibility, stipend rates, and required documents in simple language.
          </p>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800 shrink-0">
          <span className="text-xs text-slate-500 dark:text-slate-400">Available Schemes</span>
          <span className="text-xl font-black text-[#0B2545] dark:text-emerald-400">
            {filteredSchemes.length} of {SCHEMES.length}
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "ALL", label: "All Schemes" },
              { id: "FELLOWSHIP", label: "Ph.D. Fellowships (NFST)" },
              { id: "OVERSEAS", label: "Study Abroad (NOS)" },
              { id: "PREMIER", label: "Top Class (IIT / IIM / AIIMS)" },
              { id: "POSTMATRIC", label: "Post-Matric (PMS-ST)" },
              { id: "PREMATRIC", label: "Pre-Matric (Class 9-10)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  selectedCategory === tab.id
                    ? "bg-[#0B2545] dark:bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box & Status Filter */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search scheme name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none font-medium"
            >
              <option value="ALL">All Status</option>
              <option value="open">Currently Open</option>
              <option value="closed">Closed</option>
            </select>

            {(searchQuery || selectedCategory !== "ALL" || selectedStatus !== "ALL") && (
              <button
                onClick={resetFilters}
                className="p-1.5 text-slate-500 hover:text-red-600 transition-colors"
                title="Reset Filters"
                aria-label="Reset Filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scholarship Cards Grid - Styled like Public Website */}
      {filteredSchemes.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No matching scholarships found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try searching for something else or reset your filters to see all available schemes.
          </p>
          <button
            onClick={resetFilters}
            className="mt-2 bg-[#0B2545] text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme) => {
            const isClosed = scheme.status === "Closed";
            const isExpanded = expandedSchemeId === scheme.id;

            return (
              <div
                key={scheme.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl border ${
                  isClosed
                    ? "border-slate-300 dark:border-slate-800 opacity-90"
                    : "border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700"
                } shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  {/* Top Status & Badge Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      {isClosed ? (
                        <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                          <span>Closed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>Currently Open</span>
                        </span>
                      )}
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${scheme.badgeColor}`}>
                        {scheme.type}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        Deadline:{" "}
                        <strong className={isClosed ? "text-slate-600 dark:text-slate-400" : "text-slate-900 dark:text-white"}>
                          {scheme.deadline}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Scheme Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {scheme.name} ({scheme.code})
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 italic font-medium">
                      {scheme.hindiName}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {scheme.description}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold">Academic Level</span>
                      <strong className="text-slate-800 dark:text-slate-200">{scheme.level}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold">Annual Slots</span>
                      <strong className="text-slate-800 dark:text-slate-200">{scheme.slots}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold">Family Income Limit</span>
                      <strong className="text-slate-800 dark:text-slate-200">{scheme.familyIncomeLimit}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold">Study Location</span>
                      <strong className="text-slate-800 dark:text-slate-200">
                        {scheme.code === "NOS" ? "Abroad (Top 500 QS Universities)" : "Pan India Recognized Institutes"}
                      </strong>
                    </div>
                    <div className="col-span-2 pt-1.5 border-t border-slate-200/60 dark:border-slate-700 mt-1">
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-semibold">Financial Support &amp; Stipend</span>
                      <strong className="text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm">{scheme.financialBenefit}</strong>
                    </div>
                  </div>

                  {/* Eligibility Rules in Simple Language */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      Who is Eligible (Simple Criteria):
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {scheme.eligibility.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Financial Breakdown in Simple Language */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center space-x-1.5">
                      <Coins className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Financial Benefits You Receive:</span>
                    </h4>
                    <div className="bg-emerald-50/60 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/40 text-xs space-y-1.5 text-emerald-900 dark:text-emerald-200">
                      {scheme.stipendBreakdown && scheme.stipendBreakdown.length > 0 ? (
                        scheme.stipendBreakdown.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-start justify-between gap-2 border-b border-emerald-100/70 dark:border-emerald-900/40 pb-1 last:border-0 last:pb-0">
                            <div>
                              <strong className="block text-slate-900 dark:text-white font-bold">{item.component}</strong>
                              <span className="text-[11px] text-slate-600 dark:text-slate-400">{item.details}</span>
                            </div>
                            <span className="font-extrabold text-emerald-700 dark:text-emerald-400 whitespace-nowrap text-xs">
                              {item.amount}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p>{scheme.financialBenefit}</p>
                      )}
                      <div className="pt-1 text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">
                        Direct Benefit Transfer (DBT): Money is credited directly to your Aadhaar-linked bank account.
                      </div>
                    </div>
                  </div>

                  {/* Required Documents in Simple Language */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      Documents You Need to Upload:
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      {scheme.documentsRequired.map((doc, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Section for Detailed Steps & Contact */}
                  {isExpanded && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
                      {scheme.selectionStages && (
                        <div>
                          <strong className="text-slate-800 dark:text-slate-200 block mb-1">
                            Selection &amp; Payment Process:
                          </strong>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                            {scheme.selectionStages.map((stage) => (
                              <div key={stage.stageNumber} className="bg-slate-50 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                                <span className="font-bold text-[#0B2545] dark:text-emerald-400">
                                  Step {stage.stageNumber}: {stage.title}
                                </span>
                                <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{stage.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {scheme.nodalContact && (
                        <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] space-y-1">
                          <span className="font-bold text-slate-800 dark:text-slate-200 block">Nodal Helpline &amp; Official Contact:</span>
                          <p className="text-slate-600 dark:text-slate-400">
                            <strong>Division:</strong> {scheme.nodalContact.division} | <strong>Helpline:</strong> {scheme.nodalContact.helpline}
                          </p>
                          <p className="text-slate-600 dark:text-slate-400">
                            <strong>Email:</strong> {scheme.nodalContact.email} | <strong>Circular No:</strong> {scheme.nodalContact.circularNo}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Toggle More Details Button */}
                  <div className="text-center pt-1">
                    <button
                      onClick={() => toggleExpand(scheme.id)}
                      className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center space-x-1"
                    >
                      <span>{isExpanded ? "Hide Extra Details" : "Show Full Details & Process"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  {isClosed ? (
                    <div className="flex items-center space-x-2">
                      <button
                        disabled
                        className="bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold px-4 py-2 rounded-xl cursor-not-allowed"
                      >
                        Applications Closed
                      </button>
                      <span className="text-[11px] text-slate-400">Closed for current session</span>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Direct Apply Button */}
                      <Link
                        href={`/dashboard/apply/${scheme.id}`}
                        className="bg-[#0B2545] hover:bg-[#0D315D] dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs"
                      >
                        <span>Apply Online</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {/* Ask AI Assistant */}
                      <Link
                        href={`/dashboard/chatbot?query=${encodeURIComponent(
                          `Tell me in simple words about the ${scheme.name} (${scheme.code}) scholarship, its eligibility, and what documents I need to apply.`
                        )}`}
                        className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5 border border-slate-200 dark:border-slate-700"
                      >
                        <Bot className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Ask AI Assistant</span>
                      </Link>
                    </div>
                  )}

                  <Link
                    href="/dashboard/help"
                    className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center space-x-1"
                  >
                    <span>Scheme Guidelines</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
