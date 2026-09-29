type MenuToggleProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
};

export function MenuToggle({
  open,
  onOpenChange,
  className = "",
}: MenuToggleProps) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={() => onOpenChange(!open)}
      className={`relative flex h-8 w-8 cursor-pointer items-center justify-center ${className}`}
    >
      <span
        className={`
          absolute
          right-0
          h-[2px]
          rounded-full
          bg-current
          transition-all
          duration-600
          ease-[cubic-bezier(0.76,0,0.24,1)]
          ${
            open
              ? "w-[22px] translate-y-0 rotate-45"
              : "w-[16px] -translate-y-[3px] rotate-0"
          }
        `}
      />

      <span
        className={`
          absolute
          right-0
          h-[2px]
          rounded-full
          bg-current
          transition-all
          duration-600
          ease-[cubic-bezier(0.76,0,0.24,1)]
          ${
            open
              ? "w-[22px] translate-y-0 -rotate-45"
              : "w-[22px] translate-y-[3px] rotate-0"
          }
        `}
      />
    </button>
  );
}