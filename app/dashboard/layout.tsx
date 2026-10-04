"use client";

import React, { useState, useEffect } from "react";
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
  HelpCircle, 
  User, 
  LogOut, 
  Bell, 
  Menu, 
  X, 
  ChevronRight,
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
  const { user, role, logout } = useAuth();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

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

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* 1. Header (Logo, Portal Name, Notification, Logout) */}
      <header className="sticky top-0 z-30 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between shadow-xs">
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
          <div className="relative">
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

          {/* User Quick Info */}
          <div className="hidden md:flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800 text-xs">
            <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-xs shadow-xs">
              {user ? user.name.charAt(0) : "P"}
            </div>
            <div className="text-left">
              <span className="font-bold text-slate-900 dark:text-white block leading-tight">
                {user ? user.name : "Pooja Rameshwar"}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {user ? user.roleTitle : "ST Research Scholar"}
              </span>
            </div>
          </div>

          {/* Prominent Header Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center space-x-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs"
            title="Log out and return to public website"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Body: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 2. Left Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
            mobileSidebarOpen ? "translate-x-0 mt-16 lg:mt-0" : "-translate-x-full"
          }`}
        >
          {/* Top Section: User Profile Card & Primary Nav Items */}
          <div className="p-4 space-y-5 overflow-y-auto">
            {/* User Profile Summary */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white font-bold flex items-center justify-center text-sm shadow-xs flex-shrink-0">
                  {user ? user.name.charAt(0) : "P"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {user ? user.name : "Pooja Rameshwar"}
                  </p>
                  <p className="text-[10px] text-emerald-800 dark:text-emerald-400 font-semibold truncate">
                    ST Application: NFST-2026
                  </p>
                </div>
              </div>
              <div className="pt-1.5 border-t border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                <span>Category: Scheduled Tribe</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">DBT Verified</span>
              </div>
            </div>

            {/* Sidebar Navigation Links: Home, Scholarships, Applications, Status, Grievances */}
            <nav className="space-y-1">
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
            </nav>
          </div>

          {/* Bottom Left Section: Date & Time, Help/About, Profile, Logout */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
            {/* Live Date and Time Display */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center space-x-1.5 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Indian Standard Time</span>
              </div>
              <p className="text-xs font-black font-mono text-slate-900 dark:text-white">
                {currentTime || "Loading time..."}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {currentDate}
              </p>
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

        {/* Backdrop for mobile sidebar */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
        )}

        {/* 3. Main Content & 4. One-Line Footer */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <main className="flex-1 p-4 sm:p-8">
            {children}
          </main>

          {/* One-Line Footer */}
          <footer className="h-10 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <p className="truncate">
              (c) 2026 Ministry of Tribal Affairs, Government of India. All rights reserved.
            </p>
            <p className="hidden md:block truncate">
              Direct Benefit Transfer (DBT) National Scholarship Portal | Helpdesk: 1800-11-7788
            </p>
          </footer>
        </div>

      </div>
    </div>
  );
}
