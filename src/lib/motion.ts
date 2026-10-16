import type { Transition, Variants } from "framer-motion";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_QUINT = [0.83, 0, 0.17, 1] as const;

export const SOFT: Transition = { duration: 0.9, ease: EASE_OUT_EXPO };
export const SNAP: Transition = { duration: 0.5, ease: EASE_OUT_EXPO };

export const VIEWPORT = { once: true, amount: 0.25 } as const;
export const VIEWPORT_EARLY = { once: true, amount: 0.1 } as const;

export const riseVariants: Variants = {
  hidden: { y: "110%" },
  visible: (index: number = 0) => ({
    y: "0%",
    transition: { ...SOFT, delay: index * 0.07 },
  }),
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO, delay: index * 0.08 },
  }),
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: EASE_OUT_EXPO } },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
