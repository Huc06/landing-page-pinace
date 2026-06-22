"use client";

import Image from "next/image";
import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useSyncExternalStore,
} from "react";
import { ArrowUpRight } from "lucide-react";
import { prefersReducedMotion } from "@/lib/gsap";
import { useCases, site } from "@/lib/site";

// Subscribe to the (hover: hover) capability without an SSR hydration mismatch.
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const subscribeHover = (cb: () => void) => {
  const mq = window.matchMedia(HOVER_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export default function UseCases() {
  const [active, setActive] = useState<number | null>(null);

  // ---- cursor-following peek (mirrors the Hugo reference) ----
  const peekRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [lastIdx, setLastIdx] = useState(0);
  const hoverable = useSyncExternalStore(
    subscribeHover,
    () => window.matchMedia(HOVER_QUERY).matches,
    () => false,
  );

  // Track the pointer and lerp the peek card toward it for a smooth trail.
  useEffect(() => {
    if (!hoverable) return;
    const ease = prefersReducedMotion() ? 1 : 0.12;
    let raf = 0;
    let cx = 0;
    let cy = 0;
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    const tick = () => {
      cx += (targetRef.current.x - cx) * ease;
      cy += (targetRef.current.y - cy) * ease;
      if (peekRef.current) {
        peekRef.current.style.left = `${cx}px`;
        peekRef.current.style.top = `${cy}px`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [hoverable]);

  // ---- detail modal ----
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
  // Keep the last hovered item mounted during the fade-out for a clean exit.
  const peekItem = useCases[hoverIdx ?? lastIdx];
  const peekOn = hoverIdx !== null;

  return (
    <section id="use-cases" className="relative scroll-mt-24">
      {/* Full-width white block */}
      <div className="w-full bg-panel px-8 py-16 sm:px-14 sm:py-24 lg:px-20 lg:py-32">
        {/* Left-aligned heading */}
        <div className="mx-auto max-w-5xl">
          <h2 className="font-heading text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
            For example.
          </h2>
          <p className="mt-4 max-w-2xl text-[1.1rem] leading-relaxed text-foreground/60">
            Apps and agents that use the Pinace protocol. A user deposits into a
            pool, confirms a policy, and automation runs within those bounds.
          </p>

          {/* CTA — Fenik is the only LIVE agent right now; surface it
              up here so a visitor doesn't have to scan the table to
              find the one they can actually try. */}
          <a
            href={site.pocAgentUrl}
            target="_blank"
            rel="noreferrer"
            className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-pinace-blue px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(0,111,238,0.6)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_-8px_rgba(0,111,238,0.7)]"
          >
            <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_currentColor]" />
            Try our agent POC
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Agent rows */}
        <div className="mx-auto mt-14 max-w-5xl border-t border-border">
          {useCases.map((u, i) => (
            <button
              key={u.k}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => {
                setLastIdx(i);
                setHoverIdx(i);
              }}
              onMouseLeave={() => setHoverIdx(null)}
              className="group flex w-full items-center justify-between gap-6 border-b border-border py-7 text-left transition-[padding] duration-300 hover:px-4 sm:py-8"
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
                  <span className="font-heading block truncate text-[clamp(1.5rem,4vw,2.6rem)] font-semibold tracking-tight text-foreground transition-colors group-hover:text-[#2b8bff]">
                    {u.k}
                  </span>
                  <span className="mt-1 block text-sm text-foreground/40">
                    {u.tag}
                  </span>
                </span>
              </span>
              <span className="hidden flex-none text-right font-mono text-[13px] text-foreground/30 md:block">
                {u.meta}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* cursor-following peek — image + description follow the pointer on hover */}
      {hoverable && (
        <div
          ref={peekRef}
          aria-hidden
          className={`pointer-events-none fixed left-0 top-0 z-[60] w-[320px] -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] overflow-hidden rounded-2xl border border-border bg-panel shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition-[opacity,transform] duration-300 ease-out ${
            peekOn ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <div className="relative h-[200px] w-full bg-muted">
            <Image
              src={peekItem.img}
              alt=""
              fill
              sizes="320px"
              className="object-cover object-top"
            />
          </div>
          <div className="p-4">
            <p className="font-heading text-base font-semibold tracking-tight text-foreground">
              {peekItem.k}
            </p>
            <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-foreground/55">
              {peekItem.fn}
            </p>
          </div>
        </div>
      )}

      {/* detail modal */}
      {current && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center p-5">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />
          <div className="relative z-[2] grid max-h-[88vh] w-full max-w-[760px] overflow-auto rounded-2xl border border-border bg-panel sm:grid-cols-[0.8fr_1fr]">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-[3] flex h-10 w-10 items-center justify-center rounded-full border border-border bg-panel text-foreground"
            >
              ✕
            </button>
            {/* phone image */}
            <div className="relative min-h-[260px] overflow-hidden border-b border-border bg-muted sm:border-b-0 sm:border-r sm:rounded-l-2xl">
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
                <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                  {current.k}
                </h3>
              </div>
              <p className="mt-2 text-sm uppercase tracking-wide text-foreground/40">
                {current.tag}
              </p>
              <p className="mt-5 text-[15.5px] leading-relaxed text-foreground/60">
                {current.desc}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {current.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[12px] text-foreground/60"
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
