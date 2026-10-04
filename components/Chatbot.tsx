"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Key, 
  Sparkles, 
  RefreshCw, 
  Bot, 
  User, 
  HelpCircle,
  Settings,
  ChevronDown,
  ShieldCheck
} from "lucide-react";
import { askGemini, ChatMessage } from "@/lib/gemini";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-1",
      sender: "bot",
      text: "Namaste! I am the Aarohan AI Assistant for the Ministry of Tribal Affairs. How can I assist you with scholarship guidelines, eligibility, or document verification today?",
      timestamp: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeySavedNotice, setApiKeySavedNotice] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedKey = localStorage.getItem("aarohan_gemini_key") || localStorage.getItem("tribalscholar_gemini_key") || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
      if (storedKey) {
        setApiKey(storedKey);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSaveApiKey = () => {
    try {
      localStorage.setItem("aarohan_gemini_key", apiKey.trim());
      setApiKeySavedNotice(true);
      setTimeout(() => setApiKeySavedNotice(false), 2000);
      setShowSettings(false);
    } catch {
      // ignore
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await askGemini(query, apiKey, messages);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "An error occurred while connecting to the assistant. Please consult official MoTA guidelines at tribal.nic.in.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Am I eligible for NFST?",
    "What are the requirements for NOS?",
    "How to fix income certificate deficiency?",
    "Direct Benefit Transfer (DBT) guidelines",
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-mota-navy hover:bg-mota-navy-dark text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-2xl flex items-center space-x-2 border-2 border-amber-400 group transition-all hover:scale-105"
          title="Open Aarohan AI Assistant"
        >
          <Bot className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold hidden sm:inline tracking-wide">
            MoTA Assistant
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl shadow-2xl w-[92vw] sm:w-96 h-[520px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-2">
          {/* Header */}
          <div className="bg-[#0B2545] text-white p-3.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-tight">
                  Aarohan AI Assistant
                </h3>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {apiKey ? "Gemini 1.5 Flash Active" : "Official Knowledge Base Active"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors ${
                  showSettings ? "bg-white/15 text-white" : ""
                }`}
                title="Configure Gemini API Key"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Close Chat"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Settings Drawer (API Key Input) */}
          {showSettings && (
            <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-mota-navy dark:text-amber-400" />
                  <span>Gemini API Key Configuration</span>
                </span>
                <span className="text-[10px] text-slate-500">Optional</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                Enter your Google Gemini API key to enable live LLM synthesis, or leave blank to use the built-in MoTA deterministic engine.
              </p>
              <div className="flex space-x-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="flex-1 px-2.5 py-1 text-xs border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-900 dark:text-white focus:ring-1 focus:ring-mota-navy"
                />
                <button
                  onClick={handleSaveApiKey}
                  className="bg-mota-navy hover:bg-mota-navy-dark dark:bg-emerald-600 text-white font-bold px-3 py-1 rounded-lg text-xs transition-colors"
                >
                  Save
                </button>
              </div>
              {apiKeySavedNotice && (
                <p className="text-[10px] text-emerald-600 font-semibold">
                  API Key updated successfully.
                </p>
              )}
            </div>
          )}

          {/* Message List */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#FAF8F4] dark:bg-slate-950 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-2xs whitespace-pre-line leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-mota-navy text-white rounded-br-xs"
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-slate-700 rounded-bl-xs"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-slate-500 text-[11px] p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 w-fit">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                <span>Consulting official MoTA regulations...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-x-auto flex space-x-1.5 no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="whitespace-nowrap bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-medium px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question about ST scholarships..."
              className="flex-1 px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-mota-navy"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-mota-navy hover:bg-mota-navy-dark dark:bg-emerald-600 text-white p-2 rounded-xl transition-colors disabled:opacity-40"
              title="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
