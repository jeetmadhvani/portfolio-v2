import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MorphSlider from "../components/MorphSlider.tsx";
import SectionCTA from "../components/SectionCTA.tsx";
import { projects as projectData } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const projects = Object.values(projectData);

const morphItems = projects.map((project) => ({
  image: project.image,
  caption: project.name,
}));

const WorkSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const sliderControl = useRef<{
    next: () => void;
    prev: () => void;
    goTo: (index: number) => void;
  } | null>(null);

  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  /*
   * DESKTOP PINNED EXPERIENCE
   */
  useEffect(() => {
    const container = sectionRef.current;
    const work = workRef.current;

    if (!container || !work) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        /*
         * SECTION HEIGHT
         */

        const setupHeight = () => {
          const pinDistance =
            (projects.length - 1) * window.innerHeight;

          const sectionHeight =
            window.innerHeight + pinDistance;

          container.style.height = `${sectionHeight}px`;
        };

        setupHeight();

        /*
         * PINNED WORK SECTION
         */

        const workTrigger = ScrollTrigger.create({
          id: "work-scroll",

          trigger: container,

          start: "top top",

          end: () =>
            `+=${(projects.length - 1) * window.innerHeight}`,

          pin: work,

          pinSpacing: false,

          anticipatePin: 1,

          onUpdate: (self) => {
            const newIndex = Math.min(
              Math.round(
                self.progress * (projects.length - 1),
              ),
              projects.length - 1,
            );

            if (newIndex === activeIndexRef.current) {
              return;
            }

            sliderControl.current?.goTo(newIndex);

            activeIndexRef.current = newIndex;

            setActiveIndex(newIndex);
          },

          onRefreshInit: setupHeight,
        });

        /*
         * RETURN FROM PROJECT PAGE
         */

        const returnTarget =
          sessionStorage.getItem("portfolio-scroll-target");

        if (returnTarget === "work") {
          sessionStorage.removeItem("portfolio-scroll-target");

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              ScrollTrigger.refresh();

              window.scrollTo(
                0,
                workTrigger.start,
              );
            });
          });
        }

        /*
         * CLEANUP
         */

        return () => {
          workTrigger.kill();

          if (sectionRef.current) {
            sectionRef.current.style.height = "";
          }
        };
      }, sectionRef);

      return () => {
        ctx.revert();
      };
    });

    return () => {
      mm.revert();

      if (sectionRef.current) {
        sectionRef.current.style.height = "";
      }
    };
  }, []);

  /*
   * PROJECT TEXT ANIMATION
   */

  useEffect(() => {
    textRefs.current.forEach((ref, i) => {
      if (!ref) return;

      gsap.killTweensOf(ref);

      if (i === activeIndex) {
        gsap.fromTo(
          ref,
          {
            opacity: 0,
            x: -12,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            delay: 0.05,
            ease: "power2.out",
          },
        );
      } else {
        gsap.to(ref, {
          opacity: 0,
          x: -10,
          duration: 0.25,
          ease: "power2.in",
        });
      }
    });
  }, [activeIndex]);

  const activeProject = projects[activeIndex];

  return (
    <div
      ref={sectionRef}
      className="
        relative
        w-full
        px-8 md:px-16
      "
    >
      {/* ================================================== */}
      {/* DESKTOP */}
      {/* ================================================== */}

      <section
        ref={workRef}
        className="
          relative
          hidden lg:block
          w-full
          h-screen
        "
      >
        {/* Section label */}

        <div
          className="
            absolute
            top-8
            left-0
            z-10
          "
        >
          <span
            className="
              text-xs
              font-body
              opacity-50
              tracking-widest
              uppercase
            "
          >
            02 — Work
          </span>
        </div>

        {/* Project index */}

        <div
          className="
            absolute
            top-8
            right-0
            z-10
            flex
            items-baseline
            gap-2
          "
        >
          <span
            className="
              font-body
              text-xs
              tracking-widest
              text-white/70
            "
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </span>

          <span
            className="
              font-body
              text-[10px]
              tracking-widest
              text-white/25
            "
          >
            /
          </span>

          <span
            className="
              font-body
              text-[10px]
              tracking-widest
              text-white/30
            "
          >
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Main layout */}

        <div
          className="
            grid
            grid-cols-[7fr_5fr]
            h-full
          "
        >
          {/* PROJECT VISUAL */}

          <div
            className="
              relative
              h-full
              flex
              items-center
              pr-8
              pt-8
            "
          >
            <div
              className="
                relative
                w-full
                aspect-video
                overflow-hidden
              "
              style={{
                backgroundColor:
                  activeProject.visual.background,
              }}
            >
              <MorphSlider
                controlRef={sliderControl}
                items={morphItems}
                startIndex={0}
                transition="melt"
                duration={1.1}
                ease="power2.inOut"
                intensity={0.55}
                drift={0.4}
                aberration={0.35}
                loop={false}
                showCaptions={false}
                showControls={false}
                showIndicators={false}
                overlayColor="#0A0A0A"
                radius={4}
              />
            </div>
          </div>

          {/* PROJECT INFORMATION */}

          <div
            className="
              relative
              h-full
              flex
              items-center
              pl-8
            "
          >
            <div
              className="
                relative
                w-full
                max-w-lg
              "
            >
              <div
                className="
                  relative
                  h-[300px]
                "
              >
                {projects.map((project, i) => (
                  <div
                    key={project.number}
                    ref={(el) => {
                      textRefs.current[i] = el;
                    }}
                    className="
                      absolute
                      bottom-0
                      left-0
                      w-full
                      pointer-events-none
                    "
                    style={{
                      opacity: i === 0 ? 1 : 0,
                    }}
                  >
                    {/* Number */}

                    <span
                      className="
                        block
                        mb-4
                        text-xs
                        font-body
                        text-white/30
                        tracking-widest
                      "
                    >
                      {project.number}
                    </span>

                    {/* Title */}

                    <h2
                      className="
                        mb-6
                        font-hegarty
                        text-7xl
                        text-white
                        leading-none
                      "
                    >
                      {project.name}
                    </h2>

                    {/* Category */}

                    <span
                      className="
                        block
                        mb-4
                        text-xs
                        font-body
                        text-white/40
                        uppercase
                        tracking-widest
                      "
                    >
                      {project.category}
                    </span>

                    {/* Description */}

                    <p
                      className="
                        max-w-sm
                        font-body
                        text-sm
                        text-white/50
                        leading-relaxed
                      "
                    >
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}

              <div className="mt-8">
                <SectionCTA
                  text="View case study"
                  href={activeProject.link}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* MOBILE + TABLET */}
      {/* ================================================== */}

      <section
        className="
          lg:hidden
          w-full
        "
      >
        {/* Section label */}

        <div className="mb-12">
          <span
            className="
              text-xs
              font-body
              opacity-50
              tracking-widest
              uppercase
            "
          >
            02 — Work
          </span>
        </div>

        {/* Projects */}

        <div
          className="
            flex
            flex-col
            gap-16
          "
        >
          {projects.map((project, i) => (
            <article
              key={project.number}
              className="w-full"
            >
              {/* Project number */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-4
                "
              >
                <span
                  className="
                    text-xs
                    font-body
                    text-white/30
                    tracking-widest
                  "
                >
                  {project.number}
                </span>

                <span
                  className="
                    text-xs
                    font-body
                    text-white/50
                    tracking-widest
                  "
                >
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}
                </span>
              </div>

              {/* Image */}

              <div
                className="
                  relative
                  w-full
                  aspect-[4/3]
                  overflow-hidden
                  mb-8
                "
                style={{
                  backgroundColor:
                    project.visual.background,
                }}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="
                    relative
                    z-[5]
                    w-full
                    h-full
                    object-contain
                  "
                />
              </div>

              {/* Information */}

              <div className="w-full">
                {/* Title */}

                <h2
                  className="
                    mb-6
                    font-hegarty
                    text-6xl
                    sm:text-7xl
                    text-white
                    leading-none
                  "
                >
                  {project.name}
                </h2>

                {/* Category */}

                <span
                  className="
                    block
                    mb-4
                    text-xs
                    font-body
                    text-white/40
                    uppercase
                    tracking-widest
                  "
                >
                  {project.category}
                </span>

                {/* Description */}

                <p
                  className="
                    max-w-md
                    mb-8
                    font-body
                    text-sm
                    text-white/50
                    leading-relaxed
                  "
                >
                  {project.description}
                </p>

                {/* CTA */}

                <SectionCTA
                  text="View case study"
                  href={project.link}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WorkSection;