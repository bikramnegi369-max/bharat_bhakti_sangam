import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", onClick, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          // Base styles
          "relative overflow-hidden px-4 py-1.5 rounded-md font-medium transition-all duration-200 w-[clamp(6.875rem,calc(4.196rem+13.393vw),16.25rem)] text-[clamp(0.75rem,calc(0.518rem+1.161vw),1.563rem)] cursor-pointer flex items-center justify-center active:scale-95",
          // Centered Ripple pseudo-element
          "after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:w-5 after:h-5 after:bg-white/40 after:rounded-full after:opacity-0 after:pointer-events-none after:-translate-x-1/2 after:-translate-y-1/2",
          // Variant styles
          variant === "primary" && "bg-primary hover:bg-primary/90 text-black",
          variant === "secondary" &&
            " text-primary border-2 border-primary bg-primary/20 hover:bg-primary/10 ",
          // Custom className
          className,
        )}
        onClick={onClick}
        {...props}
      >
        <span className="relative z-10">{children}</span>

        <style>{`
          @keyframes ripple-center {
            0% {
              transform: translate(-50%, -50%) scale(0);
              opacity: 0.5;
            }
            100% {
              transform: translate(-50%, -50%) scale(60);
              opacity: 0;
            }
          }
          button:active::after {
            animation: ripple-center 0.6s ease-out;
          }
        `}</style>
      </button>
    );
  },
);

Button.displayName = "Button";
