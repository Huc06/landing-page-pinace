import { Section } from "@/components/common/Section";
import { SectionKicker } from "@/components/common/SectionKicker";
import { SplitHeading } from "@/components/common/SplitHeading";
import { Reveal } from "@/components/common/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/site";

export default function Faq() {
  return (
    <Section id="faq">
      <SectionKicker tone="amber">Questions</SectionKicker>
      <SplitHeading text="You might be" accent="wondering." className="mt-5" />

      <Reveal className="mt-12" y={20}>
        <Accordion multiple={false} className="grid gap-3 md:grid-cols-2">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`faq-${i}`}
              className="border border-white/10 bg-[rgba(24,24,27,0.45)] px-5 transition-colors hover:border-white/20"
            >
              <AccordionTrigger className="font-heading py-5 text-left text-[19px] font-semibold tracking-tight text-white hover:no-underline sm:text-[20px]">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[16px] leading-relaxed text-white/60 sm:text-[17px]">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
