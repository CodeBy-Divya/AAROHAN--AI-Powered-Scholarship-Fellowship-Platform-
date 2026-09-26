"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import ThemeToggle from "@/components/ThemeToggle";
import { 
  Globe, 
  User, 
  LogOut, 
  ChevronDown, 
  LayoutDashboard, 
  ShieldCheck, 
  Building2, 
  Landmark, 
  Menu, 
  X
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardHref = () => {
    if (role === "officer") return "/dashboard/officer";
    if (role === "ministry") return "/dashboard/ministry";
    return "/dashboard/applicant";
  };

  // Strictly ordered: Home, About Us, Guide, Scholarships, FAQ, Contact Us
  const navLinks = [
    { href: "/", label: language === "hi" ? "मुख्य पृष्ठ" : "Home" },
    { href: "/about", label: language === "hi" ? "हमारे बारे में" : "About Us" },
    { href: "/guide", label: language === "hi" ? "मार्गदर्शिका" : "Guide" },
    { href: "/scholarships", label: language === "hi" ? "छात्रवृत्तियां" : "Scholarships" },
    { href: "/faq", label: language === "hi" ? "सामान्य प्रश्न" : "FAQ" },
    { href: "/contact", label: language === "hi" ? "संपर्क करें" : "Contact Us" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
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
              {language === "hi" ? "डीबीटी सक्षम राष्ट्रीय पोर्टल" : "DBT Enabled National Portal"}
            </span>
          </div>

          {/* Accessibility, Theme Toggle & Language */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Theme Toggle Button */}
            <div className="flex items-center">
              <ThemeToggle />
            </div>

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
          <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-mota-navy dark:text-emerald-400 shadow-inner flex-shrink-0 group-hover:border-mota-navy transition-colors">
            <Landmark className="w-6 h-6 text-mota-navy dark:text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-mota-navy dark:text-white">
                Tribal<span className="text-mota-green dark:text-emerald-400">Scholar</span>
              </span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-300 dark:border-slate-700 uppercase tracking-wider">
                MoTA Official
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              {language === "hi"
                ? "अनुसूचित जनजाति हेतु एआई-सक्षम छात्रवृत्ति एवं फैलोशिप प्रबंधन प्रणाली"
                : "AI-Enabled Scholarship & Fellowship Management System"}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links in Requested Order */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-700 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 border-b-2 ${
                  isActive
                    ? "text-mota-navy dark:text-emerald-400 border-mota-navy dark:border-emerald-400 font-bold"
                    : "border-transparent hover:text-mota-green dark:hover:text-emerald-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User Auth & Role Actions (Login / Register) */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg transition-all"
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
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight flex items-center gap-1.5">
                    {user.name}
                    <span
                      className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-extrabold ${
                        role === "applicant"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : role === "officer"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
                      }`}
                    >
                      {role}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[140px]">{user.roleTitle}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Signed in as</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{user.email}</p>
                    <p className="text-xs text-mota-green dark:text-emerald-400 font-medium mt-0.5">{user.roleTitle}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href={getDashboardHref()}
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2.5 text-mota-navy dark:text-emerald-400" />
                      Dashboard
                    </Link>

                    {/* Quick Role Switcher */}
                    <div className="px-4 pt-2 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Switch Role (Demo Mode)
                    </div>
                    <button
                      onClick={() => {
                        openAuthModal("applicant");
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center px-4 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <User className="w-3.5 h-3.5 mr-2 text-emerald-700" />
                      Switch to Student (Pooja)
                    </button>
                    <button
                      onClick={() => {
                        openAuthModal("officer");
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center px-4 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 mr-2 text-blue-700" />
                      Switch to Officer (Dr. Arvind)
                    </button>
                    <button
                      onClick={() => {
                        openAuthModal("ministry");
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center px-4 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <Building2 className="w-3.5 h-3.5 mr-2 text-purple-700" />
                      Switch to Ministry Admin
                    </button>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 font-medium"
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
              <Link
                href="/login"
                className="bg-mota-navy hover:bg-mota-navy-dark dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center space-x-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>{language === "hi" ? "लॉगिन / पंजीकरण" : "Login / Register"}</span>
              </Link>
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-mota-green dark:hover:text-emerald-400"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400"
          >
            Login / Register
          </Link>
        </div>
      )}
    </header>
  );
}
