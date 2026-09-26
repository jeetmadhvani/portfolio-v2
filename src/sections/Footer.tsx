import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionCTA from "../components/SectionCTA";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const linksRef = useRef<HTMLDivElement>(null);

  const addWordRef = (el: HTMLSpanElement | null) => {
    if (el && !wordRefs.current.includes(el)) {
      wordRefs.current.push(el);
    }
  };

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer || !linksRef.current || !wordRefs.current.length) {
      return;
    }

    const ctx = gsap.context(() => {
      const words = wordRefs.current;
      const links = linksRef.current;

      gsap.set(words, {
        yPercent: 110,
      });

      gsap.set(links, {
        opacity: 0,
        y: 35,
      });

      const tl = gsap.timeline({
        paused: true,
      });

      tl.to(words, {
        yPercent: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      }).to(
        links,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        },
        "-=0.2",
      );

      ScrollTrigger.create({
        trigger: footer,
        start: "top 65%",
        end: "top 25%",
        animation: tl,
        scrub: 0.5,
      });
    }, footerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      data-trail="#ff2200"
      className="
        px-8 md:px-16
        py-16 md:py-24
        flex flex-col
        pointer-events-none
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
        {/* Section label */}
        <div className="col-span-1">
          <span className="text-xs font-body opacity-50 tracking-widest uppercase">
            04 — Contact
          </span>
        </div>

        {/* Main content */}
        <div className="col-span-1 md:col-span-3 flex flex-col">
          {/* Headline */}
          <h2
            className="
              font-hegarty
              text-[clamp(44px,8vw,130px)]
              leading-[0.9]
              text-white/90
              uppercase
              mb-12
            "
          >
            <div className="overflow-hidden">
              <span ref={addWordRef} className="inline-block">
                Have
              </span>{" "}
              <span ref={addWordRef} className="inline-block">
                something
              </span>
            </div>

            <div className="overflow-hidden">
              <span ref={addWordRef} className="inline-block">
                worth
              </span>{" "}
              <span ref={addWordRef} className="inline-block">
                building?
              </span>
            </div>
          </h2>

          {/* CTAs */}
          <div ref={linksRef} className="flex flex-col">
            {/* Email */}
            <SectionCTA
              text="contact@jeetmadhvani.com"
              href="mailto:contact@jeetmadhvani.com"
              className="
                text-[clamp(16px,2vw,24px)]
                py-3 md:py-4
              "
            />

            {/* Socials */}
            <div className="grid grid-cols-2">
              <div className="border-r border-white/30">
                <SectionCTA
                  text="LinkedIn"
                  href="https://www.linkedin.com/in/jeet-madhvani-809724380/"
                  targetBlank
                  className="
                    text-[clamp(16px,2vw,24px)]
                    py-3 md:py-4
                  "
                />
              </div>

              <div>
                <SectionCTA
                  text="GitHub"
                  href="https://github.com/jeetmadhvani"
                  targetBlank
                  className="
                    text-[clamp(16px,2vw,24px)]
                    py-3 md:py-4
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;