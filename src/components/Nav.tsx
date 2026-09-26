import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import DecryptedText from "./DecryptedText";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);

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

  // Mobile menu animation
  useEffect(() => {
    const menu = menuRef.current;

    if (!menu) return;

    const items = menuItemsRef.current.filter(Boolean);
    const close = closeRef.current;

    if (menuOpen) {
      gsap.killTweensOf([menu, ...items, close]);

      gsap.set(menu, {
        pointerEvents: "auto",
        clipPath: "inset(0% 0% 0% 0%)",
      });

      gsap.set(items, {
        opacity: 0,
        y: 30,
      });

      gsap.set(close, {
        opacity: 0,
        y: -10,
      });

      const tl = gsap.timeline();

      tl.to(
        close,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        },
        0.1,
      );

      tl.to(
        items,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
        },
        0.15,
      );
    } else {
      gsap.killTweensOf([menu, ...items, close]);

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(menu, {
            pointerEvents: "none",
            clipPath: "inset(0% 0% 100% 0%)",
          });

          const target = pendingNavigation.current;

          if (target) {
            pendingNavigation.current = null;
            navigateWithTransition(target);
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
        close,
        {
          opacity: 0,
          y: -10,
          duration: 0.25,
          ease: "power2.in",
        },
        0,
      );

      tl.to(
        menu,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.5,
          ease: "power4.inOut",
        },
        0.08,
      );
    }
  }, [menuOpen]);

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
      {/* NAV */}
      <div className="flex justify-between items-center z-10 pointer-events-auto">
        <span
          data-nav-line
          className="
            inline-block
            font-hegarty
            text-xl
            lg:text-2xl
            tracking-wider
          "
        >
          JEET MADHVANI
        </span>

        {/* DESKTOP NAV */}
        <div className="font-body hidden md:flex gap-7">
          <a
            href="#work"
            data-nav-line
            onClick={(e) => handleNavClick(e, "#work")}
            className="
              inline-block
              hover:scale-[1.04]
              transition-transform
              duration-200
              ease-out
            "
          >
            <DecryptedText text="work" animateOn="hover" clickMode="once" />
          </a>

          <a
            href="#about"
            data-nav-line
            onClick={(e) => handleNavClick(e, "#about")}
            className="
              inline-block
              hover:scale-[1.04]
              transition-transform
              duration-200
              ease-out
            "
          >
            <DecryptedText text="about" animateOn="hover" clickMode="once" />
          </a>

          <a
            href="#contact"
            data-nav-line
            onClick={(e) => handleNavClick(e, "#contact")}
            className="
              inline-block
              hover:scale-[1.04]
              transition-transform
              duration-200
              ease-out
            "
          >
            <DecryptedText text="contact" animateOn="hover" clickMode="once" />
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          data-nav-line
          className="
            font-body
            text-sm
            tracking-widest
            lowercase
            md:hidden
            pointer-events-auto
          "
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          MENU
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className="
          md:hidden
          fixed
          inset-0
          z-50
          bg-[#500000]
          flex
          flex-col
          justify-center
          px-8
          gap-4
          pointer-events-none
        "
        style={{
          clipPath: "inset(0% 0% 100% 0%)",
        }}
      >
        {/* CLOSE */}
        <button
          ref={closeRef}
          className="
            absolute
            top-4
            right-8
            font-body
            text-3xl
            font-light
            leading-none
            pointer-events-auto
          "
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          ×
        </button>

        {/* WORK */}
        <a
          ref={(el) => {
            menuItemsRef.current[0] = el;
          }}
          href="#work"
          className="
  font-hegarty
  text-5xl
  sm:text-5xl
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
          onClick={(e) => handleMobileNavClick(e, "#work")}
        >
          Work
        </a>

        {/* ABOUT */}
        <a
          ref={(el) => {
            menuItemsRef.current[1] = el;
          }}
          href="#about"
          className="
  font-hegarty
  text-5xl
  sm:text-5xl
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
          onClick={(e) => handleMobileNavClick(e, "#about")}
        >
          About
        </a>

        {/* CONTACT */}
        <a
          ref={(el) => {
            menuItemsRef.current[2] = el;
          }}
          href="#contact"
          className="
  font-hegarty
  text-5xl
  sm:text-5xl
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
          onClick={(e) => handleMobileNavClick(e, "#contact")}
        >
          Contact
        </a>
      </div>
    </>
  );
};

export default Nav;
