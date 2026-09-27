import Reveal from "../components/Reveal";

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
        <Reveal className="flex flex-col gap-8 md:gap-10 text-2xl md:text-4xl font-body">
          <p>
            I like making things from scratch. Turning a rough idea into
            something you can see, use, and interact with.
          </p>

          <p>
            Somewhere along the way, I started caring just as much about how
            things feel as how they work. Type, spacing, motion, the little
            details you notice without thinking about them.
          </p>

          <p>
            <span className="text-white">
              That's where I like to work.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Intro;