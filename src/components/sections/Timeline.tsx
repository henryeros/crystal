"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { TIMELINE } from "@/lib/content";
import LineReveal from "@/components/primitives/LineReveal";
import SectionLabel from "@/components/primitives/SectionLabel";

const Timeline = () => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        const track = scope.current?.querySelector<HTMLElement>("[data-track]");
        const pin = scope.current?.querySelector<HTMLElement>("[data-pin]");
        if (!track || !pin) return;

        const distance = () => track.scrollWidth - pin.clientWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.to("[data-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.kill();
      });

      return () => media.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className="relative bg-bone">
      <div data-pin className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-[clamp(4rem,9vw,7rem)]">
        <div className="shell">
          <SectionLabel index="08">The record</SectionLabel>
          <LineReveal
            as="h2"
            text="Eight years, one *argument*."
            className="display mt-8 text-[length:var(--text-giant)]"
            emphasisClassName="italic text-clay"
          />
        </div>

        <ol
          data-track
          className="no-scrollbar mt-[clamp(2.5rem,5vw,4rem)] flex gap-5 overflow-x-auto px-[var(--spacing-gutter)] lg:overflow-visible lg:px-[var(--spacing-gutter)]"
        >
          {TIMELINE.map((entry, index) => (
            <li
              key={entry.year}
              className="flex w-[78vw] shrink-0 flex-col justify-between rounded-[1.5rem] bg-paper p-[clamp(1.5rem,2.6vw,2.4rem)] ring-1 ring-ink/8 sm:w-[24rem] lg:w-[26rem]"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="display text-[clamp(2.6rem,4vw,3.6rem)] leading-none text-clay">{entry.year}</span>
                <span className="eyebrow text-ink/35">{entry.age}</span>
              </div>

              <div className="mt-10">
                <h3 className="display text-[clamp(1.5rem,2.4vw,2rem)] leading-tight">{entry.title}</h3>
                <p className="mt-3.5 text-[0.9375rem] leading-[1.6] text-ink-soft pretty">{entry.body}</p>
              </div>

              <span className="eyebrow mt-10 text-ink/25 tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(TIMELINE.length).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ol>

        <div className="shell mt-9 hidden lg:block">
          <div className="h-px w-full bg-ink/12">
            <span data-progress className="block h-px origin-left scale-x-0 bg-clay" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
