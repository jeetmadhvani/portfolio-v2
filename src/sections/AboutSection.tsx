import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../components/Reveal";
import SectionCTA from "../components/SectionCTA";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const cta = ctaRef.current;

    if (!text || !cta) return;

    const ctx = gsap.context(() => {
      const button = cta.querySelector("a");

      if (!button) return;

      const buttonText = button.querySelectorAll("span.relative");

      gsap.set(button, {
        clipPath: "inset(0 100% 0 0)",
      });

      gsap.set(buttonText, {
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: text,
          start: "bottom 75%",
          end: "bottom 50%",
          scrub: 0.5,
        },
      });

      // Draw borders from left to right
      tl.to(button, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.3,
        ease: "power2.out",
      });

      // Then reveal the text
      tl.to(
        buttonText,
        {
          opacity: 1,
          duration: 0.15,
          ease: "power2.out",
          stagger: 0.05,
        },
        "-=0.05",
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      data-trail="#999999"
      className="
        shrink-0
        px-8 md:px-16
        py-16 md:py-24
        flex flex-col
        gap-12
        md:grid md:grid-cols-4
        md:gap-8
      "
    >
      {/* LABEL */}
      <div className="col-span-1">
        <span className="text-xs font-body opacity-50 tracking-widest uppercase">
          03 — About Me
        </span>
      </div>

      {/* CONTENT */}
      <div className="col-span-3 flex flex-col gap-12">

        {/* MAIN COPY */}
        <div ref={textRef}>
          <Reveal
            className="
              flex flex-col
              gap-10 md:gap-12
              text-2xl md:text-4xl
              font-body
              text-white
            "
          >
            <p>
              I’m a 19 year old Computer Science student who spends far too much
              time thinking about websites. What started as learning to code
              slowly turned into an obsession with how things look, move, and
              feel.
            </p>

            <p>
              I enjoy taking an idea from a rough layout to something real that
              people can actually use. I’m still learning, still experimenting,
              and building that journey one project at a time.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;