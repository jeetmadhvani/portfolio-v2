import Reveal from "../components/Reveal";
import SectionCTA from "../components/SectionCTA";

const AboutSection = () => {
  return (
    <section
      data-trail="#999999"
      className="
    shrink-0
    px-8 md:px-16
    py-16 md:py-24
    flex flex-col
    gap-12 md:grid md:grid-cols-4 md:gap-8
  "
    >
      {/* LABEL */}
      <div className="col-span-1">
        <span className="text-xs font-body opacity-50 tracking-widest uppercase">
          03 — About
        </span>
      </div>

      {/* CONTENT */}
      <div className="col-span-3 flex flex-col gap-12">
        {/* MAIN COPY */}
        <Reveal className="flex flex-col gap-10 md:gap-12 text-2xl md:text-4xl font-body text-white">
          <p>
            I like working where design and code overlap. I usually start in
            Figma, then build the idea myself in React.
          </p>

          <p>
            Most of what I learn comes from making things. I design, build,
            break, fix, and keep iterating until the result feels right.
          </p>

          <p>
            I care about websites that feel clear, intentional, and good to use.
          </p>
        </Reveal>

        {/* CTA + SOCIALS */}
        <div className="flex flex-col gap-0">
          <SectionCTA
            text="Let's work together."
            href="mailto:contact@jeetmadhvani.com"
            className="text-[clamp(16px,2vw,24px)] py-3 md:py-4"
          />

          <SectionCTA
            text="LinkedIn"
            href="https://www.linkedin.com/in/jeet-madhvani-809724380/"
            className="text-[clamp(16px,2vw,24px)] py-3 md:py-4"
          />

          <SectionCTA
            text="GitHub"
            href="https://github.com/jeetmadhvani"
            className="text-[clamp(16px,2vw,24px)] py-3 md:py-4"
          />
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {/* STACK */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-body text-white/25 tracking-widest uppercase">
              Stack
            </span>

            <span className="font-body text-sm text-white/60">
              React · TypeScript
            </span>

            <span className="font-body text-sm text-white/60">
              Tailwind · Figma · GSAP
            </span>
          </div>

          {/* SERVICES */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-body text-white/25 tracking-widest uppercase">
              Services
            </span>

            <span className="font-body text-sm text-white/60">
              Landing Pages
            </span>

            <span className="font-body text-sm text-white/60">
              Business Websites
            </span>

            <span className="font-body text-sm text-white/60">
              Product Interfaces
            </span>

            <span className="font-body text-sm text-white/60">UI Design</span>
          </div>

          {/* AVAILABILITY */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-body text-white/25 tracking-widest uppercase">
              Availability
            </span>

            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />

              <span className="font-body text-sm text-white/60">
                Open to projects
              </span>
            </div>

            <span className="font-body text-sm text-white/60">GMT +5:30</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
