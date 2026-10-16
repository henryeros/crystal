"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIntro } from "@/components/providers/IntroProvider";
import Wordmark from "@/components/primitives/Wordmark";

const PANELS = 6;
const STORAGE_KEY = "ck-intro-seen";

const Preloader = () => {
  const { complete } = useIntro();
  const scope = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [dismissed, setDismissed] = useState(false);
  const [skip, setSkip] = useState<boolean | null>(null);

  useEffect(() => {
    const seen = typeof sessionStorage !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1";
    const shouldSkip = seen || prefersReducedMotion();
    setSkip(shouldSkip);
    if (shouldSkip) {
      setDismissed(true);
      complete();
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [complete]);

  useGSAP(
    () => {
      if (skip !== false) return;

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(STORAGE_KEY, "1");
          document.body.style.overflow = "";
          setDismissed(true);
          complete();
        },
      });

      const count = { value: 0 };

      tl.set("[data-intro-rule]", { scaleY: 0, transformOrigin: "top" })
        .set("[data-intro-mark]", { opacity: 0, y: 18 })
        .set("[data-intro-meta]", { opacity: 0, y: 10 })
        .to("[data-intro-rule]", { scaleY: 1, duration: 0.9, ease: "expo.inOut" })
        .to("[data-intro-mark]", { opacity: 1, y: 0, duration: 1.1 }, "-=0.45")
        .to("[data-intro-meta]", { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, "-=0.8")
        .to(
          count,
          {
            value: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(Math.round(count.value)).padStart(3, "0");
              }
            },
          },
          "-=1.1",
        )
        .to("[data-intro-fade]", { opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.1")
        .to(
          "[data-intro-panel]",
          {
            yPercent: -100,
            duration: 1.15,
            ease: "expo.inOut",
            stagger: { each: 0.055, from: "start" },
          },
          "-=0.2",
        );

      return () => tl.kill();
    },
    { scope, dependencies: [skip] },
  );

  if (dismissed) return null;

  return (
    <div ref={scope} className="pointer-events-none fixed inset-0 z-[90]" aria-hidden>
      <div className="absolute inset-0 flex">
        {Array.from({ length: PANELS }).map((_, index) => (
          <div key={index} data-intro-panel className="h-full flex-1 bg-espresso" />
        ))}
      </div>

      <div data-intro-fade className="absolute inset-0 flex flex-col items-center justify-center text-bone">
        <span data-intro-rule className="absolute top-0 left-1/2 h-24 w-px bg-bone/30" />
        <div data-intro-mark>
          <Wordmark variant="monogram-bone" height={72} alt="" priority />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-[var(--spacing-gutter)] pb-10">
          <span data-intro-meta className="eyebrow text-bone/55">
            Crystal Kizor
          </span>
          <span data-intro-meta className="eyebrow text-bone/55 hidden sm:block">
            Enugu, Nigeria
          </span>
          <span data-intro-meta className="font-display text-4xl leading-none text-bone/80 tabular-nums">
            <span ref={counterRef}>000</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
