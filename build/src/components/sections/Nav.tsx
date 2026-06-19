"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Products", href: "#products", hasDropdown: true },
  { label: "How it works", href: "#how" },
  { label: "Build", href: "#ideas" },
  { label: "Developers", href: "#developers" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left — Sunburst icon */}
        <a href="#top" aria-label="Home">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path
              d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </a>

        {/* Center — Navigation links (desktop) */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-1 font-[family-name:var(--font-instrument-sans)] text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {item.label}
              {item.hasDropdown && <ChevronDown className="size-3.5" />}
            </a>
          ))}
        </nav>

        {/* Right — CTA buttons */}
        <div className="flex items-center gap-4">
          <a
            href="#developers"
            className="hidden font-[family-name:var(--font-instrument-sans)] text-sm font-medium text-white/80 transition-colors hover:text-white sm:block"
          >
            Docs
          </a>
          <a
            href="#install"
            className="rounded-full bg-white px-5 py-2.5 font-[family-name:var(--font-instrument-sans)] text-sm font-semibold text-black transition-transform hover:scale-105"
          >
            Add to Chrome
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span
            className={cn(
              "h-0.5 w-6 bg-white transition-transform",
              open && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 bg-white transition-opacity",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 bg-white transition-transform",
              open && "-translate-y-2 -rotate-45",
            )}
          />
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          "fixed inset-0 z-[-1] flex flex-col justify-center gap-2 bg-black/95 px-8 backdrop-blur-xl transition-transform duration-500 md:hidden",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        {navLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="border-b border-white/10 py-4 font-[family-name:var(--font-instrument-sans)] text-3xl font-semibold text-white"
          >
            {item.label}
          </a>
        ))}
        <a
          href="#install"
          onClick={() => setOpen(false)}
          className="mt-6 rounded-full bg-white px-5 py-3 text-center font-[family-name:var(--font-instrument-sans)] text-base font-semibold text-black"
        >
          Add to Chrome
        </a>
      </div>
    </header>
  );
}
