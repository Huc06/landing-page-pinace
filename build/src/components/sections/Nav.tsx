"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/common/ThemeToggle";

const navLinks = [
  { label: "Products", href: "#products", hasDropdown: true },
  { label: "How it works", href: "#model" },
  { label: "Build", href: "#use-cases" },
  { label: "Developers", href: "#developers" },
  { label: "Docs", href: "#developers" },
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

  const linkColor = scrolled
    ? "text-foreground/70 hover:text-foreground"
    : "text-white/80 hover:text-white";

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

        {/* Center — Navigation links (desktop), absolutely centered so it's
            unaffected by the differing widths of the left/right items */}
        <nav className="hidden items-center gap-8 md:absolute md:left-1/2 md:top-1/2 md:flex md:-translate-x-1/2 md:-translate-y-1/2">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-1 font-[family-name:var(--font-instrument-sans)] text-sm font-medium transition-colors duration-300",
                linkColor,
              )}
            >
              {item.label}
              {item.hasDropdown && <ChevronDown className="size-3.5" />}
            </a>
          ))}
        </nav>

        {/* Right — CTA button */}
        <div className="flex items-center gap-4">
          <a
            href="#install"
            className={cn(
              "rounded-full px-5 py-2.5 font-[family-name:var(--font-instrument-sans)] text-sm font-semibold transition-all duration-300 hover:scale-105",
              scrolled
                ? "bg-black text-white dark:border dark:border-white/15"
                : "bg-white text-black",
            )}
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
