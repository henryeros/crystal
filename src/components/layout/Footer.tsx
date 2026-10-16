"use client";

import { motion } from "framer-motion";
import { NAV, ORBITS, SITE, SOCIALS, VENTURES } from "@/lib/content";
import { EASE_OUT_EXPO, VIEWPORT_EARLY } from "@/lib/motion";
import Wordmark from "@/components/primitives/Wordmark";

const COLUMNS = ORBITS.map((orbit) => ({
  title: orbit.verb,
  items: VENTURES.filter((venture) => venture.orbit === orbit.id).map((venture) => ({
    label: venture.name,
    href: venture.action.href,
  })),
}));

const Footer = () => (
  <footer className="relative overflow-hidden bg-espresso pt-[clamp(3.5rem,8vw,6rem)] pb-[clamp(7rem,10vw,9rem)] text-bone">
    <div className="shell">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div>
          <p className="eyebrow text-bone/40">{SITE.role}</p>
          <p className="mt-5 max-w-[30ch] font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-tight italic text-bone/80">
            {SITE.tagline}
          </p>
          <div className="mt-6">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3 text-[0.875rem] font-medium text-bone transition-all duration-300 hover:bg-clay-bright"
            >
              <span>Work with Crystal</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="eyebrow text-bone/40">{column.title}</h2>
              <ul className="mt-5 space-y-2.5">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                      className="hairline text-[0.9375rem] text-bone/70 transition-colors duration-400 hover:text-bone"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[clamp(3rem,7vw,5rem)] flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-bone/15 pt-8">
        {NAV.map((item) => (
          <a key={item.href} href={item.href} className="eyebrow text-bone/45 transition-colors duration-400 hover:text-bone">
            {item.label}
          </a>
        ))}
      </div>

      <motion.div
        className="mt-[clamp(2.5rem,6vw,4rem)]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_EARLY}
        transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
      >
        <Wordmark
          variant="wordmark-stacked-bone"
          height={320}
          fluid
          alt={SITE.name}
          className="w-full max-w-[52rem] opacity-90"
        />
      </motion.div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-bone/15 pt-7">
        <p className="eyebrow text-bone/35">
          © {new Date().getFullYear()} {SITE.name} · {SITE.location}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {SOCIALS.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="eyebrow text-bone/45 transition-colors duration-400 hover:text-bone"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
