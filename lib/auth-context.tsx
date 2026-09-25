"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DEMO_USERS, UserProfile } from "@/lib/data";

interface AuthContextType {
  user: UserProfile | null;
  role: "applicant" | "officer" | "ministry" | null;
  language: "en" | "hi";
  setLanguage: (lang: "en" | "hi") => void;
  fontSize: "normal" | "large" | "xlarge";
  setFontSize: (size: "normal" | "large" | "xlarge") => void;
  highContrast: boolean;
  setHighContrast: (contrast: boolean) => void;
  login: (roleKey: "applicant" | "officer" | "ministry") => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (preferredRole?: "applicant" | "officer" | "ministry") => void;
  closeAuthModal: () => void;
  authModalInitialRole: "applicant" | "officer" | "ministry";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<"applicant" | "officer" | "ministry">("applicant");

  // Load persisted session from localStorage
  useEffect(() => {
    try {
      const storedRole = localStorage.getItem("tribalscholar_role") as "applicant" | "officer" | "ministry" | null;
      if (storedRole && DEMO_USERS[storedRole]) {
        setUser(DEMO_USERS[storedRole]);
      }
      const storedLang = localStorage.getItem("tribalscholar_lang") as "en" | "hi" | null;
      if (storedLang) setLanguage(storedLang);
    } catch {
      // ignore
    }
  }, []);

  const login = (roleKey: "applicant" | "officer" | "ministry") => {
    const selectedUser = DEMO_USERS[roleKey];
    if (selectedUser) {
      setUser(selectedUser);
      try {
        localStorage.setItem("tribalscholar_role", roleKey);
      } catch {
        // ignore
      }
    }
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("tribalscholar_role");
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
      localStorage.setItem("tribalscholar_lang", lang);
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        language,
        setLanguage: handleSetLanguage,
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        login,
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
