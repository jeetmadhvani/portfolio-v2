import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import DecryptedText from "./DecryptedText";
import { MenuToggle } from "./ui/menu-toggle";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>(
    [],
  );

  const pendingNavigation = useRef<string | null>(null);

  const navigateWithTransition = (id: string) => {
    window.dispatchEvent(
      new CustomEvent("portfolio-nav-transition", {
        detail: {
          id,
        },
      }),
    );
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();

    navigateWithTransition(id);
  };

  /*
   * LOCK PAGE SCROLL WHEN MOBILE MENU IS OPEN
   */

  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = window.scrollY;

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousHtmlOverscroll = html.style.overscrollBehavior;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;

    /*
     * Freeze the page at its current position.
     */

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.touchAction = "none";

    /*
     * Prevent mobile Safari / touch scrolling.
     */

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    const preventWheel = (e: WheelEvent) => {
      e.preventDefault();
    };

    document.addEventListener(
      "touchmove",
      preventScroll,
      { passive: false },
    );

    document.addEventListener(
      "wheel",
      preventWheel,
      { passive: false },
    );

    /*
     * Restore everything when menu closes.
     */

    return () => {
      document.removeEventListener(
        "touchmove",
        preventScroll,
      );

      document.removeEventListener(
        "wheel",
        preventWheel,
      );

      html.style.overflow =
        previousHtmlOverflow;

      html.style.overscrollBehavior =
        previousHtmlOverscroll;

      body.style.position =
        previousBodyPosition;

      body.style.top =
        previousBodyTop;

      body.style.width =
        previousBodyWidth;

      body.style.overflow =
        previousBodyOverflow;

      body.style.touchAction =
        previousBodyTouchAction;

      window.scrollTo({
        top: scrollY,
        left: 0,
        behavior: "auto",
      });
    };
  }, [menuOpen]);

  /*
   * MOBILE MENU ANIMATION
   */

  useEffect(() => {
    const menu = menuRef.current;

    if (!menu) return;

    const items =
      menuItemsRef.current.filter(Boolean);

    if (menuOpen) {
      gsap.killTweensOf([
        menu,
        ...items,
      ]);

      gsap.set(menu, {
        pointerEvents: "auto",
        clipPath:
          "inset(0% 0% 0% 0%)",
      });

      gsap.set(items, {
        opacity: 0,
        y: 30,
      });

      const tl = gsap.timeline();

      tl.to(
        items,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
        },
        0.12,
      );
    } else {
      gsap.killTweensOf([
        menu,
        ...items,
      ]);

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(menu, {
            pointerEvents: "none",
            clipPath:
              "inset(0% 0% 100% 0%)",
          });

          const target =
            pendingNavigation.current;

          if (target) {
            pendingNavigation.current =
              null;

            navigateWithTransition(
              target,
            );
          }
        },
      });

      tl.to(
        items,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.in",
        },
        0,
      );

      tl.to(
        menu,
        {
          clipPath:
            "inset(0% 0% 100% 0%)",
          duration: 0.5,
          ease: "power4.inOut",
        },
        0.08,
      );
    }
  }, [menuOpen]);

  /*
   * MOBILE NAVIGATION
   */

  const handleMobileNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();

    pendingNavigation.current = id;

    setMenuOpen(false);
  };

  return (
    <>
      {/* ================================================== */}
      {/* NAV */}
      {/* ================================================== */}

      <div
        className="
          relative
          z-[100]
          flex
          justify-between
          items-center
          pointer-events-auto
        "
      >
        {/* LOGO */}

        <span
          data-nav-line
          className={`
            inline-block
            font-hegarty
            text-xl
            lg:text-2xl
            tracking-wider
            transition-opacity
            duration-300
            ${
              menuOpen
                ? "md:inline-block opacity-0 md:opacity-100"
                : "opacity-100"
            }
          `}
        >
          JEET MADHVANI
        </span>

        {/* ================================================== */}
        {/* DESKTOP NAV */}
        {/* ================================================== */}

        <div className="font-body hidden md:flex gap-7">
          <a
            href="#work"
            data-nav-line
            onClick={(e) =>
              handleNavClick(
                e,
                "#work",
              )
            }
            className="
              inline-block
              hover:scale-[1.04]
              transition-transform
              duration-200
              ease-out
            "
          >
            <DecryptedText
              text="Work"
              animateOn="hover"
              clickMode="once"
            />
          </a>

          <a
            href="#about"
            data-nav-line
            onClick={(e) =>
              handleNavClick(
                e,
                "#about",
              )
            }
            className="
              inline-block
              hover:scale-[1.04]
              transition-transform
              duration-200
              ease-out
            "
          >
            <DecryptedText
              text="About"
              animateOn="hover"
              clickMode="once"
            />
          </a>

          <a
            href="#contact"
            data-nav-line
            onClick={(e) =>
              handleNavClick(
                e,
                "#contact",
              )
            }
            className="
              inline-block
              hover:scale-[1.04]
              transition-transform
              duration-200
              ease-out
            "
          >
            <DecryptedText
              text="Contact"
              animateOn="hover"
              clickMode="once"
            />
          </a>
        </div>

        {/* ================================================== */}
        {/* MOBILE TOGGLE */}
        {/* ================================================== */}

        <div
          className="
            md:hidden
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            z-[110]
          "
        >
          <MenuToggle
            open={menuOpen}
            onOpenChange={setMenuOpen}
            className="size-8 text-white"
          />
        </div>
      </div>

      {/* ================================================== */}
      {/* MOBILE MENU OVERLAY */}
      {/* ================================================== */}

      <div
        ref={menuRef}
        className="
          md:hidden
          fixed
          inset-0
          z-[90]
          bg-[#500000]
          flex
          flex-col
          justify-center
          px-8
          gap-4
          pointer-events-none
          touch-none
          overscroll-none
        "
        style={{
          clipPath:
            "inset(0% 0% 100% 0%)",
        }}
      >
        {/* ================================================== */}
        {/* WORK */}
        {/* ================================================== */}

        <a
          ref={(el) => {
            menuItemsRef.current[0] = el;
          }}
          href="#work"
          className="
            relative
            z-10
            font-hegarty
            text-[clamp(52px,14vw,80px)]
            uppercase
            tracking-wide
            text-white
            leading-none
            w-fit
            hover:translate-x-2
            transition-transform
            duration-300
            ease-out
          "
          onClick={(e) =>
            handleMobileNavClick(
              e,
              "#work",
            )
          }
        >
          Work
        </a>

        {/* ================================================== */}
        {/* ABOUT */}
        {/* ================================================== */}

        <a
          ref={(el) => {
            menuItemsRef.current[1] = el;
          }}
          href="#about"
          className="
            relative
            z-10
            font-hegarty
            text-[clamp(52px,14vw,80px)]
            uppercase
            tracking-wide
            text-white
            leading-none
            w-fit
            hover:translate-x-2
            transition-transform
            duration-300
            ease-out
          "
          onClick={(e) =>
            handleMobileNavClick(
              e,
              "#about",
            )
          }
        >
          About
        </a>

        {/* ================================================== */}
        {/* CONTACT */}
        {/* ================================================== */}

        <a
          ref={(el) => {
            menuItemsRef.current[2] = el;
          }}
          href="#contact"
          className="
            relative
            z-10
            font-hegarty
            text-[clamp(52px,14vw,80px)]
            uppercase
            tracking-wide
            text-white
            leading-none
            w-fit
            hover:translate-x-2
            transition-transform
            duration-300
            ease-out
          "
          onClick={(e) =>
            handleMobileNavClick(
              e,
              "#contact",
            )
          }
        >
          Contact
        </a>
      </div>
    </>
  );
};

export default Nav;