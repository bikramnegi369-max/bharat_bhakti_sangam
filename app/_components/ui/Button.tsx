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
          "relative overflow-hidden px-5 py-2.5 rounded-lg font-medium transition-all duration-200 min-w-[clamp(6.875rem,calc(4.196rem+13.393vw),16.25rem)] text-[clamp(0.75rem,calc(0.518rem+1.161vw),1.563rem)] cursor-pointer flex items-center justify-center select-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100",
          // Centered Ripple pseudo-element
          "after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:w-5 after:h-5 after:bg-white/30 after:rounded-full after:opacity-0 after:pointer-events-none after:-translate-x-1/2 after:-translate-y-1/2",
          // Variant styles
          variant === "primary" &&
            "bg-linear-to-r from-[#740E0A] via-[#85130E] to-[#630B08] text-white shadow-sm shadow-primary/25 hover:brightness-110 hover:shadow-md hover:shadow-primary/35 border border-[#8a1914] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
          variant === "secondary" &&
            "text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          // Custom className
          className,
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
