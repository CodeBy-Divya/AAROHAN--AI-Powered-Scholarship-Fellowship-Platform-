"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SCHEMES, Scheme } from "@/lib/data";
import { 
  GraduationCap, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Search,
  Filter
} from "lucide-react";

export default function DashboardScholarshipsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSchemes = SCHEMES.filter((scheme) => {
    const matchesCategory =
      selectedCategory === "ALL" ||
      (selectedCategory === "FELLOWSHIP" && (scheme.code === "NFST" || scheme.type.includes("Fellowship"))) ||
      (selectedCategory === "OVERSEAS" && scheme.code === "NOS") ||
      (selectedCategory === "PREMIER" && scheme.code === "TOPCLASS");

    const matchesSearch =
      searchQuery === "" ||
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Scholarship &amp; Fellowship Directory
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Active Central Sector schemes available for Scheduled Tribe scholars for Academic Session 2026-27.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-xl font-bold">
            {filteredSchemes.length} Schemes Available
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {[
            { id: "ALL", label: "All Schemes" },
            { id: "FELLOWSHIP", label: "Ph.D. Fellowships (NFST)" },
            { id: "OVERSEAS", label: "Overseas Study (NOS)" },
            { id: "PREMIER", label: "Top Class (IIT/IIM)" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedCategory === cat.id
                  ? "bg-[#0B2545] dark:bg-emerald-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search scheme name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3.5 py-1.5 text-xs border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* Scheme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${scheme.badgeColor}`}>
                  {scheme.type}
                </span>
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Deadline: <strong>{scheme.deadline}</strong></span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {scheme.name} ({scheme.code})
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-0.5">{scheme.hindiName}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {scheme.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Academic Level</span>
                  <strong className="text-slate-800 dark:text-slate-200">{scheme.level}</strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Quota Slots</span>
                  <strong className="text-slate-800 dark:text-slate-200">{scheme.slots}</strong>
                </div>
                <div className="col-span-2 pt-1 border-t border-slate-200/60 dark:border-slate-700 mt-1">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Stipend &amp; Grant</span>
                  <strong className="text-emerald-700 dark:text-emerald-400">{scheme.financialBenefit}</strong>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Link
                href={`/apply/${scheme.id}`}
                className="bg-[#0B2545] hover:bg-[#0D315D] dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs"
              >
                <span>Apply Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/guide"
                className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center space-x-1"
              >
                <span>Scheme Guidelines</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
