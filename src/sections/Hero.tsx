import { useEffect, useRef } from "react";
import gsap from "gsap";
import Nav from "../components/Nav";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const metaLineRefs = useRef<HTMLSpanElement[]>([]);

  const addWordRef = (el: HTMLSpanElement | null) => {
    if (el && !wordRefs.current.includes(el)) {
      wordRefs.current.push(el);
    }
  };

  const addMetaLineRef = (el: HTMLSpanElement | null) => {
    if (el && !metaLineRefs.current.includes(el)) {
      metaLineRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nav = navRef.current;

      if (!nav || !wordRefs.current.length || !metaLineRefs.current.length) {
        return;
      }

      const navLines = nav.querySelectorAll("[data-nav-line]");

      // Initial states
      gsap.set(wordRefs.current, {
        yPercent: 110,
      });

      gsap.set(navLines, {
        opacity: 0,
        clipPath: "inset(0 100% 0 0)",
      });

      gsap.set(metaLineRefs.current, {
        opacity: 0,
        clipPath: "inset(0 100% 0 0)",
      });

      // Entrance animation
      const tl = gsap.timeline();

      tl.to(wordRefs.current, {
        yPercent: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      })
        .to(
          navLines,
          {
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          metaLineRefs.current,
          {
            opacity: 0.8,
            clipPath: "inset(0 0% 0 0)",
            duration: 0.55,
            stagger: 0.035,
            ease: "power2.out",
          },
          "<",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="
  relative
  h-screen
  flex
  flex-col
  px-8
  md:px-16
  py-4
  md:py-8
"
    >
      {/* Nav */}
      <div ref={navRef}>
        <Nav />
      </div>

      {/* Meta */}
      <div
        ref={infoRef}
        className="
          text-[14px]
          mt-12
          md:mt-16
          lg:mt-28
          lg:text-[17px]
        "
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 md:gap-x-8 w-full">
          {/* Column 1 */}
          <span>
            <span ref={addMetaLineRef} className="inline-block">
              Based in
            </span>
            <br />
            <span ref={addMetaLineRef} className="inline-block">
              India
            </span>
          </span>

          {/* Column 2 */}
          <span>
            <span ref={addMetaLineRef} className="inline-block">
              I make websites and interfaces.
            </span>
            <br />
            <span ref={addMetaLineRef} className="inline-block">
              I care about good type,
            </span>
            <br />
            <span ref={addMetaLineRef} className="inline-block">
              smooth interactions,
            </span>
            <br />
            <span ref={addMetaLineRef} className="inline-block">
              and the little details.
            </span>
          </span>

          {/* Column 3 */}
          <span>
            <span ref={addMetaLineRef} className="inline-block">
              UI design
            </span>
            <br />
            <span ref={addMetaLineRef} className="inline-block">
              Web development
            </span>
            <br />
            <span ref={addMetaLineRef} className="inline-block">
              React · TypeScript · Tailwind
            </span>
            <br />
            <span ref={addMetaLineRef} className="inline-block">
              Figma · GSAP
            </span>
          </span>

          {/* Column 4 */}
          <span className="text-left md:text-right">
            <span ref={addMetaLineRef} className="inline-block">
              Currently
            </span>
            <br />
            <span ref={addMetaLineRef} className="inline-block">
              building things
            </span>
            <br />
            <span ref={addMetaLineRef} className="inline-block">
              on the web.
            </span>
          </span>
        </div>
      </div>

      {/* Headline */}
      <div className="mt-auto font-hegarty text-[clamp(36px,7.5vw,130px)] leading-none">
        <div className="overflow-hidden">
          <span ref={addWordRef} className="inline-block">
            I
          </span>{" "}
          <span ref={addWordRef} className="inline-block">
            LIKE
          </span>{" "}
          <span ref={addWordRef} className="inline-block">
            MAKING
          </span>
        </div>

        <div className="overflow-hidden">
          <span ref={addWordRef} className="inline-block">
            THINGS
          </span>{" "}
          <span ref={addWordRef} className="inline-block">
            FEEL
          </span>{" "}
          <span ref={addWordRef} className="inline-block">
            GOOD.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
