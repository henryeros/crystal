"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SOCIALS } from "@/lib/content";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { useIntro } from "@/components/providers/IntroProvider";
import Wordmark from "@/components/primitives/Wordmark";

const DockNav = () => {
  const { ready } = useIntro();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 sm:pb-6"
      initial={{ y: 120, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: ready ? 0.35 : 0 }}
    >
      <div className="relative flex w-full max-w-[32rem] items-center gap-2">
        <a
          href="#top"
          aria-label="Back to top"
          className="grid size-12 flex-none place-items-center rounded-full bg-ink text-bone transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.06] sm:size-14"
        >
          <Wordmark variant="monogram-bone" height={18} alt="" className="translate-y-px" />
        </a>

        <div className="relative flex min-w-0 flex-1 items-center rounded-full bg-paper/88 p-1.5 shadow-[0_18px_50px_-22px_rgba(26,20,17,0.6)] ring-1 ring-ink/10 backdrop-blur-xl">
          <AnimatePresence>
            {open ? (
              <motion.nav
                className="absolute bottom-[calc(100%+0.65rem)] left-0 w-full origin-bottom overflow-hidden rounded-3xl bg-paper/95 p-2 shadow-[0_24px_70px_-26px_rgba(26,20,17,0.65)] ring-1 ring-ink/10 backdrop-blur-xl"
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              >
                <ul>
                  {NAV.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.05 + index * 0.045 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline justify-between border-b border-ink/8 px-4 py-2.5 last:border-0"
                      >
                        <span className="font-display text-[1.6rem] leading-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                          {item.label}
                        </span>
                        <span className="eyebrow opacity-35 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-x-4 gap-y-1 px-4 pt-3 pb-2">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="eyebrow text-[0.625rem] opacity-50 transition-opacity hover:opacity-100"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </motion.nav>
            ) : null}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-full px-4 py-2.5 text-left"
          >
            <span className="relative flex h-3 w-5 flex-none flex-col justify-center">
              <motion.span
                className="absolute left-0 h-px w-5 bg-ink"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              />
              <motion.span
                className="absolute left-0 h-px w-5 bg-ink"
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              />
            </span>
            <span className="truncate text-[0.875rem] font-medium">{open ? "Close" : "Menu"}</span>
          </button>

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="flex-none items-center gap-1.5 rounded-full bg-clay px-4 py-2.5 text-[0.8125rem] font-medium whitespace-nowrap text-paper shadow-sm transition-all duration-300 hover:bg-clay-bright hover:shadow-md active:scale-95 sm:px-5"
          >
            <span>Contact Me</span>
            <span aria-hidden className="inline-block translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default DockNav;
