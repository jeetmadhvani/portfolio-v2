import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
}

const Reveal = ({ children, className = "" }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const paras = el.querySelectorAll<HTMLElement>("p");

      paras.forEach((p) => {
        const text = p.textContent || "";
        const words = text.split(" ");

        p.innerHTML = words
          .map(
            (word) =>
              `<span class="inline-block">${word}</span>`,
          )
          .join(" ");
      });

      const spans = el.querySelectorAll<HTMLElement>(
        "p span",
      );

      gsap.set(spans, {
        opacity: 0,
        filter: "blur(4px)",
      });

      const animation = gsap.to(spans, {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.05,
        duration: 0.1,
        ease: "none",
        paused: true,
      });

      const mm = gsap.matchMedia();

      mm.add(
        {
          mobile: "(max-width: 767px)",
          desktop: "(min-width: 768px)",
        },
        (context) => {
          const { mobile } = context.conditions as {
            mobile: boolean;
            desktop: boolean;
          };

          ScrollTrigger.create({
            trigger: el,

            start: mobile
              ? "top 88%"
              : "top 85%",

            end: mobile
              ? "bottom 72%"
              : "bottom 68%",

            scrub: 0.5,

            animation,

            invalidateOnRefresh: true,
          });
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default Reveal;