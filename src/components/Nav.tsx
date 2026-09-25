import { useState } from "react";
import DecryptedText from "./DecryptedText";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleMobileNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();

    setMenuOpen(false);

    requestAnimationFrame(() => {
      navigateWithTransition(id);
    });
  };

  return (
    <>
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

        <div className="font-body hidden md:flex gap-7">
          <a
            href="#work"
            data-nav-line
            onClick={(e) =>
              handleNavClick(e, "#work")
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
              text="work"
              animateOn="hover"
              clickMode="once"
            />
          </a>

          <a
            href="#about"
            data-nav-line
            onClick={(e) =>
              handleNavClick(e, "#about")
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
              text="about"
              animateOn="hover"
              clickMode="once"
            />
          </a>

          <a
            href="#contact"
            data-nav-line
            onClick={(e) =>
              handleNavClick(e, "#contact")
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
              text="contact"
              animateOn="hover"
              clickMode="once"
            />
          </a>
        </div>

        <button
          data-nav-line
          className="
            font-body
            text-sm
            tracking-widest
            uppercase
            md:hidden
            pointer-events-auto
          "
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </div>

      {menuOpen && (
        <div
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
            gap-8
            pointer-events-auto
          "
        >
          <button
            className="
              absolute
              top-6
              right-6
              font-body
              text-sm
              tracking-widest
              uppercase
            "
            onClick={() => setMenuOpen(false)}
          >
            CLOSE
          </button>

          <a
            href="#work"
            className="font-hegarty text-6xl text-white"
            onClick={(e) =>
              handleMobileNavClick(e, "#work")
            }
          >
            Work
          </a>

          <a
            href="#about"
            className="font-hegarty text-6xl text-white"
            onClick={(e) =>
              handleMobileNavClick(e, "#about")
            }
          >
            About
          </a>

          <a
            href="#contact"
            className="font-hegarty text-6xl text-white"
            onClick={(e) =>
              handleMobileNavClick(e, "#contact")
            }
          >
            Contact
          </a>
        </div>
      )}
    </>
  );
};

export default Nav;