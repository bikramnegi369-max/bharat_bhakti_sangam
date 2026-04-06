// components/ui/Card.tsx
import { ReactNode } from "react";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";

interface CardProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  icon: Icon,
  title,
  description,
  children,
  className,
  onClick,
}: CardProps) {
  return (
    <div
      className={clsx(
        // Base styles
        "p-4 rounded-xl border-3 transition-all duration-200 w-full h-full min-h-[clamp(10rem,calc(8.393rem+8.036vw),15.625rem)] flex flex-col  text-center",
        // Border primary
        "border-primary",
        // Background primary-light
        "bg-primary_light",
        // Interactive styles
        onClick && "cursor-pointer hover:shadow-md active:scale-[0.98]",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex flex-col justify-between h-full">
        {/* Icon */}
        {Icon && (
          <div className="mb-3 flex justify-center">
            <Icon
              className={clsx(
                "text-primary",
                "w-[clamp(2.375rem,calc(1.946rem+2.143vw),3.875rem)] h-[clamp(2.375rem,calc(1.946rem+2.143vw),3.875rem)]",
              )}
              strokeWidth={1.5}
            />
          </div>
        )}

        {/* Title */}
        {title && (
          <h3
            className={clsx(
              "font-semibold mb-2 text-[clamp(1.063rem,calc(0.938rem+0.625vw),1.5rem)]",
              "text-para",
            )}
          >
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p
            className={clsx(
              "text-sm text-[clamp(0.688rem,calc(0.563rem+0.625vw),1.125rem)] grow",
              "text-sub_text",
            )}
          >
            {description}
          </p>
        )}

        {/* Children (sticks to bottom if added later) */}
        {children && <div className="mt-auto">{children}</div>}
      </div>
    </div>
  );
}
