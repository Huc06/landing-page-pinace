"use client";

import { useEffect, useRef } from "react";

/**
 * Ocean-vibe hero background — Pinace's brand sailboat lives on
 * water, so the hero now reads as a deep ocean with stacked wave
 * crests + a soft horizon glow up top.
 *
 * Implementation notes (perf-first):
 * - All wave layers are SVG <path> animated via CSS `transform:
 *   translateX(...)` only — GPU-composited, no layout work, no
 *   filter:blur on per-frame elements.
 * - The mouse highlight is a single radial gradient applied to a
 *   div via CSS variables (no blurred siblings). One rAF tick with
 *   easing — no per-pixel blur recompute on cursor move.
 * - prefers-reduced-motion → static frame (waves stop drifting,
 *   mouse highlight pins to center).
 */
export function BlueMeshBg() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let raf = 0;
    let tx = 50,
      ty = 50,
      cx = 50,
      cy = 50;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width) * 100;
      ty = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const tick = () => {
      // Heavier easing (0.04) keeps motion smoother — no jitter on
      // fast mouse moves, looks like the highlight glides.
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      el.style.setProperty("--mx", `${cx}%`);
      el.style.setProperty("--my", `${cy}%`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{
        // Deep-sea base: midnight navy at the top, drowned blue at the
        // bottom. Layers compose on top.
        background:
          "linear-gradient(180deg, #02050d 0%, #03133b 40%, #051a4e 70%, #03102f 100%)",
        // @ts-expect-error inline CSS vars
        "--mx": "50%",
        "--my": "30%",
      }}
    >
      {/* Top horizon glow — feels like dawn light on the ocean. */}
      <div
        className="absolute inset-x-0 top-0 h-[55%] pointer-events-none"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 0%, rgba(112, 158, 255, 0.35) 0%, rgba(0, 70, 200, 0.18) 35%, transparent 75%)",
        }}
      />

      {/* Mouse-follow highlight — single radial gradient via CSS vars.
          No blurred sibling, no jank. */}
      <div
        className="absolute inset-0 pointer-events-none transition-[background] duration-150"
        style={{
          background:
            "radial-gradient(40% 50% at var(--mx) var(--my), rgba(170, 200, 255, 0.18) 0%, transparent 65%)",
        }}
      />

      {/* Ocean waves — 4 SVG layers stacked, each translateX-animated
          at a different speed for parallax depth. Pinned to the
          bottom 60% of the viewport. */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full pointer-events-none"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        style={{ height: "65vh" }}
      >
        <defs>
          <linearGradient id="waveA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a4dff" stopOpacity="0.18" />
            <stop offset="1" stopColor="#0a1f5c" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id="waveB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a6dff" stopOpacity="0.22" />
            <stop offset="1" stopColor="#0e2a7a" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="waveC" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5b87ff" stopOpacity="0.28" />
            <stop offset="1" stopColor="#0b1f5a" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id="waveD" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#85a8ff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#06163d" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Far wave — slowest, smallest amplitude */}
        <g className="wave wave-a">
          <path
            d="M0 180 C 300 120, 600 240, 900 160 S 1500 160, 1800 200 L 2400 200 L 2400 400 L 0 400 Z"
            fill="url(#waveA)"
          />
        </g>
        {/* Mid waves */}
        <g className="wave wave-b">
          <path
            d="M0 240 C 250 180, 550 280, 850 220 S 1500 200, 1800 260 L 2400 260 L 2400 400 L 0 400 Z"
            fill="url(#waveB)"
          />
        </g>
        <g className="wave wave-c">
          <path
            d="M0 290 C 220 230, 520 330, 820 270 S 1500 250, 1800 310 L 2400 310 L 2400 400 L 0 400 Z"
            fill="url(#waveC)"
          />
        </g>
        {/* Near wave — fastest, biggest, darkest */}
        <g className="wave wave-d">
          <path
            d="M0 340 C 200 290, 500 380, 800 320 S 1500 300, 1800 350 L 2400 350 L 2400 400 L 0 400 Z"
            fill="url(#waveD)"
          />
        </g>
      </svg>

      {/* Star dust — tiny static dots in the sky portion. Cheap. */}
      <div
        className="absolute inset-x-0 top-0 h-[45%] pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, white 1px, transparent 1.5px), radial-gradient(circle at 80% 35%, white 0.8px, transparent 1.2px), radial-gradient(circle at 30% 60%, white 0.5px, transparent 1px), radial-gradient(circle at 70% 80%, white 0.7px, transparent 1.2px), radial-gradient(circle at 55% 15%, white 0.6px, transparent 1px), radial-gradient(circle at 45% 70%, white 0.5px, transparent 1px)",
          backgroundSize: "300px 300px, 400px 400px, 250px 250px, 350px 350px, 280px 280px, 320px 320px",
        }}
      />

      <style jsx>{`
        .wave {
          will-change: transform;
        }
        .wave-a {
          animation: wave-drift 22s linear infinite;
        }
        .wave-b {
          animation: wave-drift 16s linear infinite reverse;
        }
        .wave-c {
          animation: wave-drift 12s linear infinite;
        }
        .wave-d {
          animation: wave-drift 9s linear infinite reverse;
        }
        @keyframes wave-drift {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-1200px, 0, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .wave {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
