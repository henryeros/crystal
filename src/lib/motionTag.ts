import type { ComponentType, ElementType } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type AnyMotionComponent = ComponentType<HTMLMotionProps<"div">>;

const cache = new Map<ElementType, AnyMotionComponent>();

export const motionTag = (tag: ElementType): AnyMotionComponent => {
  const cached = cache.get(tag);
  if (cached) return cached;
  const created = motion.create(tag) as unknown as AnyMotionComponent;
  cache.set(tag, created);
  return created;
};
