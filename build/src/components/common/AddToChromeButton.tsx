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
 * The Chrome Web Store listing is in review. The source repo is
 * currently private, so the modal links straight to the README's
 * Build & Ship section (anyone with repo access can build their own
 * .zip from there) AND offers a Telegram fallback for the unpacked
 * build. Click-outside or Esc closes.
 */
const TELEGRAM_HANDLE = "johntran03";
const GITHUB_BUILD_URL = "https://github.com/pinace-wallet/frontend#build--ship";
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
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7AA0FF]">
                  Early access
                </p>
                <h2
                  id="chrome-toast-title"
                  className="font-[family-name:var(--font-instrument-sans)] text-2xl font-semibold text-white"
                >
                  We&apos;re polishing the Chrome listing
                </h2>
                <p className="text-sm leading-relaxed text-white/65">
                  Pinace Wallet is launching on the Chrome Web Store
                  shortly. Want the unpacked build now? The repo is
                  currently private — DM the maintainer on Telegram
                  and you&apos;ll get the zipped extension.
                </p>
              </div>

              {/* Telegram handle card — copy-friendly + obvious affordance. */}
              <a
                href={`https://t.me/${TELEGRAM_HANDLE}`}
                target="_blank"
                rel="noreferrer"
                className="group flex w-full items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-left transition-all hover:border-[#7AA0FF]/40 hover:bg-white/[0.05]"
              >
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(48,84,255,0.18)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#7AA0FF" aria-hidden>
                    <path d="M9.78 17.65 9.6 14.17l8.32-7.5c.36-.32-.08-.48-.55-.2L7.1 13.04 2.66 11.63c-.96-.28-.97-.95.21-1.4l17.32-6.68c.79-.36 1.55.19 1.25 1.4l-2.95 13.9c-.2.97-.79 1.2-1.59.75l-4.4-3.25-2.12 2.05c-.24.24-.45.45-.92.45z" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-white/40">
                    Telegram
                  </p>
                  <p className="font-[family-name:var(--font-instrument-sans)] text-base font-semibold text-white">
                    @{TELEGRAM_HANDLE}
                  </p>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 text-white/35 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                  aria-hidden
                >
                  <path
                    d="M7 17L17 7M10 7h7v7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <div className="mt-1 flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
                <a
                  href={GITHUB_BUILD_URL}
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
