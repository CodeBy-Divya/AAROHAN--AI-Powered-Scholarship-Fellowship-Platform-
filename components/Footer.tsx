"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Shield, Phone, Mail, ExternalLink, Award, Landmark } from "lucide-react";

export default function Footer() {
  const { language } = useAuth();

  return (
    <footer className="bg-[#0B2545] dark:bg-slate-950 text-slate-300 pt-12 pb-8 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-700/60 dark:border-slate-800">
          {/* Col 1: About */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-800 dark:bg-slate-900 border border-slate-700 dark:border-slate-800 flex items-center justify-center">
                <Landmark className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Tribal<span className="text-emerald-400">Scholar</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 dark:text-slate-400 leading-relaxed">
              {language === "hi"
                ? "जनजातीय कार्य मंत्रालय, भारत सरकार द्वारा अनुसूचित जनजाति के विद्यार्थियों के लिए उच्च शिक्षा एवं विदेशी अध्ययन हेतु समर्पित डिजिटल छात्रवृत्ति एवं फैलोशिप पोर्टल।"
                : "Dedicated digital scholarship and fellowship portal by the Ministry of Tribal Affairs, Government of India, empowering Scheduled Tribe students in higher education & research."}
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400 font-medium">
              <Award className="w-3.5 h-3.5" />
              <span>Empowering ST Higher Education & Research</span>
            </div>
          </div>

          {/* Col 2: Flagship Schemes */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              {language === "hi" ? "प्रमुख योजनाएं" : "Flagship Schemes"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/scholarships" className="hover:text-emerald-400 transition-colors">
                  National Fellowship for ST (NFST)
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="hover:text-emerald-400 transition-colors">
                  National Overseas Scholarship (NOS)
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="hover:text-emerald-400 transition-colors">
                  Top Class Education for ST Students
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="hover:text-emerald-400 transition-colors">
                  Post-Matric Scholarship for ST Students
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              {language === "hi" ? "पोर्टल एवं दिशानिर्देश" : "Portal Directory"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/scholarships" className="hover:text-emerald-400 transition-colors">
                  Scholarships Directory & Filters
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-emerald-400 transition-colors">
                  Application Guide & Requirements
                </Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-emerald-400 transition-colors">
                  Official Notices & Circulars
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About MoTA Initiative
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-emerald-400 transition-colors">
                  Frequently Asked Questions (FAQs)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Us & Grievance Desk
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-emerald-400 transition-colors">
                  Role-Based Portal Access (Login)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Helpdesk */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              {language === "hi" ? "हेल्पडेस्क एवं संपर्क" : "Support & Helpdesk"}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Toll Free: 1800-11-7788</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>helpdesk-tribalscholar@gov.in</span>
              </div>
              <div className="flex items-start space-x-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Scholarship Section, Shastri Bhawan, New Delhi - 110001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <p>(c) 2026 Ministry of Tribal Affairs, Government of India. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="/about" className="hover:text-white transition-colors">Website Policy</Link>
            <span>-</span>
            <Link href="/about" className="hover:text-white transition-colors">Security & Privacy</Link>
            <span>-</span>
            <Link href="/about" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
