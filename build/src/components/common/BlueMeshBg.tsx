"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero ocean — Pinace brand sailboats tacking right-to-left across a
 * deep night sea. 3 boats at different sizes / depths / speeds for
 * parallax. 4 wave layers built as tileable sine paths that translate
 * inside an oversized SVG canvas, so no hard "shelf" edges show
 * at the screen boundaries.
 *
 * Perf: GPU-composited transforms only, no per-frame blur.
 *
 * prefers-reduced-motion → everything pins still.
 */
type Splash = { id: number; x: number; y: number };

export function BlueMeshBg() {
  const root = useRef<HTMLDivElement>(null);
  const [splashes, setSplashes] = useState<Splash[]>([]);
  // Track a monotonic id so React's keyed reconciliation never reuses
  // an old ripple's animation frame.
  const splashId = useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = root.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const id = ++splashId.current;
    setSplashes((s) => [...s, { id, x, y }]);
    window.setTimeout(() => {
      setSplashes((s) => s.filter((sp) => sp.id !== id));
    }, 1200);
  };

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
      onPointerDown={onPointerDown}
      className="absolute inset-0 overflow-hidden cursor-crosshair"
      style={{
        background:
          "linear-gradient(180deg, #02050d 0%, #03133b 40%, #051a4e 70%, #03102f 100%)",
        // @ts-expect-error inline CSS vars
        "--mx": "50%",
        "--my": "30%",
      }}
    >
      {/* Click ripples — visible foam splashes that grow + fade. */}
      {splashes.map((s) => (
        <span
          key={s.id}
          className="splash pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        />
      ))}
      <div
        className="absolute inset-x-0 top-0 h-[55%] pointer-events-none"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 0%, rgba(112, 158, 255, 0.35) 0%, rgba(0, 70, 200, 0.18) 35%, transparent 75%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(40% 50% at var(--mx) var(--my), rgba(170, 200, 255, 0.16) 0%, transparent 65%)",
          transition: "background 120ms linear",
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-[45%] pointer-events-none opacity-45"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, white 1px, transparent 1.5px), radial-gradient(circle at 80% 35%, white 0.8px, transparent 1.2px), radial-gradient(circle at 30% 60%, white 0.5px, transparent 1px), radial-gradient(circle at 70% 80%, white 0.7px, transparent 1.2px), radial-gradient(circle at 55% 15%, white 0.6px, transparent 1px), radial-gradient(circle at 45% 70%, white 0.5px, transparent 1px)",
          backgroundSize:
            "300px 300px, 400px 400px, 250px 250px, 350px 350px, 280px 280px, 320px 320px",
        }}
      />

      {/* Three Pinace sailboats — all running right → left, different
          sizes + depths + speeds for parallax. Far boat on horizon
          (small, slow, high), mid boat (medium), near boat
          (largest, fastest, lowest, soft glow). */}
      {/* Nine glowing Pinace sailboats riding inside the wave band
          (bottom 50% of the viewport). Each has its own lane height,
          cross speed, bob speed, and start delay so the fleet looks
          like a regatta drifting past rather than a marching line.
          Every boat carries a white-neon drop-shadow stack from
          <BoatSvg glow/> — bright crest against the deep navy water. */}
      <div className="boat-lane far-a">
        <div className="boat-tack tack-far-a">
          <div className="boat-bob bob-far">
            <BoatSvg size={22} opacity={0.55} glow />
          </div>
        </div>
      </div>
      <div className="boat-lane far-b">
        <div className="boat-tack tack-far-b">
          <div className="boat-bob bob-far">
            <BoatSvg size={26} opacity={0.6} glow />
          </div>
        </div>
      </div>
      <div className="boat-lane far-c">
        <div className="boat-tack tack-far-c">
          <div className="boat-bob bob-far">
            <BoatSvg size={20} opacity={0.5} glow />
          </div>
        </div>
      </div>
      <div className="boat-lane mid-a">
        <div className="boat-tack tack-mid-a">
          <div className="boat-bob bob-mid">
            <BoatSvg size={38} opacity={0.8} glow />
          </div>
        </div>
      </div>
      <div className="boat-lane mid-b">
        <div className="boat-tack tack-mid-b">
          <div className="boat-bob bob-mid">
            <BoatSvg size={42} opacity={0.85} glow />
          </div>
        </div>
      </div>
      <div className="boat-lane mid-c">
        <div className="boat-tack tack-mid-c">
          <div className="boat-bob bob-mid">
            <BoatSvg size={36} opacity={0.78} glow />
          </div>
        </div>
      </div>
      <div className="boat-lane near-a">
        <div className="boat-tack tack-near-a">
          <div className="boat-bob bob-near">
            <BoatSvg size={58} opacity={0.95} glow />
          </div>
        </div>
      </div>
      <div className="boat-lane near-b">
        <div className="boat-tack tack-near-b">
          <div className="boat-bob bob-near">
            <BoatSvg size={64} opacity={1} glow />
          </div>
        </div>
      </div>
      <div className="boat-lane near-c">
        <div className="boat-tack tack-near-c">
          <div className="boat-bob bob-near">
            <BoatSvg size={50} opacity={0.9} glow />
          </div>
        </div>
      </div>

      {/* Waves — oversized SVG canvas (2400 wide for a 1200 viewport
          target) so we can translate ±300px without ever showing the
          rectangular path edge. Sine-style cubic curves repeat across
          the path so the shape stays continuous as it scrolls. */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full pointer-events-none"
        viewBox="0 0 2400 400"
        preserveAspectRatio="none"
        style={{ height: "60vh" }}
      >
        <defs>
          <linearGradient id="waveA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a4dff" stopOpacity="0.16" />
            <stop offset="1" stopColor="#0a1f5c" stopOpacity="0.42" />
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
            <stop offset="1" stopColor="#06163d" stopOpacity="0.88" />
          </linearGradient>
        </defs>

        {/* Each wave path: an overscan x in [-400, 2800] so translate
            ±300 still has shape extending past the viewBox edges →
            no vertical shelves. Continuous sine with cubic bezier
            mirrors at each peak. */}
        <g className="wave wave-a">
          <path
            d="M-400 200 C -200 160 0 240 200 200 S 600 160 800 200 1200 240 1400 200 1800 160 2000 200 2400 240 2800 200 L 2800 400 L -400 400 Z"
            fill="url(#waveA)"
          />
        </g>
        <g className="wave wave-b">
          <path
            d="M-400 260 C -200 220 0 300 200 260 S 600 220 800 260 1200 300 1400 260 1800 220 2000 260 2400 300 2800 260 L 2800 400 L -400 400 Z"
            fill="url(#waveB)"
          />
        </g>
        <g className="wave wave-c">
          <path
            d="M-400 310 C -200 270 0 350 200 310 S 600 270 800 310 1200 350 1400 310 1800 270 2000 310 2400 350 2800 310 L 2800 400 L -400 400 Z"
            fill="url(#waveC)"
          />
        </g>
        <g className="wave wave-d">
          <path
            d="M-400 360 C -150 320 100 390 350 360 S 850 320 1100 360 1600 390 1850 360 2350 320 2600 360 2800 380 2800 380 L 2800 400 L -400 400 Z"
            fill="url(#waveD)"
          />
        </g>
      </svg>

      <style jsx>{`
        .wave {
          will-change: transform;
        }
        .wave-a {
          animation: wave-swell 28s ease-in-out infinite alternate;
        }
        .wave-b {
          animation: wave-swell 21s ease-in-out infinite alternate-reverse;
        }
        .wave-c {
          animation: wave-swell 15s ease-in-out infinite alternate;
        }
        .wave-d {
          animation: wave-swell 11s ease-in-out infinite alternate-reverse;
        }
        @keyframes wave-swell {
          from {
            transform: translate3d(-280px, 0, 0);
          }
          to {
            transform: translate3d(280px, 0, 0);
          }
        }

        /* Click ripple — outward concentric foam ring + soft halo. */
        .splash {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 2;
          animation: splash 1.2s ease-out forwards;
        }
        .splash::before,
        .splash::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(170, 200, 255, 0.85);
          animation: splash-ring 1.2s ease-out forwards;
        }
        .splash::after {
          border-color: rgba(255, 255, 255, 0.55);
          animation-delay: 0.12s;
        }
        @keyframes splash {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes splash-ring {
          0%   { transform: scale(0.2); opacity: 1; }
          100% { transform: scale(6);   opacity: 0; }
        }

        /* Boat lanes — every boat lives inside the wave band (bottom
           half of the viewport) so they look like they're floating on
           water, never hovering above the horizon. */
        .boat-lane {
          position: absolute;
          inset-inline: 0;
          z-index: 1;
          pointer-events: none;
        }
        .boat-lane.far-a  { bottom: 48%; height: 22px; }
        .boat-lane.far-b  { bottom: 44%; height: 26px; }
        .boat-lane.far-c  { bottom: 40%; height: 20px; }
        .boat-lane.mid-a  { bottom: 35%; height: 38px; }
        .boat-lane.mid-b  { bottom: 32%; height: 42px; }
        .boat-lane.mid-c  { bottom: 28%; height: 36px; }
        .boat-lane.near-a { bottom: 23%; height: 58px; }
        .boat-lane.near-b { bottom: 18%; height: 64px; }
        .boat-lane.near-c { bottom: 14%; height: 50px; }

        .boat-tack {
          position: absolute;
          will-change: transform;
        }
        /* All boats sail right → left. Periods + delays staggered so
           the fleet drifts past at varying speeds — far boats slower
           (horizon parallax), near boats faster. */
        .tack-far-a   { right: 0; animation: boat-cross-rtl 82s linear infinite; animation-delay: -10s; }
        .tack-far-b   { right: 0; animation: boat-cross-rtl 70s linear infinite; animation-delay: -42s; }
        .tack-far-c   { right: 0; animation: boat-cross-rtl 88s linear infinite; animation-delay: -60s; }
        .tack-mid-a   { right: 0; animation: boat-cross-rtl 56s linear infinite; animation-delay: -25s; }
        .tack-mid-b   { right: 0; animation: boat-cross-rtl 48s linear infinite; animation-delay: -8s; }
        .tack-mid-c   { right: 0; animation: boat-cross-rtl 62s linear infinite; animation-delay: -38s; }
        .tack-near-a  { right: 0; animation: boat-cross-rtl 36s linear infinite; animation-delay: -4s; }
        .tack-near-b  { right: 0; animation: boat-cross-rtl 32s linear infinite; animation-delay: -18s; }
        .tack-near-c  { right: 0; animation: boat-cross-rtl 40s linear infinite; animation-delay: -27s; }

        @keyframes boat-cross-rtl {
          from { transform: translateX(120px); }
          to   { transform: translateX(-105vw); }
        }
        .boat-bob {
          will-change: transform;
        }
        /* Bob periods sync roughly with the wave-swell periods (10–28s
           range) so each boat rises and falls with the swell rather
           than ticking on its own clock. */
        .bob-far { animation: bob-soft 8.5s ease-in-out infinite; }
        .bob-mid { animation: bob 6s ease-in-out infinite; }
        .bob-near {
          animation: bob 4.6s ease-in-out infinite;
          animation-delay: -1s;
        }
        /* Bigger bob amplitude for near boat (more visible), softer
           for far boats (depth illusion). */
        @keyframes bob {
          0%, 100% { transform: translateY(0) rotate(-1.5deg); }
          50%      { transform: translateY(-7px) rotate(1.5deg); }
        }
        @keyframes bob-soft {
          0%, 100% { transform: translateY(0) rotate(-0.6deg); }
          50%      { transform: translateY(-3px) rotate(0.6deg); }
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

function BoatSvg({
  size,
  opacity,
  glow,
}: {
  size: number;
  opacity: number;
  glow?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      style={{
        opacity,
        // Stacked drop-shadows fake a neon-white glow: a tight inner
        // halo (3px white) + a soft outer bloom (12px white) + a wide
        // sky-blue ambient (28px). Reads as a glowing sail against
        // the dark ocean.
        filter: glow
          ? "drop-shadow(0 0 3px rgba(255,255,255,0.9)) drop-shadow(0 0 12px rgba(255,255,255,0.5)) drop-shadow(0 0 28px rgba(122,160,255,0.55))"
          : "drop-shadow(0 0 6px rgba(255,255,255,0.6)) drop-shadow(0 0 14px rgba(122,160,255,0.4))",
      }}
    >
      <g fill="#fff">
        <path d="M40.842 37.9081C41.6849 28.6865 43.1152 23.1026 46.2284 14.4241C46.3123 14.1902 46.6553 14.2383 46.6706 14.4862C47.3167 24.9688 47.6904 31.3883 51.0461 40.4012C51.1785 40.7568 50.8485 41.1139 50.485 41.0049C47.2141 40.024 45.503 39.3638 41.2 38.3998C40.9752 38.3494 40.821 38.1375 40.842 37.9081Z" />
        <path d="M12.9478 30.6851C12.1232 32.0123 11.6058 36.6848 14.3899 39.0575C14.5482 39.1924 14.7795 39.185 14.9462 39.0607C21.0776 34.4879 31.1433 37.4443 30.1544 43.2642C30.1032 43.5652 30.3235 43.8594 30.6289 43.8624C39.3821 43.9483 46.1685 45.9127 49.3634 51.954C49.5298 52.2688 49.98 52.3094 50.193 52.0241C52.3696 49.107 55.4959 46.0646 51.5539 43.4011C47.3153 40.5372 41.5694 39.9469 34.7138 37.7878C27.8582 35.6286 17.7592 29.8833 16.3845 29.5396C15.0098 29.1959 13.7986 29.3157 12.9478 30.6851Z" />
        <path d="M50.9889 58.0581L12.3435 57.4964C12.1551 57.4937 11.9859 57.3721 11.9214 57.1951C7.95423 46.295 13.005 39.4842 19.9358 38.017C26.9293 36.5364 33.6652 43.5158 25.8752 44.7759C18.5863 45.955 16.6284 53.3525 24.3837 55.8945C24.6393 55.9783 24.7631 55.6406 24.5303 55.5059C9.09244 46.5743 40.1911 37.9512 49.0547 53.0026C49.1742 53.2056 49.4275 53.2947 49.6503 53.2181C53.4091 51.9257 55.7171 55.792 51.1946 58.0119C51.1315 58.0429 51.0592 58.0592 50.9889 58.0581Z" />
        <path d="M47.8403 7.57436C43.1624 18.5299 40.9606 26.1017 39.8324 37.5307C39.8052 37.8056 39.5431 37.9981 39.2738 37.9364C34.6706 36.8814 30.779 35.773 26.8293 32.8605C26.7319 32.7887 26.6664 32.6828 26.6536 32.5626C25.9759 26.2196 37.6437 14.7395 47.497 7.29799C47.6839 7.15681 47.9323 7.35892 47.8403 7.57436Z" />
      </g>
    </svg>
  );
}
