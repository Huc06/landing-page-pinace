import Image from "next/image";
import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { CountUp } from "@/components/common/CountUp";
import { Reveal } from "@/components/common/Reveal";
import { modelStats } from "@/lib/site";

export default function Model() {
  return (
    <Section id="model">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.42fr] lg:gap-16">
        <div>
          <SectionKicker tone="violet">What is Pinace?</SectionKicker>
          <SplitHeading
            text="A permission you grant —"
            accent="not a key you give away."
            className="mt-5"
          />

          <Reveal className="mt-7 space-y-5" stagger={0.12}>
            <p className="max-w-2xl text-[1.15rem] leading-relaxed text-white/65">
              Pinace is the autonomous agent wallet on Sui. Instead of handing
              an app your private key, you hand it a{" "}
              <b className="font-semibold text-white">scoped permission</b> —
              and the blockchain itself makes sure it can never step outside.
            </p>
            <p className="max-w-2xl text-[1.15rem] leading-relaxed text-white/65">
              You deposit into a pool you own and attach a policy: a budget, an
              allowed token list, a slippage cap, an expiry. Any agent or app
              you choose can then transact from that pool automatically — and{" "}
              <b className="font-semibold text-white">
                one transaction from you confirms the grant
              </b>
              .
            </p>
            <p className="max-w-2xl text-[1.15rem] leading-relaxed text-white/65">
              Every move is checked on-chain before it settles. Revoke whenever
              you like; their next action reverts on-chain. That&rsquo;s the
              whole idea — automation you never have to trust.
            </p>
          </Reveal>

          <dl className="mt-10 flex flex-wrap gap-x-14 gap-y-6">
            {modelStats.map((s) => (
              <div key={s.label}>
                <dd className="font-heading bg-gradient-to-br from-pinace-blue-bright to-pinace-blue bg-clip-text text-[2.8rem] font-bold leading-none text-transparent">
                  <CountUp to={s.to} />
                  {s.suffix}
                </dd>
                <dt className="mt-2 text-sm uppercase tracking-wide text-white/45">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* mascot accent — no wallet UI */}
        <Reveal className="relative hidden items-center justify-center lg:flex">
          <div
            className="absolute inset-0 -z-10 opacity-60 [background:radial-gradient(55%_55%_at_50%_45%,var(--pinace-violet),transparent_70%)] [filter:blur(50px)]"
            aria-hidden
          />
          {/* Glassy halo wrapper */}
          <div className="pinace-logo-wrap relative">
            {/* spinning colour halo ring */}
            <span className="pinace-logo-halo" aria-hidden />
            {/* frosted glass disc */}
            <span className="pinace-logo-glass" aria-hidden />
            {/* shimmer sweep */}
            <span className="pinace-logo-shimmer" aria-hidden />
            <Image
              src="/brand/logo_boat.svg"
              alt="Pinace"
              width={750}
              height={825}
              className="relative z-10 h-auto w-full max-w-[800px] opacity-95"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
