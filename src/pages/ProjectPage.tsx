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

  const mobileNextNavigation = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  /*
   * PROJECT PAGE THEME COLOR
   */

  useEffect(() => {
    const meta = document.querySelector(
      'meta[name="theme-color"]',
    );

    if (meta) {
      meta.setAttribute("content", "#0A0A0A");
    }

    return () => {
      if (meta) {
        meta.setAttribute("content", "#500000");
      }
    };
  }, []);

  /*
   * MOBILE NEXT PROJECT SCROLL
   *
   * The mobile page itself is the
   * scroll container, not window.
   */

  useEffect(() => {
    if (!mobileNextNavigation.current) return;

    if (window.innerWidth >= 768) {
      mobileNextNavigation.current = false;
      return;
    }

    const page = pageRef.current;

    if (!page) return;

    requestAnimationFrame(() => {
      gsap.to(page, {
        scrollTop: 0,
        duration: 0.8,
        ease: "power3.out",
        overwrite: true,
        onComplete: () => {
          mobileNextNavigation.current = false;
        },
      });
    });
  }, [slug]);

  /*
   * RESET WHEN PROJECT CHANGES
   */

  useEffect(() => {
    targetX.current = 0;
    currentX.current = 0;
    pendingMovement.current = 0;
    introFinished.current = false;
    activeIndexRef.current = 0;

    setActiveIndex(0);
  }, [slug]);

  /*
   * PROJECT ANIMATION
   *
   * Desktop only.
   */

  useEffect(() => {
    if (!project) return;

    if (window.innerWidth < 768) return;

    const page = pageRef.current;
    const track = trackRef.current;

    if (!page || !track) return;

    const ctx = gsap.context(() => {
      const header = page.querySelector(
        "[data-project-header]",
      );

      const title = page.querySelector(
        "[data-project-title]",
      );

      const description = page.querySelector(
        "[data-project-description]",
      );

      const meta = page.querySelectorAll(
        "[data-project-meta]",
      );

      /*
       * Only actual gallery items count
       * toward the image index.
       */

      const getItems = () =>
        Array.from(
          track.querySelectorAll<HTMLElement>(
            "[data-gallery-item]",
          ),
        );

      const getMaxX = () =>
        Math.max(
          0,
          track.scrollWidth - window.innerWidth,
        );

      /*
       * Find gallery item closest
       * to viewport center.
       */

      const updateActiveIndex = () => {
        const items = getItems();

        if (!items.length) return;

        const viewportCenter =
          window.innerWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        items.forEach((item, index) => {
          const rect =
            item.getBoundingClientRect();

          const itemCenter =
            rect.left + rect.width / 2;

          const distance = Math.abs(
            itemCenter - viewportCenter,
          );

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        if (
          closestIndex !==
          activeIndexRef.current
        ) {
          activeIndexRef.current =
            closestIndex;

          setActiveIndex(closestIndex);
        }
      };

      /*
       * Subtle image movement based
       * on distance from center.
       */

      const updateItems = () => {
        const items = getItems();

        const viewportCenter =
          window.innerWidth / 2;

        items.forEach((item) => {
          const rect =
            item.getBoundingClientRect();

          const itemCenter =
            rect.left + rect.width / 2;

          const distance =
            itemCenter - viewportCenter;

          const normalized =
            gsap.utils.clamp(
              -1,
              1,
              distance /
                (window.innerWidth * 0.72),
            );

          const distanceAmount =
            Math.abs(normalized);

          const scale =
            1 - distanceAmount * 0.055;

          const opacity =
            1 - distanceAmount * 0.35;

          const parallax =
            normalized * -18;

          const vertical =
            distanceAmount * 5;

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

        currentX.current +=
          (targetX.current -
            currentX.current) *
          0.075;

        const maxX = getMaxX();

        currentX.current =
          gsap.utils.clamp(
            -maxX,
            0,
            currentX.current,
          );

        targetX.current =
          gsap.utils.clamp(
            -maxX,
            0,
            targetX.current,
          );

        gsap.set(track, {
          x: currentX.current,
        });

        updateItems();
        updateActiveIndex();
      };

      /*
       * Start gallery off-screen.
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

          targetX.current =
            pendingMovement.current;

          const maxX = getMaxX();

          targetX.current =
            gsap.utils.clamp(
              -maxX,
              0,
              targetX.current,
            );

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
            Math.abs(self.deltaX) >
            Math.abs(self.deltaY)
              ? self.deltaX
              : self.deltaY;

          const delta =
            movement * 0.85;

          if (!introFinished.current) {
            pendingMovement.current +=
              delta;

            return;
          }

          targetX.current += delta;

          const maxX = getMaxX();

          targetX.current =
            gsap.utils.clamp(
              -maxX,
              0,
              targetX.current,
            );
        },
      });

      /*
       * GSAP TICKER
       */

      const ticker = () => {
        updatePosition();
      };

      gsap.ticker.add(ticker);

      /*
       * RESIZE
       */

      const handleResize = () => {
        if (!introFinished.current) {
          return;
        }

        const maxX = getMaxX();

        currentX.current =
          gsap.utils.clamp(
            -maxX,
            0,
            currentX.current,
          );

        targetX.current =
          currentX.current;

        updateItems();
        updateActiveIndex();
      };

      window.addEventListener(
        "resize",
        handleResize,
      );

      return () => {
        observer.kill();

        gsap.ticker.remove(ticker);

        window.removeEventListener(
          "resize",
          handleResize,
        );

        introTl.kill();
      };
    }, page);

    return () => {
      ctx.revert();
    };
  }, [slug, project]);

  /*
   * MOBILE IMAGE INDEX
   */

  useEffect(() => {
    if (!project) return;

    if (window.innerWidth >= 768) return;

    const items =
      document.querySelectorAll<HTMLElement>(
        "[data-mobile-gallery-item]",
      );

    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(
            entry.target.getAttribute(
              "data-mobile-index",
            ),
          );

          if (!Number.isNaN(index)) {
            setActiveIndex(index);
          }
        });
      },
      {
        root: null,
        threshold: 0.6,
      },
    );

    items.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, [slug, project]);

  /*
   * INVALID PROJECT
   */

  if (!project) {
    return (
      <main
        className="
          min-h-[100dvh]
          w-screen
          bg-[#0A0A0A]
          text-white
          flex
          items-center
          justify-center
        "
      >
        <button
          onClick={() => {
            window.location.href =
              "/#work";
          }}
          className="
            font-body
            text-sm
            underline
            underline-offset-4
            cursor-pointer
          "
        >
          Back to work
        </button>
      </main>
    );
  }

  const projectSlugs =
    Object.keys(projects);

  const currentIndex =
    projectSlugs.indexOf(slug ?? "");

  const nextSlug =
    projectSlugs[
      (currentIndex + 1) %
        projectSlugs.length
    ];

  const nextProject =
    projects[nextSlug];

  const galleryMedia =
    project.media;

  /*
   * BACK TO WORK
   */

  const handleBackToWork = () => {
    sessionStorage.setItem(
      "portfolio-scroll-target",
      "work",
    );
  };

  /*
   * NEXT PROJECT
   */

  const handleNextProject = () => {
    if (window.innerWidth < 768) {
      mobileNextNavigation.current = true;
    }
  };

  return (
    <main
      ref={pageRef}
      className="
        project-page
        relative
        isolate
        w-screen
        h-[100dvh]
        md:h-[100dvh]
        overflow-x-hidden
        overflow-y-auto
        md:overflow-hidden
        overscroll-y-auto
        touch-pan-y
        bg-[#0A0A0A]
        text-white
        noise
      "
    >
      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

      <header
        data-project-header
        className="
          absolute
          top-0
          left-0
          right-0
          z-50
          pointer-events-auto
          px-5
          sm:px-6
          md:px-10
          lg:px-16
          py-5
          md:py-7
        "
      >
        <Link
          to="/"
          onClick={handleBackToWork}
          className="
            relative
            z-[100]
            font-body
            text-sm
            md:text-base
            tracking-widest
            text-white/50
            hover:text-white
            transition-colors
            pointer-events-auto
            cursor-pointer
            flex
            items-center
            gap-2
            md:gap-3
          "
        >
          <span>←</span>
          <span>Work</span>
        </Link>
      </header>

      {/* ================================================== */}
      {/* DESKTOP PROJECT */}
      {/* ================================================== */}

      <div
        className="
          hidden
          md:block
          absolute
          inset-0
          bottom-[85px]
          lg:bottom-[90px]
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
            gap-[clamp(36px,7vw,110px)]
            px-[clamp(60px,10vw,180px)]
            lg:px-[clamp(100px,12vw,190px)]
            w-max
            will-change-transform
          "
        >
          {/* MEDIA */}

          {galleryMedia.map(
            (item, index) => (
              <div
                key={`${item.src}-${index}`}
                data-gallery-item
                className="
                  relative
                  shrink-0
                  w-[clamp(500px,65vw,1000px)]
                  lg:w-[clamp(650px,55vw,1000px)]
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
                      alt={
                        item.alt ??
                        `${project.name} screenshot`
                      }
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
              </div>
            ),
          )}

          {/* CASE STUDY */}

          <div
            data-case-study
            className="
              relative
              shrink-0
              w-[clamp(500px,65vw,1000px)]
              lg:w-[clamp(650px,55vw,1000px)]
              min-h-full
              flex
              items-center
            "
          >
            <div
              className="
                w-full
                border-t
                border-white/20
                pt-[clamp(24px,2.5vw,40px)]
              "
            >
              {/* PROBLEM + APPROACH */}

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-[clamp(32px,4vw,64px)]
                "
              >
                {/* PROBLEM */}

                <div>
                  <span
                    className="
                      block
                      font-body
                      text-[10px]
                      tracking-widest
                      uppercase
                      text-white/30
                      mb-[clamp(16px,1.5vw,24px)]
                    "
                  >
                    The problem
                  </span>

                  <p
                    className="
                      font-body
                      text-[clamp(14px,1.25vw,18px)]
                      leading-relaxed
                      text-white/70
                      max-w-xl
                    "
                  >
                    {project.caseStudy.problem}
                  </p>
                </div>

                {/* APPROACH */}

                <div>
                  <span
                    className="
                      block
                      font-body
                      text-[10px]
                      tracking-widest
                      uppercase
                      text-white/30
                      mb-[clamp(16px,1.5vw,24px)]
                    "
                  >
                    The approach
                  </span>

                  <p
                    className="
                      font-body
                      text-[clamp(14px,1.25vw,18px)]
                      leading-relaxed
                      text-white/70
                      max-w-xl
                    "
                  >
                    {project.caseStudy.approach}
                  </p>
                </div>
              </div>

              {/* ROLE + STACK */}

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-[clamp(28px,4vw,64px)]
                  mt-[clamp(36px,4vw,64px)]
                  pt-[clamp(20px,1.5vw,24px)]
                  border-t
                  border-white/10
                "
              >
                {/* ROLE */}

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
                      text-[clamp(13px,1.1vw,16px)]
                      leading-relaxed
                      text-white/60
                      max-w-md
                    "
                  >
                    {project.caseStudy.role}
                  </p>
                </div>

                {/* STACK */}

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
                      text-[clamp(13px,1.1vw,16px)]
                      leading-relaxed
                      text-white/60
                      max-w-md
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

      {/* ================================================== */}
      {/* MOBILE PROJECT */}
      {/* ================================================== */}

      <div
        className="
          md:hidden
          pt-[clamp(88px,24vw,110px)]
          px-[clamp(20px,5vw,28px)]
          pb-8
        "
      >
        {/* MOBILE PROJECT INFO */}

        <div
          className="
            border-t
            border-white/20
            pt-5
          "
        >
          {/* PROJECT NUMBER */}

          <span
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

          {/* PROJECT NAME */}

          <h1
            className="
              font-hegarty
              text-[clamp(48px,16vw,78px)]
              leading-[0.85]
              uppercase
              break-words
            "
          >
            {project.name}
          </h1>

          {/* CATEGORY + YEAR */}

          <div
            className="
              mt-6
              flex
              items-end
              justify-between
              gap-6
            "
          >
            <div>
              <span
                className="
                  block
                  font-body
                  text-[9px]
                  tracking-widest
                  uppercase
                  text-white/30
                  mb-2
                "
              >
                Category
              </span>

              <span
                className="
                  block
                  font-body
                  text-[clamp(12px,3.5vw,14px)]
                  text-white/60
                "
              >
                {project.category}
              </span>
            </div>

            <span
              className="
                font-body
                text-[clamp(12px,3.5vw,14px)]
                text-white/40
              "
            >
              {project.year}
            </span>
          </div>

          {/* DESCRIPTION */}

          <p
            className="
              font-body
              text-[clamp(13px,3.8vw,15px)]
              leading-relaxed
              text-white/60
              mt-6
              max-w-xl
            "
          >
            {project.description}
          </p>
        </div>

        {/* MOBILE GALLERY */}

        <div
          className="
            mt-10
            space-y-8
          "
        >
          {galleryMedia.map(
            (item, index) => (
              <div
                key={`${item.src}-mobile-${index}`}
                data-mobile-gallery-item
                data-mobile-index={index}
                className="w-full"
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
                      alt={
                        item.alt ??
                        `${project.name} screenshot`
                      }
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

                <span
                  className="
                    block
                    font-body
                    text-[9px]
                    tracking-widest
                    uppercase
                    text-white/25
                    mt-2
                  "
                >
                  {String(index + 1).padStart(
                    2,
                    "0",
                  )}{" "}
                  /{" "}
                  {String(
                    galleryMedia.length,
                  ).padStart(2, "0")}
                </span>
              </div>
            ),
          )}
        </div>

        {/* MOBILE CASE STUDY */}

        <div
          className="
            mt-16
            border-t
            border-white/20
            pt-8
          "
        >
          {/* PROBLEM */}

          <div>
            <span
              className="
                block
                font-body
                text-[10px]
                tracking-widest
                uppercase
                text-white/30
                mb-4
              "
            >
              The problem
            </span>

            <p
              className="
                font-body
                text-[clamp(14px,4vw,16px)]
                leading-relaxed
                text-white/70
              "
            >
              {project.caseStudy.problem}
            </p>
          </div>

          {/* APPROACH */}

          <div className="mt-12">
            <span
              className="
                block
                font-body
                text-[10px]
                tracking-widest
                uppercase
                text-white/30
                mb-4
              "
            >
              The approach
            </span>

            <p
              className="
                font-body
                text-[clamp(14px,4vw,16px)]
                leading-relaxed
                text-white/70
              "
            >
              {project.caseStudy.approach}
            </p>
          </div>

          {/* ROLE + STACK */}

          <div
            className="
              mt-12
              pt-6
              border-t
              border-white/10
              grid
              grid-cols-1
              gap-8
            "
          >
            {/* ROLE */}

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
                  text-[clamp(13px,3.8vw,15px)]
                  leading-relaxed
                  text-white/60
                "
              >
                {project.caseStudy.role}
              </p>
            </div>

            {/* STACK */}

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
                  text-[clamp(13px,3.8vw,15px)]
                  leading-relaxed
                  text-white/60
                "
              >
                {project.stack}
              </p>
            </div>
          </div>
        </div>

        {/* MOBILE NEXT PROJECT */}

        <div
          className="
            mt-16
            pt-5
            border-t
            border-white/20
            flex
            items-center
            justify-end
            gap-4
          "
        >
          {/* NEXT */}

          <Link
            to={`/work/${nextSlug}`}
            onClick={handleNextProject}
            className="
              pointer-events-auto
              group
              flex
              items-center
              gap-2
              font-body
              text-[clamp(12px,3.8vw,15px)]
              tracking-widest
              text-white/60
              hover:text-white
              transition-colors
              min-w-0
            "
          >
            <span className="hidden sm:inline">
              Next project
            </span>

            <span
              className="
                text-[clamp(16px,5vw,20px)]
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>

            <span className="text-white truncate">
              {nextProject.name}
            </span>
          </Link>
        </div>
      </div>

      {/* ================================================== */}
      {/* DESKTOP BOTTOM INFORMATION */}
      {/* ================================================== */}

      <div
        className="
          hidden
          md:block
          absolute
          bottom-0
          left-0
          right-0
          z-40
          px-[clamp(24px,4vw,64px)]
          pb-[clamp(20px,2vw,28px)]
          pointer-events-none
        "
      >
        {/* PROJECT INFO */}

        <div
          className="
            border-t
            border-white/20
            pt-4
            grid
            grid-cols-[minmax(0,1.2fr)_minmax(0,1.9fr)_minmax(120px,0.9fr)]
            gap-[clamp(24px,3vw,48px)]
            items-start
          "
        >
          {/* PROJECT */}

          <div className="min-w-0 overflow-hidden">
            <span
              data-project-meta
              className="
                block
                font-body
                text-[10px]
                md:text-[11px]
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
                text-[clamp(38px,4.8vw,76px)]
                leading-[0.9]
                uppercase
                whitespace-nowrap
              "
            >
              {project.name}
            </h1>
          </div>

          {/* ABOUT */}

          <div className="min-w-0">
            <span
              data-project-meta
              className="
                block
                font-body
                text-[10px]
                md:text-[11px]
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
                text-[clamp(13px,1.15vw,16px)]
                leading-relaxed
                text-white/60
                max-w-2xl
              "
            >
              {project.description}
            </p>
          </div>

          {/* CATEGORY */}

          <div className="min-w-0">
            <span
              data-project-meta
              className="
                block
                font-body
                text-[10px]
                md:text-[11px]
                tracking-widest
                uppercase
                text-white/30
                mb-2
              "
            >
              Category
            </span>

            <span
              data-project-meta
              className="
                block
                font-body
                text-[clamp(12px,1vw,14px)]
                text-white/60
                break-words
              "
            >
              {project.category}
            </span>

            <span
              data-project-meta
              className="
                block
                font-body
                text-[clamp(12px,1vw,14px)]
                text-white/40
                mt-1
              "
            >
              {project.year}
            </span>
          </div>
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
          {/* IMAGE INDEX */}

          <span
            className="
              font-body
              text-[9px]
              md:text-[10px]
              tracking-widest
              uppercase
              text-white/30
            "
          >
            {String(
              activeIndex + 1,
            ).padStart(2, "0")}{" "}
            /{" "}
            {String(
              galleryMedia.length,
            ).padStart(2, "0")}
          </span>

          {/* NEXT PROJECT */}

          <Link
            to={`/work/${nextSlug}`}
            className="
              pointer-events-auto
              group
              flex
              items-center
              gap-[clamp(8px,1vw,14px)]
              font-body
              text-[clamp(13px,1.25vw,16px)]
              tracking-widest
              text-white/60
              hover:text-white
              transition-colors
              min-w-0
            "
          >
            <span>
              Next project
            </span>

            <span
              className="
                text-[clamp(18px,1.6vw,22px)]
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>

            <span className="text-white truncate">
              {nextProject.name}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;