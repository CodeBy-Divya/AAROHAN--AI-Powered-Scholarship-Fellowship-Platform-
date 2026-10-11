"use client";

import React, { useState, useRef, useEffect } from "react";
import { askGemini, ChatMessage, AttachedFile } from "@/lib/gemini";
import { useAuth } from "@/lib/auth-context";
import { 
  Sparkles, 
  Send, 
  Key, 
  Trash2, 
  Bot, 
  User, 
  Paperclip, 
  Mic, 
  MicOff, 
  FileText, 
  X, 
  Copy, 
  Check, 
  BookOpen, 
  GraduationCap, 
  Lightbulb, 
  Award, 
  FileCheck, 
  Landmark, 
  AlertTriangle, 
  ArrowRight,
  ShieldCheck,
  Volume2,
  VolumeX
} from "lucide-react";

/**
 * Strips Markdown formatting so browser SpeechSynthesis speaks naturally
 */
function cleanTextForSpeech(text: string): string {
  return text
    // Replace code blocks with brief note
    .replace(/```[\s\S]*?```/g, " Code block omitted. ")
    // Remove inline code ticks
    .replace(/`([^`]+)`/g, "$1")
    // Remove headers
    .replace(/#{1,6}\s+/g, "")
    // Remove bold and italics
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    // Remove links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove bullets and blockquotes
    .replace(/^[-*]\s+/gm, "")
    .replace(/^>\s+/gm, "")
    // Clean up multiple newlines into period pauses
    .replace(/\n+/g, ". ")
    .trim();
}

/**
 * Code Block component with Syntax Header and Copy button
 */
function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 text-slate-100 text-xs shadow-xs">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-950/80 border-b border-slate-800 text-[11px] text-slate-400">
        <span className="font-mono uppercase font-semibold tracking-wider">
          {language || "CODE"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center space-x-1.5 hover:text-white transition-colors"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3.5 overflow-x-auto font-mono text-[12px] leading-relaxed text-emerald-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/**
 * Say Loud Voice Button for Assistant Messages
 */
function SpeakMessageButton({
  text,
  messageId,
  isSpeaking,
  onToggleSpeech,
}: {
  text: string;
  messageId: string;
  isSpeaking: boolean;
  onToggleSpeech: (messageId: string, text: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggleSpeech(messageId, text)}
      className={`flex items-center space-x-1 text-[11px] transition-all px-2 py-0.5 rounded-md ${
        isSpeaking
          ? "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-700 shadow-2xs animate-pulse"
          : "text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
      }`}
      title={isSpeaking ? "Stop voice output" : "Say loud (Read response aloud)"}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Stop Voice</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5" />
          <span>Say Loud</span>
        </>
      )}
    </button>
  );
}

/**
 * Copy whole assistant message button
 */
function CopyMessageButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center space-x-1 text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors px-1.5 py-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50"
      title="Copy message text"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 text-emerald-500" />
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

/**
 * Formats inline Markdown elements (bold, italic, inline code)
 */
function renderInlineMarkdown(text: string): React.ReactNode[] {
  const tokens = text.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);

  return tokens.map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-slate-900 dark:text-white">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 mx-0.5 rounded-md font-mono text-[11px] bg-slate-200 dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 border border-slate-300/50 dark:border-slate-600"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith("*") && token.endsWith("*") && token.length > 2) {
      return (
        <em key={index} className="italic text-slate-700 dark:text-slate-300">
          {token.slice(1, -1)}
        </em>
      );
    }
    return <span key={index}>{token}</span>;
  });
}

/**
 * Full Markdown Renderer for bot and user message streams
 */
function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const nodes: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLang = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced Code Block Detection
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        nodes.push(
          <CodeBlock
            key={`code-${i}`}
            code={codeBuffer.join("\n")}
            language={codeLang}
          />
        );
        inCodeBlock = false;
        codeBuffer = [];
        codeLang = "";
      } else {
        inCodeBlock = true;
        codeLang = line.trim().replace(/^```/, "").trim();
        codeBuffer = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      nodes.push(
        <h3
          key={`h3-${i}`}
          className="text-xs sm:text-sm font-black text-slate-900 dark:text-white pt-2 pb-1 border-b border-slate-200/60 dark:border-slate-700/60"
        >
          {line.replace("### ", "")}
        </h3>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      nodes.push(
        <h2
          key={`h2-${i}`}
          className="text-sm sm:text-base font-black text-slate-900 dark:text-white pt-2.5 pb-1"
        >
          {line.replace("## ", "")}
        </h2>
      );
      continue;
    }
    if (line.startsWith("#### ")) {
      nodes.push(
        <h4
          key={`h4-${i}`}
          className="text-xs font-bold text-slate-800 dark:text-slate-200 pt-1.5"
        >
          {line.replace("#### ", "")}
        </h4>
      );
      continue;
    }

    // Bulleted lists
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const itemText = line.trim().replace(/^[-*]\s+/, "");
      nodes.push(
        <div key={`li-${i}`} className="flex items-start space-x-2 pl-1 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 flex-shrink-0" />
          <div className="flex-1 leading-relaxed text-xs sm:text-sm">
            {renderInlineMarkdown(itemText)}
          </div>
        </div>
      );
      continue;
    }

    // Numbered lists
    const numberedMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
    if (numberedMatch) {
      nodes.push(
        <div key={`num-${i}`} className="flex items-start space-x-2 pl-1 py-0.5">
          <span className="font-bold text-emerald-700 dark:text-emerald-400 text-xs mt-0.5 flex-shrink-0">
            {numberedMatch[1]}.
          </span>
          <div className="flex-1 leading-relaxed text-xs sm:text-sm">
            {renderInlineMarkdown(numberedMatch[2])}
          </div>
        </div>
      );
      continue;
    }

    // Empty lines
    if (!line.trim()) {
      nodes.push(<div key={`sp-${i}`} className="h-1.5" />);
      continue;
    }

    // Standard text lines
    nodes.push(
      <p key={`p-${i}`} className="leading-relaxed text-xs sm:text-sm">
        {renderInlineMarkdown(line)}
      </p>
    );
  }

  if (inCodeBlock && codeBuffer.length > 0) {
    nodes.push(
      <CodeBlock
        key="code-unclosed"
        code={codeBuffer.join("\n")}
        language={codeLang}
      />
    );
  }

  return <div className="space-y-1">{nodes}</div>;
}

export default function ChatbotPage() {
  const { user } = useAuth();
  const userName = user?.name ? user.name.split(" ")[0] : "Scholar";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showKeyDrawer, setShowKeyDrawer] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [attachments, setAttachments] = useState<AttachedFile[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Load API key from local storage
  useEffect(() => {
    try {
      const savedKey =
        localStorage.getItem("aarohan_gemini_key") ||
        localStorage.getItem("tribalscholar_gemini_key");
      if (savedKey) setApiKey(savedKey);
    } catch {
      // ignore
    }
  }, []);

  // Auto-populate query if redirected from Scholarship cards
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const queryParam = urlParams.get("query");
        if (queryParam) {
          setInputPrompt(queryParam);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    try {
      localStorage.setItem("aarohan_gemini_key", key);
    } catch {
      // ignore
    }
  };

  // Initialize Web Speech API for voice recognition (Speech-to-Text)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-IN";

        recognition.onresult = (event: any) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          if (transcript) {
            setInputPrompt((prev) => {
              const trimmed = prev.trim();
              return trimmed ? `${trimmed} ${transcript}` : transcript;
            });
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // Voice toggle (Speech-to-Text Input)
  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  // Say Loud Feature: Text-to-Speech Output
  const handleToggleSpeech = (messageId: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    // If currently speaking this message, stop it
    if (activeSpeakingId === messageId) {
      window.speechSynthesis.cancel();
      setActiveSpeakingId(null);
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const cleanText = cleanTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => v.lang.includes("en-IN")) ||
      voices.find((v) => v.lang.includes("en-GB")) ||
      voices.find((v) => v.lang.includes("en-US"));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      setActiveSpeakingId(null);
    };

    utterance.onerror = () => {
      setActiveSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
    setActiveSpeakingId(messageId);
  };

  // Cleanup speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Smooth Auto Scroll to Bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0 || isLoading) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  // Dynamic Auto-expanding Textarea
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 100);
      textareaRef.current.style.height = `${Math.max(newHeight, 34)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputPrompt]);

  // Handle Document Upload
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: AttachedFile[] = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
    }));

    setAttachments((prev) => [...prev, ...newFiles]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Send Message Logic
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if ((!text && attachments.length === 0) || isLoading) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const currentAttachments = [...attachments];

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: text || "Uploaded document for review and scrutiny assessment.",
      timestamp: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      attachments: currentAttachments.length > 0 ? currentAttachments : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt("");
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "34px";
    }
    setIsLoading(true);

    try {
      const botReply = await askGemini(
        text,
        apiKey,
        messages,
        currentAttachments
      );
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botReply,
        timestamp: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const fallbackMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "An error occurred while generating a response. Please refer to official MoTA guidelines or contact the National Helpdesk at 1800-11-7788.",
        timestamp: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear Chat Confirmation
  const confirmClearChat = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setActiveSpeakingId(null);
    setMessages([]);
    setShowClearConfirm(false);
  };

  // 6 Quick Prompt Cards for Empty/Initial State
  const quickPromptCards = [
    {
      title: "Summarize my syllabus",
      subtitle: "Deconstruct multi-unit course syllabi into weekly milestones & checkpoints.",
      category: "Academic",
      icon: BookOpen,
      prompt: "Summarize my syllabus into a structured weekly academic roadmap with core modules and revision checkpoints.",
    },
    {
      title: "Help me prep for exams",
      subtitle: "Active recall, spaced repetition, and 4-stage timed answer writing tactics.",
      category: "Strategy",
      icon: GraduationCap,
      prompt: "Help me prep for exams using active recall, spaced repetition, and structured answer presentation.",
    },
    {
      title: "Explain a concept",
      subtitle: "First-principles Feynman technique breakdown with intuitive analogies.",
      category: "Conceptual",
      icon: Lightbulb,
      prompt: "Explain a difficult concept using first principles, intuitive analogies, and common pitfalls to avoid.",
    },
    {
      title: "Check NFST fellowship rules",
      subtitle: "Ph.D./M.Phil criteria, Rs. 35,000/mo stipend rates, and 750 national slots.",
      category: "Scholarship",
      icon: Award,
      prompt: "What are the eligibility requirements, stipend rates, and slots for the National Fellowship for ST Students (NFST)?",
    },
    {
      title: "Resolve document deficiency",
      subtitle: "Clear steps for faint seals, SDM magistrate signoffs, and 7-day deadlines.",
      category: "Scrutiny",
      icon: FileCheck,
      prompt: "Explain the 7-day deficiency rectification rule and how to resolve faint seals on my income certificate.",
    },
    {
      title: "Seed bank account for DBT",
      subtitle: "Step-by-step NPCI Aadhaar bank mapping to ensure direct stipend transfer.",
      category: "Disbursement",
      icon: Landmark,
      prompt: "How do I verify and link my bank account with the NPCI Aadhaar mapper for DBT stipend payments?",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col min-h-0 bg-white dark:bg-slate-900 overflow-hidden relative">

      {/* TOP HEADER BAR (Full Width, Compact & Crisp) */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 sm:px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-shrink-0 z-10">
        
        {/* Left: Assistant Identity & Live Status */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0B2545] to-emerald-600 text-white flex items-center justify-center shadow-xs ring-2 ring-emerald-500/20 flex-shrink-0">
            <Sparkles className="w-4 h-4 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Aarohan AI Assistant
              </h1>
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Online & Ready</span>
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
              <span className="truncate max-w-[200px] sm:max-w-none">
                MoTA Guidelines, Document Scrutiny & Academic Advisor
              </span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline font-mono text-[10px] text-slate-400">
                {apiKey ? "Gemini Live" : "MoTA Local Engine"}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions Menu (API Key & Clear Chat) */}
        <div className="flex items-center space-x-2">
          {/* Configure API Key */}
          <button
            type="button"
            onClick={() => setShowKeyDrawer(!showKeyDrawer)}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
              showKeyDrawer || apiKey
                ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300"
                : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}
            title="Configure Gemini API Key"
          >
            <Key className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">API Key</span>
          </button>

          {/* Clear Chat Button */}
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            disabled={messages.length === 0}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>
      </div>

      {/* OPTIONAL API KEY DRAWER */}
      {showKeyDrawer && (
        <div className="px-4 sm:px-6 py-2.5 bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 flex-shrink-0 transition-all text-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 max-w-5xl mx-auto w-full">
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white">
                Google Gemini API Key (Optional)
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Without an API key, the built-in offline engine answers all official MoTA queries.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => handleSaveApiKey(e.target.value)}
                className="flex-1 sm:w-64 px-3 py-1 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowKeyDrawer(false)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1 rounded-xl text-xs transition-colors flex-shrink-0"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL: CLEAR CHAT */}
      {showClearConfirm && (
        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Clear Conversation?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                This will reset your messages and attached documents. You can restart any query immediately.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmClearChat}
                className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors shadow-sm"
              >
                Yes, Clear Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN BODY AREA (Message History List - Scrolls Internally) */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-slate-50/40 to-white dark:from-slate-900 dark:to-slate-950/80">
        
        {/* CASE 1: EMPTY / INITIAL STATE (HERO GREETING & SUGGESTED PROMPTS GRID) */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col justify-center items-center py-4 space-y-5 max-w-4xl mx-auto animate-fadeIn">
            
            {/* Center Greeting Header */}
            <div className="text-center space-y-1.5 max-w-xl">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0B2545] to-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm ring-4 ring-emerald-500/10">
                <Sparkles className="w-6 h-6 text-emerald-300" />
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Welcome, {userName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                How can I assist you today? Select a suggested inquiry below or ask any question about MoTA scholarships, document verification, or academic preparation.
              </p>
            </div>

            {/* 6 Quick Prompt Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 w-full">
              {quickPromptCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(card.prompt)}
                    className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/70 hover:bg-emerald-50/70 dark:hover:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 text-left transition-all duration-150 group shadow-2xs hover:shadow-xs flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700/60 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950 text-slate-700 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 flex items-center justify-center transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          {card.category}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {card.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end text-[10px] font-bold text-emerald-700 dark:text-emerald-400 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                      <span>Ask AI</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Trust badge */}
            <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 dark:text-slate-500 pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Trained on official Ministry of Tribal Affairs (MoTA) guidelines & DBT portals</span>
            </div>

          </div>
        )}

        {/* CASE 2: ACTIVE CONVERSATION STREAM */}
        {messages.length > 0 && (
          <div className="max-w-4xl mx-auto w-full space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${
                  msg.sender === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs ${
                    msg.sender === "user"
                      ? "bg-[#0B2545] text-white"
                      : "bg-gradient-to-tr from-emerald-700 to-emerald-600 text-white"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </div>

                {/* Bubble Container */}
                <div
                  className={`max-w-[88%] sm:max-w-[82%] rounded-2xl p-3.5 sm:p-4 shadow-xs transition-all space-y-2 ${
                    msg.sender === "user"
                      ? "bg-[#0B2545] text-white rounded-tr-xs"
                      : "bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700/80 rounded-tl-xs"
                  }`}
                >
                  {/* Attached Files Chips */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="space-y-1 pb-1.5 border-b border-white/20 dark:border-slate-700/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 dark:text-slate-400">
                        Attached Document(s):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.attachments.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-1.5 px-2 py-0.5 rounded-lg text-xs bg-white/10 dark:bg-slate-700 text-white border border-white/20 dark:border-slate-600"
                          >
                            <FileText className="w-3 h-3 text-emerald-300" />
                            <span className="truncate max-w-[150px] font-mono text-[10px]">
                              {file.name}
                            </span>
                            <span className="text-[9px] text-slate-300">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rendered Markdown Stream */}
                  <div className="leading-relaxed">
                    <MarkdownRenderer content={msg.text} />
                  </div>

                  {/* Message Bottom Action Bar: Say Loud Voice, Copy, Timestamp */}
                  <div
                    className={`flex items-center justify-between pt-1 border-t ${
                      msg.sender === "user"
                        ? "border-white/10 text-slate-300"
                        : "border-slate-100 dark:border-slate-700/50 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      {msg.sender === "bot" && (
                        <>
                          <SpeakMessageButton
                            text={msg.text}
                            messageId={msg.id}
                            isSpeaking={activeSpeakingId === msg.id}
                            onToggleSpeech={handleToggleSpeech}
                          />
                          <CopyMessageButton text={msg.text} />
                        </>
                      )}
                    </div>
                    <span className="text-[10px] font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing / Thinking Indicator */}
            {isLoading && (
              <div className="flex items-start space-x-3 animate-fadeIn">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-600 text-white flex items-center justify-center text-xs flex-shrink-0 shadow-xs">
                  <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-3 sm:p-3.5 rounded-2xl rounded-tl-xs shadow-xs space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 pl-1">
                      Aarohan AI is consulting MoTA guidelines...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

      </div>

      {/* ATTACHMENT PREVIEW CHIPS BAR (Above Textarea before sending) */}
      {attachments.length > 0 && (
        <div className="px-4 sm:px-6 py-1.5 bg-emerald-50/70 dark:bg-slate-800/80 border-t border-emerald-200 dark:border-slate-700 flex-shrink-0">
          <div className="max-w-4xl mx-auto flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-emerald-900 dark:text-emerald-300 flex items-center space-x-1">
              <FileCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Attached ({attachments.length} file{attachments.length > 1 ? "s" : ""})</span>
            </span>
            <button
              type="button"
              onClick={() => setAttachments([])}
              className="text-[10px] text-slate-500 hover:text-red-600 dark:text-slate-400"
            >
              Clear
            </button>
          </div>
          <div className="max-w-4xl mx-auto flex flex-wrap gap-1.5">
            {attachments.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-1.5 px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-300 dark:border-slate-700 text-xs shadow-2xs"
              >
                <FileText className="w-3 h-3 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="truncate max-w-[140px] font-mono text-[10px] font-medium text-slate-800 dark:text-slate-200">
                  {file.name}
                </span>
                <span className="text-[9px] text-slate-400">
                  ({(file.size / 1024).toFixed(0)} KB)
                </span>
                <button
                  type="button"
                  onClick={() => removeAttachment(idx)}
                  className="p-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-red-500 transition-colors"
                  title="Remove file"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACTIVE VOICE RECORDING BANNER */}
      {isListening && (
        <div className="px-4 sm:px-6 py-1.5 bg-red-50 dark:bg-red-950/40 border-t border-red-200 dark:border-red-800 flex items-center justify-between flex-shrink-0 text-xs animate-pulse">
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center space-x-2 text-red-700 dark:text-red-300 font-bold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span>Listening to voice... Speak now</span>
            </div>
            <button
              type="button"
              onClick={toggleVoiceInput}
              className="text-[10px] font-bold text-red-700 dark:text-red-300 hover:underline"
            >
              Stop Recording
            </button>
          </div>
        </div>
      )}

      {/* PERMANENTLY PINNED INPUT BAR WRAPPER */}
      <div className="sticky bottom-0 z-20 px-3 sm:px-6 py-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex-shrink-0 shadow-xs">
        
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.txt,image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Sleek Low-Profile Input Bar */}
        <div className="max-w-4xl mx-auto w-full flex items-center space-x-1.5 sm:space-x-2 bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 focus-within:border-emerald-600 dark:focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500/20 rounded-xl px-2 py-1 transition-all shadow-2xs">
          
          {/* Action Button: Upload Document */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
            title="Attach document (PDF, DOCX, TXT, Images)"
          >
            <Paperclip className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Action Button: Voice Input */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-1.5 rounded-lg transition-all flex-shrink-0 ${
              isListening
                ? "bg-red-600 text-white animate-pulse"
                : "text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-200/60 dark:hover:bg-slate-700"
            }`}
            title={isListening ? "Stop voice recording" : "Voice input (Speech to text)"}
          >
            {isListening ? (
              <MicOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>

          {/* Compact Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask about scholarships, documents, syllabus summary, or exam prep..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm py-1 px-1.5 resize-none focus:outline-none min-h-[34px] max-h-[100px] leading-relaxed"
          />

          {/* Compact Send Button */}
          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={(!inputPrompt.trim() && attachments.length === 0) || isLoading}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#0B2545] hover:bg-[#123b6d] dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shadow-xs flex-shrink-0 flex items-center space-x-1"
            title="Send Message (Enter)"
          >
            <span className="hidden sm:inline text-xs font-bold">Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
