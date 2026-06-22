import Image from "next/image";
import { Reveal } from "@/components/common/Reveal";

export default function Model() {
  return (
    <section id="model" className="relative scroll-mt-24">
      <div className="w-full bg-panel px-8 py-16 sm:px-14 sm:py-24 lg:px-20 lg:py-32">
        {/* Section label — now centred above the 2-col block. */}
        <h2 className="mx-auto max-w-6xl text-center font-heading text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground mb-12">
          What is Pinace?
        </h2>

        <Reveal
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
          y={26}
        >
          {/* Left — Pinace logo in dark rounded card */}
          <div className="relative flex items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-[#080c18] to-[#141a2e] p-12 sm:p-16 lg:p-20">
            <div className="pinace-logo-wrap relative mx-auto">
              <span className="pinace-logo-halo" aria-hidden />
              <span className="pinace-logo-glass" aria-hidden />
              <span className="pinace-logo-shimmer" aria-hidden />
              <Image
                src="/brand/logo_boat.svg"
                alt="Pinace"
                width={500}
                height={550}
                className="relative z-10 mx-auto block h-auto w-full max-w-[420px] opacity-95"
              />
            </div>
          </div>

          {/* Right — content. "Start now" CTA removed per request. */}
          <div>
            <h2 className="font-heading text-[clamp(2.4rem,5vw,4.2rem)] font-bold leading-[1.08] tracking-tight text-foreground">
              Delegate without
              <br />
              handing over keys
            </h2>

            <p className="mt-8 max-w-xl text-[1.15rem] leading-relaxed text-foreground/60">
              Pinace is the autonomous-agent wallet on Sui. Give an AI agent a
              budget and a rulebook — not your private key. On-chain policy
              enforcement, one-click revoke, all from your wallet.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
