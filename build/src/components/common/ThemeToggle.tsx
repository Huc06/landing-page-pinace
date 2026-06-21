"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * The nav sunburst doubles as the theme switch: it shows a full sun in light
 * mode and morphs (cross-fade + spin) into a crescent moon in dark mode.
 *
 * Defaults to "dark" before the client resolves the stored theme so SSR and the
 * first client render agree — no hydration warning, no setState-in-effect.
 * `className` carries the contrast color (white over the Hero, foreground once
 * the nav scrolls onto the panels).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = (resolvedTheme ?? "light") === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "grid place-items-center rounded-full p-1 transition-colors duration-300 hover:opacity-80",
        className,
      )}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Sun — core + rays, visible in light mode */}
        <g
          className={cn(
            "origin-center transition-all duration-500 ease-out",
            isDark
              ? "scale-50 rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100",
          )}
        >
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          <path
            d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Moon — crescent, visible in dark mode */}
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          fill="currentColor"
          className={cn(
            "origin-center transition-all duration-500 ease-out",
            isDark
              ? "scale-100 rotate-0 opacity-100"
              : "scale-50 -rotate-90 opacity-0",
          )}
        />
      </svg>
    </button>
  );
}
