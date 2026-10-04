import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import AuthModal from "@/components/AuthModal";
import PublicShell from "@/components/PublicShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://aarohan.tribal.gov.in"),
  title: "Aarohan - AI-Enabled Scholarship & Fellowship Portal | MoTA",
  description: "Official digital scholarship and fellowship management platform for Scheduled Tribe students by Ministry of Tribal Affairs, Government of India.",
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Aarohan - AI-Enabled Scholarship & Fellowship Portal | MoTA",
    description: "Official digital scholarship and fellowship management platform for Scheduled Tribe students by Ministry of Tribal Affairs, Government of India.",
    url: "https://aarohan.tribal.gov.in",
    siteName: "Aarohan Portal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1000,
        alt: "Aarohan - Ministry of Tribal Affairs Official Scholarship Portal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
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
