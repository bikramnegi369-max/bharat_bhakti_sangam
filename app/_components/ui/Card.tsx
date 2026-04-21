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
        "rounded-xl border-3 border-primary bg-primary_light transition-all duration-200",
        "w-full h-full",
        "p-[clamp(1rem,calc(0.75rem+1.25vw),1.75rem)]",
        "min-h-[clamp(10rem,calc(7rem+10vw),18rem)]",
        "flex flex-col text-center",
        onClick && "cursor-pointer hover:shadow-md active:scale-[0.98]",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex flex-col justify-between h-full gap-[clamp(0.5rem,calc(0.25rem+1.25vw),1.25rem)]">
        {/* Icon */}
        {Icon && (
          <div className="flex justify-center">
            <Icon
              className="text-primary w-[clamp(2rem,calc(1.607rem+1.964vw),3.375rem)] h-[clamp(2rem,calc(1.607rem+1.964vw),3.375rem)]"
              strokeWidth={1.5}
            />
          </div>
        )}

        {/* Title */}
        {title && (
          <h3 className="font-semibold text-para text-[clamp(0.938rem,calc(0.848rem+0.446vw),1.25rem)] leading-snug">
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p className="text-heading/80 text-[clamp(0.75rem,calc(0.696rem+0.268vw),0.938rem)] leading-relaxed grow">
            {description}
          </p>
        )}

        {/* Children */}
        {children && <div className="mt-auto">{children}</div>}
      </div>
    </div>
  );
}
