import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { sdkSnippet, sdkTiers, site } from "@/lib/site";

export default function Developers() {
  return (
    <section id="developers" className="relative scroll-mt-24">
      {/* Full-width white block */}
      <div className="w-full bg-white px-8 py-16 sm:px-14 sm:py-24 lg:px-20 lg:py-32">
        {/* Left-aligned heading */}
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-black">
            <span className="block">For developers.</span>
            <span className="block text-[#a974ff]">
              Bounded actions in a few lines.
            </span>
          </h2>
        </div>

        {/* 2-column grid: code left, SDK tiers + CTA right */}
        <Reveal
          className="mx-auto mt-16 grid max-w-6xl items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr]"
          y={26}
        >
          {/* Code block */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#0a0e1a]">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-2 font-mono text-[12px] text-white/40">
                agent.ts — @pinace/core
              </span>
            </div>
            <pre className="flex-1 whitespace-pre-wrap break-words p-6 font-mono text-[13px] leading-relaxed text-white/80">
              <code>{sdkSnippet}</code>
            </pre>
          </div>

          {/* Right column: tiers + CTA */}
          <div className="flex flex-col gap-5">
            {/* SDK tiers */}
            {sdkTiers.map((t) => {
              const published = t.status === "published";
              const isLink = published && "href" in t && Boolean(t.href);
              const card = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <p className="flex items-center gap-1.5 font-mono text-[14px] font-semibold text-[#a974ff]">
                      {t.pkg}
                      {isLink && (
                        <ArrowUpRight className="size-3.5 text-[#a974ff]/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      )}
                    </p>
                    {!published && (
                      <span className="rounded-full border border-black/10 bg-black/[0.04] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-black/35">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-[15px] text-black/60">{t.who}</p>
                </>
              );

              return isLink ? (
                <a
                  key={t.pkg}
                  href={(t as { href: string }).href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-xl border border-black/10 bg-[#f5f5f7] p-6 transition-colors hover:bg-[#ededf0]"
                >
                  {card}
                </a>
              ) : (
                <div
                  key={t.pkg}
                  className={`rounded-xl border border-black/10 bg-[#f5f5f7] p-6 ${
                    published ? "transition-colors hover:bg-[#ededf0]" : "opacity-60"
                  }`}
                >
                  {card}
                </div>
              );
            })}

            {/* CTA card */}
            <div className="flex flex-1 flex-col justify-center rounded-2xl bg-gradient-to-br from-[#0a0e1a] to-[#1a1f36] p-8">
              <h3 className="font-heading text-[1.4rem] font-semibold tracking-tight text-white">
                Publish a policy to the marketplace
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/60">
                Write a Move policy, deploy, and list it for every Pinace user.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={site.docsUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
                >
                  <span>Read the docs</span>
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={site.githubUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
