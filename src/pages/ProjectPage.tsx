import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { projects } from "../data/projects";

gsap.registerPlugin(Observer);

const ProjectPage = () => {
  const { slug } = useParams();

  const project = slug ? projects[slug] : null;

  const pageRef = useRef<HTMLElement>(null);

  const trackRef = useRef<HTMLDivElement>(null);

  const targetX = useRef(0);
  const currentX = useRef(0);

  const pendingMovement = useRef(0);

  const introFinished = useRef(false);

  const activeIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  /*
   * Reset everything whenever the
   * project changes.
   */
  useEffect(() => {
    targetX.current = 0;
    currentX.current = 0;
    pendingMovement.current = 0;
    introFinished.current = false;
    activeIndexRef.current = 0;
    setActiveIndex(0);
  }, [slug]);

  useEffect(() => {
    if (!project) return;

    const page = pageRef.current;

    const track = trackRef.current;

    if (!page || !track) return;

    const ctx = gsap.context(() => {
      const header = page.querySelector("[data-project-header]");

      const title = page.querySelector("[data-project-title]");

      const description = page.querySelector("[data-project-description]");

      const meta = page.querySelectorAll("[data-project-meta]");

      /*
       * IMPORTANT:
       * Only actual media items are
       * gallery items.
       *
       * The case study is NOT included.
       */
      const getItems = () =>
        Array.from(track.querySelectorAll<HTMLElement>("[data-gallery-item]"));

      const getMaxX = () => Math.max(0, track.scrollWidth - window.innerWidth);

      /*
       * Find the media item closest
       * to the viewport center.
       */
      const updateActiveIndex = () => {
        const items = getItems();

        if (!items.length) return;

        const viewportCenter = window.innerWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        items.forEach((item, index) => {
          const rect = item.getBoundingClientRect();

          const itemCenter = rect.left + rect.width / 2;

          const distance = Math.abs(itemCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;

            closestIndex = index;
          }
        });

        /*
         * Don't set React state on
         * every GSAP ticker frame.
         */
        if (closestIndex !== activeIndexRef.current) {
          activeIndexRef.current = closestIndex;

          setActiveIndex(closestIndex);
        }
      };

      /*
       * Subtle image movement based
       * on distance from center.
       */
      const updateItems = () => {
        const items = getItems();

        const viewportCenter = window.innerWidth / 2;

        items.forEach((item) => {
          const rect = item.getBoundingClientRect();

          const itemCenter = rect.left + rect.width / 2;

          const distance = itemCenter - viewportCenter;

          const normalized = gsap.utils.clamp(
            -1,
            1,
            distance / (window.innerWidth * 0.72),
          );

          const distanceAmount = Math.abs(normalized);

          const scale = 1 - distanceAmount * 0.055;

          const opacity = 1 - distanceAmount * 0.35;

          const parallax = normalized * -18;

          const vertical = distanceAmount * 5;

          gsap.set(item, {
            scale,
            opacity,
            x: parallax,
            y: vertical,
          });
        });
      };

      /*
       * Smooth horizontal movement.
       */
      const updatePosition = () => {
        if (!introFinished.current) {
          return;
        }

        currentX.current += (targetX.current - currentX.current) * 0.075;

        const maxX = getMaxX();

        currentX.current = gsap.utils.clamp(-maxX, 0, currentX.current);

        targetX.current = gsap.utils.clamp(-maxX, 0, targetX.current);

        gsap.set(track, {
          x: currentX.current,
        });

        updateItems();

        /*
         * THIS was missing.
         *
         * Update the image index
         * continuously while scrolling.
         */
        updateActiveIndex();
      };

      /*
       * Make absolutely sure this
       * project starts from the beginning.
       */
      gsap.set(track, {
        x: window.innerWidth,
      });

      gsap.set(header, {
        y: -15,
        opacity: 0,
      });

      gsap.set(title, {
        yPercent: 100,
        opacity: 0,
      });

      gsap.set(description, {
        y: 15,
        opacity: 0,
      });

      gsap.set(meta, {
        y: 12,
        opacity: 0,
      });

      /*
       * INTRO ANIMATION
       */
      const introTl = gsap.timeline();

      introTl.to(track, {
        x: 0,
        duration: 1.25,
        ease: "power4.out",

        onComplete: () => {
          introFinished.current = true;

          currentX.current = 0;

          targetX.current = pendingMovement.current;

          const maxX = getMaxX();

          targetX.current = gsap.utils.clamp(-maxX, 0, targetX.current);

          updateItems();
          updateActiveIndex();
        },
      });

      introTl
        .to(
          header,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .to(
          title,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power4.out",
          },
          "-=0.35",
        )
        .to(
          description,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .to(
          meta,
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.3",
        );

      requestAnimationFrame(() => {
        introTl.play();
      });

      /*
       * HORIZONTAL INPUT
       */
      const observer = Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        preventDefault: true,
        wheelSpeed: -1,
        tolerance: 1,

        onChange: (self) => {
          const movement =
            Math.abs(self.deltaX) > Math.abs(self.deltaY)
              ? self.deltaX
              : self.deltaY;

          const sensitivity = window.innerWidth < 768 ? 2.2 : 0.85;

          const delta = movement * sensitivity;

          /*
           * Allow the user to start
           * scrolling during the intro.
           */
          if (!introFinished.current) {
            pendingMovement.current += delta;

            return;
          }

          targetX.current += delta;

          const maxX = getMaxX();

          targetX.current = gsap.utils.clamp(-maxX, 0, targetX.current);
        },
      });

      /*
       * GSAP ticker
       */
      const ticker = () => {
        updatePosition();
      };

      gsap.ticker.add(ticker);

      /*
       * Resize
       */
      const handleResize = () => {
        if (!introFinished.current) {
          return;
        }

        const maxX = getMaxX();

        currentX.current = gsap.utils.clamp(-maxX, 0, currentX.current);

        targetX.current = currentX.current;

        updateItems();
        updateActiveIndex();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        observer.kill();

        gsap.ticker.remove(ticker);

        window.removeEventListener("resize", handleResize);

        introTl.kill();
      };
    }, page);

    return () => {
      ctx.revert();
    };
  }, [slug, project]);

  /*
   * Invalid project
   */
  if (!project) {
    return (
      <main
        className="
          h-screen
          w-screen
          bg-[#0A0A0A]
          text-white
          flex
          items-center
          justify-center
        "
      >
        <Link
          to="/#work"
          className="
            font-body
            text-sm
            underline
            underline-offset-4
          "
        >
          Back to work
        </Link>
      </main>
    );
  }

  const projectSlugs = Object.keys(projects);

  const currentIndex = projectSlugs.indexOf(slug ?? "");

  const nextSlug = projectSlugs[(currentIndex + 1) % projectSlugs.length];

  const nextProject = projects[nextSlug];

  const galleryMedia = project.media;

  return (
    <main
      ref={pageRef}
      className="
        project-page
        relative
        isolate
        w-screen
        h-screen
        overflow-hidden
        bg-[#0A0A0A]
        text-white
        noise
      "
    >
      {/* HEADER */}

      <header
        data-project-header
        className="
    absolute
    top-0
    left-0
    right-0
    z-50
    px-6
    md:px-10
    lg:px-16
    py-5
    md:py-7
    flex
    justify-between
    items-center
  "
      >
        <Link
          to="/"
          className="
      font-hegarty
      text-xl
      md:text-2xl
      tracking-wider
    "
        >
          JEET MADHVANI
        </Link>

        <button
          onClick={() => window.history.back()}
          className="
      font-body
      text-xs
      tracking-widest
      uppercase
      text-white/50
      hover:text-white
      transition-colors
      cursor-pointer
    "
        >
          ← Back
        </button>
      </header>

      {/* HORIZONTAL CONTENT */}

      <div
        className="
          absolute
          inset-0
          z-10
          overflow-hidden
        "
      >
        <div
          ref={trackRef}
          className="
            absolute
            left-0
            top-0
            h-full
            flex
            items-center
            gap-[7vw]
            px-[9vw]
            md:px-[10vw]
            lg:px-[12vw]
            w-max
            will-change-transform
          "
        >
          {/* MEDIA */}

          {galleryMedia.map((item, index) => (
            <div
              key={`${item.src}-${index}`}
              data-gallery-item
              className="
                  relative
                  shrink-0
                  w-[82vw]
                  md:w-[65vw]
                  lg:w-[55vw]
                  max-w-[1000px]
                  will-change-transform
                "
            >
              <div
                className="
                    w-full
                    aspect-video
                    overflow-hidden
                    bg-white/[0.03]
                  "
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={item.alt ?? `${project.name} screenshot`}
                    draggable={false}
                    className="
                        block
                        w-full
                        h-full
                        object-contain
                        select-none
                      "
                  />
                ) : (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="
                        block
                        w-full
                        h-full
                        object-contain
                      "
                  />
                )}
              </div>

              <div
                className="
                    flex
                    justify-between
                    mt-3
                  "
              >
                <span
                  className="
                      font-body
                      text-[10px]
                      tracking-widest
                      uppercase
                      text-white/30
                    "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className="
                      font-body
                      text-[10px]
                      tracking-widest
                      uppercase
                      text-white/30
                    "
                >
                  {item.type}
                </span>
              </div>
            </div>
          ))}

          {/* CASE STUDY */}

          <div
            data-case-study
            className="
              relative
              shrink-0
              w-[82vw]
              md:w-[65vw]
              lg:w-[55vw]
              max-w-[1000px]
              h-[70vh]
              flex
              items-center
            "
          >
            <div
              className="
                w-full
                border-t
                border-white/20
                pt-6
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-10
                "
              >
                <div>
                  <span
                    className="
                      font-body
                      text-[10px]
                      tracking-widest
                      uppercase
                      text-white/30
                    "
                  >
                    Case Study
                  </span>

                  <div className="mt-8">
                    <span
                      className="
                        font-body
                        text-[10px]
                        tracking-widest
                        uppercase
                        text-white/30
                      "
                    >
                      {project.number}
                    </span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <span
                      className="
                        block
                        font-body
                        text-[10px]
                        tracking-widest
                        uppercase
                        text-white/30
                        mb-3
                      "
                    >
                      The problem
                    </span>

                    <p
                      className="
                        font-body
                        text-sm
                        md:text-base
                        leading-relaxed
                        text-white/60
                      "
                    >
                      {project.caseStudy.problem}
                    </p>
                  </div>

                  <div>
                    <span
                      className="
                        block
                        font-body
                        text-[10px]
                        tracking-widest
                        uppercase
                        text-white/30
                        mb-3
                      "
                    >
                      The approach
                    </span>

                    <p
                      className="
                        font-body
                        text-sm
                        md:text-base
                        leading-relaxed
                        text-white/60
                      "
                    >
                      {project.caseStudy.approach}
                    </p>
                  </div>

                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-8
                    "
                  >
                    <div>
                      <span
                        className="
                          block
                          font-body
                          text-[10px]
                          tracking-widest
                          uppercase
                          text-white/30
                          mb-3
                        "
                      >
                        My role
                      </span>

                      <p
                        className="
                          font-body
                          text-sm
                          text-white/60
                        "
                      >
                        {project.caseStudy.role}
                      </p>
                    </div>

                    <div>
                      <span
                        className="
                          block
                          font-body
                          text-[10px]
                          tracking-widest
                          uppercase
                          text-white/30
                          mb-3
                        "
                      >
                        Stack
                      </span>

                      <p
                        className="
                          font-body
                          text-sm
                          text-white/60
                        "
                      >
                        {project.stack}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM INFORMATION */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-40
          px-6
          md:px-10
          lg:px-16
          pb-5
          md:pb-8
          pointer-events-none
        "
      >
        {/* DESKTOP */}

        <div
          className="
            border-t
            border-white/20
            pt-4
            hidden
            md:grid
            md:grid-cols-4
            gap-6
            items-end
          "
        >
          <div>
            <span
              data-project-meta
              className="
                block
                font-body
                text-[10px]
                tracking-widest
                uppercase
                text-white/30
                mb-2
              "
            >
              {project.number}
            </span>

            <h1
              data-project-title
              className="
                font-hegarty
                text-4xl
                md:text-5xl
                lg:text-6xl
                leading-none
                uppercase
              "
            >
              {project.name}
            </h1>
          </div>

          <div className="col-span-2">
            <span
              data-project-meta
              className="
                block
                font-body
                text-[10px]
                tracking-widest
                uppercase
                text-white/30
                mb-2
              "
            >
              About
            </span>

            <p
              data-project-description
              className="
                font-body
                text-sm
                leading-relaxed
                text-white/60
                max-w-lg
              "
            >
              {project.description}
            </p>
          </div>

          <div className="text-right">
            <span
              data-project-meta
              className="
                block
                font-body
                text-[10px]
                tracking-widest
                uppercase
                text-white/30
                mb-2
              "
            >
              Stack
            </span>

            <span
              data-project-meta
              className="
                font-body
                text-xs
                text-white/60
              "
            >
              {project.stack}
            </span>

            <span
              data-project-meta
              className="
                block
                font-body
                text-xs
                text-white/40
                mt-1
              "
            >
              {project.year}
            </span>
          </div>
        </div>

        {/* MOBILE */}

        <div
          className="
            md:hidden
            border-t
            border-white/20
            pt-4
          "
        >
          <div className="flex justify-between items-start">
            <div>
              <span
                data-project-meta
                className="
                  block
                  font-body
                  text-[10px]
                  tracking-widest
                  uppercase
                  text-white/30
                  mb-2
                "
              >
                {project.number}
              </span>

              <h1
                data-project-title
                className="
                  font-hegarty
                  text-4xl
                  leading-none
                  uppercase
                "
              >
                {project.name}
              </h1>
            </div>

            <div className="text-right">
              <span
                data-project-meta
                className="
                  block
                  font-body
                  text-[10px]
                  tracking-widest
                  uppercase
                  text-white/30
                  mb-2
                "
              >
                Stack
              </span>

              <span
                data-project-meta
                className="
                  block
                  font-body
                  text-[11px]
                  text-white/60
                  max-w-[150px]
                "
              >
                {project.stack}
              </span>

              <span
                data-project-meta
                className="
                  block
                  font-body
                  text-[11px]
                  text-white/40
                  mt-1
                "
              >
                {project.year}
              </span>
            </div>
          </div>

          <p
            data-project-description
            className="
              font-body
              text-xs
              leading-relaxed
              text-white/50
              mt-5
              max-w-[90vw]
            "
          >
            {project.description}
          </p>
        </div>

        {/* NAVIGATION */}

        <div
          className="
            flex
            items-center
            justify-between
            mt-4
            md:mt-5
          "
        >
          <span
            className="
              font-body
              text-[10px]
              tracking-widest
              uppercase
              text-white/30
            "
          >
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(galleryMedia.length).padStart(2, "0")}
          </span>

          <Link
            to={`/work/${nextSlug}`}
            className="
              pointer-events-auto
              group
              flex
              items-center
              gap-3
              font-body
              text-xs
              tracking-widest
              uppercase
              text-white/60
              hover:text-white
              transition-colors
            "
          >
            <span>Next project</span>

            <span
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>

            <span className="text-white">{nextProject.name}</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
