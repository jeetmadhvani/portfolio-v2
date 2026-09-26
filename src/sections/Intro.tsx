import Reveal from "../components/Reveal";
import Lenis from "lenis";
import SectionCTA from "../components/SectionCTA";

const Intro = () => {
  return (
    <section
      id="intro"
      data-trail="#ff2200"
      className="
        shrink-0
        px-8 md:px-16
        py-16 md:py-24
        flex flex-col
        gap-12
        md:grid md:grid-cols-4 md:gap-8
      "
    >
      {/* Section label */}
      <div className="col-span-1">
        <span className="text-xs font-body opacity-50 tracking-widest uppercase">
          01 — INTRO
        </span>
      </div>

      {/* Main content */}
      <div className="col-span-3">
        <Reveal className="flex flex-col gap-10 md:gap-12 text-2xl md:text-4xl font-body">
          <p>
            I started making websites because I liked the idea of being able to
            build something from nothing. A blank screen, a few lines of code,
            and eventually something you can actually use.
          </p>

          <p>
            Somewhere along the way, I started caring about the details just as
            much as the code.
          </p>

          <p>
            The type, the spacing, the way a button responds, how a page feels
            when you scroll through it. Those details are what make something
            feel considered. I like working where design and code overlap,
            turning an idea into something that not only works, but feels right
            to use.
          </p>
        </Reveal>

        {/* CTA */}
        <div className="mt-10 md:mt-12 w-full">
          <SectionCTA
            text="Let's build something."
            href="#work"
            onClick={(e) => {
              e.preventDefault();

              document.querySelector("#work")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Intro;
