"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Logo } from "@/components/common/Logo";
import { Container } from "@/components/common/Container";
import { site } from "@/lib/site";

const POWERED = [
  {
    name: "Sui",
    href: "https://sui.io",
    icon: (
      <svg viewBox="0 0 64 64" className="h-5 w-5" aria-hidden>
        <path
          d="M32 6c5 8 14 14 18 22a18 18 0 1 1-36 0c4-8 13-14 18-22z"
          fill="#6FBCF0"
        />
        <ellipse cx="32" cy="33" rx="8" ry="6" fill="#0c1421" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: "DeepBook",
    href: "https://deepbook.tech",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <circle cx="12" cy="12" r="12" fill="#1A4DFF" />
        <rect x="5" y="9" width="14" height="3" rx="1.5" fill="#fff" />
        <rect x="5" y="13" width="10" height="3" rx="1.5" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Wallet Standard",
    href: "https://docs.sui.io/standards/wallet-standard",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <rect x="3" y="6" width="18" height="13" rx="3" fill="#7AA0FF" />
        <rect x="3" y="6" width="18" height="3.5" fill="#3054FF" />
        <circle cx="17" cy="13.5" r="1.6" fill="#fff" />
      </svg>
    ),
  },
];

const LINKS = {
  product: [
    { label: "Products", href: "#products" },
    { label: "How it works", href: "#model" },
    { label: "Build", href: "#use-cases" },
    { label: "Developers", href: "#developers" },
  ],
  resources: [
    { label: "Docs", href: site.docsUrl, external: true },
    { label: "GitHub", href: site.githubUrl, external: true },
    { label: "Fenik (POC)", href: site.pocAgentUrl, external: true },
    { label: "Mobile waitlist", href: "#waitlist" },
  ],
  legal: [
    { label: "Pitch deck", href: "https://canva.link/hjmekgph587fgog", external: true },
    { label: "Suiscan (Move)", href: "https://suiscan.xyz/testnet/object/0x5be5ab0292590e61e2dc21d11cc7174970f48e5ff54c88d4797c81b2a751a23b", external: true },
  ],
};

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #02050d 0%, #03133b 60%, #051a4e 100%)",
      }}
    >
      {/* Soft top glow so the footer feels lit from the surface
          above, matching the hero's ocean palette. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(48,84,255,0.22) 0%, transparent 70%)",
        }}
      />

      <Container>
        <div className="relative py-16">
          {/* Top — brand block + nav columns */}
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Logo />
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/55">
                The autonomous-agent wallet on Sui. Delegate a budget and a
                rulebook — never your keys.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[13px] font-medium text-white/70">
                  <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_currentColor]" />
                  Live · testnet
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[13px] font-medium text-white/70">
                  Non-custodial
                </span>
              </div>

              {/* Powered-by row — Sui, DeepBook, Wallet Standard */}
              <div className="mt-7">
                <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-white/35">
                  Powered by
                </p>
                <div className="flex flex-wrap gap-2">
                  {POWERED.map((p) => (
                    <a
                      key={p.name}
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] text-white/75 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    >
                      {p.icon}
                      {p.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <FooterColumn title="Product" links={LINKS.product} />
            <FooterColumn title="Resources" links={LINKS.resources} />
            <FooterColumn title="More" links={LINKS.legal} />
          </div>

          {/* Bottom — copyright */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-7 text-[13px] text-white/40 sm:flex-row sm:items-center"
          >
            <span>
              © {new Date().getFullYear()} Pinace · Non-custodial by design
            </span>
            <span className="flex items-center gap-2">
              <Image
                src="/brand/pinace-logo.svg"
                alt=""
                width={14}
                height={14}
                className="opacity-60"
              />
              <span>Crafted on Sui</span>
            </span>
          </motion.div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[11px] uppercase tracking-[0.14em] text-white/35">
        {title}
      </span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target={l.external ? "_blank" : undefined}
          rel={l.external ? "noreferrer" : undefined}
          className="text-[15px] text-white/65 transition-colors hover:text-white"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
