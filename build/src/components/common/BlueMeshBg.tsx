"use client";

import { useEffect, useRef } from "react";

/**
 * Hero ocean background — Pinace's brand sailboat lives on water,
 * so the hero is a deep night ocean with stacked wave crests, a
 * dawn glow, faint stars, and the white Pinace sailboat itself
 * tacking back and forth across the horizon.
 *
 * Perf: GPU-composited transforms only.
 * - SVG wave layers translateX → parallax, no blur on per-frame paint.
 * - Boat: translateX (back-and-forth) + translateY sine bob → one
 *   element, two cheap CSS keyframes.
 * - Mouse highlight: ONE radial gradient bound to --mx/--my via rAF
 *   easing. No blurred siblings.
 * - prefers-reduced-motion → everything pins still.
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
      ty = 30,
      cx = 50,
      cy = 30;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width) * 100;
      ty = ((e.clientY - rect.top) / rect.height) * 100;
    };
    const tick = () => {
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
        background:
          "linear-gradient(180deg, #02050d 0%, #03133b 40%, #051a4e 70%, #03102f 100%)",
        // @ts-expect-error inline CSS vars
        "--mx": "50%",
        "--my": "30%",
      }}
    >
      {/* Dawn horizon glow */}
      <div
        className="absolute inset-x-0 top-0 h-[55%] pointer-events-none"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 0%, rgba(112, 158, 255, 0.35) 0%, rgba(0, 70, 200, 0.18) 35%, transparent 75%)",
        }}
      />

      {/* Cursor-follow highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(40% 50% at var(--mx) var(--my), rgba(170, 200, 255, 0.16) 0%, transparent 65%)",
          transition: "background 120ms linear",
        }}
      />

      {/* Star dust */}
      <div
        className="absolute inset-x-0 top-0 h-[45%] pointer-events-none opacity-45"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, white 1px, transparent 1.5px), radial-gradient(circle at 80% 35%, white 0.8px, transparent 1.2px), radial-gradient(circle at 30% 60%, white 0.5px, transparent 1px), radial-gradient(circle at 70% 80%, white 0.7px, transparent 1.2px), radial-gradient(circle at 55% 15%, white 0.6px, transparent 1px), radial-gradient(circle at 45% 70%, white 0.5px, transparent 1px)",
          backgroundSize:
            "300px 300px, 400px 400px, 250px 250px, 350px 350px, 280px 280px, 320px 320px",
        }}
      />

      {/* Sailboat — tacks back and forth across the waves. White Pinace
          brand mark. Sits ABOVE the far/mid waves, BELOW the foreground
          wave so it looks like it's riding the crest. */}
      <div className="boat-lane pointer-events-none">
        <div className="boat-tack">
          <div className="boat-bob">
            <svg width="56" height="56" viewBox="0 0 64 64" className="boat-svg">
              <g fill="#fff">
                <path d="M40.842 37.9081C41.6849 28.6865 43.1152 23.1026 46.2284 14.4241C46.3123 14.1902 46.6553 14.2383 46.6706 14.4862C47.3167 24.9688 47.6904 31.3883 51.0461 40.4012C51.1785 40.7568 50.8485 41.1139 50.485 41.0049C47.2141 40.024 45.503 39.3638 41.2 38.3998C40.9752 38.3494 40.821 38.1375 40.842 37.9081Z" />
                <path d="M12.9478 30.6851C12.1232 32.0123 11.6058 36.6848 14.3899 39.0575C14.5482 39.1924 14.7795 39.185 14.9462 39.0607C21.0776 34.4879 31.1433 37.4443 30.1544 43.2642C30.1032 43.5652 30.3235 43.8594 30.6289 43.8624C39.3821 43.9483 46.1685 45.9127 49.3634 51.954C49.5298 52.2688 49.98 52.3094 50.193 52.0241C52.3696 49.107 55.4959 46.0646 51.5539 43.4011C47.3153 40.5372 41.5694 39.9469 34.7138 37.7878C27.8582 35.6286 17.7592 29.8833 16.3845 29.5396C15.0098 29.1959 13.7986 29.3157 12.9478 30.6851Z" />
                <path d="M50.9889 58.0581L12.3435 57.4964C12.1551 57.4937 11.9859 57.3721 11.9214 57.1951C7.95423 46.295 13.005 39.4842 19.9358 38.017C26.9293 36.5364 33.6652 43.5158 25.8752 44.7759C18.5863 45.955 16.6284 53.3525 24.3837 55.8945C24.6393 55.9783 24.7631 55.6406 24.5303 55.5059C9.09244 46.5743 40.1911 37.9512 49.0547 53.0026C49.1742 53.2056 49.4275 53.2947 49.6503 53.2181C53.4091 51.9257 55.7171 55.792 51.1946 58.0119C51.1315 58.0429 51.0592 58.0592 50.9889 58.0581Z" />
                <path d="M47.8403 7.57436C43.1624 18.5299 40.9606 26.1017 39.8324 37.5307C39.8052 37.8056 39.5431 37.9981 39.2738 37.9364C34.6706 36.8814 30.779 35.773 26.8293 32.8605C26.7319 32.7887 26.6664 32.6828 26.6536 32.5626C25.9759 26.2196 37.6437 14.7395 47.497 7.29799C47.6839 7.15681 47.9323 7.35892 47.8403 7.57436Z" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Ocean waves — 4 SVG layers stacked, ease-in-out drift for
          a more organic swell vs. the prior linear scroll. */}
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

        <g className="wave wave-a">
          <path
            d="M0 180 C 300 120, 600 240, 900 160 S 1500 160, 1800 200 L 2400 200 L 2400 400 L 0 400 Z"
            fill="url(#waveA)"
          />
        </g>
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
        <g className="wave wave-d">
          <path
            d="M0 340 C 200 290, 500 380, 800 320 S 1500 300, 1800 350 L 2400 350 L 2400 400 L 0 400 Z"
            fill="url(#waveD)"
          />
        </g>
      </svg>

      <style jsx>{`
        .wave {
          will-change: transform;
        }
        /* Drift the wave path slowly using cubic-bezier easing so the
           translate looks like swell building & relaxing instead of a
           constant-speed scroll. The animation never resets — it
           bounces between two states (alternate). */
        .wave-a {
          animation: wave-swell 26s cubic-bezier(0.55, 0, 0.45, 1) infinite
            alternate;
        }
        .wave-b {
          animation: wave-swell 19s cubic-bezier(0.55, 0, 0.45, 1) infinite
            alternate-reverse;
        }
        .wave-c {
          animation: wave-swell 14s cubic-bezier(0.55, 0, 0.45, 1) infinite
            alternate;
        }
        .wave-d {
          animation: wave-swell 10s cubic-bezier(0.55, 0, 0.45, 1) infinite
            alternate-reverse;
        }
        @keyframes wave-swell {
          from {
            transform: translate3d(-150px, 0, 0);
          }
          to {
            transform: translate3d(150px, 0, 0);
          }
        }

        /* Boat lane — full-width invisible row pinned just above the
           foreground wave crest. */
        .boat-lane {
          position: absolute;
          inset-inline: 0;
          bottom: 38%;
          height: 56px;
          z-index: 1;
        }
        /* Outer tack: slow left↔right traversal across the ocean. */
        .boat-tack {
          position: absolute;
          left: 0;
          width: 56px;
          animation: boat-cross 38s ease-in-out infinite alternate;
          will-change: transform;
        }
        /* Inner bob: subtle up/down on the wave. */
        .boat-bob {
          animation: boat-bob 5s ease-in-out infinite;
          will-change: transform;
        }
        .boat-svg {
          filter: drop-shadow(0 4px 12px rgba(122, 160, 255, 0.45));
        }
        @keyframes boat-cross {
          from {
            transform: translateX(calc(-10vw)) rotate(-2deg);
          }
          to {
            transform: translateX(calc(100vw - 46px)) rotate(2deg);
          }
        }
        @keyframes boat-bob {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .wave,
          .boat-tack,
          .boat-bob {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
