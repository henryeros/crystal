"use client";

import { motion } from "framer-motion";
import { WRITING } from "@/lib/content";
import { WORK } from "@/lib/generated/media";
import { EASE_OUT_EXPO, VIEWPORT_EARLY, fadeUpVariants } from "@/lib/motion";
import ArrowLink from "@/components/primitives/ArrowLink";
import LineReveal from "@/components/primitives/LineReveal";
import MediaFrame from "@/components/primitives/MediaFrame";
import SectionLabel from "@/components/primitives/SectionLabel";

const TOPICS = [
  "Climate-responsive design",
  "Indigenous modern architecture",
  "African cities",
  "Local materials",
  "Design entrepreneurship",
  "The built environment",
];

const Ideas = () => (
  <section id="ideas" className="relative bg-bone-deep py-[clamp(4.5rem,11vw,9rem)]">
    <div className="shell">
      <SectionLabel index="07">Ideas in public</SectionLabel>

      <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
        <LineReveal
          as="h2"
          text="Everything learned on site, *published*."
          className="display max-w-[14ch] text-[length:var(--text-giant)]"
          emphasisClassName="italic text-clay"
        />
        <motion.p
          className="max-w-[42ch] text-[1.0625rem] leading-[1.6] text-ink-soft pretty"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_EARLY}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.2 }}
        >
          Weekly writing and long-running series on what intentional design actually returns — in value, health,
          comfort and quality of life. Free, specific, and built from real projects.
        </motion.p>
      </div>

      <div className="mt-[clamp(3rem,7vw,5rem)] grid gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <MediaFrame
            asset={WORK["crystal-poised"]}
            alt="Crystal Kizor at her desk reviewing drawings and stone samples"
            sizes="(min-width: 1024px) 32vw, 100vw"
            parallax={5}
            className="aspect-[5/4] w-full rounded-[1.5rem] lg:aspect-[4/5]"
          />
          <p className="eyebrow mt-4 text-ink/35">Enugu, Nigeria · Studio</p>
        </div>

        <motion.ul
          className="border-t border-ink/12"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EARLY}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {WRITING.map((item, index) => (
            <motion.li key={item.title} variants={fadeUpVariants} custom={index} className="border-b border-ink/12">
              <a href={item.href} className="group block py-7">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="eyebrow text-clay">{item.kind}</span>
                  <span className="eyebrow text-ink/35">{item.meta}</span>
                </div>
                <h3 className="display mt-3 text-[clamp(1.5rem,2.8vw,2.3rem)] leading-tight transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                  {item.title}
                </h3>
                <p className="mt-2.5 max-w-[46ch] text-[0.9375rem] leading-[1.6] text-ink-soft pretty">{item.body}</p>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="mt-[clamp(3.5rem,8vw,6rem)] grid items-stretch gap-[clamp(1.5rem,3vw,2.5rem)] overflow-hidden rounded-[1.75rem] bg-espresso text-bone lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)]">
        <div className="flex flex-col justify-between gap-10 p-[clamp(1.75rem,4vw,3.5rem)]">
          <div>
            <span className="eyebrow text-bone/45">Speaking · TEDx</span>
            <h3 className="display mt-5 max-w-[16ch] text-[clamp(2rem,4vw,3.2rem)] leading-[0.95]">
              Make the case for building <span className="italic text-clay-bright">differently.</span>
            </h3>
            <p className="mt-5 max-w-[46ch] text-[1rem] leading-[1.6] text-bone/65 pretty">
              Keynotes, panels and long-form conversation on climate-responsive design, indigenous modern architecture
              and the economics of building well in African cities.
            </p>
          </div>

          <div>
            <ul className="flex flex-wrap gap-x-3 gap-y-2">
              {TOPICS.map((topic) => (
                <li key={topic} className="eyebrow rounded-full bg-bone/10 px-3 py-1.5 text-bone/60">
                  {topic}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ArrowLink href="#enquire" label="Invite Crystal to speak" tone="bone" />
            </div>
          </div>
        </div>

        <MediaFrame
          asset={WORK["crystal-arms-folded"]}
          alt="Crystal Kizor standing before a wall of drawings and material samples"
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="min-h-[18rem] w-full lg:min-h-full"
        />
      </div>
    </div>
  </section>
);

export default Ideas;
