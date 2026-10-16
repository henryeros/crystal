"use client";

import type { ElementType, ReactNode } from "react";
import { VIEWPORT_EARLY, fadeUpVariants } from "@/lib/motion";
import { motionTag } from "@/lib/motionTag";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  index?: number;
  id?: string;
};

const Reveal = ({ children, as: Tag = "div", className = "", index = 0, id }: RevealProps) => {
  const MotionTag = motionTag(Tag);

  return (
    <MotionTag
      id={id}
      className={className}
      variants={fadeUpVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_EARLY}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
