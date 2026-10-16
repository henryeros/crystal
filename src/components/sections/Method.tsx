"use client";

import { motion } from "framer-motion";
import { PRINCIPLES } from "@/lib/content";
import { WORK } from "@/lib/generated/media";
import { EASE_OUT_EXPO, VIEWPORT_EARLY, fadeUpVariants } from "@/lib/motion";
import LineReveal from "@/components/primitives/LineReveal";
import MediaFrame from "@/components/primitives/MediaFrame";
import SectionLabel from "@/components/primitives/SectionLabel";

const Method = () => (
  <section id="method" className="relative bg-espresso text-bone">
    <MediaFrame
      asset={WORK["nature-home-cantilever"]}
      alt="Deep cantilevered shading over tall windows at Nature Home"
      sizes="100vw"
      parallax={9}
      className="h-[42svh] min-h-[16rem] w-full lg:h-[62svh]"
      imageClassName="opacity-85"
    />

    <div className="shell py-[clamp(4rem,10vw,8rem)]">
      <SectionLabel index="05" className="text-bone/70">
        The method
      </SectionLabel>

      <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
        <LineReveal
          as="h2"
          text="Passive cooling is never one *dramatic* feature."
          className="display max-w-[15ch] text-[length:var(--text-giant)]"
          emphasisClassName="italic text-clay-bright"
        />
        <motion.p
          className="max-w-[42ch] text-[1.0625rem] leading-[1.6] text-bone/65 pretty"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_EARLY}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.2 }}
        >
          It is many small decisions working together — and every one of them is a decision a client can understand,
          price and feel. This is the framework behind the work, and the framework taught inside The Effective Architect.
        </motion.p>
      </div>

      <motion.ol
        className="mt-[clamp(3rem,7vw,5rem)] grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_EARLY}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
      >
        {PRINCIPLES.map((principle, index) => (
          <motion.li key={principle.index} variants={fadeUpVariants} custom={index} className="border-t border-bone/18 pt-6">
            <span className="eyebrow text-bone/40 tabular-nums">{principle.index}</span>
            <h3 className="display mt-4 text-[clamp(1.6rem,2.4vw,2.1rem)] leading-none">{principle.title}</h3>
            <p className="mt-3 max-w-[32ch] text-[0.9375rem] leading-[1.6] text-bone/60 pretty">{principle.body}</p>
          </motion.li>
        ))}
      </motion.ol>

      <motion.blockquote
        className="mt-[clamp(4rem,9vw,7rem)] border-t border-bone/18 pt-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_EARLY}
        transition={{ duration: 1, ease: EASE_OUT_EXPO }}
      >
        <p className="display max-w-[22ch] text-[length:var(--text-statement)] balance">
          Architecture changes lives, improves living standards, and can be the difference between{" "}
          <span className="italic text-clay-bright">survival and thriving.</span>
        </p>
        <footer className="eyebrow mt-7 text-bone/45">Crystal Kizor</footer>
      </motion.blockquote>
    </div>
  </section>
);

export default Method;
