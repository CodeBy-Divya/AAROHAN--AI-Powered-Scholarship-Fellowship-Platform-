"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function ApplyRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isHydrated } = useAuth();
  const schemeId = params.schemeId as string;

  useEffect(() => {
    if (!isHydrated) return;

    if (user) {
      // Authenticated: forward directly to dashboard application form
      router.replace(`/dashboard/apply/${schemeId}`);
    } else {
      // Unauthenticated: enforce mandatory login/registration before application
      router.replace(`/login?mode=register&redirect=${encodeURIComponent(`/dashboard/apply/${schemeId}`)}`);
    }
  }, [user, isHydrated, schemeId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4] dark:bg-slate-950 text-xs text-slate-500">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-semibold text-slate-600 dark:text-slate-300">
          Redirecting to scholarship application form...
        </p>
      </div>
    </div>
  );
}
