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
          "px-4 py-1.5 rounded-md font-semibold transition-all duration-200 w-[clamp(5rem,calc(1.429rem+17.857vw),17.5rem)] text-[clamp(0.5rem,calc(0.107rem+1.964vw),1.875rem)] cursor-pointer flex items-center justify-center",
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
