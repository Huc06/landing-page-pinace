"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Word-by-word reveal heading (mirrors the reference's data-split effect),
 * rebuilt on GSAP. Text is fully visible by default (SSR/no-JS/reduced-motion);
 * the hidden start state is only applied at the scroll trigger.
 */
export function SplitHeading({
  text,
  accent,
  className,
  as: Tag = "h2",
}: {
  text: string;
  accent?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.from(ref.current.querySelectorAll("[data-word] > span"), {
        yPercent: 115,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.06,
        immediateRender: false,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      className={cn(
        "font-heading font-semibold leading-[1.02] tracking-[-0.03em] text-white",
        className,
      )}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          data-word
          className="inline-block overflow-hidden align-bottom"
        >
          <span className="inline-block">{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
      {accent ? (
        <>
          {" "}
          <span data-word className="inline-block overflow-hidden align-bottom">
            <span className="inline-block bg-gradient-to-r from-pinace-blue-bright to-pinace-blue bg-clip-text text-transparent">
              {accent}
            </span>
          </span>
        </>
      ) : null}
    </Tag>
  );
}
