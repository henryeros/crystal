"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type MarqueeProps = {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
};

const Marquee = ({ children, speed = 42, reverse = false, className = "", pauseOnHover = false }: MarqueeProps) => {
  const scope = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const track = scope.current?.querySelector<HTMLElement>("[data-track]");
      if (!track) return;

      tween.current = gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        {
          xPercent: reverse ? 0 : -50,
          duration: speed,
          ease: "none",
          repeat: -1,
        },
      );
    },
    { scope, dependencies: [speed, reverse] },
  );

  return (
    <div
      ref={scope}
      className={`relative w-full overflow-hidden ${className}`}
      onPointerEnter={pauseOnHover ? () => tween.current?.timeScale(0.18) : undefined}
      onPointerLeave={pauseOnHover ? () => tween.current?.timeScale(1) : undefined}
    >
      <div data-track className="flex w-max will-change-transform">
        <div className="flex shrink-0 items-center" aria-hidden={false}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
