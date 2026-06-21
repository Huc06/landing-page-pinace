"use client";

import { useState } from "react";
import { Section } from "@/components/common/Section";
import { SplitHeading } from "@/components/common/SplitHeading";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { AddToChromeButton } from "@/components/common/AddToChromeButton";

export default function FinalCta() {
  const [sent, setSent] = useState(false);

  return (
    <Section id="waitlist">
      <div className="relative overflow-hidden border border-white/10 bg-[radial-gradient(120%_120%_at_50%_0%,color-mix(in_srgb,var(--pinace-blue)_22%,transparent),transparent_60%)] px-7 py-16 text-center sm:px-12 sm:py-20">
        <SplitHeading
          as="h2"
          text="Let an agent work for you —"
          accent="you keep control."
          className="mx-auto max-w-3xl text-[clamp(2rem,5.5vw,4rem)]"
        />
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
          Install the extension and delegate your first bounded agent. Or join the
          waitlist for the mobile app.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <AddToChromeButton
            className={cn(
              buttonVariants(),
              "h-12 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-[0_8px_40px_-8px] shadow-primary/60 hover:bg-primary/90",
            )}
          >
            Add to Chrome
          </AddToChromeButton>
          <a
            href={site.githubUrl}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-12 rounded-full border-white/15 bg-white/[0.02] px-8 text-base font-medium text-white hover:bg-white/[0.06]",
            )}
          >
            View on GitHub
          </a>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="you@wallet.xyz"
            aria-label="Email for the mobile waitlist"
            className="h-12 flex-1 rounded-full border border-white/12 bg-white/[0.03] px-5 text-[15px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-primary"
          />
          <button
            type="submit"
            className="h-12 flex-none rounded-full bg-white px-6 text-[15px] font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            {sent ? "You're on the list ✓" : "Notify me"}
          </button>
        </form>
        <p className="mt-3 text-[13px] text-white/35">
          Mobile app — coming soon. No spam, just the launch.
        </p>
      </div>
    </Section>
  );
}
