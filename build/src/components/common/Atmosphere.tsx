"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Ambient brand atmosphere:
 * - subtle grain texture
 * - scroll progress bar
 */
export function Atmosphere() {
  const root = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { scrub: 0.3, start: 0, end: "max" },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="pointer-events-none">
      {/* grain texture */}
      <div className="fixed inset-0 z-[3] opacity-[0.03] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22120%22%20height=%22120%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%22.9%22%20numOctaves=%223%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      {/* scroll progress */}
      <div className="fixed inset-x-0 top-0 z-[80] h-[2px]">
        <div
          ref={barRef}
          className="h-full origin-left scale-x-0 bg-white/40"
        />
      </div>
    </div>
  );
}
