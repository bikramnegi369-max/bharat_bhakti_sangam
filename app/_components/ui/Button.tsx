// components/ui/Button.tsx
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
          "px-4 py-1.5 rounded-md font-medium transition-all duration-200 w-[clamp(5rem,calc(1.786rem+16.071vw),16.25rem)] text-[clamp(0.5rem,calc(0.196rem+1.518vw),1.563rem)] cursor-pointer flex items-center justify-center active:scale-95",
          // Variant styles
          variant === "primary" && "bg-primary hover:bg-primary/90 text-black",
          variant === "secondary" &&
            "bg-primary_light text-primary border border-primary hover:bg-primary/10",
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
