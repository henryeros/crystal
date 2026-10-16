"use client";

import { useEffect } from "react";
import Image from "next/image";

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    Lenis: any;
    Motion: any;
  }
}

const STEPS = [
  {
    num: "01",
    title: "Orientation & Wind",
    desc: "We position the layout where prevailing South-West breezes already blow. Natural cooling begins with a compass, not a generator.",
    img: "/media/work/nature-home-atrium.webp",
  },
  {
    num: "02",
    title: "Thermal Mass & Earth",
    desc: "Thick rammed earth, laterite clay, and brick walls absorb daytime heat and release it slowly at night.",
    img: "/media/work/earth-house-bedroom.webp",
  },
  {
    num: "03",
    title: "Convective Openings",
    desc: "Low-level intakes bring in ground-cooled air while clerestory louvers allow warm air to exhaust naturally.",
    img: "/media/work/nature-home-screen.webp",
  },
  {
    num: "04",
    title: "Deep Shading & Eaves",
    desc: "Generous roof overhangs and cantilevered balconies stop the intense equatorial sun before it touches glass.",
    img: "/media/work/nature-home-cantilever.webp",
  },
  {
    num: "05",
    title: "Microclimatic Trees",
    desc: "Preserving mature shade trees as biological heat buffers, dropping microclimate temperatures by 4 to 6°C.",
    img: "/media/work/nature-home-tree-shade.webp",
  },
  {
    num: "06",
    title: "Vernacular Materials",
    desc: "Sourcing indigenous hardwoods, stone, clay, and woven screens to reduce carbon and empower local artisans.",
    img: "/media/work/kasa-kofo-workshop.webp",
  },
  {
    num: "07",
    title: "Off-Grid Autonomy",
    desc: "Integrated solar energy and passive water harvesting, proven in Nigeria’s first 100% solar eye hospital in Nsukka.",
    img: "/media/work/earth-house-veranda.webp",
  },
  {
    num: "08",
    title: "Education & Guideline",
    desc: "Every project decision is codified for The Effective Architect, training 10,000+ designers across the globe.",
    img: "/media/work/crystal-at-desk.webp",
  },
];

const TESTIMONIALS = [
  {
    quote: "Crystal transformed our vision into Nigeria’s first fully off-grid hospital when she was just 23. The convective cooling in our waiting halls is remarkable — our diesel bills vanished, and patients recover in quiet, naturally temperate rooms.",
    author: "Dr. Chukwuma O.",
    role: "Medical Director, TESH Nsukka Hospital",
  },
  {
    quote: "Living in Nature Home feels like living in harmony with the breezes. Even during peak dry season in Enugu, our rooms stay 6 to 8 degrees cooler than outside without noisy generators running.",
    author: "Engr. Emeka & Ngozi K.",
    role: "Homeowners, Nature Home",
  },
  {
    quote: "The Effective Architect gave me the honest, on-site playbook I never got in school. Crystal doesn’t just teach theory; she gives you the blueprint for climate-responsive design that actually pays.",
    author: "Amara D., MNIA",
    role: "Principal Architect & TEA Alumni",
  },
  {
    quote: "Studio COKA understands that climate-responsive design is the single greatest driver of real estate value. Her passive cooling moves cut our projected operational HVAC costs by over 40%.",
    author: "Farouk M.",
    role: "Commercial Property Developer, Abuja",
  },
];

export default function Page() {
  useEffect(() => {
    // Wait until scripts are ready
    const init = () => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      const Lenis = window.Lenis;
      const Motion = window.Motion;

      if (!gsap || !ScrollTrigger) {
        setTimeout(init, 100);
        return;
      }

      const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
      const { animate, stagger } = Motion || {};
      const EASE = [0.16, 1, 0.3, 1];
      gsap.registerPlugin(ScrollTrigger);

      const $ = (s: string, r: Document | HTMLElement = document) => r.querySelector(s) as HTMLElement | null;
      const $$ = (s: string, r: Document | HTMLElement = document) => [...r.querySelectorAll(s)] as HTMLElement[];

      /* Smooth scroll (Lenis) wired to ScrollTrigger */
      let lenis: any;
      if (!reduce && Lenis) {
        lenis = new Lenis({ lerp: 0.09 });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((t: number) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
        $$('a[href^="#"]').forEach((a) =>
          a.addEventListener("click", (e) => {
            const h = a.getAttribute("href");
            if (h && h.length > 1 && $(h)) {
              e.preventDefault();
              lenis.scrollTo(h, { duration: 1.4 });
            }
          }),
        );
      }

      /* Heading and reveal animations - completely safe for React reconciler */
      const heroEl = $("#heroH");
      if (heroEl) {
        gsap.set(heroEl, { opacity: 0, y: 32 });
      }

      $$("[data-split]").forEach((h) => {
        gsap.set(h, { opacity: 0, y: 28 });
        ScrollTrigger.create({
          trigger: h,
          start: "top 88%",
          once: true,
          onEnter: () => gsap.to(h, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out" }),
        });
      });

      $$("[data-fade]").forEach((el) => {
        gsap.set(el, { opacity: 0, y: 24 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out" }),
        });
      });

      /* Loader → hero sequence */
      lenis && lenis.stop();
      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onComplete: () => {
          lenis && lenis.start();
          const loader = $("#loader");
          if (loader) {
            loader.style.display = "none";
            loader.style.pointerEvents = "none";
          }
        },
      });

      if (reduce) {
        tl.set("#loader", { autoAlpha: 0 });
        if (heroEl) gsap.set(heroEl, { opacity: 1, y: 0 });
      } else {
        tl.fromTo("#loaderX", { scale: 0.4, rotate: -90, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.9 })
          .to("#loaderX", { scale: 28, duration: 1.2 }, "+=.15")
          .to("#loader", { opacity: 0, duration: 0.6, ease: "power2.out" }, "-=.5")
          .to(heroEl, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }, "-=.7")
          .from("#nav .pill", { y: 80, opacity: 0, duration: 1, ease: "expo.out" }, "-=.6");
      }

      /* Hero: Interactive Slider of Crystal with manual touch swipe, mouse drag, and button controls */
      (function () {
        const layers = $$("#hero .layer");
        const ts = $$("#heroH .t");
        const links = $$("#heroH a[data-k]");
        const dots = $$(".hero-dot");
        const prevBtn = $("#heroPrev");
        const nextBtn = $("#heroNext");
        const hero = $("#hero");

        const keys = ["default", "residence", "hospital", "civic", "mission"];
        let currentIdx = 0;
        let autoTimer: any = null;

        const show = (k: string) => {
          const idx = keys.indexOf(k);
          if (idx !== -1) currentIdx = idx;

          layers.forEach((l) => {
            const on = l.dataset.k === k;
            if (animate) animate(l, { opacity: on ? 1 : 0 }, { duration: 0.85, ease: "easeInOut" });
            else l.style.opacity = on ? "1" : "0";
          });
          ts.forEach((t) => {
            const match = !k || k === "default" ? 1 : (t.closest("a") && (t.closest("a") as HTMLElement).dataset.k === k) || t.dataset.k === k ? 1 : 0.28;
            if (animate) animate(t, { opacity: match }, { duration: 0.45 });
            else t.style.opacity = String(match);
          });
          links.forEach((a) => {
            const match = !k || k === "default" || a.dataset.k === k ? 1 : 0.28;
            if (animate) animate(a, { opacity: match }, { duration: 0.45 });
            else a.style.opacity = String(match);
          });
          dots.forEach((d) => {
            const isAct = d.dataset.k === k;
            d.classList.toggle("bg-clay", isAct);
            d.classList.toggle("w-8", isAct);
            d.classList.toggle("w-3", !isAct);
            d.classList.toggle("bg-white/30", !isAct);
          });
          const captions: Record<string, string> = {
            default: "01 / 05 · Natural Ventilation",
            residence: "02 / 05 · Passive Residential",
            hospital: "03 / 05 · Off-Grid Healthcare",
            civic: "04 / 05 · Civic Landmarks",
            mission: "05 / 05 · AKO Alliance",
          };
          const cap = $("#slideCaption");
          if (cap && captions[k]) cap.textContent = captions[k];
        };

        const goTo = (idx: number) => {
          currentIdx = (idx + keys.length) % keys.length;
          show(keys[currentIdx]);
          resetAuto();
        };

        const nextSlide = () => goTo(currentIdx + 1);
        const prevSlide = () => goTo(currentIdx - 1);

        const resetAuto = () => {
          clearInterval(autoTimer);
          if (!reduce) {
            autoTimer = setInterval(() => {
              if (document.querySelector("#hero:hover")) return;
              nextSlide();
            }, 6500);
          }
        };

        if (prevBtn) prevBtn.addEventListener("click", prevSlide);
        if (nextBtn) nextBtn.addEventListener("click", nextSlide);

        links.forEach((a) => {
          ["mouseenter", "focus"].forEach((e) =>
            a.addEventListener(e, () => {
              show(a.dataset.k || "default");
              resetAuto();
            }),
          );
          ["mouseleave", "blur"].forEach((e) =>
            a.addEventListener(e, () => {
              show(keys[currentIdx]);
              resetAuto();
            }),
          );
        });

        dots.forEach((d) =>
          d.addEventListener("click", () => {
            const k = d.dataset.k || "default";
            const i = keys.indexOf(k);
            if (i !== -1) goTo(i);
          }),
        );

        // Touch swipe support (Mobile)
        if (hero) {
          let touchStartX = 0;
          let touchStartY = 0;
          let touchDiffX = 0;

          hero.addEventListener(
            "touchstart",
            (e: TouchEvent) => {
              touchStartX = e.touches[0].clientX;
              touchStartY = e.touches[0].clientY;
              touchDiffX = 0;
            },
            { passive: true },
          );

          hero.addEventListener(
            "touchmove",
            (e: TouchEvent) => {
              touchDiffX = e.touches[0].clientX - touchStartX;
            },
            { passive: true },
          );

          hero.addEventListener("touchend", (e: TouchEvent) => {
            const touchDiffY = Math.abs(e.changedTouches[0].clientY - touchStartY);
            if (Math.abs(touchDiffX) > 40 && Math.abs(touchDiffX) > touchDiffY) {
              if (touchDiffX < 0) nextSlide();
              else prevSlide();
            }
          });

          // Mouse drag support (Desktop)
          let mouseStartX = 0;
          let isMouseDown = false;
          let mouseDiffX = 0;

          hero.addEventListener("mousedown", (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest("a, button, input, textarea")) return;
            isMouseDown = true;
            mouseStartX = e.clientX;
            mouseDiffX = 0;
          });

          window.addEventListener("mousemove", (e: MouseEvent) => {
            if (!isMouseDown) return;
            mouseDiffX = e.clientX - mouseStartX;
          });

          window.addEventListener("mouseup", () => {
            if (!isMouseDown) return;
            isMouseDown = false;
            if (Math.abs(mouseDiffX) > 50) {
              if (mouseDiffX < 0) nextSlide();
              else prevSlide();
            }
          });
        }

        // Keyboard navigation
        window.addEventListener("keydown", (e: KeyboardEvent) => {
          if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName || "")) return;
          if (e.key === "ArrowRight") nextSlide();
          if (e.key === "ArrowLeft") prevSlide();
        });

        resetAuto();

        gsap.to(".par-hero", {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
        });

        return () => clearInterval(autoTimer);
      })();

      /* About parallax */
      $$(".par").forEach((p) =>
        gsap.fromTo(
          p,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: { trigger: p.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        ),
      );

      /* Nav theme follows the section underneath */
      $$("[data-theme]").forEach((s) => {
        if (s.id === "nav") return;
        ScrollTrigger.create({
          trigger: s,
          start: "top 92%",
          end: "bottom 92%",
          onToggle: (self: any) => {
            if (self.isActive) {
              const nav = $("#nav");
              if (nav) nav.dataset.theme = s.dataset.theme;
              const logo = $("#navLogo") as HTMLImageElement | null;
              if (logo) {
                logo.src = s.dataset.theme === "light" ? "/media/brand/monogram-ink.png" : "/media/brand/monogram-bone.png";
              }
            }
          },
        });
      });

      /* Menu overlay */
      (function () {
        const btn = $("#menuBtn");
        const menu = $("#menu");
        if (!btn || !menu) return;
        const bars = $$(".bar", btn);
        const words = $$(".w", menu);
        let open = false;

        const set = (o: boolean) => {
          open = o;
          btn.setAttribute("aria-expanded", String(o));
          const label = $("#menuLabel");
          if (label) label.textContent = o ? "Close" : "Menu";
          o ? lenis && lenis.stop() : lenis && lenis.start();
          if (o) {
            gsap.set(menu, { visibility: "visible" });
            gsap.to(menu, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "expo.inOut" });
            words.forEach((w) => (w.style.transform = "translateY(110%)"));
            animate && animate(words, { transform: ["translateY(110%)", "translateY(0%)"] }, { duration: 1, delay: stagger(0.08, { startDelay: 0.35 }), ease: EASE });
            gsap.to(bars[0], { y: 5, rotate: 45, duration: 0.5 });
            gsap.to(bars[1], { y: -5, rotate: -45, duration: 0.5 });
            const nav = $("#nav");
            if (nav) nav.dataset.theme = "dark";
          } else {
            gsap.to(menu, { clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "expo.inOut", onComplete: () => gsap.set(menu, { visibility: "hidden" }) });
            gsap.to(bars, { y: 0, rotate: 0, duration: 0.5 });
          }
        };

        btn.addEventListener("click", () => set(!open));
        $$("a", menu).forEach((a) => a.addEventListener("click", () => set(false)));
        window.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && open) set(false);
        });
      })();

      /* Projects: hover list swaps background */
      (function () {
        const list = $("#projList");
        const layers = $$("#projBg .layer");
        if (!list) return;

        const go = (k: string) => layers.forEach((l) => animate && animate(l, { opacity: l.dataset.k === String(k) ? 1 : 0 }, { duration: 0.75, ease: "easeInOut" }));

        $$("a", list).forEach((a) => {
          a.addEventListener("mouseenter", () => {
            list.classList.add("hov");
            $$(".prow", list).forEach((r) => r.classList.toggle("act", r === a));
            go(a.dataset.k || "0");
          });
          a.addEventListener("focus", () => a.dispatchEvent(new Event("mouseenter")));
        });

        list.addEventListener("mouseleave", () => {
          list.classList.remove("hov");
          $$(".prow", list).forEach((r) => r.classList.remove("act"));
          go("0");
        });

        $$("li", list).forEach((li, i) => {
          gsap.from(li, { opacity: 0, y: 40, duration: 1, ease: "expo.out", scrollTrigger: { trigger: li, start: "top 92%", once: true }, delay: i * 0.04 });
        });
      })();

      /* Process slider: drag with momentum feel (No innerHTML mutation) */
      (function () {
        const tr = $("#track");
        if (!tr) return;

        let down = false;
        let sx = 0;
        let sl = 0;
        let moved = 0;

        tr.addEventListener("pointerdown", (e) => {
          if (e.pointerType === "touch") return;
          down = true;
          sx = e.clientX;
          sl = tr.scrollLeft;
          moved = 0;
          tr.classList.add("drag");
        });
        window.addEventListener("pointermove", (e) => {
          if (!down) return;
          moved = e.clientX - sx;
          tr.scrollLeft = sl - moved;
        });
        window.addEventListener("pointerup", () => {
          if (!down) return;
          down = false;
          tr.classList.remove("drag");
        });

        gsap.from(".card", { opacity: 0, x: 80, duration: 1.2, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: tr, start: "top 85%", once: true } });
      })();

      /* Testimonials: smooth GSAP crossfade with direction awareness (No innerHTML mutation) */
      (function () {
        const Q = $("#quotes");
        const W = $("#who");
        const counter = $("#testiCounter");
        if (!Q || !W) return;

        const qs = $$(".q", Q);
        const ws = $$(".q", W);
        if (qs.length === 0 || ws.length === 0) return;

        let currentIdx = 0;
        let isTransitioning = false;
        let timer: any;

        // Initialize elements
        gsap.set(qs.slice(1), { opacity: 0, y: 14, visibility: "hidden" });
        gsap.set(ws.slice(1), { opacity: 0, y: 14, visibility: "hidden" });
        gsap.set([qs[0], ws[0]], { opacity: 1, y: 0, visibility: "visible" });

        const updateCounter = (idx: number) => {
          if (counter) counter.textContent = `0${idx + 1} / 0${qs.length}`;
        };
        updateCounter(0);

        const show = (nextIdx: number, direction: number = 1) => {
          if (nextIdx === currentIdx || isTransitioning) return;
          isTransitioning = true;

          const prevQ = qs[currentIdx];
          const prevW = ws[currentIdx];
          const nextQ = qs[nextIdx];
          const nextW = ws[nextIdx];

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            onComplete: () => {
              isTransitioning = false;
              currentIdx = nextIdx;
            },
          });

          // Outgoing elements
          tl.to([prevQ, prevW], {
            opacity: 0,
            y: direction > 0 ? -14 : 14,
            duration: 0.32,
            onComplete: () => {
              gsap.set([prevQ, prevW], { visibility: "hidden" });
            },
          });

          // Incoming elements
          tl.set([nextQ, nextW], {
            visibility: "visible",
            y: direction > 0 ? 14 : -14,
            opacity: 0,
          });

          tl.to(
            [nextQ, nextW],
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
            },
            "-=0.08",
          );

          updateCounter(nextIdx);
        };

        const step = (d: number) => {
          const next = (currentIdx + d + qs.length) % qs.length;
          show(next, d);
          reset();
        };

        const reset = () => {
          clearInterval(timer);
          if (!reduce) timer = setInterval(() => step(1), 7000);
        };

        const nextBtn = $("#next");
        const prevBtn = $("#prev");
        if (nextBtn) nextBtn.onclick = () => step(1);
        if (prevBtn) prevBtn.onclick = () => step(-1);

        const sec = $("#testimonials");
        if (sec) {
          sec.addEventListener("mouseenter", () => clearInterval(timer));
          sec.addEventListener("mouseleave", reset);
        }

        reset();
      })();

      /* Footer location hover */
      (function () {
        const layers = $$("#footBg .layer");
        const go = (k: string | null) => layers.forEach((l) => animate && animate(l, { opacity: l.dataset.k === k || (!k && !l.dataset.k) ? 1 : 0 }, { duration: 0.9, ease: "easeInOut" }));
        $$("#locs [data-k]").forEach((d) => {
          d.addEventListener("mouseenter", () => go(d.dataset.k || null));
          d.addEventListener("mouseleave", () => go(null));
        });
      })();

      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      init();
    } else {
      window.addEventListener("load", init);
      return () => window.removeEventListener("load", init);
    }
  }, []);

  return (
    <>
      {/* Loader */}
      <div id="loader" className="fixed inset-0 z-[100] bg-ink grid place-items-center">
        <div className="flex flex-col items-center gap-4 text-paper">
          <img id="loaderX" src="/media/brand/monogram-bone.png" alt="Crystal Kizor" className="w-16 h-16 object-contain" />
          <span className="eyebrow tracking-[0.25em] text-xs opacity-75">CRYSTAL KIZOR</span>
        </div>
      </div>

      {/* Nav - horizontal inline links */}
      <div id="nav" data-theme="dark">
        <nav className="pill" aria-label="Primary">
          <a href="#top" aria-label="Crystal Kizor home" className="grid place-items-center w-9 h-9 rounded-full hover:opacity-80 transition-opacity shrink-0">
            <img src="/media/brand/monogram-bone.png" alt="CK" className="w-5 h-5 object-contain" id="navLogo" />
          </a>
          <span className="h-4 w-px bg-current opacity-20 shrink-0"></span>
          <a href="#about" className="h-10 px-3 flex items-center text-[0.875rem] font-medium opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap">About</a>
          <a href="#projects" className="h-10 px-3 flex items-center text-[0.875rem] font-medium opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:flex">Projects</a>
          <a href="#process" className="h-10 px-3 flex items-center text-[0.875rem] font-medium opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap hidden md:flex">Method</a>
          <a href="#testimonials" className="h-10 px-3 flex items-center text-[0.875rem] font-medium opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap hidden md:flex">Voices</a>
          <a
            href="#contact"
            className="btn btn-brand h-10 bg-clay hover:bg-clay-bright text-white text-sm shadow-[0_4px_14px_-3px_rgba(169,80,42,0.5)] hover:shadow-[0_8px_20px_-4px_rgba(169,80,42,0.7)] shrink-0"
          >
            Contact me
          </a>
        </nav>
      </div>

      {/* Menu overlay removed — nav is now horizontal inline */}

      <main id="top">
        {/* HERO: Showcase Slider of Crystal */}
        <section id="hero" data-theme="dark" className="relative min-h-[100svh] overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0" aria-hidden="true" id="heroBg">
            <div className="layer on" data-k="default">
              <img
                src="/media/work/crystal-standing.webp"
                alt="Crystal Kizor standing in studio"
                className="par-hero absolute inset-0 w-full h-full object-cover object-[center_16%] filter brightness-[0.95] contrast-[1.03]"
              />
            </div>
            <div className="layer" data-k="residence">
              <img
                src="/media/work/crystal-at-desk.webp"
                alt="Crystal Kizor reviewing drawings at desk"
                className="par-hero absolute inset-0 w-full h-full object-cover object-[center_18%] filter brightness-[0.95] contrast-[1.03]"
              />
            </div>
            <div className="layer" data-k="hospital">
              <img
                src="/media/work/crystal-seated.webp"
                alt="Crystal Kizor seated in studio"
                className="par-hero absolute inset-0 w-full h-full object-cover object-[center_20%] filter brightness-[0.95] contrast-[1.03]"
              />
            </div>
            <div className="layer" data-k="civic">
              <img
                src="/media/work/crystal-recording.webp"
                alt="Crystal Kizor recording podcast"
                className="par-hero absolute inset-0 w-full h-full object-cover object-[center_18%] filter brightness-[0.95] contrast-[1.03]"
              />
            </div>
            <div className="layer" data-k="mission">
              <img
                src="/media/work/crystal-arms-folded.webp"
                alt="Crystal Kizor in studio"
                className="par-hero absolute inset-0 w-full h-full object-cover object-[center_18%] filter brightness-[0.95] contrast-[1.03]"
              />
            </div>
            <div
              id="heroShade"
              className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 via-45% to-transparent pointer-events-none"
            ></div>
          </div>

          <div className="relative z-10 px-5 md:px-12 pt-8 w-full max-w-[1600px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/media/brand/wordmark-inline-bone.png" alt="Crystal Kizor" className="h-6 w-auto opacity-90" />
              <span className="hidden md:inline h-4 w-px bg-white/20"></span>
              <span className="hidden md:inline text-xs tracking-widest uppercase opacity-60">Architect & Founder</span>
            </div>
          </div>

          <div className="relative z-10 px-5 md:px-12 pb-20 pt-16 w-full max-w-[1600px] mx-auto">
            <p className="text-xs mb-4 text-clay uppercase tracking-widest font-semibold" data-fade>
              Climate-Responsive Architecture
            </p>

            <h1 id="heroH" className="display text-[clamp(1.9rem,4.4vw,3.8rem)] max-w-[24ch] text-paper leading-[1.06] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              <span className="t">I design buildings that breathe naturally — </span>
              <a href="#projects" className="t hero-link" data-k="residence">
                homes
              </a>
              <span className="t">, </span>
              <a href="#projects" className="t hero-link" data-k="hospital">
                hospitals
              </a>
              <span className="t"> &amp; </span>
              <a href="#projects" className="t hero-link" data-k="civic">
                civic landmarks
              </a>
              <span className="t">.</span>
            </h1>

            {/* Slider Controls: arrows + dots + caption */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4" data-fade>
              <div className="flex items-center gap-3">
                {/* Prev arrow */}
                <button
                  id="heroPrev"
                  type="button"
                  className="w-9 h-9 rounded-full border border-white/30 hover:border-white/80 bg-white/10 hover:bg-white/20 text-paper flex items-center justify-center transition-all duration-200 hover:-translate-x-0.5 active:scale-95 cursor-pointer"
                  aria-label="Previous slide"
                >
                  ←
                </button>
                {/* Dot indicators */}
                <div className="flex items-center gap-2">
                  <button type="button" className="hero-dot w-8 h-1.5 rounded-full bg-clay transition-all duration-300" data-k="default" aria-label="Slide 1: Studio Overview"></button>
                  <button type="button" className="hero-dot w-3 h-1.5 rounded-full bg-white/30 hover:bg-white/60 transition-all duration-300" data-k="residence" aria-label="Slide 2: Residential"></button>
                  <button type="button" className="hero-dot w-3 h-1.5 rounded-full bg-white/30 hover:bg-white/60 transition-all duration-300" data-k="hospital" aria-label="Slide 3: Healthcare"></button>
                  <button type="button" className="hero-dot w-3 h-1.5 rounded-full bg-white/30 hover:bg-white/60 transition-all duration-300" data-k="civic" aria-label="Slide 4: Civic"></button>
                  <button type="button" className="hero-dot w-3 h-1.5 rounded-full bg-white/30 hover:bg-white/60 transition-all duration-300" data-k="mission" aria-label="Slide 5: Foundation"></button>
                </div>
                {/* Next arrow */}
                <button
                  id="heroNext"
                  type="button"
                  className="w-9 h-9 rounded-full border border-white/30 hover:border-white/80 bg-white/10 hover:bg-white/20 text-paper flex items-center justify-center transition-all duration-200 hover:translate-x-0.5 active:scale-95 cursor-pointer"
                  aria-label="Next slide"
                >
                  →
                </button>
              </div>
              <span id="slideCaption" className="text-xs uppercase tracking-widest text-paper/60 font-mono transition-opacity duration-300">
                01 / 05 · Natural Ventilation
              </span>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" data-theme="light" className="theme-light py-28 md:py-44 px-5 md:px-12">
          <div className="max-w-[1600px] mx-auto">
            <p className="text-sm mb-6 faded" data-fade>
              (About Crystal)
            </p>
            <h2 className="display text-[clamp(1.65rem,3.4vw,2.9rem)] md:pl-[12%] max-w-[34ch] md:max-w-none leading-[1.12]" data-split>
              We deliver physical environments that keep people naturally cool and directly improve the performance of our clients’ lives and businesses.
            </h2>
            <div className="grid md:grid-cols-12 gap-10 mt-20 md:mt-32 items-start">
              <div className="md:col-span-4 overflow-hidden aspect-[4/5] relative rounded-2xl par-box">
                <img src="/media/work/crystal-poised.webp" alt="Crystal Kizor poised in her studio" className="par absolute -inset-x-0 -top-[15%] h-[130%] w-full object-cover" />
              </div>
              <div className="md:col-span-5 md:col-start-7 space-y-5 text-lg leading-relaxed max-w-[52ch]" data-fade>
                <p>
                  I am Crystal Kizor, an architect, founder, and educator working across West Africa from Enugu, Nigeria. Educated at Coventry University (MA Interior Architecture) and the University of Cambridge (Sustainable Real Estate), I treat climate as the brief, not the constraint.
                </p>
                <p>
                  At age twenty-three, I designed and delivered Nigeria’s first off-grid solar hospital in Nsukka, eliminating 95% of generator dependency. Since then, over 100,000 sqm of residential, commercial, and civic spaces have proven that passive cooling is commercially superior and healthier to live in.
                </p>
                <p>
                  Through <strong>Studio COKA</strong> we design and build. Through <strong>The Effective Architect</strong> we teach over 10,000 designers globally. And through <strong>AKO Alliance</strong> we fund education for out-of-school children.
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <a href="#process" className="btn btn-line" style={{ "--hov": "#efeeea" } as React.CSSProperties}>
                    Our passive method
                  </a>
                  <a
                    href="#contact"
                    className="btn btn-brand bg-clay hover:bg-clay-bright text-white shadow-[0_4px_14px_-3px_rgba(169,80,42,0.5)] hover:shadow-[0_8px_20px_-4px_rgba(169,80,42,0.7)]"
                  >
                    Work with Crystal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" data-theme="dark" className="relative overflow-hidden py-28 md:py-40 px-5 md:px-12">
          <div className="absolute inset-0" aria-hidden="true" id="projBg">
            <div className="layer on" data-k="0" style={{ backgroundImage: "url('/media/work/nature-home-tree-shade.webp')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
            <div className="layer" data-k="1" style={{ backgroundImage: "url('/media/work/earth-house-approach.webp')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
            <div className="layer" data-k="2" style={{ backgroundImage: "url('/media/work/nature-home-atrium.webp')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
            <div className="layer" data-k="3" style={{ backgroundImage: "url('/media/work/kasa-kofo-elevation.webp')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
            <div className="layer" data-k="4" style={{ backgroundImage: "url('/media/work/earth-house-courtyard.webp')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
            <div className="layer" data-k="5" style={{ backgroundImage: "url('/media/work/nature-home-cantilever.webp')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
            <div className="layer" data-k="6" style={{ backgroundImage: "url('/media/work/kasa-kofo-library.webp')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          </div>
          <div className="relative max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-10">
              <p className="text-sm faded">(Featured built works & prototypes)</p>
              <span className="text-xs uppercase tracking-widest text-clay font-medium">Hover project to preview</span>
            </div>
            <ul id="projList" className="divide-y divide-white/10 border-y border-white/10">
              <li>
                <a href="#contact" data-k="0" className="prow">
                  <span>Nature Home</span>
                  <em>(Enugu · 79% Energy Cut)</em>
                </a>
              </li>
              <li>
                <a href="#contact" data-k="1" className="prow">
                  <span>The Passive Earth House</span>
                  <em>(Rammed Earth Prototype)</em>
                </a>
              </li>
              <li>
                <a href="#contact" data-k="2" className="prow">
                  <span>TESH Nsukka Hospital</span>
                  <em>(Nigeria&apos;s 1st Off-Grid Hospital)</em>
                </a>
              </li>
              <li>
                <a href="#contact" data-k="3" className="prow">
                  <span>Kasa Kofo Community Centre</span>
                  <em>(Casamance, Senegal)</em>
                </a>
              </li>
              <li>
                <a href="#contact" data-k="4" className="prow">
                  <span>House of the Future</span>
                  <em>(UAE Shading Prototype)</em>
                </a>
              </li>
              <li>
                <a href="#contact" data-k="5" className="prow">
                  <span>Nature Home Interiors</span>
                  <em>(Passive Shading Detail)</em>
                </a>
              </li>
              <li>
                <a href="#contact" data-k="6" className="prow">
                  <span>International Event Center</span>
                  <em>(Civic · Enugu)</em>
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" data-theme="light" className="theme-light py-28 md:py-40 overflow-hidden">
          <div className="px-5 md:px-12 max-w-[1600px] mx-auto mb-16">
            <p className="text-sm mb-6 faded" data-fade>
              (The Passive Method)
            </p>
            <h2 className="display text-[clamp(1.65rem,3.4vw,2.9rem)] md:pl-[12%] leading-[1.12]" data-split>
              Passive cooling is never one dramatic gesture. It is eight rigorous decisions working in concert.
            </h2>
          </div>
          <div id="track" className="track" role="region" aria-label="Method stages, drag to explore">
            {STEPS.map((s, i) => (
              <article key={i} className="card">
                <div className="overflow-hidden aspect-[3/2] mb-6 rounded-2xl relative par-box">
                  <img src={s.img} alt={s.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                <p className="display text-5xl mb-3 text-clay">{s.num}</p>
                <h3 className="text-xl font-medium mb-2">{s.title}</h3>
                <p className="faded max-w-[38ch] leading-relaxed">{s.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section data-theme="light" className="theme-light pb-28 md:pb-40 px-5 md:px-12" id="testimonials">
          <div className="max-w-[1600px] mx-auto grid md:grid-cols-12 gap-8 border-t border-black/15 pt-14 items-start">
            <div className="md:col-span-4 flex md:flex-col justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-clay font-semibold mb-3">Voices &amp; Precedents</p>
                <div id="who" className="relative min-h-[5rem]">
                  {TESTIMONIALS.map((x, i) => (
                    <div
                      key={i}
                      className={`q absolute inset-0 ${i === 0 ? "opacity-100" : "opacity-0"}`}
                      style={{ visibility: i === 0 ? "visible" : "hidden" }}
                    >
                      <p className="font-medium text-lg text-ink">{x.author}</p>
                      <p className="text-sm text-clay font-medium mt-0.5">{x.role}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  id="prev"
                  className="w-11 h-11 rounded-full border border-black/25 hover:border-black bg-transparent hover:bg-black hover:text-[#efeeea] text-ink flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-sm text-base"
                  aria-label="Previous quote"
                >
                  ←
                </button>
                <button
                  id="next"
                  className="w-11 h-11 rounded-full border border-black/25 hover:border-black bg-transparent hover:bg-black hover:text-[#efeeea] text-ink flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-sm text-base"
                  aria-label="Next quote"
                >
                  →
                </button>
                <span id="testiCounter" className="text-xs font-mono tracking-widest text-black/55 ml-2 font-medium">
                  01 / 04
                </span>
              </div>
            </div>
            <div id="quotes" className="md:col-span-8 relative min-h-[14rem] sm:min-h-[16rem]">
              {TESTIMONIALS.map((x, i) => (
                <blockquote
                  key={i}
                  className={`q display text-[clamp(1.35rem,2.6vw,2.2rem)] max-w-[32ch] leading-snug absolute inset-0 ${i === 0 ? "opacity-100" : "opacity-0"}`}
                  style={{ visibility: i === 0 ? "visible" : "hidden" }}
                >
                  “{x.quote}”
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* INSIGHTS */}
        <section id="insights" data-theme="light" className="theme-light pb-28 md:pb-40 px-5 md:px-12">
          <div className="max-w-[1600px] mx-auto">
            <p className="text-sm mb-6 faded" data-fade>
              (Research & Writing)
            </p>
            <h2 className="display text-[clamp(1.65rem,3.4vw,2.75rem)] mb-12 leading-[1.12]" data-split>
              Perspectives on tropical architecture, local materials, and commercial returns.
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <a href="#contact" className="group block">
                <div className="overflow-hidden aspect-[3/2] rounded-xl par-box">
                  <img src="/media/work/nature-home-cantilever.webp" alt="Cantilever" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                </div>
                <p className="mt-4 text-sm faded">Weekly Newsletter · 1,700+ readers</p>
                <h3 className="display text-xl sm:text-2xl mt-1 leading-snug">The ROI of Intentional Design</h3>
                <p className="mt-3 faded max-w-[42ch]">How climate-responsive architecture pays back immediately in reduced diesel bills, lower cooling cap-ex, and asset longevity.</p>
              </a>
              <a href="#contact" className="group block">
                <div className="overflow-hidden aspect-[3/2] rounded-xl par-box">
                  <img src="/media/work/earth-house-veranda.webp" alt="Veranda" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                </div>
                <p className="mt-4 text-sm faded">Series · Tropical Physics</p>
                <h3 className="display text-xl sm:text-2xl mt-1 leading-snug">Passive Cooling Tuesday</h3>
                <p className="mt-3 faded max-w-[42ch]">Breaking down one climate-responsive construction decision every week — thermal mass, orientation, cross-ventilation, and shade.</p>
              </a>
              <a href="#contact" className="group block">
                <div className="overflow-hidden aspect-[3/2] rounded-xl par-box">
                  <img src="/media/work/kasa-kofo-workshop.webp" alt="Workshop" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                </div>
                <p className="mt-4 text-sm faded">Keynote · TEDx Talk</p>
                <h3 className="display text-xl sm:text-2xl mt-1 leading-snug">Indigenous Modern Architecture</h3>
                <p className="mt-3 faded max-w-[42ch]">Why glass boxes imported from temperate Europe fail in Africa, and how vernacular materials unlock sustainable, modern luxury.</p>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER / CONTACT */}
        <footer id="contact" data-theme="dark" className="relative overflow-hidden px-5 sm:px-8 md:px-12 pt-24 sm:pt-32 pb-32 sm:pb-40">
          <div className="absolute inset-0" aria-hidden="true" id="footBg">
            <div className="layer on" style={{ background: "#14110e" }}></div>
            <div className="layer" data-k="enugu" style={{ background: "radial-gradient(ellipse 90% 80% at 20% 40%, rgba(169, 80, 42, 0.22) 0%, #120e0b 80%)" }}></div>
            <div className="layer" data-k="lagos" style={{ background: "radial-gradient(ellipse 90% 80% at 50% 40%, rgba(34, 51, 71, 0.35) 0%, #0d1217 80%)" }}></div>
            <div className="layer" data-k="global" style={{ background: "radial-gradient(ellipse 90% 80% at 80% 40%, rgba(46, 69, 54, 0.35) 0%, #0d1510 80%)" }}></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(169,80,42,0.12),transparent_55%)] pointer-events-none"></div>
          </div>

          <div className="relative max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="flex items-center gap-2.5 mb-3" data-fade>
                <span className="w-2 h-2 rounded-full bg-clay animate-pulse"></span>
                <span className="text-xs uppercase tracking-widest text-clay font-semibold">Initiate a Brief or Dialogue</span>
              </div>
              <h2 className="display text-[clamp(1.85rem,3.8vw,3.4rem)] text-paper leading-[1.08]" data-split>
                For architectural commissions, keynotes, or joining The Effective Architect.
              </h2>
              <p className="mt-4 text-paper/70 text-base sm:text-lg max-w-[56ch] leading-relaxed" data-fade>
                We collaborate with visionary private clients, developers, and institutions committed to naturally ventilated, climate-intelligent architecture across West Africa and internationally.
              </p>
            </div>

            {/* Split Grid: Left Atelier & Channels, Right Bespoke Form */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              {/* Left Column: Direct Atelier Access & Locations */}
              <div className="lg:col-span-5 space-y-6" data-fade>
                {/* Direct Connect Cards */}
                <div className="space-y-3">
                  <a
                    href="mailto:hello@studiocoka.com"
                    className="group block p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-clay/60 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <span className="w-10 h-10 rounded-full bg-clay/20 text-clay grid place-items-center text-sm font-semibold">
                          ✉
                        </span>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-paper/50">Studio Email</p>
                          <p className="text-paper font-medium text-base group-hover:text-clay transition-colors">hello@studiocoka.com</p>
                        </div>
                      </div>
                      <span className="text-paper/40 group-hover:text-clay group-hover:translate-x-1 transition-all">→</span>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/2348000000000?text=Hello%20Crystal,%20I%20would%20like%20to%20discuss%20an%20architectural%20project"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group block p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-500/60 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <span className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 grid place-items-center text-sm font-semibold">
                          💬
                        </span>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-paper/50">Direct Studio WhatsApp</p>
                          <p className="text-paper font-medium text-base group-hover:text-emerald-400 transition-colors">+234 800 000 0000</p>
                        </div>
                      </div>
                      <span className="text-paper/40 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all">→</span>
                    </div>
                  </a>
                </div>

                {/* Atelier Hub Locations */}
                <div id="locs" className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  <p className="text-xs uppercase tracking-widest text-clay font-semibold">Studio Locations &amp; Coverage</p>
                  <div className="space-y-3 divide-y divide-white/5">
                    <div data-k="enugu" className="pt-2 group cursor-default transition-colors">
                      <div className="flex items-baseline justify-between">
                        <p className="text-paper font-medium text-sm group-hover:text-clay transition-colors">Enugu, Nigeria · Principal Atelier</p>
                        <span className="text-[0.6875rem] uppercase tracking-wider text-paper/40 font-mono">Headquarters</span>
                      </div>
                      <p className="text-xs text-paper/60 mt-0.5">Independence Layout · Studio COKA Architecture &amp; Passive Lab</p>
                    </div>

                    <div data-k="lagos" className="pt-3 group cursor-default transition-colors">
                      <div className="flex items-baseline justify-between">
                        <p className="text-paper font-medium text-sm group-hover:text-sky-400 transition-colors">Lagos &amp; Abuja</p>
                        <span className="text-[0.6875rem] uppercase tracking-wider text-paper/40 font-mono">Commissions</span>
                      </div>
                      <p className="text-xs text-paper/60 mt-0.5">Residential Estates, Health Facilities &amp; Commercial Real Estate</p>
                    </div>

                    <div data-k="global" className="pt-3 group cursor-default transition-colors">
                      <div className="flex items-baseline justify-between">
                        <p className="text-paper font-medium text-sm group-hover:text-emerald-400 transition-colors">International &amp; Online</p>
                        <span className="text-[0.6875rem] uppercase tracking-wider text-paper/40 font-mono">TEA &amp; Talks</span>
                      </div>
                      <p className="text-xs text-paper/60 mt-0.5">The Effective Architect · Cambridge &amp; Coventry Alumni Network</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-clay/10 border border-clay/20 flex items-center gap-3 text-xs text-paper/80">
                  <span className="text-clay text-base">✦</span>
                  <span>Every inquiry is reviewed personally by Crystal Kizor and Studio COKA partners. Typical reply within 24–48 hours.</span>
                </div>
              </div>

              {/* Right Column: Premium Form */}
              <div className="lg:col-span-7" data-fade>
                <div className="relative rounded-3xl bg-white/[0.04] border border-white/10 p-6 sm:p-9 backdrop-blur-xl shadow-2xl">
                  <div className="mb-6">
                    <h3 className="text-xl font-medium text-paper">Send Project Brief</h3>
                    <p className="text-xs text-paper/60 mt-1">Select your enquiry interest and tell us about your site, brief, or dates.</p>
                  </div>

                  <form
                    id="contactForm"
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const alert = document.getElementById("sentAlert");
                      if (alert) {
                        alert.classList.remove("hidden");
                        alert.scrollIntoView({ behavior: "smooth", block: "nearest" });
                      }
                      (e.target as HTMLFormElement).reset();
                    }}
                  >
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-paper/70 font-medium mb-1.5">
                        Area of Interest
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <label className="relative flex items-center justify-center p-2.5 rounded-xl border border-white/10 bg-black/30 hover:border-clay/50 cursor-pointer text-xs font-medium text-center transition-all has-[:checked]:border-clay has-[:checked]:bg-clay/20 has-[:checked]:text-paper">
                          <input type="radio" name="interest" value="architecture" defaultChecked className="sr-only" />
                          <span>Architecture</span>
                        </label>
                        <label className="relative flex items-center justify-center p-2.5 rounded-xl border border-white/10 bg-black/30 hover:border-clay/50 cursor-pointer text-xs font-medium text-center transition-all has-[:checked]:border-clay has-[:checked]:bg-clay/20 has-[:checked]:text-paper">
                          <input type="radio" name="interest" value="speaking" className="sr-only" />
                          <span>Keynote / Talk</span>
                        </label>
                        <label className="relative flex items-center justify-center p-2.5 rounded-xl border border-white/10 bg-black/30 hover:border-clay/50 cursor-pointer text-xs font-medium text-center transition-all has-[:checked]:border-clay has-[:checked]:bg-clay/20 has-[:checked]:text-paper">
                          <input type="radio" name="interest" value="masterclass" className="sr-only" />
                          <span>TEA Training</span>
                        </label>
                        <label className="relative flex items-center justify-center p-2.5 rounded-xl border border-white/10 bg-black/30 hover:border-clay/50 cursor-pointer text-xs font-medium text-center transition-all has-[:checked]:border-clay has-[:checked]:bg-clay/20 has-[:checked]:text-paper">
                          <input type="radio" name="interest" value="foundation" className="sr-only" />
                          <span>AKO Alliance</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-paper/70 font-medium mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Adebayo Okonjo"
                          className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-paper placeholder-white/35 focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-paper/70 font-medium mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="adebayo@company.com"
                          className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-paper placeholder-white/35 focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-paper/70 font-medium mb-1.5">
                          Phone / WhatsApp (Optional)
                        </label>
                        <input
                          type="tel"
                          placeholder="+234 ..."
                          className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-paper placeholder-white/35 focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-paper/70 font-medium mb-1.5">
                          Project Location or Entity
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Enugu, Lagos, London..."
                          className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-paper placeholder-white/35 focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-paper/70 font-medium mb-1.5">
                        Project Brief or Message *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell us about your project vision, site conditions, anticipated timeline, or event dates..."
                        className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-paper placeholder-white/35 focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-all text-sm leading-relaxed"
                      ></textarea>
                    </div>

                    <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                      <button
                        type="submit"
                        className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-clay hover:bg-clay-bright text-white font-medium text-sm transition-all duration-300 shadow-[0_4px_16px_-3px_rgba(169,80,42,0.5)] hover:shadow-[0_8px_24px_-4px_rgba(196,101,58,0.7)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
                      >
                        <span>Send Project Brief</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </button>
                      <a
                        href="https://wa.me/2348000000000?text=Hello%20Crystal,%20I%20would%20like%20to%20discuss%20a%20project"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 hover:border-emerald-500/70 bg-white/[0.04] hover:bg-emerald-500/15 text-paper hover:text-white font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform duration-300"></span>
                        <span>Quick Chat on WhatsApp</span>
                      </a>
                    </div>

                    <div id="sentAlert" className="hidden p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-sm animate-in fade-in duration-300">
                      <div className="flex items-center gap-2 font-medium">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>Thank you! Your enquiry has been received.</span>
                      </div>
                      <p className="text-xs text-emerald-300/80 mt-1">Crystal Kizor and the studio partners will review your details and respond within 24–48 hours.</p>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Copyright & Social Links */}
            <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-paper/60">
              <span>© 2026 Crystal Kizor · Studio COKA · All Rights Reserved</span>
              <div className="flex flex-wrap items-center gap-6">
                <a href="https://studiocoka.com" target="_blank" rel="noreferrer noopener" className="hover:text-clay transition-colors">
                  Studio COKA
                </a>
                <a href="https://akoalliance.com" target="_blank" rel="noreferrer noopener" className="hover:text-clay transition-colors">
                  AKO Alliance
                </a>
                <a href="https://www.linkedin.com/company/studio-coka/" target="_blank" rel="noreferrer noopener" className="hover:text-clay transition-colors">
                  LinkedIn
                </a>
                <a href="https://www.instagram.com/studio.coka/" target="_blank" rel="noreferrer noopener" className="hover:text-clay transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
