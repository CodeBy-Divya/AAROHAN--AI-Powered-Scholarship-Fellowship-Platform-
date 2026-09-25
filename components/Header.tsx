"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { 
  Globe, 
  User, 
  LogOut, 
  ChevronDown, 
  LayoutDashboard, 
  ShieldCheck, 
  Building2, 
  FileCheck,
  Search,
  BookOpen,
  Landmark
} from "lucide-react";

export default function Header() {
  const { 
    user, 
    role, 
    logout, 
    openAuthModal, 
    language, 
    setLanguage, 
    fontSize, 
    setFontSize, 
    highContrast, 
    setHighContrast 
  } = useAuth();
  
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const getDashboardHref = () => {
    if (role === "officer") return "/dashboard/officer";
    if (role === "ministry") return "/dashboard/ministry";
    return "/dashboard/applicant";
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm bg-white">
      {/* Top Government Strip */}
      <div className="bg-[#061528] text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-block w-4 h-2.5 rounded-xs overflow-hidden border border-slate-500 flex-shrink-0">
              <span className="block h-1/3 bg-[#FF9933]"></span>
              <span className="block h-1/3 bg-white"></span>
              <span className="block h-1/3 bg-[#138808]"></span>
            </span>
            <span className="font-medium text-slate-200">
              {language === "hi" ? "भारत सरकार | जनजातीय कार्य मंत्रालय" : "Government of India | Ministry of Tribal Affairs"}
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-emerald-400 font-semibold tracking-wide">
              {language === "hi" ? "डीबीटी सक्षम राष्ट्रीय पोर्टल (SIH-26239)" : "DBT Enabled National Portal (SIH-26239)"}
            </span>
          </div>

          {/* Accessibility & Utilities */}
          <div className="flex items-center space-x-4">
            {/* Font Size Adjusters */}
            <div className="flex items-center space-x-1 border border-slate-700 rounded px-1.5 py-0.5 text-[11px]">
              <span className="text-slate-400 mr-1 text-[10px]">Text:</span>
              <button
                onClick={() => setFontSize("normal")}
                className={`px-1 rounded hover:text-white ${fontSize === "normal" ? "bg-slate-700 text-white font-bold" : ""}`}
                title="Default Font Size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize("large")}
                className={`px-1 rounded hover:text-white ${fontSize === "large" ? "bg-slate-700 text-white font-bold" : ""}`}
                title="Larger Font Size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize("xlarge")}
                className={`px-1 rounded hover:text-white ${fontSize === "xlarge" ? "bg-slate-700 text-white font-bold" : ""}`}
                title="Extra Large Font Size"
              >
                A++
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`text-[11px] px-2 py-0.5 rounded border border-slate-700 hover:text-white ${
                highContrast ? "bg-amber-400 text-slate-900 font-bold" : ""
              }`}
            >
              {highContrast ? "Normal" : "Contrast"}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center space-x-1 text-[11px]">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <button
                onClick={() => setLanguage("en")}
                className={`px-1.5 py-0.5 rounded ${language === "en" ? "bg-mota-green text-white font-semibold" : "hover:text-white"}`}
              >
                English
              </button>
              <span>/</span>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-1.5 py-0.5 rounded ${language === "hi" ? "bg-mota-green text-white font-semibold" : "hover:text-white"}`}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Official Banner & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Ministry Brand & Landmark Icon */}
        <Link href="/" className="flex items-center space-x-3.5 group">
          <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-mota-navy shadow-inner flex-shrink-0 group-hover:border-mota-navy transition-colors">
            <Landmark className="w-6 h-6 text-mota-navy" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-mota-navy">
                Tribal<span className="text-mota-green">Scholar</span>
              </span>
              <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-300 uppercase tracking-wider">
                MoTA Official
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {language === "hi"
                ? "अनुसूचित जनजाति हेतु एआई-सक्षम छात्रवृत्ति एवं फैलोशिप प्रबंधन प्रणाली"
                : "AI-Enabled Scholarship & Fellowship Management System"}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-700">
          <Link href="/#schemes" className="hover:text-mota-green transition-colors flex items-center space-x-1">
            <BookOpen className="w-4 h-4 text-mota-green" />
            <span>{language === "hi" ? "योजनाएं (Schemes)" : "Schemes"}</span>
          </Link>
          <Link href="/#eligibility" className="hover:text-mota-green transition-colors flex items-center space-x-1">
            <Search className="w-4 h-4 text-mota-teal" />
            <span>{language === "hi" ? "पात्रता जांचें" : "Eligibility Checker"}</span>
          </Link>
          <Link href="/#process" className="hover:text-mota-green transition-colors flex items-center space-x-1">
            <FileCheck className="w-4 h-4 text-mota-navy" />
            <span>{language === "hi" ? "आवेदन प्रक्रिया" : "How It Works"}</span>
          </Link>
          <Link href="/#faq" className="hover:text-mota-green transition-colors">
            {language === "hi" ? "सामान्य प्रश्न (FAQs)" : "FAQs"}
          </Link>
        </nav>

        {/* User Auth & Role Actions */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-all"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-xs ${
                    role === "applicant"
                      ? "bg-mota-green"
                      : role === "officer"
                      ? "bg-mota-navy"
                      : "bg-purple-700"
                  }`}
                >
                  {user.name.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1.5">
                    {user.name}
                    <span
                      className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-extrabold ${
                        role === "applicant"
                          ? "bg-emerald-100 text-emerald-800"
                          : role === "officer"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {role}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate max-w-[140px]">{user.roleTitle}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-500">Signed in as</p>
                    <p className="text-sm font-bold text-slate-900">{user.email}</p>
                    <p className="text-xs text-mota-green font-medium mt-0.5">{user.roleTitle}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href={getDashboardHref()}
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2.5 text-mota-navy" />
                      Dashboard
                    </Link>

                    {/* Quick Role Switcher for seamless demo */}
                    <div className="px-4 pt-2 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Switch Role (Demo Mode)
                    </div>
                    <button
                      onClick={() => {
                        openAuthModal("applicant");
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                    >
                      <User className="w-3.5 h-3.5 mr-2 text-emerald-700" />
                      Switch to Student (Pooja)
                    </button>
                    <button
                      onClick={() => {
                        openAuthModal("officer");
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 mr-2 text-blue-700" />
                      Switch to Officer (Dr. Arvind)
                    </button>
                    <button
                      onClick={() => {
                        openAuthModal("ministry");
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                    >
                      <Building2 className="w-3.5 h-3.5 mr-2 text-purple-700" />
                      Switch to Ministry Admin
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                    >
                      <LogOut className="w-4 h-4 mr-2.5" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => openAuthModal("applicant")}
                className="bg-mota-navy hover:bg-mota-navy-dark text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center space-x-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>{language === "hi" ? "लॉगिन / पंजीकरण" : "Login / Register"}</span>
              </button>
            </div>
          )}

          {/* Quick link to Dashboard if logged in */}
          {user && (
            <Link
              href={getDashboardHref()}
              className="hidden sm:flex items-center space-x-1.5 bg-mota-green hover:bg-mota-green-light text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{language === "hi" ? "डैशबोर्ड" : "Dashboard"}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
