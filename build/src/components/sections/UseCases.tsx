"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import { Section } from "@/components/common/Section";
import { SplitHeading } from "@/components/common/SplitHeading";
import { Reveal } from "@/components/common/Reveal";
import { gsap, useGSAP, canHover, prefersReducedMotion } from "@/lib/gsap";
import { useCases } from "@/lib/site";

const toneText = {
  blue: "group-hover:text-pinace-blue-bright",
  teal: "group-hover:text-pinace-teal",
  pink: "group-hover:text-pinace-pink",
} as const;

export default function UseCases() {
  const scope = useRef<HTMLDivElement>(null);
  const peekRef = useRef<HTMLDivElement>(null);
  const [peek, setPeek] = useState<{ img: string; name: string } | null>(null);
  const [active, setActive] = useState<number | null>(null);

  // peek follows the cursor with a soft lerp (desktop pointers only)
  useGSAP(() => {
    if (!peekRef.current) return;
    gsap.set(peekRef.current, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(peekRef.current, "x", {
      duration: 0.5,
      ease: "power3",
    });
    const yTo = gsap.quickTo(peekRef.current, "y", {
      duration: 0.5,
      ease: "power3",
    });
    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  });

  const onClose = useCallback(() => setActive(null), []);
  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, onClose]);

  const current = active !== null ? useCases[active] : null;

  return (
    <Section id="use-cases">
      <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-heading text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold uppercase tracking-tight text-pinace-pink">
          For example
        </span>
        <span className="onchain rounded-full border border-pinace-pink/40 bg-pinace-pink/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-pinace-pink">
          not built by Pinace
        </span>
      </div>
      <SplitHeading
        text="Apps you'd grant, bounded by"
        accent="policy."
        className="text-[clamp(2rem,5vw,4rem)]"
      />
      <Reveal className="mt-5" y={16}>
        <p className="max-w-2xl text-lg text-white/60">
          These are <b className="font-semibold text-white">example</b>{" "}
          third-party agents and apps. A user deposits into a pool, confirms a
          policy that lets the app in, and it transacts automatically within
          those bounds. Hover to see what each does through the protocol.
        </p>
      </Reveal>

      <div ref={scope} className="mt-12 border-t border-white/10">
        {useCases.map((u, i) => (
          <button
            key={u.k}
            type="button"
            data-cursor="grow"
            onPointerEnter={() => setPeek({ img: u.img, name: u.k })}
            onPointerLeave={() => setPeek(null)}
            onClick={() => setActive(i)}
            className="group flex w-full items-center justify-between gap-6 border-b border-white/10 py-7 text-left transition-[padding] duration-300 hover:px-4 sm:py-8"
          >
            <span className="flex min-w-0 items-center gap-5">
              <Image
                src={u.avatar}
                alt={`${u.k} agent`}
                width={48}
                height={48}
                className="hidden h-12 w-12 flex-none rounded-full sm:block"
              />
              <span className="min-w-0">
                <span
                  className={`font-heading block truncate text-[clamp(1.5rem,4vw,2.6rem)] font-semibold tracking-tight text-white transition-colors ${toneText[u.tone]}`}
                >
                  {u.k}
                </span>
                {/* function — revealed on hover */}
                <span className="block max-h-0 overflow-hidden text-[14px] text-white/55 opacity-0 transition-all duration-300 group-hover:mt-1 group-hover:max-h-12 group-hover:opacity-100">
                  {u.fn}
                </span>
                <span className="mt-1 block text-sm text-white/40 group-hover:hidden">
                  {u.tag}
                </span>
              </span>
            </span>
            <span className="onchain hidden flex-none text-right text-[13px] text-white/40 md:block">
              {u.meta}
            </span>
          </button>
        ))}
      </div>

      {/* cursor-following peek disabled — text hover is sufficient */}

      {/* detail modal — phone screenshot framed correctly */}
      {current && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center p-5">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />
          <div className="relative z-[2] grid max-h-[88vh] w-full max-w-[760px] overflow-auto border border-white/12 bg-[#0b0f1d] sm:grid-cols-[0.8fr_1fr]">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-[3] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white"
            >
              ✕
            </button>
            {/* phone image */}
            <div className="relative min-h-[260px] overflow-hidden border-b border-white/10 bg-black sm:border-b-0 sm:border-r">
              <Image
                src={current.img}
                alt={`${current.k} in the Pinace wallet`}
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                className="object-cover object-top"
              />
            </div>
            {/* text */}
            <div className="p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <Image
                  src={current.avatar}
                  alt=""
                  width={42}
                  height={42}
                  className="rounded-full"
                />
                <h3 className="font-heading text-2xl font-semibold tracking-tight text-white">
                  {current.k}
                </h3>
              </div>
              <p className="mt-2 text-sm uppercase tracking-wide text-white/40">
                {current.tag}
              </p>
              <p className="mt-5 text-[15.5px] leading-relaxed text-white/70">
                {current.desc}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {current.tags.map((t) => (
                  <span
                    key={t}
                    className="onchain rounded-full border border-white/15 px-3 py-1 text-[12px] text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
