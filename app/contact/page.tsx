"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  FileText,
  AlertCircle
} from "lucide-react";

export default function ContactUsPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [scheme, setScheme] = useState("NFST");
  const [appNumber, setAppNumber] = useState("");
  const [category, setCategory] = useState("document");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedTicket = `MOTA-TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicket(generatedTicket);
  };

  return (
    <div className="bg-[#FAF8F4] dark:bg-slate-950 min-h-[calc(100vh-140px)] py-10 px-4 sm:px-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Page Title & Overview */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-mota-green dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Ministry of Tribal Affairs - Official Support Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact Support & Grievance Redressal
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Reach out to the dedicated National Fellowship, Overseas Scholarship, or DBT technical cells for official guidance and application assistance.
          </p>
        </div>

        {/* Top Contact Channels Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Toll-Free Helplines
            </h3>
            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>National Portal: <strong>1800-11-7788</strong></p>
              <p>Fellowship Desk: <strong>011-23388482</strong></p>
              <p>DBT Verification Cell: <strong>011-23386980</strong></p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Official Email Inquiries
            </h3>
            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>General Support: <strong>helpdesk-tribalscholar@gov.in</strong></p>
              <p>NFST Division: <strong>nfst-scholarship@gov.in</strong></p>
              <p>NOS Overseas Cell: <strong>nos-mota@gov.in</strong></p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Headquarters Address
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Scholarship and Fellowship Division,<br />
              Ministry of Tribal Affairs, Government of India,<br />
              Room No. 401, A-Wing, Shastri Bhawan,<br />
              Dr. Rajendra Prasad Road, New Delhi - 110001
            </p>
          </div>
        </div>

        {/* Main Section: Grievance/Inquiry Form & Department Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (7 cols): Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Submit an Official Query or Grievance
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Every submission generates a registered MoTA tracking token with guaranteed response within 5-7 working days.
              </p>
            </div>

            {submittedTicket ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Ticket Generated Successfully
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Your query has been assigned tracking token:
                </p>
                <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-mono font-bold text-sm text-mota-navy dark:text-emerald-400 inline-block">
                  {submittedTicket}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  A confirmation SMS and acknowledgment receipt have been dispatched to your contact details.
                </p>
                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="mt-2 text-xs font-semibold text-mota-navy dark:text-emerald-400 hover:underline"
                >
                  Submit Another Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pooja Xalxo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. student@demo.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Scheme Concerned
                    </label>
                    <select
                      value={scheme}
                      onChange={(e) => setScheme(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                    >
                      <option value="NFST">NFST (National Fellowship)</option>
                      <option value="NOS">NOS (Overseas Scholarship)</option>
                      <option value="TOPCLASS">Top Class Education</option>
                      <option value="PMS">Post-Matric Scholarship</option>
                      <option value="OTHER">General Portal Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Application No. (If applied)
                    </label>
                    <input
                      type="text"
                      placeholder="MOTA/NFST/2026/..."
                      value={appNumber}
                      onChange={(e) => setAppNumber(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brief summary of your inquiry"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Detailed Description / Query Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please provide specific details including dates, university details, or certificate discrepancy..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-mota-navy"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-mota-navy hover:bg-mota-navy-dark dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-colors flex items-center space-x-2 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Support Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column (5 cols): Office Timings, FAQ Link & Liaison */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Working Hours & SLA */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Helpdesk Operating Hours
                </h3>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>Monday to Friday: <strong>9:30 AM to 5:30 PM IST</strong></p>
                <p>Saturday, Sunday and Gazetted Holidays: <strong>Closed</strong></p>
                <p className="text-[11px] text-slate-500 dark:text-slate-500 pt-1">
                  Electronic inquiries and grievances submitted outside working hours are queued automatically for next business day review.
                </p>
              </div>
            </div>

            {/* Quick Link to FAQ Directory */}
            <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-slate-900 dark:to-slate-800 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Looking for Immediate Answers?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Check our official FAQ directory covering eligibility rules, required formats for income and caste certificates, and DBT payment schedules.
              </p>
              <Link
                href="/faq"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                <span>Browse Frequently Asked Questions</span>
                <span>-&gt;</span>
              </Link>
            </div>

            {/* State Liaison Directory */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                State Tribal Welfare Liaison Desks
              </h3>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                  <span>Jharkhand (Ranchi)</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">0651-2401822</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                  <span>Odisha (Bhubaneswar)</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">0674-2391645</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                  <span>Madhya Pradesh (Bhopal)</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">0755-2551423</span>
                </div>
                <div className="flex justify-between">
                  <span>North East Cell (Guwahati)</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">0361-2237012</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
