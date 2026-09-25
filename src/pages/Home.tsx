import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import AboutSection from "../sections/AboutSection";
import WorkSection from "../sections/WorkSection";
import Footer from "../sections/Footer";
import Hero from "../sections/Hero";
import Intro from "../sections/Intro";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    const ROW_COUNT = 8;
    const INITIAL_BG = "#500000";

    let currentBg = INITIAL_BG;
    let transitionTimeline: gsap.core.Timeline | null = null;

    const rows: HTMLDivElement[] = [];
    const container = document.createElement("div");

    let raf1 = 0;
    let raf2 = 0;

    document.body.style.backgroundColor = INITIAL_BG;
    document.body.style.setProperty("--current-bg", INITIAL_BG);

    /*
     * ==================================================
     * EXISTING BACKGROUND TRANSITION
     * ==================================================
     */

    container.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      display: flex;
      flex-direction: column;
    `;

    for (let i = 0; i < ROW_COUNT; i++) {
      const row = document.createElement("div");

      row.style.cssText = `
  flex: 1;
  width: 100%;
  margin-top: -1px;
  transform: scaleY(0);
  transform-origin: bottom center;
`;

      container.appendChild(row);
      rows.push(row);
    }

    document.body.appendChild(container);

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-bg]"),
    );

    const triggers: ScrollTrigger[] = [];

    const triggerTransition = (bg: string, direction: "down" | "up") => {
      if (bg === currentBg) return;

      currentBg = bg;

      transitionTimeline?.kill();

      rows.forEach((row) => {
        row.style.backgroundColor = bg;
      });

      gsap.set(rows, {
        scaleY: 0,
        transformOrigin: direction === "down" ? "bottom center" : "top center",
      });

      transitionTimeline = gsap.timeline({
        onComplete: () => {
          transitionTimeline = null;
        },
      });

      if (direction === "down") {
        transitionTimeline
          .to(rows, {
            scaleY: 1,
            duration: 0.35,
            ease: "power3.inOut",
            stagger: {
              each: 0.04,
              from: "end",
            },
          })
          .call(() => {
            document.body.style.backgroundColor = bg;
            document.body.style.setProperty("--current-bg", bg);
          })
          .to(rows, {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 0.35,
            ease: "power3.inOut",
            stagger: {
              each: 0.04,
              from: "start",
            },
          })
          .set(rows, {
            scaleY: 0,
            transformOrigin: "bottom center",
          });
      } else {
        transitionTimeline
          .to(rows, {
            scaleY: 1,
            duration: 0.35,
            ease: "power3.inOut",
            stagger: {
              each: 0.04,
              from: "start",
            },
          })
          .call(() => {
            document.body.style.backgroundColor = bg;
            document.body.style.setProperty("--current-bg", bg);
          })
          .to(rows, {
            scaleY: 0,
            transformOrigin: "bottom center",
            duration: 0.35,
            ease: "power3.inOut",
            stagger: {
              each: 0.04,
              from: "end",
            },
          })
          .set(rows, {
            scaleY: 0,
            transformOrigin: "top center",
          });
      }
    };

    /*
     * ==================================================
     * NAVIGATION STRIPS
     * ==================================================
     *
     * Separate from the normal background strips.
     * These sit above the entire website.
     */

    const navRows: HTMLDivElement[] = [];
    const navContainer = document.createElement("div");

    navContainer.style.cssText = `
  position: fixed;
  inset: -1px 0;
  z-index: 9999;
  pointer-events: none;
  display: flex;
  flex-direction: column;
`;

    for (let i = 0; i < ROW_COUNT; i++) {
      const row = document.createElement("div");

      row.style.cssText = `
        flex: 1;
        width: 100%;
        transform: scaleY(0);
        transform-origin: bottom center;
      `;

      navContainer.appendChild(row);
      navRows.push(row);
    }

    document.body.appendChild(navContainer);

    let navTimeline: gsap.core.Timeline | null = null;
    let navBusy = false;

    const handleNavTransition = (event: Event) => {
  if (navBusy) return;

  const customEvent =
    event as CustomEvent<{ id: string }>;

  const { id } = customEvent.detail;

  if (!id) return;

  const target = document.querySelector<HTMLElement>(id);

  if (!target) return;

  navBusy = true;
  navTimeline?.kill();

  const bg = target.dataset.bg || INITIAL_BG;

  navRows.forEach((row) => {
    row.style.backgroundColor = bg;
  });

  // Start completely open
  gsap.set(navRows, {
    scaleY: 0,
    transformOrigin: "bottom center",
  });

  navTimeline = gsap.timeline();

  // CLOSE THE SCREEN
  navTimeline.to(navRows, {
    scaleY: 1,
    duration: 0.9,
    ease: "power3.inOut",
    stagger: {
      each: 0.06,
      from: "end",
    },

    // NOTHING moves before this finishes
    onComplete: () => {
  // Wait until the screen is fully covered
  setTimeout(() => {
    const targetY =
      target.getBoundingClientRect().top +
      window.scrollY;

    window.scrollTo({
      top: targetY,
      behavior: "auto",
    });

    document.body.style.backgroundColor = bg;
    document.body.style.setProperty(
      "--current-bg",
      bg,
    );

    ScrollTrigger.refresh();
  }, 650);
},
  });

  // Keep everything covered while the new position settles
  navTimeline.to({}, {
    duration: 0.5,
  });

  // OPEN THE SCREEN
  navTimeline.to(navRows, {
    scaleY: 0,
    transformOrigin: "top center",
    duration: 0.9,
    ease: "power3.inOut",
    stagger: {
      each: 0.06,
      from: "start",
    },
  });

  navTimeline.set(navRows, {
    scaleY: 0,
    transformOrigin: "bottom center",
    onComplete: () => {
      navBusy = false;
      navTimeline = null;
    },
  });
};

    window.addEventListener("portfolio-nav-transition", handleNavTransition);

    /*
     * ==================================================
     * NORMAL SCROLL BACKGROUND TRIGGERS
     * ==================================================
     */

    sections.forEach((section, index) => {
      const bg = section.dataset.bg;

      if (!bg) return;

      const prevBg =
        index === 0 ? INITIAL_BG : sections[index - 1].dataset.bg || INITIAL_BG;

      if (bg === prevBg) return;

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top center",

        onEnter: () => {
          triggerTransition(bg, "down");
        },

        onLeaveBack: () => {
          triggerTransition(prevBg, "up");
        },
      });

      triggers.push(st);
    });

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        ScrollTrigger.refresh();

        gsap.set(rows, {
          scaleY: 0,
        });

        gsap.set(navRows, {
          scaleY: 0,
        });
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);

      window.removeEventListener(
        "portfolio-nav-transition",
        handleNavTransition,
      );

      transitionTimeline?.kill();
      navTimeline?.kill();

      triggers.forEach((trigger) => {
        trigger.kill();
      });

      gsap.killTweensOf(rows);
      gsap.killTweensOf(navRows);

      container.remove();
      navContainer.remove();

      document.body.style.backgroundColor = INITIAL_BG;

      document.body.style.setProperty("--current-bg", INITIAL_BG);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full text-white noise flex flex-col">
      <div className="relative z-10 flex flex-col pointer-events-none">
        <Hero data-bg="#500000" />

        <Intro data-bg="#500000" />

        <section id="work" data-bg="#0A0A0A">
          <WorkSection />
        </section>

        <section id="about" data-bg="#0A0A0A">
          <AboutSection />
        </section>

        <section id="contact" data-bg="#500000">
          <Footer />
        </section>
      </div>
    </div>
  );
};

export default Home;
