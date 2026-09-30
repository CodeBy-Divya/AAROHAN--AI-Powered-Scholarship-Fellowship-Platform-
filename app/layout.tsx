import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import AuthModal from "@/components/AuthModal";
import PublicShell from "@/components/PublicShell";

export const metadata: Metadata = {
  title: "TribalScholar - AI-Enabled Scholarship & Fellowship Portal | MoTA",
  description: "Official digital scholarship and fellowship management platform for Scheduled Tribe students by Ministry of Tribal Affairs, Government of India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#FAF8F4] dark:bg-slate-950 text-[#0B1B2B] dark:text-slate-100 antialiased transition-colors">
        <ThemeProvider>
          <AuthProvider>
            <AuthModal />
            <PublicShell>{children}</PublicShell>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
