export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const SYSTEM_PROMPT = `
You are the official TribalScholar AI Assistant for the Ministry of Tribal Affairs (MoTA), Government of India (SIH-26239).
Your role is to assist Scheduled Tribe (ST) students, research scholars, and administrators with official guidelines for:
1. National Fellowship for ST Students (NFST) - M.Phil and Ph.D. in India, Rs. 35,000/mo + HRA, 750 annual slots.
2. National Overseas Scholarship for ST (NOS) - Master's and Ph.D. abroad in top 500 QS world universities, 20 slots, income ceiling Rs. 6.00 Lakhs.
3. Top Class Education for ST Students - premier institutes like IITs, IIMs, AIIMS, NITs, 1,000 slots.
4. Post-Matric Scholarship for ST Students - Class 11, 12, ITI, degree programs.

STRICT INSTRUCTION: DO NOT USE EMOJIS ANYWHERE IN YOUR OUTPUT. Keep the tone professional, encouraging, clear, and structured with bullet points.
If unsure about any official government figure, advise consulting the official MoTA portal (tribal.nic.in) or the Ministry helpline (1800-11-7788).
`;

export async function askGemini(
  prompt: string,
  apiKey: string,
  history: ChatMessage[] = []
): Promise<string> {
  const cleanKey = apiKey?.trim();

  if (cleanKey) {
    try {
      const contents = [
        {
          role: "user",
          parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${prompt}` }],
        },
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${cleanKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contents }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          // Strip any stray emojis if generated
          return text
            .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
            .replace(/[\u2600-\u27BF]/g, "");
        }
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to local engine:", err);
    }
  }

  // Deterministic Local Fallback Engine (Runs completely offline)
  const lower = prompt.toLowerCase();

  if (lower.includes("nfst") || lower.includes("fellowship") || lower.includes("phd") || lower.includes("research")) {
    return [
      "National Fellowship for Scheduled Tribe Students (NFST):",
      "- Eligibility: Must belong to Scheduled Tribe community and have secured admission in full-time M.Phil or Ph.D. in UGC-recognized universities or institutions.",
      "- Financial Benefit: Junior Research Fellow (JRF) receives Rs. 31,000 per month; Senior Research Fellow (SRF) receives Rs. 35,000 per month, plus contingency grant (Rs. 20,500/year for science, Rs. 12,000/year for humanities) and applicable HRA.",
      "- Total Slots: 750 fellowships awarded annually across India.",
      "- Required Documents: ST Caste Certificate, Ph.D. Admission / Registration letter, PG consolidated marksheet (minimum 55% marks), Guide-approved Research Synopsis, and Aadhaar-seeded Bank Mandate for DBT.",
      "- Application Deadline: 15 November 2026.",
    ].join("\n");
  }

  if (lower.includes("nos") || lower.includes("overseas") || lower.includes("abroad") || lower.includes("foreign")) {
    return [
      "National Overseas Scholarship for ST Candidates (NOS):",
      "- Objective: Financial assistance to meritorious ST students for pursuing Master's and Ph.D. level courses in top 500 QS world ranked universities abroad.",
      "- Total Slots: 20 slots annually (with 30% prioritized for female candidates).",
      "- Financial Support: Full tuition fees directly paid to the university, annual maintenance allowance (GBP 9,900 for UK or USD 15,400 for USA and other countries), contingency allowance, visa fees, and return economy airfare.",
      "- Eligibility: Minimum 55% marks in qualifying degree, age below 35 years as of 1st July of the application cycle, and total family income not exceeding Rs. 6.00 Lakhs per annum.",
      "- Key Document: Unconditional offer letter from an eligible top 500 foreign university.",
    ].join("\n");
  }

  if (lower.includes("income") || lower.includes("certificate") || lower.includes("seal") || lower.includes("deficiency") || lower.includes("blur")) {
    return [
      "Resolving Income Certificate and Document Deficiencies:",
      "- Valid Issuing Authorities: The income certificate must be issued by a competent revenue officer not below the rank of Tehsildar or Sub-Divisional Magistrate (SDM).",
      "- Common Rejection Causes: Faint circular seal, missing registration number, or unclear signature.",
      "- Rectification: Use the 'Fix Document Now' feature on your Student Dashboard to re-scan the original certificate under good lighting without camera flash glare.",
      "- Resubmission Window: Applicants have 7 days from the deficiency notification date to upload the corrected document before scrutiny finalization.",
    ].join("\n");
  }

  if (lower.includes("top class") || lower.includes("iit") || lower.includes("iim") || lower.includes("nit")) {
    return [
      "National Scholarship for Higher Education (Top Class Education) for ST Students:",
      "- Coverage: Notified premier institutions including all IITs, IIMs, NITs, AIIMS, and National Law Universities (NLUs).",
      "- Financial Support: 100% full tuition fee covered, plus living expenses of Rs. 3,000 per month, books allowance of Rs. 5,000 per year, and a one-time computer allowance of Rs. 45,000.",
      "- Annual Quota: 1,000 scholarships sanctioned annually.",
      "- Family Income Ceiling: Total annual family income from all sources must not exceed Rs. 6.00 Lakhs.",
    ].join("\n");
  }

  if (lower.includes("dbt") || lower.includes("bank") || lower.includes("aadhaar") || lower.includes("payment")) {
    return [
      "Direct Benefit Transfer (DBT) Guidelines:",
      "- All scholarship funds and research fellowship stipends are disbursed directly to the scholar's bank account linked with their Aadhaar number.",
      "- Please verify that your bank account is actively seeded with the National Payments Corporation of India (NPCI) Aadhaar mapper.",
      "- No middleman or institute intermediary is involved in stipend disbursements.",
    ].join("\n");
  }

  return [
    "TribalScholar System Assistance:",
    "I can assist you with:",
    "- Eligibility criteria for NFST (Ph.D. in India) and NOS (Master's and Ph.D. abroad).",
    "- Document requirements: ST caste certificates, income limits, and academic records.",
    "- Understanding AI pre-submission checks and resolving flagged deficiencies.",
    "- Direct Benefit Transfer (DBT) verification and application tracking.",
    "",
    "Please ask a specific question regarding any Ministry of Tribal Affairs scholarship scheme.",
  ].join("\n");
}
