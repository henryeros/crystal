"use client";

import { Fragment, type ElementType } from "react";
import { motion } from "framer-motion";
import { VIEWPORT, riseVariants, staggerParent } from "@/lib/motion";
import { motionTag } from "@/lib/motionTag";

type LineRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  emphasisClassName?: string;
  delay?: number;
  active?: boolean;
};

const parse = (text: string) =>
  text.split(/(\*[^*]+\*)/g).filter(Boolean).flatMap((chunk) => {
    const emphasis = chunk.startsWith("*") && chunk.endsWith("*");
    const clean = emphasis ? chunk.slice(1, -1) : chunk;
    return clean
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => ({ word, emphasis }));
  });

const LineReveal = ({
  text,
  as: Tag = "span",
  className = "",
  emphasisClassName = "italic",
  delay = 0,
  active,
}: LineRevealProps) => {
  const words = parse(text);
  const MotionTag = motionTag(Tag);
  const controlled = typeof active === "boolean";

  return (
    <MotionTag
      className={className}
      variants={staggerParent}
      initial="hidden"
      animate={controlled ? (active ? "visible" : "hidden") : undefined}
      whileInView={controlled ? undefined : "visible"}
      viewport={controlled ? undefined : VIEWPORT}
      transition={{ delayChildren: delay }}
    >
      {words.map(({ word, emphasis }, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
            <motion.span
              className={`inline-block will-change-transform ${emphasis ? emphasisClassName : ""}`}
              variants={riseVariants}
              custom={index}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
};

export default LineReveal;
