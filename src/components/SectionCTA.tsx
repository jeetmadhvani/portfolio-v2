import { useState } from "react";
import DecryptedText from "./DecryptedText";

interface SectionCTAProps {
  text: string;
  href?: string;
  targetBlank?: boolean;
  className?: string;
}

const SectionCTA = ({
  text,
  href,
  targetBlank = false,
}: SectionCTAProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <a
      href={href}
      target={targetBlank ? "_blank" : undefined}
      rel={targetBlank ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="
        group
        relative
        overflow-hidden
        border-y
        border-white/30
        text-2xl
        opacity-60
        py-4
        px-4
        cursor-pointer
        flex
        justify-between
        pointer-events-auto
        transition-[padding,color,opacity]
        duration-300
        ease-out
        hover:px-8
        hover:text-black
        hover:opacity-80
      "
    >
      {/* Bottom-up hover fill */}
      <span
        className="
          absolute
          inset-x-0
          bottom-0
          h-0
          bg-[#999999]
          transition-[height]
          duration-300
          ease-out
          group-hover:h-full
        "
      />

      {/* CTA text */}
      <span className="relative z-10">
        <DecryptedText
          text={text}
          animateOn="click"
          isActive={isHover}
          sequential
          speed={20}
        />
      </span>

      {/* Arrow */}
      <span className="relative z-10">
        <DecryptedText
          text="↗"
          animateOn="click"
          isActive={isHover}
          sequential
          speed={20}
        />
      </span>
    </a>
  );
};

export default SectionCTA;