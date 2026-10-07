"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  const isChatbotPage = pathname === "/dashboard/chatbot";

  if (isDashboard) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {children}
        {!isChatbotPage && <Chatbot />}
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Chatbot />
      <Footer />
    </>
  );
}
