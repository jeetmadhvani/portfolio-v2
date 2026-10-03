import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionCTA from "../components/SectionCTA";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  const addWordRef = (el: HTMLSpanElement | null) => {
    if (el && !wordRefs.current.includes(el)) {
      wordRefs.current.push(el);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cta = ctaRef.current;

    if (!section || !heading || !cta) return;

    const ctx = gsap.context(() => {
      const buttons =
        cta.querySelectorAll<HTMLAnchorElement>("a");

      if (!buttons.length || !wordRefs.current.length) return;

      const buttonTexts = Array.from(buttons).flatMap(
        (button) =>
          Array.from(
            button.querySelectorAll("span.relative"),
          ),
      );

      /*
       * INITIAL STATES
       */

      gsap.set(wordRefs.current, {
        yPercent: 110,
      });

      gsap.set(buttons, {
        clipPath: "inset(0 100% 0 0)",
      });

      gsap.set(buttonTexts, {
        opacity: 0,
      });

      /*
       * HEADING ANIMATION
       */

      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 75%",
          scrub: 0.5,
        },
      });

      headingTl.to(wordRefs.current, {
        yPercent: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      });

      /*
       * CTA ANIMATION
       */

      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 40%",
          end: "bottom 95%",
          scrub: 0.5,
        },
      });

      /*
       * CTA BORDERS
       */

      ctaTl.to(buttons, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.3,
        ease: "power2.out",
      });

      /*
       * CTA TEXT
       */

      ctaTl.to(buttonTexts, {
        opacity: 1,
        duration: 0.15,
        stagger: 0,
        ease: "power2.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-trail="#999999"
      className="
        relative
        shrink-0
        h-screen
        px-8
        md:px-16
        py-16
        md:py-24
        flex
        flex-col
      "
    >
      {/* CONTENT */}

      <div
        className="
          mt-auto
          mb-auto
          flex
          flex-col
          gap-12
          md:grid
          md:grid-cols-4
          md:gap-8
          items-start
        "
      >
        {/* CONTACT LABEL */}

        <div className="md:col-span-1">
          <span
            className="
              text-xs
              font-body
              opacity-50
              tracking-widest
              uppercase
            "
          >
            04 — Contact
          </span>
        </div>

        {/* MAIN CONTENT */}

        <div className="md:col-start-2 md:col-span-3">
          {/* HEADLINE */}

          <div
            ref={headingRef}
            className="
              font-hegarty
              text-[clamp(42px,11vw,72px)]
              md:text-[clamp(48px,8vw,140px)]
              leading-[0.88]
              text-white
            "
          >
            <div className="overflow-hidden">
              <span
                ref={addWordRef}
                className="inline-block"
              >
                HAVE
              </span>
            </div>

            <div className="overflow-hidden">
              <span
                ref={addWordRef}
                className="inline-block"
              >
                SOMETHING
              </span>
            </div>

            <div className="overflow-hidden">
              <span
                ref={addWordRef}
                className="inline-block"
              >
                WORTH
              </span>
            </div>

            <div className="overflow-hidden">
              <span
                ref={addWordRef}
                className="inline-block"
              >
                BUILDING?
              </span>
            </div>
          </div>

          {/* CTAs */}

          <div
            ref={ctaRef}
            className="
              mt-12
              md:mt-12
              w-full
            "
          >
            {/* EMAIL */}

            <SectionCTA
              text="jeetmadhvani@gmail.com"
              href="mailto:jeetmadhvani.work@gmail.com"
              className="
                text-[clamp(16px,2vw,24px)]
                py-4
                md:py-5
              "
            />

            {/* SOCIALS */}

            <div className="grid grid-cols-1 md:grid-cols-2">
              <SectionCTA
                text="LinkedIn"
                href="https://www.linkedin.com"
                targetBlank
                className="
                  text-[clamp(16px,2vw,24px)]
                  py-4
                  md:py-5
                  md:border-r
                  md:border-r-white/30
                "
              />

              <SectionCTA
                text="GitHub"
                href="https://github.com"
                targetBlank
                className="
                  text-[clamp(16px,2vw,24px)]
                  py-4
                  md:py-5
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;