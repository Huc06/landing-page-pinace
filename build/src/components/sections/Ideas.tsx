import {
  TrendingUp,
  Scale,
  ShieldCheck,
  Banknote,
  Landmark,
  RefreshCcw,
  Bot,
  ShoppingCart,
} from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { Reveal } from "@/components/common/Reveal";
import { DevNote } from "@/components/common/DevNote";
import { ScrollStack, ScrollStackItem } from "@/components/common/ScrollStack";
import { ideas } from "@/lib/site";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Scale,
  ShieldCheck,
  Banknote,
  Landmark,
  RefreshCcw,
  Bot,
  ShoppingCart,
};

export default function Ideas() {
  return (
    <Section id="ideas">
      <SectionKicker tone="violet">Build on Pinace</SectionKicker>
      <SplitHeading
        text="What you could"
        accent="ship."
        className="mt-5"
      />
      <Reveal className="mt-4" y={16}>
        <p className="max-w-2xl text-lg text-white/60">
          Pinace gates any Sui Move call, so an agent can do anything you scope.
          A few of the things the protocol unlocks:
        </p>
      </Reveal>

      <div className="relative mt-10">
        <DevNote inline className="mb-3">
          React Bits ScrollStack · one idea per row
        </DevNote>
        <ScrollStack>
          {ideas.map((idea, i) => {
            const Icon = iconMap[idea.icon];
            return (
              <ScrollStackItem key={idea.title}>
                <div className="flex items-center gap-4 px-5 py-4 sm:gap-5 sm:px-7">
                  <span className="onchain w-7 flex-none text-[13px] text-white/30">
                    0{i + 1}
                  </span>
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white/[0.05]">
                    {Icon ? (
                      <Icon className="size-5 text-white/70" />
                    ) : (
                      <span className="text-xl">{idea.icon}</span>
                    )}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-3">
                    <h3 className="font-heading text-lg font-semibold tracking-tight text-white sm:text-xl">
                      {idea.title}
                    </h3>
                    <p className="text-[14px] leading-snug text-white/50">
                      {idea.body}
                    </p>
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </Section>
  );
}
