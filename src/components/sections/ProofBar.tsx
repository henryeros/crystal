"use client";

import { motion } from "framer-motion";
import { METRICS } from "@/lib/content";
import { VIEWPORT_EARLY, fadeUpVariants } from "@/lib/motion";
import Counter from "@/components/primitives/Counter";

const ProofBar = () => (
  <section aria-label="Measured outcomes" className="relative bg-espresso text-bone">
    <div className="shell py-[clamp(3rem,6vw,5rem)]">
      <motion.ul
        className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_EARLY}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {METRICS.map((metric, index) => (
          <motion.li key={metric.label} variants={fadeUpVariants} custom={index} className="border-t border-bone/18 pt-5">
            <p className="display text-[clamp(2.4rem,4.4vw,3.6rem)] leading-none">
              <Counter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
            </p>
            <p className="mt-3 text-[0.9375rem] font-medium">{metric.label}</p>
            <p className="mt-1 max-w-[22ch] text-[0.8125rem] leading-[1.5] text-bone/50">{metric.note}</p>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  </section>
);

export default ProofBar;
