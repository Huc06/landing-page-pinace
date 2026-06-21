"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Wrap arbitrary content (icon + label) — caller owns the visual style. */
  children: React.ReactNode;
  className?: string;
};

/**
 * "Add to Chrome" trigger reused across Nav / Hero / FinalCta.
 *
 * The wallet isn't on the Chrome Web Store yet — clicking pops a
 * centred modal (HeroUI-style) explaining we're working on it and
 * pointing to GitHub for early access. Click-outside or Esc closes.
 */
export function AddToChromeButton({ children, className }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // Lock body scroll while the modal is open.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn("cursor-pointer", className)}
      >
        {children}
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chrome-toast-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          {/* Card */}
          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0c0d12] shadow-2xl"
            style={{
              boxShadow:
                "0 0 0 1px rgba(48, 84, 255, 0.18), 0 30px 80px -20px rgba(48, 84, 255, 0.55)",
            }}
          >
            {/* Top blue glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-40"
              style={{
                background:
                  "radial-gradient(70% 80% at 50% 0%, rgba(48,84,255,0.30) 0%, transparent 70%)",
              }}
            />

            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="relative flex flex-col items-center gap-5 px-7 py-9 text-center">
              {/* Icon */}
              <div
                className="flex size-14 items-center justify-center rounded-full"
                style={{
                  background: "rgba(48,84,255,0.16)",
                  boxShadow:
                    "0 0 0 1px rgba(48,84,255,0.35) inset, 0 12px 32px -10px rgba(48,84,255,0.55)",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#7AA0FF"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M12 7v5l3 2"
                    stroke="#7AA0FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="space-y-1.5">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7AA0FF]"
                >
                  Coming soon
                </p>
                <h2
                  id="chrome-toast-title"
                  className="font-[family-name:var(--font-instrument-sans)] text-2xl font-semibold text-white"
                >
                  We&apos;re polishing the Chrome listing
                </h2>
                <p className="text-sm leading-relaxed text-white/65">
                  Pinace Wallet is launching on the Chrome Web Store
                  shortly. Want early access? Grab the unpacked build
                  from our GitHub and load it manually.
                </p>
              </div>

              <div className="mt-2 flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
                <a
                  href="https://github.com/pinace-wallet"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-shadow"
                  style={{
                    background: "#3054ff",
                    boxShadow: "0 8px 24px -8px rgba(48,84,255,0.6)",
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.93 10.93 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.08 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
                  </svg>
                  Open GitHub
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-white/12 bg-transparent px-5 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/[0.04]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
