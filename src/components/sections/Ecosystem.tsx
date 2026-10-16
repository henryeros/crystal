"use client";

import { motion } from "framer-motion";
import { ORBITS, VENTURES, type Venture } from "@/lib/content";
import { WORK } from "@/lib/generated/media";
import { EASE_OUT_EXPO, VIEWPORT_EARLY, fadeUpVariants } from "@/lib/motion";
import ArrowLink from "@/components/primitives/ArrowLink";
import LineReveal from "@/components/primitives/LineReveal";
import MediaFrame from "@/components/primitives/MediaFrame";
import Reveal from "@/components/primitives/Reveal";
import SectionLabel from "@/components/primitives/SectionLabel";

const orbitVerb = (id: Venture["orbit"]) => ORBITS.find((orbit) => orbit.id === id)?.verb ?? "";

const Lockup = ({ venture, className = "" }: { venture: Venture; className?: string }) => (
  <span className={`display block leading-[0.95] ${className}`}>
    {venture.lockup}
    {venture.suffix ? <span className="italic text-clay"> {venture.suffix}</span> : null}
  </span>
);

const Signals = ({ items, tone = "ink" }: { items: readonly string[]; tone?: "ink" | "bone" }) => (
  <ul className="mt-6 space-y-2">
    {items.map((item) => (
      <li
        key={item}
        className={`flex items-baseline gap-3 text-[0.875rem] ${tone === "ink" ? "text-ink-soft" : "text-bone/70"}`}
      >
        <span className="mt-[0.45em] size-1 flex-none rounded-full bg-clay" />
        {item}
      </li>
    ))}
  </ul>
);

const FeatureRow = ({ venture, flip }: { venture: Venture; flip: boolean }) => (
  <article className="grid items-center gap-[clamp(1.75rem,4vw,3.5rem)] lg:grid-cols-2">
    <Reveal className={flip ? "lg:order-2" : ""}>
      <MediaFrame
        asset={WORK[venture.image]}
        alt={venture.imageAlt}
        sizes="(min-width: 1024px) 48vw, 100vw"
        parallax={12}
        className="aspect-[5/4] w-full rounded-3xl"
      />
    </Reveal>

    <div className={flip ? "lg:order-1" : ""}>
      <div className="flex items-center gap-4">
        <span className="eyebrow rounded-full bg-ink/8 px-3 py-1.5 text-ink/55">{orbitVerb(venture.orbit)}</span>
        <span className="eyebrow text-ink/40">{venture.kind}</span>
      </div>

      <Reveal as="h3" className="mt-6 text-[clamp(2.1rem,4.6vw,3.4rem)]">
        <Lockup venture={venture} />
      </Reveal>

      <Reveal as="p" index={1} className="mt-4 font-display text-[clamp(1.25rem,2.1vw,1.75rem)] leading-tight italic text-ink-soft">
        {venture.promise}
      </Reveal>

      <Reveal as="p" index={2} className="mt-5 max-w-[46ch] text-[1.0625rem] leading-[1.6] text-ink-soft pretty">
        {venture.body}
      </Reveal>

      <Signals items={venture.signals} />

      <Reveal index={3} className="mt-8">
        <ArrowLink
          href={venture.action.href}
          label={venture.action.label}
          tone="clay"
          className="text-[1rem]"
          aria-label={`${venture.action.label} — ${venture.name}`}
        />
        {venture.action.provisional ? (
          <span className="eyebrow ml-4 text-ink/30">Link pending</span>
        ) : null}
      </Reveal>
    </div>
  </article>
);

const VentureCard = ({ venture, index, wide }: { venture: Venture; index: number; wide: boolean }) => (
  <motion.article
    variants={fadeUpVariants}
    custom={index}
    className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-ink/8 transition-shadow duration-700 hover:shadow-[0_32px_80px_-48px_rgba(26,20,17,0.6)] ${
      wide ? "lg:col-span-2" : ""
    }`}
  >
    <div className={`relative w-full overflow-hidden ${wide ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
      <MediaFrame
        asset={WORK[venture.image]}
        alt={venture.imageAlt}
        sizes={wide ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"}
        parallax={10}
        className="absolute inset-0"
        imageClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />
      <span className="absolute left-5 top-5 rounded-full bg-paper/85 px-3 py-1.5 eyebrow text-ink/65 backdrop-blur-sm">
        {orbitVerb(venture.orbit)}
      </span>
    </div>

    <div className="flex flex-1 flex-col p-[clamp(1.4rem,2.4vw,2.1rem)]">
      <span className="eyebrow text-ink/40">{venture.kind}</span>
      <h3 className="mt-4 text-[clamp(1.6rem,2.6vw,2.2rem)]">
        <Lockup venture={venture} />
      </h3>
      <p className="mt-3 font-display text-[1.125rem] italic leading-tight text-clay">{venture.promise}</p>
      <p className="mt-4 max-w-[44ch] flex-1 text-[0.9375rem] leading-[1.6] text-ink-soft pretty">{venture.body}</p>

      <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
        {venture.signals.map((signal) => (
          <li key={signal} className="eyebrow text-[0.625rem] text-ink/40">
            {signal}
          </li>
        ))}
      </ul>

      <div className="mt-7 flex items-center gap-4 border-t border-ink/10 pt-5">
        <ArrowLink href={venture.action.href} label={venture.action.label} tone="clay" size="sm" />
        {venture.action.provisional ? <span className="eyebrow text-[0.625rem] text-ink/25">Link pending</span> : null}
      </div>
    </div>
  </motion.article>
);

const Ecosystem = () => {
  const flagships = VENTURES.filter((venture) => venture.weight === "flagship");
  const rest = VENTURES.filter((venture) => venture.weight !== "flagship");

  return (
    <section id="ecosystem" className="relative bg-bone-deep py-[clamp(4.5rem,11vw,9rem)]">
      <div className="shell">
        <SectionLabel index="03">The ecosystem</SectionLabel>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
          <LineReveal
            as="h2"
            text="Where most people *start*."
            className="display text-[length:var(--text-giant)]"
            emphasisClassName="italic text-clay"
          />
          <motion.p
            className="max-w-[44ch] text-[1.0625rem] leading-[1.6] text-ink-soft pretty"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_EARLY}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.2 }}
          >
            Two ventures carry most of the weight — one builds, one teaches. The rest extend the same thinking into
            objects, stages, writing and the people who need it most.
          </motion.p>
        </div>

        <div className="mt-[clamp(3rem,7vw,5.5rem)] space-y-[clamp(3.5rem,8vw,7rem)]">
          {flagships.map((venture, index) => (
            <FeatureRow key={venture.id} venture={venture} flip={index % 2 === 1} />
          ))}
        </div>

        <div className="mt-[clamp(4rem,9vw,7.5rem)] edge-line pt-10">
          <h3 className="eyebrow text-ink/45">And everything it makes possible</h3>

          <motion.div
            className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_EARLY}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {rest.map((venture, index) => (
              <VentureCard key={venture.id} venture={venture} index={index} wide={venture.id === "ako"} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
