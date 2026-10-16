"use client";

import { motion } from "framer-motion";
import { WORK } from "@/lib/generated/media";
import { VIEWPORT_EARLY, fadeUpVariants } from "@/lib/motion";
import LineReveal from "@/components/primitives/LineReveal";
import MediaFrame from "@/components/primitives/MediaFrame";
import Reveal from "@/components/primitives/Reveal";
import SectionLabel from "@/components/primitives/SectionLabel";
import Wordmark from "@/components/primitives/Wordmark";

const CREDENTIALS = [
  "MA Interior Architecture & Design, Coventry",
  "Sustainable Real Estate, University of Cambridge",
  "PMP Certified",
  "Nigerian Institute of Architects",
  "Green Building Council Nigeria",
  "TEDx Speaker",
];

const Positioning = () => (
  <section id="positioning" className="relative bg-bone py-[clamp(4.5rem,11vw,9rem)]">
    <div className="shell">
      <SectionLabel index="01">About Crystal</SectionLabel>

      <div className="mt-10 grid gap-[clamp(2rem,5vw,4.5rem)] lg:mt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-center">
        <div className="relative">
          <MediaFrame
            asset={WORK["crystal-poised"]}
            alt="Crystal Kizor poised in her design studio in Enugu, surrounded by natural architectural materials"
            sizes="(min-width: 1024px) 42vw, 100vw"
            parallax={12}
            className="aspect-[4/5] w-full rounded-3xl lg:sticky lg:top-24 lg:aspect-[3/4]"
          />
          <div className="absolute bottom-6 left-6 rounded-2xl border border-bone/30 bg-paper/85 px-4 py-2.5 backdrop-blur-md">
            <p className="eyebrow text-ink/75">Crystal Kizor</p>
            <p className="text-[0.75rem] text-ink/50">Studio COKA · Enugu, Nigeria</p>
          </div>
          <motion.span
            className="absolute -bottom-6 right-6 hidden lg:block"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_EARLY}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <Wordmark variant="signature-ink" height={48} alt="Crystal Kizor signature" className="opacity-90" />
          </motion.span>
        </div>

        <div className="flex flex-col justify-center">
          <LineReveal
            as="h2"
            text="Designing buildings that breathe with the *land*, not against it."
            className="display text-[length:var(--text-statement)] balance"
            emphasisClassName="italic text-clay"
          />

          <div className="mt-8 max-w-[54ch] space-y-5 text-[1.0625rem] leading-[1.7] text-ink-soft pretty sm:text-[1.125rem]">
            <Reveal as="p" index={0}>
              I believe architecture in Africa cannot simply copy glass-and-steel formulas engineered for temperate Europe.
              In our heat and humidity, architecture must earn its keep before a single kilowatt of electricity or diesel generator
              is fired up. Orientation, thermal mass, cross-ventilation, deep eaves, and shaded microclimates come first.
              Mechanical equipment is a last resort.
            </Reveal>
            <Reveal as="p" index={1}>
              Educated at <strong>Coventry University</strong> (MA in Interior Architecture) and the <strong>University of Cambridge</strong> (Sustainable Real Estate),
              I founded <strong>Studio COKA</strong> in Enugu to prove that climate-responsive, indigenous design is not an abstract theory — it is
              commercially superior, dramatically cheaper to operate, and infinitely healthier to live in.
            </Reveal>
            <Reveal as="p" index={2}>
              At age twenty-three, I designed and delivered Nigeria&apos;s first fully off-grid solar eye hospital in Nsukka. Since then, over 100,000 sqm
              of residential, commercial, and civic spaces have followed. Everything learned on site is fed back into <strong>The Effective Architect (TEA)</strong>
              to educate the next generation of African designers, while funding <strong>AKO Alliance</strong> to return out-of-school children to the classroom.
            </Reveal>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3 text-[0.875rem] font-medium text-bone transition-all duration-300 hover:bg-clay-bright"
            >
              <span>Work with Crystal</span>
              <span aria-hidden>→</span>
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-[0.875rem] font-medium text-ink transition-all duration-300 hover:border-ink hover:bg-ink/5"
            >
              <span>View Built Work</span>
            </a>
          </div>

          <motion.ul
            className="mt-10 flex flex-wrap gap-x-5 gap-y-2.5 border-t border-ink/12 pt-7"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_EARLY}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {CREDENTIALS.map((item, index) => (
              <motion.li key={item} variants={fadeUpVariants} custom={index} className="eyebrow text-ink/50">
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </div>
  </section>
);

export default Positioning;
