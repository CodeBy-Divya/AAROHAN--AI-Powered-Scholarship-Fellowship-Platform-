"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function DashboardOverviewPage() {
  const router = useRouter();
  const { role } = useAuth();

  useEffect(() => {
    if (role === "officer") {
      router.replace("/dashboard/officer");
    } else if (role === "ministry") {
      router.replace("/dashboard/ministry");
    } else {
      router.replace("/dashboard/applicant");
    }
  }, [role, router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-2">
        <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Loading Dashboard Workspace...
        </p>
      </div>
    </div>
  );
}
