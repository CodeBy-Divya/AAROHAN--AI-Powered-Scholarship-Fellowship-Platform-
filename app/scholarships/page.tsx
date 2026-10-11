"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { SCHEMES, Scheme } from "@/lib/data";
import { 
  Search, 
  RotateCcw, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  FileText,
  SlidersHorizontal,
  Lock,
  Check
} from "lucide-react";

export default function ScholarshipsPage() {
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [selectedIncome, setSelectedIncome] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedLevel("ALL");
    setSelectedType("ALL");
    setSelectedLocation("ALL");
    setSelectedIncome("ALL");
    setSelectedStatus("ALL");
  };

  const filteredSchemes = useMemo(() => {
    return SCHEMES.filter((scheme) => {
      // Keyword search
      const matchesSearch =
        searchQuery === "" ||
        scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Academic level filter
      const matchesLevel =
        selectedLevel === "ALL" ||
        (selectedLevel === "phd" && scheme.level.toLowerCase().includes("ph.d")) ||
        (selectedLevel === "masters" && scheme.level.toLowerCase().includes("master")) ||
        (selectedLevel === "ug" && (scheme.level.toLowerCase().includes("undergraduate") || scheme.code === "TOPCLASS")) ||
        (selectedLevel === "postmatric" && scheme.level.toLowerCase().includes("class 11")) ||
        (selectedLevel === "prematric" && scheme.level.toLowerCase().includes("class 9"));

      // Scheme type filter
      const matchesType =
        selectedType === "ALL" || scheme.type.toLowerCase().includes(selectedType.toLowerCase());

      // Location filter
      const matchesLocation =
        selectedLocation === "ALL" ||
        (selectedLocation === "abroad" && scheme.code === "NOS") ||
        (selectedLocation === "india" && scheme.code !== "NOS");

      // Income limit filter
      const matchesIncome =
        selectedIncome === "ALL" ||
        (selectedIncome === "2.5" && scheme.familyIncomeLimit.includes("2.50")) ||
        (selectedIncome === "6.0" && scheme.familyIncomeLimit.includes("6.00")) ||
        (selectedIncome === "none" && scheme.familyIncomeLimit.toLowerCase().includes("no mandatory"));

      // Open / Closed filter
      const matchesStatus =
        selectedStatus === "ALL" ||
        (selectedStatus === "open" && scheme.status !== "Closed") ||
        (selectedStatus === "closed" && scheme.status === "Closed");

      return matchesSearch && matchesLevel && matchesType && matchesLocation && matchesIncome && matchesStatus;
    });
  }, [searchQuery, selectedLevel, selectedType, selectedLocation, selectedIncome, selectedStatus]);

  return (
    <div className="bg-[#FAF8F4] dark:bg-slate-950 min-h-[calc(100vh-140px)] py-10 px-4 sm:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Title & Mission Banner */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-mota-green dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Ministry of Tribal Affairs - Central Schemes Directory
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Scheduled Tribe Scholarships & Fellowships
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Discover Central and Centrally Sponsored scholarship schemes configured with transparent eligibility criteria, automated verification, and direct DBT transfer via PFMS.
          </p>
        </div>

        {/* Interactive Eligibility & Filter Console */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-5 h-5 text-mota-navy dark:text-emerald-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Filter Schemes by Eligibility &amp; Status
              </h2>
            </div>
            
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Matching: <strong className="text-mota-navy dark:text-emerald-400">{filteredSchemes.length} of {SCHEMES.length} schemes</strong>
              </span>
              <button
                onClick={resetFilters}
                className="text-xs text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 flex items-center space-x-1 font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>

          {/* Filter Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-xs">
            {/* Search Input */}
            <div className="lg:col-span-1">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Keyword Search
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Ph.D, NOS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                />
              </div>
            </div>

            {/* Application Status Filter */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Cycle Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
              >
                <option value="ALL">All Statuses</option>
                <option value="open">Currently Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Academic Level */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Academic Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
              >
                <option value="ALL">All Levels</option>
                <option value="phd">Ph.D. / M.Phil (Research)</option>
                <option value="masters">Master&apos;s / Post-Graduation</option>
                <option value="ug">Undergraduate (Premier Degree)</option>
                <option value="postmatric">Class 11, 12 &amp; Diploma</option>
                <option value="prematric">Class 9 &amp; 10</option>
              </select>
            </div>

            {/* Scheme Type */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Scheme Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
              >
                <option value="ALL">All Types</option>
                <option value="fellowship">Fellowship</option>
                <option value="overseas">Overseas Scholarship</option>
                <option value="higher education">Top Class Education</option>
                <option value="post-matric">Post-Matric / Pre-Matric</option>
              </select>
            </div>

            {/* Study Location */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Study Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
              >
                <option value="ALL">All Locations</option>
                <option value="india">Pan India Institutions</option>
                <option value="abroad">Abroad / International</option>
              </select>
            </div>

            {/* Income Ceiling */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Income Limit
              </label>
              <select
                value={selectedIncome}
                onChange={(e) => setSelectedIncome(e.target.value)}
                className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
              >
                <option value="ALL">Any Income Limit</option>
                <option value="none">No Mandatory Limit</option>
                <option value="6.0">Up to ₹6.0 Lakhs/yr</option>
                <option value="2.5">Up to ₹2.5 Lakhs/yr</option>
              </select>
            </div>
          </div>
        </div>

        {/* Schemes Cards Grid */}
        {filteredSchemes.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No matching schemes found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Try adjusting your filter options or click reset to view all available MoTA schemes.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 bg-mota-navy text-white text-xs font-bold px-4 py-2 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSchemes.map((scheme) => {
              const isClosed = scheme.status === "Closed";

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
                        <span>Deadline: <strong className={isClosed ? "text-slate-600 dark:text-slate-400" : "text-slate-900 dark:text-white"}>{scheme.deadline}</strong></span>
                      </div>
                    </div>

                    {/* Scheme Title & Description */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {scheme.name} ({scheme.code})
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 italic">{scheme.hindiName}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{scheme.description}</p>
                    </div>

                    {/* Highlights Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Academic Level</span>
                        <strong className="text-slate-800 dark:text-slate-200">{scheme.level}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Annual Slots</span>
                        <strong className="text-slate-800 dark:text-slate-200">{scheme.slots}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Income Limit</span>
                        <strong className="text-slate-800 dark:text-slate-200">{scheme.familyIncomeLimit}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Location</span>
                        <strong className="text-slate-800 dark:text-slate-200">
                          {scheme.code === "NOS" ? "Abroad (Top 500 QS)" : "Pan India"}
                        </strong>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-slate-200/60 dark:border-slate-700 mt-1">
                        <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Financial Support</span>
                        <strong className="text-emerald-700 dark:text-emerald-400">{scheme.financialBenefit}</strong>
                      </div>
                    </div>

                    {/* Eligibility Rules */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                        Eligibility Requirements:
                      </h4>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        {scheme.eligibility.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Required Documents */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                        Required Documents for Verification:
                      </h4>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        {scheme.documentsRequired.map((doc, idx) => (
                          <li key={idx} className="flex items-start space-x-1.5">
                            <FileText className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    {isClosed ? (
                      <div className="flex items-center space-x-2">
                        <button
                          disabled
                          className="bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold px-4 py-2 rounded-lg cursor-not-allowed"
                        >
                          Applications Closed
                        </button>
                        <span className="text-[11px] text-slate-400">Applications closed for this academic cycle</span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center justify-between gap-2 w-full">
                        <Link
                          href={
                            user
                              ? `/dashboard/apply/${scheme.id}`
                              : `/login?mode=register&redirect=${encodeURIComponent(`/dashboard/apply/${scheme.id}`)}`
                          }
                          className="bg-mota-navy hover:bg-mota-navy-dark dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center space-x-1.5 shadow-xs"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        {!user && (
                          <span className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center space-x-1">
                            <span>Registration / Sign In mandatory to apply</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
