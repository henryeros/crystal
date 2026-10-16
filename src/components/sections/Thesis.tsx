"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ORBITS, VENTURES, type Orbit } from "@/lib/content";
import { EASE_OUT_EXPO, VIEWPORT_EARLY } from "@/lib/motion";
import LineReveal from "@/components/primitives/LineReveal";
import SectionLabel from "@/components/primitives/SectionLabel";

const OrbitRow = ({ orbit }: { orbit: Orbit }) => {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { amount: 0.55, margin: "-20% 0px -20% 0px" });
  const members = VENTURES.filter((venture) => venture.orbit === orbit.id);

  return (
    <motion.li
      ref={ref}
      className="relative border-t border-ink/12 py-[clamp(2rem,4.5vw,3.5rem)]"
      animate={{ opacity: inView ? 1 : 0.34 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
    >
      <motion.span
        className="absolute inset-x-0 top-0 h-px origin-left bg-clay"
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
      />

      <div className="grid gap-5 md:grid-cols-[4.5rem_minmax(0,1fr)] lg:grid-cols-[4.5rem_minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10">
        <span className="eyebrow pt-2 text-ink/40 tabular-nums">{orbit.index}</span>

        <div>
          <h3 className="display text-[clamp(3rem,8.5vw,6.5rem)] leading-[0.86]">{orbit.verb}</h3>
          <p className="mt-3 text-[0.9375rem] font-medium text-clay">{orbit.title}</p>
        </div>

        <div className="flex flex-col justify-between gap-6 pt-1">
          <p className="max-w-[44ch] text-[1.0625rem] leading-[1.6] text-ink-soft pretty">{orbit.premise}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
            {members.map((venture) => (
              <li key={venture.id}>
                <a href="#ecosystem" className="eyebrow text-ink/45 transition-colors duration-400 hover:text-clay">
                  {venture.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.li>
  );
};

const Thesis = () => {
  return (
    <section className="relative bg-bone py-[clamp(4.5rem,11vw,9rem)]">
      <div className="shell">
        <SectionLabel index="02">The thread</SectionLabel>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <LineReveal
            as="h2"
            text="Seven ventures. *One* question."
            className="display text-[length:var(--text-giant)]"
            emphasisClassName="italic text-clay"
          />
          <motion.p
            className="max-w-[44ch] text-[1.0625rem] leading-[1.6] text-ink-soft pretty sm:text-[1.125rem]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_EARLY}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.2 }}
          >
            How do we build better in hot climates — and who gets to benefit from it? Everything Crystal runs is an
            answer to one half of that sentence. The work gets built, the method gets taught, and the opportunity gets
            given back.
          </motion.p>
        </div>

        <ul className="mt-[clamp(3rem,7vw,5.5rem)] border-b border-ink/12">
          {ORBITS.map((orbit) => (
            <OrbitRow key={orbit.id} orbit={orbit} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Thesis;
