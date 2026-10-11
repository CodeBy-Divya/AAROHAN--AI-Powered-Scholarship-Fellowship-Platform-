"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DEMO_USERS, UserProfile } from "@/lib/data";

interface AuthContextType {
  user: UserProfile | null;
  role: "applicant" | "officer" | "ministry" | null;
  isHydrated: boolean;
  language: "en" | "hi";
  setLanguage: (lang: "en" | "hi") => void;
  fontSize: "normal" | "large" | "xlarge";
  setFontSize: (size: "normal" | "large" | "xlarge") => void;
  highContrast: boolean;
  setHighContrast: (contrast: boolean) => void;
  login: (roleKey: "applicant" | "officer" | "ministry") => void;
  registerApplicant: (details: {
    firstName: string;
    lastName: string;
    gender: string;
    contact: string;
    state: string;
    password?: string;
  }) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (preferredRole?: "applicant" | "officer" | "ministry") => void;
  closeAuthModal: () => void;
  authModalInitialRole: "applicant" | "officer" | "ministry";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<"applicant" | "officer" | "ministry">("applicant");

  // Load persisted session from localStorage
  useEffect(() => {
    try {
      const customUserStr = localStorage.getItem("aarohan_custom_user") || localStorage.getItem("tribalscholar_custom_user");
      const storedRole = (localStorage.getItem("aarohan_role") || localStorage.getItem("tribalscholar_role")) as "applicant" | "officer" | "ministry" | null;
      if (storedRole === "applicant" && customUserStr) {
        setUser(JSON.parse(customUserStr));
      } else if (storedRole && DEMO_USERS[storedRole]) {
        setUser(DEMO_USERS[storedRole]);
      } else {
        setUser(null);
      }
      const storedLang = (localStorage.getItem("aarohan_lang") || localStorage.getItem("tribalscholar_lang")) as "en" | "hi" | null;
      if (storedLang) setLanguage(storedLang);
    } catch {
      setUser(null);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const login = (roleKey: "applicant" | "officer" | "ministry") => {
    const selectedUser = DEMO_USERS[roleKey];
    if (selectedUser) {
      setUser(selectedUser);
      try {
        localStorage.setItem("aarohan_role", roleKey);
        localStorage.removeItem("aarohan_custom_user");
      } catch {
        // ignore
      }
    }
    setIsAuthModalOpen(false);
  };

  const registerApplicant = (details: {
    firstName: string;
    lastName: string;
    gender: string;
    contact: string;
    state: string;
    password?: string;
  }) => {
    const isEmail = details.contact.includes("@");
    const newUser: UserProfile = {
      id: `ST-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: `${details.firstName} ${details.lastName}`.trim(),
      email: isEmail ? details.contact : `${details.firstName.toLowerCase()}.${details.lastName.toLowerCase()}@aarohan.in`,
      phone: isEmail ? "" : details.contact,
      gender: details.gender,
      role: "applicant",
      roleTitle: "Registered ST Scholar",
      state: details.state,
      category: "Scheduled Tribe (ST)",
      tribe: "Recognized ST",
      district: "Tribal District",
      institution: "Applicant / Scholar",
      course: "Higher Education / Research",
      aadhaarLast4: "••••",
      readinessScore: 75,
    };
    setUser(newUser);
    try {
      localStorage.setItem("aarohan_role", "applicant");
      localStorage.setItem("aarohan_custom_user", JSON.stringify(newUser));
    } catch {
      // ignore
    }
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("aarohan_role");
      localStorage.removeItem("aarohan_custom_user");
      localStorage.removeItem("tribalscholar_role");
      localStorage.removeItem("tribalscholar_custom_user");
    } catch {
      // ignore
    }
  };

  const openAuthModal = (preferredRole: "applicant" | "officer" | "ministry" = "applicant") => {
    setAuthModalInitialRole(preferredRole);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleSetLanguage = (lang: "en" | "hi") => {
    setLanguage(lang);
    try {
      localStorage.setItem("aarohan_lang", lang);
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isHydrated,
        language,
        setLanguage: handleSetLanguage,
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        login,
        registerApplicant,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalInitialRole,
      }}
    >
      <div
        className={`${highContrast ? "contrast-125 saturate-50" : ""} ${
          fontSize === "large" ? "text-lg" : fontSize === "xlarge" ? "text-xl" : "text-base"
        }`}
      >
        {children}
      </div>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
