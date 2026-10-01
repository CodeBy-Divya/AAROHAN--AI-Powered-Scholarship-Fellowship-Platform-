"use client";

import React from "react";
import Link from "next/link";
import { 
  Landmark, 
  ShieldCheck, 
  AlertOctagon, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  FileText, 
  Users, 
  Layers, 
  Cpu, 
  Sparkles, 
  Clock, 
  Eye, 
  FolderLock, 
  GraduationCap,
  Globe2,
  BookOpen,
  Award,
  HeartHandshake
} from "lucide-react";

export default function AboutPage() {
  const socialImpactPillars = [
    {
      title: "Constitutional Safeguard & Social Justice",
      description:
        "Guided by Article 46 and the Fifth & Sixth Schedules of the Constitution of India, the Ministry actively protects Scheduled Tribes and historically disadvantaged communities from social injustice and economic exploitation through affirmative educational access.",
      icon: Landmark,
    },
    {
      title: "Creating First-Generation Leaders & Scholars",
      description:
        "By fully funding undergraduate, postgraduate, and doctoral degrees, MoTA enables youth from remote forest villages, Scheduled areas, and underserved hamlets to become university professors, scientists, civil servants, and institutional researchers.",
      icon: GraduationCap,
    },
    {
      title: "Global Academic Exposure (NOS Scheme)",
      description:
        "Through the National Overseas Scholarship, meritorious tribal candidates pursue Master's and Ph.D. programmes in top 500 QS/THE world-ranked universities, breaking historical socio-economic barriers on the global stage.",
      icon: Globe2,
    },
    {
      title: "Direct Benefit Transfer (DBT) & Economic Dignity",
      description:
        "100% of stipends and contingency grants are routed directly to scholars' Aadhaar-linked bank accounts via PFMS, eliminating middlemen, institutional delays, and ensuring financial independence throughout their academic journeys.",
      icon: HeartHandshake,
    },
    {
      title: "Preserving Indigenous Knowledge & Culture",
      description:
        "MoTA's research grants encourage scholars to conduct academic research into tribal languages, ethno-medicine, indigenous forest conservation, and cultural anthropology, bringing valuable traditional wisdom into mainstream scientific discourse.",
      icon: BookOpen,
    },
    {
      title: "Grassroots-to-Doctorate Pipeline",
      description:
        "Connecting grassroots educational initiatives like Eklavya Model Residential Schools (EMRS) with premier national institutions (IITs, IIMs, AIIMS, Central Universities) and international research fellowships.",
      icon: Award,
    },
  ];

  const problems = [
    {
      title: "Manual Scrutiny Bottlenecks",
      description: "Paper-heavy physical and manual verification created backlogs, requiring weeks of visual inspection per application.",
    },
    {
      title: "Repeated Correspondence",
      description: "Minor avoidable errors (such as faint revenue seals or slight spelling variations) triggered prolonged back-and-forth letters and emails.",
    },
    {
      title: "Excessive Verification Effort",
      description: "Officers spent over 60% of operational hours cross-referencing basic certificate numbers and checking image clarity manually.",
    },
    {
      title: "Processing Delays",
      description: "Multi-layered paper workflows stretched typical application turnaround times up to 90+ days, delaying critical scholar funding.",
    },
    {
      title: "Limited Real-Time Visibility",
      description: "Students had zero insight into whether their file was pending at university, desk officer, or ministry finance divisions.",
    },
    {
      title: "Managing Scheme-Specific Requirements",
      description: "Different schemes (NFST, NOS, Top Class) have distinct income cutoffs, merit lists, and age rules, complicating uniform administration.",
    },
  ];

  const enablePipeline = [
    {
      step: 1,
      title: "Digital Applications",
      desc: "Streamlined single-window digital registration with Aadhaar OTP e-KYC and digital document uploads.",
    },
    {
      step: 2,
      title: "AI-Assisted Verification",
      desc: "Real-time OCR pre-checks assess certificate clarity, detect cutoff stamps, and highlight potential discrepancies before submission.",
    },
    {
      step: 3,
      title: "Eligibility & Scrutiny",
      desc: "Configurable rule engines match candidates against scheme guidelines, assisting scrutiny officers with automated cross-checks.",
    },
    {
      step: 4,
      title: "Selection",
      desc: "Merit lists and quota matrices are compiled transparently for Central Selection Committee approvals.",
    },
    {
      step: 5,
      title: "Communication",
      desc: "Automated SMS alerts, email notifications, and deficiency resolution windows keep scholars informed in real-time.",
    },
    {
      step: 6,
      title: "Post-Selection Management",
      desc: "Continuous fellowship monitoring, annual progress review, digital renewals, and Direct Benefit Transfer (DBT) via PFMS.",
    },
  ];

  const securityPillars = [
    {
      title: "Role-Based Access Control (RBAC)",
      desc: "Strict segregation of duties between Applicants, Verification Officers, Scrutiny Officers, and Ministry Administrators.",
      icon: Users,
    },
    {
      title: "Comprehensive Audit Trails",
      desc: "Every document inspection, deficiency note, and verification approval is immutably timestamped with officer credentials.",
      icon: Layers,
    },
    {
      title: "Secure Document Handling",
      desc: "Encrypted storage for caste certificates, income records, and bank mandates with strict privacy safeguards.",
      icon: FolderLock,
    },
    {
      title: "Transparent Status Tracking",
      desc: "End-to-end visibility for scholars into every stage of their application file, from submission to DBT credit.",
      icon: Eye,
    },
    {
      title: "Human Oversight of AI-Assisted Decisions",
      desc: "AI never rejects or approves applications autonomously. Machine intelligence solely assists human scrutiny officers who make all final determinations.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="bg-[#FAF8F4] dark:bg-slate-950 min-h-screen py-10 px-4 sm:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Page Top Heading */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-mota-green dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            About TribalScholar & Ministry Mandate
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Empowering Scheduled Tribes Through Education
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Promoting social justice, educational equity, and academic excellence for Scheduled Tribe communities across India.
          </p>
        </div>

        {/* Dedicated Section: About Ministry of Tribal Affairs (MoTA) & Societal Upliftment */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center space-x-3 text-mota-navy dark:text-emerald-400">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-mota-green dark:text-emerald-400 block">
                Government of India
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                About the Ministry of Tribal Affairs (MoTA)
              </h2>
            </div>
          </div>

          <div className="text-sm text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed">
            <p>
              The <strong>Ministry of Tribal Affairs (MoTA)</strong> was constituted as an independent Ministry in 1999 to provide a focused approach toward the integrated socio-economic development of the Scheduled Tribes (STs)—the most marginalized and historically disadvantaged communities in India.
            </p>
            <p>
              Under <strong>Article 46 of the Constitution of India</strong>, the State bears a solemn directive mandate to <em>&quot;promote with special care the educational and economic interests of the weaker sections of the people, and in particular, of the Scheduled Castes and the Scheduled Tribes, and to protect them from social injustice and all forms of exploitation.&quot;</em>
            </p>
            <p>
              Education is the single most powerful catalyst for socio-economic mobility. For generations, tribal communities faced systemic hurdles, including geographic isolation in forested and hilly terrains, economic hardship, language barriers, and lack of institutional infrastructure. MoTA counters these systemic inequities through a targeted financial and institutional support ecosystem that covers every stage of educational progress:
            </p>
          </div>

          {/* Social Upliftment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {socialImpactPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5"
                >
                  <div className="flex items-center space-x-2.5 text-mota-navy dark:text-emerald-400">
                    <Icon className="w-5 h-5 flex-shrink-0 text-mota-green dark:text-emerald-400" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
            <strong>Impact on Society:</strong> By providing full fellowships and direct bank transfers, MoTA removes the financial compulsion for tribal youths to discontinue their studies for menial wages. Over 18,000 scholars have completed doctoral and postgraduate degrees, creating a vibrant cadre of tribal role models, scientists, professors, and policy influencers who reinvest their knowledge into community upliftment.
          </div>
        </section>

        {/* About the Digital Initiative */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            About the Digital Initiative
          </h2>
          <div className="text-sm text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
            <p>
              TribalScholar delivers the <strong>end-to-end digitization of scholarship and fellowship schemes</strong> for the Ministry of Tribal Affairs (MoTA).
            </p>
            <p>
              The platform manages major central initiatives including the <em>National Fellowship for Scheduled Tribes (NFST)</em> for M.Phil. and Ph.D. research across recognized Indian universities, and the <em>National Overseas Scholarship (NOS)</em> for postgraduate studies in top-ranked international institutions. TribalScholar unifies these complex schemes under a single, secure, and accessible portal.
            </p>
          </div>
        </section>

        {/* Challenges in Traditional Administration */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Challenges in Traditional Administration
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Key operational bottlenecks that previously created hardship for students and administrative burdens for verification officials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((prob, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2"
              >
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {prob.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {prob.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* The TribalScholar Solution */}
        <section className="bg-gradient-to-br from-emerald-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 rounded-2xl border border-emerald-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 text-mota-green dark:text-emerald-400">
            <Sparkles className="w-5 h-5 flex-shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider">Intelligent Architecture</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Our Solution
          </h2>
          <div className="text-sm text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              A centralized, configurable platform that connects applicants and officials.
            </p>
            <p>
              TribalScholar serves as a single digital bridge bringing scholars, institutional verifiers, scrutiny officers, and ministry administrators into one synchronized ecosystem. The platform standardizes document ingestion, offers intelligent pre-submission validation, automates eligibility rules, and establishes direct communication loops so that no student is left behind due to technical misunderstandings.
            </p>
          </div>
        </section>

        {/* What We Enable */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              What We Enable
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              An end-to-end digital lifecycle transforming scholarship delivery from registration to post-selection management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enablePipeline.map((step) => (
              <div
                key={step.step}
                className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
                    0{step.step}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Stage {step.step}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white pt-1">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Visual Sequence Summary */}
          <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center text-xs font-semibold text-slate-700 dark:text-slate-300 flex flex-wrap items-center justify-center gap-2">
            <span>Digital Applications</span>
            <span className="text-slate-400">&rarr;</span>
            <span>AI-Assisted Verification</span>
            <span className="text-slate-400">&rarr;</span>
            <span>Eligibility &amp; Scrutiny</span>
            <span className="text-slate-400">&rarr;</span>
            <span>Selection</span>
            <span className="text-slate-400">&rarr;</span>
            <span>Communication</span>
            <span className="text-slate-400">&rarr;</span>
            <span>Post-Selection Management</span>
          </div>
        </section>

        {/* Transparency and Security */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Transparency and Security
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Enterprise governance and ethical AI principles protecting public funds and scholar rights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2 flex items-start space-x-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-mota-navy dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Help & FAQs Redirection */}
        <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Have Questions Regarding Schemes or Scrutiny Rules?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Visit our dedicated FAQ center or review the applicant step-by-step guide.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              href="/guide"
              className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 font-semibold text-xs px-4 py-2 rounded-xl transition-colors"
            >
              Applicant Guide
            </Link>
            <Link
              href="/faq"
              className="bg-mota-navy hover:bg-mota-navy-dark dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors flex items-center space-x-1"
            >
              <span>View FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
