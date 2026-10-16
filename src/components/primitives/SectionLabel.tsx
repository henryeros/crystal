"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO, VIEWPORT_EARLY } from "@/lib/motion";

type SectionLabelProps = {
  index?: string;
  children: string;
  className?: string;
};

const SectionLabel = ({ index, children, className = "" }: SectionLabelProps) => (
  <motion.div
    className={`flex items-center gap-4 ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={VIEWPORT_EARLY}
    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
  >
    {index ? (
      <motion.span
        className="eyebrow opacity-45 tabular-nums"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.45, transition: { duration: 0.6 } } }}
      >
        {index}
      </motion.span>
    ) : null}
    <motion.span
      className="h-px flex-none bg-current opacity-25"
      variants={{
        hidden: { width: 0 },
        visible: { width: 44, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
      }}
    />
    <motion.span
      className="eyebrow"
      variants={{
        hidden: { opacity: 0, x: -8 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
      }}
    >
      {children}
    </motion.span>
  </motion.div>
);

export default SectionLabel;
