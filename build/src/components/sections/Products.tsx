import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { products } from "@/lib/site";

const cardStyles = [
  {
    background:
      "radial-gradient(50% 50% at 50% 50%, #591907 40.75%, #B45439 100%)",
  },
  {
    background:
      "radial-gradient(50% 50% at 50% 50%, #000000 40.75%, #7CA198 100%)",
  },
  {
    background:
      "radial-gradient(50% 50% at 50% 50%, #591B3E 0%, #902458 25%, #BB3F7D 50.48%, #D288BA 100%)",
  },
] as const;

export default function Products() {
  return (
    <section id="products" className="relative scroll-mt-24">
      {/* Full-width white block */}
      <div className="w-full bg-white px-6 py-20 sm:px-12 sm:py-28 lg:px-20 lg:py-36">
        {/* Centered heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-black">
            <span className="block">Built for agents.</span>
            <span className="block text-[#2b8bff]">Controlled by humans.</span>
          </h2>
        </div>

        {/* 3 cards grid — square, bold title, pill button */}
        <Reveal
          className="mx-auto mt-16 grid gap-6 md:grid-cols-3"
          stagger={0.1}
          y={26}
        >
          {products.map((p, i) => (
            <div
              key={p.name}
              className="group relative flex min-h-[420px] flex-col justify-between rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] sm:p-10 lg:min-h-[480px]"
              style={cardStyles[i]}
            >
              {/* Title — large bold italic */}
              <h3 className="font-heading text-[clamp(2rem,4vw,3.2rem)] font-bold italic leading-[0.95] tracking-tight text-white">
                {p.name}
              </h3>

              {/* Description */}
              <p className="mt-4 text-[15px] leading-relaxed text-white/60">
                {p.give}
              </p>

              {/* Bottom — pill button */}
              <a
                href="#developers"
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all hover:bg-white/20 hover:scale-105"
              >
                <span>learn more</span>
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
