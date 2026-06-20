"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { useCases } from "@/lib/site";

export default function UseCases() {
  const scope = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

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
    <section id="use-cases" className="relative scroll-mt-24">
      {/* Full-width white block */}
      <div className="w-full bg-white px-8 py-16 sm:px-14 sm:py-24 lg:px-20 lg:py-32">
        {/* Left-aligned heading */}
        <div className="mx-auto max-w-5xl">
          <h2 className="font-heading text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-black">
            For example.
          </h2>
          <p className="mt-4 max-w-2xl text-[1.1rem] leading-relaxed text-black/60">
            Apps and agents that use the Pinace protocol. A user deposits into a
            pool, confirms a policy, and automation runs within those bounds.
          </p>
        </div>

        {/* Agent rows */}
        <div
          ref={scope}
          className="mx-auto mt-14 max-w-5xl border-t border-black/10"
        >
          {useCases.map((u, i) => (
            <button
              key={u.k}
              type="button"
              onClick={() => setActive(i)}
              className="group flex w-full items-center justify-between gap-6 border-b border-black/10 py-7 text-left transition-[padding] duration-300 hover:px-4 sm:py-8"
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
                  <span className="font-heading block truncate text-[clamp(1.5rem,4vw,2.6rem)] font-semibold tracking-tight text-black transition-colors group-hover:text-[#2b8bff]">
                    {u.k}
                  </span>
                  {/* function — revealed on hover */}
                  <span className="block max-h-0 overflow-hidden text-[14px] text-black/50 opacity-0 transition-all duration-300 group-hover:mt-1 group-hover:max-h-12 group-hover:opacity-100">
                    {u.fn}
                  </span>
                  <span className="mt-1 block text-sm text-black/40 group-hover:hidden">
                    {u.tag}
                  </span>
                </span>
              </span>
              <span className="hidden flex-none text-right font-mono text-[13px] text-black/30 md:block">
                {u.meta}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* detail modal */}
      {current && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center p-5">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />
          <div className="relative z-[2] grid max-h-[88vh] w-full max-w-[760px] overflow-auto rounded-2xl border border-black/10 bg-white sm:grid-cols-[0.8fr_1fr]">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-[3] flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black"
            >
              ✕
            </button>
            {/* phone image */}
            <div className="relative min-h-[260px] overflow-hidden border-b border-black/10 bg-[#f5f5f7] sm:border-b-0 sm:border-r sm:rounded-l-2xl">
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
                <h3 className="font-heading text-2xl font-semibold tracking-tight text-black">
                  {current.k}
                </h3>
              </div>
              <p className="mt-2 text-sm uppercase tracking-wide text-black/40">
                {current.tag}
              </p>
              <p className="mt-5 text-[15.5px] leading-relaxed text-black/60">
                {current.desc}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {current.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-black/10 px-3 py-1 font-mono text-[12px] text-black/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
