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
        gap-12
        md:grid md:grid-cols-4 md:gap-8
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
            I design and build websites where the visual idea and the final
            experience stay connected. From the first layout in Figma to the
            last interaction in React, I care about making every part feel
            intentional.
          </p>

          <p>
            Most of what I learn comes from making things. I design, build,
            break, fix, and keep iterating until the result feels right.
          </p>

          <p>
            The goal is simple: websites that look considered, feel good to use,
            and give people a reason to stay.
          </p>
        </Reveal>

        {/* CTA + SOCIALS */}
       <div className="flex flex-col">
  {/* Email / primary CTA */}
  <SectionCTA
    text="Let's work together."
    href="mailto:contact@jeetmadhvani.com"
    className="
      text-[clamp(16px,2vw,24px)]
      py-3 md:py-4
    "
  />

  {/* Socials */}
  <div className="grid grid-cols-1 md:grid-cols-2">
    <div className="md:border-r md:border-white/30">
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

          {/* WHAT I BUILD */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-body text-white/25 tracking-widest uppercase">
              What I build
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
                Available for projects
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
