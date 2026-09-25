"use client";

import React from "react";
import { useTheme } from "@/lib/theme-context";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-colors flex items-center justify-center text-xs"
      title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-3.5 h-3.5 text-amber-300" />
      ) : (
        <Sun className="w-3.5 h-3.5 text-amber-400" />
      )}
    </button>
  );
}
