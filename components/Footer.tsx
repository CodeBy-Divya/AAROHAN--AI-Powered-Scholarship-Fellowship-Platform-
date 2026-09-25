"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Shield, Phone, Mail, ExternalLink, Award, Landmark } from "lucide-react";

export default function Footer() {
  const { language } = useAuth();

  return (
    <footer className="bg-[#0B2545] text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-700/60">
          {/* Col 1: About */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                <Landmark className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Tribal<span className="text-emerald-400">Scholar</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === "hi"
                ? "जनजातीय कार्य मंत्रालय, भारत सरकार द्वारा अनुसूचित जनजाति के विद्यार्थियों के लिए उच्च शिक्षा एवं विदेशी अध्ययन हेतु समर्पित डिजिटल छात्रवृत्ति एवं फैलोशिप पोर्टल।"
                : "Dedicated digital scholarship and fellowship portal by the Ministry of Tribal Affairs, Government of India, empowering Scheduled Tribe students in higher education & research."}
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-amber-300 font-medium">
              <Award className="w-3.5 h-3.5" />
              <span>Smart Education · SIH Problem 26239</span>
            </div>
          </div>

          {/* Col 2: Flagship Schemes */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              {language === "hi" ? "प्रमुख योजनाएं" : "Flagship Schemes"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#schemes" className="hover:text-emerald-400 transition-colors">
                  National Fellowship for ST (NFST)
                </Link>
              </li>
              <li>
                <Link href="/#schemes" className="hover:text-emerald-400 transition-colors">
                  National Overseas Scholarship (NOS)
                </Link>
              </li>
              <li>
                <Link href="/#schemes" className="hover:text-emerald-400 transition-colors">
                  Top Class Education for ST Students
                </Link>
              </li>
              <li>
                <Link href="/#schemes" className="hover:text-emerald-400 transition-colors">
                  Post-Matric Scholarship for ST Students
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Important Portals & Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              {language === "hi" ? "सरकारी पोर्टल एवं दिशानिर्देश" : "National Portals & Links"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://tribal.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 flex items-center space-x-1"
                >
                  <span>Ministry of Tribal Affairs (tribal.nic.in)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 flex items-center space-x-1"
                >
                  <span>National Scholarship Portal (NSP)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://dbttribal.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 flex items-center space-x-1"
                >
                  <span>DBT Tribal Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.digilocker.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 flex items-center space-x-1"
                >
                  <span>DigiLocker Document Verification</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Helpdesk */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              {language === "hi" ? "हेल्पडेस्क एवं शिकायत निवारण" : "Support & Helpdesk"}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Toll Free: 1800-11-7788 / 011-23388482</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>helpdesk-tribalscholar@gov.in</span>
              </div>
              <div className="flex items-start space-x-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Scholarship Section, Shastri Bhawan, Dr. Rajendra Prasad Road, New Delhi - 110001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <p>(c) 2026 Ministry of Tribal Affairs, Government of India. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span>Website Policy</span>
            <span>-</span>
            <span>Security & Privacy</span>
            <span>-</span>
            <span>Terms of Service</span>
            <span>-</span>
            <span>Hyperlinking Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
