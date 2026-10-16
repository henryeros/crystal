"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import SectionLabel from "@/components/primitives/SectionLabel";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  location: string;
  highlight: string;
};

const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "Crystal transformed our vision into Nigeria's first fully solar-powered, naturally ventilated hospital when she was just 23. The convective cooling in our waiting halls is extraordinary — our generator fuel bills dropped by 95%, creating a peaceful, healing environment.",
    author: "Dr. Chukwuma O.",
    role: "Medical Director, TESH Hospital",
    location: "Nsukka, Nigeria",
    highlight: "95% Diesel Reduction",
  },
  {
    quote:
      "Living in Nature Home redefined what comfort means in the tropics. Even during Enugu's hottest dry season, our seven-bedroom residence stays cool and serene without switching on noisy air conditioning. The wind orientation and deep thermal mass are pure genius.",
    author: "Engr. Emeka & Ngozi K.",
    role: "Homeowners, Nature Home",
    location: "Enugu, Nigeria",
    highlight: "79% Lower Energy Cost",
  },
  {
    quote:
      "The Effective Architect gave me the rigorous methodology I never got in architecture school. Crystal doesn't teach abstract fluff — she gives you the honest, on-site blueprint for designing for the African climate and positioning yourself for high-value commissions.",
    author: "Amara D., MNIA",
    role: "Principal Architect & TEA Alumni",
    location: "Lagos, Nigeria",
    highlight: "10,000+ Alumni Network",
  },
  {
    quote:
      "Studio COKA understands that climate-responsive design isn't an artistic luxury; it is the single greatest driver of long-term real estate returns. Crystal's passive cooling strategies cut our projected operational HVAC expenditure by over 40%.",
    author: "Farouk M.",
    role: "Real Estate Developer & Investor",
    location: "Abuja, Nigeria",
    highlight: "40% Projected HVAC CapEx Cut",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 7500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      aria-label="Client & collaborator endorsements"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative bg-bone py-[clamp(4.5rem,11vw,9rem)]"
    >
      <div className="shell">
        <SectionLabel index="07">Client & Peer Voices</SectionLabel>

        <div className="mt-10 border-t border-ink/15 pt-12 lg:mt-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Left Control Bar */}
            <div className="flex flex-col justify-between gap-8 lg:col-span-4 lg:min-h-[22rem]">
              <div>
                <p className="eyebrow text-clay font-medium">{current.highlight}</p>
                <div className="mt-4">
                  <p className="display text-2xl font-normal text-ink">{current.author}</p>
                  <p className="mt-1 text-[0.875rem] font-medium text-ink-soft">{current.role}</p>
                  <p className="mt-0.5 text-[0.75rem] text-ink/40">{current.location}</p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous endorsement"
                  className="grid size-11 place-items-center rounded-full border border-ink/20 text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-bone active:scale-95"
                >
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden>
                    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next endorsement"
                  className="grid size-11 place-items-center rounded-full border border-ink/20 text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-bone active:scale-95"
                >
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden>
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span className="ml-2 font-mono text-[0.8125rem] tabular-nums text-ink/45">
                  0{index + 1} / 0{TESTIMONIALS.length}
                </span>
              </div>
            </div>

            {/* Right Quote Body */}
            <div className="relative min-h-[14rem] lg:col-span-8 lg:min-h-[22rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                >
                  <blockquote className="display text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.1] text-ink">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
