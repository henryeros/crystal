"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { HERO_SLIDES, SITE } from "@/lib/content";
import { WORK } from "@/lib/generated/media";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { useIntro } from "@/components/providers/IntroProvider";
import Wordmark from "@/components/primitives/Wordmark";

const SLIDE_DURATION = 7000;

const Hero = () => {
  const { ready } = useIntro();
  const scope = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const total = HERO_SLIDES.length;
  const slide = HERO_SLIDES[current];
  const activeAsset = WORK[slide.imageKey];

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
    setProgressKey((k) => k + 1);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
    setProgressKey((k) => k + 1);
  }, [total]);

  const goToSlide = (index: number) => {
    if (index === current) return;
    setCurrent(index);
    setProgressKey((k) => k + 1);
  };

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, progressKey]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.to("[data-hero-bg]", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("[data-hero-content]", {
        yPercent: -14,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "70% top",
          scrub: true,
        },
      });
    },
    { scope, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <section
      ref={scope}
      id="top"
      aria-label="Crystal Kizor Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-espresso text-bone"
    >
      {/* Background Slides with container parallax */}
      <div data-hero-bg className="absolute -inset-x-0 -top-[10%] h-[120%] w-full will-change-transform">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
            className="absolute inset-0"
          >
            <Image
              src={activeAsset.src}
              alt={slide.imageAlt}
              fill
              priority
              fetchPriority="high"
              quality={88}
              sizes="100vw"
              placeholder={activeAsset.blurDataURL ? "blur" : "empty"}
              blurDataURL={activeAsset.blurDataURL}
              className="object-cover object-top md:object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient tonal gradients for high legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/55 to-espresso/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/85 via-espresso/50 to-transparent lg:w-3/4" />
        <div className="absolute inset-0 grain" />
      </div>

      {/* Main Foreground Container */}
      <div className="relative flex min-h-[100svh] flex-col justify-between py-6 sm:py-8">
        {/* Top Bar Header */}
        <header className="shell flex items-center justify-between gap-6 pt-2">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.15 }}
            className="flex items-center gap-4"
          >
            <a href="#top" aria-label="Crystal Kizor home" className="group block">
              <Wordmark
                variant="wordmark-inline-bone"
                height={16}
                alt={SITE.name}
                priority
                className="opacity-95 transition-opacity duration-300 group-hover:opacity-100"
              />
            </a>
            <span className="hidden h-4 w-px bg-bone/20 sm:block" />
            <span className="eyebrow hidden text-bone/60 sm:inline">Architect & Founder</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.25 }}
            className="flex items-center gap-4"
          >
            <div className="hidden items-center gap-2 rounded-full border border-bone/15 bg-espresso/60 px-3.5 py-1.5 backdrop-blur-md md:flex">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-clay-bright opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-clay-bright" />
              </span>
              <span className="text-[0.6875rem] font-medium tracking-wide text-bone/80">
                Available for Q3/Q4 Commissions
              </span>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-clay px-4 py-2 text-[0.8125rem] font-medium text-bone transition-all duration-300 hover:bg-clay-bright hover:shadow-[0_8px_25px_-8px_rgba(196,101,58,0.7)] sm:px-5 sm:py-2.5"
            >
              <span>Contact Crystal</span>
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden className="translate-y-px">
                <path d="M3 13L13 3M13 3H5.5M13 3v7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </a>
          </motion.div>
        </header>

        {/* Central Narrative & Dynamic Slide Showcase */}
        <div data-hero-content className="shell my-auto py-8 sm:py-12">
          <div className="max-w-[54rem]">
            {/* Active Role Eyebrow with Slide Counter */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${slide.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
                className="flex flex-wrap items-center gap-3 text-bone/70"
              >
                <span className="eyebrow rounded-full border border-clay-bright/40 bg-clay-bright/15 px-3 py-1 font-semibold text-clay-bright">
                  {slide.badge}
                </span>
                <span className="eyebrow text-bone/60">{slide.role}</span>
              </motion.div>
            </AnimatePresence>

            {/* Dynamic Headline */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${slide.id}`}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
                className="mt-5"
              >
                <h1 className="display text-[clamp(2.5rem,6.8vw,6.4rem)] leading-[0.94] tracking-[-0.025em] text-bone">
                  {slide.headline}{" "}
                  <span className="italic text-clay-bright underline decoration-clay-bright/35 decoration-wavy underline-offset-8">
                    {slide.emphasis}
                  </span>{" "}
                  {slide.headlineEnd}
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Slide Narrative Story */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`story-${slide.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT_EXPO }}
                className="mt-6 max-w-[44ch] text-[1.125rem] leading-[1.65] text-bone/85 sm:text-[1.25rem]"
              >
                {slide.story}
              </motion.p>
            </AnimatePresence>

            {/* Key Accomplishment & Metric Highlight */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`metric-${slide.id}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: 0.12 }}
                className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-bone/15 bg-espresso/70 px-5 py-3.5 backdrop-blur-md"
              >
                <div className="display text-[clamp(1.75rem,3.2vw,2.5rem)] font-normal text-clay-bright">
                  {slide.metricValue}
                </div>
                <div className="h-7 w-px bg-bone/20" />
                <div className="text-[0.8125rem] font-medium leading-[1.35] text-bone/80">
                  {slide.metricLabel}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={slide.primaryCta.href}
                className="group inline-flex items-center gap-3 rounded-full bg-bone px-6 py-4 text-[0.9375rem] font-semibold text-ink transition-all duration-300 hover:bg-clay-bright hover:text-bone hover:shadow-[0_12px_32px_-10px_rgba(196,101,58,0.7)]"
              >
                <span>{slide.primaryCta.label}</span>
                <svg
                  viewBox="0 0 16 16"
                  width="13"
                  height="13"
                  fill="none"
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href={slide.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-bone/35 bg-espresso/40 px-6 py-4 text-[0.9375rem] font-medium text-bone backdrop-blur-sm transition-all duration-300 hover:border-bone hover:bg-bone/15"
              >
                <span>{slide.secondaryCta.label}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Slide Controls & Category Switcher */}
        <footer className="shell flex flex-col gap-5 border-t border-bone/15 pt-5 pb-2 sm:flex-row sm:items-end sm:justify-between">
          {/* Role / Venture Slider Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {HERO_SLIDES.map((s, idx) => {
              const active = idx === current;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`group relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.75rem] font-medium transition-all duration-300 ${
                    active
                      ? "bg-bone text-ink shadow-sm"
                      : "border border-bone/15 bg-espresso/50 text-bone/60 hover:border-bone/40 hover:text-bone"
                  }`}
                >
                  <span className="tabular-nums font-mono text-[0.6875rem] opacity-60">0{idx + 1}</span>
                  <span>{s.id.charAt(0).toUpperCase() + s.id.slice(1)}</span>
                  {active && (
                    <motion.span
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 -z-10 rounded-full bg-bone"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Slider Progress & Navigation Controls */}
          <div className="flex items-center justify-between gap-4 sm:justify-end">
            {/* Auto-cycle Progress Line */}
            <div className="hidden h-1 w-24 overflow-hidden rounded-full bg-bone/20 sm:block">
              <motion.div
                key={progressKey}
                initial={{ width: "0%" }}
                animate={{ width: isPaused ? "100%" : "100%" }}
                transition={{
                  duration: isPaused ? 0 : SLIDE_DURATION / 1000,
                  ease: "linear",
                }}
                className="h-full bg-clay-bright"
              />
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="flex size-10 items-center justify-center rounded-full border border-bone/25 bg-espresso/50 text-bone transition-all duration-300 hover:border-bone hover:bg-bone hover:text-ink active:scale-95"
              >
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden>
                  <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="flex size-10 items-center justify-center rounded-full border border-bone/25 bg-espresso/50 text-bone transition-all duration-300 hover:border-bone hover:bg-bone hover:text-ink active:scale-95"
              >
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden>
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <span className="ml-2 font-mono text-[0.75rem] tabular-nums text-bone/60">
                0{current + 1} / 0{total}
              </span>
            </div>

            {/* Scroll Down Hint */}
            <a
              href="#positioning"
              aria-label="Scroll to about Crystal"
              className="group ml-4 hidden items-center gap-2.5 text-bone/60 transition-colors hover:text-bone lg:flex"
            >
              <span className="eyebrow text-[0.625rem]">Scroll</span>
              <span className="relative block h-8 w-px overflow-hidden bg-bone/20">
                <motion.span
                  className="absolute inset-x-0 top-0 h-3 bg-clay-bright"
                  animate={{ y: [-12, 32] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Hero;
