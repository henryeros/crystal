"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/content";
import { WORK } from "@/lib/generated/media";
import { EASE_OUT_EXPO, VIEWPORT_EARLY } from "@/lib/motion";
import ArrowLink from "@/components/primitives/ArrowLink";
import LineReveal from "@/components/primitives/LineReveal";
import MediaFrame from "@/components/primitives/MediaFrame";
import SectionLabel from "@/components/primitives/SectionLabel";

const Stats = ({ project, tone }: { project: Project; tone: "ink" | "bone" }) => (
  <dl className="mt-6 grid grid-cols-3 gap-4 border-t pt-5" style={{ borderColor: tone === "ink" ? "rgba(26,20,17,0.12)" : "rgba(242,238,229,0.18)" }}>
    {project.stats.map((stat) => (
      <div key={stat.label}>
        <dt className="sr-only">{stat.label}</dt>
        <dd className="display text-[clamp(1.3rem,2vw,1.75rem)] leading-none">{stat.value}</dd>
        <p className={`mt-2 text-[0.75rem] leading-[1.4] ${tone === "ink" ? "text-ink/50" : "text-bone/50"}`}>
          {stat.label}
        </p>
      </div>
    ))}
  </dl>
);

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const hasImage = Boolean(project.image);
  const tone = hasImage ? "ink" : "bone";

  return (
    <article
      className={`group relative flex w-[84vw] shrink-0 snap-start flex-col overflow-hidden rounded-[2rem] transition-all duration-500 hover:shadow-[0_28px_70px_-24px_rgba(26,20,17,0.35)] sm:w-[58vw] lg:w-[35rem] ${
        hasImage ? "bg-paper ring-1 ring-ink/10" : "bg-espresso text-bone"
      }`}
    >
      {hasImage ? (
        <MediaFrame
          asset={WORK[project.image!]}
          alt={project.alt ?? project.title}
          sizes="(min-width: 1024px) 35rem, (min-width: 640px) 58vw, 84vw"
          parallax={12}
          imageClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          className="aspect-[4/3] w-full"
        />
      ) : (
        <div className="flex aspect-[4/3] w-full flex-col justify-between p-[clamp(1.5rem,2.4vw,2.25rem)]">
          <span className="eyebrow text-bone/45 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <p className="display text-[clamp(2.6rem,5vw,4rem)] leading-[0.9] text-bone">
            Nigeria&apos;s first <span className="italic text-clay-bright">off-grid</span> hospital
          </p>
        </div>
      )}

      <div className="flex flex-1 flex-col p-[clamp(1.5rem,2.4vw,2.25rem)]">
        <div className="flex items-center justify-between gap-4">
          <span className={`eyebrow font-medium ${hasImage ? "text-clay" : "text-clay-bright"}`}>{project.discipline}</span>
          <span className={`eyebrow tabular-nums ${hasImage ? "text-ink/40" : "text-bone/45"}`}>{project.year}</span>
        </div>

        <h3 className="display mt-4 text-[clamp(1.6rem,2.8vw,2.25rem)] leading-tight">{project.title}</h3>
        <p className={`mt-1.5 text-[0.9375rem] ${hasImage ? "text-ink/60" : "text-bone/70"}`}>{project.place}</p>
        <p className={`mt-4 flex-1 text-[0.9375rem] leading-[1.65] pretty ${hasImage ? "text-ink-soft" : "text-bone/80"}`}>
          {project.note}
        </p>

        <Stats project={project} tone={tone} />

        {project.href ? (
          <div className="mt-6 flex items-center justify-between">
            <ArrowLink href={project.href} label="Explore case study" tone={hasImage ? "clay" : "bone"} size="sm" />
            <a href="#contact" className="eyebrow text-[0.6875rem] text-ink/45 hover:text-clay">
              Enquire about similar work →
            </a>
          </div>
        ) : (
          <div className="mt-6">
            <a href="#contact" className="eyebrow inline-flex items-center gap-1.5 text-clay hover:text-clay-bright">
              <span>Commission project like this</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

const Work = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 420, damping: 40, mass: 0.4 });
  const smoothY = useSpring(cursorY, { stiffness: 420, damping: 40, mass: 0.4 });

  const updateProgress = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setProgress(max > 0 ? rail.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    rail.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => rail.removeEventListener("scroll", updateProgress);
  }, [updateProgress]);

  const scrollByCard = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("article");
    const amount = card ? card.clientWidth + 20 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let startX = 0;
    let startScroll = 0;
    let active = false;

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      active = true;
      startX = event.clientX;
      startScroll = rail.scrollLeft;
      setDragging(true);
    };

    const onMove = (event: PointerEvent) => {
      const rect = rail.getBoundingClientRect();
      cursorX.set(event.clientX - rect.left);
      cursorY.set(event.clientY - rect.top);
      if (!active) return;
      rail.scrollLeft = startScroll - (event.clientX - startX) * 1.15;
    };

    const onUp = () => {
      active = false;
      setDragging(false);
    };

    rail.addEventListener("pointerdown", onDown);
    rail.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      rail.removeEventListener("pointerdown", onDown);
      rail.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [cursorX, cursorY]);

  return (
    <section id="work" className="relative overflow-hidden bg-bone py-[clamp(4.5rem,11vw,9rem)]">
      <div className="shell">
        <SectionLabel index="04">Selected work</SectionLabel>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-8 lg:mt-14">
          <LineReveal
            as="h2"
            text="Buildings that *perform* before they impress."
            className="display max-w-[16ch] text-[length:var(--text-giant)]"
            emphasisClassName="italic text-clay"
          />

          <motion.div
            className="flex items-center gap-2.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT_EARLY}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous project"
              className="grid size-11 place-items-center rounded-full ring-1 ring-ink/15 transition-colors duration-400 hover:bg-ink hover:text-bone"
            >
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden>
                <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next project"
              className="grid size-11 place-items-center rounded-full ring-1 ring-ink/15 transition-colors duration-400 hover:bg-ink hover:text-bone"
            >
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden>
                <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      <div
        className="relative mt-[clamp(2.5rem,5vw,4rem)]"
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      >
        <div
          ref={railRef}
          className={`no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-[var(--spacing-gutter)] pb-2 ${
            dragging ? "cursor-grabbing select-none" : "lg:cursor-none"
          }`}
          role="region"
          aria-label="Selected projects, scroll horizontally"
          tabIndex={0}
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
          <span aria-hidden className="w-[max(1px,calc(var(--spacing-gutter)-1.25rem))] shrink-0" />
        </div>

        <AnimatePresence>
          {hovering ? (
            <motion.span
              className="pointer-events-none absolute top-0 left-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay px-4 py-3 eyebrow text-paper lg:block"
              style={{ x: smoothX, y: smoothY }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            >
              {dragging ? "Keep going" : "Drag"}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="shell mt-9 flex items-center gap-6">
        <div className="h-px flex-1 bg-ink/12">
          <motion.div className="h-px origin-left bg-clay" style={{ scaleX: progress }} />
        </div>
        <span className="eyebrow text-ink/40 tabular-nums">{PROJECTS.length} projects</span>
      </div>
    </section>
  );
};

export default Work;
