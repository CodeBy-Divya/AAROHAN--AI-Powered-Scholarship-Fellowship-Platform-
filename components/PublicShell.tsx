"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { ShieldCheck, LogOut, ArrowRight } from "lucide-react";

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isHydrated, logout } = useAuth();

  const isDashboard = pathname.startsWith("/dashboard");
  const isChatbotPage = pathname === "/dashboard/chatbot";

  // Strict session & route boundary guards
  useEffect(() => {
    if (!isHydrated) return;

    // 1. Logged-in user attempting to view public portal routes -> redirect directly back into dashboard
    if (user && !isDashboard) {
      const dashboardTarget =
        user.role === "officer"
          ? "/dashboard/officer"
          : user.role === "ministry"
          ? "/dashboard/ministry"
          : "/dashboard/applicant";

      router.replace(dashboardTarget);
    }

    // 2. Unauthenticated user attempting to view dashboard routes -> redirect to login
    if (!user && isDashboard) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, isHydrated, isDashboard, pathname, router]);

  // While auth hydration from localStorage is pending
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4] dark:bg-slate-950 text-xs text-slate-500">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-semibold text-slate-600 dark:text-slate-300">Checking portal authentication...</p>
        </div>
      </div>
    );
  }

  // Active logged-in session attempting to view public website: prevent flashing and redirect back
  if (user && !isDashboard) {
    const dashboardTarget =
      user.role === "officer"
        ? "/dashboard/officer"
        : user.role === "ministry"
        ? "/dashboard/ministry"
        : "/dashboard/applicant";

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4] dark:bg-slate-950 p-4">
        <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 mx-auto flex items-center justify-center text-emerald-700 dark:text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-black text-slate-900 dark:text-white">Active Session Detected</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              You are currently signed in as <strong>{user.name}</strong>. Public website routes require logging out first.
            </p>
          </div>
          <div className="space-y-2 pt-2">
            <button
              onClick={() => router.push(dashboardTarget)}
              className="w-full py-2.5 bg-[#0B2545] hover:bg-[#0D315D] text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>Return to Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out &amp; View Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Unauthenticated user attempting to view dashboard routes: prevent flashing and redirect to login
  if (!user && isDashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4] dark:bg-slate-950 p-4">
        <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 mx-auto flex items-center justify-center text-amber-700 dark:text-amber-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-black text-slate-900 dark:text-white">Authentication Required</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Please sign in or register to access the Dashboard and apply for scholarship schemes.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => router.push(`/login?redirect=${encodeURIComponent(pathname)}`)}
              className="w-full py-2.5 bg-[#0B2545] hover:bg-[#0D315D] text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>Go to Sign In / Registration</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Dashboard View (No Public Header, No Public Footer)
  if (isDashboard) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {children}
        {!isChatbotPage && <Chatbot />}
      </div>
    );
  }

  // Render Public Website View
  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Chatbot />
      <Footer />
    </>
  );
}
