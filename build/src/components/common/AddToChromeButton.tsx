"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Wrap arbitrary content (icon + label) — caller owns the visual style. */
  children: React.ReactNode;
  className?: string;
};

/**
 * "Add to Chrome" trigger used across Nav / Hero / FinalCta.
 *
 * The wallet isn't on the Chrome Web Store yet — clicking the button
 * surfaces a centred toast explaining we're working on publishing it.
 * Auto-dismisses after 4s. Same component is reused so copy + styling
 * stay in sync across every CTA on the page.
 */
export function AddToChromeButton({ children, className }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => setOpen(false), 4500);
    return () => window.clearTimeout(t);
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
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed inset-x-0 top-6 z-[100] flex justify-center px-4 sm:top-8"
        >
          <div
            className="pointer-events-auto flex max-w-md items-start gap-3 rounded-2xl border border-white/10 bg-[#0c0c0e]/95 px-4 py-3 shadow-2xl backdrop-blur-md"
            style={{
              boxShadow:
                "0 0 0 1px rgba(48, 84, 255, 0.18), 0 18px 40px -16px rgba(48, 84, 255, 0.35)",
            }}
          >
            <span
              aria-hidden
              className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full"
              style={{
                background: "rgba(48,84,255,0.16)",
                color: "#7AA0FF",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 8v4M12 16h.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </span>
            <div className="flex-1 text-sm leading-snug text-white">
              <p className="font-semibold">Heads up</p>
              <p className="mt-0.5 text-white/70">
                We&apos;re working on publishing Pinace Wallet on the
                Chrome Web Store. For early access, grab the unpacked
                build from our GitHub.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Dismiss"
              className="text-white/40 transition-colors hover:text-white"
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
          </div>
        </div>
      )}
    </>
  );
}
