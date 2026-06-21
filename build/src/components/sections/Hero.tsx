"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { AddToChromeButton } from "@/components/common/AddToChromeButton";
import { BlueMeshBg } from "@/components/common/BlueMeshBg";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate w-full min-h-screen bg-black text-white overflow-hidden"
    >
      {/* Interactive blue mesh background — replaces the prior Mux
          video. Mouse-react gradient blobs (Awwwards "background
          interaction" vibe), no third-party assets needed. */}
      <BlueMeshBg />
      {/* Soften the bottom so the headline reads cleanly + a vignette
          for depth. */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 30%, transparent 0%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.6) 100%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center mt-20 px-6 pb-24 pt-32 space-y-12">
        {/* Pre-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-5xl lg:text-[48px] leading-[1.1] text-white"
        >
          Delegate, don&apos;t trust
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-[family-name:var(--font-instrument-sans)] font-semibold text-6xl sm:text-8xl lg:text-[136px] leading-[0.9] tracking-tighter bg-gradient-to-b from-white via-white to-[#b4c0ff] bg-clip-text text-transparent"
        >
          Pinace
        </motion.h1>

        {/* Moat — short, sharp distinction vs every other "autonomous
            agent wallet" out there. Rendered above the supporting
            copy as the line a skim-reader will remember. */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="max-w-2xl font-[family-name:var(--font-instrument-sans)] text-xl sm:text-2xl font-medium leading-[1.35] text-white"
        >
          Other agent wallets hand the AI your keys.{" "}
          <span className="text-[#85a8ff]">Pinace hands it a budget.</span>
        </motion.p>

        {/* Supporting */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-xl font-[family-name:var(--font-instrument-sans)] text-base sm:text-lg leading-[1.65] text-white"
        >
          On-chain policy enforcement, one-click revoke, never
          custodial — built on Sui Move.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col items-center gap-6 sm:flex-row"
        >
          {/* Primary Button */}
          <AddToChromeButton className="group flex items-center gap-3 rounded-full bg-white pl-6 pr-2 py-2 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105">
            <span className="font-[family-name:var(--font-instrument-sans)] text-lg font-medium text-[#0a0400]">
              Add to Chrome
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3054ff] transition-colors group-hover:bg-[#2040e0]">
              <ArrowRight className="size-5 text-white" />
            </span>
          </AddToChromeButton>

          {/* Secondary Button */}
          <a
            href="#developers"
            className="group flex items-center gap-2 rounded-lg px-4 py-2 text-white/70 backdrop-blur-sm transition-all hover:bg-white/5 hover:text-white"
          >
            <span className="font-[family-name:var(--font-instrument-sans)] text-lg font-medium">
              View Docs
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
