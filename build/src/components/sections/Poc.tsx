import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

const stackItems = [
  { label: "Frontend", desc: "Wallet extension" },
  { label: "Backend", desc: "Indexer" },
  { label: "@pinace/core", desc: "SDK" },
];

export default function Poc() {
  return (
    <section id="poc" className="relative scroll-mt-24">
      {/* Full-width white block */}
      <div className="w-full bg-white px-8 py-16 sm:px-14 sm:py-24 lg:px-20 lg:py-32">
        {/* Proof of concept badge */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-black/10 bg-[#f5f5f7] px-4 py-1.5 text-[13px] font-medium uppercase tracking-wide text-black/50">
            Proof of concept
          </span>
          <h2 className="font-heading mt-6 text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-black">
            <span className="block">Pinace Agent</span>
          </h2>
        </div>

        {/* Content */}
        <Reveal className="mx-auto mt-14 max-w-4xl" y={26}>
          <p className="text-center text-[1.2rem] leading-relaxed text-black/60 sm:text-[1.35rem]">
            Conversational on-chain trading on Sui. Natural-language intent →
            quote → policy pre-flight → atomic settlement, all bounded by
            user-owned capabilities attached on chain.
          </p>

          {/* Stack items */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {stackItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-black/10 bg-[#f5f5f7] px-6 py-5 text-center transition-colors hover:bg-[#ededf0]"
              >
                <p className="font-mono text-[15px] font-semibold text-black">
                  {item.label}
                </p>
                <p className="mt-1 text-[14px] text-black/50">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex justify-center">
            <a
              href="#developers"
              className="inline-flex items-center gap-2.5 rounded-full bg-black px-7 py-4 text-[15px] font-semibold uppercase tracking-wide text-white transition-transform hover:scale-105"
            >
              <span>explore the stack</span>
              <ArrowUpRight className="size-5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
