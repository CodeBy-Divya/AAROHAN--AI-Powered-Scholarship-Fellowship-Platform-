"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import ThemeToggle from "@/components/ThemeToggle";
import { 
  Landmark, 
  Home, 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar,
  HelpCircle, 
  User, 
  LogOut, 
  Bell, 
  Menu, 
  X, 
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Building2,
  ExternalLink,
  Sparkles
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, logout, isHydrated } = useAuth();
  const isChatbotPage = pathname === "/dashboard/chatbot";

  // Dashboard route guard: redirect unauthenticated users to login
  useEffect(() => {
    if (isHydrated && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isHydrated, user, pathname, router]);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Click-outside listener for profile menu and notifications dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setProfileMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menus on route navigation
  useEffect(() => {
    setProfileMenuOpen(false);
    setNotificationsOpen(false);
  }, [pathname]);

  // Live ticking clock for bottom-left sidebar
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const dateStr = now.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      setCurrentTime(timeStr);
      setCurrentDate(dateStr);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = [
    {
      label: "Home",
      href: "/dashboard/applicant",
      icon: Home,
      exact: true,
    },
    {
      label: "Scholarships",
      href: "/dashboard/scholarships",
      icon: GraduationCap,
    },
    {
      label: "Applications",
      href: "/dashboard/applications",
      icon: FileText,
    },
    {
      label: "Status",
      href: "/dashboard/status",
      icon: CheckCircle2,
    },
    {
      label: "Grievances",
      href: "/dashboard/grievances",
      icon: AlertCircle,
    },
    {
      label: "AI Assistant",
      href: "/dashboard/chatbot",
      icon: Sparkles,
    },
  ];

  const bottomNavItems = [
    {
      label: "Help / About",
      href: "/dashboard/help",
      icon: HelpCircle,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "Action Required: ST Certificate Scrutiny",
      desc: "Revenue seal was faint in your upload. 7-day correction window active until 07 Oct.",
      time: "2 hours ago",
      urgent: true,
    },
    {
      id: 2,
      title: "NFST Application Cycle Active",
      desc: "Academic Year 2026-27 window is accepting online research submissions.",
      time: "1 day ago",
      urgent: false,
    },
    {
      id: 3,
      title: "Bank Account DBT Validated",
      desc: "Your Aadhaar NPCI mapper check succeeded via PFMS gateway.",
      time: "2 days ago",
      urgent: false,
    },
  ];

  if (!isHydrated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 text-xs text-slate-500">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-semibold text-slate-600 dark:text-slate-300">Checking credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* 1. Left Sidebar - Fixed Full Viewport Height (100vh, glued to top and bottom on all zoom scales) */}
      <aside
        className={`sidebar-viewport-pinned fixed top-0 bottom-0 left-0 inset-y-0 z-40 w-64 h-screen min-h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:transform-none ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{ top: 0, bottom: 0, height: "100vh" }}
      >
        {/* Top Profile Header (Stacked Column & Centered) */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex-shrink-0 flex flex-col items-center text-center relative">
          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden absolute top-3 right-3 p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Close Sidebar"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top: Profile Logo / Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0B2545] to-emerald-700 text-white font-black text-2xl flex items-center justify-center shadow-md ring-4 ring-emerald-100 dark:ring-emerald-950/60 flex-shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : "P"}
          </div>

          {/* Middle: User Full Name */}
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mt-3 truncate max-w-full px-2">
            {user ? user.name : "Pooja Rameshwar"}
          </h2>

          {/* Bottom: Role tag labeled "Scholarship Applicant" */}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-2xs mt-2">
            Scholarship Applicant
          </span>
        </div>

        {/* Middle Section: Navigation Items (Strictly the only scrollable area inside the sidebar) */}
        <div className="flex-1 overflow-y-auto min-h-0 px-3 py-4 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-1">
            Main Menu
          </span>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-[#0B2545] text-white shadow-xs dark:bg-emerald-700"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-500 dark:text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />}
              </Link>
            );
          })}
        </div>

        {/* Bottom Section: Date & Time, Help/About, Profile, Logout (Non-scrolling) */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-900/50 flex-shrink-0">
          {/* Live Date and Time Display (Center-aligned with Clock & Calendar icons) */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center space-y-2 shadow-2xs">
            <div className="flex items-center justify-center space-x-1.5 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Indian Standard Time (IST)</span>
            </div>

            {/* Time with Clock icon */}
            <div className="flex items-center justify-center space-x-1.5 text-slate-900 dark:text-white">
              <Clock className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
              <span className="text-xs font-black font-mono tracking-wider">
                {currentTime || "Loading time..."}
              </span>
            </div>

            {/* Date with Calendar icon */}
            <div className="flex items-center justify-center space-x-1.5 text-slate-600 dark:text-slate-400 text-[10px] font-semibold pt-1 border-t border-slate-100 dark:border-slate-700/60 w-full">
              <Calendar className="w-3 h-3 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
              <span>{currentDate}</span>
            </div>
          </div>

          {/* Bottom Nav Links: Help/About & Profile */}
          <div className="space-y-1">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Sidebar Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout to Public Portal</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content Area (Offset by sidebar on desktop) */}
      <div className={`lg:pl-64 flex flex-col ${isChatbotPage ? "h-screen max-h-screen overflow-hidden" : "min-h-screen"}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 flex-shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between shadow-xs">
          {/* Left: Mobile hamburger & Logo with Portal Name */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Sidebar"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo & Scholarship Portal Name */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center p-1 shadow-xs border border-slate-200 dark:border-slate-700 overflow-hidden flex-shrink-0">
                <img src="/logo.png" alt="Aarohan Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-black tracking-tight text-[#0B2545] dark:text-white">
                    Aarohan
                  </span>
                  <span className="hidden sm:inline-block bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    MoTA Official
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
                  Scholarship &amp; Fellowship Management Portal
                </p>
              </div>
            </div>
          </div>

          {/* Right Header Actions: Theme Toggle, Notifications, User info, Logout */}
          <div className="flex items-center space-x-3">
            {/* Light/Dark Theme Toggle */}
            <ThemeToggle />

            {/* Notification Button & Dropdown */}
            <div className="relative" ref={notificationsRef}>
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
              </button>

              {/* Notification Dropdown Panel */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-3 z-50">
                  <div className="px-4 pb-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Notifications
                    </span>
                    <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      3 New
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`text-xs font-bold ${n.urgent ? "text-amber-800 dark:text-amber-400" : "text-slate-900 dark:text-white"}`}>
                            {n.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {n.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-center">
                    <Link
                      href="/dashboard/status"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                    >
                      View All Status Updates
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Header Profile Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="flex items-center space-x-2 pl-2 pr-1.5 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800 transition-colors text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                aria-expanded={profileMenuOpen}
                aria-haspopup="true"
                title="Open user profile menu"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-xs shadow-xs flex-shrink-0">
                  {user ? user.name.charAt(0) : "P"}
                </div>
                <div className="hidden md:block text-left">
                  <span className="font-bold text-slate-900 dark:text-white block leading-tight truncate max-w-[130px]">
                    {user ? user.name : "Pooja Rameshwar"}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight truncate max-w-[130px]">
                    {user ? user.roleTitle : "ST Research Scholar"}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${profileMenuOpen ? "rotate-180 text-emerald-600" : ""}`} />
              </button>

              {/* Profile Menu Dropdown Panel */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                  {/* User Summary Header (Center-Aligned) */}
                  <div className="px-4 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                    {/* Centered Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0B2545] to-emerald-700 text-white font-black text-lg flex items-center justify-center shadow-xs ring-2 ring-emerald-100 dark:ring-emerald-950/60 mb-2">
                      {user ? user.name.charAt(0).toUpperCase() : "P"}
                    </div>

                    {/* Full Name */}
                    <p className="text-sm font-extrabold text-slate-900 dark:text-white truncate max-w-full">
                      {user ? user.name : "Pooja Rameshwar"}
                    </p>

                    {/* Role Badge */}
                    <div className="mt-1.5 flex justify-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        {role === "officer" ? "Verification Officer" : role === "ministry" ? "Ministry Administrator" : "Scholarship Applicant"}
                      </span>
                    </div>

                    {/* Brief applicant summary/info line */}
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed px-1 text-center">
                      {user?.course || user?.institution || "ST Scholar | DBT Validated via PFMS Gateway"}
                    </p>

                    {/* Meta info tags (Centered) */}
                    <div className="flex items-center justify-center space-x-3 text-[10px] text-slate-400 dark:text-slate-500 pt-2.5 mt-2.5 border-t border-slate-100 dark:border-slate-800/80 w-full font-medium">
                      <span>Category: ST</span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">DBT Verified</span>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="p-2 space-y-1">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <User className="w-4 h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/dashboard/applications"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
                      <span>Applications</span>
                    </Link>
                  </div>

                  {/* Action Option: Logout with red/accent styling */}
                  <div className="pt-1.5 px-2 pb-1 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    >
                      <LogOut className="w-4 h-4 flex-shrink-0" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main
          className={`flex-1 ${
            isChatbotPage
              ? "p-0 min-h-0 h-full flex flex-col overflow-hidden"
              : "p-4 sm:p-8"
          }`}
        >
          {children}
        </main>

        {/* One-Line Footer */}
        <footer className="h-10 flex-shrink-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <p className="truncate">
            (c) 2026 Ministry of Tribal Affairs, Government of India. All rights reserved.
          </p>
          <p className="hidden md:block truncate">
            Direct Benefit Transfer (DBT) National Scholarship Portal | Helpdesk: 1800-11-7788
          </p>
        </footer>
      </div>
    </div>
  );
}
