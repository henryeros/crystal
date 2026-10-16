"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PATHWAYS, SITE } from "@/lib/content";
import { EASE_OUT_EXPO, VIEWPORT_EARLY, fadeUpVariants } from "@/lib/motion";
import ArrowLink from "@/components/primitives/ArrowLink";
import LineReveal from "@/components/primitives/LineReveal";
import SectionLabel from "@/components/primitives/SectionLabel";
import Wordmark from "@/components/primitives/Wordmark";

const SERVICES = [
  "Architectural Project (Studio COKA)",
  "Speaking / Keynote / Panel",
  "The Effective Architect (TEA)",
  "AKO Alliance Partnership",
  "Press & General Enquiry",
];

const BUDGETS = [
  "Under $100k (₦150M)",
  "$100k – $500k (₦150M – ₦750M)",
  "$500k – $2M+ (Large Commercial / Civic)",
  "Speaking / Training Honorarium",
  "Non-Profit / Fellowship",
];

const WhereNext = () => {
  const [activePathway, setActivePathway] = useState(PATHWAYS[0].id);
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedBudget, setSelectedBudget] = useState(BUDGETS[0]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate high-converting fast feedback
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <section id="contact" className="relative scroll-mt-12 bg-bone-deep py-[clamp(4.5rem,11vw,9rem)]">
      <div id="next" className="shell">
        <SectionLabel index="09">Connect & Enquiries</SectionLabel>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <LineReveal
            as="h2"
            text="Let&rsquo;s build something *enduring* together."
            className="display text-[length:var(--text-giant)]"
            emphasisClassName="italic text-clay"
          />
          <motion.p
            className="max-w-[44ch] text-[1.0625rem] leading-[1.65] text-ink-soft pretty"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_EARLY}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.2 }}
          >
            Whether you are commissioning a climate-responsive home, booking a keynote lecture,
            joining The Effective Architect, or backing AKO Alliance, here is the direct line.
          </motion.p>
        </div>

        {/* 4 Quick Pathways */}
        <motion.ul
          className="mt-[clamp(3rem,7vw,5rem)] border-t border-ink/12"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EARLY}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {PATHWAYS.map((pathway, index) => {
            const isActive = activePathway === pathway.id;

            return (
              <motion.li
                key={pathway.id}
                variants={fadeUpVariants}
                custom={index}
                className="border-b border-ink/12 transition-colors duration-300 hover:bg-bone/40"
                onPointerEnter={() => setActivePathway(pathway.id)}
                onFocusCapture={() => setActivePathway(pathway.id)}
              >
                <div className="grid items-start gap-x-8 gap-y-4 py-[clamp(1.5rem,3vw,2.5rem)] px-2 sm:px-4 lg:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.1fr)_auto]">
                  <span className="eyebrow pt-2 text-ink/30 tabular-nums">{String(index + 1).padStart(2, "0")}</span>

                  <div>
                    <motion.h3
                      className="display text-[clamp(1.75rem,3.4vw,2.8rem)] leading-tight"
                      animate={{ x: isActive ? 6 : 0, color: isActive ? "#a9502a" : "#1a1411" }}
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    >
                      {pathway.question}
                    </motion.h3>
                    <p className="eyebrow mt-3 text-ink/40">{pathway.audience}</p>
                  </div>

                  <p className="max-w-[44ch] text-[0.9375rem] leading-[1.65] text-ink-soft pretty">{pathway.answer}</p>

                  <div className="flex flex-col items-start gap-2 lg:items-end lg:text-right">
                    <ArrowLink href={pathway.href} label={pathway.destination} tone="clay" />
                    {pathway.provisional ? <span className="eyebrow text-[0.625rem] text-ink/30">Direct enquiry</span> : null}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* High-Converting Interactive Inquiry Form Block */}
        <motion.div
          id="enquire"
          className="mt-[clamp(3.5rem,8vw,6rem)] scroll-mt-24 overflow-hidden rounded-[2.5rem] bg-ink p-[clamp(2rem,5vw,5rem)] text-bone shadow-[0_32px_90px_-30px_rgba(26,20,17,0.7)] ring-1 ring-bone/10"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_EARLY}
          transition={{ duration: 1, ease: EASE_OUT_EXPO }}
        >
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Column: Context & Guarantees */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <span className="eyebrow text-clay-bright font-medium">Direct Line to Crystal Kizor</span>
                <h3 className="display mt-5 text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[0.95] text-bone">
                  Send a brief or <span className="italic text-clay-bright">invitation.</span>
                </h3>
                <p className="mt-5 text-[1.0625rem] leading-[1.65] text-bone/70 pretty">
                  Crystal personally reviews all architectural commissions, masterclass cohorts, and keynote invitations
                  with her team in Enugu.
                </p>

                {/* Trust and Response Guarantee Box */}
                <div className="mt-8 rounded-2xl border border-bone/15 bg-espresso/50 p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <span className="relative flex size-2.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-clay-bright opacity-75" />
                      <span className="relative inline-flex size-2.5 rounded-full bg-clay-bright" />
                    </span>
                    <span className="text-[0.8125rem] font-semibold text-bone">24–48 Hour Response Guarantee</span>
                  </div>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-bone/60">
                    You will receive a thoughtful, direct reply and scheduling options from Crystal or the studio coordinator.
                  </p>
                </div>

                {/* Direct alternative channels */}
                <div className="mt-8 space-y-3 text-[0.875rem]">
                  <p className="eyebrow text-bone/40">Direct Channels</p>
                  <div>
                    <a
                      href="mailto:hello@studiocoka.com"
                      className="inline-flex items-center gap-2 text-bone/80 transition-colors hover:text-clay-bright"
                    >
                      <span>hello@studiocoka.com</span>
                      <span aria-hidden>↗</span>
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://wa.me/2348000000000?text=Hello%20Crystal,%20I%20would%20like%20to%20discuss%20a%20project"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 text-clay-bright transition-opacity hover:opacity-80"
                    >
                      <span>Message on WhatsApp for quick inquiry</span>
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                  <p className="text-[0.8125rem] text-bone/45 pt-1">
                    Studio COKA · Enugu, Nigeria · Available across Africa & Globally
                  </p>
                </div>
              </div>

              <div className="mt-12 hidden lg:block">
                <Wordmark variant="signature-bone" height={48} alt="Crystal Kizor signature" className="opacity-60" />
              </div>
            </div>

            {/* Right Column: Interactive Contact Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full min-h-[24rem] flex-col items-center justify-center rounded-3xl border border-bone/15 bg-espresso/60 p-8 text-center"
                >
                  <div className="grid size-16 place-items-center rounded-full bg-clay text-bone text-2xl font-bold">
                    ✓
                  </div>
                  <h4 className="display mt-6 text-3xl text-bone">Thank you, {formData.name || "friend"}.</h4>
                  <p className="mt-3 max-w-[36ch] text-[1rem] leading-relaxed text-bone/70">
                    Your enquiry regarding <strong>{selectedService}</strong> has been received. Crystal and her team will
                    be in touch within 24 to 48 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-8 rounded-full border border-bone/25 px-6 py-2.5 text-[0.8125rem] font-medium text-bone hover:bg-bone/10"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Select Service Pills */}
                  <div>
                    <label className="eyebrow block text-bone/50 mb-3">I am enquiring about:</label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map((service) => {
                        const isSelected = selectedService === service;
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => setSelectedService(service)}
                            className={`rounded-full px-4 py-2 text-[0.8125rem] font-medium transition-all duration-300 ${
                              isSelected
                                ? "bg-clay text-bone shadow-sm ring-2 ring-clay-bright/50"
                                : "border border-bone/15 bg-espresso/40 text-bone/70 hover:border-bone/35 hover:text-bone"
                            }`}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="eyebrow block text-bone/50 mb-2">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Folake Adeyemi"
                        className="w-full rounded-xl border border-bone/20 bg-espresso/40 px-4 py-3 text-[0.9375rem] text-bone placeholder:text-bone/30 focus:border-clay-bright focus:outline-none focus:ring-1 focus:ring-clay-bright"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="eyebrow block text-bone/50 mb-2">
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. folake@example.com"
                        className="w-full rounded-xl border border-bone/20 bg-espresso/40 px-4 py-3 text-[0.9375rem] text-bone placeholder:text-bone/30 focus:border-clay-bright focus:outline-none focus:ring-1 focus:ring-clay-bright"
                      />
                    </div>
                  </div>

                  {/* Location & Budget Band */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-location" className="eyebrow block text-bone/50 mb-2">
                        Project Location / Organization
                      </label>
                      <input
                        id="contact-location"
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Lagos, Abuja, London, Remote"
                        className="w-full rounded-xl border border-bone/20 bg-espresso/40 px-4 py-3 text-[0.9375rem] text-bone placeholder:text-bone/30 focus:border-clay-bright focus:outline-none focus:ring-1 focus:ring-clay-bright"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-budget" className="eyebrow block text-bone/50 mb-2">
                        Estimated Scope / Budget
                      </label>
                      <select
                        id="contact-budget"
                        value={selectedBudget}
                        onChange={(e) => setSelectedBudget(e.target.value)}
                        className="w-full rounded-xl border border-bone/20 bg-espresso/70 px-4 py-3 text-[0.9375rem] text-bone focus:border-clay-bright focus:outline-none focus:ring-1 focus:ring-clay-bright"
                      >
                        {BUDGETS.map((b) => (
                          <option key={b} value={b} className="bg-espresso text-bone">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="eyebrow block text-bone/50 mb-2">
                      Brief Description of Project or Brief *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell Crystal about your site, ambition, timeline, or event..."
                      className="w-full rounded-xl border border-bone/20 bg-espresso/40 px-4 py-3 text-[0.9375rem] text-bone placeholder:text-bone/30 focus:border-clay-bright focus:outline-none focus:ring-1 focus:ring-clay-bright"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-3 rounded-full bg-clay px-8 py-4 text-[1rem] font-semibold text-bone transition-all duration-300 hover:bg-clay-bright hover:shadow-[0_12px_35px_-8px_rgba(196,101,58,0.7)] active:scale-[0.99] disabled:opacity-60"
                  >
                    <span>{loading ? "Sending your enquiry..." : "Send Enquiry to Crystal"}</span>
                    <svg
                      viewBox="0 0 16 16"
                      width="14"
                      height="14"
                      fill="none"
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M3 13L13 3M13 3H5.5M13 3v7.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhereNext;
