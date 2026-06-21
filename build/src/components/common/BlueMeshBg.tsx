"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive blue mesh-gradient background — Pinace's take on the
 * Awwwards "background interaction" reference. Pure CSS layers
 * (no canvas / no WebGL), but a mouse-react JS hook nudges two of
 * the gradient blobs toward the cursor so the surface feels alive
 * without breaking SSR.
 *
 * Layers (back to front):
 * - solid base #05080f
 * - 3 large radial blobs animated via CSS keyframes (slow drift)
 * - 2 mouse-following blobs (the "interaction" bit)
 * - subtle grain to break up the gradient banding
 */
export function BlueMeshBg() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let raf = 0;
    let tx = 50,
      ty = 50; // target percent
    let cx = 50,
      cy = 50; // current percent (eased)

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width) * 100;
      ty = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
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
        background: "#05080f",
        // Defaults so the layer paints something pre-JS hydration.
        // @ts-expect-error inline CSS vars
        "--mx": "50%",
        "--my": "50%",
      }}
    >
      {/* drifting blobs */}
      <div className="bm-blob bm-a" />
      <div className="bm-blob bm-b" />
      <div className="bm-blob bm-c" />
      {/* mouse-react blobs */}
      <div className="bm-mouse bm-mouse-1" />
      <div className="bm-mouse bm-mouse-2" />
      {/* grain */}
      <div className="bm-grain" />

      <style jsx>{`
        .bm-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          will-change: transform;
        }
        .bm-a {
          width: 65vw;
          height: 65vw;
          left: -10vw;
          top: -15vw;
          background: radial-gradient(
            circle,
            rgba(48, 84, 255, 0.55) 0%,
            rgba(48, 84, 255, 0) 70%
          );
          animation: drift-a 22s ease-in-out infinite alternate;
        }
        .bm-b {
          width: 55vw;
          height: 55vw;
          right: -10vw;
          top: 10vw;
          background: radial-gradient(
            circle,
            rgba(0, 111, 238, 0.45) 0%,
            rgba(0, 111, 238, 0) 70%
          );
          animation: drift-b 28s ease-in-out infinite alternate;
        }
        .bm-c {
          width: 70vw;
          height: 70vw;
          left: 20vw;
          bottom: -30vw;
          background: radial-gradient(
            circle,
            rgba(99, 134, 255, 0.4) 0%,
            rgba(99, 134, 255, 0) 70%
          );
          animation: drift-c 36s ease-in-out infinite alternate;
        }

        .bm-mouse {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          transform: translate(-50%, -50%);
        }
        .bm-mouse-1 {
          width: 36vw;
          height: 36vw;
          left: var(--mx);
          top: var(--my);
          background: radial-gradient(
            circle,
            rgba(122, 160, 255, 0.5) 0%,
            rgba(122, 160, 255, 0) 70%
          );
          transition: opacity 0.3s;
        }
        .bm-mouse-2 {
          width: 22vw;
          height: 22vw;
          left: var(--mx);
          top: var(--my);
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.22) 0%,
            rgba(255, 255, 255, 0) 70%
          );
          mix-blend-mode: screen;
        }

        .bm-grain {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.85'/></svg>");
        }

        @keyframes drift-a {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(8vw, 4vw, 0) scale(1.1);
          }
        }
        @keyframes drift-b {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(-6vw, 6vw, 0) scale(1.15);
          }
        }
        @keyframes drift-c {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(-10vw, -8vw, 0) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
