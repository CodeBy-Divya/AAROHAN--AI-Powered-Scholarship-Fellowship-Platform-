"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { SCHEMES, Scheme } from "@/lib/data";
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  Globe2, 
  DollarSign, 
  FileText,
  Building2,
  SlidersHorizontal
} from "lucide-react";

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [selectedIncome, setSelectedIncome] = useState("ALL");

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedLevel("ALL");
    setSelectedType("ALL");
    setSelectedLocation("ALL");
    setSelectedIncome("ALL");
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
        (selectedLevel === "postmatric" && scheme.level.toLowerCase().includes("class 11"));

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

      return matchesSearch && matchesLevel && matchesType && matchesLocation && matchesIncome;
    });
  }, [searchQuery, selectedLevel, selectedType, selectedLocation, selectedIncome]);

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
            Discover Central and Centrally Sponsored scholarship schemes configured with transparent eligibility criteria, automated document readiness verification, and direct DBT transfer.
          </p>
        </div>

        {/* Interactive Eligibility & Filter Console */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-5 h-5 text-mota-navy dark:text-emerald-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Filter Schemes by Eligibility Criteria
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            {/* Search Input */}
            <div className="lg:col-span-1">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Keyword Search
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Ph.D, NOS, IIT..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                />
              </div>
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
                <option value="postmatric">Class 11, 12 & Diploma</option>
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
                <option value="ALL">All Scheme Types</option>
                <option value="fellowship">National Fellowship</option>
                <option value="overseas">Overseas Scholarship</option>
                <option value="higher education">Premier Institute Higher Ed</option>
                <option value="post-matric">Post-Matric Financial Aid</option>
              </select>
            </div>

            {/* Study Destination */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Study Destination
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
              >
                <option value="ALL">All Destinations</option>
                <option value="india">In India (Universities, IITs, NITs)</option>
                <option value="abroad">Abroad (Top 500 QS Universities)</option>
              </select>
            </div>

            {/* Annual Income Limit */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Annual Family Income
              </label>
              <select
                value={selectedIncome}
                onChange={(e) => setSelectedIncome(e.target.value)}
                className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
              >
                <option value="ALL">All Income Brackets</option>
                <option value="none">No Mandatory Ceiling (NFST)</option>
                <option value="6.0">Up to Rs. 6.00 Lakhs / annum</option>
                <option value="2.5">Up to Rs. 2.50 Lakhs / annum</option>
              </select>
            </div>
          </div>
        </div>

        {/* Schemes Results Grid */}
        {filteredSchemes.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
            <GraduationCap className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
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
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Badge & Deadline */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${scheme.badgeColor}`}>
                      {scheme.type}
                    </span>
                    <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Deadline: <strong>{scheme.deadline}</strong></span>
                    </div>
                  </div>

                  {/* Scheme Title & Hindi Name */}
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

                {/* Actions */}
                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/apply/${scheme.id}`}
                    className="bg-mota-navy hover:bg-mota-navy-dark dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5 shadow-xs"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/apply/${scheme.id}`}
                    className="text-xs font-semibold text-mota-green dark:text-emerald-400 hover:underline"
                  >
                    Verify Readiness Checklist
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
