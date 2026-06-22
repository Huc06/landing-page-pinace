import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Instrument_Sans,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import { Atmosphere } from "@/components/common/Atmosphere";
import { ThemeProvider } from "@/components/common/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pinace.xyz"),
  title: "Pinace Wallet",
  description:
    "Pinace is the autonomous agent wallet on Sui. Delegate a budget and a rulebook to AI agents — limits enforced by Move smart contracts, revocable in one click. Non-custodial by design.",
  keywords: [
    "Pinace",
    "Sui wallet",
    "AI agent wallet",
    "autonomous agent",
    "non-custodial",
    "DeFi",
    "DeepBook",
    "agent delegation",
  ],
  openGraph: {
    title: "Pinace — The Autonomous Agent Wallet on Sui",
    description:
      "Give an AI agent a budget and a rulebook, not your private key. On-chain limits, one-click revoke.",
    type: "website",
    siteName: "Pinace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinace — The Autonomous Agent Wallet on Sui",
    description:
      "Give an AI agent a budget and a rulebook, not your private key. On-chain limits, one-click revoke.",
  },
  // Browser tab icon is picked up from src/app/icon.svg via the
  // App Router file-convention. No manual `icons` config needed —
  // Next.js injects the right <link rel="icon"> tags. We dropped
  // the old src/app/favicon.ico (Next.js template default) so the
  // SVG isn't overridden.
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSans.variable} ${instrumentSerif.variable}`}
    >
      <head />
      <body className="relative min-h-dvh antialiased">
        <ThemeProvider>
          <Atmosphere />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
