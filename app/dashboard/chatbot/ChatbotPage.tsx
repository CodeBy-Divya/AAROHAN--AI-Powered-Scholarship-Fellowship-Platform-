"use client";

import React, { useState, useRef, useEffect } from "react";
import { askGemini, ChatMessage } from "@/lib/gemini";
import { 
  Sparkles, 
  Send, 
  Key, 
  Trash2, 
  Bot, 
  User, 
  CheckCircle2, 
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark
} from "lucide-react";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: [
        "Welcome to the TribalScholar AI Assistant Workspace.",
        "",
        "I am trained on official Ministry of Tribal Affairs (MoTA) guidelines to assist Scheduled Tribe scholars with:",
        "- Fellowship & Scholarship Schemes (NFST, NOS, Top Class Education).",
        "- Eligibility thresholds, qualifying marks, and revised stipend amounts.",
        "- Resolving document deficiencies (faint seals, scanning clarity, issuing magistrates).",
        "- Direct Benefit Transfer (DBT) verification and Aadhaar-NPCI bank mapping.",
        "",
        "How can I assist you with your application today?",
      ].join("\n"),
      timestamp: "Just Now",
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showKeyDrawer, setShowKeyDrawer] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load API key from local storage if previously saved
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem("tribalscholar_gemini_key");
      if (savedKey) setApiKey(savedKey);
    } catch {
      // ignore
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    try {
      localStorage.setItem("tribalscholar_gemini_key", key);
    } catch {
      // ignore
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt("");
    setIsLoading(true);

    try {
      const botReply = await askGemini(text, apiKey, messages);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botReply,
        timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const fallbackMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "An error occurred while generating response. Please consult the official guidelines or the National Helpdesk at 1800-11-7788.",
        timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: "Conversation cleared. Ask any question regarding MoTA scholarships, eligibility criteria, or document scrutiny guidelines.",
        timestamp: "Just Now",
      },
    ]);
  };

  const promptChips = [
    "Check NFST eligibility & stipend",
    "Explain 7-day deficiency rectification rule",
    "How to seed bank account with NPCI for DBT",
    "Top 500 QS universities for NOS",
    "Competent revenue magistrate for ST certificate",
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-4 flex flex-col h-[calc(100vh-140px)]">
      
      {/* Top Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800 shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
              <span>TribalScholar AI Assistant</span>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                {apiKey ? "Gemini Live" : "Local Engine"}
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive guidance on scholarship schemes, scrutiny rules, and DBT compliance.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowKeyDrawer(!showKeyDrawer)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            title="Configure Gemini API Key"
          >
            <Key className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">API Key</span>
          </button>

          <button
            type="button"
            onClick={clearChat}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-red-600 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Optional API Key Configuration Box */}
      {showKeyDrawer && (
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 flex-shrink-0 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-white">
              Google Gemini API Key (Optional)
            </span>
            <span className="text-[11px] text-slate-400">
              Without an API key, the built-in local knowledge engine answers all scheme inquiries offline.
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Paste your Gemini API key (e.g. AIzaSy...)"
              value={apiKey}
              onChange={(e) => handleSaveApiKey(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowKeyDrawer(false)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-1.5 rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Messages Thread Container */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 overflow-y-auto space-y-4 shadow-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs ${
                msg.sender === "user"
                  ? "bg-slate-800 text-white"
                  : "bg-emerald-700 text-white"
              }`}
            >
              {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-1 ${
                msg.sender === "user"
                  ? "bg-[#0B2545] text-white rounded-tr-xs"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded-tl-xs border border-slate-200/80 dark:border-slate-700"
              }`}
            >
              <div className="whitespace-pre-line font-normal">
                {msg.text}
              </div>
              <div
                className={`text-[10px] text-right pt-1 ${
                  msg.sender === "user" ? "text-slate-300" : "text-slate-400"
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-xs text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></div>
              <span>Searching MoTA scheme guidelines and regulatory circulars...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 flex-shrink-0 no-scrollbar">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-1">
          Suggestions:
        </span>
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(chip)}
            className="text-[11px] font-semibold bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 whitespace-nowrap transition-colors shadow-2xs"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="bg-white dark:bg-slate-900 p-2 sm:p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex-shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Ask about NFST, NOS, income thresholds, or document verification..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-1 focus:ring-[#0B2545] dark:focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="bg-[#0B2545] hover:bg-[#0D315D] dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
}
