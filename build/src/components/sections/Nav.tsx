"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { AddToChromeButton } from "@/components/common/AddToChromeButton";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "How it works", href: "#model" },
  { label: "Build", href: "#use-cases" },
  { label: "Developers", href: "#developers" },
  // Docs is hosted as a separate Next/fumadocs app on Railway — open
  // in a new tab so the landing nav doesn't lose its scroll position.
  { label: "Docs", href: site.docsUrl, external: true },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Over the Hero (first viewport) the nav sits on the dark video → white text.
  // After scroll > 100px it sits on themed panels → use the foreground token.
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When the page is scrolled the nav pill flips to ~85% white
  // bg — force the links to pure black so they read against it
  // (text-foreground was too soft in light mode). Top state stays
  // soft white since the pill is barely-visible glass over the
  // dark hero.
  const linkColor = scrolled
    ? "text-black/85 hover:text-black"
    : "text-white/85 hover:text-white";

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div className="relative flex items-center justify-between px-6 py-4 transition-colors duration-300">
        {/* Left — sunburst doubles as the theme toggle (sun ↔ moon) */}
        <ThemeToggle
          className={cn(
            "transition-colors duration-300",
            scrolled ? "text-foreground" : "text-white",
          )}
        />

        {/* Center — Navigation links (desktop) wrapped in a frosted
            white pill. Background opacity bumps when the page is
            scrolled (`scrolled`) so the links stay legible over
            light content underneath. Stays absolutely centred so
            left/right items can shift width without affecting it. */}
        <nav
          className={cn(
            "hidden md:absolute md:left-1/2 md:top-1/2 md:flex md:-translate-x-1/2 md:-translate-y-1/2",
            "items-center gap-7 rounded-full border px-5 py-2 backdrop-blur-md transition-colors duration-300",
            scrolled
              ? "border-black/8 bg-white/85 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]"
              : "border-white/12 bg-white/8 shadow-[0_8px_30px_-12px_rgba(255,255,255,0.18)]",
          )}
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className={cn(
                "flex items-center gap-1 font-[family-name:var(--font-instrument-sans)] text-sm font-medium transition-colors duration-300",
                linkColor,
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right — CTA button */}
        <div className="flex items-center gap-4">
          <AddToChromeButton
            className={cn(
              "rounded-full px-5 py-2.5 font-[family-name:var(--font-instrument-sans)] text-sm font-semibold transition-all duration-300 hover:scale-105",
              scrolled
                ? "bg-black text-white dark:border dark:border-white/15"
                : "bg-white text-black",
            )}
          >
            Add to Chrome
          </AddToChromeButton>
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
              "h-0.5 w-6 transition-all duration-300",
              scrolled ? "bg-foreground" : "bg-white",
              open && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 transition-all duration-300",
              scrolled ? "bg-foreground" : "bg-white",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 transition-all duration-300",
              scrolled ? "bg-foreground" : "bg-white",
              open && "-translate-y-2 -rotate-45",
            )}
          />
        </button>
      </div>

      {/* Mobile sheet — dark overlay in both modes (nav chrome) */}
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
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            onClick={() => setOpen(false)}
            className="border-b border-white/10 py-4 font-[family-name:var(--font-instrument-sans)] text-3xl font-semibold text-white"
          >
            {item.label}
          </a>
        ))}
        <AddToChromeButton
          className="mt-6 rounded-full bg-white px-5 py-3 text-center font-[family-name:var(--font-instrument-sans)] text-base font-semibold text-black"
        >
          Add to Chrome
        </AddToChromeButton>
      </div>
    </header>
  );
}
